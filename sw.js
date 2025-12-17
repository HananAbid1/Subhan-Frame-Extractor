const CACHE_NAME = 'subhan-tool-v3-tabs'; // I changed the name so it MUST update
const urlsToCache = [
  './',
  './index.html',
  './profile.jpg'
];

self.addEventListener('install', function(event) {
  self.skipWaiting(); // THIS IS NEW: It forces the new version to install immediately
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
        return response || fetch(event.request);
      })
  );
});

// THIS IS NEW: It deletes the old cache automatically
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
