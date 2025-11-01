import React from 'react'
import { motion } from 'framer-motion'

export default function TermsPage() {
  return (
    <div className="container-custom py-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-4"
      >
        Terms of Service
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-muted-foreground"
      >
        These terms govern your use of Zuice services and products.
      </motion.p>
    </div>
  )
}