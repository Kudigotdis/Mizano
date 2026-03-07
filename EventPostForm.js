/**
 * MIZANO — EventPostForm.js (Session 11)
 * Applied Android Studio Otter Pipeline standards.
 *
 * EventPostForm.render() → HTML string injected by AddActionRouter.openForm('event_post')
 * On submit → window.mizanoStorage.saveEntity('posts', record)
 * Used to publish short-lived content (news, updates, polls) to the Community Feed.
 *
 * Save to: Mizano\EventPostForm.js
 */

window.EventPostForm = (function () {

    // ─────────────────────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────────────────────

    function render() {
        return `
        <div id="ep-form-wrap" style="padding:16px 0 100px;font-family:inherit;">
            ${_styles()}
            
            <div style="background:#e8f0fe;color:#1a73e8;padding:12px;border-radius:8px;font-size:0.8rem;margin-bottom:16px;line-height:1.4;">
                <b>Create a Post</b>
                Share news, updates, or announcements with the Mizano community. Posts appear in the Community Feed.
            </div>

            <label class="ep-label">Post Visibility</label>
            <select id="ep-visibility" class="ep-input" style="margin-bottom:16px;">
                <option value="public">Public (Everyone)</option>
                <option value="followers">My Followers Only</option>
                <option value="group">Specific Group Only</option>
            </select>
            
            <div id="ep-group-select-wrap" style="display:none;margin-bottom:16px;background:#f8f9fa;padding:12px;border-radius:8px;border:1px solid #eee;">
                <label class="ep-label">Select Group</label>
                <div style="display:flex;gap:6px;">
                    <input type="text" id="ep-group-search" class="ep-input" placeholder="Search my groups..." oninput="window.EventPostForm._searchGroup(this.value)" style="flex:2;">
                </div>
                <div id="ep-group-results" class="ep-dropdown-list" style="display:none;margin-top:4px;margin-bottom:8px;"></div>
                <div id="ep-group-selected" style="display:none;align-items:center;justify-content:space-between;background:#e8f0fe;padding:8px 12px;border-radius:6px;border:1px solid #1a73e8;margin-top:4px;">
                    <span id="ep-group-name-disp" style="font-size:0.85rem;color:#1a73e8;font-weight:600;"></span>
                    <span style="color:#e53935;cursor:pointer;font-weight:700;padding:4px;" onclick="window.EventPostForm._removeGroup()">×</span>
                </div>
                <input type="hidden" id="ep-group-id">
            </div>

            <div class="ep-section" style="border-bottom:none;border-radius:8px;border:1px solid #f0f0f0;">
                <div class="ep-section-body" style="padding-top:16px;">
                    <textarea id="ep-content" class="ep-input ep-textarea" placeholder="What's going on? Share an update, score, or announcement..." style="min-height:120px;font-size:1rem;border-color:transparent;background:#f9f9f9;"></textarea>
                    
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-top:12px;padding-top:12px;border-top:1px solid #eee;">
                        <div style="display:flex;gap:12px;">
                            <button type="button" class="ep-icon-btn" onclick="document.getElementById('ep-photo-input').click()" title="Add Photo">
                                <span style="font-size:1.2rem;">📷</span>
                            </button>
                            <!-- Stub for future features like Video or Poll -->
                            <button type="button" class="ep-icon-btn" style="opacity:0.5;cursor:not-allowed;" title="Add Video (Coming Soon)">
                                <span style="font-size:1.2rem;">🎥</span>
                            </button>
                            <button type="button" class="ep-icon-btn" style="opacity:0.5;cursor:not-allowed;" title="Add Poll (Coming Soon)">
                                <span style="font-size:1.2rem;">📊</span>
                            </button>
                        </div>
                        <span id="ep-char-count" style="font-size:0.75rem;color:#999;">0 / 500</span>
                    </div>

                    <div id="ep-photo-preview-wrap" style="display:none;margin-top:12px;position:relative;border-radius:8px;overflow:hidden;">
                        <img id="ep-photo-preview" style="width:100%;max-height:300px;object-fit:cover;display:block;">
                        <div style="position:absolute;top:8px;right:8px;background:rgba(0,0,0,0.6);color:#fff;
                            width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;
                            font-size:1rem;font-weight:bold;cursor:pointer;" onclick="window.EventPostForm._removePhoto()">×</div>
                    </div>
                    <input type="file" id="ep-photo-input" accept="image/*" style="display:none;" onchange="window.EventPostForm._addPhoto(this)">
                </div>
            </div>

            <!-- ── FOOTER CTA ─────────────────────────────────────────── -->
            <div style="padding:16px;position:sticky;bottom:0;background:#fff;border-top:1px solid #f0f0f0;z-index:10;margin-top:20px;">
                <button type="button" class="ep-submit-btn" onclick="window.EventPostForm._submit()">Post to Community</button>
            </div>
        </div>`;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // LOGIC & EVENTS
    // ─────────────────────────────────────────────────────────────────────────

    function _initListeners() {
        const vis = document.getElementById('ep-visibility');
        if (vis) {
            vis.addEventListener('change', (e) => {
                const wrap = document.getElementById('ep-group-select-wrap');
                if (e.target.value === 'group') {
                    wrap.style.display = 'block';
                } else {
                    wrap.style.display = 'none';
                    _removeGroup(); // Clear selection if changing away
                }
            });
        }

        const ta = document.getElementById('ep-content');
        if (ta) {
            ta.addEventListener('input', (e) => {
                const len = e.target.value.length;
                const countEl = document.getElementById('ep-char-count');
                countEl.textContent = `${len} / 500`;
                if (len > 500) {
                    e.target.value = e.target.value.substring(0, 500);
                    countEl.textContent = `500 / 500`;
                    countEl.style.color = '#e53935';
                } else {
                    countEl.style.color = '#999';
                }
            });
        }
    }

    // Called by AddActionRouter after injecting HTML
    function init() {
        _initListeners();
    }

    async function _searchGroup(query) {
        const q = (query || '').toLowerCase().trim();
        const resultsEl = document.getElementById('ep-group-results');
        if (q.length < 2) { resultsEl.style.display = 'none'; return; }

        try {
            // In a real app, only search groups the user is an admin/member of.
            // For demo, search all groups.
            const all = await window.mizanoStorage.performTransaction('groups', 'readonly', s => s.getAll());
            const matches = (all || []).filter(i => (i.name || '').toLowerCase().includes(q)).slice(0, 5);

            if (!matches.length) { resultsEl.style.display = 'none'; return; }
            resultsEl.innerHTML = matches.map(m => `
                <div class="ep-dropdown-item" onclick="window.EventPostForm._selectGroup('${m.local_id || m.group_id || m.id}','${_safeAttr(m.name)}')">
                    ${m.name}
                </div>`).join('');
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
        document.getElementById('ep-group-id').value = '';
        document.getElementById('ep-group-name-disp').textContent = '';
        document.getElementById('ep-group-selected').style.display = 'none';

        const searchInput = document.getElementById('ep-group-search');
        searchInput.value = '';
        searchInput.style.display = 'block';
        searchInput.focus();
    }

    function _addPhoto(input) {
        const file = input.files[0];
        if (!file) return;

        if (file.size > 3 * 1024 * 1024) { _showToast('Photo must be under 3 MB', 'error'); return; }

        const r = new FileReader();
        r.onload = ev => {
            document.getElementById('ep-photo-preview').src = ev.target.result;
            document.getElementById('ep-photo-preview-wrap').style.display = 'block';
            // Store data URI in input attribute for easy access on submit
            document.getElementById('ep-photo-preview').dataset.base64 = ev.target.result;
        };
        r.readAsDataURL(file);
    }

    function _removePhoto() {
        document.getElementById('ep-photo-preview').src = '';
        document.getElementById('ep-photo-preview').dataset.base64 = '';
        document.getElementById('ep-photo-preview-wrap').style.display = 'none';
        document.getElementById('ep-photo-input').value = ''; // Reset file input
    }

    async function _submit() {
        if (window.MizanoAuth?.isDemo?.()) { window.ProfilePanel?._showSignUpModal(); return; }

        const content = document.getElementById('ep-content').value.trim();
        const photoData = document.getElementById('ep-photo-preview')?.dataset?.base64;
        const visibility = document.getElementById('ep-visibility').value;
        const groupId = document.getElementById('ep-group-id').value;

        if (!content && !photoData) {
            _showToast('Post cannot be empty. Add text or a photo.', 'error');
            return;
        }

        if (visibility === 'group' && !groupId) {
            _showToast('Please select a group to post to.', 'error');
            return;
        }

        const userId = window.mizanoStorage.getCurrentUserId();
        const now = Date.now();
        const postId = `POST-${userId}-${now}`;

        const record = {
            post_id: postId,
            author_id: userId,
            content: content,
            photo_data: photoData || null,
            visibility: visibility,
            target_group_id: visibility === 'group' ? groupId : null,
            created_at: new Date().toISOString(),
            likes_count: 0,
            comments_count: 0
        };

        try {
            await window.mizanoStorage.saveEntity('posts', record);
            _showToast('Posted successfully! 📢');
            setTimeout(() => {
                window.MizanoNav?.closeOverlay('builder');
                // Could refresh community feed here
            }, 1000);
        } catch (e) {
            console.error('Post save failed', e);
            _showToast('Failed to post.', 'error');
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // HELPERS & STYLES
    // ─────────────────────────────────────────────────────────────────────────

    function _showToast(msg, type = 'success') {
        let t = document.getElementById('ep-toast');
        if (!t) { t = document.createElement('div'); t.id = 'ep-toast'; document.body.appendChild(t); }
        t.style.cssText = `position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:99999;
            background:${type === 'error' ? '#e53935' : (type === 'info' ? '#1a73e8' : '#323232')};color:#fff;padding:10px 20px;
            border-radius:8px;font-size:0.85rem;font-weight:500;box-shadow:0 2px 8px rgba(0,0,0,0.3);`;
        t.textContent = msg; t.style.display = 'block';
        clearTimeout(t._t); t._t = setTimeout(() => t.style.display = 'none', 3000);
    }

    function _safeAttr(v) { return (v || '').replace(/'/g, '&#39;'); }

    function _styles() {
        if (document.getElementById('ep-form-styles')) return '';
        return `<style id="ep-form-styles">
            .ep-section { background:#fff; border-bottom:1px solid #f0f0f0; }
            .ep-section-body { padding:4px 16px 16px; }
            .ep-label { display:block; font-size:0.78rem; color:#555; font-weight:600; margin-bottom:4px; margin-top:2px; }
            .ep-input { width:100%; padding:11px 12px; border:1px solid #dadce0; border-radius:8px; font-size:0.88rem; box-sizing:border-box; font-family:inherit; outline:none; transition:border-color 0.2s; }
            .ep-input:focus { border-color:#1a73e8; }
            .ep-textarea { resize:vertical; }
            .ep-dropdown-list { border:1px solid #dadce0; border-radius:8px; max-height:160px; overflow-y:auto; background:#fff; margin-top:4px; box-shadow:0 2px 8px rgba(0,0,0,0.1); position:static; width:100%; }
            .ep-dropdown-item { padding:10px 14px; font-size:0.85rem; cursor:pointer; border-bottom:1px solid #f5f5f5; }
            .ep-dropdown-item:hover { background:#f5f7ff; }
            .ep-icon-btn { background:none; border:none; padding:8px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.2s; }
            .ep-icon-btn:hover { background:#f1f3f4; }
            .ep-submit-btn { width:100%; padding:14px; background:#1a73e8; color:#fff; border:none; border-radius:10px; font-size:0.95rem; font-weight:700; cursor:pointer; font-family:inherit; }
        </style>`;
    }

    return {
        render, init,
        _searchGroup, _selectGroup, _removeGroup,
        _addPhoto, _removePhoto, _submit
    };
})();
