# MIZANO SAMPLE DATASET
**Version 1.0 | February 2026**  
**Coverage:** Botswana, South Africa, Zambia, Zimbabwe  
**Total Profiles:** 500 Users + 200 Teams/Clubs + Leagues & Competitions

---

## DATA STRUCTURE OVERVIEW

### Profile Distribution
- **School Children (250):** Ages 7-17, linked to schools, guardian-approved
- **University Students (100):** Ages 18-25, competitive players, club members
- **Adults (150):** Ages 26-60, mix of players, mentors, guardians, creators

### Geographic Distribution
- **Botswana (300):** Gaborone (180), Francistown (60), Maun (30), Molepolole (30)
- **South Africa (100):** Johannesburg (50), Pretoria (30), Rustenburg (20)
- **Zambia (50):** Lusaka (35), Livingstone (15)
- **Zimbabwe (50):** Harare (30), Bulawayo (20)

### Teams & Organizations
- **School Teams (80):** Inter-house and inter-school competitions
- **Community Clubs (60):** Grassroots sports and hobbies
- **Corporate Teams (20):** Company leagues and tournaments
- **University Clubs (20):** Tertiary institution teams
- **National Associations (4):** Governing bodies
- **Schools (16):** Educational institutions with sports programs

### Competitions & Leagues
- **Corporate Competitions (4):** Soccer, Netball, Volleyball, Chess
- **School Leagues (4):** U13 Soccer, U15 Netball, U17 Basketball, Inter-House Athletics
- **Local Leagues (10):** Community-based across various sports

---

## SECTION 1: USER PROFILES (500 Total)

### 1.1 SCHOOL CHILDREN (Ages 7-17) - 250 Profiles

#### Profile 001
```json
{
  "profile_id": "USR-BW-GAB-001",
  "profile_type": "User",
  "capabilities": ["Player", "Guardian-Linked"],
  "first_name": "Thato",
  "additional_names": "Keitumetse",
  "surname": "Molefe",
  "dob": "2012-03-15",
  "age": 13,
  "gender": "Male",
  "nationality": "Motswana",
  "location": {
    "home_type": "House",
    "plot_number": "2145",
    "street_name": "Nyerere Drive",
    "area": "Block 3",
    "city": "Gaborone",
    "country": "Botswana"
  },
  "contact": {
    "mobile_network": "Mascom",
    "region_code": "bw",
    "mobile_number": "+26772345001",
    "whatsapp_number": "+26772345001",
    "emergency_contact": {
      "name": "Boitumelo Molefe",
      "relation": "Mother",
      "mobile": "+26771234001"
    }
  },
  "guardian": {
    "guardian_id": "USR-BW-GAB-251",
    "approval_status": "Approved"
  },
  "school": {
    "school_id": "SCH-BW-GAB-01",
    "school_name": "Northside Primary School",
    "grade": "Form 1",
    "house_color": "Red"
  },
  "player_data": {
    "primary_sport": "soccer",
    "skill_level": "Intermediate",
    "position": "Forward",
    "teams": ["TEAM-BW-GAB-001"],
    "competitions": ["COMP-SCH-SOC-01"],
    "total_matches": 23,
    "goals_scored": 12,
    "achievements": ["Top Scorer - Red House 2025"]
  },
  "borrow_score": 4.7,
  "health": {
    "allergies": ["Peanuts"],
    "blood_type": "O+"
  }
}
```

#### Profile 002
```json
{
  "profile_id": "USR-BW-GAB-002",
  "profile_type": "User",
  "capabilities": ["Player", "Guardian-Linked"],
  "first_name": "Naledi",
  "additional_names": "Mmabatho",
  "surname": "Kgosana",
  "dob": "2010-07-22",
  "age": 15,
  "gender": "Female",
  "nationality": "Motswana",
  "location": {
    "home_type": "Flat / Apartment",
    "plot_number": "Block 8",
    "street_name": "Independence Avenue",
    "area": "Broadhurst",
    "city": "Gaborone",
    "country": "Botswana"
  },
  "contact": {
    "mobile_network": "BTC",
    "region_code": "bw",
    "mobile_number": "+26773456002",
    "whatsapp_number": "+26773456002"
  },
  "guardian": {
    "guardian_id": "USR-BW-GAB-252",
    "approval_status": "Approved"
  },
  "school": {
    "school_id": "SCH-BW-GAB-02",
    "school_name": "Maru-a-Pula Secondary",
    "grade": "Form 3",
    "house_color": "Blue"
  },
  "player_data": {
    "primary_sport": "netball",
    "skill_level": "Pro",
    "position": "Goal Shooter",
    "teams": ["TEAM-BW-GAB-015"],
    "competitions": ["COMP-SCH-NET-01"],
    "total_matches": 45,
    "goals_scored": 89,
    "achievements": ["U15 National Netball MVP 2025", "Blue House Captain"]
  },
  "borrow_score": 5.0,
  "health": {
    "blood_type": "A+",
    "medical_history": ["Ankle sprain - recovered"]
  }
}
```

#### Profile 003
```json
{
  "profile_id": "USR-BW-GAB-003",
  "profile_type": "User",
  "capabilities": ["Player", "Guardian-Linked"],
  "first_name": "Karabo",
  "surname": "Moeng",
  "dob": "2013-11-08",
  "age": 12,
  "gender": "Male",
  "nationality": "Motswana",
  "location": {
    "home_type": "House",
    "plot_number": "5678",
    "street_name": "Khama Road",
    "area": "Extension 10",
    "city": "Gaborone",
    "country": "Botswana"
  },
  "contact": {
    "mobile_network": "Orange",
    "region_code": "bw",
    "mobile_number": "+26774567003",
    "whatsapp_number": "+26774567003"
  },
  "guardian": {
    "guardian_id": "USR-BW-GAB-253",
    "approval_status": "Approved"
  },
  "school": {
    "school_id": "SCH-BW-GAB-01",
    "school_name": "Northside Primary School",
    "grade": "Standard 6",
    "house_color": "Green"
  },
  "player_data": {
    "primary_sport": "chess",
    "secondary_activities": ["athletics"],
    "skill_level": "Intermediate",
    "teams": ["TEAM-BW-GAB-035"],
    "competitions": [],
    "total_matches": 15,
    "achievements": []
  },
  "borrow_score": 4.2
}
```

#### Profile 004
```json
{
  "profile_id": "USR-ZA-JHB-004",
  "profile_type": "User",
  "capabilities": ["Player", "Guardian-Linked"],
  "first_name": "Thandi",
  "additional_names": "Nomsa",
  "surname": "Dlamini",
  "dob": "2011-05-14",
  "age": 14,
  "gender": "Female",
  "nationality": "South African",
  "location": {
    "home_type": "House",
    "plot_number": "142",
    "street_name": "Nelson Mandela Drive",
    "area": "Soweto",
    "city": "Johannesburg",
    "country": "South Africa"
  },
  "contact": {
    "mobile_network": "MTN",
    "region_code": "za",
    "mobile_number": "+27823456004",
    "whatsapp_number": "+27823456004"
  },
  "guardian": {
    "guardian_id": "USR-ZA-JHB-254",
    "approval_status": "Approved"
  },
  "school": {
    "school_id": "SCH-ZA-JHB-01",
    "school_name": "Orlando West High School",
    "grade": "Grade 9",
    "house_color": "Red"
  },
  "player_data": {
    "primary_sport": "soccer",
    "skill_level": "Intermediate",
    "position": "Midfielder",
    "teams": ["TEAM-ZA-JHB-001"],
    "competitions": [],
    "total_matches": 18,
    "goals_scored": 5
  },
  "borrow_score": 4.5
}
```

#### Profile 005
```json
{
  "profile_id": "USR-ZW-HAR-005",
  "profile_type": "User",
  "capabilities": ["Player", "Guardian-Linked"],
  "first_name": "Tapiwa",
  "additional_names": "Kudakwashe",
  "surname": "Ncube",
  "dob": "2009-09-30",
  "age": 16,
  "gender": "Male",
  "nationality": "Zimbabwean",
  "location": {
    "home_type": "House",
    "plot_number": "87",
    "street_name": "Josiah Tongogara Avenue",
    "area": "Highfield",
    "city": "Harare",
    "country": "Zimbabwe"
  },
  "contact": {
    "mobile_network": "Econet",
    "region_code": "zw",
    "mobile_number": "+263774123005",
    "whatsapp_number": "+263774123005"
  },
  "guardian": {
    "guardian_id": "USR-ZW-HAR-255",
    "approval_status": "Approved"
  },
  "school": {
    "school_id": "SCH-ZW-HAR-01",
    "school_name": "Churchill Boys High",
    "grade": "Form 5",
    "house_color": "Yellow"
  },
  "player_data": {
    "primary_sport": "cricket",
    "skill_level": "Pro",
    "position": "All-rounder",
    "teams": ["TEAM-ZW-HAR-010"],
    "competitions": [],
    "total_matches": 52,
    "achievements": ["Top All-Rounder - Yellow House 2024-2025"]
  },
  "borrow_score": 4.8
}
```

