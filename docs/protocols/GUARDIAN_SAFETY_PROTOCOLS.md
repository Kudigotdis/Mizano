# GUARDIAN SAFETY PROTOCOLS
**Mizano Platform | Version 1.5 | February 2026**

---

## EXECUTIVE OVERVIEW

Guardian Safety Protocols are the **non-negotiable foundation** of Mizano's approach to minor protection. In Botswana, where community trust and family oversight are paramount, Mizano implements a **Three-Way Handshake** system (Guardian-School-Platform) that ensures### 3.1 The Three-Way Handshake
Safety in Mizano is governed by a **Three-Way Handshake**:
1. **Guardian**: Validates the minor's identity and approves/pauses participation.
2. **School**: Links the student to a verified institution (Column AM).
3. **Platform**: Enforces hard-blocks and logs profile views.

### 3.2 Academic Alert (The "Stop-Go" Logic)
Through Column **AR/AZ** in the Master Sync, Guardians and School Leads can activate an **AcademicAlert**.
- **Effect**: Immediately blocks "Competitive Join" capability.
- **UI**: Displayed as a Pink (Urgency) status border on the student's Mine Page cards.
procedural, and legal frameworks that protect minors while enabling them to participate safely in Botswana's grassroots sports ecosystem.

**Core Principle:** *"No Guardian Approval = No Activity Access"*

This document outlines the technical, procedural, and legal frameworks that protect minors while enabling them to participate safely in Botswana's grassroots sports ecosystem.

---

## THE BOTSWANA CONTEXT: WHY GUARDIAN CONTROLS MATTER

### Cultural & Legal Foundation

1. **Family-First Society:** Botswana culture places parents/guardians as primary decision-makers for children's activities
2. **Data Privacy:** With limited data protection laws, Mizano over-complies to build trust
3. **School Partnership:** Educational Institutions act as co-guardians, requiring alignment
4. **Community Safety:** Village-level activities often involve informal supervision; digital oversight adds accountability
5. **Talent Protection:** Young athletes are vulnerable to exploitation; Guardian controls prevent unauthorized scouting/contact

### Problems We Solve

- **Unauthorized Participation:** Children joining matches without parental knowledge
- **Scouting Transparency:** Recruiters viewing profiles without Guardian awareness
- **Health Emergencies:** Parents unaware of injuries during games
- **Academic Prioritization:** Students neglecting studies for sports without oversight
- **Location Tracking:** Parents unable to monitor where/when children are playing
- **Stranger Contact:** Organizers contacting minors directly via WhatsApp/Facebook

---

## PROFILE HIERARCHY & AGE RESTRICTIONS

### Minor Definition
- **Under 16:** Requires Guardian profile link (mandatory, hard-blocked)
- **16-18:** Optional Guardian link (recommended, not enforced)
- **18+:** No Guardian requirements

### Profile Type Age Gates

| Profile Type | Minimum Age | Guardian Required | Notes |
|--------------|-------------|-------------------|-------|
| **Browser** | None | No | Read-only access; no personal data collected |
| **User** | 13 | Yes (if <16) | Basic registration; limited activity joining |
| **Player** | 13 | Yes (if <16) | Competitive matches; health data collected |
| **Mentor** | 18 | No | Must be adult to guide minors |
| **Guardian** | 18 | No | Must be legal adult in Botswana |
| **Creator** | 16 | No (if 16-17) | Can organize youth events with parental notification |
| **Student** | 5 | Yes | School-linked sub-profile; always requires Guardian |

**Hard Rule:** Any User/Player under 16 attempting to register without Guardian link receives:
- "You're under 16! Ask your parent/guardian to create a Guardian profile and approve your account."
- Registration blocked until Guardian completes handshake

---

## THE THREE-WAY HANDSHAKE SYSTEM

### Overview
The **Guardian-School-Mizano Handshake** is a digital verification workflow ensuring three independent parties confirm a minor's identity, safety permissions, and activity eligibility before participation.

### Handshake Flow

#### **Phase 1: Guardian Initiates**
1. Guardian creates Guardian profile (requires +267 phone number, national ID optional for verification)
2. Guardian taps "Add Minor" in dashboard
3. Form captures:
   - Minor's full name
   - Date of birth (auto-calculates age)
   - School name (dropdown of registered Educational Institutions)
   - Health notes (allergies, conditions, emergency contact)
   - Activity restrictions (e.g., "No contact sports")
4. Guardian submits → Creates **Pending Minor Profile** (status: "Awaiting School Verification")

