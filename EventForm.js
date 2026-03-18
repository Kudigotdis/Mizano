/**
 * MIZANO — EventForm.js (Session 5)
 * Applied Android Studio Otter Pipeline standards.
 *
 * EventForm.render() → HTML string injected by AddActionRouter.openForm('event')
 * On submit → window.mizanoStorage.saveEntity('activities', record)
 * After save → determineExperienceType(record) called per EVENT_GENERATION_LOGIC.md
 *
 * Save to: Mizano\EventForm.js (project root)
 * Script tag: added to index.html (Session 5)
 */

window.EventForm = (function () {

    // ─── STATIC LISTS ─────────────────────────────────────────────────────────

    const EVENT_TYPES = [
        'Match', 'Training Session', 'Tournament', 'Social Game',
        'Workshop', 'School Fixture', 'Corporate Event', 'Open Day',
        'Friendly', 'Other'
    ];

    const SPORTS = [
        'Soccer', 'Netball', 'Basketball', 'Athletics', 'Swimming', 'Tennis',
        'Cricket', 'Rugby', 'Chess', 'Cycling', 'Volleyball', 'Badminton',
        'Table Tennis', 'Golf', 'Martial Arts', 'Boxing', 'Dance', 'Gymnastics',
        'Hockey', 'Softball', 'Baseball', 'Triathlon', 'Hiking', 'Squash',
        'Rowing', 'Archery', 'Shooting', 'Weightlifting', 'Surfing', 'Skateboarding'
    ];

    const AGE_CATS = ['Open', 'U8', 'U10', 'U12', 'U14', 'U16', 'U18', 'Seniors', 'Veterans 35+'];
    const GENDER_CATS = ['Mixed', 'Male Only', 'Female Only'];
    const ACCESS_LEVELS = [
        'Open to All', 'Invite Only', 'Members of a Specific Group',
        'Association Members Only', 'Corporate Teams Only'
    ];

    // ─────────────────────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────────────────────

    function render() {
        return `
        <div id="event-form-wrap" style="padding:16px 0 100px;font-family:inherit;">
            ${_styles()}

            <!-- ── SECTION 1: EVENT BASICS ────────────────────────────── -->
            <div class="ef-section">
                <div class="ef-section-hd collapsible-header ef-open" data-sec="basics">
                    <span class="ef-sec-title"><span class="ef-req">*</span> Event Basics</span>
                    <span class="collapsible-arrow ef-arrow">⌄</span>
                </div>
                <div class="ef-section-body" id="sec-basics">
                    <label class="ef-label">Event Name <span class="ef-req">*</span></label>
                    <input type="text" id="ef-name" class="ef-input" maxlength="80"
                        placeholder="e.g. Saturday 5-aside, Block 3 Tournament…"
                        oninput="window.EventForm._charCount(this, 'ef-name-count', 80)">
                    <small id="ef-name-count" class="ef-hint" style="text-align:right;display:block;">0 / 80</small>

                    <label class="ef-label" style="margin-top:10px;">Event Type <span class="ef-req">*</span></label>
                    <select id="ef-type" class="ef-input" required>
                        <option value="">Select event type…</option>
                        ${EVENT_TYPES.map(t => `<option>${t}</option>`).join('')}
                    </select>

                    <label class="ef-label" style="margin-top:10px;">Sport or Activity <span class="ef-req">*</span></label>
                    <div style="position:relative;">
                        <input type="text" id="ef-sport-search" class="ef-input"
                            placeholder="Search or pick a sport…"
                            oninput="window.EventForm._filterSports(this.value)"
                            onfocus="window.EventForm._showSportList()">
                        <input type="hidden" id="ef-sport">
                        <div id="ef-sport-list" class="ef-dropdown-list" style="display:none;">
                            ${SPORTS.map(s => `
                                <div class="ef-dropdown-item" onclick="window.EventForm._selectSport('${s}')">
                                    ${s}
                                </div>`).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <!-- ── SECTION 2: DATE, TIME AND RECURRENCE ──────────────── -->
            <div class="ef-section">
                <div class="ef-section-hd collapsible-header" data-sec="datetime">
                    <span class="ef-sec-title"><span class="ef-req">*</span> Date, Time &amp; Recurrence</span>
                    <span class="collapsible-arrow ef-arrow">›</span>
                </div>
                <div class="ef-section-body" id="sec-datetime" style="display:none;">
                    <div style="display:flex;gap:10px;margin-bottom:10px;">
                        <div style="flex:1;">
                            <label class="ef-label">Start Date <span class="ef-req">*</span></label>
                            <input type="date" id="ef-start-date" class="ef-input" required
                                min="${_today()}" onchange="window.EventForm._onDateChange()">
                        </div>
                        <div style="flex:1;">
                            <label class="ef-label">Start Time</label>
                            <select id="ef-start-time" class="ef-input" onchange="window.EventForm._suggestEndTime()">
                                <option value="">Select time…</option>
                                ${_timeOptions()}
                            </select>
                        </div>
                    </div>
                    <div style="margin-bottom:10px;">
                        <label class="ef-label">End Time</label>
                        <select id="ef-end-time" class="ef-input">
                            <option value="">Select time…</option>
                            ${_timeOptions()}
                        </select>
                    </div>

                    <!-- Recurring -->
                    <label class="ef-label" style="margin-top:4px;">Recurring</label>
                    <div style="display:flex;gap:8px;margin-bottom:8px;">
                        ${['One-off', 'Weekly', 'Monthly'].map(r => `
                        <button type="button" class="ef-recur-btn ${r === 'One-off' ? 'active' : ''}"
                            data-recur="${r}"
                            onclick="window.EventForm._selectRecur('${r}')">
                            ${r}
                        </button>`).join('')}
                    </div>
                    <div id="ef-recur-until-wrap" style="display:none;margin-bottom:8px;">
                        <label class="ef-label">Repeat Until <span class="ef-req">*</span></label>
                        <input type="date" id="ef-recur-until" class="ef-input"
                            onchange="window.EventForm._showNextDates()">
                    </div>
                    <div id="ef-next-dates" style="font-size:0.75rem;color:#888;padding:4px 0;"></div>
                </div>
            </div>

            <!-- ── SECTION 3: LOCATION ────────────────────────────────── -->
            <div class="ef-section">
                <div class="ef-section-hd collapsible-header" data-sec="location">
                    <span class="ef-sec-title">Location</span>
                    <span class="collapsible-arrow ef-arrow">›</span>
                </div>
                <div class="ef-section-body" id="sec-location" style="display:none;">
                    <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                        <span style="font-size:0.82rem;color:#555;font-weight:600;">Use a registered venue?</span>
                        <label class="ef-toggle-wrap">
                            <input type="checkbox" id="ef-use-venue" checked
                                onchange="window.EventForm._toggleVenueMode(this.checked)">
                            <span class="ef-toggle-slider"></span>
                        </label>
                    </div>

                    <!-- Venue search (default ON) -->
                    <div id="ef-venue-search-wrap">
                        <input type="text" id="ef-venue-search" class="ef-input"
                            placeholder="Search venues…"
                            oninput="window.EventForm._searchVenues(this.value)">
                        <div id="ef-venue-results" class="ef-dropdown-list" style="display:none;"></div>
                        <input type="hidden" id="ef-venue-id">
                    </div>

                    <!-- Custom location (shown when toggle OFF) -->
                    <div id="ef-custom-location-wrap" style="display:none;">
                        <div style="display:flex;gap:10px;margin-bottom:10px;">
                            <div style="flex:1;">
                                <label class="ef-label">City / Town</label>
                                <select id="ef-city" class="ef-input"
                                    onchange="window.EventForm._loadAreas(this.value)">
                                    <option value="">Select city…</option>
                                    ${_cityOptions()}
                                </select>
                            </div>
                            <div style="flex:1;">
                                <label class="ef-label">Area</label>
                                <select id="ef-area" class="ef-input">
                                    <option value="">Select area…</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <label class="ef-label" style="margin-top:8px;">Meeting Point Note (optional)</label>
                    <input type="text" id="ef-meeting-note" class="ef-input"
                        placeholder="e.g. Park by the blue gate, Use east entrance…">
                </div>
            </div>

            <!-- ── SECTION 4: WHO CAN JOIN ────────────────────────────── -->
            <div class="ef-section">
                <div class="ef-section-hd collapsible-header" data-sec="access">
                    <span class="ef-sec-title"><span class="ef-req">*</span> Who Can Join</span>
                    <span class="collapsible-arrow ef-arrow">›</span>
                </div>
                <div class="ef-section-body" id="sec-access" style="display:none;">
                    <label class="ef-label">Access Level <span class="ef-req">*</span></label>
                    <select id="ef-access" class="ef-input" required>
                        <option value="">Select access level…</option>
                        ${ACCESS_LEVELS.map(a => `<option>${a}</option>`).join('')}
                    </select>

                    <div style="display:flex;gap:10px;margin-top:10px;">
                        <div style="flex:1;">
                            <label class="ef-label">Age Category</label>
                            <select id="ef-age-cat" class="ef-input">
                                ${AGE_CATS.map(a => `<option>${a}</option>`).join('')}
                            </select>
                        </div>
                        <div style="flex:1;">
                            <label class="ef-label">Gender Category</label>
                            <select id="ef-gender-cat" class="ef-input">
                                ${GENDER_CATS.map(g => `<option>${g}</option>`).join('')}
                            </select>
                        </div>
                    </div>

                    <label class="ef-label" style="margin-top:10px;">Format</label>
                    <div style="display:flex;gap:8px;margin-bottom:10px;">
                        ${['Team-based', 'Individual'].map(f => `
                        <button type="button" class="ef-recur-btn ${f === 'Team-based' ? 'active' : ''}"
                            data-format="${f}" onclick="window.EventForm._selectFormat('${f}')">
                            ${f}
                        </button>`).join('')}
                    </div>
                    <input type="hidden" id="ef-format" value="Team-based">

                    <label class="ef-label">Max Participants / Teams</label>
                    <input type="number" id="ef-max-participants" class="ef-input"
                        placeholder="0 = unlimited" min="0" value="0">
                </div>
            </div>

            <!-- ── SECTION 5: TICKETING & REGISTRATION ────────────────── -->
            <div class="ef-section">
                <div class="ef-section-hd collapsible-header" data-sec="fees">
                    <span class="ef-sec-title">Ticketing &amp; Registration</span>
                    <span class="collapsible-arrow ef-arrow">›</span>
                </div>
                <div class="ef-section-body" id="sec-fees" style="display:none;">
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
                        <span class="ef-label" style="margin:0;">Entry Fee — Free</span>
                        <label class="ef-toggle-wrap">
                            <input type="checkbox" id="ef-free-toggle" checked
                                onchange="window.EventForm._toggleFee(this.checked)">
                            <span class="ef-toggle-slider"></span>
                        </label>
                    </div>
                    
                    <div id="ef-tickets-wrap" style="display:none;margin-bottom:16px;">
                        <label class="ef-label">Ticket Tiers</label>
                        <p class="ef-hint" style="margin-top:0;">Define different prices (e.g. VIP, Early Bird).</p>
                        <div id="ef-tickets-list" style="margin-bottom:10px;"></div>
                        <button type="button" class="ef-secondary-btn" style="width:100%;" onclick="window.EventForm._openAddTicketModal()">+ Add Ticket Tier</button>
                        <input type="hidden" id="ef-tickets-data" value="[]">
                    </div>

                    <label class="ef-label">Registration Description / Rules</label>
                    <textarea id="ef-description" class="ef-input ef-textarea"
                        placeholder="What to bring, dress code, scoring format, rules…"></textarea>

                    <label class="ef-label" style="margin-top:10px;">Prizes or Incentives (optional)</label>
                    <textarea id="ef-prizes" class="ef-input ef-textarea" style="min-height:60px;"
                        placeholder="e.g. Trophy for winners, P500 prize pool…"></textarea>

                    <label class="ef-label" style="margin-top:10px;">Cover Photo / Event Poster (optional)</label>
                    <div id="ef-cover-preview" style="display:none;margin-bottom:8px;">
                        <img id="ef-cover-img" style="width:100%;max-height:160px;object-fit:cover;border-radius:8px;">
                    </div>
                    <button type="button" class="ef-secondary-btn" style="width:100%;" onclick="window.EventForm._pickCover()">
                        📷 Upload Cover Photo
                    </button>
                    <input type="file" id="ef-cover-input" accept="image/*" style="display:none;"
                        onchange="window.EventForm._previewCover(this)">
                </div>
            </div>

            <!-- ── SECTION 6: LINKED ENTITIES ─────────────────────────── -->
            <div class="ef-section">
                <div class="ef-section-hd collapsible-header" data-sec="linked">
                    <span class="ef-sec-title">Linked Entities (optional)</span>
                    <span class="collapsible-arrow ef-arrow">›</span>
                </div>
                <div class="ef-section-body" id="sec-linked" style="display:none;">
                    <!-- Organiser -->
                    <label class="ef-label">Organiser</label>
                    <div id="ef-organiser-display" style="font-size:0.85rem;color:#555;padding:8px 0;margin-bottom:6px;">
                        You (current user)
                    </div>
                    <input type="text" id="ef-organiser-override" class="ef-input"
                        placeholder="Override: search group or association name…"
                        oninput="window.EventForm._searchOrganiser(this.value)" style="margin-bottom:4px;">
                    <div id="ef-organiser-results" class="ef-dropdown-list" style="display:none;"></div>
                    <input type="hidden" id="ef-organiser-id">

                    <!-- Linked Group -->
                    <label class="ef-label" style="margin-top:10px;">Linked Group (optional)</label>
                    <input type="text" id="ef-group-search" class="ef-input"
                        placeholder="Search your groups…"
                        oninput="window.EventForm._searchGroups(this.value)">
                    <div id="ef-group-results" class="ef-dropdown-list" style="display:none;"></div>
                    <input type="hidden" id="ef-group-id">

                    <!-- Linked Association -->
                    <label class="ef-label" style="margin-top:10px;">Linked Association (optional)</label>
                    <input type="text" id="ef-assoc-search" class="ef-input"
                        placeholder="Search associations…"
                        oninput="window.EventForm._searchAssociations(this.value)">
                    <div id="ef-assoc-results" class="ef-dropdown-list" style="display:none;"></div>
                    <input type="hidden" id="ef-assoc-id">

                    <!-- Sponsors -->
                    <label class="ef-label" style="margin-top:10px;">Sponsors (optional)</label>
                    <input type="text" id="ef-sponsor-search" class="ef-input"
                        placeholder="Search businesses…"
                        oninput="window.EventForm._searchSponsors(this.value)">
                    <div id="ef-sponsor-results" class="ef-dropdown-list" style="display:none;"></div>
                    <div id="ef-sponsors-list" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;"></div>
                    <input type="hidden" id="ef-sponsor-ids" value="[]">

                    <!-- Referee toggle -->
                    <div style="margin-top:14px;">
                        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                            <span class="ef-label" style="margin:0;">Referee / Official Required?</span>
                            <label class="ef-toggle-wrap">
                                <input type="checkbox" id="ef-referee-toggle"
                                    onchange="window.EventForm._toggleReferee(this.checked)">
                                <span class="ef-toggle-slider"></span>
                            </label>
                        </div>
                        <div id="ef-referee-fields" style="display:none;">
                            <input type="text" id="ef-referee-name" class="ef-input"
                                placeholder="Referee contact name" style="margin-bottom:8px;">
                            <input type="tel" id="ef-referee-phone" class="ef-input"
                                placeholder="Referee contact phone (+267)">
                        </div>
                    </div>
                </div>
            </div>

            <!-- ── SECTION 7: LOGISTICS & TASKS ───────────────────────── -->
            <div class="ef-section">
                <div class="ef-section-hd collapsible-header" data-sec="logistics">
                    <span class="ef-sec-title">Logistics &amp; Tasks</span>
                    <span class="collapsible-arrow ef-arrow">›</span>
                </div>
                <div class="ef-section-body" id="sec-logistics" style="display:none;">
                    <p class="ef-hint">List equipment needed or tasks for volunteers/organisers.</p>
                    <div id="ef-logistics-list" style="margin-bottom:12px;"></div>
                    <button type="button" class="ef-secondary-btn" style="width:100%;" onclick="window.EventForm._openAddLogisticsModal()">+ Add Task / Item</button>
                    <input type="hidden" id="ef-logistics-data" value="[]">
                </div>
            </div>

            <!-- ── FOOTER CTA ─────────────────────────────────────────── -->
            <div style="padding:16px;position:sticky;bottom:0;background:#fff;
                border-top:1px solid #f0f0f0;z-index:10;">
                <button type="button" class="ef-submit-btn" onclick="window.EventForm._submit()">
                    Create Event
                </button>
            </div>
        </div>`;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SPORT SEARCH
    // ─────────────────────────────────────────────────────────────────────────

    function _filterSports(query) {
        const list = document.getElementById('ef-sport-list');
        if (!list) return;
        const q = query.toLowerCase();
        list.innerHTML = SPORTS
            .filter(s => s.toLowerCase().includes(q))
            .map(s => `<div class="ef-dropdown-item" onclick="window.EventForm._selectSport('${s}')">${s}</div>`)
            .join('');
        list.style.display = list.innerHTML ? 'block' : 'none';
    }

    function _showSportList() {
        const list = document.getElementById('ef-sport-list');
        if (list) { list.style.display = 'block'; }
    }

    function _selectSport(sport) {
        const searchEl = document.getElementById('ef-sport-search');
        const hiddenEl = document.getElementById('ef-sport');
        if (searchEl) searchEl.value = sport;
        if (hiddenEl) hiddenEl.value = sport;
        const list = document.getElementById('ef-sport-list');
        if (list) list.style.display = 'none';
    }

    // ─────────────────────────────────────────────────────────────────────────
    // DATE / TIME / RECURRENCE
    // ─────────────────────────────────────────────────────────────────────────

    function _onDateChange() { /* hook for future derived logic */ }

    function _suggestEndTime() {
        const start = document.getElementById('ef-start-time');
        const end = document.getElementById('ef-end-time');
        if (!start || !end || !start.value) return;
        // Add 90 minutes
        const [h, m] = start.value.split(':').map(Number);
        const totalMins = h * 60 + m + 90;
        const endH = String(Math.floor(totalMins / 60) % 24).padStart(2, '0');
        const endM = String(totalMins % 60).padStart(2, '0');
        end.value = `${endH}:${endM}`;
    }

    function _selectRecur(type) {
        document.querySelectorAll('.ef-recur-btn[data-recur]').forEach(b => {
            b.classList.toggle('active', b.dataset.recur === type);
        });
        const untilWrap = document.getElementById('ef-recur-until-wrap');
        const nextDates = document.getElementById('ef-next-dates');
        if (untilWrap) untilWrap.style.display = type === 'One-off' ? 'none' : 'block';
        if (nextDates && type === 'One-off') nextDates.textContent = '';
    }

    function _showNextDates() {
        const startInput = document.getElementById('ef-start-date');
        const untilInput = document.getElementById('ef-recur-until');
        const display = document.getElementById('ef-next-dates');
        if (!startInput?.value || !untilInput?.value || !display) return;

        const recurring = document.querySelector('.ef-recur-btn[data-recur].active')?.dataset.recur;
        if (!recurring || recurring === 'One-off') return;

        const start = new Date(startInput.value);
        const dates = [];
        const inc = recurring === 'Weekly' ? 7 : 30;

        let current = new Date(start);
        current.setDate(current.getDate() + inc);
        const limit = new Date(untilInput.value);

        while (current <= limit && dates.length < 3) {
            dates.push(current.toDateString());
            current = new Date(current);
            current.setDate(current.getDate() + inc);
        }

        display.textContent = dates.length
            ? 'Next: ' + dates.join(' · ')
            : '';
    }

    // ─────────────────────────────────────────────────────────────────────────
    // LOCATION
    // ─────────────────────────────────────────────────────────────────────────

    function _toggleVenueMode(useVenue) {
        document.getElementById('ef-venue-search-wrap').style.display = useVenue ? 'block' : 'none';
        document.getElementById('ef-custom-location-wrap').style.display = useVenue ? 'none' : 'block';
    }

    async function _searchVenues(query) {
        const resultsEl = document.getElementById('ef-venue-results');
        if (!query || query.length < 2) { resultsEl.style.display = 'none'; return; }
        try {
            const all = await window.mizanoStorage.performTransaction('venues', 'readonly', s => s.getAll());
            const matches = (all || []).filter(v =>
                (v.name || '').toLowerCase().includes(query.toLowerCase())
            ).slice(0, 8);
            if (!matches.length) { resultsEl.style.display = 'none'; return; }
            resultsEl.style.display = 'block';
            resultsEl.innerHTML = matches.map(v => `
                <div class="ef-dropdown-item"
                    onclick="window.EventForm._selectVenue(${v.local_id},'${_safeAttr(v.name)}','${v.city || ''}','${v.area || ''}')">
                    <strong>${v.name}</strong>
                    <small style="color:#888;margin-left:6px;">${v.type || ''} · ${v.city || ''}</small>
                </div>`).join('');
        } catch { resultsEl.style.display = 'none'; }
    }

    function _selectVenue(id, name, city, area) {
        document.getElementById('ef-venue-search').value = name;
        document.getElementById('ef-venue-id').value = id;
        document.getElementById('ef-venue-results').style.display = 'none';
        // Auto-fill city/area if the fields exist
        const cityEl = document.getElementById('ef-city');
        const areaEl = document.getElementById('ef-area');
        if (cityEl) cityEl.value = city;
        if (areaEl) areaEl.value = area;
    }

    function _loadAreas(city) {
        const areaEl = document.getElementById('ef-area');
        if (!areaEl) return;
        areaEl.innerHTML = '<option value="">Select area…</option>';
        if (window.MIZANO_LOCATIONS?.[city]) {
            window.MIZANO_LOCATIONS[city].forEach(a => {
                areaEl.insertAdjacentHTML('beforeend', `<option value="${a}">${a}</option>`);
            });
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // FORMAT
    // ─────────────────────────────────────────────────────────────────────────

    function _selectFormat(fmt) {
        document.querySelectorAll('.ef-recur-btn[data-format]').forEach(b => {
            b.classList.toggle('active', b.dataset.format === fmt);
        });
        const fmtInput = document.getElementById('ef-format');
        if (fmtInput) fmtInput.value = fmt;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // FEES
    // ─────────────────────────────────────────────────────────────────────────

    function _toggleFee(isFree) {
        const wrap = document.getElementById('ef-tickets-wrap');
        if (wrap) wrap.style.display = isFree ? 'none' : 'block';
    }

    // ─────────────────────────────────────────────────────────────────────────
    // TICKETS & LOGISTICS (REPEATABLE)
    // ─────────────────────────────────────────────────────────────────────────

    let _ticketsMgr = null;
    let _logisticsMgr = null;

    function init() {
        _ticketsMgr = window.FormHelpers.createRepeatable({
            containerId: 'ef-tickets-list',
            dataId: 'ef-tickets-data',
            renderRow: (item, index) => `
                <div class="ef-ticket-row" style="display:flex;align-items:center;gap:10px;background:#f9f9f9;padding:8px 12px;border-radius:10px;margin-bottom:6px;border:1px solid #eee;">
                    <div style="flex:1;">
                        <div style="font-weight:700;font-size:0.85rem;">${item.name}</div>
                        <div style="font-size:0.75rem;color:#666;">P${item.price} · Qty: ${item.quantity || 'unlimited'}</div>
                    </div>
                    <span style="color:#e53935;cursor:pointer;font-weight:700;font-size:1.2rem;padding:4px;" onclick="window.EventForm._removeTicket(${index})">×</span>
                </div>`,
            onEmpty: () => `<div style="padding:16px;text-align:center;color:#aaa;font-size:0.8rem;border:1px dashed #ddd;border-radius:10px;">No ticket tiers added.</div>`
        });

        _logisticsMgr = window.FormHelpers.createRepeatable({
            containerId: 'ef-logistics-list',
            dataId: 'ef-logistics-data',
            renderRow: (item, index) => `
                <div class="ef-logistics-row" style="display:flex;align-items:center;gap:10px;background:#f9f9f9;padding:8px 12px;border-radius:10px;margin-bottom:6px;border:1px solid #eee;">
                    <div style="flex:1;">
                        <div style="font-weight:700;font-size:0.85rem;">${item.title}</div>
                        <div style="font-size:0.75rem;color:#666;">Type: ${item.type}</div>
                    </div>
                    <span style="color:#e53935;cursor:pointer;font-weight:700;font-size:1.2rem;padding:4px;" onclick="window.EventForm._removeLogistics(${index})">×</span>
                </div>`,
            onEmpty: () => `<div style="padding:16px;text-align:center;color:#aaa;font-size:0.8rem;border:1px dashed #ddd;border-radius:10px;">No tasks or items listed.</div>`
        });
    }

    function _removeTicket(index) { if (_ticketsMgr) _ticketsMgr.remove(index); }
    function _removeLogistics(index) { if (_logisticsMgr) _logisticsMgr.remove(index); }

    function _openAddTicketModal() {
        const modalId = 'ef-ticket-modal';
        let modal = document.getElementById(modalId);
        if (modal) modal.remove();

        modal = document.createElement('div');
        modal.id = modalId;
        modal.style.cssText = `position:fixed;inset:0;z-index:200005;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;padding:20px;`;
        modal.innerHTML = `
            <div style="background:#fff;border-radius:16px;width:100%;max-width:340px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.3);">
                <div style="padding:16px;border-bottom:1px solid #f0f0f0;display:flex;justify-content:space-between;align-items:center;background:#f8f9fa;">
                    <h3 style="margin:0;font-size:0.95rem;font-weight:700;">Add Ticket Tier</h3>
                    <span style="cursor:pointer;font-size:1.4rem;color:#888;" id="eftk-close">×</span>
                </div>
                <div style="padding:20px;">
                    <label class="ef-label">Tier Name</label>
                    <input type="text" id="eftk-name" class="ef-input" placeholder="e.g. Early Bird, VIP">
                    
                    <label class="ef-label" style="margin-top:12px;">Price (BWP)</label>
                    <input type="number" id="eftk-price" class="ef-input" value="10" min="0">

                    <label class="ef-label" style="margin-top:12px;">Quantity Available (Optional)</label>
                    <input type="number" id="eftk-qty" class="ef-input" placeholder="unlimited" min="1">
                </div>
                <div style="padding:16px;display:flex;gap:10px;background:#f8f9fa;">
                    <button id="eftk-cancel" style="flex:1;padding:12px;background:#fff;border:1px solid #dadce0;border-radius:10px;font-weight:600;cursor:pointer;">Cancel</button>
                    <button id="eftk-add" style="flex:1;padding:12px;background:#1a73e8;color:#fff;border:none;border-radius:10px;font-weight:600;cursor:pointer;">Add</button>
                </div>
            </div>`;
        document.body.appendChild(modal);

        document.getElementById('eftk-close').onclick = () => modal.remove();
        document.getElementById('eftk-cancel').onclick = () => modal.remove();
        document.getElementById('eftk-add').onclick = () => {
            const name = document.getElementById('eftk-name').value.trim();
            if (!name) { _showToast('Name is required', 'error'); return; }
            const price = parseFloat(document.getElementById('eftk-price').value) || 0;
            const qty = parseInt(document.getElementById('eftk-qty').value) || null;
            if (_ticketsMgr) _ticketsMgr.add({ name, price, quantity: qty });
            modal.remove();
        };
    }

    function _openAddLogisticsModal() {
        const modalId = 'ef-log-modal';
        let modal = document.getElementById(modalId);
        if (modal) modal.remove();

        modal = document.createElement('div');
        modal.id = modalId;
        modal.style.cssText = `position:fixed;inset:0;z-index:200005;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;padding:20px;`;
        modal.innerHTML = `
            <div style="background:#fff;border-radius:16px;width:100%;max-width:340px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.3);">
                <div style="padding:16px;border-bottom:1px solid #f0f0f0;display:flex;justify-content:space-between;align-items:center;background:#f8f9fa;">
                    <h3 style="margin:0;font-size:0.95rem;font-weight:700;">Add Logistic Task/Item</h3>
                    <span style="cursor:pointer;font-size:1.4rem;color:#888;" id="eflg-close">×</span>
                </div>
                <div style="padding:20px;">
                    <label class="ef-label">Title</label>
                    <input type="text" id="eflg-title" class="ef-input" placeholder="e.g. Set up cones, Bring water">
                    
                    <label class="ef-label" style="margin-top:12px;">Type</label>
                    <select id="eflg-type" class="ef-input">
                        <option>Equipment</option>
                        <option>Volunteer Task</option>
                        <option>Admin Duty</option>
                        <option>Security</option>
                        <option>Other</option>
                    </select>
                </div>
                <div style="padding:16px;display:flex;gap:10px;background:#f8f9fa;">
                    <button id="eflg-cancel" style="flex:1;padding:12px;background:#fff;border:1px solid #dadce0;border-radius:10px;font-weight:600;cursor:pointer;">Cancel</button>
                    <button id="eflg-add" style="flex:1;padding:12px;background:#1a73e8;color:#fff;border:none;border-radius:10px;font-weight:600;cursor:pointer;">Add</button>
                </div>
            </div>`;
        document.body.appendChild(modal);

        document.getElementById('eflg-close').onclick = () => modal.remove();
        document.getElementById('eflg-cancel').onclick = () => modal.remove();
        document.getElementById('eflg-add').onclick = () => {
            const title = document.getElementById('eflg-title').value.trim();
            if (!title) { _showToast('Title is required', 'error'); return; }
            const type = document.getElementById('eflg-type').value;
            if (_logisticsMgr) _logisticsMgr.add({ title, type });
            modal.remove();
        };
    }

    // ─────────────────────────────────────────────────────────────────────────
    // COVER PHOTO
    // ─────────────────────────────────────────────────────────────────────────

    function _pickCover() { document.getElementById('ef-cover-input')?.click(); }

    function _previewCover(input) {
        const file = input.files[0];
        if (!file) return;
        // 5MB limit
        if (file.size > 5 * 1024 * 1024) { _showToast('Image must be under 5 MB', 'error'); return; }
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.getElementById('ef-cover-img');
            const wrap = document.getElementById('ef-cover-preview');
            if (img) img.src = e.target.result;
            if (wrap) wrap.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // LINKED ENTITY SEARCH HELPERS
    // ─────────────────────────────────────────────────────────────────────────

    async function _searchStoreByName(storeName, query, displayId, hiddenId, labelField) {
        const resultsEl = document.getElementById(displayId);
        if (!query || query.length < 2) { resultsEl.style.display = 'none'; return; }
        try {
            const all = await window.mizanoStorage.performTransaction(storeName, 'readonly', s => s.getAll());
            const q = query.toLowerCase();
            const matches = (all || []).filter(r =>
                (r[labelField] || '').toLowerCase().includes(q)
            ).slice(0, 6);
            if (!matches.length) { resultsEl.style.display = 'none'; return; }
            resultsEl.style.display = 'block';
            resultsEl.innerHTML = matches.map(r => `
                <div class="ef-dropdown-item"
                    onclick="window.EventForm._pickLinked('${displayId}','${hiddenId}','${r.local_id}','${_safeAttr(r[labelField])}')">
                    ${r[labelField]}
                </div>`).join('');
        } catch { return; }
    }

    function _searchOrganiser(q) { _searchStoreByName('groups', q, 'ef-organiser-results', 'ef-organiser-id', 'name'); }
    function _searchGroups(q) { _searchStoreByName('groups', q, 'ef-group-results', 'ef-group-id', 'name'); }
    function _searchAssociations(q) { _searchStoreByName('associations', q, 'ef-assoc-results', 'ef-assoc-id', 'name'); }
    async function _searchSponsors(q) {
        const resultsEl = document.getElementById('ef-sponsor-results');
        if (!q || q.length < 2) { resultsEl.style.display = 'none'; return; }
        try {
            const all = await window.mizanoStorage.performTransaction('businesses', 'readonly', s => s.getAll());
            const matches = (all || []).filter(b => (b.name || '').toLowerCase().includes(q.toLowerCase())).slice(0, 6);
            if (!matches.length) { resultsEl.style.display = 'none'; return; }
            resultsEl.style.display = 'block';
            resultsEl.innerHTML = matches.map(b => `
                <div class="ef-dropdown-item"
                    onclick="window.EventForm._addSponsor(${b.local_id},'${_safeAttr(b.name)}')">
                    ${b.name}
                </div>`).join('');
        } catch { }
    }

    function _pickLinked(displayId, hiddenId, id, name) {
        // For most single-selects
        const resultsEl = document.getElementById(displayId);
        const hiddenEl = document.getElementById(hiddenId);
        if (resultsEl) resultsEl.style.display = 'none';
        if (hiddenEl) hiddenEl.value = id;
        // Update the input text
        const inputId = displayId.replace('-results', '-search').replace('-organiser-results', '-organiser-override');
        const inputEl = document.getElementById(inputId);
        if (inputEl) inputEl.value = name;
    }

    function _addSponsor(id, name) {
        const list = document.getElementById('ef-sponsors-list');
        const idsEl = document.getElementById('ef-sponsor-ids');
        const results = document.getElementById('ef-sponsor-results');
        if (results) results.style.display = 'none';
        if (!list) return;

        // Prevent duplicates
        if (list.querySelector(`[data-sponsor-id="${id}"]`)) return;

        const existing = JSON.parse(idsEl?.value || '[]');
        existing.push(id);
        if (idsEl) idsEl.value = JSON.stringify(existing);

        const chip = document.createElement('span');
        chip.dataset.sponsorId = id;
        chip.style.cssText = 'background:#e8f0fe;color:#1a73e8;border-radius:12px;padding:4px 10px;font-size:0.78rem;display:inline-flex;align-items:center;gap:6px;';
        chip.innerHTML = `${name} <span onclick="window.EventForm._removeSponsor(${id})" style="cursor:pointer;font-weight:700;color:#e53935;">×</span>`;
        list.appendChild(chip);
    }

    function _removeSponsor(id) {
        const list = document.getElementById('ef-sponsors-list');
        const idsEl = document.getElementById('ef-sponsor-ids');
        if (!list) return;
        list.querySelector(`[data-sponsor-id="${id}"]`)?.remove();
        const existing = JSON.parse(idsEl?.value || '[]').filter(i => i !== id);
        if (idsEl) idsEl.value = JSON.stringify(existing);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // REFEREE
    // ─────────────────────────────────────────────────────────────────────────

    function _toggleReferee(on) {
        const fields = document.getElementById('ef-referee-fields');
        if (fields) fields.style.display = on ? 'block' : 'none';
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SUBMIT
    // ─────────────────────────────────────────────────────────────────────────

    async function _submit() {
        // Demo mode guard
        if (window.MizanoAuth?.isDemo?.()) {
            window.ProfilePanel?._showSignUpModal();
            return;
        }

        const errors = _validate();
        if (errors.length) { _showToast(errors[0], 'error'); return; }

        const userId = _getUserId();
        const now = Date.now();
        const sport = document.getElementById('ef-sport')?.value || '';
        const city = (document.getElementById('ef-city')?.value || document.getElementById('ef-venue-search')?.value || '').trim();
        const sportSlug = sport.toLowerCase().replace(/\s+/g, '_');
        const areaCode = city.slice(0, 3).toUpperCase() || 'GEN';

        const isFree = document.getElementById('ef-free-toggle')?.checked ?? true;
        const recurring = document.querySelector('.ef-recur-btn[data-recur].active')?.dataset.recur || 'One-off';

        const record = {
            event_id: `EVT-${sportSlug}-${areaCode}-${now}`,
            organizer_uid: document.getElementById('ef-organiser-id')?.value || userId,
            name: document.getElementById('ef-name')?.value.trim(),
            event_type: document.getElementById('ef-type')?.value,
            sport,
            start_date: document.getElementById('ef-start-date')?.value,
            start_time: document.getElementById('ef-start-time')?.value,
            end_time: document.getElementById('ef-end-time')?.value,
            recurring,
            recur_until: document.getElementById('ef-recur-until')?.value || null,
            venue_id: document.getElementById('ef-venue-id')?.value || null,
            city,
            area: document.getElementById('ef-area')?.value || '',
            meeting_note: document.getElementById('ef-meeting-note')?.value.trim() || '',
            access_level: document.getElementById('ef-access')?.value,
            age_category: document.getElementById('ef-age-cat')?.value,
            gender_category: document.getElementById('ef-gender-cat')?.value,
            format: document.getElementById('ef-format')?.value || 'Team-based',
            max_participants: parseInt(document.getElementById('ef-max-participants')?.value) || 0,
            
            is_free: isFree,
            tickets: isFree ? [] : JSON.parse(document.getElementById('ef-tickets-data')?.value || '[]'),
            logistics: JSON.parse(document.getElementById('ef-logistics-data')?.value || '[]'),

            description: document.getElementById('ef-description')?.value.trim() || '',
            prizes: document.getElementById('ef-prizes')?.value.trim() || '',
            cover_photo: document.getElementById('ef-cover-img')?.src || null,
            group_id: document.getElementById('ef-group-id')?.value || null,
            association_id: document.getElementById('ef-assoc-id')?.value || null,
            sponsor_ids: JSON.parse(document.getElementById('ef-sponsor-ids')?.value || '[]'),
            needs_referee: document.getElementById('ef-referee-toggle')?.checked ?? false,
            referee_name: document.getElementById('ef-referee-name')?.value.trim() || '',
            referee_phone: document.getElementById('ef-referee-phone')?.value.trim() || '',
            status: 'upcoming',
            experience_type: null   // set by determineExperienceType below
        };

        try {
            const localId = await window.mizanoStorage.saveEntity('activities', record);
            // Post-save: determine experience type per EVENT_GENERATION_LOGIC.md
            const expType = _determineExperienceType(record);
            await window.mizanoStorage.updateEntity('activities', localId, { experience_type: expType });

            _showToast('Event created! 🎉');
            setTimeout(() => {
                window.MizanoNav?.closeOverlay('builder');
                window.MyEvents?.refresh?.();
            }, 1000);
        } catch (e) {
            console.error('EventForm: save failed', e);
            _showToast('Save failed — please try again', 'error');
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // DETERMINE EXPERIENCE TYPE (EVENT_GENERATION_LOGIC.md logic)
    // ─────────────────────────────────────────────────────────────────────────

    function _determineExperienceType(record) {
        const type = (record.event_type || '').toLowerCase();
        const sport = (record.sport || '').toLowerCase();

        if (type.includes('tournament')) return 'competitive';
        if (type.includes('match')) return 'competitive';
        if (type.includes('fixture')) return 'school_fixture';
        if (type.includes('training')) return 'training';
        if (type.includes('workshop')) return 'development';
        if (type.includes('social')) return 'social';
        if (type.includes('corporate')) return 'corporate';
        if (type.includes('open day')) return 'community';
        if (type.includes('friendly')) return 'social';
        if (['chess', 'table tennis', 'golf'].includes(sport)) return 'leisure';
        return 'casual';
    }

    // ─────────────────────────────────────────────────────────────────────────
    // VALIDATION
    // ─────────────────────────────────────────────────────────────────────────

    function _validate() {
        const errors = [];
        const get = id => (document.getElementById(id)?.value || '').trim();

        if (!get('ef-name')) errors.push('Event name is required.');
        if (!get('ef-type')) errors.push('Event type is required.');
        if (!get('ef-sport')) errors.push('Sport or activity is required.');
        if (!get('ef-start-date')) errors.push('Start date is required.');
        if (!get('ef-access')) errors.push('Access level is required.');

        const recurring = document.querySelector('.ef-recur-btn[data-recur].active')?.dataset.recur;
        if (recurring && recurring !== 'One-off' && !get('ef-recur-until')) {
            errors.push('"Repeat until" date is required for recurring events.');
        }

        const isFree = document.getElementById('ef-free-toggle')?.checked ?? true;
        if (!isFree && !get('ef-fee-amount')) {
            errors.push('Please enter the entry fee amount in BWP.');
        }

        return errors;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // HELPERS
    // ─────────────────────────────────────────────────────────────────────────

    function _charCount(input, countId, max) {
        const el = document.getElementById(countId);
        if (el) el.textContent = `${input.value.length} / ${max}`;
    }

    function _timeOptions() {
        const opts = [];
        for (let h = 5; h < 24; h++) {
            for (const m of [0, 15, 30, 45]) {
                const hStr = String(h).padStart(2, '0');
                const mStr = String(m).padStart(2, '0');
                const ampm = h < 12 ? 'AM' : 'PM';
                const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
                opts.push(`<option value="${hStr}:${mStr}">${h12}:${mStr} ${ampm}</option>`);
            }
        }
        return opts.join('');
    }

    function _today() { return new Date().toISOString().split('T')[0]; }

    function _cityOptions() {
        const cities = window.MIZANO_SETTLEMENTS || [
            'Gaborone', 'Francistown', 'Maun', 'Selebi Phikwe', 'Lobatse',
            'Serowe', 'Palapye', 'Molepolole', 'Kanye', 'Mochudi',
            'Mahalapye', 'Kasane', 'Ghanzi', 'Jwaneng', 'Orapa',
            'Ramotswa', 'Tlokweng', 'Mogoditshane', 'Gabane', 'Thamaga'
        ];
        return cities.map(c => `<option value="${c}">${c}</option>`).join('');
    }

    function _getUserId() {
        return window.MizanoAuth?.getCurrentUserId?.()
            || window.mizanoStorage?.getCurrentUserId?.()
            || localStorage.getItem('currentUser') || 'anon';
    }

    function _safeAttr(v) { return (v || '').replace(/'/g, '&#39;'); }

    function _showToast(msg, type = 'success') {
        if (window.FormHelpers) window.FormHelpers.showToast(msg, type);
        else {
            let t = document.getElementById('ef-toast');
            if (!t) { t = document.createElement('div'); t.id = 'ef-toast'; document.body.appendChild(t); }
            t.style.cssText = `position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:99999;
                background:${type === 'error' ? '#e53935' : '#323232'};color:#fff;
                padding:10px 20px;border-radius:8px;font-size:0.85rem;font-weight:500;
                white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.3);pointer-events:none;`;
            t.textContent = msg; t.style.display = 'block';
            clearTimeout(t._t); t._t = setTimeout(() => { t.style.display = 'none'; }, 3000);
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // STYLES (inline — no new CSS file per rule)
    // ─────────────────────────────────────────────────────────────────────────

    function _styles() {
        if (document.getElementById('event-form-styles')) return '';
        return `<style id="event-form-styles">
            .ef-section { background:#fff; border-bottom:1px solid #f0f0f0; }
            .ef-section-hd {
                display:flex; align-items:center; justify-content:space-between;
                padding:14px 16px; cursor:pointer; user-select:none;
            }
            .ef-sec-title { font-weight:600; font-size:0.88rem; color:#1a1a1a; }
            .ef-arrow { font-size:1rem; color:#aaa; }
            .ef-section-body { padding:4px 16px 16px; }
            .ef-label { display:block; font-size:0.78rem; color:#555; font-weight:600; margin-bottom:4px; margin-top:2px; }
            .ef-input {
                width:100%; padding:11px 12px; border:1px solid #dadce0; border-radius:8px;
                font-size:0.88rem; box-sizing:border-box; font-family:inherit; outline:none;
                background:#fff; transition:border-color 0.2s;
            }
            .ef-input:focus { border-color:#1a73e8; }
            .ef-textarea { min-height:80px; resize:vertical; }
            .ef-req { color:#e53935; }
            .ef-hint { font-size:0.75rem; color:#888; }
            .ef-dropdown-list {
                border:1px solid #dadce0; border-radius:8px; max-height:160px;
                overflow-y:auto; background:#fff; margin-top:4px;
                box-shadow:0 2px 8px rgba(0,0,0,0.1); z-index:50; position:relative;
            }
            .ef-dropdown-item {
                padding:10px 14px; font-size:0.85rem; cursor:pointer; border-bottom:1px solid #f5f5f5;
            }
            .ef-dropdown-item:hover { background:#f5f7ff; }
            .ef-recur-btn {
                flex:1; padding:9px 8px; border:2px solid #dadce0; border-radius:8px;
                background:#fff; cursor:pointer; font-size:0.8rem; font-weight:600;
                font-family:inherit; transition:all 0.15s;
            }
            .ef-recur-btn.active { border-color:#1a73e8; background:#e8f0fe; color:#1a73e8; }
            .ef-secondary-btn {
                background:#f1f3f4; border:none; border-radius:8px;
                padding:9px 16px; font-size:0.82rem; cursor:pointer; font-family:inherit;
            }
            .ef-submit-btn {
                width:100%; padding:14px; background:#1a73e8; color:#fff;
                border:none; border-radius:10px; font-size:0.95rem;
                font-weight:700; cursor:pointer; font-family:inherit;
            }
            .ef-submit-btn:active { background:#1557b0; }
            .ef-toggle-wrap { position:relative; display:inline-block; width:44px; height:24px; flex-shrink:0; }
            .ef-toggle-wrap input { opacity:0; width:0; height:0; }
            .ef-toggle-slider {
                position:absolute; cursor:pointer; inset:0;
                background:#ccc; border-radius:24px; transition:background 0.2s;
            }
            .ef-toggle-slider:before {
                content:''; position:absolute; width:18px; height:18px;
                left:3px; top:3px; background:#fff; border-radius:50%;
                transition:transform 0.2s;
            }
            .ef-toggle-wrap input:checked + .ef-toggle-slider { background:#1a73e8; }
            .ef-toggle-wrap input:checked + .ef-toggle-slider:before { transform:translateX(20px); }
        </style>`;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PUBLIC API
    // ─────────────────────────────────────────────────────────────────────────

    return {
        render, init,
        _charCount, _filterSports, _showSportList, _selectSport,
        _onDateChange, _suggestEndTime, _selectRecur, _showNextDates,
        _toggleVenueMode, _searchVenues, _selectVenue, _loadAreas,
        _selectFormat, _toggleFee, _pickCover, _previewCover,
        _searchOrganiser, _searchGroups, _searchAssociations,
        _searchSponsors, _addSponsor, _removeSponsor, _pickLinked,
        _toggleReferee, _submit, _removeSponsor,
        _openAddTicketModal, _removeTicket, _openAddLogisticsModal, _removeLogistics
    };

})();