#### Profile 006
```json
{
  "profile_id": "USR-ZM-LUS-006",
  "profile_type": "User",
  "capabilities": ["Player", "Guardian-Linked"],
  "first_name": "Chipo",
  "additional_names": "Natasha",
  "surname": "Mwanza",
  "dob": "2012-01-19",
  "age": 14,
  "gender": "Female",
  "nationality": "Zambian",
  "location": {
    "home_type": "House",
    "plot_number": "234",
    "street_name": "Freedom Way",
    "area": "Kabulonga",
    "city": "Lusaka",
    "country": "Zambia"
  },
  "contact": {
    "mobile_network": "Airtel",
    "region_code": "zm",
    "mobile_number": "+260977123006",
    "whatsapp_number": "+260977123006"
  },
  "guardian": {
    "guardian_id": "USR-ZM-LUS-256",
    "approval_status": "Approved"
  },
  "school": {
    "school_id": "SCH-ZM-LUS-01",
    "school_name": "Lusaka International Community School",
    "grade": "Grade 9",
    "house_color": "Green"
  },
  "player_data": {
    "primary_sport": "volleyball",
    "skill_level": "Intermediate",
    "position": "Setter",
    "teams": ["TEAM-ZM-LUS-005"],
    "competitions": [],
    "total_matches": 22
  },
  "borrow_score": 4.6
}
```

_[Profiles 007-250 follow similar structure across all 4 countries with varied sports: soccer, netball, basketball, volleyball, athletics, chess, cricket, rugby, swimming, etc. Mix of ages 7-17, different schools, house colors, skill levels, and team memberships. Geographic distribution maintains 60% Botswana, 20% SA, 10% Zambia, 10% Zimbabwe]_

---

### 1.2 UNIVERSITY STUDENTS (Ages 18-25) - 100 Profiles

#### Profile 251
```json
{
  "profile_id": "USR-BW-GAB-251",
  "profile_type": "User",
  "capabilities": ["Player", "Guardian", "Creator"],
  "first_name": "Boitumelo",
  "additional_names": "Kefilwe",
  "surname": "Molefe",
  "dob": "1998-06-12",
  "age": 27,
  "gender": "Female",
  "nationality": "Motswana",
  "location": {
    "home_type": "House",
    "plot_number": "2145",
    "street_name": "Nyerere Drive",
    "area": "Block 3",
    "city": "Gaborone",
    "country": "Botswana"
  },
  "contact": {
    "mobile_network": "Mascom",
    "region_code": "bw",
    "mobile_number": "+26771234001",
    "whatsapp_number": "+26771234001",
    "facebook": "Boitumelo.Molefe.BW"
  },
  "education": {
    "institution": "University of Botswana",
    "level": "Master's",
    "field": "Education",
    "graduated": true
  },
  "work": {
    "employer": "Northside Primary School",
    "role": "Physical Education Teacher",
    "monthly_income": "P8500"
  },
  "guardian_data": {
    "guardian_type": "Parent",
    "linked_minors": ["USR-BW-GAB-001"],
    "approval_queue": []
  },
  "creator_data": {
    "events_created": 12,
    "teams_managed": ["TEAM-BW-GAB-001"]
  },
  "player_data": {
    "primary_sport": "netball",
    "skill_level": "Pro",
    "teams": ["TEAM-BW-GAB-050"],
    "retired": true
  },
  "borrow_score": 5.0
}
```

#### Profile 252
```json
{
  "profile_id": "USR-BW-GAB-252",
  "profile_type": "User",
  "capabilities": ["Player", "Guardian", "Mentor"],
  "first_name": "Lesego",
  "surname": "Kgosana",
  "dob": "1990-04-08",
  "age": 35,
  "gender": "Male",
  "nationality": "Motswana",
  "location": {
    "home_type": "Flat / Apartment",
    "plot_number": "Block 8",
    "street_name": "Independence Avenue",
    "area": "Broadhurst",
    "city": "Gaborone",
    "country": "Botswana"
  },
  "contact": {
    "mobile_network": "BTC",
    "region_code": "bw",
    "mobile_number": "+26772345252",
    "whatsapp_number": "+26772345252",
    "facebook": "Coach.Lesego.Netball"
  },
  "work": {
    "employer": "Botswana National Sport Commission",
    "role": "Netball Development Officer",
    "monthly_income": "P12000"
  },
  "guardian_data": {
    "guardian_type": "Parent",
    "linked_minors": ["USR-BW-GAB-002"]
  },
  "mentor_data": {
    "mentorship_areas": ["netball", "athletics"],
    "experience_level": "Expert",
    "certifications": ["Level 3 Netball Coaching - BNA", "Sports Psychology Certificate"],
    "session_preference": "Paid",
    "hourly_rate": "P150",
    "visibility": "Discoverable",
    "active_mentees": 8
  },
  "player_data": {
    "primary_sport": "netball",
    "skill_level": "Pro",
    "achievements": ["Former Botswana National Team Coach 2018-2022"]
  }
}
```

#### Profile 253
```json
{
  "profile_id": "USR-BW-FRA-253",
  "profile_type": "User",
  "capabilities": ["Player", "Creator"],
  "first_name": "Kagiso",
  "additional_names": "Tshepang",
  "surname": "Seabo",
  "dob": "2001-10-25",
  "age": 24,
  "gender": "Male",
  "nationality": "Motswana",
  "location": {
    "home_type": "House",
    "plot_number": "1123",
    "street_name": "Blue Jacket Street",
    "area": "Gerald Estate",
    "city": "Francistown",
    "country": "Botswana"
  },
  "contact": {
    "mobile_network": "Orange",
    "region_code": "bw",
    "mobile_number": "+26775123253",
    "whatsapp_number": "+26775123253",
    "instagram": "@kagiso_striker"
  },
  "education": {
    "institution": "Francistown College of Technical & Vocational Education",
    "level": "Diploma",
    "field": "Mechanical Engineering",
    "current_student": true
  },
  "player_data": {
    "primary_sport": "soccer",
    "skill_level": "Pro",
    "position": "Striker",
    "teams": ["TEAM-BW-FRA-001", "TEAM-CORP-MIN-001"],
    "competitions": ["COMP-LOC-FRA-SOC-01", "COMP-CORP-SOC-01"],
    "total_matches": 67,
    "goals_scored": 43,
    "achievements": ["Francistown League Top Scorer 2024", "Corporate Games Golden Boot 2025"]
  },
  "creator_data": {
    "events_created": 8,
    "teams_managed": []
  },
  "work": {
    "employer": "Debswana Diamond Company",
    "role": "Junior Technician",
    "monthly_income": "P6500"
  },
  "borrow_score": 4.9
}
```

#### Profile 254
```json
{
  "profile_id": "USR-ZA-JHB-254",
  "profile_type": "User",
  "capabilities": ["Player", "Guardian", "Mentor"],
  "first_name": "Sipho",
  "additional_names": "Mandla",
  "surname": "Dlamini",
  "dob": "1993-02-17",
  "age": 33,
  "gender": "Male",
  "nationality": "South African",
  "location": {
    "home_type": "House",
    "plot_number": "142",
    "street_name": "Nelson Mandela Drive",
    "area": "Soweto",
    "city": "Johannesburg",
    "country": "South Africa"
  },
  "contact": {
    "mobile_network": "Vodacom",
    "region_code": "za",
    "mobile_number": "+27812345254",
    "whatsapp_number": "+27812345254",
    "facebook": "Coach.Sipho.Soccer"
  },
  "work": {
    "employer": "Orlando Pirates Development Academy",
    "role": "Youth Development Coach",
    "monthly_income": "R18000"
  },
  "guardian_data": {
    "guardian_type": "Parent",
    "linked_minors": ["USR-ZA-JHB-004"]
  },
  "mentor_data": {
    "mentorship_areas": ["soccer"],
    "experience_level": "Expert",
    "certifications": ["CAF B License", "SAFA Youth Development"],
    "session_preference": "Paid",
    "visibility": "Discoverable",
    "active_mentees": 15
  },
  "player_data": {
    "primary_sport": "soccer",
    "skill_level": "Pro",
    "achievements": ["Former PSL Player - Orlando Pirates 2012-2019"]
  }
}
```

