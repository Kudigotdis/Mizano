/**
 * MIZANO GUARDIAN SAFETY SYSTEM
 * Enforces the Guardian-Minor Handshake for users under 16.
 * Absolute Law: Minors cannot join competitive activities without guardian approval.
 * Health data is NEVER stored in this module — device-local only.
 *
 * Exported as: window.MizanoSafety
 */

class GuardianSafety {
    constructor() {
        this.currentUser = null;
        this.MINOR_AGE_THRESHOLD = 16;

        // Action permission map
        // true = always allowed | false = always blocked | 'guardian' = needs approval
        this.ACTION_RULES = {
            'COMPETITIVE_JOIN':     'guardian',   // Joining competitive matches
            'TEAM_JOIN':            'guardian',   // Joining a team
            'EVENT_REGISTER':       'guardian',   // Registering for events
            'VENUE_BOOK':           'guardian',   // Booking a venue slot
            'PROFILE_VIEW':         true,         // Always allowed
            'ACTIVITY_BROWSE':      true,         // Always allowed
            'LESSON_JOIN':          'guardian',   // Joining lessons/coaching
            'GROUP_JOIN':           'guardian',   // Joining groups
            'COMMUNITY_POST':       'guardian',   // Posting to community
            'LOST_FOUND_POST':      true,         // Low-risk — allowed
            'SHOPPING_BROWSE':      true,         // Always allowed
            'SHOPPING_PURCHASE':    'guardian',   // Needs guardian approval
        };
    }

    /**
     * Set the active user. Called by shell.js after DataManager init.
     * @param {Object|null} user
     */
    setUser(user) {
        this.currentUser = user;
        if (user) {
            console.log(`GuardianSafety: User set — ${user.full_name || user.name || user.uid} | Minor: ${this.isMinor(user)}`);
        }
    }

    /**
     * Determine if a user is a minor based on date_of_birth.
     * @param {Object} user
     * @returns {boolean}
     */
    isMinor(user) {
        if (!user) return false;

        // Explicit flag from enrollment
        if (user.is_minor === true) return true;
        if (user.profile_type === 'minor' || user.profile_type === 'child') return true;

        // Age calculation from date_of_birth
        const dob = user.date_of_birth || user.dob;
        if (!dob) return false;

        const birthDate = new Date(dob);
        if (isNaN(birthDate.getTime())) return false;

        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age < this.MINOR_AGE_THRESHOLD;
    }

    /**
     * Check if the current user can perform an action.
     * @param {string} actionCode - Key from ACTION_RULES
     * @param {Object} [context]  - Optional: { activity_id, team_id, etc. }
     * @returns {{ allowed: boolean, reason: string, requiresHandshake: boolean }}
     */
    checkAction(actionCode, context = {}) {
        const user = this.currentUser;

        // No user — guest mode, allow browsing only
        if (!user || user.is_guest) {
            const guestAllowed = ['PROFILE_VIEW', 'ACTIVITY_BROWSE', 'SHOPPING_BROWSE', 'LOST_FOUND_POST'].includes(actionCode);
            return {
                allowed: guestAllowed,
                reason: guestAllowed ? 'Guest browsing allowed' : 'Please log in to perform this action.',
                requiresHandshake: false
            };
        }

        const rule = this.ACTION_RULES[actionCode];

        // Unknown action — default allow (non-destructive)
        if (rule === undefined) {
            return { allowed: true, reason: 'Action permitted', requiresHandshake: false };
        }

        // Always allowed
        if (rule === true) {
            return { allowed: true, reason: 'Action permitted', requiresHandshake: false };
        }

        // Always blocked
        if (rule === false) {
            return { allowed: false, reason: 'This action is not permitted.', requiresHandshake: false };
        }

        // Guardian handshake required for minors
        if (rule === 'guardian' && this.isMinor(user)) {
            const hasGuardianApproval = this.checkGuardianApproval(user, actionCode, context);
            return {
                allowed: hasGuardianApproval,
                reason: hasGuardianApproval
                    ? 'Guardian approval on file.'
                    : 'A guardian must approve this action for users under 16.',
                requiresHandshake: !hasGuardianApproval
            };
        }

        // Adult performing guardian-rule action — always allowed
        return { allowed: true, reason: 'Action permitted', requiresHandshake: false };
    }

    /**
     * Check if guardian has pre-approved the activity type.
     * Reads from the minor's enrolled guardian approvals in StorageManager.
     * @param {Object} user
     * @param {string} actionCode
     * @param {Object} context
     * @returns {boolean}
     */
    checkGuardianApproval(user, actionCode, context) {
        // Check if guardian has granted blanket approval for this action type
        const approvals = user.guardian_approvals || {};
        if (approvals[actionCode] === true) return true;

        // Check specific activity approval
        if (context.activity_id && approvals[context.activity_id] === true) return true;

        // Load from storage
        if (window.mizanoStorage) {
            const storedApprovals = window.mizanoStorage.load(`guardian_approvals_${user.uid}`, {});
            if (storedApprovals[actionCode] === true) return true;
            if (context.activity_id && storedApprovals[context.activity_id] === true) return true;
        }

        return false;
    }

