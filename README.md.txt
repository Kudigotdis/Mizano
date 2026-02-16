README.md
# Mizano Master README
**Version 2.0 | February 2026**  
*Grassroots Sports & Community Platform – Botswana*

---

## I. Introduction

Mizano is a **community-first sports and activities platform** built specifically for Botswana’s grassroots ecosystem. It bridges the digital divide by prioritising **offline-first functionality**, **zero-data accessibility** (via WhatsApp/Facebook deep links), and **multi-generational safety** through Guardian controls. Mizano is not just an app – it’s a **National Talent Pipeline** connecting villages to national leagues, students to scholarships, and neighbours to community.

**Tagline:** *“Bringing the Community Together Through Human-to-Human Activities”*  
**Platform:** HTML5 Web App → Android APK (via Capacitor/Cordova)

---

### The Botswana Context: Why Mizano Exists

Mizano directly tackles the following local challenges:

| Problem | Mizano’s Solution |
|--------|-------------------|
| **Data Poverty** – Most Batswana rely on social bundles (WhatsApp/Facebook). | Text‑first design, WebP images (<200KB), no in‑app chat – all external communication via `wa.me` and Facebook deep links. |
| **Fragmented Communities** – No central place to discover local games, mentors, equipment, or venues. | 15‑panel side‑swipe navigation with location filters; neighbourhood‑level discovery (e.g., “GC · Block 3”). |
| **Youth Talent Gap** – Athletes lack visibility for scholarships. | Sports CV Builder, School Integration, National Leaderboard, and Recruitment Discovery fees for scouts. |
| **Offline Reality** – Intermittent connectivity in villages and Game Cubes. | **Offline‑first** architecture: IndexedDB stores all core data; 15‑minute sync pulses; Bluetooth peer‑to‑peer match sign‑ups. |
| **Safety for Minors** – No three‑way verification (Guardian‑School‑Platform). | **Guardian‑School Handshake** – Under‑16 users cannot join competitive activities without explicit Guardian approval and school verification. |
| **Equipment Access** – Informal borrowing leads to theft/damage. | Equipment Ledger with dual‑rating system and Borrow Score. |
| **Matchmaking Chaos** – Word‑of‑mouth with high no‑show rates. | Call‑Out cards (green border), real‑time roster sync, and WhatsApp group invites. |
| **Competition Organisation** – No simple tool for grassroots tournaments. | **Event Lab** – Single‑page competition builder with 7 template groups covering 115+ sports. |

> **Architect’s Note:** Every decision – from the 2D flat design to the 15‑minute sync – is driven by Botswana’s unique socio‑technical landscape. The platform is designed to work on 2GB RAM devices, with <500KB sync payloads and 1MB offline map tiles.

---

## II. Core Philosophy

Mizano rests on three pillars: **Low‑Data, High‑Trust, Offline‑Ready**.

### 1. Low‑Data
- **Text‑heavy UI** – Content is primarily text; images are WebP (<200KB) and optional.
- **External Communication** – No in‑app chat; all messaging via WhatsApp (`wa.me`) and Facebook (zero‑rated bundles).
- **Data Saver Mode** – Toggle off images entirely; icons remain vector (<30KB).

### 2. High‑Trust
- **Guardian‑School Handshake** – Mandatory for minors; every action logged.
- **Dual‑Rating System** – Both parties rate equipment returns, preventing bias.
- **Security Log** – Every profile view by a Creator/Association is recorded and visible to Guardians.
- **Betting Content Hidden by Default** – Opt‑in only; Mizano never facilitates gambling.

### 3. Offline‑Ready
- **100% Core Features Work Offline** – View activities, join matches, borrow equipment, post to Bulletin – all queued locally.
- **15‑Minute Sync** – Background sync when online; manual “Sync Now” in Settings.
- **Bluetooth Sign‑Ups** – Peer‑to‑peer match joins at Game Cubes without internet.

### Village‑First Philosophy (from Monetization Rules)
- All features are **free in rural villages** (population <15,000).  
- Monetisation focuses on **city subscriptions, transaction fees (5% commissions), and institutional data insights**.  
- **Waiver system** for non‑profit groups, businesses, associations, and government schools ensures that grassroots development is never hindered by cost.

> **Architect’s Note:** “Villages grow the user base; cities fund the platform.” This is a non‑negotiable ethical stance.

---

## III. Technical Stack & Coding Laws

### Platform & Environment
- **Frontend:** Pure HTML5, CSS3, Vanilla JavaScript (ES6) – **no React, Angular, or Vue**.  
- **Target Container:** Android WebView (via Capacitor or Cordova) → compiled to APK.  
- **Performance Target:** 60 FPS on devices with 2GB RAM.  
- **Offline Storage:** IndexedDB (complex data), LocalStorage (preferences).  
- **Backend:** Google Sheets API v4 (lightweight, accessible offline via sync queue).  
- **Authentication:** Firebase Auth (works offline, caches credentials).  

