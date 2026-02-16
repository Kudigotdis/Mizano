# GOOGLE SHEETS STRUCTURE GUIDE
**Mizano Backend Database Architecture**  
**Version: 1.5 | February 2026**

---

## EXECUTIVE OVERVIEW

This document defines the **Master Google Sheets Schema** for Mizano's backend database. Unlike traditional apps that use SQL/NoSQL, Mizano leverages **Google Sheets API v4** for:

1. **Lightweight Infrastructure:** No expensive database hosting; accessible via Google Drive
2. **Offline-First Syncing:** 15-minute intervals for roster/ledger updates
3. **Real-Time Collaboration:** Multiple Staff/Admins can view/edit simultaneously
4. **Low-Data Access:** API calls are minimal (~2-5KB per sync)
5. **Audit Trail:** Built-in version history via Google Sheets
6. **Research Monetization:** Structured data enables demographic/health/city planning analytics

### Critical Design Philosophy

**"Data is Community Gold"**

Every field serves **dual purposes:**
- **Operational:** Powers features (e.g., BorrowScore, Guardian approvals, call-outs)
- **Research Value:** Anonymized aggregations sold to businesses, institutions, government for city planning, health research, community development

**Privacy by Design:**
- Personal data (names, WhatsApp, health) **NEVER** sold individually
- Only **anonymized aggregate queries** (e.g., "% of Block 3 residents playing soccer weekly")
- Guardian-controlled opt-ins for minors' data in research datasets

---

## MASTER SHEETS ARCHITECTURE

### Multi-Sheet Workbook Structure

The Mizano backend uses **ONE master Google Sheets workbook** with **12 separate sheets** (tabs):

| Sheet # | Sheet Name | Primary Purpose | Row Count (Estimate) |
|---------|------------|-----------------|----------------------|
| 1 | **Profiles_Master** | All 12 profile types (Browser → Admin) | 50,000+ |
| 2 | **Activities_Master** | Events, matches, leagues (212+ integrated) | 100,000+ |
| 3 | **Hobbies_Master** | 300+ District-wide profiles | 30,000+ |
| 4 | **Sponsorships** | Sponsor-a-Game campaigns, progress | 5,000+ |
| 5 | **Venues_Listings** | Fields, courts, halls (free + paid) | 2,000+ |
| 6 | **Bulletin_Posts** | Community notices, jobs, lost items | 20,000+ |
| 7 | **School_Data** | Students, classes, inter-house leagues | 15,000+ |
| 8 | **Guardian_Approvals** | Minor handshakes, security logs | 10,000+ |
| 9 | **Streams_Media** | Facebook Live links, fan submissions | 8,000+ |
| 10 | **Analytics_Snapshots** | Daily/weekly aggregates for research | 500+ |
| 11 | **Transactions_Logs** | Payment records (5% commissions) | 10,000+ |
| 12 | **System_Config** | App settings, village waivers, toggles | 100 |

**Total Workbook Size:** ~250,000 rows across 12 sheets  
**Sync Strategy:** Profiles/Activities sync every 15 min; Ledger/Bulletin sync every 5 min; Analytics batch daily

---

## SHEET 1: PROFILES_MASTER

**Purpose:** Central registry for all 12 profile types with demographic, health, and engagement data

### Column Schema (AZ = 52 columns)

| Col | Field Name | Data Type | Required | Purpose | Research Value |
|-----|------------|-----------|----------|---------|----------------|
| **A** | ProfileID | String (UUID) | ✓ | Unique identifier (e.g., "USR-GAB-B3-00123") | Primary key for joins |
| **B** | ProfileType | Enum | ✓ | Browser \| User \| Player \| Mentor \| Guardian \| Creator \| Group/Club \| Business \| Association \| Staff \| Admin \| Educational Institution | Segmentation for demographics |
| **C** | FullName | String | ✓ | Display name | *Not used in research* |
| **D** | DateOfBirth | Date (YYYY-MM-DD) | ✓ (User+) | Age verification; U16 flagging | **Age distribution analytics** |
| **E** | Gender | Enum | ✓ (User+) | Male \| Female \| Non-Binary \| Prefer Not to Say | **Gender participation rates** |
| **F** | VillageTownCity | String | ✓ | Gaborone, Molepolole, Francistown, etc. | **Geographic activity mapping** |
| **G** | AreaNeighborhood | String | ✓ | Block 3, Broadhurst, Extension 10, etc. | **Hyper-local heatmaps** |
| **H** | WhatsAppNumber | String (+267...) | ✓ (User+) | International format for wa.me links | *Not used in research* |
| **I** | FBPageLink | URL | ○ | Official Facebook Business/Association page | Trust verification |
| **J** | GroupChatURL | URL | ○ | WhatsApp Team/Class group invite | Team connectivity tracking |
| **K** | PreFillMessage | Text | ○ | Custom "WhatsApp Organizer" message | Communication efficiency |
| **L** | IsPaidProfile | Boolean | ✓ | TRUE if subscription required | Revenue segmentation |
| **M** | VillageWaiverActive | Boolean | ✓ | TRUE if rural free access granted | **Village support metrics** |
| **N** | SubscriptionStatus | Enum | ✓ (Paid) | Active \| Expired \| Waived | Churn tracking |
| **O** | MonthlyFee | Number (Pula) | ○ | P0-200 depending on tier | Revenue forecasting |
| **P** | BorrowScore | Number (1-5) | ○ | Average return ratings (weighted) | **Community trust index** |
| **Q** | BorrowHistory | JSON Array | ○ | `[{ItemID, Date, Rating}]` | Equipment demand patterns |
| **R** | FavoritesActivityIDs | JSON Array | ○ | Gold-starred activity IDs | Interest clustering |
| **S** | HealthNotes | Text | ○ (Player) | Allergies, asthma, diabetes | **Health prevalence data** |
| **T** | InjuryLog | JSON Array | ○ (Player) | `[{Date, Type, Severity}]` | **Sports injury trends** |
| **U** | FitnessLevel | Enum | ○ (Player) | Beginner \| Intermediate \| Advanced \| Elite | Skill distribution |
| **V** | Achievements | JSON Array | ○ | Trophies, certifications | Talent pipeline tracking |
| **W** | SchoolID | String | ○ (Student) | Links to Educational Institution | School participation rates |
| **X** | GradeYear | String | ○ (Student) | Grade 7, Form 3, etc. | Age-grade activity alignment |
| **Y** | TeacherLead | ProfileID | ○ (Student) | Teacher/Coach managing student | School oversight |
| **Z** | HouseColor | String | ○ (Student) | Red, Blue, Yellow, Green | Inter-house engagement |
| **AA** | NationalLeagueID | String | ○ | Links to BFA/National School League | Competitive pathway tracking |
| **AB** | AcademicAlert | Boolean | ○ (Student) | TRUE = Guardian pauses joins for grades | **Academic-sport balance data** |
| **AC** | GuardianProfileID | ProfileID | ✓ (U16) | Links minor to Guardian | Child safety compliance |
| **AD** | GuardianApprovalStatus | Enum | ✓ (U16) | Pending \| Approved \| Denied | Approval funnel metrics |
| **AE** | SecurityLog | JSON Array | ○ (Guardian) | `[{Timestamp, ViewerID}]` | Scouting transparency |
| **AF** | MentorVisibility | Boolean | ○ (Mentor) | TRUE = discoverable | Mentor supply tracking |
| **AG** | MenteeTally | Number | ○ (Mentor) | Count of active mentees | Mentorship impact |
| **AH** | EventsCreatedCount | Number | ○ (Creator+) | Total events organized | Organizer productivity |
| **AI** | SponsorshipsInitiated | JSON Array | ○ | `[{EventID, Goal, Raised}]` | Fundraising effectiveness |
| **AJ** | WishlistEquipment | JSON Array | ○ (Club) | `[{Item, Quantity, Priority}]` | Equipment gaps |
| **AK** | NewsFlashPosts | JSON Array | ○ (Assoc) | `[{Timestamp, Content}]` | Institutional engagement |
| **AL** | VerifiedTournaments | JSON Array | ○ (Assoc) | `[{TournamentID, Date}]` | Competitive ecosystem |
| **AM** | PlayerTalliesAccessed | Number | ○ (Assoc) | Scouting queries made | Talent discovery metrics |
| **AN** | BusinessListingType | Enum | ○ (Business) | Shop \| Clinic \| Gym \| Physio | Service distribution |
| **AO** | AdCampaignActive | Boolean | ○ (Business) | TRUE if WebP ads running | Ad effectiveness |
| **AP** | VenueID | String | ○ (Business) | If bookable space offered | Venue utilization |
| **AQ** | VenueBroadcastingEnabled | Boolean | ○ | TRUE = 5% commission model | Revenue streams |
| **AR** | InstantBookEnabled | Boolean | ○ | TRUE = 10% commission | Premium bookings |
| **AS** | StudentBulkUploadDate | Timestamp | ○ (School) | Last upload | School engagement |
| **AT** | TeacherSubProfiles | JSON Array | ○ (School) | `[{TeacherID, Name}]` | Educator involvement |
| **AU** | StaffGameCubeID | String | ○ (Staff) | Assigned Game Cube | Regional operations |
| **AV** | LedgerSyncLastTime | Timestamp | ○ (Staff) | Last offline sync | Sync reliability |
| **AW** | ModerationCount | Number | ○ (Staff) | Total moderations | Staff workload |
| **AX** | AdminAccessLevel | Enum | ○ (Admin) | Full \| Financial \| Analytics | Permission control |
| **AY** | VillageWaiverGrantedCount | Number | ○ (Admin) | Total waivers approved | Community investment |
| **AZ** | ResponsibleGamblingToggle | Boolean | ✓ | FALSE = betting hidden (default) | Gambling awareness adoption |
| **BA** | CreatedTimestamp | Timestamp | ✓ | Profile creation date | Growth tracking |
| **BB** | LastLoginTimestamp | Timestamp | ✓ | Last app access | **Engagement patterns** |
| **BC** | TotalActivitiesJoined | Number | ✓ | Lifetime participation count | **Activity retention** |
| **BD** | PreferredSports | JSON Array | ○ | `["Soccer", "Chess"]` | **Sport popularity** |
| **BE** | TransportMethod | Enum | ○ | Walking \| Bicycle \| Combi \| Car \| None | **City planning: transport** |
| **BF** | HouseholdSize | Number | ○ | Number of people in home | **Demographic insights** |
| **BG** | EmploymentStatus | Enum | ○ | Employed \| Student \| Unemployed \| Self-Employed | **Economic profiling** |
| **BH** | MonthlyIncome | Enum | ○ | <P1000 \| P1000-3000 \| P3000-5000 \| >P5000 | **Income-activity correlation** |
| **BI** | DataBundleType | Enum | ○ | Social \| General \| None | **Digital divide tracking** |
| **BJ** | DeviceType | Enum | ✓ | Android \| iOS | Platform optimization |
| **BK** | OfflineUsagePercent | Number (0-100) | ✓ | % of sessions offline | **Connectivity gaps** |
| **BL** | ResearchOptIn | Boolean | ✓ | TRUE = data can be anonymized for research | Privacy compliance |

