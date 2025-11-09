import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from './ui/Card'
import { Star } from 'lucide-react'
import { useResponsive } from '../hooks/useResponsive'

const TestimonialsSection = ({ isMobile, isTablet, testimonials }) => {
  const { isMobile: hookIsMobile, isTablet: hookIsTablet } = useResponsive()
  const m = typeof isMobile === 'boolean' ? isMobile : hookIsMobile
  const t = typeof isTablet === 'boolean' ? isTablet : hookIsTablet
  const data = Array.isArray(testimonials) ? testimonials : []
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
          <h2 className={`font-bold text-foreground mb-4 ${
            m ? 'text-2xl' : 'text-3xl lg:text-4xl'
          }`}>
            What Our Customers Say
          </h2>
          <p className={`text-muted-foreground max-w-2xl mx-auto ${
            m ? 'text-base' : 'text-xl'
          }`}>
            Real experiences from ESS system users
          </p>
        </motion.div>

        <div className={`grid gap-8 ${
          m ? 'grid-cols-1' : t ? 'grid-cols-2' : 'md:grid-cols-3'
        }`}>
          {data.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className={m ? 'p-4' : 'p-6'}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {testimonial.avatar && (
                        <img
                          src={testimonial.avatar}
                          alt={`${testimonial.name} avatar`}
                          className="h-10 w-10 rounded-full object-cover border"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                      <div>
                        <div className={`font-semibold ${
                          m ? 'text-sm' : 'text-base'
                        }`}>{testimonial.name}</div>
                        <div className={`text-muted-foreground ${
                          m ? 'text-xs' : 'text-sm'
                        }`}>{testimonial.location}</div>
                      </div>
                    </div>
                    <div className={`bg-purple-500/10 text-purple-500 px-2 py-1 rounded ${
                      m ? 'text-xs' : 'text-xs'
                    }`}>
                      {testimonial.service}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className={`text-muted-foreground mb-4 italic ${
                    m ? 'text-sm' : 'text-base'
                  }`}>
                    "{testimonial.comment}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection