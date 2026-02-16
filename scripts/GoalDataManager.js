// DataManager.js (extended)
const DataManager = (function() {
  'use strict';

  // Private storage
  let profiles = [];
  let goals = [];
  let userGoals = []; // goals the current user is pursuing
  let notes = [];

  // Load all data on init
  async function loadAllData() {
    // Load profiles from localStorage (or fetch from server)
    profiles = JSON.parse(localStorage.getItem('mizano_profiles')) || [];
    // Load preloaded goals (combined from parts 1-4)
    goals = JSON.parse(localStorage.getItem('preloaded_goals')) || [];
    // Load user's pursued goals
    userGoals = JSON.parse(localStorage.getItem('user_goals')) || [];
    // Load notes
    notes = JSON.parse(localStorage.getItem('goal_notes')) || [];
  }

  // Find a suitable partner for a duo goal based on the activity and suggested role
  function findPartnerForGoal(goal, currentUserId) {
    if (!goal.partner_suggestion_rule) return null;

    // Determine required capability
    let requiredCapability = null;
    if (goal.partner_suggestion_rule === 'coach' || goal.partner_suggestion_rule === 'teacher') {
      requiredCapability = 'Mentor';
    } else if (goal.partner_suggestion_rule === 'friend') {
      // just any other user
    }

    // Filter profiles
    let candidates = profiles.filter(p => p.profile_id !== currentUserId);
    if (requiredCapability) {
      candidates = candidates.filter(p => p.capabilities && p.capabilities.includes(requiredCapability));
    }
    // Optionally match activity (if mentor has primary_sport matching goal.activity)
    if (goal.activity) {
      const activityMatch = candidates.filter(p => 
        p.player_data && p.player_data.primary_sport === goal.activity
      );
      if (activityMatch.length > 0) candidates = activityMatch;
    }

    return candidates.length > 0 ? candidates[0] : null;
  }

  // When a user starts a goal, link partners and set permissions
  function startGoal(goalId, currentUserId) {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return null;

    const newGoal = { ...goal, participants: [], notes: [], progress: [] };
    if (goal.type === 'solo') {
      newGoal.participants = [{ userId: currentUserId, role: 'creator', permissions: { canEdit: true, canComment: true } }];
    } else if (goal.type === 'duo') {
      const partner = findPartnerForGoal(goal, currentUserId);
      if (!partner) {
        // fallback – invite manually later
        newGoal.participants = [{ userId: currentUserId, role: 'creator', permissions: { canEdit: true, canComment: true } }];
      } else {
        newGoal.participants = [
          { userId: currentUserId, role: 'creator', permissions: { canEdit: true, canComment: true } },
          { userId: partner.profile_id, role: 'partner', permissions: { canEdit: true, canComment: true } }
        ];
      }
    } else if (goal.type === 'group') {
      newGoal.participants = [{ userId: currentUserId, role: 'creator', permissions: { canEdit: true, canComment: true } }];
      // group will be built later in GoalBuilder
    }

    userGoals.push(newGoal);
    localStorage.setItem('user_goals', JSON.stringify(userGoals));
    return newGoal;
  }

  // Add a note to a goal
  function addNote(goalId, userId, text, photo) {
    const note = {
      id: 'NOTE-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6),
      goalId,
      userId,
      text,
      photo: photo || null,
      created_at: new Date().toISOString(),
      comments: [],
      permissions: { canEdit: true, canComment: true }
    };
    notes.push(note);
    localStorage.setItem('goal_notes', JSON.stringify(notes));
    return note;
  }

  // Add a comment to a note
  function addComment(noteId, userId, text) {
    const note = notes.find(n => n.id === noteId);
    if (!note) return null;
    const comment = {
      userId,
      text,
      created_at: new Date().toISOString()
    };
    note.comments.push(comment);
    localStorage.setItem('goal_notes', JSON.stringify(notes));
    return comment;
  }

  // Sync pending changes (called every 15 min)
  async function sync() {
    // In a real app, send pending userGoals and notes to server
    // For now, just mark as synced
    console.log('Syncing goals...');
  }

  // Public API
  return {
    init: loadAllData,
    findPartnerForGoal,
    startGoal,
    addNote,
    addComment,
    sync,
    getUserGoals: () => userGoals,
    getAllGoals: () => goals
  };
})();