**Total Columns: 64 (A-BL)**

### Research Data Examples (Anonymized Queries)

**Example 1: City Planning**
```
Query: "% of Block 3 residents using Walking as TransportMethod to activities"
Output: 67% (n=1,234 profiles)
Use Case: Government plans pedestrian infrastructure
```

**Example 2: Health Research**
```
Query: "Prevalence of Asthma in HealthNotes among U13 soccer players in Gaborone"
Output: 8.3% (n=2,450 students)
Use Case: School sports safety guidelines
```

**Example 3: Community Development**
```
Query: "Average HouseholdSize in villages with VillageWaiverActive vs. cities"
Output: Villages=5.2, Cities=3.8
Use Case: NGO targets family-oriented programs
```

**Example 4: Economic Impact**
```
Query: "Correlation between MonthlyIncome and TotalActivitiesJoined"
Output: <P1000 = 2.1 activities/month; >P5000 = 3.7 activities/month
Use Case: Businesses target pricing strategies
```

---

## SHEET 2: ACTIVITIES_MASTER

**Purpose:** All events, matches, leagues, and activities across 9 dynamic states

### Column Schema (60 columns)

| Col | Field Name | Data Type | Required | Purpose | Research Value |
|-----|------------|-----------|----------|---------|----------------|
| **A** | ActivityID | String (UUID) | ✓ | Unique identifier (e.g., "ACT-GAB-SOC-001") | Primary key |
| **B** | ActivityType | Enum | ✓ | Sports \| Hobbies \| Leisure \| Lessons \| Events \| Groups | **Category popularity** |
| **C** | SpecificSport | Enum | ○ | Soccer, Chess, Volleyball, etc. | Sport demand |
| **D** | ActivityState | Enum | ✓ | Active Soon \| Active Now \| Passed \| Pending \| Full \| Cancelled \| Proposed \| Archived \| Exclusive | Lifecycle tracking |
| **E** | CreatorProfileID | ProfileID | ✓ | Links to Profile_Master | Organizer analytics |
| **F** | OrganizerType | Enum | ✓ | Creator \| Group/Club \| School \| Association | Institutional vs. individual |
| **G** | EventTitle | String | ✓ | Display name (e.g., "U15 Soccer Match") | Searchability |
| **H** | EventDescription | Text | ✓ | Details, rules, notes | Content analysis |
| **I** | VillageTownCity | String | ✓ | Location | **Geographic distribution** |
| **J** | AreaNeighborhood | String | ✓ | Specific area | Hyper-local heatmaps |
| **K** | VenueID | String | ○ | Links to Venues_Listings | Venue utilization |
| **L** | VenueName | String | ✓ | Display name | Venue popularity |
| **M** | IndoorOutdoor | Enum | ✓ | Indoor \| Outdoor | Weather dependency |
| **N** | OfflineMapCoordinates | String | ○ | Lat,Long for 1MB map tiles | Offline navigation |
| **O** | StartDate | Date | ✓ | YYYY-MM-DD | Seasonality patterns |
| **P** | StartTime | Time | ✓ | HH:MM (24h) | **Peak activity hours** |
| **Q** | DurationMinutes | Number | ✓ | Total length | Time commitment |
| **R** | RecurringSchedule | JSON | ○ | `{Frequency: "Weekly", DayOfWeek: "Saturday"}` | Recurring engagement |
| **S** | MaxParticipants | Number | ✓ | Capacity | Demand vs. supply |
| **T** | CurrentParticipants | Number | ✓ | Enrolled count | Fill rate |
| **U** | WaitlistCount | Number | ○ | If Full state | Unmet demand |
| **V** | ParticipantIDs | JSON Array | ✓ | `[ProfileID1, ProfileID2...]` | Roster tracking |
| **W** | CallOutActive | Boolean | ✓ | TRUE = needs players | **Matchmaking gaps** |
| **X** | CallOutPositions | JSON Array | ○ | `["Goalie", "Defender"]` | Position demand |
| **Y** | CompetitiveLevel | Enum | ○ | Casual \| Competitive \| Elite | Skill segmentation |
| **Z** | AgeGroup | Enum | ○ | U13 \| U15 \| U18 \| Adult \| Senior | Age-appropriate activities |
| **AA** | GenderRestriction | Enum | ✓ | Mixed \| Male \| Female \| None | Inclusivity tracking |
| **AB** | CostPula | Number | ✓ | P0-500; P0 = free | **Pricing accessibility** |
| **AC** | EquipmentRequired | JSON Array | ○ | `["Soccer Ball", "Cleats"]` | Equipment needs |
| **AD** | EquipmentProvided | Boolean | ✓ | TRUE = no bring-your-own | Barrier reduction |
| **AE** | StreamsEnabled | Boolean | ✓ | TRUE = fans can submit FB Live | Social engagement |
| **AF** | StreamLinks | JSON Array | ○ | `[{Name, URL, Platform}]` | Streaming adoption |
| **AG** | WeatherCondition | Enum | ○ (Outdoor) | Sunny \| Rainy \| Windy \| Hot | Weather impact |
| **AH** | WeatherAlertSent | Boolean | ○ | TRUE if conditions changed | Communication effectiveness |
| **AI** | SponsorshipActive | Boolean | ✓ | TRUE = Sponsor-a-Game live | Funding reliance |
| **AJ** | SponsorshipGoalPula | Number | ○ | Target amount | Fundraising goals |
| **AK** | SponsorshipRaisedPula | Number | ○ | Current total | Funding progress |
| **AL** | SponsorIDs | JSON Array | ○ | `[ProfileID1, ProfileID2...]` | Donor engagement |
| **AM** | FirstAidAvailable | Boolean | ✓ | TRUE = on-site or nearby clinic | **Safety infrastructure** |
| **AN** | InjuryReported | Boolean | ✓ | TRUE if incident occurred | Incident rate tracking |
| **AO** | InjuryDetails | Text | ○ | Type, severity | Injury analysis |
| **AP** | RefereeProfileID | ProfileID | ○ | If competitive match | Referee coverage |
| **AQ** | RefereeRating | Number (1-5) | ○ | Post-match fairness score | Officiating quality |
| **AR** | SpectatorCheckIns | Number | ✓ | Count via "I'm Here" taps | **Audience size** |
| **AS** | FeedbackSubmitted | Number | ✓ | Post-event surveys | Satisfaction metrics |
| **AT** | AverageFeedbackScore | Number (1-5) | ○ | Aggregate rating | Quality benchmarks |
| **AU** | CancellationReason | Text | ○ (Cancelled) | Weather, no-shows, etc. | Failure analysis |
| **AV** | RescheduledToActivityID | ActivityID | ○ (Cancelled) | Links to new event | Retention tracking |
| **AW** | NationalLeagueID | String | ○ | If official tournament | Competitive pathway |
| **AX** | SchoolID | String | ○ | If inter-house/school match | School participation |
| **AY** | HouseColors | JSON Array | ○ | `["Red", "Blue"]` | House rivalry engagement |
| **AZ** | WinnerProfileID | ProfileID | ○ (Passed) | If competitive | Talent identification |
| **BA** | MatchStatsJSON | JSON | ○ (Passed) | `{Goals, Assists, Fouls}` | **Performance analytics** |
| **BB** | RecapPhotoLinks | JSON Array | ○ (Passed) | `[FB_URL1, FB_URL2...]` | Community memory |
| **BC** | ArchiveReason | Text | ○ (Archived) | Dormant, seasonal | Revival insights |
| **BD** | ProposedByProfileID | ProfileID | ○ (Proposed) | Idea originator | Community ideation |
| **BE** | ProposalUpvotes | Number | ○ (Proposed) | Community votes | Demand validation |
| **BF** | ExclusiveInviteOnly | Boolean | ✓ | TRUE if private group | Privacy tracking |
| **BG** | CreatedTimestamp | Timestamp | ✓ | Event creation | **Activity creation trends** |
| **BH** | LastModifiedTimestamp | Timestamp | ✓ | Last edit | Update frequency |
| **BI** | SyncedOfflineCount | Number | ✓ | Bluetooth sign-ups offline | **Offline engagement** |
| **BJ** | ViewCount | Number | ✓ | Total Activity Page views | Interest levels |