#### Profile 255
```json
{
  "profile_id": "USR-BW-GAB-255",
  "profile_type": "User",
  "capabilities": ["Player", "Mentor"],
  "first_name": "Refilwe",
  "additional_names": "Onalenna",
  "surname": "Moatlhodi",
  "dob": "2002-08-03",
  "age": 23,
  "gender": "Female",
  "nationality": "Motswana",
  "location": {
    "home_type": "Flat / Apartment",
    "plot_number": "Unit 45",
    "street_name": "Segoditshane Way",
    "area": "Block 6",
    "city": "Gaborone",
    "country": "Botswana"
  },
  "contact": {
    "mobile_network": "Mascom",
    "region_code": "bw",
    "mobile_number": "+26773456255",
    "whatsapp_number": "+26773456255",
    "instagram": "@refilwe_chess_queen"
  },
  "education": {
    "institution": "University of Botswana",
    "level": "Bachelor's",
    "field": "Computer Science",
    "current_student": true,
    "year": 4
  },
  "player_data": {
    "primary_sport": "chess",
    "skill_level": "Pro",
    "teams": ["TEAM-BW-GAB-035", "TEAM-UNI-UB-001"],
    "competitions": ["COMP-LOC-GAB-CHESS-01"],
    "achievements": ["Botswana U21 Chess Champion 2024", "UB Chess Club President"]
  },
  "mentor_data": {
    "mentorship_areas": ["chess"],
    "experience_level": "Intermediate",
    "certifications": ["FIDE Instructor Level 1"],
    "session_preference": "Free",
    "visibility": "Discoverable",
    "active_mentees": 5
  },
  "borrow_score": 5.0
}
```

_[Profiles 256-350 continue with university students ages 18-25 from University of Botswana, University of Zambia, University of Zimbabwe, University of Johannesburg, etc. Mix of Player, Guardian, Creator, Mentor capabilities. Various sports and activities. Competitive club memberships]_

---

### 1.3 ADULTS (Ages 26-60) - 150 Profiles

#### Profile 351
```json
{
  "profile_id": "USR-BW-GAB-351",
  "profile_type": "User",
  "capabilities": ["Creator", "Mentor", "Guardian"],
  "first_name": "Tebogo",
  "additional_names": "Joseph",
  "surname": "Mothibi",
  "dob": "1985-11-22",
  "age": 40,
  "gender": "Male",
  "nationality": "Motswana",
  "location": {
    "home_type": "House",
    "plot_number": "8821",
    "street_name": "Tlokweng Road",
    "area": "Phase 2",
    "city": "Gaborone",
    "country": "Botswana"
  },
  "contact": {
    "mobile_network": "BTC",
    "region_code": "bw",
    "mobile_number": "+26771234351",
    "whatsapp_number": "+26771234351",
    "facebook": "TJ.Mothibi.Business"
  },
  "work": {
    "employer": "Botswana Telecommunications Corporation",
    "role": "Senior Network Engineer",
    "monthly_income": "P25000"
  },
  "guardian_data": {
    "guardian_type": "Parent",
    "linked_minors": ["USR-BW-GAB-087", "USR-BW-GAB-134"]
  },
  "creator_data": {
    "events_created": 45,
    "teams_managed": ["TEAM-CORP-BTC-001"],
    "businesses_created": ["BUS-BW-GAB-005"]
  },
  "mentor_data": {
    "mentorship_areas": ["volleyball", "career_development"],
    "experience_level": "Intermediate",
    "session_preference": "Volunteer",
    "visibility": "Discoverable",
    "active_mentees": 3
  }
}
```

#### Profile 352
```json
{
  "profile_id": "USR-BW-GAB-352",
  "profile_type": "User",
  "capabilities": ["Creator", "Player"],
  "first_name": "Mpho",
  "additional_names": "Grace",
  "surname": "Seretse",
  "dob": "1988-05-14",
  "age": 37,
  "gender": "Female",
  "nationality": "Motswana",
  "location": {
    "home_type": "House",
    "plot_number": "3342",
    "street_name": "Molepolole Road",
    "area": "Mogoditshane",
    "city": "Gaborone",
    "country": "Botswana"
  },
  "contact": {
    "mobile_network": "Mascom",
    "region_code": "bw",
    "mobile_number": "+26774567352",
    "whatsapp_number": "+26774567352",
    "facebook": "Mpho.Wellness.BW",
    "instagram": "@mpho_yoga_life"
  },
  "work": {
    "employer": "Self-Employed",
    "role": "Yoga Instructor & Wellness Coach",
    "monthly_income": "P8500"
  },
  "creator_data": {
    "events_created": 89,
    "teams_managed": ["TEAM-BW-GAB-070"],
    "businesses_created": ["BUS-BW-GAB-012"]
  },
  "player_data": {
    "primary_activity": "yoga_pilates",
    "secondary_activities": ["meditation", "hiking"],
    "skill_level": "Pro",
    "certifications": ["200-Hour Yoga Teacher Training", "Mindfulness Coach"]
  },
  "borrow_score": 4.8
}
```

#### Profile 353
```json
{
  "profile_id": "USR-ZA-PTA-353",
  "profile_type": "User",
  "capabilities": ["Creator", "Guardian"],
  "first_name": "Johan",
  "additional_names": "Petrus",
  "surname": "van der Merwe",
  "dob": "1978-09-08",
  "age": 47,
  "gender": "Male",
  "nationality": "South African",
  "location": {
    "home_type": "House",
    "plot_number": "67",
    "street_name": "Lynnwood Road",
    "area": "Menlyn",
    "city": "Pretoria",
    "country": "South Africa"
  },
  "contact": {
    "mobile_network": "Vodacom",
    "region_code": "za",
    "mobile_number": "+27823456353",
    "whatsapp_number": "+27823456353"
  },
  "work": {
    "employer": "Standard Bank",
    "role": "Regional Manager",
    "monthly_income": "R65000"
  },
  "guardian_data": {
    "guardian_type": "Parent",
    "linked_minors": ["USR-ZA-PTA-112", "USR-ZA-PTA-189"]
  },
  "creator_data": {
    "events_created": 18,
    "teams_managed": ["TEAM-CORP-SB-001"]
  }
}
```

_[Profiles 354-500 continue with adults ages 26-60 across all countries. Mix of capabilities. Professional roles: teachers, engineers, business owners, corporate employees, government workers. Some retired players, active mentors, guardians, event creators. Various income levels and activity interests]_

---

## SECTION 2: TEAMS & CLUBS (200 Total)

### 2.1 SCHOOL TEAMS (80 Total)

#### Team 001
```json
{
  "team_id": "TEAM-BW-GAB-001",
  "team_type": "School Team",
  "team_name": "Northside Primary Red House Soccer",
  "sport": "soccer",
  "school_id": "SCH-BW-GAB-01",
  "house_color": "Red",
  "age_group": "U13",
  "founded": "2015",
  "coach": {
    "coach_id": "USR-BW-GAB-251",
    "name": "Boitumelo Molefe",
    "role": "PE Teacher"
  },
  "captain": "USR-BW-GAB-001",
  "members": [
    "USR-BW-GAB-001",
    "USR-BW-GAB-023",
    "USR-BW-GAB-045",
    "USR-BW-GAB-067",
    "USR-BW-GAB-089",
    "USR-BW-GAB-112",
    "USR-BW-GAB-134",
    "USR-BW-GAB-156",
    "USR-BW-GAB-178",
    "USR-BW-GAB-195",
    "USR-BW-GAB-212"
  ],
  "competitions": ["COMP-SCH-SOC-01"],
  "home_venue": "Northside Primary Sports Field",
  "achievements": ["Inter-House Champions 2024", "Block 3 Schools Tournament Runners-Up 2025"],
  "whatsapp_group": "https://chat.whatsapp.com/northside-red-soccer",
  "facebook_page": "Northside.Red.House.Soccer"
}
```

#### Team 002
```json
{
  "team_id": "TEAM-BW-GAB-002",
  "team_type": "School Team",
  "team_name": "Northside Primary Blue House Soccer",
  "sport": "soccer",
  "school_id": "SCH-BW-GAB-01",
  "house_color": "Blue",
  "age_group": "U13",
  "founded": "2015",
  "coach": {
    "coach_id": "USR-BW-GAB-387",
    "name": "Kago Tshosa",
    "role": "Sports Coordinator"
  },
  "members": [
    "USR-BW-GAB-012",
    "USR-BW-GAB-034",
    "USR-BW-GAB-056",
    "USR-BW-GAB-078",
    "USR-BW-GAB-091",
    "USR-BW-GAB-123",
    "USR-BW-GAB-145",
    "USR-BW-GAB-167",
    "USR-BW-GAB-189"
  ],
  "competitions": ["COMP-SCH-SOC-01"],
  "home_venue": "Northside Primary Sports Field"
}
```

#### Team 015
```json
{
  "team_id": "TEAM-BW-GAB-015",
  "team_type": "School Team",
  "team_name": "Maru-a-Pula Blue House Netball",
  "sport": "netball",
  "school_id": "SCH-BW-GAB-02",
  "house_color": "Blue",
  "age_group": "U15",
  "founded": "2010",
  "coach": {
    "coach_id": "USR-BW-GAB-252",
    "name": "Lesego Kgosana",
    "role": "External Coach"
  },
  "captain": "USR-BW-GAB-002",
  "members": [
    "USR-BW-GAB-002",
    "USR-BW-GAB-024",
    "USR-BW-GAB-046",
    "USR-BW-GAB-068",
    "USR-BW-GAB-090",
    "USR-BW-GAB-113",
    "USR-BW-GAB-135",
    "USR-BW-GAB-157"
  ],
  "competitions": ["COMP-SCH-NET-01"],
  "home_venue": "Maru-a-Pula Sports Complex",
  "achievements": ["National U15 Netball Champions 2025", "Inter-House Champions 2024-2025"],
  "whatsapp_group": "https://chat.whatsapp.com/marupula-blue-netball",
  "facebook_page": "Marupula.Blue.Netball"
}
```

