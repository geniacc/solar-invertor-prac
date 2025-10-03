import React, { useState, useEffect } from 'react'
import { cn } from '../../lib/utils'

// Hook to detect screen size
export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  })

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = screenSize.width < 768
  const isTablet = screenSize.width >= 768 && screenSize.width < 1024
  const isDesktop = screenSize.width >= 1024
  const isLarge = screenSize.width >= 1280
  const isXLarge = screenSize.width >= 1536

  return {
    ...screenSize,
    isMobile,
    isTablet,
    isDesktop,
    isLarge,
    isXLarge,
    breakpoint: isMobile ? 'mobile' : isTablet ? 'tablet' : isDesktop ? 'desktop' : isLarge ? 'large' : 'xlarge'
  }
}

// Responsive container component
export const ResponsiveContainer = ({ 
  children, 
  className,
  maxWidth = 'max-w-7xl',
  padding = 'px-4 sm:px-6 lg:px-8'
}) => {
  return (
    <div className={cn('mx-auto', maxWidth, padding, className)}>
      {children}
    </div>
  )
}

// Responsive grid component
export const ResponsiveGrid = ({ 
  children, 
  className,
  cols = {
    default: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5
  },
  gap = 'gap-6'
}) => {
  const gridClasses = [
    `grid-cols-${cols.default}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
    cols['2xl'] && `2xl:grid-cols-${cols['2xl']}`
  ].filter(Boolean).join(' ')

  return (
    <div className={cn('grid', gridClasses, gap, className)}>
      {children}
    </div>
  )
}

// Responsive text component
export const ResponsiveText = ({ 
  children, 
  className,
  size = {
    default: 'text-base',
    sm: 'sm:text-lg',
    md: 'md:text-xl',
    lg: 'lg:text-2xl'
  }
}) => {
  const textClasses = [
    size.default,
    size.sm,
    size.md,
    size.lg,
    size.xl
  ].filter(Boolean).join(' ')

  return (
    <div className={cn(textClasses, className)}>
      {children}
    </div>
  )
}

// Responsive spacing component
export const ResponsiveSpacing = ({ 
  children, 
  className,
  spacing = {
    default: 'space-y-4',
    sm: 'sm:space-y-6',
    md: 'md:space-y-8',
    lg: 'lg:space-y-12'
  }
}) => {
  const spacingClasses = [
    spacing.default,
    spacing.sm,
    spacing.md,
    spacing.lg
  ].filter(Boolean).join(' ')

  return (
    <div className={cn(spacingClasses, className)}>
      {children}
    </div>
  )
}

// Show/Hide based on breakpoint
export const ShowOn = ({ breakpoint, children }) => {
  const { isMobile, isTablet, isDesktop, isLarge, isXLarge } = useResponsive()
  
  const shouldShow = {
    mobile: isMobile,
    tablet: isTablet,
    desktop: isDesktop,
    large: isLarge,
    xlarge: isXLarge,
    'mobile-up': !isMobile,
    'tablet-up': isTablet || isDesktop || isLarge || isXLarge,
    'desktop-up': isDesktop || isLarge || isXLarge,
    'large-up': isLarge || isXLarge
  }[breakpoint]

  return shouldShow ? children : null
}

export const HideOn = ({ breakpoint, children }) => {
  const { isMobile, isTablet, isDesktop, isLarge, isXLarge } = useResponsive()
  
  const shouldHide = {
    mobile: isMobile,
    tablet: isTablet,
    desktop: isDesktop,
    large: isLarge,
    xlarge: isXLarge,
    'mobile-up': !isMobile,
    'tablet-up': isTablet || isDesktop || isLarge || isXLarge,
    'desktop-up': isDesktop || isLarge || isXLarge,
    'large-up': isLarge || isXLarge
  }[breakpoint]

  return !shouldHide ? children : null
}

// Responsive image component
export const ResponsiveImage = ({ 
  src, 
  alt, 
  className,
  sizes = {
    mobile: 'w-full h-48',
    tablet: 'sm:h-64',
    desktop: 'lg:h-80'
  },
  objectFit = 'object-cover'
}) => {
  const sizeClasses = [
    sizes.mobile,
    sizes.tablet,
    sizes.desktop,
    sizes.large
  ].filter(Boolean).join(' ')

  return (
    <img 
      src={src} 
      alt={alt} 
      className={cn(sizeClasses, objectFit, 'rounded-lg', className)}
    />
  )
}

// Responsive flex component
export const ResponsiveFlex = ({ 
  children, 
  className,
  direction = {
    default: 'flex-col',
    md: 'md:flex-row'
  },
  align = 'items-center',
  justify = 'justify-center',
  gap = 'gap-4'
}) => {
  const directionClasses = [
    direction.default,
    direction.sm,
    direction.md,
    direction.lg,
    direction.xl
  ].filter(Boolean).join(' ')

  return (
    <div className={cn('flex', directionClasses, align, justify, gap, className)}>
      {children}
    </div>
  )
}

// Responsive card component
export const ResponsiveCard = ({ 
  children, 
  className,
  padding = {
    default: 'p-4',
    sm: 'sm:p-6',
    lg: 'lg:p-8'
  }
}) => {
  const paddingClasses = [
    padding.default,
    padding.sm,
    padding.md,
    padding.lg
  ].filter(Boolean).join(' ')

  return (
    <div className={cn(
      'bg-card text-card-foreground rounded-lg border shadow-sm',
      paddingClasses,
      className
    )}>
      {children}
    </div>
  )
}

export default {
  useResponsive,
  ResponsiveContainer,
  ResponsiveGrid,
  ResponsiveText,
  ResponsiveSpacing,
  ShowOn,
  HideOn,
  ResponsiveImage,
  ResponsiveFlex,
  ResponsiveCard
}