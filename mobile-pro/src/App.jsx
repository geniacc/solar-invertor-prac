import React, { useEffect } from 'react'
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useIsMobile } from './hooks/useIsMobile'
import TabBar from './components/TabBar'
import ActionBar from './components/ActionBar'
import QuoteSheet from './components/QuoteSheet'
import ChatSheet from './components/ChatSheet'
import Home from './pages/Home'
import Products from './pages/Products'
import Services from './pages/Services'
import Dashboard from './pages/Dashboard'
import Support from './pages/Support'

export default function App() {
  const { isMobile } = useIsMobile()

  if (!isMobile) {
    return (
      <div className="app-shell items-center justify-center text-center p-6">
        <div className="card p-6">
          <h1 className="text-xl font-semibold mb-2">Zuice Mobile Pro</h1>
          <p className="text-muted">Open on a mobile device or resize to ≤ 640px.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <Router>
        <PageRoutes />
        <ActionBar />
        <TabBar />
        <QuoteSheet />
        <ChatSheet />
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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
    </main>
  )
}

function Page({ children }) {
  return (
    <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }}>
      {children}
    </motion.div>
  )
}