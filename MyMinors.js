/**
 * MIZANO — MyMinors.js (Session 18/23 Upgrade)
 * Upgraded to DOC3 PART 20 Spec.
 */

window.MyMinors = (function () {

    // ─── STATE ────────────────────────────────────────────────────────────────
    let _minors = [];
    let _editingId = null;
    let _originalData = null;

    // ─── INIT ─────────────────────────────────────────────────────────────────

    async function init(container) {
        const userId = window.MizanoAuth?.getCurrentUser?.()?.uid;
        if (!userId) return;

        const target = container || document.getElementById('detail-view');
        if (!target) return;

        target.innerHTML = _buildHeader() + `<div id="mmi-content-wrap" style="padding-bottom:120px;">
            <div style="padding:40px;text-align:center;"><span class="spinner" style="font-size:2rem;">⏳</span></div>
        </div>`;

        await refresh();
        if (window.MizanoNav) window.MizanoNav.openOverlay('detail');
    }

    async function refresh() {
        const userId = window.MizanoAuth?.getCurrentUser?.()?.uid;
        const wrap = document.getElementById('mmi-content-wrap');
        if (!wrap || !userId) return;

        try {
            const allFiles = await window.mizanoStorage.getEntitiesByUser('player_files', userId);
            _minors = allFiles.filter(f => f.scope === 'minor');
        } catch (e) {
            console.error('Failed to load My Minors', e);
            _minors = [];
        }

        if (!_minors || _minors.length === 0) {
            wrap.innerHTML = _buildEmptyState();
        } else {
            _minors.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
            wrap.innerHTML = _buildFilterChips() + _minors.map(m => _buildCard(m)).join('') + _buildBottomActions();
            _attachListeners();
        }
    }

    // ─── UI COMPONENTS ────────────────────────────────────────────────────────

    function _buildHeader() {
        return `
        <div class="overlay-header sticky-top" style="display:flex;align-items:center;padding:14px 16px;background:#fff;border-bottom:1px solid #f0f0f0;position:sticky;top:0;z-index:100;">
            <button onclick="window.MizanoNav && window.MizanoNav.back()" style="background:none;border:none;font-size:1.4rem;cursor:pointer;color:#1a73e8;padding:4px 8px;font-weight:600;">‹</button>
            <h2 style="flex:1;text-align:center;font-size:1rem;font-weight:700;margin:0;color:#1a1a1a;">Guardian Menu</h2>
            <div style="width:40px;"></div>
        </div>
        <style>
            .mmi-card { background:#fff; margin:12px 16px; border-radius:12px; border:1px solid #e0e0e0; box-shadow:0 2px 8px rgba(0,0,0,0.04); overflow:hidden; }
            .mmi-card-header { padding:16px; display:flex; align-items:center; cursor:pointer; }
            .mmi-card-avatar { width:48px; height:48px; border-radius:50%; background:#fff0e6; color:#e65100; display:flex; align-items:center; justify-content:center; font-size:1.4rem; font-weight:700; margin-right:12px; flex-shrink:0; border:1px solid #ffe0b2;}
            .mmi-card-title { font-weight:700; font-size:1.05rem; color:#1a1a1a; margin:0 0 4px; }
            .mmi-card-meta { font-size:0.8rem; color:#666; display:flex; align-items:center; gap:8px; }
            
            .mmi-expanded-body { display:none; border-top:1px solid #f0f0f0; }
            .mmi-section { border-bottom:1px solid #f0f0f0; }
            .mmi-section-header { padding:14px 16px; display:flex; justify-content:space-between; align-items:center; cursor:pointer; background:#fff; font-weight:700; font-size:0.85rem; color:#555; text-transform:uppercase; letter-spacing:0.5px; }
            .mmi-section-content { padding:12px 16px; background:#fafafa; display:none; }

            .pill { display:inline-block; padding:2px 8px; border-radius:12px; font-size:0.7rem; font-weight:700; }
            .pill-minor { background:#fff0e6; color:#e65100; }
            .pill-verified { background:#e3f2fd; color:#1565c0; }

            .mmi-edit-chip { display:inline-flex; align-items:center; background:#e8f0fe; color:#1a73e8; font-size:0.75rem; font-weight:700; padding:4px 10px; border-radius:12px; cursor:pointer; }
            .mmi-action-chip { display:inline-block; padding:8px 14px; background:#fff; border:1px solid #dadce0; border-radius:20px; font-size:0.8rem; font-weight:600; color:#1a1a1a; margin:0 8px 8px 0; cursor:pointer; }
            .mmi-input { width:100%; padding:12px; border:1px solid #dadce0; border-radius:8px; font-size:0.9rem; margin-top:4px; font-family:inherit; }
        </style>`;
    }

    function _buildEmptyState() {
        return `<div style="padding:60px 24px;text-align:center;color:#666;">
            <div style="font-size:4rem;margin-bottom:20px;">🧒</div>
            <h3 style="color:#1a1a1a;margin:0 0 12px;font-size:1.2rem;">No Minors added yet.</h3>
            <p style="font-size:0.9rem;line-height:1.6;margin:0 auto 30px;max-width:260px;">Create player files for your children or dependents to manage their club activities.</p>
            <button onclick="window.AddActionRouter.openForm('player_file', { scope: 'minor' })" style="background:#1a73e8;color:#fff;border:none;padding:12px 24px;border-radius:24px;font-weight:700;cursor:pointer;">Add Dependent</button>
        </div>`;
    }

    function _buildBottomActions() {
        return `
        <div style="position:fixed; bottom:20px; left:0; right:0; display:flex; justify-content:center; pointer-events:none; z-index:1000;">
            <button onclick="window.AddActionRouter.openForm('player_file', { scope: 'minor' })" 
                style="background:#1a73e8; color:#fff; border:none; padding:14px 32px; border-radius:28px; font-weight:700; cursor:pointer; box-shadow:0 4px 12px rgba(26,115,232,0.4); pointer-events:auto;">
                + Add Dependent
            </button>
        </div>`;
    }

    function _buildFilterChips() {
        return `<div style="padding:12px 16px; display:flex; gap:8px; overflow-x:auto;">
            <span class="filter-chip active" style="background:#1a73e8;color:#fff;padding:6px 14px;border-radius:16px;font-size:0.8rem;font-weight:600;white-space:nowrap;">All</span>
            <span class="filter-chip" style="background:#fff;border:1px solid #e0e0e0;color:#555;padding:6px 14px;border-radius:16px;font-size:0.8rem;font-weight:500;white-space:nowrap;">Active Registrations</span>
        </div>`;
    }

    function _buildCard(m) {
        const id = m.local_id || m.file_id;
        const isEditing = (_editingId === id);
        const data = isEditing ? _originalData : m;

        const initials = ((data.first_name || 'U')[0] + (data.last_name || 'N')[0]).toUpperCase();

        return `
        <div class="mmi-card" id="mmi-card-${id}">
            <div class="mmi-card-header mmi-col-header" data-id="${id}">
                <div class="mmi-card-avatar">${initials}</div>
                <div style="flex:1;min-width:0;">
                    <h4 class="mmi-card-title">${_safe(data.first_name)} ${_safe(data.last_name)}</h4>
                    <div class="mmi-card-meta">
                        <span>Dependent</span> • <span>${_safe(data.sport) || 'General'}</span>
                    </div>
                    <div style="margin-top:6px;display:flex;gap:6px;align-items:center;">
                        <span class="pill pill-minor">${data.relationship || 'Guardian'}</span>
                        <span style="font-size:0.75rem;color:#888;">Born: ${data.dob || 'TBD'}</span>
                    </div>
                </div>
            </div>
            
            <div class="mmi-expanded-body" id="mmi-body-${id}" style="${isEditing ? 'display:block;' : ''}">
                <!-- SECTION A: MINOR IDENTITY -->
                <div class="mmi-section-static" style="padding:16px; border-bottom:1px solid #f0f0f0;">
                    <div style="display:flex; justify-content:space-between; align-items:start;">
                        <div style="font-size:0.9rem; line-height:1.5; color:#444;">
                            Guardian managed profile for athletic participation and club registration.
                        </div>
                        ${!isEditing ? `<div class="mmi-edit-chip" onclick="window.MyMinors._startEdit('${id}')">✏️ Edit</div>` : ''}
                    </div>
                    ${isEditing ? _renderEditFormInputs(data) : ''}
                </div>

                <!-- SECTION B: LINKED PLAYER FILES -->
                ${_buildSection('Linked Player Files', _renderLinks(data), 'mmi-sec-link')}

                <!-- SECTION C: MEDICAL DATA -->
                ${_buildSection('Medical Data (Device Only)', _renderMedical(data), 'mmi-sec-med')}

                <!-- SECTION D: CONSENT & PERMISSIONS -->
                ${_buildSection('Consent & Permissions', _renderConsent(data), 'mmi-sec-cons')}

                <!-- SECTION E: GUARDIAN CONTACTS -->
                ${_buildSection('Guardian Contacts', _renderGuardian(data), 'mmi-sec-guard')}

                <!-- SECTION F: ACADEMIC OVERSIGHT -->
                ${_buildSection('Academic Oversight', _renderAcademic(data), 'mmi-sec-acad')}

                <!-- ACTIONS -->
                <div class="mmi-section" style="padding:16px;">
                    <div style="display:flex; gap:8px; margin-bottom:10px;">
                        <button class="mmi-action-chip" style="background:#1a73e8; color:#fff; border:none; flex:1; margin:0;" onclick="window.MizanoShell.toast('Opening event browser...', 'info')">Enter in Event</button>
                        <button class="mmi-action-chip" style="background:#e65100; color:#fff; border:none; flex:1; margin:0;" onclick="window.MizanoShell.toast('Encryption key manager...', 'info')">Manage Keys</button>
                    </div>
                    <div style="display:flex; gap:8px;">
                        <div class="mmi-action-chip" style="flex:1; text-align:center; margin:0;">Download ID</div>
                        <div class="mmi-action-chip" style="flex:1; text-align:center; margin:0;">Revoke Access</div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    function _buildSection(title, content, idPrefix) {
        return `
        <div class="mg-section">
            <div class="mg-section-header" onclick="window.MyMinors._toggleSection(this)">
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
            <div style="display:flex; gap:12px;">
                <div style="flex:1;">
                    <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">First Name</div>
                    <input type="text" id="edit-mi-fn" class="mmi-input" value="${_safeAttr(data.first_name)}">
                </div>
                <div style="flex:1;">
                    <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">Last Name</div>
                    <input type="text" id="edit-mi-ln" class="mmi-input" value="${_safeAttr(data.last_name)}">
                </div>
            </div>
            <div style="margin-top:12px; font-size:0.75rem; color:#888;">Relationship</div>
            <input type="text" id="edit-mi-rel" class="mmi-input" value="${_safeAttr(data.relationship)}">
        </div>`;
    }

    function _renderLinks(data) {
        return `
        <div style="font-size:0.85rem; color:#444;">
            ✅ Athlete resume active in <strong>My Player Files</strong>.
            <div style="margin-top:10px;">
                <button class="mmi-action-chip" style="margin:0; font-size:0.75rem; padding:6px 12px;" onclick="window.MyPlayerFiles && window.MyPlayerFiles.init()">📂 View Full Player File</button>
            </div>
            <div style="margin-top:8px; font-size:0.75rem; color:#888;">ID: PF-${data.file_id || 'LOCAL'}</div>
        </div>`;
    }

    function _renderMedical(data) {
        return `
        <div style="font-size:0.75rem; color:#c62828; background:#fff2f2; padding:8px; border-radius:6px; margin-bottom:10px; border:1px solid #ffcdd2;">
            ⚠️ Device-only encrypted storage.
        </div>
        <div style="font-size:0.85rem; color:#444;">
            <strong>Allergies:</strong> ${data.allergies || 'None recorded'}
            <br><strong>Medications:</strong> ${data.medications || 'None recorded'}
        </div>
        <button class="mmi-edit-chip" style="margin-top:10px;" onclick="window.MizanoShell.toast('Medical editor coming soon', 'info')">Edit Medical</button>
        `;
    }

    function _renderAcademic(data) {
        const isPaused = data.academic_pause === true;
        return `
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; background:#fff; padding:10px; border-radius:8px; border:1px solid #eee;">
            <div>
                <div style="font-weight:700; font-size:0.9rem; color:${isPaused ? '#c62828' : '#2e7d32'};">Academic Pause: ${isPaused ? 'ACTIVE' : 'OFF'}</div>
                <div style="font-size:0.75rem; color:#666;">Blocks all sports registrations</div>
            </div>
            <button class="mmi-edit-chip" style="background:${isPaused ? '#e8f5e9' : '#ffebee'}; color:${isPaused ? '#2e7d32' : '#c62828'};" onclick="window.MyMinors._toggleAcademicPause('${data.local_id}')">
                ${isPaused ? 'Resume Sports' : 'Activate Pause'}
            </button>
        </div>
        <div style="font-size:0.85rem; color:#444;">
            <strong>School:</strong> ${data.school || 'Not linked'}
            <br><strong>Grade:</strong> ${data.grade || 'TBD'}
        </div>
        `;
    }

    function _renderConsent(data) {
        return `
        <div style="font-size:0.85rem; color:#444;">
            <div style="margin-bottom:6px;">🔘 Public Search: <strong>Disabled</strong></div>
            <div style="margin-bottom:6px;">🔘 Club Access: <strong>On Request</strong></div>
            <div style="margin-bottom:0;">🔘 Data Sync: <strong>Guardian Only</strong></div>
        </div>`;
    }

    function _renderGuardian(data) {
        return `
        <div style="font-size:0.85rem; color:#666;">
            Primary: ${_safe(data.emergency_name) || 'Registered Guardian'}
            <br>Tel: ${_safe(data.emergency_phone) || 'Not provided'}
        </div>`;
    }

    // ─── HANDLERS ─────────────────────────────────────────────────────────────

    function _attachListeners() {
        document.querySelectorAll('.mmi-col-header').forEach(hdr => {
            hdr.addEventListener('click', () => {
                const id = hdr.dataset.id;
                if (_editingId === id) return;
                const body = document.getElementById(`mmi-body-${id}`);
                const isHidden = (body.style.display === 'none' || body.style.display === '');
                body.style.display = isHidden ? 'block' : 'none';
            });
        });
    }

    function _toggleSection(hdr) {
        const content = hdr.nextElementSibling;
        const arrow = hdr.querySelector('.mg-sec-arrow');
        const isOpen = content.style.display === 'block';
        content.style.display = isOpen ? 'none' : 'block';
        arrow.textContent = isOpen ? '⌄' : '›';
    }

    function _startEdit(id) {
        if (_editingId) return;
        const m = _minors.find(x => (x.local_id || x.file_id) == id);
        if (!m) return;
        _editingId = id;
        _originalData = JSON.parse(JSON.stringify(m));
        refresh();
        _showEditingBar();
    }

    function _showEditingBar() {
        let bar = document.getElementById('mmi-editing-bar');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'mmi-editing-bar';
            bar.style.cssText = `position:fixed; bottom:0; left:0; right:0; background:#1a73e8; color:#fff; padding:12px 16px; display:flex; align-items:center; justify-content:space-between; z-index:9000;`;
            bar.innerHTML = `
                <div><div style="font-weight:700;">Editing Guardian Link</div><div style="font-size:0.75rem;opacity:0.8;">Unsaved changes</div></div>
                <div style="display:flex;gap:16px;align-items:center;">
                    <button style="background:none;border:none;color:#fff;font-weight:600;cursor:pointer;" onclick="window.MyMinors._cancelEdit()">Cancel</button>
                    <button style="background:#fff;color:#1a73e8;border:none;padding:10px 24px;border-radius:24px;font-weight:700;cursor:pointer;" onclick="window.MyMinors._saveEdit()">Save</button>
                </div>`;
            document.body.appendChild(bar);
        }
    }

    function _cancelEdit() {
        _editingId = null; _originalData = null;
        document.getElementById('mmi-editing-bar')?.remove();
        refresh();
    }

    async function _saveEdit() {
        const updates = {
            first_name: document.getElementById('edit-mi-fn')?.value.trim(),
            last_name: document.getElementById('edit-mi-ln')?.value.trim(),
            relationship: document.getElementById('edit-mi-rel')?.value.trim()
        };
        try {
            await window.mizanoStorage.updateEntity('player_files', _editingId, updates);
            _cancelEdit();
        } catch (e) {
            console.error(e);
        }
    }

    function _safe(v) {
        if (!v) return '';
        const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
        return v.toString().replace(/[&<>"']/g, m => map[m]);
    }

    function _safeAttr(v) {
        return (v || '').toString().replace(/'/g, '&#39;').replace(/"/g, '&quot;');
    }

    async function _toggleAcademicPause(id) {
        const m = _minors.find(x => x.local_id == id);
        if (!m) return;
        const newStatus = !m.academic_pause;
        try {
            await window.mizanoStorage.updateEntity('player_files', id, { academic_pause: newStatus });
            window.MizanoShell.toast(`Academic Pause ${newStatus ? 'Activated' : 'Removed'}`, 'info');
            refresh();
        } catch (e) {
            console.error(e);
        }
    }

    return { init, refresh, _toggleSection, _startEdit, _cancelEdit, _saveEdit, _toggleAcademicPause };
})();
