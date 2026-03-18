/**
 * MIZANO TRACKER RENDERER (User Dashboard)
 * Handles Tracker Overlay: Stats, Consistency, Health
 */

class TrackerRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.dataManager = window.mizanoData;
    }

    render() {
        const container = document.getElementById('tracker-dashboard-container') || this.container;
        if (!container || !this.dataManager) {
            console.warn('TrackerRenderer: Target container not found.');
            return;
        }

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
            <div class="tracker-dashboard">
                ${this.templateProfileCard(user)}
                ${this.templateConsistencyCalendar()}
                ${this.templateHabitChain()}
                ${suggestionHtml}
                ${this.templateHealthRecovery()}
                ${user.role === 'guardian' ? this.templateMinorFamily(user) : ''}
                ${this.templateManagedTeams(user)}
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
                `<option value="${u.uid}" ${u.uid === this.dataManager.getCurrentUser()?.uid ? 'selected' : ''}>${u.full_name || u.name}</option>`
            ).join('');

            return `<optgroup label="${roleLabel}s">${userOptions}</optgroup>`;
        }).join('');

        container.innerHTML = `
            <div class="auth-switcher" style="padding: 12px; background: #fff; border: 2px solid #000; margin-bottom: 20px;">
                <label style="font-size: 0.75rem; color: #000; display:block; margin-bottom:8px; font-weight:bold; text-transform:uppercase;">Experience App As:</label>
                <select onchange="window.MizanoTracker.handleSwitch(this.value)" style="width:100%; padding:10px; border:2px solid #000; font-family:inherit; background:#fff; cursor:pointer;">
                    ${options}
                </select>
                <div style="font-size: 0.7rem; color: #666; margin-top: 8px;">* Select a persona to test different permissions and feed views.</div>
            </div>
        `;
    }

    templateAuthSwitcher() {
        // Deprecated in Mine Panel, but kept for Login Screen
        const users = this.dataManager.getAllUsers();
        const options = users.map(u => `<option value="${u.uid}" ${u.uid === this.dataManager.getCurrentUser()?.uid ? 'selected' : ''}>${u.full_name || u.name} (${u.profile_type})</option>`).join('');

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
        if (window.MizanoNav) window.MizanoNav.switchPanel(0); // Jump home after switch
    }

    templateManagedTeams(user) {
        if (!user.managed_teams || user.managed_teams.length === 0) return '';

        let teamsHtml = '';
        user.managed_teams.forEach(teamId => {
            // For demo: assume GC009 is Madimo FC
            const teamName = teamId === 'GC009' ? 'Madimo FC' : `Team ${teamId}`;
            teamsHtml += `
                <div class="mizano-card" style="margin-top:10px; border-left:4px solid #1E88E5; padding:12px; display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <div style="font-weight:bold; font-size:1rem;">${teamName}</div>
                        <div style="font-size:0.8rem; color:#666;">Manager / Coach</div>
                    </div>
                    <button class="action-pill" onclick="window.TeamManager.open('${teamId}')">Manage Team</button>
                </div>
            `;
        });

        return `
            <div class="section-title" style="margin-top:20px;">Teams I Manage</div>
            ${teamsHtml}
        `;
    }

    templateMinorFamily(user) {
        const minors = (user.minors || []).map(mId => this.dataManager.getById('users', mId)).filter(Boolean);
        if (minors.length === 0) return `
            <div class="section-title" style="margin-top:20px;">Minor Family Management</div>
            <div class="mizano-card" style="margin-top:10px; border-left:4px solid #f39c12; padding:12px;">
                <div style="font-size:0.9rem; color:#666;">No minors linked to this account.</div>
                <button class="action-pill" style="margin-top:10px; width:100%;" onclick="alert('Opening Link Minor flow...')">+ Link Minor Account</button>
            </div>
        `;

        const minorCards = minors.map(m => `
            <div class="mizano-card" style="margin-top:10px; border-left:4px solid #2ecc71; padding:12px; display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; align-items:center; gap:10px;">
                    <div style="width:40px; height:40px; border-radius:50%; background:#eee; overflow:hidden;">
                        ${window.MizanoImages.render('avatars', m.profile_picture || null)}
                    </div>
                    <div>
                        <div style="font-weight:bold; font-size:1rem;">${m.full_name || m.name}</div>
                        <div style="font-size:0.8rem; color:#666;">${m.village_town || 'Gaborone'} • ${m.uid}</div>
                    </div>
                </div>
                <button class="action-pill" onclick="window.MizanoNav.openPage('profile-view', { userId: '${m.uid}' })">View Philanthropic</button>
            </div>
        `).join('');

        return `
            <div class="section-title" style="margin-top:20px;">Minor Family Management</div>
            ${minorCards}
            <button class="action-pill" style="margin-top:10px; width:100%; border:1px dashed #2ecc71; background:none; color:#27ae60;" onclick="alert('Opening Link Minor flow...')">+ Link Another Minor</button>
        `;
    }
}

// Global Init — container ID matches index.html #tracker-dashboard-container
window.MizanoMine = new TrackerRenderer('tracker-dashboard-container');
window.MizanoTracker = window.MizanoMine; // Legacy shim
