MIZANO_SETTINGS_MENU_STRUCTURE.md

# MIZANO SETTINGS MENU STRUCTURE
**Version 2.5 | February 2026**  
*Comprehensive reference for settings interface, permissions, and UI specifications*

---

## 📌 OVERVIEW

The Settings Menu in Mizano is a **full‑screen overlay** accessed by tapping the Mizano logo (blue owl icon) in the top‑left corner of any main page. It provides users with complete control over their profile, activity tracking, display preferences, offline data management, safety settings, and legal information.

All settings are organised into **six collapsible sections** (`+/-` toggle at the section header), consistent with the **2D flat design** and **offline‑first** philosophy. Every change is saved locally immediately and synced to the server when connectivity is available (auto‑sync every 15 minutes or via manual sync).

For navigation context, see the [MIZANO_PAGE_FLOW_ARCHITECTURE](./MIZANO_PAGE_FLOW_ARCHITECTURE.md) document.

---

## 🔧 SETTINGS MENU STRUCTURE

The table below lists every setting item grouped under its parent section.  
All settings respect the **profile‑based visibility** defined in the *Profile Permissions* matrix (see Section 2).  
Backend columns refer to the master data schema described in [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md).

| Section | Item Name | Type | Default | Options / Range | Description | Profile Visibility | Backend Column | Notes / UI Behaviour |
|---------|-----------|------|---------|------------------|-------------|--------------------|----------------|----------------------|
| **Account & Profile** | | | | | | | | |
| | Full Name | Text Input | – | – | User's full legal name | All | FullName | Required field; saved on blur |
| | Village/Town/City | Dropdown | Gaborone | All Botswana cities/villages | Primary location for activity filtering | All | LocationCity | Cascades to Area dropdown |
| | Area/Neighbourhood | Dropdown | All | Depends on selected city | Specific neighbourhood within city | All | LocationArea | Updates instantly when city changes |
| | WhatsApp Number | Phone Input | – | +267 format | For wa.me deep links and notifications | All | WhatsAppNumber (AS) | International format enforced |
| | Facebook Page Link | URL Input | – | facebook.com/... | Optional link to personal/business page | Business, Association | FBPageLink (AT) | Verification badge if linked |
| | Sports CV | View/Export | – | – | Auto‑generated from activity history | Player, Student | – | Tap to view; export for P10 fee |
| | School Info | Display Only | – | – | Linked school name and grade | Student | SchoolID (AM), GradeYear (AN) | Populated by school upload |
| | Health Logs | Form (+/-) | – | – | Allergies, conditions, emergency contact | Player, Student | HealthNotes (BD) | Guardian‑editable for minors; stored device‑only |
| | Fitness Levels | Display Only | – | – | Auto‑calculated from activity participation | Player, Student | – | Updates after each match |
| | Achievements | Display Only | – | – | Trophies, certifications, records | Player, Student | – | Manually added by Creators |
| | Linked Minors | List View | – | – | All children under Guardian’s oversight | Guardian only | LinkedMinors (AX) | Tap child to manage (edit, view activity) |
| | Pending Approvals | Action List | – | – | Activity join requests awaiting approval | Guardian only | – | One‑tap Approve/Deny; triggers WhatsApp invite on approve |
| | Activity Monitor | Calendar View | – | – | Upcoming 7 days of approved activities | Guardian only | – | Shows date, time, location, organiser |
| | Health & Safety Log | History List | – | – | Injury reports, equipment borrows, incidents | Guardian only | InjuryLog (BF) | Last 30 days displayed |
| | Academic Alert Toggle | Switch | OFF | ON/OFF | Pause competitive activities for low grades | Guardian only | AcademicAlert (AZ) | Shows alert badge on child’s profile |
| | Security Log | Audit Trail | – | – | Every profile view of minor by scouts/orgs | Guardian only | ProfileViewLog (BE) | Export as text file |
| | Become a Mentor | Text Button | – | – | Opens Mentor sign‑up form | User, Player | – | Upgrade to Mentor profile |
| | Become a Creator | Text Button | – | – | Opens Creator sign‑up form | User, Player, Mentor | – | Upgrade to Creator profile |
| | Register Business | Text Button | – | – | Opens Business registration form | User, Player | – | Paid profile (free in villages) |
| | Delete Account | Danger Button | – | – | Removes all data within 7 days | All (except Guardian with linked minors) | – | Requires confirmation prompt; blocks if critical sync pending |
| **My Activity Hub** | | | | | | | | |
| | Current Borrow Score | Display Only | 5.0 | 1.0‑5.0 stars | Average rating from equipment returns | Player, User (if borrowed) | – | Dual‑rating system (borrower + lender) |
| | Borrow History | List View | – | – | All equipment check‑outs/check‑ins | Player, User | – | Shows item, date, condition rating |
| | Restrictions | Alert Display | – | – | Appears if Borrow Score <3.0 | Player, User | – | Staff override required to borrow |
| | Favorited Activities | Grid View | – | – | Gold‑starred events and matches | All | – | Tap star to unfavorite |
| | Equipment Wishlist | List View | – | – | Items flagged as ‘want to borrow’ | Player, User | – | Notifications when available |
| | Past Activities | List View | – | – | Last 90 days of joined events | Player, Creator | – | Shows date, type, location, stats |
| | Export PDF (Sports CV) | Button | – | – | Download Sports CV as branded PDF | Player, Student | – | P10 fee; uses MTN/Orange Money |
| | Stats Summary | Display Only | – | – | Total matches, goals, wins, etc. | Player, Student | – | Auto‑calculated from history |
| | Given Sponsorships | List View | – | – | Funds/equipment donated via Sponsor‑a‑Game | All | – | Shows recipient, amount, date |
| | Received Sponsorships | List View | – | – | Sponsorships for your team/club/event | Creator, Group | – | Shows donor, amount, date |
| | Total Given | Display Only | P0.00 | – | Lifetime donations through Mizano | All | – | Excludes Mizano 5% commission |
| **Navigation & Display** | | | | | | | | |
| | Panel Order | Drag‑to‑Reorder List | Default order | 15 panels | Change horizontal swipe sequence | All | – | Saves to user preferences |
| | Reset to Default | Text Button | – | – | Restores original swipe order (Home, Sports, Hobbies, Lessons, Leisure, Events, Mine) | All | – | Confirmation dialog before reset |
| | Default City | Dropdown | Gaborone | All Botswana cities/villages | Used in Super Search Level 1 filter | All | LocationCity | Same as Edit Profile location |
| | Default Area | Dropdown | All | Depends on selected city | Pre‑fills search area filter | All | LocationArea | – |
| | Dark Mode Toggle | Switch | OFF | ON/OFF | Reduces battery drain, easier on eyes | All | – | Phase 3 feature (Q3 2026) |
| **Data & Offline Sync** | | | | | | | | |
| | Download Status | Display Only | – | 0MB / 1MB | Shows if Gaborone map downloaded | All | – | 1MB covers ~200km² neighbourhoods |
| | Download Map | Button | – | – | Downloads static map for offline use | All | – | One‑time download; update quarterly |
| | Update Map | Button | – | – | Refreshes map tiles when online | All | – | Only if >90 days since last update |
| | Force Sync | Action Button | – | – | Immediately syncs queued data when online | All | – | Syncs: rosters, approvals, scores, ledger |
| | Last Synced | Display Only | – | DD/MM/YYYY HH:MM | Timestamp of most recent sync | All | – | Auto‑syncs every 15 minutes when online |
| | Pending Items | Display Only | 0 | Number | Count of items queued for upload | All | – | E.g., offline join requests, ratings |
| | Data Saver Toggle | Switch | OFF | ON/OFF | Text‑only icons, no images | All | – | For users with <100MB data/month |
| | WebP Images | Switch | ON | ON/OFF | Load low‑data WebP format (50‑100KB) | All | – | Turn OFF for text‑only (saves ~80% data) |
| | Cached Data Size | Display Only | 0MB | – | Storage used by app cache | All | – | Includes thumbnails, map tiles, rosters |
| | Clear Cache Button | Action Button | – | – | Frees phone storage by deleting cache | All | – | Does not delete user data or settings; warns about map re‑download |
| **Community & Safety** | | | | | | | | |
| | Gambling Content Toggle | Hard Switch | OFF | ON/OFF | MUST opt‑in to see betting‑related content | All | – | Critical: defaults OFF; flagged content hidden |
| | Educational Materials | Link List | – | – | Appears only if toggle ON | All | – | Addiction resources, Gambling Authority info |
| | Discoverable Toggle | Switch | OFF | ON/OFF | Allow Creators to invite you for coaching | Mentor only | – | Shows in Creator’s Mentor search tally |
| | Demographics | Display Only | – | – | Your age, location, sports (for Creator planning) | Mentor only | – | Aggregate data, no personal info shared |
| | Nearest Clinic | Action Button | – | – | Opens list of clinics near your area | All | – | Based on LocationArea; text‑only (low‑data) |
| | On‑Site First Aiders | Action Button | – | – | Game Cube staff with first‑aid training | All | – | Shows name, location, WhatsApp contact |
| | Report Bug | Form Link | – | – | Submit app technical issues | All | – | Text form sent to Mizano Staff |
| | Report Content | Form Link | – | – | Flag inappropriate activities, users, posts | All | – | Reviewed by Staff within 24 hours |
| | Safety Concern | Form Link | – | – | Urgent safety issues (e.g., injured child) | All | – | Escalates to Admin immediately |
| **About & Legal** | | | | | | | | |
| | Mizano Story | Text View | – | – | Mission, vision, team info | All | – | Low‑data text‑only page |
| | Contact Us | Action Buttons | – | – | WhatsApp Support, Facebook Page links | All | – | wa.me and FB deep links (zero‑rated data) |
| | Terms Text | Scrollable View | – | – | Full legal terms and conditions | All | – | Required acceptance at registration |
| | Last Updated | Display Only | – | DD/MM/YYYY | Most recent TOS revision date | All | – | – |
| | Privacy Text | Scrollable View | – | – | Data handling, school/health data protection | All | – | Emphasises Guardian controls for minors |
| | GDPR Compliance | Display Only | – | – | Over‑complies despite Botswana light regs | All | – | Trust‑building measure |
| | App Version | Display Only | – | e.g., v1.2 | Current Mizano version number | All | – | Format: v[Major].[Minor] |
| | Edition | Display Only | – | Gaborone Edition | Regional build identifier | All | – | Future: Francistown, Maun editions |
| | Check for Updates | Action Button | – | – | Checks Google Play Store for new version | All | – | Android primary, iOS secondary |

