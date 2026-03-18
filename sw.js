/**
 * MIZANO SERVICE WORKER
 * Basic offline support and asset caching.
 */

const CACHE_NAME = 'mizano-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './index.css',
  './shell.js',
  './DataManager.js',
  './CardRenderer.js',
  './images/logo_blue.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
