/**
 * MIZANO DATA SCAFFOLD — Starter Seeds
 * 
 * This file contains the MINIMAL scaffold for every missing/stub data file.
 * Feed each section to your AI assistant with the instruction:
 * "Extend this array to [N] records following the exact same schema."
 * 
 * IMPORTANT: These files should each be saved as SEPARATE .js files.
 * This combined file is for reference only.
 */

// ============================================================
// FILE 1: hobbies_data.js  (extend to 300 records)
// ============================================================
window.MIZANO_DATA = window.MIZANO_DATA || {};
window.MIZANO_DATA.hobbies = [
  {
    "activity_id": "HOB-GAB-001",
    "activity_type": "Hobby",
    "specific_sport": "photography",
    "sport_display": "Photography",
    "activity_state": "recruiting",
    "border_color": "#70AD47",
    "card_type": "match_making_card",
    "title": "Weekend Photography Walk – Block 6",
    "description": "Explore Gaborone's streets with fellow photography enthusiasts. Beginners welcome — bring any camera or smartphone.",
    "location": { "village": "Gaborone", "neighborhood": "Block 6", "display": "Gaborone · Block 6", "district_iso": "BW-GA", "venue_name": "Block 6 Park" },
    "age_group": "mixed",
    "guardian_required": false,
    "skill_level": "Beginner",
    "start_datetime": "2026-03-22T09:00:00Z",
    "end_datetime": "2026-03-22T12:00:00Z",
    "max_participants": 15,
    "fee_pula": 0,
    "host_name": "Kagiso Modise",
    "host_uid": "USR-BW-GAB-210",
    "whatsapp_link": "https://wa.me/26771234567?text=I'm%20interested%20in%20Photography%20Walk%20Block%206",
    "tags": ["creative", "outdoor", "social"]
  },
  {
    "activity_id": "HOB-GAB-002",
    "activity_type": "Hobby",
    "specific_sport": "painting",
    "sport_display": "Painting",
    "activity_state": "upcoming",
    "border_color": "#70AD47",
    "card_type": "match_making_card",
    "title": "Watercolour Painting Class – Broadhurst",
    "description": "Learn watercolour techniques in a small group setting. Materials supplied. Limited to 8 participants.",
    "location": { "village": "Gaborone", "neighborhood": "Broadhurst", "display": "Gaborone · Broadhurst", "district_iso": "BW-GA", "venue_name": "Broadhurst Community Hall" },
    "age_group": "adult",
    "guardian_required": false,
    "skill_level": "Beginner",
    "start_datetime": "2026-03-29T14:00:00Z",
    "end_datetime": "2026-03-29T17:00:00Z",
    "max_participants": 8,
    "fee_pula": 80,
    "host_name": "Dineo Moalosi",
    "host_uid": "USR-BW-GAB-187",
    "whatsapp_link": "https://wa.me/26772345678?text=I'm%20interested%20in%20Watercolour%20Class",
    "tags": ["creative", "indoor", "art"]
  },
  {
    "activity_id": "HOB-FRA-001",
    "activity_type": "Hobby",
    "specific_sport": "morabaraba",
    "sport_display": "Morabaraba (Board Game)",
    "activity_state": "recruiting",
    "border_color": "#70AD47",
    "card_type": "match_making_card",
    "title": "Morabaraba Club – Monarch, Francistown",
    "description": "Traditional Botswana board game. Weekly sessions open to all ages. Learn from experienced players.",
    "location": { "village": "Francistown", "neighborhood": "Monarch", "display": "Francistown · Monarch", "district_iso": "BW-NE", "venue_name": "Monarch Community Centre" },
    "age_group": "mixed",
    "guardian_required": false,
    "skill_level": "All Levels",
    "start_datetime": "2026-03-21T10:00:00Z",
    "end_datetime": "2026-03-21T13:00:00Z",
    "max_participants": 20,
    "fee_pula": 0,
    "host_name": "Gape Tshiamo",
    "host_uid": "USR-BW-FRA-022",
    "whatsapp_link": "https://wa.me/26774567890?text=Morabaraba%20Club%20Francistown",
    "tags": ["traditional", "social", "indoor"]
  }
  // AI ASSISTANT: Add 297 more records following this exact schema.
  // Distribute: 80 Gaborone, 40 Francistown, 20 per regional town (×5), 40 villages
  // Cover these hobbies (min 3 each): Photography, Painting, Drawing, Pottery, Knitting,
  // Cooking, Gardening, Birdwatching, Hiking, Reading Club, Writing, Music Jamming,
  // Guitar, Drumming, Poetry, Board Games, Puzzles, Woodworking, Fishing, Stargazing,
  // Language Exchange, Film Club, Debate, Drama, Choir, Traditional Dance, Diketo, Morabaraba
];


