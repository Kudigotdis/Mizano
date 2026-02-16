# MIZANO DESIGN GUIDE
**Version 1.5 | HTML5 Web App → Android APK**  
*Botswana's Grassroots Sports & Community Platform*

---

## 🎨 CORE DESIGN PHILOSOPHY

### Visual Language
- **2D Minimal Design:** No shadows, gradients, or 3D effects
- **Background Hierarchy:** White (#FFFFFF) to Light Grey (#F5F5F5, #EEEEEE) gradients
- **Card Emphasis:** White cards with 70% transparent colored borders stand out against subtle backgrounds
- **Typography:** Clean sans-serif fonts (Roboto, Inter, or SF Pro Display)
- **Button Style:** Text-based buttons in black, grey variations, or white-on-color (always high contrast)
- **Data Efficiency:** WebP images (<200KB), vector icons (<30KB), text-first design

### Offline-First Architecture
- **Local Storage:** HTML5 LocalStorage for user preferences, IndexedDB for complex data (competitions, rosters)
- **Sensitive Data:** Medical/health information stored ONLY on device (never server)
- **Admin Counter System:** Backend tracks anonymous tallies (e.g., "15 users with medical alerts in Gaborone") NOT individual records
- **Sync Logic:** Auto-sync when online (user-configurable in Settings), manual sync button always available

### Security & Privacy
- **No PII Storage:** Server never stores medical conditions, HIV status, or sensitive health data
- **Guardian Handshake:** Digital approval workflow logs all Guardian actions (audit trail)
- **Under-16 Lockdown:** Minors cannot join competitive activities without Guardian approval
- **Betting Content:** Default HIDDEN; requires explicit opt-in toggle in Settings

---

## 📱 GLOBAL NAVIGATION STRUCTURE

### Top Bar (Level 1) - POSITION: FIXED
**Height:** 56px  
**Background:** White (#FFFFFF)  
**Border Bottom:** 1px solid #E0E0E0  
**Auto-Hide:** Slides up when user scrolls down; reappears when scrolling up

#### Left Section
- **Mizano Logo:** Blue owl icon (vector, <30KB)
  - **Tap Action:** Opens Settings menu (full-screen overlay)
  - **Size:** 40px × 40px

#### Center Section - Horizontal Carousel
- **Scroll Behavior:** Left-right swipe OR tap button
- **Navigation Items:** `Home` | `Sports` | `Hobbies` | `Lessons` | `Leisure` | `Events` | `Mine`
- **Active State:** Bold text + 3px blue underline (#1E88E5)
- **Inactive State:** Grey text (#757575)
- **User Customization:** Order/visibility configurable in Settings → Navigation & Display

**Technical Implementation:**
```html
<div class="top-carousel">
  <button class="nav-btn active">Home</button>
  <button class="nav-btn">Sports</button>
  <button class="nav-btn">Hobbies</button>
  <!-- Swipeable on mobile -->
</div>
```

---

### Bottom Menu Bar (Level A) - POSITION: FIXED
**Height:** 60px  
**Background:** Charcoal (#424242)  
**Auto-Hide:** Fades out after 3 seconds of inactivity; reappears on scroll or tap

#### 7 Icon Buttons (Left to Right)
| Icon | Function | Expands To | Color |
|------|----------|-----------|-------|
| **Activity Filter** (⚽) | Opens Activity/Sport selector | Level B | White |
| **Places Filter** (📍) | Opens location filter | Level B variant | White |
| **Home Menu** (☰) | Text list of navigation panels | Full-screen overlay | White |
| **Search** (🔍) | Opens search field | Replaces Drop Field | Gold (#FFB300) |
| **Add (+)** | Event Lab & content creation | Full-screen menu | Gold (#FFB300) |
| **Notifications** (🔔) | Opens notification feed | Slide-up panel | White |
| **Hamburger Menu** (≡) | Alternative navigation | Full-screen overlay | White |

**Notification Badge:**
- **Max Display:** +888 (if >888, shows "+888")
- **Position:** Top-right corner of notification icon
- **Style:** Red circle (#D32F2F) with white text

---

## 🏠 HOMEPAGE STRUCTURE

### Level 2: Places Filter Bar
**Height:** 48px  
**Background:** Light Grey (#F5F5F5)  
**Layout:** Flex container, space-between

#### Left Section
- **Format:** `GC · Area/Neighbourhood`
  - `GC` = ISO code for selected Village/Town/City (e.g., Gaborone)
  - Default Area: `All` (shows everything in selected city)
- **Tap Action:** Opens location selector dropdown
- **Font:** 14px, Grey (#616161)

#### Right Section
- **Card Tally Indicator:** Shows count of cards in Drop Field below
  - Range: `1` to `+888`
  - No Results: `:-(`
  - **Font:** 14px Bold, Blue (#1E88E5)

**Dynamic Behavior:**
- Changing location instantly filters ALL content in Drop Field
- Tally updates in real-time
- Persists selection across sessions (LocalStorage)

---

### Level 3: Drop Field (Infinite Scroll)
**Background:** White (#FFFFFF)  
**Padding:** 16px horizontal, 8px vertical  
**Scroll:** Infinite (lazy load cards as user scrolls)

#### Card Layouts (7 Types)

All cards share:
- **Width:** Full width minus 32px padding
- **Height:** Auto (minimum 80px)
- **Border Radius:** 8px
- **Border:** 2px solid with 70% transparency
- **Margin Bottom:** 12px
- **Font:** Roboto or Inter
- **Shadow:** None (2D flat design)

---

#### 1. STANDARD MATCH CARD
**Border Colors:**
- Orange (#FF6F00, 70% opacity) = Live Now
- Yellow (#FFC107, 70% opacity) = Upcoming
- Charcoal (#616161, 70% opacity) = Finished

**Layout:**
```
┌────────────────────────────────────────────┐
│ Getafe    [LOGO] [LOGO]    Alaves         │
│              23:30                         │
│             20 Aug                         │
└────────────────────────────────────────────┘
```

**Specifications:**
- **Team Names:** Far left/right, 16px Bold, Charcoal (#424242)
- **Team Logos:** 40px × 40px, centered between names
- **Time:** 24px Bold, Blue (#1E88E5), centered top
- **Date:** 14px Regular, Grey (#757575), centered bottom

**State Transitions:**
- **Live Now:** Border pulsing animation (0.7s ease-in-out loop)
- **Finished:** Time replaced by score (e.g., `2 - 1`), border turns Charcoal

**Tap Action:** Opens full Activity Page with streams, roster, stats

---

#### 2. REGISTRATION-STATE CARD
**Border Color:** Yellow (#FFC107, 70% opacity)

**Layout:**
```
┌────────────────────────────────────────────┐
│ Diacore Gaborone Marathon                  │
│        10km Fun Run · 27 Apr               │
│                     Closing in 2 Days →    │
└────────────────────────────────────────────┘
```

**Specifications:**
- **Event Name:** Left, 16px Bold, Charcoal (#424242)
- **Activity Type & Date:** Center, 14px Regular, Grey (#616161)
- **Countdown:** Right, 14px Bold, Yellow (#FFC107) with arrow icon

**Tap Action:** Opens registration form (Guardian approval required if User is U16)

---

#### 3. MATCH-MAKING CARD (Recruiting)
**Border Color:** Green (#4CAF50, 70% opacity)

**Layout:**
```
┌────────────────────────────────────────────┐
│ Recruiting                                  │
│    Sunday Social Football · 18:00          │
│    University of Botswana    Need 2 Defenders│
└────────────────────────────────────────────┘
```

**Specifications:**
- **Status:** Left, 14px Bold, Green (#4CAF50)
- **Event Details:** Center, 14px Regular, Charcoal (#424242)
- **Capacity Needed:** Right, 14px Bold, Green (#4CAF50)

**Tap Action:** Opens quick-join interface (WhatsApp organizer or in-app RSVP)

---

#### 4. TRAINING/LESSON PROGRESS CARD
**Border Color:** Blue (#1E88E5, 70% opacity)

**Layout:**
```
┌────────────────────────────────────────────┐
│ Beginner Tennis                            │
│ Lesson 3 of 5 · Backhand Technique         │
│ ████████████░░░░░░░░  80% Complete         │
└────────────────────────────────────────────┘
```

**Specifications:**
- **Course Title:** Top, 16px Bold, Charcoal (#424242)
- **Lesson Info:** Middle, 14px Regular, Grey (#616161)
- **Progress Bar:** Bottom, 4px height, Blue (#1E88E5) fill
- **Percentage:** Right of bar, 12px Bold, Blue (#1E88E5)

**Tap Action:** Opens lesson detail page (if Player/Mentor profile)

---

#### 5. STANDARD LESSON CARD
**Border Color:** Blue (#1E88E5, 70% opacity)

**Layout:**
```
┌────────────────────────────────────────────┐
│ Intermediate                                │
│ Traditional Dance Class · 14 Feb           │
│           Gaborone West Community Hall     │
└────────────────────────────────────────────┘
```

**Specifications:**
- **Skill Level:** Left, 14px Bold, Blue (#1E88E5)
- **Class Info:** Center, 14px Regular, Charcoal (#424242)
- **Venue:** Right, 12px Regular, Grey (#757575)

**Tap Action:** Opens lesson booking page (WhatsApp link or registration)

---

#### 6. NEWS FLASH CARD
**Border Color:** Light Blue (#03A9F4, 70% opacity)

**Layout:**
```
┌────────────────────────────────────────────┐
│ [IMG] │ BFA UPDATES                        │
│       │ Mogogi Gabonamong to host youth... │
│       │ 2 hours ago · Sport Botswana       │
└────────────────────────────────────────────┘
```

**Specifications:**
- **Thumbnail:** Left, 60px × 60px square, WebP format
- **Category Tag:** Top-right, 10px Bold, Blue (#1E88E5), ALL CAPS
- **Headline:** Middle-right, 14px Bold, Charcoal (#424242), max 2 lines
- **Timestamp:** Bottom-right, 12px Regular, Grey (#757575)

**Tap Action:** Opens full article (in-app browser or external link)

---

#### 7. QUICK POLL/VOTE CARD
**Border Color:** Pink (#E91E63, 70% opacity)

**Layout:**
```
┌────────────────────────────────────────────┐
│ Which stadium has the best atmosphere?     │
│                                            │
│  [ National Stadium ]  [ Lobatse Stadium ] │
└────────────────────────────────────────────┘
```

**Specifications:**
- **Question:** Top-center, 14px Bold, Charcoal (#424242)
- **Vote Buttons:** Bottom, 2-4 options, equal width, 12px Regular
  - Unvoted: White background, Pink border (#E91E63)
  - Voted: Pink background (#E91E63), white text
- **State Change:** After voting, border fades to Charcoal, shows results (%)

**Tap Action:** Submits vote, displays percentage breakdown

---

## 🔽 BOTTOM FILTER PANELS (Collapsible System)

### Level B: Activity Filter
**Trigger:** Tap Activity icon in bottom menu  
**Height:** 56px (collapsed), expands upward  
**Background:** Light Grey (#EEEEEE)

**Layout:**
```
┌────────────────────────────────────────────┐
│ All Sports ▼                     [Clock ⏰] │
└────────────────────────────────────────────┘
```

**Components:**
- **Activity Button:** Text showing current filter (default: "All Sports")
  - **Tap Action:** Expands to full-height scrollable list (130+ sports/activities)
  - **Font:** 14px Bold, Charcoal (#424242)
- **Time Filter Icon:** Right side, 24px × 24px
  - **Tap Action:** Opens Level C (Time Filter)

**Expanded State:**
- **Background:** White (#FFFFFF)
- **List Items:** 48px height each, left-aligned text
- **Active Item:** Blue background (#E3F2FD), blue text (#1E88E5)
- **Scroll:** Infinite scroll with search bar at top
- **Close:** Tap outside or selected item

---

### Level C: Time Filter
**Trigger:** Tap Clock icon in Level B  
**Height:** 48px  
**Background:** White (#FFFFFF)

**Horizontal Carousel:**
```
[All] [Past] [Yesterday] [Today] [Upcoming]
```

**Specifications:**
- **Buttons:** 80px width, 36px height, rounded 18px
- **Active:** Blue background (#1E88E5), white text
- **Inactive:** Light grey background (#F5F5F5), grey text (#757575)
- **Scroll:** Swipe left/right (mobile), click (desktop)

**Filter Logic:**
- Instantly updates Drop Field cards
- Persists selection until user changes it

---

### Level D: Date Calendar Filter
**Trigger:** Tap Calendar icon in Places Filter section  
**Height:** 240px (collapsed), expands upward  
**Background:** White (#FFFFFF)

**Top Section:**
```
┌────────────────────────────────────────────┐
│         ← February 2026 →                  │
└────────────────────────────────────────────┘
```

**Month Selector:**
- **Swipe Left/Right:** Navigate months
- **Tap Month Name:** Opens dropdown to select any month/year

**Date Grid (Scroll Up to Expand):**
```
S  M  T  W  T  F  S
               1  2
3  4  5  6  7  8  9
10 11 12 13 14...
```

**Specifications:**
- **Date Cubes:** 40px × 40px, rounded 8px
- **Selected Date:** Blue background (#1E88E5), white text
- **Today:** Blue border, white background
- **Has Events:** Small blue dot below number
- **Past Dates:** Grey text (#BDBDBD)

**Behavior:**
- When active, Level C time filters become feint (disabled)
- Date selection overrides Time Filter
- Close by tapping outside or selecting date

---

## 🔍 SEARCH INTERFACE

**Trigger:** Tap Search icon in bottom menu  
**Behavior:** Clears Drop Field, pushes up search interface

**Layout:**
```
┌────────────────────────────────────────────┐
│ GC · All                           [Filter]│ ← Places Filter (sticky)
├────────────────────────────────────────────┤
│ [🔍] Type to search...                     │ ← Search Field
├────────────────────────────────────────────┤
│ RECENT SEARCHES                            │
│ • Block 3 soccer                           │
│ • Tennis lessons Gaborone                  │
├────────────────────────────────────────────┤
│ SUGGESTED                                  │
│ • Chess club                               │
│ • Swimming lessons                         │
└────────────────────────────────────────────┘
```

**Search Field:**
- **Height:** 48px
- **Background:** White (#FFFFFF)
- **Border:** 1px solid Grey (#E0E0E0), rounded 24px
- **Icon:** Left side, Grey (#757575)
- **Placeholder:** 14px Regular, Light Grey (#BDBDBD)

**Auto-Fill Behavior:**
- Starts populating results after 2 characters typed
- Shows categories: Matches, Lessons, Clubs, Venues, People
- Highlights matching text in Blue (#1E88E5)

**Results Display:**
- Replaces Drop Field with filtered cards
- Uses same card types as homepage
- Empty state: "No results for '[query]' in GC · All"

**Exit:** Tap back arrow (far right of search field) or swipe down

---

## ➕ ADD BUTTON MENU (Event Lab Gateway)

**Trigger:** Tap + icon in bottom menu  
**Display:** Full-screen overlay with semi-transparent background

**Layout:**
```
┌────────────────────────────────────────────┐
│                                        [✕] │
│                                            │
│              What do you want to create?   │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ 📅 Create Event/Match                │ │ → Event Lab
│  └──────────────────────────────────────┘ │
│  ┌──────────────────────────────────────┐ │
│  │ 👥 Create Group/Club/Team            │ │ → Registration Flow
│  └──────────────────────────────────────┘ │
│  ┌──────────────────────────────────────┐ │
│  │ 🏢 Add Business/Service              │ │ → Business Onboarding
│  └──────────────────────────────────────┘ │
│  ┌──────────────────────────────────────┐ │
│  │ 📍 Add Venue                         │ │ → Venue Form
│  └──────────────────────────────────────┘ │
│  ┌──────────────────────────────────────┐ │
│  │ 📰 Post to Bulletin                  │ │ → Bulletin Editor
│  └──────────────────────────────────────┘ │
│  ┌──────────────────────────────────────┐ │
│  │ 🔍 Join Existing Group/Club          │ │ → Search Interface
│  └──────────────────────────────────────┘ │
│                                            │
└────────────────────────────────────────────┘
```

**Menu Cards:**
- **Width:** 90% of screen width
- **Height:** 64px each
- **Background:** White (#FFFFFF)
- **Border:** 1px solid Light Grey (#E0E0E0), rounded 12px
- **Icon:** Left side, 32px × 32px, colored
- **Text:** 16px Bold, Charcoal (#424242)
- **Tap Effect:** Light blue background flash (#E3F2FD)

**Permission Logic:**
- **Browser/User:** Only shows "Join Existing Group/Club" and "Post to Bulletin"
- **Player:** Shows all except Business/Venue (requires Creator upgrade)
- **Creator:** Shows all options
- **Guardian:** Shows only "Post to Bulletin"

---

## 📋 EVENT LAB (Single-Page Application)

**Access:** Via + button → "Create Event/Match"  
**Architecture:** Vertically scrollable single page with collapsible sections

### Sticky Header
**Height:** 56px  
**Background:** White (#FFFFFF)  
**Border Bottom:** 1px solid #E0E0E0

**Components:**
- **Competition Title:** Inline-editable text field (tap to edit)
  - Placeholder: "Untitled Event"
  - Font: 18px Bold, Charcoal (#424242)
- **Save Status:** Right side
  - Online: "Saved 2 mins ago ☁️" (Green #4CAF50)
  - Offline: "Offline - Saved locally 🚫☁️" (Orange #FF9800)
- **Publish Button:** Far right
  - Disabled: Grey (#BDBDBD)
  - Enabled: Blue (#1E88E5)

---

### Main Canvas (Collapsible Cards)

All sections use **+/- toggle system**:
- **Main Sections:** `[+]` or `[-]` in header (default: expanded)
- **Sub-sections:** `▶` or `▼` beside heading (default: collapsed)
- **Sub-sub-sections:** Indented + small `▶` or `▼` (default: collapsed)

**Visual Style:**
- **Card Background:** White (#FFFFFF)
- **Card Border:** 1px solid Light Grey (#E0E0E0), rounded 8px
- **Card Margin:** 16px bottom
- **Header Height:** 56px
- **Padding:** 16px all sides
- **Toggle Icon:** 24px × 24px, right-aligned

---

#### Section 1: CORE IDENTITY
**Default State:** Expanded (required to complete first)

**Layout:**
```
[ - ] Core Identity

┌────────────────────────────────────────────┐
│ Competition Name *                         │
│ [                                        ] │
│                                            │
│ Sport/Activity *                           │
│ [Select from 130+ options ▼]               │
│                                            │
│ Organization Type                          │
│ ○ Individual Creator                       │
│ ○ Group/Club                               │
│ ○ School                                   │
│ ○ Association                              │
│                                            │
│ ▶ Event Context (Optional)                 │
│                                            │
└────────────────────────────────────────────┘
```

**Validation:**
- Competition Name and Sport are required (red border if empty)
- Sport selection dispatches to template group (see below)

**Event Context (Sub-section):**
- Competition Level: Local / Regional / National
- Age Category: U13 / U15 / Open / Mixed
- Gender: Men / Women / Mixed
- Description: 500 char text area

---

#### Section 2: GAME RULES (Template-Driven)
**Default State:** Auto-expands after sport selection  
**Template Logic:** System injects fields based on 7 archetype groups

**Example: FOOTBALL (Soccer) Template**
```
[ - ] Game Rules

┌────────────────────────────────────────────┐
│ Template Applied: Goal-Based (⚽)           │
│                                            │
│ Match Duration                             │
│ [90] minutes  [2] halves                   │
│                                            │
│ Overtime Rules                             │
│ [x] Extra Time (2 x 15 min)                │
│ [x] Penalty Shootout                       │
│                                            │
│ ▶ Substitution Rules                       │
│ ▼ Position Matrix                          │
│                                            │
│   Goalkeeper [1] Defenders [4]             │
│   Midfielders [4] Forwards [2]             │
│                                            │
│ ▶ Disciplinary Matrix                      │
│                                            │
└────────────────────────────────────────────┘
```

**Custom Sport Logic:**
- If user selects "🌐 Other (Please Specify)" → inline 4-step wizard appears
- Steps: Metric Definition → Period Setup → Scoreboard Layout → Save
- Wizard stays inline (no modal pop-up)

---

#### Section 3: MIZANO FUND
**Default State:** Collapsed (auto-expands if Entry Fee > 0)

```
[ + ] Mizano Fund

(Collapsed view shows summary: "Entry Fee: P0.00 | Goal: P0.00")

EXPANDED:
┌────────────────────────────────────────────┐
│ Entry Fee                                  │
│ P [0.00]                                   │
│                                            │
│ Fund Purpose                               │
│ ○ Prize Pool                               │
│ ○ Equipment Drive                          │
│ ○ Venue Rental                             │
│ ○ General Operations                       │
│                                            │
│ ▼ Payment Channels                         │
│                                            │
│   [x] Orange Money  QR Code: [Generate]    │
│   [ ] Mynt                                 │
│   [ ] Cash (Manual Tracking)               │
│                                            │
│ ▶ Goal Tracker                             │
│                                            │
└────────────────────────────────────────────┘
```

**Payment Channel QR Codes:**
- Inline preview (120px × 120px)
- Downloadable as PNG
- Shows payment instructions below code

---

#### Section 4: RECRUITMENT
**Default State:** Collapsed

```
[ + ] Recruitment

┌────────────────────────────────────────────┐
│ Participant Capacity                       │
│ Min: [8]  Max: [22]  Per Team: [11]        │
│                                            │
│ Registration Deadline                      │
│ [📅 14 Feb 2026] [⏰ 23:59]                │
│                                            │
│ ▼ Equipment Wishlist                       │
│                                            │
│   + Add Item                               │
│   [x] Football Boots (Size 9) - P200       │
│   [x] Goalkeeper Gloves - P150             │
│                                            │
│   Progress: ████░░░░ P350 / P500           │
│                                            │
│ ▶ Call-Out Templates                       │
│                                            │
└────────────────────────────────────────────┘
```

**Wishlist Logic:**
- Auto-expands if Fund Purpose = "Equipment Drive"
- Items show funding progress bar
- Linked to sponsorship requests

---

#### Section 5: FORMAT & FIXTURES
**Default State:** Collapsed

```
[ + ] Format & Fixtures

┌────────────────────────────────────────────┐
│ Competition Format                         │
│ ○ Single Match                             │
│ ○ Round Robin                              │
│ ○ Knockout                                 │
│ ○ League                                   │
│                                            │
│ ▼ Fixture Builder (Round Robin selected)   │
│                                            │
│   Round 1 - 20 Feb                         │
│   • Team A vs Team B [15:00]               │
│   • Team C vs Team D [17:00]               │
│                                            │
│   [+ Add Round]                            │
│                                            │
│ ▶ Tie-Breaker Hierarchy                    │
│                                            │
└────────────────────────────────────────────┘
```

**Fixture Builder:**
- Drag-and-drop interface for match order
- Auto-generates fixtures based on format
- Manual override available

---

#### Section 6: PUBLISH & EXPORT
**Default State:** Collapsed

```
[ + ] Publish & Export

┌────────────────────────────────────────────┐
│ ▼ Poster Generator                         │
│                                            │
│   [POSTER PREVIEW - 1080x1080]             │
│                                            │
│   Style: ○ Minimal ● Colorful ○ Corporate │
│                                            │
│   [Share to WhatsApp] [Download PNG]       │
│                                            │
│ ▼ Live Score Link                          │
│                                            │
│   QR Code: [Generate for each match]       │
│   Short URL: mizano.app/m/abc123           │
│                                            │
│ ▶ Scorecard Template                       │
│ ▶ Social Media Kit                         │
│                                            │
└────────────────────────────────────────────┘
```

---

### Floating Action Menu
**Position:** Bottom-right corner (appears when scrolling past first section)  
**Mobile:** Collapses to "⚡" button

**Options:**
- 📋 Clone Competition
- 👁️ Preview (Shows public view)
- 📦 Archive
- 🗑️ Delete (Requires confirmation)

---

## 🏃 ACTIVITY PAGE (Match/Event Detail)

**Access:** Tap any card in Drop Field  
**Layout:** Full-screen vertical scroll

### Header Section
**Height:** 200px (with image) or 120px (text only)  
**Background:** Activity-specific image (WebP, <200KB) with dark gradient overlay

**Components:**
- **Back Arrow:** Top-left, white icon
- **Share Button:** Top-right, white icon
- **Favorite Star:** Top-right (next to share), gold/grey toggle
- **Activity Title:** Bottom, 24px Bold, White
- **Status Badge:** Below title
  - Live Now: Orange pulsing dot + "LIVE NOW"
  - Upcoming: Yellow dot + "20 FEB · 15:00"
  - Finished: Grey dot + "FINAL: 2-1"

---

### Tab Navigation
**Height:** 48px  
**Background:** White (#FFFFFF)  
**Border Bottom:** 1px solid #E0E0E0

**Tabs:** `Details` | `Roster` | `Streams` | `Sponsors` | `Updates`

**Active Tab:**
- Blue underline (3px, #1E88E5)
- Blue text (#1E88E5)

**Inactive Tab:**
- Grey text (#757575)

---

### Tab Content Areas

#### DETAILS TAB
```
┌────────────────────────────────────────────┐
│ 📅 Date & Time                             │
│ Sunday, 20 February 2026                   │
│ 15:00 - 17:00                              │
│                                            │
│ 📍 Venue                                   │
│ Block 3 Community Field                    │
│ [View on Map] [Get Directions]             │
│                                            │
│ 🎯 Entry Requirements                      │
│ • Age: U18                                 │
│ • Entry Fee: P20.00                        │
│ • Equipment: Bring own boots               │
│                                            │
│ 👤 Organizer                               │
│ Thabo Mokwena                              │
│ [WhatsApp Organizer]                       │
│                                            │
│ 📋 Description                             │
│ Friendly neighborhood match...             │
│                                            │
└────────────────────────────────────────────┘
```

**Call-to-Action Buttons:**
- **Join Match:** Blue (#1E88E5), full-width, 48px height
  - If U16: Shows "Request Guardian Approval" instead
  - If capacity full: Disabled, grey
- **WhatsApp Organizer:** White with green border (#25D366)

---

#### ROSTER TAB
```
┌────────────────────────────────────────────┐
│ Capacity: 18/22                            │
│                                            │
│ TEAM A (9 players)                         │
│ • Thabo Mokwena (Captain) ⚽⚽             │
│ • Lesego Gasebalwe                         │
│ • [+ 7 more]                               │
│                                            │
│ TEAM B (9 players)                         │
│ • Kabo Serame                              │
│ • [+ 8 more]                               │
│                                            │
│ WAITING LIST (4)                           │
│ • Neo Molefe                               │
│ • [+ 3 more]                               │
│                                            │
└────────────────────────────────────────────┘
```

**Player Privacy:**
- Only shows first name + surname initial for U16 users
- Full names visible for 16+ with profile opt-in

---

#### STREAMS TAB
**Priority Order:** Facebook Live > YouTube > Other

```
┌────────────────────────────────────────────┐
│ LIVE STREAMS                               │
│                                            │
│ 🔴 Facebook Live                           │
│ [WATCH LIVE]                               │
│ 1,234 viewers                              │
│                                            │
│ YouTube Stream                             │
│ [WATCH]                                    │
│                                            │
│ No streams available                       │
│ [+ Add Stream Link]                        │
│                                            │
└────────────────────────────────────────────┘
```

**Data Saver Mode:**
- Shows text link only (no embedded players)
- "Tap to open in [Facebook/YouTube]"

---

#### SPONSORS TAB
```
┌────────────────────────────────────────────┐
│ TITLE SPONSOR                              │
│                                            │
│ [LOGO - 120px x 60px]                      │
│ Orange Botswana                            │
│ Supporting grassroots football             │
│                                            │
│ EQUIPMENT SPONSORS (2)                     │
│                                            │
│ [LOGO] Nike Botswana                       │
│ [LOGO] Adidas                              │
│                                            │
│ COMMUNITY SPONSORS (5)                     │
│ • Block 3 Tuckshop (P50)                   │
│ • [+ 4 more]                               │
│                                            │
│ [+ Become a Sponsor]                       │
│                                            │
└────────────────────────────────────────────┘
```

**Sponsorship Tiers:**
- Title: P500+
- Equipment: P200-499
- Community: P50-199

---

#### UPDATES TAB
**Real-time feed during Live matches**

```
┌────────────────────────────────────────────┐
│ 45' HALF TIME                              │
│ Team A 1 - 0 Team B                        │
│                                            │
│ 32' ⚽ GOAL! Thabo Mokwena (Team A)        │
│                                            │
│ 18' 🟨 Yellow Card - Lesego G. (Team B)   │
│                                            │
│ 1' ⏱️ Match Started                        │
│                                            │
└────────────────────────────────────────────┘
```

**Post-match:**
- Shows final score
- Man of the Match (if voted)
- Photo gallery (WebP, lazy load)

---

## ⚙️ SETTINGS MENU

**Access:** Tap Mizano logo in top bar  
**Display:** Full-screen overlay with vertical scroll

### Main Sections (6 Collapsible Groups)

#### 1. ACCOUNT & PROFILE
```
[ - ] Account & Profile

┌────────────────────────────────────────────┐
│ Profile Photo                              │
│ [IMG - 80px circle]         [Change Photo] │
│                                            │
│ Thabo Mokwena                              │
│ User #123456                               │
│                                            │
│ [Edit Profile]                             │
│ [Switch to Player] ← Text button           │
│ [Become a Mentor] ← Text button            │
│ [Guardian Dashboard] ← If Guardian profile │
│                                            │
│ [Delete Account]                           │
│                                            │
└────────────────────────────────────────────┘
```

---

#### 2. MY ACTIVITY HUB
```
[ + ] My Activity Hub

┌────────────────────────────────────────────┐
│ Borrow Score                               │
│ ⭐⭐⭐⭐☆ 4.2 / 5.0                          │
│ 18 items borrowed · 100% return rate       │
│                                            │
│ [View Borrow History]                      │
│                                            │
│ My Wishlist (3 items)                      │
│ • Football Boots                           │
│ • Tennis Racket                            │
│ • [+ 1 more]                               │
│                                            │
│ Match History                              │
│ 12 matches played this year                │
│ [Export PDF - P10.00]                      │
│                                            │
└────────────────────────────────────────────┘
```

---

#### 3. NAVIGATION & DISPLAY
```
[ + ] Navigation & Display

┌────────────────────────────────────────────┐
│ Swipe Panel Order                          │
│ [Drag to reorder]                          │
│                                            │
│ ☰ Home                                     │
│ ☰ Sports                                   │
│ ☰ Hobbies                                  │
│ ☰ Lessons                                  │
│ ☰ Leisure (Hidden)                         │
│                                            │
│ Default Location                           │
│ [GC - Gaborone · Block 3 ▼]                │
│                                            │
│ Dark Mode                                  │
│ [Toggle Switch - OFF]                      │
│                                            │
└────────────────────────────────────────────┘
```

---

#### 4. DATA & OFFLINE SYNC
```
[ + ] Data & Offline Sync

┌────────────────────────────────────────────┐
│ Offline Map Tiles                          │
│ Gaborone Map (1.2 MB)                      │
│ Last updated: 2 days ago                   │
│ [Update Now]                               │
│                                            │
│ Manual Sync                                │
│ Last synced: 5 minutes ago ☁️              │
│ [Sync Now]                                 │
│                                            │
│ Data Saver Mode                            │
│ [x] Text-only cards (no images)            │
│ [x] WebP image compression                 │
│ [ ] Auto-download images (Paid users only) │
│                                            │
│ Storage Usage                              │
│ 45 MB / 100 MB used                        │
│ [Clear Cache]                              │
│                                            │
└────────────────────────────────────────────┘
```

---

#### 5. COMMUNITY & SAFETY
```
[ + ] Community & Safety

┌────────────────────────────────────────────┐
│ Responsible Gambling Awareness             │
│ [Toggle Switch - OFF] ⚠️                   │
│                                            │
│ ℹ️ When enabled, shows educational content│
│ and betting company sponsored events.      │
│ Mizano does not facilitate gambling.       │
│                                            │
│ Mentorship Visibility                      │
│ [Toggle - Discoverable in search]          │
│                                            │
│ First-Aid Directory                        │
│ [View Nearby Clinics & Contacts]           │
│                                            │
│ Report a Problem                           │
│ [Open Reporting Form]                      │
│                                            │
└────────────────────────────────────────────┘
```

---

#### 6. ABOUT & LEGAL
```
[ + ] About & Legal

┌────────────────────────────────────────────┐
│ About Mizano                               │
│ Building community through grassroots      │
│ sports in Botswana.                        │
│                                            │
│ Version 1.2 - Gaborone Edition             │
│                                            │
│ [Terms of Service]                         │
│ [Privacy Policy]                           │
│ [Community Guidelines]                     │
│                                            │
│ Contact Support                            │
│ [WhatsApp: +267 71 234 567]                │
│                                            │
└────────────────────────────────────────────┘
```

---

## 📱 UNIQUE PAGE INVENTORY

### Pre-Authentication Pages
1. **Splash Screen** - Animated Mizano logo (2 seconds)
2. **Login Page** - Username + WhatsApp number fields
3. **About Us** - Mission statement, team, contact

### Main Navigation Pages
4. **Homepage** - Default landing (Sports feed)
5. **Sports Page** - Filtered by sports only
6. **Hobbies Page** - Arts, crafts, clubs
7. **Lessons Page** - Training and education
8. **Leisure Page** - Hiking, picnics, community events
9. **Events Page** - Competitions and tournaments
10. **Mine Page** - User's activity hub

### Content Creation Pages
11. **Event Lab** - Single-page competition builder
12. **Bulletin Editor** - Community posting interface
13. **Venue Form** - Add new venue/field
14. **Business Onboarding** - Register service provider
15. **Group/Club Registration** - Team/club setup

### Profile Pages
16. **User Profile** - Personal information
17. **Player Profile** - Sports stats, medical, equipment
18. **Mentor Profile** - Certifications, availability
19. **Guardian Dashboard** - Child monitoring, approvals
20. **Creator Dashboard** - Managed events, analytics

### Entity Pages
21. **Group/Club Page** - Team roster, history, sponsors
22. **Business Page** - Services, contact, reviews
23. **Association Page** - News, tournaments, governance
24. **School Page** - Students, classes, competitions
25. **Venue Page** - Details, availability, bookings

### Activity Pages
26. **Activity Detail Page** - Match/event full view
27. **Live Score Page** - Real-time scorecard
28. **Registration Form** - Event sign-up
29. **Roster Management** - Participant list editing
30. **Sponsorship Request** - Funding proposal form

### Utility Pages
31. **Search Results** - Filtered content display
32. **Notifications Feed** - Alert history
33. **Equipment Ledger** - Borrow/return tracking
34. **Lost & Found** - Item posting and claiming
35. **First-Aid Directory** - Emergency contacts

### Settings & Support
36. **Settings Menu** - All configuration options
37. **Edit Profile** - Update personal info
38. **Privacy Settings** - Data management
39. **Help Center** - FAQs and guides
40. **Report Problem** - Issue submission

---

## 🎯 PAGE FLOW ARCHITECTURE

### Primary User Journey
```
Splash → Login → Homepage → Activity Detail → Registration/Join
```

### Creator Flow
```
Homepage → [+] Button → Event Lab → Publish → Activity Page (Public View)
```

### Guardian Flow
```
Login → Guardian Dashboard → Child Profile → Approve Join Request → WhatsApp Group Invite
```

### Search Flow
```
Any Page → Search Icon → Search Interface → Results → Activity Detail
```

### Settings Flow
```
Logo Tap → Settings Menu → Sub-Section → Edit Form → Save → Return to Homepage
```

---

## 🎨 COMPONENT LIBRARY

### Buttons

#### Primary Button
- **Background:** Blue (#1E88E5)
- **Text:** White, 14px Bold
- **Height:** 48px
- **Border Radius:** 24px
- **Tap State:** Darker blue (#1976D2)

#### Secondary Button
- **Background:** White (#FFFFFF)
- **Text:** Blue (#1E88E5), 14px Bold
- **Border:** 2px solid Blue (#1E88E5)
- **Height:** 48px
- **Border Radius:** 24px

#### Text Button
- **Background:** Transparent
- **Text:** Blue (#1E88E5), 14px Bold
- **Underline:** On tap

#### Icon Button
- **Size:** 40px × 40px
- **Icon:** 24px × 24px centered
- **Tap State:** Light grey background circle

---

### Form Elements

#### Text Input
- **Height:** 48px
- **Background:** White (#FFFFFF)
- **Border:** 1px solid Grey (#E0E0E0), rounded 8px
- **Focus State:** Blue border (#1E88E5)
- **Error State:** Red border (#D32F2F)
- **Font:** 14px Regular, Charcoal (#424242)

#### Dropdown
- **Same as text input**
- **Arrow Icon:** Right side, Grey (#757575)
- **Expanded:** Shows below input, max 5 visible items with scroll

#### Checkbox
- **Size:** 20px × 20px
- **Unchecked:** White background, grey border
- **Checked:** Blue background (#1E88E5), white checkmark
- **Label:** 14px Regular, left-aligned

#### Radio Button
- **Size:** 20px × 20px
- **Unchecked:** White background, grey circle border
- **Checked:** Blue outer circle, white inner dot
- **Label:** 14px Regular, left-aligned

#### Toggle Switch
- **Width:** 48px, Height:** 28px
- **Off:** Grey background (#BDBDBD), white circle left
- **On:** Blue background (#1E88E5), white circle right
- **Animation:** 200ms ease-in-out

---

### Badges & Labels

#### Status Badge
- **Height:** 24px
- **Padding:** 6px horizontal
- **Border Radius:** 12px
- **Font:** 10px Bold, uppercase
- **Colors:**
  - Live: Orange background (#FF6F00), white text
  - Upcoming: Yellow background (#FFC107), charcoal text
  - Finished: Grey background (#757575), white text

#### Category Tag
- **Height:** 20px
- **Padding:** 4px horizontal
- **Border Radius:** 4px
- **Font:** 9px Bold, uppercase
- **Background:** Light blue (#E3F2FD)
- **Text:** Blue (#1E88E5)

---

### Loading States

#### Skeleton Card
- **Background:** Light grey (#F5F5F5)
- **Shimmer:** Animated gradient left-to-right
- **Duration:** 1.5s infinite loop
- **Shape:** Matches card dimensions

#### Spinner
- **Size:** 32px × 32px
- **Color:** Blue (#1E88E5)
- **Style:** Circular rotation
- **Usage:** Full-screen overlay OR inline in buttons

---

## 🔔 NOTIFICATION TYPES

### Push Notifications
1. **Join Request Approved** (Guardian → Child)
2. **Match Starting Soon** (30 min before)
3. **Equipment Available** (Wishlist item funded)
4. **Sponsorship Received** (Creator → Event)
5. **Borrow Item Due** (Player → Equipment return)
6. **Score Update** (Live match milestones)

### In-App Notifications
- **Layout:** Same as Drop Field cards with bell icon
- **Tap Action:** Navigate to relevant page
- **Swipe Left:** Delete notification
- **Swipe Right:** Mark as read

---

## 📊 DATA EFFICIENCY SPECS

### Image Optimization
- **Format:** WebP (85% compression)
- **Max Size:** 200KB per image
- **Lazy Loading:** Images load only when visible
- **Fallback:** Text-only mode in Data Saver

### Offline Capability
- **LocalStorage:** User preferences, favorites
- **IndexedDB:** Competition drafts, rosters, messages
- **Service Worker:** Cache static assets (HTML, CSS, JS, icons)
- **Sync Queue:** Pending actions when offline

### Sync Strategy
- **Auto-Sync:** Every 15 minutes when online (configurable)
- **Manual Sync:** Button in Settings
- **Conflict Resolution:** Server wins (with local backup option)

---

## ♿ ACCESSIBILITY GUIDELINES

### Color Contrast
- **Text on White:** Minimum 4.5:1 ratio
- **Button Text:** Minimum 4.5:1 ratio
- **Icons:** Minimum 3:1 ratio

### Touch Targets
- **Minimum Size:** 44px × 44px
- **Spacing:** 8px minimum between targets

### Keyboard Navigation
- **Tab Order:** Logical top-to-bottom, left-to-right
- **Focus Indicators:** Blue outline (2px, #1E88E5)
- **Skip Links:** "Skip to main content" at top

### Screen Reader Support
- **Alt Text:** All images and icons
- **ARIA Labels:** Interactive elements
- **Role Attributes:** Semantic HTML + ARIA roles

---

## 🧪 RESPONSIVE BREAKPOINTS

### Mobile (Default)
- **Width:** 320px - 768px
- **Layout:** Single column, stacked cards
- **Font Scale:** 1.0x

### Tablet
- **Width:** 768px - 1024px
- **Layout:** 2-column grid for cards
- **Font Scale:** 1.1x

### Desktop
- **Width:** 1024px+
- **Layout:** 3-column grid, sidebar navigation
- **Font Scale:** 1.2x
- **Max Width:** 1440px (centered)

---

## 🚀 PERFORMANCE TARGETS

### Load Times
- **First Contentful Paint:** <1.5 seconds
- **Time to Interactive:** <3 seconds
- **Total Page Weight:** <500KB (excluding images)

### Offline Performance
- **App Shell:** Loads in <1 second from cache
- **Data Sync:** Background queue, non-blocking

### Battery Optimization
- **Polling:** Max every 30 seconds (when in foreground)
- **Background Sync:** Only when charging or WiFi

---

## 📐 DESIGN TOKENS (Variables)

### Colors
```css
/* Primary */
--blue-primary: #1E88E5;
--blue-light: #E3F2FD;
--blue-dark: #1976D2;

/* Status */
--orange-live: #FF6F00;
--yellow-upcoming: #FFC107;
--green-recruiting: #4CAF50;
--pink-poll: #E91E63;
--light-blue-news: #03A9F4;
--charcoal-finished: #616161;

/* Neutrals */
--white: #FFFFFF;
--grey-light: #F5F5F5;
--grey-medium: #E0E0E0;
--grey-dark: #757575;
--charcoal: #424242;

/* Feedback */
--red-error: #D32F2F;
--green-success: #4CAF50;
--orange-warning: #FF9800;
```

### Typography
```css
--font-family: 'Inter', 'Roboto', sans-serif;

--font-size-xs: 10px;
--font-size-sm: 12px;
--font-size-base: 14px;
--font-size-md: 16px;
--font-size-lg: 18px;
--font-size-xl: 24px;

--font-weight-regular: 400;
--font-weight-bold: 700;
```

### Spacing
```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
```

### Border Radius
```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-pill: 24px;
--radius-circle: 50%;
```

---

## ✅ DESIGN CHECKLIST

For each new page, verify:

- [ ] Uses 2D flat design (no shadows or gradients)
- [ ] White/light grey background hierarchy
- [ ] Color-coded borders at 70% opacity
- [ ] +/- toggle system where applicable
- [ ] Offline-first functionality
- [ ] Guardian approval checks for U16 users
- [ ] WhatsApp/Facebook deep links
- [ ] Data saver mode compatible
- [ ] Responsive at 320px width
- [ ] Touch targets ≥44px
- [ ] WCAG AA contrast ratios
- [ ] LocalStorage/IndexedDB integration
- [ ] Manual sync option
- [ ] Back navigation arrow
- [ ] Consistent header/footer structure

---

**END OF DESIGN GUIDE**

*This document serves as the single source of truth for all Mizano UI/UX design decisions. All Photoshop mockups, HTML5 development, and Android APK conversion should reference this guide.*

**Document Version:** 1.0  
**Last Updated:** 13 February 2026  
**Maintained By:** Mizano Product Team
