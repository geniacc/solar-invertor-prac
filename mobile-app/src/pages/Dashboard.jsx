import React from 'react'
import useDeviceData from '../hooks/useDeviceData'

export default function Dashboard() {
  const { devices, loading } = useDeviceData()
  return (
    <div className="page">
      <h1>Device Dashboard</h1>
      <p style={{ color: '#94a3b8' }}>Live status and battery SOC.</p>
      {loading ? (
        <div className="card" style={{ padding: 12 }}>Loading devices…</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {devices.map((d) => (
            <div key={d.id} className="card" style={{ padding: 12 }}>
              <div style={{ fontWeight: 600 }}>{d.name}</div>
              <div style={{ color: '#94a3b8', marginTop: 4 }}>Status: <strong style={{ color: d.status === 'online' ? '#22c55e' : '#ef4444' }}>{d.status}</strong></div>
              <div style={{ marginTop: 6 }}>Power: {d.power} kW</div>
              <div style={{ marginTop: 6 }}>Battery SOC: {d.soc}%</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button className="pill" onClick={() => window.dispatchEvent(new Event('open-chatbot'))}>Support</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}