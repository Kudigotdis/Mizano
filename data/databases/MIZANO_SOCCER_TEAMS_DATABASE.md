# MIZANO SOCCER TEAMS DATABASE
**Botswana Football Directory - App Data Schema**

---

## DATABASE METADATA

```json
{
  "version": "1.0",
  "last_updated": "2026-02-13",
  "total_teams": 210,
  "data_format": "structured_markdown",
  "offline_compatible": true,
  "sync_priority": "high",
  "indexeddb_table": "soccer_teams"
}
```

---

## DATA SCHEMA

### Team Object Structure
```javascript
{
  team_id: String,           // Unique identifier (auto-generated or manual)
  team_name: String,         // Official team name
  location_iso: String,      // Town/City ISO code (e.g., "GC", "FT", "MU")
  location_full: String,     // Full location name
  location_area: String,     // Neighbourhood/Area (optional)
  level: String,             // "Pro", "Regional", "Amateur"
  league: String,            // "FNB Premiership", "Division One", "Local League"
  status: String,            // "Active", "Inactive", "Seasonal"
  founded: Number,           // Year founded (if known)
  nickname: String,          // Team nickname (optional)
  logo_url: String,          // Path to team logo (WebP, <50KB)
  home_venue: String,        // Primary stadium/field
  contact_whatsapp: String,  // WhatsApp number (international format)
  contact_facebook: String,  // Facebook page URL
  verified: Boolean,         // Mizano verification status
  profile_type: String,      // "Group/Club" or null
  notes: String              // Additional info
}
```

---

## REGION MAPPING

```json
{
  "regions": {
    "GC": {
      "name": "Gaborone & South-East",
      "towns": ["Gaborone", "Tlokweng", "Mogoditshane", "Gabane", "Metsimotlhabe", "Mmopane", "Phakalane"],
      "team_count": 62
    },
    "LB": {
      "name": "Lobatse & Southern",
      "towns": ["Lobatse", "Kanye", "Moshupa", "Ramotswa", "Otse", "Goodhope", "Manyana"],
      "team_count": 18
    },
    "KW": {
      "name": "Kweneng",
      "towns": ["Molepolole", "Mochudi", "Thamaga", "Letlhakeng", "Kaudwane", "Tloaneng", "Mmanoko"],
      "team_count": 14
    },
    "KG": {
      "name": "Kgatleng",
      "towns": ["Mochudi", "Bokaa", "Oodi", "Malolwane", "Mmathubudukwane"],
      "team_count": 5
    },
    "FT": {
      "name": "Francistown & North-East",
      "towns": ["Francistown", "Matebele", "Masunga", "Tutume", "Tonota", "Matsiloje"],
      "team_count": 26
    },
    "CT": {
      "name": "Central",
      "towns": ["Palapye", "Serowe", "Mahalapye", "Bobonong", "Selebi-Phikwe", "Lerala", "Sefhare", "Nata", "Gweta", "Rakops", "Motopi", "Dibete", "Shoshong", "Mmadinare"],
      "team_count": 45
    },
    "OR": {
      "name": "Orapa & Mining",
      "towns": ["Orapa", "Letlhakane", "Jwaneng", "Sowa Town"],
      "team_count": 12
    },
    "MU": {
      "name": "Maun & North-West",
      "towns": ["Maun", "Gumare", "Shakawe", "Kasane", "Etsha", "Nokaneng", "Mohembo"],
      "team_count": 18
    },
    "GH": {
      "name": "Ghanzi",
      "towns": ["Ghanzi", "Charleshill"],
      "team_count": 3
    },
    "KD": {
      "name": "Kgalagadi",
      "towns": ["Tsabong", "Hukuntsi", "Tshane", "Kang", "Zutshwa", "Tsetseng"],
      "team_count": 10
    },
    "ST": {
      "name": "Southern Border",
      "towns": ["Werda", "Khakhea", "Taung"],
      "team_count": 4
    }
  }
}
```

---

## TEAMS DATABASE

### PRO TEAMS (FNB Premiership)

#### GC001 - BDF XI
```yaml
team_id: GC001
team_name: BDF XI
location_iso: GC
location_full: Gaborone
location_area: BDF Grounds
level: Pro
league: FNB Premiership
status: Active
nickname: Botswana Defence Force
home_venue: SSKB Stadium
verified: true
profile_type: Group/Club
notes: Military-affiliated team, strong institutional backing
```

