/**
 * MIZANO STORAGE MANAGER
 * Absolute Law: TECHNICAL_STACK_AND_APK_PIPELINE.md Rule 19
 * WebView-safe persistent storage wrapper for offline survival.
 * Handles both localStorage (Sync) and IndexedDB (Async Proximity).
 */

class StorageManager {
    constructor(prefix = 'mizano_') {
        this.prefix = prefix;
        this.dbName = 'MizanoDB';
        this.dbVersion = 2;
        this.db = null;
    }

    /**
     * INITIALIZATION (IndexedDB)
     */
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            request.onerror = (e) => {
                console.error('StorageManager: Database error', e.target.errorCode);
                reject('Database error: ' + e.target.errorCode);
            };
            request.onsuccess = (e) => {
                this.db = e.target.result;
                console.log('StorageManager: IndexedDB Initialized');
                resolve();
            };
            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('users')) {
                    db.createObjectStore('users', { keyPath: 'profile_id' });
                }
                if (!db.objectStoreNames.contains('schools')) {
                    db.createObjectStore('schools', { keyPath: 'id' });
                }
                if (!db.objectStoreNames.contains('businesses')) {
                    db.createObjectStore('businesses', { keyPath: 'id' });
                }
            };
        });
    }

    /**
     * LOCALSTORAGE WRAPPERS (Sync)
     */
    save(key, data) {
        try {
            const serializedData = JSON.stringify(data);
            localStorage.setItem(this.prefix + key, serializedData);
            return true;
        } catch (error) {
            console.error(`StorageManager: Failed to save ${key}`, error);
            return false;
        }
    }

    load(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(this.prefix + key);
            if (item === null) return defaultValue;
            return JSON.parse(item);
        } catch (error) {
            console.error(`StorageManager: Failed to load ${key}`, error);
            return defaultValue;
        }
    }

    remove(key) {
        localStorage.removeItem(this.prefix + key);
    }

    clearAll() {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(this.prefix)) {
                localStorage.removeItem(key);
            }
        });
    }

    /**
     * INDEXEDDB WRAPPERS (Async)
     */
    async performTransaction(storeName, mode, operation) {
        if (!this.db) await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], mode);
            const store = transaction.objectStore(storeName);
            const request = operation(store);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(`Transaction failed on ${storeName}`);
        });
    }

    async saveUser(user) {
        return this.performTransaction('users', 'readwrite', (store) => store.put(user));
    }

    async bulkSaveUsers(users) {
        if (!this.db) await this.init();
        const transaction = this.db.transaction(['users'], 'readwrite');
        const store = transaction.objectStore('users');
        users.forEach(user => store.put(user));
        return new Promise((resolve, reject) => {
            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject('Bulk save users failed');
        });
    }

    async getAllUsers() {
        return this.performTransaction('users', 'readonly', (store) => store.getAll());
    }

    async getUser(id) {
        return this.performTransaction('users', 'readonly', (store) => store.get(id));
    }

    async saveSchools(schools) {
        if (!this.db) await this.init();
        const transaction = this.db.transaction(['schools'], 'readwrite');
        const store = transaction.objectStore('schools');
        schools.forEach(school => store.put(school));
        return new Promise((resolve, reject) => {
            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject('Save schools failed');
        });
    }

    async getAllSchools() {
        return this.performTransaction('schools', 'readonly', (store) => store.getAll());
    }

    async saveBusiness(business) {
        return this.performTransaction('businesses', 'readwrite', (store) => store.put(business));
    }

    async getAllBusinesses() {
        return this.performTransaction('businesses', 'readonly', (store) => store.getAll());
    }

    /**
     * MIZANO SPECIFIC DATA HELPERS
     */
    cacheDatabase(entity, data) {
        return this.save(`db_${entity}`, {
            timestamp: Date.now(),
            payload: data
        });
    }

    getCachedDatabase(entity, maxAgeMs = null) {
        const cached = this.load(`db_${entity}`);
        if (!cached) return null;

        if (maxAgeMs && (Date.now() - cached.timestamp > maxAgeMs)) {
            this.remove(`db_${entity}`);
            return null;
        }
        return cached.payload;
    }

    saveFilters(filters) { return this.save('filters', filters); }
    loadFilters() { return this.load('filters', null); }

    saveRSVP(activityId, status) {
        const rsvps = this.load('rsvps', {});
        rsvps[activityId] = status;
        return this.save('rsvps', rsvps);
    }
    loadRSVPs() { return this.load('rsvps', {}); }

    saveScroll(panelIndex, y) {
        const positions = this.load('scroll_positions', {});
        positions[panelIndex] = y;
        return this.save('scroll_positions', positions);
    }
    loadScroll(panelIndex) {
        const positions = this.load('scroll_positions', {});
        return positions[panelIndex] || 0;
    }

    setCurrentUser(id) { localStorage.setItem('currentUser', id); }
    getCurrentUserId() { return localStorage.getItem('currentUser'); }
    logout() { localStorage.removeItem('currentUser'); }

    checkMigration() {
        const version = this.load('version', '1.0');
        if (version === '1.0') {
            console.log('StorageManager: Running migration to 1.1...');
            this.save('version', '1.1');
        }
    }

    /**
     * RESERVATION & WAITLIST (Venue System)
     */
    saveReservation(reservation) {
        const reservations = this.load('reservations', []);
        reservations.push(reservation);
        return this.save('reservations', reservations);
    }

    getUserReservations(userId) {
        return this.load('reservations', []).filter(r => r.user_id === userId);
    }

    saveWaitlistEntry(entry) {
        const waitlists = this.load('waitlists', []);
        waitlists.push(entry);
        return this.save('waitlists', waitlists);
    }

    getUserWaitlists(userId) {
        return this.load('waitlists', []).filter(w => w.user_id === userId);
    }
}

// Global Singleton for utility access
window.mizanoStorage = new StorageManager();
window.mizanoStorage.checkMigration();
