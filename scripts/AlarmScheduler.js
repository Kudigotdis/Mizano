// AlarmScheduler.js

const AlarmScheduler = {
  async scheduleAlarm(goalId, stepDescription, alarmTime, sound = 'default') {
    // Store alarm in IndexedDB for syncing
    await this.storeAlarm(goalId, stepDescription, alarmTime, sound);

    // Try native alarm first (via Cordova/Capacitor plugin)
    if (window.plugins && window.plugins.alarm) {
      window.plugins.alarm.create({
        title: 'Mizano Goal Reminder',
        text: stepDescription,
        at: alarmTime,
        sound: sound
      }, () => console.log('Alarm set'), (err) => console.error('Alarm error', err));
    } else {
      // Fallback to local notification
      this.scheduleLocalNotification(goalId, stepDescription, alarmTime, sound);
    }
  },

  scheduleLocalNotification(goalId, message, triggerTime, sound) {
    // Use Capacitor Local Notifications
    if (window.Capacitor && Capacitor.Plugins.LocalNotifications) {
      Capacitor.Plugins.LocalNotifications.schedule({
        notifications: [{
          title: 'Mizano Goal',
          body: message,
          id: parseInt(goalId.replace('GT-', '')),
          schedule: { at: new Date(triggerTime) },
          sound: sound !== 'none' ? sound : null
        }]
      });
    }
  },

  storeAlarm(goalId, stepDescription, alarmTime, sound) {
    // Save to IndexedDB for sync across devices
    const alarm = { goalId, stepDescription, alarmTime, sound, synced: false };
    return StorageManager.save('alarms', alarm);
  }
};