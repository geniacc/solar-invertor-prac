import React from 'react'
import useDeviceData from '../hooks/useDeviceData'

export default function Dashboard() {
  const { devices, loading } = useDeviceData()
  return (
    <div>
      <h1 className="text-xl font-semibold mb-2">Device Dashboard</h1>
      <p className="text-muted mb-2">Live status and battery SOC.</p>
      {loading ? (
        <div className="card p-3">Loading devices…</div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {devices.map((d) => (
            <div key={d.id} className="card p-3">
              <div className="font-semibold">{d.name}</div>
              <div className="text-muted mt-1">Status: <strong className={`${d.status === 'online' ? 'text-green-400' : 'text-red-400'}`}>{d.status}</strong></div>
              <div className="mt-1">Power: {d.power} kW</div>
              <div className="mt-1">Battery SOC: {d.soc}%</div>
              <div className="mt-2">
                <button className="pill" onClick={() => window.dispatchEvent(new Event('open-chat'))}>Support</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}