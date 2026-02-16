# MIZANO EVENTS DATABASE 2026
**Botswana Amateur Soccer Events - App Data Seed**  
**Format:** JSON-compatible data structures for HTML5/Android app  
**Last Updated:** February 13, 2026  
**Total Events:** 30 sponsored competitions + ongoing regional leagues

---

## DATA STRUCTURE OVERVIEW

This file contains all event data structured for Mizano's offline-first HTML5 app, designed for IndexedDB storage and 15-minute sync cycles. Each event follows the Mizano Activity Schema with extensions for competition-specific metadata.

### Core Data Models

```javascript
// Event Object Structure
{
  eventID: "string",           // Unique identifier (e.g., "MAS-KC-2026")
  eventName: "string",          // Full event name
  eventSlug: "string",          // URL-friendly slug
  sponsor: "object",            // Sponsor details
  competitionFormat: "string",  // Format type (see formats list)
  activityType: "soccer",       // Always "soccer" for this dataset
  region: "string",             // Geographic scope
  startDate: "YYYY-MM-DD",      // ISO 8601 format
  endDate: "YYYY-MM-DD",
  entryFee: "number",           // In Pula (P), 0 for free
  prizePool: "number",          // Total prize in Pula
  prizeDetails: "string",       // Detailed prize description
  participatingTeams: "array",  // Array of team objects
  fixtures: "array",            // Match fixtures
  activityState: "string",      // Dynamic state (see states below)
  borderColor: "string",        // Card border color (hex)
  cardType: "string",           // Card type for rendering
  whatsappLink: "string",       // wa.me deep link
  facebookLink: "string",       // FB event page
  allowStreams: "boolean",      // Fan livestream toggle
  sponsorshipActive: "boolean", // Sponsor-a-Game enabled
  offlineEnabled: "boolean",    // Offline functionality
  villageWaiver: "boolean"      // Free for village teams
}
```

