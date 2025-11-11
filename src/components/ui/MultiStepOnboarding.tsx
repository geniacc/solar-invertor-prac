import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCircle, Loader2, Circle } from 'lucide-react'

type MultiStepOnboardingProps = {
  open: boolean
  steps: string[]
  onClose: () => void
  onComplete?: () => void
  durationPerStep?: number // ms per step
  textOnly?: boolean // render steps as text-only with glyphs
  showProgress?: boolean // show progress bar
}

export default function MultiStepOnboarding({
  open,
  steps,
  onClose,
  onComplete,
  durationPerStep = 900,
  textOnly = true,
  showProgress = false
}: MultiStepOnboardingProps) {
  const [current, setCurrent] = useState(0)
  const [running, setRunning] = useState(false)
  const timer = useRef<number | null>(null)

  const total = steps.length
  const progress = useMemo(() => (total > 0 ? Math.min(100, Math.round(((current) / total) * 100)) : 0), [current, total])

  useEffect(() => {
    if (!open) {
      // reset state when closed
      setRunning(false)
      setCurrent(0)
      if (timer.current) {
        clearInterval(timer.current)
        timer.current = null
      }
      return
    }

    // start animation
    setRunning(true)
    setCurrent(0)
    let stepIndex = 0
    if (timer.current) {
      clearInterval(timer.current)
      timer.current = null
    }
    timer.current = window.setInterval(() => {
      stepIndex += 1
      setCurrent(stepIndex)
      if (stepIndex >= total) {
        if (timer.current) {
          clearInterval(timer.current)
          timer.current = null
        }
        setRunning(false)
        onComplete?.()
      }
    }, durationPerStep)

    return () => {
      if (timer.current) {
        clearInterval(timer.current)
        timer.current = null
      }
    }
  }, [open, total, durationPerStep, onComplete])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Dark overlay with heavy blur and decorative gradient */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-blue-500/25 via-purple-500/15 to-transparent" />
          {/* Center glow */}
          <div className="pointer-events-none absolute inset-0 flex justify-center">
            <div className="h-64 w-64 bg-blue-500/20 rounded-full blur-3xl translate-y-24" />
          </div>

          <motion.div
            className="relative w-[92%] sm:w-[580px] max-w-[92vw] rounded-2xl text-white"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 pt-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">Welcome to Zuice</h3>
              </div>
              <button aria-label="Close" onClick={onClose} className="rounded-full p-1.5 bg-white/10 hover:bg-white/20 transition">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="px-5 sm:px-6 pb-5 sm:pb-6">
              {/* Progress (optional) */}
              {showProgress && (
                <div className="mt-4 mb-5">
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-white/70">Step {Math.min(current + 1, total)} of {total}</div>
                </div>
              )}

              {/* Steps List */}
              <div className="space-y-2.5">
                {steps.map((label, i) => {
                  const done = i < current
                  const active = i === current
                  const upcoming = i > current

                  return (
                    <motion.div
                      key={label}
                      className={`flex items-center justify-between rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 ${active ? 'bg-white/5 ring-1 ring-white/10' : 'bg-transparent'}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <div className="flex items-center gap-3">
                        {/* Status icon */}
                        <div className={`flex items-center justify-center h-5 w-5 rounded-full ${done ? 'bg-green-500/15 text-green-400 border border-green-400/30' : active ? 'bg-blue-500/15 text-blue-300 border border-blue-400/30' : 'bg-white/5 text-white/50 border border-white/15'}`}>
                          {done ? (
                            <CheckCircle className="h-3.5 w-3.5" />
                          ) : active ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Circle className="h-3.5 w-3.5" />
                          )}
                        </div>

                        {/* Label */}
                        <div className={`text-xs sm:text-sm ${done ? 'text-white/85' : active ? 'text-white' : 'text-white/60'}`}>
                          {label}
                        </div>
                      </div>

                      {/* Status chip (right) */}
                      <div className="flex items-center">
                        {done && (
                          <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-green-500/15 text-green-300 border border-green-400/30">Checked</span>
                        )}
                        {active && (
                          <motion.span
                            className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-400/30"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 1.4, repeat: Infinity }}
                          >
                            Processing
                          </motion.span>
                        )}
                        {upcoming && (
                          <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/60 border border-white/15">Next</span>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Footer Actions */}
              <div className="mt-5 flex items-center justify-between gap-3">
                <div className="text-xs text-white/60">Tip: Use “Explore Zuice Solutions” to start shopping.</div>
                <button
                  type="button"
                  aria-label="Open chat support"
                  onClick={() => {
                    // Open the global ChatBot via window event and close onboarding
                    window.dispatchEvent(new Event('open-chatbot'))
                    onClose()
                  }}
                  className="text-xs font-medium text-white/80 hover:text-white underline underline-offset-2"
                >
                  Chat with us
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}