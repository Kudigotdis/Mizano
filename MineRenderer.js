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
        if (!this.container || !this.dataManager) return;

        const user = this.dataManager.getCurrentUser();
        if (!user) {
            this.renderLogin();
            return;
        }

        this.container.innerHTML = `
            <div class="mine-dashboard">
                ${this.templateProfileCard(user)}
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
                    <h2 class="profile-name">${user.name}</h2>
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

    renderSettingsSwitcher(targetId) {
        const container = document.getElementById(targetId);
        if (!container) return;

        const users = this.dataManager.getAllUsers();
        const options = users.map(u => `<option value="${u.uid}" ${u.uid === this.dataManager.getCurrentUser()?.uid ? 'selected' : ''}>${u.name} (${u.profile_type})</option>`).join('');

        container.innerHTML = `
            <div class="auth-switcher" style="padding: 10px; background: #f0f4f8; border-radius: 8px; border: 1px solid #d9e2ec;">
                <label style="font-size: 0.8rem; color: #334e68; display:block; margin-bottom:5px; font-weight:bold;">Example Profile Switcher</label>
                <select onchange="window.MizanoMine.handleSwitch(this.value)" style="width:100%; padding:8px; border-radius:4px; border:1px solid #ccc;">
                    ${options}
                </select>
                <div style="font-size: 0.7rem; color: #888; margin-top: 5px;">* Select a user to stimulate different app experiences.</div>
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

// Global Init
window.MizanoMine = new MineRenderer('drop-field-mine');
