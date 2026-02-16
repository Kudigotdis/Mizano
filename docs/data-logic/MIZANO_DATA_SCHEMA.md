MIZANO_DATA_SCHEMA.md

# MIZANO DATA SCHEMA
**Version 2.0 | February 2026**

---

## 📋 DOCUMENT CONTROL

| | |
|---|---|
| **Version** | 2.0 |
| **Last Updated** | February 15, 2026 |
| **Related Documents** | PROJECT_SUMMARY.md v2.0, OFFLINE_SYNC_LOGIC_FLOWCHART.pdf, MIZANO_DESIGN_GUIDE.md v1.0, MIZANO_PAGE_FLOW_ARCHITECTURE.md v1.0 |
| **Storage Technologies** | IndexedDB (primary offline store), LocalStorage (preferences), Google Sheets API v4 (cloud master) |
| **Core Principle** | Offline-first, device-only sensitive data, sync via 15-min cycles |

---

## 1. OVERVIEW

Mizano uses a **hybrid data architecture**:

- **Local (Device):** IndexedDB stores all application data for offline use. Medical/health information is **never** synced to the cloud.
- **Cloud (Master):** Google Sheets (via API v4) acts as the central authority, aggregating data from all devices.
- **Sync Layer:** A background process pushes local changes and pulls remote updates every 15 minutes (or on demand).

This document defines every data entity, its fields, sync behavior, and relationship to the Google Sheets master columns.

---

## 2. ENTITY RELATIONSHIP DIAGRAM (Conceptual)

