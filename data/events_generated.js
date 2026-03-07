window.MIZANO_DATA = window.MIZANO_DATA || {};
window.MIZANO_DATA.events = [];
for (let i = 0; i < 100; i++) {
  const cats = ["Tournament", "Workshop", "Festival", "Match"];
  const locs = ["Gaborone", "Francistown", "Maun"];
  const cat = cats[i % cats.length];
  const loc = locs[i % locs.length];
  window.MIZANO_DATA.events.push({
    "event_id": `EVT-GEN-${i}`,
    "title": `${loc} ${cat} Day`,
    "category": cat,
    "start_datetime": `2026-06-${(i % 28) + 1}T10:00:00Z`,
    "location_name": `${loc} Stadium`,
    "fee_pula": (i % 5) * 50,
    "organizer": `Mizano ${loc}`
  });
}