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
  CheckCircle,
  Youtube,
  Github,
  Award,
  Clock,
  Users,
  Headphones,
  Download,
  ExternalLink
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
        { label: 'Zuice μ1000 Hybrid PCU', href: '/products/mu1000', icon: <Zap className="w-4 h-4" /> },
        { label: 'Smart Inverters', href: '/products/inverters', icon: <Shield className="w-4 h-4" /> },
        { label: 'Solar Panels', href: '/products/panels', icon: <Globe className="w-4 h-4" /> },
        { label: 'Battery Systems', href: '/products/batteries', icon: <Award className="w-4 h-4" /> },
        { label: 'Monitoring Systems', href: '/products/monitoring', icon: <Clock className="w-4 h-4" /> }
      ]
    },
    {
      title: 'Solutions',
      links: [
        { label: 'Residential Solar', href: '/solutions/residential', icon: <Users className="w-4 h-4" /> },
        { label: 'Commercial Solar', href: '/solutions/commercial', icon: <Shield className="w-4 h-4" /> },
        { label: 'Industrial Solutions', href: '/solutions/industrial', icon: <Globe className="w-4 h-4" /> },
        { label: 'Energy Storage', href: '/solutions/storage', icon: <Award className="w-4 h-4" /> },
        { label: 'Grid Integration', href: '/solutions/grid', icon: <Zap className="w-4 h-4" /> }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Installation Guide', href: '/support/installation', icon: <Download className="w-4 h-4" /> },
        { label: 'Technical Support', href: '/support/technical', icon: <Headphones className="w-4 h-4" /> },
        { label: 'Warranty Information', href: '/support/warranty', icon: <Shield className="w-4 h-4" /> },
        { label: 'Documentation', href: '/support/docs', icon: <ExternalLink className="w-4 h-4" /> },
        { label: 'FAQ', href: '/support/faq', icon: <CheckCircle className="w-4 h-4" /> }
      ]
    }
  ];

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
      description: '24/7 Support Available'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: 'info@zuice.com',
      href: 'mailto:info@zuice.com',
      description: 'Quick Response Guaranteed'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Address',
      value: '123 Solar Boulevard, Green City, CA 90210',
      href: 'https://maps.google.com/?q=123+Solar+Boulevard+Green+City+CA',
      description: 'Visit Our Showroom'
    }
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: 'https://facebook.com/zuice', label: 'Facebook', color: '#1877F2' },
    { icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com/zuice', label: 'Twitter', color: '#1DA1F2' },
    { icon: <Instagram className="w-5 h-5" />, href: 'https://instagram.com/zuice', label: 'Instagram', color: '#E4405F' },
    { icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com/company/zuice', label: 'LinkedIn', color: '#0A66C2' },
    { icon: <Youtube className="w-5 h-5" />, href: 'https://youtube.com/zuice', label: 'YouTube', color: '#FF0000' },
    { icon: <Github className="w-5 h-5" />, href: 'https://github.com/zuice', label: 'GitHub', color: '#333' }
  ];

  const certifications = [
    { icon: <Shield className="w-5 h-5" />, text: 'ISO 9001:2015', description: 'Quality Management' },
    { icon: <CheckCircle className="w-5 h-5" />, text: 'IEC 62109', description: 'Safety Standards' },
    { icon: <Award className="w-5 h-5" />, text: 'UL Listed', description: 'Safety Certified' },
    { icon: <Globe className="w-5 h-5" />, text: 'CE Marked', description: 'European Conformity' }
  ];

  const quickStats = [
    { number: '50K+', label: 'Happy Customers', icon: <Users className="w-6 h-6" /> },
    { number: '100MW+', label: 'Solar Installed', icon: <Zap className="w-6 h-6" /> },
    { number: '25+', label: 'Countries Served', icon: <Globe className="w-6 h-6" /> },
    { number: '24/7', label: 'Support Available', icon: <Headphones className="w-6 h-6" /> }
  ];

  return (
    <footer className="footer">
      {/* Animated Background */}
      <div className="footer-background">
        <div className="energy-grid"></div>
        <div className="floating-particles">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}></div>
          ))}
        </div>
      </div>

      <div className="footer-content">
        {/* Quick Stats Section */}
        <motion.div 
          className="stats-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="container">
            <div className="stats-grid">
              {quickStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="stat-icon">
                    {stat.icon}
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

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
                <h3>Stay Powered Up with Zuice</h3>
                <p>Get the latest updates on solar technology, energy solutions, and exclusive offers delivered to your inbox</p>
                <div className="newsletter-benefits">
                  <div className="benefit">
                    <CheckCircle className="w-4 h-4" />
                    <span>Weekly energy tips</span>
                  </div>
                  <div className="benefit">
                    <CheckCircle className="w-4 h-4" />
                    <span>Product updates</span>
                  </div>
                  <div className="benefit">
                    <CheckCircle className="w-4 h-4" />
                    <span>Exclusive discounts</span>
                  </div>
                </div>
              </div>
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <div className="input-group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="newsletter-input"
                    required
                  />
                  <motion.button 
                    type="submit" 
                    className="newsletter-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubscribed ? <CheckCircle className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                    {isSubscribed ? 'Subscribed!' : 'Subscribe'}
                  </motion.button>
                </div>
                {isSubscribed && (
                  <motion.p
                    className="success-message"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    Thank you for subscribing! Check your email for confirmation.
                  </motion.p>
                )}
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
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    <Zap className="logo-icon" />
                  </motion.div>
                  <h3 className="logo-text">Zuice</h3>
                </div>
                <p className="company-description">
                  Leading the future of renewable energy with innovative solar solutions. Our Zuice μ1000 Hybrid PCU and intelligent energy systems are transforming how the world powers itself.
                </p>
                <div className="company-highlights">
                  <div className="highlight">
                    <Award className="w-4 h-4" />
                    <span>Industry Leader Since 2015</span>
                  </div>
                  <div className="highlight">
                    <Shield className="w-4 h-4" />
                    <span>25-Year Warranty</span>
                  </div>
                  <div className="highlight">
                    <Globe className="w-4 h-4" />
                    <span>Global Presence</span>
                  </div>
                </div>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <motion.a 
                      key={index} 
                      href={social.href} 
                      className="social-link" 
                      aria-label={social.label}
                      whileHover={{ 
                        scale: 1.1, 
                        backgroundColor: social.color + '20',
                        borderColor: social.color 
                      }}
                      whileTap={{ scale: 0.95 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.icon}
                    </motion.a>
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
                        <motion.a 
                          href={link.href} 
                          className="footer-link"
                          whileHover={{ x: 5 }}
                        >
                          <div className="link-content">
                            {link.icon}
                            <span>{link.label}</span>
                          </div>
                          <ArrowRight className="link-arrow" />
                        </motion.a>
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
                <h4 className="footer-heading">Get in Touch</h4>
                <div className="contact-list">
                  {contactInfo.map((contact, index) => (
                    <motion.a 
                      key={index} 
                      href={contact.href} 
                      className="contact-item"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="contact-icon">
                        {contact.icon}
                      </div>
                      <div className="contact-details">
                        <span className="contact-label">{contact.label}</span>
                        <span className="contact-value">{contact.value}</span>
                        <span className="contact-description">{contact.description}</span>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Business Hours */}
                <div className="business-hours">
                  <h5>Business Hours</h5>
                  <div className="hours-list">
                    <div className="hours-item">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="hours-item">
                      <span>Saturday</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="hours-item">
                      <span>Sunday</span>
                      <span>Emergency Support Only</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <motion.div 
          className="certifications-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="container">
            <h4 className="certifications-title">Certifications & Standards</h4>
            <div className="certifications-grid">
              {certifications.map((cert, index) => (
                <motion.div 
                  key={index} 
                  className="certification-item"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="cert-icon">
                    {cert.icon}
                  </div>
                  <div className="cert-content">
                    <span className="cert-title">{cert.text}</span>
                    <span className="cert-description">{cert.description}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="container">
            <div className="footer-bottom-content">
              <div className="copyright">
                <p>© {currentYear} Zuice Energy Solutions. All rights reserved.</p>
                <div className="legal-links">
                  <a href="/privacy">Privacy Policy</a>
                  <a href="/terms">Terms of Service</a>
                  <a href="/cookies">Cookie Policy</a>
                  <a href="/accessibility">Accessibility</a>
                </div>
              </div>
              <div className="footer-meta">
                <div className="powered-by">
                  <span>Powered by renewable energy</span>
                  <Zap className="w-4 h-4 text-green-400" />
                </div>
                <div className="version-info">
                  <span>Version 2.1.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Energy Wave Animation */}
      <div className="energy-wave-container">
        <motion.div 
          className="energy-wave"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        <motion.div 
          className="energy-wave secondary"
          animate={{
            backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;