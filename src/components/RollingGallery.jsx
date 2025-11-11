import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useAnimation, useTransform, useReducedMotion } from 'framer-motion';

const DEFAULT_IMGS = [
  '/images/solar-banner.jpg',
  '/images/12.8v 100AH background.jpg',
  '/images/25.6v 100AH background.png',
  '/images/48v 100AH background.jpg',
];

const RollingGallery = ({ autoplay = false, pauseOnHover = false, images = [] }) => {
  const imageSources = images.length > 0 ? images : DEFAULT_IMGS;
  
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(window.innerWidth <= 640);
  const prefersReducedMotion = useReducedMotion();

  const cylinderWidth = isScreenSizeSm ? 900 : 1400;
  const faceCount = imageSources.length;
  const faceWidth = (cylinderWidth / faceCount) * 1.5;
  const dragFactor = 0.05;
  const radius = cylinderWidth / (2 * Math.PI);

  const rotation = useMotionValue(0);
  const controls = useAnimation();
  const autoplayRef = useRef();

  const handleDrag = (_, info) => {
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    controls.start({
      rotateY: rotation.get() + info.velocity.x * dragFactor,
      transition: { type: 'spring', stiffness: 60, damping: 20, mass: 0.1, ease: 'easeOut' }
    });
  };

  const transform = useTransform(rotation, value => {
    return `rotate3d(0, 1, 0, ${value}deg)`;
  });

  useEffect(() => {
    if (autoplay && !prefersReducedMotion) {
      autoplayRef.current = setInterval(() => {
        const currentRotation = rotation.get();
        const nextRotation = currentRotation - 360 / faceCount;
        controls.start({
          rotateY: nextRotation,
          transition: { duration: 2.4, ease: 'linear' }
        });
        rotation.set(nextRotation);
      }, 3600);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, controls, faceCount, rotation, prefersReducedMotion]);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSizeSm(window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full h-96 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
      <div className="absolute inset-0 flex items-center justify-center perspective-1000">
        <motion.div
          className="relative preserve-3d"
          style={{
            width: `${cylinderWidth}px`,
            height: `${faceWidth}px`,
            transform: transform,
          }}
          drag="x"
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
          onMouseEnter={() => {
            if (pauseOnHover && autoplayRef.current) {
              clearInterval(autoplayRef.current);
            }
          }}
          onMouseLeave={() => {
            if (pauseOnHover && autoplay && !prefersReducedMotion) {
              autoplayRef.current = setInterval(() => {
                const currentRotation = rotation.get();
                const nextRotation = currentRotation - 360 / faceCount;
                controls.start({
                  rotateY: nextRotation,
                  transition: { duration: 2.4, ease: 'linear' }
                });
                rotation.set(nextRotation);
              }, 3600);
            }
          }}
        >
          {imageSources.map((src, i) => (
            <motion.div
              key={i}
              className="absolute top-0 left-1/2 origin-center cursor-grab active:cursor-grabbing"
              style={{
                width: `${faceWidth}px`,
                height: `${faceWidth}px`,
                transform: `
                  translateX(-50%) 
                  rotateY(${i * (360 / faceCount)}deg) 
                  translateZ(${radius}px)
                `,
              }}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
            >
              <img
                src={src}
                alt={`Gallery image ${i + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-2xl border-4 border-white/20"
                draggable={false}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {imageSources.map((_, i) => (
          <button
            key={i}
            className="w-2 h-2 rounded-full bg-gray-800/50 hover:bg-gray-800/80 dark:bg-white/50 dark:hover:bg-white/80 transition-colors"
            onClick={() => {
              const targetRotation = -i * (360 / faceCount);
              controls.start({
                rotateY: targetRotation,
                transition: { duration: 1, ease: 'easeInOut' }
              });
              rotation.set(targetRotation);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RollingGallery;