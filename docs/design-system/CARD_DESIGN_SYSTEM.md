# MIZANO CARD DESIGN SYSTEM
**Version 1.5 | February 2026**  
**Platform:** Mizano - Botswana Community Sports & Activities App

---

## DESIGN PHILOSOPHY

**"Low-Data, High-Scan: Visual Hierarchy Through Color Psychology"**

Mizano's card system uses **border-light transparency (70%)** to create an intuitive "Drop Field" where users can instantly scan for what matters most. Each card type serves a specific purpose in the activity lifecycle, business directory, or community engagement flow.

### Core Design Principles
1. **Horizontal Rectangular Format:** All cards are landscape-oriented for thumb-friendly scrolling
2. **Border Color = Status/Type Signal:** Users scan border colors before reading text
3. **Minimalist Content:** Text-heavy, low-data design (WebP images <200KB)
4. **Offline-First:** All cards cached in IndexedDB; sync every 15 minutes
5. **WhatsApp/Facebook Integration:** Deep links for zero-rated data communication
6. **Botswana Context:** Local examples, Setswana language support, cultural relevance

---

## THE 7-COLOR SYSTEM

### Color Psychology & Usage Matrix

| Color | Hex Code | Meaning | Status/Type | Psychological Trigger | When Used |
|-------|----------|---------|-------------|----------------------|-----------|
| **Orange** | `#FFA500` (70% opacity) | **Live Now** | Activity State | Urgency, immediate action, "happening right now" | Standard Match Cards currently in progress (e.g., Zebras vs Township Rollers - LIVE) |
| **Green** | `#70AD47` (70% opacity) | **Recruiting** | Activity State | Growth, opportunity, "join us", openness | Match-Making Cards needing players/participants (e.g., "Need 2 Defenders for Sunday Social Football") |
| **Charcoal** | `#505050` (70% opacity) | **Finished** | Activity State | Neutrality, completion, archive | Standard Match Cards that have ended (time replaced by score: "2 - 1") |
| **Blue** | `#4472C4` (70% opacity) | **Interest** | Activity Type | Trust, learning, personal growth, calm focus | Training/Lesson Progress Cards, Standard Lesson Cards (e.g., "Setswana Language Basics - Lesson 4 of 5") |
| **Yellow** | `#FFD700` (70% opacity) | **Upcoming** | Activity State | Anticipation, urgency (deadline), preparation | Registration-State Cards, upcoming matches within 24-72 hours (e.g., "Gaborone Marathon - Entries Closing Tomorrow") |
| **Pink** | `#FF69B4` (70% opacity) | **Engagement** | Activity Type | Social interaction, voting, community voice | Quick Poll/Vote Cards (e.g., "Who is your MVP?") - transitions to Charcoal after voting |
| **Light Blue** | `#87CEEB` (70% opacity) | **Ad/External** | Activity Type | Platform info, official announcements, brand trust | News Flash Cards, Event Invite/Ad Cards (e.g., "BFA UPDATES: Mogogi Gabonamong clinic in Gaborone") |

### Color Application Rules

**Sports Panel (Soccer, Netball, Basketball, etc.):**
- Orange = Live matches (pulsing border effect)
- Yellow = Upcoming matches (static border)
- Charcoal = Finished matches (faded border)
- Green = Match-making ("Need 1 Goalie at Block 3 Hub right now!")

**Hobbies Panel (Chess, Dance, Language, etc.):**
- Blue = Lesson cards, progress cards
- Yellow = Registration deadlines (e.g., "Maitisong Poetry Slam - Register by Friday")
- Green = Recruiting (e.g., "Gaborone Chess Masters seeking beginners")

**Leisure Panel (Hiking, Book Clubs, Community Events):**
- Yellow = Upcoming hikes, meetups
- Green = "Join our Sunday book club - 2 spots left"
- Pink = Community polls (e.g., "Best hiking spot in Gaborone?")

**Business Panel (Shops, Clinics, Services):**
- Light Blue = Category cards (directory toggles)
- White/Grey = Contact cards (business listings)
- Light Blue = Sponsored ads (Image Cards)

---

## CARD TYPE SPECIFICATIONS (11 Total)

### 1. STANDARD MATCH CARD (Orange/Yellow/Charcoal Border)

**Purpose:** Display team-based competitive matches (soccer, netball, basketball, volleyball, rugby, cricket)

**Visual Layout:**
```
┌───────────────────────────────────────────────────┐
│ [Border: Orange (Live) / Yellow (Upcoming) / Charcoal (Finished)]
│                                                   │
│  Team Name 1    [Logo1]  TIME/SCORE  [Logo2]  Team Name 2
│  (Left align)            DATE/VENUE           (Right align)
│                          (Center)                 │
│                                                   │
└───────────────────────────────────────────────────┘
```

**Content Structure:**

| Element | Position | Typography | Data Source |
|---------|----------|------------|-------------|
| Team Name (Left) | Far Left, vertical center | 14pt Bold, Charcoal `#505050` | `ActivityPage.Participants[0].TeamName` |
| Team Logo (Left) | Left-center, 40×40px | Image (WebP) | `ActivityPage.Participants[0].TeamLogo` |
| Time/Score (Center Top) | Horizontal center, top | **18pt Bold, Blue `#4472C4`** (time) or **22pt Bold, Orange `#FFA500`** (live score) or **18pt Bold, Charcoal** (final score) | `ActivityPage.StartTime` or `ActivityPage.MatchStatsJSON.Score` |
| Date/Venue (Center Bottom) | Horizontal center, bottom | 11pt Regular, Grey `#A6A6A6` | `ActivityPage.StartDate` + `ActivityPage.VenueName` |
| Team Logo (Right) | Right-center, 40×40px | Image (WebP) | `ActivityPage.Participants[1].TeamLogo` |
| Team Name (Right) | Far Right, vertical center | 14pt Bold, Charcoal | `ActivityPage.Participants[1].TeamName` |

**State Transitions:**

1. **Upcoming (Yellow Border):**
   - **Trigger:** `ActivityState = "Active Soon"` AND `StartTime` within 24-72 hours
   - **Center Display:** `"23:30"` (time) + `"28 Aug"` (date)
   - **Example:** "Getafe vs Alaves - 23:30, 28 Aug - National Stadium"

2. **Live (Orange Border with Pulsing Effect):**
   - **Trigger:** `ActivityState = "Active Now"`
   - **Center Display:** Live score (e.g., `"2 - 1"`) with minute tracker (e.g., `"63'"`), updates via 15-min sync
   - **Animation:** Border pulses opacity 70% → 50% → 70% (1-second cycle)
   - **Example:** "Zebras vs Township Rollers - **2 - 1** (63') - National Stadium"

3. **Finished (Charcoal Border, Faded):**
   - **Trigger:** `ActivityState = "Passed"`
   - **Center Display:** Final score (e.g., `"2 - 1 (FT)"`)
   - **Opacity:** Entire card fades to 85%
   - **Tap Action:** Navigate to Activity Page → "Recap & Stats" section auto-expanded
   - **Example:** "GU vs Township Rollers - **2 - 1 (FT)** - University Stadium"

**Adaptations for Non-Team Sports:**

| Sport | Left Side | Center | Right Side | Example |
|-------|-----------|--------|------------|---------|
| **Chess** | Player 1 Name + Rating | Time + Date | Player 2 Name + Rating | "Refilwe Moatlhodi (1850) vs Thato Molefe (1620) - 14:00, 15 Feb" |
| **Athletics** | Event Name | Time + Venue | Age Group | "100m Sprint - 10:30, National Stadium - U15 Boys" |
| **Swimming** | Event Name | Time + Pool | Heat/Lane | "50m Freestyle - 09:00, UB Pool - Heat 3, Lane 4" |

**Botswana-Specific Examples:**

