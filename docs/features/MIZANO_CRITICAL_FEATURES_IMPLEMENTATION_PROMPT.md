# MIZANO CRITICAL FEATURES IMPLEMENTATION PROMPT
**For AI Agent: Google Antigravity Development Session**

---

## 🎯 MISSION CRITICAL OBJECTIVES

You are implementing three essential features for a presentation-ready Mizano build:

1. **Marathon Event Registration System** (from MIZANO_EVENTS_DATABASE_2026.md + BOTSWANA_2026_EVENTS_DATABASE.md)
2. **Club/Team Creation & Management** (with player roster and role assignments)
3. **Three-Level Bottom Filter System** (controlling the Drop Field)

---

## 📋 CONTEXT & ARCHITECTURAL CONSTRAINTS

### **Core Principles (NON-NEGOTIABLE)**
- ✅ **Vanilla JS only** - NO React/Vue/Angular (AGENT_CODING_PROTOCOL.md)
- ✅ **2D Minimal Design** - Flat borders, no shadows, grayscale + color-coded borders at 70% opacity
- ✅ **Offline-First** - All actions queue in IndexedDB if offline, sync on connection
- ✅ **+/- Collapsible System** - Use accordion toggles for all multi-section forms
- ✅ **WhatsApp Deep Links** - Use `wa.me/267XXXXXXX` for zero-rated communication
- ✅ **Guardian Approval** - Auto-trigger for users <16 years old
- ✅ **Asset Pathing** - Use `./images/` relative paths, WebP format preferred

### **Active Modules (Already Implemented)**
- ✅ `NavigationController.js` - Handles Level 1, 2, A, B navigation
- ✅ `DataManager.js` - JSON hydration from events/teams/users databases
- ✅ `CardRenderer.js` - Factory pattern for dynamic card generation
- ✅ `GuardianSafety.js` - Age-based access control (13/16/18 gates)
- ✅ `StorageManager.js` - Unified localStorage/IndexedDB wrapper

### **Key Reference Documents**
- `MIZANO_DESIGN_GUIDE.md` - Component library, color codes, spacing
- `MIZANO_PAGE_FLOW_ARCHITECTURE.md` - Navigation flows and panel behaviors
- `WIREFRAME_PAGE_WORKFLOWS.md` - Detailed specs for all 40+ pages
- `EVENT_LAB_ARCHITECTURE_SPECS.md` - Single-page creation workspace pattern
- `CARD_DESIGN_SYSTEM.md` - 11 card types with border color logic

---

## 🏃 FEATURE 1: MARATHON REGISTRATION SYSTEM

### **Data Sources**
Load marathon events from:
1. `MIZANO_EVENTS_DATABASE_2026.md` (JSON structures for competitions)
2. `BOTSWANA_2026_EVENTS_DATABASE.md` (182 tourism events calendar)

### **Event Card Requirements (In Drop Field)**

**Card Type:** Registration-State Card (Yellow border at 70% opacity)

**Visual Layout:**
```
┌──────────────────────────────────────────┐
│ 🏃 Gaborone City Marathon 2026           │ ← 16px Bold, Charcoal (#424242)
│ 📅 15 March 2026 • 05:00 AM              │ ← 14px Regular, Grey (#757575)
│ 📍 National Stadium, Gaborone            │
│ 👥 247 registered (Max: 500)             │ ← Dynamic counter from registrations array
│                                          │
│ Registration closes in 12 days           │ ← Urgency indicator (turns red <3 days)
│                                          │
│ [Register Now]         [★] [Follow]     │ ← Primary button + action icons
└──────────────────────────────────────────┘
```