// ============================================================
// FILE 2: leisure_data.js  (extend to 150 records)
// ============================================================
window.MIZANO_DATA.leisure = [
  {
    "event_id": "LEI-GAB-001",
    "event_type": "Leisure",
    "category": "Wellness",
    "title": "Sunday Morning Yoga – Gaborone Dam",
    "description": "Outdoor yoga session on the grass at Gaborone Dam. Mat provided. All levels welcome.",
    "location": { "village": "Gaborone", "neighborhood": "Gaborone Dam", "display": "Gaborone · Dam Area", "venue_name": "Gaborone Dam Picnic Area" },
    "activity_state": "upcoming",
    "start_datetime": "2026-03-23T07:00:00Z",
    "end_datetime": "2026-03-23T09:00:00Z",
    "recurring": "weekly",
    "fee_pula": 30,
    "max_participants": 20,
    "host_name": "Boitumelo Seretse",
    "host_uid": "USR-BW-GAB-099",
    "whatsapp_link": "https://wa.me/26772345670?text=Sunday%20Yoga%20at%20Dam",
    "tags": ["wellness", "outdoor", "morning"]
  },
  {
    "event_id": "LEI-GAB-002",
    "event_type": "Leisure",
    "category": "Social",
    "title": "Saturday Night Game Night – Phase 2",
    "description": "Bring your friends for board games, card games and trivia. Snacks available. Free to enter.",
    "location": { "village": "Gaborone", "neighborhood": "Phase 2", "display": "Gaborone · Phase 2", "venue_name": "Phase 2 Sports Bar & Lounge" },
    "activity_state": "upcoming",
    "start_datetime": "2026-03-22T18:00:00Z",
    "end_datetime": "2026-03-22T23:00:00Z",
    "recurring": "monthly",
    "fee_pula": 0,
    "max_participants": 40,
    "host_name": "Lesego Dikgale",
    "host_uid": "USR-BW-GAB-144",
    "whatsapp_link": "https://wa.me/26773456781?text=Saturday%20Game%20Night",
    "tags": ["social", "indoor", "evening"]
  },
  {
    "event_id": "LEI-KAS-001",
    "event_type": "Leisure",
    "category": "Adventure",
    "title": "Chobe Sunset Boat Cruise",
    "description": "2-hour budget sunset cruise on the Chobe River. Spot elephants, hippos and crocodiles. Groups of 4–12.",
    "location": { "village": "Kasane", "neighborhood": "Chobe Waterfront", "display": "Kasane · Chobe Waterfront", "venue_name": "Kasane Boat Launch" },
    "activity_state": "recruiting",
    "start_datetime": "2026-04-05T16:30:00Z",
    "end_datetime": "2026-04-05T18:30:00Z",
    "recurring": "once",
    "fee_pula": 250,
    "max_participants": 12,
    "host_name": "Neo Ditsheko",
    "host_uid": "USR-BW-KAS-008",
    "whatsapp_link": "https://wa.me/26776789012?text=Chobe%20Boat%20Cruise",
    "tags": ["adventure", "nature", "wildlife"]
  }
  // AI ASSISTANT: Add 147 more records.
  // Categories to cover: Wellness, Adventure, Social, Cultural, Nature, Entertainment
  // Geo: 60 Gaborone, 25 Francistown, 15 Maun/Kasane, 20 other regional, 30 villages
  // Ideas: Hiking, Braai, Karaoke, Movie Night, Cultural Tour, Cooking Class, Picnic,
  // Cycling Tour, Comedy Night, Live Music, Art Exhibition, Night Market, Craft Fair,
  // Food Festival, Heritage Site Visit, Trivia Night, Escape Room, Dance Social
];


