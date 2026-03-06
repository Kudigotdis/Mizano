# Mizano Card Design Schematics v2.0

> "**Applied Android Studio Otter Pipeline standards from Docs/TECHNICAL_STACK_AND_APK_PIPELINE.md.**"

This document defines the visual layout, purpose, and content requirements for every card type in the Mizano ecosystem. These schematics are intended for design implementation and asset preparation.

---

## 🎨 The 7-Color Border System
All cards use a **2px solid border with 70% opacity** to indicate status or type.

| Status/Type | Color | Use Case |
| :--- | :--- | :--- |
| **LIVE** | Orange (#FFA500) | Happening right now (pulsing border) |
| **UPCOMING** | Yellow (#FFD700) | Scheduled, upcoming deadlines |
| **FINISHED** | Charcoal (#505050) | Completed, historical data, stats |
| **RECRUITING** | Green (#70AD47) | Joining teams, neighborhood challenges |
| **LEARNING** | Blue (#4472C4) | Lessons, education, personal interest |
| **ENGAGEMENT**| Pink (#FF69B4) | Polls, voting, academic alerts |
| **OFFICIAL** | Light Blue (#87CEEB)| Official news, events, ads, categories |

---

## 📋 Comprehensive Card Catalog

### 1. Match Cards Family (Competitive)
**Purpose:** Team vs. Team match display.
**Borders:** Orange (Live), Yellow (Upcoming), Charcoal (Finished).

```
┌────────────────────────────────────────────┐
│ [LOGO A]      [SCORE/TIME]      [LOGO B]   │
│ [NAME A]      [VENUE/DATE]      [NAME B]   │
├────────────────────────────────────────────┤
│ [OPTIONAL SAFETY FOOTER: 🔒 or 📚]          │
└────────────────────────────────────────────┘
```
- **Line 1 (Center):** Score (e.g., "2 - 1") or Start Time (e.g., "14:30").
- **Line 2 (Center):** Venue/Location (e.g., "Block 3 Ground").
- **Image A/B:** Team logos (1:1 ratio, WebP).
- **Secondary Footer:** Safety alerts (Guardian required or Academic Pause).

### 2. Registration & Event Cards
**Purpose:** Signing up for marathons, tournaments, or festivals.
**Borders:** Yellow (Upcoming), Light Blue (Official).

```
┌────────────────────────────────────────────┐
│ [EVENT TITLE]                              │
│ [META: PRICE • DATE]                       │
│ [SECONDARY META: DISTANCES/TAGS]           │
│ [URGENCY BADGE]                            │
└────────────────────────────────────────────┘
```
- **Line 1 (Bold):** Title (e.g., "Gaborone City Marathon").
- **Line 2 (Grey):** Primary meta (e.g., "From P150 • 28 Aug 2026").
- **Line 3 (Small):** Secondary tags (e.g., "5km • 10km • 21km").
- **Badge (Top Right):** Status text (e.g., "Open", "Closing Soon").

### 3. Institution & Team Explorer
**Purpose:** Browsing schools, clubs, and organizations.
**Borders:** Light Blue.

```
┌────────────────────────────────────────────┐
│ [ICON]   [NAME + VERIFIED BADGE]           │ [ACTION]
│          [CATEGORY • LOCATION]             │ [+] 
│          [STATS: STUDENTS • TEAMS]         │
└────────────────────────────────────────────┘
```
- **Line 1:** Name (e.g., "Maru-a-Pula School").
- **Line 2:** Type & Town (e.g., "Academic • Gaborone").
- **Line 3:** Tally stats (e.g., "850 Students • 12 Teams").
- **Image Placeholder:** School/Club logo (1:1, centered in square box).
- **Expandable [+]:** Opens tags list (Sports, Classes).

### 4. Community & Feed Cards
**Purpose:** Social interactions and news.
**Borders:** Light Blue.

```
┌────────────────────────────────────────────┐
│ [AVATAR] [AUTHOR NAME]                     │
│          [LOCATION • TIMESTAMP]            │
├────────────────────────────────────────────┤
│ [POST TITLE (Large)]                       │
│ [POST CONTENT (2-3 lines)]                 │
├────────────────────────────────────────────┤
│ [ACTION BUTTON: CONTACT WHATSAPP]          │
└────────────────────────────────────────────┘
```
- **Line 1:** Author Name.
- **Line 2:** Location & Date (e.g., "Mochudi • 2 hours ago").
- **Line 3 (Bold):** Title of post.
- **Line 4:** Body text (truncated).
- **Image Placeholder:** User avatar (Circle, 1:1) or embedded thumbnail.

### 5. Job Listing & Opportunities
**Purpose:** Local employment.
**Borders:** Light Blue.

```
┌────────────────────────────────────────────┐
│ [LOGO]  [JOB TITLE]            [TYPE BADGE]│
│         [COMPANY • LOCATION]               │
│         [PULA SALARY RANGE]                │
├────────────────────────────────────────────┤
│ [DEADLINE: DD MMM]             [APPLY BTN] │
└────────────────────────────────────────────┘
```
- **Line 1:** Title (e.g., "Netball Coach").
- **Line 2:** Organization name.
- **Line 3:** Salary info (e.g., "P5,000 - P7,000").
- **Logo:** Company logo (mini, 1:1).

### 6. Lost & Found Cards
**Purpose:** Recovering community items.
**Borders:** Light Blue.

```
┌────────────────────────────────────────────┐
│ [PRODUCT IMG] [STATUS: LOST/FOUND]         │
│               [⭐ BOOSTED BADGE]            │
├────────────────────────────────────────────┤
│ [ITEM NAME]                                │
│ [LOCATION • DATE]                          │
└────────────────────────────────────────────┘
```
- **Line 1 (Status):** "LOST" (Red/Orange) or "FOUND" (Green).
- **Line 2 (Bold):** Item description (e.g., "Black Adidas Backpack").
- **Line 3:** Where/When (e.g., "Railways Park • 04 Mar").
- **Image Placeholder:** Photo of item (Landscape 3:2 or Square 1:1).

### 7. Interactive Engagement (Polls/Surveys)
**Purpose:** Voting and feedback.
**Borders:** Pink.

```
┌────────────────────────────────────────────┐
│ [ICON 📊] [SURVEY TITLE]                   │
├────────────────────────────────────────────┤
│ [THE QUESTION TEXT?]                       │
├────────────────────────────────────────────┤
│ [OPTION A]  [OPTION B]  [OPTION C] [OPT D] │
└────────────────────────────────────────────┘
```
- **Line 1:** Category/Title (e.g., "Hydration Check").
- **Line 2 (Bold):** The Question.
- **Line 3:** Grid of 2-4 response pill-buttons.

### 8. Neighborhood Challenges & Suggestions
**Purpose:** Encouraging community movement.
**Borders:** Green (Challenge), Blue (Suggestion).

```
┌────────────────────────────────────────────┐
│ [ICON 🏆/💡] [TYPE HEADER]                 │
├────────────────────────────────────────────┤
│ [ACTIVITY NAME]                            │
│ [PROGRESS: X / Y UNITS]                    │
│ [PARTICIPANT COUNT]                        │
└────────────────────────────────────────────┘
```
- **Line 1:** Header (e.g., "Activity of the Week").
- **Line 2 (Bold):** The Goal (e.g., "Walk 10km").
- **Line 3:** Progress/Tally (e.g., "Progress: 3/10 km").

### 9. Commercial & Directory (Shopping)
**Purpose:** Business discovery.
**Borders:** Light Blue.

```
┌────────────────────────────────────────────┐
│ [ITEM IMAGE (FULL WIDTH/BANNER)]           │
│ [STOCK BADGE]                              │
├────────────────────────────────────────────┤
│ [PRODUCT NAME]                             │
│ [CATEGORY]                                 │
│ [PRICE PULA]                               │
│ [SELLER • LOCATION]           [⭐ RATING]   │
└────────────────────────────────────────────┘
```
- **Line 1 (Bold):** Product Title.
- **Line 2:** Category/Subcategory.
- **Line 3 (Large):** Price (e.g., "P450.00").
- **Line 4:** Seller info + Star rating.
- **Image Placeholder:** Professional product photo (Banner view).

---

## 🛠️ Design Guidelines for Assets

1. **Format:** Always use **WebP** for images to ensure low data consumption.
2. **Quality:** Aim for balanced compression (<200KB per image).
3. **Icons:** Use **SVGs** or simple vector shapes wherever possible.
4. **Typography:** Use **Inter** or **Roboto**.
   - Headlines: Semi-Bold.
   - Meta: Light/Regular 10-12px.
5. **Padding:** Cards must maintain **16px internal padding** from border.
6. **Radius:** Standard **8px corner radius** for all cards and inner elements.

---

## 🔘 Action Button Standard
Buttons should be text-based with subtle backgrounds:
- **Primary:** Black or Gold (#FFB300) text on White/Grey.
- **WhatsApp:** Green text or Green icon.
- **Expansion:** Simple `[+]` and `[-]` symbols.
