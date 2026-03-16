/**
 * MIZANO STORAGE MANAGER — Session 1
 * Applied Android Studio Otter Pipeline standards from Docs/TECHNICAL_STACK_AND_APK_PIPELINE.md
 *
 * PRIMARY RULE: Offline-first. IndexedDB is the single source of truth.
 * LocalStorage is for preferences ONLY — never entity data.
 * Medical data (medical_records store) is NEVER synced. Not for any reason.
 *
 * DB version bumped to 3 to trigger onupgradeneeded for new stores.
 */

class StorageManager {
    constructor(prefix = 'mizano_') {
        this.prefix = prefix;
        this.dbName = 'MizanoDB';
        this.dbVersion = 6; // Bumped to 6 for Phase 11 — adds sync_queue store
        this.db = null;
        this._initPromise = null;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // INITIALIZATION — IndexedDB setup with all required stores
    // ─────────────────────────────────────────────────────────────────────────

    async init() {
        if (this.db) return;
        if (this._initPromise) return this._initPromise;

        this._initPromise = new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = (e) => {
                console.error('StorageManager: Database error', e.target.errorCode);
                reject('Database error: ' + e.target.errorCode);
            };

            request.onsuccess = (e) => {
                this.db = e.target.result;
                console.log('StorageManager: IndexedDB ready — version', this.dbVersion);
                resolve();
            };

            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                const oldVersion = e.oldVersion;

                // ── LEGACY STORES (keep existing, add if missing) ─────────
                if (!db.objectStoreNames.contains('users')) {
                    db.createObjectStore('users', { keyPath: 'profile_id' });
                }
                if (!db.objectStoreNames.contains('schools')) {
                    db.createObjectStore('schools', { keyPath: 'id' });
                }

                // ── businesses: recreate with correct schema if upgrading ──
                // Old schema had keyPath:'id' without autoIncrement — replace it.
                if (db.objectStoreNames.contains('businesses') && oldVersion < 3) {
                    db.deleteObjectStore('businesses');
                }
                if (!db.objectStoreNames.contains('businesses')) {
                    const bizStore = db.createObjectStore('businesses', { keyPath: 'local_id', autoIncrement: true });
                    bizStore.createIndex('by_owner_uid', 'owner_uid', { unique: false });
                    bizStore.createIndex('by_type', 'type', { unique: false });
                    bizStore.createIndex('by_city', 'city', { unique: false });
                }

                // ── user_profiles (extended profile data) ─────────────────
                if (!db.objectStoreNames.contains('user_profiles')) {
                    const upStore = db.createObjectStore('user_profiles', { keyPath: 'local_id', autoIncrement: true });
                    upStore.createIndex('by_uid', 'uid', { unique: true });
                }

                // ── activities (events, matches, sessions, tournaments) ────
                if (!db.objectStoreNames.contains('activities')) {
                    const actStore = db.createObjectStore('activities', { keyPath: 'local_id', autoIncrement: true });
                    actStore.createIndex('by_organizer', 'organizer_uid', { unique: false });
                    actStore.createIndex('by_status', 'status', { unique: false });
                    actStore.createIndex('by_start_date', 'start_date', { unique: false });
                    actStore.createIndex('by_area', 'area', { unique: false });
                }

                // ── match_rosters (who joined which event) ─────────────────
                if (!db.objectStoreNames.contains('match_rosters')) {
                    const rosterStore = db.createObjectStore('match_rosters', { keyPath: 'local_id', autoIncrement: true });
                    rosterStore.createIndex('by_match', 'activity_id', { unique: false });
                    rosterStore.createIndex('by_user', 'user_id', { unique: false });
                }

                // ── groups (teams, clubs, school teams, corporate crews) ───
                if (!db.objectStoreNames.contains('groups')) {
                    const grpStore = db.createObjectStore('groups', { keyPath: 'local_id', autoIncrement: true });
                    grpStore.createIndex('by_admin_uid', 'admin_uid', { unique: false });
                    grpStore.createIndex('by_sport', 'sport', { unique: false });
                    grpStore.createIndex('by_area', 'area', { unique: false });
                }

                // ── associations (governing bodies, leagues, school depts) ─
                if (!db.objectStoreNames.contains('associations')) {
                    const assStore = db.createObjectStore('associations', { keyPath: 'local_id', autoIncrement: true });
                    assStore.createIndex('by_admin_uid', 'admin_uid', { unique: false });
                    assStore.createIndex('by_sport', 'sport', { unique: false });
                    assStore.createIndex('by_scope', 'scope', { unique: false });
                }

                // ── venues (pitches, courts, gyms, halls, pools) ──────────
                if (!db.objectStoreNames.contains('venues')) {
                    const venStore = db.createObjectStore('venues', { keyPath: 'local_id', autoIncrement: true });
                    venStore.createIndex('by_city', 'city', { unique: false });
                    venStore.createIndex('by_type', 'type', { unique: false });
                    venStore.createIndex('by_bookable', 'bookable', { unique: false });
                }

                // ── player_files (athlete CVs and sport stats) ─────────────
                if (!db.objectStoreNames.contains('player_files')) {
                    const pfStore = db.createObjectStore('player_files', { keyPath: 'local_id', autoIncrement: true });
                    pfStore.createIndex('by_user_uid', 'user_uid', { unique: false });
                    pfStore.createIndex('by_sport', 'sport', { unique: false });
                }

                // ── minors (child profiles under guardian oversight) ───────
                if (!db.objectStoreNames.contains('minors')) {
                    const minStore = db.createObjectStore('minors', { keyPath: 'local_id', autoIncrement: true });
                    minStore.createIndex('by_guardian_uid', 'guardian_uid', { unique: false });
                    minStore.createIndex('by_school', 'school', { unique: false });
                }

                // ── equipment_ledger (borrow/return log) ───────────────────
                if (!db.objectStoreNames.contains('equipment_ledger')) {
                    const eqStore = db.createObjectStore('equipment_ledger', { keyPath: 'local_id', autoIncrement: true });
                    eqStore.createIndex('by_borrower', 'borrower_uid', { unique: false });
                    eqStore.createIndex('by_status', 'status', { unique: false });
                }

                // ── bulletin_posts (community feed: jobs, lost+found) ──────
                if (!db.objectStoreNames.contains('bulletin_posts')) {
                    const bpStore = db.createObjectStore('bulletin_posts', { keyPath: 'local_id', autoIncrement: true });
                    bpStore.createIndex('by_area', 'area', { unique: false });
                    bpStore.createIndex('by_type', 'type', { unique: false });
                    bpStore.createIndex('by_moderation', 'moderated', { unique: false });
                }

                // ── notifications (in-app alerts) ──────────────────────────
                if (!db.objectStoreNames.contains('notifications')) {
                    const ntfStore = db.createObjectStore('notifications', { keyPath: 'local_id', autoIncrement: true });
                    ntfStore.createIndex('by_user_uid', 'user_uid', { unique: false });
                    ntfStore.createIndex('by_read_status', 'read_status', { unique: false });
                }

                // ── school_links (guardian–student–school linkage) ─────────
                if (!db.objectStoreNames.contains('school_links')) {
                    const slStore = db.createObjectStore('school_links', { keyPath: 'local_id', autoIncrement: true });
                    slStore.createIndex('by_student_uid', 'student_uid', { unique: false });
                    slStore.createIndex('by_school', 'school', { unique: false });
                }

                // ── tracker_entries (activity logs and goal progress) ──────
                if (!db.objectStoreNames.contains('tracker_entries')) {
                    const teStore = db.createObjectStore('tracker_entries', { keyPath: 'local_id', autoIncrement: true });
                    teStore.createIndex('by_user_uid', 'user_uid', { unique: false });
                    teStore.createIndex('by_goal_id', 'goal_id', { unique: false });
                }

                // ── goals (personal tracking goals) ────────────────────────
                if (!db.objectStoreNames.contains('goals')) {
                    const goalStore = db.createObjectStore('goals', { keyPath: 'local_id', autoIncrement: true });
                    goalStore.createIndex('by_user_uid', 'user_uid', { unique: false });
                    goalStore.createIndex('by_activity', 'activity_id', { unique: false });
                }

                // ── daily_activity_summary (streak heatmap data) ───────────
                if (!db.objectStoreNames.contains('daily_activity_summary')) {
                    const dashStore = db.createObjectStore('daily_activity_summary', { keyPath: 'local_id', autoIncrement: true });
                    dashStore.createIndex('by_user_uid', 'user_uid', { unique: false });
                    dashStore.createIndex('by_date', 'date', { unique: false });
                }

                // ── medical_records — DEVICE ONLY — NEVER SYNCED ──────────
                if (!db.objectStoreNames.contains('medical_records')) {
                    const medStore = db.createObjectStore('medical_records', { keyPath: 'local_id', autoIncrement: true });
                    medStore.createIndex('by_user_uid', 'user_uid', { unique: false });
                }

                // ── PHASE 8: ENGAGEMENT & TRACKING STORES ─────────────────
                if (!db.objectStoreNames.contains('challenges')) {
                    const chalStore = db.createObjectStore('challenges', { keyPath: 'local_id', autoIncrement: true });
                    chalStore.createIndex('by_area', 'area', { unique: false });
                    chalStore.createIndex('by_status', 'status', { unique: false });
                }

                if (!db.objectStoreNames.contains('injury_log')) {
                    const injStore = db.createObjectStore('injury_log', { keyPath: 'local_id', autoIncrement: true });
                    injStore.createIndex('by_date', 'date', { unique: false });
                }

                if (!db.objectStoreNames.contains('survey_responses')) {
                    const surStore = db.createObjectStore('survey_responses', { keyPath: 'local_id', autoIncrement: true });
                    surStore.createIndex('by_survey', 'survey_id', { unique: false });
                    surStore.createIndex('by_area', 'location_area', { unique: false });
                }

                if (!db.objectStoreNames.contains('habits')) {
                    const habStore = db.createObjectStore('habits', { keyPath: 'local_id', autoIncrement: true });
                    habStore.createIndex('by_longest_streak', 'longest_streak', { unique: false });
                }

                if (!db.objectStoreNames.contains('habit_logs')) {
                    const habLogStore = db.createObjectStore('habit_logs', { keyPath: 'local_id', autoIncrement: true });
                    habLogStore.createIndex('by_habit', 'habit_id', { unique: false });
                    habLogStore.createIndex('by_date', 'date', { unique: false });
                }

                if (!db.objectStoreNames.contains('participation_stats')) {
                    const partStore = db.createObjectStore('participation_stats', { keyPath: 'local_id', autoIncrement: true });
                    partStore.createIndex('by_location', 'location_code', { unique: false });
                    partStore.createIndex('by_type', 'location_type', { unique: false });
                }

                // ── PHASE 11: SYNC QUEUE — offline operation log ───────────
                if (!db.objectStoreNames.contains('sync_queue')) {
                    const sqStore = db.createObjectStore('sync_queue', { keyPath: 'local_id', autoIncrement: true });
                    sqStore.createIndex('by_store', 'store_name', { unique: false });
                    sqStore.createIndex('by_status', 'status', { unique: false });
                    sqStore.createIndex('by_timestamp', 'timestamp', { unique: false });
                }

                console.log('StorageManager: onupgradeneeded complete — all stores ready');
            };
        });

        return this._initPromise;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // INTERNAL HELPERS
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Adds all 6 required sync metadata fields to a new record before saving.
     * medical_records are included here but MUST NEVER appear in a sync payload.
     */
    _addSyncMeta(data) {
        const now = Date.now();
        return {
            ...data,
            local_id: undefined,   // auto-increment — set by IndexedDB
            cloud_id: null,        // null until first successful cloud sync
            last_modified: now,
            sync_status: 'pending',   // 'pending' | 'synced' | 'conflict' | 'error'
            sync_attempts: 0,
            created_at: data.created_at || now
        };
    }

    async _getDB() {
        if (!this.db) await this.init();
        return this.db;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PUBLIC ENTITY API — all modules use these, never raw IndexedDB calls
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Save a new entity to any store.
     * Automatically adds all 6 sync metadata fields.
     * @returns {Promise<number>} local_id of the saved record
     */
    async saveEntity(storeName, data) {
        const db = await this._getDB();
        const record = this._addSyncMeta(data);
        return new Promise((resolve, reject) => {
            const tx = db.transaction([storeName], 'readwrite');
            const store = tx.objectStore(storeName);
            const req = store.add(record);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(`saveEntity failed on store: ${storeName}`);
        });
    }

    /**
     * Update an existing entity by local_id.
     * Auto-sets last_modified and sync_status:'pending' on every write.
     * @returns {Promise<void>}
     */
    async updateEntity(storeName, localId, updates) {
        const db = await this._getDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction([storeName], 'readwrite');
            const store = tx.objectStore(storeName);
            const getReq = store.get(localId);

            getReq.onsuccess = () => {
                const existing = getReq.result;
                if (!existing) {
                    reject(`updateEntity: record ${localId} not found in ${storeName}`);
                    return;
                }
                const updated = {
                    ...existing,
                    ...updates,
                    local_id: localId,
                    last_modified: Date.now(),
                    sync_status: 'pending'
                };
                const putReq = store.put(updated);
                putReq.onsuccess = () => resolve();
                putReq.onerror = () => reject(`updateEntity put failed on ${storeName}`);
            };
            getReq.onerror = () => reject(`updateEntity get failed on ${storeName}`);
        });
    }

    /**
     * Get all entities in a store that belong to a user.
     * Matches: owner_uid, user_uid, admin_uid, or membership in members[] / admins[].
     * @returns {Promise<Array>}
     */
    async getEntitiesByUser(storeName, userId) {
        const db = await this._getDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction([storeName], 'readonly');
            const store = tx.objectStore(storeName);
            const getAll = store.getAll();

            getAll.onsuccess = () => {
                const all = getAll.result || [];
                const filtered = all.filter(record => {
                    if (record.owner_uid === userId) return true;
                    if (record.user_uid === userId) return true;
                    if (record.admin_uid === userId) return true;
                    if (record.guardian_uid === userId) return true;
                    if (record.organizer_uid === userId) return true;
                    if (Array.isArray(record.members) && record.members.includes(userId)) return true;
                    if (Array.isArray(record.admins) && record.admins.includes(userId)) return true;
                    return false;
                });
                resolve(filtered);
            };
            getAll.onerror = () => reject(`getEntitiesByUser failed on ${storeName}`);
        });
    }

    /**
     * Get a single entity by its local_id (primary key).
     * @returns {Promise<Object>}
     */
    async getEntityById(storeName, localId) {
        const db = await this._getDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction([storeName], 'readonly');
            const store = tx.objectStore(storeName);
            const req = store.get(localId);
            req.onsuccess = () => resolve(req.result || null);
            req.onerror = () => reject(`getEntityById failed on ${storeName}`);
        });
    }

    /**
     * Read merged profile from both 'users' and 'user_profiles' stores.
     * @returns {Promise<Object>} merged profile object
     */
    async getProfile(userId) {
        const db = await this._getDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(['users', 'user_profiles'], 'readonly');
            const usersStore = tx.objectStore('users');
            const profileStore = tx.objectStore('user_profiles');

            const userReq = usersStore.get(userId);
            userReq.onsuccess = () => {
                const userBase = userReq.result || {};
                // user_profiles indexed by uid
                const profileIndex = profileStore.index('by_uid');
                const profReq = profileIndex.get(userId);
                profReq.onsuccess = () => {
                    const extended = profReq.result || {};
                    resolve({ ...userBase, ...extended });
                };
                profReq.onerror = () => resolve(userBase); // graceful fallback
            };
            userReq.onerror = () => reject(`getProfile: users store read failed for ${userId}`);
        });
    }

    /**
     * Write profile data to both 'users' and 'user_profiles' in one transaction.
     * @returns {Promise<void>}
     */
    async saveProfile(profileData) {
        const db = await this._getDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(['users', 'user_profiles'], 'readwrite');
            const usersStore = tx.objectStore('users');
            const profileStore = tx.objectStore('user_profiles');

            // Core auth record goes to users
            const userRecord = {
                profile_id: profileData.uid || profileData.profile_id,
                uid: profileData.uid || profileData.profile_id,
                username: profileData.username,
                whatsapp: profileData.whatsapp,
                password_hash: profileData.password_hash,
                profile_type: profileData.profile_type,
                created_at: profileData.created_at || Date.now(),
                last_modified: Date.now(),
                sync_status: 'pending',
                sync_attempts: 0,
                cloud_id: null
            };
            usersStore.put(userRecord);

            // Extended profile data goes to user_profiles
            const extRecord = this._addSyncMeta({
                uid: profileData.uid || profileData.profile_id,
                display_name: profileData.display_name || profileData.name,
                dob: profileData.dob,
                gender: profileData.gender,
                city: profileData.city,
                area: profileData.area,
                interests: profileData.interests || [],
                avatar: profileData.avatar || null,
                completeness: profileData.completeness || 0,
                ...profileData
            });
            profileStore.put(extRecord);

            tx.oncomplete = () => resolve();
            tx.onerror = () => reject('saveProfile transaction failed');
        });
    }

    /**
     * Get all records with sync_status:'pending' — used by the sync scheduler.
     * NEVER call this on 'medical_records' — it must never be synced.
     * @returns {Promise<Array>}
     */
    async getPendingSync(storeName) {
        if (storeName === 'medical_records' || storeName === 'daily_activity_summary') {
            const reason = storeName === 'medical_records' ? 'medical_records' : 'daily_activity_summary';
            console.warn(`StorageManager: ${reason} MUST NEVER be synced. Call blocked.`);
            return Promise.resolve([]);
        }
        const db = await this._getDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction([storeName], 'readonly');
            const store = tx.objectStore(storeName);
            const getAll = store.getAll();
            getAll.onsuccess = () => {
                const pending = (getAll.result || []).filter(r => r.sync_status === 'pending');
                resolve(pending);
            };
            getAll.onerror = () => reject(`getPendingSync failed on ${storeName}`);
        });
    }

    /**
     * Mark a record as synced after a successful cloud push.
     * @returns {Promise<void>}
     */
    async markSynced(storeName, localId, cloudId) {
        return this.updateEntity(storeName, localId, {
            sync_status: 'synced',
            cloud_id: cloudId
        });
    }

    /**
     * Clears auth session from LocalStorage only.
     * IndexedDB data is KEPT — user's content stays on device.
     * @returns {Promise<void>}
     */
    async logout() {
        localStorage.removeItem('mizano_session');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('mizano_last_panel');
        console.log('StorageManager: session cleared — IndexedDB data preserved');
        return Promise.resolve();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // LOCALSTORAGE WRAPPERS — preferences ONLY (no entity data here)
    // ─────────────────────────────────────────────────────────────────────────

    save(key, data) {
        try {
            localStorage.setItem(this.prefix + key, JSON.stringify(data));
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

    // ─────────────────────────────────────────────────────────────────────────
    // LEGACY IndexedDB WRAPPERS — kept for backward compatibility
    // ─────────────────────────────────────────────────────────────────────────

    async performTransaction(storeName, mode, operation) {
        await this._getDB();
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
        await this._getDB();
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
        await this._getDB();
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

    // ─────────────────────────────────────────────────────────────────────────
    // MIZANO-SPECIFIC HELPERS (preferences, filters, scroll, session)
    // ─────────────────────────────────────────────────────────────────────────

    cacheDatabase(entity, data) {
        return this.save(`db_${entity}`, { timestamp: Date.now(), payload: data });
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

    /**
     * logout — clears the user session from localStorage.
     * Called from hamburger menu and AuthManager.logout().
     */
    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('mizano_session');
        console.log('StorageManager: Session cleared.');
    }

    checkMigration() {
        const version = this.load('version', '1.0');
        if (version === '1.0') {
            console.log('StorageManager: Running migration to 1.1...');
            this.save('version', '1.1');
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // RESERVATION & WAITLIST (Venue System)
    // ─────────────────────────────────────────────────────────────────────────

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

    // ─────────────────────────────────────────────────────────────────────────
    // SYNC QUEUE — Phase 11: offline operation log
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Enqueue a pending sync operation.
     * Called by any module that mutates data while potentially offline.
     * The PulseUpdater scheduler drains this queue every 15 minutes.
     * NEVER call this for 'medical_records'.
     * @param {string} storeName  - Target IndexedDB store for the cloud push
     * @param {string} operation  - 'create' | 'update' | 'delete'
     * @param {Object} data       - The payload to push to the backend
     * @returns {Promise<number>} local_id of the queued entry
     */
    async queueSync(storeName, operation, data) {
        if (storeName === 'medical_records') {
            console.warn('StorageManager: medical_records MUST NEVER be synced. queueSync blocked.');
            return Promise.resolve(null);
        }
        return this.saveEntity('sync_queue', {
            store_name: storeName,
            operation,
            payload: data,
            status: 'pending',
            timestamp: Date.now()
        });
    }

    /**
     * Get all pending sync operations (used by PulseUpdater).
     * @returns {Promise<Array>}
     */
    async getPendingSyncQueue() {
        const db = await this._getDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(['sync_queue'], 'readonly');
            const store = tx.objectStore('sync_queue');
            const idx = store.index('by_status');
            const req = idx.getAll('pending');
            req.onsuccess = () => resolve(req.result || []);
            req.onerror = () => reject('getPendingSyncQueue failed');
        });
    }

    /**
     * Mark a sync queue entry as completed (or failed).
     * @param {number} localId
     * @param {'synced'|'error'} status
     */
    async resolveSyncQueueEntry(localId, status = 'synced') {
        return this.updateEntity('sync_queue', localId, { status });
    }

    /**
     * Get all users from the 'users' store.
     * Required for real credential lookup during login.
     * @returns {Promise<Array>}
     */
    async getAllUsers() {
        const db = await this._getDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(['users'], 'readonly');
            const store = tx.objectStore('users');
            const req = store.getAll();
            req.onsuccess = () => resolve(req.result || []);
            req.onerror = () => reject('getAllUsers failed');
        });
    }

}

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL SINGLETON — all modules access via window.mizanoStorage
// ─────────────────────────────────────────────────────────────────────────────
window.mizanoStorage = new StorageManager();
window.mizanoStorage.init().then(() => {
    console.log('StorageManager: Ready — all entity stores online');
    window.mizanoStorage.checkMigration();
}).catch(err => {
    console.error('StorageManager: Init failed —', err);
});