```
┌─────────────────────────────────────────────────────────────────┐
│                           USER PROFILES                          │
│  (Browser, User, Player, Mentor, Guardian, Creator, Staff, etc.)│
└───────────────┬─────────────────┬─────────────────┬─────────────┘
                │                 │                 │
                ▼                 ▼                 ▼
┌───────────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   MATCH ROSTERS       │ │ EQUIPMENT LEDGER│ │ BORROW SCORES   │
│   (Activity sign-ups) │ │ (Borrow/Return) │ │ (Calculated)    │
└───────────────────────┘ └─────────────────┘ └─────────────────┘
                │                 │                 │
                ▼                 ▼                 ▼
┌───────────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   ACTIVITIES          │ │ BULLETIN POSTS  │ │ NOTIFICATIONS   │
│   (Events/Competitions│ │ (Community feed)│ │ (Alerts/Updates)│
└───────────────────────┘ └─────────────────┘ └─────────────────┘
                │                 │                 │
                ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                     ENTITY PAGES & PROFILES                      │
│  (Schools, Groups, Businesses, Associations, Venues, etc.)       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. COMMON SYNC METADATA FIELDS

Every IndexedDB object store that participates in sync **MUST** include the following fields. They enable queue management, conflict resolution, and error handling.

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `local_id` | `number` (auto-increment) | Unique identifier within the device. | `1001` |
| `cloud_id` | `string` or `null` | Corresponding row ID in Google Sheets. `null` if not yet synced. | `"row_abc123"` |
| `last_modified` | `timestamp` | When the record was last changed locally (milliseconds since epoch). | `1707897600000` |
| `sync_status` | `string` | `"pending"` \| `"synced"` \| `"conflict"` \| `"error"` | `"pending"` |
| `sync_attempts` | `number` | Number of failed sync attempts (max 3). | `0` |
| `created_at` | `timestamp` | When the record was first created locally. | `1707897600000` |

**Conflict Resolution Rule:** During pull, if `cloud.last_modified` > `local.last_modified + 5 seconds`, a conflict is declared and resolved according to entity‑specific rules (see Section 10 of Sync Logic).

---

## 4. ENTITY DETAILS

### 4.1 User & Profile Management

#### `users` (Base Authentication)

Stores core authentication data from Firebase (cached locally).

| Field | Type | Description | Sync |
|-------|------|-------------|------|
| `local_id` | `number` | PK | – |
| `uid` | `string` | Firebase UID | both |
| `whatsapp_number` | `string` | +267XXXXXXXX | both |
| `email` | `string` | optional | both |
| `display_name` | `string` | full name | both |
| `avatar_url` | `string` | WebP link (<30KB) | both |
| `profile_type` | `string` | `"browser"` \| `"user"` \| `"player"` \| `"mentor"` \| `"guardian"` \| `"creator"` \| `"staff"` \| `"admin"` | both |
| `guardian_id` | `string` (uid) | If minor, link to Guardian's UID | both |
| `date_of_birth` | `string` (ISO) | for age verification | both |
| `village_town` | `string` | e.g., "Gaborone · Block 3" | both |
| `preferences` | `object` | JSON for notification settings, dark mode, etc. | LocalStorage only |
| **sync metadata** | – | all standard fields | – |

#### `user_profiles` (Extended Profile Data)

Additional data depending on `profile_type`. Stored as a JSON blob to keep the schema flexible, but key fields are indexed for search.

| Field | Type | Description | Sync |
|-------|------|-------------|------|
| `local_id` | `number` | PK | – |
| `uid` | `string` | references `users.uid` | both |
| `profile_data` | `object` | type-specific: e.g., for `"player"`: `{ sports: [], positions: [], borrow_score: 4.2, equipment_owned: [] }`<br>for `"mentor"`: `{ certifications: [], availability: [] }`<br>for `"guardian"`: `{ linked_minors: [] }`<br>for `"creator"`: `{ managed_events: [] }` | both |
| `medical_info` | `object` | **DEVICE ONLY** – never synced. Contains health conditions, HIV status, allergies, emergency contacts. | none |
| `academic_alerts` | `boolean` | If Guardian pauses joins due to low grades | both (via school linkage) |
| `borrow_score` | `number` | cached from `borrow_scores` | pull only |
| `restriction_flag` | `boolean` | true if borrow score too low | pull only |
| **sync metadata** | – | all standard fields | – |

#### `school_links` (Guardian‑School‑Student Handshake)

| Field | Type | Description | Sync |
|-------|------|-------------|------|
| `local_id` | `number` | PK | – |
| `student_uid` | `string` | references `users.uid` (must be minor) | both |
| `school_id` | `string` | from `schools.cloud_id` | both |
| `guardian_uid` | `string` | references `users.uid` | both |
| `grade_year` | `string` | e.g., "Form 3" | both |
| `house_color` | `string` | inter‑house competition | both |
| `teacher_lead` | `string` | uid of teacher/coach | both |
| `approval_status` | `string` | `"pending"` \| `"approved"` \| `"rejected"` | both |
| `approved_at` | `timestamp` | when Guardian approved | both |
| **sync metadata** | – | all standard fields | – |

> **Note:** The Google Sheets master uses columns AM–AZ for school linkage and safety:
> - `AM` = SchoolID
> - `AN` = GradeYear
> - `AO` = TeacherLead (uid)
> - `AP` = HouseColor
> - `AQ` = NationalLeagueID
> - `AR` = AcademicAlert (Primary boolean)
> - `AZ` = AcademicAlert (Secondary/Redundant sync)

---

### 4.2 Match & Activity Management

#### `activities` (Events / Competitions)

Created via Event Lab. Can be a single match, tournament, lesson, etc.

| Field | Type | Description | Sync |
|-------|------|-------------|------|
| `local_id` | `number` | PK | – |
| `activity_id` | `string` | human‑readable slug (e.g., "sunday-social-2026") | both |
| `title` | `string` | competition name | both |
| `sport` | `string` | from 115+ sport list | both |
| `activity_type` | `string` | `"match"` \| `"tournament"` \| `"lesson"` \| `"poll"` \| `"news"` \| … | both |
| `organizer_uid` | `string` | Creator's UID | both |
| `status` | `string` | `"draft"` \| `"published"` \| `"live"` \| `"finished"` \| `"cancelled"` | both |
| `start_time` | `timestamp` | scheduled start | both |
| `end_time` | `timestamp` | scheduled end | both |
| `venue_id` | `string` (cloud_id) | references `venues` | both |
| `location_name` | `string` | e.g., "Block 3 Field" | both |
| `entry_fee` | `number` | Pula amount | both |
| `capacity` | `object` | `{ min_players, max_players, per_team }` | both |
| `registration_deadline` | `timestamp` | – | both |
| `rules_template` | `string` | e.g., `"timer_split"`, `"set_cap"`, … | both |
| `rules` | `object` | JSON of sport‑specific rules (periods, overtime, etc.) | both |
| `mizano_fund` | `object` | `{ purpose, target_amount, collected_amount, payment_channels }` | both |
| `recruitment` | `object` | `{ positions_needed, equipment_wishlist, call_outs }` | both |
| `format` | `object` | `{ type: "knockout" \| "round_robin" …, fixtures }` | both |
| `visibility` | `string` | `"public"` \| `"private"` (group only) | both |
| `poster_url` | `string` | WebP image link | both |
| **sync metadata** | – | all standard fields | – |

#### `match_rosters` (Participants)

| Field | Type | Description | Sync Priority |
|-------|------|-------------|---------------|
| `local_id` | `number` | PK | – |
| `match_id` | `string` (cloud_id) | references `activities` | P0 |
| `user_id` | `string` (uid) | participant UID | P0 |
| `team` | `string` | e.g., "Team A", "Red House", or `null` | P0 |
| `position` | `string` | e.g., "Goalkeeper" | P0 |
| `join_time` | `timestamp` | when user joined | P0 |
| `status` | `string` | `"confirmed"` \| `"pending"` (guardian approval) \| `"waiting_list"` \| `"cancelled"` | P0 |
| `guardian_approved` | `boolean` | for minors | P0 |
| `approved_at` | `timestamp` | when guardian approved | P0 |
| **sync metadata** | – | all standard fields | – |

---

### 4.3 Equipment & Borrowing

#### `equipment_ledger`

Tracks every borrow/return transaction at Game Cubes.

| Field | Type | Description | Sync Priority |
|-------|------|-------------|---------------|
| `local_id` | `number` | PK | – |
| `item_id` | `string` | e.g., QR code value | P0 |
| `item_name` | `string` | e.g., "Soccer Ball size 5" | P0 |
| `borrower_id` | `string` (uid) | who borrowed | P0 |
| `checkout_time` | `timestamp` | when item was taken | P0 |
| `checkin_time` | `timestamp` | `null` if not yet returned | P0 |
| `expected_return` | `timestamp` | deadline | P0 |
| `borrower_rating` | `number` (1‑5) | rated by staff/lender | P0 |
| `lender_rating` | `number` (1‑5) | rated by borrower | P0 |
| `staff_override` | `boolean` | true if staff manually adjusted | P0 |
| `item_status` | `string` | `"available"` \| `"borrowed"` \| `"damaged"` \| `"lost"` | P0 |
| `condition_notes` | `string` | staff comments | P0 |
| **sync metadata** | – | all standard fields | – |

#### `borrow_scores`

Derived from ledger; recalculated on cloud and pulled down.

| Field | Type | Description | Sync Priority |
|-------|------|-------------|---------------|
| `local_id` | `number` | PK | – |
| `user_id` | `string` (uid) | the borrower | P1 |
| `avg_rating` | `number` | average of lender ratings | P1 |
| `borrow_count` | `number` | total completed check‑ins | P1 |
| `score` | `number` | weighted score (capped 5.0) | P1 |
| `restriction_flag` | `boolean` | true if score < 3.0 and borrow_count > 5 | P1 |
| `last_calculated` | `timestamp` | when cloud recalc ran | P1 |
| **sync metadata** | – | all standard fields | – |

---

### 4.4 Community & Content

#### `bulletin_posts`

Text‑only community posts (jobs, lost & found, announcements).

| Field | Type | Description | Sync Priority |
|-------|------|-------------|---------------|
| `local_id` | `number` | PK | – |
| `post_id` | `string` | cloud ID after moderation | P1 |
| `user_id` | `string` (uid) | author | P1 |
| `content` | `string` | max 500 chars | P1 |
| `category` | `string` | `"general"` \| `"lost_found"` \| `"job"` \| `"funeral"` \| … | P1 |
| `timestamp` | `timestamp` | when submitted | P1 |
| `moderation_status` | `string` | `"pending"` \| `"approved"` \| `"rejected"` | P1 |
| `image_url` | `string` | optional WebP (<200KB) | P1 (only when approved) |
| `boost_paid` | `boolean` | if P2 fee paid for area‑wide call‑out | P1 |
| **sync metadata** | – | all standard fields | – |

#### `notifications`

Push and in‑app notifications.

| Field | Type | Description | Sync Priority |
|-------|------|-------------|---------------|
| `local_id` | `number` | PK | – |
| `notification_id` | `string` | cloud ID | P2 |
| `user_id` | `string` (uid) | target user | P2 |
| `type` | `string` | `"join_approved"` \| `"match_starting"` \| `"equipment_available"` \| `"sponsorship"` \| `"injury_alert"` \| … | P2 |
| `title` | `string` | short summary | P2 |
| `body` | `string` | details | P2 |
| `data` | `object` | deep link context (e.g., `{ activity_id: … }`) | P2 |
| `priority` | `string` | `"critical"` \| `"high"` \| `"low"` | P2 |
| `read` | `boolean` | local only | none |
| `created_at` | `timestamp` | when generated | P2 |
| **sync metadata** | – | all standard fields | – |

---

### 4.5 Schools & Education

#### `schools`

Educational Institution profiles.

| Field | Type | Description | Sync |
|-------|------|-------------|------|
| `local_id` | `number` | PK | – |
| `school_id` | `string` | unique identifier (e.g., "SCH-GAB-WEST-01") | both |
| `name` | `string` | school name | both |
| `type` | `string` | `"primary"` \| `"secondary"` \| `"combined"` | both |
| `location` | `string` | village/town | both |
| `contact_whatsapp` | `string` | +267… | both |
| `contact_email` | `string` | – | both |
| `logo_url` | `string` | WebP | both |
| `is_government` | `boolean` | determines free tier | both |
| **sync metadata** | – | all standard fields | – |

#### `teachers` (sub‑profile)

| Field | Type | Description | Sync |
|-------|------|-------------|------|
| `local_id` | `number` | PK | – |
| `teacher_uid` | `string` | references `users.uid` | both |
| `school_id` | `string` | references `schools.school_id` | both |
| `subjects` | `array` | e.g., `["Mathematics", "Physical Education"]` | both |
| `classes` | `array` | list of class names/grades | both |
| **sync metadata** | – | all standard fields | – |

#### `students` (sub‑profile)

| Field | Type | Description | Sync |
|-------|------|-------------|------|
| `local_id` | `number` | PK | – |
| `student_uid` | `string` | references `users.uid` | both |
| `school_id` | `string` | references `schools.school_id` | both |
| `grade_year` | `string` | e.g., "Form 3" | both |
| `house_color` | `string` | inter‑house group | both |
| `teacher_lead` | `string` (uid) | references `teachers.teacher_uid` | both |
| `academic_alert` | `boolean` | true if grades low (Guardian‑set) | both |
| **sync metadata** | – | all standard fields | – |

---

### 4.6 Commerce & Sponsorships

#### `businesses`

Paid profiles for city businesses.

| Field | Type | Description | Sync |
|-------|------|-------------|------|
| `local_id` | `number` | PK | – |
| `business_id` | `string` | cloud ID | both |
| `name` | `string` | business name | both |
| `owner_uid` | `string` | references `users.uid` | both |
| `category` | `string` | e.g., `"gym"`, `"clinic"`, `"bakery"` | both |
| `verified` | `boolean` | true if paid subscription | both |
| `services` | `array` | list of offered services | both |
| `location` | `string` | village/town | both |
| `whatsapp` | `string` | contact number | both |
| `facebook_page` | `string` | URL | both |
| **sync metadata** | – | all standard fields | – |

#### `sponsorship_requests`

Requests from Creators to Businesses/Individuals.

| Field | Type | Description | Sync |
|-------|------|-------------|------|
| `local_id` | `number` | PK | – |
| `request_id` | `string` | cloud ID | both |
| `activity_id` | `string` | references `activities` | both |
| `sponsor_id` | `string` | references `businesses.business_id` or `users.uid` | both |
| `tier` | `string` | `"title"` \| `"equipment"` \| `"community"` | both |
| `amount` | `number` | Pula | both |
| `status` | `string` | `"pending"` \| `"accepted"` \| `"declined"` | both |
| `created_at` | `timestamp` | – | both |
| **sync metadata** | – | all standard fields | – |

#### `wishlist_items`

Equipment needed by groups/activities.

| Field | Type | Description | Sync |
|-------|------|-------------|------|
| `local_id` | `number` | PK | – |
| `item_id` | `string` | cloud ID | both |
| `owner_type` | `string` | `"activity"` \| `"group"` | both |
| `owner_id` | `string` | references `activities` or `groups` | both |
| `item_name` | `string` | e.g., "Football Boots size 9" | both |
| `target_amount` | `number` | Pula needed | both |
| `collected_amount` | `number` | Pula raised | both |
| **sync metadata** | – | all standard fields | – |

---

### 4.7 Venues

#### `venues`

Physical locations (fields, courts, halls).

| Field | Type | Description | Sync |
|-------|------|-------------|------|
| `local_id` | `number` | PK | – |
| `venue_id` | `string` | cloud ID | both |
| `name` | `string` | e.g., "Block 3 Community Field" | both |
| `owner_uid` | `string` | references `users.uid` (Business profile) | both |
| `location` | `string` | village/town + area | both |
| `coordinates` | `object` | `{ lat, lng }` | both |
| `venue_types` | `array` | e.g., `["open field", "basketball court", "hall"]` | both |
| `activities_supported` | `array` | sports/activities hosted | both |
| `description` | `string` | venue details, amenities, capacity | both |
| `image_url` | `string` | WebP image (16:9 aspect ratio) | both |
| `amenities` | `array` | e.g., `["floodlights", "changing rooms", "parking"]` | both |
| `contact_phone` | `string` | call number | both |
| `contact_whatsapp` | `string` | WhatsApp number for booking | both |
| `contact_facebook` | `string` | Facebook page ID or URL | both |
| `price_per_hour` | `number` | Pula (if paid booking) | both |
| `booking_commission_rate` | `number` | % (default 5) | both |
| `is_promoted` | `boolean` | free promotion flag (default true) | both |
| **sync metadata** | – | all standard fields | – |

#### `venue_bookings`

Booking records for venue reservations (5% commission tracking).

| Field | Type | Description | Sync |
|-------|------|-------------|------|
| `local_id` | `number` | PK | – |
| `booking_id` | `string` | cloud ID | both |
| `venue_id` | `string` | references `venues.venue_id` | both |
| `user_id` | `string` | booker UID | both |
| `booking_date` | `string` | YYYY-MM-DD | both |
| `booking_time` | `string` | HH:MM (24-hour format) | both |
| `duration_hours` | `number` | booking length | both |
| `total_price` | `number` | Pula | both |
| `commission_amount` | `number` | 5% of total (calculated) | both |
| `status` | `string` | `"pending"` \| `"confirmed"` \| `"cancelled"` | both |
| `confirmed_at` | `timestamp` | when venue owner confirmed | both |
| `cancelled_at` | `timestamp` | if cancelled | both |
| `cancellation_reason` | `string` | optional | both |
| **sync metadata** | – | all standard fields | – |

**Booking Confirmation Workflow:**
- User initiates booking via WhatsApp (external to app)
- Venue owner has 15 minutes to confirm or cancel
- If not cancelled within 15 minutes, booking is automatically confirmed
- Confirmed bookings sync to system and trigger 5% commission calculation
- Booking appears in venue owner's Book Keeping section (Content Manager)

---

### 4.8 Content Manager Data

#### `user_content`

User-created content across all panel categories.

| Field | Type | Description | Sync |
|-------|------|-------------|------|
| `local_id` | `number` | PK | – |
| `content_id` | `string` | cloud ID | both |
| `user_id` | `string` | creator UID | both |
| `panel_category` | `string` | e.g., "Sports", "Hobbies", "Venues", "Lessons" | both |
| `content_type` | `string` | card type: `"match"` \| `"lesson"` \| `"venue"` \| `"poll"` \| `"news"` \| `"event"` | both |
| `content_data` | `object` | JSON of card-specific data (references `activities`, `venues`, etc.) | both |
| `status` | `string` | `"draft"` \| `"published"` \| `"archived"` | both |
| `scheduled_publish` | `timestamp` | if scheduled for future | both |
| `published_at` | `timestamp` | when went live | both |
| `last_edited_at` | `timestamp` | when last modified | both |
| `view_count` | `number` | total views | pull only |
| `engagement_count` | `number` | interactions (joins, votes, RSVPs) | pull only |
| **sync metadata** | – | all standard fields | – |

#### `content_stats`

KPI data for user-created content (200 KPIs per category).

| Field | Type | Description | Sync |
|-------|------|-------------|------|
| `local_id` | `number` | PK | – |
| `content_id` | `string` | references `user_content.content_id` | both |
| `kpi_data` | `object` | JSON of 200 KPIs (see KPI spec below) | pull only |
| `demographics` | `object` | viewer demographics (age, gender, profile type) | pull only |
| `geographic_data` | `object` | viewer locations (village/town/city, area/neighbourhood) | pull only |
| `time_series_data` | `object` | hourly, daily, weekly, monthly analytics | pull only |
| `last_calculated` | `timestamp` | when stats updated | pull only |
| **sync metadata** | – | all standard fields | – |

**200 KPIs Structure (kpi_data object):**
```json
{
  "general": {
    "total_views": 0,
    "unique_viewers": 0,
    "engagement_rate": 0.0,
    "conversion_rate": 0.0,
    "avg_view_duration": 0,
    "bounce_rate": 0.0,
    "share_count": 0,
    "favorite_count": 0,
    "comment_count": 0,
    "report_count": 0
  },
  "geographic": {
    "top_cities": [],
    "top_areas": [],
    "local_vs_regional": {"local": 0, "regional": 0, "national": 0}
  },
  "demographic": {
    "age_groups": {"under_13": 0, "13_17": 0, "18_24": 0, "25_34": 0, "35_plus": 0},
    "gender_breakdown": {"male": 0, "female": 0, "other": 0},
    "profile_types": {"browser": 0, "user": 0, "guardian": 0, "business": 0, "association": 0}
  },
  "temporal": {
    "hourly_views": [],
    "daily_views": [],
    "weekly_views": [],
    "monthly_views": [],
    "peak_hours": [],
    "growth_rate": 0.0
  },
  "engagement": {
    "joins": 0,
    "rsvps": 0,
    "votes": 0,
    "bookings": 0,
    "purchases": 0,
    "click_through_rate": 0.0
  },
  "comparative": {
    "vs_similar_content": 0.0,
    "rank_in_category": 0,
    "percentile": 0.0
  },
  "advanced": {
    "device_types": {"mobile": 0, "tablet": 0, "desktop": 0},
    "referral_sources": [],
    "repeat_viewer_rate": 0.0,
    "avg_session_depth": 0.0
  }
}
```

#### `billing_ledger`

Commission tracking for all monetization features.

| Field | Type | Description | Sync |
|-------|------|-------------|------|
| `local_id` | `number` | PK | – |
| `ledger_id` | `string` | cloud ID | both |
| `user_id` | `string` | content owner UID | both |
| `transaction_type` | `string` | `"venue_booking"` \| `"sponsorship"` \| `"ad"` \| `"other"` | both |
| `reference_id` | `string` | booking_id, activity_id, etc. | both |
| `amount` | `number` | Pula (total transaction amount) | both |
| `commission_rate` | `number` | % (e.g., 5 for venue bookings) | both |
| `commission_amount` | `number` | Pula (calculated commission) | both |
| `status` | `string` | `"pending"` \| `"paid"` \| `"disputed"` | both |
| `transaction_date` | `timestamp` | when occurred | both |
| `paid_at` | `timestamp` | when commission paid to Mizano | both |
| **sync metadata** | – | all standard fields | – |

---

### 4.9 Static & Device‑Only Data

#### `map_tiles`

Cached offline map tiles (1MB fixed region).

| Field | Type | Description | Sync |
|-------|------|-------------|------|
| `tile_key` | `string` | zoom/x/y identifier | none |
| `tile_data` | `blob` | PNG image data | none |
| `last_updated` | `timestamp` | when downloaded | none |

#### `medical_records`

**DEVICE ONLY – NEVER SYNCED**

Stored in a separate IndexedDB store with no sync metadata.

| Field | Type | Description |
|-------|------|-------------|
| `user_id` | `string` (uid) | owner |
| `conditions` | `array` | e.g., `["asthma", "diabetes"]` |
| `hiv_status` | `string` | `"positive"` \| `"negative"` \| `"undisclosed"` |
| `allergies` | `array` | e.g., `["penicillin", "peanuts"]` |
| `emergency_contact` | `string` | name + number |
| `blood_type` | `string` | A+, O−, etc. |
| `last_updated` | `timestamp` | local only |

| `last_updated` | `timestamp` | local only |

---

### 4.9 Integrated Pre-Generated Datasets (v1.5)

These datasets are injected via `index.html` and cached for read-only panel consumption.

#### `corporate_teams`
| Field | Type | Description |
|-------|------|-------------|
| `tid` | `string` | Unique Team ID (e.g., "TEAM-CORP-DEB-SOC-001") |
| `name` | `string` | Team Name |
| `category` | `string` | e.g., "Corporate" |
| `sub_category`| `string` | e.g., "Mining", "Telecom" |
| `region` | `string` | e.g., "South", "North Central" |
| `home_venue_id`| `string`| References matches |
| `roster_uids` | `array` | List of player UIDs |

#### `hobbies_leisure`
| Field | Type | Description |
|-------|------|-------------|
| `hid` | `string` | Unique Hobby ID |
| `name` | `string` | Activity name |
| `district` | `string` | Botswana district (e.g., "Kweneng") |
| `skill_level` | `string` | Beginner / Intermediate / Advanced |
| `entry_fee` | `number` | Pula |
| `whatsapp_link`| `string` | Deep link to coordinator |

### 4.10 Tracker & Goals (`tracker_entries`)

| Field | Type | Description |
|-------|------|-------------|
| `local_id` | `number` | PK |
| `user_id` | `string` | Owner |
| `goal_type` | `string` | "Skill", "Weight", "Match Wins", etc. |
| `target_value` | `number` | – |
| `current_value`| `number` | – |
| `deadline` | `timestamp`| – |
| `status` | `string` | "active", "completed", "failed" |

The cloud backend uses Google Sheets with the following column mapping. Each row represents a unique record (entity). The `ID` column (A) is the `cloud_id`.

| Column | Name | Maps To Entity/Field |
|--------|------|----------------------|
| A | `ID` | All entities – unique row ID |
| B | `EntityType` | e.g., `"match_roster"`, `"user"`, `"activity"` |
| C | `Data` | JSON payload of the record |
| D | `LastModified` | Server timestamp (used for conflict detection) |
| E | `CreatedBy` | UID of creator |
| F | `StaffOverride` | boolean (equipment ledger only) |
| G | `ModerationStatus` | bulletin_posts only |
| H | `SchoolID` | schools.school_id, student records |
| I | `GradeYear` | student.grade_year |
| J | `TeacherLead` | teacher UID |
| K | `HouseColor` | student.house_color |
| L | `NationalLeagueID` | activity league linkage |
| M | `AcademicAlert` | boolean (student.academic_alert) |
| N | `WhatsAppNumber` | user.whatsapp_number |
| O | `FBPageLink` | business.facebook_page |
| P | `GroupChatURL` | activity/group WhatsApp invite |
| Q | `PreFillMessage` | custom text for “WhatsApp Organizer” button |

> The actual column letters (A–Q) are illustrative; the production sheet may use different letters but the same logical fields.

---

## 6. ADMIN COUNTER SYSTEM

To preserve privacy while providing aggregated insights, the backend maintains **anonymous counters**. These are **not** stored in the main data tables but are computed periodically.

| Counter | Description | Example |
|---------|-------------|---------|
| `users_by_village` | number of active users per location | `{"Gaborone·Block3": 1250, "Molepolole": 430}` |
| `medical_alerts_by_village` | count of users with medical alerts (never individual data) | `{"Gaborone": 15}` |
| `borrow_score_distribution` | histogram of scores | `{"4.0-5.0": 320, "3.0-3.9": 180, ...}` |
| `active_events` | currently live/upcoming events count | `47` |

Counters are updated after each major sync batch and exposed via a separate read‑only API for dashboard display.

---

## 7. INDEXES & PERFORMANCE

To ensure offline queries are fast, the following indexes should be created in IndexedDB:

| Store | Index | Fields |
|-------|-------|--------|
| `users` | `by_uid` | `uid` |
| `users` | `by_whatsapp` | `whatsapp_number` |
| `user_profiles` | `by_uid` | `uid` |
| `activities` | `by_organizer` | `organizer_uid` |
| `activities` | `by_status` | `status` |
| `activities` | `by_start_time` | `start_time` |
| `match_rosters` | `by_match` | `match_id` |
| `match_rosters` | `by_user` | `user_id` |
| `equipment_ledger` | `by_borrower` | `borrower_id` |
| `equipment_ledger` | `by_item` | `item_id` |
| `equipment_ledger` | `by_status` | `sync_status` (for pending queue) |
| `bulletin_posts` | `by_moderation` | `moderation_status` |
| `notifications` | `by_user_read` | `[user_id, read]` |
| `school_links` | `by_student` | `student_uid` |
| `school_links` | `by_school` | `school_id` |

All sync metadata fields (`sync_status`, `sync_attempts`) should be indexed for efficient queue processing.

---

## 8. DATA FLOW SUMMARY

1. **Write (offline):**
   - User action → write to IndexedDB with `sync_status = 'pending'`, `last_modified = now()`.
   - If medical data, store only in `medical_records` (never add sync fields).

2. **Sync Trigger (every 15 min / manual):**
   - Query all stores for `sync_status = 'pending'` (ordered by `last_modified`).
   - Push each record to Google Sheets API (POST).
   - On success: update `cloud_id`, `sync_status = 'synced'`, reset `sync_attempts`.
   - On failure: increment `sync_attempts`; if ≥3, set `sync_status = 'error'` and alert admin.

3. **Pull (after push):**
   - Fetch from Google Sheets all records modified since last global sync timestamp.
   - For each record, compare timestamps:
     - If cloud newer → apply conflict resolution, update local.
     - If local newer → ignore (already pushed).
     - If conflict → use entity‑specific rules (LWW, staff override, etc.).

4. **UI Update:**
   - If user is viewing affected data, refresh the view (e.g., via live query or event).

---

## 9. APPENDIX: INDEXEDDB SCHEMA DEFINITIONS (Pseudo‑code)

```javascript
// Example for match_rosters store
const matchRosterStore = {
  name: 'match_rosters',
  keyPath: 'local_id',
  autoIncrement: true,
  indexes: [
    { name: 'by_match', keyPath: 'match_id' },
    { name: 'by_user', keyPath: 'user_id' },
    { name: 'by_sync_status', keyPath: 'sync_status' }
  ]
};

// Example for user_profiles store (with medical data excluded from sync)
const userProfileStore = {
  name: 'user_profiles',
  keyPath: 'local_id',
  autoIncrement: true,
  indexes: [
    { name: 'by_uid', keyPath: 'uid', unique: true }
  ]
  // medical_info is a field but never included in sync payload
};
```

> **Note:** All stores that sync must include the five sync metadata fields (`cloud_id`, `last_modified`, `sync_status`, `sync_attempts`, `created_at`) as top‑level properties.

---

**END OF DATA SCHEMA**

*This document defines the complete data structure for Mizano. Developers must adhere to these schemas when implementing IndexedDB stores and Google Sheets integrations. Privacy‑sensitive fields (medical) must never leave the device.*

**Document Owner:** Mizano Technical Team  
**Last Updated:** February 13, 2026  
**Version:** 2.0  
**Cross‑Reference:** PROJECT_SUMMARY.md v2.0, OFFLINE_SYNC_LOGIC_FLOWCHART.pdf, MIZANO_DESIGN_GUIDE.md v1.0, MIZANO_PAGE_FLOW_ARCHITECTURE.md v1.0