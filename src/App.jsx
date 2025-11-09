import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './hooks/useTheme.jsx'
import Navbar from './components/Navbar'
import FloatingNavbar from './components/FloatingNavbar'
import MobileBottomBar from './components/MobileBottomBar'
import './mobile/mobile.css'
import CartDrawer from './components/Cart/CartDrawer'
import ChatBot from './components/ChatBot/ChatBot'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import DeviceDashboardPage from './pages/DeviceDashboardPage'
import DeviceMonitoringPage from './pages/DeviceMonitoringPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import CookiesPage from './pages/CookiesPage'
import AccessibilityPage from './pages/AccessibilityPage'
import { useResponsive } from './hooks/useResponsive'

function App() {
  const { isPhone } = useResponsive()

  return (
    <ThemeProvider>
      <Router>
        <div className={`min-h-screen bg-background text-foreground ${isPhone ? 'mobile-root mobile-root--no-quick-actions' : ''}`}>
          {/* Desktop/tablet retains the full Navbar; phone (≤640px) uses bottom bar below */}
          {!isPhone && <Navbar />}
          <main style={{ paddingBottom: isPhone ? 'calc(env(safe-area-inset-bottom) + var(--bottom-nav-h) + var(--quick-actions-h))' : undefined }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/device-dashboard" element={<DeviceDashboardPage />} />
              <Route path="/device-monitoring" element={<DeviceMonitoringPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route path="/accessibility" element={<AccessibilityPage />} />
            </Routes>
          </main>
          <CartDrawer />
          <ChatBot />
          {isPhone && (
            <>
              {/* Quick actions bar removed per request; only show bottom nav */}
              <MobileBottomBar />
            </>
          )}
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
