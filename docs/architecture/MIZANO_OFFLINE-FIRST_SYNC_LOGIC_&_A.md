MIZANO_OFFLINE-FIRST_SYNC_LOGIC_&_ARCHITECTURE.md

# MIZANO OFFLINE-FIRST SYNC LOGIC & ARCHITECTURE
**Version 2.5 (Updated for Mizano v2.5) | February 15, 2026**  
*Supporting Documents: [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md), [MIZANO_PAGE_FLOW_ARCHITECTURE.md](MIZANO_PAGE_FLOW_ARCHITECTURE.md), [MIZANO_DESIGN_GUIDE.md](MIZANO_DESIGN_GUIDE.md)*

---

## 1. SYSTEM OVERVIEW

Mizano is built on an **offline-first** architecture to address Botswana’s intermittent connectivity. All core features work without an internet connection, and data synchronizes intelligently when connectivity returns. This document details the synchronization logic, data flows, conflict resolution, and technical implementation.

### 1.1 Design Principles (from Project Summary v2.0)

| Principle            | Implementation                                                                                                                                                                                                                                 |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Offline-First**    | 100% of core features work without internet. Local SQLite/IndexedDB stores all critical data. Medical/health information is **device-only** (never synced).                                                                                   |
| **Low-Data**         | Minimal data transfer per sync cycle (<2 seconds for 50‑user roster). Text‑first design, WebP images (<200KB), vector icons (<30KB).                                                                                                          |
| **15-Minute Sync**   | Automatic background sync every 15 minutes when online. Balances real‑time needs vs. battery/data costs.                                                                                                                                      |
| **User-Controlled**  | Manual ‘Sync Now’ button in Settings → Data & Offline Sync for immediate push/pull.                                                                                                                                                           |
| **Conflict Resolution** | Last‑write‑wins with timestamp tracking. **Staff Override** at Game Cubes for physical verification (equipment disputes, etc.).                                                                                                               |
| **Trust Layer**      | Dual‑rating system (borrower + lender) prevents bias. Borrow Score algorithm ensures accountability.                                                                                                                                          |
| **Privacy by Design** | No PII stored on server. Backend tracks **anonymous tallies** only (e.g., “15 users with medical alerts in Gaborone”).                                                                                                                        |

### 1.2 Why 15-Minute Intervals?

- **Battery Efficiency:** Constant real‑time sync drains batteries. 15 minutes balances freshness with power.
- **Data Costs:** Batched syncs minimise overhead for users with limited data bundles.
- **Network Reality:** Many users experience signal drops; 15‑minute windows tolerate brief outages.
- **Use Case Alignment:** For grassroots sports, exact‑second updates are unnecessary. “Near real‑time” (15 min) is sufficient.

---

## 2. OFFLINE-FIRST ARCHITECTURE

Mizano’s architecture places local storage as the primary source of truth during offline periods. All user actions write to the local database first, then queue for sync when connectivity returns.

### 2.1 Technology Stack

| Layer                | Technology                         | Responsibility                                                                                      |
| -------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------- |
| **Frontend**         | HTML5 Web App → Android APK (Capacitor) | Native mobile UI, user interactions, sync triggers.                                                 |
| **Local Storage**    | IndexedDB (complex data), LocalStorage (prefs) | Stores rosters, equipment ledger, map tiles, Borrow Scores, Bulletin posts, user profiles.          |
| **Sync Manager**     | JavaScript background service (Workbox) | Orchestrates sync cycles, manages retry logic, handles conflicts, logs errors.                      |
| **Backend**          | Google Sheets API v4                | Master data store, aggregates data from all devices, provides real‑time view for online users.      |
| **External Integrations** | WhatsApp `wa.me`, Facebook Graph API | Zero‑data communication channels; no sync dependency (URL‑based deep links).                        |

### 2.2 Data Flow: Write Path (User Action → Storage)

