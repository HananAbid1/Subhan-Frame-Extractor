// Simple Service Worker for PWA
const CACHE_NAME = 'subhan-tool-v1.1';
const urlsToCache = [
  './',
  './index.html',
  './profile.jpg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cache or fetch from network
        return response || fetch(event.request);
      })
  );
});
