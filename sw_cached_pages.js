const cacheName = 'v5';

const cacheAssets = [
  "/eighth",
  "/fifthpage",
  "/fourthpage",
  "/",
  "/manifest.webmanifest",
  "/nightpage",
  "/secondpage",
  "/seventhpage",
  "/sixthpage",
  "/style.css",
  "/sw_cached_pages.js",
  "/sw_cached_site.js",
  "/thirdpage",
  "/images/cross.png",
  "/images/cross1.jpg",
  "/images/cross2.jpg",
  "/images/everyday.jpeg",
  "/images/image1.png",
  "/images/image2.png",
  "/images/image3.png",
  "/images/kdam.png",
  "/images/la7n.png",
  "/images/logo.png",
  "/images/Schedule1.png",
  "/images/Schedule2.png",
  "/images/Schedule3.png",
  "/images/Schedule4.png",
  "/images/team1.png",
  "/images/team2.png",
  "/images/team3.png",
  "/images/team4.png",
  "/images/war4a.jpg",
  "/images/war4a2.jpg",
  "/images/war4a3.jpg",
  "/images/wr4a1.jpg",
];

// Call Install Event
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Call Activate Event
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)))// caches.match(e.request)));
});
