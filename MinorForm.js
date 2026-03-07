/**
 * MIZANO — MinorForm.js (Session 4)
 * Applied Android Studio Otter Pipeline standards.
 *
 * MinorForm.render() → returns HTML string injected by AddActionRouter.openForm()
 * On submit → window.mizanoStorage.saveEntity('minors', data)
 * Medical/safety fields stored with device_only:true — NEVER in sync payloads.
 *
 * Save to: Mizano\MinorForm.js (project root)
 * Script tag: <script src='./MinorForm.js'></script>  ← Session 4
 */

window.MinorForm = (function () {

    // ─────────────────────────────────────────────────────────────────────────
    // RENDER — returns full form HTML string
    // ─────────────────────────────────────────────────────────────────────────

    function render() {
        return `
        <div id="minor-form-wrap" style="padding:16px 0 100px;font-family:inherit;">
            ${_styles()}

            <!-- ── SECTION 1: GUARDIAN PATH ──────────────────────────── -->
            <div class="mf-section">
                <div class="mf-section-hd collapsible-header mf-open" data-sec="guardian-path">
                    <span class="mf-sec-title">
                        <span class="mf-req-star">*</span> How would you like to add this minor?
                    </span>
                    <span class="collapsible-arrow mf-arrow">⌄</span>
                </div>
                <div class="mf-section-body" id="sec-guardian-path">
                    <div style="display:flex;gap:10px;margin-top:4px;">
                        <button type="button" class="mf-path-btn active" id="path-fill"
                            onclick="window.MinorForm._selectPath('fill')">
                            📝 Fill Profile Now
                            <small>I'll complete the details myself</small>
                        </button>
                        <button type="button" class="mf-path-btn" id="path-invite"
                            onclick="window.MinorForm._selectPath('invite')">
                            📨 Send Invite Link
                            <small>Minor enters their own details</small>
                        </button>
                    </div>
                    <!-- Invite-only fields (hidden by default) -->
                    <div id="invite-only-fields" style="display:none;margin-top:12px;">
                        ${_field('Minor\'s First Name', 'invite-minor-name', 'text', true)}
                        ${_field('Contact Phone (+267...)', 'invite-contact-phone', 'tel', true)}
                        <button type="button" onclick="window.MinorForm._sendInvite()"
                            class="mf-submit-btn" style="margin-top:8px;">
                            Send Invite
                        </button>
                    </div>
                </div>
            </div>

            <!-- ── SECTION 2: RELATIONSHIP ─────────────────────────────── -->
            <div class="mf-section" id="full-form-sections">
                <div class="mf-section-hd collapsible-header" data-sec="relationship">
                    <span class="mf-sec-title">
                        <span class="mf-req-star">*</span> Relationship to Minor
                    </span>
                    <span class="collapsible-arrow mf-arrow">›</span>
                </div>
                <div class="mf-section-body" id="sec-relationship" style="display:none;">
                    <select id="mf-relationship" class="mf-input" required>
                        <option value="">Select relationship…</option>
                        <option>Father</option>
                        <option>Mother</option>
                        <option>Uncle</option>
                        <option>Aunt</option>
                        <option>Legal Guardian</option>
                        <option>Coach</option>
                        <option>School Representative</option>
                        <option>Other</option>
                    </select>
                </div>
            </div>

            <!-- ── SECTION 3: MINOR'S IDENTITY ────────────────────────── -->
            <div class="mf-section">
                <div class="mf-section-hd collapsible-header" data-sec="identity">
                    <span class="mf-sec-title">
                        <span class="mf-req-star">*</span> Minor's Identity
                    </span>
                    <span class="collapsible-arrow mf-arrow">›</span>
                </div>
                <div class="mf-section-body" id="sec-identity" style="display:none;">
                    <div style="display:flex;gap:10px;">
                        ${_field('First Name', 'mf-first-name', 'text', true, 'flex:1')}
                        ${_field('Last Name', 'mf-last-name', 'text', true, 'flex:1')}
                    </div>
                    <div style="margin-top:10px;">
                        <label class="mf-label">Date of Birth <span class="mf-req-star">*</span></label>
                        <input type="date" id="mf-dob" class="mf-input" required
                            max="${_today()}"
                            onchange="window.MinorForm._calcAge(this.value)">
                        <small id="mf-age-display" class="mf-hint"></small>
                    </div>
                    <div style="margin-top:10px;">
                        <label class="mf-label">Gender <span class="mf-req-star">*</span></label>
                        <select id="mf-gender" class="mf-input" required>
                            <option value="">Select gender…</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Prefer not to say</option>
                        </select>
                    </div>
                    <div style="margin-top:10px;">
                        <label class="mf-label">Profile Photo (optional)</label>
                        <div id="mf-avatar-preview" style="width:64px;height:64px;border-radius:50%;
                            background:#e8eaed;display:flex;align-items:center;justify-content:center;
                            font-size:1.6rem;margin-bottom:8px;overflow:hidden;">👶</div>
                        <button type="button" class="mf-secondary-btn" onclick="window.MinorForm._pickPhoto()">
                            Choose Photo
                        </button>
                        <input type="file" id="mf-photo-input" accept="image/*" style="display:none;"
                            onchange="window.MinorForm._previewPhoto(this)">
                    </div>
                </div>
            </div>

            <!-- ── SECTION 4: SCHOOL AND LOCATION ─────────────────────── -->
            <div class="mf-section">
                <div class="mf-section-hd collapsible-header" data-sec="school-location">
                    <span class="mf-sec-title">School &amp; Location</span>
                    <span class="collapsible-arrow mf-arrow">›</span>
                </div>
                <div class="mf-section-body" id="sec-school-location" style="display:none;">
                    <div id="mf-school-wrap" style="margin-bottom:10px;">
                        <label class="mf-label">School</label>
                        <input type="text" id="mf-school-search" class="mf-input"
                            placeholder="Search school name…"
                            oninput="window.MinorForm._searchSchools(this.value)">
                        <div id="mf-school-results" style="display:none;border:1px solid #dadce0;
                            border-radius:8px;margin-top:4px;max-height:150px;overflow-y:auto;"></div>
                        <input type="hidden" id="mf-school-id">
                        <button type="button" class="mf-link-btn" style="margin-top:4px;"
                            onclick="window.MinorForm._toggleCustomSchool()">
                            Not in the list? Enter manually
                        </button>
                        <input type="text" id="mf-school-custom" class="mf-input" style="display:none;margin-top:6px;"
                            placeholder="Enter school name">
                    </div>
                    <div style="margin-bottom:10px;">
                        <label class="mf-label">Grade / Year</label>
                        <select id="mf-grade" class="mf-input">
                            <option value="">Select grade…</option>
                            <option>Pre-school</option>
                            <option>Standard 1</option><option>Standard 2</option>
                            <option>Standard 3</option><option>Standard 4</option>
                            <option>Standard 5</option><option>Standard 6</option>
                            <option>Standard 7</option>
                            <option>Form 1</option><option>Form 2</option>
                            <option>Form 3</option><option>Form 4</option>
                            <option>Form 5</option>
                            <option>Not in school</option>
                        </select>
                    </div>
                    <div style="display:flex;gap:10px;">
                        <div style="flex:1;">
                            <label class="mf-label">Village / Town <span class="mf-req-star">*</span></label>
                            <select id="mf-city" class="mf-input" required
                                onchange="window.MinorForm._loadAreas(this.value)">
                                <option value="">Select city…</option>
                                ${_cityOptions()}
                            </select>
                        </div>
                        <div style="flex:1;">
                            <label class="mf-label">Area / Neighbourhood</label>
                            <select id="mf-area" class="mf-input">
                                <option value="">Select area…</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ── SECTION 5: INTERESTS ────────────────────────────────── -->
            <div class="mf-section">
                <div class="mf-section-hd collapsible-header" data-sec="interests">
                    <span class="mf-sec-title">
                        <span class="mf-req-star">*</span> Sports &amp; Interests
                    </span>
                    <span class="collapsible-arrow mf-arrow">›</span>
                </div>
                <div class="mf-section-body" id="sec-interests" style="display:none;">
                    <p class="mf-hint">Select at least 1 sport or activity.</p>
                    <div id="mf-interests-chips" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:4px;">
                        ${_interestChips()}
                    </div>
                    <p id="mf-interests-error" class="mf-error" style="display:none;">
                        Please select at least one interest.
                    </p>
                </div>
            </div>

            <!-- ── SECTION 6: SAFETY AND MEDICAL (DEVICE ONLY) ──────────── -->
            <div class="mf-section">
                <div class="mf-section-hd collapsible-header" data-sec="medical">
                    <span class="mf-sec-title">🔒 Safety &amp; Medical</span>
                    <span class="collapsible-arrow mf-arrow">›</span>
                </div>
                <div class="mf-section-body" id="sec-medical" style="display:none;">
                    <div class="mf-device-only-notice">
                        🔒 This section is stored on this device only and never shared or synced.
                    </div>
                    ${_field('Emergency Contact Name', 'mf-emerg-name', 'text', false)}
                    ${_field('Emergency Contact Phone (+267)', 'mf-emerg-phone', 'tel', false)}
                    <div style="margin-top:10px;">
                        <label class="mf-label">Medical Notes</label>
                        <textarea id="mf-medical-notes" class="mf-input mf-textarea"
                            placeholder="Allergies, asthma, chronic conditions, medications, dietary restrictions…"></textarea>
                    </div>
                    <div style="margin-top:14px;">
                        <label class="mf-label" style="margin-bottom:8px;display:block;">Visibility Settings</label>
                        ${_toggle('mf-allow-message', 'Allow minor to message other users', false)}
                        ${_toggle('mf-open-scouting', 'Open to scouting — allow coaches to view this profile', false)}
                    </div>
                </div>
            </div>

            <!-- ── SECTION 7: ACCOUNT LINK ─────────────────────────────── -->
            <div class="mf-section">
                <div class="mf-section-hd collapsible-header" data-sec="account-link">
                    <span class="mf-sec-title">Link Existing Account (Optional)</span>
                    <span class="collapsible-arrow mf-arrow">›</span>
                </div>
                <div class="mf-section-body" id="sec-account-link" style="display:none;">
                    ${_field('Minor\'s Mizano Username (if they already have an account)', 'mf-linked-username', 'text', false)}
                    <p class="mf-hint">A link request will be sent to that user for approval.</p>

                    <div style="margin-top:16px;display:flex;align-items:flex-start;gap:10px;">
                        <input type="checkbox" id="mf-consent" style="width:18px;height:18px;flex-shrink:0;margin-top:2px;">
                        <label for="mf-consent" style="font-size:0.82rem;color:#333;line-height:1.5;cursor:pointer;">
                            <span class="mf-req-star">*</span>
                            I confirm I am the parent or legal guardian of this minor and have
                            authority to register them on Mizano.
                        </label>
                    </div>
                    <p id="mf-consent-error" class="mf-error" style="display:none;">
                        You must confirm guardianship to continue.
                    </p>
                </div>
            </div>

            <!-- ── FOOTER CTA ─────────────────────────────────────────── -->
            <div style="padding:16px;position:sticky;bottom:0;background:#fff;
                border-top:1px solid #f0f0f0;z-index:10;">
                <button type="button" id="mf-submit-btn" class="mf-submit-btn"
                    onclick="window.MinorForm._submit()">
                    Save Minor Profile
                </button>
            </div>
        </div>`;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PATH SELECTION — Fill Now vs Invite
    // ─────────────────────────────────────────────────────────────────────────

    function _selectPath(path) {
        const fillBtn = document.getElementById('path-fill');
        const inviteBtn = document.getElementById('path-invite');
        const inviteFields = document.getElementById('invite-only-fields');
        const fullSections = document.getElementById('full-form-sections');

        fillBtn.classList.toggle('active', path === 'fill');
        inviteBtn.classList.toggle('active', path === 'invite');

        if (path === 'invite') {
            inviteFields.style.display = 'block';
            // Hide full-profile sections
            document.querySelectorAll('#minor-form-wrap .mf-section').forEach((s, i) => {
                if (i > 0) s.style.display = (i === 0) ? 'block' : 'none';
            });
            // Only show section 1 and invite fields
            document.querySelectorAll('#minor-form-wrap .mf-section').forEach((s, i) => {
                s.style.display = (i === 0) ? 'block' : 'none';
            });
        } else {
            inviteFields.style.display = 'none';
            document.querySelectorAll('#minor-form-wrap .mf-section').forEach(s => {
                s.style.display = 'block';
            });
        }
    }

    function _sendInvite() {
        const name = (document.getElementById('invite-minor-name')?.value || '').trim();
        const phone = (document.getElementById('invite-contact-phone')?.value || '').trim();

        if (!name) { _markError('invite-minor-name', 'First name is required'); return; }
        if (!phone) { _markError('invite-contact-phone', 'Contact phone is required'); return; }

        const code = _generateCode();
        const userId = _getUserId();
        const now = Date.now();

        const record = {
            minor_first_name: name,
            contact_phone: phone,
            invite_code: code,
            invite_status: 'pending',
            guardian_uid: userId,
            path: 'invite',
            device_only_medical: {}
        };

        window.mizanoStorage.saveEntity('minors', record).then(() => {
            _showToast(`Invite sent. When the minor signs up with code ${code}, you will be linked as their guardian.`);
            setTimeout(() => {
                if (window.MizanoNav) window.MizanoNav.closeOverlay('builder');
            }, 1800);
        }).catch(e => {
            console.error('MinorForm: sendInvite failed', e);
            _showToast('Failed to send invite — please try again', 'error');
        });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PHOTO PICKER
    // ─────────────────────────────────────────────────────────────────────────

    function _pickPhoto() {
        document.getElementById('mf-photo-input')?.click();
    }

    function _previewPhoto(input) {
        const file = input.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.getElementById('mf-avatar-preview');
            if (preview) {
                preview.innerHTML = `<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;">`;
            }
        };
        reader.readAsDataURL(file);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // AGE CALCULATION
    // ─────────────────────────────────────────────────────────────────────────

    function _calcAge(dob) {
        if (!dob) return;
        const birth = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;

        const cat = age < 8 ? 'U8' :
            age < 10 ? 'U10' :
                age < 12 ? 'U12' :
                    age < 14 ? 'U14' :
                        age < 16 ? 'U16' :
                            age < 18 ? 'U18' : 'Senior';

        const display = document.getElementById('mf-age-display');
        if (display) display.textContent = `Age: ${age} years · Category: ${cat}`;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SCHOOL SEARCH
    // ─────────────────────────────────────────────────────────────────────────

    function _searchSchools(query) {
        const resultsEl = document.getElementById('mf-school-results');
        if (!query || query.length < 2) { resultsEl.style.display = 'none'; return; }

        window.mizanoStorage.performTransaction('schools', 'readonly', store => store.getAll()).then(all => {
            const matches = (all || []).filter(s =>
                (s.name || '').toLowerCase().includes(query.toLowerCase())
            ).slice(0, 8);

            if (!matches.length) { resultsEl.style.display = 'none'; return; }
            resultsEl.style.display = 'block';
            resultsEl.innerHTML = matches.map(s => `
                <div onclick="window.MinorForm._selectSchool('${s.id}','${_safeAttr(s.name)}')"
                    style="padding:10px 14px;cursor:pointer;font-size:0.85rem;border-bottom:1px solid #f5f5f5;"
                    onmouseenter="this.style.background='#f5f7ff'"
                    onmouseleave="this.style.background='transparent'">
                    ${s.name}
                </div>`).join('');
        }).catch(() => { resultsEl.style.display = 'none'; });
    }

    function _selectSchool(id, name) {
        document.getElementById('mf-school-id').value = id;
        document.getElementById('mf-school-search').value = name;
        document.getElementById('mf-school-results').style.display = 'none';
    }

    function _toggleCustomSchool() {
        const custom = document.getElementById('mf-school-custom');
        if (custom) custom.style.display = custom.style.display === 'none' ? 'block' : 'none';
    }

    // ─────────────────────────────────────────────────────────────────────────
    // LOCATION CASCADE
    // ─────────────────────────────────────────────────────────────────────────

    function _loadAreas(city) {
        const areaSelect = document.getElementById('mf-area');
        if (!areaSelect) return;
        areaSelect.innerHTML = '<option value="">Select area…</option>';
        if (!city) return;

        // Use signup_locations.js if available
        if (window.MIZANO_LOCATIONS && window.MIZANO_LOCATIONS[city]) {
            window.MIZANO_LOCATIONS[city].forEach(area => {
                areaSelect.insertAdjacentHTML('beforeend', `<option value="${area}">${area}</option>`);
            });
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SUBMIT
    // ─────────────────────────────────────────────────────────────────────────

    function _submit() {
        // Demo mode guard
        if (window.MizanoAuth && window.MizanoAuth.isDemo && window.MizanoAuth.isDemo()) {
            if (window.ProfilePanel) window.ProfilePanel._showSignUpModal();
            return;
        }

        const errors = _validate();
        if (errors.length) {
            _showToast(errors[0], 'error');
            return;
        }

        const userId = _getUserId();
        const now = Date.now();
        const firstName = document.getElementById('mf-first-name')?.value.trim() || '';
        const lastName = document.getElementById('mf-last-name')?.value.trim() || '';
        const dob = document.getElementById('mf-dob')?.value || '';
        const gender = document.getElementById('mf-gender')?.value || '';
        const schoolId = document.getElementById('mf-school-id')?.value || '';
        const schoolCustom = document.getElementById('mf-school-custom')?.value.trim() || '';
        const grade = document.getElementById('mf-grade')?.value || '';
        const city = document.getElementById('mf-city')?.value || '';
        const area = document.getElementById('mf-area')?.value || '';
        const relationship = document.getElementById('mf-relationship')?.value || '';
        const linkedUsername = document.getElementById('mf-linked-username')?.value.trim() || '';

        // Collect interests
        const interests = [];
        document.querySelectorAll('.mf-interest-chip.active').forEach(c => interests.push(c.dataset.sport));

        // Avatar
        const avatarPreview = document.getElementById('mf-avatar-preview');
        const avatarImg = avatarPreview?.querySelector('img');
        const avatar = avatarImg ? avatarImg.src : null;

        // Medical / Safety — DEVICE ONLY, never in sync payload
        const deviceOnlyMedical = {
            device_only: true,
            emerg_name: document.getElementById('mf-emerg-name')?.value.trim() || '',
            emerg_phone: document.getElementById('mf-emerg-phone')?.value.trim() || '',
            medical_notes: document.getElementById('mf-medical-notes')?.value.trim() || '',
            allow_message: document.getElementById('mf-allow-message')?.checked ?? false,
            open_scouting: document.getElementById('mf-open-scouting')?.checked ?? false
        };

        const minorId = `MIN-${userId}-${now}`;

        const record = {
            minor_id: minorId,
            guardian_uid: userId,
            relationship,
            first_name: firstName,
            last_name: lastName,
            display_name: [firstName, lastName].filter(Boolean).join(' '),
            dob,
            gender,
            avatar,
            school_id: schoolId || null,
            school_name: schoolCustom || null,
            grade,
            city,
            area,
            interests,
            linked_username: linkedUsername || null,
            invite_status: 'na',
            path: 'fill',
            device_only_medical: deviceOnlyMedical  // kept local — never in sync
        };

        window.mizanoStorage.saveEntity('minors', record).then(() => {
            _showToast('Minor profile saved ✓');
            setTimeout(() => {
                if (window.MizanoNav) window.MizanoNav.closeOverlay('builder');
                if (window.MyMinors && window.MyMinors.refresh) window.MyMinors.refresh();
            }, 1000);
        }).catch(e => {
            console.error('MinorForm: save failed', e);
            _showToast('Save failed — please try again', 'error');
        });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // VALIDATION
    // ─────────────────────────────────────────────────────────────────────────

    function _validate() {
        const errors = [];
        const get = id => document.getElementById(id)?.value.trim() || '';

        if (!get('mf-relationship')) errors.push('Please select your relationship to the minor.');
        if (!get('mf-first-name')) errors.push('Minor\'s first name is required.');
        if (!get('mf-last-name')) errors.push('Minor\'s last name is required.');
        if (!get('mf-dob')) errors.push('Date of birth is required.');
        if (!get('mf-gender')) errors.push('Gender is required.');
        if (!get('mf-city')) errors.push('Village/Town is required.');

        const interests = document.querySelectorAll('.mf-interest-chip.active');
        if (!interests.length) {
            errors.push('Please select at least one sport or activity.');
            const errEl = document.getElementById('mf-interests-error');
            if (errEl) errEl.style.display = 'block';
        }

        const consent = document.getElementById('mf-consent');
        if (!consent?.checked) {
            errors.push('You must confirm guardianship to continue.');
            const errEl = document.getElementById('mf-consent-error');
            if (errEl) errEl.style.display = 'block';
        }

        return errors;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // HELPERS
    // ─────────────────────────────────────────────────────────────────────────

    function _field(label, id, type, required, wrapStyle = '') {
        const req = required ? '<span class="mf-req-star">*</span>' : '';
        return `
        <div style="margin-top:10px;${wrapStyle}">
            <label class="mf-label">${label} ${req}</label>
            <input type="${type}" id="${id}" class="mf-input"
                placeholder="${label}"
                ${required ? 'required' : ''}>
        </div>`;
    }

    function _toggle(id, label, defaultOn) {
        return `
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
            <span style="font-size:0.83rem;color:#333;flex:1;padding-right:12px;">${label}</span>
            <label class="mf-toggle-wrap">
                <input type="checkbox" id="${id}" ${defaultOn ? 'checked' : ''}>
                <span class="mf-toggle-slider"></span>
            </label>
        </div>`;
    }

    function _interestChips() {
        const sports = ['Soccer', 'Netball', 'Basketball', 'Athletics', 'Swimming',
            'Tennis', 'Cricket', 'Rugby', 'Chess', 'Cycling',
            'Volleyball', 'Badminton', 'Table Tennis', 'Dance', 'Gymnastics',
            'Martial Arts', 'Baseball', 'Softball', 'Hockey', 'Golf'];
        return sports.map(s => `
            <span class="mf-interest-chip" data-sport="${s}"
                onclick="window.MinorForm._toggleChip(this)"
                style="padding:7px 14px;border-radius:16px;font-size:0.78rem;cursor:pointer;
                       background:#e8eaed;color:#444;transition:all 0.15s;user-select:none;">
                ${s}
            </span>`).join('');
    }

    function _toggleChip(el) {
        const active = el.classList.toggle('active');
        el.style.background = active ? '#1a73e8' : '#e8eaed';
        el.style.color = active ? '#fff' : '#444';
        // Hide error if at least one chip is now active
        if (active) {
            const errEl = document.getElementById('mf-interests-error');
            if (errEl) errEl.style.display = 'none';
        }
    }

    function _cityOptions() {
        // Pulls from dropdown settlements data if available
        const cities = window.MIZANO_SETTLEMENTS || [
            'Gaborone', 'Francistown', 'Maun', 'Selebi Phikwe', 'Lobatse',
            'Serowe', 'Palapye', 'Molepolole', 'Kanye', 'Mochudi',
            'Mahalapye', 'Kasane', 'Ghanzi', 'Jwaneng', 'Orapa',
            'Ramotswa', 'Tlokweng', 'Mogoditshane', 'Gabane', 'Thamaga'
        ];
        return cities.map(c => `<option value="${c}">${c}</option>`).join('');
    }

    function _today() {
        return new Date().toISOString().split('T')[0];
    }

    function _generateCode() {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    function _getUserId() {
        if (window.MizanoAuth?.getCurrentUserId) return window.MizanoAuth.getCurrentUserId();
        if (window.mizanoStorage?.getCurrentUserId) return window.mizanoStorage.getCurrentUserId();
        return localStorage.getItem('currentUser') || 'anon';
    }

    function _safeAttr(v) { return (v || '').replace(/'/g, '&#39;'); }

    function _markError(id, msg) {
        const el = document.getElementById(id);
        if (!el) return;
        el.style.borderColor = '#e53935';
        _showToast(msg, 'error');
    }

    function _showToast(msg, type = 'success') {
        let toast = document.getElementById('mf-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'mf-toast';
            document.body.appendChild(toast);
        }
        toast.style.cssText = `
            position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:99999;
            background:${type === 'error' ? '#e53935' : '#323232'};color:#fff;
            padding:10px 20px;border-radius:8px;font-size:0.85rem;font-weight:500;
            white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.3);pointer-events:none;
        `;
        toast.textContent = msg;
        toast.style.display = 'block';
        clearTimeout(toast._t);
        toast._t = setTimeout(() => { toast.style.display = 'none'; }, 3000);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // STYLES (injected inline — no new CSS file)
    // ─────────────────────────────────────────────────────────────────────────

    function _styles() {
        if (document.getElementById('minor-form-styles')) return '';
        return `<style id="minor-form-styles">
            .mf-section { background:#fff; border-bottom:1px solid #f0f0f0; }
            .mf-section-hd {
                display:flex; align-items:center; justify-content:space-between;
                padding:14px 16px; cursor:pointer; user-select:none;
            }
            .mf-sec-title { font-weight:600; font-size:0.88rem; color:#1a1a1a; }
            .mf-arrow { font-size:1rem; color:#aaa; }
            .mf-section-body { padding:0 16px 16px; }
            .mf-label { display:block; font-size:0.78rem; color:#555; font-weight:600; margin-bottom:4px; }
            .mf-input {
                width:100%; padding:11px 12px; border:1px solid #dadce0; border-radius:8px;
                font-size:0.88rem; box-sizing:border-box; font-family:inherit; outline:none;
                transition:border-color 0.2s;
            }
            .mf-input:focus { border-color:#1a73e8; }
            .mf-textarea { min-height:90px; resize:vertical; }
            .mf-req-star { color:#e53935; }
            .mf-hint { font-size:0.75rem; color:#888; display:block; margin-top:3px; }
            .mf-error { font-size:0.75rem; color:#e53935; margin-top:4px; }
            .mf-link-btn {
                background:none; border:none; color:#1a73e8; font-size:0.8rem;
                cursor:pointer; padding:0; text-decoration:underline;
            }
            .mf-secondary-btn {
                background:#f1f3f4; border:none; border-radius:8px;
                padding:8px 16px; font-size:0.82rem; cursor:pointer; font-family:inherit;
            }
            .mf-submit-btn {
                width:100%; padding:14px; background:#1a73e8; color:#fff;
                border:none; border-radius:10px; font-size:0.95rem;
                font-weight:700; cursor:pointer; font-family:inherit;
                transition:background 0.2s;
            }
            .mf-submit-btn:active { background:#1557b0; }
            .mf-path-btn {
                flex:1; padding:12px 8px; border:2px solid #dadce0; border-radius:10px;
                background:#fff; cursor:pointer; font-size:0.82rem; font-weight:600;
                font-family:inherit; text-align:center; transition:all 0.15s;
                display:flex; flex-direction:column; gap:4px; align-items:center;
            }
            .mf-path-btn small { font-weight:400; color:#888; font-size:0.72rem; }
            .mf-path-btn.active { border-color:#1a73e8; background:#e8f0fe; color:#1a73e8; }
            .mf-device-only-notice {
                background:#fff8e1; border-left:4px solid #f9a825;
                padding:10px 12px; border-radius:0 8px 8px 0;
                font-size:0.78rem; color:#555; margin-bottom:12px;
            }
            /* Toggle switch */
            .mf-toggle-wrap { position:relative; display:inline-block; width:44px; height:24px; flex-shrink:0; }
            .mf-toggle-wrap input { opacity:0; width:0; height:0; }
            .mf-toggle-slider {
                position:absolute; cursor:pointer; inset:0;
                background:#ccc; border-radius:24px; transition:background 0.2s;
            }
            .mf-toggle-slider:before {
                content:''; position:absolute; width:18px; height:18px;
                left:3px; top:3px; background:#fff; border-radius:50%;
                transition:transform 0.2s;
            }
            .mf-toggle-wrap input:checked + .mf-toggle-slider { background:#1a73e8; }
            .mf-toggle-wrap input:checked + .mf-toggle-slider:before { transform:translateX(20px); }
        </style>`;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PUBLIC API
    // ─────────────────────────────────────────────────────────────────────────

    return {
        render,
        _selectPath,
        _sendInvite,
        _pickPhoto,
        _previewPhoto,
        _calcAge,
        _searchSchools,
        _selectSchool,
        _toggleCustomSchool,
        _loadAreas,
        _submit,
        _toggleChip
    };

})();
