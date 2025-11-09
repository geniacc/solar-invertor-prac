import React, { useMemo, useState } from 'react'
import useProductsData from '../hooks/useProductsData'
import CompareModal from '../components/CompareModal'

export default function Products() {
  const { products, loading } = useProductsData()
  const [selected, setSelected] = useState([])
  const [compareOpen, setCompareOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('name')

  // Derive price bounds
  const { minPrice, maxPrice } = useMemo(() => {
    const prices = (products || []).map(p => Number(p.price)).filter(v => !Number.isNaN(v) && v != null)
    if (!prices.length) return { minPrice: 0, maxPrice: 1000000 }
    return { minPrice: Math.min(...prices), maxPrice: Math.max(...prices) }
  }, [products])
  const [priceRange, setPriceRange] = useState([0, 1000000])
  // Initialize price range when data loads
  React.useEffect(() => {
    setPriceRange([minPrice, maxPrice])
  }, [minPrice, maxPrice])

  const toggleSelect = (p) => {
    setSelected((prev) => {
      const exists = prev.find((x) => x.id === p.id)
      if (exists) return prev.filter((x) => x.id !== p.id)
      // Max 4 items to keep compare readable
      const next = [...prev, p]
      return next.slice(-4)
    })
  }

  const categoryMatch = (p, cat) => {
    if (!cat || cat === 'All') return true
    const text = `${p.name ?? ''} ${p.description ?? ''}`.toLowerCase()
    const map = {
      'ESS': ['ess', 'energy storage'],
      'Inverters': ['inverter', 'ups'],
      'Batteries': ['battery', 'cell'],
      'Smart Home': ['smart', 'home'],
      'Accessories': ['accessory', 'cable', 'charger']
    }
    const keys = map[cat] || []
    return keys.some(k => text.includes(k))
  }

  const gridProducts = useMemo(() => {
    let list = products || []
    // Filter by category approximation
    list = list.filter(p => categoryMatch(p, selectedCategory))
    // Filter by price
    list = list.filter(p => {
      const price = Number(p.price)
      if (Number.isNaN(price) || price == null) return true
      return price >= priceRange[0] && price <= priceRange[1]
    })
    // Sort
    list = [...list].sort((a, b) => {
      if (sortBy === 'price-low') return (a.price ?? 0) - (b.price ?? 0)
      if (sortBy === 'price-high') return (b.price ?? 0) - (a.price ?? 0)
      return (a.name ?? '').localeCompare(b.name ?? '')
    })
    return list
  }, [products, selectedCategory, priceRange, sortBy])

  return (
    <div className="page">
      <h1 style={{ fontSize: 18, lineHeight: '22px' }}>Products</h1>
      <p style={{ color: '#94a3b8', fontSize: 12 }}>Tap cards to select, then Compare.</p>

      {/* Top chips + actions */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', margin: '8px 0 12px', alignItems: 'center' }} className="no-scrollbar">
        {/* Category chips */}
        {['All','ESS','Inverters','Batteries','Smart Home','Accessories'].map((cat) => (
          <button
            key={cat}
            className="pill"
            onClick={() => setSelectedCategory(cat)}
            aria-pressed={selectedCategory === cat}
            style={{
              fontSize: 11,
              padding: '6px 10px',
              whiteSpace: 'nowrap',
              background: selectedCategory === cat ? 'rgba(59,130,246,0.25)' : 'rgba(255,255,255,0.06)'
            }}
          >
            {cat}
          </button>
        ))}
        {/* Quick actions */}
        <button className="pill" onClick={() => setCompareOpen(true)} aria-label="Compare">
          Compare ({selected.length})
        </button>
        <button className="pill" onClick={() => window.dispatchEvent(new Event('open-quote-modal'))} aria-label="Quote">Get Quote</button>
        <button className="pill" onClick={() => setShowFilters(v => !v)} aria-expanded={showFilters} aria-controls="filters-panel">Filters</button>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div id="filters-panel" className="card" style={{ padding: 12, marginBottom: 12 }}>
          {/* Price range slider */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#94a3b8' }}>
              <span>Price Range</span>
              <span>
                ₹{Math.round(priceRange[0]).toLocaleString()} - ₹{Math.round(priceRange[1]).toLocaleString()}
              </span>
            </div>
            <div style={{ position: 'relative', height: 24, marginTop: 8 }}>
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[0]}
                onChange={(e) => {
                  const v = Math.min(Number(e.target.value), priceRange[1])
                  setPriceRange([v, priceRange[1]])
                }}
                style={{ position: 'absolute', left: 0, right: 0, top: 0, width: '100%' }}
              />
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => {
                  const v = Math.max(Number(e.target.value), priceRange[0])
                  setPriceRange([priceRange[0], v])
                }}
                style={{ position: 'absolute', left: 0, right: 0, top: 0, width: '100%' }}
              />
            </div>
          </div>
          {/* Sort */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: '#94a3b8' }}>Sort</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pill"
              style={{ fontSize: 12 }}
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      )}

      {loading ? (
        <div className="card" style={{ padding: 16 }}>Loading products…</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {gridProducts.map((p) => {
            const isSelected = !!selected.find((x) => x.id === p.id)
            return (
              <button
                key={p.id}
                onClick={() => toggleSelect(p)}
                className="card"
                style={{ padding: 8, textAlign: 'left', border: isSelected ? '2px solid #22c55e' : '1px solid rgba(255,255,255,0.1)' }}
                aria-pressed={isSelected}
              >
                <img src={p.image} alt={p.name} style={{ width: '100%', height: 96, objectFit: 'cover', borderRadius: 8 }} />
                <div style={{ marginTop: 8, fontWeight: 600, fontSize: 13 }}>{p.name}</div>
                {p.description && <div style={{ color: '#94a3b8', marginTop: 4, fontSize: 11 }}>{p.description}</div>}
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  <span className="pill" style={{ background: isSelected ? '#22c55e' : 'rgba(255,255,255,0.06)' }}>{isSelected ? 'Selected' : 'Select'}</span>
                  <span className="pill">Details</span>
                </div>
              </button>
            )
          })}
        </div>
      )}

      <CompareModal open={compareOpen} onClose={() => setCompareOpen(false)} items={selected} />
    </div>
  )
}