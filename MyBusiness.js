/**
 * MIZANO — MyBusiness.js (Session 14/23 Upgrade)
 * Upgraded to DOC3 PART 17 Spec.
 */

window.MyBusiness = (function () {

    // ─── STATE ────────────────────────────────────────────────────────────────
    let _businesses = [];
    let _editingId = null;
    let _originalData = null;

    // ─── INIT ─────────────────────────────────────────────────────────────────

    async function init(container) {
        const userId = window.MizanoAuth?.getCurrentUser?.()?.uid;
        if (!userId) return;

        const target = container || document.getElementById('detail-view');
        if (!target) return;

        target.innerHTML = _buildHeader() + `<div id="mb-content-wrap" style="padding-bottom:120px;">
            <div style="padding:40px;text-align:center;"><span class="spinner" style="font-size:2rem;">⏳</span></div>
        </div>`;

        await refresh();
        if (window.MizanoNav) window.MizanoNav.openOverlay('detail');
    }

    async function refresh() {
        const userId = window.MizanoAuth?.getCurrentUser?.()?.uid;
        const wrap = document.getElementById('mb-content-wrap');
        if (!wrap || !userId) return;

        try {
            _businesses = await window.mizanoStorage.getEntitiesByUser('businesses', userId);
        } catch (e) {
            console.error('Failed to load My Businesses', e);
            _businesses = [];
        }

        if (!_businesses || _businesses.length === 0) {
            wrap.innerHTML = _buildEmptyState();
        } else {
            _businesses.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
            wrap.innerHTML = _buildFilterChips() + _businesses.map(b => _buildBusinessCard(b)).join('') + _buildBottomActions();
            _attachListeners();
        }
    }

    // ─── UI COMPONENTS ────────────────────────────────────────────────────────

    function _buildHeader() {
        return `
        <div class="overlay-header sticky-top" style="display:flex;align-items:center;padding:14px 16px;background:#fff;border-bottom:1px solid #f0f0f0;position:sticky;top:0;z-index:100;">
            <button onclick="window.MizanoNav && window.MizanoNav.back()" style="background:none;border:none;font-size:1.4rem;cursor:pointer;color:#1a73e8;padding:4px 8px;font-weight:600;">‹</button>
            <h2 style="flex:1;text-align:center;font-size:1rem;font-weight:700;margin:0;color:#1a1a1a;">My Business</h2>
            <div style="width:40px;"></div>
        </div>
        <style>
            .mb-card { background:#fff; margin:12px 16px; border-radius:12px; border:1px solid #e0e0e0; box-shadow:0 2px 8px rgba(0,0,0,0.04); overflow:hidden; }
            .mb-card-header { padding:16px; display:flex; align-items:center; cursor:pointer; }
            .mb-card-logo { width:56px; height:56px; border-radius:10px; background:#f4f8ff; border:1px solid #d2e3fc; display:flex; align-items:center; justify-content:center; margin-right:12px; flex-shrink:0; overflow:hidden;}
            .mb-card-title { font-weight:700; font-size:1.05rem; color:#1a1a1a; margin:0 0 4px; line-height:1.2; }
            .mb-card-meta { font-size:0.8rem; color:#666; display:flex; align-items:center; gap:8px; }
            
            .mb-expanded-body { display:none; border-top:1px solid #f0f0f0; }
            .mb-section { border-bottom:1px solid #f0f0f0; }
            .mb-section-header { padding:14px 16px; display:flex; justify-content:space-between; align-items:center; cursor:pointer; background:#fff; font-weight:700; font-size:0.85rem; color:#555; text-transform:uppercase; letter-spacing:0.5px; }
            .mb-section-content { padding:12px 16px; background:#fafafa; display:none; }

            .pill { display:inline-block; padding:2px 8px; border-radius:12px; font-size:0.7rem; font-weight:700; }
            .pill-open { background:#e8f5e9; color:#2e7d32; }
            .pill-closed { background:#ffebee; color:#c62828; }

            .mb-edit-chip { display:inline-flex; align-items:center; background:#e8f0fe; color:#1a73e8; font-size:0.75rem; font-weight:700; padding:4px 10px; border-radius:12px; cursor:pointer; }
            .mb-action-chip { display:inline-block; padding:8px 14px; background:#fff; border:1px solid #dadce0; border-radius:20px; font-size:0.8rem; font-weight:600; color:#1a1a1a; margin:0 8px 8px 0; cursor:pointer; }
            .mb-input { width:100%; padding:12px; border:1px solid #dadce0; border-radius:8px; font-size:0.9rem; margin-top:4px; font-family:inherit; }

            .mb-analytic-box { flex:1; background:#fff; padding:12px; border:1px solid #eee; border-radius:10px; text-align:center; }
            .mb-analytic-val { font-size:1.4rem; font-weight:800; color:#1a73e8; }
            .mb-analytic-label { font-size:0.7rem; color:#888; text-transform:uppercase; margin-top:2px; }
        </style>`;
    }

    function _buildEmptyState() {
        return `<div style="padding:60px 24px;text-align:center;color:#666;">
            <div style="font-size:4rem;margin-bottom:20px;">💼</div>
            <h3 style="color:#1a1a1a;margin:0 0 12px;font-size:1.2rem;">No Business added yet.</h3>
            <p style="font-size:0.9rem;line-height:1.6;margin:0 auto 30px;max-width:260px;">Put your business on the map, sell services, or list your sports shop.</p>
            <button onclick="window.AddActionRouter.openForm('business')" style="background:#1a73e8;color:#fff;border:none;padding:12px 24px;border-radius:24px;font-weight:700;cursor:pointer;">List Business</button>
        </div>`;
    }

    function _buildBottomActions() {
        return `
        <div style="position:fixed; bottom:20px; left:0; right:0; display:flex; justify-content:center; pointer-events:none; z-index:1000;">
            <button onclick="window.AddActionRouter.openForm('business')" 
                style="background:#1a73e8; color:#fff; border:none; padding:14px 32px; border-radius:28px; font-weight:700; cursor:pointer; box-shadow:0 4px 12px rgba(26,115,232,0.4); pointer-events:auto;">
                + List Business
            </button>
        </div>`;
    }

    function _buildFilterChips() {
        return `<div style="padding:12px 16px; display:flex; gap:8px; overflow-x:auto;">
            <span class="filter-chip active" style="background:#1a73e8;color:#fff;padding:6px 14px;border-radius:16px;font-size:0.8rem;font-weight:600;white-space:nowrap;">All</span>
            <span class="filter-chip" style="background:#fff;border:1px solid #e0e0e0;color:#555;padding:6px 14px;border-radius:16px;font-size:0.8rem;font-weight:500;white-space:nowrap;">Sports Shop</span>
            <span class="filter-chip" style="background:#fff;border:1px solid #e0e0e0;color:#555;padding:6px 14px;border-radius:16px;font-size:0.8rem;font-weight:500;white-space:nowrap;">Services</span>
        </div>`;
    }

    function _buildBusinessCard(bus) {
        const id = bus.local_id || bus.business_id;
        const isEditing = (_editingId === id);
        const data = isEditing ? _originalData : bus;

        const logoHtml = (data.photos && data.photos[0]) ? `<img src="${data.photos[0]}" style="width:100%;height:100%;object-fit:cover;">` : `🏢`;

        return `
        <div class="mb-card" id="mb-card-${id}">
            <div class="mb-card-header mb-col-header" data-id="${id}">
                <div class="mb-card-logo">${logoHtml}</div>
                <div style="flex:1;min-width:0;">
                    <h4 class="mb-card-title">${_safe(data.name) || 'Unnamed Business'}</h4>
                    <div class="mb-card-meta">
                        <span>${_safe(data.type)}</span> • <span>${_safe(data.city)}</span>
                    </div>
                    <div style="margin-top:6px;display:flex;gap:6px;align-items:center;">
                        <span class="pill pill-open">Open</span>
                        <span style="font-size:0.75rem;color:#888;">Est. ${data.year_established || 'TBD'}</span>
                    </div>
                </div>
            </div>
            
            <div class="mb-expanded-body" id="mb-body-${id}" style="${isEditing ? 'display:block;' : ''}">
                <!-- SECTION A: BUSINESS IDENTITY -->
                <div class="mb-section-static" style="padding:16px; border-bottom:1px solid #f0f0f0;">
                    <div style="display:flex; justify-content:space-between; align-items:start;">
                        <div style="font-size:0.9rem; line-height:1.5; color:#444;">
                            <strong>Headline:</strong> ${_safe(data.headline) || 'Providing quality products and services.'}
                            <div style="margin-top:6px; font-size:0.75rem; color:#888;">${_safe(data.description)}</div>
                        </div>
                        ${!isEditing ? `<div class="mb-edit-chip" onclick="window.MyBusiness._startEdit('${id}')">✏️ Edit</div>` : ''}
                    </div>
                    ${isEditing ? _renderEditFormInputs(data) : ''}
                </div>

                <!-- SECTION 4: VERIFICATION AND DOCUMENTS -->
                ${_buildSection('Verification & Documents', _renderVerification(data), 'mb-sec-verif')}

                <!-- SECTION 5: LINKED PROFILES -->
                ${_buildSection('Staff & Linked Profiles', _renderStaff(data), 'mb-sec-staff')}

                <!-- SECTION 6: LINKED GROUPS & ASSOCIATIONS -->
                ${_buildSection('Linked Groups & Associations', _renderLinkedEntities(data), 'mb-sec-linked')}

                <!-- SECTION 7: EVENTS & SPONSORSHIPS -->
                ${_buildSection('Events & Sponsorships', _renderSponsorships(data), 'mb-sec-spons')}

                <!-- SECTION 8: PROMOTIONAL FEED -->
                ${_buildSection('Promotional Feed', _renderPromos(data), 'mb-sec-promo')}

                <!-- SECTION 9: ANALYTICS -->
                ${_buildSection('Ad Revenue & Analytics', _renderAnalytics(data), 'mb-sec-stats')}

                <!-- SECTION 10: BILLING AND SUBSCRIPTION -->
                ${_buildSection('Billing & Subscription', _renderBilling(data), 'mb-sec-bill')}

                <!-- SECTION G: ACTION CHIPS -->
                <div class="mb-section" style="padding:16px;">
                    <button class="mb-action-chip" style="background:#1a73e8; color:#fff; border:none; width:100%; padding:12px; margin:0;" onclick="window.PromoBuilder.open('${id}')">Push New Promotion</button>
                    <div style="display:flex; gap:8px; margin-top:10px;">
                        <div class="mb-action-chip" style="flex:1; text-align:center; margin:0;">Share Profile</div>
                        <div class="mb-action-chip" style="flex:1; text-align:center; margin:0;">Public Profile</div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    function _buildSection(title, content, idPrefix) {
        return `
        <div class="mg-section">
            <div class="mg-section-header" onclick="window.MyBusiness._toggleSection(this)">
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
            <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">Business Name</div>
            <input type="text" id="edit-biz-name" class="mb-input" value="${_safeAttr(data.name)}">
            <div style="font-size:0.75rem; color:#888; margin-top:12px; margin-bottom:4px;">Headline</div>
            <input type="text" id="edit-biz-headline" class="mb-input" value="${_safeAttr(data.headline)}">
            <div style="font-size:0.75rem; color:#888; margin-top:12px; margin-bottom:4px;">Description</div>
            <textarea id="edit-biz-desc" class="mb-input" style="min-height:80px;">${_safeAttr(data.description)}</textarea>
        </div>`;
    }

    function _renderServices(data) {
        return `
        <div style="display:flex; flex-wrap:wrap; gap:6px;">
            <span class="pill" style="border:1px solid #ddd; color:#555;">${_safe(data.type)}</span>
        </div>
        <div style="margin-top:12px; font-size:0.85rem; color:#666;">
            No specific services listed. Add products or services to appear in search.
        </div>`;
    }

    function _renderLocation(data) {
        return `
        <div style="font-size:0.9rem; color:#444;">
            <div style="margin-bottom:8px;">📍 ${_safe(data.address)}, ${_safe(data.city)}</div>
            <div style="display:flex; align-items:center; gap:8px;">
                <span class="pill pill-open">Open Now</span>
                <span style="font-size:0.8rem; color:#888;">Closes at 18:00</span>
            </div>
            <button class="mb-action-chip" style="margin-top:10px; margin-bottom:0; font-size:0.75rem; padding:6px 12px;" onclick="window.open('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('${_safeAttr(data.name)} ${_safeAttr(data.city)}'))">🚗 Get Directions</button>
        </div>`;
    }

    function _renderVerification(data) {
        const status = data.verification_status || 'Not Submitted';
        const color = status === 'Verified' ? '#1a73e8' : (status === 'Pending' ? '#f29900' : '#888');
        return `
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
            <div style="flex:1;">
                <div style="font-weight:700; color:${color}; font-size:0.9rem;">${status}</div>
                <div style="font-size:0.75rem; color:#666;">CIPA Certification & Identity</div>
            </div>
            ${status === 'Not Submitted' ? `<button class="mb-edit-chip" onclick="window.MizanoShell.toast('Document upload coming soon', 'info')">Upload Docs</button>` : ''}
        </div>
        <p style="font-size:0.75rem; color:#888; margin:0;">Verified businesses get the sky-blue checkmark and appear higher in search results.</p>
        `;
    }

    function _renderLinkedEntities(data) {
        const groups = data.linked_groups || [];
        const assocs = data.linked_associations || [];
        if (groups.length === 0 && assocs.length === 0) return '<div style="font-size:0.85rem; color:#888;">No linked groups or associations.</div>';
        return `
        <div style="display:flex; flex-wrap:wrap; gap:8px;">
            ${groups.map(g => `<span class="mb-action-chip" onclick="window.MizanoNav.pushPage('group-detail', {groupId: '${g.id}'})">${_safe(g.name)}</span>`).join('')}
            ${assocs.map(a => `<span class="mb-action-chip" onclick="window.MizanoNav.pushPage('association-detail', {assocId: '${a.id}'})">${_safe(a.name)}</span>`).join('')}
        </div>`;
    }

    function _renderSponsorships(data) {
        const sponsored = data.sponsored_events || [];
        return `
        <button class="mb-action-chip" style="background:#e8f0fe; color:#1a73e8; border:1px solid #1a73e8; width:100%; margin-bottom:12px;" onclick="window.MizanoShell.toast('Event browser opening...', 'info')">Sponsor a Game</button>
        <div style="font-size:0.85rem; color:#666;">
            ${sponsored.length > 0 ? sponsored.map(e => `<div>🏆 Sponsored: ${e.name}</div>`).join('') : 'No active sponsorships.'}
        </div>`;
    }

    function _renderPromos(data) {
        const promos = data.promotions || [];
        if (promos.length === 0) return '<div style="font-size:0.85rem; color:#888;">No active promotions.</div>';
        return promos.map(p => `
            <div style="background:#fff; border:1px solid #eee; padding:10px; border-radius:8px; margin-bottom:8px;">
                <div style="font-weight:700; font-size:0.9rem; color:#c62828;">${_safe(p.headline)}</div>
                <div style="font-size:0.75rem; color:#888;">Expires: ${p.expiry_date}</div>
            </div>
        `).join('');
    }

    function _renderContact(data) {
        return `
        <div style="display:flex; gap:10px;">
            <div class="mb-action-chip" style="margin:0;">📞 WhatsApp</div>
            <div class="mb-action-chip" style="margin:0;">💬 Messenger</div>
        </div>`;
    }

    function _renderAnalytics(data) {
        return `
        <div style="display:flex; gap:10px;">
            <div class="mb-analytic-box">
                <div class="mb-analytic-val">420</div>
                <div class="mb-analytic-label">Profile Views</div>
            </div>
            <div class="mb-analytic-box">
                <div class="mb-analytic-val">12</div>
                <div class="mb-analytic-label">WhatsApp Taps</div>
            </div>
        </div>
        <div style="margin-top:12px; height:60px; background:#f5f5f5; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#999; font-size:0.75rem;">
            [ Engagement Chart Placeholder ]
        </div>`;
    }

    function _renderBilling(data) {
        const staffCount = (data.staff || []).length;
        const monthlyTotal = staffCount * 10;
        return `
        <div style="background:#fff; border:1px solid #eee; padding:12px; border-radius:10px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <span style="font-size:0.85rem; color:#666;">Current Plan</span>
                <span style="font-weight:700; color:#1a1a1a;">Basic (P10/profile)</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <span style="font-size:0.85rem; color:#666;">Linked Profiles</span>
                <span style="font-weight:700; color:#1a1a1a;">${staffCount} profiles</span>
            </div>
            <div style="border-top:1px dashed #eee; padding-top:8px; display:flex; justify-content:space-between;">
                <span style="font-weight:700; color:#1a1a1a;">Monthly Total</span>
                <span style="font-weight:800; color:#1a73e8; font-size:1.1rem;">P${monthlyTotal.toFixed(2)}</span>
            </div>
        </div>
        <div style="margin-top:12px; display:flex; gap:8px;">
            <button class="mb-edit-chip" style="flex:1; justify-content:center;">View Invoices</button>
            <button class="mb-edit-chip" style="flex:1; justify-content:center; background:#1a73e8; color:#fff;">Pay Now</button>
        </div>`;
    }

    // ─── HANDLERS ─────────────────────────────────────────────────────────────

    function _attachListeners() {
        document.querySelectorAll('.mb-col-header').forEach(hdr => {
            hdr.addEventListener('click', () => {
                const id = hdr.dataset.id;
                if (_editingId === id) return;
                const body = document.getElementById(`mb-body-${id}`);
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
        const b = _businesses.find(x => (x.local_id || x.business_id) == id);
        if (!b) return;
        _editingId = id;
        _originalData = JSON.parse(JSON.stringify(b));
        refresh();
        _showEditingBar();
    }

    function _renderStaff(data) {
        const staff = data.staff || [];
        return `
        <div class="avatar-grid" style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:15px;">
            ${staff.map(s => `
                <div style="text-align:center; width:60px; cursor:pointer;" onclick="window.MizanoNav.pushPage('profile-view', {userId: '${s.uid}'})">
                    <div style="width:44px; height:44px; border-radius:50%; background:#f0f0f0; margin:0 auto 4px; display:flex; align-items:center; justify-content:center; overflow:hidden;">
                        ${s.photo ? `<img src="${s.photo}" style="width:100%; height:100%; object-fit:cover;">` : '👤'}
                    </div>
                    <div style="font-size:0.65rem; color:#555; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${_safe(s.name)}</div>
                </div>
            `).join('')}
            <div style="text-align:center; width:60px; cursor:pointer;" onclick="window.MizanoShell.toast('Profile Builder opening...', 'info')">
                <div style="width:44px; height:44px; border-radius:50%; border:2px dashed #ccc; margin:0 auto 4px; display:flex; align-items:center; justify-content:center; color:#999; font-size:1.2rem;">+</div>
                <div style="font-size:0.65rem; color:#888;">Add</div>
            </div>
        </div>
        <p style="font-size:0.7rem; color:#888; margin:0;">Each linked profile adds P10.00 to your monthly subscription.</p>
        `;
    }

    function _showEditingBar() {
        let bar = document.getElementById('mb-editing-bar');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'mb-editing-bar';
            bar.style.cssText = `position:fixed; bottom:0; left:0; right:0; background:#1a73e8; color:#fff; padding:12px 16px; display:flex; align-items:center; justify-content:space-between; z-index:9000;`;
            bar.innerHTML = `
                <div><div style="font-weight:700;">Editing Listing</div><div style="font-size:0.75rem;opacity:0.8;">Unsaved changes</div></div>
                <div style="display:flex;gap:16px;align-items:center;">
                    <button style="background:none;border:none;color:#fff;font-weight:600;cursor:pointer;" onclick="window.MyBusiness._cancelEdit()">Cancel</button>
                    <button style="background:#fff;color:#1a73e8;border:none;padding:10px 24px;border-radius:24px;font-weight:700;cursor:pointer;" onclick="window.MyBusiness._saveEdit()">Save</button>
                </div>`;
            document.body.appendChild(bar);
        }
    }

    function _cancelEdit() {
        _editingId = null; _originalData = null;
        document.getElementById('mb-editing-bar')?.remove();
        refresh();
    }

    async function _saveEdit() {
        const updates = {
            name: document.getElementById('edit-biz-name')?.value.trim(),
            headline: document.getElementById('edit-biz-headline')?.value.trim(),
            description: document.getElementById('edit-biz-desc')?.value.trim()
        };
        try {
            await window.mizanoStorage.updateEntity('businesses', _editingId, updates);
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
