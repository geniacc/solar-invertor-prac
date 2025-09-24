import React, { useState, useRef, useEffect } from 'react';
import { PlusOutlined, MinusOutlined, SearchOutlined, QuestionCircleOutlined, BulbOutlined } from '@ant-design/icons';
import { Input, Button, Tag } from 'antd';
import './FAQSection.css';

const faqs = [
  { 
    question: "Is the inverter compatible with existing solar panels?", 
    answer: "Yes, our inverters are compatible with most solar panels available in the Indian market. We support both monocrystalline and polycrystalline panels from major manufacturers. Our technical team can assess your existing setup and recommend the best configuration.",
    category: "Technical",
    popular: true
  },
  { 
    question: "Can I monitor performance on my phone?", 
    answer: "Absolutely! Our mobile app provides real-time performance tracking, energy production monitoring, and system health alerts. You can view daily, monthly, and yearly reports, set up notifications, and even control certain system parameters remotely.",
    category: "Monitoring",
    popular: true
  },
  { 
    question: "What about weather resistance?", 
    answer: "Our inverters are fully dustproof and weather-sealed to IP65 standard, making them suitable for harsh Indian weather conditions. They can operate in temperatures ranging from -25°C to +60°C and are designed to withstand heavy rain, dust storms, and extreme humidity.",
    category: "Technical",
    popular: false
  },
  { 
    question: "How long is the warranty period?", 
    answer: "We offer a comprehensive 10-year warranty on our inverters, covering both parts and labor. The warranty includes free maintenance for the first 2 years and priority support throughout the warranty period. Extended warranty options are also available.",
    category: "Warranty",
    popular: true
  },
  { 
    question: "What is the installation process?", 
    answer: "Our installation process is streamlined and professional. It includes site assessment, system design, permit handling, installation by certified technicians, testing, and commissioning. The entire process typically takes 3-5 days depending on system complexity.",
    category: "Installation",
    popular: false
  },
  { 
    question: "Can I expand my system later?", 
    answer: "Yes, our modular design allows for easy system expansion. You can add more panels or upgrade components as your energy needs grow. Our team will help you plan the expansion to ensure optimal performance and compatibility.",
    category: "Technical",
    popular: false
  }
];

const FAQItem = ({ faq, isOpen, onClick, index }) => {
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
    <div 
      className={`faq-item ${isOpen ? 'open' : ''} ${faq.popular ? 'popular' : ''}`}
      onClick={onClick}
      style={{ '--animation-delay': `${index * 0.1}s` }}
    >
      <div className="faq-header">
        <div className="faq-question-container">
          <span className={`faq-icon ${isOpen ? 'rotate' : ''}`}>
            {isOpen ? <MinusOutlined /> : <PlusOutlined />}
          </span>
          <span className="faq-question">{faq.question}</span>
        </div>
        <div className="faq-meta">
          {faq.popular && <Tag color="gold" className="popular-tag">Popular</Tag>}
          <Tag color="blue" className="category-tag">{faq.category}</Tag>
        </div>
      </div>
      <div
        ref={contentRef}
        className="faq-answer"
        style={{ maxHeight: height }}
      >
        <div className="faq-answer-content">
          {faq.answer}
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [open, setOpen] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const categories = ['All', ...new Set(faqs.map(faq => faq.category))];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section ref={sectionRef} className="faq-section">
      <div className="faq-header-section">
        <h2 className={`faq-title ${isVisible ? 'animate-in' : ''}`}>
          <QuestionCircleOutlined className="title-icon" />
          Frequently Asked Questions
        </h2>
        <p className={`faq-subtitle ${isVisible ? 'animate-in' : ''}`}>
          Find answers to common questions about our solar solutions
        </p>
      </div>

      <div className={`faq-controls ${isVisible ? 'animate-in' : ''}`}>
        <div className="search-container">
          <Input
            placeholder="Search FAQs..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="faq-search"
          />
        </div>
        <div className="category-filters">
          {categories.map(category => (
            <Button
              key={category}
              type={selectedCategory === category ? 'primary' : 'default'}
              onClick={() => setSelectedCategory(category)}
              className="category-btn"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="faq-stats">
        <div className="stat-item">
          <BulbOutlined className="stat-icon" />
          <span className="stat-number">{faqs.length}</span>
          <span className="stat-label">Questions</span>
        </div>
        <div className="stat-item">
          <QuestionCircleOutlined className="stat-icon" />
          <span className="stat-number">{faqs.filter(f => f.popular).length}</span>
          <span className="stat-label">Popular</span>
        </div>
        <div className="stat-item">
          <SearchOutlined className="stat-icon" />
          <span className="stat-number">{filteredFaqs.length}</span>
          <span className="stat-label">Filtered</span>
        </div>
      </div>

      <div className="faq-list">
        {filteredFaqs.map((faq, idx) => (
          <FAQItem
            key={idx}
            faq={faq}
            isOpen={open === idx}
            onClick={() => setOpen(open === idx ? null : idx)}
            index={idx}
          />
        ))}
      </div>

      {filteredFaqs.length === 0 && (
        <div className="no-results">
          <QuestionCircleOutlined className="no-results-icon" />
          <h3>No FAQs found</h3>
          <p>Try adjusting your search terms or category filter</p>
        </div>
      )}
    </section>
  );
};

export default FAQSection;
