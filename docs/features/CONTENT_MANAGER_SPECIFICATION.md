# CONTENT MANAGER SPECIFICATION

## Overview

The **Content Manager** is a comprehensive content lifecycle management feature that empowers users to create, manage, monetize, and analyze their content across all 16 panel categories. Accessible via the hamburger menu (\u2630), it provides a unified interface for content creation, billing tracking, statistics (200 KPIs), bookkeeping (venues), and card management.

**Profile Access:** User+ profiles (User, Guardian, Business, Association)

**Core Capabilities:**
1. **Create:** Sport/activity-specific content creation across all panel categories
2. **Billing:** Commission tracking and earnings dashboard
3. **Panel Category Management:** Collapsible list of 12 content categories with Stats, Book Keeping, and Created Cards
4. **Stats:** 200 KPIs per panel category for data-driven content optimization
5. **Book Keeping:** Venue-specific booking management (Business profiles only)
6. **Created Cards:** Edit, delete, schedule, and manage all user-created content

---

## Access & Navigation

### Entry Point

**Location:** Hamburger Menu (\u2630) → Manager

**Hamburger Menu Structure:**
```
\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 \u2630 Menu                                    \u2502
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 Settings                                   \u2502
\u2502 Profile                                    \u2502
\u2502 Manager                    \u2190 NEW          \u2502
\u2502 Logout                                     \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
```

**Tap "Manager":** Opens full-screen Content Manager interface

### Content Manager Main Interface

**Layout:** Full-screen overlay (similar to Settings Menu)
**Background:** White `#FFFFFF`
**Header:** "Content Manager" (18pt Bold, Charcoal)
**Close Button:** Top-right corner (X icon)

**Main Sections (Collapsible +/- pattern):**
1. **Create** (Always top, expanded by default)
2. **Billing** (Collapsed by default)
3. **Panel Categories** (Collapsed by default, contains 12 sub-categories)

---

## 1. CREATE SECTION

**Purpose:** Unified content creation interface for all panel categories

### Interface Structure

**Collapsed State:**
```
\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 + Create                                   \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
```

**Expanded State:**
```
\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 - Create                                   \u2502
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 Select Panel Category:                     \u2502
\u2502 [Dropdown: Sports \u25bc]                      \u2502
\u2502                                            \u2502
\u2502 Select Content Type:                       \u2502
\u2502 [Dropdown: Match \u25bc]                       \u2502
\u2502                                            \u2502
\u2502 [Create New Content Button]                \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
```

### Panel Category Options (12 Categories)

