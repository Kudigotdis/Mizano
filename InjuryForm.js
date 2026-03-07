/**
 * MIZANO INJURY FORM
 * Device-only log for tracking physical recovery.
 */

window.InjuryForm = {
  render() {
    return `
            <div class="form-container" style="padding: 20px;">
                <h2 style="margin-bottom: 20px; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">🩹 Log Injury / Pain</h2>
                
                <div class="field-group" style="margin-bottom: 15px;">
                    <label style="display:block; font-weight:bold; margin-bottom: 5px;">What happened?</label>
                    <input type="text" id="inj-desc" placeholder="e.g. Left ankle sprain" 
                           style="width:100%; padding:12px; border:2px solid #eee; border-radius:0; font-size:1rem;">
                </div>

                <div class="field-group" style="margin-bottom: 15px;">
                    <label style="display:block; font-weight:bold; margin-bottom: 5px;">Severity</label>
                    <select id="inj-severity" style="width:100%; padding:12px; border:2px solid #eee; border-radius:0;">
                        <option value="mild">Mild (Slight discomfort)</option>
                        <option value="moderate">Moderate (Painful but can walk)</option>
                        <option value="severe">Severe (Cannot move/play)</option>
                    </select>
                </div>

                <div class="field-group" style="margin-bottom: 15px;">
                    <label style="display:block; font-weight:bold; margin-bottom: 5px;">Estimated Rest (Days)</label>
                    <input type="number" id="inj-rest" value="3" 
                           style="width:100%; padding:12px; border:2px solid #eee; border-radius:0;">
                </div>

                <div class="mizano-card" style="background:#fff5f5; border:1px solid #feb2b2; margin-bottom:20px; padding:10px; font-size:0.85rem; color:#c53030;">
                    ⚠️ Private: This information stays on your device and is not synced to our servers.
                </div>

                <button id="save-injury-btn" style="width:100%; padding:15px; background:#e74c3c; color:white; border:none; font-weight:bold; font-size:1rem; cursor:pointer;">
                    LOG INCIDENT
                </button>
            </div>
        `;
  },

  init() {
    document.getElementById('save-injury-btn').onclick = async () => {
      const desc = document.getElementById('inj-desc').value;
      const severity = document.getElementById('inj-severity').value;
      const rest = document.getElementById('inj-rest').value;

      if (!desc) {
        alert('Please describe the injury!');
        return;
      }

      const injuryData = {
        description: desc,
        severity: severity,
        rest_days: parseInt(rest),
        date: new Date().toISOString().split('T')[0],
        status: 'active',
        device_only: true, // Double safety flag
        user_uid: window.mizanoData.getCurrentUser()?.uid
      };

      try {
        await window.mizanoStorage.saveEntity('injury_log', injuryData);
        alert('Recovery log updated!');
        if (window.MizanoNav) window.MizanoNav.closeOverlay('builder-view');
        if (window.MizanoMine && window.MizanoMine.refreshData) {
          window.MizanoMine.refreshData();
        }
      } catch (e) {
        console.error('InjuryForm: Save failed', e);
      }
    };
  }
};
