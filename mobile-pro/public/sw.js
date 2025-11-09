const CACHE = 'zuice-mobile-pro-cache-v1'
const ASSETS = ['/', '/index.html']

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request).then((res) => {
      const clone = res.clone()
      caches.open(CACHE).then((c) => c.put(request, clone)).catch(() => {})
      return res
    }).catch(() => cached))
  )
})