1. User performs action (e.g., joins match, borrows equipment, posts to Bulletin, edits profile).
2. App writes to local IndexedDB **immediately**.
3. Action is added to **Sync Queue** with timestamp and `sync_status = 'pending'`.
4. User receives instant UI feedback (no waiting for network).
5. Background sync service picks up queued actions at next 15‑minute interval (or manual sync).
6. **If online:** Push to Google Sheets API → Update master data.
7. **If offline:** Queue persists; retry at next sync attempt.

### 2.3 Data Flow: Read Path (Display → User)

1. User navigates to Activity Page, Dashboard, etc.
2. App queries local IndexedDB for cached data.
3. Display data immediately (even if stale).
4. **If online:** Background sync fetches fresh data from Google Sheets API.
5. If data changed: Update local cache + notify UI to refresh.
6. **If offline:** Continue showing cached data with ‘Last synced: X mins ago’ indicator.

### 2.4 Sensitive Data Handling (Medical)

- Medical conditions, HIV status, and other sensitive health information are **stored only on the device** (never synced).
- Backend maintains only anonymous counters (e.g., “15 users in Gaborone have medical alerts”).

---

## 3. DATA ENTITIES & LOCAL STORAGE

The local IndexedDB stores critical entities that enable offline functionality. Each entity has a corresponding object store with sync metadata.

### 3.1 Entity List & Sync Priority

| Entity              | Local Store          | Synced Data                                                              | Priority |
| ------------------- | -------------------- | ------------------------------------------------------------------------ | -------- |
| **Match Rosters**   | `match_rosters`      | User IDs, match IDs, join timestamps, status (confirmed/pending)        | High (P0)|
| **Equipment Ledger**| `equipment_ledger`   | Item IDs, borrower IDs, check‑out/in times, dual ratings, item status   | High (P0)|
| **Borrow Scores**   | `borrow_scores`      | User IDs, aggregate ratings, borrow frequency, restriction flags        | Medium (P1)|
| **Bulletin Posts**  | `bulletin_posts`     | Post IDs, content (text‑only), user IDs, timestamps, moderation status  | Medium (P1)|
| **Activity Cards**  | `activities`         | Activity IDs, status, location, organizer info, call‑out flags          | Medium (P1)|
| **User Profiles**   | `user_profiles`      | Profile IDs, types (Player/Guardian/etc), preferences, linked minors    | Low (P2) |
| **Notifications**   | `notifications`      | Notification IDs, types, timestamps, read status                         | Low (P2) |
| **Map Tiles**       | `map_tiles`          | 1MB static Gaborone map (PNG tiles) – **static, no sync**               | –        |

### 3.2 Sync Metadata Fields

Every object store includes these fields for sync tracking:

| Field           | Type      | Purpose                                                                 |
| --------------- | --------- | ----------------------------------------------------------------------- |
| `local_id`      | number    | Unique local identifier (auto‑increment).                               |
| `cloud_id`      | string    | Corresponding ID in Google Sheets (`NULL` if not yet synced).           |
| `last_modified` | timestamp | When record was last updated locally.                                   |
| `sync_status`   | string    | `pending` \| `synced` \| `conflict` \| `error`.                         |
| `sync_attempts` | number    | Retry counter for failed syncs (max 3 before flagging).                 |
| `created_at`    | timestamp | When record was first created locally.                                  |

---

## 4. SYNC TRIGGER MECHANISMS

Mizano uses multiple triggers to initiate sync cycles, balancing automation with user control.

### 4.1 Automatic Background Sync (Every 15 Minutes)

- **Trigger:** Background service with periodic timer (Workbox / `setInterval` when app is open; background sync API when closed).
- **Conditions:**
  - Device has network connectivity (cellular or Wi‑Fi).
  - App is installed (service worker can run in background).
  - Battery not in critical low state (<5%).
- **Behavior:** Sync runs silently. No user notification unless errors occur.

### 4.2 Manual Sync (User‑Initiated)

- **Trigger:** User taps ‘Sync Now’ in Settings → Data & Offline Sync.
- **Conditions:** None (bypasses battery checks; forces immediate sync).
- **Behavior:**
  - Shows spinner overlay: “Syncing...”.
  - On success: “Synced successfully. Last sync: Just now”.
  - On failure: Error message with retry option.

