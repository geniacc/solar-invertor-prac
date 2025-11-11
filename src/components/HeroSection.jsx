import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Zap, Shield, Battery, Sun, Sparkles, Power, X } from 'lucide-react';
import { Button } from './ui/Button';
import DotGrid from './DotGrid';
import { useResponsive } from '../hooks/useResponsive';
import MultiStepOnboarding from './ui/MultiStepOnboarding';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const { isMobile, isTablet, mobileLite } = useResponsive();
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [loadingDisabled, setLoadingDisabled] = useState(false);
  const onboardingSteps = [
    'Welcome to Zuice',
    'Browse inverter solutions',
    'Check availability near you',
    'Choose install preference',
    'Apply offers and warranty',
    'Proceed to checkout',
    'Need help? Chat with us anytime'
  ];

  // Typewriter effect text states (mobile-only)
  const subtitleFull = 'Home Energy Storage System';
  const paragraphFull = 'Advanced lithium-ion technology with smart BMS for reliable home energy storage and backup power solutions';
  const [typedSubtitle, setTypedSubtitle] = useState('');
  const [typedParagraph, setTypedParagraph] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentRef = heroRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Run typewriter effect only on mobile and when section becomes visible
  useEffect(() => {
    if (!isMobile || !isVisible) return;

    setTypedSubtitle('');
    setTypedParagraph('');
    let i = 0;
    let j = 0;
    let subtitleTimer = null;
    let paragraphTimer = null;

    subtitleTimer = setInterval(() => {
      i += 1;
      setTypedSubtitle(subtitleFull.slice(0, i));
      if (i >= subtitleFull.length) {
        clearInterval(subtitleTimer);
        paragraphTimer = setInterval(() => {
          j += 1;
          setTypedParagraph(paragraphFull.slice(0, j));
          if (j >= paragraphFull.length) {
            clearInterval(paragraphTimer);
          }
        }, 25);
      }
    }, 45);

    return () => {
      if (subtitleTimer) clearInterval(subtitleTimer);
      if (paragraphTimer) clearInterval(paragraphTimer);
    };
  }, [isMobile, isVisible]);

  return (
    <section 
      ref={heroRef} 
      className="hero-section relative min-h-screen flex items-center overflow-hidden bg-black mobile-section-tight"
    >
      {/* Interactive Mouse Follower (disabled on mobile) */}
      {!isMobile && (
        <motion.div
          className="fixed w-6 h-6 bg-blue-400/30 rounded-full pointer-events-none z-50 mix-blend-screen"
          animate={{
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28,
          }}
        />
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/30 to-black"></div>
      
      {/* Product Image Background - toned down on mobile */}
      <motion.div 
        className="absolute inset-0 opacity-20 bg-center bg-no-repeat bg-contain"
        style={{
          backgroundImage: `url(/images/solar-banner-removebg-preview.png)`,
        }}
        animate={{
          scale: isMobile ? 1 : (isVisible ? [1, 1.05, 1] : 1),
          opacity: isMobile ? 0.12 : (isVisible ? [0.2, 0.3, 0.2] : 0.2),
        }}
        transition={{
          duration: isMobile ? 6 : 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      
      {/* Floating Energy Particles (disabled on mobile) */}
      {!isMobile && ([...Array(20)].map((_, i) => (
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
      )))}
      
      {/* Floating Animated Orbs (disabled on mobile) */}
      {!isMobile && (
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
      )}
      
      {!isMobile && (
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
      )}
      
      {/* Animated Particles (disabled on mobile) */}
      {!isMobile && ([...Array(30)].map((_, i) => (
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
      )))}

      <div className="container mx-auto px-6 safe-area-x relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen">
          {/* Left Content - Minimal and Focused */}
          <motion.div
            className={`${isMobile ? 'space-y-6 text-center items-center flex flex-col px-3' : 'space-y-8'}`}
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Company Badge (click to open onboarding) */}
            <motion.button
              type="button"
              className={`inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 py-2 ${loadingDisabled ? 'opacity-60 pointer-events-none' : 'cursor-pointer'}`}
              animate={{
                scale: [1, 1.05, 1],
                borderColor: ['rgba(59, 130, 246, 0.3)', 'rgba(147, 51, 234, 0.3)', 'rgba(59, 130, 246, 0.3)'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setOnboardingOpen(true);
                setLoadingDisabled(true);
              }}
            >
              <Power className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-white">Zuice</span>
              <Sparkles className="h-3 w-3 text-purple-400" />
            </motion.button>

            {/* Main Heading - Focused on μ1000 */}
            <motion.div
              className={`space-y-4 ${isMobile ? 'mx-auto max-w-[92%]' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h1 className={`${(isMobile ? (mobileLite ? 'text-3xl' : 'text-4xl') : 'text-5xl lg:text-7xl')} leading-tight font-bold text-white ${isMobile ? 'mx-auto' : ''}`}>
                {mobileLite ? (
                  <span className="block text-white">μ1000</span>
                ) : (
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
                    μ1000
                  </motion.span>
                )}
                <span
                  className={`block text-white/90 ${isMobile ? 'text-2xl leading-snug' : 'text-3xl lg:text-4xl'} font-light mt-3 ${isMobile ? 'mx-auto' : ''}`}
                  aria-live="polite"
                >
                  {isMobile ? typedSubtitle : 'Home Energy Storage System'}
                </span>
              </h1>
              
              <motion.p
                className={`${isMobile ? 'text-base leading-snug mx-auto max-w-[92%]' : 'text-xl leading-relaxed max-w-lg'} text-gray-300 typo-lead-tight`}
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                {isMobile ? (
                  <>
                    {typedParagraph}
                    <span className="inline-block w-[0.75ch] align-baseline ml-1 bg-white/70" style={{ height: '1em', opacity: 0.9 }}></span>
                  </>
                ) : (
                  'Advanced lithium-ion technology with smart BMS for reliable home energy storage and backup power solutions'
                )}
              </motion.p>

              {/* Mobile-only centered feature badges */}
              {isMobile && (
                <motion.div
                  className="w-full mx-auto mt-6 mb-2 max-w-[92%]"
                  initial={{ opacity: 0, y: 12 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <span className="px-3 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm">
                      Long Life Cycle
                    </span>
                    <span className="px-3 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm">
                      Smart BMS Protection
                    </span>
                    <span className="px-3 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm">
                      Zero Maintenance
                    </span>
                  </div>
                </motion.div>
              )}

              {isMobile && (
                <motion.div
                  className="w-full mx-auto max-w-[92%] mt-12 mb-2"
                  initial={{ opacity: 0, y: 12 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                >
                  <Link to="/products">
                    <motion.button
                      className="mx-auto w-full max-w-[280px] group relative px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full overflow-hidden shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative flex items-center justify-center space-x-2">
                        <span>Explore Zuice Solutions</span>
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </motion.button>
                  </Link>
                </motion.div>
              )}

              {/* Key Features Pills (disabled on mobile) */}
              {!isMobile && (
              <motion.div
                className="flex flex-wrap gap-3 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 1, delay: 1 }}
              >
                {['Long Cycle Life', 'Smart BMS Protection', 'Zero Maintenance'].map((feature, index) => (
                  <motion.span
                    key={feature}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  >
                    {feature}
                  </motion.span>
                ))}
              </motion.div>
              )}
            </motion.div>

            {/* Action Buttons (desktop only here) */}
            {!isMobile && (
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <Link to="/products">
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
                      <span>Explore Zuice Solutions</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                </motion.button>
                </Link>
                
                <motion.button
                  className="group px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowVideoModal(true)}
                >
                  <span className="flex items-center space-x-2">
                    <Play className="h-5 w-5" />
                    <span>Watch Demo</span>
                  </span>
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          {/* Right Content - Product Showcase */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Product Image with Enhanced Animation (toned down on mobile) */}
            <motion.div
              className="relative cursor-pointer"
              animate={{
                y: isMobile ? [0, -8, 0] : [0, -20, 0],
                rotateY: isMobile ? 0 : [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: isMobile ? 7 : 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.05 }}
              onClick={() => !isMobile && setShowVideoModal(true)}
            >
              <motion.img
                src="/images/solar-banner-removebg-preview.png"
                alt="μ1000 Home ESS"
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

              {/* Click to Play Indicator */}
              {!isMobile && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Floating Feature Icons (disabled on mobile) */}
            {!isMobile && ([
              { icon: Zap, position: 'top-10 left-10', delay: 0, label: 'Fast Charging' },
              { icon: Shield, position: 'top-20 right-10', delay: 0.5, label: 'BMS Protection' },
              { icon: Battery, position: 'bottom-20 left-20', delay: 1, label: 'Long Cycle Life' },
              { icon: Sun, position: 'bottom-10 right-20', delay: 1.5, label: 'Eco-Friendly' },
            ].map(({ icon: Icon, position, delay, label }, index) => (
              <motion.div
                key={index}
                className={`absolute ${position} group cursor-pointer`}
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
                whileHover={{ scale: 1.2 }}
              >
                <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 relative">
                  <Icon className="h-6 w-6 text-blue-400" />
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {label}
      </div>
    </div>

    
              </motion.div>
            )))}
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      {!isMobile && showVideoModal && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowVideoModal(false)}
        >
          <motion.div
            className="bg-white rounded-lg p-6 max-w-2xl w-full relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowVideoModal(false)}
            >
              <X className="h-6 w-6" />
            </button>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Demo video would play here</p>
                <p className="text-sm text-gray-500 mt-2">
                  Experience the μ1000 Home ESS in action
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      {/* Onboarding Loader Modal */}
      <MultiStepOnboarding
        open={onboardingOpen}
        steps={onboardingSteps}
        textOnly
        showProgress={false}
        onClose={() => {
          setOnboardingOpen(false)
          setLoadingDisabled(false)
        }}
        onComplete={() => {
          setOnboardingOpen(false)
          setLoadingDisabled(false)
        }}
      />
    </section>
  );
};

export default HeroSection;