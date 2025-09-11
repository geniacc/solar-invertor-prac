import React, { useState, useEffect } from 'react';
import { Card, Progress } from 'antd';
import { BulbOutlined, ThunderboltOutlined, LineChartOutlined } from '@ant-design/icons';
import './HowItWorksSection.css';

const steps = [
  {
    id: 1,
    icon: <BulbOutlined />,
    title: 'Solar Capture',
    desc: 'Photovoltaic panels absorb sunlight and generate DC electricity',
    color: '#fbbf24',
    delay: 0
  },
  {
    id: 2,
    icon: <ThunderboltOutlined />,
    title: 'Power Conversion',
    desc: 'Advanced inverter converts DC to clean AC power for your home',
    color: '#3b82f6',
    delay: 1000
  },
  {
    id: 3,
    icon: <LineChartOutlined />,
    title: 'Smart Monitoring',
    desc: 'Real-time tracking of energy production and consumption',
    color: '#10b981',
    delay: 2000
  }
];

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
      setProgress((prev) => (prev >= 100 ? 0 : prev + 33.33));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="how-section">
      <div className="section-header">
        <h2 className="how-title">How Solar Energy Works</h2>
        <p className="how-subtitle">From sunlight to smart energy in 3 simple steps</p>
      </div>

      {/* Animated Flow Diagram */}
      <div className="flow-container">
        <div className="flow-diagram">
          {/* Sun Animation */}
          <div className="sun-container">
            <div className="sun">
              <div className="sun-rays"></div>
              ☀️
            </div>
            <div className="energy-particles">
              <span className="particle"></span>
              <span className="particle"></span>
              <span className="particle"></span>
            </div>
          </div>

          {/* Solar Panel */}
          <div className="solar-panel">
            <div className="panel-surface">
              <div className="panel-cell"></div>
              <div className="panel-cell"></div>
              <div className="panel-cell"></div>
              <div className="panel-cell"></div>
            </div>
            <div className="energy-flow flow-1"></div>
          </div>

          {/* Inverter */}
          <div className="inverter-box">
            <div className="inverter">
              <div className="inverter-display">
                <div className="led-indicator active"></div>
                <div className="waveform">
                  <div className="wave"></div>
                </div>
              </div>
            </div>
            <div className="energy-flow flow-2"></div>
          </div>

          {/* Smart Home */}
          <div className="smart-home">
            <div className="house">
              🏠
              <div className="wifi-signal">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flow-progress">
          <Progress 
            percent={progress} 
            strokeColor={{
              '0%': '#fbbf24',
              '50%': '#3b82f6',
              '100%': '#10b981',
            }}
            showInfo={false}
            strokeWidth={6}
          />
        </div>
      </div>

      {/* Step Cards */}
      <div className="steps-container">
        {steps.map((step, idx) => (
          <Card
            key={step.id}
            className={`step-card ${activeStep === idx ? 'active' : ''}`}
            style={{
              animationDelay: `${step.delay}ms`
            }}
          >
            <div className="step-content">
              <div 
                className="step-icon"
                style={{ color: step.color }}
              >
                {step.icon}
              </div>
              <div className="step-number">{step.id}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
              
              {/* Animated indicator */}
              <div className="step-indicator">
                <div 
                  className="indicator-fill"
                  style={{ backgroundColor: step.color }}
                ></div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Energy Stats Animation */}
      <div className="energy-stats">
        <div className="stat-item">
          <div className="stat-value">25k+</div>
          <div className="stat-label">kWh Generated</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">₹18,000</div>
          <div className="stat-label">Monthly Savings</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">15+</div>
          <div className="stat-label">Years Lifespan</div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
