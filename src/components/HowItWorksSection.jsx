import React, { useState, useEffect } from 'react';
import { Card, Progress } from 'antd';
import { 
  ApiOutlined, 
  ThunderboltOutlined, 
  MonitorOutlined,
  SettingOutlined,
  WifiOutlined,
  SafetyOutlined
} from '@ant-design/icons';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import './HowItWorksSection.css';

const steps = [
  {
    id: 1,
    icon: <ApiOutlined />,
    title: 'Multi-Source Input',
    desc: 'Advanced inverter accepts DC from solar panels, AC from grid, and battery power simultaneously',
    color: '#0ea5e9',
    delay: 0,
    efficiency: 99.2
  },
  {
    id: 2,
    icon: <ThunderboltOutlined />,
    title: 'Smart Power Conversion',
    desc: 'ZUICE inverter technology converts DC to AC with 98.7% efficiency and intelligent MPPT tracking',
    color: '#10b981',
    delay: 1000,
    efficiency: 98.7
  },
  {
    id: 3,
    icon: <MonitorOutlined />,
    title: 'IoT Monitoring & Control',
    desc: 'Real-time monitoring, predictive maintenance, and remote control via mobile app',
    color: '#8b5cf6',
    delay: 2000,
    efficiency: 99.5
  }
];

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
      setProgress((prev) => (prev >= 100 ? 0 : prev + 33.33));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section 
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="how-section"
    >
      <motion.div variants={itemVariants} className="section-header">
        <h2 className="how-title">How ZUICE Smart Inverters Work</h2>
        <p className="how-subtitle">Advanced inverter technology in 3 intelligent steps</p>
      </motion.div>

      {/* Animated Flow Diagram */}
      <motion.div variants={itemVariants} className="flow-container">
        <div className="flow-diagram">
          {/* Input Sources */}
          <div className="input-sources">
            <div className="source-item">
              <div className="source-icon grid-icon">⚡</div>
              <span className="source-label">Grid Power</span>
            </div>
            <div className="source-item">
              <div className="source-icon battery-icon">🔋</div>
              <span className="source-label">Battery</span>
            </div>
            <div className="source-item">
              <div className="source-icon solar-icon">☀️</div>
              <span className="source-label">Solar</span>
            </div>
            <div className="energy-particles input-particles">
              <span className="particle"></span>
              <span className="particle"></span>
              <span className="particle"></span>
            </div>
          </div>

          {/* ZUICE Inverter - Central Focus */}
          <div className="zuice-inverter">
            <div className="inverter-housing">
              <div className="zuice-logo">
                <div className="z-logo">Z</div>
                <div className="brand-text">ZUICE</div>
              </div>
              <div className="inverter-display">
                <div className="led-strip">
                  <span className="led active"></span>
                  <span className="led active"></span>
                  <span className="led active"></span>
                </div>
                <div className="waveform-display">
                  <div className="wave-line"></div>
                  <div className="frequency-indicator">50Hz</div>
                </div>
                <div className="power-meter">
                  <div className="meter-needle"></div>
                  <span className="power-reading">15kW</span>
                </div>
              </div>
              <div className="cooling-vents">
                <div className="vent-line"></div>
                <div className="vent-line"></div>
                <div className="vent-line"></div>
              </div>
            </div>
            <div className="processing-animation">
              <div className="processing-circle"></div>
            </div>
          </div>

          {/* Output Loads */}
          <div className="output-loads">
            <div className="load-item">
              <div className="load-icon home-icon">🏠</div>
              <span className="load-label">Home</span>
            </div>
            <div className="load-item">
              <div className="load-icon appliance-icon">📱</div>
              <span className="load-label">Electronics</span>
            </div>
            <div className="load-item">
              <div className="load-icon motor-icon">⚙️</div>
              <span className="load-label">Motors</span>
            </div>
            <div className="energy-particles output-particles">
              <span className="particle"></span>
              <span className="particle"></span>
              <span className="particle"></span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flow-progress">
          <Progress 
            percent={progress} 
            strokeColor={{
              '0%': '#0ea5e9',
              '50%': '#10b981',
              '100%': '#8b5cf6',
            }}
            showInfo={false}
            size="default"
          />
        </div>
      </motion.div>

      {/* Step Cards */}
      <motion.div variants={itemVariants} className="steps-container">
        {steps.map((step, idx) => (
          <motion.div
            key={step.id}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card
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
                
                {/* Efficiency Display */}
                <div className="step-efficiency">
                  <span className="efficiency-label">Efficiency:</span>
                  <CountUp 
                    end={step.efficiency} 
                    duration={2} 
                    suffix="%"
                    className="efficiency-value"
                    style={{ color: step.color }}
                  />
                </div>
                
                {/* Animated indicator */}
                <div className="step-indicator">
                  <div 
                    className="indicator-fill"
                    style={{ backgroundColor: step.color }}
                  ></div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* ZUICE Performance Stats */}
      <motion.div variants={itemVariants} className="zuice-stats">
        <motion.div 
          className="stat-item"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="stat-value">
            <CountUp end={98.7} duration={2} suffix="%" />
          </div>
          <div className="stat-label">Inverter Efficiency</div>
        </motion.div>
        <motion.div 
          className="stat-item"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="stat-value">&lt;3ms</div>
          <div className="stat-label">Switch Time</div>
        </motion.div>
        <motion.div 
          className="stat-item"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="stat-value">
            <CountUp end={25} duration={2} suffix="+" />
          </div>
          <div className="stat-label">Years Lifespan</div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HowItWorksSection;