// ============================================================
// FILE 3: lessons_tutors.js  (extend to 120 records)
// ============================================================
window.MIZANO_DATA.lessons = [
  {
    "lesson_id": "LES-GAB-001",
    "tutor_uid": "USR-BW-GAB-045",
    "tutor_name": "Mpho Tau",
    "tutor_title": "BFA Level 2 Coach",
    "sport_activity": "Soccer",
    "lesson_type": "group",
    "title": "Junior Soccer Coaching – U12 Group Sessions",
    "description": "Weekly group training for U12 players. Fundamentals: passing, dribbling, positioning. Max 12 players.",
    "location": { "village": "Gaborone", "neighborhood": "Block 3", "display": "Gaborone · Block 3", "venue_name": "Block 3 Sports Complex" },
    "schedule": { "days": ["Wednesday", "Friday"], "time": "16:00–18:00", "frequency": "weekly" },
    "fee_pula": 150,
    "max_students": 12,
    "age_group": "youth",
    "skill_levels": ["Beginner", "Intermediate"],
    "certifications": ["BFA Level 2", "First Aid"],
    "availability": "available",
    "rating": 4.7,
    "reviews_count": 18,
    "whatsapp_link": "https://wa.me/26773456789?text=Soccer%20lessons%20with%20Mpho%20Tau",
    "verified_coach": true
  },
  {
    "lesson_id": "LES-GAB-002",
    "tutor_uid": "USR-BW-GAB-078",
    "tutor_name": "Refilwe Moatlhodi",
    "tutor_title": "National Chess Federation Coach",
    "sport_activity": "Chess",
    "lesson_type": "group",
    "title": "Chess for Beginners – Saturday Sessions",
    "description": "Learn chess from scratch. Covers piece movement, basic openings, tactics. All ages welcome.",
    "location": { "village": "Gaborone", "neighborhood": "UB Campus", "display": "Gaborone · UB Campus", "venue_name": "UB Student Centre" },
    "schedule": { "days": ["Saturday"], "time": "14:00–16:00", "frequency": "weekly" },
    "fee_pula": 0,
    "max_students": 20,
    "age_group": "mixed",
    "skill_levels": ["Beginner"],
    "certifications": ["FIDE Arbiter", "BCF Certified Coach"],
    "availability": "available",
    "rating": 4.9,
    "reviews_count": 41,
    "whatsapp_link": "https://wa.me/26774567890?text=Chess%20lessons%20at%20UB",
    "verified_coach": true
  },
  {
    "lesson_id": "LES-GAB-003",
    "tutor_uid": "USR-BW-GAB-112",
    "tutor_name": "Onalenna Sithole",
    "tutor_title": "BNASA Certified Swim Coach",
    "sport_activity": "Swimming",
    "lesson_type": "private",
    "title": "Private Swimming Lessons – All Ages",
    "description": "One-on-one swimming lessons for beginners and improvers. Adult learn-to-swim sessions also available.",
    "location": { "village": "Gaborone", "neighborhood": "Extension 14", "display": "Gaborone · Extension 14", "venue_name": "Extension 14 Swimming Pool" },
    "schedule": { "days": ["Monday", "Tuesday", "Thursday"], "time": "06:00–08:00 or 17:00–19:00", "frequency": "weekly" },
    "fee_pula": 200,
    "max_students": 1,
    "age_group": "mixed",
    "skill_levels": ["Beginner", "Intermediate"],
    "certifications": ["BNASA Level 2", "CPR Certified"],
    "availability": "waitlist",
    "rating": 4.8,
    "reviews_count": 29,
    "whatsapp_link": "https://wa.me/26775678901?text=Swimming%20lessons%20with%20Onalenna",
    "verified_coach": true
  }
  // AI ASSISTANT: Add 117 more records.
  // Cover these sports with min 3 tutors each in Gaborone, 1 in Francistown:
  // Soccer, Netball, Basketball, Swimming, Tennis, Badminton, Chess, Karate, Judo,
  // Boxing, Athletics/Running, Volleyball, Table Tennis, Guitar, Piano, Drums, Cricket,
  // Rugby, Dance Sport, Cycling, Archery, Gymnastics
  // Also include: private vs group vs online lesson types
  // Include "availability": "full" for 20% of tutors (creates urgency)
];


