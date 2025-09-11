import React, { useState, useRef, useEffect } from 'react';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import './FAQSection.css';

const faqs = [
  { question: "Is the inverter compatible with existing solar panels?", answer: "Yes, it's compatible with most panels on the Indian market." },
  { question: "Can I monitor performance on my phone?", answer: "Absolutely! Our mobile app provides real-time performance tracking." },
  { question: "What about weather resistance?", answer: "Our inverters are fully dustproof and weather-sealed to IP65 standard." }
];

const FAQItem = ({ faq, isOpen, onClick }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState('0px');

  useEffect(() => {
    if (isOpen) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight('0px');
    }
  }, [isOpen]);

  return (
    <div className={`faq-item${isOpen ? ' open' : ''}`} onClick={onClick}>
      <div className="faq-q">
        <span className={`faq-icon${isOpen ? ' rotate' : ''}`}>
          {isOpen ? <MinusOutlined /> : <PlusOutlined />}
        </span>
        {faq.question}
      </div>
      <div
        ref={contentRef}
        className="faq-a"
        style={{ maxHeight: height }}
      >
        {faq.answer}
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [open, setOpen] = useState(null);

  return (
    <section className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, idx) => (
          <FAQItem
            key={idx}
            faq={faq}
            isOpen={open === idx}
            onClick={() => setOpen(open === idx ? null : idx)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
