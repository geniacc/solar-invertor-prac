import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  ShoppingCart, 
  Heart,
  Zap,
  Battery,
  Shield,
  Truck,
  Award,
  TrendingUp,
  ArrowUpDown
} from 'lucide-react';
import { essProducts } from '../data/essProducts';
import { useCartStore } from '../store/useStore';
import Navbar from '../components/Navbar';
import OptimizedImage from '../components/ui/OptimizedImage';
import { useResponsive } from '../hooks/useResponsive';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 3000000]);
  const [showFilters, setShowFilters] = useState(false);
  
  const { addItem, items } = useCartStore();
  const { isMobile, isTablet, mobileLite } = useResponsive();

  // Categories with counts
  const categories = useMemo(() => {
    const categoryCount = essProducts.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});

    return [
      { id: 'all', name: 'All Products', shortName: 'All', count: essProducts.length },
      { id: 'home-ess', name: 'Home ESS', shortName: 'Home', count: categoryCount['home-ess'] || 0 },
      { id: 'commercial', name: 'Commercial ESS', shortName: 'Comm', count: categoryCount['commercial'] || 0 },
      { id: 'telecom', name: 'Telecom ESS', shortName: 'Telecom', count: categoryCount['telecom'] || 0 }
    ];
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = essProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, priceRange]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const isInCart = (productId) => {
    return items.some(item => item.id === productId);
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 overflow-hidden group border dark:border-gray-700">
      {/* Product Image */}
      <div className={`relative ${isMobile ? 'h-40' : 'h-64 sm:h-72 lg:h-80'} overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600`}>
        <OptimizedImage
          src={product.image}
          alt={product.name}
          className="group-hover:scale-105 transition-transform duration-300 p-3"
          containerClassName="h-full"
          aspectRatio="aspect-auto"
          objectFit="object-contain"
        />
        {product.badge && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
            {product.badge}
          </div>
        )}
        {product.discount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold z-10">
            -{product.discount}%
          </div>
        )}
        <div className="absolute bottom-3 left-3 bg-black/60 text-white px-3 py-1 rounded-md text-sm font-semibold z-20">
          Zuice
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center z-10">
          <Link
            to={`/products/${product.id}`}
            className="tap-target bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-6 py-2 rounded-full font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 border dark:border-gray-600"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className={isMobile ? 'p-3' : 'p-6'}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-blue-600 dark:text-blue-400 font-medium capitalize">
            {product.category.replace('-', ' ')}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600 dark:text-gray-300">{product.rating}</span>
            <span className="text-sm text-gray-400 dark:text-gray-500">({product.reviews})</span>
          </div>
        </div>

        <h3 className={`${isMobile ? 'text-sm' : 'text-lg'} font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2`}>
          {product.name}
        </h3>

        <p className={`text-gray-600 dark:text-gray-300 ${isMobile ? 'text-xs' : 'text-sm'} mb-4 line-clamp-2`}>
          {product.description}
        </p>

        {/* Key Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center space-x-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs">
            <Battery className="w-3 h-3" />
            <span>{product.specifications?.Energy || product.specifications?.Capacity}</span>
          </div>
          <div className="flex items-center space-x-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs">
            <Zap className="w-3 h-3" />
            <span>{product.specifications?.['Cycle Life']}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-800 dark:text-gray-100`}>
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && (
              <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button
              onClick={() => addItem(product)}
              disabled={isInCart(product.id)}
              className={`tap-target flex items-center space-x-2 ${isMobile ? 'px-3 py-2' : 'px-4 py-2'} rounded-lg font-semibold transition-all ${
                isInCart(product.id)
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 cursor-not-allowed'
                  : 'bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-600'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{isInCart(product.id) ? 'Added' : 'Add to Cart'}</span>
            </button>
          </div>
        </div>

        {/* Stock Status */}
        <div className="flex items-center justify-between text-sm">
          <div className={`flex items-center space-x-1 ${product.inStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
            <Truck className="w-4 h-4" />
            <span>Free Delivery</span>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductListItem = ({ product }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg dark:hover:shadow-xl transition-shadow duration-300 overflow-hidden border dark:border-gray-700">
      <div className="flex flex-col sm:flex-row">
        {/* Product Image */}
        <div className="relative w-full sm:w-56 h-48 sm:h-48 flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600">
          <OptimizedImage
            src={product.image}
            alt={product.name}
            className="p-3"
            containerClassName="w-full h-full"
            aspectRatio="aspect-auto"
            objectFit="object-contain"
          />
          <div className="absolute bottom-2 left-2 bg-black/60 text-white px-3 py-1 rounded-md text-xs font-semibold z-20">
            Zuice
          </div>
        </div>

        {/* Product Info */}
        <div className={`flex-1 ${isMobile ? 'p-4' : 'p-6'}`}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium capitalize">
                {product.category.replace('-', ' ')}
              </span>
              {product.badge && (
                <span className="ml-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-1 rounded-full text-xs">
                  {product.badge}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600 dark:text-gray-300">{product.rating}</span>
              <span className="text-sm text-gray-400 dark:text-gray-500">({product.reviews})</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{product.name}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                {feature.split(' - ')[0]}
              </span>
            ))}
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {formatPrice(product.price)}
              </div>
              {product.originalPrice && (
                <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <Link
                to={`/products/${product.id}`}
                className="tap-target text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold"
              >
                View Details
              </Link>
              <button
                onClick={() => addItem(product)}
                disabled={isInCart(product.id)}
                className={`tap-target flex items-center space-x-2 px-6 py-2 rounded-lg font-semibold transition-all ${
                  isInCart(product.id)
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 cursor-not-allowed'
                    : 'bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-600'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{isInCart(product.id) ? 'Added' : 'Add to Cart'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <div className={`section-padding mobile-section-tight ${mobileLite ? 'bg-blue-900 dark:bg-gray-900' : 'bg-gradient-to-r from-blue-900 via-blue-800 to-purple-800 dark:from-gray-800 dark:via-gray-900 dark:to-black'} text-white`}>
        <div className="safe-area-x max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 typo-h2-tight">
              ESS Product Range
            </h1>
            <p className="text-xl text-blue-100 dark:text-gray-300 mb-8 max-w-3xl mx-auto typo-lead-tight">
              Discover our comprehensive range of Energy Storage Systems designed for home, commercial, and telecom applications
            </p>
            {!mobileLite && (
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Advanced Safety Features</span>
              </div>
              <div className="flex items-center space-x-2">
                <Battery className="w-5 h-5" />
                <span>Long Cycle Life</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>High Efficiency</span>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>

      <div className="safe-area-x max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md ${isMobile ? 'p-4 mb-6' : 'p-6 mb-8'} border dark:border-gray-700`}>
          {isMobile ? (
            <div className="flex flex-col gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              {/* Category chips (compact) */}
              <div className="flex gap-2 overflow-x-auto py-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-2 py-1 rounded-full border text-xs whitespace-nowrap transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600'
                    }`}
                    aria-pressed={selectedCategory === category.id}
                  >
                    {category.shortName}
                  </button>
                ))}
              </div>

              {/* Filters toggle */}
              <div className="flex justify-end">
                <button
                  onClick={() => setShowFilters((v) => !v)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>

              {/* Collapsible panel */}
              {showFilters && (
                <div className="space-y-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Sort</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      <option value="name">Sort by Name</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">View</label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`flex items-center gap-1 px-3 py-2 rounded-lg border text-sm ${viewMode === 'grid' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'}`}
                      >
                        <Grid className="w-4 h-4" /> Grid
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`flex items-center gap-1 px-3 py-2 rounded-lg border text-sm ${viewMode === 'list' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'}`}
                      >
                        <List className="w-4 h-4" /> List
                      </button>
                    </div>
                  </div>
                  {/* Price range (compact slider) */}
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Price range</label>
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300 mb-1">
                      <span>₹{priceRange[0].toLocaleString()}</span>
                      <span>₹{priceRange[1].toLocaleString()}</span>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min={0}
                        max={3000000}
                        step={50000}
                        value={priceRange[0]}
                        onChange={(e) => {
                          const nextMin = Math.min(Number(e.target.value), priceRange[1]);
                          setPriceRange([nextMin, priceRange[1]]);
                        }}
                        className="w-full"
                        aria-label="Minimum price"
                      />
                      <input
                        type="range"
                        min={0}
                        max={3000000}
                        step={50000}
                        value={priceRange[1]}
                        onChange={(e) => {
                          const nextMax = Math.max(Number(e.target.value), priceRange[0]);
                          setPriceRange([priceRange[0], nextMax]);
                        }}
                        className="w-full"
                        aria-label="Maximum price"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* Price range (desktop richer selector) */}
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  ₹{priceRange[0].toLocaleString()} — ₹{priceRange[1].toLocaleString()}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={0}
                    max={3000000}
                    step={50000}
                    value={priceRange[0]}
                    onChange={(e) => {
                      const nextMin = Math.min(Number(e.target.value), priceRange[1]);
                      setPriceRange([nextMin, priceRange[1]]);
                    }}
                    aria-label="Minimum price"
                  />
                  <input
                    type="range"
                    min={0}
                    max={3000000}
                    step={50000}
                    value={priceRange[1]}
                    onChange={(e) => {
                      const nextMax = Math.max(Number(e.target.value), priceRange[0]);
                      setPriceRange([priceRange[0], nextMax]);
                    }}
                    aria-label="Maximum price"
                  />
                </div>
              </div>

              {/* View Mode */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className={`flex items-center justify-between ${isMobile ? 'mb-4' : 'mb-6'}`}>
          <div className="text-gray-600 dark:text-gray-300">
            Showing {filteredProducts.length} of {essProducts.length} products
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {selectedCategory !== 'all' && `Filtered by: ${categories.find(c => c.id === selectedCategory)?.name}`}
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className={`text-center ${isMobile ? 'py-12' : 'py-16'}`}>
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No products found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search criteria or filters</p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${isMobile ? 'gap-3' : 'gap-6'}`
              : `${isMobile ? 'space-y-4' : 'space-y-6'}`
          }>
            {filteredProducts.map(product => (
              viewMode === 'grid' 
                ? <ProductCard key={product.id} product={product} />
                : <ProductListItem key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;