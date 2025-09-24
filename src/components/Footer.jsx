import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Send,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerSections = [
    {
      title: 'Products',
      links: [
        { label: 'Enterprise Solutions', href: '#products' },
        { label: 'Smart Systems', href: '#smart' },
        { label: 'Cloud Services', href: '#cloud' },
        { label: 'IoT Devices', href: '#iot' },
        { label: 'Accessories', href: '#accessories' }
      ]
    },
    {
      title: 'Solutions',
      links: [
        { label: 'Small Business', href: '#small-business' },
        { label: 'Enterprise', href: '#enterprise' },
        { label: 'Industrial', href: '#industrial' },
        { label: 'Data Analytics', href: '#analytics' },
        { label: 'Integration', href: '#integration' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Installation Guide', href: '#installation' },
        { label: 'Warranty', href: '#warranty' },
        { label: 'Technical Support', href: '#support' },
        { label: 'Documentation', href: '#docs' },
        { label: 'FAQ', href: '#faq' }
      ]
    }
  ];

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: 'info@techcorp.com',
      href: 'mailto:info@techcorp.com'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Address',
      value: '123 Tech Boulevard, Innovation City, CA 90210',
      href: 'https://maps.google.com/?q=123+Tech+Boulevard+Innovation+City+CA'
    }
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' }
  ];

  const certifications = [
    { icon: <Shield className="w-5 h-5" />, text: 'ISO Certified' },
    { icon: <CheckCircle className="w-5 h-5" />, text: 'Quality Assured' },
    { icon: <Globe className="w-5 h-5" />, text: 'Global Reach' }
  ];

  return (
    <footer className="footer">
      {/* Animated Background */}
      <div className="footer-background">
        <div className="energy-grid"></div>
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}></div>
          ))}
        </div>
      </div>

      <div className="footer-content">
        {/* Newsletter Section */}
        <motion.div 
          className="newsletter-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="container">
            <div className="newsletter-content">
              <div className="newsletter-text">
                <h3>Stay Powered Up</h3>
                <p>Get the latest updates on technology innovation and exclusive offers</p>
              </div>
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <div className="input-group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="newsletter-input"
                    required
                  />
                  <button type="submit" className="newsletter-btn">
                    {isSubscribed ? <CheckCircle className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                    {isSubscribed ? 'Subscribed!' : 'Subscribe'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="footer-main">
          <div className="container">
            <div className="footer-grid">
              {/* Company Info */}
              <motion.div 
                className="footer-column company-info"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="footer-logo">
                  <Zap className="logo-icon" />
                  <h3 className="logo-text">Zuice Solar</h3>
                </div>
                <p className="company-description">
                  Leading the future of solar energy innovation with cutting-edge Zuice MU1000 Solar Hybrid PCU and intelligent energy systems.
                </p>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <a key={index} href={social.href} className="social-link" aria-label={social.label}>
                      {social.icon}
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Footer Sections */}
              {footerSections.map((section, index) => (
                <motion.div 
                  key={index}
                  className="footer-column"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <h4 className="footer-heading">{section.title}</h4>
                  <ul className="footer-links">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a href={link.href} className="footer-link">
                          {link.label}
                          <ArrowRight className="link-arrow" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}

              {/* Contact Info */}
              <motion.div 
                className="footer-column contact-info"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h4 className="footer-heading">Contact Us</h4>
                <div className="contact-list">
                  {contactInfo.map((contact, index) => (
                    <a key={index} href={contact.href} className="contact-item">
                      <div className="contact-icon">
                        {contact.icon}
                      </div>
                      <div className="contact-details">
                        <span className="contact-label">{contact.label}</span>
                        <span className="contact-value">{contact.value}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="container">
            <div className="footer-bottom-content">
              <div className="copyright">
                <p>© {currentYear} TechCorp. All rights reserved.</p>
                <div className="legal-links">
                  <a href="#privacy">Privacy Policy</a>
                  <a href="#terms">Terms of Service</a>
                  <a href="#cookies">Cookie Policy</a>
                </div>
              </div>
              <div className="certifications">
                {certifications.map((cert, index) => (
                  <div key={index} className="certification">
                    {cert.icon}
                    <span>{cert.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Energy Wave Animation */}
      <div className="energy-wave"></div>
    </footer>
  );
};

export default Footer;