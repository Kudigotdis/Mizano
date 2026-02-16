/**
 * MIZANO COMPETITION BUILDER
 * Dynamic archetype dispatch and inline rule configuration.
 * Absolute Law: SPORT_ARCHETYPE_MAPPING.md
 */

class CompetitionBuilder {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.dataManager = window.mizanoData;
        this.nav = window.MizanoNav;

        this.state = {
            title: '',
            sport: '',
            archetype: '',
            venue: '',
            rules: {}
        };

        this.archetypes = {
            'timer_split': {
                label: 'Time-Structured',
                fields: [
                    { id: 'game_duration', label: 'Match Duration (min)', type: 'number', default: 90 },
                    { id: 'halves', label: 'Number of Halves', type: 'number', default: 2 }
                ]
            },
            'set_cap': {
                label: 'Target-Score',
                fields: [
                    { id: 'sets_to_win', label: 'Sets to Win', type: 'number', default: 2 },
                    { id: 'points_per_set', label: 'Points per Set', type: 'number', default: 21 }
                ]
            },
            'leaderboard': {
                label: 'Performance',
                fields: [
                    { id: 'metric', label: 'Measurement Metric', type: 'select', options: ['Time', 'Distance', 'Weight', 'Count'] },
                    { id: 'sort_order', label: 'Winner Order', type: 'select', options: ['Lowest Wins', 'Highest Wins'] }
                ]
            }
        };

        // Simplified mapping for demo dispatch
        this.sportToArchetype = {
            'Soccer': 'timer_split',
            'Basketball': 'timer_split',
            'Tennis': 'set_cap',
            'Volleyball': 'set_cap',
            'Athletics': 'leaderboard',
            'Swimming': 'leaderboard'
        };
    }

    render() {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="builder-wrapper">
                <div class="builder-header">
                    <button class="back-btn" onclick="window.MizanoNav.back()">‹</button>
                    <h2 style="margin-left:12px">Create Activity</h2>
                </div>

                <div class="builder-content">
                    <div class="builder-section">
                        <h3>1. Core Identity</h3>
                        <div class="form-group">
                            <label>Event Title</label>
                            <input type="text" id="build-title" placeholder="e.g. Sunday Social Soccer">
                        </div>
                        <div class="form-group">
                            <label>Sport</label>
                            <div class="sport-chip-container">
                                ${Object.keys(this.sportToArchetype).map(s => `
                                    <div class="sport-chip" onclick="window.MizanoBuilder.setSport('${s}')">${s}</div>
                                `).join('')}
                                <div class="sport-chip" onclick="alert('🌐 Other triggers 4-step wizard.')">🌐 Other</div>
                            </div>
                        </div>
                    </div>

                    <div id="builder-rules-panel" class="builder-section" style="display:none">
                        <h3>2. Game Rules (<span id="archetype-label"></span>)</h3>
                        <div id="archetype-fields"></div>
                    </div>

                    <div class="builder-section">
                        <h3>3. Logistics</h3>
                        <div class="form-group">
                            <label>Venue / Location Name</label>
                            <input type="text" id="build-venue" placeholder="e.g. Block 3 Field">
                        </div>
                    </div>
                </div>

                <div class="builder-footer">
                    <button class="save-btn" onclick="window.MizanoBuilder.save()">Create Activity</button>
                </div>
            </div>
        `;
    }

    setSport(sport) {
        this.state.sport = sport;
        this.state.archetype = this.sportToArchetype[sport] || 'leaderboard';

        // Update UI active state
        const chips = document.querySelectorAll('.sport-chip');
        chips.forEach(c => {
            c.classList.toggle('active', c.innerText === sport);
        });

        this.dispatchArchetype();
    }

    dispatchArchetype() {
        const panel = document.getElementById('builder-rules-panel');
        const label = document.getElementById('archetype-label');
        const fieldsContainer = document.getElementById('archetype-fields');

        const archetype = this.archetypes[this.state.archetype];

        panel.style.display = 'block';
        label.innerText = archetype.label;

        fieldsContainer.innerHTML = archetype.fields.map(f => `
            <div class="form-group">
                <label>${f.label}</label>
                ${f.type === 'select' ? `
                    <select id="rule-${f.id}">
                        ${f.options.map(o => `<option value="${o}">${o}</option>`).join('')}
                    </select>
                ` : `
                    <input type="${f.type}" id="rule-${f.id}" value="${f.default || ''}">
                `}
            </div>
        `).join('');

        // Reset title if empty
        const titleInput = document.getElementById('build-title');
        if (!titleInput.value) {
            titleInput.value = `Gaborone ${this.state.sport} Session`;
        }
    }

    async save() {
        const title = document.getElementById('build-title').value;
        const venue = document.getElementById('build-venue').value;

        if (!title || !this.state.sport || !venue) {
            alert('Please complete all identification fields.');
            return;
        }

        // Collect dynamic rules
        const rulesData = {};
        const archetype = this.archetypes[this.state.archetype];
        archetype.fields.forEach(f => {
            const el = document.getElementById(`rule-${f.id}`);
            rulesData[f.id] = el.value;
        });

        const newActivity = {
            title,
            sport: this.state.sport,
            activity_type: 'match',
            location_name: venue,
            status: 'published',
            rules: rulesData,
            rules_template: this.state.archetype,
            start_time: Date.now() + 86400000 // Mock: Tomorrow
        };

        const result = await this.dataManager.createActivity(newActivity);
        if (result) {
            alert('Activity created! It will appear in your local feed.');
            this.nav.back();
            // Trigger refresh
            if (window.MizanoFilter) window.MizanoFilter.apply();
        }
    }
}

// Global instance
window.MizanoBuilder = new CompetitionBuilder('builder-view');