```json
{
  "card_type": "Standard Match Card",
  "border_color": "#FFA500",
  "border_opacity": 0.7,
  "state": "Active Now",
  "left_team": {
    "name": "Botswana Zebras",
    "logo": "zebras_crest.webp"
  },
  "right_team": {
    "name": "Township Rollers",
    "logo": "rollers_crest.webp"
  },
  "center_top": "2 - 1 (67')",
  "center_bottom": "National Stadium, Gaborone",
  "animation": "pulse_border",
  "tap_action": "Navigate to Activity Page ACT-BW-GAB-045"
}
```

---

### 2. REGISTRATION-STATE CARD (Yellow Border)

**Purpose:** Highlight upcoming events with registration deadlines (marathons, tournaments, clinics, workshops)

**Visual Layout:**
```
┌───────────────────────────────────────────────────┐
│ [Border: Yellow 70% opacity]                      │
│                                                   │
│  EVENT NAME        ACTIVITY TYPE • DATE      URGENCY BADGE
│  (Left, Bold)      (Center, Grey)            (Right, Yellow bg)
│                                                   │
└───────────────────────────────────────────────────┘
```

**Content Structure:**

| Element | Position | Typography | Data Source |
|---------|----------|------------|-------------|
| Event Name | Far Left | 16pt Bold, Charcoal | `ActivityPage.EventTitle` |
| Activity Type + Date | Center | 12pt Regular, Grey, separated by `•` | `ActivityPage.SpecificSport` + `ActivityPage.StartDate` |
| Urgency Badge | Far Right | 11pt Bold on Yellow `#FFD700` rounded rectangle | Calculated from `ActivityPage.StartDate - Now` |

**Urgency Badge Logic:**

| Time Until Event | Badge Text | Badge Background | Example |
|------------------|-----------|------------------|---------|
| **<24 hours** | "Closing Today!" | Red `#FF0000`, White text | "Entries Closing Today!" |
| **1-2 days** | "Closing Tomorrow" | Orange `#FFA500`, White text | "Entries Closing Tomorrow" |
| **3-7 days** | "Closing in X Days" | Yellow `#FFD700`, Charcoal text | "Closing in 5 Days" |
| **>7 days** | "Open" | Green `#70AD47`, White text | "Open Registration" |

**Botswana Examples:**

```json
{
  "card_type": "Registration-State Card",
  "border_color": "#FFD700",
  "border_opacity": 0.7,
  "event_name": "Diacore Gaborone Marathon",
  "activity_type": "10km Fun Run",
  "start_date": "2026-04-27",
  "urgency_badge": {
    "text": "Closing Tomorrow",
    "background": "#FFA500",
    "text_color": "#FFFFFF"
  },
  "tap_action": "Navigate to Activity Page ACT-BW-GAB-078"
}
```

**Additional Examples:**
- "Maitisong Festival Poetry Slam • Spoken Word • 20 Feb → Closing in 3 Days"
- "BFA U15 Soccer Development Clinic • Francistown • 12 Mar → Open Registration"
- "Northside Primary Inter-House Athletics • All Ages • 8 May → Closing Today!"

---

### 3. MATCH-MAKING CARD (Green Border)

**Purpose:** Community call-outs for recruiting players, volunteers, or team members

**Visual Layout:**
```
┌───────────────────────────────────────────────────┐
│ [Border: Green 70% opacity]                       │
│                                                   │
│  "Recruiting"      SPORT • DATE/TIME       +X PLAYERS
│  (Left, Green)     (Center, Charcoal)     (Right, Bold)
│  or "Seeking"                                      │
│                                                   │
└───────────────────────────────────────────────────┘
```

**Content Structure:**

| Element | Position | Typography | Data Source |
|---------|----------|------------|-------------|
| Status Label | Far Left | 14pt Bold, Green `#70AD47` | `"Recruiting"` or `"Seeking"` (fixed text) |
| Sport + Date/Time | Center | 13pt Regular, Charcoal | `ActivityPage.SpecificSport` + `ActivityPage.StartDate` + `ActivityPage.StartTime` |
| Capacity Need | Far Right | 16pt Bold, Green | Calculated from `ActivityPage.MaxParticipants - CurrentParticipants` or `ActivityPage.CallOutPositions` |

**Call-Out Variations:**

| Scenario | Right Side Display | Example |
|----------|-------------------|---------|
| **Specific Positions** | "+1 Goalie, +1 Defender" | "Recruiting • Soccer • Sun 18:00 → **+1 Goalie**" |
| **Generic Count** | "+3 Players" | "Seeking • Volleyball • Sat 16:00 → **+3 Players**" |
| **Team Formation** | "#Team Alpha Needs 5" | "Recruiting • Basketball • Wed 19:00 → **#Team Alpha Needs 5**" |
| **Volunteers** | "+2 Volunteers (Referee)" | "Seeking • Netball Tournament • 15 Feb → **+2 Volunteers (Referee)**" |

**Botswana Examples:**

```json
{
  "card_type": "Match-Making Card",
  "border_color": "#70AD47",
  "border_opacity": 0.7,
  "status_label": "Recruiting",
  "sport": "Soccer",
  "date_time": "Sunday 18:00",
  "venue": "Block 3 Hub",
  "capacity_need": "+1 Goalie",
  "tap_action": "Navigate to Activity Page ACT-BW-GAB-089 → Auto-scroll to 'Call-Outs' section"
}
```

**Additional Examples:**
- "Recruiting • Chess Tournament • Sat 14:00, UB Student Centre → **Need 4 Players for Team Event**"
- "Seeking • Gaborone Ladies Netball • Tue 18:00, Broadhurst Complex → **+2 Wing Defence**"
- "Recruiting • Molepolole Community Cleanup • Sun 08:00 → **+15 Volunteers**"

---

### 4. TRAINING/LESSON PROGRESS CARD (Blue Border)

**Purpose:** Show user's progress through multi-session courses, training programs, or achievement paths

**Visual Layout:**
```
┌───────────────────────────────────────────────────┐
│ [Border: Blue 70% opacity]                        │
│                                                   │
│  COURSE TITLE (Top, 14pt Bold)                    │
│  Lesson X of Y • Topic Name (11pt Grey)           │
│  ────────────────────────── 80% (Thin progress bar)
│                                                   │
└───────────────────────────────────────────────────┘
```

**Content Structure:**

| Element | Position | Typography | Data Source |
|---------|----------|------------|-------------|
| Course Title | Top-left | 14pt Bold, Charcoal | `ActivityPage.EventTitle` or `User.ActivityInterests[X].CourseName` |
| Lesson Info | Below title | 11pt Regular, Grey | `"Lesson X of Y • [Topic]"` from `ActivityPage.RecurringSchedule` |
| Progress Bar | Bottom edge, spans full width minus 16px padding | 4px height, rounded ends | Calculated: `(CompletedLessons / TotalLessons) * 100` |
| Percentage Overlay | Right side of progress bar | 11pt Bold, Blue | Progress % as text |

**Progress Bar States:**

| Completion Range | Bar Color | Bar Fill | Example |
|------------------|-----------|----------|---------|
| **0-33%** | Light Grey `#D3D3D3` | Partial fill in Blue `#4472C4` | "Beginner Tennis - Lesson 2 of 10 → **20%**" |
| **34-66%** | Medium Grey `#A6A6A6` | Partial fill in Blue | "Setswana Language Basics - Lesson 4 of 8 → **50%**" |
| **67-99%** | Blue `#4472C4` (faded) | Almost full in Bright Blue `#2E5C99` | "Advanced Chess Strategy - Lesson 9 of 10 → **90%**" |
| **100%** | Green `#70AD47` | Full | "Traditional Setswana Dance - Complete! → **100%** ✓" |

**Botswana Examples:**

```json
{
  "card_type": "Training/Lesson Progress Card",
  "border_color": "#4472C4",
  "border_opacity": 0.7,
  "course_title": "Setswana Language Basics",
  "lesson_info": "Lesson 4 of 5 • Intro to Proverbs",
  "progress_percentage": 80,
  "progress_bar_color": "#4472C4",
  "tap_action": "Navigate to Course Dashboard → Resume Lesson 5"
}
```