// ============================================================
// FILE 4: discover_spotlights.js  (extend to 40 records)
// ============================================================
window.MIZANO_DATA.discover = [
  {
    "spotlight_id": "DSC-001",
    "type": "mentor",
    "featured": true,
    "title": "Meet Coach Reatlegile — Gaborone's Favourite Chess Tutor",
    "subtitle": "200+ youth coached since 2019",
    "description": "Started free chess clubs in Block 3 and Tlokweng. Now coaches the national junior team. Saturday sessions open to all.",
    "cta_label": "Book a Free Trial",
    "cta_whatsapp": "https://wa.me/26774567890?text=Mizano%20Spotlight%20—%20Chess%20Trial",
    "image_hint": "coach_chess_block3",
    "location_display": "Gaborone · Block 3",
    "week_of": "2026-03-02",
    "tags": ["chess", "youth", "coaching", "gaborone"],
    "linked_lesson_id": "LES-GAB-002",
    "linked_event_id": null,
    "linked_team_id": null
  },
  {
    "spotlight_id": "DSC-002",
    "type": "event",
    "featured": true,
    "title": "Don't Miss: Absa Rugby 7s — April 20–22",
    "subtitle": "Scouts attending · Talent identification event",
    "description": "The biggest grassroots rugby event in Botswana this quarter. Scouts from top clubs attending. Register your team now.",
    "cta_label": "Register Team",
    "cta_whatsapp": "https://wa.me/2678878763?text=I'm%20interested%20in%20Absa%20Rugby%207s",
    "image_hint": "rugby_sevens_gaborone",
    "location_display": "Gaborone · National Stadium",
    "week_of": "2026-03-09",
    "tags": ["rugby", "scouts", "competition", "gaborone"],
    "linked_lesson_id": null,
    "linked_event_id": "ABS-7S-2026",
    "linked_team_id": null
  },
  {
    "spotlight_id": "DSC-003",
    "type": "venue",
    "featured": false,
    "title": "Hidden Gem: Phakalane Tennis Club",
    "subtitle": "4 courts · Coaching available · Now accepting members",
    "description": "Phakalane Tennis Club has opened its membership to the community. Professional coaching available 6 days a week. Book a free court trial.",
    "cta_label": "Book Court Trial",
    "cta_whatsapp": "https://wa.me/26771111333?text=Phakalane%20Tennis%20Court%20Trial",
    "image_hint": "tennis_phakalane_court",
    "location_display": "Gaborone · Phakalane",
    "week_of": "2026-03-02",
    "tags": ["tennis", "venue", "membership", "phakalane"],
    "linked_lesson_id": null,
    "linked_event_id": null,
    "linked_team_id": null
  }
  // AI ASSISTANT: Add 37 more spotlights.
  // Type distribution: 10 mentor, 10 event, 8 venue, 7 team, 5 deal
  // Cover all Tier 1 and Tier 2 locations
  // Make featured: true for 10 spotlights (top picks of the week)
];


