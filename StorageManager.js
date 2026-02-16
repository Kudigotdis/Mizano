/**
 * MIZANO STORAGE MANAGER
 * Absolute Law: TECHNICAL_STACK_AND_APK_PIPELINE.md Rule 19
 * WebView-safe persistent storage wrapper for offline survival.
 */

class StorageManager {
    constructor(prefix = 'mizano_') {
        this.prefix = prefix;
    }

    /**
     * Saves data to localStorage with fail-safe JSON serialization.
     */
    save(key, data) {
        try {
            const serializedData = JSON.stringify(data);
            localStorage.setItem(this.prefix + key, serializedData);
            return true;
        } catch (error) {
            console.error(`StorageManager: Failed to save ${key}`, error);
            // Handle QuotaExceededError or other storage failures
            return false;
        }
    }

    /**
     * Loads and parses data from localStorage.
     */
    load(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(this.prefix + key);
            if (item === null) return defaultValue;
            return JSON.parse(item);
        } catch (error) {
            console.error(`StorageManager: Failed to load ${key}`, error);
            return defaultValue;
        }
    }

    /**
     * Removes a specific key from storage.
     */
    remove(key) {
        localStorage.removeItem(this.prefix + key);
    }

    /**
     * Clears all Mizano-prefixed data.
     */
    clearAll() {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(this.prefix)) {
                localStorage.removeItem(key);
            }
        });
    }

    /**
     * Specific helper for persistent DB caching.
     */
    cacheDatabase(entity, data) {
        return this.save(`db_${entity}`, {
            timestamp: Date.now(),
            payload: data
        });
    }

    /**
     * Retrieves cached DB if it hasn't expired.
     */
    getCachedDatabase(entity, maxAgeMs = null) {
        const cached = this.load(`db_${entity}`);
        if (!cached) return null;

        if (maxAgeMs && (Date.now() - cached.timestamp > maxAgeMs)) {
            this.remove(`db_${entity}`);
            return null;
        }

        return cached.payload;
    }

    /**
     * PERSISTENCE EXTENSIONS (RULE 7.4)
     */

    // Filter Persistence
    saveFilters(filters) {
        return this.save('filters', filters);
    }

    loadFilters() {
        return this.load('filters', null);
    }

    // RSVP Persistence
    saveRSVP(activityId, status) {
        const rsvps = this.load('rsvps', {});
        rsvps[activityId] = status;
        return this.save('rsvps', rsvps);
    }

    loadRSVPs() {
        return this.load('rsvps', {});
    }

    // Scroll Position Persistence
    saveScroll(panelIndex, y) {
        const positions = this.load('scroll_positions', {});
        positions[panelIndex] = y;
        return this.save('scroll_positions', positions);
    }

    loadScroll(panelIndex) {
        const positions = this.load('scroll_positions', {});
        return positions[panelIndex] || 0;
    }

    /**
     * Migration Logic: Check for version mismatch or legacy data structures.
     */
    checkMigration() {
        const version = this.load('version', '1.0');
        if (version === '1.0') {
            console.log('StorageManager: Running migration to 1.1...');
            // Future migration logic here
            this.save('version', '1.1');
        }
    }

    /**
     * RESERVATION MANAGEMENT (Venue Booking System)
     */

    // Save a new reservation
    saveReservation(reservation) {
        const reservations = this.load('reservations', []);
        reservations.push(reservation);
        return this.save('reservations', reservations);
    }

    // Update an existing reservation
    updateReservation(reservationId, updates) {
        const reservations = this.load('reservations', []);
        const idx = reservations.findIndex(r => r.reservation_id === reservationId);
        if (idx !== -1) {
            reservations[idx] = { ...reservations[idx], ...updates, last_modified: Date.now() };
            return this.save('reservations', reservations);
        }
        return false;
    }

    // Delete a reservation
    deleteReservation(reservationId) {
        const reservations = this.load('reservations', []).filter(r => r.reservation_id !== reservationId);
        return this.save('reservations', reservations);
    }

    // Get all reservations for a specific user
    getUserReservations(userId) {
        return this.load('reservations', []).filter(r => r.user_id === userId);
    }

    /**
     * WAITLIST MANAGEMENT
     */

    saveWaitlistEntry(entry) {
        const waitlists = this.load('waitlists', []);
        waitlists.push(entry);
        return this.save('waitlists', waitlists);
    }

    getWaitlistForSlot(slotId) {
        return this.load('waitlists', []).filter(w => w.slot_id === slotId);
    }

    getUserWaitlists(userId) {
        return this.load('waitlists', []).filter(w => w.user_id === userId);
    }

    removeFromWaitlist(userId, slotId) {
        const waitlists = this.load('waitlists', []).filter(w => !(w.user_id === userId && w.slot_id === slotId));
        return this.save('waitlists', waitlists);
    }
}

// Global Singleton for utility access
window.mizanoStorage = new StorageManager();
window.mizanoStorage.checkMigration();
