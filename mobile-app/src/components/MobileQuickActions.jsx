import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, MessageCircle, MessageSquare, Package, Wrench, FileText, Monitor, LifeBuoy } from 'lucide-react'

export default function MobileQuickActions() {
  const actions = [
    { label: 'Call', type: 'anchor', href: 'tel:+919876543211', icon: Phone },
    { label: 'WhatsApp', type: 'anchor', href: 'https://wa.me/919876543211?text=Hello%20Zuice%20Team', icon: MessageCircle },
    { label: 'Chat', type: 'button', onClick: () => window.dispatchEvent(new Event('open-chatbot')), icon: MessageSquare },
    { label: 'Quote', type: 'button', onClick: () => window.dispatchEvent(new Event('open-quote-modal')), icon: FileText },
    { label: 'Products', type: 'link', to: '/products', icon: Package },
    { label: 'Services', type: 'link', to: '/services', icon: Wrench },
    { label: 'Dashboard', type: 'link', to: '/dashboard', icon: Monitor },
    { label: 'Support', type: 'link', to: '/support', icon: LifeBuoy },
  ]

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 'calc(env(safe-area-inset-bottom) + 66px)',
        zIndex: 49,
      }}
      aria-label="Mobile quick actions"
    >
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 12px' }}>
        <div className="no-scrollbar" style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '8px', borderRadius: 16, background: 'rgba(17, 24, 39, 0.9)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          {actions.map(({ label, type, to, href, onClick, icon: Icon }) => {
            const content = (
              <div className="pill" aria-label={label}>
                <Icon size={16} />
                <span>{label}</span>
              </div>
            )

            if (type === 'link') return <Link key={label} to={to}>{content}</Link>
            if (type === 'anchor') return <a key={label} href={href}>{content}</a>
            return <button key={label} type="button" onClick={onClick} style={{ background: 'transparent', border: 'none', padding: 0 }}>{content}</button>
          })}
        </div>
      </div>
    </div>
  )
}