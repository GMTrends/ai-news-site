// Forcefully unregister all service workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
      console.log('✅ Service Worker unregistered:', registration.scope);
    }
  }).catch(function(err) {
    console.log('Service Worker unregistration failed:', err);
  });
}