#### **Phase 2: School Verifies**
1. School receives notification: "Guardian [Name] has registered [Child] as your student. Confirm?"
2. School Admin/Teacher reviews:
   - Matches student to enrollment database (Class, Grade, Student ID)
   - Links to existing Student sub-profile (if bulk-uploaded earlier)
   - Adds school-specific data: House Color, Academic Standing, Teacher Lead
3. School taps "Verify" → Profile status changes to "School-Verified, Awaiting Guardian Approval"

**If School Rejects:**
- Guardian receives notification: "School could not verify [Child]. Contact [School WhatsApp] for assistance."
- Profile remains in Pending state (cannot join activities)

#### **Phase 3: Guardian Final Approval**
1. Guardian receives notification: "School verified [Child]! Review profile and approve to activate."
2. Guardian reviews combined data (school + health info)
3. Guardian taps "Approve & Activate"
4. System generates:
   - **Player Profile** (if Guardian selected "Competitive Activities")
   - **User Profile** (if Guardian selected "Non-Competitive Only")
   - **Security Log** (audit trail initialized)
5. Status: **Active (Guardian-Approved, School-Verified)**

### Alternative Flow: School-Initiated (Bulk Upload)

**Used When:** Schools register students en masse at term start

1. School bulk-uploads CSV with columns: Student Name, DOB, Grade, Guardian Phone (+267...)
2. System auto-generates Pending Student profiles
3. Guardian receives SMS: "Your child [Name] was registered by [School] on Mizano. Tap link to approve: [Short URL]"
4. Guardian clicks → Redirected to Mizano app/web
5. Guardian reviews pre-filled profile, adds health notes, taps "Approve"
6. Handshake complete

**If Guardian Ignores SMS (7 Days):**
- Follow-up SMS on Day 3, Day 7
- School notified: "Guardian [Name] has not approved [Child]'s profile. Contact directly."
- Profile remains inactive until approved

### Handshake States & Visual Indicators

| State | Badge Color | Guardian View | Child View | Activity Access |
|-------|-------------|---------------|------------|-----------------|
| **Pending** | Yellow | "Complete registration" | "Ask parent to approve" | Blocked |
| **School-Verified** | Orange | "Tap to approve" | "Waiting for parent" | Blocked |
| **Active** | Green | "Manage activities" | "Join matches" | Enabled |
| **Suspended** | Red | "Profile paused (Academic Alert)" | "Contact parent" | Blocked |
| **Archived** | Gray | "Reactivate for new term" | Hidden | Blocked |

---

## GUARDIAN DASHBOARD

### Access Point
- Settings → "Guardian Dashboard" (visible only to Guardian profiles)
- Persistent notification badge shows pending approvals

### Dashboard Sections (All Collapsible +/-)

#### **1. My Linked Minors**
- List of all children with status badges (Active, Pending, Suspended)
- Tap child → Opens detailed management view

#### **2. Pending Approvals**
- Activity join requests (e.g., "Saturday Soccer in Block 3")
- School event invitations (e.g., "Inter-House Rugby")
- Profile update requests (e.g., "Child wants to add new sport: Chess")
- One-tap "Approve" or "Deny" buttons

#### **3. Activity Monitor**
- **Upcoming Activities:** Next 7 days of approved matches/events
  - Shows: Date, time, location (offline map link), organizer contact (WhatsApp)
  - Status: "Confirmed" (child RSVPed), "Pending" (awaiting your approval)
- **Live Tracker (Active Now):** When child checks into match
  - Notification: "[Child] checked in to Soccer at Game Cube, Block 3"
  - Optional: "View Live Stream" (Facebook link if available)
- **Past Activities:** Last 30 days, with injury/incident reports if any

#### **4. Health & Safety Log**
- Injury reports from Creators/Staff (auto-pushed)
- Equipment borrowed (with return status)
- First-aid incidents (e.g., "Minor scrape, bandaged on-site")
- Health notes editable by Guardian

#### **5. Academic Alert Controls**
- **AcademicAlert Toggle** (Column AR in schema):
  - **ON:** Child's Player profile shows "Activity Paused" badge; cannot join matches
  - **OFF:** Normal activity access
- **Purpose:** If school reports low grades, Guardian activates to prioritize studies
- **Notification:** Child receives: "Your Guardian has paused activities. Focus on your studies!"

#### **6. Security Log (Transparency Report)**
- **Every Profile View Logged:**
  - Lists who viewed child's profile (Creators, Associations, Schools, Businesses)
  - Shows: Name, Profile Type, Date/Time, Purpose (e.g., "Scouting for U15 Team")
- **Scout Alerts:**
  - If Association/Business views profile, Guardian receives push: "[BFA Scout] viewed [Child]'s profile. View details?"
- **Purpose:** Prevents secret recruitment; builds trust

