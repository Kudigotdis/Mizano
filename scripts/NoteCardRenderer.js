// NoteCardRenderer.js

const NoteCardRenderer = {
  render: function(note, permissions) {
    const commentCount = note.comments ? note.comments.length : 0;
    return `
      <div class="note-card" data-note-id="${note.id}">
        <div class="note-header collapsed" onclick="this.closest('.note-card').classList.toggle('expanded')">
          <span class="note-toggle">[+]</span>
          <span class="note-author">${note.authorName}</span>
          <span class="note-timestamp">${this.formatDate(note.created_at)}</span>
          <span class="note-comment-count">${commentCount} Comment${commentCount !== 1 ? 's' : ''}</span>
        </div>
        <div class="note-body hidden">
          <p>${note.text}</p>
          ${permissions.canEdit ? '<button class="edit-note-btn">Edit</button>' : ''}
          ${this.renderComments(note.comments, permissions)}
          ${permissions.canComment ? '<textarea placeholder="Add a comment..."></textarea><button class="add-comment-btn">Comment</button>' : ''}
        </div>
      </div>
    `;
  },

  renderComments: function(comments, permissions) {
    if (!comments || comments.length === 0) return '';
    let html = '<div class="comment-section">';
    comments.forEach(c => {
      html += `
        <div class="comment">
          <span class="comment-author">${c.authorName}</span>
          <span class="comment-text">${c.text}</span>
          <span class="comment-timestamp">${this.formatDate(c.created_at)}</span>
        </div>
      `;
    });
    html += '</div>';
    return html;
  },

  formatDate: function(timestamp) {
    const d = new Date(timestamp);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
  }
};