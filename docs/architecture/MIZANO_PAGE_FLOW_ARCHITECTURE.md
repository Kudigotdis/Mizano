# MIZANO PAGE FLOW ARCHITECTURE
**Navigation & Panel Connection Map**

---

## 🗺️ OVERVIEW

This document maps every page connection, panel expansion, and navigation path in Mizano. Use this to understand:
1. How users move between sections
2. Where collapsible panels appear
3. Which actions trigger which pages
4. Back navigation patterns

---

## 📍 ENTRY POINTS (Pre-Authentication)

```
[Splash Screen]
    ↓ (2 seconds auto)
[Login Page]
    ├─→ [About Us] (link at bottom)
    │     └─→ Back to [Login Page]
    │
    └─→ (After successful login) → [Homepage]
```

### Splash Screen
- **Duration:** 2 seconds
- **Content:** Mizano animated logo
- **Exit:** Auto-advances to Login

### Login Page
- **Fields:** Username, WhatsApp Number
- **Actions:**
  - Tap "About Us" → Opens About Us page
  - Submit credentials → Homepage (if registered)
  - Submit credentials → Onboarding Flow (if new user)

### About Us
- **Content:** Mission, team, contact
- **Navigation:** Back arrow → Login Page

---

## 🏠 CORE NAVIGATION HUB (Post-Authentication)

```
[Homepage] ←─┬─→ [Sports Page]
             ├─→ [Hobbies Page]
             ├─→ [Lessons Page]
             ├─→ [Leisure Page]
             ├─→ [Events Page]
             └─→ [Mine Page]
```

All core pages share:
- **Top Bar:** Horizontal carousel (swipe or tap to switch)
- **Bottom Menu:** 7 icons (Activity, Places, Home Menu, Search, +, Notifications, Hamburger)
- **Back Navigation:** Android back button returns to Homepage

---

## 🔄 HOMEPAGE INTERACTION MAP

```
[Homepage - Top Bar]
    │
    ├─→ [Mizano Logo Tap] → [Settings Menu] (full-screen overlay)
    │
    └─→ [Horizontal Carousel Swipe/Tap] → Switch to different main page

[Homepage - Places Filter Bar]
    │
    └─→ [Tap "GC · Area/Neighbourhood"] → [Location Selector Dropdown]
            ↓
        [Select Location] → Updates Drop Field content

[Homepage - Drop Field]
    │
    ├─→ [Tap Match Card] → [Activity Detail Page]
    ├─→ [Tap Registration Card] → [Registration Form Page]
    ├─→ [Tap News Flash Card] → [Article/News Detail Page]
    ├─→ [Tap Poll Card] → Submit vote inline (no navigation)
    ├─→ [Tap Lesson Card] → [Lesson Detail Page]
    │
    └─→ [Swipe Left on Card] → Add to Favorites (star icon)
        [Swipe Right on Card] → Ignore/Remove from timeline

[Homepage - Bottom Menu]
    │
    ├─→ [Activity Icon] → Expand [Level B: Activity Filter]
    │        ├─→ [Tap Activity Button] → Expand sport list dropdown
    │        │       └─→ [Select Sport] → Collapse, update Drop Field
    │        │
    │        └─→ [Tap Clock Icon] → Expand [Level C: Time Filter]
    │                ├─→ [Select Time Range] → Update Drop Field
    │                └─→ [Tap outside] → Collapse Level C
    │
    ├─→ [Places Icon] → Expand [Level B: Places Filter Panel]
    │        └─→ [Tap Calendar Icon] → Expand [Level D: Date Filter]
    │                ├─→ [Select Date] → Update Drop Field, collapse panel
    │                └─→ [Tap outside] → Collapse Level D
    │
    ├─→ [Home Menu Icon ☰] → [Navigation Menu Overlay]
    │        └─→ [Tap any menu item] → Navigate to page, close overlay
    │
    ├─→ [Search Icon] → [Search Interface] (replaces Drop Field)
    │        ├─→ [Type query] → Show auto-fill results
    │        ├─→ [Tap result] → Navigate to detail page
    │        └─→ [Tap Back] → Return to Homepage
    │
    ├─→ [+ Icon] → [Add Menu Overlay]
    │        ├─→ [Create Event/Match] → [Event Lab]
    │        ├─→ [Create Group/Club] → [Group Registration Flow]
    │        ├─→ [Add Business] → [Business Onboarding Flow]
    │        ├─→ [Add Venue] → [Venue Form]
    │        ├─→ [Post to Bulletin] → [Bulletin Editor]
    │        └─→ [Join Existing Group] → [Search Interface (Groups)]
    │
    ├─→ [Notifications Icon] → [Notifications Panel]
    │        ├─→ [Tap notification] → Navigate to relevant page
    │        ├─→ [Swipe Left] → Delete notification
    │        └─→ [Swipe Right] → Mark as read
    │
    └─→ [Hamburger Icon ≡] → [Alternative Navigation Menu]
            └─→ Same as Home Menu
```

