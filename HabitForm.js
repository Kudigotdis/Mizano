/**
 * MIZANO HABIT FORM
 * Single-page form for creating new habit chains.
 */

window.HabitForm = {
  render() {
    return `
            <div class="form-container" style="padding: 20px;">
                <h2 style="margin-bottom: 20px; border-bottom: 2px solid #9b59b6; padding-bottom: 10px;">✨ Add New Habit</h2>
                
                <div class="field-group" style="margin-bottom: 15px;">
                    <label style="display:block; font-weight:bold; margin-bottom: 5px;">What habit are you starting?</label>
                    <input type="text" id="habit-name" placeholder="e.g. Drink 8 glasses of water" 
                           style="width:100%; padding:12px; border:2px solid #eee; border-radius:0; font-size:1rem;">
                </div>

                <div class="field-group" style="margin-bottom: 15px;">
                    <label style="display:block; font-weight:bold; margin-bottom: 5px;">Why is this important?</label>
                    <textarea id="habit-description" placeholder="e.g. To stay hydrated and healthy" 
                              style="width:100%; padding:12px; border:2px solid #eee; border-radius:0; font-family:inherit; min-height:80px;"></textarea>
                </div>

                <div class="field-group" style="margin-bottom: 20px; display:flex; align-items:center; gap:10px;">
                    <input type="checkbox" id="habit-reminder" style="width:20px; height:20px;">
                    <label for="habit-reminder">Set a daily reminder</label>
                    <input type="time" id="habit-time" style="padding:5px; border:1px solid #ccc; display:none;">
                </div>

                <button id="save-habit-btn" style="width:100%; padding:15px; background:#9b59b6; color:white; border:none; font-weight:bold; font-size:1rem; cursor:pointer;">
                    SAVE HABIT CHAIN
                </button>
            </div>
        `;
  },

  init() {
    const reminderCheck = document.getElementById('habit-reminder');
    const timeInput = document.getElementById('habit-time');
    const saveBtn = document.getElementById('save-habit-btn');

    reminderCheck.onchange = (e) => {
      timeInput.style.display = e.target.checked ? 'block' : 'none';
    };

    saveBtn.onclick = async () => {
      const name = document.getElementById('habit-name').value;
      const desc = document.getElementById('habit-description').value;
      const reminder = reminderCheck.checked;
      const time = timeInput.value;

      if (!name) {
        alert('Please name your habit!');
        return;
      }

      const habitData = {
        name: name,
        description: desc,
        reminder_enabled: reminder,
        reminder_time: reminder ? time : null,
        streak: 0,
        longest_streak: 0,
        last_completed_date: null,
        user_uid: window.mizanoData.getCurrentUser()?.uid
      };

      try {
        await window.mizanoStorage.saveEntity('habits', habitData);
        alert('Habit chain created!');
        if (window.MizanoNav) window.MizanoNav.closeOverlay('builder-view');
        if (window.MizanoMine && window.MizanoMine.refreshData) {
          window.MizanoMine.refreshData();
        }
      } catch (e) {
        console.error('HabitForm: Save failed', e);
      }
    };
  }
};
