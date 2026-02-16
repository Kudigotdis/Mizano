/**
 * MIZANO BUSINESS BUILDER
 * Handles multi-step registration, categorization, and billing for businesses.
 */

class BusinessBuilder {
    constructor() {
        this.currentStep = 1;
        this.formData = {
            name: '',
            description: '',
            hq: '',
            contact_person: '',
            contacts: { whatsapp: '', email: '' },
            main_categories: [], // Max 2 free
            sub_categories: [],  // Max 4 free
            staff: [],
            activities: [],
            history: [],
            billing_total: 200, // Base fee
            status: 'pending_approval'
        };
        this.categories = {
            main: [
                { id: 'retail', label: '🛒 Retail & Shopping' },
                { id: 'finance', label: '💸 Finance & Banking' },
                { id: 'tech', label: '💻 Tech & Digital' },
                { id: 'hospitality', label: '🏨 Hospitality & Tourism' },
                { id: 'construction', label: '🏗️ Construction & Trades' },
                { id: 'health', label: '🩺 Health & Wellness' },
                { id: 'sports', label: '⚽ Sports & Recreation' }
            ],
            sub: [] // Populated from DROPDOWN_REFERENCE_BUSINESS_DATA or internal list
        };
    }

    open() {
        const overlay = document.getElementById('builder-view');
        if (!overlay) return;
        this.currentStep = 1;
        this.render();
        window.MizanoNav.openOverlay('builder-view');
    }

    render() {
        const overlay = document.getElementById('builder-view');
        overlay.innerHTML = `
            <div class="business-builder-container" style="background: white; min-height: 100vh; display: flex; flex-direction: column;">
                <div class="overlay-header" style="background:#000; color:white; padding:15px; display:flex; align-items:center;">
                    <button class="back-btn" onclick="window.MizanoNav.back()" style="color:white; border:none; background:none; font-size:1.2rem;">‹ Close</button>
                    <h2 style="margin:0 0 0 10px;">Business Registration</h2>
                    <div style="margin-left:auto; font-size:0.8rem; background:#ffd700; color:black; padding:4px 8px; border-radius:12px; font-weight:bold;">
                        Step ${this.currentStep} of 4
                    </div>
                </div>

                <div class="builder-content" style="flex:1; padding:20px; overflow-y:auto;">
                    ${this.renderStep()}
                </div>

                <div class="builder-footer" style="padding:15px; border-top:1px solid #eee; display:flex; gap:10px;">
                    ${this.currentStep > 1 ? `<button class="secondary-btn" onclick="window.MizanoBusinessBuilder.prevStep()" style="flex:1; padding:12px; border-radius:8px; border:1px solid #ccc;">Back</button>` : ''}
                    <button class="primary-btn" onclick="window.MizanoBusinessBuilder.nextStep()" style="flex:2; padding:12px; border-radius:8px; background:#ffd700; color:black; font-weight:bold; border:none;">
                        ${this.currentStep === 4 ? 'Submit for Approval' : 'Next Step'}
                    </button>
                </div>
            </div>
        `;
    }

    renderStep() {
        switch (this.currentStep) {
            case 1: return this.renderIdentity();
            case 2: return this.renderCategories();
            case 3: return this.renderOperations();
            case 4: return this.renderReview();
            default: return '';
        }
    }

    renderIdentity() {
        return `
            <h3>1. Business Identity</h3>
            <p style="font-size:0.9rem; color:#666;">Define your corporate presence on Mizano.</p>
            <div class="form-group" style="margin-bottom:15px;">
                <label style="display:block; margin-bottom:5px; font-weight:bold;">Business Name</label>
                <input type="text" id="biz-name" value="${this.formData.name}" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px;">
            </div>
            <div class="form-group" style="margin-bottom:15px;">
                <label style="display:block; margin-bottom:5px; font-weight:bold;">Headquarters (City/Town)</label>
                <input type="text" id="biz-hq" value="${this.formData.hq}" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px;">
            </div>
            <div class="form-group" style="margin-bottom:15px;">
                <label style="display:block; margin-bottom:5px; font-weight:bold;">Description</label>
                <textarea id="biz-desc" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; height:80px;">${this.formData.description}</textarea>
            </div>
            <div class="form-group" style="margin-bottom:15px;">
                <label style="display:block; margin-bottom:5px; font-weight:bold;">Contact WhatsApp</label>
                <input type="tel" id="biz-whatsapp" value="${this.formData.contacts.whatsapp}" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px;">
            </div>
        `;
    }

