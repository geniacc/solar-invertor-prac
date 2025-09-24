import React, { useState, useEffect } from 'react';
import { MenuOutlined, CloseOutlined, HomeOutlined, ThunderboltOutlined, SettingOutlined, QuestionCircleOutlined, PhoneOutlined, BulbOutlined } from '@ant-design/icons';
import './FloatingNavbar.css';

const FloatingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 100);

      // Determine active section based on scroll position
      const sections = ['hero', 'features', 'how-it-works', 'stats', 'faq', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(currentSection || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home', icon: <HomeOutlined />, color: '#06b6d4' },
    { id: 'features', label: 'Features', icon: <ThunderboltOutlined />, color: '#ec4899' },
    { id: 'how-it-works', label: 'How It Works', icon: <SettingOutlined />, color: '#10b981' },
    { id: 'stats', label: 'Stats', icon: <BulbOutlined />, color: '#f59e0b' },
    { id: 'faq', label: 'FAQ', icon: <QuestionCircleOutlined />, color: '#8b5cf6' },
    { id: 'contact', label: 'Contact', icon: <PhoneOutlined />, color: '#ef4444' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Navbar Container */}
      <div className={`floating-navbar ${isVisible ? 'visible' : ''} ${isOpen ? 'open' : ''}`}>
        {/* Main Toggle Button */}
        <button 
          className="navbar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation"
        >
          <div className="toggle-icon">
            {isOpen ? <CloseOutlined /> : <MenuOutlined />}
          </div>
          <div className="toggle-pulse"></div>
        </button>

        {/* Navigation Items */}
        <div className="navbar-items">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              className={`navbar-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
              style={{ 
                '--item-color': item.color,
                '--delay': `${index * 0.1}s`
              }}
              aria-label={`Go to ${item.label}`}
            >
              <div className="item-icon">
                {item.icon}
              </div>
              <div className="item-label">
                {item.label}
              </div>
              <div className="item-indicator"></div>
            </button>
          ))}
        </div>

        {/* Background Glow Effect */}
        <div className="navbar-glow"></div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="navbar-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default FloatingNavbar;
