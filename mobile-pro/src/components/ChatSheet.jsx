import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { track } from '../lib/analytics'

export default function ChatSheet() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, role: 'bot', text: 'Hi! How can I help you today?' },
  ])
  const [input, setInput] = useState('')

  useEffect(() => {
    const openHandler = () => { setOpen(true); track('sheet_open', { sheet: 'chat' }) }
    const closeHandler = () => { setOpen(false); track('sheet_close', { sheet: 'chat' }) }
    window.addEventListener('open-chat', openHandler)
    window.addEventListener('close-chat', closeHandler)
    return () => {
      window.removeEventListener('open-chat', openHandler)
      window.removeEventListener('close-chat', closeHandler)
    }
  }, [])

  const send = () => {
    if (!input.trim()) return
    const userMsg = { id: Date.now(), role: 'user', text: input.trim() }
    setMessages((m) => [...m, userMsg])
    setInput('')
    track('chat_send', { length: userMsg.text.length })
    setTimeout(() => {
      setMessages((m) => [...m, { id: Date.now() + 1, role: 'bot', text: 'Thanks! Our team will follow up shortly.' }])
    }, 600)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 bg-black/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            className="fixed inset-x-0 bottom-0 card p-4"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="mx-auto max-w-sm space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Chat</h2>
                <button className="pill" onClick={() => setOpen(false)}>Close</button>
              </div>
              <div className="card h-56 p-3 overflow-y-auto space-y-2">
                {messages.map((m) => (
                  <div key={m.id} className={`max-w-[80%] ${m.role === 'user' ? 'ml-auto bg-white/20' : 'bg-white/10'} rounded-xl px-3 py-2`}>{m.text}</div>
                ))}
              </div>
              <div className="flex gap-2">
                <input className="card flex-1 p-3" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" />
                <button className="pill" onClick={send}>Send</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}