**Total Columns: 62 (A-BJ)**

### Research Data Examples

**Example 1: Peak Activity Hours**
```
Query: "Distribution of StartTime for Soccer activities in Gaborone"
Output: 60% between 16:00-18:00 (after school/work)
Use Case: Venue scheduling optimization
```

**Example 2: Injury Trends**
```
Query: "InjuryReported rate by SpecificSport and AgeGroup"
Output: Soccer U15 = 4.2%; Volleyball Adult = 1.8%
Use Case: Sports insurance pricing
```

**Example 3: Transport Planning**
```
Query: "Average SpectatorCheckIns by AreaNeighborhood and TransportMethod"
Output: Block 3 (Walking) = 45 spectators; Extension 10 (Combi) = 12
Use Case: City plans for public transport to parks
```

---

## SHEET 3: EQUIPMENT_LEDGER

**Purpose:** Track borrowing, check-in/out, Borrow Scores, and equipment demand

### Column Schema (30 columns)

| Col | Field Name | Data Type | Required | Purpose | Research Value |
|-----|------------|-----------|----------|---------|----------------|
| **A** | LedgerID | String (UUID) | ✓ | Unique transaction ID | Primary key |
| **B** | ItemID | String | ✓ | Equipment identifier (e.g., "BALL-SOC-001") | Asset tracking |
| **C** | ItemName | String | ✓ | Soccer Ball, Chess Board, Volleyball | **Equipment demand** |
| **D** | ItemCategory | Enum | ✓ | Sports \| Games \| Books \| Other | Category popularity |
| **E** | ItemDescription | Text | ✓ | Condition, specs | Quality tracking |
| **F** | ItemPhoto | URL | ○ | Image link | Visual verification |
| **G** | BorrowPricePula | Number | ✓ | P0-50 per session | Pricing models |
| **H** | OwnerProfileID | ProfileID | ✓ | Links to Profile_Master | Lender identity |
| **I** | OwnerType | Enum | ✓ | Staff (Cube) \| Group/Club \| Individual | Ownership models |
| **J** | GameCubeLocation | String | ○ | Block 3 Hub, Broadhurst Center | **Equipment distribution** |
| **K** | BorrowerProfileID | ProfileID | ✓ | Links to Profile_Master | Borrower identity |
| **L** | CheckOutTimestamp | Timestamp | ✓ | When borrowed | Usage patterns |
| **M** | CheckInTimestamp | Timestamp | ○ | When returned (NULL if active) | Return compliance |
| **N** | DurationHours | Number | ○ | Calculated or estimated | Usage duration |
| **O** | BorrowerRating | Number (1-5) | ○ | Lender rates borrower | Trust metric |
| **P** | LenderRating | Number (1-5) | ○ | Borrower rates lender | Quality metric |
| **Q** | ItemConditionBefore | Enum | ✓ | New \| Good \| Fair \| Poor | Pre-check state |
| **R** | ItemConditionAfter | Enum | ○ | New \| Good \| Fair \| Poor \| Damaged | Post-check state |
| **S** | SchoolID | String | Unique ID of the linked Educational Institution. | Academic/Sports alignment. |
| **T** | GradeYear | String | Current academic level (e.g., `Standard 7`). | Cohort tracking. |
| **U** | TeacherLead | String | Name/ID of PE or supervising staff. | Accountability. |
| **V** | HouseColor | String | Internal school team color. | Engagement. |
| **W** | NationalLeagueID | String | ID for association-level competitive play. | Pro scouting. |
| **X** | AcademicAlert | Boolean | failing grade? -> triggers "Play Only if Pass". | Balancing sport/education. |
| **Y** | WhatsAppNumber | String | Deep-linking connectivity for zero-rated use. | Low-data comms. |
| **Z** | FBPageLink | String | URL to entity Facebook Presence. | Ecosystem data. |
| **AA** | GroupChatURL | URL | WhatsApp/FB Group invitation link. | Community coordination. |
| **AB** | PreFillMessage | String | The text that auto-populates when clicking links. | Zero-rated UX. |
| **AC** | CreatedTimestamp | Timestamp | ✓ | Ledger entry creation | Transaction history |
| **AD** | BorrowerBorrowScore | Number (1-5) | ✓ | Current score at borrow | Score evolution |

**Total Columns: 30 (A-AD)**

### Borrow Score Algorithm (Research-Driven)

```
BorrowScore = (ΣRatings / TotalBorrows) * FrequencyWeight

FrequencyWeight:
- 1-5 borrows: 1.0
- 6-15 borrows: 1.1 (bonus for consistency)
- 16+ borrows: 1.2 (super-user bonus)

Penalties:
- DamageReported: -0.5 per incident
- DisputeActive: -0.3 per dispute
- Late return (>24hrs): -0.2

Restrictions:
- Score <2.5: Max 1 item at a time
- Score <2.0: Requires Staff override
- Score <1.5: Borrowing suspended
```

### Research Data Examples

**Example 1: Equipment Gaps**
```
Query: "Most borrowed ItemName by AreaNeighborhood"
Output: Block 3 = Soccer Balls (312/month); Broadhurst = Volleyballs (187/month)
Use Case: NGO donates equipment to high-demand areas
```

**Example 2: Damage Trends**
```
Query: "DamageReported rate by ItemCategory and BorrowerAge"
Output: Sports (U13) = 8.5%; Games (Adult) = 2.1%
Use Case: Insurance pricing models
```

---

## SHEET 4: SPONSORSHIPS

**Purpose:** Sponsor-a-Game campaigns, progress tracking, 5% commission logs

### Column Schema (25 columns)

| Col | Field Name | Data Type | Required | Purpose | Research Value |
|-----|------------|-----------|----------|---------|----------------|
| **A** | SponsorshipID | String (UUID) | ✓ | Unique campaign ID | Primary key |
| **B** | ActivityID | ActivityID | ✓ | Links to Activities_Master | Event connection |
| **C** | InitiatorProfileID | ProfileID | ✓ | Creator/Club who started | Organizer reliance |
| **D** | GoalType | Enum | ✓ | Money \| Equipment \| Other | Need categorization |
| **E** | GoalAmountPula | Number | ○ (Money) | Target funding | Funding goals |
| **F** | GoalEquipment | JSON Array | ○ (Equipment) | `[{Item, Quantity}]` | Equipment needs |
| **G** | GoalOtherDescription | Text | ○ (Other) | Venue time, transport | Creative needs |
| **H** | CurrentAmountPula | Number | ✓ | Raised so far | Progress tracking |
| **I** | CurrentEquipmentJSON | JSON | ○ | `{Item: Quantity}` | In-kind contributions |
| **J** | SponsorIDs | JSON Array | ✓ | `[ProfileID1, ProfileID2...]` | Donor list |
| **K** | ContributionsJSON | JSON Array | ✓ | `[{SponsorID, Amount, Type}]` | Donation details |
| **L** | MizanoCommissionPula | Number | ✓ | 5% of monetary donations | **Revenue tracking** |
| **M** | CommissionPaidStatus | Enum | ✓ | Pending \| Paid \| Waived | Payment reconciliation |
| **N** | PaymentMethod | Enum | ○ | MTN \| Orange \| PayPal | Payment preferences |
| **O** | CampaignStatus | Enum | ✓ | Active \| Funded \| Failed \| Cancelled | Success rate |
| **P** | DeadlineDate | Date | ✓ | Fundraising end date | Urgency impact |
| **Q** | SuccessPercentage | Number (0-100) | ✓ | (Current / Goal) * 100 | **Funding effectiveness** |
| **R** | SponsorRecognitionJSON | JSON Array | ○ | `[{SponsorID, Badge, Shoutout}]` | Incentive tracking |
| **S** | VillageTownCity | String | ✓ | Location | **Geographic funding patterns** |
| **T** | AreaNeighborhood | String | ✓ | Specific area | Hyper-local giving |
| **U** | CampaignSharesCount | Number | ✓ | Facebook shares | Viral reach |
| **V** | CreatedTimestamp | Timestamp | ✓ | Campaign start | Fundraising timelines |
| **W** | FundedTimestamp | Timestamp | ○ | Goal reached | Time-to-success |
| **X** | CancelledReason | Text | ○ (Cancelled) | Why failed | Failure analysis |
| **Y** | SuccessStoryText | Text | ○ (Funded) | Impact description | Community storytelling |

