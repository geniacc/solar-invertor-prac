import React from 'react'
import { motion } from 'framer-motion'
import useProductsData from '../hooks/useProductsData'

export default function Home() {
  const { products } = useProductsData()
  const chips = ['Popular', 'New', 'ESS', 'Inverters', 'Batteries', 'Smart Home']
  const stats = [
    { label: 'Saved', value: '₹12k' },
    { label: 'Power', value: '5.2 kW' },
    { label: 'Health', value: '98%' },
    { label: 'Uptime', value: '99.9%' }
  ]

  return (
    <div>
      {/* Top: two compact hero cards side-by-side */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="card p-4 hover:shadow-lg transition-all">
          <div className="text-sm text-muted">Welcome back</div>
          <div className="font-semibold mt-1">Zuice Mobile Pro</div>
          <div className="text-muted text-xs mt-1">Explore products and services</div>
          <div className="mt-3 flex gap-2">
            <button className="btn-primary">Browse</button>
            <button className="btn-accent" onClick={() => window.dispatchEvent(new Event('open-quote'))}>Quote</button>
          </div>
        </div>

        <div className="card p-4">
          <div className="font-semibold mb-2">Quick Stats</div>
          <div className="grid grid-cols-2 gap-2">
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg bg-white/5 p-2">
                <div className="text-xs text-muted">{s.label}</div>
                <div className="text-sm font-semibold">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category chips: horizontal scroll */}
      <div className="no-scrollbar overflow-x-auto mb-3">
        <div className="flex gap-2" style={{ minWidth: 0 }}>
          {chips.map((c) => (
            <button key={c} className="pill hover:translate-y-0.5 transition-transform whitespace-nowrap">{c}</button>
          ))}
        </div>
      </div>

      {/* Featured + Support side-by-side */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <motion.div className="card p-3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
          <img src="/images/solar-banner-removebg-preview.png" alt="Featured" className="w-full h-24 object-contain" />
          <div className="font-semibold mt-2">Featured ESS μ1000</div>
          <div className="text-muted text-xs mt-1">Smart BMS • Long cycle life</div>
          <div className="mt-2 flex gap-2">
            <a href="#/products" className="btn-primary">View</a>
            <a href="#/services" className="btn-accent">Install</a>
          </div>
        </motion.div>
        <motion.div className="card p-3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.05 }}>
          <div className="font-semibold">Support</div>
          <div className="text-muted text-xs mt-1">24/7 assistance. Get help anytime.</div>
          <div className="mt-2 flex gap-2">
            <a href="tel:+919876543211" className="pill">Call</a>
            <a href="https://wa.me/919876543211" className="pill" target="_blank" rel="noreferrer">WhatsApp</a>
            <button className="pill" onClick={() => window.dispatchEvent(new Event('open-chat'))}>Chat</button>
          </div>
        </motion.div>
      </div>

      {/* Deals strip: lightweight horizontal carousel */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold">Deals</div>
          <a href="#/products" className="text-muted text-xs">View all</a>
        </div>
        <div className="no-scrollbar overflow-x-auto">
          <div className="flex gap-3 snap-x snap-mandatory">
            {(products || []).slice(0, 8).map((p, index) => (
              <motion.a
                key={p.id || index}
                href={`#/products`}
                className="card p-2 min-w-[140px] snap-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22, delay: index * 0.03 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-full h-20 rounded-lg overflow-hidden bg-white/5">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="mt-2 text-xs font-medium truncate">{p.name}</div>
                <div className="text-muted text-[11px] truncate">{p.category || 'ESS'}</div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Quick links grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Products', to: '#/products' },
          { label: 'Services', to: '#/services' },
          { label: 'Dashboard', to: '#/dashboard' },
          { label: 'Support', to: '#/support' }
        ].map((item) => (
          <motion.a key={item.label} href={item.to} className="card p-4 hover:shadow-lg transition"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="font-semibold">{item.label}</div>
            <div className="text-muted text-xs">Tap to open</div>
          </motion.a>
        ))}
      </div>
    </div>
  )
}