import React, { useState, useMemo } from 'react'
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
  X
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { cn } from '../lib/utils'

const products = [
  {
    id: 1,
    name: 'Zuice MU1000 Solar Hybrid PCU - 50Ah',
    price: 32000,
    originalPrice: 38000,
    rating: 4.8,
    reviews: 67,
    image: '/src/assets/solar-banner-removebg-preview.png',
    category: 'residential',
    power: '1KVA',
    efficiency: '>90%',
    warranty: '2 years',
    features: ['PWM Controller', '50Ah LiFePo4', 'LCD Display', 'Multiple Protection'],
    badge: 'Compact'
  },
  {
    id: 2,
    name: 'Zuice MU1000 Solar Hybrid PCU - 86Ah',
    price: 38000,
    originalPrice: 45000,
    rating: 4.9,
    reviews: 89,
    image: '/src/assets/solar-banner-removebg-preview.png',
    category: 'residential',
    power: '1KVA',
    efficiency: '>90%',
    warranty: '2 years',
    features: ['PWM Controller', '86Ah LiFePo4', '660Wp Solar', 'Quick Changeover'],
    badge: 'Best Seller'
  },
  {
    id: 3,
    name: 'Zuice MU1000 Solar Hybrid PCU - 100Ah',
    price: 45000,
    originalPrice: 52000,
    rating: 4.9,
    reviews: 124,
    image: '/src/assets/solar-banner-removebg-preview.png',
    category: 'residential',
    power: '1KVA',
    efficiency: '>90%',
    warranty: '2 years',
    features: ['PWM Controller', '100Ah LiFePo4', '3.25 Hours Backup', 'Indoor IP20'],
    badge: 'Extended Backup'
  },
  {
    id: 4,
    name: 'Zuice MU1000 Commercial Bundle',
    price: 135000,
    originalPrice: 156000,
    rating: 4.8,
    reviews: 45,
    image: '/src/assets/solar-banner-removebg-preview.png',
    category: 'commercial',
    power: '3KVA',
    efficiency: '>90%',
    warranty: '2 years',
    features: ['3x Zuice MU1000 Units', 'Distributed Power', 'Scalable Design', 'Commercial Grade'],
    badge: 'Commercial'
  },
  {
    id: 5,
    name: 'Zuice MU1000 Home Starter Kit',
    price: 28000,
    originalPrice: 33000,
    rating: 4.7,
    reviews: 156,
    image: '/src/assets/solar-banner-removebg-preview.png',
    category: 'residential',
    power: '1KVA',
    efficiency: '>90%',
    warranty: '2 years',
    features: ['Basic Setup', 'Essential Protection', 'Easy Installation', 'Affordable'],
    badge: 'Starter'
  },
  {
    id: 6,
    name: 'Zuice MU1000 Office Solution',
    price: 42000,
    originalPrice: 48000,
    rating: 4.8,
    reviews: 78,
    image: '/src/assets/solar-banner-removebg-preview.png',
    category: 'commercial',
    power: '1KVA',
    efficiency: '>90%',
    warranty: '2 years',
    features: ['Office Optimized', 'Low Noise <50dB', 'Professional Grade', 'Business Ready'],
    badge: 'Office'
  }
]

const categories = [
  { id: 'all', name: 'All Products', count: products.length },
  { id: 'residential', name: 'Residential', count: products.filter(p => p.category === 'residential').length },
  { id: 'commercial', name: 'Commercial', count: products.filter(p => p.category === 'commercial').length },
  { id: 'industrial', name: 'Industrial', count: products.filter(p => p.category === 'industrial').length }
]

const sortOptions = [
  { id: 'featured', name: 'Featured' },
  { id: 'price-low', name: 'Price: Low to High' },
  { id: 'price-high', name: 'Price: High to Low' },
  { id: 'rating', name: 'Highest Rated' },
  { id: 'newest', name: 'Newest' }
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.features.some(feature => 
          feature.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

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
      default:
        // Keep original order for featured
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, sortBy])

  const ProductCard = ({ product, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      layout
    >
      <Card className="card-hover group h-full overflow-hidden">
        <div className="relative">
          <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 to-solar-500/5 flex items-center justify-center">
            <Zap className="h-16 w-16 text-primary/30" />
          </div>
          {product.badge && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
              {product.badge}
            </div>
          )}
          <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{product.rating}</span>
          </div>
        </div>

        <CardHeader className="space-y-2">
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{product.power}</span>
            <span>{product.efficiency}</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-1">
            {product.features.slice(0, 2).map((feature) => (
              <span
                key={feature}
                className="px-2 py-1 bg-muted text-xs rounded-md"
              >
                {feature}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold">₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{product.rating}</span>
                <span>({product.reviews})</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Link to={`/products/${product.id}`} className="flex-1">
              <Button className="w-full">View Details</Button>
            </Link>
            <Button variant="outline" size="icon">
              <Shield className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  const ProductListItem = ({ product, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      layout
    >
      <Card className="card-hover">
        <CardContent className="p-6">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-primary/5 to-solar-500/5 rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="h-8 w-8 text-primary/30" />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                    <span>{product.power}</span>
                    <span>{product.efficiency}</span>
                    <span>{product.warranty}</span>
                  </div>
                </div>
                {product.badge && (
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {product.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-1 bg-muted text-xs rounded-md"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{product.rating}</span>
                    <span>({product.reviews})</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link to={`/products/${product.id}`}>
                    <Button>View Details</Button>
                  </Link>
                  <Button variant="outline" size="icon">
                    <Shield className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-solar-500/5 py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl lg:text-6xl font-bold font-display">
              Solar Inverters
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our complete range of high-efficiency solar inverters designed 
              for residential, commercial, and industrial applications.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-custom py-8">
        {/* Search and Filters */}
        <div className="space-y-6 mb-8">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              {/* Categories */}
              <div className="flex items-center space-x-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      selectedCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                    )}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>

              {/* View Mode */}
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "p-2 rounded-l-lg transition-colors",
                    viewMode === 'grid'
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "p-2 rounded-r-lg transition-colors",
                    viewMode === 'list'
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredAndSortedProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid/List */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredAndSortedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {filteredAndSortedProducts.map((product, index) => (
                <ProductListItem key={product.id} product={product} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results */}
        {filteredAndSortedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
            }}>
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}