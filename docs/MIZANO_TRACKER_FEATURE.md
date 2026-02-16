# MIZANO TRACKER FEATURE – Specification & Implementation

**Version 1.5 | February 15, 2026**  
**Purpose:** Enable users to plan, track, and visualise personal progress across sports, fitness, health, and hobbies. Integrates with the National Talent Pipeline and respects Mizano’s offline‑first, 2D minimal design.

---

## 1. OVERVIEW

The Tracker is a new global entry point in the Bottom Menu (icon: 📊 **Tracker**). It provides a personal dashboard for:

- **Active goals** (e.g., “30‑day calisthenics challenge”)
- **Daily logs** for quick check‑ins (workout, meal, water, mood)
- **Goal builder** (using the same `+ / –` collapsible hierarchy as Event Lab)
- **Insights** (historical charts, progress toward goals)

All data is stored locally (IndexedDB) and synced to the cloud every 15 minutes. The feature respects the **7‑color system** and the **template group logic** already defined for sports.

---

## 2. BOTTOM MENU INTEGRATION

| Position | Icon | Name | Action |
|----------|------|------|--------|
| 4 | 📊 | Tracker | Opens Tracker dashboard |

The Bottom Menu now contains:  
**Activity (1) – Places (2) – Home (3) – Tracker (4) – Search (5) – + (6) – Notifications (7) – Hamburger (8)**  
*(The order can be customised in Settings → Navigation & Display.)*

---

## 3. UI STRUCTURE (2D Minimal, Collapsible)

```
┌─────────────────────────────────────────────────────┐
│  ← Tracker          🏅 1,240 pts           ⚡ Quick Log │  (Sticky Header)
├─────────────────────────────────────────────────────┤
│ [ + ] Active Progress (Orange borders)               │
│   └─► [–] 30‑Day Calisthenics (85%)                │
│       └─► 15 reps · Day 26/30                       │
│                                                      │
│ [ – ] Daily Log (Blue border)                        │
│   └─► [▶] Workout     [▶] Meal     [▶] Water        │
│                                                      │
│ [ + ] Goal Builder                                    │
│   └─► (collapsed)                                    │
│                                                      │
│ [ + ] Insights (Charcoal border)                      │
│   └─► (collapsed)                                    │
└─────────────────────────────────────────────────────┘
```

### 3.1 Sticky Header
- **Back arrow** – returns to previous panel.
- **Tracker title** – always visible.
- **Sports CV point contribution** – total points contributed to the user’s National Talent Pipeline (from completed activities).
- **⚡ Quick Log** – tiny floating menu to quickly log weight, water, or mood without opening the full daily log.

### 3.2 Main Canvas (Collapsible Cards)

#### Active Progress Card (Orange border)
- **Expanded by default.**
- Shows all ongoing goals with a minimalist progress bar.
- Tapping a goal opens its detail page (Goal Dashboard).

#### Daily Log Card (Blue border)
- **Expanded by default.**
- Contains a grid of quick‑log buttons: Workout, Meal, Water, Mood, plus any sport/hobby the user has marked as “frequent” in their interests.
- Tapping a button opens a minimal input panel (inline) to record the value.

#### Goal Builder Card (Light Blue border)
- **Collapsed by default.**
- Uses the same `+ / –` hierarchy as Event Lab to create new goals.
- Fully described in Section 5.

#### Insights Card (Charcoal border)
- **Collapsed by default.**
- Displays minimalist line charts (2D, no gradients) of progress over time.
- Options to filter by activity, date range, etc.

---

## 4. USER EXPERIENCE FLOW

| Step | Action | Protocol / Mapping |
|------|--------|---------------------|
| 1 | User taps Tracker icon in Bottom Menu | Navigates to Tracker dashboard (MIZANO_PAGE_FLOW_ARCHITECTURE.md) |
| 2 | User taps “Start Activity” inside Daily Log (or taps a goal card) | Opens searchable dropdown of activities (using **SPORTS AND ACTIVITES DROP DOWN.md**) |
| 3 | User selects “Gym – Strength Training” | Activity resolves to **Turn/Move/Cycle** template (`turn_cycle`) – sets/reps interface appears |
| 4 | User begins workout | Card border turns **Orange** (`#FFA500`) and pulses to indicate “Live” status |
| 5 | User logs each set (inline expandable rows) | Data saved locally to IndexedDB |
| 6 | User taps “Finish” | Session ends, border turns **Charcoal** (`#505050`), data queued for sync |
| 7 | (Background) Every 15 minutes, offline changes sync to cloud | Updates user’s Sports CV and national statistics |

