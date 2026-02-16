MIZANO_CAPABILITY_LAYERS_&_PERMISSIONS.md

# MIZANO CAPABILITY LAYERS & PERMISSIONS
**Standardizing Protocol: Capability over Types**
  
*Botswana’s Grassroots Sports & Community Platform*

---

## 1. Overview

Mizano’s profile system is designed to reflect real-world community roles—from casual browsers to institutional authorities. Each profile type carries a specific set of permissions, cost models, and capabilities, all aligned with the platform’s **offline‑first**, **low‑data**, and **safety-first** philosophy.

Twelve core profiles are defined, divided into four tiers:
- **Unregistered** – Browser
- **Registered Free** – User, Player, Mentor, Guardian, Creator
- **Paid (with Village Waivers)** – Group/Club, Business, Association, Educational Institution
- **Internal Mizano** – Staff, Admin

This document details each profile, their permissions, upgrade paths, data schema, and how they integrate into Mizano’s navigation and safety framework.

---

## 2. Capability Layers

### TIER 1: UNREGISTERED

#### 1. Browser
- **Cost Model:** Always Free (Unregistered)
- **Primary Use Case:** Window shopper – discovery without commitment.
- **Key Features:**
  - Swipe through up to 15 homepage panels.
  - View activity card teasers (no full details).
  - “Sign in to view more” prompts on taps.
- **Permissions Summary:** No interaction beyond viewing teasers; cannot join, create, or access any registered‑only content.

---

### TIER 2: REGISTERED FREE PROFILES

#### 2. User
- **Cost Model:** Always Free (Registered)
- **Primary Use Case:** Foundational citizen – basic community participation.
- **Key Features:**
  - Full access to activity details, livestream links, participant rosters.
  - Add favorites (gold star) and manage favorites list.
  - Post to Bulletin Feed, submit Lost & Found items.
  - Join non‑competitive activities, spectator check‑ins, RSVP to events.
  - Borrow equipment (with Borrow Score tracking).
- **Upgrade Paths:** Can upgrade to Player or Mentor via forms.

#### 3. Player
- **Cost Model:** Always Free (Registered)
- **Primary Use Case:** Active participant – competitive athlete.
- **Key Features:**
  - All User features.
  - Join competitive matches, respond to team call‑outs.
  - Maintain Sports CV (auto‑generated from match history).
  - Health logs (device‑only) and fitness level tracking.
  - Borrow Score and history; can export Sports CV as PDF (small fee).
- **Upgrade Paths:** Can also become a Mentor while retaining Player status.

#### 4. Mentor
- **Cost Model:** Always Free (Registered)
- **Primary Use Case:** Community leader – guides & teaches.
- **Key Features:**
  - All User features.
  - Indexed for Creator invites (discoverable toggle in Settings).
  - Guide training sessions, view mentee tallies.
  - Receive targeted notifications for clinics/training.
- **Upgrade Paths:** Can sign up directly or upgrade from User/Player.

#### 5. Guardian
- **Cost Model:** Always Free (Registered)
- **Primary Use Case:** Oversight – protects minors (required for all users under 16).
- **Key Features:**
  - Create and approve minor profiles (U16 mandatory linking).
  - Dashboard monitoring: approve joins/RSVPs, view activity history.
  - Receive injury alerts and security log (every profile view by Creators/Associations).
  - Pause joins via AcademicAlert if grades are low.
  - Complete Guardian‑School handshake for educational linkage.
- **Mandatory Path:** Any user under 16 must have an approved Guardian linked.

#### 6. Creator
- **Cost Model:** Always Free (Registered)
- **Primary Use Case:** Organizer – hosts single/ad‑hoc events.
- **Key Features:**
  - All User features.
  - Create single events/matches via Event Lab.
  - Manage rosters, send call‑outs, toggle stream submissions.
  - Set weather info, initiate Sponsor‑a‑Game campaigns.
  - View sponsorship progress and recognition.
- **Upgrade Paths:** Can upgrade from User/Player.

---

### TIER 3: PAID PROFILES (with Village Waivers)

*Village Waivers:* Group/Club, Business, Association, and Educational Institution profiles are **free in rural villages** to promote community development. Admin sets `VillageWaiverActive = TRUE` for qualifying non‑profits.

#### 7. Group/Club
- **Cost Model:** Free in villages if non‑profit; otherwise paid.
- **Primary Use Case:** Collective team/club management.
- **Key Features:**
  - Create recurring events, internal leagues.
  - Manage bulk rosters, shared trophies, wishlists for equipment.
  - Sponsorship pages, history tracking.
  - View analytics (limited).

