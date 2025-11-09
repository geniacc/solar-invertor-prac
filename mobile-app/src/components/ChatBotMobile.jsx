import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, Send } from 'lucide-react'

export default function ChatBotMobile() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([{ id: 1, type: 'bot', text: 'Hi! How can I help you with Zuice solutions today?' }])

  useEffect(() => {
    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)
    window.addEventListener('open-chatbot', open)
    window.addEventListener('close-chatbot', close)
    return () => {
      window.removeEventListener('open-chatbot', open)
      window.removeEventListener('close-chatbot', close)
    }
  }, [])

  const send = () => {
    if (!input.trim()) return
    setMessages((m) => [...m, { id: Date.now(), type: 'user', text: input }])
    setInput('')
    setTimeout(() => {
      setMessages((m) => [...m, { id: Date.now() + 1, type: 'bot', text: 'Thanks! Our team will get back to you shortly.' }])
    }, 600)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ position: 'fixed', left: 16, right: 16, bottom: 'calc(env(safe-area-inset-bottom) + 90px)', zIndex: 60 }}
          className="card"
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 14, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={16} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Zuice Assistant</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>Mobile Help</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Close" style={{ background: 'transparent', border: 0 }}>
              <X size={16} />
            </button>
          </div>

          <div style={{ maxHeight: 240, overflowY: 'auto', padding: 12 }} className="no-scrollbar">
            {messages.map((m) => (
              <div key={m.id} style={{ display: 'flex', justifyContent: m.type === 'user' ? 'flex-end' : 'flex-start', marginBottom: 8 }}>
                <div style={{ background: m.type === 'user' ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', padding: '8px 10px', borderRadius: 12, fontSize: 13, maxWidth: '80%' }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: 12, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Type your message..."
              style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '8px 10px', color: 'inherit', fontSize: 13 }}
            />
            <button onClick={send} className="pill" aria-label="Send">
              <Send size={16} />
              <span>Send</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}