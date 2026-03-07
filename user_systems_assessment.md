# User Systems Assessment: Profiles & Authentication

This document outlines the findings from the deep assessment of Mizano's user profile and authentication systems.

## 1. Executive Summary
The system is currently fragmented between two authentication handlers (`auth.js` and `AuthManager.js`). The "Browse" feature is hardcoded to a single profile, and the signup process is a non-functional stub. Navigation to "My Profile" is failing due to missing event handling in the shell.

---

## 2. Identified Issues & Logic Gaps

### [High Priority] Authentication Fragmentation
- **Issue**: `login.html` uses `MizanoAuth` (from `assets/js/auth.js`) for the initial login/signup, while the main application (`index.html`) relies on `AuthManager.js`. 
- **Impact**: Inconsistent session states. A user appearing logged in on the login page may not be correctly identified by the main app's `StorageManager` or `AuthManager`.
- **Fix**: Centralize all auth logic in `AuthManager.js` and have `auth.js` act only as a thin wrapper or bridge.

### [High Priority] Missing "My Profile" Routing
- **Issue**: Tapping "My Profile" in the Hamburger menu triggers a `page-push` event for `profile-view`. However, `shell.js` does NOT have a handler for this event to make the `detail-view` overlay active.
- **Impact**: "Nothing happens" when the user clicks "My Profile".
- **Fix**: Add `profile-view` support to the `mizano-nav` listener in `shell.js`.

### [Medium Priority] Hardcoded Demo Profile
- **Issue**: The "Browse" button in `login.html` is hardcoded to load `demo_user` (Kuda Mushiri).
- **Request**: The user wants a selection of 10 diverse profiles.
- **Fix**: Implement a "Profiles" slide-up panel on the login screen that reads from `data/mizano_1000_profiles.json` and allows selecting one of 10 sampled users.

### [Medium Priority] Non-functional Signup Flow
- **Issue**: `login.html` logic for signup accepts input but then redirects back to login or index without actually creating a persistence record in IndexedDB that the rest of the app can use.
- **Impact**: After creating a profile, the user's information is not "acknowledged".
- **Fix**: Ensure the signup process correctly invokes `window.mizanoStorage.saveProfile()` and sets the `currentUser` in `localStorage`.

### [Low Priority] Mine Panel vs User Profile
- **Issue**: The user wants "My Profile" to be a dedicated panel, not nested under "Mine".
- **Fix**: Create Panel 18 (User Profile) and update `NavigationController` to map "My Profile" to this index instead of or in addition to the detail-view overlay.

---

## 3. Prioritized Fix List & File Manifest

### Phase 1: Infrastructure Cleanup
*   **Target**: `assets/js/auth.js`, `AuthManager.js`, `StorageManager.js`
*   **Goal**: Unify session management and ensure `mizanoStorage` is the source of truth for the logged-in user ID.

### Phase 2: Login & Browse Experience
*   **Target**: `login.html`, `assets/css/login.css`
*   **Goal**: Implement the "Profiles" selection panel. Link choosing a profile to a deep-data load.

### Phase 3: Navigation & Routing
*   **Target**: `shell.js`, `NavigationController.js`, `index.html`
*   **Goal**: Fix the "My Profile" button. Map it to a dedicated panel (Panel 18).

### Phase 4: Data Acknowledgement
*   **Target**: `ProfilePanel.js`, `ProfileDetail.js`
*   **Goal**: Ensure all profile cards (Identity, Associations, etc.) correctly display the current user's data from IndexedDB.

---

## 4. Key Files for External AI Assessment
For another AI to fix these issues, they would need the following files:
1.  `login.html` (Auth entry point)
2.  `assets/js/auth.js` (Auth bridge)
3.  `AuthManager.js` (Session logic)
4.  `StorageManager.js` (Data persistence)
5.  `shell.js` (Main router)
6.  `NavigationController.js` (UI state)
7.  `ProfilePanel.js` (Summary view)
8.  `ProfileDetail.js` (Deep view)
9.  `index.html` (Application shell)
10. `data/mizano_1000_profiles.json` (Source of demo data)