### 4.3 App Launch Sync

- **Trigger:** User opens app after being closed >1 hour.
- **Behavior:** Immediate sync attempt to fetch fresh data before displaying dashboard.

### 4.4 Critical Action Sync (Fast‑Track)

- **Trigger:** High‑priority actions (e.g., Guardian approval for minor, injury alert, Staff override).
- **Behavior:** Triggers immediate sync (not queued for 15‑minute cycle) to minimise delay for safety‑critical data.

---

## 5. SYNC WORKFLOW: MAIN FLOWCHART

The master sync logic executed every 15 minutes (or on manual trigger). **Push before pull** ensures local changes are not overwritten by stale cloud data.

| Step | Action                                                                 | Condition                     | Next Step |
| ---- | ---------------------------------------------------------------------- | ----------------------------- | --------- |
| 1    | **START:** Sync timer triggers                                         | Always                        | 2         |
| 2    | Check network connectivity                                             | Online? → 3<br>Offline → END | 3 / END   |
| 3    | Authenticate with Firebase (refresh token if needed)                   | Valid? → 4<br>No → refresh    | 4         |
| 4    | Query local IndexedDB for records with `sync_status = 'pending'`       | Any found? → 5<br>None → 10   | 5 / 10    |
| 5    | **PUSH Phase:** Iterate each pending record                            | For each entity type          | 6         |
| 6    | Prepare JSON payload from local data                                   | Always                        | 7         |
| 7    | POST to Google Sheets API                                              | HTTP 200 OK? → 8<br>Error → 9 | 8 / 9     |
| 8    | Update local record: `sync_status = 'synced'`, `cloud_id` = response  | Always                        | next record → 5 |
| 9    | Increment `sync_attempts`. If ≥3 → `sync_status = 'error'`            | Always                        | next record → 5 |
| 10   | **PULL Phase:** Fetch updates from cloud                               | Always                        | 11        |
| 11   | GET from Google Sheets API (filter: `last_modified > local_last_sync_time`) | Always                        | 12        |
| 12   | Compare cloud timestamp vs. local timestamp                            | Cloud newer? → 13<br>Same → 14 | 13 / 14   |
| 13   | Apply **conflict resolution** (see Section 10)                         | Always                        | 14        |
| 14   | Update local IndexedDB with fresh data                                 | Always                        | 15        |
| 15   | Update `last_sync_time` in metadata table                              | Always                        | 16        |
| 16   | Notify UI to refresh if user is viewing affected data                  | If on affected page → refresh | 17        |
| 17   | **END:** Sync complete. Queue next 15‑min cycle.                       | Always                        | –         |

**Key Notes:**
- **PUSH before PULL:** Local changes pushed first to avoid overwriting with stale cloud data.
- **Atomic updates:** Each entity type synced independently (prevents one failure from blocking others).
- **Retry logic:** Failed pushes retry at next sync cycle (max 3 attempts before flagging for manual review).

---

## 6. EQUIPMENT LEDGER SYNC

The Equipment Rental Ledger is a **high‑priority (P0)** entity due to accountability requirements at Game Cubes.

### 6.1 Offline Check‑Out / Check‑In Flow

| Action       | User Flow                                                                                                                              | Local Storage Update                                                                                             | Sync Behavior                                                                                 |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Check‑Out** | 1. User scans item QR code at Game Cube.<br>2. Staff/User enters borrower ID.<br>3. Tap ‘Check Out’.                                   | Write to `equipment_ledger`: item_id, borrower_id, checkout_time, sync_status='pending'                          | Queued for next 15‑min sync. Staff sees “Pending Sync” badge.                                |
| **Check‑In**  | 1. User returns item.<br>2. Both parties rate (1‑5 stars).<br>3. Staff verifies item condition.<br>4. Tap ‘Check In’.                  | Update record: checkin_time, borrower_rating, lender_rating, item_status, sync_status='pending'                  | Dual‑rating prevents bias. Borrow Score recalculated on sync (see Section 8).                |
| **Staff Override** | In case of dispute, Staff can manually adjust ratings.                                                                                 | Override flag set, sync_status='pending' with Staff metadata.                                                    | Override takes precedence in conflict resolution.                                             |

