window.MIZANO_DATA = window.MIZANO_DATA || {};
window.MIZANO_DATA.profiles = [
    {
        "uid": "USR-BW-GAB-1987",
        "display_name": "Kudzanai Chitate",
        "first_name": "Kudzanai",
        "surname": "Chitate",
        "gender": "Male",
        "age": 38,
        "dob": "1987-04-05",
        "location": "Gaborone",
        "role": "SUPER ADMIN",
        "profile_type": "creator",
        "whatsapp": "+26771001987",
        "interests": ["Chess", "Technology", "Sports Management"],
        "verified": true,
        "rating": 5.0,
        "capabilities": ["SuperAdmin", "Creator", "Guardian"]
    }
];
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
