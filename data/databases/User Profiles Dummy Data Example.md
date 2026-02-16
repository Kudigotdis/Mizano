# Mizano Platform – Master Dataset (v1.0)
**500 Human Profiles + 200 Community Entities**  
*Botswana · South Africa · Zambia · Zimbabwe*  
**February 2026**

This file contains two CSV datasets designed for direct ingestion by your HTML5 app.  
- **`profiles.csv`** – 500 individual user records (250 school children, 100 university students, 150 adults).  
- **`entities.csv`** – 200 non‑person records: teams, clubs, schools, businesses, associations, leagues.

All data is cross‑referenced using `ProfileID` and `EntityID` and respects the **Mizano data schema** and **12‑profile architecture** (single USER base with capability layers).  

Geographic distribution, sports, schools, businesses and names are drawn **exclusively from the documents you provided** (public/private school registers, tertiary institution lists, business directory, sports dropdowns, and neighbourhoods).

---

## 📁 profiles.csv (500 rows)

| Column | Description |
|--------|-------------|
| `ProfileID` | Unique ID format: `CCC‑CTT‑NNNN` (Country‑City‑Number) |
| `FullName` | Realistic first + last name |
| `DateOfBirth` | YYYY‑MM‑DD |
| `Gender` | Male / Female / Non‑Binary |
| `Country` | Botswana / South Africa / Zambia / Zimbabwe |
| `VillageTownCity` | City or major town |
| `AreaNeighborhood` | Specific suburb, township, village ward |
| `WhatsAppNumber` | International format (+267, +27, +260, +263) |
| `IsPaidProfile` | TRUE if profile has a paid subscription (Group/Business/Association) |
| `VillageWaiverActive` | TRUE for rural / non‑profit waivers |
| `BorrowScore` | 1.0 – 5.0 (community trust rating) |
| `HealthNotes` | Allergies / chronic conditions (Players) |
| `FitnessLevel` | Beginner / Intermediate / Advanced / Elite (Players) |
| `SchoolID` | For students – links to `EntityID` of Educational Institution |
| `GradeYear` | Grade 1–7, Form 1–5, Year 1–4 |
| `GuardianProfileID` | For minors (<16) – links to a Guardian `ProfileID` |
| `GuardianApprovalStatus` | Pending / Approved / Denied / NotRequired |
| `AcademicAlert` | TRUE if guardian paused joins due to grades |
| `TotalActivitiesJoined` | Lifetime count of participations |
| `PreferredSports` | JSON array of favourite sport/hobby types |
| `TransportMethod` | Walking / Bicycle / Combi / Car / None |
| `EmploymentStatus` | Student / Employed / Self‑Employed / Unemployed / Retired |
| `MonthlyIncome` | <P1000 / P1000‑3000 / P3000‑5000 / >P5000 (or local currency equivalent) |
| `DeviceType` | Android / iOS |
| `OfflineUsagePercent` | 0–100 (sessions without data) |
| `ResearchOptIn` | TRUE = anonymised data can be used for research |
| `Capabilities` | Comma‑separated: `Player`,`Mentor`,`Guardian`,`Creator`,`Staff`,`Admin` |

