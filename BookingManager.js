/**
 * MIZANO BOOKING MANAGER
 * Handles venue booking logic, availability, and reservations
 */

const BookingManager = {
    /**
     * Get all spaces for a specific venue
     */
    getSpacesForVenue(venueId) {
        return (window.MIZANO_DATA.spaces || []).filter(s => s.venue_id === venueId);
    },

    /**
     * Get available time slots for a space on a specific date
     */
    getAvailableSlots(spaceId, date) {
        const slots = (window.MIZANO_DATA.time_slots || []).filter(s => s.space_id === spaceId);
        return slots.filter(s => !s.is_booked && s.start_time.startsWith(date));
    },

    /**
     * Book a time slot
     */
    async bookSlot(userId, slotId) {
        // Check for Progressive Onboarding Level 4 (Premium/Safety)
        const user = window.authManager?.getCurrentUser();
        if (!user || (user.onboarding_level || 0) < 4) {
            if (window.MizanoProfile) {
                alert('For safety and transaction verification, Level 4 profile data is required for bookings.');
                window.MizanoProfile.renderLevel4(() => {
                    this.bookSlot(userId, slotId); // Retry after onboarding
                });
                return;
            }
        }

        const slot = (window.MIZANO_DATA.time_slots || []).find(s => s.slot_id === slotId);
        if (!slot || slot.is_booked) {
            throw new Error('Slot unavailable');
        }

        const space = (window.MIZANO_DATA.spaces || []).find(s => s.space_id === slot.space_id);
        const duration = (new Date(slot.end_time) - new Date(slot.start_time)) / 3600000; // hours

        const reservation = {
            reservation_id: 'res_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
            user_id: userId,
            slot_id: slotId,
            space_id: slot.space_id,
            venue_id: slot.venue_id,
            total_price: space.price_per_hour * duration,
            status: 'confirmed',
            created_at: new Date().toISOString(),
            last_modified: Date.now(),
            sync_status: 'pending'
        };

        // Mark slot as booked
        slot.is_booked = true;

        // Save reservation
        if (window.mizanoStorage) {
            window.mizanoStorage.saveReservation(reservation);

            // Update cached time_slots
            const slots = window.mizanoStorage.load('time_slots') || window.MIZANO_DATA.time_slots;
            const idx = slots.findIndex(s => s.slot_id === slotId);
            if (idx !== -1) slots[idx].is_booked = true;
            window.mizanoStorage.cacheDatabase('time_slots', slots);
        }

        return reservation;
    },

    /**
     * Cancel a reservation
     */
    async cancelReservation(reservationId) {
        const userId = window.mizanoData?.getCurrentUser()?.profile_id;
        if (!userId) throw new Error('Not logged in');

        const reservations = window.mizanoStorage?.getUserReservations(userId) || [];
        const reservation = reservations.find(r => r.reservation_id === reservationId);
        if (!reservation) throw new Error('Reservation not found');

        // Mark as cancelled
        reservation.status = 'cancelled';

        // Free up the slot
        const slot = (window.MIZANO_DATA.time_slots || []).find(s => s.slot_id === reservation.slot_id);
        if (slot) slot.is_booked = false;

        // Update storage
        window.mizanoStorage.updateReservation(reservationId, { status: 'cancelled' });

        // Update cached slots
        const slots = window.mizanoStorage.load('time_slots') || window.MIZANO_DATA.time_slots;
        const slotIdx = slots.findIndex(s => s.slot_id === reservation.slot_id);
        if (slotIdx !== -1) slots[slotIdx].is_booked = false;
        window.mizanoStorage.cacheDatabase('time_slots', slots);

        // Notify waitlist
        this.notifyWaitlist(reservation.slot_id);
    },

    /**
     * Join waitlist for a booked slot
     */
    async joinWaitlist(userId, slotId) {
        const slot = (window.MIZANO_DATA.time_slots || []).find(s => s.slot_id === slotId);
        if (!slot) throw new Error('Slot not found');

        const waitlist = window.mizanoStorage.getWaitlistForSlot(slotId);
        if (waitlist.some(w => w.user_id === userId)) {
            throw new Error('Already on waitlist for this slot');
        }

        const entry = {
            waitlist_id: 'wait_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
            user_id: userId,
            slot_id: slotId,
            space_id: slot.space_id,
            venue_id: slot.venue_id,
            joined_at: new Date().toISOString()
        };

        window.mizanoStorage.saveWaitlistEntry(entry);
        return entry;
    },

    /**
     * Notify users on waitlist when a slot becomes available
     */
    notifyWaitlist(slotId) {
        const waitlist = window.mizanoStorage.getWaitlistForSlot(slotId);
        if (waitlist.length === 0) return;

        console.log(`Slot ${slotId} is now available. Notifying ${waitlist.length} users...`);

        // In a real app, this would send push notifications.
        // For this simulation, we'll log the notifications and maybe mark them as notified.
        waitlist.forEach(entry => {
            console.log(`[WAITLIST NOTIFICATION] To User ${entry.user_id}: The slot you were waiting for (${slotId}) is now available!`);
        });
    }
};

window.BookingManager = BookingManager;
