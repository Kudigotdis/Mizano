/**
 * MIZANO TIME SLOTS DATA GENERATOR
 * Generates time slots for each space for the next 90 days
 */

(function () {
    window.MIZANO_DATA = window.MIZANO_DATA || {};

    // Wait for spaces to load
    const generateTimeSlots = () => {
        const spaces = window.MIZANO_DATA.spaces || [];
        if (spaces.length === 0) {
            setTimeout(generateTimeSlots, 200);
            return;
        }

        const slots = [];
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 90); // Next 90 days

        // Operating hours per space type
        const getHours = (type) => {
            if (type === 'outdoor_field' || type === 'outdoor_court' || type === 'stadium') {
                return { start: 8, end: 18 }; // 8am-6pm
            }
            if (type === 'pool') {
                return { start: 6, end: 20 }; // 6am-8pm
            }
            if (type === 'gym') {
                return { start: 5, end: 22 }; // 5am-10pm
            }
            return { start: 8, end: 22 }; // indoor halls: 8am-10pm
        };

        spaces.forEach(space => {
            const hours = getHours(space.type);

            for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                const dateStr = d.toISOString().split('T')[0];

                // Generate 2-hour slots
                for (let hour = hours.start; hour < hours.end; hour += 2) {
                    const startTime = new Date(d);
                    startTime.setHours(hour, 0, 0, 0);
                    const endTime = new Date(d);
                    endTime.setHours(hour + 2, 0, 0, 0);

                    // Randomly book about 20% of slots to simulate real usage
                    const isBooked = Math.random() < 0.2;

                    slots.push({
                        slot_id: `slot_${space.space_id}_${dateStr}_${hour}`,
                        space_id: space.space_id,
                        venue_id: space.venue_id,
                        start_time: startTime.toISOString(),
                        end_time: endTime.toISOString(),
                        is_booked: isBooked,
                        recurring: false
                    });
                }
            }
        });

        window.MIZANO_DATA.time_slots = slots;
        console.log(`✅ Generated ${slots.length} time slots`);
    };

    generateTimeSlots();
})();