### Mandatory Coding Protocol (from `AGENT_CODING_PROTOCOL.md`)
- **No Heavy Frameworks** – All UI must be hand‑crafted with CSS3 transitions for smooth 60fps side‑swipe carousels.  
- **Hardware Acceleration** – Use `transform: translate3d()` for animations.  
- **Relative Paths** – All assets (CSS, JS, images, map tiles) must be stored in `/assets/` and referenced with relative paths (`./assets/...`).  
- **Mobile‑Responsive Viewport** – Every HTML file must include:  
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ```  
- **Intent‑First Communication** – Do not build internal chat; use standard anchor links for WhatsApp (`wa.me/+267...`) and Facebook deep links.  

### Local Asset Mapping
```
/assets/
  ├── css/                # Vanilla CSS files
  ├── js/                 # Vanilla JavaScript modules
  ├── images/             # WebP images (team logos, icons, etc.)
  ├── tiles/              # Offline map tiles (1MB Gaborone region)
  └── libs/               # Any third‑party libraries (must be local)
```
All asset references must use relative paths (e.g., `./assets/images/logo.webp`) to ensure the APK works offline.

---

## IV. Data Architecture & Sync Logic

### Hybrid Data Store
- **Local (Device):** IndexedDB holds all application data – activities, rosters, equipment ledger, bulletin posts, user profiles, and sync queue.  
- **Cloud (Master):** Google Sheets API v4 acts as the central authority, aggregating data from all devices.  
- **Medical Data:** Stored **only on the device** in a separate `medical_records` store with **no sync metadata**.  

### Sync Metadata (Every Synced Store)
| Field | Type | Description |
|-------|------|-------------|
| `local_id` | number | Auto‑increment primary key |
| `cloud_id` | string | Corresponding Google Sheets row ID (null if unsynced) |
| `last_modified` | timestamp | Local update time (milliseconds) |
| `sync_status` | string | `pending` \| `synced` \| `conflict` \| `error` |
| `sync_attempts` | number | Retry counter (max 3) |
| `created_at` | timestamp | Creation time |

### 15‑Minute Sync Pulse
- **Push before Pull** – Local changes are pushed first, then fresh data is pulled.  
- **Packet Size:** <500 KB per sync cycle (achieved via compact JSON keys – see *Short‑Key Documentation* below).  
- **Conflict Resolution:** Last‑write‑wins with a 5‑second tolerance; Staff override at Game Cubes for physical disputes.  

### Short‑Key Documentation (Data Efficiency)
To minimise sync payloads, all JSON fields use compact keys. Common mappings:

| Short Key | Meaning | Example Entity |
|-----------|---------|----------------|
| `uid` | User ID | `users` |
| `aid` | Activity ID | `activities` |
| `mid` | Match ID | `match_rosters` |
| `tid` | Team ID | `teams` |
| `pid` | Position ID | `positions` |
| `cb` | Centre Back | `recruitment.positions_needed` |
| `gs` | Goalkeeper | – |
| `baha` | “Bright Minds” Academic Alert | `academic_alert` |
| `ln` | Last Name | – |
| `fn` | First Name | – |
| `dob` | Date of Birth | – |
| `loc` | Location (village/town) | – |
| `vr` | Verified (business) | – |

All API requests and IndexedDB records use these keys to keep sync packets lean.

---

## V. Feature Inventory & Roadmap

### Core Feature Modules (with IDs)
| Feature ID | Name | Priority | Brief Description |
|------------|------|----------|-------------------|
| **NAV‑001** | Side‑Swipe Homepage Navigation | P0 | 15‑panel horizontal carousel (Home, Sports, Hobbies, Lessons, etc.) |
| **SEARCH‑001** | Super Search Field | P0 | 3‑level rising filter (Location → Type/Date → Advanced) |
| **ACTIVITY‑001** | Dynamic Activity Cards | P0 | 11 card types with 7‑color border system |
| **ACTIVITY‑011** | Activity Detail Page | P0 | Tabs: Details, Roster, Streams, Sponsors, Updates |
| **PROFILE‑002/3** | User & Player Profiles | P0 | Base identity + sports stats, health logs, Borrow Score |
| **PROFILE‑005** | Guardian Profile | P0 | Dashboard for minor approvals, AcademicAlert, Security Log |
| **OFFLINE‑001** | Equipment Ledger | P0 | Offline check‑in/out, dual ratings, Borrow Score |
| **OFFLINE‑005** | Bluetooth Match Sign‑Ups | P0 | Peer‑to‑peer joins at Game Cubes |
| **COMMS‑001** | WhatsApp Deep Links | P0 | `wa.me` buttons with PreFillMessage (Column AV) |
| **SPONSOR‑001** | Sponsor‑a‑Game | P1 | Fundraising with progress bars; 5% commission |
| **SCHOOL‑001** | School Integration | P1 | Three‑Way Handshake, bulk upload, inter‑house leagues |
| **MISC‑001** | Responsible Gambling Awareness | P1 | Hidden by default; opt‑in for educational content |

### Phased Roadmap
| Phase | Timeline | Key Milestones |
|-------|----------|----------------|
| **Q1 2026 – MVP Launch** | Jan–Mar 2026 | Gaborone‑only: 7 core panels, User/Player/Guardian profiles, offline match sign‑ups, equipment ledger, Event Lab Beta (3 template groups). |
| **Q2 2026 – Community Features** | Apr–Jun 2026 | Bulletin Feed, Lost & Found, Sponsor‑a‑Game, Team Call‑Outs, Facebook Live integration, Mentor/Creator upgrades, full Event Lab (7 groups, 115+ sports). |
| **Q3 2026 – School Integration** | Jul–Sep 2026 | Educational Institution profiles, Teacher/Coach sub‑profiles, Guardian‑School handshake, inter‑house leagues, National Leaderboard beta. |
| **Q4 2026 – National Expansion** | Oct–Dec 2026 | Full 15‑panel carousel, Business/Association paid profiles, venue booking, recruitment discovery fees, Sports CV PDF exports. |
| **2027 – Advanced Features** | Year 2 | Dark mode, referee rating system, Archive Library, incentivised spectator check‑ins, data analytics dashboard. |

---

## VI. Design System: The 7‑Color Status Engine

### Global Navigation
- **Top Bar (Fixed):** Mizano logo (opens Settings), horizontal carousel for 15 panels.  
- **Places Filter Bar:** `GC · Area/Neighbourhood` selector.  
- **Drop Field (Infinite Scroll):** Displays cards in a vertically scrolling feed.  
- **Bottom Menu (Fixed):** 7 icons – Activity Filter, Places Filter, Home Menu, Search, Add (+), Notifications, Hamburger. Auto‑hides after 3 seconds.

### The 7‑Color Card Border System (70% Opacity)
| Color | Hex | Meaning | Used For |
|-------|-----|---------|----------|
| **Orange** | `#FFA500` | Live Now | Standard Match Cards (pulsing border) |
| **Yellow** | `#FFD700` | Upcoming / Registration | Standard Match (upcoming), Registration‑State Cards |
| **Charcoal** | `#505050` | Finished / Archived | Standard Match (finished), Poll after voting |
| **Green** | `#70AD47` | Recruiting | Match‑Making Cards (call‑outs) |
| **Blue** | `#4472C4` | Interest / Learning | Lesson Cards, Training Progress Cards |
| **Pink** | `#FF69B4` | Engagement | Quick Poll/Vote Cards |
| **Light Blue** | `#87CEEB` | Ad / Official | News Flash Cards, Event Invite/Ad Cards |

