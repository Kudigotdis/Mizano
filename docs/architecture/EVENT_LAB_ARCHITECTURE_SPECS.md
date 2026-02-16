# Mizano – Event Lab Architecture Specification
**Motto: Perfect for organising anything**  
*The single‑page workspace where competition organisers build, fund, recruit, and publish – without ever leaving the page.*

---

## 1. Event Lab: Global Layout & Behaviour

### 1.1 Page Architecture
The Event Lab is a **vertically scrollable single page** divided into three logical zones:

| Zone               | Content                                                                                      | Layout Rule                                                                                         |
|--------------------|----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| **Sticky Header**  | Competition Title (editable), Save/Draft status, Offline indicator, Publish button           | Always visible at top. Title is inline‑editable.                                                   |
| **Main Canvas**    | Stack of **Main Section Cards**. Each card is independently collapsible.                     | Cards are separated by subtle dividers. No tabs – all sections are on‑screen or one click away.    |
| **Floating Action**| "Quick Actions" menu: Clone, Preview, Archive, Delete.                                       | Appears when scrolling past first section. Collapsible into a "⚡" button on mobile.                |

### 1.2 The + / – Collapsible System
Every piece of configurable content is nested inside a **collapsible container** with a clear hierarchy:

| Level       | Toggle Style                     | Default State                     | Usage                                                                                 |
|-------------|----------------------------------|-----------------------------------|---------------------------------------------------------------------------------------|
| **Main**    | `[ + ]` / `[ – ]` at card header | All main sections **expanded**    | Core Identity, Game Rules, Mizano Fund, Recruitment, Format, etc.                     |
| **Sub**     | `▶` / `▼` beside sub‑heading     | Collapsed by default             | Inside a main section: e.g., "Payment Channels" under Mizano Fund.                    |
| **Sub‑Sub** | Indented + small `▶` / `▼`       | Collapsed                        | Nested details: e.g., "Orange Money settings" under Payment Channels.                 |

**Layout Rule** – No modal windows under any circumstances for the rule‑building process. Instead, use **inline expansion panels** that push content down. All changes are instantly visible in preview areas. This maintains the single‑page workspace flow and ensures compatibility with low‑memory devices.

---

## 2. Core Identity (The "Container")

**Main Section**: `[ – ] Core Identity`  
*Always expanded. The only panel that must be completed before any sport‑specific logic is processed.*

### 2.1 Branding (Sub‑section, `▼` default expanded)
| Field                      | Component                                                                 | Layout Rule                                                                             |
|----------------------------|---------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| Competition Title          | Text input (single line)                                                  | Auto‑generates Short Name/Slug below. Slug editable.                                    |
| Short Name/Slug            | Text input (pre‑filled)                                                   | Validation: URL‑safe characters only.                                                   |
| Description / Mission      | Textarea (3 rows, expandable)                                             | Character counter (300‑500 recommended).                                                |
| Logo / Banner Upload       | Drop zone + file picker                                                   | Preview thumbnail. Min dimensions 1200×630 px.                                          |

### 2.2 Context (Sub‑section, `▼` default collapsed)
| Field                     | Component                                         | Behaviour                                                                                  |
|---------------------------|---------------------------------------------------|-------------------------------------------------------------------------------------------|
| Sport / Activity          | Searchable dropdown + "🌐 Other" trigger          | Selection **unlocks** the Game Rules panel. "Other" triggers inline Custom Logic Builder. |
| Organization Type         | Dropdown: School, University, Community, Corporate, National Association | When "School" or "National Association" selected, **Governing Body Linkage** sub‑sub appears. |
| Mission Profile           | Toggle: Competitive Track / Casual Track         | Affects default scoring strictness.                                                       |
| Governing Body Linkage    | Dropdown + "Load Offline Rules" button           | Only visible when triggered. Shows last sync timestamp.                                   |
| Sponsor Integration       | "+ Add Sponsor" button → inline search           | Each sponsor becomes a card with logo, tier, and "Branded Mode" toggle. Drag handles reorder. |