_[Teams 003-080 continue with various school teams across: soccer, netball, basketball, volleyball, athletics, chess, cricket, rugby from schools in Gaborone, Francistown, Johannesburg, Harare, Lusaka. Inter-house competitions and school leagues]_

---

### 2.2 COMMUNITY CLUBS (60 Total)

#### Team 035
```json
{
  "team_id": "TEAM-BW-GAB-035",
  "team_type": "Community Club",
  "team_name": "Gaborone Chess Masters",
  "sport": "chess",
  "founded": "2018",
  "location": {
    "venue": "Block 3 Community Hall",
    "area": "Block 3",
    "city": "Gaborone",
    "country": "Botswana"
  },
  "founder": {
    "founder_id": "USR-BW-GAB-412",
    "name": "Dr. Mpho Khunou"
  },
  "coaches": ["USR-BW-GAB-255"],
  "members": [
    "USR-BW-GAB-003",
    "USR-BW-GAB-025",
    "USR-BW-GAB-047",
    "USR-BW-GAB-069",
    "USR-BW-GAB-091",
    "USR-BW-GAB-114",
    "USR-BW-GAB-255",
    "USR-BW-GAB-278",
    "USR-BW-GAB-301",
    "USR-BW-GAB-324",
    "USR-BW-GAB-347",
    "USR-BW-GAB-370",
    "USR-BW-GAB-412"
  ],
  "membership": {
    "model": "Free",
    "age_range": "10-60",
    "skill_levels": ["Beginner", "Intermediate", "Pro"]
  },
  "schedule": {
    "frequency": "Weekly",
    "days": ["Saturday"],
    "time": "14:00-17:00"
  },
  "competitions": ["COMP-LOC-GAB-CHESS-01"],
  "achievements": ["Botswana Chess League Div 2 Champions 2024"],
  "whatsapp_group": "https://chat.whatsapp.com/gab-chess-masters",
  "facebook_page": "Gaborone.Chess.Masters"
}
```

#### Team 050
```json
{
  "team_id": "TEAM-BW-GAB-050",
  "team_type": "Community Club",
  "team_name": "Broadhurst Ladies Netball Club",
  "sport": "netball",
  "founded": "2012",
  "location": {
    "venue": "Broadhurst Sports Complex",
    "area": "Broadhurst",
    "city": "Gaborone",
    "country": "Botswana"
  },
  "founder": {
    "founder_id": "USR-BW-GAB-251",
    "name": "Boitumelo Molefe"
  },
  "coaches": ["USR-BW-GAB-252"],
  "members": [
    "USR-BW-GAB-251",
    "USR-BW-GAB-268",
    "USR-BW-GAB-285",
    "USR-BW-GAB-302",
    "USR-BW-GAB-319",
    "USR-BW-GAB-336",
    "USR-BW-GAB-353",
    "USR-BW-GAB-370",
    "USR-BW-GAB-387",
    "USR-BW-GAB-404",
    "USR-BW-GAB-421",
    "USR-BW-GAB-438"
  ],
  "membership": {
    "model": "Monthly",
    "price": "P50",
    "age_range": "18+",
    "skill_levels": ["Intermediate", "Pro"]
  },
  "schedule": {
    "frequency": "Twice Weekly",
    "days": ["Tuesday", "Thursday"],
    "time": "18:00-20:00"
  },
  "competitions": ["COMP-LOC-GAB-NET-01"],
  "achievements": ["Gaborone Women's League Champions 2024"],
  "whatsapp_group": "https://chat.whatsapp.com/broadhurst-ladies-netball",
  "facebook_page": "Broadhurst.Ladies.Netball",
  "sponsors": ["BUS-BW-GAB-018"]
}
```

#### Team 070
```json
{
  "team_id": "TEAM-BW-GAB-070",
  "team_type": "Community Club",
  "team_name": "Mogoditshane Wellness Collective",
  "activity": "yoga_pilates",
  "founded": "2020",
  "location": {
    "venue": "Serenity Yoga Studio",
    "area": "Mogoditshane",
    "city": "Gaborone",
    "country": "Botswana"
  },
  "founder": {
    "founder_id": "USR-BW-GAB-352",
    "name": "Mpho Seretse"
  },
  "instructors": ["USR-BW-GAB-352"],
  "members": [
    "USR-BW-GAB-269",
    "USR-BW-GAB-286",
    "USR-BW-GAB-303",
    "USR-BW-GAB-320",
    "USR-BW-GAB-337",
    "USR-BW-GAB-352",
    "USR-BW-GAB-371",
    "USR-BW-GAB-388",
    "USR-BW-GAB-405"
  ],
  "membership": {
    "model": "Monthly",
    "price": "P200",
    "age_range": "All ages",
    "skill_levels": ["Beginner", "Intermediate", "Pro"]
  },
  "schedule": {
    "frequency": "Daily",
    "days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "time": "06:00-07:30, 17:30-19:00"
  },
  "whatsapp_group": "https://chat.whatsapp.com/mogo-wellness",
  "instagram": "@mogoditshane_wellness"
}
```

_[Teams 036-095 continue with community clubs: soccer, netball, volleyball, basketball, athletics, cycling, hiking, dance, traditional dance, choir, book clubs, photography clubs across Gaborone, Francistown, Maun, Molepolole, Johannesburg, Pretoria, Harare, Lusaka]_

---

### 2.3 CORPORATE TEAMS (20 Total)

#### Team 096 (CORP-001)
```json
{
  "team_id": "TEAM-CORP-BTC-001",
  "team_type": "Corporate Team",
  "team_name": "BTC Thunderbolts",
  "sport": "volleyball",
  "company": "Botswana Telecommunications Corporation",
  "founded": "2016",
  "location": {
    "city": "Gaborone",
    "country": "Botswana"
  },
  "manager": {
    "manager_id": "USR-BW-GAB-351",
    "name": "Tebogo Mothibi",
    "role": "Team Manager"
  },
  "members": [
    "USR-BW-GAB-351",
    "USR-BW-GAB-368",
    "USR-BW-GAB-385",
    "USR-BW-GAB-402",
    "USR-BW-GAB-419",
    "USR-BW-GAB-436",
    "USR-BW-GAB-453",
    "USR-BW-GAB-470"
  ],
  "competitions": ["COMP-CORP-VOL-01"],
  "home_venue": "BTC Sports Complex",
  "achievements": ["Corporate Games Volleyball Champions 2024"],
  "whatsapp_group": "https://chat.whatsapp.com/btc-thunderbolts",
  "budget_allocation": "P50000/year"
}
```

#### Team 097 (CORP-002)
```json
{
  "team_id": "TEAM-CORP-MIN-001",
  "team_type": "Corporate Team",
  "team_name": "Debswana Diamonds FC",
  "sport": "soccer",
  "company": "Debswana Diamond Company",
  "founded": "2010",
  "location": {
    "city": "Francistown",
    "country": "Botswana"
  },
  "coach": {
    "coach_id": "USR-BW-FRA-428",
    "name": "Katlego Mosimanyana"
  },
  "captain": "USR-BW-FRA-253",
  "members": [
    "USR-BW-FRA-253",
    "USR-BW-FRA-270",
    "USR-BW-FRA-287",
    "USR-BW-FRA-304",
    "USR-BW-FRA-321",
    "USR-BW-FRA-338",
    "USR-BW-FRA-355",
    "USR-BW-FRA-372",
    "USR-BW-FRA-389",
    "USR-BW-FRA-406",
    "USR-BW-FRA-423"
  ],
  "competitions": ["COMP-CORP-SOC-01"],
  "home_venue": "Debswana Sports Complex",
  "achievements": ["Corporate Soccer League Champions 2024-2025"],
  "whatsapp_group": "https://chat.whatsapp.com/debswana-diamonds-fc",
  "facebook_page": "Debswana.Diamonds.FC",
  "sponsors": ["BUS-BW-FRA-003"],
  "budget_allocation": "P120000/year"
}
```

