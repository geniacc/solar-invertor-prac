import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Zap, Shield, Battery, Sun, Sparkles, Power } from 'lucide-react';

import DotGrid from './DotGrid';
import solarBannerImage from '../assets/solar-banner-removebg-preview.png';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="hero-section relative min-h-screen flex items-center overflow-hidden bg-black"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/30 to-black"></div>
      
      {/* Product Image Background - More Prominent */}
      <motion.div 
        className="absolute inset-0 opacity-20 bg-center bg-no-repeat bg-contain"
        style={{
          backgroundImage: `url(${solarBannerImage})`,
        }}
        animate={{
          scale: isVisible ? [1, 1.05, 1] : 1,
          opacity: isVisible ? [0.2, 0.3, 0.2] : 0.2,
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      
      {/* Floating Energy Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -100, -20],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      
      {/* Floating Animated Orbs */}
      <motion.div 
        className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      
      <motion.div 
        className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-cyan-400/15 to-purple-500/15 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      
      {/* Animated Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -200, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: "easeInOut"
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Content - Minimal and Focused */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Company Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 py-2"
              animate={{
                scale: [1, 1.05, 1],
                borderColor: ['rgba(59, 130, 246, 0.3)', 'rgba(147, 51, 234, 0.3)', 'rgba(59, 130, 246, 0.3)'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Power className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-white">Zuice</span>
            </motion.div>

            {/* Main Heading - Focused on MU1000 */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                <motion.span
                  className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                >
                  Zuice MU1000
                </motion.span>
                <span className="block text-white/90 text-3xl lg:text-4xl font-light mt-2">
                  Solar Hybrid PCU
                </span>
              </h1>
              
              <motion.p
                className="text-xl text-gray-300 max-w-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                Advanced 1KVA-12V PWM technology for reliable solar energy management
              </motion.p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <motion.button
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <span className="relative flex items-center space-x-2">
                  <span>Explore Zuice MU1000</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
              
              <motion.button
                className="group px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>Watch Demo</span>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Product Showcase */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Product Image with Enhanced Animation */}
            <motion.div
              className="relative"
              animate={{
                y: [0, -20, 0],
                rotateY: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.img
                src={solarBannerImage}
                alt="MU1000 Solar Hybrid PCU"
                className="h-96 w-auto filter drop-shadow-2xl"
                animate={{
                  filter: [
                    'drop-shadow(0 25px 25px rgba(59, 130, 246, 0.3))',
                    'drop-shadow(0 25px 25px rgba(147, 51, 234, 0.3))',
                    'drop-shadow(0 25px 25px rgba(59, 130, 246, 0.3))',
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Glowing Ring Effect */}
              <motion.div
                className="absolute -inset-8 border-2 border-blue-500/30 rounded-full"
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                  borderColor: [
                    'rgba(59, 130, 246, 0.3)',
                    'rgba(147, 51, 234, 0.3)',
                    'rgba(59, 130, 246, 0.3)',
                  ],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  borderColor: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            </motion.div>

            {/* Floating Feature Icons */}
            {[
              { icon: Zap, position: 'top-10 left-10', delay: 0 },
              { icon: Shield, position: 'top-20 right-10', delay: 0.5 },
              { icon: Battery, position: 'bottom-20 left-20', delay: 1 },
              { icon: Sun, position: 'bottom-10 right-20', delay: 1.5 },
            ].map(({ icon: Icon, position, delay }, index) => (
              <motion.div
                key={index}
                className={`absolute ${position} p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20`}
                initial={{ opacity: 0, scale: 0 }}
                animate={isVisible ? { 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -10, 0],
                } : { opacity: 0, scale: 0 }}
                transition={{
                  opacity: { duration: 0.5, delay: delay + 1.2 },
                  scale: { duration: 0.5, delay: delay + 1.2 },
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: delay },
                }}
              >
                <Icon className="h-6 w-6 text-blue-400" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;