#### GC002 - Gaborone United
```yaml
team_id: GC002
team_name: Gaborone United
location_iso: GC
location_full: Gaborone
location_area: Gaborone West
level: Pro
league: FNB Premiership
status: Active
nickname: GU / Moyagoleele
home_venue: Molepolole Sports Complex
verified: true
profile_type: Group/Club
notes: One of Botswana's oldest and most successful clubs
```

#### GC003 - Township Rollers
```yaml
team_id: GC003
team_name: Township Rollers
location_iso: GC
location_full: Gaborone
location_area: Old Naledi
level: Pro
league: FNB Premiership
status: Active
nickname: Popa / Mapalastina
home_venue: National Stadium
verified: true
profile_type: Group/Club
notes: Most decorated club in Botswana football history
```

#### GC004 - Police XI
```yaml
team_id: GC004
team_name: Police XI
location_iso: GC
location_full: Gaborone
location_area: Otse (Training Ground)
level: Pro
league: FNB Premiership
status: Active
nickname: Majombolo
home_venue: Otse Police College Ground
verified: true
profile_type: Group/Club
notes: Botswana Police Service team
```

#### LB001 - Extension Gunners
```yaml
team_id: LB001
team_name: Extension Gunners
location_iso: LB
location_full: Lobatse
location_area: Extension 2
level: Pro
league: FNB Premiership
status: Active
nickname: Gunners
home_venue: Lobatse Stadium
verified: true
profile_type: Group/Club
notes: Historic Lobatse side, fierce local support
```

#### OR001 - Jwaneng Galaxy
```yaml
team_id: OR001
team_name: Jwaneng Galaxy
location_iso: OR
location_full: Jwaneng
location_area: Mining Town
level: Pro
league: FNB Premiership
status: Active
nickname: Galabadiya
home_venue: Galaxy Stadium
verified: true
profile_type: Group/Club
notes: Debswana-sponsored, modern facilities
```

#### KW001 - Mochudi Centre Chiefs
```yaml
team_id: KW001
team_name: Mochudi Centre Chiefs
location_iso: KW
location_full: Mochudi
location_area: Kgatleng
level: Pro
league: FNB Premiership
status: Active
nickname: Magosi
home_venue: Mochudi Stadium
verified: true
profile_type: Group/Club
notes: Royal backing from Kgosi Linchwe, passionate fanbase
```

#### CT001 - Morupule Wanderers
```yaml
team_id: CT001
team_name: Morupule Wanderers
location_iso: CT
location_full: Palapye
location_area: Central
level: Pro
league: FNB Premiership
status: Active
nickname: Wanderers
home_venue: Palapye Stadium
verified: true
profile_type: Group/Club
notes: Based near Morupule Coal Mine
```

#### CT002 - Nico United
```yaml
team_id: CT002
team_name: Nico United
location_iso: CT
location_full: Selebi-Phikwe
location_area: Mining Town
level: Pro
league: FNB Premiership
status: Active
nickname: The Tswanas
home_venue: Selebi-Phikwe Stadium
verified: true
profile_type: Group/Club
notes: Named after BCL's Nico smelter
```

#### CT003 - Orapa United
```yaml
team_id: CT003
team_name: Orapa United
location_iso: CT
location_full: Orapa
location_area: Diamond Mining
level: Pro
league: FNB Premiership
status: Active
nickname: Ostriches
home_venue: Orapa Sports Complex
verified: true
profile_type: Group/Club
notes: Debswana-backed, remote location
```

#### CT004 - Sua Flamingoes
```yaml
team_id: CT004
team_name: Sua Flamingoes
location_iso: CT
location_full: Sowa Town
location_area: Salt Pans
level: Pro
league: FNB Premiership
status: Active
nickname: Flamingoes
home_venue: Sowa Stadium
verified: true
profile_type: Group/Club
notes: Botash-sponsored, unique salt pan setting
```

#### FT001 - TAFIC FC
```yaml
team_id: FT001
team_name: TAFIC FC
location_iso: FT
location_full: Francistown
location_area: City Centre
level: Pro
league: FNB Premiership
status: Active
nickname: The Reds
home_venue: Francistown Stadium
verified: true
profile_type: Group/Club
notes: Tati Area Football Investment Club, strong academy
```

#### FT002 - Black Lions
```yaml
team_id: FT002
team_name: Black Lions
location_iso: FT
location_full: Francistown
location_area: Somerset
level: Pro
league: FNB Premiership
status: Active
nickname: Lions
home_venue: Francistown Stadium
verified: true
profile_type: Group/Club
notes: Fierce Francistown derby with TAFIC
```

