import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap, Sun, Leaf, Award } from 'lucide-react';

const SolarPanelShowcase = () => {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const panels = [
    {
      id: 1,
      name: "SolarMax Pro 400W",
      power: "400W",
      efficiency: "22.1%",
      warranty: "25 Years",
      image: "/api/placeholder/600/400",
      features: ["Monocrystalline Silicon", "Anti-Reflective Coating", "Weather Resistant"],
      color: "from-purple-600 to-purple-800"
    },
    {
      id: 2,
      name: "EcoPanel Elite 450W",
      power: "450W",
      efficiency: "21.8%",
      warranty: "25 Years",
      image: "/api/placeholder/600/400",
      features: ["Bifacial Technology", "Enhanced Durability", "Low Light Performance"],
      color: "from-green-600 to-green-800"
    },
    {
      id: 3,
      name: "PowerCell Ultra 500W",
      power: "500W",
      efficiency: "23.2%",
      warranty: "30 Years",
      image: "/api/placeholder/600/400",
      features: ["Half-Cut Cell Design", "Superior Performance", "Extended Warranty"],
      color: "from-purple-600 to-purple-800"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentPanel((prev) => (prev + 1) % panels.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, panels.length]);

  const nextPanel = () => {
    setCurrentPanel((prev) => (prev + 1) % panels.length);
    setIsAutoPlaying(false);
  };

  const prevPanel = () => {
    setCurrentPanel((prev) => (prev - 1 + panels.length) % panels.length);
    setIsAutoPlaying(false);
  };

  const goToPanel = (index) => {
    setCurrentPanel(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${panels[currentPanel].color} opacity-10`} />
      
      <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
        {/* Panel Visualization */}
        <div className="relative p-8 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPanel}
              className="relative"
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: 30 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {/* Solar Panel 3D Representation */}
              <div className="relative w-80 h-60 perspective-1000">
                <motion.div
                  className="w-full h-full preserve-3d"
                  animate={{
                    rotateX: [0, 5, 0],
                    rotateY: [0, 10, 0]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Main Panel */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 rounded-lg shadow-2xl border-4 border-gray-300">
                    {/* Solar Cells Grid */}
                    <div className="absolute inset-4 grid grid-cols-6 grid-rows-10 gap-1">
                      {[...Array(60)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-sm"
                          animate={{
                            opacity: [0.7, 1, 0.7],
                            scale: [1, 1.02, 1]
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.02,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Junction Box */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-gray-800 rounded shadow-lg">
                      <div className="absolute inset-1 bg-gray-700 rounded flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    
                    {/* Frame Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-lg pointer-events-none" />
                  </div>
                  
                  {/* Side Panel (3D Effect) */}
                  <div className="absolute -right-2 top-2 bottom-2 w-4 bg-gradient-to-r from-gray-400 to-gray-600 transform skew-y-12 rounded-r" />
                  <div className="absolute -bottom-2 left-2 right-2 h-4 bg-gradient-to-b from-gray-400 to-gray-600 transform skew-x-12 rounded-b" />
                </motion.div>
              </div>
              
              {/* Floating Energy Particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                    style={{
                      left: `${20 + (i * 10)}%`,
                      top: `${30 + (i % 3) * 20}%`
                    }}
                    animate={{
                      y: [-20, -60, -20],
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Arrows */}
          <button
            onClick={prevPanel}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextPanel}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Panel Information */}
        <div className="p-8 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPanel}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                {panels[currentPanel].name}
              </h2>
              
              {/* Specifications */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{panels[currentPanel].power}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Power</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Sun className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{panels[currentPanel].efficiency}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Efficiency</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">{panels[currentPanel].warranty}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Warranty</div>
                </div>
              </div>
              
              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-900 dark:text-white">
                  <Leaf className="w-5 h-5 text-green-600 mr-2" />
                  Key Features
                </h3>
                <div className="space-y-2">
                  {panels[currentPanel].features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                  Learn More
                </button>
                <button className="flex-1 border border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 py-3 px-6 rounded-lg font-semibold transition-colors">
                  Get Quote
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Panel Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {panels.map((_, index) => (
          <button
            key={index}
            onClick={() => goToPanel(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentPanel
                ? 'bg-purple-600 scale-125'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SolarPanelShowcase;