#### 8. Business
- **Cost Model:** Free in villages for non‑profits; otherwise paid (monthly subscription).
- **Primary Use Case:** Commercial service provider (clinics, gyms, shops).
- **Key Features:**
  - Listed in Businesses/Shops panels.
  - Link Facebook Business Page and WhatsApp Business number.
  - Respond to Job Quick‑Applies, sponsor events.
  - Post WebP ads in Shopping panel; access analytics dashboard.
  - Enable venue broadcasting (5% commission) or Instant Book (10% commission).

#### 9. Association
- **Cost Model:** Free in villages for community; otherwise paid.
- **Primary Use Case:** Institutional authority (BFA, scouts, leagues).
- **Key Features:**
  - Post News Flash (official announcements).
  - Verify tournaments, access player tallies for scouting.
  - Post broadcast updates, view National Leaderboard.
  - Flag talent for recruitment.

#### 12. Educational Institution
- **Cost Model:** Free for rural/government schools; otherwise paid.
- **Primary Use Case:** Talent hub – school sports & academics.
- **Key Features:**
  - Create and manage national leagues.
  - Bulk upload students by class.
  - Create Teacher/Coach and Student sub‑profiles.
  - Log student stats, create inter‑house competitions.
  - Generate Sports CV certificates, use WhatsApp Broadcast Channels.
  - Complete Three‑Way Handshake with Guardians.

---

### TIER 4: INTERNAL MIZANO PROFILES

#### 10. Staff
- **Cost Model:** Internal Mizano role.
- **Primary Use Case:** Cube Manager – physical hub operations.
- **Key Features:**
  - Manage equipment ledger (check‑in/out), override borrow restrictions.
  - Offline syncs, Bulletin moderation, score verification.
  - First‑aid directory access.
  - Force manual sync at Game Cubes.

#### 11. Admin
- **Cost Model:** Internal Mizano role.
- **Primary Use Case:** Platform architect – full system oversight.
- **Key Features:**
  - Full analytics dashboard, manage village waivers.
  - Audit trails, moderation override.
  - Manage fee structures (5% commissions), set subscription fees.
  - Access all data, configure system settings.

---

## 3. Capability Hierarchy & Upgrade Paths

```
TIER 1: UNREGISTERED
  Browser → Upgrade to User via registration

TIER 2: REGISTERED FREE PROFILES
  User → can upgrade to Player or Mentor
  Player → can also become Mentor (dual)
  Guardian → created separately, linked to minors
  Creator → upgrade from User/Player

TIER 3: PAID PROFILES (Village Waivers apply)
  Group/Club, Business, Association, Educational Institution
  → separate registration; some can be upgraded from Creator (e.g., Creator → Group/Club)

TIER 4: INTERNAL MIZANO PROFILES
  Staff, Admin → assigned internally
```

**Common Upgrade Paths:**
- Browser → User (registration)
- User → Player (Activities Form submission)
- User → Mentor (Mentorship Sign-Up Form)
- Player → Mentor (can hold both)
- User/Player → Creator (Event Organizer upgrade)
- Creator → Group/Club (for recurring/collective management)

**Mandatory Path for Minors:**
- Browser → User (with Guardian profile created first)
- Guardian creates minor User → Guardian approves upgrade to Player

**School Connections:**
- Educational Institution creates Student sub‑profile → Guardian receives notification → Guardian approves link → **Three‑Way Handshake** complete

---

## 4. Permissions Matrix

The following matrix defines **full access (✓)** , **partial access (⊕)** , and **no access (✗)** for each profile type across all platform features.  
*Note: ⊕ indicates restricted functionality (e.g., limited roster view, partial search, or education‑only access).*