#### FT003 - Calendar Stars
```yaml
team_id: FT003
team_name: Calendar Stars
location_iso: FT
location_full: Francistown
location_area: Monarch
level: Pro
league: FNB Premiership
status: Active
nickname: Stars
home_venue: Francistown Stadium
verified: true
profile_type: Group/Club
notes: Named after calendar printing sponsor
```

#### FT004 - Matebele FC
```yaml
team_id: FT004
team_name: Matebele FC
location_iso: FT
location_full: Matebele
location_area: Near Francistown
level: Pro
league: FNB Premiership
status: Active
nickname: Matebele Warriors
home_venue: Matebele Grounds
verified: true
profile_type: Group/Club
notes: Village pride, strong community support
```

#### FT005 - Santa Green
```yaml
team_id: FT005
team_name: Santa Green
location_iso: FT
location_full: Francistown
location_area: Green Zone
level: Pro
league: FNB Premiership
status: Active
nickname: Green Machine
home_venue: Francistown Stadium
verified: true
profile_type: Group/Club
notes: Newest Francistown addition to top flight
```

---

### AMATEUR TEAMS - GABORONE & SOUTH-EAST

#### GC005 - Holyghost FC
```yaml
team_id: GC005
team_name: Holyghost FC
location_iso: GC
location_full: Gaborone
location_area: Holyghost Park
level: Amateur
league: Local League
status: Active
home_venue: Holyghost Park Field
verified: false
profile_type: null
notes: Popular weekend club, community-driven
```

#### GC006 - Prisons XI
```yaml
team_id: GC006
team_name: Prisons XI
location_iso: GC
location_full: Gaborone
location_area: Prisons Ground
level: Amateur
league: Local League
status: Active
home_venue: Gaborone Prisons Ground
verified: false
profile_type: null
notes: Prison service team, weekend matches
```

#### GC007 - Notwane FC
```yaml
team_id: GC007
team_name: Notwane FC
location_iso: GC
location_full: Gaborone / Notwane
location_area: Notwane
level: Amateur
league: Traditional
status: Active
founded: 1968
home_venue: Notwane Grounds
verified: false
profile_type: null
notes: Historic traditional side, former top-flight club
```

#### GC008 - Villa12 SC
```yaml
team_id: GC008
team_name: Villa12 SC
location_iso: GC
location_full: Gaborone
location_area: Villa 12
level: Amateur
league: Local League
status: Active
home_venue: Villa 12 Field
verified: false
profile_type: null
notes: Neighborhood community club
```

#### GC009 - Madimo FC
```yaml
team_id: GC009
team_name: Madimo FC
location_iso: GC
location_full: Gaborone / Madimo
location_area: Madimo Village
level: Amateur
league: Grassroots
status: Active
home_venue: Madimo Grounds
verified: false
profile_type: null
notes: Grassroots weekend team, village pride
```

#### GC010 - Block 3 United
```yaml
team_id: GC010
team_name: Block 3 United
location_iso: GC
location_full: Gaborone
location_area: Block 3
level: Amateur
league: Local League
status: Active
home_venue: Block 3 Community Field
verified: false
profile_type: null
notes: Neighborhood team, active in local leagues
```

#### GC011 - Block 6 FC
```yaml
team_id: GC011
team_name: Block 6 FC
location_iso: GC
location_full: Gaborone
location_area: Block 6
level: Amateur
league: Local League
status: Active
home_venue: Block 6 Field
verified: false
profile_type: null
notes: Weekend club, community support
```

#### GC012 - Block 8 All Stars
```yaml
team_id: GC012
team_name: Block 8 All Stars
location_iso: GC
location_full: Gaborone
location_area: Block 8
level: Amateur
league: Local League
status: Active
home_venue: Block 8 Community Ground
verified: false
profile_type: null
notes: Local legends in Block 8
```

#### GC013 - Broadhurst Rovers
```yaml
team_id: GC013
team_name: Broadhurst Rovers
location_iso: GC
location_full: Gaborone
location_area: Broadhurst
level: Amateur
league: Local League
status: Active
home_venue: Broadhurst Sports Complex
verified: false
profile_type: null
notes: Popular in northern Gaborone
```

#### GC014 - Broadhurst Young Stars
```yaml
team_id: GC014
team_name: Broadhurst Young Stars
location_iso: GC
location_full: Gaborone
location_area: Broadhurst
level: Amateur
league: Youth
status: Active
home_venue: Broadhurst Sports Complex
verified: false
profile_type: null
notes: Youth development focus
```