---

## 5. GOAL BUILDER CARD (Using +/- Collapsible Hierarchy)

The Goal Builder mirrors the Event Lab’s structure but is simplified for personal tracking.

```
[ – ] Goal Builder
  │
  ├─ [ – ] Core Identity (expanded)
  │    ├─ Activity: [ dropdown ]  (uses SPORTS AND ACTIVITES DROP DOWN.md)
  │    └─ Goal Title: [ "30‑Day Calisthenics" ] (auto‑generated from activity)
  │
  ├─ [ + ] Metric & Targets (collapsed)
  │    └─ when expanded, fields depend on the selected activity’s template group
  │        • Performance (leaderboard): Target weight/time/distance
  │        • Turn‑based (turn_cycle): Sets, reps, rest time
  │        • Time‑structured (timer_split): Duration per session, frequency
  │        • Diet/Habit: simple toggle (“Track as binary?”)
  │
  ├─ [ + ] Schedule (collapsed)
  │    └─ Frequency: Daily / Weekly / Custom (e.g., every Mon, Wed, Fri)
  │    └─ Start date, end date (optional)
  │
  └─ [ + ] Reminders & Privacy (collapsed)
       └─ Push notification toggle, share with mentor (optional)
```

**Implementation notes:**
- All sections are collapsible (`[ + ]` when closed, `[ – ]` when open).
- When the user selects an activity, the **Metric & Targets** section dynamically expands with fields appropriate to the activity’s template group (see Section 6).
- No modals – everything expands inline.

---

## 6. LOGICAL MAPPING: ACTIVITIES → TEMPLATE GROUPS

The same 7‑group logic used in Event Lab applies to personal tracking. This ensures a consistent mental model and code reuse.

| Tracking Type | Example Activities | Template Group | Fields / Behaviour |
|---------------|--------------------|----------------|---------------------|
| **Gym / Strength** | Weight training, Calisthenics | `turn_cycle` | Sets, reps, rest timer |
| **Endurance** | Running, Cycling, Swimming | `leaderboard` | Distance, time, pace |
| **Weight Management** | Weight loss/gain, BMI | `leaderboard` | Target weight, current weight, daily check‑in |
| **Lessons / Learning** | Language practice, Music practice | `timer_split` | Time spent (min), sessions per week |
| **Diet / Habits** | Water intake, Meals, Mood | `custom` (simple toggle) | Binary (done/not done), optional quantity |
| **Skills / Repetition** | Soccer drills, Dance moves | `turn_cycle` | Reps, sets |
| **Multi‑discipline** | Triathlon training | `hybrid` | Combines several metrics (swim, bike, run) |

**Fallback:** If an activity is not explicitly mapped, it defaults to `leaderboard` (Performance/Measurement).

---

## 7. JSON SCHEMA: tracker_entry

Each logged session or check‑in is stored as a `tracker_entry`. The schema supports all template groups.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["user_id", "goal_id", "timestamp", "activity_id"],
  "properties": {
    "entry_id": { "type": "string", "description": "UUID, generated client‑side" },
    "user_id": { "type": "string", "description": "Mizano user ID" },
    "goal_id": { "type": "string", "description": "ID of the goal this entry belongs to (optional for ad‑hoc logs)" },
    "timestamp": { "type": "integer", "description": "Unix timestamp (ms) of the entry" },
    "activity_id": { "type": "string", "description": "Value from sports dropdown, e.g., 'gym_strength'" },
    "template_group": { "type": "string", "enum": ["timer_split", "set_cap", "leaderboard", "turn_cycle", "bout_logic", "hybrid", "custom"] },
    "metric": {
      "type": "object",
      "description": "Metrics depend on template_group",
      "oneOf": [
        { "$ref": "#/definitions/leaderboard_metrics" },
        { "$ref": "#/definitions/turn_cycle_metrics" },
        { "$ref": "#/definitions/timer_split_metrics" },
        { "$ref": "#/definitions/custom_metrics" }
      ]
    },
    "notes": { "type": "string", "maxLength": 200 },
    "sync_status": { "type": "string", "enum": ["local", "synced"], "default": "local" }
  },
  "definitions": {
    "leaderboard_metrics": {
      "type": "object",
      "properties": {
        "value": { "type": "number" },
        "unit": { "type": "string", "enum": ["kg", "lb", "km", "miles", "min", "sec", "points", "reps"] }
      },
      "required": ["value", "unit"]
    },
    "turn_cycle_metrics": {
      "type": "object",
      "properties": {
        "sets": { "type": "integer" },
        "reps_per_set": { "type": "array", "items": { "type": "integer" } },
        "weight_kg": { "type": "number" }
      }
    },
    "timer_split_metrics": {
      "type": "object",
      "properties": {
        "duration_min": { "type": "number" }
      },
      "required": ["duration_min"]
    },
    "custom_metrics": {
      "type": "object",
      "properties": {
        "value": { "type": "number" },
        "unit": { "type": "string" }
      }
    }
  }
}
```

**Example entries:**

```json
// Gym workout (turn_cycle)
{
  "entry_id": "trk_abc123",
  "user_id": "usr_bob",
  "goal_id": "goal_pushups",
  "timestamp": 1709472000000,
  "activity_id": "calisthenics",
  "template_group": "turn_cycle",
  "metric": {
    "sets": 3,
    "reps_per_set": [15, 12, 10],
    "weight_kg": 0
  }
}

