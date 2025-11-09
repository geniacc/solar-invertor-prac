import { useState, useEffect } from 'react';

export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    const detectTouch = () => {
      try {
        const coarse = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
        const touchPoints = typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0;
        setIsTouch(Boolean(coarse || touchPoints));
      } catch {
        setIsTouch(false);
      }
    };

    window.addEventListener('resize', handleResize);
    // Call handlers right away so state gets updated with initial values
    handleResize();
    detectTouch();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = screenSize.width < 768;
  const isPhone = screenSize.width <= 640;
  const isTablet = screenSize.width >= 768 && screenSize.width < 1024;
  const isDesktop = screenSize.width >= 1024;
  const mobileLite = isMobile && isTouch;

  return {
    screenSize,
    isMobile,
    isPhone,
    isTablet,
    isDesktop,
    isTouch,
    mobileLite,
  };
};