/**
 * MIZANO PHASE 8 — ADDACTIONROUTER SNIPPET
 * REFERENCE ONLY — DO NOT LOAD AS SCRIPT
 *
 * Apply these snippets to AddActionRouter.js
 */

// SNIPPET 3A: Inside openForm(formKey) switch statement
// Add before default:
/*
case 'HABIT_FORM':
    this.container.innerHTML = window.HabitForm.render();
    window.HabitForm.init();
    break;

case 'INJURY_FORM':
    this.container.innerHTML = window.InjuryForm.render();
    window.InjuryForm.init();
    break;
*/

// SNIPPET 3B: Inside init() options array
// Add to the end of the array
/*
{ key: 'HABIT_FORM',  icon: '🔁', label: 'Add Habit'   },
{ key: 'INJURY_FORM', icon: '🩹', label: 'Log Injury'  },
*/
