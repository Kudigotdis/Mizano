// =====================================================
// lessons_generator.js
// Run this script to generate lessons_generated.js
// =====================================================

// ---------- Helper: weighted random ----------
function weightedRandom(choices, weights) {
  const total = weights.reduce((a, b) => a + b, 0);
  const rand = Math.random() * total;
  let sum = 0;
  for (let i = 0; i < choices.length; i++) {
    sum += weights[i];
    if (rand < sum) return choices[i];
  }
  return choices[0];
}

// ---------- Reference data (shortened for space; use full lists in real generator) ----------
const SPORTS = [
  { value: "soccer", display: "Soccer", weight: 20 },
  { value: "netball", display: "Netball", weight: 15 },
  { value: "basketball", display: "Basketball", weight: 10 },
  { value: "athletics", display: "Athletics", weight: 10 },
  { value: "volleyball", display: "Volleyball", weight: 8 },
  { value: "tennis", display: "Tennis", weight: 5 },
  { value: "badminton", display: "Badminton", weight: 4 },
  { value: "chess", display: "Chess", weight: 6 },
  { value: "swimming", display: "Swimming", weight: 5 },
  { value: "cricket", display: "Cricket", weight: 4 },
  { value: "rugby_union", display: "Rugby", weight: 3 },
  { value: "esports", display: "Esports", weight: 3 },
  { value: "futsal", display: "Futsal", weight: 3 },
  { value: "handball", display: "Handball", weight: 2 },
  { value: "boxing", display: "Boxing", weight: 2 },
  { value: "karate", display: "Karate", weight: 2 },
  { value: "taekwondo", display: "Taekwondo", weight: 2 },
  { value: "yoga_pilates", display: "Yoga & Pilates", weight: 5 },
  { value: "dance_sport", display: "Dance", weight: 4 },
  // ... add all 90+ sports from your dropdown, with weights
].flatMap(s => Array(s.weight).fill(s)); // simple expansion

// District data (from dropdown reference)
const DISTRICTS = [
  { iso: "BW-GA", name: "Gaborone", villages: ["Gaborone", "Tlokweng", "Mogoditshane", "Gabane"] },
  { iso: "BW-FR", name: "Francistown", villages: ["Francistown", "Tati Siding", "Matsiloje"] },
  { iso: "BW-CE", name: "Central", villages: ["Serowe", "Palapye", "Mahalapye", "Letlhakane", "Tonota"] },
  { iso: "BW-NW", name: "North West", villages: ["Maun", "Kasane", "Shakawe", "Gumare"] },
  { iso: "BW-KW", name: "Kweneng", villages: ["Molepolole", "Mogoditshane", "Thamaga", "Kopong"] },
  { iso: "BW-SO", name: "Southern", villages: ["Kanye", "Moshupa", "Good Hope", "Lobatse"] },
  { iso: "BW-KG", name: "Kgalagadi", villages: ["Tsabong", "Hukuntsi", "Kang"] },
  { iso: "BW-GH", name: "Ghanzi", villages: ["Ghanzi", "Charles Hill"] },
  { iso: "BW-KL", name: "Kgatleng", villages: ["Mochudi", "Bokaa", "Oodi"] },
  { iso: "BW-NE", name: "North East", villages: ["Masunga", "Tati Siding", "Nlapkhwane"] },
  { iso: "BW-SE", name: "South East", villages: ["Ramotswa", "Otse"] },
  { iso: "BW-LO", name: "Lobatse", villages: ["Lobatse"] },
  { iso: "BW-JW", name: "Jwaneng", villages: ["Jwaneng"] },
  { iso: "BW-SP", name: "Selibe Phikwe", villages: ["Selibe Phikwe"] },
  { iso: "BW-ST", name: "Sowa Town", villages: ["Sowa Town"] },
];

// Age groups
const AGE_GROUPS = ["u10", "u12", "u14", "u15", "u17", "u18", "adult", "masters"];
const AGE_WEIGHTS = [8, 8, 10, 12, 10, 8, 30, 14];

// Gender targeting
const GENDERS = ["male", "female", "mixed"];
const GENDER_WEIGHTS = [30, 30, 40];

// Activity states (with UI colors)
const STATES = ["active_soon", "recruiting", "live", "passed", "cancelled", "full", "funding"];
const STATE_WEIGHTS = [15, 25, 10, 5, 2, 3, 5];

