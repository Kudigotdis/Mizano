# Mizano Data Saturation & Generation Prompt Guide
**For: Google AI Studio / Gemini (Antigravity, Nov 2025+)**
**Purpose: Generate JavaScript data files to populate all 13 Mizano app panels**

---

## 🧠 Context You Must Know First

Mizano is a Botswana-based community sports app (offline-first). All data is injected via `window.MIZANO_DATA.X = [...]` pattern in `.js` files loaded by `index.html`. The app has 13 panels:

**Home · Sports · Groups · Leaderboard · Shopping · Schools · Venues · Community · Hobbies · Leisure · Lessons · Events · Discover · Businesses**

The app already has these files loaded (DO NOT regenerate them, only extend/fix):
- `teams.js` — soccer team rosters  
- `sports_activities_dropdown.js` — 115 activity names (the master list)
- `activities.js` — ~55 curated events (many have `location_name: "TBA"` — FIX THESE)
- `schools.js` — institution profiles ✅ populated  
- `users_generated.js` — dummy users ✅ populated  
- `generated_matches.js` — match data ✅ populated  
- `generated_leaderboards.js` — leaderboard data ✅ populated  
- `community_generated.js` — bulletin/jobs/news ✅ light  
- `competitions_generated.js` — competitions ✅ partial  
- `corporate_teams_generated.js` — corporate teams ✅ populated  
- `shopping_items.js` — 600 shopping items ✅ populated  
- `activities_stress.js` — high-volume match data ✅ populated  

---

## 🗺️ Geography: Botswana Locations to Use

### Tier 1 — Hubs (100% coverage, all 115 sports)
| City | Neighborhoods to use |
|------|----------------------|
| **Gaborone** | Block 3, Block 6, Block 8, Block 9, Old Naledi, Broadhurst, Phase 2, G-West, Phakalane, Extension 14, Tlokweng, Mogoditshane, Gabz CBD |
| **Francistown** | Monarch, Tati Siding, Gerald Estates, Donga, Somerset East, Nyangabwe |

### Tier 2 — Regional Towns (top 20 sports only)
Maun, Kasane, Palapye, Jwaneng, Molepolole, Lobatse, Selebi-Phikwe, Kanye, Serowe, Mahalapye

### Tier 3 — Villages (Soccer + 4 local activities)
Mochudi, Ramotswa, Tlokweng, Otse, Kopong, Thamaga, Gabane, Moshupa, Letlhakane, Gweta, Nata, Shakawe, Tsabong, Ghanzi, Hukuntsi

### Top 20 Sports (use for Tier 2+)
Soccer, Netball, Basketball, Athletics (Track & Field), Chess, Cricket, Swimming, Volleyball, Tennis, Badminton, Rugby Union, Boxing (Amateur/Pro), Table Tennis, Cycling (Road/Mountain Bike), Karate, Judo, Lawn Bowls, Darts, Pool / Snooker, Marathon & Road Running

---

## 📐 Universal Data Rules (Apply to ALL generated files)

1. **NEVER use `"TBA"` for venue/location** — always use `"Gaborone · Block 3"` style
2. **Timeline Distribution**: 30% `"active"/"live"`, 40% `"upcoming"`, 30% `"finished"`
3. **Cross-panel linkage**: Every 10 activities should reference 2 existing venue IDs, 1–2 team IDs, and 1 business sponsor
4. **WhatsApp links**: Format `https://wa.me/267XXXXXXXX?text=I'm%20interested%20in%20[EventName]`
5. **Use realistic Botswana names**: Thabo, Kagiso, Boitumelo, Kefilwe, Mpho, Tshepiso, Reatlegile, Neo, Tumelo, Onalenna, Dineo, Lesego, Oratile, Tebogo, Refilwe, Gape, Goitseone, Mothusi

---

## 📁 FILES TO GENERATE (Priority Order)

---

