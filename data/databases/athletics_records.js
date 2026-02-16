window.MIZANO_DATA = window.MIZANO_DATA || {};
window.MIZANO_DATA.athletics_records = [
    // 100m Sprints
    {
        id: "rec_001",
        athlete_id: "usr_athlete_01",
        athlete_name: "Kabo Motlhabani",
        school_id: "sch_1",
        school_name: "ABM University College",
        event_id: "100m",
        value: 10.45, // Seconds
        unit: "s",
        age_group: "Open",
        gender: "Male",
        date: "2025-05-12",
        verified: true,
        location: { neighborhood: "Block 8", city: "Gaborone", region: "South East" }
    },
    {
        id: "rec_002",
        athlete_id: "usr_athlete_02",
        athlete_name: "Amantle Montsho Jr.",
        school_id: "sch_82",
        school_name: "Botlhale International",
        event_id: "400m",
        value: 49.32,
        unit: "s",
        age_group: "U17",
        gender: "Female",
        date: "2025-06-01",
        verified: true,
        location: { neighborhood: "Block 5", city: "Gaborone", region: "South East" }
    },
    {
        id: "rec_003",
        athlete_id: "usr_athlete_03",
        athlete_name: "Letsile Tebogo II",
        school_id: "sch_530",
        school_name: "Matshwane College",
        event_id: "200m",
        value: 19.99,
        unit: "s",
        age_group: "Open",
        gender: "Male",
        date: "2025-07-20",
        verified: true,
        location: { neighborhood: "Sedie", city: "Maun", region: "North West" }
    },
    // Mock Data for "My School" Context (Teacher Testing)
    {
        id: "rec_004",
        athlete_id: "usr_student_01",
        athlete_name: "Thabo Setlalekgosi",
        school_id: "sch_994", // Valley Academy
        school_name: "Valley Academy",
        event_id: "100m",
        value: 11.20,
        unit: "s",
        age_group: "U15",
        gender: "Male",
        date: "2025-08-10",
        verified: false, // Teacher submitted, pending official ver
        location: { neighborhood: "Woodhall", city: "Lobatse", region: "South East" }
    }
];