1. **Sports** \u2192 Content Types: Match, Match-Making Call-Out, News Flash, Quick Poll
2. **Hobbies** \u2192 Content Types: Lesson, Training Progress, Event Invite, Quick Poll
3. **Leisure** \u2192 Content Types: Lesson, Event Invite, Match-Making (Volunteers), Quick Poll
4. **Lessons** \u2192 Content Types: Standard Lesson, Training Progress, Event Invite
5. **Events** \u2192 Content Types: Registration-State Event, Event Invite, News Flash
6. **Groups** \u2192 Content Types: Match-Making Call-Out, Event Invite, News Flash
7. **Mine** \u2192 Content Types: (User's personal content, all types available)
8. **Community** \u2192 Content Types: News Flash, Quick Poll, Event Invite
9. **Shopping** \u2192 Content Types: Image Ad, Event Invite (Product Launch), News Flash
10. **Shops** \u2192 Content Types: Image Ad, Contact Card (Listing), News Flash
11. **Businesses** \u2192 Content Types: Image Ad, Contact Card (Listing), News Flash
12. **Venues** \u2192 Content Types: Venue Card, Image Ad

### Content Creation Flow

**Step 1:** User selects Panel Category from dropdown
**Step 2:** Content Type dropdown populates with category-specific options
**Step 3:** User selects Content Type
**Step 4:** User taps "Create New Content" button
**Step 5:** Navigate to sport/activity-specific creation form (references `EVENT_GENERATION_LOGIC.md`)

**Example: Creating a Match in Sports Category**
1. Panel Category: Sports
2. Content Type: Match
3. Form Fields:
   - Sport (dropdown: Soccer, Basketball, Netball, etc.)
   - Match Title
   - Date & Time
   - Venue (dropdown from `venues` table)
   - Teams (Team 1, Team 2)
   - Entry Fee (Pula)
   - Registration Deadline
   - Rules Template (Timer Split, Set Cap, etc.)
   - Visibility (Public, Private)
   - Poster Image (WebP upload)
4. Save as Draft or Publish Immediately
5. Option to Schedule for future publishing

---

## 2. BILLING SECTION

**Purpose:** Track all commission-generating items and display earnings

### Interface Structure

**Collapsed State:**
```
\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 + Billing                                  \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
```

**Expanded State:**
```
\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 - Billing                                  \u2502
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 Total Earnings: P 1,250.00                 \u2502
\u2502 (Green #70AD47, 18pt Bold)                 \u2502
\u2502                                            \u2502
\u2502 Breakdown by Transaction Type:             \u2502
\u2502 \u2022 Venue Bookings (5%): P 850.00          \u2502
\u2502   (17 confirmed bookings)                  \u2502
\u2502 \u2022 Sponsorships (5%): P 300.00            \u2502
\u2502   (6 contributions)                        \u2502
\u2502 \u2022 Other: P 100.00                        \u2502
\u2502                                            \u2502
\u2502 [View Transaction History]                 \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
```

### Data Source

**Table:** `billing_ledger`
**Calculation:** Sum of `commission_amount` where `user_id = current_user` and `status = \"paid\"`

### Transaction History View

**Tap "View Transaction History":** Opens paginated list of all transactions

**Transaction List Item:**
```
\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 Venue Booking - Block 3 Field              \u2502
\u2502 Date: 2026-02-10                           \u2502
\u2502 Amount: P 200.00                           \u2502
\u2502 Commission (5%): P 10.00                   \u2502
\u2502 Status: Paid                               \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
```

---

## 3. PANEL CATEGORY MANAGEMENT

**Purpose:** Organize user content by panel category with Stats, Book Keeping, and Created Cards

### Interface Structure

**Collapsed State:**
```
\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 + Panel Categories                         \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
```

**Expanded State (Showing 12 Categories):**
```
\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 - Panel Categories                         \u2502
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 + Sports (12 cards)                        \u2502
\u2502 + Hobbies (5 cards)                        \u2502
\u2502 + Leisure (3 cards)                        \u2502
\u2502 + Lessons (8 cards)                        \u2502
\u2502 + Events (15 cards)                        \u2502
\u2502 + Groups (2 cards)                         \u2502
\u2502 + Mine (25 cards)                          \u2502
\u2502 + Community (7 cards)                      \u2502
\u2502 + Shopping (0 cards)                       \u2502
\u2502 + Shops (1 card)                           \u2502
\u2502 + Businesses (4 cards)                     \u2502
\u2502 + Venues (6 cards)                         \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
```

### Individual Category Expanded View

**Example: Sports Category Expanded**
```
\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 - Sports (12 cards)                        \u2502
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 [Stats Button]                             \u2502
\u2502 [Book Keeping Button] (Venues only)        \u2502
\u2502                                            \u2502
\u2502 Created Cards (12):                        \u2502
\u2502 \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502
\u2502 \u2502 Sunday Social Soccer      [\u270f\ufe0f Edit] \u2502 \u2502
\u2502 \u2502 Status: Published                  \u2502 \u2502
\u2502 \u2502 Views: 245 | Joins: 18             \u2502 \u2502
\u2502 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2502
\u2502 \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502
\u2502 \u2502 Basketball Tournament     [\u270f\ufe0f Edit] \u2502 \u2502
\u2502 \u2502 Status: Scheduled (Feb 20)         \u2502 \u2502
\u2502 \u2502 Views: 0 | Joins: 0                \u2502 \u2502
\u2502 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2502
\u2502 ... (10 more cards, infinite scroll)       \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
```

**Button Visibility:**
- **Stats Button:** Visible for all categories
- **Book Keeping Button:** Only visible for Venues category (Business profiles only)

---

## 4. STATS FEATURE (200 KPIs)

**Purpose:** Provide comprehensive analytics for data-driven content optimization

### Stats Dashboard Interface

**Tap "Stats" Button:** Opens full-screen stats dashboard for selected category

**Dashboard Layout:**
```
\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 Stats: Sports Category                     \u2502
\u2502 [X Close]                                  \u2502
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 General KPIs                               \u2502
\u2502 \u2022 Total Views: 1,245                     \u2502
\u2502 \u2022 Unique Viewers: 892                   \u2502
\u2502 \u2022 Engagement Rate: 14.2%                \u2502
\u2502 \u2022 Conversion Rate: 7.3%                 \u2502
\u2502 ... (6 more general KPIs)                  \u2502
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 Geographic KPIs                            \u2502
\u2502 \u2022 Top Cities: Gaborone (65%), Francistown\u2502
\u2502 \u2022 Top Areas: Block 3 (22%), Broadhurst  \u2502
\u2502 \u2022 Local vs Regional: 80% local, 20% reg \u2502
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 Demographic KPIs                           \u2502
\u2502 \u2022 Age Groups: 18-24 (45%), 25-34 (30%)  \u2502
\u2502 \u2022 Gender: Male (60%), Female (38%)      \u2502
\u2502 \u2022 Profile Types: User (70%), Guardian   \u2502
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 Temporal KPIs                              \u2502
\u2502 [Line Graph: Views over time]              \u2502
\u2502 \u2022 Peak Hours: 18:00-20:00               \u2502
\u2502 \u2022 Growth Rate: +12% week-over-week     \u2502
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 Engagement KPIs                            \u2502
\u2502 \u2022 Joins: 89                             \u2502
\u2502 \u2022 RSVPs: 124                            \u2502
\u2502 \u2022 Click-Through Rate: 8.5%              \u2502
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 Comparative KPIs                           \u2502
\u2502 \u2022 vs Similar Content: +15% above avg    \u2502
\u2502 \u2022 Rank in Category: #3 of 245           \u2502
\u2502 \u2022 Percentile: Top 2%                    \u2502
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 Advanced KPIs                              \u2502
\u2502 \u2022 Device Types: Mobile (95%), Desktop   \u2502
\u2502 \u2022 Repeat Viewer Rate: 32%               \u2502
\u2502 \u2022 Avg Session Depth: 2.4 pages          \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
```

### KPI Categories (200 Total)

**Data Source:** `content_stats.kpi_data` object (see `MIZANO_DATA_SCHEMA.md` Section 4.8)

**7 KPI Categories:**
1. **General (10 KPIs):** Total views, unique viewers, engagement rate, conversion rate, avg view duration, bounce rate, share count, favorite count, comment count, report count
2. **Geographic (3 KPIs):** Top cities, top areas, local vs regional breakdown
3. **Demographic (3 KPIs):** Age groups, gender breakdown, profile types
4. **Temporal (6 KPIs):** Hourly views, daily views, weekly views, monthly views, peak hours, growth rate
5. **Engagement (6 KPIs):** Joins, RSVPs, votes, bookings, purchases, click-through rate
6. **Comparative (3 KPIs):** vs similar content, rank in category, percentile
7. **Advanced (4 KPIs):** Device types, referral sources, repeat viewer rate, avg session depth

**Total:** 35 primary KPIs + 165 granular sub-metrics = 200 KPIs

**Visualization:**
- Text-based metrics (lightweight, low-data)
- Simple line/bar charts for temporal data (ASCII or minimal SVG)
- Percentage breakdowns for demographics

---

## 5. BOOK KEEPING FEATURE (Venues Only)

**Purpose:** Venue-specific booking management for Business profiles

**Visibility:** Only appears in Venues category for Business profiles

### Interface Structure

**Tap "Book Keeping" Button:** Opens venue booking management interface

**Dashboard Layout:**
```
\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 Book Keeping: Block 3 Community Field      \u2502
\u2502 [X Close]                                  \u2502
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 Booking Setup                              \u2502
\u2502 \u2022 Pricing: P 50/hour                    \u2502
\u2502 \u2022 Availability: Mon-Sun 06:00-22:00     \u2502
\u2502 \u2022 Description: Floodlit field, changing \u2502
\u2502   rooms, parking                           \u2502
\u2502 \u2022 Image: [Upload WebP]                  \u2502
\u2502 [Edit Venue Details]                       \u2502
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 Pending Bookings (3)                       \u2502
\u2502 \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502
\u2502 \u2502 Feb 18, 18:00-20:00 (2 hrs)        \u2502 \u2502
\u2502 \u2502 User: John Doe                     \u2502 \u2502
\u2502 \u2502 Contact: [\ud83d\udcac WhatsApp] [\ud83d\udcde Call]    \u2502 \u2502
\u2502 \u2502 Total: P 100 | Commission: P 5     \u2502 \u2502
\u2502 \u2502 [Confirm] [Cancel]                 \u2502 \u2502
\u2502 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2502
\u2502 ... (2 more pending bookings)              \u2502
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 Confirmed Bookings (17)                    \u2502
\u2502 [View All]                                 \u2502
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 Cancelled Bookings (2)                     \u2502
\u2502 [View All]                                 \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
```

### Booking Confirmation Workflow

**15-Minute Auto-Confirmation:**
1. User initiates booking via WhatsApp (external to app)
2. Booking appears in \"Pending Bookings\" with status `\"pending\"`
3. Venue owner has 15 minutes to tap \"Confirm\" or \"Cancel\"
4. If no action within 15 minutes, booking auto-confirms (status \u2192 `\"confirmed\"`)
5. Confirmed bookings trigger 5% commission calculation
6. Commission appears in Billing section

**Manual Actions:**
- **Confirm:** Immediately confirms booking, triggers commission
- **Cancel:** Cancels booking, no commission charged

---

## 6. CREATED CARDS MANAGEMENT

**Purpose:** Edit, delete, schedule, and manage all user-created content

### Card List Interface

**Display:** Infinite scroll list of user's cards per category
**Sorting:** Most recent first (by `published_at` or `last_edited_at`)

**Card List Item:**
```
\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 Sunday Social Soccer              [\u270f\ufe0f Edit] \u2502
\u2502 Status: Published                          \u2502
\u2502 Published: Feb 10, 2026                    \u2502
\u2502 Views: 245 | Joins: 18                     \u2502
\u2502 Last edited: Feb 12, 2026                  \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
```

### Edit Icon Behavior

**Icon:** Pencil symbol (\u270f\ufe0f), 20\u00d720px, Blue `#4472C4`
**Position:** Top-right corner of card list item
**Tap Action:** Navigate to Edit Card interface

### Edit Card Interface

**Layout:** Full-screen form with all card fields pre-filled

**Example: Editing a Match Card**
```
\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 Edit Match: Sunday Social Soccer           \u2502
\u2502 [X Close]                                  \u2502
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 Match Title: [Sunday Social Soccer]        \u2502
\u2502 Sport: [Soccer \u25bc]                        \u2502
\u2502 Date: [2026-02-16]                         \u2502
\u2502 Time: [18:00]                              \u2502
\u2502 Venue: [Block 3 Field \u25bc]                 \u2502
\u2502 Entry Fee: [P 20]                          \u2502
\u2502 ... (all other fields)                     \u2502
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 [Update] [Save as Draft] [Delete]          \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
```

**Actions:**
- **Update:** Save changes and republish (updates `last_edited_at`, shows \"Last edited [time]\" badge for 24 hours)
- **Save as Draft:** Save changes but unpublish (status \u2192 `\"draft\"`)
- **Delete:** Delete card permanently (confirmation dialog required)

### Card States

**Draft:** Not visible in public feeds, only in Content Manager
**Published:** Live in public feeds
**Scheduled:** Will publish at `scheduled_publish` timestamp
**Archived:** Hidden from public feeds, preserved in Content Manager

---

## 7. 25 SAMPLE CARDS

**Purpose:** Pre-populated demo cards for user education and edit workflow demonstration

### Sample Card Distribution

**Total:** 25 cards across all card types

1. **Standard Match Cards (5):**
   - Sunday Social Soccer (Published)
   - Basketball Tournament (Scheduled)
   - Netball League Match (Published)
   - Volleyball Friendly (Draft)
   - Rugby Sevens (Published)

2. **Registration-State Cards (3):**
   - Annual Sports Day (Published, Closing in 5 days)
   - Chess Competition (Published, Closing Today)
   - Swimming Gala (Draft)

3. **Match-Making Cards (3):**
   - Need Goalie for Sunday (Published, Call-Out Active)
   - Looking for Tennis Partner (Published)
   - Volunteers Needed for Marathon (Draft)

4. **Training/Lesson Progress Cards (2):**
   - Guitar Lessons - Week 3 (Published)
   - Yoga Progress Tracker (Published)

5. **Standard Lesson Cards (2):**
   - Beginner Swimming Lessons (Published)
   - Advanced Piano Course (Scheduled)

6. **News Flash Cards (2):**
   - BFA Announces New League (Published)
   - Community Field Renovations (Published)

7. **Quick Poll/Vote Cards (2):**
   - MVP of the Month (Published, Active)
   - Best Local Venue (Draft)

8. **Event Invite/Ad Cards (2):**
   - Charity Fun Run (Published)
   - Sports Equipment Sale (Scheduled)

9. **Venue Cards (4):**
   - Block 3 Community Field (Published)
   - Broadhurst Basketball Court (Published)
   - Gaborone Sports Hall (Draft)
   - Village Green Open Field (Published)

**All cards are fully editable** with complete user experience for editing, scheduling, and reposting.

**Storage:** `user_content` table with `panel_category` and `content_type` fields
**Visibility:** Appear in respective Panel Category sections in Content Manager

---

## Technical Implementation Notes

### Data Flow

1. **Create Content:** User fills form \u2192 Data saved to `user_content` table \u2192 Card appears in feed (if published) and Content Manager
2. **Edit Content:** User taps Edit icon \u2192 Form pre-filled from `user_content` \u2192 User modifies \u2192 Update `user_content` and `last_edited_at`
3. **Stats Calculation:** Backend aggregates data from user interactions \u2192 Stores in `content_stats.kpi_data` \u2192 Pulled on Stats dashboard load
4. **Billing Tracking:** Confirmed bookings trigger commission calculation \u2192 Entry added to `billing_ledger` \u2192 Displayed in Billing section

### Offline Support

- **Create/Edit:** Full offline support (saved to IndexedDB, synced on next connection)
- **Stats:** Partial offline (cached last sync, updated when online)
- **Billing:** Partial offline (cached last sync, updated when online)
- **Book Keeping:** Requires online for real-time booking confirmations

### Performance Considerations

- **200 KPIs:** Pre-aggregated on backend, not calculated real-time
- **Infinite Scroll:** Paginated loading (20 cards per load)
- **Stats Visualization:** Lightweight text-based metrics, minimal charts

---

## User Flows

### Flow 1: Creating a New Match

1. Tap Hamburger Menu (\u2630) \u2192 Manager
2. Expand \"Create\" section
3. Select Panel Category: Sports
4. Select Content Type: Match
5. Tap \"Create New Content\"
6. Fill match form (sport, title, date, venue, etc.)
7. Tap \"Publish\" or \"Save as Draft\"
8. Card appears in Sports feed (if published) and Content Manager \u2192 Sports \u2192 Created Cards

### Flow 2: Editing an Existing Card

1. Tap Hamburger Menu (\u2630) \u2192 Manager
2. Expand \"Panel Categories\"
3. Expand \"Sports\"
4. Scroll to desired card in \"Created Cards\" list
5. Tap Edit icon (\u270f\ufe0f)
6. Modify fields as needed
7. Tap \"Update\" to republish or \"Save as Draft\" to unpublish
8. Card updates in feed with \"Last edited [time]\" badge (24-hour visibility)

### Flow 3: Viewing Stats

1. Tap Hamburger Menu (\u2630) \u2192 Manager
2. Expand \"Panel Categories\"
3. Expand \"Sports\"
4. Tap \"Stats\" button
5. View 200 KPIs across 7 categories
6. Scroll through General, Geographic, Demographic, Temporal, Engagement, Comparative, Advanced KPIs
7. Tap \"Close\" to return to Content Manager

### Flow 4: Managing Venue Bookings (Business Profile)

1. Tap Hamburger Menu (\u2630) \u2192 Manager
2. Expand \"Panel Categories\"
3. Expand \"Venues\"
4. Tap \"Book Keeping\" button
5. View pending bookings (3 pending)
6. Tap \"Confirm\" on a booking \u2192 Booking confirmed, commission calculated
7. View confirmed bookings list
8. Tap \"Close\" to return to Content Manager

---

## Accessibility & Usability

- **Collapsible Sections:** Reduce screen clutter, focus on relevant content
- **Touch Targets:** Minimum 44px height for all buttons and interactive elements
- **Visual Hierarchy:** Bold headings, clear section separators, consistent spacing
- **Offline Indicators:** Greyed-out buttons with \"Will sync when online\" tooltips
- **Error Handling:** Validation messages for required fields, confirmation dialogs for destructive actions (delete)

---

## Future Enhancements

- **Bulk Actions:** Select multiple cards for batch editing or deletion
- **Advanced Filtering:** Filter Created Cards by status, date range, engagement metrics
- **Export Stats:** Download KPI data as CSV or PDF
- **Automated Insights:** AI-generated recommendations based on stats (\"Post at 18:00 for 20% more engagement\")
- **Revenue Projections:** Forecast earnings based on historical commission data
