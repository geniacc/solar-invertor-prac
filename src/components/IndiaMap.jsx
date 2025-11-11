import React, { useEffect, useMemo, useRef, useState } from 'react'
import India from '@react-map/india'
import { Tooltip } from 'antd'

// Simple sample dataset enhanced with categories and details
const DEFAULT_MARKERS = [
  { id: 'delhi', name: 'Delhi', cx: 220, cy: 90, type: 'service', region: 'North', status: 'active', services: ['Install', 'Maintenance'], website: 'https://delhi.gov.in' },
  { id: 'bhopal', name: 'Bhopal', cx: 200, cy: 180, type: 'manufacturing', region: 'Central', status: 'active', services: ['Manufacturing'], website: 'https://mp.gov.in' },
  { id: 'hyderabad', name: 'Hyderabad', cx: 240, cy: 280, type: 'service_distribution', region: 'South', status: 'planning', services: ['Distribution', 'Support'], website: 'https://telangana.gov.in' },
  { id: 'guwahati', name: 'Guwahati', cx: 345, cy: 110, type: 'service', region: 'East', status: 'active', services: ['Install'], website: 'https://assam.gov.in' },
  { id: 'kolkata', name: 'Kolkata', cx: 320, cy: 185, type: 'service_distribution', region: 'East', status: 'active', services: ['Distribution', 'Service'], website: 'https://wb.gov.in' },
  { id: 'chennai', name: 'Chennai', cx: 240, cy: 380, type: 'service', region: 'South', status: 'active', services: ['Install', 'Maintenance'], website: 'https://tn.gov.in' },
]

const STORAGE_KEY = 'india-2d-map-settings'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return isMobile
}

const MobileAwareFilters = ({
  open,
  setOpen,
  filters,
  setFilters,
  counts,
  searchQuery,
  setSearchQuery,
  focusCity,
}) => {
  const isMobile = useIsMobile()

  const panelContent = (
    <div
      role="dialog"
      aria-label="Filters"
      style={{
        position: isMobile ? 'absolute' : 'fixed',
        top: isMobile ? 16 : 24,
        left: isMobile ? 16 : 24,
        width: isMobile ? 'calc(100% - 32px)' : 360,
        maxHeight: isMobile ? '70vh' : '80vh',
        overflowY: 'auto',
        background: '#111827',
        border: '1px solid #374151',
        color: '#e5e7eb',
        padding: 16,
        borderRadius: 12,
        zIndex: 20,
        boxShadow: '0 8px 24px rgba(0,0,0,0.35)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ fontWeight: 600 }}>Filters</div>
        {isMobile && (
          <button
            aria-label="Close filters"
            onClick={() => setOpen(false)}
            style={{ background: '#1f2937', color: '#e5e7eb', border: '1px solid #374151', borderRadius: 8, padding: '6px 10px' }}
          >Close</button>
        )}
      </div>

      <div style={{ marginBottom: 12, fontSize: 13, color: '#9ca3af' }}>
        Summary: Service {counts.service} · Manufacturing {counts.manufacturing} · Service & Dist {counts.service_distribution}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={filters.service}
            onChange={(e) => setFilters((f) => ({ ...f, service: e.target.checked }))}
          />
          <span>Service</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={filters.manufacturing}
            onChange={(e) => setFilters((f) => ({ ...f, manufacturing: e.target.checked }))}
          />
          <span>Manufacturing</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={filters.service_distribution}
            onChange={(e) => setFilters((f) => ({ ...f, service_distribution: e.target.checked }))}
          />
          <span>Service & Dist</span>
        </label>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <input
          placeholder="Search City"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, background: '#0b1220', color: '#e5e7eb', border: '1px solid #374151', borderRadius: 8, padding: '10px 12px' }}
          list="cities-list"
        />
        <datalist id="cities-list">
          {DEFAULT_MARKERS.map((m) => (
            <option key={m.id} value={m.name} />
          ))}
        </datalist>
        <button
          disabled={!searchQuery.trim()}
          onClick={() => focusCity(searchQuery)}
          style={{ background: '#2563eb', color: '#fff', border: 0, borderRadius: 8, padding: '10px 12px', cursor: 'pointer' }}
        >Go</button>
      </div>
    </div>
  )

  if (!isMobile) return panelContent

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            background: '#111827',
            border: '1px solid #374151',
            color: '#e5e7eb',
            padding: '12px 14px',
            borderRadius: 10,
            cursor: 'pointer',
            boxShadow: '0 6px 16px rgba(0,0,0,0.3)'
          }}
        >Filters</button>
      )}
      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(2px)', zIndex: 10 }}
          />
          {panelContent}
        </>
      )}
    </>
  )
}

