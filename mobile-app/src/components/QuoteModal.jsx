import React, { useEffect, useState } from 'react'
import Modal from './Modal'

export default function QuoteModal({ open, onClose, presetProduct }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [product, setProduct] = useState(presetProduct || '')
  const [details, setDetails] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (open) {
      setSuccess(false)
      setSubmitting(false)
    }
  }, [open])

  const submit = async () => {
    setSubmitting(true)
    // For mobile, we’ll both record a local success and optionally deep-link to WhatsApp
    const msg = `Quote Request\nName: ${name}\nPhone: ${phone}\nProduct: ${product}\nDetails: ${details}`
    try {
      // Simulate network submission
      await new Promise((res) => setTimeout(res, 800))
      setSuccess(true)
      // Open WhatsApp with prefilled message for real-world follow-up
      const wa = `https://wa.me/919876543211?text=${encodeURIComponent(msg)}`
      window.open(wa, '_blank')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Request a Quote">
      {success ? (
        <div className="card" style={{ padding: 12, background: 'rgba(34,197,94,0.15)' }}>
          <strong>Submitted!</strong> We’ll reach out shortly.
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); submit() }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <input className="card" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} style={{ padding: 12 }} />
            <input className="card" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} style={{ padding: 12 }} />
            <input className="card" placeholder="Product/Service" value={product} onChange={e => setProduct(e.target.value)} style={{ padding: 12 }} />
            <textarea className="card" rows={4} placeholder="Details (optional)" value={details} onChange={e => setDetails(e.target.value)} style={{ padding: 12 }} />
            <button className="pill" type="submit" disabled={submitting} aria-busy={submitting}>
              {submitting ? 'Submitting…' : 'Submit'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  )
}