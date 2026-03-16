window.MIZANO_DATA = window.MIZANO_DATA || {};
window.MIZANO_DATA.paphani_profile = {
    "profileID": "BW-GAB-PAPHANI-01",
    "uid": "BW-GAB-PAPHANI-01",
    "name": "Paphani Masalila",
    "fullName": "Paphani Masalila",
    "display_name": "Paphani Masalila",
    "role": "Creator",
    "capabilities": ["Player", "Creator", "Guardian"],
    "location": "Gaborone · Madimo Village",
    "gender": "Male",
    "age": 39,
    "villageTownCity": "Gaborone",
    "areaNeighborhood": "Madimo Village",
    "whatsapp": "+26771234455",
    "whatsappNumber": "+26771234455",
    "rating": 5.0,
    "verified": true,
    "interests": ["Soccer", "Coaching", "Community Development"],
    "managed_teams": ["GC009"], // Madimo FC
    "player_files": [
        {
            "id": "PF-PAPHANI-01",
            "sport": "Soccer",
            "team": "Madimo FC",
            "position": "Coach / Manager"
        }
    ]
};

// Ensure he is the primary demo profile by unshifting to the top of profiles list
window.MIZANO_DATA.profiles = window.MIZANO_DATA.profiles || [];
const existingIdx = window.MIZANO_DATA.profiles.findIndex(p => p.uid === "BW-GAB-PAPHANI-01" || p.profileID === "BW-GAB-PAPHANI-01");
if (existingIdx !== -1) {
    window.MIZANO_DATA.profiles.splice(existingIdx, 1);
}
window.MIZANO_DATA.profiles.unshift(window.MIZANO_DATA.paphani_profile);

// Set as current user for the demo
window.localStorage.setItem('currentUser', "BW-GAB-PAPHANI-01");