---

## 📄 ACTIVITY DETAIL PAGE FLOW

```
[Any Drop Field Card Tap]
    ↓
[Activity Detail Page]
    │
    ├─→ [Back Arrow] → Return to previous page (Homepage/Search)
    │
    ├─→ [Share Button] → Native share sheet (WhatsApp/Facebook)
    │
    ├─→ [Favorite Star] → Toggle favorite (no navigation)
    │
    ├─→ [Tab: Details] (default)
    │      ├─→ [View on Map] → Opens map app with venue coordinates
    │      ├─→ [Get Directions] → Opens navigation app
    │      ├─→ [WhatsApp Organizer] → Opens WhatsApp with pre-filled message
    │      └─→ [Join Match] → [Registration Form] OR [Guardian Approval Request]
    │
    ├─→ [Tab: Roster]
    │      └─→ [Tap player name] → [Player Profile] (if public)
    │
    ├─→ [Tab: Streams]
    │      ├─→ [Watch Live - Facebook] → Opens Facebook app/browser
    │      └─→ [Watch - YouTube] → Opens YouTube app/browser
    │
    ├─→ [Tab: Sponsors]
    │      ├─→ [Become a Sponsor] → [Sponsorship Request Form]
    │      └─→ [Tap sponsor logo] → [Business Page]
    │
    └─→ [Tab: Updates]
           └─→ [Tap update item] → Expand inline (no navigation)
```

---

## ⚙️ SETTINGS MENU FLOW

```
[Mizano Logo Tap]
    ↓
[Settings Menu - Full Screen Overlay]
    │
    ├─→ [Account & Profile Section]
    │      ├─→ [Edit Profile] → [Edit Profile Form]
    │      │      └─→ [Save] → Return to Settings
    │      │
    │      ├─→ [Switch to Player] → [Player Upgrade Form]
    │      │      └─→ [Complete] → Return to Settings (Player badge added)
    │      │
    │      ├─→ [Become a Mentor] → [Mentor Onboarding Flow]
    │      │      └─→ [Complete] → Return to Settings
    │      │
    │      ├─→ [Guardian Dashboard] → [Guardian Dashboard Page]
    │      │      ├─→ [Add Child] → [Minor Profile Form]
    │      │      ├─→ [Pending Approvals] → [Approval Queue]
    │      │      └─→ [Security Log] → [Profile View Audit Trail]
    │      │
    │      └─→ [Delete Account] → [Confirmation Dialog]
    │             └─→ [Confirm] → [Login Page]
    │
    ├─→ [My Activity Hub Section]
    │      ├─→ [View Borrow History] → [Borrow History Page]
    │      ├─→ [My Wishlist] → [Wishlist Page]
    │      └─→ [Export Match History PDF] → Payment flow → Download
    │
    ├─→ [Navigation & Display Section]
    │      ├─→ [Drag Panel Order] → Reorder inline (no navigation)
    │      ├─→ [Default Location] → [Location Selector]
    │      └─→ [Dark Mode Toggle] → Apply theme (no navigation)
    │
    ├─→ [Data & Offline Sync Section]
    │      ├─→ [Update Map Tiles] → Download progress inline
    │      ├─→ [Sync Now] → Sync progress inline
    │      └─→ [Clear Cache] → Confirmation → Execute
    │
    ├─→ [Community & Safety Section]
    │      ├─→ [Gambling Toggle] → Warning dialog → Enable/Disable
    │      ├─→ [View Nearby Clinics] → [First-Aid Directory]
    │      └─→ [Report a Problem] → [Report Form]
    │
    └─→ [About & Legal Section]
           ├─→ [Terms of Service] → [Terms Page]
           ├─→ [Privacy Policy] → [Privacy Page]
           └─→ [WhatsApp Support] → Opens WhatsApp
```

---

## 🎯 EVENT LAB FLOW (Single-Page Application)

