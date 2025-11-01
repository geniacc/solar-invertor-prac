import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'

export default function TestimonialsCarousel({ items = [], autoPlay = false, interval = 5000 }) {
  const [index, setIndex] = useState(0)
  const len = items.length || 0

  useEffect(() => {
    if (!autoPlay || len <= 1) return
    const t = setInterval(() => setIndex((i) => (i + 1) % len), interval)
    return () => clearInterval(t)
  }, [autoPlay, interval, len])

  const prev = () => setIndex((i) => (i - 1 + len) % len)
  const next = () => setIndex((i) => (i + 1) % len)

  const item = items[index] || {}
  const prevIndex = (index - 1 + len) % len
  const nextIndex = (index + 1) % len
  const prevItem = items[prevIndex] || {}
  const nextItem = items[nextIndex] || {}

  return (
    <div className="relative">
      <Card className="card-hover overflow-hidden">
        <div className="grid gap-8 md:grid-cols-[380px,1fr] items-center p-6">
          {/* Layered images */}
          <div className="relative mx-auto w-[300px] h-[400px] md:w-[340px] md:h-[440px]">
            {/* Left background (previous) */}
            <motion.img
              key={`bg-left-${prevItem.src}`}
              src={prevItem.src}
              alt=""
              loading="lazy"
              className="absolute inset-0 rounded-2xl object-cover shadow-xl border border-border"
              initial={{ opacity: 0.4, rotate: -6, x: -24, y: 16, scale: 0.95 }}
              animate={{ opacity: 0.6, rotate: -6, x: -24, y: 16, scale: 0.95 }}
              exit={{ opacity: 0.4 }}
              transition={{ duration: 0.25 }}
              style={{ zIndex: 0 }}
            />

            {/* Right background (next) */}
            <motion.img
              key={`bg-right-${nextItem.src}`}
              src={nextItem.src}
              alt=""
              loading="lazy"
              className="absolute inset-0 rounded-2xl object-cover shadow-xl border border-border"
              initial={{ opacity: 0.4, rotate: 6, x: 24, y: 8, scale: 0.95 }}
              animate={{ opacity: 0.6, rotate: 6, x: 24, y: 8, scale: 0.95 }}
              exit={{ opacity: 0.4 }}
              transition={{ duration: 0.25 }}
              style={{ zIndex: 0 }}
            />

            {/* Main image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={`main-${item.src}`}
                src={item.src}
                alt={item.name}
                loading="lazy"
                className="absolute inset-0 rounded-2xl object-cover shadow-2xl border border-border"
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                style={{ zIndex: 10 }}
              />
            </AnimatePresence>
          </div>

          {/* Content and controls */}
          <CardContent className="pt-0 md:pt-2">
            <div className="space-y-2 mb-4">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">{item.name}</h3>
              <div className="text-base md:text-lg text-muted-foreground">{item.role}</div>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={`quote-${item.quote}`}
                className="text-lg leading-relaxed text-foreground/90"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
              >
                {item.quote}
              </motion.p>
            </AnimatePresence>

            <div className="mt-6 flex gap-4">
              <button
                aria-label="Previous"
                onClick={prev}
                className="rounded-full p-3 bg-primary text-primary-foreground shadow hover:opacity-90 transition-opacity"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                aria-label="Next"
                onClick={next}
                className="rounded-full p-3 bg-primary text-primary-foreground shadow hover:opacity-90 transition-opacity"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}