### FILE 1: `hobbies_data.js` 🔴 CRITICAL
**Target: 300 records | Powers: Hobbies panel**

```javascript
window.MIZANO_DATA = window.MIZANO_DATA || {};
window.MIZANO_DATA.hobbies = [
  {
    "activity_id": "HOB-GAB-001",
    "activity_type": "Hobby",
    "specific_sport": "photography",           // snake_case of the hobby
    "sport_display": "Photography",
    "activity_state": "recruiting",             // "recruiting" | "upcoming" | "finished"
    "border_color": "#70AD47",                  // green=hobby, blue=leisure, orange=lesson
    "card_type": "match_making_card",
    "title": "Weekend Photography Walk – Block 6",
    "description": "Explore Gaborone's streets with fellow photography enthusiasts. Beginners welcome, bring any camera or phone.",
    "location": {
      "village": "Gaborone",
      "neighborhood": "Block 6",
      "display": "Gaborone · Block 6",
      "district_iso": "BW-GA",
      "district_name": "Gaborone",
      "venue_name": "Block 6 Park"
    },
    "age_group": "mixed",                       // "mixed" | "youth" | "adult" | "senior"
    "guardian_required": false,
    "skill_level": "Beginner",                  // "Beginner" | "Intermediate" | "Advanced" | "All Levels"
    "start_datetime": "2026-03-22T09:00:00Z",
    "end_datetime": "2026-03-22T12:00:00Z",
    "max_participants": 15,
    "fee_pula": 0,
    "host_name": "Kagiso Modise",
    "host_uid": "USR-BW-GAB-210",
    "whatsapp_link": "https://wa.me/26771234567?text=I'm%20interested%20in%20Photography%20Walk",
    "tags": ["creative", "outdoor", "social"]
  }
  // ... 299 more records
];
```

**Distribution to hit:**
- 80 records → Gaborone (all neighborhoods)  
- 40 records → Francistown  
- 20 records → each of 5 regional towns  
- 40 records → villages (spread)

**Hobby categories to cover (at least 3 records each):**
Photography, Painting, Drawing & Sketching, Pottery, Knitting & Crocheting, Cooking & Baking, Gardening, Birdwatching, Hiking, Reading Club, Writing Circle, Music Jamming, Guitar, Drumming, Poetry Slam, Board Games, Puzzles, Model Building, Woodworking, Beekeeping, Fishing, Stargazing, Language Exchange, Film Club, Debate Club, Drama & Theatre, Choir, Traditional Dance, Morabaraba (local board game), Diketo (traditional game)

---

### FILE 2: `leisure_data.js` 🔴 CRITICAL
**Target: 150 records | Powers: Leisure panel**

```javascript
window.MIZANO_DATA = window.MIZANO_DATA || {};
window.MIZANO_DATA.leisure = [
  {
    "event_id": "LEI-GAB-001",
    "event_type": "Leisure",
    "category": "Wellness",                     // "Wellness" | "Adventure" | "Social" | "Cultural" | "Nature" | "Entertainment"
    "title": "Sunday Morning Yoga – Gaborone Dam",
    "description": "Outdoor yoga session on the grass at Gaborone Dam. Mat provided. All levels welcome.",
    "location": {
      "village": "Gaborone",
      "neighborhood": "Gaborone Dam",
      "display": "Gaborone · Dam Area",
      "venue_name": "Gaborone Dam Picnic Area"
    },
    "activity_state": "upcoming",
    "start_datetime": "2026-03-23T07:00:00Z",
    "end_datetime": "2026-03-23T09:00:00Z",
    "recurring": "weekly",                      // "once" | "weekly" | "monthly"
    "fee_pula": 30,
    "max_participants": 20,
    "host_name": "Boitumelo Seretse",
    "whatsapp_link": "https://wa.me/26772345678?text=I'm%20interested%20in%20Yoga%20at%20Dam",
    "tags": ["wellness", "outdoor", "morning"]
  }
  // ... 149 more records
];
```

