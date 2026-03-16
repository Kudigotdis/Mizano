/**
 * MIZANO — MyGroups.js (Session 12/23 Upgrade)
 * Upgraded to DOC3 PART 14 Spec.
 *
 * MyGroups.init() → Opens the My Groups full-screen sub-panel.
 * Includes: 6 Collapsible sections, Member Mini-Profiles, and Universal Edit Pattern.
 */

window.MyGroups = (function () {

    // ─── STATE ────────────────────────────────────────────────────────────────
    let _groups = [];
    let _editingId = null;
    let _originalData = null;

    // ─── INIT ─────────────────────────────────────────────────────────────────

    async function init(container) {
        const userId = window.MizanoAuth?.getCurrentUser?.()?.uid;
        if (!userId) return;

        const target = container || document.getElementById('detail-view');
        if (!target) return;

        target.innerHTML = _buildHeader() + `<div id="mg-content-wrap" style="padding-bottom:120px;">
            <div style="padding:40px;text-align:center;"><span class="spinner" style="font-size:2rem;">⏳</span></div>
        </div>`;

        await refresh();
        if (window.MizanoNav) window.MizanoNav.openOverlay('detail');
    }

    async function refresh() {
        const userId = window.MizanoAuth?.getCurrentUser?.()?.uid;
        const wrap = document.getElementById('mg-content-wrap');
        if (!wrap || !userId) return;

        try {
            _groups = await window.mizanoStorage.getEntitiesByUser('groups', userId);
        } catch (e) {
            console.error('Failed to load My Groups', e);
            _groups = [];
        }

        if (!_groups || _groups.length === 0) {
            wrap.innerHTML = _buildEmptyState();
        } else {
            // Sort: Admin groups first per spec
            _groups.sort((a, b) => {
                const aRole = _getUserRole(a, userId);
                const bRole = _getUserRole(b, userId);
                const roleOrder = { 'Owner': 0, 'Admin': 1, 'Captain': 2, 'Coach': 3, 'Member': 4, 'Fan': 5 };
                return (roleOrder[aRole] || 99) - (roleOrder[bRole] || 99);
            });
            wrap.innerHTML = _buildFilterChips() + _groups.map(g => _buildGroupCard(g, userId)).join('') + _buildBottomActions();
            _attachListeners();
        }
    }

    // ─── UI COMPONENTS ────────────────────────────────────────────────────────

    function _buildHeader() {
        return `
        <div class="overlay-header sticky-top" style="display:flex;align-items:center;padding:14px 16px;background:#fff;border-bottom:1px solid #f0f0f0;position:sticky;top:0;z-index:100;">
            <button onclick="window.MizanoNav && window.MizanoNav.back()" style="background:none;border:none;font-size:1.4rem;cursor:pointer;color:#1a73e8;padding:4px 8px;font-weight:600;">‹</button>
            <h2 style="flex:1;text-align:center;font-size:1rem;font-weight:700;margin:0;color:#1a1a1a;">My Groups</h2>
            <div style="width:40px;"></div>
        </div>
        <style>
            .mg-card { background:#fff; margin:12px 16px; border-radius:12px; border:1px solid #e0e0e0; box-shadow:0 2px 8px rgba(0,0,0,0.04); overflow:hidden; }
            .mg-card-header { padding:16px; display:flex; align-items:center; cursor:pointer; }
            .mg-card-logo { width:54px; height:54px; border-radius:50%; background:#f0f0f0; display:flex; align-items:center; justify-content:center; font-size:1.6rem; margin-right:12px; flex-shrink:0; overflow:hidden; border: 2px solid #eee; }
            .mg-recruiting-border { border-color: #70AD47 !important; }
            .mg-card-title { font-weight:700; font-size:1.05rem; color:#1a1a1a; margin:0 0 4px; }
            .mg-card-meta { font-size:0.8rem; color:#666; display:flex; flex-wrap:wrap; align-items:center; gap:6px; }
            
            .pill { display:inline-block; padding:2px 8px; border-radius:12px; font-size:0.7rem; font-weight:700; }
            .pill-role-owner { background:#1a237e; color:#fff; }
            .pill-role-admin { background:#1a73e8; color:#fff; }
            .pill-role-captain { background:#008080; color:#fff; }
            .pill-role-coach { background:#2e7d32; color:#fff; }
            .pill-role-member { background:#757575; color:#fff; }
            .pill-status-recruiting { border:1px solid #70AD47; color:#70AD47; }
            .pill-status-full { border:1px solid #999; color:#999; }
            .pill-status-private { background:#333; color:#fff; }

            .mg-expanded-body { display:none; border-top:1px solid #f0f0f0; }
            .mg-section { border-bottom:1px solid #f0f0f0; }
            .mg-section-header { padding:14px 16px; display:flex; justify-content:space-between; align-items:center; cursor:pointer; background:#fff; font-weight:700; font-size:0.85rem; color:#555; text-transform:uppercase; letter-spacing:0.5px; }
            .mg-section-content { padding:12px 16px; background:#fafafa; display:none; }
            
            .mg-edit-chip { display:inline-flex; align-items:center; background:#e8f0fe; color:#1a73e8; font-size:0.75rem; font-weight:700; padding:4px 10px; border-radius:12px; cursor:pointer; margin-left:8px; }
            .mg-action-chip { display:inline-block; padding:8px 14px; background:#fff; border:1px solid #dadce0; border-radius:20px; font-size:0.8rem; font-weight:600; color:#1a1a1a; margin:0 8px 8px 0; cursor:pointer; }
            .mg-input { width:100%; padding:12px; border:1px solid #dadce0; border-radius:8px; font-size:0.9rem; margin-top:4px; font-family:inherit; background:#fff; }
            .mg-textarea { width:100%; padding:12px; border:1px solid #dadce0; border-radius:8px; font-size:0.9rem; margin-top:4px; font-family:inherit; min-height:80px; background:#fff; }

            .mg-editing-bar { position:fixed; bottom:0; left:0; right:0; background:#1a73e8; color:#fff; padding:12px 16px; display:flex; align-items:center; justify-content:space-between; z-index:9000; box-shadow:0 -4px 12px rgba(0,0,0,0.15); }
            .mg-btn-save { background:#fff; color:#1a73e8; border:none; padding:10px 24px; border-radius:20px; font-size:0.9rem; font-weight:700; cursor:pointer; }
            
            .avatar-grid { display:flex; flex-wrap:wrap; gap:12px; margin-top:8px; }
            .avatar-item { text-align:center; width:60px; cursor:pointer; }
            .avatar-circle { width:44px; height:44px; border-radius:50%; background:#e0e0e0; margin:0 auto 4px; display:flex; align-items:center; justify-content:center; font-size:1.2rem; overflow:hidden; }
            .avatar-name { font-size:0.7rem; color:#555; text-overflow:ellipsis; overflow:hidden; white-space:nowrap; }
        </style>`;
    }

    function _buildEmptyState() {
        return `<div style="padding:60px 24px;text-align:center;color:#666;">
            <div style="font-size:4rem;margin-bottom:20px;">🏟️</div>
            <h3 style="color:#1a1a1a;margin:0 0 12px;font-size:1.2rem;">No Groups added yet.</h3>
            <p style="font-size:0.9rem;line-height:1.6;margin:0 auto 30px;max-width:260px;">Create or join a team, club, or federation to start organizing.</p>
            <div style="display:flex;gap:12px;justify-content:center;">
                <button onclick="window.AddActionRouter.openForm('group')" style="background:#1a73e8;color:#fff;border:none;padding:12px 24px;border-radius:24px;font-weight:700;cursor:pointer;">Create Group</button>
                <button onclick="window.MizanoNav.openPanel(1)" style="background:#fff;color:#1a73e8;border:1px solid #1a73e8;padding:12px 24px;border-radius:24px;font-weight:700;cursor:pointer;">Browse</button>
            </div>
        </div>`;
    }

    function _buildBottomActions() {
        return `
        <div style="position:fixed; bottom:20px; left:0; right:0; display:flex; justify-content:center; pointer-events:none; z-index:1000;">
            <button onclick="window.AddActionRouter.openForm('group')" 
                style="background:#1a73e8; color:#fff; border:none; padding:14px 32px; border-radius:28px; font-weight:700; cursor:pointer; box-shadow:0 4px 12px rgba(26,115,232,0.4); pointer-events:auto;">
                + Create Group
            </button>
        </div>`;
    }

    function _buildFilterChips() {
        return `<div style="padding:12px 16px; display:flex; gap:8px; overflow-x:auto; -webkit-overflow-scrolling:touch;">
            <span class="filter-chip active" style="background:#1a73e8;color:#fff;padding:6px 14px;border-radius:16px;font-size:0.8rem;font-weight:600;white-space:nowrap;">All</span>
            <span class="filter-chip" style="background:#fff;border:1px solid #e0e0e0;color:#555;padding:6px 14px;border-radius:16px;font-size:0.8rem;font-weight:500;white-space:nowrap;">Admin</span>
            <span class="filter-chip" style="background:#fff;border:1px solid #e0e0e0;color:#555;padding:6px 14px;border-radius:16px;font-size:0.8rem;font-weight:500;white-space:nowrap;">Member</span>
            <span class="filter-chip" style="background:#fff;border:1px solid #e0e0e0;color:#555;padding:6px 14px;border-radius:16px;font-size:0.8rem;font-weight:500;white-space:nowrap;">Fan</span>
        </div>`;
    }

    function _buildGroupCard(g, currentUserId) {
        const id = g.local_id || g.group_id;
        const isEditing = (_editingId === id);
        const data = isEditing ? _originalData : g;

        const role = _getUserRole(g, currentUserId);
        const isAdmin = ['Owner', 'Admin'].includes(role);
        const recruitmentStatus = g.recruitment_status || 'Private';
        const isRecruiting = recruitmentStatus === 'Recruiting';

        const logoHtml = g.logo_data ? `<img src="${g.logo_data}" style="width:100%;height:100%;object-fit:cover;">` : `🏅`;

        return `
        <div class="mg-card" id="mg-card-${id}">
            <div class="mg-card-header mg-col-header" data-id="${id}">
                <div class="mg-card-logo ${isRecruiting ? 'mg-recruiting-border' : ''}">${logoHtml}</div>
                <div style="flex:1;min-width:0;">
                    <h4 class="mg-card-title">${_safe(data.name) || 'Unnamed Group'}</h4>
                    <div class="mg-card-meta">
                        <span style="font-weight:600;">${_safe(data.sport) || 'Sport'}</span> •
                        <span>${_safe(data.area)}, ${_safe(data.city)}</span>
                        ${data.association_name ? `<span style="color:#1a73e8;cursor:pointer;font-weight:600;" onclick="event.stopPropagation(); window.MyAssociations && window.MyAssociations.open('${data.association_id}')"> • ${_safe(data.association_name)}</span>` : ''}
                    </div>
                    ${data.venue_name ? `<div style="font-size:0.75rem;color:#1a73e8;cursor:pointer;margin-top:4px;" onclick="event.stopPropagation(); window.VenueDetail && window.VenueDetail.open('${data.venue_id}')">📍 ${_safe(data.venue_name)}</div>` : ''}
                    <div style="margin-top:6px;display:flex;gap:6px;align-items:center;">
                        <span class="pill pill-role-${role.toLowerCase()}">${role}</span>
                        <span class="pill pill-status-${recruitmentStatus.toLowerCase()}">${recruitmentStatus}</span>
                        <span style="font-size:0.75rem;color:#888;">${(data.members || []).length} members</span>
                    </div>
                </div>
            </div>
            
            <div class="mg-expanded-body" id="mg-body-${id}" style="${isEditing ? 'display:block;' : ''}">
                <!-- SECTION A: DESCRIPTION AND IDENTITY (Always open, non-collapsible header) -->
                <div class="mg-section-static" style="padding:16px; border-bottom:1px solid #f0f0f0;">
                    <div style="display:flex; justify-content:space-between; align-items:start;">
                        <div style="font-size:0.9rem; line-height:1.5; color:#444;">${_safe(data.bio) || 'No bio provided for this group.'}</div>
                        ${isAdmin && !isEditing ? `<div class="mg-edit-chip" onclick="window.MyGroups._startEdit('${id}')">✏️ Edit</div>` : ''}
                    </div>
                    ${isEditing ? _renderEditFormInputs(data) : ''}
                </div>

                <!-- SECTION B: NOTICE BOARD -->
                ${_buildSection('Notice Board', _renderNoticeBoard(data, isAdmin), 'mg-sec-notices')}

                <!-- SECTION C: EVENTS -->
                ${_buildSection('Events', _renderEvents(data, isAdmin), 'mg-sec-events')}

                <!-- SECTION D: CONTACTS -->
                ${_buildSection('Contacts', _renderContacts(data, isAdmin), 'mg-sec-contacts')}

                <!-- SECTION E: MEMBERS -->
                ${_buildSection('Members', _renderMembers(data, isAdmin), 'mg-sec-members')}

                <!-- SECTION F: ACTION CHIPS (Admin Only) -->
                ${isAdmin ? `
                <div class="mg-section" style="padding:16px;">
                    <div class="mg-action-chip" onclick="window.AddActionRouter.openForm('event', {group_id:'${id}'})">Post Event</div>
                    <div class="mg-action-chip" onclick="window.GroupPromoWizard.open('${id}')">Promote Group</div>
                    <div class="mg-action-chip" onclick="window.MyGroups._startEdit('${id}')">Edit Group</div>
                    <div class="mg-action-chip">Share Group</div>
                    <div class="mg-action-chip">View Public Profile</div>
                </div>` : ''}
            </div>
        </div>`;
    }

    function _buildSection(title, content, idPrefix) {
        return `
        <div class="mg-section">
            <div class="mg-section-header" onclick="window.MyGroups._toggleSection(this)">
                <span>${title}</span>
                <span class="mg-sec-arrow" style="font-size:1.2rem;color:#ccc;">⌄</span>
            </div>
            <div class="mg-section-content">
                ${content}
            </div>
        </div>`;
    }

    // ─── RENDERERS FOR SECTIONS ───────────────────────────────────────────────

    function _renderEditFormInputs(data) {
        return `
        <div style="margin-top:16px;">
            <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">Group Name</div>
            <input type="text" id="edit-name" class="mg-input" value="${_safeAttr(data.name)}">
            
            <div style="font-size:0.75rem; color:#888; margin-top:12px; margin-bottom:4px;">Bio / Description</div>
            <textarea id="edit-bio" class="mg-textarea">${_safeAttr(data.bio)}</textarea>

            <div style="display:flex; gap:12px; margin-top:12px;">
                <div style="flex:1;">
                    <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">City</div>
                    <input type="text" id="edit-city" class="mg-input" value="${_safeAttr(data.city)}">
                </div>
                <div style="flex:1;">
                    <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">Area</div>
                    <input type="text" id="edit-area" class="mg-input" value="${_safeAttr(data.area)}">
                </div>
            </div>

            <div style="display:flex; gap:12px; margin-top:12px;">
                <div style="flex:1;">
                    <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">Founded Year</div>
                    <input type="number" id="edit-year" class="mg-input" value="${_safeAttr(data.year_founded)}">
                </div>
                <div style="flex:1;">
                    <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">Recruitment</div>
                    <select id="edit-recruitment" class="mg-input">
                        <option value="Recruiting" ${data.recruitment_status === 'Recruiting' ? 'selected' : ''}>Recruiting</option>
                        <option value="Full" ${data.recruitment_status === 'Full' ? 'selected' : ''}>Full</option>
                        <option value="Private" ${data.recruitment_status === 'Private' ? 'selected' : ''}>Private</option>
                    </select>
                </div>
            </div>
        </div>`;
    }

    function _renderNoticeBoard(data, isAdmin) {
        const notices = data.notices || [];
        const top3 = notices.slice(0, 3);

        let html = notices.length === 0 ? '<div style="font-size:0.85rem;color:#888;">No recent notices.</div>' : '';

        top3.forEach(n => {
            html += `
            <div style="padding:10px 0; border-bottom:1px solid #eee;">
                <div style="font-weight:700; font-size:0.9rem;">${_safe(n.title)}</div>
                <div style="font-size:0.75rem; color:#888;">${_formatDate(n.date)}</div>
                <div style="font-size:0.85rem; color:#555; margin-top:4px;">${_safe(n.body)}</div>
            </div>`;
        });

        if (isAdmin) {
            html += `<div style="margin-top:12px; border-top:1px dashed #ccc; padding-top:12px;">
                <div class="mg-edit-chip" style="margin:0;">+ Add Notice</div>
            </div>`;
        }
        return html;
    }

    function _renderEvents(data, isAdmin) {
        const upcoming = (data.events || []).filter(ev => !ev.is_past);
        let html = upcoming.length === 0 ? '<div style="font-size:0.85rem;color:#888;">No upcoming events.</div>' : '';

        upcoming.forEach(ev => {
            html += `
            <div style="padding:10px 0; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #eee;">
                <div>
                    <div style="font-weight:700; font-size:0.9rem; color:#1a73e8; cursor:pointer;" onclick="window.MyEvents.viewDetail('${ev.id}')">${_safe(ev.title)}</div>
                    <div style="font-size:0.75rem; color:#666;">${_formatDate(ev.date)} • ${ev.venue_name}</div>
                </div>
                <span class="pill pill-status-upcoming">Upcoming</span>
            </div>`;
        });

        if (isAdmin) {
            html += `<div style="margin-top:12px;">
                <div class="mg-edit-chip" style="margin:0;" onclick="window.AddActionRouter.openForm('event', {group_id:'${data.local_id}'})">Post Event</div>
            </div>`;
        }
        return html;
    }

    function _renderContacts(data, isAdmin) {
        return `
        <div style="display:flex; flex-wrap:wrap; gap:10px;">
            <div class="mg-action-chip" style="margin:0;">📞 WhatsApp</div>
            <div class="mg-action-chip" style="margin:0;">💬 Messenger</div>
            <div class="mg-action-chip" style="margin:0;">☎️ Call</div>
        </div>
        ${data.affiliate_business_id ? `
        <div style="margin-top:16px; padding:12px; background:#fff; border:1px solid #eee; border-radius:12px; display:flex; align-items:center; gap:12px; cursor:pointer;" onclick="window.MyBusiness && window.MyBusiness.viewDetail('${data.affiliate_business_id}')">
            <div style="font-size:1.2rem;">🏢</div>
            <div>
                <div style="font-size:0.75rem; color:#888; font-weight:700;">OFFICIAL SPONSOR</div>
                <div style="font-weight:700; color:#1a73e8;">${data.affiliate_business_name || 'View Sponsor'}</div>
            </div>
        </div>` : ''}
        ${isAdmin ? `<div style="margin-top:12px; font-size:0.75rem; color:#1a73e8; font-weight:600; cursor:pointer;">+ Add Contact</div>` : ''}
        `;
    }

    function _renderMembers(data, isAdmin) {
        const admins = data.admins || [];
        const players = data.players || [];

        return `
        <div style="font-weight:700; font-size:0.75rem; color:#888; margin-bottom:8px;">Admins & Officials</div>
        <div class="avatar-grid">
            ${admins.map(a => `<div class="avatar-item" onclick="window.MyGroups._openMemberProfile('${a.uid}')">
                <div class="avatar-circle">👤</div>
                <div class="avatar-name">${_safe(a.name)}</div>
            </div>`).join('')}
        </div>

        <div style="font-weight:700; font-size:0.75rem; color:#888; margin-top:20px; margin-bottom:8px;">Players</div>
        <div class="avatar-grid">
            ${players.length === 0 ? '<div style="font-size:0.75rem; color:#bbb;">No players listed.</div>' : players.map(p => `
            <div class="avatar-item" onclick="window.MyGroups._openMemberProfile('${p.uid}')">
                <div class="avatar-circle">🏃</div>
                <div class="avatar-name">${_safe(p.name)}</div>
            </div>`).join('')}
        </div>
        
        ${isAdmin ? `<div style="margin-top:16px; border-top:1px dashed #ccc; padding-top:12px;">
            <div class="mg-edit-chip" style="margin:0;">+ Invite Member</div>
        </div>` : ''}
        `;
    }

    // ─── HANDLERS ─────────────────────────────────────────────────────────────

    function _attachListeners() {
        document.querySelectorAll('.mg-col-header').forEach(hdr => {
            hdr.addEventListener('click', () => {
                const id = hdr.dataset.id;
                if (_editingId === id) return;
                const body = document.getElementById(`mg-body-${id}`);
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
        hdr.style.background = isOpen ? '#fff' : '#f0f4f8';
    }

    // ─── UNIVERSAL EDIT PATTERN ───────────────────────────────────────────────

    function _startEdit(id) {
        if (_editingId) return _showToast('Finish editing the current group first', 'error');
        const group = _groups.find(g => (g.local_id || g.group_id) == id);
        if (!group) return;

        _editingId = id;
        _originalData = JSON.parse(JSON.stringify(group));
        refresh();

        _showEditingBar();
    }

    function _showEditingBar() {
        let bar = document.getElementById('mg-editing-bar');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'mg-editing-bar';
            bar.className = 'mg-editing-bar';
            bar.innerHTML = `
                <div>
                    <div style="font-weight:700;">Editing Group</div>
                    <div style="font-size:0.75rem; opacity:0.8;">Unsaved changes</div>
                </div>
                <div style="display:flex; gap:16px; align-items:center;">
                    <button style="background:none; border:none; color:#fff; font-weight:600; cursor:pointer;" onclick="window.MyGroups._cancelEdit()">Cancel</button>
                    <button class="mg-btn-save" onclick="window.MyGroups._saveEdit()">Save Changes</button>
                </div>`;
            document.body.appendChild(bar);
        }
    }

    function _cancelEdit() {
        _editingId = null;
        _originalData = null;
        _removeEditingBar();
        refresh();
    }

    async function _saveEdit() {
        if (!_editingId) return;

        const updates = {
            name: document.getElementById('edit-name')?.value.trim(),
            bio: document.getElementById('edit-bio')?.value.trim(),
            city: document.getElementById('edit-city')?.value.trim(),
            area: document.getElementById('edit-area')?.value.trim(),
            year_founded: document.getElementById('edit-year')?.value.trim(),
            recruitment_status: document.getElementById('edit-recruitment')?.value
        };

        try {
            await window.mizanoStorage.updateEntity('groups', _editingId, updates);
            _showToast('Group updated');
            _editingId = null;
            _removeEditingBar();
            refresh();
        } catch (e) {
            console.error('Save failed', e);
            _showToast('Update failed', 'error');
        }
    }

    function _removeEditingBar() {
        document.getElementById('mg-editing-bar')?.remove();
    }

    // ─── MEMBER MINI PROFILE ──────────────────────────────────────────────────

    function _openMemberProfile(uid) {
        // Overlay for mini profile
        const overlay = document.createElement('div');
        overlay.id = 'member-mini-overlay';
        overlay.style.cssText = `position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); z-index:10000; display:flex; align-items:center; justify-content:center; padding:20px;`;

        overlay.innerHTML = `
        <div style="background:#fff; width:100%; max-width:340px; border-radius:20px; overflow:hidden; animation:zoom 0.2s ease;">
            <div style="padding:20px; text-align:center; border-bottom:1px solid #f0f0f0;">
                <div style="width:80px; height:80px; border-radius:50%; background:#f0f0f0; margin:0 auto 12px; font-size:2.5rem; display:flex; align-items:center; justify-content:center;">👤</div>
                <h3 style="margin:0; font-size:1.1rem;">Member Name</h3>
                <div style="font-size:0.85rem; color:#1a73e8; font-weight:600;">Player</div>
            </div>
            <div style="padding:16px;">
                <div style="font-size:0.8rem; color:#666; margin-bottom:12px;">Interested in: Football, Basketball</div>
                <div style="display:flex; flex-wrap:wrap; gap:8px;">
                    <div class="pill" style="background:#e8f5e9; color:#2e7d32; padding:4px 10px;">Available Mon/Wed</div>
                </div>
            </div>
            <div style="padding:16px; background:#fafafa; display:flex; gap:10px;">
                <button style="flex:1; padding:12px; background:#1a73e8; color:#fff; border:none; border-radius:12px; font-weight:700; cursor:pointer;" onclick="this.closest('#member-mini-overlay').remove()">Message</button>
                <button style="flex:1; padding:12px; background:#fff; color:#1a73e8; border:1px solid #1a73e8; border-radius:12px; font-weight:700; cursor:pointer;" onclick="this.closest('#member-mini-overlay').remove()">Close</button>
            </div>
        </div>
        <style>@keyframes zoom { from {transform:scale(0.9); opacity:0;} to {transform:scale(1); opacity:1;} }</style>`;

        overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
        document.body.appendChild(overlay);
    }

    // ─── HELPERS ──────────────────────────────────────────────────────────────

    function _getUserRole(g, userId) {
        if (g.owner_uid === userId) return 'Owner';
        if ((g.admins || []).some(a => a.uid === userId)) return 'Admin';
        if ((g.captains || []).some(c => c.uid === userId)) return 'Captain';
        if ((g.coaches || []).some(c => c.uid === userId)) return 'Coach';
        if ((g.members || []).some(m => m.uid === userId)) return 'Member';
        return 'Fan';
    }

    function _safe(v) {
        if (!v) return '';
        const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
        return v.toString().replace(/[&<>"']/g, m => map[m]);
    }

    function _safeAttr(v) {
        return (v || '').toString().replace(/'/g, '&#39;').replace(/"/g, '&quot;');
    }

    function _formatDate(d) {
        if (!d) return 'TBD';
        try { return new Date(d).toLocaleDateString(); } catch (e) { return d; }
    }

    function _showToast(msg, type = 'success') {
        let t = document.getElementById('mg-toast');
        if (!t) { t = document.createElement('div'); t.id = 'mg-toast'; document.body.appendChild(t); }
        t.className = 'active';
        t.style.cssText = `position:fixed;bottom:100px;left:50%;transform:translateX(-50%);z-index:99999;background:${type === 'error' ? '#e53935' : '#323232'};color:#fff;padding:12px 24px;border-radius:24px;font-size:0.85rem;font-weight:600;box-shadow:0 4px 12px rgba(0,0,0,0.3);`;
        t.textContent = msg;
        setTimeout(() => { t.style.display = 'none'; }, 3000);
        t.style.display = 'block';
    }

    return { init, refresh, _toggleSection, _startEdit, _cancelEdit, _saveEdit, _openMemberProfile };
})();
