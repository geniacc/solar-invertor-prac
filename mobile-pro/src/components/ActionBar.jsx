import React from 'react'
import { Phone, MessageCircle, MessageSquare, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { track } from '../lib/analytics'

export default function ActionBar() {
  const actions = [
    { label: 'Call', type: 'anchor', href: 'tel:+919876543211', icon: Phone },
    { label: 'WhatsApp', type: 'anchor', href: 'https://wa.me/919876543211?text=Hello%20Zuice%20Team', icon: MessageCircle },
    { label: 'Chat', type: 'button', onClick: () => { track('quick_action', { label: 'Chat' }); window.dispatchEvent(new Event('open-chat')) }, icon: MessageSquare },
    { label: 'Quote', type: 'button', onClick: () => { track('quick_action', { label: 'Quote' }); window.dispatchEvent(new Event('open-quote')) }, icon: FileText },
  ]

  return (
    <div className="fixed bottom-[88px] inset-x-0 z-40">
      <div className="mx-auto max-w-sm px-3">
        <div className="no-scrollbar flex gap-2 overflow-x-auto p-2 card">
          {actions.map(({ label, type, href, onClick, icon: Icon }) => {
            const inner = (
              <div className="pill" aria-label={label}>
                <Icon size={16} />
                <span>{label}</span>
              </div>
            )
            if (type === 'anchor') return <a key={label} href={href} onClick={() => track('quick_action', { label })}>{inner}</a>
            return <button key={label} onClick={onClick} className="bg-transparent border-0 p-0">{inner}</button>
          })}
        </div>
      </div>
    </div>
  )
}