**Leisure categories to distribute:**
Yoga, Meditation, Hiking, Nature Walk, Day Trip, Braai & Social, Game Night, Karaoke, Movie Night, Cultural Tour, Cooking Class, Wine & Dine, Picnic, Cycling Tour, Kayaking (Okavango/Chobe), Safari (local budget), Sunset Cruise (Chobe), Comedy Night, Live Music Night, Art Exhibition, Heritage Site Visit, Night Market, Craft Fair, Food Festival, Wellness Retreat, Spa Day, Dance Social, Trivia Night, Escape Room

---

### FILE 3: `lessons_tutors.js` 🔴 CRITICAL  
**Target: 120 records | Powers: Lessons panel**

```javascript
window.MIZANO_DATA = window.MIZANO_DATA || {};
window.MIZANO_DATA.lessons = [
  {
    "lesson_id": "LES-GAB-001",
    "tutor_uid": "USR-BW-GAB-045",
    "tutor_name": "Mpho Tau",
    "tutor_title": "BFA Level 2 Coach",
    "sport_activity": "Soccer",                 // must match SPORTS_AND_ACTIVITIES list
    "lesson_type": "group",                     // "private" | "group" | "online"
    "title": "Junior Soccer Coaching – U12 Group",
    "description": "Weekly group training sessions for U12 players. Focuses on fundamentals: passing, dribbling, positioning.",
    "location": {
      "village": "Gaborone",
      "neighborhood": "Block 3",
      "display": "Gaborone · Block 3",
      "venue_name": "Block 3 Sports Complex"
    },
    "schedule": {
      "days": ["Wednesday", "Friday"],
      "time": "16:00–18:00",
      "frequency": "weekly"
    },
    "fee_pula": 150,                            // per session
    "max_students": 12,
    "age_group": "youth",
    "skill_levels": ["Beginner", "Intermediate"],
    "certifications": ["BFA Level 2", "First Aid"],
    "availability": "available",                // "available" | "full" | "waitlist"
    "rating": 4.7,
    "reviews_count": 18,
    "whatsapp_link": "https://wa.me/26773456789?text=I'm%20interested%20in%20soccer%20lessons%20with%20Mpho",
    "verified_coach": true
  }
  // ... 119 more records
];
```

**Cover these sports with at least 3 tutors each (in Gaborone):**
Soccer, Netball, Basketball, Swimming, Tennis, Badminton, Chess, Karate, Judo, Boxing, Athletics/Running Coaching, Volleyball, Table Tennis, Guitar, Piano, Drums, Mathematics Tutoring via Sport, Cricket, Rugby, Dance Sport

**For each tutor include:** realistic Botswana name, relevant certification (BFA Level 1/2, BNASA-certified, BCA-certified, etc.), schedule, and 1–3 lesson types

---

### FILE 4: `discover_spotlights.js` 🔴 CRITICAL
**Target: 40 records | Powers: Discover panel**

```javascript
window.MIZANO_DATA = window.MIZANO_DATA || {};
window.MIZANO_DATA.discover = [
  {
    "spotlight_id": "DSC-001",
    "type": "mentor",                           // "mentor" | "event" | "venue" | "team" | "deal" | "news"
    "featured": true,
    "title": "Meet Coach Reatlegile – Gaborone's Top Chess Tutor",
    "subtitle": "Teaching chess to 200+ youth since 2019",
    "description": "Reatlegile Moyo started free chess clubs in Block 3 and now coaches the national junior team. Find out how to join his Saturday sessions.",
    "cta_label": "Book a Session",
    "cta_whatsapp": "https://wa.me/26774567890?text=I%20saw%20your%20spotlight%20on%20Mizano",
    "image_hint": "coach_chess_gaborone",       // for image path resolution
    "location_display": "Gaborone · Block 3",
    "week_of": "2026-03-02",                    // ISO week start date
    "tags": ["chess", "youth", "coaching", "gaborone"],
    "linked_lesson_id": "LES-GAB-012",          // optional cross-link
    "linked_event_id": null,
    "linked_team_id": null
  }
  // ... 39 more spotlights
];
```

