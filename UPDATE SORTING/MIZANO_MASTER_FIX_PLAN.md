# 🔧 MIZANO MASTER FIX PLAN
## Phase 11 — Full Platform Consolidation & Bug Resolution
**Audited:** All 25 project files reviewed  
**Status:** Ready to implement  
**Priority Order:** P0 (Crash/Blocker) → P1 (Broken Feature) → P2 (Logic Error) → P3 (Enhancement)

---

## 📋 AUDIT SUMMARY — BUGS FOUND

### 🔴 P0 — CRASH / APP WON'T LOAD

| # | File | Bug | Fix |
|---|------|-----|-----|
| P0-1 | `index.html` | Loads `./assets/js/auth.js` but the real file is `AuthManager.js`. Auth redirect will fail silently. | Change `src` to `./AuthManager.js` (it's already loaded further down — remove the duplicate `<script src="./StorageManager.js">` at line 42 too) |
| P0-2 | `index.html` | References `window.MizanoAuth.isLoggedIn()` but `AuthManager` exports `window.authManager` with method `isAuthenticated()`. Mismatch = crash on splash. | Fix auth shim (see AUTH_SHIM fix) |
| P0-3 | `index.html` | Multiple CSS files referenced that don't exist in provided project: `cards.css`, `pulse.css`, `profile.css`, `detail.css`, `builder.css`, `marathon.css`, `teams.css`, `filters.css`, `mine.css`, `tracker.css`, `assets/css/forms.css`. These cause 404s on every load. | Create a `missing_css_guard.js` shim that silently catches these, OR consolidate into `shell.css`. |
| P0-4 | `shell.js` L12 | `window.mizanoData` — but `DataManager` exports to `window.MizanoData` (capital M). All panel renders fail. | Normalize to `window.MizanoData` everywhere. |
| P0-5 | `shell.js` L14 | `window.MizanoFilter` used, but `FilterEngine` constructor doesn't `window.MizanoFilter = ...`. | Add `window.MizanoFilter = new FilterEngine()` at end of FilterEngine.js |
| P0-6 | `shell.js` | `window.MizanoSafety` is called (`safety.setUser(...)`, `safety.checkAction(...)`) but `GuardianSafety.js` is referenced in index.html — file not in project. Creates a null-reference crash. | Create `GuardianSafety.js` stub (see below) |

---

### 🟠 P1 — FEATURE BROKEN

| # | File | Bug | Fix |
|---|------|-----|-----|
| P1-1 | `AuthManager.js` | `isLoggedIn()` method doesn't exist. `index.html` calls it. `isAuthenticated()` exists but returns false for guest. | Add `async isLoggedIn()` method |
| P1-2 | `AuthManager.js` | Guest mode auto-logs in after no session found but index.html already redirects to `login.html`. Race condition: user gets stuck in a redirect loop. | Auth init needs a clear priority: IndexedDB session → login page. Guest is only for Browse mode inside the app. |
| P1-3 | `shell.js` L482 | `updatePanel()` calls `filterEngine.filterData()` but `FilterEngine` has no `filterData()` method — it has `apply()` which fires via listener. Data never reaches cards. | Add `filterData(data)` method to FilterEngine. |
| P1-4 | `shell.js` L503 | `dataManager.getHomeFeed()` — `DataManager` has no `getHomeFeed()` method. Returns undefined → crash. | Add `getHomeFeed()` to DataManager. |
| P1-5 | `shell.js` L528 | `dataManager.getCommunityPosts()` — DataManager has no such method. | Add `getCommunityPosts()` to DataManager. |
| P1-6 | `NavigationController.js` | `switchPanel()` checks `if (index === this.state.panelIndex) return` — this prevents re-renders on panel revisit. Mine panel (15) never re-renders on revisit. | Skip the early-return guard for panel 15 specifically. |
| P1-7 | `MineRenderer.js` | Exported as `class MineRenderer` but shell.js references `window.MizanoMine` which is never assigned. | Add `window.MizanoMine = new MineRenderer('mine-dashboard-container')` at end of file. |
| P1-8 | `CardRenderer.js` | Exported as `class CardRenderer` but shell.js instantiates `new window.MizanoCards(...)`. `window.MizanoCards` is never set. | Add `window.MizanoCards = CardRenderer` at end of CardRenderer.js |
| P1-9 | `FilterEngine.js` | Exported as `class FilterEngine` but never assigned to `window.MizanoFilter`. | Add `window.MizanoFilter = new FilterEngine()` at end. |
| P1-10 | `DataManager.js` | Exported as `class DataManager` but `shell.js` references `window.mizanoData`. Convention mismatch. | Add `window.mizanoData = window.MizanoData = new DataManager()` at end. |
| P1-11 | `shell.js` L508-509 | Home clone sync: `homeClone.innerHTML = homeActual.innerHTML` — this copies all event listeners as dead HTML. Card click events won't work on clone panel. | Use a flag to re-render clone properly, or just hide the clone panel and seamlessly loop without mirroring. |
| P1-12 | `NavigationController.js` L80 | Checks `if (newIndex === 16)` for seamless loop, but `totalPanels` counts 17 (panels 0-16). The modulo logic for prev/next is wrong. `prevPanel()` at index 0 goes to index 16 (clone) not 15 (Mine). | Subtract 1 from totalPanels in the carousel loop logic. |

---

### 🟡 P2 — LOGIC ERROR / WRONG BEHAVIOUR

| # | File | Bug | Fix |
|---|------|-----|-----|
| P2-1 | `shell.js` L514 | Sports panel filter: `a.activity_type === 'match'` — generated data uses `sport`, `type`, or `category` fields, not `activity_type`. No sports cards ever render. | Broaden filter: `a.activity_type === 'match' \|\| a.type === 'match' \|\| a.card_type === 'Standard Match Card'` |
| P2-2 | `shell.js` L515 | Hobbies filter uses `a.activity_type === 'Hobbies'` with capital H — data uses lowercase. | Normalize to `.toLowerCase()` comparison. |
| P2-3 | `MineRenderer.js` L65 | `user.name` — normalized users use `full_name`. Renders "undefined" as profile name. | Use `user.full_name \|\| user.name \|\| 'Mizano User'`. |
| P2-4 | `FilterEngine.js` | `activeActivity` is used in shell.js criteria but FilterEngine's `reset()` and constructor don't include it. | Add `activeActivity: null` to both `this.criteria` init and `reset()`. |
| P2-5 | `shell.js` L590 | `filterEngine.criteria.activeActivity = null` on panel-switch but `filterEngine` (lowercase) vs `window.MizanoFilter` inconsistency. | Standardize all references to `window.MizanoFilter`. |
| P2-6 | `NavigationController.js` | `openOverlay(id)` tries to get element `${id}-overlay` but hamburger menu is `hamburger-overlay`, panels menu is `panels-menu-overlay`. Mismatch for some overlays. | Add an ID map for overlay exceptions. |
| P2-7 | `StorageManager.js` | `logout()` method not defined, but `hamburger-overlay` calls `window.mizanoStorage.logout()`. | Add `logout()` to StorageManager. |
| P2-8 | `shell.js` L409 | Hamburger logout: `window.mizanoStorage.logout()` — should also call `window.authManager.logout()` to clear session. | Chain both. |
| P2-9 | `DataManager.js` | `loadEntity('community')` — community data is stored as an object `{}` in cache, not an array. `filterEngine.filterData()` will fail on non-arrays. | Normalize community to an array on load. |
| P2-10 | `shell.js` L525 | Events render: `filterEngine.filterData(dataManager.cache.events)` — same missing `filterData` method. | Resolved by P1-3. |

---

### 🔵 P3 — MISSING FEATURES / VISION GAPS

| # | File | Gap | Implementation |
|---|------|-----|----------------|
| P3-1 | `index.html` | Missing `manifest.json` and `sw.js` for PWA installation. | Create both files. |
| P3-2 | `CardRenderer.js` | Status badge color system exists but doesn't enforce the full spec: Orange=Active Soon, Green Pulsing=Active Now, Gray=Passed, Blue=Interest, Red=Emergency. | Audit `mapStatus()` and add all cases. |
| P3-3 | `FilterEngine.js` | `activeActivity` filter is wired in shell.js but `filterData()` doesn't check for it. | Add `activeActivity` filter logic. |
| P3-4 | `shell.js` | `card-count` tally element never gets updated. Users can't see result counts. | Update count after each `updateUIWithFilters()` call. |
| P3-5 | `MineRenderer.js` | Guardian-Minor Handshake section missing from Mine panel. | Add `templateMinorFamily()` section. |
| P3-6 | General | WhatsApp/Facebook deep link buttons are missing from activity cards. | Add to `templateMatch()` and `templateEvent()` in CardRenderer.js |
| P3-7 | `StorageManager.js` | `saveScroll()` / `loadScroll()` methods referenced in NavigationController but not defined in StorageManager. | Add both methods. |

---

## 🛠️ IMPLEMENTATION PLAN

### STEP 1: Fix Global Exports (Resolves P0-4, P0-5, P1-7, P1-8, P1-9, P1-10)
Add these lines to the **end** of each file:

**CardRenderer.js** → `window.MizanoCards = CardRenderer;`  
**FilterEngine.js** → `window.MizanoFilter = new FilterEngine();`  
**DataManager.js** → `window.MizanoData = window.mizanoData = new DataManager();`  
**MineRenderer.js** → `window.MizanoMine = new MineRenderer('mine-dashboard-container');`

---

### STEP 2: Fix AuthManager (Resolves P0-2, P1-1, P1-2)
Add `isLoggedIn()` method + fix the `window.MizanoAuth` export shim.

---

### STEP 3: Fix FilterEngine (Resolves P1-3, P2-4, P3-3)
Add `filterData(items)` method + `activeActivity` in criteria.

---

### STEP 4: Fix DataManager (Resolves P1-4, P1-5, P2-9)
Add `getHomeFeed()` and `getCommunityPosts()` methods.

---

### STEP 5: Fix StorageManager (Resolves P2-7, P3-7)
Add `logout()`, `saveScroll()`, `loadScroll()` methods.

---

### STEP 6: Fix shell.js (Resolves P1-11, P2-1, P2-2, P2-5, P2-8, P3-4)
Fix panel filter functions, normalize references, add count tally.

---

### STEP 7: Fix index.html (Resolves P0-1, P0-2)
Fix auth script load order and `MizanoAuth` shim.

---

### STEP 8: Create Missing Files (Resolves P0-6, P3-1)
Create `GuardianSafety.js` stub, `manifest.json`, `sw.js`.

---

### STEP 9: Fix NavigationController (Resolves P1-6, P1-12, P2-6)
Fix panel 15 re-render, totalPanels loop, overlay ID map.

---

### STEP 10: Fix MineRenderer (Resolves P2-3, P3-5)
Fix `user.name` → `user.full_name`, add Minor family section.

---

## 📁 FILES TO DELIVER
1. `CardRenderer.js` — +2 lines at end  
2. `FilterEngine.js` — +filterData() method, +activeActivity criteria  
3. `DataManager.js` — +getHomeFeed(), +getCommunityPosts(), global export  
4. `StorageManager.js` — +logout(), +saveScroll(), +loadScroll()  
5. `AuthManager.js` — +isLoggedIn(), +MizanoAuth shim  
6. `MineRenderer.js` — fix user.name, add export  
7. `NavigationController.js` — fix panel 15, totalPanels, overlay map  
8. `shell.js` — fix filter fns, normalize refs, add count tally  
9. `index.html` — fix auth script order  
10. `GuardianSafety.js` *(new)*  
11. `manifest.json` *(new)*  
12. `sw.js` *(new)*  

---

## 🤖 AI ASSISTANT PROMPT (Paste this when working with another AI)

```
You are working on the Mizano PWA — a community sports app for Botswana.
Stack: Vanilla JS, HTML5, CSS3. No frameworks.
All state goes through StorageManager (IndexedDB). Health data NEVER syncs.

CRITICAL GLOBAL EXPORT CONVENTION:
- window.MizanoCards = CardRenderer class (NOT instance)
- window.MizanoFilter = FilterEngine instance
- window.mizanoData = window.MizanoData = DataManager instance  
- window.MizanoMine = MineRenderer instance
- window.MizanoNav = NavigationController instance
- window.mizanoStorage = StorageManager instance
- window.authManager = AuthManager instance
- window.MizanoAuth = { isLoggedIn: async () => bool } shim

PANEL MAP (index.html panels 0-15 + clone 16):
0=Home, 1=Sports, 2=Hobbies, 3=Leisure, 4=Lessons, 5=Events,
6=Groups, 7=Discover, 8=Community, 9=Leaderboard, 10=Shopping,
11=Shops, 12=Businesses, 13=Schools, 14=Venues, 15=Mine, 16=HomeClone

FILTER CRITERIA SHAPE:
{ search, category, sport, status, location, area, timeFrame, date, activeActivity }

CARD_TYPE VALUES: 'Standard Match Card', 'Registration-State Card', 'Event Card',
'Hobby Leisure Card', 'Competition Card', 'Community Post Card', 'Team Explorer Card',
'Institution Card', 'Job Listing Card', 'Lost Found Card', 'Challenge Card',
'Survey Card', 'Stats Card', 'News Flash Card', 'Shopping Deal Card'

STATUS BADGE COLORS: Orange=Active Soon, Green Pulsing=Active Now, 
Gray=passed, Blue=interest, Red=emergency, Purple=recruiting

NAVIGATION EVENTS fired via: window.dispatchEvent(new CustomEvent('mizano-nav', { detail: {...} }))
Event types: panel-switch, overlay-open, overlay-close, page-push, page-pop, toast

SAFETY: window.MizanoSafety must exist before shell.js runs.
Minimum stub: { setUser: ()=>{}, checkAction: ()=>({ allowed: true }) }

MONETIZATION: Only 5% commission on sponsorships + P2.00 Lost&Found boost. No ads.

DATA PRIORITY: WhatsApp/Facebook deep links over internal heavy features.
Images: WebP only. Cards batch-render in groups of 20 (InfiniteScroll).
```

---

*Document generated by full file audit — March 2026*
