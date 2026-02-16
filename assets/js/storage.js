/**
 * BOTHOFLOW STORAGE UTILITY
 * Handles IndexedDB for user profiles and localStorage for session persistence.
 */

class BothoflowStorage {
    constructor() {
        this.dbName = 'BothoflowDB';
        this.dbVersion = 2; // Incremented version to support new store
        this.db = null;
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            request.onerror = (e) => reject('Database error: ' + e.target.errorCode);
            request.onsuccess = (e) => {
                this.db = e.target.result;
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
            };
        });
    }

    async saveUser(user) {
        if (!this.db) await this.init();
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
        if (!this.db) await this.init();
        return this.performTransaction('schools', 'readonly', (store) => store.getAll());
    }

    async performTransaction(storeName, mode, operation) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], mode);
            const store = transaction.objectStore(storeName);
            const request = operation(store);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(`Transaction failed on ${storeName}`);
        });
    }

    async getUser(id) {
        if (!this.db) await this.init();
        return this.performTransaction('users', 'readonly', (store) => store.get(id));
    }

    async getAllUsers() {
        if (!this.db) await this.init();
        return this.performTransaction('users', 'readonly', (store) => store.getAll());
    }

    setCurrentUser(id) {
        localStorage.setItem('currentUser', id);
    }

    getCurrentUserId() {
        return localStorage.getItem('currentUser');
    }

    logout() {
        localStorage.removeItem('currentUser');
    }
}

window.BothoflowStorage = new BothoflowStorage();
