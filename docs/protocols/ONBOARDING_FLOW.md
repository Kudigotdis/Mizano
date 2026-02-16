# MIZANO ONBOARDING FLOW
**Version 1.5 | February 15, 2026**

---

## EXECUTIVE SUMMARY

The Mizano onboarding experience is designed to be **fast, data-light, and context-aware**. Following Botswana's digital reality—where users have limited general data but unlimited WhatsApp/Facebook bundles—we prioritize progressive disclosure over heavy upfront forms. Users can explore as **Browsers** first, then upgrade through simple, targeted flows based on their needs (Player, Guardian, Creator, etc.).

**Core Philosophy:**
- **"Browse First, Register When Ready"**: No forced sign-ups to see what Mizano offers
- **Incremental Commitment**: Start with basic User profile, upgrade to Player/Mentor/Guardian as needed
- **Offline-Ready from Day 1**: Download 1MB map tiles and cache during first session
- **WhatsApp/Facebook-First**: Leverage existing accounts for trust and zero-data verification

**Average Onboarding Time:**
- Browser exploration: 0 minutes (instant)
- User registration: 2-3 minutes
- Player upgrade: 3-5 minutes (health/stats form)
- Guardian setup: 5-7 minutes (minor linking + approvals)
- Educational Institution: 15-20 minutes (bulk student uploads)

---

## ONBOARDING PRINCIPLES

### 1. Progressive Disclosure
**No Information Overload**

- Show only essential fields per step
- Use +/- toggles to hide advanced options
- "Why we ask this" tooltips for sensitive data (health info, school details)
- Skip non-critical fields with "Complete Later" option

### 2. Data Efficiency
**Respect Botswana Bundle Realities**

- Text-heavy forms (no image backgrounds)
- WebP profile photos optional (defaults to vector icon)
- Offline caching: Forms save locally if user loses signal mid-registration
- Manual sync option: "Tap to complete when you have Wi-Fi"

### 3. Trust Signals
**Leverage Familiar Platforms**

- WhatsApp number verification (via wa.me OTP link)
- Facebook account linking (optional but recommended for Business/Association)
- Government school verification (automatic village waiver eligibility)
- Guardian dashboard preview before committing

### 4. Safety-First for Minors
**Three-Way Handshake Enforced**

- Under-16 profiles require Guardian email/phone before proceeding
- School bulk uploads trigger automatic Guardian notifications
- No minor activity participation until Guardian approval logged
- Security Log initialized at profile creation (tracks all views)

---

## ONBOARDING JOURNEY MAP

### Entry Points

Users can enter Mizano through multiple paths:

1. **Direct App Download** (Google Play/direct APK)
   - Lands on Homepage as Browser
   - Persistent "Sign Up" button in top-right notification area

2. **Facebook Event Link** (Zero-Rated Data)
   - Clicks shared Mizano activity link on FB
   - Opens teaser Activity Page (Browser view)
   - "Join this match? Sign up for free" prompt

3. **WhatsApp Deep Link** (From Friend Invite)
   - Friend sends wa.me link: "Join me on Mizano for Block 3 soccer!"
   - Opens app (or Play Store if not installed)
   - Pre-fills referrer info for community tracking

4. **School Invitation** (Bulk Upload)
   - School Admin adds student to system
   - Guardian receives SMS: "Your child has been registered on Mizano. Tap to approve."
   - Opens Guardian onboarding flow

5. **Game Cube QR Code** (Physical Hub)
   - Staff posts QR code at community center
   - Scans → Downloads offline map tiles + core data
   - Prompted to register for equipment borrowing

---

## PROFILE-SPECIFIC ONBOARDING FLOWS

### FLOW 1: BROWSER (Default Entry State)
**Duration: 0 minutes | Data Cost: <500KB**

**Capabilities on Entry:**
- Swipe through all 15 homepage panels (Sports, Hobbies, Leisure, etc.)
- View Dynamic Activity Cards (color-coded states visible)
- See Business/Venue/Institution listings
- Browse Archive Library (Facebook gallery links)

**Restrictions:**
- Cannot tap Activity Cards for full details ("Sign in to view more" overlay)
- No joining matches or favoriting
- No Bulletin Feed posting
- No equipment borrowing

**Persistent UI Elements:**
- Bottom-left: Three-stripe menu, search icon, "+" button (grayed out)
- Top-right: Notification bell (shows "0" with "Sign up to enable" tooltip)
- Floating "Sign Up" button (cherry orange) appears after 30 seconds of browsing

**Triggers to Upgrade:**
1. **Tap any Activity Card** → "Create free account to join matches in Block 3"
2. **Tap "+" button** → "Sign up to organize your own events"
3. **Pull down panel selector** → "Register to customize your homepage"
4. **Search with filters** → "Save favorites? Create an account"

**Exit Points:**
- Tap "Sign Up" → Proceeds to User Registration (Flow 2)
- Close app → Returns as Browser next session (no data saved)

---

### FLOW 2: USER REGISTRATION (Base Account)
**Duration: 2-3 minutes | Data Cost: <1MB | Offline: Saves locally, syncs later**

**Entry Screen:**
White background, Mizano logo (vector, <50KB), centered form

**Step 1: Identity Basics**
(All fields in single scrollable view with +/- toggle for optional sections)

**Required Fields:**
- Full Name (Text input, 50 char max)
- WhatsApp Number (International format: +267... | Auto-detects Botswana)
- Date of Birth (Calendar picker | Validates age for Guardian requirement)
- Gender (Dropdown: Male, Female, Other, Prefer not to say)

**Optional Fields (Collapsed by default):**
- Email (For password recovery only—not required due to WhatsApp primacy)
- Profile Photo (WebP upload, <200KB | Shows "Skip—use default icon" button)

**Smart Validations:**
- If DOB shows user is under 16 → Auto-expands "Guardian Information" section below
- WhatsApp number checked against existing database (prevents duplicate accounts)

**Step 2: Location Setup**
(Sets default for Super Search filters)

- **Village/Town/City** (Dropdown: Gaborone, Francistown, Molepolole, etc.)
- **Area/Neighbourhood** (Dynamic dropdown based on above—e.g., Block 3, Broadhurst)
- Toggle: "Auto-detect location when online" (Uses GPS sparingly)

**Step 3: First-Time Education**
(Progressive disclosure—appears only if user toggles "+")

**"Why Location Matters" (+/- Toggle):**
> "Mizano shows you activities near you first. Village users get all features free. You can change this anytime in Settings."

**"Your Data is Safe" (+/- Toggle):**
> "We store your info offline on your phone. It syncs every 15 minutes when you have signal. Your Guardian (if you're under 16) can see your activity history."

**Step 4: WhatsApp Verification**
- Tap "Send Verification Code" → Opens wa.me link with pre-filled message:
  > "Hi Mizano! This is [Name] verifying my account."
- Mizano Staff number replies with 6-digit code
- User returns to app, enters code in text field
- **Offline Fallback:** "No signal? Complete verification later in Settings."

**Step 5: Guardian Requirement (If Under 16)**
**Hard Block: Cannot proceed without Guardian contact**

**"You're Under 16—Let's Get Your Guardian Involved" Screen:**

- Guardian's Full Name (Text input)
- Guardian's WhatsApp Number (International format, +267...)
- Relationship (Dropdown: Parent, Grandparent, Legal Guardian, School-Assigned)

**Automated Actions:**
1. Sends WhatsApp message to Guardian:
   > "Hello! [Child Name] has signed up for Mizano. Please approve their profile to keep them safe: [Link]"
