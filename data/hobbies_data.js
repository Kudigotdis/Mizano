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
    // Data for brevity truncated in this view but will be fully generated in the file.
    // ... (I will generate a large block here)
];
/* GENERATED DATA FOLLOWS */
for (let i = 3; i < 300; i++) {
    const locs = [
        { v: "Gaborone", n: "Block 3", d: "BW-GA" },
        { v: "Gaborone", n: "Phakalane", d: "BW-GA" },
        { v: "Francistown", n: "Phase 4", d: "BW-NE" },
        { v: "Maun", n: "Sedie", d: "BW-NW" },
        { v: "Kasane", n: "Plateau", d: "BW-NW" },
        { v: "Serowe", n: "Palapye", d: "BW-CE" },
        { v: "Mochudi", n: "Boseja", d: "BW-KG" },
        { v: "Molepolole", n: "Borakalalo", d: "BW-KW" },
        { v: "Kanye", n: "Main Mall", d: "BW-SO" }
    ];
    const hobbies = ["Pottery", "Knitting", "Cooking", "Gardening", "Birdwatching", "Hiking", "Reading Club", "Music Jamming", "Chess", "Debate"];
    const loc = locs[i % locs.length];
    const hobby = hobbies[i % hobbies.length];
    window.MIZANO_DATA.hobbies.push({
        "activity_id": `HOB-${loc.v.substring(0, 3).toUpperCase()}-${(i + 1).toString().padStart(3, '0')}`,
        "activity_type": "Hobby",
        "specific_sport": hobby.toLowerCase().replace(' ', '_'),
        "sport_display": hobby,
        "activity_state": i % 3 === 0 ? "recruiting" : "upcoming",
        "border_color": "#70AD47",
        "card_type": "match_making_card",
        "title": `${hobby} Session – ${loc.v}`,
        "description": `Join us for our regular ${hobby} meeting. All are welcome to participate and share ideas.`,
        "location": { "village": loc.v, "neighborhood": loc.n, "display": `${loc.v} · ${loc.n}`, "district_iso": loc.d, "venue_name": `${loc.n} Community Hall` },
        "age_group": "mixed",
        "guardian_required": false,
        "skill_level": "All Levels",
        "start_datetime": `2026-04-${(i % 28) + 1}T10:00:00Z`,
        "end_datetime": `2026-04-${(i % 28) + 1}T12:00:00Z`,
        "max_participants": 10 + (i % 20),
        "fee_pula": (i % 5) * 20,
        "host_name": "Mizano Community",
        "host_uid": `USR-BW-${loc.v.substring(0, 3).toUpperCase()}-${i + 100}`,
        "whatsapp_link": `https://wa.me/26771000${i}?text=Interested%20in%20${hobby}`,
        "tags": ["social", "hobby"]
    });
}
