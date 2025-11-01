import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// CircularTestimonials: places avatars on a circle and shows active quote in center
export function CircularTestimonials({
  testimonials = [],
  autoplay = false,
  interval = 4000,
  colors = {},
  fontSizes = {},
}) {
  const [active, setActive] = useState(0)
  const timerRef = useRef(null)

  const n = testimonials.length || 1
  const angles = useMemo(() => testimonials.map((_, i) => (360 / n) * i), [n, testimonials])
  const radius = 160 // px, balanced for common container sizes

  const next = () => setActive((a) => (a + 1) % n)
  const prev = () => setActive((a) => (a - 1 + n) % n)

  useEffect(() => {
    if (!autoplay || n <= 1) return
    timerRef.current = setInterval(next, interval)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [autoplay, interval, n])

  const pauseAutoplay = () => timerRef.current && clearInterval(timerRef.current)

  const {
    name: nameColor = '#0a0a0a',
    designation: designationColor = '#454545',
    testimony: quoteColor = '#171717',
    arrowBackground = '#141414',
    arrowForeground = '#f1f1f7',
    arrowHoverBackground = '#00A6FB',
  } = colors

  const {
    name: nameSize = '18px',
    designation: designationSize = '14px',
    quote: quoteSize = '16px',
  } = fontSizes

  const activeItem = testimonials[active] || {}

  return (
    <div
      className="relative w-full flex items-center justify-center"
      style={{ minHeight: 420 }}
      onMouseEnter={pauseAutoplay}
      onMouseLeave={() => {
        if (autoplay) timerRef.current = setInterval(next, interval)
      }}
    >
      {/* Center content */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center max-w-xl px-4"
      >
        <p
          style={{ color: quoteColor, fontSize: quoteSize }}
          className="leading-relaxed"
        >
          {activeItem.quote}
        </p>
        <div className="mt-4">
          <div style={{ color: nameColor, fontSize: nameSize }} className="font-semibold">
            {activeItem.name}
          </div>
          <div style={{ color: designationColor, fontSize: designationSize }} className="opacity-80">
            {activeItem.designation}
          </div>
        </div>
      </motion.div>

      {/* Avatars around circle */}
      <div className="absolute inset-0 pointer-events-none">
        {testimonials.map((t, i) => {
          const angle = angles[i]
          const rad = (angle * Math.PI) / 180
          const x = Math.cos(rad) * radius
          const y = Math.sin(rad) * radius
          const isActive = i === active
          return (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(${x}px, ${y}px)` }}
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: isActive ? 1.1 : 0.9, opacity: isActive ? 1 : 0.85 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <img
                src={t.src}
                alt={t.name}
                loading="lazy"
                className={`rounded-full border ${isActive ? 'border-blue-500' : 'border-transparent'} shadow-md`}
                style={{ width: 68, height: 68, objectFit: 'cover' }}
              />
            </motion.div>
          )
        })}
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-4 pointer-events-auto">
        <button
          aria-label="Previous testimonial"
          onClick={prev}
          className="rounded-full p-2 transition-colors"
          style={{ background: arrowBackground, color: arrowForeground }}
          onMouseEnter={(e) => (e.currentTarget.style.background = arrowHoverBackground)}
          onMouseLeave={(e) => (e.currentTarget.style.background = arrowBackground)}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          aria-label="Next testimonial"
          onClick={next}
          className="rounded-full p-2 transition-colors"
          style={{ background: arrowBackground, color: arrowForeground }}
          onMouseEnter={(e) => (e.currentTarget.style.background = arrowHoverBackground)}
          onMouseLeave={(e) => (e.currentTarget.style.background = arrowBackground)}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}