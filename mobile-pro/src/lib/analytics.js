import {
  ANALYTICS_URL,
  ANALYTICS_VENDOR,
  GA4_MEASUREMENT_ID,
  SEGMENT_WRITE_KEY,
  RUDDERSTACK_WRITE_KEY,
  RUDDERSTACK_DATAPLANE_URL,
} from '../config'

let adapter = null
let initialized = false

export async function initAnalytics() {
  if (initialized) return true
  try {
    if (ANALYTICS_VENDOR === 'ga4') {
      const mod = await import('./analytics/vendors/ga4.js')
      adapter = { init: mod.init, track: mod.track }
      await adapter.init({ GA4_MEASUREMENT_ID })
    } else if (ANALYTICS_VENDOR === 'segment') {
      const mod = await import('./analytics/vendors/segment.js')
      adapter = { init: mod.init, track: mod.track }
      await adapter.init({ SEGMENT_WRITE_KEY })
    } else if (ANALYTICS_VENDOR === 'rudderstack' || ANALYTICS_VENDOR === 'rudder') {
      const mod = await import('./analytics/vendors/rudder.js')
      adapter = { init: mod.init, track: mod.track }
      await adapter.init({ RUDDERSTACK_WRITE_KEY, RUDDERSTACK_DATAPLANE_URL })
    }
  } catch (e) {
    if (import.meta.env.DEV) console.warn('[analytics:init] adapter init failed', e)
  }
  initialized = true
  return true
}

export function track(event, payload = {}) {
  const data = { event, payload, ts: Date.now() }
  try {
    // Forward to vendor adapter first if available
    if (adapter && typeof adapter.track === 'function') {
      adapter.track(event, payload)
    }
    // Queue for potential batching
    window._analyticsQueue = window._analyticsQueue || []
    window._analyticsQueue.push(data)
    // Optional dataLayer integration remains for GA setups
    if (window.dataLayer) window.dataLayer.push(data)
    // Fire-and-forget beacon if endpoint configured (server-side collector)
    if (ANALYTICS_URL) {
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
      navigator.sendBeacon(ANALYTICS_URL, blob)
    }
  } catch (_) {}
  // Log in dev for visibility
  if (import.meta.env.DEV) console.debug('[track]', event, payload)
}