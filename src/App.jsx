import React from 'react';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import StatsSection from './components/StatsSection';
import CallToActionStrip from './components/CallToActionStrip';
import FAQSection from './components/FAQSection';

function App() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <CallToActionStrip />
      <FAQSection />
    </div>
  );
}

export default App;
