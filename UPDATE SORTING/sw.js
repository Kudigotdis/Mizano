/**
 * MIZANO SERVICE WORKER — sw.js
 * Offline-first PWA caching strategy.
 * Strategy: Cache-First for static assets, Network-First for data files.
 * NEVER caches: user health data, medical records, or session tokens.
 */

const CACHE_NAME = 'mizano-v1.1';
const OFFLINE_PAGE = './index.html';

// Static shell assets — cache immediately on install
const SHELL_ASSETS = [
    './index.html',
    './shell.js',
    './shell.css',
    './AuthManager.js',
    './StorageManager.js',
    './DataManager.js',
    './FilterEngine.js',
    './CardRenderer.js',
    './NavigationController.js',
    './MineRenderer.js',
    './GuardianSafety.js',
    './SuggestionEngine.js',
    './TrackerStorage.js',
    './manifest.json',
    // Core icons (data-light WebP)
    './assets/images/icons/Activities Icon.webp',
    './assets/images/icons/Panels Icon.webp',
    './assets/images/icons/Search Icon.webp',
    './assets/images/icons/Add Icon.webp',
    './assets/images/icons/Menu Hamburger Icon.webp',
    './assets/images/icons/Clock Icon.webp',
    './assets/images/icons/Calender Icon.webp',
];

// ─── INSTALL: Pre-cache shell assets ──────────────────────────────────────────
self.addEventListener('install', (event) => {
    console.log('Mizano SW: Installing v1.1...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // Use individual adds so one 404 doesn't break the whole install
            return Promise.allSettled(
                SHELL_ASSETS.map(url =>
                    cache.add(url).catch(err =>
                        console.warn(`SW: Failed to cache ${url}:`, err)
                    )
                )
            );
        }).then(() => {
            console.log('Mizano SW: Shell assets cached.');
            self.skipWaiting(); // Activate immediately
        })
    );
});

// ─── ACTIVATE: Clean up old caches ────────────────────────────────────────────
self.addEventListener('activate', (event) => {
    console.log('Mizano SW: Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => {
                        console.log('Mizano SW: Deleting old cache —', name);
                        return caches.delete(name);
                    })
            );
        }).then(() => {
            self.clients.claim(); // Take control of all clients immediately
            console.log('Mizano SW: Active and controlling.');
        })
    );
});

// ─── FETCH: Routing strategy ───────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET and cross-origin requests
    if (request.method !== 'GET') return;
    if (url.origin !== self.location.origin) return;

    // NEVER cache: health/medical data paths
    if (url.pathname.includes('medical') || url.pathname.includes('health_records')) {
        event.respondWith(fetch(request));
        return;
    }

    // DATA FILES: Network-first (fresh data when online, fallback to cache)
    if (url.pathname.includes('/data/') || url.pathname.endsWith('.json')) {
        event.respondWith(networkFirst(request));
        return;
    }

    // SHELL ASSETS (JS, CSS, HTML, WebP): Cache-first
    event.respondWith(cacheFirst(request));
});

// ─── STRATEGIES ───────────────────────────────────────────────────────────────

/**
 * Cache-First: Serve from cache, fall back to network and update cache.
 */
async function cacheFirst(request) {
    const cached = await caches.match(request);
    if (cached) return cached;

    try {
        const response = await fetch(request);
        if (response && response.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
        }
        return response;
    } catch (err) {
        // Offline and not in cache — return offline page for navigation requests
        if (request.mode === 'navigate') {
            const offlinePage = await caches.match(OFFLINE_PAGE);
            return offlinePage || new Response('Mizano is offline. Please reconnect.', {
                status: 503,
                headers: { 'Content-Type': 'text/plain' }
            });
        }
        throw err;
    }
}

/**
 * Network-First: Try network first, fall back to cache.
 * Used for data files so users always get fresh data when online.
 */
async function networkFirst(request) {
    try {
        const response = await fetch(request);
        if (response && response.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
        }
        return response;
    } catch (err) {
        const cached = await caches.match(request);
        if (cached) return cached;
        throw err;
    }
}

// ─── BACKGROUND SYNC (Phase 11 — Sync Queue Drain) ────────────────────────────
self.addEventListener('sync', (event) => {
    if (event.tag === 'mizano-sync-queue') {
        console.log('Mizano SW: Background sync triggered — draining sync_queue...');
        // The actual drain logic lives in PulseUpdater.js on the main thread.
        // SW just logs the event — clients handle the real queue processing.
        event.waitUntil(
            self.clients.matchAll().then(clients => {
                clients.forEach(client => {
                    client.postMessage({ type: 'SYNC_QUEUE_TRIGGER' });
                });
            })
        );
    }
});

console.log('Mizano SW: Script loaded.');
