/**
 * MIZANO GUARDIAN SAFETY ENGINE
 * Absolute Law: GUARDIAN_SAFETY_PROTOCOLS.md v1.0
 */

class GuardianSafety {
    constructor() {
        this.currentUser = null;
        this.approvalQueue = []; // Simulated local store for Guardian approvals
    }

    /**
     * Initializes safety context for a user.
     */
    setUser(user) {
        this.currentUser = user;
        if (user) {
            console.log(`Safety Engine: Context set for ${user.display_name} (${user.profile_type})`);
        }
    }

    /**
     * Checks if a user is a minor (Under 16).
     */
    isMinor() {
        if (!this.currentUser || !this.currentUser.date_of_birth) return false;
        const dob = new Date(this.currentUser.date_of_birth);
        const age = this.calculateAge(dob);
        return age < 16;
    }

    /**
     * Calculates age based on DOB.
     */
    calculateAge(dob) {
        const diff = Date.now() - dob.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    /**
     * Evaluates if an action is allowed based on safety protocols.
     * @returns { allowed: boolean, reason: string, code: string }
     */
    checkAction(actionType, context = {}) {
        if (!this.currentUser) return { allowed: false, reason: 'Guest', code: 'UNAUTH' };

        // Protocol 3.2: Academic Alert Block
        if (this.currentUser.academic_alert) {
            if (actionType === 'COMPETITIVE_JOIN') {
                return {
                    allowed: false,
                    reason: 'Activities Paused (Academic Focus)',
                    code: 'ACADEMIC_ALERT'
                };
            }
        }

        // Protocol 47: Minor Age Gates
        if (this.isMinor()) {
            if (actionType === 'COMPETITIVE_JOIN') {
                // Check if already approved locally
                const isApproved = this.approvalQueue.some(a =>
                    a.user_id === this.currentUser.uid &&
                    a.activity_id === context.activity_id &&
                    a.status === 'approved'
                );

                if (!isApproved) {
                    return {
                        allowed: false,
                        reason: 'Guardian Approval Required',
                        code: 'MINOR_RESTRICTION'
                    };
                }
            }
        }

        return { allowed: true };
    }

    /**
     * Simulates sending a request to a guardian.
     */
    requestApproval(activityId) {
        if (!this.currentUser || !this.currentUser.guardian_id) return;

        console.log(`Safety Engine: Approval request sent to ${this.currentUser.guardian_id} for ${activityId}`);

        // Push to local queue in 'pending' state
        this.approvalQueue.push({
            user_id: this.currentUser.uid,
            activity_id: activityId,
            status: 'pending',
            timestamp: Date.now()
        });

        return true;
    }
}

window.MizanoSafety = new GuardianSafety();
