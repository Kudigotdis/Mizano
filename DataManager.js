/**
 * MIZANO DATA MANAGER
 * Mandatory Protocol: No external servers. Relative paths only.
 * Based on MIZANO_DATA_SCHEMA.md v2.0
 */

class DataManager {
    constructor() {
        this.cache = {
            users: [],
            activities: [],
            teams: [],
            businesses: [],
            events: [],
            community: {},
            competitions: [],
            challenges: [],         // Phase 8: Offline Challenges
            habits: [],             // Phase 10: Habit Chains
            habit_logs: [],         // Phase 10: Habit Logs
            injury_log: [],         // Phase 10: Injury Log
            survey_responses: [],   // Phase 8: Mealfo Surveys
            participation_stats: [],// Phase 8: Heat map stats
            hobbies: [],
            shopping: [],           // Shopping items
            associations: [],       // Sports associations
            rsvps: {}, // RSVP state tracking
            leaderboards: {
                teams: [],
                players: [],
                schools: []
            },
            venues: [],             // Venue booking system
            spaces: [],             // Bookable spaces
            time_slots: [],         // Time slot availability
            marathons: [],          // Global marathons
            schools: [],             // Educational institutions
            discover: [],        // Spotlight/Discover panel data
            lessons: []          // Lesson/tutor data
        };
        this.basePath = './data/databases/';
    }

    /**
     * Initializes the data simulation layer by fetching all databases.
     * Functions offline inside Android WebView.
     */
    async init() {
        console.log('Mizano DataManager: Initializing local simulation layer...');
        try {
            await this.hydrate(); // Load persistent state first

            // 1. GATHER ALL USER SOURCES
            let allUsers = [];

            // A. Loaded from Storage
            if (window.mizanoStorage) {
                const storedUsers = await window.mizanoStorage.getAllUsers();
                if (storedUsers && storedUsers.length > 0) {
                    allUsers = storedUsers;
                }
            }

            // B. script-injected: window.MIZANO_DATA.profiles (from user_profiles_bw.js)
            if (window.MIZANO_DATA && window.MIZANO_DATA.profiles) {
                const normalized = window.MIZANO_DATA.profiles.map(u => this._normalizeUser(u));
                allUsers = [...allUsers, ...normalized];
            }

            // C. script-injected: window.MIZANO_DATA.users_personas (from users_personas.js)
            if (window.MIZANO_DATA && window.MIZANO_DATA.users_personas) {
                const normalized = window.MIZANO_DATA.users_personas.map(u => this._normalizeUser(u));
                allUsers = [...allUsers, ...normalized];
            }

            // D. script-injected: window.MIZANO_DATA.preview_users (from future handoff)
            if (window.MIZANO_DATA && window.MIZANO_DATA.preview_users) {
                const normalized = window.MIZANO_DATA.preview_users.map(u => this._normalizeUser(u));
                allUsers = [...allUsers, ...normalized];
            }

            this.cache.users = this._deduplicateUsers(allUsers);

            // SEEDING LOGIC: Seed if cache is still small
            if (this.cache.users.length < 100) {
                console.log('DataManager: User cache small. Seeding 1,000 RDPs...');
                await this.seedDeepRDPs();
            }

            await this.loadAnchorProfiles();
            this.cache.schools = await window.mizanoStorage?.getAllSchools() || [];

            await Promise.all([
                this.loadEntity('activities'),
                this.loadEntity('teams'),
                this.loadEntity('businesses'),
                this.loadEntity('events'),
                this.loadEntity('matches'),
                this.loadMarathons(),
                this.seedLeaderboards(),
                this.loadEntity('community'),
                this.loadEntity('challenges'),
                this.loadEntity('survey_responses'),
                this.loadEntity('participation_stats'),
                this.loadPhase10Data()
            ]);

            console.log(`Mizano DataManager: All databases loaded. Total Users: ${this.cache.users.length}`);
        } catch (error) {
            console.error('Mizano DataManager: Initialization failed.', error);
        }
    }

    _deduplicateUsers(users) {
        const seen = new Set();
        return users.filter(u => {
            if (seen.has(u.uid)) return false;
            seen.add(u.uid);
            return true;
        });
    }

    async loadAnchorProfiles() {
        try {
            console.log('DataManager: Loading anchor profiles (Kao & Friends)...');
            const response = await fetch('./data/mizano_profiles_anchor.json?v=' + Date.now());
            if (response.ok) {
                const rawAnchors = await response.json();
                const anchors = rawAnchors.map(u => this._normalizeUser(u));
                this.cache.users = [...(this.cache.users || []), ...anchors];
                console.log(`DataManager: Normalized and merged ${anchors.length} anchor profiles.`);
            }
        } catch (e) {
            console.warn('DataManager: No anchor profiles found or failed to load.');
        }
    }

