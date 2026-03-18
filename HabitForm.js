window.HabitForm = (function () {

    const CATEGORIES = ['Sport', 'Health', 'Mindset', 'Career', 'Skills', 'Finance', 'Social', 'Other'];
    const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    function render() {
        return `
        <div id="habit-form-wrap" style="padding:16px 0 100px;font-family:inherit;">
            ${_styles()}
            
            <!-- ── SECTION 1: THE HABIT ────────────────────────────── -->
            <div class="hf-section">
                <div class="hf-section-hd collapsible-header af-open" data-sec="habit">
                    <span class="hf-sec-title">✨ My New Habit</span>
                    <span class="collapsible-arrow hf-arrow">⌄</span>
                </div>
                <div class="hf-section-body" id="sec-habit">
                    <label class="hf-label">What do you want to start? <span class="hf-req">*</span></label>
                    <input type="text" id="hf-name" class="hf-input" placeholder="e.g. 30 mins Football Training" required>

                    <label class="hf-label" style="margin-top:12px;">Category</label>
                    <div style="display:flex;flex-wrap:wrap;gap:8px;">
                        ${CATEGORIES.map(c => `
                            <span class="hf-chip hf-cat-chip" onclick="window.HabitForm._toggleTag(this, 'hf-cat-chip')">${c}</span>
                        `).join('')}
                    </div>

                    <label class="hf-label" style="margin-top:12px;">Motivation / "The Why"</label>
                    <textarea id="hf-bio" class="hf-input hf-textarea" placeholder="Why is this habit important to you?"></textarea>
                </div>
            </div>

            <!-- ── SECTION 2: FREQUENCY & CONSISTENCY ─────────────── -->
            <div class="hf-section">
                <div class="hf-section-hd collapsible-header" data-sec="frequency">
                    <span class="hf-sec-title">📅 Frequency & Consistency</span>
                    <span class="collapsible-arrow hf-arrow">›</span>
                </div>
                <div class="hf-section-body" id="sec-frequency" style="display:none;">
                    <label class="hf-label">Target Frequency</label>
                    <div style="display:flex;gap:10px;margin-bottom:12px;">
                        <button type="button" class="hf-tab active" id="btn-daily" onclick="window.HabitForm._setFreq('daily')">Daily</button>
                        <button type="button" class="hf-tab" id="btn-weekly" onclick="window.HabitForm._setFreq('weekly')">Weekly</button>
                    </div>

                    <div id="hf-days-selector">
                        <label class="hf-label">Which days?</label>
                        <div style="display:flex;justify-content:space-between;gap:4px;">
                            ${DAYS.map(d => `<span class="hf-day-circle" data-day="${d}" onclick="this.classList.toggle('active')">${d[0]}</span>`).join('')}
                        </div>
                    </div>

                    <div id="hf-weekly-count" style="display:none;margin-top:10px;">
                        <label class="hf-label">How many times per week?</label>
                        <div style="display:flex;align-items:center;gap:15px;">
                            <input type="range" id="hf-week-range" min="1" max="6" value="3" style="flex:1;" oninput="document.getElementById('hf-range-val').textContent = this.value">
                            <span id="hf-range-val" style="font-weight:800;font-size:1.2rem;color:#9b59b6;width:20px;">3</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ── SECTION 3: REMINDERS & NOTIFICATIONS ───────────── -->
            <div class="hf-section" style="border-bottom:none;">
                <div class="hf-section-hd collapsible-header" data-sec="reminders">
                    <span class="hf-sec-title">🔔 Reminders & Cues</span>
                    <span class="collapsible-arrow hf-arrow">›</span>
                </div>
                <div class="hf-section-body" id="sec-reminders" style="display:none;">
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
                        <span class="hf-label" style="margin:0;">Enable Daily Reminder</span>
                        <label class="hf-toggle-wrap">
                            <input type="checkbox" id="hf-reminder-toggle" onchange="document.getElementById('hf-time-pick').style.display = this.checked ? 'block' : 'none'">
                            <span class="hf-toggle-slider"></span>
                        </label>
                    </div>

                    <div id="hf-time-pick" style="display:none;margin-top:10px;">
                        <label class="hf-label">Reminder Time</label>
                        <input type="time" id="hf-time" class="hf-input" value="08:00">
                    </div>

                    <label class="hf-label" style="margin-top:12px;">Environment Cue</label>
                    <input type="text" id="hf-cue" class="hf-input" placeholder="e.g. After I brush my teeth...">
                    <p class="hf-hint">A physical trigger that reminds you to act.</p>
                </div>
            </div>

            <!-- ── FOOTER CTA ────────────────────────────────────── -->
            <div style="padding:16px;position:sticky;bottom:0;background:#fff;border-top:1px solid #f0f0f0;z-index:10;">
                <button type="button" class="hf-submit-btn" onclick="window.HabitForm._submit()">Start My Habit Chain</button>
            </div>
        </div>`;
    }

    function init() {
        // Nothing special to init post-render yet
    }

    // ─────────────────────────────────────────────────────────────────────────
    // LOGIC
    // ─────────────────────────────────────────────────────────────────────────

    function _setFreq(type) {
        document.getElementById('btn-daily').classList.toggle('active', type === 'daily');
        document.getElementById('btn-weekly').classList.toggle('active', type === 'weekly');
        document.getElementById('hf-days-selector').style.display = type === 'daily' ? 'block' : 'none';
        document.getElementById('hf-weekly-count').style.display = type === 'weekly' ? 'block' : 'none';
        
        // Auto-select all days if daily
        if (type === 'daily') {
            document.querySelectorAll('.hf-day-circle').forEach(el => el.classList.add('active'));
        }
    }

    function _toggleTag(el, className) {
        document.querySelectorAll('.' + className).forEach(c => c.classList.remove('active'));
        el.classList.add('active');
    }

    async function _submit() {
        if (window.MizanoAuth?.isDemo?.()) { window.ProfilePanel?._showSignUpModal(); return; }

        const name = document.getElementById('hf-name').value.trim();
        const category = document.querySelector('.hf-cat-chip.active')?.textContent || 'Other';
        const isDaily = document.getElementById('btn-daily').classList.contains('active');
        
        if (!name) { _showToast('Please name your habit', 'error'); return; }

        const selectedDays = Array.from(document.querySelectorAll('.hf-day-circle.active')).map(d => d.dataset.day);
        const weeklyCount = parseInt(document.getElementById('hf-week-range').value);

        const record = {
            habit_id: `HAB-${Date.now()}`,
            name,
            category,
            bio: document.getElementById('hf-bio').value.trim(),
            frequency: isDaily ? 'daily' : 'weekly',
            target_days: isDaily ? selectedDays : null,
            target_count_weekly: !isDaily ? weeklyCount : 7,
            reminder_enabled: document.getElementById('hf-reminder-toggle').checked,
            reminder_time: document.getElementById('hf-time').value,
            cue: document.getElementById('hf-cue').value.trim(),
            streak: 0,
            longest_streak: 0,
            last_completed_at: null,
            created_at: new Date().toISOString(),
            user_uid: window.mizanoStorage.getCurrentUserId()
        };

        try {
            await window.mizanoStorage.saveEntity('habits', record);
            _showToast('Habit Chain Started! ⚡');
            setTimeout(() => {
                if (window.MizanoNav) window.MizanoNav.closeOverlay('builder');
                if (window.MizanoMine && window.MizanoMine.refreshHabits) window.MizanoMine.refreshHabits();
            }, 1000);
        } catch (e) {
            _showToast('Failed to save habit.', 'error');
        }
    }

    function _showToast(msg, type = 'success') {
        if (window.FormHelpers) window.FormHelpers.showToast(msg, type);
        else alert(msg);
    }

    function _styles() {
        if (document.getElementById('hf-styles')) return '';
        return `<style id="hf-styles">
            .hf-section { background:#fff; border-bottom:1px solid #f0f0f0; }
            .hf-section-hd { display:flex; align-items:center; justify-content:space-between; padding:14px 16px; cursor:pointer; user-select:none; }
            .hf-sec-title { font-weight:600; font-size:0.88rem; color:#1a1a1a; }
            .hf-arrow { font-size:1rem; color:#aaa; }
            .hf-section-body { padding:4px 16px 16px; }
            .hf-label { display:block; font-size:0.75rem; color:#555; font-weight:700; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.4px; }
            .hf-input { width:100%; padding:11px 12px; border:1px solid #dadce0; border-radius:8px; font-size:0.88rem; box-sizing:border-box; font-family:inherit; outline:none; }
            .hf-textarea { min-height:80px; resize:vertical; }
            .hf-req { color:#e53935; }
            .hf-hint { font-size:0.75rem; color:#888; margin-top:4px; }
            .hf-chip { padding:6px 12px; border-radius:12px; font-size:0.75rem; background:#f1f3f4; color:#555; cursor:pointer; transition:all 0.2s; border:1px solid transparent; }
            .hf-chip.active { background:#f5eef8; color:#9b59b6; border-color:#9b59b6; }
            .hf-tab { flex:1; padding:10px; border:1px solid #dadce0; background:#fff; border-radius:8px; font-size:0.82rem; font-weight:600; cursor:pointer; color:#666; }
            .hf-tab.active { background:#9b59b6; color:#fff; border-color:#9b59b6; }
            .hf-day-circle { width:32px; height:32px; border-radius:50%; background:#f1f3f4; display:flex; align-items:center; justify-content:center; font-size:0.75rem; font-weight:700; cursor:pointer; transition:all 0.15s; color:#555; }
            .hf-day-circle.active { background:#9b59b6; color:#fff; }
            .hf-toggle-wrap { position:relative; display:inline-block; width:44px; height:24px; flex-shrink:0; }
            .hf-toggle-wrap input { opacity:0; width:0; height:0; }
            .hf-toggle-slider { position:absolute; cursor:pointer; inset:0; background:#ccc; border-radius:24px; transition:background 0.2s; }
            .hf-toggle-slider:before { content:''; position:absolute; width:18px; height:18px; left:3px; top:3px; background:#fff; border-radius:50%; transition:transform 0.2s; }
            .hf-toggle-wrap input:checked + .hf-toggle-slider { background:#9b59b6; }
            .hf-toggle-wrap input:checked + .hf-toggle-slider:before { transform:translateX(20px); }
            .hf-submit-btn { width:100%; padding:14px; background:#9b59b6; color:#fff; border:none; border-radius:10px; font-size:0.95rem; font-weight:700; cursor:pointer; font-family:inherit; box-shadow:0 4px 6px rgba(155, 89, 182, 0.2); }
        </style>`;
    }

    return {
        render, init, _setFreq, _toggleTag, _submit
    };
})();
