import React from 'react'
import { motion } from 'framer-motion'

const SERVICES = [
  { id: 'install', name: 'Installation', description: 'On-site setup and commissioning', icon: '🛠️' },
  { id: 'maint', name: 'Maintenance', description: 'Scheduled checks and performance tuning', icon: '🧰' },
  { id: 'monitor', name: 'Monitoring', description: 'Remote device monitoring and alerts', icon: '📡' },
  { id: 'support', name: 'Support', description: '24/7 customer assistance', icon: '🤝' },
]

export default function Services() {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-semibold">Services</h1>
        <button className="pill" onClick={() => window.dispatchEvent(new Event('open-quote'))}>Request Quote</button>
      </div>
      <p className="text-muted mb-2">Tap a service to request details.</p>
      <div className="grid grid-cols-2 gap-3">
        {SERVICES.map((s, index) => (
          <motion.button
            key={s.id}
            className="card p-3 text-left hover:shadow-lg transition"
            onClick={() => window.dispatchEvent(new Event('open-quote'))}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 250, damping: 22, delay: index * 0.03 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-2xl">{s.icon}</div>
            <div className="font-semibold mt-1">{s.name}</div>
            <div className="text-muted text-sm mt-1">{s.description}</div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}