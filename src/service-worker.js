/* eslint-disable no-undef */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

if (workbox) {
  workbox.core.setCacheNameDetails({prefix: 'sharestory'});

  // Precache manifest (diisi otomatis oleh Workbox Webpack Plugin jika build production)
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

  // Cache halaman shell dan assets utama
  workbox.routing.registerRoute(
    ({request}) => request.mode === 'navigate',
    new workbox.strategies.NetworkFirst({
      cacheName: 'pages',
      plugins: [
        new workbox.expiration.ExpirationPlugin({maxEntries: 20}),
      ],
    })
  );

  // Cache CSS, JS, dan font
  workbox.routing.registerRoute(
    ({request}) => request.destination === 'style' || request.destination === 'script' || request.destination === 'font',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'assets',
    })
  );

  // Cache gambar
  workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.ExpirationPlugin({maxEntries: 50, maxAgeSeconds: 7 * 24 * 60 * 60}),
      ],
    })
  );

  // API: cache fallback untuk daftar cerita
  workbox.routing.registerRoute(
    /\/stories(\?.*)?$/,
    new workbox.strategies.NetworkFirst({
      cacheName: 'api-stories',
      networkTimeoutSeconds: 5,
      plugins: [
        new workbox.expiration.ExpirationPlugin({maxEntries: 30}),
      ],
    })
  );

  // Push notification event
  self.addEventListener('push', function(event) {
    let data = {};
    if (event.data) {
      data = event.data.json();
    }
    const title = data.title || 'shareStory';
    const options = {
      body: data.body || 'Ada cerita baru!'
    };
    event.waitUntil(self.registration.showNotification(title, options));
  });

} else {
  console.log('Workbox gagal dimuat');
}
