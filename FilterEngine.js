/**
 * MIZANO FILTER ENGINE
 * Handles multi-criteria dynamic filtering for the card system.
 * Optimized to prevent DOM rebuild storms by managing state centrally.
 */

class FilterEngine {
    constructor() {
        const storage = window.mizanoStorage;
        const savedCriteria = storage ? storage.loadFilters() : null;

        this.criteria = savedCriteria || {
            search: '',
            category: 'all',
            sport: 'all',
            status: 'all',
            location: 'Gaborone',
            area: 'all', // Added area tracking
            timeFrame: 'all',
            date: null
        };
        this.onFilterChange = null;

        // Force Gaborone every time, regardless of cache
        this.criteria.location = 'Gaborone';
        this.criteria.date = null; // Fix Bug 1: Date filter persists across sessions
        this.criteria.timeFrame = 'all';

        // Trigger initial apply if we loaded saved filters
        if (savedCriteria) {
            setTimeout(() => this.apply(), 100);
        }
    }

    /**
     * Updates a specific filter criteria and triggers the update.
     */
    update(key, value) {
        if (this.criteria[key] === value) return;
        this.criteria[key] = value;

        if (window.mizanoStorage) {
            window.mizanoStorage.saveFilters(this.criteria);
        }

        this.apply();
        this.updateUILabel();
    }

    clearDateFilter() {
        this.criteria.date = null;
        this.apply();
    }

    setDateFilter(isoDateString) {
        this.criteria.date = isoDateString;
        this.apply();
    }

    setTimePeriod(timePeriod) {
        this.criteria.timeFrame = timePeriod;
        this.apply();
    }

    /**
     * Generates the "Smart Syntax" label for Level B navigation.
     */
    getFilterLabel() {
        const activeFilters = [];
        if (this.criteria.sport !== 'all') activeFilters.push(this.criteria.sport);
        if (this.criteria.status !== 'all') activeFilters.push(this.criteria.status);
        if (this.criteria.category !== 'all') activeFilters.push(this.criteria.category);

        if (activeFilters.length === 0) return 'All';
        if (activeFilters.length === 1) return activeFilters[0].charAt(0).toUpperCase() + activeFilters[0].slice(1);
        if (activeFilters.length === 2) return `${activeFilters[0]} + ${activeFilters[1]}`;
        return `${activeFilters.length} filters.`;
    }

    updateUILabel() {
        const labelElem = document.getElementById('filter-label');
        if (labelElem) {
            labelElem.innerText = this.getFilterLabel();
        }
    }

    /**
     * Resets all filters to default.
     */
    reset() {
        this.criteria = {
            search: '',
            category: 'all',
            sport: 'all',
            status: 'all',
            location: 'Gaborone',
            timeFrame: 'all',
            date: null
        };

        if (window.mizanoStorage) {
            window.mizanoStorage.saveFilters(this.criteria);
        }

        this.apply();
    }

