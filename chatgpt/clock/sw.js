self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('clock-cache-v1').then(cache => {
      return cache.addAll(['.', 'index.html']);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
