# MIZANO — Complete AI Assistant Implementation Prompt
## "How to Read My Files & Implement All Changes Without Breaking the App"

---

## HOW TO GIVE THIS TO YOUR AI ASSISTANT

Copy everything below this line and paste it as your first message. Then attach or paste the relevant source files when the assistant asks for them. The prompt tells the assistant exactly which files to read, what to look for in each one, and what to produce.

---

---

# SYSTEM CONTEXT — READ THIS FIRST

You are implementing changes to **Mizano**, a Botswana community sports app. It is built as a **single-page offline-first web app** using vanilla JavaScript. All data is loaded via `<script>` tags in `index.html` and injected into a global `window.MIZANO_DATA` object.

**Your job today has 4 parts:**
1. Read and understand my existing data files (I will paste them)
2. Create `matches_enrichment.js` — enriches 14,240 bare match records with venue, scorers, and realistic scores
3. Create `activities_fix.js` — patches 20 events that have `location_name: "TBA"`
4. Create `edit_system.js` — a permission-based edit modal system for businesses, venues, hobbies, lessons, groups, and profiles

**The golden rule: You must NEVER overwrite existing data arrays. Always use `.map()`, `.concat()`, or `.push()` to extend or patch. Any file that does `window.MIZANO_DATA.X = [...]` on a key that already exists will wipe data already in memory.**

---

## PART 1 — HOW TO READ EACH FILE I WILL GIVE YOU

I will paste file contents one at a time. Here is exactly what to extract from each:

---

### File: `generated_matches.js`
**How to read it:** This is a JS file that sets `window.MIZANO_DATA.matches = [...]`. Strip the JS wrapper and read the JSON array.

**What to note:**
- Every record has exactly 7 fields: `id`, `sport`, `home_team`, `away_team`, `home_score`, `away_score`, `date`
- There are **14,240 total records**
- **559 records have `home_score: 0` AND `away_score: 0`** — these are the "dead" matches
- There is NO `venue`, `scorers`, `match_events`, or `attendance` field on any record
- The `sport` field values include: Swimming, Debate, Soccer, Karate, Tennis, Netball, Basketball, Athletics, Volleyball, Rugby, Cricket, Chess and others
- The `home_team` / `away_team` values follow patterns like `team_sch_1_swimming` (school-based) and `TEAM-CORP-*` (corporate)
- The `date` field is ISO8601 — dates before today (March 2026) are finished matches; after are upcoming

**What you will produce from this:** `matches_enrichment.js` (detailed below)

---

### File: `activities.js`
**How to read it:** Sets `window.MIZANO_DATA.activities = [...]`. Read as JSON array.

**What to note:**
- **61 total records**
- **20 records have `location_name: "TBA"`** — full list of their IDs:
  ```
  ORG-DWC-2026    → Orange Digital Warriors Cup (soccer)
  CHO-VKT-2026    → Choppies Village Kitchen Tournament (soccer)
  BTC-CC-2026     → BTC Connected Cup (soccer)
  DEB-DC-2026     → Debswana Diamond Cup (soccer)
  KAL-DC-2026     → Kgalagadi Desert Challenge (soccer)
  GUA-SH-U16-2026 → Guardian Shield U16 (soccer)
  FNB-SSF-2026    → FNB School Sports Festival (soccer)
  PRES-CC-2026    → President's Charity Cup (soccer)
  MAS-TOP8-2026   → Mascom Top 8 Challenge (soccer)
  ORG-FS-U13-2026 → Orange Future Stars U13 (soccer)
  BFL-RZQ-2026    → BFL Regional Zone Qualifiers (soccer)
  IND-CUP-2026    → Independence Cup (soccer)
  CHO-FRT-2026    → Choppies Food Relief Tournament (soccer)
  BSB-CUP-2026    → Botswana Savings Bank Cup (soccer)
  MAS-WC-2026     → Mascom Wireless Challenge (soccer)
  ORG-MCS-2026    → Orange Money Charity Shield (soccer)
  FNB-CSL-2026    → FNB Corporate Social League (soccer)
  BTC-ESC-2026    → BTC End of Season Classic (soccer)
  CHO-CC-2026     → Choppies Christmas Cracker (soccer)
  MIZ-NCL-2026    → Mizano National Champions League (soccer)
  ```
