import React, { useState, useEffect } from 'react';
import { Button, Input, Space, Typography, Row, Col, Divider } from 'antd';
import { 
  MailOutlined, 
  PhoneOutlined, 
  EnvironmentOutlined, 
  FacebookOutlined, 
  TwitterOutlined, 
  InstagramOutlined, 
  LinkedinOutlined,
  SendOutlined,
  ThunderboltOutlined,
  BulbOutlined,
  SafetyOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import './FooterSection.css';

const { Title, Text, Paragraph } = Typography;

const FooterSection = () => {
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const footerElement = document.querySelector('.footer-section');
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => observer.disconnect();
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className={`footer-section ${isVisible ? 'visible' : ''}`}>
      {/* Animated Background Elements */}
      <div className="footer-bg-elements">
        <div className="floating-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        <div className="energy-grid"></div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-content">
        <div className="container">
          {/* Top Section - Newsletter & CTA */}
          <div className="footer-top">
            <div className="newsletter-section">
              <div className="newsletter-content">
                <Title level={2} className="newsletter-title text-gray-900 dark:text-gray-100">
                  <ThunderboltOutlined className="newsletter-icon" />
                  Power Up Your Future
                </Title>
                <Paragraph className="newsletter-subtitle text-gray-700 dark:text-gray-300">
                  Get the latest solar innovations, energy tips, and exclusive offers delivered to your inbox.
                </Paragraph>
                <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                  <Space.Compact style={{ width: '100%', maxWidth: '400px' }}>
                    <Input
                      size="large"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      prefix={<MailOutlined />}
                      className="newsletter-input"
                    />
                    <Button 
                      type="primary" 
                      size="large" 
                      htmlType="submit"
                      className="newsletter-btn"
                      icon={<SendOutlined />}
                    >
                      Subscribe
                    </Button>
                  </Space.Compact>
                </form>
              </div>
            </div>
          </div>

          <Divider className="footer-divider" />

          {/* Main Footer Grid */}
          <div className="footer-main">
            <Row gutter={[48, 32]}>
              {/* Company Info */}
              <Col xs={24} sm={12} lg={6}>
                <div className="footer-column">
                  <div className="footer-logo">
                    <BulbOutlined className="logo-icon" />
                    <Title level={3} className="logo-text text-gray-900 dark:text-gray-100">Zuice</Title>
                  </div>
                  <Paragraph className="company-description text-gray-700 dark:text-gray-300">
                    Revolutionizing solar energy with cutting-edge inverter technology. 
                    We're powering a sustainable future, one innovation at a time.
                  </Paragraph>
                  <div className="social-links">
                    <a href="#" className="social-link facebook">
                      <FacebookOutlined />
                    </a>
                    <a href="#" className="social-link twitter">
                      <TwitterOutlined />
                    </a>
                    <a href="#" className="social-link instagram">
                      <InstagramOutlined />
                    </a>
                    <a href="#" className="social-link linkedin">
                      <LinkedinOutlined />
                    </a>
                  </div>
                </div>
              </Col>

              {/* Quick Links */}
              <Col xs={24} sm={12} lg={6}>
                <div className="footer-column">
                  <Title level={4} className="footer-heading text-gray-900 dark:text-gray-100">Quick Links</Title>
                  <ul className="footer-links">
                    <li><a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-primary">Features</a></li>
                    <li><a href="#how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-primary">How It Works</a></li>
                    <li><a href="#gallery" className="text-gray-700 dark:text-gray-300 hover:text-primary">Gallery</a></li>
                    <li><a href="#testimonials" className="text-gray-700 dark:text-gray-300 hover:text-primary">Testimonials</a></li>
                    <li><a href="#faq" className="text-gray-700 dark:text-gray-300 hover:text-primary">FAQ</a></li>
                    <li><a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-primary">Contact</a></li>
                  </ul>
                </div>
              </Col>

              {/* Products */}
              <Col xs={24} sm={12} lg={6}>
                <div className="footer-column">
                  <Title level={4} className="footer-heading text-gray-900 dark:text-gray-100">Products</Title>
                  <ul className="footer-links">
                    <li><a href="#inverters" className="text-gray-700 dark:text-gray-300 hover:text-primary">Solar Inverters</a></li>
                    <li><a href="#batteries" className="text-gray-700 dark:text-gray-300 hover:text-primary">Energy Storage</a></li>
                    <li><a href="#monitoring" className="text-gray-700 dark:text-gray-300 hover:text-primary">Smart Monitoring</a></li>
                    <li><a href="#maintenance" className="text-gray-700 dark:text-gray-300 hover:text-primary">Maintenance</a></li>
                    <li><a href="#upgrades" className="text-gray-700 dark:text-gray-300 hover:text-primary">Upgrades</a></li>
                    <li><a href="#warranty" className="text-gray-700 dark:text-gray-300 hover:text-primary">Warranty</a></li>
                  </ul>
                </div>
              </Col>

              {/* Contact Info */}
              <Col xs={24} sm={12} lg={6}>
                <div className="footer-column">
                  <Title level={4} className="footer-heading text-gray-900 dark:text-gray-100">Get In Touch</Title>
                  <div className="contact-info">
                    <div className="contact-item">
                      <PhoneOutlined className="contact-icon" />
                      <div>
                        <Text className="contact-label text-gray-700 dark:text-gray-300">Phone</Text>
                        <Text className="contact-value text-gray-900 dark:text-gray-100">+1 (555) 123-4567</Text>
                      </div>
                    </div>
                    <div className="contact-item">
                      <MailOutlined className="contact-icon" />
                      <div>
                        <Text className="contact-label text-gray-700 dark:text-gray-300">Email</Text>
                        <Text className="contact-value text-gray-900 dark:text-gray-100">info@solarmax.com</Text>
                      </div>
                    </div>
                    <div className="contact-item">
                      <EnvironmentOutlined className="contact-icon" />
                      <div>
                        <Text className="contact-label text-gray-700 dark:text-gray-300">Address</Text>
                        <Text className="contact-value text-gray-900 dark:text-gray-100">123 Solar Street, Green City, GC 12345</Text>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <Divider className="footer-divider" />

          {/* Bottom Section */}
          <div className="footer-bottom">
            <Row justify="space-between" align="middle">
              <Col xs={24} sm={12}>
                <Text className="copyright">
                  © 2024 SolarMax. All rights reserved. | 
                  <a href="#privacy" className="legal-link"> Privacy Policy</a> | 
                  <a href="#terms" className="legal-link"> Terms of Service</a>
                </Text>
              </Col>
              <Col xs={24} sm={12}>
                <div className="footer-badges">
                  <div className="badge">
                    <SafetyOutlined />
                    <span>Certified Safe</span>
                  </div>
                  <div className="badge">
                    <GlobalOutlined />
                    <span>Global Reach</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      {/* Energy Wave Animation */}
      <div className="energy-wave"></div>
    </footer>
  );
};

export default FooterSection;