**Additional Examples:**
- "BFA Referee Certification • Module 3 of 6 • Offside Rule Application → **50%**"
- "Botswana Traditional Dance (Tsutsube) • Session 7 of 8 → **87.5%**"
- "UB Chess Society Beginner Series • Lesson 10 of 10 • Tournament Prep → **100%** ✓"

---

### 5. STANDARD LESSON CARD (Blue Border)

**Purpose:** One-time or drop-in classes, workshops, training sessions without progress tracking

**Visual Layout:**
```
┌───────────────────────────────────────────────────┐
│ [Border: Blue 70% opacity]                        │
│                                                   │
│  SKILL LEVEL     DATE • TIME        VENUE/DEMOGRAPHIC
│  (Left, Blue)    (Center, Charcoal) (Right, Grey)
│                                                   │
└───────────────────────────────────────────────────┘
```

**Content Structure:**

| Element | Position | Typography | Data Source |
|---------|----------|------------|-------------|
| Skill Level | Far Left | 13pt Bold, Blue `#4472C4` | `ActivityPage.CompetitiveLevel` or `"Beginner"`, `"Intermediate"`, `"Advanced"`, `"All Levels"` |
| Date + Time | Center | 13pt Regular, Charcoal | `ActivityPage.StartDate` + `ActivityPage.StartTime` |
| Venue or Demographic | Far Right | 11pt Regular, Grey | `ActivityPage.VenueName` or `ActivityPage.AgeGroup` / `ActivityPage.GenderRestriction` |

**Botswana Examples:**

```json
{
  "card_type": "Standard Lesson Card",
  "border_color": "#4472C4",
  "border_opacity": 0.7,
  "skill_level": "Intermediate",
  "date": "14 Feb",
  "time": "18:00",
  "venue": "Gaborone West Community Hall",
  "demographic": "Mixed Gender",
  "lesson_name": "Traditional Dance Class",
  "tap_action": "Navigate to Activity Page ACT-BW-GAB-112"
}
```

**Additional Examples:**
- "All Levels • Yoga Flow • 13 Feb 06:30 → Serenity Studio, Mogoditshane"
- "Beginner • Chess Fundamentals • Sat 14:00 → Block 3 Community Hall"
- "Advanced • Netball Skills Clinic • Sun 10:00 → Broadhurst Sports Complex"
- "Kids (7-12) • Soccer Dribbling Workshop • 20 Feb 16:00 → Extension 10 Field"

---

### 6. NEWS FLASH CARD (Light Blue Border)

**Purpose:** Official announcements, updates, breaking news from Associations, Schools, or Platform

**Visual Layout:**
```
┌───────────────────────────────────────────────────┐
│ [Border: Light Blue 70% opacity]                  │
│                                                   │
│  [Thumbnail]  CATEGORY TAG (Top, Bold Blue)       │
│  (Square      HEADLINE (Middle, 14pt Bold Charcoal)
│   80×80px)    TIME/SOURCE (Bottom, 10pt Grey)     │
│                                                   │
└───────────────────────────────────────────────────┘
```

**Content Structure (Thumbnail + 3-Level Text Hierarchy):**

| Element | Position | Typography | Data Source |
|---------|----------|------------|-------------|
| Thumbnail | Far Left, 80×80px square or slightly rounded (8px radius) | Image (WebP) | `NewsFlashPost.PhotosJSON[0]` or default icon (e.g., BFA crest, school logo) |
| Category Tag | Top-right of text area | 10pt Bold ALL CAPS, Blue `#4472C4` | `NewsFlashPost.PostType` or `Association.Name` |
| Headline | Middle of text area | 14pt Bold, Charcoal, max 2 lines with ellipsis | `NewsFlashPost.PostTitle` |
| Time/Source | Bottom of text area | 10pt Regular, Grey `#A6A6A6` | `"X hours ago • [Source]"` from `NewsFlashPost.CreatedTimestamp` + `Association.Name` |

**Botswana Examples:**

```json
{
  "card_type": "News Flash Card",
  "border_color": "#87CEEB",
  "border_opacity": 0.7,
  "thumbnail": "mogogi_gabonamong_headshot.webp",
  "category_tag": "BFA UPDATES",
  "headline": "Mogogi Gabonamong to host youth clinic in Gaborone",
  "time_source": "2 hours ago • Botswana Football Association",
  "tap_action": "Navigate to News Flash Detail Page → Full article"
}
```

**Additional Examples:**
- **Thumbnail:** Zebras team crest → **Category:** "NATIONAL TEAM" → **Headline:** "Zebras secure AFCON qualifier spot with 2-1 victory" → **Time/Source:** "5 hours ago • Sport Botswana"
- **Thumbnail:** Maru-a-Pula logo → **Category:** "SCHOOL SPORTS" → **Headline:** "Maru-a-Pula Blue House wins National U15 Netball Championship" → **Time/Source:** "1 day ago • Botswana Netball Association"
- **Thumbnail:** Mizano app icon → **Category:** "PLATFORM UPDATE" → **Headline:** "New offline map tiles available for Francistown" → **Time/Source:** "3 hours ago • Mizano Team"

---

### 7. QUICK POLL/VOTE CARD (Pink Border → Charcoal After Vote)

**Purpose:** Community engagement, opinion gathering, preference voting

**Visual Layout (Before Vote):**
```
┌───────────────────────────────────────────────────┐
│ [Border: Pink 70% opacity]                        │
│                                                   │
│  POLL QUESTION (Center, 14pt Bold Charcoal)       │
│                                                   │
│  [ OPTION A BUTTON ]  [ OPTION B BUTTON ]         │
│  (Touch targets: 44px height minimum)             │
│                                                   │
└───────────────────────────────────────────────────┘
```

**Content Structure:**

| Element | Position | Typography | Data Source |
|---------|----------|------------|-------------|
| Poll Question | Top-center, multi-line if needed | 14pt Bold, Charcoal | `PollPost.Question` |
| Option Buttons | Bottom, evenly spaced (2-3 buttons) | 13pt Bold on rounded rectangle (8px radius), White bg with Charcoal border pre-vote | `PollPost.Options[]` |

**State Transitions:**

1. **Before Vote (Pink Border):**
   - **Border:** Pink `#FF69B4` at 70% opacity
   - **Buttons:** White background, Charcoal `#505050` border (2px), Charcoal text
   - **Tap Action:** Record vote → Transition to "After Vote" state

2. **After Vote (Charcoal Border):**
   - **Border:** Fades from Pink → Charcoal `#505050` (300ms transition)
   - **Buttons:** Winner/selected option highlighted in Green `#70AD47` background with White text; other options greyed out
   - **Results Display:** Show percentage bars or vote counts
   - **Example:** "National Stadium: **67%** (234 votes)" vs "Lobatse Stadium: **33%** (115 votes)"

**Botswana Examples:**

```json
{
  "card_type": "Quick Poll/Vote Card",
  "border_color_before": "#FF69B4",
  "border_color_after": "#505050",
  "border_opacity": 0.7,
  "poll_question": "Which stadium has the best atmosphere?",
  "options": [
    {"text": "National Stadium", "votes": 234},
    {"text": "Lobatse Stadium", "votes": 115}
  ],
  "user_voted": false,
  "tap_action": "Submit vote → Update border color → Show results"
}
```

**Additional Examples:**
- "Who is your Botswana Zebras MVP?" → [ Mogogi Gabonamong ] [ Kabelo Seakanyeng ]
- "Best local netball club?" → [ Broadhurst Ladies ] [ Extension 10 Queens ] [ Gaborone Diamonds ]
- "Which weekend should we host the Block 3 Community Cleanup?" → [ 22 Feb ] [ 1 Mar ] [ 8 Mar ]