    renderCategories() {
        const extraMain = Math.max(0, this.formData.main_categories.length - 2);
        const extraSubs = Math.max(0, this.formData.sub_categories.length - 4);
        const total = 200 + (extraMain * 100) + (extraSubs * 100);
        this.formData.billing_total = total;

        return `
            <h3>2. Categories & Monetization</h3>
            <p style="font-size:0.9rem; color:#666;">Select where your business appears. 2 Main & 4 Sub-categories are included in the base fee.</p>
            
            <div class="pricing-card" style="background:#f0f4ff; padding:15px; border-radius:8px; margin-bottom:20px; border:1px solid #4472c4;">
                <div style="display:flex; justify-content:space-between;">
                    <span>Monthly Base Fee:</span><strong>P200.00</strong>
                </div>
                ${extraMain > 0 ? `
                <div style="display:flex; justify-content:space-between; margin-top:5px;">
                    <span>Extra Main Categories (${extraMain}):</span><strong>P${(extraMain * 100).toFixed(2)}</strong>
                </div>` : ''}
                <div style="display:flex; justify-content:space-between; margin-top:5px;">
                    <span>Extra Sub-Categories (${extraSubs}):</span><strong>P${(extraSubs * 100).toFixed(2)}</strong>
                </div>
                <hr style="border:0; border-top:1px solid #ccc; margin:10px 0;">
                <div style="display:flex; justify-content:space-between; font-size:1.1rem;">
                    <strong>Total Monthly Billing:</strong><strong style="color:#4472c4;">P${total.toFixed(2)}</strong>
                </div>
            </div>

            <label style="font-weight:bold;">Main Categories (P100 each after 2nd)</label>
            <div class="chip-container" style="display:flex; flex-wrap:wrap; gap:8px; margin:10px 0;">
                ${this.categories.main.map(cat => `
                    <div class="chip ${this.formData.main_categories.includes(cat.id) ? 'active' : ''}" 
                         onclick="window.MizanoBusinessBuilder.toggleMain('${cat.id}')"
                         style="padding:8px 15px; border-radius:20px; border:1px solid #ccc; cursor:pointer; font-size:0.9rem; ${this.formData.main_categories.includes(cat.id) ? 'background:#4472c4; color:white; border-color:#4472c4;' : ''}">
                        ${cat.label}
                    </div>
                `).join('')}
            </div>

            <!-- Simplified Sub-Category Input for Demo -->
            <label style="font-weight:bold; margin-top:15px; display:block;">Add Sub-Categories (P100 each after 4th)</label>
            <div style="display:flex; gap:8px; margin-top:8px;">
                <input type="text" id="sub-cat-input" placeholder="e.g. Audit, Logistics" style="flex:1; padding:8px; border:1px solid #ccc; border-radius:6px;">
                <button onclick="window.MizanoBusinessBuilder.addSub()" style="padding:8px 15px; background:#000; color:white; border:none; border-radius:6px;">Add</button>
            </div>
            <div class="chip-container" style="display:flex; flex-wrap:wrap; gap:8px; margin-top:10px;">
                ${this.formData.sub_categories.map(cat => `
                    <div class="chip active" style="padding:5px 12px; border-radius:15px; background:#eee; font-size:0.8rem; display:flex; align-items:center;">
                        ${cat} <span onclick="window.MizanoBusinessBuilder.removeSub('${cat}')" style="margin-left:8px; cursor:pointer;">×</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderOperations() {
        return `
            <h3>3. Operations & History</h3>
            <p style="font-size:0.9rem; color:#666;">List your staff and engagement history (10+ required for verification).</p>
            
            <div class="form-group" style="margin-bottom:15px;">
                <label style="font-weight:bold;">Staff & Representatives</label>
                <div style="display:flex; gap:8px; margin-top:5px;">
                    <input type="text" id="staff-name" placeholder="Staff Name" style="flex:2; padding:8px; border:1px solid #ccc; border-radius:6px;">
                    <select id="staff-role" style="flex:1; padding:8px; border:1px solid #ccc; border-radius:6px;">
                        <option>Manager</option>
                        <option>Rep</option>
                        <option>Player</option>
                    </select>
                    <button onclick="window.MizanoBusinessBuilder.addStaff()" style="padding:8px; background:#000; color:white; border:none; border-radius:6px;">+</button>
                </div>
                <div id="staff-list" style="margin-top:10px; font-size:0.85rem;">
                    ${this.formData.staff.map(s => `<div>• ${s.name} (${s.role})</div>`).join('')}
                </div>
            </div>

            <div class="form-group">
                <label style="font-weight:bold;">Corporate Engagement History (${this.formData.history.length}/10)</label>
                <textarea id="history-entry" placeholder="e.g. 2024 Inter-Bank Soccer Tournament - Semi Finalist" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; margin-top:5px;"></textarea>
                <button onclick="window.MizanoBusinessBuilder.addHistory()" style="width:100%; padding:8px; background:#eee; border:1px solid #ccc; margin-top:5px; border-radius:6px;">Add Historical Record</button>
                <div style="margin-top:10px; max-height:100px; overflow-y:auto; font-size:0.8rem;">
                    ${this.formData.history.map(h => `<div style="padding:4px; border-bottom:1px solid #eee;">${h}</div>`).join('')}
                </div>
            </div>
        `;
    }

    renderReview() {
        return `
            <div class="billing-sheet" style="background:#fff; border:1px solid #ddd; padding:20px; border-radius:8px;">
                <h3 style="text-align:center; margin-bottom:20px;">Monthly Billing Sheet</h3>
                <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                    <span>Business Name:</span><strong>${this.formData.name || 'N/A'}</strong>
                </div>
                <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                    <span>Base Listing Fee:</span><strong>P200.00</strong>
                </div>
                <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                    <span>Main Categories (${this.formData.main_categories.length}):</span><strong>${this.formData.main_categories.length > 2 ? 'P' + ((this.formData.main_categories.length - 2) * 100).toFixed(2) : 'Included'}</strong>
                </div>
                <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                    <span>Sub Categories (${this.formData.sub_categories.length}):</span><strong>${this.formData.sub_categories.length > 4 ? 'P' + ((this.formData.sub_categories.length - 4) * 100).toFixed(2) : 'Included'}</strong>
                </div>
                <hr>
                <div style="display:flex; justify-content:space-between; font-size:1.2rem; margin-top:10px; color:#c00;">
                    <strong>Monthly Total:</strong><strong>P${this.formData.billing_total.toFixed(2)}</strong>
                </div>
                
                <div style="background:#fff4cc; padding:15px; border-radius:8px; margin-top:20px; font-size:0.85rem;">
                    ⚠️ <strong>Admin Approval Required</strong>: Your business will be listed once the first payment is verified by our finance team. You will be notified via WhatsApp.
                </div>
            </div>
        `;
    }

    // --- Logic Methods ---

    saveStepData() {
        if (this.currentStep === 1) {
            this.formData.name = document.getElementById('biz-name').value;
            this.formData.hq = document.getElementById('biz-hq').value;
            this.formData.description = document.getElementById('biz-desc').value;
            this.formData.contacts.whatsapp = document.getElementById('biz-whatsapp').value;
        }
    }

    nextStep() {
        this.saveStepData();
        if (this.currentStep < 4) {
            this.currentStep++;
            this.render();
        } else {
            this.submit();
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.render();
        }
    }

    toggleMain(id) {
        if (this.formData.main_categories.includes(id)) {
            this.formData.main_categories = this.formData.main_categories.filter(c => c !== id);
        } else {
            this.formData.main_categories.push(id);
        }
        this.render();
    }

    addSub() {
        const val = document.getElementById('sub-cat-input').value.trim();
        if (val && !this.formData.sub_categories.includes(val)) {
            this.formData.sub_categories.push(val);
            this.render();
        }
    }

    removeSub(val) {
        this.formData.sub_categories = this.formData.sub_categories.filter(c => c !== val);
        this.render();
    }

    addStaff() {
        const name = document.getElementById('staff-name').value;
        const role = document.getElementById('staff-role').value;
        if (name) {
            this.formData.staff.push({ name, role });
            this.render();
        }
    }

    addHistory() {
        const entry = document.getElementById('history-entry').value;
        if (entry) {
            this.formData.history.push(entry);
            this.render();
        }
    }

    async submit() {
        console.log('BusinessBuilder: Submitting...', this.formData);
        if (window.mizanoData) {
            await window.mizanoData.createBusiness(this.formData);
        }
        alert('Registration submitted! Awaiting Admin approval.');
        window.MizanoNav.back();
    }
}

window.MizanoBusinessBuilder = new BusinessBuilder();
