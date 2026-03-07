/**
 * MIZANO STREAK CALCULATOR
 * Processes logs to compute consistency metrics.
 */

class StreakCalculator {
  /**
   * Calculates the current consecutive days streak.
   * @param {Array} logs - Array of objects with 'date' (YYYY-MM-DD)
   * @returns {Object} { current: number, longest: number }
   */
  static calculateStreak(logs) {
    if (!logs || logs.length === 0) return { current: 0, longest: 0 };

    // Sort by date descending
    const sortedDates = [...new Set(logs.map(l => l.date))].sort().reverse();

    let current = 0;
    let longest = 0;
    let tempStreak = 0;

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // Check if user has logged today or yesterday to maintain "current"
    let lastDate = sortedDates[0];
    if (lastDate !== today && lastDate !== yesterday) {
      current = 0;
    } else {
      // Traverse to find current streak
      let checkDate = new Date(lastDate);
      for (let i = 0; i < sortedDates.length; i++) {
        const d = sortedDates[i];
        const expected = checkDate.toISOString().split('T')[0];

        if (d === expected) {
          current++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }
    }

    // Calculate longest streak
    const ascendingDates = [...sortedDates].reverse();
    let prevDate = null;
    ascendingDates.forEach(d => {
      if (!prevDate) {
        tempStreak = 1;
      } else {
        const p = new Date(prevDate);
        p.setDate(p.getDate() + 1);
        const expected = p.toISOString().split('T')[0];
        if (d === expected) {
          tempStreak++;
        } else {
          tempStreak = 1;
        }
      }
      longest = Math.max(longest, tempStreak);
      prevDate = d;
    });

    return { current, longest };
  }

  /**
   * Generates a 7-day grid model for the current week.
   */
  static getWeeklyGrid(logs) {
    const grid = [];
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 (Sun) to 6 (Sat)

    // Start from Monday (Mizano standard)
    const monday = new Date(now);
    const diff = now.getDay() === 0 ? 6 : now.getDay() - 1;
    monday.setDate(now.getDate() - diff);

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const ds = d.toISOString().split('T')[0];
      const hasActivity = logs.some(l => l.date === ds);
      grid.push({
        label: ['M', 'T', 'W', 'T', 'F', 'S', 'S'][i],
        active: hasActivity,
        isToday: ds === now.toISOString().split('T')[0]
      });
    }
    return grid;
  }
}

window.MizanoStreakCalculator = StreakCalculator;
