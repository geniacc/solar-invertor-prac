import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { track } from '../lib/analytics'

export default function QuoteSheet() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [topic, setTopic] = useState('')
  const [details, setDetails] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const openHandler = () => { setOpen(true); track('sheet_open', { sheet: 'quote' }) }
    const closeHandler = () => { setOpen(false); track('sheet_close', { sheet: 'quote' }) }
    window.addEventListener('open-quote', openHandler)
    window.addEventListener('close-quote', closeHandler)
    return () => {
      window.removeEventListener('open-quote', openHandler)
      window.removeEventListener('close-quote', closeHandler)
    }
  }, [])

  const submit = async () => {
    setSubmitting(true)
    try {
      await new Promise((r) => setTimeout(r, 800))
      setSuccess(true)
      const msg = `Quote Request\nName: ${name}\nPhone: ${phone}\nTopic: ${topic}\nDetails: ${details}`
      const wa = `https://wa.me/919876543211?text=${encodeURIComponent(msg)}`
      window.open(wa, '_blank')
      track('quote_submit', { name, phone, topic })
    } finally {
      setSubmitting(false)
    }
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
            <div className="mx-auto max-w-sm">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">Request a Quote</h2>
                <button className="pill" onClick={() => setOpen(false)}>Close</button>
              </div>
              {success ? (
                <div className="card p-3 bg-green-500/20">Submitted! We’ll reach out soon.</div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); submit() }} className="space-y-2">
                  <input className="card p-3" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                  <input className="card p-3" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  <input className="card p-3" placeholder="Product/Service" value={topic} onChange={(e) => setTopic(e.target.value)} />
                  <textarea className="card p-3" rows={4} placeholder="Details (optional)" value={details} onChange={(e) => setDetails(e.target.value)} />
                  <button className="pill" type="submit" disabled={submitting}>{submitting ? 'Submitting…' : 'Submit'}</button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}