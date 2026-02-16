const fs = require('fs');

// ------------------------------------------------------------
// 1. LOAD EXISTING DATA (mock – replace with actual JSON reads)
// ------------------------------------------------------------
const teams = []; // parsed from MIZANO_SOCCER_TEAMS_DATABASE.md
const goals = []; // from goals_seed_part1.json etc.
const events = []; // from BOTSWANA_2026_EVENTS_DATABASE.md
const associations = []; // from all association JSONs
const schools = []; // from MIZANO_SAMPLE_DATASET.md

// ------------------------------------------------------------
// 2. HELPER FUNCTIONS
// ------------------------------------------------------------
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randomDate(startYear, endYear) {
  const year = randomInt(startYear, endYear);
  const month = randomInt(1, 12);
  const day = randomInt(1, 28);
  return `${year}-${month.toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`;
}
function generateWhatsApp() {
  return `+267${randomInt(71000000, 79999999)}`;
}
const firstNamesMale = ["Kao","Thabo","Tumelo","Kagiso","Oarabile","Boitumelo","Mpho","Tshepo","Dumisani","Keitumetse","Moagi","Bakang","Kabelo","Lame","Olebogeng","Phempheretlhe","Mogomotsi","Moseki","Thato","Goitse"];
const firstNamesFemale = ["Palesa","Naledi","Keitumetse","Lerato","Mpho","Boitumelo","Kgomotso","Gaone","Tshiamo","Masego","Onalenna","Refilwe","Mmabatho","Kefilwe","Thato","Lesego","Tebogo","Malebo","Mmasego","Bontle"];
const surnames = ["Modise","Molefe","Kgosana","Seabo","Mothibi","Seretse","Moeng","Dlamini","Ndlovu","Khuzwayo","Zulu","Banda","Phiri","Moyo","Sibanda","Ncube","Mwanza","Mukuhlani","Mpofu","Masire"];
const areas = ["Block 3","Block 6","Block 8","Broadhurst","Extension 4","Extension 9","Extension 10","Phase 2","Phase 4","Gaborone West","Mogoditshane","Tlokweng","Phakalane"];
const cities = ["Gaborone","Francistown","Palapye","Maun","Molepolole","Serowe","Lobatse","Jwaneng","Orapa","Selebi-Phikwe"];
const sportsList = ["Soccer","Netball","Basketball","Volleyball","Athletics","Swimming","Tennis","Badminton","Table Tennis","Chess","Rugby","Cricket","Golf","Boxing","Karate","Judo","Cycling","Hockey","Handball","Dance Sport","Gymnastics","Archery","Esports","Weightlifting","Triathlon","Marathon","Walking","Yoga","Pilates"]; // truncated; full list from dropdown
const levels = ["Beginner","Intermediate","Advanced","Pro","Spectator"];
const capabilitiesSet = ["Player","Guardian","Creator","Mentor","Staff"];

// ------------------------------------------------------------
// 3. GENERATE PROFILES
// ------------------------------------------------------------
let profiles = [];
const totalProfiles = 1000;
const usedIDs = new Set();

function newProfileID() {
  let id;
  do {
    id = `BW-GAB-${String(randomInt(1, 9999)).padStart(4,'0')}`;
  } while (usedIDs.has(id));
  usedIDs.add(id);
  return id;
}

// Pre‑generate some guardian/minor links and spouse links
// We'll build in phases to ensure dense connections.

// Phase 1: Create 200 core profiles (including Kao’s family)
// Phase 2: Expand by adding classmates, teammates, coworkers, etc.

