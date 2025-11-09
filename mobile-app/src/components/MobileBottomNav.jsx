import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Package, Wrench, ShoppingCart, Phone, FileText, Monitor } from 'lucide-react'

const items = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/products', label: 'Products', icon: Package },
  { to: '/services', label: 'Services', icon: Wrench },
  { to: '/cart', label: 'Cart', icon: ShoppingCart },
  { to: '/support', label: 'Support', icon: Phone },
  { to: '/quote', label: 'Quote', icon: FileText },
  { to: '/dashboard', label: 'Dashboard', icon: Monitor },
]

export default function MobileBottomNav() {
  return (
    <nav
      className="bottom-inset"
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        background: 'rgba(17, 24, 39, 0.9)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}
      aria-label="Mobile primary navigation"
    >
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <ul style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 6, padding: '8px 8px' }}>
          {items.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => (
                  `pill` + (isActive ? ' active' : '')
                )}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                aria-label={label}
              >
                <Icon size={18} style={{ marginBottom: 4 }} />
                <span style={{ lineHeight: 1 }}>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}