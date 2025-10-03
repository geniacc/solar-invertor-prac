import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Zap, 
  Shield, 
  Award, 
  Truck,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  Play,
  Download,
  Phone,
  Mail,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Flag,
  User,
  Calendar,
  Package,
  Clock,
  MapPin,
  CreditCard,
  Lock,
  Verified,
  Info,
  TrendingUp,
  X,
  Eye,
  Maximize2,
  RotateCw,
  GitCompare,
  Bookmark,
  Copy,
  ExternalLink,
  Layers,
  Gauge,
  Battery,
  Sun,
  Wifi,
  Settings,
  HelpCircle,
  FileText,
  Video,
  Image as ImageIcon,
  ZoomIn,
  ZoomOut
} from 'lucide-react'
import { products } from '../data/products'
import { useCartStore } from '../store/useStore'
import { LoadingSpinner, SkeletonLoader, FullPageLoader } from '../components/ui/Loading'
import { ResponsiveContainer, ResponsiveGrid, ResponsiveFlex, useResponsive } from '../components/ui/Responsive'

// Enhanced Button component
const Button = ({ children, onClick, className = '', size = 'md', variant = 'default', disabled = false, loading = false, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transform hover:scale-105 active:scale-95';
  
  const sizeClasses = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 py-2',
    lg: 'h-12 px-8 text-lg',
    xl: 'h-14 px-10 text-xl'
  };
  
  const variantClasses = {
    default: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 hover:border-emerald-500',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100',
    destructive: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg',
    premium: 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 shadow-lg hover:shadow-xl'
  };
  
  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />}
      {children}
    </button>
  );
};

