import React, { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
// Note: Use THREE.TOUCH enum for OrbitControls touch mappings (available on THREE)
import Globe from 'react-globe.gl'
import { Tooltip } from 'antd'
import { useResponsive } from '../hooks/useResponsive'

// Approximate lat/lng for demo markers
const DEFAULT_MARKERS = [
  { id: 'delhi', name: 'Delhi', lat: 28.6139, lng: 77.2090, type: 'service', region: 'North', status: 'active', services: ['Install', 'Maintenance'], website: 'https://delhi.gov.in' },
  { id: 'bhopal', name: 'Bhopal', lat: 23.2599, lng: 77.4126, type: 'manufacturing', region: 'Central', status: 'active', services: ['Manufacturing'], website: 'https://mp.gov.in' },
  { id: 'hyderabad', name: 'Hyderabad', lat: 17.3850, lng: 78.4867, type: 'service_distribution', region: 'South', status: 'planning', services: ['Distribution', 'Support'], website: 'https://telangana.gov.in' },
  { id: 'guwahati', name: 'Guwahati', lat: 26.1445, lng: 91.7362, type: 'service', region: 'East', status: 'active', services: ['Install'], website: 'https://assam.gov.in' },
  { id: 'kolkata', name: 'Kolkata', lat: 22.5726, lng: 88.3639, type: 'service_distribution', region: 'East', status: 'active', services: ['Distribution', 'Service'], website: 'https://wb.gov.in' },
  { id: 'chennai', name: 'Chennai', lat: 13.0827, lng: 80.2707, type: 'service', region: 'South', status: 'active', services: ['Install', 'Maintenance'], website: 'https://tn.gov.in' },
]

const STORAGE_KEY = 'india-3d-map-settings'

const India3DMap = () => {
  const { isMobile, mobileLite } = useResponsive()
  const [markers, setMarkers] = useState(DEFAULT_MARKERS)
  const [selected, setSelected] = useState(null)
  const [tourPlaying, setTourPlaying] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({ service: true, manufacturing: true, service_distribution: true })
  const [showRoutes, setShowRoutes] = useState(true)
  const [showBoundary, setShowBoundary] = useState(true)
  const [indiaPolygon, setIndiaPolygon] = useState([])
  const [hoveredPoint, setHoveredPoint] = useState(null)
  const [statePolygons, setStatePolygons] = useState([])
  const [hoveredStateKey, setHoveredStateKey] = useState(null)
  const [dataReady, setDataReady] = useState({ world: false, states: false })
  const [viewport, setViewport] = useState({
    w: typeof window !== 'undefined' ? window.innerWidth : 800,
    h: typeof window !== 'undefined' ? window.innerHeight : 600
  })

  const globeRef = useRef(null)

  // Restore/persist settings
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      if (saved.filters) setFilters(saved.filters)
      if (saved.searchQuery) setSearchQuery(saved.searchQuery)
      if (typeof saved.showRoutes === 'boolean') setShowRoutes(saved.showRoutes)
      if (typeof saved.showBoundary === 'boolean') setShowBoundary(saved.showBoundary)
    } catch {}
  }, [])

  // Track viewport size for a free, full-viewport globe while keeping it perfectly round
  useEffect(() => {
    const onResize = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ filters, searchQuery, showRoutes, showBoundary }))
  }, [filters, searchQuery, showRoutes, showBoundary])

  // Load India boundary polygon for richer visual detail
  useEffect(() => {
    const controller = new AbortController()
    fetch('https://raw.githubusercontent.com/vasturiano/three-globe/master/example/datasets/geojson/world.json', { signal: controller.signal })
      .then(res => res.json())
      .then(world => {
        const features = world.features || []
        const india = features.filter(f => (
          f.properties?.ADMIN === 'India' ||
          f.properties?.NAME === 'India' ||
          f.properties?.name === 'India'
        ))
        setIndiaPolygon(india)
        if ((india || []).length) setDataReady(prev => ({ ...prev, world: true }))
      })
      .catch((err) => { console.warn('Failed to load world.json for India boundary', err) })
    return () => controller.abort()
  }, [])

  // Load India state polygons (GeoJSON) for detailed regions
  useEffect(() => {
    const controller = new AbortController()
    fetch('https://gist.githubusercontent.com/jbrobst/56c13bbbf9d97d187fea01ca62ea5112/raw/e388c4cae20aa53cb5090210a42ebb9b765c0a36/india_states.geojson', { signal: controller.signal })
      .then(res => res.json())
      .then(json => {
        const features = json?.features || []
        setStatePolygons(features)
        if ((features || []).length) setDataReady(prev => ({ ...prev, states: true }))
      })
      .catch((err) => { console.warn('Failed to load india_states.geojson', err) })
    return () => controller.abort()
  }, [])

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

  const arcsData = useMemo(() => {
    if (!showRoutes) return []
    const getById = (id) => markers.find(m => m.id === id)
    const pairs = [
      ['delhi', 'bhopal'],
      ['bhopal', 'hyderabad'],
      ['kolkata', 'guwahati'],
      ['hyderabad', 'chennai'],
    ]
    return pairs
      .map(([a, b]) => ({
        startLat: getById(a)?.lat,
        startLng: getById(a)?.lng,
        endLat: getById(b)?.lat,
        endLng: getById(b)?.lng,
        arcAlt: 0.2,
      }))
      .filter(a => [a.startLat, a.startLng, a.endLat, a.endLng].every(v => typeof v === 'number'))
  }, [markers, showRoutes])

  // Focus helper
  const focusCity = (cityName) => {
    const q = (cityName || '').trim().toLowerCase()
    const target = markers.find(m => m.name.toLowerCase() === q) || markers.find(m => m.name.toLowerCase().includes(q))
    if (!target) return
    setSelected(target)
    // Camera focus
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: target.lat, lng: target.lng, altitude: 2.1 }, 1000)
    }
  }

  // Keyboard: Escape close, arrows tour
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSelected(null)
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const list = filtered
        if (!list.length) return
        const idx = list.findIndex(m => selected && m.id === selected.id)
        const nextIdx = e.key === 'ArrowRight' ? (idx + 1) % list.length : (idx <= 0 ? list.length - 1 : idx - 1)
        setSelected(list[nextIdx])
        const next = list[nextIdx]
        if (globeRef.current && next) globeRef.current.pointOfView({ lat: next.lat, lng: next.lng, altitude: 2.1 }, 800)
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
        const next = list[nextIdx]
        if (globeRef.current && next) globeRef.current.pointOfView({ lat: next.lat, lng: next.lng, altitude: 2.1 }, 800)
        return next
      })
    }, 2600)
    return () => clearInterval(id)
  }, [tourPlaying, filtered])

  // Initial camera to India
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: 21.0, lng: 78.0, altitude: 2.3 }, 1200)
      // pointer interaction optimization and touch controls
      const ctrls = globeRef.current.controls()
      ctrls.enableZoom = true
      ctrls.enableRotate = true
      // Enable pan on mobile to mimic typical browser pinch/pan behavior
      ctrls.enablePan = isMobile ? true : false
      ctrls.enableDamping = true
      ctrls.dampingFactor = 0.08
      // Ensure proper touch mappings; TWO-finger = pinch zoom + pan on mobile
      if (ctrls && 'touches' in ctrls && THREE?.TOUCH) {
        ctrls.touches = {
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN
        }
      }
      // ensure target is centered so globe stays visually centered
      if (ctrls && ctrls.target) {
        ctrls.target.set(0, 0, 0)
        ctrls.update?.()
      }
    }
  }, [])

  const resetView = () => {
    setSelected(null)
    setTourPlaying(false)
    setSearchQuery('')
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: 21.0, lng: 78.0, altitude: 2.3 }, 800)
      const ctrls = globeRef.current.controls()
      if (ctrls && ctrls.target) {
        ctrls.target.set(0, 0, 0)
        ctrls.update?.()
      }
    }
  }

  // Helpers
  const getStateKey = (feat) => (
    // Prefer human-readable names, then fall back to codes
    feat?.properties?.ST_NM ||
    feat?.properties?.NAME_1 ||
    feat?.properties?.NAME ||
    feat?.properties?.name ||
    feat?.properties?.ST_CODE ||
    feat?.properties?.state_code ||
    ''
  )

  const weightColor = (w) => {
    const t = Math.min(1, w / 3) // normalize roughly by up to 3 points
    return t < 0.33 ? '#38bdf8' : t < 0.66 ? '#f59e0b' : '#ef4444'
  }

  const activeRings = useMemo(() => (
    filtered.filter(d => d.status === 'active')
  ), [filtered])

  // Ensure boundary toggle clears hover state for consistent UX
  useEffect(() => {
    if (!showBoundary) setHoveredStateKey(null)
  }, [showBoundary])

  // UI panel
  const FiltersPanel = () => (
    <div
      role="dialog"
      aria-label="Filters"
      style={{
        position: 'absolute',
        top: 16,
        left: 16,
        width: isMobile ? 'calc(100% - 32px)' : 'min(360px, calc(100% - 32px))',
        maxHeight: 'calc(100% - 48px)',
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
            onClick={() => setFiltersOpen(false)}
            style={{ background: '#1f2937', color: '#e5e7eb', border: '1px solid #374151', borderRadius: 8, padding: '6px 10px' }}
          >Close</button>
        )}
      </div>

      <div style={{ marginBottom: 12, fontSize: 13, color: '#9ca3af' }}>
        Summary: Service {countsAll.service} · Manufacturing {countsAll.manufacturing} · Service & Dist {countsAll.service_distribution}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={filters.service} onChange={(e) => setFilters(f => ({ ...f, service: e.target.checked }))} />
          <span>Service</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={filters.manufacturing} onChange={(e) => setFilters(f => ({ ...f, manufacturing: e.target.checked }))} />
          <span>Manufacturing</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={filters.service_distribution} onChange={(e) => setFilters(f => ({ ...f, service_distribution: e.target.checked }))} />
          <span>Service & Dist</span>
        </label>
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <input type="checkbox" checked={showRoutes} onChange={(e) => setShowRoutes(e.target.checked)} />
        <span>Show Routes</span>
      </label>

      <div style={{ display: 'flex', gap: 8 }}>
        <input
          placeholder="Search City"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, background: '#0b1220', color: '#e5e7eb', border: '1px solid #374151', borderRadius: 8, padding: '10px 12px' }}
          list="cities-list-3d"
        />
        <datalist id="cities-list-3d">
          {markers.map((m) => (
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

  // Compute size for right column (stacked layout on mobile for better usability)
  const rightWidth = isMobile ? Math.floor(viewport.w) : Math.floor(viewport.w * 0.6)
  const rightHeight = isMobile ? Math.floor(viewport.h * 0.64) : viewport.h
  const globeSize = Math.max(isMobile ? 280 : 220, Math.min(rightWidth, rightHeight) - (isMobile ? 24 : 0))

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', margin: 0, overflow: 'hidden', background: '#0b1220', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'stretch' }}>
      {/* Left content column */}
      <div style={{ flex: isMobile ? '0 0 auto' : '0 0 40%', width: '100%', height: isMobile ? '36%' : '100%', padding: isMobile ? 16 : 32, color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: isMobile ? 'flex-end' : 'center', alignItems: isMobile ? 'center' : 'flex-start' }}>
        <div style={{ maxWidth: 560, textAlign: isMobile ? 'center' : 'left' }}>
          {isMobile ? (
            <h2 style={{ fontSize: 32, lineHeight: 1.15, fontWeight: 700, margin: 0 }}>Expanding As We Evolve</h2>
          ) : (
            <h2 style={{ fontSize: 56, lineHeight: 1.05, fontWeight: 700, margin: 0 }}>Expanding<br/>As We Evolve</h2>
          )}
          <div style={{ fontSize: isMobile ? 20 : 28, marginTop: 14, fontWeight: 500 }}>India</div>
          <p style={{ marginTop: 12, color: '#e5e7eb' }}>
            As a trusted partner for advanced battery solutions, we offer a comprehensive
            range of products and services that cater to the diverse needs of our customers.
          </p>
        </div>
      </div>

      {/* Right globe column (parent container for buttons) */}
      <div style={{ position: 'relative', flex: isMobile ? '0 0 auto' : 1, width: '100%', height: isMobile ? '64%' : '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Filters toggle inside parent container */}
        {!filtersOpen && (
          <button
            onClick={() => setFiltersOpen(true)}
            aria-label="Open filters"
            title="Filters"
            style={{
              position: 'absolute',
              top: isMobile ? 10 : 16,
              left: isMobile ? 10 : 16,
              background: '#111827',
              border: '1px solid #374151',
              color: '#e5e7eb',
              padding: isMobile ? 0 : '12px 14px',
              width: isMobile ? 28 : 'auto',
              height: isMobile ? 28 : 'auto',
              borderRadius: isMobile ? 8 : 10,
              fontSize: isMobile ? 12 : 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 15,
              boxShadow: '0 6px 16px rgba(0,0,0,0.3)'
            }}
          >
            {isMobile ? (
              // Funnel / filter icon
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 4h18l-7 8v6l-4-2v-4L3 4z" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
              </svg>
            ) : (
              'Filters'
            )}
          </button>
        )}
        {filtersOpen && (
          <>
            <div onClick={() => setFiltersOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(2px)', zIndex: 10 }} />
            <FiltersPanel />
          </>
        )}

        {/* Control Row inside parent container */}
        <div style={{ position: 'absolute', top: isMobile ? 10 : 16, right: isMobile ? 10 : 16, display: 'flex', gap: isMobile ? 6 : 8, zIndex: 12 }}>
          <button
            onClick={resetView}
            aria-label="Reset view"
            title="Reset view"
            style={{
              background: '#111827',
              border: '1px solid #374151',
              color: '#e5e7eb',
              padding: isMobile ? 0 : '8px 10px',
              width: isMobile ? 28 : 'auto',
              height: isMobile ? 28 : 'auto',
              borderRadius: isMobile ? 8 : 10,
              fontSize: isMobile ? 12 : 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            {isMobile ? (
              // Counter-clockwise arrow icon
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5v-3l-4 4 4 4V7c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
              </svg>
            ) : (
              'Reset View'
            )}
          </button>
          <button
            onClick={() => setShowBoundary(b => !b)}
            aria-label={showBoundary ? 'Hide boundary' : 'Show boundary'}
            title={!dataReady.world && !dataReady.states ? 'Boundary data unavailable' : (showBoundary ? 'Hide boundary' : 'Show boundary')}
            style={{
              background: !dataReady.world && !dataReady.states ? '#0b1220' : (showBoundary ? '#1f2937' : '#0b1220'),
              border: '1px solid #374151',
              color: '#e5e7eb',
              padding: isMobile ? 0 : '8px 10px',
              width: isMobile ? 28 : 'auto',
              height: isMobile ? 28 : 'auto',
              borderRadius: isMobile ? 8 : 10,
              fontSize: isMobile ? 12 : 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: (!dataReady.world && !dataReady.states) ? 'not-allowed' : 'pointer',
              opacity: (!dataReady.world && !dataReady.states) ? 0.6 : 1
            }}
            disabled={!dataReady.world && !dataReady.states}
          >
            {isMobile ? (
              // Square boundary icon
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="5" width="14" height="14" rx="2" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
              </svg>
            ) : (
              showBoundary ? 'Hide Boundary' : 'Show Boundary'
            )}
          </button>
        </div>

        {/* Globe in right column */}
        <div style={{ touchAction: 'none' }}>
        <Globe
          ref={globeRef}
          backgroundColor="#0b1220"
          width={globeSize}
          height={globeSize}
              globeImageUrl={'https://raw.githubusercontent.com/vasturiano/three-globe/master/example/img/earth-dark.jpg'}
              bumpImageUrl={'https://raw.githubusercontent.com/vasturiano/three-globe/master/example/img/earth-topology.png'}
              backgroundImageUrl={'https://raw.githubusercontent.com/vasturiano/three-globe/master/example/img/night-sky.png'}
              showAtmosphere={!mobileLite}
              atmosphereColor="rgba(255,255,255,0.6)"
              animateIn={true}
              // Points (markers)
              pointsData={filtered}
              pointLat={(d) => d.lat}
              pointLng={(d) => d.lng}
              pointColor={(d) => {
                if (d.type === 'manufacturing') return d.status === 'active' ? '#f59e0b' : 'rgba(245,158,11,0.35)'
                if (d.type === 'service_distribution') return d.status === 'active' ? '#06b6d4' : 'rgba(6,182,212,0.35)'
                return d.status === 'active' ? '#22c55e' : 'rgba(34,197,94,0.35)'
              }}
              pointAltitude={(d) => (selected?.id === d.id ? 0.025 : 0.015)}
              pointRadius={(d) => (selected?.id === d.id ? 0.55 : 0.4)}
              pointResolution={18}
              // Labels
              labelsData={filtered}
              labelLat={(d) => d.lat}
              labelLng={(d) => d.lng}
              labelText={(d) => d.name}
              labelColor={() => '#e5e7eb'}
              labelSize={(d) => (selected?.id === d.id ? 1.25 : 0.95)}
              labelDotRadius={0.15}
              labelAltitude={0.008}
              labelIncludeDot={true}
              // Density: hex bins (clusters)
              hexBinPointsData={filtered}
              hexBinPointLat={(d) => d.lat}
              hexBinPointLng={(d) => d.lng}
              hexBinPointWeight={(d) => (d.status === 'active' ? 1 : 0.6)}
              hexBinResolution={6}
              hexTopColor={({ sumWeight }) => weightColor(sumWeight)}
              hexSideColor={({ sumWeight }) => weightColor(sumWeight)}
              hexAltitude={({ sumWeight }) => Math.min(0.06, sumWeight * 0.008)}
              // Arcs disabled
              arcsData={[]}
              // India state polygons with hover highlight (fallback to country boundary)
              polygonsData={showBoundary ? (statePolygons.length ? statePolygons : indiaPolygon) : []}
              polygonGeoJsonGeometry={(feat) => feat.geometry}
              polygonCapColor={(feat) => getStateKey(feat) === hoveredStateKey ? 'rgba(56,189,248,0.35)' : 'rgba(255,255,255,0.18)'}
              polygonSideColor={() => 'rgba(56,189,248,0.25)'}
              polygonStrokeColor={(feat) => getStateKey(feat) === hoveredStateKey ? 'rgba(56,189,248,0.95)' : 'rgba(148,163,184,0.75)'}
              polygonStrokeWidth={0.9}
              polygonAltitude={(feat) => getStateKey(feat) === hoveredStateKey ? 0.009 : 0.004}
              polygonsTransitionDuration={300}
              polygonLabel={(feat) => (statePolygons.length ? `State: ${getStateKey(feat) || 'Unknown'}` : 'India')}
              onPolygonHover={(feat) => setHoveredStateKey(feat ? getStateKey(feat) : null)}
              // Rings: pulse animations for active sites
              ringsData={activeRings}
              ringLat={(d) => d.lat}
              ringLng={(d) => d.lng}
              ringAltitude={0.005}
              ringColor={() => 'rgba(34,197,94,0.7)'}
              ringMaxRadius={1.0}
              ringPropagationSpeed={0.75}
              ringRepeatPeriod={1200}
              // Events
              onPointClick={(p) => setSelected(p)}
              onPointHover={(p) => setHoveredPoint(p || null)}
            />
        </div>

        {/* Hover overlay for details inside parent container */}
        {hoveredPoint && (
          <div
            style={{ position: 'absolute', bottom: 16, left: 16, zIndex: 14, background: 'rgba(9,14,23,0.85)', border: '1px solid #374151', color: '#e5e7eb', padding: '10px 12px', borderRadius: 10, maxWidth: 320, pointerEvents: 'none' }}
          >
            <div style={{ fontWeight: 600 }}>{hoveredPoint.name}</div>
            <div style={{ fontSize: 12, opacity: 0.9 }}>{hoveredPoint.type.replace('_', ' ')} • {hoveredPoint.region}</div>
            <div style={{ fontSize: 12, marginTop: 6 }}>Lat/Lng: {hoveredPoint.lat.toFixed(2)}, {hoveredPoint.lng.toFixed(2)}</div>
          </div>
        )}

        {/* Selected panel inside parent container */}
        {selected && (
          <div
            role="complementary"
            aria-label={`Details ${selected.name}`}
            style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', width: 'min(960px, calc(100% - 48px))', background: '#0b1220', border: '1px solid #374151', color: '#e5e7eb', borderRadius: 12, padding: 16, boxShadow: '0 8px 24px rgba(0,0,0,0.35)', zIndex: 16 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>{selected.name}</div>
              <button onClick={() => setSelected(null)} style={{ background: '#111827', border: '1px solid #374151', color: '#e5e7eb', padding: '6px 10px', borderRadius: 8 }}>Close</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 8, fontSize: 13 }}>
              <div>
                <div><strong>Type:</strong> {selected.type.replace('_', ' ')}</div>
                <div><strong>Status:</strong> {selected.status}</div>
                <div><strong>Region:</strong> {selected.region}</div>
                <div><strong>Coordinates:</strong> {selected.lat.toFixed(3)}, {selected.lng.toFixed(3)}</div>
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
    </div>
  )
}

export default India3DMap