import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { 
  Star, 
  Shield, 
  Zap, 
  Award,
  Truck,
  RotateCcw,
  Heart,
  Share2,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  Check,
  Info,
  Eye
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { useCartStore } from '../store/useStore'
import { cn } from '../lib/utils'
import Inverter3DModal from '../components/Inverter3DModal'

// Mock product data - in real app, this would come from API
const productData = {
  1: {
    id: 1,
    name: 'SolarPro Max 5000',
    price: 1299,
    originalPrice: 1499,
    rating: 4.9,
    reviewCount: 234,
    images: [
      '/api/placeholder/600/600',
      '/api/placeholder/600/600',
      '/api/placeholder/600/600',
      '/api/placeholder/600/600'
    ],
    category: 'residential',
    power: '5kW',
    efficiency: '98.2%',
    warranty: '25 years',
    inStock: true,
    stockCount: 15,
    description: 'The SolarPro Max 5000 represents the pinnacle of residential solar inverter technology. With industry-leading 98.2% efficiency and advanced MPPT technology, this inverter maximizes your solar energy harvest while providing unmatched reliability.',
    features: [
      'Advanced MPPT Technology',
      'WiFi Monitoring Included',
      'Weather Resistant IP65 Rating',
      'Smart Grid Ready',
      'Mobile App Control',
      'Rapid Shutdown Compliant'
    ],
    specifications: {
      'Power Output': '5000W',
      'Input Voltage Range': '200-600V DC',
      'Output Voltage': '240V AC',
      'Efficiency': '98.2%',
      'Operating Temperature': '-25°C to +60°C',
      'Dimensions': '665 × 460 × 180 mm',
      'Weight': '22 kg',
      'Protection Rating': 'IP65',
      'Warranty': '25 years',
      'Certifications': 'UL 1741, IEEE 1547'
    },
    benefits: [
      {
        icon: Zap,
        title: 'Maximum Efficiency',
        description: '98.2% conversion efficiency means more power for your home'
      },
      {
        icon: Shield,
        title: 'Advanced Protection',
        description: 'Built-in surge protection and fault detection systems'
      },
      {
        icon: Award,
        title: 'Industry Leading Warranty',
        description: '25-year comprehensive warranty for peace of mind'
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'John Smith',
        rating: 5,
        date: '2024-01-15',
        comment: 'Excellent inverter! Installation was smooth and the monitoring app is fantastic. My energy production has increased by 15% compared to my old inverter.',
        verified: true
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        rating: 5,
        date: '2024-01-10',
        comment: 'Very happy with this purchase. The build quality is outstanding and customer support was very helpful during installation.',
        verified: true
      },
      {
        id: 3,
        name: 'Mike Chen',
        rating: 4,
        date: '2024-01-05',
        comment: 'Great product overall. The efficiency is as advertised and the monitoring features are comprehensive. Slightly expensive but worth it.',
        verified: true
      }
    ]
  }
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [show3DModal, setShow3DModal] = useState(false)
  
  const addItem = useCartStore(state => state.addItem)
  
  const product = productData[id]
  
  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity
    })
  }

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: `Reviews (${product.reviews.length})` }
  ]

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary">Products</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="aspect-square bg-gradient-to-br from-primary/5 to-solar-500/5 rounded-2xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <Zap className="h-32 w-32 text-primary/30" />
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "aspect-square bg-gradient-to-br from-primary/5 to-solar-500/5 rounded-lg overflow-hidden border-2 transition-colors",
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent hover:border-primary/50"
                  )}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Zap className="h-8 w-8 text-primary/30" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold font-display">
                    {product.name}
                  </h1>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          )}
                        />
                      ))}
                      <span className="text-sm font-medium ml-2">
                        {product.rating} ({product.reviews.length} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart className={cn(
                      "h-4 w-4",
                      isWishlisted ? "fill-red-500 text-red-500" : ""
                    )} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold">${product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice > product.price && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    Save ${product.originalPrice - product.price}
                  </span>
                )}
              </div>

              {/* Key Specs */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-bold">{product.power}</div>
                  <div className="text-sm text-muted-foreground">Power</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">{product.efficiency}</div>
                  <div className="text-sm text-muted-foreground">Efficiency</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">{product.warranty}</div>
                  <div className="text-sm text-muted-foreground">Warranty</div>
                </div>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {product.inStock ? (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-medium">
                    In Stock ({product.stockCount} available)
                  </span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  Add to Cart - ${(product.price * quantity).toLocaleString()}
                </Button>
                <Button variant="outline" size="lg">
                  Buy Now
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setShow3DModal(true)}
                  className="px-4"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  3D View
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="font-semibold">Key Features:</h3>
              <div className="grid grid-cols-1 gap-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium text-sm">Free Shipping</div>
                  <div className="text-xs text-muted-foreground">Orders over $1000</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium text-sm">30-Day Returns</div>
                  <div className="text-xs text-muted-foreground">Easy returns</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium text-sm">Warranty</div>
                  <div className="text-xs text-muted-foreground">{product.warranty}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-8"
        >
          {/* Tab Navigation */}
          <div className="border-b">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'description' && (
              <div className="space-y-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {product.benefits.map((benefit, index) => (
                    <Card key={index} className="text-center">
                      <CardHeader>
                        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                          <benefit.icon className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{benefit.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          {benefit.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-border/50">
                          <span className="font-medium">{key}</span>
                          <span className="text-muted-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Installation & Maintenance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Info className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Professional Installation Required</div>
                        <div className="text-sm text-muted-foreground">
                          Must be installed by certified electrician
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Info className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Minimal Maintenance</div>
                        <div className="text-sm text-muted-foreground">
                          Annual inspection recommended
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Info className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Remote Monitoring</div>
                        <div className="text-sm text-muted-foreground">
                          24/7 performance tracking via mobile app
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Reviews Summary */}
                <div className="grid md:grid-cols-3 gap-8">
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <div className="text-4xl font-bold mb-2">{product.rating}</div>
                      <div className="flex items-center justify-center space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-4 w-4",
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                            )}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Based on {product.reviews.length} reviews
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const count = product.reviews.filter(r => r.rating === rating).length
                          const percentage = (count / product.reviews.length) * 100
                          return (
                            <div key={rating} className="flex items-center space-x-3">
                              <span className="text-sm w-8">{rating}★</span>
                              <div className="flex-1 bg-muted rounded-full h-2">
                                <div
                                  className="bg-yellow-400 h-2 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground w-8">
                                {count}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="font-medium">{review.name}</div>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={cn(
                                      "h-3 w-3",
                                      i < review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-muted-foreground"
                                    )}
                                  />
                                ))}
                              </div>
                              {review.verified && (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                  Verified Purchase
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
      
      {/* 3D Modal */}
      <Inverter3DModal 
        isVisible={show3DModal}
        onClose={() => setShow3DModal(false)}
        product={product}
      />
    </div>
  )
}