import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Package, ShoppingCart, Phone, User, Wrench } from 'lucide-react'
import { useUserStore } from '../store/useStore'

const navItems = (
  isAuthenticated,
) => [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Products', to: '/products', icon: Package },
  { label: 'Services', to: '/services', icon: Wrench },
  { label: 'Cart', to: '/cart', icon: ShoppingCart },
  { label: 'Contact', to: '/contact', icon: Phone },
  ...(isAuthenticated ? [{ label: 'Profile', to: '/profile', icon: User }] : [])
]

const MobileBottomBar = () => {
  const location = useLocation()
  const { isAuthenticated } = useUserStore()

  const items = navItems(isAuthenticated)

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-t border-gray-700"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="Primary mobile navigation"
    >
      <div className="mx-auto max-w-7xl">
        <ul
          className="grid gap-1 px-2 py-2"
          style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
        >
          {items.map(({ label, to, icon: Icon }) => {
            const active = location.pathname === to
            return (
              <li key={to} className="">
                <Link
                  to={to}
                  className={`tap-target flex flex-col items-center justify-center rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    active
                      ? 'text-cyan-400 bg-cyan-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="leading-tight">{label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default MobileBottomBar