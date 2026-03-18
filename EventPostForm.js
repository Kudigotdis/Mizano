window.EventPostForm = (function () {

    let _pollManager = null;

    function render() {
        return `
        <div id="ep-form-wrap" style="padding:16px 0 100px;font-family:inherit;">
            ${_styles()}
            
            <div style="background:#e8f0fe;color:#1a73e8;padding:12px;border-radius:8px;font-size:0.8rem;margin-bottom:16px;line-height:1.4;">
                <b>Create a Post</b>
                Share news, updates, or announcements. Posts appear in the Community Feed.
            </div>

            <!-- ── SECTION 1: VISIBILITY & CONTEXT ────────────────── -->
            <label class="ep-label">Post Visibility</label>
            <select id="ep-visibility" class="ep-input" style="margin-bottom:16px;" onchange="window.EventPostForm._toggleVis(this.value)">
                <option value="public">Public (Everyone)</option>
                <option value="followers">My Followers Only</option>
                <option value="group">Specific Group Only</option>
            </select>
            
            <div id="ep-group-select-wrap" style="display:none;margin-bottom:16px;background:#f8f9fa;padding:12px;border-radius:8px;border:1px solid #eee;">
                <label class="ep-label">Select Group</label>
                <div style="position:relative;">
                    <input type="text" id="ep-group-search" class="ep-input" placeholder="Search my groups..." oninput="window.EventPostForm._searchGroup(this.value)">
                    <div id="ep-group-results" class="ep-dropdown-list" style="display:none;"></div>
                </div>
                <div id="ep-group-selected" style="display:none;align-items:center;justify-content:space-between;background:#e8f0fe;padding:8px 12px;border-radius:6px;border:1px solid #1a73e8;margin-top:4px;">
                    <span id="ep-group-name-disp" style="font-size:0.85rem;color:#1a73e8;font-weight:600;"></span>
                    <span style="color:#e53935;cursor:pointer;font-weight:700;padding:4px;" onclick="window.EventPostForm._removeGroup()">×</span>
                </div>
                <input type="hidden" id="ep-group-id">
            </div>

            <!-- ── SECTION 2: CONTENT ────────────────────────────── -->
            <div class="ep-section" style="border:1px solid #f0f0f0;border-radius:12px;margin-bottom:16px;">
                <div class="ep-section-body" style="padding:12px;">
                    <textarea id="ep-content" class="ep-input ep-textarea" placeholder="What's going on? Share an update or announcement..." style="min-height:120px;border-color:transparent;background:#f9f9f9;font-size:1rem;"></textarea>
                    
                    <div id="ep-photo-preview-wrap" style="display:none;margin-top:12px;position:relative;border-radius:8px;overflow:hidden;">
                        <img id="ep-photo-preview" style="width:100%;max-height:300px;object-fit:cover;display:block;">
                        <div style="position:absolute;top:8px;right:8px;background:rgba(0,0,0,0.6);color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1rem;cursor:pointer;" onclick="window.EventPostForm._removePhoto()">×</div>
                    </div>

                    <div id="ep-poll-wrap" style="display:none;margin-top:12px;padding:12px;background:#fcfcfc;border:1px dashed #ccc;border-radius:8px;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                            <label class="ep-label" style="margin:0;">📊 Poll Options</label>
                            <button type="button" class="af-text-btn" style="color:#e53935;font-size:0.75rem;" onclick="window.EventPostForm._togglePoll(false)">Remove Poll</button>
                        </div>
                        <div id="ep-poll-options-list"></div>
                        <button type="button" class="af-text-btn" style="margin-top:8px;font-size:0.75rem;" onclick="window.EventPostForm._addPollOption()">+ Add Option</button>
                    </div>

                    <div style="display:flex;align-items:center;justify-content:space-between;margin-top:12px;padding-top:12px;border-top:1px solid #eee;">
                        <div style="display:flex;gap:16px;">
                            <button type="button" class="ep-icon-btn" onclick="document.getElementById('ep-photo-input').click()" title="Add Photo">📷</button>
                            <button type="button" class="ep-icon-btn" onclick="window.EventPostForm._togglePoll(true)" title="Add Poll">📊</button>
                            <button type="button" class="ep-icon-btn" onclick="window.EventPostForm._toggleLink(true)" title="Link Event">🔗</button>
                        </div>
                        <span id="ep-char-count" style="font-size:0.7rem;color:#999;">0 / 500</span>
                    </div>
                </div>
            </div>

            <!-- ── SECTION 3: EVENT LINKING & RECAP ──────────────── -->
            <div id="ep-link-wrap" style="display:none;background:#f8f9fa;padding:12px;border-radius:8px;border:1px solid #eee;margin-bottom:16px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                    <label class="ep-label" style="margin:0;">🔗 Linked Event & Recap</label>
                    <button type="button" class="af-text-btn" style="color:#e53935;font-size:0.75rem;" onclick="window.EventPostForm._toggleLink(false)">Unlink</button>
                </div>
                <div style="position:relative;">
                    <input type="text" id="ep-event-search" class="ep-input" placeholder="Search event to link..." oninput="window.EventPostForm._searchEvent(this.value)">
                    <div id="ep-event-results" class="ep-dropdown-list" style="display:none;"></div>
                </div>
                <div id="ep-event-selected" style="display:none;background:#fff;padding:10px;border-radius:8px;margin-top:8px;border:1px solid #ddd;font-size:0.85rem;">
                    <div id="ep-event-name" style="font-weight:700;"></div>
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px;">
                        <span class="ep-label" style="margin:0;">Is this a Recap/Score update?</span>
                        <label class="hf-toggle-wrap">
                            <input type="checkbox" id="ep-is-recap" onchange="document.getElementById('ep-recap-fields').style.display = this.checked ? 'block' : 'none'">
                            <span class="hf-toggle-slider"></span>
                        </label>
                    </div>
                    <div id="ep-recap-fields" style="display:none;margin-top:10px;">
                        <input type="text" id="ep-recap-score" class="ep-input" placeholder="Final Score (e.g. 2 - 1)">
                        <textarea id="ep-recap-summary" class="hf-input hf-textarea" style="margin-top:8px;" placeholder="Quick summary of the action..."></textarea>
                    </div>
                </div>
                <input type="hidden" id="ep-event-id">
            </div>

            <input type="file" id="ep-photo-input" accept="image/*" style="display:none;" onchange="window.EventPostForm._addPhoto(this)">

            <!-- ── FOOTER CTA ────────────────────────────────────── -->
            <div style="padding:16px;position:sticky;bottom:0;background:#fff;border-top:1px solid #f0f0f0;z-index:10;">
                <button type="button" class="ep-submit-btn" onclick="window.EventPostForm._submit()">Publish Post</button>
            </div>
        </div>`;
    }

    function init() {
        if (!window.FormHelpers) return;
        _pollManager = window.FormHelpers.createRepeatable('ep-poll-options-list', {
            template: (data, index) => `
                <div class="ep-poll-row" style="display:flex;gap:8px;margin-bottom:6px;">
                    <input type="text" class="hf-input" placeholder="Option ${index + 1}" value="${data.text || ''}" oninput="window.EventPostForm._updatePoll(${index}, this.value)">
                    <button type="button" style="background:none;border:none;color:#e53935;font-weight:700;cursor:pointer;" onclick="window.EventPostForm._removePollOption(${index})">×</button>
                </div>
            `,
            onEmpty: '<p style="font-size:0.75rem;color:#888;">Add at least 2 options for a poll.</p>'
        });

        // Content char count listener
        const ta = document.getElementById('ep-content');
        if (ta) {
            ta.addEventListener('input', e => {
                const len = e.target.value.length;
                document.getElementById('ep-char-count').textContent = `${len} / 500`;
                document.getElementById('ep-char-count').style.color = len > 500 ? '#e53935' : '#999';
            });
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // UI ACTIONS
    // ─────────────────────────────────────────────────────────────────────────

    function _toggleVis(val) {
        document.getElementById('ep-group-select-wrap').style.display = val === 'group' ? 'block' : 'none';
        if (val !== 'group') _removeGroup();
    }

    function _togglePoll(show) {
        document.getElementById('ep-poll-wrap').style.display = show ? 'block' : 'none';
        if (show && _pollManager.data.length === 0) {
            _pollManager.addRow({ text: '' });
            _pollManager.addRow({ text: '' });
        }
    }

    function _toggleLink(show) {
        document.getElementById('ep-link-wrap').style.display = show ? 'block' : 'none';
    }

    function _addPollOption() { _pollManager.addRow({ text: '' }); }
    function _removePollOption(idx) { _pollManager.removeRow(idx); }
    function _updatePoll(idx, val) { _pollManager.data[idx].text = val; }

    async function _searchGroup(q) {
        const resultsEl = document.getElementById('ep-group-results');
        if (!q || q.length < 2) { resultsEl.style.display = 'none'; return; }
        try {
            const all = await window.mizanoStorage.performTransaction('groups', 'readonly', s => s.getAll());
            const matches = all.filter(g => g.name.toLowerCase().includes(q.toLowerCase())).slice(0, 5);
            if (!matches.length) { resultsEl.style.display = 'none'; return; }
            resultsEl.innerHTML = matches.map(m => `<div class="ep-dropdown-item" onclick="window.EventPostForm._selectGroup('${m.local_id || m.id}','${m.name.replace(/'/g, "\\'")}')">${m.name}</div>`).join('');
            resultsEl.style.display = 'block';
        } catch { resultsEl.style.display = 'none'; }
    }

    function _selectGroup(id, name) {
        document.getElementById('ep-group-results').style.display = 'none';
        document.getElementById('ep-group-search').style.display = 'none';
        document.getElementById('ep-group-id').value = id;
        document.getElementById('ep-group-name-disp').textContent = name;
        document.getElementById('ep-group-selected').style.display = 'flex';
    }

    function _removeGroup() {
        document.getElementById('ep-group-search').style.display = 'block';
        document.getElementById('ep-group-selected').style.display = 'none';
        document.getElementById('ep-group-id').value = '';
    }

    async function _searchEvent(q) {
        const resultsEl = document.getElementById('ep-event-results');
        if (!q || q.length < 2) { resultsEl.style.display = 'none'; return; }
        try {
            const all = await window.mizanoStorage.performTransaction('events', 'readonly', s => s.getAll());
            const matches = all.filter(e => e.title.toLowerCase().includes(q.toLowerCase())).slice(0, 5);
            if (!matches.length) { resultsEl.style.display = 'none'; return; }
            resultsEl.innerHTML = matches.map(m => `<div class="ep-dropdown-item" onclick="window.EventPostForm._selectEvent('${m.local_id || m.id}','${m.title.replace(/'/g, "\\'")}')">${m.title}</div>`).join('');
            resultsEl.style.display = 'block';
        } catch { resultsEl.style.display = 'none'; }
    }

    function _selectEvent(id, name) {
        document.getElementById('ep-event-results').style.display = 'none';
        document.getElementById('ep-event-search').style.display = 'none';
        document.getElementById('ep-event-id').value = id;
        document.getElementById('ep-event-name').textContent = name;
        document.getElementById('ep-event-selected').style.display = 'block';
    }

    function _addPhoto(input) {
        const file = input.files[0];
        if (!file) return;
        if (file.size > 3 * 1024 * 1024) { _showToast('Max 3MB allowed', 'error'); return; }
        const r = new FileReader();
        r.onload = ev => {
            document.getElementById('ep-photo-preview').src = ev.target.result;
            document.getElementById('ep-photo-preview-wrap').style.display = 'block';
        };
        r.readAsDataURL(file);
    }

    function _removePhoto() {
        document.getElementById('ep-photo-preview-wrap').style.display = 'none';
        document.getElementById('ep-photo-input').value = '';
    }

    async function _submit() {
        if (window.MizanoAuth?.isDemo?.()) { window.ProfilePanel?._showSignUpModal(); return; }

        const content = document.getElementById('ep-content').value.trim();
        const photoData = document.getElementById('ep-photo-preview').src;
        const visibility = document.getElementById('ep-visibility').value;
        const eventId = document.getElementById('ep-event-id').value;
        const isRecap = document.getElementById('ep-is-recap')?.checked;

        if (!content && !photoData.includes('data:image')) {
            _showToast('Please add text or an image.', 'error'); return;
        }

        const pollOptions = (document.getElementById('ep-poll-wrap').style.display === 'block') 
            ? _pollManager.data.filter(o => o.text.trim()) : null;

        const record = {
            post_id: `POST-${Date.now()}`,
            author_id: window.mizanoStorage.getCurrentUserId(),
            content,
            visibility,
            target_group_id: visibility === 'group' ? document.getElementById('ep-group-id').value : null,
            photo_url: photoData.includes('data:image') ? photoData : null,
            poll: pollOptions ? { options: pollOptions.map(o => ({ text: o.text, votes: 0 })) } : null,
            linked_event_id: eventId || null,
            recap: isRecap ? {
                score: document.getElementById('ep-recap-score').value,
                summary: document.getElementById('ep-recap-summary').value
            } : null,
            created_at: new Date().toISOString()
        };

        try {
            await window.mizanoStorage.saveEntity('posts', record);
            _showToast('Post published! 📢');
            setTimeout(() => { if (window.MizanoNav) window.MizanoNav.closeOverlay('builder'); }, 1000);
        } catch (e) {
            _showToast('Save failed.', 'error');
        }
    }

    function _showToast(msg, type = 'success') {
        if (window.FormHelpers) window.FormHelpers.showToast(msg, type);
        else alert(msg);
    }

    function _styles() {
        if (document.getElementById('ep-form-styles')) return '';
        return `<style id="ep-form-styles">
            .ep-section { background:#fff; margin-bottom:12px; }
            .ep-label { display:block; font-size:0.75rem; color:#1a73e8; font-weight:700; margin-bottom:6px; letter-spacing:0.4px; text-transform:uppercase; }
            .ep-input { width:100%; padding:11px 12px; border:1px solid #dadce0; border-radius:8px; font-size:0.88rem; box-sizing:border-box; font-family:inherit; outline:none; }
            .ep-textarea { resize:vertical; }
            .ep-icon-btn { background:none; border:1px solid #eee; width:44px; height:44px; border-radius:12px; cursor:pointer; font-size:1.2rem; display:flex; align-items:center; justify-content:center; transition:all 0.2s; }
            .ep-icon-btn:hover { background:#f1f3f4; border-color:#ccc; }
            .ep-dropdown-list { border:1px solid #dadce0; border-radius:8px; max-height:160px; overflow-y:auto; background:#fff; margin-top:4px; box-shadow:0 4px 12px rgba(0,0,0,0.1); position:absolute; left:0; right:0; z-index:100; }
            .ep-dropdown-item { padding:10px 14px; font-size:0.85rem; cursor:pointer; border-bottom:1px solid #f5f5f5; }
            .ep-dropdown-item:hover { background:#f5f7ff; }
            .ep-submit-btn { width:100%; padding:14px; background:#1a73e8; color:#fff; border:none; border-radius:10px; font-size:0.95rem; font-weight:700; cursor:pointer; font-family:inherit; box-shadow:0 4px 6px rgba(26,115,232,0.2); }
        </style>`;
    }

    return { render, init, _toggleVis, _togglePoll, _toggleLink, _searchGroup, _selectGroup, _removeGroup, _searchEvent, _selectEvent, _addPhoto, _removePhoto, _addPollOption, _removePollOption, _updatePoll, _submit };
})();