    /**
     * Applies the current criteria to a data set.
     * Following strict Mizano Filter Hierarchy:
     * 1. Location (Root)
     * 2. Category / Panel
     * 3. Time Period (If no specific date)
     * 4. Date (Explicitly selected)
     */
    filterData(dataList) {
        if (!Array.isArray(dataList)) {
            console.warn('FilterEngine: dataList is not an array:', dataList);
            return [];
        }

        let results = dataList;

        // 1. Root: Location Filter (Places)
        if (this.criteria.location && this.criteria.location.toLowerCase() !== 'all' && this.criteria.location.toLowerCase() !== 'all locations') {
            const target = this.criteria.location.toLowerCase();
            results = results.filter(item => {
                let itemLoc = '';
                if (typeof item.location === 'string') {
                    itemLoc = item.location;
                } else if (item.location && item.location.city) {
                    itemLoc = item.location.city;
                } else {
                    itemLoc = item.location_name || item.village_town || item.village || item.venue_name || '';
                }
                itemLoc = itemLoc.toLowerCase();

                if (target === 'gaborone') {
                    return itemLoc.includes('gaborone') || itemLoc.includes('gc') || itemLoc.includes('broadhurst') || itemLoc.includes('g-west') || itemLoc.includes('phase 2') || itemLoc.includes('block');
                }
                return itemLoc.includes(target);
            });
        }

        // 1.5. Sub-Location: Area Filter (Neighborhoods)
        if (this.criteria.area && this.criteria.area !== 'all') {
            const targetArea = this.criteria.area.toLowerCase();
            results = results.filter(item => {
                let itemLoc = '';
                if (typeof item.location === 'string') {
                    itemLoc = item.location;
                } else if (item.location && item.location.city) {
                    itemLoc = item.location.city;
                } else {
                    itemLoc = item.location_name || item.village_town || item.village || item.venue_name || '';
                }
                return itemLoc.toLowerCase().includes(targetArea);
            });
        }

        // 2. Category / Panel Filter
        // Note: category is often mapped in the caller (shell.js updatePanel), 
        // but we handle it here if it's set in criteria.
        if (this.criteria.sport !== 'all' || this.criteria.category !== 'all') {
            const sportTarget = this.criteria.sport;
            const catTarget = this.criteria.category;
            results = results.filter(item => {
                if (sportTarget !== 'all' && item.sport !== sportTarget) return false;
                if (catTarget !== 'all' && item.category !== catTarget && item.type !== catTarget) return false;
                return true;
            });
        }

        // 3. Search Filter (Additive)
        if (this.criteria.search) {
            const query = this.criteria.search.toLowerCase();
            results = results.filter(item => {
                const matchName = (item.title || item.event_name || item.eventName || '').toLowerCase().includes(query);
                const matchSport = (item.sport || item.activity_type || item.specific_sport || item.sport_display || '').toLowerCase().includes(query);
                const matchLoc = (item.location_name || item.village || item.location?.village || '').toLowerCase().includes(query);
                const matchCompany = (item.company || '').toLowerCase().includes(query);
                return matchName || matchSport || matchLoc || matchCompany;
            });
        }

        // 4. Time Period Filter (Only if no specific date is selected)
        if (!this.criteria.date && this.criteria.timeFrame && this.criteria.timeFrame !== 'all') {
            const now = new Date();
            results = results.filter(item => {
                const itemDateStr = item.start_time || item.start_date || item.startDate || item.start_datetime;
                if (!itemDateStr) return true; // Keep items with no date if not specifically filtering by time
                const itemDate = new Date(itemDateStr);

                if (this.criteria.timeFrame === 'today') {
                    return itemDate.toDateString() === now.toDateString();
                } else if (this.criteria.timeFrame === 'upcoming') {
                    return itemDate > now;
                } else if (this.criteria.timeFrame === 'past') {
                    return itemDate < now;
                } else if (this.criteria.timeFrame === 'weekend') {
                    const day = itemDate.getDay();
                    return day === 0 || day === 5 || day === 6;
                }
                return true;
            });
        }

        // 5. Date Filter (Lowest Priority, Explicit)
        if (this.criteria.date) {
            const targetDateStr = typeof this.criteria.date === 'string' ? this.criteria.date : new Date(this.criteria.date).toISOString().split('T')[0];
            results = results.filter(item => {
                const itemDateStr = item.start_time || item.start_date || item.startDate || item.start_datetime;
                if (!itemDateStr) return false;
                const eventDate = new Date(itemDateStr).toISOString().split('T')[0];
                return eventDate === targetDateStr;
            });
        }

        // 6. Activity Filter (Additive)
        if (this.criteria.activeActivity) {
            const target = this.criteria.activeActivity;
            results = results.filter(e =>
                (e.activity && e.activity === target) ||
                (e.activityType && e.activityType === target) ||
                (e.activity_type && e.activity_type === target) ||
                (e.sport && e.sport === target) ||
                (e.category && e.category === target) ||
                (e.type && e.type === target)
            );
        }

        return results;
    }

    /**
     * Aggregates results from multiple entities for the global search overlay.
     */
    globalSearch(query) {
        if (!query) return [];
        const q = query.toLowerCase();
        const data = window.mizanoData;
        if (!data) return [];

        let results = [];

        // 1. Search Activities & Events
        const activities = [...(data.cache.activities || []), ...(data.cache.events || [])];
        activities.forEach(item => {
            const matchName = (item.title || item.event_name || item.eventName || '').toLowerCase().includes(q);
            const matchSport = (item.sport || item.activity_type || '').toLowerCase().includes(q);
            if (matchName || matchSport) {
                results.push({ ...item, mizano_entity_type: 'activities' });
            }
        });

        // 2. Search Teams / Groups
        const teams = data.cache.teams || [];
        teams.forEach(item => {
            const matchName = (item.name || item.team_name || '').toLowerCase().includes(q);
            const matchSport = (item.sport || '').toLowerCase().includes(q);
            if (matchName || matchSport) {
                results.push({ ...item, mizano_entity_type: 'teams' });
            }
        });

        // 3. Search Businesses
        const businesses = data.cache.businesses || [];
        businesses.forEach(item => {
            const matchName = (item.name || item.business_name || '').toLowerCase().includes(q);
            const matchCat = (item.category || '').toLowerCase().includes(q);
            if (matchName || matchCat) {
                results.push({ ...item, mizano_entity_type: 'businesses' });
            }
        });

        // 4. Search Community Posts
        const community = data.getCommunityPosts();
        community.forEach(item => {
            const matchTitle = (item.title || '').toLowerCase().includes(q);
            const matchBody = (item.body || item.message || '').toLowerCase().includes(q);
            if (matchTitle || matchBody) {
                results.push({ ...item, mizano_entity_type: 'community' });
            }
        });

        // 5. Search Schools
        const schools = data.cache.schools || [];
        schools.forEach(item => {
            if ((item.school_name || '').toLowerCase().includes(q)) {
                results.push({ ...item, mizano_entity_type: 'schools' });
            }
        });

        // Remove duplicates if same object is in multiple caches (rare but possible)
        const seen = new Set();
        return results.filter(item => {
            const id = item.uid || item.cloud_id || item.event_id || item.activity_id || item.id;
            if (!id || seen.has(id)) return false;
            seen.add(id);
            return true;
        });
    }

    clearActivityFilter() {
        this.activeActivity = null; // Also clear the instance property if used in task 3
        this.criteria.activeActivity = null;
        this.apply();
        this.updateUILabel();
    }

    /**
     * Internal trigger for the listener.
     */
    apply() {
        if (this.onFilterChange) {
            this.onFilterChange(this.criteria);
        }
    }

    /**
     * Set the listener for when filters change.
     */
    setListener(callback) {
        this.onFilterChange = callback;
    }
}

// Global Singleton
window.MizanoFilter = new FilterEngine();
