// public/sw.js

// Nome do cache (se no futuro quiser guardar arquivos estáticos)
const CACHE_NAME = "papopronto-cache-v1";

// Arquivos que poderíamos pré-cachear (por enquanto, vazio ou só a home)
const URLS_TO_CACHE = ["/"];

// Instalação do service worker
self.addEventListener("install", (event) => {
  // Opcional: pré-cache
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE).catch(() => {
        // Se der erro, segue sem quebrar
        return;
      });
    })
  );
  self.skipWaiting();
});

// Ativação (limpar caches antigos se quiser no futuro)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
          return null;
        })
      )
    )
  );
  self.clients.claim();
});

// Intercepta requisições (aqui estamos só fazendo um "network first" simples)
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Apenas GET
  if (request.method !== "GET") return;

  event.respondWith(
    fetch(request).catch(() => {
      // Se estiver offline, tenta responder com o que tiver no cache
      return caches.match(request).then((response) => {
        if (response) return response;
        // Como fallback, tenta entregar a home se for navegação
        if (request.mode === "navigate") {
          return caches.match("/");
        }
        return new Response("Offline", {
          status: 503,
          statusText: "Offline",
        });
      });
    })
  );
});
