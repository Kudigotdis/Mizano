window.MIZANO_DATA = window.MIZANO_DATA || {};
window.MIZANO_DATA.profiles = [];
for (let i = 0; i < 500; i++) {
    const names = ["Kagiso", "Mpho", "Thabo", "Dineo", "Lesego", "Boitumelo", "Neo", "Kefilwe", "Tshepiso", "Mizano"];
    const surnames = ["Modise", "Tau", "Nkwe", "Sithole", "Dube", "Seretse", "Moagi", "Tshiamo"];
    const locs = ["Gaborone", "Francistown", "Maun", "Selebi Phikwe", "Lobatse", "Serowe", "Palapye", "Kanye"];
    const types = ["player", "creator", "guardian"];

    const name = names[i % names.length];
    const surname = surnames[i % surnames.length];
    const loc = locs[i % locs.length];
    const type = types[i % types.length];

    window.MIZANO_DATA.profiles.push({
        "uid": `USR-BW-${loc.substring(0, 3).toUpperCase()}-${(i + 1000).toString()}`,
        "display_name": `${name} ${surname}`,
        "location": `${loc} · Block ${i % 10}`,
        "role": type,
        "whatsapp": `+2677${(1000000 + i).toString()}`,
        "interests": ["Soccer", "Chess", "Cooking"].slice(0, 1 + (i % 3)),
        "verified": i % 10 === 0,
        "rating": 4.0 + (i % 10) / 10
    });
}