// Weight check‑in (leaderboard)
{
  "entry_id": "trk_def456",
  "user_id": "usr_bob",
  "goal_id": "goal_weightloss",
  "timestamp": 1709472000000,
  "activity_id": "weight_management",
  "template_group": "leaderboard",
  "metric": {
    "value": 82.5,
    "unit": "kg"
  }
}
```

---

## 8. GOAL BUILDER COMPONENT (React + IndexedDB)

Below is a React component that implements the Goal Builder card with collapsible sections, dynamic field injection, and offline storage.

```jsx
// GoalBuilder.jsx
import React, { useState, useEffect } from 'react';
import { useIndexedDB } from 'react-indexed-db'; // hypothetical hook
import CollapsibleSection from './CollapsibleSection';
import ActivityDropdown from './ActivityDropdown';
import TemplateFields from './TemplateFields';

const GoalBuilder = () => {
  const [goal, setGoal] = useState({
    title: '',
    activityId: '',
    templateGroup: 'leaderboard',
    metricConfig: {},
    schedule: { frequency: 'daily', startDate: null, endDate: null },
    reminders: false,
    privacy: 'private'
  });
  const [activeSections, setActiveSections] = useState({
    core: true,
    metric: false,
    schedule: false,
    reminders: false
  });

  const { add } = useIndexedDB('goals');

  const handleActivityChange = (activity) => {
    const template = assignTemplate(activity.value); // from mapping
    setGoal({
      ...goal,
      activityId: activity.value,
      templateGroup: template.key,
      title: activity.display + ' Goal'
    });
    // Auto‑expand metric section
    setActiveSections({ ...activeSections, metric: true });
  };

  const saveGoal = () => {
    add({ ...goal, createdAt: Date.now() }).then(() => {
      // Optionally close builder or show success
    });
  };

  return (
    <div className="goal-builder card">
      <div className="card-header">
        <span className="card-title">Goal Builder</span>
        <span className="collapse-icon" onClick={() => setActiveSections({ ...activeSections, core: !activeSections.core })}>
          {activeSections.core ? '–' : '+'}
        </span>
      </div>
      
      {activeSections.core && (
        <div className="card-content">
          <label>Activity</label>
          <ActivityDropdown onChange={handleActivityChange} />
          <label>Goal Title</label>
          <input
            type="text"
            value={goal.title}
            onChange={(e) => setGoal({ ...goal, title: e.target.value })}
            placeholder="e.g., 30‑Day Calisthenics"
          />
        </div>
      )}

      <CollapsibleSection
        title="Metric & Targets"
        isOpen={activeSections.metric}
        onToggle={() => setActiveSections({ ...activeSections, metric: !activeSections.metric })}
      >
        <TemplateFields
          templateGroup={goal.templateGroup}
          onChange={(metricConfig) => setGoal({ ...goal, metricConfig })}
        />
      </CollapsibleSection>

      <CollapsibleSection
        title="Schedule"
        isOpen={activeSections.schedule}
        onToggle={() => setActiveSections({ ...activeSections, schedule: !activeSections.schedule })}
      >
        <div>
          <label>Frequency</label>
          <select
            value={goal.schedule.frequency}
            onChange={(e) => setGoal({ ...goal, schedule: { ...goal.schedule, frequency: e.target.value } })}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="custom">Custom days</option>
          </select>
          {goal.schedule.frequency === 'custom' && (
            <div>
              <label>Days (comma separated, e.g., Mon,Wed,Fri)</label>
              <input type="text" />
            </div>
          )}
          <label>Start Date</label>
          <input type="date" onChange={(e) => setGoal({ ...goal, schedule: { ...goal.schedule, startDate: e.target.value } })} />
          <label>End Date (optional)</label>
          <input type="date" onChange={(e) => setGoal({ ...goal, schedule: { ...goal.schedule, endDate: e.target.value } })} />
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        title="Reminders & Privacy"
        isOpen={activeSections.reminders}
        onToggle={() => setActiveSections({ ...activeSections, reminders: !activeSections.reminders })}
      >
        <label>
          <input type="checkbox" checked={goal.reminders} onChange={(e) => setGoal({ ...goal, reminders: e.target.checked })} />
          Send push reminders
        </label>
        <label>Privacy</label>
        <select value={goal.privacy} onChange={(e) => setGoal({ ...goal, privacy: e.target.value })}>
          <option value="private">Only me</option>
          <option value="mentor">Share with mentor</option>
          <option value="public">Public (appear in leaderboard)</option>
        </select>
      </CollapsibleSection>

      <button className="save-btn" onClick={saveGoal}>Save Goal</button>
    </div>
  );
};