**Total Columns: 25 (A-Y)**

### Research Data Examples

**Example 1: Funding Patterns**
```
Query: "Average GoalAmountPula by VillageTownCity and SuccessPercentage"
Output: Villages (P250 avg, 78% success); Cities (P500 avg, 62% success)
Use Case: NGOs adjust campaign strategies
```

**Example 2: Donor Demographics**
```
Query: "% of SponsorIDs by ProfileType (Business vs. Individual)"
Output: Businesses = 32%; Individuals = 68%
Use Case: Business partnerships targeting
```

---

## SHEET 5: VENUES_LISTINGS

**Purpose:** Fields, courts, halls (free listings + paid broadcasting)

### Column Schema (35 columns)

| Col | Field Name | Data Type | Required | Purpose | Research Value |
|-----|------------|-----------|----------|---------|----------------|
| **A** | VenueID | String (UUID) | ✓ | Unique identifier | Primary key |
| **B** | VenueName | String | ✓ | Display name | Searchability |
| **C** | VenueType | Enum | ✓ | Field \| Court \| Hall \| Gym \| Pool | **Venue availability** |
| **D** | IndoorOutdoor | Enum | ✓ | Indoor \| Outdoor \| Both | Weather dependency |
| **E** | OwnerProfileID | ProfileID | ✓ | Links to Profile_Master | Ownership tracking |
| **F** | OwnerType | Enum | ✓ | Business \| School \| Government \| Private | Ownership models |
| **G** | VillageTownCity | String | ✓ | Location | Geographic distribution |
| **H** | AreaNeighborhood | String | ✓ | Specific area | Hyper-local mapping |
| **I** | AddressFull | Text | ✓ | Street address | Accessibility |
| **J** | OfflineMapCoordinates | String | ○ | Lat,Long | Offline navigation |
| **K** | CapacityPlayers | Number | ✓ | Max participants | Size segmentation |
| **L** | CapacitySpectators | Number | ○ | Viewing capacity | Audience potential |
| **M** | AmenitiesJSON | JSON Array | ✓ | `["Changing Room", "Parking"]` | Facility quality |
| **N** | EquipmentProvidedJSON | JSON Array | ○ | `["Balls", "Nets"]` | Equipment availability |
| **O** | SurfaceType | Enum | ○ | Grass \| Turf \| Court \| Sand | Surface preferences |
| **P** | LightingAvailable | Boolean | ✓ | TRUE if night use possible | **Evening demand** |
| **Q** | AccessibilityFeatures | JSON Array | ○ | `["Wheelchair Ramp", "Braille"]` | Inclusivity tracking |
| **R** | ListingType | Enum | ✓ | Free \| Broadcasting \| Instant Book | Revenue model |
| **S** | PricePerHourPula | Number | ○ (Paid) | Booking cost | Pricing benchmarks |
| **T** | MizanoCommissionPercent | Number | ○ (Paid) | 5% or 10% | Commission structure |
| **U** | BroadcastingEnabled | Boolean | ✓ | TRUE if paid advertising | **Monetization adoption** |
| **V** | InstantBookEnabled | Boolean | ✓ | TRUE if auto-approval | Premium features |
| **W** | AvailabilityScheduleJSON | JSON | ✓ | `{Day: Hours}` | Booking patterns |
| **X** | BookingCount | Number | ✓ | Lifetime bookings | Venue popularity |
| **Y** | AverageUtilizationPercent | Number (0-100) | ✓ | Booked hours / Total hours | **Capacity efficiency** |
| **Z** | ReviewsAverageScore | Number (1-5) | ○ | User feedback | Quality metrics |
| **AA** | ReviewsCount | Number | ✓ | Total reviews | Trust indicators |
| **AB** | FirstAidOnSite | Boolean | ✓ | TRUE if clinic nearby | Safety infrastructure |
| **AC** | ParkingAvailable | Boolean | ✓ | TRUE if parking | Accessibility |
| **AD** | PublicTransportNearby | Boolean | ✓ | TRUE if <500m from combi stop | **Transport planning** |
| **AE** | WhatsAppNumber | String (+267) | ✓ | Contact for bookings | Communication channel |
| **AF** | FBPageLink | URL | ○ | Social media | Trust verification |
| **AG** | PhotosJSON | JSON Array | ○ | `[URL1, URL2...]` | Visual marketing |
| **AH** | CreatedTimestamp | Timestamp | ✓ | Listing creation | Supply growth |
| **AI** | LastBookedTimestamp | Timestamp | ○ | Most recent booking | Activity recency |

**Total Columns: 35 (A-AI)**

### Research Data Examples

**Example 1: Venue Gaps**
```
Query: "VenueType distribution by AreaNeighborhood"
Output: Block 3 = 8 Fields, 2 Courts; Extension 10 = 1 Field, 0 Courts
Use Case: Government infrastructure planning
```

**Example 2: Transport Access**
```
Query: "PublicTransportNearby = TRUE venues vs. BookingCount"
Output: Transport-accessible venues = 2.3x higher bookings
Use Case: City prioritizes transport to parks
```

---

## SHEET 6: BULLETIN_POSTS

**Purpose:** Community notices (jobs, funerals, lost items), moderated by Staff

### Column Schema (20 columns)

| Col | Field Name | Data Type | Required | Purpose | Research Value |
|-----|------------|-----------|----------|---------|----------------|
| **A** | PostID | String (UUID) | ✓ | Unique identifier | Primary key |
| **B** | PostType | Enum | ✓ | Job \| Funeral \| Event \| Lost Item \| General | **Community needs** |
| **C** | PosterProfileID | ProfileID | ✓ | Links to Profile_Master | Poster identity |
| **D** | PostTitle | String | ✓ | Headline | Searchability |
| **E** | PostContent | Text | ✓ | Full description | Content analysis |
| **F** | VillageTownCity | String | ✓ | Location | Geographic targeting |
| **G** | AreaNeighborhood | String | ✓ | Specific area | Hyper-local reach |
| **H** | ContactMethod | Enum | ✓ | WhatsApp \| Facebook \| Phone | Preferred communication |
| **I** | ContactInfo | String | ✓ | Number or link | Direct contact |
| **J** | PhotosJSON | JSON Array | ○ | `[URL1, URL2...]` | Visual content |
| **K** | IsBoostActive | Boolean | ✓ | TRUE if P2 boost paid (Lost Items) | **Boost effectiveness** |
| **L** | BoostPaymentPula | Number | ○ | P2.00 for call-out | Revenue tracking |
| **M** | ViewCount | Number | ✓ | Total views | Reach metrics |
| **N** | QuickApplyCount | Number | ○ (Job) | Tap "Send my Profile" | **Job market activity** |
| **O** | RespondedToPost | Boolean | ✓ | TRUE if item found/job filled | Success rate |
| **P** | ModerationStatus | Enum | ✓ | Approved \| Pending \| Flagged \| Removed | Content safety |
| **Q** | FlaggedByProfileID | ProfileID | ○ | Reporter if inappropriate | Community policing |
| **R** | FlagReason | Text | ○ | Spam, offensive, etc. | Moderation insights |
| **S** | CreatedTimestamp | Timestamp | ✓ | Post creation | Temporal trends |
| **T** | ExpiresTimestamp | Timestamp | ✓ | Auto-archive date (30 days) | Cleanup automation |

**Total Columns: 20 (A-T)**

### Research Data Examples

**Example 1: Job Market**
```
Query: "PostType = Job by VillageTownCity and QuickApplyCount"
Output: Gaborone = 42 jobs, 156 applies; Villages = 8 jobs, 45 applies
Use Case: Government employment programs targeting
```

**Example 2: Lost Items**
```
Query: "PostType = Lost Item and IsBoostActive effectiveness"
Output: Boosted = 72% found; Non-boosted = 34% found
Use Case: Feature promotion
```

---

## SHEET 7: SCHOOL_DATA

**Purpose:** Students, classes, inter-house leagues, Teacher/Coach sub-profiles

### Column Schema (40 columns)