    async seedDeepRDPs() {
        try {
            // Load RDPs from generated file (Relative to index.html)
            const profileResponse = await fetch('./data/mizano_1000_profiles.json');
            if (profileResponse.ok) {
                const rawProfiles = await profileResponse.json();
                const profiles = rawProfiles.map(u => this._normalizeUser(u));

                const schoolResponse = await fetch('./data/mizano_schools_fixtures.json');
                const schools = schoolResponse.ok ? await schoolResponse.json() : [];

                if (window.mizanoStorage) {
                    await window.mizanoStorage.bulkSaveUsers(profiles);
                    if (schools.length) await window.mizanoStorage.saveSchools(schools);
                    this.cache.users = [...(this.cache.users || []), ...profiles];
                    this.cache.schools = schools;
                    console.log(`DataManager: Successfully normalized and seeded ${profiles.length} RDPs.`);
                }
            }
        } catch (e) {
            console.error('DataManager: Seeding failed.', e);
        }
    }

    /**
     * UNIFIER: Normalizes inconsistent user data keys from different datasets.
     */
    _normalizeUser(raw) {
        return {
            uid: raw.uid || raw.profileID || raw.profile_id || `USR-${Math.random().toString(36).substr(2, 9)}`,
            name: raw.name || raw.display_name || raw.fullName || (raw.first_name ? `${raw.first_name} ${raw.surname || ''}`.trim() : 'Anonymous'),
            role: (raw.role || (raw.capabilities && raw.capabilities[0]) || 'player').toLowerCase(),
            location: raw.location || (raw.villageTownCity ? `${raw.villageTownCity}${raw.areaNeighborhood ? ' · ' + raw.areaNeighborhood : ''}` : 'Unknown'),
            whatsapp: raw.whatsapp || raw.whatsappNumber || raw.financial?.whatsapp || '',
            profile_type: raw.profile_type || (raw.age < 20 ? 'Student' : 'Adult'),
            ...raw // Keep original fields for specialty views
        };
    }

    /**
     * Pulls persistent data from StorageManager.
     */
    async hydrate() {
        const storage = window.mizanoStorage;
        if (!storage) return;

        const user = await storage.getCurrentUserId();
        if (user) {
            // Hydrate user-specific Phase 10 entities
            this.cache.habits = await storage.getEntitiesByUser('habits', user) || [];
            this.cache.habit_logs = await storage.getEntitiesByUser('habit_logs', user) || [];
            this.cache.injury_log = await storage.getEntitiesByUser('injury_log', user) || [];
            this.cache.challenges = await storage.getEntitiesByUser('challenges', user) || [];
            this.cache.survey_responses = await storage.getEntitiesByUser('survey_responses', user) || [];
        }

        this.cache.rsvps = storage.loadRSVPs();
        console.log('DataManager: Hydrated Phase 10 entities and RSVP states.');
    }

    /**
     * Internal loader for JSON entities.
     * Delegated to StorageManager to ensure offline persistence.
     */
    async loadEntity(entity) {
        const storage = window.mizanoStorage;

        // 1. Try to load from persistent cache first (delegated)
        if (storage) {
            const cachedData = storage.getCachedDatabase(entity);
            // ONLY use cache if it has data. If it's an empty array, it might be a failed state.
            if (cachedData && cachedData.length > 0) {
                this.cache[entity] = cachedData;
                console.log(`DataManager: Loaded ${entity} (${cachedData.length} records) from persistent cache.`);
                return cachedData;
            }
        }

        // 2. Check Global Data Object (File:// Protocol Support)
        if (window.MIZANO_DATA && window.MIZANO_DATA[entity]) {
            const data = window.MIZANO_DATA[entity];
            console.log(`DataManager: Loaded ${entity} (${data.length} records) from window.MIZANO_DATA (Script Injection).`);
            this.cache[entity] = data;
            if (storage) storage.cacheDatabase(entity, data);
            return data;
        }

        // 3. Fallback to network/local fetch
        try {
            const response = await fetch(`${this.basePath}${entity}.json`);
            if (!response.ok) throw new Error(`Failed to load ${entity}.json`);
            const data = await response.json();
            this.cache[entity] = data;
            console.log(`DataManager: Loaded ${entity} (${data.length} records) from Fetch.`);

            // 4. Save to persistent cache for next time (delegated)
            if (storage) {
                storage.cacheDatabase(entity, data);
            }
            return data;
        } catch (e) {
            console.warn(`DataManager: Fetch failed for ${entity}. Returning empty array.`);
            this.cache[entity] = [];
            return [];
        }
    }