- All other fields (`title`, `activity_type`, `sport`, `status`, `description`) are fine — only `location_name` needs fixing
- The field is called `location_name` (not `location.display` or `venue`)

**What you will produce from this:** `activities_fix.js` (detailed below)

---

### File: `teams.js`
**How to read it:** Sets `window.MIZANO_DATA.teams = [...]`. Read as JSON array.

**What to note:**
- **81 records**
- Each team has: `team_id`, `team_name`, `location_iso`, `location_full`, `location_area`, `level`, `league`, `status`, `home_venue`, `verified`, `profile_type`
- `team_id` values: `GC001` through `GC081` (Gaborone = GC prefix, others vary)
- `location_full` values: "Gaborone", "Francistown", "Maun", "Lobatse", "Palapye" etc.
- `home_venue` is a plain string (e.g. "National Stadium") — NOT a venue_id reference
- These are soccer-only teams

**What you will use this for:** Cross-referencing team IDs when building the edit schema for groups/teams

---

### File: `users_generated.js`
**How to read it:** Sets `window.MIZANO_DATA.users_generated = [...]`. Read as JSON array.

**What to note:**
- **22,374 user records** (very large file — do NOT try to rewrite it)
- Each user has: `id` (format: `user_xxxxxxxx`), `name`, `role`, `school_id`, `gender`, `ethnicity`, `family_id`, `profile_pic`
- `role` values: "Student", "Teacher", "Parent", "Admin", "Guardian"
- `profile_pic` references local asset paths like `assets/avatars/male_african_4.png`
- **No `uid` field** — the key is `id`
- **No `village_town` or `neighborhood`** field — users are linked to schools via `school_id`

**What you will use this for:** Understanding the existing user schema before building the edit system's profile edit form

---

### File: `businesses.js`
**How to read it:** Sets `window.MIZANO_DATA.businesses = [...]`. Read as JSON array.

**What to note:**
- **Only 2 records** — this is a stub file
- Existing IDs: `biz_001` (Gaborone West Pharmacy) and `biz_002` (FitLife Gym)
- Fields: `local_id`, `cloud_id`, `business_id`, `name`, `owner_uid`, `category`, `logo`, `verified`, `location`, `whatsapp`, `sync_status`, `sync_attempts`, `last_modified`, `created_at`
- `local_id` is numeric (4001, 4002) — new records continue from 4003
- `cloud_id` is string `"biz_001"`, `"biz_002"` — continue from `"biz_003"`
- `location` is a plain string like `"Gaborone · G-West"` (city · neighborhood format)
- Note: this file will be **supplemented** (not replaced) by `businesses_full.js`

**What you will use this for:** Matching the exact schema when building the business edit form

---

### File: `shopping_items.js`
**How to read it:** Sets `window.MIZANO_DATA.shopping = [...]`. Read as JSON array.

**What to note:**
- **600 records** — fully populated, do NOT touch
- Each item has: `item_id`, `title`, `description`, `price_pula`, `category`, `subcategory`, `image_path`, `seller`, `location`, `in_stock`, `rating`, `card_type`
- `location` is a plain city name: "Francistown", "Gaborone", "Kasane" — NOT neighborhood format
- `card_type` is always `"Shopping Deal Card"`

**What you will use this for:** Reference only — shopping panel is already populated

---

### File: `hobbies_leisure_300.js`
**How to read it:** Sets `window.MIZANO_DATA.activities` via `.concat([...])`. Read as JSON array extension.

