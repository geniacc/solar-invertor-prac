import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Settings, Wifi, Shield, CheckCircle } from 'lucide-react';
import { Button } from './ui/Button';
import './Inverter3DModal.css';

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

  const upsVariants = {
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
              {/* 3D Wall-Mounted UPS Display */}
              <div className="relative">
                {/* Wall Background */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 h-96 flex items-center justify-center perspective-1000 relative overflow-hidden">
                  {/* Wall Texture */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="w-full h-full bg-gradient-to-br from-transparent via-gray-300 to-transparent transform rotate-45"></div>
                  </div>
                  
                  {/* Wall Shadow */}
                  <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/10"></div>
                  
                  <motion.div
                    className="relative w-72 h-56 preserve-3d cursor-pointer"
                    variants={upsVariants}
                    animate={isHovered ? "hover" : "idle"}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: 'translateZ(20px)'
                    }}
                  >
                    {/* Wall Mount Shadow */}
                    <div className="absolute inset-0 bg-black/30 rounded-lg blur-xl transform translate-y-4 translate-x-2 scale-110 -z-10"></div>
                    
                    {/* Main UPS Body - Wall Mounted */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg shadow-2xl transform-gpu border border-gray-300">
                      {/* Mounting Brackets */}
                      <div className="absolute -top-2 left-4 w-6 h-4 bg-gray-500 rounded-t-md shadow-md"></div>
                      <div className="absolute -top-2 right-4 w-6 h-4 bg-gray-500 rounded-t-md shadow-md"></div>
                      <div className="absolute -bottom-2 left-4 w-6 h-4 bg-gray-500 rounded-b-md shadow-md"></div>
                      <div className="absolute -bottom-2 right-4 w-6 h-4 bg-gray-500 rounded-b-md shadow-md"></div>
                      
                      {/* Front Panel */}
                      <div className="absolute inset-3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-md shadow-inner">
                        {/* Brand Logo Area */}
                        <div className="absolute top-3 left-3 right-3 h-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded flex items-center justify-center">
                          <span className="text-white font-bold text-sm">TECHPRO</span>
                        </div>
                        
                        {/* LED Status Indicators */}
                        <div className="absolute top-14 left-4 flex space-x-3">
                          <div className="flex flex-col items-center">
                            <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50 border-2 border-green-300"></div>
                            <span className="text-xs text-gray-400 mt-1">PWR</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50 border-2 border-blue-300"></div>
                            <span className="text-xs text-gray-400 mt-1">GRID</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50 border-2 border-yellow-300"></div>
                            <span className="text-xs text-gray-400 mt-1">LOAD</span>
                          </div>
                        </div>
                        
                        {/* Digital Display */}
                        <div className="absolute top-14 right-4 w-20 h-12 bg-black rounded border-2 border-gray-600 shadow-inner">
                          <div className="text-green-400 text-xs font-mono p-2 leading-tight">
                            <div>{product.power}W</div>
                            <div className="text-green-300">{product.efficiency}%</div>
                          </div>
                        </div>
                        
                        {/* Connection Ports */}
                        <div className="absolute bottom-16 left-4 right-4 flex justify-between">
                          <div className="w-8 h-4 bg-gray-700 rounded border border-gray-600"></div>
                          <div className="w-8 h-4 bg-gray-700 rounded border border-gray-600"></div>
                          <div className="w-8 h-4 bg-gray-700 rounded border border-gray-600"></div>
                        </div>
                        
                        {/* Ventilation Grilles */}
                        <div className="absolute bottom-4 left-4 right-4 space-y-1">
                          {[...Array(8)].map((_, i) => (
                            <div key={i} className="h-0.5 bg-gray-600 rounded opacity-80"></div>
                          ))}
                        </div>
                        
                        {/* Model Label */}
                        <div className="absolute bottom-1 right-4 text-xs text-gray-500 font-mono">
                          {product.model || 'TP-5000X'}
                        </div>
                      </div>
                      
                      {/* 3D Side Panels for Depth */}
                      <div className="absolute -right-3 top-3 bottom-3 w-6 bg-gradient-to-r from-gray-300 to-gray-500 transform skew-y-2 shadow-lg"></div>
                      <div className="absolute -bottom-3 left-3 right-3 h-6 bg-gradient-to-b from-gray-300 to-gray-500 transform skew-x-2 shadow-lg"></div>
                    </div>
                    
                    {/* Floating Energy Particles */}
                    <motion.div
                      className="absolute -top-12 -right-12 w-8 h-8 bg-purple-500 rounded-full shadow-lg opacity-80"
                      animate={{
                        y: [0, -15, 0],
                        x: [0, 10, 0],
                        rotate: [0, 180, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div
                      className="absolute -bottom-12 -left-12 w-6 h-6 bg-green-500 rounded-full shadow-lg opacity-80"
                      animate={{
                        y: [0, 15, 0],
                        x: [0, -10, 0],
                        rotate: [360, 180, 0],
                        scale: [1, 0.8, 1]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div
                      className="absolute top-8 -left-10 w-4 h-4 bg-blue-500 rounded-full shadow-lg opacity-60"
                      animate={{
                        y: [0, -8, 0],
                        x: [0, 8, 0],
                        rotate: [0, 360],
                        scale: [1, 1.5, 1]
                      }}
                      transition={{
                        duration: 3,
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