/**
 * MIZANO AUTH BRIDGE (auth.js → AuthManager.js)
 * Applied Android Studio Otter Pipeline standards.
 * This file is a thin wrapper — all session truth lives in AuthManager.js.
 */

const MizanoAuth = {
    /**
     * Loads a demo / preview profile into both IndexedDB stores and starts an
     * AuthManager session.  Called from the Browse sheet in login.html.
     */
    async loadDemoProfile(profileData = null) {
        console.log('MizanoAuth: loadDemoProfile start', profileData ? profileData.uid : 'null');
        
        let profile = profileData || window.MIZANO_DEMO_PROFILE;

        if (!profile) {
            console.log('MizanoAuth: Fetching demo_profile.json');
            const response = await fetch('./data/demo_profile.json');
            if (!response.ok) throw new Error('Demo profile not found');
            profile = await response.json();
        }

        // Normalise: preview users use 'name', StorageManager wants uid + display_name
        const normProfile = {
            ...profile,
            uid: profile.uid || profile.profile_id,
            profile_id: profile.profile_id || profile.uid,
            display_name: profile.display_name || profile.name || profile.full_name,
            full_name: profile.full_name || profile.name || profile.display_name
        };

        if (!normProfile.uid) {
            throw new Error('Profile missing UID');
        }

        // Ensure storage is initialised
        if (window.mizanoStorage && window.mizanoStorage.init) {
            console.log('MizanoAuth: Ensuring storage initialized');
            await window.mizanoStorage.init();
        }

        // Write to BOTH stores (users + user_profiles) via saveProfile()
        console.log('MizanoAuth: Saving profile to storage...');
        await window.mizanoStorage.saveProfile(normProfile);

        // Start AuthManager session
        if (window.authManager) {
            console.log('MizanoAuth: Initiating auth session for', normProfile.profile_id);
            const user = await window.authManager.login(normProfile.profile_id);
            if (!user) {
                throw new Error('AuthManager failed to log in user');
            }
        } else {
            console.log('MizanoAuth: No AuthManager found, setting currentUser manually');
            window.mizanoStorage.setCurrentUser(normProfile.profile_id);
        }

        console.log(`MizanoAuth: Demo profile (${normProfile.display_name}) loaded.`);
        return true;
    },

    /**
     * Creates a brand-new user from signup form data.
     * Writes to BOTH IndexedDB stores and starts a session.
     */
    async signup(profileData) {
        const id = `USR-BW-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        const user = {
            profile_id: id,
            uid: id,
            created_at: new Date().toISOString(),
            ...profileData
        };

        // uid must match profile_id for consistent lookups
        user.uid = user.profile_id;
        user.display_name = user.display_name || user.name || user.full_name;

        if (window.mizanoStorage && window.mizanoStorage.init) {
            await window.mizanoStorage.init();
        }

        // saveProfile() writes to users + user_profiles (not just users)
        await window.mizanoStorage.saveProfile(user);

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
