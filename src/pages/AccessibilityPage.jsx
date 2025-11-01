import React from 'react'
import { motion } from 'framer-motion'

export default function AccessibilityPage() {
  return (
    <div className="container-custom py-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-4"
      >
        Accessibility
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-muted-foreground"
      >
        We are committed to making our site accessible to everyone.
      </motion.p>
    </div>
  )
}