    // Market / Shopping retrieval
    getShoppingDeals() {
        return this.cache.shopping || [];
    }

    // Community / Social retrieval
    getCommunityPosts() {
        if (!this.cache.community) return [];
        return [
            ...(this.cache.community.bulletin || []),
            ...(this.cache.community.jobs || []),
            ...(this.cache.community.lost_found || []),
            ...(this.cache.community.news || [])
        ];
    }

    /**
     * QUERY ENGINE
     */

    // Generic filter
    query(entity, predicate) {
        if (!this.cache[entity]) return [];
        return this.cache[entity].filter(predicate);
    }

    // Get specific entity by cloud_id or uid
    getById(entity, id) {
        if (!this.cache[entity]) return null;
        return this.cache[entity].find(item => item.uid === id || item.cloud_id === id || item.event_id === id || item.activity_id === id);
    }

    /**
     * Unified event lookup (Marathons + Regular Activities)
     */
    getEventById(id) {
        return this.getById('activities', id) || this.getById('marathons', id);
    }

    /**
     * RSVP Actions
     */
    setRSVP(activityId, status) {
        this.cache.rsvps[activityId] = status;
        if (window.mizanoStorage) {
            window.mizanoStorage.saveRSVP(activityId, status);
        }
        console.log(`DataManager: RSVP recorded for ${activityId} -> ${status}`);
    }

    getRSVP(activityId) {
        return this.cache.rsvps[activityId] || null;
    }

    /**
     * AUTHENTICATION ENGINE (Simulated)
     */
    getCurrentUser() {
        const storedUid = window.mizanoStorage ? window.mizanoStorage.getCurrentUserId() : window.localStorage.getItem('currentUser');
        if (storedUid) {
            const user = this.getById('users', storedUid);
            if (user) return user;
        }

        // Default / Fallback User (Kao Modise as primary demo)
        const kaoProfile = this.getById('users', 'BW-GAB-1001');
        if (kaoProfile) return kaoProfile;

        const demoUser = this.getById('users', 'USR-BW-GAB-DEMO-001');
        if (demoUser) return demoUser;

        const fallbackUser = this.getById('users', 'mizano_lesedi_002');
        if (fallbackUser) {
            fallbackUser.academic_alert = false;
        }
        return fallbackUser;
    }

    setCurrentUser(uid) {
        if (this.getById('users', uid)) {
            if (window.mizanoStorage) window.mizanoStorage.setCurrentUser(uid);
            else window.localStorage.setItem('currentUser', uid);
            console.log(`DataManager: Switched active user to ${uid}`);
            if (window.MizanoMine) window.MizanoMine.render();
            setTimeout(() => window.location.reload(), 300);
            return true;
        }
        return false;
    }

    getAllUsers() {
        return this.cache.users || [];
    }

    // Sport-specific activity retrieval
    getActivitiesBySport(sport) {
        return this.query('activities', a => a.sport === sport);
    }

    // Location-specific business retrieval (Enforces monetization visibility)
    getBusinessesByLocation(location) {
        const user = this.getCurrentUser();
        return this.query('businesses', b => {
            const matchesLocation = (b.location || '').includes(location) || (b.city || '').includes(location);
            const isOwner = user && (b.owner_id === user.uid || b.owner_id === user.profile_id);
            const isPubliclyVisible = b.active && b.approved;

            return matchesLocation && (isPubliclyVisible || isOwner);
        });
    }

    // Category-specific business retrieval (Enforces monetization visibility)
    getBusinessesByCategory(catId) {
        const user = this.getCurrentUser();
        return this.query('businesses', b => {
            const hasMain = (b.main_categories || []).includes(catId);
            const hasSub = (b.sub_categories || []).includes(catId);
            const matchesCategory = hasMain || hasSub;

            const isOwner = user && (b.owner_id === user.uid || b.owner_id === user.profile_id);
            const isPubliclyVisible = b.active && b.approved;

            return matchesCategory && (isPubliclyVisible || isOwner);
        });
    }

    /**
     * LEADERBOARD ENGINE
     */
    getLeaderboards(category) {
        if (!this.cache.leaderboards[category]) return [];

        // Sort by rank points descending
        return [...this.cache.leaderboards[category]].sort((a, b) => b.rank_points - a.rank_points);
    }

