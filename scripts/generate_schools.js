const fs = require('fs');
const path = require('path');

// --- CONFIGURATION & CONSTANTS ---
const OUTPUT_DIR = path.join(__dirname, '../data/databases');
const INPUT_FILE = path.join(__dirname, '../data/dropdowns/DROPDOWN_REFERENCE_SCHOOLS_DATA.txt');

// Demographics (70% Black, 15% Indian, 5% White, 10% Other)
const ETHNICITY_WEIGHTS = {
    'AFRICAN': 0.70,
    'INDIAN': 0.15,
    'WHITE': 0.05,
    'OTHER': 0.10
};

// Gender (65% Male, 35% Female - as per user request for this specific dataset context?)
// NOTE: User asked for 65% Male / 35% Female.
const GENDER_WEIGHTS = {
    'MALE': 0.65,
    'FEMALE': 0.35
};

// Names Database
const NAMES = {
    AFRICAN: {
        surnames: ['Molefe', 'Khama', 'Masire', 'Mogae', 'Seretse', 'Kgafela', 'Sechele', 'Mosinyi', 'Moloi', 'Dube', 'Moyengwa', 'Gabanakgosi', 'Phiri', 'Kwena'],
        male: ['Kabo', 'Thabo', 'Tshepo', 'Kagiso', 'Tumelo', 'Tefo', 'Mpho', 'Goitseone', 'Bakang', 'Phenyo'],
        female: ['Neo', 'Lesego', 'Mpho', 'Lorato', 'Tshegofatso', 'Amantle', 'Bokamoso', 'Kealaboga', 'Naledi', 'Warona']
    },
    INDIAN: {
        surnames: ['Patel', 'Singh', 'Sharma', 'Naidoo', 'Khan', 'Gupta', 'Kumar', 'Reddy'],
        male: ['Aarav', 'Vihaan', 'Aditya', 'Sai', 'Rohan', 'Ishaan', 'Mohammed', 'Rahul'],
        female: ['Aanya', 'Diya', 'Sana', 'Priya', 'Ananya', 'Zara', 'Fatima', 'Aisha']
    },
    WHITE: {
        surnames: ['Smith', 'Jones', 'Williams', 'Brown', 'Taylor', 'Evans', 'Davies', 'Wilson'],
        male: ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Thomas'],
        female: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica']
    },
    OTHER: {
        surnames: ['Lee', 'Wang', 'Chen', 'Kim', 'Garcia', 'Rodriguez', 'Silva', 'Santos'],
        male: ['Wei', 'Jun', 'Antonio', 'Carlos', 'Jose', 'Manuel', 'Hiroshi', 'Kenji'],
        female: ['Li', 'Mei', 'Maria', 'Ana', 'Sofia', 'Isabella', 'Sakura', 'Yuki']
    }
};

const SPORTS = [
    { name: 'Soccer', type: 'Team', min_players: 11 },
    { name: 'Volleyball', type: 'Team', min_players: 6 },
    { name: 'Netball', type: 'Team', min_players: 7 },
    { name: 'Athletics (Sprints)', type: 'Individual' },
    { name: 'Athletics (Distance)', type: 'Individual' },
    { name: 'Chess', type: 'Individual' },
    { name: 'Basketball', type: 'Team', min_players: 5 },
    { name: 'Karate', type: 'Individual' },
    { name: 'Tennis', type: 'Individual' },
    { name: 'Pickleball', type: 'Individual' },
    { name: 'Debate', type: 'Team', min_players: 3 }
];

const PRIVATE_ONLY_SPORTS = [
    { name: 'Swimming', type: 'Individual' },
    { name: 'Golf', type: 'Individual' }
];

// --- HELPER FUNCTIONS ---

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getWeightedRandom(weights) {
    const r = Math.random();
    let sum = 0;
    for (const [key, weight] of Object.entries(weights)) {
        sum += weight;
        if (r <= sum) return key;
    }
    return Object.keys(weights)[0]; // Fallback
}

