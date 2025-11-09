import React from 'react'
import Modal from './Modal'

export default function CompareModal({ open, onClose, items = [] }) {
  return (
    <Modal open={open} onClose={onClose} title={`Compare (${items.length})`}>
      {items.length < 2 ? (
        <p style={{ color: '#94a3b8' }}>Select at least two products to compare.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {items.map((p) => (
            <div key={p.id} className="card" style={{ padding: 12 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <img src={p.image} alt={p.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8 }} />
                <div>
                  <div style={{ fontWeight: 600 }}>{p.name}</div>
                  {p.price && <div style={{ color: '#94a3b8' }}>₹{p.price}</div>}
                </div>
              </div>
              {p.specs && (
                <ul style={{ marginTop: 8, color: '#94a3b8' }}>
                  {Object.entries(p.specs).slice(0, 6).map(([k, v]) => (
                    <li key={k}><strong>{k}:</strong> {String(v)}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </Modal>
  )
}