#### **7. Communication Hub**
- **WhatsApp Group Access:** Links to Team/School WhatsApp groups child is part of
- **Direct Organizer Contact:** Pre-filled wa.me links for each activity's organizer
- **School Broadcast Channel:** If school uses Teacher-Led Channels

#### **8. Profile Management**
- Edit health notes, allergies, emergency contacts
- Update activity restrictions (e.g., "Remove 'No contact sports' now that asthma is controlled")
- Change linked school (if child transfers)
- **Unlink Child:** Removes Guardian access (requires child to be 16+ or have new Guardian assigned)

---

## ACTIVITY APPROVAL WORKFLOW

### Non-Competitive Activities (User Profile)
**Examples:** Leisure hikes, hobby chess clubs, community picnics

1. Child browses Sports/Hobbies panels, taps "Join" on activity card
2. System checks: Is Guardian-linked? Is profile Active?
3. If YES → Auto-approved (low-risk)
4. Guardian receives **post-notification:** "[Child] joined [Activity]. Details: [Link]"
5. Guardian can retroactively "Remove" child via dashboard

### Competitive Activities (Player Profile)
**Examples:** Inter-school soccer, BFA-sanctioned tournaments

1. Child taps "Join" → System blocks with message: "This match requires Guardian approval. Request sent!"
2. Guardian receives **immediate push notification:** "[Child] wants to join [Activity]. Approve?"
3. Guardian taps notification → Opens approval screen showing:
   - Activity details (type, date, time, location, organizer)
   - Health check: "Last injury: [Date/Type]" (if any)
   - Equipment needed: "Bring soccer cleats, shin guards"
   - Safety notes: "First-aid available on-site"
4. Guardian taps "Approve" → Child receives: "You're in! Guardian approved."
5. Guardian taps "Deny" → Child receives: "Guardian did not approve this time. Try another activity!"

**If Guardian Ignores (24 Hours):**
- Reminder notification at 12 hours, 23 hours
- Activity auto-denies at 24 hours
- Child notified: "No response from Guardian. You were not added to the match."

### School-Organized Events (Automatic Approval Path)
**Examples:** PE class matches, inter-house competitions

1. School (Educational Institution) creates event via Teacher/Coach profile
2. System auto-adds all students in specified Class/Grade
3. Guardian receives **FYI notification:** "[School] added [Child] to [Event]. This is a school activity."
4. Guardian can "Opt Out" if concerned (rare), but default is approved (school = trusted authority)

---

## SAFETY FEATURES & ALERTS

### Real-Time Injury Alerts

#### **Trigger:** Creator/Staff logs injury during activity

1. Creator taps "Report Injury" on Activity Page roster
2. Quick form: Injury type (dropdown: minor scrape, sprain, head injury, other), description, first-aid given
3. Guardian receives **immediate push + SMS:**
   - "INJURY ALERT: [Child] had a [Type] at [Activity]. Status: [Description]. Contact: [Organizer WhatsApp]"
4. Logs in Guardian Dashboard → Health & Safety Log
5. If "Head Injury" selected → Auto-flags profile: "No activities for 7 days" (concussion protocol)

#### **Guardian Actions:**
- Tap "Contact Organizer" (launches WhatsApp)
- Tap "View Location" (opens offline map to Game Cube/venue)
- Tap "Remove from Future Activities" (pauses all joins for X days)

### Location Transparency

#### **Every Activity Shows:**
- Offline map tile (1MB Gaborone download) with venue pin
- Address text (e.g., "Game Cube, Block 3, Plot 1234")
- Organizer WhatsApp (pre-filled: "Where exactly is [Activity]?")

#### **Check-In Notifications:**
- When child arrives at venue (via Bluetooth sign-up or online RSVP), Guardian receives:
  - "[Child] checked in to [Activity] at [Time]. Expected end: [Time]."
- If child doesn't check out within 1 hour of expected end:
  - "Activity ended 1hr ago. [Child] hasn't checked out. Contact: [Organizer WhatsApp]"

### Stranger Danger Protections

#### **WhatsApp Proxy for Minors:**
- Child's Player profile does NOT show personal WhatsApp number
- "WhatsApp Player" button routes to **Guardian's phone** with pre-fill: "Hi, I'm organizing [Activity] and would like to invite [Child]. Is this OK?"
- Guardian responds directly, maintains control of communication

#### **Facebook Page Only (No Personal Profiles):**
- Minors cannot link personal Facebook profiles
- Only School/Team Facebook Pages allowed (verified by Mizano Staff)

#### **No Direct Messaging:**
- Mizano has zero in-app chat
- All external comms (WhatsApp/Facebook) logged for Guardian transparency