### 6.2 Borrow Score Calculation (Triggered on Sync)

1. Fetch all check‑in records for a user from `equipment_ledger` (both local and cloud after merge).
2. Calculate average rating: `AVG(lender_rating)` (excludes borrower’s self‑rating).
3. Weight by frequency:  
   `score = (avg_rating × 0.7) + (borrow_count × 0.001)` (capped at 5.0).
4. If `score < 3.0` AND `borrow_count > 5` → set `restriction_flag = TRUE`.
5. Write to `borrow_scores` table with `sync_status='synced'`.

---

## 7. MATCH ROSTER SYNC (Bluetooth Peer‑to‑Peer)

Match rosters support Bluetooth peer‑to‑peer join when internet is unavailable. This is critical for Game Cube sign‑ups.

### 7.1 Bluetooth Join Flow (Offline)

| Step | Player Device                                                         | Organiser/Hub Device                                  | Sync Trigger                                          |
| ---- | --------------------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| 1    | Player taps ‘Join Match via Bluetooth’                                | Hub device is in discoverable mode at Game Cube       | –                                                     |
| 2    | Player device scans for nearby match broadcasts                       | Hub broadcasts match_id via Bluetooth                  | –                                                     |
| 3    | Player selects match → sends join request                             | Hub receives request                                   | –                                                     |
| 4    | Player device writes to local `match_rosters` (`sync_status='pending'`) | Hub device writes same data to its local `match_rosters` | –                                                     |
| 5    | Player sees ‘Joined (Pending Sync)’ badge                             | –                                                     | –                                                     |
| 6    | **Next sync cycle (<15 min):** Both devices sync; cloud reconciles duplicates | –                                                     | Cloud merges both records (same join treated once).   |

### 7.2 Roster Display (15‑Minute Lag)

- Rosters update every 15 minutes to account for offline participants. Users see ‘Last updated: X mins ago’ indicator.

**Example:**
- 3:00 PM – 8 players joined (5 online, 3 via Bluetooth).
- 3:15 PM – Sync cycle runs → Cloud shows all 8 players.
- 3:20 PM – User views roster → Sees ‘8 players (Updated 5 mins ago)’.
- 3:22 PM – 2 more players join online → Locally visible immediately, globally visible at 3:30 PM sync.

---

## 8. BORROW SCORE SYNC

Borrow Scores are **derived data** calculated during sync cycles based on equipment ledger records. They do not sync as user input but as computed outputs.

### 8.1 Sync Flow for Borrow Scores

| Phase               | Action                                                                                               | Timing                       |
| ------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------- |
| **Local Calculation** | When equipment check‑in completes, local device recalculates borrower’s score immediately for UI display. | Real‑time (offline‑capable) |
| **Push to Cloud**   | During sync cycle, push `equipment_ledger` records (check‑in + ratings).                             | Every 15 minutes             |
| **Cloud Aggregation** | Cloud backend recalculates Borrow Score for all users using master ledger data.                      | Triggered by sync (batch)    |
| **Pull Fresh Scores** | Devices pull updated Borrow Scores from cloud (for other users’ scores, e.g., when viewing profiles). | Every 15 minutes             |
| **Conflict Resolution** | If local score differs from cloud (rare): Cloud version takes precedence (master calculation).      | On pull                      |

**Why Dual Calculation?**
- **Immediate Feedback:** Users see their score update instantly after returning equipment.
- **Master Truth:** Cloud aggregates ALL borrows (not just local device’s history) for accurate global score.
- **Fraud Prevention:** If a user manipulates local database, cloud recalc overrides on next pull.

---

## 9. BULLETIN & NOTIFICATIONS SYNC

