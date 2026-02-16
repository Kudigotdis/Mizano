/**
 * BOTHOFLOW AUTHENTICATION LOGIC
 */

const BothoflowAuth = {
    async loadDemoProfile() {
        try {
            const response = await fetch('./data/demo_profile.json');
            const kao = await response.json();
            await window.BothoflowStorage.saveUser(kao);
            window.BothoflowStorage.setCurrentUser(kao.profile_id);
            return true;
        } catch (e) {
            console.error('Failed to load demo profile', e);
            return false;
        }
    },

    async signup(profileData) {
        // Add timestamps and unique ID if not present
        const user = {
            profile_id: `USR-BW-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            created_at: new Date().toISOString(),
            ...profileData
        };
        await window.BothoflowStorage.saveUser(user);
        window.BothoflowStorage.setCurrentUser(user.profile_id);
        return user;
    },

    async isLoggedIn() {
        const id = window.BothoflowStorage.getCurrentUserId();
        if (!id) return false;
        const user = await window.BothoflowStorage.getUser(id);
        return !!user;
    }
};

window.BothoflowAuth = BothoflowAuth;
