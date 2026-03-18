/**
 * MIZANO — FormHelpers.js
 * Standardized helpers for repeatable fields, custom dialogs, and UI feedback.
 * Part of the Form Updates Epic.
 */

window.FormHelpers = (function () {

    // ─── TOAST / NOTIFICATIONS ───────────────────────────────────────────────
    
    function showToast(msg, type = 'success') {
        const toastId = 'mizano-global-toast';
        let t = document.getElementById(toastId);
        if (!t) {
            t = document.createElement('div');
            t.id = toastId;
            document.body.appendChild(t);
        }
        
        const colors = {
            success: '#323232',
            error: '#e53935',
            info: '#1a73e8',
            warning: '#f9ab00'
        };

        t.style.cssText = `
            position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:200000;
            background:${colors[type] || colors.success};color:#fff;padding:12px 24px;
            border-radius:12px;font-size:0.9rem;font-weight:600;box-shadow:0 4px 12px rgba(0,0,0,0.2);
            transition: opacity 0.3s; pointer-events:none;
        `;
        t.textContent = msg;
        t.style.display = 'block';
        
        clearTimeout(t._t);
        t._t = setTimeout(() => {
            t.style.display = 'none';
        }, 3000);
    }

    // ─── REPEATABLE LIST LOGIC ──────────────────────────────────────────────
    
    /**
     * Managed a JSON array in a hidden input and renders it to a container.
     */
    function createRepeatable({ containerId, dataId, renderRow, onEmpty }) {
        const container = document.getElementById(containerId);
        const dataInput = document.getElementById(dataId);
        
        if (!container || !dataInput) {
            console.warn('FormHelpers.createRepeatable: Missing container or data input', { containerId, dataId });
            return null;
        }

        const refresh = () => {
            let data = [];
            try {
                data = JSON.parse(dataInput.value || '[]');
            } catch (e) {
                console.error('FormHelpers: JSON parse failed', e);
                data = [];
            }

            if (data.length === 0) {
                container.innerHTML = onEmpty ? onEmpty() : '<div style="padding:20px;text-align:center;color:#aaa;font-size:0.85rem;">No items added yet.</div>';
                return;
            }
            container.innerHTML = data.map((item, index) => renderRow(item, index)).join('');
        };

        const add = (item) => {
            const data = JSON.parse(dataInput.value || '[]');
            data.push(item);
            dataInput.value = JSON.stringify(data);
            refresh();
        };

        const remove = (index) => {
            const data = JSON.parse(dataInput.value || '[]');
            data.splice(index, 1);
            dataInput.value = JSON.stringify(data);
            refresh();
        };

        const update = (index, updates) => {
            const data = JSON.parse(dataInput.value || '[]');
            data[index] = { ...data[index], ...updates };
            dataInput.value = JSON.stringify(data);
            refresh();
        };

        const getData = () => {
            try {
                return JSON.parse(dataInput.value || '[]');
            } catch (e) { return []; }
        };

        // Initial render
        refresh();

        return { refresh, add, remove, update, getData };
    }

    // ─── CUSTOM FIELDS DIALOG ───────────────────────────────────────────────

    function openCustomFieldDialog({ onSave }) {
        const modalId = 'mizano-custom-field-modal';
        let modal = document.getElementById(modalId);
        if (modal) modal.remove();

        modal = document.createElement('div');
        modal.id = modalId;
        modal.style.cssText = `
            position:fixed;inset:0;z-index:200001;background:rgba(0,0,0,0.6);
            display:flex;align-items:center;justify-content:center;padding:20px;
        `;

        modal.innerHTML = `
            <div style="background:#fff;border-radius:16px;width:100%;max-width:340px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.3);">
                <div style="padding:16px;border-bottom:1px solid #f0f0f0;display:flex;justify-content:space-between;align-items:center;">
                    <h3 style="margin:0;font-size:1rem;font-weight:700;">Add Custom Field</h3>
                    <span style="cursor:pointer;font-size:1.2rem;color:#888;" id="cf-close">×</span>
                </div>
                <div style="padding:20px;">
                    <label style="display:block;font-size:0.8rem;font-weight:600;color:#555;margin-bottom:6px;">Field Label</label>
                    <input type="text" id="cf-label" style="width:100%;padding:11px;border:1px solid #dadce0;border-radius:8px;margin-bottom:16px;box-sizing:border-box;" placeholder="e.g. Nationality, Favorite Color">
                    <label style="display:block;font-size:0.8rem;font-weight:600;color:#555;margin-bottom:6px;">Field Value</label>
                    <input type="text" id="cf-value" style="width:100%;padding:11px;border:1px solid #dadce0;border-radius:8px;box-sizing:border-box;" placeholder="e.g. Botswana, Blue">
                </div>
                <div style="padding:16px;display:flex;gap:10px;">
                    <button id="cf-cancel" style="flex:1;padding:12px;background:#f1f3f4;border:none;border-radius:10px;font-weight:600;cursor:pointer;">Cancel</button>
                    <button id="cf-save" style="flex:1;padding:12px;background:#1a73e8;color:#fff;border:none;border-radius:10px;font-weight:600;cursor:pointer;">Add Field</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const close = () => modal.remove();
        document.getElementById('cf-close').onclick = close;
        document.getElementById('cf-cancel').onclick = close;
        document.getElementById('cf-save').onclick = () => {
            const label = document.getElementById('cf-label').value.trim();
            const value = document.getElementById('cf-value').value.trim();
            if (!label || !value) {
                showToast('Please fill both fields', 'error');
                return;
            }
            onSave({ label, value });
            close();
        };
    }

    return {
        showToast,
        createRepeatable,
        openCustomFieldDialog
    };

})();