| Col | Field Name | Data Type | Required | Purpose | Research Value |
|-----|------------|-----------|----------|---------|----------------|
| **A** | RecordID | String (UUID) | ✓ | Unique record ID | Primary key |
| **B** | SchoolID | String | ✓ | Links to Profile_Master (School) | School identity |
| **C** | SchoolName | String | ✓ | Display name | Recognition |
| **D** | SchoolType | Enum | ✓ | Primary \| Secondary \| Private \| Government | **School segmentation** |
| **E** | VillageTownCity | String | ✓ | Location | Geographic education mapping |
| **F** | AreaNeighborhood | String | ✓ | Specific area | Catchment analysis |
| **G** | StudentProfileID | ProfileID | ✓ | Links to Profile_Master (Player) | Student identity |
| **H** | StudentFirstName | String | ✓ | First name | *Not research* |
| **I** | StudentLastName | String | ✓ | Last name | *Not research* |
| **J** | DateOfBirth | Date | ✓ | Age verification | **Age-grade alignment** |
| **K** | Gender | Enum | ✓ | Male \| Female \| Non-Binary | Gender participation |
| **L** | GradeYear | String | ✓ | Grade 7, Form 3, etc. | Grade distribution |
| **M** | HouseColor | String | ○ | Red, Blue, Yellow, Green | Inter-house engagement |
| **N** | TeacherLeadProfileID | ProfileID | ○ | Teacher/Coach managing | Educator involvement |
| **O** | GuardianProfileID | ProfileID | ✓ | Links to Guardian | Safety compliance |
| **P** | GuardianApprovalStatus | Enum | ✓ | Pending \| Approved \| Denied | Handshake completion |
| **Q** | EnrollmentDate | Date | ✓ | School start | Tenure tracking |
| **R** | AcademicAlertActive | Boolean | ✓ | TRUE = paused for grades | **Academic-sport balance** |
| **S** | SportsParticipation | JSON Array | ✓ | `["Soccer", "Chess"]` | Sport diversity |
| **T** | PositionsPlayed | JSON Array | ○ | `["Forward", "Defender"]` | Talent mapping |
| **U** | CaptainRoles | JSON Array | ○ | `["U13 Soccer Captain"]` | Leadership tracking |
| **V** | TotalMatchesPlayed | Number | ✓ | Lifetime count | **Engagement metrics** |
| **W** | GoalsScored | Number | ○ | If applicable | Performance stats |
| **X** | AssistsProvided | Number | ○ | If applicable | Team contribution |
| **Y** | YellowCards | Number | ○ | Disciplinary | Behavior tracking |
| **Z** | RedCards | Number | ○ | Serious infractions | Safety concerns |
| **AA** | InjuryCount | Number | ✓ | Total injuries logged | **Injury prevalence** |
| **AB** | HealthNotes | Text | ○ | Allergies, conditions | Health data (opt-in) |
| **AC** | FitnessLevel | Enum | ○ | Beginner \| Intermediate \| Advanced | Skill progression |
| **AD** | Achievements | JSON Array | ○ | Trophies, certifications | Talent identification |
| **AE** | ScoutingInterest | Boolean | ✓ | TRUE if flagged by Association | Recruitment tracking |
| **AF** | ScoutedByProfileIDs | JSON Array | ○ | `[AssociationID1...]` | Scouting activity |
| **AG** | NationalLeagueID | String | ○ | If national competition | Competitive pathway |
| **AH** | InterHouseMatchesPlayed | Number | ✓ | Internal school matches | School engagement |
| **AI** | InterSchoolMatchesPlayed | Number | ✓ | External matches | Competitive exposure |
| **AJ** | WhatsAppBroadcastOptIn | Boolean | ✓ | TRUE if receives school updates | Communication preference |
| **AK** | ParentContactNumber | String (+267) | ✓ | Guardian's WhatsApp | Emergency contact |
| **AL** | ResearchDataOptIn | Boolean | ✓ | TRUE = anonymized use allowed | **Privacy compliance** |
| **AM** | CreatedTimestamp | Timestamp | ✓ | Record creation | Enrollment trends |
| **AN** | LastUpdatedTimestamp | Timestamp | ✓ | Last edit | Activity recency |

**Total Columns: 40 (A-AN)**

### Three-Way Handshake Tracking

The `GuardianApprovalStatus` column combined with `SchoolID`, `StudentProfileID`, and `GuardianProfileID` creates an audit trail:

1. School uploads student → `Pending`
2. Guardian receives notification → logs into app
3. Guardian taps "Approve" → status changes to `Approved`
4. `SecurityLog` in Profile_Master logs this approval

**Research Value:** Track handshake completion rates by SchoolType and VillageTownCity to identify adoption gaps.

### Research Data Examples

**Example 1: Talent Pipeline**
```
Query: "GoalsScored by GradeYear for students with ScoutingInterest = TRUE"
Output: Grade 7 avg = 8.2 goals; Form 3 avg = 14.5 goals
Use Case: National team recruitment optimization
```

**Example 2: Academic-Sport Balance**
```
Query: "AcademicAlertActive rate by TotalMatchesPlayed quartiles"
Output: Low activity (<5 matches) = 12% alerts; High activity (>20 matches) = 6% alerts
Use Case: School policies supporting athlete scholars
```

---

## SHEET 8: GUARDIAN_APPROVALS

**Purpose:** Minor handshakes, security logs, injury alerts, AcademicAlert tracking

### Column Schema (25 columns)

| Col | Field Name | Data Type | Required | Purpose | Research Value |
|-----|------------|-----------|----------|---------|----------------|
| **A** | ApprovalID | String (UUID) | ✓ | Unique record ID | Primary key |
| **B** | GuardianProfileID | ProfileID | ✓ | Links to Profile_Master | Guardian identity |
| **C** | MinorProfileID | ProfileID | ✓ | Links to Profile_Master (Student) | Child identity |
| **D** | ApprovalType | Enum | ✓ | Profile Creation \| Activity Join \| RSVP \| School Link | Request type |
| **E** | ActivityID | ActivityID | ○ | If activity approval | Event link |
| **F** | SchoolID | String | ○ | If school handshake | School connection |
| **G** | RequestTimestamp | Timestamp | ✓ | When approval needed | Response latency |
| **H** | ApprovalTimestamp | Timestamp | ○ | When approved/denied | Decision time |
| **I** | ApprovalStatus | Enum | ✓ | Pending \| Approved \| Denied | **Approval funnel** |
| **J** | DenialReason | Text | ○ (Denied) | Guardian's explanation | Barrier analysis |
| **K** | NotificationMethod | Enum | ✓ | Push \| SMS \| WhatsApp | Preferred channel |
| **L** | NotificationDelivered | Boolean | ✓ | TRUE if sent successfully | Delivery rate |
| **M** | ResponseTimeMinutes | Number | ○ | (Approval - Request) time | **Responsiveness** |
| **N** | SecurityLogViewCount | Number | ✓ | Total profile views by scouts | Scouting transparency |
| **O** | LastViewedByProfileID | ProfileID | ○ | Most recent viewer | Tracking |
| **P** | LastViewedTimestamp | Timestamp | ○ | Most recent view | Recency |
| **Q** | InjuryAlertSent | Boolean | ✓ | TRUE if child injured | **Safety incidents** |
| **R** | InjuryActivityID | ActivityID | ○ | Where injury occurred | Event safety |
| **S** | InjurySeverity | Enum | ○ | Minor \| Moderate \| Severe | Incident severity |
| **T** | InjuryAcknowledged | Boolean | ○ | TRUE if Guardian read alert | Communication effectiveness |
| **U** | AcademicAlertActive | Boolean | ✓ | TRUE if grades low | Academic flagging |
| **V** | AcademicAlertReason | Text | ○ | Teacher notes | Intervention context |
| **W** | AcademicAlertSetByProfileID | ProfileID | ○ | Teacher/Admin who set | Authority tracking |
| **X** | ResearchDataOptIn | Boolean | ✓ | TRUE if child's data anonymized | **Privacy compliance** |
| **Y** | CreatedTimestamp | Timestamp | ✓ | Record creation | Approval history |

**Total Columns: 25 (A-Y)**

### Research Data Examples

**Example 1: Approval Friction**
```
Query: "Average ResponseTimeMinutes by ApprovalType and VillageTownCity"
Output: Activity Join (Villages) = 45 min; Activity Join (Cities) = 18 min
Use Case: Feature optimization for rural connectivity
```

**Example 2: Injury Patterns**
```
Query: "InjuryAlertSent rate by MinorAge and ActivityType"
Output: U13 Soccer = 5.2%; U15 Volleyball = 2.1%
Use Case: Insurance pricing for youth sports
```

---

## SHEET 9: STREAMS_MEDIA

**Purpose:** Facebook Live links, fan submissions, "Active Now" notifications

### Column Schema (20 columns)