**Post-Vote Display:**
```
┌───────────────────────────────────────────────────┐
│ [Border: Charcoal 70% opacity]                    │
│                                                   │
│  Which stadium has the best atmosphere?           │
│                                                   │
│  ████████████ National Stadium 67% (234)          │
│  ██████ Lobatse Stadium 33% (115)                 │
│                                                   │
└───────────────────────────────────────────────────┘
```

---

### 8. EVENT INVITE/AD CARD (Light Blue Border - Two Variants)

**Purpose:** Non-sports events (festivals, workshops, community gatherings) or sponsored promotions

**Variant A: Event Invite (Organic)**

**Visual Layout:**
```
┌───────────────────────────────────────────────────┐
│ [Border: Light Blue 70% opacity]                  │
│                                                   │
│  EVENT NAME (Top, 16pt Bold Charcoal)             │
│  Activity Type • Day • Time (12pt Grey)           │
│  "Learn More" / "Register" (Bottom-right link)    │
│                                                   │
└───────────────────────────────────────────────────┘
```

**Variant B: Sponsored Ad (Paid)**

**Visual Layout:**
```
┌───────────────────────────────────────────────────┐
│ [Border: Light Blue 70% opacity]                  │
│ "Sponsored" tag (Top-right, 9pt Grey)             │
│                                                   │
│  [Subtle pattern or textured background]          │
│  EVENT NAME + CTA (Center, 16pt Bold White)       │
│  Sponsor Logo (Bottom-left, 60×30px)              │
│                                                   │
└───────────────────────────────────────────────────┘
```

**Botswana Examples:**

**Variant A (Event Invite):**
```json
{
  "card_type": "Event Invite Card",
  "border_color": "#87CEEB",
  "border_opacity": 0.7,
  "event_name": "Maitisong Festival Workshop",
  "activity_info": "Poetry Slam • Saturday • 20:00",
  "cta_text": "Learn More",
  "cta_link": "Navigate to Activity Page ACT-BW-GAB-156"
}
```

**Variant B (Sponsored Ad):**
```json
{
  "card_type": "Sponsored Event Ad",
  "border_color": "#87CEEB",
  "border_opacity": 0.7,
  "sponsor_tag": "Sponsored",
  "background_pattern": "subtle_dots.webp",
  "event_name": "Orange Botswana Youth Soccer Challenge",
  "cta_text": "Register Your Team",
  "sponsor_logo": "orange_botswana_logo.webp",
  "tap_action": "Open external link → Facebook Event page"
}
```

**Additional Examples:**
- "Gaborone Book Fair 2026 • Literature & Arts • Fri-Sun → **Buy Tickets**"
- "Sponsored: Mascom Netball Development Camp • Ages 10-16 • Apply Now"
- "Kgalagadi Conservation Society Nature Walk • Sat 06:00 → **Join Us**"

---

### 9. IMAGE CARD (Ad - Full-Bleed WebP)

**Purpose:** Visually immersive sponsored content or featured promotions (revenue stream)

**Visual Layout:**
```
┌───────────────────────────────────────────────────┐
│ [No border - Full-bleed image]                    │
│                                                   │
│  [High-definition WebP image fills entire card]   │
│  [Gradient overlay: bottom-to-top, 60% opacity]   │
│  HEADLINE (Bottom-center, 18pt Bold White)        │
│  "Sponsored" tag (Top-right corner, semi-transparent)
│                                                   │
└───────────────────────────────────────────────────┘
```

**Content Structure:**

| Element | Position | Typography | Data Source |
|---------|----------|------------|-------------|
| Background Image | Full card, no padding | WebP format, max 200KB | `AdPost.ImageURL` |
| Gradient Overlay | Bottom 40% of card | Black `#000000` at 0% (top) → 60% (bottom) | CSS gradient |
| Headline | Bottom-center, 16px padding | 18pt Bold, White `#FFFFFF` with 2px text shadow | `AdPost.Headline` |
| "Sponsored" Tag | Top-right corner, 8px padding | 9pt Regular, White on semi-transparent Black (50% opacity) rounded rectangle | Fixed text |

**Botswana Examples:**

```json
{
  "card_type": "Image Card (Ad)",
  "background_image": "orange_data_bundles_promo.webp",
  "gradient_overlay": "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))",
  "headline": "50% Off Data Bundles at Orange Botswana",
  "sponsor_tag": "Sponsored",
  "tap_action": "Open external link → Orange Botswana website or WhatsApp Business"
}
```

**Additional Examples:**
- **Image:** Champion Sports store exterior → **Headline:** "New Soccer Season Gear - 30% Off at Champion Sports Gaborone"
- **Image:** Mascom Wireless billboard → **Headline:** "Unlimited Netball League Streaming - Mascom Fiber"
- **Image:** Serenity Yoga Studio interior → **Headline:** "First Month Free - Join Mogoditshane's Premier Wellness Studio"

**Feed Insertion Logic:**
- **Frequency:** 1 Image Card per every 10-15 organic cards
- **Position:** Never as first card; randomized between positions 8-20
- **Capping:** Max 3 Image Cards per infinite scroll session
- **Offline Handling:** Cached locally; if user is offline, show placeholder with "Ad not available offline" text

---

### 10. CATEGORY CARD (Light Blue/White - Expandable Directory)

**Purpose:** Directory navigation for Business/Shops/Businesses/Institutions panels

**Visual Layout (Collapsed State):**
```
┌───────────────────────────────────────────────────┐
│ [Background: Solid Color - Blue/Pink/Green/etc.]  │
│                                                   │
│  CATEGORY NAME (Left, 18pt Bold White)      [ + ] │
│  (e.g., "Beverages")                        (Right)
│                                                   │
└───────────────────────────────────────────────────┘
```

**Visual Layout (Expanded State):**
```
┌───────────────────────────────────────────────────┐
│ [Background: White]                               │
│                                                   │
│  CATEGORY NAME (Left, 18pt Bold Charcoal)   [ - ] │
│  ────────────────────────────────────────────────
│  → Sub-Category 1 (Text button, 14pt Charcoal)    │
│  → Sub-Category 2                                 │
│  → Sub-Category 3                                 │
│                                                   │
└───────────────────────────────────────────────────┘
```

**Content Structure:**

| State | Background | Text Color | Icon | Tap Action |
|-------|------------|------------|------|------------|
| **Collapsed** | Randomized vibrant color (Blue `#4472C4`, Pink `#FF69B4`, Green `#70AD47`, Orange `#FFA500`, Purple `#7030A0`) | White `#FFFFFF` | **[ + ]** (24×24px, White) | Expand → Show sub-categories |
| **Expanded** | White `#FFFFFF` | Charcoal `#505050` or Brand Blue `#4472C4` | **[ - ]** (24×24px, Charcoal) | Collapse → Hide sub-categories |

**Sub-Category Display:**
- **Format:** Text button list, 14pt Regular Charcoal
- **Prefix:** Arrow `→` (Unicode U+2192)
- **Spacing:** 12px padding between items
- **Tap Action:** Expand → Show Contact Cards for that sub-category inline

**Botswana Examples:**

```json
{
  "card_type": "Category Card",
  "category_name": "Beverages",
  "state": "collapsed",
  "background_color": "#4472C4",
  "text_color": "#FFFFFF",
  "icon": "+",
  "sub_categories": ["Water", "Soft Drinks", "Juices", "Traditional Drinks"],
  "tap_action": "Expand → Show sub-categories → White background, Charcoal text, change icon to '-'"
}
```

**Directory Hierarchy Example (Business Panel):**

```
Category: Retail & Groceries [+]  ← (Green background, White text)
  → Tap to expand:
  
Category: Retail & Groceries [-]  ← (White background, Charcoal text)
  → Supermarkets
  → Clothing Stores
  → Hardware Shops
  
  User taps "Supermarkets":
  
  → Supermarkets [-]  ← (Nested, indented)
    ▸ Choppies (Main Mall)  ← Contact Card appears
    ▸ Spar (Riverwalk)       ← Contact Card
    ▸ Pick n Pay (Game City) ← Contact Card
```

