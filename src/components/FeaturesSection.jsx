import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
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
  BarChart3,
  Eye,
  Camera
} from 'lucide-react';
import './FeaturesSection.css';
import LithiumInverter3DModal from './LithiumInverter3DModal';
import ARCameraView from './ARCameraView';
import { essProducts } from '../data/essProducts';
import { useResponsive } from '../hooks/useResponsive';

const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [expandedDetails, setExpandedDetails] = useState(null);
  const [show3DModal, setShow3DModal] = useState(false);
  const [showARModal, setShowARModal] = useState(false);
  const [isGalleryDragging, setIsGalleryDragging] = useState(false);
  const [isGalleryResuming, setIsGalleryResuming] = useState(false);
  const sectionRef = useRef(null);
  const { isMobile } = useResponsive();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(Boolean(mq.matches));
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);
  const trackX = useMotionValue(0);
  const galleryTrackRef = useRef(null);

  // Get featured product from essProducts (using the 48V 100AH as featured)
  const featuredProduct = essProducts.find(product => product.id === "home-ess-48v") || essProducts[2];
  
  // TechPro Enterprise Series product data for 3D modal (using real product data)
  const techProProduct = {
    id: featuredProduct.id,
    name: featuredProduct.name,
    model: featuredProduct.id.toUpperCase(),
    price: `₹${featuredProduct.price.toLocaleString()}`,
    originalPrice: `₹${featuredProduct.originalPrice.toLocaleString()}`,
    rating: featuredProduct.rating,
    reviews: featuredProduct.reviews,
    efficiency: featuredProduct.specifications?.Efficiency || '>95%',
    warranty: featuredProduct.specifications?.Warranty || '60 months',
    power: featuredProduct.specifications?.Energy || '4.8 kWh',
    voltage: featuredProduct.specifications?.['Voltage Range'] || '48V',
    features: featuredProduct.features || [
      'Advanced BMS Protection',
      'High Energy Density',
      'Long Cycle Life',
      'Fast & Efficient Charging',
      'Smart Monitoring'
    ],
    specifications: featuredProduct.specifications || {}
  };

  const features = [
    {
      icon: Battery,
      title: "Advanced BMS Protection",
      description: "Smart Battery Management System with comprehensive safety features",
      details: "Intelligent BMS provides overcharge protection, over-discharge protection, short circuit protection, temperature monitoring, and cell balancing for optimal performance and safety.",
      color: "from-green-400 to-emerald-500",
      progress: 100
    },
    {
      icon: Zap,
      title: "High Energy Density",
      description: "Compact design with powerful energy storage capacity",
      details: "LiFePO4 technology delivers superior energy density, allowing more power storage in a smaller footprint compared to traditional lead-acid batteries.",
      color: "from-yellow-400 to-orange-500",
      progress: 98
    },
    {
      icon: TrendingUp,
      title: "Long Cycle Life",
      description: "8000+ charge-discharge cycles for extended lifespan",
      details: "Premium lithium-ion cells engineered for longevity, providing over 8000 cycles at 80% depth of discharge, ensuring years of reliable operation.",
      color: "from-blue-400 to-indigo-500",
      progress: 100
    },
    {
      icon: Gauge,
      title: "High Efficiency",
      description: "Over 95% efficiency for maximum energy utilization",
      details: "Advanced power electronics and intelligent control systems ensure minimal energy loss during charging and discharging operations.",
      color: "from-purple-400 to-purple-500",
      progress: 95
    },
    {
      icon: Wifi,
      title: "Smart Monitoring",
      description: "RS485/CAN communication for real-time monitoring",
      details: "Integrated communication protocols enable remote monitoring, diagnostics, and system optimization through compatible energy management systems.",
      color: "from-cyan-400 to-blue-500",
      progress: 100
    },
    {
      icon: Shield,
      title: "Safety Certified",
      description: "IP54/IP65 protection rating with multiple safety certifications",
      details: "Engineered to meet international safety standards with robust enclosure design, thermal protection, and fail-safe mechanisms for reliable operation.",
      color: "from-red-400 to-pink-500",
      progress: 100
    }
  ];

  // Get featured products from essProducts (home ESS products)
  const products = essProducts
    .filter(product => product.category === 'home-ess')
    .slice(0, 4)
    .map(product => ({
      id: product.id,
      name: product.name,
      image: product.image,
      price: `₹${product.price.toLocaleString()}`,
      originalPrice: `₹${product.originalPrice.toLocaleString()}`,
      rating: product.rating,
      reviews: product.reviews,
      efficiency: product.specifications?.Efficiency || '>95%',
      warranty: product.specifications?.Warranty || '60 months',
      features: [
        product.specifications?.Energy || product.specifications?.Capacity,
        `${product.specifications?.['Cycle Life']} cycles`,
        product.specifications?.['Cell Type'] || 'LiFePO4',
        product.specifications?.Communication || 'Smart BMS'
      ].filter(Boolean)
    }));

  const rotatingFeatures = [
    { icon: Battery, text: "LiFePO4 Technology" },
    { icon: Shield, text: "Advanced BMS" },
    { icon: TrendingUp, text: "8000+ Cycles" },
    { icon: Wifi, text: "Smart Monitoring" }
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
  }, [features.length]);

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
                Add to Rental Cart
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <section className="features-section section-padding mobile-section-tight" ref={sectionRef}>
      {/* 3D Background Elements */}
      {!isMobile && !prefersReducedMotion && (
        <div className="bg-3d" style={{ willChange: 'transform' }}>
          <div className="floating-orb orb-1"></div>
          <div className="floating-orb orb-2"></div>
          <div className="floating-orb orb-3"></div>
        </div>
      )}

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="section-header"
      >
        <h2 className="text-foreground typo-h2-tight">Revolutionary Technology Solutions</h2>
        <p className="text-muted-foreground typo-lead-tight">Experience the future of technology innovation with our cutting-edge enterprise solutions</p>
      </motion.div>

      {/* 3D Featured Product Showcase */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
        className="featured-showcase"
      >
        <div className="showcase-3d">
          <motion.div 
            className="product-3d clickable-3d"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShow3DModal(true)}
          >
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
            <div className="view-3d-overlay">
              <Eye className="view-3d-icon" />
              <span>View 3D Model</span>
            </div>
          </motion.div>
          
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
            <div className="showcase-buttons">
              <motion.button
                className="view-3d-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShow3DModal(true)}
              >
                <Eye className="mr-2 h-5 w-5" />
                View 3D Model
              </motion.button>
              
              <motion.button
                className="view-ar-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowARModal(true)}
              >
                <Camera className="mr-2 h-5 w-5" />
                Try AR View
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Rolling Gallery */}
      <div className="rolling-gallery" aria-roledescription="carousel">
        <motion.div
          ref={galleryTrackRef}
          className={`gallery-track ${isGalleryDragging ? 'paused' : ''} ${isGalleryResuming ? 'resuming' : ''}`}
          drag={isMobile ? 'x' : false}
          dragElastic={0.15}
          dragMomentum={true}
          onDragStart={() => setIsGalleryDragging(true)}
          onDragEnd={() => {
            const trackEl = galleryTrackRef.current;
            const firstItem = trackEl?.querySelector('.gallery-item');
            const itemWidth = firstItem ? firstItem.getBoundingClientRect().width : 200;
            let gapPx = 16;
            if (trackEl) {
              const style = window.getComputedStyle(trackEl);
              const gapStr = style.gap || style.columnGap || '16px';
              const parsed = parseInt(gapStr, 10);
              if (!Number.isNaN(parsed)) gapPx = parsed;
            }
            const step = itemWidth + gapPx;
            const current = trackX.get();
            const snapped = Math.round(current / step) * step;
            setIsGalleryResuming(true);
            animate(trackX, snapped, { type: 'spring', stiffness: 300, damping: 35 }).then(() => {
              setTimeout(() => {
                setIsGalleryResuming(false);
              }, 2000);
            });
            setIsGalleryDragging(false);
          }}
          style={isMobile && (isGalleryDragging || isGalleryResuming) ? { x: trackX } : undefined}
        >
          {products.concat(products).map((product, index) => (
            <motion.div
              key={`${product.id}-${index}`}
              className="gallery-item"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
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
        </motion.div>
      </div>

      {/* Feature Cards Grid */}
      <div className={`features-grid ${isMobile ? 'compact-mobile' : ''}`}>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`feature-card ${isMobile ? 'compact-mobile' : ''} ${activeFeature === index ? 'active' : ''}`}
            onMouseEnter={() => !isMobile && setActiveFeature(index)}
            onClick={() => {
              if (isMobile) setExpandedDetails(expandedDetails === index ? null : index)
            }}
            role={isMobile ? 'button' : undefined}
            aria-expanded={isMobile ? (expandedDetails === index) : undefined}
            aria-controls={isMobile ? `feature-sheet-${index}` : undefined}
          >
            <div className={`feature-icon bg-gradient-to-r ${feature.color}`}>
              <feature.icon size={32} />
            </div>
            
            <div className="feature-content">
              <h3>{feature.title}</h3>
              {!isMobile && <p>{feature.description}</p>}
              {!isMobile && (
                <button
                  className="feature-button"
                  onClick={() => setExpandedDetails(expandedDetails === index ? null : index)}
                >
                  Learn More
                  <ChevronRight size={16} />
                </button>
              )}
            </div>

            {/* Efficiency Progress Bar */}
            {!isMobile && (
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
            )}
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

      {/* Expanded Details - Desktop Centered Modal */}
      <AnimatePresence>
        {!isMobile && expandedDetails !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`expanded-details`}
          >
            <div className="details-content">
              <h4>{features[expandedDetails].title}</h4>
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

      {/* Expanded Details - Mobile Bottom Sheet */}
      <AnimatePresence>
        {isMobile && expandedDetails !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="feature-overlay-backdrop"
              onClick={() => setExpandedDetails(null)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="feature-bottom-sheet"
              role="dialog"
              aria-modal="true"
              aria-labelledby={`feature-sheet-title-${expandedDetails}`}
              id={`feature-sheet-${expandedDetails}`}
            >
              <div className="feature-sheet-header">
                <div className="sheet-handle" />
                <h4 id={`feature-sheet-title-${expandedDetails}`}>{features[expandedDetails].title}</h4>
                <button
                  className="feature-sheet-close"
                  onClick={() => setExpandedDetails(null)}
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="feature-sheet-content">
                <p>{features[expandedDetails].details}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Price Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="price-section"
      >
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
          Browse Rentals
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

      {/* 3D Lithium Inverter Modal */}
      <LithiumInverter3DModal
        isOpen={show3DModal}
        onClose={() => setShow3DModal(false)}
        product={techProProduct}
      />

      {/* AR Camera Modal */}
      <ARCameraView
        isVisible={showARModal}
        onClose={() => setShowARModal(false)}
        product={techProProduct}
      />
    </section>
  );
};

export default FeaturesSection;