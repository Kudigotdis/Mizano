/**
 * MIZANO MINE RENDERER — PHASE 8 PATCH
 * Injected logic to handle async database queries and targeted UI updates.
 * Loads AFTER MineRenderer.js
 */

(function () {
  console.log('MineRenderer Patch: Engaging Phase 8 Extension...');

  // 1. Extend the shared data container
  const MineContent = window.MizanoMine;
  if (!MineContent) {
    console.error('MineRenderer Patch: Root renderer not found!');
    return;
  }

  /**
   * Re-wires the core render to use anchor divs if they exist.
   */
  const originalRender = MineContent.render;
  MineContent.render = function () {
    // Call original to set up baseline (including suggestion engine)
    originalRender.call(this);

    // Trigger async data fetch for the anchors
    this.refreshData();
  };

  /**
   * Async data fetcher for engagement metrics.
   */
  MineContent.refreshData = async function () {
    const user = window.mizanoData.getCurrentUser();
    if (!user) return;

    const uid = user.uid;

    // Parallel fetch for speed
    const [habits, habitLogs, activitySummary, injuries] = await Promise.all([
      window.mizanoStorage.getEntitiesByUser('habits', uid),
      window.mizanoStorage.getEntitiesByUser('habit_logs', uid),
      window.mizanoStorage.getEntitiesByUser('daily_activity_summary', uid),
      window.mizanoStorage.getEntitiesByUser('injury_log', uid)
    ]);

    // Integrate logic modules
    const calculator = window.MizanoStreakCalculator;

    // Update 1: Consistency Calendar
    const consistencyDiv = document.getElementById('mine-consistency-calendar');
    if (consistencyDiv) {
      const streakData = calculator.calculateStreak(activitySummary);
      const grid = calculator.getWeeklyGrid(activitySummary);

      const gridHtml = grid.map(day => `
                <div style="display:flex; flex-direction:column; align-items:center; opacity:${day.active ? 1 : 0.4}">
                    <div style="font-size:0.75rem; margin-bottom:4px; font-weight:${day.isToday ? 'bold' : 'normal'}">${day.label}</div>
                    <div style="width:28px; height:28px; border-radius:50%; background:${day.active ? '#27ae60' : '#ddd'}; color:white; display:flex; align-items:center; justify-content:center; font-size:0.8rem;">
                        ${day.active ? '✓' : ''}
                    </div>
                </div>
            `).join('');

      consistencyDiv.innerHTML = `
                <div class="mizano-card" style="margin-top:10px; border-left:4px solid #f39c12; padding:15px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                        <div style="font-weight:bold;">Consistency Streak</div>
                        <div style="color:#f39c12; font-weight:bold;">🔥 ${streakData.current} Days</div>
                    </div>
                    <div style="display:flex; justify-content:space-between;">
                        ${gridHtml}
                    </div>
                </div>
            `;
    }

    // Update 2: Habit Chains
    const habitDiv = document.getElementById('mine-habit-chains');
    if (habitDiv) {
      const habitCards = habits.map(h => {
        const logs = habitLogs.filter(l => l.habit_id === h.local_id);
        const streak = calculator.calculateStreak(logs);
        return `
                    <div style="min-width:140px; background:#f8fafc; padding:12px; border:1px solid #e2e8f0; text-align:center;">
                        <div style="font-size:1.4rem; margin-bottom:6px;">${h.reminder_enabled ? '⏰' : '✨'}</div>
                        <div style="font-size:0.85rem; font-weight:bold; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${h.name}</div>
                        <div style="font-size:0.75rem; color:#64748b; margin-top:4px;">${streak.current} day chain</div>
                    </div>
                `;
      }).join('');

      habitDiv.innerHTML = `
                <div class="mizano-card" style="margin-top:10px; border-left:4px solid #9b59b6; padding:15px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                        <div style="font-weight:bold;">My Habit Chains</div>
                        <button onclick="window.AddActionRouter.openForm('HABIT_FORM')" style="background:none; border:none; color:#9b59b6; font-weight:bold; cursor:pointer; font-size:0.85rem;">+ New</button>
                    </div>
                    <div style="display:flex; overflow-x:auto; gap:10px; padding-bottom:5px;">
                        ${habitCards || '<div style="font-size:0.8rem; color:#999; padding:10px;">Start a new habit to build a chain.</div>'}
                    </div>
                </div>
            `;
    }

    // Update 3: Health & Recovery
    const injuryDiv = document.getElementById('mine-injury-list');
    if (injuryDiv) {
      const activeInjuries = injuries.filter(i => i.status === 'active');
      const injHtml = activeInjuries.map(i => `
                <div style="background:#fff5f5; padding:12px; border:1px solid #fed7d7; margin-bottom:8px;">
                    <div style="font-weight:bold; font-size:0.9rem; color:#c53030;">${i.description}</div>
                    <div style="font-size:0.75rem; color:#9b2c2c; margin-top:2px;">
                        Severity: ${i.severity.toUpperCase()} • ${i.rest_days} days rest needed
                    </div>
                </div>
            `).join('');

      injuryDiv.innerHTML = `
                <div class="mizano-card" style="margin-top:10px; border-left:4px solid #e74c3c; padding:15px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                        <div style="font-weight:bold;">Health & Recovery</div>
                        <button onclick="window.AddActionRouter.openForm('INJURY_FORM')" style="background:none; border:none; color:#e74c3c; font-weight:bold; cursor:pointer; font-size:0.85rem;">+ Log</button>
                    </div>
                    ${injHtml || '<div style="font-size:0.8rem; color:#999;">No injuries logged. Stay safe!</div>'}
                </div>
            `;
    }
  };
})();
