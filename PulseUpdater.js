/**
 * MIZANO PULSE UPDATER
 * Handles automatic KPI updates from user actions
 * Offline-first with IndexedDB persistence
 */

class PulseUpdater {
    constructor() {
        this.dbName = 'mizano_pulse';
        this.storeName = 'pulse_stats';
        this.db = null;
        this.syncQueue = [];
    }

    /**
     * Initialize IndexedDB for pulse stats
     */
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                console.log('PulseUpdater: IndexedDB initialized');
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    const store = db.createObjectStore(this.storeName, { keyPath: 'kpi_id' });
                    store.createIndex('sector', 'sector', { unique: false });
                    store.createIndex('sync_status', 'sync_status', { unique: false });
                    console.log('PulseUpdater: Created pulse_stats store');
                }
            };
        });
    }

    /**
     * Load initial pulse data from JSON
     */
    async loadInitialData() {
        try {
            const response = await fetch('./data/databases/pulse_stats.json');
            const data = await response.json();

            // Flatten KPIs for storage
            const kpis = [];
            for (const [sectorKey, sector] of Object.entries(data.sectors)) {
                for (const [catKey, category] of Object.entries(sector.categories)) {
                    for (const [kpiKey, kpi] of Object.entries(category.kpis)) {
                        kpis.push({
                            kpi_id: kpiKey,
                            sector: sectorKey,
                            category: catKey,
                            ...kpi,
                            last_modified: Date.now(),
                            sync_status: 'synced'
                        });
                    }
                }
            }

            // Store in IndexedDB
            const tx = this.db.transaction(this.storeName, 'readwrite');
            const store = tx.objectStore(this.storeName);

            for (const kpi of kpis) {
                await store.put(kpi);
            }

            console.log(`PulseUpdater: Loaded ${kpis.length} KPIs into IndexedDB`);
        } catch (error) {
            console.error('PulseUpdater: Failed to load initial data', error);
        }
    }

    /**
     * Update a specific KPI
     * @param {string} kpi_id - Short-key identifier (e.g., 'nat_gender_ga')
     * @param {number} delta - Change amount (can be negative)
     * @param {object} metadata - Optional context
     */
    async updatePulse(kpi_id, delta, metadata = {}) {
        if (!this.db) {
            console.warn('PulseUpdater: DB not initialized');
            return;
        }

        try {
            const tx = this.db.transaction(this.storeName, 'readwrite');
            const store = tx.objectStore(this.storeName);

            const current = await store.get(kpi_id);
            if (!current) {
                console.warn(`PulseUpdater: KPI ${kpi_id} not found`);
                return;
            }

            const updated = {
                ...current,
                value: Math.max(0, current.value + delta), // Prevent negative values
                last_modified: Date.now(),
                sync_status: 'pending',
                metadata: { ...current.metadata, ...metadata }
            };

            await store.put(updated);
            this.queueSync(kpi_id, delta);

            console.log(`PulseUpdater: ${kpi_id} updated by ${delta} (new value: ${updated.value})`);
        } catch (error) {
            console.error(`PulseUpdater: Failed to update ${kpi_id}`, error);
        }
    }

    /**
     * Queue KPI for sync
     */
    queueSync(kpi_id, delta) {
        this.syncQueue.push({
            kpi_id,
            delta,
            timestamp: Date.now()
        });

        // Store in localStorage as backup
        localStorage.setItem('pulse_sync_queue', JSON.stringify(this.syncQueue));
    }

    /**
     * Get all KPIs for a sector
     */
    async getSectorKPIs(sectorKey) {
        if (!this.db) return [];

        const tx = this.db.transaction(this.storeName, 'readonly');
        const store = tx.objectStore(this.storeName);
        const index = store.index('sector');

        return new Promise((resolve, reject) => {
            const request = index.getAll(sectorKey);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Get pending sync items
     */
    async getPendingSync() {
        if (!this.db) return [];

        const tx = this.db.transaction(this.storeName, 'readonly');
        const store = tx.objectStore(this.storeName);
        const index = store.index('sync_status');

        return new Promise((resolve, reject) => {
            const request = index.getAll('pending');
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Calculate overall pulse score (0-100)
     */
    async calculateOverallScore() {
        const sectors = ['national', 'schools', 'corporates', 'businesses'];
        let totalScore = 0;

        for (const sector of sectors) {
            const kpis = await this.getSectorKPIs(sector);
            const sectorScore = kpis.reduce((sum, kpi) => {
                const progress = kpi.target > 0 ? (kpi.value / kpi.target) * 100 : 0;
                return sum + Math.min(100, progress);
            }, 0);
            totalScore += sectorScore / kpis.length;
        }

        return Math.round(totalScore / sectors.length);
    }

    /**
     * Start the 15-minute sync scheduler
     * Drains the sync_queue from StorageManager when online.
     */
    startSyncScheduler() {
        console.log('PulseUpdater: 15-minute sync scheduler started.');
        
        // Run immediately after 5 seconds, then every 15 minutes (900,000 ms)
        setTimeout(() => this._processSyncQueue(), 5000);
        setInterval(() => this._processSyncQueue(), 15 * 60 * 1000);

        // Also attempt sync when the device comes back online
        window.addEventListener('online', () => {
            console.log('PulseUpdater: Network restored. Triggering sync...');
            this._processSyncQueue();
        });
    }

    async _processSyncQueue() {
        if (!navigator.onLine) return; // Skip if offline

        try {
            // Priority 1: StorageManager general entity sync queue
            if (window.mizanoStorage && window.mizanoStorage.getPendingSyncQueue) {
                const pendingOps = await window.mizanoStorage.getPendingSyncQueue();
                if (pendingOps && pendingOps.length > 0) {
                    console.log(`PulseUpdater: Found ${pendingOps.length} pending operations in StorageManager. Mock syncing...`);
                    for (const op of pendingOps) {
                        // Stub for API call: await fetch('/api/sync', { method: 'POST', body: JSON.stringify(op) })
                        await window.mizanoStorage.resolveSyncQueueEntry(op.local_id, 'synced');
                    }
                    console.log('PulseUpdater: StorageManager sync complete.');
                }
            }

            // Priority 2: Pulse KPI sync queue
            const kpiItems = await this.getPendingSync();
            if (kpiItems && kpiItems.length > 0) {
                console.log(`PulseUpdater: Found ${kpiItems.length} pending KPI updates. Mock syncing...`);
                // Stub for API batch push
                const tx = this.db.transaction(this.storeName, 'readwrite');
                const store = tx.objectStore(this.storeName);
                for (const item of kpiItems) {
                    item.sync_status = 'synced';
                    await store.put(item);
                }
                console.log('PulseUpdater: KPI sync complete.');
            }

        } catch (err) {
            console.error('PulseUpdater: Sync cycle failed', err);
        }
    }
}

// Global instance
window.pulseUpdater = new PulseUpdater();

// Auto-initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        await window.pulseUpdater.init();
        await window.pulseUpdater.loadInitialData();
        window.pulseUpdater.startSyncScheduler();
    });
} else {
    window.pulseUpdater.init().then(() => {
        window.pulseUpdater.loadInitialData();
        window.pulseUpdater.startSyncScheduler();
    });
}
