/**
 * MIZANO — MyVenues.js (Session 17/23 Upgrade)
 * Upgraded to DOC3 PART 19 Spec.
 */

window.MyVenues = (function () {

    // ─── STATE ────────────────────────────────────────────────────────────────
    let _venues = [];
    let _editingId = null;
    let _originalData = null;

    // ─── INIT ─────────────────────────────────────────────────────────────────

    async function init() {
        const userId = window.MizanoAuth?.getCurrentUserId?.();
        if (!userId) return;

        const detailView = document.getElementById('detail-view');
        if (!detailView) return;

        detailView.innerHTML = _buildHeader() + `<div id="mv-content-wrap" style="padding-bottom:120px;">
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
        const wrap = document.getElementById('mv-content-wrap');
        if (!wrap || !userId) return;

        try {
            _venues = await window.mizanoStorage.getEntitiesByUser('venues', userId);
        } catch (e) {
            console.error('Failed to load My Venues', e);
            _venues = [];
        }

        if (!_venues || _venues.length === 0) {
            wrap.innerHTML = _buildEmptyState();
        } else {
            _venues.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
            wrap.innerHTML = _buildFilterChips() + _venues.map(v => _buildCard(v)).join('');
            _attachListeners();
        }
    }

    // ─── UI COMPONENTS ────────────────────────────────────────────────────────

    function _buildHeader() {
        return `
        <div class="overlay-header sticky-top" style="display:flex;align-items:center;padding:14px 16px;background:#fff;border-bottom:1px solid #f0f0f0;position:sticky;top:0;z-index:100;">
            <button onclick="window.MizanoNav && window.MizanoNav.back()" style="background:none;border:none;font-size:1.4rem;cursor:pointer;color:#1a73e8;padding:4px 8px;font-weight:600;">‹</button>
            <h2 style="flex:1;text-align:center;font-size:1rem;font-weight:700;margin:0;color:#1a1a1a;">My Venues</h2>
            <button onclick="window.AddActionRouter.openForm('venue')" style="background:none;border:none;color:#1a73e8;font-weight:600;font-size:0.9rem;cursor:pointer;">+ Add</button>
        </div>
        <style>
            .mv-card { background:#fff; margin:12px 16px; border-radius:12px; border:1px solid #e0e0e0; box-shadow:0 2px 8px rgba(0,0,0,0.04); overflow:hidden; }
            .mv-card-header { padding:16px; display:flex; align-items:center; cursor:pointer; }
            .mv-card-img { width:64px; height:64px; border-radius:10px; background:#f0f0f0; margin-right:14px; flex-shrink:0; overflow:hidden; border:1px solid #eee; }
            .mv-card-title { font-weight:700; font-size:1.05rem; color:#1a1a1a; margin:0 0 4px; }
            .mv-card-meta { font-size:0.8rem; color:#666; display:flex; align-items:center; gap:8px; }
            
            .mv-expanded-body { display:none; border-top:1px solid #f0f0f0; }
            .mv-section { border-bottom:1px solid #f0f0f0; }
            .mv-section-header { padding:14px 16px; display:flex; justify-content:space-between; align-items:center; cursor:pointer; background:#fff; font-weight:700; font-size:0.85rem; color:#555; text-transform:uppercase; letter-spacing:0.5px; }
            .mv-section-content { padding:12px 16px; background:#fafafa; display:none; }

            .pill { display:inline-block; padding:2px 8px; border-radius:12px; font-size:0.7rem; font-weight:700; }
            .pill-open { background:#e8f5e9; color:#2e7d32; }
            .pill-closed { background:#ffebee; color:#c62828; }

            .mv-edit-chip { display:inline-flex; align-items:center; background:#e8f0fe; color:#1a73e8; font-size:0.75rem; font-weight:700; padding:4px 10px; border-radius:12px; cursor:pointer; }
            .mv-action-chip { display:inline-block; padding:8px 14px; background:#fff; border:1px solid #dadce0; border-radius:20px; font-size:0.8rem; font-weight:600; color:#1a1a1a; margin:0 8px 8px 0; cursor:pointer; }
            .mv-input { width:100%; padding:12px; border:1px solid #dadce0; border-radius:8px; font-size:0.9rem; margin-top:4px; font-family:inherit; }

            .venue-cover { width:100%; height:130px; background:#f0f0f0; position:relative; overflow:hidden; }
            .venue-title-overlay { position:absolute; bottom:10px; left:16px; color:#fff; font-weight:800; text-shadow:0 1px 4px rgba(0,0,0,0.6); font-size:1.1rem; }
        </style>`;
    }

    function _buildEmptyState() {
        return `<div style="padding:60px 24px;text-align:center;color:#666;">
            <div style="font-size:4rem;margin-bottom:20px;">🏟️</div>
            <h3 style="color:#1a1a1a;margin:0 0 12px;font-size:1.2rem;">No Venues Found</h3>
            <p style="font-size:0.9rem;line-height:1.6;margin:0 auto 30px;max-width:260px;">List your sports ground, court, or field to start managing bookings.</p>
            <button onclick="window.AddActionRouter.openForm('venue')" style="background:#1a73e8;color:#fff;border:none;padding:12px 24px;border-radius:24px;font-weight:700;cursor:pointer;">Add Venue</button>
        </div>`;
    }

    function _buildFilterChips() {
        return `<div style="padding:12px 16px; display:flex; gap:8px; overflow-x:auto;">
            <span class="filter-chip active" style="background:#1a73e8;color:#fff;padding:6px 14px;border-radius:16px;font-size:0.8rem;font-weight:600;white-space:nowrap;">All</span>
            <span class="filter-chip" style="background:#fff;border:1px solid #e0e0e0;color:#555;padding:6px 14px;border-radius:16px;font-size:0.8rem;font-weight:500;white-space:nowrap;">Pitches</span>
            <span class="filter-chip" style="background:#fff;border:1px solid #e0e0e0;color:#555;padding:6px 14px;border-radius:16px;font-size:0.8rem;font-weight:500;white-space:nowrap;">Courts</span>
        </div>`;
    }

    function _buildCard(v) {
        const id = v.local_id || v.venue_id;
        const isEditing = (_editingId === id);
        const data = isEditing ? _originalData : v;

        const photoUrl = (data.photos && data.photos[0]) ? data.photos[0] : '';
        const imgHtml = photoUrl ? `<img src="${photoUrl}" style="width:100%;height:100%;object-fit:cover;">` : `🏟️`;

        return `
        <div class="mv-card" id="mv-card-${id}">
            <div class="mv-card-header mv-col-header" data-id="${id}">
                <div class="mv-card-img">${imgHtml}</div>
                <div style="flex:1;min-width:0;">
                    <h4 class="mv-card-title">${_safe(data.name) || 'Unnamed Venue'}</h4>
                    <div class="mv-card-meta">
                        <span>${_safe(data.type)}</span> • <span>${_safe(data.city)}</span>
                    </div>
                    <div style="margin-top:6px;display:flex;gap:6px;align-items:center;">
                        <span class="pill pill-open">Open Now</span>
                        <span style="font-size:0.75rem;color:#888;">Surface: ${data.surface || 'Grass'}</span>
                    </div>
                </div>
            </div>
            
            <div class="mv-expanded-body" id="mv-body-${id}" style="${isEditing ? 'display:block;' : ''}">
                <!-- SECTION A: VENUE IDENTITY -->
                <div class="venue-cover" style="background:${photoUrl ? '#000' : '#1a73e8'};">
                    ${photoUrl ? `<img src="${photoUrl}" style="width:100%;height:100%;object-fit:cover;opacity:0.6;">` : ''}
                    <div class="venue-title-overlay">${_safe(data.name)}</div>
                    ${!isEditing ? `<div class="mv-edit-chip" style="position:absolute; top:12px; right:12px;" onclick="window.MyVenues._startEdit('${id}')">✏️ Edit</div>` : ''}
                </div>
                <div class="mv-section-static" style="padding:16px; background:#fff; border-bottom:1px solid #f0f0f0;">
                    <div style="font-size:0.9rem; line-height:1.5; color:#444;">
                        <strong>Headline:</strong> ${_safe(data.headline) || 'The community premiere sports destination.'}
                    </div>
                    <div style="margin-top:10px; font-size:0.85rem; color:#666;">
                        Owner: <span style="color:#1a73e8; cursor:pointer;" onclick="window.MyBusiness && window.MyBusiness.viewDetail('${data.business_id}')">${_safe(data.business_name || 'Mizano Corporate')}</span>
                    </div>
                    ${isEditing ? _renderEditFormInputs(data) : ''}
                </div>

                <!-- SECTION B: CATEGORIES AND AMENITIES -->
                ${_buildSection('Categories & Amenities', _renderAmenities(data), 'mv-sec-amen')}

                <!-- SECTION C: OPERATING HOURS & BOOKING -->
                ${_buildSection('Operating Hours & Booking', _renderBooking(data), 'mv-sec-book')}

                <!-- SECTION E: CONTACT & SUPPORT -->
                ${_buildSection('Contact & Support', _renderContact(data), 'mv-sec-contact')}

                <!-- SECTION F: REVENUE & ANALYTICS -->
                ${_buildSection('Revenue & Analytics', _renderAnalytics(data), 'mv-sec-stats')}

                <!-- ACTIONS -->
                <div class="mv-section" style="padding:16px;">
                    <button class="mv-action-chip" style="background:#1a73e8; color:#fff; border:none; width:100%; padding:12px; margin:0;">Configure Booking Calendar</button>
                    <div style="display:flex; gap:8px; margin-top:10px;">
                        <div class="mv-action-chip" style="flex:1; text-align:center; margin:0;">Share Profile</div>
                        <div class="mv-action-chip" style="flex:1; text-align:center; margin:0;" onclick="window.MyEvents && window.MyEvents.init()">📅 View Events</div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    function _buildSection(title, content, idPrefix) {
        return `
        <div class="mg-section">
            <div class="mg-section-header" onclick="window.MyVenues._toggleSection(this)">
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
            <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">Venue Name</div>
            <input type="text" id="edit-vn-name" class="mv-input" value="${_safeAttr(data.name)}">
            <div style="font-size:0.75rem; color:#888; margin-top:12px; margin-bottom:4px;">Headline</div>
            <input type="text" id="edit-vn-head" class="mv-input" value="${_safeAttr(data.headline)}">
            <div style="display:flex; gap:12px; margin-top:12px;">
                <div style="flex:1;">
                    <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">Type</div>
                    <input type="text" id="edit-vn-type" class="mv-input" value="${_safeAttr(data.type)}">
                </div>
                <div style="flex:1;">
                    <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">Surface</div>
                    <input type="text" id="edit-vn-surf" class="mv-input" value="${_safeAttr(data.surface)}">
                </div>
            </div>
        </div>`;
    }

    function _renderAmenities(data) {
        const amenities = data.amenities || ['Toilets', 'Water', 'Parking', 'Floodlights'];
        return `
        <div style="display:flex; flex-wrap:wrap; gap:6px;">
            ${amenities.map(a => `<span class="pill" style="border:1px solid #ddd; color:#555;">${_safe(a)}</span>`).join('')}
        </div>`;
    }

    function _renderBooking(data) {
        return `
        <div style="font-size:0.9rem; color:#444;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
                <span class="pill pill-open">Open Now</span>
                <span style="font-size:0.8rem; color:#888;">08:00 - 22:00</span>
            </div>
            <strong>Booking Rate:</strong> ${data.rate || '$15 / hr'}
            <div style="margin-top:10px; font-size:0.8rem; color:#666;">
                Capacity: ${data.capacity || 'N/A'} • Automated lights enabled.
            </div>
        </div>`;
    }

    function _renderContact(data) {
        return `
        <div style="display:flex; gap:10px;">
            <div class="mv-action-chip" style="margin:0;">📞 Call Caretaker</div>
            <div class="mv-action-chip" style="margin:0;">💬 In-App Support</div>
        </div>`;
    }

    function _renderAnalytics(data) {
        return `
        <div style="display:flex; gap:10px;">
            <div style="flex:1; background:#fff; padding:12px; border:1px solid #eee; border-radius:10px; text-align:center;">
                <div style="font-size:1.4rem; font-weight:800; color:#1a73e8;">$1,420</div>
                <div style="font-size:0.7rem; color:#888; text-transform:uppercase;">Total Earnings</div>
            </div>
            <div style="flex:1; background:#fff; padding:12px; border:1px solid #eee; border-radius:10px; text-align:center;">
                <div style="font-size:1.4rem; font-weight:800; color:#1a73e8;">88%</div>
                <div style="font-size:0.7rem; color:#888; text-transform:uppercase;">Pitch Occupancy</div>
            </div>
        </div>`;
    }

    // ─── HANDLERS ─────────────────────────────────────────────────────────────

    function _attachListeners() {
        document.querySelectorAll('.mv-col-header').forEach(hdr => {
            hdr.addEventListener('click', () => {
                const id = hdr.dataset.id;
                if (_editingId === id) return;
                const body = document.getElementById(`mv-body-${id}`);
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
        const v = _venues.find(x => (x.local_id || x.venue_id) == id);
        if (!v) return;
        _editingId = id;
        _originalData = JSON.parse(JSON.stringify(v));
        refresh();
        _showEditingBar();
    }

    function _showEditingBar() {
        let bar = document.getElementById('mv-editing-bar');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'mv-editing-bar';
            bar.style.cssText = `position:fixed; bottom:0; left:0; right:0; background:#1a73e8; color:#fff; padding:12px 16px; display:flex; align-items:center; justify-content:space-between; z-index:9000;`;
            bar.innerHTML = `
                <div><div style="font-weight:700;">Editing Venue</div><div style="font-size:0.75rem;opacity:0.8;">Unsaved changes</div></div>
                <div style="display:flex;gap:16px;align-items:center;">
                    <button style="background:none;border:none;color:#fff;font-weight:600;cursor:pointer;" onclick="window.MyVenues._cancelEdit()">Cancel</button>
                    <button style="background:#fff;color:#1a73e8;border:none;padding:10px 24px;border-radius:24px;font-weight:700;cursor:pointer;" onclick="window.MyVenues._saveEdit()">Save</button>
                </div>`;
            document.body.appendChild(bar);
        }
    }

    function _cancelEdit() {
        _editingId = null; _originalData = null;
        document.getElementById('mv-editing-bar')?.remove();
        refresh();
    }

    async function _saveEdit() {
        const updates = {
            name: document.getElementById('edit-vn-name')?.value.trim(),
            headline: document.getElementById('edit-vn-head')?.value.trim(),
            type: document.getElementById('edit-vn-type')?.value.trim(),
            surface: document.getElementById('edit-vn-surf')?.value.trim()
        };
        try {
            await window.mizanoStorage.updateEntity('venues', _editingId, updates);
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

    return { init, refresh, _toggleSection, _startEdit, _cancelEdit, _saveEdit };
})();
