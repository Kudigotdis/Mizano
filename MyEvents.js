/**
 * MIZANO — MyEvents.js (Session 13/23 Upgrade)
 * Upgraded to DOC3 PART 16 Spec.
 */

window.MyEvents = (function () {

    // ─── STATE ────────────────────────────────────────────────────────────────
    let _events = [];
    let _editingId = null;
    let _originalData = null;

    // ─── INIT ─────────────────────────────────────────────────────────────────

    async function init(container) {
        const userId = window.MizanoAuth?.getCurrentUser?.()?.uid;
        if (!userId) return;

        const target = container || document.getElementById('detail-view');
        if (!target) return;

        target.innerHTML = _buildHeader() + `<div id="me-content-wrap" style="padding-bottom:120px;">
            <div style="padding:40px;text-align:center;"><span class="spinner" style="font-size:2rem;">⏳</span></div>
        </div>`;

        await refresh();
        if (window.MizanoNav) window.MizanoNav.openOverlay('detail');
    }

    async function refresh() {
        const userId = window.MizanoAuth?.getCurrentUser?.()?.uid;
        const wrap = document.getElementById('me-content-wrap');
        if (!wrap || !userId) return;

        try {
            _events = await window.mizanoStorage.getEntitiesByUser('activities', userId);
        } catch (e) {
            console.error('Failed to load My Events', e);
            _events = [];
        }

        if (!_events || _events.length === 0) {
            wrap.innerHTML = _buildEmptyState();
        } else {
            _events.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
            wrap.innerHTML = _buildFilterChips() + _events.map(e => _buildEventCard(e)).join('') + _buildBottomActions();
            _attachListeners();
        }
    }

    // ─── UI COMPONENTS ────────────────────────────────────────────────────────

    function _buildHeader() {
        return `
        <div class="overlay-header sticky-top" style="display:flex;align-items:center;padding:14px 16px;background:#fff;border-bottom:1px solid #f0f0f0;position:sticky;top:0;z-index:100;">
            <button onclick="window.MizanoNav && window.MizanoNav.back()" style="background:none;border:none;font-size:1.4rem;cursor:pointer;color:#1a73e8;padding:4px 8px;font-weight:600;">‹</button>
            <h2 style="flex:1;text-align:center;font-size:1rem;font-weight:700;margin:0;color:#1a1a1a;">My Events</h2>
            <div style="width:40px;"></div>
        </div>
        <style>
            .me-card { background:#fff; margin:12px 16px; border-radius:12px; border:1px solid #e0e0e0; box-shadow:0 2px 8px rgba(0,0,0,0.04); overflow:hidden; }
            .me-card-header { padding:16px; display:flex; align-items:center; cursor:pointer; }
            .me-card-img { width:64px; height:64px; border-radius:8px; background:#f0f0f0; margin-right:14px; flex-shrink:0; overflow:hidden; border:1px solid #eee; }
            .me-card-title { font-weight:700; font-size:1.05rem; color:#1a1a1a; margin:0 0 4px; line-height:1.2; }
            .me-card-meta { font-size:0.8rem; color:#666; display:flex; align-items:center; gap:8px; }
            
            .me-expanded-body { display:none; border-top:1px solid #f0f0f0; }
            .me-section { border-bottom:1px solid #f0f0f0; }
            .me-section-header { padding:14px 16px; display:flex; justify-content:space-between; align-items:center; cursor:pointer; background:#fff; font-weight:700; font-size:0.85rem; color:#555; text-transform:uppercase; letter-spacing:0.5px; }
            .me-section-content { padding:12px 16px; background:#fafafa; display:none; }

            .pill { display:inline-block; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:700; }
            .pill-live { background:#ffd54f; color:#000; }
            .pill-finished { background:#424242; color:#fff; }
            .pill-upcoming { background:#e8f5e9; color:#2e7d32; }

            .me-edit-chip { display:inline-flex; align-items:center; background:#e8f0fe; color:#1a73e8; font-size:0.75rem; font-weight:700; padding:4px 10px; border-radius:12px; cursor:pointer; }
            .me-action-chip { display:inline-block; padding:8px 14px; background:#fff; border:1px solid #dadce0; border-radius:20px; font-size:0.8rem; font-weight:600; color:#1a1a1a; margin:0 8px 8px 0; cursor:pointer; }
            .me-input { width:100%; padding:12px; border:1px solid #dadce0; border-radius:8px; font-size:0.9rem; margin-top:4px; font-family:inherit; }

            .cover-photo { width:100%; height:140px; background:#f0f0f0; position:relative; overflow:hidden; }
            .cover-text { position:absolute; bottom:10px; left:16px; color:#fff; font-weight:800; text-shadow:0 1px 4px rgba(0,0,0,0.5); font-size:1.2rem; }
        </style>`;
    }

    function _buildEmptyState() {
        return `<div style="padding:60px 24px;text-align:center;color:#666;">
            <div style="font-size:4rem;margin-bottom:20px;">📅</div>
            <h3 style="color:#1a1a1a;margin:0 0 12px;font-size:1.2rem;">No Events added yet.</h3>
            <p style="font-size:0.9rem;line-height:1.6;margin:0 auto 30px;max-width:260px;">Create your first social game, tournament or practice session.</p>
            <button onclick="window.AddActionRouter.openForm('event')" style="background:#1a73e8;color:#fff;border:none;padding:12px 24px;border-radius:24px;font-weight:700;cursor:pointer;">Create Event</button>
        </div>`;
    }

    function _buildBottomActions() {
        return `
        <div style="position:fixed; bottom:20px; left:0; right:0; display:flex; justify-content:center; pointer-events:none; z-index:1000;">
            <button onclick="window.AddActionRouter.openForm('event')" 
                style="background:#1a73e8; color:#fff; border:none; padding:14px 32px; border-radius:28px; font-weight:700; cursor:pointer; box-shadow:0 4px 12px rgba(26,115,232,0.4); pointer-events:auto;">
                + Create Event
            </button>
        </div>`;
    }

    function _buildFilterChips() {
        return `<div style="padding:12px 16px; display:flex; gap:8px; overflow-x:auto;">
            <span class="filter-chip active" style="background:#1a73e8;color:#fff;padding:6px 14px;border-radius:16px;font-size:0.8rem;font-weight:600;white-space:nowrap;">Upcoming</span>
            <span class="filter-chip" style="background:#fff;border:1px solid #e0e0e0;color:#555;padding:6px 14px;border-radius:16px;font-size:0.8rem;font-weight:500;white-space:nowrap;">Live</span>
            <span class="filter-chip" style="background:#fff;border:1px solid #e0e0e0;color:#555;padding:6px 14px;border-radius:16px;font-size:0.8rem;font-weight:500;white-space:nowrap;">Finished</span>
        </div>`;
    }

    function _buildEventCard(evt) {
        const id = evt.local_id || evt.activity_id;
        const isEditing = (_editingId === id);
        const data = isEditing ? _originalData : evt;

        const isLive = data.status === 'Live';
        const isFinished = data.status === 'Finished';
        const statusClass = isLive ? 'pill-live' : (isFinished ? 'pill-finished' : 'pill-upcoming');

        const imgHtml = data.image_url ? `<img src="${data.image_url}" style="width:100%;height:100%;object-fit:cover;">` : `🎯`;

        return `
        <div class="me-card" id="me-card-${id}">
            <div class="me-card-header me-col-header" data-id="${id}">
                <div class="me-card-img">${imgHtml}</div>
                <div style="flex:1;min-width:0;">
                    <h4 class="me-card-title">${_safe(data.title) || 'Untitled Event'}</h4>
                    <div class="me-card-meta">
                        <span>${_safe(data.date)} at ${_safe(data.time)}</span>
                    </div>
                    <div style="margin-top:6px;display:flex;gap:6px;align-items:center;">
                        <span class="pill ${statusClass}">${data.status || 'Upcoming'}</span>
                        <span style="font-size:0.75rem;color:#1a73e8;cursor:pointer;font-weight:600;" onclick="event.stopPropagation(); window.VenueDetail && window.VenueDetail.open('${data.venue_id}')">${data.venue_name || 'TBD'}</span>
                    </div>
                </div>
            </div>
            
            <div class="me-expanded-body" id="me-body-${id}" style="${isEditing ? 'display:block;' : ''}">
                <!-- SECTION A: COVER PHOTO AND GALLERY -->
                <div class="cover-photo" style="background:${isFinished ? '#333' : '#1a73e8'};">
                    ${data.image_url ? `<img src="${data.image_url}" style="width:100%;height:100%;object-fit:cover;opacity:0.6;">` : ''}
                    <div class="cover-text">${_safe(data.title)}</div>
                    ${!isEditing ? `<div class="me-edit-chip" style="position:absolute; top:12px; right:12px;" onclick="window.MyEvents._startEdit('${id}')">✏️ Edit</div>` : ''}
                </div>

                <!-- SECTION B: EVENT DESCRIPTION -->
                <div class="me-section-static" style="padding:16px; background:#fff; border-bottom:1px solid #f0f0f0;">
                    <div style="font-size:0.9rem; line-height:1.5; color:#444;">
                        ${_safe(data.description) || 'Join us for this exciting sporting event!'}
                        <div style="margin-top:10px; font-size:0.8rem; color:#666;">
                            <strong>Eligibility:</strong> ${data.eligibility || 'Open to all'} • 
                            <strong>Prizes:</strong> ${data.prizes || 'Standard'}
                        </div>
                    </div>
                    ${isEditing ? _renderEditFormInputs(data) : ''}
                </div>

                <!-- SECTION C: SCHEDULE & LOCATION -->
                ${_buildSection('Schedule & Location', _renderSchedule(data), 'me-sec-sched')}

                <!-- SECTION D: ORGANISER -->
                ${_buildSection('Organiser', _renderOrganiser(data), 'me-sec-org')}

                <!-- SECTION E: REGISTRATION & BOOKING -->
                ${_buildSection('Registration & Booking', _renderRegistration(data), 'me-sec-reg')}

                <!-- SECTION F: RESULTS (If Finished) -->
                ${isFinished ? _buildSection('Results & Highlights', _renderResults(data), 'me-sec-res') : ''}

                <!-- ACTIONS -->
                <div class="me-section" style="padding:16px;">
                    <button class="me-action-chip" style="background:#1a73e8; color:#fff; border:none; width:100%; padding:12px; margin:0;" onclick="window.MyEvents._openBooking('${id}')">Manage Booking / Roster</button>
                    <div style="display:flex; gap:8px; margin-top:10px;">
                        <div class="me-action-chip" style="flex:1; text-align:center; margin:0;">Share</div>
                        <div class="me-action-chip" style="flex:1; text-align:center; margin:0;">Public Link</div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    function _buildSection(title, content, idPrefix) {
        return `
        <div class="mg-section">
            <div class="mg-section-header" onclick="window.MyEvents._toggleSection(this)">
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
            <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">Event Title</div>
            <input type="text" id="edit-ev-title" class="me-input" value="${_safeAttr(data.title)}">
            <div style="font-size:0.75rem; color:#888; margin-top:12px; margin-bottom:4px;">Description</div>
            <textarea id="edit-ev-desc" class="me-input" style="min-height:80px;">${_safeAttr(data.description)}</textarea>
            <div style="display:flex; gap:12px; margin-top:12px;">
                <div style="flex:1;">
                    <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">Date</div>
                    <input type="date" id="edit-ev-date" class="me-input" value="${_safeAttr(data.date)}">
                </div>
                <div style="flex:1;">
                    <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">Time</div>
                    <input type="time" id="edit-ev-time" class="me-input" value="${_safeAttr(data.time)}">
                </div>
            </div>
        </div>`;
    }

    function _renderSchedule(data) {
        return `
        <div style="font-size:0.9rem; color:#444;">
            <div style="margin-bottom:8px;">📍 <strong>Venue:</strong> <span style="color:#1a73e8;cursor:pointer;font-weight:700;" onclick="window.VenueDetail && window.VenueDetail.open('${data.venue_id}')">${data.venue_name || 'Not set'}</span></div>
            <div style="margin-top:4px;">🕒 <strong>Time:</strong> ${data.time} - ${data.end_time || 'TBD'}</div>
            <div style="margin-top:10px;">
                <button class="me-action-chip" style="margin:0;font-size:0.75rem;padding:6px 12px;" onclick="window.open('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('${_safeAttr(data.venue_name)} ${_safeAttr(data.city)}'))">🚗 Get Directions</button>
            </div>
            <div style="margin-top:12px; background:#fff; border:1px solid #eee; padding:10px; border-radius:8px; font-size:0.8rem;">
                This is a recurring event every ${data.recurrence || 'week'}.
            </div>
        </div>`;
    }

    function _renderOrganiser(data) {
        return `
        <div style="display:flex; align-items:center; gap:12px; cursor:pointer;" onclick="window.MyEvents._navigateOrganiser('${data.organiser_type}','${data.organiser_id}')">
            <div style="width:36px; height:36px; border-radius:50%; background:#e8f0fe; display:flex; align-items:center; justify-content:center;">🏅</div>
            <div>
                <div style="font-weight:700; color:#1a73e8;">${data.organiser_name || 'Mizano Official'}</div>
                <div style="font-size:0.75rem; color:#666;">Verified Organiser</div>
            </div>
        </div>`;
    }

    function _renderRegistration(data) {
        const count = (data.participants || []).length;
        const max = data.max_participants || 20;
        const progress = (count / max) * 100;
        return `
        <div style="font-size:0.9rem;">
            <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                <span>Capacity: <strong>${count} / ${max}</strong></span>
                <span style="color:#1a73e8; font-weight:700;">${Math.round(progress)}% Full</span>
            </div>
            <div style="width:100%; height:8px; background:#eee; border-radius:4px; overflow:hidden;">
                <div style="width:${progress}%; height:100%; background:#1a73e8;"></div>
            </div>
            <div style="margin-top:12px; font-size:0.8rem; color:#666; display:flex; justify-content:space-between; align-items:center;">
                <div>Price: ${data.price || 'Free'} • Deadline: ${data.deadline || '1 day before'}</div>
                <div style="color:#1a73e8; font-weight:700; cursor:pointer;" onclick="window.MyEvents._viewAttendees('${data.local_id || data.activity_id}')">View Attendees ›</div>
            </div>
        </div>`;
    }

    function _renderResults(data) {
        return `<div style="font-size:0.85rem; color:#1a73e8; font-weight:700;">🏆 View Scorecard & Highlights</div>`;
    }

    // ─── HANDLERS ─────────────────────────────────────────────────────────────

    function _attachListeners() {
        document.querySelectorAll('.me-col-header').forEach(hdr => {
            hdr.addEventListener('click', () => {
                const id = hdr.dataset.id;
                if (_editingId === id) return;
                const body = document.getElementById(`me-body-${id}`);
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
        const ev = _events.find(e => (e.local_id || e.activity_id) == id);
        if (!ev) return;
        _editingId = id;
        _originalData = JSON.parse(JSON.stringify(ev));
        refresh();
        _showEditingBar();
    }

    function _showEditingBar() {
        let bar = document.getElementById('me-editing-bar');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'me-editing-bar';
            bar.className = 'ma-editing-bar'; // reuse CSS from Associations if needed
            bar.style.cssText = `position:fixed; bottom:0; left:0; right:0; background:#1a73e8; color:#fff; padding:12px 16px; display:flex; align-items:center; justify-content:space-between; z-index:9000;`;
            bar.innerHTML = `
                <div><div style="font-weight:700;">Editing Event</div><div style="font-size:0.75rem;opacity:0.8;">Unsaved changes</div></div>
                <div style="display:flex;gap:16px;align-items:center;">
                    <button style="background:none;border:none;color:#fff;font-weight:600;cursor:pointer;" onclick="window.MyEvents._cancelEdit()">Cancel</button>
                    <button style="background:#fff;color:#1a73e8;border:none;padding:10px 24px;border-radius:24px;font-weight:700;cursor:pointer;" onclick="window.MyEvents._saveEdit()">Save</button>
                </div>`;
            document.body.appendChild(bar);
        }
    }

    function _cancelEdit() {
        _editingId = null; _originalData = null;
        document.getElementById('me-editing-bar')?.remove();
        refresh();
    }

    async function _saveEdit() {
        const updates = {
            title: document.getElementById('edit-ev-title')?.value.trim(),
            description: document.getElementById('edit-ev-desc')?.value.trim(),
            date: document.getElementById('edit-ev-date')?.value.trim(),
            time: document.getElementById('edit-ev-time')?.value.trim()
        };
        try {
            await window.mizanoStorage.updateEntity('activities', _editingId, updates);
            _cancelEdit();
        } catch (e) {
            console.error(e);
        }
    }

    function _openBooking(id) {
        alert('Booking / Roster Management coming soon!');
    }

    function _navigateOrganiser(type, id) {
        if (type === 'group' && window.MyGroups) window.MyGroups.viewDetail(id);
        else if (type === 'association' && window.MyAssociations) window.MyAssociations.open(id);
        else if (window.ProfileDetail) window.ProfileDetail.open(id);
    }

    function _viewAttendees(id) {
        const ev = _events.find(e => (e.local_id || e.activity_id) == id);
        if (!ev || !ev.participants) return;

        // Simple overlay for attendees
        const overlay = document.createElement('div');
        overlay.id = 'attendee-list-overlay';
        overlay.style.cssText = `position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); z-index:10000; display:flex; align-items:center; justify-content:center; padding:20px;`;

        let listHtml = ev.participants.map(p => `
            <div style="display:flex; align-items:center; gap:12px; padding:12px; border-bottom:1px solid #f0f0f0; cursor:pointer;" onclick="window.MyGroups._openMemberProfile('${p.uid}')">
                <div style="width:34px; height:34px; border-radius:50%; background:#e0e0e0; display:flex; align-items:center; justify-content:center;">👤</div>
                <div style="font-weight:600;">${_safe(p.name)}</div>
            </div>
        `).join('');

        overlay.innerHTML = `
        <div style="background:#fff; width:100%; max-width:340px; border-radius:20px; overflow:hidden;">
            <div style="padding:16px; border-bottom:1px solid #eee; font-weight:700; text-align:center;">Attendees</div>
            <div style="max-height:400px; overflow-y:auto;">${listHtml || '<div style="padding:20px; text-align:center; color:#888;">No participants yet</div>'}</div>
            <div style="padding:16px;"><button style="width:100%; padding:12px; background:#f1f3f4; border:none; border-radius:12px; font-weight:700; cursor:pointer;" onclick="this.closest('#attendee-list-overlay').remove()">Close</button></div>
        </div>`;
        document.body.appendChild(overlay);
    }

    return { init, refresh, _toggleSection, _startEdit, _cancelEdit, _saveEdit, _openBooking, _navigateOrganiser, _viewAttendees };
})();
