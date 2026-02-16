# MIZANO NEW FEATURES IMPLEMENTATION PACKAGE
**Version 1.0 | February 2026**

---

## 📦 FILES PROVIDED

| File | Path | Purpose |
|------|------|---------|
| `MIZANO_NEW_FEATURES_SPEC.md` | `app/docs/` | This document – full specification for all 9 new features |
| `feature_schemas.json` | `app/data/databases/` | JSON schemas for new data entities (streaks, challenges, injuries, etc.) |
| `sample_activity_suggestions.json` | `app/data/databases/` | Pre‑defined suggestions for “Activity of the Week” and seasonal prompts |
| `survey_definitions.json` | `app/data/databases/` | Survey questions for Mealfo (can be updated remotely) |
| `feature_card_designs.md` | `app/docs/` | Detailed card designs for new card types (Suggestion Card, Challenge Card, Survey Card, Stats Card) |
| `habit_chain_ui_spec.md` | `app/docs/` | UI wireframe for the Habit Chain builder |
| `streak_calendar_ui_spec.md` | `app/docs/` | UI wireframe for the Streak & Consistency calendar |
| `neighborhood_challenge_sync.md` | `app/docs/` | Sync logic for offline‑initiated challenges (location‑based) |
| `participation_stats_aggregation.md` | `app/docs/` | How to compute and sync anonymous participation heat maps |

> **Note:** All files assume the existing Mizano codebase (IndexedDB, 15‑minute sync, 7‑color system, etc.) is already in place. The AI agent should place them as indicated and update existing files where necessary.

---

## 1. STREAK & CONSISTENCY CALENDAR

### Purpose
Motivate habit formation by showing daily participation streaks across any tracked activity (from Tracker data). Displays a monthly heat‑map view where active days are shaded green.

### Location
- **Access:** From **Mine panel** → new "Streaks" tab or button.
- Alternatively, integrated into the existing Tracker section.

### Data Schema
Add a derived view or store aggregated streak data. Since streaks can be computed from existing `tracker_entries`, we can compute on‑the‑fly for performance. But for offline access and to avoid re‑scanning thousands of entries, we recommend storing a daily summary.

**New table:** `daily_activity_summary` (IndexedDB)

| Field | Type | Description |
|-------|------|-------------|
| `user_id` | string | (inherited from user) |
| `date` | string | YYYY-MM-DD |
| `activity_count` | integer | Number of logged activities on that day |
| `has_activity` | boolean | True if any activity logged |
| `last_modified` | timestamp | For sync (not synced, local only) |

- This table is populated by the Tracker whenever a new entry is added (increment `activity_count` for that day). A background process can also rebuild it if needed.

### UI Component
**Monthly Calendar View** (2D minimal, no shadows)

```
┌─────────────────────────────────────┐
│ February 2026               [<] [>]│
│ Mo Tu We Th Fr Sa Su                │
│                1  2  3  4  5        │
│  6  7  8  9 10 11 12                │
│ 13 14 15 16 17 18 19                │
│ 20 21 22 23 24 25 26                │
│ 27 28                                │
│                                     │
│ Current streak: 15 days 🔥          │
│ Longest streak: 23 days             │
└─────────────────────────────────────┘
```

