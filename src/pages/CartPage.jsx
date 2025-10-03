import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag,
  ArrowRight,
  Truck,
  Shield,
  CreditCard,
  Gift,
  Tag,
  Heart,
  Clock,
  MapPin,
  Calendar,
  CheckCircle,
  AlertCircle,
  Star,
  Percent,
  Package,
  Headphones,
  Zap,
  Info,
  Save,
  Eye,
  RotateCcw,
  Lock,
  Verified,
  TrendingUp,
  Users,
  Award
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { useCartStore } from '../store/useStore'
import { cn } from '../lib/utils'

// Enhanced Button component
const EnhancedButton = ({ children, onClick, className = '', size = 'md', variant = 'default', disabled = false, loading = false, ...props }) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  }

  const variantClasses = {
    default: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl',
    outline: 'border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
    destructive: 'bg-red-500 hover:bg-red-600 text-white',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100'
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${sizeClasses[size]} 
        ${variantClasses[variant]} 
        rounded-lg font-medium transition-all duration-200 
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center space-x-2
        ${loading ? 'cursor-wait' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  )
}

// Enhanced Badge component
const Badge = ({ children, variant = 'default', className = '', ...props }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  )
}

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore()
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)
  const [savedItems, setSavedItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSavedItems, setShowSavedItems] = useState(false)
  const [deliveryOption, setDeliveryOption] = useState('standard')
  const [estimatedDelivery, setEstimatedDelivery] = useState('')

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = deliveryOption === 'express' ? 199 : subtotal > 1000 ? 0 : 99
  const discount = appliedPromo ? subtotal * 0.1 : 0
  const tax = (subtotal - discount) * 0.08
  const total = subtotal + shipping - discount + tax

  // Calculate estimated delivery
  useEffect(() => {
    const today = new Date()
    const deliveryDays = deliveryOption === 'express' ? 1 : deliveryOption === 'standard' ? 3 : 7
    const deliveryDate = new Date(today.getTime() + deliveryDays * 24 * 60 * 60 * 1000)
    setEstimatedDelivery(deliveryDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    }))
  }, [deliveryOption])

  const handleApplyPromo = () => {
    setIsLoading(true)
    setTimeout(() => {
      if (promoCode.toLowerCase() === 'solar10') {
        setAppliedPromo({ code: 'SOLAR10', discount: 0.1, description: '10% off your order' })
      } else if (promoCode.toLowerCase() === 'welcome20') {
        setAppliedPromo({ code: 'WELCOME20', discount: 0.2, description: '20% off for new customers' })
      } else {
        alert('Invalid promo code. Try SOLAR10 or WELCOME20')
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleRemovePromo = () => {
    setAppliedPromo(null)
    setPromoCode('')
  }

  const handleSaveForLater = (item) => {
    setSavedItems([...savedItems, item])
    removeItem(item.id)
  }

  const handleMoveToCart = (item) => {
    setSavedItems(savedItems.filter(saved => saved.id !== item.id))
    // Add back to cart logic would go here
  }

  const deliveryOptions = [
    {
      id: 'economy',
      name: 'Economy Delivery',
      price: 0,
      days: '5-7 business days',
      description: 'Standard shipping for orders over $1000'
    },
    {
      id: 'standard',
      name: 'Standard Delivery',
      price: 99,
      days: '2-3 business days',
      description: 'Fast and reliable delivery'
    },
    {
      id: 'express',
      name: 'Express Delivery',
      price: 199,
      days: 'Next business day',
      description: 'Priority handling and delivery'
    }
  ]

  if (items.length === 0 && savedItems.length === 0) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container-custom py-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900 dark:to-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="h-16 w-16 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Your rental cart is empty</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Looks like you haven't added any solar inverters to rent yet.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <EnhancedButton size="lg" className="group">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Browse Rental Inverters
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </EnhancedButton>
              </Link>
              <Link to="/services">
                <EnhancedButton variant="outline" size="lg">
                  <Headphones className="w-5 h-5 mr-2" />
                  Get Expert Help
                </EnhancedButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold font-display mb-2 text-gray-900 dark:text-gray-100">
                Rental Cart
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {items.length} {items.length === 1 ? 'item' : 'items'} in your rental cart
                {savedItems.length > 0 && ` • ${savedItems.length} saved for later`}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {savedItems.length > 0 && (
                <EnhancedButton
                  variant="outline"
                  onClick={() => setShowSavedItems(!showSavedItems)}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Saved ({savedItems.length})
                </EnhancedButton>
              )}
              <Badge variant="info" className="flex items-center">
                <Shield className="w-3 h-3 mr-1" />
                Secure Checkout
              </Badge>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Indicator */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <span className="font-medium text-emerald-600">Cart</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-gray-200 dark:bg-gray-700 mx-4"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 text-gray-500 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <span className="text-gray-500">Checkout</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-gray-200 dark:bg-gray-700 mx-4"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 text-gray-500 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <span className="text-gray-500">Confirmation</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cart Items */}
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-6">
                        {/* Product Image */}
                        <div className="w-24 h-24 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900 dark:to-emerald-800 rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <Zap className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                          )}
                          {item.inStock && (
                            <Badge variant="success" className="absolute -top-1 -right-1 text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              In Stock
                            </Badge>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <h3 className="text-lg font-semibold hover:text-emerald-600 transition-colors">
                                <Link to={`/products/${item.id}`} className="flex items-center space-x-2">
                                  {item.name}
                                  <Eye className="w-4 h-4 opacity-50" />
                                </Link>
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                High-efficiency solar inverter • SKU: {item.id}
                              </p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span className="flex items-center">
                                  <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
                                  4.8 (124 reviews)
                                </span>
                                <span className="flex items-center">
                                  <Award className="w-3 h-3 mr-1" />
                                  2-Year Warranty
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <EnhancedButton
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSaveForLater(item)}
                                className="text-gray-500 hover:text-emerald-600"
                              >
                                <Heart className="h-4 w-4" />
                              </EnhancedButton>
                              <EnhancedButton
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="text-gray-500 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </EnhancedButton>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                ${(item.price * item.quantity).toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-500">
                                ${item.price.toLocaleString()} each
                              </div>
                              {item.originalPrice && (
                                <div className="text-xs text-gray-400 line-through">
                                  ${item.originalPrice.toLocaleString()} each
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Rental Terms */}
                          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                            <div className="flex items-center space-x-2 text-sm">
                              <Info className="w-4 h-4 text-blue-500" />
                              <span className="text-blue-700 dark:text-blue-300">
                                Monthly rental • Free installation • 24/7 support included
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Saved Items */}
            <AnimatePresence>
              {showSavedItems && savedItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Heart className="w-5 h-5 mr-2 text-red-500" />
                        Saved for Later ({savedItems.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {savedItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900 dark:to-emerald-800 rounded-lg flex items-center justify-center">
                              <Zap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">{item.name}</h4>
                              <p className="text-xs text-gray-500">${item.price.toLocaleString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <EnhancedButton
                              variant="outline"
                              size="sm"
                              onClick={() => handleMoveToCart(item)}
                            >
                              Move to Cart
                            </EnhancedButton>
                            <EnhancedButton
                              variant="ghost"
                              size="sm"
                              onClick={() => setSavedItems(savedItems.filter(saved => saved.id !== item.id))}
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </EnhancedButton>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <EnhancedButton
                variant="outline"
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Rental Cart
              </EnhancedButton>
              <Link to="/products">
                <EnhancedButton variant="outline">
                  <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                  Continue Browsing
                </EnhancedButton>
              </Link>
            </motion.div>
          </div>

          {/* Enhanced Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Delivery Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Delivery Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {deliveryOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      deliveryOption === option.id
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => setDeliveryOption(option.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          deliveryOption === option.id
                            ? 'border-emerald-500 bg-emerald-500'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}>
                          {deliveryOption === option.id && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{option.name}</div>
                          <div className="text-xs text-gray-500">{option.days}</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        {option.price === 0 ? 'FREE' : `$${option.price}`}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>Estimated delivery: {estimatedDelivery}</span>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Promo Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Tag className="h-5 w-5 mr-2" />
                  Promo Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!appliedPromo ? (
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      />
                      <EnhancedButton 
                        onClick={handleApplyPromo} 
                        disabled={!promoCode}
                        loading={isLoading}
                      >
                        Apply
                      </EnhancedButton>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs text-gray-500">Available codes:</div>
                      <div className="flex flex-wrap gap-2">
                        <Badge 
                          variant="info" 
                          className="cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800"
                          onClick={() => setPromoCode('SOLAR10')}
                        >
                          <Percent className="w-3 h-3 mr-1" />
                          SOLAR10 - 10% off
                        </Badge>
                        <Badge 
                          variant="success" 
                          className="cursor-pointer hover:bg-green-200 dark:hover:bg-green-800"
                          onClick={() => setPromoCode('WELCOME20')}
                        >
                          <Gift className="w-3 h-3 mr-1" />
                          WELCOME20 - 20% off
                        </Badge>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <div>
                        <div className="font-medium text-green-800 dark:text-green-200">{appliedPromo.code}</div>
                        <div className="text-sm text-green-600 dark:text-green-300">{appliedPromo.description}</div>
                      </div>
                    </div>
                    <EnhancedButton
                      variant="ghost"
                      size="sm"
                      onClick={handleRemovePromo}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </EnhancedButton>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enhanced Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal ({items.length} items)</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  
                  {appliedPromo && (
                    <div className="flex justify-between text-green-600">
                      <span className="flex items-center">
                        <Tag className="w-4 h-4 mr-1" />
                        Discount ({appliedPromo.code})
                      </span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="flex items-center">
                      <Truck className="w-4 h-4 mr-1" />
                      Shipping
                      {shipping === 0 && (
                        <Badge variant="success" className="ml-2 text-xs">
                          FREE
                        </Badge>
                      )}
                    </span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="flex items-center">
                      <CreditCard className="w-4 h-4 mr-1" />
                      Tax
                    </span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-emerald-600">${total.toFixed(2)}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Monthly rental payment
                    </div>
                  </div>
                </div>

                <EnhancedButton size="lg" className="w-full group">
                  <Lock className="w-5 h-5 mr-2" />
                  Proceed to Secure Checkout
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </EnhancedButton>

                {/* Enhanced Payment Methods */}
                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="mb-3 font-medium">Secure Payment Options</div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="flex items-center justify-center space-x-1 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <div className="w-6 h-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                        VISA
                      </div>
                      <div className="w-6 h-4 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                        MC
                      </div>
                    </div>
                    <div className="flex items-center justify-center space-x-1 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <div className="w-6 h-4 bg-purple-500 rounded text-white text-xs flex items-center justify-center font-bold">
                        AMEX
                      </div>
                      <div className="w-6 h-4 bg-yellow-500 rounded text-white text-xs flex items-center justify-center font-bold">
                        PP
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-4 text-xs">
                    <span className="flex items-center">
                      <Shield className="w-3 h-3 mr-1 text-green-500" />
                      SSL Encrypted
                    </span>
                    <span className="flex items-center">
                      <Verified className="w-3 h-3 mr-1 text-blue-500" />
                      PCI Compliant
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Benefits */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                      <Truck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Free Installation</div>
                      <div className="text-xs text-gray-500">
                        Professional setup included
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">24/7 Support</div>
                      <div className="text-xs text-gray-500">
                        Round-the-clock assistance
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <RotateCcw className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Flexible Terms</div>
                      <div className="text-xs text-gray-500">
                        Cancel or upgrade anytime
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                      <Award className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">2-Year Warranty</div>
                      <div className="text-xs text-gray-500">
                        Full coverage included
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center space-x-2">
                    <Users className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm font-medium">Trusted by 50,000+ customers</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">4.9/5 rating</span>
                  </div>
                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      99.9% Uptime
                    </span>
                    <span className="flex items-center">
                      <Package className="w-3 h-3 mr-1" />
                      Same-day dispatch
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}