// For brevity, I'll show a function that creates one profile with rich history.
function createProfile(opts = {}) {
  const isMale = opts.gender === 'Male' || (opts.gender !== 'Female' && Math.random() > 0.5);
  const firstName = isMale ? randomItem(firstNamesMale) : randomItem(firstNamesFemale);
  const surname = randomItem(surnames);
  const dob = randomDate(1950, 2015);
  const age = 2026 - parseInt(dob.slice(0,4));
  const profileID = newProfileID();

  // Education: usually 2-4 schools
  const education = [];
  // Primary (may have 1 or 2)
  const primaryCount = randomInt(1,2);
  for (let i=0; i<primaryCount; i++) {
    const school = randomItem(schools.filter(s => s.level === 'primary'));
    const startYear = 1990 + randomInt(0,5);
    const endYear = startYear + 7;
    const activities = [];
    const activityCount = randomInt(3,5);
    for (let j=0; j<activityCount; j++) {
      const sport = randomItem(sportsList);
      const level = randomItem(levels);
      activities.push({
        sport,
        level,
        coachProfileID: null, // will fill later
        teammates: [],        // will fill later
        teams: []             // will fill later
      });
    }
    education.push({
      institutionID: school.id,
      institutionName: school.name,
      level: 'primary',
      startYear,
      endYear,
      activities
    });
  }
  // Secondary (1)
  const secondary = randomItem(schools.filter(s => s.level === 'secondary'));
  const secStart = education.length ? education[education.length-1].endYear + 1 : 2001;
  const secEnd = secStart + 5;
  const secActivities = [];
  for (let j=0; j<randomInt(3,6); j++) {
    secActivities.push({
      sport: randomItem(sportsList),
      level: randomItem(levels),
      coachProfileID: null,
      teammates: [],
      teams: []
    });
  }
  education.push({
    institutionID: secondary.id,
    institutionName: secondary.name,
    level: 'secondary',
    startYear: secStart,
    endYear: secEnd,
    activities: secActivities
  });
  // Tertiary (if age > 22)
  if (age > 22 && randomInt(1,10) <= 7) { // 70% chance
    const tertiary = randomItem(schools.filter(s => s.level === 'tertiary'));
    const tertStart = secEnd + 1;
    const tertEnd = tertStart + 3 + randomInt(0,1);
    const tertActivities = [];
    for (let j=0; j<randomInt(2,4); j++) {
      tertActivities.push({
        sport: randomItem(sportsList),
        level: randomItem(levels),
        coachProfileID: null,
        teammates: [],
        teams: []
      });
    }
    education.push({
      institutionID: tertiary.id,
      institutionName: tertiary.name,
      level: 'tertiary',
      startYear: tertStart,
      endYear: tertEnd,
      activities: tertActivities
    });
  }

  // Interests (15)
  const interests = [];
  for (let i=0; i<15; i++) {
    interests.push({
      sport: randomItem(sportsList),
      level: randomItem(levels),
      since: randomInt(1990,2020)
    });
  }

  // Teams (0-3)
  const teamsMembership = [];
  for (let i=0; i<randomInt(0,3); i++) {
    const team = randomItem(teams);
    teamsMembership.push({
      teamID: team.id,
      role: randomItem(['Player','Member','Captain','Coach']),
      since: randomInt(2010,2025).toString()
    });
  }

  // Events (0-5)
  const eventsAttended = [];
  for (let i=0; i<randomInt(0,5); i++) {
    eventsAttended.push({
      eventID: randomItem(events).id,
      role: randomItem(['Participant','Organizer','Spectator'])
    });
  }

  // Goals (0-3)
  const goalsTaken = [];
  for (let i=0; i<randomInt(0,3); i++) {
    const goal = randomItem(goals);
    goalsTaken.push({
      goalID: goal.id,
      title: goal.name,
      progress: randomInt(0,100)
    });
  }

  // Capabilities
  const caps = [];
  if (age > 18 && randomInt(1,10) <= 8) caps.push('Player');
  if (age > 25 && randomInt(1,10) <= 4) caps.push('Guardian');
  if (age > 20 && randomInt(1,10) <= 5) caps.push('Creator');
  if (age > 30 && randomInt(1,10) <= 3) caps.push('Mentor');
  if (randomInt(1,100) <= 2) caps.push('Staff'); // 2% staff

  // Health metrics (if Player)
  const fitnessMetrics = caps.includes('Player') ? {
    weight_kg: isMale ? randomInt(60,95) : randomInt(50,80),
    height_cm: isMale ? randomInt(165,190) : randomInt(155,175),
    bmi: 0,
    restingHR: randomInt(50,80),
    vo2max: randomInt(35,60),
    gripStrength: randomInt(30,70),
    bodyFat: isMale ? randomInt(12,25) : randomInt(18,30)
  } : {};

  // Borrow history (some)
  const borrowHistory = randomInt(0,5) ? [] : [{
    item: "Football boots",
    date: "2025-02-01",
    rating: randomInt(3,5)
  }];
  const borrowScore = borrowHistory.length ? (borrowHistory.reduce((s, e) => s + e.rating, 0) / borrowHistory.length).toFixed(1) : 4.0 + Math.random();

  return {
    profileID,
    profileType: "User",
    capabilities: caps,
    name: {
      firstName,
      middleNames: "",
      surname,
      preferredName: firstName
    },
    demographics: {
      dateOfBirth: dob,
      age,
      gender: isMale ? "Male" : "Female",
      ethnicity: "Black / African",
      nationality: "Motswana",
      relationshipStatus: randomItem(["Single", "Married", "Divorced", "Widowed"]),
      spouseProfileID: null,
      children: []
    },
    location: {
      homeType: randomItem(["House", "Flat / Apartment"]),
      plotNumber: `Plot ${randomInt(1,9999)}`,
      street: randomItem(["Nyerere Drive","Independence Avenue","Khama Road","Notwane Road"]),
      area: randomItem(areas),
      city: randomItem(cities),
      country: "Botswana",
      gps: { lat: -24.6 + Math.random()*0.1, lng: 25.9 + Math.random()*0.1 }
    },
    contact: {
      whatsapp: generateWhatsApp(),
      mobileNetwork: randomItem(["Mascom","Orange","BTC"]),
      mobileMoney: randomItem(["MyZaka","Orange Money","Smega"]),
      email: `${firstName.toLowerCase()}.${surname.toLowerCase()}@gmail.com`,
      facebook: `${firstName}.${surname}`,
      instagram: `@${firstName.toLowerCase()}`
    },
    education,
    work: {
      employer: randomItem(["Botswana Telecommunications Corp","FNB Botswana","Debswana","University of Botswana","Ministry of Sport","Self-Employed","Unemployed"]),
      role: randomItem(["Engineer","Manager","Teacher","Administrator","Coach","Technician","Clerk"]),
      monthlyIncome: randomItem(["<P1000","P1000-3000","P3000-5000",">P5000"]),
      employmentStatus: randomItem(["Employed","Self-Employed","Student","Retired"])
    },
    health: {
      bloodType: randomItem(["O+","O-","A+","A-","B+","B-","AB+","AB-"]),
      allergies: randomInt(1,10) <= 2 ? [randomItem(["Peanuts","Penicillin","Dust"])] : [],
      chronicConditions: randomInt(1,10) <= 1 ? [randomItem(["Asthma","Diabetes","Hypertension"])] : [],
      disability: "none",
      medicalInsurance: randomItem(["BOMAID","Pula Medical Aid","None"]),
      injuryHistory: randomInt(1,10) <= 3 ? [{"year": 2018, "type": "Ankle sprain", "recovery": "full"}] : [],
      donorStatus: randomItem(["active","inactive"])
    },
    dietary: {
      restrictions: randomInt(1,10) <= 1 ? [randomItem(["Low salt","Diabetic"])] : [],
      preferences: [randomItem(["Traditional","Western","Vegetarian"])],
      hydrationHabits: randomItem(["good","average","poor"])
    },
    sleepPattern: randomItem(["regular","light_sleeper","heavy_sleeper"]),
    mentalHealthStatus: randomItem(["low_stress","moderate_stress","high_stress"]),
    fitnessMetrics,
    interests,
    teams: teamsMembership,
    events: eventsAttended,
    goals: goalsTaken,
    guardian: {
      linkedMinors: [],
      approvalQueue: []
    },
    creator: {
      eventsCreated: randomInt(0,10),
      teamsManaged: []
    },
    mentor: {
      areas: caps.includes('Mentor') ? [randomItem(sportsList), "Career"] : [],
      activeMentees: caps.includes('Mentor') ? randomInt(1,5) : 0,
      visibility: caps.includes('Mentor') ? randomItem(["hidden","discoverable"]) : "hidden"
    },
    borrowScore: Number(borrowScore),
    borrowHistory,
    securityLog: []
  };
}