**Border Color Logic:**
- Yellow (#FFC107, 70%) = Registration open
- Red (#D32F2F, 70%) = Closing soon (<3 days)
- Charcoal (#616161, 70%) = Registration closed

**Card Data Contract (JSON Structure):**
```json
{
  "id": "marathon_gaborone_2026",
  "type": "marathon",
  "name": "Gaborone City Marathon 2026",
  "date": "2026-03-15",
  "time": "05:00",
  "venue": {
    "name": "National Stadium",
    "city": "Gaborone",
    "gps": {"lat": -24.6282, "lng": 25.9231}
  },
  "organizer": {
    "name": "Botswana Athletics Association",
    "whatsapp": "+26772123456",
    "facebook": "https://facebook.com/BotswanaAthletics"
  },
  "registration": {
    "deadline": "2026-03-13",
    "maxParticipants": 500,
    "currentCount": 247,
    "fee": 0,
    "categories": ["5K", "10K", "21K", "42K"]
  },
  "registeredUsers": [
    {"userId": "user_001", "username": "john_modise", "timestamp": "2026-02-10T14:30:00Z", "category": "21K"},
    {"userId": "user_002", "username": "sarah_kgosi", "timestamp": "2026-02-11T09:15:00Z", "category": "10K"}
  ],
  "followers": ["user_003", "user_004", "user_005"],
  "requirements": ["Medical clearance", "Running shoes", "Hydration pack"]
}
```

### **Event Detail Page (Level B Overlay)**

**Navigation:** Tap marathon card → Opens full-screen detail view

**Layout Structure:**
```
┌──────────────────────────────────────────┐
│  ← Back              [★] [📤] [Follow]   │ ← Top bar with actions
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│  [EVENT HERO IMAGE - WebP]               │ ← 375px × 200px
│  🏃 Gaborone City Marathon 2026          │
│  📅 Sunday, 15 March 2026 • 05:00 AM     │
│  📍 National Stadium, Gaborone           │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│  Details | Registrations | Route         │ ← Tab navigation
│  ^^^^^^^                                 │
└──────────────────────────────────────────┘

[DETAILS TAB - Default Active]
┌──────────────────────────────────────────┐
│  [-] Event Information                   │ ← Expanded by default
│  ┌────────────────────────────────────┐ │
│  │ Race Categories:                   │ │
│  │ • 5K Fun Run                       │ │
│  │ • 10K Challenge                    │ │
│  │ • 21K Half Marathon                │ │
│  │ • 42K Full Marathon                │ │
│  │                                    │ │
│  │ Start Time: 05:00 AM (All)         │ │
│  │ Expected Duration: 3-7 hours       │ │
│  │ Entry Fee: Free                    │ │
│  └────────────────────────────────────┘ │
│                                          │
│  [+] Organizer                           │ ← Collapsed
│  [+] Requirements & Rules                │
│  [+] Weather Forecast                    │
│  [+] Location & Directions               │
└──────────────────────────────────────────┘

[BOTTOM ACTION BAR - Sticky]
┌──────────────────────────────────────────┐
│  👥 247/500 registered                   │
│        [Register for Event]              │ ← Primary blue button
│  OR                                      │
│  ✓ You're registered! (5K Category)      │ ← If already registered
└──────────────────────────────────────────┘
```

**Collapsible Sections (When Expanded):**

**[+] Organizer:**
```
┌────────────────────────────────────────┐
│ Botswana Athletics Association         │
│ [WhatsApp Contact] [Facebook Page]     │ ← Deep links
│ Email: info@baa.org.bw                 │
└────────────────────────────────────────┘
```

**[+] Requirements & Rules:**
```
┌────────────────────────────────────────┐
│ ✓ Medical clearance certificate        │
│ ✓ Proper running shoes                 │
│ ✓ Hydration pack recommended           │
│ ✓ Must be 16+ years old                │
│                                        │
│ Rules:                                 │
│ • No headphones on main road sections  │
│ • Follow marshal instructions          │
│ • Water stations every 2.5km           │
└────────────────────────────────────────┘
```

**[+] Weather Forecast:**
```
┌────────────────────────────────────────┐
│ Expected: 18-26°C • Clear skies        │
│ ☀️ Good running conditions             │
│ ⚠️ Bring sunscreen & hydration         │
└────────────────────────────────────────┘
```

**[+] Location & Directions:**
```
┌────────────────────────────────────────┐
│ [MAP PREVIEW - Offline tiles]          │
│ National Stadium, Gaborone             │
│ [Get Directions] [View on Map]         │
└────────────────────────────────────────┘
```

### **Registration Form (Single-Page with +/- Toggles)**

**Navigation:** Event Detail → Tap "Register for Event"

**Form Layout:**
```
┌──────────────────────────────────────────┐
│  ← Back      Register for Marathon   ✕   │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│  Gaborone City Marathon 2026             │
│  Sunday, 15 March • 05:00 AM             │
└──────────────────────────────────────────┘

[-] Personal Information (Expanded)
┌────────────────────────────────────────┐
│ Full Name: [Auto-filled from profile] │
│ Age: [28] (from profile)               │
│ Gender: [Male ▼]                       │
│ WhatsApp: [+267 ___] (from profile)    │
└────────────────────────────────────────┘

[-] Race Selection (Expanded)
┌────────────────────────────────────────┐
│ Choose your category:                  │
│ ◯ 5K Fun Run (Beginner)                │
│ ◯ 10K Challenge (Intermediate)         │
│ ◉ 21K Half Marathon (Advanced)         │
│ ◯ 42K Full Marathon (Expert)           │
│                                        │
│ Expected finish time: [2:30:00]        │
└────────────────────────────────────────┘

[+] Emergency Contact (Collapsed)
[+] Medical Information (Collapsed)
[+] T-Shirt Size (Optional) (Collapsed)

[-] Terms & Consent (Expanded)
┌────────────────────────────────────────┐
│ ☐ I confirm I am medically fit         │
│ ☐ I agree to event terms & conditions  │
│ ☐ I consent to event photography       │
└────────────────────────────────────────┘

[IF USER IS <16]
⚠️ Guardian Approval Required
┌────────────────────────────────────────┐
│ Your guardian will be notified via:    │
│ +267 XXX XXXX                          │
│ Registration pending approval.         │
└────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│    [Cancel]      [Submit Registration]   │
└──────────────────────────────────────────┘
```

**Expanded Section Examples:**

**[+] Emergency Contact:**
```
┌────────────────────────────────────────┐
│ Contact Name: [_____________]          │
│ Relationship: [Parent/Spouse ▼]       │
│ WhatsApp: [+267 ___________]           │
└────────────────────────────────────────┘
```

**[+] Medical Information:**
```
┌────────────────────────────────────────┐
│ Blood Type: [O+ ▼]                     │
│ Allergies: [None ▼]                    │
│ Medical Conditions:                    │
│ ☐ Asthma  ☐ Diabetes  ☐ Heart         │
│ ☐ None                                 │
│                                        │
│ Medical Certificate Upload:            │
│ [Choose File] or [Take Photo]          │
└────────────────────────────────────────┘
```

### **Registrations Tab (In Event Detail)**

**Tab View:**
```
┌──────────────────────────────────────────┐
│  Details | Registrations | Route         │
│           ^^^^^^^^^^^^^                  │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│  Registered Runners (247/500)            │
│                                          │
│  Filter: [All ▼] [5K] [10K] [21K] [42K] │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│  [PROFILE PHOTO] John Modise             │
│  21K Half Marathon • Joined 3 days ago   │
│  [View Profile]                          │
├──────────────────────────────────────────┤
│  [PROFILE PHOTO] Sarah Kgosi             │
│  10K Challenge • Joined 2 days ago       │
│  [View Profile]                          │
├──────────────────────────────────────────┤
│  ... (scrollable list)                   │
└──────────────────────────────────────────┘
```

**User Profile Cards:**
```
┌────────────────────────────────────────┐
│ [40px Photo] John Modise               │
│ 21K Half Marathon                      │
│ Registered: 12 Feb 2026, 14:30         │
│ Expected Time: 2:15:00                 │
│ [View Full Profile] (if public)        │
└────────────────────────────────────────┘
```

### **Follow & Favorite Buttons**

**Star Button (Favorite):**
- **Location:** Top-right of event card and detail page
- **States:** 
  - Grey outline ☆ = Not favorited
  - Gold filled ★ = Favorited
- **Action:** Toggle favorite state, save to user's favorites list
- **Storage:** `localStorage.favorites.events = [eventId1, eventId2, ...]`

**Follow Button:**
- **Location:** Next to star button
- **States:**
  - Grey "Follow" button = Not following
  - Blue "Following ✓" button = Following
- **Action:** Subscribe to event updates (notifications for roster changes, updates, etc.)
- **Storage:** `localStorage.following.events = [eventId1, eventId2, ...]`

### **Counter Implementation**

**Registration Counter:**
```javascript
// Dynamic counter in card
const registrationCount = event.registeredUsers.length;
const maxParticipants = event.registration.maxParticipants;
const percentage = (registrationCount / maxParticipants) * 100;

// Display logic
if (percentage >= 90) {
  // Show "Almost Full!" warning
  return `👥 ${registrationCount}/${maxParticipants} - Almost Full!`;
} else {
  return `👥 ${registrationCount}/${maxParticipants} registered`;
}
```

### **Additional Suggested Features**

**You asked "what else am I missing?"**

1. **Race Tracking (Live/Post-Event):**
   - Live tracker showing runner positions (GPS optional)
   - Post-race results with finish times
   - Leaderboard by category

2. **Training Plans:**
   - Suggested training schedules based on category
   - Week-by-week preparation guide
   - Hydration/nutrition tips

3. **Social Sharing:**
   - "Share My Registration" → WhatsApp/Facebook
   - "Create Training Group" → Find other registered runners nearby

4. **Event Updates Feed:**
   - Organizer announcements (route changes, weather alerts)
   - Real-time notification system for followers

5. **Post-Event:**
   - Certificate generation (PDF download)
   - Photo gallery from event
   - Feedback/rating system

6. **Equipment Checklist:**
   - Pre-race checklist (shoes, hydration, etc.)
   - Borrow/Lend system for gear (integrate with Equipment Ledger)

---

## 👥 FEATURE 2: CLUB/TEAM CREATION & MANAGEMENT

### **Access Point**

**Navigation:** Tap "+" button (bottom menu) → "Create Group/Club"

### **Team Creation Form (Single-Page with +/- Toggles)**

**Form Layout:**
```
┌──────────────────────────────────────────┐
│  ← Back      Create Your Team        ✕   │
│  Step 1 of 3: ●○○                        │
└──────────────────────────────────────────┘

[-] Team Identity (Expanded - Step 1)
┌────────────────────────────────────────┐
│ Team Name *                            │
│ [_____________________________]        │
│                                        │
│ Sport/Activity *                       │
│ [Football ▼] (from 126 activities)     │
│                                        │
│ Team Type                              │
│ ◉ Competitive  ◯ Recreational          │
│                                        │
│ Age Category                           │
│ [U17 ▼] (U10/U12/U15/U17/U20/Senior)   │
│                                        │
│ Upload Team Logo (Optional)            │
│ [Choose File] or [Take Photo]          │
└────────────────────────────────────────┘

[+] Team Details (Collapsed - Step 1)

[-] Location & Venue (Expanded - Step 2)
[+] Player Roster (Collapsed - Step 3)
[+] Admin & Roles (Collapsed - Step 3)

┌──────────────────────────────────────────┐
│    [Cancel]              [Next Step →]   │
└──────────────────────────────────────────┘
```

**Step 2 - Expanded Sections:**

**[+] Team Details:**
```
┌────────────────────────────────────────┐
│ Team Description                       │
│ [_____________________________]        │
│ [_____________________________]        │
│                                        │
│ Founded Year: [2026 ▼]                 │
│                                        │
│ Team Colors                            │
│ Primary: [Blue ▼]                      │
│ Secondary: [White ▼]                   │
│                                        │
│ Social Links                           │
│ Facebook: [________________]           │
│ WhatsApp Group: [+267 ______]          │
└────────────────────────────────────────┘
```

**[-] Location & Venue:**
```
┌────────────────────────────────────────┐
│ Home Venue                             │
│ [Search existing venues... 🔍]         │
│ OR                                     │
│ [Create New Venue +]                   │
│                                        │
│ Selected: Block 3 Sports Complex       │
│                                        │
│ Practice Schedule                      │
│ Monday: [17:00 - 19:00]                │
│ [+ Add practice day]                   │
│                                        │
│ Location Details                       │
│ Village/Town: [Gaborone ▼]             │
│ Area: [Block 3 ▼]                      │
└────────────────────────────────────────┘
```

**Step 3 - Player & Admin Management:**

**[-] Player Roster:**
```
┌────────────────────────────────────────┐
│ Add Players (3 methods):               │
│                                        │
│ Method 1: Invite by WhatsApp           │
│ [+267 ___________] [Send Invite]       │
│                                        │
│ Method 2: Search Mizano Users          │
│ [Search username... 🔍]                │
│                                        │
│ Method 3: Add Pending (Join Later)     │
│ Name: [_____________]                  │
│ Position: [Midfielder ▼]               │
│ [Add to Roster]                        │
│                                        │
│ Current Roster (8 players):            │
│ ┌────────────────────────────────────┐│
│ │ [Photo] John Modise • GK           ││
│ │ Status: ✓ Confirmed                ││
│ │ [Edit] [Remove]                    ││
│ ├────────────────────────────────────┤│
│ │ [Photo] Sarah Kgosi • DF           ││
│ │ Status: ⏳ Pending Invite          ││
│ │ [Resend] [Remove]                  ││
│ ├────────────────────────────────────┤│
│ │ ... (scrollable)                   ││
│ └────────────────────────────────────┘│
└────────────────────────────────────────┘
```

**[-] Admin & Roles:**
```
┌────────────────────────────────────────┐
│ Team Admins                            │
│ ┌────────────────────────────────────┐│
│ │ [Photo] You (Creator)              ││
│ │ Role: Owner/Captain                ││
│ │ Permissions: Full Access           ││
│ └────────────────────────────────────┘│
│                                        │
│ Add Co-Admins                          │
│ [Select from roster ▼]                 │
│                                        │
│ Assign Role:                           │
│ ◯ Captain                              │
│ ◯ Coach                                │
│ ◯ Manager                              │
│ ◯ Treasurer                            │
│                                        │
│ Permissions:                           │
│ ☐ Edit team details                    │
│ ☐ Add/remove players                   │
│ ☐ Create matches                       │
│ ☐ Manage finances                      │
│                                        │
│ [Add Admin]                            │
│                                        │
│ Current Admins (2):                    │
│ • You (Owner) - Full Access            │
│ • Neo Tau (Coach) - Limited            │
└────────────────────────────────────────┘
```

### **WhatsApp Invitation Flow**

**Invitation Message Template:**
```javascript
const inviteMessage = `Hi! You've been invited to join *${teamName}* on Mizano.

Team: ${teamName}
Sport: ${sport}
Type: ${teamType}

Tap here to accept: https://mizano.app/invite/${teamId}

Download Mizano: https://mizano.app
`;

// Deep link construction
const whatsappUrl = `https://wa.me/267${phoneNumber}?text=${encodeURIComponent(inviteMessage)}`;
```

**Invite Confirmation:**
```
┌────────────────────────────────────────┐
│  WhatsApp Invite Sent!                 │
│                                        │
│  Invitation sent to:                   │
│  +267 72 123 456                       │
│                                        │
│  They'll appear in your roster once    │
│  they accept via the link.             │
│                                        │
│  [Send Another] [Done]                 │
└────────────────────────────────────────┘
```

### **Team Detail Page (Public View)**

**Navigation:** Search → Tap team card OR Activity Detail → Tap organizer name

**Layout:**
```
┌──────────────────────────────────────────┐
│  ← Back                    [★] [📤] [Join]│
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│  [TEAM LOGO - 80px × 80px]               │
│  Block 3 Warriors FC                     │
│  Football • U17 • Competitive            │
│  📍 Block 3 Sports Complex, Gaborone     │
│  👥 18 players • Founded 2024            │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│  About | Roster | Matches | Stats        │
│  ^^^^^                                   │
└──────────────────────────────────────────┘

[ABOUT TAB]
┌──────────────────────────────────────────┐
│  [-] Team Information                    │
│  ┌────────────────────────────────────┐ │
│  │ Youth football team representing   │ │
│  │ Block 3 community. We train twice  │ │
│  │ weekly and compete in local leagues│ │
│  │                                    │ │
│  │ Colors: Blue & White               │ │
│  │ Home Venue: Block 3 Sports Complex │ │
│  └────────────────────────────────────┘ │
│                                          │
│  [+] Practice Schedule                   │
│  [+] Contact Information                 │
│  [+] Achievements                        │
└──────────────────────────────────────────┘

[ROSTER TAB]
┌──────────────────────────────────────────┐
│  Squad (18 players)                      │
│                                          │
│  Goalkeepers (2)                         │
│  ┌────────────────────────────────────┐ │
│  │ #1 [Photo] John Modise             │ │
│  │ Age: 16 • 2 years with team        │ │
│  │ [View Profile]                     │ │
│  └────────────────────────────────────┘ │
│                                          │
│  Defenders (6)                           │
│  Midfielders (6)                         │
│  Forwards (4)                            │
│                                          │
│  [+] Technical Staff                     │
│  ┌────────────────────────────────────┐ │
│  │ Coach: Michael Tau                 │ │
│  │ Manager: Sarah Kgosi               │ │
│  └────────────────────────────────────┘ │
└──────────────────────────────────────────┘

[BOTTOM ACTION BAR]
┌──────────────────────────────────────────┐
│  [Request to Join Team]                  │
│  OR                                      │
│  [WhatsApp Coach] [Facebook Page]        │
└──────────────────────────────────────────┘
```

### **"Looking for Match" Feature**

**Create Match Request Form:**

**Navigation:** Team Page (Owner view) → "Create Match Request"

**Form Layout:**
```
┌──────────────────────────────────────────┐
│  ← Back      Find Opponent           ✕   │
└──────────────────────────────────────────┘

[-] Match Details (Expanded)
┌────────────────────────────────────────┐
│ Match Type                             │
│ ◉ Friendly  ◯ League  ◯ Tournament     │
│                                        │
│ Preferred Date Range                   │
│ From: [DD/MM/YYYY]                     │
│ To: [DD/MM/YYYY]                       │
│                                        │
│ Preferred Time                         │
│ [Afternoons ▼] (Mornings/Afternoons/   │
│                 Evenings/Flexible)     │
│                                        │
│ Venue Preference                       │
│ ◉ Home (Block 3 Sports Complex)        │
│ ◯ Away                                 │
│ ◯ Neutral Ground                       │
└────────────────────────────────────────┘

[+] Opponent Requirements (Collapsed)
[+] Additional Details (Collapsed)

┌──────────────────────────────────────────┐
│    [Cancel]        [Post Match Request]  │
└──────────────────────────────────────────┘
```

**Expanded Sections:**

**[+] Opponent Requirements:**
```
┌────────────────────────────────────────┐
│ Age Category                           │
│ [U17 ▼] (Must match our category)      │
│                                        │
│ Skill Level                            │
│ ◉ Similar  ◯ Higher  ◯ Any             │
│                                        │
│ Location Preference                    │
│ [Within Gaborone ▼]                    │
└────────────────────────────────────────┘
```

**[+] Additional Details:**
```
┌────────────────────────────────────────┐
│ Match Duration                         │
│ [90 minutes ▼] (60/90/Custom)          │
│                                        │
│ Notes for Opponents                    │
│ [_____________________________]        │
│ [_____________________________]        │
│                                        │
│ Contact Method                         │
│ WhatsApp: [+267 ___] (auto-filled)     │
└────────────────────────────────────────┘
```

### **Match Request Card (In Drop Field)**

**Card Type:** Match-Making Card (Green border at 70% opacity)

**Visual Layout:**
```
┌──────────────────────────────────────────┐
│ ⚽ SEEKING OPPONENT                       │
│ Block 3 Warriors FC                      │
│ U17 Football • Friendly Match            │
│                                          │
│ 📅 Looking for: 20-25 March              │
│ 📍 Block 3 Sports Complex (Home)         │
│ ⏰ Afternoon slots preferred             │
│                                          │
│ 💬 "Looking for competitive U17 team     │
│    for friendly practice match"          │
│                                          │
│ [We're Interested!] [WhatsApp]           │
│                                          │
│ 👁️ 12 teams viewed • 3 interested       │
└──────────────────────────────────────────┘
```

**Border Color:** Green (#70AD47, 70%) = Active match request

### **Interested Teams List Page**

**Navigation:** Match Request Card (Owner view) → "View Interested Teams"

**Layout:**
```
┌──────────────────────────────────────────┐
│  ← Back      Teams Interested (3)        │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│  Your Match Request:                     │
│  U17 Friendly • 20-25 March              │
│  Block 3 Sports Complex                  │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│  Interested Teams                        │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │ [LOGO] Broadhurst Blazers FC       │ │
│  │ U17 • 20 players • Est. 2023       │ │
│  │ 📍 Broadhurst (5km away)           │ │
│  │ Interested: 2 hours ago            │ │
│  │                                    │ │
│  │ "We're available 22-24 March!"     │ │
│  │                                    │ │
│  │ [View Team] [WhatsApp] [Accept]    │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │ [LOGO] Gaborone West United        │ │
│  │ U17 • 18 players • Est. 2022       │ │
│  │ 📍 Gaborone West (8km away)        │ │
│  │ Interested: 5 hours ago            │ │
│  │                                    │ │
│  │ "Flexible on dates. Let's play!"   │ │
│  │                                    │ │
│  │ [View Team] [WhatsApp] [Accept]    │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ... (scrollable)                        │
└──────────────────────────────────────────┘
```

**Accept Match Flow:**
```
┌────────────────────────────────────────┐
│  Confirm Match with Broadhurst Blazers │
│                                        │
│  Proposed Date: [22 March 2026 ▼]      │
│  Time: [15:00 ▼]                       │
│  Venue: [Block 3 Sports Complex ▼]     │
│                                        │
│  This will create an official match    │
│  and notify both teams via WhatsApp.   │
│                                        │
│  [Cancel]          [Confirm Match]     │
└────────────────────────────────────────┘
```

### **Player Seeking Feature**

**Individual Player Search Card:**
```
┌──────────────────────────────────────────┐
│ 👤 SEEKING PLAYERS                       │
│ Block 3 Warriors FC                      │
│ U17 Football Team                        │
│                                          │
│ Positions Needed:                        │
│ ⚠️ Midfielder (1) - Urgent               │
│ • Defender (2)                           │
│                                          │
│ 📅 Tryouts: Saturday 20 Feb • 10:00 AM   │
│ 📍 Block 3 Sports Complex                │
│                                          │
│ Requirements:                            │
│ • Age 15-17                              │
│ • Intermediate skill level               │
│ • Available for 2 practices/week         │
│                                          │
│ [I'm Interested!] [WhatsApp Coach]       │
│                                          │
│ 👁️ 24 players viewed • 7 applied        │
└──────────────────────────────────────────┘
```

**Interested Players List (Team Admin View):**
```
┌──────────────────────────────────────────┐
│  ← Back      Player Applications (7)     │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│  Your Recruitment Post:                  │
│  Midfielder (1) + Defender (2)           │
│  Posted: 3 days ago                      │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│  Applications                            │
│                                          │
│  Filter: [All ▼] [MF] [DF]              │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│  ┌────────────────────────────────────┐ │
│  │ [PHOTO] Neo Tau                    │ │
│  │ Age: 16 • Preferred: Midfielder    │ │
│  │ Experience: 3 years club football  │ │
│  │ Applied: 2 days ago                │ │
│  │                                    │ │
│  │ "I've played MF for 3 years and    │ │
│  │  looking for competitive team..."  │ │
│  │                                    │ │
│  │ [View Profile] [WhatsApp]          │ │
│  │ [Invite to Tryout] [Decline]       │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │ [PHOTO] Lebo Moeng                 │ │
│  │ Age: 15 • Preferred: Defender      │ │
│  │ ... (scrollable)                   │ │
│  └────────────────────────────────────┘ │
└──────────────────────────────────────────┘
```

---

## 🔽 FEATURE 3: THREE-LEVEL BOTTOM FILTER SYSTEM

### **Architectural Overview**

The Drop Field (infinite scroll content area) is controlled by a **three-level hierarchical filter system** accessed via the bottom menu bar.

**Filter Hierarchy:**
1. **Level A (Bottom Menu Bar):** Entry points (Activity, Places, Home Menu)
2. **Level B (First Filter Panel):** Primary category selection (Sport Type, Location)
3. **Level C (Second Filter Panel):** Time-based filtering (Today, This Week, Custom Date)
4. **Level D (Third Filter Panel):** Date calendar picker (optional, deep filter)

### **Bottom Menu Bar (Level A - Always Visible)**

**Fixed Position:** Bottom of screen, 56px height, white background

**Icon Layout:**
```
┌──────────────────────────────────────────┐
│ [🎯] [📍] [☰] [🔍] [+] [🔔] [≡]         │
│ Activity Places Menu Search Add Notif Ham│
└──────────────────────────────────────────┘
```

**Icon Functions:**
- **🎯 Activity:** Opens Level B activity filter panel
- **📍 Places:** Opens Level B location filter panel  
- **☰ Home Menu:** Opens navigation menu overlay
- **🔍 Search:** Opens search interface (replaces Drop Field)
- **+ Add:** Opens creation menu (events, teams, venues)
- **🔔 Notifications:** Opens notification panel
- **≡ Hamburger:** Alternative navigation menu

### **Level B: Activity Filter Panel**

**Trigger:** Tap 🎯 Activity icon in bottom menu

**Panel Behavior:** Slides up from bottom, 60% screen height, white background

**Panel Layout:**
```
┌──────────────────────────────────────────┐
│  ━━━━━                          ✕        │ ← Drag handle + close
│  Filter by Activity                      │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│  Popular Sports                          │
│  ┌────────────────────────────────────┐ │
│  │ [⚽] Football      [🏀] Basketball  │ │
│  │ [🏐] Netball      [🏉] Rugby       │ │
│  │ [🏃] Athletics    [🏏] Cricket     │ │
│  │ [🎾] Tennis       [🏊] Swimming    │ │
│  │ [♟️] Chess         [🥋] Karate      │ │
│  └────────────────────────────────────┘ │
│                                          │
│  All Activities                          │
│  [View Full List (126 activities) →]     │
│                                          │
│  ▶ Advanced Filters                      │ ← Tap to expand Level C
│  (Time range, skill level, cost)         │
└──────────────────────────────────────────┘
```

**Icon Behavior:**
- Each sport icon is a **44px × 44px** touch target
- **Tap:** Instantly filters Drop Field to show only that sport
- **Active State:** Blue border around selected icon
- **Multiple Selection:** Tap multiple icons to combine filters

**Drop Field Response:**
- Instant filter (no loading screen)
- Card tally updates in Places Filter Bar: "42 matches found"
- Empty state if no results: "No football activities in Block 3. Try another sport or area."

### **Level B: Places Filter Panel**

**Trigger:** Tap 📍 Places icon in bottom menu

**Panel Layout:**
```
┌──────────────────────────────────────────┐
│  ━━━━━                          ✕        │
│  Filter by Location                      │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│  Current Location                        │
│  ┌────────────────────────────────────┐ │
│  │ 📍 Gaborone • Block 3              │ │ ← Selected
│  │ [Change Location]                  │ │
│  └────────────────────────────────────┘ │
│                                          │
│  Nearby Areas                            │
│  ┌────────────────────────────────────┐ │
│  │ ☐ Block 5 (2.1 km)                 │ │
│  │ ☐ Broadhurst (3.5 km)              │ │
│  │ ☐ Gaborone West (5.0 km)           │ │
│  │ ☐ Extension 2 (6.2 km)             │ │
│  └────────────────────────────────────┘ │
│                                          │
│  Distance Range                          │
│  ┌────────────────────────────────────┐ │
│  │ [●━━━━━━━━━━] 10 km                │ │ ← Slider
│  └────────────────────────────────────┘ │
│                                          │
│  ▶ Advanced Filters                      │ ← Tap to expand Level C
│  (Date range, venue type)                │
└──────────────────────────────────────────┘
```

**Location Hierarchy:**
- **Village/Town:** Gaborone (from ISO 3166-2 BW codes)
- **Area/Neighborhood:** Block 3 (from DROPDOWN_REFERENCE_BOTSWANA_VILLAGES_TOWNS_AND_CITIES.md)
- **Radius:** 0-50km slider

**Filter Logic:**
```javascript
// Example filter combination
const filters = {
  location: {
    village: "Gaborone",
    areas: ["Block 3", "Block 5"], // Multi-select
    radius: 10 // kilometers
  },
  activity: ["Football", "Basketball"],
  time: "This Week"
};

// Apply filters to data
const filteredActivities = allActivities.filter(activity => {
  return (
    filters.location.areas.includes(activity.location.area) &&
    filters.activity.includes(activity.sport) &&
    isWithinTimeRange(activity.date, filters.time)
  );
});
```

### **Level C: Time Filter Panel (Expanded from Level B)**

**Trigger:** Tap "▶ Advanced Filters" in Activity or Places panel

**Panel Expansion:** Level B panel grows to 80% screen height

**Additional Section Appears:**
```
┌──────────────────────────────────────────┐
│  [▼] Advanced Filters                    │ ← Now expanded
│  ┌────────────────────────────────────┐ │
│  │ Time Range                         │ │
│  │ ┌────────────────────────────────┐ │ │
│  │ │ [Today] [Tomorrow] [This Week] │ │ │
│  │ │ [This Month] [Custom Range]    │ │ │
│  │ └────────────────────────────────┘ │ │
│  │                                    │ │
│  │ Time of Day                        │ │
│  │ ☐ Morning (06:00-12:00)            │ │
│  │ ☐ Afternoon (12:00-18:00)          │ │
│  │ ☐ Evening (18:00-22:00)            │ │
│  │                                    │ │
│  │ ▶ More Filters                     │ │ ← Tap to expand Level D
│  │ (Custom date picker)               │ │
│  └────────────────────────────────────┘ │
└──────────────────────────────────────────┘
```

**Pill Button Behavior:**
```
┌────────────────────────────────────┐
│ [Today] [Tomorrow] [This Week]     │
│  ^^^^^ (Active = blue background)  │
└────────────────────────────────────┘
```

**Active State:**
- **Background:** Blue (#1E88E5)
- **Text:** White, 14px Bold
- **Height:** 36px, rounded 18px

**Inactive State:**
- **Background:** Light grey (#F5F5F5)
- **Text:** Grey (#757575), 14px Regular

### **Level D: Date Calendar Filter (Deep Filter)**

**Trigger:** Tap "▶ More Filters" in Level C OR tap "Custom Range" pill

**Panel Expansion:** Level B panel becomes full-screen overlay

**Calendar Interface:**
```
┌──────────────────────────────────────────┐
│  ✕           Select Date Range           │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│         ← February 2026 →                │
│                                          │
│  S   M   T   W   T   F   S               │
│                      1   2               │
│  3   4   5   6   7   8   9               │
│  10  11  12  13  14  15  16              │
│  17  18  19  20  21  22  23              │
│  24  25  26  27  28                      │
│                                          │
│  Start Date: 14 Feb 2026                 │
│  End Date: 21 Feb 2026                   │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│    [Clear Selection]    [Apply Filter]   │
└──────────────────────────────────────────┘
```

**Date Selection Behavior:**
- **First Tap:** Sets start date (blue background)
- **Second Tap:** Sets end date (blue background)
- **Range Display:** Dates between start/end have light blue background
- **Tap "Apply Filter":** Closes calendar, updates Drop Field

**Date Cell Styles:**
- **Selected Start/End:** Blue background (#1E88E5), white text
- **In Range:** Light blue background (#E3F2FD), charcoal text
- **Today:** Blue border, white background
- **Has Events:** Small blue dot below date number
- **Past Dates:** Grey text (#BDBDBD), not selectable

### **Filter Combination Example**

**User Journey:**
1. Tap 🎯 Activity icon → Level B panel opens
2. Select ⚽ Football → Drop Field updates to show only football
3. Tap ▶ Advanced Filters → Level C expands
4. Select [This Week] pill → Drop Field narrows to this week's matches
5. Tap 📍 Places icon → Switch to Places panel (preserves activity filter)
6. Select "Block 3" + "Block 5" checkboxes → Drop Field shows football in both areas this week
7. Panel auto-collapses → Final filtered Drop Field visible

**Result Display (Places Filter Bar):**
```
┌──────────────────────────────────────────┐
│ GC · Block 3, Block 5     [🎯] [📅]  12  │
│ ⚽ Football • This Week                   │
└──────────────────────────────────────────┘
```

**Active Filter Indicators:**
- **Location:** "GC · Block 3, Block 5"
- **Activity:** ⚽ icon visible
- **Time:** "This Week" label
- **Count:** "12" activities match all filters

### **Filter Persistence**

**Storage Strategy:**
```javascript
// Save filter state to localStorage
const filterState = {
  activity: ["Football"],
  location: {
    village: "Gaborone",
    areas: ["Block 3", "Block 5"],
    radius: 10
  },
  time: {
    range: "This Week",
    timeOfDay: ["Afternoon"]
  },
  customDate: {
    start: null,
    end: null
  }
};

localStorage.setItem('mizano_filters', JSON.stringify(filterState));
```

**On App Reload:**
- Restore saved filters
- Re-apply to Drop Field
- Show active filter badges in Places Filter Bar

### **Clear Filters Action**

**Button Location:** Places Filter Bar (appears when filters active)

**Visual:**
```
┌──────────────────────────────────────────┐
│ GC · Block 3, Block 5     [Clear ✕]  12  │
└──────────────────────────────────────────┘
```

**Tap "Clear ✕":**
- Reset all filters to defaults
- Show all activities in current location
- Update tally count
- Remove filter badges

### **Empty State Handling**

**No Results Found:**
```
┌──────────────────────────────────────────┐
│                                          │
│         [🔍 ICON]                        │
│                                          │
│  No football matches found in            │
│  Block 3 or Block 5 this week.           │
│                                          │
│  Try:                                    │
│  • Expanding your search area            │
│  • Selecting "This Month" instead        │
│  • Choosing a different sport            │
│                                          │
│  [Adjust Filters] [Clear All Filters]    │
└──────────────────────────────────────────┘
```

---

## 💻 IMPLEMENTATION CHECKLIST FOR AI AGENT

### **Phase 1: Marathon Registration System**

**Data Integration:**
- [ ] Parse `MIZANO_EVENTS_DATABASE_2026.md` JSON structures
- [ ] Parse `BOTSWANA_2026_EVENTS_DATABASE.md` event calendar
- [ ] Merge marathon events into unified data structure
- [ ] Create `marathonEvents` array in `DataManager.js`

**Card Rendering:**
- [ ] Add "marathon" case to `CardRenderer.js` factory
- [ ] Implement Registration-State Card layout (yellow border)
- [ ] Add dynamic counter display (`${registered}/${max}`)
- [ ] Implement urgency badge logic (<3 days = red)
- [ ] Add favorite star (★) toggle functionality
- [ ] Add follow button functionality

**Event Detail Page:**
- [ ] Create `eventDetail.html` template (Level B overlay)
- [ ] Implement 3-tab navigation (Details, Registrations, Route)
- [ ] Add +/- collapsible sections for event info
- [ ] Implement WhatsApp deep link: `wa.me/267${organizer.whatsapp}`
- [ ] Implement Facebook page link: `${organizer.facebook}`
- [ ] Add offline map integration for venue location

**Registration Form:**
- [ ] Create `marathonRegistration.html` single-page form
- [ ] Implement +/- collapsible sections (7 sections)
- [ ] Add category selection (5K/10K/21K/42K radio buttons)
- [ ] Add emergency contact section
- [ ] Add medical information section with file upload
- [ ] Implement guardian approval trigger for <16 users
- [ ] Add terms & conditions checkboxes (3 required)
- [ ] Implement form validation before submission

**Data Management:**
- [ ] Update `registeredUsers` array on successful registration
- [ ] Increment `currentCount` counter dynamically
- [ ] Store favorite marathons: `localStorage.favorites.events`
- [ ] Store followed marathons: `localStorage.following.events`
- [ ] Queue offline registrations in IndexedDB for sync

**Registrations Tab:**
- [ ] Create scrollable registered users list
- [ ] Add filter by category (5K/10K/21K/42K)
- [ ] Display user profile cards (40px photo + username + timestamp)
- [ ] Implement "View Profile" navigation (if profile is public)

**Additional Features (Suggested):**
- [ ] Add race tracking system (optional: post-MVP)
- [ ] Add training plans section (optional: post-MVP)
- [ ] Add social sharing ("Share My Registration")
- [ ] Add event updates feed for followers
- [ ] Add post-event certificate generation

---

### **Phase 2: Club/Team Creation & Management**

**Team Creation Form:**
- [ ] Create `teamCreation.html` multi-step form (3 steps)
- [ ] Add progress indicator: `Step 1 of 3: ●○○`
- [ ] Implement +/- collapsible sections in each step
- [ ] Add sport selector (from 126 activities dropdown)
- [ ] Add team type radio buttons (Competitive/Recreational)
- [ ] Add age category dropdown (U10/U12/U15/U17/U20/Senior)
- [ ] Add team logo upload (WebP format, max 500KB)
- [ ] Add venue selector (search existing or create new)
- [ ] Add practice schedule builder (days + times)

**Player Roster Management:**
- [ ] Implement 3 add-player methods:
  - [ ] WhatsApp invite (deep link: `wa.me/267${phone}?text=${inviteMsg}`)
  - [ ] Search Mizano users (query `users.json`)
  - [ ] Add pending (name + position, joins later)
- [ ] Create roster display with player cards
- [ ] Add player status badges (✓ Confirmed, ⏳ Pending, ❌ Declined)
- [ ] Implement [Edit] and [Remove] actions for each player
- [ ] Add position assignment dropdown (sport-specific from `DROPDOWN_REFERENCE_SPORS_ACTIVTIES_PLAYER_POSITIONS_DATA.md`)

**Admin & Roles System:**
- [ ] Set creator as default Owner/Captain (full permissions)
- [ ] Add co-admin selector (choose from current roster)
- [ ] Implement role dropdown (Captain/Coach/Manager/Treasurer)
- [ ] Add permission checkboxes (4 permissions)
- [ ] Store admin list in team data structure
- [ ] Implement role-based access control in team detail view

**WhatsApp Invitation Flow:**
- [ ] Generate invitation message template
- [ ] Construct deep link: `wa.me/267${phone}?text=${encodeURIComponent(msg)}`
- [ ] Show confirmation: "WhatsApp Invite Sent!"
- [ ] Update player status to "Pending Invite"
- [ ] Handle invite acceptance (webhook or manual admin confirmation)

**Team Detail Page (Public View):**
- [ ] Create `teamDetail.html` template
- [ ] Add team header (logo, name, sport, location, player count)
- [ ] Implement 4-tab navigation (About, Roster, Matches, Stats)
- [ ] Add About tab with collapsible sections
- [ ] Add Roster tab with player list grouped by position
- [ ] Add "Request to Join Team" button (bottom action bar)
- [ ] Implement WhatsApp coach contact button

**Match Request System ("Looking for Opponent"):**
- [ ] Create `matchRequest.html` form
- [ ] Add match type selector (Friendly/League/Tournament)
- [ ] Add date range picker (from/to dates)
- [ ] Add time preference dropdown (Mornings/Afternoons/Evenings/Flexible)
- [ ] Add venue preference radio buttons (Home/Away/Neutral)
- [ ] Add opponent requirements section (age, skill, location)
- [ ] Implement "Post Match Request" action

**Match Request Card:**
- [ ] Add "match-request" case to `CardRenderer.js`
- [ ] Implement green border (#70AD47, 70%)
- [ ] Add "SEEKING OPPONENT" badge
- [ ] Display match details (date range, venue, time)
- [ ] Add view counter: "👁️ 12 teams viewed"
- [ ] Add interested counter: "3 interested"
- [ ] Add [We're Interested!] button for other teams

**Interested Teams List:**
- [ ] Create `interestedTeams.html` page (Team Owner view only)
- [ ] Display list of teams that clicked "We're Interested!"
- [ ] Show team cards (logo, name, players, location, timestamp)
- [ ] Add team message/notes field
- [ ] Add [View Team], [WhatsApp], [Accept] buttons
- [ ] Implement match confirmation flow

**Player Seeking Feature:**
- [ ] Create "SEEKING PLAYERS" card variant
- [ ] Add positions needed list with urgency flags (⚠️ Urgent)
- [ ] Add tryout details (date, time, location)
- [ ] Add requirements section (age, skill, availability)
- [ ] Display view/application counters
- [ ] Create player applications list (Admin view)
- [ ] Add [Invite to Tryout] and [Decline] actions

---

### **Phase 3: Three-Level Bottom Filter System**

**Level A - Bottom Menu Bar:**
- [ ] Ensure bottom menu is fixed position (CSS: `position: fixed; bottom: 0;`)
- [ ] Verify 7 icons present (Activity, Places, Home Menu, Search, Add, Notifications, Hamburger)
- [ ] Add click handlers for each icon
- [ ] Ensure 44px minimum touch target size
- [ ] Add active state styling (blue highlight when panel open)

**Level B - Activity Filter Panel:**
- [ ] Create `activityFilterPanel.html` slide-up overlay
- [ ] Set panel height to 60% of viewport
- [ ] Add drag handle (━━━━━) for swipe-to-dismiss
- [ ] Add close button (✕) in top-right
- [ ] Display 10 popular sport icons in grid layout (44px × 44px each)
- [ ] Add "View Full List (126 activities) →" link
- [ ] Implement tap-to-filter logic (instant Drop Field update)
- [ ] Add multi-select capability (tap multiple icons)
- [ ] Show active state (blue border) on selected icons
- [ ] Add "▶ Advanced Filters" expansion trigger

**Level B - Places Filter Panel:**
- [ ] Create `placesFilterPanel.html` slide-up overlay
- [ ] Display current location (village + area)
- [ ] Add [Change Location] button (opens location selector)
- [ ] Add nearby areas checkboxes (auto-populate based on GPS/selected village)
- [ ] Show distance for each area (calculated from GPS)
- [ ] Add distance range slider (0-50km)
- [ ] Implement multi-area selection
- [ ] Add "▶ Advanced Filters" expansion trigger
- [ ] Persist location filter in `localStorage.mizano_filters`

**Level C - Time Filter (Expanded Panel):**
- [ ] Expand Level B panel to 80% screen height
- [ ] Add time range pill buttons (Today/Tomorrow/This Week/This Month/Custom)
- [ ] Style active pill (blue background, white text)
- [ ] Add time of day checkboxes (Morning/Afternoon/Evening)
- [ ] Implement instant filter on pill tap
- [ ] Add "▶ More Filters" expansion trigger for Level D

**Level D - Date Calendar (Deep Filter):**
- [ ] Expand panel to full-screen overlay
- [ ] Create calendar interface with month navigation (← →)
- [ ] Generate calendar grid (S M T W T F S)
- [ ] Implement date range selection (start date + end date)
- [ ] Style selected dates (blue background)
- [ ] Style date range (light blue background)
- [ ] Show "Has Events" indicator (blue dot) for dates with activities
- [ ] Disable past dates (grey out)
- [ ] Add [Clear Selection] and [Apply Filter] buttons
- [ ] Close calendar on "Apply Filter", update Drop Field

**Filter Combination Logic:**
- [ ] Create `FilterManager.js` module
- [ ] Implement `applyFilters(activities, filters)` function
- [ ] Combine activity + location + time filters
- [ ] Update card tally in Places Filter Bar dynamically
- [ ] Show active filter badges (⚽ Football • This Week)
- [ ] Persist combined filter state in localStorage
- [ ] Restore filters on app reload

**Clear Filters:**
- [ ] Add [Clear ✕] button to Places Filter Bar (only when filters active)
- [ ] Reset all filters to defaults on tap
- [ ] Update Drop Field to show all activities
- [ ] Remove filter badges
- [ ] Clear `localStorage.mizano_filters`

**Empty State Handling:**
- [ ] Create `emptyState.html` component
- [ ] Show when `filteredActivities.length === 0`
- [ ] Display relevant message based on active filters
- [ ] Add suggestions (expand area, change time, etc.)
- [ ] Add [Adjust Filters] and [Clear All Filters] buttons

**Drop Field Integration:**
- [ ] Ensure `CardRenderer.js` respects active filters
- [ ] Update card count in real-time as filters change
- [ ] Implement lazy loading for filtered results (infinite scroll)
- [ ] Show loading indicator while filtering (if needed)

---

## 🔧 TECHNICAL IMPLEMENTATION NOTES

### **JavaScript Module Pattern**

**All features must follow stateless module pattern:**
```javascript
// Example: MarathonManager.js
const MarathonManager = (function() {
  'use strict';
  
  // Private state
  let marathonEvents = [];
  let userRegistrations = [];
  
  // Private methods
  function loadMarathonData() {
    // Fetch from MIZANO_EVENTS_DATABASE_2026.md
    marathonEvents = DataManager.getMarathons();
  }
  
  function registerUser(eventId, userData) {
    // Validate, check age, trigger guardian if needed
    if (userData.age < 16) {
      GuardianSafety.requestApproval(userData, eventId);
      return { status: 'pending', message: 'Guardian approval required' };
    }
    
    // Add to registrations array
    const registration = {
      userId: userData.id,
      username: userData.username,
      eventId: eventId,
      timestamp: new Date().toISOString(),
      category: userData.selectedCategory
    };
    
    userRegistrations.push(registration);
    
    // Update event counter
    const event = marathonEvents.find(e => e.id === eventId);
    event.registration.currentCount++;
    
    // Save to storage
    StorageManager.save('marathonRegistrations', userRegistrations);
    
    return { status: 'success', message: 'Registration confirmed!' };
  }
  
  // Public API
  return {
    init: loadMarathonData,
    register: registerUser,
    getRegistrations: (eventId) => userRegistrations.filter(r => r.eventId === eventId),
    getFavorites: () => JSON.parse(localStorage.getItem('favorites.events') || '[]')
  };
})();

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  MarathonManager.init();
});
```

### **Guardian Approval Integration**

**For all competitive registrations where user.age < 16:**
```javascript
// In registration flow
if (userData.age < 16 && eventType === 'competitive') {
  // Trigger guardian handshake
  const approvalRequest = {
    childId: userData.id,
    eventId: eventId,
    eventName: eventData.name,
    eventDate: eventData.date,
    guardianPhone: userData.guardianWhatsApp
  };
  
  GuardianSafety.requestApproval(approvalRequest);
  
  // Show pending state to user
  UI.showMessage('Guardian approval required. We\'ve sent a notification to +267 XXX XXXX');
  
  // Queue registration for after approval
  StorageManager.queueAction('pendingRegistrations', {
    ...registrationData,
    status: 'awaiting_guardian_approval'
  });
}
```

### **WhatsApp Deep Link Construction**

**Standard template for all WhatsApp integrations:**
```javascript
function generateWhatsAppLink(phoneNumber, message) {
  // Ensure proper format: 267XXXXXXXXX (no + or spaces)
  const cleanPhone = phoneNumber.replace(/[\s+\-()]/g, '');
  
  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Construct wa.me deep link
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

// Example usage: Team invitation
const inviteMessage = `Hi! You've been invited to join *${teamName}* on Mizano.

Team: ${teamName}
Sport: ${sport}
Type: ${teamType}

Tap here to accept: https://mizano.app/invite/${teamId}

Download Mizano: https://mizano.app`;

const whatsappLink = generateWhatsAppLink(playerPhone, inviteMessage);

// Open in new window (desktop) or app (mobile)
window.open(whatsappLink, '_blank');
```

### **Offline-First Data Sync**

**All write operations must queue when offline:**
```javascript
// In StorageManager.js
function saveWithSync(key, data, syncRequired = true) {
  // Save locally first
  localStorage.setItem(key, JSON.stringify(data));
  
  // Check if online
  if (navigator.onLine && syncRequired) {
    // Sync to cloud immediately
    syncToCloud(key, data);
  } else {
    // Queue for later sync
    const syncQueue = JSON.parse(localStorage.getItem('syncQueue') || '[]');
    syncQueue.push({ key, data, timestamp: Date.now() });
    localStorage.setItem('syncQueue', JSON.stringify(syncQueue));
  }
}

// On reconnect
window.addEventListener('online', () => {
  processSyncQueue();
});
```

### **Card Renderer Integration**

**Add new card types to CardRenderer.js:**
```javascript
// In CardRenderer.js factory
function renderCard(activity) {
  switch(activity.type) {
    case 'marathon':
      return renderMarathonCard(activity);
    case 'match-request':
      return renderMatchRequestCard(activity);
    case 'team-profile':
      return renderTeamCard(activity);
    // ... existing cases
    default:
      return renderStandardCard(activity);
  }
}

function renderMarathonCard(event) {
  const registrationCount = event.registeredUsers.length;
  const maxParticipants = event.registration.maxParticipants;
  const percentage = (registrationCount / maxParticipants) * 100;
  
  // Determine border color
  const daysUntilDeadline = getDaysUntil(event.registration.deadline);
  let borderColor = 'rgba(255, 193, 7, 0.7)'; // Yellow (default)
  if (daysUntilDeadline < 3) {
    borderColor = 'rgba(211, 47, 47, 0.7)'; // Red (urgent)
  }
  
  return `
    <div class="activity-card" style="border: 2px solid ${borderColor};" data-id="${event.id}">
      <div class="card-header">
        <span class="icon">🏃</span>
        <h3>${event.name}</h3>
      </div>
      <div class="card-body">
        <p>📅 ${formatDate(event.date)} • ${event.time}</p>
        <p>📍 ${event.venue.name}, ${event.venue.city}</p>
        <p>👥 ${registrationCount}/${maxParticipants} registered</p>
        ${daysUntilDeadline < 3 ? '<p class="urgency">⚠️ Closing soon!</p>' : ''}
        <p class="deadline">Registration closes in ${daysUntilDeadline} days</p>
      </div>
      <div class="card-actions">
        <button class="btn-primary" onclick="MarathonManager.openRegistration('${event.id}')">
          Register Now
        </button>
        <button class="icon-btn favorite" onclick="toggleFavorite('${event.id}')">
          ${isFavorited(event.id) ? '★' : '☆'}
        </button>
        <button class="btn-secondary" onclick="toggleFollow('${event.id}')">
          ${isFollowing(event.id) ? 'Following ✓' : 'Follow'}
        </button>
      </div>
    </div>
  `;
}
```

### **CSS Styling Guidelines**

**Follow MIZANO_DESIGN_GUIDE.md strictly:**
```css
/* Marathon Registration Card */
.activity-card.marathon {
  width: calc(100% - 32px);
  min-height: 120px;
  border-radius: 8px;
  border: 2px solid; /* Color set inline based on state */
  padding: 16px;
  margin-bottom: 12px;
  background: #FFFFFF;
  box-shadow: none; /* 2D flat design - no shadows */
}

.activity-card .urgency {
  color: #D32F2F;
  font-weight: 700;
  font-size: 14px;
}

.activity-card .btn-primary {
  background: #1E88E5;
  color: #FFFFFF;
  border: none;
  height: 48px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 700;
  padding: 0 24px;
  cursor: pointer;
}

.activity-card .btn-primary:hover {
  background: #1976D2;
}

.activity-card .icon-btn.favorite {
  font-size: 24px;
  background: transparent;
  border: none;
  color: #FFB300; /* Gold */
  cursor: pointer;
}

/* Filter Panel Styles */
.filter-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60%; /* Level B default */
  background: #FFFFFF;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(100%);
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
}

.filter-panel.active {
  transform: translateY(0);
}

.filter-panel .drag-handle {
  width: 40px;
  height: 4px;
  background: #BDBDBD;
  border-radius: 2px;
  margin: 12px auto;
}

/* Sport Icon Grid */
.sport-icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(44px, 1fr));
  gap: 16px;
  padding: 16px;
}

.sport-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.2s;
}