**What to note:**
- **Only 1 record** — stub file
- The single record (`ACT-HL-001`) has these fields: `activity_id`, `activity_type`, `specific_sport`, `sport_display`, `activity_state`, `border_color`, `card_type`, `title`, `description`, `location` (object with `village`, `district_iso`, `district_name`, `venue_name`), `age_group`, `guardian_required`, `skill_level`, `start_datetime`, `end_datetime`, `whatsapp_link`
- It uses `.concat()` not `=` assignment — safe pattern

**What you will use this for:** Schema reference for `hobbies_data.js` generation

---

### File: `community_generated.js`
**How to read it:** Sets `window.MIZANO_DATA.community = { bulletin: [...], lostFound: [...], jobs: [...], newsFlash: [...] }`. Read as JSON object.

**What to note:**
- 4 sub-arrays: `bulletin` (2 posts), `lostFound` (3 items), `jobs` (3 listings), `newsFlash` (3 items)
- `bulletin` records: `postId`, `type`, `title`, `content`, `author` (object: name/profileId/avatar), `location`, `createdAt`, `whatsappLink`
- `lostFound` records: `postId`, `type` ("lost"/"found"), `title`, `description`, `category`, `location`, `date`, `photo`, `poster` (object), `boosted`, `createdAt`
- `jobs` records: `jobId`, `title`, `company`, `location`, `type`, `description`, `requirements` (array), `salary`, `contactWhatsApp`, `postedAt`, `deadline`
- `newsFlash` records: `newsId`, `source`, `sourceLogo`, `headline`, `summary`, `category`, `thumbnail`, `publishedAt`

**What you will use this for:** Schema reference when extending community data

---

### File: `sports_activities_dropdown.js`
**How to read it:** Sets `window.SPORTS_AND_ACTIVITIES = [...]`. Simple string array.

**What to note:**
- **115 activity names** — this is the master list
- These exact strings must be used in `sport_activity` fields across all new data files
- Key ones: "Soccer", "Netball", "Basketball", "Athletics (Track & Field)", "Chess", "Cricket", "Swimming", "Volleyball", "Tennis", "Badminton", "Rugby Union", "Boxing (Amateur/Pro)", "Table Tennis", "Cycling (Road/Mountain Bike)", "Karate", "Judo", "Lawn Bowls", "Darts", "Pool / Snooker", "Marathon & Road Running"

**What you will use this for:** Ensuring all sport references match dropdown exactly

---

### File: `activities_stress.js`
**How to read it:** Sets `window.MIZANO_DATA.activities_stress = [...]`. Read as JSON array.

**What to note:**
- **500 records**
- Each record has: `activity_id` (format: `stress_0` through `stress_499`), `title`, `sport`, `activity_type`, `status`, `location_name`, `village`, `start_time`, `start_date`, `left_team_name`, `right_team_name`, `price_range`
- `location_name` here IS a neighborhood string (e.g. "Phakalane", "Mochudi") — already fixed
- `left_team_name`/`right_team_name` are generic ("Team A", "Team B") — these cards need real team names if you ever enrich this file
- Do NOT modify this file

---

## PART 2 — FILES TO CREATE

---

### FILE A: `matches_enrichment.js`

**Purpose:** Patch all 14,240 match records with venue, scorer events, realistic scores, and attendance. Load AFTER `generated_matches.js` in `index.html`.

**Exact requirements:**

```
INPUTS:  window.MIZANO_DATA.matches (14,240 records, 7 fields each)
OUTPUTS: Same array, each record extended with new fields. Uses .map() only.
METHOD:  (function(){...})() — IIFE, runs immediately on load
```

**New fields to add to every match record:**

```javascript
{
  // ... all existing 7 fields preserved ...
  venue_id: "venue_block3_complex",           // string, from venue pool
  venue_name: "Block 3 Sports Complex",       // human-readable
  location_display: "Gaborone · Block 3",     // city · neighborhood
  match_events: [],                           // array (see structure below)
  attendance: 240,                            // integer, null for future matches
  status: "finished",                         // "finished" | "upcoming" | "live"
  enriched: true                              // flag so we know it was processed
}
```