**Color Randomization Logic:**
- **Purpose:** Visual variety; helps users distinguish categories at a glance
- **Pool:** 6 colors (Blue, Pink, Green, Orange, Purple, Yellow)
- **Assignment:** Deterministic hash of category name → ensures same category always gets same color across sessions
- **Example Code:**
```javascript
const colors = ['#4472C4', '#FF69B4', '#70AD47', '#FFA500', '#7030A0', '#FFD700'];
const colorIndex = hashString(categoryName) % colors.length;
const categoryColor = colors[colorIndex];
```

---

### 11. CONTACT CARD (White/Grey - Business Listings)

**Purpose:** Final "leaf" of directory tree; displays individual business/service provider contact info

**Visual Layout:**
```
┌───────────────────────────────────────────────────┐
│ [Background: White, Border: 1px Light Grey #E0E0E0]
│                                                   │
│  [Logo]  BUSINESS NAME (14pt Bold Charcoal)  📞/📍
│  (Circle/                                   (Icons)
│   Square  Additional Info (11pt Grey)             │
│   60×60px)                                         │
│                                                   │
└───────────────────────────────────────────────────┘
```

**Content Structure:**

| Element | Position | Typography | Data Source |
|---------|----------|------------|-------------|
| Business Logo | Far Left, 60×60px circle or square | Image (WebP) or placeholder initials | `Business.Logo` |
| Business Name | Center-left, top | 14pt Bold, Charcoal | `Business.BusinessName` |
| Additional Info | Below name | 11pt Regular, Grey | `Business.Location.Area` + `Business.Contact.Phone` or `"View Details"` |
| Call Icon | Far Right, top | 24×24px phone icon, Blue `#4472C4` | Tap → `wa.me/[WhatsAppNumber]` deep link |
| Map Icon | Far Right, bottom | 24×24px location pin icon, Blue | Tap → Open offline map or Google Maps |

**Botswana Examples:**

```json
{
  "card_type": "Contact Card",
  "background": "#FFFFFF",
  "border": "1px solid #E0E0E0",
  "business_logo": "pula_water_suppliers_logo.webp",
  "business_name": "Pula Water Suppliers",
  "additional_info": "Broadhurst • +267 395 1234",
  "call_action": "wa.me/2673951234?text=Hello, I saw your listing on Mizano...",
  "map_action": "Open offline map → Navigate to Plot 5544, Broadhurst"
}
```

**Additional Examples:**
- **Logo:** Choppies logo → **Name:** "Choppies Supermarket" → **Info:** "Main Mall • Open Daily 08:00-20:00" → **Icons:** Call, Map
- **Logo:** Champion Sports logo → **Name:** "Champion Sports Gaborone" → **Info:** "City Centre • Sports Equipment" → **Icons:** WhatsApp, Map
- **Logo:** Serenity Yoga initials (SY) → **Name:** "Serenity Yoga Studio" → **Info:** "Mogoditshane • Wellness" → **Icons:** WhatsApp, Map

**WhatsApp Deep Link Pre-Fill Message:**
```
wa.me/2673951234?text=Hello! I found your business on Mizano and I'm interested in [Business.Services[0]]. Can you help me?
```

**Tap Action Hierarchy:**
1. **Tap Card (anywhere except icons):** Navigate to Business Detail Page (if exists) or expand inline with full contact info
2. **Tap Call Icon:** Launch WhatsApp with pre-filled message (zero-rated data)
3. **Tap Map Icon:** Open offline map tiles or Google Maps with GPS coordinates

---

### 12. VENUE CARD (Light Grey Border - 75% Transparency)

**Purpose:** Display venue information with collapsible details for booking and contact

**Visual Layout (Collapsed):**
```
┌────────────────────────────────────────────────────┐
│ [Border: Very Light Grey #E0E0E0 at 75% opacity]  │
│ [Background: White #FFFFFF]                        │
│                                                    │
│  Venue Name (14pt Bold, Charcoal #333333)         │
│  # Venue Types • # Activities (11pt Grey #757575) │
│                                                    │
└────────────────────────────────────────────────────┘
```
**Height:** 80px

**Visual Layout (Expanded):**
```
┌────────────────────────────────────────────────────┐
│ [Border: Very Light Grey #E0E0E0 at 75% opacity]  │
│ [Background: White #FFFFFF]                        │
│                                                    │
│  [Venue Image - WebP, 16:9 aspect ratio]          │
│                                                    │
│  Venue Name (clickable with GPS) (-)              │
│  Description text (collapsible)...                │
│                                                    │
│  Area/Neighbourhood: Block 3, Gaborone            │
│                                                    │
│  Contacts (-)                                      │
│  [📞 Call] [💬 WhatsApp] [👥 Facebook]            │
│                                                    │
└────────────────────────────────────────────────────┘
```
**Height:** Variable (based on content)