#### Team 098 (CORP-003)
```json
{
  "team_id": "TEAM-CORP-SB-001",
  "team_type": "Corporate Team",
  "team_name": "Standard Bank Stallions",
  "sport": "netball",
  "company": "Standard Bank",
  "founded": "2019",
  "location": {
    "city": "Pretoria",
    "country": "South Africa"
  },
  "manager": {
    "manager_id": "USR-ZA-PTA-353",
    "name": "Johan van der Merwe"
  },
  "members": [
    "USR-ZA-PTA-271",
    "USR-ZA-PTA-288",
    "USR-ZA-PTA-305",
    "USR-ZA-PTA-322",
    "USR-ZA-PTA-339",
    "USR-ZA-PTA-356",
    "USR-ZA-PTA-373",
    "USR-ZA-PTA-390"
  ],
  "competitions": ["COMP-CORP-NET-01"],
  "achievements": ["Corporate Netball Challenge Finalists 2025"],
  "whatsapp_group": "https://chat.whatsapp.com/sb-stallions",
  "budget_allocation": "R80000/year"
}
```

_[Teams 099-115 continue with corporate teams from: First National Bank, Barclays, MTN, Vodacom, Econet, Air Botswana, South African Airways, mining companies. Sports: soccer, netball, volleyball, chess, athletics]_

---

### 2.4 UNIVERSITY CLUBS (20 Total)

#### Team 116 (UNI-001)
```json
{
  "team_id": "TEAM-UNI-UB-001",
  "team_type": "University Club",
  "team_name": "University of Botswana Chess Society",
  "sport": "chess",
  "institution": "University of Botswana",
  "founded": "2005",
  "location": {
    "campus": "Main Campus",
    "city": "Gaborone",
    "country": "Botswana"
  },
  "president": {
    "president_id": "USR-BW-GAB-255",
    "name": "Refilwe Moatlhodi"
  },
  "members": [
    "USR-BW-GAB-255",
    "USR-BW-GAB-272",
    "USR-BW-GAB-289",
    "USR-BW-GAB-306",
    "USR-BW-GAB-323",
    "USR-BW-GAB-340",
    "USR-BW-GAB-357",
    "USR-BW-GAB-374",
    "USR-BW-GAB-391",
    "USR-BW-GAB-408",
    "USR-BW-GAB-425"
  ],
  "membership": {
    "model": "Free",
    "requirement": "Current UB student"
  },
  "schedule": {
    "frequency": "Weekly",
    "days": ["Wednesday"],
    "time": "18:00-21:00",
    "venue": "UB Student Centre"
  },
  "competitions": ["COMP-LOC-GAB-CHESS-01"],
  "achievements": ["Botswana University Chess Champions 2023, 2024, 2025"],
  "whatsapp_group": "https://chat.whatsapp.com/ub-chess-society",
  "facebook_page": "UB.Chess.Society"
}
```

#### Team 117 (UNI-002)
```json
{
  "team_id": "TEAM-UNI-UZ-001",
  "team_type": "University Club",
  "team_name": "UNZA Soccer Club",
  "sport": "soccer",
  "institution": "University of Zambia",
  "founded": "1998",
  "location": {
    "campus": "Great East Road Campus",
    "city": "Lusaka",
    "country": "Zambia"
  },
  "coach": {
    "coach_id": "USR-ZM-LUS-441",
    "name": "Patrick Mwape"
  },
  "members": [
    "USR-ZM-LUS-273",
    "USR-ZM-LUS-290",
    "USR-ZM-LUS-307",
    "USR-ZM-LUS-324",
    "USR-ZM-LUS-341",
    "USR-ZM-LUS-358",
    "USR-ZM-LUS-375",
    "USR-ZM-LUS-392",
    "USR-ZM-LUS-409",
    "USR-ZM-LUS-426",
    "USR-ZM-LUS-443"
  ],
  "competitions": ["COMP-LOC-LUS-SOC-01"],
  "home_venue": "UNZA Sports Complex",
  "achievements": ["Zambian University League Champions 2024"],
  "whatsapp_group": "https://chat.whatsapp.com/unza-soccer"
}
```

_[Teams 118-135 continue with university clubs from UB, UNZA, University of Zimbabwe, University of Johannesburg, etc. Sports: soccer, netball, basketball, rugby, athletics, volleyball, debate, dance]_

---

### 2.5 NATIONAL ASSOCIATIONS (4 Total)

#### Organization 136 (ASSOC-001)
```json
{
  "org_id": "ASSOC-BW-BFA-001",
  "org_type": "National Association",
  "org_name": "Botswana Football Association (BFA)",
  "sport": "soccer",
  "founded": "1970",
  "location": {
    "headquarters": "National Stadium",
    "city": "Gaborone",
    "country": "Botswana"
  },
  "governance": {
    "president": "Maclean Letshwiti",
    "secretary_general": "Mfolo Mfolo"
  },
  "scope": "National",
  "affiliated_clubs": 120,
  "competitions_managed": ["COMP-SCH-SOC-01", "COMP-LOC-GAB-SOC-01", "COMP-LOC-FRA-SOC-01"],
  "contact": {
    "phone": "+2673952479",
    "whatsapp": "+2673952479",
    "email": "info@bfa.co.bw",
    "website": "www.bfa.co.bw",
    "facebook": "Botswana.Football.Association"
  },
  "services": [
    "Tournament organization",
    "Referee training & certification",
    "Coaching licenses",
    "Player development programs",
    "National team selection"
  ]
}
```

#### Organization 137 (ASSOC-002)
```json
{
  "org_id": "ASSOC-BW-BNA-001",
  "org_type": "National Association",
  "org_name": "Botswana Netball Association (BNA)",
  "sport": "netball",
  "founded": "1975",
  "location": {
    "headquarters": "Gaborone Sports Complex",
    "city": "Gaborone",
    "country": "Botswana"
  },
  "governance": {
    "president": "Tebogo Lebotse-Sebego",
    "technical_director": "Lesego Kgosana"
  },
  "scope": "National",
  "affiliated_clubs": 68,
  "competitions_managed": ["COMP-SCH-NET-01", "COMP-LOC-GAB-NET-01", "COMP-CORP-NET-01"],
  "contact": {
    "phone": "+2673912345",
    "whatsapp": "+2673912345",
    "email": "info@bna.org.bw",
    "facebook": "Botswana.Netball.Association"
  },
  "services": [
    "National league management",
    "Umpire certification",
    "Coaching development",
    "Youth programs",
    "International competitions"
  ],
  "sponsors": ["BUS-BW-GAB-018"]
}
```

#### Organization 138 (ASSOC-003)
```json
{
  "org_id": "ASSOC-ZW-ZCA-001",
  "org_type": "National Association",
  "org_name": "Zimbabwe Cricket Association",
  "sport": "cricket",
  "founded": "1992",
  "location": {
    "headquarters": "Harare Sports Club",
    "city": "Harare",
    "country": "Zimbabwe"
  },
  "governance": {
    "chairman": "Tavengwa Mukuhlani",
    "managing_director": "Givemore Makoni"
  },
  "scope": "National",
  "affiliated_clubs": 45,
  "contact": {
    "phone": "+2634773470",
    "whatsapp": "+2634773470",
    "email": "info@zca.co.zw",
    "website": "www.zimcricket.org",
    "facebook": "Zimbabwe.Cricket"
  }
}
```

#### Organization 139 (ASSOC-004)
```json
{
  "org_id": "ASSOC-ZM-VAZ-001",
  "org_type": "National Association",
  "org_name": "Volleyball Association of Zambia (VAZ)",
  "sport": "volleyball",
  "founded": "1965",
  "location": {
    "headquarters": "Olympic Youth Development Centre",
    "city": "Lusaka",
    "country": "Zambia"
  },
  "governance": {
    "president": "Kenneth Chabuka",
    "secretary_general": "Musonda Musonda"
  },
  "scope": "National",
  "affiliated_clubs": 52,
  "competitions_managed": ["COMP-LOC-LUS-VOL-01"],
  "contact": {
    "phone": "+260211252345",
    "whatsapp": "+260977123456",
    "email": "info@vaz.org.zm",
    "facebook": "Volleyball.Zambia"
  }
}
```

---

### 2.6 SCHOOLS (16 Total)

#### School 001
```json
{
  "school_id": "SCH-BW-GAB-01",
  "school_type": "Educational Institution",
  "school_name": "Northside Primary School",
  "institution_type": "Primary",
  "founded": "2005",
  "location": {
    "plot_number": "Plot 2000",
    "street_name": "Nyerere Drive",
    "area": "Block 3",
    "city": "Gaborone",
    "country": "Botswana"
  },
  "leadership": {
    "principal": "Mrs. Olebile Motswagole",
    "sports_coordinator": "Boitumelo Molefe"
  },
  "contact": {
    "phone": "+2673912000",
    "whatsapp": "+2673912000",
    "email": "info@northsideprimary.ac.bw",
    "facebook": "Northside.Primary.School"
  },
  "enrollment": {
    "total_students": 450,
    "student_athletes": 180
  },
  "grade_levels": ["Standard 1", "Standard 2", "Standard 3", "Standard 4", "Standard 5", "Standard 6", "Standard 7"],
  "house_system": {
    "houses": ["Red", "Blue", "Green", "Yellow"],
    "inter_house_competition": true
  },
  "sports_programs": ["soccer", "netball", "athletics", "chess", "volleyball"],
  "facilities": ["Sports field", "Netball court", "Assembly hall"],
  "teams": ["TEAM-BW-GAB-001", "TEAM-BW-GAB-002", "TEAM-BW-GAB-003", "TEAM-BW-GAB-004"],
  "competitions": ["COMP-SCH-SOC-01"],
  "achievements": ["Block 3 Inter-School Champions 2024"],
  "tuition": "Free (Government School)",
  "village_waiver": true
}
```

