/**
 * MIZANO CARD RENDERER - PHASE 10 ENGAGEMENT PATCH
 * Extends CardRenderer with Suggestion, Challenge, Survey, and Stats templates.
 */

(function () {
    if (!window.MizanoCards) return;

    const Proto = window.MizanoCards.prototype;

    /**
     * Patch createCard to handle Phase 10 types
     */
    const originalCreateCard = Proto.createCard;
    Proto.createCard = function (data) {
        const type = data.card_type || data.mizano_entity_type;

        switch (type) {
            case 'suggestion':
            case 'Suggestion Card':
                return this._assembleCard(data, 'learning', this.templateSuggestion(data));
            case 'challenge':
            case 'Challenge Card':
                return this._assembleCard(data, 'recruiting', this.templateChallenge(data));
            case 'survey':
            case 'Survey Card':
                return this._assembleCard(data, 'engagement', this.templateSurvey(data));
            case 'stats':
            case 'Stats Card':
                return this._assembleCard(data, 'finished', this.templateStats(data));
            default:
                return originalCreateCard.call(this, data);
        }
    };

    /**
     * Helper to assemble a card with standard wrapper logic
     */
    Proto._assembleCard = function (data, status, html) {
        const card = document.createElement('div');
        card.className = 'mizano-card';
        card.dataset.status = status;
        card.innerHTML = html;
        return card;
    };

    /**
     * 1. SUGGESTION CARD (Blue Border)
     */
    Proto.templateSuggestion = function (data) {
        const title = data.title || 'Activity of the Week';
        const desc = data.description || 'Try something new today!';
        const icon = data.icon || '✨';

        return `
            <div class="card-poll__category" style="color:var(--c-learning);">SUGGESTION</div>
            <div style="display:flex; gap:12px; align-items:start;">
                <div style="font-size:32px;">${icon}</div>
                <div style="flex:1;">
                    <div class="card-event__title">${title}</div>
                    <div class="card-event__tags" style="margin-bottom:8px;">${desc}</div>
                </div>
            </div>
            <div style="display:flex; gap:8px; margin-top:10px;">
                <button class="mizano-action-btn" style="flex:1; background:var(--c-learning); color:white; border:none; padding:8px; border-radius:6px; font-weight:600;">I'll try it</button>
                <button class="btn-outline" style="flex:1; border:1.5px solid var(--c-learning); color:var(--c-learning); background:transparent; padding:8px; border-radius:6px; font-weight:600;">Maybe later</button>
            </div>
        `;
    };

    /**
     * 2. CHALLENGE CARD (Green Border)
     */
    Proto.templateChallenge = function (data) {
        const title = data.title || data.goal || 'Neighborhood Challenge';
        const progress = data.progress || 0;
        const target = data.target || 100;
        const percent = Math.min(100, Math.round((progress / target) * 100));

        return `
            <div class="card-challenge__type">CHALLENGE</div>
            <div class="card-challenge__goal">${title}</div>
            <div class="card-challenge__progress-label">
                <span>Progress</span>
                <span>${progress} / ${target}</span>
            </div>
            <div class="card-challenge__progress-bar">
                <div class="card-challenge__progress-fill" style="width: ${percent}%"></div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
                <span class="card-challenge__participants">👥 ${data.participant_count || 0} joined</span>
                <button class="mizano-action-btn" style="background:var(--c-recruiting); color:white; border:none; padding:6px 16px; border-radius:20px; font-weight:600;">${progress > 0 ? 'Update' : 'Join'}</button>
            </div>
        `;
    };

    /**
     * 3. SURVEY CARD (Pink Border - Mealfo)
     */
    Proto.templateSurvey = function (data) {
        const question = data.question || 'How was your meal today?';
        const options = data.options || ['Great', 'Good', 'Okay', 'Poor'];

        return `
            <div class="card-poll__category">MEALFO SURVEY</div>
            <div class="card-poll__question">${question}</div>
            <div class="card-poll__options">
                ${options.map(opt => `<div class="card-poll__option" style="flex:1 1 40%; font-size:11px; padding:6px;">${opt}</div>`).join('')}
            </div>
            <div style="font-size:10px; color:var(--c-meta); margin-top:10px; text-align:center;">
                Your feedback helps improve local nutrition awareness.
            </div>
        `;
    };

    /**
     * 4. STATS CARD (Charcoal Border)
     */
    Proto.templateStats = function (data) {
        const title = data.title || 'Participation Stats';
        const stats = data.stats || [
            { label: 'Events', value: 0 },
            { label: 'Activities', value: 0 },
            { label: 'Streaks', value: 0 }
        ];

        return `
            <div class="card-poll__category" style="color:var(--c-finished);">AGGREGATE STATS</div>
            <div class="card-event__title" style="margin-bottom:12px;">${title}</div>
            <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:10px; text-align:center;">
                ${stats.map(s => `
                    <div style="background:var(--c-faint); padding:8px; border-radius:8px;">
                        <div style="font-size:20px; font-weight:700; color:var(--c-finished);">${s.value}</div>
                        <div style="font-size:10px; color:var(--c-meta); text-transform:uppercase;">${s.label}</div>
                    </div>
                `).join('')}
            </div>
            <div style="font-size:11px; color:var(--c-meta); margin-top:12px; font-style:italic;">
                "You're in the top 15% of active residents this month!"
            </div>
        `;
    };

})();