### 2.3 Logistics & Reach (Sub‑section, `▼` default collapsed)
| Field                     | Component                                         | Layout Rule                                                                                |
|---------------------------|---------------------------------------------------|--------------------------------------------------------------------------------------------|
| Dates                     | Date range picker (or single date for tournament)| End date optional; if blank, assumes single‑day.                                          |
| Entry Fee + Currency      | Number input + dropdown (BWP, ZAR, etc.)         | If >0, **automatically expands** the Mizano Fund panel.                                   |
| Venue(s)                  | Search registered locations OR manual GPS/Address | Chips for multiple venues. Manual entry triggers geocode lookup.                          |
| Visibility                | Radio: Public / Private‑Hidden                   | Private hides from search; invite‑only.                                                   |
| **Audience Targeting**    | Checkbox group (Neighborhood, Schools, Corporates, Hobbyists, Individuals) | Each selection **unlocks relevant sub‑sections** later (e.g., Hobbyist Discovery).         |

---

## 3. Game / Match Rules (Dynamic Template Engine)

**Main Section**: `[ – ] 🎯 Game / Match Rules`  
*This panel appears **only after** a Sport / Activity is selected. Its internal structure is **identical for every sport** – only the fields and default values mutate based on the sport's assigned template group.*

### 3.1 Template Group Dispatch
Every sport in the Mizano ecosystem resolves to **exactly one** of the following seven template groups. The dispatch is automatic; the organiser never chooses the group.

| Template Group                 | Logic Key      | Sports (Examples)                                                                                   |
|--------------------------------|----------------|-----------------------------------------------------------------------------------------------------|
| **Time‑Structured**            | `timer_split`  | Football, Rugby, Basketball, Hockey, Netball, Futsal, Water Polo, …                                |
| **Target‑Score / Set‑Based**   | `set_cap`      | Tennis, Volleyball, Padel, Squash, Badminton, Golf, Darts, …                                       |
| **Performance / Measurement**  | `leaderboard`  | Athletics, Swimming, Cycling, Weightlifting, Judged sports (Gymnastics, Dance, …)                  |
| **Turn / Move / Cycle**        | `turn_cycle`   | Cricket, Baseball, Softball, Chess, Bridge, Curling, …                                             |
| **Combat / Bout**              | `bout_logic`   | Boxing, Judo, Karate, Taekwondo, Wrestling, MMA, Fencing, …                                        |
| **Multi‑Discipline / Hybrid**  | `hybrid`       | Modern Pentathlon, Triathlon, Biathlon, Esports (certain titles)                                    |
| **User‑Defined / Custom**      | `custom`       | "🌐 Other", Parasports (Boccia, Goalball), any sport without a pre‑defined template               |

**Layout Rule** – The organiser never sees this table during normal flow. It is the underlying logic engine. A **reference minimap** (collapsed by default) is available at the bottom of the panel for power users.

### 3.2 Basic Rules (Sub‑section, `▼` expanded)
*The fields here are **dynamically injected** based on the template group.*

