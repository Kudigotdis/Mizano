/**
 * Mizano RDP Generator (v3 - Deep Connectivity)
 * Generates 1,000 interconnected Real Deep Profiles (RDPs).
 * Features: Tiered school connectivity, complex family trees, 
 * historical fixture data (1 year), and adult school histories.
 */

const fs = require('fs');
const path = require('path');

const TARGET_COUNT = 1000;
const SURNAMES = ['Modise', 'Molefe', 'Kgosiemang', 'Sebego', 'Moatlhodi', 'Mokgosi', 'Phiri', 'Tlou', 'Motsamai', 'Kebonang', 'Ratshosa', 'Tshosa', 'Koma', 'Segokgo'];
const MALE_NAMES = ['Thato', 'Kagiso', 'Karabo', 'Lesedi', 'Oatlhotse', 'Tshepo', 'Bakani', 'Modiri', 'Neo', 'Tumelo', 'Kabelo', 'Puso'];
const FEMALE_NAMES = ['Naledi', 'Refilwe', 'Amantle', 'Bosa', 'Kutlo', 'Lindiwe', 'Mpho', 'Onneile', 'Keneilwe', 'Ketshepile', 'Tshepagalo', 'Khumo'];

const CLASS_TYPES = ['Mathematics', 'Setswana', 'English', 'Integrated Science', 'Social Studies', 'Fine Arts', 'Music', 'Physical Education', 'Information Technology', 'Religious Education', 'Design & Technology', 'Business Studies', 'Agriculture', 'Home Economics', 'Guidance & Counseling'];
const INTERESTS_MALE = ['Soccer', 'Basketball', 'Cricket', 'Rugby', 'Cycling', 'Hiking', 'Chess', 'Gaming', 'Photography', 'Coding', 'Car Mechanics', 'Braaiing', 'History', 'Documentaries', 'Swimming'];
const INTERESTS_FEMALE = ['Netball', 'Volleyball', 'Tennis', 'Yoga', 'Pilates', 'Dance', 'Traditional Cooking', 'Gardening', 'Fashion Design', 'Reading', 'Writing', 'Volunteerism', 'Wellness', 'Travel', 'Meditation'];

const SCHOOLS = [
    { id: 'SCH-BW-GAB-01', name: 'Northside Primary School', city: 'Gaborone', region: 'South East', type: 'Primary' },
    { id: 'SCH-BW-GAB-02', name: 'Maru-a-Pula Secondary', city: 'Gaborone', region: 'South East', type: 'Secondary' },
    { id: 'SCH-BW-GAB-03', name: 'Westwood International', city: 'Gaborone', region: 'South East', type: 'Combined' },
    { id: 'SCH-BW-GAB-04', name: 'Baobab Primary', city: 'Gaborone', region: 'South East', type: 'Primary' },
    { id: 'SCH-BW-GAB-05', name: 'Thornhill Primary', city: 'Gaborone', region: 'South East', type: 'Primary' },
    { id: 'SCH-BW-FRA-01', name: 'John Mackenzie School', city: 'Francistown', region: 'North East', type: 'Combined' },
    { id: 'SCH-BW-FRA-02', name: 'Mophato School', city: 'Francistown', region: 'North East', type: 'Secondary' },
    { id: 'SCH-BW-MAUN-01', name: 'Maun Secondary', city: 'Maun', region: 'North West', type: 'Secondary' },
    { id: 'SCH-BW-MOL-01', name: 'Kgari Sechele II', city: 'Molepolole', region: 'Kweneng', type: 'Secondary' }
];

class RDPGenerator {
    constructor() {
        this.profiles = [];
        this.tournaments = [];
    }

    getRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

    generateDeepData(profile, gender, age) {
        profile.interests = (gender === 'Male' ? INTERESTS_MALE : INTERESTS_FEMALE)
            .sort(() => 0.5 - Math.random()).slice(0, 15);

        profile.dietary = this.getRandom(['Standard', 'Vegetarian', 'Vegan', 'No Peanuts', 'Lactose Free']);
        profile.medical = { insurance: Math.random() > 0.4 ? 'BOMAID' : 'Pula Medical', blood: this.getRandom(['A+', 'B+', 'O+', 'AB+']) };
        profile.financial = { mobile: this.getRandom(['Mascom', 'Orange', 'BTC']), bank: this.getRandom(['Orange Money', 'MyZaka', 'Smega']), whatsapp: `+2677${Math.floor(1000000 + Math.random() * 9000000)}` };

        if (age >= 22 && Math.random() < 0.8) {
            profile.school_history = [];
            for (let i = 0; i < 6; i++) {
                profile.school_history.push({ name: `School ${i + 1}`, period: `${1990 + i * 3}-${1993 + i * 3}`, location: i < 3 ? 'Gaborone' : 'Francistown' });
            }
        }

        if (age >= 7 && age <= 18) {
            profile.classes = CLASS_TYPES.sort(() => 0.5 - Math.random()).slice(0, 7).map(c => ({
                subject: c, proficiency: this.getRandom(['Beginner', 'Intermediate', 'Expert']), teacher: `USR-TEACH-${Math.floor(Math.random() * 50)}`
            }));
        }

        profile.connections = profile.connections || [];
        return profile;
    }

