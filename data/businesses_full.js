window.MIZANO_DATA = window.MIZANO_DATA || {};
window.MIZANO_DATA.businesses = [
    {
        "local_id": 4001,
        "business_id": "gab-west-pharmacy-01",
        "name": "Gaborone West Community Pharmacy",
        "category": "clinic",
        "subcategory": "Pharmacy",
        "tagline": "Your health, our priority",
        "verified": true,
        "location": "Gaborone · G-West",
        "address": "Plot 1234, G-West, Gaborone",
        "whatsapp": "+2673900001",
        "operating_hours": "Mon–Sat 08:00–20:00",
        "services": ["Prescription medicine", "OTC drugs"],
        "price_range": "P20–P500",
        "rating": 4.5,
        "reviews_count": 67
    }
];
for (let i = 1; i < 150; i++) {
    const cats = ["gym", "clinic", "shop", "academy", "nutrition", "photography"];
    const locs = ["Gaborone", "Francistown", "Maun", "Kasane", "Serowe", "Lobatse", "Mahalapye"];
    const cat = cats[i % cats.length];
    const loc = locs[i % locs.length];
    window.MIZANO_DATA.businesses.push({
        "local_id": 4001 + i,
        "business_id": `biz-${i}`,
        "name": `${loc} ${cat} ${i}`,
        "category": cat,
        "subcategory": `${cat} Services`,
        "tagline": `Best ${cat} in ${loc}`,
        "verified": i % 3 === 0,
        "location": `${loc} · Center`,
        "address": `Plot ${1000 + i}, ${loc}`,
        "whatsapp": `+26771000${i}`,
        "operating_hours": "08:00–18:00",
        "services": [`${cat} service A`, `${cat} service B`],
        "price_range": "P50–P1000",
        "rating": 4.0 + (i % 10) / 10,
        "reviews_count": i * 5
    });
}