2. Creates pending Guardian profile (pre-fills child's name)
3. Logs handshake initiation in Security Log

**Child's Account Status:**
- Profile created but **"Pending Guardian Approval"** badge
- Can browse as User but cannot join any activities
- Notification: "Your Guardian will receive a message. Remind them to approve!"

**Step 6: Welcome & Customization**
**"Welcome to Mizano!" Screen**

- Shows 3 quick tips (text-only carousel):
  1. "Swipe left/right on the Homepage to explore Sports, Hobbies, and more."
  2. "Tap the search icon to find soccer in Block 3 right now."
  3. "Download the 1MB offline map so you can find Game Cubes without data."

- **Action Buttons:**
  - "Download Offline Map" (Triggers 1MB download of Gaborone tiles)
  - "Explore Sports" (Navigates to Sports panel)
  - "Skip Tour" (Dismisses, lands on Homepage)

**Step 7: Profile Complete—Now What?**

- Lands on **Mine Panel** (Shows profile summary)
- Persistent prompt at top: "Upgrade to Player to join competitive matches" (Dismissible)
- Gold star icon next to Favorites section (empty state: "Tap the star on any activity to save it here")

**User Profile Unlocked Features:**
- Full swipe panel access
- Tap Activity Cards for details
- Favorite activities (gold star)
- Post in Bulletin Feed (text-only)
- Spectator check-ins
- Lost & Found browsing (no Boost without payment setup)
- Sponsor-a-Game contributions (if payment method added)

**User Profile Restrictions:**
- No competitive match joining (needs Player upgrade)
- No equipment borrowing (needs Player Borrow Score)
- No event creation (needs Creator upgrade)
- No mentorship listings (needs Mentor upgrade)

---

### FLOW 3: PLAYER UPGRADE (From User)
**Duration: 3-5 minutes | Data Cost: <500KB | Triggers: "Join Competitive Match" or "Borrow Equipment"**

**Entry Point:**
- User taps "Join" on competitive activity → Prompt:
  > "This is a competitive match. Upgrade to Player to participate (free)."
- User taps "Borrow Equipment" at Game Cube → Prompt:
  > "Create your Player profile to track your Borrow Score (free)."

**Upgrade Screen:**
White background, "Become a Player" header

**Step 1: Activity Preferences**
(Helps with call-out targeting)

**"What Activities Do You Play?" (Multi-select checkboxes):**
- Soccer, Netball, Volleyball, Chess, Athletics, Swimming, Other (text input)

**Skill Levels (Per activity selected):**
- Beginner, Intermediate, Advanced, Competitive

**Step 2: Health & Safety Information**
**"Why We Ask This" Tooltip:**
> "This helps organizers plan for first-aid needs. Only you, your Guardian (if under 16), and event Staff see this."

**Required Fields:**
- Blood Type (Dropdown: O+, A+, B+, AB+, O-, A-, B-, AB-, Unknown)
- Known Allergies (Text area, 200 char max—e.g., "Bee stings, peanuts")
- Emergency Contact (Text input: Name + Phone)

**Optional Fields (+/- Toggle):**
- Existing Injuries (Text area—e.g., "Recovering from knee surgery")
- Medications (Text area—e.g., "Asthma inhaler")
- Doctor's Note (Photo upload, WebP <500KB—for chronic conditions)

**Step 3: School & Educational Info (Optional)**
**"Bright Minds First" Toggle (+/-):**
> "Linking your school helps scouts find you. Your grades stay private—only your Guardian and school see them."

**Fields (If expanded):**
- School Name (Dropdown—pre-populated from Educational Institution database)
- Grade/Year (Dropdown: Grade 1-12, Form 1-5, University)
- School ID Number (Text input—for verification)

**Auto-Generated Actions:**
- If school is in database → Sends notification to school Admin:
  > "[Student Name] has linked their Mizano profile. Approve in your dashboard."
- If school not found → Prompts:
  > "Ask your teacher to register your school on Mizano for free!"

**Step 4: Fitness & Achievements (Optional)**
**"Build Your Sports CV" Toggle (+/-):**

**Fitness Levels (Self-reported sliders):**
- Stamina: 1-10
- Speed: 1-10
- Strength: 1-10
- Flexibility: 1-10

**Achievements (Text area, 500 char):**
- Example: "U13 District Soccer Champion 2025, Inter-House Relay Gold Medal"

**Certifications (Photo uploads, 3 max):**
- Example: First Aid Certificate, Coaching Badge

**Step 5: Borrow Score Initialization**

**"Your Equipment Responsibility Tracker":**
> "When you borrow items at Game Cubes, both you and the Staff rate each other (1-5 stars). High scores unlock premium equipment."

- Starting Borrow Score: **5.0 / 5.0** (Perfect baseline)
- Displays: "Earn your first rating by borrowing and returning on time!"

**Step 6: Player Profile Complete**

- Badge animation: "You're now a Player!" (Vector graphic, <20KB)
- Notification: "You can now join competitive matches and borrow equipment."
- **Auto-redirect:** Returns to activity user tried to join → "Join" button now active

**Player Profile Unlocked Features:**
- Join competitive matches (with Guardian approval if under 16)
- Equipment borrowing with Borrow Score tracking
- Dual-rating submissions (rate lenders/borrowers)
- Targeted for call-outs (e.g., "Block 3 needs a Goalie!")
- Health logs visible to event organizers (privacy-protected)
- Sports CV auto-generation (stats aggregate from matches)

---

### FLOW 4: GUARDIAN SETUP (From Notification or Direct Signup)
**Duration: 5-7 minutes | Data Cost: <1MB | Critical for Under-16 Safety**

**Entry Points:**
1. **WhatsApp Notification:** Receives message from minor's signup → Taps link
2. **Direct Registration:** Parent proactively creates account to monitor child
3. **School Invitation:** School Admin adds student → Guardian receives SMS

**Guardian Welcome Screen:**
White background, shield icon (vector, <30KB)

> "Welcome, Guardian. Mizano helps you keep your child safe while they explore sports and activities in your community."

**Step 1: Guardian Identity**

**Required Fields:**
- Full Name
- WhatsApp Number (International format)
- Relationship to Minor (Dropdown: Parent, Grandparent, Legal Guardian, Teacher-Appointed)
- Date of Birth (To verify adult status—must be 18+)

**Step 2: Minor Profile Linking**

**Scenario A: Responding to Minor's Signup**
(Pre-filled with child's info from initial notification)

- Shows child's name, age, photo (if uploaded)
- "Approve [Child Name]'s Profile?" (Yes/No buttons)
- If **Yes** → Proceeds to Step 3
- If **No** → "Why not?" (Text area for feedback) → Notifies Mizano Staff for review

**Scenario B: Creating Minor Profile from Scratch**

**"Add Your Child" Form:**
- Child's Full Name
- Date of Birth (Must be under 16)
- Gender
- WhatsApp Number (Optional—if child has own phone)
- Profile Photo (WebP, <200KB, optional)

**Auto-Generated Actions:**
- Creates pending minor User profile (with "Guardian-Managed" badge)
- Triggers Player Upgrade form (Guardian fills on child's behalf)

**Step 3: Guardian Dashboard Preview**

**"Here's What You Can Do" (Interactive demo with placeholder data):**

**Three Panels (Swipeable):**

1. **Monitor Activities:**
   - Shows mock list: "Soccer practice - Saturday 3 PM - Block 3"
   - "Approve or decline join requests with one tap."

2. **Health & Safety:**
   - Shows mock injury alert: "Minor scrape reported at volleyball match"
   - "Get instant notifications if your child is hurt."

3. **Academic Oversight:**
   - Shows mock toggle: "AcademicAlert: Pause match joins if grades drop"
   - "Prioritize school performance with 'Bright Minds First.'"

**Action Button:**
- "Got It—Set Up My Dashboard" → Proceeds to Step 4

**Step 4: Dashboard Configuration**

**"Guardian Controls" Settings:**

**1. Approval Requirements (+/- Toggle):**
- Auto-approve non-competitive activities? (Default: OFF—requires manual approval)
- Auto-approve competitive matches? (Default: OFF)
- Auto-approve equipment borrowing? (Default: ON—with Borrow Score threshold 3.5+)

**2. Notification Preferences:**
- Injury Alerts: WhatsApp (ON), SMS (OFF), Email (OFF)
- Join Requests: WhatsApp (ON)
- Weekly Activity Summary: WhatsApp (ON, Sundays 6 PM)

**3. AcademicAlert Setup (If child has school linked):**
- "Pause match joins if grades are below:" (Dropdown: 70%, 60%, 50%, OFF)
- Requires school to enable grade-sharing API

**4. Security Log:**
- "Every time a Creator, Association, or School views your child's profile, you'll see it here."
- Shows empty state: "No views yet. Check back after your child joins activities."

**Step 5: Guardian-School Handshake (If Applicable)**

**Scenario: Child's school already registered on Mizano**

- "Your child attends [School Name]. Connect with them for seamless coordination."
- **Action Button:** "Send Link Request to School"
  - Sends notification to school Admin: "[Guardian Name] wants to link [Child Name]'s account."
  - School approves → Three-Way Handshake complete (Guardian-Child-School)

**Logged Actions:**
- Security Log entry: "Guardian approved profile connection with [School Name]"
- Guardian receives confirmation: "You'll now see [Child's] school activities in your dashboard."

**Step 6: Guardian Profile Complete**

- Badge animation: "Guardian Dashboard Active!" (Vector shield, <20KB)
- Notification: "[Child Name]'s profile is now fully active. They can join activities with your approval."
- **Auto-redirect:** Lands on Guardian Dashboard (Mine Panel, Guardian view)

**Guardian Dashboard Layout:**

**Top Section:**
- "Linked Minors" (Cards showing each child with quick stats—e.g., "3 activities this month")

**Middle Section (Tabbed):**
1. **Pending Approvals:** Join requests awaiting response
2. **Activity History:** Past 30 days of child's participations
3. **Security Log:** Profile views by Creators/Associations (with timestamps)

**Bottom Section:**
- "Add Another Child" button (To link siblings)
- Settings cog (Edit dashboard configurations)

**Guardian Profile Unlocked Features:**
- Create and approve minor profiles
- Monitor child's activity participation (real-time dashboard)
- Approve/decline join requests (competitive and non-competitive)
- Set AcademicAlert thresholds (if school linked)
- Receive injury/safety alerts (push + WhatsApp)
- View Security Log (every profile view logged)
- Manage WhatsApp Group invites for child's teams
- Export child's Sports CV (P10 fee)

---

### FLOW 5: CREATOR UPGRADE (From User or Player)
**Duration: 4-6 minutes | Data Cost: <500KB | Triggers: "+" Button or "Organize Event"**

**Entry Point:**
- User/Player taps "+" button → Prompt:
  > "Start organizing matches and events in your community (free)."

**Creator Onboarding Screen:**
White background, megaphone icon (vector, <30KB)

> "Become a Creator to organize soccer games, chess tournaments, and community events in [User's Area]."

**Step 1: Creator Identity Verification**

**Required Fields:**
- Full Name (Pre-filled from User profile)
- WhatsApp Number (Pre-filled, verified)
- Creator Bio (Text area, 200 char—e.g., "Block 3 soccer enthusiast, organizing weekend matches since 2024")

**Optional Fields (+/- Toggle):**
- Facebook Page Link (For business/community page verification)
- Profile Photo (WebP, <200KB—shows on Activity Pages)

**Step 2: Activity Preferences**

**"What Will You Organize?" (Multi-select checkboxes):**
- Sports (Soccer, Netball, Volleyball, Chess, Athletics, Swimming)
- Hobbies (Arts & Crafts, Book Clubs, Gardening)
- Leisure (Hiking, Picnics, Community Cleanups)
- Lessons (Coaching, Tutoring, Skills Training)

**Primary Location:**
- Village/Town/City (Pre-filled from User profile)
- Area/Neighbourhood (Pre-filled)
- Typical Venue (Text input—e.g., "Block 3 Community Field," "Game Cube Broadhurst")

**Step 3: Feature Introduction (Interactive Tour)**

**"Creator Tools Preview" (4 swipeable panels with mock data):**

1. **Event Creation:**
   - Shows mock form: "Saturday Soccer—4 PM—Block 3"
   - "Set date, time, location, and requirements."

2. **Roster Management:**
   - Shows mock list: "12/20 Players Joined"
   - "Track participants and send call-outs for missing positions."

3. **Sponsor-a-Game:**
   - Shows mock progress bar: "P300/500 Funded"
   - "Let your community sponsor equipment or venue fees."

4. **Facebook Live Integration:**
   - Shows mock toggle: "Allow fans to link livestreams? ON"
   - "Aggregate Facebook Live links for low-data streaming."

**Action Button:**
- "Start Creating" → Proceeds to Step 4

**Step 4: First Event Setup (Guided Walkthrough)**

**"Let's Create Your First Activity" Form:**
(Simplified version of full Event Creation—uses +/- toggles for progressive disclosure)

**Basic Details (Expanded by default):**
- Activity Type (Dropdown: Soccer, Netball, Chess, etc.)
- Title (Text input, 50 char—e.g., "Saturday Afternoon Soccer")
- Date & Time (Calendar + time picker)
- Location (Dropdown: Saved venues OR text input for new)
- Duration (Dropdown: 30min, 1hr, 2hrs, 3hrs, Custom)

**Participant Requirements (+/- Toggle, collapsed):**
- Min/Max Players (Number inputs—e.g., "10-20")
- Skill Level (Dropdown: All Levels, Beginner, Intermediate, Advanced)
- Age Range (Dropdown: All Ages, Kids Only (U12), Teens (13-17), Adults (18+))

**Cost & Equipment (+/- Toggle, collapsed):**
- Entry Fee (Text input with currency, P—e.g., "P0" for free OR "P20")
- Equipment Needed (Multi-select: Soccer ball, Cones, Jerseys, Water, Other)
- Equipment Provided? (Checkboxes—what Creator supplies vs. what participants bring)

**Advanced Features (+/- Toggle, collapsed):**
- Weather Info (Auto-filled for outdoor activities—editable)
- Facebook Live Toggle (ON/OFF—"Allow fans to link streams?")
- Sponsor-a-Game (ON/OFF—"Open for community sponsorship?")
- Call-Outs Enabled (ON/OFF—"Send notifications for missing players?")

**WhatsApp Integration:**
- "WhatsApp Group Link" (Optional text input—e.g., wa.me link)
- "Pre-Fill Message" (Text area, 200 char—what appears when users tap "WhatsApp Organizer")
  - Default: "Hello! I'm interested in [Activity Name] via Mizano."

**Step 5: Event Review & Publish**

**"Preview Your Activity" Screen:**
- Shows mock Dynamic Activity Card with "Active Soon" badge
- "This is how your event will appear in search results and on the Sports panel."

**Action Buttons:**
- "Publish Now" → Creates activity, lands on Activity Page (Creator view)
- "Save as Draft" → Stores locally, syncs when online
- "Cancel" → Discards (with confirmation prompt)

**Step 6: Creator Profile Complete**

- Badge animation: "You're Now a Creator!" (Vector megaphone, <20KB)
- Notification: "Your first event is live! Share it on Facebook to reach more people."
- **Auto-redirect:** Lands on newly created Activity Page

**Creator Profile Unlocked Features:**
- Create single events/matches/leagues
- Manage rosters (view participants, send WhatsApp reminders)
- Toggle features (Facebook Live, Sponsor-a-Game, Call-Outs)
- Edit Dynamic Activity Card states (Active Soon → Active Now → Passed)
- View participant lists (with Guardian approval status for minors)
- Send call-outs for missing positions (e.g., "Need 1 Goalie!")
- Moderate fan-submitted livestreams (Report button)
- Access basic analytics (views, joins, no-shows)

**Creator Profile Restrictions:**
- Cannot create recurring events (needs Group/Club profile)
- No institutional verification (needs Association profile)
- No bulk roster management (needs Group/Club or Educational Institution)

---

### FLOW 6: MENTOR UPGRADE (From User or Player)
**Duration: 3-4 minutes | Data Cost: <500KB | Triggers: "Become a Mentor" in Settings**

**Entry Point:**
- User/Player navigates to Settings → Community & Safety → "Mentorship Visibility" toggle → Prompt:
  > "Sign up as a Mentor to guide sessions and get discovered by event creators (free)."

**Mentor Onboarding Screen:**
White background, lightbulb icon (vector, <30KB)

> "Mentors guide training sessions, coach teams, and help grow Botswana's grassroots talent."

**Step 1: Mentorship Focus**

**"What Do You Want to Mentor?" (Multi-select checkboxes):**
- Sports Coaching (Soccer, Netball, Volleyball, Chess, Athletics, Swimming)
- Skills Training (Arts, Music, Coding, Business)
- Academic Tutoring (Math, Science, English)
- Life Skills (Leadership, Health, Career Guidance)

**Experience Level (Per focus area selected):**
- Beginner (1-2 years), Intermediate (3-5 years), Advanced (6-10 years), Expert (10+ years)

**Step 2: Availability & Location**

**"When Can You Mentor?":**
- Weekdays (Multi-select: Mon, Tue, Wed, Thu, Fri)
- Weekends (Multi-select: Sat, Sun)
- Time Slots (Multi-select: Morning, Afternoon, Evening)

**Geographic Reach:**
- Primary Area (Pre-filled from User profile—e.g., Block 3)
- Willing to Travel? (Dropdown: Within neighbourhood, Within town, Across Botswana)

**Step 3: Credentials & Experience (Optional)**

**"Build Your Mentor Profile" (+/- Toggle, collapsed):**

- Certifications (Photo uploads, 3 max—e.g., Coaching License, Teaching Certificate)
- Past Mentee Success Stories (Text area, 500 char—e.g., "Coached U15 team to district finals")
- References (Text input: Name + WhatsApp number of previous organizer/school)

**Step 4: Discovery Settings**

**"How Should Creators Find You?":**

- Searchable in Mentor Directory? (Toggle: ON/OFF—default ON)
- Notifications for Opportunities? (Toggle: ON/OFF—default ON)
  - Example alert: "Chess club in Gaborone needs a coach for 10 kids—interested?"

**Mentorship Rate (Optional):**
- Free (Community service)
- Paid (Text input: "P50/hour" OR "P200/session")
- Negotiable (Shows "Contact for rates")

**Step 5: Mentor Profile Complete**

- Badge animation: "Mentor Profile Active!" (Vector lightbulb, <20KB)
- Notification: "Creators can now discover you! Check your notifications for opportunities."
- **Auto-redirect:** Lands on Mine Panel (Shows "Mentor" badge + stats: "0 mentees this month")

**Mentor Profile Unlocked Features:**
- Indexed in Mentor Directory (searchable by Creators)
- Targeted notifications for training/clinic opportunities
- View mentee tallies and demographics (if working with Group/Club or School)
- Access to "Mentor Hub" in Mine Panel (shows sessions led, feedback scores)
- Elevated profile visibility in Activity Pages (if invited by Creator)

---

### FLOW 7: GROUP/CLUB REGISTRATION (Paid Profile)
**Duration: 10-15 minutes | Data Cost: <2MB | Village Waiver: Free for non-profits**

**Entry Point:**
- User/Player/Creator navigates to Settings → Account & Profile → "Switch to Group/Club" → Prompt:
  > "Register your team or club to manage recurring events and collective resources."

**Group/Club Onboarding Screen:**
White background, shield/emblem icon (vector, <30KB)

> "Group/Club profiles help teams like Block 3 Ballers or Gaborone Chess Club organize, sponsor, and grow together."

**Step 1: Entity Type & Village Waiver Check**

**"What Type of Group Are You?":**
- Sports Team (Soccer, Netball, Volleyball, etc.)
- Hobby Club (Book Club, Arts Collective, Chess Club)
- Community Organization (Neighborhood Association, Youth Group)
- Other (Text input)

**Profit Status (Critical for waiver):**
- Non-Profit Community Group (Waiver eligible)
- For-Profit Business (Standard pricing applies)

**Location:**
- Village/Town/City (Dropdown)
- Area/Neighbourhood (Dynamic dropdown)

**Waiver Logic:**
- If "Non-Profit" + location = Village → "Your Group/Club profile is FREE!"
- If "For-Profit" OR location = City → "Monthly fee: P100 (Billing details next)"

**Step 2: Group/Club Identity**

**Required Fields:**
- Group/Club Name (Text input, 50 char—e.g., "Block 3 Ballers")
- Founding Year (Dropdown: 1990-2026)
- Admin Name (Pre-filled from User profile—primary contact)
- Admin WhatsApp Number (Pre-filled, verified)

**Optional Fields (+/- Toggle):**
- Group/Club Logo (WebP upload, <200KB—displays on Activity Pages)
- Facebook Page Link (For verification and trust signals)
- WhatsApp Group Invite Link (For approved members)

**Step 3: Activity Focus & Membership**

**"What Does Your Group/Club Do?" (Multi-select):**
- Competitive Sports (Inter-team matches, leagues)
- Training & Development (Skills sessions, coaching)
- Social Events (Community picnics, fundraisers)
- Tournaments (Organizing competitions)

**Membership Info:**
- Current Member Count (Number input—for analytics)
- Membership Open? (Toggle: ON/OFF—"Can new members join?")
- Age Range (Dropdown: Kids Only, Teens, Adults, Mixed Ages)

**Step 4: Recurring Events Setup**

**"Create Your First Recurring Event" (Optional, can skip):**

**Template Form:**
- Event Type (Dropdown: Weekly Practice, Monthly Tournament, Seasonal League)
- Schedule (Multi-select: Days of week + time—e.g., "Every Saturday 3 PM")
- Location (Text input OR dropdown of saved venues)
- Participant Requirements (Min/Max players, skill level)

**Recurring Logic:**
- Auto-generates individual events based on schedule
- Copies Event Creator features (roster, call-outs, sponsor links)
- Shows on calendar view in Mine Panel

**Step 5: Wishlist & Sponsorship Setup**

**"What Does Your Group/Club Need?":**

**Equipment Wishlist (Multi-item form):**
- Item Name (Text input—e.g., "10 Soccer Balls")
- Quantity (Number input)
- Estimated Cost (Text input—e.g., "P50 each")
- Priority (Dropdown: Critical, Important, Nice-to-Have)

**Sponsor-a-Game Configuration:**
- Enable sponsorship page? (Toggle: ON/OFF)
- Funding Goals (Text input—e.g., "P5000 for annual tournament")
- In-Kind Contributions (Toggle: Accept equipment donations? ON/OFF)

**Sponsor Recognition:**
- How will sponsors be acknowledged? (Multi-select: Activity Page shoutouts, Digital badges, Facebook posts)

**Step 6: Payment Setup (If Not Waived)**

**"Billing Information" (Skipped if village waiver applies):**

- Payment Method (Dropdown: MTN Mobile Money, Orange Money, PayPal)
- Phone Number (For mobile money) OR Email (For PayPal)
- Billing Cycle (Monthly auto-debit starts today)

**Free Trial:**
- "First 30 days free—cancel anytime in Settings."

**Step 7: Group/Club Profile Complete**

- Badge animation: "Group/Club Profile Live!" (Vector emblem, <20KB)
- Notification: "Your wishlist is published. Share your sponsorship page on Facebook to get support!"
- **Auto-redirect:** Lands on Mine Panel (Group/Club Admin view)

**Group/Club Dashboard Layout:**

**Top Section:**
- Profile summary (Name, logo, member count, Facebook link)

**Middle Section (Tabbed):**
1. **Recurring Events:** Upcoming schedule with edit buttons
2. **Roster:** Full member list (add/remove members)
3. **Sponsorships:** Active sponsors + funding progress bars
4. **Wishlist:** Equipment needs + status (fulfilled/pending)
5. **History:** Past events, trophies, achievements

**Bottom Section:**
- "Create One-Time Event" button (Uses Creator tools)
- Settings cog (Edit profile, billing, recurring templates)

**Group/Club Profile Unlocked Features:**
- Recurring event management (weekly practices, monthly tournaments)
- Collective roster (add/remove members with roles—Captain, Treasurer, etc.)
- Equipment wishlist (publicly visible for community/business sponsors)
- Sponsor-a-Game pages (5% Mizano commission on funds raised)
- Shared activity history and trophies (builds legacy)
- WhatsApp Group integration (auto-invite approved members)
- Bulk notifications (send call-outs to all members)
- Analytics dashboard (attendance trends, funding sources)

---

### FLOW 8: BUSINESS REGISTRATION (Paid Profile)
**Duration: 8-12 minutes | Data Cost: <2MB | Village Waiver: Free for non-profit services**

**Entry Point:**
- User navigates to Shopping/Shops/Businesses panels → "List Your Business" button → Prompt:
  > "Reach Gaborone's active community by listing your clinic, gym, or equipment shop."

**Business Onboarding Screen:**
White background, storefront icon (vector, <30KB)

> "Business profiles help clinics, physios, gyms, and shops connect with players and teams in their area."

**Step 1: Business Type & Village Waiver Check**

**"What Type of Business Are You?":**
- Health Services (Clinic, Hospital, Physiotherapy, Sports Medicine)
- Fitness & Training (Gym, Personal Trainer, Yoga Studio)
- Equipment Shop (Sports Gear, Board Games, Books)
- Other (Text input)

**Profit Status (Critical for waiver):**
- For-Profit Business (Standard pricing applies)
- Non-Profit Community Service (Waiver eligible—e.g., free clinic in village)

**Location:**
- Village/Town/City (Dropdown)
- Area/Neighbourhood (Dynamic dropdown)
- Exact Address (Text input—for venue bookings/directions)

**Waiver Logic:**
- If "Non-Profit" + location = Village → "Your Business profile is FREE!"
- If "For-Profit" OR location = City → "Monthly fee: P100 (Tier 1: Clinics/Physio) OR P200 (Tier 2: Gyms/Shops)"

**Step 2: Business Identity**

**Required Fields:**
- Business Name (Text input, 50 char—e.g., "Broadhurst Physiotherapy")
- Registration Number (Text input—for verification)
- Admin Name (Pre-filled from User profile)
- Admin WhatsApp Number (Pre-filled, verified)

**Optional Fields (+/- Toggle):**
- Business Logo (WebP upload, <200KB—displays in Businesses panel)
- Facebook Business Page Link (For trust verification)
- Operating Hours (Text input—e.g., "Mon-Fri 8 AM-6 PM, Sat 9 AM-1 PM")

**Step 3: Services & Offerings**

**"What Do You Offer?" (Dynamic form based on Business Type selected in Step 1):**

**For Health Services:**
- Specializations (Multi-select: Sports Injury, Massage, Rehabilitation, General Practice)
- Accepted Insurance (Multi-select OR "None")
- Walk-Ins Accepted? (Toggle: ON/OFF)
- Pricing (Text area—e.g., "Consultation: P150, Follow-up: P100")

**For Fitness & Training:**
- Facilities (Multi-select: Cardio Equipment, Weights, Pool, Courts)
- Membership Tiers (Text area—e.g., "Monthly: P300, Annual: P3000")
- Classes Offered (Multi-select: Yoga, Boxing, Zumba, Personal Training)
- Trial Available? (Toggle: ON/OFF—"First session free")

**For Equipment Shops:**
- Product Categories (Multi-select: Soccer Gear, Chess Sets, Volleyballs, Books)
- Delivery Available? (Toggle: ON/OFF)
- Pricing Range (Dropdown: Budget (<P100), Mid-Range (P100-500), Premium (P500+))

**Step 4: Contact & Booking Setup**

**"How Should Customers Reach You?":**

- Primary Contact Method (Dropdown: WhatsApp, Facebook Messenger, Phone Call)
- WhatsApp Number (Pre-filled if same as Admin OR text input for business line)
- Facebook Page Link (Pre-filled from Step 2 OR text input)
- Website (Optional text input—external link)

**Booking Options (For Health/Fitness only):**
- Enable Venue Booking? (Toggle: ON/OFF—integrates with Venue Listing feature)
  - If ON → "You'll pay 5% per booking (OR 10% for Instant Book feature)"
- Appointment System (Dropdown: WhatsApp Only, External Website, None)

**Step 5: Sponsorship & Community Engagement**

**"Want to Sponsor Local Teams?" (+/- Toggle, collapsed):**

- Enable Sponsorship Discovery? (Toggle: ON/OFF—makes business visible in Sponsor-a-Game listings)
- Sponsorship Budget (Text input—e.g., "P5000/year for community teams")
- Preferred Activities (Multi-select: Soccer, Netball, Chess, Youth Programs)

**Sponsor Recognition:**
- How will you be acknowledged? (Pre-filled: "Activity Page shoutouts, Digital badges, Facebook posts")

**Step 6: Verified Badge & Trust Signals**

**"Get Verified" Process:**

- Upload Business License (Photo upload, WebP <500KB)
- Facebook Page Verification (Auto-checks if linked—requires 50+ followers)
- WhatsApp Business Account? (Toggle: ON/OFF—shows green checkmark if verified)

**Trust Indicators Displayed:**
- "Verified Business" badge (displayed on all listings)
- Facebook follower count (if page linked)
- Years in operation (calculated from founding year if provided)

**Step 7: Advertising & Promotion Setup**

**"Boost Your Visibility" (Optional upsell):**

**Posted Ads:**
- Upload ad banner (WebP, 50-100KB max)
- Ad text (100 char—e.g., "50% off first physio session for Mizano users!")
- Link destination (WhatsApp, Facebook, or external website)
- Pricing: P50/month for static ad in relevant panel (Businesses/Shopping)

**Data-Free Advertising (Premium):**
- "Whitelisted on Facebook zero-rated bundles—users see your ad without data costs."
- Pricing: P200/month (higher reach among low-data users)

**Step 8: Payment Setup (If Not Waived)**

**"Billing Information" (Skipped if village waiver applies):**

- Payment Method (Dropdown: MTN Mobile Money, Orange Money, PayPal)
- Phone Number (For mobile money) OR Email (For PayPal)
- Billing Cycle (Monthly auto-debit starts today)
- Subscription Tier (Pre-filled: Tier 1 = P100, Tier 2 = P200)

**Free Trial:**
- "First 30 days free—cancel anytime in Settings."

**Step 9: Business Profile Complete**

- Badge animation: "Business Profile Live!" (Vector storefront, <20KB)
- Notification: "Your business is now visible in the Businesses panel. Share your page on Facebook!"
- **Auto-redirect:** Lands on Mine Panel (Business Admin view)

**Business Dashboard Layout:**

**Top Section:**
- Profile summary (Name, logo, "Verified" badge, Facebook link)
- Quick stats (Profile views this month, WhatsApp clicks, Sponsorships)

**Middle Section (Tabbed):**
1. **Services:** List of offerings (edit descriptions, pricing)
2. **Bookings:** Upcoming appointments (if venue booking enabled)
3. **Sponsorships:** Active sponsorships of teams/events + recognition
4. **Ads:** Manage posted ads (upload new, pause current)
5. **Analytics:** Views, clicks, conversion rates (Profile → WhatsApp contact)

**Bottom Section:**
- "Sponsor an Event" button (Browse Sponsor-a-Game opportunities)
- Settings cog (Edit profile, billing, services)

**Business Profile Unlocked Features:**
- Listing in Businesses/Shops panels (searchable by location, service type)
- WhatsApp/Facebook deep links (users contact with one tap)
- Sponsor-a-Game visibility (browse teams/events needing support)
- "Verified" badge (trust signal for users)
- Quick-apply responses (for Bulletin job postings)
- Posted ads (WebP banners linked to WhatsApp/Facebook)
- Venue booking integration (5%/10% commission on bookings)
- Analytics dashboard (track profile views, engagement)
- Priority search placement (if subscription active)

---

### FLOW 9: ASSOCIATION REGISTRATION (Paid Profile)
**Duration: 10-15 minutes | Data Cost: <2MB | Village Waiver: Free for local community bodies**

**Entry Point:**
- User navigates to Institutions panel → "Register Your Association" button → Prompt:
  > "Official sports bodies like BFA or district leagues—verify tournaments and access player data."

**Association Onboarding Screen:**
White background, trophy icon (vector, <30KB)

> "Association profiles help official sports bodies like the Botswana Football Association manage leagues, verify tournaments, and scout talent."

**Step 1: Association Type & Village Waiver Check**

**"What Type of Association Are You?":**
- National Sports Body (e.g., BFA, Botswana Athletics)
- District/Regional League (e.g., Gaborone Chess League)
- Community Organization (e.g., Block 3 Youth Development)
- Scouting/Recruitment Agency (e.g., talent scouts)
- Other (Text input)

**Official Status (Critical for waiver):**
- Government-Recognized Body (Waiver eligible)
- Private Community Organization (Waiver eligible if in village)
- For-Profit Scouting Agency (Standard pricing applies)

**Geographic Scope:**
- National (Covers all of Botswana)
- Regional (Select districts: Gaborone, Francistown, etc.)
- Local (Specific village/town + area)

**Waiver Logic:**
- If "Government-Recognized" OR ("Community Org" + Village) → "Your Association profile is FREE!"
- If "For-Profit" OR (National + City-focused) → "Monthly fee: P150"

**Step 2: Association Identity & Verification**

**Required Fields:**
- Association Name (Text input, 50 char—e.g., "Botswana Football Association")
- Registration Number (Text input—for government verification)
- Founding Year (Dropdown: 1950-2026)
- Admin Name (Pre-filled from User profile—primary contact)
- Admin WhatsApp Number (Pre-filled, verified)

**Official Documentation Upload:**
- Government Registration Certificate (Photo upload, WebP <500KB)
- Association Logo (WebP upload, <200KB—displays on Institutions panel)

**Facebook Page Verification:**
- Facebook Page Link (Required for trust—BFA, district leagues typically have pages)
- Auto-checks follower count (requires 100+ followers for verification badge)

**Step 3: Association Focus & Scope**

**"What Activities Does Your Association Oversee?" (Multi-select):**
- Sports (Soccer, Netball, Volleyball, Chess, Athletics, Swimming)
- Leagues & Tournaments (Inter-school, District, National)
- Training & Development (Coaching clinics, referee certification)
- Scouting & Recruitment (Talent identification for national teams)
- Other (Text input)

**Verification Authority:**
- Can you verify official tournaments? (Toggle: ON/OFF—grants "Verified by [Association]" badge to events)
- Example: BFA verifies all official soccer tournaments in Botswana

**Step 4: News Flash & Communication Setup**

**"News Flash" Feed Configuration:**

**"What Will You Announce?" (Guidance for admins):**
- Tournament schedules (dates, locations, registration deadlines)
- Rule changes (new regulations for competitions)
- National team selections (call-ups, squad announcements)
- Training opportunities (coaching clinics, referee courses)
- Results & standings (official league tables)

**Publishing Permissions:**
- Who can post News Flash? (Multi-select: Admin only, Designated staff, All Association members)
- Moderation required before publish? (Toggle: ON/OFF—default ON for quality control)

**Notification Strategy:**
- Push notifications for News Flash? (Toggle: ON/OFF—sends to users who follow Association)
- WhatsApp Broadcast? (Optional text input—Association's WhatsApp channel link)

**Step 5: Player Data Access & Recruitment Discovery**

**"Scouting & Talent Identification" Setup:**

**Access Level (Critical for privacy compliance):**
- Basic Player Tallies (Free—shows aggregate stats like "250 U15 soccer players in Gaborone")
- Recruitment Discovery (Paid—query individual player profiles with filters)
  - Example query: "Show me every striker in Botswana with 15+ goals this season, aged U17"
  - Pricing: P10 per query OR P500/year unlimited

**Privacy Safeguards (Hard-coded):**
- All player profile views logged in Guardian Security Log (for minors)
- No direct contact—Association must send join request via Mizano
- Academic data (grades) never visible (only sports stats)
- Guardian approval required for under-16 contact

**Opt-In Requirement:**
- Players must toggle "Discoverable by Associations" in Settings (default: OFF)
- Minors require Guardian approval to enable

**Step 6: Tournament Management Tools (Optional Upsell)**

**"Tournament Management Suite" (One-time fee: P100 OR included in annual subscription):**

**Features:**
- Bracket Generator (Single/double elimination, round-robin)
- Auto-Scheduling (Matches assigned to available venues/dates)
- Referee Rating System (Fans rate officiating fairness, 1-5 stars)
- Live Stats Aggregation (Scores, goals, assists auto-compile)
- Leaderboard Integration (Results feed into National Leaderboard)

**Enable for your Association? (Toggle: ON/OFF):**
- If ON → Proceeds to payment setup
- If OFF → "You can activate this later in Settings."

**Step 7: Payment Setup (If Not Waived)**

**"Billing Information" (Skipped if waiver applies):**

**Subscription Options:**
- Monthly: P150/month (Standard access + News Flash)
- Annual: P1500/year (10% discount + includes Tournament Suite free)
- Recruitment Discovery Add-On: P500/year (Unlimited player queries)

**Payment Method:**
- MTN Mobile Money, Orange Money, PayPal

**Free Trial:**
- "First 60 days free for government-recognized bodies—verify your impact."

**Step 8: Association Profile Complete**

- Badge animation: "Association Profile Verified!" (Vector trophy, <20KB)
- Notification: "Post your first News Flash to engage the community!"
- **Auto-redirect:** Lands on Mine Panel (Association Admin view)

**Association Dashboard Layout:**

**Top Section:**
- Profile summary (Name, logo, "Verified" badge, Facebook link)
- Quick stats (Followers, News Flash posts this month, Verified tournaments)

**Middle Section (Tabbed):**
1. **News Flash:** Publish announcements (text-only, 500 char max)
2. **Verified Events:** List of tournaments you've verified (with badges)
3. **Player Tallies:** Aggregate stats (e.g., "1,200 active soccer players in Gaborone")
4. **Recruitment Queries:** Search player profiles (if Recruitment Discovery enabled)
5. **Tournament Management:** Active brackets, schedules, referee ratings (if Suite enabled)

**Bottom Section:**
- "Verify a Tournament" button (Browse pending events for official badge)
- "Post News Flash" button (Quick publish to followers)
- Settings cog (Edit profile, billing, permissions)

**Association Profile Unlocked Features:**
- News Flash feed (text-only announcements to followers)
- Tournament verification (grants "Verified by [Association]" badge to events)
- Player tallies (aggregate stats by sport, age, location)
- Recruitment Discovery (paid—query individual player profiles)
- Tournament Management Suite (brackets, scheduling, referee ratings)
- Verified badge (displayed on Institutions panel for trust)
- WhatsApp Broadcast Channel integration (for official announcements)
- Analytics dashboard (engagement on News Flash, verified event attendance)

---

### FLOW 10: STAFF ONBOARDING (Internal Mizano)
**Duration: 15-20 minutes | Data Cost: <2MB | Access: Admin-invited only**

**Entry Point:**
- Admin invites Staff via backend (sends WhatsApp invite link)
- Staff taps link → Opens Staff Registration flow

**Staff Onboarding Screen:**
White background, Mizano logo + "Staff Portal" text (vector, <50KB)

> "Welcome to the Mizano team! As Staff, you'll manage Game Cubes, moderate content, and ensure community safety."

**Step 1: Staff Identity Verification**

**Required Fields (Pre-filled from Admin invite):**
- Full Name
- WhatsApp Number (Verified via invitation link)
- Role (Pre-assigned by Admin: Game Cube Manager, Content Moderator, Regional Coordinator)
- Assigned Location (Village/Town/Area where Staff operates)

**Employment Details:**
- Staff ID Number (Auto-generated—e.g., "STAFF-GAB-001")
- Start Date (Auto-filled with invitation date)
- Reporting Manager (Admin name, pre-filled)

**Step 2: Role-Specific Training (Interactive Module)**

**"Your Responsibilities" (Swipeable panels based on role):**

**For Game Cube Managers:**
1. **Equipment Ledger:** Check-in/check-out items while offline, sync when online
2. **Borrow Score Verification:** Override ratings if disputes occur (with audit trail)
3. **First-Aid Coordination:** Maintain on-site first-aid supplies, log injuries
4. **Roster Syncing:** Ensure offline match sign-ups sync every 15 minutes

**For Content Moderators:**
1. **Bulletin Feed:** Review flagged posts (jobs, funeral notices) for spam/inappropriate content
2. **Lost & Found:** Verify uploaded items, remove duplicates
3. **Reported Streams:** Remove fan-submitted livestreams if Creator flags as spam
4. **User Reports:** Investigate reported profiles/activities (harassment, fake accounts)

**For Regional Coordinators:**
1. **Village Waiver Approvals:** Verify non-profit status for free Group/Club/Business profiles
2. **School Handshakes:** Monitor Guardian-School-Mizano connection audits
3. **Community Outreach:** Onboard new villages to Mizano, train local Creators
4. **Analytics Reporting:** Weekly summaries to Admin (activity trends, equipment usage)

**Action Button (Per Panel):**
- "I Understand" → Proceeds to next panel
- Final panel → "Start My Role" → Proceeds to Step 3

**Step 3: System Access & Permissions Setup**

**"Staff Portal Login" Configuration:**

- Create PIN (6-digit number—for quick login at Game Cubes without internet)
- Set Password (For full web-based Staff Portal access)
- Enable 2-Factor Authentication? (Toggle: ON/OFF—recommended ON)
  - If ON → Sends WhatsApp verification code on each login

**Device Registration:**
- Register primary device (Phone/Tablet used at Game Cube)
- Offline mode enabled by default (Forms save locally, sync every 15 min)

**Step 4: Equipment Ledger Training (Hands-On Walkthrough)**

**"Practice Check-Out" (Mock scenario with sample data):**

1. User arrives at Game Cube: "I want to borrow a soccer ball."
2. Staff opens Equipment Ledger → Scans item barcode (OR types item ID)
3. Item details appear: "Adidas Soccer Ball #3—Condition: Good—Borrow Price: P5"
4. Staff confirms borrower's Player profile (checks Borrow Score: 4.2/5.0)
5. Tap "Check Out" → Logs: Item ID, Borrower ID, Timestamp, Expected Return (auto-calculated based on activity duration)
6. Item status changes to "Checked Out—Due Back: 6 PM"

**"Practice Check-In" (Continuation of mock scenario):**

1. User returns item at 5:45 PM (15 minutes early)
2. Staff inspects condition: "No damage, all panels intact"
3. Tap "Check In" → Item status changes to "Available"
4. **Dual Rating Prompt:**
   - Staff rates borrower: "How responsible was [User Name]?" (1-5 stars)
   - Borrower rates Staff/Item: "Was the item as described?" (1-5 stars)
5. Ratings sync when online → Updates Borrow Score (weighted average)

**Dispute Resolution:**
- If item returned damaged → Staff overrides rating to 1 star (with photo evidence)
- Audit trail logs: "Staff ID, Reason, Timestamp, Photo"

**Action Button:**
- "Complete Training" → Proceeds to Step 5

**Step 5: Moderation Guidelines & Safety Protocols**

**"Content Moderation Handbook" (Text-based checklist):**

**Bulletin Feed:**
- ✅ Allowed: Local jobs, funeral notices, community events, lost items
- ❌ Remove: Spam, scams, explicit content, hate speech, personal attacks
- ⚠️ Flag for Admin: Suspected fraud (e.g., fake job postings), repeated violations

**Lost & Found:**
- ✅ Allowed: Photos of items left at parks/fields, text descriptions
- ❌ Remove: Items not related to activities (e.g., "Lost my house keys"), duplicate posts
- ⚠️ Flag for Admin: Valuable items (phones, jewelry)—notify local police

**Reported Streams:**
- ✅ Allowed: Facebook Live links submitted by fans (if Creator enabled)
- ❌ Remove: YouTube/TikTok links (warn user about data costs), broken links, unrelated content
- ⚠️ Flag for Admin: Inappropriate content (violence, harassment)

**User Reports (Harassment, Fake Accounts):**
- Investigate within 24 hours (review profile, activity history, messages)
- Temporary suspension (3-7 days) if violation confirmed
- Permanent ban for severe cases (hate speech, child safety violations)
- Audit trail: "Staff ID, Report details, Resolution, Timestamp"

**First-Aid Protocols:**
- Maintain on-site first-aid kit (bandages, antiseptic, ice packs)
- Log all injuries: "Participant Name, Activity, Injury Type, Treatment Given, Timestamp"
- Notify Guardian immediately if minor injured (WhatsApp alert auto-sent)
- Escalate to Admin if serious injury requires hospital visit

**Action Button:**
- "Acknowledge Guidelines" → Proceeds to Step 6

**Step 6: Staff Dashboard Orientation**

**"Your Command Center" (Tour of Staff Portal):**

**Top Section:**
- Quick stats (Items checked out today, Pending reports, Upcoming activities)

**Middle Section (Tabbed):**
1. **Equipment Ledger:** Real-time list of checked-out items (with overdue warnings)
2. **Moderation Queue:** Flagged posts, reported streams, user reports
3. **Activity Roster:** Upcoming matches at your Game Cube (sync every 15 min)
4. **First-Aid Log:** Injury reports (export PDF for monthly summary)
5. **Audit Trail:** All actions logged (check-outs, overrides, bans) for transparency

**Bottom Section:**
- "Check Out Item" button (Quick access to Equipment Ledger)
- "Report Issue" button (Escalate to Admin—broken equipment, safety concerns)
- Settings cog (Edit profile, change PIN, device sync)

**Action Button:**
- "Enter Staff Portal" → Lands on Dashboard (fully active)

**Step 7: Staff Profile Complete**

- Badge animation: "Staff Access Granted!" (Vector badge, <20KB)
- Notification: "Your Game Cube is ready. Check the Equipment Ledger for today's reservations."
- **Auto-redirect:** Lands on Staff Dashboard (Equipment Ledger tab open)

**Staff Profile Unlocked Features:**
- Equipment Ledger management (check-in/check-out, offline sync)
- Borrow Score verification and overrides (with audit trail)
- Content moderation (Bulletin, Lost & Found, reported streams)
- User report investigation (temporary suspensions, bans)
- First-aid coordination (log injuries, notify Guardians)
- Roster syncing (every 15 min for offline match sign-ups)
- Audit trail access (all actions logged for transparency)
- Admin escalation (report critical issues, request support)

**Staff Profile Restrictions:**
- Cannot create events (Staff focus on operations, not organizing)
- Cannot view financial data (billing, commissions—Admin-only)
- Cannot override Guardian approvals (child safety remains Guardian-controlled)

---

### FLOW 11: ADMIN SETUP (Internal Mizano—Founder/Core Team)
**Duration: 30-45 minutes | Data Cost: <5MB | Access: Founder/Mizano Core Team Only**

**Entry Point:**
- Founder/Core Team creates Admin profile during initial system setup
- One-time configuration (not repeatable by other profiles)

**Admin Onboarding Screen:**
White background, Mizano logo + "Admin Control Panel" text (vector, <50KB)

> "Welcome, Admin. You have full oversight of Mizano—analytics, fees, waivers, system integrity, and audit trails."

**Step 1: Admin Identity & Multi-Factor Authentication**

**Required Fields:**
- Full Name (Founder/Core Team member)
- Email (For critical system alerts)
- WhatsApp Number (For 2FA and urgent notifications)
- Role (Dropdown: Founder, CTO, Operations Lead, Finance Lead)

**Security Setup:**
- Create Master Password (16+ characters, alphanumeric + symbols)
- Enable 2-Factor Authentication (Mandatory—cannot be disabled)
  - WhatsApp OTP (6-digit code) + Google Authenticator (backup)
- Biometric Login (Fingerprint/Face ID if device supports)

**Device Registration:**
- Register up to 3 devices (Phone, Tablet, Laptop)
- New device logins require approval from existing device

**Step 2: System Configuration (One-Time Setup)**

**"Core Settings" (Cannot be changed later without consensus from all Admins):**

**Monetization Parameters:**
- Sponsorship Commission Rate (Default: 5%—displayed as "Mizano takes 5% of funds raised")
- Venue Booking Standard (Default: 5%)
- Venue Booking Instant Book (Default: 10%)
- Village Waiver Rules (Default: All features free in villages for non-profits)

**Data Sync Intervals:**
- Equipment Ledger sync (Default: Every 15 minutes)
- Roster sync (Default: Every 15 minutes)
- Borrow Score sync (Default: Real-time when online)
- Offline map update check (Default: Weekly)

**Safety Thresholds:**
- Guardian approval timeout (Default: 7 days—if Guardian doesn't respond, profile remains locked)
- Borrow Score restriction (Default: <3.0 stars = limited equipment access)
- Content moderation SLA (Default: Staff reviews reports within 24 hours)

**Step 3: Analytics Dashboard Setup**

**"What Metrics Matter Most?" (Customizable KPI tracking):**

**Default Widgets (Can add/remove):**
1. **User Growth:** Daily Active Users (DAU), Monthly Active Users (MAU), New Registrations
2. **Activity Engagement:** Events created, Matches joined, Call-outs sent
3. **Monetization:** Sponsorship commissions (P), Venue bookings (P), Subscriptions (P)
4. **Safety Metrics:** Guardian approvals pending, Reported content (flagged/resolved)
5. **Equipment Utilization:** Items borrowed (total), Borrow Score average, Disputes
6. **Geographic Reach:** Active villages/towns, New neighborhoods onboarded
7. **School Integration:** Students linked, Guardian-School handshakes, Sports CV exports

**Data Export Options:**
- CSV download (all raw data—for external analysis)
- PDF reports (weekly/monthly summaries—branded for investors)
- API access (for integrating with external BI tools)

**Step 4: Fee Management & Village Waiver Approvals**

**"Billing Oversight" Panel:**

**Subscription Management:**
- View all paid profiles (Group/Club, Business, Association, Educational Institution)
- Pause/resume subscriptions (for non-payment OR village waiver eligibility changes)
- Refund processing (for disputes)

**Village Waiver Queue:**
- List of pending waiver requests (Group/Club/Business claiming non-profit status)
- Verification process:
  1. Review uploaded documents (registration certificates, proof of non-profit)
  2. Cross-check with government databases (if available)
  3. Approve/Deny with reason (logged in audit trail)
- Auto-approve for government schools (based on .gov email domains)

**Commission Tracking:**
- Real-time dashboard: Sponsorship commissions (5%), Venue bookings (5%/10%)
- Breakdown by profile type (Group/Club, Business, Association)
- Monthly payout schedule (to Mizano bank account)

**Step 5: Audit Trail & Compliance Monitoring**

**"Transparency Log" (Immutable record of all critical actions):**

**What's Logged (Automatic):**
- Profile creations/deletions (with timestamps)
- Guardian-School handshakes (initiated/approved/denied)
- Borrow Score overrides (Staff interventions)
- Content moderation actions (bans, suspensions)
- Village waiver approvals/denials
- Payment transactions (commissions, subscriptions)
- Data exports (CSV, PDF—tracks who downloaded what)

**Search & Filter:**
- By profile type (User, Player, Guardian, Creator, Staff, etc.)
- By action type (Approval, Ban, Override, Payment)
- By date range (Last 7 days, Last 30 days, Custom)
- By Staff/Admin ID (accountability tracking)

**Compliance Alerts:**
- Auto-flags suspicious activity (e.g., multiple failed Guardian approvals, unusual Borrow Score overrides)
- Weekly summary email to all Admins: "5 new flags this week—review required"

**Step 6: System Integrity & Troubleshooting Tools**

**"Under the Hood" (Advanced technical controls):**

**Database Management:**
- Force manual sync (if automatic 15-min sync fails)
- Rollback to previous state (for data corruption—requires 2 Admin approvals)
- Clear cache globally (for all users—use sparingly, triggers re-download)

**Bug Reporting Dashboard:**
- View all user-submitted "Report a Problem" tickets
- Assign to Staff/Developer for resolution
- Track resolution time (target: <48 hours for critical, <7 days for non-critical)

**Feature Flags:**
- Enable/disable features globally (e.g., turn OFF Sponsor-a-Game if payment gateway fails)
- Beta testing (activate new features for specific profiles/regions before full rollout)

**Push Notification Control:**
- Send mass notifications (e.g., "Mizano maintenance tonight 10 PM-12 AM")
- Target by location (e.g., "Gaborone users: Game Cube at Block 3 now open")
- Emergency alerts (e.g., "Suspended user activity due to safety concern")

**Step 7: Admin Dashboard Orientation**

**"Your Command Center" (Full-system overview):**

**Top Section:**
- System health indicators (Green = All systems operational, Yellow = Minor issues, Red = Critical)
- Quick stats (Total users, Active events today, Revenue this month)

**Middle Section (Tabbed):**
1. **Analytics:** KPI widgets (DAU, MAU, commissions, engagement)
2. **Fee Management:** Subscriptions, waivers, refunds, commission tracking
3. **Audit Trail:** Immutable log of all actions (searchable)
4. **Content Moderation:** Escalated issues from Staff (requires Admin review)
5. **System Tools:** Manual sync, feature flags, push notifications, bug reports

**Bottom Section:**
- "Invite Staff" button (Send WhatsApp invite link for new Staff members)
- "Export Data" button (CSV/PDF reports)
- Settings cog (Edit Admin profile, security settings, system config)

**Action Button:**
- "Enter Admin Portal" → Lands on Dashboard (Analytics tab open)

**Step 8: Admin Profile Complete**

- Badge animation: "Admin Access Granted!" (Vector key icon, <20KB)
- Notification: "Mizano is under your oversight. Review the Analytics dashboard for today's activity."
- **Auto-redirect:** Lands on Admin Dashboard (Analytics tab)

**Admin Profile Unlocked Features (Full System Access):**
- Analytics dashboard (all metrics, custom KPIs, data exports)
- Fee management (subscriptions, waivers, refunds, commissions)
- Audit trail (immutable log of all actions, searchable)
- Content moderation escalation (review Staff decisions, handle appeals)
- System tools (manual sync, rollback, cache clearing, feature flags)
- Push notifications (mass alerts, targeted by location/profile type)
- Staff management (invite new Staff, assign roles, monitor performance)
- Village waiver approvals (verify non-profit status)
- Bug reporting (assign to developers, track resolution)
- Full database access (read-only for safety—modifications require consensus)

---

### FLOW 12: EDUCATIONAL INSTITUTION REGISTRATION (Paid Profile)
**Duration: 15-20 minutes | Data Cost: <3MB | Village Waiver: Free for rural/government schools**

**Entry Point:**
- School Admin navigates to Institutions panel → "Register Your School" button → Prompt:
  > "Connect your school to Mizano's National Talent Pipeline—manage leagues, track students, unlock scholarships."

**Educational Institution Onboarding Screen:**
White background, graduation cap icon (vector, <30KB)

> "Educational Institution profiles help schools manage national leagues, inter-house competitions, and student talent discovery."

**Step 1: School Type & Village Waiver Check**

**"What Type of School Are You?":**
- Government Primary School (Grades 1-7)
- Government Secondary School (Forms 1-5)
- Private Primary School
- Private Secondary School
- University/College
- Other Educational Institution (Text input)

**Ownership Status (Critical for waiver):**
- Government School (Waiver eligible—always free)
- Private School in Rural Area (Waiver eligible if in village)
- Private School in City (Standard pricing applies)

**Location:**
- Village/Town/City (Dropdown)
- Area/Neighbourhood (Dynamic dropdown)
- School Address (Text input—for student verification)

**Waiver Logic:**
- If "Government School" → "Your Educational Institution profile is FREE!"
- If "Private School" + Rural/Village → "Your profile is FREE under our village waiver!"
- If "Private School" + City → "Annual fee: P500 (includes League Management Suite)"

**Step 2: School Identity & Verification**

**Required Fields:**
- School Name (Text input, 100 char—e.g., "Northside Primary School")
- School Registration Number (Text input—for government verification)
- Founding Year (Dropdown: 1900-2026)
- Admin Name (Pre-filled from User profile—Principal/Sports Coordinator)
- Admin WhatsApp Number (Pre-filled, verified)
- School Email (Text input—.gov domains auto-verify government status)

**Official Documentation Upload:**
- School Registration Certificate (Photo upload, WebP <500KB)
- School Logo/Crest (WebP upload, <200KB—displays on student profiles)

**Step 3: Student & Staff Management Setup**

**"How Many Students/Staff?" (For system capacity planning):**

- Total Student Enrollment (Number input—e.g., "300")
- Grade/Year Breakdown (Optional text area—e.g., "Grade 1-7: 50 each, Form 1-3: 30 each")
- Total Teaching Staff (Number input)
- Coaches/Sports Coordinators (Number input)

**Bulk Student Upload (Optional—can do later):**
- "Upload Student Roster" button → Opens CSV template download
- Template columns: Student Name, Date of Birth, Grade/Year, House (if inter-house system), Guardian WhatsApp
- Upload filled CSV → Auto-creates pending student profiles (requires Guardian approvals)

**Teacher/Coach Sub-Profile Setup:**
- "Invite Teachers/Coaches" button → Enter WhatsApp numbers (comma-separated)
- Sends invitation: "You've been added as a Teacher/Coach at [School Name] on Mizano. Tap to set up your profile."
- Teachers create sub-profiles (linked to School—can manage class matches)

**Step 4: Inter-House Competition Configuration (Optional)**

**"Does Your School Have Houses?" (+/- Toggle, collapsed):**

- Enable Inter-House System? (Toggle: ON/OFF)
- If ON → "Add Houses" form:
  - House Name (Text input—e.g., "Red House," "Blue House")
  - House Color (Color picker OR text input—for visual branding)
  - Add up to 8 houses (common in Botswana schools: 4-6 houses)

**Inter-House Scoring:**
- Points system (Default: 1st place = 3 pts, 2nd = 2 pts, 3rd = 1 pt)
- Trophy tracking (Accumulates across all sports—e.g., "Red House leads with 45 pts")

**Step 5: National League Integration**

**"Connect to Botswana School Sports" Setup:**

**Available Leagues (Multi-select):**
- Botswana Primary Schools Soccer League (BPSSL)
- National Secondary Schools Athletics (NSSA)
- Inter-School Chess Championship (ISCC)
- District Netball Tournament (DNT)
- Other (Text input—if league not listed, request addition)

**How It Works:**
- School matches tagged with National League ID (Column AQ in schema)
- Results auto-aggregate to National Leaderboard (visible to all users)
- BFA/Associations can verify tournaments (grants official status)
- Top performers flagged for national team selection

**League Registration Fee (Paid separately to Sports Associations):**
- "Mizano does not charge for league connectivity—pay registration fees directly to BFA/Athletics Association."

**Step 6: Guardian-School Handshake Configuration**

**"Three-Way Safety Protocol" Setup:**

**Default Approval Workflow:**
1. School bulk-uploads students → Each student gets pending profile
2. Guardian receives WhatsApp notification: "[Child Name] has been registered at [School Name] on Mizano. Tap to approve."
3. Guardian taps "Approve" → Completes Guardian-School-Mizano handshake
4. Logged in Security Log (Guardian can see every profile view by Creators/Associations)

**Academic Data Privacy:**
- "Only you and the Guardian see academic data (grades, attendance). Sports stats are public if approved."
- AcademicAlert toggle (Column AR): Allows Guardian to pause match joins if grades drop

**Guardian Communication:**
- WhatsApp Broadcast Channel (Preferred—School sends announcements without exposing student phone numbers)
- Bulk SMS (Backup—for Guardians without smartphones)
- Email (Optional—not widely used in Botswana)

**Step 7: Sports CV & Talent Discovery**

**"Unlock Student Potential" Features:**

**Sports CV Builder:**
- Auto-aggregates student stats from matches (goals, assists, wins, certifications)
- Exports as PDF (P10 fee per student—shared revenue: P5 to School, P5 to Mizano)
- Used for secondary school/university applications

**Recruitment Discovery (Paid Access by Associations):**
- BFA/Scouts pay to query: "Show me every U15 striker in Gaborone with 10+ goals this term."
- Pricing: P10 per query (Revenue split: P7 to Mizano, P3 to School for data quality maintenance)
- Privacy-protected: No individual data sold; only aggregate queries allowed
- Guardian Security Log tracks all views

**Talent Flagging:**
- Teachers can "Flag for National Team" (sends News Flash to relevant Association)
- Example: "U13 netball star at Northside Primary—5'8", 20 goals this season"

**Step 8: Payment Setup (If Not Waived)**

**"Billing Information" (Skipped if government school or village waiver applies):**

**Subscription Options:**
- Annual: P500/year (Includes League Management Suite, unlimited student profiles)
- League Management Suite Only: P100 one-time (If school doesn't need full subscription)

**Payment Method:**
- MTN Mobile Money, Orange Money, PayPal

**Free Trial:**
- "First term free (3 months)—evaluate impact on student engagement before committing."

**Step 9: Educational Institution Profile Complete**

- Badge animation: "School Profile Live!" (Vector graduation cap, <20KB)
- Notification: "Your school is now part of Botswana's National Talent Pipeline. Upload students to get started!"
- **Auto-redirect:** Lands on Mine Panel (Educational Institution Admin view)

**School Dashboard Layout:**

**Top Section:**
- Profile summary (Name, logo, student count, inter-house standings)
- Quick stats (Active leagues, Students linked, Upcoming matches)

**Middle Section (Tabbed):**
1. **Student Roster:** Full list (by grade/house—add/remove, export CSV)
2. **Teacher/Coach Management:** Invite staff, assign classes/teams
3. **Inter-House Leaderboard:** Real-time standings (points, trophies)
4. **National Leagues:** Results, schedules, verified tournaments
5. **Talent Discovery:** Flagged students for recruitment, Sports CV exports

**Bottom Section:**
- "Upload Students" button (Bulk CSV upload)
- "Create Class Match" button (Internal practice/inter-house game)
- Settings cog (Edit profile, billing, inter-house config)

**Educational Institution Profile Unlocked Features:**
- Bulk student upload (CSV with Guardian contacts)
- Guardian-School handshake (three-way safety protocol)
- Teacher/Coach sub-profiles (manage class matches, log stats)
- Inter-house competition tracking (points, trophies, leaderboards)
- National league connectivity (auto-aggregate to Botswana leaderboards)
- Talent flagging (send News Flash to BFA/Associations for recruitment)
- Sports CV exports (P10 per student—shared revenue)
- Recruitment Discovery revenue (P3 per query from Associations)
- WhatsApp Broadcast Channels (for Guardian communication)
- AcademicAlert integration (Guardians pause match joins if grades low)

---

## POST-ONBOARDING EXPERIENCE

### First 7 Days: "Onboarding Checklist"

**For All Profiles (Except Browser):**

After registration, a persistent "Get Started" widget appears at top of Mine Panel (dismissible but returns until all steps completed):

**User/Player Checklist:**
- ✅ Join your first activity (0/1)
- ✅ Download offline map (saves 1MB for Game Cube locations)
- ✅ Set up 3 favorites (helps with recommendations)
- ✅ Complete your profile (add photo, bio)
- ✅ Invite a friend via WhatsApp (share referral link)

**Guardian Checklist:**
- ✅ Approve minor's profile (0/1)
- ✅ Review Security Log (see who's viewing your child's profile)
- ✅ Set notification preferences (WhatsApp alerts ON)
- ✅ Link school (if applicable—complete Guardian-School handshake)
- ✅ Explore dashboard (monitor child's activity history)

**Creator Checklist:**
- ✅ Create your first event (0/1)
- ✅ Send your first call-out (for missing positions)
- ✅ Share on Facebook (bring zero-data users to Mizano)
- ✅ Enable Sponsor-a-Game (open funding for community support)
- ✅ Join a Creator community group on WhatsApp (peer support)

**Group/Club Checklist:**
- ✅ Set up recurring event (weekly practice, monthly tournament)
- ✅ Create equipment wishlist (let community sponsor needs)
- ✅ Link WhatsApp Group (auto-invite approved members)
- ✅ Publish your first sponsorship request (via Sponsor-a-Game)
- ✅ Share club page on Facebook (boost visibility)

**Business Checklist:**
- ✅ Verify your profile (upload business license, link Facebook page)
- ✅ Post your first ad (WebP banner in Businesses panel)
- ✅ Sponsor an event (browse Sponsor-a-Game opportunities)
- ✅ Enable venue booking (if applicable—5%/10% commission)
- ✅ Review analytics (track profile views, WhatsApp clicks)

**Association Checklist:**
- ✅ Post your first News Flash (announce tournament, rule change)
- ✅ Verify a tournament (grant official badge to community event)
- ✅ Review player tallies (aggregate stats by sport/age/location)
- ✅ Set up Recruitment Discovery (if scouting—pay for queries)
- ✅ Share Association page on Facebook (engage followers)

**Educational Institution Checklist:**
- ✅ Upload student roster (bulk CSV—triggers Guardian notifications)
- ✅ Invite Teachers/Coaches (set up sub-profiles for class management)
- ✅ Create inter-house match (kickstart internal leagues)
- ✅ Connect to National League (tag matches with official IDs)
- ✅ Flag first talent for recruitment (send News Flash to BFA/Scouts)

**Staff Checklist:**
- ✅ Complete equipment ledger training (check-out/check-in practice)
- ✅ Resolve first moderation ticket (Bulletin, Lost & Found, reported stream)
- ✅ Log first injury report (test Guardian notification system)
- ✅ Force manual sync (practice offline-to-online workflow)
- ✅ Review audit trail (understand accountability logging)

**Admin Checklist:**
- ✅ Configure monetization parameters (commission rates, village waivers)
- ✅ Approve first village waiver (verify non-profit Group/Club/Business)
- ✅ Review audit trail (check all actions logged correctly)
- ✅ Send first push notification (test mass alert system)
- ✅ Export analytics (CSV/PDF for investor reporting)

**Progress Tracking:**
- Widget shows "3/5 Complete" with progress bar
- Tapping widget expands full checklist with checkboxes
- Completing all steps unlocks "Early Adopter" badge (displayed on profile)

---

### Engagement Triggers (Post-Onboarding)

**Day 3: "Still Here?" Check-In**
- WhatsApp message: "Hi [Name]! Have you tried [next checklist item]? Tap here to complete it now."
- Links directly to relevant feature (e.g., Activity Page to join match, Settings to download map)

**Day 7: "Week 1 Summary"**
- Push notification: "You've joined 3 activities this week! Keep it up—invite a friend to play with you."
- Shows top 3 activities in user's area (personalized recommendations)

**Day 14: "Upgrade Prompt" (For User → Player)**
- If User has browsed 10+ competitive matches but not joined: "Ready to play? Upgrade to Player (free) to join competitive matches."

**Day 30: "Community Impact"**
- Email/WhatsApp: "This month, Mizano users in [Area] raised P5,000 for local teams. You're part of something big!"
- Links to Leaderboard (shows user's contributions—even if small)

**Day 60: "Feature Discovery"**
- Push notification: "Did you know? You can download a 1MB offline map in Settings. Perfect for finding Game Cubes without data!"

**Day 90: "Feedback Request"**
- WhatsApp: "You've been on Mizano for 3 months! How can we improve? Tap to share your thoughts." (Links to in-app feedback form)

---

## OFFLINE ONBOARDING (GAME CUBE SCENARIO)

### QR Code Registration Flow

**Context:** User scans QR code at physical Game Cube (e.g., Block 3 Community Center) with no prior app download.

**Step 1: QR Code Scans → App Download**
- QR code contains: `mizano://register?location=GAB-BLOCK3-CUBE01`
- If app installed → Opens registration flow (pre-fills location)
- If app not installed → Redirects to Google Play Store → Downloads app (20MB) → Opens pre-filled flow

**Step 2: Offline-First Registration**
- All form data saves locally (no internet required)
- WhatsApp verification deferred: "Complete verification later when you have signal."
- Profile status: "Pending Verification" (can browse but not join activities)

**Step 3: Offline Map Auto-Download**
- 1MB Gaborone map tiles auto-download during registration
- "Your offline map is ready! Find Game Cubes even without data."

**Step 4: Equipment Borrowing (Offline)**
- Staff manually verifies identity (photo ID or school card)
- Checks out equipment via Bluetooth (peer-to-peer with Staff device)
- Logs locally: "User ID (if known), Item ID, Timestamp, Expected Return"
- Syncs when Game Cube gets Wi-Fi (every 15 minutes)

**Step 5: First Sync (When User Gets Signal)**
- App auto-syncs: Uploads registration data, verifies WhatsApp, updates Borrow Score
- Push notification: "Your profile is now live! Join activities in Block 3 and beyond."

---

## ACCESSIBILITY & LOCALIZATION

### Language Support (Future Phase)

**Current Launch: English Only**
- Botswana's official language; widely understood in urban/rural areas

**Planned Expansion (Phase 2):**
- Setswana translations (local language—increases village adoption)
- Key UI elements translated: Buttons, error messages, onboarding instructions
- Activity Pages remain English (most content user-generated)

**Translation Priority:**
1. Onboarding screens (high impact for first impressions)
2. Super Search filters (critical for discovery)
3. Guardian Dashboard (child safety communication)
4. Settings Menu (configuration clarity)

### Assistive Features

**Visual Impairments:**
- High-contrast mode (black text on white, orange accent buttons)
- Font size adjustments (Settings → Display → Text Size: Small/Medium/Large)
- Screen reader compatibility (Android TalkBack support)

**Low Literacy Support:**
- Icon-based navigation (vector icons for Sports, Hobbies, Leisure)
- Voice input for search (tap microphone icon → speak query)
- Simplified language (avoid jargon—e.g., "Join" not "RSVP")

**Data-Scarce Users:**
- Data Saver Mode (Settings → Data & Offline Sync → Toggle ON)
- Text-only icons (no image thumbnails)
- Manual sync (user controls when to consume data)

---

## CONCLUSION

The Mizano onboarding flow is designed to be **fast, data-light, and contextually aware**—respecting Botswana's digital reality while building trust through progressive disclosure. By allowing users to explore as Browsers first, then upgrading incrementally (User → Player → Guardian → Creator), we reduce friction and increase commitment over time.

**Key Success Metrics:**
- **Browser-to-User Conversion:** Target 30% within first session (Sign-Up prompt after 30 seconds)
- **User-to-Player Upgrade:** Target 50% within 7 days (Driven by competitive match joins)
- **Guardian Approval Rate:** Target 90% within 48 hours (WhatsApp notifications + Security Log transparency)
- **School Adoption:** Target 20 schools by Month 6 (Free for rural/government—high value proposition)

**Next Steps:**
1. Wireframe all 12 onboarding flows (visual design for each step)
2. Build offline-first form logic (local storage + sync every 15 min)
3. Integrate WhatsApp/Facebook verification APIs (wa.me, Graph API)
4. Test Guardian-School handshake with pilot schools (2-3 in Gaborone)
5. Create QR codes for 5 pilot Game Cubes (Block 3, Broadhurst, etc.)

---

**Document Owner:** Mizano Founding Team  
**Last Updated:** February 11, 2026  
**Version:** 1.0  
**Status:** Foundation Document (For Developer Handoff & User Testing)
