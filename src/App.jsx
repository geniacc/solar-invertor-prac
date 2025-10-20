import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './hooks/useTheme.jsx'
import Navbar from './components/Navbar'
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

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <main>
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
            </Routes>
          </main>
          <CartDrawer />
          <ChatBot />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
