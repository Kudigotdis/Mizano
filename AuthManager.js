/**
 * MIZANO AUTHENTICATION MANAGER
 * Handles user login, session management, and profile switching
 * Offline-first with localStorage persistence
 */

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.sessionKey = 'mizano_session';
        this.usersKey = 'mizano_users_cache';
    }

    /**
     * Initialize auth system
     */
    async init() {
        // Try to restore session
        const savedSession = localStorage.getItem(this.sessionKey);
        if (savedSession) {
            try {
                this.currentUser = JSON.parse(savedSession);
                console.log(`AuthManager: Session restored for ${this.currentUser.full_name}`);
                this.broadcastAuthState();
                return true;
            } catch (error) {
                console.error('AuthManager: Failed to restore session', error);
                localStorage.removeItem(this.sessionKey);
            }
        }

        // No session - show login
        return false;
    }

    /**
     * Login with user ID or create guest session
     */
    async login(userId = null) {
        if (!userId) {
            // Guest mode
            this.currentUser = this.createGuestUser();
            this.saveSession();
            this.broadcastAuthState();
            return this.currentUser;
        }

        // Find user in cache
        const users = window.dataManager?.cache?.users || [];
        const user = users.find(u => u.uid === userId || u.email === userId);

        if (!user) {
            console.warn(`AuthManager: User ${userId} not found`);
            return null;
        }

        this.currentUser = user;
        this.saveSession();
        this.broadcastAuthState();
        console.log(`AuthManager: Logged in as ${user.full_name}`);
        return user;
    }

    /**
     * Logout
     */
    logout() {
        this.currentUser = null;
        localStorage.removeItem(this.sessionKey);
        this.broadcastAuthState();
        console.log('AuthManager: Logged out');
    }

    /**
     * Switch profile (for testing/demo)
     */
    async switchProfile(userId) {
        return await this.login(userId);
    }

    /**
     * Get current user
     */
    getCurrentUser() {
        return this.currentUser;
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return this.currentUser !== null && this.currentUser.uid !== 'guest';
    }

    /**
     * Check if user is guest
     */
    isGuest() {
        return this.currentUser?.uid === 'guest';
    }

    /**
     * Get user's teams
     */
    getUserTeams() {
        if (!this.currentUser) return [];
        const teams = window.dataManager?.cache?.teams || [];
        return teams.filter(t =>
            t.members?.includes(this.currentUser.uid) ||
            t.captain === this.currentUser.uid
        );
    }

    /**
     * Get user's activities
     */
    getUserActivities() {
        if (!this.currentUser) return [];
        const activities = window.dataManager?.cache?.activities || [];
        return activities.filter(a => a.user_id === this.currentUser.uid);
    }

    /**
     * Get user's events (RSVPs)
     */
    getUserEvents() {
        if (!this.currentUser) return [];
        const events = window.dataManager?.cache?.events || [];
        const rsvps = window.dataManager?.cache?.rsvps || {};
        return events.filter(e => rsvps[e.event_id]?.includes(this.currentUser.uid));
    }

    /**
     * Get user's shopping history
     */
    getUserShoppingHistory() {
        if (!this.currentUser) return [];
        // This would come from transaction history
        return [];
    }

    /**
     * Create guest user
     */
    createGuestUser() {
        return {
            uid: 'guest',
            full_name: 'Guest User',
            email: 'guest@mizano.app',
            role: 'guest',
            location: 'Gaborone',
            date_of_birth: '2000-01-01',
            gender: 'Other',
            profile_picture: null,
            sports: [],
            hobbies: [],
            teams: [],
            is_guest: true
        };
    }

    /**
     * Save session to localStorage
     */
    saveSession() {
        if (this.currentUser) {
            localStorage.setItem(this.sessionKey, JSON.stringify(this.currentUser));
        }
    }

    /**
     * Broadcast auth state change
     */
    broadcastAuthState() {
        window.dispatchEvent(new CustomEvent('auth-state-changed', {
            detail: { user: this.currentUser }
        }));
    }

    /**
     * Quick login for demo (picks random user)
     */
    async quickLogin() {
        const users = window.dataManager?.cache?.users || [];
        if (users.length === 0) {
            console.warn('AuthManager: No users available for quick login');
            return this.login(); // Guest mode
        }

        // Pick a random user
        const randomUser = users[Math.floor(Math.random() * users.length)];
        return await this.login(randomUser.uid);
    }
}

// Global instance
window.authManager = new AuthManager();

// Auto-initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        const hasSession = await window.authManager.init();
        if (!hasSession) {
            // Show login UI or auto-login as guest
            console.log('AuthManager: No session found, using guest mode');
            await window.authManager.login(); // Guest mode
        }
    });
} else {
    window.authManager.init().then(hasSession => {
        if (!hasSession) {
            window.authManager.login(); // Guest mode
        }
    });
}
