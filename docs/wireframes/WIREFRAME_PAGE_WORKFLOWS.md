# MIZANO WIREFRAME PAGE WORKFLOWS
**Complete Specifications for 40+ Screen Wireframes**

---

## 📋 HOW TO USE THIS DOCUMENT

**For Wireframe Weaver Gem:**
This document provides complete specifications for each of the 40+ wireframes in the Mizano app. Each entry includes:
- Page number and name
- Navigation context (how user arrives)
- Component breakdown
- Layout specifications
- Interaction points
- Annotation requirements

**Cross-Reference Documents:**
- `MIZANO_DESIGN_GUIDE.md` - Component library, colors, typography, spacing
- `MIZANO_PAGE_FLOW_ARCHITECTURE.md` - Navigation flows, panel behaviors, state management

---

## LEVEL 0: ENTRY POINTS (Pre-Authentication)

### Page 1: Splash Screen

**Navigation Context:** App launch (first screen)

**Duration:** 2 seconds auto-advance

**Layout Specifications:**
```
┌────────────────────────────────────────────┐
│                                            │
│                                            │
│              [MIZANO LOGO]                 │
│           (Animated entrance)              │
│                                            │
│                                            │
└────────────────────────────────────────────┘
```

**Components:**
- **Background:** White (#FFFFFF)
- **Logo:** Centered, 120px × 120px placeholder circle
- **Animation Note:** "Fade in + subtle scale (0.8 → 1.0 over 500ms)"

**No Interaction:** Auto-advances to Login Page after 2s

**Annotations:**
- "App launches here"
- "2-second auto-advance"
- "Logo animation: fade in + scale"

---

### Page 2: Onboarding Carousel (3 Slides)

**Navigation Context:** First-time users only (after Splash, before Login)

**Layout Specifications (Per Slide):**
```
┌────────────────────────────────────────────┐
│                                            │
│         [ILLUSTRATION PLACEHOLDER]         │
│              (240px × 240px)               │
│                                            │
│              HEADLINE TEXT                 │
│          Supporting description            │
│                                            │
│           ● ○ ○  (Slide indicators)        │
│                                            │
│  [Skip]                    [Next/Start] →  │
└────────────────────────────────────────────┘
```

**Slide Content:**
- **Slide 1:** "Find Local Sports & Activities" / "Discover matches, lessons, and events in your neighborhood"
- **Slide 2:** "Join, Organize, Compete" / "Sign up for activities or create your own events"
- **Slide 3:** "Offline-First & Data-Light" / "Works even with limited connectivity"

**Components:**
- **Illustration:** Greyscale placeholder circle
- **Headline:** 18px Bold, Charcoal (#424242)
- **Description:** 14px Regular, Grey (#757575)
- **Indicators:** 8px diameter circles, filled = current slide
- **Skip Button:** Top-right, 14px Regular, Grey
- **Next/Start Button:** Primary blue button, bottom-right

**Interactions:**
- Swipe left/right to navigate slides
- Tap "Skip" → Login Page
- Tap "Next" (Slide 1-2) → Next slide
- Tap "Start" (Slide 3) → Login Page

**Annotations:**
- "Swipe or tap to navigate"
- "Only shown on first app launch"
- "Skip takes user to Login Page"

---

### Page 3: Login Page

**Navigation Context:** After Splash/Onboarding OR manual logout

**Layout Specifications:**
```
┌────────────────────────────────────────────┐
│                [LOGO]                      │
│                                            │
│         Welcome to Mizano                  │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ Username                              │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ WhatsApp Number (+267)                │ │
│  └──────────────────────────────────────┘ │
│                                            │
│        [Login with WhatsApp] (Primary)     │
│                                            │
│              About Us (link)               │
└────────────────────────────────────────────┘
```

**Components:**
- **Logo:** 80px × 80px, centered top
- **Heading:** 18px Bold, Charcoal
- **Input Fields:** 48px height, light grey border, rounded 8px
- **Primary Button:** Full-width minus 32px padding, Flat Blue background (No gradient)
- **Link:** 14px Regular, Blue, underlined

**Interactions:**
- Fill fields → "Login with WhatsApp" becomes active (blue)
- Tap "Login" → 
  - If registered → Homepage
  - If new user → Age Verification (Page 4)
- Tap "About Us" → About Us Page (Page 5)

**Annotations:**
- "WhatsApp number required for zero-data login"
- "Existing users → Homepage"
- "New users → Age verification flow"

---

### Page 4: Age Verification & Guardian Handshake

**Navigation Context:** New user signup (under 16 years old)

**Layout Specifications:**
```
┌────────────────────────────────────────────┐
│         ← Back                             │
│                                            │
│     We need to verify your age             │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ Date of Birth (DD/MM/YYYY)            │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  [IF AGE < 16 DETECTED]:                  │
│                                            │
│  ⚠️  Guardian Approval Required            │
│                                            │
│  We need a parent or guardian to          │
│  approve your account for safety.         │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ Guardian WhatsApp Number              │ │
│  └──────────────────────────────────────┘ │
│                                            │
│        [Send Approval Request]             │
│                                            │
│  [IF AGE >= 16]:                          │
│        [Continue to Profile Setup] →       │
└────────────────────────────────────────────┘
```

**Components:**
- **Back Arrow:** Top-left, 24px × 24px
- **Heading:** 18px Bold, Charcoal
- **Date Picker:** Native date input or custom calendar
- **Warning Icon:** 24px × 24px, orange (#FF9800)
- **Info Text:** 14px Regular, Grey
- **Input Field:** 48px height for guardian number
- **Button:** Primary blue for both paths

**Conditional Logic:**
- **Age ≥ 16:** Show only "Continue" button → Profile Setup (Page 5)
- **Age < 16:** Show guardian approval section → Approval Request Sent screen

**Annotations:**
- "Auto-calculates age from date of birth"
- "Under 16 requires guardian approval"
- "Guardian receives WhatsApp notification"
- "User sees 'Awaiting Approval' status until guardian confirms"

---

### Page 5: About Us

**Navigation Context:** Login Page link OR Settings Menu

**Layout Specifications:**
```
┌────────────────────────────────────────────┐
│  ← Back                                    │
│                                            │
│              About Mizano                  │
│                                            │
│  [LOGO PLACEHOLDER]                        │
│                                            │
│  Our Mission                               │
│  ┌──────────────────────────────────────┐ │
│  │ Mizano connects grassroots sports    │ │
│  │ and community activities in Botswana,│ │
│  │ starting with Gaborone...            │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  The Team                                  │
│  ┌──────────────────────────────────────┐ │
│  │ [Team member placeholders]           │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  Contact Us                                │
│  📧 support@mizano.app                     │
│  📞 WhatsApp: +267 XXX XXXX                │
│                                            │
│        [Return to Login]                   │
└────────────────────────────────────────────┘
```

**Components:**
- **Back Arrow:** Top-left
- **Heading:** 20px Bold, Charcoal
- **Content Sections:** +/- Toggles (collapsed by default)
- **Contact Icons:** 20px × 20px, blue
- **Button:** Secondary blue button

**Interactions:**
- Tap section headers to expand/collapse
- Tap "Return to Login" → Login Page
- Tap WhatsApp number → Launch WhatsApp

**Annotations:**
- "Accessible from login or settings"
- "Collapsible sections save space"
- "WhatsApp contact launches wa.me deep link"

---

## LEVEL 1: MAIN NAVIGATION (Horizontal Carousel)

### Page 6: Homepage - Side Swipe Navigation

**Navigation Context:** Post-login default landing / Center of horizontal carousel

**Top Bar (Sticky):**
```
│ [LOGO]  Sports • Hobbies • Leisure  [MENU]│ ← HEIGHT: 56px
│         ^^^^^ (Bold/Dark)                  │
│         (Others greyed out)                │
└────────────────────────────────────────────┘
```

**Places Filter Bar (Level 2):**
```
┌────────────────────────────────────────────┐
│ GC · Block 3 ▼              [📍] [📅] 42  │
└────────────────────────────────────────────┘
```

**Drop Field (Level 3 - Infinite Scroll):**
```
┌────────────────────────────────────────────┐
│  ┌──────────────────────────────────────┐ │
│  │ Getafe  [⚽][⚽]  Alaves              │ │ ← Standard Match Card
│  │         23:30                         │ │
│  │        20 Aug                         │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ U17 Football Tournament               │ │ ← Registration Card
│  │ Sign up closes in 3 days              │ │
│  │         [Register Now]                │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ [IMG] BFA UPDATES                     │ │ ← News Flash Card
│  │       Youth camp announced...         │ │
│  │       2 hours ago                     │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ... (continues infinite scroll)          │
└────────────────────────────────────────────┘
```

**Bottom Menu Bar (Level 1):**
```
┌────────────────────────────────────────────┐
│ [🎯] [📍] [☰] [🔍] [+] [🔔] [≡]          │ ← HEIGHT: 60px
│ Activity Places Menu Search Add Notif Ham  │
└────────────────────────────────────────────┘
```

**Components:**
- **Horizontal Carousel:** Swipe left/right OR tap to switch (Sports/Hobbies/Leisure/etc)
- **Location Selector:** "GC · Block 3" with dropdown
- **Card Tally:** Shows number of cards in feed (e.g., "42")
- **Activity Cards:** 7 types (Match, Registration, Match-Making, Lesson, News, Poll, Category)
- **Bottom Icons:** 7 navigation buttons (44px touch targets)

**Interactions:**
- **Swipe Left:** Navigate to "Hobbies" page
- **Swipe Right:** Navigate to "Mine" page (wraps around)
- **Tap Page Name:** Direct jump to that section
- **Tap Location:** Opens location selector dropdown (Level B filter)
- **Tap Card:** Navigate to Activity Detail Page (Page 26)
- **Swipe Card Left:** Add to Favorites (gold star appears)
- **Swipe Card Right:** Remove from feed
- **Bottom Icons:** Each opens respective overlay/page

**Annotations:**
- "Horizontal swipe changes entire feed category"
- "Cards infinite scroll - lazy load"
- "Location filter updates all cards in real-time"
- "Bottom menu persistent across all main pages"
- "Pull down on carousel reveals full page list dropdown"

---

### Page 7: Sports Page

**Navigation Context:** Swipe left from Homepage OR tap "Sports" in carousel

**Identical Structure to Homepage (Page 6), but:**

**Carousel Position:**
```
Hobbies • Sports • Lessons
          ^^^^^^ (Bold/Dark)
```

**Drop Field Content:** Filtered to show ONLY sports-related activities
- Match cards (Football, Basketball, Netball, etc.)
- Sports registrations
- Sports lessons
- Sports news

**Annotations:**
- "Same layout as Homepage"
- "Auto-filtered to sports content only"
- "All other features (location filter, search, etc.) work identically"

---

### Page 8: Hobbies Page

**Navigation Context:** Swipe right from Homepage OR tap "Hobbies"

**Carousel Position:**
```
Sports • Hobbies • Leisure
         ^^^^^^^ (Bold/Dark)
```

**Drop Field Content:** Arts, crafts, clubs, non-sport activities
- Chess clubs
- Art classes
- Music lessons
- Dance groups

**Annotations:**
- "Same layout as Homepage"
- "Auto-filtered to hobbies content"

---

### Page 9: Lessons Page

**Navigation Context:** Swipe from Hobbies OR tap "Lessons"

**Carousel Position:**
```
Hobbies • Lessons • Leisure
          ^^^^^^^ (Bold/Dark)
```

**Drop Field Content:** Training and educational activities
- Coaching sessions
- Skill workshops
- Certification courses
- Mentorship programs

**Card Type Emphasis:** Lesson Cards (blue border)

**Annotations:**
- "Focused on learning/training activities"
- "Includes both sports and non-sports lessons"

---

### Page 10: Leisure Page

**Navigation Context:** Swipe from Lessons OR tap "Leisure"

**Carousel Position:**
```
Lessons • Leisure • Events
          ^^^^^^^ (Bold/Dark)
```

**Drop Field Content:** Recreational community activities
- Hiking groups
- Picnics
- Community gatherings
- Social events

**Annotations:**
- "Casual, non-competitive activities"
- "Mix of card types based on activity structure"

---

### Page 11: Events Page

**Navigation Context:** Swipe from Leisure OR tap "Events"

**Carousel Position:**
```
Leisure • Events • Mine
          ^^^^^^ (Bold/Dark)
```

**Drop Field Content:** Competitions, tournaments, official events
- League matches
- Championship series
- Award ceremonies
- Festival events

**Card Type Emphasis:** Registration cards + Match cards for competitions

**Annotations:**
- "Formal, organized events"
- "Often includes multi-day tournaments"

---

### Page 12: Mine Page

**Navigation Context:** Swipe from Events OR tap "Mine"

**Carousel Position:**
```
Events • Mine • Community
         ^^^^ (Bold/Dark)
```

**Layout Modification - Top Section:**
```
┌────────────────────────────────────────────┐
│  [Profile Photo]  User Name                │
│  Player · Mentor                           │
│                                            │
│  [Edit Profile] [View Stats] [Settings]    │
│  VISUAL: Flat User Color Background        │
└────────────────────────────────────────────┘
```

**Drop Field Content:** User's personalized activity feed
- Upcoming activities user joined
- Past activities user participated in
- Created events (if Creator)
- Saved/favorited activities

**Tabbed Sections:**
```
┌────────────────────────────────────────────┐
│  Upcoming | Past | Created | Favorites     │
│  ^^^^^^^                                   │
└────────────────────────────────────────────┘
```

**Components:**
- **Profile Card:** 80px photo, name, role badges
- **Action Buttons:** 3 secondary buttons
- **Tab Navigation:** 4 tabs filtering the Drop Field
- **Activity Cards:** Same types as Homepage but filtered to user's data (70% opacity borders)

**Interactions:**
- Tap "Edit Profile" → Edit Profile Page (Page 37)
- Tap "View Stats" → Player Profile Page (Page 17)
- Tap "Settings" → Settings Menu (Page 36)
- Tap Tabs → Filter Drop Field content

**Annotations:**
- "User's personal activity hub"
- "Shows only user-relevant content"
- "Tabs filter between activity states"
- "If not logged in as Player, 'View Stats' is hidden"

---

## LEVEL 2: DETAIL PAGES (Accessed from Level 1)

### Page 13-22: Sport-Specific Hubs (Football, Basketball, etc.)

**Navigation Context:** Tap sport icon in Activity Filter (Level B) OR deep link

**Example: Page 13 - Football Hub**

**Top Bar:**
```
┌────────────────────────────────────────────┐
│  ← Back          FOOTBALL          [★]     │
│                                            │
│  [⚽ Icon]  130 active matches near you    │
└────────────────────────────────────────────┘
```

**Filter Bar (Sport-Specific):**
```
┌────────────────────────────────────────────┐
│  All | Leagues | Casual | Training         │
│  ^^^                                       │
└────────────────────────────────────────────┘
```

**Drop Field:** Football-only activity cards

**Additional Sections (Collapsible +/-):**
```
┌────────────────────────────────────────────┐
│  [+] Football Associations                 │
│  [+] Top Venues for Football               │
│  [+] Featured Clubs                        │
│  [+] Football Equipment Suppliers          │
└────────────────────────────────────────────┘
```

**Components:**
- **Sport Icon:** Large centered icon (48px × 48px)
- **Stat Counter:** "X active matches near you"
- **Favorite Star:** Toggle to save hub to favorites
- **Sub-Filters:** Horizontal pill buttons
- **Collapsible Sections:** +/- toggles for additional resources

**Interactions:**
- Tap "← Back" → Returns to previous page
- Tap "★" → Add/remove from favorites
- Tap Sub-Filter → Filter Drop Field
- Tap Collapsible Section → Expand to show list

**Annotations:**
- "Each of 10 sports has dedicated hub"
- "Sport hubs show: Football, Basketball, Netball, Volleyball, Rugby, Athletics, Cricket, Tennis, Swimming, Chess"
- "Dynamic count updates based on location filter"
- "Associations link to Association Pages (Page 23)"

---

### Page 23: Association Page

**Navigation Context:** Tap association link from Sport Hub OR search result

**Example: Botswana Football Association (BFA)**

**Layout:**
```
┌────────────────────────────────────────────┐
│  ← Back                                    │
│                                            │
│  [BFA LOGO]  Botswana Football Association │
│                                            │
│  [Facebook] [WhatsApp] [Website]           │
│                                            │
│  ▼ About                                   │
│  ┌──────────────────────────────────────┐ │
│  │ Official governing body for football │ │
│  │ in Botswana...                       │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ▼ Upcoming Tournaments                    │
│  ┌──────────────────────────────────────┐ │
│  │ [Tournament Card 1]                  │ │
│  │ [Tournament Card 2]                  │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ▼ News & Updates                          │
│  ┌──────────────────────────────────────┐ │
│  │ [News Flash Card 1]                  │ │
│  │ [News Flash Card 2]                  │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ▼ Affiliated Clubs                        │
│  ┌──────────────────────────────────────┐ │
│  │ [Club Card 1] [Club Card 2]          │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**Components:**
- **Logo:** 80px × 80px placeholder
- **Social Links:** 3 buttons (Facebook, WhatsApp, Website)
- **Collapsible Sections:** Default collapsed with ▶ icon
- **Embedded Cards:** Tournament, News, Club cards within sections

**Interactions:**
- Tap Social Links → Launch external app/browser
- Tap Section Headers → Expand/collapse
- Tap Embedded Cards → Navigate to respective detail pages

**Annotations:**
- "Official sport governing body page"
- "Links to external social media"
- "Shows sanctioned tournaments and affiliated clubs"

---

### Page 24: School Page

**Navigation Context:** Search result OR link from activity (school-hosted event)

**Layout:**
```
┌────────────────────────────────────────────┐
│  ← Back                                    │
│                                            │
│  [SCHOOL LOGO]  Maru-a-Pula School         │
│                 Gaborone, Botswana         │
│                                            │
│  ▼ About the School                        │
│  ┌──────────────────────────────────────┐ │
│  │ Private secondary school established │ │
│  │ in 1972...                           │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ▼ School Teams                            │
│  ┌──────────────────────────────────────┐ │
│  │ [Team Card: Boys Football U17]       │ │
│  │ [Team Card: Girls Netball U15]       │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ▼ Upcoming Competitions                   │
│  ┌──────────────────────────────────────┐ │
│  │ [Match Card 1]                       │ │
│  │ [Match Card 2]                       │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ▼ School Classes & Lessons                │
│  ┌──────────────────────────────────────┐ │
│  │ [Lesson Card 1]                      │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**Role-Based View:**
- **Teacher Profile:** Can edit content (shows "Edit" buttons)
- **Student Profile:** View-only
- **Public (Browser):** Limited teaser view

**Components:**
- **School Info:** Logo, name, location
- **Collapsible Sections:** Teams, Competitions, Classes
- **Embedded Cards:** Various activity cards

**Annotations:**
- "School-specific activity aggregation"
- "Teachers can edit and manage content"
- "Students see only public school activities"

---

### Page 25: Venue Page

**Navigation Context:** Tap venue name in activity card OR search

**Layout:**
```
┌────────────────────────────────────────────┐
│  ← Back                          [★] [📤]  │
│                                            │
│  [VENUE PHOTO]                             │
│                                            │
│  Block 3 Sports Complex                    │
│  📍 Block 3, Gaborone                      │
│  ⭐ 4.5 (230 reviews)                       │
│                                            │
│  ▼ Venue Details                           │
│  ┌──────────────────────────────────────┐ │
│  │ Facilities: 2 football fields, 4     │ │
│  │ netball courts, changing rooms...    │ │
│  │ Operating Hours: 06:00 - 21:00       │ │
│  │ Parking: Available                   │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ▼ Upcoming Activities Here                │
│  ┌──────────────────────────────────────┐ │
│  │ [Match Card 1 - Today 15:00]         │ │
│  │ [Match Card 2 - Tomorrow 10:00]      │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  [Get Directions] [WhatsApp Contact]       │
│                                            │
│  ▼ Reviews (230)                           │
│  ┌──────────────────────────────────────┐ │
│  │ "Great facility..." - User1          │ │
│  │ ⭐⭐⭐⭐⭐                                  │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**Components:**
- **Venue Photo:** 375px wide × 200px height placeholder
- **Rating Display:** Stars + review count
- **Collapsible Sections:** Details, Activities, Reviews
- **Action Buttons:** Directions (launches maps), WhatsApp contact
- **Activity Cards:** Upcoming events at this venue

**Interactions:**
- Tap "★" → Save to favorites
- Tap "📤" → Share venue
- Tap "Get Directions" → Opens map app with GPS coordinates
- Tap "WhatsApp Contact" → Launch wa.me deep link
- Tap Activity Card → Activity Detail Page

**Annotations:**
- "Aggregates all activities at this location"
- "Offline map tiles stored for directions"
- "WhatsApp deep link for venue inquiries"
- "Reviews sync when online"

---

## LEVEL 3: FORMS & EDITORS

### Page 26: Event Lab (Single-Page Application)

**Navigation Context:** Tap "+" → "Create Event/Match"

**Sticky Header:**
```
┌────────────────────────────────────────────┐
│  ← Back   [Untitled Event ✏️]   [Publish]  │
│           Saved 2 mins ago ☁️              │
└────────────────────────────────────────────┘
```

**Main Canvas (Vertical Scroll with Collapsible Cards):**

**Section 1: CORE IDENTITY (Default: Expanded)**
```
┌────────────────────────────────────────────┐
│  [-] Core Identity                         │
│  ┌──────────────────────────────────────┐ │
│  │ Competition Name *                   │ │
│  │ [___________________________]        │ │
│  │                                      │ │
│  │ Sport/Activity *                     │ │
│  │ [Select from 130+ options ▼]         │ │
│  │                                      │ │
│  │ Organization Type                    │ │
│  │ ◯ Individual Creator                 │ │
│  │ ◯ Group/Club                         │ │
│  │ ◯ School                             │ │
│  │ ◯ Association                        │ │
│  │ ◯ Business                           │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**Section 2: GAME RULES (Expands after Sport Selected)**
```
┌────────────────────────────────────────────┐
│  [+] Game Rules                            │
│  ▶ Substitution Rules (collapsed)          │
│  ▶ Position Matrix (collapsed)             │
│  ▶ Scoring System (collapsed)              │
│                                            │
│  [If "Other" sport selected]:              │
│  → [Custom Sport Wizard] button            │
└────────────────────────────────────────────┘
```

**Section 3: SCHEDULE & REGISTRATION**
```
┌────────────────────────────────────────────┐
│  [+] Schedule & Registration               │
│  ┌──────────────────────────────────────┐ │
│  │ Start Date                           │ │
│  │ [DD/MM/YYYY] [HH:MM] 📅              │ │
│  │                                      │ │
│  │ Duration                             │ │
│  │ [2] hours [30] minutes               │ │
│  │                                      │ │
│  │ Registration Deadline                │ │
│  │ [DD/MM/YYYY] [HH:MM]                 │ │
│  │                                      │ │
│  │ Max Participants                     │ │
│  │ [22] players                         │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**Section 4: VENUE & LOCATION**
```
┌────────────────────────────────────────────┐
│  [+] Venue & Location                      │
│  ┌──────────────────────────────────────┐ │
│  │ Select Existing Venue                │ │
│  │ [Search venues... 🔍]                 │ │
│  │                                      │ │
│  │ OR Add New Venue                     │ │
│  │ [Create Venue +]                     │ │
│  │                                      │ │
│  │ Location Details                     │ │
│  │ Village/Town: [Gaborone ▼]           │ │
│  │ Area: [Block 3 ▼]                    │ │
│  │ GPS: [Auto-detect 📍] OR [Manual]    │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**Section 5: REQUIREMENTS**
```
┌────────────────────────────────────────────┐
│  [+] Requirements                          │
│  ┌──────────────────────────────────────┐ │
│  │ Equipment Needed                     │ │
│  │ [+] Add equipment item               │ │
│  │ • Football × 2 (provided)            │ │
│  │ • Bibs × 20 (participants bring)     │ │
│  │                                      │ │
│  │ Skill Level                          │ │
│  │ ◯ All levels  ◉ Intermediate  ◯ Advanced│ │
│  │                                      │ │
│  │ Cost/Fees                            │ │
│  │ ◉ Free  ◯ Paid: P[___]               │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**Section 6: STREAMS & MEDIA**
```
┌────────────────────────────────────────────┐
│  [+] Streams & Media (Optional)            │
│  ┌──────────────────────────────────────┐ │
│  │ Enable Live Streaming                │ │
│  │ ☐ Allow Facebook Live links          │ │
│  │ ☐ Allow YouTube streams              │ │
│  │                                      │ │
│  │ Primary Stream URL                   │ │
│  │ [Paste link...]                      │ │
│  │                                      │ │
│  │ ☐ Allow fan-submitted streams        │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**Section 7: SPONSORSHIP**
```
┌────────────────────────────────────────────┐
│  [+] Sponsorship (Optional)                │
│  ┌──────────────────────────────────────┐ │
│  │ Enable "Sponsor-a-Game"              │ │
│  │ ☐ Seeking equipment donations        │ │
│  │ ☐ Seeking funding (Goal: P[___])     │ │
│  │                                      │ │
│  │ Sponsor Benefits                     │ │
│  │ [Logo on jerseys, social media...]   │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**Section 8: PRIVACY & SAFETY**
```
┌────────────────────────────────────────────┐
│  [+] Privacy & Safety                      │
│  ┌──────────────────────────────────────┐ │
│  │ Event Visibility                     │ │
│  │ ◉ Public  ◯ Invite-Only              │ │
│  │                                      │ │
│  │ Age Restrictions                     │ │
│  │ Minimum Age: [None ▼]                │ │
│  │ ☐ Require guardian approval for U16  │ │
│  │                                      │ │
│  │ First Aid Available                  │ │
│  │ ☐ Yes  ◉ No                          │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**Components:**
- **Sticky Header:** Competition title (inline edit), save status, publish button
- **Collapsible Cards:** 8 main sections with +/- toggles
- **Sub-Sections:** ▶/▼ toggles within main sections
- **Form Fields:** Mix of text inputs, dropdowns, radio buttons, checkboxes
- **Conditional Fields:** Some fields appear based on previous selections

**Interactions:**
- Tap Competition Title → Inline edit mode
- Tap Section Header → Expand/collapse entire section
- Tap Sub-Section → Expand/collapse within parent
- Select Sport → Auto-expands "Game Rules" with template
- Tap "Create Venue" → Opens Venue Form (Page 27) in overlay
- Tap "Publish" → Validation check → Confirmation → Navigate to Activity Detail Page (public view)

**Auto-Save Behavior:**
- **Online:** Saves to cloud every 30 seconds
- **Offline:** Saves to IndexedDB every 30 seconds
- **Status Indicator:** "Saved X mins ago ☁️" (online) or "Offline - Saved locally 🚫☁️"

**Annotations:**
- "Single-page app - no navigation between steps"
- "Collapsible sections keep screen clean"
- "Auto-saves prevent data loss"
- "Sport selection triggers template loading"
- "Offline mode queues publish for sync"

---

### Page 27: Venue Form

**Navigation Context:** Event Lab → "Create Venue" OR "+" → "Add Venue"

**Layout:**
```
┌────────────────────────────────────────────┐
│  ← Back           Add New Venue            │
│                                            │
│  Venue Name *                              │
│  [________________________]                │
│                                            │
│  Venue Type                                │
│  [Sport Complex ▼]                         │
│  (Options: Sport Complex, School, Park,    │
│   Community Center, Private, Other)        │
│                                            │
│  Location *                                │
│  Village/Town: [Gaborone ▼]                │
│  Area: [Block 3 ▼]                         │
│                                            │
│  GPS Coordinates                           │
│  [Auto-detect 📍]  OR  [Enter manually]    │
│  Lat: [_______] Long: [_______]            │
│                                            │
│  Facilities (Select all that apply)        │
│  ☐ Football field  ☐ Basketball court     │
│  ☐ Netball court  ☐ Running track          │
│  ☐ Swimming pool  ☐ Changing rooms         │
│  ☐ Parking  ☐ Lighting (night play)        │
│                                            │
│  Operating Hours                           │
│  [06:00] - [21:00]                         │
│                                            │
│  Contact Information                       │
│  WhatsApp: [+267 ___________]              │
│                                            │
│  ▼ Additional Details (Optional)           │
│  ┌──────────────────────────────────────┐ │
│  │ Surface Type: [Grass/Turf/Court]     │ │
│  │ Capacity: [___] people               │ │
│  │ Rental Cost: P[___] per hour         │ │
│  └──────────────────────────────────────┘ │
│                                            │
│        [Cancel]        [Add Venue]         │
└────────────────────────────────────────────┘
```

**Components:**
- **Required Fields:** Asterisk (*) indicator
- **Dropdown Selectors:** Village, Area, Venue Type
- **GPS Detection:** Button to auto-detect OR manual input
- **Checkboxes:** Multi-select for facilities
- **Time Pickers:** Operating hours
- **Collapsible Section:** Additional details (▼/▶ toggle)
- **Action Buttons:** Cancel (secondary), Add Venue (primary)

**Interactions:**
- Tap "Auto-detect 📍" → Request GPS permission → Fill coordinates
- Select Village → Area dropdown populates with neighborhoods
- Tap "Cancel" → Confirmation if fields filled → Return to Event Lab
- Tap "Add Venue" → Validation → Add to database → Return to Event Lab (venue auto-selected)

**Annotations:**
- "Venues stored locally + cloud sync"
- "GPS auto-detect uses device location"
- "New venues immediately available for event creation"
- "Offline mode queues venue creation"

---

### Page 28: Business Onboarding

**Navigation Context:** "+" → "Add Business"

**Multi-Step Form (Progress Indicator):**
```
┌────────────────────────────────────────────┐
│  ← Back        Add Your Business       ✕   │
│  Step 1 of 4: ●●○○                         │
└────────────────────────────────────────────┘
```

**Step 1: Business Type**
```
┌────────────────────────────────────────────┐
│  What type of business are you?            │
│                                            │
│  ◯ Sports Equipment Shop                   │
│  ◯ Health & Fitness (Gym, Physio, etc.)    │
│  ◯ Coaching/Training Service               │
│  ◯ Venue/Facility Rental                   │
│  ◯ Other Service Provider                  │
│                                            │
│           [Next →]                         │
└────────────────────────────────────────────┘
```

**Step 2: Basic Information**
```
┌────────────────────────────────────────────┐
│  Step 2 of 4: ○●●○                         │
│                                            │
│  Business Name *                           │
│  [________________________]                │
│                                            │
│  Category                                  │
│  [Auto-filled from Step 1]                 │
│                                            │
│  Description                               │
│  [_____________________________]           │
│  [_____________________________]           │
│  [_____________________________]           │
│                                            │
│  Logo/Photo                                │
│  [Upload Image] (Optional)                 │
│                                            │
│  [← Back]              [Next →]            │
└────────────────────────────────────────────┘
```

**Step 3: Location & Contact**
```
┌────────────────────────────────────────────┐
│  Step 3 of 4: ○○●○                         │
│                                            │
│  Location                                  │
│  Village/Town: [Gaborone ▼]                │
│  Area: [Block 3 ▼]                         │
│  Street Address: [_______________]         │
│                                            │
│  Contact Information                       │
│  WhatsApp: [+267 ___________] *            │
│  Facebook Page: [________________]         │
│  Email: [________________] (Optional)      │
│                                            │
│  Operating Hours                           │
│  Mon-Fri: [08:00] - [18:00]                │
│  Sat: [09:00] - [14:00]                    │
│  Sun: [Closed ▼]                           │
│                                            │
│  [← Back]              [Next →]            │
└────────────────────────────────────────────┘
```

**Step 4: Services & Pricing**
```
┌────────────────────────────────────────────┐
│  Step 4 of 4: ○○○●                         │
│                                            │
│  Services You Offer                        │
│  [+] Add Service                           │
│  • Football boots - P250-P800              │
│  • Jersey printing - P50/jersey            │
│                                            │
│  Payment Methods                           │
│  ☐ Cash  ☐ Mobile Money  ☐ Card           │
│                                            │
│  Special Offers (Optional)                 │
│  [10% off for Mizano users...]             │
│                                            │
│  [← Back]        [Submit for Review]       │
└────────────────────────────────────────────┘
```

**Post-Submission:**
```
┌────────────────────────────────────────────┐
│              ✓ Submitted!                  │
│                                            │
│  Your business is under review.            │
│  We'll notify you via WhatsApp within      │
│  24 hours once approved.                   │
│                                            │
│           [Return to Homepage]             │
└────────────────────────────────────────────┘
```

**Components:**
- **Progress Indicator:** 4-step dots (filled = completed)
- **Step-Specific Forms:** Different fields per step
- **Upload Button:** For logo/photo
- **Time Pickers:** Operating hours
- **Confirmation Screen:** Post-submission feedback

**Interactions:**
- Tap "Next" → Validate current step → Advance
- Tap "Back" → Save current data → Previous step
- Tap "Submit for Review" → Validation → Queue for admin approval
- Tap "Return to Homepage" → Navigate to Homepage

**Annotations:**
- "Multi-step reduces cognitive load"
- "Progress saved at each step"
- "Admin approval required before business goes live"
- "WhatsApp notification on approval"

---

### Page 29: Bulletin Editor

**Navigation Context:** "+" → "Post to Bulletin"

**Layout:**
```
┌────────────────────────────────────────────┐
│  ← Back        New Bulletin Post       ✕   │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│  Post Type                                 │
│  ◯ Announcement  ◯ Question  ◉ Discussion  │
│                                            │
│  Title *                                   │
│  [________________________]                │
│                                            │
│  Content *                                 │
│  [_____________________________]           │
│  [_____________________________]           │
│  [_____________________________]           │
│  [_____________________________]           │
│  [_____________________________]           │
│                                            │
│  Category                                  │
│  [Select sport/activity ▼]                 │
│                                            │
│  Location                                  │
│  [Gaborone ▼] [Block 3 ▼]                  │
│                                            │
│  Visibility                                │
│  ◉ Public  ◯ Members Only                  │
│                                            │
│  Attach Image (Optional)                   │
│  [Upload Image]                            │
│                                            │
│        [Cancel]        [Post]              │
└────────────────────────────────────────────┘
```

**Components:**
- **Post Type Selector:** Radio buttons (Announcement, Question, Discussion)
- **Text Fields:** Title (single line), Content (multi-line)
- **Dropdowns:** Category, Location filters
- **Visibility Toggle:** Public vs. Members Only
- **Image Upload:** Optional attachment
- **Action Buttons:** Cancel, Post (primary)

**Interactions:**
- Select Post Type → Changes icon/badge on published post
- Fill fields → "Post" button becomes active
- Tap "Upload Image" → File picker → Preview
- Tap "Cancel" → Confirmation if content exists
- Tap "Post" → Publish to Community Feed

**Annotations:**
- "Community bulletin board for discussions"
- "Location-filtered to show local posts"
- "Posts sync when online"
- "Members Only requires login to view"

---

## LEVEL 4: SUB-DETAIL PAGES

### Page 30: Activity Detail Page

**Navigation Context:** Tap any activity card from Drop Field

**Top Bar:**
```
┌────────────────────────────────────────────┐
│  ← Back                        [★] [📤]    │
└────────────────────────────────────────────┘
```

**Hero Section:**
```
┌────────────────────────────────────────────┐
│  [SPORT ICON]                              │
│  U17 Football Championship                 │
│  📅 Saturday, 20 August · 15:00            │
│  📍 Block 3 Sports Complex                 │
│  👥 18/22 players registered               │
│                                            │
│  [Orange Badge: LIVE NOW] (if active)      │
│  [Green Badge: RECRUITING - Need 4 more!]  │
│  [Yellow Badge: UPCOMING]                  │
└────────────────────────────────────────────┘
```

**Tab Navigation:**
```
┌────────────────────────────────────────────┐
│  Details | Roster | Streams | Sponsors     │
│  ^^^^^^^                                   │
└────────────────────────────────────────────┘
```

**Tab 1: Details (Default)**
```
┌────────────────────────────────────────────┐
│  ▼ Event Information                       │
│  ┌──────────────────────────────────────┐ │
│  │ Sport: Football (11-a-side)          │ │
│  │ Duration: 90 minutes                 │ │
│  │ Skill Level: Intermediate            │ │
│  │ Cost: Free                           │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ▼ Organizer                               │
│  ┌──────────────────────────────────────┐ │
│  │ Gaborone Youth FC                    │ │
│  │ [WhatsApp Contact] [Facebook Page]   │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ▼ Requirements                            │
│  ┌──────────────────────────────────────┐ │
│  │ Equipment Needed:                    │ │
│  │ • Football boots (bring your own)    │ │
│  │ • Shin guards (required)             │ │
│  │ • Jersey provided by organizer       │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ▼ Location & Directions                   │
│  ┌──────────────────────────────────────┐ │
│  │ [Map Preview]                        │ │
│  │ [Get Directions] [View Venue Details]│ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ▼ Weather (for outdoor events)            │
│  ┌──────────────────────────────────────┐ │
│  │ 28°C · Partly Cloudy · 10% rain      │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**Tab 2: Roster**
```
┌────────────────────────────────────────────┐
│  Registered Players (18/22)                │
│                                            │
│  Positions Filled:                         │
│  ✓ Goalkeeper (2/2)                        │
│  ✓ Defenders (6/6)                         │
│  ⚠️ Midfielders (5/6) - Need 1 more!       │
│  ✓ Forwards (5/5)                          │
│                                            │
│  [PLAYER LIST]                             │
│  ┌──────────────────────────────────────┐ │
│  │ [Photo] John Modise · GK             │ │
│  │ [Photo] Sarah Kgosi · DF             │ │
│  │ [Photo] Neo Tau · MF                 │ │
│  │ ... (scrollable list)                │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**Tab 3: Streams**
```
┌────────────────────────────────────────────┐
│  Live Streams Available                    │
│                                            │
│  Official Stream                           │
│  ┌──────────────────────────────────────┐ │
│  │ [▶️] Watch on Facebook Live           │ │
│  │ Organized by Gaborone Youth FC       │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  Fan Streams (2)                           │
│  ┌──────────────────────────────────────┐ │
│  │ [▶️] North Stand View (Facebook)     │ │
│  │ [▶️] Behind Goal Cam (YouTube)       │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  [+ Add Your Stream]                       │
└────────────────────────────────────────────┘
```

**Tab 4: Sponsors**
```
┌────────────────────────────────────────────┐
│  Current Sponsors (3)                      │
│  ┌──────────────────────────────────────┐ │
│  │ [LOGO] Mascom                        │ │
│  │ [LOGO] Choppies                      │ │
│  │ [LOGO] BTC                           │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  Sponsorship Opportunities                 │
│  ┌──────────────────────────────────────┐ │
│  │ 🎯 Equipment Goal: P500 (60% funded) │ │
│  │ Progress: [■■■■■■□□□□] 60%           │ │
│  │                                      │ │
│  │ [Become a Sponsor]                   │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**Bottom Action Bar (Sticky):**
```
┌────────────────────────────────────────────┐
│         [Join Match] (Blue - Interest Color)       │
│  OR                                        │
│  [Awaiting Guardian Approval] (Charcoal)   │
│  OR                                        │
│  [Match Full - Add to Waitlist] (Blue)     │
└────────────────────────────────────────────┘
```

**Components:**
- **Hero Section:** Sport icon, title, date/time, location, participant count, status badge
- **Tab Navigation:** 4 tabs (Details, Roster, Streams, Sponsors)
- **Collapsible Sections:** Within each tab, +/- toggles
- **Action Buttons:** Tab-specific actions (WhatsApp, Get Directions, Add Stream, etc.)
- **Sticky Bottom Bar:** Primary CTA (Join, Approval status, Waitlist)

**Interactions:**
- Tap "← Back" → Return to previous page (preserves scroll position)
- Tap "★" → Add/remove from favorites
- Tap "📤" → Share (WhatsApp, Facebook)
- Tap Tab → Switch content view
- Tap Collapsible Section → Expand/collapse
- Tap "WhatsApp Contact" → Launch wa.me deep link
- Tap "Get Directions" → Launch maps app
- Tap "[▶️]" → Launch external stream (Facebook/YouTube)
- Tap "Join Match" → 
  - If logged in as Player + age ≥ 16 → Registration confirmation
  - If U16 → Guardian approval request
  - If Browser/User → "Upgrade to Player" prompt
- Tap "Add Your Stream" → Stream submission form

**Conditional Elements:**
- **Status Badges:** 
  - Orange "LIVE NOW" (if current time within event duration)
  - Green "RECRUITING - Need X more!" (if match-making active)
  - Yellow "UPCOMING" (if scheduled future)
  - Charcoal "FINISHED" (if past)
  - Pink "CLOSING TODAY!" (if registration deadline today)
- **Weather Section:** Only shows for outdoor events
- **Guardian Approval:** Only shows for U16 users attempting competitive join
- **Sponsor Tab:** Only visible if creator enabled sponsorship

**Annotations:**
- "Central hub for all event information"
- "Tabs organize complex data cleanly"
- "Deep links to external platforms (WhatsApp, Facebook, YouTube)"
- "Offline map tiles for directions"
- "Join button logic depends on profile type and age"
- "Status badges auto-update based on time"

---

### Page 31: Live Score Page

**Navigation Context:** Tap "LIVE NOW" badge OR "View Live Score" from Activity Detail

**Top Bar:**
```
┌────────────────────────────────────────────┐
│  ← Back        LIVE MATCH        [📤]      │
└────────────────────────────────────────────┘
```

**Scoreboard:**
```
┌────────────────────────────────────────────┐
│  Team A                     Team B         │
│  [LOGO]                     [LOGO]         │
│    2           45:30          1            │
│         (Half Time)                        │
└────────────────────────────────────────────┘
```

**Match Timeline (Vertical Scroll):**
```
┌────────────────────────────────────────────┐
│  45' ⚽ GOAL! Team A - John Modise         │
│  42' 🟨 Yellow Card - Sarah Kgosi (Team B) │
│  38' ⚽ GOAL! Team B - Neo Tau             │
│  35' ↔️ Substitution - Team A              │
│  ...                                       │
│  1' ⏱️ Kick-off                            │
└────────────────────────────────────────────┘
```

**Stats Summary (+/- Toggle):**
```
┌────────────────────────────────────────────┐
│  [+] Match Statistics                      │
│  (Tap to expand)                           │
│  → Shots on Target: 5 vs 3                 │
│  → Possession: 55% vs 45%                  │
│  → Corners: 4 vs 2                         │
└────────────────────────────────────────────┘
```

**Bottom Action Bar:**
```
┌────────────────────────────────────────────┐
│  [Auto-Refresh: ON ⟳] [View Full Match]   │
└────────────────────────────────────────────┘
```

**Components:**
- **Scoreboard:** Team names, logos (40px × 40px), scores, match clock
- **Match State:** (Kick-off, 1st Half, Half Time, 2nd Half, Full Time)
- **Timeline:** Chronological event list (goals, cards, subs)
- **Collapsible Stats:** +/- toggle for detailed statistics
- **Auto-Refresh Toggle:** ON/OFF button (syncs every 30 seconds)

**Interactions:**
- Tap "← Back" → Return to Activity Detail Page
- Tap "📤" → Share current score
- Tap Event in Timeline → Expand for details (e.g., goal scorer, assist)
- Tap "[+] Match Statistics" → Expand/collapse stats
- Tap "Auto-Refresh" → Toggle ON/OFF
- Tap "View Full Match" → Navigate to Activity Detail Page (Streams tab)

**Real-Time Behavior:**
- **Online:** Syncs every 15 seconds (if auto-refresh ON)
- **Offline:** Shows last synced time, queues user for notification when back online

**Annotations:**
- "Real-time score updates"
- "Timeline shows chronological events"
- "Auto-refresh can be toggled to save data"
- "Offline mode shows last known state"
- "Links back to full match detail for streams"

---

### Page 32: Registration Form

**Navigation Context:** Activity Detail → "Join Match" button (for events requiring registration)

**Layout:**
```
┌────────────────────────────────────────────┐
│  ← Back      Register for Event       ✕    │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│  U17 Football Championship                 │
│  Saturday, 20 August · 15:00               │
│                                            │
│  Your Details                              │
│  ┌──────────────────────────────────────┐ │
│  │ Full Name: [Auto-filled from profile]│ │
│  │ Age: [16] (from profile)             │ │
│  │ WhatsApp: [+267 ___] (from profile)  │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  Position Preference                       │
│  [Midfielder ▼]                            │
│  (Options based on sport)                  │
│                                            │
│  Equipment Status                          │
│  ☐ I have all required equipment           │
│  ☑ I need to borrow: [Shin guards]         │
│                                            │
│  Emergency Contact                         │
│  Name: [_____________]                     │
│  WhatsApp: [+267 ___________]              │
│                                            │
│  [IF U16 DETECTED]:                        │
│  ⚠️ Guardian Approval Required             │
│  ┌──────────────────────────────────────┐ │
│  │ Your guardian will receive a         │ │
│  │ notification to approve your         │ │
│  │ participation.                       │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  Terms & Conditions                        │
│  ☐ I agree to the event rules and safety  │
│     guidelines                             │
│                                            │
│     [Cancel]        [Submit Registration]  │
└────────────────────────────────────────────┘
```

**Post-Submission (Age ≥ 16):**
```
┌────────────────────────────────────────────┐
│              ✓ Registered!                 │
│                                            │
│  You're in! We'll send you a WhatsApp      │
│  message with the group link and           │
│  final details.                            │
│                                            │
│  [View Match Details] [Return to Homepage] │
└────────────────────────────────────────────┘
```

**Post-Submission (Age < 16):**
```
┌────────────────────────────────────────────┐
│          ⏳ Awaiting Approval               │
│                                            │
│  Your registration is pending guardian     │
│  approval. We've sent a notification to:   │
│  +267 XXX XXXX                             │
│                                            │
│  You'll receive a WhatsApp message once    │
│  approved.                                 │
│                                            │
│           [Return to Homepage]             │
└────────────────────────────────────────────┘
```

**Components:**
- **Event Summary:** Top section showing event name, date, time
- **Auto-Filled Fields:** Name, age, WhatsApp from profile
- **Position Selector:** Dropdown (sport-specific options)
- **Equipment Checklist:** Checkboxes for owned/needed items
- **Emergency Contact:** Manual input fields
- **Conditional Warning:** Guardian approval notice for U16
- **Terms Checkbox:** Required before submission
- **Action Buttons:** Cancel, Submit

**Interactions:**
- Tap "✕" or "Cancel" → Confirmation → Return to Activity Detail
- Tap "Submit Registration" → 
  - Validation check
  - If age ≥ 16 → Immediate confirmation → WhatsApp group invite
  - If age < 16 → Guardian notification → Pending status
- Equipment checkbox triggers borrow/lend flow if needed

**Annotations:**
- "Auto-fills user data to speed up registration"
- "Guardian approval flow automatic for U16 users"
- "Offline mode queues registration for sync"
- "WhatsApp group link sent after confirmation"

---

### Page 33: Equipment Ledger

**Navigation Context:** Activity Detail → "I need to borrow" checkbox OR Mine Page → "Equipment"

**Layout:**
```
┌────────────────────────────────────────────┐
│  ← Back        Equipment Ledger            │
│                                            │
│  My Equipment | Borrow | Lend              │
│  ^^^^^^^^^^^                               │
└────────────────────────────────────────────┘
```

**Tab 1: My Equipment**
```
┌────────────────────────────────────────────┐
│  Items I Own                               │
│  ┌──────────────────────────────────────┐ │
│  │ ⚽ Football Boots (Size 9)            │ │
│  │ Status: Available to lend            │ │
│  │ [Edit] [Mark as Unavailable]         │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ 🥅 Shin Guards                        │ │
│  │ Status: Currently lent to John M.    │ │
│  │ Return by: 25 Aug                    │ │
│  │ [Send Reminder] [Mark as Returned]   │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  [+ Add Equipment]                         │
└────────────────────────────────────────────┘
```

**Tab 2: Borrow**
```
┌────────────────────────────────────────────┐
│  Available to Borrow Nearby                │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ ⚽ Football Boots (Size 9)            │ │
│  │ Owner: Sarah K. (Block 3)            │ │
│  │ Available: Today-Friday              │ │
│  │ [Request to Borrow]                  │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ 🏀 Basketball (Spalding)              │ │
│  │ Owner: Neo T. (Block 5)              │ │
│  │ Available: Weekends                  │ │
│  │ [Request to Borrow]                  │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  My Active Borrows (1)                     │
│  ┌──────────────────────────────────────┐ │
│  │ 🥅 Shin Guards                        │ │
│  │ From: John M.                        │ │
│  │ Return by: Tomorrow                  │ │
│  │ [WhatsApp Owner] [Mark as Returned]  │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**Tab 3: Lend**
```
┌────────────────────────────────────────────┐
│  Pending Borrow Requests (2)               │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ ⚽ Football Boots (Size 9)            │ │
│  │ Requested by: Michael K.             │ │
│  │ For: U17 Match on 20 Aug             │ │
│  │ [Approve] [Decline]                  │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  Currently Lent Out (1)                    │
│  ┌──────────────────────────────────────┐ │
│  │ 🥅 Shin Guards                        │ │
│  │ To: Sarah K.                         │ │
│  │ Return by: 25 Aug                    │ │
│  │ [Send Reminder] [Mark as Returned]   │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**Components:**
- **Tab Navigation:** 3 tabs (My Equipment, Borrow, Lend)
- **Equipment Cards:** Item name, status, availability, actions
- **Request System:** Approve/decline for lenders, request for borrowers
- **Reminder Function:** WhatsApp-based reminders
- **Return Tracking:** Dates, status indicators

**Interactions:**
- Tap "[+ Add Equipment]" → Equipment form (name, size, photo)
- Tap "[Request to Borrow]" → Sends notification to owner → Queued until approved
- Tap "[Approve]" → Confirms borrow → Sends WhatsApp with pickup details
- Tap "[Decline]" → Sends polite notification to requester
- Tap "[Send Reminder]" → Automated WhatsApp reminder to borrower
- Tap "[Mark as Returned]" → Closes transaction → Logs history
- Tap "[WhatsApp Owner]" → Launch wa.me deep link

**Offline Behavior:**
- All transactions queued locally
- Sync when online
- Reminders sent when connectivity restored

**Annotations:**
- "Community-driven equipment sharing"
- "Reduces cost barrier to participation"
- "WhatsApp integration for communication"
- "Offline-capable with sync queue"
- "Transaction history for trust/safety"

---

### Page 34: Lost & Found

**Navigation Context:** Mine Page → "Lost & Found" OR Search → "Lost & Found"

**Layout:**
```
┌────────────────────────────────────────────┐
│  ← Back         Lost & Found               │
│                                            │
│  [Post Lost Item]  [Post Found Item]      │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│  Active Listings                           │
│  Lost | Found | Claimed                    │
│  ^^^^                                      │
└────────────────────────────────────────────┘
```

**Lost Items Tab:**
```
┌────────────────────────────────────────────┐
│  ┌──────────────────────────────────────┐ │
│  │ Charcoal [LOST]                             │ │
│  │ Football Boots (Size 9, Adidas)      │ │
│  │ Last seen: Block 3 Sports Complex    │ │
│  │ Date: 18 Aug                         │ │
│  │                                      │ │
│  │ [💰 Boosted: P2.00] (if boosted)     │ │
│  │                                      │ │
│  │ Posted by: John M.                   │ │
│  │ [I Found This!] [WhatsApp]           │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ Charcoal [LOST]                             │ │
│  │ Water Bottle (Blue, Nama brand)      │ │
│  │ Last seen: Maru-a-Pula field         │ │
│  │ Date: Yesterday                      │ │
│  │                                      │ │
│  │ Posted by: Sarah K.                  │ │
│  │ [I Found This!] [WhatsApp]           │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**Found Items Tab:**
```
┌────────────────────────────────────────────┐
│  ┌──────────────────────────────────────┐ │
│  │ Yellow [FOUND]                             │ │
│  │ [PHOTO] Blue Backpack                │ │
│  │ Found at: Block 5 Park               │ │
│  │ Date: Today                          │ │
│  │                                      │ │
│  │ Posted by: Neo T.                    │ │
│  │ [This is Mine!] [WhatsApp]           │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**Post Lost Item Form:**
```
┌────────────────────────────────────────────┐
│  ← Back        Report Lost Item            │
│                                            │
│  Item Description *                        │
│  [_____________________________]           │
│                                            │
│  Category                                  │
│  [Sports Equipment ▼]                      │
│                                            │
│  Last Seen Location                        │
│  [Block 3 Sports Complex ▼]                │
│                                            │
│  Date Lost                                 │
│  [DD/MM/YYYY]                              │
│                                            │
│  Upload Photo (Optional)                   │
│  [Upload Image]                            │
│                                            │
│  💰 Boost Listing (P2.00)                  │
│  ☐ Pin to top for 7 days                   │
│  ☐ Highlight with gold border              │
│  ☐ Send alerts to nearby users             │
│                                            │
│  Payment Method (if boosted)               │
│  ◯ Orange Money  ◯ Mascom MyZaka           │
│                                            │
│     [Cancel]        [Post Listing]         │
└────────────────────────────────────────────┘
```

**Components:**
- **Action Buttons:** Post Lost, Post Found
- **Tab Navigation:** Lost, Found, Claimed
- **Item Cards:** Description, location, date, poster, actions
- **Boost Badge:** Gold "💰 Boosted" indicator
- **Post Form:** Description, category, location, photo, boost option
- **Payment Integration:** Mobile money for P2.00 boost

**Interactions:**
- Tap "[Post Lost Item]" → Lost item form
- Tap "[Post Found Item]" → Found item form
- Tap "[I Found This!]" → Claim form → Sends notification to poster
- Tap "[This is Mine!]" → Claim form → Sends notification to finder
- Tap "[WhatsApp]" → Launch wa.me to contact poster/finder
- Tap "☐ Boost Listing" → Payment flow → Highlights listing

**Boost Feature (P2.00):**
- Pins listing to top of feed for 7 days
- Gold border highlight
- Sends push notifications to users in same area
- Revenue supports app maintenance (non-sleazy monetization)

**Annotations:**
- "Community-driven lost & found"
- "P2.00 boost is only monetization feature"
- "Boost revenue funds app operations"
- "Photo uploads help verify claims"
- "WhatsApp for direct coordination"

---

## OVERLAYS (Any Level)

### Page 35: Settings Menu

**Navigation Context:** Tap Mizano logo (top-left) OR Hamburger menu

**Full-Screen Overlay:**
```
┌────────────────────────────────────────────┐
│  ✕                SETTINGS                 │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│  [+] Account & Profile                     │
│  [+] My Activity Hub                       │
│  [+] Navigation & Display                  │
│  [+] Data & Offline Sync                   │
│  [+] Community & Safety                    │
│  [+] About & Legal                         │
└────────────────────────────────────────────┘
```

**Section 1: Account & Profile (Expanded)**
```
┌────────────────────────────────────────────┐
│  [-] Account & Profile                     │
│  ┌──────────────────────────────────────┐ │
│  │ Edit Profile                         │ │
│  │ Switch to Player Profile             │ │
│  │ Become a Mentor                      │ │
│  │ Guardian Dashboard                   │ │
│  │ Delete Account                       │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**Section 2: My Activity Hub**
```
┌────────────────────────────────────────────┐
│  [+] My Activity Hub                       │
│  (Tap to expand)                           │
│  → View Borrow History                     │
│  → My Wishlist                             │
│  → Export Match History PDF (P5.00)        │
└────────────────────────────────────────────┘
```

**Section 3: Navigation & Display**
```
┌────────────────────────────────────────────┐
│  [+] Navigation & Display                  │
│  → Drag to Reorder Main Pages              │
│  → Default Location: [Gaborone, Block 3 ▼] │
│  → Dark Mode: [OFF] (Toggle)               │
└────────────────────────────────────────────┘
```

**Section 4: Data & Offline Sync**
```
┌────────────────────────────────────────────┐
│  [+] Data & Offline Sync                   │
│  → Update Offline Map Tiles (122 MB)       │
│  → Sync Now (Last: 5 mins ago)             │
│  → Clear Cache (Free up 45 MB)             │
│  → Data Saver Mode: [ON] (WebP images)     │
└────────────────────────────────────────────┘
```

**Section 5: Community & Safety**
```
┌────────────────────────────────────────────┐
│  [+] Community & Safety                    │
│  → Enable Gambling Features: [OFF]         │
│  → View Nearby Clinics/First Aid           │
│  → Report a Problem                        │
│  → Block User                              │
└────────────────────────────────────────────┘
```

**Section 6: About & Legal**
```
┌────────────────────────────────────────────┐
│  [+] About & Legal                         │
│  → Terms of Service                        │
│  → Privacy Policy                          │
│  → WhatsApp Support                        │
│  → App Version: 1.0.2                      │
└────────────────────────────────────────────┘
```

**Components:**
- **Close Button:** ✕ (top-right)
- **Collapsible Sections:** 6 main sections with +/- toggles
- **Action Items:** Buttons/links within each section
- **Toggles:** ON/OFF switches for features
- **Dropdowns:** For selections (location, etc.)

**Interactions:**
- Tap "✕" → Close overlay, return to previous page
- Tap Section Header → Expand/collapse
- Tap "Edit Profile" → Edit Profile Page (Page 37)
- Tap "Switch to Player" → Player upgrade flow
- Tap "Become a Mentor" → Mentor registration flow
- Tap "Guardian Dashboard" → Guardian Dashboard Page (Page 19)
- Tap "Delete Account" → Confirmation dialog → Account deletion
- Tap "Export Match History PDF" → Payment flow (P5.00) → PDF generation
- Tap "Update Map Tiles" → Download progress bar
- Tap "Sync Now" → Manual sync trigger
- Tap "Clear Cache" → Confirmation → Free up storage
- Tap Toggles → Immediate effect (Dark Mode, Data Saver, Gambling)
- Tap "WhatsApp Support" → Launch wa.me deep link

**Annotations:**
- "Central hub for all app settings"
- "Collapsible sections organize 20+ settings cleanly"
- "Guardian Dashboard only visible if user is guardian"
- "Player/Mentor options only show for eligible users"
- "Map tiles enable full offline navigation"

---

### Page 36: Search Interface

**Navigation Context:** Tap Search icon in bottom menu

**Full-Screen Overlay (Replaces Drop Field):**
```
┌────────────────────────────────────────────┐
│  GC · Block 3 ▼              [📍] [📅]     │
│  ┌──────────────────────────────────────┐ │
│  │ 🔍 Search matches, clubs, players... │ │
│  │                                  [★] │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**Auto-Fill Suggestions (As User Types):**
```
┌────────────────────────────────────────────┐
│  Search: "foot"                            │
│  ┌──────────────────────────────────────┐ │
│  │ ⚽ Football matches                   │ │
│  │ 🏟️ Football venues                    │ │
│  │ 👥 Football clubs                     │ │
│  │ 👤 Players: "foot" in name            │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**Recent Searches (If Search Field Empty):**
```
┌────────────────────────────────────────────┐
│  Recent Searches                           │
│  ┌──────────────────────────────────────┐ │
│  │ 🕐 Basketball tournaments             │ │
│  │ 🕐 Block 5 venues                     │ │
│  │ 🕐 Chess clubs                        │ │
│  │                    [Clear All]        │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**Search Results (Categorized):**
```
┌────────────────────────────────────────────┐
│  Results for "football" (127)              │
│                                            │
│  Matches (42) [View All →]                 │
│  ┌──────────────────────────────────────┐ │
│  │ [Match Card 1]                       │ │
│  │ [Match Card 2]                       │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  Clubs (12) [View All →]                   │
│  ┌──────────────────────────────────────┐ │
│  │ [Club Card 1]                        │ │
│  │ [Club Card 2]                        │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  Venues (8) [View All →]                   │
│  ┌──────────────────────────────────────┐ │
│  │ [Venue Card 1]                       │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  Players (65) [View All →]                 │
│  ┌──────────────────────────────────────┐ │
│  │ [Player Profile Card 1]              │ │
│  │ [Player Profile Card 2]              │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**Favorite Star Behavior:**
```
┌────────────────────────────────────────────┐
│  🔍 [Search field]               [⭐]      │
│  Tap star → Toggle Grey/Gold               │
│  Gold = Show only favorited items          │
└────────────────────────────────────────────┘
```

**Components:**
- **Search Field:** Rising from bottom with smooth animation
- **Favorite Star:** Grey (all results) / Gold (favorites only)
- **Auto-Fill Dropdown:** Live suggestions as user types
- **Recent Searches:** Max 10, stored locally
- **Categorized Results:** Matches, Clubs, Venues, Players, Lessons, etc.
- **View All Links:** For each category

**Interactions:**
- Tap Search Field → Keyboard appears, auto-fill suggestions show
- Type Query → Live filtering, suggestions update
- Tap Suggestion → Execute search
- Tap Recent Search → Execute search
- Tap "Clear All" → Delete recent searches
- Tap Result Card → Navigate to detail page
- Tap "View All →" → Filtered view of that category only
- Tap "⭐" → Toggle favorites filter
- Tap "← Back" (Android) → Close search, return to previous page

**Annotations:**
- "Replaces Drop Field when active"
- "Places filter still functional at top"
- "Auto-fill reduces typing, saves data"
- "Recent searches stored locally (max 10)"
- "Categorized results help users find specific types"
- "Gold star filters to only favorited content"

---

### Page 37: Notifications Panel

**Navigation Context:** Tap Notification icon (🔔) in bottom menu

**Slide-Up Panel (Half-Screen):**
```
┌────────────────────────────────────────────┐
│  Notifications (5)              [Clear All]│
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│  🟡 NEW                                    │
│  ┌──────────────────────────────────────┐ │
│  │ ⚽ Football match needs 2 more!       │ │
│  │ U17 Championship · Block 3           │ │
│  │ Starting in 15 mins (Pink - Urgent)    │ │
│  │                           5 mins ago │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  │ 🟡 NEW                                    │
│  ┌──────────────────────────────────────┐ │
│  │ ✅ Your registration was approved     │ │
│  │ Saturday's tournament · Tap to join  │ │
│  │ WhatsApp group                       │ │
│  │                          15 mins ago │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ 🏀 Basketball lesson tomorrow         │ │
│  │ Intermediate class · 10:00 AM        │ │
│  │                           2 hours ago│ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ 📢 New bulletin post in your area    │ │
│  │ "Looking for chess players..."       │ │
│  │                      Yesterday 18:30 │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ ⚠️ Borrow reminder                    │ │
│  │ Return shin guards to John M.        │ │
│  │ Due: Tomorrow                        │ │
│  │                        2 days ago    │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**Filter Tabs (Top of Panel):**
```
┌────────────────────────────────────────────┐
│  All | Urgent | Activities | Messages      │
│  ^^^                                       │
└────────────────────────────────────────────┘
```

**Components:**
- **Header:** Title with unread count, "Clear All" button
- **Filter Tabs:** All, Urgent, Activities, Messages
- **Notification Cards:** Icon, message, timestamp
- **NEW Badge:** Red indicator for unread
- **Swipe Actions:** Left to delete, Right to mark read

**Notification Types:**
- **Activity Updates:** Match starting, roster changes, registration approved
- **Borrow/Lend:** Equipment reminders, return due dates
- **Bulletin Posts:** New community posts in user's area
- **Guardian Approvals:** Pending requests, approvals/declines
- **Sponsorship:** Funding milestones reached
- **System:** App updates, maintenance notices

**Interactions:**
- Tap Notification Card → Navigate to relevant page
- Swipe Left → Delete notification (with undo option)
- Swipe Right → Mark as read (remove red badge)
- Tap "Clear All" → Confirmation → Delete all read notifications
- Tap Filter Tab → Filter notification list
- Tap Outside Panel → Close panel

**Persistent Badge (Bottom Menu Icon):**
- Shows unread count
- Max display: +888
- Red circle with white number

**Annotations:**
- "Slide-up panel preserves context"
- "Swipe gestures for quick actions"
- "Filters help prioritize urgent items"
- "Deep links navigate directly to related pages"
- "Offline notifications queue for delivery when online"

---

### Page 38: Add Menu

**Navigation Context:** Tap "+" icon in bottom menu

**Slide-Up Panel (3/4 Screen):**
```
┌────────────────────────────────────────────┐
│  ✕              What would you like        │
│                 to create?                 │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│  ┌──────────────────────────────────────┐ │
│  │ [⚽] Create Event/Match                │ │
│  │ Organize a game, tournament, or      │ │
│  │ competition                          │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ [👥] Create Group/Club                │ │
│  │ Start a team or community group      │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ [🏪] Add Business                     │ │
│  │ Register your shop or service        │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ [🏟️] Add Venue                        │ │
│  │ List a sports facility or field      │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ [📢] Post to Bulletin                 │ │
│  │ Share a message with your community  │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ [🔍] Join Existing Group              │ │
│  │ Search for clubs to join             │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**Components:**
- **Close Button:** ✕ (top-right)
- **Option Cards:** 6 creation paths, icon + title + description
- **Icons:** 32px × 32px, colored
- **Conditional Visibility:** Some options hidden based on profile type

**Profile-Based Permissions:**
- **Browser/User:** Only "Join Existing Group" and "Post to Bulletin"
- **Player:** All except "Add Business" and "Add Venue" (requires Creator)
- **Creator:** All options
- **Guardian:** Only "Post to Bulletin"

**Interactions:**
- Tap "✕" → Close panel
- Tap Option Card → Navigate to respective creation form
  - "Create Event/Match" → Event Lab (Page 26)
  - "Create Group/Club" → Group Registration Flow
  - "Add Business" → Business Onboarding (Page 28)
  - "Add Venue" → Venue Form (Page 27)
  - "Post to Bulletin" → Bulletin Editor (Page 29)
  - "Join Existing Group" → Search Interface (filtered to groups)
- Tap Outside Panel → Close panel

**Upgrade Prompts (If Insufficient Permissions):**
```
┌────────────────────────────────────────────┐
│  ⚠️ Creator Profile Required               │
│                                            │
│  To add businesses or venues, upgrade to   │
│  a Creator profile.                        │
│                                            │
│  [Learn More] [Upgrade Now]                │
└────────────────────────────────────────────┘
```

**Annotations:**
- "Contextual creation menu"
- "Permissions based on profile type"
- "Upgrade prompts for restricted actions"
- "Icons help quick recognition"

---

### Page 39: Navigation Menu (Hamburger)

**Navigation Context:** Tap Hamburger icon (≡) in bottom menu OR Home Menu (☰)

**Full-Screen Overlay:**
```
┌────────────────────────────────────────────┐
│  ✕          QUICK NAVIGATION               │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│  Main Pages                                │
│  ┌──────────────────────────────────────┐ │
│  │ 🏠 Homepage                           │ │
│  │ ⚽ Sports                              │ │
│  │ 🎨 Hobbies                            │ │
│  │ 📚 Lessons                            │ │
│  │ 🌳 Leisure                            │ │
│  │ 🏆 Events                             │ │
│  │ 👤 Mine                               │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  Discover                                  │
│  ┌──────────────────────────────────────┐ │
│  │ 🛒 Shopping                           │ │
│  │ 🏪 Shops (Equipment)                  │ │
│  │ 🏥 Businesses (Clinics, Physio)       │ │
│  │ 🏛️ Institutions (Associations)        │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  Community                                 │
│  ┌──────────────────────────────────────┐ │
│  │ 📢 Bulletin Board                     │ │
│  │ 🏅 Leaderboards                       │ │
│  │ 🔍 Lost & Found                       │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  Resources                                 │
│  ┌──────────────────────────────────────┐ │
│  │ 🏥 First-Aid Directory                │ │
│  │ 📖 Help Center                        │ │
│  │ ⚙️ Settings                           │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**Components:**
- **Close Button:** ✕ (top-right)
- **Grouped Navigation:** 4 sections (Main, Discover, Community, Resources)
- **Item Icons:** 24px × 24px, colored
- **Item Labels:** 16px Regular, Charcoal

**Interactions:**
- Tap "✕" → Close overlay
- Tap Any Item → Navigate to that page, close overlay
- Tap Outside Overlay → Close overlay

**Reordering Feature (From Settings):**
- Users can drag to reorder main pages
- Preference saved locally
- Custom order reflects in carousel navigation

**Annotations:**
- "Alternative navigation to horizontal swipe"
- "Grouped by function for easy scanning"
- "Custom ordering available in settings"
- "Persistent across sessions"

---

## ADDITIONAL UTILITY PAGES

### Page 40: Help Center

**Navigation Context:** Settings → "Help Center" OR Navigation Menu

**Layout:**
```
┌────────────────────────────────────────────┐
│  ← Back           Help Center              │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│  🔍 Search for help...                     │
│  [________________________]                │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│  [+] Getting Started                       │
│  [+] Creating Events                       │
│  [+] Joining Activities                    │
│  [+] Profile Management                    │
│  [+] Equipment Lending                     │
│  [+] Guardian Features                     │
│  [+] Troubleshooting                       │
│  [+] Account & Privacy                     │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│  Can't find what you need?                 │
│  [WhatsApp Support] [Report Problem]       │
└────────────────────────────────────────────┘
```

**Expanded FAQ Example:**
```
┌────────────────────────────────────────────┐
│  [-] Getting Started                       │
│  ┌──────────────────────────────────────┐ │
│  │ ▶ How do I create a player profile?  │ │
│  │ ▶ What is the difference between     │ │
│  │   User and Player?                   │ │
│  │ ▶ How do I add my location?          │ │
│  │ ▼ How does offline mode work?        │ │
│  │   ┌────────────────────────────────┐ │ │
│  │   │ Mizano stores data locally so  │ │ │
│  │   │ you can browse and join        │ │ │
│  │   │ activities without internet... │ │ │
│  │   └────────────────────────────────┘ │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**Components:**
- **Search Bar:** Filter FAQs by keyword
- **Collapsible Sections:** 8+ topic categories
- **Nested Questions:** ▶/▼ toggles within categories
- **Contact Options:** WhatsApp Support, Report Problem

**Annotations:**
- "Self-service knowledge base"
- "Nested structure reduces clutter"
- "Search filters all FAQs"
- "Direct support via WhatsApp if needed"

---

## WIREFRAME ANNOTATION BEST PRACTICES

When creating wireframes using Wireframe Weaver, include these annotation types:

### 1. **Navigation Annotations**
- "Tap X to navigate to Y"
- "Swipe left/right for carousel"
- "Back arrow returns to previous page"

### 2. **Interaction Annotations**
- "Tap to expand/collapse"
- "Hold to show options"
- "Swipe left to delete, right to mark read"

### 3. **State Annotations**
- "Shows if user is U16"
- "Only visible for Creator profiles"
- "Disabled when offline"

### 4. **Behavioral Annotations**
- "Auto-saves every 30 seconds"
- "Syncs when online"
- "Queues for later if offline"

### 5. **Data Annotations**
- "Auto-filled from profile"
- "Stored locally"
- "Dynamic count updates based on location"

### 6. **Technical Annotations**
- "WebP image format for data efficiency"
- "IndexedDB for offline storage"
- "WhatsApp deep link: wa.me/267XXXXXXX"

---

## CROSS-REFERENCE CHECKLIST

For each wireframe, verify:

- ✅ Uses grayscale tones from Design Guide
- ✅ White background (#FFFFFF)
- ✅ Correct border colors with 70% opacity
- ✅ +/- toggle system where applicable
- ✅ Offline-first functionality indicated
- ✅ Guardian approval logic for U16
- ✅ WhatsApp/Facebook deep links annotated
- ✅ Bottom navigation present (if main page)
- ✅ Back arrow positioned correctly
- ✅ Touch targets ≥ 44px
- ✅ Data saver mode compatible
- ✅ Responsive at 320px width

---

**END OF WIREFRAME PAGE WORKFLOWS**

*This document is the complete specification for all 40+ Mizano wireframes. Use it in conjunction with MIZANO_DESIGN_GUIDE.md for component details and MIZANO_PAGE_FLOW_ARCHITECTURE.md for navigation logic.*

**Document Version:** 1.0  
**Last Updated:** 13 February 2026  
**For Use With:** Wireframe Weaver Gem (Gemini AI)
