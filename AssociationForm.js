window.AssociationForm = (function () {

    let _state = { stage: 'choice', data: null };

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

    function render() {
        if (_state.stage === 'choice') return _renderChoice();
        if (_state.stage === 'import_list') return _renderImportList();
        return _renderForm();
    }

    function init() {
        _state = { stage: 'choice', data: null };
    }

    // ─────────────────────────────────────────────────────────────────────────
    // STAGE 1: CHOICE
    // ─────────────────────────────────────────────────────────────────────────

    function _renderChoice() {
        return `
        <div style="padding:40px 20px; text-align:center; font-family:inherit;">
            ${_styles()}
            <div style="font-size:3rem;margin-bottom:20px;">🏛️</div>
            <h2 style="margin:0 0 10px;font-size:1.4rem;font-weight:800;">Register Association</h2>
            <p style="color:#666;font-size:0.9rem;margin-bottom:30px;line-height:1.5;">Would you like to start from scratch or find an officially recognized BNSC affiliate?</p>
            
            <div style="display:grid;gap:16px;">
                <div class="af-choice-card" onclick="window.AssociationForm._go('form')">
                    <div style="font-size:1.5rem;">✍️</div>
                    <div style="text-align:left;">
                        <div style="font-weight:700;font-size:0.95rem;">Start Fresh</div>
                        <div style="font-size:0.75rem;color:#666;">Create a custom or new association.</div>
                    </div>
                    <span style="margin-left:auto;color:#ccc;">›</span>
                </div>

                <div class="af-choice-card" onclick="window.AssociationForm._go('import_list')">
                    <div style="font-size:1.5rem;">🇰🇼</div>
                    <div style="text-align:left;">
                        <div style="font-weight:700;font-size:0.95rem;">Find BNSC Affiliate</div>
                        <div style="font-size:0.75rem;color:#666;">Import and verify data for an existing federation.</div>
                    </div>
                     <span style="margin-left:auto;color:#ccc;">›</span>
                </div>
            </div>
        </div>`;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // STAGE 2: IMPORT LIST
    // ─────────────────────────────────────────────────────────────────────────

    function _renderImportList() {
        return `
        <div style="padding:16px; font-family:inherit;">
            ${_styles()}
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;">
                <button type="button" class="af-text-btn" onclick="window.AssociationForm._go('choice')">← Back</button>
                <h3 style="margin:0;font-size:1.1rem;font-weight:800;">BNSC Affiliates</h3>
            </div>
            
            <input type="text" id="af-bnsc-search" class="af-input" placeholder="Search by name or sport..." oninput="window.AssociationForm._filterBNSC(this.value)" style="margin-bottom:16px;">
            
            <div id="af-bnsc-list" style="display:grid;gap:10px;">
                ${_getBNSCHTML()}
            </div>
        </div>`;
    }

    function _getBNSCHTML(filter = '') {
        const list = window.bnscAffiliates || [];
        const f = filter.toLowerCase();
        const matches = list.filter(item => 
            item.name.toLowerCase().includes(f) || 
            (item.sport && item.sport.toLowerCase().includes(f))
        ).slice(0, 30);

        if (!matches.length) return `<div style="padding:40px;text-align:center;color:#888;">No matches found.</div>`;

        return matches.map(item => `
            <div class="af-choice-card" style="padding:12px;" onclick="window.AssociationForm._import(${item.id})">
                <div style="flex:1;">
                    <div style="font-weight:700;font-size:0.88rem;">${item.name}</div>
                    <div style="font-size:0.75rem;color:#1a73e8;font-weight:600;">${item.sport || 'Multi-Sport'}</div>
                </div>
                <div style="font-size:0.7rem;background:#e8f0fe;color:#1a73e8;padding:4px 8px;border-radius:12px;">IMPORT</div>
            </div>
        `).join('');
    }

    function _filterBNSC(val) {
        document.getElementById('af-bnsc-list').innerHTML = _getBNSCHTML(val);
    }

    function _import(id) {
        const item = window.bnscAffiliates.find(x => x.id === id);
        if (!item) return;

        _state.data = {
            name: item.name,
            acronym: item.shortName || '',
            sportG: item.sport ? [item.sport] : [],
            scope: 'National',
            address: item.contact?.address || '',
            email: item.contact?.email || '',
            phone: item.contact?.phone || '',
            website: item.contact?.website || '',
            bio: item.description || ''
        };
        _go('form');
    }

    // ─────────────────────────────────────────────────────────────────────────
    // STAGE 3: THE FORM
    // ─────────────────────────────────────────────────────────────────────────

    function _renderForm() {
        const d = _state.data || {};
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
                    <input type="text" id="af-name" class="af-input" required placeholder="e.g. Botswana Football Association" value="${d.name || ''}">

                    <label class="af-label" style="margin-top:10px;">Association Type <span class="af-req">*</span></label>
                    <select id="af-type" class="af-input" required>
                        <option value="">Select type…</option>
                        ${ASSOC_TYPES.map(t => `<option>${t}</option>`).join('')}
                    </select>

                    <label class="af-label" style="margin-top:10px;">Sport(s) Governed <span class="af-req">*</span></label>
                    <div id="af-sports-chips" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:6px;">
                        ${SPORTS.map(s => {
                            const isSel = d.sportG && d.sportG.includes(s);
                            return `<span class="af-sport-chip ${isSel ? 'active' : ''}" data-sport="${s}" 
                                   style="background:${isSel ? '#1a73e8' : '#e8eaed'}; color:${isSel ? '#fff' : '#444'};"
                                   onclick="window.AssociationForm._toggleSport(this)">${s}</span>`;
                        }).join('')}
                    </div>

                    <div style="display:flex;gap:10px;margin-top:10px;">
                        <div style="flex:1;">
                            <label class="af-label">Acronym/Code</label>
                            <input type="text" id="af-code" class="af-input" placeholder="e.g. BFA" value="${d.acronym || ''}">
                        </div>
                        <div style="flex:1;">
                            <label class="af-label">Year Established</label>
                            <input type="number" id="af-year" class="af-input" placeholder="e.g. 1966" min="1800">
                        </div>
                    </div>
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
                        ${SCOPE.map(s => `<option ${d.scope === s ? 'selected' : ''}>${s}</option>`).join('')}
                    </select>

                    <label class="af-label" style="margin-top:10px;">Description / Mandate</label>
                    <textarea id="af-bio" class="af-input af-textarea" placeholder="Purpose, jurisdiction, mission statement…">${d.bio || ''}</textarea>

                    <div style="display:flex;align-items:center;justify-content:space-between;margin-top:14px;">
                        <span class="af-label" style="margin:0;">Public Visibility</span>
                        <label class="af-toggle-wrap">
                            <input type="checkbox" id="af-visibility" checked>
                            <span class="af-toggle-slider"></span>
                        </label>
                    </div>
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
                    <input type="text" id="af-address" class="af-input" placeholder="Physical address" value="${d.address || ''}">

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

                    ${_field('Contact Email', 'af-email', 'email', false, '', d.email || '')}
                    ${_field('Contact Phone', 'af-phone', 'tel', false, '', d.phone || '')}
                    ${_field('Website URL', 'af-website', 'url', false, '', d.website || '')}
                </div>
            </div>

            <!-- ── SECTION 4: ADMINS & AFFILIATES ────────────────────── -->
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

                    <div style="margin-top:20px; border-top:1px solid #eee; padding-top:12px;">
                        <label class="af-label" style="font-size:0.85rem;color:#1a73e8;">Link existing entities (Optional)</label>
                        ${_multiSearchField('Member Groups/Teams', 'af-group', 'groups')}
                        ${_multiSearchField('Affiliated Schools', 'af-school', 'schools')}
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
    // LOGIC & NAVIGATION
    // ─────────────────────────────────────────────────────────────────────────

    function _go(stage, data = null) {
        _state.stage = stage;
        if (data) _state.data = data;
        
        const container = document.getElementById('builder-form-content');
        if (container) {
            container.innerHTML = render();
            // Attach UI listeners if needed
            if (stage === 'form') {
                // Ensure collapsible headers work
                if (window.AddActionRouter && window.AddActionRouter._attachCollapsibleInternalListeners) {
                    window.AddActionRouter._attachCollapsibleInternalListeners(container);
                }
            }
        }
    }

    function _toggleSport(el) {
        const active = el.classList.toggle('active');
        el.style.background = active ? '#1a73e8' : '#e8eaed';
        el.style.color = active ? '#fff' : '#444';
    }

    async function _submit() {
        if (window.MizanoAuth?.isDemo?.()) { window.ProfilePanel?._showSignUpModal(); return; }

        const name = document.getElementById('af-name').value.trim();
        const type = document.getElementById('af-type').value;
        const scope = document.getElementById('af-scope').value;
        const sports = Array.from(document.querySelectorAll('.af-sport-chip.active')).map(c => c.dataset.sport);

        if (!name || !type || !scope) { _showToast('Please fill all required (*) fields', 'error'); return; }

        const record = {
            association_id: `ASS-${Date.now()}`,
            name,
            association_type: type,
            sports_governed: sports,
            geographic_scope: scope,
            bio: document.getElementById('af-bio').value.trim(),
            address: document.getElementById('af-address').value.trim(),
            city: document.getElementById('af-city').value,
            contact_email: document.getElementById('af-email').value.trim(),
            admins: JSON.parse(document.getElementById('af-admins-data').value || '[]'),
            user_uid: window.mizanoStorage.getCurrentUserId()
        };

        try {
            await window.mizanoStorage.saveEntity('associations', record);
            _showToast('Association registered! 🏛️');
            setTimeout(() => {
                if (window.MizanoNav) window.MizanoNav.closeOverlay('builder');
                if (window.MyAssociations && window.MyAssociations.refresh) window.MyAssociations.refresh();
            }, 1000);
        } catch (e) {
            _showToast('Failed to save.', 'error');
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // HELPERS & STYLES
    // ─────────────────────────────────────────────────────────────────────────

    function _field(label, id, type, required, placeholder, val) {
        return `
        <div style="margin-top:10px;">
            <label class="af-label">${label}</label>
            <input type="${type}" id="${id}" class="af-input" placeholder="${placeholder}" value="${val}">
        </div>`;
    }

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
            const matches = (all || []).filter(i => (i.name || '').toLowerCase().includes(query.toLowerCase())).slice(0, 5);
            if (!matches.length) { resultsEl.style.display = 'none'; return; }
            resultsEl.innerHTML = matches.map(m => `
                <div class="af-dropdown-item" onclick="window.AssociationForm._addLinked('${idPrefix}','${m.local_id || m.id}','${(m.name || '').replace(/'/g, "\\'")}')">
                    ${m.name}
                </div>`).join('');
            resultsEl.style.display = 'block';
        } catch { resultsEl.style.display = 'none'; }
    }

    function _addLinked(idPrefix, id, name) {
        document.getElementById(`${idPrefix}-results`).style.display = 'none';
        document.getElementById(`${idPrefix}-search`).value = '';
        const dataEl = document.getElementById(`${idPrefix}-data`);
        let list = JSON.parse(dataEl.value || '[]');
        if (list.includes(id)) return;
        list.push(id);
        dataEl.value = JSON.stringify(list);
        const listEl = document.getElementById(`${idPrefix}-list`);
        const chip = document.createElement('span');
        chip.style.cssText = 'background:#e8f0fe;color:#1a73e8;border-radius:12px;padding:4px 10px;font-size:0.78rem;display:inline-flex;align-items:center;gap:6px;';
        chip.innerHTML = `${name} <span onclick="this.parentElement.remove()" style="cursor:pointer;font-weight:700;color:#e53935;">×</span>`;
        listEl.appendChild(chip);
    }

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

    function _showToast(msg, type = 'success') {
        if (window.FormHelpers) window.FormHelpers.showToast(msg, type);
        else alert(msg);
    }

    function _styles() {
        if (document.getElementById('assoc-form-styles')) return '';
        return `<style id="assoc-form-styles">
            .af-choice-card { display:flex; align-items:center; gap:16px; padding:20px; border:1px solid #eee; border-radius:16px; background:#fff; cursor:pointer; transition:all 0.2s; box-shadow:0 2px 4px rgba(0,0,0,0.02); }
            .af-choice-card:hover { border-color:#1a73e8; background:#f8faff; box-shadow:0 4px 12px rgba(26,115,232,0.1); }
            .af-section { background:#fff; border-bottom:1px solid #f0f0f0; }
            .af-section-hd { display:flex; align-items:center; justify-content:space-between; padding:14px 16px; cursor:pointer; user-select:none; }
            .af-sec-title { font-weight:600; font-size:0.88rem; color:#1a1a1a; }
            .af-arrow { font-size:1rem; color:#aaa; }
            .af-section-body { padding:4px 16px 16px; }
            .af-label { display:block; font-size:0.78rem; color:#555; font-weight:600; margin-bottom:4px; margin-top:2px; }
            .af-input { width:100%; padding:11px 12px; border:1px solid #dadce0; border-radius:8px; font-size:0.88rem; box-sizing:border-box; font-family:inherit; outline:none; }
            .af-textarea { min-height:80px; resize:vertical; }
            .af-req { color:#e53935; }
            .af-hint { font-size:0.75rem; color:#888; }
            .af-sport-chip { padding:7px 14px; border-radius:16px; font-size:0.78rem; cursor:pointer; background:#e8eaed; color:#444; transition:all 0.15s; }
            .af-dropdown-list { border:1px solid #dadce0; border-radius:8px; max-height:160px; overflow-y:auto; background:#fff; margin-top:4px; box-shadow:0 2px 8px rgba(0,0,0,0.1); position:absolute; left:0; right:0; z-index:50; }
            .af-dropdown-item { padding:10px 14px; font-size:0.85rem; cursor:pointer; border-bottom:1px solid #f5f5f5; }
            .af-submit-btn { width:100%; padding:14px; background:#1a73e8; color:#fff; border:none; border-radius:10px; font-size:0.95rem; font-weight:700; cursor:pointer; }
            .af-text-btn { background:none; border:none; color:#1a73e8; font-size:0.9rem; font-weight:600; cursor:pointer; }
            .af-toggle-wrap { position:relative; display:inline-block; width:44px; height:24px; flex-shrink:0; }
            .af-toggle-wrap input { opacity:0; width:0; height:0; }
            .af-toggle-slider { position:absolute; cursor:pointer; inset:0; background:#ccc; border-radius:24px; transition:background 0.2s; }
            .af-toggle-slider:before { content:''; position:absolute; width:18px; height:18px; left:3px; top:3px; background:#fff; border-radius:50%; transition:transform 0.2s; }
            .af-toggle-wrap input:checked + .af-toggle-slider { background:#1a73e8; }
            .af-toggle-wrap input:checked + .af-toggle-slider:before { transform:translateX(20px); }
        </style>`;
    }

    return {
        render, init, _go, _import, _toggleSport, _filterBNSC, _searchStore, _addLinked, _loadAreas, _submit
    };
})();