```
[+ Icon] → [Add Menu] → [Create Event/Match]
    ↓
[Event Lab - Single Page]
    │
    ├─→ [Sticky Header]
    │      ├─→ [Competition Title] → Inline edit (no navigation)
    │      ├─→ [Save Status] → Auto-save indicator
    │      └─→ [Publish Button] → [Confirmation] → [Activity Page (Public View)]
    │
    ├─→ [Section 1: Core Identity] (Expanded by default)
    │      ├─→ [Sport Dropdown] → Select sport
    │      │      └─→ Auto-expands [Section 2: Game Rules] with template
    │      │
    │      └─→ [▶ Event Context] → Expand/collapse inline
    │
    ├─→ [Section 2: Game Rules] (Auto-expands after sport selection)
    │      ├─→ [▶ Substitution Rules] → Expand inline
    │      ├─→ [▼ Position Matrix] → Collapse/expand inline
    │      │      └─→ [Edit positions] → Inline grid editor
    │      │
    │      └─→ [If "Other" sport selected] → [Custom Sport Wizard]
    │             ├─→ Step 1: Metric Definition
    │             ├─→ Step 2: Period Setup
    │             ├─→ Step 3: Scoreboard Layout
    │             └─→ Step 4: Save → Collapses wizard, populates rules
    │
    ├─→ [Section 3: Mizano Fund] (Collapsed, auto-expands if Entry Fee > 0)
    │      ├─→ [▼ Payment Channels] → Expand/collapse
    │      │      └─→ [Generate QR Code] → Creates QR inline
    │      │
    │      └─→ [▶ Goal Tracker] → Expand/collapse
    │             └─→ Shows progress bar inline
    │
    ├─→ [Section 4: Recruitment] (Collapsed)
    │      ├─→ [▼ Equipment Wishlist] → Expand/collapse
    │      │      └─→ [+ Add Item] → Inline input field
    │      │
    │      └─→ [▶ Call-Out Templates] → Expand/collapse
    │             └─→ [Edit template] → Inline text editor
    │
    ├─→ [Section 5: Format & Fixtures] (Collapsed)
    │      ├─→ [Select Format] → Dropdown inline
    │      ├─→ [▼ Fixture Builder] → Expand/collapse
    │      │      ├─→ [+ Add Round] → Inline round card
    │      │      └─→ [Drag matches] → Reorder inline
    │      │
    │      └─→ [▶ Tie-Breaker Hierarchy] → Expand/collapse
    │             └─→ [Drag rules] → Reorder inline
    │
    ├─→ [Section 6: Publish & Export] (Collapsed)
    │      ├─→ [▼ Poster Generator] → Expand/collapse
    │      │      ├─→ [Share to WhatsApp] → Opens WhatsApp
    │      │      └─→ [Download PNG] → Downloads file
    │      │
    │      ├─→ [▼ Live Score Link] → Expand/collapse
    │      │      └─→ [Generate QR] → Creates QR inline
    │      │
    │      ├─→ [▶ Scorecard Template] → Expand/collapse
    │      └─→ [▶ Social Media Kit] → Expand/collapse
    │             └─→ [Generate Kit] → Downloads ZIP
    │
    └─→ [Floating Action Menu ⚡]
           ├─→ [Clone Competition] → Creates duplicate draft
           ├─→ [Preview] → [Preview Overlay] (read-only Activity Page)
           ├─→ [Archive] → Moves to archive (no navigation)
           └─→ [Delete] → [Confirmation Dialog] → [Homepage]
```

---

## 🔍 SEARCH INTERFACE FLOW

```
[Search Icon in Bottom Menu]
    ↓
[Search Interface] (Replaces Drop Field)
    │
    ├─→ [Places Filter Bar] → Still functional at top
    │      └─→ [Select Location] → Filters search results
    │
    ├─→ [Search Field]
    │      ├─→ [Type query] → Auto-fill suggestions appear
    │      ├─→ [Tap suggestion] → Executes search
    │      └─→ [Tap recent search] → Executes search
    │
    ├─→ [Search Results]
    │      ├─→ [Matches Category] → Shows match cards
    │      ├─→ [Lessons Category] → Shows lesson cards
    │      ├─→ [Clubs Category] → Shows club cards
    │      ├─→ [Venues Category] → Shows venue cards
    │      └─→ [People Category] → Shows player profiles
    │
    ├─→ [Tap any result card] → Navigate to detail page
    │
    └─→ [Back Arrow] → Return to Homepage (restores Drop Field)
```