**Content Structure:**
- **Venue Name:** 14pt Bold, Charcoal (#333333), clickable (opens GPS/maps)
- **Venue Types Count:** e.g., "3 Venue Types" (Open Field, Basketball Court, Hall)
- **Activities Count:** e.g., "8 Activities" (Soccer, Basketball, Netball, etc.)
- **Venue Image:** Single featured image, WebP format, 16:9 aspect ratio
- **Description:** Collapsible text, amenities, capacity details
- **Area/Neighbourhood:** Location context (filtered by user's selected location)
- **Contact Buttons:** Interactive buttons with deep links:
  - **Call:** `tel:[phone_number]`
  - **WhatsApp:** `https://wa.me/[whatsapp_number]`
  - **Facebook:** `fb://page/[page_id]` or `https://facebook.com/[page_name]`

**Border Styling:**
- **Color:** Very Light Grey `#E0E0E0`
- **Opacity:** 75% transparency
- **Width:** 2px
- **Rationale:** Neutral, non-status color distinguishes venues from activity cards

**Booking Integration:**
- No in-card booking UI (keeps card lightweight)
- "Book Now" button in expanded state opens WhatsApp with pre-filled message:
  - "Hi, I'd like to book [Venue Name] for [Date/Time]. Is it available?"
- External booking confirmation via WhatsApp/Facebook
- 5% commission tracked on confirmed bookings

**State Behavior:**
- **Default:** Collapsed (80px height)
- **Tap Card:** Expands to show full details
- **Tap Venue Name:** Opens GPS/maps app with venue coordinates
- **Tap Contact Buttons:** Deep links to external apps (call, WhatsApp, Facebook)
- **Tap "Book Now":** Opens WhatsApp with pre-filled booking message

**Profile Access:**
- **All Profiles:** Browse and view venue cards
- **Business Profile:** List venues, edit venue details, manage bookings

**Offline Support:**
- Venue details cached locally (name, types, activities, description, image)
- Contact buttons functional offline (deep links work)
- Booking requires online connection (WhatsApp/Facebook)

---

### EDIT ICON DESIGN (User-Created Cards)

**Purpose:** Visual affordance for editing user-created content across all card types

**Icon Specifications:**
- **Symbol:** Pencil icon (✏️ or Material Design edit icon)
- **Size:** 20×20px
- **Color:** Blue `#4472C4` (matches Interest state)
- **Position:** Absolute, top-right corner of card, 8px padding from edges
- **Background:** Semi-transparent white circle (32×32px) for contrast
- **Visibility:** Only visible on cards created by current user

**Hover/Active States:**
- **Hover:** Darker blue `#2E5C99`, scale to 22×22px (110%)
- **Active/Tap:** Brief pulse animation (150ms), navigate to Edit Card interface

**Implementation (CSS):**
```css
.card-edit-icon {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 150ms ease;
}

.card-edit-icon svg {
  width: 20px;
  height: 20px;
  fill: #4472C4;
}

.card-edit-icon:hover {
  transform: scale(1.1);
}

.card-edit-icon:hover svg {
  fill: #2E5C99;
}

.card-edit-icon:active {
  animation: pulse-edit 150ms ease;
}

@keyframes pulse-edit {
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1.1); }
}
```

**Card Type Compatibility:**
- **Standard Match Cards:** Edit icon on user-created matches
- **Registration-State Cards:** Edit icon on user-created competitions/events
- **Match-Making Cards:** Edit icon on user-created call-outs
- **Training/Lesson Progress Cards:** Edit icon on user-created lessons
- **Standard Lesson Cards:** Edit icon on user-created lessons
- **News Flash Cards:** Edit icon on user-created news posts
- **Quick Poll/Vote Cards:** Edit icon on user-created polls
- **Event Invite/Ad Cards:** Edit icon on user-created events
- **Image Cards:** Edit icon on user-uploaded ads
- **Venue Cards:** Edit icon on user-listed venues
- **Contact Cards:** No edit icon (system-generated from profiles)
- **Category Cards:** No edit icon (system-generated directory)

**Edit Workflow:**
1. User taps Edit icon on their card
2. Navigate to Edit Card interface (pre-filled with current data)
3. User modifies fields (title, description, date, pricing, etc.)
4. User taps "Save" or "Update"
5. Card updates in feed with "Last edited [time]" badge (24-hour visibility)
6. Option to "Delete" card (confirmation dialog required)

---

## CARD STATE MECHANICS & ANIMATIONS

### State Transition Rules

| Card Type | Initial State | Trigger | Final State | Animation Duration |
|-----------|--------------|---------|-------------|-------------------|
| **Standard Match** | Yellow (Upcoming) | `StartTime` reached | Orange (Live) with pulsing | 500ms fade + continuous pulse |
| **Standard Match** | Orange (Live) | `EndTime` reached | Charcoal (Finished) | 300ms fade, card opacity → 85% |
| **Registration-State** | Yellow with "Closing in X Days" | 24 hours before deadline | Red urgency badge "Closing Today!" | Instant badge color change |
| **Match-Making** | Green with "+X Players" | All positions filled | Charcoal "Team Complete" | 300ms fade to grey |
| **Quick Poll/Vote** | Pink (before vote) | User taps option | Charcoal (after vote) | 300ms border fade + 200ms button highlight |
| **Category Card** | Collapsed (Colored bg) | Tap expand | Expanded (White bg) | 200ms background color fade + 150ms icon rotation (+90° to become -) |
| **Contact Card** | N/A (static) | Tap WhatsApp icon | Launch wa.me deep link | Instant external app launch |
| **Venue Card** | Collapsed (Light Grey) | Tap card | Expanded (Light Grey) | 200ms height expansion + 150ms icon rotation (+90° to become -) |
| **Venue Card** | Expanded | Tap "Book Now" | Launch WhatsApp with pre-filled message | Instant external app launch |
| **User-Created Cards** | N/A | Tap Edit icon | Navigate to Edit Card interface | 300ms fade transition |

### Pulsing Border Effect (Live Matches)

**Implementation (CSS Animation):**
```css
@keyframes pulse-border {
  0% { border-opacity: 0.7; }
  50% { border-opacity: 0.5; }
  100% { border-opacity: 0.7; }
}

.card-live {
  border: 2px solid #FFA500;
  border-opacity: 0.7;
  animation: pulse-border 1s ease-in-out infinite;
}
```

**Purpose:** Draws eye to live content without being jarring; signals "this is happening now"

### Offline State Indicators

When user is offline:
- **Live Match Cards:** Show last synced time (e.g., "Last updated 12 min ago")
- **Image Cards (Ads):** Show cached version or placeholder "Ad not available offline"
- **News Flash Cards:** Display with "Offline mode - tap to queue for sync" badge
- **All Cards:** Greyed-out "Join" / "RSVP" buttons with "Will sync when online" tooltip

---

## FEED ALGORITHM & CARD INSERTION LOGIC

### Homepage Feed Composition (Infinite Scroll)

**Priority Hierarchy (Top to Bottom):**

1. **Pinned Section (Always Top 3-5 cards):**
   - **Live Matches (Orange):** All `ActivityState = "Active Now"` in user's location, sorted by proximity
   - **Urgent Call-Outs (Green):** Match-Making cards with `CallOutActive = TRUE` and `StartTime` within 2 hours
   - **Deadline Alerts (Red):** Registration-State cards with urgency badge "Closing Today!"

2. **Personalized Section (Next 10-15 cards):**
   - **User's Teams:** Upcoming matches for teams in `User.PlayerData.Teams[]`
   - **User's Interests:** Activities matching `User.ActivityInterests[]` sport/hobby types
   - **Guardian Dashboard:** If `Guardian` capability, show linked minors' upcoming activities

3. **Discovery Section (Next 20-30 cards):**
   - **Upcoming Matches (Yellow):** All `ActivityState = "Active Soon"` in user's city, sorted by date
   - **Lessons & Training (Blue):** Standard Lesson Cards and Progress Cards for courses user hasn't joined
   - **News Flash (Light Blue):** Recent posts from followed Associations or local clubs

4. **Engagement Section (Intermittent):**
   - **Quick Polls (Pink):** 1 poll every 15-20 cards, prioritized if user hasn't voted recently
   - **Image Ads (Full-Bleed):** 1 sponsored card every 10-15 cards (max 3 per session)

5. **Finished Matches (Bottom):**
   - **Charcoal Cards:** Past events with recaps, sorted by most recent first
   - **Infinite Scroll:** Loads 20 more finished matches when user reaches bottom

**Smart Insertion Rules:**
- **No Back-to-Back Ads:** Minimum 8 organic cards between Image Cards
- **Poll Spacing:** At least 12 cards between Quick Poll/Vote Cards
- **Category Cards (Business Panel Only):** Not in Sports/Hobbies/Leisure feeds
- **Location Filtering:** If user set Default Location in Settings, prioritize that city's activities (80% local, 20% regional/national)

### Panel-Specific Feed Variations

| Panel | Primary Card Types | Secondary Card Types | Feed Length |
|-------|-------------------|---------------------|-------------|
| **Sports** | Standard Match (Orange/Yellow/Charcoal), Match-Making (Green) | News Flash (BFA/associations), Quick Poll (MVP votes) | Infinite |
| **Hobbies** | Standard Lesson (Blue), Training Progress (Blue) | Registration-State (Yellow), Event Invite (Light Blue) | Infinite |
| **Leisure** | Standard Lesson (Blue), Event Invite (Light Blue) | Match-Making (Green - volunteers), Quick Poll (Pink) | Infinite |
| **Lessons** | Standard Lesson (Blue), Training Progress (Blue) | Event Invite (workshops), Registration-State (Yellow) | Infinite |
| **Events** | Registration-State (Yellow), Event Invite (Light Blue) | News Flash (Light Blue), Standard Match (tournaments) | Infinite |
| **Mine** | User's joined activities (all types), Progress Cards (Blue) | Guardian Dashboard (if applicable) | Limited to user's data |
| **Community** | News Flash (Light Blue), Quick Poll (Pink) | Event Invite (community events), Registration-State (volunteer calls) | Infinite |
| **Shopping** | Image Card (Ads), Event Invite (product launches) | News Flash (business announcements) | Paginated (50 per load) |
| **Businesses** | Category Card (directory toggles), Contact Card (listings) | Image Card (sponsored), News Flash (industry updates) | Paginated by category |
| **Venues** | Venue Card (Light Grey) | Contact Card (venue owners), Image Card (sponsored) | Infinite |

---

## DARK MODE ADAPTATION

### Color Palette Adjustments

| Light Mode Color | Dark Mode Equivalent | Usage |
|------------------|---------------------|--------|
| White `#FFFFFF` | Dark Grey `#1E1E1E` | Card backgrounds |
| Light Grey `#E0E0E0` | Medium Grey `#3A3A3A` | Borders, dividers |
| Charcoal `#505050` | Light Grey `#D3D3D3` | Text (inverted for contrast) |
| Grey `#A6A6A6` | Medium Grey `#909090` | Secondary text |
| **Border Colors (All)** | **No change** | Orange, Green, Blue, Yellow, Pink, Light Blue stay same (70% opacity ensures visibility on dark bg) |

**Critical Rule:** Border colors remain unchanged in Dark Mode because their 70% transparency naturally adapts to dark backgrounds while maintaining psychological associations (Orange = Live, Green = Recruiting, etc.).

### Dark Mode Specific Adjustments

**Image Cards (Full-Bleed Ads):**
- **Light Mode:** Gradient overlay 0% → 60% black
- **Dark Mode:** Gradient overlay 0% → 80% black (stronger for text readability)

**Category Cards (Collapsed):**
- **Light Mode:** Vibrant colors + White text
- **Dark Mode:** Slightly desaturated colors + White text (no change to text color)

**Contact Cards:**
- **Light Mode:** White bg, Light Grey border
- **Dark Mode:** Dark Grey `#2A2A2A` bg, Medium Grey `#3A3A3A` border

---

## ACCESSIBILITY & TOUCH TARGETS

### Minimum Touch Target Sizing

**W3C WCAG 2.1 Level AAA Compliance:**
- **Minimum Size:** 44×44px (CSS pixels) for all interactive elements
- **Padding:** 8px minimum between adjacent touch targets

**Card-Specific Implementations:**

| Card Type | Interactive Element | Size | Notes |
|-----------|-------------------|------|-------|
| **Standard Match** | Entire card | Full card height (80-100px) | Tap anywhere to open Activity Page |
| **Quick Poll/Vote** | Option buttons | 44px height × full width (minus 32px padding) | Evenly spaced with 8px gap |
| **Category Card** | Expand/collapse icon | 44×44px | Far right; card itself also tappable |
| **Contact Card** | Call icon, Map icon | 44×44px each | Separated by 16px; card body also tappable |
| **Match-Making** | Entire card | Full height (70-90px) | Tap to open Activity Page → Call-Outs section auto-expanded |

### Screen Reader Support

**ARIA Labels for All Cards:**
```html
<!-- Standard Match Card -->
<div class="card standard-match" aria-label="Live match: Botswana Zebras 2, Township Rollers 1, 67 minutes played at National Stadium">
  <!-- Card content -->
</div>

<!-- Registration-State Card -->
<div class="card registration-state" aria-label="Gaborone Marathon 10km Fun Run, entries closing tomorrow, tap to register">
  <!-- Card content -->
</div>

<!-- Quick Poll/Vote Card -->
<div class="card quick-poll" aria-label="Poll: Which stadium has the best atmosphere? Options: National Stadium, Lobatse Stadium">
  <!-- Card content -->
</div>
```

### Color Contrast Ratios

**WCAG 2.1 Level AA Minimum (4.5:1 for text):**

| Element | Foreground | Background | Ratio | Status |
|---------|-----------|------------|-------|--------|
| Card Title (Bold) | Charcoal `#505050` | White `#FFFFFF` | 8.6:1 | ✓ AAA |
| Secondary Text | Grey `#A6A6A6` | White | 3.1:1 | ✗ Fails (use darker grey `#757575` = 4.6:1) |
| Category Card (Collapsed) | White `#FFFFFF` | Blue `#4472C4` | 4.9:1 | ✓ AA |
| Urgency Badge (Red) | White | Red `#FF0000` | 5.3:1 | ✓ AA |

**Fix for Secondary Text:**
```css
.card-secondary-text {
  color: #757575; /* Adjusted from #A6A6A6 for WCAG AA compliance */
}
```

---

## TECHNICAL IMPLEMENTATION

### Component Architecture (React/Flutter Example)

**Base Card Component:**
```jsx
// BaseCard.jsx
import React from 'react';
import './BaseCard.css';

const BaseCard = ({ 
  borderColor, 
  borderOpacity = 0.7, 
  state, 
  children, 
  onClick, 
  ariaLabel 
}) => {
  return (
    <div 
      className={`card card-${state}`}
      style={{
        borderColor: borderColor,
        borderOpacity: borderOpacity
      }}
      onClick={onClick}
      aria-label={ariaLabel}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  );
};

export default BaseCard;
```

**Standard Match Card Component:**
```jsx
// StandardMatchCard.jsx
import React from 'react';
import BaseCard from './BaseCard';

const StandardMatchCard = ({ matchData }) => {
  const getBorderColor = () => {
    if (matchData.activityState === 'Active Now') return '#FFA500';
    if (matchData.activityState === 'Active Soon') return '#FFD700';
    if (matchData.activityState === 'Passed') return '#505050';
    return '#505050'; // default
  };

  const getCenterDisplay = () => {
    if (matchData.activityState === 'Active Now') {
      return `${matchData.score} (${matchData.minute}')`;
    } else if (matchData.activityState === 'Active Soon') {
      return matchData.startTime;
    } else {
      return `${matchData.finalScore} (FT)`;
    }
  };

  return (
    <BaseCard
      borderColor={getBorderColor()}
      state={matchData.activityState.toLowerCase().replace(' ', '-')}
      onClick={() => navigateToActivityPage(matchData.activityId)}
      ariaLabel={`${matchData.activityState} match: ${matchData.teamLeft} vs ${matchData.teamRight}`}
    >
      <div className="match-card-layout">
        <div className="team-left">
          <span className="team-name">{matchData.teamLeft}</span>
          <img src={matchData.logoLeft} alt="" className="team-logo" />
        </div>
        
        <div className="match-center">
          <span className="time-score">{getCenterDisplay()}</span>
          <span className="date-venue">{matchData.date} • {matchData.venue}</span>
        </div>
        
        <div className="team-right">
          <img src={matchData.logoRight} alt="" className="team-logo" />
          <span className="team-name">{matchData.teamRight}</span>
        </div>
      </div>
    </BaseCard>
  );
};
```

### Data Schema Extensions

**Google Sheets Columns for Card Rendering:**

| Column | Field Name | Purpose | Card Types Using It |
|--------|------------|---------|---------------------|
| **BK** | BorderColorHex | Override border color (hex code) | All card types |
| **BL** | CardPriorityScore | Feed algorithm ranking (0-100) | All card types |
| **BM** | PinToTop | Boolean - force card to top of feed | Standard Match (Live), Match-Making (Urgent) |
| **BN** | ThumbnailURL | WebP image URL for cards with thumbnails | News Flash, Contact Card, Image Card |
| **BO** | GradientOverlay | CSS gradient string for image cards | Image Card, News Flash (if full-bleed variant) |
| **BP** | ProgressPercentage | 0-100 for progress bars | Training/Lesson Progress Card |
| **BQ** | PollOptionsJSON | JSON array of poll choices + vote counts | Quick Poll/Vote Card |
| **BR** | SubCategoriesJSON | JSON array of nested categories | Category Card |
| **BS** | UrgencyBadgeText | Override text for urgency badges | Registration-State Card |
| **BT** | ExpandedState | Boolean - is category expanded? | Category Card |

**Sample Activity JSON (Standard Match Card):**
```json
{
  "activityId": "ACT-BW-GAB-045",
  "activityState": "Active Now",
  "specificSport": "soccer",
  "teamLeft": "Botswana Zebras",
  "teamRight": "Township Rollers",
  "logoLeft": "https://cdn.mizano.app/teams/zebras_crest.webp",
  "logoRight": "https://cdn.mizano.app/teams/rollers_crest.webp",
  "startTime": "19:00",
  "startDate": "2026-02-13",
  "venueName": "National Stadium",
  "matchStatsJSON": {
    "score": "2 - 1",
    "minute": 67,
    "finalScore": null
  },
  "borderColorHex": "#FFA500",
  "cardPriorityScore": 95,
  "pinToTop": true
}
```

### Offline Caching Strategy

**IndexedDB Storage:**
```javascript
// Store cards in IndexedDB for offline access
const storeCardsOffline = async (cards) => {
  const db = await openDB('MizanoCards', 1, {
    upgrade(db) {
      db.createObjectStore('cards', { keyPath: 'activityId' });
    }
  });
  
  const tx = db.transaction('cards', 'readwrite');
  cards.forEach(card => tx.store.put(card));
  await tx.done;
};

