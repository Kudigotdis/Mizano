/**
 * MIZANO TEAM BUILDER
 * Handles creation of clubs and teams.
 */

class TeamBuilder {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentStep = 1;
        this.formData = {
            members: [],
            admins: []
        };
    }

    render() {
        if (!this.container) return;
        this.container.classList.add('active');

        this.container.innerHTML = `
            <div class="builder-wrapper">
                <div class="builder-header">
                    <button class="close-btn" onclick="window.MizanoTeamBuilder.close()">✕</button>
                    <h2>Create Team • Step ${this.currentStep} of 3</h2>
                    <div class="step-indicator">
                        <div class="step-dot ${this.currentStep >= 1 ? 'active' : ''}"></div>
                        <div class="step-dot ${this.currentStep >= 2 ? 'active' : ''}"></div>
                        <div class="step-dot ${this.currentStep >= 3 ? 'active' : ''}"></div>
                    </div>
                </div>

                <div class="builder-content">
                    ${this.renderStep()}
                </div>

                <div class="builder-actions">
                    ${this.currentStep > 1 ? `<button class="secondary-btn" onclick="window.MizanoTeamBuilder.prev()">Back</button>` : ''}
                    ${this.currentStep < 3 ?
                `<button class="primary-btn" onclick="window.MizanoTeamBuilder.next()">Next Step →</button>` :
                `<button class="submit-btn" onclick="window.MizanoTeamBuilder.finish()">Create Team</button>`
            }
                </div>
            </div>
        `;
    }

    renderStep() {
        switch (this.currentStep) {
            case 1:
                return `
                    <div class="step-pane">
                        <h3>Team Identity</h3>
                        <div class="input-group">
                            <label>Team Name *</label>
                            <input type="text" id="team-name" placeholder="e.g. Block 3 Warriors" value="${this.formData.name || ''}">
                        </div>
                        <div class="input-group">
                            <label>Sport *</label>
                            <select id="team-sport">
                                <option value="Football" ${this.formData.sport === 'Football' ? 'selected' : ''}>Football</option>
                                <option value="Basketball" ${this.formData.sport === 'Basketball' ? 'selected' : ''}>Basketball</option>
                                <option value="Netball" ${this.formData.sport === 'Netball' ? 'selected' : ''}>Netball</option>
                                <option value="Athletics" ${this.formData.sport === 'Athletics' ? 'selected' : ''}>Athletics</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <label>Type</label>
                            <div class="toggle-group">
                                <button class="toggle-btn ${this.formData.type === 'competitive' ? 'active' : ''}" onclick="window.MizanoTeamBuilder.updateData('type', 'competitive')">Competitive</button>
                                <button class="toggle-btn ${this.formData.type === 'recreational' ? 'active' : ''}" onclick="window.MizanoTeamBuilder.updateData('type', 'recreational')">Recreational</button>
                            </div>
                        </div>
                    </div>
                `;
            case 2:
                return `
                    <div class="step-pane">
                        <h3>Location & Details</h3>
                        <div class="input-group">
                            <label>Home Town / Village</label>
                            <input type="text" id="team-town" placeholder="e.g. Gaborone" value="${this.formData.village_town || ''}">
                        </div>
                        <div class="input-group">
                            <label>Home Venue (Optional)</label>
                            <input type="text" id="team-venue" placeholder="e.g. Notwane Courts" value="${this.formData.venue_name || ''}">
                        </div>
                        <div class="input-group">
                            <label>Founded Year</label>
                            <input type="number" id="team-year" value="${this.formData.founded_year || 2026}">
                        </div>
                    </div>
                `;
            case 3:
                return `
                    <div class="step-pane">
                        <h3>Roster & Invitations</h3>
                        <p class="hint">Invite members and assign roles (Admins, Coaches, Players).</p>
                        <div class="invite-box" style="display: flex; flex-direction: column; gap: 10px;">
                            <input type="tel" id="invite-phone" placeholder="WhatsApp Number (+267)">
                            <div style="display: flex; gap: 10px;">
                                <select id="invite-role" style="flex: 1; padding: 10px; border-radius: 8px; border: 1px solid #ddd;">
                                    <option value="Player">Player</option>
                                    <option value="Coach">Coach</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Admin">Admin</option>
                                </select>
                                <button class="invite-btn" onclick="window.MizanoTeamBuilder.sendInvite()" style="flex: 1;">Invite</button>
                            </div>
                        </div>
                        <div class="roster-preview" style="margin-top: 20px;">
                            <h4>Current Roster:</h4>
                            <div class="list-vertical">
                                <div class="list-item" style="background: #f0f4ff; border-radius: 8px; padding: 10px; margin-bottom: 5px;">
                                    <strong>You</strong>
                                    <span class="badge" style="background: #4472c4; color: white; margin-left: auto;">Founder / Admin</span>
                                </div>
                                ${this.formData.members.map(m => `
                                    <div class="list-item" style="border-radius: 8px; padding: 10px; margin-bottom: 5px; border: 1px solid #eee;">
                                        <strong>${m.phone}</strong>
                                        <span class="badge" style="background: #e0e0e0; color: #666; margin-left: auto;">${m.role}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
            default: return '';
        }
    }

    saveStep() {
        if (this.currentStep === 1) {
            this.formData.name = document.getElementById('team-name')?.value;
            this.formData.sport = document.getElementById('team-sport')?.value;
        } else if (this.currentStep === 2) {
            this.formData.village_town = document.getElementById('team-town')?.value;
            this.formData.venue_name = document.getElementById('team-venue')?.value;
            this.formData.founded_year = document.getElementById('team-year')?.value;
        }
    }

    next() {
        this.saveStep();
        if (this.currentStep < 3) {
            this.currentStep++;
            this.render();
        }
    }

    prev() {
        this.saveStep();
        if (this.currentStep > 1) {
            this.currentStep--;
            this.render();
        }
    }

    updateData(key, value) {
        this.formData[key] = value;
        this.render();
    }

    sendInvite() {
        const phone = document.getElementById('invite-phone')?.value;
        const role = document.getElementById('invite-role')?.value || 'Player';
        if (!phone) return;

        const message = `Hi! You've been invited to join my team "${this.formData.name}" on Mizano as a ${role}. Accept here: https://mizano.app/join`;
        const url = `https://wa.me/${phone.replace('+', '')}?text=${encodeURIComponent(message)}`;

        window.open(url, '_blank');
        this.formData.members.push({ phone, role, status: 'invited' });

        // If invited as Admin or Manager, also add to admins list
        if (role === 'Admin' || role === 'Manager') {
            this.formData.admins.push(phone);
        }

        this.render();
    }

    async finish() {
        this.saveStep();
        if (!this.formData.name) {
            alert('Team Name is required');
            return;
        }

        // Check for Progressive Onboarding Level 3 (Institutional Context)
        const user = window.authManager?.getCurrentUser();
        if (!user || (user.onboarding_level || 0) < 3) {
            if (window.MizanoProfile) {
                alert('To create a team, we need to verify your connectivity. Please complete Step 3 of your profile.');
                window.MizanoProfile.renderLevel3(() => {
                    this.finish(); // Retry after successful onboarding
                });
                return;
            }
        }

        console.log('TeamBuilder: Saving team...', this.formData);
        if (window.mizanoData) {
            await window.mizanoData.createTeam(this.formData);
        }

        alert('Team Created Successfully!');
        this.close();
        if (window.MizanoNav) window.MizanoNav.back();
    }

    close() {
        this.container.classList.remove('active');
        this.currentStep = 1;
        this.formData = { members: [], admins: [] };
    }
}

window.MizanoTeamBuilder = new TeamBuilder('builder-view');