Bulletin posts and notifications are **text‑only** for low‑data efficiency. Moderation happens server‑side before propagating to devices.

### 9.1 Bulletin Post Lifecycle

| Stage          | User Action                           | Local State                                                                 | Cloud State                         | Sync Behavior                        |
| -------------- | ------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------ |
| **1. Draft**   | User writes post in Bulletin form     | Saved locally (not submitted)                                               | –                                   | No sync                              |
| **2. Submit**  | User taps ‘Post’                      | Write to `bulletin_posts`: content, user_id, timestamp, moderation_status='pending', sync_status='pending' | –                                   | Queued for sync                      |
| **3. Push**    | Next sync cycle                       | `sync_status='synced'`                                                      | Cloud receives post → triggers mod  | –                                    |
| **4. Moderate**| –                                     | –                                                                           | Moderation decision (approved/rejected) | –                                    |
| **5. Pull**    | Subsequent sync cycles                | If approved: post visible in Bulletin Feed. If rejected: local post flagged. | Cloud broadcasts approved posts to all devices | –                                    |

### 9.2 Notification Sync (Priority‑Based)

Notifications use priority tiers to determine sync urgency:

| Priority   | Types                                         | Sync Behavior                                          |
| ---------- | --------------------------------------------- | ------------------------------------------------------ |
| **Critical (P0)** | Injury alerts, Guardian approvals, Staff overrides | Immediate push (bypasses 15‑min cycle).                |
| **High (P1)**     | Call‑outs, activity updates, roster changes   | Standard 15‑min sync.                                  |
| **Low (P2)**      | Stream alerts, sponsorship milestones         | Batched (may delay up to 30 min if bandwidth limited). |

---

## 10. CONFLICT RESOLUTION LOGIC

Conflicts occur when the same record is modified on multiple devices during offline periods. Mizano uses **Last‑Write‑Wins (LWW)** with **Staff Override** for physical disputes.

### 10.1 Conflict Detection

During PULL phase (Step 12), the sync manager compares timestamps:

1. Fetch cloud record with `cloud_id` matching local record.
2. Compare `cloud.last_modified` vs. `local.last_modified`.
3. If `cloud.last_modified > local.last_modified + 5 seconds` → **CONFLICT**.

### 10.2 Resolution Strategies (by Entity Type)

| Entity              | Conflict Scenario                                                              | Resolution Strategy                                                                                          | Example                                                                                          |
| ------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| **Equipment Ledger**| Two Staff members rate same borrow differently (e.g., one gives 4 stars, another 2). | **Staff Override Priority:** If one rating is a Staff override, that wins. Else, take the later timestamp. | Staff A (override): 4 stars; Staff B: 2 stars → Result: 4 stars.                                |
| **Match Rosters**   | Player joins on Device A; same player removed on Device B (offline).           | **Last‑Write‑Wins:** Later timestamp wins.                                                                  | Device A: join at 3:00 PM; Device B: remove at 3:10 PM → Result: removed.                       |
| **Borrow Scores**   | Local calculation differs from cloud calculation (rare).                       | **Cloud Authority:** Cloud‑calculated score overrides local.                                                | Local: 4.8; Cloud: 4.6 → Result: 4.6.                                                            |
| **Bulletin Posts**  | User edits post on Device A; Staff rejects post on Device B (moderation).      | **Moderation Priority:** Staff action (reject) overrides user edit.                                         | User edits at 2:00 PM; Staff rejects at 2:05 PM → Post rejected.                                 |
| **User Profiles**   | User updates name on Device A and Device B while offline.                      | **Last‑Write‑Wins:** Later timestamp.                                                                       | Device A: update at 10:00 AM; Device B: update at 10:05 AM → Device B’s name wins.               |

### 10.3 User Notification on Conflicts

When a conflict is resolved **against** the user’s local change:

- **Non‑critical data** (e.g., profile name): Silent override; ‘Last synced’ indicator updates.
- **Critical data** (e.g., roster removal): In‑app notification: “Your join was cancelled by organiser at 3:10 PM.”

