import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, PanInfo, Variants } from 'framer-motion'
import { ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react'
import { Card, CardContent } from './Card'

export type Testimonial = {
  quote: string
  name: string
  designation?: string
  src: string
  rating?: number
  location?: string
  company?: string
}

type AnimatedTestimonialsProps = {
  testimonials: Testimonial[]
  autoplay?: boolean
  interval?: number
  className?: string
}

// Helper to animate words with gentle stagger
function AnimatedWords({ text }: { text: string }) {
  const words = useMemo(() => (text || '').split(/\s+/), [text])
  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.03 } }
  }
  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0 }
  }
  return (
    <motion.span className="inline-block" initial="hidden" animate="show" variants={containerVariants}>
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          className="inline-block"
          variants={wordVariants}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {w}{' '}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default function AnimatedTestimonials({
  testimonials = [],
  autoplay = false,
  interval = 5000,
  className = ''
}: AnimatedTestimonialsProps) {
  const [index, setIndex] = useState(0)
  const timerRef = useRef<number | null>(null)
  const len = testimonials.length

  useEffect(() => {
    // Clear any existing interval before setting a new one
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    if (!autoplay || len <= 1) return
    timerRef.current = window.setInterval(() => setIndex((i) => (i + 1) % len), interval)
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [autoplay, interval, len])

  const prev = () => setIndex((i) => (i - 1 + len) % len)
  const next = () => setIndex((i) => (i + 1) % len)

  const item = len > 0 ? testimonials[index] : undefined
  const prevItem = len > 1 ? testimonials[(index - 1 + len) % len] : undefined
  const nextItem = len > 1 ? testimonials[(index + 1) % len] : undefined

  return (
    <div
      className={`relative w-full ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') prev()
        else if (e.key === 'ArrowRight') next()
      }}
    >
      <Card className="card-hover bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 border border-border overflow-hidden">
        <div className="grid items-center gap-6 sm:gap-8 md:grid-cols-[minmax(260px,360px),1fr] p-4 sm:p-6 md:p-8">
          {/* Stacked image cards */}
          <motion.div
            className="relative mx-auto w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] aspect-[3/4]"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            dragMomentum={false}
            onDragEnd={(_, info: PanInfo) => {
              const dx = info.offset.x
              if (dx > 40) prev()
              else if (dx < -40) next()
            }}
          >
            {/* Left background (previous) */}
            {prevItem?.src && (
              <motion.img
                key={`bg-left-${prevItem.src}`}
                src={prevItem.src}
                alt=""
                aria-hidden="true"
                role="presentation"
                loading="lazy"
                className="absolute inset-0 h-full w-full rounded-2xl object-cover shadow-xl border border-border"
                initial={{ opacity: 0.35, rotate: -6, x: -24, y: 16, scale: 0.95 }}
                animate={{ opacity: 0.55, rotate: -6, x: -24, y: 16, scale: 0.95 }}
                exit={{ opacity: 0.35 }}
                transition={{ duration: 0.25 }}
                style={{ zIndex: 0 }}
              />
            )}

            {/* Right background (next) */}
            {nextItem?.src && (
              <motion.img
                key={`bg-right-${nextItem.src}`}
                src={nextItem.src}
                alt=""
                aria-hidden="true"
                role="presentation"
                loading="lazy"
                className="absolute inset-0 h-full w-full rounded-2xl object-cover shadow-xl border border-border"
                initial={{ opacity: 0.35, rotate: 6, x: 24, y: 8, scale: 0.95 }}
                animate={{ opacity: 0.55, rotate: 6, x: 24, y: 8, scale: 0.95 }}
                exit={{ opacity: 0.35 }}
                transition={{ duration: 0.25 }}
                style={{ zIndex: 0 }}
              />
            )}

            {/* Primary image */}
            <AnimatePresence mode="wait">
              {item?.src && (
                <motion.img
                  key={`main-${item.src}-${index}`}
                  src={item.src}
                  alt={item?.name ?? 'Testimonial photo'}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full rounded-2xl object-cover shadow-2xl border border-border"
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  style={{ zIndex: 10 }}
                />
              )}
            </AnimatePresence>
          </motion.div>

          {/* Content & controls */}
          <CardContent className="pt-0 md:pt-2 text-center md:text-left">
            <div className="space-y-2 mb-4">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                {item?.name}
              </h3>
              {item?.designation && (
                <div className="text-base md:text-lg text-muted-foreground">{item.designation}{item?.company ? ` at ${item.company}` : ''}</div>
              )}
              <div className="flex flex-wrap items-center gap-3 text-muted-foreground justify-center md:justify-start">
                {typeof item?.rating === 'number' && (
                  <div className="flex items-center gap-1" aria-hidden="true">
                    {Array.from({ length: Math.max(0, Math.min(5, Math.floor(item?.rating ?? 0))) }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                )}
                {item?.location && (
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{item.location}</span>
                  </div>
                )}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={`quote-${index}`}
                className="text-base sm:text-lg leading-relaxed text-foreground/90"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                aria-live="polite"
              >
                <AnimatedWords text={item?.quote || ''} />
              </motion.p>
            </AnimatePresence>

            <div className="mt-5 sm:mt-6 flex gap-3 sm:gap-4 justify-center md:justify-start">
              <button
                aria-label="Previous"
                onClick={prev}
                className="rounded-full p-2 sm:p-3 bg-primary text-primary-foreground shadow hover:opacity-90 transition-opacity"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button
                aria-label="Next"
                onClick={next}
                className="rounded-full p-2 sm:p-3 bg-primary text-primary-foreground shadow hover:opacity-90 transition-opacity"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}