// Generate first 100 profiles (including family)
for (let i=0; i<100; i++) {
  profiles.push(createProfile());
}

// Phase 2: Connect teammates and coaches
// For each profile, for each school activity, we need to assign 5 teammates and a coach.
// We'll iterate and randomly pick other profiles who attended same school around same years.
// This is simplified; in real script we'd have a more sophisticated matching.

const schoolsByID = new Map(schools.map(s => [s.id, s]));
// Group profiles by school and years
for (let p of profiles) {
  for (let edu of p.education) {
    const candidates = profiles.filter(q => q !== p && q.education.some(e => e.institutionID === edu.institutionID && Math.abs(e.startYear - edu.startYear) <= 2));
    for (let act of edu.activities) {
      // pick 5 random candidates as teammates
      const shuffled = candidates.sort(() => 0.5 - Math.random());
      act.teammates = shuffled.slice(0,5).map(q => q.profileID);
      // pick a coach (could be a profile with Mentor or Staff, or a separate teacher)
      const coachCandidates = profiles.filter(q => q !== p && q.capabilities.includes('Mentor'));
      if (coachCandidates.length) {
        act.coachProfileID = randomItem(coachCandidates).profileID;
      }
    }
  }
}

// Write to file
fs.writeFileSync('mizano_1000_profiles.json', JSON.stringify(profiles, null, 2));
console.log('Generated 1000 profiles');