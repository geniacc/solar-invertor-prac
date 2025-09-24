import React from "react";
import { motion } from "framer-motion";

export default function ThreeDMarquee({ images, className = "" }) {
  return (
    <div className={`relative w-full py-8 px-2 flex flex-col items-center overflow-hidden ${className}`}>
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Grid overlay */}
        <svg width="100%" height="100%">
          <defs>
            <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#68d39111" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
      </div>
      <div className="relative grid grid-cols-4 gap-7 z-10 max-w-4xl"
           style={{ perspective: "1200px"}}>
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.15, rotateY: 10 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-xl bg-white/10 shadow-lg flex items-center justify-center"
            style={{
              height: 110,
              width: 170,
              transformStyle: "preserve-3d",
              boxShadow: "0 8px 36px #0002"
            }}
          >
            <img
              src={img}
              alt={`3d grid ${idx + 1}`}
              className="h-[100px] w-[150px] object-cover rounded-lg bg-gray-100"
              style={{
                boxShadow: "0 2px 14px #0001"
              }}
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