export default GoalBuilder;
```

**Helper components** (not shown fully):
- `CollapsibleSection`: a simple wrapper with header and content.
- `ActivityDropdown`: searchable dropdown using sports list.
- `TemplateFields`: renders appropriate inputs based on template group (e.g., for `turn_cycle` it shows sets/reps inputs, for `leaderboard` it shows value+unit).

---

## 9. DATA STORAGE & SYNC

- **IndexedDB tables:** `goals`, `tracker_entries`.
- **Sync process:** Every 15 minutes (or on network reconnect), the app uploads entries with `sync_status: "local"` to the Mizano API. On success, status changes to `"synced"`. Conflicts are resolved by server timestamp (last‑write‑wins).
- **Offline behaviour:** All features work offline; entries are stored locally and queued for sync.

---

## 10. PLACEMENT FILES FOR AI AGENT

Create the following files in your project structure:

```
app/
├─ data/
│  ├─ dropdowns/
│  │  └─ tracker_activities.json   (subset of sports + health categories)
│  └─ databases/
│     ├─ tracker_schema.json        (JSON schema)
│     └─ sample_tracker_entries.json (example dataset)
├─ components/
│  └─ Tracker/
│     ├─ GoalBuilder.jsx
│     ├─ DailyLogCard.jsx
│     ├─ ActiveProgressCard.jsx
│     └─ InsightsCard.jsx
├─ docs/
│  └─ MIZANO_TRACKER_FEATURE.md     (this document)
```

**tracker_activities.json** (a filtered dropdown with common tracking activities):
```json
[
  { "value": "gym_strength", "display": "Gym – Strength Training", "group": "turn_cycle" },
  { "value": "calisthenics", "display": "Calisthenics", "group": "turn_cycle" },
  { "value": "running", "display": "Running", "group": "leaderboard" },
  { "value": "cycling", "display": "Cycling", "group": "leaderboard" },
  { "value": "weight_management", "display": "Weight Management", "group": "leaderboard" },
  { "value": "water_intake", "display": "Water Intake", "group": "custom" },
  { "value": "meals", "display": "Meals", "group": "custom" },
  { "value": "mood", "display": "Mood", "group": "custom" },
  { "value": "language_practice", "display": "Language Practice", "group": "timer_split" },
  { "value": "music_practice", "display": "Music Practice", "group": "timer_split" }
]
```

**sample_tracker_entries.json** (for testing):
```json
[
  {
    "entry_id": "trk_sample1",
    "user_id": "usr_demo",
    "goal_id": "goal_pushup",
    "timestamp": 1709472000000,
    "activity_id": "calisthenics",
    "template_group": "turn_cycle",
    "metric": { "sets": 3, "reps_per_set": [15,12,10] }
  },
  {
    "entry_id": "trk_sample2",
    "user_id": "usr_demo",
    "goal_id": "goal_weight",
    "timestamp": 1709472000000,
    "activity_id": "weight_management",
    "template_group": "leaderboard",
    "metric": { "value": 82.5, "unit": "kg" }
  }
]
```

---

**END OF DOCUMENT**

This specification provides everything needed to implement the Tracker feature: UI structure, UX flow, logical mapping, JSON schema, React component code, and file placement instructions. The feature is fully aligned with Mizano’s design principles, offline‑first architecture, and the existing template‑based logic.