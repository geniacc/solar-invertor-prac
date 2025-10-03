import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star,
  Zap,
  Shield,
  Award,
  ChevronDown,
  X,
  ShoppingCart,
  Eye,
  Heart,
  ArrowRight,
  TrendingUp,
  Package,
  SlidersHorizontal,
  RefreshCw,
  CheckCircle,
  Clock,
  Truck,
  Phone,
  Mail,
  MapPin,
  Bookmark,
  Share2,
  GitCompare
} from 'lucide-react'
import { products } from '../data/products'
import { useCartStore } from '../store/useStore'
import Navbar from '../components/Navbar'
import VoiceProductAssistant from '../components/VoiceProductAssistant'
import { LoadingGrid, SkeletonLoader, InlineLoader } from '../components/ui/Loading'
import { useResponsive } from '../hooks/useResponsive'

// Enhanced Button component
const Button = ({ children, onClick, className = '', size = 'md', variant = 'default', disabled = false, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transform hover:scale-105 active:scale-95';
  
  const sizeClasses = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 px-8',
    xl: 'h-12 px-10 text-lg'
  };
  
  const variantClasses = {
    default: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg',
    outline: 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-emerald-500',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
    destructive: 'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg'
  };
  
  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Enhanced Card components
const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Enhanced categories with icons
const categories = [
  { id: 'all', name: 'All Products', count: products.length, icon: Package },
  { id: 'Solar Hybrid PCU', name: 'Hybrid PCU', count: 3, icon: Zap },
  { id: 'Accessories', name: 'Accessories', count: 1, icon: Shield }
]

const sortOptions = [
  { id: 'featured', name: 'Featured', icon: Star },
  { id: 'price-low', name: 'Price: Low to High', icon: TrendingUp },
  { id: 'price-high', name: 'Price: High to Low', icon: TrendingUp },
  { id: 'rating', name: 'Highest Rated', icon: Award },
  { id: 'newest', name: 'Newest First', icon: Clock }
]

const priceRanges = [
  { id: 'all', name: 'All Prices', min: 0, max: 100000 },
  { id: 'budget', name: 'Under ₹5,000', min: 0, max: 5000 },
  { id: 'mid', name: '₹5,000 - ₹15,000', min: 5000, max: 15000 },
  { id: 'premium', name: '₹15,000 - ₹30,000', min: 15000, max: 30000 },
  { id: 'luxury', name: 'Above ₹30,000', min: 30000, max: 100000 }
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [selectedRating, setSelectedRating] = useState(0)
  const [wishlist, setWishlist] = useState(new Set())
  const [compareList, setCompareList] = useState(new Set())
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [showQuickFilters, setShowQuickFilters] = useState(true)
  
  const { addItem, openCart } = useCartStore();
  const { isMobile, isTablet } = useResponsive();

  // Initial loading simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Simulate loading when filters change
  useEffect(() => {
    if (!isInitialLoading) {
      setIsLoading(true)
      const timer = setTimeout(() => setIsLoading(false), 500)
      return () => clearTimeout(timer)
    }
  }, [searchTerm, selectedCategory, sortBy, selectedPriceRange, selectedRating, isInitialLoading])

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchesRating = product.rating >= selectedRating
      
      return matchesSearch && matchesCategory && matchesPrice && matchesRating
    })

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        // Featured - keep original order
        break
    }

    return filtered
  }, [searchTerm, selectedCategory, sortBy, priceRange, selectedRating])

  const toggleWishlist = (productId) => {
    const newWishlist = new Set(wishlist)
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId)
    } else {
      newWishlist.add(productId)
    }
    setWishlist(newWishlist)
  }

  const toggleCompare = (productId) => {
    const newCompareList = new Set(compareList)
    if (newCompareList.has(productId)) {
      newCompareList.delete(productId)
    } else if (newCompareList.size < 3) {
      newCompareList.add(productId)
    }
    setCompareList(newCompareList)
  }

  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1
    })
    openCart()
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSortBy('featured')
    setPriceRange([0, 100000])
    setSelectedPriceRange('all')
    setSelectedRating(0)
  }

  const handlePriceRangeChange = (rangeId) => {
    const range = priceRanges.find(r => r.id === rangeId)
    if (range) {
      setPriceRange([range.min, range.max])
      setSelectedPriceRange(rangeId)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Package className="h-4 w-4" />
              <span>Premium UPS Solutions</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
              Rent Premium Power Solutions
            </h1>
            <p className="text-xl text-emerald-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              Discover our complete range of hybrid power control units designed for homes and businesses. 
              Advanced technology, reliable performance, and unmatched efficiency - all available for flexible rental terms.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Shield className="w-5 h-5 mr-2" />
                <span>2-3 Year Warranty</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Zap className="w-5 h-5 mr-2" />
                <span>90%+ Efficiency</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Award className="w-5 h-5 mr-2" />
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Truck className="w-5 h-5 mr-2" />
                <span>Free Delivery</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8 backdrop-blur-sm"
        >
          <div className="flex flex-col space-y-6">
            {/* Top Row - Search and Main Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
              {/* Enhanced Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products, categories, features..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-4">
                {/* Advanced Filters Toggle */}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-w-[180px]"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                      {option.name}
                    </option>
                  ))}
                </select>

                {/* View Mode */}
                <div className="flex border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 transition-all ${viewMode === 'grid' ? 'bg-emerald-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 transition-all ${viewMode === 'list' ? 'bg-emerald-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Filters */}
            {showQuickFilters && (
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick Filters:</span>
                {categories.map(category => {
                  const IconComponent = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === category.id
                          ? 'bg-emerald-500 text-white shadow-md'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{category.name}</span>
                      <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{category.count}</span>
                    </button>
                  )
                })}
              </div>
            )}

            {/* Advanced Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-200 dark:border-gray-700 pt-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Price Range */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Price Range</label>
                      <div className="space-y-2">
                        {priceRanges.map(range => (
                          <button
                            key={range.id}
                            onClick={() => handlePriceRangeChange(range.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                              selectedPriceRange === range.id
                                ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                                : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                            }`}
                          >
                            {range.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Rating Filter */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Minimum Rating</label>
                      <div className="space-y-2">
                        {[4, 3, 2, 1, 0].map(rating => (
                          <button
                            key={rating}
                            onClick={() => setSelectedRating(rating)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center space-x-2 ${
                              selectedRating === rating
                                ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                                : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                            }`}
                          >
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                            <span>{rating > 0 ? `${rating}+ Stars` : 'All Ratings'}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Additional Filters */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Availability</label>
                      <div className="space-y-2">
                        <button className="w-full text-left px-3 py-2 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>In Stock Only</span>
                        </button>
                        <button className="w-full text-left px-3 py-2 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all flex items-center space-x-2">
                          <Truck className="w-4 h-4 text-blue-500" />
                          <span>Free Delivery</span>
                        </button>
                        <button className="w-full text-left px-3 py-2 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all flex items-center space-x-2">
                          <Award className="w-4 h-4 text-purple-500" />
                          <span>Premium Quality</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      variant="ghost"
                      onClick={clearAllFilters}
                      className="flex items-center space-x-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Clear All Filters</span>
                    </Button>
                    <Button onClick={() => setShowFilters(false)}>
                      Apply Filters
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results Summary */}
            <div className="flex items-center justify-between text-sm">
              <div className="text-gray-600 dark:text-gray-400">
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Updating results...</span>
                  </div>
                ) : (
                  <span>
                    Showing <span className="font-semibold text-emerald-600 dark:text-emerald-400">{filteredAndSortedProducts.length}</span> of <span className="font-semibold">{products.length}</span> products
                  </span>
                )}
              </div>
              {compareList.size > 0 && (
                  <div className="flex items-center space-x-2">
                    <GitCompare className="w-4 h-4 text-blue-500" />
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      {compareList.size} items to compare
                  </span>
                  <Button size="sm" variant="outline">
                    Compare Now
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {isInitialLoading ? (
              <LoadingGrid 
                key="initial-loading"
                items={8}
                className={viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}
              />
            ) : isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SkeletonLoader 
                  count={8}
                  className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                      : 'grid-cols-1'
                  }`}
                />
              </motion.div>
            ) : (
              <div
                key="products"
                className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? isMobile 
                      ? 'grid-cols-1' 
                      : isTablet 
                        ? 'grid-cols-2' 
                        : 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1'
                }`}
              >
              {filteredAndSortedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
                    {/* Product Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Simple Badge */}
                      {product.badge && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-emerald-500 text-white px-2 py-1 rounded text-xs font-medium">
                            {product.badge}
                          </span>
                        </div>
                      )}

                      {/* Discount */}
                      {product.discount && (
                        <div className="absolute top-3 right-3">
                          <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                            -{product.discount}% OFF
                          </span>
                        </div>
                      )}

                      {/* Simple Action Button */}
                      <div className="absolute bottom-3 right-3">
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
                        >
                          <Heart 
                            className={`w-4 h-4 ${
                              wishlist.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'
                            }`} 
                          />
                        </button>
                      </div>
                    </div>

                    {/* Clean Product Info */}
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Category and Stock Status */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium uppercase">
                            {product.category}
                          </span>
                          {!product.inStock && (
                            <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                              Out of Stock
                            </span>
                          )}
                        </div>

                        {/* Name */}
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 leading-tight line-clamp-2">
                          {product.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300 dark:text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>

                        {/* Key Feature */}
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-medium">{product.power}</span> • <span>{product.efficiency} Efficiency</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline space-x-2">
                          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            ₹{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                              ₹{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2 pt-2">
                          <Link to={`/products/${product.id}`} className="flex-1">
                            <Button variant="outline" className="w-full">
                              View Details
                            </Button>
                          </Link>
                          <Button 
                            onClick={() => handleAddToCart(product)}
                            className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                            disabled={!product.inStock}
                          >
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Enhanced No Results */}
        {!isLoading && filteredAndSortedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">No products found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                We couldn't find any products matching your criteria. Try adjusting your search terms or filters to discover more options.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={clearAllFilters} className="bg-emerald-500 hover:bg-emerald-600 text-white">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear All Filters
                </Button>
                <Button variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Contact Section */}
        {filteredAndSortedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Need Help Choosing the Right Product?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Our experts are here to help you find the perfect power solution for your needs. 
              Get personalized recommendations and technical support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                <Phone className="w-5 h-5 mr-2" />
                Call Expert: (555) 123-4567
              </Button>
              <Button size="lg" variant="outline">
                <Mail className="w-5 h-5 mr-2" />
                Email Consultation
              </Button>
            </div>
          </motion.div>
        )}
      </div>
      
      <VoiceProductAssistant />
    </div>
  )
}