| Col | Field Name | Data Type | Required | Purpose | Research Value |
|-----|------------|-----------|----------|---------|----------------|
| **A** | StreamID | String (UUID) | ✓ | Unique stream ID | Primary key |
| **B** | ActivityID | ActivityID | ✓ | Links to Activities_Master | Event connection |
| **C** | SubmittedByProfileID | ProfileID | ✓ | Fan who added link | Submitter identity |
| **D** | SubmitterName | String | ✓ | Display name | Attribution |
| **E** | StreamURL | URL | ✓ | Facebook Live, YouTube, TikTok | Link source |
| **F** | Platform | Enum | ✓ | Facebook \| YouTube \| TikTok \| Other | **Platform preferences** |
| **G** | StreamStatus | Enum | ✓ | Live \| Ended \| Removed | Lifecycle tracking |
| **H** | StartTimestamp | Timestamp | ✓ | When stream began | Timing analysis |
| **I** | EndTimestamp | Timestamp | ○ | When stream ended | Duration tracking |
| **J** | DurationMinutes | Number | ○ | Calculated length | Engagement time |
| **K** | ViewCount | Number | ○ | If platform provides | **Audience size** |
| **L** | LowDataFriendly | Boolean | ✓ | TRUE if Facebook (zero-rated) | Data efficiency |
| **M** | CreatorApprovedToggle | Boolean | ✓ | Event Creator allows submissions | Privacy control |
| **N** | ModerationStatus | Enum | ✓ | Approved \| Pending \| Flagged \| Removed | Content safety |
| **O** | FlaggedByProfileID | ProfileID | ○ | Reporter if inappropriate | Community policing |
| **P** | FlagReason | Text | ○ | Spam, offensive, etc. | Moderation insights |
| **Q** | ThumbnailURL | URL | ○ | Preview image (WebP) | Visual display |
| **R** | TopStreamRanking | Number | ○ | Position in "Playing Now" notification | Prioritization |
| **S** | CreatedTimestamp | Timestamp | ✓ | Submission time | Real-time tracking |
| **T** | NotificationSentCount | Number | ✓ | Push alerts sent | **Notification reach** |

**Total Columns: 20 (A-T)**

### Research Data Examples

**Example 1: Platform Adoption**
```
Query: "Platform distribution for streams by VillageTownCity"
Output: Villages = 92% Facebook; Cities = 68% Facebook, 20% YouTube
Use Case: Data bundle partnerships with telcos
```

**Example 2: Streaming Engagement**
```
Query: "Average ViewCount by SpecificSport and AreaNeighborhood"
Output: Soccer (Block 3) = 87 views; Volleyball (Extension 10) = 34 views
Use Case: Community engagement benchmarks
```

---

## SHEET 10: ANALYTICS_SNAPSHOTS

**Purpose:** Daily/weekly aggregates for research queries (pre-computed for speed)

### Column Schema (50 columns)

| Col | Field Name | Data Type | Required | Purpose | Research Value |
|-----|------------|-----------|----------|---------|----------------|
| **A** | SnapshotID | String (UUID) | ✓ | Unique snapshot ID | Primary key |
| **B** | SnapshotDate | Date | ✓ | Aggregate date | Temporal tracking |
| **C** | SnapshotType | Enum | ✓ | Daily \| Weekly \| Monthly | Granularity |
| **D** | VillageTownCity | String | ✓ | Location filter | Geographic segmentation |
| **E** | AreaNeighborhood | String | ○ | Hyper-local filter | Neighborhood insights |
| **F** | TotalActiveProfiles | Number | ✓ | Profiles with LastLogin <7 days | **Engagement** |
| **G** | NewRegistrations | Number | ✓ | Profiles created in period | Growth |
| **H** | TotalActivitiesCreated | Number | ✓ | Events launched | Supply metrics |
| **I** | TotalActivitiesCompleted | Number | ✓ | Passed state events | Completion rate |
| **J** | TotalParticipations | Number | ✓ | Activity joins | Demand metrics |
| **K** | AverageParticipantsPerActivity | Number | ✓ | Calculated average | Engagement depth |
| **L** | TotalSponsorshipsFunded | Number | ✓ | Campaigns reaching 100% | Fundraising success |
| **M** | TotalPulaRaised | Number | ✓ | Sponsorship money | Economic impact |
| **N** | MizanoCommissionPula | Number | ✓ | 5% total | Revenue tracking |
| **O** | TotalEquipmentBorrows | Number | ✓ | Check-outs in period | Equipment demand |
| **P** | AverageBorrowScore | Number (1-5) | ✓ | Community trust | Trust index |
| **Q** | TotalDamageReports | Number | ✓ | Equipment incidents | Risk metrics |
| **R** | TotalVenueBookings | Number | ✓ | Paid reservations | Venue utilization |
| **S** | AverageVenueUtilization | Number (0-100) | ✓ | % capacity used | **Efficiency** |
| **T** | TotalGuardianApprovals | Number | ✓ | Minor handshakes | Safety compliance |
| **U** | AverageApprovalTimeMinutes | Number | ✓ | Response latency | UX friction |
| **V** | TotalInjuryAlerts | Number | ✓ | Incidents reported | **Safety incidents** |
| **W** | InjuryRatePerActivity | Number | ✓ | (Injuries / Activities) * 100 | Safety benchmarks |
| **X** | TotalStreamsSubmitted | Number | ✓ | Fan livestreams | Social engagement |
| **Y** | FacebookStreamPercent | Number (0-100) | ✓ | % of Platform = Facebook | Data efficiency |
| **Z** | TotalBulletinPosts | Number | ✓ | Community notices | Bulletin activity |
| **AA** | JobPostsCount | Number | ✓ | PostType = Job | **Job market** |
| **AB** | JobQuickAppliesCount | Number | ✓ | Applications sent | Employment seeking |
| **AC** | LostItemsFoundPercent | Number (0-100) | ✓ | Success rate | Community helpfulness |
| **AD** | TotalStudentsEnrolled | Number | ✓ | School_Data records | Education reach |
| **AE** | InterSchoolMatchesCount | Number | ✓ | School competitions | School engagement |
| **AF** | TalentScoutingQueries | Number | ✓ | Association searches | Recruitment activity |
| **AG** | AverageActivityCostPula | Number | ✓ | Mean CostPula | **Affordability** |
| **AH** | FreeActivitiesPercent | Number (0-100) | ✓ | % with P0 cost | Accessibility |
| **AI** | OfflineSignUpsCount | Number | ✓ | Bluetooth joins | **Offline reliance** |
| **AJ** | AverageOfflinePercent | Number (0-100) | ✓ | Mean OfflineUsagePercent | Connectivity gaps |
| **AK** | SocialBundleUsersPercent | Number (0-100) | ✓ | % with DataBundleType = Social | **Digital divide** |
| **AL** | WalkingTransportPercent | Number (0-100) | ✓ | % using Walking | **City planning** |
| **AM** | CombiTransportPercent | Number (0-100) | ✓ | % using Combi | Public transport reliance |
| **AN** | AverageHouseholdSize | Number | ✓ | Mean from profiles | Demographic data |
| **AO** | UnemploymentPercent | Number (0-100) | ✓ | % EmploymentStatus = Unemployed | **Economic indicators** |
| **AP** | LowIncomePercent | Number (0-100) | ✓ | % MonthlyIncome <P1000 | Poverty tracking |
| **AQ** | AgeDistributionJSON | JSON | ✓ | `{U13: 23%, U15: 18%...}` | Age segmentation |
| **AR** | GenderDistributionJSON | JSON | ✓ | `{Male: 52%, Female: 47%}` | Gender parity |
| **AS** | SportPopularityJSON | JSON | ✓ | `{Soccer: 45%, Volleyball: 22%}` | **Sport demand** |
| **AT** | PeakActivityHoursJSON | JSON | ✓ | `{16:00-18:00: 60%}` | **Scheduling insights** |
| **AU** | HealthConditionsJSON | JSON | ✓ | `{Asthma: 8.3%, Diabetes: 2.1%}` | **Health prevalence** |
| **AV** | InjuryTypeDistributionJSON | JSON | ✓ | `{Sprain: 45%, Fracture: 12%}` | Injury patterns |
| **AW** | VillageWaiversGranted | Number | ✓ | Free profiles in villages | Community investment |
| **AX** | BettingToggleOptInPercent | Number (0-100) | ✓ | % ResponsibleGamblingToggle = TRUE | Gambling awareness |
| **AY** | ResearchOptInPercent | Number (0-100) | ✓ | % ResearchOptIn = TRUE | **Privacy compliance** |
| **AZ** | CreatedTimestamp | Timestamp | ✓ | Snapshot generation | Reporting cadence |

**Total Columns: 52 (A-AZ)**

### How Analytics Snapshots Work

**Daily Batch Processing (3 AM Botswana Time):**
1. Google Sheets API queries all 11 other sheets
2. Aggregates data by VillageTownCity and AreaNeighborhood
3. Writes one row per location per day
4. Research partners query THIS sheet (not raw data) for privacy

**Example Research Query:**
```
Business Request: "Show weekly soccer participation trends in Block 3 for Q1 2026"
Mizano Query: SELECT SnapshotDate, SportPopularityJSON->Soccer 
              FROM Analytics_Snapshots 
              WHERE AreaNeighborhood = 'Block 3' 
              AND SnapshotType = 'Weekly' 
              AND SnapshotDate BETWEEN '2026-01-01' AND '2026-03-31'
Output: [Week 1: 342 participants, Week 2: 389 participants...]
Price: P500 for aggregate data (no individual profiles revealed)
```

---

## SHEET 11: TRANSACTIONS_LOGS

**Purpose:** Payment records (5% commissions, venue bookings, sponsorships)