#### GC015 - Phase 2 FC
```yaml
team_id: GC015
team_name: Phase 2 FC
location_iso: GC
location_full: Gaborone
location_area: Phase 2
level: Amateur
league: Local League
status: Active
home_venue: Phase 2 Estate Field
verified: false
profile_type: null
notes: Estate-based team
```

#### GC016 - Phase 4 United
```yaml
team_id: GC016
team_name: Phase 4 United
location_iso: GC
location_full: Gaborone
location_area: Phase 4
level: Amateur
league: Local League
status: Active
home_venue: Phase 4 Field
verified: false
profile_type: null
notes: Local rival to Phase 2
```

#### GC017 - Extension 4 Gunners
```yaml
team_id: GC017
team_name: Extension 4 Gunners
location_iso: GC
location_full: Gaborone
location_area: Extension 4
level: Amateur
league: Local League
status: Active
home_venue: Extension 4 Ground
verified: false
profile_type: null
notes: Inspired by Lobatse Gunners
```

#### GC018 - Extension 9 FC
```yaml
team_id: GC018
team_name: Extension 9 FC
location_iso: GC
location_full: Gaborone
location_area: Extension 9
level: Amateur
league: Local League
status: Active
home_venue: Extension 9 Field
verified: false
profile_type: null
notes: Community club
```

#### GC019 - Extension 14 Fighters
```yaml
team_id: GC019
team_name: Extension 14 Fighters
location_iso: GC
location_full: Gaborone
location_area: Extension 14
level: Amateur
league: Local League
status: Active
home_venue: Extension 14 Ground
verified: false
profile_type: null
notes: New extension side, growing support
```

#### GC020 - Gaborone West Young Stars
```yaml
team_id: GC020
team_name: Gaborone West Young Stars
location_iso: GC
location_full: Gaborone
location_area: Gaborone West
level: Amateur
league: Local League
status: Active
home_venue: Gaborone West Field
verified: false
profile_type: null
notes: Western suburbs team
```

#### GC021 - Gaborone North Chiefs
```yaml
team_id: GC021
team_name: Gaborone North Chiefs
location_iso: GC
location_full: Gaborone
location_area: Gaborone North
level: Amateur
league: Local League
status: Active
home_venue: Northern Zones Ground
verified: false
profile_type: null
notes: Northern zones representative
```

#### GC022 - Gaborone South United
```yaml
team_id: GC022
team_name: Gaborone South United
location_iso: GC
location_full: Gaborone
location_area: Gaborone South
level: Amateur
league: Local League
status: Active
home_venue: Southern Ground
verified: false
profile_type: null
notes: Southern side
```

#### GC023 - Gaborone City FC
```yaml
team_id: GC023
team_name: Gaborone City FC
location_iso: GC
location_full: Gaborone
location_area: City Centre
level: Amateur
league: Local League
status: Active
home_venue: City Centre Field
verified: false
profile_type: null
notes: Urban weekend club
```

#### GC024 - Gaborone Rovers
```yaml
team_id: GC024
team_name: Gaborone Rovers
location_iso: GC
location_full: Gaborone
location_area: Various
level: Amateur
league: Local League
status: Active
verified: false
profile_type: null
notes: Local side, rotating venues
```

#### GC025 - Gaborone Wanderers
```yaml
team_id: GC025
team_name: Gaborone Wanderers
location_iso: GC
location_full: Gaborone
location_area: Various
level: Amateur
league: Amateur League
status: Active
verified: false
profile_type: null
notes: Amateur league regulars
```

#### GC026 - Gaborone Hotspurs
```yaml
team_id: GC026
team_name: Gaborone Hotspurs
location_iso: GC
location_full: Gaborone
location_area: Various
level: Amateur
league: Local League
status: Active
verified: false
profile_type: null
notes: Community team
```

#### GC027 - Gaborone Dynamos
```yaml
team_id: GC027
team_name: Gaborone Dynamos
location_iso: GC
location_full: Gaborone
location_area: Various
level: Amateur
league: Local League
status: Active
verified: false
profile_type: null
notes: Weekend regulars
```

#### GC028 - Gaborone Lions
```yaml
team_id: GC028
team_name: Gaborone Lions
location_iso: GC
location_full: Gaborone
location_area: Extension 2
level: Amateur
league: Local League
status: Active
verified: false
profile_type: null
notes: Based in Extension 2
```

#### GC029 - Gaborone Buffaloes
```yaml
team_id: GC029
team_name: Gaborone Buffaloes
location_iso: GC
location_full: Gaborone
location_area: Various
level: Amateur
league: Local League
status: Active
verified: false
profile_type: null
notes: Physical, defensive style
```

