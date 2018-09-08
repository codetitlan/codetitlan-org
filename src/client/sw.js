/* global serviceWorkerOption */
const CACHE_NAME = 'big-red-button-cache-v1';
const urlsToCache = serviceWorkerOption.assets;

self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      }),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          console.log('cache hit');
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(
            (_response) => {
              // Check if we received a valid _response
              if (!_response || _response.status !== 200 || _response.type !== 'basic') {
                return _response;
              }

              // IMPORTANT: Clone the _response. A _response is a stream
              // and because we want the browser to consume the _response
              // as well as the cache consuming the _response, we need
              // to clone it so we have two streams.
              const responseToCache = _response.clone();

              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });

              return _response;
            },
          );
      }),
  );
});