---

## 👤 PROFILE PAGE FLOWS

### User Profile
```
[Mine Page] OR [Player Name Tap]
    ↓
[User/Player Profile]
    │
    ├─→ [Edit Profile Button] → [Edit Profile Form]
    │      └─→ [Save] → Return to Profile
    │
    ├─→ [View Match History] → [Match History Page]
    │
    ├─→ [View Borrow History] → [Borrow History Page]
    │
    └─→ [If Player Profile]
           ├─→ [Sports CV Tab] → Shows stats inline
           ├─→ [Medical Tab] → [Medical Records] (local storage only)
           └─→ [Equipment Tab] → [Equipment Ownership List]
```

### Guardian Dashboard
```
[Settings] → [Guardian Dashboard]
    ↓
[Guardian Dashboard]
    │
    ├─→ [Linked Minors Section]
    │      └─→ [Tap child card] → [Minor Profile View]
    │             ├─→ [Edit Profile] → [Minor Edit Form]
    │             └─→ [View Activities] → [Child Activity Feed]
    │
    ├─→ [Pending Approvals Tab]
    │      └─→ [Tap approval request]
    │             ├─→ [Approve] → Sends confirmation, removes from queue
    │             └─→ [Decline] → Sends notification, removes from queue
    │
    ├─→ [Activity History Tab]
    │      └─→ [Tap activity] → [Activity Detail Page]
    │
    └─→ [Security Log Tab]
           └─→ Shows audit trail (view-only)
```

### Creator Dashboard
```
[Mine Page] → [Creator View]
    ↓
[Creator Dashboard]
    │
    ├─→ [My Events Section]
    │      └─→ [Tap event card] → [Event Lab] (edit mode)
    │
    ├─→ [Analytics Section]
    │      └─→ [View detailed stats] → Expands inline
    │
    └─→ [Sponsorship Requests]
           └─→ [Tap request] → [Request Detail] → [Accept/Decline]
```

---

## 🏢 ENTITY PAGE FLOWS

### Group/Club Page
```
[Search Result] OR [Activity Detail - Organizer Tap]
    ↓
[Group/Club Page]
    │
    ├─→ [About Tab] → Club info, history
    ├─→ [Roster Tab] → Member list
    ├─→ [Events Tab] → Upcoming matches/activities
    ├─→ [Sponsors Tab] → Sponsor logos/info
    │
    ├─→ [Join Club Button] → [Join Request Form]
    │      └─→ [If U16] → [Guardian Approval Required]
    │
    └─→ [WhatsApp Group Button] → Opens WhatsApp (if approved member)
```

### Business Page
```
[Search Result] OR [Sponsor Tap]
    ↓
[Business Page]
    │
    ├─→ [Services Tab] → Service listings
    ├─→ [Reviews Tab] → Customer reviews
    ├─→ [Location Tab] → Map + directions
    │
    ├─→ [WhatsApp Contact] → Opens WhatsApp
    ├─→ [Facebook Page] → Opens Facebook
    │
    └─→ [Quick Apply] → [Application Form]
           └─→ [Submit] → Sends to business via WhatsApp
```

### School Page
```
[Search Result]
    ↓
[School Page]
    │
    ├─→ [Classes Tab] → Class listings
    ├─→ [Teams Tab] → School sports teams
    ├─→ [Competitions Tab] → School leagues
    │
    ├─→ [If Teacher Profile] → Can edit content
    │
    └─→ [If Student Profile] → View-only access
```

---

## 📝 REGISTRATION & ONBOARDING FLOWS

### Player Upgrade
```
[Settings] → [Switch to Player]
    ↓
[Player Onboarding - Step 1: Sports Selection]
    ↓ (Next)
[Step 2: Body & Fitness]
    ├─→ [+ Medical History] → Expand form section
    └─→ [+ Equipment Ownership] → Expand list input
    ↓ (Next)
[Step 3: Availability]
    ↓ (Complete)
[Player Profile Active] → Return to Settings
```

### Mentor Registration
```
[Settings] → [Become a Mentor]
    ↓
[Mentor Onboarding - Step 1: Mentorship Areas]
    ↓ (Next)
[Step 2: Experience & Availability]
    ↓ (Next)
[Step 3: Credentials] (Optional)
    ↓ (Next)
[Step 4: Discovery Settings]
    ↓ (Complete)
[Mentor Profile Active] → Return to Settings
```

