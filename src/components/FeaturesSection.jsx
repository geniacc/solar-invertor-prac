import React, { useState } from 'react';
import { Card, Row, Col, Badge, Button, Modal } from 'antd';
import { ThunderboltOutlined, EyeOutlined, PlayCircleOutlined } from '@ant-design/icons';
import './FeaturesSection.css';

const features = [
  {
    id: 1,
    image: '/product-1.jpg', // Place your product images in public folder
    badge: 'NEW',
    badgeColor: '#52c41a',
    title: 'High Performance Inverter',
    subtitle: 'Model SolarMax Pro 15kW',
    desc: 'Delivers 98.7% efficiency even in cloudy conditions with advanced MPPT technology.',
    specs: ['15kW Power Output', '98.7% Efficiency', 'IP65 Weather Protection', '10-Year Warranty'],
    price: '₹1,25,000',
    icon: <ThunderboltOutlined />
  },
  {
    id: 2,
    image: '/product-2.jpg',
    badge: 'POPULAR',
    badgeColor: '#1890ff',
    title: 'Smart Monitoring System',
    subtitle: 'IoT-Enabled Dashboard',
    desc: 'Real-time monitoring with mobile app, AI-powered analytics, and predictive maintenance.',
    specs: ['Real-time Data', 'Mobile App Control', 'AI Analytics', 'Cloud Storage'],
    price: '₹25,000',
    icon: <EyeOutlined />
  },
  {
    id: 3,
    image: '/product-3.jpg',
    badge: 'PREMIUM',
    badgeColor: '#faad14',
    title: 'Complete Solar Solution',
    subtitle: 'End-to-End Package',
    desc: 'Full installation package with panels, inverter, monitoring, and 5-year maintenance.',
    specs: ['Complete Setup', '5-Year Maintenance', 'Professional Installation', '25-Year Panel Warranty'],
    price: '₹4,50,000',
    icon: <PlayCircleOutlined />
  },
];

const FeaturesSection = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const showProductDetails = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  return (
    <section className="features-section">
      <div className="section-header">
        <h2 className="features-title">Product Highlights</h2>
        <p className="features-subtitle">Discover our cutting-edge solar solutions</p>
      </div>

      <Row gutter={[32, 32]} justify="center">
        {features.map((feature) => (
          <Col xs={24} md={12} lg={8} key={feature.id}>
            <Card
              className="feature-card"
              cover={
                <div className="feature-image-container">
                  <img
                    alt={feature.title}
                    src={feature.image}
                    className="feature-image"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x250/1890ff/fff?text=${feature.title.replace(' ', '+')}`
                    }}
                  />
                  <Badge 
                    className="feature-badge" 
                    color={feature.badgeColor}
                    text={feature.badge}
                  />
                  <div className="feature-overlay">
                    <Button 
                      type="primary" 
                      icon={<EyeOutlined />}
                      onClick={() => showProductDetails(feature)}
                      className="view-details-btn"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              }
              actions={[
                <div className="feature-price" key="price">{feature.price}</div>,
                <Button type="primary" key="buy">Get Quote</Button>
              ]}
            >
              <div className="feature-content">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-subtitle">{feature.subtitle}</p>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Product Details Modal */}
      <Modal
        title={selectedProduct?.title}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="quote" type="primary" size="large">
            Get Detailed Quote
          </Button>
        ]}
        width={600}
      >
        {selectedProduct && (
          <div className="modal-content">
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.title}
              className="modal-image"
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/500x300/1890ff/fff?text=${selectedProduct.title.replace(' ', '+')}`
              }}
            />
            <h4>Key Specifications:</h4>
            <ul className="specs-list">
              {selectedProduct.specs.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
            <p className="modal-desc">{selectedProduct.desc}</p>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default FeaturesSection;
