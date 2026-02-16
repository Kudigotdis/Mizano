/**
 * MIZANO TRACKER STORAGE
 * Absolute Law: MIZANO_TRACKER_FEATURE.md Rule 9
 * IndexedDB wrapper for offline goals and tracker entries.
 */

class TrackerStorage {
    constructor() {
        this.dbName = 'MizanoTrackerDB';
        this.version = 1;
        this.db = null;
        this.initPromise = this.init();
    }

    init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Goals Store
                if (!db.objectStoreNames.contains('goals')) {
                    db.createObjectStore('goals', { keyPath: 'id' });
                }

                // Tracker Entries Store
                if (!db.objectStoreNames.contains('entries')) {
                    const entriesStore = db.createObjectStore('entries', { keyPath: 'entry_id' });
                    entriesStore.createIndex('timestamp', 'timestamp', { unique: false });
                    entriesStore.createIndex('sync_status', 'sync_status', { unique: false });
                }
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                console.log('TrackerStorage: IndexedDB Initialized');
                resolve();
            };

            request.onerror = (event) => {
                console.error('TrackerStorage: IndexedDB Error', event.target.error);
                reject(event.target.error);
            };
        });
    }

    async addGoal(goal) {
        await this.initPromise;
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['goals'], 'readwrite');
            const store = transaction.objectStore('goals');

            // Ensure ID
            if (!goal.id) goal.id = 'goal_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            goal.createdAt = Date.now();

            const request = store.put(goal);
            request.onsuccess = () => resolve(goal);
            request.onerror = () => reject(request.error);
        });
    }

    async getGoals() {
        await this.initPromise;
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['goals'], 'readonly');
            const store = transaction.objectStore('goals');
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async deleteGoal(goalId) {
        await this.initPromise;
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['goals'], 'readwrite');
            const store = transaction.objectStore('goals');
            const request = store.delete(goalId);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async addEntry(entry) {
        await this.initPromise;
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['entries'], 'readwrite');
            const store = transaction.objectStore('entries');

            // Validate Schema minimally
            if (!entry.entry_id) entry.entry_id = 'trk_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            if (!entry.timestamp) entry.timestamp = Date.now();
            entry.sync_status = 'local';

            const request = store.put(entry);
            request.onsuccess = () => resolve(entry);
            request.onerror = () => reject(request.error);
        });
    }

    async getEntries(limit = 50) {
        await this.initPromise;
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['entries'], 'readonly');
            const store = transaction.objectStore('entries');
            const index = store.index('timestamp');
            const request = index.openCursor(null, 'prev'); // Latest first

            const results = [];
            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor && results.length < limit) {
                    results.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(results);
                }
            };
            request.onerror = () => reject(request.error);
        });
    }

    async getUnsyncedEntries() {
        await this.initPromise;
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['entries'], 'readonly');
            const store = transaction.objectStore('entries');
            const index = store.index('sync_status');
            const request = index.getAll('local');
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async markSynced(entryIds) {
        await this.initPromise;
        const transaction = this.db.transaction(['entries'], 'readwrite');
        const store = transaction.objectStore('entries');

        entryIds.forEach(id => {
            const getReq = store.get(id);
            getReq.onsuccess = () => {
                const entry = getReq.result;
                if (entry) {
                    entry.sync_status = 'synced';
                    store.put(entry);
                }
            };
        });

        return new Promise((resolve) => {
            transaction.oncomplete = () => resolve();
        });
    }
}

// Global Singleton
window.MizanoTrackerStorage = new TrackerStorage();