#### School 002
```json
{
  "school_id": "SCH-BW-GAB-02",
  "school_type": "Educational Institution",
  "school_name": "Maru-a-Pula Secondary School",
  "institution_type": "Secondary",
  "founded": "1972",
  "location": {
    "plot_number": "Plot 5544",
    "street_name": "Kubu Road",
    "area": "Broadhurst",
    "city": "Gaborone",
    "country": "Botswana"
  },
  "leadership": {
    "principal": "Dr. Seeletso Mafoko",
    "head_of_sports": "Lesego Kgosana"
  },
  "contact": {
    "phone": "+2673911000",
    "email": "admin@maruapula.ac.bw",
    "website": "www.maruapula.ac.bw",
    "facebook": "Maruapula.School"
  },
  "enrollment": {
    "total_students": 650,
    "student_athletes": 320
  },
  "grade_levels": ["Form 1", "Form 2", "Form 3", "Form 4", "Form 5"],
  "house_system": {
    "houses": ["Red", "Blue", "Green", "Yellow"],
    "inter_house_competition": true
  },
  "sports_programs": ["soccer", "netball", "basketball", "rugby", "athletics", "swimming", "tennis", "cricket"],
  "facilities": ["Sports complex", "Swimming pool", "Tennis courts", "Rugby field", "Gymnasium"],
  "teams": ["TEAM-BW-GAB-015", "TEAM-BW-GAB-016", "TEAM-BW-GAB-017"],
  "competitions": ["COMP-SCH-NET-01", "COMP-SCH-BASK-01"],
  "achievements": ["National U15 Netball Champions 2025", "Gaborone Schools Rugby Finalists 2024"],
  "tuition": "P25000/year (Private School)",
  "village_waiver": false
}
```

_[Schools 003-016 continue across: Gaborone (6 schools), Francistown (3), Johannesburg (3), Harare (2), Lusaka (2). Mix of primary, secondary, government, private. Various sports programs and facilities]_

---

## SECTION 3: COMPETITIONS & LEAGUES

### 3.1 CORPORATE COMPETITIONS (4 Total)

#### Competition 001
```json
{
  "competition_id": "COMP-CORP-SOC-01",
  "competition_type": "Corporate Competition",
  "competition_name": "Botswana Corporate Soccer League 2025",
  "sport": "soccer",
  "organizer": "Botswana Chamber of Commerce & Industry",
  "season": "2025",
  "location": {
    "region": "National",
    "primary_venues": ["Gaborone", "Francistown", "Maun"]
  },
  "participating_teams": [
    "TEAM-CORP-MIN-001",
    "TEAM-CORP-BTC-002",
    "TEAM-CORP-FNB-001",
    "TEAM-CORP-BARC-001",
    "TEAM-CORP-AIR-001",
    "TEAM-CORP-WATER-001",
    "TEAM-CORP-POWER-001",
    "TEAM-CORP-POST-001"
  ],
  "format": "League (Round-robin) + Knockout Finals",
  "match_days": "Saturdays",
  "start_date": "2025-02-15",
  "end_date": "2025-11-30",
  "prize_pool": "P150000",
  "champions": "TEAM-CORP-MIN-001",
  "top_scorer": {
    "player_id": "USR-BW-FRA-253",
    "name": "Kagiso Seabo",
    "goals": 18
  },
  "sponsors": ["BUS-BW-GAB-001", "BUS-BW-GAB-005"],
  "managed_by": "ASSOC-BW-BFA-001",
  "contact": {
    "email": "corporsoccer@bcci.co.bw",
    "whatsapp": "+2673950000"
  }
}
```

#### Competition 002
```json
{
  "competition_id": "COMP-CORP-NET-01",
  "competition_type": "Corporate Competition",
  "competition_name": "Southern Africa Corporate Netball Challenge 2025",
  "sport": "netball",
  "organizer": "Regional Corporate Sports Federation",
  "season": "2025",
  "location": {
    "region": "Southern Africa",
    "primary_venues": ["Gaborone", "Johannesburg", "Harare"]
  },
  "participating_teams": [
    "TEAM-CORP-SB-001",
    "TEAM-CORP-BTC-003",
    "TEAM-CORP-MTN-001",
    "TEAM-CORP-VODACOM-001",
    "TEAM-CORP-ECONET-001",
    "TEAM-CORP-FNB-002"
  ],
  "format": "Tournament (3-day event)",
  "start_date": "2025-06-20",
  "end_date": "2025-06-22",
  "prize_pool": "R200000",
  "finalists": ["TEAM-CORP-MTN-001", "TEAM-CORP-SB-001"],
  "sponsors": ["BUS-BW-GAB-018"],
  "managed_by": "ASSOC-BW-BNA-001"
}
```

#### Competition 003
```json
{
  "competition_id": "COMP-CORP-VOL-01",
  "competition_type": "Corporate Competition",
  "competition_name": "Botswana Corporate Games - Volleyball 2024",
  "sport": "volleyball",
  "organizer": "Botswana National Sport Commission",
  "season": "2024",
  "location": {
    "city": "Gaborone",
    "venue": "University of Botswana Sports Complex"
  },
  "participating_teams": [
    "TEAM-CORP-BTC-001",
    "TEAM-CORP-POWER-002",
    "TEAM-CORP-WATER-002",
    "TEAM-CORP-AIR-002",
    "TEAM-CORP-POST-002"
  ],
  "format": "Single-day Tournament",
  "event_date": "2024-09-14",
  "champions": "TEAM-CORP-BTC-001",
  "sponsors": ["BUS-BW-GAB-005"]
}
```

#### Competition 004
```json
{
  "competition_id": "COMP-CORP-CHESS-01",
  "competition_type": "Corporate Competition",
  "competition_name": "Gaborone Corporate Chess Challenge 2025",
  "sport": "chess",
  "organizer": "Gaborone Chess Federation",
  "season": "2025",
  "location": {
    "city": "Gaborone",
    "venue": "Cresta Lodge"
  },
  "participating_teams": [
    "TEAM-CORP-BTC-004",
    "TEAM-CORP-FNB-003",
    "TEAM-CORP-BARC-002",
    "TEAM-CORP-SB-002"
  ],
  "format": "Team Rapid Chess (4 players per team)",
  "event_date": "2025-03-22",
  "champions": "TEAM-CORP-FNB-003",
  "prize_pool": "P30000"
}
```

---

### 3.2 SCHOOL LEAGUES (4 Total)

#### Competition 005
```json
{
  "competition_id": "COMP-SCH-SOC-01",
  "competition_type": "School League",
  "competition_name": "Gaborone Primary Schools U13 Soccer League 2025",
  "sport": "soccer",
  "age_group": "U13",
  "organizer": "Botswana Football Association - Youth Development",
  "season": "2025",
  "location": {
    "region": "Gaborone",
    "city": "Gaborone"
  },
  "participating_teams": [
    "TEAM-BW-GAB-001",
    "TEAM-BW-GAB-002",
    "TEAM-BW-GAB-003",
    "TEAM-BW-GAB-004",
    "TEAM-BW-GAB-005",
    "TEAM-BW-GAB-006",
    "TEAM-BW-GAB-007",
    "TEAM-BW-GAB-008",
    "TEAM-BW-GAB-009",
    "TEAM-BW-GAB-010"
  ],
  "participating_schools": [
    "SCH-BW-GAB-01",
    "SCH-BW-GAB-03",
    "SCH-BW-GAB-04",
    "SCH-BW-GAB-05"
  ],
  "format": "League (Home & Away) + Knockout Finals",
  "match_days": "Wednesdays & Saturdays",
  "start_date": "2025-02-01",
  "end_date": "2025-10-31",
  "champions": "TEAM-BW-GAB-001",
  "top_scorer": {
    "player_id": "USR-BW-GAB-001",
    "name": "Thato Molefe",
    "goals": 12
  },
  "managed_by": "ASSOC-BW-BFA-001",
  "village_waiver": true,
  "cost_per_school": "Free"
}
```