.sport-icon.active {
  border-color: #1E88E5;
  background: #E3F2FD;
}

/* Time Filter Pills */
.time-pills {
  display: flex;
  gap: 8px;
  padding: 16px;
  overflow-x: auto;
}

.pill-button {
  height: 36px;
  padding: 0 16px;
  border-radius: 18px;
  border: none;
  font-size: 14px;
  font-weight: 400;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s;
}

.pill-button.inactive {
  background: #F5F5F5;
  color: #757575;
}

.pill-button.active {
  background: #1E88E5;
  color: #FFFFFF;
  font-weight: 700;
}
```

---

## 📊 DATA STRUCTURE EXAMPLES

### **Marathon Event Object:**
```json
{
  "id": "marathon_gaborone_2026",
  "type": "marathon",
  "name": "Gaborone City Marathon 2026",
  "description": "Annual city-wide marathon with multiple distance categories",
  "date": "2026-03-15",
  "time": "05:00",
  "duration": 420,
  "venue": {
    "id": "venue_national_stadium",
    "name": "National Stadium",
    "city": "Gaborone",
    "area": "City Center",
    "gps": {
      "lat": -24.6282,
      "lng": 25.9231
    }
  },
  "organizer": {
    "name": "Botswana Athletics Association",
    "type": "association",
    "whatsapp": "+26772123456",
    "facebook": "https://facebook.com/BotswanaAthletics",
    "email": "info@baa.org.bw"
  },
  "registration": {
    "deadline": "2026-03-13T23:59:59Z",
    "maxParticipants": 500,
    "currentCount": 247,
    "fee": 0,
    "currency": "BWP",
    "categories": [
      { "name": "5K Fun Run", "distance": 5, "skillLevel": "Beginner" },
      { "name": "10K Challenge", "distance": 10, "skillLevel": "Intermediate" },
      { "name": "21K Half Marathon", "distance": 21, "skillLevel": "Advanced" },
      { "name": "42K Full Marathon", "distance": 42, "skillLevel": "Expert" }
    ]
  },
  "requirements": [
    "Medical clearance certificate",
    "Proper running shoes",
    "Hydration pack recommended",
    "Must be 16+ years old"
  ],
  "rules": [
    "No headphones on main road sections",
    "Follow marshal instructions",
    "Water stations every 2.5km"
  ],
  "registeredUsers": [
    {
      "userId": "user_001",
      "username": "john_modise",
      "timestamp": "2026-02-10T14:30:00Z",
      "category": "21K Half Marathon",
      "expectedTime": "02:15:00"
    }
  ],
  "followers": ["user_003", "user_004", "user_005"],
  "images": {
    "hero": "./images/events/marathon_gaborone_2026_hero.webp",
    "gallery": [
      "./images/events/marathon_gaborone_2026_1.webp",
      "./images/events/marathon_gaborone_2026_2.webp"
    ]
  },
  "route": {
    "mapUrl": "./maps/marathon_gaborone_2026_route.json",
    "elevation": 120,
    "terrain": "Mixed (asphalt, trail)"
  },
  "weather": {
    "forecast": "18-26°C, Clear skies",
    "conditions": "Good running conditions"
  }
}
```

### **Team/Club Object:**
```json
{
  "id": "team_block3_warriors",
  "type": "football",
  "name": "Block 3 Warriors FC",
  "description": "Youth football team representing Block 3 community",
  "teamType": "competitive",
  "ageCategory": "U17",
  "founded": "2024",
  "colors": {
    "primary": "Blue",
    "secondary": "White"
  },
  "logo": "./images/teams/block3_warriors_logo.webp",
  "location": {
    "village": "Gaborone",
    "area": "Block 3"
  },
  "homeVenue": {
    "id": "venue_block3_sports_complex",
    "name": "Block 3 Sports Complex"
  },
  "practiceSchedule": [
    { "day": "Monday", "time": "17:00-19:00" },
    { "day": "Thursday", "time": "17:00-19:00" }
  ],
  "roster": [
    {
      "userId": "user_001",
      "username": "john_modise",
      "position": "Goalkeeper",
      "jerseyNumber": 1,
      "status": "confirmed",
      "joinedDate": "2024-06-15"
    },
    {
      "userId": "user_002",
      "username": "sarah_kgosi",
      "position": "Defender",
      "jerseyNumber": 3,
      "status": "pending",
      "joinedDate": null
    }
  ],
  "admins": [
    {
      "userId": "user_creator",
      "role": "Owner",
      "permissions": ["edit", "add_remove_players", "create_matches", "manage_finances"]
    },
    {
      "userId": "user_003",
      "role": "Coach",
      "permissions": ["add_remove_players", "create_matches"]
    }
  ],
  "stats": {
    "matchesPlayed": 24,
    "wins": 14,
    "draws": 6,
    "losses": 4
  },
  "social": {
    "facebook": "https://facebook.com/Block3Warriors",
    "whatsapp": "+26772987654"
  },
  "achievements": [
    "Block 3 Youth League Champions 2025",
    "Gaborone Cup Runners-up 2024"
  ]
}
```

### **Match Request Object:**
```json
{
  "id": "match_request_001",
  "type": "match-request",
  "teamId": "team_block3_warriors",
  "teamName": "Block 3 Warriors FC",
  "sport": "Football",
  "matchType": "friendly",
  "dateRange": {
    "start": "2026-03-20",
    "end": "2026-03-25"
  },
  "timePreference": "afternoon",
  "venue": {
    "preference": "home",
    "name": "Block 3 Sports Complex",
    "location": {
      "village": "Gaborone",
      "area": "Block 3"
    }
  },
  "opponentRequirements": {
    "ageCategory": "U17",
    "skillLevel": "similar",
    "maxDistance": 10
  },
  "duration": 90,
  "notes": "Looking for competitive U17 team for friendly practice match",
  "contactWhatsApp": "+26772987654",
  "createdDate": "2026-02-14T10:00:00Z",
  "status": "active",
  "viewCount": 12,
  "interestedTeams": [
    {
      "teamId": "team_broadhurst_blazers",
      "teamName": "Broadhurst Blazers FC",
      "timestamp": "2026-02-14T12:00:00Z",
      "message": "We're available 22-24 March!"
    },
    {
      "teamId": "team_gaborone_west",
      "teamName": "Gaborone West United",
      "timestamp": "2026-02-14T15:00:00Z",
      "message": "Flexible on dates. Let's play!"
    }
  ]
}
```

### **Filter State Object:**
```json
{
  "activity": {
    "selected": ["Football", "Basketball"],
    "skillLevel": null,
    "cost": "any"
  },
  "location": {
    "village": "Gaborone",
    "areas": ["Block 3", "Block 5"],
    "radius": 10
  },
  "time": {
    "range": "This Week",
    "timeOfDay": ["Afternoon", "Evening"],
    "customDate": {
      "start": null,
      "end": null
    }
  },
  "appliedAt": "2026-02-14T16:30:00Z"
}
```

---

## 🎯 SUCCESS CRITERIA FOR PRESENTATION

**Your presentation should demonstrate:**

✅ **Marathon Registration:**
- User can browse marathon events in Drop Field
- User can tap event card to view full details
- User can register for a marathon category (5K/10K/21K/42K)
- Registration counter updates dynamically
- Registered users list displays with usernames and timestamps
- Favorite/Follow buttons work and persist

✅ **Team Creation & Management:**
- User can create a new football team/club
- Team creation form uses +/- collapsible sections
- User can add players via WhatsApp invite (shows deep link)
- User can assign admin roles with permissions
- User can view team detail page with roster

✅ **Match Finding:**
- User can post "Looking for Opponent" match request
- Match request card appears in Drop Field
- Other teams can click "We're Interested!"
- Team owner can view list of interested teams
- Accept match flow creates confirmed match

✅ **Bottom Filter System:**
- User can tap Activity icon to open filter panel (Level B)
- User can select Football icon and see Drop Field update instantly
- User can expand Advanced Filters (Level C) to select "This Week"
- User can tap Places icon and select multiple areas
- User can expand More Filters (Level D) to use date calendar
- Places Filter Bar shows active filters and card tally
- User can clear all filters to reset view

**Quality Checks:**
- All cards follow 2D Minimal Design (flat borders, no shadows)
- Color-coded borders at 70% opacity (Yellow, Green, Blue, etc.)
- WhatsApp deep links formatted correctly: `wa.me/267XXXXXXX`
- Guardian approval triggers for <16 users
- Offline actions queue in IndexedDB
- All forms use +/- collapsible sections
- Touch targets are ≥ 44px
- Loading states and empty states handled gracefully

---

## 📁 FILE STRUCTURE RECOMMENDATIONS

```
/mizano-project/
│
├── index.html                      # Main shell
├── shell.css                       # Global styles (MIZANO_DESIGN_GUIDE.md)
│
├── /js/
│   ├── NavigationController.js     # ✅ Existing
│   ├── DataManager.js              # ✅ Existing
│   ├── CardRenderer.js             # ✅ Existing (UPDATE)
│   ├── StorageManager.js           # ✅ Existing
│   ├── GuardianSafety.js           # ✅ Existing
│   ├── MarathonManager.js          # 🆕 NEW
│   ├── TeamManager.js              # 🆕 NEW
│   ├── FilterManager.js            # 🆕 NEW
│   └── UIComponents.js             # 🆕 NEW (for panels, modals)
│
├── /pages/
│   ├── marathonDetail.html         # 🆕 NEW
│   ├── marathonRegistration.html   # 🆕 NEW
│   ├── teamCreation.html           # 🆕 NEW
│   ├── teamDetail.html             # 🆕 NEW
│   ├── matchRequest.html           # 🆕 NEW
│   └── interestedTeams.html        # 🆕 NEW
│
├── /components/
│   ├── activityFilterPanel.html    # 🆕 NEW
│   ├── placesFilterPanel.html      # 🆕 NEW
│   ├── dateCalendar.html           # 🆕 NEW
│   └── emptyState.html             # 🆕 NEW
│
├── /data/
│   ├── marathons.json              # Parsed from MIZANO_EVENTS_DATABASE_2026.md
│   ├── teams.json                  # Team data
│   ├── matchRequests.json          # Match request data
│   └── filters.json                # Default filter configurations
│
└── /images/
    ├── /events/                    # Marathon hero images (WebP)
    ├── /teams/                     # Team logos (WebP)
    └── /icons/                     # Sport icons, UI icons