**Card Types (11):**  
Standard Match, Registration‑State, Match‑Making, Training/Lesson Progress, Standard Lesson, News Flash, Quick Poll/Vote, Event Invite/Ad, Image Card (full‑bleed ad), Category Card (directory), Contact Card (business listing).

All cards are **2D flat** (no shadows, gradients) with white backgrounds, 8px border radius, and 2px colored borders at 70% opacity.

---

## VII. Safety, Security & The Three‑Way Handshake

Mizano’s safety protocols are non‑negotiable. Any user under 16 is subject to the **Guardian‑School‑Platform Handshake**.

### The Handshake Flow
1. **Guardian initiates** – Creates a Guardian profile, adds a minor with school name and health notes.  
2. **School verifies** – School Admin confirms enrollment and links to existing student record.  
3. **Guardian finalises** – Reviews combined data and activates the profile.

**Result:** A minor’s profile cannot join competitive activities without Guardian approval. All approvals and profile views are logged in the **Security Log**, visible to the Guardian.

### Guardian Dashboard
- **Linked Minors** – List with status badges.  
- **Pending Approvals** – Activity join requests, school event invitations.  
- **Activity Monitor** – Upcoming, live, and past activities with check‑in notifications.  
- **Health & Safety Log** – Injury reports, equipment borrows.  
- **AcademicAlert Toggle** – Pause activities when grades are low.  
- **Security Log** – Every profile view by Creators/Associations.  

### Communication Safeguards
- For minors under 16, any “WhatsApp Player” button routes to the **Guardian’s phone**.  
- Schools use **WhatsApp Broadcast Channels** (one‑way) to avoid exposing student numbers.  
- No in‑app messaging – all external communication is logged.

