# Habit Chain UI Specification

## Purpose
Visual chain calendar where users mark daily completion of a chosen habit.

## UI Layout

**Habit Chain Screen** (Mine Panel > Habits)

```
┌─────────────────────────────────────┐
│ My Habit Chain                      │
│ [ Drink 8 glasses of water ] (Edit) │
│                                     │
│ Current Streak: 5 days 🔥           │
│ Longest Streak: 12 days             │
│                                     │
│     M   T   W   T   F   S   S       │
│    [x]-[x]-[x]-[x]-[x] [ ] [ ]      │
│                                     │
│ [ Mark Today Complete ]             │
│                                     │
│ 🔔 Reminder: 08:00 AM (Toggle On)   │
└─────────────────────────────────────┘
```

## Interactions
- **Mark Complete:** Toggles the state for the current day. Triggers a small confetti animation.
- **Chain Visual:** CSS line connects consecutive completed days.
- **Edit Habit:** Opens modal to change habit name or reminder time.
