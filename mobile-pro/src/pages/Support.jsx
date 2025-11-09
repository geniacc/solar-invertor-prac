import React from 'react'

export default function Support() {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-2">Support</h1>
      <p className="text-muted mb-2">FAQs and contact methods tailored for mobile.</p>
      <div className="space-y-2">
        <div className="card p-3">
          <div className="font-semibold">Contact</div>
          <div className="mt-1">Phone: <a href="tel:+919876543211">+91 98765 43211</a></div>
          <div className="mt-1">WhatsApp: <a href="https://wa.me/919876543211">Chat now</a></div>
        </div>
        <button className="pill" onClick={() => window.dispatchEvent(new Event('open-chat'))}>Open Chat</button>
      </div>
    </div>
  )
}