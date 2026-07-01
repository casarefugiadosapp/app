/* =====================================================================
   Service worker — funcionamiento sin conexión
   ---------------------------------------------------------------------
   Guarda la "carcasa" de la aplicación (la página, los íconos y el
   manifiesto) para que abra sin internet. El horario de Google Sheets
   NO se intercepta aquí: la aplicación intenta la red y, si no hay
   conexión, muestra el horario de respaldo incluido en index.html.

   IMPORTANTE: si cambias archivos de la aplicación, sube el número de
   versión de abajo (CACHE) para que los teléfonos reciban la nueva
   versión.
   ===================================================================== */
const CACHE = 'casa-refugiados-v16';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './logo-full.png',
  './logo-emblem.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;

  // Solo manejamos peticiones del mismo sitio (la carcasa de la app).
  // El horario de Google Sheets pasa directo a la red.
  if (new URL(req.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(cache => cache.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
