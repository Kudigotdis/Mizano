/**
 * MIZANO UNIVERSAL EDIT SYSTEM
 * Handles editing of activities, teams, and profiles.
 */
window.MIZANO_EDIT = (function () {
    const state = {
        activeEntity: null,
        activeType: null
    };

    /**
     * Check if current user has permission to edit
     */
    function canEdit(entity) {
        const user = window.mizanoData?.getCurrentUser();
        if (!user) return false;

        // Admin override
        if (user.role === 'admin' || user.role === 'support') return true;

        // Ownership check
        const ownerId = entity.owner_uid || entity.host_uid || entity.tutor_uid || entity.creator_id;
        if (ownerId && ownerId === user.uid) return true;

        return false;
    }

    /**
     * Opens the universal edit modal
     */
    function openEditor(type, entity) {
        if (!canEdit(entity)) {
            alert("You do not have permission to edit this entry.");
            return;
        }

        state.activeEntity = entity;
        state.activeType = type;

        renderModal(type, entity);
    }

    function renderModal(type, entity) {
        let overlay = document.getElementById('edit-system-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'edit-system-overlay';
            overlay.className = 'overlay';
            overlay.style.zIndex = '10001';
            document.body.appendChild(overlay);
        }

        overlay.innerHTML = `
        <div class="overlay-header">
            <button class="back-btn" onclick="MIZANO_EDIT.close()">‹</button>
            <h2 style="flex:1; text-align:center;">Edit ${type}</h2>
            <button class="action-btn" onclick="MIZANO_EDIT.save()">Save</button>
        </div>
        <div class="overlay-content" style="padding:20px;">
            <div class="edit-form">
                <label>Title / Name</label>
                <input type="text" id="edit-title" value="${entity.title || entity.name || ''}" style="width:100%; padding:12px; margin-bottom:15px; border:1px solid #ccc;">
                
                <label>Description</label>
                <textarea id="edit-desc" style="width:100%; padding:12px; margin-bottom:15px; border:1px solid #ccc; height:100px;">${entity.description || entity.tagline || ''}</textarea>
                
                <label>WhatsApp Link / Contact</label>
                <input type="text" id="edit-contact" value="${entity.whatsapp_link || entity.whatsapp || ''}" style="width:100%; padding:12px; margin-bottom:15px; border:1px solid #ccc;">
            </div>
        </div>
    `;
        overlay.classList.add('active');
    }

    function save() {
        const title = document.getElementById('edit-title').value;
        const desc = document.getElementById('edit-desc').value;
        const contact = document.getElementById('edit-contact').value;

        const entity = state.activeEntity;
        const id = entity.activity_id || entity.match_id || entity.team_id || entity.business_id || entity.venue_id;

        // Apply locally
        if (entity.title) entity.title = title;
        else if (entity.name) entity.name = title;

        if (entity.description) entity.description = desc;
        else if (entity.tagline) entity.tagline = desc;

        if (entity.whatsapp_link) entity.whatsapp_link = contact;
        else if (entity.whatsapp) entity.whatsapp = contact;

        // Persist to localStorage for "Offline-First" edits
        applyLocalEdits(state.activeType, id, { title, desc, contact });

        alert('Changes saved locally.');
        close();

        // Refresh UI
        if (window.MizanoShell?.refresh) window.MizanoShell.refresh();
    }

    function applyLocalEdits(type, id, data) {
        const edits = JSON.parse(localStorage.getItem('mizano_local_edits') || '{}');
        if (!edits[type]) edits[type] = {};
        edits[type][id] = data;
        localStorage.setItem('mizano_local_edits', JSON.stringify(edits));
    }

    function close() {
        const overlay = document.getElementById('edit-system-overlay');
        if (overlay) overlay.classList.remove('active');
    }

    return { open: openEditor, close, save };
})();