---

## 11. ERROR HANDLING & RETRY LOGIC

Network failures, API timeouts, and authentication errors are common. Mizano implements graceful degradation and exponential backoff.

### 11.1 Error Categories

| Error Type                | Cause                                           | Handling Strategy                                                                                          | User Impact                             |
| ------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| **Network Timeout**       | Request exceeds 30‑second limit                 | Retry at next 15‑min cycle (increment `sync_attempts`).                                                    | Silent (queued)                         |
| **HTTP 401 (Unauthorized)**| Firebase token expired                          | Refresh token → Retry immediately.                                                                         | Transparent (no user action)            |
| **HTTP 403 (Forbidden)**  | User lacks permission (e.g., non‑Guardian approving minor) | Mark `sync_status='error'` → Notify user: “Action requires Guardian approval.”                             | In‑app alert                            |
| **HTTP 500 (Server Error)**| Google Sheets API unavailable                   | Exponential backoff: retry at 15min, 30min, 60min intervals.                                                | Silent until 3rd failure → notify user. |
| **Data Validation Error** | Local data corrupt (e.g., negative Borrow Score) | Skip record → Log to `error_log` table → Flag for Admin review.                                             | Silent (admin notified)                  |
| **Conflict Unresolvable** | Staff override + cloud update simultaneously    | Manual intervention required → `sync_status='conflict'` → Admin dashboard alert.                            | User sees “Sync pending review”.        |

### 11.2 Retry Algorithm (Exponential Backoff)

```pseudocode
attempt = 1
while attempt <= 3:
    if sync_successful:
        sync_status = 'synced'
        break
    else:
        wait_time = 15 * (2 ** (attempt - 1))  # 15min, 30min, 60min
        sleep(wait_time)
        attempt += 1
if attempt > 3:
    sync_status = 'error'
    notify_admin()
```

---

## 12. PERFORMANCE TARGETS

To ensure Mizano’s offline‑first architecture remains efficient in Botswana’s low‑bandwidth environment, the following benchmarks must be met:

| Metric                  | Target                                  | Measurement Method                       | Rationale                                                                 |
| ----------------------- | --------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------- |
| **Sync Duration**       | <2 seconds for 50‑user roster update    | Profile sync cycles under load           | 15‑minute intervals require fast execution to avoid pileup.              |
| **Battery Impact**      | <2% battery per 8‑hour day (background) | Measure drain over 8h with sync active   | Users cannot afford heavy battery drain.                                  |
| **Data Transfer**       | <500 KB per sync cycle (all entities)   | Monitor network traffic per sync         | Keeps data costs low for users on limited bundles.                        |
| **Offline Functionality**| 100% of P0 features work without internet | Test each P0 feature offline            | Core features must always be usable.                                      |
| **Conflict Rate**       | <1% of syncs result in conflicts        | Log conflict events in production        | LWW with Staff Override should keep conflicts rare.                       |
| **Error Rate**          | <5% of syncs fail (require retry)       | Monitor sync failures                    | Retry logic should handle most transient errors.                          |
| **Manual Intervention** | <0.1% of syncs require Admin/Staff action | Track `sync_status='conflict'` or 'error' | System should be largely self‑healing.                                    |
| **User Perception**     | ‘Last synced’ indicator < 20 minutes old | Measure time between successful syncs    | Users should rarely see stale data for long.                              |

### 12.1 Optimization Strategies

- **Compression:** Gzip all API payloads (reduces transfer by ~70%).
- **Diff‑based sync:** Only send changed fields, not full records.
- **Priority queues:** Sync P0 entities first (rosters, ledger) before P1/P2.
- **Batch writes:** Group IndexedDB writes into single transactions (reduces disk I/O).
- **Delta encoding:** For Borrow Scores, send only score change (±0.2) not full recalculation.

---

## 13. IMPLEMENTATION CHECKLIST

This checklist ensures all components of the offline‑first sync system are properly implemented and tested, aligned with Mizano v2.0 milestones.