### Guardian Setup
```
[Settings] → [Become a Guardian]
    ↓
[Guardian Onboarding - Step 1: Guardian Details]
    ↓ (Next)
[Step 2: Link Minor]
    ├─→ [Create New Minor Profile] → [Minor Form]
    └─→ [Link Existing User] → [Search Users]
    ↓ (Complete)
[Guardian Dashboard Active] → Return to Settings
```

### Group/Club Registration
```
[+ Icon] → [Create Group/Club]
    ↓
[Group Registration - Step 1: Entity Type]
    ↓ (Next)
[Step 2: Basic Information]
    ├─→ [Upload Logo] → File picker
    └─→ [+ Social Links] → Expand input fields
    ↓ (Next)
[Step 3: Location & Venue]
    ↓ (Next)
[Step 4: Roster Setup] (Optional)
    ↓ (Complete)
[Group Page Created] → Navigate to [Group Page (Admin View)]
```

---

## 🔔 NOTIFICATION PANEL FLOW

```
[Notification Icon] (Badge shows count)
    ↓
[Notifications Panel - Slide Up]
    │
    ├─→ [Tap notification card]
    │      ├─→ [Join Request] → [Activity Detail Page]
    │      ├─→ [Match Starting] → [Live Score Page]
    │      ├─→ [Equipment Available] → [Equipment Ledger]
    │      ├─→ [Sponsorship Received] → [Event Lab]
    │      ├─→ [Borrow Due] → [Borrow History]
    │      └─→ [Score Update] → [Activity Detail Page - Updates Tab]
    │
    ├─→ [Swipe Left] → Delete notification (inline)
    │
    ├─→ [Swipe Right] → Mark as read (inline)
    │
    └─→ [Tap outside panel] → Close panel
```

---

## 🎲 SPECIAL FEATURE FLOWS

### Equipment Ledger (Borrow/Return)
```
[Activity Detail] → [Join Match] → [Equipment Needed?]
    ↓ (Yes)
[Equipment Ledger - Borrow Request]
    ├─→ [Select Items] → Multi-select checkboxes
    ├─→ [Borrow Score Check] → Shows current score
    ├─→ [Submit Request] → [Guardian Approval if U16]
    │
    └─→ [If Approved] → [Bluetooth Pairing with Game Cube]
           ├─→ [Scan QR Code] → Links device to transaction
           └─→ [Receive Items] → Updates ledger locally
                  ↓
           [Post-Match Return]
                  ├─→ [Scan QR Code] → Verifies return
                  ├─→ [Rate Borrower] → 1-5 stars
                  └─→ [Update Borrow Score] → Calculates new average
```

### Lost & Found
```
[+ Icon] → [Add Menu] → [Post to Bulletin]
    ↓
[Bulletin Editor]
    ├─→ [Select Category: Lost & Found]
    ├─→ [Upload Photo] → WebP compression
    ├─→ [Description] → Text area (200 chars)
    ├─→ [Location Found] → Map selector
    │
    └─→ [Post] → [Bulletin Feed]
           └─→ [If claimed] → P2.00 "Boost" notification to poster
```

### Sponsorship Request
```
[Event Lab] OR [Activity Detail] → [Sponsors Tab]
    ↓
[Become a Sponsor Button]
    ↓
[Sponsorship Request Form]
    ├─→ [Select Tier] → Title / Equipment / Community
    ├─→ [Amount] → Number input (min based on tier)
    ├─→ [Business Name] → Auto-complete from Business profiles
    │
    └─→ [Submit] → [Creator Notification]
           ├─→ [Creator Accepts] → Sponsor added to Activity Page
           └─→ [Creator Declines] → Notification sent
```

---

## 🔙 BACK NAVIGATION PATTERNS

### Android Back Button Behavior
```
[Any Page]
    ├─→ If overlay/panel open → Close overlay/panel (stay on page)
    ├─→ If at Homepage → Exit app (confirmation dialog)
    ├─→ If at sub-page → Return to previous page
    └─→ If in multi-step form → Return to previous step (with save prompt)
```

### Custom Back Arrow (Top-Left)
```
[Activity Detail Page] → Back Arrow → [Drop Field Page (last position)]
[Event Lab] → Back Arrow → [Confirmation if unsaved] → [Homepage]
[Settings] → Back Arrow → [Homepage]
[Search Results] → Back Arrow → [Restore previous Drop Field view]
```

---

## 🎯 GUARDIAN APPROVAL WORKFLOW

