import { useEffect, useState } from 'react'

// Tries to fetch device data from the desktop app API, falls back locally
export default function useDeviceData() {
  const [devices, setDevices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('http://localhost:5174/api/devices', { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to fetch devices API')
        const json = await res.json()
        if (!cancelled) setDevices(json?.devices || json || [])
      } catch (e) {
        console.warn('Devices fetch failed, using fallback:', e?.message || e)
        const fallback = [
          { id: 'dev-1', name: 'ESS #1', status: 'online', power: 5.2, soc: 82 },
          { id: 'dev-2', name: 'ESS #2', status: 'offline', power: 0.0, soc: 54 },
          { id: 'dev-3', name: 'ESS #3', status: 'online', power: 3.7, soc: 68 },
        ]
        if (!cancelled) setDevices(fallback)
        if (!cancelled) setError(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return { devices, loading, error }
}