**Spotlight types to generate (8 of each type across 5 types):**
- **mentor**: Local coaches, community heroes, school sports teachers  
- **event**: Upcoming featured events (link to events_generated)  
- **venue**: Best facilities in Botswana (new or underused)  
- **team**: Rising community teams  
- **deal**: Shopping discount or free trial from businesses

---

### FILE 5: `businesses_full.js` 🔴 CRITICAL
**Target: 150 records | Powers: Businesses + Shops panels**

```javascript
window.MIZANO_DATA = window.MIZANO_DATA || {};
window.MIZANO_DATA.businesses = [
  {
    "local_id": 4003,
    "cloud_id": "biz_003",
    "business_id": "block3-sports-clinic-01",
    "name": "Block 3 Sports & Physio Clinic",
    "owner_uid": "USR-BW-GAB-330",
    "category": "clinic",                       // see categories below
    "subcategory": "Physiotherapy",
    "tagline": "Recover faster, play harder",
    "logo": "block3-sports-clinic-01.png",
    "verified": true,
    "location": "Gaborone · Block 3",
    "address": "Plot 4432, Block 3, Gaborone",
    "whatsapp": "+2673900003",
    "operating_hours": "Mon–Fri 08:00–18:00, Sat 08:00–13:00",
    "services": ["Sports massage", "Physiotherapy", "Strapping & taping", "Injury assessment"],
    "price_range": "P150–P400 per session",
    "rating": 4.6,
    "reviews_count": 34,
    "sports_focus": ["Soccer", "Rugby", "Athletics (Track & Field)"],
    "sync_status": "synced",
    "last_modified": 1740000000000,
    "created_at": 1700000000000
  }
  // ... 149 more businesses
];
```

**Business categories (generate at least 10 per category):**
| category | Description |
|----------|-------------|
| `gym` | Fitness centres, CrossFit, bootcamp studios |
| `clinic` | Physio, sports medicine, pharmacy |
| `shop` | Sports gear, second-hand kits, equipment rental |
| `academy` | Coaching academies, sports schools |
| `nutrition` | Supplements, healthy food, sports dieticians |
| `photography` | Sports photography & video services |
| `transport` | Team buses, minibus hire for away games |
| `events_hire` | Marquees, sound, equipment for tournaments |
| `printing` | Kit printing, trophies, medals |
| `coaching` | Independent coaches registering as businesses |

**Geographic distribution:** 60 in Gaborone (all neighborhoods), 30 in Francistown, 10 each in Maun/Kasane/Palapye/Jwaneng/Lobatse

---

### FILE 6: `venues_full.js` — Priority 2
**Target: 100 records | Powers: Venues panel**

```javascript
window.MIZANO_DATA = window.MIZANO_DATA || {};
window.MIZANO_DATA.venues = [
  {
    "venue_id": "venue_block3_complex",
    "name": "Block 3 Sports Complex",
    "type": "multi-sport",                      // "football_pitch" | "netball_court" | "indoor_hall" | "swimming_pool" | "athletics_track" | "multi-sport" | "school_ground"
    "location": {
      "village": "Gaborone",
      "neighborhood": "Block 3",
      "display": "Gaborone · Block 3",
      "district": "South-East District",
      "coordinates": { "lat": -24.6519, "lng": 25.9089 }
    },
    "facilities": ["2 football pitches", "netball court", "changing rooms", "floodlights", "parking"],
    "booking_contact": "+26771111222",
    "booking_fee_pula": { "hourly": 50, "daily": 300 },
    "capacity": 500,
    "surface": "grass",                         // "grass" | "artificial_turf" | "concrete" | "sand" | "indoor_wood" | "tartan"
    "floodlit": true,
    "accessible": true,
    "managed_by": "Gaborone City Council",
    "status": "open",                           // "open" | "closed" | "under_renovation"
    "sports_hosted": ["Soccer", "Netball", "Athletics (Track & Field)"]
  }
  // ... 99 more venues
];
```