// Mentor levels
const MENTOR_LEVELS = ["Beginner", "Intermediate", "National Coach"];
const MENTOR_WEIGHTS = [40, 40, 20];

// Venue types
const VENUE_TYPES = ["public_primary", "private_secondary", "community_hall", "sports_club"];

// Recurrence
const RECURRENCE = ["one-off", "weekly", "bootcamp"];

// Languages
const LANGUAGES = ["EN", "TN"];

// Boolean distributions
const BOOL_TRUE_WEIGHT = 30; // 30% true

// Price ranges (Pula)
const PRICE_RANGES = [0, 20, 50, 100, 200, 500];
const PRICE_WEIGHTS = [40, 25, 15, 10, 5, 5];

// Capacity ranges
const CAPACITY_RANGES = { min: 5, max: 30 };

// Mentor names (placeholders, later replace with real IDs)
const MENTOR_NAMES = [
  "Kgosi Letsholo", "Boitumelo Molefe", "Lesego Kgosana", "Kagiso Seabo",
  "Tebogo Mothibi", "Mpho Seretse", "Refilwe Moatlhodi", "Katlego Mosimanyana",
  "Tshepo Modise", "Naledi Kgosana", "Karabo Moeng", "Thato Molefe"
];

// Achievement badge IDs
const BADGE_IDS = ["badge_striker", "badge_playmaker", "badge_defender", "badge_allrounder", "badge_rookie"];

// ---------- Generate 300 lessons ----------
const lessons = [];
const now = new Date();

