window.MIZANO_DATA = window.MIZANO_DATA || {};
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
    }
];
/* GENERATED DATA */
for (let i = 1; i < 120; i++) {
    const sports = ["Soccer", "Netball", "Basketball", "Swimming", "Tennis", "Chess", "Karate", "Music"];
    const locs = ["Gaborone", "Francistown", "Maun", "Serowe"];
    const sport = sports[i % sports.length];
    const loc = locs[i % locs.length];
    window.MIZANO_DATA.lessons.push({
        "lesson_id": `LES-${loc.substring(0, 3).toUpperCase()}-${(i + 1).toString().padStart(3, '0')}`,
        "tutor_uid": `USR-BW-TUT-${i}`,
        "tutor_name": `Coach ${i}`,
        "tutor_title": `Certified ${sport} Instructor`,
        "sport_activity": sport,
        "lesson_type": i % 3 === 0 ? "private" : "group",
        "title": `${sport} Training – ${loc}`,
        "description": `Professional ${sport} lessons for all ages and skill levels.`,
        "location": { "village": loc, "neighborhood": "Main Center", "display": `${loc} · Center`, "venue_name": `${loc} Sports Club` },
        "schedule": { "days": ["Monday", "Thursday"], "time": "15:00–17:00", "frequency": "weekly" },
        "fee_pula": 100 + (i % 200),
        "max_students": i % 3 === 0 ? 1 : 15,
        "age_group": "mixed",
        "skill_levels": ["Beginner", "Intermediate"],
        "certifications": ["National Certification"],
        "availability": i % 5 === 0 ? "full" : "available",
        "rating": 4.0 + (i % 10) / 10,
        "reviews_count": i * 2,
        "whatsapp_link": `https://wa.me/26773000${i}?text=Lessons%20in%20${sport}`,
        "verified_coach": true
    });
}
