// Clear Service Worker and Caches Script
// Run this in the browser console to completely clear all caches

(async function clearAllCaches() {
  console.log('🧹 Starting cache cleanup...');
  
  // 1. Unregister all service workers
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (let registration of registrations) {
      console.log('🗑️ Unregistering service worker:', registration);
      await registration.unregister();
    }
    console.log('✅ All service workers unregistered');
  }
  
  // 2. Clear all caches
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    for (let cacheName of cacheNames) {
      console.log('🗑️ Deleting cache:', cacheName);
      await caches.delete(cacheName);
    }
    console.log('✅ All caches cleared');
  }
  
  // 3. Clear local storage
  localStorage.clear();
  console.log('✅ Local storage cleared');
  
  // 4. Clear session storage
  sessionStorage.clear();
  console.log('✅ Session storage cleared');
  
  console.log('🎉 Cache cleanup complete! Please refresh the page.');
})();
