import React, { useMemo } from "react";
import { motion } from "framer-motion";

// Utility to chunk the array into columns
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

// Default features data
const defaultFeatures = [
  {
    title: "High Efficiency",
    description: "Up to 98% conversion efficiency with advanced MPPT technology",
    icon: "⚡"
  },
  {
    title: "Reliable Protection", 
    description: "Built-in surge protection and fault detection systems",
    icon: "🛡️"
  },
  {
    title: "Eco-Friendly",
    description: "Reduce carbon footprint with clean, renewable energy", 
    icon: "🌱"
  },
  {
    title: "Premium Quality",
    description: "25-year warranty with industry-leading performance",
    icon: "🏆"
  },
  {
    title: "Smart Monitoring",
    description: "Real-time performance tracking and analytics",
    icon: "📊"
  },
  {
    title: "Easy Installation", 
    description: "Plug-and-play design for quick setup",
    icon: "🔧"
  },
  {
    title: "Weather Resistant",
    description: "IP65 rating for all weather conditions",
    icon: "🌦️"
  },
  {
    title: "Grid Integration",
    description: "Seamless connection to utility grid",
    icon: "🔌"
  }
];

export default function ThreeDGrid({ features = defaultFeatures, onSectionClick }) {
  // Memoize the column calculation for performance
  const columns = useMemo(() => {
    const numColumns = 4; // Base number of columns for desktop
    const itemsPerColumn = Math.ceil(features.length / numColumns);
    return chunk(features, itemsPerColumn);
  }, [features]);

  const handleKeyDown = (event, index) => {
    if (event.key === "Enter" || event.key === " ") {
      onSectionClick && onSectionClick(index);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden perspective-1000">
      <div className="flex justify-center items-center h-full gap-4 transform-gpu">
        {columns.map((imageColumn, colIdx) => (
          <motion.div
            key={colIdx}
            className="flex flex-col gap-4"
            initial={{ y: colIdx % 2 === 0 ? 60 : -60 }}
            animate={{ y: colIdx % 2 === 0 ? -60 : 60 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: colIdx % 2 === 0 ? 10 : 13,
              ease: "easeInOut",
            }}
          >
            {imageColumn.map((feature, imgIdx) => {
              const featureIndex = colIdx * Math.ceil(features.length / columns.length) + imgIdx;

              return (
                <motion.div
                  key={feature.title}
                  className="relative w-64 h-48 bg-card rounded-lg shadow-lg overflow-hidden cursor-pointer transform-gpu hover:scale-105 transition-transform duration-300 border border-border"
                  role="button"
                  tabIndex={0}
                  onClick={() => onSectionClick && onSectionClick(featureIndex)}
                  onKeyDown={(e) => handleKeyDown(e, featureIndex)}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    rotateX: 5,
                    z: 50
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 text-center">{feature.title}</h3>
              <p className="text-sm text-muted-foreground text-center">{feature.description}</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              );
            })}
          </motion.div>
        ))}
      </div>
    </div>
  );
}