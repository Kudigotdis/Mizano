# Neighborhood Challenge Sync Logic

## Overview
Challenges are location-based and initiated offline. They sync when users are online and in the same area.

## Data Flow

1.  **Creation (Offline/Online):**
    *   User creates challenge.
    *   Stored locally in IndexedDB `challenges` table.
    *   `sync_status` set to "pending".

2.  **Push Sync (15-min interval):**
    *   App checks for `sync_status: "pending"`.
    *   Uploads challenge object to `Google Sheets > Challenges Sheet`.
    *   Indexed by `area` column (e.g., "GC·Block3").

3.  **Pull Sync (15-min interval):**
    *   App queries `Google Sheets` for challenges where `area == user.currentArea`.
    *   Downloads active challenges.
    *   Merges with local store (upsert based on `challenge_id`).

4.  **Progress Updates:**
    *   Participant progress is stored in the `progress` map field of the challenge object.
    *   Updates are merged using "Last Write Wins" timestamp logic.

## Schema Reference

```json
{
  "challenge_id": "uuid",
  "area": "GC·Block3",
  "participants": ["userA", "userB"],
  "progress": {
    "userA": 5.2,
    "userB": 3.0
  }
}
```
