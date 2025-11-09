import React from 'react'

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div role="dialog" aria-modal="true" aria-label={title || 'Modal'}
      style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div className="card" style={{ maxWidth: 560, margin: '12vh auto 0', padding: 16 }} onClick={e => e.stopPropagation()}>
        {title && <h2 style={{ marginBottom: 8 }}>{title}</h2>}
        <div>
          {children}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
          <button className="pill" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}