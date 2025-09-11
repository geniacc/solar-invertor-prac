import React, { useState, useEffect } from 'react';
import { PhoneOutlined } from '@ant-design/icons';
import './CallToActionStrip.css';

const CallToActionStrip = () => {
  const [highlight, setHighlight] = useState(false);

  // Toggle highlight every 3 seconds for subtle animation
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlight((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`cta-strip ${highlight ? 'highlight' : ''}`}>
      <strong className="cta-text">Ready to switch to solar?</strong>
      <button className="cta-btn" aria-label="Contact Sales">
        <PhoneOutlined className="phone-icon" /> &nbsp;Contact Sales
      </button>
    </section>
  );
};

export default CallToActionStrip;
