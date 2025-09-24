import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Users, Leaf, Award, TrendingUp, Globe } from 'lucide-react';

const AnimatedStats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const [counters, setCounters] = useState({
    installations: 0,
    customers: 0,
    energySaved: 0,
    co2Reduced: 0,
    countries: 0,
    awards: 0
  });

  const finalValues = {
    installations: 15000,
    customers: 8500,
    energySaved: 2.4, // in GWh
    co2Reduced: 1200, // in tons
    countries: 25,
    awards: 12
  };

  const stats = [
    {
      key: 'installations',
      icon: Zap,
      label: 'Solar Installations',
      value: counters.installations,
      suffix: '+',
      color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      key: 'customers',
      icon: Users,
      label: 'Happy Customers',
      value: counters.customers,
      suffix: '+',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      key: 'energySaved',
      icon: TrendingUp,
      label: 'Energy Generated',
      value: counters.energySaved,
      suffix: ' GWh',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      key: 'co2Reduced',
      icon: Leaf,
      label: 'CO₂ Reduced',
      value: counters.co2Reduced,
      suffix: ' tons',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    {
      key: 'countries',
      icon: Globe,
      label: 'Countries Served',
      value: counters.countries,
      suffix: '+',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      key: 'awards',
      icon: Award,
      label: 'Industry Awards',
      value: counters.awards,
      suffix: '+',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const steps = 60; // 60 FPS
    const stepDuration = duration / steps;

    const intervals = Object.keys(finalValues).map(key => {
      const finalValue = finalValues[key];
      const increment = finalValue / steps;
      let currentValue = 0;
      let step = 0;

      return setInterval(() => {
        step++;
        currentValue = Math.min(increment * step, finalValue);
        
        setCounters(prev => ({
          ...prev,
          [key]: key === 'energySaved' ? Number(currentValue.toFixed(1)) : Math.floor(currentValue)
        }));

        if (step >= steps) {
          clearInterval(intervals.find(interval => interval === this));
        }
      }, stepDuration);
    });

    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Transforming the world one solar installation at a time. See how we're making a difference in renewable energy adoption.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            
            return (
              <motion.div
                key={stat.key}
                className={`relative p-8 rounded-2xl ${stat.bgColor} border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden`}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
              >
                {/* Background Gradient Animation */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Floating Particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-2 h-2 bg-gradient-to-r ${stat.color} rounded-full opacity-30`}
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${20 + i * 20}%`
                      }}
                      animate={{
                        y: [-10, -30, -10],
                        opacity: [0.3, 0.7, 0.3],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${stat.color} text-white mb-4 shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className="w-8 h-8" />
                  </motion.div>

                  {/* Counter */}
                  <motion.div
                    className="mb-2"
                    initial={{ scale: 0.5 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 15,
                      delay: index * 0.1 
                    }}
                  >
                    <span className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value.toLocaleString()}{stat.suffix}
                    </span>
                  </motion.div>

                  {/* Label */}
                  <p className="text-gray-700 dark:text-gray-300 font-medium text-lg">
                    {stat.label}
                  </p>

                  {/* Progress Bar */}
                  <motion.div
                    className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : {}}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  >
                    <motion.div
                      className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                      initial={{ width: "0%" }}
                      animate={isInView ? { width: "100%" } : {}}
                      transition={{ 
                        duration: 2, 
                        delay: 0.5 + index * 0.1,
                        ease: "easeOut"
                      }}
                    />
                  </motion.div>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 border-2 border-transparent rounded-2xl"
                  whileHover={{
                    borderColor: `rgb(${stat.color.includes('blue') ? '59, 130, 246' : 
                                      stat.color.includes('green') ? '34, 197, 94' :
                                      stat.color.includes('yellow') ? '234, 179, 8' :
                                      stat.color.includes('emerald') ? '16, 185, 129' :
                                      stat.color.includes('purple') ? '147, 51, 234' :
                                      '249, 115, 22'})`,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Ready to be part of these amazing numbers?
          </p>
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Solar Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedStats;