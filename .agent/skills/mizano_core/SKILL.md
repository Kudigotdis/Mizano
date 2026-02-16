---
name: mizano_core
description: Mandatory coding protocols and technical stack requirements for the Mizano project.
---

# Mizano Core Skill

This skill ensures that all code generated for the Mizano project adheres to the strict performance and compatibility requirements defined in `AGENT_CODING_PROTOCOL.md` and `TECHNICAL_STACK_AND_APK_PIPELINE.md`.

## Mandatory Rules

### 1. Framework & Stack Restriction
- **Vanilla Only**: Use only Vanilla JavaScript and CSS3.
- **Strictly Prohibited**: React, Vue, Angular, or any other heavy JS framework.
- **Goal**: 60fps performance on local Android hardware.

### 2. UI & APK Compatibility
- **Mobile Responsive**: Every HTML file must include: `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- **Relative Pathing**: Use relative paths (e.g., `./images/logo.webp`) for all local assets to ensure compatibility with the Android Studio Otter assets folder.
- **No Remote Dependencies**: Store all libraries (CSS/JS) locally in the `/assets/` directory.

### 3. Native Intent & Deep Linking
- **External Switchboard**: Use standard anchor protocols for Android System Intents.
- **WhatsApp**: `https://wa.me/[number]`
- **Facebook**: Deep links for Live Streams.
- **No Internal Chat**: Offload all communication to these external protocols.

### 4. Persistence & Data
- **Offline First**: Use `localStorage` or `IndexedDB` for all offline data (Ledger, Sign-ups).
- **Sync Logic**: Fire background sync every 15 minutes when a connection is detected.

### 5. Performance Optimization
- **Hardware Acceleration**: Use `transform: translate3d()` for smooth animations.
- **Preloading**: Preload adjacent panels in carousels for instant transitions.

## Mandatory Response String
Every time you provide code, you MUST start your response with:
> "**Applied Android Studio Otter Pipeline standards from Docs/TECHNICAL_STACK_AND_APK_PIPELINE.md.**"
