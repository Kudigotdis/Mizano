/**
 * MIZANO TRACKER STORAGE WRAPPER
 * Interfaces with window.mizanoStorage for goals and activity summaries.
 */

class TrackerStorageWrapper {
    constructor() {
        this.storage = window.mizanoStorage;
    }

    async addGoal(goal) {
        return this.storage.saveEntity('goals', goal);
    }

    async getGoals(userId = 'current_user') {
        const uid = userId === 'current_user' ? await window.MizanoAuth.getCurrentUserId() : userId;
        return this.storage.getEntitiesByUser('goals', uid);
    }

    async deleteGoal(goalId) {
        // storage doesn't have a deleteEntity yet, but we can add one or use a status flag.
        // For now, let's assume we update status to 'deleted'.
        return this.storage.updateEntity('goals', goalId, { status: 'deleted' });
    }

    async addEntry(entry) {
        // Daily activity summary update logic will go here
        return this.storage.saveEntity('tracker_entries', entry);
    }

    async getEntries(userId = 'current_user', limit = 50) {
        const uid = userId === 'current_user' ? await window.MizanoAuth.getCurrentUserId() : userId;
        return this.storage.getEntitiesByUser('tracker_entries', uid);
    }

    async addUserGoal(goal) {
        return this.addGoal(goal);
    }

    async addNote(note) {
        return this.addEntry(note);
    }
}

// Global Singleton
window.MizanoTrackerStorage = new TrackerStorageWrapper();
window.MizanoGoalStorage = window.MizanoTrackerStorage; // Alias for compatibility