    /**
     * Trigger the Guardian Handshake UI flow.
     * Shows a blocking modal that requires guardian PIN or confirmation.
     * @param {string} actionCode
     * @param {Function} onApproved - Callback when guardian approves
     * @param {Function} onDenied   - Callback when denied / dismissed
     */
    triggerHandshake(actionCode, onApproved, onDenied) {
        const actionLabels = {
            'COMPETITIVE_JOIN': 'join a competitive match',
            'TEAM_JOIN': 'join a team',
            'EVENT_REGISTER': 'register for an event',
            'VENUE_BOOK': 'book a venue',
            'LESSON_JOIN': 'join a lesson or coaching session',
            'GROUP_JOIN': 'join a group',
            'COMMUNITY_POST': 'post to the community',
            'SHOPPING_PURCHASE': 'make a purchase',
        };
        const label = actionLabels[actionCode] || 'perform this action';

        // Remove any existing handshake modal
        const existing = document.getElementById('guardian-handshake-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'guardian-handshake-modal';
        modal.style.cssText = `
            position: fixed; inset: 0; z-index: 99999;
            background: rgba(0,0,0,0.75);
            display: flex; align-items: flex-end; justify-content: center;
        `;

        modal.innerHTML = `
            <div style="background:#fff; width:100%; max-width:480px; border-radius:20px 20px 0 0;
                        padding:24px 20px 40px; box-shadow:0 -4px 20px rgba(0,0,0,0.2);">
                <div style="width:40px;height:4px;background:#ddd;border-radius:2px;margin:0 auto 16px;"></div>
                <div style="font-size:1.8rem; text-align:center; margin-bottom:8px;">🛡️</div>
                <h2 style="text-align:center; font-size:1.1rem; margin:0 0 8px; font-weight:700;">
                    Guardian Approval Required
                </h2>
                <p style="text-align:center; font-size:0.9rem; color:#555; margin:0 0 20px; line-height:1.4;">
                    This account is under 16. A guardian must approve the request to
                    <strong>${label}</strong>.
                </p>
                <div style="display:flex; gap:10px; flex-direction:column;">
                    <button id="guardian-approve-btn"
                        style="padding:14px; background:#1E88E5; color:#fff; border:none;
                               border-radius:12px; font-size:1rem; font-weight:700; cursor:pointer;">
                        ✅ Guardian Approves (Tap to Confirm)
                    </button>
                    <button id="guardian-deny-btn"
                        style="padding:14px; background:#f1f3f4; color:#333; border:none;
                               border-radius:12px; font-size:0.95rem; cursor:pointer;">
                        Cancel
                    </button>
                </div>
                <p style="text-align:center; font-size:0.75rem; color:#aaa; margin-top:12px;">
                    Mizano keeps children safe — guardians can manage approvals in the Mine panel.
                </p>
            </div>
        `;

        document.body.appendChild(modal);

        document.getElementById('guardian-approve-btn').addEventListener('click', () => {
            modal.remove();
            // Store approval for this session
            if (this.currentUser && window.mizanoStorage) {
                const approvals = window.mizanoStorage.load(`guardian_approvals_${this.currentUser.uid}`, {});
                approvals[actionCode] = true;
                window.mizanoStorage.save(`guardian_approvals_${this.currentUser.uid}`, approvals);
            }
            if (typeof onApproved === 'function') onApproved();
        });

        document.getElementById('guardian-deny-btn').addEventListener('click', () => {
            modal.remove();
            if (typeof onDenied === 'function') onDenied();
        });

        // Tap outside to dismiss
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                if (typeof onDenied === 'function') onDenied();
            }
        });
    }

    /**
     * Convenience wrapper: check action, and if minor needs handshake, show modal.
     * @param {string} actionCode
     * @param {Function} onAllowed  - Called if action is permitted (immediately or after guardian OK)
     * @param {Function} [onBlocked] - Called if blocked permanently
     * @param {Object} [context]
     */
    gate(actionCode, onAllowed, onBlocked, context = {}) {
        const result = this.checkAction(actionCode, context);

        if (result.allowed) {
            if (typeof onAllowed === 'function') onAllowed();
            return;
        }

        if (result.requiresHandshake) {
            this.triggerHandshake(
                actionCode,
                onAllowed,   // Guardian approved → proceed
                () => {
                    if (window.MizanoShell) {
                        window.MizanoShell.showToast('Guardian approval required to proceed.', 'warning');
                    }
                    if (typeof onBlocked === 'function') onBlocked();
                }
            );
            return;
        }

        // Hard block
        if (window.MizanoShell) {
            window.MizanoShell.showToast(result.reason || 'This action is not permitted.', 'error');
        }
        if (typeof onBlocked === 'function') onBlocked();
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL SINGLETON
// ─────────────────────────────────────────────────────────────────────────────
window.MizanoSafety = new GuardianSafety();
console.log('GuardianSafety: Loaded — minor protection active.');
