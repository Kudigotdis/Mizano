// GoalCardRenderer.js

const GoalCardRenderer = {
  render: function(goal) {
    const borderColor = {
      solo: '#4472C4',
      duo: '#70AD47',
      group: '#FFA500'
    }[goal.type] || '#4472C4';

    const progress = this.calculateProgress(goal);
    const daysLeft = this.daysUntilDeadline(goal);
    const urgencyClass = daysLeft < 3 ? 'urgent' : '';

    return `
      <div class="goal-card" style="border: 2px solid ${borderColor}80;" data-goal-id="${goal.id}">
        <div class="goal-header">
          <span class="goal-name">${goal.name}</span>
          <span class="goal-type-icon">${this.typeIcon(goal.type)}</span>
        </div>
        <div class="goal-activity">${goal.activity}</div>
        <div class="goal-progress">
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${progress}%;"></div>
          </div>
          <span class="goal-due ${urgencyClass}">${daysLeft > 0 ? `Due: ${daysLeft}d` : 'Today!'}</span>
          <span class="goal-favorite">${goal.isFavourite ? '★' : '☆'}</span>
          ${goal.permissions && goal.permissions.canEdit ? '<span class="goal-edit">✏️</span>' : ''}
        </div>
        <div class="goal-notes-indicator">↓ Notes (${goal.notes ? goal.notes.length : 0})</div>
      </div>
    `;
  },

  typeIcon: function(type) {
    const icons = { solo: '👤', duo: '👥', group: '👪' };
    return icons[type] || '👤';
  },

  calculateProgress: function(goal) {
    if (!goal.steps || goal.steps.length === 0) return 0;
    const completed = goal.steps.filter(s => s.completed).length;
    return Math.round((completed / goal.steps.length) * 100);
  },

  daysUntilDeadline: function(goal) {
    if (!goal.deadline) return 999;
    const now = new Date();
    const deadline = new Date(goal.deadline);
    const diff = deadline - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
};