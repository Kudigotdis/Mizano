/**
 * MIZANO — AssociationForm.js (Session 7)
 * Applied Android Studio Otter Pipeline standards.
 *
 * AssociationForm.render() → HTML string injected by AddActionRouter.openForm('association')
 * On submit → window.mizanoStorage.saveEntity('associations', record)
 * Creator is automatically added as primary admin.
 * Includes multi-chip sport selection, admin search, and linked entities.
 *
 * Save to: Mizano\AssociationForm.js
 */

window.AssociationForm = (function () {

    const ASSOC_TYPES = [
        'National Federation', 'Regional Association', 'District League',
        'School Sports Department', 'Corporate League', 'Community League',
        'Referee Association', 'Other'
    ];

    const SCOPE = ['Local', 'District', 'Regional', 'National', 'International'];

    const SPORTS = [
        'Soccer', 'Netball', 'Basketball', 'Athletics', 'Swimming', 'Tennis',
        'Cricket', 'Rugby', 'Chess', 'Cycling', 'Volleyball', 'Badminton',
        'Table Tennis', 'Golf', 'Martial Arts', 'Boxing', 'Dance', 'Gymnastics',
        'Hockey', 'Softball', 'Baseball', 'Triathlon', 'Hiking', 'Squash'
    ];

    const ADMIN_ROLES = ['Chairperson', 'Secretary', 'Admin', 'Treasurer', 'PRO', 'Official'];

    // ─────────────────────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────────────────────

    function render() {
        return `
        <div id="assoc-form-wrap" style="padding:16px 0 100px;font-family:inherit;">
            ${_styles()}

            <!-- ── SECTION 1: OFFICIAL IDENTITY ───────────────────────── -->
            <div class="af-section">
                <div class="af-section-hd collapsible-header af-open" data-sec="identity">
                    <span class="af-sec-title"><span class="af-req">*</span> Official Identity</span>
                    <span class="collapsible-arrow af-arrow">⌄</span>
                </div>
                <div class="af-section-body" id="sec-identity">
                    <label class="af-label">Association Name <span class="af-req">*</span></label>
                    <input type="text" id="af-name" class="af-input" required placeholder="e.g. Botswana Football Association">

                    <label class="af-label" style="margin-top:10px;">Association Type <span class="af-req">*</span></label>
                    <select id="af-type" class="af-input" required>
                        <option value="">Select type…</option>
                        ${ASSOC_TYPES.map(t => `<option>${t}</option>`).join('')}
                    </select>

                    <label class="af-label" style="margin-top:10px;">Sport(s) Governed <span class="af-req">*</span></label>
                    <p class="af-hint" style="margin-top:0;">Select one or more sports.</p>
                    <div id="af-sports-chips" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:6px;">
                        ${SPORTS.map(s => `
                            <span class="af-sport-chip" data-sport="${s}" onclick="window.AssociationForm._toggleSport(this)">${s}</span>
                        `).join('')}
                    </div>
                    <p id="af-sports-error" class="af-error" style="display:none;">Please select at least one sport.</p>

                    <label class="af-label" style="margin-top:10px;">Logo</label>
                    <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
                        <div id="af-logo-preview" style="width:64px;height:64px;border-radius:12px;background:#e8eaed;
                            display:flex;align-items:center;justify-content:center;font-size:2rem;overflow:hidden;">🏛️</div>
                        <button type="button" class="af-secondary-btn" onclick="document.getElementById('af-logo-input').click()">Upload Logo</button>
                    </div>
                    <input type="file" id="af-logo-input" accept="image/*" style="display:none;" onchange="window.AssociationForm._previewLogo(this)">

                    <div style="display:flex;gap:10px;margin-top:10px;">
                        <div style="flex:1;">
                            <label class="af-label">Acronym/Code</label>
                            <input type="text" id="af-code" class="af-input" placeholder="e.g. BFA">
                        </div>
                        <div style="flex:1;">
                            <label class="af-label">Year Established</label>
                            <input type="number" id="af-year" class="af-input" placeholder="e.g. 1966" min="1800">
                        </div>
                    </div>

                    <label class="af-label" style="margin-top:10px;">Official Reg. Number</label>
                    <input type="text" id="af-reg-num" class="af-input" placeholder="e.g. BNSC Reg #">
                </div>
            </div>

            <!-- ── SECTION 2: MANDATE & SCOPE ─────────────────────────── -->
            <div class="af-section">
                <div class="af-section-hd collapsible-header" data-sec="mandate">
                    <span class="af-sec-title"><span class="af-req">*</span> Mandate &amp; Scope</span>
                    <span class="collapsible-arrow af-arrow">›</span>
                </div>
                <div class="af-section-body" id="sec-mandate" style="display:none;">
                    <label class="af-label">Geographic Scope <span class="af-req">*</span></label>
                    <select id="af-scope" class="af-input" required>
                        <option value="">Select scope…</option>
                        ${SCOPE.map(s => `<option>${s}</option>`).join('')}
                    </select>

                    <label class="af-label" style="margin-top:10px;">Description / Mandate</label>
                    <textarea id="af-bio" class="af-input af-textarea" placeholder="Purpose, jurisdiction, mission statement…"></textarea>

                    <div style="display:flex;align-items:center;justify-content:space-between;margin-top:14px;">
                        <span class="af-label" style="margin:0;">Public Visibility</span>
                        <label class="af-toggle-wrap">
                            <input type="checkbox" id="af-visibility" checked>
                            <span class="af-toggle-slider"></span>
                        </label>
                    </div>
                    <p class="af-hint" style="margin-top:4px;">If off, visible to members only.</p>
                </div>
            </div>

            <!-- ── SECTION 3: LOCATION & CONTACT ──────────────────────── -->
            <div class="af-section">
                <div class="af-section-hd collapsible-header" data-sec="contact">
                    <span class="af-sec-title">Location &amp; Contact</span>
                    <span class="collapsible-arrow af-arrow">›</span>
                </div>
                <div class="af-section-body" id="sec-contact" style="display:none;">
                    <label class="af-label">HQ Address</label>
                    <input type="text" id="af-address" class="af-input" placeholder="Physical address or description">

                    <div style="display:flex;gap:10px;margin-top:10px;">
                        <div style="flex:1;">
                            <label class="af-label">City/Town</label>
                            <select id="af-city" class="af-input" onchange="window.AssociationForm._loadAreas(this.value)">
                                <option value="">Select city…</option>
                                ${_cityOptions()}
                            </select>
                        </div>
                        <div style="flex:1;">
                            <label class="af-label">Area</label>
                            <select id="af-area" class="af-input"><option value="">Select area…</option></select>
                        </div>
                    </div>

                    ${_field('Contact Email', 'af-email', 'email')}
                    ${_field('Contact Phone', 'af-phone', 'tel')}
                    ${_field('WhatsApp Number (+267)', 'af-whatsapp', 'tel')}
                    ${_field('Website URL', 'af-website', 'url')}
                    ${_field('Facebook URL', 'af-fb', 'url')}
                    ${_field('X/Twitter Handle', 'af-x', 'text')}
                    ${_field('Instagram Handle', 'af-ig', 'text')}
                    ${_field('LinkedIn', 'af-linkedin', 'url')}
                </div>
            </div>

            <!-- ── SECTION 4: AFFILIATED ENTITIES & ADMINS ────────────── -->
            <div class="af-section" style="border-bottom:none;">
                <div class="af-section-hd collapsible-header" data-sec="entities">
                    <span class="af-sec-title">Admins &amp; Affiliates</span>
                    <span class="collapsible-arrow af-arrow">›</span>
                </div>
                <div class="af-section-body" id="sec-entities" style="display:none;">

                    <label class="af-label">Add Admin Users</label>
                    <div style="display:flex;gap:6px;">
                        <input type="text" id="af-admin-search" class="af-input" placeholder="@username or +267..." style="flex:1;">
                        <button type="button" class="af-submit-btn" style="width:auto;padding:0 16px;" onclick="window.AssociationForm._searchAdmins()">Find</button>
                    </div>
                    <div id="af-admin-results" class="af-dropdown-list" style="display:none;"></div>
                    <div id="af-admins-list" style="margin-top:8px;"></div>
                    <input type="hidden" id="af-admins-data" value="[]">
                    <p class="af-hint">You (the creator) are automatically added as Primary Admin.</p>

                    <!-- Multiple search elements -->
                    <div style="margin-top:20px; border-top:1px solid #eee; padding-top:12px;">
                        <label class="af-label" style="font-size:0.85rem;color:#1a73e8;">Link existing entities (Optional)</label>
                        ${_multiSearchField('Member Groups/Teams', 'af-group', 'groups')}
                        ${_multiSearchField('Affiliated Schools', 'af-school', 'schools')}
                        ${_multiSearchField('Sponsors/Partners', 'af-biz', 'businesses')}
                    </div>
                </div>
            </div>

            <!-- ── FOOTER CTA ─────────────────────────────────────────── -->
            <div style="padding:16px;position:sticky;bottom:0;background:#fff;border-top:1px solid #f0f0f0;z-index:10;">
                <button type="button" class="af-submit-btn" onclick="window.AssociationForm._submit()">Register Association</button>
            </div>
        </div>`;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SPORT CHIPS
    // ─────────────────────────────────────────────────────────────────────────

    function _toggleSport(el) {
        const active = el.classList.toggle('active');
        el.style.background = active ? '#1a73e8' : '#e8eaed';
        el.style.color = active ? '#fff' : '#444';
        if (active) document.getElementById('af-sports-error').style.display = 'none';
    }

    // ─────────────────────────────────────────────────────────────────────────
    // LOGO
    // ─────────────────────────────────────────────────────────────────────────

    function _previewLogo(input) {
        const file = input.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) { _showToast('Logo must be under 2 MB', 'error'); return; }
        const r = new FileReader();
        r.onload = ev => {
            document.getElementById('af-logo-preview').innerHTML = `<img src="${ev.target.result}" style="width:100%;height:100%;object-fit:cover;" id="af-logo-img">`;
        };
        r.readAsDataURL(file);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // MULTI-SEARCH FOR LINKED ENTITIES
    // ─────────────────────────────────────────────────────────────────────────

    function _multiSearchField(label, idPrefix, storeType) {
        return `
        <label class="af-label" style="margin-top:10px;">${label}</label>
        <div style="position:relative;">
            <input type="text" id="${idPrefix}-search" class="af-input" placeholder="Search ${storeType}..."
                oninput="window.AssociationForm._searchStore('${storeType}', this.value, '${idPrefix}')">
            <div id="${idPrefix}-results" class="af-dropdown-list" style="display:none;"></div>
            <div id="${idPrefix}-list" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;"></div>
            <input type="hidden" id="${idPrefix}-data" value="[]">
        </div>`;
    }

    async function _searchStore(storeName, query, idPrefix) {
        const resultsEl = document.getElementById(`${idPrefix}-results`);
        if (!query || query.length < 2) { resultsEl.style.display = 'none'; return; }
        try {
            const all = await window.mizanoStorage.performTransaction(storeName, 'readonly', s => s.getAll());
            const q = query.toLowerCase();
            const matches = (all || []).filter(i => (i.name || '').toLowerCase().includes(q)).slice(0, 5);
            if (!matches.length) { resultsEl.style.display = 'none'; return; }
            resultsEl.innerHTML = matches.map(m => `
                <div class="af-dropdown-item" onclick="window.AssociationForm._addLinked('${idPrefix}','${m.local_id || m.id}','${_safeAttr(m.name)}')">
                    ${m.name} <small style="color:#888;">${m.city ? '· ' + m.city : ''}</small>
                </div>`).join('');
            resultsEl.style.display = 'block';
        } catch { resultsEl.style.display = 'none'; }
    }

    function _addLinked(idPrefix, id, name) {
        document.getElementById(`${idPrefix}-results`).style.display = 'none';
        document.getElementById(`${idPrefix}-search`).value = '';

        const dataEl = document.getElementById(`${idPrefix}-data`);
        let list = JSON.parse(dataEl.value || '[]');
        if (list.includes(id)) return; // prevent duplicate

        list.push(id);
        dataEl.value = JSON.stringify(list);

        const listEl = document.getElementById(`${idPrefix}-list`);
        const chip = document.createElement('span');
        chip.style.cssText = 'background:#e8f0fe;color:#1a73e8;border-radius:12px;padding:4px 10px;font-size:0.78rem;display:inline-flex;align-items:center;gap:6px;';
        chip.innerHTML = `${name} <span onclick="window.AssociationForm._removeLinked('${idPrefix}','${id}', this.parentElement)" style="cursor:pointer;font-weight:700;color:#e53935;">×</span>`;
        listEl.appendChild(chip);
    }

    function _removeLinked(idPrefix, id, chipEl) {
        chipEl.remove();
        const dataEl = document.getElementById(`${idPrefix}-data`);
        let list = JSON.parse(dataEl.value || '[]');
        dataEl.value = JSON.stringify(list.filter(i => i !== id));
    }

    // ─────────────────────────────────────────────────────────────────────────
    // ADMIN SEARCH (USERS)
    // ─────────────────────────────────────────────────────────────────────────

    async function _searchAdmins() {
        const q = document.getElementById('af-admin-search')?.value.toLowerCase().trim();
        const resultsEl = document.getElementById('af-admin-results');
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
                        <button class="af-secondary-btn" style="padding:4px 10px;width:auto;" onclick="window.AssociationForm._addAdmin('${u.cloud_id || u.local_id}','${_safeAttr(u.username || u.first_name)}')">Add</button>
                    </div>`).join('');
            }
            resultsEl.style.display = 'block';
        } catch (e) { }
    }

    function _addAdmin(uid, name) {
        document.getElementById('af-admin-results').style.display = 'none';
        const dataEl = document.getElementById('af-admins-data');
        let admins = JSON.parse(dataEl.value || '[]');
        if (admins.find(a => a.uid === uid)) { _showToast('User already an admin', 'error'); return; }

        admins.push({ uid, name, role: 'Admin' });
        dataEl.value = JSON.stringify(admins);
        _renderAdmins();
    }

    function _updateAdminRole(uid, role) {
        const dataEl = document.getElementById('af-admins-data');
        let admins = JSON.parse(dataEl.value || '[]');
        const idx = admins.findIndex(a => a.uid === uid);
        if (idx > -1) admins[idx].role = role;
        dataEl.value = JSON.stringify(admins);
    }

    function _removeAdmin(uid) {
        const dataEl = document.getElementById('af-admins-data');
        let admins = JSON.parse(dataEl.value || '[]');
        dataEl.value = JSON.stringify(admins.filter(a => a.uid !== uid));
        _renderAdmins();
    }

    function _renderAdmins() {
        const dataEl = document.getElementById('af-admins-data');
        const admins = JSON.parse(dataEl.value || '[]');
        const listEl = document.getElementById('af-admins-list');

        listEl.innerHTML = admins.map(a => `
            <div style="display:flex;align-items:center;justify-content:space-between;background:#f9f9f9;padding:8px;border-radius:6px;border:1px solid #eee;margin-bottom:6px;">
                <span style="font-size:0.85rem;font-weight:600;flex:1;">@${a.name}</span>
                <select class="af-input" style="width:120px;padding:4px;font-size:0.75rem;margin-right:8px;" onchange="window.AssociationForm._updateAdminRole('${a.uid}', this.value)">
                    ${ADMIN_ROLES.map(r => `<option ${a.role === r ? 'selected' : ''}>${r}</option>`).join('')}
                </select>
                <span style="color:#e53935;cursor:pointer;font-weight:700;padding:4px;" onclick="window.AssociationForm._removeAdmin('${a.uid}')">×</span>
            </div>
        `).join('');
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SUBMIT
    // ─────────────────────────────────────────────────────────────────────────

    async function _submit() {
        if (window.MizanoAuth?.isDemo?.()) { window.ProfilePanel?._showSignUpModal(); return; }

        const name = document.getElementById('af-name').value.trim();
        const type = document.getElementById('af-type').value;
        const scope = document.getElementById('af-scope').value;

        // Get selected sports
        const sports = Array.from(document.querySelectorAll('.af-sport-chip.active')).map(c => c.dataset.sport);

        if (!name || !type || !scope) { _showToast('Please fill all required (*) fields', 'error'); return; }
        if (!sports.length) {
            document.getElementById('af-sports-error').style.display = 'block';
            _showToast('Please select at least one sport', 'error'); return;
        }

        const userId = window.mizanoStorage.getCurrentUserId();
        const now = Date.now();
        const firstSportSlug = sports[0].toLowerCase().replace(/\s+/g, '_');
        const scopeSlug = scope.substring(0, 3).toUpperCase();
        const assocId = `ASS-${scopeSlug}-${firstSportSlug}-${now}`;

        // Get admins and inject creator as Primary
        let admins = JSON.parse(document.getElementById('af-admins-data').value || '[]');
        admins.push({ uid: userId, role: 'Primary Admin', status: 'active', joined_at: new Date().toISOString() });

        // Get linked arrays
        const group_ids = JSON.parse(document.getElementById('af-group-data')?.value || '[]');
        const school_ids = JSON.parse(document.getElementById('af-school-data')?.value || '[]');
        const business_ids = JSON.parse(document.getElementById('af-biz-data')?.value || '[]');

        const logoImg = document.getElementById('af-logo-img');

        const record = {
            association_id: assocId,
            name,
            association_type: type,
            sports_governed: sports,
            logo_data: logoImg ? logoImg.src : null,
            acronym: document.getElementById('af-code').value.trim(),
            year_established: parseInt(document.getElementById('af-year').value) || null,
            registration_num: document.getElementById('af-reg-num').value.trim(),

            geographic_scope: scope,
            bio: document.getElementById('af-bio').value.trim(),
            public_visibility: document.getElementById('af-visibility').checked,

            address: document.getElementById('af-address').value.trim(),
            city: document.getElementById('af-city').value,
            area: document.getElementById('af-area').value,
            contact_email: document.getElementById('af-email').value.trim(),
            contact_phone: document.getElementById('af-phone').value.trim(),
            whatsapp: document.getElementById('af-whatsapp').value.trim(),
            website: document.getElementById('af-website').value.trim(),
            facebook: document.getElementById('af-fb').value.trim(),
            twitter: document.getElementById('af-x').value.trim(),
            instagram: document.getElementById('af-ig').value.trim(),
            linkedin: document.getElementById('af-linkedin').value.trim(),

            admins,
            member_group_ids: group_ids,
            affiliated_school_ids: school_ids,
            affiliated_business_ids: business_ids
        };

        try {
            const localId = await window.mizanoStorage.saveEntity('associations', record);

            // Per DOC2, linked groups should be updated with this association_id
            if (group_ids.length > 0) {
                for (const gid of group_ids) {
                    try { await window.mizanoStorage.updateEntity('groups', gid, { association_id: localId }); } catch (err) { }
                }
            }

            _showToast('Association registered successfully! 🏛️');
            setTimeout(() => {
                window.MizanoNav?.closeOverlay('builder');
                window.MyAssociations?.refresh?.();
            }, 1000);
        } catch (e) {
            console.error('Assoc save failed', e);
            _showToast('Failed to register association.', 'error');
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // HELPERS
    // ─────────────────────────────────────────────────────────────────────────

    function _loadAreas(city) {
        const areaEl = document.getElementById('af-area');
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

    function _field(label, id, type, required = false, placeholder = '') {
        return `
        <div style="margin-top:10px;">
            <label class="af-label">${label} ${required ? '<span class="af-req">*</span>' : ''}</label>
            <input type="${type}" id="${id}" class="af-input" placeholder="${placeholder}" ${required ? 'required' : ''}>
        </div>`;
    }

    function _showToast(msg, type = 'success') {
        let t = document.getElementById('af-toast');
        if (!t) { t = document.createElement('div'); t.id = 'af-toast'; document.body.appendChild(t); }
        t.style.cssText = `position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:99999;
            background:${type === 'error' ? '#e53935' : '#323232'};color:#fff;padding:10px 20px;
            border-radius:8px;font-size:0.85rem;font-weight:500;box-shadow:0 2px 8px rgba(0,0,0,0.3);`;
        t.textContent = msg; t.style.display = 'block';
        clearTimeout(t._t); t._t = setTimeout(() => t.style.display = 'none', 3000);
    }

    function _safeAttr(v) { return (v || '').replace(/'/g, '&#39;'); }

    // ─────────────────────────────────────────────────────────────────────────
    // STYLES
    // ─────────────────────────────────────────────────────────────────────────

    function _styles() {
        if (document.getElementById('assoc-form-styles')) return '';
        return `<style id="assoc-form-styles">
            .af-section { background:#fff; border-bottom:1px solid #f0f0f0; }
            .af-section-hd { display:flex; align-items:center; justify-content:space-between; padding:14px 16px; cursor:pointer; user-select:none; }
            .af-sec-title { font-weight:600; font-size:0.88rem; color:#1a1a1a; }
            .af-arrow { font-size:1rem; color:#aaa; }
            .af-section-body { padding:4px 16px 16px; }
            .af-label { display:block; font-size:0.78rem; color:#555; font-weight:600; margin-bottom:4px; margin-top:2px; }
            .af-input { width:100%; padding:11px 12px; border:1px solid #dadce0; border-radius:8px; font-size:0.88rem; box-sizing:border-box; font-family:inherit; outline:none; transition:border-color 0.2s; }
            .af-input:focus { border-color:#1a73e8; }
            .af-textarea { min-height:80px; resize:vertical; }
            .af-req { color:#e53935; }
            .af-hint { font-size:0.75rem; color:#888; }
            .af-error { font-size:0.75rem; color:#e53935; margin-top:4px; }
            .af-sport-chip { padding:7px 14px; border-radius:16px; font-size:0.78rem; cursor:pointer; background:#e8eaed; color:#444; transition:all 0.15s; user-select:none; }
            .af-dropdown-list { border:1px solid #dadce0; border-radius:8px; max-height:160px; overflow-y:auto; background:#fff; margin-top:4px; box-shadow:0 2px 8px rgba(0,0,0,0.1); position:absolute; left:0; right:0; z-index:50; }
            .af-dropdown-item { padding:10px 14px; font-size:0.85rem; cursor:pointer; border-bottom:1px solid #f5f5f5; }
            .af-dropdown-item:hover { background:#f5f7ff; }
            .af-secondary-btn { background:#f1f3f4; border:none; border-radius:8px; padding:9px 16px; font-size:0.82rem; cursor:pointer; font-family:inherit; width:100%; text-align:center; font-weight:600; }
            .af-submit-btn { width:100%; padding:14px; background:#1a73e8; color:#fff; border:none; border-radius:10px; font-size:0.95rem; font-weight:700; cursor:pointer; font-family:inherit; }
            .af-toggle-wrap { position:relative; display:inline-block; width:44px; height:24px; flex-shrink:0; }
            .af-toggle-wrap input { opacity:0; width:0; height:0; }
            .af-toggle-slider { position:absolute; cursor:pointer; inset:0; background:#ccc; border-radius:24px; transition:background 0.2s; }
            .af-toggle-slider:before { content:''; position:absolute; width:18px; height:18px; left:3px; top:3px; background:#fff; border-radius:50%; transition:transform 0.2s; }
            .af-toggle-wrap input:checked + .af-toggle-slider { background:#1a73e8; }
            .af-toggle-wrap input:checked + .af-toggle-slider:before { transform:translateX(20px); }
        </style>`;
    }

    return {
        render,
        _toggleSport, _previewLogo, _loadAreas, _searchStore, _addLinked, _removeLinked,
        _searchAdmins, _addAdmin, _updateAdminRole, _removeAdmin, _submit
    };
})();