    addRel(p1, p2, type) {
        if (!p1.connections.find(c => c.id === p2.profile_id)) p1.connections.push({ id: p2.profile_id, type, name: `${p2.first_name} ${p2.surname}` });
        if (!p2.connections.find(c => c.id === p1.profile_id)) p2.connections.push({ id: p1.profile_id, type: type === 'Parent' ? 'Child' : type, name: `${p1.first_name} ${p1.surname}` });
    }

    generateKaoFamily() {
        const kao = this.generateDeepData({ profile_id: 'USR-BW-GAB-DEMO-001', first_name: 'Kao', surname: 'Mjekejeke', age: 35, gender: 'Male', nationality: 'Motswana' }, 'Male', 35);
        this.profiles.push(kao);

        const wife = this.generateDeepData({ profile_id: 'USR-KAO-WIFE', first_name: 'Lesedi', surname: 'Mjekejeke', age: 38, gender: 'Female' }, 'Female', 38);
        this.addRel(kao, wife, 'Spouse'); this.profiles.push(wife);

        const kids = [{ id: 'K1', n: 'Refilwe', a: 16, g: 'Female' }, { id: 'K2', n: 'Karabo', a: 14, g: 'Male' }, { id: 'K3', n: 'Thato', a: 12, g: 'Male' }];
        kids.forEach(k => {
            const child = this.generateDeepData({ profile_id: `USR-KAO-KID-${k.id}`, first_name: k.n, surname: 'Mjekejeke', age: k.a, gender: k.g }, k.g, k.a);
            this.addRel(kao, child, 'Parent'); this.addRel(wife, child, 'Parent'); this.profiles.push(child);
        });

        const mom = this.generateDeepData({ profile_id: 'USR-KAO-MOM', first_name: 'Mpho', surname: 'Mjekejeke', age: 61, gender: 'Female' }, 'Female', 61);
        const dad = this.generateDeepData({ profile_id: 'USR-KAO-DAD', first_name: 'Kebonang', surname: 'Mjekejeke', age: 69, gender: 'Male' }, 'Male', 69);
        this.addRel(kao, mom, 'Parent'); this.addRel(kao, dad, 'Parent'); this.profiles.push(mom, dad);

        // Extended family... siblings, cousins, etc.
        const sis = this.generateDeepData({ profile_id: 'USR-KAO-SIS', first_name: 'Amantle', surname: 'Sebego', age: 33, gender: 'Female' }, 'Female', 33);
        this.addRel(kao, sis, 'Sibling'); this.profiles.push(sis);
        const sisHusband = this.generateDeepData({ profile_id: 'USR-SIS-HUSB', first_name: 'Modise', surname: 'Sebego', age: 36, gender: 'Male' }, 'Male', 36);
        this.addRel(sis, sisHusband, 'Spouse'); this.profiles.push(sisHusband);
        for (let i = 0; i < 3; i++) {
            const sKid = this.generateDeepData({ profile_id: `USR-SIS-KID-${i}`, first_name: `Sis-Kid-${i}`, surname: 'Sebego', age: 4 + i, gender: 'Male' }, 'Male', 4 + i);
            this.addRel(sis, sKid, 'Parent'); this.profiles.push(sKid);
        }
    }

    generateTournaments() {
        const types = ['Neighborhood', 'Village', 'Regional', 'National'];
        const sports = ['Soccer', 'Netball', 'Chess'];

        SCHOOLS.forEach(s => {
            const hist = [];
            for (let i = 0; i < 12; i++) {
                const opponent = this.getRandom(SCHOOLS);
                if (opponent.id === s.id) continue;
                const d = new Date(2025, 0 + i, 10 + Math.floor(Math.random() * 15));
                hist.push({
                    date: d.toISOString().split('T')[0],
                    opponent: opponent.name,
                    venue: i % 2 === 0 ? s.name : opponent.name,
                    status: d < new Date() ? 'Played' : 'Upcoming',
                    result: d < new Date() ? `${Math.floor(Math.random() * 5)} - ${Math.floor(Math.random() * 5)}` : 'TBD',
                    tier: this.getRandom(types),
                    sport: this.getRandom(sports)
                });
            }
            s.fixtures = hist;
        });
    }

    generateRDPs() {
        while (this.profiles.length < TARGET_COUNT) {
            const gender = Math.random() > 0.5 ? 'Male' : 'Female';
            const age = 7 + Math.floor(Math.random() * 60);
            const p = this.generateDeepData({
                profile_id: `USR-GEN-${this.profiles.length}`,
                first_name: this.getRandom(gender === 'Male' ? MALE_NAMES : FEMALE_NAMES),
                surname: this.getRandom(SURNAMES),
                age, gender
            }, gender, age);
            this.profiles.push(p);
        }
    }

    synthesizeNetwork() {
        this.profiles.forEach(p => {
            const target = 10 + Math.floor(Math.random() * 11);
            while (p.connections.length < target) {
                const f = this.getRandom(this.profiles);
                if (f.profile_id !== p.profile_id) this.addRel(p, f, 'Associate');
            }
        });
    }

    save() {
        const outDir = path.join(__dirname, '../data');
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
        fs.writeFileSync(path.join(outDir, 'mizano_1000_profiles.json'), JSON.stringify(this.profiles, null, 2));
        fs.writeFileSync(path.join(outDir, 'mizano_schools_fixtures.json'), JSON.stringify(SCHOOLS, null, 2));
        console.log("Generated 1000 RDPs and School Fixtures.");
    }
}

const g = new RDPGenerator();
g.generateKaoFamily();
g.generateRDPs();
g.generateTournaments();
g.synthesizeNetwork();
g.save();
