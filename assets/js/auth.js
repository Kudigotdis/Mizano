/**
 * BOTHOFLOW AUTHENTICATION LOGIC
 */

const MizanoAuth = {
    async loadDemoProfile() {
        try {
            const response = await fetch('./data/demo_profile.json');
            const kao = await response.json();
            await window.mizanoStorage.saveUser(kao);
            window.mizanoStorage.setCurrentUser(kao.profile_id);
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
        await window.mizanoStorage.saveUser(user);
        window.mizanoStorage.setCurrentUser(user.profile_id);
        return user;
    },

    async isLoggedIn() {
        const id = window.mizanoStorage.getCurrentUserId();
        if (!id) return false;
        const user = await window.mizanoStorage.getUser(id);
        return !!user;
    }
};

window.MizanoAuth = MizanoAuth;
