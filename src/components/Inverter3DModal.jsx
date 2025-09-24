import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Settings, Wifi, Shield, CheckCircle } from 'lucide-react';
import { Button } from './ui/Button';

const Inverter3DModal = ({ isVisible, onClose, product }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const handleMouseMove = (e) => {
    if (!isHovered) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / rect.width;
    const deltaY = (e.clientY - centerY) / rect.height;
    
    setRotation({
      x: deltaY * 20,
      y: -deltaX * 20
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateX: -15,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotateX: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.6
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotateX: 15,
      y: -50,
      transition: {
        duration: 0.3
      }
    }
  };

  const inverterVariants = {
    idle: {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      rotateY: rotation.y,
      rotateX: rotation.x,
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-6xl mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {product.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Interactive 3D View
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
              {/* 3D Inverter Display */}
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 h-96 flex items-center justify-center perspective-1000">
                  <motion.div
                    className="relative w-64 h-48 preserve-3d cursor-pointer"
                    variants={inverterVariants}
                    animate={isHovered ? "hover" : "idle"}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Main Inverter Body */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-500 rounded-lg shadow-2xl transform-gpu">
                      {/* Front Panel */}
                      <div className="absolute inset-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-md">
                        {/* LED Indicators */}
                        <div className="absolute top-4 left-4 flex space-x-2">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                          <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50"></div>
                          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50"></div>
                        </div>
                        
                        {/* Display Screen */}
                        <div className="absolute top-4 right-4 w-16 h-8 bg-black rounded border border-gray-600">
                          <div className="text-green-400 text-xs font-mono p-1 leading-none">
                            {product.power}W
                          </div>
                        </div>
                        
                        {/* Ventilation Grilles */}
                        <div className="absolute bottom-4 left-4 right-4 space-y-1">
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-0.5 bg-gray-600 rounded"></div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Side Panels */}
                      <div className="absolute -right-2 top-2 bottom-2 w-4 bg-gradient-to-r from-gray-400 to-gray-600 transform skew-y-12"></div>
                      <div className="absolute -bottom-2 left-2 right-2 h-4 bg-gradient-to-b from-gray-400 to-gray-600 transform skew-x-12"></div>
                    </div>
                    
                    {/* Floating Elements */}
                    <motion.div
                      className="absolute -top-8 -right-8 w-6 h-6 bg-purple-500 rounded-full shadow-lg"
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div
                      className="absolute -bottom-8 -left-8 w-4 h-4 bg-green-500 rounded-full shadow-lg"
                      animate={{
                        y: [0, 10, 0],
                        rotate: [360, 180, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </div>
                
                <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                  Hover and move your mouse to rotate the inverter
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    Technical Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Zap className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="font-medium">Power Output</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-600">{product.power}W</div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Settings className="w-5 h-5 text-green-600 mr-2" />
                        <span className="font-medium">Efficiency</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">{product.efficiency}%</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center text-gray-900 dark:text-white">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    Key Features
                  </h4>
                  <div className="space-y-2">
                    {product.features?.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                      </motion.div>
                    )) || (
                      <>
                        <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-3" />
                          <span className="text-sm">Advanced MPPT Technology</span>
                        </div>
                        <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-3" />
                          <span className="text-sm">Smart Grid Integration</span>
                        </div>
                        <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-3" />
                          <span className="text-sm">Remote Monitoring</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button className="flex-1">
                    Add to Cart - ${product.price}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Get Quote
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Inverter3DModal;