const IndiaMap = () => {
  const width = 460
  const height = 500

  const [markers, setMarkers] = useState(DEFAULT_MARKERS)
  const [selected, setSelected] = useState(null)
  const [tourPlaying, setTourPlaying] = useState(false)
  const [filters, setFilters] = useState({ service: true, manufacturing: true, service_distribution: true })
  const [searchQuery, setSearchQuery] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const containerRef = useRef(null)

  // Restore/persist settings
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      if (saved.filters) setFilters(saved.filters)
      if (saved.searchQuery) setSearchQuery(saved.searchQuery)
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ filters, searchQuery }))
  }, [filters, searchQuery])

  // Derived counts and filtered list
  const countsAll = useMemo(() => ({
    service: markers.filter(m => m.type === 'service').length,
    manufacturing: markers.filter(m => m.type === 'manufacturing').length,
    service_distribution: markers.filter(m => m.type === 'service_distribution').length,
  }), [markers])

  const filtered = useMemo(() => {
    const enabledTypes = Object.entries(filters)
      .filter(([, enabled]) => enabled)
      .map(([type]) => type)

    const q = searchQuery.trim().toLowerCase()
    return markers.filter(m => enabledTypes.includes(m.type) && (!q || m.name.toLowerCase().includes(q)))
  }, [markers, filters, searchQuery])

  // Focus helper: select by city name (case-insensitive)
  const focusCity = (cityName) => {
    const q = (cityName || '').trim().toLowerCase()
    const target = markers.find(m => m.name.toLowerCase() === q) || markers.find(m => m.name.toLowerCase().includes(q))
    if (!target) return
    setSelected(target)
    // ensure marker is visible; for fixed canvas just pulse via CSS by toggling a flag
    const el = document.getElementById(`marker-${target.id}`)
    if (el) {
      el.animate([
        { boxShadow: '0 0 8px #f44336' },
        { boxShadow: '0 0 20px #f44336' },
        { boxShadow: '0 0 8px #f44336' },
      ], { duration: 600 })
    }
  }

  // Keyboard: Escape to close panel, arrows to tour
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSelected(null)
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const list = filtered
        if (!list.length) return
        const idx = list.findIndex(m => selected && m.id === selected.id)
        const nextIdx = e.key === 'ArrowRight' ? (idx + 1) % list.length : (idx <= 0 ? list.length - 1 : idx - 1)
        setSelected(list[nextIdx])
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [filtered, selected])

  // Auto tour
  useEffect(() => {
    if (!tourPlaying || !filtered.length) return
    const id = setInterval(() => {
      setSelected(prev => {
        const list = filtered
        const idx = list.findIndex(m => prev && m.id === prev.id)
        const nextIdx = idx < 0 ? 0 : (idx + 1) % list.length
        return list[nextIdx]
      })
    }, 2500)
    return () => clearInterval(id)
  }, [tourPlaying, filtered])

  const resetView = () => {
    setSelected(null)
    setTourPlaying(false)
    setSearchQuery('')
  }

  return (
    <div className="w-full flex justify-center" style={{ position: 'relative' }} ref={containerRef}>
      <MobileAwareFilters
        open={filtersOpen}
        setOpen={setFiltersOpen}
        filters={filters}
        setFilters={setFilters}
        counts={countsAll}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        focusCity={focusCity}
      />

      {/* Control Row */}
      <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 8, zIndex: 5 }}>
        <button
          onClick={resetView}
          style={{ background: '#111827', border: '1px solid #374151', color: '#e5e7eb', padding: '10px 12px', borderRadius: 10, cursor: 'pointer' }}
        >Reset View</button>
        <button
          onClick={() => setTourPlaying(p => !p)}
          style={{ background: tourPlaying ? '#ef4444' : '#2563eb', border: '1px solid #374151', color: '#fff', padding: '10px 12px', borderRadius: 10, cursor: 'pointer' }}
        >{tourPlaying ? 'Pause Tour' : 'Play Tour'}</button>
      </div>

      <div style={{ position: 'relative', width, height, overflow: 'hidden' }}>
        {/* Subtle default zoom-in to make India appear closer */}
        <div style={{ position: 'relative', width, height, transform: 'scale(1.12)', transformOrigin: 'center center' }}>
          <India
            fill="#ff9966"
            stroke="#fff"
            strokeWidth={2}
            style={{ width, height, display: 'block' }}
          />
          {filtered.map(({ id, name, cx, cy, type }) => (
            <Tooltip title={`${name} • ${type.replace('_', ' ')}`} key={id} placement="top">
              <div
                id={`marker-${id}`}
                onClick={() => setSelected(markers.find(m => m.id === id))}
                role="button"
                aria-label={`Marker ${name}`}
                style={{
                  position: 'absolute',
                  left: cx - 8,
                  top: cy - 8,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  border: selected?.id === id ? '4px solid #22c55e' : '3px solid #f44336',
                  boxShadow: selected?.id === id ? '0 0 10px #22c55e' : '0 0 8px #f44336',
                  cursor: 'pointer',
                  zIndex: 2,
                }}
              />
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Selected panel */}
      {selected && (
        <div
          role="complementary"
          aria-label={`Details ${selected.name}`}
          style={{
            position: 'absolute',
            bottom: 24,
            left: 24,
            right: 24,
            background: '#0b1220',
            border: '1px solid #374151',
            color: '#e5e7eb',
            borderRadius: 12,
            padding: 16,
            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
            zIndex: 6,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>{selected.name}</div>
            <button
              onClick={() => setSelected(null)}
              style={{ background: '#111827', border: '1px solid #374151', color: '#e5e7eb', padding: '6px 10px', borderRadius: 8 }}
            >Close</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 8, fontSize: 13 }}>
            <div>
              <div><strong>Type:</strong> {selected.type.replace('_', ' ')}</div>
              <div><strong>Status:</strong> {selected.status}</div>
              <div><strong>Region:</strong> {selected.region}</div>
            </div>
            <div>
              <div><strong>Services:</strong> {selected.services.join(', ')}</div>
              {selected.website && (
                <div><strong>Website:</strong> <a href={selected.website} target="_blank" rel="noreferrer" style={{ color: '#93c5fd' }}>{selected.website}</a></div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default IndiaMap