# Participation Stats Aggregation

## Overview
Anonymous logic to compute and display community activity levels without compromising privacy.

## Aggregation Process (Cloud Side)

1.  **Input:** Synced `tracker_entries` from all users.
2.  **Trigger:** Nightly or hourly script.
3.  **Logic:**
    *   Filter entries from last 7 days.
    *   Group by `location_code` (Village, City, Region).
    *   Count `DISTINCT user_id`.
    *   Update `participation_stats` sheet.

## Distribution (Client Side)

1.  **Pull Sync:**
    *   Device requests stats for its hierarchy:
        *   `user.village`
        *   `user.city`
        *   `user.region`
        *   `nation` (Botswana)
    *   Stores in local `participation_stats` table.

## Privacy
*   No user IDs are stored in the stats table.
*   Only aggregate counts are synced back to devices.
*   Small areas (< 5 users) may be fuzzied or hidden to prevent identification.
