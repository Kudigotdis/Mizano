/**
 * MIZANO PROFILE DETAIL RENDERER
 * Renders Deep User Profiles with 300+ data points, family trees, and history.
 */

class ProfileDetail {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.dataManager = window.mizanoData;
    }

    render(userIdOrName) {
        if (!this.container) return;

        // Find user by ID or Name (Fuzzy search for generated profiles)
        let user = this.dataManager.cache.users.find(u =>
            (u.profile_id && u.profile_id === userIdOrName) ||
            (u.uid && u.uid === userIdOrName) ||
            `${u.first_name || ''} ${u.surname || ''}`.trim() === userIdOrName ||
            u.display_name === userIdOrName ||
            u.name === userIdOrName
        );

        if (!user) {
            this.container.innerHTML = '<div class="p-4">Profile not found.</div>';
            return;
        }

        const isGuardian = user.capabilities?.includes('Guardian');
        const connectionsCount = user.connections?.length || 0;

        this.container.innerHTML = `
            <div class="detail-wrapper">
                <style>
                    .profile-header-deep { background: #4472c4; color: white; padding: 20px; text-align: center; position: relative; }
                    .profile-avatar-large { width: 80px; height: 80px; background: #fff; color: #4472c4; border-radius: 50%; font-size: 2.5rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; border: 3px solid rgba(255,255,255,0.3); }
                    .conn-meter { background: rgba(0,0,0,0.1); border-radius: 10px; height: 8px; margin: 5px 0; overflow: hidden; }
                    .conn-progress { background: #ffd700; height: 100%; transition: width 0.3s; }
                    .level-badge { position: absolute; right: 15px; top: 15px; background: #000; color: #ffd700; padding: 4px 10px; border-radius: 12px; font-size: 0.7rem; font-weight: bold; border: 1px solid #ffd700; }
                    
                    .timeline { border-left: 2px solid #4472c4; margin: 10px 0 10px 20px; padding-left: 15px; }
                    .timeline-item { position: relative; margin-bottom: 15px; }
                    .timeline-item::before { content: ""; position: absolute; left: -21px; top: 5px; width: 10px; height: 10px; background: #4472c4; border-radius: 50%; }
                    
                    .skill-badge { display: inline-block; padding: 4px 10px; background: #e8f0fe; color: #4472c4; border-radius: 15px; font-size: 0.8rem; margin: 3px; border: 1px solid #c2d7fa; }
                    .proficiency { font-size: 0.7rem; color: #666; display: block; }
                    
                    .family-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 10px 0; }
                    .family-member { text-align: center; cursor: pointer; }
                    .family-avatar { width: 40px; height: 40px; background: #eee; border-radius: 50%; margin: 0 auto 5px; display: flex; align-items: center; justify-content: center; }
                </style>
                
                <div class="profile-header-deep">
                    <button class="back-btn" onclick="window.MizanoNav.back()" style="position:absolute; left:15px; top:15px; color:white;">‹ Back</button>
                    <div class="level-badge">RDP LVL ${user.onboarding_level || 1}</div>
                    
                    <div style="position: relative; width: 80px; height: 80px; margin: 0 auto 10px;">
                        <div class="profile-avatar-large" id="profile-avatar-display" onclick="document.getElementById('profile-photo-input').click()" style="cursor:pointer; overflow:hidden;">
                            ${window.MizanoImages.render('avatars', user.profile_picture || null)}
                        </div>
                        <div style="position: absolute; bottom: 0; right: 0; background: #fff; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; border: 1px solid #4472c4; cursor: pointer;" onclick="document.getElementById('profile-photo-input').click()">
                            📷
                        </div>
                        <input type="file" id="profile-photo-input" style="display:none;" accept="image/*" onchange="window.MizanoProfileDetail.handlePhotoUpload(event, '${user.uid || user.profile_id}')">
                    </div>

                    <h2>${user.first_name || ''} ${user.surname || user.name || 'Anonymous'}</h2>
                    <p>${user.profile_type} • ${user.gender} • ${user.age || 'Age N/A'}</p>
                    
                    <div style="max-width:240px; margin: 15px auto 0; display: flex; flex-direction: column; gap: 8px;">
                        <div style="display:flex; justify-content:space-between; font-size:0.7rem;">
                            <span>Network Depth</span>
                            <span>${connectionsCount}/20</span>
                        </div>
                        <div class="conn-meter">
                            <div class="conn-progress" style="width: ${Math.min(100, (connectionsCount / 20) * 100)}%"></div>
                        </div>

                        <div style="display:flex; justify-content:space-between; font-size:0.7rem; margin-top:5px;">
                            <span>Data Completion</span>
                            <span>${(user.onboarding_level || 1) * 20}%</span>
                        </div>
                        <div class="conn-meter" style="background: rgba(255,255,255,0.2);">
                            <div class="conn-progress" style="width: ${(user.onboarding_level || 1) * 20}%; background: #27ae60;"></div>
                        </div>
                    </div>
                </div>

                <div class="detail-content" style="background:#f9f9f9;">
                    
                    <!-- Guardian Dashboard (Only if profile is a guardian) -->
                    ${isGuardian ? this.renderGuardianDashboard(user) : ''}

                    <!-- Section: Identity Details -->
                    ${this.renderCollapsible('Identity & Personal Info', `
                        <div class="list-vertical" style="font-size:0.9rem;">
                            <div class="fixture-item"><span>Nationality</span><strong>${user.nationality || 'Motswana'}</strong></div>
                            <div class="fixture-item"><span>Ethnicity</span><strong>${user.ethnicity || 'Tswana'}</strong></div>
                            <div class="fixture-item"><span>Mobile Network</span><strong>${user.mobile_network || 'Orange'}</strong></div>
                            <div class="fixture-item"><span>Bank</span><strong>${user.bank || 'FNBB'}</strong></div>
                            <div class="fixture-item"><span>Medical Insurance</span><strong>${user.medical_insurance ? '✅ Covered' : '❌ Not Covered'}</strong></div>
                            <div class="fixture-item"><span>Dietary</span><strong>${user.dietary_preference || 'Standard'}</strong></div>
                        </div>
                    `)}

                    <!-- Section: Family Tree -->
                    ${this.renderFamilyTree(user)}

                    <!-- Section: Education History -->
                    ${this.renderEducationTimeline(user)}

                    <!-- Section: Classes & Skills -->
                    ${this.renderClasses(user)}

                    <!-- Section: Interests & Goals -->
                    ${this.renderInterests(user)}
                </div>
            </div>
        `;
    }

    handlePhotoUpload(event, userId) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            const base64 = e.target.result;

            // Update UI Preview
            const display = document.getElementById('profile-avatar-display');
            if (display) {
                display.innerHTML = `<img src="${base64}" style="width:100%; height:100%; object-fit:cover;">`;
            }

            // Save to DataManager
            if (window.mizanoData) {
                await window.mizanoData.updateProfilePhoto(userId, base64);
                window.MizanoShell?.showToast?.("Profile photo updated!");
            }
        };
        reader.readAsDataURL(file);
    }

    renderCollapsible(title, content) {
        return `
            <details class="detail-section collapsible" style="background:white; margin:10px; border-radius:8px; border:1px solid #eee; padding:0 10px;">
                <summary style="display:flex; justify-content:space-between; align-items:center; padding:15px 0; cursor:pointer; list-style:none;">
                    <h3 style="margin:0; font-size:1.0rem;">${title}</h3>
                    <span class="arrow">▼</span>
                </summary>
                <div class="content" style="padding-bottom:15px;">
                    ${content}
                </div>
            </details>
        `;
    }

    renderFamilyTree(user) {
        if (!user.connections) return '';
        const family = user.connections.filter(c => ['Parent', 'Sibling', 'Child', 'Spouse', 'Cousin'].includes(c.type));
        if (family.length === 0) return '';

        return this.renderCollapsible('Family Tree & Connections', `
            <div class="family-grid">
                ${family.map(member => `
                    <div class="family-member" onclick="window.MizanoProfileDetail.render('${member.id}')">
                        <div class="family-avatar" style="overflow:hidden;">
                            ${window.MizanoImages.render('avatars', member.profile_picture || null)}
                        </div>
                        <strong style="font-size:0.8rem; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${member.name}</strong>
                        <small style="color:#666; font-size:0.7rem;">${member.type}</small>
                    </div>
                `).join('')}
            </div>
        `);
    }

    renderEducationTimeline(user) {
        const history = user.education_history || [];
        if (history.length === 0) return '';

        return this.renderCollapsible('Education History', `
            <div class="timeline">
                ${history.map(edu => `
                    <div class="timeline-item">
                        <strong>${edu.school_name}</strong>
                        <div style="font-size:0.8rem; color:#666;">Graduated ${edu.grad_year} • ${edu.qualification || 'Standard'}</div>
                    </div>
                `).join('')}
            </div>
        `);
    }

    renderClasses(user) {
        const classes = user.class_history || [];
        if (classes.length === 0) return '';

        return this.renderCollapsible('Classes & Academic Progress', `
            <div style="padding:5px;">
                ${classes.map(c => `
                    <div class="skill-badge">
                        ${c.subject}
                        <span class="proficiency">${c.proficiency} (Teacher: ${c.teacher_name})</span>
                    </div>
                `).join('')}
                <p style="font-size: 0.7rem; color: #888; margin-top: 10px;">* Proficiency labels derived from continuous assessment data.</p>
            </div>
        `);
    }

    renderInterests(user) {
        const interests = user.interests || [];
        if (interests.length === 0) return '';

        return this.renderCollapsible('Interests & Lifestyle', `
            <div style="display:flex; flex-wrap:wrap;">
                ${interests.map(i => `<span class="skill-badge">${i}</span>`).join('')}
            </div>
        `);
    }

    renderGuardianDashboard(user) {
        const connections = user.connections || [];
        const minors = connections.filter(c => c.type === 'Child' || c.type === 'Ward');

        if (minors.length === 0) return '';

        return `
            <div class="detail-section" style="background:#eef4ff; margin:10px; border-radius:8px; border:2px solid #4472c4; padding:15px;">
                <h3 style="margin-top:0; color:#4472c4;">🛡️ Guardian Dashboard</h3>
                <p style="font-size:0.8rem;">You have management access to ${minors.length} minor profiles.</p>
                <div class="list-vertical">
                    ${minors.map(m => `
                        <div class="list-item" onclick="window.MizanoProfileDetail.render('${m.id}')" style="background:white; border-radius:8px; padding:10px; margin-bottom:5px;">
                            <div class="info">
                                <strong>${m.name}</strong>
                                <small>Academic Focus: IT & PE</small>
                            </div>
                            <button class="action-btn-sm" style="background:#ffd700; color:black; border:none; margin-left:auto;">View Reports</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

// Expose global instances
window.MizanoProfileDetail = new ProfileDetail('detail-view');
window.MizanoProfileDetailPanel = new ProfileDetail('drop-field-profile-panel');
