/**
 * MIZANO MARATHON REGISTRATION FORM
 * Handles participation signup for athletic events.
 */

class MarathonRegForm {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentStep = 1;
        this.formData = {};
        this.activeActivityId = null;
    }

    render(activityId) {
        if (!this.container) return;
        this.activeActivityId = activityId;
        const activity = window.mizanoData.getEventById(activityId);

        this.container.innerHTML = `
            <div class="reg-form-wrapper">
                <div class="reg-form-header">
                    <button class="close-btn" onclick="window.MizanoMarathonForm.close()">✕</button>
                    <h2>Register: ${activity.event_name}</h2>
                </div>
                
                <div class="reg-form-content">
                    ${this.renderStep(activity)}
                </div>

                <div class="reg-form-actions">
                    ${this.currentStep > 1 ? `<button class="secondary-btn" onclick="window.MizanoMarathonForm.prev()">Back</button>` : ''}
                    ${this.currentStep < 3 ?
                `<button class="primary-btn" onclick="window.MizanoMarathonForm.next()">Next</button>` :
                `<button class="submit-btn" onclick="window.MizanoMarathonForm.submit()">Complete Registration</button>`
            }
                </div>
            </div>
        `;
    }

    renderStep(activity) {
        switch (this.currentStep) {
            case 1:
                return `
                    <div class="step">
                        <h3>1. Participant Info</h3>
                        <div class="input-group">
                            <label>Full Name</label>
                            <input type="text" id="reg-name" placeholder="Enter your name" value="${this.formData.name || ''}">
                        </div>
                        <div class="input-group">
                            <label>WhatsApp Number</label>
                            <input type="tel" id="reg-phone" placeholder="+267" value="${this.formData.phone || ''}">
                        </div>
                    </div>
                `;
            case 2:
                return `
                    <div class="step">
                        <h3>2. Select Distance</h3>
                        <div class="option-list">
                            ${(activity.distances || []).map(d => `
                                <label class="radio-option">
                                    <input type="radio" name="distance" value="${d}" ${this.formData.distance === d ? 'checked' : ''}>
                                    <span>${d}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                `;
            case 3:
                return `
                    <div class="step">
                        <h3>3. Safety & Medical</h3>
                        <div class="input-group">
                            <label>Emergency Contact Name</label>
                            <input type="text" id="reg-emergency-name" value="${this.formData.emergencyName || ''}">
                        </div>
                        <div class="input-group">
                            <label>Medical Conditions (Optional)</label>
                            <textarea id="reg-medical">${this.formData.medical || ''}</textarea>
                        </div>
                    </div>
                `;
            default:
                return '';
        }
    }

    saveCurrentStepData() {
        if (this.currentStep === 1) {
            this.formData.name = document.getElementById('reg-name')?.value;
            this.formData.phone = document.getElementById('reg-phone')?.value;
        } else if (this.currentStep === 2) {
            const selected = document.querySelector('input[name="distance"]:checked');
            this.formData.distance = selected ? selected.value : null;
        } else if (this.currentStep === 3) {
            this.formData.emergencyName = document.getElementById('reg-emergency-name')?.value;
            this.formData.medical = document.getElementById('reg-medical')?.value;
        }
    }

    next() {
        this.saveCurrentStepData();
        if (this.currentStep < 3) {
            this.currentStep++;
            this.render(this.activeActivityId);
        }
    }

    prev() {
        this.saveCurrentStepData();
        if (this.currentStep > 1) {
            this.currentStep--;
            this.render(this.activeActivityId);
        }
    }

    close() {
        this.container.classList.remove('active');
        this.currentStep = 1;
        this.formData = {};
    }

    async submit() {
        this.saveCurrentStepData();
        console.log('Marathon Registration: Submitting data...', this.formData);

        // Mock submission
        if (window.mizanoData) {
            window.mizanoData.setRSVP(this.activeActivityId, 'registered');
        }

        alert('Registration Successful! Your details have been saved offline.');
        this.close();
        window.MizanoNav.back(); // Back to card list or detail
    }
}

// Target a new overlay container or reuse existing
// For simplicity, we use the 'builder-view' or create a new 'registration-view' in index.html later
window.MizanoMarathonForm = new MarathonRegForm('builder-view'); 
