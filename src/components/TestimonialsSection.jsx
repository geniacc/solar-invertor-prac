import React from 'react'
import TestimonialsCarousel from '@/components/ui/testimonials-carousel'

// Project-specific testimonials: real-world ESS and inverter outcomes
const TESTIMONIALS = [
  {
    quote:
      "Our 12.8V 100Ah ESS cut our evening bills and keeps the lights on during outages. Charging from solar is fast, and the app makes it simple to track usage.",
    name: 'Aisha Khan',
    role: 'Homeowner • 12.8V ESS',
    src: '/images/cutomer 1.jpg',
  },
  {
    quote:
      'With the 125kW/261kWh system, we reduced generator hours and stabilized production. The monitoring dashboard gives us clear insights and alerts when loads spike.',
    name: 'David Okoro',
    role: 'Factory Manager • 125kW / 261kWh',
    src: '/images/customer 2.jpg',
  },
  {
    quote:
      'Silent backup keeps our refrigeration and POS running flawlessly. Installation was smooth, and our team loves the reliability—no more late-night power worries.',
    name: 'Priya Desai',
    role: 'Restaurant Owner • Commercial ESS',
    src: '/images/customer 3.jpg',
  },
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="rounded-2xl border bg-muted/30 dark:bg-muted/40 p-6 sm:p-8">
      <TestimonialsCarousel items={TESTIMONIALS} autoPlay={false} />
    </section>
  )
}