    async seedLeaderboards() {
        console.log('DataManager: Seeding 50+ ranking entries...');

        // 1. Teams Leaderboard (Extracting from Soccer Teams DB)
        this.cache.leaderboards.teams = [
            { id: 'T1', name: 'Township Rollers', points: 145, matches: 48, wins: 42, rank_points: 520, icon: '🏆' },
            { id: 'T2', name: 'Gaborone United', points: 138, matches: 48, wins: 40, rank_points: 498, icon: '⚽' },
            { id: 'T3', name: 'Jwaneng Galaxy', points: 132, matches: 45, wins: 38, rank_points: 470, icon: '💎' },
            { id: 'T4', name: 'BDF XI', points: 120, matches: 48, wins: 35, rank_points: 425, icon: '🪖' },
            { id: 'T5', name: 'Orapa United', points: 115, matches: 46, wins: 33, rank_points: 405, icon: '🔶' },
            { id: 'T6', name: 'Police XI', points: 98, matches: 48, wins: 28, rank_points: 350 },
            { id: 'T7', name: 'Extension Gunners', points: 92, matches: 48, wins: 26, rank_points: 330 },
            { id: 'T8', name: 'Sua Flamingoes', points: 88, matches: 47, wins: 25, rank_points: 315 },
            { id: 'T9', name: 'Mochudi Chiefs', points: 85, matches: 48, wins: 24, rank_points: 305 },
            { id: 'T10', name: 'Nico United', points: 72, matches: 48, wins: 20, rank_points: 260 },
            { id: 'T11', name: 'Holyghost FC', points: 65, matches: 48, wins: 18, rank_points: 235 },
            { id: 'T12', name: 'Block 3 United', points: 58, matches: 48, wins: 16, rank_points: 210 },
            { id: 'T13', name: 'UB Hawks', points: 55, matches: 45, wins: 15, rank_points: 200 },
            { id: 'T14', name: 'Notwane FC', points: 52, matches: 48, wins: 14, rank_points: 190 },
            { id: 'T15', name: 'Broadhurst Rovers', points: 48, matches: 48, wins: 13, rank_points: 175 },
            { id: 'T16', name: 'Matebele FC', points: 45, matches: 48, wins: 12, rank_points: 165 },
            { id: 'T17', name: 'Tlokweng United', points: 40, matches: 48, wins: 11, rank_points: 150 },
            { id: 'T18', name: 'Gabane Pirates', points: 38, matches: 48, wins: 10, rank_points: 140 },
            { id: 'T19', name: 'Mogoditshane Fighters', points: 35, matches: 48, wins: 9, rank_points: 130 },
            { id: 'T20', name: 'Lobatse Stars', points: 30, matches: 48, wins: 8, rank_points: 115 }
        ];

        // 2. Players Leaderboard (Extracting from User Profiles DB)
        this.cache.leaderboards.players = [
            { id: 'P1', name: 'Thato Molefe', goals: 12, matches: 23, borrow_score: 4.7, rank_points: 153, sport: 'soccer' },
            { id: 'P2', name: 'Naledi Kgosana', goals: 89, matches: 45, borrow_score: 5.0, rank_points: 585, sport: 'netball' },
            { id: 'P3', name: 'Kagiso Seabo', goals: 43, matches: 67, borrow_score: 4.9, rank_points: 398, sport: 'soccer' },
            { id: 'P4', name: 'Lerato Modise', goals: 15, matches: 23, borrow_score: 4.2, rank_points: 163, sport: 'soccer' },
            { id: 'P5', name: 'Boitumelo Masire', goals: 34, matches: 44, borrow_score: 4.7, rank_points: 305, sport: 'netball' },
            { id: 'P6', name: 'Tshepo Khama', goals: 21, matches: 19, borrow_score: 3.9, rank_points: 182, sport: 'soccer' },
            { id: 'P7', name: 'Sipho Ndlovu', goals: 27, matches: 27, borrow_score: 4.3, rank_points: 232, sport: 'soccer' },
            { id: 'P8', name: 'Musa Zulu', goals: 31, matches: 33, borrow_score: 4.6, rank_points: 267, sport: 'soccer' },
            { id: 'P9', name: 'Tapiwa Banda', goals: 8, matches: 11, borrow_score: 4.2, rank_points: 104, sport: 'soccer' },
            { id: 'P10', name: 'Tendai Moyo', goals: 19, matches: 21, borrow_score: 3.7, rank_points: 174, sport: 'soccer' },
            { id: 'P11', name: 'Onalenna Moagi', goals: 4, matches: 6, borrow_score: 3.6, rank_points: 68, sport: 'soccer' },
            { id: 'P12', name: 'Karabo Moeng', goals: 0, matches: 15, borrow_score: 4.2, rank_points: 72, sport: 'chess' },
            { id: 'P13', name: 'Thandi Dlamini', goals: 5, matches: 18, borrow_score: 4.5, rank_points: 106, sport: 'soccer' },
            { id: 'P14', name: 'Refilwe Moatlhodi', goals: 0, matches: 50, borrow_score: 5.0, rank_points: 150, sport: 'chess' },
            { id: 'P15', name: 'Dumisani Molefe', goals: 10, matches: 89, borrow_score: 4.5, rank_points: 273, sport: 'soccer' }
        ];

        // 3. Schools Leaderboard (Aggregating)
        this.cache.leaderboards.schools = [
            { id: 'S1', name: 'Northside Primary', points: 1250, rank_points: 850, sport: 'General' },
            { id: 'S2', name: 'Maru-a-Pula', points: 1180, rank_points: 820, sport: 'General' },
            { id: 'S3', name: 'LICS (Zambia)', points: 950, rank_points: 700, sport: 'General' },
            { id: 'S4', name: 'Orlando West High', points: 880, rank_points: 650, sport: 'General' },
            { id: 'S5', name: 'Churchill Boys High', points: 840, rank_points: 620, sport: 'General' },
            { id: 'S6', name: 'Thornhill Primary', points: 780, rank_points: 590 },
            { id: 'S7', name: 'Baobab Primary', points: 720, rank_points: 540 },
            { id: 'S8', name: 'Rainbow Secondary', points: 680, rank_points: 510 },
            { id: 'S9', name: 'Ledumang Senior', points: 620, rank_points: 480 },
            { id: 'S10', name: 'Gaborone Senior', points: 580, rank_points: 450 },
            { id: 'S11', name: 'St Josephs College', points: 550, rank_points: 420 },
            { id: 'S12', name: 'Phakalane English', points: 510, rank_points: 390 },
            { id: 'S13', name: 'Westwood International', points: 480, rank_points: 360 },
            { id: 'S14', name: 'Lobatse Senior', points: 450, rank_points: 340 },
            { id: 'S15', name: 'Kagiso Senior', points: 420, rank_points: 320 }
        ];

        console.log(`DataManager: Ranking cache populated with ${this.cache.leaderboards.teams.length + this.cache.leaderboards.players.length + this.cache.leaderboards.schools.length} entries.`);
    }