| Template Group       | Always‑Present Fields                                                                               | Dynamic Injected Fields (examples)                              |
|----------------------|-----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------|
| Time‑Structured      | `Game Length` (mm:ss)<br>`Periods` (#)<br>`Period Duration` (mm:ss)<br>`Halftime Break` (mm:ss)    | Overtime toggle, Sudden Death, Clock stop/start                |
| Target‑Score         | `Win by` (Sets / Frames / Games)<br>`Points per unit`<br>`Max units`                               | Tie‑break cap, Advantage rule, Deuce logic                     |
| Performance          | `Measure by` (Time / Distance / Points / Weight)<br>`Sort order` (Asc / Desc)<br>`Attempts` (#)    | Aggregation (best / avg / sum), Penalty deduction              |
| Turn‑Based           | `Max turns / overs`<br>`Time per move` (optional)<br>`Innings` (#)                                 | Draw conditions, Illegal move penalty                          |
| Combat               | `Rounds` (#)<br>`Round length` (mm:ss)<br>`Win by` (Points / KO / Submission / Stoppage)           | Decision logic, Disqualification triggers                      |
| Multi‑Discipline     | `Number of disciplines`<br>`Scoring combination` (Sum / Weighted)                                  | Discipline weights, Conversion tables                          |
| Custom               | *(User defines everything via inline wizard – see Section 9)*                                      |                                                                 |

**Layout Rule** – The injected fields appear **inline**, directly below the always‑present fields. Choosing a sport automatically dispatches the template and injects these fields instantly. NO page reload, NO modal interaction.

### 3.3 Advanced Rules (Sub‑section, `▼` collapsed)
- **Overtime / Extra play** (Time‑Structured)  
- **Tie‑break customisation** (Target‑Score)  
- **Penalty / Deduction logic** (Performance)  
- **Move timers & illegal moves** (Turn‑Based)  
- **Stoppage & doctor rules** (Combat)  
- **Discipline weighting** (Multi‑Discipline)

### 3.4 Rare Overrides (Sub‑sub‑section, `▶` collapsed)
- Golden goal / sudden death  
- Mercy rule / run rule  
- Custom point values for specific outcomes  

**Layout Rule** – This level is **only expanded by power users** and is clearly marked "Only for custom federations".

---

## 4. Mizano Fund (Financial Management)

**Main Section**: `[ – ] 💰 Mizano Fund`  
*Automatically expanded if Entry Fee > 0; otherwise collapsed and can be manually opened.*

| Sub‑section           | Toggle   | Fields / Components                                                                 | Layout / Behaviour                                                                                       |
|-----------------------|----------|-------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| **Fund Purpose**      | `▼`      | Radio: Entry Fees / Prize Pool / Charity / Equipment Drive / Crowdfund              | Default = Entry Fees. Selecting "Equipment Drive" **auto‑expands** the Equipment Wishlist in Recruitment. |
| **Payment Channels**  | `▼`      | Checkboxes with inline fields:<br>‣ Orange Money (Merchant Code)<br>‣ Mascom MyZaka (Phone/Shortcode)<br>‣ BTC Smega (Wallet ID) | Each selection shows a static QR preview. At least one required.                                         |
| **Goal Tracker**      | `▼`      | Toggle: "Show Progress Bar" + `Target Amount` + `Deadline`                          | Progress bar appears on public competition page.                                                        |
| **Refund Logic**      | `▼`      | Dropdown: No refunds / Pro‑rated / Full refund                                      | Visible only if Entry Fee > 0. Pro‑rated requires cancellation date field.                              |
| **Budget Breakdown**  | `▼`      | Auto‑pie chart + editable sliders (Prizes, Equipment, Charity, etc.)                | Sliders update chart live. Corporate accounts see "Export as Expense Report".                           |

---

## 5. Recruitment & Logistics

**Main Section**: `[ – ] 👥 Recruitment & Logistics`  
*Collapsed by default. Expands when any Audience Targeting option is selected or user manually opens.*

| Sub‑section                | Toggle   | Fields / Components                                                                 | Conditional Visibility                                                              |
|----------------------------|----------|-------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| **Seeking Free Agents**    | `▼`      | Toggle: "Seeking players to join teams"<br>Then: Positions needed (multi‑select), Skill level (Beginner/Inter/Adv) | Always visible. When ON, competition appears in "Join a Team" feed.                 |
| **Equipment Wishlist**     | `▼`      | List builder: Item name, Qty, Est. cost, Link to business<br>Each item shows funding progress bar. | Auto‑expanded if Fund Purpose = Equipment Drive.                                    |
| **Volunteer Recruitment**  | `▼`      | Toggle: "Seeking Officials / Coaches / Parents"<br>Role dropdown, number, contact method. | Independent toggle.                                                                  |
| **Hobbyist Discovery**     | `▼`      | Tag input: "Interest Tags" (offline‑cached) + "Browse local hobbyists" button       | Visible only if Audience Targeting includes "Hobbyists".                            |
| **Transport & Carpool**    | `▼`      | Toggle: "Enable carpool board"<br>Venue departure points, max passengers            | Visible only for Neighborhood Community.                                             |

**Layout Rule** – Each sub‑section is itself collapsible (default collapsed). When a toggle inside is turned ON, the sub‑section **expands automatically** to reveal the detailed fields.

---

## 6. Eligibility & Rosters

**Main Section**: `[ – ] 🧑‍🤝‍🧑 Eligibility & Rosters`  
*Expanded by default if the competition is linked to a National Talent Pipeline (School / National Association); otherwise collapsed.*

### 6.1 Eligibility Constraints (Sub‑section, `▼`)
| Field                   | UI Component                  | Notes                                                                 |
|-------------------------|-------------------------------|-----------------------------------------------------------------------|
| Age Range               | Two date pickers (Min DOB / Max DOB) | Auto‑calculates age range label (e.g., "U15").                       |
| Gender                  | Radio: Male / Female / Mixed  | Mixed is default.                                                     |
| Verification Requirement| Checkbox + label             | "Players require guardian/school approval". Triggers approval workflow.|

### 6.2 Roster Management (Sub‑section, `▼`)
| Field           | UI Component                                          | Layout Rule                                                                   |
|-----------------|-------------------------------------------------------|-------------------------------------------------------------------------------|
| Squad Size      | Min / Max number inputs                              | Max cannot be less than min.                                                  |
| Position Matrix | "Configure Positions" button → inline expand panel    | Panel shows sport‑specific positions with quantity fields. "Default Lineup" preset. |

---

## 7. Format & Standings

**Main Section**: `[ – ] 📊 Format & Standings`  
*Expanded by default after Sport is selected.*

### 7.1 Format Options (Sub‑section, `▼`)
| Format          | UI Control                         | Behaviour                                                                 |
|-----------------|------------------------------------|---------------------------------------------------------------------------|
| Round Robin     | Radio + `# of rounds` (1‑2)        | Generates schedule.                                                      |
| Knockout        | Radio + Single/Double toggle       | Double elimination adds losers bracket.                                  |
| Swiss System    | Radio + `# of rounds`              | Pairing based on standings.                                              |
| Ladder          | Radio                              | No fixed schedule; challenge‑based.                                      |

### 7.2 Scoring & Standing Rules (Sub‑section, `▼`)
| Rule                  | UI Component                                                              | Layout / Validation                                                                      |
|-----------------------|---------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| Win/Draw/Loss Points  | Three number inputs (default 3‑1‑0)                                       | Preset dropdown: 3‑1‑0, 4‑2‑0, 2‑1‑0 (rugby).                                           |
| Bonus Points          | "+ Add trigger" → inline condition builder (e.g., "4 Tries in Rugby")     | Triggers appear as chips; click to edit.                                                 |
| Tie‑Breaker Hierarchy | Drag‑and‑drop list: Head‑to‑Head, Diff, For, Disciplinary                | Reorderable. Default order fixed but user can rearrange.                                 |

---

## 8. Advanced Policies

**Main Section**: `[ – ] ⚙️ Advanced Policies`  
*Always collapsed. Contains operational edge‑case rules.*

| Sub‑section                | Toggle   | Fields / Components                                                              | Default / Notes                                                    |
|----------------------------|----------|----------------------------------------------------------------------------------|--------------------------------------------------------------------|
| **Weather Abandonment**    | `▼`      | Slider: % of time played (60‑80%)<br>Radio: Automatic replay / Split points      | 70% / Split points (Southern African default).                    |
| **Referee Assignments**    | `▼`      | "Assign Officials" button → inline search for Mentor/Staff profiles              | Multi‑role per fixture.                                            |
| **Disciplinary Matrix**    | `▼`      | 2 Yellows = 1 match ban (number input)<br>Straight Red = 2 match ban (number input)<br>Accumulated yellows (threshold) | Pre‑filled with defaults; editable.                               |

---

## 9. Custom Sport Logic Builder (The "No‑Template" Rule)

**Trigger**: When user selects **"🌐 Other (Please Specify)"** in the Sport/Activity dropdown, the Core Identity section **dynamically expands** an inline wizard panel at the bottom of the Context sub‑section.

**Wizard Layout** – A stepper with 4 steps, each as a **collapsible card** (only current step expanded). User progresses linearly.

| Step                     | Fields / Components                                                                 | Layout Behaviour                                                                 |
|--------------------------|-------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| **1. Metric Definition** | Radio: Points / Time / Distance / Weight / Judges' Vote                             | Judges' Vote expands sub‑fields: Number of Judges, Criteria labels (free text).  |
| **2. Period Setup**      | Label input (e.g., "Innings", "Heats") + number of periods                          | Default label = "Period".                                                        |
| **3. Scoreboard Layout** | Drag‑and‑drop column builder (Score, Time, Penalty, Custom Metric)                 | Live preview of scorecard appears beside builder.                               |
| **4. Archetype & Save**  | Auto‑assigned archetype (Performance) + optional override dropdown                 | "Save as Template" button stores custom logic for reuse.                        |

**Layout Rule** – The wizard stays **inline**; user never leaves the Event Lab. Step indicators show progress. All data is saved locally until final confirmation. Once saved, the sport is added to the user's personal "Frequently Used" list.

---

## 10. Output & Export (Scorecard & Poster Engine)

**Main Section**: `[ – ] 📤 Publish & Export`  
*Collapsed by default. Expands when user is ready to generate assets.*

| Sub‑section            | Toggle   | UI Controls                                                                 | Output Format(s)                     | Layout Notes                                                                 |
|------------------------|----------|-----------------------------------------------------------------------------|--------------------------------------|------------------------------------------------------------------------------|
| **Poster Generator**   | `▼`      | Canvas preview; editable fields (Title, Date, Venue); sponsor overlay toggles | 1080×1080 PNG, 1920×1080 PNG         | One‑tap "Share". Queue for offline.                                         |
| **Scorecard Template** | `▼`      | Template style (Minimal, Detailed, Corporate); "Include player names?" checkbox | PDF, CSV (raw data)                  | Corporate = sponsor brand kit.                                              |
| **Live Score Link**    | `▼`      | Toggle: "Enable QR code per fixture"                                        | QR code PNG, short URL               | QR appears on competition page and printed cards.                           |
| **Social Media Kit**   | `▼`      | "Generate Kit" button                                                       | Zip archive (poster + standings)     | One‑tap share to WhatsApp/Facebook.                                         |
| **Archive Mode**       | `▼`      | Toggle: "Save to my library after event ends"                              | –                                    | Enabled by default for hobbyists.                                           |

**Layout Rule** – Each sub‑section has a **preview area** that updates in real time as configuration changes elsewhere in the Event Lab.

---

## 11. Participants & Live Scorekeeping

**Main Section**: `[ – ] 👥 Participants & Scorecard`  
*Collapsed by default. Expands after the first fixture is created.*

| Sub‑section        | Toggle   | Content                                                                 | Layout Rule                                                                 |
|--------------------|----------|-------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| **Roster View**    | `▼`      | List of registered teams/players, with positions and eligibility status | Filterable by team, position. Export as CSV.                               |
| **Live Scorecard** | `▼`      | Embedded score entry interface (archetype‑specific)                    | Appears only for active fixtures. QR code shortcut to spectator view.      |
| **Match History**  | `▼`      | List of completed fixtures with scores and disciplinary events          | Expand each row to see detailed stats.                                      |

**Layout Rule** – The Live Scorecard is a **mini‑scoreboard** that can be kept open while scrolling; it remains sticky at the bottom of the section.

---

## 12. Complete Sport Archetype Mapping (Reference)

**Main Section**: `[ + ] 📋 Full Sport Archetype Mapping (130+ sports)`  
*Always collapsed by default. When expanded, shows the complete table with every sport from the Mizano dropdown.*

| Display Name                       | Template Group       | Logic Key      | Configurable Fields (summary)                | Sport‑Specific Notes                          |
|------------------------------------|----------------------|----------------|----------------------------------------------|-----------------------------------------------|
| Acrobatic Arts                    | Performance          | `leaderboard`  | Points, Desc                                 | Judged – average score                       |
| Aerobatics                        | Performance          | `leaderboard`  | Points, Desc                                 | Precision flight                             |
| American Football                 | Time‑Structured      | `timer_split`  | 4 quarters, 15 min                          |                                               |
| Archery                           | Target‑Score         | `set_cap`      | Sets/Ends, Points per arrow                 | Shoot‑off tie‑break                          |
| … (full alphabetical list)        | …                    | …             | …                                            | …                                             |
| **🌐 Other (Please Specify)**     | User‑Defined         | `custom`       | User‑defined via Logic Builder              |                                               |

**Layout Rule** – The table is **horizontally scrollable** on narrow screens. Each row has a "Preview Rules" button that expands an inline summary of the template defaults.

---

## 13. Offline & Sync Behaviour

**Indicator**: Cloud icon in Sticky Header.  
- `☁️` = Online  
- `☁️🚫` = Offline – all changes saved locally (IndexedDB).  
- Sync button appears when offline changes pending.

**Layout Rule** – All expandable sections **remain fully interactive offline**. Cached data (sponsors, venues, governing body rules) is used. A "Last synced" timestamp is displayed in the relevant sub‑sections (e.g., Governing Body Linkage).

**Offline Feature Set**:
- Full competition creation and editing
- Sponsor/business lookup (cached)
- Venue GPS manual entry (geocode queued)
- QR code generation
- Poster & scorecard export
- Bluetooth "Event Share" to transfer competition drafts between devices

---

## Appendix: UI Component Reference

| Component              | Behaviour                                                                          | Used In                                                       |
|------------------------|------------------------------------------------------------------------------------|---------------------------------------------------------------|
| Inline expand panel    | Slides open below trigger, does not cover other content.                           | Position Matrix, Bonus Point builder, Custom Sport wizard     |
| Chip input             | Enter text, press comma/enter to create chip.                                      | Equipment Wishlist items, Hobbyist tags                       |
| Drag handle (⋮⋮)       | Reorder items (sponsors, tie‑breaker rules).                                      | Sponsor list, Tie‑Breaker Hierarchy                           |
| QR preview             | Static QR code image representing payment channel or live score link.              | Payment Channels, Live Score Link                             |
| Progress bar (visual)  | Shows percentage of target reached; colour = green (≥100%) / amber.                | Goal Tracker, Equipment Wishlist                              |
| Sport minimap          | Compact reference card showing current template group and key rules.               | Game Rules panel (bottom, collapsible)                       |

---

## CRITICAL IMPLEMENTATION NOTES FOR AI CODE BUILDER

### Architecture Principles
1. **Single-Page Application (SPA)**: All sections exist on one vertically scrollable page - NO separate routes or page navigation for Event Lab sections
2. **Progressive Disclosure**: Use the +/- collapsible hierarchy religiously - Main (expanded) → Sub (collapsed) → Sub-sub (collapsed)
3. **Inline Expansion**: NO modals allowed for the rule-building or configuration process - everything expands inline pushing content down to maintain spatial context.
4. **Offline-First**: IndexedDB for local storage, sync every 15 minutes when online, all features work offline
5. **Template-Driven Logic**: Sport selection dispatches to one of 7 template groups automatically - fields are dynamically injected based on template

### Key Technical Constraints
- **Data Storage**: IndexedDB for offline, Google Sheets API v4 for sync (lightweight backend)
- **Mobile Optimization**: Floating Action Menu collapses to "⚡" button on mobile
- **Real-Time Preview**: All configuration changes update preview areas immediately (poster, scorecard, etc.)
- **Sticky Elements**: Header always visible, Live Scorecard sticky at bottom when active
- **Form Validation**: Inline validation with clear error states, no page submission required

### Critical User Flows
1. **Sport Selection → Template Dispatch**: Choosing sport auto-expands Game Rules panel with template-specific fields
2. **Entry Fee > 0 → Auto-Expand Fund**: Setting entry fee automatically opens Mizano Fund panel
3. **Equipment Drive → Wishlist**: Selecting "Equipment Drive" as fund purpose auto-expands Equipment Wishlist in Recruitment
4. **School/Association → Governing Body**: Organization type selection conditionally shows Governing Body Linkage
5. **Custom Sport → Wizard**: "🌐 Other" triggers 4-step inline wizard (Metric → Period → Scoreboard → Save)

### Component Reusability
- Collapsible Card (Main/Sub/Sub-sub levels)
- Inline Expand Panel (Position Matrix, Bonus Points, Custom fields)
- Chip Input (Tags, Wishlist items)
- Drag & Drop (Sponsors, Tie-breakers, Scoreboard columns)
- QR Code Preview (Payment channels, Live score links)
- Progress Bar (Fund goals, Equipment funding)

### State Management Strategy
- Local state for UI (expanded/collapsed states)
- IndexedDB for draft competitions (offline persistence)
- Sync queue for pending changes (offline → online)
- Template cache for sport rules (downloaded offline)

### Accessibility & Performance
- All collapsible sections keyboard navigable (Space/Enter to toggle)
- Focus management when expanding/collapsing sections
- Lazy load sport archetype mapping table (130+ sports)
- Image optimization for posters/logos (WebP, max 200KB)
- Virtual scrolling for long lists (participants, match history)

---

**Last updated:** February 15, 2026  
*Note: Integrated Corporate Teams and Sport Archetype Mapper (v1.5).*

**This specification is the authoritative source for Event Lab implementation. Every UI decision must conform to the +/– collapsible hierarchy and template‑driven rule engine described above.**  

**The Event Lab is the heart of Mizano – where any competition, from a neighbourhood chess night to a national netball league, comes to life in under 60 seconds.**
