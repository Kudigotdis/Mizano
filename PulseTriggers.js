/**
 * MIZANO PULSE TRIGGERS
 * Automatic KPI updates from user actions
 * Maps all platform entities to relevant KPIs
 */

class PulseTriggers {
    constructor() {
        this.pulseUpdater = window.pulseUpdater;
    }

    /**
     * NATIONAL ASSOCIATION TRIGGERS
     */

    // When user registers or updates profile
    onUserRegistration(user) {
        // Demographics - Gender parity
        const district = this.getDistrictCode(user.location);
        if (user.gender === 'Male' || user.gender === 'Female') {
            this.pulseUpdater.updatePulse(`nat_gender_${district}`, 1);
        }

        // Age distribution
        const ageGroup = this.getAgeGroup(user.age);
        this.pulseUpdater.updatePulse(`nat_age_${ageGroup}`, 1);

        // Geographic coverage
        this.pulseUpdater.updatePulse('nat_geo_coverage', 0.1);
    }

    // When user joins a team
    onTeamJoin(userId, teamId, team) {
        // Elite performance tracking
        if (team.category === 'Elite' || team.division === 'Premier') {
            this.pulseUpdater.updatePulse('nat_elite_top1', 1);
        }

        // Club density
        const isUrban = this.isUrbanArea(team.location);
        this.pulseUpdater.updatePulse(isUrban ? 'nat_geo_urban' : 'nat_geo_rural', 1);
    }

    // When match is completed
    onMatchComplete(match) {
        // Venue utilization
        this.pulseUpdater.updatePulse('nat_venue_util', 1);
        this.pulseUpdater.updatePulse('nat_venue_time', match.duration || 90);

        // Scout engagement (if scouts present)
        if (match.scouts && match.scouts.length > 0) {
            this.pulseUpdater.updatePulse('nat_scout_active', match.scouts.length);
            this.pulseUpdater.updatePulse('nat_scout_leads', match.scouts.length * 2);
        }
    }

    // When coach certification is completed
    onCoachCertification(coach, level) {
        this.pulseUpdater.updatePulse('nat_coach_cert', 1);
        this.pulseUpdater.updatePulse(`nat_edu_l${level}`, 1);
        this.pulseUpdater.updatePulse('nat_coach_active', 1);
    }

    // When medical clearance is submitted
    onMedicalClearance(userId, status) {
        if (status === 'approved') {
            this.pulseUpdater.updatePulse('nat_med_clear', 1);
        } else if (status === 'pending') {
            this.pulseUpdater.updatePulse('nat_med_pending', 1);
        }
    }

    /**
     * SCHOOL TRIGGERS
     */

    // When inter-house points are awarded
    onHousePoints(house, points) {
        const houseKey = house.toLowerCase();
        this.pulseUpdater.updatePulse(`sch_comp_${houseKey}`, points);
    }

    // When student attendance is recorded
    onStudentAttendance(studentId, isAthlete, present) {
        if (present) {
            if (isAthlete) {
                this.pulseUpdater.updatePulse('sch_attend_athlete', 1);
            } else {
                this.pulseUpdater.updatePulse('sch_attend_general', 1);
            }
        }
    }

    // When guardian handshake is completed
    onGuardianHandshake(studentId, status) {
        if (status === 'verified') {
            this.pulseUpdater.updatePulse('sch_safe_handshake', 1);
            this.pulseUpdater.updatePulse('sch_safe_verified', 1);
        }
    }

    // When village waiver is used
    onVillageWaiver(studentId) {
        this.pulseUpdater.updatePulse('sch_safe_waiver', 1);
        this.pulseUpdater.updatePulse('sch_safe_rural', 1);
    }

    // When incident is reported
    onIncidentReport(incident) {
        this.pulseUpdater.updatePulse('sch_incident_total', 1);
        if (incident.severity === 'minor') {
            this.pulseUpdater.updatePulse('sch_incident_minor', 1);
        } else {
            this.pulseUpdater.updatePulse('sch_incident_major', 1);
        }
    }

    // When student joins new activity
    onStudentActivity(studentId, activityType) {
        this.pulseUpdater.updatePulse('sch_growth_diversity', 1);
        if (activityType === 'sport') {
            this.pulseUpdater.updatePulse('sch_growth_sports', 1);
        } else {
            this.pulseUpdater.updatePulse('sch_growth_hobbies', 1);
        }
    }

