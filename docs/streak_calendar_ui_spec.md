# Streak & Consistency Calendar UI Spec

## Purpose
Monthly heat-map view of activity consistency.

## UI Layout

**Monthly Calendar**

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

## Visuals
- **Day Cell:** 40x40px square.
- **Active Day:** Filled Green (#70AD47, 70% opacity).
- **Inactive Day:** Transparent or light grey background.
- **Today:** Highlighted border.

## Behavior
- **Tap Day:** Show bottom sheet with list of activities logged that day.
- **Swipe:** Change month.
