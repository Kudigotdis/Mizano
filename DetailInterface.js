/**
 * MIZANO DETAIL INTERFACE
 * Handles rendering of full activity details in a deep view.
 * Absolute Law: MIZANO_UIUX_PAGE_STRUCTURE.md.txt
 */

class DetailInterface {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.dataManager = window.mizanoData;
        this.safety = window.MizanoSafety;
    }

    /**
     * Renders an activity detail view based on ID.
     */
    async render(activityId) {
        if (!this.container) return;

        const activity = this.dataManager.getEventById(activityId);
        if (!activity) {
            this.container.innerHTML = '<div class="p-4">Activity not found.</div>';
            return;
        }

        // Delegate to MarathonDetail if it's a marathon
        if (activity.event_id?.startsWith('BW-2026') || activity.card_type === 'Registration-State Card') {
            if (window.MizanoMarathon) {
                window.MizanoMarathon.activeActivityId = activityId;
                window.MizanoMarathon.render(activity);
                return;
            }
        }

        const safetyCheck = this.safety.checkAction('COMPETITIVE_JOIN', { activity_id: activityId });

        this.container.innerHTML = `
            <div class="detail-wrapper">
                <div class="detail-header">
                    <button class="back-btn" onclick="window.MizanoNav.back()">‹ Back</button>
                    <h2 class="detail-title">${activity.sport || 'Activity Details'}</h2>
                </div>
                
                <div class="detail-content">
                    <div class="detail-media-placeholder">
                        <span class="placeholder-text">Venue: ${activity.location_name || activity.venue_name}</span>
                    </div>

                    <div class="detail-main">
                        <h1 class="activity-h1">${activity.title || activity.event_name}</h1>
                        <p class="activity-meta">📍 ${activity.location_name || activity.venue_name} • 💰 BWP ${activity.entry_fee || 'Free'}</p>
                        
                        <div class="detail-stats">
                            <div class="stat-card">
                                <span class="stat-label">Starts</span>
                                <span class="stat-value">${activity.start_time ? new Date(activity.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : activity.start_date}</span>
                            </div>
                            <div class="stat-card">
                                <span class="stat-label">Capacity</span>
                                <span class="stat-value">${activity.capacity?.max_players || '∞'} Max</span>
                            </div>
                        </div>

                        <div class="detail-description">
                            <h3>About this ${activity.activity_type || 'Event'}</h3>
                            <p>${activity.description || `Join this local session. All skill levels welcome unless specified otherwise. Mandatory compliance with Mizano community rules.`}</p>
                        </div>

                        <div class="detail-rules">
                            <h3>Rules & Archetype</h3>
                            <div class="rule-box">
                                <strong>Logic:</strong> ${activity.rules_template || 'Open Play'}
                                <p>Vertical single-pane management enforced.</p>
                            </div>
                        </div>
                    </div>

                    <div class="detail-action-bar">
                        ${this.getActionButton(activity, safetyCheck)}
                    </div>
                </div>
            </div>
        `;
    }

    getActionButton(activity, safetyCheck) {
        if (!safetyCheck.allowed) {
            let reason = "Action Restricted";
            if (safetyCheck.code === 'MINOR_RESTRICTION') reason = "Guardian Required";
            if (safetyCheck.code === 'ACADEMIC_ALERT') reason = "Focus on Studies";

            return `<button class="detail-btn locked" disabled>${reason}</button>`;
        }

        return `<button class="detail-btn active" onclick="alert('Join logic would trigger sync here.')">Join Content</button>`;
    }
}

// Initialize globally
window.MizanoDetail = new DetailInterface('detail-view');