| Feature / Action | Browser | User | Player | Mentor | Guardian | Creator | Group/Club | Business | Association | Staff | Admin | School |
|------------------|:------:|:----:|:------:|:------:|:--------:|:-------:|:----------:|:--------:|:-----------:|:-----:|:-----:|:------:|
| **DISCOVERY & VIEWING** | | | | | | | | | | | | |
| Swipe homepage panels (15 panels) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| View activity card teasers | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Access full activity details | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| View livestream links | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| View participant rosters | ✗ | ✓ | ✓ | ✓ | ⊕ | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ |
| Access offline map tiles | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **PARTICIPATION & JOINING** | | | | | | | | | | | | |
| Join non‑competitive activities | ✗ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Join competitive matches | ✗ | ✗ | ✓ | ✗ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Offline Bluetooth sign‑ups | ✗ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Respond to team call‑outs | ✗ | ✗ | ✓ | ✓ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Spectator check‑ins | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| RSVP to events | ✗ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ |
| **CREATION & ORGANIZATION** | | | | | | | | | | | | |
| Create single events/matches | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Create recurring events | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✓ | ✓ |
| Manage rosters | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ | ✓ |
| Send team call‑outs | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ | ✓ |
| Toggle stream submissions | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✓ |
| Set weather info | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✓ |
| Create internal leagues | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✓ | ✓ |
| Create national leagues | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✓ | ✓ |
| **GUARDIAN & MINOR SAFETY** | | | | | | | | | | | | |
| Create minor profiles (U16) | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Approve minor joins/RSVPs | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| View Guardian dashboard | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Receive injury alerts | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| View security log (profile views) | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Pause joins via AcademicAlert | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Complete Guardian‑School handshake | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |
| **EQUIPMENT & BORROWING** | | | | | | | | | | | | |
| Borrow equipment (ledger) | ✗ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Submit borrow ratings | ✗ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ |
| View Borrow Score | ✗ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Manage equipment ledger | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ |
| Override borrow restrictions | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ |
| Create equipment wishlists | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✓ | ✓ |
| **COMMUNITY FEATURES** | | | | | | | | | | | | |
| Post to Bulletin Feed | ✗ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ⊕ | ✓ | ✗ | ✓ | ✓ |
| Moderate Bulletin posts | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ |
| Submit Lost & Found items | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Boost Lost & Found (P2.00) | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ |
| Job Quick‑Apply (send profile) | ✗ | ✓ | ✓ | ✓ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Post News Flash | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✓ | ✓ |
| View Archive Library | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **SPONSORSHIP & FUNDING** | | | | | | | | | | | | |
| Initiate Sponsor‑a‑Game | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✓ |
| Contribute to sponsorships | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ |
| View sponsorship progress bars | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Receive sponsor recognition | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ |
| **SEARCH & FAVORITES** | | | | | | | | | | | | |
| Use Super Search (3‑level filters) | ⊕ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Toggle favorites (gold star) | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| View favorites list | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Filter by ‘Has Call‑Outs’ | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Filter by ‘Has Streams’ | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **MENTORSHIP** | | | | | | | | | | | | |
| Sign up as discoverable Mentor | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Guide training sessions | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| View mentee tallies | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Receive clinic/training notifications | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Be indexed for Creator invites | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| **BUSINESS & COMMERCIAL** | | | | | | | | | | | | |
| List in Businesses/Shops panels | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✓ | ✗ |
| Link Facebook Business Page | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ | ✓ | ✓ |
| Link WhatsApp Business number | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ | ✓ | ✓ |
| Respond to Job Quick‑Applies | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✓ | ✗ |
| Sponsor events (get recognition) | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ | ✓ | ✓ |
| Post WebP ads in Shopping panel | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✓ | ✗ |
| Access analytics dashboard | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ | ✓ | ✓ |
| **INSTITUTIONAL & SCOUTING** | | | | | | | | | | | | |
| Verify tournaments | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✓ | ✓ |
| Access player tallies for scouting | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✓ | ✓ |
| View National Leaderboard | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Post tournament announcements | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✓ | ✓ |
| Flag talent for recruitment | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✓ | ✓ |
| **SCHOOL‑SPECIFIC** | | | | | | | | | | | | |
| Bulk upload students by class | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |
| Create Teacher/Coach sub‑profiles | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |
| Log student stats | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |
| Create inter‑house competitions | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |
| Link to national school leagues | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |
| Generate Sports CV certificates | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |
| Use WhatsApp Broadcast Channels | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |
| **RATINGS & REPUTATION** | | | | | | | | | | | | |
| Rate referees | ✗ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ |
| View referee ratings | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Submit dual borrow ratings | ✗ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ |
| View Borrow Score algorithm results | ✗ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ | ✗ |
| **EXPORTS & REPORTS** | | | | | | | | | | | | |
| Export Sports CV as PDF (P5‑10) | ✗ | ✗ | ✓ | ✗ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Export match history | ✗ | ✗ | ✓ | ✗ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Generate student‑athlete portfolios | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |
| Access health & stats history | ✗ | ✗ | ✓ | ✗ | ⊕ | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✓ |
| **VENUE MANAGEMENT** | | | | | | | | | | | | |
| Create free venue listing | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ |
| Enable venue broadcasting (5%) | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✓ | ✗ |
| Enable Instant Book (10%) | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✓ | ✗ |
| Book venues | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✓ |
| **BETTING AWARENESS** | | | | | | | | | | | | |
| Toggle Responsible Gambling (default OFF) | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| View betting educational materials | ✗ | ⊕ | ⊕ | ⊕ | ⊕ | ⊕ | ⊕ | ⊕ | ⊕ | ✗ | ✓ | ⊕ |
| See Gambling Authority campaigns | ✗ | ⊕ | ⊕ | ⊕ | ⊕ | ⊕ | ⊕ | ⊕ | ⊕ | ✗ | ✓ | ⊕ |
| **ADMIN & MODERATION** | | | | | | | | | | | | |
| View full analytics dashboard | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ⊕ |
| Manage village waivers | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Access audit trails | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Override moderation decisions | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Manage fee structures | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Force manual sync | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ |

