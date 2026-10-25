// Driftline offline cache. Bump VERSION when you publish changes so players get the update.
const VERSION='driftline-v1';
const CORE=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET') return;
  const url=new URL(req.url);
  if(url.origin===location.origin){
    // game files: network first so updates arrive, cache when offline
    e.respondWith(fetch(req).then(res=>{const copy=res.clone();caches.open(VERSION).then(c=>c.put(req,copy));return res;})
      .catch(()=>caches.match(req).then(m=>m||caches.match('./index.html'))));
  } else if(/(^|\.)fonts\.(googleapis|gstatic)\.com$|(^|\.)unpkg\.com$/.test(url.hostname)){
    // fonts and the multiplayer library: serve cached copy, refresh in the background
    e.respondWith(caches.open(VERSION).then(c=>c.match(req).then(hit=>{
      const net=fetch(req).then(res=>{if(res.ok||res.type==='opaque')c.put(req,res.clone());return res;}).catch(()=>hit);
      return hit||net;})));
  }
});
