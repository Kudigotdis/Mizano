/**
 * MIZANO INSTITUTION DETAIL RENDERER
 * Handles display of Schools, Clinics, and Registered Businesses.
 */

class InstitutionDetail {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.dataManager = window.mizanoData;
    }

    render(id, type = 'school') {
        if (!this.container) return;

        let entity = null;
        if (type === 'school') {
            entity = (this.dataManager.cache.schools || []).find(s => s.id === id || s.school_id === id);
        } else {
            entity = this.dataManager.getById('businesses', id);
        }

        if (!entity) {
            this.container.innerHTML = '<div class="p-4">Institution not found.</div>';
            return;
        }

        const isVerified = entity.verified || entity.is_private;
        const teams = entity.teams || [];

        this.container.innerHTML = `
            <div class="detail-wrapper">
                <div class="detail-header" style="background:${type === 'school' ? '#ffd700' : '#4472c4'}; color:black; display:flex; align-items:center; justify-content:space-between; padding:15px;">
                    <button class="back-btn" onclick="window.MizanoNav.back()">‹ Back</button>
                    <h2 class="detail-title" style="margin:0;">${type === 'school' ? 'School / Institution' : 'Local Business'}</h2>
                    ${this.isAuthorized(entity) ? `<button class="action-btn-sm" onclick="window.MizanoInstitutionDetail.openEditor('${id}', '${type}')" style="background:black;">Edit</button>` : '<span></span>'}
                </div>
                
                <div class="detail-content">
                    <style>
                        .scrolling-row { display: flex; gap: 10px; overflow-x: auto; padding: 10px 0; }
                        .mini-card { min-width: 100px; padding: 10px; background: #f5f5f5; border-radius: 8px; text-align: center; border: 1px solid #ddd; }
                        .avatar-circle { width: 40px; height: 40px; background: #eee; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 5px; }
                        .empty-state-card { padding: 15px; background: #fafafa; border: 1px dashed #ccc; text-align: center; color: #666; border-radius: 8px; }
                        
                        details.collapsible { margin-bottom: 10px; background: #fff; border-bottom: 1px solid #eee; }
                        details.collapsible summary { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; cursor: pointer; list-style: none; }
                        details.collapsible h3 { margin: 0; font-size: 1.1rem; color: #333; }
                        details.collapsible .arrow { transition: transform 0.2s; }
                        details.collapsible[open] .arrow { transform: rotate(180deg); }
                        details.collapsible .content { padding-bottom: 10px; }
                        .action-btn-sm { padding: 4px 8px; font-size: 0.8rem; background: #4472c4; color: white; border: none; border-radius: 4px; }
                        
                        .network-tiers .tier-label { font-size: 0.8rem; text-transform: uppercase; color: #666; margin: 10px 0 5px; }
                        .fixture-item { display: flex; justify-content: space-between; padding: 8px; border-bottom: 1px solid #f0f0f0; font-size: 0.9rem; }
                        .fixture-score { font-weight: bold; color: #4472c4; }
                        
                        .edit-form-overlay { padding: 20px; background: white; min-height: 100vh; }
                        .form-field { margin-bottom: 15px; }
                        .form-field label { display: block; margin-bottom: 5px; font-weight: bold; }
                        .form-field input, .form-field textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-family: inherit; }
                    </style>
                    <div class="detail-media-placeholder" style="background:#ddd; height:150px; display:flex; align-items:center; justify-content:center;">
                        <span style="font-size:3rem;">${type === 'school' ? '🏫' : '🏢'}</span>
                    </div>

                    <div class="detail-main">
                        <h1 class="activity-h1">${entity.name || entity.business_name} ${isVerified ? '✅' : ''}</h1>
                        <p class="activity-meta">📍 ${entity.location?.city || entity.city || 'Gaborone'} • ${entity.category || entity.type}</p>
                        
                        ${this.renderStats(entity)}

                        <div class="detail-description">
                            <h3>About</h3>
                            <p>${entity.description || 'Verified local institution registered on the Mizano platform.'}</p>
                        </div>

                        ${this.renderStaff(entity)}
                        
                        ${this.renderCollapsibleSection('Corporate Teams & Clubs', this.renderCorporateTeams(entity))}
                        ${this.renderCollapsibleSection('Events & Sponsorships', this.renderEventsAndSponsors(entity))}
                        ${this.renderCollapsibleSection('Engagement History', this.renderHistory(entity))}

                        ${type === 'school' ? this.renderSchoolNetwork(entity) : ''}
                        ${this.renderFixtureHistory(entity)}

                        ${this.renderMatches(entity)}
                        ${teams.length > 0 ? this.renderTeamsList(teams) : ''}

                        ${this.renderBillingSheet(entity)}
                    </div>
                </div>
            </div>
        `;
    }

    renderCollapsibleSection(title, content) {
        if (!content) return '';
        return `
            <details class="detail-section collapsible">
                <summary>
                    <h3>${title}</h3>
                    <span class="arrow">▼</span>
                </summary>
                <div class="content">${content}</div>
            </details>
        `;
    }

    renderCorporateTeams(entity) {
        const teams = entity.corporate_teams || [];
        if (teams.length === 0) return null;
        return `
            <div class="list-vertical">
                ${teams.map(t => `
                    <div class="list-item">
                        <span class="icon">👔</span>
                        <div class="info"><strong>${t.name}</strong><small>${t.sport}</small></div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderEventsAndSponsors(entity) {
        const events = entity.sponsored_events || [];
        if (events.length === 0) return null;
        return `
            <div class="list-vertical">
                ${events.map(e => `
                    <div class="list-item">
                        <span class="icon">📅</span>
                        <div class="info"><strong>${e.name}</strong><small>${e.role} • ${e.date}</small></div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderStats(entity) {
        if (!entity.stats) return '';
        return `
            <div class="detail-stats">
                <div class="stat-card"><span class="stat-label">Students</span><span class="stat-value">${entity.stats.students || '-'}</span></div>
                <div class="stat-card"><span class="stat-label">Teachers</span><span class="stat-value">${entity.stats.teachers || '-'}</span></div>
            </div>
        `;
    }

    renderStaff(entity) {
        const staff = entity.staff || [];
        if (staff.length === 0) return '';
        return `
            <div class="detail-section">
                <h3>Staff & Management</h3>
                <div class="scrolling-row">
                    ${staff.map(s => `
                        <div class="mini-card">
                            <div class="avatar-circle">🎓</div>
                            <strong>${s.name}</strong><small>${s.role}</small>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderSchoolNetwork(entity) {
        const schools = this.dataManager.cache.schools || [];
        const neighborhood = schools.filter(s => s.id !== entity.id && s.city === entity.city).slice(0, 2);
        const cityWide = schools.filter(s => s.id !== entity.id && s.city === entity.city).slice(0, 5);
        const regional = schools.filter(s => s.id !== entity.id && s.region === entity.region).slice(0, 10);
        const national = schools.filter(s => s.id !== entity.id && s.region !== entity.region).slice(0, 15);

        return this.renderCollapsibleSection('School Network & Connectivity', `
            <div class="network-tiers">
                <div class="tier-label">Neighborhood (2 Schools)</div>
                <div class="scrolling-row">${neighborhood.map(s => this.renderMiniInstitution(s)).join('')}</div>
                <div class="tier-label">Village / City-Wide (5 Schools)</div>
                <div class="scrolling-row">${cityWide.map(s => this.renderMiniInstitution(s)).join('')}</div>
                <div class="tier-label">Regional (10 Schools)</div>
                <div class="scrolling-row">${regional.map(s => this.renderMiniInstitution(s)).join('')}</div>
                <div class="tier-label">National (15+ Schools)</div>
                <div class="scrolling-row">${national.map(s => this.renderMiniInstitution(s)).join('')}</div>
            </div>
        `);
    }

    renderMiniInstitution(s) {
        return `
            <div class="mini-card" onclick="window.MizanoInstitutionDetail.render('${s.id}', 'school')">
                <div class="avatar-circle">🏫</div>
                <strong style="font-size:0.7rem;">${s.name}</strong><small>${s.city}</small>
            </div>
        `;
    }

    renderFixtureHistory(entity) {
        const fixtures = entity.fixtures || [];
        if (fixtures.length === 0) return '';
        return this.renderCollapsibleSection('12-Month Fixture History', `
            <div class="fixture-list">
                ${fixtures.map(f => `
                    <div class="fixture-item">
                        <div class="fixture-info">
                            <div><strong>${f.opponent}</strong> <small>(${f.tier})</small></div>
                            <small>${f.date} • ${f.venue}</small>
                        </div>
                        <div class="fixture-score">${f.result}</div>
                    </div>
                `).join('')}
            </div>
        `);
    }

    renderMatches(entity) {
        const matches = entity.upcoming_matches || [];
        if (matches.length === 0) return '';
        return `
            <div class="detail-section">
                <h3>Upcoming Matches</h3>
                <div class="list-vertical">
                    ${matches.map(m => `
                        <div class="list-item">
                            <span class="icon">⚽</span>
                            <div class="info"><strong>${m.home} vs ${m.away}</strong><small>${m.date} @ ${m.venue}</small></div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderTeamsList(teams) {
        return `
            <div class="detail-section">
                <h3>Active Teams (${teams.length})</h3>
                <div class="list-vertical">
                    ${teams.map(t => `
                        <div class="list-item" onclick="window.MizanoNav.pushPage('team-detail', { teamId: '${t.id}' })">
                            <span class="icon">🏆</span>
                            <div class="info"><strong>${t.name}</strong><small>${t.sport}</small></div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    isAuthorized(entity) {
        const user = window.authManager?.getCurrentUser();
        if (!user) return false;

        // Business Ownership Check
        if (entity && entity.owner_id && (entity.owner_id === user.uid || entity.owner_id === user.profile_id)) {
            return true;
        }

        // Require Level 5 (Legacy/Governance) for institutional edits
        return (user.onboarding_level || 0) >= 5 || user.role === 'admin';
    }

    renderHistory(entity) {
        const history = entity.history || [];
        if (history.length === 0) return null;
        return `
            <div class="list-vertical" style="padding:10px;">
                ${history.map(h => `
                    <div class="list-item" style="border-bottom:1px solid #eee; padding:10px 0;">
                        <span class="icon">📜</span>
                        <div class="info"><strong>${h}</strong></div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderBillingSheet(entity) {
        const user = window.authManager?.getCurrentUser();
        if (!entity.billing || (entity.owner_id !== user?.uid && entity.owner_id !== user?.profile_id)) return '';

        return `
            <div class="detail-section billing-summary" style="background:#fff4cc; padding:15px; border-radius:8px; margin-top:20px; border:1px solid #e67e22; color:black;">
                <h4 style="margin:0 0 10px 0;">💳 Monthly Billing Sheet</h4>
                <div style="display:flex; justify-content:space-between; font-size:0.9rem; margin-bottom:5px;">
                    <span>Monthly Base Fee:</span><strong>P${entity.billing.base_fee.toFixed(2)}</strong>
                </div>
                ${entity.billing.extra_main > 0 ? `
                <div style="display:flex; justify-content:space-between; font-size:0.9rem; margin-bottom:5px;">
                    <span>Extra Main Categories (${entity.billing.extra_main}):</span><strong>P${(entity.billing.extra_main * 100).toFixed(2)}</strong>
                </div>` : ''}
                ${entity.billing.extra_subs > 0 ? `
                <div style="display:flex; justify-content:space-between; font-size:0.9rem; margin-bottom:5px;">
                    <span>Extra Sub-Categories (${entity.billing.extra_subs}):</span><strong>P${(entity.billing.extra_subs * 100).toFixed(2)}</strong>
                </div>` : ''}
                <div style="display:flex; justify-content:space-between; font-size:1.1rem; margin-top:10px; padding-top:10px; border-top:1px solid #d4ac0d;">
                    <strong>Total Monthly:</strong><strong>P${entity.billing.total_monthly.toFixed(2)}</strong>
                </div>
                <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-top:10px; color:#666;">
                    <span>Next Billing Cycle:</span><span>${new Date(entity.billing.next_billing_date).toLocaleDateString()}</span>
                </div>
                <div style="margin-top:15px; font-size:0.85rem; color:#d35400; font-weight:bold;">
                    ${entity.active ? 'Status: Active ✅' : 'Status: Pending Payment / Approval ⏳'}
                </div>
            </div>
        `;
    }

    openEditor(id, type) {
        let entity = null;
        if (type === 'school') {
            entity = (this.dataManager.cache.schools || []).find(s => s.id === id || s.school_id === id);
        } else {
            entity = (this.dataManager.cache.businesses || []).find(b => b.id === id);
        }

        const overlay = document.getElementById('builder-view');
        if (!overlay) return;

        overlay.innerHTML = `
            <div class="edit-form-overlay">
                <div class="overlay-header" style="background:#000; color:white; padding:15px; display:flex; align-items:center;">
                    <button class="back-btn" onclick="window.MizanoNav.back()" style="color:white;">‹ Close</button>
                    <h2 style="margin:0 0 0 10px;">Edit ${type === 'school' ? 'School' : 'Business'}</h2>
                </div>
                <form id="institution-edit-form" style="margin-top:20px;">
                    <div class="form-field">
                        <label>Name</label>
                        <input type="text" id="edit-name" value="${entity.name || entity.business_name || ''}" required>
                    </div>
                    <div class="form-field">
                        <label>Description</label>
                        <textarea id="edit-description" rows="4">${entity.description || ''}</textarea>
                    </div>
                    <div class="form-field">
                        <label>City / Town</label>
                        <input type="text" id="edit-city" value="${entity.city || entity.location?.city || ''}">
                    </div>
                    <div class="form-field">
                        <label>Contact Email</label>
                        <input type="email" id="edit-email" value="${entity.contact?.email || ''}">
                    </div>
                    <button type="submit" class="primary-btn" style="width:100%; padding:15px; margin-top:10px; background:#ffd700; color:black; border:none; border-radius:8px; font-weight:bold;">Save Changes</button>
                </form>
            </div>
        `;

        window.MizanoNav.openOverlay('builder-view');

        document.getElementById('institution-edit-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveUpdate(id, type);
        });
    }

    async saveUpdate(id, type) {
        const updatedData = {
            name: document.getElementById('edit-name').value,
            description: document.getElementById('edit-description').value,
            city: document.getElementById('edit-city').value,
            contact: { email: document.getElementById('edit-email').value }
        };

        try {
            if (type === 'school') {
                const index = this.dataManager.cache.schools.findIndex(s => s.id === id || s.school_id === id);
                if (index !== -1) {
                    this.dataManager.cache.schools[index] = { ...this.dataManager.cache.schools[index], ...updatedData };
                    if (window.mizanoStorage) await window.mizanoStorage.saveSchools([this.dataManager.cache.schools[index]]);
                }
            } else {
                const index = this.dataManager.cache.businesses.findIndex(b => b.id === id);
                if (index !== -1) {
                    this.dataManager.cache.businesses[index] = { ...this.dataManager.cache.businesses[index], ...updatedData };
                    if (window.mizanoStorage) window.mizanoStorage.cacheDatabase('businesses', this.dataManager.cache.businesses);
                }
            }

            alert('Update successful!');
            window.MizanoNav.back();
            this.render(id, type);
        } catch (error) {
            console.error('Update failed:', error);
            alert('Error saving changes.');
        }
    }
}

window.MizanoInstitutionDetail = new InstitutionDetail('detail-view');
