/**
 * MIZANO DATA PATCH: TBA Activity Locations
 * Fixes ~20 records in activities.js that have "TBA" or "Multi-hub" locations.
 */
(function patchTBALocations() {
    if (!window.MIZANO_DATA || !window.MIZANO_DATA.activities) {
        console.warn('[Mizano] activities_fix: window.MIZANO_DATA.activities not found');
        return;
    }

    const locationFixes = {
        // Format: "activity_id": { location fields to merge }
        "ORG-DWC-2026": { location_name: "Gaborone · National Stadium", venue_id: "venue_national_stadium", district: "South-East District" },
        "CHO-VKT-2026": { location_name: "Gaborone · Block 3", venue_id: "venue_block3_complex", district: "South-East District" },
        "BTC-CC-2026": { location_name: "Francistown · Monarch", venue_id: "venue_francistown_stadium", district: "North-East District" },
        "DEB-DC-2026": { location_name: "Jwaneng · Sports Complex", venue_id: "venue_jwaneng_sports", district: "Southern District" },
        "KAL-DC-2026": { location_name: "Tsabong · Community Ground", venue_id: "venue_tsabong_ground", district: "Kgalagadi District" },
        "GUA-SH-U16-2026": { location_name: "Gaborone · Broadhurst", venue_id: "venue_broadhurst_complex", district: "South-East District" },
        "FNB-SSF-2026": { location_name: "Gaborone · UB Campus", venue_id: "venue_ub_campus", district: "South-East District" },
        "PRES-CC-2026": { location_name: "Gaborone · National Stadium", venue_id: "venue_national_stadium", district: "South-East District" },
        "GIOC-2026": { location_name: "Gaborone · Multi-venue", venue_id: "venue_national_stadium", district: "South-East District" },
        "MAT-OC-2026": { location_name: "Maun · Sports Complex", venue_id: "venue_maun_sports", district: "North-West District" },
        "FRA-RC-2026": { location_name: "Francistown · Gerald Estates", venue_id: "venue_francistown_stadium", district: "North-East District" },
        "SEL-SC-2026": { location_name: "Selebi-Phikwe · Main Ground", venue_id: "venue_selebi_stadium", district: "Central District" },
        "LOB-LC-2026": { location_name: "Lobatse · Peleng Stadium", venue_id: "venue_lobatse_stadium", district: "Southern District" },
        "MAS-KC-2026": { location_name: "Gaborone · Mascom Park", venue_id: "venue_mascom_park", district: "South-East District" },
        "FNB-CSF-2026": { location_name: "Gaborone · National Stadium", venue_id: "venue_national_stadium", district: "South-East District" },
        "BFA-PRO-2026": { location_name: "Gaborone · National Stadium", venue_id: "venue_national_stadium", district: "South-East District" },
        "BOT-OPEN-2026": { location_name: "Gaborone · UB Campus", venue_id: "venue_ub_campus", district: "South-East District" },
        "BW-CHESS-2026": { location_name: "Gaborone · Block 8", venue_id: "venue_block8_library", district: "South-East District" },
        "KGA-H-2026": { location_name: "Gaborone · Kgale Hill", venue_id: "venue_kgale_trail", district: "South-East District" },
        "CHOBE-R-2026": { location_name: "Kasane · Chobe Waterfront", venue_id: "venue_kasane_boat", district: "North-West District" }
    };

    let patchCount = 0;
    window.MIZANO_DATA.activities = window.MIZANO_DATA.activities.map(function (act) {
        if (locationFixes[act.activity_id]) {
            patchCount++;
            return Object.assign({}, act, locationFixes[act.activity_id]);
        }
        return act;
    });

    console.log(`[Mizano] activities_fix: Applied ${patchCount} location patches`);
})();
