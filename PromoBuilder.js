/**
 * MIZANO — PromoBuilder.js
 * Applied Android Studio Otter Pipeline standards.
 *
 * PromoBuilder.open(businessLocalId) → HTML string injected by AddActionRouter style overlay push
 * On submit → window.mizanoStorage.updateEntity('businesses', localId, { promotions })
 * 5-Step Flow for pushing business promos.
 *
 * Save to: Mizano\PromoBuilder.js
 */

window.PromoBuilder = (function () {

    // ─── STATE ────────────────────────────────────────────────────────────────
    let _businessId = null;
    let _currentStep = 1;

    // Promo draft object
    let _promo = {
        channel: '',
        media_url: null,
        headline: '',
        offer_text: '',
        original_price: '',
        new_price: '',
        expiry_date: ''
    };

    // ─── INIT & OPEN ────────────────────────────────────────────────────────

    // Called by MyBusiness.js or external chips
    function open(businessLocalId) {
        if (!businessLocalId) {
            _showToast('No business ID provided.', 'error');
            return;
        }
        _businessId = businessLocalId;
        _currentStep = 1;
        _promo = {
            channel: '', media_url: null, headline: '',
            offer_text: '', original_price: '', new_price: '', expiry_date: _getDefaultExpiry()
        };

        const builderView = document.getElementById('builder-view');
        if (!builderView) return;

        builderView.innerHTML = _buildHeader() + _buildContainer();

        if (window.MizanoNav && window.MizanoNav.openOverlay) {
            window.MizanoNav.openOverlay('builder');
        } else {
            builderView.style.display = 'flex';
            builderView.classList.add('active');
        }

        _renderStep();
    }

    function _buildHeader() {
        return `
        <div class="overlay-header sticky-top pb-header" style="
            display:flex;align-items:center;padding:14px 16px;
            background:#fff;border-bottom:1px solid #f0f0f0;
            position:sticky;top:0;z-index:100;">
            <button onclick="window.MizanoNav && window.MizanoNav.closeOverlay('builder')" class="pb-close-btn">‹</button>
            <h2 class="pb-title">Create Promo</h2>
            <div style="width:40px;"></div>
        </div>`;
    }

    function _buildContainer() {
        return `
        <div id="pb-wrap">
            ${_styles()}
            <!-- Step Indicator -->
            <div class="pb-stepper">
                <div class="pb-step-text">Step <span id="pb-step-num">1</span> of 5</div>
                <div class="pb-progress-bg">
                    <div id="pb-progress-fill" class="pb-progress-fill" style="width:20%;"></div>
                </div>
            </div>
            
            <!-- Step Content Area -->
            <div id="pb-step-body" class="pb-body"></div>

            <!-- Generic Footer Actions -->
            <div id="pb-footer" class="pb-footer">
                <button type="button" id="pb-btn-back" class="pb-btn pb-btn-secondary" onclick="window.PromoBuilder._prevStep()" style="display:none;">Back</button>
                <button type="button" id="pb-btn-next" class="pb-btn pb-btn-primary" onclick="window.PromoBuilder._nextStep()">Next</button>
            </div>
        </div>`;
    }

    // ─── STEP RENDERERS ───────────────────────────────────────────────────────

    function _renderStep() {
        const body = document.getElementById('pb-step-body');
        const num = document.getElementById('pb-step-num');
        const fill = document.getElementById('pb-progress-fill');
        const btnBack = document.getElementById('pb-btn-back');
        const btnNext = document.getElementById('pb-btn-next');

        if (!body) return;

        num.textContent = _currentStep;
        fill.style.width = `${(_currentStep / 5) * 100}%`;

        btnBack.style.display = _currentStep > 1 ? 'block' : 'none';
        btnNext.textContent = _currentStep === 5 ? 'Publish Promo' : 'Next';

        switch (_currentStep) {
            case 1: body.innerHTML = _htmlStep1(); break;
            case 2: body.innerHTML = _htmlStep2(); break;
            case 3: body.innerHTML = _htmlStep3(); _attachCharCounter(); break;
            case 4: body.innerHTML = _htmlStep4(); _attachDiscountCalculator(); break;
            case 5: body.innerHTML = _htmlStep5(); _attachDatePreview(); break;
        }
    }

    // ─── HTML FOR STEPS ───────────────────────────────────────────────────────

    function _htmlStep1() {
        return `
        <h3 class="pb-heading">Where should this promo appear?</h3>
        <p class="pb-subheading">Choose a channel for your promotion.</p>
        
        <div class="pb-card-option ${_promo.channel === 'profile' ? 'selected' : ''}" onclick="window.PromoBuilder._setChannel('profile', this)">
            <div style="font-size:2rem;margin-bottom:8px;">🏢</div>
            <div style="font-weight:700;">Show on Business Profile</div>
            <div style="font-size:0.8rem;color:#666;margin-top:4px;">Appears directly on your business card. Best for organic walk-ins.</div>
        </div>

        <div class="pb-card-option ${_promo.channel === 'shopping' ? 'selected' : ''}" onclick="window.PromoBuilder._setChannel('shopping', this)">
            <div style="font-size:2rem;margin-bottom:8px;">🛒</div>
            <div style="font-weight:700;">List on Shopping Panel (Panel 11)</div>
            <div style="font-size:0.8rem;color:#666;margin-top:4px;">Pushes to the city-wide shopping feed. Great for reaching new customers.</div>
        </div>`;
    }

    function _htmlStep2() {
        return `
        <h3 class="pb-heading">Add a Photo or Video</h3>
        <p class="pb-subheading">Upload media to capture attention.</p>
        
        <div id="pb-media-preview-wrap" style="display:${_promo.media_url ? 'block' : 'none'}; position:relative; margin-bottom:16px;">
            <img id="pb-media-preview" src="${_promo.media_url || ''}" style="width:100%; border-radius:12px; max-height:200px; object-fit:cover;">
            <button onclick="window.PromoBuilder._removeMedia()" style="position:absolute; top:8px; right:8px; background:rgba(0,0,0,0.6); color:#fff; border:none; border-radius:50%; width:30px; height:30px; font-weight:bold; cursor:pointer;">×</button>
        </div>

        <div style="display:flex; gap:12px;">
            <button class="pb-btn pb-btn-secondary" style="flex:1;" onclick="document.getElementById('pb-image-input').click()">
                📷 Upload Media (Max 20MB)
            </button>
            <button class="pb-btn pb-btn-secondary" style="flex:1; opacity:0.5; cursor:not-allowed;" title="Video coming soon">
                🎥 Upload Video
            </button>
        </div>
        <input type="file" id="pb-image-input" accept="image/*" style="display:none;" onchange="window.PromoBuilder._handleImageUpload(this)">
        `;
    }

    function _htmlStep3() {
        return `
        <h3 class="pb-heading">Write a Catchy Headline</h3>
        <p class="pb-subheading">Max 80 characters. Keep it punchy (e.g., "50% Off Boots").</p>
        
        <input type="text" id="pb-headline" class="pb-input" placeholder="Enter headline here..." value="${_safeAttr(_promo.headline)}" maxlength="80">
        <div style="text-align:right; font-size:0.75rem; color:#888; margin-top:6px;" id="pb-char-count">0 / 80</div>
        `;
    }

    function _htmlStep4() {
        return `
        <h3 class="pb-heading">Offer Details</h3>
        <p class="pb-subheading">Describe the deal or provide pricing info.</p>
        
        <textarea id="pb-offer-text" class="pb-input" style="min-height:90px; resize:vertical; margin-bottom:16px;" placeholder="Details about your offer, minimum spends, or promo codes...">${_safeAttr(_promo.offer_text)}</textarea>

        <div style="display:flex; gap:12px; margin-bottom:8px;">
            <div style="flex:1;">
                <label class="pb-label">Original Price (Optional)</label>
                <div class="pb-price-wrap">
                    <span class="pb-currency">BWP</span>
                    <input type="number" id="pb-price-orig" class="pb-input pb-price-input" value="${_promo.original_price}">
                </div>
            </div>
            <div style="flex:1;">
                <label class="pb-label">Promo Price</label>
                <div class="pb-price-wrap">
                    <span class="pb-currency">BWP</span>
                    <input type="number" id="pb-price-new" class="pb-input pb-price-input" value="${_promo.new_price}">
                </div>
            </div>
        </div>

        <div id="pb-discount-ribbon" style="display:none; background:#e8fdf5; color:#0f9d58; padding:8px 12px; border-radius:8px; font-weight:700; font-size:0.9rem; text-align:center;">
            🔥 <span id="pb-discount-val">0</span>% OFF
        </div>
        `;
    }

    function _htmlStep5() {
        return `
        <h3 class="pb-heading">Promotion Expiry</h3>
        <p class="pb-subheading">When does this promo end? (Defaults to 7 days)</p>
        
        <input type="date" id="pb-expiry" class="pb-input" value="${_promo.expiry_date}" min="${_getDefaultExpiry()}">
        
        <div id="pb-expiry-preview" style="margin-top:16px; padding:12px; background:#f8f9fa; border-radius:8px; font-size:0.85rem; color:#555; text-align:center;">
            Active for <b id="pb-expiry-days">7</b> days
        </div>
        `;
    }


    // ─── STEP ACTIONS & VALIDATION ────────────────────────────────────────────

    function _setChannel(val, el) {
        _promo.channel = val;
        document.querySelectorAll('.pb-card-option').forEach(c => c.classList.remove('selected'));
        el.classList.add('selected');
    }

    function _handleImageUpload(input) {
        const file = input.files[0];
        if (!file) return;
        if (file.size > 20 * 1024 * 1024) { _showToast('Max 20MB allowed', 'error'); return; }

        const r = new FileReader();
        r.onload = e => {
            _promo.media_url = e.target.result;
            document.getElementById('pb-media-preview').src = _promo.media_url;
            document.getElementById('pb-media-preview-wrap').style.display = 'block';
        };
        r.readAsDataURL(file);
    }

    function _removeMedia() {
        _promo.media_url = null;
        document.getElementById('pb-media-preview').src = '';
        document.getElementById('pb-media-preview-wrap').style.display = 'none';
        document.getElementById('pb-image-input').value = '';
    }

    function _attachCharCounter() {
        const h = document.getElementById('pb-headline');
        const c = document.getElementById('pb-char-count');
        if (!h || !c) return;
        h.addEventListener('input', () => {
            c.textContent = `${h.value.length} / 80`;
            c.style.color = h.value.length === 80 ? '#e53935' : '#888';
        });
        h.dispatchEvent(new Event('input')); // init
    }

    function _attachDiscountCalculator() {
        const orig = document.getElementById('pb-price-orig');
        const nnew = document.getElementById('pb-price-new');
        const rib = document.getElementById('pb-discount-ribbon');
        const val = document.getElementById('pb-discount-val');
        if (!orig || !nnew || !rib) return;

        const calc = () => {
            const o = parseFloat(orig.value);
            const n = parseFloat(nnew.value);
            if (o > 0 && n > 0 && o > n) {
                const perc = Math.round(((o - n) / o) * 100);
                val.textContent = perc;
                rib.style.display = 'block';
            } else {
                rib.style.display = 'none';
            }
        };
        orig.addEventListener('input', calc);
        nnew.addEventListener('input', calc);
        calc(); // init
    }

    function _attachDatePreview() {
        const exp = document.getElementById('pb-expiry');
        const days = document.getElementById('pb-expiry-days');
        if (!exp || !days) return;

        const update = () => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const target = new Date(exp.value);
            const diffTime = Math.abs(target - today);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            days.textContent = isNaN(diffDays) ? '?' : diffDays;
        };
        exp.addEventListener('input', update);
        update(); // init
    }

    // ─── NAVIGATE ─────────────────────────────────────────────────────────────

    function _prevStep() {
        if (_currentStep > 1) {
            _saveCurrentStepData();
            _currentStep--;
            _renderStep();
        }
    }

    function _nextStep() {
        if (!_validateStep()) return;

        _saveCurrentStepData();

        if (_currentStep < 5) {
            _currentStep++;
            _renderStep();
        } else {
            _publishPromo();
        }
    }

    function _validateStep() {
        if (_currentStep === 1 && !_promo.channel) {
            _showToast('Please select a channel', 'error'); return false;
        }
        if (_currentStep === 2 && !_promo.media_url) {
            // Requirement is soft for photo, but let's encourage it. We will allow skipping media if they really want,
            // actually no, DOC says "Image or video upload." Wait, let's make it optional for now to prevent halting,
            // or require it for rich UI. Let's make it required as per standard promos.
            _showToast('Please upload an image for the promo', 'error'); return false;
        }
        if (_currentStep === 3) {
            const v = document.getElementById('pb-headline').value.trim();
            if (!v) { _showToast('Headline is required', 'error'); return false; }
        }
        if (_currentStep === 4) {
            const v = document.getElementById('pb-offer-text').value.trim();
            if (!v) { _showToast('Offer details are required', 'error'); return false; }
        }
        if (_currentStep === 5) {
            const v = document.getElementById('pb-expiry').value;
            if (!v) { _showToast('Expiry date is required', 'error'); return false; }
        }
        return true;
    }

    function _saveCurrentStepData() {
        if (_currentStep === 3) {
            _promo.headline = document.getElementById('pb-headline').value.trim();
        } else if (_currentStep === 4) {
            _promo.offer_text = document.getElementById('pb-offer-text').value.trim();
            _promo.original_price = document.getElementById('pb-price-orig').value || '';
            _promo.new_price = document.getElementById('pb-price-new').value || '';
        } else if (_currentStep === 5) {
            _promo.expiry_date = document.getElementById('pb-expiry').value;
        }
    }

    // ─── PUBLISH LOGIC (Final Step) ──────────────────────────────────────────

    async function _publishPromo() {
        if (window.MizanoAuth?.isDemo?.()) {
            window.ProfilePanel?._showSignUpModal();
            return;
        }

        try {
            // Fetch business
            const b = await window.mizanoStorage.getEntityById('businesses', _businessId);
            if (!b) throw new Error("Business not found in IDB");

            // Prepare promo payload
            const payload = {
                promo_id: `PROMO-${Date.now()}`,
                headline: _promo.headline,
                offer_text: _promo.offer_text,
                channel: _promo.channel,
                media_url: _promo.media_url,
                original_price: _promo.original_price || null,
                new_price: _promo.new_price || null,
                expiry_date: _promo.expiry_date,
                sync_status: 'pending',
                created_at: new Date().toISOString()
            };

            // Push to business.promotions
            const promos = b.promotions || [];
            promos.push(payload);

            await window.mizanoStorage.updateEntity('businesses', _businessId, { promotions: promos });

            // TODO: If channel === 'shopping', we could push to a 'promos' store, 
            // but for MVP, Panel 11 simply queries businesses for promos channel='shopping'.

            _showToast('Promo is live! 🚀');
            setTimeout(() => {
                window.MizanoNav.closeOverlay('builder');
                // Auto-refresh the parent module if it has a refresh function
                if (window.MyBusiness && typeof window.MyBusiness.refresh === 'function') {
                    window.MyBusiness.refresh();
                }
            }, 1000);

        } catch (e) {
            console.error('Promo Publish Error', e);
            _showToast('Failed to post promo', 'error');
        }
    }

    // ─── HELPERS & STYLES ───────────────────────────────────────────────────

    function _getDefaultExpiry() {
        const d = new Date();
        d.setDate(d.getDate() + 7);
        return d.toISOString().split('T')[0];
    }

    function _safeAttr(v) { return (v || '').replace(/'/g, '&#39;'); }

    function _showToast(msg, type = 'success') {
        let t = document.getElementById('pb-toast');
        if (!t) { t = document.createElement('div'); t.id = 'pb-toast'; document.body.appendChild(t); }
        t.style.cssText = `position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:99999;
            background:${type === 'error' ? '#e53935' : (type === 'info' ? '#1a73e8' : '#323232')};color:#fff;padding:10px 20px;
            border-radius:8px;font-size:0.85rem;font-weight:500;box-shadow:0 2px 8px rgba(0,0,0,0.3);`;
        t.textContent = msg; t.style.display = 'block';
        clearTimeout(t._t); t._t = setTimeout(() => t.style.display = 'none', 3000);
    }

    function _styles() {
        if (document.getElementById('pb-styles')) return '';
        return `<style id="pb-styles">
            .pb-header { display:flex; align-items:center; }
            .pb-close-btn { background:none; border:none; font-size:1.4rem; cursor:pointer; color:#1a73e8; padding:4px 8px 4px 0; font-weight:600; }
            .pb-title { flex:1; text-align:center; font-size:1rem; font-weight:700; margin:0; color:#1a1a1a; }
            
            #pb-wrap { padding:0 0 100px; font-family:inherit; }
            
            .pb-stepper { padding:16px; background:#fafafa; border-bottom:1px solid #eee; }
            .pb-step-text { font-size:0.8rem; font-weight:600; color:#555; margin-bottom:8px; }
            .pb-progress-bg { height:6px; background:#e0e0e0; border-radius:3px; overflow:hidden; }
            .pb-progress-fill { height:100%; background:#1a73e8; transition:width 0.3s ease; }

            .pb-body { padding:24px 16px; }
            .pb-heading { margin:0 0 4px; font-size:1.15rem; color:#1a1a1a; }
            .pb-subheading { margin:0 0 20px; font-size:0.85rem; color:#666; line-height:1.4; }

            .pb-card-option { padding:20px; border:2px solid #eee; border-radius:12px; margin-bottom:12px; cursor:pointer; transition:all 0.2s; background:#fff; }
            .pb-card-option:hover { border-color:#ccc; }
            .pb-card-option.selected { border-color:#1a73e8; background:#f4f8ff; }

            .pb-label { display:block; font-size:0.8rem; font-weight:600; color:#555; margin-bottom:6px; }
            .pb-input { width:100%; padding:14px; border:1px solid #dadce0; border-radius:10px; font-size:0.95rem; box-sizing:border-box; outline:none; font-family:inherit; }
            .pb-input:focus { border-color:#1a73e8; }
            
            .pb-price-wrap { position:relative; }
            .pb-currency { position:absolute; left:14px; top:50%; transform:translateY(-50%); color:#888; font-weight:600; font-size:0.9rem; }
            .pb-price-input { padding-left:48px; }

            .pb-footer { position:fixed; bottom:0; left:0; right:0; background:#fff; padding:16px; border-top:1px solid #f0f0f0; display:flex; gap:12px; z-index:100; box-shadow:0 -2px 10px rgba(0,0,0,0.05); }
            .pb-btn { flex:1; padding:14px; border-radius:10px; font-size:0.95rem; font-weight:700; cursor:pointer; text-align:center; font-family:inherit; }
            .pb-btn-primary { background:#1a73e8; color:#fff; border:none; }
            .pb-btn-secondary { background:#f1f3f4; color:#333; border:1px solid #e0e0e0; }
        </style>`;
    }

    return { open, _setChannel, _handleImageUpload, _removeMedia, _prevStep, _nextStep };
})();
