/**
 * MIZANO FILTER PANELS
 * Implements Level B (Category) and Level C (Time) slide-up sheets.
 */

class FilterPanels {
    constructor() {
        this.activeSheet = null;
        this.filterEngine = window.MizanoFilter;
        this.initBackdrop();
    }

    initBackdrop() {
        let backdrop = document.getElementById('filter-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.id = 'filter-backdrop';
            backdrop.className = 'filter-backdrop';
            backdrop.addEventListener('click', () => this.close());
            document.body.appendChild(backdrop);
        }
    }

    open(type) {
        this.close(); // Close existing
        this.activeSheet = type;

        const sheet = document.getElementById(`filter-sheet-${type}`);
        if (sheet) {
            sheet.classList.add('active');
            document.getElementById('filter-backdrop').classList.add('active');
        } else {
            this.renderSheet(type);
        }
    }

    renderSheet(type) {
        const sheet = document.createElement('div');
        sheet.id = `filter-sheet-${type}`;
        sheet.className = 'filter-sheet active';

        const content = this.getContent(type);
        sheet.innerHTML = `
            <div class="filter-sheet-header">
                <h3>Select ${type === 'activity' ? 'Activity' : 'Location'}</h3>
                <button onclick="window.MizanoFilters.close()">✕</button>
            </div>
            <div class="filter-sheet-content">
                ${content}
            </div>
        `;

        document.body.appendChild(sheet);
        document.getElementById('filter-backdrop').classList.add('active');
    }

    getContent(type) {
        if (type === 'activity') {
            const categories = {
                "Sports": ["Soccer", "Basketball", "Netball", "Volleyball", "Rugby", "Tennis", "Cricket", "Athletics", "Swimming", "Chess", "Darts"],
                "Wellness & Fitness": ["Yoga", "Pilates", "Gym", "Aerobics", "Zumba", "Cycling", "Hiking", "Marathon"],
                "Professional & Skills": ["Coding", "Graphic Design", "Soft Skills", "Public Speaking", "Mechanics", "Carpentry"],
                "Hobbies & Leisure": ["Photography", "Gaming", "Bird Watching", "Reading", "Stargazing", "Knitting"],
                "Community": ["Volunteer", "Charity", "Religious", "Cleanup", "Blood Donation"]
            };

            return Object.entries(categories).map(([cat, items]) => `
                <div class="filter-category">
                    <div class="category-header" onclick="this.parentElement.classList.toggle('expanded')">
                        <h4>${cat}</h4>
                        <span class="toggle-icon">+</span>
                    </div>
                    <div class="category-items">
                        ${items.map(item => `
                            <div class="filter-item-chip ${this.filterEngine.criteria.sport === item.toLowerCase() ? 'active' : ''}" 
                                 onclick="window.MizanoFilters.select('sport', '${item.toLowerCase()}')">
                                ${item}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('') + `
                <hr style="margin:20px 0; border:1px solid rgba(0,0,0,0.05)">
                <div class="filter-item-chip" onclick="window.MizanoFilters.select('sport', 'all')">Clear / Show All</div>
            `;
        } else if (type === 'places') {
            const cities = [
                { id: 'Gaborone', label: 'Gaborone', iso: 'GC' },
                { id: 'Francistown', label: 'Francistown', iso: 'FT' },
                { id: 'Maun', label: 'Maun', iso: 'MN' },
                { id: 'Kasane', label: 'Kasane', iso: 'KS' }
            ];

            const neighborhoods = {
                'Gaborone': [
                    { id: 'CBD', label: 'Central Business', iso: 'GC' },
                    { id: 'Block 3', label: 'Block 3', iso: 'GC' },
                    { id: 'Phakalane', label: 'Phakalane', iso: 'GC' },
                    { id: 'Broadhurst', label: 'Broadhurst', iso: 'GC' },
                    { id: 'G-West', label: 'Gaborone West', iso: 'GC' }
                ]
            };

            const selected = this.filterEngine.criteria.location;
            const isCity = cities.find(c => c.id === selected);

            if (isCity && neighborhoods[selected]) {
                // Focus Mode (Vanish Logic): Show only associated areas
                return `
                    <div style="padding: 10px; margin-bottom: 15px; background: rgba(0,0,0,0.05); border-radius: 8px; display: flex; align-items: center;">
                        <button onclick="window.MizanoFilters.select('location', 'all')" style="background: none; border: 1px solid #ccc; border-radius: 4px; padding: 4px 8px; margin-right: 10px;">← Cities</button>
                        <span style="font-weight: bold;">${selected} Neighborhoods</span>
                    </div>
                    <div class="location-grid">
                        ${neighborhoods[selected].map(l => `
                            <div class="location-item ${this.filterEngine.criteria.location === l.id ? 'active' : ''}" 
                                 onclick="window.MizanoFilters.select('location', '${l.id}')">
                                <span class="iso">${l.iso}</span>
                                <span class="label">${l.label}</span>
                            </div>
                        `).join('')}
                    </div>
                `;
            }

            // Default Mode: Dynamic list of cities
            return `
                <div class="location-grid">
                    ${cities.map(l => `
                        <div class="location-item ${this.filterEngine.criteria.location === l.id ? 'active' : ''}" 
                             onclick="window.MizanoFilters.select('location', '${l.id}')">
                            <span class="iso">${l.iso}</span>
                            <span class="label">${l.label}</span>
                        </div>
                    `).join('')}
                    <div class="location-item" onclick="window.MizanoFilters.select('location', 'all')">
                        <span class="iso">??</span>
                        <span class="label">Show All / Other</span>
                    </div>
                </div>
            `;
        }
        return '';
    }

    select(key, value) {
        this.filterEngine.update(key, value);
        this.close();
    }

    close() {
        document.querySelectorAll('.filter-sheet').forEach(s => s.classList.remove('active'));
        const backdrop = document.getElementById('filter-backdrop');
        if (backdrop) backdrop.classList.remove('active');
        this.activeSheet = null;
    }
}

window.MizanoFilters = new FilterPanels();