- Each day cell is a 40×40 square.
- **Green fill** (#70AD47 at 70% opacity) if `has_activity` is true.
- **Tap on day** → list of activities logged that day (mini cards).
- Below calendar: streak counters.

### Integration
- Add a "Streaks" entry in the Mine panel's "My Activity Hub" section.
- No sync needed – entirely local.

---

## 2. NEIGHBORHOOD CHALLENGE BOARDS (OFFLINE‑INITIATED)

### Purpose
Users can create simple personal or small‑group challenges (“walk 10 km this week in our ward”) that are stored locally and appear as green‑bordered cards when others in the same **Places Filter** area sync.

### Data Schema
**New table:** `challenges` (IndexedDB, synced)

| Field | Type | Description |
|-------|------|-------------|
| `challenge_id` | string | Unique ID (UUID) |
| `creator_id` | string | User ID of creator |
| `title` | string | e.g., "Walk 10km this week" |
| `goal_type` | string | "distance", "duration", "steps", "custom" |
| `goal_value` | number | Target amount |
| `goal_unit` | string | e.g., "km", "minutes" |
| `participants` | array | Array of user IDs (including creator) |
| `progress` | object | Map of user_id → current value |
| `area` | string | Places Filter area code (e.g., "GC·Block3") |
| `start_date` | string | YYYY-MM-DD |
| `end_date` | string | YYYY-MM-DD |
| `status` | string | "active", "completed", "archived" |
| `sync_status` | string | "pending", "synced" |
| `last_modified` | timestamp | For sync |

**Sync Logic:**
- When user creates a challenge, it’s stored locally with `sync_status="pending"`.
- During the 15‑minute sync, challenges with `pending` are uploaded to the cloud (Google Sheets).
- The cloud stores all challenges indexed by `area`.
- When a user in the same area performs a pull sync, all active challenges from that area are downloaded and merged (based on `challenge_id`).
- Progress updates are also synced (each participant’s progress is merged; last‑write‑wins with timestamp).

### UI Component
**Challenge Card** (green border, #70AD47 at 70% opacity)

```
┌────────────────────────────────────────────┐
│ 🏆 Neighborhood Challenge                   │
│ Walk 10km this week                        │
│ Progress: 3/10 km                          │
│ Participants: You + 2 others                │
│ [Join] [View Progress]                     │
└────────────────────────────────────────────┘
```

- Appears in **Community panel** (or a new "Challenges" section under Community).
- Tapping opens a detail page with participant list and progress updates.

### Offline Behaviour
- Creating/joining a challenge works offline; the action is queued.
- Progress is tracked locally and synced later.

---

## 3. ROTATING “ACTIVITY OF THE WEEK” SUGGESTION CARDS

### Purpose
Pre‑defined rotating suggestions (e.g., “This week: try netball drills”) shown as blue‑bordered interest cards in **Mine panel** and **Notifications**. Users mark “trying it” → adds to personal Tracker goals offline.

### Data Source
The list of suggestions is stored in `sample_activity_suggestions.json` (can be updated via app update or remote config). The app selects one per week based on a simple rotation (week number modulo list length). Additionally, **Seasonal / Weather‑Linked Prompts** (Feature 5) can override or supplement.

**File: `app/data/databases/sample_activity_suggestions.json`**

```json
[
  {
    "id": "sug_001",
    "title": "Try netball drills",
    "description": "Improve your passing and footwork with these 3 basic drills.",
    "activity_type": "netball",
    "season": "all",
    "weather": "any",
    "week_offset": 0  // used for simple rotation
  },
  {
    "id": "sug_002",
    "title": "Indoor chess tournament",
    "description": "Rainy season? Gather friends for a chess challenge.",
    "activity_type": "chess",
    "season": "rainy",
    "weather": "rain",
    "week_offset": 1
  }
  // ... more
]
```

### UI Component
**Suggestion Card** (blue border, #4472C4 at 70% opacity)

```
┌────────────────────────────────────────────┐
│ 💡 Activity of the Week                     │
│ Try netball drills                         │
│ Improve your passing and footwork...       │
│ [I'll try it] [Remind me later]            │
└────────────────────────────────────────────┘
```

- Appears in **Mine panel** (top section) and also in **Notifications** (as a card).
- Tapping “I’ll try it” creates a new Tracker goal for that activity (with default settings).
- “Remind me later” dismisses the card for 24 hours (stored locally).

### Integration with Seasonal Prompts (Feature 5)
The suggestion selection logic considers:
- Current month (to determine season: e.g., Nov–Mar = rainy).
- Last known weather from `weather_cache` (if available).
- If no weather data, fall back to season rules.

---

## 4. INJURY & RECOVERY SIMPLE TRACKER

### Purpose
Offline log for noting minor injuries, rest days, physio exercises. Personal health record + optional sharing with coach/guardian via WhatsApp export.

### Location
- **Access:** New section in **Mine panel** → "Health & Recovery".

### Data Schema
**New table:** `injury_log` (IndexedDB, **not synced** – medical data stays on device)

| Field | Type | Description |
|-------|------|-------------|
| `injury_id` | string | UUID |
| `date` | string | YYYY-MM-DD |
| `description` | string | e.g., "Ankle sprain during soccer" |
| `severity` | string | "mild", "moderate", "severe" |
| `rest_days` | integer | Estimated days of rest |
| `physio_exercises` | array | List of exercises (text) |
| `status` | string | "active", "recovered" |
| `notes` | string | Optional notes |
| `created_at` | timestamp | |
| `updated_at` | timestamp | |

**UI** – A simple list of injuries with status, plus an “Add Injury” button. Each entry can be expanded to show exercises. Export button generates a WhatsApp message with the injury history.

---

## 5. SEASONAL / WEATHER-LINKED ACTIVITY PROMPTS

### Purpose
Offline rules‑based suggestions using device date and last‑known weather (from Weather API cache). These prompts are used to generate **Activity of the Week** cards (Feature 3) or appear directly as light‑blue cards.

### Rules Engine
Hard‑coded rules (can be updated via app update):

- **Rainy season** (Nov–Mar): suggest indoor activities (chess, board games, indoor swimming, table tennis, etc.)
- **Dry season** (Apr–Oct): suggest outdoor activities (hiking, running, football, netball, etc.)
- **Hot days** (last known temp > 35°C): suggest water‑based or early morning activities.
- **Rain today** (if cached weather indicates rain): suggest indoor alternatives.

These rules are evaluated at app start and when weather cache updates. They can override the default rotation of activity suggestions.

### Implementation
- Add a `weather_cache` table (already exists from Weather API integration) that stores last known weather for the user's location.
- Create a `SuggestionEngine` module that:
  1. Gets current month and last known weather.
  2. Filters the suggestion list (`sample_activity_suggestions.json`) based on `season` and `weather` fields.
  3. If multiple matches, picks one randomly.
  4. Pushes a suggestion card to Mine panel and Notifications.

---

## 6. MEALFO: HEALTH & NUTRITION SURVEYS AND MICRO-FACTS

### Purpose
Collect anonymous information about hydration, sleep, balanced meals, snacks to build national statistics for public health planning. Surveys appear as pink engagement cards in **Tracker** and **Mine panel**. User responses are stored locally and aggregated into anonymous tallies that sync to the cloud.

### Data Schema
**New table:** `survey_responses` (IndexedDB, synced with anonymization)

| Field | Type | Description |
|-------|------|-------------|
| `response_id` | string | UUID |
| `survey_id` | string | ID of the survey (from `survey_definitions.json`) |
| `answers` | object | e.g., `{"q1": "yes", "q2": "3 glasses"}` |
| `location_area` | string | User's area (for geographic aggregation) |
| `timestamp` | integer | Unix timestamp |
| `sync_status` | string | "pending", "synced" |

**Aggregation on cloud:** When responses are synced, the cloud (Google Sheets) updates anonymous tallies per survey, per location. Individual responses are discarded after aggregation (privacy by design).

**Survey Definitions** (stored in `app/data/databases/survey_definitions.json`)

```json
[
  {
    "survey_id": "surv_001",
    "title": "Hydration Check",
    "question": "How many glasses of water did you drink yesterday?",
    "options": ["0-2", "3-5", "6-8", "9+"]
  },
  {
    "survey_id": "surv_002",
    "title": "Sleep Quality",
    "question": "How many hours of sleep did you get last night?",
    "options": ["<5", "5-7", "7-9", ">9"]
  }
]
```

### UI Component
**Survey Card** (pink border, #FF69B4 at 70% opacity)

```
┌────────────────────────────────────────────┐
│ 📊 Hydration Check                         │
│ How many glasses of water did you drink   │
│ yesterday?                                 │
│                                            │
│ [0-2]  [3-5]  [6-8]  [9+]                 │
└────────────────────────────────────────────┘
```

- After tapping an option, the card transitions to charcoal (finished) and shows a thank‑you message.
- Surveys appear periodically (e.g., once per week, configurable). The app tracks last shown time in local storage.

---

## 7. PERSONAL “BEFORE / AFTER” COMPARISON VIEW

### Purpose
Simple side‑by‑side view of two Tracker data points (e.g., push‑up max in Jan vs now). Purely local visualization.

### Location
- **Access:** From **Mine panel** → "Progress" section, or integrated into Tracker.

### UI
```
┌─────────────────────────────────────┐
│ Before / After Comparison           │
│                                     │
│ Activity: Push‑ups                  │
│                                     │
│ ┌─────────┐        ┌─────────┐     │
│ │ Jan 2026│        │ Feb 2026│     │
│ │   25    │   →    │   30    │     │
│ └─────────┘        └─────────┘     │
│                                     │
│ Improvement: +5 (20%)               │
│                                     │
│ [Change Activity] [Select Dates]    │
└─────────────────────────────────────┘
```

- User selects an activity and two date ranges (or two specific dates). The app queries local `tracker_entries` to compute the metric (e.g., max value, average, total) for each period.

### Data
No new tables – uses existing `tracker_entries`.

---

## 8. OFFLINE “HABIT CHAIN” BUILDER

### Purpose
Visual chain calendar where users mark daily completion of chosen habit (drink water, stretch, walk). Classic habit‑building psychology: chain breaks if missed. Includes optional reminders.

### Data Schema
**New table:** `habits` (IndexedDB)

| Field | Type | Description |
|-------|------|-------------|
| `habit_id` | string | UUID |
| `name` | string | e.g., "Drink 8 glasses of water" |
| `description` | string | Optional |
| `reminder_enabled` | boolean | |
| `reminder_time` | string | HH:MM (if enabled) |
| `created_at` | timestamp | |
| `streak` | integer | Current streak length |
| `longest_streak` | integer | |
| `last_completed_date` | string | YYYY-MM-DD |

**New table:** `habit_logs` (IndexedDB)

| Field | Type | Description |
|-------|------|-------------|
| `log_id` | string | UUID |
| `habit_id` | string | |
| `date` | string | YYYY-MM-DD |
| `completed` | boolean | True if user marked complete |

**UI** – A dedicated Habit Chain screen (accessed from Mine panel) showing a grid of days (similar to streak calendar) with chain links. Each day can be toggled completed. A chain visual (e.g., connecting line) shows the streak.

**Reminders:** When `reminder_enabled` is true, the app schedules a local notification at `reminder_time` (using browser Notifications API or native plugin). Tapping the notification opens the habit chain screen.

---

## 9. PARTICIPATION HEAT MAP + STATS VIEWER (AGGREGATE ONLY)

### Purpose
Anonymous local tally: how many people logged activity in the ward this week (shown as simple number + charcoal card). Encourages “everyone is doing it” feeling. Shows for area/neighbourhood, town/city, region, nation.

### Data Flow
- **Cloud side:** The backend (Google Sheets) aggregates counts from synced `tracker_entries`. It computes per location (village/town, city, region, nation) the number of unique users who logged at least one activity in the past 7 days.
- These aggregated counts are stored in a new sheet `participation_stats`.
- During the 15‑minute sync, each device pulls the stats for its own location hierarchy.

### Data Schema (local)
**New table:** `participation_stats` (IndexedDB, synced)

| Field | Type | Description |
|-------|------|-------------|
| `location_type` | string | "area", "city", "region", "nation" |
| `location_code` | string | e.g., "GC·Block3", "Gaborone", "South-East", "Botswana" |
| `active_users_last_7days` | integer | Count of unique users with activity |
| `last_updated` | timestamp | |

### UI Component
**Stats Card** (charcoal border, #505050 at 70% opacity)

```
┌────────────────────────────────────────────┐
│ 📊 Community Activity                      │
│ This week in Block 3:                      │
│ 87 people logged activities                │
│                                            │
│ [View region stats]                        │
└────────────────────────────────────────────┘
```

- Shown in **Community panel** (maybe at the top).
- Tapping expands to show city, region, and national stats.

### Integration
- The card appears only if data is available (i.e., after first sync).
- If offline, shows last known stats with timestamp.
