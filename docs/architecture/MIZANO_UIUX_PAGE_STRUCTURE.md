MIZANO_UI/UX_PAGE_STRUCTURE.md

# MIZANO UI/UX PAGE STRUCTURE
**Comprehensive Reference from UI_UX_PAGE_STRUCTURE.xlsx**
**Version 2.5 | Aligned with Project Summary & Page Flow Architecture**

---

## 📑 DOCUMENT PURPOSE

This document translates the `UI_UX_PAGE_STRUCTURE.xlsx` into a fully detailed markdown reference, ensuring alignment with:
- [MIZANO_PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Core platform vision, 7-color system, Event Lab
- [MIZANO_PAGE_FLOW_ARCHITECTURE.md](./MIZANO_PAGE_FLOW_ARCHITECTURE.md) - Navigation patterns, panel behaviors, user journeys

**All content reflects Mizano v2.0 specifications (February 2026).**

---

# PART 1: 16-PANEL SIDE SWIPE NAVIGATION

## Overview
The horizontal carousel (Top Bar, Level 1) contains 16 swipeable panels. **Height: 56px.** Position fixed, content slides beneath. No shadows or gradients (2D Minimal). Users can customize order/visibility in Settings → Navigation & Display.

| Panel # | Panel Name | Content Type | Key Sections | Profile Access | Features |
|:-------:|------------|--------------|--------------|----------------|----------|
| **1** | **Home** | Dashboard Feed | Recommended, Recent, Call-Outs, Trending | Browser: Teasers only<br>All others: Full access | Personalized feed, pull-down location selector |
| **2** | **Sports** | Activity Cards | Team Sports, Individual, Competitive | Browser: View only<br>User+: Full | 7-color badges, Call-Outs, infinite scroll |
| **3** | **Hobbies** | Activity Cards | Creative Arts, Music/Dance, Reading | All profiles: Full | Non-competitive focus, Wishlists |
| **4** | **Leisure** | Activity Cards | Outdoor, Social, Wellness | All profiles: Full | Streams, Weather integration, age-inclusive |
| **5** | **Lessons** | Instructor Cards | Mentors, Classes, Workshops | User+: Book<br>Mentor: Create | Mentor profiles, Skill tracking |
| **6** | **Events** | Event Cards | Community, School, Tournaments, Fundraisers | All: View<br>Creator+: Organize | Sponsor-a-Game, Recaps |
| **7** | **Groups** | Team/Club Directory | Sports Teams, Hobby Clubs, Youth Groups | All: Join requests | Wishlists, Recurring events |
| **8** | **Discover** | Mixed Feed | New Activities, Proposals | All: Explore<br>User+: Vote | Proposal voting, FB gallery links |
| **9** | **Mine** | Personal Dashboard | My Activities, Favorites, Borrow, Sponsorships | User+: Full<br>Browser: Login prompt | History export, Borrow Score |
| **10** | **Community** | Bulletin Board | Bulletin, Lost & Found, Jobs, News Flash | User+: Post<br>All: View | Text-only, Boost P2, Job quick-apply |
| **11** | **Leaderboard** | Rankings | School Leagues, Player Stats, Top Mentors | All: View<br>Player: Own stats | Inter-school rankings, CV builder |
| **12** | **Shopping** | Category Ads | Equipment, Apparel, Health, Tech | All: View<br>Business: Post | WebP only, WhatsApp/FB deep links |
| **13** | **Shops** | Business Listings | Sports Shops, Game Stores, Rental | All: Browse<br>Business: List | Wishlist matching, Verified badge |
| **14** | **Businesses** | Service Providers | Clinics, Gyms, Sports Medicine | All: Browse<br>Business: List | First-aid directory, Job apply |
| **15** | **Schools** | Official Associations | Sports Assoc, Schools, Government | All: View<br>Association: Post | News Flash, Verification badges |
| **16** | **Venues** | Venue Listings | Venue Cards, Booking Info, Facility Types | All: Browse<br>Business: List | Free promotion, 5% booking commission, GPS integration |

### Navigation Behavior
- **Swipe/Tap:** Switch between panels
- **Pull Down on Title Bar:** Dropdown list of all 16 panels for quick jump
- **Active State:** Bold text + 3px blue underline (#1E88E5)
- **Inactive State:** Grey text (#757575)
- **Visual Style:** 2D Minimal (Flat design, no shadows or gradients)
- **User Customization:** Drag-to-reorder in Settings, hide unused panels

---

# PART 2: ACTIVITY PAGE STRUCTURE

*Accessed by tapping any Dynamic Activity Card in Drop Field*

| Section | Default State | Content | Profile Access | Interactive Elements |
|---------|---------------|---------|----------------|---------------------|
| **Header** (Fixed) | Always Visible | Title, State Badge, Type Icon, Location, Creator | All: View | Back, Share, Favorite, Report |
| **Event Details** | Collapsed (+) | Date, Time, Duration, Location, Weather, Recurring pattern | All: View<br>Creator: Edit | Countdown timer, Add to Calendar, Directions |
| **Organizer Info** | Collapsed (+) | Name, Profile type, Events count, Feedback score | All: View | WhatsApp, View FB Page, View Profile |
| **Participants** | **EXPANDED (-)** | Count/Capacity, Roster, Call-outs, Waitlist (syncs every 15min) | Browser: Count only<br>User+: Full | Join/RSVP, Leave, Waitlist, Call-out button |
| **Requirements** | Collapsed (+) | Skill level, Age category, Gender, Cost, Equipment needed | All: View | Borrow equipment, Sponsor equipment |
| **Streams & Media** | Collapsed (+) | Fan submissions, FB Live priority, Thumbnails | User+: View/submit<br>Creator: Moderate | Add Stream, Tap to launch, Report, Low-data tip |
| **Sponsorship** | Collapsed (+) | Goal amount, Progress bar, Sponsor list, 5% commission | All: View<br>User+: Contribute | Sponsor button, Payment, Recognition display |
| **Safety & First-Aid** | Collapsed (+) | First-aid availability, Guardian approval status, Injury log | All: View<br>Guardian: Approve | View Clinic, Rate Referee, Report Injury |
| **Match Stats** | Collapsed (+) | Winner, Match statistics, Referee rating, Spectator count | All: View<br>Player: Own stats | Rate Referee, View Recap, Export stats |
| **Feedback & Recap** | Collapsed (+) | Participant feedback, Organizer notes, Photo links | User+: Submit<br>All: View | Feedback form, View photos, Reactivate (if recurring) |

### Activity State Badges (7-Color Transparent Border System - 70% Opacity)

| State | Badge/Border Color | Meaning | Visual Effect | User Actions | When Displayed |
|-------|--------------------|---------|---------------|--------------|----------------|
| **Live** | Orange #FFA500 | **Active Now** | **Pulsing animation** | Join, View Livestreams, Check-In | Activity currently in progress |
| **Upcoming** | Yellow #FFD700 | **Active Soon** | Static Border | Join, Favorite, WhatsApp | Scheduled start within 24-72 hours |
| **Finished** | Charcoal #505050 | **Passed** | Faded card opacity (85%) | View Recap, Rate Referee, Feedback | After completion |
| **Recruiting** | Green #70AD47 | **Seeking** | Static Border | Join, Respond, WhatsApp | Capacity available / Players needed |
| **Interest** | Blue #4472C4 | **Progress** | Progress bar (if applicable) | Book, View Progress | Training, Lessons, Skill paths |
| **Engagement** | Pink #FF69B4 | **Community** | Static Border | Vote, Comment, Share | Polls, Community votes |
| **Ad/External** | Light Blue #87CEEB | **Official** | Static Border | Learn More, Visit External | Associated News, Sponsored Ads, Announcements |

---

# PART 3: VENUE PAGE STRUCTURE

*Accessed by tapping any Venue Card in Venues panel*

| Section | Default State | Content | Profile Access | Interactive Elements |
|---------|---------------|---------|----------------|---------------------|
| **Header** (Fixed) | Always Visible | Venue Name, Venue Types Count, Activities Count, Area/Neighbourhood | All: View | Back, Share, Favorite, Report |
| **Venue Image** | Collapsed (+) | Single featured image (WebP, 16:9 aspect ratio) | All: View | Tap to expand fullscreen |
| **Description** | Collapsed (+) | Venue details, amenities, capacity | All: View | Expandable text |
| **Venue Types & Activities** | **EXPANDED (-)** | List of facility types (open field, courts, halls) and supported activities/sports | All: View | Filter by type |
| **Location & Directions** | Collapsed (+) | Area/Neighbourhood, GPS coordinates, offline map integration | All: View | Directions button (GPS), View on Map |
| **Contact Information** | **EXPANDED (-)** | Call, WhatsApp, Facebook interactive buttons | All: View<br>Business: Edit | Deep links to external apps |
| **Booking Information** | Collapsed (+) | Pricing, availability, booking process (external via WhatsApp/Facebook) | All: View<br>Business: Manage | Book Now button (WhatsApp deep link) |
| **Reviews & Ratings** | Collapsed (+) | User feedback, venue ratings (future feature) | All: View<br>User+: Submit | Rating system (planned) |

### Venue Card Design (Venues Panel)

**Collapsed State:**
```
┌────────────────────────────────────────────────────┐
│ [Border: Very Light Grey #E0E0E0 at 75% opacity]  │
│                                                    │
│  Venue Name (14pt Bold, Charcoal)                 │
│  # Venue Types • # Activities (11pt Grey)         │
│                                                    │
└────────────────────────────────────────────────────┘
```

**Expanded State:**
```
┌────────────────────────────────────────────────────┐
│ [Border: Very Light Grey #E0E0E0 at 75% opacity]  │
│                                                    │
│  [Venue Image - 16:9 aspect ratio]                │
│                                                    │
│  Venue Name (clickable with GPS) (-)              │
│  Description text...                              │
│                                                    │
│  Area/Neighbourhood: Block 3, Gaborone            │
│                                                    │
│  Contacts (-)                                      │
│  [📞 Call] [💬 WhatsApp] [👥 Facebook]            │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Venue Filtering

Venues are automatically filtered by the user's selected location (village/town/city and area/neighbourhood) from the Places Filter system. No separate area/neighbourhood display is needed on the card since the filter ensures all displayed venues are from the selected location.

**Filter Integration:**
- Uses existing Level 1 Filters (Village/Town/City, Area/Neighbourhood)
- Additional venue-specific filters in Level 3:
  - Venue Type (Open Field, Basketball Court, Soccer Field, Hall, etc.)
  - Amenities (Floodlights, Changing Rooms, Parking, etc.)
  - Price Range (Free, P1-50/hr, P51-200/hr, P201+/hr)
  - Availability (Available Now, Available Today, Available This Week)

### Venue Booking Flow

| Step | Action | Navigation Reference |
|------|--------|---------------------|
| 1 | Browse Venues panel | Top Bar → Venues |
| 2 | Apply location filter | Level 1: Village/Town/City + Area/Neighbourhood |
| 3 | View filtered venues | Drop Field updates with Venue Cards |
| 4 | Tap Venue Card | Navigates to Venue Page |
| 5 | Review venue details | Scroll through sections |
| 6 | Tap "Book Now" or WhatsApp button | Opens WhatsApp with pre-filled message |
| 7 | Confirm booking via WhatsApp | External conversation with venue owner |
| 8 | Venue owner confirms | Booking tracked in system (5% commission) |

**Booking Confirmation Workflow:**
- User initiates booking via WhatsApp (external to app)
- Venue owner has 15 minutes to confirm or cancel
- If not cancelled within 15 minutes, booking is automatically confirmed
- Confirmed bookings sync to system and trigger 5% commission calculation
- Booking appears in venue owner's Book Keeping section (Content Manager)

**Monetization:**
- **Free Promotion:** All venues can list for free on the Venues panel
- **5% Commission:** Mizano takes 5% of each confirmed booking fee
- Commission is tracked in `billing_ledger` table and visible in Content Manager → Billing section

---

# PART 4: SUPER SEARCH & FILTER SYSTEM

*3-Level hierarchical discovery with rising search field*

| Level | Filter | Options | Default | Behavior |
|-------|--------|---------|---------|----------|
| **SEARCH FIELD** | Grey star (left) | Toggle favorites view | Grey | Tap → gold = viewing favorites |
| | Placeholder | 'Type to search...' | Light grey | Disappears on focus |
| | 'Filter' button (right) | Reveals Level 1 filters | Light grey bg | Taps to show filter panel |
| | White panel | Background | Rises from bottom | Swipe-down dismisses |
| | | | | |
| **LEVEL 1** (Auto-appears) | Village/Town/City | Gaborone, Molepolole, Francistown, etc. | User default | Shows "# activities in [Location]" |
| | Area/Neighbourhood | Block 3, Broadhurst, All | All | Filtered by City selection |
| | Reset | Clear all filters | N/A | Cherry orange (#FF6F00), far right |
| | | | | |
| **LEVEL 2** (Appears when L1 tapped) | Type | Soccer, Chess, Volleyball, Hiking, Running, etc. | All | Multi-select, panel-filtered |
| | Date | Month, Week 1-4, Weekend, Calendar picker | Current month | Calendar opens full month selector |
| | | | | |
| **LEVEL 3** (Pull up manually) | Time | Morning (6-12), Afternoon (12-18), Evening (18-24) | All | Multi-select |
| | Price | Free, P1-50, P51-200, P201+ | All | Multi-select |
| | Duration | <1hr, 1-2hrs, 2-4hrs, 4+ hrs | All | Multi-select |
| | Indoor/Outdoor | Indoor, Outdoor, Both | All | Single select |
| | Group Type | Family, Kids, Teens, Adults, Seniors, Mixed | All | Multi-select |
| | Has Streams | Yes / No | All | Toggle, prioritizes FB Live |
| | Has Call-Outs | Yes / No | All | Toggle, shows activities needing players |
| | Competitive Level | Casual, Competitive, Elite | All | Multi-select (Sports only) |

### Search Interface Behavior
- **Rising Field:** Pushes Drop Field content up, not overlapping
- **Auto-Fill:** Populates after 2 characters typed
- **Recent Searches:** Saved locally (max 10)
- **Results Categories:** Matches, Lessons, Clubs, Venues, People
- **Back Arrow:** Returns to previous Drop Field view

---

# PART 5: SETTINGS MENU STRUCTURE

*6 collapsible (+/-) sections, accessed via Mizano logo tap*

| Section | Sub-Items | Profile Access | Notes |
|---------|-----------|----------------|-------|
| **1. Account & Profile** | Edit Profile, Player Bio & Stats, Guardian Dashboard, Switch to Mentor/Creator (text buttons), Delete Account | User+: Full<br>Guardian: Dashboard<br>Player: Bio | 30-day deletion grace period, Upgrade forms with validation |
| **2. My Activity Hub** | Borrow Score & History, My Wishlist, Match History (export PDF P5-10), My Sponsorships (given/received) | User+: Borrow<br>Player: Match<br>Creator/Club: Sponsorships | PDF = Sports CV with stats, Progress bars for wishlists |
| **3. Navigation & Display** | Reorder Swipe Panels (drag-to-reorder), Default Location, Dark Mode Toggle, Data Saver Mode (text-only, no images) | User+: Full<br>Browser: View only | Location pre-fills search, Data Saver = 80% data reduction |
| **4. Data & Offline Sync** | Offline Map Tiles (1MB Gaborone neighborhoods), Manual Sync Now, Clear Cache | User+: Full<br>Browser: N/A | Map expires after 30 days, Shows 'Last synced: X min ago' |
| **5. Community & Safety** | **Responsible Gambling Awareness** (HARD SWITCH, default OFF), Mentorship Visibility (discoverable toggle), First-Aid Directory (nearby clinics), Report a Problem | All: Gambling toggle<br>Mentor: Visibility<br>All: First-Aid/Report | Gambling shows confirmation dialog, First-Aid sorts by GPS proximity |
| **6. About & Legal** | About Us, Terms of Service, Privacy Policy, Version Info (e.g., "v2.0 - Gaborone"), **Guardian Security Log** | All: Legal docs<br>Guardian: Security log | Guardian Log: Timestamp, ViewerID, ViewerType, View Purpose |

### Guardian-Specific Section (Within Account & Profile)
- **Security Log:** Shows every Creator/Association view of child's profile
- **AcademicAlert Toggle:** Pause child's match joins if grades low
- **Linked Minors:** Quick access to each child's dashboard

---

# PART 6: PERSISTENT UI ELEMENTS

*Fixed toolbars available on all 16 swipe panels*

| Element | Location | Behavior | Profile Access | Notes |
|---------|----------|----------|----------------|-------|
| **Three-Stripe Menu (☰)** | Bottom-left corner | Opens slide-out navigation menu (Settings, Profile, Manager, Logout) | All profiles | Slides from left, dims background, includes new Manager option |
| **Search Icon (🔍)** | Bottom-left (second from left) | Rising search field with 3-level filters | Browser: Limited view<br>All others: Full | Vector icon, 24×24px |
| **Plus (+) Button** | Bottom-left (third from left) | Quick-create menu: Activity, Wishlist, Bulletin, Stream | Browser: Disabled (grey)<br>User+: Context-aware | Options change based on current panel |
| **Back Arrow (←)** | Top-right corner | Returns to previous panel or closes modal | All profiles | Only visible when deeper than Homepage |
| **Notification Bell (🔔)** | Top-right corner (right of Back) | Drops down white panel: Call-Outs, Updates, Rosters, Streams, Sponsorships, Guardian alerts, Injuries | User+: Full<br>Browser: Not visible | Badge shows unread (max "+888"), Swipe-down to dismiss |
| **Panel Title Bar** | Top-center | Dark text (current panel), Grey text (adjacent panels) | All profiles | Fixed position, content scrolls under, gradient edges indicate scrollability, supports 16 panels |

### Notification Panel Content Types
1. **Call-Outs:** "Block 3 needs a Goalie right now!"
2. **Updates:** Score changes, match milestones
3. **Rosters:** New join requests (for Creators)
4. **Streams:** "Facebook Live started"
5. **Sponsorships:** "New sponsor contributed P200"
6. **Guardian:** Approval requests, AcademicAlert triggers
7. **Injuries:** Incident reports from matches

---

# PART 7: NAVIGATION FLOWS & USER JOURNEYS

*Step-by-step wireflows for key interactions (aligned with Page Flow Architecture)*

---

### Flow 1: Join Activity (Standard User)

| Step | Action | Navigation Reference |
|------|--------|---------------------|
| 1 | Swipe to Sports panel | Top Bar carousel → Sports |
| 2 | Search 'soccer Block 3' | Tap Search icon → Type query |
| 3 | Select Block 3 filter | Places Filter Bar → Location dropdown |
| 4 | View filtered results | Drop Field updates automatically |
| 5 | Tap Active Soon card (Orange border) | Navigates to Activity Detail Page |
| 6 | Scroll to Participants section | (Expanded by default) |
| 7 | Tap Join button | Below roster list |
| 8 | Confirm join | Modal dialog appears |
| 9 | Added to roster | Confirmation message, WhatsApp group invite sent |

**Branch Conditions:**
- **Browser (unregistered):** Login prompt appears
- **U16 User:** Routes to Guardian Approval Request instead
- **Full Capacity:** Shows Waitlist option

---

### Flow 2: Create Event (Creator Profile)

| Step | Action | Navigation Reference |
|------|--------|---------------------|
| 1 | Tap + button | Bottom Menu → + Icon |
| 2 | Select 'Create Event/Match' | Add Menu Overlay |
| 3 | Enter Event Lab | Single-page scrollable workspace |
| 4 | Fill Core Identity (required) | Section 1: Title, Sport, Organization Type |
| 5 | Sport selection auto-expands Game Rules | Section 2: Template-driven rules |
| 6 | Set Entry Fee (if any) | Section 3: Mizano Fund auto-expands |
| 7 | Configure Recruitment settings | Section 4 (Collapsed) |
| 8 | Set Format & Fixtures | Section 5 (Collapsed) |
| 9 | Tap Publish button | Sticky Header (top) |
| 10 | Confirm publish | Activity Page created (Public View) |
| 11 | Navigate to new Activity Page | Auto-redirect |

**Offline Behavior:**
- Form auto-saves locally every 30 seconds
- Shows "Offline - Saved locally" status
- Queues for sync when online

---

### Flow 3: Guardian Approves Child Join

| Step | Action | Navigation Reference |
|------|--------|---------------------|
| 1 | Receive push notification | "[Child] wants to join U13 Soccer" |
| 2 | Tap notification | Opens Guardian Dashboard directly |
| 3 | View Approval Queue | Guardian Dashboard → Pending Approvals tab |
| 4 | Tap specific request | Shows Activity Page preview (read-only) |
| 5 | Review details | Date, Location, Requirements, Organizer |
| 6 | Tap Approve button | Bottom of preview |
| 7 | Confirm approval | Modal dialog |
| 8 | Child added to roster | Confirmation screen |
| 9 | Child receives WhatsApp link | Automated notification |

**Alternative Path:**
- Guardian can also access via Settings → Account & Profile → Guardian Dashboard
- All approvals logged in Security Log with timestamp

---

### Flow 4: Sponsor-a-Game (Business Profile)

| Step | Action | Navigation Reference |
|------|--------|---------------------|
| 1 | Browse Events panel | Top Bar → Events |
| 2 | Identify Pending activity | Yellow border + Progress bar (e.g., "P200/500") |
| 3 | Tap activity card | Activity Detail Page |
| 4 | Scroll to Sponsorship section | Collapsed by default, expand |
| 5 | Tap 'Sponsor This Event' button | Opens sponsorship form |
| 6 | Select contribution amount | P50, P100, P200, or custom |
| 7 | Choose payment method | Orange Money, MyZaka, BTC Smega |
| 8 | Confirm payment | Modal with 5% commission shown (e.g., P10 fee on P200) |
| 9 | Payment processes | Success/failure screen |
| 10 | Recognition badge appears | Activity Page → Sponsors tab updated |

**Village Waiver:**
- If event location = rural village, 5% fee automatically waived
- Still shows recognition badge

---

### Flow 5: Offline Equipment Borrow (Game Cube)

| Step | Action | Navigation Reference |
|------|--------|---------------------|
| 1 | Player at Block 3 Game Cube (no Wi-Fi) | Physical location |
| 2 | Open Mizano app | Offline mode active |
| 3 | Navigate to Mine panel | Top Bar → Mine |
| 4 | Select 'Borrow History' | My Activity Hub section |
| 5 | Tap 'Check Out Equipment' | Bottom of Borrow History |
| 6 | Staff scans QR code on equipment | Bluetooth alternative available |
| 7 | Confirm borrow | Saved to IndexedDB locally |
| 8 | Use equipment for match | Physical activity |
| 9 | Return to Game Cube after match | Physical return |
| 10 | Staff scans QR code again | Verifies return |
| 11 | Both parties rate each other | 1-5 stars (dual rating) |
| 12 | Damage check by Staff | Optional |
| 13 | Transaction saved locally | Queued for sync |
| 14 | When Wi-Fi available: Auto-syncs | Updates Borrow Score |

**Borrow Score Calculation:**
- Average of all borrower ratings (both parties)
- Low score (<3.0) = restricted access
- Disputes can be escalated to Staff override

---

### Flow 6: Three-Way Handshake (Guardian-School-Mizano)

| Step | Action | Navigation Reference |
|------|--------|---------------------|
| 1 | School bulk-uploads students | Educational Institution dashboard |
| 2 | Each student gets ProfileID | System generates |
| 3 | Guardian receives notification | Push: "[School] added [Child]" |
| 4 | Tap notification | Opens Guardian Dashboard |
| 5 | View Pending Approvals | Approval Queue tab |
| 6 | Tap specific request | School profile preview |
| 7 | Verify school information | Name, Logo, Contact, Verification badge |
| 8 | Tap 'Approve Link' | Bottom of preview |
| 9 | Confirmation modal | "Link [School] with [Child]?" |
| 10 | Confirm | Three-Way Handshake complete |
| 11 | School can now log student stats | Limited to sports data only |
| 12 | Student profile updates | Shows "U13 Soccer Captain - [School]" |
| 13 | Security Log records | Every school view logged |

**Guardian Rights:**
- Can revoke link at any time
- AcademicAlert toggle available post-handshake
- Receives notification for every school view of child's profile

---

### Flow 7: Lost & Found Boost

| Step | Action | Navigation Reference |
|------|--------|---------------------|
| 1 | Tap + button | Bottom Menu → + Icon |
| 2 | Select 'Post to Bulletin' | Add Menu Overlay |
| 3 | Choose Category: Lost & Found | Bulletin Editor dropdown |
| 4 | Upload photo (optional) | WebP compression auto-applied |
| 5 | Enter description | 200 character limit |
| 6 | Set location found | Map selector |
| 7 | Tap Post | Bulletin Feed updates |
| 8 | (Optional) Tap 'Boost' on own post | P2.00 payment |
| 9 | Confirm payment | MTN Mobile Money/Orange Money |
| 10 | Area-wide notification sent | Push to users in same GC area |

**Boost Effect:**
- Sends notification to all users within selected village/town
- Increases visibility for 24 hours
- Non-boosted posts appear only in Bulletin Feed

---

### Flow 8: Export Sports CV (Player)

| Step | Action | Navigation Reference |
|------|--------|---------------------|
| 1 | Navigate to Mine panel | Top Bar → Mine |
| 2 | Select 'Match History' | My Activity Hub section |
| 3 | Tap 'Export PDF' button | Bottom of Match History |
| 4 | Preview PDF | Shows: Name, School, Achievements, Stats, Health notes |
| 5 | Confirm payment | P5-10 (village: free) |
| 6 | Select payment method | If fee applies |
| 7 | PDF generates | 2-3 seconds |
| 8 | Download or Share | Native share sheet (WhatsApp, Email) |

**PDF Contents:**
- Personal information (name, age, village)
- Sports played with key stats
- Achievements (trophies, recognitions)
- Match history summary
- Fitness/health metrics (device-only data excluded)
- Mentor/Coach endorsements (if any)
- School representation

---

### Flow 9: Rate Referee (Post-Match)

| Step | Action | Navigation Reference |
|------|--------|---------------------|
| 1 | After match ends | Activity State → Passed (Grey) |
| 2 | Open Activity Detail Page | Tap finished match card |
| 3 | Navigate to Match Stats tab | Tab navigation |
| 4 | Scroll to Referee Rating | Bottom of stats section |
| 5 | Tap star rating (1-5) | Interactive stars |
| 6 | Add optional comment | Text area (100 chars) |
| 7 | Submit | Rating saved |
| 8 | Referee's average updates | Affects future assignments |

**Integrity Measures:**
- Only confirmed participants can rate
- One rating per user per match
- Ratings visible to event organizers only (not public)

---

### Flow 10: Event Lab - Clone Competition

| Step | Action | Navigation Reference |
|------|--------|---------------------|
| 1 | Open existing competition | Event Lab (edit mode) |
| 2 | Tap Floating Action Menu (⚡) | Bottom-right corner |
| 3 | Select 'Clone Competition' | Menu option |
| 4 | System creates duplicate draft | New title: "[Original] (Copy)" |
| 5 | Edit core details | Update dates, venue, etc. |
| 6 | Modify any sections | All settings copied from original |
| 7 | Publish new competition | Separate from original |
| 8 | Original remains unchanged | Archived or active as before |

**Use Cases:**
- Recurring tournaments (annual events)
- Template-based competition creation
- Adapting existing formats for new age groups

---

### Flow 11: Data Saver Mode Activation

| Step | Action | Navigation Reference |
|------|--------|---------------------|
| 1 | Tap Mizano Logo | Top Bar left |
| 2 | Open Settings Menu | Full-screen overlay |
| 3 | Navigate to 'Data & Offline Sync' | Section 4 |
| 4 | Toggle 'Data Saver Mode' | Switch to ON |
| 5 | Confirm changes | Applies immediately |
| 6 | Return to Homepage | Settings closes |
| 7 | All images replaced with text placeholders | WebP images disabled |
| 8 | Icons reduced to vector outlines | Minimal mode |

**Effects:**
- Text-only cards (no images)
- WebP compression set to maximum (if any images load)
- Map tiles disabled (text directions only)
- Estimated 80% data reduction

---

### Flow 12: Report Inappropriate Content

| Step | Action | Navigation Reference |
|------|--------|---------------------|
| 1 | Locate problematic content | Any card, comment, or profile |
| 2 | Tap three-dot menu (⁝) | Top-right of card/item |
| 3 | Select 'Report' | Context menu |
| 4 | Choose reason | Dropdown: Spam, Harassment, False info, Other |
| 5 | Add details (optional) | Text area |
| 6 | Submit report | Sent to Staff moderation queue |
| 7 | Confirmation received | "Report submitted. Thank you." |
| 8 | Staff reviews within 24hrs | Actions taken if warranted |

**Anonymous Reporting:**
- Reporter identity not shared with reported user
- Staff can follow up if contact info provided

---

### Flow 13: Mentorship Discovery

| Step | Action | Navigation Reference |
|------|--------|---------------------|
| 1 | Navigate to Lessons panel | Top Bar → Lessons |
| 2 | Tap filter icon | Level B: Activity Filter |
| 3 | Select 'Mentors only' | Filter option |
| 4 | Browse mentor cards | Display: Name, Expertise, Rating, Availability |
| 5 | Tap mentor card | Mentor Profile page |
| 6 | Review credentials | Certifications, experience, reviews |
| 7 | Tap 'Contact Mentor' | WhatsApp deep link |
| 8 | Pre-filled message opens | "Hi, I'm interested in your [skill] mentorship..." |
| 9 | Send message | WhatsApp app opens |

**Mentor Visibility Settings:**
- Mentors control discoverability in Settings → Community & Safety
- Can appear in search or remain hidden
- Availability calendar visible if shared

---

### Flow 14: School League Registration (Institution)

| Step | Action | Navigation Reference |
|------|--------|---------------------|
| 1 | Institution Admin logs in | Educational Institution profile |
| 2 | Navigate to Mine panel | Top Bar → Mine |
| 3 | Select 'School Dashboard' | Institution-specific view |
| 4 | Choose 'Create League' | Competition management section |
| 5 | Enter Event Lab | Pre-filled with school templates |
| 6 | Select 'Inter-House' or 'Inter-School' | Format selection |
| 7 | Import students by class/grade | Bulk upload from CSV or manual |
| 8 | Set eligibility rules | Age, grade, house color |
| 9 | Generate fixtures | Auto-create match schedule |
| 10 | Publish league | Appears in Events panel with School badge |
| 11 | Notifications sent to students | Via Guardian-linked profiles |

**School-Specific Features:**
- Bulk student management
- Teacher/Coach sub-profiles
- AcademicAlert integration
- National Leaderboard qualification

---

### Flow 15: Betting Awareness Opt-In

| Step | Action | Navigation Reference |
|------|--------|---------------------|
| 1 | Tap Mizano Logo | Top Bar left |
| 2 | Open Settings Menu | Full-screen overlay |
| 3 | Navigate to 'Community & Safety' | Section 5 |
| 4 | Find 'Responsible Gambling Awareness' | Hard switch, default OFF |
| 5 | Tap toggle to ON | Warning dialog appears |
| 6 | Read disclaimer | "Mizano does not facilitate gambling..." |
| 7 | Confirm opt-in | Tap 'I Understand' |
| 8 | Toggle stays ON | Settings saved |
| 9 | Return to Homepage | Now shows gambling education content |

**What Changes:**
- Educational materials appear in Discover panel
- Sponsored events from betting companies (flagged)
- Gambling Authority campaigns visible
- **Never:** In-app betting, odds, affiliate links

**Audit Trail:**
- Opt-in status stored locally and server-side (anonymized)
- Staff can audit opt-in counts for compliance reporting

---

## ✅ CROSS-REFERENCE VERIFICATION

| Spreadsheet Section | Aligned With | Status |
|--------------------|--------------|--------|
| 16 Swipe Panels | Project Summary: Navigation Structure | ✅ Complete |
| Activity Page | Project Summary: Activity Detail Page | ✅ Complete |
| Search & Filters | Design Guide: Search Interface | ✅ Complete |
| Settings Menu | Project Summary: Settings Menu | ✅ Complete |
| Persistent UI | Design Guide: Global Navigation | ✅ Complete |
| Activity States | Project Summary: 7-Color System | ✅ Complete |
| Navigation Flows | Page Flow Architecture: All flows | ✅ Complete |

---

**Document Version:** 2.0  
**Last Updated:** February 15, 2026  
**Source File:** UI_UX_PAGE_STRUCTURE.xlsx  
**Cross-References:** 
- MIZANO_PROJECT_SUMMARY.md
- MIZANO_DESIGN_GUIDE.md  
- MIZANO_PAGE_FLOW_ARCHITECTURE.md

**Maintained By:** Mizano Product Team  
**Next Review:** Monthly (aligned with sprint planning)