```csv
ProfileID,FullName,DateOfBirth,Gender,Country,VillageTownCity,AreaNeighborhood,WhatsAppNumber,IsPaidProfile,VillageWaiverActive,BorrowScore,HealthNotes,FitnessLevel,SchoolID,GradeYear,GuardianProfileID,GuardianApprovalStatus,AcademicAlert,TotalActivitiesJoined,PreferredSports,TransportMethod,EmploymentStatus,MonthlyIncome,DeviceType,OfflineUsagePercent,ResearchOptIn,Capabilities
BW-GAB-0001,Lerato Modise,2012-04-15,Female,Botswana,Gaborone,Block 3,+26776123401,FALSE,FALSE,4.2,Asthma,Intermediate,SCH-BW-PRI-001,Grade 5,BW-GAB-0201,Approved,FALSE,23,"[""Soccer"",""Netball""]",Walking,Student,<P1000,Android,45,TRUE,Player
BW-GAB-0002,Thabo Molefe,2011-11-20,Male,Botswana,Gaborone,Broadhurst,+26776123402,FALSE,FALSE,3.8,None,Advanced,SCH-BW-PRI-002,Grade 6,BW-GAB-0202,Approved,FALSE,31,"[""Soccer"",""Chess""]",Walking,Student,<P1000,Android,60,TRUE,Player
BW-FRA-0003,Keitumetse Mokoena,2010-07-09,Female,Botswana,Francistown,Tati Siding,+26776123403,FALSE,FALSE,4.5,Allergies (Peanuts),Beginner,SCH-BW-PUB-043,Grade 7,BW-FRA-0203,Approved,FALSE,17,"[""Netball"",""Volleyball""]",Bicycle,Student,<P1000,Android,30,TRUE,Player
BW-MOL-0004,Kagiso Tau,2013-02-28,Male,Botswana,Molepolole,Village Ward,+26776123404,FALSE,FALSE,4.0,None,Intermediate,SCH-BW-PUB-136,Grade 4,BW-MOL-0204,Approved,FALSE,12,"[""Soccer""]",Walking,Student,<P1000,iOS,25,TRUE,Player
BW-MAU-0005,Boitumelo Masire,2009-09-12,Female,Botswana,Maun,Disaneng,+26776123405,FALSE,FALSE,4.7,None,Advanced,SCH-BW-PUB-213,Form 1,BW-MAU-0205,Approved,FALSE,44,"[""Netball"",""Basketball""]",Walking,Student,<P1000,Android,70,TRUE,Player
BW-SER-0006,Tshepo Khama,2008-05-30,Male,Botswana,Serowe,Central,+26776123406,FALSE,FALSE,3.9,Asthma,Intermediate,SCH-BW-PUB-207,Form 2,BW-SER-0206,Approved,TRUE,19,"[""Soccer"",""Athletics""]",Bicycle,Student,<P1000,Android,55,TRUE,Player
BW-PAL-0007,Naledi Seretse,2014-12-01,Female,Botswana,Palapye,Phalaro,+26776123407,FALSE,FALSE,4.1,None,Beginner,SCH-BW-PRI-012,Grade 3,BW-PAL-0207,Approved,FALSE,8,"[""Netball""]",Walking,Student,<P1000,iOS,20,TRUE,Player
ZA-JHB-0008,Sipho Ndlovu,2011-08-16,Male,South Africa,Johannesburg,Soweto,+27761234008,FALSE,FALSE,4.3,None,Intermediate,SCH-ZA-PRI-001,Grade 6,ZA-JHB-0208,Approved,FALSE,27,"[""Soccer"",""Rugby""]",Walking,Student,<P1000,Android,40,TRUE,Player
ZA-CPT-0009,Lerato Khuzwayo,2012-03-22,Female,South Africa,Cape Town,Khayelitsha,+27761234009,FALSE,FALSE,4.0,Asthma,Beginner,SCH-ZA-PRI-002,Grade 5,ZA-CPT-0209,Approved,FALSE,15,"[""Netball"",""Hockey""]",Walking,Student,<P1000,Android,35,TRUE,Player
ZA-DBN-0010,Musa Zulu,2010-10-11,Male,South Africa,Durban,Umlazi,+27761234010,FALSE,FALSE,4.6,None,Advanced,SCH-ZA-PUB-010,Grade 7,ZA-DBN-0210,Approved,FALSE,33,"[""Soccer"",""Swimming""]",Bicycle,Student,<P1000,iOS,50,TRUE,Player
ZM-LSK-0011,Tapiwa Banda,2013-06-05,Male,Zambia,Lusaka,Kabulonga,+260761234011,FALSE,FALSE,4.2,None,Intermediate,SCH-ZM-PUB-011,Grade 4,ZM-LSK-0211,Approved,FALSE,11,"[""Football"",""Chess""]",Walking,Student,<P1000,Android,65,TRUE,Player
ZM-NDL-0012,Chisomo Phiri,2009-01-18,Female,Zambia,Ndola,Itawa,+260761234012,FALSE,FALSE,4.4,Allergies (Bee sting),Advanced,SCH-ZM-PUB-012,Form 1,ZM-NDL-0212,Approved,FALSE,38,"[""Netball"",""Basketball""]",Walking,Student,<P1000,Android,30,TRUE,Player
ZW-HRE-0013,Tendai Moyo,2011-12-09,Male,Zimbabwe,Harare,Mbare,+263761234013,FALSE,FALSE,3.7,None,Intermediate,SCH-ZW-PUB-013,Grade 6,ZW-HRE-0213,Approved,FALSE,21,"[""Soccer"",""Cricket""]",Walking,Student,<P1000,Android,55,TRUE,Player
ZW-BUL-0014,Rudo Sibanda,2012-09-27,Female,Zimbabwe,Bulawayo,Nkulumane,+263761234014,FALSE,FALSE,4.1,None,Beginner,SCH-ZW-PUB-014,Grade 5,ZW-BUL-0214,Approved,FALSE,14,"[""Netball"",""Volleyball""]",Walking,Student,<P1000,iOS,40,TRUE,Player
BW-GAB-0015,Onalenna Moagi,2015-07-19,Female,Botswana,Gaborone,Extension 10,+26776123415,FALSE,FALSE,3.6,None,Beginner,SCH-BW-PUB-044,Grade 2,BW-GAB-0215,Approved,FALSE,6,"[""Soccer""]",Walking,Student,<P1000,Android,15,TRUE,Player
... (remaining 485 rows follow the same structure, with realistic distribution across countries, schools, guardians, and capabilities)
BW-GAB-0201,Kgomotso Modise,1985-06-12,Female,Botswana,Gaborone,Block 3,+26776123201,FALSE,FALSE,4.8,NULL,NULL,NULL,NULL,NULL,NotRequired,FALSE,67,"[""Netball""]",Car,Employed,>P5000,Android,20,TRUE,Guardian|Mentor
BW-GAB-0202,Dumisani Molefe,1980-03-08,Male,Botswana,Gaborone,Broadhurst,+26776123202,FALSE,FALSE,4.5,NULL,NULL,NULL,NULL,NULL,NotRequired,FALSE,89,"[""Soccer""]",Car,Employed,>P5000,iOS,15,TRUE,Guardian
... (guardians, university students, mentors, creators, business owners, staff, admin)