    // User profile retrieval
    getUser(uid) {
        return this.getById('users', uid);
    }

    /**
     * Persists a new user profile to local storage.
     */
    async createUser(profileData) {
        const newUser = {
            local_id: Date.now(), // Rough unique ID for local
            cloud_id: `pending_${Math.random().toString(36).substr(2, 9)}`,
            sync_status: 'pending',
            sync_attempts: 0,
            last_modified: Date.now(),
            created_at: Date.now(),
            ...profileData
        };

        this.cache.users.push(newUser);

        if (window.mizanoStorage) {
            window.mizanoStorage.cacheDatabase('users', this.cache.users);
        }

        console.log('DataManager: New profile created locally.', newUser);
        return newUser;
    }

    /**
     * Persists a new business entity with billing and monetization metadata.
     */
    async createBusiness(businessData) {
        const extraMain = Math.max(0, (businessData.main_categories || []).length - 2);
        const extraSubs = Math.max(0, (businessData.sub_categories || []).length - 4);
        const monthlyTotal = 200 + (extraMain * 100) + (extraSubs * 100);

        const newBusiness = {
            id: 'biz_' + Date.now(),
            owner_id: window.authManager?.getCurrentUser()?.uid || 'anonymous',
            active: false,
            approved: false,
            billing: {
                base_fee: 200,
                extra_main: extraMain,
                extra_subs: extraSubs,
                extra_fee: (extraMain * 100) + (extraSubs * 100),
                total_monthly: monthlyTotal,
                next_billing_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
            },
            created_at: Date.now(),
            last_modified: Date.now(),
            ...businessData
        };

        this.cache.businesses = this.cache.businesses || [];
        this.cache.businesses.push(newBusiness);

        if (window.mizanoStorage && window.mizanoStorage.saveBusiness) {
            await window.mizanoStorage.saveBusiness(newBusiness);
        }

        if (window.mizanoStorage) {
            window.mizanoStorage.cacheDatabase('businesses', this.cache.businesses);
        }

        return newBusiness;
    }

