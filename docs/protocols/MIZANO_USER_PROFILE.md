# MIZANO USER PROFILE & CAPABILITY ARCHITECTURE

## 1. CORE ARCHITECTURE: THE CAPABILITY LAYER

Mizano does not use separate "Profile Types" in the traditional sense. Instead, every user is a single entity (**UID**) with a set of **Capabilities**.

### 1.1 Capability Definition
A "Capability" is a boolean flag or a data object that unlocks specific platform functionalities. 

- **Browser (Default)**: Can search and view public activities.
- **User (Standard)**: Can favorite items and join social (non-competitive) activities.
- **Player**: Unlocks the "Sports CV", "Medical History", and "Competitive Join".
- **Mentor**: Unlocks the ability to lead sessions and be discovered by schools.
- **Guardian**: Unlocks the "Guardian Dashboard" and control over linked minors.
- **Creator**: Unlocks the "Event Lab" and monetization tools.
- **Staff/Admin**: Unlocks moderation and institutional oversight tools.

> [!IMPORTANT]
> A single UID can simultaneously hold all capabilities (e.g., a Teacher who is a Player, a Guardian, and an Event Creator).

---

## 2. THE THREE-WAY HANDSHAKE (SAFETY PROTOCOL)

For users under the age of 16 (U16), participation in competitive or institutional activities requires a "Three-Way Handshake" between the **Guardian**, the **Educational Institution (School)**, and the **Mizano Platform**.

### 2.1 Handshake Workflow
1. **School Linkage**: The Student (U16) or Guardian selects their school.
2. **Guardian Verification**: The Guardian confirms the linkage on their dashboard.
3. **Platform Sync**: Mizano verifies the school's "Safety Badge" status.

### 2.2 Hard-Block Logic
- **Constraint**: U16 users are **HARD-BLOCKED** from joining any "Competitive" category match unless `GuardianApprovalStatus == "Approved"`.
- **Enforcement**: This is checked at the API level before adding a UID to `match_rosters`.

---

## 3. ACADEMIC ALERT & GOVERNANCE

Mizano integrates with school performance via the **AcademicAlert** system.

### 3.1 Data Mapping
| System | Column | Logic |
|---|---|---|
| **Google Sheets** | `AR` (and `AZ` for redundancy) | `TRUE` = Alert Active |
| **IndexedDB** | `academic_alert` | Boolean |

### 3.2 Alert Enforcement
If `AcademicAlert == TRUE`:
- The user can still browse and view "About Us" or "Lessons".
- The user is **BLOCKED** from joining new "Matches" or "Tournaments".
- Existing joins for future dates are marked as "Paused" in the UI with a Pink (Engagement/Urgency) status border.

---

## 4. SECURITY & PRIVACY AUDIT

### 4.1 Profile View Logging
Every time a profile is viewed by an **Association** or **Creator** capability, a record MUST be written to the **Security Log**.
- **Data Captured**: `Viewer_UID`, `Target_UID`, `Timestamp`, `Context` (e.g., "Scouting for Tournament").
- **Guardian Visibility**: Guardians can view this log for their linked minors at any time.

### 4.2 Medical Data (The Privacy Wall)
- Medical records (blood type, allergies, HIV status) are **LOCAL ONLY**.
- They are NEVER synced to Google Sheets.
- They are only visible to the user and their linked Guardian.
