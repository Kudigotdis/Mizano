window.MIZANO_DATA = window.MIZANO_DATA || {};
window.MIZANO_DATA.groups = window.MIZANO_DATA.groups || [];
const newGroups = [
    {
        "group_id": "GRP-GAB-001",
        "name": "Block 8 Chess Masters",
        "category": "Social Club",
        "sport_activity": "Chess",
        "description": "Casual chess club meeting every Saturday. All ages welcome.",
        "location": { "village": "Gaborone", "neighborhood": "Block 8", "display": "Gaborone · Block 8", "venue_name": "Block 8 Community Library" },
        "founded_year": 2022,
        "member_count": 24,
        "whatsapp_link": "https://wa.me/26775678901?text=Join%20Chess%20Masters",
        "verified": false,
        "active": true
    }
];
for (let i = 1; i < 100; i++) {
    const categories = ["Social Club", "Women's Group", "Youth Group", "Church-based", "Special Interest"];
    const sports = ["Chess", "Running", "Cycling", "Soccer", "Netball", "Drama"];
    const locs = ["Gaborone", "Francistown", "Maun", "Serowe", "Kanye", "Mochudi"];
    const cat = categories[i % categories.length];
    const sport = sports[i % sports.length];
    const loc = locs[i % locs.length];
    newGroups.push({
        "group_id": `GRP-${loc.substring(0, 3).toUpperCase()}-${(i + 1).toString().padStart(3, '0')}`,
        "name": `${loc} ${sport} ${cat}`,
        "category": cat,
        "sport_activity": sport,
        "description": `A vibrant ${cat} for ${sport} enthusiasts in ${loc}. Join us for weekly activities.`,
        "location": { "village": loc, "neighborhood": "Community Center", "display": `${loc} · Center`, "venue_name": `${loc} Multi-purpose Hall` },
        "founded_year": 2018 + (i % 6),
        "member_count": 10 + (i % 100),
        "whatsapp_link": `https://wa.me/26775000${i}?text=Interested%20in%20${cat}`,
        "verified": i % 4 === 0,
        "active": true
    });
}
window.MIZANO_DATA.groups = window.MIZANO_DATA.groups.concat(newGroups);
