/**
 * MIZANO MINE PANEL
 * User profile, teams, activities, and personal stats
 */

class MinePanel {
    constructor() {
        this.container = null;
    }

    /**
     * Render Mine panel
     */
    async render(containerId = 'drop-field-mine') {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        const user = window.authManager?.getCurrentUser();

        if (!user) {
            this.renderLoginPrompt();
            return;
        }

        if (user.is_guest) {
            this.renderGuestView();
            return;
        }

        this.renderUserProfile(user);
    }

    /**
     * Render login prompt
     */
    renderLoginPrompt() {
        this.container.innerHTML = `
            <div class="mine-login">
                <h3>Welcome to Mizano</h3>
                <p>Login to view your profile, teams, and activities</p>
                <button class="btn-primary" onclick="window.minePanel.quickLogin()">Quick Login (Demo)</button>
                <button class="btn-secondary" onclick="window.minePanel.guestMode()">Continue as Guest</button>
            </div>
        `;
    }

    /**
     * Render guest view
     */
    renderGuestView() {
        this.container.innerHTML = `
            <div class="mine-guest">
                <h3>👤 Guest Mode</h3>
                <p>You're browsing as a guest. Login to unlock full features:</p>
                <ul>
                    <li>✅ Join teams and events</li>
                    <li>✅ Track your activities</li>
                    <li>✅ View personalized recommendations</li>
                    <li>✅ Access your shopping history</li>
                </ul>
                <button class="btn-primary" onclick="window.minePanel.quickLogin()">Login Now</button>
            </div>
        `;
    }

