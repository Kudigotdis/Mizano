Technical Architecture: HTML5 to Android APK
This document defines the requirements for building the Mizano web-frontend to ensure successful compilation into a native Android APK.

1. WebView & Environment

Target Container: The application must be optimized for an Android WebView.


Viewport Standard: Every HTML file must include the meta-tag: <meta name="viewport" content="width=device-width, initial-scale=1"> to ensure UI scaling in the APK.


No Remote Dependencies: All libraries (CSS/JS) must be stored locally in the /assets/ directory to prevent broken UI when the user is offline.

2. Local Asset & Data Management

Relative Pathing: All images (WebP), icons, and map tiles must use relative paths (e.g., ./images/logo.webp) for compatibility with the Android folder structure.


Persistent Storage: Use localStorage or IndexedDB for features like the Offline Equipment Ledger and Match Sign-ups to ensure data survives app restarts.


Sync Logic: Background sync logic should fire every 15 minutes once a connection is detected to update the roster.

3. Native Intent & Deep Linking
External Switchboard: JavaScript must use standard anchor protocols to trigger Android System Intents:


WhatsApp: https://wa.me/[number] for organizer chats.


Facebook: Deep links for Live Streams to leverage zero-rated data bundles .


No Internal Chat: Do not build internal messaging; offload all communication to these external protocols.

4. UI Performance (60 FPS Goal)
Vanilla Stack: Avoid heavy JS frameworks (React/Angular). Use Vanilla JS and CSS3 transitions for the Side Swipe Homepage Navigation and 3-Level Rising Search .


Hardware Acceleration: Use CSS properties like transform: translate3d() to ensure smooth 60fps animations on low-RAM Android devices.


Minimalist Loading: The horizontal carousel must preload adjacent panels (e.g., Sports, Hobbies) for instant transitions without loading spinners.