    /**
     * Updates an existing user profile and persists changes.
     */
    async updateUser(userId, data) {
        const index = this.cache.users.findIndex(u => u.uid === userId || u.profile_id === userId);
        let userToSave;

        if (index !== -1) {
            this.cache.users[index] = { ...this.cache.users[index], ...data, last_modified: Date.now() };
            userToSave = this.cache.users[index];
        } else {
            userToSave = { ...data, last_modified: Date.now() };
            if (!userToSave.uid && !userToSave.profile_id) userToSave.uid = userId;
            this.cache.users.push(userToSave);
        }

        // Persist to IndexedDB
        if (window.mizanoStorage && window.mizanoStorage.saveUser) {
            await window.mizanoStorage.saveUser(userToSave);
        }

        // Legacy storage fallback
        if (window.mizanoStorage) {
            window.mizanoStorage.cacheDatabase('users', this.cache.users);
        }

        return userToSave;
    }

    /**
     * Persists a new activity to local storage.
     */
    /**
     * Entity-Specific Helpers
     */
    getInstitutions() {
        return this.query('businesses', b => ['clinic', 'school', 'hospital'].includes(b.category));
    }

    getCompetitions() {
        return this.query('activities', a => a.activity_type === 'competition' || a.activity_type === 'league');
    }

    /**
     * Specialized filter for Marathon events from the 2026 database.
     */
    getMarathons() {
        // Combined filter for local activities and any injected tourism data
        return this.query('marathons', m => true);
    }

    /**
     * Mock Loader for the Botswana 2026 Events - specific to Marathons
     */
    async loadMarathons() {
        // In a real scenario, this would parse the MD or fetch a JSON export.
        // For this milestone, we seed the cache with key marathons identified in the audit.
        this.cache.marathons = [
            {
                "event_id": "BW-2026-FEB-003",
                "event_name": "FNB Kazungula Marathon",
                "start_date": "2026-02-28",
                "venue_name": "Kasane",
                "village_town": "Kasane",
                "sport": "athletics",
                "category": "sports",
                "mizano_event_type": "individual_performance",
                "card_type": "Registration-State Card",
                "activity_state": "upcoming",
                "price_range": "P150 - P450",
                "distances": ["5km", "10km", "21km", "42km"],
                "organizer": "FNB Botswana",
                "featured": true
            },
            {
                "event_id": "BW-2026-MAR-006",
                "event_name": "Gabs Half Marathon 2026",
                "start_date": "2026-03-15",
                "venue_name": "Airport Junction",
                "village_town": "Gaborone",
                "sport": "athletics",
                "category": "sports",
                "mizano_event_type": "individual_performance",
                "card_type": "Registration-State Card",
                "activity_state": "upcoming",
                "price_range": "P100 - P300",
                "distances": ["5km", "10km", "21km"]
            },
            {
                "event_id": "BW-2026-APR-016",
                "event_name": "Tropic of Capricorn Marathon",
                "start_date": "2026-04-25",
                "venue_name": "Palapye corridor",
                "village_town": "Palapye",
                "sport": "athletics",
                "category": "sports",
                "mizano_event_type": "individual_performance",
                "card_type": "Registration-State Card",
                "activity_state": "upcoming",
                "price_range": "P200 - P500",
                "distances": ["10km", "21km", "42km"]
            }
        ];
        return this.cache.marathons;
    }

