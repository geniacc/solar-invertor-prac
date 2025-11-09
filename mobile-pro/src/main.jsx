import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initAnalytics } from './lib/analytics.js'

const root = createRoot(document.getElementById('root'))
// Initialize analytics vendor (if configured)
initAnalytics().catch(() => {})
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}