function generateName(ethnicity, gender) {
    const ethnData = NAMES[ethnicity];
    const firstName = getRandomElement(ethnData[gender === 'MALE' ? 'male' : 'female']);
    const surname = getRandomElement(ethnData.surnames);
    return { firstName, surname, ethnicity };
}

function generateUser(role, schoolId, familyId = null, forcedSurname = null) {
    const ethnicity = getWeightedRandom(ETHNICITY_WEIGHTS);
    const gender = getWeightedRandom(GENDER_WEIGHTS);
    const nameData = generateName(ethnicity, gender);
    const surname = forcedSurname || nameData.surname;

    return {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        name: `${nameData.firstName} ${surname}`,
        role: role, // 'Student', 'Teacher', 'Parent', 'Coach'
        school_id: schoolId,
        gender: gender,
        ethnicity: ethnicity,
        family_id: familyId || `fam_${Math.random().toString(36).substr(2, 9)}`,
        profile_pic: `assets/avatars/${gender.toLowerCase()}_${ethnicity.toLowerCase()}_${Math.floor(Math.random() * 5) + 1}.png`
    };
}

// --- MAIN GENERATION LOGIC ---

function parseSchools(filePath) {
    const schools = [];
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    lines.forEach(line => {
        // Line format: - **Name** (Type) [Dropdown: Category]
        const match = line.match(/- \*\*(.*)\*\* \((.*)\) \[Dropdown: (.*)\]/);
        if (match) {
            schools.push({
                id: `sch_${schools.length + 1}`,
                name: match[1].trim(),
                type: match[2].trim(), // e.g., 'Public Primary', 'Private Secondary'
                category: match[3].trim(),
                location: extractLocation(match[1].trim()), // Helper to guess location
                is_private: match[2].toLowerCase().includes('private'),
                teams: [],
                stats: { students: 0, teachers: 0 }
            });
        }
    });
    return schools;
}

function extractLocation(schoolName) {
    // Extract text inside parentheses as likely location
    const match = schoolName.match(/\((.*)\)/);
    return match ? match[1] : 'Gaborone'; // Default to Gaborone if no location found
}

