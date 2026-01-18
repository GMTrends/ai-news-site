// Development Service Worker - Cache Killer
// This service worker actively clears caches and prevents caching during development

const CACHE_BUSTER = 'dev-no-cache-' + Date.now();

console.log('🔥 Development Service Worker - Cache Killer Active');

// Install immediately and skip waiting
self.addEventListener('install', (event) => {
  console.log('🔥 Dev SW: Installing and clearing all caches');
  self.skipWaiting();
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      console.log('🗑️ Dev SW: Clearing caches:', cacheNames);
      return Promise.all(
        cacheNames.map(cacheName => {
          console.log('🗑️ Dev SW: Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Activate immediately and take control
self.addEventListener('activate', (event) => {
  console.log('🔥 Dev SW: Activating and taking control');
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            console.log('🗑️ Dev SW: Deleting cache during activation:', cacheName);
            return caches.delete(cacheName);
          })
        );
      })
    ])
  );
});

// Intercept all fetch requests and NEVER cache anything
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Always go to network, never cache
  event.respondWith(
    fetch(request.clone())
      .then(response => {
        console.log('🌐 Dev SW: Serving fresh from network:', request.url);
        
        // Add cache-busting headers
        const headers = new Headers(response.headers);
        headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        headers.set('Pragma', 'no-cache');
        headers.set('Expires', '0');
        
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: headers
        });
      })
      .catch(error => {
        console.error('🔥 Dev SW: Network error:', error);
        return new Response('Network Error', { status: 503 });
      })
  );
});

// Message handler for manual cache clearing
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    console.log('🔥 Dev SW: Manual cache clear requested');
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            console.log('🗑️ Dev SW: Manually deleting cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
      }).then(() => {
        console.log('✅ Dev SW: Manual cache clear complete');
        // Notify all clients
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({ type: 'CACHE_CLEARED' });
          });
        });
      })
    );
  }
});

console.log('🔥 Development Service Worker loaded - NO CACHING MODE');