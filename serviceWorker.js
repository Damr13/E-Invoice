// importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js')

// workbox.routing.registerRoute(
//   ({request})  => request.destination === "image",
//   new workbox.strategies.CacheFirst()
// )

const staticIrSite = "ir-site";
const assets = [
  "/",
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticIrSite).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