---

## 5. Data Schema Columns

The master Google Sheets schema (used via API) defines the following fields for profile management. All timestamps are ISO 8601; JSON arrays are stored as stringified JSON.

| Column | Field Name | Data Type | Purpose | Relevant Profiles |
|--------|------------|-----------|---------|-------------------|
| A | ProfileID | String (UUID) | Unique identifier for each profile | All |
| B | ProfileType | Enum | Browser, User, Player, Mentor, Guardian, Creator, Group/Club, Business, Association, Staff, Admin, Educational Institution | All |
| C | FullName | String | Display name | User, Player, Mentor, Guardian, Creator, Staff, Admin |
| D | VillageTownCity | String | Primary location (e.g., Gaborone) | All registered |
| E | AreaNeighborhood | String | Specific area (e.g., Block 3) | All registered |
| F | WhatsAppNumber | String (+267...) | International format for wa.me deep links | User, Player, Creator, Group/Club, Business, Guardian |
| G | FBPageLink | URL | Official Facebook Business/Association page | Business, Association, Group/Club, Educational Institution |
| H | GroupChatURL | URL | WhatsApp Team/Class group invite link | Group/Club, Educational Institution |
| I | PreFillMessage | String | Custom text for ‘WhatsApp Organizer’ button | Creator, Group/Club, Business |
| J | IsPaidProfile | Boolean | TRUE if subscription required (unless village waiver) | Group/Club, Business, Association, Educational Institution |
| K | VillageWaiverActive | Boolean | TRUE if profile qualifies for free village access | Group/Club, Business, Association, Educational Institution |
| L | SubscriptionStatus | Enum | Active, Expired, Waived | Group/Club, Business, Association, Educational Institution |
| M | MonthlyFee | Number (Pula) | P50‑200 depending on tier | Business, Association |
| N | BorrowScore | Number (1‑5) | Average return ratings weighted by frequency | Player, User (borrowers) |
| O | BorrowHistory | JSON Array | List of {ItemID, BorrowDate, ReturnDate, Rating} | Player, User |
| P | FavoritesActivityIDs | JSON Array | Gold‑starred activity IDs | User, Player, Mentor, Guardian, Creator |
| Q | HealthNotes | Text | Allergies, medical conditions | Player |
| R | InjuryLog | JSON Array | List of {Date, Type, Severity, Recovery} | Player |
| S | FitnessLevel | Enum | Beginner, Intermediate, Advanced, Elite | Player |
| T | Achievements | JSON Array | Trophies, certifications, awards | Player, Group/Club |
| U | SchoolID | String | Links Player to Educational Institution | Player (students) |
| V | GradeYear | String | Class level (e.g., ‘Grade 7’, ‘Form 3’) | Player (students) |
| W | TeacherLead | ProfileID | Link to Teacher/Coach managing student | Player (students) |
| X | HouseColor | String | Inter‑house team (Red, Blue, Yellow, Green) | Player (students) |
| Y | NationalLeagueID | String | Links to official BFA/National School League | Educational Institution, Association |
| AR | AcademicAlert | Boolean | TRUE = Guardian pauses joins for low grades | Player (students), Guardian |
| AA | GuardianProfileID | ProfileID | Links minor to Guardian (required U16) | Player, User (under 16) |
| AB | GuardianApprovalStatus | Enum | Pending, Approved, Denied | Player, User (under 16) |
| AC | SecurityLog | JSON Array | List of {Timestamp, ViewerProfileID, ViewerType} | Guardian (viewing child’s profile) |
| AD | MentorVisibility | Boolean | TRUE = discoverable for Creator invites | Mentor |
| AE | MenteeTally | Number | Count of active mentees | Mentor |
| AF | EventsCreatedCount | Number | Total events organized | Creator, Group/Club, Educational Institution |
| AG | SponsorshipsInitiated | JSON Array | List of {EventID, GoalAmount, CurrentAmount} | Creator, Group/Club |
| AH | WishlistEquipment | JSON Array | List of needed gear {ItemName, Quantity, Priority} | Group/Club, Educational Institution |
| AI | NewsFlashPosts | JSON Array | List of {Timestamp, Content, CategoryTag} | Association, Educational Institution |
| AJ | VerifiedTournaments | JSON Array | List of {TournamentID, Date, Status} | Association |
| AK | PlayerTalliesAccessed | Number | Count of scouting queries made | Association |
| AL | BusinessListingType | Enum | Shop, Clinic, Gym, Physio, Equipment Rental | Business |
| AM | AdCampaignActive | Boolean | TRUE if WebP ads displayed in Shopping panel | Business |
| AN | VenueID | String | If Business offers bookable space | Business |
| AO | VenueBroadcastingEnabled | Boolean | TRUE = 5% commission per booking | Business (venues) |
| AP | InstantBookEnabled | Boolean | TRUE = 10% commission per booking | Business (venues) |
| AQ | StudentBulkUploadDate | Date | Last bulk upload timestamp | Educational Institution |
| AR | TeacherSubProfiles | JSON Array | List of {TeacherID, Name, SubjectSport} | Educational Institution |
| AS | StaffGameCubeID | String | Assigned Game Cube location | Staff |
| AT | LedgerSyncLastTime | Timestamp | Last offline equipment sync | Staff |
| AU | ModerationCount | Number | Total Bulletin/Lost & Found moderations | Staff |
| AV | AdminAccessLevel | Enum | Full, Financial, Analytics, Moderation | Admin |
| AW | VillageWaiverGrantedCount | Number | Total waivers approved by Admin | Admin |
| AX | ResponsibleGamblingToggle | Boolean | FALSE = betting content hidden (default) | All registered |
| AY | CreatedTimestamp | Timestamp | Profile creation date | All |
| AZ | LastLoginTimestamp | Timestamp | Last app access | All registered |

