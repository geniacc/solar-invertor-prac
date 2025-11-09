// GA4 adapter: loads gtag if needed and sends events
let initialized = false;
let measurementId = null;

function loadScript(id) {
  return new Promise((resolve, reject) => {
    if (document.getElementById('ga4-gtag')) return resolve();
    const s = document.createElement('script');
    s.id = 'ga4-gtag';
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

export async function init(options) {
  const { GA4_MEASUREMENT_ID } = options || {};
  if (!GA4_MEASUREMENT_ID || initialized) return initialized;
  measurementId = GA4_MEASUREMENT_ID;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
  await loadScript(GA4_MEASUREMENT_ID).catch(() => {});
  window.gtag('js', new Date());
  window.gtag('config', GA4_MEASUREMENT_ID, { send_page_view: true });
  initialized = true;
  return true;
}

function mapEvent(name) {
  // Use canonical names directly in GA4
  return name;
}

export function track(name, props = {}) {
  if (!initialized || typeof window.gtag !== 'function') return false;
  const eventName = mapEvent(name);
  window.gtag('event', eventName, props);
  return true;
}