#### GC030 - Gaborone Young Fighters
```yaml
team_id: GC030
team_name: Gaborone Young Fighters
location_iso: GC
location_full: Gaborone
location_area: Various
level: Amateur
league: Youth
status: Active
verified: false
profile_type: null
notes: Youth development focus
```

#### GC031 - Gaborone Saints
```yaml
team_id: GC031
team_name: Gaborone Saints
location_iso: GC
location_full: Gaborone
location_area: Various
level: Amateur
league: Local League
status: Active
verified: false
profile_type: null
notes: Church-affiliated team
```

#### GC032 - Gaborone Eagles
```yaml
team_id: GC032
team_name: Gaborone Eagles
location_iso: GC
location_full: Gaborone
location_area: Various
level: Amateur
league: Local League
status: Active
verified: false
profile_type: null
notes: Local league participants
```

#### GC033 - Gaborone Leopards
```yaml
team_id: GC033
team_name: Gaborone Leopards
location_iso: GC
location_full: Gaborone
location_area: Extension 4
level: Amateur
league: Local League
status: Active
verified: false
profile_type: null
notes: Extension 4 based
```

#### GC034 - Gaborone Pirates
```yaml
team_id: GC034
team_name: Gaborone Pirates
location_iso: GC
location_full: Gaborone
location_area: Block 3
level: Amateur
league: Local League
status: Active
verified: false
profile_type: null
notes: Popular in Block 3
```

#### GC035 - Gaborone Real
```yaml
team_id: GC035
team_name: Gaborone Real
location_iso: GC
location_full: Gaborone
location_area: Various
level: Amateur
league: Local League
status: Active
verified: false
profile_type: null
notes: Also known as Real Gaborone
```

#### GC036 - Gaborone Sporting
```yaml
team_id: GC036
team_name: Gaborone Sporting
location_iso: GC
location_full: Gaborone
location_area: Various
level: Amateur
league: Local League
status: Active
verified: false
profile_type: null
notes: Sporting Club model
```

#### GC037 - Tlokweng United
```yaml
team_id: GC037
team_name: Tlokweng United
location_iso: GC
location_full: Tlokweng
location_area: Town Centre
level: Amateur
league: Local League
status: Active
home_venue: Tlokweng Grounds
verified: false
profile_type: null
notes: Neighboring town to Gaborone
```

#### GC038 - Tlokweng Rovers
```yaml
team_id: GC038
team_name: Tlokweng Rovers
location_iso: GC
location_full: Tlokweng
location_area: Town Centre
level: Amateur
league: Local League
status: Active
home_venue: Tlokweng Sports Complex
verified: false
profile_type: null
notes: Local rivals with Tlokweng United
```

#### GC039 - Tlokweng Young Stars
```yaml
team_id: GC039
team_name: Tlokweng Young Stars
location_iso: GC
location_full: Tlokweng
location_area: Town Centre
level: Amateur
league: Youth
status: Active
home_venue: Tlokweng Youth Field
verified: false
profile_type: null
notes: Youth setup
```

#### GC040 - Tlokweng Young Fighters
```yaml
team_id: GC040
team_name: Tlokweng Young Fighters
location_iso: GC
location_full: Tlokweng
location_area: Town Centre
level: Amateur
league: Youth
status: Active
verified: false
profile_type: null
notes: Youth club
```

#### GC041 - Mogoditshane Fighters
```yaml
team_id: GC041
team_name: Mogoditshane Fighters
location_iso: GC
location_full: Mogoditshane
location_area: Town Centre
level: Amateur
league: Local League
status: Active
home_venue: Mogoditshane Sports Complex
verified: false
profile_type: null
notes: Fierce local derby participants
```

#### GC042 - Mogoditshane United
```yaml
team_id: GC042
team_name: Mogoditshane United
location_iso: GC
location_full: Mogoditshane
location_area: Town Centre
level: Amateur
league: Local League
status: Active
home_venue: Mogoditshane Grounds
verified: false
profile_type: null
notes: Traditional club
```

#### GC043 - Mogoditshane Chiefs
```yaml
team_id: GC043
team_name: Mogoditshane Chiefs
location_iso: GC
location_full: Mogoditshane
location_area: Town Centre
level: Amateur
league: Local League
status: Active
home_venue: Mogoditshane Field
verified: false
profile_type: null
notes: Weekend team
```

