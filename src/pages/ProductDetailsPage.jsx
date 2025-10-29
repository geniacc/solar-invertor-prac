import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Zap, 
  Battery, 
  Shield, 
  Truck, 
  Award, 
  CheckCircle, 
  Info,
  Download,
  Phone,
  Mail,
  MapPin,
  Clock,
  Thermometer,
  Ruler,
  BarChart3,
  Gauge,
  AlertTriangle,
  Plus,
  Minus,
  Eye,
  ZoomIn,
  MessageCircle
} from 'lucide-react';
import { essProducts } from '../data/essProducts';
import { useCartStore } from '../store/useStore';
import { useTheme } from '../hooks/useTheme';
import Navbar from '../components/Navbar';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const { addItem, items } = useCartStore();
  const { theme } = useTheme();

  useEffect(() => {
    const foundProduct = essProducts.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setLoading(false);
    } else {
      navigate('/products');
    }
  }, [id, navigate]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const isInCart = () => {
    return items.some(item => item.id === product?.id);
  };

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const relatedProducts = essProducts
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 dark:border-blue-400"></div>
        </div>
      </div>
    );
  }

  const productImages = product.gallery || [product.image];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Home</Link>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <Link to="/products" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Products</Link>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <span className="text-gray-900 dark:text-gray-100 capitalize">{product.category.replace('-', ' ')}</span>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <span className="text-gray-900 dark:text-gray-100 truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Products</span>
        </button>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Product added to cart successfully!</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group transition-colors duration-300">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-contain cursor-zoom-in"
                onClick={() => setShowImageModal(true)}
                onError={(e) => {
                  e.target.src = '/images/placeholder-product.svg';
                }}
              />
              <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-md text-sm font-semibold z-20">
                Zuice
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                <button
                  onClick={() => setShowImageModal(true)}
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded-full opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
              </div>
              {product.badge && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-blue-500 dark:border-blue-400' 
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.src = '/images/placeholder-product.svg';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category and Rating */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium uppercase tracking-wide">
                {product.category.replace('-', ' ')}
              </span>
              <div className="flex items-center space-x-1">
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
                <span className="text-sm text-gray-600 dark:text-gray-400">{product.rating}</span>
                <span className="text-sm text-gray-400 dark:text-gray-500">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{product.name}</h1>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{product.description}</p>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-2 rounded-lg transition-colors duration-300">
                <Battery className="w-5 h-5" />
                <span className="font-medium">{product.specifications?.Energy || product.specifications?.Capacity}</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-2 rounded-lg transition-colors duration-300">
                <Zap className="w-5 h-5" />
                <span className="font-medium">{product.specifications?.['Cycle Life']}</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-3 py-2 rounded-lg transition-colors duration-300">
                <Shield className="w-5 h-5" />
                <span className="font-medium">Advanced Safety</span>
              </div>
              <div className="flex items-center space-x-2 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-3 py-2 rounded-lg transition-colors duration-300">
                <Award className="w-5 h-5" />
                <span className="font-medium">Premium Quality</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 transition-colors duration-300">
              <div className="flex items-baseline space-x-3 mb-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discount && (
                  <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-1 rounded-full text-sm font-semibold">
                    Save {product.discount}%
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className={`flex items-center space-x-2 mb-4 ${product.inStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="font-medium">{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                {product.inStock && (
                  <span className="text-gray-500 dark:text-gray-400">• Ready to ship</span>
                )}
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-300">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium text-gray-900 dark:text-gray-100">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isInCart()}
                  className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    !product.inStock || isInCart()
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>{isInCart() ? 'Added to Cart' : 'Add to Cart'}</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
                    isWishlisted
                      ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-700'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-700 transition-all">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 transition-colors duration-300">
              <div className="flex items-center space-x-3 mb-2">
                <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-blue-900 dark:text-blue-300">Free Delivery</span>
              </div>
              <p className="text-blue-700 dark:text-blue-400 text-sm">
                Get free delivery on this product. Estimated delivery: 3-5 business days.
              </p>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-12 transition-colors duration-300">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: Info },
                { id: 'specifications', name: 'Specifications', icon: BarChart3 },
                { id: 'features', name: 'Features', icon: CheckCircle },
                { id: 'safety', name: 'Safety', icon: Shield }
              ].map(tab => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Product Overview</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{product.description}</p>
                  
                  {product.detailedDescription && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-3 flex items-center">
                        <Info className="w-5 h-5 mr-2" />
                        Detailed Description
                      </h4>
                      <p className="text-blue-800 dark:text-blue-200 leading-relaxed">{product.detailedDescription}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {product.applications && product.applications.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                          <Zap className="w-5 h-5 mr-2 text-green-500" />
                          Key Applications
                        </h4>
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                          <ul className="space-y-3">
                            {product.applications.map((app, index) => (
                              <li key={index} className="flex items-start space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 dark:text-gray-300">{app}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                    
                    {product.benefits && product.benefits.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                          <Award className="w-5 h-5 mr-2 text-blue-500" />
                          Key Benefits
                        </h4>
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                          <ul className="space-y-3">
                            {product.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-start space-x-3">
                                <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Technical Specifications</h3>
                  <p className="text-gray-600 dark:text-gray-300">Detailed technical parameters and performance metrics</p>
                </div>
                
                {product.specifications && Object.keys(product.specifications).length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <div key={key} className="group bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">{key}</span>
                          </div>
                          <span className="text-gray-900 dark:text-gray-100 font-semibold bg-white dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
                            {value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">Technical specifications will be available soon.</p>
                  </div>
                )}
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mt-8">
                  <div className="flex items-start space-x-3">
                    <Info className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Technical Support</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        Need detailed technical documentation or have specific questions about these specifications? Contact our technical support team for comprehensive assistance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Product Features</h3>
                  <p className="text-gray-600 dark:text-gray-300">Advanced capabilities and innovative technology</p>
                </div>
                
                {product.features && product.features.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {product.features.map((feature, index) => (
                      <div key={index} className="group relative overflow-hidden bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-green-100 dark:border-green-800/30 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{feature}</p>
                          </div>
                        </div>
                        <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/5 dark:bg-green-400/5 rounded-full -translate-y-10 translate-x-10"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">Product features information will be available soon.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'safety' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Safety Features</h3>
                  <p className="text-gray-600 dark:text-gray-300">Comprehensive protection systems for reliable and secure operation</p>
                </div>
                
                {product.safetyFeatures && product.safetyFeatures.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {product.safetyFeatures.map((feature, index) => (
                      <div key={index} className="group relative overflow-hidden bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-red-100 dark:border-red-800/30 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/40 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{feature}</p>
                          </div>
                        </div>
                        <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 dark:bg-red-400/5 rounded-full -translate-y-10 translate-x-10"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Shield className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">Safety features information will be available soon.</p>
                  </div>
                )}
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-6 mt-8">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Safety Notice</h4>
                      <p className="text-yellow-700 dark:text-yellow-200 text-sm leading-relaxed">
                        Always follow proper installation guidelines and safety procedures. Consult with certified professionals for installation and maintenance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <Link
                  key={relatedProduct.id}
                  to={`/products/${relatedProduct.id}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = '/images/placeholder-product.svg';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {formatPrice(relatedProduct.price)}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{relatedProduct.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Contact Section */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 transition-colors duration-300">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Need Help?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Have questions about this product? Our experts are here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
              <Phone className="w-5 h-5" />
              <span>Call Us</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 px-6 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors duration-300">
              <MessageCircle className="w-5 h-5" />
              <span>Live Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative w-[90vw] h-[85vh]">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <Plus className="w-8 h-8 rotate-45" />
            </button>
            <img
              src={productImages[selectedImage]}
              alt={product.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.src = '/images/placeholder-product.svg';
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;