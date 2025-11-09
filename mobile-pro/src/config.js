export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5174'
export const PRODUCTS_URL = import.meta.env.VITE_PRODUCTS_URL || `${API_BASE}/data/pdf-products.json`
export const DEVICES_URL = import.meta.env.VITE_DEVICES_URL || `${API_BASE}/api/devices`
export const ANALYTICS_URL = import.meta.env.VITE_ANALYTICS_URL || ''

// Analytics vendor configuration
export const ANALYTICS_VENDOR = (import.meta.env.VITE_ANALYTICS_VENDOR || '').toLowerCase()
export const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || ''
export const SEGMENT_WRITE_KEY = import.meta.env.VITE_SEGMENT_WRITE_KEY || ''
export const RUDDERSTACK_WRITE_KEY = import.meta.env.VITE_RUDDERSTACK_WRITE_KEY || ''
export const RUDDERSTACK_DATAPLANE_URL = import.meta.env.VITE_RUDDERSTACK_DATAPLANE_URL || ''