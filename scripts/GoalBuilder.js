/**
 * MIZANO GOAL BUILDER
 * Vanilla JS implementation of the Goals & Pursuits Builder.
 * Based on logic from 'mizano_goal_builder.html'.
 */

class GoalBuilder {
    constructor(containerId = 'drop-field-tracker') {
        this.containerId = containerId;
        this.storage = window.MizanoTrackerStorage;
        this.activities = [];
        this.state = {
            title: '',
            activityId: '',
            activityName: '',
            type: 'solo', // solo, duo, group
            steps: [],
            people: { partnerId: null, groupName: '', members: [] },
            schedule: { reminders: 'none', sound: 'default' },
            venue: { venueId: null, placeholder: false },
            visibility: { privacy: 'public', showOnCV: false }
        };

        // Load Dictionary
        this.loadActivities();
    }

    async loadTemplate(templateId) {
        // Fetch template from storage
        try {
            const template = await this.storage.getGoalById(templateId);
            // Note: getGoalById might search user goals. We need getTemplateById? 
            // Or assume storage.getGoals() returns array, we filter.
            // For now, let's assume we fetch all and find logic, or storage supports it.
            // But let's simplify: Just render the builder with the template ID as a param or fetch it here.

            // Actually, let's just render the builder first, then populate.
            this.render();

            // Find template
            const templates = await this.storage.getGoals();
            const tmpl = templates.find(t => t.id === templateId);

            if (tmpl) {
                this.state.title = tmpl.name;
                this.state.activityName = tmpl.activity;
                this.state.type = tmpl.type || 'solo';
                // Convert template steps to builder steps
                if (tmpl.steps) {
                    // Ensure UI is ready
                    setTimeout(() => {
                        // Populate title
                        document.getElementById('gb-title').value = tmpl.name;
                        // Populate steps logic... simple for now
                        console.log('Template loaded:', tmpl);
                    }, 100);
                }
            }
        } catch (e) { console.error(e); }
    }

    async loadActivities() {
        try {
            const response = await fetch('./data/dropdowns/tracker_activities.json');
            this.activities = await response.json();
        } catch (e) {
            console.warn('GoalBuilder: Failed to load activities (using defaults or empty)', e);
        }
    }

