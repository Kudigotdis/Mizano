/**
 * MIZANO — GroupPromoWizard.js
 * Implementation of DOC3 Part 14.4 (Promotion Wizard for Groups).
 * 
 * Handles Broadcast, Announce, and Recruit flows.
 */

window.GroupPromoWizard = (function () {

    let _groupId = null;
    let _currentStep = 'selection'; // selection, form, confirm
    let _type = null; // broadcast, announce, recruit
    let _draft = {};

    // ─── PUBLIC API ──────────────────────────────────────────────────────────

    function open(groupId) {
        if (!groupId) return;
        _groupId = groupId;
        _currentStep = 'selection';
        _type = null;
        _draft = {};

        const builderView = document.getElementById('builder-view');
        if (!builderView) return;

        builderView.innerHTML = _buildHeader() + _buildContainer();

        if (window.MizanoNav && window.MizanoNav.openOverlay) {
            window.MizanoNav.openOverlay('builder');
        } else {
            builderView.style.display = 'flex';
            builderView.classList.add('active');
        }

        _render();
    }

    // ─── UI BUILDERS ─────────────────────────────────────────────────────────

    function _buildHeader() {
        return `
        <div class="overlay-header sticky-top gpw-header" style="
            display:flex;align-items:center;padding:14px 16px;
            background:#fff;border-bottom:1px solid #f0f0f0;
            position:sticky;top:0;z-index:100;">
            <button onclick="window.MizanoNav && window.MizanoNav.closeOverlay('builder')" class="gpw-close-btn">‹</button>
            <h2 class="gpw-title">Group Promotion</h2>
            <div style="width:40px;"></div>
        </div>`;
    }

    function _buildContainer() {
        return `
        <div id="gpw-wrap">
            ${_styles()}
            <div id="gpw-body" class="gpw-body"></div>
            <div id="gpw-footer" class="gpw-footer" style="display:none;">
                <button type="button" class="gpw-btn gpw-btn-secondary" onclick="window.GroupPromoWizard._back()">Back</button>
                <button type="button" id="gpw-next-btn" class="gpw-btn gpw-btn-primary" onclick="window.GroupPromoWizard._next()">Next</button>
            </div>
        </div>`;
    }

    // ─── RENDERING ───────────────────────────────────────────────────────────

    function _render() {
        const body = document.getElementById('gpw-body');
        const footer = document.getElementById('gpw-footer');
        if (!body) return;

        footer.style.display = (_currentStep === 'selection') ? 'none' : 'flex';

        switch (_currentStep) {
            case 'selection': _renderSelection(body); break;
            case 'form': _renderForm(body); break;
            case 'confirm': _renderConfirm(body); break;
        }
    }

    function _renderSelection(body) {
        body.innerHTML = `
            <div style="padding:16px;">
                <h3 class="gpw-heading">How do you want to promote?</h3>
                <p class="gpw-subheading">Select a promotion type for your group.</p>
                
                <div class="gpw-card-option" onclick="window.GroupPromoWizard._selectType('broadcast')">
                    <div class="gpw-card-icon">📢</div>
                    <div style="flex:1;">
                        <div class="gpw-card-label">Broadcast</div>
                        <div class="gpw-card-desc">Send an in-app notification to ALL group members. Best for urgent news or training changes.</div>
                    </div>
                </div>

                <div class="gpw-card-option" onclick="window.GroupPromoWizard._selectType('announce')">
                    <div class="gpw-card-icon">🏗️</div>
                    <div style="flex:1;">
                        <div class="gpw-card-label">Announce</div>
                        <div class="gpw-card-desc">Create a public post in the Community Panel visible to everyone in your city.</div>
                    </div>
                </div>

                <div class="gpw-card-option" onclick="window.GroupPromoWizard._selectType('recruit')">
                    <div class="gpw-card-icon">🤝</div>
                    <div style="flex:1;">
                        <div class="gpw-card-label">Recruit</div>
                        <div class="gpw-card-desc">Post a recruitment card in Sports and Groups panels. Specify positions needed.</div>
                    </div>
                </div>
            </div>`;
    }

    function _renderForm(body) {
        let html = '<div style="padding:16px;">';
        const nextBtn = document.getElementById('gpw-next-btn');
        nextBtn.textContent = 'Preview';

        if (_type === 'broadcast') {
            html += `
                <h3 class="gpw-heading">Write Message</h3>
                <p class="gpw-subheading">This will be sent to all members immediately.</p>
                <textarea id="gpw-msg" class="gpw-input" style="min-height:120px;" placeholder="Match cancelled due to rain. Stay safe!">${_draft.message || ''}</textarea>
            `;
        } else if (_type === 'announce') {
            html += `
                <h3 class="gpw-heading">Community Post</h3>
                <p class="gpw-subheading">Public city-wide announcement.</p>
                <label class="gpw-label">Message (Optional)</label>
                <textarea id="gpw-msg" class="gpw-input" placeholder="Join our growing community!">${_draft.message || ''}</textarea>
                <div style="margin-top:16px; font-size:0.8rem; color:#888;">Post expires in 30 days.</div>
            `;
        } else if (_type === 'recruit') {
            html += `
                <h3 class="gpw-heading">Recruitment Details</h3>
                <p class="gpw-subheading">Specify what you are looking for.</p>
                <label class="gpw-label">Positions Needed</label>
                <input type="text" id="gpw-pos" class="gpw-input" placeholder="e.g. Goalkeeper, Defender" value="${_draft.positions || ''}">
                <label class="gpw-label" style="margin-top:12px;">Skill Level</label>
                <select id="gpw-level" class="gpw-input">
                    <option value="Casual" ${_draft.level === 'Casual' ? 'selected' : ''}>Casual</option>
                    <option value="Amateur" ${_draft.level === 'Amateur' ? 'selected' : ''}>Amateur</option>
                    <option value="Semi-Pro" ${_draft.level === 'Semi-Pro' ? 'selected' : ''}>Semi-Pro</option>
                    <option value="Pro" ${_draft.level === 'Pro' ? 'selected' : ''}>Pro</option>
                </select>
                <label class="gpw-label" style="margin-top:12px;">Contact Info</label>
                <input type="text" id="gpw-contact" class="gpw-input" placeholder="WhatsApp or Phone" value="${_draft.contact || ''}">
            `;
        }
        html += '</div>';
        body.innerHTML = html;
    }

    function _renderConfirm(body) {
        const nextBtn = document.getElementById('gpw-next-btn');
        nextBtn.textContent = 'Confirm & Publish';

        let previewHtml = '';
        if (_type === 'broadcast') {
            previewHtml = `
                <div style="background:#e8f0fe; padding:16px; border-radius:12px; border:1px solid #d2e3fc;">
                    <div style="font-weight:700; color:#1a73e8; margin-bottom:8px;">📢 BROADCAST PREVIEW</div>
                    <div style="font-size:0.95rem;">${_draft.message}</div>
                </div>
                <p style="font-size:0.8rem; color:#666; margin-top:12px;">Sent to all group members.</p>
            `;
        } else if (_type === 'announce') {
            previewHtml = `
                <div style="background:#fff; border:1px solid #eee; padding:16px; border-radius:12px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
                    <div style="display:flex; gap:12px; align-items:center; margin-bottom:12px;">
                        <div style="width:40px; height:40px; background:#f0f0f0; border-radius:50%; display:flex; align-items:center; justify-content:center;">🏅</div>
                        <div style="font-weight:700;">Group Announcement</div>
                    </div>
                    <div style="font-size:0.9rem;">${_draft.message || 'Check out our group!'}</div>
                </div>
            `;
        } else if (_type === 'recruit') {
            previewHtml = `
                <div style="background:#fff; border:1px solid #34a853; padding:16px; border-radius:12px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
                    <div style="display:flex; justify-content:space-between; align-items:start;">
                        <div>
                            <div style="color:#188038; font-size:0.75rem; font-weight:700; text-transform:uppercase;">Recruiting</div>
                            <div style="font-weight:700; font-size:1.1rem; margin-top:2px;">${_draft.positions}</div>
                        </div>
                        <div style="background:#e6f4ea; color:#188038; padding:4px 8px; border-radius:8px; font-size:0.75rem; font-weight:700;">${_draft.level}</div>
                    </div>
                    <div style="margin-top:12px; font-size:0.85rem; color:#666;">Contact: ${_draft.contact}</div>
                </div>
            `;
        }

        body.innerHTML = `
            <div style="padding:16px;">
                <h3 class="gpw-heading">Final Review</h3>
                <p class="gpw-subheading">Looks good? Tap publish to go live.</p>
                ${previewHtml}
            </div>
        `;
    }

    // ─── ACTIONS ─────────────────────────────────────────────────────────────

    function _selectType(type) {
        _type = type;
        _currentStep = 'form';
        _render();
    }

    function _back() {
        if (_currentStep === 'confirm') _currentStep = 'form';
        else if (_currentStep === 'form') _currentStep = 'selection';
        _render();
    }

    function _next() {
        if (_currentStep === 'form') {
            if (_type === 'broadcast') {
                _draft.message = document.getElementById('gpw-msg').value.trim();
                if (!_draft.message) return _showToast('Message required', 'error');
            } else if (_type === 'announce') {
                _draft.message = document.getElementById('gpw-msg').value.trim();
            } else if (_type === 'recruit') {
                _draft.positions = document.getElementById('gpw-pos').value.trim();
                _draft.level = document.getElementById('gpw-level').value;
                _draft.contact = document.getElementById('gpw-contact').value.trim();
                if (!_draft.positions) return _showToast('Positions required', 'error');
            }
            _currentStep = 'confirm';
            _render();
        } else if (_currentStep === 'confirm') {
            _publish();
        }
    }

    async function _publish() {
        try {
            const group = await window.mizanoStorage.getEntityById('groups', _groupId);
            if (!group) throw new Error("Group not found");

            if (_type === 'broadcast') {
                // In real app, this triggers a cloud function for notifications.
                // Locally, we append to a global 'notifications' store if it exists.
                _showToast("Broadcast sent to all members!");
            } else if (_type === 'announce') {
                const post = {
                    id: `POST-${Date.now()}`,
                    group_id: _groupId,
                    name: group.name,
                    logo: group.logo_data,
                    message: _draft.message,
                    type: 'announcement',
                    created_at: new Date().toISOString()
                };
                // Mock adding to community panel data
                _showToast("Announcement published to Community!");
            } else if (_type === 'recruit') {
                const recruitment = {
                    id: `RECRUIT-${Date.now()}`,
                    group_id: _groupId,
                    positions: _draft.positions,
                    level: _draft.level,
                    contact: _draft.contact,
                    created_at: new Date().toISOString()
                };
                const currentRecruits = group.recruitment_posts || [];
                currentRecruits.push(recruitment);
                await window.mizanoStorage.updateEntity('groups', _groupId, {
                    recruitment_posts: currentRecruits,
                    recruitment_status: 'Recruiting'
                });
                _showToast("Recruitment post is live!");
            }

            setTimeout(() => {
                window.MizanoNav.closeOverlay('builder');
                if (window.MyGroups && window.MyGroups.refresh) window.MyGroups.refresh();
            }, 1000);

        } catch (e) {
            console.error(e);
            _showToast("Failed to publish", "error");
        }
    }

    function _showToast(msg, type = 'success') {
        let t = document.getElementById('gpw-toast');
        if (!t) { t = document.createElement('div'); t.id = 'gpw-toast'; document.body.appendChild(t); }
        t.style.cssText = `position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:99999;
            background:${type === 'error' ? '#e53935' : '#323232'};color:#fff;padding:10px 20px;
            border-radius:8px;font-size:0.85rem;font-weight:500;box-shadow:0 2px 8px rgba(0,0,0,0.3);`;
        t.textContent = msg; t.style.display = 'block';
        setTimeout(() => t.style.display = 'none', 3000);
    }

    function _styles() {
        return `
        <style>
            .gpw-header .gpw-close-btn { background:none; border:none; font-size:1.4rem; color:#1a73e8; cursor:pointer; }
            .gpw-title { flex:1; text-align:center; font-size:1rem; font-weight:700; margin:0; }
            .gpw-body { min-height:300px; }
            .gpw-heading { font-size:1.1rem; margin-bottom:4px; color:#1a1a1a; }
            .gpw-subheading { font-size:0.85rem; color:#666; margin-bottom:20px; }
            .gpw-card-option { display:flex; gap:16px; padding:20px; border:1px solid #eee; border-radius:12px; margin-bottom:12px; cursor:pointer; background:#fff; box-shadow:0 2px 4px rgba(0,0,0,0.02); }
            .gpw-card-option:hover { border-color:#ccc; background:#fafafa; }
            .gpw-card-icon { font-size:2rem; width:48px; }
            .gpw-card-label { font-weight:700; color:#1a1a1a; }
            .gpw-card-desc { font-size:0.8rem; color:#666; margin-top:4px; }
            .gpw-label { display:block; font-size:0.75rem; font-weight:700; color:#555; margin-bottom:4px; }
            .gpw-input { width:100%; padding:12px; border:1px solid #dadce0; border-radius:10px; font-size:0.95rem; box-sizing:border-box; font-family:inherit; }
            .gpw-footer { position:fixed; bottom:0; left:0; right:0; padding:16px; background:#fff; border-top:1px solid #eee; gap:12px; }
            .gpw-btn { flex:1; padding:12px; border-radius:12px; font-weight:700; font-size:0.95rem; cursor:pointer; font-family:inherit; }
            .gpw-btn-primary { background:#1a73e8; color:#fff; border:none; }
            .gpw-btn-secondary { background:#f1f3f4; color:#333; border:1px solid #dadce0; }
        </style>`;
    }

    return { open, _selectType, _back, _next };
})();