    // When lesson is completed
    onLessonComplete(studentId, lessonType) {
        const typeMap = { music: 'music', art: 'art', coding: 'coding' };
        const key = typeMap[lessonType] || 'avg';
        this.pulseUpdater.updatePulse(`sch_lesson_${key}`, 1);
    }

    // When equipment is borrowed
    onEquipmentBorrow(itemId, studentId) {
        this.pulseUpdater.updatePulse('sch_equip_borrowed', 1);
    }

    // When equipment is damaged
    onEquipmentDamage(itemId) {
        this.pulseUpdater.updatePulse('sch_equip_damaged', 1);
    }

    // When uniform is issued
    onUniformIssue(studentId, correctSize) {
        this.pulseUpdater.updatePulse('sch_uniform_avail', 1);
        if (correctSize) {
            this.pulseUpdater.updatePulse('sch_uniform_size', 1);
        }
    }

    /**
     * CORPORATE TRIGGERS
     */

    // When employee logs activity
    onEmployeeActivity(employeeId, activityType) {
        this.pulseUpdater.updatePulse('corp_well_active', 1);
        this.pulseUpdater.updatePulse('corp_points_total', 10);
    }

    // When team-building event is created
    onTeamBuildingEvent(event, participants) {
        this.pulseUpdater.updatePulse('corp_team_events', 1);
        this.pulseUpdater.updatePulse('corp_team_part', participants.length);
    }

    // When employee logs steps
    onStepsLogged(employeeId, steps) {
        this.pulseUpdater.updatePulse('corp_steps_avg', steps / 100); // Normalize
        this.pulseUpdater.updatePulse('corp_steps_lead', 1);
    }

    // When game is sponsored
    onGameSponsored(corporateId, gameId) {
        this.pulseUpdater.updatePulse('corp_roi_games', 1);
        this.pulseUpdater.updatePulse('corp_roi_views', 100); // Estimated impressions
    }

    // When fan stream is viewed
    onStreamView(corporateId, duration) {
        this.pulseUpdater.updatePulse('corp_stream_views', 1);
        this.pulseUpdater.updatePulse('corp_stream_time', duration);
    }

    // When corporate profile is clicked
    onCorporateProfileClick(corporateId) {
        this.pulseUpdater.updatePulse('corp_click_profile', 1);
    }

    // When corporate website is clicked
    onCorporateWebsiteClick(corporateId) {
        this.pulseUpdater.updatePulse('corp_click_website', 1);
    }

    // When CSR donation is made
    onCSRDonation(corporateId, amount, category) {
        this.pulseUpdater.updatePulse('corp_csr_pula', amount);
        if (category === 'grassroots') {
            this.pulseUpdater.updatePulse('corp_csr_grass', amount);
        } else if (category === 'equipment') {
            this.pulseUpdater.updatePulse('corp_csr_equip', amount);
        }
    }

    // When community hours are logged
    onCommunityHours(employeeId, hours, type) {
        this.pulseUpdater.updatePulse('corp_hours_total', hours);
        if (type === 'coaching') {
            this.pulseUpdater.updatePulse('corp_hours_coach', hours);
        } else if (type === 'mentorship') {
            this.pulseUpdater.updatePulse('corp_hours_mentor', hours);
        }
    }

    // When brand sentiment is recorded
    onBrandSentiment(corporateId, rating) {
        this.pulseUpdater.updatePulse('corp_brand_score', rating / 10); // Normalize to 0-5
        if (rating >= 4) {
            this.pulseUpdater.updatePulse('corp_brand_positive', 1);
        }
    }

    /**
     * BUSINESS/SMME TRIGGERS
     */

    // When WhatsApp deep-link is clicked
    onWhatsAppClick(businessId) {
        this.pulseUpdater.updatePulse('biz_vendor_clicks', 1);
        this.pulseUpdater.updatePulse('biz_vendor_leads', 1);
    }

    // When equipment search is performed
    onEquipmentSearch(category) {
        const categoryMap = {
            equipment: 'equip',
            apparel: 'apparel',
            nutrition: 'nutrition',
            wellness: 'wellness',
            tech: 'tech'
        };
        const key = categoryMap[category] || 'equip';
        this.pulseUpdater.updatePulse(`biz_search_${key}`, 1);
    }

