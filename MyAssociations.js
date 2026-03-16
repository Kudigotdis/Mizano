/**
 * MIZANO — MyAssociations.js (Session 16/23 Upgrade)
 * Upgraded to DOC3 PART 15 Spec.
 */

window.MyAssociations = (function () {

    // ─── STATE ────────────────────────────────────────────────────────────────
    let _associations = [];
    let _editingId = null;
    let _originalData = null;

    // ─── INIT ─────────────────────────────────────────────────────────────────

    async function init(container) {
        const userId = window.MizanoAuth?.getCurrentUser?.()?.uid;
        if (!userId) return;

        const target = container || document.getElementById('detail-view');
        if (!target) return;

        target.innerHTML = _buildHeader() + `<div id="ma-content-wrap" style="padding-bottom:120px;">
            <div style="padding:40px;text-align:center;"><span class="spinner" style="font-size:2rem;">⏳</span></div>
        </div>`;

        await refresh();
        if (window.MizanoNav) window.MizanoNav.openOverlay('detail');
    }

    async function refresh() {
        const userId = window.MizanoAuth?.getCurrentUser?.()?.uid;
        const wrap = document.getElementById('ma-content-wrap');
        if (!wrap || !userId) return;

        try {
            _associations = await window.mizanoStorage.getEntitiesByUser('associations', userId);
        } catch (e) {
            console.error('Failed to load My Associations', e);
            _associations = [];
        }

        if (!_associations || _associations.length === 0) {
            wrap.innerHTML = _buildEmptyState();
        } else {
            _associations.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
            wrap.innerHTML = _buildFilterChips() + _associations.map(a => _buildCard(a, userId)).join('') + _buildBottomActions();
            _attachListeners();
        }
    }

    // ─── UI COMPONENTS ────────────────────────────────────────────────────────

    function _buildHeader() {
        return `
        <div class="overlay-header sticky-top" style="display:flex;align-items:center;padding:14px 16px;background:#fff;border-bottom:1px solid #f0f0f0;position:sticky;top:0;z-index:100;">
            <button onclick="window.MizanoNav && window.MizanoNav.back()" style="background:none;border:none;font-size:1.4rem;cursor:pointer;color:#1a73e8;padding:4px 8px;font-weight:600;">‹</button>
            <h2 style="flex:1;text-align:center;font-size:1rem;font-weight:700;margin:0;color:#1a1a1a;">Associations</h2>
            <div style="width:40px;"></div> <!-- Spacer for symmetry -->
        </div>
        <style>
            .ma-card { background:#fff; margin:12px 16px; border-radius:12px; border:1px solid #e0e0e0; box-shadow:0 2px 8px rgba(0,0,0,0.04); overflow:hidden; }
            .ma-card-header { padding:16px; display:flex; align-items:center; cursor:pointer; }
            .ma-card-logo { width:56px; height:56px; border-radius:12px; background:#f4f8ff; border:1px solid #d2e3fc; display:flex; align-items:center; justify-content:center; margin-right:12px; flex-shrink:0; overflow:hidden; position:relative; }
            .ma-card-title { font-weight:700; font-size:1.05rem; color:#1a1a1a; margin:0 0 4px; line-height:1.2; }
            .ma-card-meta { font-size:0.8rem; color:#666; display:flex; align-items:center; gap:8px; }
            
            .ma-expanded-body { display:none; border-top:1px solid #f0f0f0; }
            .ma-section { border-bottom:1px solid #f0f0f0; }
            .ma-section-header { padding:14px 16px; display:flex; justify-content:space-between; align-items:center; cursor:pointer; background:#fff; font-weight:700; font-size:0.85rem; color:#555; text-transform:uppercase; letter-spacing:0.5px; }
            .ma-section-content { padding:12px 16px; background:#fafafa; display:none; }

            .pill { display:inline-block; padding:2px 8px; border-radius:12px; font-size:0.7rem; font-weight:700; }
            .pill-scope { background:#e8f0fe; color:#1a73e8; }
            .pill-role-primary { background:#1a237e; color:#fff; }
            .pill-role-admin { background:#1a73e8; color:#fff; }
            .pill-role-affiliated { background:#e1f5fe; color:#01579b; }

            .ma-edit-chip { display:inline-flex; align-items:center; background:#e8f0fe; color:#1a73e8; font-size:0.75rem; font-weight:700; padding:4px 10px; border-radius:12px; cursor:pointer; }
            .ma-action-chip { display:inline-block; padding:8px 14px; background:#fff; border:1px solid #dadce0; border-radius:20px; font-size:0.8rem; font-weight:600; color:#1a1a1a; margin:0 8px 8px 0; cursor:pointer; }
            .ma-input { width:100%; padding:12px; border:1px solid #dadce0; border-radius:8px; font-size:0.9rem; margin-top:4px; font-family:inherit; }

            .ma-verified-badge { position:absolute; bottom:2px; right:2px; background:#fff; border-radius:50%; padding:1px; display:flex; }
            
            .grid-list { display:flex; flex-wrap:wrap; gap:10px; margin-top:8px; }
            .grid-item { text-align:center; width:64px; cursor:pointer; }
            .item-circle { width:48px; height:48px; border-radius:50%; background:#fff; border:1px solid #eee; margin:0 auto 4px; display:flex; align-items:center; justify-content:center; overflow:hidden; }
            .item-name { font-size:0.7rem; color:#555; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        </style>`;
    }

    function _buildEmptyState() {
        return `<div style="padding:60px 24px;text-align:center;color:#666;">
            <div style="font-size:4rem;margin-bottom:20px;">🏛️</div>
            <h3 style="color:#1a1a1a;margin:0 0 12px;font-size:1.2rem;">No Associations added yet.</h3>
            <p style="font-size:0.9rem;line-height:1.6;margin:0 auto 30px;max-width:280px;">Register your league, federation, or school sports department to start governing.</p>
            <button onclick="window.AddActionRouter.openForm('association')" style="background:#1a73e8;color:#fff;border:none;padding:12px 24px;border-radius:24px;font-weight:700;cursor:pointer;">Register Association</button>
        </div>`;
    }

    function _buildBottomActions() {
        return `
        <div style="position:fixed; bottom:20px; left:0; right:0; display:flex; justify-content:center; pointer-events:none; z-index:1000;">
            <button onclick="window.AddActionRouter.openForm('association')" 
                style="background:#1a73e8; color:#fff; border:none; padding:14px 32px; border-radius:28px; font-weight:700; cursor:pointer; box-shadow:0 4px 12px rgba(26,115,232,0.4); pointer-events:auto;">
                + Register Association
            </button>
        </div>`;
    }

    function _buildFilterChips() {
        return `<div style="padding:12px 16px; display:flex; gap:8px; overflow-x:auto;">
            <span class="filter-chip active" style="background:#1a73e8;color:#fff;padding:6px 14px;border-radius:16px;font-size:0.8rem;font-weight:600;white-space:nowrap;">All</span>
            <span class="filter-chip" style="background:#fff;border:1px solid #e0e0e0;color:#555;padding:6px 14px;border-radius:16px;font-size:0.8rem;font-weight:500;white-space:nowrap;">Admin</span>
            <span class="filter-chip" style="background:#fff;border:1px solid #e0e0e0;color:#555;padding:6px 14px;border-radius:16px;font-size:0.8rem;font-weight:500;white-space:nowrap;">Affiliated</span>
        </div>`;
    }

    function _buildCard(assoc, userId) {
        const id = assoc.local_id || assoc.association_id;
        const isEditing = (_editingId === id);
        const data = isEditing ? _originalData : assoc;

        const role = _getUserRole(assoc, userId);
        const isAdmin = ['Primary Admin', 'Admin'].includes(role);
        const sports = Array.isArray(data.sports) ? data.sports : (data.sports ? data.sports.split(',') : []);

        const logoHtml = data.logo_data ? `<img src="${data.logo_data}" style="width:100%;height:100%;object-fit:cover;">` : `🏛️`;

        return `
        <div class="ma-card" id="ma-card-${id}">
            <div class="ma-card-header ma-col-header" data-id="${id}">
                <div class="ma-card-logo">
                    ${logoHtml}
                    ${data.is_verified ? `<div class="ma-verified-badge">✔️</div>` : ''}
                </div>
                <div style="flex:1;min-width:0;">
                    <h4 class="ma-card-title">${_safe(data.name) || 'Unnamed Association'}</h4>
                    <div class="ma-card-meta">
                        ${sports.slice(0, 3).map(s => `<span class="pill" style="border:1px solid #ccc;color:#666;">${s.trim()}</span>`).join('')}
                    </div>
                    <div style="margin-top:6px;display:flex;gap:6px;align-items:center;">
                        <span class="pill pill-scope">${_safe(data.scope) || 'Local'}</span>
                        <span class="pill pill-role-${role.toLowerCase().replace(' ', '')}">${role}</span>
                        <span style="font-size:0.75rem;color:#888;">12 teams • 8 events</span>
                    </div>
                </div>
            </div>
            
            <div class="ma-expanded-body" id="ma-body-${id}" style="${isEditing ? 'display:block;' : ''}">
                <!-- SECTION A: DESCRIPTION AND MANDATE -->
                <div class="ma-section-static" style="padding:16px; border-bottom:1px solid #f0f0f0;">
                    <div style="display:flex; justify-content:space-between; align-items:start;">
                        <div style="font-size:0.9rem; line-height:1.5; color:#444;">
                            <strong>Mandate:</strong> ${_safe(data.mandate) || 'Governing sports and community activities.'}
                            <div style="margin-top:6px; font-size:0.75rem; color:#888;">Reg: ${data.registration_number || 'PENDING'} • Established: ${data.year_established || 'TBD'}</div>
                        </div>
                        ${isAdmin && !isEditing ? `<div class="ma-edit-chip" onclick="window.MyAssociations._startEdit('${id}')">✏️ Edit</div>` : ''}
                    </div>
                    ${isEditing ? _renderEditFormInputs(data) : ''}
                </div>

                <!-- SECTION B: CONTACT AND CONNECTIVITY -->
                ${_buildSection('Contact & Connectivity', _renderContacts(data), 'ma-sec-contacts')}

                <!-- SECTION C: AFFILIATED GROUPS -->
                ${_buildSection('Affiliated Groups', _renderGroups(data, isAdmin), 'ma-sec-groups')}

                <!-- SECTION D: AFFILIATED SCHOOLS & BUSINESSES -->
                ${_buildSection('Schools & Businesses', _renderInstitutions(data, isAdmin), 'ma-sec-inst')}

                <!-- SECTION E: ADMINS AND OFFICIALS -->
                ${_buildSection('Admins & Officials', _renderOfficials(data, isAdmin), 'ma-sec-officials')}

                <!-- SECTION F: UPCOMING EVENTS -->
                ${_buildSection('Upcoming Events', _renderEvents(data, isAdmin), 'ma-sec-events')}

                <!-- SECTION G: ACTION CHIPS (Admin Only) -->
                ${isAdmin ? `
                <div class="ma-section" style="padding:16px;">
                    <div class="ma-action-chip">Edit Association</div>
                    <div class="ma-action-chip">+ Add Affiliated Group</div>
                    <div class="ma-action-chip" onclick="window.AddActionRouter.openForm('event', {association_id:'${id}'})">Post Event</div>
                    <div class="ma-action-chip">View Public Profile</div>
                    <div class="ma-action-chip">Share</div>
                </div>` : ''}
            </div>
        </div>`;
    }

    function _buildSection(title, content, idPrefix) {
        return `
        <div class="mg-section">
            <div class="mg-section-header" onclick="window.MyAssociations._toggleSection(this)">
                <span>${title}</span>
                <span class="mg-sec-arrow" style="font-size:1.2rem;color:#ccc;">⌄</span>
            </div>
            <div class="mg-section-content">
                ${content}
            </div>
        </div>`;
    }

    function _renderEditFormInputs(data) {
        return `
        <div style="margin-top:16px;">
            <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">Organization Name</div>
            <input type="text" id="edit-assoc-name" class="ma-input" value="${_safeAttr(data.name)}">
            
            <div style="font-size:0.75rem; color:#888; margin-top:12px; margin-bottom:4px;">Mandate / Mission</div>
            <textarea id="edit-assoc-mandate" class="ma-input" style="min-height:80px;">${_safeAttr(data.mandate)}</textarea>

            <div style="display:flex; gap:12px; margin-top:12px;">
                <div style="flex:1;">
                    <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">Reg Number</div>
                    <input type="text" id="edit-assoc-reg" class="ma-input" value="${_safeAttr(data.registration_number)}">
                </div>
                <div style="flex:1;">
                    <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">Year Established</div>
                    <input type="number" id="edit-assoc-year" class="ma-input" value="${_safeAttr(data.year_established)}">
                </div>
            </div>
        </div>`;
    }

    function _renderContacts(data) {
        return `
        <div style="display:flex; flex-wrap:wrap; gap:10px;">
            <div class="ma-action-chip" style="margin:0;">📞 Phone</div>
            <div class="ma-action-chip" style="margin:0;">💬 WhatsApp</div>
            <div class="ma-action-chip" style="margin:0;">📧 Email</div>
            <div class="ma-action-chip" style="margin:0;">🌐 Website</div>
        </div>
        <div style="margin-top:12px; font-size:0.85rem; color:#666;">
            📍 Address: ${_safe(data.address) || 'Headquarters not set'}
        </div>`;
    }

    function _renderGroups(data, isAdmin) {
        const groups = data.affiliated_groups || [];
        return `
        <div class="grid-list">
            ${groups.length === 0 ? '<div style="font-size:0.85rem;color:#999;">No affiliated groups yet.</div>' : groups.map(g => `
            <div class="grid-item" onclick="window.MyGroups && window.MyGroups.viewDetail('${g.id}')">
                <div class="item-circle">🏅</div>
                <div class="item-name">${_safe(g.name)}</div>
            </div>`).join('')}
        </div>
        ${isAdmin ? `<div class="ma-edit-chip" style="margin-top:12px;">+ Add Group</div>` : ''}`;
    }

    function _renderInstitutions(data, isAdmin) {
        return `
        <div style="font-weight:700; font-size:0.75rem; color:#888; margin-bottom:8px;">Affiliated Schools</div>
        <div style="display:flex; flex-wrap:wrap; gap:6px;">
            <span class="pill pill-scope" style="cursor:pointer;">+ Add School</span>
        </div>
        <div style="font-weight:700; font-size:0.75rem; color:#888; margin-top:16px; margin-bottom:8px;">Corporate Sponsors</div>
        <div style="display:flex; flex-wrap:wrap; gap:6px;">
            <span class="pill pill-scope" style="cursor:pointer;">+ Add Business</span>
        </div>`;
    }

    function _renderOfficials(data, isAdmin) {
        const admins = data.admins || [{ name: 'Primary Admin', role: 'Director' }];
        return `
        <div class="grid-list">
            ${admins.map(a => `
            <div class="grid-item" onclick="window.MyGroups && window.MyGroups._openMemberProfile('${a.uid}')">
                <div class="item-circle">👤</div>
                <div class="item-name">${_safe(a.name)}</div>
            </div>`).join('')}
        </div>
        ${isAdmin ? `<div class="ma-edit-chip" style="margin-top:12px;">+ Add Official</div>` : ''}`;
    }

    function _renderEvents(data, isAdmin) {
        return `
        <div style="font-size:0.85rem; color:#1a73e8; cursor:pointer; font-weight:700;" onclick="window.MyEvents && window.MyEvents.init()">📅 View All Association Events</div>
        <div style="margin-top:12px;">
            <div class="ma-edit-chip" onclick="window.AddActionRouter.openForm('event', {association_id:'${data.local_id}'})">Post New Event</div>
        </div>`;
    }

    // ─── HANDLERS ─────────────────────────────────────────────────────────────

    function _attachListeners() {
        document.querySelectorAll('.ma-col-header').forEach(hdr => {
            hdr.addEventListener('click', () => {
                const id = hdr.dataset.id;
                if (_editingId === id) return;
                const body = document.getElementById(`ma-body-${id}`);
                const isHidden = (body.style.display === 'none' || body.style.display === '');
                body.style.display = isHidden ? 'block' : 'none';
            });
        });
    }

    function _toggleSection(hdr) {
        const content = hdr.nextElementSibling;
        const arrow = hdr.querySelector('.ma-sec-arrow');
        const isOpen = content.style.display === 'block';
        content.style.display = isOpen ? 'none' : 'block';
        arrow.textContent = isOpen ? '⌄' : '›';
        hdr.style.background = isOpen ? '#fff' : '#f0f4f8';
    }

    function _startEdit(id) {
        if (_editingId) return;
        const assoc = _associations.find(a => (a.local_id || a.association_id) == id);
        if (!assoc) return;

        _editingId = id;
        _originalData = JSON.parse(JSON.stringify(assoc));
        refresh();
        _showEditingBar();
    }

    function _showEditingBar() {
        let bar = document.getElementById('ma-editing-bar');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'ma-editing-bar';
            bar.className = 'ma-editing-bar';
            bar.innerHTML = `
                <div><div style="font-weight:700;">Editing Association</div><div style="font-size:0.75rem;opacity:0.8;">Unsaved changes</div></div>
                <div style="display:flex;gap:16px;align-items:center;">
                    <button style="background:none;border:none;color:#fff;font-weight:600;cursor:pointer;" onclick="window.MyAssociations._cancelEdit()">Cancel</button>
                    <button style="background:#fff;color:#1a73e8;border:none;padding:10px 24px;border-radius:24px;font-weight:700;cursor:pointer;" onclick="window.MyAssociations._saveEdit()">Save Changes</button>
                </div>`;
            document.body.appendChild(bar);
        }
    }

    function _cancelEdit() {
        _editingId = null; _originalData = null;
        document.getElementById('ma-editing-bar')?.remove();
        refresh();
    }

    async function _saveEdit() {
        const updates = {
            name: document.getElementById('edit-assoc-name')?.value.trim(),
            mandate: document.getElementById('edit-assoc-mandate')?.value.trim(),
            registration_number: document.getElementById('edit-assoc-reg')?.value.trim(),
            year_established: document.getElementById('edit-assoc-year')?.value.trim()
        };
        try {
            await window.mizanoStorage.updateEntity('associations', _editingId, updates);
            _cancelEdit();
        } catch (e) {
            console.error(e);
        }
    }

    function _getUserRole(a, userId) {
        if (a.primary_admin === userId) return 'Primary Admin';
        if ((a.admins || []).includes(userId)) return 'Admin';
        if ((a.affiliates || []).includes(userId)) return 'Affiliated';
        return 'Admin'; // Fallback for demo
    }

    function _safe(v) {
        if (!v) return '';
        const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
        return v.toString().replace(/[&<>"']/g, m => map[m]);
    }

    function _safeAttr(v) {
        return (v || '').toString().replace(/'/g, '&#39;').replace(/"/g, '&quot;');
    }

    return { init, refresh, _toggleSection, _startEdit, _cancelEdit, _saveEdit };
})();