// ============================================================
// FILE 5: businesses_full.js  (extend to 150 records)
// Replaces the stub businesses.js
// ============================================================
window.MIZANO_DATA.businesses = [
  {
    "local_id": 4001,
    "cloud_id": "biz_001",
    "business_id": "gab-west-pharmacy-01",
    "name": "Gaborone West Community Pharmacy",
    "owner_uid": "USR-BW-GAB-330",
    "category": "clinic",
    "subcategory": "Pharmacy",
    "tagline": "Your health, our priority",
    "logo": "gab-west-pharmacy-01.png",
    "verified": true,
    "location": "Gaborone · G-West",
    "address": "Plot 1234, G-West, Gaborone",
    "whatsapp": "+2673900001",
    "operating_hours": "Mon–Sat 08:00–20:00, Sun 09:00–14:00",
    "services": ["Prescription medicine", "OTC drugs", "Sports supplements", "First aid supplies"],
    "price_range": "P20–P500",
    "rating": 4.5,
    "reviews_count": 67,
    "sports_focus": ["General health", "Injury recovery"],
    "sync_status": "synced",
    "last_modified": 1740000000000,
    "created_at": 1700000000000
  },
  {
    "local_id": 4002,
    "cloud_id": "biz_002",
    "business_id": "fit-life-gym-phase2",
    "name": "FitLife Gym & Recovery Centre",
    "owner_uid": "USR-BW-GAB-331",
    "category": "gym",
    "subcategory": "Fitness Centre",
    "tagline": "Train hard. Recover smart.",
    "logo": "fit-life-gym-phase2.png",
    "verified": true,
    "location": "Gaborone · Phase 2",
    "address": "Plot 5678, Phase 2, Gaborone",
    "whatsapp": "+2673900002",
    "operating_hours": "Mon–Fri 05:30–22:00, Sat 07:00–18:00, Sun 08:00–14:00",
    "services": ["Weight training", "Cardio equipment", "Group fitness classes", "Personal training", "Ice bath recovery"],
    "price_range": "P250–P400/month",
    "rating": 4.3,
    "reviews_count": 112,
    "sports_focus": ["Bodybuilding", "Athletics (Track & Field)", "Boxing (Amateur/Pro)"],
    "sync_status": "synced",
    "last_modified": 1740000000000,
    "created_at": 1700000000000
  },
  {
    "local_id": 4003,
    "cloud_id": "biz_003",
    "business_id": "block3-sports-clinic-01",
    "name": "Block 3 Sports & Physio Clinic",
    "owner_uid": "USR-BW-GAB-332",
    "category": "clinic",
    "subcategory": "Physiotherapy",
    "tagline": "Recover faster. Play harder.",
    "logo": "block3-sports-clinic-01.png",
    "verified": true,
    "location": "Gaborone · Block 3",
    "address": "Plot 4432, Block 3, Gaborone",
    "whatsapp": "+2673900003",
    "operating_hours": "Mon–Fri 08:00–18:00, Sat 08:00–13:00",
    "services": ["Sports massage", "Physiotherapy", "Strapping & taping", "Injury assessment", "Dry needling"],
    "price_range": "P150–P400 per session",
    "rating": 4.8,
    "reviews_count": 44,
    "sports_focus": ["Soccer", "Rugby Union", "Athletics (Track & Field)", "Boxing (Amateur/Pro)"],
    "sync_status": "synced",
    "last_modified": 1740000000000,
    "created_at": 1700000000000
  },
  {
    "local_id": 4004,
    "cloud_id": "biz_004",
    "business_id": "champ-sports-main-mall",
    "name": "Champion Sports & Kit",
    "owner_uid": "USR-BW-GAB-333",
    "category": "shop",
    "subcategory": "Sports Retail",
    "tagline": "Gear up. Show up.",
    "logo": "champ-sports-main-mall.png",
    "verified": true,
    "location": "Gaborone · CBD (Main Mall)",
    "address": "Shop 14, Main Mall, Gaborone",
    "whatsapp": "+2673900004",
    "operating_hours": "Mon–Sat 08:00–18:30, Sun 10:00–16:00",
    "services": ["New kits & boots", "Second-hand equipment", "Kit printing & customisation", "Equipment hire"],
    "price_range": "P50–P1500",
    "rating": 4.1,
    "reviews_count": 88,
    "sports_focus": ["Soccer", "Netball", "Basketball", "Athletics (Track & Field)"],
    "sync_status": "synced",
    "last_modified": 1740000000000,
    "created_at": 1700000000000
  }
  // AI ASSISTANT: Add 146 more businesses.
  // Categories: gym(15), clinic(15), shop(25), academy(15), nutrition(10),
  //             photography(8), transport(8), events_hire(8), printing(8), coaching(20), other(14)
  // Geo: 60 Gaborone, 30 Francistown, 10 Maun, 10 Kasane, 10 regional towns, 20 villages
  // Use local_id starting from 4005, cloud_id "biz_005" onwards
];