---

## VIII. Monetization: The “Non‑Sleazy” Model

Mizano generates revenue while keeping rural communities free.

| Revenue Stream | Who Pays | Mizano’s Cut | Village Waiver? |
|----------------|----------|--------------|-----------------|
| **Sponsorship Commissions** | Sponsors | 5% of monetary funds | No |
| **Venue Booking Fees** | Users | 5% (standard) / 10% (instant) | No |
| **Business Subscriptions** | City businesses | P100–200/month | Yes (if non‑profit in village) |
| **Data Insights** | Researchers/Govt | P5,000–50,000/report | N/A |
| **School Subscriptions** | Private city schools | P500/year | Yes (govt/rural schools) |
| **Micro‑Transactions** | Players | P2–10 (CV export, boost) | No |

### Village Waiver Verification
- **Eligibility:** Groups, businesses, associations, schools located in villages (population <15,000) and meeting non‑profit/service criteria.  
- **Process:** User submits proof (registration certificate, .gov email) → Admin reviews → If approved, subscription fees waived indefinitely.  
- **Auto‑waiver** for government schools and recognised community bodies.

All fees are displayed transparently before payment. Gateway fees (MTN Mobile Money, Orange Money, PayPal) are deducted before Mizano’s net revenue.

---

## IX. Deployment & APK Pipeline

### Building for Android
1. **Web App Development** – Write pure HTML/CSS/JS with relative asset paths.  
2. **Capacitor/Cordova Integration** – Wrap the web app into a native Android project.  
3. **Asset Placement** – All CSS, JS, images, and map tiles go into the `/assets/` directory.  
4. **Manifest & Permissions** – Ensure `AndroidManifest.xml` includes:
   - `INTERNET` (for sync)  
   - `ACCESS_NETWORK_STATE`  
   - `BLUETOOTH` (for peer‑to‑peer sign‑ups)  
   - `ACCESS_FINE_LOCATION` (optional for check‑in)  
5. **Offline Support** – Service worker caches app shell and syncs in background.

### Mandatory HTML Template
Every page must start with:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <link rel="stylesheet" href="./assets/css/main.css">
  <title>Mizano – Botswana Community Sports</title>
</head>
<body>
  <!-- App content -->
  <script src="./assets/js/main.js"></script>
</body>
</html>
```

### Performance Optimisation
- **CSS Hardware Acceleration** – Use `transform: translate3d(0,0,0)` for smooth side‑swipe.  
- **Lazy Loading** – Images load only when visible.  
- **Debounced Sync** – Background sync runs every 15 minutes; manual sync available.  

---

## X. Getting Started (for Developers)

1. **Clone the repository** – Ensure you have the latest `PROJECT_SUMMARY.md`, `MIZANO_DATA_SCHEMA.md`, etc.  
2. **Set up local environment** – Use any static server (e.g., `live-server`).  
3. **Follow the Coding Protocol** – Vanilla JS only; no frameworks.  
4. **Build the component library** – Start with the 11 card types, navigation bars, and Event Lab.  
5. **Implement offline storage** – IndexedDB with the schema defined in `MIZANO_DATA_SCHEMA.md`.  
6. **Integrate sync logic** – Use `setInterval` (or Workbox) for 15‑minute sync; implement push/pull with Google Sheets API.  
7. **Test offline scenarios** – Disable network, perform actions, then reconnect and verify sync.  
8. **Package for Android** – Run `npx cap add android` and `npx cap sync` to generate APK.

> **Architect’s Note:** All documentation is designed to be read in conjunction. The `PROJECT_SUMMARY.md` is the ultimate source of truth; if any conflict arises, that document overrides others.

---

## Document Control
| | |
|---|---|
| **Version** | 2.0 |
| **Last Updated** | February 14, 2026 |
| **Maintained By** | Mizano Technical Team |
| **Cross‑Reference** | [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md), [MIZANO_DATA_SCHEMA.md](./MIZANO_DATA_SCHEMA.md), [MIZANO_DESIGN_GUIDE.md](./MIZANO_DESIGN_GUIDE.md), [GUARDIAN_SAFETY_PROTOCOLS.md](./GUARDIAN_SAFETY_PROTOCOLS.md), [MIZANO_MONETIZATION_RULES_&_WAIVERS.md](./MIZANO_MONETIZATION_RULES_&_WAIVERS.md), [TECHNICAL_STACK_AND_APK_PIPELINE.md](./TECHNICAL_STACK_AND_APK_PIPELINE.md) |

---

**END OF MASTER README**

*This document serves as the single entry point for developers, investors, and partners. All implementation must adhere to the principles, architecture, and constraints defined herein.*