```
[U16 User Attempts Competitive Join]
    ↓
[Guardian Approval Required Screen]
    ├─→ [Send Request Button]
    │      ↓
    │   [Notification to Guardian]
    │      ↓
    │   [Guardian Dashboard - Pending Approvals]
    │      ├─→ [Tap Request]
    │      │      ├─→ [View Activity Details]
    │      │      ├─→ [Approve] → [Confirmation] → [Notify Child]
    │      │      │                                   ↓
    │      │      │                            [Join Confirmed]
    │      │      │                                   ↓
    │      │      │                        [WhatsApp Group Invite]
    │      │      │
    │      │      └─→ [Decline] → [Reason] → [Notify Child]
    │      │
    │      └─→ [Auto-log Security Entry]
    │
    └─→ [Child Sees "Awaiting Guardian Approval" Badge]
```

---

## 💾 OFFLINE → ONLINE SYNC FLOW

```
[User Acts While Offline]
    ↓
[Action Saved to IndexedDB Sync Queue]
    │
    ├─→ [Create Event] → Draft saved locally
    ├─→ [Join Match] → Request queued
    ├─→ [Edit Profile] → Changes queued
    └─→ [Borrow Equipment] → Transaction queued
    ↓
[Device Comes Online]
    ↓
[Auto-Sync Triggers (Every 15 min)] OR [Manual Sync Button]
    ↓
[Sync Queue Processes]
    │
    ├─→ [Success] → Remove from queue, update UI
    ├─→ [Conflict] → [Conflict Resolution Dialog]
    │      ├─→ [Keep Server Version]
    │      ├─→ [Keep Local Version]
    │      └─→ [Merge Changes]
    │
    └─→ [Failure] → Retry (max 3x), then notify user
```

---

## 📊 PAGE HIERARCHY SUMMARY

### Level 0: Entry
- Splash Screen
- Login Page
- About Us

### Level 1: Main Navigation (Horizontal Carousel)
- Homepage
- Sports Page
- Hobbies Page
- Lessons Page
- Leisure Page
- Events Page
- Groups Page
- Discover Page
- Mine Page
- Community Page
- Leaderboard Page
- Shopping Page
- Shops Page
- Businesses Page
- Schools Page
- Venues Page
- **Goals Dashboard (Tracker)**

### Level 2: Detail Pages (Accessed from Level 1)
- Activity Detail Page
- User/Player Profile
- Group/Club Page
- Business Page
- Association Page
- School Page
- Venue Page
- **Goal Detail Page**

### Level 3: Forms & Editors (Accessed from Level 2 or Bottom Menu)
- Event Lab
- Registration Form
- Bulletin Editor
- Venue Form
- Business Onboarding
- Sponsorship Request Form
- **Goal Builder**

### Level 4: Sub-Detail Pages
- Live Score Page
- Match History
- Borrow History
- Security Log (Guardian)
- Equipment Ledger

### Overlays (Any Level)
- Settings Menu
- Search Interface
- Notifications Panel
- Add Menu
- Navigation Menu
- Confirmation Dialogs

---

## 🧭 NAVIGATION BEST PRACTICES

### Consistent Patterns
1. **Top-Left:** Always back navigation (arrow or logo)
2. **Top-Right:** Always contextual actions (share, favorite, edit)
3. **Bottom:** Always global navigation (Bottom Menu Bar)

### Panel Behavior
- **Expand Up:** All filter panels (Activity, Places, Date)
- **Expand Down:** All content sections (Event Lab cards)
- **Slide Up:** Notifications, modals
- **Full Screen:** Settings, Search, Add Menu

### State Preservation
- **Homepage:** Remembers scroll position, filter state
- **Search:** Saves recent searches (max 10)
- **Event Lab:** Auto-saves every 30 seconds
- **Forms:** Prompts to save if navigating away

### Error Recovery
- **Network Failure:** Show offline banner, queue actions
- **Form Validation:** Inline errors, prevent navigation until fixed
- **Delete Actions:** Always require confirmation
- **Guardian Approval:** Clear messaging on blocked actions

---

**END OF PAGE FLOW ARCHITECTURE**

*This document complements the MIZANO_DESIGN_GUIDE.md and should be used by developers to implement navigation logic, URL routing (if applicable), and state management.*

**Document Version:** 1.5  
**Last Updated:** 15 February 2026  
**Cross-Reference:** MIZANO_DESIGN_GUIDE.md, EVENT_LAB_ARCHITECTURE_SPECS.md
