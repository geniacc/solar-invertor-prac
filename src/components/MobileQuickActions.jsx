import React from 'react'
import { Link } from 'react-router-dom'
import {
  Phone,
  MessageSquare,
  FileText,
  Package,
  Wrench,
  Monitor,
  LifeBuoy,
  MessageCircle
} from 'lucide-react'

// Compact, scrollable quick-action bar shown above the mobile bottom nav
// Desktop/tablet remain unaffected via responsive classes
const MobileQuickActions = () => {
  const actions = [
    {
      label: 'Call',
      type: 'anchor',
      href: 'tel:+919876543211',
      icon: Phone
    },
    {
      label: 'WhatsApp',
      type: 'anchor',
      href: 'https://wa.me/919876543211?text=Hello%20Zuice%20Team%2C%20I%27d%20like%20help%20with%20ESS%20solutions.',
      icon: MessageCircle
    },
    {
      label: 'Chat',
      type: 'button',
      onClick: () => {
        // Let ChatBot listen for this event to open itself
        window.dispatchEvent(new Event('open-chatbot'))
      },
      icon: MessageSquare
    },
    {
      label: 'Quote',
      type: 'link',
      to: '/contact',
      icon: FileText
    },
    {
      label: 'Products',
      type: 'link',
      to: '/products',
      icon: Package
    },
    {
      label: 'Services',
      type: 'link',
      to: '/services',
      icon: Wrench
    },
    {
      label: 'Dashboard',
      type: 'link',
      to: '/device-dashboard',
      icon: Monitor
    },
    {
      label: 'Support',
      type: 'link',
      to: '/contact',
      icon: LifeBuoy
    }
  ]

  return (
    <nav
      className="fixed md:hidden bottom-16 left-0 right-0 z-50"
      style={{ bottom: 'calc(env(safe-area-inset-bottom) + var(--bottom-nav-h) + 8px)' }}
      aria-label="Mobile quick actions"
    >
      <div className="mx-auto max-w-7xl px-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-2 rounded-2xl bg-gray-900/90 backdrop-blur-md border border-gray-700">
          {actions.map(({ label, type, to, href, onClick, icon: Icon }) => {
            const content = (
              <div className="tap-target flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium bg-gray-800/90 text-white border border-gray-700 hover:bg-gray-700/80 transition-colors whitespace-nowrap">
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </div>
            )

            if (type === 'link') {
              return (
                <Link key={label} to={to} aria-label={label}>
                  {content}
                </Link>
              )
            }
            if (type === 'anchor') {
              return (
                <a key={label} href={href} aria-label={label}>
                  {content}
                </a>
              )
            }
            return (
              <button key={label} type="button" onClick={onClick} aria-label={label}>
                {content}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default MobileQuickActions