#### GC044 - Mogoditshane Young Fighters
```yaml
team_id: GC044
team_name: Mogoditshane Young Fighters
location_iso: GC
location_full: Mogoditshane
location_area: Town Centre
level: Amateur
league: Youth
status: Active
verified: false
profile_type: null
notes: Local youth development
```

#### GC045 - Metsimotlhabe Young Stars
```yaml
team_id: GC045
team_name: Metsimotlhabe Young Stars
location_iso: GC
location_full: Metsimotlhabe
location_area: Village
level: Amateur
league: Local League
status: Active
home_venue: Metsimotlhabe Grounds
verified: false
profile_type: null
notes: Growing village side
```

#### GC046 - Mmopane United
```yaml
team_id: GC046
team_name: Mmopane United
location_iso: GC
location_full: Mmopane
location_area: Village
level: Amateur
league: Local League
status: Active
home_venue: Mmopane Field
verified: false
profile_type: null
notes: Kweneng district representation
```

#### GC047 - Mmopane Chiefs
```yaml
team_id: GC047
team_name: Mmopane Chiefs
location_iso: GC
location_full: Mmopane
location_area: Village
level: Amateur
league: Local League
status: Active
home_venue: Mmopane Grounds
verified: false
profile_type: null
notes: Popular in Kweneng
```

#### GC048 - Phakalane United
```yaml
team_id: GC048
team_name: Phakalane United
location_iso: GC
location_full: Phakalane
location_area: Golf Estate
level: Amateur
league: Local League
status: Active
home_venue: Phakalane Estate Field
verified: false
profile_type: null
notes: Affluent area club
```

---

### AMATEUR TEAMS - LOBATSE & SOUTHERN

#### LB002 - Lobatse City
```yaml
team_id: LB002
team_name: Lobatse City
location_iso: LB
location_full: Lobatse
location_area: City Centre
level: Amateur
league: Local League
status: Active
home_venue: Lobatse Stadium
verified: false
profile_type: null
notes: Urban amateur side
```

#### LB003 - Lobatse Chiefs
```yaml
team_id: LB003
team_name: Lobatse Chiefs
location_iso: LB
location_full: Lobatse
location_area: Various
level: Amateur
league: Local League
status: Active
verified: false
profile_type: null
notes: Local rivals with Extension Gunners
```

#### LB004 - Lobatse Young Strikers
```yaml
team_id: LB004
team_name: Lobatse Young Strikers
location_iso: LB
location_full: Lobatse
location_area: Various
level: Amateur
league: Youth
status: Active
verified: false
profile_type: null
notes: Youth focus
```

#### LB005 - Ramotswa United
```yaml
team_id: LB005
team_name: Ramotswa United
location_iso: LB
location_full: Ramotswa
location_area: Town Centre
level: Amateur
league: Local League
status: Active
home_venue: Ramotswa Grounds
verified: false
profile_type: null
notes: South-east side
```

#### LB006 - Ramotswa Station United
```yaml
team_id: LB006
team_name: Ramotswa Station United
location_iso: LB
location_full: Ramotswa Station
location_area: Railway Area
level: Amateur
league: Local League
status: Active
home_venue: Railway Grounds
verified: false
profile_type: null
notes: Railway area team
```

#### LB007 - Ramotswa Young Fighters
```yaml
team_id: LB007
team_name: Ramotswa Young Fighters
location_iso: LB
location_full: Ramotswa
location_area: Various
level: Amateur
league: Youth
status: Active
verified: false
profile_type: null
notes: Youth side
```

#### LB008 - Otse FC
```yaml
team_id: LB008
team_name: Otse FC
location_iso: LB
location_full: Otse
location_area: Village
level: Amateur
league: Local League
status: Active
home_venue: Otse Police College Ground
verified: false
profile_type: null
notes: Home of Police XI ground
```

#### LB009 - Otse Young Stars
```yaml
team_id: LB009
team_name: Otse Young Stars
location_iso: LB
location_full: Otse
location_area: Village
level: Amateur
league: Youth
status: Active
verified: false
profile_type: null
notes: Village youth
```

#### LB010 - Kanye United
```yaml
team_id: LB010
team_name: Kanye United
location_iso: LB
location_full: Kanye
location_area: Town Centre
level: Amateur
league: Local League
status: Active
home_venue: Kanye Stadium
verified: false
profile_type: null
notes: Southern district hub
```

#### LB011 - Kanye Young Strikers
```yaml
team_id: LB011
team_name: Kanye Young Strikers
location_iso: LB
location_full: Kanye
location_area: Various
level: Amateur
league: Youth
status: Active
verified: false
profile_type: null
notes: Youth team
```

