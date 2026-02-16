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
            time_slots: []          // Time slot availability
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

            // SEEDING LOGIC: Check if we need to seed 1,000 RDPs
            if (window.mizanoStorage) {
                const existingUsers = await window.mizanoStorage.getAllUsers();
                if (existingUsers.length < 100) { // Seed if empty or mostly empty
                    console.log('DataManager: Database empty. Seeding 1,000 RDPs and School Fixtures...');
                    await this.seedDeepRDPs();
                } else {
                    this.cache.users = existingUsers;
                    this.cache.schools = await window.mizanoStorage.getAllSchools();
                }
            }

            await Promise.all([
                // (Existing entities load...)
                this.loadEntity('activities'),
                this.loadEntity('teams'),
                this.loadEntity('businesses'),
                this.loadEntity('matches'),
                this.loadMarathons(),
                this.seedLeaderboards(),
                this.loadPhase10Data()
            ]);

            console.log('Mizano DataManager: All local databases loaded into cache.');
        } catch (error) {
            console.error('Mizano DataManager: Initialization failed.', error);
        }
    }

    async seedDeepRDPs() {
        try {
            // Load RDPs from generated file (Relative to index.html)
            const profileResponse = await fetch('./data/mizano_1000_profiles.json');
            const profiles = await profileResponse.json();

            const schoolResponse = await fetch('./data/mizano_schools_fixtures.json');
            const schools = await schoolResponse.json();

            if (window.mizanoStorage) {
                await window.mizanoStorage.bulkSaveUsers(profiles);
                await window.mizanoStorage.saveSchools(schools);
                this.cache.users = profiles;
                this.cache.schools = schools;
                console.log(`DataManager: Successfully seeded ${profiles.length} RDPs and ${schools.length} Schools.`);
            }
        } catch (e) {
            console.error('DataManager: Seeding failed.', e);
        }
    }

    /**
     * Pulls persistent data from StorageManager.
     */
    async hydrate() {
        const storage = window.mizanoStorage;
        if (!storage) return;

        this.cache.rsvps = storage.loadRSVPs();
        console.log('DataManager: Hydrated RSVP states from persistent storage.');
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
            if (cachedData) {
                this.cache[entity] = cachedData;
                console.log(`DataManager: Loaded ${entity} from persistent cache.`);
                return cachedData;
            }
        }

        // 2. Check Global Data Object (File:// Protocol Support)
        if (window.MIZANO_DATA && window.MIZANO_DATA[entity]) {
            console.log(`DataManager: Loaded ${entity} from window.MIZANO_DATA (Script Injection).`);
            const data = window.MIZANO_DATA[entity];
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
        // Mock Data for Shopping Panel
        return [
            { id: 'deal_001', title: 'Puma Soccer Boots', price: 'P1,200', image: './images/deals/boots.webp', category: 'Shopping' },
            { id: 'deal_002', title: 'Mizano Official Jersey', price: 'P450', image: './images/deals/jersey.webp', category: 'Shopping' },
            { id: 'deal_003', title: 'Training Cones (Set)', price: 'P150', image: './images/deals/cones.webp', category: 'Shopping' }
        ];
    }

    // Community / Social retrieval
    getCommunityPosts() {
        // Mock Data for Community Panel
        return [
            { id: 'post_001', title: 'Victory for Block 3!', subtitle: 'Community Cup Results', image: './images/posts/cup_win.webp', category: 'Community' },
            { id: 'post_002', title: 'New Pitch Opening', subtitle: 'Gaborone North', image: './images/posts/pitch.webp', category: 'Community' },
            { id: 'post_003', title: 'Volunteer Coach Needed', subtitle: 'Phase 2 Primary', image: './images/posts/coach.webp', category: 'Community' }
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

        // Default / Fallback User (Karo Mjekejeke if demo loaded, else Lesedi)
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

        // Merge Corporate Teams into main teams cache
        if (window.MIZANO_DATA && window.MIZANO_DATA.teams) {
            const corporateTeams = window.MIZANO_DATA.teams.filter(t => t.category === 'Corporate');
            this.cache.teams = [...(this.cache.teams || []), ...corporateTeams];
            console.log(`DataManager: Merged ${corporateTeams.length} corporate teams into teams cache.`);
        }

        // Merge Hobbies/Leisure into activities
        if (window.MIZANO_DATA && window.MIZANO_DATA.activities) {
            const hobbiesLeisure = window.MIZANO_DATA.activities.filter(a =>
                a.activity_type === 'Hobbies' || a.activity_type === 'Leisure'
            );
            this.cache.activities = [...(this.cache.activities || []), ...hobbiesLeisure];
            console.log(`DataManager: Merged ${hobbiesLeisure.length} hobbies/leisure activities.`);
        }

        // Load Shopping Items
        if (window.MIZANO_DATA && window.MIZANO_DATA.shopping) {
            this.cache.shopping = window.MIZANO_DATA.shopping;
            console.log(`DataManager: Loaded ${this.cache.shopping.length} shopping items.`);
        }

        // Bothoflow Stress Test Integration
        if (window.MIZANO_DATA && window.MIZANO_DATA.activities_stress) {
            this.cache.activities = [...(this.cache.activities || []), ...window.MIZANO_DATA.activities_stress];
            console.log(`DataManager: BOTHOFLOW STRESS TEST - Injected ${window.MIZANO_DATA.activities_stress.length} activities.`);
        }

        // Load Associations
        if (window.MIZANO_DATA && window.MIZANO_DATA.associations) {
            this.cache.associations = window.MIZANO_DATA.associations;
            console.log(`DataManager: Loaded ${this.cache.associations.length} associations from global script.`);
        }

        console.log('DataManager: Phase 10 data loading complete.');
    }

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

        // 1. Generate Dynamic Cards
        const suggestions = [
            {
                card_type: 'Suggestion Card',
                title: 'Try Padel Tennis',
                description: 'The fastest growing sport in Gaborone. Book a court at Set & Smash.',
                action_label: "I'll try it"
            }
        ];

        const challenges = [
            {
                card_type: 'Challenge Card',
                challenge_id: 'ch_001',
                title: 'Block 3 Runners Week',
                participants: 124,
                goal: 'Run 10km this week',
                reward: 'Earn "Local Hero" Badge'
            }
        ];

        const surveys = [
            {
                card_type: 'Survey Card',
                survey_id: 'srv_001',
                question: 'Which sports facility does Block 8 need most?',
                options: ['Skate Park', 'Basketball Court', 'Swimming Pool']
            }
        ];

        // 2. Mix them into the feed (Simple Interleave)
        // [Suggestion, Activity, Activity, Challenge, Activity, Activity, Survey, ...]
        const feed = [...activities];

        if (feed.length > 0) feed.splice(0, 0, suggestions[0]);
        if (feed.length > 2) feed.splice(3, 0, challenges[0]);
        if (feed.length > 5) feed.splice(6, 0, surveys[0]);

        return feed;
    }
}

// Global Singleton for easy access in the shell
window.mizanoData = new DataManager();