```

---

## 🚀 FINAL HANDOFF INSTRUCTIONS

**Dear AI Agent,**

You are now implementing the three **mission-critical features** for Mizano's presentation build:

1. **Marathon Event Registration System**
2. **Club/Team Creation & Management**
3. **Three-Level Bottom Filter System**

**Proceed in this order:**

### **Step 1: Data Setup (30 minutes)**
- Parse `MIZANO_EVENTS_DATABASE_2026.md` and extract marathon events
- Parse `BOTSWANA_2026_EVENTS_DATABASE.md` for tourism marathons
- Create unified `marathons.json` data structure
- Verify data integrity (all required fields present)

### **Step 2: Marathon Feature (90 minutes)**
- Implement Registration-State Card in `CardRenderer.js`
- Create `marathonDetail.html` with 3-tab navigation
- Create `marathonRegistration.html` with +/- collapsible form
- Implement favorite/follow button functionality
- Test registration flow end-to-end
- Test guardian approval trigger for <16 users

### **Step 3: Team Feature (90 minutes)**
- Create `teamCreation.html` multi-step form
- Implement player roster management (3 add methods)
- Create WhatsApp invitation deep links
- Implement admin/role assignment
- Create `teamDetail.html` public view
- Create `matchRequest.html` form
- Implement "Interested Teams" list view
- Test full team creation → match request → acceptance flow

### **Step 4: Filter System (60 minutes)**
- Create `activityFilterPanel.html` (Level B)
- Create `placesFilterPanel.html` (Level B)
- Implement Level C expansion (time filters)
- Implement Level D expansion (date calendar)
- Create `FilterManager.js` to handle filter logic
- Test filter combinations and Drop Field updates
- Implement filter persistence (localStorage)
- Test clear filters functionality

### **Step 5: Integration & Testing (60 minutes)**
- Integrate all features with existing navigation system
- Test offline queueing for all write operations
- Verify WhatsApp deep links work on mobile
- Test guardian approval flows
- Verify filter combinations don't break Drop Field
- Test on 320px width (minimum responsive)
- Run final quality check against MIZANO_DESIGN_GUIDE.md

**Remember:**
- ✅ Vanilla JS only (no frameworks)
- ✅ 2D Minimal Design (flat borders, no shadows)
- ✅ Offline-first (queue in IndexedDB)
- ✅ +/- Collapsible sections for all forms
- ✅ WhatsApp deep links for zero-rated communication
- ✅ Guardian approval for <16 competitive activities
- ✅ WebP images, relative pathing (`./images/`)

**Good luck! Let's make this presentation incredible! 🚀**
