import React from 'react'
import { useResponsive } from '../hooks/useResponsive'

const values = [
  {
    title: 'Trust',
    body:
      'We build trust with our customers, partners, and stakeholders by delivering high-quality products and services that meet their needs and expectations.'
  },
  {
    title: 'Excellence',
    body:
      "We're committed to excellence in everything we do, ensuring that our products and services meet the highest standards of quality and reliability."
  },
  {
    title: 'Innovation',
    body:
      'We foster a culture of innovation, encouraging creativity & experimentation to develop better solutions for a sustainable future.'
  },
  {
    title: 'Sustainability',
    body:
      'We prioritise sustainability in all our operations, striving to minimise our environmental footprint and promote eco-friendly practices.'
  }
]

const ValuesSection = () => {
  const { isMobile } = useResponsive()

  return (
    <section className={`${isMobile ? 'py-10' : 'py-14'} px-4 pb-[var(--bottom-nav-h,56px)]`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {values.map(({ title, body }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-foreground">{title}</h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ValuesSection