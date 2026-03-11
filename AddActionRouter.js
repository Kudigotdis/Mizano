/**
 * MIZANO — AddActionRouter.js (Session 3)
 * Applied Android Studio Otter Pipeline standards.
 *
 * Handles the + button bottom sheet and all form routing.
 * Replaces the placeholder toggleAddActionPanel() function.
 *
 * Dependencies: StorageManager.js (S1), ProfilePanel.js (S2),
 *               window.MizanoNav, window.MizanoAuth
 * Save to: Mizano\AddActionRouter.js (project root)
 */

window.AddActionRouter = (function () {

    // ─── 7 OPTIONS (DOC2 §5.1 — exact order) ─────────────────────────────────
    const OPTIONS = [
        {
            type: 'minor',
            icon: '👶',
            label: 'Add Minor',
            desc: 'Register a child profile or link a dependent'
        },
        {
            type: 'event',
            icon: '📅',
            label: 'Add Event / Activity',
            desc: 'Create a match, session, tournament, or social game'
        },
        {
            type: 'group',
            icon: '🏆',
            label: 'Add Group',
            desc: 'Start or register a team, club, or crew'
        },
        {
            type: 'association',
            icon: '🏛️',
            label: 'Add Association',
            desc: 'Register a governing body, league, or school sports department'
        },
        {
            type: 'venue',
            icon: '📍',
            label: 'Add Venue',
            desc: 'Submit a pitch, court, gym, hall, or sporting facility'
        },
        {
            type: 'business',
            icon: '🏢',
            label: 'Add Business',
            desc: 'List a shop, coaching service, gym, or corporate sponsor'
        },
        {
            type: 'activity_custom',
            icon: '📋',
            label: 'Add Player File',
            desc: 'Create your sport-specific athletic profile and CV'
        },
        {
            type: 'event_post',
            icon: '📢',
            label: 'Create Post',
            desc: 'Share an update, news, or poll to the Community feed'
        },
        {
            type: 'habit',
            icon: '🔁',
            label: 'Add Habit',
            desc: 'Start a new daily habit chain'
        },
        {
            type: 'injury',
            icon: '🩹',
            label: 'Log Injury',
            desc: 'Private log for recovery and pain tracking'
        }
    ];

    // ─── FORM TITLES ──────────────────────────────────────────────────────────
    const FORM_TITLES = {
        minor: 'Add Minor',
        event: 'Add Event',
        group: 'Add Group',
        association: 'Add Association',
        venue: 'Add Venue',
        business: 'Add Business',
        playerfile: 'Add Player File',
        activity_custom: 'Add Player File',
        event_post: 'Create Post',
        habit: 'Add Habit',
        injury: 'Log Injury'
    };

    // ─── STATE ────────────────────────────────────────────────────────────────
    let _sheetVisible = false;
    let _overlayEl = null;
    let _sheetEl = null;

    // ─── INIT — attach the + button listener ─────────────────────────────────

    function init() {
        const addBtn = document.getElementById('btn-add-content');
        if (addBtn) {
            addBtn.addEventListener('click', openSheet);
        }

        // Build the sheet DOM once and cache it
        _buildSheet();
    }

    // ─── BOTTOM SHEET — build ─────────────────────────────────────────────────

    function _buildSheet() {
        // Remove any stale sheet from previous builds
        const stale = document.getElementById('add-action-sheet-root');
        if (stale) stale.remove();

        const root = document.createElement('div');
        root.id = 'add-action-sheet-root';

        // Dark overlay
        const overlay = document.createElement('div');
        overlay.id = 'add-action-sheet-overlay';
        overlay.style.cssText = `
            position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,0.5);
            opacity:0;pointer-events:none;transition:opacity 0.25s ease;
        `;
        overlay.addEventListener('click', closeSheet);

        // Sheet panel
        const sheet = document.createElement('div');
        sheet.id = 'add-action-panel';
        sheet.style.cssText = `
            position:fixed;bottom:0;left:0;right:0;z-index:10001;
            background:#fff;border-radius:20px 20px 0 0;
            transform:translateY(100%);transition:transform 0.28s ease-out;
            max-height:85vh;overflow-y:auto;
            box-shadow:0 -4px 24px rgba(0,0,0,0.15);
        `;

        // Drag handle
        const handle = `<div style="width:40px;height:4px;background:#ddd;border-radius:2px;
            margin:12px auto 16px;"></div>`;

        // Profile Card Injection
        const profileCard = _renderProfileCard();

        // Option rows
        const rows = OPTIONS.map(opt => `
            <div class="add-action-row" data-type="${opt.type}"
                style="display:flex;align-items:center;gap:14px;padding:14px 20px;
                       cursor:pointer;transition:background 0.15s;border-bottom:1px solid #f5f5f5;"
                onmouseenter="this.style.background='#f8f8f8'"
                onmouseleave="this.style.background='transparent'">
                <div style="font-size:1.6rem;width:32px;text-align:center;">${opt.icon}</div>
                <div style="flex:1;">
                    <div style="font-weight:700;font-size:0.95rem;color:#1a1a1a;">${opt.label}</div>
                    <div style="font-size:0.75rem;color:#777;margin-top:2px;line-height:1.2;">${opt.desc}</div>
                </div>
                <div style="color:#ccc;font-size:1.2rem;">›</div>
            </div>
        `).join('');

        sheet.innerHTML = `
            ${handle}
            ${profileCard}
            <div style="padding:0 0 40px;">
                ${rows}
            </div>
        `;

        _sheetEl = sheet;
        _overlayEl = overlay;
        root.appendChild(overlay);
        root.appendChild(sheet);
        document.body.appendChild(root);

        // Attach listeners to rows
        sheet.querySelectorAll('.add-action-row').forEach(row => {
            row.addEventListener('click', () => {
                const type = row.dataset.type;
                openForm(type);
            });
        });

        // Attach Profile Card listener
        const pCard = sheet.querySelector('.add-action-profile-card');
        if (pCard) {
            pCard.addEventListener('click', () => {
                if (window.MizanoNav) {
                    window.MizanoNav.switchPanel(15);
                    closeSheet();
                }
            });
        }
    }

    // ─── PROFILE CARD RENDERER ───────────────────────────────────────────────

    function _renderProfileCard() {
        const user = window.authManager?.getCurrentUser() || { full_name: 'Guest User', email: 'guest@mizano.app', uid: 'guest' };
        const avatar = user.profile_picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name || 'Guest')}&background=random&color=fff`;

        return `
            <div class="add-action-profile-card"
                style="margin:0 20px 16px; padding:16px; background:#f9f9f9; border-radius:16px;
                       display:flex; align-items:center; gap:12px; cursor:pointer; border:1px solid #eee;">
                <img src="${avatar}" style="width:48px; height:48px; border-radius:12px; object-fit:cover; background:#eee;" />
                <div style="flex:1;">
                    <div style="font-weight:800; font-size:1rem; color:#1a1a1a;">${user.full_name || 'Mizano User'}</div>
                    <div style="font-size:0.8rem; color:#666;">View & Edit My Profile</div>
                </div>
                <div style="background:#1a73e8; color:#fff; padding:6px 12px; border-radius:8px; font-size:0.75rem; font-weight:700;">Mine</div>
            </div>
        `;
    }

    // ─── OPEN / CLOSE ─────────────────────────────────────────────────────────

    function openSheet() {
        if (!_overlayEl || !_sheetEl) _buildSheet();
        _sheetVisible = true;
        _overlayEl.style.opacity = '1';
        _overlayEl.style.pointerEvents = 'auto';
        _sheetEl.style.transform = 'translateY(0)';
    }

    function closeSheet(callback) {
        if (!_overlayEl || !_sheetEl) return;
        _sheetVisible = false;
        _overlayEl.style.opacity = '0';
        _overlayEl.style.pointerEvents = 'none';
        _sheetEl.style.transform = 'translateY(100%)';
        if (typeof callback === 'function') {
            setTimeout(callback, 280);
        }
    }

    // ─── OPTION TAP ───────────────────────────────────────────────────────────

    function _handleOptionTap(type) {
        // Demo mode guard — show sign up modal, do not write to IndexedDB
        if (window.MizanoAuth && window.MizanoAuth.isDemo && window.MizanoAuth.isDemo()) {
            if (window.ProfilePanel && window.ProfilePanel._showSignUpModal) {
                window.ProfilePanel._showSignUpModal();
            } else {
                _showFallbackSignUpModal();
            }
            return;
        }
        openForm(type);
    }

    // ─── OPEN FORM (DOC2 §5.2) ────────────────────────────────────────────────

    function openForm(formType) {
        const builderView = document.getElementById('builder-view');
        if (!builderView) {
            console.error('AddActionRouter: #builder-view not found in DOM');
            return;
        }

        builderView.innerHTML = '';

        // Inject sticky header
        builderView.insertAdjacentHTML('beforeend', _buildFormHeader(formType));

        // Inject form body — real modules from later sessions replace these stubs
        const formHTML = _getFormHTML(formType);
        builderView.insertAdjacentHTML('beforeend', formHTML);

        // Open the builder overlay
        if (window.MizanoNav && window.MizanoNav.openOverlay) {
            window.MizanoNav.openOverlay('builder');
        } else {
            // Fallback: manually show #builder-view
            const bv = document.getElementById('builder-view');
            if (bv) { bv.style.display = 'flex'; bv.classList.add('active'); }
        }

        // Re-attach collapsible listeners after DOM injection
        if (typeof attachCollapsibleListeners === 'function') {
            attachCollapsibleListeners();
        }
        _attachCollapsibleInternalListeners(builderView);

        // Call init for forms that need post-render setup
        if (formType === 'event_post' && window.EventPostForm) {
            window.EventPostForm.init();
        } else if (formType === 'habit' && window.HabitForm) {
            window.HabitForm.init();
        } else if (formType === 'injury' && window.InjuryForm) {
            window.InjuryForm.init();
        }
    }

    function _buildFormHeader(formType) {
        const title = FORM_TITLES[formType] || 'Create';
        return `
        <div class="overlay-header sticky-top" style="
            display:flex;align-items:center;padding:14px 16px;
            background:#fff;border-bottom:1px solid #f0f0f0;
            position:sticky;top:0;z-index:100;">
            <button onclick="window.MizanoNav && window.MizanoNav.closeOverlay('builder')"
                style="background:none;border:none;font-size:1.4rem;cursor:pointer;
                       color:#1a73e8;padding:4px 8px 4px 0;font-weight:600;">‹</button>
            <h2 style="flex:1;text-align:center;font-size:1rem;font-weight:700;
                       margin:0;color:#1a1a1a;">${title}</h2>
            <div style="width:40px;"></div><!-- balance spacer -->
        </div>`;
    }

    // ─── FORM HTML RESOLVER ───────────────────────────────────────────────────
    // Each case calls the real module once built; for now shows a stub if not loaded.

    function _getFormHTML(formType) {
        try {
            switch (formType) {
                case 'minor':
                    if (window.MinorForm) return window.MinorForm.render();
                    return _stub('Minor Profile', 'Session 4');
                case 'event':
                    if (window.EventForm) return window.EventForm.render();
                    return _stub('Event / Activity', 'Session 5');
                case 'group':
                    if (window.GroupForm) return window.GroupForm.render();
                    return _stub('Group', 'Session 6');
                case 'association':
                    if (window.AssociationForm) return window.AssociationForm.render();
                    return _stub('Association', 'Session 7');
                case 'venue':
                    if (window.VenueForm) return window.VenueForm.render();
                    return _stub('Venue', 'Session 8');
                case 'business':
                    if (window.BusinessForm) return window.BusinessForm.render();
                    return _stub('Business', 'Session 9');
                case 'playerfile':
                case 'player_file':
                case 'activity_custom':
                    if (window.PlayerFileForm) return window.PlayerFileForm.render();
                    return _stub('Custom Activity');
                case 'event_post':
                    if (window.EventPostForm) return window.EventPostForm.render();
                    return _stub('Event Post');
                case 'habit':
                    if (window.HabitForm) return window.HabitForm.render();
                    return _stub('Habit');
                case 'injury':
                    if (window.InjuryForm) return window.InjuryForm.render();
                    return _stub('Injury');
                default:
                    return _stub(formType);
            }
        } catch (e) {
            console.error('AddActionRouter: form render error', formType, e);
            return _stub(formType);
        }
    }

    function _stub(formName) {
        return `
        <div style="padding:40px 24px;text-align:center;color:#888;">
            <div style="font-size:2.5rem;margin-bottom:12px;">🚧</div>
            <h3 style="color:#1a1a1a;margin:0 0 8px;">${formName} Form</h3>
            <p style="font-size:0.85rem;line-height:1.5;margin:0;">
                Coming soon.
            </p>
        </div>`;
    }

    // ─── COLLAPSIBLE SECTIONS — internal attach (signup.html pattern) ─────────

    function _attachCollapsibleInternalListeners(container) {
        container.querySelectorAll('.collapsible-header').forEach(header => {
            // Avoid double-binding
            if (header.dataset.bound) return;
            header.dataset.bound = 'true';
            header.addEventListener('click', () => {
                const body = header.nextElementSibling;
                if (!body) return;
                const isOpen = body.style.display !== 'none' && body.style.display !== '';
                body.style.display = isOpen ? 'none' : 'block';
                const arrow = header.querySelector('.collapsible-arrow');
                if (arrow) arrow.textContent = isOpen ? '›' : '⌄';
            });
        });
    }

    // ─── FALLBACK SIGN UP MODAL ───────────────────────────────────────────────

    function _showFallbackSignUpModal() {
        let modal = document.getElementById('add-action-signup-modal');
        if (modal) { modal.style.display = 'flex'; return; }

        modal = document.createElement('div');
        modal.id = 'add-action-signup-modal';
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
                <button onclick="document.getElementById('add-action-signup-modal').style.display='none'"
                    style="width:100%;padding:11px;background:#f1f3f4;color:#444;border:none;
                           border-radius:10px;font-size:0.9rem;cursor:pointer;">
                    Continue Browsing
                </button>
            </div>`;
        document.body.appendChild(modal);
    }

    // ─── AUTO-INIT ────────────────────────────────────────────────────────────

    document.addEventListener('DOMContentLoaded', () => {
        init();
    });

    // ─── PUBLIC API ───────────────────────────────────────────────────────────

    return {
        init,
        openSheet,
        closeSheet,
        openForm
    };

})();

// ─── OVERRIDE the legacy toggleAddActionPanel if it exists ───────────────────
window.toggleAddActionPanel = function () {
    window.AddActionRouter.openSheet();
};


