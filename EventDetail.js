/**
 * MIZANO EVENT DETAIL RENDERER
 * Renders a full-page detail view when a user taps the body of an Event Card.
 * Injects into the existing #detail-view overlay.
 */

class EventDetail {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    /**
     * Finds an event by its ID from the integrated database and renders the detail page.
     * @param {string} eventId — The event_id or eventID field.
     */
    render(eventId) {
        if (!this.container) return;

        const events = (window.MIZANO_DATA && window.MIZANO_DATA.events) || [];
        const event = events.find(e => e.event_id === eventId || (e.raw_data && e.raw_data.eventID === eventId));

        if (!event) {
            this.container.innerHTML = `
                <div class="detail-wrapper">
                    <div class="detail-header">
                        <button class="back-btn" onclick="window.MizanoNav.back()">‹ Back</button>
                        <h2 class="detail-title">Event Not Found</h2>
                    </div>
                    <div class="detail-content" style="padding:24px; text-align:center; color:#777;">
                        <div style="font-size:3rem; margin-bottom:12px;">🔎</div>
                        <p>We couldn't load the details for this event.</p>
                    </div>
                </div>`;
            window.MizanoNav.openOverlay('detail');
            return;
        }

        const raw = event.raw_data || {};

        // --- Metadata Extraction ---
        const title = event.title || 'Event';
        const organizer = event.organizer || (raw.sponsor && raw.sponsor.name) || 'Mizano Events';
        const startDate = this._formatDate(event.start_date || raw.dates?.startDate);
        const endDate = this._formatDate(raw.dates?.endDate);
        const venue = event.venue_name || (typeof raw.venue === 'string' ? raw.venue : raw.venue?.primary) || 'TBA';
        const region = event.location || raw.region || 'Botswana';
        const format = raw.competitionFormat ? raw.competitionFormat.replace(/_/g, ' ') : (event.category || 'Event');
        const priceText = event.price_display || 'Free Entry';
        const tagline = raw.tagline || '';
        const prizes = raw.financial?.prizePool ? `P${raw.financial.prizePool.toLocaleString()}` : null;
        const totalTeams = raw.participants?.totalTeams || null;

        // --- Special Features ---
        const features = this._buildFeatures(raw.mizanoIntegration || {}, raw.specialFeatures || {});

        // --- Sponsor block ---
        const sponsorHTML = raw.sponsor ? `
            <div class="event-detail__sponsor">
                <span class="event-detail__label">Sponsored by</span>
                <span class="event-detail__sponsor-name">${raw.sponsor.name}</span>
            </div>` : '';

        // --- Status Badge ---
        const activityState = (raw.mizanoIntegration?.activityState || '').replace('_', ' ') || 'upcoming';
        const statusColor = activityState === 'live' ? '#FFA500' : activityState === 'finished' ? '#505050' : '#FFD700';

        this.container.innerHTML = `
            <div class="detail-wrapper event-detail-wrapper">
                <div class="detail-header">
                    <button class="back-btn" onclick="window.MizanoNav.back()">‹ Back</button>
                    <h2 class="detail-title" style="font-size:1rem;">${title}</h2>
                </div>

                <div class="event-detail__body">

                    <!-- Hero Block -->
                    <div class="event-detail__hero">
                        <div class="event-detail__hero-icon">🏆</div>
                        <div class="event-detail__hero-text">
                            <h1 class="event-detail__title">${title}</h1>
                            ${tagline ? `<p class="event-detail__tagline">${tagline}</p>` : ''}
                            <span class="event-detail__status-badge" style="background:${statusColor}20; color:${statusColor}; border:1px solid ${statusColor}50;">${activityState}</span>
                        </div>
                    </div>

                    ${sponsorHTML}

                    <!-- Key Info Grid -->
                    <div class="event-detail__grid">
                        <div class="event-detail__grid-item">
                            <div class="event-detail__grid-label">📅 Date</div>
                            <div class="event-detail__grid-value">${startDate}${endDate && endDate !== startDate ? ` – ${endDate}` : ''}</div>
                        </div>
                        <div class="event-detail__grid-item">
                            <div class="event-detail__grid-label">📍 Venue</div>
                            <div class="event-detail__grid-value">${venue}</div>
                        </div>
                        <div class="event-detail__grid-item">
                            <div class="event-detail__grid-label">🗺️ Region</div>
                            <div class="event-detail__grid-value">${region}</div>
                        </div>
                        <div class="event-detail__grid-item">
                            <div class="event-detail__grid-label">🏟️ Format</div>
                            <div class="event-detail__grid-value" style="text-transform:capitalize;">${format}</div>
                        </div>
                        ${totalTeams ? `
                        <div class="event-detail__grid-item">
                            <div class="event-detail__grid-label">👥 Teams</div>
                            <div class="event-detail__grid-value">${totalTeams}</div>
                        </div>` : ''}
                        ${prizes ? `
                        <div class="event-detail__grid-item">
                            <div class="event-detail__grid-label">🥇 Prize Pool</div>
                            <div class="event-detail__grid-value" style="color:#2e7d32; font-weight:700;">${prizes}</div>
                        </div>` : ''}
                    </div>

                    <!-- Entry Fee Banner -->
                    <div class="event-detail__price-banner">
                        ${priceText}
                    </div>

                    <!-- Features / Mizano Integration -->
                    ${features.length ? `
                    <div class="event-detail__features">
                        <div class="event-detail__section-title">🔧 Features</div>
                        <div class="event-detail__feature-chips">
                            ${features.map(f => `<span class="event-detail__chip">${f}</span>`).join('')}
                        </div>
                    </div>` : ''}

                    <!-- WhatsApp / External Action -->
                    <div class="event-detail__actions">
                        <button class="event-detail__btn event-detail__btn--primary" onclick="window.MizanoNav.back()">
                            ← Back to Events
                        </button>
                    </div>

                </div>
            </div>`;

        // Open the detail overlay
        window.MizanoNav.openOverlay('detail');
    }

    /**
     * Builds an array of human-readable feature strings from mizano integration flags.
     */
    _buildFeatures(integration, special) {
        const features = [];
        if (integration.allowFanStreams) features.push('📺 Fan Streams');
        if (integration.equipmentBorrowing) features.push('🦺 Equipment Lending');
        if (integration.callOutsEnabled) features.push('📣 Call-Outs Enabled');
        if (integration.offlineMatchSignup) features.push('📶 Offline Sign-Up');
        if (integration.bluetoothSignup) features.push('🔵 Bluetooth Sign-Up');
        if (integration.guardianRequired) features.push('👨‍👧 Guardian Required');
        if (special.financialLiteracyWorkshops) features.push('💰 Financial Literacy Workshop');
        if (special.digitalSkillsTraining) features.push('💻 Digital Skills Training');
        return features;
    }

    /**
     * Format ISO date strings to readable display format.
     */
    _formatDate(dateStr) {
        if (!dateStr) return 'TBA';
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }
}

window.MizanoEventDetail = new EventDetail('detail-view');