    /**
     * Render user profile
     */
    async renderUserProfile(user) {
        const teams = window.authManager.getUserTeams();
        const activities = window.authManager.getUserActivities();
        const events = window.authManager.getUserEvents();

        const html = `
            <div class="mine-profile">
                <!-- Profile Header -->
                <div class="profile-header-card">
                    <div class="profile-avatar">
                        ${user.profile_picture ?
                `<img src="${user.profile_picture}" alt="${user.full_name}">` :
                `<div class="avatar-placeholder">${this.getInitials(user.full_name)}</div>`
            }
                    </div>
                    <div class="profile-info">
                        <h3>${user.full_name}</h3>
                        <p class="profile-location">📍 ${user.location || 'Gaborone'}</p>
                        <p class="profile-role">${this.getRoleLabel(user.role)}</p>
                    </div>
                    <button class="btn-edit" onclick="window.minePanel.editProfile()">Edit</button>
                </div>

                <!-- Stats Grid -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value">${teams.length}</div>
                        <div class="stat-label">Teams</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${activities.length}</div>
                        <div class="stat-label">Activities</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${events.length}</div>
                        <div class="stat-label">Events</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${user.sports?.length || 0}</div>
                        <div class="stat-label">Sports</div>
                    </div>
                </div>

                <!-- My Teams -->
                ${teams.length > 0 ? `
                    <div class="mine-section">
                        <h4>⚽ My Teams</h4>
                        <div class="teams-list">
                            ${teams.slice(0, 5).map(team => `
                                <div class="team-card-mini">
                                    <strong>${team.team_name}</strong>
                                    <span>${team.sport || 'Sport'}</span>
                                </div>
                            `).join('')}
                        </div>
                        ${teams.length > 5 ? `<button class="btn-view-all">View All ${teams.length} Teams</button>` : ''}
                    </div>
                ` : ''}

                <!-- Recent Activities -->
                ${activities.length > 0 ? `
                    <div class="mine-section">
                        <h4>📊 Recent Activities</h4>
                        <div class="activities-list">
                            ${activities.slice(0, 5).map(activity => `
                                <div class="activity-card-mini">
                                    <strong>${activity.activity_type}</strong>
                                    <span>${activity.duration || 0} min</span>
                                    <span>${new Date(activity.date).toLocaleDateString()}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- My Sports & Hobbies -->
                <div class="mine-section">
                    <h4>🏃 Sports & Hobbies</h4>
                    <div class="tags-list">
                        ${(user.sports || []).map(sport => `<span class="tag tag-sport">${sport}</span>`).join('')}
                        ${(user.hobbies || []).map(hobby => `<span class="tag tag-hobby">${hobby}</span>`).join('')}
                    </div>
                    ${(user.sports?.length === 0 && user.hobbies?.length === 0) ?
                `<p class="empty-state">Add your interests to get personalized recommendations</p>` : ''}
                </div>

                <!-- Quick Actions -->
                <div class="mine-section">
                    <h4>⚡ Quick Actions</h4>
                    <div class="quick-actions">
                        <button class="action-btn" onclick="window.minePanel.viewPulse()">
                            📊 View My Stats
                        </button>
                        <button class="action-btn" onclick="window.minePanel.viewTeams()">
                            ⚽ Manage Teams
                        </button>
                        <button class="action-btn" onclick="window.minePanel.viewActivities()">
                            🏃 Activity Log
                        </button>
                        <button class="action-btn" onclick="window.minePanel.switchProfile()">
                            🔄 Switch Profile
                        </button>
                        
                        ${(user.role !== 'coach' && user.role !== 'teacher' && user.role !== 'creator') ? `
                        <button class="action-btn" style="background: #ffd700; color: black; font-weight: bold;" onclick="window.MizanoProfile.renderLevel2('creator')">
                            🛡️ Unlock Creator Status
                        </button>` : ''}

                        ${(!user.capabilities?.includes('Guardian')) ? `
                        <button class="action-btn" style="background: #ffd700; color: black; font-weight: bold;" onclick="window.MizanoProfile.renderLevel2('guardian')">
                            👨‍👩‍👧 Unlock Guardian Status
                        </button>` : ''}
                        
                         ${(user.capabilities?.includes('Creator') || user.capabilities?.includes('Guardian') || user.role === 'coach') ? `
                        <button class="action-btn" style="background: #27ae60; color: white;" onclick="if(window.ResultEntryForm) window.ResultEntryForm.open()">
                            🏆 Post Results
                        </button>
                        <button class="action-btn" style="background: #000; color: #ffd700;" onclick="if(window.MizanoBusinessBuilder) window.MizanoBusinessBuilder.open()">
                            🏢 Register Business
                        </button>` : ''}
                    </div>
                </div>

                <!-- Logout -->
                <div class="mine-footer">
                    <button class="btn-logout" onclick="window.minePanel.logout()">Logout</button>
                </div>
            </div>
        `;

        this.container.innerHTML = html;
    }

    /**
     * Helper methods
     */
    getInitials(name) {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }

    getRoleLabel(role) {
        const labels = {
            player: '⚽ Player',
            coach: '👨‍🏫 Coach',
            parent: '👨‍👩‍👧 Parent',
            student: '🎓 Student',
            corporate: '🏢 Corporate',
            business: '🏪 Business Owner',
            guest: '👤 Guest'
        };
        return labels[role] || '👤 User';
    }

    /**
     * Action handlers
     */
    async quickLogin() {
        await window.authManager.quickLogin();
        await this.render();
    }

    async guestMode() {
        await window.authManager.login(); // Guest mode
        await this.render();
    }

    async logout() {
        window.authManager.logout();
        await this.render();
    }

    async editProfile() {
        alert('Profile editing coming soon!');
    }

    async viewPulse() {
        // Navigate to pulse dashboard
        if (window.associationsOverlay) {
            window.associationsOverlay.open();
        }
    }

    async viewTeams() {
        // Navigate to teams panel
        if (window.navController) {
            window.navController.navigateToPanel(6); // Teams panel
        }
    }

    async viewActivities() {
        alert('Activity log coming soon!');
    }

    async switchProfile() {
        const users = window.dataManager?.cache?.users || [];
        if (users.length === 0) {
            alert('No users available');
            return;
        }

        // Show simple profile picker (can be enhanced with UI)
        const userList = users.slice(0, 10).map((u, i) => `${i + 1}. ${u.full_name} (${u.role})`).join('\n');
        const choice = prompt(`Select a profile (1-10):\n\n${userList}`);

        if (choice) {
            const index = parseInt(choice) - 1;
            if (index >= 0 && index < 10 && users[index]) {
                await window.authManager.login(users[index].uid);
                await this.render();
            }
        }
    }
}

// Global instance
window.minePanel = new MinePanel();

// Listen for auth state changes
window.addEventListener('auth-state-changed', () => {
    if (window.minePanel) {
        window.minePanel.render();
    }
});