**Venue types to generate:**
- 20 × Football pitches (various neighborhoods in Gaborone)
- 10 × Netball courts
- 8 × Indoor halls (basketball, volleyball, boxing)
- 5 × Swimming pools (Gaborone, Francistown)
- 3 × Athletics tracks (National Stadium, UB, Francistown)
- 15 × School grounds (with permission-based booking)
- 10 × Multi-sport complexes
- 15 × Regional venues (Francistown, Maun, Kasane etc)
- 14 × Village community grounds

---

### FILE 7: `groups_clubs.js` — Priority 2
**Target: 100 records | Powers: Groups panel (non-corporate, non-school)**

```javascript
window.MIZANO_DATA = window.MIZANO_DATA || {};
window.MIZANO_DATA.groups = (window.MIZANO_DATA.groups || []).concat([
  {
    "group_id": "GRP-GAB-001",
    "name": "Block 8 Chess Masters",
    "category": "Social Club",                  // "Social Club" | "Community Team" | "School Club" | "Church Group" | "Neighborhood Group" | "Women's Group" | "Youth Group"
    "sport_activity": "Chess",
    "description": "Casual chess club meeting every Saturday at Block 8 library. All ages welcome.",
    "location": {
      "village": "Gaborone",
      "neighborhood": "Block 8",
      "display": "Gaborone · Block 8",
      "venue_name": "Block 8 Community Library"
    },
    "founded_year": 2022,
    "member_count": 24,
    "age_group": "mixed",
    "gender": "mixed",                          // "mixed" | "male" | "female"
    "membership_fee_pula": 0,
    "contact_name": "Tebogo Nkwe",
    "whatsapp_link": "https://wa.me/26775678901?text=I'd%20like%20to%20join%20Block%208%20Chess%20Masters",
    "verified": false,
    "active": true,
    "roster_uids": ["USR-BW-GAB-041", "USR-BW-GAB-088", "USR-BW-GAB-112"]
  }
  // ... 99 more groups
];
```

**Group types distribution:**
- 25 × Gaborone social/neighborhood clubs (all 115 sports represented)
- 15 × Women's sports groups (netball, aerobics, walking clubs)
- 10 × Youth/school clubs
- 10 × Church/faith-based sports groups
- 10 × Francistown clubs
- 10 × Regional town clubs (2 per regional town)
- 10 × Special interest groups (e.g. "Gaborone Trail Runners", "BW Cycling Collective")
- 10 × Corporate social leagues (not already in corporate_teams_generated.js)

---

### FILE 8: `activities_fix.js` — Priority 1 (Fix TBA locations)
**Purpose: Patch the ~40 "TBA" events in activities.js with real locations**

This file should EXTEND/OVERRIDE the activities array with corrected location fields:

```javascript
// activities_fix.js
// Patches TBA locations in the main activities.js file
// Load AFTER activities.js in index.html

(function() {
  if (!window.MIZANO_DATA || !window.MIZANO_DATA.activities) return;
  
  const fixes = {
    "ORG-DWC-2026": { location_name: "Gaborone · National Stadium", venue_id: "venue_national_stadium", district: "South-East District" },
    "CHO-VKT-2026": { location_name: "Gaborone · Block 3", venue_id: "venue_block3_complex", district: "South-East District" },
    "BTC-CC-2026":  { location_name: "Francistown · Monarch", venue_id: "venue_francistown_stadium", district: "North-East District" },
    "DEB-DC-2026":  { location_name: "Jwaneng · Sports Complex", venue_id: "venue_jwaneng_sports", district: "Southern District" },
    "KAL-DC-2026":  { location_name: "Tsabong · Community Ground", venue_id: "venue_tsabong_ground", district: "Kgalagadi District" },
    "GUA-SH-U16-2026": { location_name: "Gaborone · Broadhurst", venue_id: "venue_broadhurst_complex", district: "South-East District" },
    "FNB-SSF-2026": { location_name: "Gaborone · UB Campus", venue_id: "venue_ub_campus", district: "South-East District" }
    // Add ALL remaining TBA activity_ids here
  };

  window.MIZANO_DATA.activities = window.MIZANO_DATA.activities.map(act => {
    if (fixes[act.activity_id]) {
      return { ...act, ...fixes[act.activity_id] };
    }
    return act;
  });
})();
```