for (let i = 0; i < 300; i++) {
  // Pick sport (weighted already by repeating in SPORTS array)
  const sport = SPORTS[Math.floor(Math.random() * SPORTS.length)];
  
  // District and village
  const district = DISTRICTS[Math.floor(Math.random() * DISTRICTS.length)];
  const village = district.villages[Math.floor(Math.random() * district.villages.length)];
  
  // Age group
  const ageGroup = weightedRandom(AGE_GROUPS, AGE_WEIGHTS);
  const guardianRequired = (ageGroup !== "adult" && ageGroup !== "masters");
  
  // Gender
  const gender = weightedRandom(GENDERS, GENDER_WEIGHTS);
  
  // State
  const state = weightedRandom(STATES, STATE_WEIGHTS);
  
  // Mentor
  const mentorName = MENTOR_NAMES[Math.floor(Math.random() * MENTOR_NAMES.length)];
  const mentorLevel = weightedRandom(MENTOR_LEVELS, MENTOR_WEIGHTS);
  
  // Price
  const price = weightedRandom(PRICE_RANGES, PRICE_WEIGHTS);
  const villageWaiver = (price > 0 && Math.random() * 100 < 15); // 15% rural discount
  
  // Capacity
  const capacityMin = Math.floor(Math.random() * 5) + 5; // 5-10
  const capacityMax = capacityMin + Math.floor(Math.random() * 15) + 5; // up to 30
  const enrollment = Math.floor(Math.random() * capacityMax);
  
  // Dates (ISO)
  const startDate = new Date(now);
  startDate.setDate(now.getDate() + Math.floor(Math.random() * 60) - 30); // -30 to +30 days
  const startStr = startDate.toISOString().split('T')[0];
  const endDate = new Date(startDate);
  endDate.setHours(startDate.getHours() + 1 + Math.floor(Math.random() * 2)); // 1-3 hours
  const endStr = endDate.toISOString().split('T')[0];
  
  // Recurrence
  const recurrence = RECURRENCE[Math.floor(Math.random() * RECURRENCE.length)];
  
  // Equipment
  const equipmentProvided = Math.random() * 100 < BOOL_TRUE_WEIGHT;
  const equipmentRequired = equipmentProvided ? [] : ["Own gear", "Water bottle"]; // simplified
  
  // Coordinates (rough)
  const lat = -24.6 + (Math.random() - 0.5) * 2;
  const lng = 25.9 + (Math.random() - 0.5) * 2;
  
  // Build lesson object
  const lesson = {
    activity_id: `LESSON-${sport.value}-${String(i + 1).padStart(3, '0')}`,
    activity_type: "Lesson",
    specific_sport: sport.value,
    sport_display: sport.display,
    activity_state: state,
    title: `${sport.display} ${mentorLevel} Coaching – ${village}`,
    mentor_id: `p_mentor_${Math.floor(Math.random() * 50) + 1}`,
    mentor_name: mentorName,
    mentor_level: mentorLevel,
    location: {
      village: village,
      district_iso: district.iso,
      venue_name: `${village} Sports Ground`,
      coordinates: { lat, lng }
    },
    venue_type: VENUE_TYPES[Math.floor(Math.random() * VENUE_TYPES.length)],
    age_group: ageGroup,
    guardian_required: guardianRequired,
    school_id: guardianRequired ? `SCH-${district.iso}-${Math.floor(Math.random() * 20) + 1}` : null,
    grade_level: guardianRequired ? (ageGroup === "u10" ? "Standard 3" : ageGroup === "u15" ? "Form 2" : "Form 4") : null,
    safety_rating: mentorLevel === "National Coach" ? 5 : mentorLevel === "Intermediate" ? 4 : 3,
    approval_status: guardianRequired ? (Math.random() < 0.7 ? "guardian_approved" : "school_verified") : "approved",
    village_waiver: villageWaiver,
    entry_fee_pula: price,
    sponsorship_active: Math.random() * 100 < 20,
    early_bird_deadline: price > 0 && Math.random() < 0.3 ? startStr : null,
    prize_details: Math.random() < 0.1 ? "Medals & trophies" : null,
    equipment_provided: equipmentProvided,
    equipment_required: equipmentRequired,
    sync_priority: Math.random() < 0.3 ? "high" : "low",
    whatsapp_link: `https://wa.me/267${Math.floor(Math.random() * 10000000)}?text=I'm%20interested%20in%20${encodeURIComponent(sport.display)}%20lesson`,
    facebook_link: Math.random() < 0.2 ? "https://facebook.com/mizanocoach" : null,
    version_id: 1,
    language: LANGUAGES[Math.floor(Math.random() * LANGUAGES.length)],
    last_updated: Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 86400 * 30),
    capacity_min: capacityMin,
    capacity_max: capacityMax,
    enrollment_count: enrollment,
    borrow_score_required: Math.random() * 5,
    gender_targeting: gender,
    start_datetime: startDate.toISOString(),
    end_datetime: endDate.toISOString(),
    recurrence: recurrence,
    duration_minutes: 60 + Math.floor(Math.random() * 120),
    seasonal_tag: Math.random() < 0.2 ? "Summer Clinic" : null,
    registration_deadline: startDate > now ? startDate.toISOString() : null,
    skill_focus: ["Technique", "Tactics", "Fitness", "Game awareness", "Positioning"][Math.floor(Math.random() * 5)],
    requirements_text: equipmentProvided ? "All gear provided. Bring water." : "Bring your own equipment and water.",
    description: `Join us for a ${mentorLevel.toLowerCase()} level ${sport.display} lesson in ${village}. Perfect for ${ageGroup === "adult" ? "adults" : ageGroup + " age group"}.`,
    card_icon: `icon_${sport.value}`,
    hero_image_url: `/images/lessons/${sport.value}_${Math.floor(Math.random() * 3) + 1}.webp`,
    video_demo_link: Math.random() < 0.1 ? "https://youtu.be/demo" : null,
    cv_contribution_points: Math.floor(Math.random() * 50) + 10,
    leaderboard_eligible: Math.random() < 0.5,
    achievement_badge_id: Math.random() < 0.3 ? BADGE_IDS[Math.floor(Math.random() * BADGE_IDS.length)] : null,
    related_activities: Math.random() < 0.2 ? [`LESSON-${sport.value}-001`] : [],
    volunteer_spots: Math.random() < 0.2 ? Math.floor(Math.random() * 5) : 0,
    equipment_ledger_id: equipmentProvided ? `ledger_${Math.floor(Math.random() * 100)}` : null,
    user_rating: 3 + Math.random() * 2, // 3-5
  };
  
  lessons.push(lesson);
}

// ---------- Output as JS file ----------
const fileContent = `// lessons_generated.js
window.MIZANO_DATA = window.MIZANO_DATA || {};
window.MIZANO_DATA.activities = (window.MIZANO_DATA.activities || []).concat(${JSON.stringify(lessons, null, 2)});`;

console.log(fileContent);
// You can copy this output and save as lessons_generated.js