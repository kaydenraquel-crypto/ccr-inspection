var CACHE_VERSION = 'ccr-inspect-v4';

// Resolve base path from service worker location
// Works for both root deployment and subdirectory (e.g. /ccr-inspection/)
var BASE_PATH = self.registration.scope;

var CACHE_FILES = [
  'index.html',
  'css/main.css',
  'js/equipment-types.js',
  'js/storage.js',
  'js/firebase-config.js',
  'js/cloud-sync.js',
  'js/form-renderer.js',
  'js/logo-data.js',
  'js/pdf-generator.js',
  'js/signature-pad.js',
  'js/app.js',
  'lib/jspdf.umd.min.js',
  'lib/jspdf.plugin.autotable.min.js',
  'Logo.png',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

// Install: precache all app files
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(function(cache) {
      var urls = CACHE_FILES.map(function(file) {
        return BASE_PATH + file;
      });
      return cache.addAll(urls);
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

// Activate: delete old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(name) {
          return name !== CACHE_VERSION;
        }).map(function(name) {
          return caches.delete(name);
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// Fetch: cache-first, fall back to network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      return cached || fetch(event.request);
    })
  );
});
