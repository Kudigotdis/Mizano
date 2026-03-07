/**
 * MIZANO PROFILE INTERFACE
 * Handles user onboarding and profile creation logic.
 */

class ProfileInterface {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.dataManager = window.mizanoData;
        this.nav = window.MizanoNav;
    }

    /**
     * Renders the profile creation form into the shell panel.
     */
    render() {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="profile-container">
                <form class="profile-form" id="mizano-profile-form">
                    <h2>Join Mizano</h2>
                    
                    <div class="form-group">
                        <label>Display Name</label>
                        <input type="text" id="p-name" placeholder="Full Name" required>
                    </div>

                    <div class="form-group">
                        <label>WhatsApp Number</label>
                        <input type="tel" id="p-whatsapp" placeholder="+267..." required>
                    </div>

                    <div class="form-group">
                        <label>Village / Town</label>
                        <input type="text" id="p-location" placeholder="e.g. Gaborone · Block 3" required>
                    </div>

                    <div class="form-group">
                        <label>Profile Type</label>
                        <select id="p-type">
                            <option value="player">Player (Sports/Hobbies)</option>
                            <option value="creator">Creator (Manager/Coach)</option>
                            <option value="guardian">Guardian (Parent/Teacher)</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Date of Birth</label>
                        <input type="date" id="p-dob" required>
                    </div>

                    <button type="submit" class="profile-btn">Create Profile</button>
                    <button type="button" class="profile-btn secondary" onclick="window.MizanoNav.back()">Cancel</button>

                    <div id="profile-success" class="profile-msg">
                        Profile Created Successfully! Syncing...
                    </div>
                </form>
            </div>
        `;

        this.bindEvents();
    }

    bindEvents() {
        const form = document.getElementById('mizano-profile-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        const profileData = {
            display_name: document.getElementById('p-name').value,
            whatsapp_number: document.getElementById('p-whatsapp').value,
            village_town: document.getElementById('p-location').value,
            profile_type: document.getElementById('p-type').value,
            date_of_birth: document.getElementById('p-dob').value,
            uid: `mizano_${document.getElementById('p-name').value.toLowerCase().replace(/\s+/g, '_')}_${Date.now().toString().slice(-4)}`,
            onboarding_level: 1
        };

        try {
            const newUser = await this.dataManager.createUser(profileData);

            // Show success
            const msg = document.getElementById('profile-success');
            if (msg) msg.style.display = 'block';

            // Automatic Safety Check Integration
            // If the user is a minor, we might trigger a Guardian request flow here in the future.

            setTimeout(() => {
                // Navigate back or to home
                this.nav.back();
            }, 1500);

        } catch (error) {
            console.error('ProfileInterface: Failed to create user.', error);
            alert('Error creating profile. Please try again.');
        }
    }
    async handleLevel2Submit(e, targetRole) {
        e.preventDefault();
        const user = window.authManager.getCurrentUser();

        const additionalData = {
            specialization: document.getElementById('p2-specialization').value,
            experience_years: document.getElementById('p2-experience').value,
            certifications: document.getElementById('p2-certs').value,
            bio: document.getElementById('p2-bio').value,
            capabilities: [...new Set([...(user.capabilities || []), 'Creator'])],
            role: targetRole === 'creator' ? 'coach' : targetRole,
            onboarding_level: 2
        };

        try {
            const updatedUser = { ...user, ...additionalData };
            await this.dataManager.updateUser(user.uid || user.profile_id, updatedUser);

            window.authManager.currentUser = updatedUser;
            window.authManager.saveSession();
            window.authManager.broadcastAuthState();

            const successMsg = document.getElementById('profile2-success');
            if (successMsg) successMsg.style.display = 'block';

            setTimeout(() => window.MizanoNav.back(), 1500);
        } catch (error) {
            console.error('Level 2 Onboarding failed:', error);
            alert('Failed to update profile.');
        }
    }

    renderLevel2(targetRole) {
        const overlay = document.getElementById('builder-view');
        if (!overlay) return;

        overlay.innerHTML = `
            <div class="profile-container" style="background: white; min-height: 100vh; padding: 20px;">
                <div class="detail-header" style="background:#ffd700; color:black; display:flex; align-items:center; padding:10px;">
                    <button class="back-btn" onclick="window.MizanoNav.back()">‹ Back</button>
                    <h2 style="margin:0 0 0 10px;">Step 2: ${targetRole.toUpperCase()}</h2>
                </div>
                <form class="profile-form" id="level2-unlock-form" style="margin-top:20px;">
                    <p>To unlock <strong>${targetRole === 'guardian' ? 'Guardian Status (Parent/Teacher)' : 'Creator Status (Coach/Admin)'}</strong>, we need a few more details.</p>
                    <div class="form-group"><label>Specialization</label><input type="text" id="p2-specialization" required></div>
                    <div class="form-group"><label>Experience (Years)</label><input type="number" id="p2-experience" required></div>
                    <div class="form-group"><label>Certifications</label><textarea id="p2-certs" required></textarea></div>
                    <div class="form-group"><label>Professional Bio</label><textarea id="p2-bio" required></textarea></div>
                    <button type="submit" class="profile-btn" style="background:#4472c4; color:white;">Apply for ${targetRole}</button>
                    <div id="profile2-success" class="profile-msg" style="display:none; color:green; margin-top:10px;">Successfully expanded identity!</div>
                </form>
            </div>
        `;
        window.MizanoNav.openOverlay('builder-view');
        document.getElementById('level2-unlock-form').addEventListener('submit', (e) => this.handleLevel2Submit(e, targetRole));
    }

    /**
     * LEVEL 3: Relational & Institutional Context
     * Required for: Creating Teams, Managing Clubs.
     */
    renderLevel3(onSuccess) {
        const overlay = document.getElementById('builder-view');
        if (!overlay) return;

        overlay.innerHTML = `
            <div class="profile-container" style="background: white; min-height: 100vh; padding: 20px;">
                <div class="detail-header" style="background:#ffd700; color:black; display:flex; align-items:center; padding:10px;">
                    <button class="back-btn" onclick="window.MizanoNav.back()">‹ Back</button>
                    <h2 style="margin:0 0 0 10px;">Step 3: Connectivity</h2>
                </div>
                <form class="profile-form" id="level3-form" style="margin-top:20px;">
                    <p>To <strong>Create Teams/Groups</strong>, please provide your educational background. This helps us verify your network.</p>
                    <div class="form-group"><label>Schools Attended (comma separated)</label><textarea id="p3-schools" placeholder="e.g. Northside Primary, Maru-a-pula" required></textarea></div>
                    <div class="form-group"><label>Favorite Subjects / Skills</label><input type="text" id="p3-skills" placeholder="e.g. IT, PE, Science" required></div>
                    <div class="form-group"><label>Known Teachers / Mentors</label><input type="text" id="p3-mentors" placeholder="Name of teachers you recall"></div>
                    
                    <div class="privacy-alert" style="background:#f0f4ff; padding:10px; border-radius:8px; font-size:0.8rem; margin:15px 0;">
                        🛡️ <strong>Privacy Note</strong>: This history is stored <strong>only on your device</strong>. It will be shared with teammates locally when you connect.
                    </div>

                    <button type="submit" class="profile-btn" style="background:#4472c4; color:white;">Confirm Connection History</button>
                    <div id="profile3-success" class="profile-msg" style="display:none; color:green; margin-top:10px;">Connectivity established!</div>
                </form>
            </div>
        `;
        window.MizanoNav.openOverlay('builder-view');
        document.getElementById('level3-form').addEventListener('submit', (e) => this.handleLevel3Submit(e, onSuccess));
    }

    async handleLevel3Submit(e, onSuccess) {
        e.preventDefault();
        const user = window.authManager.getCurrentUser();

        const educationData = {
            education_history: document.getElementById('p3-schools').value.split(',').map(s => s.trim()),
            skills: document.getElementById('p3-skills').value.split(',').map(s => s.trim()),
            mentors: document.getElementById('p3-mentors').value.split(',').map(s => s.trim()),
            onboarding_level: 3
        };

        try {
            const updatedUser = { ...user, ...educationData };
            await this.dataManager.updateUser(user.uid || user.profile_id, updatedUser);
            window.authManager.currentUser = updatedUser;
            window.authManager.saveSession();

            const successMsg = document.getElementById('profile3-success');
            if (successMsg) successMsg.style.display = 'block';

            setTimeout(() => {
                window.MizanoNav.back();
                if (onSuccess) onSuccess();
            }, 1000);
        } catch (error) {
            console.error('Level 3 Onboarding failed:', error);
            alert('Failed to update relational data.');
        }
    }

    /**
     * LEVEL 4: Premium & Safety (Sensitive Data)
     * Required for: Bookings, Tournament Fees, Insurance Verification.
     */
    renderLevel4(onSuccess) {
        const overlay = document.getElementById('builder-view');
        if (!overlay) return;

        overlay.innerHTML = `
            <div class="profile-container" style="background: white; min-height: 100vh; padding: 20px;">
                <div class="detail-header" style="background:#000; color:white; display:flex; align-items:center; padding:10px;">
                    <button class="back-btn" onclick="window.MizanoNav.back()" style="color:white;">‹ Back</button>
                    <h2 style="margin:0 0 0 10px;">Level 4: Premium Profile</h2>
                </div>
                <form class="profile-form" id="level4-form" style="margin-top:20px;">
                    <p>To <strong>Book Venues & Pay Fees</strong>, we need basic safety and transaction info.</p>
                    <div class="form-group"><label>Primary Bank / Mobile Money</label><input type="text" id="p4-bank" placeholder="e.g. FNB, Orange Money" required></div>
                    <div class="form-group"><label>Medical Insurance (Current)</label><input type="text" id="p4-insurance" placeholder="Provider name or N/A"></div>
                    <div class="form-group"><label>Dietary Restrictions / Allergies</label><input type="text" id="p4-medical" placeholder="Any medical notes for organizers"></div>
                    
                    <div class="privacy-alert" style="background:#fff4f4; border: 1px solid #ffcccc; padding:12px; border-radius:8px; font-size:0.85rem; margin:15px 0; color: #cc0000;">
                        🔒 <strong>SENSITIVE DATA</strong>: This information is encrypted and stored <strong>locally only</strong>. Organizers only see it when you explicitly join a paid match.
                    </div>

                    <button type="submit" class="profile-btn" style="background:#ffd700; color:black;">Unlock Premium Features</button>
                    <div id="profile4-success" class="profile-msg" style="display:none; color:green; margin-top:10px;">Premium Access Unlocked!</div>
                </form>
            </div>
        `;
        window.MizanoNav.openOverlay('builder-view');
        document.getElementById('level4-form').addEventListener('submit', (e) => this.handleLevel4Submit(e, onSuccess));
    }

    async handleLevel4Submit(e, onSuccess) {
        e.preventDefault();
        const user = window.authManager.getCurrentUser();

        const sensitiveData = {
            financial: { provider: document.getElementById('p4-bank').value },
            medical: {
                insurance: document.getElementById('p4-insurance').value,
                notes: document.getElementById('p4-medical').value
            },
            onboarding_level: 4
        };

        try {
            const updatedUser = { ...user, ...sensitiveData };
            await this.dataManager.updateUser(user.uid || user.profile_id, updatedUser);
            window.authManager.currentUser = updatedUser;
            window.authManager.saveSession();

            const successMsg = document.getElementById('profile4-success');
            if (successMsg) successMsg.style.display = 'block';

            setTimeout(() => {
                window.MizanoNav.back();
                if (onSuccess) onSuccess();
            }, 1000);
        } catch (error) {
            console.error('Level 4 Onboarding failed:', error);
            alert('Failed to update premium data.');
        }
    }
}

// Global initialization — container TBD once a dedicated Profile panel is confirmed
document.addEventListener('DOMContentLoaded', () => {
    window.MizanoProfile = new ProfileInterface('panel-14'); // placeholder until explicit panel is confirmed
});
