# INTEGRATION PLAYBOOK
**Mizano Platform | Version 1.0 | February 2026**

---

## EXECUTIVE OVERVIEW

The Integration Playbook is Mizano's **technical blueprint for external connections**. In Botswana's data-constrained environment, every integration must prioritize:

1. **Zero-Rated Data** (WhatsApp/Facebook bundles)
2. **Offline-First** (deep links over API calls)
3. **Low Bandwidth** (text over images, static over dynamic)
4. **Local Payment Rails** (MTN/Orange Mobile Money)
5. **Trust & Verification** (Facebook Business Pages, WhatsApp Blue Ticks)

**Core Philosophy:** *"Integrate Where Users Already Are, Not Where We Want Them to Be"*

This document covers 11 integration categories spanning communication, payments, maps, authentication, and data syncing. Each section includes: Purpose, Technical Implementation, Offline Behavior, Error Handling, and Botswana-Specific Optimizations.

---

## TABLE OF CONTENTS

1. [WhatsApp Integration](#whatsapp-integration)
2. [Facebook Integration](#facebook-integration)
3. [Google Sheets API (Backend)](#google-sheets-api-backend)
4. [Firebase Authentication](#firebase-authentication)
5. [Mobile Money Payment Gateways](#mobile-money-payment-gateways)
6. [Google Maps (Static Tiles)](#google-maps-static-tiles)
7. [Weather API Integration](#weather-api-integration)
8. [Bluetooth (Offline Match Sign-Ups)](#bluetooth-offline-match-sign-ups)
9. [SMS Gateway (Guardian Alerts)](#sms-gateway-guardian-alerts)
10. [Push Notifications (FCM)](#push-notifications-fcm)
11. [Educational Institution Integrations](#educational-institution-integrations)
12. [Local Data Injection (Offline-First)](#local-data-injection-offline-first)

---

## WHATSAPP INTEGRATION

### Purpose
WhatsApp is the **primary communication layer** for Mizano. With 90%+ penetration in Botswana and zero-rated bundles, it replaces in-app chat entirely.

### Use Cases
1. **Direct-to-Organizer Messaging:** Activity Page "WhatsApp Organizer" button
2. **Team/School Group Invites:** Auto-join links after approval
3. **Guardian Proxies:** Minor contact routes to parent's WhatsApp
4. **Support Channels:** Mizano Staff assistance via wa.me
5. **Emergency Notifications:** Critical injury alerts via WhatsApp message

---

### Technical Implementation

#### Deep Links (wa.me)
**Core Technology:** URL-based deep linking (no API required)

**Format:**
```
https://wa.me/<COUNTRY_CODE><PHONE_NUMBER>?text=<PRE_FILLED_MESSAGE>
```

**Example:**
```
https://wa.me/26772123456?text=Hello!%20I'm%20interested%20in%20the%20Soccer%20match%20in%20Block%203%20at%204%20PM%20via%20Mizano.
```

**Backend Schema Integration:**
- **Column AS:** `WhatsAppNumber` (stored in international format: +267...)
- **Column AV:** `PreFillMessage` (custom text per activity/organizer)

**Code Implementation (Flutter):**
```dart
import 'package:url_launcher/url_launcher.dart';

Future<void> openWhatsApp(String phoneNumber, String message) async {
  // Remove '+' and spaces from phone number
  String cleanNumber = phoneNumber.replaceAll(RegExp(r'[^\d]'), '');
  
  // URL-encode the message
  - **Trigger**: WhatsApp Icon on Profile/Event Card.
  - **Data Source**: Column **AS** (`WhatsAppNumber`) and Column **AV** (`PreFillMessage`).
  - **Logic**: Use `https://wa.me/{number}?text={encoded_message}` to leverage zero-rating.
  
  // Construct wa.me link
  String url = 'https://wa.me/$cleanNumber?text=$encodedMessage';
  
  // Launch external app
  if (await canLaunch(url)) {
    await launch(url, forceSafariVC: false, forceWebView: false);
  } else {
    // Fallback: show error or copy number
    print('Could not launch WhatsApp. Number: $phoneNumber');
  }
}
```

**PreFillMessage Templates:**

| Scenario | Template (Column AV) |
|----------|---------------------|
| Activity Join | "Hello! I'm interested in [ActivityType] in [Location] at [Time] via Mizano. Is there still space?" |
| Equipment Inquiry | "Hi! I saw your [ItemName] on Mizano. Is it available to borrow on [Date]?" |
| Guardian-to-Organizer | "Hello, I'm [ChildName]'s parent. They want to join [Activity]. Can you tell me more about safety measures?" |
| Staff Support | "Hi Mizano Support, I need help with [Issue]. My profile ID is [UserID]." |
| Lost & Found Boost | "Hi! I lost my [ItemDescription] at [Location] on [Date]. Have you seen it? Details: [MizanoLink]" |

---

#### WhatsApp Group Invites

**Process Flow:**

1.  **Creator/School Links Group:**
    - Activity Page → "Manage Team" → "Link WhatsApp Group"
    - Paste invite URL (format: `https://chat.whatsapp.com/XXXXXX`)
    - Stored in **Column AU:** `GroupChatURL`

2.  **User Joins Activity:**
    - Guardian approves join (for minors) OR User self-joins (adults)
    - Notification sent: "You're in! Join the Team WhatsApp Group here: [Link]"

3.  **User Taps Notification:**
    - Deep link launches WhatsApp app
    - WhatsApp prompts: "Join 'Block 3 Soccer Team'?"
    - User taps "Join Group"

**Code Implementation:**
```dart
Future<void> joinWhatsAppGroup(String groupUrl) async {
  // Validate URL format
  if (!groupUrl.startsWith('https://chat.whatsapp.com/')) {
    print('Invalid WhatsApp group link');
    return;
  }
  
  // Launch group invite
  if (await canLaunch(groupUrl)) {
    await launch(groupUrl, forceSafariVC: false);
  } else {
    print('Could not open WhatsApp group');
  }
}
```

**Security Considerations:**
- **Under 13:** Guardian added to group, NOT child
- **13-15:** Child added with Guardian notification ("Your child joined [Group]")
- **16+:** Child added directly, optional Guardian notification

**Broadcast Channels (School Alternative):**
For schools wanting one-way announcements (no peer visibility of numbers):
- Schools create WhatsApp Channel (not Group)
- Students subscribe via link (no phone number sharing)
- Teachers post updates (matches, practice times, results)
- Mizano stores Channel link in same `GroupChatURL` column (with `type: channel` flag)

---

#### Guardian Proxy Routing

**Problem:** Minors (<16) should NOT share personal WhatsApp publicly

**Solution:** Route all "WhatsApp Player" taps to Guardian's number

**Implementation Logic:**
```dart
String getWhatsAppNumber(User user) {
  // Check if user is a minor
  if (user.age < 16 && user.guardianID != null) {
    // Fetch Guardian's WhatsApp from backend
    Guardian guardian = fetchGuardian(user.guardianID);
    return guardian.whatsappNumber; // Column AS for Guardian
  } else {
    // Adult or no Guardian linked
    return user.whatsappNumber;
  }
}

// Usage on Activity Page
void contactPlayer(User player) {
  String phoneNumber = getWhatsAppNumber(player);
  String message = "Hi, I'm organizing [Activity] and would like to invite ${player.name}. Is this OK?";
  openWhatsApp(phoneNumber, message);
}
```

**PreFill Message for Guardian Proxy:**
```
Hi, I'm organizing [ActivityType] at [Location] on [Date/Time] and would like to invite [ChildName]. 

Details:
- Activity: [ActivityType]
- Date: [Date]
- Time: [Time]
- Location: [Address]
- Safety: [First-aid on-site / No contact allowed / etc]

Is this suitable? More info: [MizanoLink]
```

---

### Offline Behavior

**WhatsApp Deep Links Work Offline:**
- `wa.me` URLs are handled by the WhatsApp app itself (no internet needed to launch intent)
- If WhatsApp has cached conversations, messages may queue locally and send when user gets signal
- Mizano does NOT need connectivity to open WhatsApp—only WhatsApp needs it to send

**Sync Implications:**
- When user taps "WhatsApp Organizer" offline → Mizano logs: `{action: 'whatsapp_opened', timestamp, activityID}`
- On next sync (15-min interval), logs uploaded for analytics (e.g., "How many users contact organizers?")

---

### Error Handling

**Common Errors:**

| Error | Cause | Mitigation |
|-------|-------|-----------|
| **"Could not launch WhatsApp"** | WhatsApp not installed | Show popup: "Install WhatsApp to contact organizer. Or call: [PhoneNumber]" |
| **Invalid phone number** | Malformed +267 format | Validate on profile creation: Must match `^\+267[0-9]{8}$` |
| **Group link expired** | Old invite URL | Creator receives notification: "Your WhatsApp Group link expired. Update it here: [Link]" |
| **User blocks organizer** | Privacy decision | No error shown (respects WhatsApp's user control) |

**Validation on Profile Save:**
```dart
bool isValidBotswanaWhatsApp(String number) {
  // Must be +267 followed by 8 digits
  final regex = RegExp(r'^\+267[0-9]{8}$');
  return regex.hasMatch(number);
}

// Show error if invalid
if (!isValidBotswanaWhatsApp(whatsappInput)) {
  showError('WhatsApp number must be in format: +26772123456');
}
```

---

### Data Efficiency

**Zero-Rated Bundle Optimization:**
- WhatsApp messages/calls are FREE on Botswana social bundles
- Mizano NEVER loads WhatsApp Web or embedded iframes (data-heavy)
- Always use deep links to launch native app

**Bandwidth Usage:**
- `wa.me` URL: <200 bytes
- PreFillMessage: <500 bytes (keep templates under 300 characters)
- **Total per tap:** <1KB

---

### Botswana-Specific Notes

**Phone Number Formats:**
- **Landline:** +267 3XX XXXX (not supported for WhatsApp)
- **Mobile (Mascom):** +267 71/72/74/75/76 XXXXXX
- **Mobile (Orange):** +267 73/77 XXXXXX
- **Mobile (BTC):** +267 78 XXXXXX

**Verification:**
- Blue Tick Business Accounts build trust (encourage Businesses/Associations to verify)
- Mizano Staff use verified WhatsApp Business for support (+267-XXX-XXXX)

**Cultural Norms:**
- Batswana expect polite greetings: PreFill messages start with "Hello!" or "Dumela!"
- Emoji usage is light; professional tone preferred for school/Guardian communications

---

### Testing Checklist

- [ ] wa.me links open WhatsApp app (Android & iOS)
- [ ] PreFill messages display correctly (no encoding errors)
- [ ] Group invite URLs redirect to WhatsApp group join screen
- [ ] Guardian proxy routes to parent's number for <16 users
- [ ] Invalid numbers show error before attempting launch
- [ ] Offline taps queue analytics logs for later sync
- [ ] Support number (+267-XXX-XXXX) is verified Business Account

---

## FACEBOOK INTEGRATION

### Purpose
Facebook is the **second communication layer** and **primary media platform**. Zero-rated FB data makes it ideal for:
1.  Event mirroring (reach users who don't have Mizano app yet)
2.  Facebook Live streams (low-data video for "Active Now" matches)
3.  Business/Association page verification (trust layer)
4.  Gallery hosting (Archive Library for historic sports moments)

---

### Use Cases

1.  **Event Mirroring:** Creator shares activity to Facebook → Link back to Mizano
2.  **Live Streams:** Fans submit Facebook Live links during "Active Now" matches
3.  **Page Verification:** Businesses/Associations link official FB pages for credibility
4.  **Archive Library:** Links to Facebook albums of local sports history
5.  **Zero-Rated Discovery:** FB-only data users browse events, tap to install Mizano

---

### Technical Implementation

#### Facebook Share (Event Mirroring)

**Deep Link Method (Preferred - No API):**

**Format:**
```
https://www.facebook.com/sharer/sharer.php?u=<ENCODED_URL>
```

**Example:**
```
https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmizano.app%2Factivity%2FACT-GAB-123
```

**Code Implementation (Flutter):**
```dart
Future<void> shareToFacebook(String activityURL, String activityTitle) async {
  // URL-encode the Mizano activity link
  String encodedURL = Uri.encodeComponent(activityURL);
  
  // Construct Facebook sharer URL
  String fbShareURL = 'https://www.facebook.com/sharer/sharer.php?u=$encodedURL';
  
  // Launch Facebook app or browser
  if (await canLaunch(fbShareURL)) {
    await launch(fbShareURL, forceSafariVC: false);
  } else {
    // Fallback: use OS share sheet
    Share.share('Join me on Mizano! $activityTitle - $activityURL');
  }
}
```

**Activity Page Button:**
- Button text: "Share to Facebook"
- Icon: Facebook logo (white 'f' on blue)
- Position: Below "WhatsApp Organizer" button on Activity Page

**Shared Content Structure:**
```html
<!-- Open Graph meta tags on Mizano activity page -->
<meta property="og:title" content="Soccer Match in Block 3 - Saturday 4PM" />
<meta property="og:description" content="Join us for a friendly soccer match. 8/10 players confirmed. Need 1 goalie!" />
<meta property="og:image" content="https://mizano.app/static/og-soccer.webp" />
<meta property="og:url" content="https://mizano.app/activity/ACT-GAB-123" />
<meta property="og:type" content="website" />
<meta property="fb:app_id" content="MIZANO_FB_APP_ID" />
```

**Benefit:** Users on zero-rated FB see rich preview, tap link → Redirected to Mizano (install prompt if no app)

---

#### Facebook Page Linking (Business/Association Verification)

**Purpose:** Build trust by showing official Facebook Business Page

**Backend Integration:**
  - **Data Source**: Column **AT** (`FBPageLink`).
  - **Deep-Link URL**: `fb://page/{page_id}` or `https://facebook.com/{slug}`.
- Displayed on Business/Association profiles as "Visit Facebook Page" button

**Validation:**
```dart
bool isValidFacebookPageURL(String url) {
  // Must start with facebook.com or fb.com
  final regex = RegExp(r'^https?:\/\/(www\.)?(facebook|fb)\.com\/[\w\-\.]+\/?$');
  return regex.hasMatch(url);
}
```

**UI Display:**
- Blue "f" icon next to business name
- Tap opens Facebook app (deep link: `fb://page/<PAGE_ID>`) or browser
- If page has blue verification checkmark → Show badge in Mizano: "Verified Business"

**Page ID Extraction (for deep linking):**
```dart
// Option 1: Use Graph API (if online)
// GET https://graph.facebook.com/v13.0/<PAGE_USERNAME>?fields=id&access_token=<TOKEN>

// Option 2: Parse from URL (offline-friendly)
// Example: facebook.com/BFABotswana → Username: "BFABotswana"
// Deep link: fb://page/BFABotswana (works without Page ID)

Future<void> openFacebookPage(String pageURL) async {
  // Extract username from URL
  String username = pageURL.split('/').last;
  
  // Try app deep link first
  String fbAppLink = 'fb://page/$username';
  if (await canLaunch(fbAppLink)) {
    await launch(fbAppLink);
  } else {
    // Fallback to browser
    await launch(pageURL, forceSafariVC: false);
  }
}
```

---

#### Facebook Live Streaming (Social & Streaming Integration)

**User Flow:**

1.  **Creator Toggles ON "Allow Fan Streams"** (Activity Page creation)
2.  **Match Enters "Active Now" State** (green pulsing badge)
3.  **Fan Taps "Add Your Stream"** on Activity Page
4.  **Quick Form:**
    - Your Name: [Text Input]
    - Live Link: [URL Input, pre-filled with "facebook.com/"]
    - Platform: [Radio buttons: Facebook Live (default), YouTube, TikTok]
    - **Reminder:** "Use Facebook for low-data streaming—perfect for your bundle!"
5.  **Submit** → Link added to "Live Streams" section (aggregated list)

**Backend Storage:**
- Streams stored in separate `Streams` sheet (linked by `ActivityID`)
- Columns: `StreamID`, `ActivityID`, `FanName`, `StreamURL`, `Platform`, `Timestamp`, `ReportCount`

**Display on Activity Page:**
```
🔴 Live Streams (3 active)
─────────────────────────
📺 Kudi's Stream (Facebook Live) [Tap to watch]
📺 Neo's Stream (Facebook Live) [Tap to watch]  
📺 Thabo's Stream (YouTube) ⚠️ Higher data usage [Tap to watch]

[Report stream] button next to each
```

**Code Implementation:**
```dart
class LiveStream {
  String streamID;
  String fanName;
  String streamURL;
  String platform; // 'facebook', 'youtube', 'tiktok'
  
  // Open stream in external app
  void openStream() async {
    String deepLink;
    
    if (platform == 'facebook') {
      // Facebook Live deep link
      deepLink = streamURL; // Direct URL works
    } else if (platform == 'youtube') {
      // YouTube deep link: vnd.youtube://...
      String videoID = extractYouTubeID(streamURL);
      deepLink = 'vnd.youtube://$videoID';
    } else {
      deepLink = streamURL; // Generic fallback
    }
    
    if (await canLaunch(deepLink)) {
      await launch(deepLink, forceSafariVC: false);
    } else {
      await launch(streamURL); // Browser fallback
    }
  }
}
```

**Data Efficiency:**
- Facebook Live on zero-rated bundles: FREE (most Botswana carriers whitelist FB video)
- YouTube/TikTok: Uses general data (show ⚠️ warning)
- Mizano does NOT embed players (saves bandwidth); always deep link to external app

**"Playing Now" Notification:**
When match enters "Active Now":
```dart
void sendPlayingNowNotification(Activity activity, List<LiveStream> streams) {
  // Get top Facebook Live stream (prioritize zero-rated)
  LiveStream topStream = streams.firstWhere(
    (s) => s.platform == 'facebook',
    orElse: () => streams.first,
  );
  
  String message = "The ${activity.type} in ${activity.location} is Playing Now! Watch via ${topStream.fanName}'s stream.";
  
  // Send push notification
  sendPushNotification(
    title: "🔴 Match Live Now!",
    body: message,
    action: topStream.streamURL,
  );
}
```

---

#### Archive Library (Historic Galleries)

**Purpose:** Link to Facebook photo albums of past local sports moments

**Implementation:**
- Archive Library lives in "Discover" swipe panel
- Filter by: Sport, Location, Decade
- Each entry:
  - Thumbnail (low-res WebP, 10KB)
  - Title: "Block 3 Soccer Finals 2015"
  - Button: "View on Facebook" → Opens album deep link

**Deep Link Format:**
```
fb://album/<ALBUM_ID> (app)
https://facebook.com/media/set/?set=a.<ALBUM_ID> (browser)
```

**Code:**
```dart
void openFacebookAlbum(String albumID) async {
  String fbAppLink = 'fb://album/$albumID';
  String webLink = 'https://facebook.com/media/set/?set=a.$albumID';
  
  if (await canLaunch(fbAppLink)) {
    await launch(fbAppLink);
  } else {
    await launch(webLink, forceSafariVC: false);
  }
}
```

---

### Offline Behavior

**Facebook Deep Links Work Offline:**
- Like WhatsApp, `fb://` intents launch the Facebook app (no internet required for intent)
- If Facebook app has cached data, galleries may load
- Live streams require connectivity (video cannot be cached)

**Event Shares Queue:**
- If user taps "Share to Facebook" offline → Show: "You're offline. This will open Facebook when you reconnect."
- Queue action locally, retry when online

---

### Error Handling

| Error | Cause | Mitigation |
|-------|-------|-----------|
| **"Facebook not installed"** | No FB app | Redirect to Play Store: "Install Facebook to view this content" |
| **Dead stream link** | Fan stopped streaming | "Report stream" button flags for Creator removal |
| **Invalid page URL** | Malformed link | Validate on profile save: Must match `facebook.com/[username]` |
| **Album not public** | Privacy settings | Show: "Album unavailable. Contact [Archive admin]" |

---

### Data Efficiency

**Zero-Rated Optimization:**
- Facebook images/video on most Botswana bundles: FREE
- Mizano uses FB as CDN (no hosting costs for galleries)
- Always open external app (never embed iframes)

**Bandwidth Usage:**
- Share deep link: <200 bytes
- Page link tap: <100 bytes (intent only)
- Stream URL storage: <300 bytes

---

### Facebook Graph API (Optional, Future Enhancement)

**Current Approach:** Deep links only (no API = no authentication overhead)

**Potential Future Use Cases:**
- Auto-import event details when Creator pastes FB event URL
- Verify Business Page checkmark status (show "Verified" badge)
- Fetch album metadata for Archive Library (title, date, photo count)

**Implementation Notes (IF enabled):**
- Requires Facebook Developer App setup
- Access Token management (expires every 60 days)
- Rate limits: 200 calls/hour per user
- **Trade-off:** Adds complexity; deep links are sufficient for MVP

---

### Botswana-Specific Notes

**Facebook Penetration:**
- ~70% of Botswana internet users have Facebook accounts
- Zero-rated data on Mascom "Social Bundles" (500MB FB for P10/week)
- Preferred over Twitter/Instagram for community events

**Cultural Norms:**
- Facebook groups are primary organizing tool for neighborhoods
- Trust in "verified" pages (blue checkmark) is high
- Photo albums = digital memory keeping (Archive Library resonates)

---

### Testing Checklist

- [ ] "Share to Facebook" opens FB sharer with correct Open Graph preview
- [ ] Business pages open in FB app (or browser fallback)
- [ ] Live stream links launch external apps (prioritize FB, warn on YouTube)
- [ ] Archive albums open in Facebook photo viewer
- [ ] Invalid URLs show validation errors before save
- [ ] Offline taps queue and retry on reconnect
- [ ] "Playing Now" notifications include top FB Live link

---

## GOOGLE SHEETS API (BACKEND)

### Purpose
Google Sheets serves as Mizano's **primary data store** for MVP. It's lightweight, accessible via Google Drive, and supports real-time collaboration for Staff/Admin.

**Why Sheets, Not Database?**
- **Simplicity:** No database server to maintain
- **Accessibility:** Staff can edit via Drive (emergency data fixes)
- **Cost:** Free up to 100 requests/minute
- **Sync Logic:** 15-minute batch updates minimize API calls

---

### Architecture

**Master Data Sheet Structure:**

| Sheet Name | Purpose | Key Columns |
|------------|---------|-------------|
| `Users` | All profiles (Browser → Admin) | ProfileID, ProfileType, FullName, WhatsAppNumber (AS), FBPageLink (AT) |
| `Activities` | Matches, events, leagues | ActivityID, Type, Date, Time, LocationCity, LocationArea, Status, CreatorID |
| `Rosters` | Activity participants | ActivityID, UserID, JoinTimestamp, ApprovalStatus, CheckInTime |
| `Equipment` | Borrow ledger | ItemID, ItemName, BorrowerID, CheckOutTime, CheckInTime, ConditionRating |
| `Guardians` | Minor oversight | GuardianID (AW), LinkedMinors (AX), AcademicAlert (AZ), SecurityLog (BE) |
| `Schools` | Educational Institutions | SchoolID (AM), GradeYear (AN), TeacherLead (AO), NationalLeagueID (AQ) |
| `Sponsorships` | Sponsor-a-Game tracking | SponsorshipID, DonorID, RecipientID, Amount, Type (money/equipment), Status |
| `Streams` | Live stream links | StreamID, ActivityID, FanName, StreamURL, Platform, ReportCount |
| `BulletinPosts` | Community board | PostID, AuthorID, Content, Category (job/funeral/lost-found), Timestamp |
| `Notifications` | Alert queue | NotificationID, RecipientID, Type, Message, Read, Timestamp |

---

### Technical Implementation

#### Authentication

**Google Sheets API v4 with Service Account:**

1.  **Setup:**
    - Create project in [Google Cloud Console](https://console.cloud.google.com)
    - Enable "Google Sheets API"
    - Create Service Account → Download JSON key
    - Share Mizano master spreadsheet with service account email (editor access)

2.  **Code (Flutter/Dart):**
```dart
import 'package:googleapis/sheets/v4.dart';
import 'package:googleapis_auth/auth_io.dart';

class SheetsBackend {
  static const _spreadsheetId = 'YOUR_SPREADSHEET_ID';
  static const _scopes = [SheetsApi.spreadsheetsScope];
  
  Future<SheetsApi> _getClient() async {
    final credentials = ServiceAccountCredentials.fromJson(
      await rootBundle.loadString('assets/service-account.json'),
    );
    
    final client = await clientViaServiceAccount(credentials, _scopes);
    return SheetsApi(client);
  }
  
  // Read data
  Future<List<List<dynamic>>> readSheet(String sheetName, String range) async {
    final api = await _getClient();
    final response = await api.spreadsheets.values.get(_spreadsheetId, '$sheetName!$range');
    return response.values ?? [];
  }
  
  // Write data (batch update)
  Future<void> writeSheet(String sheetName, String range, List<List<dynamic>> values) async {
    final api = await _getClient();
    final valueRange = ValueRange()..values = values;
    
    await api.spreadsheets.values.update(
      valueRange,
      _spreadsheetId,
      '$sheetName!$range',
      valueInputOption: 'USER_ENTERED',
    );
  }
  
  // Append row (for new entries)
  Future<void> appendRow(String sheetName, List<dynamic> row) async {
    final api = await _getClient();
    final valueRange = ValueRange()..values = [row];
    
    await api.spreadsheets.values.append(
      valueRange,
      _spreadsheetId,
      '$sheetName!A:Z',
      valueInputOption: 'USER_ENTERED',
    );
  }
}
```

---

#### Sync Logic (15-Minute Intervals)

**Core Principle:** Batch all updates to minimize API calls

**Implementation:**

```dart
class SyncManager {
  static const syncInterval = Duration(minutes: 15);
  Timer? _syncTimer;
  List<SyncOperation> _pendingOperations = [];
  
  void startSync() {
    _syncTimer = Timer.periodic(syncInterval, (_) => performSync());
  }
  
  void queueOperation(SyncOperation op) {
    _pendingOperations.add(op);
    // Save to local DB immediately (offline-first)
    LocalDatabase.save(op);
  }
  
  Future<void> performSync() async {
    if (_pendingOperations.isEmpty) return;
    if (!await hasInternetConnection()) return;
    
    try {
      // Group operations by sheet
      Map<String, List<SyncOperation>> grouped = groupBySheet(_pendingOperations);
      
      // Batch update each sheet
      for (var entry in grouped.entries) {
        String sheetName = entry.key;
        List<SyncOperation> ops = entry.value;
        
        // Convert ops to batch update request
        await _batchUpdate(sheetName, ops);
      }
      
      // Clear queue on success
      _pendingOperations.clear();
      LocalDatabase.clearSyncQueue();
      
    } catch (e) {
      print('Sync failed: $e. Will retry in 15 minutes.');
      // Operations remain in queue
    }
  }
  
  Future<void> _batchUpdate(String sheetName, List<SyncOperation> ops) async {
    // Use batchUpdate for efficiency (single API call)
    // ...implementation details...
  }
}

class SyncOperation {
  String sheet;
  String operation; // 'create', 'update', 'delete'
  Map<String, dynamic> data;
  DateTime timestamp;
}
```

**What Gets Synced:**
- Roster changes (joins, approvals, check-ins)
- Equipment ledger (check-outs, returns, ratings)
- Activity status updates (Active Soon → Active Now → Passed)
- Guardian approvals/denials
- Borrow Scores (dual-rating calculations)
- Injury reports
- Security Log entries (profile views)

---

#### Conflict Resolution

  - **Batching**: Sync every 15 minutes via background pulse.
  - **Size Limit**: 500KB per packet (Compressed JSON with short-string keys like `cb` and `baha`).
  - **Conflict Strategy**: Last-Write-Wins based on Botswana Standard Time timestamp.

```dart
Future<void> resolveConflict(String activityID, List<SyncOperation> conflicts) async {
  // Sort by timestamp (newest first)
  conflicts.sort((a, b) => b.timestamp.compareTo(a.timestamp));
  
  // Apply newest operation
  SyncOperation winner = conflicts.first;
  await _applyOperation(winner);
  
  // Log conflicts for Staff review
  if (conflicts.length > 1) {
    await logConflict(activityID, conflicts);
  }
}
```

**Staff Override:**
- Game Cube Staff have "Force Update" button in Staff app
- Overrides sync conflicts for equipment ledger (physical verification trumps digital)

---

### Offline Behavior

**Read Operations:**
- All data cached locally in SQLite (Flutter: `sqflite` package)
- Reads always from local cache (instant, no API call)
- Sync updates cache in background

**Write Operations:**
- Saves to local DB immediately (user sees instant feedback)
- Queues for next 15-minute sync
- If sync fails → Remains in queue, retries indefinitely

**Manual Sync:**
- Settings → "Sync Now" button forces immediate sync attempt

---

### Error Handling

| Error | Cause | Mitigation |
|-------|-------|-----------|
| **"API quota exceeded"** | >100 requests/min | Rate limit: Max 1 batch update per 15 min (well under limit) |
| **"Invalid credentials"** | Service account key expired | Alert Admin, regenerate key in Cloud Console |
| **"Sheet not found"** | Typo in sheet name | Validate sheet names at app build time (unit tests) |
| **"Permission denied"** | Service account lacks access | Re-share spreadsheet with service account email |
| **Network timeout** | Slow connection | Retry with exponential backoff (15s, 30s, 60s delays) |

---

### Data Efficiency

**Bandwidth Usage:**
- Full sync (all sheets): ~500KB-1MB per 15-min interval
- Incremental sync (changed rows only): ~50-200KB
- **Optimization:** Use `batchUpdate` with `includeValuesInResponse: false` to avoid echoing data

**API Quota:**
- Free tier: 100 requests/min, 500 requests/100 seconds
- Mizano usage: ~4 requests per 15-min sync (well within limits)
- If scaling beyond 10,000 users: Migrate to Firestore or PostgreSQL

---

### Security

**Service Account Key Protection:**
```dart
// DO NOT commit service-account.json to Git
// Store in secure app storage (Android Keystore / iOS Keychain)

// For production: Encrypt key at rest
final encryptedKey = await SecureStorage.read('sheets_key');
final decryptedKey = decrypt(encryptedKey);
final credentials = ServiceAccountCredentials.fromJson(decryptedKey);
```

**Data Access Control:**
- Service account has Editor access (read/write)
- Admin/Staff can view spreadsheet directly via Google Drive (emergency data fixes)
- No public access (sheet is private)

---

### Botswana-Specific Notes

**Google Drive Accessibility:**
- Most Botswana organizations use Google Workspace (schools, businesses)
- Staff comfortable with Sheets interface (training minimal)
- Backup strategy: Auto-export to Google Drive every 24 hours (versioned copies)

---

### Testing Checklist

- [ ] Service account authenticated successfully
- [ ] Read operations return correct data from all sheets
- [ ] Write operations append rows without duplicates
- [ ] 15-minute sync uploads queued operations
- [ ] Conflicts resolve via timestamp (newest wins)
- [ ] Offline writes save locally and sync when reconnected
- [ ] Manual "Sync Now" button forces immediate upload
- [ ] API errors log to Admin dashboard for monitoring

---

## FIREBASE AUTHENTICATION

### Purpose
Firebase Auth provides **lightweight, offline-capable authentication** for user profiles. It supports:
- Phone number verification (OTP SMS)
- Email/password (fallback for users without phones)
- Anonymous login (Browser profiles)

---

### Technical Implementation

#### Phone Authentication (Primary for Botswana)

**Flow:**
1. User enters +267 phone number
2. Firebase sends OTP via SMS
3. User enters 6-digit code
4. Firebase verifies → Returns UID
5. Mizano creates profile in Google Sheets with UID as `ProfileID`

**Code (Flutter):**
```dart
import 'package:firebase_auth/firebase_auth.dart';

class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  
  Future<void> verifyPhoneNumber(String phoneNumber) async {
    await _auth.verifyPhoneNumber(
      phoneNumber: phoneNumber, // +267...
      timeout: Duration(seconds: 60),
      
      verificationCompleted: (PhoneAuthCredential credential) async {
        // Auto-verify (Android only, if SMS is intercepted)
        await _auth.signInWithCredential(credential);
      },
      
      verificationFailed: (FirebaseAuthException e) {
        print('Verification failed: ${e.message}');
      },
      
      codeSent: (String verificationId, int? resendToken) {
        // Show OTP input screen
        _showOTPDialog(verificationId);
      },
      
      codeAutoRetrievalTimeout: (String verificationId) {
        // Auto-retrieval timed out
      },
    );
  }
  
  Future<User?> signInWithOTP(String verificationId, String otp) async {
    PhoneAuthCredential credential = PhoneAuthProvider.credential(
      verificationId: verificationId,
      smsCode: otp,
    );
    
    UserCredential userCredential = await _auth.signInWithCredential(credential);
    return userCredential.user;
  }
}
```

**OTP SMS Format:**
```
Your Mizano verification code is: 123456

Valid for 60 seconds.
Never share this code.
```

---

#### Anonymous Auth (Browser Profiles)

**Purpose:** Allow unregistered users to browse without full sign-up

**Implementation:**
```dart
Future<User?> signInAnonymously() async {
  UserCredential userCredential = await _auth.signInAnonymously();
  return userCredential.user;
}

// When user decides to register:
Future<void> linkPhoneToAnonymous(String phoneNumber) async {
  // Convert anonymous account to phone-linked account
  // This preserves favorites, wishlist added while browsing
  await _auth.currentUser?.linkWithPhoneNumber(phoneNumber);
}
```

---

### Offline Behavior

**Firebase Auth Works Offline:**
- Once authenticated, token cached locally (expires after 1 hour)
- Refresh token stored (valid for 7 days)
- Offline login: Uses cached credentials (no network call)

**Sync on Reconnect:**
- When app detects connectivity → Refreshes token in background
- User never sees "session expired" unless offline >7 days

---

### Error Handling

| Error | Cause | Mitigation |
|-------|-------|-----------|
| **"Invalid phone number"** | Malformed +267 format | Validate before API call |
| **"SMS not received"** | Network delay | Show "Resend OTP" button after 30s |
| **"Invalid OTP"** | User typo | Allow 3 attempts before lockout (10-min cooldown) |
| **"Quota exceeded"** | Too many OTP requests | Firebase limit: 10/hour per phone (sufficient for MVP) |

---

### Data Efficiency

**Bandwidth Usage:**
- Phone verification: ~5KB (API call + SMS delivery)
- OTP submission: ~2KB
- Token refresh: ~3KB
- **Total per login:** ~10KB

---

### Security

**OTP Best Practices:**
- 6-digit codes (sufficient entropy)
- 60-second validity (prevents brute force)
- Rate limiting: Max 3 attempts per verification session

**Token Storage:**
```dart
// Store securely (not in SharedPreferences—use platform keychain)
final storage = FlutterSecureStorage();
await storage.write(key: 'firebase_token', value: token);
```

---

### Botswana-Specific Notes

**SMS Delivery:**
- Mascom, Orange, BTC all support Firebase SMS
- Typical delivery time: 5-15 seconds
- Cost: Firebase free tier covers 10,000 verifications/month

**Phone Number Reuse:**
- Botswana SIM cards sometimes reassigned (if inactive >6 months)
- Mitigation: On login, check if profile exists → If yes, verify last activity date → If >1 year, prompt: "Is this your old account or a new one?"

---

### Testing Checklist

- [ ] +267 phone numbers send OTP successfully
- [ ] OTP verification completes within 60 seconds
- [ ] Invalid OTP shows error, allows retry
- [ ] Anonymous login works offline
- [ ] Linking phone to anonymous account preserves data
- [ ] Offline login uses cached token (no network call)
- [ ] Token refresh happens silently on reconnect

---

## MOBILE MONEY PAYMENT GATEWAYS

### Purpose
Mobile Money (MTN, Orange) is the **primary payment method** in Botswana (80%+ adults have mobile money accounts). Used for:
1. Sponsor-a-Game donations (5% Mizano commission)
2. Business subscriptions (monthly verified badge fees)
3. Venue booking commissions (5% or 10%)
4. Premium features (Sports CV PDF export, Lost & Found Boost)

---

### Supported Gateways

| Provider | Market Share | API Availability | Notes |
|----------|--------------|------------------|-------|
| **MTN Mobile Money** | ~60% | Yes (MTN Momo API) | Primary gateway |
| **Orange Money** | ~25% | Yes (Orange Money API) | Secondary gateway |
| **BTC SmartPay** | ~10% | Limited | Future integration |
| **PayPal** | <5% (mostly diaspora) | Yes | Fallback for international |

---

### Technical Implementation

#### MTN Mobile Money API

**Setup:**
1. Register at [MTN MoMo Developer Portal](https://momodeveloper.mtn.com/)
2. Create sandbox account (for testing)
3. Generate API Key & API User
4. Apply for production access (requires business registration)

**Collections API (Receive Payments):**

```dart
import 'package:http/http.dart' as http;
import 'dart:convert';

class MTNMomoService {
  static const baseURL = 'https://proxy.momoapi.mtn.com';
  static const apiKey = 'YOUR_API_KEY';
  static const apiUser = 'YOUR_API_USER';
  static const apiSecret = 'YOUR_API_SECRET';
  
  // Step 1: Get Access Token
  Future<String> getAccessToken() async {
    final response = await http.post(
      Uri.parse('$baseURL/collection/token/'),
      headers: {
        'Authorization': 'Basic ${base64Encode(utf8.encode('$apiUser:$apiSecret'))}',
        'Ocp-Apim-Subscription-Key': apiKey,
      },
    );
    
    if (response.statusCode == 200) {
      return json.decode(response.body)['access_token'];
    } else {
      throw Exception('Failed to get token');
    }
  }
  
  // Step 2: Request Payment
  Future<String> requestPayment({
    required String phoneNumber, // 267XXXXXXXX (no +)
    required double amount,
    required String reference, // e.g., 'SPONSOR-ACT-GAB-123'
    required String description,
  }) async {
    String token = await getAccessToken();
    String transactionId = _generateUUID();
    
    final response = await http.post(
      Uri.parse('$baseURL/collection/v1_0/requesttopay'),
      headers: {
        'Authorization': 'Bearer $token',
        'X-Reference-Id': transactionId,
        'X-Target-Environment': 'mtnbotswana', // Production
        'Ocp-Apim-Subscription-Key': apiKey,
        'Content-Type': 'application/json',
      },
      body: json.encode({
        'amount': amount.toString(),
        'currency': 'BWP', // Botswana Pula
        'externalId': reference,
        'payer': {
          'partyIdType': 'MSISDN',
          'partyId': phoneNumber,
        },
        'payerMessage': description,
        'payeeNote': 'Mizano payment: $reference',
      }),
    );
    
    if (response.statusCode == 202) {
      // Request accepted, poll for status
      return transactionId;
    } else {
      throw Exception('Payment request failed: ${response.body}');
    }
  }
  
  // Step 3: Check Payment Status
  Future<String> getPaymentStatus(String transactionId) async {
    String token = await getAccessToken();
    
    final response = await http.get(
      Uri.parse('$baseURL/collection/v1_0/requesttopay/$transactionId'),
      headers: {
        'Authorization': 'Bearer $token',
        'X-Target-Environment': 'mtnbotswana',
        'Ocp-Apim-Subscription-Key': apiKey,
      },
    );
    
    if (response.statusCode == 200) {
      var body = json.decode(response.body);
      return body['status']; // 'PENDING', 'SUCCESSFUL', 'FAILED'
    } else {
      throw Exception('Status check failed');
    }
  }
  
  String _generateUUID() {
    // Generate UUID v4 for transaction ID
    return Uuid().v4();
  }
}
```

**User Flow:**
1. User taps "Sponsor P100" on activity page
2. Mizano shows: "Enter your MTN Mobile Money number: 77XXXXXX"
3. User submits → Mizano calls `requestPayment()`
4. MTN sends USSD prompt to user's phone: "Confirm payment of P100 to Mizano? 1. Yes 2. No"
5. User dials *1# → Transaction processes
6. Mizano polls `getPaymentStatus()` every 5 seconds (max 2 minutes)
7. On "SUCCESSFUL" → Update sponsorship in Google Sheets, send confirmation notification

---

#### Orange Money API

**Setup:**
1. Contact Orange Botswana Business Team (API access requires contract)
2. Receive API credentials (Client ID, Client Secret)
3. Base URL: `https://api.orange.com/omapi/v1`

**Payment Request (Similar to MTN):**

```dart
class OrangeMoneyService {
  static const baseURL = 'https://api.orange.com/omapi/v1';
  static const clientId = 'YOUR_CLIENT_ID';
  static const clientSecret = 'YOUR_CLIENT_SECRET';
  
  Future<String> requestPayment({
    required String phoneNumber,
    required double amount,
    required String reference,
  }) async {
    // OAuth2 authentication
    String token = await _getOAuthToken();
    
    final response = await http.post(
      Uri.parse('$baseURL/payment/webpayment'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: json.encode({
        'subscriber_msisdn': phoneNumber,
        'amount': amount,
        'currency_code': 'BWP',
        'partner_id': 'MIZANO',
        'partner_name': 'Mizano Sports',
        'service_code': 'SPONSOR',
        'external_id': reference,
      }),
    );
    
    // Handle response (similar to MTN)
  }
}
```

---

#### PayPal Integration (Fallback)

**Use Case:** International sponsors (diaspora, NGOs)

**Implementation:**
```dart
import 'package:flutter_paypal/flutter_paypal.dart';

void openPayPalCheckout({
  required double amount,
  required String description,
}) async {
  Navigator.of(context).push(
    MaterialPageRoute(
      builder: (BuildContext context) => UsePaypal(
        sandboxMode: false, // Production
        clientId: 'YOUR_PAYPAL_CLIENT_ID',
        secretKey: 'YOUR_PAYPAL_SECRET',
        returnURL: 'https://mizano.app/paypal-return',
        cancelURL: 'https://mizano.app/paypal-cancel',
        transactions: [
          {
            "amount": {
              "total": amount.toStringAsFixed(2),
              "currency": "USD", // PayPal doesn't support BWP directly
              "details": {
                "subtotal": amount.toStringAsFixed(2),
              }
            },
            "description": description,
          }
        ],
        onSuccess: (Map params) async {
          print('Payment successful: $params');
          // Update backend
        },
        onError: (error) {
          print('Payment error: $error');
        },
        onCancel: (params) {
          print('Payment cancelled');
        },
      ),
    ),
  );
}
```

---

### Offline Behavior

**Mobile Money Requires Connectivity:**
- Both MTN and Orange APIs need internet
- If user initiates payment offline → Show: "You need internet to complete payment. Reconnect and try again."

**Payment Queue:**
- Queued payments NOT supported (security risk)
- All transactions must be real-time confirmed

---

### Error Handling

| Error | Cause | Mitigation |
|-------|-------|-----------|
| **"Insufficient balance"** | User's wallet empty | Show: "Your Mobile Money balance is low. Top up and try again." |
| **"Transaction failed"** | Network timeout | Retry up to 3 times with 5-second delays |
| **"Invalid phone number"** | Wrong format | Validate: Must be 267XXXXXXXX (8 digits after 267) |
| **"Payment expired"** | User didn't confirm within 2 minutes | Show: "Payment timed out. Try again?" |
| **"Duplicate transaction"** | Same reference used twice | Generate unique UUID per attempt |

---

### Security

**PCI-DSS Compliance (NOT Applicable):**
- Mobile Money is NOT credit card → PCI-DSS rules don't apply
- However, follow best practices:
  - Never log full phone numbers (mask middle digits: 267-XX-XXXX-34)
  - Encrypt API keys at rest
  - Use HTTPS for all API calls

**Fraud Prevention:**
```dart
// Rate limiting: Max 5 payment attempts per user per hour
if (await _exceedsRateLimit(userID)) {
  throw Exception('Too many payment attempts. Try again in 1 hour.');
}

// Amount validation: Max P5,000 per transaction (prevent fat-finger errors)
if (amount > 5000) {
  showConfirmation('This is a large amount (P$amount). Confirm?');
}
```

---

### Commission Calculation

**Sponsor-a-Game (5%):**
```dart
double calculateMizanoCommission(double totalAmount) {
  return totalAmount * 0.05;
}

// Example: User sponsors P100
// Mizano receives: P5.00
// Team receives: P95.00
```

**Venue Booking (5% or 10%):**
- Standard booking: 5%
- Instant Book (auto-approval): 10%

**Transparency:**
- Always show breakdown before payment:
  ```
  Your Sponsorship: P100.00
  Mizano Fee (5%):  P5.00
  Team Receives:    P95.00
  ─────────────────────────
  Total Charge:     P100.00
  ```

---

### Botswana-Specific Notes

**Mobile Money Dominance:**
- 80% of adults have mobile money accounts (vs. 30% with bank accounts)
- Preferred over credit cards (which require bank accounts)
- USSD (*150#) confirmation familiar to all users

**Transaction Limits:**
- MTN: P10,000/day for verified accounts
- Orange: P5,000/day standard, P15,000/day for verified
- Mizano max: P5,000/transaction (sufficient for sponsorships)

**Settlement Times:**
- MTN: Instant to Mizano merchant account
- Orange: T+1 (next business day)
- PayPal: 3-5 business days (international transfer)

---

### Testing Checklist

- [ ] MTN sandbox payments complete successfully
- [ ] Orange sandbox payments complete successfully
- [ ] PayPal sandbox payments redirect correctly
- [ ] Payment status polling stops after "SUCCESSFUL" or "FAILED"
- [ ] Commission calculations display correctly before payment
- [ ] Insufficient balance errors show user-friendly message
- [ ] Duplicate transactions rejected (UUID validation)
- [ ] Offline payment attempts show "Need internet" error

---

## GOOGLE MAPS (STATIC TILES)

### Purpose
Provide **offline-capable maps** for Game Cube locations without requiring constant GPS/data. Users download 1MB static map of Gaborone neighborhoods once, then navigate offline.

---

### Technical Implementation

#### Static Maps API

**Endpoint:**
```
https://maps.googleapis.com/maps/api/staticmap?parameters
```

**Parameters:**
- `center`: Latitude, longitude (e.g., -24.6282,25.9231 for Gaborone)
- `zoom`: 12 (neighborhood level)
- `size`: 640x640 (optimized for mobile)
- `maptype`: roadmap
- `markers`: Locations of Game Cubes (custom icon)
- `key`: YOUR_GOOGLE_MAPS_API_KEY

**Example Request:**
```
https://maps.googleapis.com/maps/api/staticmap?
  center=-24.6282,25.9231&
  zoom=13&
  size=640x640&
  maptype=roadmap&
  markers=color:red%7Clabel:G%7C-24.6543,25.9102&
  markers=color:red%7Clabel:G%7C-24.6234,25.9456&
  key=YOUR_API_KEY
```

**Code (Flutter):**
```dart
import 'package:http/http.dart' as http;
import 'dart:io';

class MapTileDownloader {
  static const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
  
  Future<File> downloadGaboroneMap() async {
    // Define Gaborone bounds (covers ~200km² including all neighborhoods)
    List<MapTile> tiles = [
      MapTile(center: '-24.6282,25.9231', zoom: 13, label: 'Central'),
      MapTile(center: '-24.6543,25.9102', zoom: 13, label: 'Block3'),
      MapTile(center: '-24.6234,25.9456', zoom: 13, label: 'Broadhurst'),
      // Add more tiles for full coverage...
    ];
    
    // Download and stitch tiles (creates single 1MB file)
    List<File> tileParts = [];
    for (var tile in tiles) {
      File part = await _downloadTile(tile);
      tileParts.add(part);
    }
    
    // Combine into single offline map file
    File combinedMap = await _combineTiles(tileParts);
    
    // Save to app storage
    final directory = await getApplicationDocumentsDirectory();
    final path = '${directory.path}/gaborone_offline_map.png';
    return combinedMap.copy(path);
  }
  
  Future<File> _downloadTile(MapTile tile) async {
    // Fetch Game Cube markers for this area
    List<GameCube> cubes = await _getGameCubesInArea(tile.center);
    String markers = cubes.map((c) => 
      'markers=color:red%7Clabel:G%7C${c.lat},${c.lng}'
    ).join('&');
    
    String url = 'https://maps.googleapis.com/maps/api/staticmap?'
      'center=${tile.center}&'
      'zoom=${tile.zoom}&'
      'size=640x640&'
      'maptype=roadmap&'
      '$markers&'
      'key=$apiKey';
    
    final response = await http.get(Uri.parse(url));
    
    if (response.statusCode == 200) {
      final file = File('${DateTime.now().millisecondsSinceEpoch}.png');
      return file.writeAsBytes(response.bodyBytes);
    } else {
      throw Exception('Failed to download tile');
    }
  }
  
  Future<File> _combineTiles(List<File> tiles) async {
    // Use image processing library to stitch tiles
    // (Omitted for brevity—use packages like 'image')
    // Final output: ~1MB PNG covering all Gaborone
  }
}

class MapTile {
  String center;
  int zoom;
  String label;
  MapTile({required this.center, required this.zoom, required this.label});
}
```

---

#### Offline Map Display

**Storage:**
- Downloaded map saved to app's local storage: `/app_data/maps/gaborone_offline_map.png`
- Size: ~1MB (covers ~200km² with readable street names at zoom 13)

**Display (Flutter):**
```dart
import 'package:flutter/material.dart';
import 'dart:io';

class OfflineMapViewer extends StatelessWidget {
  final File mapFile;
  final GameCube selectedCube;
  
  @override
  Widget build(BuildContext context) {
    return InteractiveViewer(
      panEnabled: true,
      minScale: 0.5,
      maxScale: 3.0,
      child: Stack(
        children: [
          // Base map image
          Image.file(mapFile, fit: BoxFit.contain),
          
          // Overlay selected Game Cube marker
          Positioned(
            left: selectedCube.mapX, // Pre-calculated pixel position
            top: selectedCube.mapY,
            child: Icon(Icons.location_pin, color: Colors.red, size: 40),
          ),
        ],
      ),
    );
  }
}
```

**Navigation Flow:**
1. User taps activity → Activity Page shows location
2. Tap "View on Map" → Opens OfflineMapViewer
3. Map loads from local storage (instant, no network call)
4. User pinch-zooms, pans to find Game Cube
5. Tap marker → Shows address text: "Game Cube, Block 3, Plot 1234"

---

### Offline Behavior

**Map Available Offline:**
- Once downloaded, map accessible without internet
- All Game Cube markers pre-embedded in static image

**Update Strategy:**
- Settings → "Update Map" button (only appears if >90 days since last download)
- Checks for new Game Cubes or street changes
- Re-downloads entire 1MB file (not incremental)

---

### Error Handling

| Error | Cause | Mitigation |
|-------|-------|-----------|
| **"Download failed"** | No internet during download | Retry button, show progress bar |
| **"Map not found"** | File deleted/corrupted | Auto-trigger re-download |
| **"API quota exceeded"** | Too many Static Maps API calls | Cache tiles server-side, distribute via CDN |

---

### Data Efficiency

**Bandwidth Usage:**
- Initial download: 1MB (one-time)
- Updates: 1MB (quarterly, optional)
- Viewing: 0KB (fully offline)

**Optimization:**
- Compress PNG to WebP for 30% smaller size (~700KB)
- Use grayscale map (reduces color data) if acceptable visually

---

### Alternative: Vector Tiles (Future Enhancement)

**Current Approach:** Static raster images (PNG)

**Future Option:** Vector tiles (e.g., Mapbox)
- **Pros:** Smaller file sizes (~200KB), zoomable without pixelation
- **Cons:** Requires SDK integration, more complex offline caching

**Decision:** Stick with Static Maps API for MVP (simpler, proven)

---

### Botswana-Specific Notes

**Gaborone Coverage:**
- City area: ~169 km²
- Neighborhoods: Block 1-10, Broadhurst, Gaborone West, Extension areas
- 1MB map at zoom 13 covers entire city with readable street names

**Game Cube Locations (Approximate):**
- Block 3: -24.6543, 25.9102
- Broadhurst: -24.6234, 25.9456
- Gaborone West: -24.6598, 25.8876
- (Expand with actual GPS coordinates from Game Cube installations)

---

### Testing Checklist

- [ ] 1MB map downloads completely (verify file size)
- [ ] Map displays offline (airplane mode test)
- [ ] Game Cube markers visible and correctly positioned
- [ ] Pinch-zoom works (0.5x to 3x range)
- [ ] "Update Map" button appears after 90 days
- [ ] Corrupted file triggers auto re-download
- [ ] API quota does not exceed during bulk testing

---

## WEATHER API INTEGRATION

### Purpose
Display weather forecasts for **outdoor activities** to help organizers and participants plan. Captured during event creation, shown on Activity Pages.

---

### Technical Implementation

#### OpenWeatherMap API

**Endpoint:**
```
https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}&units=metric
```

**Setup:**
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Free tier: 1,000 calls/day (sufficient for MVP)
3. Get API Key

**Code (Flutter):**
```dart
import 'package:http/http.dart' as http;
import 'dart:convert';

class WeatherService {
  static const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
  static const baseURL = 'https://api.openweathermap.org/data/2.5';
  
  Future<WeatherForecast> getForecast({
    required double lat,
    required double lon,
    required DateTime eventDate,
  }) async {
    String url = '$baseURL/forecast?lat=$lat&lon=$lon&appid=$apiKey&units=metric';
    
    final response = await http.get(Uri.parse(url));
    
    if (response.statusCode == 200) {
      var data = json.decode(response.body);
      
      // Find forecast closest to event date/time
      var forecast = _findClosestForecast(data['list'], eventDate);
      
      return WeatherForecast(
        temperature: forecast['main']['temp'],
        description: forecast['weather'][0]['description'],
        humidity: forecast['main']['humidity'],
        windSpeed: forecast['wind']['speed'],
        icon: forecast['weather'][0]['icon'],
      );
    } else {
      throw Exception('Failed to load weather');
    }
  }
  
  Map<String, dynamic> _findClosestForecast(List<dynamic> forecasts, DateTime target) {
    // OpenWeatherMap provides 3-hour intervals for 5 days
    // Find the forecast closest to event time
    return forecasts.reduce((a, b) {
      DateTime aTime = DateTime.parse(a['dt_txt']);
      DateTime bTime = DateTime.parse(b['dt_txt']);
      return (aTime.difference(target).abs() < bTime.difference(target).abs()) ? a : b;
    });
  }
}

class WeatherForecast {
  double temperature; // Celsius
  String description; // "clear sky", "light rain", etc.
  int humidity; // Percentage
  double windSpeed; // m/s
  String icon; // e.g., "01d" (day clear), "10d" (day rain)
}
```

---

#### Display on Activity Page

**UI Element:**
```
☀️ Weather for Saturday, Feb 14 at 4PM
──────────────────────────────────────
Temperature: 28°C
Conditions: Partly cloudy
Wind: 12 km/h
Humidity: 55%

⚠️ Tip: Bring sunscreen and water!
```

**Cached at Event Creation:**
- When Creator sets date/time → Mizano fetches forecast
- Stored in Google Sheets column: `WeatherForecast` (JSON string)
- Updated daily (if event is >24 hours away) via sync job

---

### Offline Behavior

**Weather Data Cached:**
- Forecast downloaded when event created (requires internet)
- Saved locally with activity details
- If offline when viewing Activity Page → Shows cached forecast with note: "Last updated [timestamp]"

**No Real-Time Updates Offline:**
- Weather changes rapidly; offline users see stale data
- Acceptable trade-off (better than no weather info)

---

### Error Handling

| Error | Cause | Mitigation |
|-------|-------|-----------|
| **"Weather unavailable"** | API call failed | Show: "Weather forecast unavailable. Check later." |
| **"Location not found"** | Invalid lat/lon | Validate coordinates before API call |
| **"API quota exceeded"** | >1,000 calls/day | Rate limit: Cache forecasts, only fetch once per event per day |

---

### Data Efficiency

**Bandwidth Usage:**
- Single forecast fetch: ~5KB (JSON response)
- OpenWeatherMap icons (optional): ~2KB each (cache server-side)
- **Total per event:** ~7KB (one-time at creation, daily updates)

**Optimization:**
- Batch fetch forecasts for all upcoming events (single API call with multiple locations)
- Cache icons in app assets (avoid downloading 01d.png, 10d.png, etc.)

---

### Botswana-Specific Notes

**Climate:**
- Gaborone: Semi-arid, hot summers (Oct-Mar), mild winters (Apr-Sep)
- Rainy season: Nov-Mar (evening thunderstorms common)
- Key for outdoor sports: Temperature often 35°C+ in summer → Heat warnings critical

**Localization:**
- Display temps in Celsius (standard in Botswana)
- Wind speed in km/h (not m/s)
- Add context: "Hot day—bring extra water!" for temps >30°C

---

### Testing Checklist

- [ ] Weather fetched correctly for Gaborone coordinates
- [ ] Forecast matches event date/time (3-hour interval accuracy)
- [ ] Cached weather displays offline
- [ ] Daily updates refresh forecast for upcoming events
- [ ] API errors show graceful fallback message
- [ ] Icons cached locally (no repeated downloads)

---

## BLUETOOTH (OFFLINE MATCH SIGN-UPS)

### Purpose
Enable users to **join matches and check in at Game Cubes** without internet via local Bluetooth peer-to-peer connections.

---

### Technical Implementation

#### Bluetooth Low Energy (BLE)

**Setup:**
- Use Flutter package: `flutter_blue_plus`
- Game Cube Staff device acts as BLE "beacon" (peripheral)
- User devices scan for beacon (central role)

**Code (Flutter):**

**Game Cube Staff App (Peripheral):**
```dart
import 'package:flutter_blue_plus/flutter_blue_plus.dart';

class GameCubeBeacon {
  static const serviceUUID = '12345678-1234-1234-1234-123456789abc';
  static const characteristicUUID = '87654321-4321-4321-4321-cba987654321';
  
  Future<void> startBeacon(String gameCubeID) async {
    // Advertise Mizano service
    await FlutterBluePlus.instance.startAdvertising(
      advertisementData: AdvertisementData(
        serviceUuids: [serviceUUID],
        localName: 'Mizano-$gameCubeID', // e.g., "Mizano-Block3"
      ),
    );
    
    print('Game Cube beacon active: $gameCubeID');
  }
  
  void stopBeacon() {
    FlutterBluePlus.instance.stopAdvertising();
  }
}
```

**User App (Central):**
```dart
class OfflineCheckIn {
  Future<void> scanForGameCubes() async {
    // Start scanning for Mizano beacons
    FlutterBluePlus.instance.startScan(timeout: Duration(seconds: 10));
    
    // Listen for scan results
    FlutterBluePlus.instance.scanResults.listen((results) {
      for (ScanResult r in results) {
        if (r.device.name.startsWith('Mizano-')) {
          // Found a Game Cube beacon
          _connectAndCheckIn(r.device);
        }
      }
    });
  }
  
  Future<void> _connectAndCheckIn(BluetoothDevice device) async {
    // Connect to beacon
    await device.connect();
    
    // Discover services
    List<BluetoothService> services = await device.discoverServices();
    
    for (BluetoothService service in services) {
      if (service.uuid.toString() == GameCubeBeacon.serviceUUID) {
        // Write check-in data (userID, activityID, timestamp)
        var characteristic = service.characteristics.firstWhere(
          (c) => c.uuid.toString() == GameCubeBeacon.characteristicUUID,
        );
        
        String checkInData = json.encode({
          'userID': 'USER-GAB-001',
          'activityID': 'ACT-GAB-123',
          'timestamp': DateTime.now().toIso8601String(),
        });
        
        await characteristic.write(utf8.encode(checkInData));
        print('Check-in successful (offline)');
      }
    }
    
    // Disconnect
    await device.disconnect();
  }
}
```

---

#### Sync Logic

**When Game Cube Staff Device Gets Online:**

1. Retrieve all Bluetooth check-ins from local storage
2. Batch upload to Google Sheets (`Rosters` sheet, column: `CheckInTime`)
3. Send notification to Guardian: "[Child] checked in at Game Cube, Block 3"
4. Clear local Bluetooth log

**Code:**
```dart
class BluetoothSyncManager {
  Future<void> syncCheckIns() async {
    // Load queued check-ins from local DB
    List<CheckIn> queue = await LocalDatabase.getBluetoothCheckIns();
    
    if (queue.isEmpty) return;
    if (!await hasInternetConnection()) return;
    
    // Batch upload via Sheets API
    for (var checkIn in queue) {
      await SheetsBackend.updateRoster(
        activityID: checkIn.activityID,
        userID: checkIn.userID,
        checkInTime: checkIn.timestamp,
      );
    }
    
    // Clear queue
    await LocalDatabase.clearBluetoothCheckIns();
    print('${queue.length} Bluetooth check-ins synced');
  }
}
```

**Sync Frequency:** Every 15 minutes (same as main sync cycle)

---

### Offline Behavior

**Fully Offline:**
- User and Staff devices communicate via Bluetooth (no internet required)
- Check-in saved locally on BOTH devices (redundancy)
- User sees instant feedback: "✅ Checked in at Block 3 Game Cube"

**Sync When Online:**
- Staff device syncs check-ins to backend
- User device syncs own log (for audit trail)
- Roster updated → All participants see new check-in status

---

### Error Handling

| Error | Cause | Mitigation |
|-------|-------|-----------|
| **"Bluetooth disabled"** | User/Staff turned off Bluetooth | Prompt: "Enable Bluetooth to check in offline" |
| **"Game Cube not found"** | Out of range (>10m) or beacon off | Show: "No Game Cube nearby. Try getting closer." |
| **"Connection failed"** | Interference or low battery | Retry up to 3 times, then queue for online sync |
| **"Duplicate check-in"** | User taps button twice | Check local DB: If check-in exists in last 5 minutes, ignore |

---

### Security

**Beacon Spoofing Prevention:**
- Each Game Cube has unique ID in beacon name: `Mizano-Block3`
- Staff device writes signed check-in data (includes Staff signature key)
- Backend validates signature on sync (rejects spoofed check-ins)

**Code (Signed Check-In):**
```dart
import 'package:crypto/crypto.dart';

String signCheckIn(String userID, String activityID, String timestamp) {
  String secret = 'MIZANO_STAFF_SECRET_KEY'; // Shared secret
  String data = '$userID-$activityID-$timestamp';
  return sha256.convert(utf8.encode('$data-$secret')).toString();
}

// On backend sync:
bool validateCheckIn(CheckIn checkIn) {
  String expectedSignature = signCheckIn(checkIn.userID, checkIn.activityID, checkIn.timestamp);
  return checkIn.signature == expectedSignature;
}
```

---

### Botswana-Specific Notes

**Game Cube Density:**
- Gaborone: 10-15 Game Cubes (one per major neighborhood)
- Bluetooth range: ~10 meters (sufficient for check-in kiosks)
- Staff device: Tablet mounted at Game Cube entrance (always on, charging)

**User Experience:**
- First-time users need tutorial: "Tap 'Check In' when you arrive at the Game Cube"
- Visual cue: "📶 Searching for nearby Game Cube..."

---

### Testing Checklist

- [ ] Staff beacon advertises correctly (visible in BLE scanner apps)
- [ ] User app detects beacon within 10m range
- [ ] Check-in data writes successfully via Bluetooth
- [ ] Duplicate check-ins ignored (5-minute window)
- [ ] Offline check-ins sync when Staff device goes online
- [ ] Signed check-ins validated on backend (reject spoofed)
- [ ] Bluetooth disabled error shows helpful prompt

---

## SMS GATEWAY (GUARDIAN ALERTS)

### Purpose
Send **critical notifications** to Guardians via SMS when push notifications fail (e.g., app not installed, phone offline).

---

### Use Cases

1. **Three-Way Handshake:** Guardian receives SMS to approve child's profile
2. **Injury Alerts:** Critical injury → SMS backup if push fails
3. **Missing Check-Out:** Child hasn't checked out 2 hours after event → SMS alert
4. **Account Security:** Guardian lock/unlock profile actions

---

### Technical Implementation

#### Botswana SMS Gateway (e.g., Mascom SMS API)

**Setup:**
1. Contact Mascom Business Team for SMS API access
2. Receive API credentials (Username, API Key)
3. Pricing: ~P0.10 per SMS (bulk rates available)

**Code (Flutter/Backend):**
```dart
import 'package:http/http.dart' as http;
import 'dart:convert';

class SMSGateway {
  static const baseURL = 'https://api.mascom.bw/sms/v1/send';
  static const username = 'MIZANO_SMS_USERNAME';
  static const apiKey = 'YOUR_API_KEY';
  static const senderID = 'Mizano'; // Alphanumeric sender (max 11 chars)
  
  Future<void> sendSMS({
    required String phoneNumber, // +267XXXXXXXX
    required String message,
  }) async {
    final response = await http.post(
      Uri.parse(baseURL),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $apiKey',
      },
      body: json.encode({
        'username': username,
        'sender': senderID,
        'recipient': phoneNumber,
        'message': message,
      }),
    );
    
    if (response.statusCode == 200) {
      print('SMS sent to $phoneNumber');
    } else {
      throw Exception('SMS failed: ${response.body}');
    }
  }
}
```

---

#### SMS Templates

**Handshake Activation:**
```
Your child [Name] was registered by [School] on Mizano. Tap link to approve: https://mizano.app/approve/[TOKEN]

Valid for 7 days.
```

**Injury Alert:**
```
EMERGENCY: [Child] had a [injury type] at [Activity]. First-aid: [Yes/No]. Contact NOW: +267XXXXXXXX

Details: https://mizano.app/injury/[ID]
```

**Missing Check-Out:**
```
ALERT: [Child] has not checked out from [Activity]. Expected end was [Time]. Contact organizer: +267XXXXXXXX
```

**Security Lock:**
```
Your request to lock [Child]'s profile was successful. Their account is now suspended. Unlock: https://mizano.app/unlock/[TOKEN]
```

---

### Offline Behavior

**SMS Sent from Backend (Always Online):**
- Backend server (not user's phone) sends SMS via API
- Works regardless of user's connectivity

**User Receives SMS Offline:**
- SMS delivered by carrier network (no app/internet needed)
- User can read message and click link when reconnected

---

### Error Handling

| Error | Cause | Mitigation |
|-------|-------|-----------|
| **"Invalid phone number"** | Malformed +267 format | Validate before API call |
| **"SMS quota exceeded"** | >10,000 SMS/month | Rate limit: Max 5 SMS per user per day |
| **"Delivery failed"** | Phone off or out of coverage | Retry 3 times over 24 hours, then log failure |
| **"Sender ID rejected"** | 'Mizano' not approved by carrier | Apply for official sender ID with Mascom |

---

### Data Efficiency

**Bandwidth Usage:**
- SMS API call: ~1KB (HTTP POST request)
- SMS content: Max 160 characters per message (split into multiple if longer)
- **Cost:** ~P0.10 per SMS (use sparingly for critical alerts only)

---

### Cost Optimization

**SMS Budget:**
- Target: <1,000 SMS/month in MVP (P100/month)
- Priority order:
  1. Injury alerts (critical)
  2. Handshake activations (essential)
  3. Missing check-outs (safety)
  4. Security actions (low volume)

**Reduce Usage:**
- Always try push notification first
- Only send SMS if push fails or not acknowledged within 5 minutes
- Batch daily summaries (e.g., "You have 3 pending approvals") instead of per-event SMS

---

### Botswana-Specific Notes

**Carrier Coverage:**
- Mascom: 95%+ coverage (best for rural areas)
- Orange: 90%+ coverage
- BTC Mobile: Limited (avoid for critical alerts)

**Sender ID Approval:**
- Apply for official 'Mizano' sender ID (takes 2-3 weeks)
- Until approved, use generic numeric sender (e.g., +26771234567)

---

### Testing Checklist

- [ ] SMS sent successfully to +267 test number
- [ ] SMS received within 30 seconds (Mascom network)
- [ ] Links in SMS clickable and redirect correctly
- [ ] Invalid phone numbers rejected before API call
- [ ] SMS quota not exceeded during load testing
- [ ] Push notification attempted before SMS fallback

---

## PUSH NOTIFICATIONS (FCM)

### Purpose
**Real-time alerts** for activity updates, Guardian approvals, injury reports, and "Playing Now" notifications.

---

### Technical Implementation

#### Firebase Cloud Messaging (FCM)

**Setup:**
1. Add Firebase to Flutter project (via FlutterFire CLI)
2. Configure google-services.json (Android) and GoogleService-Info.plist (iOS)
3. Request notification permissions on app launch

**Code (Flutter):**
```dart
import 'package:firebase_messaging/firebase_messaging.dart';

class NotificationService {
  final FirebaseMessaging _fcm = FirebaseMessaging.instance;
  
  Future<void> initialize() async {
    // Request permission
    NotificationSettings settings = await _fcm.requestPermission(
      alert: true,
      badge: true,
      sound: true,
    );
    
    if (settings.authorizationStatus == AuthorizationStatus.authorized) {
      print('User granted permission');
      
      // Get FCM token
      String? token = await _fcm.getToken();
      print('FCM Token: $token');
      
      // Save token to backend (for targeted notifications)
      await _saveTokenToBackend(token);
      
      // Listen for messages
      FirebaseMessaging.onMessage.listen((RemoteMessage message) {
        _handleNotification(message);
      });
      
      // Handle notification taps
      FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
        _handleNotificationTap(message);
      });
    }
  }
  
  void _handleNotification(RemoteMessage message) {
    print('Notification received: ${message.notification?.title}');
    
    // Show local notification (using flutter_local_notifications)
    _showLocalNotification(
      title: message.notification?.title ?? '',
      body: message.notification?.body ?? '',
      payload: message.data['action'], // e.g., "open_activity_ACT-GAB-123"
    );
  }
  
  void _handleNotificationTap(RemoteMessage message) {
    // Navigate to relevant page
    String action = message.data['action'];
    
    if (action.startsWith('open_activity_')) {
      String activityID = action.split('_').last;
      Navigator.pushNamed(context, '/activity', arguments: activityID);
    } else if (action == 'open_guardian_dashboard') {
      Navigator.pushNamed(context, '/guardian-dashboard');
    }
  }
}
```

---

#### Backend: Sending Notifications

**Send via FCM Admin SDK (Node.js example):**
```javascript
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert('path/to/serviceAccountKey.json')
});

async function sendNotification(userFCMToken, title, body, action) {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    data: {
      action: action, // e.g., "open_activity_ACT-GAB-123"
    },
    token: userFCMToken,
  };
  
  try {
    const response = await admin.messaging().send(message);
    console.log('Notification sent:', response);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}

// Example usage:
sendNotification(
  'GUARDIAN_FCM_TOKEN',
  'Approval Needed',
  'Your child wants to join Soccer in Block 3. Approve?',
  'open_guardian_dashboard'
);
```

---

#### Notification Types & Priorities

| Type | Priority | Example | Action |
|------|----------|---------|--------|
| **Critical** | High | "INJURY ALERT: [Child] injured" | Opens Health & Safety Log |
| **Urgent** | High | "Approval needed: [Activity]" | Opens Guardian Dashboard |
| **Info** | Normal | "Match starts in 2 hours" | Opens Activity Page |
| **Low** | Normal | "[Child] checked in at Game Cube" | Opens Activity Monitor |

**Code (Priority Setting):**
```dart
// High priority (shows even if Do Not Disturb is on)
final message = {
  'notification': {
    'title': 'INJURY ALERT',
    'body': 'Your child had an injury',
  },
  'android': {
    'priority': 'high',
  },
  'apns': {
    'headers': {
      'apns-priority': '10',
    },
  },
  'token': userFCMToken,
};
```

---

### Offline Behavior

**Notifications Queue When Offline:**
- FCM stores notifications for up to 28 days if device is offline
- When device reconnects → All queued notifications delivered
- User receives burst of alerts (can be overwhelming)

**Mitigation:**
- Backend tracks last-seen timestamp for each user
- Only send notifications for events still relevant (e.g., don't send "Match in 2 hours" if it already passed)

---

### Error Handling

| Error | Cause | Mitigation |
|-------|-------|-----------|
| **"Permission denied"** | User declined notifications | Prompt to enable in Settings (with instructions) |
| **"Token expired"** | FCM token invalidated (app reinstall) | Refresh token on app launch, update backend |
| **"Quota exceeded"** | >10,000 notifications/min | Rate limit: Max 100 notifications per user per day |
| **"Invalid token"** | Malformed FCM token | Validate token format before sending |

---

### Data Efficiency

**Bandwidth Usage:**
- Notification payload: ~500 bytes (title + body + data)
- FCM uses efficient binary protocol (minimal data)
- **Total per notification:** <1KB

---

### Botswana-Specific Notes

**Network Reliability:**
- Mascom/Orange 4G coverage strong in Gaborone (notifications deliver instantly)
- Rural areas: 3G/EDGE (slower, but FCM queues until delivery)

**User Behavior:**
- Batswana often have multiple SIM cards (work/personal) → Multiple FCM tokens
- Solution: Allow multiple tokens per user (backend stores array)

---

### Testing Checklist

- [ ] Notifications received on Android (test with Firebase Console)
- [ ] Notifications received on iOS (with correct APNS certificate)
- [ ] Tapping notification opens correct page in app
- [ ] High-priority notifications bypass Do Not Disturb
- [ ] Offline notifications queue and deliver on reconnect
- [ ] Permission denial shows helpful prompt
- [ ] FCM tokens refresh automatically on app launch

---

## EDUCATIONAL INSTITUTION INTEGRATIONS

### Purpose
Enable **schools to bulk-upload students**, manage inter-house leagues, and integrate with national school sports systems.

---

### Use Cases

1. **Bulk Student Upload:** CSV import at term start (500+ students)
2. **Guardian Handshake:** Auto-notify parents to approve child profiles
3. **Inter-House Competitions:** Track Blue vs. Red vs. Yellow house points
4. **National League Sync:** Report match results to Botswana School Sports Association (BSSA)
5. **WhatsApp Broadcast Channels:** One-way announcements to students/parents

---

### Technical Implementation

#### CSV Bulk Upload

**Format (Columns):**
```
StudentName, DateOfBirth, Grade, GuardianPhone, HouseColor
Kgosi Seretse, 2010-03-15, Grade 8, +26772123456, Red
Neo Molefe, 2011-07-22, Grade 7, +26773987654, Blue
```

**Code (Backend - Process CSV):**
```python
import csv
import uuid
from datetime import datetime

def process_school_csv(school_id, csv_file):
    students = []
    
    with open(csv_file, 'r') as f:
        reader = csv.DictReader(f)
        
        for row in reader:
            # Validate data
            if not validate_phone(row['GuardianPhone']):
                print(f"Invalid phone for {row['StudentName']}")
                continue
            
            # Generate unique StudentID
            student_id = f"STU-{school_id}-{uuid.uuid4().hex[:6].upper()}"
            
            # Create pending student profile
            student = {
                'ProfileID': student_id,
                'ProfileType': 'Student',
                'FullName': row['StudentName'],
                'DateOfBirth': row['DateOfBirth'],
                'SchoolID': school_id,
                'GradeYear': row['Grade'],
                'GuardianPhone': row['GuardianPhone'],
                'HouseColor': row['HouseColor'],
                'ApprovalStatus': 'Pending',
            }
            
            students.append(student)
            
            # Send SMS to Guardian
            send_sms(
                phone=row['GuardianPhone'],
                message=f"Your child {row['StudentName']} was registered by {school_id} on Mizano. Approve: https://mizano.app/approve/{student_id}"
            )
    
    # Batch insert to Google Sheets
    sheets_api.append_rows(sheet='Users', rows=students)
    
    print(f"{len(students)} students uploaded successfully")

def validate_phone(phone):
    # Must be +267XXXXXXXX
    import re
    return bool(re.match(r'^\+267[0-9]{8}$', phone))
```

---

#### Inter-House Competition Tracking

**Schema (Activities Sheet):**
- Column: `HouseColor` (Red/Blue/Yellow/Green)
- Column: `HousePoints` (calculated from match results)

**Leaderboard Calculation:**
```dart
class HouseLeaderboard {
  Future<Map<String, int>> calculatePoints(String schoolID) async {
    // Fetch all school matches
    var matches = await SheetsBackend.readSheet('Activities', 'A:Z');
    
    Map<String, int> points = {
      'Red': 0,
      'Blue': 0,
      'Yellow': 0,
      'Green': 0,
    };
    
    for (var match in matches) {
      if (match['SchoolID'] == schoolID) {
        String winner = match['WinnerHouse'];
        points[winner] = (points[winner] ?? 0) + 10; // 10 points per win
      }
    }
    
    return points;
  }
}
```

**Display in School Dashboard:**
```
🏆 Inter-House Leaderboard (Term 1, 2026)
─────────────────────────────────────────
1. 🔴 Red House    - 180 points
2. 🔵 Blue House   - 165 points
3. 🟡 Yellow House - 142 points
4. 🟢 Green House  - 128 points

Next match: Red vs. Blue (Saturday, Soccer)
```

---

#### National League Sync (BSSA Integration)

**Future API (Conceptual):**

Botswana School Sports Association provides API endpoint:
```
POST https://api.bssa.org.bw/results
Authorization: Bearer [SCHOOL_API_KEY]

{
  "school_id": "SCH-GAB-WEST-01",
  "match_id": "ACT-GAB-123",
  "sport": "Soccer",
  "level": "U15",
  "opponent": "SCH-GAB-EAST-02",
  "result": {
    "home_score": 3,
    "away_score": 1,
    "date": "2026-02-14",
  }
}
```

**Mizano Implementation:**
```dart
class BSSAIntegration {
  static const baseURL = 'https://api.bssa.org.bw';
  
  Future<void> reportMatchResult(Activity match) async {
    // Only sync if NationalLeagueID is set (Column AQ)
    if (match.nationalLeagueID == null) return;
    
    final response = await http.post(
      Uri.parse('$baseURL/results'),
      headers: {
        'Authorization': 'Bearer ${match.schoolAPIKey}',
        'Content-Type': 'application/json',
      },
      body: json.encode({
        'school_id': match.schoolID,
        'match_id': match.activityID,
        'sport': match.type,
        'result': {
          'home_score': match.homeScore,
          'away_score': match.awayScore,
          'date': match.date.toIso8601String(),
        },
      }),
    );
    
    if (response.statusCode == 200) {
      print('Result synced to BSSA');
    }
  }
}
```

---

### Offline Behavior

**Bulk Upload Requires Internet:**
- CSV processing happens on backend (school admin portal via web)
- Students created in Google Sheets (online operation)

**Student Profiles Work Offline:**
- Once created, students can view/join activities offline
- Rosters sync every 15 minutes when online

---

### Error Handling

| Error | Cause | Mitigation |
|-------|-------|-----------|
| **"Duplicate student"** | Student already exists (same name + DOB) | Skip duplicate, log for manual review |
| **"Invalid CSV format"** | Missing required columns | Validate headers before processing |
| **"Guardian phone unreachable"** | SMS delivery failed | Retry SMS 3 times over 24 hours |
| **"BSSA API down"** | National league API unavailable | Queue result, retry hourly |

---

### Botswana-Specific Notes

**School Terms:**
- Term 1: Jan-Apr
- Term 2: May-Aug
- Term 3: Sep-Dec
- Bulk uploads typically at start of each term

**BSSA:**
- Botswana School Sports Association coordinates national leagues
- API integration planned for 2026 (currently manual reporting)

---

### Testing Checklist

- [ ] CSV with 100 students uploads successfully
- [ ] Duplicate students skipped (no duplicates in Sheets)
- [ ] Guardian SMS sent to all valid phone numbers
- [ ] Inter-house points calculate correctly
- [ ] BSSA API receives match results (sandbox testing)
- [ ] WhatsApp Broadcast Channels created for each grade

---

## CONCLUSION

The Integration Playbook ensures Mizano's external connections are:
1. **Offline-First:** Deep links over API calls (WhatsApp, Facebook)
2. **Data-Efficient:** Zero-rated bundles prioritized (FB Live, WhatsApp)
3. **Reliable:** Sync queues for offline operations (Bluetooth, equipment ledger)
4. **Secure:** Signed check-ins, encrypted API keys, fraud prevention
5. **Botswana-Optimized:** Mobile Money, local SMS gateways, Gaborone maps

**Next Steps:**
1. Obtain API keys for all services (MTN Momo, Google Maps, OpenWeatherMap, Firebase)
2. Set up test environments (sandbox accounts for payment gateways)
3. Build integration test suite (automated checks for each endpoint)
4. Document error codes and recovery procedures (for Staff/Admin)
5. Train Game Cube Staff on Bluetooth check-in workflow

**Vision Statement:**
*"By integrating where Batswana already are—WhatsApp, Facebook, Mobile Money—Mizano becomes invisible infrastructure: always working, rarely noticed, fundamentally essential."*

---

**Document Owner:** Mizano Technical Team  
**Last Updated:** February 11, 2026  
**Version:** 1.0  
**Status:** Technical Reference (For Developers, Admins, and Integration Partners)  
**Contact:** tech@mizano.co.bw | WhatsApp: +267-XXX-XXXX
