/**
 * MIZANO MINE RENDERER (User Dashboard)
 * Handles Panel 8: Profile, Stats, Auth Switching
 */

class MineRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.dataManager = window.mizanoData;
    }

    render() {
        const container = document.getElementById('mine-dashboard-container');
        if (!container || !this.dataManager) return;

        const user = this.dataManager.getCurrentUser();
        if (!user) {
            this.renderLogin();
            return;
        }

        const suggestionEngine = window.MizanoSuggestionEngine;
        const suggestion = suggestionEngine ? suggestionEngine.getCurrentSuggestion() : null;
        let suggestionHtml = '';
        if (suggestion) {
            suggestionHtml = `
                <div class="mizano-card" style="margin-top:10px; margin-bottom:10px; border-left:4px solid #16a085;">
                    <div style="font-weight:bold; margin-bottom:5px;">💡 Activity of the Week: ${suggestion.title}</div>
                    <div style="font-size:0.9rem; color:#555;">${suggestion.description}</div>
                </div>
            `;
        }

        container.innerHTML = `
            <div class="mine-dashboard">

                ${this.templateConsistencyCalendar()}
                ${this.templateHabitChain()}
                ${suggestionHtml}
                ${this.templateHealthRecovery()}
                ${this.templateQuickActions(user)}
                
                <div class="section-title">My Activity Hub</div>
                <div class="mine-grid">
                    ${this.templateStatCard('Borrow Score', user.borrow_score || 'N/A', '⭐')}
                    ${this.templateStatCard('Matches', user.matches_played || 0, '⚽')}
                    ${this.templateStatCard('Teams', (user.teams || []).length, '🛡️')}
                </div>

                <div class="mizano-card" style="margin-top:20px; border-left:4px solid #4472C4;">
                    <div style="font-weight:bold; margin-bottom:5px;">Upcoming Schedule</div>
                    <div style="color:#666; font-size:0.9rem;">No upcoming matches synced.</div>
                </div>
            </div>
        `;
    }

    templateProfileCard(user) {
        return `
            <div class="profile-header-card">
                <div class="profile-avatar" style="overflow:hidden;">
                    ${window.MizanoImages.render('avatars', user.profile_picture || null)}
                </div>
                <div class="profile-info">
                    <h2 class="profile-name">${user.full_name || user.name || 'Mizano User'}</h2>
                    <div class="profile-role">${user.profile_type || 'User'} • ${user.village_town || 'Gaborone'}</div>
                    <div class="profile-id">ID: ${user.uid}</div>
                </div>
                <div class="qr-code-mini" title="Scan for Equipment/Match">
                    <img src="./images/qr_placeholder.webp" onerror="this.style.display='none'" style="width:40px; height:40px;">
                </div>
            </div>
        `;
    }

    templateQuickActions(user) {
        return `
            <div class="quick-actions-row">
                <button class="action-pill" onclick="alert('Opening QR Scanner...')">📷 Scan QR</button>
                <button class="action-pill" onclick="alert('Opening Match History...')">📜 History</button>
                <button class="action-pill" onclick="alert('Opening Edit Profile...')">✏️ Edit</button>
            </div>
        `;
    }

    templateStatCard(label, value, icon) {
        return `
            <div class="stat-card">
                <div class="stat-icon">${icon}</div>
                <div class="stat-value">${value}</div>
                <div class="stat-label">${label}</div>
            </div>
        `;
    }

    templateConsistencyCalendar() {
        const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
        const activeDays = [true, true, false, true, true, true, false]; // Mock data

        const dayHtml = days.map((day, ix) => `
            <div style="display:flex; flex-direction:column; align-items:center; opacity:${activeDays[ix] ? 1 : 0.5}">
                <div style="font-size:0.8rem; margin-bottom:4px">${day}</div>
                <div style="width:24px; height:24px; border-radius:50%; background:${activeDays[ix] ? '#27ae60' : '#e0e0e0'}; color:white; display:flex; align-items:center; justify-content:center; font-size:0.8rem;">
                    ${activeDays[ix] ? '✓' : ''}
                </div>
            </div>
        `).join('');

        return `
            <div class="mizano-card" style="margin-top:15px; margin-bottom:10px; padding:15px; border-left:4px solid #f39c12;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                    <div style="font-weight:bold; font-size:1rem;">Consistency Streak</div>
                    <div style="font-size:0.9rem; color:#f39c12; font-weight:bold;">🔥 4 Days</div>
                </div>
                <div style="display:flex; justify-content:space-between; padding:0 10px;">
                    ${dayHtml}
                </div>
            </div>
        `;
    }

    templateHabitChain() {
        return `
            <div class="mizano-card" style="margin-bottom:10px; border-left:4px solid #9b59b6; padding:15px;">
                <div style="font-weight:bold; margin-bottom:10px; font-size:1rem;">My Habit Chains</div>
                <div style="display:flex; overflow-x:auto; gap:10px; padding-bottom:5px;">
                    <div style="min-width:120px; background:#f0f4f8; padding:10px; border-radius:8px; text-align:center;">
                        <div style="font-size:1.5rem; margin-bottom:5px;">💧</div>
                        <div style="font-size:0.8rem; font-weight:bold;">Drink Water</div>
                        <div style="font-size:0.7rem; color:#666; margin-top:4px;">5 day chain</div>
                    </div>
                    <div style="min-width:120px; background:#f0f4f8; padding:10px; border-radius:8px; text-align:center;">
                        <div style="font-size:1.5rem; margin-bottom:5px;">🧘</div>
                        <div style="font-size:0.8rem; font-weight:bold;">Daily Stretch</div>
                        <div style="font-size:0.7rem; color:#666; margin-top:4px;">2 day chain</div>
                    </div>
                    <div style="min-width:120px; background:#e0e0e0; padding:10px; border-radius:8px; text-align:center; display:flex; align-items:center; justify-content:center; cursor:pointer;">
                        <div style="font-size:1.2rem; color:#555;">+ New</div>
                    </div>
                </div>
            </div>
        `;
    }

    templateHealthRecovery() {
        return `
            <div class="mizano-card" style="margin-bottom:10px; border-left:4px solid #e74c3c; padding:15px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <div style="font-weight:bold; font-size:1rem;">Health & Recovery</div>
                    <button style="background:none; border:none; color:#e74c3c; font-weight:bold; cursor:pointer; font-size:0.9rem;">+ Log</button>
                </div>
                <div style="background:#fef2f2; padding:10px; border-radius:6px; border:1px solid #fee2e2; margin-bottom:8px;">
                    <div style="font-weight:bold; font-size:0.9rem; color:#b91c1c;">Right Ankle Twist</div>
                    <div style="font-size:0.8rem; color:#7f1d1d; margin-top:2px;">3 days ago • Status: Resting</div>
                </div>
                <div style="background:#f0fdf4; padding:10px; border-radius:6px; border:1px solid #dcfce7;">
                    <div style="font-weight:bold; font-size:0.9rem; color:#15803d;">Lower Back Strain</div>
                    <div style="font-size:0.8rem; color:#166534; margin-top:2px;">Cleared to play • Logged 2 weeks ago</div>
                </div>
            </div>
        `;
    }

    renderAuthSwitcher(container) {
        const users = this.dataManager.getAllUsers();

        // Group by role for a better UX
        const roles = {
            'player': [],
            'creator': [],
            'guardian': [],
            'staff': [],
            'others': []
        };

        users.forEach(u => {
            const role = (u.role || 'player').toLowerCase();
            if (roles[role]) roles[role].push(u);
            else roles['others'].push(u);
        });

        const options = Object.keys(roles).map(role => {
            if (roles[role].length === 0) return '';
            const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);
            const userOptions = roles[role].slice(0, 15).map(u =>
                `<option value="${u.uid}" ${u.uid === this.dataManager.getCurrentUser()?.uid ? 'selected' : ''}>${u.name}</option>`
            ).join('');

            return `<optgroup label="${roleLabel}s">${userOptions}</optgroup>`;
        }).join('');

        container.innerHTML = `
            <div class="auth-switcher" style="padding: 12px; background: #fff; border: 2px solid #000; margin-bottom: 20px;">
                <label style="font-size: 0.75rem; color: #000; display:block; margin-bottom:8px; font-weight:bold; text-transform:uppercase;">Experience App As:</label>
                <select onchange="window.MizanoMine.handleSwitch(this.value)" style="width:100%; padding:10px; border:2px solid #000; font-family:inherit; background:#fff; cursor:pointer;">
                    ${options}
                </select>
                <div style="font-size: 0.7rem; color: #666; margin-top: 8px;">* Select a persona to test different permissions and feed views.</div>
            </div>
        `;
    }

    templateAuthSwitcher() {
        // Deprecated in Mine Panel, but kept for Login Screen
        const users = this.dataManager.getAllUsers();
        const options = users.map(u => `<option value="${u.uid}" ${u.uid === this.dataManager.getCurrentUser()?.uid ? 'selected' : ''}>${u.name} (${u.profile_type})</option>`).join('');

        return `
            <div class="auth-switcher" style="margin: 20px 0; padding: 10px; background: #eee; border-radius: 8px;">
                <label style="font-size: 0.8rem; color: #555; display:block; margin-bottom:5px;">Demo: Switch User Profile</label>
                <select onchange="window.MizanoMine.handleSwitch(this.value)" style="width:100%; padding:8px;">
                    ${options}
                </select>
            </div>
        `;
    }

    renderLogin() {
        this.container.innerHTML = `
            <div class="placeholder-msg">
                <h3>Welcome to Mizano</h3>
                <p>Please select a profile to stimulate the demo.</p>
                ${this.templateAuthSwitcher()}
            </div>
        `;
    }

    handleSwitch(uid) {
        this.dataManager.setCurrentUser(uid);
    }
}

// Global Init — container ID matches index.html #mine-dashboard-container
window.MizanoMine = new MineRenderer('mine-dashboard-container');
