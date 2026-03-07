window.MIZANO_DATA = window.MIZANO_DATA || {};
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
    }
];
/* GENERATED DATA */
for (let i = 1; i < 150; i++) {
    const locs = [
        { v: "Gaborone", n: "CBD", d: "BW-GA" },
        { v: "Francistown", n: "Donga", d: "BW-NE" },
        { v: "Maun", n: "Thamalakane", d: "BW-NW" },
        { v: "Kasane", n: "Riverside", d: "BW-NW" },
        { v: "Ghanzi", n: "Township", d: "BW-GH" }
    ];
    const categories = ["Wellness", "Adventure", "Social", "Cultural", "Nature", "Entertainment"];
    const loc = locs[i % locs.length];
    const cat = categories[i % categories.length];
    window.MIZANO_DATA.leisure.push({
        "event_id": `LEI-${loc.v.substring(0, 3).toUpperCase()}-${(i + 1).toString().padStart(3, '0')}`,
        "event_type": "Leisure",
        "category": cat,
        "title": `${cat} Event – ${loc.v}`,
        "description": `A wonderful ${cat} opportunity for the community. Don't miss out!`,
        "location": { "village": loc.v, "neighborhood": loc.n, "display": `${loc.v} · ${loc.n}`, "venue_name": `${loc.v} Event Center` },
        "activity_state": "upcoming",
        "start_datetime": `2026-05-${(i % 28) + 1}T14:00:00Z`,
        "end_datetime": `2026-05-${(i % 28) + 1}T17:00:00Z`,
        "recurring": i % 5 === 0 ? "weekly" : "once",
        "fee_pula": (i % 10) * 10,
        "max_participants": 20 + (i % 50),
        "host_name": "Mizano Events",
        "host_uid": `USR-BW-LEI-${i}`,
        "whatsapp_link": `https://wa.me/26772000${i}?text=Interested%20in%20${cat}`,
        "tags": [cat.toLowerCase(), "leisure"]
    });
}
