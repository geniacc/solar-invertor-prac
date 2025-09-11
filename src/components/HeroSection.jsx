import React, { useState } from 'react';
import { Button, Typography, Space } from 'antd';
import { ArrowRightOutlined, ThunderboltOutlined } from '@ant-design/icons';
import solarBanner from '../assets/solar-banner.jpg';
import './HeroSection.css';

const { Title, Paragraph } = Typography;

const HeroSection = () => {
  const [expanded, setExpanded] = useState(false);

  const bannerStyle = {
    position: 'relative',
    minHeight: '82vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${solarBanner})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    overflow: 'hidden',
  };

  return (
    <div className="hero-banner" style={bannerStyle}>
      <div className="blur-glass-bg" />
      <div className="sparkle-particles" />
      <div className="hero-content">
        <div className="glow-icon">
          <ThunderboltOutlined style={{ fontSize: 56, color: '#ffe066' }} />
        </div>
        <Title level={1} className="gradient-title">
          Power Your Future,
          <br />Power With Solar
        </Title>
        <Paragraph className="hero-subtext">
          High-efficiency solar inverter.<br />Smarter savings, greener tomorrow.
        </Paragraph>
        <Space size="large" style={{ margin: '28px 0' }}>
          <Button
            type="primary"
            size="large"
            icon={<ArrowRightOutlined />}
            style={{
              fontWeight: 700,
              borderRadius: 24,
              fontSize: 18,
              padding: '0 38px',
              letterSpacing: 1,
              boxShadow: '0 2px 24px #fedc6644'
            }}
            onClick={() => alert('Get a Quote clicked')}
          >
            Get a Quote
          </Button>
          <Button
            type="link"
            size="large"
            style={{ color: '#c7d2fe', fontWeight: 700, fontSize: 17 }}
            onClick={() => setExpanded(e => !e)}
          >
            {expanded ? 'Show Less' : 'Learn More'}
          </Button>
        </Space>
        {expanded && (
          <Paragraph className="hero-learnmore">
            <b>AI-Optimized Efficiency</b>, Real-Time Smart Monitoring, and weather-proof durability.<br />Join thousands switching to solar!
          </Paragraph>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
