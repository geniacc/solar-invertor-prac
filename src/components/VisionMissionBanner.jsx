import React from 'react'
import { useResponsive } from '../hooks/useResponsive'

const VisionMissionBanner = () => {
  const { isMobile } = useResponsive()

  return (
    <section className={`${isMobile ? 'py-10' : 'py-14'} px-4`}>
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-black text-white">
          <div className="absolute inset-0 opacity-60" style={{
            backgroundImage:
              'radial-gradient(1000px 400px at 5% 10%, rgba(255,255,255,0.08), transparent 60%), radial-gradient(800px 300px at 95% 15%, rgba(255,165,0,0.15), transparent 60%)'
          }} />
          <div className={`${isMobile ? 'p-6' : 'p-10'} relative grid md:grid-cols-2 gap-8 items-start`}>
            <div>
              <h2 className={`${isMobile ? 'text-4xl' : 'text-6xl'} font-bold font-display mb-3 gradient-text`}>Vision</h2>
              <p className={`${isMobile ? 'text-base leading-snug' : 'text-lg leading-relaxed'} text-white/85 max-w-xl`}>
                Is to drive a seamless shift towards renewable energy sources, reducing our reliance on fossil fuels and
                mitigating climate change.
              </p>
            </div>
            <div>
              <h2 className={`${isMobile ? 'text-4xl' : 'text-6xl'} font-bold font-display mb-3 gradient-text`}>Mission</h2>
              <p className={`${isMobile ? 'text-base leading-snug' : 'text-lg leading-relaxed'} text-white/85 max-w-xl`}>
                Is to provide innovative energy solutions that make a positive impact on the environment and society.
                We’re committed to develop cutting-edge technologies that enable sustainable transportation and reduce
                carbon emissions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VisionMissionBanner