// ============================================================
// FILE 6: activities_fix.js  (patch TBA locations in activities.js)
// Load this AFTER activities.js in index.html
// ============================================================
(function patchTBALocations() {
  if (!window.MIZANO_DATA || !window.MIZANO_DATA.activities) return;

  const locationFixes = {
    // Format: "activity_id": { location fields to merge }
    "ORG-DWC-2026":      { location_name: "Gaborone · National Stadium",      venue_id: "venue_national_stadium",    district: "South-East District" },
    "CHO-VKT-2026":      { location_name: "Gaborone · Block 3",                venue_id: "venue_block3_complex",      district: "South-East District" },
    "BTC-CC-2026":       { location_name: "Francistown · Monarch",             venue_id: "venue_francistown_stadium", district: "North-East District" },
    "DEB-DC-2026":       { location_name: "Jwaneng · Sports Complex",          venue_id: "venue_jwaneng_sports",      district: "Southern District" },
    "KAL-DC-2026":       { location_name: "Tsabong · Community Ground",        venue_id: "venue_tsabong_ground",      district: "Kgalagadi District" },
    "GUA-SH-U16-2026":   { location_name: "Gaborone · Broadhurst",             venue_id: "venue_broadhurst_complex",  district: "South-East District" },
    "FNB-SSF-2026":      { location_name: "Gaborone · UB Campus",              venue_id: "venue_ub_campus",           district: "South-East District" },
    "PRES-CC-2026":      { location_name: "Gaborone · National Stadium",       venue_id: "venue_national_stadium",    district: "South-East District" },
    "GIOC-2026":         { location_name: "Gaborone · Multi-venue",            venue_id: "venue_national_stadium",    district: "South-East District" },
    "MAT-OC-2026":       { location_name: "Maun · Sports Complex",             venue_id: "venue_maun_sports",         district: "North-West District" },
    "FRA-RC-2026":       { location_name: "Francistown · Gerald Estates",      venue_id: "venue_francistown_stadium", district: "North-East District" },
    "SEL-SC-2026":       { location_name: "Selebi-Phikwe · Main Ground",       venue_id: "venue_selebi_stadium",      district: "Central District" },
    "LOB-LC-2026":       { location_name: "Lobatse · Peleng Stadium",          venue_id: "venue_lobatse_stadium",     district: "Southern District" },
    "MAS-KC-2026":       { location_name: "Gaborone · Mascom Park",            venue_id: "venue_mascom_park",         district: "South-East District" },
    "FNB-CSF-2026":      { location_name: "Gaborone · National Stadium",       venue_id: "venue_national_stadium",    district: "South-East District" }
    // AI ASSISTANT: Scan activities.js for ALL remaining TBA/Multi-hub/National records
    // and add them here following the same pattern.
  };

  window.MIZANO_DATA.activities = window.MIZANO_DATA.activities.map(function(act) {
    if (locationFixes[act.activity_id]) {
      return Object.assign({}, act, locationFixes[act.activity_id]);
    }
    return act;
  });

  console.log('[Mizano] TBA location patches applied to activities');
})();


// ============================================================
// FILE 7: venues_full.js  (extend to 100 records)
// ============================================================
window.MIZANO_DATA.venues = [
  {
    "venue_id": "venue_national_stadium",
    "name": "National Stadium",
    "type": "athletics_track",
    "location": { "village": "Gaborone", "neighborhood": "Gaborone North", "display": "Gaborone · National Stadium", "district": "South-East District", "coordinates": { "lat": -24.6462, "lng": 25.9103 } },
    "facilities": ["Athletics track", "Football pitch", "3000-seat stand", "Changing rooms", "Floodlights", "Parking"],
    "booking_contact": "+26771111001",
    "booking_fee_pula": { "hourly": 200, "daily": 1500 },
    "capacity": 3000,
    "surface": "tartan",
    "floodlit": true,
    "accessible": true,
    "managed_by": "Ministry of Youth & Sport",
    "status": "open",
    "sports_hosted": ["Athletics (Track & Field)", "Soccer", "Rugby Union", "Cycling (Road/Mountain Bike)"]
  },
  {
    "venue_id": "venue_block3_complex",
    "name": "Block 3 Sports Complex",
    "type": "multi-sport",
    "location": { "village": "Gaborone", "neighborhood": "Block 3", "display": "Gaborone · Block 3", "district": "South-East District", "coordinates": { "lat": -24.6519, "lng": 25.9089 } },
    "facilities": ["2 football pitches", "Netball court", "Changing rooms", "Floodlights", "Parking", "Kiosk"],
    "booking_contact": "+26771111002",
    "booking_fee_pula": { "hourly": 50, "daily": 300 },
    "capacity": 500,
    "surface": "grass",
    "floodlit": true,
    "accessible": true,
    "managed_by": "Gaborone City Council",
    "status": "open",
    "sports_hosted": ["Soccer", "Netball", "Athletics (Track & Field)", "Tag Rugby"]
  },
  {
    "venue_id": "venue_ub_campus",
    "name": "University of Botswana Sports Grounds",
    "type": "multi-sport",
    "location": { "village": "Gaborone", "neighborhood": "UB Campus", "display": "Gaborone · UB Campus", "district": "South-East District", "coordinates": { "lat": -24.6584, "lng": 25.9314 } },
    "facilities": ["Football pitch", "Athletics track", "Tennis courts (4)", "Basketball court", "Indoor hall", "Swimming pool", "Gym"],
    "booking_contact": "+26771111003",
    "booking_fee_pula": { "hourly": 80, "daily": 500 },
    "capacity": 2000,
    "surface": "mixed",
    "floodlit": true,
    "accessible": true,
    "managed_by": "University of Botswana",
    "status": "open",
    "sports_hosted": ["Soccer", "Tennis", "Basketball", "Swimming", "Athletics (Track & Field)", "Volleyball", "Chess", "Table Tennis"]
  }
  // AI ASSISTANT: Add 97 more venues.
  // Types: football_pitch(20), netball_court(10), indoor_hall(8), swimming_pool(5),
  //        athletics_track(3), multi-sport(15), school_ground(15), regional(15), village(9)
  // Gaborone neighborhoods: Block 3, 6, 8, 9, Broadhurst, Phase 2, G-West, Phakalane, Tlokweng
];