    /**
     * Phase 10: Load Expanded Datasets from window.MIZANO_DATA
     */
    async loadPhase10Data() {
        console.log('DataManager: Loading Phase 10 expanded datasets...');

        // Load Events (212 total: 30 sponsored + 182 tourism)
        if (window.MIZANO_DATA && window.MIZANO_DATA.events) {
            this.cache.events = window.MIZANO_DATA.events;
            console.log(`DataManager: Loaded ${this.cache.events.length} events.`);
        }

        // Load Community Data (bulletin, lost/found, jobs, news)
        if (window.MIZANO_DATA && window.MIZANO_DATA.community) {
            this.cache.community = window.MIZANO_DATA.community;
            console.log(`DataManager: Loaded community data with ${this.cache.community.bulletin?.length || 0} bulletin posts.`);
        }

        // Load Competitions (40 competitions + 20 leagues)
        if (window.MIZANO_DATA && window.MIZANO_DATA.competitions) {
            this.cache.competitions = window.MIZANO_DATA.competitions;
            console.log(`DataManager: Loaded ${this.cache.competitions.length} competitions.`);
        }

        // ── FIX: Merge dedicated hobbies dataset ─────────────────────────────
        if (window.MIZANO_DATA && window.MIZANO_DATA.hobbies) {
            const hobbies = window.MIZANO_DATA.hobbies.map(h => ({
                ...h,
                activity_type: 'Hobby',          // normalise casing for filter match
                card_type: 'card-hobby',         // Use specific hobby template
                location: h.location?.display || h.location?.village || h.location || '',
                location_name: h.location?.venue_name || ''
            }));
            this.cache.activities = [...(this.cache.activities || []), ...hobbies];
            console.log(`DataManager: Merged ${hobbies.length} hobby items into activities.`);
        }

        // ── FIX: Merge dedicated leisure dataset ─────────────────────────────
        if (window.MIZANO_DATA && window.MIZANO_DATA.leisure) {
            const leisure = window.MIZANO_DATA.leisure.map(l => ({
                ...l,
                activity_type: 'Leisure',        // already correct, keep explicit
                card_type: 'card-leisure',       // Use specific leisure template
                location: l.location?.display || l.location?.village || l.location || '',
                location_name: l.location?.venue_name || ''
            }));
            this.cache.activities = [...(this.cache.activities || []), ...leisure];
            console.log(`DataManager: Merged ${leisure.length} leisure items into activities.`);
        }

        // ── FIX: Merge dedicated lessons/tutors dataset ───────────────────────
        if (window.MIZANO_DATA && window.MIZANO_DATA.lessons) {
            const lessons = window.MIZANO_DATA.lessons.map(l => ({
                ...l,
                activity_id: l.lesson_id || l.activity_id,
                activity_type: 'lesson',         // matches shell.js panel 4 filter
                title: l.title,
                location: l.location?.display || l.location?.village || '',
                location_name: l.location?.venue_name || l.location?.display || ''
            }));
            this.cache.activities = [...(this.cache.activities || []), ...lessons];
            console.log(`DataManager: Merged ${lessons.length} lessons into activities.`);
        }

        // ── FIX: Merge ALL groups (not just corporate) into teams cache ───────
        if (window.MIZANO_DATA && window.MIZANO_DATA.groups) {
            const allGroups = window.MIZANO_DATA.groups.map(g => ({
                ...g,
                id: g.group_id || g.id,
                name: g.name,
                location: g.location?.display || g.location?.village || '',
                location_name: g.location?.venue_name || ''
            }));
            this.cache.teams = [...(this.cache.teams || []), ...allGroups];
            console.log(`DataManager: Merged ${allGroups.length} groups/clubs into teams cache.`);
        }

        // ── FIX: Load discover/spotlight data into its own cache ─────────────
        if (window.MIZANO_DATA && window.MIZANO_DATA.discover) {
            this.cache.discover = window.MIZANO_DATA.discover.map(d => ({
                ...d,
                location: d.location || d.location_display || (d.tags ? d.tags.join(' ') : ''),
                title: d.title || d.headline || 'Spotlight',
                card_type: 'card-spotlight'
            }));
            console.log(`DataManager: Loaded ${this.cache.discover.length} discover spotlights.`);
        }

        // ── KEEP: Old activities filter (legacy hobbies_leisure_300.js) ───────
        if (window.MIZANO_DATA && window.MIZANO_DATA.activities) {
            const hobbiesLeisure = window.MIZANO_DATA.activities.filter(a =>
                a.activity_type === 'Hobbies' || a.activity_type === 'Leisure'
            );
            if (hobbiesLeisure.length > 0) {
                this.cache.activities = [...(this.cache.activities || []), ...hobbiesLeisure];
                console.log(`DataManager: Merged ${hobbiesLeisure.length} legacy hobbies/leisure activities.`);
            }
        }

        // Load Shopping Items
        if (window.MIZANO_DATA && window.MIZANO_DATA.shopping) {
            this.cache.shopping = window.MIZANO_DATA.shopping.map(item => ({
                ...item,
                card_type: 'card-shopping',
                location: item.location?.display || item.location?.village || item.location || 'Botswana'
            }));
            console.log(`DataManager: Loaded ${this.cache.shopping.length} shopping items (normalized).`);
        }

        // Mizano Stress Test Integration
        if (window.MIZANO_DATA && window.MIZANO_DATA.activities_stress) {
            this.cache.activities = [...(this.cache.activities || []), ...window.MIZANO_DATA.activities_stress];
            console.log(`DataManager: MIZANO STRESS TEST - Injected ${window.MIZANO_DATA.activities_stress.length} activities.`);
        }

        // Load Associations
        if (window.MIZANO_DATA && window.MIZANO_DATA.associations) {
            this.cache.associations = window.MIZANO_DATA.associations;
            console.log(`DataManager: Loaded ${this.cache.associations.length} associations from global script.`);
        }
        
        // Load Schools (ensure normalization)
        if (window.MIZANO_DATA && window.MIZANO_DATA.schools) {
            const schools = window.MIZANO_DATA.schools.map(s => ({
                ...s,
                location: s.location?.display || s.location?.village || s.location || 'Botswana',
                card_type: 'card-school'
            }));
            this.cache.schools = [...(this.cache.schools || []), ...schools];
            console.log(`DataManager: Loaded ${schools.length} schools (normalized).`);
        }

        // Load Phase 10 Specific Suggestions & Surveys if available
        if (window.MIZANO_DATA && window.MIZANO_DATA.sample_activity_suggestions) {
            this.cache.activity_suggestions = window.MIZANO_DATA.sample_activity_suggestions;
        }

        console.log('DataManager: Phase 10 data loading complete.');
    }

