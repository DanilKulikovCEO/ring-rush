const CACHE = 'ring-rush-v3';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/ring-rush-icon.svg',
  './assets/vaz08_side.png',
  './assets/vaz08_card.png',
  './assets/e46_club_side.png',
  './assets/e46_club_card.png',
  './assets/e46_gtr_side.png',
  './assets/e46_gtr_card.png',
  './assets/gt3rs_side.png',
  './assets/gt3rs_card.png',
  './assets/parts/engine_common.png',
  './assets/parts/turbo_common.png',
  './assets/parts/gearbox_common.png',
  './assets/parts/tires_common.png',
  './assets/parts/suspension_common.png',
  './assets/parts/brakes_common.png',
  './assets/parts/radiator_common.png',
  './assets/parts/wing_common.png',
  './assets/parts/engine_premium.png',
  './assets/parts/turbo_premium.png',
  './assets/parts/gearbox_premium.png',
  './assets/parts/tires_premium.png',
  './assets/parts/suspension_premium.png',
  './assets/parts/brakes_premium.png',
  './assets/parts/radiator_premium.png',
  './assets/parts/wing_premium.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match('./index.html')))
  );
});
