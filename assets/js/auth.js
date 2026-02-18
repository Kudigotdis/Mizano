/**
 * BOTHOFLOW AUTHENTICATION LOGIC
 */

const MizanoAuth = {
    async loadDemoProfile() {
        try {
            // Use global variable if available (avoiding fetch/CORS issues)
            let kao = window.MIZANO_DEMO_PROFILE;

            if (!kao) {
                // Fallback for server environments
                const response = await fetch('./data/demo_profile.json');
                if (!response.ok) throw new Error('Demo profile not found');
                kao = await response.json();
            }

            // Ensure storage is initialized
            if (window.mizanoStorage.init) await window.mizanoStorage.init();

            await window.mizanoStorage.saveUser(kao);
            window.mizanoStorage.setCurrentUser(kao.profile_id);
            console.log('MizanoAuth: Demo profile (Kao Modise) loaded.');
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
        try {
            const id = window.mizanoStorage.getCurrentUserId();
            if (!id) return false;

            // Validate user existence in DB
            const user = await window.mizanoStorage.getUser(id);
            return !!user;
        } catch (e) {
            console.error('MizanoAuth: isLoggedIn check failed', e);
            return false;
        }
    }
};

window.MizanoAuth = MizanoAuth;
