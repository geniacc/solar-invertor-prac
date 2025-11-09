// RudderStack adapter: loads rudder-analytics and sends events
let initialized = false;
let writeKey = null;
let dataPlaneUrl = null;

function loadScript() {
  return new Promise((resolve, reject) => {
    if (window.rudderanalytics && window.rudderanalytics.load) return resolve();
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://cdn.rudderlabs.com/v1/rudder-analytics.min.js';
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

export async function init(options) {
  const { RUDDERSTACK_WRITE_KEY, RUDDERSTACK_DATAPLANE_URL } = options || {};
  if (!RUDDERSTACK_WRITE_KEY || !RUDDERSTACK_DATAPLANE_URL || initialized) return initialized;
  writeKey = RUDDERSTACK_WRITE_KEY;
  dataPlaneUrl = RUDDERSTACK_DATAPLANE_URL;
  await loadScript().catch(() => {});
  if (window.rudderanalytics && window.rudderanalytics.load) {
    window.rudderanalytics = window.rudderanalytics || [];
    window.rudderanalytics.load(writeKey, dataPlaneUrl);
    initialized = true;
  }
  return initialized;
}

export function track(name, props = {}) {
  if (!initialized || !window.rudderanalytics || !window.rudderanalytics.track) return false;
  window.rudderanalytics.track(name, props);
  return true;
}