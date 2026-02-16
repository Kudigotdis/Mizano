# MIZANO PROJECT SUMMARY
**Version 2.0 | February 2026**

---

## EXECUTIVE OVERVIEW

**Mizano** is a community-first sports and activities platform designed specifically for Botswana's grassroots ecosystem. It bridges the digital divide by prioritizing **offline-first functionality**, **zero-data accessibility** through WhatsApp/Facebook integration, and **multi-generational safety** via Guardian controls. Mizano is not just an app—it's a **National Talent Pipeline** connecting villages to national leagues, students to scholarships, and neighbors to community.

**Tagline:** *"Bringing the Community Together Through Human-to-Human Activities"*

**Platform:** HTML5 Web App → Android APK

---

## DEVELOPMENT STATUS (February 15, 2026)

**Current Phase:** Phase 10 - Panels Realism Expansion (Integration)

**Key Accomplishments:**
- **Systematic Asset Integration**: All 102 files from the `ORDER THESE` audit have been relocated and renamed to their permanent project locations.
- **Data Expansion**:
    - **Events**: 212 localized events (30 sponsored, 182 tourism) with unique experience types integrated.
    - **Hobbies & Leisure**: 300 non-competitive activity profiles generated for Botswana districts.
    - **Competitions**: 40+ corporate, local, and regional leagues added.
    - **Community**: Full dataset for Bulletin, Lost & Found, Jobs, and News Flash now live.
- **Feature Foundations**:
    - **Goals & Pursuits**: Full feature integrated with 600+ templates, multi-user support (Solo/Duo/Group), and offline-first IndexedDB storage. Replaces legacy Tracker.
    - **Business Directory**: 40+ businesses per category generated and mapped.
- **Guardian Handshake**: User persona system and profile switcher fully functional for demo.

---

## THE BOTSWANA CONTEXT: WHY MIZANO EXISTS

### The Problems We Solve

1. **Data Poverty:** Most Batswana rely on social bundles (WhatsApp/Facebook) with limited general data. Traditional apps are too heavy.
2. **Fragmented Communities:** No centralized way to discover local games, mentors, equipment, or venues in neighborhoods like Block 3, Broadhurst, or rural villages.
3. **Youth Talent Gap:** Bright athletes lack visibility for scholarships; schools have no digital infrastructure for inter-house or national leagues.
4. **Offline Reality:** Intermittent connectivity means apps must work without Wi-Fi—critical for Game Cubes (physical hubs) and field-based activities.
5. **Safety for Minors:** No existing platform ensures three-way verification (Guardian-School-Platform) for under-16 participation.
6. **Equipment Access:** Borrowing soccer balls, chess boards, or volleyballs is informal with no accountability (theft/damage).
7. **Matchmaking Chaos:** Finding a goalie for a pickup game or enough players for a tournament happens via word-of-mouth with high no-show rates.
8. **Competition Organization:** No simple tool to organize everything from grassroots tournaments to national leagues without expensive software.

### Our Solution Philosophy

**"Low-Data, High-Trust, Offline-Ready"**

