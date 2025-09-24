import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  Search, 
  ShoppingCart, 
  User, 
  Sun, 
  Moon,
  Zap,
  ChevronDown,
  Cpu,
  Shield,
  Battery
} from 'lucide-react'
import { Button } from './ui/Button'
import { ThemeToggle } from './ThemeToggle'
import { useCartStore, useUIStore, useUserStore } from '../store/useStore'
import { cn } from '../lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
]

export function Navbar() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(false) // Start hidden
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isAfterHero, setIsAfterHero] = useState(false)
  const { getTotalItems, openCart } = useCartStore()
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore()
  const { isAuthenticated, user } = useUserStore()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const heroHeight = window.innerHeight // Assuming hero is full viewport height
      
      // Check if we're past the hero section
      const pastHero = currentScrollY > heroHeight * 0.8
      setIsAfterHero(pastHero)
      
      // Only show navbar after hero section
      if (pastHero) {
        setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100)
        setIsScrolled(currentScrollY > 50)
      } else {
        setIsVisible(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Close mobile menu when route changes
  useEffect(() => {
    closeMobileMenu()
  }, [location.pathname, closeMobileMenu])

  const totalItems = getTotalItems()

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5" 
          : "bg-transparent"
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ 
        duration: 0.3, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
    >
      {/* Futuristic glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-purple-500/10 opacity-50" />
      
      {/* Animated border */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
        animate={{ 
          scaleX: [0, 1, 0],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ width: '100%' }}
      />
      
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div
                className="relative"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="h-8 w-8 text-purple-500 group-hover:text-purple-400 transition-colors" />
                <motion.div
                  className="absolute inset-0 bg-purple-500/20 rounded-full blur-md"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Zuice Solar
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group",
                    location.pathname === item.href
                      ? "text-blue-400 bg-blue-500/10 dark:text-blue-300"
                      : "text-foreground hover:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-500/5"
                  )}
                >
                  <span className="relative z-10">{item.name}</span>
                  {location.pathname === item.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg border border-purple-500/30"
                      initial={false}
                    />
                  )}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={openCart}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium"
                >
                  {totalItems}
                </motion.span>
              )}
            </Button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="hidden lg:flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  {user?.name || 'Account'}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="lg:hidden"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-border bg-background/95 backdrop-blur-md"
            >
              <div className="px-4 py-6 space-y-4">
                {/* Mobile Navigation Links */}
                <div className="space-y-2">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.href}
                        className={cn(
                          "block px-3 py-2 text-base font-medium rounded-lg transition-colors",
                          location.pathname === item.href
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        )}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Search */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-4 border-t border-border"
                >
                  <Button variant="outline" className="w-full justify-start">
                    <Search className="h-4 w-4 mr-2" />
                    Search products...
                  </Button>
                </motion.div>

                {/* Mobile Auth */}
                {!isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="pt-4 border-t border-border space-y-2"
                  >
                    <Link to="/login" className="block">
                      <Button variant="outline" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/register" className="block">
                      <Button className="w-full">
                        Sign Up
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

export default Navbar