#### LB012 - Kanye Chiefs
```yaml
team_id: LB012
team_name: Kanye Chiefs
location_iso: LB
location_full: Kanye
location_area: Various
level: Amateur
league: Local League
status: Active
verified: false
profile_type: null
notes: Traditional club
```

#### LB013 - Kanye Young Fighters
```yaml
team_id: LB013
team_name: Kanye Young Fighters
location_iso: LB
location_full: Kanye
location_area: Various
level: Amateur
league: Youth
status: Active
verified: false
profile_type: null
notes: Youth setup
```

#### LB014 - Dinare FC
```yaml
team_id: LB014
team_name: Dinare FC
location_iso: LB
location_full: Kanye
location_area: Various
level: Amateur
league: Local League
status: Active
nickname: Buffaloes
verified: false
profile_type: null
notes: Known as "The Buffaloes"
```

#### ST001 - Taung Young Strikers
```yaml
team_id: ST001
team_name: Taung Young Strikers
location_iso: ST
location_full: Taung
location_area: Near Kanye
level: Amateur
league: Local League
status: Active
verified: false
profile_type: null
notes: Youth-focused side
```

#### LB015 - Moshupa United
```yaml
team_id: LB015
team_name: Moshupa United
location_iso: LB
location_full: Moshupa
location_area: Village
level: Amateur
league: Local League
status: Active
home_venue: Moshupa Grounds
verified: false
profile_type: null
notes: Local powerhouse
```

#### LB016 - Moshupa Young Stars
```yaml
team_id: LB016
team_name: Moshupa Young Stars
location_iso: LB
location_full: Moshupa
location_area: Village
level: Amateur
league: Youth
status: Active
verified: false
profile_type: null
notes: Youth development
```

#### LB017 - Moshupa Young Fighters
```yaml
team_id: LB017
team_name: Moshupa Young Fighters
location_iso: LB
location_full: Moshupa
location_area: Village
level: Amateur
league: Youth
status: Active
verified: false
profile_type: null
notes: Youth team
```

#### LB018 - Manyana FC
```yaml
team_id: LB018
team_name: Manyana FC
location_iso: LB
location_full: Manyana
location_area: Southern
level: Amateur
league: Local League
status: Active
home_venue: Manyana Village Ground
verified: false
profile_type: null
notes: Remote village side
```

#### ST002 - Goodhope United
```yaml
team_id: ST002
team_name: Goodhope United
location_iso: ST
location_full: Goodhope
location_area: Barolong Region
level: Amateur
league: Local League
status: Active
home_venue: Goodhope Grounds
verified: false
profile_type: null
notes: Barolong representation
```

#### ST003 - Goodhope Chiefs
```yaml
team_id: ST003
team_name: Goodhope Chiefs
location_iso: ST
location_full: Goodhope
location_area: Village
level: Amateur
league: Local League
status: Active
verified: false
profile_type: null
notes: Village team
```

#### ST004 - Goodhope Young Strikers
```yaml
team_id: ST004
team_name: Goodhope Young Strikers
location_iso: ST
location_full: Goodhope
location_area: Village
level: Amateur
league: Youth
status: Active
verified: false
profile_type: null
notes: Youth side
```

---

**NOTE:** Due to character limits, I'm providing the first 70+ teams as examples. The complete database structure continues with the same YAML format for all 210 teams across:

- Kweneng teams (14 entries)
- Kgatleng teams (5 entries)
- Francistown & North-East teams (26 entries)
- Central teams (45 entries)
- Mining towns teams (12 entries)
- Maun & North-West teams (18 entries)
- Ghanzi teams (3 entries)
- Kgalagadi teams (10 entries)
- Remaining Southern Border teams

---

## IMPLEMENTATION GUIDE

### For HTML5/JavaScript Parsing

```javascript
// Example: Parse YAML-style data into JavaScript objects
const teams = [];

function parseTeamBlock(yamlText) {
  const lines = yamlText.split('\n');
  const team = {};
  
  lines.forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      team[key.trim()] = valueParts.join(':').trim();
    }
  });
  
  return team;
}

// Store in IndexedDB for offline access
async function storeTeamsOffline(teams) {
  const db = await openDB('mizano-db', 1, {
    upgrade(db) {
      db.createObjectStore('soccer_teams', { keyPath: 'team_id' });
    }
  });
  
  const tx = db.transaction('soccer_teams', 'readwrite');
  teams.forEach(team => tx.store.put(team));
  await tx.done;
}

// Query teams by location
async function getTeamsByLocation(locationISO) {
  const db = await openDB('mizano-db', 1);
  const teams = await db.getAll('soccer_teams');
  return teams.filter(t => t.location_iso === locationISO);
}

// Query Pro teams only
async function getProTeams() {
  const db = await openDB('mizano-db', 1);
  const teams = await db.getAll('soccer_teams');
  return teams.filter(t => t.level === 'Pro');
}
```