function generateData() {
    console.log('Starting Data Generation...');

    // 1. Parse Schools
    const schools = parseSchools(INPUT_FILE);
    console.log(`Parsed ${schools.length} schools.`);

    const users = [];
    const matches = [];
    const leaderboards = {};

    // 2. Generate Users & Teams per School
    schools.forEach(school => {
        // Determine number of students based on school type (simplified)
        const numStudents = Math.floor(Math.random() * 20) + 10; // 10-30 mock students per school
        const numTeachers = Math.floor(numStudents / 10) + 1;

        // Generate Students (with family logic)
        const students = [];
        for (let i = 0; i < numStudents; i++) {
            // Check for sibling chance (20%)
            let familyId = null;
            let surname = null;

            if (Math.random() < 0.20 && students.length > 0) {
                // Link to existing student
                const sibling = getRandomElement(students);
                familyId = sibling.family_id;
                surname = sibling.name.split(' ')[1];
            }

            const student = generateUser('Student', school.id, familyId, surname);
            students.push(student);
            users.push(student);
        }

        // Parent/Cousin Logic (simplified post-processing or on-the-fly?)
        // For now, generating separate parents linked to families
        // 30% cousin chance is hard to model strictly without a complex graph, 
        // but sharing surnames across different schools implies cousin-ship in many contexts.
        // We will focus on the explicit Sibling link via family_id for now.

        // Generate Teachers
        for (let i = 0; i < numTeachers; i++) {
            users.push(generateUser('Teacher', school.id));
        }

        school.stats.students = numStudents;
        school.stats.teachers = numTeachers;

        // 3. Generate Teams
        const availableSports = [...SPORTS];
        if (school.is_private) {
            availableSports.push(...PRIVATE_ONLY_SPORTS);
        }

        // Each school gets 3-5 random sports teams
        const numTeams = Math.floor(Math.random() * 3) + 3;
        const schoolSports = [];
        while (schoolSports.length < numTeams) {
            const sport = getRandomElement(availableSports);
            if (!schoolSports.includes(sport)) schoolSports.push(sport);
        }

        schoolSports.forEach(sport => {
            const teamId = `team_${school.id}_${sport.name.replace(/\s/g, '').toLowerCase()}`;
            school.teams.push({
                id: teamId,
                name: `${school.name} ${sport.name} Team`,
                sport: sport.name,
                school_id: school.id,
                matches_played: 0,
                wins: 0,
                losses: 0,
                draws: 0
            });
        });
    });

    console.log(`Generated ${users.length} users.`);

    // 4. Match Simulator
    console.log('Simulating Matches...');
    schools.forEach(school => {
        school.teams.forEach(team => {
            // Generate 10 matches
            for (let i = 0; i < 10; i++) {
                // Opponent Selection
                let opponentPool = [];
                const rand = Math.random();

                // 60% Same Location (Local)
                if (rand < 0.60) {
                    opponentPool = schools.filter(s => s.location === school.location && s.id !== school.id);
                }
                // 30% Same Region (Simplified to 'not same location but random') - for now just all others
                else if (rand < 0.90) {
                    opponentPool = schools.filter(s => s.id !== school.id);
                }
                // 10% National (Any)
                else {
                    opponentPool = schools.filter(s => s.id !== school.id);
                }

                if (opponentPool.length === 0) opponentPool = schools.filter(s => s.id !== school.id); // Fallback

                const opponentSchool = getRandomElement(opponentPool);
                // Try to find a team of the same sport
                const opponentTeam = opponentSchool.teams.find(t => t.sport === team.sport);

                if (opponentTeam) {
                    // Simulate Result
                    const scoreA = Math.floor(Math.random() * 5);
                    const scoreB = Math.floor(Math.random() * 5);

                    const match = {
                        id: `match_${Math.random().toString(36).substr(2, 9)}`,
                        sport: team.sport,
                        home_team: team.id,
                        away_team: opponentTeam.id,
                        home_score: scoreA,
                        away_score: scoreB,
                        date: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString()
                    };
                    matches.push(match);

                    // Update Team Stats
                    team.matches_played++;
                    if (scoreA > scoreB) team.wins++;
                    else if (scoreA < scoreB) team.losses++;
                    else team.draws++;

                    // Note: In a real simulation we'd update the opponent too, 
                    // but we iterate through all teams anyway, so we avoid double counting 
                    // by only recording the "current" team's perspective or using a centralized match store.
                    // For this simple mock, we'll just record the match history object.
                }
            }
        });
    });

    // 5. Leaderboard Generation
    console.log('Generating Leaderboards...');
    // Group teams by Sport
    const teamsBySport = {};
    schools.forEach(s => {
        s.teams.forEach(t => {
            if (!teamsBySport[t.sport]) teamsBySport[t.sport] = [];
            teamsBySport[t.sport].push(t);
        });
    });

    Object.keys(teamsBySport).forEach(sport => {
        // Sort by Wins (desc)
        leaderboards[sport] = teamsBySport[sport].sort((a, b) => b.wins - a.wins).slice(0, 50); // Top 50
    });


    // --- WRITE FILES ---
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    fs.writeFileSync(path.join(OUTPUT_DIR, 'schools.js'), `window.MIZANO_DATA = window.MIZANO_DATA || {}; window.MIZANO_DATA.schools = ${JSON.stringify(schools, null, 2)};`);
    fs.writeFileSync(path.join(OUTPUT_DIR, 'users_generated.js'), `window.MIZANO_DATA = window.MIZANO_DATA || {}; window.MIZANO_DATA.users_generated = ${JSON.stringify(users, null, 2)};`);
    fs.writeFileSync(path.join(OUTPUT_DIR, 'generated_matches.js'), `window.MIZANO_DATA = window.MIZANO_DATA || {}; window.MIZANO_DATA.matches = ${JSON.stringify(matches, null, 2)};`);
    fs.writeFileSync(path.join(OUTPUT_DIR, 'generated_leaderboards.js'), `window.MIZANO_DATA = window.MIZANO_DATA || {}; window.MIZANO_DATA.leaderboards = ${JSON.stringify(leaderboards, null, 2)};`);

    console.log('Data Generation Complete.');
}

generateData();