- **WhatsApp/Facebook-First:** No in-app chat—deep links launch users into platforms they already trust and have free data for.
- **2D Minimal Design:** Flat design with white (#FFFFFF) to light grey (#F5F5F5, #EEEEEE) backgrounds. No shadows, gradients, or 3D effects.
- **Color Psychology:** 7-color transparent border system (70% opacity) for instant visual scanning: Orange (Live), Yellow (Upcoming), Charcoal (Finished), Green (Recruiting), Blue (Learning), Pink (Voting), Light Blue (Official).
- **Village-Free Model:** All features free in rural areas; monetization focuses on cities, transactions (5% commissions), and institutional value.
- **Offline Syncing:** Equipment ledgers, match rosters, and Bluetooth sign-ups save locally and sync every 15 minutes when online.
- **Responsible Gambling:** Betting-related content flagged and hidden unless users explicitly opt-in (default OFF).

---

## CORE DESIGN ARCHITECTURE

### Visual Language

**Background Hierarchy:**
- Primary: White (#FFFFFF)
- Secondary: Light Grey (#F5F5F5, #EEEEEE)
- Cards: White with 70% transparent colored borders stand out against subtle backgrounds

**Typography:**
- Sans-serif fonts (Roboto, Inter, or SF Pro Display)
- Clean, text-heavy design for low-data efficiency

**Button Style:**
- Text-based buttons in black, grey variations, or white-on-color
- Always high contrast for accessibility

**Data Efficiency:**
- WebP images (<200KB)
- Vector icons (<30KB)
- Text-first design philosophy
- IndexedDB for complex data caching
- HTML5 LocalStorage for user preferences

### Security & Privacy Architecture

- **No PII Storage:** Server never stores medical conditions, HIV status, or sensitive health data
- **Device-Only Medical Data:** Health information stored ONLY on device, never synced to server
- **Admin Counter System:** Backend tracks anonymous tallies (e.g., "15 users with medical alerts in Gaborone") NOT individual records
- **Guardian Handshake:** Digital approval workflow logs all Guardian actions (audit trail)
- **Under-16 Lockdown:** Minors cannot join competitive activities without Guardian approval
- **Betting Content:** Default HIDDEN; requires explicit opt-in toggle in Settings

---

## NAVIGATION STRUCTURE

### Top Bar (Level 1) - FIXED POSITION
**Height:** 56px  
**Background:** White (#FFFFFF)  
**Border Bottom:** 1px solid #E0E0E0  
**Auto-Hide:** Slides up when user scrolls down; reappears when scrolling up

**Components:**
- **Left:** Mizano Logo (blue owl icon, 40×40px) → Tap opens Settings menu
- **Center:** Horizontal Carousel with swipeable navigation tabs
  - Tabs: `Home` | `Sports` | `Hobbies` | `Lessons` | `Leisure` | `Events` | `Mine`
  - Active State: Bold text + 3px blue underline (#1E88E5)
  - Inactive State: Grey text (#757575)
  - User Customizable: Order/visibility in Settings → Navigation & Display

### Bottom Menu Bar (Level A) - FIXED POSITION
**Height:** 60px  
**Background:** Charcoal (#424242)  
**Auto-Hide:** Fades out after 3 seconds of inactivity; reappears on scroll/tap

**7 Icon Buttons (Left to Right):**
| Icon | Function | Color |
|------|----------|-------|
| ⚽ Activity Filter | Opens Activity/Sport selector | White |
| 📍 Places Filter | Opens location filter | White |
| ☰ Home Menu | Text list of navigation panels | White |
| 🔍 Search | Opens search field | Gold (#FFB300) |
| + Add | Event Lab & content creation | Gold (#FFB300) |
| 🔔 Notifications | Opens notification feed (badge shows max +888) | White |
| ≡ Hamburger Menu | Alternative navigation | White |

### Places Filter Bar (Level 2)
**Height:** 48px  
**Background:** Light Grey (#F5F5F5)

**Components:**
- **Left:** `GC · Area/Neighbourhood` format (e.g., "Gaborone · Block 3")
- **Right:** Card tally indicator (1 to +888, or `:-( ` for no results)
- **Dynamic Behavior:** Changing location instantly filters all content; persists across sessions

---

## THE 7-COLOR CARD SYSTEM

### Color Psychology Matrix

| Color | Hex | Opacity | Meaning | Status/Type | Psychological Trigger |
|-------|-----|---------|---------|-------------|----------------------|
| **Orange** | #FFA500 | 70% | **Live Now** | Activity State | Urgency, immediate action, "happening right now" |
| **Yellow** | #FFD700 | 70% | **Upcoming** | Activity State | Anticipation, urgency (deadline), preparation |
| **Charcoal** | #505050 | 70% | **Finished** | Activity State | Neutrality, completion, archive |
| **Green** | #70AD47 | 70% | **Recruiting** | Activity State | Growth, opportunity, "join us", openness |
| **Blue** | #4472C4 | 70% | **Interest** | Activity Type | Trust, learning, personal growth, calm focus |
| **Pink** | #FF69B4 | 70% | **Engagement** | Activity Type | Social interaction, voting, community voice |
| **Light Blue** | #87CEEB | 70% | **Ad/External** | Activity Type | Platform info, official announcements, brand trust |

### 11 Card Types

All cards share:
- **Width:** Full width minus 32px padding
- **Height:** Auto (minimum 80px)
- **Border Radius:** 8px
- **Border:** 2px solid with 70% transparency
- **Margin Bottom:** 12px
- **Shadow:** None (2D flat design)

#### 1. STANDARD MATCH CARD (Orange/Yellow/Charcoal)
**Purpose:** Team-based competitive matches

**States:**
- **Upcoming (Yellow):** Shows time (e.g., "23:30") + date (e.g., "28 Aug")
- **Live (Orange + Pulsing):** Shows live score (e.g., "2 - 1") with minute tracker (e.g., "63'")
- **Finished (Charcoal):** Shows final score, static border

**Layout:**
```
Team Name 1  [LOGO]  TIME/SCORE  [LOGO]  Team Name 2
                     DATE/VENUE
```

#### 2. MATCH-MAKING CARD (Green Border)
**Purpose:** Recruitment for teams needing players

**Content:**
- Position needed (e.g., "Need 1 Goalie")
- Location and time
- Urgency indicator ("RIGHT NOW!" for <2 hours)
- Contact method (WhatsApp button)

#### 3. REGISTRATION-STATE CARD (Yellow Border)
**Purpose:** Event registrations with deadlines

**Content:**
- Event name and type
- Deadline countdown (e.g., "Closes in 2 days")
- Progress bar for capacity
- Entry fee (if applicable)
- Quick register button

#### 4. TRAINING/LESSON PROGRESS CARD (Blue Border)
**Purpose:** Educational/skill development tracking

**Content:**
- Lesson title and number (e.g., "Lesson 4 of 5")
- Progress bar
- Next session date
- Instructor name

#### 5. STANDARD LESSON CARD (Blue Border)
**Purpose:** Single lesson or course overview

**Content:**
- Course title
- Duration and level
- Instructor
- Price (if applicable)

#### 6. QUICK POLL/VOTE CARD (Pink Border)
**Purpose:** Community engagement and voting

**Content:**
- Poll question
- Multiple choice options with radio buttons
- Vote count (if not anonymous)
- Time remaining
- Transitions to Charcoal after voting closes

#### 7. NEWS FLASH CARD (Light Blue Border)
**Purpose:** Official announcements from associations

**Content:**
- Association logo
- Headline
- Brief excerpt (2-3 lines)
- "Read More" link
- Timestamp

#### 8. EVENT INVITE/AD CARD (Light Blue Border)
**Purpose:** Sponsored events or platform announcements

**Content:**
- Banner image (WebP, <200KB)
- Event title
- Location and date
- CTA button

#### 9. IMAGE CARD (Light Blue Border)
**Purpose:** Visual content, business ads

**Content:**
- Full-width image (WebP optimized)
- Caption or headline
- Link to external content (WhatsApp/Facebook)

#### 10. CATEGORY CARD (Light Blue Border)
**Purpose:** Directory navigation (Business Panel)

**Content:**
- Category icon
- Category name (e.g., "Sports Equipment Shops")
- Item count (e.g., "12 businesses")
- Chevron for expansion

#### 11. CONTACT CARD (White/Grey Border)
**Purpose:** Business listings, venue contacts

**Content:**
- Business name and logo
- Category tags
- WhatsApp button
- Facebook page link
- Address (if venue)

---

## EVENT LAB: THE COMPETITION BUILDER

**Motto:** *"Perfect for organising anything"*

Event Lab is a **single-page vertically scrollable workspace** where competition organizers build, fund, recruit, and publish without ever leaving the page.

### Page Architecture

| Zone | Content | Behavior |
|------|---------|----------|
| **Sticky Header** | Competition title (editable), Save/Draft status, Offline indicator, Publish button | Always visible at top |
| **Main Canvas** | Stack of Main Section Cards (all independently collapsible) | Separated by dividers; no tabs |
| **Floating Action** | Quick Actions: Clone, Preview, Archive, Delete | Appears when scrolling; collapsible to "⚡" button |

### Collapsible Hierarchy System

| Level | Toggle Style | Default State | Usage |
|-------|--------------|---------------|-------|
| **Main** | `[ + ]` / `[ – ]` at card header | All expanded | Core Identity, Game Rules, Mizano Fund, etc. |
| **Sub** | `▶` / `▼` beside sub-heading | Collapsed | E.g., "Payment Channels" under Mizano Fund |
| **Sub-Sub** | Indented + small `▶` / `▼` | Collapsed | E.g., "Orange Money settings" under Payment Channels |

**No modal windows** unless absolutely required. All changes visible inline via expansion panels.

### Main Sections

#### 1. Core Identity (Always Expanded)
**Sub-sections:**
- **Branding:** Title, slug, description, logo/banner upload
- **Context:** Sport/Activity selection (unlocks Game Rules panel), Organization Type, Mission Profile, Governing Body Linkage, Sponsor Integration
- **Logistics & Reach:** Dates, entry fee, venue(s), visibility (Public/Private), Audience Targeting (unlocks relevant sub-sections)

#### 2. Game/Match Rules (Dynamic Template Engine)
**Appears only after Sport/Activity selection**

**7 Template Groups for 115+ Sports:**

| Template Group | Logic Key | Count | Sports Examples |
|----------------|-----------|-------|-----------------|
| **Time-Structured** | `timer_split` | 18 | Football, Rugby, Basketball, Hockey, Netball, Futsal, etc. |
| **Target‑Score / Set‑Based** | `set_cap` | 14 | Tennis, Volleyball, Padel, Squash, Badminton, Golf, Darts |
| **Performance / Measurement** | `leaderboard` | 58 | Athletics, Swimming, Cycling, Gymnastics, Dance, Diving |
| **Turn / Move / Cycle** | `turn_cycle` | 10 | Cricket, Baseball, Chess, Bridge, Curling |
| **Combat / Bout** | `bout_logic` | 11 | Boxing, Judo, Karate, Taekwondo, Wrestling, MMA, Fencing |
| **Multi‑Discipline / Hybrid** | `hybrid` | 7 | Modern Pentathlon, Triathlon, Biathlon, Esports |
| **User‑Defined / Custom** | `custom` | 4 | "🌐 Other", Parasports (Boccia, Goalball), Air Sports |

**Sub-sections:**
- **Basic Rules:** Dynamically injected fields based on template group (e.g., Game Length, Periods, Points per Set)
- **Advanced Rules:** Overtime, tie-breaks, penalties (collapsed by default)
- **Rare Overrides:** Golden goal, mercy rule, custom point values (power users only)

#### 3. Mizano Fund (Financial Management)
**Auto-expands if Entry Fee > 0**

**Sub-sections:**
- **Fund Purpose:** Entry Fees / Prize Pool / Charity / Equipment Drive / Crowdfund
- **Payment Channels:** Orange Money, Mascom MyZaka, BTC Smega (with QR previews)
- **Goal Tracker:** Progress bar, target amount, deadline
- **Refund Logic:** No refunds / Pro-rated / Full refund
- **Budget Breakdown:** Auto-pie chart with editable sliders

#### 4. Recruitment & Logistics
**Collapsed by default; expands when Audience Targeting set**

**Sub-sections:**
- **Seeking Free Agents:** Positions needed, skill level
- **Equipment Wishlist:** Item list with funding progress bars
- **Volunteer Recruitment:** Officials, coaches, parents
- **Hobbyist Discovery:** Interest tags, browse local hobbyists
- **Transport & Carpool:** Carpool board, departure points

#### 5. Eligibility & Rosters
**Team management, player age restrictions, Guardian requirements**

#### 6. Format & Scheduling
**Bracket generator, round-robin, league table, match calendar**

#### 7. Officials & Fair Play
**Referee assignments, protest procedures, disciplinary system**

#### 8. Promotion & Discovery
**SEO settings, social sharing, featured placement (paid)**

---

## PAGE FLOW ARCHITECTURE

### Entry Points (Pre-Authentication)

```
[Splash Screen] (2 seconds)
    ↓
[Login Page]
    ├→ About Us (link) → Back to Login
    └→ (Successful login) → Homepage
```

### Core Navigation Hub (Post-Authentication)

```
[Homepage] ←─┬─→ [Sports Page]
             ├─→ [Hobbies Page]
             ├─→ [Lessons Page]
             ├─→ [Leisure Page]
             ├─→ [Events Page]
             └─→ [Mine Page]
```

**All core pages share:**
- Top Bar: Horizontal carousel (swipe/tap to switch)
- Bottom Menu: 7 icons
- Back Navigation: Android back button returns to Homepage

### Homepage Interaction Map

**Top Bar:**
- Mizano Logo Tap → Settings Menu (full-screen overlay)
- Horizontal Carousel Swipe/Tap → Switch to different main page

**Places Filter Bar:**
- Tap "GC · Area/Neighbourhood" → Location Selector Dropdown → Updates Drop Field

**Drop Field:**
- Tap Match Card → Activity Detail Page
- Tap Registration Card → Registration Form Page
- Tap News Flash Card → Article/News Detail Page
- Tap Poll Card → Submit vote inline (no navigation)
- Tap Lesson Card → Lesson Detail Page
- Swipe Left on Card → Add to Favorites
- Swipe Right on Card → Ignore/Remove from timeline

**Bottom Menu:**
- Activity Icon → Expand Level B: Activity Filter
  - Select Sport → Update Drop Field
  - Tap Clock Icon → Expand Level C: Time Filter
- Places Icon → Expand Level B: Places Filter Panel
  - Tap Calendar Icon → Expand Level D: Date Filter
- Home Menu Icon ☰ → Navigation Menu Overlay
- Search Icon → Search Interface (replaces Drop Field)
- + Icon → Add Menu Overlay
  - Create Event/Match → **Event Lab**
  - Create Group/Club → Group Registration Flow
  - Add Business → Business Onboarding Flow
  - Add Venue → Venue Form
  - Post to Bulletin → Bulletin Editor
  - Join Existing Group → Search Interface (Groups)
- Notifications Icon → Notifications Panel
  - Tap notification → Navigate to relevant page
  - Swipe Left → Delete
  - Swipe Right → Mark as read
- Hamburger Icon ≡ → Alternative Navigation Menu

### Activity Detail Page Flow

**From:** Any Drop Field Card Tap

**Tabs:**
- **Details** (default)
  - View on Map → Opens map app
  - Get Directions → Opens navigation app
  - WhatsApp Organizer → WhatsApp with pre-filled message
  - Join Match → Registration Form OR Guardian Approval Request
- **Participants**
  - Player/Team roster
  - Call-outs (if recruiting)
  - Guardian approval status (for minors)
- **Updates**
  - Live score updates (15-min sync)
  - Match commentary
  - Incident reports
- **Streams & Media**
  - Fan-submitted Facebook Live links
  - Photo galleries
  - "Add Your Stream" button (if Creator enabled)
- **Sponsorship**
  - Sponsor-a-Game progress bars
  - Sponsor recognition
  - Contribute button

**Actions:**
- Back Arrow → Return to previous page
- Share Button → Native share sheet (WhatsApp/Facebook)
- Favorite Star → Toggle favorite (no navigation)

---

## TWELVE PROFILE TYPES & PERMISSIONS

### Free Profiles

1. **Browser** — Unregistered; teaser access, swipe panels, no tap details
2. **User** — Registered base; full swipe, favorites, Bulletin, non-competitive joins
3. **Player** — Upgrade via form; competitive joins, health logs, Borrow Score, call-out targets
4. **Mentor** — Sign-up form; guides sessions, indexed for Creator invites, mentee tallies
5. **Guardian** — Required for U16; approves profiles/joins, dashboard monitoring, injury alerts
6. **Creator** — Organizes single events; toggles (streams, weather), rosters, call-outs, sponsorship
10. **Staff** — Internal Mizano; manages Game Cube ledgers, moderates Bulletin, verifies ratings
11. **Admin** — Full oversight; analytics, fees, waivers, audit trails

### Paid Profiles (Village Waivers)

7. **Group/Club** — Teams/clubs; recurring events, wishlists, shared trophies (free in villages if non-profit)
8. **Business** — Clinics, gyms; lists services, sponsors, quick-apply responses (free in villages for non-profits)
9. **Association** — BFA, scouts; News Flash, tournament verification, player tallies (free in villages)
12. **Educational Institution** — Schools; national leagues, bulk student management, talent flagging (free for rural/government schools)

### Educational Sub-Profiles (Managed by Schools)

- **Teacher/Coach** — Create class matches, log student stats, manage attendance
- **Student** — Linked to Player profile; auto-updates with school representation

**Three-Way Connection:** Guardian-School-Mizano handshake for minor safety

---

## GUARDIAN & SCHOOL SAFEGUARDS

### Guardian Controls

- Create/approve minor profiles (U16 mandatory Guardian link)
- Dashboard: Monitor activities, approve joins/RSVPs, view rosters
- **AcademicAlert:** Pause Player's match joins if grades low ("Bright Minds" priority)
- Injury alerts pushed immediately
- **Security Log:** Shows every Creator/Association view of child's profile (scouting transparency)

### School Safety

- Bulk student upload by Class/Grade
- **Private academic data** (only School + Guardian see); **public sports stats** (if approved)
- WhatsApp Broadcast Channels (not groups) for student communication
- Teacher/Coach manages class-level activities

### Guardian-School Handshake

1. School registers student
2. Guardian receives notification to link profiles
3. Guardian taps "Approve" in dashboard
4. Three-Way Handshake complete
5. Logs for audit trails

---

## COMMUNITY FEATURES

### The "Bulletin" Feed
- Low-data **text-only** digital notice board
- Content: Jobs, funeral notices, community events, lost items
- Users/Players post; Staff moderates
- **Local Job Quick-Apply:** One-tap "Send my Profile" to job poster

### Lost & Found
- Photo-log of items left at parks/fields
- **Boost Feature:** Pay P2.00 to send area-wide call-out about lost item

### Team "Call-Outs"
- Low-data notifications: "Block 3 needs a Goalie right now!"
- Shows on Dynamic Activity Cards (badge/icon)
- Filter in search: "Has Call-Outs"

### Sponsor-a-Game
- Teams/Clubs/Creators tap button → opens sponsorship page
- Shows goals: Money, equipment, other resources
- Progress bars (e.g., "P200/500 Funded", "3/10 Soccer Balls")
- Local businesses/individuals contribute
- **Mizano takes 5% of monetary sponsorships only**
- Sponsors get rewards/recognition (digital badges, Activity Page shoutouts)

### The "Archive" Library
- Links to Facebook galleries of historic local sports moments
- Keeps "Vision" alive for grassroots pride
- Filtered by sport, location, decade

### Match "Referee" Rating
- Rate local volunteer referees (1-5 stars) for fairness
- Builds trust in community officiating
- Similar to Borrow Score system

### Incentivized Spectator Check-In
- Spectators tap "I'm Here" at matches
- Helps track game popularity for planning
- Potential rewards (e.g., "Attend 5 games, get digital badge")

### CV Builder
- Player stats auto-generate "Sports CV"
- Exports as PDF (tiny fee)
- Includes: School, achievements, certifications, health notes, fitness levels
- Used for scholarship applications

### Weather Info
- Captured during event creation for outdoor activities
- Displayed on Activity Pages
- Alerts if conditions change

### Mentorship Sign-Up
- Profiles opt-in to be "discoverable" for coaching roles
- Creators see tally of interested Mentors with demographics
- Targeted notifications for training/clinics

### Equipment "Wishlist"
- Teams/Clubs list needed gear
- Community/Businesses see wishlists, can sponsor
- Similar workflow to Sponsor-a-Game

### Local Association "News Flash"
- Text-only feed from official bodies (e.g., BFA)
- Dedicated filter in search
- Verified tournament announcements, rule changes, national team news

### First-Aid Directory
- Settings → button for "Nearest Clinic" or "On-site First Aider"
- Based on user's area/location
- Critical for match injuries

---

## VENUE LISTING & BOOKING

### Two-Tier System

#### Free Listing
- Venues (fields, courts, halls) create basic profile
- Shows: Name, location (offline map compatible), amenities, contact (WhatsApp/Facebook)
- Visible in search results

#### Paid Broadcasting (Businesses Only)
- **Standard:** 5% per booking (venue sets price)
- **Instant Book:** 10% per booking (auto-approval feature)
- Priority placement in search results
- Analytics on booking trends

**User Flow:**
1. Search → filter by venue type, location, availability
2. View venue details, photos, pricing
3. Tap "Book" → redirected to WhatsApp/Facebook for confirmation (no in-app payments to venues)
4. Mizano tracks booking for commission calculation

---

## BETTING AWARENESS (NOT PROMOTION)

**Critical Distinction:** Mizano does NOT facilitate gambling—only responsible awareness.

**Goal:** Attract Botswana Gambling Authority partnership through ethical approach.

**Implementation:**
- **Default State:** All betting-related content **HIDDEN**
- **Opt-In Required:** Users must explicitly toggle ON in Profile Settings → "Responsible Gambling Awareness"
- Once activated, users see:
  - Educational materials (dangers of addiction, help resources)
  - Sponsored events from betting companies (flagged as such)
  - Gambling Authority adverts/campaigns
- **Never:** In-app betting, odds display, bet placement, affiliate links to betting sites

**Flagging System:**
- All gambling-related content tagged in backend
- Conditional rendering based on user's toggle state
- Staff moderates to ensure compliance

---

## SETTINGS MENU STRUCTURE

### 6 Collapsible (+/-) Sections

#### 1. Account & Profile
- Edit Profile (Name, Village/Town/Area)
- Player Bio & Stats (Sports CV, school, health logs)
- Guardian Dashboard (visible only to Guardians)
- Switch to Mentor/Creator (text buttons for upgrade forms)
- Delete Account

#### 2. My Activity Hub
- Borrow Score & History
- My Wishlist (equipment/events flagged)
- Match History (export PDF for fee)
- My Sponsorships (given/received tracker)

#### 3. Navigation & Display
- Reorder Swipe Panels (drag-to-reorder list)
- Default Location (Gaborone/Village/Area)
- Dark Mode Toggle

#### 4. Data & Offline Sync
- Offline Map Tiles (download/update 1MB Gaborone map)
- Manual Sync Now
- Data Saver Mode (WebP images on/off; text-only icons)
- Clear Cache

#### 5. Community & Safety
- **Responsible Gambling Awareness** (hard-switch, defaults OFF)
- Mentorship Visibility (discoverable toggle)
- First-Aid Directory
- Report a Problem

#### 6. About & Legal
- About Us (Mizano story, vision)
- Terms of Service
- Privacy Policy (school/health data handling)
- Version Info (e.g., "Mizano v2.0 - Gaborone Edition")

**Guardian-Specific:**
- Security Log (shows every Creator/Association view of child's profile)

---

## MONETIZATION MODEL: "NON-SLEAZY" REVENUE

**Philosophy:** Villages free; money from reach, transactions, physical value.

### Free Zones (Village Waivers)
- All User/Player/Mentor/Guardian/Creator profiles
- Group/Club (if non-profit)
- Business (if non-profit community service)
- Association (if local/community body)
- Educational Institution (if rural/government school)

### Revenue Streams

#### 1. Sponsorship Commissions (5%)
- Take 5% of ALL "Sponsor-a-Game" monetary funds raised in-app
- Transparent to users (shown at payment)
- Zero-friction PayPal/MTN Mobile Money/Orange Money

#### 2. Business Subscriptions
- City-based Businesses: Monthly fee for "Verified" badge
- Tier 1 (Clinics, Physio): ~P50-100/month
- Tier 2 (Gyms, Equipment Shops): ~P100-200/month
- Benefits: Priority search placement, analytics dashboard

#### 3. Posted Ads
- WebP format (low-data, 50-100KB max)
- Displayed in Shopping/Shops/Businesses panels
- Linked to Facebook/WhatsApp only (no external browsers)
- **Data-Free Advertising:** Premium rate for ads whitelisted on zero-rated FB bundles

#### 4. Venue Broadcasting Fees
- **Listing:** Free for all venues
- **Broadcasting (5%):** Venue pays 5% per booking (venue sets price)
- **Instant Book (10%):** Venue pays 10% for auto-approval feature

#### 5. Health Report Export
- Players pay P5-10 to export "Mizano Health & Stats History" as PDF
- Professional branding for school/club applications

#### 6. Lost & Found Boost
- P2.00 to send area-wide call-out about lost item
- Low barrier; high reach

#### 7. Tournament Management Suite
- One-time fee (P50-100) for Leagues to use:
  - Bracket generator
  - Referee rating system
  - Auto-scheduling
  - Stats aggregation

#### 8. School-Specific Revenue

**a) School League Subscriptions**
- Large private schools: Annual fee for League Management Suite
- Village/government schools: Always free

**b) Recruitment Discovery Fees**
- Professional clubs/Associations pay small fee for School Talent Analytics
- Example query: "Show me every U15 striker in Gaborone with 10+ goals this term"
- Protects student privacy (no individual profiles sold; aggregate queries only)

**c) Digital Merchandising**
- Schools sell "House Tokens" or digital badges (P1-5)
- Students display on profiles (e.g., "Blue House Champion 2026")
- Mizano takes 20% cut

**d) Exam/Sports Result PDF**
- Small admin fee (P10-20) for branded "Student-Athlete Portfolio"
- Used for secondary school/university applications

**e) Institutional Sponsorship**
- Local businesses sponsor school teams via in-app
- Mizano takes 5% of sponsorship (same as general Sponsor-a-Game)

---

## TECHNICAL ARCHITECTURE

### Frontend
- **Platform:** HTML5 Web App → Android APK (via Cordova or Capacitor)
- **Framework:** Vanilla JavaScript or lightweight framework (React/Vue for complexity)
- **UI Paradigm:** 
  - Horizontal carousel top navigation with swipeable tabs
  - Vertical infinite scroll Drop Field with lazy-loaded cards
  - 7-icon bottom menu with expandable panels
  - +/- collapsible sections throughout
- **Design Language:** 2D flat, minimal, text-heavy, 7-color border system (70% opacity)
- **Offline Storage:** 
  - HTML5 LocalStorage for user preferences
  - IndexedDB for complex data (competitions, rosters, match history)
  - Sensitive medical data: Device-only (never synced to server)
- **Animations:** 300ms horizontal slides, smooth expand/collapse, subtle edge glow

### Backend
- **Primary Data Store:** Google Sheets API v4 (lightweight, accessible via Drive)
- **Real-Time Sync:** 15-minute intervals for rosters, ledgers, ratings
- **Conflict Resolution:** Last-write-wins with timestamp tracking; Staff override at Game Cubes
- **Authentication:** Firebase Auth (lightweight, works offline)
- **Admin Counter System:** Backend aggregates anonymous tallies (e.g., "15 users with medical alerts in Gaborone") without storing individual PII

### Integrations
- **WhatsApp:** `wa.me` deep links with pre-filled messages (Column AV: PreFillMessage)
- **Facebook:** Graph API for event mirroring, page verification
- **Google Maps:** Static tile downloads (1MB Gaborone neighborhoods)
- **Weather API:** OpenWeatherMap (lightweight, cached forecasts for outdoor events)
- **Payment Gateways:** MTN Mobile Money, Orange Money, PayPal (Botswana-optimized)
- **Bluetooth:** Local peer-to-peer for offline match sign-ups

### Data Schema Highlights
**Key Columns in Master Data Sheet:**

| Column | Name | Purpose |
|--------|------|---------|
| AM | SchoolID | Unique school identifier (e.g., "SCH-GAB-WEST-01") |
| AN | GradeYear | Student class/grade level |
| AO | TeacherLead | Link to Teacher/Coach profile |
| AP | HouseColor | Inter-house competition tracking |
| AQ | NationalLeagueID | Links school matches to official leagues |
| AR | AcademicAlert | Boolean—Guardian pauses joins if grades low |
| AS | WhatsAppNumber | International format (+267...) for wa.me links |
| AT | FBPageLink | Official Facebook Business/Association page |
| AU | GroupChatURL | WhatsApp Team/Class group invite link |
| AV | PreFillMessage | Custom text for "WhatsApp Organizer" button |

### Performance Targets
- **App Size:** <20MB initial download
- **Offline Functionality:** 100% of core features (view, join, borrow, sync queue)
- **Sync Time:** <2 seconds for 15-minute roster update (max 50 users per event)
- **Search Latency:** <500ms for filtered results (local cache + backend)
- **Map Tiles:** 1MB for full Gaborone neighborhoods (covers ~200km²)
- **Card Rendering:** 60 FPS on standard 2GB RAM devices

---

## USER JOURNEYS (SAMPLE SCENARIOS)

### Scenario 1: Village Player (Offline)
**Profile:** Player, 22-year-old male in rural Molepolole

1. Opens Mizano at home (no data, no Wi-Fi)
2. Swipes to "Sports" panel → sees cached soccer matches
3. Taps "Saturday Game in Molepolole" → Activity Page loads from local storage
4. Taps "Join via Bluetooth" → saves locally
5. Next day at Game Cube (has Wi-Fi) → app auto-syncs join, updates roster
6. Borrows soccer ball via Staff-managed ledger (offline check-out)
7. Returns ball, both parties rate 5 stars → Borrow Score improves

### Scenario 2: Urban Guardian (Online)
**Profile:** Guardian, 38-year-old mother in Gaborone Block 3

1. Signs up, creates minor profile for 14-year-old daughter
2. Daughter's school (Educational Institution profile) uploads bulk students → Guardian receives link notification
3. Approves link via "Guardian Dashboard" → Three-Way Handshake complete
4. Creator organizes U15 netball match → daughter taps "Join"
5. Guardian receives push notification: "Approve join request?"
6. Taps "Approve" → WhatsApp prompt: "Join the Team WhatsApp Group here"
7. Match day: "Active Now" notification with Facebook Live link
8. Watches stream on zero-rated FB data
9. Match ends → views recap, daughter's stats auto-update in Sports CV

### Scenario 3: School Coach (Hybrid)
**Profile:** Teacher/Coach at Northside Primary (Educational Institution sub-profile)

1. School Admin bulk-uploads 200 students by class
2. Coach creates "Inter-House Soccer Tournament" in Event Lab
   - Selects Sport: Soccer (unlocks Time-Structured template)
   - Sets Basic Rules: 2×20min halves, 5-min halftime
   - Configures Eligibility: U13 only, Red/Blue/Yellow/Green houses
   - Enables Mizano Fund for trophy purchase (P500 goal)
   - Sets Recruitment: Seeking volunteer referees
3. Publishes competition → appears on Sports panel with Yellow border (Upcoming)
4. Match results logged after each game → stats aggregate to National Leaderboard
5. BFA Association scouts use Recruitment Discovery (pay small fee) → query "Top U13 strikers in Gaborone"
6. Coach's student flagged → "News Flash" sent to BFA
7. Parent exports student's Sports CV PDF (pays P10) for secondary school application

### Scenario 4: Business Sponsor (City)
**Profile:** Business, local bakery in Gaborone city center

1. Pays P50/month for "Verified" badge
2. Browses "Sponsor-a-Game" opportunities → finds youth chess club needing P500 for tournament fees
3. Taps "Sponsor" → MTN Mobile Money payment (Mizano takes 5%)
4. Gets recognition: Digital badge on club's Activity Page ("Sponsored by Bakery X")
5. Shares Facebook post via "Share to Facebook" button → brings zero-rated FB users to Mizano
6. Analytics dashboard shows 50 new views of bakery's Businesses panel listing

---

## KEY DIFFERENTIATORS

### vs. Facebook Events
- **Offline-first:** Facebook requires constant data; Mizano works fully offline
- **Equipment ledger:** No analog in FB for community resource sharing
- **Guardian controls:** No three-way minor safety handshake
- **Botswana-specific:** WhatsApp deep links, village waivers, local monetization
- **Event Lab:** No comprehensive competition builder with 115+ sport templates

### vs. Meetup
- **Data cost:** Meetup is image-heavy; Mizano is text-first with optional WebP
- **Youth focus:** No school integration, talent pipelines, or Sports CV builder
- **Offline:** Meetup is online-only
- **Card System:** No visual color psychology for instant scanning

### vs. TeamSnap (Sports Management)
- **Community-wide:** TeamSnap is team-focused; Mizano is neighborhood-wide (discovery + participation)
- **Free model:** TeamSnap charges teams; Mizano free in villages
- **Cultural fit:** No WhatsApp/Facebook integration; not built for data-scarce markets
- **Event Lab:** TeamSnap focuses on existing teams; Mizano builds entire competitions from scratch

### vs. GoFundMe
- **Activity-embedded:** Sponsor-a-Game is contextual (within match/event pages); GoFundMe is isolated campaigns
- **5% commission:** GoFundMe takes 2.9% + payment fees; Mizano transparent 5% only on money
- **Equipment/resources:** GoFundMe is money-only; Mizano supports in-kind (soccer balls, venue time)

### vs. Generic Event Management Software
- **Cost:** Most charge per event or user; Mizano free for villages
- **Complexity:** Overly complex for grassroots; Mizano single-page Event Lab
- **Sport Templates:** No pre-configured rules for 115+ sports
- **Mobile-First:** Most are desktop-heavy; Mizano is mobile-native HTML5

---

## SUCCESS METRICS (KPIs)

### Phase 1: Launch (Months 1-6)
- **User Registrations:** 10,000 Users/Players across Gaborone
- **Guardian Links:** 500 Guardian-Minor handshakes completed
- **Offline Sign-Ups:** 1,000 Bluetooth/offline match joins
- **Equipment Borrows:** 2,000 check-out/check-in cycles with <5% disputes
- **Sponsor-a-Game:** P50,000 total raised (P2,500 commission to Mizano)
- **Event Lab Competitions:** 100 competitions created (50 published, 50 drafts)
- **Integrated Events:** 212 (30 Sponsored, 182 Tourism)
- **Hobby Activities:** 300+ District-wide profiles

### Phase 2: School Expansion (Months 7-12)
- **Educational Institutions:** 20 schools onboarded (10 rural free, 10 urban paid)
- **Student Profiles:** 5,000 students linked via Guardian-School handshake
- **National Leaderboard:** 500 inter-school matches logged
- **Recruitment Queries:** 50 paid queries from BFA/Associations
- **Sports CV Exports:** 200 PDF downloads
- **Event Lab Usage:** 500 competitions created; 70% publish rate

### Phase 3: National Scale (Year 2)
- **Geographic Reach:** Active in 15+ villages/towns beyond Gaborone
- **Business Subscriptions:** 100 verified businesses paying monthly
- **Venue Bookings:** 500 bookings/month (P25,000 commission)
- **Daily Active Users:** 20,000 DAU
- **Betting Opt-Ins:** <5% of users (proving responsible approach to Gambling Authority)
- **Event Lab Competitions:** 2,000 total; 1,500 published; covering all 7 template groups

---

## RISKS & MITIGATIONS

### Risk 1: Data Costs Kill Adoption
**Mitigation:**
- WhatsApp/Facebook-first strategy (zero-rated bundles)
- Data Saver Mode (text-only)
- 1MB max offline map tiles
- No in-app video (external FB Live links only)
- WebP images <200KB

### Risk 2: Guardian Non-Compliance
**Mitigation:**
- Hard block: U16 cannot join without Guardian approval
- Push notifications + SMS fallback for Guardian alerts
- Security Log transparency (every profile view logged)

### Risk 3: Equipment Theft/Damage
**Mitigation:**
- Dual-rating system (both parties submit scores)
- Borrow Score restrictions (low scores = limited access)
- Staff override at Game Cubes (physical verification)
- Insurance option (P1 per borrow, covers damage)

### Risk 4: Low Monetization in Villages
**Mitigation:**
- Village features are free by design (community investment)
- Revenue from cities, schools, transactions (5% commissions)
- Long-term: Village users upgrade to paid profiles when moving to cities

### Risk 5: School Privacy Concerns
**Mitigation:**
- Private academic data (only School + Guardian see grades)
- Public sports stats require Guardian approval toggle
- Three-Way Handshake (School-Parent-Mizano) for all minors
- GDPR-compliant (though Botswana has lighter regs; over-comply for trust)
- Medical data stored device-only (never synced to server)

### Risk 6: Facebook/WhatsApp API Changes
**Mitigation:**
- Deep links (wa.me) are stable, URL-based (not API-dependent)
- Facebook Graph API fallback: Manual share via native OS share sheet
- Local storage ensures app functions even if external links break

### Risk 7: Event Lab Complexity Overwhelms Users
**Mitigation:**
- Single-page design (no multi-step wizards)
- Sensible defaults for all 115+ sports
- "Quick Start" templates for common competitions
- Inline help text and tooltips
- Video tutorials for power users

---

## ROADMAP

### Q1 2026: MVP Launch (Gaborone Only)
- [x] Core navigation (Top Bar carousel, Bottom Menu 7 icons, Places Filter)
- [x] Drop Field with infinite scroll
- [x] 11 Card Types (7-color border system)
- [x] Dynamic Activity Cards (9 states)
- [x] User/Player/Guardian profiles (Handshake Logic)
- [ ] Offline match sign-ups
- [x] WhatsApp deep links
- [ ] Equipment ledger (Game Cube-based)
- [x] **Event Lab Beta:** Core Identity + 3 template groups (Time-Structured, Target-Score, Performance)
- [x] **Data Expansion**: 212 Events, 300 Hobbies, 40+ Competitions, 50+ Associations.

### Q2 2026: Community Features
- Bulletin Feed
- Lost & Found
- Sponsor-a-Game (5% commission)
- Team Call-Outs
- Facebook Live integration
- Persistent Notification Dropdown
- Mentor/Creator profile upgrades
- **Event Lab Full:** All 7 template groups, 115+ sports

### Q3 2026: School Integration
- Educational Institution profile
- Teacher/Coach sub-profiles
- Guardian-School handshake
- Bulk student upload
- Internal leagues (inter-house)
- National Leaderboard beta
- **Event Lab School Mode:** Automated BISA/BOPSSA compliance

### Q4 2026: National Expansion
- Full 7-panel carousel (add Discovery, Groups, Leaderboard sections)
- Business/Association paid profiles
- Venue booking (5%/10% commissions)
- National school leagues live
- Recruitment Discovery fees
- Sports CV PDF exports
- Tournament Management Suite
- **Event Lab Pro:** Multi-tournament management, advanced analytics

### 2027: Advanced Features
- Dark mode
- Referee rating system
- CV Builder (auto-generate from stats)
- Betting Awareness (Gambling Authority partnership)
- Archive Library (FB gallery links)
- Incentivized spectator check-ins
- Data analytics dashboard (for Admins)
- **Event Lab Enterprise:** API access for national federations

---

## TEAM REQUIREMENTS

### Core Roles (Phase 1)
- **Product Owner:** You (vision, feature prioritization, Botswana context)
- **Frontend Developer (2):** HTML5/CSS3/JavaScript, card system, Event Lab UI
- **Backend Developer (1):** Google Sheets API integration, sync logic, IndexedDB
- **UI/UX Designer (1):** 2D minimal design, 7-color system, +/- toggle patterns, Event Lab UX
- **QA Tester (1):** Offline scenarios, profile permissions, Guardian flows, Event Lab templates

### Expansion Roles (Phase 2-3)
- **Community Manager:** Game Cube Staff coordination, Bulletin moderation
- **Partnerships Lead:** Schools, BFA, Gambling Authority, businesses
- **Data Analyst:** Leaderboard algorithms, recruitment queries, KPI tracking
- **Additional Developers (2):** Payment integrations, school features, venue booking, Event Lab advanced features
- **Sports Rules Expert:** Verify and maintain 115+ sport templates in Event Lab

---

## CONCLUSION

Mizano is more than a sports app—it's **infrastructure for Botswana's grassroots community**. By solving real problems (data poverty, fragmented activities, youth talent gaps, minor safety, competition organization complexity) with culturally-attuned solutions (WhatsApp/Facebook-first, offline-ready, village-free, Event Lab single-page builder), we create a platform that's:

1. **Sustainable:** Non-sleazy monetization (transactions, reach, institutional value)
2. **Scalable:** Village → Town → City → National pipeline
3. **Safe:** Guardian controls, three-way handshakes, betting safeguards, device-only medical data
4. **Efficient:** Offline-first, 15-min syncs, text-heavy UI, 1MB maps, 7-color visual scanning
5. **Community-Driven:** Call-outs, Bulletin, Sponsor-a-Game, peer ratings
6. **Comprehensive:** Event Lab supports 115+ sports across 7 template groups with single-page workflow
7. **Intuitive:** Color psychology drives instant recognition; no learning curve for status understanding

**Next Steps:**
1. Finalize master data schema (all columns AM-AV)
2. Create UI/UX wireframes (card design system, Event Lab flow, navigation patterns)
3. Build component library (11 card types, +/- collapsible system, 7-icon bottom menu)
4. Develop Event Lab template engine (7 groups, dynamic field injection)
5. Develop MVP (Q1 2026 scope)
6. Pilot with 2-3 Gaborone neighborhoods + 1 school + 5 test competitions
7. Iterate based on offline usage patterns, Event Lab usability, and feedback
8. Scale nationally (Q4 2026)

**Vision Statement:**
*"By 2027, every neighborhood in Botswana will have a Game Cube. Every child will have a Sports CV. Every local match will have a livestream. Every organizer will use Event Lab to build competitions in minutes. And every community will thrive—online and offline."*

---

**Document Owner:** Mizano Founding Team  
**Last Updated:** February 13, 2026  
**Version:** 2.0  
**Status:** Comprehensive Foundation Document (For Internal & Investor Use)

**Key Updates from v1.0:**
- Added comprehensive Card Design System (7-color border psychology, 11 card types)
- Integrated Navigation Structure (Top Bar carousel, 7-icon Bottom Menu, Places Filter)
- Added Event Lab Architecture (single-page workspace, 7 template groups, 115+ sports)
- Documented Page Flow Architecture (entry points, interaction maps, navigation patterns)
- Enhanced Design Guide principles (2D minimal, offline-first, device-only medical data)
- Updated KPIs to include Event Lab metrics
- Expanded Technical Architecture with HTML5 details and storage specifications
