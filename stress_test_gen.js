const fs = require('fs');
const path = require('path');

const sports = ["Soccer", "Basketball", "Netball", "Volleyball", "Rugby", "Tennis", "Cricket", "Athletics", "Swimming", "Chess", "Darts", "Yoga", "Pilates", "Gym", "Aerobics", "Zumba", "Cycling", "Hiking", "Marathon", "Coding"];
const cities = ["Gaborone", "Francistown", "Maun", "Kasane", "Serowe", "Palapye", "Lobatse", "Selebi-Phikwe", "Jwaneng", "Mochudi"];
const neighborhoods = ["CBD", "Block 3", "Phakalane", "Broadhurst", "G-West"];
const dates = [
    new Date('2026-02-15T10:00:00'),
    new Date('2026-02-16T15:00:00'),
    new Date('2026-03-01T09:00:00'),
    new Date('2026-04-10T14:00:00'),
    new Date('2026-05-20T11:00:00')
];

const stressData = [];

// Generate ~500 activities to really test the "Tactile Intelligence" scaling
for (let i = 0; i < 500; i++) {
    const sport = sports[Math.floor(Math.random() * sports.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const neighborhood = (city === 'Gaborone') ? neighborhoods[Math.floor(Math.random() * neighborhoods.length)] : null;
    const date = dates[Math.floor(Math.random() * dates.length)];

    // Add some random hours to the date
    const finalDate = new Date(date);
    finalDate.setHours(Math.floor(Math.random() * 8) + 8); // 08:00 to 16:00

    stressData.push({
        activity_id: `stress_${i}`,
        title: `${sport} at ${neighborhood || city}`,
        sport: sport.toLowerCase(),
        activity_type: i % 5 === 0 ? 'competition' : 'match',
        status: i % 10 === 0 ? 'published' : 'upcoming',
        location_name: neighborhood || city,
        village: city,
        start_time: finalDate.toISOString(),
        start_date: finalDate.toISOString().split('T')[0],
        left_team_name: `Team ${String.fromCharCode(65 + (i % 26))}`,
        right_team_name: `Team ${String.fromCharCode(65 + ((i + 1) % 26))}`,
        price_range: "P50 - P150"
    });
}

const fileContent = `window.MIZANO_DATA = window.MIZANO_DATA || {};
window.MIZANO_DATA.activities_stress = ${JSON.stringify(stressData, null, 4)};`;

fs.writeFileSync(path.join(__dirname, 'data/databases/activities_stress.js'), fileContent);
console.log('Stress test data generated: activities_stress.js (500 items)');
