/**
 * MIZANO NOTIFICATION MANAGER
 * Handles in-app alerts, unread counts, and UI synchronization.
 * Offline-first: Reads from StorageManager notifications store.
 * 
 * Part of Phase 7: Community & Notification Realism
 */

class NotificationManager {
    constructor() {
        this.notifications = [];
        this.unreadCount = 0;
        this.listeners = [];
    }

    /**
     * Initialize the manager by loading notifications from storage.
     */
    async init() {
        const storage = window.mizanoStorage;
        if (!storage) {
            console.error('NotificationManager: StorageManager not found');
            return;
        }

        const currentUser = storage.getCurrentUserId();
        if (!currentUser) {
            console.log('NotificationManager: No user logged in. Skipping init.');
            return;
        }

        try {
            this.notifications = await storage.getEntitiesByUser('notifications', currentUser);
            // Sort by created_at descending (newest first)
            this.notifications.sort((a, b) => (b.created_at || 0) - (a.created_at || 0));
            this.updateUnreadCount();
            this.syncUI();
            console.log(`NotificationManager: Initialized with ${this.notifications.length} notifications (${this.unreadCount} unread).`);
        } catch (error) {
            console.error('NotificationManager: Failed to initialize', error);
        }
    }

    /**
     * Add a new notification and save it to storage.
     * @param {Object} data { title, message, type, link, metadata }
     */
    async addNotification(data) {
        const storage = window.mizanoStorage;
        const currentUser = storage.getCurrentUserId();
        if (!currentUser) return;

        const notification = {
            user_uid: currentUser,
            title: data.title || 'Mizano Alert',
            message: data.message || '',
            type: data.type || 'info', // info, success, warning, match, group, community
            link: data.link || null, // { type: 'panel'|'overlay', index|id, data }
            metadata: data.metadata || {},
            read_status: 'unread',
            created_at: Date.now()
        };

        try {
            const localId = await storage.saveEntity('notifications', notification);
            notification.local_id = localId;
            this.notifications.unshift(notification);
            this.updateUnreadCount();
            this.syncUI();
            this.notifyListeners();
            return localId;
        } catch (error) {
            console.error('NotificationManager: Failed to add notification', error);
        }
    }

    /**
     * Mark a specific notification as read.
     */
    async markAsRead(localId) {
        const storage = window.mizanoStorage;
        try {
            await storage.updateEntity('notifications', localId, { read_status: 'read' });
            const notif = this.notifications.find(n => n.local_id === localId);
            if (notif) {
                notif.read_status = 'read';
                this.updateUnreadCount();
                this.syncUI();
                this.notifyListeners();
            }
        } catch (error) {
            console.error(`NotificationManager: Failed to mark as read (${localId})`, error);
        }
    }

    /**
     * Mark all notifications as read for the current user.
     */
    async markAllAsRead() {
        const unread = this.notifications.filter(n => n.read_status === 'unread');
        if (unread.length === 0) return;

        const promises = unread.map(n => this.markAsRead(n.local_id));
        await Promise.all(promises);
    }

    updateUnreadCount() {
        this.unreadCount = this.notifications.filter(n => n.read_status === 'unread').length;
    }

    /**
     * Synchronize the UI elements (dot in hamburger, etc.)
     */
    syncUI() {
        // 1. Update Hamburger Menu Badge
        const countBadge = document.getElementById('menu-notif-count');
        if (countBadge) {
            if (this.unreadCount > 0) {
                countBadge.innerText = this.unreadCount > 9 ? '9+' : this.unreadCount;
                countBadge.style.display = 'block';
            } else {
                countBadge.style.display = 'none';
            }
        }

        // 2. Refresh Notification Overlay if visible
        const container = document.getElementById('notifications-list');
        if (container && container.offsetParent !== null) {
            this.render('notifications-list');
        }

        // 3. Dispatch global event
        window.dispatchEvent(new CustomEvent('mizano-notifications-updated', {
            detail: { unreadCount: this.unreadCount, notifications: this.notifications }
        }));
    }

    addListener(callback) {
        this.listeners.push(callback);
    }

    notifyListeners() {
        this.listeners.forEach(cb => {
            try { cb(this.notifications); } catch (e) { console.error(e); }
        });
    }

    /**
     * Renders the notification items into the provided container.
     */
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (this.notifications.length === 0) {
            container.innerHTML = `
                <div style="text-align:center; color:#666; margin-top:50px;">
                    <p style="font-size:1.2rem; margin-bottom:10px;">🔕</p>
                    <p>No new notifications</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.notifications.map(n => `
            <div class="mizano-card notification-item ${n.read_status}" 
                 onclick="window.MizanoNotifications.handleNotifClick(${n.local_id})"
                 style="padding:15px; margin-bottom:10px; cursor:pointer; border-left: 4px solid ${this.getTypeColor(n.type)}; position:relative; ${n.read_status === 'unread' ? 'background:#f0f7ff' : ''}">
                <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                    <h4 style="margin:0; font-size:1rem; font-weight:700;">${n.title}</h4>
                    <span style="font-size:0.7rem; color:#888;">${this.formatTime(n.created_at)}</span>
                </div>
                <p style="margin:8px 0 0; font-size:0.9rem; color:#444; line-height:1.4;">${n.message}</p>
                ${n.read_status === 'unread' ? '<div class="unread-dot" style="position:absolute; right:10px; bottom:10px; width:8px; height:8px; background:#1e88e5; border-radius:50%;"></div>' : ''}
            </div>
        `).join('');
    }

    getTypeColor(type) {
        switch (type) {
            case 'success': return '#4caf50';
            case 'warning': return '#ff9800';
            case 'error': return '#f44336';
            case 'match': return '#2196f3';
            case 'group': return '#9c27b0';
            case 'community': return '#ff5722';
            default: return '#9e9e9e';
        }
    }

    formatTime(timestamp) {
        if (!timestamp) return '';
        const now = Date.now();
        const diff = now - timestamp;
        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
        if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
        return new Date(timestamp).toLocaleDateString('en-BW', { day: 'numeric', month: 'short' });
    }

    handleNotifClick(localId) {
        const notif = this.notifications.find(n => n.local_id === localId);
        if (!notif) return;

        this.markAsRead(localId);

        if (notif.link) {
            const nav = window.MizanoNav;
            if (notif.link.type === 'panel') {
                nav.switchPanel(notif.link.index);
                nav.closeTopOverlay();
            } else if (notif.link.type === 'overlay') {
                nav.openOverlay(notif.link.id, notif.link.data);
            } else if (notif.link.type === 'page') {
                nav.pushPage(notif.link.id, notif.link.data);
            }
        }
    }
}

// Global Singleton
window.MizanoNotifications = new NotificationManager();
