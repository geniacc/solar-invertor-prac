// Segment adapter: loads analytics.js and sends events
let initialized = false;
let writeKey = null;

function loadScript(key) {
  return new Promise((resolve, reject) => {
    if (window.analytics && window.analytics.initialize) return resolve();
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://cdn.segment.com/analytics.js/v1/${key}/analytics.min.js`;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

export async function init(options) {
  const { SEGMENT_WRITE_KEY } = options || {};
  if (!SEGMENT_WRITE_KEY || initialized) return initialized;
  writeKey = SEGMENT_WRITE_KEY;
  await loadScript(writeKey).catch(() => {});
  // Segment auto-initializes on script load
  initialized = !!window.analytics;
  return initialized;
}

function mapEvent(name) {
  // Prefer Title Case names in Segment
  const title = name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return title;
}

export function track(name, props = {}) {
  if (!initialized || !window.analytics || !window.analytics.track) return false;
  window.analytics.track(mapEvent(name), props);
  return true;
}