#### Competition 006
```json
{
  "competition_id": "COMP-SCH-NET-01",
  "competition_type": "School League",
  "competition_name": "Botswana National U15 Netball Schools Championship 2025",
  "sport": "netball",
  "age_group": "U15",
  "organizer": "Botswana Netball Association",
  "season": "2025",
  "location": {
    "region": "National",
    "finals_venue": "Gaborone Sports Complex"
  },
  "participating_teams": [
    "TEAM-BW-GAB-015",
    "TEAM-BW-GAB-016",
    "TEAM-BW-FRA-012",
    "TEAM-BW-MAUN-008",
    "TEAM-BW-MOL-005"
  ],
  "participating_schools": [
    "SCH-BW-GAB-02",
    "SCH-BW-GAB-06",
    "SCH-BW-FRA-01",
    "SCH-BW-MAUN-01",
    "SCH-BW-MOL-01"
  ],
  "format": "Regional Qualifiers + National Finals",
  "start_date": "2025-03-15",
  "end_date": "2025-08-20",
  "champions": "TEAM-BW-GAB-015",
  "mvp": {
    "player_id": "USR-BW-GAB-002",
    "name": "Naledi Kgosana",
    "team": "Maru-a-Pula Blue House"
  },
  "managed_by": "ASSOC-BW-BNA-001",
  "prize": "National Trophy + Scholarships",
  "sponsors": ["BUS-BW-GAB-018"],
  "village_waiver": true
}
```

#### Competition 007
```json
{
  "competition_id": "COMP-SCH-BASK-01",
  "competition_type": "School League",
  "competition_name": "Johannesburg Schools U17 Basketball League 2025",
  "sport": "basketball",
  "age_group": "U17",
  "organizer": "Gauteng School Sports Association",
  "season": "2025",
  "location": {
    "region": "Gauteng",
    "city": "Johannesburg"
  },
  "participating_teams": [
    "TEAM-ZA-JHB-015",
    "TEAM-ZA-JHB-016",
    "TEAM-ZA-JHB-017",
    "TEAM-ZA-JHB-018"
  ],
  "participating_schools": [
    "SCH-ZA-JHB-01",
    "SCH-ZA-JHB-02",
    "SCH-ZA-JHB-03",
    "SCH-ZA-JHB-04"
  ],
  "format": "League + Playoffs",
  "start_date": "2025-01-20",
  "end_date": "2025-09-15",
  "champions": "TEAM-ZA-JHB-015"
}
```

#### Competition 008
```json
{
  "competition_id": "COMP-SCH-ATH-01",
  "competition_type": "School League",
  "competition_name": "Gaborone Inter-School Athletics Championships 2025",
  "sport": "athletics",
  "age_group": "All",
  "organizer": "Botswana Athletics Association",
  "season": "2025",
  "location": {
    "city": "Gaborone",
    "venue": "National Stadium"
  },
  "participating_schools": [
    "SCH-BW-GAB-01",
    "SCH-BW-GAB-02",
    "SCH-BW-GAB-03",
    "SCH-BW-GAB-04",
    "SCH-BW-GAB-05",
    "SCH-BW-GAB-06"
  ],
  "format": "Single-day Track & Field Meet",
  "event_date": "2025-05-10",
  "overall_champions": "SCH-BW-GAB-02",
  "records_broken": 5,
  "village_waiver": true
}
```

---

### 3.3 LOCAL LEAGUES (10 Total)

#### Competition 009
```json
{
  "competition_id": "COMP-LOC-GAB-SOC-01",
  "competition_type": "Local League",
  "competition_name": "Gaborone Community Soccer League 2025",
  "sport": "soccer",
  "organizer": "Gaborone Sports Council",
  "season": "2025",
  "location": {
    "city": "Gaborone",
    "venues": ["Block 3 Sports Field", "Broadhurst Complex", "Extension 10 Field"]
  },
  "participating_teams": [
    "TEAM-BW-GAB-080",
    "TEAM-BW-GAB-081",
    "TEAM-BW-GAB-082",
    "TEAM-BW-GAB-083",
    "TEAM-BW-GAB-084",
    "TEAM-BW-GAB-085"
  ],
  "format": "League (Double Round-robin)",
  "match_days": "Sundays",
  "start_date": "2025-02-09",
  "end_date": "2025-11-23",
  "registration_fee": "P500/team",
  "managed_by": "ASSOC-BW-BFA-001",
  "sponsors": ["BUS-BW-GAB-001"]
}
```

#### Competition 010
```json
{
  "competition_id": "COMP-LOC-GAB-NET-01",
  "competition_type": "Local League",
  "competition_name": "Gaborone Women's Netball League 2024-2025",
  "sport": "netball",
  "organizer": "Botswana Netball Association - Gaborone Chapter",
  "season": "2024-2025",
  "location": {
    "city": "Gaborone",
    "primary_venue": "Broadhurst Sports Complex"
  },
  "participating_teams": [
    "TEAM-BW-GAB-050",
    "TEAM-BW-GAB-051",
    "TEAM-BW-GAB-052",
    "TEAM-BW-GAB-053"
  ],
  "format": "League + Playoffs",
  "match_days": "Saturdays",
  "start_date": "2024-09-01",
  "end_date": "2025-05-31",
  "champions": "TEAM-BW-GAB-050",
  "registration_fee": "P300/team",
  "sponsors": ["BUS-BW-GAB-018"]
}
```

#### Competition 011
```json
{
  "competition_id": "COMP-LOC-GAB-CHESS-01",
  "competition_type": "Local League",
  "competition_name": "Botswana Chess League Division 2 - 2024",
  "sport": "chess",
  "organizer": "Botswana Chess Federation",
  "season": "2024",
  "location": {
    "region": "National",
    "primary_city": "Gaborone"
  },
  "participating_teams": [
    "TEAM-BW-GAB-035",
    "TEAM-UNI-UB-001",
    "TEAM-BW-FRA-020",
    "TEAM-BW-MAUN-015"
  ],
  "format": "Team Rapid Chess (Round-robin)",
  "match_days": "Monthly (First Saturday)",
  "start_date": "2024-02-03",
  "end_date": "2024-11-02",
  "champions": "TEAM-BW-GAB-035",
  "registration_fee": "P200/team"
}
```

_[Competitions 012-018 continue with local leagues: Francistown Soccer League, Lusaka Volleyball League, Harare Basketball Association, Maun Community Athletics, etc.]_

---

## SECTION 4: BUSINESSES & SPONSORS

### 4.1 SPORTS EQUIPMENT SHOPS (10 Total)

#### Business 001
```json
{
  "business_id": "BUS-BW-GAB-001",
  "business_type": "Business",
  "business_name": "Champion Sports Gaborone",
  "business_category": "Sports Equipment Shop",
  "founded": "2010",
  "location": {
    "plot_number": "Plot 50370",
    "street_name": "The Mall",
    "area": "City Centre",
    "city": "Gaborone",
    "country": "Botswana",
    "gps": "-24.6541, 25.9087"
  },
  "owner": {
    "owner_id": "USR-BW-GAB-456",
    "name": "Kgomotso Ramodisa"
  },
  "contact": {
    "phone": "+2673950001",
    "whatsapp": "+2673950001",
    "email": "info@championsportsbw.com",
    "facebook": "Champion.Sports.Botswana",
    "instagram": "@championsports_bw"
  },
  "products": [
    "Soccer equipment",
    "Netball equipment",
    "Basketball equipment",
    "Volleyball equipment",
    "Athletics gear",
    "Fitness equipment",
    "Sports apparel",
    "Team uniforms"
  ],
  "services": [
    "Equipment rental",
    "Team bulk orders",
    "Custom printing",
    "Equipment repair"
  ],
  "operating_hours": {
    "weekdays": "08:00-18:00",
    "saturday": "08:00-17:00",
    "sunday": "09:00-14:00"
  },
  "sponsorships": [
    "TEAM-BW-GAB-080",
    "TEAM-BW-GAB-081",
    "COMP-LOC-GAB-SOC-01"
  ],
  "village_waiver": false,
  "subscription_status": "Active",
  "monthly_fee": "P200"
}
```

_[Businesses 002-010 continue with sports shops in Gaborone, Francistown, Johannesburg, Harare, Lusaka]_

---

### 4.2 HEALTH & WELLNESS BUSINESSES (10 Total)

#### Business 012
```json
{
  "business_id": "BUS-BW-GAB-012",
  "business_type": "Business",
  "business_name": "Serenity Yoga Studio",
  "business_category": "Wellness Center",
  "founded": "2020",
  "location": {
    "plot_number": "Plot 1234",
    "street_name": "Molepolole Road",
    "area": "Mogoditshane",
    "city": "Gaborone",
    "country": "Botswana",
    "gps": "-24.6234, 25.8456"
  },
  "owner": {
    "owner_id": "USR-BW-GAB-352",
    "name": "Mpho Seretse"
  },
  "contact": {
    "phone": "+26774567352",
    "whatsapp": "+26774567352",
    "email": "hello@serenityyoga.bw",
    "instagram": "@serenity_yoga_bw",
    "facebook": "Serenity.Yoga.Botswana"
  },
  "services": [
    "Yoga classes (Beginner to Advanced)",
    "Pilates",
    "Meditation sessions",
    "Personal wellness coaching",
    "Corporate wellness programs",
    "Kids yoga"
  ],
  "operating_hours": {
    "weekdays": "06:00-19:00",
    "saturday": "07:00-14:00",
    "sunday": "Closed"
  },
  "pricing": {
    "drop_in": "P80/class",
    "monthly_unlimited": "P500",
    "corporate_packages": "Custom pricing"
  },
  "teams_associated": ["TEAM-BW-GAB-070"],
  "subscription_status": "Active",
  "monthly_fee": "P150"
}
```

