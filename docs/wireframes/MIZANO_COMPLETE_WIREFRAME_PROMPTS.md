# MIZANO COMPLETE WIREFRAME PROMPTS
**40+ Workflow Specifications for Visual Wireframe Design**

---

## 📋 HOW TO USE THESE PROMPTS

Each prompt below is designed to be used with a wireframing tool (e.g., Wireframe Weaver Gem, Figma, Adobe XD) to create pixel-perfect grayscale wireframes for Mizano.

**For Each Prompt:**
1. Copy the entire prompt section
2. Paste into your wireframing tool
3. The tool will generate the wireframe following exact specifications
4. Cross-reference with MIZANO_DESIGN_GUIDE.md for component details
5. Verify navigation flows against MIZANO_PAGE_FLOW_ARCHITECTURE.md

**Design Constants (Apply to All):**
- Background: White (#FFFFFF)
- Borders: Grayscale with 70% opacity
- Typography: Inter/Roboto, 14px base
- Touch targets: Minimum 44px
- Spacing: 8px grid system
- No shadows or gradients (flat 2D design)

---

## LEVEL 0: ENTRY POINTS

### PROMPT 1: Splash Screen

```
Create a mobile app splash screen wireframe with these exact specifications:

LAYOUT:
- Viewport: 375px width × 812px height (iPhone X standard)
- Background: Pure white (#FFFFFF)
- Single centered element

COMPONENTS:
- Centered logo placeholder: 120px × 120px circle
- Logo position: Vertically and horizontally centered
- Color: Light gray (#E0E0E0) placeholder circle
- Text inside circle: "MIZANO" in 18px bold, dark gray (#424242)

ANIMATION NOTES (annotate):
- "Fade in: 0 to 100% opacity over 500ms"
- "Scale: 0.8 to 1.0 over 500ms (ease-out)"
- "Auto-advance to Login after 2 seconds"

ANNOTATIONS:
- Top-left corner: "Page 1: Splash Screen"
- Bottom-right corner: "Duration: 2s → Auto-advance"
- Next to logo: "Animated entrance (fade + scale)"

NO INTERACTIVE ELEMENTS
NO NAVIGATION BUTTONS
```

---

### PROMPT 2: Onboarding Carousel (Slide 1 of 3)

```
Create the first slide of a 3-slide onboarding carousel wireframe:

HEADER:
- Height: 56px
- Background: White (#FFFFFF)
- Progress dots: 3 circles (8px diameter each)
  - Dot 1: Filled blue (#1E88E5)
  - Dots 2-3: Empty gray stroke (#BDBDBD)
- Position: Centered horizontally, 20px from top
- Skip button: Top-right, "Skip" text link (14px, blue)

CONTENT AREA:
- Icon placeholder: 200px × 200px centered circle
- Fill: Light gray (#F5F5F5)
- Icon note inside: "🏃 Sports Icon"
- Position: 80px below progress dots

- Headline: 32px below icon
  - Text: "Join Real Sports"
  - Font: 24px bold, dark gray (#212121)
  - Max width: 280px, center-aligned

- Body text: 16px below headline
  - Text: "Find matches and tournaments in your neighborhood. Play football, basketball, netball & more."
  - Font: 14px regular, medium gray (#757575)
  - Max width: 300px, center-aligned
  - Line height: 1.5

FOOTER:
- Position: Fixed to bottom, 24px from edge
- Next button:
  - Width: 327px (full width minus 24px padding each side)
  - Height: 48px
  - Background: Blue (#1E88E5)
  - Text: "Next" (14px bold, white)
  - Border radius: 24px

NAVIGATION:
- Swipe left: Slide 2
- Swipe right: No action (first slide)
- Tap Next: Slide 2
- Tap Skip: Jump to Login

ANNOTATIONS:
- "Slide 1 of 3"
- "Swipe or tap Next to continue"
- "Skip jumps directly to Login"
```

---

### PROMPT 3: Onboarding Carousel (Slide 2 of 3)

```
Create the second onboarding slide with identical structure to Slide 1, but:

PROGRESS DOTS:
- Dot 1: Empty gray stroke
- Dot 2: Filled blue ← ACTIVE
- Dot 3: Empty gray stroke

CONTENT CHANGES:
- Icon placeholder text: "📡 Offline Icon"
- Headline: "Works Offline"
- Body: "Browse activities and join matches without internet. Everything syncs when you're back online."

FOOTER:
- Back button (new):
  - Position: Bottom-left, 24px from edges
  - Width: 100px, height: 48px
  - Background: White, blue border (2px)
  - Text: "Back" (14px bold, blue)
  - Border radius: 24px

- Next button:
  - Position: Bottom-right
  - Width: 203px (reduced to fit Back button)
  - Same styling as Slide 1

NAVIGATION:
- Swipe left: Slide 3
- Swipe right: Slide 1
- Tap Back: Slide 1
- Tap Next: Slide 3

ANNOTATIONS:
- "Slide 2 of 3"
- "Back button appears from Slide 2 onward"
```

---

### PROMPT 4: Onboarding Carousel (Slide 3 of 3)

```
Create the third onboarding slide:

PROGRESS DOTS:
- Dot 1: Empty gray stroke
- Dot 2: Empty gray stroke
- Dot 3: Filled blue ← ACTIVE

CONTENT:
- Icon: "🛡️ Safety Icon"
- Headline: "Safe for Everyone"
- Body: "Parents can approve activities for kids under 16. Verified organizers. No strangers."

FOOTER:
- Back button: Same as Slide 2
- Get Started button (replaces Next):
  - Width: 203px
  - Background: Green (#4CAF50) ← Different color
  - Text: "Get Started"
  - Border radius: 24px

NAVIGATION:
- Swipe right: Slide 2
- Tap Back: Slide 2
- Tap Get Started: Login Page (Page 5)

ANNOTATIONS:
- "Slide 3 of 3 (Final)"
- "Green CTA signals end of onboarding"
- "'Get Started' navigates to Login"
```

---

### PROMPT 5: Login Page

```
Create a login page wireframe:

HEADER:
- Height: 200px
- Background: White (#FFFFFF)
- Centered logo: 80px × 80px circle placeholder
- App name: "MIZANO" below logo (20px bold, dark blue)

FORM SECTION:
- Background: White card with 1px light gray border (#E0E0E0)
- Width: 327px (centered)
- Border radius: 12px
- Padding: 24px
- Position: -40px overlap with header (card slides up)

FORM FIELDS:
1. Username field:
   - Label: "Username" (12px, gray, above field)
   - Input: Height 48px, gray border (#BDBDBD)
   - Placeholder: "Enter your username"
   - Icon: User icon (left side, 20px)

2. WhatsApp Number field:
   - Label: "WhatsApp Number" (12px, gray)
   - Input: Height 48px, gray border
   - Prefix: "+267" (locked, gray background)
   - Placeholder: "7X XXX XXX"
   - Icon: WhatsApp icon (left side, 20px, green #25D366)

3. Login button:
   - Width: 100% of form width
   - Height: 48px
   - Background: Blue (#1E88E5)
   - Text: "Login" (14px bold, white)
   - Border radius: 24px
   - Margin-top: 16px

FOOTER LINKS:
- Position: 24px below form card
- Center-aligned text links:
  - "Forgot Username?" (14px, blue)
  - Separator: " | "
  - "About Us" (14px, blue)
  - Separator: " | "
  - "Help" (14px, blue)

OFFLINE INDICATOR (conditional):
- If offline: Orange banner at top
- Text: "⚠️ Offline Mode - Limited features available"
- Background: Orange (#FF9800, 10% opacity)

NAVIGATION:
- Tap Login (valid): Homepage (Page 6)
- Tap Login (new user): Onboarding Flow (if first time)
- Tap About Us: About Us Page (Page 6)
- Tap Help: Help Center (Page 39)

ANNOTATIONS:
- "2D Minimal Style: No shadows or gradients"
- "WhatsApp number required for Guardian verification"
- "Offline: Can still login with cached credentials"
- "Form card overlaps header"
```

---

### PROMPT 6: About Us Page

```
Create an About Us information page:

HEADER:
- Height: 56px, white background
- Left: Back arrow (24px, dark gray)
- Center: "About Mizano" (16px bold, dark gray)
- Bottom border: 1px light gray (#E0E0E0)

CONTENT (scrollable):
- Section 1: Mission
  - Icon: 🎯 (40px)
  - Heading: "Our Mission" (18px bold)
  - Body: 150-word paragraph about grassroots sports in Botswana
  - Padding: 24px all sides

- Section 2: Features
  - Heading: "What We Offer" (18px bold)
  - Bulleted list (6 items):
    • Local sports discovery
    • Offline-first design
    • Safe for kids (Guardian approval)
    • Equipment sharing
    • Low data usage
    • Community-first
  - Each bullet: 14px, dark gray, 16px line spacing

- Section 3: Contact
  - Heading: "Get in Touch" (18px bold)
  - WhatsApp button:
    - Width: 100%, height 48px
    - Background: Green (#25D366)
    - Icon: WhatsApp logo
    - Text: "Chat with Support"
    - Border radius: 24px
  - Email link below: "hello@mizano.bw" (14px, blue)

- Section 4: Credits
  - Small text (12px, light gray)
  - "Built in Gaborone, Botswana 🇧🇼"
  - "Version 1.0.0"

FOOTER:
- Privacy Policy link
- Terms of Service link
- 24px spacing from bottom

NAVIGATION:
- Back arrow: Return to Login Page

ANNOTATIONS:
- "Static informational page"
- "WhatsApp deep link: wa.me/267XXXXXXX"
- "Accessible before login"
```

---

## LEVEL 1: MAIN NAVIGATION (7 Core Pages)

### PROMPT 7: Homepage (Default Landing)

```
Create the main Homepage wireframe with all core UI elements:

═══════════════════════════════════════════════
TOP BAR (Fixed)
═══════════════════════════════════════════════

HEADER:
- Height: 56px
- Background: White (#FFFFFF)
- Bottom border: 1px gray (#E0E0E0)

LEFT SECTION:
- Mizano logo (circular, 36px diameter)
- Tap action: Opens Settings Menu (full-screen overlay)

CENTER SECTION (Horizontal Carousel):
- Scrollable page selector
- Current page: "Homepage" (bold, 16px, dark gray #212121)
- Adjacent pages (lighter): "Sports" | "Hobbies" | "Lessons" | "Leisure" | "Events" | "Mine"
- Swipe left/right to change page
- Active page underline: 2px blue bar below text

RIGHT SECTION:
- Refresh icon (20px, circular arrow)
- Tap: Manual sync (shows spinner animation)

═══════════════════════════════════════════════
FILTER BAR (Level A)
═══════════════════════════════════════════════

HEIGHT: 48px
BACKGROUND: Light gray (#F5F5F5)

LOCATION SELECTOR (Left):
- Format: "GC · Block 3" with dropdown arrow
- Tap: Opens location picker (Level B panel slides up)
- Icon: 📍 (16px, left of text)
- Text: 14px medium gray
- Width: 60% of screen

CARD TALLY (Right):
- Format: "42 cards" in circle
- Circle: 32px diameter, white background, gray border
- Number: 14px bold, blue
- Updates dynamically when filters change

═══════════════════════════════════════════════
DROP FIELD (Main Content - Infinite Scroll)
═══════════════════════════════════════════════

BACKGROUND: White
PADDING: 16px horizontal, 8px vertical between cards

CARD TYPES (All 280px wide, variable height):

1. MATCH CARD:
   - Header: Sport icon + "Football" + Orange "Live" badge (pulsing)
   - Title: "Block 3 Sunday League"
   - Date/Time: "Started: 14:00" (gray, 12px)
   - Location: "📍 UB Stadium" (gray, 12px)
   - Roster: "12/16 players" with small avatars
   - Join button: Green, 40px height, "Join Match"
   - Border: 2px Orange border (#FFA500, 70% opacity), radius 8px
   - Swipe left: Add to favorites (gold star)
   - Swipe right: Hide card

2. REGISTRATION CARD:
   - Header: "🏆 Upcoming: Registration Open"
   - Title: "Gaborone Youth Basketball Championship"
   - Deadline: "Closes in 5 days" (Yellow, bold)
   - Fee: "P50.00 per team"
   - Register button: Blue, "Register Now"
   - Border: 2px Yellow border (#FFD700, 70% opacity)

3. LESSON CARD:
   - Header: "📚 Coaching Session"
   - Mentor photo: 48px circle, left side
   - Name: "Coach Tebogo" (14px bold)
   - Specialty: "Football · U13-U17"
   - Time: "Saturdays 10:00 - 12:00"
   - Fee: "P100/month"
   - Book button: Green, "Book Session"

4. NEWS FLASH CARD:
   - Header: "📰 Sports News"
   - Thumbnail: 280px × 140px (16:9 aspect)
   - Headline: 16px bold, 2 lines max
   - Source: "BWF News · 2h ago" (12px gray)
   - Tap: Opens article detail page

5. POLL CARD:
   - Header: "🗳️ Community Poll"
   - Question: "Best time for weekend matches?"
   - Options (radio buttons):
     ○ Morning (08:00 - 10:00)
     ○ Midday (12:00 - 14:00)
     ○ Afternoon (16:00 - 18:00)
   - Vote button: Blue, 40px
   - Results shown after voting (% bars)

6. MATCH-MAKING CARD:
   - Header: "🔍 Looking for Players"
   - Sport: "Netball"
   - Need: "3 more players (Center, Wing Attack, Goal Attack)"
   - Time: "Today · 17:00"
   - Location: "Block 3 Community Court"
   - Respond button: Orange, "I'm Available"

7. CATEGORY HEADER CARD:
   - Background: Light blue (#E3F2FD)
   - Icon: Large sport emoji (48px)
   - Title: "Basketball Matches"
   - Subtitle: "8 activities nearby"
   - Non-interactive, acts as visual separator

═══════════════════════════════════════════════
BOTTOM MENU BAR (Fixed - Level 1)
═══════════════════════════════════════════════

HEIGHT: 60px
BACKGROUND: White
TOP BORDER: 1px gray (#E0E0E0)

7 ICONS (equally spaced, 44px touch targets):

1. 🎯 Activity
   - Tap: Opens Activity Filter Panel (Level B)
   - Badge: Red dot if filters active

2. 📍 Places
   - Tap: Opens Places Filter Panel (Level B)
   - Badge: Red dot if location filter active

3. ☰ Home Menu
   - Tap: Opens Navigation Menu (full-screen overlay)
   - Central position

4. 🔍 Search
   - Tap: Opens Search Interface (replaces Drop Field)
   - Badge: Number of recent searches

5. ➕ Add
   - Tap: Opens Add Menu (slide-up panel)
   - Options: Create Event, Join Group, Add Business, etc.

6. 🔔 Notifications
   - Tap: Opens Notifications Panel (slide up)
   - Badge: Count of unread notifications (red circle)

7. ≡ Hamburger
   - Tap: Opens Navigation Menu (alternative trigger)
   - Same as Home Menu

ICONS: 24px, gray (#757575)
ACTIVE STATE: Blue (#1E88E5) with label below (10px)
LABELS: Only show for active icon

═══════════════════════════════════════════════
OFFLINE INDICATOR (Conditional)
═══════════════════════════════════════════════

IF OFFLINE:
- Banner: Top of Drop Field, below Filter Bar
- Height: 40px
- Background: Orange (#FF9800, 15% opacity)
- Icon: ⚠️ (left, 20px)
- Text: "Offline Mode - Showing cached content"
- Sync button (right): "Sync Now" (blue text link)
- Dismissible: X icon (far right)

═══════════════════════════════════════════════
NAVIGATION & INTERACTIONS
═══════════════════════════════════════════════

SWIPE GESTURES:
- Swipe left on Top Bar: Navigate to Sports Page
- Swipe right on Top Bar: Navigate to Mine Page (wraps)
- Swipe left on card: Add to favorites
- Swipe right on card: Hide/dismiss

TAP ACTIONS:
- Logo: Settings Menu (Page 36)
- Location: Location Picker Panel
- Card: Activity Detail Page (Page 26)
- Bottom icons: See descriptions above

SCROLL:
- Infinite scroll in Drop Field
- Pull down to refresh (shows loading spinner)
- Lazy load: 10 cards at a time

═══════════════════════════════════════════════
ANNOTATIONS (Required)
═══════════════════════════════════════════════

- "Page 7: Homepage - Default Landing"
- "Horizontal carousel switches entire feed"
- "Cards infinite scroll - lazy load 10 at a time"
- "Location filter updates all cards real-time"
- "Bottom menu persistent across all main pages"
- "Pull-down refreshes feed"
- "Swipe card left: favorite | right: dismiss"
- "All data cached for offline browsing"
- "Auto-sync every 15 minutes when online"

═══════════════════════════════════════════════
RESPONSIVE NOTES
═══════════════════════════════════════════════

- Minimum width: 320px (iPhone SE)
- Maximum width: 428px (iPhone 14 Pro Max)
- Cards: Always 100% width minus 32px (16px margins)
- Text scales proportionally
- Touch targets: Never below 44px
```

---

### PROMPT 8: Sports Page (Filtered View)

```
Create Sports Page wireframe - IDENTICAL to Homepage (Prompt 7) with these modifications:

TOP BAR CAROUSEL:
- Active page: "Sports" (bold, underlined)
- Left visible: "Homepage"
- Right visible: "Hobbies" | "Lessons"

DROP FIELD CONTENT:
- FILTER: Show ONLY sports-related cards
- Card types allowed:
  ✓ Match cards (Football, Basketball, Netball, etc.)
  ✓ Sports tournaments
  ✓ Sports lessons/coaching
  ✓ Sports news
  ✓ Sports polls
  ✗ Hobbies (Art, Music, etc.)
  ✗ General leisure
  ✗ Community events (unless sports-related)

CATEGORY HEADERS:
- "⚽ Football Matches" (6 activities)
- "🏀 Basketball Games" (4 activities)
- "🏐 Netball Tournaments" (3 activities)

EMPTY STATE (if no sports activities):
- Icon: 🏃 (80px, light gray)
- Message: "No sports activities nearby"
- Subtext: "Try changing your location or check back later"
- Button: "View All Activities" → Homepage

ALL OTHER ELEMENTS:
- Filter Bar: Same
- Bottom Menu: Same
- Navigation: Same
- Offline logic: Same

ANNOTATIONS:
- "Page 8: Sports Page"
- "Auto-filtered to sports content only"
- "Same layout and functionality as Homepage"
- "Swipe right returns to Homepage"
```

---

### PROMPT 9: Hobbies Page

```
Sports Page wireframe structure, but filter for Hobbies content:

ACTIVE PAGE: "Hobbies" (bold, underlined in carousel)

ALLOWED CONTENT:
✓ Art classes
✓ Music lessons
✓ Dance groups
✓ Photography clubs
✓ Crafts workshops
✓ Book clubs
✗ Sports
✗ Formal lessons (academic)

CATEGORY HEADERS:
- "🎨 Art Workshops" (5 activities)
- "🎵 Music Sessions" (3 activities)
- "📸 Photography Meetups" (2 activities)

ANNOTATIONS:
- "Page 9: Hobbies Page"
- "Filtered: Arts, crafts, creative activities only"
```

---

### PROMPT 10: Lessons Page

```
Homepage structure, filtered for educational content:

ACTIVE PAGE: "Lessons" (bold, underlined)

ALLOWED CONTENT:
✓ Academic tutoring
✓ Language classes
✓ Skills training
✓ Certification courses
✓ Study groups
✗ Sports coaching (goes to Sports Page)
✗ Creative hobbies (goes to Hobbies Page)

CATEGORY HEADERS:
- "📚 Academic Tutoring" (8 activities)
- "💻 Tech Skills" (4 activities)
- "🌍 Languages" (3 activities)

CARD ENHANCEMENTS:
- Lesson cards show:
  - Instructor credentials (icon badge)
  - Class size: "5/10 students"
  - Difficulty: "Beginner" | "Intermediate" | "Advanced"

ANNOTATIONS:
- "Page 10: Lessons Page"
- "Educational & skill-building content"
- "Includes academic, tech, and professional training"
```

---

### PROMPT 11: Leisure Page

```
Homepage structure for community and social events:

ACTIVE PAGE: "Leisure" (bold, underlined)

ALLOWED CONTENT:
✓ Hiking trips
✓ Picnics
✓ Community gatherings
✓ Social meetups
✓ Cultural events
✓ Movie nights
✗ Competitive sports
✗ Formal lessons

CATEGORY HEADERS:
- "🥾 Outdoor Adventures" (6 activities)
- "🍽️ Social Gatherings" (9 activities)
- "🎭 Cultural Events" (4 activities)

SPECIAL CARD TYPE (Leisure specific):
- GROUP OUTING CARD:
  - Thumbnail: 280px × 140px photo
  - Title: "Weekend Hiking - Kgale Hill"
  - Organizer: Avatar + "Outdoor Explorers BW"
  - Details: "Saturday 06:00 · 12 people going"
  - Fee: "Free" or "P50 transport"
  - Join button: Green

ANNOTATIONS:
- "Page 11: Leisure Page"
- "Non-competitive social & outdoor activities"
- "Community-building focus"
```

---

### PROMPT 12: Events Page (Competitions Focus)

```
Homepage structure for tournaments and competitions:

ACTIVE PAGE: "Events" (bold, underlined)

ALLOWED CONTENT:
✓ Tournaments (all sports)
✓ Championships
✓ Competitions
✓ Award ceremonies
✓ Sports galas
✗ Casual matches (goes to Sports/Homepage)
✗ Practice sessions

ENHANCED CARD DESIGN:
- EVENT CARD (tournament-specific):
  - Header: "🏆 TOURNAMENT"
  - Banner image: 280px × 100px
  - Title: "Gaborone Youth Football League"
  - Dates: "15 - 22 Feb 2026" (bold)
  - Teams: "16 teams registered"
  - Prize: "P5,000 winner" (gold text)
  - Status badge:
    • "Registration Open" (green)
    • "In Progress" (orange)
    • "Completed" (gray)
  - CTA: "View Bracket" or "Register Team"

CATEGORY HEADERS:
- "⚽ Football Tournaments" (3 events)
- "🏀 Basketball Championships" (2 events)
- "🏐 Netball Leagues" (1 event)

FILTER ADDITIONS (Level B panel):
- Competition Level: Local | Regional | National
- Age Group: All | U13 | U15 | U17 | Open
- Status: Upcoming | Live | Completed

ANNOTATIONS:
- "Page 12: Events Page"
- "Formal competitions & tournaments only"
- "Shows prize pools, brackets, registration status"
- "Enhanced filters for competition metadata"
```

---

### PROMPT 13: Mine Page (Personal Hub)

```
Create a personalized activity dashboard:

═══════════════════════════════════════════════
HEADER (Unique to Mine Page)
═══════════════════════════════════════════════

HEIGHT: 140px
BACKGROUND: Dark Blue (#1E88E5)

PROFILE SECTION:
- Avatar: 64px circle (top-left, 16px margins)
- Name: "Kago Mosweu" (18px bold, white)
- Badges (horizontal row below name):
  - "👤 User" (default)
  - "🏃 Player" (if upgraded)
  - "🎯 Creator" (if created events)
  - "👨‍👩‍👧 Guardian" (if linked to minors)
- Edit Profile button: Top-right corner (icon: ✏️, white)

QUICK STATS (bottom of header):
- 3 stat boxes (equal width):
  1. "12 Joined" (matches/events attended)
  2. "3 Created" (events organized)
  3. "5 Favorites" (starred activities)
- Text: 12px white, centered
- Numbers: 20px bold white

═══════════════════════════════════════════════
TABBED CONTENT AREA
═══════════════════════════════════════════════

TAB BAR (below header):
- Height: 48px, white background
- 4 tabs (equal width):
  1. "Joined" (default active)
  2. "Created"
  3. "Favorites"
  4. "History"
- Active tab: Blue underline (3px), bold text
- Inactive: Gray text

TAB 1: JOINED (Active Activities)
- Shows all activities user has registered for
- Card types: Match, Tournament, Lesson, Event
- Each card has status badge:
  • "Upcoming" (Yellow)
  • "Live" (Orange, pulsing)
  • "Today/Active" (Orange)
- Quick actions on each card:
  - "Get Directions" (opens map)
  - "Contact Organizer" (WhatsApp deep link)
  - "Cancel Registration" (red text link)

TAB 2: CREATED (Organizer View)
- Only shows if user has Creator badge
- Shows events user has created
- Card enhancements:
  - Edit button (top-right)
  - Analytics preview: "42 views · 12 sign-ups"
  - Status: Draft | Published | Completed
  - Quick actions:
    - "Manage Roster"
    - "Edit Details"
    - "View Analytics"
    - "Mark Complete"

TAB 3: FAVORITES (Saved)
- Shows all starred activities from swipe-left action
- Same card design as Homepage Drop Field
- Remove from favorites: Swipe right (unfavorite)
- Empty state:
  - Icon: ⭐ (80px, light gray)
  - Text: "No favorites yet"
  - Subtext: "Swipe left on any card to save it here"

TAB 4: HISTORY (Past Activities)
- Shows completed/past activities
- Gray-scale cards (muted colors)
- Each card shows:
  - Activity name
  - Date completed
  - Result (if applicable): "Won" | "Participated" | "Did not attend"
- Action: "View Details" (gray button)

═══════════════════════════════════════════════
BOTTOM SECTION (Above Bottom Menu)
═══════════════════════════════════════════════

PROFILE ACTIONS (collapsible card):
- Header: "My Activity Settings" (tap to expand/collapse)
- Options when expanded:
  - "📊 View Statistics" → Stats Page
  - "🏆 Achievements" → Achievements Page
  - "📝 Borrow History" → Equipment Ledger (Page 33)
  - "🔔 Notification Preferences" → Settings
  - "🔒 Privacy Settings" → Privacy Page (Page 38)

UPGRADE PROMPTS (if applicable):
- If User only (no Player profile):
  - Card: "Become a Player"
  - Icon: 🏃
  - Text: "Track stats, manage equipment, join teams"
  - Button: "Upgrade Now" (blue)

- If no Creator activities:
  - Card: "Create Your First Event"
  - Icon: ➕
  - Text: "Organize a match, tournament, or lesson"
  - Button: "Start Creating" (green)

═══════════════════════════════════════════════
NAVIGATION
═══════════════════════════════════════════════

TOP CAROUSEL:
- Active: "Mine" (bold, underlined)
- Swipe left: Wraps to Homepage
- Swipe right: Events Page

BOTTOM MENU: Same as other pages

TAP ACTIONS:
- Avatar/Name: Edit Profile (Page 37)
- Edit Profile button: Edit Profile (Page 37)
- Stat boxes: Filter content (e.g., tap "12 Joined" → show only Joined tab)
- Cards: Activity Detail Page (Page 26)
- Upgrade prompts: Respective registration flows

═══════════════════════════════════════════════
ANNOTATIONS
═══════════════════════════════════════════════

- "Page 13: Mine Page - Personal Activity Hub"
- "2D Minimal Style enforced: No gradients"
- "Tabs organize personal activities by status"
- "Upgrade prompts drive profile completeness"
- "Quick stats provide overview at a glance"
- "Created tab only visible if user has Creator badge"
- "History tab shows gray-scale for past events"
```

---

## LEVEL 2: DETAIL PAGES

### PROMPT 14: Activity Detail Page (Match Example)

```
Create a comprehensive activity detail page for a football match:

═══════════════════════════════════════════════
HEADER
═══════════════════════════════════════════════

HEIGHT: 56px
BACKGROUND: White
BOTTOM BORDER: 1px gray

LEFT: Back arrow (24px) → Returns to previous page
CENTER: Activity type icon + "Match Details"
RIGHT: Share button (24px, share icon)

═══════════════════════════════════════════════
HERO SECTION
═══════════════════════════════════════════════

HEIGHT: 200px
BACKGROUND: Sport-specific color (blue for football, orange for basketball)
VISUAL: Flat 2D color (No gradients)

CONTENT (centered, white text):
- Sport emoji: 64px (⚽)
- Activity name: "Block 3 Sunday League" (24px bold)
- Status badge: "Upcoming" (Yellow pill, 12px)
- Date/Time: "Tomorrow · Sunday, 14 Feb · 14:00" (16px)
- Location: "📍 UB Stadium" (14px)
- Organizer: "Organized by FC Gaborone" (12px, link)

FAVORITE STAR:
- Position: Top-right corner of hero
- Icon: ⭐ (32px)
- State: Empty (gray) or Filled (gold)
- Tap: Toggle favorite status

═══════════════════════════════════════════════
TABBED CONTENT AREA
═══════════════════════════════════════════════

TAB BAR:
Height: 48px, white background
5 tabs (scrollable horizontally):
1. "Details" (default active)
2. "Roster" (shows participant count badge: "12")
3. "Streams" (shows live badge if streaming)
4. "Sponsors" (shows count if any)
5. "Updates" (shows unread badge if new updates)

Active tab: Blue underline (3px), bold text

───────────────────────────────────────────────
TAB 1: DETAILS
───────────────────────────────────────────────

SECTION 1: MATCH INFORMATION
Card background: Light gray (#F5F5F5)
Padding: 16px
Border radius: 8px

Fields (label + value pairs):
- Match Type: "Friendly · 11-a-side"
- Duration: "90 minutes (2 × 45 min halves)"
- Skill Level: "Intermediate"
- Age Group: "Open (18+)"
- Entry Fee: "P20.00" (green text) OR "Free" (gray)

SECTION 2: LOCATION DETAILS
Card background: White
Border: 1px gray
Padding: 16px

- Venue Name: "University of Botswana Stadium"
- Address: "Notwane Rd, Gaborone"
- Map thumbnail: 280px × 140px (static map preview)
- Buttons (side by side):
  - "View on Map" (blue border button)
  - "Get Directions" (blue filled button)

SECTION 3: ORGANIZER INFORMATION
Card background: White
Padding: 16px

- Avatar: 48px circle (FC Gaborone logo)
- Name: "FC Gaborone" (16px bold, tap → Group Page)
- Type: "Football Club · 120 members"
- Contact button: "WhatsApp Organizer" (green, full width)
  - Deep link: wa.me/267XXXXXXX?text=Hi, I'm interested in the Block 3 Sunday League match

SECTION 4: REQUIREMENTS
List format:
- "⚽ Bring your own ball" (checkmark icon)
- "👟 Boots required (studs allowed)" (checkmark)
- "🧤 Goalkeeper gloves (optional)" (circle icon)
- "💧 Water provided" (checkmark, green)

SECTION 5: DESCRIPTION
- Heading: "About This Match" (16px bold)
- Body: 200-word description from organizer
- "Read More" link if text exceeds 6 lines

───────────────────────────────────────────────
TAB 2: ROSTER
───────────────────────────────────────────────

HEADER STATS:
- "12 / 16 players" (large, bold)
- Progress bar: 75% filled (blue)
- "4 spots remaining" (gray text below)

PLAYER LIST:
Grouped by status:

GROUP 1: CONFIRMED (green header)
- Player cards (each):
  - Avatar: 40px circle
  - Name: "Tebogo Molefe"
  - Position: "Midfielder" (if specified)
  - Player badge: "🏃 Verified Player"
  - Tap: Opens Player Profile (if public)

GROUP 2: PENDING APPROVAL (orange header)
- Same card design
- Status: "⏳ Awaiting Organizer Approval"
- If viewer is organizer: Approve/Decline buttons

GROUP 3: WAITLIST (gray header)
- Only shows if match is full
- Position number: "#1", "#2", etc.

GUARDIAN SECTION (if U16 match):
- Icon: 👨‍👩‍👧 (large)
- Text: "This is a U16 activity. Guardian approval required."
- "Learn More" link → Help Center

───────────────────────────────────────────────
TAB 3: STREAMS (if available)
───────────────────────────────────────────────

LIVE STREAM CARD (if active):
- Thumbnail: 280px × 160px live video preview
- "🔴 LIVE" badge (red, pulsing)
- Viewer count: "👁️ 24 watching"
- Platform: Facebook Live logo
- Watch button: "Watch on Facebook" (blue, opens Facebook app)

UPCOMING STREAM (if scheduled):
- Icon: 📹 (64px, gray)
- Text: "Live stream starts at 14:00"
- Reminder button: "Set Reminder" (blue border)

RECORDED STREAMS (past):
- List of previous broadcasts
- Each entry:
  - Thumbnail: 120px × 68px
  - Title: "Block 3 League - Game 1"
  - Date: "8 Feb 2026"
  - Duration: "1:32:45"
  - Platform logo (Facebook/YouTube)
  - Play button overlay

NO STREAM STATE:
- Icon: 📹 (80px, light gray)
- Text: "No streams available"
- Subtext: "Check back later or contact organizer"

───────────────────────────────────────────────
TAB 4: SPONSORS (if any)
───────────────────────────────────────────────

SPONSOR CARDS (each):
- Logo: 80px × 80px square
- Business name: "Orange Botswana" (14px bold)
- Contribution: "P500 sponsorship" (green text)
- Type badge: "Kit Sponsor" | "Venue Sponsor" | "General"
- Tap: Opens Business Page (Page 22)

BECOME A SPONSOR CARD:
- Background: Light blue (#E3F2FD)
- Icon: 🤝 (40px)
- Heading: "Support This Activity"
- Text: "Sponsor this match and reach local athletes"
- Button: "Become a Sponsor" (blue)
- Tap: Opens Sponsorship Request Form (Page 30)

NO SPONSORS STATE:
- Icon: 🤝 (80px, light gray)
- Text: "No sponsors yet"
- Button: "Be the First Sponsor" (blue)

───────────────────────────────────────────────
TAB 5: UPDATES
───────────────────────────────────────────────

TIMELINE FORMAT (reverse chronological):

UPDATE CARD (each):
- Timestamp: "2 hours ago" (12px gray, top-right)
- Icon: Depends on type
  - 📢 Announcement (blue)
  - ⚠️ Important (orange)
  - 🏆 Result (green)
  - ❌ Cancellation (red)
- Title: "Match Time Changed" (14px bold)
- Body: Update text (14px, expandable if > 3 lines)
- Reactions: Like (👍) count (if enabled)

PINNED UPDATE (if any):
- Background: Light yellow (#FFF9C4)
- Pin icon: 📌 (top-left)
- Always shows at top, regardless of timestamp

NO UPDATES STATE:
- Icon: 📢 (80px, light gray)
- Text: "No updates yet"
- Subtext: "Organizer will post important information here"

═══════════════════════════════════════════════
BOTTOM ACTION BAR (Fixed)
═══════════════════════════════════════════════

HEIGHT: 80px (taller than normal bottom menu)
BACKGROUND: White
TOP BORDER: 1px gray (#E0E0E0)
VISUAL: Flat 2D design (No shadows)

CONTENT (varies by user status):

IF NOT JOINED:
- Join button:
  - Width: 90% of screen, centered
  - Height: 48px
  - Background: Green (#4CAF50)
  - Text: "Join Match" (16px bold, white)
  - Border radius: 24px
  - Tap logic:
    • If U16: Show guardian approval prompt
    • If equipment needed: Show equipment ledger option
    • If full: Add to waitlist
    • If approved: Show confirmation dialog

IF JOINED:
- Status: "✓ You're registered" (14px, green, centered)
- Buttons (side by side):
  - "View Equipment" (50% width, gray border)
  - "Cancel Registration" (50% width, red border)

IF MATCH FULL:
- "❌ Match Full" (16px bold, gray, centered)
- Waitlist button:
  - Width: 90%, height: 48px
  - Background: Blue (#4472C4) ← Interest color
  - Text: "Join Waitlist" (16px bold, white)

IF ORGANIZER (creator viewing own event):
- Button: "Manage Event" (blue, 90% width)
- Tap: Opens Event Lab in edit mode

═══════════════════════════════════════════════
NAVIGATION & INTERACTIONS
═══════════════════════════════════════════════

HEADER:
- Back arrow: Previous page (Homepage/Search Results)
- Share button: Native share sheet
  - Options: WhatsApp, Facebook, Copy Link
  - Shared link format: mizano.bw/match/12345

TABS:
- Tap tab: Switch content (smooth scroll transition)
- Swipe left/right: Navigate between tabs

CARDS:
- Organizer card: Tap → Group Page (Page 21)
- Player cards: Tap → Player Profile (Page 17, if public)
- Sponsor cards: Tap → Business Page (Page 22)
- Update cards: Tap to expand if truncated

BUTTONS:
- View on Map: Opens native maps app with coordinates
- Get Directions: Opens navigation (Google Maps/Apple Maps)
- WhatsApp Organizer: Opens WhatsApp with pre-filled message
- Watch on Facebook: Opens Facebook app (deep link)
- Set Reminder: Adds to device calendar + Mizano notifications
- Become a Sponsor: Sponsorship Request Form (Page 30)

GUARDIAN LOGIC (if U16 activity):
- Join button tap → Show modal:
  - Title: "Guardian Approval Required"
  - Text: "This activity is for users under 16. We'll send a request to your guardian."
  - Guardian info: Shows linked guardian name + WhatsApp
  - Buttons: "Send Request" (green) | "Cancel" (gray)
  - After send: "Request sent! You'll be notified when approved."

═══════════════════════════════════════════════
ANNOTATIONS
═══════════════════════════════════════════════

- "Page 14: Activity Detail Page (Match Type)"
- "Hero section uses flat sport-specific color"
- "5 tabs organize information hierarchically"
- "Roster shows real-time capacity (12/16)"
- "Streams tab only visible if streaming enabled"
- "Sponsors tab only shows if sponsors exist"
- "Guardian approval logic auto-triggered for U16"
- "Bottom action bar adapts to user status"
- "All external links use deep linking (WhatsApp, Maps, Facebook)"
- "Offline: All detail data cached, Join queued for sync"
- "Share generates short link: mizano.bw/match/ID"
```

---

### PROMPT 15: User Profile (Public View)

```
Create a public-facing user profile page:

═══════════════════════════════════════════════
HEADER
═══════════════════════════════════════════════

HEIGHT: 56px, white background
LEFT: Back arrow → Previous page
CENTER: "Profile" (16px bold)
RIGHT: Report button (⚠️ icon, 24px)

═══════════════════════════════════════════════
PROFILE HEADER
═══════════════════════════════════════════════

HEIGHT: 180px
BACKGROUND: Flat User Color (#1E88E5 default)

AVATAR:
- Size: 100px circle
- Position: Centered horizontally, 40px from top
- Border: 3px white border
- Placeholder: User initials if no photo

NAME & BADGES:
- Position: Below avatar, centered
- Name: 20px bold, white text (No shadow)
- Badges (horizontal row):
  - 👤 User (always present)
  - 🏃 Player (if upgraded)
  - 🎓 Mentor (if active mentor)
  - 🎯 Creator (if created 3+ events)
  - 👨‍👩‍👧 Guardian (if managing minors)
- Badge size: 20px emoji + label (10px text)

QUICK STATS (bottom of header):
- 3 stat boxes (equal width, 40px height):
  1. "Activities: 24" (events joined)
  2. "Created: 8" (events organized)
  3. "Member: 3mo" (account age)
- Background: White, 50% opacity
- Text: 12px dark gray

═══════════════════════════════════════════════
BIO SECTION
═══════════════════════════════════════════════

BACKGROUND: White
PADDING: 16px
BORDER BOTTOM: 1px gray

CONTENT:
- Heading: "About" (14px bold)
- Bio text: Up to 200 characters from user
- Default (if empty): "This user hasn't added a bio yet."
- Text: 14px, gray, line-height 1.5

LOCATION (if public):
- Icon: 📍 (16px)
- Text: "Block 3, Gaborone" (14px gray)
- Only shows if user enabled in privacy settings

JOINED DATE:
- Icon: 📅 (16px)
- Text: "Joined November 2025" (14px gray)

═══════════════════════════════════════════════
TABBED CONTENT
═══════════════════════════════════════════════

TAB BAR (48px height):
3 tabs:
1. "Activities" (default active)
2. "Reviews" (shows count if any)
3. "Groups" (shows membership count)

───────────────────────────────────────────────
TAB 1: ACTIVITIES (Public)
───────────────────────────────────────────────

Shows activities user has participated in (public only):

FILTER TOGGLE (top of tab):
- Chips (scrollable horizontal):
  - "All" (default)
  - "Sports"
  - "Hobbies"
  - "Lessons"
  - "Events"

ACTIVITY CARDS (mini format):
- Height: 80px per card
- Left: Sport icon (40px)
- Center:
  - Activity name: "Block 3 Sunday League" (14px bold)
  - Date: "14 Feb 2026" (12px gray)
  - Role: "Player" | "Organizer" | "Mentor" (badge)
- Right: Status icon
  - ✓ Completed (Charcoal)
  - ⏱️ Upcoming (Yellow)
  - ❌ Cancelled (Charcoal)

EMPTY STATE:
- Icon: 🎯 (80px, light gray)
- Text: "No public activities yet"

───────────────────────────────────────────────
TAB 2: REVIEWS (if user is Mentor/Creator)
───────────────────────────────────────────────

Shows reviews from other users:

RATING SUMMARY (top):
- Large star rating: "4.7 ⭐" (32px bold)
- Subtext: "Based on 15 reviews" (12px gray)
- Star breakdown:
  - 5★ ▁▁▁▁▁▁▁▁▁ 80% (12)
  - 4★ ▁▁▁ 13% (2)
  - 3★ ▁ 7% (1)
  - 2★ — 0% (0)
  - 1★ — 0% (0)

REVIEW CARDS:
- Avatar: 32px circle (reviewer)
- Name: "Kago M." (anonymized last name)
- Rating: ⭐⭐⭐⭐⭐ (stars, 16px)
- Date: "1 week ago" (12px gray)
- Review text: Up to 200 characters
- Helpful button: "👍 Helpful (3)" (tap to +1)

EMPTY STATE (no reviews):
- Icon: ⭐ (80px, light gray)
- Text: "No reviews yet"
- Subtext: "Reviews will appear here after completing activities"

───────────────────────────────────────────────
TAB 3: GROUPS (Memberships)
───────────────────────────────────────────────

Shows groups/clubs user belongs to:

GROUP CARDS (mini format):
- Logo: 48px circle (left)
- Name: "FC Gaborone" (14px bold)
- Type: "Football Club" (12px gray)
- Member count: "120 members" (12px gray)
- Join date: "Member since Jan 2026" (10px gray)
- Tap: Opens Group Page (Page 21)

EMPTY STATE:
- Icon: 👥 (80px, light gray)
- Text: "Not a member of any groups yet"

═══════════════════════════════════════════════
INTERACTION BUTTONS (if not own profile)
═══════════════════════════════════════════════

POSITIONED: Below tabs, above content
HEIGHT: 56px
BACKGROUND: White
BORDER TOP: 1px gray

BUTTONS (side by side):

1. MESSAGE BUTTON (if WhatsApp public):
   - Width: 48%
   - Height: 40px
   - Background: Green (#25D366)
   - Icon: WhatsApp logo (16px, left)
   - Text: "Message" (14px, white)
   - Border radius: 8px
   - Tap: Opens WhatsApp (deep link to user's number)

2. FOLLOW BUTTON (future feature):
   - Width: 48%
   - Height: 40px
   - Background: Blue border (not filled)
   - Text: "Follow" (14px, blue)
   - Border radius: 8px
   - Tap: Follow user (get notifications of their activities)

IF OWN PROFILE:
- Replace with single button:
  - "Edit Profile" (blue, full width)
  - Tap: Opens Edit Profile page (Page 37)

═══════════════════════════════════════════════
PRIVACY INDICATORS
═══════════════════════════════════════════════

Shows what information is hidden:

IF PROFILE IS PRIVATE:
- Banner (top of page, below header):
  - Background: Orange (#FF9800, 15% opacity)
  - Icon: 🔒 (20px)
  - Text: "This profile is private"
  - Subtext: "Only basic information is visible"
- Tabs 2 & 3: Locked (🔒 icon, grayed out)

IF MINOR (U16):
- Banner:
  - Background: Blue (#1E88E5, 15% opacity)
  - Icon: 👨‍👩‍👧 (20px)
  - Text: "Guardian-Protected Profile"
  - Subtext: "Activity details require guardian approval"
- Guardian name visible: "Guardian: Tebogo Molefe"

═══════════════════════════════════════════════
GUARDIAN SECURITY LOG (if viewing minor)
═══════════════════════════════════════════════

Shows when viewing U16 profile:

CARD (bottom of page):
- Background: Light blue (#E3F2FD)
- Heading: "Profile View Recorded" (14px bold, blue)
- Icon: 🔍 (24px)
- Text: "This view has been logged and the guardian has been notified."
- Timestamp: "Viewed on 13 Feb 2026, 14:32"
- Note: "This is for safety and transparency."

═══════════════════════════════════════════════
NAVIGATION & INTERACTIONS
═══════════════════════════════════════════════

HEADER:
- Back arrow: Previous page
- Report button: Opens report modal
  - Options: Inappropriate content, Fake profile, Harassment, Other
  - Submit sends to moderators

TABS:
- Tap: Switch content
- Swipe: Navigate between tabs

CARDS:
- Activity cards: Tap → Activity Detail Page
- Group cards: Tap → Group Page
- Review cards: No tap action (read-only)

BUTTONS:
- Message: WhatsApp deep link
- Follow: Toggle follow status (future)
- Edit Profile: Edit Profile Page (Page 37, if own profile)

═══════════════════════════════════════════════
ANNOTATIONS
═══════════════════════════════════════════════

- "Page 15: User Profile (Public View)"
- "Profile header uses user's chosen color (default blue)"
- "Badges dynamically show based on user's profile types"
- "Activities tab only shows public activities"
- "Reviews tab only visible for Mentors/Creators"
- "Groups tab shows all memberships"
- "Privacy banner appears if profile is private"
- "Guardian banner appears for U16 profiles"
- "Security log records all U16 profile views"
- "Message button only shows if WhatsApp is public"
- "Own profile replaces action buttons with 'Edit Profile'"
- "Report function available for safety"
```

---

### PROMPT 16: Player Profile (Sports-Specific Extension)

```
Create a Player Profile page (extends User Profile with sports data):

═══════════════════════════════════════════════
HEADER (Same as User Profile)
═══════════════════════════════════════════════

Back arrow | "Player Profile" | Report button

═══════════════════════════════════════════════
PROFILE HEADER (Enhanced)
═══════════════════════════════════════════════

Same as User Profile, but:

BADGES ROW:
- 👤 User (dimmed)
- 🏃 Player (highlighted, bold)
- Other badges as applicable

QUICK STATS (4 boxes instead of 3):
1. "24 Matches" (games played)
2. "8 Created" (events organized)
3. "12 Goals" (sport-specific stat)
4. "4.5⭐" (player rating average)

═══════════════════════════════════════════════
ENHANCED TABBED CONTENT
═══════════════════════════════════════════════

TAB BAR (5 tabs):
1. "Stats" (NEW, default active)
2. "Activities"
3. "Equipment" (NEW)
4. "Medical" (NEW, 🔒 if private)
5. "Reviews"

───────────────────────────────────────────────
TAB 1: STATS (Player-Specific)
───────────────────────────────────────────────

SPORT SELECTOR (if multi-sport):
- Chips (horizontal scroll):
  - "⚽ Football" (active)
  - "🏀 Basketball"
  - "🏐 Netball"

STATS DASHBOARD:

SECTION 1: PERFORMANCE OVERVIEW
Card background: Light gray (#F5F5F5)
Grid layout (2 columns):
- Total Matches: 24
- Wins: 15 (62.5%)
- Goals/Points: 12
- Assists: 8
- Minutes Played: 1,820

SECTION 2: POSITION & ROLE
- Primary Position: "Midfielder" (with icon)
- Secondary Position: "Forward"
- Playing Style Tags:
  - "Defensive"
  - "Playmaker"
  - "Set Piece Specialist"

SECTION 3: CAREER HIGHLIGHTS
Timeline format:
- "Hat-trick vs FC Block 5" (14 Feb 2026)
- "Joined FC Gaborone" (1 Nov 2025)
- "First Match Win" (15 Nov 2025)

SECTION 4: ACHIEVEMENTS
Badge grid (3 columns):
- 🏆 "Tournament Winner" (Gab Youth League)
- ⭐ "MVP Award" (Block 3 Sunday League)
- 🎯 "Top Scorer" (15 goals, Season 2025)

───────────────────────────────────────────────
TAB 2: ACTIVITIES (Same as User Profile)
───────────────────────────────────────────────

(Identical to User Profile Activities tab)

───────────────────────────────────────────────
TAB 3: EQUIPMENT (Player-Specific)
───────────────────────────────────────────────

OWNED EQUIPMENT LIST:
Card per item:
- Icon: ⚽ (sport-specific)
- Name: "Adidas Predator Boots"
- Size: "UK 9"
- Condition: "Good" (green) | "Fair" (orange) | "Needs Replacement" (red)
- Photo: 80px × 80px (optional)
- Availability: Toggle "Available to Share"

WISHLIST SECTION:
- Heading: "Equipment Needed" (16px bold)
- List items (each):
  - Item: "Goalkeeper Gloves"
  - Priority: High (red) | Medium (orange) | Low (green)
  - Budget: "~P150"
  - "Sponsor Me" button (blue)

BORROW HISTORY:
- Shows recent equipment borrowed from others
- Each entry:
  - Item: "Nike Football"
  - Borrowed from: "Kago M."
  - Date: "10 - 12 Feb 2026"
  - Status: "Returned ✓" (green)
  - Your Rating: ⭐⭐⭐⭐⭐ "Excellent condition"

BORROW SCORE:
- Large display: "4.8/5.0 ⭐" (32px bold)
- Subtext: "Based on 12 borrow transactions"
- Bar graph:
  - 5★ ▁▁▁▁▁▁▁▁ 75% (9)
  - 4★ ▁▁▁ 25% (3)
  - 3★-1★ — 0%

───────────────────────────────────────────────
TAB 4: MEDICAL (Privacy-Protected)
───────────────────────────────────────────────

IF PRIVATE (default for U16):
- Lock icon: 🔒 (80px, gray)
- Text: "Medical information is private"
- Subtext: "Only visible to guardians and approved coaches"

IF PUBLIC (owner viewing own):

MEDICAL PROFILE:
- Blood Type: "A+" (icon: 🩸)
- Allergies: "Penicillin, Pollen" (icon: ⚠️)
- Emergency Contact:
  - Name: "Tebogo Molefe"
  - Relation: "Guardian"
  - WhatsApp: "+267 7X XXX XXX"
  - Button: "Call" (green, phone icon)

INJURY HISTORY:
Timeline format (reverse chronological):
- "Ankle Sprain" (14 Feb 2026)
  - Status: "Recovering 🟡"
  - Return Date: "Est. 1 Mar 2026"
  - Notes: "Light training only"
- "Hamstring Pull" (8 Nov 2025)
  - Status: "Recovered ✓"
  - Notes: "Full recovery"

MEDICAL CLEARANCES:
- "General Fitness Certificate" (Valid until 30 Jun 2026)
  - Issued by: Dr. Modise, Block 3 Clinic
  - File: PDF icon (tap to view)
  - Share button: "Share with Coach" (WhatsApp)

───────────────────────────────────────────────
TAB 5: REVIEWS (Same as User Profile)
───────────────────────────────────────────────

(Identical to User Profile Reviews tab)

═══════════════════════════════════════════════
GUARDIAN BANNER (if U16)
═══════════════════════════════════════════════

Positioned below profile header, above tabs:

BACKGROUND: Light blue (#E3F2FD)
HEIGHT: 60px
ICON: 👨‍👩‍👧 (24px, left side)

CONTENT:
- Text: "Guardian-Protected Profile"
- Subtext: "Guardian: Tebogo Molefe"
- Button (right): "View Security Log" (blue link)
  - Opens: Security audit trail

═══════════════════════════════════════════════
ANNOTATIONS
═══════════════════════════════════════════════

- "Page 16: Player Profile (Sports Extension)"
- "Extends User Profile with sports-specific data"
- "5 tabs vs 3 for basic users"
- "Stats tab shows performance metrics"
- "Equipment tab tracks ownership + borrowing"
- "Medical tab locked by default for U16"
- "Borrow Score visible to encourage good behavior"
- "Guardian banner always present for U16"
- "Injury history helps organizers make informed decisions"
- "Emergency contact stored for safety"
```

---

### PROMPT 17: Mentor Profile

```
Create a Mentor Profile page for coaches/instructors:

═══════════════════════════════════════════════
PROFILE HEADER (Mentor-Specific)
═══════════════════════════════════════════════

HEIGHT: 200px
BACKGROUND: Flat Orange (#FFA500)

AVATAR: 100px circle
NAME: 20px bold, white
PRIMARY BADGE: 🎓 Mentor (highlighted, 24px)

CREDENTIALS ROW (below name):
- "CAF Level 2 ⚽" (badge)
- "CPR Certified 🏥" (badge)
- "5 years experience 📅" (badge)

QUICK STATS (4 boxes):
1. "42 Students" (total coached)
2. "4.9⭐" (average rating)
3. "P150/hr" (hourly rate)
4. "12 Sessions" (this month)

═══════════════════════════════════════════════
TABBED CONTENT (4 tabs)
═══════════════════════════════════════════════

1. "About" (default)
2. "Specialties"
3. "Availability"
4. "Reviews"

───────────────────────────────────────────────
TAB 1: ABOUT
───────────────────────────────────────────────

BIO SECTION:
- Heading: "About Me" (16px bold)
- Bio: 300-word professional summary
- "Read More" if exceeds 8 lines

CERTIFICATIONS:
Card per certification:
- Icon: 🏆 (left, 40px)
- Name: "CAF Level 2 Coaching License"
- Issued by: "Confederation of African Football"
- Date: "Valid until Dec 2027"
- Verification: "✓ Verified" (green badge)

COACHING PHILOSOPHY:
- Heading: "Coaching Philosophy" (16px bold)
- Text: 150-word statement
- Style tags:
  - "Youth Development"
  - "Technical Skills"
  - "Positive Reinforcement"

LANGUAGES:
- English ✓ (fluent)
- Setswana ✓ (native)
- Afrikaans (basic)

───────────────────────────────────────────────
TAB 2: SPECIALTIES
───────────────────────────────────────────────

SPORT CATEGORIES:
Grouped cards:

FOOTBALL:
- Age Groups: "U13, U15, U17, Open"
- Skill Levels: "Beginner, Intermediate"
- Focus Areas:
  - "Ball Control"
  - "Passing Accuracy"
  - "Game Strategy"
  - "Goalkeeper Training"

BASKETBALL (if multi-sport):
- Age Groups: "U15, U17"
- Skill Levels: "Beginner"
- Focus Areas:
  - "Shooting Technique"
  - "Defensive Positioning"

SESSION TYPES OFFERED:
- ✓ One-on-One Training
- ✓ Small Group (2-5 players)
- ✓ Team Practice
- ✓ Fitness Conditioning
- ✗ Match Analysis (not offered)

───────────────────────────────────────────────
TAB 3: AVAILABILITY
───────────────────────────────────────────────

CALENDAR VIEW (current week):

WEEKLY SCHEDULE:
Grid format (7 days × time slots):

MONDAY:
- 06:00-08:00: Available (green)
- 08:00-12:00: Busy (gray)
- 16:00-18:00: Available (green)
- 18:00-20:00: Booked (orange)

TUESDAY:
- 06:00-08:00: Available
- 16:00-18:00: Booked
(... repeat for all days)

LEGEND:
- Green: Available
- Orange: Booked (not available)
- Gray: Busy/Unavailable

BOOKING BUTTON:
- Position: Bottom of calendar
- Style: Blue, full width, 48px height
- Text: "Request Session"
- Tap: Opens booking form
  - Date picker
  - Time slot selector (only available times)
  - Session type dropdown
  - Number of participants
  - Special requests (text area)
  - Submit button: Sends WhatsApp message to mentor

RATES CARD:
- One-on-One: P150/hour
- Small Group (2-5): P200/hour (P40-50/person)
- Team Practice: P300/hour
- First Session: "Free trial available!"

───────────────────────────────────────────────
TAB 4: REVIEWS (Enhanced)
───────────────────────────────────────────────

RATING BREAKDOWN:
- Overall: 4.9⭐ (large, 32px)
- Based on: 38 reviews
- Response Rate: "95% (Usually replies within 1 hour)"

CATEGORY RATINGS:
Grid (2 columns):
- Communication: 5.0⭐
- Punctuality: 4.8⭐
- Knowledge: 5.0⭐
- Patience: 4.9⭐
- Value for Money: 4.7⭐

REVIEW CARDS (sorted by most recent):
- Reviewer avatar + name
- Rating: ⭐⭐⭐⭐⭐
- Date: "1 week ago"
- Session Type: "One-on-One Football Training"
- Review text: Up to 200 characters
- Mentor reply (optional):
  - "Thank you! Keep practicing!" (italic, gray)
  - Date: "1 week ago"
- Helpful button: 👍 (3)

FILTER OPTIONS (chips):
- All Reviews (38)
- 5★ Only (28)
- With Photos (5)
- Most Recent
- Most Helpful

═══════════════════════════════════════════════
ACTION BUTTONS (Below tabs)
═══════════════════════════════════════════════

HEIGHT: 60px
BACKGROUND: White
BORDER TOP: 1px gray

BUTTONS (side by side):

1. MESSAGE BUTTON:
   - Width: 48%
   - Background: Green (#25D366)
   - Icon: WhatsApp
   - Text: "Message"
   - Tap: Opens WhatsApp with pre-filled:
     "Hi [Name], I'm interested in booking a session..."

2. BOOK SESSION BUTTON:
   - Width: 48%
   - Background: Blue (#1E88E5)
   - Icon: 📅
   - Text: "Book Session"
   - Tap: Scrolls to Availability tab + opens booking form

IF OWN PROFILE:
- Replace with "Edit Profile" (blue, full width)

═══════════════════════════════════════════════
DISCOVERY SETTINGS (Own Profile Only)
═══════════════════════════════════════════════

Shows at bottom of About tab:

CARD: "Discovery Settings" (collapsible)
- Toggle: "Visible in Mentor Search" (ON/OFF)
- Toggle: "Accept New Students" (ON/OFF)
- Max Students: Number input (e.g., 10)
- Auto-Reply Message: Text area
  - "Thanks for your interest! I'll get back to you within 24 hours."

═══════════════════════════════════════════════
ANNOTATIONS
═══════════════════════════════════════════════

- "Page 17: Mentor Profile"
- "Flat Orange header distinguishes from other profiles"
- "Certification verification builds trust"
- "Availability calendar shows real-time open slots"
- "Booking flows through WhatsApp for low-data efficiency"
- "Reviews include category ratings for detailed feedback"
- "Discovery settings control visibility in search"
- "Rates displayed upfront for transparency"
- "Free trial offer encourages first-time bookings"
```

---

### PROMPT 18: Guardian Dashboard

```
Create a Guardian Dashboard for monitoring and approving children's activities:

═══════════════════════════════════════════════
HEADER
═══════════════════════════════════════════════

HEIGHT: 56px
BACK ARROW | "Guardian Dashboard" | Settings Icon (⚙️)

═══════════════════════════════════════════════
DASHBOARD HEADER
═══════════════════════════════════════════════

HEIGHT: 140px
BACKGROUND: Flat Pink (#FF69B4) ← Engagement/Community Color

ICON: 👨‍👩‍👧 (64px, centered top)
HEADING: "Guardian Dashboard" (20px bold, white, centered)
SUBTEXT: "Managing 2 children" (14px, white, 50% opacity)

ALERT BADGE (if pending approvals):
- Position: Top-right corner
- Red circle with count: "3"
- Visual: Flat circle (No shadow)

═══════════════════════════════════════════════
QUICK ACTIONS GRID
═══════════════════════════════════════════════

BACKGROUND: White
PADDING: 16px
GRID: 2 columns × 2 rows

CARD 1: PENDING APPROVALS
- Icon: ⏳ (40px, orange)
- Count: "3 pending" (18px bold)
- Text: "Activity Join Requests"
- Badge: "URGENT" (red, if > 0)
- Tap: Scrolls to Approvals section

CARD 2: LINKED CHILDREN
- Icon: 👶 (40px, blue)
- Count: "2 children" (18px bold)
- Text: "Managed Profiles"
- Tap: Scrolls to Children section

CARD 3: SECURITY LOG
- Icon: 🔍 (40px, gray)
- Count: "12 views" (18px bold)
- Text: "Profile View Audit"
- Tap: Opens Security Log page

CARD 4: ADD CHILD
- Icon: ➕ (40px, green)
- Text: "Link New Child" (16px bold)
- Tap: Opens Link Child flow

═══════════════════════════════════════════════
SECTION 1: PENDING APPROVALS
═══════════════════════════════════════════════

HEADING: "Pending Approvals" (18px bold)
COUNT BADGE: "3" (orange circle)

APPROVAL CARDS (each):

CARD STRUCTURE:
- LEFT SECTION (60%):
  - Child name: "Kago Jr." (14px bold)
  - Activity: "Block 3 Sunday League" (14px)
  - Type: "⚽ Football Match" (12px, gray)
  - Date: "Tomorrow, 14:00" (12px, gray)
  - Organizer: "FC Gaborone" (12px, blue link)
    - Tap: Opens Group Page

- RIGHT SECTION (40%):
  - Approve button (green, 36px height)
  - Decline button (red border, 36px height)

EXPAND DETAILS:
- Tap anywhere (except buttons) → Expands card
- Shows:
  - Full activity description
  - Location + map preview
  - Organizer contact (WhatsApp button)
  - Roster (who else is joining)
  - Risk assessment: "Low Risk" (green) | "Medium Risk" (orange)
    - Based on: Organizer reputation, venue safety, activity type

APPROVAL ACTIONS:
- Approve:
  - Sends notification to child
  - Child auto-joins activity
  - Guardian added to WhatsApp group (optional toggle)
  - Moves to "Approved" section below

- Decline:
  - Modal: "Reason for declining?" (optional text)
  - Sends notification to child with reason
  - Removes from pending

EMPTY STATE (if no pending):
- Icon: ✓ (80px, green, light)
- Text: "No pending approvals"
- Subtext: "All requests reviewed!"

═══════════════════════════════════════════════
SECTION 2: MANAGED CHILDREN
═══════════════════════════════════════════════

HEADING: "Managed Children" (18px bold)

CHILD CARDS (each):

CARD HEADER:
- Avatar: 48px circle
- Name: "Kago Jr." (16px bold)
- Age: "14 years old" (12px, gray)
- Badge: "🏃 Player" (if upgraded)
- Quick Actions (right side):
  - View Profile icon (eye)
  - Settings icon (⚙️)

TABS (within child card):
3 mini tabs:
1. "Activity" (default)
2. "Settings"
3. "History"

TAB 1: ACTIVITY (Recent & Upcoming)
- Shows next 3 activities child is registered for
- Mini cards (80px height each):
  - Icon: Sport emoji
  - Name: "Block 3 League"
  - Date: "Tomorrow, 14:00"
  - Status:
    - "Approved ✓" (green)
    - "Pending ⏳" (orange)
    - "Declined ❌" (red)
  - Tap: Opens Activity Detail

TAB 2: SETTINGS
- Privacy toggle: "Profile Visibility" (Public/Private)
- WhatsApp toggle: "Share contact" (ON/OFF)
- Location toggle: "Share location" (ON/OFF)
- "Who can view profile?"
  - Dropdown: Only Guardians | Approved Coaches | Public

TAB 3: HISTORY
- Shows past 5 activities
- Each entry:
  - Activity name
  - Date
  - Attendance: "Attended ✓" | "Did not attend ❌"

ADD CHILD BUTTON:
- Position: Bottom of section
- Style: Blue border, 48px height
- Icon: ➕
- Text: "Link Another Child"
- Tap: Opens Link Child flow

═══════════════════════════════════════════════
SECTION 3: SECURITY LOG (Summary)
═══════════════════════════════════════════════

HEADING: "Recent Security Events" (16px bold)
LINK: "View Full Log >" (right side, blue)

SHOWS: Last 5 security events

EVENT CARDS (each):
- Icon: Depends on event type
  - 👁️ Profile View
  - 📝 Join Request
  - 🏆 Activity Completion
  - ⚠️ Suspicious Activity
- Event: "Profile viewed by Coach Tebogo"
- Child: "Kago Jr."
- Timestamp: "2 hours ago"
- Action (if applicable):
  - "View Details" (blue link)
  - Opens full event details

ALERT TYPES:
- INFO (blue): Normal events
- WARNING (orange): Unusual events (e.g., profile viewed late at night)
- CRITICAL (red): Suspicious (e.g., multiple views from same IP)

═══════════════════════════════════════════════
SECTION 4: GUARDIAN SETTINGS
═══════════════════════════════════════════════

COLLAPSIBLE CARD: "Guardian Settings" (tap to expand)

CONTENT:
- Notification Preferences:
  - □ All join requests (immediate)
  - □ Daily digest of activity
  - □ Weekly summary
  - □ Profile view alerts

- Auto-Approve Rules:
  - □ Approve activities from known organizers
  - □ Approve activities at familiar venues
  - List of trusted organizers (editable)
  - List of trusted venues (editable)

- Emergency Contacts:
  - Primary: Your WhatsApp (pre-filled)
  - Secondary: Add another guardian/family member
  - Medical: Add family doctor

═══════════════════════════════════════════════
LINK CHILD FLOW (Modal)
═══════════════════════════════════════════════

TRIGGERED BY: "Add Child" button

STEP 1: METHOD SELECTION
- Option 1: "Link Existing Mizano User"
  - Search by username or WhatsApp
  - Child must accept link request
- Option 2: "Create New Minor Profile"
  - Opens profile creation form
  - Guardian automatically linked

STEP 2 (if creating new):
FORM FIELDS:
- Child's Name *
- Date of Birth *
- WhatsApp Number (optional)
- School (optional, dropdown)
- Photo (optional, file picker)
- Submit: "Create & Link Profile"

STEP 3: CONFIRMATION
- Success message: "✓ Child profile linked!"
- Shows child card in dashboard
- Prompt: "Set privacy settings now?"

═══════════════════════════════════════════════
NAVIGATION & INTERACTIONS
═══════════════════════════════════════════════

HEADER:
- Back arrow: Previous page (Settings Menu)
- Settings icon: Guardian Settings (opens modal)

QUICK ACTIONS:
- Tap card: Navigate to respective section/page

APPROVALS:
- Tap card: Expand details
- Approve button: Immediate approval + notification
- Decline button: Show reason modal → Decline
- Organizer link: Opens Group/Business Page

CHILDREN CARDS:
- Tap avatar/name: Opens child's profile (Guardian view)
- View Profile icon: Opens child's Player Profile
- Settings icon: Opens child-specific settings modal
- Activity cards: Tap → Activity Detail Page

SECURITY LOG:
- Tap event: Opens full event details
- View Full Log: Opens dedicated Security Log page

═══════════════════════════════════════════════
ANNOTATIONS
═══════════════════════════════════════════════

- "Page 18: Guardian Dashboard"
- "Flat Pink header for Guardian identity"
- "Approval workflow is primary focus (top of page)"
- "Real-time pending count with urgent badge"
- "Risk assessment helps guardians make informed decisions"
- "Child cards show next 3 activities at a glance"
- "Security log automatically tracks all profile views"
- "Auto-approve rules reduce friction for trusted organizers"
- "Link child flow supports existing users OR new profiles"
- "WhatsApp integration allows guardian to join activity groups"
- "All approvals/declines trigger child notifications"
```

---

### PROMPT 19: Creator Dashboard

```
Create a Creator Dashboard for users who organize events:

═══════════════════════════════════════════════
HEADER
═══════════════════════════════════════════════

BACK ARROW | "Creator Dashboard" | Analytics Icon (📊)

═══════════════════════════════════════════════
DASHBOARD HEADER
═══════════════════════════════════════════════

HEIGHT: 160px
BACKGROUND: Flat Green (#4CAF50)

ICON: 🎯 (64px, centered top)
HEADING: "Creator Dashboard" (20px bold, white)
SUBTEXT: "8 active events" (14px, white, 50% opacity)

STATS ROW (3 boxes, white background, 50% opacity):
1. "Total Views: 342"
2. "Registrations: 56"
3. "Completion Rate: 92%"

═══════════════════════════════════════════════
QUICK ACTIONS BAR
═══════════════════════════════════════════════

HEIGHT: 60px
BACKGROUND: White
BORDER BOTTOM: 1px gray

BUTTONS (horizontal scroll):
1. "Create Event" (green, icon: ➕)
   - Tap: Opens Event Lab
2. "View Analytics" (blue, icon: 📊)
   - Tap: Opens Analytics Page
3. "Manage Roster" (orange, icon: 👥)
   - Tap: Shows event picker → Roster Management
4. "Request Sponsorship" (purple, icon: 🤝)
   - Tap: Shows event picker → Sponsorship Form

═══════════════════════════════════════════════
TABBED CONTENT
═══════════════════════════════════════════════

3 TABS:
1. "Active" (default, shows count badge "8")
2. "Drafts" (shows count "2")
3. "Completed" (shows count "15")

───────────────────────────────────────────────
TAB 1: ACTIVE EVENTS
───────────────────────────────────────────────

FILTER CHIPS (horizontal scroll):
- All (8)
- Upcoming (5)
- Live Now (1)
- Registration Open (6)

EVENT CARDS (each):

CARD HEADER:
- Status badge (top-left):
  - "🟠 Live Now" (Orange, pulsing)
  - "🟡 Starts in 2 hours" (Yellow)
  - "🟡 Upcoming" (Yellow)
- Edit button (top-right, icon: ✏️)

CARD BODY:
- Sport icon (40px): ⚽
- Title: "Block 3 Sunday League" (16px bold)
- Date: "Tomorrow, 14 Feb, 14:00" (14px, gray)
- Location: "📍 UB Stadium" (12px, gray)

QUICK STATS (grid, 3 columns):
- "Views: 42"
- "Registered: 12/16"
- "Waitlist: 3"

PROGRESS BAR:
- Registration capacity: 75% filled (blue bar)
- Text below: "12 of 16 spots filled"

ACTION BUTTONS (row):
1. "Manage Roster" (blue border, 32px height)
2. "View Public Page" (gray border)
3. "Share" (green border)

EXPANDABLE SECTIONS (tap to expand):
- "Recent Activity" (last 5 actions):
  - "Tebogo M. joined" (2 hours ago)
  - "Kago Jr. requested (pending approval)" (5 hours ago)
  - "Equipment donated by Orange BW" (1 day ago)

- "Pending Actions" (requires attention):
  - "3 join requests awaiting approval"
  - "2 sponsorship requests to review"
  - "Update match time (suggested by 2 players)"

───────────────────────────────────────────────
TAB 2: DRAFTS
───────────────────────────────────────────────

SHOWS: Unpublished events created in Event Lab

DRAFT CARDS (each):
- Icon: 📝 (40px, gray)
- Title: "Untitled Event" or custom title
- Last edited: "2 hours ago"
- Completion: Progress bar (e.g., "60% complete")
  - Missing: Sport selection, Venue
- Action buttons:
  - "Continue Editing" (blue)
  - "Delete Draft" (red text link)

EMPTY STATE (if no drafts):
- Icon: 📝 (80px, light gray)
- Text: "No drafts"
- Subtext: "Start creating an event to save a draft"

───────────────────────────────────────────────
TAB 3: COMPLETED EVENTS
───────────────────────────────────────────────

SHOWS: Past events (grayed out styling)

COMPLETED CARDS (each):
- Gray-scale colors (dimmed)
- Sport icon (40px, gray)
- Title: "Block 3 League - Round 1"
- Completion date: "Completed 8 Feb 2026"
- Final stats:
  - Participants: "14 attended"
  - Completion rate: "93% (14/15)"
  - Average rating: "4.8⭐"

ACTION BUTTONS:
- "View Results" (gray border)
  - Opens: Final scores, standings, photos
- "Clone Event" (blue border)
  - Creates: New draft with same settings
- "Archive" (red text link)
  - Moves: To archive (hidden from main view)

ANALYTICS PREVIEW (tap to expand):
- Total views: 67
- Registration timeline chart (mini)
- Top referrer: WhatsApp (45%)

═══════════════════════════════════════════════
FLOATING ACTION BUTTON
═══════════════════════════════════════════════

POSITION: Bottom-right corner, fixed
SIZE: 56px circle
BACKGROUND: Green (#4CAF50)
ICON: ➕ (white, 24px)
TAP: Opens Event Lab (Create new event)
VISUAL: Flat 2D (No shadow)

═══════════════════════════════════════════════
CREATOR INSIGHTS PANEL (Bottom of page)
═══════════════════════════════════════════════

COLLAPSIBLE CARD: "Creator Insights" (tap to expand)

CONTENT:
- Performance Summary (last 30 days):
  - Events created: 5
  - Total participants: 78
  - Average rating: 4.7⭐
  - Sponsorship earned: P250

- Tips for Success:
  - "✓ Events with photos get 3× more views"
  - "Add equipment wishlist to attract sponsors"
  - "Share on WhatsApp for faster registrations"

- Achievements:
  - 🏆 "Organized 10+ events"
  - ⭐ "Maintained 4.5+ rating"
  - 👥 "100+ participants reached"

═══════════════════════════════════════════════
NAVIGATION & INTERACTIONS
═══════════════════════════════════════════════

HEADER:
- Back arrow: Previous page (Settings or Mine Page)
- Analytics icon: Opens full Analytics Page

QUICK ACTIONS:
- Create Event: Opens Event Lab (Page 26)
- View Analytics: Opens Analytics Page (dedicated)
- Manage Roster: Shows event picker modal → Roster Management (Page 29)
- Request Sponsorship: Shows event picker → Sponsorship Form (Page 30)

EVENT CARDS:
- Edit button: Opens Event Lab in edit mode
- Manage Roster: Opens Roster Management for that event
- View Public Page: Opens Activity Detail Page (public view)
- Share: Native share sheet (WhatsApp, Facebook, Copy Link)

DRAFTS:
- Continue Editing: Opens Event Lab with saved draft
- Delete Draft: Confirmation modal → Delete

COMPLETED:
- View Results: Opens results/standings page
- Clone Event: Creates new draft with same settings
- Archive: Moves to archive (confirmation modal)

FLOATING ACTION BUTTON:
- Tap: Opens Event Lab (blank, new event)

═══════════════════════════════════════════════
ANNOTATIONS
═══════════════════════════════════════════════

- "Page 19: Creator Dashboard"
- "Flat Green header for Creator identity"
- "Active tab shows real-time event status"
- "Pending actions highlighted to drive engagement"
- "Progress bars show registration capacity visually"
- "Drafts auto-save from Event Lab for resuming later"
- "Completed events show final stats and ratings"
- "Clone feature streamlines recurring event creation"
- "Creator insights provide actionable tips"
- "FAB (Floating Action Button) for quick event creation"
- "All interactions optimized for offline queueing"
```

---

I'll continue with the remaining entity pages, activity pages, utility pages, and settings pages. Would you like me to continue with the next batch of comprehensive prompts (Pages 20-30), or would you prefer I save what we have so far and you can review it first?

The file is growing quite large - I can either:
1. Continue adding all remaining prompts to this single file (will be very comprehensive)
2. Break it into multiple files (e.g., "Entry & Main Pages", "Profile Pages", "Entity Pages", "Utility & Settings")
3. Save the current progress and let you review before continuing

What would be most useful for your wireframing workflow?