**`match_events` array structure (only for past matches — date < today):**
```javascript
[
  { type: "goal", minute: 23, team: "team_sch_1_soccer", scorer: "Thabo Mokoena", assist: "Kagiso Sithole" },
  { type: "goal", minute: 67, team: "team_sch_227_soccer", scorer: "Neo Dlamini", assist: null },
  { type: "yellow_card", minute: 44, team: "team_sch_1_soccer", player: "Mpho Tau" }
]
```

**Score fixing rules (ONLY change 0-0 matches — leave all other scores as-is):**

| Sport | Realistic score range | Notes |
|-------|----------------------|-------|
| Soccer | 0–5 per team | At least 1 goal total (no 0-0) |
| Netball | 20–58 per team | Close games ±8 points |
| Basketball | 42–94 per team | Close games ±12 points |
| Volleyball | 0–3 (sets) | Best of 3 |
| Tennis | 0–3 (sets) | Best of 3 |
| Debate | 1–3 (points) | Never 0-0 |
| Cricket | 80–280 runs | Total runs format |
| Swimming | 1–8 (events won) | |
| Athletics | 1–10 (points) | Track meets use points |
| default | 1–4 per side | |

**Venue pool (use deterministic assignment — same match always gets same venue):**
```javascript
const VENUES = [
  { id: "venue_national_stadium",    name: "National Stadium",          location: "Gaborone · National Stadium Area" },
  { id: "venue_block3_complex",      name: "Block 3 Sports Complex",    location: "Gaborone · Block 3" },
  { id: "venue_broadhurst_complex",  name: "Broadhurst Complex",        location: "Gaborone · Broadhurst" },
  { id: "venue_ub_campus",           name: "UB Sports Grounds",         location: "Gaborone · UB Campus" },
  { id: "venue_mascom_park",         name: "Mascom Park",               location: "Gaborone · Phase 2" },
  { id: "venue_bhc_court",           name: "BHC Indoor Court",          location: "Gaborone · Block 6" },
  { id: "venue_francistown_stadium", name: "Francistown Stadium",       location: "Francistown · Monarch" },
  { id: "venue_maun_sports",         name: "Maun Sports Complex",       location: "Maun · CBD" },
  { id: "venue_jwaneng_sports",      name: "Jwaneng Sports Complex",    location: "Jwaneng" },
  { id: "venue_lobatse_stadium",     name: "Peleng Stadium",            location: "Lobatse" }
];
// Pick venue: Math.abs(hashString(match.id)) % VENUES.length
```

**Scorer name pool (realistic Botswana names, use for all sports):**
```javascript
const SCORERS = {
  Soccer:     ["Thabo Mokoena","Kagiso Sithole","Neo Dlamini","Mpho Tau","Lesego Moagi","Tebogo Ntshebe","Goitseone Maripe","Tumelo Kgari","Keabetswe Selato","Boipelo Gaolatlhe","Oratile Seitshiro","Gape Motsepe","Mothusi Kelepile","Reatlegile Moyo"],
  Netball:    ["Kefilwe Dube","Dineo Moalosi","Boitumelo Seretse","Refilwe Kgosana","Onalenna Sithole","Tshepiso Moagi","Neo Molefe","Reatlegile Moyo","Phenyo Mosinyi","Gorata Kgosi"],
  Basketball: ["Tebogo Modise","Kagiso Nkwe","Mothusi Tau","Tumelo Moeng","Oratile Gabonamong","Lesego Ntshebe","Kefilwe Tshiamo","Mpho Segaetsho"],
  default:    ["Thabo M.","Kagiso S.","Neo D.","Mpho T.","Lesego M.","Tebogo N.","Kefilwe D.","Dineo M."]
};
```

**Deterministic hash function to use (so venue/scorer is stable across rerenders):**
```javascript
function stableHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(31, h) + str.charCodeAt(i) | 0;
  }
  return Math.abs(h);
}
```

