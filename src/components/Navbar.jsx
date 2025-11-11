import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Zap, 
  Sun, 
  Moon,
  Bell,
  Heart,
  Settings,
  LogOut,
  ChevronDown,
  Globe,
  Phone,
  Mail
} from 'lucide-react'
import { Button } from './ui/Button'
import { ThemeToggle } from './ThemeToggle'
import { useCartStore, useUserStore } from '../store/useStore';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
]

const authenticatedNavigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Services', href: '/services' },
  { name: 'Device Dashboard', href: '/device-dashboard' },
  { name: 'Device Monitoring', href: '/device-monitoring' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
]

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { items } = useCartStore();
  const { user, isAuthenticated, logout } = useUserStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const navbarVariants = {
    top: {
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
    scrolled: {
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(6, 182, 212, 0.3)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  const searchVariants = {
    closed: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: {
      width: '300px',
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        initial="top"
        animate={isScrolled ? 'scrolled' : 'top'}
        variants={navbarVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="flex items-center space-x-3">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src="/images/solar-banner-removebg-preview.png" 
                    alt="Zuice Logo" 
                    className="h-10 w-auto object-contain"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-cyan-400/10"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Zuice
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {(isAuthenticated ? authenticatedNavigation : navigation).map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    className="relative"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <Link
                      to={item.href}
                      className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? 'text-cyan-400'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {item.name}
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500"
                          layoutId="activeTab"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:flex items-center">
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.form
                      onSubmit={handleSearch}
                      className="relative mr-2"
                      variants={searchVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                        autoFocus
                      />
                    </motion.form>
                  )}
                </AnimatePresence>
                <motion.button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Search className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Notifications */}
              {isAuthenticated && (
                <motion.button
                  className="relative p-2 text-gray-400 hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <motion.span
                      className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                      {notifications}
                    </motion.span>
                  )}
                </motion.button>
              )}

              {/* Wishlist */}
              {isAuthenticated && (
                <motion.button
                  className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart className="h-5 w-5" />
                </motion.button>
              )}

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Mobile Login/Profile icon at top-right */}
              <div className="md:hidden">
                <Link
                  to={isAuthenticated ? "/profile" : "/login"}
                  className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={isAuthenticated ? 'Profile' : 'Sign In'}
                >
                  <User className="h-6 w-6" />
                </Link>
              </div>

              {/* Cart */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/cart"
                  className="relative p-2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <motion.span
                      className="absolute top-1 right-0 z-10 h-5 w-5 bg-gradient-to-r from-cyan-400 to-purple-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </Link>
              </motion.div>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <motion.button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 text-gray-400 hover:text-white transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </motion.button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        className="absolute right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-lg border border-gray-600 rounded-lg shadow-xl"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="py-2">
                          <Link
                            to="/profile"
                            className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors duration-200"
                          >
                            <User className="h-4 w-4" />
                            <span>Profile</span>
                          </Link>
                          <Link
                            to="/settings"
                            className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors duration-200"
                          >
                            <Settings className="h-4 w-4" />
                            <span>Settings</span>
                          </Link>
                          <hr className="my-2 border-gray-600" />
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors duration-200"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
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
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-400 hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
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
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden bg-gray-800/95 backdrop-blur-lg border-t border-gray-600"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="px-4 py-6 space-y-4">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </form>

                {/* Mobile Navigation */}
                <div className="space-y-2">
                  {(isAuthenticated ? authenticatedNavigation : navigation).map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <motion.div
                        key={item.name}
                        whileHover={{ x: 10 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to={item.href}
                          className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                            isActive
                              ? 'text-cyan-400 bg-cyan-400/10'
                              : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                          }`}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Mobile Auth */}
                {!isAuthenticated && (
                  <div className="pt-4 border-t border-gray-600 space-y-3">
                    <Link to="/login" className="block">
                      <Button variant="ghost" className="w-full justify-center">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/register" className="block">
                      <Button className="w-full justify-center">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}

                {/* Mobile User Menu */}
                {isAuthenticated && (
                  <div className="pt-4 border-t border-gray-600 space-y-3">
                    <div className="flex items-center space-x-3 px-4 py-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {user?.name?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{user?.name || 'User'}</p>
                        <p className="text-gray-400 text-sm">{user?.email}</p>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
                    >
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
                    >
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}

                {/* Quick Contact */}
                <div className="pt-4 border-t border-gray-600">
                  <h4 className="text-white font-medium mb-3">Quick Contact</h4>
                  <div className="space-y-2">
                    <a
                      href="tel:+15551234567"
                      className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      <Phone className="h-4 w-4" />
                      <span>+1 (555) 123-4567</span>
                    </a>
                    <a
                      href="mailto:info@zuice.com"
                      className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      <Mail className="h-4 w-4" />
                      <span>info@zuice.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;