**To complete this file:** Scan activities.js for every record where `location_name === "TBA"` or `location_name === "Multi-hub"` and add a fix entry for each one, distributing across Botswana cities.

---

### FILE 9: `user_profiles_bw.js` — Priority 2
**Target: 500 records | Powers: Sports player profiles, search, teams**

```javascript
window.MIZANO_DATA = window.MIZANO_DATA || {};
window.MIZANO_DATA.player_profiles = [
  {
    "uid": "USR-BW-PROF-001",
    "name": "Tumelo Kgari",
    "display_name": "T. Kgari",
    "profile_type": "Player",                   // "Player" | "Coach" | "Referee" | "Parent" | "Fan"
    "gender": "MALE",
    "age": 22,
    "village_town": "Gaborone",
    "neighborhood": "Block 9",
    "primary_sport": "Soccer",
    "secondary_sports": ["Futsal", "Beach Soccer"],
    "position": "Midfielder",
    "skill_level": "Intermediate",
    "school_id": null,                          // or "sch_XXX" if student
    "team_ids": ["GC003"],                      // links to teams.js
    "borrow_score": 4.2,
    "matches_played": 47,
    "wins": 28,
    "losses": 12,
    "draws": 7,
    "bio": "Grew up playing football in Old Naledi. Hoping to trial for the Zebras one day.",
    "verified": true,
    "available_for_match": true,
    "whatsapp_number": "+267712XXXXX",
    "joined_mizano": "2025-08-14"
  }
  // ... 499 more profiles
];
```

**Distribution:**
- 200 × Gaborone players (across all neighborhoods)
- 100 × Francistown  
- 50 × Maun, Kasane, Palapye  
- 50 × Other regional towns  
- 100 × Various villages  

**Profile type split:** 70% Player, 10% Coach, 5% Referee, 10% Parent/Guardian, 5% Organizer

---

### FILE 10: `community_extended.js` — Priority 3
**Target: Extend community_generated.js | Powers: Community panel**

```javascript
window.MIZANO_DATA = window.MIZANO_DATA || {};
const _comm = window.MIZANO_DATA.community;

// Add 30 more bulletin posts
_comm.bulletin.push(
  // ... 30 posts covering: sports call-outs, team announcements, 
  //     funeral notices (common in Botswana community boards), 
  //     school events, charity drives
);

// Add 20 more lost & found
_comm.lostFound.push(/* ... */);

// Add 15 more jobs
_comm.jobs.push(/* ... */);

// Add 10 more news items
_comm.newsFlash.push(/* ... */);
```

**Community post ideas to generate:**
- Calling for players ("Looking for U17 netball players in Francistown")  
- Lost kit/equipment posts (football boots, bibs, cones)  
- Funeral notices (standard in Botswana community)  
- Volunteer coaches needed  
- Fundraising for team travel  
- Achievement shout-outs  
- Public holiday game arrangements  
- Sport science and nutrition tips (Mizano content team)

---

## 🔢 Quick Reference: Record Counts Summary