---

## 6. Integration with Platform Architecture

### Navigation & UI Impact
- **Top Bar / Bottom Menu** – Visible to all registered profiles; unregistered Browser sees only limited options.
- **Guardian Dashboard** – Accessed via Settings → Account & Profile; provides oversight of linked minors, approval queue, and security log.
- **Creator Dashboard** – Available to Creators, Groups, Schools; accessed from Mine Page or Settings.
- **Event Lab** – Only Creators, Groups, Schools, and Admins can create events. Permissions within Event Lab depend on profile (e.g., only Groups can create recurring events).
- **Business Panel** – Visible only to Business profiles; includes analytics and ad management.
- **News Flash** – Exclusive to Association and School profiles.

### Guardian & Safety Flows
- Minors (U16) are automatically restricted from competitive joins until Guardian approval.
- The **Three‑Way Handshake** (Guardian‑School‑Mizano) ensures that student profiles are verified and linked.
- **Capability Principle**: Profiles are "Layers" added to a base UID. A user is not *a* Mentor; they *have* Mentor Capability.
- Security Log records every view of a minor’s profile by Creators or Associations, visible only to Guardians.

### Village Waivers & Monetization
- Admins manually set `VillageWaiverActive` for qualifying non‑profit groups, businesses, associations, and schools in rural areas.
- Paid profiles (Business, Association, Group/Club, Educational Institution) unlock advanced features (analytics, recurring events, scouting) and are billed monthly.

### 10.3 SECURITY LOGGING
Every profile view by an **Association** or **Creator** MUST be logged. Guardians receive a "Security Log" update in their dashboard showing who viewed their minor's stats/profile. This is non-negotiable for safety.
- All profiles can operate offline; actions are queued and synced when online.
- Staff and Admin have additional controls (force sync, ledger override) to manage physical Game Cube operations.

---

## 7. Security & Privacy Considerations

- **Medical data** (`HealthNotes`, `InjuryLog`) is stored **only on the device** – never transmitted to the server. Backend tracks only anonymous tallies.
- **Guardian Approval** is mandatory for all under‑16 actions; the system logs every approval/denial.
- **Borrow Score** algorithm aggregates ratings but does not expose individual raters.
- **Responsible Gambling** toggle defaults to OFF; when enabled, only educational content and sponsored awareness campaigns are shown – no betting functionality.
- **Audit Trails** available to Admins and Guardians (for their minors) to ensure transparency.

---

**Document Version:** 1.5  
**Last Updated:** February 15, 2026  
**Cross‑Reference:** [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md), [MIZANO_PAGE_FLOW_ARCHITECTURE.md](./MIZANO_PAGE_FLOW_ARCHITECTURE.md), [MIZANO_DESIGN_GUIDE.md](./MIZANO_DESIGN_GUIDE.md)