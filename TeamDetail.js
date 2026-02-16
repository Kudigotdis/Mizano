/**
 * MIZANO TEAM DETAIL INTERFACE
 * Level B Deep View for Clubs & Teams.
 */

class TeamDetail {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentTab = 'about';
        this.activeTeamId = null;
    }

    render(team) {
        if (!this.container) return;
        this.activeTeamId = team.team_id || team.uid;

        this.container.innerHTML = `
            <div class="team-detail-wrapper">
                <div class="team-hero">
                    <button class="back-btn" onclick="window.MizanoNav.back()">‹ Back</button>
                    ${window.MizanoImages.render('logos', team.logo, 'team-large-logo')}
                    <h1 class="team-display-name">${team.name}</h1>
                    <div class="team-type-tag">${team.sport} • ${team.type || 'Club'}</div>
                </div>

                <div class="tab-bar">
                    <button class="tab-btn ${this.currentTab === 'about' ? 'active' : ''}" onclick="window.MizanoTeamDetail.switchTab('about')">About</button>
                    <button class="tab-btn ${this.currentTab === 'roster' ? 'active' : ''}" onclick="window.MizanoTeamDetail.switchTab('roster')">Roster</button>
                    <button class="tab-btn ${this.currentTab === 'matches' ? 'active' : ''}" onclick="window.MizanoTeamDetail.switchTab('matches')">Matches</button>
                </div>

                <div class="tab-content">
                    ${this.renderTabContent(team)}
                </div>

                <div class="action-footer">
                    <button class="join-team-btn" onclick="window.MizanoTeamDetail.requestJoin()">Request to Join</button>
                </div>
            </div>
        `;
    }

    renderTabContent(team) {
        switch (this.currentTab) {
            case 'about':
                return `
                    <div class="about-pane">
                        <section>
                            <h3>Information</h3>
                            <p>${team.description || `A community ${team.sport} team based in ${team.village_town || 'Botswana'}.`}</p>
                            <ul>
                                <li><strong>Founded:</strong> ${team.founded_year || '2026'}</li>
                                <li><strong>Venue:</strong> ${team.venue_name || 'Various'}</li>
                            </ul>
                        </section>
                        <section>
                            <h3>Social</h3>
                            <div class="social-links">
                                <button class="social-btn">WhatsApp</button>
                                <button class="social-btn">Facebook</button>
                            </div>
                        </section>
                    </div>
                `;
            case 'roster':
                const members = team.members || [];
                const admins = members.filter(m => ['admin', 'coach', 'manager'].includes((m.role || '').toLowerCase()));
                const players = members.filter(m => ['player', 'captain', 'vice-captain'].includes((m.role || 'player').toLowerCase()));
                const support = members.filter(m => !['admin', 'coach', 'manager', 'player', 'captain', 'vice-captain'].includes((m.role || '').toLowerCase()));

                const renderMember = (m) => `
                    <div class="member-item" onclick="window.MizanoNav.pushPage('profile-view', { userId: '${m.uid || 'unknown'}' })">
                        <div class="member-avatar">${m.avatar || '👤'}</div>
                        <div class="member-info">
                            <div class="m-name">${m.name || 'Unknown Member'} ${m.role === 'captain' ? '©' : ''}</div>
                            <div class="m-role">${m.role || 'Player'}</div>
                        </div>
                        <div class="member-action">›</div>
                    </div>
                `;

                return `
                    <div class="roster-pane">
                        <div class="roster-actions">
                            <button class="action-btn-outline" onclick="window.MizanoTeamDetail.recruitMembers()">📢 Recruit Players</button>
                            <button class="action-btn-outline" onclick="window.MizanoTeamDetail.manageRoles()">🛡️ Manage Roles</button>
                        </div>

                        ${admins.length > 0 || members.length === 0 ? `
                        <div class="roster-section">
                            <h4>Management 🛡️</h4>
                            <div class="member-list">
                                <div class="member-item">
                                    <div class="member-avatar">👑</div>
                                    <div class="member-info">
                                        <div class="m-name">You (Owner)</div>
                                        <div class="m-role">Admin</div>
                                    </div>
                                </div>
                                ${admins.map(renderMember).join('')}
                            </div>
                        </div>` : ''}

                        <div class="roster-section">
                            <h4>Squad ⚽ (${players.length})</h4>
                            <div class="member-list">
                                ${players.length > 0 ? players.map(renderMember).join('') : '<div class="empty-state">No players yet.</div>'}
                            </div>
                        </div>

                        ${support.length > 0 ? `
                        <div class="roster-section">
                            <h4>Support Staff ⛑️</h4>
                            <div class="member-list">
                                ${support.map(renderMember).join('')}
                            </div>
                        </div>` : ''}
                    </div>
                `;
            case 'matches':
                return `
                    <div class="matches-pane">
                        <div class="placeholder-msg">No scheduled matches found.</div>
                        <button class="seek-match-btn" onclick="alert('Seeking Opponent Logic...')">Seek Opponent</button>
                    </div>
                `;
            default: return '';
        }
    }

    switchTab(tab) {
        this.currentTab = tab;
        const team = window.mizanoData.getById('teams', this.activeTeamId);
        if (team) this.render(team);
    }

    recruitMembers() {
        // In a real app, this would open a post creator pre-filled with recruitment info
        const confirmRecruit = confirm(`Post a recruitment ad (Job/Opportunity) for ${this.activeTeamId}?`);
        if (confirmRecruit) {
            window.MizanoNav.notifyUI('toast', { message: 'Recruitment Ad Posted to Community!', type: 'success' });
            // Logic to update team status to 'Recruiting' would go here
        }
    }

    manageRoles() {
        alert('Role Management: Drag and drop members to assign Admin/Captain roles. (Coming Soon)');
    }

    requestJoin() {
        window.MizanoNav.notifyUI('toast', { message: 'Request sent to Team Admin', type: 'success' });
    }
}

window.MizanoTeamDetail = new TeamDetail('detail-view');
