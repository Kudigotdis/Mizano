/**
 * MIZANO LEADERBOARD COMPONENT (Upgraded Phase 6)
 * Handles Level B overlays for global and regional rankings.
 * Consumes data from LeaderboardEngine.
 */

class Leaderboard {
    constructor() {
        this.containerId = 'leaderboard-overlay';
        this.currentTab = 'teams';
        this.engine = window.MizanoLeaderboardEngine;
        this.filters = {
            event: '100m', // Default event for individual tab
            ageGroup: 'Open',
            gender: 'Male', // Default
            locationScope: null,
            locationValue: null
        };
        this.isOpen = false;
    }

    open() {
        let overlay = document.getElementById(this.containerId);
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = this.containerId;
            overlay.className = 'level-b-overlay';
            document.body.appendChild(overlay);
        }

        overlay.innerHTML = this.render();
        overlay.classList.add('active');
        this.isOpen = true;

        // Sync Shell Navigation
        if (window.MizanoNav) {
            window.MizanoNav.history.push({ type: 'leaderboard' });
        }
    }

    close() {
        const overlay = document.getElementById(this.containerId);
        if (overlay) overlay.classList.remove('active');
        this.isOpen = false;
    }

    setTab(tab) {
        this.currentTab = tab;
        this.updateView();

        // Update tab UI
        document.querySelectorAll('.leaderboard-tabs button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });
    }

    updateFilter(key, value) {
        this.filters[key] = value;
        this.updateView();
    }

    updateView() {
        const subContent = document.querySelector('.leaderboard-list-container');
        if (subContent) subContent.innerHTML = this.renderList();
    }

    render() {
        return `
            <div class="leaderboard-header">
                <div class="drag-handle"></div>
                <h2>Leaderboards</h2>
                <button class="close-btn" onclick="window.MizanoLeaderboard.close()">✕</button>
            </div>
            
            <div class="leaderboard-tabs">
                <button class="${this.currentTab === 'teams' ? 'active' : ''}" data-tab="teams" onclick="window.MizanoLeaderboard.setTab('teams')">Teams</button>
                <button class="${this.currentTab === 'players' ? 'active' : ''}" data-tab="players" onclick="window.MizanoLeaderboard.setTab('players')">Athletes</button>
                <button class="${this.currentTab === 'schools' ? 'active' : ''}" data-tab="schools" onclick="window.MizanoLeaderboard.setTab('schools')">Schools</button>
            </div>

            <!-- FILTER CONTROLS (Only visible for 'players' tab) -->
            <div class="leaderboard-filters" style="display: ${this.currentTab === 'players' ? 'flex' : 'none'}; gap: 8px; padding: 10px; overflow-x: auto; background: #f5f5f5;">
                <select onchange="window.MizanoLeaderboard.updateFilter('event', this.value)">
                    <option value="100m" selected>100m Sprint</option>
                    <option value="200m">200m Sprint</option>
                    <option value="400m">400m Sprint</option>
                    <option value="800m">800m Run</option>
                    <option value="1500m">1500m Run</option>
                </select>
                <select onchange="window.MizanoLeaderboard.updateFilter('ageGroup', this.value)">
                    <option value="All">All Ages</option>
                    <option value="U13">U13</option>
                    <option value="U15">U15</option>
                    <option value="U17">U17</option>
                    <option value="Open" selected>Open</option>
                </select>
                <select onchange="window.MizanoLeaderboard.updateFilter('gender', this.value)">
                    <option value="Male" selected>Men</option>
                    <option value="Female">Women</option>
                </select>
            </div>

            <div class="leaderboard-list-container">
                ${this.renderList()}
            </div>
        `;
    }

    renderList() {
        // Re-render logic to ensure filters toggle correctly
        const filterEl = document.querySelector('.leaderboard-filters');
        if (filterEl) {
            filterEl.style.display = this.currentTab === 'players' ? 'flex' : 'none';
        }

        let data = [];
        if (!this.engine) {
            return `<p class="error-msg">Leaderboard Engine not loaded.</p>`;
        }

        if (this.currentTab === 'players') {
            data = this.engine.getRankings('individuals', this.filters);
        } else if (this.currentTab === 'teams') {
            data = this.engine.getRankings('teams', { sport: 'Football' }); // Default sport for now
        } else {
            // Fallback for Schools (using Teams logic for now or raw list)
            data = this.engine.getTeamRankings('Swimming'); // Example
        }

        if (!data || data.length === 0) return '<p class="empty-msg">No records found for these filters.</p>';

        return `
            <div class="rank-list">
                ${data.map((item, index) => {
            constrank = index + 1;
            const rankClass = index < 3 ? `rank-${index + 1}` : '';

            // Display Logic
            let name = item.name || item.athlete_name;
            let meta = '';
            let score = '';
            let scoreLabel = '';

            if (this.currentTab === 'players') {
                meta = `${item.school_name || 'Unknown School'} • ${item.location?.city || ''}`;
                score = item.value;
                scoreLabel = item.unit;
            } else {
                meta = `${item.matches_played || 0} Matches Played`;
                score = item.points;
                scoreLabel = 'pts';
            }

            const icon = (index === 0) ? '🥇' : (index === 1) ? '🥈' : (index === 2) ? '🥉' : `#${index + 1}`;

            return `
                        <div class="rank-item ${rankClass}">
                            <div class="rank-number">${icon}</div>
                            <div class="rank-info">
                                <div class="rank-name">${name}</div>
                                <div class="rank-meta">${meta}</div>
                            </div>
                            <div class="rank-score">
                                <span class="points">${score}</span>
                                <span class="label">${scoreLabel}</span>
                            </div>
                        </div>
                    `;
        }).join('')}
            </div>
        `;
    }
}

window.MizanoLeaderboard = new Leaderboard();
