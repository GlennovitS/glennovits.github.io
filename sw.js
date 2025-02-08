const CACHE_NAME = 'pwa-cache-v1';
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    'https://source.unsplash.com/800x600/?nature' // Cache the image
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});