// Enhanced Card components
const Card = ({ children, className = '', hover = false, ...props }) => {
  return (
    <div className={`rounded-xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm ${hover ? 'hover:shadow-lg transition-shadow duration-300' : ''} ${className}`} {...props}>
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

const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 pb-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Enhanced Badge component
const Badge = ({ children, variant = 'default', className = '', ...props }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    premium: 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 dark:from-purple-900 dark:to-indigo-900 dark:text-purple-200'
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCartStore()
  
  const [product, setProduct] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('overview')
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [showImageModal, setShowImageModal] = useState(false)
  const [reviews, setReviews] = useState([])
  const [imageZoom, setImageZoom] = useState(1)
  const [is360View, setIs360View] = useState(false)
  const [showCompareModal, setShowCompareModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showSpecsModal, setShowSpecsModal] = useState(false)

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id))
    if (foundProduct) {
      setProduct(foundProduct)
      // Enhanced mock reviews data
      setReviews([
        {
          id: 1,
          user: 'Rajesh Kumar',
          avatar: '/api/placeholder/40/40',
          rating: 5,
          date: '2024-01-15',
          title: 'Excellent product quality',
          comment: 'Very satisfied with the performance. Installation was smooth and the backup time is as promised. The LCD display is very informative and the build quality is outstanding.',
          verified: true,
          helpful: 12,
          images: ['/api/placeholder/100/100', '/api/placeholder/100/100']
        },
        {
          id: 2,
          user: 'Priya Sharma',
          avatar: '/api/placeholder/40/40',
          rating: 4,
          date: '2024-01-10',
          title: 'Good value for money',
          comment: 'Works well for my home needs. The LCD display is very helpful to monitor the status. Only minor issue is the fan noise during heavy load.',
          verified: true,
          helpful: 8,
          images: []
        },
        {
          id: 3,
          user: 'Amit Patel',
          avatar: '/api/placeholder/40/40',
          rating: 5,
          date: '2024-01-05',
          title: 'Highly recommended',
          comment: 'Outstanding build quality and performance. Customer service is also very responsive. Been using for 3 months without any issues.',
          verified: false,
          helpful: 15,
          images: ['/api/placeholder/100/100']
        },
        {
          id: 4,
          user: 'Sneha Reddy',
          avatar: '/api/placeholder/40/40',
          rating: 4,
          date: '2024-01-02',
          title: 'Reliable backup solution',
          comment: 'Great product for power backup. Installation team was professional and explained everything clearly.',
          verified: true,
          helpful: 6,
          images: []
        }
      ])
    } else {
      navigate('/products')
    }
  }, [id, navigate])

  const handleAddToCart = async () => {
    if (product) {
      setLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: quantity
      })
      setLoading(false)
    }
  }

  const handleRentNow = async () => {
    await handleAddToCart()
    navigate('/cart')
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    )
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
    } else {
      setShowShareModal(true)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const { isMobile, isTablet, isDesktop } = useResponsive()

  if (!product) {
    return (
      <FullPageLoader 
        message="Loading product details..."
        icon={<Package className="w-8 h-8" />}
      />
    )
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Eye },
    { id: 'specifications', name: 'Specifications', icon: Settings },
    { id: 'reviews', name: `Reviews (${reviews.length})`, icon: Star },
    { id: 'support', name: 'Support', icon: HelpCircle },
    { id: 'documentation', name: 'Documentation', icon: FileText }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <ResponsiveContainer>
          <div className="py-4">
            <div className="flex items-center space-x-2 text-sm">
              <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400">Home</Link>
              <span className="text-gray-400 dark:text-gray-500">/</span>
              <Link to="/products" className="text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400">Products</Link>
              <span className="text-gray-400 dark:text-gray-500">/</span>
              <span className="text-gray-900 dark:text-gray-100 font-medium">{product.name}</span>
            </div>
          </div>
        </ResponsiveContainer>
      </div>

      <ResponsiveContainer>
        <div className="py-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/products')}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </motion.button>

          <ResponsiveGrid
            cols={{ default: 1, lg: 2 }}
            gap={isMobile ? "6" : "12"}
            className="mb-12"
          >
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover cursor-zoom-in"
                onClick={() => setShowImageModal(true)}
              />
              
              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 rounded-full p-2 shadow-md transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 rounded-full p-2 shadow-md transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {selectedImageIndex + 1} / {product.images.length}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index 
                      ? 'border-emerald-500 ring-2 ring-emerald-200' 
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Product Title and Basic Info */}
              <div className="space-y-4">
                <div className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">
                  {product.category}
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                  {product.name}
                </h1>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {product.rating}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Heart 
                      className={`w-6 h-6 ${
                        isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'
                      }`} 
                    />
                  </button>
                </div>
              </div>

              {/* Price Section */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-baseline space-x-3">
                    <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  
                  {product.originalPrice && (
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                        Save ₹{(product.originalPrice - product.price).toLocaleString()}
                      </span>
                      <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-2 py-1 rounded-full text-sm font-medium">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    </div>
                  )}
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Monthly rental price • Free installation included
                  </p>
                </div>

                {/* Stock Status */}
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={`font-medium ${product.inStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {product.inStock ? 'In Stock - Ready to Ship' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Key Specifications */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Key Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                    <Zap className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{product.power}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Power Output</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                    <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{product.efficiency}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Efficiency</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                    <Shield className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{product.warranty}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Warranty</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                    <Package className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{product.weight}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Weight</div>
                  </div>
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Rental Quantity
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-6 py-3 font-semibold text-lg min-w-[4rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      units available
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handleAddToCart}
                    className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="w-5 h-5 mr-3" />
                    {product.inStock ? 'Add to Rental Cart' : 'Out of Stock'}
                  </Button>
                  
                  <Button
                    onClick={handleRentNow}
                    variant="outline"
                    className="w-full h-14 border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900 text-lg font-semibold"
                    disabled={!product.inStock}
                  >
                    <Zap className="w-5 h-5 mr-3" />
                    Rent Now
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                        Rental Benefits
                      </p>
                      <ul className="text-sm text-blue-700 dark:text-blue-200 space-y-1">
                        <li>• Free installation and setup</li>
                        <li>• 24/7 technical support</li>
                        <li>• Maintenance included</li>
                        <li>• Flexible rental terms</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </ResponsiveGrid>

          {/* Product Details Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
          <Card>
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <CardContent className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Product Description</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Key Features</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {product.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Benefits</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {product.benefits?.map((benefit, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <Award className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                          </div>
                        )) || (
                          <div className="col-span-2 text-gray-500 dark:text-gray-400">
                            Benefits information will be available soon.
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'specifications' && (
                  <motion.div
                    key="specifications"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-xl font-semibold mb-6">Technical Specifications</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      {Object.entries(product.specifications).map(([category, specs]) => (
                        <div key={category}>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 capitalize">
                            {category.replace(/([A-Z])/g, ' $1').trim()}
                          </h4>
                          <div className="space-y-2">
                            {Object.entries(specs).map(([key, value]) => (
                              <div key={key} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="text-gray-600 dark:text-gray-400 capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                                </span>
                                <span className="font-medium text-gray-900 dark:text-gray-100">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'reviews' && (
                  <motion.div
                    key="reviews"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const count = reviews.filter(r => Math.floor(r.rating) === rating).length
                        const percentage = (count / reviews.length) * 100
                        return (
                          <div key={rating} className="flex items-center space-x-3">
                            <span className="text-sm text-gray-900 dark:text-gray-100 w-8 flex items-center">
                              {rating}<Star className="w-3 h-3 ml-1 text-yellow-400 fill-current" />
                            </span>
                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 w-8">{count}</span>
                          </div>
                        )
                      })}
                    </div>

                    {/* Individual Reviews */}
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <Card key={review.id} className="p-6">
                          <div className="flex items-start space-x-4">
                            <img
                              src={review.avatar}
                              alt={review.user}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <h5 className="font-semibold text-gray-900 dark:text-gray-100">{review.user}</h5>
                                  {review.verified && (
                                    <Badge variant="success" className="text-xs">
                                      <Verified className="w-3 h-3 mr-1" />
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                              </div>
                              
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating
                                          ? 'text-yellow-400 fill-current'
                                          : 'text-gray-300 dark:text-gray-600'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm font-medium">{review.title}</span>
                              </div>
                              
                              <p className="text-gray-600 dark:text-gray-400 mb-3">{review.comment}</p>
                              
                              {review.images && review.images.length > 0 && (
                                <div className="flex space-x-2 mb-3">
                                  {review.images.map((image, index) => (
                                    <img
                                      key={index}
                                      src={image}
                                      alt={`Review image ${index + 1}`}
                                      className="w-16 h-16 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity"
                                    />
                                  ))}
                                </div>
                              )}
                              
                              <div className="flex items-center space-x-4 text-sm">
                                <button className="flex items-center space-x-1 text-gray-500 hover:text-emerald-600 transition-colors">
                                  <ThumbsUp className="w-4 h-4" />
                                  <span>Helpful ({review.helpful})</span>
                                </button>
                                <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors">
                                  <ThumbsDown className="w-4 h-4" />
                                  <span>Not helpful</span>
                                </button>
                                <button className="flex items-center space-x-1 text-gray-500 hover:text-orange-600 transition-colors">
                                  <Flag className="w-4 h-4" />
                                  <span>Report</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'support' && (
                  <motion.div
                    key="support"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-emerald-500" />
                        Customer Support
                      </h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                          <Phone className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Phone Support</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Mon-Sat 9AM-6PM</p>
                          <p className="font-medium text-emerald-600 dark:text-emerald-400 mb-3">+91 98765 43210</p>
                          <Button size="sm" variant="outline">
                            Call Now
                          </Button>
                        </Card>
                        <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                          <Mail className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Email Support</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">24/7 Response</p>
                          <p className="font-medium text-blue-600 dark:text-blue-400 mb-3">support@zuice.com</p>
                          <Button size="sm" variant="outline">
                            Send Email
                          </Button>
                        </Card>
                        <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                          <MessageCircle className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Live Chat</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Instant Help</p>
                          <p className="font-medium text-purple-600 dark:text-purple-400 mb-3">Available Now</p>
                          <Button size="sm" variant="premium">
                            Start Chat
                          </Button>
                        </Card>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-blue-500" />
                        Installation & Warranty
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <Card className="p-6">
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Professional Installation</h4>
                              <p className="text-gray-600 dark:text-gray-400 mb-3">Free installation by certified technicians with 5+ years experience</p>
                              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                                <li>• Site survey and assessment</li>
                                <li>• Professional wiring and setup</li>
                                <li>• System testing and commissioning</li>
                                <li>• User training and handover</li>
                              </ul>
                            </div>
                          </div>
                        </Card>
                        <Card className="p-6">
                          <div className="flex items-start space-x-3">
                            <Shield className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Extended Warranty</h4>
                              <p className="text-gray-600 dark:text-gray-400 mb-3">{product.warranty} comprehensive warranty coverage</p>
                              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                                <li>• Manufacturing defects covered</li>
                                <li>• Performance guarantee</li>
                                <li>• Free replacement parts</li>
                                <li>• On-site repair service</li>
                              </ul>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'documentation' && (
                  <motion.div
                    key="documentation"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-emerald-500" />
                      Documentation & Resources
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center space-x-3 mb-4">
                          <FileText className="w-8 h-8 text-blue-500" />
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">User Manual</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Complete installation and operation guide</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                      </Card>
                      
                      <Card className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center space-x-3 mb-4">
                          <Video className="w-8 h-8 text-purple-500" />
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">Installation Video</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Step-by-step installation tutorial</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          <Play className="w-4 h-4 mr-2" />
                          Watch Video
                        </Button>
                      </Card>
                      
                      <Card className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center space-x-3 mb-4">
                          <Settings className="w-8 h-8 text-emerald-500" />
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">Technical Specs</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Detailed technical specifications</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </Card>
                      
                      <Card className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center space-x-3 mb-4">
                          <HelpCircle className="w-8 h-8 text-orange-500" />
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">FAQ</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Frequently asked questions</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View FAQ
                        </Button>
                      </Card>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
              <Layers className="w-6 h-6 mr-2 text-emerald-500" />
              Related Products
            </h2>
            <Link to="/products">
              <Button variant="outline" size="sm">
                View All Products
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter(p => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="aspect-square bg-gray-100 overflow-hidden relative">
                      <img
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button variant="ghost" size="sm" className="bg-white/80 backdrop-blur-sm">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(relatedProduct.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">({relatedProduct.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            ₹{relatedProduct.price.toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 block">per month</span>
                        </div>
                        <Link to={`/products/${relatedProduct.id}`}>
                          <Button size="sm" variant="outline" className="group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all">
                            View
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>

      {/* Enhanced Image Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-6xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              
              {/* Modal Controls */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-black/50 text-white hover:bg-black/70"
                  onClick={() => setShowImageModal(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              {/* Image Navigation in Modal */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
              
              {/* Image Counter in Modal */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                {selectedImageIndex + 1} of {product.images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Share Product</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowShareModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => copyToClipboard(window.location.href)}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(window.location.href)}`, '_blank')}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Share on WhatsApp
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.open(`mailto:?subject=${encodeURIComponent(product.name)}&body=${encodeURIComponent(window.location.href)}`, '_blank')}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Share via Email
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full aspect-video bg-gray-900 rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">Product Demo Video</p>
                  <p className="text-sm opacity-75">Video content will be available soon</p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 text-white hover:text-white/20"
                onClick={() => setShowVideoModal(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </ResponsiveContainer>
    </div>
  )
}