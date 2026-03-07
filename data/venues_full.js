window.MIZANO_DATA = window.MIZANO_DATA || {};
window.MIZANO_DATA.venues = [
    {
        "venue_id": "venue_national_stadium",
        "name": "National Stadium",
        "type": "athletics_track",
        "location": { "village": "Gaborone", "neighborhood": "Gaborone North", "display": "Gaborone · National Stadium", "district": "South-East District" },
        "facilities": ["Athletics track", "Football pitch"],
        "booking_contact": "+26771111001",
        "booking_fee_pula": { "hourly": 200, "daily": 1500 },
        "capacity": 3000,
        "surface": "tartan",
        "status": "open"
    }
];
for (let i = 1; i < 100; i++) {
    const types = ["football_pitch", "netball_court", "indoor_hall", "swimming_pool", "multi-sport"];
    const locs = ["Gaborone", "Francistown", "Maun", "Selebi Phikwe", "Lobatse", "Palapye", "Tlokweng"];
    const type = types[i % types.length];
    const loc = locs[i % locs.length];
    window.MIZANO_DATA.venues.push({
        "venue_id": `venue-${i}`,
        "name": `${loc} ${type.replace('_', ' ')} ${i}`,
        "type": type,
        "location": { "village": loc, "neighborhood": "Center", "display": `${loc} · ${type.replace('_', ' ')}`, "district": "Active District" },
        "facilities": [type.replace('_', ' '), "Changing rooms"],
        "booking_contact": `+26771112${i}`,
        "booking_fee_pula": { "hourly": 50 + (i % 100), "daily": 500 + i },
        "capacity": 100 + (i % 500),
        "status": "open"
    });
}