    // Phase 10 Getters
    getChallenges() { return this.cache.challenges || []; }
    getHabits() { return this.cache.habits || []; }
    getHabitLogs() { return this.cache.habit_logs || []; }
    getInjuries() { return this.cache.injury_log || []; }
    getSurveyResponses() { return this.cache.survey_responses || []; }
    getParticipationStats() { return this.cache.participation_stats || []; }

    async createActivity(activityData) {
        const newAct = {
            local_id: Date.now(),
            cloud_id: `act_pending_${Math.random().toString(36).substr(2, 9)}`,
            activity_id: activityData.title.toLowerCase().replace(/\s+/g, '-'),
            sync_status: 'pending',
            sync_attempts: 0,
            last_modified: Date.now(),
            created_at: Date.now(),
            ...activityData
        };

        this.cache.activities.unshift(newAct); // Put at top of feed

        if (window.mizanoStorage) {
            window.mizanoStorage.cacheDatabase('activities', this.cache.activities);
        }

        console.log('DataManager: New activity created locally.', newAct);
        return newAct;
    }

    async createTeam(teamData) {
        const newTeam = {
            id: 'team_' + Date.now(),
            cloud_id: `team_pending_${Math.random().toString(36).substr(2, 9)}`,
            sync_status: 'pending',
            last_modified: Date.now(),
            created_at: Date.now(),
            ...teamData
        };

        this.cache.teams.unshift(newTeam);

        if (window.mizanoStorage) {
            window.mizanoStorage.cacheDatabase('teams', this.cache.teams);
        }

        console.log('DataManager: New team created locally.', newTeam);
        return newTeam;
    }

    async updateProfilePhoto(userId, base64Data) {
        console.log(`DataManager: Updating profile photo for ${userId}`);
        const user = await this.updateUser(userId, { profile_picture: base64Data });

        // Clear browser cache for images if needed or trigger a global event
        window.dispatchEvent(new CustomEvent('profile-updated', { detail: user }));
        return user;
    }

    /**
     * MIXED CONTENT FEED GENERATOR
     */
    getHomeFeed() {
        const activities = this.cache.activities || [];
        const events = this.cache.events || [];
        const challenges = this.getChallenges().filter(c => c.status === 'active');

        // 1. Generate Dynamic Cards (Fallback to samples if available)
        const suggestion = window.MizanoSuggestionEngine ? window.MizanoSuggestionEngine.getCurrentSuggestion() : null;
        const suggestionCard = suggestion ? [{
            ...suggestion,
            mizano_entity_type: 'suggestion',
            priority: 100
        }] : [];

        // Mixing them into the feed
        const feed = [...suggestionCard, ...challenges, ...events, ...activities];

        // Sort by priority then date
        feed.sort((a, b) => {
            const prioA = a.priority || (a.mizano_entity_type === 'suggestion' ? 100 : a.mizano_entity_type === 'challenge' ? 80 : 50);
            const prioB = b.priority || (b.mizano_entity_type === 'suggestion' ? 100 : b.mizano_entity_type === 'challenge' ? 80 : 50);

            if (prioB !== prioA) return prioB - prioA;

            const dateA = new Date(a.startDate || a.start_date || a.start_time || '2026-01-01');
            const dateB = new Date(b.startDate || b.start_date || b.start_time || '2026-01-01');
            return dateA - dateB;
        });

        return feed;
    }
}

// Global Singleton for easy access in the shell
window.mizanoData = new DataManager();
