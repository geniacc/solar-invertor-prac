import React from 'react'

const SERVICES = [
  { id: 'install', name: 'Installation', description: 'On-site setup and commissioning', icon: '🛠️' },
  { id: 'maint', name: 'Maintenance', description: 'Scheduled checks and performance tuning', icon: '🧰' },
  { id: 'monitor', name: 'Monitoring', description: 'Remote device monitoring and alerts', icon: '📡' },
  { id: 'support', name: 'Support', description: '24/7 customer assistance', icon: '🤝' },
]

export default function Services() {
  return (
    <div className="page">
      <h1>Services</h1>
      <p style={{ color: '#94a3b8' }}>Tap a service to request details.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {SERVICES.map((s) => (
          <button key={s.id} className="card" style={{ padding: 12, textAlign: 'left' }} onClick={() => window.dispatchEvent(new Event('open-quote-modal'))}>
            <div style={{ fontSize: 24 }}>{s.icon}</div>
            <div style={{ fontWeight: 600, marginTop: 8 }}>{s.name}</div>
            <div style={{ color: '#94a3b8', marginTop: 4 }}>{s.description}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <span className="pill">Request Quote</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}