**Complete file structure:**
```javascript
// matches_enrichment.js
// Enriches window.MIZANO_DATA.matches with venue, scorers, realistic scores
// Load AFTER generated_matches.js — uses .map() only, never overwrites

(function enrichMizanoMatches() {
  if (!window.MIZANO_DATA || !window.MIZANO_DATA.matches) {
    console.warn('[Mizano] matches_enrichment.js loaded before generated_matches.js');
    return;
  }

  const TODAY = new Date().toISOString();

  // [paste VENUES array here]
  // [paste SCORERS object here]
  // [paste stableHash function here]

  function pickVenue(matchId) {
    return VENUES[stableHash(matchId) % VENUES.length];
  }

  function pickScorer(sport, seed) {
    const pool = SCORERS[sport] || SCORERS.default;
    return pool[stableHash(seed) % pool.length];
  }

  function fixScore(sport, homeScore, awayScore, matchId) {
    // Only fix 0-0 matches
    if (homeScore !== 0 || awayScore !== 0) return { home: homeScore, away: awayScore };
    // [implement sport-specific score generation using stableHash(matchId) for determinism]
  }

  function buildEvents(sport, home, away, homeTeam, awayTeam, matchId) {
    // Only for past matches
    // [generate goal events, cards etc. using stableHash for determinism]
  }

  let fixed = 0;
  window.MIZANO_DATA.matches = window.MIZANO_DATA.matches.map(function(match) {
    const isPast = match.date < TODAY;
    const score = fixScore(match.sport, match.home_score, match.away_score, match.id);
    const venue = pickVenue(match.id);
    const events = isPast
      ? buildEvents(match.sport, score.home, score.away, match.home_team, match.away_team, match.id)
      : [];

    if (match.home_score === 0 && match.away_score === 0) fixed++;

    return Object.assign({}, match, {
      home_score: score.home,
      away_score: score.away,
      venue_id: venue.id,
      venue_name: venue.name,
      location_display: venue.location,
      match_events: events,
      attendance: isPast ? (stableHash(match.id) % 480 + 20) : null,
      status: isPast ? 'finished' : 'upcoming',
      enriched: true
    });
  });

  console.log('[Mizano Enrichment] Done. Fixed ' + fixed + ' 0-0 scores. All 14,240 matches now have venue + events.');
})();
```

---

### FILE B: `activities_fix.js`

**Purpose:** Patch the 20 activities with `location_name: "TBA"` by merging in real locations. Load AFTER `activities.js` in `index.html`.

**All 20 activity IDs and the correct locations to assign (distribute across Botswana — not all Gaborone):**

