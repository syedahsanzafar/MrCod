const CACHE_NAME = 'mrcod-pos-v5';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './assets/logo.png',
    './mrcod_db.json',
    'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap',
    'https://unpkg.com/lucide@latest',
    'https://cdn.jsdelivr.net/npm/chart.js'
];

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching essential assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(event.request).catch(() => {
                // Only return the offline page for navigation requests (HTML pages)
                if (event.request.mode === 'navigate') {
                    return caches.match('./index.html');
                }
                // For images, scripts, etc., just fail if not in cache/network
                return null;
            });
        })
    );
});