    render(parentContainer = null) {
        const container = parentContainer || document.getElementById(this.containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="goal-builder-wrapper">
                <!-- Sticky Header -->
                <div class="gb-sticky-header">
                    <input type="text" class="gb-title-input" id="gb-title" placeholder="e.g., Run 10k in 3 months" value="${this.state.title}" oninput="window.MizanoGoalBuilder.updateTitle(this.value)">
                    <div class="gb-type-selector">
                        <button class="gb-type-btn active" data-type="solo" onclick="window.MizanoGoalBuilder.setType('solo')">👤 Solo</button>
                        <button class="gb-type-btn" data-type="duo" onclick="window.MizanoGoalBuilder.setType('duo')">👥 Duo</button>
                        <button class="gb-type-btn" data-type="group" onclick="window.MizanoGoalBuilder.setType('group')">👪 Group</button>
                    </div>
                </div>

                <!-- 1. Core Identity -->
                <div class="gb-section-card expanded" id="gb-sect-core">
                    <div class="gb-section-header" onclick="window.MizanoGoalBuilder.toggleSection('gb-sect-core')">
                        <span>Core Identity</span>
                        <span class="gb-toggle-icon">[–]</span>
                    </div>
                    <div class="gb-section-content">
                        <label>Activity / Sport</label>
                        <input type="text" id="gb-activity-search" placeholder="Search activities..." list="gb-activities-list" onchange="window.MizanoGoalBuilder.setActivity(this.value)">
                        <datalist id="gb-activities-list">
                            ${this.activities.map(a => `<option value="${a.display}">`).join('')}
                        </datalist>
                        
                        <label style="margin-top:10px;">Goal Narrative</label>
                        <textarea rows="3" placeholder="I want to..." id="gb-narrative"></textarea>
                    </div>
                </div>

                <!-- 2. Structure & Milestones -->
                <div class="gb-section-card expanded" id="gb-sect-steps">
                    <div class="gb-section-header" onclick="window.MizanoGoalBuilder.toggleSection('gb-sect-steps')">
                        <span>Structure & Milestones</span>
                        <span class="gb-toggle-icon">[–]</span>
                    </div>
                    <div class="gb-section-content">
                        <div id="gb-steps-container"></div>
                        <button class="gb-add-step-btn" onclick="window.MizanoGoalBuilder.addStepUI()">+ Add Step</button>
                    </div>
                </div>

                <!-- 3. People & Permissions -->
                <div class="gb-section-card expanded" id="gb-sect-people">
                    <div class="gb-section-header" onclick="window.MizanoGoalBuilder.toggleSection('gb-sect-people')">
                        <span>People & Permissions</span>
                        <span class="gb-toggle-icon">[–]</span>
                    </div>
                    <div class="gb-section-content" id="gb-people-content">
                        <!-- Dynamic content based on type -->
                        <p style="color:#777;">Private notes (only you)</p>
                    </div>
                </div>

                <!-- 4. Schedule & Alarms -->
                <div class="gb-section-card collapsed" id="gb-sect-alarms">
                    <div class="gb-section-header" onclick="window.MizanoGoalBuilder.toggleSection('gb-sect-alarms')">
                        <span>Schedule & Alarms</span>
                        <span class="gb-toggle-icon">[+]</span>
                    </div>
                    <div class="gb-section-content" style="display:none;">
                        <label>Reminders</label>
                        <select id="gb-reminders" onchange="window.MizanoGoalBuilder.state.schedule.reminders = this.value">
                            <option value="none">None</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                        </select>
                        <label>Alarm Sound</label>
                        <select id="gb-sound" onchange="window.MizanoGoalBuilder.state.schedule.sound = this.value">
                            <option value="default">Default</option>
                            <option value="chime">Chime</option>
                        </select>
                    </div>
                </div>

                 <!-- 5. Visibility -->
                <div class="gb-section-card collapsed" id="gb-sect-visibility">
                    <div class="gb-section-header" onclick="window.MizanoGoalBuilder.toggleSection('gb-sect-visibility')">
                        <span>Visibility & Sharing</span>
                        <span class="gb-toggle-icon">[+]</span>
                    </div>
                    <div class="gb-section-content" style="display:none;">
                        <label>Privacy</label>
                        <select onchange="window.MizanoGoalBuilder.state.visibility.privacy = this.value">
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                        <label style="display:flex; align-items:center; margin-top:10px; gap:10px;">
                            <input type="checkbox" onchange="window.MizanoGoalBuilder.state.visibility.showOnCV = this.checked">
                            Show on Sports CV
                        </label>
                    </div>
                </div>

                <!-- Actions -->
                <div style="margin-top:20px;">
                    <button class="gb-create-btn" onclick="window.MizanoGoalBuilder.createGoal()">Create Goal</button>
                    <button class="gb-cancel-btn" onclick="window.MizanoTrackerRenderer.render()">Cancel</button>
                </div>
            </div>
        `;

        this.updatePeopleSection();
    }

    // --- Actions ---

    toggleSection(id) {
        const card = document.getElementById(id);
        const content = card.querySelector('.gb-section-content');
        const icon = card.querySelector('.gb-toggle-icon');

        if (card.classList.contains('expanded')) {
            card.classList.remove('expanded');
            card.classList.add('collapsed');
            content.style.display = 'none';
            icon.textContent = '[+]';
        } else {
            card.classList.remove('collapsed');
            card.classList.add('expanded');
            content.style.display = 'block';
            icon.textContent = '[–]';
        }
    }

    updateTitle(val) { this.state.title = val; }

    setType(type) {
        this.state.type = type;
        // Update Buttons
        document.querySelectorAll('.gb-type-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.type === type);
        });
        this.updatePeopleSection();
    }

    setActivity(val) {
        this.state.activityName = val;
        // Try to find matching object for ID
        const match = this.activities.find(a => a.display === val);
        if (match) this.state.activityId = match.value;
    }

    updatePeopleSection() {
        const container = document.getElementById('gb-people-content');
        if (!container) return;

        if (this.state.type === 'solo') {
            container.innerHTML = `<p style="color:#777;">Private notes (only you)</p>`;
        } else if (this.state.type === 'duo') {
            container.innerHTML = `
                <label>Invite Partner</label>
                <input type="text" placeholder="Search profiles (e.g. usernames)..." id="gb-partner-input">
                <div style="margin-top:10px; font-size:0.9em; color:#666;">
                    Partner will receive an invite to join this goal.
                </div>
            `;
        } else {
            container.innerHTML = `
                <label>Group Name</label>
                <input type="text" placeholder="e.g. Marathon Squad" oninput="window.MizanoGoalBuilder.state.people.groupName = this.value">
                <label style="margin-top:10px;">Add Members</label>
                <input type="text" placeholder="Search profiles...">
            `;
        }
    }

    addStepUI() {
        const container = document.getElementById('gb-steps-container');
        const count = container.children.length;
        const div = document.createElement('div');
        div.className = 'gb-step-item';
        div.dataset.index = count;
        div.innerHTML = `
            <div style="display:flex; gap:5px; margin-bottom:5px;">
                <input type="text" class="step-desc" placeholder="Desc (e.g. Run 5km)" style="flex:2;">
                <select class="step-type" style="flex:1;">
                    <option value="checklist">Checklist</option>
                    <option value="tally">Tally</option>
                    <option value="timer">Timer</option>
                    <option value="photo">Photo</option>
                    <option value="handshake">Handshake</option>
                </select>
                <input type="number" class="step-target" placeholder="Tgt" value="1" style="width:50px;">
                <button onclick="this.closest('.gb-step-item').remove()">x</button>
            </div>
        `;
        container.appendChild(div);
    }

    // --- Save ---

    async createGoal() {
        // Collect Steps
        const stepEls = document.querySelectorAll('.gb-step-item');
        const steps = [];
        stepEls.forEach(el => {
            steps.push({
                description: el.querySelector('.step-desc').value,
                type: el.querySelector('.step-type').value,
                target: parseInt(el.querySelector('.step-target').value) || 1,
                completed: false
            });
        });

        const goal = {
            id: 'UG-' + Date.now(), // User Goal ID
            title: this.state.title || 'Untitled Goal',
            activity: this.state.activityName || 'General',
            type: this.state.type,
            steps: steps,
            people: this.state.people,
            schedule: this.state.schedule,
            visibility: this.state.visibility,
            createdAt: Date.now(),
            status: 'active'
        };

        try {
            await this.storage.addUserGoal(goal);
            alert('Goal Created!');
            // Return to dashboard
            if (window.MizanoTrackerRenderer) window.MizanoTrackerRenderer.render();
        } catch (e) {
            console.error(e);
            alert('Error creating goal: ' + e.message);
        }
    }
}

// Global Singleton
window.MizanoGoalBuilder = new GoalBuilder('drop-field-tracker');