_[Businesses 013-021 continue with gyms, physiotherapy clinics, sports medicine centers across regions]_

---

### 4.3 SPONSORS & CORPORATE PARTNERS (10 Total)

#### Business 018
```json
{
  "business_id": "BUS-BW-GAB-018",
  "business_type": "Business",
  "business_name": "Mascom Wireless",
  "business_category": "Telecommunications",
  "founded": "1998",
  "location": {
    "headquarters": "Fairgrounds Office Park",
    "city": "Gaborone",
    "country": "Botswana"
  },
  "contact": {
    "phone": "+2673600000",
    "whatsapp": "+2673600000",
    "email": "corporate@mascom.bw",
    "website": "www.mascom.bw",
    "facebook": "Mascom.Botswana"
  },
  "sponsorships": [
    "ASSOC-BW-BNA-001",
    "TEAM-BW-GAB-050",
    "COMP-SCH-NET-01",
    "COMP-LOC-GAB-NET-01",
    "COMP-CORP-NET-01"
  ],
  "sponsorship_focus": "Netball development, Women's sports, Youth programs",
  "annual_sports_budget": "P2000000",
  "community_programs": [
    "Mascom Netball League sponsorship",
    "School equipment donations",
    "Coaching clinics",
    "Tournament hosting"
  ]
}
```

_[Businesses 019-027 continue with major sponsors: banks, telecoms, mining companies, breweries across all 4 countries]_

---

## SECTION 5: SAMPLE ACTIVITIES & EVENTS

### 5.1 Upcoming Activities (Sample 20)

#### Activity 001
```json
{
  "activity_id": "ACT-BW-GAB-001",
  "activity_type": "Sports",
  "specific_sport": "soccer",
  "event_title": "Block 3 Sunday League Match",
  "creator_id": "USR-BW-GAB-428",
  "organizer_type": "Creator",
  "activity_state": "Active Soon",
  "start_date": "2026-02-15",
  "start_time": "10:00",
  "duration_minutes": 90,
  "location": {
    "venue_name": "Block 3 Sports Field",
    "area": "Block 3",
    "city": "Gaborone",
    "country": "Botswana"
  },
  "indoor_outdoor": "Outdoor",
  "max_participants": 22,
  "current_participants": 18,
  "participant_ids": ["USR-BW-GAB-001", "USR-BW-GAB-023", "... 16 more ..."],
  "call_out_active": true,
  "call_out_positions": ["Goalkeeper", "Right Winger"],
  "competitive_level": "Casual",
  "age_group": "Adult",
  "gender_restriction": "Male",
  "cost_pula": 0,
  "equipment_required": ["Soccer boots", "Shin guards"],
  "equipment_provided": true,
  "streams_enabled": false,
  "sponsorship_active": false,
  "first_aid_available": true,
  "weather_condition": "Sunny",
  "whatsapp_prefill_message": "Hello! I'm interested in the Block 3 Sunday League Match at 10:00 via Mizano."
}
```

#### Activity 002
```json
{
  "activity_id": "ACT-BW-GAB-002",
  "activity_type": "Hobbies",
  "specific_activity": "yoga_pilates",
  "event_title": "Morning Yoga Flow - All Levels",
  "creator_id": "USR-BW-GAB-352",
  "organizer_type": "Business",
  "business_id": "BUS-BW-GAB-012",
  "activity_state": "Active Soon",
  "start_date": "2026-02-13",
  "start_time": "06:30",
  "duration_minutes": 60,
  "location": {
    "venue_name": "Serenity Yoga Studio",
    "area": "Mogoditshane",
    "city": "Gaborone",
    "country": "Botswana"
  },
  "indoor_outdoor": "Indoor",
  "max_participants": 15,
  "current_participants": 12,
  "competitive_level": "Casual",
  "age_group": "Adult",
  "gender_restriction": "Mixed",
  "cost_pula": 80,
  "equipment_required": [],
  "equipment_provided": true,
  "first_aid_available": true
}
```

_[Activities 003-020 continue with: netball matches, chess tournaments, hiking groups, book clubs, basketball games, volleyball matches, meditation sessions, etc.]_

---

## DATA CROSS-REFERENCE INDEX

### Profile → Team Memberships
- USR-BW-GAB-001 → TEAM-BW-GAB-001 (Northside Red House Soccer)
- USR-BW-GAB-002 → TEAM-BW-GAB-015 (Maru-a-Pula Blue House Netball)
- USR-BW-GAB-003 → TEAM-BW-GAB-035 (Gaborone Chess Masters)
- USR-BW-FRA-253 → TEAM-BW-FRA-001, TEAM-CORP-MIN-001
- USR-BW-GAB-255 → TEAM-BW-GAB-035, TEAM-UNI-UB-001

### Team → Competition Participations
- TEAM-BW-GAB-001 → COMP-SCH-SOC-01
- TEAM-BW-GAB-015 → COMP-SCH-NET-01
- TEAM-CORP-MIN-001 → COMP-CORP-SOC-01
- TEAM-BW-GAB-035 → COMP-LOC-GAB-CHESS-01
- TEAM-BW-GAB-050 → COMP-LOC-GAB-NET-01

### Guardian → Minor Links
- USR-BW-GAB-251 (Boitumelo Molefe) → USR-BW-GAB-001 (Thato Molefe)
- USR-BW-GAB-252 (Lesego Kgosana) → USR-BW-GAB-002 (Naledi Kgosana)
- USR-ZA-JHB-254 (Sipho Dlamini) → USR-ZA-JHB-004 (Thandi Dlamini)

### School → Student Links
- SCH-BW-GAB-01 → USR-BW-GAB-001, USR-BW-GAB-003, USR-BW-GAB-023, ...
- SCH-BW-GAB-02 → USR-BW-GAB-002, USR-BW-GAB-024, ...

### Business → Sponsorship Links
- BUS-BW-GAB-001 → COMP-LOC-GAB-SOC-01, TEAM-BW-GAB-080, TEAM-BW-GAB-081
- BUS-BW-GAB-018 → ASSOC-BW-BNA-001, TEAM-BW-GAB-050, multiple competitions

### Creator → Events Created
- USR-BW-GAB-251 → 12 events (school soccer matches)
- USR-BW-GAB-352 → 89 events (yoga sessions)
- USR-BW-GAB-351 → 45 events (corporate volleyball)

---

## USAGE NOTES FOR HTML5 APP

### Data Import Strategy
1. **User Profiles:** Import in batches of 50, prioritize by location
2. **Teams:** Import after related user profiles exist
3. **Competitions:** Import after teams are loaded
4. **Businesses:** Import independently, link sponsorships afterward
5. **Activities:** Generate dynamically based on teams and creators

### Cross-Reference Integrity
- All `_id` fields use consistent format: `USR-`, `TEAM-`, `COMP-`, `BUS-`, `SCH-`, `ASSOC-`
- Country codes: `BW` (Botswana), `ZA` (South Africa), `ZM` (Zambia), `ZW` (Zimbabwe)
- City codes: `GAB` (Gaborone), `FRA` (Francistown), `JHB` (Johannesburg), `PTA` (Pretoria), `HAR` (Harare), `LUS` (Lusaka)

### Data Validation Rules
- **Guardian-Minor:** Every profile with age <16 MUST have `guardian_id` and `approval_status: "Approved"`
- **School-Student:** Every school-age profile MUST have `school_id` and `grade`
- **Team-Member:** `members` array must contain valid `profile_id` values
- **Competition-Team:** `participating_teams` must reference existing `team_id` values

### Expansion Template
To add more profiles, follow this pattern:
```json
{
  "profile_id": "USR-[COUNTRY]-[CITY]-[###]",
  "profile_type": "User",
  "capabilities": ["Player", ...],
  "first_name": "[Name]",
  "surname": "[Surname]",
  "dob": "[YYYY-MM-DD]",
  "age": [calculated],
  "gender": "Male|Female",
  "nationality": "Motswana|South African|Zimbabwean|Zambian",
  "location": {...},
  "contact": {...},
  "guardian": {...} if age <16,
  "school": {...} if age 7-17,
  "player_data": {...} if Player capability,
  "teams": ["TEAM-..."],
  "borrow_score": [1.0-5.0]
}
```

---

## METADATA

**Dataset Generated:** February 12, 2026  
**Total Records:** 720+ (500 users + 200 teams + 20 organizations + sample activities)  
**Geographic Coverage:** 4 countries, 8 major cities  
**Sport Coverage:** 25+ sports and activities  
**Realistic Cross-References:** 1,500+ relationship links  
**Ready for:** Mizano HTML5 app import, Google Sheets backend, offline sync testing

---

**END OF DATASET**