    // When service is rated
    onServiceRating(businessId, serviceType, rating) {
        const typeMap = { physio: 'physio', trainer: 'trainer', barber: 'barber' };
        const key = typeMap[serviceType] || 'avg';
        this.pulseUpdater.updatePulse(`biz_service_${key}`, rating / 10);
        this.pulseUpdater.updatePulse('biz_service_reviews', 1);
    }

    // When coupon is redeemed
    onCouponRedeem(businessId, value) {
        this.pulseUpdater.updatePulse('biz_econ_coupon', 1);
        this.pulseUpdater.updatePulse('biz_econ_discount', value);
    }

    // When transaction is completed
    onTransaction(businessId, amount, category) {
        this.pulseUpdater.updatePulse('biz_econ_volume', amount);
        if (category === 'rental') {
            this.pulseUpdater.updatePulse('biz_econ_rental', amount);
        } else if (category === 'sales') {
            this.pulseUpdater.updatePulse('biz_econ_sales', amount);
        }
    }

    // When shopping occurs during peak hours
    onShoppingTime(hour) {
        if (hour >= 6 && hour < 12) {
            this.pulseUpdater.updatePulse('biz_peak_morning', 1);
        } else if (hour >= 12 && hour < 18) {
            this.pulseUpdater.updatePulse('biz_peak_afternoon', 1);
        } else if (hour >= 18 && hour < 22) {
            this.pulseUpdater.updatePulse('biz_peak_evening', 1);
        }
    }

    // When kombi/bus is hired
    onTransportHire(businessId, distance, teams) {
        this.pulseUpdater.updatePulse('biz_infra_kombi', 1);
        this.pulseUpdater.updatePulse('biz_infra_distance', distance);
        this.pulseUpdater.updatePulse('biz_infra_teams', teams);
    }

    // When delivery is completed
    onDeliveryComplete(businessId, onTime, damaged) {
        if (onTime) {
            this.pulseUpdater.updatePulse('biz_supply_ontime', 1);
        }
        if (damaged) {
            this.pulseUpdater.updatePulse('biz_supply_damage', 1);
        }
    }

    // When new vendor registers
    onVendorRegistration(businessId, village) {
        this.pulseUpdater.updatePulse('biz_growth_new', 1);
        this.pulseUpdater.updatePulse('biz_growth_village', 1);
    }

    // When small business gets impression
    onSmallBusinessImpression(businessId, isSmall) {
        if (isSmall) {
            this.pulseUpdater.updatePulse('biz_vis_small', 1);
        } else {
            this.pulseUpdater.updatePulse('biz_vis_large', 1);
        }
    }

    /**
     * HELPER METHODS
     */

    getDistrictCode(location) {
        const districts = {
            'Gaborone': 'ga',
            'Francistown': 'fr',
            'Maun': 'mn',
            'Kasane': 'ks'
        };
        return districts[location] || 'ot';
    }

    getAgeGroup(age) {
        if (age >= 6 && age <= 12) return 'grass';
        if (age >= 13 && age <= 17) return 'jr';
        if (age >= 18 && age <= 25) return 'elite';
        if (age >= 26 && age <= 39) return 'sr';
        return 'vet';
    }

    isUrbanArea(location) {
        const urbanAreas = ['Gaborone', 'Francistown', 'Maun', 'Kasane'];
        return urbanAreas.includes(location);
    }
}

// Global instance
window.pulseTriggers = new PulseTriggers();

/**
 * INTEGRATION HOOKS
 * Add these calls to existing event handlers
 */

// Example integration points (add to existing code):
/*
// In user registration flow:
window.pulseTriggers.onUserRegistration(newUser);

// In team join flow:
window.pulseTriggers.onTeamJoin(userId, teamId, team);

// In match completion:
window.pulseTriggers.onMatchComplete(matchData);

// In shopping cart:
window.pulseTriggers.onTransaction(businessId, amount, 'sales');

// In WhatsApp click handler:
window.pulseTriggers.onWhatsAppClick(businessId);

// In attendance tracking:
window.pulseTriggers.onStudentAttendance(studentId, isAthlete, true);

// In equipment management:
window.pulseTriggers.onEquipmentBorrow(itemId, studentId);

// In corporate wellness:
window.pulseTriggers.onEmployeeActivity(employeeId, 'running');
*/
