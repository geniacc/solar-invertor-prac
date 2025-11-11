import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from './ui/Card'
import { Star } from 'lucide-react'
import AnimatedTestimonials from './ui/AnimatedTestimonials'
import { useResponsive } from '../hooks/useResponsive'

const TestimonialsSection = ({ isMobile, isTablet, testimonials }) => {
  const { isMobile: hookIsMobile, isTablet: hookIsTablet } = useResponsive()
  const m = typeof isMobile === 'boolean' ? isMobile : hookIsMobile
  const t = typeof isTablet === 'boolean' ? isTablet : hookIsTablet
  const data = Array.isArray(testimonials) ? testimonials : []
  // Map incoming testimonials to AnimatedTestimonials shape
  const animatedItems = data.map((t) => ({
    name: t.name,
    designation: t.service || t.designation || t.location,
    quote: t.comment || t.quote || '',
    src: t.src || t.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(t.name || 'User')}`,
    rating: typeof t.rating === 'number' ? t.rating : undefined,
    location: t.location,
    company: t.company
  }))

  return (
    <section className={`section-padding mobile-section-tight bg-gradient-to-br from-purple-900/10 via-background to-purple-900/5`}>
      <div className="container mx-auto px-4 safe-area-x">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className={`font-bold text-foreground mb-4 ${m ? 'text-2xl' : 'text-3xl lg:text-4xl'}`}>
            What Our Customers Say
          </h2>
          <p className={`text-muted-foreground max-w-2xl mx-auto ${m ? 'text-base' : 'text-xl'}`}>
            Real experiences from ESS system users
          </p>
        </motion.div>

        {/* Animated stacked card testimonials */}
        <div className="max-w-6xl mx-auto">
          <AnimatedTestimonials testimonials={animatedItems} autoplay={true} interval={5000} />
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection