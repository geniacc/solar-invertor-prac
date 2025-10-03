import React from 'react'
import { motion } from 'framer-motion'
import { Loader2, Zap, Battery, Sun } from 'lucide-react'
import { cn } from '../../lib/utils'

const LoadingSpinner = ({ size = 'default', className }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    default: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  }

  return (
    <Loader2 
      className={cn(
        'animate-spin text-primary',
        sizeClasses[size],
        className
      )} 
    />
  )
}

const SolarLoadingAnimation = ({ size = 'default' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    default: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24'
  }

  return (
    <div className={cn('relative', sizeClasses[size])}>
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <Sun className="h-full w-full text-yellow-500" />
      </motion.div>
      <motion.div
        className="absolute inset-2"
        animate={{ rotate: -360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Zap className="h-full w-full text-blue-500" />
      </motion.div>
    </div>
  )
}

const PulseLoader = ({ size = 'default', color = 'primary' }) => {
  const sizeClasses = {
    sm: 'h-2 w-2',
    default: 'h-3 w-3',
    lg: 'h-4 w-4'
  }

  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent'
  }

  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn(
            'rounded-full',
            sizeClasses[size],
            colorClasses[color]
          )}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}
    </div>
  )
}

const SkeletonLoader = ({ className, variant = 'default' }) => {
  const variants = {
    default: 'h-4 w-full',
    text: 'h-4 w-3/4',
    title: 'h-6 w-1/2',
    avatar: 'h-12 w-12 rounded-full',
    card: 'h-32 w-full rounded-lg',
    button: 'h-10 w-24 rounded-md'
  }

  return (
    <motion.div
      className={cn(
        'bg-muted rounded animate-pulse',
        variants[variant],
        className
      )}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  )
}

const LoadingCard = ({ title, description, className }) => {
  return (
    <div className={cn('p-6 border rounded-lg space-y-4', className)}>
      <div className="space-y-2">
        <SkeletonLoader variant="title" />
        <SkeletonLoader variant="text" />
        <SkeletonLoader variant="text" className="w-1/2" />
      </div>
      <div className="flex space-x-2">
        <SkeletonLoader variant="button" />
        <SkeletonLoader variant="button" className="w-16" />
      </div>
    </div>
  )
}

const LoadingGrid = ({ items = 6, className }) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
      {Array.from({ length: items }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  )
}

const FullPageLoader = ({ message = 'Loading...', type = 'spinner' }) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        {type === 'spinner' && <LoadingSpinner size="xl" />}
        {type === 'solar' && <SolarLoadingAnimation size="xl" />}
        {type === 'pulse' && <PulseLoader size="lg" />}
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}

const InlineLoader = ({ 
  type = 'spinner', 
  size = 'default', 
  message, 
  className 
}) => {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      {type === 'spinner' && <LoadingSpinner size={size} />}
      {type === 'solar' && <SolarLoadingAnimation size={size} />}
      {type === 'pulse' && <PulseLoader size={size} />}
      {message && <span className="text-sm text-muted-foreground">{message}</span>}
    </div>
  )
}

const ButtonLoader = ({ loading, children, ...props }) => {
  return (
    <button {...props} disabled={loading || props.disabled}>
      {loading ? (
        <div className="flex items-center space-x-2">
          <LoadingSpinner size="sm" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
}

export {
  LoadingSpinner,
  SolarLoadingAnimation,
  PulseLoader,
  SkeletonLoader,
  LoadingCard,
  LoadingGrid,
  FullPageLoader,
  InlineLoader,
  ButtonLoader
}

export default LoadingSpinner