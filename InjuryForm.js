/**
 * MIZANO INJURY FORM
 * Device-only log for tracking physical recovery.
 */

window.InjuryForm = (function() {

    function render() {
        return `
        <div id="if-form-wrap" style="padding:16px 0 100px;font-family:inherit;">
            ${_styles()}
            
            <div style="background:#fff5f5;border:1px solid #feb2b2;padding:12px;border-radius:8px;margin-bottom:16px;display:flex;align-items:flex-start;gap:10px;">
                <span style="font-size:1.2rem;">🩹</span>
                <div style="font-size:0.78rem;color:#c53030;line-height:1.4;">
                    <b>Private Recovery Log</b><br>
                    This information is stored <b>device-only</b>. It is not synced to the cloud and is used to track your personal recovery progress.
                </div>
            </div>

            <!-- ── SECTION 1: INCIDENT DETAILS ───────────────────────── -->
            <div class="if-section">
                <div class="if-section-hd collapsible-header if-open" data-sec="incident">
                    <span class="if-sec-title">Incident Details</span>
                    <span class="collapsible-arrow if-arrow">⌄</span>
                </div>
                <div class="if-section-body" id="sec-incident">
                    <label class="if-label">What happened? <span class="if-req">*</span></label>
                    <input type="text" id="if-desc" class="if-input" placeholder="e.g. Left ankle sprain during match">

                    <label class="if-label" style="margin-top:10px;">Body Part Affected</label>
                    <select id="if-body-part" class="if-input">
                        <option>Head / Neck</option>
                        <option>Shoulder</option>
                        <option>Arm / Elbow</option>
                        <option>Wrist / Hand</option>
                        <option>Back / Torso</option>
                        <option>Hip / Groin</option>
                        <option>Thigh (Hamstring/Quad)</option>
                        <option>Knee</option>
                        <option>Lower Leg (Calf/Shin)</option>
                        <option>Ankle / Foot</option>
                        <option>Other</option>
                    </select>

                    <div style="display:flex;gap:10px;margin-top:10px;">
                        <div style="flex:1;">
                            <label class="if-label">Incident Date</label>
                            <input type="date" id="if-date" class="if-input">
                        </div>
                        <div style="flex:1;">
                            <label class="if-label">Severity</label>
                            <select id="if-severity" class="if-input">
                                <option value="mild">Mild</option>
                                <option value="moderate">Moderate</option>
                                <option value="severe">Severe</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ── SECTION 2: RECOVERY PLAN ─────────────────────────── -->
            <div class="if-section">
                <div class="if-section-hd collapsible-header" data-sec="recovery">
                    <span class="if-sec-title">Recovery &amp; Rest</span>
                    <span class="collapsible-arrow if-arrow">›</span>
                </div>
                <div class="if-section-body" id="sec-recovery" style="display:none;">
                    <label class="if-label">Estimated Rest (Days)</label>
                    <input type="number" id="if-rest" class="if-input" value="3" min="0">

                    <label class="if-label" style="margin-top:10px;">Treatment / Notes</label>
                    <textarea id="if-notes" class="if-input if-textarea" placeholder="e.g. RICE (Rest, Ice, Compression, Elevation), seeing physio on Monday..." style="min-height:80px;"></textarea>

                    <label class="if-label" style="margin-top:10px;">Current Status</label>
                    <select id="if-status" class="if-input">
                        <option value="active">Active (Currently Hurting)</option>
                        <option value="recovering">Recovering (Light training)</option>
                        <option value="resolved">Resolved (Back to play)</option>
                    </select>
                </div>
            </div>

            <!-- ── FOOTER CTA ─────────────────────────────────────────── -->
            <div style="padding:16px;position:sticky;bottom:0;background:#fff;border-top:1px solid #f0f0f0;z-index:10;">
                <button type="button" class="if-submit-btn" onclick="window.InjuryForm._submit()">Log Incident</button>
            </div>
        </div>`;
    }

    function init() {
        // Set default date to today
        const dateInput = document.getElementById('if-date');
        if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
    }

    async function _submit() {
        const desc = document.getElementById('if-desc').value.trim();
        if (!desc) { _showToast('Please describe what happened.', 'error'); return; }

        const record = {
            injury_id: `INJ-${Date.now()}`,
            description: desc,
            body_part: document.getElementById('if-body-part').value,
            date: document.getElementById('if-date').value,
            severity: document.getElementById('if-severity').value,
            rest_days: parseInt(document.getElementById('if-rest').value) || 0,
            notes: document.getElementById('if-notes').value.trim(),
            status: document.getElementById('if-status').value,
            device_only: true,
            user_uid: window.mizanoStorage.getCurrentUserId()
        };

        try {
            await window.mizanoStorage.saveEntity('injury_log', record);
            _showToast('Recovery log updated! 🩹');
            
            setTimeout(() => {
                if (window.MizanoNav) window.MizanoNav.closeOverlay('builder');
                if (window.MizanoMine && window.MizanoMine.refreshData) {
                    window.MizanoMine.refreshData();
                }
            }, 1000);
        } catch (e) {
            console.error('InjuryForm: Save failed', e);
            _showToast('Failed to save log.', 'error');
        }
    }

    function _showToast(msg, type = 'success') {
        if (window.FormHelpers) window.FormHelpers.showToast(msg, type);
        else alert(msg);
    }

    function _styles() {
        if (document.getElementById('if-form-styles')) return '';
        return `<style id="if-form-styles">
            .if-section { background:#fff; border-bottom:1px solid #f0f0f0; }
            .if-section-hd { display:flex; align-items:center; justify-content:space-between; padding:14px 16px; cursor:pointer; user-select:none; }
            .if-sec-title { font-weight:600; font-size:0.88rem; color:#1a1a1a; }
            .if-arrow { font-size:1rem; color:#aaa; }
            .if-section-body { padding:4px 16px 16px; }
            .if-label { display:block; font-size:0.78rem; color:#555; font-weight:600; margin-bottom:4px; margin-top:2px; }
            .if-input { width:100%; padding:11px 12px; border:1px solid #dadce0; border-radius:8px; font-size:0.88rem; box-sizing:border-box; font-family:inherit; outline:none; transition:border-color 0.2s; }
            .if-input:focus { border-color:#e74c3c; }
            .if-textarea { resize:vertical; }
            .if-req { color:#e53935; }
            .if-submit-btn { width:100%; padding:14px; background:#e74c3c; color:#fff; border:none; border-radius:10px; font-size:0.95rem; font-weight:700; cursor:pointer; font-family:inherit; }
        </style>`;
    }

    return { render, init, _submit };

})();
