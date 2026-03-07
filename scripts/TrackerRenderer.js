/**
 * MIZANO GOALS DASHBOARD RENDERER (formerly TrackerRenderer)
 * Renders the goals dashboard, including Active Pursuits, Daily Log, and Goal Builder entry.
 */

class GoalsDashboardRenderer {
    constructor(containerId = 'drop-field-tracker') {
        this.containerId = containerId;
        this.storage = window.MizanoTrackerStorage; // Use the refactored singleton
        this.cardRenderer = window.GoalCardRenderer;
    }

    async render() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="goals-dashboard">
                <!-- 1. Active Progress (Main) -->
                <div class="mizano-section">
                    <div class="section-header">
                        <h3>My Pursuits</h3>
                    </div>
                    <div id="gd-active-goals" class="gd-grid">
                        <div class="gd-loading">Loading pursuits...</div>
                    </div>
                </div>

                <!-- 2. Create New Goal (Entry to Builder) -->
                <div class="mizano-section" style="margin-top:20px;">
                    <button class="gd-create-btn" onclick="window.MizanoGoalBuilder.render(document.getElementById('${this.containerId}'))">
                        + Start New Goal
                    </button>
                    <p style="text-align:center; font-size:0.9em; color:#666; margin-top:5px;">
                        Choose from 600+ templates or build your own.
                    </p>
                </div>
                
                <!-- 3. Daily Log -->
                 <div class="mizano-card" data-status="neutral" style="margin-top:20px; border-left: 5px solid #4472C4;">
                     <div class="card-header">
                        <span class="card-title"><strong>Daily Log</strong></span>
                     </div>
                     <div class="gd-quick-log-grid">
                        <button onclick="window.MizanoTrackerRenderer.quickLog('Workout')">🏋️ Workout</button>
                        <button onclick="window.MizanoTrackerRenderer.quickLog('Meal')">🥗 Meal</button>
                        <button onclick="window.MizanoTrackerRenderer.quickLog('Water')">💧 Water</button>
                        <button onclick="window.MizanoTrackerRenderer.quickLog('Sleep')">😴 Sleep</button>
                     </div>
                </div>

                <!-- 4. Featured Goal (Discovery) -->
                <div id="gd-featured" style="margin-top:20px;"></div>
            </div>
        `;

        this.renderActiveGoals();
    }

    async renderActiveGoals() {
        const container = document.getElementById('gd-active-goals');
        try {
            // Get user goals (id, title, type, etc)
            // For now, we simulate or fetch from storage
            // In a real scenario, we'd need userId. Assuming 'current_user' or basic fetch.
            const goals = await this.storage.getUserGoals('current_user') || []; // 'current_user' is placeholder if auth not fully integrated

            // Also check 'goals' catalog for seeded data just to show something if empty?
            // No, user wants to see *their* pursuits.

            if (goals.length === 0) {
                container.innerHTML = `
                    <div class="gd-empty-state">
                        <p>No active pursuits yet.</p>
                        <p>Start a Solo, Duo, or Group goal above!</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = goals.map(g => {
                // If we have GoalCardRenderer, use it. 
                // Currently GoalCardRenderer.js exports a const GoalCardRenderer = { render: ... }
                // So we can use it directly if it's in global scope.

                if (window.GoalCardRenderer && window.GoalCardRenderer.render) {
                    return window.GoalCardRenderer.render(g);
                } else {
                    // Fallback
                    return `<div class="goal-simple-card">${g.title} (${g.type})</div>`;
                }
            }).join('');

        } catch (e) {
            console.error(e);
            container.innerHTML = '<div class="error">Error loading goals.</div>';
        }
    }

    quickLog(type) {
        alert(`Logged ${type}! (Entry saved to DB)`);
        // Actual implementation would call storage.addNote or addEntry
        this.storage.addNote({
            goalId: 'daily_log',
            text: `Quick Log: ${type}`,
            type: 'log',
            value: 1
        });
    }
}

// Global Singleton
window.MizanoTrackerRenderer = new GoalsDashboardRenderer('drop-field-tracker');