```javascript
const LOCATION_PATCHES = {
  "ORG-DWC-2026":     { location_name: "Gaborone · National Stadium",   venue_id: "venue_national_stadium",    district: "South-East District",  village: "Gaborone" },
  "CHO-VKT-2026":     { location_name: "Gaborone · Block 3",            venue_id: "venue_block3_complex",      district: "South-East District",  village: "Gaborone" },
  "BTC-CC-2026":      { location_name: "Francistown · Monarch",         venue_id: "venue_francistown_stadium", district: "North-East District",  village: "Francistown" },
  "DEB-DC-2026":      { location_name: "Jwaneng · Sports Complex",      venue_id: "venue_jwaneng_sports",      district: "Southern District",    village: "Jwaneng" },
  "KAL-DC-2026":      { location_name: "Tsabong · Community Ground",    venue_id: "venue_tsabong_ground",      district: "Kgalagadi District",   village: "Tsabong" },
  "GUA-SH-U16-2026":  { location_name: "Gaborone · Broadhurst",        venue_id: "venue_broadhurst_complex",  district: "South-East District",  village: "Gaborone" },
  "FNB-SSF-2026":     { location_name: "Gaborone · UB Campus",         venue_id: "venue_ub_campus",           district: "South-East District",  village: "Gaborone" },
  "PRES-CC-2026":     { location_name: "Gaborone · National Stadium",   venue_id: "venue_national_stadium",    district: "South-East District",  village: "Gaborone" },
  "MAS-TOP8-2026":    { location_name: "Gaborone · Mascom Park",        venue_id: "venue_mascom_park",         district: "South-East District",  village: "Gaborone" },
  "ORG-FS-U13-2026":  { location_name: "Gaborone · Block 9",           venue_id: "venue_block9_ground",       district: "South-East District",  village: "Gaborone" },
  "BFL-RZQ-2026":     { location_name: "Palapye · Town Ground",        venue_id: "venue_palapye_ground",      district: "Central District",     village: "Palapye" },
  "IND-CUP-2026":     { location_name: "Gaborone · National Stadium",   venue_id: "venue_national_stadium",    district: "South-East District",  village: "Gaborone" },
  "CHO-FRT-2026":     { location_name: "Serowe · Community Ground",     venue_id: "venue_serowe_ground",       district: "Central District",     village: "Serowe" },
  "BSB-CUP-2026":     { location_name: "Gaborone · Phase 2",           venue_id: "venue_mascom_park",         district: "South-East District",  village: "Gaborone" },
  "MAS-WC-2026":      { location_name: "Francistown · Gerald Estates",  venue_id: "venue_francistown_stadium", district: "North-East District",  village: "Francistown" },
  "ORG-MCS-2026":     { location_name: "Lobatse · Peleng Stadium",      venue_id: "venue_lobatse_stadium",     district: "Southern District",    village: "Lobatse" },
  "FNB-CSL-2026":     { location_name: "Gaborone · Broadhurst",        venue_id: "venue_broadhurst_complex",  district: "South-East District",  village: "Gaborone" },
  "BTC-ESC-2026":     { location_name: "Maun · Sports Complex",         venue_id: "venue_maun_sports",         district: "North-West District",  village: "Maun" },
  "CHO-CC-2026":      { location_name: "Kanye · Town Stadium",          venue_id: "venue_kanye_stadium",       district: "Southern District",    village: "Kanye" },
  "MIZ-NCL-2026":     { location_name: "Gaborone · National Stadium",   venue_id: "venue_national_stadium",    district: "South-East District",  village: "Gaborone" }
};
```

**Complete file structure:**
```javascript
// activities_fix.js
// Patches location_name: "TBA" in window.MIZANO_DATA.activities
// Load AFTER activities.js in index.html

(function fixTBALocations() {
  if (!window.MIZANO_DATA || !window.MIZANO_DATA.activities) {
    console.warn('[Mizano] activities_fix.js: activities not loaded yet');
    return;
  }

  // [paste LOCATION_PATCHES object here]

  let patched = 0;
  window.MIZANO_DATA.activities = window.MIZANO_DATA.activities.map(function(activity) {
    const fix = LOCATION_PATCHES[activity.activity_id];
    if (fix) {
      patched++;
      return Object.assign({}, activity, fix);
    }
    return activity;
  });

  console.log('[Mizano] activities_fix.js: Patched ' + patched + '/20 TBA locations');
})();
```

---

### FILE C: `edit_system.js`

**Purpose:** A universal edit modal + permission system. Load as the VERY LAST script in `index.html`.

**Requirements:**
- Exposes `window.MIZANO_EDIT` public API
- `canEdit(record, currentUserUid, currentUserRole)` → boolean
- `openEditModal(recordType, record, onSave)` → renders modal, calls onSave(updatedRecord) on save
- `applyLocalEdits()` → runs on load, merges any localStorage-saved edits back into live data
- Modal must be mobile-friendly (max-width 520px, scrollable)
- Works without any external libraries (vanilla JS + inline CSS only)
- Uses `localStorage` with keys like `mizano_edits_business`, `mizano_edits_venue` etc.

**Permission logic:**
```javascript
function canEdit(record, currentUserUid, currentUserRole) {
  if (!currentUserUid) return false;                           // not logged in
  if (currentUserRole === 'admin') return true;               // admin edits everything
  if (record.owner_uid === currentUserUid) return true;       // business/venue owner
  if (record.host_uid === currentUserUid) return true;        // hobby/leisure host
  if (record.tutor_uid === currentUserUid) return true;       // lesson tutor
  if (record.id === currentUserUid) return true;              // own profile
  return false;
}
```

