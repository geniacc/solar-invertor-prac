import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin, MapPin, Shield, Globe, Zap, CheckCircle, Send } from 'lucide-react';
import './Footer.css';
import { useUIStore } from '../store/useStore';

const Footer = () => {
  const [currentYear] = useState(new Date().getFullYear());
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);
  const [cookies, setCookies] = useState(() => {
    try {
      const saved = localStorage.getItem('cookie_prefs');
      return saved ? JSON.parse(saved) : { necessary: true, performance: true, marketing: false };
    } catch {
      return { necessary: true, performance: true, marketing: false };
    }
  });

  const navLinks = [
    { label: 'Products', to: '/products' },
    { label: 'Services', to: '/services' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  const socialLinks = [
    { icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com/company/zuice' },
    { icon: <Instagram className="w-5 h-5" />, href: 'https://instagram.com/zuice' },
    { icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com/zuice' },
    { icon: <Facebook className="w-5 h-5" />, href: 'https://facebook.com/zuice' },
  ];

  const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'Features', to: '/products' },
    { label: 'Gallery', to: '/products' },
    { label: 'Testimonials', to: '/about' },
  ];

  const solutions = [
    { label: 'Residential ESS', to: '/services' },
    { label: 'Commercial ESS', to: '/services' },
    { label: 'Industrial ESS', to: '/services' },
  ];

  const resources = [
    { label: 'Brochure', href: '/brochure.pdf' },
    { label: 'Device Monitoring', to: '/device-monitoring' },
    { label: 'FAQ', to: '/about' },
  ];

  const badges = [
    { icon: <Shield className="w-4 h-4" />, text: 'ISO 9001' },
    { icon: <CheckCircle className="w-4 h-4" />, text: 'UL Listed' },
    { icon: <Globe className="w-4 h-4" />, text: 'CE Marked' },
    { icon: <Zap className="w-4 h-4" />, text: 'Green Powered' },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 2500);
    setEmail('');
  };

  const toggleCookie = (key) => setCookies((prev) => ({ ...prev, [key]: !prev[key] }));
  const saveCookiePrefs = () => {
    try {
      localStorage.setItem('cookie_prefs', JSON.stringify(cookies));
    } catch {}
    setCookieOpen(false);
  };

  const setAssistantsHidden = useUIStore((s) => s.setAssistantsHidden);
  const footerRef = useRef(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      // On mobile, keep assistants visible even if footer intersects
      const isPhone = window.innerWidth < 640;
      if (isPhone) {
        setAssistantsHidden(false);
        return;
      }
      setAssistantsHidden(entry.isIntersecting && entry.intersectionRatio > 0.2);
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [setAssistantsHidden]);

  return (
    <footer ref={footerRef} className="footer footer-minimal">
      <div className="container">
        {/* Animated accent background */}
        <div className="footer-accent" aria-hidden="true" />

        <div className="footer-top">
          <div className="footer-brand">
            <motion.img
              src="/images/solar-banner-removebg-preview.png"
              alt="Zuice Logo"
              className="logo-icon"
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            />
            <div className="brand-texts">
              <h3 className="logo-text">Zuice</h3>
              <p className="brand-tagline">Energy that doesn’t quit.</p>
            </div>
          </div>

          <nav className="footer-nav">
            {navLinks.map((link) => (
              <motion.div key={link.label} whileHover={{ y: -2 }}>
                <Link to={link.to} className="footer-nav-link">
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="footer-social">
            {socialLinks.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                className="social-pill"
                whileHover={{ scale: 1.06, rotate: 1 }}
                whileTap={{ scale: 0.98 }}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Social link"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
          {/* Animated energy line under the nav */}
          <div className="energy-line" aria-hidden="true" />
        </div>

        <div className="footer-contact-row">
          <a href="tel:+15551234567" className="contact-pill"><Phone className="w-4 h-4" /> <span>+1 (555) 123-4567</span></a>
          <a href="mailto:info@zuice.energy" className="contact-pill"><Mail className="w-4 h-4" /> <span>info@zuice.energy</span></a>
          <a href="https://maps.google.com/?q=Green+City" target="_blank" rel="noopener noreferrer" className="contact-pill"><MapPin className="w-4 h-4" /> <span>Green City, CA</span></a>
        </div>

        {/* Link tiles */}
        <div className="footer-tiles">
          <div className="tile">
            <h4 className="tile-title">Quick Links</h4>
            <ul className="tile-links">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <motion.div whileHover={{ x: 3 }}>
                    <Link to={l.to} className="tile-link">{l.label}</Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>
          <div className="tile">
            <h4 className="tile-title">Solutions</h4>
            <ul className="tile-links">
              {solutions.map((l) => (
                <li key={l.label}>
                  <motion.div whileHover={{ x: 3 }}>
                    <Link to={l.to} className="tile-link">{l.label}</Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>
          <div className="tile">
            <h4 className="tile-title">Resources</h4>
            <ul className="tile-links">
              {resources.map((l) => (
                <li key={l.label}>
                  {'href' in l ? (
                    <motion.a href={l.href} className="tile-link" target="_blank" rel="noopener noreferrer" whileHover={{ x: 3 }}>{l.label}</motion.a>
                  ) : (
                    <motion.div whileHover={{ x: 3 }}>
                      <Link to={l.to} className="tile-link">{l.label}</Link>
                    </motion.div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="newsletter-min">
          <div className="newsletter-text">
            <h4>Stay in the loop</h4>
            <p>Product drops, tips, and ESS insights—no spam.</p>
          </div>
          <form onSubmit={handleSubscribe} className="newsletter-form-min">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" aria-label="Email" />
            <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
              <Send className="w-4 h-4" />
              Subscribe
            </motion.button>
            {subscribed && <span className="newsletter-ok">Thanks! Check your inbox.</span>}
          </form>
        </div>

        {/* Badges */}
        <div className="footer-badges">
          {badges.map((b, i) => (
            <motion.div key={i} className="badge-pill" whileHover={{ y: -2 }}>
              {b.icon}
              <span>{b.text}</span>
            </motion.div>
          ))}
        </div>

        <div className="footer-divider" />

        {/* Renewable ticker */}
        <div className="footer-ticker" aria-hidden="true">
          <div className="ticker-track">
            <span>Made with renewable energy</span>
            <span>98% efficiency</span>
            <span>24/7 smart monitoring</span>
            <span>10-year warranty</span>
            <span>Grid-friendly storage</span>
          </div>
        </div>

        <div className="footer-bottom-simple">
          <p>© {currentYear} Zuice. All rights reserved.</p>
          <div className="legal-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/cookies">Cookies</Link>
            <Link to="/accessibility">Accessibility</Link>
            <a href="#" onClick={(e) => { e.preventDefault(); setCookieOpen(true); }}>Cookie Settings</a>
          </div>
        </div>
      </div>

      {/* Cookie preferences modal */}
      {cookieOpen && (
        <div className="cookie-modal" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
          <div className="cookie-backdrop" onClick={() => setCookieOpen(false)} />
          <motion.div className="cookie-panel" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h4 id="cookie-title">Cookie Preferences</h4>
            <p className="cookie-desc">We use cookies to improve your experience. Manage your preferences below.</p>
            <div className="cookie-options">
              <label className="cookie-option">
                <input type="checkbox" checked disabled />
                <span>
                  <strong>Necessary</strong>
                  <small>Required for core site functionality.</small>
                </span>
              </label>
              <label className="cookie-option">
                <input type="checkbox" checked={cookies.performance} onChange={() => toggleCookie('performance')} />
                <span>
                  <strong>Performance</strong>
                  <small>Analytics to improve speed and reliability.</small>
                </span>
              </label>
              <label className="cookie-option">
                <input type="checkbox" checked={cookies.marketing} onChange={() => toggleCookie('marketing')} />
                <span>
                  <strong>Marketing</strong>
                  <small>Personalized promotions and recommendations.</small>
                </span>
              </label>
            </div>
            <div className="cookie-actions">
              <button type="button" className="btn-secondary" onClick={() => setCookieOpen(false)}>Cancel</button>
              <button type="button" className="btn-primary" onClick={saveCookiePrefs}>Save Preferences</button>
            </div>
          </motion.div>
        </div>
      )}
    </footer>
  );
};

export default Footer;