// Service worker opcional (solo al publicar en https junto a index.html): permite abrir la caja sin cobertura.
const C = 'caja-fiestas-v4-inventario'; // v4 (09/11/2026): inventario + modo prueba
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(['./', './index.html']))); self.skipWaiting(); });
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => { if (e.request.method === 'GET') e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))); });
