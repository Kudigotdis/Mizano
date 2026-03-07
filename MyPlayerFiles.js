/**
 * MIZANO — MyPlayerFiles.js (Session 15/23 Upgrade)
 * Upgraded to DOC3 PART 18 Spec.
 */

window.MyPlayerFiles = (function () {

    // ─── STATE ────────────────────────────────────────────────────────────────
    let _playerFiles = [];
    let _editingId = null;
    let _originalData = null;

    // ─── INIT ─────────────────────────────────────────────────────────────────

    async function init() {
        const userId = window.MizanoAuth?.getCurrentUserId?.();
        if (!userId) return;

        const detailView = document.getElementById('detail-view');
        if (!detailView) return;

        detailView.innerHTML = _buildHeader() + `<div id="mpf-content-wrap" style="padding-bottom:120px;">
            <div style="padding:40px;text-align:center;"><span class="spinner" style="font-size:2rem;">⏳</span></div>
        </div>`;

        if (window.MizanoNav?.openOverlay) {
            window.MizanoNav.openOverlay('detail');
        } else {
            detailView.style.display = 'block';
            detailView.classList.add('active');
        }

        await refresh();
    }

    async function refresh() {
        const userId = window.MizanoAuth?.getCurrentUserId?.();
        const wrap = document.getElementById('mpf-content-wrap');
        if (!wrap || !userId) return;

        try {
            _playerFiles = await window.mizanoStorage.getEntitiesByUser('player_files', userId);
        } catch (e) {
            console.error('Failed to load My Player Files', e);
            _playerFiles = [];
        }

        if (!_playerFiles || _playerFiles.length === 0) {
            wrap.innerHTML = _buildEmptyState();
        } else {
            _playerFiles.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
            wrap.innerHTML = _buildFilterChips() + _playerFiles.map(pf => _buildCard(pf)).join('');
            _attachListeners();
        }
    }

    // ─── UI COMPONENTS ────────────────────────────────────────────────────────

    function _buildHeader() {
        return `
        <div class="overlay-header sticky-top" style="display:flex;align-items:center;padding:14px 16px;background:#fff;border-bottom:1px solid #f0f0f0;position:sticky;top:0;z-index:100;">
            <button onclick="window.MizanoNav && window.MizanoNav.back()" style="background:none;border:none;font-size:1.4rem;cursor:pointer;color:#1a73e8;padding:4px 8px;font-weight:600;">‹</button>
            <h2 style="flex:1;text-align:center;font-size:1rem;font-weight:700;margin:0;color:#1a1a1a;">My Player Files</h2>
            <button onclick="window.AddActionRouter.openForm('player_file')" style="background:none;border:none;color:#1a73e8;font-weight:600;font-size:0.9rem;cursor:pointer;">+ Create</button>
        </div>
        <style>
            .mpf-card { background:#fff; margin:12px 16px; border-radius:12px; border:1px solid #e0e0e0; box-shadow:0 2px 8px rgba(0,0,0,0.04); overflow:hidden; }
            .mpf-card-header { padding:16px; display:flex; align-items:center; cursor:pointer; }
            .mpf-card-avatar { width:56px; height:56px; border-radius:50%; background:#f0f0f0; display:flex; align-items:center; justify-content:center; margin-right:12px; flex-shrink:0; overflow:hidden; border:2px solid #eee; }
            .mpf-card-title { font-weight:700; font-size:1.05rem; color:#1a1a1a; margin:0 0 4px; }
            .mpf-card-meta { font-size:0.8rem; color:#666; display:flex; align-items:center; gap:8px; }
            
            .mpf-expanded-body { display:none; border-top:1px solid #f0f0f0; }
            .mpf-section { border-bottom:1px solid #f0f0f0; }
            .mpf-section-header { padding:14px 16px; display:flex; justify-content:space-between; align-items:center; cursor:pointer; background:#fff; font-weight:700; font-size:0.85rem; color:#555; text-transform:uppercase; letter-spacing:0.5px; }
            .mpf-section-content { padding:12px 16px; background:#fafafa; display:none; }

            .pill { display:inline-block; padding:2px 8px; border-radius:12px; font-size:0.7rem; font-weight:700; }
            .pill-role { background:#1a73e8; color:#fff; }
            .pill-scouted { background:#ffd54f; color:#000; }

            .mpf-edit-chip { display:inline-flex; align-items:center; background:#e8f0fe; color:#1a73e8; font-size:0.75rem; font-weight:700; padding:4px 10px; border-radius:12px; cursor:pointer; }
            .mpf-action-chip { display:inline-block; padding:8px 14px; background:#fff; border:1px solid #dadce0; border-radius:20px; font-size:0.8rem; font-weight:600; color:#1a1a1a; margin:0 8px 8px 0; cursor:pointer; }
            .mpf-input { width:100%; padding:12px; border:1px solid #dadce0; border-radius:8px; font-size:0.9rem; margin-top:4px; font-family:inherit; }

            .skill-bar-wrap { margin-bottom:10px; }
            .skill-bar-label { font-size:0.75rem; color:#666; display:flex; justify-content:space-between; margin-bottom:4px; }
            .skill-bar-bg { width:100%; height:6px; background:#eee; border-radius:3px; overflow:hidden; }
            .skill-bar-fill { height:100%; background:#1a73e8; border-radius:3px; }

            .timeline-item { padding-left:16px; border-left:2px solid #1a73e8; position:relative; margin-bottom:16px; }
            .timeline-dot { position:absolute; left:-6px; top:0; width:10px; height:10px; background:#1a73e8; border-radius:50%; }
        </style>`;
    }

    function _buildEmptyState() {
        return `<div style="padding:60px 24px;text-align:center;color:#666;">
            <div style="font-size:4rem;margin-bottom:20px;">🏃</div>
            <h3 style="color:#1a1a1a;margin:0 0 12px;font-size:1.2rem;">No Player Files</h3>
            <p style="font-size:0.9rem;line-height:1.6;margin:0 auto 30px;max-width:260px;">Create a sports resume to track your progress and get scouted.</p>
            <button onclick="window.AddActionRouter.openForm('player_file')" style="background:#1a73e8;color:#fff;border:none;padding:12px 24px;border-radius:24px;font-weight:700;cursor:pointer;">Build Player File</button>
        </div>`;
    }

    function _buildFilterChips() {
        return `<div style="padding:12px 16px; display:flex; gap:8px; overflow-x:auto;">
            <span class="filter-chip active" style="background:#1a73e8;color:#fff;padding:6px 14px;border-radius:16px;font-size:0.8rem;font-weight:600;white-space:nowrap;">All</span>
            <span class="filter-chip" style="background:#fff;border:1px solid #e0e0e0;color:#555;padding:6px 14px;border-radius:16px;font-size:0.8rem;font-weight:500;white-space:nowrap;">Football</span>
            <span class="filter-chip" style="background:#fff;border:1px solid #e0e0e0;color:#555;padding:6px 14px;border-radius:16px;font-size:0.8rem;font-weight:500;white-space:nowrap;">Basketball</span>
        </div>`;
    }

    function _buildCard(pf) {
        const id = pf.local_id || pf.file_id;
        const isEditing = (_editingId === id);
        const data = isEditing ? _originalData : pf;

        const avatarHtml = data.avatar_url ? `<img src="${data.avatar_url}" style="width:100%;height:100%;object-fit:cover;">` : `👤`;

        return `
        <div class="mpf-card" id="mpf-card-${id}">
            <div class="mpf-card-header mpf-col-header" data-id="${id}">
                <div class="mpf-card-avatar">${avatarHtml}</div>
                <div style="flex:1;min-width:0;">
                    <h4 class="mpf-card-title">${_safe(data.first_name)} ${_safe(data.last_name)}</h4>
                    <div class="mpf-card-meta">
                        <span>${_safe(data.sport)}</span> • <span>${_safe(data.position)}</span>
                    </div>
                    <div style="margin-top:6px;display:flex;gap:6px;align-items:center;">
                        <span class="pill pill-role">Verified</span>
                        <span style="font-size:0.75rem;color:#888;">${data.city} • ${data.area}</span>
                    </div>
                </div>
            </div>
            
            <div class="mpf-expanded-body" id="mpf-body-${id}" style="${isEditing ? 'display:block;' : ''}">
                <!-- SECTION A: PLAYER IDENTITY -->
                <div class="mpf-section-static" style="padding:16px; border-bottom:1px solid #f0f0f0;">
                    <div style="display:flex; justify-content:space-between; align-items:start;">
                        <div style="font-size:0.9rem; line-height:1.5; color:#444;">
                            ${_safe(data.bio) || 'Dedicated athlete looking for competitive opportunities.'}
                        </div>
                        ${!isEditing ? `<div class="mpf-edit-chip" onclick="window.MyPlayerFiles._startEdit('${id}')">✏️ Edit</div>` : ''}
                    </div>
                    ${isEditing ? _renderEditFormInputs(data) : ''}
                </div>

                <!-- SECTION B: VITAL STATS -->
                ${_buildSection('Vital Stats', _renderVitals(data), 'mpf-sec-vital')}

                <!-- SECTION C: ATTRIBUTES & SKILLS -->
                ${_buildSection('Attributes & Skills', _renderSkills(data), 'mpf-sec-skill')}

                <!-- SECTION D: CAREER HISTORY -->
                ${_buildSection('Career History', _renderCareer(data), 'mpf-sec-career')}

                <!-- SECTION E: ACCOMPLISHMENTS -->
                ${_buildSection('Accomplishments', _renderAchievements(data), 'mpf-sec-medal')}

                <!-- SECTION G: SCOUTING REPORT -->
                ${_buildSection('Scouting & Outlook', _renderScouting(data), 'mpf-sec-scout')}

                <!-- SECTION H: MEDICAL HISTORY (PRIVATE) -->
                ${_buildSection('Medical History (Private)', _renderMedical(data), 'mpf-sec-med')}

                <!-- ACTIONS -->
                <div class="mpf-section" style="padding:16px;">
                    <div class="mpf-action-chip" style="width:100%; text-align:center; margin:0;" onclick="window.MyPlayerFiles._toggleMedicalSection('${id}')">⚕️ Access Medical File</div>
                    <div style="display:flex; gap:8px; margin-top:10px;">
                        <div class="mpf-action-chip" style="flex:1; text-align:center; margin:0;">Share Resume</div>
                        <div class="mpf-action-chip" style="flex:1; text-align:center; margin:0;">Public Link</div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    function _buildSection(title, content, idPrefix) {
        return `
        <div class="mg-section">
            <div class="mg-section-header" onclick="window.MyPlayerFiles._toggleSection(this)">
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
            <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">Bio</div>
            <textarea id="edit-pf-bio" class="mpf-input" style="min-height:80px;">${_safeAttr(data.bio)}</textarea>
            <div style="display:flex; gap:12px; margin-top:12px;">
                <div style="flex:1;">
                    <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">Position</div>
                    <input type="text" id="edit-pf-pos" class="mpf-input" value="${_safeAttr(data.position)}">
                </div>
                <div style="flex:1;">
                    <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">Dominant Side</div>
                    <input type="text" id="edit-pf-side" class="mpf-input" value="${_safeAttr(data.dominant_side)}">
                </div>
            </div>
        </div>`;
    }

    function _renderVitals(data) {
        return `
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
            <div style="font-size:0.85rem; color:#666;">🎂 Age: <strong>${data.age || 'TBD'}</strong></div>
            <div style="font-size:0.85rem; color:#666;">📏 Height: <strong>${data.height || 'TBD'} cm</strong></div>
            <div style="font-size:0.85rem; color:#666;">⚖️ Weight: <strong>${data.weight || 'TBD'} kg</strong></div>
            <div style="font-size:0.85rem; color:#666;">🦶 Foot: <strong>${data.preferred_foot || 'Right'}</strong></div>
        </div>`;
    }

    function _renderSkills(data) {
        const skills = data.skills || { 'Speed': 85, 'Stamina': 78, 'Technique': 82, 'Strength': 70 };
        return Object.entries(skills).map(([label, val]) => `
            <div class="skill-bar-wrap">
                <div class="skill-bar-label"><span>${label}</span> <span>${val}</span></div>
                <div class="skill-bar-bg"><div class="skill-bar-fill" style="width:${val}%;"></div></div>
            </div>
        `).join('');
    }

    function _renderCareer(data) {
        return `
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <strong>Current:</strong> 
            <span style="color:#1a73e8; cursor:pointer;" onclick="window.MyGroups && window.MyGroups.viewDetail('${data.current_club_id}')">${_safe(data.current_club)}</span>
        </div>
        <div class="timeline-item"><div class="timeline-dot" style="background:#bbb;"></div><strong>2023-2024:</strong> Provincial Youth Team</div>`;
    }

    function _renderAchievements(data) {
        return `
        <div style="display:flex; gap:10px;">
            <div style="text-align:center;"><div style="font-size:1.5rem;">🏆</div><div style="font-size:0.6rem;">MVP 2024</div></div>
            <div style="text-align:center;"><div style="font-size:1.5rem;">📜</div><div style="font-size:0.6rem;">Level 1 Coach</div></div>
        </div>`;
    }

    function _renderScouting(data) {
        return `<div style="font-size:0.85rem; color:#444; font-style:italic;">Highly recommended for regional trials. Quick off the mark with excellent vision.</div>`;
    }

    function _renderMedical(data) {
        // In a real app, we'd fetch this from mizanoStorage.getEntitiesByUser('medical_records', userId)
        // For now, we'll render empty state with "Add" buttons per Spec.
        const records = data.medical_records || [];
        return `
        <div style="font-size:0.75rem; color:#c62828; background:#fff2f2; padding:8px; border-radius:6px; margin-bottom:12px; border:1px solid #ffcdd2;">
            ⚠️ This data is stored ONLY on this device and is never synced to the cloud.
        </div>
        <div style="margin-bottom:12px;">
            <div style="font-weight:700; font-size:0.8rem; color:#555; margin-bottom:6px;">Current Medications & Allergies</div>
            <div style="font-size:0.8rem; color:#888;">${data.medications || 'None listed.'}</div>
        </div>
        <div>
            <div style="font-weight:700; font-size:0.8rem; color:#555; margin-bottom:6px;">Injury History</div>
            ${records.length > 0 ? records.map(r => `<div style="font-size:0.8rem; margin-bottom:4px;">• ${r.type}: ${r.date}</div>`).join('') : '<div style="font-size:0.8rem; color:#888;">No injuries recorded.</div>'}
        </div>
        <div style="margin-top:12px; display:flex; gap:8px;">
            <button class="mpf-edit-chip" onclick="window.MizanoShell.toast('Injury form opening...', 'info')">+ Add Injury</button>
            <button class="mpf-edit-chip" onclick="window.MizanoShell.toast('Condition form opening...', 'info')">+ Add Condition</button>
        </div>
        `;
    }

    // ─── HANDLERS ─────────────────────────────────────────────────────────────

    function _attachListeners() {
        document.querySelectorAll('.mpf-col-header').forEach(hdr => {
            hdr.addEventListener('click', () => {
                const id = hdr.dataset.id;
                if (_editingId === id) return;
                const body = document.getElementById(`mpf-body-${id}`);
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
        const pf = _playerFiles.find(p => (p.local_id || p.file_id) == id);
        if (!pf) return;
        _editingId = id;
        _originalData = JSON.parse(JSON.stringify(pf));
        refresh();
        _showEditingBar();
    }

    function _showEditingBar() {
        let bar = document.getElementById('mpf-editing-bar');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'mpf-editing-bar';
            bar.style.cssText = `position:fixed; bottom:0; left:0; right:0; background:#1a73e8; color:#fff; padding:12px 16px; display:flex; align-items:center; justify-content:space-between; z-index:9000;`;
            bar.innerHTML = `
                <div><div style="font-weight:700;">Editing Player File</div><div style="font-size:0.75rem;opacity:0.8;">Unsaved changes</div></div>
                <div style="display:flex;gap:16px;align-items:center;">
                    <button style="background:none;border:none;color:#fff;font-weight:600;cursor:pointer;" onclick="window.MyPlayerFiles._cancelEdit()">Cancel</button>
                    <button style="background:#fff;color:#1a73e8;border:none;padding:10px 24px;border-radius:24px;font-weight:700;cursor:pointer;" onclick="window.MyPlayerFiles._saveEdit()">Save</button>
                </div>`;
            document.body.appendChild(bar);
        }
    }

    function _cancelEdit() {
        _editingId = null; _originalData = null;
        document.getElementById('mpf-editing-bar')?.remove();
        refresh();
    }

    async function _saveEdit() {
        const updates = {
            bio: document.getElementById('edit-pf-bio')?.value.trim(),
            position: document.getElementById('edit-pf-pos')?.value.trim(),
            dominant_side: document.getElementById('edit-pf-side')?.value.trim()
        };
        try {
            await window.mizanoStorage.updateEntity('player_files', _editingId, updates);
            _cancelEdit();
        } catch (e) {
            console.error(e);
        }
    }

    function _toggleMedicalSection(id) {
        const sec = document.getElementById(`mpf-sec-med-content`); // Note: _buildSection needs better ID handling or we find the child
        const hdr = document.querySelector(`[onclick*="mpf-sec-med"]`);
        if (hdr) _toggleSection(hdr);
    }

    function _safe(v) {
        if (!v) return '';
        const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
        return v.toString().replace(/[&<>"']/g, m => map[m]);
    }

    function _safeAttr(v) {
        return (v || '').toString().replace(/'/g, '&#39;').replace(/"/g, '&quot;');
    }

    return { init, refresh, _toggleSection, _startEdit, _cancelEdit, _saveEdit, _toggleMedicalSection };
})();
