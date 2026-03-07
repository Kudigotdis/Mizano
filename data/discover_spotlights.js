window.MIZANO_DATA = window.MIZANO_DATA || {};
window.MIZANO_DATA.discover = [
    {
        "spotlight_id": "DSC-001",
        "type": "mentor",
        "featured": true,
        "title": "Meet Coach Reatlegile — Gaborone's Favourite Chess Tutor",
        "subtitle": "200+ youth coached since 2019",
        "description": "Started free chess clubs in Block 3 and Tlokweng. Now coaches the national junior team. Saturday sessions open to all.",
        "cta_label": "Book a Free Trial",
        "cta_whatsapp": "https://wa.me/26774567890?text=Mizano%20Spotlight%20—%20Chess%20Trial",
        "image_hint": "coach_chess_block3",
        "location_display": "Gaborone · Block 3",
        "week_of": "2026-03-02",
        "tags": ["chess", "youth", "coaching", "gaborone"],
        "linked_lesson_id": "LES-GAB-002"
    }
];
for (let i = 1; i < 40; i++) {
    const types = ["mentor", "event", "venue", "team", "deal"];
    const locs = ["Gaborone", "Francistown", "Maun", "Jwaneng", "Orapa", "Sowa"];
    const type = types[i % types.length];
    const loc = locs[i % locs.length];
    window.MIZANO_DATA.discover.push({
        "spotlight_id": `DSC-${(i + 1).toString().padStart(3, '0')}`,
        "type": type,
        "featured": i < 10,
        "title": `Spotlight ${i + 1}: ${type} in ${loc}`,
        "subtitle": `Discovering the best of ${loc}`,
        "description": `This ${type} is making waves in ${loc}. Join the community and experience it today.`,
        "cta_label": "Learn More",
        "cta_whatsapp": `https://wa.me/26774000${i}?text=Spotlight%20Inquiry`,
        "image_hint": `${type}_${loc.toLowerCase()}`,
        "location_display": `${loc} · Center`,
        "week_of": "2026-03-09",
        "tags": [type, loc.toLowerCase()]
    });
}
