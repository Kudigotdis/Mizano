/**
 * MIZANO LEADERBOARD ENGINE
 * Handles sorting, filtering, and result submission for Global Leaderboards.
 */

class LeaderboardEngine {
    constructor() {
        this.records = []; // Individual Records
        this.teamStandings = {}; // Aggregated Team Data
        this.dataManager = window.mizanoData || {};

        this.init();
    }

    init() {
        // Load Records
        if (window.MIZANO_DATA && window.MIZANO_DATA.athletics_records) {
            this.records = window.MIZANO_DATA.athletics_records;
        }

        // Load Team Standings (from generated_leaderboards.js)
        if (window.MIZANO_DATA && window.MIZANO_DATA.leaderboards) {
            this.teamStandings = window.MIZANO_DATA.leaderboards;
        }

        console.log('LeaderboardEngine: Initialized with', this.records.length, 'records.');
    }

    /**
     * Get Rankings based on criteria.
     * @param {string} type - 'individuals' or 'teams'
     * @param {object} filters - { event, ageGroup, gender, locationScope, locationValue, sport }
     */
    getRankings(type, filters) {
        if (type === 'teams') {
            return this.getTeamRankings(filters.sport || 'Football');
        } else {
            return this.getIndividualRankings(filters);
        }
    }

    /**
     * Filter and Sort Individual Records
     */
    getIndividualRankings(filters) {
        let filtered = this.records.filter(r => {
            if (filters.event && r.event_id !== filters.event) return false;
            if (filters.ageGroup && filters.ageGroup !== 'All' && r.age_group !== filters.ageGroup) return false;
            if (filters.gender && filters.gender !== 'All' && r.gender !== filters.gender) return false;

            // Location Filtering
            if (filters.locationScope && filters.locationValue) {
                // e.g. Scope: 'city', Value: 'Gaborone'
                if (r.location[filters.locationScope] !== filters.locationValue) return false;
            }

            return true;
        });

        // Sort (Ascending for Time, Descending for Distance/Score)
        // For now, assuming Time (Ascending) for Track
        filtered.sort((a, b) => a.value - b.value);

        return filtered;
    }

    /**
     * Get Team Rankings (League Table)
     */
    getTeamRankings(sport) {
        let teams = this.teamStandings[sport] || [];

        // Sort by Points (3 for Win, 1 for Draw)
        // Data format: { wins, draws, losses }
        return teams.map(t => {
            t.points = (t.wins * 3) + (t.draws * 1);
            return t;
        }).sort((a, b) => b.points - a.points);
    }

    /**
     * Teacher/Coach posts a new result.
     */
    addResult(resultData) {
        // Create Record Object
        const newRecord = {
            id: `rec_gen_${Date.now()}`,
            ...resultData,
            date: new Date().toISOString().split('T')[0],
            verified: false // Requires admin/association approval
        };

        this.records.push(newRecord);
        console.log('LeaderboardEngine: New Result Added:', newRecord);

        // In a real app, this would POST to backend
        // Here we just keep it in memory for the session
        return newRecord;
    }
}

// Global Instance
window.MizanoLeaderboardEngine = new LeaderboardEngine();
