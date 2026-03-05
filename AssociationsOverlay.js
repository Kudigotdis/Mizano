/**
 * MIZANO ASSOCIATIONS OVERLAY
 * Displays all sports associations with profiles and Executive Pulse Dashboard
 */

class AssociationsOverlay {
    constructor() {
        this.overlay = null;
        this.currentAssociation = null;
    }

    /**
     * Initialize overlay HTML
     */
    init() {
        // Create overlay element
        const overlayHTML = `
            <div class="associations-overlay" id="associations-overlay">
                <div class="associations-panel">
                    <div class="associations-header">
                        <h2>🏆 Sports Associations</h2>
                        <button class="close-btn" onclick="window.associationsOverlay.close()">[X]</button>
                    </div>
                    <div class="associations-content">
                        <div class="associations-list" id="associations-list">
                            <!-- Populated dynamically -->
                        </div>
                        <div class="association-profile" id="association-profile" style="display: none;">
                            <!-- Profile view -->
                        </div>
                        <div class="association-pulse" id="association-pulse" style="display: none;">
                            <!-- Executive Pulse Dashboard -->
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Append to body
        document.body.insertAdjacentHTML('beforeend', overlayHTML);
        this.overlay = document.getElementById('associations-overlay');

        // Close on background click
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });
    }

    /**
     * Open overlay and show associations list
     */
    async open() {
        if (!this.overlay) this.init();

        // Load associations
        const associations = window.dataManager?.cache?.associations || [];

        if (associations.length === 0) {
            console.warn('No associations loaded');
            return;
        }

        // Render list
        this.renderList(associations);

        // Show overlay
        this.overlay.classList.add('active');
    }

    /**
     * Close overlay
     */
    close() {
        if (this.overlay) {
            this.overlay.classList.remove('active');
        }
    }

    /**
     * Render associations list
     */
    renderList(associations) {
        const listContainer = document.getElementById('associations-list');

        // Group by sport
        const grouped = {};
        associations.forEach(assoc => {
            const sport = assoc.sport || 'Other';
            if (!grouped[sport]) grouped[sport] = [];
            grouped[sport].push(assoc);
        });

        const html = Object.entries(grouped).map(([sport, assocs]) => `
            <div class="sport-group">
                <h3 class="sport-title">${sport.toUpperCase()}</h3>
                ${assocs.map(assoc => `
                    <div class="association-card" onclick="window.associationsOverlay.showProfile('${assoc.org_id}')">
                        <h3>${assoc.org_name}</h3>
                        <p>📍 ${assoc.location?.city || 'N/A'}, ${assoc.location?.country || ''}</p>
                        <p>👥 ${assoc.staff?.length || 0} staff members</p>
                        <p>⚽ ${assoc.affiliated_clubs || 0} affiliated clubs</p>
                    </div>
                `).join('')}
            </div>
        `).join('');

        listContainer.innerHTML = html;
    }

    /**
     * Show association profile
     */
    async showProfile(orgId) {
        const associations = window.dataManager?.cache?.associations || [];
        const assoc = associations.find(a => a.org_id === orgId);

        if (!assoc) return;

        this.currentAssociation = assoc;

        const profileContainer = document.getElementById('association-profile');
        const pulseContainer = document.getElementById('association-pulse');
        const listContainer = document.getElementById('associations-list');

        // Hide list, show profile
        listContainer.style.display = 'none';
        profileContainer.style.display = 'block';

        // Render profile
        profileContainer.innerHTML = `
            <div class="profile-header">
                <button class="back-btn" onclick="window.associationsOverlay.backToList()">← Back</button>
                <h2>${assoc.org_name}</h2>
            </div>
            <div class="profile-details">
                <div class="profile-section">
                    <h3>📍 Location</h3>
                    <p>${assoc.location?.headquarters || ''}</p>
                    <p>${assoc.location?.street_address || ''}</p>
                    <p>${assoc.location?.city || ''}, ${assoc.location?.country || ''}</p>
                </div>
                <div class="profile-section">
                    <h3>📞 Contact</h3>
                    <p>Phone: ${assoc.contact?.phone || 'N/A'}</p>
                    <p>Email: ${assoc.contact?.email || 'N/A'}</p>
                    <p>Website: ${assoc.contact?.website || 'N/A'}</p>
                </div>
                <div class="profile-section">
                    <h3>👥 Staff (${assoc.staff?.length || 0})</h3>
                    ${(assoc.staff || []).map(staff => `
                        <div class="staff-card">
                            <strong>${staff.role}</strong>: ${staff.name}
                            <br><small>${staff.email || ''}</small>
                        </div>
                    `).join('')}
                </div>
                <div class="profile-section">
                    <h3>🏆 Competitions</h3>
                    <p>${(assoc.competitions_managed || []).join(', ') || 'None listed'}</p>
                </div>
                <div class="profile-section">
                    <h3>💼 Sponsors</h3>
                    <p>${(assoc.sponsors || []).join(', ') || 'None listed'}</p>
                </div>
            </div>
            <div class="profile-actions">
                <button class="pulse-btn" onclick="window.associationsOverlay.showPulse()">
                    ⚡ View Executive Pulse Dashboard
                </button>
            </div>
        `;
    }

    /**
     * Show Executive Pulse Dashboard
     */
    async showPulse() {
        const profileContainer = document.getElementById('association-profile');
        const pulseContainer = document.getElementById('association-pulse');

        // Hide profile, show pulse
        profileContainer.style.display = 'none';
        pulseContainer.style.display = 'block';

        // Initialize pulse card if not already done
        if (!window.pulseCard) {
            window.pulseCard = new AssociationPulseCard('association-pulse');
        }

        // Render pulse dashboard
        await window.pulseCard.render(this.currentAssociation?.org_id);
    }

    /**
     * Back to associations list
     */
    backToList() {
        const profileContainer = document.getElementById('association-profile');
        const pulseContainer = document.getElementById('association-pulse');
        const listContainer = document.getElementById('associations-list');

        profileContainer.style.display = 'none';
        pulseContainer.style.display = 'none';
        listContainer.style.display = 'block';
    }
}

// Global instance
window.associationsOverlay = new AssociationsOverlay();

// Associations button auto-append removed as per user request
