/**
 * MIZANO — BusinessForm.js (Session 9)
 * Applied Android Studio Otter Pipeline standards.
 *
 * BusinessForm.render() → HTML string injected by AddActionRouter.openForm('business')
 * On submit → window.mizanoStorage.saveEntity('businesses', record)
 * Creator is automatically added as Owner.
 * Includes operating hours matrix, service chips, corporate/sponsorship toggles, and photo gallery.
 *
 * Save to: Mizano\BusinessForm.js
 */

window.BusinessForm = (function () {

    const BIZ_TYPES = [
        'Sports Shop', 'Gym', 'Coaching Service', 'Corporate (Tournament Entry)',
        'Clinic', 'Physiotherapy', 'Equipment Hire', 'Event Venue',
        'Hospitality', 'Media', 'Catering', 'Other'
    ];

    const SERVICES = [
        'Retail', 'Wholesale', 'Personal Training', 'Group Classes',
        'Sports Massage', 'Injury Rehab', 'Nutrition Plans', 'Custom Kits/Apparel',
        'Trophy Engraving', 'Event Management', 'Photography', 'Videography',
        'Transport', 'Field Maintenance', 'Dietary Supplements'
    ];

    const SPORTS = [
        'Soccer', 'Netball', 'Basketball', 'Athletics', 'Swimming', 'Tennis',
        'Cricket', 'Rugby', 'Chess', 'Cycling', 'Volleyball', 'Badminton',
        'Table Tennis', 'Golf', 'Martial Arts', 'Boxing', 'Dance', 'Gymnastics',
        'Hockey', 'Softball', 'Baseball', 'Triathlon', 'Hiking', 'Squash'
    ];

    const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const ROLES = ['Owner', 'Co-Admin (full edit)', 'Co-Admin (view only)'];

    // ─────────────────────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────────────────────

    function render() {
        return `
        <div id="biz-form-wrap" style="padding:16px 0 100px;font-family:inherit;">
            ${_styles()}

            <!-- ── SECTION 1: BUSINESS IDENTITY ───────────────────────── -->
            <div class="bf-section">
                <div class="bf-section-hd collapsible-header bf-open" data-sec="identity">
                    <span class="bf-sec-title"><span class="bf-req">*</span> Business Identity</span>
                    <span class="collapsible-arrow bf-arrow">⌄</span>
                </div>
                <div class="bf-section-body" id="sec-identity">
                    <label class="bf-label">Business Name <span class="bf-req">*</span></label>
                    <input type="text" id="bf-name" class="bf-input" required placeholder="e.g. Gaborone Sports Emporium">

                    <label class="bf-label" style="margin-top:10px;">Business Type <span class="bf-req">*</span></label>
                    <select id="bf-type" class="bf-input" required>
                        <option value="">Select type…</option>
                        ${BIZ_TYPES.map(t => `<option>${t}</option>`).join('')}
                    </select>

                    <label class="bf-label" style="margin-top:10px;">Business Logo</label>
                    <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
                        <div id="bf-logo-preview" style="width:64px;height:64px;border-radius:12px;background:#e8eaed;
                            display:flex;align-items:center;justify-content:center;font-size:2rem;overflow:hidden;">💼</div>
                        <button type="button" class="bf-secondary-btn" onclick="document.getElementById('bf-logo-input').click()">Upload Logo</button>
                    </div>
                    <input type="file" id="bf-logo-input" accept="image/*" style="display:none;" onchange="window.BusinessForm._previewLogo(this)">

                    <label class="bf-label" style="margin-top:10px;">Tagline (Optional)</label>
                    <input type="text" id="bf-tagline" class="bf-input" placeholder="e.g. Botswana's leading sports equipment supplier" maxlength="100">

                    <label class="bf-label" style="margin-top:10px;">Full Description / About</label>
                    <textarea id="bf-bio" class="bf-input bf-textarea" placeholder="Your story, values, what you offer..."></textarea>
                </div>
            </div>

            <!-- ── SECTION 2: LOCATION & HOURS ────────────────────────── -->
            <div class="bf-section">
                <div class="bf-section-hd collapsible-header" data-sec="location">
                    <span class="bf-sec-title"><span class="bf-req">*</span> Location &amp; Hours</span>
                    <span class="collapsible-arrow bf-arrow">›</span>
                </div>
                <div class="bf-section-body" id="sec-location" style="display:none;">
                    <label class="bf-label">Physical Address</label>
                    <input type="text" id="bf-address" class="bf-input" placeholder="Street address or location description">

                    <div style="display:flex;gap:10px;margin-top:10px;">
                        <div style="flex:1;">
                            <label class="bf-label">City/Town <span class="bf-req">*</span></label>
                            <select id="bf-city" class="bf-input" required onchange="window.BusinessForm._loadAreas(this.value)">
                                <option value="">Select city…</option>
                                ${_cityOptions()}
                            </select>
                        </div>
                        <div style="flex:1;">
                            <label class="bf-label">Area</label>
                            <select id="bf-area" class="bf-input"><option value="">Select area…</option></select>
                        </div>
                    </div>

                    <label class="bf-label" style="margin-top:10px;">GPS Pin (Optional)</label>
                    <div style="display:flex;gap:6px;">
                        <input type="text" id="bf-lat" class="bf-input" placeholder="Lat" style="flex:1;">
                        <input type="text" id="bf-lng" class="bf-input" placeholder="Long" style="flex:1;">
                        <button type="button" class="bf-secondary-btn" style="width:auto;padding:0 12px;font-size:1.2rem;" onclick="window.BusinessForm._getLocation()" title="Use my location">📍</button>
                    </div>

                    <label class="bf-label" style="margin-top:20px;">Operating Hours</label>
                    <div style="display:flex;justify-content:flex-end;margin-bottom:8px;">
                        <button type="button" class="bf-text-btn" onclick="window.BusinessForm._copyMon()">Copy Mon to all weekdays</button>
                    </div>
                    <div id="bf-hours-matrix" style="background:#f8f9fa;border-radius:8px;padding:8px 12px;border:1px solid #e0e0e0;">
                        ${DAYS.map(d => `
                            <div style="display:flex;align-items:center;padding:6px 0;border-bottom:1px solid #eee;">
                                <div style="width:40px;font-size:0.85rem;font-weight:600;">${d}</div>
                                <label class="bf-toggle-wrap" style="transform:scale(0.8);margin-right:12px;">
                                    <input type="checkbox" id="bf-open-${d}" ${d !== 'Sun' ? 'checked' : ''} onchange="window.BusinessForm._toggleDay('${d}', this.checked)">
                                    <span class="bf-toggle-slider"></span>
                                </label>
                                <div id="bf-times-${d}" style="display:${d !== 'Sun' ? 'flex' : 'none'};align-items:center;gap:6px;flex:1;">
                                    <input type="time" id="bf-start-${d}" class="bf-input" style="padding:4px;font-size:0.8rem;" value="08:00">
                                    <span style="font-size:0.8rem;color:#888;">-</span>
                                    <input type="time" id="bf-end-${d}" class="bf-input" style="padding:4px;font-size:0.8rem;" value="17:00">
                                    <label style="font-size:0.75rem;display:flex;align-items:center;gap:4px;margin-left:auto;">
                                        <input type="checkbox" id="bf-24h-${d}" onchange="window.BusinessForm._toggle24h('${d}', this.checked)"> 24h
                                    </label>
                                </div>
                                <div id="bf-closed-${d}" style="display:${d === 'Sun' ? 'block' : 'none'};flex:1;font-size:0.8rem;color:#aaa;font-style:italic;">
                                    Closed
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- ── SECTION 3: CONTACT & DIGITAL PRESENCE ──────────────── -->
            <div class="bf-section">
                <div class="bf-section-hd collapsible-header" data-sec="contact">
                    <span class="bf-sec-title">Contact &amp; Digital</span>
                    <span class="collapsible-arrow bf-arrow">›</span>
                </div>
                <div class="bf-section-body" id="sec-contact" style="display:none;">
                    ${_field('Phone Number (Tap-to-call)', 'bf-phone', 'tel')}
                    ${_field('WhatsApp (+267 format)', 'bf-whatsapp', 'tel')}

                    <label class="bf-label" style="margin-top:10px;">WhatsApp Pre-fill Message (Optional)</label>
                    <textarea id="bf-wa-msg" class="bf-input bf-textarea" placeholder="e.g. Hi, I found you on Mizano and I am interested in..." style="min-height:50px;"></textarea>

                    ${_field('Contact Email', 'bf-email', 'email')}
                    ${_field('Website URL', 'bf-website', 'url')}
                    ${_field('Facebook Page URL', 'bf-fb', 'url')}
                    ${_field('Instagram Handle', 'bf-ig', 'text')}
                    ${_field('X/Twitter Handle', 'bf-x', 'text')}
                    ${_field('TikTok Handle', 'bf-tiktok', 'text')}
                </div>
            </div>

            <!-- ── SECTION 4: SERVICES & INTERESTS ────────────────────── -->
            <div class="bf-section">
                <div class="bf-section-hd collapsible-header" data-sec="services">
                    <span class="bf-sec-title">Services &amp; Interests</span>
                    <span class="collapsible-arrow bf-arrow">›</span>
                </div>
                <div class="bf-section-body" id="sec-services" style="display:none;">
                    <label class="bf-label">Services Offered</label>
                    <div id="bf-service-chips" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
                        ${SERVICES.map(s => `<span class="bf-chip bf-svc-chip" data-val="${s}" onclick="window.BusinessForm._toggleSvcChip(this)">${s}</span>`).join('')}
                    </div>
                    <div style="display:flex;gap:6px;">
                        <input type="text" id="bf-custom-svc" class="bf-input" placeholder="Add custom service..." style="flex:1;">
                        <button type="button" class="bf-secondary-btn" style="width:auto;padding:0 12px;font-size:1.2rem;" onclick="window.BusinessForm._addCustomService()">+</button>
                    </div>

                    <label class="bf-label" style="margin-top:20px;">Associated Sports/Activities</label>
                    <div id="bf-sports-chips" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;">
                        ${SPORTS.map(s => `<span class="bf-chip bf-sport-chip" data-val="${s}" onclick="window.BusinessForm._toggleSportChip(this)">${s}</span>`).join('')}
                    </div>

                    <div style="background:#f4f8fb;border-left:4px solid #1a73e8;padding:12px;border-radius:0 8px 8px 0;margin-bottom:12px;">
                        <div style="display:flex;align-items:center;justify-content:space-between;">
                            <span style="font-size:0.85rem;font-weight:600;color:#1a73e8;">Corporate Tournament Interest</span>
                            <label class="bf-toggle-wrap" style="transform:scale(0.85);">
                                <input type="checkbox" id="bf-corp-toggle" onchange="window.BusinessForm._toggleCorp(this.checked)">
                                <span class="bf-toggle-slider"></span>
                            </label>
                        </div>
                        <p style="font-size:0.75rem;color:#555;margin:4px 0 0;">Toggle ON if you want your business surfaced when organisers search for corporate teams.</p>
                        <div id="bf-corp-link-wrap" style="display:none;margin-top:8px;">
                            <button type="button" class="bf-secondary-btn" style="padding:6px;font-size:0.75rem;background:#fff;border:1px solid #1a73e8;color:#1a73e8;" onclick="window.BusinessForm._openCorpGroup()">+ Create your corporate team</button>
                        </div>
                    </div>

                    <div style="background:#fdf6f2;border-left:4px solid #f29c1f;padding:12px;border-radius:0 8px 8px 0;">
                        <div style="display:flex;align-items:center;justify-content:space-between;">
                            <span style="font-size:0.85rem;font-weight:600;color:#d35400;">Sponsorship Interest</span>
                            <label class="bf-toggle-wrap" style="transform:scale(0.85);">
                                <input type="checkbox" id="bf-sponsor-toggle">
                                <span class="bf-toggle-slider" style="background:#ccc;"></span>
                            </label>
                        </div>
                        <p style="font-size:0.75rem;color:#555;margin:4px 0 0;">Toggle ON to appear in "Available Sponsors" searches by organisers.</p>
                    </div>
                </div>
            </div>

            <!-- ── SECTION 5: TEAM, MEDIA & VERIFICATION ──────────────── -->
            <div class="bf-section" style="border-bottom:none;">
                <div class="bf-section-hd collapsible-header" data-sec="media">
                    <span class="bf-sec-title">Team, Media &amp; Verification</span>
                    <span class="collapsible-arrow bf-arrow">›</span>
                </div>
                <div class="bf-section-body" id="sec-media" style="display:none;">

                    <label class="bf-label">Owner &amp; Co-Admins</label>
                    <div style="display:flex;gap:6px;">
                        <input type="text" id="bf-admin-search" class="bf-input" placeholder="@username or +267..." style="flex:1;">
                        <button type="button" class="bf-submit-btn" style="width:auto;padding:0 16px;" onclick="window.BusinessForm._searchAdmins()">Find</button>
                    </div>
                    <div id="bf-admin-results" class="bf-dropdown-list" style="display:none;position:relative;margin-bottom:8px;"></div>
                    <div id="bf-admins-list" style="margin-top:8px;"></div>
                    <input type="hidden" id="bf-admins-data" value="[]">

                    <label class="bf-label" style="margin-top:20px;">Gallery (Max 5 photos)</label>
                    <div id="bf-photo-grid" style="display:grid;grid-template-columns:repeat(3, 1fr);gap:8px;margin-bottom:6px;">
                        <div class="bf-photo-box" onclick="document.getElementById('bf-photo-input').click()">
                            <span style="font-size:1.5rem;color:#888;">+</span>
                        </div>
                    </div>
                    <input type="hidden" id="bf-photos-data" value="[]">
                    <input type="file" id="bf-photo-input" accept="image/webp, image/jpeg, image/png" style="display:none;" onchange="window.BusinessForm._addPhoto(this)">
                    <p class="bf-hint">Storefront, facilities, products, team...</p>

                    <label class="bf-label" style="margin-top:20px;">Documents (For Verification)</label>
                    <div style="border:1px dashed #ccc;padding:12px;border-radius:8px;background:#fafafa;">
                        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                            <span style="font-size:0.8rem;font-weight:600;">CIPA Registration Cert.</span>
                            <button type="button" class="bf-secondary-btn" style="width:auto;padding:4px 10px;font-size:0.75rem;" onclick="document.getElementById('bf-doc-cipa').click()">Upload</button>
                            <input type="file" id="bf-doc-cipa" accept="image/*,.pdf" style="display:none;" onchange="window.BusinessForm._docUploaded(this, 'cipa-status')">
                        </div>
                        <div id="cipa-status" style="font-size:0.7rem;color:#1a73e8;display:none;">✓ File selected</div>

                        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px;">
                            <span style="font-size:0.8rem;font-weight:600;">Non-Profit Reg. (if applied)</span>
                            <button type="button" class="bf-secondary-btn" style="width:auto;padding:4px 10px;font-size:0.75rem;" onclick="document.getElementById('bf-doc-np').click()">Upload</button>
                            <input type="file" id="bf-doc-np" accept="image/*,.pdf" style="display:none;" onchange="window.BusinessForm._docUploaded(this, 'np-status')">
                        </div>
                        <div id="np-status" style="font-size:0.7rem;color:#1a73e8;display:none;">✓ File selected</div>

                        <div style="background:#fff3cd;color:#856404;padding:8px;border-radius:6px;font-size:0.75rem;margin-top:12px;display:flex;align-items:center;gap:6px;">
                            <span>⚠️</span> Verification is required for village market waiver eligibility. Your status will be <b>Pending</b> until reviewed by Mizano admin.
                        </div>
                    </div>
                </div>
            </div>

            <!-- ── FOOTER CTA ─────────────────────────────────────────── -->
            <div style="padding:16px;position:sticky;bottom:0;background:#fff;border-top:1px solid #f0f0f0;z-index:10;">
                <button type="button" class="bf-submit-btn" onclick="window.BusinessForm._submit()">List Business</button>
            </div>
        </div>`;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // LOGO & MEDIA
    // ─────────────────────────────────────────────────────────────────────────

    function _previewLogo(input) {
        const file = input.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) { _showToast('Logo must be under 2 MB', 'error'); return; }
        const r = new FileReader();
        r.onload = ev => {
            document.getElementById('bf-logo-preview').innerHTML = `<img src="${ev.target.result}" style="width:100%;height:100%;object-fit:cover;" id="bf-logo-img">`;
        };
        r.readAsDataURL(file);
    }

    function _addPhoto(input) {
        const file = input.files[0];
        if (!file) return;

        const dataEl = document.getElementById('bf-photos-data');
        let photos = JSON.parse(dataEl.value || '[]');

        if (photos.length >= 5) { _showToast('Maximum 5 photos allowed', 'error'); return; }
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
        const dataEl = document.getElementById('bf-photos-data');
        let photos = JSON.parse(dataEl.value || '[]');
        photos.splice(index, 1);
        dataEl.value = JSON.stringify(photos);
        _renderPhotos();
    }

    function _renderPhotos() {
        const photos = JSON.parse(document.getElementById('bf-photos-data').value || '[]');
        const grid = document.getElementById('bf-photo-grid');

        let html = photos.map((p, i) => `
            <div style="position:relative;width:100%;aspect-ratio:1;border-radius:8px;overflow:hidden;background:#000;">
                <img src="${p}" style="width:100%;height:100%;object-fit:cover;opacity:0.8;">
                <div style="position:absolute;top:4px;right:4px;background:rgba(255,255,255,0.9);color:#e53935;
                    width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;
                    font-size:0.8rem;font-weight:bold;cursor:pointer;" onclick="window.BusinessForm._removePhoto(${i})">×</div>
            </div>
        `).join('');

        if (photos.length < 5) {
            html += `<div class="bf-photo-box" onclick="document.getElementById('bf-photo-input').click()"><span style="font-size:1.5rem;color:#888;">+</span></div>`;
        }
        grid.innerHTML = html;
    }

    function _docUploaded(input, statusId) {
        if (input.files[0]) {
            document.getElementById(statusId).style.display = 'block';
            document.getElementById(statusId).textContent = `✓ ${input.files[0].name}`;
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // LOCATION & HOURS
    // ─────────────────────────────────────────────────────────────────────────

    function _loadAreas(city) {
        const areaEl = document.getElementById('bf-area');
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
                    document.getElementById('bf-lat').value = pos.coords.latitude.toFixed(6);
                    document.getElementById('bf-lng').value = pos.coords.longitude.toFixed(6);
                    _showToast('Location acquired.');
                },
                (err) => { _showToast('GPS access denied or failed.', 'error'); }
            );
        } else { _showToast('Geolocation not supported by browser.', 'error'); }
    }

    function _toggleDay(day, isOpen) {
        document.getElementById(`bf-times-${day}`).style.display = isOpen ? 'flex' : 'none';
        document.getElementById(`bf-closed-${day}`).style.display = isOpen ? 'none' : 'block';
    }

    function _toggle24h(day, is24) {
        const start = document.getElementById(`bf-start-${day}`);
        const end = document.getElementById(`bf-end-${day}`);
        start.disabled = is24;
        end.disabled = is24;
        if (is24) { start.value = '00:00'; end.value = '23:59'; }
    }

    function _copyMon() {
        const isOpen = document.getElementById('bf-open-Mon').checked;
        const start = document.getElementById('bf-start-Mon').value;
        const end = document.getElementById('bf-end-Mon').value;
        const is24 = document.getElementById('bf-24h-Mon').checked;

        ['Tue', 'Wed', 'Thu', 'Fri'].forEach(d => {
            const cb = document.getElementById(`bf-open-${d}`);
            cb.checked = isOpen;
            _toggleDay(d, isOpen);
            if (isOpen) {
                document.getElementById(`bf-start-${d}`).value = start;
                document.getElementById(`bf-end-${d}`).value = end;
                const cb24 = document.getElementById(`bf-24h-${d}`);
                cb24.checked = is24;
                _toggle24h(d, is24);
            }
        });
        _showToast('Monday hours copied to weekdays');
    }

    function _extractHours() {
        const hours = {};
        DAYS.forEach(d => {
            const isOpen = document.getElementById(`bf-open-${d}`).checked;
            if (isOpen) {
                hours[d] = {
                    open: document.getElementById(`bf-start-${d}`).value,
                    close: document.getElementById(`bf-end-${d}`).value,
                    is_24h: document.getElementById(`bf-24h-${d}`).checked
                };
            } else {
                hours[d] = 'Closed';
            }
        });
        return hours;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // CHIPS & TOGGLES
    // ─────────────────────────────────────────────────────────────────────────

    function _toggleSvcChip(el) { _toggleGenericChip(el, '#1a73e8'); }
    function _toggleSportChip(el) { _toggleGenericChip(el, '#34a853'); }

    function _toggleGenericChip(el, activeColor) {
        const active = el.classList.toggle('active');
        el.style.background = active ? activeColor : '#e8eaed';
        el.style.color = active ? '#fff' : '#444';
        el.style.borderColor = active ? activeColor : 'transparent';
    }

    function _addCustomService() {
        const input = document.getElementById('bf-custom-svc');
        const val = input.value.trim();
        if (!val) return;
        const container = document.getElementById('bf-service-chips');
        // create new chip already active
        const chip = document.createElement('span');
        chip.className = 'bf-chip bf-svc-chip active';
        chip.dataset.val = val;
        chip.style.cssText = 'background:#1a73e8;color:#fff;border-color:#1a73e8;';
        chip.textContent = val;
        chip.onclick = function () { window.BusinessForm._toggleSvcChip(this); };
        container.appendChild(chip);
        input.value = '';
    }

    function _toggleCorp(isOn) {
        document.getElementById('bf-corp-link-wrap').style.display = isOn ? 'block' : 'none';
    }

    function _openCorpGroup() {
        if (!document.getElementById('bf-name').value.trim()) {
            _showToast('Please enter a business name first', 'info');
            return;
        }
        // Save business name to localStorage so GroupForm can pick it up if needed
        localStorage.setItem('_mizano_corp_preset_name', document.getElementById('bf-name').value.trim());
        window.AddActionRouter?.openForm('group');
    }

    // ─────────────────────────────────────────────────────────────────────────
    // ADMIN SEARCH
    // ─────────────────────────────────────────────────────────────────────────

    async function _searchAdmins() {
        const q = document.getElementById('bf-admin-search')?.value.toLowerCase().trim();
        const resultsEl = document.getElementById('bf-admin-results');
        if (!q) return;

        try {
            const all = await window.mizanoStorage.performTransaction('users', 'readonly', s => s.getAll());
            const matches = (all || []).filter(u =>
                (u.username || '').toLowerCase().includes(q) || (u.phone || '').includes(q)
            ).slice(0, 5);

            if (!matches.length) { resultsEl.innerHTML = `<div style="padding:10px;text-align:center;color:#888;">No users found.</div>`; }
            else {
                resultsEl.innerHTML = matches.map(u => `
                    <div style="padding:10px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #eee;">
                        <span style="font-size:0.85rem;font-weight:600;">@${u.username || u.first_name}</span>
                        <button class="bf-secondary-btn" style="padding:4px 10px;width:auto;" onclick="window.BusinessForm._addAdmin('${u.cloud_id || u.local_id}','${_safeAttr(u.username || u.first_name)}')">Add</button>
                    </div>`).join('');
            }
            resultsEl.style.display = 'block';
        } catch (e) { }
    }

    function _addAdmin(uid, name) {
        document.getElementById('bf-admin-results').style.display = 'none';
        const dataEl = document.getElementById('bf-admins-data');
        let admins = JSON.parse(dataEl.value || '[]');
        if (admins.find(a => a.uid === uid)) { _showToast('User already added', 'error'); return; }

        admins.push({ uid, name, role: 'Co-Admin (full edit)' });
        dataEl.value = JSON.stringify(admins);
        _renderAdmins();
    }

    function _updateAdminRole(uid, role) {
        const dataEl = document.getElementById('bf-admins-data');
        let admins = JSON.parse(dataEl.value || '[]');
        const idx = admins.findIndex(a => a.uid === uid);
        if (idx > -1) admins[idx].role = role;
        dataEl.value = JSON.stringify(admins);
    }

    function _removeAdmin(uid) {
        const dataEl = document.getElementById('bf-admins-data');
        let admins = JSON.parse(dataEl.value || '[]');
        dataEl.value = JSON.stringify(admins.filter(a => a.uid !== uid));
        _renderAdmins();
    }

    function _renderAdmins() {
        const dataEl = document.getElementById('bf-admins-data');
        const admins = JSON.parse(dataEl.value || '[]');
        const listEl = document.getElementById('bf-admins-list');

        listEl.innerHTML = admins.map(a => `
            <div style="display:flex;align-items:center;justify-content:space-between;background:#f9f9f9;padding:8px;border-radius:6px;border:1px solid #eee;margin-bottom:6px;">
                <span style="font-size:0.85rem;font-weight:600;flex:1;">@${a.name}</span>
                <select class="bf-input" style="width:150px;padding:4px;font-size:0.75rem;margin-right:8px;" onchange="window.BusinessForm._updateAdminRole('${a.uid}', this.value)">
                    ${ROLES.filter(r => r !== 'Owner').map(r => `<option ${a.role === r ? 'selected' : ''}>${r}</option>`).join('')}
                </select>
                <span style="color:#e53935;cursor:pointer;font-weight:700;padding:4px;" onclick="window.BusinessForm._removeAdmin('${a.uid}')">×</span>
            </div>
        `).join('');
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SUBMIT
    // ─────────────────────────────────────────────────────────────────────────

    async function _submit() {
        if (window.MizanoAuth?.isDemo?.()) { window.ProfilePanel?._showSignUpModal(); return; }

        const name = document.getElementById('bf-name').value.trim();
        const type = document.getElementById('bf-type').value;
        const city = document.getElementById('bf-city').value;

        if (!name || !type || !city) { _showToast('Please fill all required (*) fields', 'error'); return; }

        const userId = window.mizanoStorage.getCurrentUserId();
        const now = Date.now();
        const cityCode = city.substring(0, 3).toUpperCase();
        const typeSlug = type.toLowerCase().replace(/\s+/g, '');
        const bizId = `BIZ-${cityCode}-${typeSlug}-${now}`;

        // Get arrays
        const services = Array.from(document.querySelectorAll('.bf-svc-chip.active')).map(c => c.dataset.val);
        const sports = Array.from(document.querySelectorAll('.bf-sport-chip.active')).map(c => c.dataset.val);
        const photos = JSON.parse(document.getElementById('bf-photos-data').value || '[]');

        // Geolocation
        let lat = document.getElementById('bf-lat').value.trim();
        let lng = document.getElementById('bf-lng').value.trim();
        const coords = (lat && lng) ? { lat: parseFloat(lat), lng: parseFloat(lng) } : null;

        // Admins
        let admins = JSON.parse(document.getElementById('bf-admins-data').value || '[]');
        // Creator is Owner
        admins.push({ uid: userId, role: 'Owner', status: 'active', joined_at: new Date().toISOString() });

        const logoImg = document.getElementById('bf-logo-img');
        const cipaFile = document.getElementById('bf-doc-cipa').files[0] ? 'uploaded_dummy_blob' : null;
        const npFile = document.getElementById('bf-doc-np').files[0] ? 'uploaded_dummy_blob' : null;

        const record = {
            business_id: bizId,
            name,
            business_type: type,
            logo_data: logoImg ? logoImg.src : null,
            tagline: document.getElementById('bf-tagline').value.trim(),
            bio: document.getElementById('bf-bio').value.trim(),

            address: document.getElementById('bf-address').value.trim(),
            city,
            area: document.getElementById('bf-area').value,
            location_coords: coords,
            operating_hours: _extractHours(),

            phone: document.getElementById('bf-phone').value.trim(),
            whatsapp: document.getElementById('bf-whatsapp').value.trim(),
            whatsapp_msg: document.getElementById('bf-wa-msg').value.trim(),
            email: document.getElementById('bf-email').value.trim(),
            website: document.getElementById('bf-website').value.trim(),
            facebook: document.getElementById('bf-fb').value.trim(),
            instagram: document.getElementById('bf-ig').value.trim(),
            twitter: document.getElementById('bf-x').value.trim(),
            tiktok: document.getElementById('bf-tiktok').value.trim(),

            services_offered: services,
            sports_associated: sports,
            interest_corporate_tournament: document.getElementById('bf-corp-toggle').checked,
            interest_sponsorship: document.getElementById('bf-sponsor-toggle').checked,

            admins,
            photos, // gallery base64s
            documents: {
                cipa_cert: cipaFile,
                non_profit_cert: npFile
            },
            verified_status: 'Pending Verification'
        };

        try {
            await window.mizanoStorage.saveEntity('businesses', record);
            _showToast('Business listed! It will be verifiable shortly. 💼');
            setTimeout(() => {
                window.MizanoNav?.closeOverlay('builder');
                window.MyBusiness?.refresh?.();
            }, 1000);
        } catch (e) {
            console.error('Biz save failed', e);
            _showToast('Failed to list business.', 'error');
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // HELPERS & STYLES
    // ─────────────────────────────────────────────────────────────────────────

    function _field(label, id, type, required = false, placeholder = '') {
        return `
        <div style="margin-top:10px;">
            <label class="bf-label">${label} ${required ? '<span class="bf-req">*</span>' : ''}</label>
            <input type="${type}" id="${id}" class="bf-input" placeholder="${placeholder}" ${required ? 'required' : ''}>
        </div>`;
    }

    function _showToast(msg, type = 'success') {
        let t = document.getElementById('bf-toast');
        if (!t) { t = document.createElement('div'); t.id = 'bf-toast'; document.body.appendChild(t); }
        t.style.cssText = `position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:99999;
            background:${type === 'error' ? '#e53935' : (type === 'info' ? '#1a73e8' : '#323232')};color:#fff;padding:10px 20px;
            border-radius:8px;font-size:0.85rem;font-weight:500;box-shadow:0 2px 8px rgba(0,0,0,0.3);`;
        t.textContent = msg; t.style.display = 'block';
        clearTimeout(t._t); t._t = setTimeout(() => t.style.display = 'none', 3000);
    }
    function _safeAttr(v) { return (v || '').replace(/'/g, '&#39;'); }

    function _styles() {
        if (document.getElementById('biz-form-styles')) return '';
        return `<style id="biz-form-styles">
            .bf-section { background:#fff; border-bottom:1px solid #f0f0f0; }
            .bf-section-hd { display:flex; align-items:center; justify-content:space-between; padding:14px 16px; cursor:pointer; user-select:none; }
            .bf-sec-title { font-weight:600; font-size:0.88rem; color:#1a1a1a; }
            .bf-arrow { font-size:1rem; color:#aaa; }
            .bf-section-body { padding:4px 16px 16px; }
            .bf-label { display:block; font-size:0.78rem; color:#555; font-weight:600; margin-bottom:4px; margin-top:2px; }
            .bf-input { width:100%; padding:11px 12px; border:1px solid #dadce0; border-radius:8px; font-size:0.88rem; box-sizing:border-box; font-family:inherit; outline:none; transition:border-color 0.2s; }
            .bf-input:disabled { background:#f5f5f5; color:#999; }
            .bf-input:focus { border-color:#1a73e8; }
            .bf-textarea { min-height:80px; resize:vertical; }
            .bf-req { color:#e53935; }
            .bf-hint { font-size:0.75rem; color:#888; }
            .bf-chip { padding:6px 12px; border-radius:16px; font-size:0.75rem; cursor:pointer; background:#e8eaed; color:#444; transition:all 0.15s; user-select:none; border:1px solid transparent; display:inline-block; }
            .bf-dropdown-list { border:1px solid #dadce0; border-radius:8px; max-height:160px; overflow-y:auto; background:#fff; margin-top:4px; box-shadow:0 2px 8px rgba(0,0,0,0.1); position:absolute; left:0; right:0; z-index:50; width:100%; }
            .bf-secondary-btn { background:#f1f3f4; border:none; border-radius:8px; padding:9px 16px; font-size:0.82rem; cursor:pointer; font-family:inherit; width:100%; text-align:center; font-weight:600; }
            .bf-text-btn { background:none; border:none; color:#1a73e8; font-size:0.8rem; font-weight:600; cursor:pointer; padding:4px; }
            .bf-submit-btn { width:100%; padding:14px; background:#1a73e8; color:#fff; border:none; border-radius:10px; font-size:0.95rem; font-weight:700; cursor:pointer; font-family:inherit; }
            .bf-toggle-wrap { position:relative; display:inline-block; width:44px; height:24px; flex-shrink:0; }
            .bf-toggle-wrap input { opacity:0; width:0; height:0; }
            .bf-toggle-slider { position:absolute; cursor:pointer; inset:0; background:#ccc; border-radius:24px; transition:background 0.2s; }
            .bf-toggle-slider:before { content:''; position:absolute; width:18px; height:18px; left:3px; top:3px; background:#fff; border-radius:50%; transition:transform 0.2s; }
            .bf-toggle-wrap input:checked + .bf-toggle-slider { background:#1a73e8; }
            .bf-toggle-wrap input:checked + .bf-toggle-slider:before { transform:translateX(20px); }
            .bf-photo-box { width:100%; aspect-ratio:1; background:#f5f5f5; border:1px dashed #ccc; border-radius:8px; display:flex; align-items:center; justify-content:center; cursor:pointer; }
        </style>`;
    }

    return {
        render,
        _previewLogo, _loadAreas, _getLocation, _toggleDay, _toggle24h, _copyMon,
        _toggleSvcChip, _toggleSportChip, _addCustomService, _toggleCorp, _openCorpGroup,
        _searchAdmins, _addAdmin, _updateAdminRole, _removeAdmin,
        _addPhoto, _removePhoto, _docUploaded, _submit
    };
})();
