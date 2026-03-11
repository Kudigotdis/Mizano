/**
 * MIZANO SUGGESTION ENGINE
 * Parses sample_activity_suggestions.json and evaluates Season / Weather rules.
 * Generates the "Activity of the Week" cards for the Mine panel and Notifications.
 */

class SuggestionEngine {
    constructor() {
        this.suggestions = [];
        this.currentSuggestion = null;
    }

    async init() {
        console.log('SuggestionEngine: Initializing...');
        try {
            const res = await fetch('./data/databases/sample_activity_suggestions.json?v=' + Date.now());
            if (res.ok) {
                this.suggestions = await res.json();
                this.evaluateRules();
                console.log('SuggestionEngine: Loaded and evaluated suggestions', this.currentSuggestion);
            }
        } catch (e) {
            console.error('SuggestionEngine: Failed to load suggestions', e);
        }
    }

    evaluateRules() {
        const month = new Date().getMonth(); // 0-11
        let season = 'all';

        // Rainy season (Nov–Mar)
        if (month >= 10 || month <= 2) {
            season = 'rainy';
        } else {
            // Dry season (Apr–Oct)
            season = 'dry';
        }

        // Weather retrieval from StorageManager weather_cache
        let weather = 'any';
        const weatherCache = window.mizanoStorage ? window.mizanoStorage.load('weather_cache') : null;
        if (weatherCache && (Date.now() - weatherCache.timestamp < 3600000)) { // 1 hour threshold
            weather = weatherCache.payload.condition || 'any';
        }

        let validSuggestions = this.suggestions.filter(s =>
            (s.season === 'all' || s.season === season) &&
            (s.weather === 'any' || s.weather === weather)
        );

        if (validSuggestions.length === 0) {
            validSuggestions = this.suggestions; // fallback if filters too strict
        }

        const weekNum = this.getWeekNumber(new Date());

        // Rotation based on week offset
        const weekMatch = validSuggestions.find(s => s.week_offset === (weekNum % validSuggestions.length));

        this.currentSuggestion = weekMatch || validSuggestions[Math.floor(Math.random() * validSuggestions.length)];
        return this.currentSuggestion;
    }

    getWeekNumber(d) {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    }

    getCurrentSuggestion() {
        return this.currentSuggestion;
    }
}

window.MizanoSuggestionEngine = new SuggestionEngine();