---

## 👤 PROFILE PERMISSIONS MATRIX

The table below indicates which setting sections and actions are available to each profile type.  
`Yes` = full access, `No` = not visible/disabled, `Limited` = partial access (as described in notes).

| Profile Type | Access Account & Profile | Access Player Bio | Access Guardian Dashboard | Can Switch Profiles | Access Activity Hub | Access Sponsorships | Can Reorder Panels | Can Toggle Dark Mode | Offline Sync Available | Data Saver Mode | Gambling Opt‑In Available | Mentorship Visibility | First‑Aid Access | Can Report Issues |
|--------------|--------------------------|-------------------|---------------------------|---------------------|---------------------|---------------------|--------------------|----------------------|------------------------|-----------------|---------------------------|----------------------|-------------------|-------------------|
| Browser      | No                       | No                | No                        | No                  | No                  | No                  | No                 | No                   | No                     | Yes             | No                        | No                   | No                | No                |
| User         | Yes                      | No                | No                        | Yes                 | Yes                 | Yes (limited)       | Yes                | Yes                  | Yes                    | Yes             | Yes                       | No                   | Yes               | Yes               |
| Player       | Yes                      | Yes               | No                        | Yes                 | Yes                 | Yes (full)          | Yes                | Yes                  | Yes                    | Yes             | Yes                       | No                   | Yes               | Yes               |
| Mentor       | Yes                      | Yes (own)         | No                        | Yes                 | Yes                 | Yes                 | Yes                | Yes                  | Yes                    | Yes             | Yes                       | Yes                  | Yes               | Yes               |
| Guardian     | Yes                      | No (views minors) | Yes                       | No                  | Yes (limited)       | Yes (for children)  | Yes                | Yes                  | Yes                    | Yes             | No                        | No                   | Yes               | Yes               |
| Creator      | Yes                      | Yes (own)         | No                        | No                  | Yes                 | Yes (full)          | Yes                | Yes                  | Yes                    | Yes             | Yes                       | Yes                  | Yes               | Yes               |
| Group/Club   | Yes                      | No                | No                        | No                  | Yes (team)          | Yes (full)          | Yes                | Yes                  | Yes                    | Yes             | Yes                       | No                   | Yes               | Yes               |
| Business     | Yes                      | No                | No                        | No                  | Yes (limited)       | Yes (full)          | Yes                | Yes                  | Yes                    | Yes             | Yes                       | No                   | Yes               | Yes               |
| Association  | Yes                      | No                | No                        | No                  | Yes (limited)       | Yes (full)          | Yes                | Yes                  | Yes                    | Yes             | Yes                       | No                   | Yes               | Yes               |
| Staff        | Yes                      | Yes (all users)   | Yes (if managing minors)  | No                  | Yes (all users)     | Yes (monitoring)    | Yes                | Yes                  | Yes                    | Yes             | No                        | No                   | Yes               | Yes               |
| Admin        | Yes                      | Yes (all)         | Yes (all)                 | No                  | Yes (all)           | Yes (all)           | Yes                | Yes                  | Yes                    | Yes             | Yes                       | Yes                  | Yes               | Yes               |
| Student      | Yes                      | Yes               | No                        | No                  | Yes                 | Yes (limited)       | Yes                | Yes                  | Yes                    | Yes             | No                        | No                   | Yes               | Yes               |

