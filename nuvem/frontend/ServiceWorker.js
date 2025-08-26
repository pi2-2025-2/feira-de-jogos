const cacheName = "Ifsc-Feira-De-Jogos-1.2"; // ← Atualize esse nome sempre que fizer alterações!
const contentToCache = [
  "Build/FeiraDeJogosSemRoleta.loader.js",
  "Build/FeiraDeJogosSemRoleta.framework.js.gz",
  "Build/FeiraDeJogosSemRoleta.data.gz",
  "Build/FeiraDeJogosSemRoleta.wasm.gz",
  "TemplateData/style.css"
];

// Evento de instalação
self.addEventListener('install', function (e) {
  console.log('[Service Worker] Install');
  e.waitUntil((async function () {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(contentToCache);
  })());
  self.skipWaiting(); // Ativa imediatamente sem esperar as abas serem fechadas
});

// Evento de ativação
self.addEventListener('activate', function (e) {
  console.log('[Service Worker] Activate');
  e.waitUntil((async function () {
    const keyList = await caches.keys();
    await Promise.all(keyList.map((key) => {
      if (key !== cacheName) {
        console.log(`[Service Worker] Removing old cache: ${key}`);
        return caches.delete(key);
      }
    }));
  })());
  self.clients.claim(); // Controla imediatamente as abas
});

// Evento de fetch (intercepta requisições)
self.addEventListener('fetch', function (e) {
  e.respondWith((async function () {
    let response = await caches.match(e.request);
    if (response) {
      console.log(`[Service Worker] Serving from cache: ${e.request.url}`);
      return response;
    }

    try {
      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    } catch (err) {
      console.warn(`[Service Worker] Fetch failed: ${e.request.url}`, err);
      throw err;
    }
  })());
});
