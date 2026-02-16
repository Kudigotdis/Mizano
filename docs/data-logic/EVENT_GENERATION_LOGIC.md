# Event Generation Logic (Legacy Preservation)

> [!NOTE]
> This logic has been implemented in `scripts/generate_events.js`. This document serves as a reference for the rules used.

# EVENTS DOCUMENT IMPORTANT

We need a comprehensive dataset for 212 events (30 sponsored + 182 tourism) and a design for the 7 post‑tap expansion experiences. Below I provide:

1. **A JavaScript generator** that combines both event sources and enriches each with fields to determine the correct “Experience Type”.
2. **Sample output** showing a few events with the new fields.
3. **Detailed wireframe descriptions** (ASCII diagrams) for each of the 7 expansion modules, aligned with the **Card Design System** and **Zero‑Friction UI** principles.

---

## 1. Event Dataset Generator

The implementation script (`scripts/generate_events.js`) reads the two event lists and produces a single `events_generated.js` file ready to be injected into `window.MIZANO_DATA.events`.  
It automatically assigns an **experience type** to each event based on the rules you defined.

### Logic Rules

```javascript
function determineExperienceType(event) {
  // Priority order
  if (event.guardianRequired || (event.ageGroup && event.ageGroup !== 'adult')) {
    return 'three_way_handshake';
  }
  if (event.entryFee > 0) {
    return 'monetization_waiver';
  }
  if (event.scoutAttendance || event.talentIdentification) {
    return 'sports_cv_sync';
  }
  if (event.activityState === 'recruiting' || event.matchMaking) {
    return 'proposed_milestone';
  }
  if (event.category === 'social_gathering' && !event.requiresForm) {
    return 'direct_connect';
  }
  if (event.capacity === 'unlimited' && event.entryFee === 0) {
    return 'one_tap';
  }
  // Default
  return 'event_lab_form';
}
```

---

## 2. Wireframe Designs for the 7 Expansion Experiences

All expansions follow the **Accordion Expansion Protocol** defined in the Card Design System: a smooth vertical animation (`200ms ease-out`) that reveals additional content within the same card. The card’s border color remains as a status indicator (except after voting, etc.).

### Experience 1: The Direct Connect (Zero-Data Protocol)
**Used for:** Informal social gatherings, local games, “human‑to‑human” activities.  

### Experience 2: The One-Tap “Count Me In” (State Toggle)
**Used for:** High‑capacity, low‑barrier events (open practices, community rallies).  

### Experience 3: The Event Lab Form (Data Collection)
**Used for:** Tournaments, courses, business events requiring registration.  

### Experience 4: The Three-Way Handshake (Guardian/Safety)
**Used for:** Any event where `guardianRequired: true` (minors).  

### Experience 5: The Proposed Milestone (Crowdsourcing)
**Used for:** Events in `recruiting` state where a minimum number of participants is needed (e.g., “7/10 players joined”).  

### Experience 6: The Sports CV Sync (Talent Pipeline)
**Used for:** Scout‑attended events, talent identification tournaments.  

### Experience 7: The Monetization & Waiver Gate
**Used for:** Urban events with `entryFee` OR rural events with `villageWaiver: true`.  

---

## Implementation Mapping

| Experience Type       | Component to Include in Card Expansion |
|-----------------------|----------------------------------------|
| Direct Connect        | `DeepLinkModule` (WhatsApp button)     |
| One-Tap               | `StateToggleModule` (Join/Joined toggle) |
| Event Lab Form        | `DynamicFormModule` (fields injected)  |
| Three-Way Handshake   | `GuardianAuthModule` (request/status)  |
| Proposed Milestone    | `CrowdsourceModule` (progress + share) |
| Sports CV Sync        | `TalentPipelineModule` (CV toggle)     |
| Monetization & Waiver | `WaiverGateModule` (payment/waiver)    |

All modules are rendered inside the `CardExpansionContent` div and use the same offline‑first data flow (IndexedDB + 15‑min sync).