---

## 🎨 UI COMPONENT SPECIFICATIONS

The following table details the visual and behavioural specifications for each type of setting control, consistent with the **MIZANO_DESIGN_GUIDE**.

| UI Element | Component Type | Dimensions | Colors / Icons | Behaviour | Offline Behaviour | Data Requirements | Implementation Notes |
|------------|----------------|------------|----------------|-----------|--------------------|--------------------|----------------------|
| Settings Access Button | Icon Button | 40×40px | Blue owl icon (vector, <30KB), white background | Tap opens Settings full‑screen overlay | Cached settings load instantly | None | Always accessible except during onboarding |
| Section Header (+/-) | Collapsible Toggle | Full width, 44px height | Grey background (#F5F5F5), bold text | Tap expands/collapses sub‑items | All sections stored locally | None | Only one top‑level expanded at a time |
| Text Input Field | Form Input | Full width minus 16px padding | White background, grey border, 14px Roboto | Keyboard opens on tap, validates on blur | Queues changes for sync | Depends on field | All edits saved to local DB first |
| Dropdown Selector | Native Picker | Full width | White background, chevron down icon | Opens OS‑native picker menu | Options loaded from cache | Dropdown options list | Cascading dropdowns (City → Area) load dynamically |
| Switch Toggle | Binary Control | Standard iOS/Android size | Grey (OFF), green (ON) | Instant state change on tap | State saved locally immediately | Boolean value only | Haptic feedback on toggle |
| Action Button (Primary) | Tappable Button | Full width, 50px height | Cherry orange (#FF6B35), white text | Tap triggers action; shows loading spinner if sync needed | Queues action if offline | Depends on action | Examples: Force Sync, Download Map, Delete Account |
| Action Button (Secondary) | Text Button | Inline, 44px touch target | Blue text (#007AFF), no background | Tap triggers navigation or form | Opens cached form/page | None | Examples: Become a Mentor, Reset to Default |
| Danger Button | Warning Action | Full width, 50px height | Red (#FF3B30), white text | Tap shows confirmation prompt first | Blocks if critical sync pending | Depends on action | Example: Delete Account requires ‘Are you sure?’ modal |
| Display‑Only Field | Read‑Only Text | Full width, left‑aligned | Black text, light grey background | No interaction, informational only | Displays cached value | Pre‑fetched data | Examples: Borrow Score, Last Synced timestamp |
| List View (Scrollable) | Vertical List | Full width, infinite scroll | White cards on grey background | Tap item opens detail view | Cached list loads first, syncs in background | Array of items | Examples: Borrow History, Match History |
| Guardian Security Log | Audit Trail List | Full width, grouped by date | White background, timestamp icons | Tap entry shows full details | Fully cached for 90 days | ProfileViewLog array (BE) | Export button at bottom (text file, no PDF) |
| PDF Export Button | Premium Action | Full width, 50px height | Gold background (#FFD700), white text | Tap triggers P10 payment flow → generates PDF | Blocked if offline (payment required) | Player stats data | Uses MTN/Orange Money |
| Notification Badge | Alert Indicator | 16px circle on icon | Red background, white number | Updates on sync; tap badge clears | Shows cached count | Pending approvals count | Only on Guardian Dashboard icon |
| Drag‑to‑Reorder List | Interactive List | Full width, drag handles on right | White cards, six‑line handle icon | Long‑press to activate drag mode | Saves order locally instantly | Panel order array | Reorder Swipe Panels feature |
| Hard Switch (Gambling) | Prominent Toggle | Full width row, 60px height | Yellow warning background, large switch | Requires confirmation modal: ‘Show betting content?’ | State saved locally, syncs on next online | Boolean (defaults OFF) | Critical: never auto‑enable; logs toggle in backend |
| Deep Link Button | External Action | Inline, WhatsApp/FB icon + text | Platform brand colors (green/blue) | Opens external app with pre‑filled message/URL | Works offline (launches intent) | wa.me URL or FB link | Examples: WhatsApp Support, View Facebook Page |
| Offline Map Download | Progress Indicator | Full width, circular progress | Blue progress bar, shows 0‑100% | Downloads in background, cancellable | Only works online (download initiates) | 1MB map file | One‑time download; stores in app cache |
| Clear Cache Confirmation | Modal Dialog | Center overlay, 80% width | White card, shadow overlay | Shows ‘Are you sure?’ with size info | No offline behaviour (cache IS offline) | Cached data size | Cannot be undone; warns about map re‑download |
| Version Check Button | Update Action | Full width, 50px height | Blue background, white text | Redirects to Google Play Store listing | Blocked if offline (requires internet) | None | Android: Play Store intent, iOS: App Store URL |

---

## 🔄 NAVIGATION & INTERACTION NOTES

- **Back Navigation:**  
  - Android back button: closes any open overlay (including Settings) or returns to previous page.  
  - Custom back arrow (top‑left) in Settings returns to the page from which Settings was opened.

- **Auto‑Save & Sync:**  
  - All changes are saved to `IndexedDB` / `LocalStorage` immediately.  
  - A cloud icon ☁️ in the status bar indicates sync pending; tapping it opens the **Data & Offline Sync** section.  
  - Manual sync can be triggered at any time; conflicts are resolved with a prompt (server wins by default).

- **Guardian Dashboard Specifics:**  
  - The Security Log (under Guardian Dashboard) records every view of a minor’s profile by any Creator, Association, or Scout.  
  - Academic Alert, when enabled, displays a red badge on the child’s profile and blocks competitive join requests until disabled.

- **Gambling Opt‑In:**  
  - The toggle is a “hard switch” with a warning modal.  
  - When OFF, all backend‑tagged gambling content (including sponsored ads) is hidden.  
  - Toggle state is synced and stored server‑side to ensure compliance across devices.

---

## ✅ DESIGN CHECKLIST FOR SETTINGS MENU

- [ ] All sections use `+/-` collapsible headers.  
- [ ] Every interactive element has a minimum touch target of 44×44px.  
- [ ] Colour contrasts meet WCAG AA standards (text on white ≥4.5:1).  
- [ ] Offline‑capable: all settings load from cache; changes queued.  
- [ ] Guardian‑specific sections are hidden from non‑Guardian profiles.  
- [ ] Gambling toggle defaults OFF and requires explicit confirmation.  
- [ ] Delete Account triggers a confirmation dialog and blocks if critical data pending sync.  
- [ ] Export actions (PDF) display a payment flow before generation.  
- [ ] All deep links use `wa.me` and Facebook URLs; no in‑app browsers for external content.  

---

**Document Version:** 2.0  
**Last Updated:** 15 February 2026  
**Cross‑Reference:** [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md), [MIZANO_DESIGN_GUIDE.md](./MIZANO_DESIGN_GUIDE.md), [MIZANO_PAGE_FLOW_ARCHITECTURE.md](./MIZANO_PAGE_FLOW_ARCHITECTURE.md)  
**Maintained By:** Mizano Product Team