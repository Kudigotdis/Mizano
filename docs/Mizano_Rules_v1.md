# Mizano Project: Consolidated Rulebook

This document merges the requirements from `AGENT_CODING_PROTOCOL.md` and `TECHNICAL_STACK_AND_APK_PIPELINE.md` for easy reference.

## 🚨 MANDATORY PROTOCOL
You are strictly prohibited from generating HTML, CSS, or JavaScript for the Mizano App without first reading and applying these rules.

### Performance & Stack
- **Frameworks**: No React, Vue, or Angular. Use Vanilla JS and CSS3.
- **Animation**: Use `transform: translate3d()` for hardware acceleration.
- **Speed**: Target 60fps on mobile devices.

### APK Pipeline Compatibility
- **Viewport**: `<meta name="viewport" content="width=device-width, initial-scale=1">` in all HTML.
- **Assets**: All images, CSS, and JS must be local (no CDNs).
- **Paths**: Use relative paths (e.g., `./assets/style.css`).

### Communication & Data
- **Intents**: Use `wa.me` for WhatsApp and native deep links for Facebook.
- **Storage**: Use `localStorage` for all persistent offline data.
- **Sync**: 15-minute sync interval when online.

---
**Confirmation Policy**: Start every code-providing response with: 
*"Applied Android Studio Otter Pipeline standards from Docs/TECHNICAL_STACK_AND_APK_PIPELINE.md."*
