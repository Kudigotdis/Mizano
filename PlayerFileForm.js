/**
 * MIZANO — PlayerFileForm.js (Session 10)
 * Applied Android Studio Otter Pipeline standards.
 *
 * PlayerFileForm.render() → HTML string injected by AddActionRouter.openForm('player_file')
 * On submit → window.mizanoStorage.saveEntity('player_files', record)
 * Can be created by the player themselves, or a guardian/parent for a linked Minor.
 * Includes biometric profile, identity docs, club/school verification links, contract history, and medical clearance.
 *
 * Save to: Mizano\PlayerFileForm.js
 */

window.PlayerFileForm = (function () {

    const SPORTS = [
        'Soccer', 'Netball', 'Basketball', 'Athletics', 'Swimming', 'Tennis',
        'Cricket', 'Rugby', 'Chess', 'Cycling', 'Volleyball', 'Badminton',
        'Table Tennis', 'Golf', 'Martial Arts', 'Boxing', 'Dance', 'Gymnastics',
        'Hockey', 'Softball', 'Baseball', 'Triathlon', 'Hiking', 'Squash'
    ];

    const POSITIONS = {
        'Soccer': ['Goalkeeper', 'Defender (CB)', 'Defender (FB/WB)', 'Midfielder (DM/CM)', 'Midfielder (AM/Wing)', 'Forward/Striker'],
        'Netball': ['GS', 'GA', 'WA', 'C', 'WD', 'GD', 'GK'],
        'Basketball': ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'],
        'Rugby': ['Prop', 'Hooker', 'Lock', 'Flanker', 'Number 8', 'Scrum-half', 'Fly-half', 'Center', 'Winger', 'Fullback'],
        'Other': ['N/A', 'Utility', 'Specialist']
    };

    const FOOT_HAND = ['Right', 'Left', 'Ambidextrous'];

    // ─────────────────────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────────────────────

    function render() {
        return `
        <div id="pf-form-wrap" style="padding:16px 0 100px;font-family:inherit;">
            ${_styles()}
            
            <div style="background:#e8f0fe;color:#1a73e8;padding:12px;border-radius:8px;font-size:0.8rem;margin-bottom:16px;line-height:1.4;">
                <b>What is a Player File?</b>
                A detailed athletic passport used by scouts, federations, and top-tier teams for registration, transfers, and medical verification. <b>Only visible to verified officials you grant access to.</b>
            </div>

            <label class="pf-label">Who is this file for?</label>
            <select id="pf-subject-type" class="pf-input" style="margin-bottom:16px;" onchange="window.PlayerFileForm._toggleSubject(this.value)">
                <option value="self">Myself</option>
                <option value="minor">A minor I manage</option>
            </select>
            
            <div id="pf-minor-select-wrap" style="display:none;margin-bottom:16px;background:#f8f9fa;padding:12px;border-radius:8px;border:1px solid #eee;">
                <label class="pf-label">Select Minor</label>
                <select id="pf-minor-id" class="pf-input" onfocus="window.PlayerFileForm._loadMinors()"></select>
                <p class="pf-hint" style="margin-top:4px;">Minors must be created via <br><b>'+' -> Add Minor</b> first.</p>
            </div>

            <!-- ── SECTION 1: ATHLETIC PROFILE ────────────────────────── -->
            <div class="pf-section">
                <div class="pf-section-hd collapsible-header pf-open" data-sec="profile">
                    <span class="pf-sec-title"><span class="pf-req">*</span> Athletic Profile</span>
                    <span class="collapsible-arrow pf-arrow">⌄</span>
                </div>
                <div class="pf-section-body" id="sec-profile">
                    <label class="pf-label">Primary Sport <span class="pf-req">*</span></label>
                    <select id="pf-sport" class="pf-input" required onchange="window.PlayerFileForm._updatePositions(this.value)">
                        <option value="">Select sport…</option>
                        ${SPORTS.map(s => `<option>${s}</option>`).join('')}
                    </select>

                    <label class="pf-label" style="margin-top:10px;">Primary Position</label>
                    <select id="pf-pos1" class="pf-input"><option value="">Select sport first…</option></select>

                    <label class="pf-label" style="margin-top:10px;">Secondary Position</label>
                    <select id="pf-pos2" class="pf-input"><option value="">Select sport first…</option></select>

                    <div style="display:flex;gap:10px;margin-top:10px;">
                        <div style="flex:1;">
                            <label class="pf-label">Dominant Foot/Hand</label>
                            <select id="pf-dom" class="pf-input">
                                <option value="">Select…</option>
                                ${FOOT_HAND.map(f => `<option>${f}</option>`).join('')}
                            </select>
                        </div>
                        <div style="flex:1;">
                            <label class="pf-label">Jersey # Pref.</label>
                            <input type="number" id="pf-jersey" class="pf-input" placeholder="e.g. 10">
                        </div>
                    </div>

                    <div style="display:flex;gap:10px;margin-top:10px;">
                        <div style="flex:1;">
                            <label class="pf-label">Height (cm)</label>
                            <input type="number" id="pf-height" class="pf-input" placeholder="e.g. 182">
                        </div>
                        <div style="flex:1;">
                            <label class="pf-label">Weight (kg)</label>
                            <input type="number" id="pf-weight" class="pf-input" placeholder="e.g. 75.5" step="0.1">
                        </div>
                    </div>
                    
                    <label class="pf-label" style="margin-top:10px;">Personal Bests / Key Stats (Optional)</label>
                    <textarea id="pf-stats-bio" class="pf-input pf-textarea" placeholder="e.g. 100m sprint: 11.2s, Top scorer U17 league" maxlength="300"></textarea>
                </div>
            </div>

            <!-- ── SECTION 2: IDENTITY DOCUMENTS ──────────────────────── -->
            <div class="pf-section">
                <div class="pf-section-hd collapsible-header" data-sec="docs">
                    <span class="pf-sec-title">Identity &amp; Citizenship</span>
                    <span class="collapsible-arrow pf-arrow">›</span>
                </div>
                <div class="pf-section-body" id="sec-docs" style="display:none;">
                    <p class="pf-hint">Required for official league registration and national team selection.</p>
                    
                    <label class="pf-label">Omang ID / Passport Number</label>
                    <input type="text" id="pf-id-num" class="pf-input" placeholder="National ID or Passport No.">
                    
                    <div style="display:flex;gap:10px;margin-top:10px;">
                        <div style="flex:1;">
                            <label class="pf-label">Nationality</label>
                            <input type="text" id="pf-nat1" class="pf-input" placeholder="Primary (e.g. Motswana)">
                        </div>
                        <div style="flex:1;">
                            <label class="pf-label">Dual Citizen (Optional)</label>
                            <input type="text" id="pf-nat2" class="pf-input" placeholder="Second Nationality">
                        </div>
                    </div>

                    <label class="pf-label" style="margin-top:20px;">Upload ID Copy (Front)</label>
                    <div style="display:flex;align-items:center;gap:10px;">
                        <button type="button" class="pf-secondary-btn" style="flex:1;" onclick="document.getElementById('pf-doc-id').click()">Upload Photo/PDF</button>
                        <input type="file" id="pf-doc-id" accept="image/*,.pdf" style="display:none;" onchange="window.PlayerFileForm._docUploaded(this, 'pf-doc-id-status')">
                        <span id="pf-doc-id-status" style="font-size:0.75rem;color:#1a73e8;display:none;flex:1;">✓ Selected</span>
                    </div>
                </div>
            </div>

            <!-- ── SECTION 3: CURRENT AFFILIATIONS ────────────────────── -->
            <div class="pf-section">
                <div class="pf-section-hd collapsible-header" data-sec="affil">
                    <span class="pf-sec-title">Club &amp; School Affiliation</span>
                    <span class="collapsible-arrow pf-arrow">›</span>
                </div>
                <div class="pf-section-body" id="sec-affil" style="display:none;">
                    
                    <label class="pf-label">Current Main Club/Team</label>
                    <div style="display:flex;gap:6px;margin-bottom:8px;">
                        <input type="text" id="pf-team-search" class="pf-input" placeholder="Search groups/teams..." oninput="window.PlayerFileForm._searchEntity(this.value, 'groups', 'team')" style="flex:2;">
                    </div>
                    <div id="pf-team-results" class="pf-dropdown-list" style="display:none;margin-top:-4px;margin-bottom:8px;"></div>
                    <div id="pf-team-selected" style="display:none;align-items:center;justify-content:space-between;background:#e8f0fe;padding:8px 12px;border-radius:6px;border:1px solid #1a73e8;">
                        <span id="pf-team-name-disp" style="font-size:0.85rem;color:#1a73e8;font-weight:600;"></span>
                        <span style="color:#e53935;cursor:pointer;font-weight:700;padding:4px;" onclick="window.PlayerFileForm._removeLink('team')">×</span>
                    </div>
                    <input type="hidden" id="pf-team-id">

                    <label class="pf-label" style="margin-top:16px;">Current School (If student athlete)</label>
                    <div style="display:flex;gap:6px;margin-bottom:8px;">
                        <input type="text" id="pf-school-search" class="pf-input" placeholder="Search schools..." oninput="window.PlayerFileForm._searchEntity(this.value, 'schools', 'school')" style="flex:2;">
                    </div>
                    <div id="pf-school-results" class="pf-dropdown-list" style="display:none;margin-top:-4px;margin-bottom:8px;"></div>
                    <div id="pf-school-selected" style="display:none;align-items:center;justify-content:space-between;background:#e8f0fe;padding:8px 12px;border-radius:6px;border:1px solid #1a73e8;">
                        <span id="pf-school-name-disp" style="font-size:0.85rem;color:#1a73e8;font-weight:600;"></span>
                        <span style="color:#e53935;cursor:pointer;font-weight:700;padding:4px;" onclick="window.PlayerFileForm._removeLink('school')">×</span>
                    </div>
                    <input type="hidden" id="pf-school-id">
                    
                    <div style="background:#fff3cd;color:#856404;padding:8px;border-radius:6px;font-size:0.75rem;margin-top:12px;display:flex;align-items:center;gap:6px;">
                        <span>⚠️</span> Linking an entity requires their Admin to verify you before the "Verified Player" badge appears.
                    </div>
                </div>
            </div>

            <!-- ── SECTION 4: TRANSFER & CONTRACTS ────────────────────── -->
            <div class="pf-section">
                <div class="pf-section-hd collapsible-header" data-sec="transfer">
                    <span class="pf-sec-title">Transfer Status</span>
                    <span class="collapsible-arrow pf-arrow">›</span>
                </div>
                <div class="pf-section-body" id="sec-transfer" style="display:none;">
                    
                    <label class="pf-label">Current Player Status</label>
                    <select id="pf-status" class="pf-input">
                        <option value="Amateur">Amateur</option>
                        <option value="Semi-Pro">Semi-Professional</option>
                        <option value="Professional">Professional</option>
                        <option value="Free Agent">Free Agent / Unattached</option>
                        <option value="Retired">Retired</option>
                    </select>

                    <label class="pf-label" style="margin-top:10px;">Contract Expiry (If applicable)</label>
                    <input type="date" id="pf-contract-end" class="pf-input">

                    <label class="pf-label" style="margin-top:10px;">Previous Major Club/Team</label>
                    <input type="text" id="pf-prev-club" class="pf-input" placeholder="e.g. Township Rollers FC">
                    
                    <div style="border:1px dashed #ccc;padding:12px;border-radius:8px;background:#fafafa;margin-top:16px;">
                        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                            <span style="font-size:0.8rem;font-weight:600;">Clearance Letter / ITC</span>
                            <button type="button" class="bf-secondary-btn" style="width:auto;padding:4px 10px;font-size:0.75rem;" onclick="document.getElementById('pf-doc-clearance').click()">Upload</button>
                            <input type="file" id="pf-doc-clearance" accept="image/*,.pdf" style="display:none;" onchange="window.PlayerFileForm._docUploaded(this, 'pf-doc-clearance-status')">
                        </div>
                        <div id="pf-doc-clearance-status" style="font-size:0.7rem;color:#1a73e8;display:none;">✓ File selected</div>
                    </div>
                </div>
            </div>

            <!-- ── SECTION 5: MEDICAL CLEARANCE ───────────────────────── -->
            <div class="pf-section" style="border-bottom:none;">
                <div class="pf-section-hd collapsible-header" data-sec="medical">
                    <span class="pf-sec-title">Medical Clearance</span>
                    <span class="collapsible-arrow pf-arrow">›</span>
                </div>
                <div class="pf-section-body" id="sec-medical" style="display:none;">
                    <p class="pf-hint" style="color:#d32f2f;"><b>CONFIDENTIAL:</b> Medical data is strictly device-only. It is never synced to the cloud and is only generated into physical PDFs or shown visually on-device to authorized personnel.</p>
                    
                    <label class="pf-label">Blood Type</label>
                    <select id="pf-blood" class="pf-input">
                        <option value="">Unknown</option>
                        <option value="A+">A+</option><option value="A-">A-</option>
                        <option value="B+">B+</option><option value="B-">B-</option>
                        <option value="AB+">AB+</option><option value="AB-">AB-</option>
                        <option value="O+">O+</option><option value="O-">O-</option>
                    </select>
                    
                    <label class="pf-label" style="margin-top:10px;">Known Allergies</label>
                    <textarea id="pf-allergies" class="pf-input pf-textarea" placeholder="e.g. Penicillin, bees, none..." style="min-height:50px;"></textarea>
                    
                    <label class="pf-label" style="margin-top:10px;">Chronic Conditions / Past Major Surgeries</label>
                    <textarea id="pf-conditions" class="pf-input pf-textarea" placeholder="e.g. Asthma, ACL reconstruction 2023..." style="min-height:60px;"></textarea>

                    <div style="border:1px dashed #e53935;padding:12px;border-radius:8px;background:#ffebee;margin-top:16px;">
                        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                            <span style="font-size:0.8rem;font-weight:600;color:#c62828;">Annual Medical Certificate</span>
                            <button type="button" class="bf-secondary-btn" style="width:auto;padding:4px 10px;font-size:0.75rem;background:#fff;border:1px solid #e53935;" onclick="document.getElementById('pf-doc-med').click()">Upload Local Copy</button>
                            <input type="file" id="pf-doc-med" accept="image/*,.pdf" style="display:none;" onchange="window.PlayerFileForm._docUploaded(this, 'pf-doc-med-status')">
                        </div>
                        <div id="pf-doc-med-status" style="font-size:0.7rem;color:#c62828;display:none;">✓ File selected</div>
                    </div>

                    <div style="display:flex;align-items:flex-start;gap:10px;margin-top:20px;padding:12px;background:#f5f5f5;border-radius:8px;">
                        <input type="checkbox" id="pf-consent" style="margin-top:2px;">
                        <label for="pf-consent" style="font-size:0.75rem;color:#444;line-height:1.4;">
                            I certify that the information provided is accurate. I authorize Mizano to store this Player File to facilitate official registration processes.
                        </label>
                    </div>
                </div>
            </div>

            <!-- ── FOOTER CTA ─────────────────────────────────────────── -->
            <div style="padding:16px;position:sticky;bottom:0;background:#fff;border-top:1px solid #f0f0f0;z-index:10;">
                <button type="button" class="pf-submit-btn" onclick="window.PlayerFileForm._submit()">Save Player File</button>
            </div>
        </div>`;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // DYNAMIC UI HELPERS
    // ─────────────────────────────────────────────────────────────────────────

    function _updatePositions(sport) {
        const p1 = document.getElementById('pf-pos1');
        const p2 = document.getElementById('pf-pos2');
        if (!p1 || !p2) return;

        const opts = POSITIONS[sport] || POSITIONS['Other'];
        const html = `<option value="">Select position…</option>` + opts.map(o => `<option>${o}</option>`).join('');
        p1.innerHTML = html;
        p2.innerHTML = html;
    }

    function _toggleSubject(val) {
        document.getElementById('pf-minor-select-wrap').style.display = val === 'minor' ? 'block' : 'none';
        if (val === 'minor') _loadMinors();
    }

    async function _loadMinors() {
        const sel = document.getElementById('pf-minor-id');
        const userId = window.mizanoStorage.getCurrentUserId();
        try {
            const allMinors = await window.mizanoStorage.performTransaction('minors', 'readonly', s => s.getAll());
            // Guard against null storage or errors
            const myMinors = (allMinors || []).filter(m => m.manager_id === userId);

            if (myMinors.length === 0) {
                sel.innerHTML = `<option value="">No minors found. Add one first.</option>`;
                sel.disabled = true;
            } else {
                sel.disabled = false;
                sel.innerHTML = `<option value="">Select a minor...</option>` +
                    myMinors.map(m => `<option value="${m.minor_id}">${m.first_name} ${m.last_name}</option>`).join('');
            }
        } catch (e) { console.error('Error loading minors', e); }
    }

    function _docUploaded(input, statusId) {
        if (input.files[0]) {
            const el = document.getElementById(statusId);
            el.style.display = 'block';
            el.textContent = `✓ ${input.files[0].name.substring(0, 15)}...`;
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // ENTITY SEARCH (Club / School)
    // ─────────────────────────────────────────────────────────────────────────

    async function _searchEntity(query, store, typePrefix) {
        const q = query.toLowerCase().trim();
        const resultsEl = document.getElementById(`pf-${typePrefix}-results`);
        if (q.length < 2) { resultsEl.style.display = 'none'; return; }

        try {
            const all = await window.mizanoStorage.performTransaction(store, 'readonly', s => s.getAll());
            const matches = (all || []).filter(i => (i.name || '').toLowerCase().includes(q)).slice(0, 5);

            if (!matches.length) { resultsEl.style.display = 'none'; return; }
            resultsEl.innerHTML = matches.map(m => `
                <div class="pf-dropdown-item" onclick="window.PlayerFileForm._selectLink('${typePrefix}','${m.local_id || m.group_id || m.id}','${_safeAttr(m.name)}')">
                    ${m.name}
                </div>`).join('');
            resultsEl.style.display = 'block';
        } catch { resultsEl.style.display = 'none'; }
    }

    function _selectLink(typePrefix, id, name) {
        document.getElementById(`pf-${typePrefix}-results`).style.display = 'none';
        document.getElementById(`pf-${typePrefix}-search`).style.display = 'none';

        document.getElementById(`pf-${typePrefix}-id`).value = id;
        document.getElementById(`pf-${typePrefix}-name-disp`).textContent = name;
        document.getElementById(`pf-${typePrefix}-selected`).style.display = 'flex';
    }

    function _removeLink(typePrefix) {
        document.getElementById(`pf-${typePrefix}-id`).value = '';
        document.getElementById(`pf-${typePrefix}-name-disp`).textContent = '';
        document.getElementById(`pf-${typePrefix}-selected`).style.display = 'none';

        const searchInput = document.getElementById(`pf-${typePrefix}-search`);
        searchInput.value = '';
        searchInput.style.display = 'block';
        searchInput.focus();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SUBMIT
    // ─────────────────────────────────────────────────────────────────────────

    async function _submit() {
        if (window.MizanoAuth?.isDemo?.()) { window.ProfilePanel?._showSignUpModal(); return; }

        const subjType = document.getElementById('pf-subject-type').value;
        const sport = document.getElementById('pf-sport').value;
        const minorId = document.getElementById('pf-minor-id').value;
        const consent = document.getElementById('pf-consent').checked;

        if (!sport) { _showToast('Primary Sport is required.', 'error'); return; }
        if (subjType === 'minor' && !minorId) { _showToast('Please select a minor, or create one.', 'error'); return; }
        if (!consent) { _showToast('You must check the certification/consent box.', 'error'); return; }

        const userId = window.mizanoStorage.getCurrentUserId();
        const now = Date.now();
        const fileId = `PLF-${subjType === 'self' ? userId : minorId}-${now}`;

        // Get dummy base64s for documents (in real app -> file storage)
        const iddoc = document.getElementById('pf-doc-id').files[0] ? 'uploaded_dummy_blob' : null;
        const itcdoc = document.getElementById('pf-doc-clearance').files[0] ? 'uploaded_dummy_blob' : null;
        const meddoc = document.getElementById('pf-doc-med').files[0] ? 'local_dummy_blob' : null;

        const record = {
            player_file_id: fileId,
            subject_type: subjType, // 'self' or 'minor'
            subject_id: subjType === 'self' ? userId : minorId,
            managed_by: userId,

            athletic_profile: {
                primary_sport: sport,
                pos1: document.getElementById('pf-pos1').value,
                pos2: document.getElementById('pf-pos2').value,
                dominant_side: document.getElementById('pf-dom').value,
                jersey_pref: parseInt(document.getElementById('pf-jersey').value) || null,
                height_cm: parseFloat(document.getElementById('pf-height').value) || null,
                weight_kg: parseFloat(document.getElementById('pf-weight').value) || null,
                stats_bio: document.getElementById('pf-stats-bio').value.trim()
            },

            identity: {
                id_passport_num: document.getElementById('pf-id-num').value.trim(),
                nationality_primary: document.getElementById('pf-nat1').value.trim(),
                nationality_secondary: document.getElementById('pf-nat2').value.trim(),
                id_document: iddoc
            },

            affiliations: {
                current_team_id: document.getElementById('pf-team-id').value || null,
                current_school_id: document.getElementById('pf-school-id').value || null,
                verification_status: 'Pending' // Requires team admin to verify
            },

            transfer_status: {
                status: document.getElementById('pf-status').value,
                contract_end_date: document.getElementById('pf-contract-end').value || null,
                previous_major_club: document.getElementById('pf-prev-club').value.trim(),
                clearance_document: itcdoc
            }
        };

        // MEDICAL DATA - Strict device-only logic
        const medicalRecord = {
            parent_id: fileId,
            blood_type: document.getElementById('pf-blood').value,
            allergies: document.getElementById('pf-allergies').value.trim(),
            conditions: document.getElementById('pf-conditions').value.trim(),
            medical_cert: meddoc,
            device_only: true, // Core security flag per DOC1
            last_modified: new Date().toISOString()
        };

        try {
            // Save core file
            await window.mizanoStorage.saveEntity('player_files', record);

            // Save medical separately to the device-only medical_records store
            await window.mizanoStorage.performTransaction('medical_records', 'readwrite', store => {
                let r = { ...medicalRecord, local_id: `MED-${fileId}` };
                return store.put(r);
            });

            _showToast('Player File saved successfully. 📄');
            setTimeout(() => {
                window.MizanoNav?.closeOverlay('builder');
                window.ProfilePanel?.init?.(); // Refresh profile to show the badge/file
            }, 1000);
        } catch (e) {
            console.error('Player file save failed', e);
            _showToast('Failed to save player file.', 'error');
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // HELPERS & STYLES
    // ─────────────────────────────────────────────────────────────────────────

    function _showToast(msg, type = 'success') {
        let t = document.getElementById('pf-toast');
        if (!t) { t = document.createElement('div'); t.id = 'pf-toast'; document.body.appendChild(t); }
        t.style.cssText = `position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:99999;
            background:${type === 'error' ? '#e53935' : (type === 'info' ? '#1a73e8' : '#323232')};color:#fff;padding:10px 20px;
            border-radius:8px;font-size:0.85rem;font-weight:500;box-shadow:0 2px 8px rgba(0,0,0,0.3);`;
        t.textContent = msg; t.style.display = 'block';
        clearTimeout(t._t); t._t = setTimeout(() => t.style.display = 'none', 3000);
    }
    function _safeAttr(v) { return (v || '').replace(/'/g, '&#39;'); }

    function _styles() {
        if (document.getElementById('pf-form-styles')) return '';
        return `<style id="pf-form-styles">
            .pf-section { background:#fff; border-bottom:1px solid #f0f0f0; }
            .pf-section-hd { display:flex; align-items:center; justify-content:space-between; padding:14px 16px; cursor:pointer; user-select:none; }
            .pf-sec-title { font-weight:600; font-size:0.88rem; color:#1a1a1a; }
            .pf-arrow { font-size:1rem; color:#aaa; }
            .pf-section-body { padding:4px 16px 16px; }
            .pf-label { display:block; font-size:0.78rem; color:#555; font-weight:600; margin-bottom:4px; margin-top:2px; }
            .pf-input { width:100%; padding:11px 12px; border:1px solid #dadce0; border-radius:8px; font-size:0.88rem; box-sizing:border-box; font-family:inherit; outline:none; transition:border-color 0.2s; }
            .pf-input:disabled { background:#f5f5f5; color:#999; }
            .pf-input:focus { border-color:#1a73e8; }
            .pf-textarea { resize:vertical; }
            .pf-req { color:#e53935; }
            .pf-hint { font-size:0.75rem; color:#888; margin-top:0; }
            .pf-dropdown-list { border:1px solid #dadce0; border-radius:8px; max-height:160px; overflow-y:auto; background:#fff; margin-top:4px; box-shadow:0 2px 8px rgba(0,0,0,0.1); position:static; width:100%; }
            .pf-dropdown-item { padding:10px 14px; font-size:0.85rem; cursor:pointer; border-bottom:1px solid #f5f5f5; }
            .pf-dropdown-item:hover { background:#f5f7ff; }
            .pf-secondary-btn { background:#f1f3f4; border:none; border-radius:8px; padding:9px 16px; font-size:0.82rem; cursor:pointer; font-family:inherit; width:100%; text-align:center; font-weight:600; }
            .pf-submit-btn { width:100%; padding:14px; background:#1a73e8; color:#fff; border:none; border-radius:10px; font-size:0.95rem; font-weight:700; cursor:pointer; font-family:inherit; }
        </style>`;
    }

    return {
        render,
        _toggleSubject, _loadMinors, _updatePositions, _docUploaded,
        _searchEntity, _selectLink, _removeLink, _submit
    };
})();