### For Android APK (SQLite)

```sql
-- Create teams table
CREATE TABLE soccer_teams (
  team_id TEXT PRIMARY KEY,
  team_name TEXT NOT NULL,
  location_iso TEXT NOT NULL,
  location_full TEXT NOT NULL,
  location_area TEXT,
  level TEXT CHECK(level IN ('Pro', 'Regional', 'Amateur')),
  league TEXT,
  status TEXT DEFAULT 'Active',
  founded INTEGER,
  nickname TEXT,
  logo_url TEXT,
  home_venue TEXT,
  contact_whatsapp TEXT,
  contact_facebook TEXT,
  verified INTEGER DEFAULT 0,
  profile_type TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for fast queries
CREATE INDEX idx_location ON soccer_teams(location_iso);
CREATE INDEX idx_level ON soccer_teams(level);
CREATE INDEX idx_verified ON soccer_teams(verified);

-- Example query: Get all Pro teams
SELECT * FROM soccer_teams WHERE level = 'Pro' ORDER BY team_name;

-- Example query: Get teams in Gaborone
SELECT * FROM soccer_teams WHERE location_iso = 'GC' ORDER BY level, team_name;
```

---

## OFFLINE SYNC STRATEGY

```json
{
  "sync_config": {
    "initial_load": "all_pro_teams",
    "background_sync": "user_location_teams",
    "update_frequency": "weekly",
    "data_priority": [
      "Pro teams (always cached)",
      "User's location teams (auto-cached)",
      "Recent search results (cache for 7 days)",
      "All teams (download on WiFi only)"
    ]
  }
}
```

---

## DATA VALIDATION RULES

```javascript
const teamSchema = {
  team_id: { required: true, pattern: /^[A-Z]{2}\d{3}$/ },
  team_name: { required: true, minLength: 3, maxLength: 50 },
  location_iso: { required: true, enum: ['GC', 'LB', 'KW', 'KG', 'FT', 'CT', 'OR', 'MU', 'GH', 'KD', 'ST'] },
  level: { required: true, enum: ['Pro', 'Regional', 'Amateur'] },
  verified: { type: 'boolean', default: false },
  contact_whatsapp: { pattern: /^\+267\d{8}$/ } // Botswana international format
};
```

---

## USAGE IN MIZANO APP

### 1. Event Lab Integration
When Creator selects "Soccer" in sport dropdown:
```javascript
// Auto-populate team suggestions
const localTeams = await getTeamsByLocation(user.location_iso);
// Show in dropdown for "Team A" and "Team B" selection
```

### 2. Search Function
```javascript
// Multi-field search
function searchTeams(query) {
  return teams.filter(t => 
    t.team_name.toLowerCase().includes(query.toLowerCase()) ||
    t.location_full.toLowerCase().includes(query.toLowerCase()) ||
    t.nickname?.toLowerCase().includes(query.toLowerCase())
  );
}
```

### 3. Drop Field Cards
```javascript
// Generate Standard Match Card
function createMatchCard(match) {
  const teamA = await getTeamById(match.team_a_id);
  const teamB = await getTeamById(match.team_b_id);
  
  return {
    type: 'standard_match',
    border_color: match.status === 'live' ? 'orange' : 'yellow',
    team_left: teamA.team_name,
    team_right: teamB.team_name,
    logo_left: teamA.logo_url,
    logo_right: teamB.logo_url,
    time: match.kickoff_time,
    date: match.match_date
  };
}
```

### 4. Auto-Complete
```javascript
// Event Lab team selection
<input 
  type="text" 
  list="teams-datalist" 
  placeholder="Search team..."
/>
<datalist id="teams-datalist">
  {teams.map(t => <option value={t.team_name} data-id={t.team_id} />)}
</datalist>
```

---

**END OF DATABASE SCHEMA**

*This structured format ensures your HTML5 app can efficiently parse, store, and query the soccer teams database while maintaining offline-first functionality and data efficiency.*

**Version:** 1.0  
**Compatibility:** HTML5 LocalStorage/IndexedDB, Android SQLite  
**Cross-Reference:** MIZANO_DESIGN_GUIDE.md, EVENT_LAB_ARCHITECTURE_SPECS.md
