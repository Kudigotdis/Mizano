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
            location: 'Gaborone', // Default to Gaborone (GC)
            timeFrame: 'all',
            date: null
        };
        this.onFilterChange = null;

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
     */
    filterData(dataList) {
        return dataList.filter(item => {
            // 1. Search Filter (Case Insensitive)
            if (this.criteria.search) {
                const query = this.criteria.search.toLowerCase();
                const matchName = (item.title || item.event_name || item.eventName || '').toLowerCase().includes(query);
                const matchSport = (item.sport || item.activity_type || item.specific_sport || item.sport_display || '').toLowerCase().includes(query);
                const matchLoc = (item.location_name || item.village || item.location?.village || '').toLowerCase().includes(query);
                const matchCompany = (item.company || '').toLowerCase().includes(query);
                if (!matchName && !matchSport && !matchLoc && !matchCompany) return false;
            }

            // 2. Sport Archetype Filter
            if (this.criteria.sport !== 'all') {
                if (item.sport !== this.criteria.sport) return false;
            }

            // 3. Status Engine Filter
            if (this.criteria.status !== 'all') {
                if (item.status !== this.criteria.status && item.state !== this.criteria.status) return false;
            }

            // 4. Location Filter (Places)
            if (this.criteria.location !== 'all') {
                const target = this.criteria.location.toLowerCase();

                // Unify Location Field Access
                let itemLoc = '';
                if (typeof item.location === 'string') {
                    itemLoc = item.location; // Schools, Businesses
                } else if (item.location && item.location.city) {
                    itemLoc = item.location.city; // Associations
                } else {
                    itemLoc = item.location_name || item.village_town || item.village || item.venue_name || ''; // Activities, Events
                }
                itemLoc = itemLoc.toLowerCase();

                // If filtering by "Gaborone", show everything in Gaborone (GC, G-West, Broadhurst implied)
                if (target === 'gaborone') {
                    if (!itemLoc.includes('gaborone') && !itemLoc.includes('gc') && !itemLoc.includes('broadhurst') && !itemLoc.includes('g-west') && !itemLoc.includes('phase 2') && !itemLoc.includes('block')) return false;
                } else {
                    // Specific location match
                    if (!itemLoc.includes(target)) return false;
                }
            }

            // 5. Time Filter
            if (this.criteria.timeFrame !== 'all' || this.criteria.date) {
                const itemDate = new Date(item.start_time || item.start_date || item.startDate || item.start_datetime);
                const now = new Date();

                if (this.criteria.date) {
                    const targetDate = new Date(this.criteria.date);
                    if (itemDate.toDateString() !== targetDate.toDateString()) return false;
                } else if (this.criteria.timeFrame === 'today') {
                    if (itemDate.toDateString() !== now.toDateString()) return false;
                } else if (this.criteria.timeFrame === 'weekend') {
                    // Simple weekend check (Friday catch-all to Sunday)
                    const day = itemDate.getDay();
                    if (day !== 0 && day !== 5 && day !== 6) return false;
                }
            }

            return true;
        });
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
