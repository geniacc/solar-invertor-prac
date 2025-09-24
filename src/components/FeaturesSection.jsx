import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Shield, 
  Gauge, 
  Wifi, 
  Battery, 
  Sun, 
  TrendingUp, 
  Award,
  Play,
  X,
  ChevronRight,
  Star,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Cloud,
  Settings,
  BarChart3
} from 'lucide-react';
import './FeaturesSection.css';

const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [expandedDetails, setExpandedDetails] = useState(null);
  const sectionRef = useRef(null);

  const features = [
    {
      icon: Zap,
      title: "MPPT Solar Charge Controller",
      description: "99.5% MPPT efficiency with advanced microcontroller design",
      details: "Zuice's MPPT controller maximizes solar energy harvest with intelligent tracking algorithms and real-time optimization for maximum power point tracking. Ensures up to 30% more energy capture compared to traditional controllers.",
      color: "from-yellow-400 to-orange-500",
      progress: 99
    },
    {
      icon: Shield,
      title: "Multiple Protection Systems",
      description: "10+ safety features including overload, short circuit, and thermal protection",
      details: "Comprehensive protection with overload, deep discharge, overcharge, short circuit, PV reverse, over-temperature, battery reverse, and surge protection.",
      color: "from-purple-400 to-purple-500",
      progress: 100
    },
    {
      icon: Battery,
      title: "Pure Sine Wave Output",
      description: "Clean, stable power output for sensitive electronic equipment",
      details: "Pure sine wave inverter technology provides clean, stable power identical to grid electricity, perfect for all types of appliances and sensitive electronics.",
      color: "from-green-400 to-emerald-500",
      progress: 100
    },
    {
      icon: Gauge,
      title: "LCD Display Monitoring",
      description: "Real-time system status with comprehensive parameter display",
      details: "Advanced LCD display shows PV voltage/current, battery voltage, load current, inverter status, charging status, and fault diagnostics in real-time.",
      color: "from-blue-400 to-indigo-500",
      progress: 100
    },
    {
      icon: Sun,
      title: "Hybrid Functionality",
      description: "Solar + Grid + Battery integration with intelligent switching",
      details: "Seamless integration of solar panels, grid power, and battery backup with automatic switching and priority management for optimal energy utilization.",
      color: "from-orange-400 to-red-500",
      progress: 98
    },
    {
      icon: Settings,
      title: "Smart Load Management",
      description: "Intelligent power distribution and energy optimization",
      details: "Advanced load management with priority switching, energy optimization algorithms, and automatic load shedding for maximum efficiency and battery life.",
      color: "from-purple-400 to-pink-500",
      progress: 95
    }
  ];

  const products = [
    {
      id: 1,
      name: "Zuice-12V-1KVA",
      image: "/src/assets/solar-banner-removebg-preview.png",
      price: "₹25,000",
      originalPrice: "₹30,000",
      rating: 4.8,
      reviews: 156,
      efficiency: "99.5%",
      warranty: "2 years",
      features: ["12V System", "1KVA Output", "MPPT Controller", "Pure Sine Wave"]
    },
    {
      id: 2,
      name: "Zuice-24V-2KVA",
      image: "/src/assets/solar-banner-removebg-preview.png",
      price: "₹35,000",
      originalPrice: "₹42,000",
      rating: 4.9,
      reviews: 203,
      efficiency: "99.5%",
      warranty: "2 years",
      features: ["24V System", "2KVA Output", "Hybrid Mode", "LCD Display"]
    },
    {
      id: 3,
      name: "Zuice-48V-3KVA",
      image: "/src/assets/solar-banner-removebg-preview.png",
      price: "₹45,000",
      originalPrice: "₹55,000",
      rating: 4.9,
      reviews: 178,
      efficiency: "99.5%",
      warranty: "2 years",
      features: ["48V System", "3KVA Output", "Smart Management", "Multiple Protection"]
    },
    {
      id: 4,
      name: "Zuice-48V-5KVA",
      image: "/src/assets/solar-banner-removebg-preview.png",
      price: "₹65,000",
      originalPrice: "₹75,000",
      rating: 4.9,
      reviews: 142,
      efficiency: "99.5%",
      warranty: "2 years",
      features: ["48V System", "5KVA Output", "Commercial Grade", "Advanced Monitoring"]
    }
  ];

  const rotatingFeatures = [
    { icon: Battery, text: "Pure Sine Wave" },
    { icon: Sun, text: "MPPT Technology" },
    { icon: Gauge, text: "LCD Monitoring" },
    { icon: Shield, text: "10+ Protections" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const ProductDetailsModal = ({ product, onClose }) => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
          
          <div className="modal-body">
            <div className="modal-image">
              <img src={product.image} alt={product.name} />
            </div>
            
            <div className="modal-info">
              <h3>{product.name}</h3>
              <div className="modal-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"} />
                  ))}
                </div>
                <span>{product.rating} ({product.reviews} reviews)</span>
              </div>
              
              <div className="modal-specs">
                <div className="spec-item">
                  <span>Efficiency:</span>
                  <span>{product.efficiency}</span>
                </div>
                <div className="spec-item">
                  <span>Warranty:</span>
                  <span>{product.warranty}</span>
                </div>
              </div>
              
              <div className="modal-features">
                <h4>Key Features:</h4>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>
                      <CheckCircle size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="modal-price">
                <span className="current-price">{product.price}</span>
                <span className="original-price">{product.originalPrice}</span>
              </div>
              
              <button className="cta-button primary">
                Add to Cart
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <section className="features-section" ref={sectionRef}>
      {/* 3D Background Elements */}
      <div className="bg-3d">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="section-header"
      >
        <h2 className="text-foreground">Revolutionary Technology Solutions</h2>
        <p className="text-muted-foreground">Experience the future of technology innovation with our cutting-edge enterprise solutions</p>
      </motion.div>

      {/* 3D Featured Product Showcase */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
        className="featured-showcase"
      >
        <div className="showcase-3d">
          <div className="product-3d">
            <div className="product-model">
              <div className="inverter-body">
                <div className="led-indicator active"></div>
                <div className="display-screen">
                  <div className="screen-content">
                    <div className="power-reading">5.2kW</div>
                    <div className="efficiency-bar">
                      <div className="efficiency-fill" style={{width: '98%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="showcase-info">
            <h3>TechPro Enterprise Series</h3>
            <p>Industry-leading efficiency meets intelligent design</p>
            <div className="showcase-stats">
              <div className="stat">
                <span className="stat-value">98.5%</span>
                <span className="stat-label">Peak Efficiency</span>
              </div>
              <div className="stat">
                <span className="stat-value">25Y</span>
                <span className="stat-label">Warranty</span>
              </div>
              <div className="stat">
                <span className="stat-value">IP65</span>
                <span className="stat-label">Protection</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Rolling Gallery */}
      <div className="rolling-gallery">
        <div className="gallery-track">
          {products.concat(products).map((product, index) => (
            <motion.div
              key={`${product.id}-${index}`}
              className="gallery-item"
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setSelectedProduct(product);
                setShowModal(true);
              }}
            >
              <div className="gallery-image">
                <img src={product.image} alt={product.name} />
                <div className="gallery-overlay">
                  <Play size={32} />
                </div>
              </div>
              <div className="gallery-info">
                <h4>{product.name}</h4>
                <div className="gallery-price">
                  <span className="current">{product.price}</span>
                  <span className="original">{product.originalPrice}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="features-grid">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`feature-card ${activeFeature === index ? 'active' : ''}`}
            onMouseEnter={() => setActiveFeature(index)}
          >
            <div className={`feature-icon bg-gradient-to-r ${feature.color}`}>
              <feature.icon size={32} />
            </div>
            
            <div className="feature-content">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              
              <button
                className="feature-button"
                onClick={() => setExpandedDetails(expandedDetails === index ? null : index)}
              >
                Learn More
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Efficiency Progress Bar */}
            <div className="efficiency-progress">
              <div className="progress-label">
                <span>Performance</span>
                <span>{feature.progress}%</span>
              </div>
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: `${feature.progress}%` } : {}}
                  transition={{ duration: 1.5, delay: index * 0.2 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Feature Tags */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        className="feature-tags"
      >
        {rotatingFeatures.map((item, index) => (
          <motion.div
            key={index}
            className="feature-tag"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 3,
              delay: index * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <item.icon size={20} />
            <span>{item.text}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Expanded Details */}
      <AnimatePresence>
        {expandedDetails !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="expanded-details"
          >
            <div className="details-content">
              <h4>{features[expandedDetails].title} - Deep Dive</h4>
              <p>{features[expandedDetails].details}</p>
              <button
                className="close-details"
                onClick={() => setExpandedDetails(null)}
              >
                <X size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Price Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="price-section"
      >
        <h3>Starting from <span className="price-highlight">$1,899</span></h3>
        <p>Professional installation and 25-year warranty included</p>
        <div className="price-features">
          <div className="price-feature">
            <CheckCircle size={20} />
            <span>Free Site Assessment</span>
          </div>
          <div className="price-feature">
            <CheckCircle size={20} />
            <span>Professional Installation</span>
          </div>
          <div className="price-feature">
            <CheckCircle size={20} />
            <span>25-Year Warranty</span>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="action-buttons"
      >
        <button className="cta-button primary">
          Shop Now
          <ArrowRight size={20} />
        </button>
        <button className="cta-button secondary">
          Get Quote
        </button>
      </motion.div>

      {/* Product Details Modal */}
      {showModal && selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => {
            setShowModal(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </section>
  );
};

export default FeaturesSection;