// Retrieve cards when offline
const getOfflineCards = async () => {
  const db = await openDB('MizanoCards', 1);
  return await db.getAll('cards');
};
```

**Sync Strategy:**
- **Every 15 minutes:** Fetch updated cards from Google Sheets API
- **On network reconnect:** Force immediate sync
- **Conflict resolution:** Server timestamp wins (last-write-wins)
- **Cache invalidation:** Cards older than 24 hours auto-deleted

---

## USAGE EXAMPLES BY PANEL

### Sports Panel Feed (Sample)

```
1. [Orange Border - Pulsing] Zebras vs Township Rollers - 2-1 (67') - National Stadium
2. [Green Border] Recruiting • Sunday Soccer • Block 3 Hub 18:00 → +1 Goalie
3. [Yellow Border] GU vs Extension Chiefs - 15:00, 15 Feb - UB Sports Complex
4. [Light Blue Border] BFA UPDATES: "Mogogi Gabonamong clinic in Gaborone"
5. [Yellow Border] Debswana Corporate League Match - Sat 10:00 → +2 Teams Needed
6. [Orange Border - Pulsing] Maru-a-Pula Blue vs Red House - 12-10 (Q3) - School Court
7. [Charcoal Border] Broadhurst Ladies vs Extension Queens - 18-15 (FT)
8. [Pink Border] Poll: "Best local soccer club?" → [Zebras] [Township Rollers] [GU]
9. [Yellow Border] Francistown Soccer Tournament - Entries Closing in 3 Days
10. [Image Card] Full-bleed ad: "Champion Sports - 30% Off All Soccer Gear"
... (infinite scroll continues)
```

### Hobbies Panel Feed (Sample)

```
1. [Blue Border] Setswana Language Basics • Lesson 4 of 5 → 80% progress bar
2. [Blue Border] All Levels • Traditional Dance Class • 18:00, 14 Feb - Community Hall
3. [Yellow Border] Maitisong Poetry Slam • Registration Closing Tomorrow
4. [Light Blue Border] NEWS: "New photography workshop series announced"
5. [Blue Border] Intermediate • Chess Fundamentals • Sat 14:00 - Block 3 Hall
6. [Green Border] Recruiting • Gaborone Book Club → Need 3 Members for Discussion Group
7. [Blue Border] Beginner Tennis • Session 2 of 10 → 20% progress bar
8. [Light Blue Border] Event Invite: "Kgalagadi Art Exhibition - Opening Night"
... (infinite scroll continues)
```

### Business Panel (Category Expansion Example)

```
[Blue Background] Retail & Groceries [+]
[Pink Background] Health & Wellness [+]
[Green Background] Sports Equipment [+]  ← User taps this
[Orange Background] Automotive [+]

↓ Expands to:

[White Background] Sports Equipment [-]
  → Soccer Gear
  → Netball & Basketball  ← User taps this
  → Athletics & Running
  → Fitness Equipment

↓ Sub-category expands inline:

  → Netball & Basketball [-]
    ▸ [Contact Card] Champion Sports Gaborone - Main Mall • +267 395 0001
    ▸ [Contact Card] Pro Sports Francistown - Blue Jacket St • +267 241 2345
    ▸ [Contact Card] Game On Sports - Riverwalk Mall • +267 391 8888
```

---

## SUMMARY: CARD TYPES AT A GLANCE

| # | Card Type | Border Color | Purpose | Key Element | Example |
|---|-----------|--------------|---------|-------------|---------|
| 1 | **Standard Match** | Orange/Yellow/Charcoal | Team sports matches | Time/Score (center) | "Zebras vs Rollers - **2-1 (67')**" |
| 2 | **Registration-State** | Yellow | Event deadlines | Urgency badge (right) | "Gaborone Marathon → **Closing Tomorrow**" |
| 3 | **Match-Making** | Green | Player recruitment | "+X Players" (right) | "Sunday Soccer → **+1 Goalie**" |
| 4 | **Training Progress** | Blue | Course completion | Progress bar (bottom) | "Setswana Basics → **80%**" |
| 5 | **Standard Lesson** | Blue | One-time classes | Skill level (left) | "**Intermediate** • Dance • 18:00" |
| 6 | **News Flash** | Light Blue | Announcements | Thumbnail + 3-level text | "BFA: Mogogi clinic in Gaborone" |
| 7 | **Quick Poll** | Pink → Charcoal | Community voting | Option buttons | "Best stadium? → **[Vote]**" |
| 8 | **Event Invite/Ad** | Light Blue | Non-sports events | CTA link | "Maitisong Workshop → **Learn More**" |
| 9 | **Image Card** | None (full-bleed) | Sponsored ads | Gradient overlay + headline | "50% Off Data Bundles" |
| 10 | **Category Card** | Colored → White | Directory navigation | [+] / [-] icon | "Beverages **[+]** → Tap to expand" |
| 11 | **Contact Card** | White/Grey border | Business listings | Logo + Call/Map icons | "Pula Water Suppliers → **📞📍**" |

---

## DESIGN TOKENS (For Developers)

```json
{
  "colors": {
    "border": {
      "orange": "#FFA500",
      "green": "#70AD47",
      "charcoal": "#505050",
      "blue": "#4472C4",
      "yellow": "#FFD700",
      "pink": "#FF69B4",
      "lightBlue": "#87CEEB"
    },
    "text": {
      "primary": "#505050",
      "secondary": "#757575",
      "tertiary": "#A6A6A6",
      "white": "#FFFFFF"
    },
    "background": {
      "card": "#FFFFFF",
      "cardDark": "#1E1E1E",
      "app": "#F5F5F5"
    }
  },
  "typography": {
    "cardTitle": {
      "fontSize": "16px",
      "fontWeight": "700",
      "lineHeight": "1.4"
    },
    "cardSubtitle": {
      "fontSize": "13px",
      "fontWeight": "400",
      "lineHeight": "1.3"
    },
    "cardMetadata": {
      "fontSize": "11px",
      "fontWeight": "400",
      "lineHeight": "1.2"
    }
  },
  "spacing": {
    "cardPadding": "12px",
    "cardMargin": "8px",
    "elementGap": "8px",
    "touchTargetMin": "44px"
  },
  "borderRadius": {
    "card": "8px",
    "button": "8px",
    "badge": "16px"
  },
  "animation": {
    "fadeTransition": "300ms ease-in-out",
    "pulseInterval": "1s",
    "expandCollapse": "200ms ease-out"
  }
}
```

---

## NEXT STEPS FOR IMPLEMENTATION

1. **Component Library:** Build all 11 card components in React/Flutter/Vue
2. **Feed Algorithm:** Implement priority scoring + smart insertion logic
3. **Offline Sync:** Set up IndexedDB caching + 15-min background sync
4. **Accessibility Audit:** Test all cards with VoiceOver/TalkBack screen readers
5. **Performance Optimization:** Lazy load images, virtualize infinite scroll
6. **A/B Testing:** Test border color effectiveness (does Orange really signal "Live" to Batswana users?)
7. **Dark Mode:** Implement palette adjustments + test contrast ratios
8. **Analytics:** Track card tap rates, feed engagement, scroll depth

---

**Document Owner:** Mizano Design & Development Team  
**Last Updated:** February 12, 2026  
**Version:** 1.0  
**Status:** Complete Design Specification - Ready for Implementation

---

**END OF CARD DESIGN SYSTEM**