### Column Schema (25 columns)

| Col | Field Name | Data Type | Required | Purpose | Research Value |
|-----|------------|-----------|----------|---------|----------------|
| **A** | TransactionID | String (UUID) | ✓ | Unique payment ID | Primary key |
| **B** | TransactionType | Enum | ✓ | Sponsorship \| Venue Booking \| Lost & Found Boost \| CV Export \| Tournament Suite | Revenue categorization |
| **C** | PayerProfileID | ProfileID | ✓ | Who paid | Customer identity |
| **D** | RecipientProfileID | ProfileID | ○ | If peer-to-peer | Beneficiary |
| **E** | ActivityID | ActivityID | ○ | If event-related | Event link |
| **F** | VenueID | VenueID | ○ | If venue booking | Venue link |
| **G** | SponsorshipID | SponsorshipID | ○ | If campaign donation | Campaign link |
| **H** | AmountPula | Number | ✓ | Total payment | Transaction size |
| **I** | MizanoCommissionPula | Number | ✓ | 5% or 10% | **Revenue tracking** |
| **J** | CommissionPercent | Number | ✓ | 5.0 or 10.0 | Rate applied |
| **K** | NetRecipientPula | Number | ✓ | Amount - Commission | Payout amount |
| **L** | PaymentMethod | Enum | ✓ | MTN Mobile Money \| Orange Money \| PayPal | **Payment preferences** |
| **M** | PaymentStatus | Enum | ✓ | Pending \| Completed \| Failed \| Refunded | Success rate |
| **N** | PaymentReference | String | ✓ | External transaction ID | Reconciliation |
| **O** | VillageTownCity | String | ✓ | Location | **Geographic revenue** |
| **P** | AreaNeighborhood | String | ✓ | Specific area | Hyper-local economics |
| **Q** | VillageWaiverApplied | Boolean | ✓ | TRUE if fee waived | Community subsidy |
| **R** | RefundReason | Text | ○ (Refunded) | Why reversed | Dispute analysis |
| **S** | CreatedTimestamp | Timestamp | ✓ | Transaction time | Temporal patterns |
| **T** | CompletedTimestamp | Timestamp | ○ | When finalized | Processing latency |
| **U** | InvoiceURL | URL | ○ | Receipt link | Record-keeping |
| **V** | TaxApplied | Boolean | ✓ | TRUE if VAT charged | Tax compliance |
| **W** | TaxAmountPula | Number | ○ | VAT amount | Fiscal tracking |
| **X** | CurrencyCode | String | ✓ | BWP (Botswana Pula) | Currency standard |
| **Y** | ExchangeRate | Number | ○ | If USD/ZAR conversion | International payments |

**Total Columns: 25 (A-Y)**

### Research Data Examples

**Example 1: Revenue Streams**
```
Query: "MizanoCommissionPula by TransactionType and VillageTownCity"
Output: Gaborone (Sponsorship) = P12,450; Villages (Sponsorship) = P3,200
Use Case: Revenue forecasting by location
```

**Example 2: Payment Preferences**
```
Query: "PaymentMethod distribution by MonthlyIncome bracket"
Output: <P1000 = 95% MTN Mobile Money; >P5000 = 60% PayPal
Use Case: Payment gateway prioritization
```

---

## SHEET 12: SYSTEM_CONFIG

**Purpose:** App settings, village waivers, toggles, admin controls

### Column Schema (15 columns)

| Col | Field Name | Data Type | Required | Purpose | Research Value |
|-----|------------|-----------|----------|---------|----------------|
| **A** | ConfigID | String (UUID) | ✓ | Unique setting ID | Primary key |
| **B** | ConfigKey | String | ✓ | Setting name (e.g., "VillageWaiver_Molepolole") | Identifier |
| **C** | ConfigValue | String | ✓ | TRUE/FALSE or text | Setting value |
| **D** | ConfigType | Enum | ✓ | Boolean \| String \| Number \| JSON | Data type |
| **E** | ConfigCategory | Enum | ✓ | Village Waivers \| Fee Structures \| Feature Toggles \| API Keys | Organization |
| **F** | AppliesTo | Enum | ✓ | Global \| VillageTownCity \| ProfileType | Scope |
| **G** | TargetLocation | String | ○ | If location-specific | Geographic filter |
| **H** | TargetProfileType | Enum | ○ | If profile-specific | Profile filter |
| **I** | AdminSetByProfileID | ProfileID | ✓ | Who configured | Authority tracking |
| **J** | Description | Text | ✓ | Purpose explanation | Documentation |
| **K** | LastModifiedTimestamp | Timestamp | ✓ | Recent edit | Change tracking |
| **L** | EffectiveFromDate | Date | ✓ | When active | Rollout timing |
| **M** | EffectiveUntilDate | Date | ○ | Expiration | Temporary settings |
| **N** | AuditLog | JSON Array | ✓ | `[{Timestamp, AdminID, Change}]` | Change history |
| **O** | CreatedTimestamp | Timestamp | ✓ | Initial setup | Initialization |

**Total Columns: 15 (A-O)**

### Example Configurations

| ConfigKey | ConfigValue | Description |
|-----------|-------------|-------------|
| VillageWaiver_Molepolole | TRUE | Free profiles for all in Molepolole village |
| SponsorshipCommissionPercent | 5.0 | 5% commission on monetary sponsorships |
| VenueBookingCommission_Standard | 5.0 | 5% commission on standard bookings |
| VenueBookingCommission_InstantBook | 10.0 | 10% commission on instant bookings |
| OfflineSyncIntervalMinutes | 15 | Roster/ledger sync frequency |
| BulletinModeration_Required | TRUE | Staff must approve posts |
| BettingToggle_DefaultState | FALSE | Responsible gambling OFF by default |
| ResearchData_MinOptInPercent | 60.0 | Need 60% opt-in for research queries |
| MaxBorrowsPerUser_LowScore | 1 | If BorrowScore <2.5 |

---

## DATA SYNC ARCHITECTURE

### Offline-First Syncing (15-Minute Intervals)

**Primary Sync Targets:**
1. **Profiles_Master:** LastLoginTimestamp, TotalActivitiesJoined
2. **Activities_Master:** CurrentParticipants, ParticipantIDs, ActivityState
3. **Equipment_Ledger:** CheckInTimestamp, BorrowScore updates
4. **Guardian_Approvals:** ApprovalStatus changes
5. **Streams_Media:** StreamStatus (Live → Ended)

**Sync Logic:**
Every 15 minutes, Mizano initiates a "Background Pulse." The logic follows these rules:

1.  **500KB Max Payload**: The packet must not exceed 500KB to respect Botswana's data costs.
2.  **Short-String Priority**: Only code keys (e.g., `cb`, `baha`) are sent, not the full display text.
3.  **Entity Mapping**: The first row of every sync chunk mapped to columns **A–Q** (General Identity) and **AM–AV** (School & Connectivity).
```
Every 15 minutes:
1. Mobile app queries local SQLite for uncommitted changes
2. Batches into single Google Sheets API call (max 100 rows)
3. Appends "SyncBatchID" to track grouped updates
4. If API fails (no signal), queues for next cycle
5. Conflict resolution: Last-write-wins with Staff override
```

**Offline Storage on Device:**
- **SQLite Database:** ~5MB for 500 cached activities
- **Map Tiles:** 1MB for Gaborone neighborhoods
- **Profile Data:** 500KB for user's own profile + favorites
- **Equipment Ledger (local):** Pending check-ins/outs
- **Total:** <10MB offline footprint

**Bluetooth Sign-Ups (Match Rosters):**
- Local peer-to-peer between devices via Android Nearby API
- Saves ProfileID to local roster queue
- Hub syncs roster every 15 min when online
- No personal data exchanged (only ProfileIDs)

---

## RESEARCH MONETIZATION MODEL

### How Data is Sold (Anonymized Only)

**Tier 1: Pre-Built Reports (P500-2,000)**
- "Gaborone Sports Participation Report Q1 2026"
- "Youth Injury Trends in Schools 2026"
- "Transport Access to Sports Venues (Nationwide)"

Buyers: NGOs, government, researchers

**Tier 2: Custom Queries (P2,000-10,000)**
- Business submits query (e.g., "Average income of volleyball players in cities")
- Mizano Admin runs on Analytics_Snapshots sheet (not raw data)
- Delivers aggregate results (no ProfileIDs)

Buyers: Market research firms, health insurers, equipment manufacturers

**Tier 3: Longitudinal Access (P50,000/year)**
- Subscription to monthly Analytics_Snapshots exports
- Real-time dashboards (Tableau/Power BI integration)
- Used for PhDs, policy research, urban planning

Buyers: Universities, World Bank, Botswana government

### Privacy Safeguards

**Hard Rules:**
1. **NO individual profiles sold** (ProfileID, names, WhatsApp NEVER shared)
2. **Minimum n=50:** Queries must return ≥50 aggregated records (prevents re-identification)
3. **Guardian opt-in:** Minors' data excluded unless ResearchOptIn = TRUE
4. **Anonymization:** All exports strip personally identifiable information
5. **Audit trails:** Every research query logged in System_Config