### Equipment Responsibility

#### **Borrow Score Impact:**
- If child borrows equipment (e.g., soccer ball), both child AND Guardian rate return condition
- **Dual-Rating System:** Prevents lying (child can't just give themselves 5 stars)
- Low Borrow Score (avg <3.0) → Guardian receives: "[Child]'s Borrow Score is low. Teach equipment responsibility!"
- System flags: "Restricted borrowing until score improves"

---

## ACADEMIC ALERT SYSTEM (Column AR)

### Purpose
Ensures "Bright Minds" priority: Academics before athletics

### How It Works

1. **School Initiates:**
   - Teacher/Admin flags student: "Academic performance low this term"
   - System sends notification to Guardian: "[School] recommends pausing activities for [Child]. Activate Academic Alert?"

2. **Guardian Activates:**
   - Guardian taps "Activate" in dashboard
   - Column AR (AcademicAlert) set to TRUE in backend
   - Child's Player profile shows: **"Activities Paused (Academic Focus)"**

3. **Effects:**
   - Child cannot join new competitive matches (blocked at "Join" button)
   - Non-competitive activities (User-level) still allowed (e.g., leisure chess)
   - Existing commitments (e.g., already-approved Saturday match) remain active (avoid embarrassment)

4. **Guardian Deactivates:**
   - When grades improve, Guardian taps "Deactivate Academic Alert"
   - Child receives: "Great job! Your Guardian lifted the pause. You can join matches again!"

**Privacy:** Schools see Academic Alert status but NOT the specific grades. Only Guardian + School Admin see full academic data.

---

## SCHOOL INTEGRATION & HANDSHAKE

### School Role in Safety

Educational Institutions act as **co-guardians** in the digital space:

1. **Bulk Student Upload:**
   - Schools submit CSV with: Name, DOB, Grade, Guardian Phone
   - System auto-generates Pending profiles, triggers Guardian SMS

2. **Verification Authority:**
   - Schools confirm child is enrolled (prevents fake profiles)
   - Add institutional data: House, Teacher Lead, National League ID

3. **Activity Oversight:**
   - Teacher/Coach creates school events (auto-adds students with Guardian notification)
   - School can "Flag" a student for Academic Alert (recommendation to Guardian)

4. **Communication Channels:**
   - WhatsApp Broadcast Channels (not groups) for class announcements
   - No peer-to-peer visibility of phone numbers (protects minors)

### Guardian-School Dispute Resolution

**Scenario:** School verifies child, but Guardian disagrees with activity permissions

1. Guardian taps "Dispute" in dashboard
2. Text form: "Why do you disagree?" (sent to School Admin)
3. School receives: "Guardian [Name] disputes [Child]'s profile. Reason: [Text]. Contact: [WhatsApp]"
4. School Admin contacts Guardian via WhatsApp (offline resolution)
5. Once resolved:
   - School updates profile (e.g., removes sport restriction)
   - Guardian re-approves
   - Handshake re-completed

**Mizano Role:** Neutral platform; does not mediate content disputes (School + Guardian resolve)

---

## SECURITY LOG & TRANSPARENCY

### What Gets Logged

**Every action involving a minor's profile is recorded:**

| Action | Logged Data | Visible To |
|--------|-------------|------------|
| Profile View | Viewer name, profile type, timestamp, purpose (if stated) | Guardian |
| Activity Join Request | Activity name, organizer, date, approval status | Guardian, School |
| Health Update | Editor (Guardian/School/Staff), field changed, old/new value | Guardian, School |
| Injury Report | Reporter (Creator/Staff), type, description, timestamp | Guardian, School |
| Scout View | Association name, scout name, timestamp | Guardian |
| Equipment Borrow | Item, borrow date, return date, condition rating | Guardian |
| Academic Alert Toggle | Activator (Guardian/School), reason, timestamp | Guardian, School |

### Guardian Access

- Settings → Guardian Dashboard → "Security Log"
- Filter by: Date range, action type, viewer type
- Export as text file (low-data; no PDF fees for security logs)

### Scout Transparency

**Problem:** Professional scouts secretly viewing youth profiles for recruitment

**Solution:**
1. When Association/Business views a minor's Player profile → Instant Guardian notification
2. Security Log entry: "[Botswana Football Association Scout] viewed [Child]'s profile at [Time]. Purpose: U15 Team Recruitment."
3. Guardian taps notification → Opens child's profile showing:
   - What data the scout saw (stats, school, achievements)
   - Scout contact: WhatsApp button (pre-fill: "Hi, I saw you viewed [Child]'s profile. Can we discuss?")
4. Guardian can "Block Future Views" (hides child from Association searches)

**Privacy Control:** Guardian can set profile to "Private" (only School + approved Creators see)

---

## COMMUNICATION PROTOCOLS

### WhatsApp Integration (Guardian-Specific)

#### **For Minors Under 16:**
- "WhatsApp Player" button on child's profile → Routes to Guardian's +267 number
- Pre-fill message: "Hi! I'm organizing [Activity] via Mizano. Can [Child] join? Details: [Short URL to Activity Page]"
- Guardian responds directly in WhatsApp (keeps conversation off-platform for data efficiency)

#### **Team/School Groups:**
- When child approved for team/school event → Guardian receives: "Join [Team] WhatsApp Group: [Invite URL]"
- Guardian added (not child) if child <13 (COPPA-style protection)
- Child added directly if 13-16 (with Guardian notification)

#### **Broadcast Channels (Schools):**
- Schools use WhatsApp Channels (one-way announcements) instead of groups
- No peer visibility of numbers
- Guardian subscribes on behalf of child

### Facebook Integration (Guardian-Specific)

#### **Live Streams:**
- When activity enters "Active Now" → Guardian receives: "[Child] is playing in [Activity]. Watch live: [Facebook Link]"
- Links prioritize Facebook Live (zero-rated data for most Botswana users)

#### **Event Mirroring:**
- School/Creator shares event to Facebook → Link back to Mizano
- Guardian clicks → Can approve join via Mizano app/web

#### **Business Pages Only:**
- Minors cannot link personal Facebook profiles
- Only verified School/Team pages (checked by Mizano Staff)

---

## OFFLINE-FIRST SAFETY FEATURES

### Bluetooth Check-In (Game Cubes)

**Scenario:** Child arrives at Game Cube (offline due to no data)

1. Child's phone has Mizano app open (offline mode)
2. Game Cube Staff device broadcasts Bluetooth signal: "Block 3 Game Cube"
3. Child taps "Check In via Bluetooth"
4. Saves locally: "[Child] checked in at [Timestamp]"
5. When Staff device syncs (every 15 minutes when online):
   - Sends check-in to backend
   - Guardian receives: "[Child] checked in at Game Cube, Block 3"

**Safety Benefit:** Even without data, Guardian is notified once sync happens

### Offline Roster Syncing

**Scenario:** Guardian approves join while offline

1. Guardian taps "Approve" in dashboard (no signal)
2. Saves locally: "Approval queued for sync"
3. When phone gets signal → Auto-syncs
4. Child receives delayed notification: "Guardian approved! You're in."
5. Activity Page roster updates within 15 minutes (next sync cycle)

**Safety Benefit:** Approvals don't require immediate connectivity; system catches up

### Manual Sync Button (Settings)

- Settings → Data & Offline Sync → "Sync Now"
- Guardian can force immediate push/pull when signal available
- Syncs: Approvals, injury reports, security log updates

---

## PROFILE TRANSITIONS & AGE MILESTONES

### Turning 16: Guardian-Optional Transition

**When Child's 16th Birthday Detected (DOB in system):**

1. System auto-sends notification to BOTH Guardian and child:
   - Guardian: "[Child] turned 16. They can now manage their profile independently. Keep oversight?"
   - Child: "You're 16! You can now manage your profile. Your Guardian can still monitor if you choose."

2. Guardian presented with options:
   - **"Maintain Full Control"** (Guardian dashboard remains active; child cannot override approvals)
   - **"Shared Control"** (Child can join activities, but Guardian receives FYI notifications)
   - **"Transfer to Child"** (Guardian unlinks; child manages solo)

3. Default if Guardian doesn't respond in 30 days: **Shared Control**

### Turning 18: Automatic Guardian Unlink

**When Child's 18th Birthday Detected:**

1. System auto-unlinks Guardian (no longer minor legally)
2. Guardian receives: "[Child] turned 18. Mizano access transferred to them. Your Guardian dashboard for [Child] is now archived."
3. Child receives: "You're 18! Full profile control is yours. Thanks for letting your Guardian keep you safe."
4. Security Log archived (Guardian can export for records)

**Special Case:** Guardian can "Re-Link" if child (now 18) requests (e.g., parent still paying for sports fees)

---

## EMERGENCY PROTOCOLS

### Critical Injury (Head/Severe)

**Trigger:** Creator/Staff logs injury with "Severe" or "Head Injury" flag

1. **Immediate Multi-Channel Alert:**
   - Push notification (Guardian)
   - SMS (Guardian's +267 number)
   - WhatsApp message (via Mizano Staff intervention)
   - Email (if provided)

2. **Alert Content:**
   - "EMERGENCY: [Child] had a [severe injury] at [Activity]. First-aid: [Yes/No]. Ambulance: [Called/Not Called]. Contact NOW: [Organizer WhatsApp] or [Staff WhatsApp]."

3. **Auto-Actions:**
   - Child's profile flagged: "No activities for 14 days (Medical Review Required)"
   - All pending activity joins auto-cancelled
   - Guardian receives follow-up: "Please upload medical clearance to reactivate profile"

4. **Medical Clearance Upload:**
   - Guardian dashboard → "Upload Doctor's Note" (photo of signed note)
   - Mizano Staff reviews (within 24 hours)
   - If approved → "No activities" flag removed
   - If denied → Guardian receives: "Clearance not sufficient. Please re-submit or contact [WhatsApp]."

### Missing Child (No Check-Out)

**Trigger:** Activity marked "Ended" but child never checked out

1. **1-Hour Grace Period:** No alert (account for delays, bathroom, etc.)
2. **After 1 Hour:**
   - Guardian receives: "[Child] has not checked out from [Activity]. Expected end was [Time]. Contact: [Organizer WhatsApp]."
3. **After 2 Hours:**
   - Second alert: "Still no check-out. Last seen: [Venue]. Organizer: [WhatsApp]. Police? [Emergency Number]."
4. **Guardian Actions:**
   - Tap "I Found Them" (clears alert)
   - Tap "Contact Organizer" (WhatsApp)
   - Tap "Report Missing" (triggers Mizano Staff escalation + Police guidance)

**Prevention:** Bluetooth auto-check-out when child leaves Game Cube geofence (if phone has GPS/Bluetooth on)

### Profile Compromise (Unauthorized Access)

**Scenario:** Guardian suspects someone else accessed child's profile

1. Guardian dashboard → "Security" → "Lock Profile"
2. Immediate effects:
   - Child's profile marked "Suspended (Security Review)"
   - All activity access blocked
   - Notifications sent to: School, recent Creators, Mizano Staff
3. Mizano Staff contacts Guardian via WhatsApp (within 4 hours):
   - Verify identity (+267 number confirmation)
   - Review Security Log for suspicious activity
   - Reset passwords/access if needed
4. Once resolved:
   - Guardian taps "Unlock Profile"
   - Child receives: "Your profile was locked for security. It's safe now."

---

## MONETIZATION & GUARDIAN FEATURES

### All Guardian Features: FREE (Forever)

**Mizano Commitment:** Child safety is NEVER behind a paywall.

Guardian profiles, dashboards, approvals, Security Logs, notifications, and health tracking are **100% free** in villages AND cities.

### Optional Paid Add-Ons (Guardian Choice)

1. **Premium Health Export (P10):**
   - Export child's "Mizano Health & Stats History" as branded PDF
   - Used for school applications, club tryouts, scholarship forms
   - Includes: Injury history, fitness levels, achievements, certifications

2. **Extended Security Log (P5/year):**
   - Default: Last 90 days of Security Log
   - Premium: Full lifetime log since profile creation
   - For Guardians of scouted athletes (BFA, recruitment-heavy)

**No Other Charges:** Approvals, notifications, WhatsApp routing = always free

---

## LEGAL & COMPLIANCE

### Data Privacy (Botswana Context)

**Botswana has limited data protection laws, but Mizano over-complies:**

1. **Guardian Data Ownership:**
   - Guardian owns ALL data related to their minor
   - Can export, delete, or transfer at any time
   - Mizano Staff cannot view without Guardian permission (except safety emergencies)

2. **School Data Separation:**
   - Academic data (grades, attendance) = School-only visibility
   - Sports data (stats, achievements) = Public (if Guardian approves)
   - Health data (allergies, injuries) = Guardian + School-only

3. **Third-Party Sharing:**
   - Mizano NEVER sells minor data
   - Recruitment queries (Associations) = aggregate only (e.g., "10 U15 strikers in Gaborone")
   - Individual profiles require Guardian consent + Security Log entry

### COPPA-Style Protections (Age 13+)

**Even though Botswana isn't bound by US COPPA, Mizano follows it:**

1. **Under 13:**
   - Cannot create account even with Guardian
   - Profile created BY Guardian (not child)
   - Guardian holds login credentials

2. **13-15:**
   - Can create account WITH Guardian approval
   - Guardian must complete handshake before activation

3. **16-17:**
   - Can create account solo
   - Guardian link optional but recommended

### Terms of Service (Guardian-Specific Clauses)

**From Mizano Terms:**

- **Section 4.2:** "Guardians are responsible for monitoring their minor's activities. Mizano provides tools but cannot guarantee supervision."
- **Section 4.3:** "Mizano logs profile views and joins for transparency but is not liable for unauthorized contact outside the platform (e.g., direct WhatsApp messages)."
- **Section 4.4:** "Guardians must provide accurate health information. Failure to disclose allergies/conditions may result in profile suspension."

**Guardian Acknowledgment:** Required checkbox at handshake completion: "I understand I am responsible for my child's safety on and off Mizano."

---

## TECHNICAL IMPLEMENTATION

### Backend Schema (Guardian-Specific Columns)

**Master Data Sheet - Guardian Safety Columns:**

| Column | Name | Type | Description |
|--------|------|------|-------------|
| AW | GuardianID | String | Unique ID for Guardian profile (e.g., "GUARD-GAB-0001") |
| AX | LinkedMinors | Array | List of minor ProfileIDs this Guardian oversees |
| AY | ApprovalStatus | Enum | Handshake state: Pending, School-Verified, Active, Suspended, Archived |
| AZ | AcademicAlert | Boolean | TRUE = activities paused for grades; FALSE = normal access |
| BA | SecurityLogEnabled | Boolean | TRUE = logs all profile views; FALSE = disabled (never for minors) |
| BB | LastApprovalTimestamp | DateTime | Most recent activity approval (for sync tracking) |
| BC | EmergencyContact | String | Guardian's +267 WhatsApp for injury alerts |
| BD | HealthNotes | Text | Allergies, conditions, restrictions (Guardian-editable) |
| BE | ProfileViewLog | Array | JSON of profile views: {viewerID, timestamp, purpose} |
| BF | InjuryLog | Array | JSON of injuries: {activityID, type, description, timestamp} |

### Sync Logic (Offline-First)

**Guardian Approval Sync (Every 15 Minutes):**

1. Guardian taps "Approve" (offline)
2. Saves locally: `{minorID: "PLAY-001", activityID: "ACT-GAB-123", approval: true, timestamp: "2026-02-11T14:00:00Z"}`
3. When phone gets signal (15-min interval):
   - POST to backend: `/api/guardian/sync-approvals`
   - Backend updates activity roster
   - Child's profile status changes to "Approved"
   - Creator receives notification: "[Child] was approved by Guardian. Roster updated."

**Conflict Resolution:**
- If Guardian approves offline BUT activity filled up while offline → Guardian receives: "Approval sent, but activity is now full. Added to waitlist?"

### Notification System

**Priority Levels:**

| Level | Trigger | Channels | Example |
|-------|---------|----------|---------|
| **Critical** | Severe injury, missing child | Push + SMS + WhatsApp | "EMERGENCY: [Child] injured" |
| **High** | Injury report, scout view | Push + In-app | "[BFA] viewed [Child]'s profile" |
| **Medium** | Activity approval request | Push | "[Child] wants to join [Activity]" |
| **Low** | Check-in, FYI notifications | In-app only | "[Child] checked in to Game Cube" |

**Delivery:**
- Push notifications use Firebase Cloud Messaging (FCM) for Android
- SMS via Botswana SMS gateway (e.g., Mascom API)
- WhatsApp via wa.me deep links (not API, to avoid costs)

### Security Log Indexing

**For Fast Queries:**

1. Every profile view writes to:
   - `SecurityLog` table (SQL): `viewerID, minorID, timestamp, purpose`
   - Indexed by `minorID` (Guardian dashboard loads fast)

2. Guardian taps "Security Log" → Query:
   ```sql
   SELECT * FROM SecurityLog 
   WHERE minorID = 'PLAY-001' 
   ORDER BY timestamp DESC 
   LIMIT 100;
   ```

3. Results displayed as collapsible list (+/- toggles):
   - Top level: Date
   - Sub: Time + Viewer + Purpose

---

## STAFF TRAINING (GAME CUBE OPERATIONS)

### Staff Role in Guardian Safety

**Mizano Staff (Column: Profile Type = Staff) at Game Cubes act as on-ground guardians:**

1. **Check-In Verification:**
   - When child checks in (Bluetooth or online), Staff verifies:
     - Is profile Active (Guardian-approved)?
     - Any health notes? (Check backend dashboard)
     - Any equipment borrowed? (Update ledger)

2. **Injury Response:**
   - Staff trained: "If child injured, LOG IMMEDIATELY via Staff app"
   - Steps:
     - Tap "Report Injury" on Staff dashboard
     - Select child from roster
     - Fill quick form (type, description, first-aid given)
     - Submit → Auto-sends Guardian alert

3. **Equipment Oversight:**
   - Staff manages check-in/check-out ledger (offline-capable)
   - Both child AND Staff rate condition (dual-rating for Borrow Score)
   - If child under 13 → Staff contacts Guardian before lending (WhatsApp)

4. **Dispute Mediation:**
   - If child claims "Guardian approved" but system shows Pending:
     - Staff calls Guardian (+267 from profile)
     - Confirms verbally
     - If approved → Staff overrides in app (logs action for audit)

**Staff Override Authority:**
- Staff can "Emergency Approve" a child's join if Guardian unreachable AND activity low-risk (e.g., casual chess)
- Logged in Security Log: "Staff [Name] override-approved [Child] at [Time]. Reason: [Text]"
- Guardian notified: "[Child] joined [Activity] via Staff override. Contact: [Staff WhatsApp]"

---

## ROADMAP & FUTURE ENHANCEMENTS

### Phase 1: MVP (Q1 2026) ✅
- Guardian profile creation
- Three-Way Handshake (Guardian-School-Mizano)
- Activity approval workflow
- Basic Security Log (profile views only)
- Injury alerts (push + SMS)

### Phase 2: Safety Expansion (Q2 2026)
- Academic Alert system
- Extended Security Log (export)
- Check-in/check-out tracking
- Bluetooth offline check-in
- Equipment Borrow Score integration

### Phase 3: Advanced Monitoring (Q3 2026)
- Live location tracking (optional GPS for Guardians)
- Video call integration (WhatsApp Video deep link for emergencies)
- Guardian-to-Guardian messaging (for carpooling, coordination)
- Behavioral analytics (e.g., "Your child joins 3x more activities than peers")

### Phase 4: National Scale (Q4 2026)
- Multi-Guardian support (divorced parents, grandparents)
- Transfer Guardian (custody changes)
- International Guardian (child in Botswana, Guardian abroad)
- Government reporting (aggregate anonymized safety data to Ministry of Youth & Sports)

---

## FAQS (GUARDIAN-SPECIFIC)

### Q1: What if I don't have a smartphone?
**A:** Guardians can manage profiles via web browser (desktop/laptop). SMS notifications still work. Contact Mizano Staff at Game Cubes for assistance.

### Q2: Can I have multiple children linked?
**A:** Yes. One Guardian profile can manage unlimited minors. Each child has separate approval queues.

### Q3: What if my child's school isn't on Mizano?
**A:** Contact the school to register as an Educational Institution (free for government schools). Alternatively, create the minor profile without school verification (limited access; no school events).

### Q4: Can my child play without my approval?
**A:** No. If child is under 16, ALL competitive activities require explicit Guardian approval. Non-competitive (leisure) activities auto-approve but send FYI notifications.

### Q5: What if I disagree with a scout viewing my child's profile?
**A:** Tap "Block Future Views" in Security Log. This hides your child from all Association/Business searches. Reversible anytime.

### Q6: How do I know if my child is safe at the Game Cube?
**A:** Check-in notifications, offline map showing location, direct WhatsApp to organizer, and Staff oversight. For extra assurance, attend matches (Spectator Check-In for you!).

### Q7: What if my phone dies during a match?
**A:** Your child's participation is already approved and logged. If emergency, Game Cube Staff have your backup contact info (from profile). Charge phone and sync when possible.

### Q8: Can I delete my child's profile?
**A:** Yes. Guardian Dashboard → [Child] → "Delete Profile." All data removed within 7 days (backup period for audit). Permanent and irreversible.

---

## CONCLUSION

Guardian Safety Protocols are the **ethical and technical backbone** of Mizano. By requiring three-way verification, logging every interaction, and giving parents ultimate control, we build a platform that Botswana families trust.

**Key Commitments:**
1. **No Guardian = No Activity** (hard-blocked for under-16)
2. **Transparency Over Secrecy** (Security Log shows everything)
3. **Free Forever** (safety never monetized)
4. **Offline-Ready** (approvals sync when signal returns)
5. **Community-First** (Schools, Staff, Guardians work together)

**Next Steps:**
1. Finalize Guardian Dashboard UI wireframes
2. Implement Three-Way Handshake backend logic
3. Pilot with 50 Guardian-Minor pairs in Gaborone
4. Train Game Cube Staff on injury reporting
5. Launch Safety Protocols FAQ in app (Settings → About & Legal)

**Vision Statement:**
*"Every child in Botswana deserves to play safely. Mizano gives Guardians the tools to make that happen—online and offline, in villages and cities, from schoolyard to national stage."*

---

**Document Owner:** Mizano Safety & Compliance Team  
**Last Updated:** February 11, 2026  
**Version:** 1.0  
**Status:** Foundation Document (For Internal, Guardian, School, and Staff Use)  
**Contact:** safety@mizano.co.bw | WhatsApp: +267-XXX-XXXX
