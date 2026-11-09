// Service worker opcional (solo al publicar en https junto a index.html): permite abrir la caja sin cobertura.
const C = 'caja-fiestas-v2-accesos'; // v2 (09/11/2026): accesos con PIN, cobro por toques, vales, pasar datos entre móviles
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(['./', './index.html']))); self.skipWaiting(); });
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => { if (e.request.method === 'GET') e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))); });
