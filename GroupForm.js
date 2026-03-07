/**
 * MIZANO — GroupForm.js (Session 6)
 * Applied Android Studio Otter Pipeline standards.
 *
 * GroupForm.render() → HTML string injected by AddActionRouter.openForm('group')
 * On submit → window.mizanoStorage.saveEntity('groups', record)
 * Creator is automatically added as Owner in the members array.
 * Includes emoji logo picker, venue/association/school search, and dynamic roles.
 *
 * Save to: Mizano\GroupForm.js
 */

window.GroupForm = (function () {

    const GROUP_TYPES = ['Sports Team', 'Activity Club', 'School Team', 'Corporate Team', 'Community Group', 'Other'];
    const AGE_CATS = ['Open', 'U8', 'U10', 'U12', 'U14', 'U16', 'U18', 'Seniors', 'Veterans'];
    const GENDER_MIX = ['Male', 'Female', 'Mixed', 'Youth'];
    const ROLES = ['Captain', 'Vice Captain', 'Coach', 'Manager', 'Player', 'Treasurer', 'Secretary', 'Fan', 'Member'];

    const SPORTS = [
        'Soccer', 'Netball', 'Basketball', 'Athletics', 'Swimming', 'Tennis',
        'Cricket', 'Rugby', 'Chess', 'Cycling', 'Volleyball', 'Badminton',
        'Table Tennis', 'Golf', 'Martial Arts', 'Boxing', 'Dance', 'Gymnastics',
        'Hockey', 'Softball', 'Baseball', 'Triathlon', 'Hiking', 'Squash'
    ];

    const EMOJIS = ['⚽', '🏀', '🏐', '🎾', '🏏', '🏉', '♟️', '🚴', '🏓', '🏸', '🥊', '🥋', '🏊', '🏃', '💃', '🤸', '🏑', '⚾', '🥇', '🏆'];

    // ─────────────────────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────────────────────

    function render() {
        return `
        <div id="group-form-wrap" style="padding:16px 0 100px;font-family:inherit;">
            ${_styles()}

            <!-- ── SECTION 1: GROUP IDENTITY ──────────────────────────── -->
            <div class="gf-section">
                <div class="gf-section-hd collapsible-header gf-open" data-sec="identity">
                    <span class="gf-sec-title"><span class="gf-req">*</span> Group Identity</span>
                    <span class="collapsible-arrow gf-arrow">⌄</span>
                </div>
                <div class="gf-section-body" id="sec-identity">
                    <label class="gf-label">Group Name <span class="gf-req">*</span></label>
                    <input type="text" id="gf-name" class="gf-input" required placeholder="e.g. Gaborone United, Weekend Warriors…">

                    <label class="gf-label" style="margin-top:10px;">Group Type <span class="gf-req">*</span></label>
                    <select id="gf-type" class="gf-input" required>
                        <option value="">Select group type…</option>
                        ${GROUP_TYPES.map(t => `<option>${t}</option>`).join('')}
                    </select>

                    <label class="gf-label" style="margin-top:10px;">Sport or Activity <span class="gf-req">*</span></label>
                    <div style="position:relative;">
                        <input type="text" id="gf-sport-search" class="gf-input" placeholder="Search or pick a sport…"
                            oninput="window.GroupForm._filterSports(this.value)" onfocus="window.GroupForm._showSportList()">
                        <input type="hidden" id="gf-sport">
                        <div id="gf-sport-list" class="gf-dropdown-list" style="display:none;">
                            ${SPORTS.map(s => `<div class="gf-dropdown-item" onclick="window.GroupForm._selectSport('${s}')">${s}</div>`).join('')}
                        </div>
                    </div>

                    <label class="gf-label" style="margin-top:10px;">Group Logo</label>
                    <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
                        <div id="gf-logo-preview" style="width:64px;height:64px;border-radius:12px;background:#e8eaed;
                            display:flex;align-items:center;justify-content:center;font-size:2rem;overflow:hidden;">🏆</div>
                        <div style="flex:1;">
                            <button type="button" class="gf-secondary-btn" onclick="window.GroupForm._toggleEmojiPicker()" style="margin-bottom:6px;">
                                Pick Emoji
                            </button>
                            <button type="button" class="gf-secondary-btn" onclick="document.getElementById('gf-logo-input').click()">
                                Upload Image
                            </button>
                        </div>
                    </div>
                    <!-- Emoji Picker Grid -->
                    <div id="gf-emoji-picker" style="display:none;background:#f5f5f5;padding:8px;border-radius:8px;
                        display:none;grid-template-columns:repeat(5, 1fr);gap:8px;margin-bottom:10px;">
                        ${EMOJIS.map(e => `<div style="text-align:center;font-size:1.6rem;cursor:pointer;padding:4px;
                            background:#fff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,0.1);"
                            onclick="window.GroupForm._selectEmoji('${e}')">${e}</div>`).join('')}
                    </div>
                    <input type="file" id="gf-logo-input" accept="image/*" style="display:none;" onchange="window.GroupForm._previewLogo(this)">
                    <input type="hidden" id="gf-logo-data" value="🏆">
                    <input type="hidden" id="gf-logo-is-emoji" value="true">

                    <label class="gf-label" style="margin-top:10px;">Description / Bio</label>
                    <textarea id="gf-bio" class="gf-input gf-textarea" placeholder="Who are you? What's your story or goal?"></textarea>

                    <label class="gf-label" style="margin-top:10px;">Year Founded (optional)</label>
                    <input type="number" id="gf-year" class="gf-input" placeholder="e.g. 2019" min="1900" max="${new Date().getFullYear()}">
                </div>
            </div>

            <!-- ── SECTION 2: LOCATION & HOME VENUE ───────────────────── -->
            <div class="gf-section">
                <div class="gf-section-hd collapsible-header" data-sec="location">
                    <span class="gf-sec-title"><span class="gf-req">*</span> Location &amp; Home Venue</span>
                    <span class="collapsible-arrow gf-arrow">›</span>
                </div>
                <div class="gf-section-body" id="sec-location" style="display:none;">
                    <div style="display:flex;gap:10px;margin-bottom:10px;">
                        <div style="flex:1;">
                            <label class="gf-label">Home City/Town <span class="gf-req">*</span></label>
                            <select id="gf-city" class="gf-input" onchange="window.GroupForm._loadAreas(this.value)">
                                <option value="">Select city…</option>
                                ${_cityOptions()}
                            </select>
                        </div>
                        <div style="flex:1;">
                            <label class="gf-label">Area</label>
                            <select id="gf-area" class="gf-input"><option value="">Select area…</option></select>
                        </div>
                    </div>

                    <label class="gf-label">Home Venue</label>
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                        <span style="font-size:0.8rem;color:#555;">Search registered venues</span>
                        <label class="gf-toggle-wrap">
                            <input type="checkbox" id="gf-venue-toggle" checked onchange="window.GroupForm._toggleVenue(this.checked)">
                            <span class="gf-toggle-slider"></span>
                        </label>
                    </div>
                    <div id="gf-venue-search-wrap">
                        <input type="text" id="gf-venue-search" class="ef-input" placeholder="Search venues…"
                            oninput="window.GroupForm._searchVenues(this.value)">
                        <div id="gf-venue-results" class="gf-dropdown-list" style="display:none;"></div>
                        <input type="hidden" id="gf-venue-id">
                    </div>
                    <div id="gf-venue-manual-wrap" style="display:none;">
                        <input type="text" id="gf-venue-manual" class="gf-input" placeholder="Enter venue name manually">
                    </div>
                </div>
            </div>

            <!-- ── SECTION 3: COMPETITION CATEGORIES ──────────────────── -->
            <div class="gf-section">
                <div class="gf-section-hd collapsible-header" data-sec="comp">
                    <span class="gf-sec-title"><span class="gf-req">*</span> Competition Categories</span>
                    <span class="collapsible-arrow gf-arrow">›</span>
                </div>
                <div class="gf-section-body" id="sec-comp" style="display:none;">
                    <div style="display:flex;gap:10px;">
                        <div style="flex:1;">
                            <label class="gf-label">Age Category <span class="gf-req">*</span></label>
                            <select id="gf-age" class="gf-input" required>
                                <option value="">Select…</option>
                                ${AGE_CATS.map(a => `<option>${a}</option>`).join('')}
                            </select>
                        </div>
                        <div style="flex:1;">
                            <label class="gf-label">Gender <span class="gf-req">*</span></label>
                            <select id="gf-gender" class="gf-input" required>
                                <option value="">Select…</option>
                                ${GENDER_MIX.map(g => `<option>${g}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ── SECTION 4: AFFILIATIONS (OPTIONAL) ─────────────────── -->
            <div class="gf-section">
                <div class="gf-section-hd collapsible-header" data-sec="affiliations">
                    <span class="gf-sec-title">Affiliations (Optional)</span>
                    <span class="collapsible-arrow gf-arrow">›</span>
                </div>
                <div class="gf-section-body" id="sec-affiliations" style="display:none;">
                    ${_linkedSearchField('Association', 'gf-assoc', 'searchAssociations', 'associations')}
                    ${_linkedSearchField('School', 'gf-school', 'searchSchools', 'schools')}
                    ${_linkedSearchField('Corporate / Sponsor', 'gf-biz', 'searchBusinesses', 'businesses')}
                </div>
            </div>

            <!-- ── SECTION 5: MEMBERSHIP RULES ────────────────────────── -->
            <div class="gf-section">
                <div class="gf-section-hd collapsible-header" data-sec="rules">
                    <span class="gf-sec-title">Membership Rules</span>
                    <span class="collapsible-arrow gf-arrow">›</span>
                </div>
                <div class="gf-section-body" id="sec-rules" style="display:none;">
                    <label class="gf-label">Membership Type</label>
                    <select id="gf-mem-type" class="gf-input">
                        <option value="Open">Open (anyone joins instantly)</option>
                        <option value="Application">Application (admin must approve)</option>
                        <option value="Private">Private (invite only)</option>
                    </select>

                    <label class="gf-label" style="margin-top:12px;">Available Roles</label>
                    <p class="gf-hint" style="margin-top:0;">Check all roles that exist in your team/group:</p>
                    <div id="gf-roles-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">
                        ${ROLES.map(r => `
                            <label style="display:flex;align-items:center;gap:6px;font-size:0.85rem;color:#333;">
                                <input type="checkbox" class="gf-role-check" value="${r}" ${['Player', 'Captain', 'Coach'].includes(r) ? 'checked' : ''}>
                                ${r}
                            </label>
                        `).join('')}
                    </div>

                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;margin-top:14px;">
                        <span class="gf-label" style="margin:0;">Subscription Fee — Free</span>
                        <label class="gf-toggle-wrap">
                            <input type="checkbox" id="gf-free-toggle" checked onchange="window.GroupForm._toggleFee(this.checked)">
                            <span class="gf-toggle-slider"></span>
                        </label>
                    </div>
                    <div id="gf-fee-wrap" style="display:none;">
                        <input type="number" id="gf-fee-amount" class="gf-input" placeholder="Monthly fee in BWP (e.g. 100)" min="0">
                    </div>
                </div>
            </div>

            <!-- ── SECTION 6: INVITE MEMBERS (OPTIONAL) ───────────────── -->
            <div class="gf-section">
                <div class="gf-section-hd collapsible-header" data-sec="invite">
                    <span class="gf-sec-title">Invite Members (Optional)</span>
                    <span class="collapsible-arrow gf-arrow">›</span>
                </div>
                <div class="gf-section-body" id="sec-invite" style="display:none;">
                    <label class="gf-label">Search users by username or phone</label>
                    <div style="display:flex;gap:6px;">
                        <input type="text" id="gf-user-search" class="gf-input" placeholder="@username or +267..." style="flex:1;">
                        <button type="button" class="gf-submit-btn" style="width:auto;padding:0 16px;" onclick="window.GroupForm._searchUsers()">Find</button>
                    </div>
                    <div id="gf-user-results" class="gf-dropdown-list" style="display:none;position:relative;margin-bottom:12px;"></div>

                    <label class="gf-label" style="margin-top:10px;">Pending Invites</label>
                    <div id="gf-invites-list" style="background:#f9f9f9;border-radius:8px;padding:8px;min-height:40px;">
                        <div id="gf-invites-empty" style="text-align:center;color:#aaa;font-size:0.8rem;padding:8px 0;">No invites added yet.</div>
                    </div>
                    <!-- Hidden list storing invite objects -->
                    <input type="hidden" id="gf-invites-data" value="[]">
                </div>
            </div>

            <!-- ── SECTION 7: CONTACT & SOCIAL ────────────────────────── -->
            <div class="gf-section" style="border-bottom:none;">
                <div class="gf-section-hd collapsible-header" data-sec="contact">
                    <span class="gf-sec-title">Contact &amp; Social</span>
                    <span class="collapsible-arrow gf-arrow">›</span>
                </div>
                <div class="gf-section-body" id="sec-contact" style="display:none;">
                    ${_field('WhatsApp Number (+267)', 'gf-whatsapp', 'tel', false)}
                    ${_field('Facebook Page URL', 'gf-fb', 'url', false)}
                    ${_field('Instagram Handle', 'gf-ig', 'text', false, '@username')}
                </div>
            </div>

            <!-- ── FOOTER CTA ─────────────────────────────────────────── -->
            <div style="padding:16px;position:sticky;bottom:0;background:#fff;border-top:1px solid #f0f0f0;z-index:10;">
                <button type="button" class="gf-submit-btn" onclick="window.GroupForm._submit()">Create Group</button>
            </div>
        </div>`;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // LOGO / EMOJI
    // ─────────────────────────────────────────────────────────────────────────

    function _toggleEmojiPicker() {
        const p = document.getElementById('gf-emoji-picker');
        if (p) {
            p.style.display = (p.style.display === 'none' || p.style.display === '') ? 'grid' : 'none';
        }
    }

    function _selectEmoji(e) {
        document.getElementById('gf-logo-preview').innerHTML = e;
        document.getElementById('gf-logo-data').value = e;
        document.getElementById('gf-logo-is-emoji').value = 'true';
        document.getElementById('gf-emoji-picker').style.display = 'none';
    }

    function _previewLogo(input) {
        const file = input.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) { _showToast('Logo must be under 2 MB', 'error'); return; }
        const r = new FileReader();
        r.onload = ev => {
            document.getElementById('gf-logo-preview').innerHTML = `<img src="${ev.target.result}" style="width:100%;height:100%;object-fit:cover;">`;
            document.getElementById('gf-logo-data').value = ev.target.result;
            document.getElementById('gf-logo-is-emoji').value = 'false';
        };
        r.readAsDataURL(file);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SPORT SEARCH
    // ─────────────────────────────────────────────────────────────────────────

    function _filterSports(query) {
        const list = document.getElementById('gf-sport-list');
        if (!list) return;
        const q = query.toLowerCase();
        list.innerHTML = SPORTS.filter(s => s.toLowerCase().includes(q))
            .map(s => `<div class="gf-dropdown-item" onclick="window.GroupForm._selectSport('${s}')">${s}</div>`).join('');
        list.style.display = list.innerHTML ? 'block' : 'none';
    }

    function _showSportList() {
        const list = document.getElementById('gf-sport-list');
        if (list) list.style.display = 'block';
    }

    function _selectSport(sport) {
        document.getElementById('gf-sport-search').value = sport;
        document.getElementById('gf-sport').value = sport;
        document.getElementById('gf-sport-list').style.display = 'none';
    }

    // ─────────────────────────────────────────────────────────────────────────
    // LOCATION & LINKED SEARCH
    // ─────────────────────────────────────────────────────────────────────────

    function _loadAreas(city) {
        const map = window.MIZANO_LOCATIONS || {};
        const areaEl = document.getElementById('gf-area');
        if (!areaEl) return;
        areaEl.innerHTML = '<option value="">Select area…</option>';
        if (map[city]) map[city].forEach(a => areaEl.insertAdjacentHTML('beforeend', `<option value="${a}">${a}</option>`));
    }

    function _toggleVenue(useSearch) {
        document.getElementById('gf-venue-search-wrap').style.display = useSearch ? 'block' : 'none';
        document.getElementById('gf-venue-manual-wrap').style.display = useSearch ? 'none' : 'block';
    }

    async function _searchDB(storeName, query, resultsId, hiddenId, displayField) {
        const resultsEl = document.getElementById(resultsId);
        if (!query || query.length < 2) { resultsEl.style.display = 'none'; return; }
        try {
            const all = await window.mizanoStorage.performTransaction(storeName, 'readonly', s => s.getAll());
            const q = query.toLowerCase();
            const matches = (all || []).filter(i => (i[displayField] || '').toLowerCase().includes(q)).slice(0, 6);
            if (!matches.length) { resultsEl.style.display = 'none'; return; }
            resultsEl.innerHTML = matches.map(m => `
                <div class="gf-dropdown-item" onclick="window.GroupForm._pickLinked('${resultsId}','${hiddenId}','${m.local_id}','${_safeAttr(m[displayField])}')">
                    ${m[displayField]} <small style="color:#888;margin-left:6px;">${m.city || ''}</small>
                </div>`).join('');
            resultsEl.style.display = 'block';
        } catch { resultsEl.style.display = 'none'; }
    }

    function _pickLinked(resId, hiddenId, id, name) {
        document.getElementById(resId).style.display = 'none';
        document.getElementById(hiddenId).value = id;
        document.getElementById(resId.replace('-results', '-search')).value = name;
    }

    function _searchVenues(q) { _searchDB('venues', q, 'gf-venue-results', 'gf-venue-id', 'name'); }
    function _searchAssociations(q) { _searchDB('associations', q, 'gf-assoc-results', 'gf-assoc-id', 'name'); }
    function _searchSchools(q) { _searchDB('schools', q, 'gf-school-results', 'gf-school-id', 'name'); }
    function _searchBusinesses(q) { _searchDB('businesses', q, 'gf-biz-results', 'gf-biz-id', 'name'); }

    // ─────────────────────────────────────────────────────────────────────────
    // MEMBERS & INVITES
    // ─────────────────────────────────────────────────────────────────────────

    function _toggleFee(isFree) {
        const wrap = document.getElementById('gf-fee-wrap');
        if (wrap) wrap.style.display = isFree ? 'none' : 'block';
    }

    async function _searchUsers() {
        const q = document.getElementById('gf-user-search')?.value.toLowerCase().trim();
        const resultsEl = document.getElementById('gf-user-results');
        if (!q) return;

        try {
            const all = await window.mizanoStorage.performTransaction('users', 'readonly', s => s.getAll());
            // mock search includes profiles store too logically, but simplifed to users here
            const matches = (all || []).filter(u =>
                (u.username || '').toLowerCase().includes(q) ||
                (u.phone || '').includes(q)
            ).slice(0, 5);

            if (!matches.length) {
                resultsEl.innerHTML = `<div style="padding:10px;text-align:center;color:#888;">No users found.</div>`;
            } else {
                resultsEl.innerHTML = matches.map(u => `
                    <div style="padding:10px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #eee;">
                        <div style="display:flex;align-items:center;gap:8px;">
                            <div style="width:32px;height:32px;border-radius:50%;background:#e0e0e0;display:flex;align-items:center;justify-content:center;font-size:0.8rem;">
                                ${u.avatar ? `<img src="${u.avatar}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">` : (u.first_name?.[0] || 'M')}
                            </div>
                            <div>
                                <div style="font-size:0.85rem;font-weight:600;">${u.first_name || ''} ${u.last_name || ''}</div>
                                <div style="font-size:0.75rem;color:#888;">@${u.username || ''}</div>
                            </div>
                        </div>
                        <button class="gf-secondary-btn" style="padding:4px 10px;" onclick="window.GroupForm._addInvite('${u.cloud_id || u.local_id || ''}','${_safeAttr(u.first_name || 'User')}')">Invite</button>
                    </div>
                `).join('');
            }
            resultsEl.style.display = 'block';
        } catch (e) { console.error('user search failed', e); }
    }

    function _addInvite(uid, name) {
        document.getElementById('gf-user-results').style.display = 'none';
        const dataEl = document.getElementById('gf-invites-data');
        let invites = JSON.parse(dataEl.value || '[]');

        if (invites.find(i => i.uid === uid)) { _showToast('User already in invite list', 'error'); return; }

        invites.push({ uid, name, role: 'Player' });
        dataEl.value = JSON.stringify(invites);
        _renderInvites();
    }

    function _updateInviteRole(uid, role) {
        const dataEl = document.getElementById('gf-invites-data');
        let invites = JSON.parse(dataEl.value || '[]');
        const idx = invites.findIndex(i => i.uid === uid);
        if (idx > -1) invites[idx].role = role;
        dataEl.value = JSON.stringify(invites);
    }

    function _removeInvite(uid) {
        const dataEl = document.getElementById('gf-invites-data');
        let invites = JSON.parse(dataEl.value || '[]');
        invites = invites.filter(i => i.uid !== uid);
        dataEl.value = JSON.stringify(invites);
        _renderInvites();
    }

    function _renderInvites() {
        const dataEl = document.getElementById('gf-invites-data');
        const invites = JSON.parse(dataEl.value || '[]');
        const listEl = document.getElementById('gf-invites-list');

        if (!invites.length) {
            listEl.innerHTML = `<div id="gf-invites-empty" style="text-align:center;color:#aaa;font-size:0.8rem;padding:8px 0;">No invites added yet.</div>`;
            return;
        }

        // Get allowed roles from checkboxes
        const allowed = Array.from(document.querySelectorAll('.gf-role-check:checked')).map(c => c.value);
        if (!allowed.length) allowed.push('Member');

        listEl.innerHTML = invites.map(i => `
            <div style="display:flex;align-items:center;justify-content:space-between;background:#fff;padding:8px;border-radius:6px;border:1px solid #eee;margin-bottom:6px;">
                <span style="font-size:0.85rem;font-weight:600;flex:1;">${i.name}</span>
                <select class="gf-input" style="width:110px;padding:4px;font-size:0.75rem;margin-right:8px;" onchange="window.GroupForm._updateInviteRole('${i.uid}', this.value)">
                    ${allowed.map(r => `<option ${i.role === r ? 'selected' : ''}>${r}</option>`).join('')}
                </select>
                <span style="color:#e53935;cursor:pointer;font-weight:700;padding:4px;" onclick="window.GroupForm._removeInvite('${i.uid}')">×</span>
            </div>
        `).join('');
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SUBMIT
    // ─────────────────────────────────────────────────────────────────────────

    async function _submit() {
        if (window.MizanoAuth?.isDemo?.()) { window.ProfilePanel?._showSignUpModal(); return; }

        if (!document.getElementById('gf-name').value.trim() ||
            !document.getElementById('gf-type').value ||
            !document.getElementById('gf-sport').value ||
            !document.getElementById('gf-city').value ||
            !document.getElementById('gf-age').value ||
            !document.getElementById('gf-gender').value) {
            _showToast('Please fill all required (*) fields', 'error');
            return;
        }

        const userId = window.mizanoStorage.getCurrentUserId();
        const sport = document.getElementById('gf-sport').value;
        const city = document.getElementById('gf-city').value;
        const sportSlug = sport.toLowerCase().replace(/\s+/g, '_');
        const areaCode = city.slice(0, 3).toUpperCase();
        const now = Date.now();
        const groupId = `GRP-${sportSlug}-${areaCode}-${now}`;

        // Get allowed roles
        const availableRoles = Array.from(document.querySelectorAll('.gf-role-check:checked')).map(c => c.value);
        // Get invites
        const invites = JSON.parse(document.getElementById('gf-invites-data').value || '[]');

        // Construct creator member object
        const creatorMember = {
            uid: userId,
            role: 'Owner',
            status: 'active',
            joined_at: new Date().toISOString()
        };

        const isFree = document.getElementById('gf-free-toggle').checked;

        const record = {
            group_id: groupId,
            name: document.getElementById('gf-name').value.trim(),
            group_type: document.getElementById('gf-type').value,
            sport,
            logo_data: document.getElementById('gf-logo-data').value,
            logo_is_emoji: document.getElementById('gf-logo-is-emoji').value === 'true',
            bio: document.getElementById('gf-bio').value.trim(),
            year_founded: parseInt(document.getElementById('gf-year').value) || null,

            city,
            area: document.getElementById('gf-area').value,
            venue_id: document.getElementById('gf-venue-toggle').checked ? document.getElementById('gf-venue-id').value : null,
            venue_manual: !document.getElementById('gf-venue-toggle').checked ? document.getElementById('gf-venue-manual').value.trim() : null,

            age_category: document.getElementById('gf-age').value,
            gender_category: document.getElementById('gf-gender').value,

            association_id: document.getElementById('gf-assoc-id').value || null,
            school_id: document.getElementById('gf-school-id').value || null,
            corporate_biz_id: document.getElementById('gf-biz-id').value || null,

            membership_type: document.getElementById('gf-mem-type').value,
            available_roles: availableRoles,
            is_free: isFree,
            fee_amount: isFree ? 0 : parseFloat(document.getElementById('gf-fee-amount').value) || 0,

            members: [creatorMember], // Creator is Owner
            pending_invites: invites, // the ones added in Section 6

            whatsapp: document.getElementById('gf-whatsapp').value.trim(),
            facebook: document.getElementById('gf-fb').value.trim(),
            instagram: document.getElementById('gf-ig').value.trim()
        };

        try {
            await window.mizanoStorage.saveEntity('groups', record);
            _showToast('Group created successfully! 🏆');
            setTimeout(() => {
                window.MizanoNav?.closeOverlay('builder');
                window.MyGroups?.refresh?.();
            }, 1000);
        } catch (e) {
            console.error('Group save failed', e);
            _showToast('Failed to create group. Try again.', 'error');
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // HELPERS
    // ─────────────────────────────────────────────────────────────────────────

    function _field(label, id, type, required = false, placeholder = '') {
        return `
        <div style="margin-top:10px;">
            <label class="gf-label">${label} ${required ? '<span class="gf-req">*</span>' : ''}</label>
            <input type="${type}" id="${id}" class="gf-input" placeholder="${placeholder}" ${required ? 'required' : ''}>
        </div>`;
    }

    function _linkedSearchField(label, idPrefix, searchFunc, storeType) {
        return `
        <label class="gf-label" style="margin-top:10px;">${label}</label>
        <div style="position:relative;">
            <input type="text" id="${idPrefix}-search" class="gf-input" placeholder="Search ${storeType}..." oninput="window.GroupForm._${searchFunc}(this.value)">
            <input type="hidden" id="${idPrefix}-id">
            <div id="${idPrefix}-results" class="gf-dropdown-list" style="display:none;"></div>
        </div>`;
    }

    function _cityOptions() {
        const cities = window.MIZANO_SETTLEMENTS || ['Gaborone', 'Francistown', 'Maun', 'Selebi Phikwe', 'Lobatse', 'Serowe', 'Palapye'];
        return cities.map(c => `<option value="${c}">${c}</option>`).join('');
    }

    function _showToast(msg, type = 'success') {
        let t = document.getElementById('gf-toast');
        if (!t) { t = document.createElement('div'); t.id = 'gf-toast'; document.body.appendChild(t); }
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
        if (document.getElementById('group-form-styles')) return '';
        return `<style id="group-form-styles">
            .gf-section { background:#fff; border-bottom:1px solid #f0f0f0; }
            .gf-section-hd { display:flex; align-items:center; justify-content:space-between; padding:14px 16px; cursor:pointer; user-select:none; }
            .gf-sec-title { font-weight:600; font-size:0.88rem; color:#1a1a1a; }
            .gf-arrow { font-size:1rem; color:#aaa; }
            .gf-section-body { padding:4px 16px 16px; }
            .gf-label { display:block; font-size:0.78rem; color:#555; font-weight:600; margin-bottom:4px; margin-top:2px; }
            .gf-input { width:100%; padding:11px 12px; border:1px solid #dadce0; border-radius:8px; font-size:0.88rem; box-sizing:border-box; font-family:inherit; outline:none; transition:border-color 0.2s; }
            .gf-input:focus { border-color:#1a73e8; }
            .gf-textarea { min-height:80px; resize:vertical; }
            .gf-req { color:#e53935; }
            .gf-hint { font-size:0.75rem; color:#888; }
            .gf-dropdown-list { border:1px solid #dadce0; border-radius:8px; max-height:160px; overflow-y:auto; background:#fff; margin-top:4px; box-shadow:0 2px 8px rgba(0,0,0,0.1); position:absolute; left:0; right:0; z-index:50; }
            .gf-dropdown-item { padding:10px 14px; font-size:0.85rem; cursor:pointer; border-bottom:1px solid #f5f5f5; }
            .gf-dropdown-item:hover { background:#f5f7ff; }
            .gf-secondary-btn { background:#f1f3f4; border:none; border-radius:8px; padding:9px 16px; font-size:0.82rem; cursor:pointer; font-family:inherit; width:100%; text-align:center; font-weight:600; }
            .gf-submit-btn { width:100%; padding:14px; background:#1a73e8; color:#fff; border:none; border-radius:10px; font-size:0.95rem; font-weight:700; cursor:pointer; font-family:inherit; }
            .gf-toggle-wrap { position:relative; display:inline-block; width:44px; height:24px; flex-shrink:0; }
            .gf-toggle-wrap input { opacity:0; width:0; height:0; }
            .gf-toggle-slider { position:absolute; cursor:pointer; inset:0; background:#ccc; border-radius:24px; transition:background 0.2s; }
            .gf-toggle-slider:before { content:''; position:absolute; width:18px; height:18px; left:3px; top:3px; background:#fff; border-radius:50%; transition:transform 0.2s; }
            .gf-toggle-wrap input:checked + .gf-toggle-slider { background:#1a73e8; }
            .gf-toggle-wrap input:checked + .gf-toggle-slider:before { transform:translateX(20px); }
        </style>`;
    }

    return {
        render,
        _toggleEmojiPicker, _selectEmoji, _previewLogo,
        _filterSports, _showSportList, _selectSport,
        _loadAreas, _toggleVenue, _searchVenues, _searchAssociations, _searchSchools, _searchBusinesses, _pickLinked,
        _toggleFee, _searchUsers, _addInvite, _updateInviteRole, _removeInvite,
        _submit
    };
})();
