import React from 'react'
import { motion } from 'framer-motion'

export default function ProductCard({ product, selected, onSelect }) {
  return (
    <motion.button
      onClick={() => onSelect(product)}
      className={`card p-2 text-left border ${selected ? 'border-green-500' : 'border-white/10'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400`}
      aria-pressed={selected}
      aria-label={`Select ${product.name}`}
      layout
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="w-full h-24 rounded-xl overflow-hidden bg-white/5">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="mt-2 font-semibold text-sm">{product.name}</div>
      {product.description && <div className="text-muted text-xs mt-1">{product.description}</div>}
      <div className="flex gap-2 mt-2">
        <span className={`pill ${selected ? 'bg-green-500/60' : ''}`}>{selected ? 'Selected' : 'Select'}</span>
        <span className="pill">Details</span>
      </div>
    </motion.button>
  )
}