### Activity States (Dynamic)
- `upcoming` - Yellow border (#FFD700, 70%)
- `active_now` - Orange border (#FFA500, 70%), pulsing
- `finished` - Charcoal border (#505050, 70%)
- `recruiting` - Green border (#70AD47, 70%)
- `pending` - Yellow border (awaiting resources)

### Competition Formats
- `single_elimination` - Knockout
- `double_elimination` - Loser's bracket
- `round_robin` - Everyone plays everyone
- `group_knockout` - Groups then knockout
- `swiss_system` - Swiss pairing
- `ladder_system` - Challenge-based
- `league_playoff` - League then playoffs
- `festival` - Mini-tournament
- `aggregate` - Two-legged ties
- `funino` - Small-sided development

---

## EVENTS DATA

### EVENT #1: MASCOM KICKOFF CUP

```json
{
  "eventID": "MAS-KC-2026",
  "eventName": "Mascom Kickoff Cup",
  "eventSlug": "mascom-kickoff-cup-2026",
  "tagline": "Kicking Off the New Year with Connectivity",
  "sponsor": {
    "name": "Mascom",
    "logo": "/assets/sponsors/mascom-logo.webp",
    "industry": "Telecommunications",
    "facebookPage": "https://facebook.com/MascomBotswana",
    "websiteURL": "https://mascom.bw"
  },
  "competitionFormat": "single_elimination",
  "activityType": "soccer",
  "sportCategory": "team_sport_outdoor",
  "region": "Greater Gaborone",
  "regionCode": "SE",
  "venue": {
    "primary": "SSKB Stadium",
    "secondary": ["Prisons Ground", "Lobatse Stadium", "Mogoditshane Ground"],
    "venueType": "multiple",
    "coordinates": {
      "lat": -24.6282,
      "lng": 25.9231
    }
  },
  "dates": {
    "startDate": "2026-01-10",
    "endDate": "2026-01-25",
    "registrationDeadline": "2026-01-05",
    "timezone": "Africa/Gaborone"
  },
  "financial": {
    "entryFee": 0,
    "currency": "BWP",
    "prizePool": 30000,
    "prizeBreakdown": {
      "champion": 20000,
      "runnerUp": 7000,
      "thirdPlace": 3000
    },
    "prizeExtras": "Mascom smartphones for each starting XI player (champion)",
    "villageWaiver": true,
    "mizanoCommission": 0
  },
  "participants": {
    "totalTeams": 32,
    "confirmedTeams": 32,
    "teamList": [
      {
        "teamID": "GAB-UNI-AM",
        "teamName": "Gaborone United",
        "teamType": "amateur",
        "homeGround": "SSKB Stadium",
        "neighborhood": "Gaborone Central",
        "contactWhatsApp": "+267XXXXXXXX",
        "facebookPage": "https://facebook.com/GabUnited",
        "roster": {
          "totalPlayers": 18,
          "guardianApprovedU16": 0
        }
      },
      {
        "teamID": "BRO-ROV",
        "teamName": "Broadhurst Rovers",
        "teamType": "amateur",
        "homeGround": "Broadhurst Ground",
        "neighborhood": "Broadhurst",
        "contactWhatsApp": "+267XXXXXXXX"
      },
      {
        "teamID": "TWN-ROL-AM",
        "teamName": "Township Rollers",
        "teamType": "amateur",
        "homeGround": "Prisons Ground",
        "neighborhood": "Old Naledi"
      },
      {
        "teamID": "BLK-3-UTD",
        "teamName": "Block 3 United",
        "teamType": "amateur",
        "homeGround": "Block 3 Park",
        "neighborhood": "Block 3"
      }
      // ... 28 more teams (abbreviated for space)
    ]
  },
  "competition": {
    "structure": [
      {"round": "Round 1", "teams": 32, "matches": 16, "dates": "2026-01-10/11"},
      {"round": "Round 2", "teams": 16, "matches": 8, "dates": "2026-01-13/14"},
      {"round": "Quarterfinals", "teams": 8, "matches": 4, "dates": "2026-01-17/18"},
      {"round": "Semifinals", "teams": 4, "matches": 2, "dates": "2026-01-21"},
      {"round": "Final", "teams": 2, "matches": 1, "dates": "2026-01-25"}
    ],
    "matchFormat": {
      "halves": 2,
      "minutesPerHalf": 45,
      "halftimeBreak": 15,
      "extraTime": true,
      "penalties": true
    }
  },
  "fixtures": [
    {
      "fixtureID": "MAS-KC-R1-M1",
      "round": "Round 1",
      "matchNumber": 1,
      "homeTeam": "GAB-UNI-AM",
      "awayTeam": "BRO-ROV",
      "venue": "SSKB Stadium",
      "dateTime": "2026-01-10T15:00:00+02:00",
      "activityState": "finished",
      "score": {"home": 2, "away": 1},
      "attendance": 1200,
      "referee": "Olebile Nkawana",
      "whatsappGroupURL": "https://chat.whatsapp.com/XXXXXXX",
      "facebookLiveLinks": [
        {"submitter": "Fan1", "url": "https://fb.me/live1"}
      ]
    },
    {
      "fixtureID": "MAS-KC-R1-M2",
      "round": "Round 1",
      "matchNumber": 2,
      "homeTeam": "TWN-ROL-AM",
      "awayTeam": "BLK-3-UTD",
      "venue": "Prisons Ground",
      "dateTime": "2026-01-10T17:00:00+02:00",
      "activityState": "finished",
      "score": {"home": 1, "away": 1},
      "penaltyScore": {"home": 4, "away": 3},
      "attendance": 850
    }
    // ... additional fixtures
  ],
  "mizanoIntegration": {
    "cardType": "standard_match_card",
    "borderColor": "#505050",
    "borderOpacity": 0.7,
    "activityState": "finished",
    "allowFanStreams": true,
    "sponsorAGame": false,
    "equipmentBorrowing": true,
    "offlineMatchSignup": true,
    "guardianRequired": false,
    "callOutsEnabled": true
  },
  "metadata": {
    "createdBy": "Staff-Mizano-001",
    "createdAt": "2025-12-15T10:00:00Z",
    "lastUpdated": "2026-01-25T20:30:00Z",
    "syncStatus": "synced",
    "offlinePriority": "high"
  }
}
```

---

### EVENT #2: FNB COMMUNITY SHIELD FESTIVAL

```json
{
  "eventID": "FNB-CSF-2026",
  "eventName": "FNB Community Shield Festival",
  "eventSlug": "fnb-community-shield-festival-2026",
  "tagline": "Banking on Community Football",
  "sponsor": {
    "name": "FNB Botswana",
    "logo": "/assets/sponsors/fnb-logo.webp",
    "industry": "Banking",
    "facebookPage": "https://facebook.com/FNBBotswana"
  },
  "competitionFormat": "festival",
  "activityType": "soccer",
  "region": "National",
  "regionCode": "NAT",
  "venue": {
    "primary": "Multi-hub",
    "hubs": [
      {"city": "Gaborone", "venue": "SSKB Complex", "teams": 10},
      {"city": "Francistown", "venue": "Francistown Stadium", "teams": 10},
      {"city": "Maun", "venue": "Maun Sports Complex", "teams": 10},
      {"city": "Palapye", "venue": "Morupule Stadium", "teams": 10}
    ],
    "venueType": "distributed"
  },
  "dates": {
    "startDate": "2026-02-07",
    "endDate": "2026-02-08",
    "registrationDeadline": "2026-02-01"
  },
  "financial": {
    "entryFee": 0,
    "prizePool": 20000,
    "prizeBreakdown": {
      "perHub": 5000,
      "champion": 3000,
      "runnerUp": 1500,
      "thirdPlace": 500
    },
    "prizeExtras": "FNB school savings accounts for all youth players",
    "villageWaiver": true
  },
  "participants": {
    "totalTeams": 40,
    "confirmedTeams": 40,
    "hubDistribution": {
      "Gaborone": ["Holyghost FC", "Prisons XI", "Villa12 SC", "Madimo FC", "Gaborone Rovers", "Block 6 FC", "Phase 4 United", "Gaborone North Chiefs", "Extension 9 FC", "Gaborone South United"],
      "Francistown": ["FOB United", "Francistown City", "Francistown Wanderers", "Francistown Young Stars", "Francistown Dynamos", "Francistown Lions", "Francistown Buffaloes", "Francistown Pirates", "TAFIC B", "Matebele Rovers"],
      "Maun": ["Maun United", "Gumare United", "Shakawe United", "Kasane United", "Nokaneng United", "Etsha United", "Mohembo FC", "Seronga FC", "Ikoga United", "Sepupa Stars"],
      "Palapye": ["Palapye All Stars", "Palapye United", "Morupule Wanderers", "Palapye Young Fighters", "Serowe United", "Mahalapye United", "Nata United", "Rakops Rovers", "Motopi United", "Shoshong United"]
    }
  },
  "competition": {
    "structure": [
      {"stage": "Group Stage", "format": "round_robin", "groups": 2, "teamsPerGroup": 5, "duration": "Day 1"},
      {"stage": "Semifinals", "format": "knockout", "teams": 4, "duration": "Day 2 morning"},
      {"stage": "Final", "format": "single_match", "teams": 2, "duration": "Day 2 afternoon"}
    ],
    "matchFormat": {
      "halves": 2,
      "minutesPerHalf": 20,
      "halftimeBreak": 5,
      "extraTime": false,
      "penalties": true
    }
  },
  "specialFeatures": {
    "financialLiteracyWorkshops": true,
    "workshopTopics": ["Savings accounts", "Budgeting basics", "Youth banking"],
    "communityEngagement": "FNB staff volunteer as referees and coaches"
  },
  "mizanoIntegration": {
    "cardType": "registration_state_card",
    "borderColor": "#FFD700",
    "borderOpacity": 0.7,
    "activityState": "finished",
    "allowFanStreams": true,
    "sponsorAGame": false,
    "equipmentBorrowing": true,
    "bluetoothSignup": true,
    "offlineSyncInterval": 15
  }
}
```

---

### EVENT #3: ORANGE DIGITAL WARRIORS CUP

```json
{
  "eventID": "ORG-DWC-2026",
  "eventName": "Orange Digital Warriors Cup",
  "eventSlug": "orange-digital-warriors-cup-2026",
  "tagline": "Connect. Compete. Conquer.",
  "sponsor": {
    "name": "Orange Botswana",
    "logo": "/assets/sponsors/orange-logo.webp",
    "industry": "Telecommunications"
  },
  "competitionFormat": "swiss_system",
  "activityType": "soccer",
  "region": "Francistown & North-East",
  "regionCode": "NE",
  "dates": {
    "startDate": "2026-02-14",
    "endDate": "2026-02-28",
    "rounds": 5
  },
  "financial": {
    "entryFee": 100,
    "entryFeeWaived": "Village teams",
    "prizePool": 25000,
    "prizeExtras": "Orange smartphones + 12 months free data for champion team"
  },
  "participants": {
    "totalTeams": 16,
    "teamList": [
      {"teamID": "FOB-UTD", "teamName": "FOB United", "location": "Francistown"},
      {"teamID": "TAF-B", "teamName": "TAFIC B", "location": "Francistown"},
      {"teamID": "BLK-LION-Y", "teamName": "Black Lions", "teamType": "youth", "location": "Francistown"},
      {"teamID": "CAL-STAR", "teamName": "Calendar Stars", "teamType": "amateur", "location": "Francistown"},
      {"teamID": "SAN-GRN-R", "teamName": "Santa Green", "teamType": "reserves", "location": "Francistown"},
      {"teamID": "MAT-ROV", "teamName": "Matebele Rovers", "location": "Matebele"},
      {"teamID": "FTN-CITY", "teamName": "Francistown City", "location": "Francistown"},
      {"teamID": "FTN-HOT", "teamName": "Francistown Hotspurs", "location": "Francistown"},
      {"teamID": "FTN-YS", "teamName": "Francistown Young Stars", "location": "Francistown"},
      {"teamID": "NE-CHIEF", "teamName": "North-East Chiefs", "location": "Masunga"},
      {"teamID": "MAS-UTD", "teamName": "Masunga United", "location": "Masunga"},
      {"teamID": "TUT-UTD", "teamName": "Tutume United", "location": "Tutume"},
      {"teamID": "TUT-YS", "teamName": "Tutume Young Stars", "location": "Tutume"},
      {"teamID": "BOB-UTD", "teamName": "Bobonong United", "location": "Bobonong"},
      {"teamID": "BOB-CHIEF", "teamName": "Bobonong Chiefs", "location": "Bobonong"},
      {"teamID": "ZWE-UTD", "teamName": "Zwenshambe United", "location": "Zwenshambe"}
    ]
  },
  "competition": {
    "swissSystem": {
      "rounds": 5,
      "pairingLogic": "Teams paired by similar records each round",
      "tiebreakers": ["Head-to-head", "Goal difference", "Goals scored"]
    },
    "schedule": [
      {"round": 1, "date": "2026-02-14", "pairing": "random"},
      {"round": 2, "date": "2026-02-17", "pairing": "winners_vs_winners"},
      {"round": 3, "date": "2026-02-20", "pairing": "swiss_algorithm"},
      {"round": 4, "date": "2026-02-23", "pairing": "swiss_algorithm"},
      {"round": 5, "date": "2026-02-28", "pairing": "swiss_algorithm"}
    ]
  },
  "specialFeatures": {
    "digitalSkillsTraining": true,
    "zeroRatedStreaming": "Facebook Live free for Orange customers",
    "dataPackages": "All players receive 10GB Orange data"
  },
  "mizanoIntegration": {
    "cardType": "standard_match_card",
    "borderColor": "#4472C4",
    "activityState": "finished",
    "swissLeaderboard": true,
    "tournamentManagementSuite": true,
    "callOutsEnabled": true
  }
}
```

---

### EVENT #4: CHOPPIES VILLAGE KITCHEN TOURNAMENT

```json
{
  "eventID": "CHO-VKT-2026",
  "eventName": "Choppies Village Kitchen Tournament",
  "eventSlug": "choppies-village-kitchen-2026",
  "tagline": "Feeding Dreams, Building Communities",
  "sponsor": {
    "name": "Choppies Enterprises",
    "logo": "/assets/sponsors/choppies-logo.webp",
    "industry": "Retail"
  },
  "competitionFormat": "round_robin",
  "activityType": "soccer",
  "region": "Kweneng District",
  "regionCode": "KW",
  "dates": {
    "startDate": "2026-03-07",
    "endDate": "2026-03-22"
  },
  "financial": {
    "entryFee": 0,
    "entryRequirement": "Each team brings traditional food for opening ceremony",
    "prizePool": 15000,
    "prizeExtras": "P5,000 Choppies voucher + food hampers for all players"
  },
  "participants": {
    "totalTeams": 12,
    "teamList": [
      {"teamID": "MOL-CITY", "teamName": "Molepolole City", "village": "Molepolole", "homeGround": "Molepolole Stadium"},
      {"teamID": "MOL-STAR", "teamName": "Molepolole Stars", "village": "Molepolole", "homeGround": "Lekgwapheng Ground"},
      {"teamID": "THA-SHOT", "teamName": "Thamagashooting Stars", "village": "Thamaga", "homeGround": "Thamaga Ground"},
      {"teamID": "THA-UTD", "teamName": "Thamaga United", "village": "Thamaga"},
      {"teamID": "GAB-UTD", "teamName": "Gabane United", "village": "Gabane"},
      {"teamID": "UNI-FLA", "teamName": "Union Flamengo Santos", "village": "Gabane"},
      {"teamID": "MOG-FIGHT", "teamName": "Mogoditshane Fighters", "village": "Mogoditshane"},
      {"teamID": "MOG-UTD", "teamName": "Mogoditshane United", "village": "Mogoditshane"},
      {"teamID": "MMO-UTD", "teamName": "Mmopane United", "village": "Mmopane"},
      {"teamID": "MET-YS", "teamName": "Metsimotlhabe Young Stars", "village": "Metsimotlhabe"},
      {"teamID": "LET-UTD", "teamName": "Letlhakeng United", "village": "Letlhakeng"},
      {"teamID": "TLO-UTD", "teamName": "Tloaneng United", "village": "Tloaneng"}
    ]
  },
  "competition": {
    "structure": [
      {"stage": "Round Robin", "matches": 66, "duration": "March 7-19"},
      {"stage": "Semifinals", "matches": 2, "duration": "March 21"},
      {"stage": "Final", "matches": 1, "duration": "March 22"},
      {"stage": "3rd Place", "matches": 1, "duration": "March 22"}
    ],
    "standings": {
      "pointsForWin": 3,
      "pointsForDraw": 1,
      "tiebreakers": ["Points", "Goal difference", "Goals scored", "Head-to-head"]
    }
  },
  "culturalElements": {
    "villageKitchen": true,
    "traditionalFoods": ["Seswaa", "Bogobe", "Morogo", "Vetkoek"],
    "postMatchMeals": "Choppies sponsors meals after every match",
    "communityEngagement": "Economic activity rotates through each village"
  },
  "mizanoIntegration": {
    "cardType": "standard_match_card",
    "borderColor": "#70AD47",
    "activityState": "finished",
    "sponsorAMeal": true,
    "equipmentWishlist": true,
    "bulletinRecipeSharing": true
  }
}
```

---

### EVENT #5: BTC CONNECTED CUP

```json
{
  "eventID": "BTC-CC-2026",
  "eventName": "BTC Connected Cup",
  "eventSlug": "btc-connected-cup-2026",
  "tagline": "Bringing Communities Together",
  "sponsor": {
    "name": "Botswana Telecommunications Corporation",
    "logo": "/assets/sponsors/btc-logo.webp",
    "industry": "Telecommunications"
  },
  "competitionFormat": "group_knockout",
  "activityType": "soccer",
  "region": "Gaborone (all neighborhoods)",
  "regionCode": "SE",
  "dates": {
    "startDate": "2026-03-14",
    "endDate": "2026-03-29"
  },
  "financial": {
    "entryFee": 50,
    "entryIncludes": "BTC SIM card with 5GB data",
    "prizePool": 40000,
    "prizeExtras": "BTC Wi-Fi hotspots for team clubhouses"
  },
  "participants": {
    "totalTeams": 24,
    "groupStage": {
      "groups": 6,
      "teamsPerGroup": 4
    }
  },
  "competition": {
    "structure": [
      {"stage": "Group Stage", "dates": "March 14-22", "format": "round_robin"},
      {"stage": "Round of 12", "dates": "March 24", "format": "playoff"},
      {"stage": "Quarterfinals", "dates": "March 25", "teams": 8},
      {"stage": "Semifinals", "dates": "March 27", "teams": 4},
      {"stage": "Final", "dates": "March 29", "venue": "National Stadium"}
    ],
    "groups": {
      "A": ["Holyghost FC", "Block 3 United", "Extension 4 Gunners", "Phase 2 FC"],
      "B": ["Gaborone United", "Gaborone West Young Stars", "Gaborone Leopards", "Gaborone Saints"],
      "C": ["Township Rollers", "Broadhurst Rovers", "Gaborone Eagles", "Block 6 FC"],
      "D": ["Villa12 SC", "Prisons XI", "Extension 9 FC", "Broadhurst Young Stars"],
      "E": ["Gaborone City FC", "Gaborone Dynamos", "Gaborone North Chiefs", "Phase 4 United"],
      "F": ["Madimo FC", "Gaborone Rovers", "Gaborone South United", "Gaborone Buffaloes"]
    }
  },
  "specialFeatures": {
    "freeWiFi": "BTC provides hotspots at all venues",
    "realTimeStreaming": "Mizano app syncs via Wi-Fi",
    "fanCheckIn": "Attend 3 matches = free BTC data voucher"
  },
  "mizanoIntegration": {
    "cardType": "standard_match_card",
    "borderColor": "#FFD700",
    "activityState": "finished",
    "liveGroupTables": true,
    "tiebreakersAutomatic": true,
    "fanCheckInRewards": true
  }
}
```

---

### COMPACT EVENT LISTINGS (Events #6-22)

For database efficiency, Events #6-22 are provided in compact JSON format:

```json
[
  {
    "eventID": "DEB-DC-2026",
    "eventName": "Debswana Diamond Cup",
    "sponsor": "Debswana",
    "format": "double_elimination",
    "region": "Orapa/Jwaneng/Letlhakane",
    "dates": "2026-04-04/19",
    "teams": 16,
    "prize": 50000,
    "prizeExtras": "Diamond-studded medals + job apprenticeships",
    "cardBorder": "#505050"
  },
  {
    "eventID": "KAL-DC-2026",
    "eventName": "Kgalagadi Desert Challenge",
    "sponsor": "KALAFI",
    "format": "aggregate",
    "region": "Kgalagadi District",
    "dates": "2026-04-18/26",
    "teams": 8,
    "prize": 20000,
    "prizeExtras": "Livestock (goats/cattle) + water tanks",
    "offlineCritical": true,
    "bluetoothEnabled": true,
    "cardBorder": "#70AD47"
  },
  {
    "eventID": "GUA-SH-U16-2026",
    "eventName": "Guardian Shield U16",
    "sponsor": "UNICEF/Mizano",
    "format": "funino",
    "region": "National (8 regional centers)",
    "dates": "2026-05-02/10",
    "teams": 64,
    "ageGroup": "U16",
    "prize": "Educational scholarships",
    "guardianRequired": true,
    "threeWayHandshake": true,
    "cardBorder": "#4472C4"
  },
  {
    "eventID": "FNB-SSF-2026",
    "eventName": "FNB School Sports Festival",
    "sponsor": "FNB",
    "format": "festival",
    "region": "National",
    "dates": "2026-05-15/24",
    "teams": 40,
    "schoolTeams": true,
    "prize": 100000,
    "prizeExtras": "FNB bursaries for top students",
    "schoolProfiles": true,
    "bulkStudentUpload": true,
    "cardBorder": "#4472C4"
  },
  {
    "eventID": "PRES-CC-2026",
    "eventName": "President's Charity Cup",
    "sponsor": "Office of the President",
    "format": "single_elimination",
    "region": "National",
    "dates": "2026-06-06/07",
    "teams": 8,
    "teamTypes": ["Amateur All-Stars", "Celebrities XI", "Veterans United", "Women's Select", "Diplomatic Corps", "Business Executives", "Media XI", "President's XI"],
    "prize": 100000,
    "charityDonation": true,
    "sponsorAGoal": true,
    "cardBorder": "#87CEEB"
  },
  {
    "eventID": "MAS-TOP8-2026",
    "eventName": "Mascom Top 8 Challenge",
    "sponsor": "Mascom",
    "format": "single_elimination",
    "region": "National",
    "dates": "2026-06-13/28",
    "teams": 8,
    "inviteOnly": true,
    "rankingBased": true,
    "prize": 80000,
    "prizeExtras": "Mascom sponsorships for 2027 season",
    "cardBorder": "#FFA500"
  },
  {
    "eventID": "ORG-FS-U13-2026",
    "eventName": "Orange Future Stars U13",
    "sponsor": "Orange",
    "format": "festival",
    "region": "National (8 regional centers)",
    "dates": "2026-07-04/12",
    "teams": 32,
    "ageGroup": "U13",
    "prize": "Full scholarships to Orange Football Academy",
    "talentIdentification": true,
    "sportsCVAutoGenerate": true,
    "cardBorder": "#4472C4"
  },
  {
    "eventID": "BFL-RZQ-2026",
    "eventName": "BFL Regional Zone Qualifiers",
    "sponsor": "Botswana Football League",
    "format": "league_system",
    "region": "All 8 BFL regions",
    "dates": "2026-07-18/2026-09-06",
    "teams": 64,
    "regions": 8,
    "prize": 30000,
    "promotion": "BFL Division One (2027)",
    "officialReferees": true,
    "cardBorder": "#4472C4"
  },
  {
    "eventID": "IND-CUP-2026",
    "eventName": "Independence Cup",
    "sponsor": "BTC/Ministry of Sport",
    "format": "group_knockout",
    "region": "National",
    "dates": "2026-08-01/2026-09-26",
    "teams": 60,
    "commemorates": "60 years of independence",
    "groups": 15,
    "prize": 100000,
    "prizeExtras": "Independence Trophy + BTC connectivity",
    "cardBorder": "#FFD700"
  },
  {
    "eventID": "CHO-FRT-2026",
    "eventName": "Choppies Food Relief Tournament",
    "sponsor": "Choppies",
    "format": "round_robin",
    "region": "Central District",
    "dates": "2026-08-15/23",
    "teams": 16,
    "entryRequirement": "50kg non-perishable food",
    "prize": 25000,
    "prizeExtras": "1 ton of food for winner's village",
    "communityService": true,
    "cardBorder": "#70AD47"
  },
  {
    "eventID": "BSB-CUP-2026",
    "eventName": "Botswana Savings Bank Cup",
    "sponsor": "Botswana Savings Bank",
    "format": "single_elimination",
    "region": "National",
    "dates": "2026-09-05/20",
    "teams": 32,
    "entryRequirement": "Financial literacy workshop",
    "prize": 40000,
    "prizeExtras": "BSB savings accounts with P1,000 seed funding",
    "financialInclusion": true,
    "cardBorder": "#4472C4"
  },
  {
    "eventID": "MAS-WC-2026",
    "eventName": "Mascom Wireless Challenge",
    "sponsor": "Mascom",
    "format": "swiss_system",
    "region": "Cities (Gaborone, Francistown, Palapye)",
    "dates": "2026-09-12/27",
    "teams": 24,
    "rounds": 7,
    "prize": 35000,
    "prizeExtras": "Mascom 5G routers + 24 months unlimited data",
    "cardBorder": "#4472C4"
  },
  {
    "eventID": "ORG-MCS-2026",
    "eventName": "Orange Money Charity Shield",
    "sponsor": "Orange Money",
    "format": "festival",
    "region": "National (4 hubs)",
    "dates": "2026-10-03/04",
    "teams": 16,
    "charityTeams": true,
    "prize": 50000,
    "charityDistribution": "Winner chooses charity",
    "orangeMoneyIntegration": true,
    "cardBorder": "#FF69B4"
  },
  {
    "eventID": "FNB-CSL-2026",
    "eventName": "FNB Corporate Social League",
    "sponsor": "FNB",
    "format": "ladder_system",
    "region": "Gaborone",
    "dates": "2026-10-10/2026-11-21",
    "teams": 16,
    "corporateTeams": true,
    "entryFee": 2000,
    "entryDonated": "Charity",
    "prize": 30000,
    "cardBorder": "#4472C4"
  },
  {
    "eventID": "BTC-ESC-2026",
    "eventName": "BTC End of Season Classic",
    "sponsor": "BTC",
    "format": "league_playoff",
    "region": "National",
    "dates": "2026-11-07/29",
    "teams": 16,
    "inviteOnly": true,
    "yearEndRankings": true,
    "prize": 100000,
    "prizeExtras": "BTC Team of the Year package + 2027 sponsorship",
    "awards": ["MVP", "Top Scorer", "Best GK", "Community Team"],
    "cardBorder": "#FFA500"
  },
  {
    "eventID": "CHO-CC-2026",
    "eventName": "Choppies Christmas Cracker",
    "sponsor": "Choppies",
    "format": "festival",
    "region": "All regions (decentralized)",
    "dates": "2026-12-05/20",
    "teams": "Unlimited",
    "communityRegistration": true,
    "prize": 5000,
    "prizeExtras": "Christmas hampers per regional winner",
    "createYourTournament": true,
    "cardBorder": "#FFD700"
  },
  {
    "eventID": "MIZ-NCL-2026",
    "eventName": "Mizano National Champions League",
    "sponsor": "Mizano/FNB",
    "format": "group_knockout",
    "region": "National",
    "dates": "2026-12-27/2027-01-03",
    "teams": 32,
    "qualificationCriteria": "2026 event winners + rankings + wildcards",
    "prize": 150000,
    "prizeExtras": "Mizano Champions trophy + professional trials",
    "grandFinale": true,
    "scoutAttendance": true,
    "cardBorder": "#FFA500"
  }
]
```

---

## REGIONAL LEAGUE DATA (Events #23-30)

### Ongoing Regional Divisions

```json
{
  "regionalLeagues": {
    "type": "ongoing_competitions",
    "season": "2026",
    "format": "league_system",
    "description": "Foundation of amateur pyramid - continuous play",
    "regions": [
      {
        "regionID": "GAB-D1",
        "regionName": "Gaborone Division One",
        "teams": 12,
        "format": "double_round_robin",
        "duration": "February-November 2026",
        "promotionTo": "BFL Division One (2027)",
        "teamList": [
          "Holyghost FC",
          "Gaborone United (amateur)",
          "Township Rollers (amateur)",
          "Broadhurst Rovers",
          "Villa12 SC",
          "Block 3 United",
          "Gaborone City FC",
          "Madimo FC",
          "Extension Gunners (youth)",
          "Gaborone West Young Stars",
          "Phase 2 FC",
          "Gaborone Rovers"
        ],
        "matchesTotal": 132,
        "pointsSystem": {"win": 3, "draw": 1, "loss": 0}
      },
      {
        "regionID": "FTN-D1",
        "regionName": "Francistown Division One",
        "teams": 10,
        "format": "double_round_robin",
        "teamList": [
          "Francistown City",
          "FOB United",
          "Francistown Wanderers",
          "Francistown Young Stars",
          "Francistown Dynamos",
          "Francistown Lions",
          "Francistown Buffaloes",
          "TAFIC B",
          "Matebele Rovers",
          "Francistown Hotspurs"
        ],
        "matchesTotal": 90
      },
      {
        "regionID": "KWE-D1",
        "regionName": "Kweneng Division One",
        "teams": 10,
        "teamList": [
          "Molepolole City",
          "Thamagashooting Stars",
          "Gabane United",
          "Mogoditshane Fighters",
          "Letlhakeng United",
          "Molepolole Stars",
          "Thamaga United",
          "Union Flamengo Santos",
          "Mogoditshane United",
          "Mmopane United"
        ]
      },
      {
        "regionID": "CEN-D1",
        "regionName": "Central Division One",
        "teams": 12,
        "teamList": [
          "Serowe United",
          "Palapye All Stars",
          "Mahalapye United",
          "Bobonong United",
          "Letlhakane United",
          "Orapa Stars",
          "Mmadinare United",
          "Tonota FC",
          "Sefophe FC",
          "Shoshong United",
          "Rakops Rovers",
          "Nata United"
        ]
      },
      {
        "regionID": "NW-D1",
        "regionName": "North-West Division One",
        "teams": 8,
        "format": "triple_round_robin",
        "teamList": [
          "Maun United",
          "Gumare United",
          "Shakawe United",
          "Kasane United",
          "Nokaneng United",
          "Etsha United",
          "Mohembo FC",
          "Seronga FC"
        ]
      },
      {
        "regionID": "KGA-D1",
        "regionName": "Kgalagadi Division One",
        "teams": 6,
        "format": "quadruple_round_robin",
        "teamList": [
          "Tsabong United",
          "Hukuntsi United",
          "Kang United",
          "Tshane Stars",
          "Werda Wanderers",
          "Khakhea United"
        ]
      },
      {
        "regionID": "GHA-D1",
        "regionName": "Ghanzi Division One",
        "teams": 6,
        "format": "quadruple_round_robin",
        "teamList": [
          "Ghanzi United",
          "Charleshill United",
          "New Xade FC",
          "D'kar United",
          "East Hanahai FC",
          "Kacgae United"
        ]
      },
      {
        "regionID": "SOU-D1",
        "regionName": "Southern Division One",
        "teams": 8,
        "format": "triple_round_robin",
        "teamList": [
          "Kanye United",
          "Moshupa United",
          "Goodhope United",
          "Jwaneng Young Stars",
          "Ranaka FC",
          "Lobatse City",
          "Ramotswa United",
          "Otse FC"
        ]
      }
    ]
  }
}
```

---

## LOOKUP TABLES & METADATA

### Team Database (Master List)

```json
{
  "teams": [
    {
      "teamID": "HOL-FC",
      "teamName": "Holyghost FC",
      "teamType": "amateur",
      "homeGround": "Holyghost Park",
      "neighborhood": "Holyghost",
      "city": "Gaborone",
      "region": "South-East",
      "district": "Gaborone",
      "founded": 2015,
      "contactWhatsApp": "+267XXXXXXXX",
      "facebookPage": "https://facebook.com/HolyghostFC",
      "teamColors": {"primary": "#FF0000", "secondary": "#FFFFFF"},
      "homeVenue": {
        "venueID": "HOL-PARK",
        "venueName": "Holyghost Park",
        "capacity": 500,
        "surface": "Grass",
        "lighting": false
      },
      "roster": {
        "totalPlayers": 22,
        "averageAge": 24,
        "guardianLinkedU16": 0
      },
      "statistics2026": {
        "matchesPlayed": 45,
        "wins": 28,
        "draws": 10,
        "losses": 7,
        "goalsScored": 82,
        "goalsConceded": 38,
        "cleanSheets": 18,
        "borrowScore": 4.8
      },
      "eventsParticipated": [
        "MAS-KC-2026",
        "BTC-CC-2026",
        "MAS-TOP8-2026",
        "BTC-ESC-2026",
        "MIZ-NCL-2026"
      ],
      "achievements": [
        "BTC End of Season Classic 2026 Winners",
        "Gaborone Division One 2026 Champions",
        "Mascom Top 8 Finalists 2026"
      ]
    }
    // ... additional 150+ teams in database
  ]
}
```

### Sponsor Database

```json
{
  "sponsors": [
    {
      "sponsorID": "MASCOM",
      "sponsorName": "Mascom Wireless",
      "industry": "Telecommunications",
      "logo": "/assets/sponsors/mascom-logo.webp",
      "websiteURL": "https://mascom.bw",
      "facebookPage": "https://facebook.com/MascomBotswana",
      "contactEmail": "sponsorship@mascom.bw",
      "eventsSponsored": [
        "MAS-KC-2026",
        "MAS-TOP8-2026",
        "MAS-WC-2026"
      ],
      "totalInvestment2026": 145000,
      "sponsorshipType": "Title sponsor",
      "brandColors": {"primary": "#00A651", "secondary": "#FFFFFF"}
    },
    {
      "sponsorID": "FNB",
      "sponsorName": "FNB Botswana",
      "industry": "Banking",
      "eventsSponsored": [
        "FNB-CSF-2026",
        "FNB-SSF-2026",
        "FNB-CSL-2026",
        "MIZ-NCL-2026"
      ],
      "totalInvestment2026": 270000
    },
    {
      "sponsorID": "ORANGE",
      "sponsorName": "Orange Botswana",
      "industry": "Telecommunications",
      "eventsSponsored": [
        "ORG-DWC-2026",
        "ORG-FS-U13-2026",
        "ORG-MCS-2026"
      ],
      "totalInvestment2026": 100000
    },
    {
      "sponsorID": "BTC",
      "sponsorName": "Botswana Telecommunications Corporation",
      "industry": "Telecommunications",
      "eventsSponsored": [
        "BTC-CC-2026",
        "IND-CUP-2026",
        "BTC-ESC-2026"
      ],
      "totalInvestment2026": 240000
    },
    {
      "sponsorID": "CHOPPIES",
      "sponsorName": "Choppies Enterprises",
      "industry": "Retail",
      "eventsSponsored": [
        "CHO-VKT-2026",
        "CHO-FRT-2026",
        "CHO-CC-2026"
      ],
      "totalInvestment2026": 45000
    },
    {
      "sponsorID": "DEBSWANA",
      "sponsorName": "Debswana Diamond Company",
      "industry": "Mining",
      "eventsSponsored": ["DEB-DC-2026"],
      "totalInvestment2026": 50000
    }
  ]
}
```

### Card Type Rendering Map

```json
{
  "cardTypes": {
    "standard_match_card": {
      "borderColors": {
        "upcoming": "#FFD700",
        "active_now": "#FFA500",
        "finished": "#505050"
      },
      "borderOpacity": 0.7,
      "layout": "horizontal_rectangular",
      "components": ["teamLogos", "score", "time", "venue"],
      "activityStates": ["upcoming", "active_now", "finished"]
    },
    "registration_state_card": {
      "borderColor": "#FFD700",
      "borderOpacity": 0.7,
      "components": ["eventName", "deadline", "progressBar", "registerButton"],
      "activityStates": ["pending", "recruiting"]
    },
    "match_making_card": {
      "borderColor": "#70AD47",
      "borderOpacity": 0.7,
      "components": ["positionNeeded", "urgency", "location", "whatsappButton"],
      "activityStates": ["recruiting"]
    },
    "news_flash_card": {
      "borderColor": "#87CEEB",
      "borderOpacity": 0.7,
      "components": ["associationLogo", "headline", "timestamp"],
      "activityStates": ["upcoming", "active_now"]
    }
  }
}
```

---

## IMPLEMENTATION NOTES FOR HTML5 APP

### IndexedDB Schema

```javascript
// Database name: MizanoEventsDB
// Version: 1

const dbSchema = {
  stores: [
    {
      name: "events",
      keyPath: "eventID",
      indexes: [
        { name: "sponsor", keyPath: "sponsor.name" },
        { name: "region", keyPath: "region" },
        { name: "startDate", keyPath: "dates.startDate" },
        { name: "activityState", keyPath: "mizanoIntegration.activityState" }
      ]
    },
    {
      name: "teams",
      keyPath: "teamID",
      indexes: [
        { name: "city", keyPath: "city" },
        { name: "region", keyPath: "region" },
        { name: "borrowScore", keyPath: "statistics2026.borrowScore" }
      ]
    },
    {
      name: "fixtures",
      keyPath: "fixtureID",
      indexes: [
        { name: "eventID", keyPath: "eventID" },
        { name: "dateTime", keyPath: "dateTime" },
        { name: "activityState", keyPath: "activityState" }
      ]
    },
    {
      name: "sponsors",
      keyPath: "sponsorID"
    }
  ]
};
```

### Offline Sync Strategy

```javascript
// Sync every 15 minutes when online
const syncConfig = {
  interval: 900000, // 15 minutes in milliseconds
  priority: {
    critical: ["activityState", "score", "roster"],
    high: ["fixtures", "standings"],
    normal: ["statistics", "news"],
    low: ["historical"]
  },
  conflictResolution: "last_write_wins",
  staffOverride: true
};
```

### WhatsApp Deep Link Generator

```javascript
function generateWhatsAppLink(phoneNumber, message) {
  const formattedNumber = phoneNumber.replace(/\D/g, ''); // Remove non-digits
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
}

// Example usage for event organizer contact
const eventOrganizerLink = generateWhatsAppLink(
  "+267XXXXXXXX",
  "Hello! I'm interested in the Mascom Kickoff Cup via Mizano."
);
```

### Activity State Management

```javascript
function updateActivityState(fixture) {
  const now = new Date();
  const matchDateTime = new Date(fixture.dateTime);
  const matchEnd = new Date(matchDateTime.getTime() + 120 * 60000); // +120 min
  
  if (now < matchDateTime) {
    const hoursUntil = (matchDateTime - now) / 3600000;
    if (hoursUntil <= 72) {
      return { state: "upcoming", borderColor: "#FFD700" };
    }
  } else if (now >= matchDateTime && now <= matchEnd) {
    return { state: "active_now", borderColor: "#FFA500", pulsing: true };
  } else {
    return { state: "finished", borderColor: "#505050" };
  }
}
```

---

## USAGE INSTRUCTIONS

### For App Developers

1. **Import Data:** Parse this file and seed IndexedDB on first app launch
2. **Offline Storage:** Store all events, teams, fixtures in IndexedDB for offline access
3. **Sync Logic:** Implement 15-minute sync cycle when online
4. **Dynamic Cards:** Use `cardType` and `borderColor` to render appropriate UI components
5. **WhatsApp Links:** Generate deep links using `generateWhatsAppLink()` function
6. **State Updates:** Call `updateActivityState()` on each render to ensure current status

### For Data Updates

- **Adding Events:** Follow JSON structure above, assign unique `eventID`
- **Team Updates:** Modify team roster, statistics, or achievements in teams database
- **Fixtures:** Create fixture objects with unique `fixtureID` in format `EVENT-ROUND-MATCH`
- **Sync Priorities:** Mark critical updates (scores, states) for immediate sync

### For Mizano Features

- **Guardian Approval:** Check `guardianRequired: true` and enforce Three-Way Handshake
- **Sponsor-a-Game:** Enable for events with `sponsorshipActive: true`
- **Equipment Borrowing:** Available when `equipmentBorrowing: true`
- **Fan Streams:** Allow submissions only when `allowFanStreams: true`
- **Village Waivers:** Apply when `villageWaiver: true` and team location is rural

---

## VERSION HISTORY

- **v1.0** (February 13, 2026): Initial database seed with 30 events
- **Next Update:** March 15, 2026 (post-Mascom Kickoff Cup results)

---

**Database Maintained By:** Mizano Technical Team  
**Contact:** data@mizano.co.bw  
**App Repository:** github.com/mizano/events-db  
**License:** Proprietary - Mizano Platform Use Only
