import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Package, Wrench, Monitor, LifeBuoy } from 'lucide-react'
import { track } from '../lib/analytics'

const items = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/products', label: 'Products', icon: Package },
  { to: '/services', label: 'Services', icon: Wrench },
  { to: '/dashboard', label: 'Dashboard', icon: Monitor },
  { to: '/support', label: 'Support', icon: LifeBuoy },
]

export default function TabBar() {
  return (
    <nav className="tabbar fixed bottom-0 inset-x-0 z-50">
      <div className="mx-auto max-w-sm">
        <div className="grid grid-cols-5 gap-1 px-2 py-2 card">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink key={label} to={to} onClick={() => track('navigate', { to })} className={({ isActive }) => `flex flex-col items-center gap-1 py-1 rounded-lg ${isActive ? 'bg-white/10' : ''}`}>
              <Icon size={20} />
              <span className="text-xs">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}