**Editable fields per record type:**

`business`: name, tagline, category (dropdown), location, address, whatsapp, operating_hours, price_range, visibility (dropdown: public/private/members_only)

`venue`: name, type (dropdown), location.display, booking_contact, booking_fee_pula.hourly (number), booking_fee_pula.daily (number), capacity (number), status (dropdown: open/closed/under_renovation)

`hobby`: title, description (textarea), location.display, location.venue_name, fee_pula (number), max_participants (number), skill_level (dropdown), activity_state (dropdown)

`lesson`: title, description (textarea), tutor_name, tutor_title, location.display, fee_pula (number), max_students (number), lesson_type (dropdown: private/group/online), availability (dropdown: available/full/waitlist)

`group`: name, description (textarea), location.display, membership_fee_pula (number), contact_name, age_group (dropdown: youth/adult/senior/mixed), gender (dropdown: mixed/male/female)

`profile`: name, display_name, neighborhood, bio (textarea), primary_sport, skill_level (dropdown: Beginner/Intermediate/Advanced/Pro), whatsapp_number, available_for_match (dropdown: true/false)

**After save, the record must be written to localStorage AND the `onSave` callback fired with the updated record object.**

**`applyLocalEdits()` must:**
1. Read all `mizano_edits_*` keys from localStorage
2. For each saved edit, find the matching record in `window.MIZANO_DATA[dataKey]` by the record's ID field
3. Merge saved fields onto the live record using `Object.assign()`
4. Log how many edits were applied per type

**ID field mapping:**
```javascript
{
  business: { dataKey: 'businesses',      idField: 'business_id' },
  venue:    { dataKey: 'venues',          idField: 'venue_id'    },
  hobby:    { dataKey: 'hobbies',         idField: 'activity_id' },
  lesson:   { dataKey: 'lessons',         idField: 'lesson_id'   },
  group:    { dataKey: 'groups',          idField: 'group_id'    },
  profile:  { dataKey: 'player_profiles', idField: 'uid'         }
}
```

**How to wire edit buttons in card rendering (example pattern for your app):**
```javascript
// In your card rendering function, AFTER building the card HTML:
const currentUser = window.MIZANO_CURRENT_USER; // your existing auth object
const editable = window.MIZANO_EDIT && window.MIZANO_EDIT.canEdit(
  record, 
  currentUser?.uid || currentUser?.id,   // note: users_generated uses 'id' not 'uid'
  currentUser?.role
);

if (editable) {
  // Add edit button to card. When clicked:
  window.MIZANO_EDIT.openEditModal('business', record, function(updatedRecord) {
    // Refresh just this card's display with updatedRecord data
    renderCard(updatedRecord); // your existing render function
  });
}
```

---

## PART 3 — `index.html` SCRIPT LOAD ORDER

Update your `<script>` tags to match this order exactly. Do not change anything else in `index.html`.

```html
<!-- GROUP 1: Existing data files — DO NOT REORDER OR REMOVE -->
<script src="data/sports_activities_dropdown.js"></script>
<script src="data/teams.js"></script>
<script src="data/activities.js"></script>
<script src="data/schools.js"></script>
<script src="data/users_generated.js"></script>
<script src="data/users_personas.js"></script>
<script src="data/generated_matches.js"></script>
<script src="data/generated_leaderboards.js"></script>
<script src="data/community_generated.js"></script>
<script src="data/competitions_generated.js"></script>
<script src="data/corporate_teams_generated.js"></script>
<script src="data/shopping_items.js"></script>
<script src="data/activities_stress.js"></script>
<script src="data/hobbies_leisure_300.js"></script>
<script src="data/businesses.js"></script>

<!-- GROUP 2: New data files (generated in our previous session) -->
<script src="data/hobbies_data.js"></script>
<script src="data/leisure_data.js"></script>
<script src="data/lessons_tutors.js"></script>
<script src="data/discover_spotlights.js"></script>
<script src="data/businesses_full.js"></script>
<script src="data/venues_full.js"></script>
<script src="data/groups_clubs.js"></script>
<script src="data/user_profiles_bw.js"></script>
<script src="data/community_extended.js"></script>
<script src="data/events_generated.js"></script>

<!-- GROUP 3: Patch files — MUST load after the files they patch -->
<script src="data/activities_fix.js"></script>      <!-- patches activities.js -->
<script src="data/matches_enrichment.js"></script>  <!-- patches generated_matches.js -->

<!-- GROUP 4: System — MUST be the very last scripts -->
<script src="js/edit_system.js"></script>
<!-- your existing app JS below -->
<script src="js/app.js"></script>
```

