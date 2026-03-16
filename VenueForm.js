/**
 * MIZANO — VenueForm.js (Session 8)
 * Applied Android Studio Otter Pipeline standards.
 *
 * VenueForm.render() → HTML string injected by AddActionRouter.openForm('venue')
 * On submit → window.mizanoStorage.saveEntity('venues', record)
 * Creator is automatically recorded as `submitted_by`.
 * Includes bookable toggles, managed_by reference search, geolocation placeholder, and amenities chips.
 *
 * Save to: Mizano\VenueForm.js
 */

window.VenueForm = (function () {

    const VENUE_TYPES = [
        'Football Pitch', 'Netball Court', 'Tennis Court', 'Basketball Court',
        'Athletics Track', 'Swimming Pool', 'Gym', 'Indoor Hall',
        'Multi-purpose Ground', 'Park', 'Beach', 'Other'
    ];

    const SURFACES = [
        'Natural Grass', 'Artificial Turf', 'Tarmac', 'Sand', 'Indoor Wood',
        'Indoor Concrete', 'Clay', 'Rubberized Track', 'Other'
    ];

    const AMENITIES = [
        'Changing Rooms', 'Toilets', 'Parking', 'Floodlights', 'Canteen',
        'Spectator Seating', 'First Aid Kit', 'Security', 'Water Taps',
        'Showers', 'Wi-Fi'
    ];

    const OWNERSHIP = [
        'Government', 'School', 'Private', 'Community Trust', 'Corporate', 'Church', 'Other'
    ];

    // ─────────────────────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────────────────────

    function render() {
        return `
        <div id="venue-form-wrap" style="padding:16px 0 100px;font-family:inherit;">
            ${_styles()}

            <!-- ── SECTION 1: VENUE IDENTITY ──────────────────────────── -->
            <div class="vf-section">
                <div class="vf-section-hd collapsible-header vf-open" data-sec="identity">
                    <span class="vf-sec-title"><span class="vf-req">*</span> Venue Identity</span>
                    <span class="collapsible-arrow vf-arrow">⌄</span>
                </div>
                <div class="vf-section-body" id="sec-identity">
                    <label class="vf-label">Venue Name <span class="vf-req">*</span></label>
                    <input type="text" id="vf-name" class="vf-input" required placeholder="e.g. National Stadium, UB Courts">

                    <label class="vf-label" style="margin-top:10px;">Venue Type <span class="vf-req">*</span></label>
                    <select id="vf-type" class="vf-input" required>
                        <option value="">Select type…</option>
                        ${VENUE_TYPES.map(t => `<option>${t}</option>`).join('')}
                    </select>

                    <label class="vf-label" style="margin-top:10px;">Surface Type</label>
                    <select id="vf-surface" class="vf-input">
                        <option value="">Select surface…</option>
                        ${SURFACES.map(s => `<option>${s}</option>`).join('')}
                    </select>
                </div>
            </div>

            <!-- ── SECTION 2: LOCATION ────────────────────────────────── -->
            <div class="vf-section">
                <div class="vf-section-hd collapsible-header" data-sec="location">
                    <span class="vf-sec-title"><span class="vf-req">*</span> Location</span>
                    <span class="collapsible-arrow vf-arrow">›</span>
                </div>
                <div class="vf-section-body" id="sec-location" style="display:none;">
                    <label class="vf-label">Location Description / Address</label>
                    <textarea id="vf-address" class="vf-input vf-textarea" placeholder="e.g. Behind Gaborone dam, entrance on Notwane Rd" style="min-height:60px;"></textarea>

                    <div style="display:flex;gap:10px;margin-top:10px;">
                        <div style="flex:1;">
                            <label class="vf-label">City/Town <span class="vf-req">*</span></label>
                            <select id="vf-city" class="vf-input" required onchange="window.VenueForm._loadAreas(this.value)">
                                <option value="">Select city…</option>
                                ${_cityOptions()}
                            </select>
                        </div>
                        <div style="flex:1;">
                            <label class="vf-label">Area <span class="vf-req">*</span></label>
                            <select id="vf-area" class="vf-input" required><option value="">Select area…</option></select>
                        </div>
                    </div>

                    <label class="vf-label" style="margin-top:10px;">GPS Coordinates (Optional)</label>
                    <div style="display:flex;gap:6px;">
                        <input type="text" id="vf-lat" class="vf-input" placeholder="Lat" style="flex:1;">
                        <input type="text" id="vf-lng" class="vf-input" placeholder="Long" style="flex:1;">
                        <button type="button" class="vf-secondary-btn" style="width:auto;padding:0 12px;font-size:1.2rem;" onclick="window.VenueForm._getLocation()" title="Use my current location">📍</button>
                    </div>

                    <label class="vf-label" style="margin-top:12px;">Photos (Max 3)</label>
                    <div id="vf-photo-grid" style="display:grid;grid-template-columns:repeat(3, 1fr);gap:8px;margin-bottom:6px;">
                        <div class="vf-photo-box" onclick="document.getElementById('vf-photo-input').click()">
                            <span style="font-size:1.5rem;color:#888;">+</span>
                        </div>
                    </div>
                    <!-- hidden inputs for base64 storage -->
                    <input type="hidden" id="vf-photos-data" value="[]">
                    <input type="file" id="vf-photo-input" accept="image/webp, image/jpeg, image/png" style="display:none;" onchange="window.VenueForm._addPhoto(this)">
                </div>
            </div>

            <!-- ── SECTION 3: FACILITIES & CAPACITY ───────────────────── -->
            <div class="vf-section">
                <div class="vf-section-hd collapsible-header" data-sec="facilities">
                    <span class="vf-sec-title">Facilities &amp; Capacity</span>
                    <span class="collapsible-arrow vf-arrow">›</span>
                </div>
                <div class="vf-section-body" id="sec-facilities" style="display:none;">
                    <div style="display:flex;gap:10px;">
                        <div style="flex:1;">
                            <label class="vf-label">Capacity (Players)</label>
                            <input type="number" id="vf-cap-play" class="vf-input" placeholder="e.g. 22" min="0">
                        </div>
                        <div style="flex:1;">
                            <label class="vf-label">Capacity (Spectators)</label>
                            <input type="number" id="vf-cap-spec" class="vf-input" placeholder="e.g. 500" min="0">
                        </div>
                    </div>

                    <label class="vf-label" style="margin-top:10px;">Amenities</label>
                    <p class="vf-hint" style="margin-top:0;">Select all that apply.</p>
                    <div id="vf-amenties-chips" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
                        ${AMENITIES.map(a => `
                            <span class="vf-chip" data-val="${a}" onclick="window.VenueForm._toggleChip(this)">${a}</span>
                        `).join('')}
                    </div>

                    <label class="vf-label">Ownership Type</label>
                    <select id="vf-owner-type" class="vf-input">
                        <option value="">Select ownership…</option>
                        ${OWNERSHIP.map(o => `<option>${o}</option>`).join('')}
                    </select>
                </div>
            </div>

            <!-- ── SECTION 4: BOOKING & MANAGEMENT ────────────────────── -->
            <div class="vf-section" style="border-bottom:none;">
                <div class="vf-section-hd collapsible-header" data-sec="booking">
                    <span class="vf-sec-title">Booking &amp; Management</span>
                    <span class="collapsible-arrow vf-arrow">›</span>
                </div>
                <div class="vf-section-body" id="sec-booking" style="display:none;">

                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                        <span class="vf-label" style="margin:0;">Is this venue bookable?</span>
                        <label class="vf-toggle-wrap">
                            <input type="checkbox" id="vf-bookable-toggle" onchange="window.VenueForm._toggleBookable(this.checked)">
                            <span class="vf-toggle-slider"></span>
                        </label>
                    </div>

                    <div id="vf-booking-fields" style="display:none;background:#f8f9fa;padding:12px;border-radius:8px;border:1px solid #e0e0e0;margin-bottom:16px;">
                        <label class="vf-label">Booking Contact Name</label>
                        <input type="text" id="vf-book-name" class="vf-input" placeholder="Manager or caretaker name">

                        <label class="vf-label" style="margin-top:10px;">Contact Phone</label>
                        <input type="tel" id="vf-book-phone" class="vf-input" placeholder="+267...">

                        <div style="display:flex;gap:10px;margin-top:10px;">
                            <div style="flex:1;">
                                <label class="vf-label">Booking Fee Model</label>
                                <select id="vf-fee-type" class="vf-input" onchange="window.VenueForm._toggleFeeInput(this.value)">
                                    <option value="Free">Free</option>
                                    <option value="Per session">Per session</option>
                                    <option value="Per hour">Per hour</option>
                                </select>
                            </div>
                            <div style="flex:1;" id="vf-fee-amount-wrap" style="display:none;">
                                <label class="vf-label">Amount (BWP)</label>
                                <input type="number" id="vf-fee-amount" class="vf-input" placeholder="e.g. 150">
                            </div>
                        </div>

                        <label class="vf-label" style="margin-top:10px;">Availability Notes</label>
                        <textarea id="vf-book-notes" class="vf-input vf-textarea" placeholder="e.g. Weekdays only after 4pm, must book 48hrs in advance..." style="min-height:50px;"></textarea>
                    </div>

                    <label class="vf-label">Managed By (Optional)</label>
                    <p class="vf-hint" style="margin-top:0;">Link to an entity that runs this venue.</p>
                    <div style="display:flex;gap:6px;margin-bottom:8px;">
                        <select id="vf-mgr-type" class="vf-input" style="flex:1;max-width:120px;" onchange="window.VenueForm._clearMgr()">
                            <option value="groups">Group</option>
                            <option value="associations">Assoc.</option>
                            <option value="schools">School</option>
                            <option value="businesses">Business</option>
                        </select>
                        <input type="text" id="vf-mgr-search" class="vf-input" placeholder="Search..." oninput="window.VenueForm._searchManager(this.value)" style="flex:2;">
                    </div>
                    <div id="vf-mgr-results" class="vf-dropdown-list" style="display:none;margin-top:-4px;margin-bottom:8px;"></div>
                    <div id="vf-mgr-selected" style="display:none;align-items:center;justify-content:space-between;background:#e8f0fe;padding:8px 12px;border-radius:6px;border:1px solid #1a73e8;">
                        <span id="vf-mgr-name-disp" style="font-size:0.85rem;color:#1a73e8;font-weight:600;"></span>
                        <span style="color:#e53935;cursor:pointer;font-weight:700;padding:4px;" onclick="window.VenueForm._removeMgr()">×</span>
                    </div>
                    <!-- Storage for the linked ref -->
                    <input type="hidden" id="vf-mgr-id">

                </div>
            </div>

            <!-- ── FOOTER CTA ─────────────────────────────────────────── -->
            <div style="padding:16px;position:sticky;bottom:0;background:#fff;border-top:1px solid #f0f0f0;z-index:10;">
                <button type="button" class="vf-submit-btn" onclick="window.VenueForm._submit()">Submit Venue</button>
            </div>
        </div>`;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // LOCATION / PHOTOS
    // ─────────────────────────────────────────────────────────────────────────

    function _loadAreas(city) {
        const areaEl = document.getElementById('vf-area');
        if (!areaEl) return;
        areaEl.innerHTML = '<option value="">Select area…</option>';
        if (window.MIZANO_LOCATIONS?.[city]) {
            window.MIZANO_LOCATIONS[city].forEach(a => areaEl.insertAdjacentHTML('beforeend', `<option value="${a}">${a}</option>`));
        }
    }

    function _cityOptions() {
        const cities = window.MIZANO_SETTLEMENTS || ['Gaborone', 'Francistown', 'Maun', 'Selebi Phikwe', 'Lobatse', 'Serowe', 'Palapye'];
        return cities.map(c => `<option value="${c}">${c}</option>`).join('');
    }

    function _getLocation() {
        if ("geolocation" in navigator) {
            _showToast('Fetching location...', 'info');
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    document.getElementById('vf-lat').value = pos.coords.latitude.toFixed(6);
                    document.getElementById('vf-lng').value = pos.coords.longitude.toFixed(6);
                    _showToast('Location acquired.');
                },
                (err) => { _showToast('GPS access denied or failed.', 'error'); }
            );
        } else {
            _showToast('Geolocation not supported by browser.', 'error');
        }
    }

    function _addPhoto(input) {
        const file = input.files[0];
        if (!file) return;

        const dataEl = document.getElementById('vf-photos-data');
        let photos = JSON.parse(dataEl.value || '[]');

        if (photos.length >= 3) { _showToast('Maximum 3 photos allowed', 'error'); return; }
        if (file.size > 2 * 1024 * 1024) { _showToast('Photo must be under 2 MB', 'error'); return; }

        const r = new FileReader();
        r.onload = ev => {
            photos.push(ev.target.result);
            dataEl.value = JSON.stringify(photos);
            _renderPhotos();
        };
        r.readAsDataURL(file);
    }

    function _removePhoto(index) {
        const dataEl = document.getElementById('vf-photos-data');
        let photos = JSON.parse(dataEl.value || '[]');
        photos.splice(index, 1);
        dataEl.value = JSON.stringify(photos);
        _renderPhotos();
    }

    function _renderPhotos() {
        const photos = JSON.parse(document.getElementById('vf-photos-data').value || '[]');
        const grid = document.getElementById('vf-photo-grid');

        let html = photos.map((p, i) => `
            <div style="position:relative;width:100%;aspect-ratio:1;border-radius:8px;overflow:hidden;background:#000;">
                <img src="${p}" style="width:100%;height:100%;object-fit:cover;opacity:0.8;">
                <div style="position:absolute;top:4px;right:4px;background:rgba(255,255,255,0.9);color:#e53935;
                    width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;
                    font-size:0.8rem;font-weight:bold;cursor:pointer;" onclick="window.VenueForm._removePhoto(${i})">×</div>
            </div>
        `).join('');

        if (photos.length < 3) {
            html += `<div class="vf-photo-box" onclick="document.getElementById('vf-photo-input').click()"><span style="font-size:1.5rem;color:#888;">+</span></div>`;
        }
        grid.innerHTML = html;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // CHIPS & TOGGLES
    // ─────────────────────────────────────────────────────────────────────────

    function _toggleChip(el) {
        const active = el.classList.toggle('active');
        el.style.background = active ? '#1a73e8' : '#e8eaed';
        el.style.color = active ? '#fff' : '#444';
    }

    function _toggleBookable(isBookable) {
        document.getElementById('vf-booking-fields').style.display = isBookable ? 'block' : 'none';
        if (!isBookable) {
            document.getElementById('vf-book-name').value = '';
            document.getElementById('vf-book-phone').value = '';
            document.getElementById('vf-book-notes').value = '';
        }
    }

    function _toggleFeeInput(val) {
        const wrap = document.getElementById('vf-fee-amount-wrap');
        const amt = document.getElementById('vf-fee-amount');
        if (val === 'Free') { wrap.style.display = 'none'; amt.value = ''; }
        else { wrap.style.display = 'block'; }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // MANAGER SEARCH
    // ─────────────────────────────────────────────────────────────────────────

    async function _searchManager(query) {
        const storeType = document.getElementById('vf-mgr-type').value;
        const resultsEl = document.getElementById('vf-mgr-results');
        if (!query || query.length < 2) { resultsEl.style.display = 'none'; return; }

        try {
            const all = await window.mizanoStorage.performTransaction(storeType, 'readonly', s => s.getAll());
            const q = query.toLowerCase();
            const matches = (all || []).filter(i => (i.name || '').toLowerCase().includes(q)).slice(0, 5);

            if (!matches.length) { resultsEl.style.display = 'none'; return; }
            resultsEl.innerHTML = matches.map(m => `
                <div class="vf-dropdown-item" onclick="window.VenueForm._selectMgr('${m.local_id || m.id}','${_safeAttr(m.name)}')">
                    ${m.name}
                </div>`).join('');
            resultsEl.style.display = 'block';
        } catch { resultsEl.style.display = 'none'; }
    }

    function _selectMgr(id, name) {
        document.getElementById('vf-mgr-results').style.display = 'none';
        document.getElementById('vf-mgr-search').style.display = 'none';

        document.getElementById('vf-mgr-id').value = id;
        document.getElementById('vf-mgr-name-disp').textContent = name;
        document.getElementById('vf-mgr-selected').style.display = 'flex';
    }

    function _removeMgr() {
        document.getElementById('vf-mgr-id').value = '';
        document.getElementById('vf-mgr-name-disp').textContent = '';
        document.getElementById('vf-mgr-selected').style.display = 'none';

        const searchInput = document.getElementById('vf-mgr-search');
        searchInput.value = '';
        searchInput.style.display = 'block';
        searchInput.focus();
    }

    function _clearMgr() { _removeMgr(); }

    // ─────────────────────────────────────────────────────────────────────────
    // SUBMIT
    // ─────────────────────────────────────────────────────────────────────────

    async function _submit() {
        if (window.MizanoAuth?.isDemo?.()) { window.ProfilePanel?._showSignUpModal(); return; }

        const name = document.getElementById('vf-name').value.trim();
        const type = document.getElementById('vf-type').value;
        const city = document.getElementById('vf-city').value;
        const area = document.getElementById('vf-area').value;

        if (!name || !type || !city || !area) { _showToast('Please fill all required (*) fields', 'error'); return; }

        const userId = window.mizanoStorage.getCurrentUserId();
        const now = Date.now();
        const cityCode = city.substring(0, 3).toUpperCase();
        const typeSlug = type.toLowerCase().replace(/\s+/g, '');
        const venueId = `VEN-${cityCode}-${typeSlug}-${now}`;

        // Get amenities chips
        const amenities = Array.from(document.querySelectorAll('.vf-chip.active')).map(c => c.dataset.val);

        // Geolocation handles
        let lat = document.getElementById('vf-lat').value.trim();
        let lng = document.getElementById('vf-lng').value.trim();
        const coords = (lat && lng) ? { lat: parseFloat(lat), lng: parseFloat(lng) } : null;

        // Photos payload limit check
        const photos = JSON.parse(document.getElementById('vf-photos-data').value || '[]');

        // Booking data extracted only if bookable
        const isBookable = document.getElementById('vf-bookable-toggle').checked;
        const feeType = document.getElementById('vf-fee-type').value;

        const record = {
            venue_id: venueId,
            name,
            venue_type: type,
            surface_type: document.getElementById('vf-surface').value,

            address: document.getElementById('vf-address').value.trim(),
            city,
            area,
            location_coords: coords,
            photos, // Array of base64 strings

            capacity_players: parseInt(document.getElementById('vf-cap-play').value) || null,
            capacity_spectators: parseInt(document.getElementById('vf-cap-spec').value) || null,
            amenities,
            ownership_type: document.getElementById('vf-owner-type').value,

            is_bookable: isBookable,
            booking_contact_name: isBookable ? document.getElementById('vf-book-name').value.trim() : null,
            booking_phone: isBookable ? document.getElementById('vf-book-phone').value.trim() : null,
            booking_fee_type: isBookable ? feeType : null,
            booking_fee_amount: isBookable && feeType !== 'Free' ? parseFloat(document.getElementById('vf-fee-amount').value) : null,
            booking_notes: isBookable ? document.getElementById('vf-book-notes').value.trim() : null,

            managed_by_store: document.getElementById('vf-mgr-type').value,
            managed_by_id: document.getElementById('vf-mgr-id').value || null,

            submitted_by: userId
        };

        try {
            await window.mizanoStorage.saveEntity('venues', record);
            _showToast('Venue submitted! It will appear publicly soon. 📍');
            setTimeout(() => {
                window.MizanoNav?.closeOverlay('builder');
                window.MyVenues?.refresh?.();
            }, 1000);
        } catch (e) {
            console.error('Venue save failed', e);
            _showToast('Failed to submit venue.', 'error');
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // HELPERS
    // ─────────────────────────────────────────────────────────────────────────

    function _showToast(msg, type = 'success') {
        let t = document.getElementById('vf-toast');
        if (!t) { t = document.createElement('div'); t.id = 'vf-toast'; document.body.appendChild(t); }
        t.style.cssText = `position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:99999;
            background:${type === 'error' ? '#e53935' : (type === 'info' ? '#1a73e8' : '#323232')};color:#fff;padding:10px 20px;
            border-radius:8px;font-size:0.85rem;font-weight:500;box-shadow:0 2px 8px rgba(0,0,0,0.3);`;
        t.textContent = msg; t.style.display = 'block';
        clearTimeout(t._t); t._t = setTimeout(() => t.style.display = 'none', 3000);
    }
    function _safeAttr(v) { return (v || '').replace(/'/g, '&#39;'); }

    // ─────────────────────────────────────────────────────────────────────────
    // STYLES
    // ─────────────────────────────────────────────────────────────────────────

    function _styles() {
        if (document.getElementById('venue-form-styles')) return '';
        return `<style id="venue-form-styles">
            .vf-section { background:#fff; border-bottom:1px solid #f0f0f0; }
            .vf-section-hd { display:flex; align-items:center; justify-content:space-between; padding:14px 16px; cursor:pointer; user-select:none; }
            .vf-sec-title { font-weight:600; font-size:0.88rem; color:#1a1a1a; }
            .vf-arrow { font-size:1rem; color:#aaa; }
            .vf-section-body { padding:4px 16px 16px; }
            .vf-label { display:block; font-size:0.78rem; color:#555; font-weight:600; margin-bottom:4px; margin-top:2px; }
            .vf-input { width:100%; padding:11px 12px; border:1px solid #dadce0; border-radius:8px; font-size:0.88rem; box-sizing:border-box; font-family:inherit; outline:none; transition:border-color 0.2s; }
            .vf-input:focus { border-color:#1a73e8; }
            .vf-textarea { resize:vertical; }
            .vf-req { color:#e53935; }
            .vf-hint { font-size:0.75rem; color:#888; }
            .vf-chip { padding:6px 12px; border-radius:16px; font-size:0.75rem; cursor:pointer; background:#e8eaed; color:#444; transition:all 0.15s; user-select:none; border:1px solid transparent; }
            .vf-dropdown-list { border:1px solid #dadce0; border-radius:8px; max-height:160px; overflow-y:auto; background:#fff; margin-top:4px; box-shadow:0 2px 8px rgba(0,0,0,0.1); position:absolute; left:0; right:0; z-index:50; width:100%; }
            .vf-dropdown-item { padding:10px 14px; font-size:0.85rem; cursor:pointer; border-bottom:1px solid #f5f5f5; }
            .vf-dropdown-item:hover { background:#f5f7ff; }
            .vf-secondary-btn { background:#f1f3f4; border:none; border-radius:8px; padding:9px 16px; font-size:0.82rem; cursor:pointer; font-family:inherit; width:100%; text-align:center; font-weight:600; }
            .vf-submit-btn { width:100%; padding:14px; background:#1a73e8; color:#fff; border:none; border-radius:10px; font-size:0.95rem; font-weight:700; cursor:pointer; font-family:inherit; }
            .vf-toggle-wrap { position:relative; display:inline-block; width:44px; height:24px; flex-shrink:0; }
            .vf-toggle-wrap input { opacity:0; width:0; height:0; }
            .vf-toggle-slider { position:absolute; cursor:pointer; inset:0; background:#ccc; border-radius:24px; transition:background 0.2s; }
            .vf-toggle-slider:before { content:''; position:absolute; width:18px; height:18px; left:3px; top:3px; background:#fff; border-radius:50%; transition:transform 0.2s; }
            .vf-toggle-wrap input:checked + .vf-toggle-slider { background:#1a73e8; }
            .vf-toggle-wrap input:checked + .vf-toggle-slider:before { transform:translateX(20px); }
            .vf-photo-box { width:100%; aspect-ratio:1; background:#f5f5f5; border:1px dashed #ccc; border-radius:8px; display:flex; align-items:center; justify-content:center; cursor:pointer; }
            /* Fix for position absolute inside relative container */
            #vf-mgr-results { position:static; border:1px solid #dadce0; margin-top:2px; box-shadow:0 2px 4px rgba(0,0,0,0.05); }
        </style>`;
    }

    return {
        render,
        _loadAreas, _getLocation, _addPhoto, _removePhoto, _toggleChip,
        _toggleBookable, _toggleFeeInput, _searchManager, _selectMgr, _removeMgr, _clearMgr,
        _submit
    };
})();
