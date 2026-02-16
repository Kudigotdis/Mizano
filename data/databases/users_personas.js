window.MIZANO_DATA = window.MIZANO_DATA || {};
window.MIZANO_DATA.users_personas = [
    {
        "uid": "persona_student_01",
        "name": "Thabo Mokwena",
        "profile_type": "Student",
        "village_town": "Gaborone",
        "role": "Student",
        "school_id": "sch_1", // Maru-a-Pula (from generated data assumption)
        "team_id": "team_lov1", // Lions of Village 1 (Example)
        "gender": "MALE",
        "ethnicity": "AFRICAN",
        "age": 16,
        "borrow_score": 4.8,
        "matches_played": 12,
        "guardian_id": "persona_guardian_01",
        "academic_alert": false,
        "medical_info": "Asthma (Device Only)",
        "whatsapp_number": "+26772123456"
    },
    {
        "uid": "persona_guardian_01",
        "name": "Mma Mokwena",
        "profile_type": "Guardian",
        "village_town": "Gaborone",
        "role": "Parent",
        "linked_minors": ["persona_student_01"],
        "whatsapp_number": "+26771987654",
        "borrow_score": 5.0
    },
    {
        "uid": "persona_teacher_01",
        "name": "Mr. Dube",
        "profile_type": "Teacher",
        "village_town": "Gaborone",
        "role": "Teacher/Coach",
        "school_id": "sch_1",
        "subjects": ["Math", "Physical Education"],
        "teams_coached": ["team_lov1"],
        "whatsapp_number": "+26773555123"
    },
    {
        "uid": "persona_coach_01",
        "name": "Coach Rra Sibanda",
        "profile_type": "Creator",
        "village_town": "Molepolole",
        "role": "Community Coach",
        "specialty": "Soccer",
        "certifications": ["BFA Level 1"],
        "whatsapp_number": "+26774112233",
        "matches_organized": 45
    }
];