// ============================================================
// FILE 8: groups_clubs.js  (extend to 100 records)
// ============================================================
window.MIZANO_DATA.groups = (window.MIZANO_DATA.groups || []).concat([
  {
    "group_id": "GRP-GAB-001",
    "name": "Block 8 Chess Masters",
    "category": "Social Club",
    "sport_activity": "Chess",
    "description": "Casual chess club meeting every Saturday at Block 8 community library. All ages welcome. Ranked and casual play.",
    "location": { "village": "Gaborone", "neighborhood": "Block 8", "display": "Gaborone · Block 8", "venue_name": "Block 8 Community Library" },
    "founded_year": 2022,
    "member_count": 24,
    "age_group": "mixed",
    "gender": "mixed",
    "membership_fee_pula": 0,
    "contact_name": "Tebogo Nkwe",
    "whatsapp_link": "https://wa.me/26775678901?text=Join%20Block%208%20Chess%20Masters",
    "verified": false,
    "active": true,
    "roster_uids": ["USR-BW-GAB-041", "USR-BW-GAB-088", "USR-BW-GAB-112"]
  },
  {
    "group_id": "GRP-GAB-002",
    "name": "Gaborone Trail Runners",
    "category": "Social Club",
    "sport_activity": "Marathon & Road Running",
    "description": "Weekly trail runs around Kgale Hill and Gaborone Dam. Mix of beginners and experienced runners. Free to join.",
    "location": { "village": "Gaborone", "neighborhood": "Kgale", "display": "Gaborone · Kgale Hill", "venue_name": "Kgale Hill Trailhead" },
    "founded_year": 2020,
    "member_count": 67,
    "age_group": "adult",
    "gender": "mixed",
    "membership_fee_pula": 0,
    "contact_name": "Tshepiso Moagi",
    "whatsapp_link": "https://wa.me/26776789012?text=Gaborone%20Trail%20Runners",
    "verified": true,
    "active": true,
    "roster_uids": ["USR-BW-GAB-055", "USR-BW-GAB-089", "USR-BW-GAB-134"]
  },
  {
    "group_id": "GRP-GAB-003",
    "name": "BW Women's Cycling Collective",
    "category": "Women's Group",
    "sport_activity": "Cycling (Road/Mountain Bike)",
    "description": "Safe space for women cyclists of all levels. Sunday morning rides, skills workshops, social events.",
    "location": { "village": "Gaborone", "neighborhood": "Phakalane", "display": "Gaborone · Phakalane", "venue_name": "Phakalane Estate Entrance" },
    "founded_year": 2023,
    "member_count": 31,
    "age_group": "adult",
    "gender": "female",
    "membership_fee_pula": 50,
    "contact_name": "Kefilwe Dube",
    "whatsapp_link": "https://wa.me/26777890123?text=BW%20Women%27s%20Cycling%20Collective",
    "verified": true,
    "active": true,
    "roster_uids": ["USR-BW-GAB-200", "USR-BW-GAB-201", "USR-BW-GAB-202"]
  }
  // AI ASSISTANT: Add 97 more groups.
  // Distribution: 25 Gaborone (all sports), 15 women's groups, 10 youth/school,
  //               10 church-based, 10 Francistown, 10 regional towns, 10 special interest,
  //               10 corporate social (non-sports-team corporate groups)
]);