| File | Records | Priority | Status |
|------|---------|----------|--------|
| `hobbies_data.js` | 300 | 🔴 Critical | Missing |
| `leisure_data.js` | 150 | 🔴 Critical | Missing |
| `lessons_tutors.js` | 120 | 🔴 Critical | Missing |
| `discover_spotlights.js` | 40 | 🔴 Critical | Missing |
| `businesses_full.js` | 150 | 🔴 Critical | Stub (2 records) |
| `activities_fix.js` | ~40 patches | 🔴 Critical | Fix TBA |
| `venues_full.js` | 100 | 🟡 Important | Missing |
| `groups_clubs.js` | 100 | 🟡 Important | Partial |
| `user_profiles_bw.js` | 500 | 🟡 Important | Missing |
| `community_extended.js` | +75 | 🟢 Polish | Partial |
| **TOTAL NEW** | **~1,575** | | |

---

## 🤖 Efficient Generation Strategy (How to prompt your AI)

### Step 1: Generate file-by-file using the "Pivot" method

For each file, use this prompt template:

> "Generate the Mizano `[filename]` JavaScript data file. Use the schema exactly as specified. 
> Pivot around the following sports/activities in order: [paste 10 from the list]. 
> For each sport, generate 3 entries spread across: Gaborone (Block 3), Francistown (Monarch), and one regional town.
> Use realistic Botswana names. Never use TBA for locations. 
> Output only valid JavaScript, no markdown, no explanations."

### Step 2: Batch by geography

Instead of one giant file, prompt: 
> "Generate 80 `hobbies_data.js` entries for Gaborone only. Use neighborhoods: Block 3, Block 6, Block 8, Block 9, Broadhurst, Phase 2, Old Naledi, G-West, Phakalane."

Then a second call:
> "Now generate 40 entries for Francistown using neighborhoods: Monarch, Tati Siding, Gerald Estates."

Merge with `Array.concat()` at the bottom of the file.

### Step 3: Cross-link IDs

Use these pre-existing IDs when referencing cross-panel data:
- **Teams**: `GC001` through `GC~150` (from teams.js), `TEAM-CORP-*` (corporate_teams)
- **Users**: `USR-BW-GAB-001` through `USR-BW-GAB-500` (assumed range)
- **Schools**: `sch_1` through `sch_945` (from schools.js)
- **Venues** (existing): `venue_national_stadium`, `venue_broadhurst_complex`, `venue_block3_complex`, `venue_francistown_stadium`, `venue_ub_campus`, `venue_jwaneng_sports`, `venue_maun_sports`, `venue_bhc_court`, `venue_mascom_park`, `venue_bpc_grounds`

---

## ⚠️ Critical Anti-Patterns (Never Do These)

❌ `location_name: "TBA"` — breaks all location filters  
❌ `location_name: "Various"` — breaks location filters  
❌ `location_name: "National"` — too vague  
❌ Generic names like "John Smith" — use Botswana names  
❌ UK/US phone formats — use `+267XXXXXXXX`  
❌ USD prices — use Pula (P). P0 = free, P50 = affordable, P200+ = premium  
❌ `window.MIZANO_DATA.activities = []` — always USE `.concat()` or `push()` to avoid overwriting  
❌ Duplicate `activity_id` / `lesson_id` / `group_id` values  

---

## ✅ Validation Checklist (Run before loading)

After generating each file, verify:
- [ ] All location fields use `"City · Neighborhood"` format
- [ ] WhatsApp numbers are `+267XXXXXXXX` format (8 digits after 267)
- [ ] All IDs are unique within the file
- [ ] `window.MIZANO_DATA` is referenced before use with `|| {}`
- [ ] Arrays use `.concat()` not `=` (to avoid overwriting other files)
- [ ] Timeline split is roughly 30% active / 40% upcoming / 30% finished
- [ ] No `undefined` or `null` in required fields (title, location, activity_id)

---

*Generated for Mizano app — Botswana's community sports platform*  
*Reference files: teams.js, sports_activities_dropdown.js, activities.js, community_generated.js, hobbies_leisure_300.js, businesses.js*
