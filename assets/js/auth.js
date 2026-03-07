/**
 * BOTHOFLOW AUTHENTICATION LOGIC (Wrapper for AuthManager)
 */

const MizanoAuth = {
    async loadDemoProfile(profileData = null) {
        try {
            // Use provided profile, global variable, or fetch default
            let kao = profileData || window.MIZANO_DEMO_PROFILE;

            if (!kao) {
                // Fallback for server environments
                const response = await fetch('./data/demo_profile.json');
                if (!response.ok) throw new Error('Demo profile not found');
                kao = await response.json();
            }

            // Ensure storage is initialized
            if (window.mizanoStorage.init) await window.mizanoStorage.init();

            await window.mizanoStorage.saveUser(kao);

            // Login via AuthManager instead of just setting storage manually
            if (window.authManager) {
                await window.authManager.login(kao.profile_id || kao.uid);
            } else {
                window.mizanoStorage.setCurrentUser(kao.profile_id || kao.uid);
            }

            console.log(`MizanoAuth: Demo profile (${kao.full_name || 'Kao Modise'}) loaded.`);
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
            uid: `USR-BW-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            created_at: new Date().toISOString(),
            ...profileData
        };

        // Ensure uid matches profile_id for consistency
        user.uid = user.profile_id;

        // Save to IndexedDB
        if (window.mizanoStorage.init) await window.mizanoStorage.init();
        await window.mizanoStorage.saveUser(user);

        // Login via AuthManager
        if (window.authManager) {
            await window.authManager.login(user.profile_id);
        } else {
            window.mizanoStorage.setCurrentUser(user.profile_id);
        }

        return user;
    },

    async isLoggedIn() {
        if (window.authManager) {
            return window.authManager.isAuthenticated();
        }
        try {
            const id = window.mizanoStorage.getCurrentUserId();
            if (!id) return false;
            const user = await window.mizanoStorage.getUser(id);
            return !!user;
        } catch (e) {
            console.error('MizanoAuth: isLoggedIn check failed', e);
            return false;
        }
    },

    isDemo() {
        if (window.authManager && typeof window.authManager.isGuest === 'function') {
            return window.authManager.isGuest();
        }
        try {
            const session = JSON.parse(localStorage.getItem('mizano_session') || '{}');
            return !!(session.is_guest || session.uid === 'guest' || session.role === 'guest');
        } catch (e) {
            return false;
        }
    },

    getCurrentUserId() {
        if (window.authManager?.getCurrentUser?.()) {
            return window.authManager.getCurrentUser().uid || window.authManager.getCurrentUser().profile_id;
        }
        if (window.mizanoStorage?.getCurrentUserId) {
            return window.mizanoStorage.getCurrentUserId();
        }
        return null;
    },

    getCurrentUser() {
        if (window.authManager?.getCurrentUser) {
            return window.authManager.getCurrentUser();
        }
        return null;
    }
};

window.MizanoAuth = MizanoAuth;
