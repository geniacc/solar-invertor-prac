import React, { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useProductsData from '../hooks/useProductsData'
import ProductCard from '../components/ProductCard'

export default function Products() {
  const { products, loading } = useProductsData()
  const [selected, setSelected] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('name')

  // Derive price bounds from dataset
  const { minPrice, maxPrice } = useMemo(() => {
    const prices = (products || []).map(p => Number(p.price)).filter(v => !Number.isNaN(v) && v != null)
    if (!prices.length) return { minPrice: 0, maxPrice: 1000000 }
    return { minPrice: Math.min(...prices), maxPrice: Math.max(...prices) }
  }, [products])
  const [priceRange, setPriceRange] = useState([0, 1000000])
  useEffect(() => {
    setPriceRange([minPrice, maxPrice])
  }, [minPrice, maxPrice])

  const toggleSelect = (p) => {
    setSelected((prev) => {
      const exists = prev.find((x) => x.id === p.id)
      if (exists) return prev.filter((x) => x.id !== p.id)
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

  const grid = useMemo(() => {
    let list = products || []
    list = list.filter(p => categoryMatch(p, selectedCategory))
    list = list.filter(p => {
      const price = Number(p.price)
      if (Number.isNaN(price) || price == null) return true
      return price >= priceRange[0] && price <= priceRange[1]
    })
    list = [...list].sort((a, b) => {
      if (sortBy === 'price-low') return (a.price ?? 0) - (b.price ?? 0)
      if (sortBy === 'price-high') return (b.price ?? 0) - (a.price ?? 0)
      return (a.name ?? '').localeCompare(b.name ?? '')
    })
    return list
  }, [products, selectedCategory, priceRange, sortBy])

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-lg font-semibold">Products</h1>
        <button className="pill" onClick={() => window.dispatchEvent(new Event('open-quote'))}>Get Quote</button>
      </div>
      <p className="text-muted mb-2 text-xs">Tap cards to select; Compare coming next.</p>

      <div className="no-scrollbar overflow-x-auto mb-3">
        <div className="flex gap-2 items-center">
          {['All','ESS','Inverters','Batteries','Smart Home','Accessories'].map((f) => (
            <button
              key={f}
              className="pill transition-transform whitespace-nowrap"
              onClick={() => setSelectedCategory(f)}
              aria-pressed={selectedCategory === f}
              style={{ fontSize: 12, padding: '6px 10px', background: selectedCategory === f ? 'rgba(59,130,246,0.25)' : undefined }}
            >
              {f}
            </button>
          ))}
          <button className="pill" onClick={() => setShowFilters(v => !v)} aria-expanded={showFilters} aria-controls="filters-panel">Filters</button>
        </div>
      </div>

      {showFilters && (
        <div id="filters-panel" className="card p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted text-xs">Price Range</span>
            <span className="text-muted text-xs">₹{Math.round(priceRange[0]).toLocaleString()} - ₹{Math.round(priceRange[1]).toLocaleString()}</span>
          </div>
          <div className="relative h-6">
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceRange[0]}
              onChange={(e) => {
                const v = Math.min(Number(e.target.value), priceRange[1])
                setPriceRange([v, priceRange[1]])
              }}
              className="absolute left-0 right-0 top-0 w-full"
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
              className="absolute left-0 right-0 top-0 w-full"
            />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-muted text-xs">Sort</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="pill text-xs">
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      )}

      {loading ? (
        <div className="card p-3">Loading products…</div>
      ) : (
        <motion.div className="grid grid-cols-2 gap-3" layout>
          <AnimatePresence initial={false}>
            {grid.map((p, index) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ type: 'spring', stiffness: 250, damping: 22, delay: index * 0.03 }}
              >
                <ProductCard product={p} selected={!!selected.find((x) => x.id === p.id)} onSelect={toggleSelect} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}