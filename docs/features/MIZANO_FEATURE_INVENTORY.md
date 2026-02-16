MIZANO_FEATURE_INVENTORY.md

# MIZANO FEATURE INVENTORY
**Version 2.5 – Aligned with Project Summary & Page Flow Architecture**  
*February 15, 2026*

This document consolidates every feature from `FEATURE_INVENTORY_CLEAN.xlsx` into a single, detailed markdown reference. It is designed to be used alongside the **[MIZANO PROJECT SUMMARY](./PROJECT_SUMMARY.md)** and **[MIZANO PAGE FLOW ARCHITECTURE](./MIZANO_PAGE_FLOW_ARCHITECTURE.md)** to ensure complete alignment between product vision, navigation, and technical specifications.

---

## 📑 Table of Contents
1. [Core Navigation & UX](#core-navigation--ux)
2. [Activity System](#activity-system)
3. [Profile System](#profile-system)
4. [Communications](#communications)
5. [Social & Streaming](#social--streaming)
6. [Offline Features](#offline-features)
7. [Guardian & School Safety](#guardian--school-safety)
8. [Community Features](#community-features)
9. [Sponsorship & Monetization](#sponsorship--monetization)
10. [Venue & Recruitment](#venue--recruitment)
11. [Settings & Miscellaneous](#settings--miscellaneous)
12. [Technical Specifications](#technical-specifications)
13. [Data Schema (Master Sheet)](#data-schema-master-sheet)
14. [Roadmap](#roadmap)

---

## Core Navigation & UX

| Feature ID | Feature Name | Category | Description | Priority | Profile Access | Data Impact | Offline Support | Dependencies | Notes |
|:-----------|:-------------|:---------|:------------|:---------|:---------------|:------------|:----------------|:-------------|:------|
| NAV-001 | Side-Swipe Homepage Navigation | Core Navigation | Horizontal carousel with 16 modular panels (Homepage > Sports > Hobbies > Leisure > Lessons > Events > Groups > Discover > Mine > Community > Leaderboard > Shopping > Shops > Businesses > Schools > Venues). Infinite horizontal scroll, position stays fixed while content scrolls through. Dark title for active panel, greyed-out adjacent titles. | P0 | All Profiles | Low | Full | None | 300ms slide animations, edge glow feedback, preload adjacent panels, cache scroll positions |
| NAV-002 | Pull-Down Panel Selector | Core Navigation | Tap empty space or pull down to reveal dropdown list of all 16 panel names for direct navigation | P0 | All Profiles | Minimal | Full | NAV-001 | Enhances accessibility for users who prefer list view |
| NAV-003 | Bottom-Left Toolbar (Persistent) | Core Navigation | Three-stripe menu button (opens Settings, Profile, Manager, Logout), vector search button, and "+" button (all same color) on white border. Available on ALL 16 panels. | P0 | All Profiles | Minimal | Full | NAV-001 | Core UI anchor point, Manager option added |
| NAV-004 | Top-Right Back Arrow | Core Navigation | Far right back arrow button for navigation hierarchy | P0 | All Profiles | Minimal | Full | NAV-001 | Standard navigation pattern |
| NAV-005 | Panel Reordering | Settings Feature | Users can drag-to-reorder the 16 swipe panels in Settings for personalized workflow | P2 | User+ | Minimal | Full | NAV-001, Settings Menu | Saves user preference to profile |
| SEARCH-001 | Super Search Field | Search & Filter | Search field rises from bottom on white background. Grey star (left, outside field) turns gold for Favorites. Light grey placeholder "Type..." inside field. "Filter" button on far right inside field. | P0 | All Profiles | Low | Partial | None | Keyboard appears on tap; closes when Level 1 filter tapped |
| SEARCH-002 | Level 1 Filters (Location) | Search & Filter | Auto-appears above keyboard: Village/Town/City (Gaborone default), Area/Neighbourhood (All default), Reset button (cherry orange, far right). Shows "# activities in [Location]" | P0 | All Profiles | Medium | Partial | SEARCH-001 | Background shows live filtered results |
| SEARCH-003 | Level 2 Filters (Type & Date) | Search & Filter | Appears when Level 1 tapped: Type (soccer, chess, volleyball), Date (month default, or week/weekend/calendar picker) | P0 | All Profiles | Medium | Partial | SEARCH-002 | Keyboard closes when revealed |
| SEARCH-004 | Level 3 Filters (Advanced) | Search & Filter | Pull up manually: Time, Price, Duration, Indoor/Outdoor, Group (family, kids), Has Streams, Has Call-Outs | P1 | All Profiles | Medium | Partial | SEARCH-003 | Most data-intensive filter level |
| SEARCH-005 | Active Filter Display | Search & Filter | Grey text/border changes to white text on colored button when filter activated | P0 | All Profiles | Minimal | Full | SEARCH-001 to SEARCH-004 | Visual feedback mechanism |
| SEARCH-006 | View Results Button | Search & Filter | Bottom button showing "View # Results" that opens full filtered results list | P0 | All Profiles | Low | Partial | SEARCH-001 to SEARCH-004 | Triggers navigation to results page |
| SEARCH-007 | Auto-Suggest | Search & Filter | Real-time suggestions as typing (e.g., "soccer in Block 3", "live streams in Gaborone") | P1 | All Profiles | Medium | Partial | SEARCH-001 | Requires cached common searches |
| SEARCH-008 | Zero-Result Handling | Search & Filter | White background with centered light grey text: "Askies. No results." | P0 | All Profiles | Minimal | Full | SEARCH-001 to SEARCH-004 | Friendly Botswana-specific messaging |
| SEARCH-009 | Favorites Toggle | Search & Filter | Grey star outside search field turns gold; tap to view saved/favorited items | P1 | User+ | Low | Full | SEARCH-001 | Saves to user profile |
| SEARCH-010 | Results Infinite Scroll | Search & Filter | Results display as infinite scroll list of Dynamic Activity Cards | P0 | All Profiles | Medium | Partial | SEARCH-006, ACTIVITY-001 | Optimized for mobile scrolling |
| UI-001 | +/- Category Toggle System | UI Pattern | Accordion-style progressive disclosure. All categories start collapsed with "+". Tap header to expand with "-" (smooth slide-down). Supports unlimited hierarchy (Top > Sub > Sub-sub). Only one top-level expands at a time. | P0 | All Profiles | Minimal | Full | None | Applied throughout: Search results, Profile editing, Event forms, Settings, Activity Pages, Dashboard |
| UI-002 | Minimalist Text-Heavy Design | UI Pattern | Text-focused interface with optional WebP images. Collapsible sections reduce clutter. No auto-play media. | P0 | All Profiles | Very Low | Full | None | Core data-efficiency strategy |
| UI-003 | Dark Mode Toggle | Settings Feature | Optional dark mode for battery saving and low-light viewing | P2 | All Profiles | Minimal | Full | Settings Menu | Saves preference to device |

---

## Activity System

| Feature ID | Feature Name | Category | Description | Priority | Profile Access | Data Impact | Offline Support | Dependencies | Notes |
|:-----------|:-------------|:---------|:------------|:---------|:---------------|:------------|:----------------|:-------------|:------|
| ACTIVITY-001 | Dynamic Activity Cards | Activity Display | Tappable cards with color-coded status badges for visual scanning. Displays on all activity panels and search results. | P0 | All Profiles | Low | Partial | None | Core content display unit |
| ACTIVITY-002 | Active Soon State | Activity Status | Orange badge with countdown (e.g., "Starts in 2hrs") for upcoming events needing prep or RSVPs | P0 | All Profiles | Low | Full | ACTIVITY-001 | Triggers notifications |
| ACTIVITY-003 | Active Now State | Activity Status | Green pulsing badge (e.g., "Live: Join Now") for ongoing activities with real-time participant count | P0 | All Profiles | Medium | Partial | ACTIVITY-001 | Syncs every 15min; supports livestream links |
| ACTIVITY-004 | Passed State | Activity Status | Gray badge (e.g., "Ended: View Recap") linking to summaries, photos, feedback forms | P0 | All Profiles | Low | Partial | ACTIVITY-001 | Builds community history |
| ACTIVITY-005 | Pending State | Activity Status | Yellow badge showing progress bars: "3/10 Participants Needed" or "P200/500 Funded". Awaiting resources to activate. | P0 | All Profiles | Low | Partial | ACTIVITY-001, SPONSOR-001 | Alternative names: Recruiting, Funding, Building, Prepping, Gathering |
| ACTIVITY-006 | Full State | Activity Status | Red badge (e.g., "Sold Out: Waitlist?") for maxed-out activities | P0 | All Profiles | Low | Full | ACTIVITY-001 | Encourages alternative discovery |
| ACTIVITY-007 | Cancelled State | Activity Status | Dark gray strikethrough (e.g., "Cancelled: Reason Provided") with notification redirects | P0 | All Profiles | Low | Partial | ACTIVITY-001, NOTIF-001 | Links to reschedules if available |
| ACTIVITY-008 | Proposed State | Activity Status | Light blue badge (e.g., "Idea Stage: Vote to Activate") for user-suggested activities needing upvotes | P1 | User+ | Low | Partial | ACTIVITY-001 | Community-driven activation |
| ACTIVITY-009 | Archived State | Activity Status | Faded badge (e.g., "Stored: Reactivate?") for dormant recurring events | P1 | Creator+ | Low | Full | ACTIVITY-001 | Allows revival by admins |
| ACTIVITY-010 | Exclusive State | Activity Status | Purple lock icon (e.g., "Invite-Only: Request Access") for private groups | P1 | All Profiles | Low | Full | ACTIVITY-001 | Fosters niche communities |
| ACTIVITY-011 | Activity Page Navigation | Activity Detail | Tap any Dynamic Activity Card to navigate to dedicated Activity Page for that event | P0 | All Profiles | Low | Partial | ACTIVITY-001 | Core navigation pattern |
| ACTIVITY-012 | Event Details Section | Activity Detail | +/- toggle showing: Type, date, time, duration, location (offline map), weather (outdoor) | P0 | All Profiles | Low | Partial | ACTIVITY-011, UI-001 | Uses accordion pattern |
| ACTIVITY-013 | Organizer Info Section | Activity Detail | +/- toggle showing: Name, WhatsApp button (wa.me deep link with PreFillMessage), Facebook page link | P0 | All Profiles | Low | Partial | ACTIVITY-011, COMMS-001, COMMS-002 | External communication priority |
| ACTIVITY-014 | Participants Roster | Activity Detail | +/- toggle showing current roster (syncs every 15min), call-outs for missing positions (e.g., "Need 1 Goalie") | P0 | All Profiles | Medium | Partial | ACTIVITY-011, OFFLINE-002 | Real-time but low-frequency sync |
| ACTIVITY-015 | Requirements Section | Activity Detail | +/- toggle showing: Equipment needed, cost, skill level | P0 | All Profiles | Low | Full | ACTIVITY-011 | Helps users prepare |
| ACTIVITY-016 | Streams & Media Section | Activity Detail | +/- toggle (if Creator enabled): Aggregated Facebook Live links, fan submissions, "Add Your Stream" button | P1 | All Profiles | Medium | No | ACTIVITY-011, SOCIAL-001 to SOCIAL-005 | Creator-controlled feature |
| ACTIVITY-017 | Sponsorship Progress | Activity Detail | If "Sponsor-a-Game" active, shows funding/equipment goals with progress bars | P1 | All Profiles | Low | Partial | ACTIVITY-011, SPONSOR-001 | Visual fundraising tracker |
| ACTIVITY-018 | Safety Notes Section | Activity Detail | +/- toggle showing: First-aid availability, Guardian approval status (for minors) | P0 | Guardian+ | Low | Full | ACTIVITY-011, GUARDIAN-001 | Critical for child safety |
| ACTIVITY-019 | Join/RSVP Button | Activity Action | Profile-dependent: Users = non-competitive only; Players = competitive too; Guardian approval required for U16 | P0 | User+ | Low | Partial | ACTIVITY-011, PROFILE-002, PROFILE-003, GUARDIAN-002 | Core participation action |
| ACTIVITY-020 | WhatsApp Organizer Button | Activity Action | Launches wa.me with custom PreFillMessage from Column AV | P0 | All Profiles | Minimal | No | ACTIVITY-011, COMMS-001 | Zero-data external chat |
| ACTIVITY-021 | Share to Facebook Button | Activity Action | Creates link back to Mizano for zero-data users | P1 | All Profiles | Low | No | ACTIVITY-011, COMMS-002 | Viral distribution via free data |
| ACTIVITY-022 | Add to Wishlist/Favorites | Activity Action | Gold star toggle to save activity | P1 | User+ | Minimal | Full | ACTIVITY-011, SEARCH-009 | Personal curation |
| ACTIVITY-023 | Report Button | Activity Action | Flags inappropriate content to Staff/Admin | P0 | All Profiles | Minimal | Partial | ACTIVITY-011, MODERATION-001 | Community safety |
| ACTIVITY-024 | Browser Profile Teaser | Activity Restriction | Unregistered users see teasers only with "Sign in to view more" prompts—no tap functionality | P0 | Browser | Minimal | Full | ACTIVITY-011, PROFILE-001 | Conversion funnel |

---

## Profile System

| Feature ID | Feature Name | Category | Description | Priority | Profile Access | Data Impact | Offline Support | Dependencies | Notes |
|:-----------|:-------------|:---------|:------------|:---------|:---------------|:------------|:----------------|:-------------|:------|
| PROFILE-001 | Browser Profile | Profile Type | Unregistered users. Swipe panels, view basic activity cards and directories, see teasers. Restricted to surface-level discovery. | P0 | Browser | Minimal | Full | None | Entry-level for conversion |
| PROFILE-002 | User Profile | Profile Type | Foundational free registered profile. Full swipe access, favorites, Bulletin Feed, job quick-applies, spectator check-ins, basic activity joining (non-competitive). | P0 | User | Low | Full | Firebase Auth | Base for all upgrades |
| PROFILE-003 | Player Profile | Profile Type | Free upgrade from User via Activities Form. Adds detailed history (health notes, allergies, stats, schooling, fitness, injuries, achievements, certifications). Targets for call-outs; maintains Borrow Score; competitive match joins. | P0 | Player | Medium | Partial | PROFILE-002 | Core participant identity |
| PROFILE-004 | Mentor Profile | Profile Type | Free upgrade from User/Player via sign-up form. Indexed in directories for Creator invites; guides sessions, views mentee tallies/demographics; receives targeted notifications. | P1 | Mentor | Low | Full | PROFILE-002 or PROFILE-003 | Community leadership role |
| PROFILE-005 | Guardian Profile | Profile Type | Free profile required for under-16 users. Creates/approves minor profiles, monitors activities via dashboard, approves joins/RSVP, receives injury alerts. | P0 | Guardian | Low | Partial | None | Child safety gatekeeper |
| PROFILE-006 | Creator Profile | Profile Type | Free upgrade from User/Player. Hosts matches/events/leagues; manages rosters, sends call-outs, initiates sponsorships. Toggles: streams, weather, venues. | P0 | Creator | Medium | Partial | PROFILE-002 or PROFILE-003 | Single event organizer |
| PROFILE-007 | Group/Club Profile | Profile Type | Paid (free in villages if non-profit) for teams/clubs. Admin manages rosters, wishlists, recurring events, shared histories/trophies, sponsorship pages. | P1 | Group/Club | Medium | Partial | Payment Gateway | Collective organizer |
| PROFILE-008 | Business Profile | Profile Type | Paid (waived in villages for non-profits) for service providers (clinics, physio). Lists in Businesses/Shops panels, links to FB/WhatsApp, sponsors events, responds to quick-applies. | P1 | Business | Low | Full | Payment Gateway | Commercial provider |
| PROFILE-009 | Association Profile | Profile Type | Paid (waived in villages for community bodies) for official entities (e.g., BFA). Posts News Flash, verifies tournaments, accesses player tallies for scouting, broadcasts updates. | P1 | Association | Medium | Partial | Payment Gateway | Institutional authority |
| PROFILE-010 | Staff Profile | Profile Type | Internal Mizano employees/volunteers. Manages offline ledgers (equipment check-in/out), verifies scores/ratings, moderates Bulletin/Lost & Found, handles first-aid directories. | P0 | Staff | Medium | Partial | Internal Auth | Game Cube manager |
| PROFILE-011 | Admin Profile | Profile Type | Internal (Mizano leadership). Full oversight: analytics, fee management (village waivers), system fixes, audit trails. | P0 | Admin | High | Full | Internal Auth | Platform architect |
| PROFILE-012 | Educational Institution Profile | Profile Type | Paid (free for rural/government schools) for schools. Manages national leagues, bulk student management, talent flagging. Sub-profiles: Teacher/Coach, Student (linked to Player). | P1 | Educational Institution | High | Partial | Payment Gateway, SCHOOL-001 | Talent pipeline hub |
| PROFILE-013 | Profile Upgrade Forms | Profile Action | User/Player can trigger upgrade forms to Mentor/Creator via Settings "Switch to..." text buttons | P1 | User+ | Minimal | Full | PROFILE-002, PROFILE-003 | Self-service role expansion |
| PROFILE-014 | Delete Account | Profile Action | Secure data removal option in Settings | P0 | All Profiles | Minimal | Partial | Settings Menu | GDPR-style compliance |

---

## Communications

| Feature ID | Feature Name | Category | Description | Priority | Profile Access | Data Impact | Offline Support | Dependencies | Notes |
|:-----------|:-------------|:---------|:------------|:---------|:---------------|:------------|:----------------|:-------------|:------|
| COMMS-001 | WhatsApp Deep Links (wa.me) | External Integration | Direct-to-Organizer buttons using wa.me with PreFillMessage from Column AV. Example: "Hello! I'm interested in the Soccer match in Block 3 at 4 PM via Mizano." | P0 | All Profiles | Minimal | No | None | Zero-data external chat. International format +267... stored in Column AS |
| COMMS-002 | Facebook Integration | External Integration | Event mirroring via "Share to Facebook" creates link back to Mizano. Zero-rated FB users see event and "Join" with one click. | P1 | All Profiles | Low | No | None | Viral distribution via free data bundles |
| COMMS-003 | Facebook Business Page Links | External Integration | Businesses/Associations link official FB Page (Column AT) for trust/verification | P1 | Business+ | Minimal | Full | PROFILE-008, PROFILE-009 | Leverages existing trust |
| COMMS-004 | WhatsApp Group Invite Hub | External Integration | Teams/Schools link WhatsApp Group URL (Column AU). On approval, users get prompt: "Join the Team WhatsApp Group here" | P1 | Group/Club+ | Minimal | No | PROFILE-007, SCHOOL-003 | Collective communication |
| COMMS-005 | Guardian Proxy for U16 | Safety Feature | For U16 Players, WhatsApp button routes to Guardian's phone (not child) | P0 | Guardian | Minimal | Full | PROFILE-005, GUARDIAN-001 | Child protection |
| COMMS-006 | Teacher-Led Broadcast Channels | School Safety | Schools use WhatsApp Broadcast Channels (not groups) for student communication to prevent peer visibility of numbers | P1 | Educational Institution | Minimal | No | PROFILE-012, SCHOOL-003 | Privacy-first school comms |
| NOTIF-001 | Persistent Notification Dropdown | In-App Alerts | Top-right bell icon (shows unread badge count) on ALL 15 swipe panels. Tap to drop down white panel (dismiss via swipe-down). | P0 | All Profiles | Low | Partial | None | Unified alert center |
| NOTIF-002 | Call-Out Notifications | Alert Type | "Block 3 needs a Goalie at the Hub right now!" Listed in dropdown. | P0 | Player+ | Low | Partial | NOTIF-001, COMMUNITY-002 | Urgent participation needs |
| NOTIF-003 | Activity Update Notifications | Alert Type | "Soccer match moved to Saturday" Listed in dropdown. | P0 | User+ | Low | Partial | NOTIF-001 | Event change alerts |
| NOTIF-004 | Roster Change Notifications | Alert Type | "2 new players joined your team" Listed in dropdown. | P0 | Player+ | Low | Partial | NOTIF-001, ACTIVITY-014 | Team composition updates |
| NOTIF-005 | Stream Alert Notifications | Alert Type | "New stream added to your Leisure hike" Listed in dropdown. | P1 | User+ | Low | Partial | NOTIF-001, SOCIAL-002 | Media engagement |
| NOTIF-006 | Sponsorship Milestone Notifications | Alert Type | "P500 goal reached!" Listed in dropdown. | P1 | Creator+ | Low | Partial | NOTIF-001, SPONSOR-001 | Fundraising updates |
| NOTIF-007 | Guardian Approval Notifications | Alert Type | "Your child's join request approved" Listed in dropdown. | P0 | Guardian | Low | Partial | NOTIF-001, GUARDIAN-002 | Child activity monitoring |
| NOTIF-008 | Playing Now Notification | Alert Type | When activity enters "Active Now" state: "The soccer game in Broadhurst is Playing Now! Watch via [top FB stream link]" | P1 | User+ | Low | Partial | NOTIF-001, ACTIVITY-003, SOCIAL-005 | Real-time engagement |
| NOTIF-009 | Notification Filters | Alert Feature | Toggle between "Urgent" and "All" in dropdown | P1 | All Profiles | Minimal | Full | NOTIF-001 | Prioritization control |
| NOTIF-010 | Local-Only Notifications | Data Efficiency | Only fires for local/subscribed events to avoid data waste | P0 | All Profiles | Low | Partial | NOTIF-001 | Respects data constraints |

---

## Social & Streaming

| Feature ID | Feature Name | Category | Description | Priority | Profile Access | Data Impact | Offline Support | Dependencies | Notes |
|:-----------|:-------------|:---------|:------------|:---------|:---------------|:------------|:----------------|:-------------|:------|
| SOCIAL-001 | Creator Stream Toggle | Livestream Control | Event Creators toggle ON/OFF fan livestream submissions during event creation. Defaults OFF for privacy. Only available for "Neighbourhood" or "Local Club" categories (not pro leagues). | P1 | Creator | Minimal | Full | PROFILE-006, ACTIVITY-016 | Privacy-first approach |
| SOCIAL-002 | Fan Stream Submission | Livestream Feature | If toggled ON, fans see "Add Your Stream" button on Activity Page. Quick form: "Your Name" + "Live Link" (pre-filled with Facebook). | P1 | User+ | Medium | No | SOCIAL-001 | Community-driven content |
| SOCIAL-003 | Stream Aggregation Display | Livestream Feature | Links aggregate in "Live Streams" section on Activity Page. Lightweight thumbnails or text descriptions (no auto-play). Manual tap to launch external app via deep link. | P1 | All Profiles | Medium | No | SOCIAL-002 | Data-efficient display |
| SOCIAL-004 | Facebook Live Priority | Data Efficiency | Facebook Live displayed prominently with tip: "Use Facebook for low-data streaming—perfect for your bundle!" Low-data warnings for YouTube/TikTok. | P1 | All Profiles | Low | No | SOCIAL-003 | Aligns with Botswana data bundles |
| SOCIAL-005 | Playing Now Stream Push | Real-Time Alert | When activity enters "Active Now" state, push notification with top Facebook stream link | P1 | User+ | Low | Partial | ACTIVITY-003, SOCIAL-003, NOTIF-008 | Drives live engagement |
| SOCIAL-006 | Stream Moderation | Content Safety | Report button next to each stream. Flags to Creator for removal. | P1 | User+ | Minimal | Partial | SOCIAL-003, MODERATION-001 | Community self-policing |

---

## Offline Features

| Feature ID | Feature Name | Category | Description | Priority | Profile Access | Data Impact | Offline Support | Dependencies | Notes |
|:-----------|:-------------|:---------|:------------|:---------|:---------------|:------------|:----------------|:-------------|:------|
| OFFLINE-001 | Equipment Rental Ledger | Resource Management | Users check items (equipment, boardgames, books) in/out while offline. Saves locally, syncs when signal returns. Item mini-profiles: Description, borrow price, item ID, history. | P0 | User+ | Medium | Full | PROFILE-010 (Staff override) | Core Game Cube functionality |
| OFFLINE-002 | Dual-Rating System | Trust Mechanism | Both borrower and lender submit 1-5 star rating on return (reduces lying/bias). Borrow Score Algorithm: Average of return ratings weighted by frequency; low scores flag restrictions. | P0 | User+ | Low | Partial | OFFLINE-001 | Builds accountability |
| OFFLINE-003 | Borrow Score Display | Profile Metric | Shows on Player profile: frequency of borrows and responsibility rating. Determines access level (low scores = restrictions). | P0 | Player | Low | Partial | OFFLINE-002, PROFILE-003 | Reputation system |
| OFFLINE-004 | Staff Ledger Override | Game Cube Control | Staff can verify/override ratings and check-in/out status at physical Game Cubes | P0 | Staff | Medium | Partial | OFFLINE-001, PROFILE-010 | Physical verification layer |
| OFFLINE-005 | Offline Match Sign-Ups (Bluetooth) | Participation | Join matches via Bluetooth (local peer-to-peer) or online. Hub syncs roster every 15 minutes to account for offline users. | P0 | Player+ | Medium | Full | ACTIVITY-019 | Critical for intermittent connectivity |
| OFFLINE-006 | Roster Periodic Sync | Data Sync | Roster changes visible every 15 minutes to all users (online and offline) | P0 | All Profiles | Medium | Partial | OFFLINE-005, ACTIVITY-014 | Balances real-time vs. data efficiency |
| OFFLINE-007 | Offline Map Tiles | Navigation | Download 1MB static map of Gaborone neighborhoods. Find Game Cubes without GPS/data. Manual update in Settings when online. | P1 | All Profiles | Very Low (1MB) | Full | Settings Menu | Covers ~200km² |
| OFFLINE-008 | Manual Sync Button | Data Sync | Settings → "Sync Now" forces data push/pull when signal available. Syncs: Rosters, equipment ledger, Borrow Scores, Bulletin posts, ratings. | P0 | All Profiles | Medium | Partial | Settings Menu | User-controlled sync |
| OFFLINE-009 | Local SQLite Database | Technical Infrastructure | Stores rosters, equipment ledger, map tiles, Borrow Scores locally on device | P0 | All Profiles | High (Local) | Full | None | Core offline-first architecture |
| OFFLINE-010 | Conflict Resolution | Data Sync | Last-write-wins with timestamp tracking; Staff override at Game Cubes for disputes | P0 | All Profiles | Low | Partial | OFFLINE-008, OFFLINE-004 | Prevents data corruption |

---

## Guardian & School Safety

| Feature ID | Feature Name | Category | Description | Priority | Profile Access | Data Impact | Offline Support | Dependencies | Notes |
|:-----------|:-------------|:---------|:------------|:---------|:---------------|:------------|:----------------|:-------------|:------|
| GUARDIAN-001 | Create/Approve Minor Profiles | Child Safety | Guardian creates U16 profiles and approves all profile data. Mandatory for users under 16. | P0 | Guardian | Low | Partial | PROFILE-005 | Child protection gatekeeper |
| GUARDIAN-002 | Approve Activity Joins/RSVPs | Child Safety | Guardian must approve every activity join request for linked minors | P0 | Guardian | Low | Partial | GUARDIAN-001, ACTIVITY-019 | Parental consent workflow |
| GUARDIAN-003 | Guardian Dashboard | Monitoring | Monitor all activities, view rosters, check injury alerts. Accessible via Settings for Guardian profiles only. | P0 | Guardian | Medium | Partial | GUARDIAN-001 | Centralized child oversight |
| GUARDIAN-004 | AcademicAlert (Column AR) | Academic Priority | Guardian can pause Player's match joins if grades are low. Boolean toggle in profile. "Bright Minds" priority. | P1 | Guardian | Minimal | Partial | GUARDIAN-003, PROFILE-003 | Education-first philosophy |
| GUARDIAN-005 | Injury Alerts | Safety Notification | Pushed immediately to Guardian if linked minor reports injury or first-aid needed | P0 | Guardian | Low | Partial | GUARDIAN-003, NOTIF-001 | Emergency response |
| GUARDIAN-006 | Security Log | Transparency | Shows every Creator/Association view of child's profile for scouting. Logs visible in Guardian Dashboard. | P1 | Guardian | Low | Partial | GUARDIAN-003 | Scouting transparency |
| SCHOOL-001 | Bulk Student Upload | School Admin | Schools bulk-upload students by Class/Grade (Column AN). Private academic data (only School + Guardian see); public sports stats (if approved). | P1 | Educational Institution | Medium | Partial | PROFILE-012 | Efficient onboarding |
| SCHOOL-002 | Teacher/Coach Sub-Profile | School Role | Managed by school. Create class matches, log student stats, manage attendance. Column AO: TeacherLead links to profile. | P1 | Educational Institution | Medium | Partial | SCHOOL-001, PROFILE-012 | Class-level management |
| SCHOOL-003 | Student Sub-Profile | School Role | Linked to Player profile. Auto-updates with school representation (e.g., "U13 Soccer Captain - Northside Primary"). Column AM: SchoolID, Column AN: GradeYear. | P1 | Educational Institution | Medium | Partial | SCHOOL-001, PROFILE-003 | Dual identity system |
| SCHOOL-004 | Guardian-School Handshake | Three-Way Connection | When school registers student, Guardian receives notification to link profiles. Guardian taps "Approve" in dashboard. Logs for audit trails. | P0 | Guardian + Educational Institution | Low | Partial | GUARDIAN-001, SCHOOL-001 | Trust triangle |
| SCHOOL-005 | Private Academic Data | Privacy | Grades, attendance, academic alerts visible ONLY to School Staff + Guardian. Never public. | P0 | Educational Institution + Guardian | Low | Partial | SCHOOL-001, GUARDIAN-004 | Privacy protection |
| SCHOOL-006 | Public Sports Stats | Opt-In Visibility | Student sports stats public only if Guardian/School approve toggle. Used for recruitment. | P1 | Educational Institution + Guardian | Low | Partial | SCHOOL-003, RECRUIT-001 | Controlled exposure |
| SCHOOL-007 | WhatsApp Broadcast Channels | School Comms | Teachers use Broadcast (not groups) for students to prevent peer visibility of phone numbers | P1 | Educational Institution | Minimal | No | COMMS-006 | Privacy-first messaging |
| SCHOOL-008 | Inter-House Leagues | School Feature | Internal competitions tracked by HouseColor (Column AP). Stats aggregate to student profiles. | P1 | Educational Institution | Medium | Partial | SCHOOL-002, SCHOOL-003 | School spirit tracking |
| SCHOOL-009 | National League Integration | School Feature | Column AQ: NationalLeagueID connects school matches to official National School Leagues managed by Associations | P1 | Educational Institution + Association | Medium | Partial | SCHOOL-002, PROFILE-009 | Talent pipeline |

---

## Community Features

| Feature ID | Feature Name | Category | Description | Priority | Profile Access | Data Impact | Offline Support | Dependencies | Notes |
|:-----------|:-------------|:---------|:------------|:---------|:---------------|:------------|:----------------|:-------------|:------|
| COMMUNITY-001 | The Bulletin Feed | Digital Notice Board | Low-data text-only feed for neighborhood. Content: Jobs, funeral notices, community events, lost items. Users/Players post; Staff moderates. | P1 | User+ | Low | Partial | PROFILE-002, PROFILE-010 | Accessible via Community swipe panel |
| COMMUNITY-002 | Team Call-Outs | Urgent Notifications | Low-data notification: "Block 3 needs a Goalie at the Hub right now!" Shows on Dynamic Activity Cards (badge/icon). Filter in search: "Has Call-Outs" | P0 | Player+ | Low | Partial | ACTIVITY-001, NOTIF-002, SEARCH-004 | Core matchmaking mechanism |
| COMMUNITY-003 | Lost & Found | Item Recovery | Photo-log of items left at parks/fields. Accessible via Community panel. | P1 | User+ | Medium | Partial | COMMUNITY-001 | Community service |
| COMMUNITY-004 | Lost & Found Boost | Paid Feature | Pay P2.00 to send area-wide call-out about lost item | P1 | User+ | Low | Partial | COMMUNITY-003, MONETIZATION-007 | Low-barrier high-reach |
| COMMUNITY-005 | The Archive Library | Historical Content | Links to Facebook galleries of historic local sports moments. Filtered by sport, location, decade. Keeps "Vision" alive for grassroots pride. | P2 | All Profiles | Low | No | None | Cultural preservation |
| COMMUNITY-006 | Match Referee Rating | Trust Mechanism | Rate local volunteer referees (1-5 stars) for fairness. Similar to Borrow Score system. | P1 | Player+ | Low | Partial | OFFLINE-002 | Builds officiating trust |
| COMMUNITY-007 | Incentivized Spectator Check-In | Engagement | Spectators tap "I'm Here" at matches. Tracks game popularity for planning. Potential rewards (e.g., "Attend 5 games, get digital badge"). | P2 | User+ | Low | Partial | ACTIVITY-011 | Data-driven planning |
| COMMUNITY-008 | Local Job Quick-Apply | Bulletin Feature | One-tap "Send my Profile" to job poster in Bulletin Feed | P1 | User+ | Minimal | Partial | COMMUNITY-001 | Economic opportunity |
| COMMUNITY-009 | Mentorship Sign-Up | Discovery | Profiles opt-in to be "discoverable" for coaching roles. Creators see tally of interested Mentors with demographics. Targeted notifications for training/clinics. | P1 | Mentor | Low | Partial | PROFILE-004 | Skill sharing |
| COMMUNITY-010 | First-Aid Directory | Safety Resource | Settings → button for "Nearest Clinic" or "On-site First Aider" based on user's area/location | P1 | All Profiles | Minimal | Full | Settings Menu | Emergency preparedness |

---

## Sponsorship & Monetization

| Feature ID | Feature Name | Category | Description | Priority | Profile Access | Data Impact | Offline Support | Dependencies | Notes |
|:-----------|:-------------|:---------|:------------|:---------|:---------------|:------------|:----------------|:-------------|:------|
| SPONSOR-001 | Sponsor-a-Game | Fundraising | Teams/Clubs/Creators tap button → opens sponsorship page. Shows goals: Money, equipment, other resources. Progress bars (e.g., "P200/500 Funded", "3/10 Soccer Balls"). Local businesses/individuals contribute. | P1 | Creator+ | Medium | Partial | PROFILE-006, PROFILE-007 | GoFundMe-style contextual |
| SPONSOR-002 | Sponsor Recognition | Incentive | Sponsors get digital badges, Activity Page shoutouts after contributing | P1 | All Profiles | Low | Partial | SPONSOR-001 | Public acknowledgment |
| SPONSOR-003 | Equipment Wishlist | Team/Club Feature | Teams/Clubs list needed gear. Community/Businesses see wishlists, can sponsor. Similar workflow to Sponsor-a-Game. | P1 | Group/Club | Low | Partial | SPONSOR-001, PROFILE-007 | Resource matching |
| MONETIZATION-001 | Sponsorship Commission (5%) | Revenue | Mizano takes 5% of ALL "Sponsor-a-Game" monetary funds raised in-app. Transparent at payment. Zero-friction PayPal/MTN Mobile Money/Orange Money. | P0 | N/A | Low | Partial | SPONSOR-001 | Core revenue stream |
| MONETIZATION-002 | Business Subscriptions | Revenue | City-based Businesses pay monthly for "Verified" badge. Tier 1 (Clinics, Physio): ~P50-100/month. Tier 2 (Gyms, Shops): ~P100-200/month. Benefits: Priority search, analytics dashboard. | P1 | Business | Low | Full | PROFILE-008 | Commercial provider fees |
| MONETIZATION-003 | Posted Ads | Revenue | WebP format (50-100KB max) displayed in Shopping/Shops/Businesses panels. Linked to Facebook/WhatsApp only (no external browsers). | P1 | Business | Medium | No | PROFILE-008 | Low-data advertising |
| MONETIZATION-004 | Data-Free Advertising | Premium Revenue | Premium rate for ads whitelisted on zero-rated Facebook data bundles | P2 | Business | Low | No | MONETIZATION-003 | High-value placement |
| MONETIZATION-005 | Venue Broadcasting Fees | Revenue | Listing: Free. Broadcasting (5%): Venue pays 5% per confirmed booking. Commission tracked in billing_ledger. | P1 | Business | Low | Partial | VENUE-002, VENUE-003 | Transaction-based |
| MONETIZATION-006 | Health Report Export | Revenue | Players pay P5-10 to export "Mizano Health & Stats History" as PDF for school/club applications | P1 | Player | Minimal | Full | PROFILE-003, RECRUIT-005 | Professional branding |
| MONETIZATION-007 | Lost & Found Boost | Revenue | P2.00 to send area-wide call-out about lost item | P1 | User+ | Low | Partial | COMMUNITY-004 | Low-barrier micro-transaction |
| MONETIZATION-008 | Tournament Management Suite | Revenue | One-time fee (P50-100) for Leagues to use: Bracket generator, referee rating, auto-scheduling, stats aggregation | P1 | Association | Medium | Partial | PROFILE-009 | Institutional tooling |
| MONETIZATION-009 | School League Subscriptions | School Revenue | Large private schools: Annual fee for League Management Suite. Village/government schools: Always free. | P1 | Educational Institution | Medium | Partial | PROFILE-012, MONETIZATION-008 | Tiered school model |
| MONETIZATION-010 | Recruitment Discovery Fees | School Revenue | Professional clubs/Associations pay small fee for School Talent Analytics. Example: "Show me every U15 striker in Gaborone with 10+ goals this term" | P1 | Association | Medium | Partial | SCHOOL-006, RECRUIT-001 | Aggregate data queries |
| MONETIZATION-011 | Digital Merchandising | School Revenue | Schools sell "House Tokens" or digital badges (P1-5). Students display on profiles (e.g., "Blue House Champion 2026"). Mizano takes 20% cut. | P2 | Educational Institution | Low | Full | SCHOOL-008 | School spirit commerce |
| MONETIZATION-012 | Student-Athlete Portfolio PDF | School Revenue | Small admin fee (P10-20) for branded "Student-Athlete Portfolio" used for secondary school/university applications | P1 | Educational Institution + Player | Minimal | Full | RECRUIT-005 | Credential export |
| MONETIZATION-013 | Institutional Sponsorship | School Revenue | Local businesses sponsor school teams via in-app. Mizano takes 5% (same as general Sponsor-a-Game) | P1 | Business + Educational Institution | Low | Partial | SPONSOR-001, MONETIZATION-001 | School-focused fundraising |
| MONETIZATION-014 | Village Waivers | Free Zones | All features free in rural areas. Paid profiles: Group/Club (if profit-making), Business (if for-profit), Association (if commercial), Educational Institution (if private). Free if: non-profit (Groups), community service (Business), local body (Association), rural/government (School). | P0 | N/A | N/A | Full | All Profiles | Community investment strategy |

---

## Venue & Recruitment

| Feature ID | Feature Name | Category | Description | Priority | Profile Access | Data Impact | Offline Support | Dependencies | Notes |
|:-----------|:-------------|:---------|:------------|:---------|:---------------|:------------|:----------------|:-------------|:------|
| VENUE-001 | Venue Panel | Venue Feature | Dedicated panel (16th) for venue discovery. Free promotion for all venues. Displays Venue Cards with collapsible details (light grey border, 75% opacity). | P0 | All Profiles | Low | Full | NAV-001 | 16th panel in navigation |
| VENUE-002 | Free Venue Listing | Venue Feature | Venues (fields, courts, halls) create basic profile. Shows: Name, location (offline map compatible), venue types, activities supported, amenities, contact (WhatsApp/Facebook/Call). Visible in search results. | P1 | Business | Low | Full | PROFILE-008, VENUE-001 | Open directory |
| VENUE-003 | Paid Venue Broadcasting | Venue Feature | Standard: 5% per booking. Priority search placement. Analytics on booking trends. | P1 | Business | Medium | Partial | VENUE-002, MONETIZATION-005 | Premium features |
| VENUE-004 | Venue Booking Flow | User Action | Search → filter by venue type/location/availability → view details/photos/pricing → tap "Book Now" or WhatsApp button → redirect to WhatsApp with pre-filled message → venue owner confirms within 15 minutes (auto-confirms if no action) → Mizano tracks booking for commission | P1 | User+ | Medium | Partial | VENUE-003, COMMS-001 | External payment processing, 15-min auto-confirmation |
| RECRUIT-001 | School Talent Analytics | Recruitment Tool | Associations pay to query aggregate student stats. Example: "Top U13 strikers in Gaborone". Protects privacy (no individual profiles sold; aggregate queries only). | P1 | Association | Medium | Partial | SCHOOL-006, MONETIZATION-010 | Data-driven scouting |
| RECRUIT-002 | Talent Flagging | School Action | Educational Institutions can "Flag" bright mind or top athlete for recruitment, sending "News Flash" to relevant Association (e.g., BFA) | P1 | Educational Institution | Low | Partial | SCHOOL-009, RECRUIT-003 | Direct pipeline |
| RECRUIT-003 | Local Association News Flash | Content Feed | Text-only feed from official bodies (e.g., BFA). Dedicated filter in search. Verified tournament announcements, rule changes, national team news. | P1 | Association | Low | Partial | PROFILE-009 | Official communications |
| RECRUIT-004 | National Leaderboard | Stats Display | Aggregates inter-school match stats for Botswana youth sports. Accessible via Leaderboard swipe panel. | P1 | All Profiles | Medium | Partial | SCHOOL-009 | Competitive rankings |
| RECRUIT-005 | Sports CV Builder | Player Tool | Player stats auto-generate "Sports CV". Exports as PDF (tiny fee P5-10). Includes: School, achievements, certifications, health notes, fitness levels. | P1 | Player | Low | Full | PROFILE-003, MONETIZATION-006 | Scholarship applications |

---

## Goals & Pursuits (Formerly Tracker)

| Feature ID | Feature Name | Category | Description | Priority | Profile Access | Data Impact | Offline Support | Dependencies | Notes |
|:-----------|:-------------|:---------|:------------|:---------|:---------------|:------------|:----------------|:-------------|:------|
| GOALS-001 | Goals Dashboard | Core Feature | New 17th Panel (Tracker 📊). Dashboard showing Active Pursuits, Daily Log, and Featured/Suggest Goals. | P0 | All Profiles | Low | Full | NAV-001 | Replaces legacy Tracker |
| GOALS-002 | Goal Builder | Creation Tool | Multi-step wizard to create Solo, Duo, or Group goals. Categories: Core Identity, Structure, People, Schedule, Visibility. | P0 | User+ | Medium | Full | GOALS-001 | offline-first creation |
| GOALS-003 | Goal Types | Logic | **Solo**: Private. **Duo**: 1 Partner (Invite). **Group**: Team/Squad (Invite). | P0 | All Profiles | Low | Full | GOALS-002 | Supports diverse use cases |
| GOALS-004 | Pre-Loaded Templates | Content | 600+ curated goal templates (e.g., "Couch to 5K", "Drink 2L Water") seeded into IndexedDB. | P0 | All Profiles | High (Local) | Full | GOALS-001 | Quick-start engagement |
| GOALS-005 | Daily Log | Tracking | Quick-tap logging for generic metrics: Workout, Meal, Water, Sleep. | P0 | User+ | Minimal | Full | GOALS-001 | Habit tracking |
| GOALS-006 | Goal Progress Card | UI Component | Visual progress bar, "Due In" countdown, and "Notes" indicator. 7-color system integration (Blue/Green/Orange). | P0 | All Profiles | Low | Full | GOALS-001 | Main display unit |
| GOALS-007 | Alarm Scheduler | Notification | Local notifications for goal reminders. Falls back to system alarms if available. | P1 | User+ | Minimal | Full | GOALS-001 | Retention driver |

---

## Content Management

| Feature ID | Feature Name | Category | Description | Priority | Profile Access | Data Impact | Offline Support | Dependencies | Notes |
|:-----------|:-------------|:---------|:------------|:---------|:---------------|:------------|:----------------|:-------------|:------|
| CONTENT-001 | Content Manager Access | Content Management | Manager button in hamburger menu (☰). Provides unified interface for content creation, billing, stats, and management. Full-screen overlay with collapsible sections. | P0 | User+ | Medium | Partial | NAV-003 | Core content lifecycle tool |
| CONTENT-002 | Create Content | Content Management | Top-level creation interface with panel category selector (12 categories: Sports, Hobbies, Leisure, Lessons, Events, Groups, Mine, Community, Shopping, Shops, Businesses, Venues). Sport/activity-specific forms for all content types. | P0 | User+ | Medium | Partial | CONTENT-001 | Leverages EVENT_GENERATION_LOGIC |
| CONTENT-003 | Billing Counter | Content Management | Displays all commission-generating items. Breakdown by transaction type (Venue Bookings 5%, Sponsorships 5%, Other). Total earnings tracker with transaction history. | P0 | User+ | Low | Partial | CONTENT-001, MONETIZATION-001 | Financial transparency |
| CONTENT-004 | Panel Category Stats | Content Management | 200 KPIs per panel category. 7 categories: General (10), Geographic (3), Demographic (3), Temporal (6), Engagement (6), Comparative (3), Advanced (4). Text-based metrics with minimal charts. | P1 | User+ | High | Partial | CONTENT-001 | Data-driven content optimization |
| CONTENT-005 | Book Keeping (Venues) | Content Management | Venue-specific booking management. Pricing setup, availability calendar, pending/confirmed/cancelled bookings list. 15-minute auto-confirmation workflow. User contact info (WhatsApp, call). | P0 | Business | Medium | Partial | CONTENT-001, VENUE-001 | Venue owner tool |
| CONTENT-006 | Created Cards Management | Content Management | Infinite list of user's cards per category. Sorted by most recent. Shows status (Draft, Published, Scheduled, Archived), views, engagement, last edited date. | P0 | User+ | Medium | Partial | CONTENT-001 | Content lifecycle management |
| CONTENT-007 | Card Edit Icon | Content Management | Small edit icon (pencil symbol, 20×20px, blue #4472C4) on user-created cards. Top-right placement. Opens edit interface with pre-filled form. Update, Save as Draft, or Delete options. | P0 | User+ | Minimal | Full | CONTENT-006 | Visual edit affordance |
| CONTENT-008 | 25 Sample Cards | Content Management | Pre-populated demo cards across all card types (5 Standard Match, 3 Registration-State, 3 Match-Making, 2 Training/Lesson Progress, 2 Standard Lesson, 2 News Flash, 2 Quick Poll, 2 Event Invite, 4 Venue). Fully editable. Demonstrates edit workflows. | P1 | User+ | Medium | Full | CONTENT-006 | Onboarding and education |

---

## Settings & Miscellaneous

| Feature ID | Feature Name | Category | Description | Priority | Profile Access | Data Impact | Offline Support | Dependencies | Notes |
|:-----------|:-------------|:---------|:------------|:---------|:---------------|:------------|:----------------|:-------------|:------|
| SETTINGS-001 | Account & Profile Section | Settings Category | +/- collapsible: Edit Profile (Name, Village/Town/Area), Player Bio & Stats (Sports CV, school, health logs), Guardian Dashboard (Guardian only), Switch to Mentor/Creator (text buttons), Delete Account | P0 | All Profiles | Low | Full | UI-001 | Primary identity management |
| SETTINGS-002 | My Activity Hub Section | Settings Category | +/- collapsible: Borrow Score & History, My Wishlist (equipment/events flagged), Match History (export PDF for fee), My Sponsorships (given/received tracker) | P1 | User+ | Low | Partial | UI-001, OFFLINE-003, SPONSOR-001 | Personal activity tracking |
| SETTINGS-003 | Navigation & Display Section | Settings Category | +/- collapsible: Reorder Swipe Panels (drag-to-reorder), Default Location (Gaborone/Village/Area), Dark Mode Toggle | P1 | All Profiles | Minimal | Full | UI-001, NAV-005 | UX customization |
| SETTINGS-004 | Data & Offline Sync Section | Settings Category | +/- collapsible: Offline Map Tiles (download/update 1MB Gaborone map), Manual Sync Now, Data Saver Mode (WebP images on/off; text-only icons), Clear Cache | P0 | All Profiles | Medium | Full | UI-001, OFFLINE-007, OFFLINE-008 | Data management |
| SETTINGS-005 | Community & Safety Section | Settings Category | +/- collapsible: Responsible Gambling Awareness (hard-switch, defaults OFF), Mentorship Visibility (discoverable toggle), First-Aid Directory, Report a Problem | P0 | All Profiles | Low | Partial | UI-001, MISC-001, COMMUNITY-009, COMMUNITY-010 | Safety controls |
| SETTINGS-006 | About & Legal Section | Settings Category | +/- collapsible: About Us (Mizano story, vision), Terms of Service, Privacy Policy (school/health data handling), Version Info (e.g., "Mizano v1.2 - Gaborone Edition") | P0 | All Profiles | Minimal | Full | UI-001 | Legal compliance |
| SETTINGS-007 | Guardian Security Log | Guardian-Specific | Shows every Creator/Association view of child's profile (scouting transparency). Accessible via Guardian Dashboard in Settings. | P1 | Guardian | Low | Partial | GUARDIAN-006, SETTINGS-001 | Accountability |
| MISC-001 | Responsible Gambling Awareness | Ethical Feature | DEFAULT STATE: All betting-related content HIDDEN. Opt-In Required: Users must explicitly toggle ON in Settings. Once activated, users see: Educational materials (addiction dangers, help resources), Sponsored events from betting companies (flagged), Gambling Authority adverts/campaigns. NEVER: In-app betting, odds, bet placement, affiliate links. | P1 | User+ | Low | Full | SETTINGS-005 | Attracts Botswana Gambling Authority partnership |
| MISC-002 | Betting Content Flagging | Content Moderation | All gambling-related content tagged in backend. Conditional rendering based on user's toggle state. Staff moderates for compliance. | P1 | Staff | Low | Partial | MISC-001, PROFILE-010 | Regulatory compliance |
| MISC-003 | Weather Info Capture | Event Creation | Captured during event creation for outdoor activities. Displayed on Activity Pages. Alerts if conditions change. | P1 | Creator | Low | Partial | PROFILE-006, ACTIVITY-012 | Safety planning |
| MODERATION-001 | Report Content | Safety Mechanism | Report button on Activity Pages, Bulletin posts, streams. Flags to Staff/Admin for review. | P0 | All Profiles | Minimal | Partial | PROFILE-010, PROFILE-011 | Community safety |
| MODERATION-002 | Bulletin Moderation | Staff Action | Staff reviews and approves/rejects Bulletin Feed posts | P1 | Staff | Low | Partial | COMMUNITY-001, PROFILE-010 | Content quality control |
| MODERATION-003 | Stream Moderation | Creator Action | Creator can remove reported streams from their events | P1 | Creator | Minimal | Partial | SOCIAL-006, PROFILE-006 | Event-level control |

---

## Technical Specifications

| Component | Technology | Specification | Purpose | Data Impact | Notes |
|:----------|:-----------|:--------------|:--------|:------------|:------|
| Platform | Native Mobile | Flutter (cross-platform) | Android primary for Botswana market; iOS secondary | Low | Offline-first support built-in |
| UI Framework | Flutter | Side-swipe horizontal carousel with vertical infinite scroll per panel | Efficient navigation without page reloads | Minimal | 300ms animations, edge glow, preload adjacent panels |
| Design Language | Minimalist | Text-heavy, +/- collapsible sections, WebP images (optional) | Data efficiency for low-data markets | Very Low | Aligns with Botswana data constraints |
| Local Storage | SQLite | Rosters, equipment ledger, map tiles, Borrow Scores | Full offline functionality | High (Local) | Syncs every 15 minutes when online |
| Backend Data Store | Google Sheets API v4 | Master data sheet with columns AM-AV | Lightweight, accessible via Drive | Low | Real-time sync every 15 minutes |
| Conflict Resolution | Last-write-wins | Timestamp tracking; Staff override at Game Cubes | Prevents data corruption | Minimal | Human verification layer for disputes |
| Authentication | Firebase Auth | Lightweight, works offline | User identity management | Low | Caches credentials locally |
| WhatsApp Integration | wa.me Deep Links | Column AS: WhatsAppNumber (+267 format), Column AV: PreFillMessage | Zero-data external chat | Minimal | No API dependency—URL-based |
| Facebook Integration | Graph API | Event mirroring, page verification (Column AT: FBPageLink) | Zero-rated data distribution | Low | Fallback: Native OS share sheet |
| Facebook Live Priority | Deep Links | Lightweight thumbnails, manual tap to launch | Aligns with Botswana data bundles | Medium | No auto-play; external app launch |
| WhatsApp Groups | Invite URLs | Column AU: GroupChatURL | Collective communication | Minimal | Deep link to WhatsApp app |
| Maps | Static Tiles | 1MB download for Gaborone neighborhoods (~200km²) | Offline navigation to Game Cubes | Very Low (1MB) | Manual update in Settings |
| Weather API | OpenWeatherMap | Cached forecasts for outdoor events | Safety planning | Low | Lightweight JSON responses |
| Payment Gateways | MTN Mobile Money, Orange Money, PayPal | Botswana-optimized | Zero-friction transactions | Low | 5% commission on sponsorships |
| Bluetooth | Local Peer-to-Peer | Offline match sign-ups | Critical for intermittent connectivity | Minimal | Syncs when online |
| App Size | Target | <20MB initial download | Mobile-friendly for low-storage devices | N/A | Minimal dependencies |
| Offline Functionality | Target | 100% of core features | View, join, borrow, sync queue | N/A | Critical design constraint |
| Sync Time | Target | <2 seconds for 15-minute roster update | Max 50 users per event | Medium | Optimized for low bandwidth |
| Search Latency | Target | <500ms for filtered results | Local cache + backend | Low | Progressive loading |
| Map Coverage | Coverage | 1MB for full Gaborone neighborhoods | Covers ~200km² | Very Low | Expandable to other regions |

---

## Data Schema (Master Sheet)

| Column | Name | Data Type | Description | Example Value | Used By | Notes |
|:-------|:-----|:----------|:------------|:--------------|:--------|:------|
| AM | SchoolID | Text | Unique school identifier | "SCH-GAB-WEST-01" | Educational Institution, Student | Links student to school |
| AN | GradeYear | Text | Student class/grade level | "Grade 7", "Form 3" | Educational Institution, Student | For age-appropriate matching |
| AO | TeacherLead | Reference | Link to Teacher/Coach profile managing the class | Teacher Profile ID | Educational Institution, Teacher | Enables class-level management |
| AP | HouseColor | Text | Inter-house competition tracking | "Red House", "Blue House" | Educational Institution, Student | For school spirit events |
| AQ | NationalLeagueID | Reference | Links school matches to official National School League | League ID from BFA | Educational Institution, Association | Connects grassroots to national pipeline |
| AR | AcademicAlert | Boolean | Guardian pauses joins if grades low | TRUE/FALSE | Guardian, Student | "Bright Minds" philosophy—education first |
| AS | WhatsAppNumber | Text | International format for wa.me links | "+26771234567" | All Profiles | Used in wa.me deep links |
| AT | FBPageLink | URL | Official Facebook Business/Association page | "facebook.com/BusinessName" | Business, Association | Trust/verification mechanism |
| AU | GroupChatURL | URL | WhatsApp Team/Class group invite link | "https://chat.whatsapp.com/..." | Group/Club, Educational Institution | Collective communication |
| AV | PreFillMessage | Text | Custom text for "WhatsApp Organizer" button | "Hello! I'm interested in the Soccer match in Block 3 at 4 PM via Mizano." | Creator, Activity | Contextual messaging |

---

## Roadmap

| Phase | Timeline | Milestone | Key Features | Success Metrics | Dependencies |
|:------|:---------|:----------|:-------------|:----------------|:-------------|
| Q1 2026: MVP Launch | Jan-Mar 2026 | Gaborone-only launch | 7 panels: Homepage, Sports, Hobbies, Events, Mine, Shopping, Settings<br>Super Search (3-level filters)<br>Dynamic Activity Cards (5 states)<br>User/Player/Guardian profiles<br>Offline match sign-ups<br>WhatsApp deep links<br>Equipment ledger (Game Cube) | 10,000 Users/Players across Gaborone<br>500 Guardian-Minor handshakes<br>1,000 Bluetooth/offline match joins<br>2,000 equipment borrows (<5% disputes)<br>P50,000 total raised via Sponsor-a-Game (P2,500 commission) | None—core foundation |
| Q2 2026: Community Features | Apr-Jun 2026 | Social engagement layer | Bulletin Feed<br>Lost & Found<br>Sponsor-a-Game (5% commission)<br>Team Call-Outs<br>Facebook Live integration<br>Persistent Notification Dropdown<br>Mentor/Creator profile upgrades | Sustained DAU growth<br>Community content generation<br>First sponsorship deals | Q1 MVP |
| Q3 2026: School Integration | Jul-Sep 2026 | Educational ecosystem | Educational Institution profile<br>Teacher/Coach sub-profiles<br>Guardian-School handshake<br>Bulk student upload<br>Internal leagues (inter-house)<br>National Leaderboard beta | 20 schools onboarded (10 rural free, 10 urban paid)<br>5,000 students linked<br>500 inter-school matches logged<br>50 paid recruitment queries from BFA/Associations<br>200 Sports CV PDF downloads | Q1 MVP, Q2 Community |
| Q4 2026: National Expansion | Oct-Dec 2026 | Full feature set | 8 additional panels (full 15-panel swipe)<br>Business/Association paid profiles<br>Venue booking (5%/10% commissions)<br>National school leagues live<br>Recruitment Discovery fees<br>Sports CV PDF exports<br>Tournament Management Suite | Active in 15+ villages/towns beyond Gaborone<br>100 verified businesses paying monthly<br>500 bookings/month (P25,000 commission)<br>20,000 DAU<br><5% betting opt-ins | Q1 MVP, Q2 Community, Q3 Schools |
| 2027: Advanced Features | Year 2 | Refinement & scale | Dark mode<br>Referee rating system<br>CV Builder (auto-generate)<br>Betting Awareness (Gambling Authority partnership)<br>Archive Library (FB gallery links)<br>Incentivized spectator check-ins<br>Data analytics dashboard (Admins) | Profitability<br>National brand recognition<br>Government partnerships | All prior phases |

---

**Document Version:** 2.0  
**Last Updated:** February 13, 2026  
**Maintained By:** Mizano Product Team  
**Cross-Reference:** [MIZANO PROJECT SUMMARY](./PROJECT_SUMMARY.md) | [MIZANO PAGE FLOW ARCHITECTURE](./MIZANO_PAGE_FLOW_ARCHITECTURE.md) | [MIZANO DESIGN GUIDE](./MIZANO_DESIGN_GUIDE.md)