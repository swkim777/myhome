self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("calculator-cache").then((cache) => {
      return cache.addAll([
        "index.html",
        "manifest.json",
        "icon-192.png",
        "icon-512.png"
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
