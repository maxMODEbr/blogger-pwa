import { cacheNames, clientsClaim, setCacheNameDetails, skipWaiting } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, setCatchHandler, setDefaultHandler } from 'workbox-routing';
import { CacheFirst, NetworkFirst, NetworkOnly } from 'workbox-strategies';

declare const self: ServiceWorkerGlobalScope;

/** Configurations for serviceworker */
const config = {
  app: {
    name: 'blogger-pwa',
    version: 'v2',
    precache: 'install-time',
    runtime: 'run-time',
  },
  fallback: '/app/fallback/',
  manifest: '/app/manifest.json',
  favicon: '/app/icons/favicon.ico',
};

skipWaiting();
clientsClaim();
setCacheNameDetails({
  prefix: config.app.name,
  suffix: config.app.version,
  precache: config.app.precache,
  runtime: config.app.runtime,
});

precacheAndRoute([
  { url: config.fallback, revision: null },
  { url: config.manifest, revision: null },
  { url: config.favicon, revision: null },
]);

setDefaultHandler(new NetworkOnly());

const version = cacheNames.suffix;

// 1. Salva automaticamente páginas navegadas (Hinos, Estudos e Artigos) para leitura offline
registerRoute(
  ({ request }) => request.destination === 'document',
  new NetworkFirst({
    cacheName: `pages-cache-${version}`,
    networkTimeoutSeconds: 3,
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60, // Guarda por 30 dias na memória do aparelho
        maxEntries: 100, // Armazena até 100 páginas recentemente lidas
        purgeOnQuotaError: true,
      }),
    ],
  }),
  'GET',
);

// 2. Salva imagens (PNG, JPG, WebP), fontes e estilos em alta velocidade
registerRoute(
  /\.(?:css|js|png|gif|jpg|jpeg|svg|ico|webp|woff2)$/,
  new CacheFirst({
    cacheName: `images-js-css-${version}`,
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 24 * 60 * 60,
        maxEntries: 200,
        purgeOnQuotaError: true,
      }),
    ],
  }),
  'GET',
);

setCatchHandler(async ({ request }) => {
  switch (request.destination) {
    case 'document': {
      return caches.match(config.fallback) as Promise<Response>;
    }
    default: {
      return Response.error();
    }
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => keys.filter((key) => !key.endsWith(version)))
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key)))),
  );
});
