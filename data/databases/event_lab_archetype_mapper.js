// event_lab_archetype_mapper.js
// Maps each sport to its template group and default fields

const sportArchetypes = {
  // Time‑Structured (timer_split)
  soccer: { group: 'timer_split', defaults: { periods: 2, periodDuration: 45, halftime: 15 } },
  basketball: { group: 'timer_split', defaults: { periods: 4, periodDuration: 10, halftime: 15, shotClock: 24 } },
  netball: { group: 'timer_split', defaults: { periods: 4, periodDuration: 15, halftime: 5 } },
  rugby_union: { group: 'timer_split', defaults: { periods: 2, periodDuration: 40, halftime: 15 } },
  handball: { group: 'timer_split', defaults: { periods: 2, periodDuration: 30, halftime: 10 } },
  hockey_field: { group: 'timer_split', defaults: { periods: 4, periodDuration: 15, halftime: 5 } },
  futsal: { group: 'timer_split', defaults: { periods: 2, periodDuration: 20, halftime: 15 } },
  // ... all other sports from the complete mapping

  // Target‑Score (set_cap)
  tennis: { group: 'set_cap', defaults: { sets: 3, gamesPerSet: 6, tiebreakAt: 6 } },
  badminton: { group: 'set_cap', defaults: { sets: 3, pointsPerSet: 21, winBy2: true } },
  volleyball: { group: 'set_cap', defaults: { sets: 5, pointsPerSet: 25, winBy2: true } },
  // ... etc.

  // Performance/Measurement (leaderboard)
  athletics: { group: 'leaderboard', defaults: { measure: 'time', sort: 'ascending' } },
  swimming: { group: 'leaderboard', defaults: { measure: 'time', sort: 'ascending' } },
  // ... etc.

  // Turn/Move/Cycle (turn_cycle)
  cricket: { group: 'turn_cycle', defaults: { overs: 20, innings: 1 } },
  baseball: { group: 'turn_cycle', defaults: { innings: 9, outsPerInning: 3 } },
  chess: { group: 'turn_cycle', defaults: { timeControl: '10+0' } },
  // ... etc.

  // Combat/Bout (bout_logic)
  boxing: { group: 'bout_logic', defaults: { rounds: 12, roundDuration: 3 } },
  judo: { group: 'bout_logic', defaults: { duration: 4 } },
  // ... etc.

  // Multi‑Discipline (hybrid)
  triathlon: { group: 'hybrid', defaults: { swim: 1500, bike: 40000, run: 10000 } },
  // ... etc.

  // User‑Defined (custom)
  other: { group: 'custom', wizard: true }
};

// Helper to get template fields
function getTemplateFields(group) {
  const templates = {
    timer_split: [
      { name: 'periods', label: 'Periods', type: 'number', default: 2 },
      { name: 'periodDuration', label: 'Period Duration (min)', type: 'number', default: 45 },
      { name: 'halftime', label: 'Halftime (min)', type: 'number', default: 15 },
      { name: 'overtime', label: 'Overtime', type: 'toggle', default: false }
    ],
    set_cap: [
      { name: 'sets', label: 'Number of sets', type: 'number', default: 3 },
      { name: 'pointsPerSet', label: 'Points per set', type: 'number', default: 25 },
      { name: 'winBy2', label: 'Win by 2', type: 'toggle', default: true }
    ],
    // ... define all template fields
  };
  return templates[group] || [];
}