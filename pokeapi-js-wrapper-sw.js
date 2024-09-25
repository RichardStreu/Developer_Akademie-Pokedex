const imgRe = /https:\/\/raw\.githubusercontent\.com\/PokeAPI\/sprites\/[\/-\w\d]+\/[\d\w-]+\.(?:png|svg|gif)/,
  version = 1;
self.addEventListener("fetch", function (e) {
  e.request.url.match(imgRe) &&
    e.respondWith(
      caches.match(e.request).then(function (t) {
        return (
          t ||
          fetch(e.request)
            .then(function (t) {
              return (
                e.request.url.match(imgRe) &&
                  caches.open("pokeapi-js-wrapper-images-1").then(function (t) {
                    t.add(e.request.url);
                  }),
                t
              );
            })
            .catch(function (e) {
              console.error(e);
            })
        );
      })
    );
}),
  self.addEventListener("install", function (e) {
    self.skipWaiting();
  });