**Example Rejected Query:**
```
Query: "Show me ProfileID, Name, and WhatsAppNumber for all U15 soccer players in Block 3"
Rejection Reason: Contains PII (personally identifiable information)
```

**Example Approved Query:**
```
Query: "% of U15 soccer players in Block 3 with Asthma in HealthNotes"
Output: 8.3% (n=78 students)
Approved: Aggregate only, n>50, opt-ins verified
```

---

## GOOGLE SHEETS API INTEGRATION

### API v4 Authentication

**Service Account Setup:**
1. Create Google Cloud Project: `mizano-backend-prod`
2. Enable Google Sheets API
3. Create Service Account: `mizano-sync@mizano-backend-prod.iam.gserviceaccount.com`
4. Generate JSON key file (stored securely on app servers)
5. Share master workbook with service account email

**Permissions:**
- Service Account: Editor access (read/write all sheets)
- Staff/Admin: Viewer access via Google Drive (read-only)
- App Backend: Full CRUD via API

### Rate Limits & Quotas

**Google Sheets API Limits:**
- 100 requests per 100 seconds per user
- 500 requests per 100 seconds per project
- Max 10 million cells per workbook

**Mizano Mitigation:**
- Batch updates (100 rows per API call)
- 15-min sync intervals (not real-time)
- Read caching (5-min TTL for search results)
- Separate workbook per 100,000 profiles (sharding if needed)

### Sample API Call (Append Activity)

```python
from googleapiclient.discovery import build
from google.oauth2 import service_account

SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
SERVICE_ACCOUNT_FILE = 'mizano-sync-key.json'
SPREADSHEET_ID = '1ABC...XYZ'

credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)
service = build('sheets', 'v4', credentials=credentials)

# Append new activity to Activities_Master sheet
values = [[
    'ACT-GAB-SOC-999',  # ActivityID
    'Sports',            # ActivityType
    'Soccer',            # SpecificSport
    'Active Soon',       # ActivityState
    'USR-GAB-B3-123',   # CreatorProfileID
    # ... 55 more columns
]]

body = {'values': values}
result = service.spreadsheets().values().append(
    spreadsheetId=SPREADSHEET_ID,
    range='Activities_Master!A:BJ',  # 62 columns
    valueInputOption='RAW',
    body=body
).execute()

print(f"Appended {result.get('updates').get('updatedRows')} row")
```

---

## PERFORMANCE OPTIMIZATION

### Indexing Strategy (Google Sheets Limits)

**Problem:** Google Sheets has no native indexing; queries scan all rows.

**Solution: Pre-Sorted Tabs**

Create duplicate "index" sheets sorted by common queries:

| Main Sheet | Index Sheets |
|------------|--------------|
| Profiles_Master | Profiles_ByLocation (sorted by VillageTownCity + AreaNeighborhood) |
| Profiles_Master | Profiles_ByType (sorted by ProfileType) |
| Activities_Master | Activities_ByDate (sorted by StartDate DESC) |
| Activities_Master | Activities_ByLocation (sorted by VillageTownCity) |

**Update Strategy:**
- Main sheets: Append-only (fastest)
- Index sheets: Rebuild daily via Apps Script (3 AM batch)

### Apps Script Automation

**Daily Tasks (Google Apps Script):**
1. **Rebuild Index Sheets:** Sort and copy from master sheets
2. **Generate Analytics_Snapshots:** Aggregate yesterday's data
3. **Cleanup Expired Posts:** Archive Bulletin posts >30 days old
4. **Send Digest Emails:** Summary to Admins (activity counts, revenue)

**Sample Apps Script (Analytics Snapshot):**
```javascript
function generateDailySnapshot() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var profilesSheet = ss.getSheetByName('Profiles_Master');
  var snapshotsSheet = ss.getSheetByName('Analytics_Snapshots');
  
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Count active profiles (LastLogin <7 days)
  var profileData = profilesSheet.getDataRange().getValues();
  var activeCount = 0;
  var cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 7);
  
  for (var i = 1; i < profileData.length; i++) {  // Skip header
    var lastLogin = new Date(profileData[i][53]);  // Column BB
    if (lastLogin > cutoffDate) activeCount++;
  }
  
  // Write to Analytics_Snapshots
  snapshotsSheet.appendRow([
    Utilities.getUuid(),           // SnapshotID
    yesterday,                     // SnapshotDate
    'Daily',                       // SnapshotType
    'Gaborone',                    // VillageTownCity
    'All',                         // AreaNeighborhood
    activeCount,                   // TotalActiveProfiles
    // ... 45 more columns
  ]);
}
```

**Trigger:** Set to run daily at 3:00 AM Botswana Time (CAT)

---

## DATA BACKUP & DISASTER RECOVERY

### Backup Strategy

**Google Drive Native Versioning:**
- Automatically saves every edit (30-day history)
- Restore via "Version history" in Google Sheets UI

**Additional Backups:**
1. **Daily Export to Google Cloud Storage:**
   - Apps Script exports entire workbook as CSV (midnight)
   - Stored in GCS bucket: `gs://mizano-backups/YYYY-MM-DD/`
   - Retention: 90 days

2. **Weekly Full Snapshot:**
   - Export to downloadable Excel file
   - Stored on Admin's Google Drive
   - Manual restoration if needed

### Disaster Recovery Plan

**Scenario 1: Accidental Deletion**
- Restore from Google Sheets version history (30 days)

**Scenario 2: Service Account Compromise**
- Revoke service account key
- Generate new key
- Update app servers with new credentials
- Restore data from last GCS backup

**Scenario 3: Google Sheets Corruption**
- Create new workbook
- Import from GCS bucket CSV exports
- Update SPREADSHEET_ID in app config
- Resume operations (<2 hours downtime)

**RTO (Recovery Time Objective):** 4 hours  
**RPO (Recovery Point Objective):** 24 hours (daily backups)

---

## PRIVACY & COMPLIANCE

### GDPR & Botswana Data Protection

**Though Botswana has lighter regulations, Mizano over-complies for trust:**

1. **Consent Management:**
   - `ResearchOptIn` column (opt-in, not opt-out)
   - Guardian must approve for minors
   - Settings → toggle anytime

2. **Data Portability:**
   - Users can export their ProfileID data via Settings
   - PDF export includes all personal data

3. **Right to Erasure:**
   - "Delete Account" button in Settings
   - Hard deletes from Profiles_Master within 30 days
   - Anonymizes ProfileID in Activities_Master (changes to "DELETED_USER")

4. **Data Minimization:**
   - Only collect fields essential for features + research
   - No tracking cookies, no third-party analytics (except Google API)

5. **Security:**
   - Google Sheets access via Service Account only (no public sharing)
   - HTTPS-only API calls
   - WhatsApp numbers never exposed in research queries

### Child Safety (COPPA-Equivalent)

**Under-16 Protections:**
- Mandatory Guardian link (cannot create account without)
- Three-Way Handshake (School-Guardian-Mizano)
- Security Log shows every Association view of profile
- Research data excluded unless Guardian opts in
- AcademicAlert allows Guardian to pause activity

---

## MIGRATION PLAN (Future-Proofing)

### When to Move from Google Sheets to Database?

**Thresholds:**
- **Profiles:** >500,000 rows (Google Sheets max: 10M cells ÷ 64 cols ≈ 156K rows)
- **Activities:** >1,000,000 rows
- **Query Latency:** >5 seconds for searches
- **Sync Failures:** >10% due to API rate limits

**Migration Path:**
1. **Export all 12 sheets to PostgreSQL/MySQL**
2. **Maintain Google Sheets as read-only archive** (legal compliance)
3. **Switch app to SQL database** (keep same column names for compatibility)
4. **Research queries continue via SQL** (faster, more complex joins)

**Estimated Timeline:** Year 3-4 if growth targets met

---

## CONCLUSION

This Google Sheets structure balances:

1. **Operational Efficiency:** Lightweight syncing, offline-first design
2. **Research Value:** Every field serves dual purposes (features + analytics)
3. **Privacy Compliance:** Anonymized aggregates only, opt-in mandatory
4. **Scalability:** 12-sheet architecture supports 250,000+ rows
5. **Community Impact:** Data insights empower city planning, health research, economic development

**Key Success Metrics:**
- **Revenue from Data:** Target P200,000/year from research queries by Year 2
- **Research Opt-In Rate:** Goal 70%+ (builds trust via transparency)
- **Data Quality:** <2% error rate in syncs (Staff overrides ensure accuracy)
- **Privacy Compliance:** Zero individual data leaks (audit every query)

**Next Steps:**
1. Create master Google Sheets workbook with 12 tabs
2. Set up Service Account authentication
3. Build Apps Script for daily Analytics_Snapshots
4. Design research query approval workflow
5. Launch with 3 pilot research partners (NGO, university, government)

---

**Document Owner:** Mizano Data Architecture Team  
**Last Updated:** February 11, 2026  
**Version:** 1.0  
**Status:** Technical Specification for Backend Implementation
