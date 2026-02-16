/**
 * MIZANO MARATHON DETAIL INTERFACE
 * Level B Detail Overlay with specialized marathon features.
 */

class MarathonDetail {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentTab = 'details';
    }

    render(activity) {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="marathon-detail-wrapper">
                <div class="marathon-hero">
                    <button class="back-btn" onclick="window.MizanoNav.back()">‹ Back</button>
                    ${window.MizanoImages.render('logos', activity.logo || null, 'event-hero-logo')}
                    <h1 class="event-title">${activity.event_name}</h1>
                    <div class="event-status-badge">${activity.activity_state.replace('_', ' ').toUpperCase()}</div>
                </div>

                <div class="tab-bar">
                    <button class="tab-btn ${this.currentTab === 'details' ? 'active' : ''}" onclick="window.MizanoMarathon.switchTab('details')">Details</button>
                    <button class="tab-btn ${this.currentTab === 'registrations' ? 'active' : ''}" onclick="window.MizanoMarathon.switchTab('registrations')">Participants</button>
                    <button class="tab-btn ${this.currentTab === 'route' ? 'active' : ''}" onclick="window.MizanoMarathon.switchTab('route')">Route</button>
                </div>

                <div class="tab-content">
                    ${this.renderTabContent(activity)}
                </div>

                <div class="action-footer">
                    <button class="register-btn" onclick="window.MizanoMarathon.openRegistration()">Register Now</button>
                </div>
            </div>
        `;
    }

    renderTabContent(activity) {
        switch (this.currentTab) {
            case 'details':
                return `
                    <div class="details-pane">
                        <section>
                            <h3>Race Information</h3>
                            <p>${activity.description || 'Join thousands of runners in this premier athletic event.'}</p>
                            <ul>
                                <li><strong>Date:</strong> ${activity.start_date}</li>
                                <li><strong>Location:</strong> ${activity.venue_name}, ${activity.village_town}</li>
                                <li><strong>Entry Fee:</strong> ${activity.price_range || 'TBA'}</li>
                            </ul>
                        </section>
                        <section>
                            <h3>Distances Available</h3>
                            <div class="distance-grid">
                                ${(activity.distances || ['5km', '10km']).map(d => `<div class="distance-chip">${d}</div>`).join('')}
                            </div>
                        </section>
                    </div>
                `;
            case 'registrations':
                return `
                    <div class="registrations-pane">
                        <div class="placeholder-msg">Loading current registrations...</div>
                    </div>
                `;
            case 'route':
                return `
                    <div class="route-pane">
                        <div class="route-map-placeholder">
                            [ ROUTE MAP: ${activity.event_name} ]
                        </div>
                    </div>
                `;
            default:
                return '';
        }
    }

    switchTab(tab) {
        this.currentTab = tab;
        // Re-render would normally happen via state update, but here we just re-call render for simplicity
        const activity = window.mizanoData.getEventById(this.activeActivityId);
        if (activity) this.render(activity);
    }

    openRegistration() {
        if (window.MizanoMarathonForm) {
            window.MizanoMarathonForm.render(this.activeActivityId);
        } else {
            alert('Registration module loading...');
        }
    }
}

window.MizanoMarathon = new MarathonDetail('detail-view');
