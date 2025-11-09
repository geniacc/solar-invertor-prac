import React, { useEffect, useState } from 'react'
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useIsMobile } from './hooks/useIsMobile'
import MobileQuickActions from './components/MobileQuickActions'
import MobileBottomNav from './components/MobileBottomNav'
import ChatBotMobile from './components/ChatBotMobile'
import QuoteModal from './components/QuoteModal'
import Home from './pages/Home'
import Products from './pages/Products'
import Services from './pages/Services'
import Dashboard from './pages/Dashboard'
import Support from './pages/Support'
import Quote from './pages/Quote'

export default function App() {
  const { isMobile } = useIsMobile()
  const [quoteOpen, setQuoteOpen] = useState(false)

  useEffect(() => {
    const openHandler = () => setQuoteOpen(true)
    const closeHandler = () => setQuoteOpen(false)
    window.addEventListener('open-quote-modal', openHandler)
    window.addEventListener('close-quote-modal', closeHandler)
    return () => {
      window.removeEventListener('open-quote-modal', openHandler)
      window.removeEventListener('close-quote-modal', closeHandler)
    }
  }, [])

  // Gate the entire app behind max-width: 640px
  if (!isMobile) {
    return (
      <div className="app-shell" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
        <div className="card" style={{ padding: 24 }}>
          <h1 style={{ marginBottom: 8 }}>Zuice Mobile App</h1>
          <p style={{ color: '#94a3b8' }}>This experience is designed for mobile screens only. Please open on a mobile device or resize to ≤ 640px width.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <Router>
        <PageRoutes />

        {/* Mobile-only overlays */}
        <ChatBotMobile />
        <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
        <MobileQuickActions />
        <MobileBottomNav />
      </Router>
    </div>
  )
}

function PageRoutes() {
  const location = useLocation()
  return (
    <main className="content">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/products" element={<Page><Products /></Page>} />
          <Route path="/services" element={<Page><Services /></Page>} />
          <Route path="/dashboard" element={<Page><Dashboard /></Page>} />
          <Route path="/support" element={<Page><Support /></Page>} />
          <Route path="/quote" element={<Page><Quote /></Page>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
    </main>
  )
}

function Page({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}