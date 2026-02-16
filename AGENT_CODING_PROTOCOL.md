Purpose: Mandatory instructions for the AI Agent when generating any code for the Mizano Project.

🚨 MANDATORY PROTOCOL
You are strictly prohibited from generating HTML, CSS, or JavaScript for the Mizano App without first reading and applying the rules in: Docs/TECHNICAL_STACK_AND_APK_PIPELINE.md

Execution Rules:
Framework Restriction: Never suggest React, Vue, or Angular. You must use Vanilla JS and CSS3 to ensure 60fps performance on local Android hardware. 2. APK Compatibility: Every code snippet must include the mobile-responsive viewport meta-tag and use relative paths for local assets (images, icons) to ensure they work in the Android Studio Otter assets folder. 3. Intent-First Logic: All communication links must be formatted as Android-native intents (e.g., wa.me for WhatsApp) rather than web-based chat scripts. 4. Persistence: Use localStorage for all offline data (Ledger, Sign-ups) so the data persists within the APK WebView container. 5. Data Loading: Always prioritize `window.MIZANO_DATA` script injection for initial data loading to bypass `file://` CORS restrictions in local APK builds.

Confirmation Required: Every time you provide code, start your response with: "Applied Android Studio Otter Pipeline standards from Docs/TECHNICAL_STACK_AND_APK_PIPELINE.md."