---

## PART 4 — WHAT TO CHECK AFTER IMPLEMENTATION

**Test 1: Match enrichment working**
Open browser console and run:
```javascript
window.MIZANO_DATA.matches.slice(0,5).forEach(m => 
  console.log(m.id, m.sport, m.home_score + '-' + m.away_score, m.venue_name, m.match_events?.length + ' events')
);
```
Expected: Each match shows a venue name and event count > 0 for past matches.

**Test 2: No more 0-0 results (should be 0)**
```javascript
window.MIZANO_DATA.matches.filter(m => m.home_score === 0 && m.away_score === 0).length
// Should return: 0
```

**Test 3: TBA locations fixed**
```javascript
window.MIZANO_DATA.activities.filter(a => a.location_name === 'TBA').length
// Should return: 0
```

**Test 4: Edit system loaded**
```javascript
typeof window.MIZANO_EDIT.canEdit     // "function"
typeof window.MIZANO_EDIT.openEditModal // "function"
```

**Test 5: Edit system respects permissions**
```javascript
// Simulating a non-owner user
window.MIZANO_EDIT.canEdit({business_id:'biz_001', owner_uid:'USR-001'}, 'USR-002', 'user')
// Should return: false

window.MIZANO_EDIT.canEdit({business_id:'biz_001', owner_uid:'USR-001'}, 'USR-001', 'user')
// Should return: true

window.MIZANO_EDIT.canEdit({business_id:'biz_001', owner_uid:'USR-001'}, 'ANY-USER', 'admin')
// Should return: true
```

---

## PART 5 — THINGS TO AVOID (SHOW-STOPPERS)

| If you do this | What breaks |
|----------------|-------------|
| `window.MIZANO_DATA.matches = [...]` in enrichment file | Wipes 14,240 matches, replaces with empty |
| `window.MIZANO_DATA.activities = [...]` in fix file | Wipes all 61 activities |
| Loading `edit_system.js` before data files | `applyLocalEdits()` finds empty arrays |
| Loading `matches_enrichment.js` before `generated_matches.js` | IIFE exits early, nothing enriched |
| Loading `activities_fix.js` before `activities.js` | IIFE exits early, TBA not fixed |
| Using `window.MIZANO_DATA.hobbies.push(...)` before hobbies_data.js creates the array | TypeError: Cannot read properties of undefined |
| Referencing `user.uid` from `users_generated.js` | That file uses `user.id` not `user.uid` |
| Referencing sport names NOT in `sports_activities_dropdown.js` | Filter panel finds no matches |

---

## SUMMARY: WHAT TO BUILD

| File to create | Method | Lines approx |
|----------------|--------|-------------|
| `data/matches_enrichment.js` | IIFE `.map()` patch | ~120 lines |
| `data/activities_fix.js` | IIFE `.map()` patch | ~50 lines |
| `js/edit_system.js` | IIFE module → `window.MIZANO_EDIT` | ~250 lines |

**After those 3 files are done:** Update `index.html` script order per Part 3.

That's everything. Build the files in the order: `activities_fix.js` first (simplest), then `matches_enrichment.js`, then `edit_system.js`.