### 13.1 Phase 1: Local Storage (Q1 2026 – MVP)

- [x] Design IndexedDB schema for all P0 entities (match_rosters, equipment_ledger, borrow_scores, bulletin_posts, activities).
- [x] Add sync metadata fields (`local_id`, `cloud_id`, `last_modified`, `sync_status`, `sync_attempts`, `created_at`) to all object stores.
- [x] Implement local write operations (check‑out, join match, post bulletin) with instant UI feedback.
- [x] Build sync queue system (pending records tracker).
- [x] Test offline functionality: Disconnect device → Perform 20 actions → Verify all queued.

### 13.2 Phase 2: Sync Manager (Q1 2026 – MVP)

- [x] Set up background service (Workbox / `setInterval`) with 15‑min timer.
- [x] Implement PUSH logic: Iterate pending records → POST to Google Sheets API → Update `sync_status`.
- [x] Implement PULL logic: GET from cloud → Compare timestamps → Apply conflict resolution.
- [x] Add manual ‘Sync Now’ button in Settings with spinner overlay.
- [x] Test sync cycle: Queue 10 records → Wait 15 min → Verify cloud updated.
- [x] Test manual sync: Tap button → Verify immediate sync attempt.

### 13.3 Phase 3: Bluetooth Integration (Q1 2026 – MVP)

- [x] Implement Bluetooth discoverable mode for Hub devices at Game Cubes (using Web Bluetooth API or native plugin).
- [x] Build peer‑to‑peer join flow: Player scans → Sends join request → Both devices queue.
- [x] Add ‘Joined (Pending Sync)’ UI badge for offline joins.
- [x] Test Bluetooth range: Verify 10‑meter indoor range (typical Game Cube size).
- [x] Test deduplication: Both devices sync same join → Cloud reconciles.

### 13.4 Phase 4: Conflict Resolution & Error Handling (Q2 2026)

- [x] Implement Last‑Write‑Wins logic with timestamp comparison.
- [x] Add Staff Override priority for equipment ledger conflicts.
- [x] Build exponential backoff retry algorithm (15min, 30min, 60min).
- [x] Create `error_log` table for unresolvable conflicts.
- [x] Add Admin dashboard alerts for `sync_status='conflict'` or `'error'`.
- [x] Test conflict scenarios: 2 devices edit same record offline → Verify resolution.
- [x] Test retry logic: Simulate network timeout → Verify 3‑attempt backoff.

### 13.5 Phase 5: Performance Optimization (Q3–Q4 2026)

- [ ] Enable Gzip compression on all API requests/responses.
- [ ] Implement diff‑based sync (only changed fields).
- [ ] Add priority queues: P0 entities sync first.
- [ ] Batch IndexedDB writes into transactions.
- [ ] Measure battery impact: Run 8‑hour test → Verify <2% drain.
- [ ] Measure data transfer: Monitor sync cycle → Verify <500 KB.
- [ ] Load test: Simulate 1000 devices syncing simultaneously → Verify <5% error rate.

---

## 14. REFERENCES & CROSS‑DOCUMENT LINKS

- **Project Summary v2.0** – High‑level vision, monetisation, features, KPIs.  
  [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
- **Page Flow Architecture** – Detailed navigation, user journeys, and offline action flows.  
  [MIZANO_PAGE_FLOW_ARCHITECTURE.md](MIZANO_PAGE_FLOW_ARCHITECTURE.md)
- **Design Guide** – UI/UX specifications, colour system, card designs.  
  [MIZANO_DESIGN_GUIDE.md](MIZANO_DESIGN_GUIDE.md)
- **Event Lab Architecture** – (if separate) Competition builder sync details.

---

**Document Owner:** Mizano Engineering Team  
**Last Updated:** February 13, 2026  
**Version:** 2.0 (aligns with Project Summary v2.0)  
**Status:** Final – Implementation Reference

*This document is the single source of truth for all offline sync logic, data flow, and conflict resolution in Mizano. All development must adhere to the specifications herein.*