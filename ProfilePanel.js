/**
 * MIZANO — ProfilePanel.js (Session 2)
 * Applied Android Studio Otter Pipeline standards.
 *
 * Populates containers inside Panel 15 (Mine).
 * This is the first thing a user sees after signup.
 *
 * Dependencies: StorageManager.js (Session 1), window.MizanoAuth, window.MizanoNav
 * Save to: Mizano\ProfilePanel.js (project root)
 */

window.ProfilePanel = (function () {

    // ─── internal state ───────────────────────────────────────────────────────
    let _profile = null;
    let _editOriginal = null;   // snapshot before edit starts
    let _isEditing = false;

    // ─── completeness weights (per DOC2 §4.1) ─────────────────────────────────
    const COMPLETENESS = {
        photo: 10,
        city: 10,
        interests: 10,
        player_file: 15,
        group: 15,
        event: 10,
        venue: 10,
        business: 20
    };

    // ─── INIT ─────────────────────────────────────────────────────────────────

    async function init() {
        const container = document.getElementById('profile-content');
        if (!container) {
            console.warn('ProfilePanel: #profile-content not found');
            return;
        }

        // DEMO MODE
        if (window.MizanoAuth && window.MizanoAuth.isDemo && window.MizanoAuth.isDemo()) {
            _profile = window.MIZANO_DEMO_PROFILE || {};
            _profile._isDemo = true;
            container.innerHTML = _buildDemoBanner() + _buildHero(_profile) + _buildSubCards(_profile);
            _attachCardListeners(container, true);
            return;
        }

        // Authenticated user
        const userId = _getUserId();
        if (!userId) {
            container.innerHTML = '<p style="padding:20px;color:#999;">Please log in to view your profile.</p>';
            return;
        }

        try {
            _profile = await window.mizanoStorage.getProfile(userId);
            _profile = _profile || { uid: userId, profile_id: userId };
        } catch (e) {
            console.error('ProfilePanel: getProfile failed', e);
            _profile = { uid: userId, profile_id: userId };
        }

        // Render the main profile sections
        container.innerHTML = _buildHero(_profile) + _buildSubCards(_profile);
        _attachCardListeners(container, false);
    }

    // ─── HERO ─────────────────────────────────────────────────────────────────

    function _buildHero(profile) {
        const completeness = _calcCompleteness(profile);
        const name = profile.display_name || profile.full_name || profile.username || 'Mizano User';
        const username = profile.username ? `@${profile.username}` : '';
        const city = profile.city || '';
        const area = profile.area || '';
        const location = [city, area].filter(Boolean).join(' · ');
        const interests = (profile.interests || profile.preferred_sports || []).slice(0, 4);
        const avatarHTML = _buildAvatar(profile, name, 80);
        const demoLabel = profile._isDemo ? '<span class="demo-badge" style="background:#FF6B35;color:#fff;font-size:0.7rem;padding:2px 8px;border-radius:10px;margin-left:8px;">Demo</span>' : '';

        const interestChips = interests.map(i =>
            `<span style="background:#e8f0fe;color:#1a73e8;font-size:0.75rem;padding:4px 10px;border-radius:12px;margin:2px;">${i}</span>`
        ).join('');

        return `
        <div id="edit-user-profile" style="margin: 12px 12px 0; border: 1px solid #ddd; overflow: hidden; border-radius:12px; background:#fff;">
            <!-- HERO CONTENT (Always Visible) -->
            <div class="profile-hero" id="profile-hero" style="padding:16px;">
                <!-- Avatar row -->
                <div style="display:flex;align-items:flex-start;gap:14px;margin-bottom:12px;">
                    <div id="avatar-tap-zone" style="cursor:pointer;flex-shrink:0;">
                        ${avatarHTML}
                        <div style="font-size:0.65rem;color:#888;text-align:center;margin-top:3px;">Change</div>
                    </div>
                    <div style="flex:1;min-width:0;">
                        <div style="display:flex;align-items:center;flex-wrap:wrap;">
                            <span id="hero-displayname" style="font-size:1.15rem;font-weight:700;color:#1a1a1a;">${name}</span>
                            ${demoLabel}
                        </div>
                        <div id="hero-username" style="color:#888;font-size:0.85rem;margin:2px 0;">${username}</div>
                        <div id="hero-location" style="color:#555;font-size:0.82rem;">${location}</div>
                        <div id="hero-interests" style="margin-top:6px;display:flex;flex-wrap:wrap;gap:4px;">${interestChips}</div>
                    </div>
                </div>

                <!-- Completeness Bar -->
                <div style="margin-top:4px;">
                    <div style="display:flex;justify-content:space-between;font-size:0.75rem;color:#666;margin-bottom:4px;">
                        <span>Profile completeness</span>
                        <span id="hero-pct" style="font-weight:600;color:#1a73e8;">${completeness}%</span>
                    </div>
                    <div style="background:#e9ecef;border-radius:4px;height:6px;overflow:hidden;">
                        <div id="hero-bar" style="background:#1a73e8;height:6px;width:${completeness}%;border-radius:4px;transition:width 0.4s ease;"></div>
                    </div>
                    ${_completenessNextTip(profile)}
                </div>
            </div>

            <!-- Collapsible Header -->
            <div id="profile-hero-header" style="padding:14px 16px; background:#f9f9f9; display:flex; align-items:center; justify-content:space-between; cursor:pointer; border-top:1px solid #eee;">
                <h3 style="margin:0; font-size:0.9rem; font-weight:700; color:#1a1a1a;">Account Details</h3>
                <span id="profile-hero-arrow" style="color:#666; font-size:1.2rem; transition: transform 0.2s ease-in-out; display:inline-block; transform:rotate(0deg);">›</span>
            </div>

            <!-- Collapsible Body (Default Collapsed) -->
            <div id="profile-hero-body" style="display:none; padding:16px; background:#fff; border-top:1px solid #f0f0f0;">
                <div style="font-size:0.85rem; color:#666;">
                    Tap <strong>'My Identity'</strong> below to edit your basic information, or tap the avatar to change your photo.
                </div>
            </div>
        </div>`;
    }

    function _buildAvatar(profile, name, size) {
        const initials = (name || '?').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
        const colors = ['#1a73e8', '#0f9d58', '#f4b400', '#db4437', '#673ab7', '#e91e63', '#00bcd4'];
        const color = colors[(initials.charCodeAt(0) || 0) % colors.length];

        if (profile.avatar) {
            return `<img src="${profile.avatar}" alt="Avatar"
                style="width:${size}px;height:${size}px;border-radius:50%;object-fit:cover;border:2px solid #e8eaed;">`;
        }
        return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};
            display:flex;align-items:center;justify-content:center;
            font-weight:700;font-size:${Math.round(size * 0.34)}px;color:#fff;flex-shrink:0;">
            ${initials}
        </div>`;
    }

    function _calcCompleteness(profile) {
        let score = 0;
        if (profile.avatar) score += COMPLETENESS.photo;
        if (profile.city) score += COMPLETENESS.city;
        if ((profile.interests || profile.preferred_sports || []).length) score += COMPLETENESS.interests;
        if (profile._hasPlayerFile) score += COMPLETENESS.player_file;
        if (profile._hasGroup) score += COMPLETENESS.group;
        if (profile._hasEvent) score += COMPLETENESS.event;
        if (profile._hasVenue) score += COMPLETENESS.venue;
        if (profile._hasBusiness) score += COMPLETENESS.business;
        return Math.min(100, score);
    }

    function _completenessNextTip(profile) {
        const completeness = _calcCompleteness(profile);
        if (completeness >= 100) return '';
        let tip = '';
        if (!profile.avatar) tip = 'Add a profile photo (+10%)';
        else if (!profile.city) tip = 'Set your city (+10%)';
        else if (!(profile.interests || profile.preferred_sports || []).length)
            tip = 'Add interests (+10%)';
        else if (!profile._hasPlayerFile) tip = 'Create a Player File (+15%)';
        else if (!profile._hasGroup) tip = 'Join or create a Group (+15%)';
        if (!tip) return '';
        return `<div style="font-size:0.7rem;color:#888;margin-top:4px;">💡 ${tip}</div>`;
    }

    // ─── DEMO BANNER ─────────────────────────────────────────────────────────

    function _buildDemoBanner() {
        return `<div style="background:#FF6B35;color:#fff;text-align:center;padding:10px 16px;font-size:0.85rem;font-weight:600;">
            Demo Profile — Sign up to save your content
            <button onclick="window.location.href='./signup.html'"
                style="background:#fff;color:#FF6B35;border:none;border-radius:8px;padding:4px 12px;margin-left:10px;font-weight:700;cursor:pointer;font-size:0.8rem;">
                Sign Up
            </button>
        </div>`;
    }

    // ─── SUB-SECTION CARDS ────────────────────────────────────────────────────

    function _buildSubCards(profile) {
        const cards = [
            {
                id: 'card-identity',
                icon: '👤',
                title: 'My Identity',
                emptyMsg: 'Complete your profile — tap to edit',
                summary: _identitySummary(profile),
                action: 'identity'
            },
            {
                id: 'card-playerfiles',
                icon: '📋',
                title: 'Profiles',
                emptyMsg: 'No profiles yet — add your first',
                summary: profile._hasPlayerFile ? 'Profile on record' : '',
                action: 'playerfiles'
            },
            {
                id: 'card-groups',
                icon: '🏆',
                title: 'My Groups',
                emptyMsg: 'No groups yet — join or create one',
                summary: profile._hasGroup ? 'Member of groups' : '',
                action: 'groups'
            },
            {
                id: 'card-associations',
                icon: '🏛️',
                title: 'Associations',
                emptyMsg: 'No associations linked',
                summary: profile._hasAssociation ? 'Associated with governing bodies' : '',
                action: 'associations'
            },
            {
                id: 'card-events',
                icon: '📅',
                title: 'My Events',
                emptyMsg: 'No events — create or join an event',
                summary: profile._hasEvent ? 'Events in your history' : '',
                action: 'events'
            },
            {
                id: 'card-venues',
                icon: '📍',
                title: 'My Venues',
                emptyMsg: 'No venues submitted',
                summary: profile._hasVenue ? 'Venue submissions on record' : '',
                action: 'venues'
            },
            {
                id: 'card-business',
                icon: '🏢',
                title: 'My Business',
                emptyMsg: 'No businesses listed',
                summary: profile._hasBusiness ? 'Business profile active' : '',
                action: 'business'
            },
            {
                id: 'card-minors',
                icon: '👶',
                title: 'Guardian Menu',
                emptyMsg: 'No minor profiles added',
                summary: profile._hasMinors ? 'Minor profiles registered' : '',
                action: 'minors'
            }
        ];

        const cardHTMLs = cards.map(c => `
        <div class="mine-sub-card" id="${c.id}" data-action="${c.action}"
            style="background:#fff;border-radius:12px;margin:8px 12px;padding:14px 16px;
                   display:flex;align-items:center;gap:12px;cursor:pointer;
                   box-shadow:0 1px 4px rgba(0,0,0,0.08);transition:transform 0.15s;">
            <span style="font-size:1.5rem;">${c.icon}</span>
            <div style="flex:1;min-width:0;">
                <div style="font-weight:600;font-size:0.9rem;color:#1a1a1a;">${c.title}</div>
                <div style="font-size:0.78rem;color:#888;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                    ${c.summary || c.emptyMsg}
                </div>
            </div>
            <span style="color:#ccc;font-size:1.1rem;">›</span>
        </div>`).join('');

        return `<div id="mine-sub-cards" style="padding-bottom:80px;background:#f5f7fa;min-height:400px;">
            ${cardHTMLs}
        </div>`;
    }

    function _identitySummary(profile) {
        const parts = [];
        if (profile.display_name || profile.full_name) parts.push(profile.display_name || profile.full_name);
        if (profile.city) parts.push(profile.city);
        if (profile.whatsapp) parts.push('WhatsApp set');
        return parts.join(' · ');
    }

    // ─── CARD LISTENERS ───────────────────────────────────────────────────────

    function _attachCardListeners(container, isDemo) {
        // Hero Toggle
        const heroHeader = container.querySelector('#profile-hero-header');
        if (heroHeader) {
            heroHeader.addEventListener('click', () => {
                const body = document.getElementById('profile-hero-body');
                const arrow = document.getElementById('profile-hero-arrow');
                const isOpen = body.style.display !== 'none' && body.style.display !== '';
                body.style.display = isOpen ? 'none' : 'block';
                // arrow.textContent = isOpen ? '⌄' : '⌄'; 
                if (arrow) {
                    arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(90deg)';
                }
            });
        }

        container.querySelectorAll('.mine-sub-card').forEach(card => {
            card.addEventListener('touchstart', () => { card.style.transform = 'scale(0.98)'; }, { passive: true });
            card.addEventListener('touchend', () => { card.style.transform = 'scale(1)'; }, { passive: true });
            card.addEventListener('click', () => {
                if (isDemo) { _showSignUpModal(); return; }
                
                // Visual feedback: brief highlight then route
                card.style.background = '#f0f7ff';
                setTimeout(() => { card.style.background = '#fff'; }, 200);
                
                _routeCard(card.dataset.action);
            });
        });
    }

    async function _routeCard(action) {
        console.log('ProfilePanel: Routing card action ->', action);

        // Demo guard
        if (window.MizanoAuth && (window.MizanoAuth.isGuest() || (window.MizanoAuth.isDemo && window.MizanoAuth.isDemo()))) {
            _showSignUpModal();
            return;
        }

        // Standardise mapping: profile cards -> internal modules
        const modules = {
            'playerfiles': window.MyPlayerFiles,
            'groups': window.MyGroups,
            'associations': window.MyAssociations,
            'events': window.MyEvents,
            'venues': window.MyVenues,
            'business': window.MyBusiness,
            'minors': window.MyMinors,
            'identity': null // Identity edit handled internally or by specialized module
        };

        if (action === 'identity') {
            startEdit();
            return;
        }

        const module = modules[action];
        if (module && typeof module.init === 'function') {
            module.init();
        } else {
            console.error(`ProfilePanel: Module for ${action} not found or has no init()`);
            // Fallback to form router if specific module init fails or is missing
            const formMapping = {
                'playerfiles': 'player_file',
                'groups': 'group',
                'associations': 'association',
                'events': 'event',
                'venues': 'venue',
                'business': 'business',
                'minors': 'minor'
            };
            if (window.AddActionRouter && window.AddActionRouter.openForm) {
                window.AddActionRouter.openForm(formMapping[action] || action);
            }
        }
    }

    /**
     * _showSignUpModal
     * Implementation of the previously missing function to handle demo-mode/guest blocks.
     */
    function _showSignUpModal() {
        if (typeof window.MizanoShell?.toast === 'function') {
            window.MizanoShell.toast('Please Sign Up or Log In to access this feature', 'info');
        }
        
        // If the NavigationController has a signup target, use it
        if (window.MizanoNav && window.MizanoNav.openOverlay) {
            setTimeout(() => {
                window.MizanoNav.openOverlay('hamburger'); // Or similar landing point
            }, 1500);
        }
    }

    // ─── INLINE EDIT MODE (DOC2 §4.2) ────────────────────────────────────────

    function startEdit() {
        if (_isEditing) return;

        // Demo guard
        if (_profile && _profile._isDemo) { _showSignUpModal(); return; }

        _isEditing = true;
        _editOriginal = JSON.parse(JSON.stringify(_profile)); // deep copy snapshot

        const hero = document.getElementById('profile-hero');
        if (!hero) return;

        const name = (_profile.display_name || _profile.full_name || '').split(' ');
        const first = name[0] || '';
        const last = name.slice(1).join(' ') || '';
        const interests = (_profile.interests || _profile.preferred_sports || []);

        hero.innerHTML = `
        <div style="padding:4px 0 12px;">
            <div style="display:flex;gap:10px;margin-bottom:10px;">
                <input id="edit-first" value="${_safeVal(first)}" placeholder="First name"
                    style="${_inputStyle()}flex:1;">
                <input id="edit-last" value="${_safeVal(last)}" placeholder="Last name"
                    style="${_inputStyle()}flex:1;">
            </div>
            <input id="edit-username" value="${_safeVal(_profile.username)}" placeholder="@username"
                style="${_inputStyle()}width:100%;margin-bottom:10px;" oninput="window.ProfilePanel._onUsernameInput(this.value)">
            <small id="edit-username-status" style="color:#888;font-size:0.73rem;display:block;margin-bottom:8px;"></small>
            <div style="display:flex;gap:8px;margin-bottom:10px;">
                <input id="edit-city" value="${_safeVal(_profile.city)}" placeholder="City / Town"
                    style="${_inputStyle()}flex:1;">
                <input id="edit-area" value="${_safeVal(_profile.area)}" placeholder="Area / Neighbourhood"
                    style="${_inputStyle()}flex:1;">
            </div>
            <input id="edit-whatsapp" value="${_safeVal(_profile.whatsapp)}" placeholder="WhatsApp (+267...)"
                style="${_inputStyle()}width:100%;margin-bottom:10px;">
            <input id="edit-email" value="${_safeVal(_profile.email)}" placeholder="Email (optional)"
                style="${_inputStyle()}width:100%;margin-bottom:10px;">

            <div style="font-size:0.78rem;color:#555;margin-bottom:6px;font-weight:600;">Interests (tap to toggle)</div>
            <div id="edit-interests" style="display:flex;flex-wrap:wrap;gap:6px;">
                ${_buildInterestChips(interests)}
            </div>
        </div>`;

        _injectEditingBar();
        _attachEditInterestListeners();
    }

    function _buildInterestChips(selected) {
        const all = ['Soccer', 'Netball', 'Basketball', 'Athletics', 'Swimming', 'Tennis',
            'Cricket', 'Rugby', 'Chess', 'Cycling', 'Volleyball', 'Badminton',
            'Table Tennis', 'Golf', 'Martial Arts', 'Boxing', 'Dance', 'Hiking'];
        return all.map(sport => {
            const active = selected.includes(sport);
            return `<span class="interest-chip" data-sport="${sport}"
                style="padding:6px 12px;border-radius:14px;font-size:0.78rem;cursor:pointer;transition:all 0.15s;
                       background:${active ? '#1a73e8' : '#e8eaed'};color:${active ? '#fff' : '#444'};"
            >${sport}</span>`;
        }).join('');
    }

    function _attachEditInterestListeners() {
        document.querySelectorAll('.interest-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const active = chip.style.background === 'rgb(26, 115, 232)';
                chip.style.background = active ? '#e8eaed' : '#1a73e8';
                chip.style.color = active ? '#444' : '#fff';
            });
        });
    }

    function _onUsernameInput(val) {
        const el = document.getElementById('edit-username-status');
        if (!el) return;
        if (val.length < 3) { el.textContent = 'Username must be at least 3 characters'; el.style.color = '#e53935'; return; }
        el.textContent = 'Checking availability...'; el.style.color = '#888';
        // async uniqueness check via IndexedDB
        setTimeout(async () => {
            try {
                const users = await window.mizanoStorage.getAllUsers();
                const taken = users.some(u => u.username === val && u.profile_id !== (_profile.uid || _profile.profile_id));
                if (el) {
                    el.textContent = taken ? '✗ Username taken' : '✓ Available';
                    el.style.color = taken ? '#e53935' : '#0f9d58';
                }
            } catch (e) {
                if (el) { el.textContent = ''; }
            }
        }, 400);
    }

    function _injectEditingBar() {
        let bar = document.getElementById('editing-bar');
        if (bar) bar.remove();
        bar = document.createElement('div');
        bar.id = 'editing-bar';
        bar.style.cssText = `
            position:fixed;bottom:60px;left:0;right:0;z-index:9998;
            background:#1a73e8;padding:12px 20px;
            display:flex;align-items:center;justify-content:space-between;
            box-shadow:0 -2px 10px rgba(0,0,0,0.2);
            animation:slideUpBar 0.25s ease-out;
        `;
        bar.innerHTML = `
            <style>@keyframes slideUpBar{from{transform:translateY(100%)}to{transform:translateY(0)}}</style>
            <button onclick="window.ProfilePanel.saveEdit()"
                style="background:#fff;color:#1a73e8;border:none;border-radius:8px;
                       padding:10px 22px;font-weight:700;font-size:0.9rem;cursor:pointer;">
                Save Changes
            </button>
            <button onclick="window.ProfilePanel.cancelEdit()"
                style="background:transparent;color:#fff;border:none;font-size:0.9rem;cursor:pointer;text-decoration:underline;">
                Cancel
            </button>`;
        document.body.appendChild(bar);
    }

    async function saveEdit() {
        // Collect values
        const first = (document.getElementById('edit-first')?.value || '').trim();
        const last = (document.getElementById('edit-last')?.value || '').trim();
        const username = (document.getElementById('edit-username')?.value || '').trim();
        const city = (document.getElementById('edit-city')?.value || '').trim();
        const area = (document.getElementById('edit-area')?.value || '').trim();
        const whatsapp = (document.getElementById('edit-whatsapp')?.value || '').trim();
        const email = (document.getElementById('edit-email')?.value || '').trim();

        // Collect selected interests
        const interests = [];
        document.querySelectorAll('.interest-chip').forEach(chip => {
            if (chip.style.background === 'rgb(26, 115, 232)') interests.push(chip.dataset.sport);
        });

        // Validation
        if (!first) { _showToast('First name is required', 'error'); return; }
        if (!username || username.length < 3) { _showToast('Username must be at least 3 characters', 'error'); return; }

        const statusEl = document.getElementById('edit-username-status');
        if (statusEl && statusEl.textContent === '✗ Username taken') {
            _showToast('That username is already taken', 'error'); return;
        }

        // Build updated profile
        const updated = {
            ..._profile,
            display_name: [first, last].filter(Boolean).join(' '),
            username,
            city,
            area,
            whatsapp,
            email,
            interests
        };

        try {
            await window.mizanoStorage.saveProfile(updated);
            _profile = updated;
            _isEditing = false;
            _removeEditingBar();
            // Re-render
            const container = document.getElementById('mine-hero-container');
            if (container) {
                container.innerHTML = _buildHero(_profile) + _buildSubCards(_profile);
                _attachCardListeners(container, false);
            }
            _showToast('Profile updated ✓');
        } catch (e) {
            console.error('ProfilePanel: saveEdit failed', e);
            _showToast('Save failed — please try again', 'error');
        }
    }

    function cancelEdit() {
        _isEditing = false;
        _profile = _editOriginal || _profile;
        _removeEditingBar();
        const container = document.getElementById('mine-hero-container');
        if (container) {
            container.innerHTML = _buildHero(_profile) + _buildSubCards(_profile);
            _attachCardListeners(container, false);
        }
    }

    function _removeEditingBar() {
        const bar = document.getElementById('editing-bar');
        if (bar) bar.remove();
    }

    // ─── AVATAR PICKER ────────────────────────────────────────────────────────

    function _openAvatarPicker() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = async (ev) => {
                const avatarDataUrl = ev.target.result;
                _profile.avatar = avatarDataUrl;
                try {
                    await window.mizanoStorage.saveProfile(_profile);
                    const container = document.getElementById('mine-panel-content');
                    if (container) {
                        container.innerHTML = _buildHero(_profile) + _buildSubCards(_profile);
                        _attachCardListeners(container, false);
                    }
                    _showToast('Photo updated ✓');
                } catch (err) {
                    _showToast('Failed to save photo', 'error');
                }
            };
            reader.readAsDataURL(file);
        });
        input.click();
    }

    // ─── SIGN UP MODAL (demo mode) ────────────────────────────────────────────

    function _showSignUpModal() {
        let modal = document.getElementById('signup-prompt-modal');
        if (modal) { modal.style.display = 'flex'; return; }

        modal = document.createElement('div');
        modal.id = 'signup-prompt-modal';
        modal.style.cssText = `
            position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.6);
            display:flex;align-items:center;justify-content:center;padding:20px;`;
        modal.innerHTML = `
            <div style="background:#fff;border-radius:16px;padding:28px 24px;max-width:320px;width:100%;text-align:center;">
                <div style="font-size:2rem;margin-bottom:8px;">🌟</div>
                <h3 style="margin:0 0 8px;font-size:1.1rem;color:#1a1a1a;">Create a Free Account</h3>
                <p style="color:#555;font-size:0.88rem;margin:0 0 20px;line-height:1.5;">
                    Sign up to create content, join events, and save your progress.
                </p>
                <button onclick="window.location.href='./signup.html'"
                    style="width:100%;padding:13px;background:#1a73e8;color:#fff;border:none;
                           border-radius:10px;font-weight:700;font-size:0.95rem;cursor:pointer;margin-bottom:10px;">
                    Sign Up — It's Free
                </button>
                <button onclick="document.getElementById('signup-prompt-modal').style.display='none'"
                    style="width:100%;padding:11px;background:#f1f3f4;color:#444;border:none;
                           border-radius:10px;font-size:0.9rem;cursor:pointer;">
                    Continue Browsing
                </button>
            </div>`;
        document.body.appendChild(modal);
    }

    // ─── REFRESH ─────────────────────────────────────────────────────────────

    async function refresh() {
        _profile = null;
        _isEditing = false;
        await init();
    }

    // ─── HELPERS ─────────────────────────────────────────────────────────────

    function _getUserId() {
        if (window.MizanoAuth && window.MizanoAuth.getCurrentUserId) return window.MizanoAuth.getCurrentUserId();
        if (window.mizanoStorage && window.mizanoStorage.getCurrentUserId) return window.mizanoStorage.getCurrentUserId();
        return localStorage.getItem('currentUser');
    }

    function _safeVal(v) {
        return (v || '').toString().replace(/"/g, '&quot;');
    }

    function _inputStyle() {
        return `border:1px solid #dadce0;border-radius:8px;padding:10px 12px;
                font-size:0.88rem;outline:none;box-sizing:border-box;font-family:inherit;`;
    }

    function _showToast(msg, type = 'success') {
        let toast = document.getElementById('profile-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'profile-toast';
            document.body.appendChild(toast);
        }
        toast.style.cssText = `
            position:fixed;bottom:80px;left:50%;transform:translateX(-50%);z-index:99999;
            background:${type === 'error' ? '#e53935' : '#333'};color:#fff;
            padding:10px 20px;border-radius:8px;font-size:0.85rem;font-weight:500;
            white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.3);
            animation:fadeInToast 0.2s ease;
        `;
        if (!document.getElementById('profile-toast-style')) {
            const s = document.createElement('style');
            s.id = 'profile-toast-style';
            s.textContent = '@keyframes fadeInToast{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}';
            document.head.appendChild(s);
        }
        toast.textContent = msg;
        toast.style.display = 'block';
        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => { if (toast) toast.style.display = 'none'; }, 2800);
    }

    // ─── PUBLIC API ───────────────────────────────────────────────────────────

    return {
        init,
        refresh,
        startEdit,
        saveEdit,
        cancelEdit,
        _onUsernameInput,   // exposed for inline onchange handler
        _showSignUpModal
    };

})();
