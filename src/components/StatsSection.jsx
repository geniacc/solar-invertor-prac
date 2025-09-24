import React, { useState, useEffect } from 'react';
import { Card, Avatar, Rate, Button } from 'antd';
import { LeftOutlined, RightOutlined, ThunderboltOutlined, SettingOutlined, WifiOutlined } from '@ant-design/icons';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import image1 from "../assets/image1.JPG";
import image2 from "../assets/image2.JPG";
import image3 from "../assets/image3.JPG";
import image4 from "../assets/image4.JPG";
import image5 from "../assets/image5.JPG";
import image6 from "../assets/image6.JPG";
import image7 from "../assets/image7.JPG";
import image8 from "../assets/image8.JPG";
import './StatsSection.css';

const stats = [
  { img: image1, value: 2500, label: "Inverters Installed", color: "#3b82f6", textColor: "#ffffff", icon: <ThunderboltOutlined /> },
  { img: image2, value: 4.9, label: "Customer Rating", color: "#fbbf24", textColor: "#000000", icon: <SettingOutlined /> },
  { img: image3, value: 99.8, label: "Inverter Uptime", color: "#10b981", textColor: "#ffffff", icon: <WifiOutlined /> }
];

// Customer testimonials focused on inverter experience
const testimonials = [
  {
    quote:
      "The ZUICE smart inverter has revolutionized our energy management. The efficiency and monitoring capabilities are outstanding.",
    name: "Rajesh Kumar",
    designation: "Homeowner, Mumbai",
    location: "Mumbai, Maharashtra",
    rating: 5,
    savings: "₹2,500/month saved",
    src: image4,
  },
  {
    quote:
      "Installation was professional and the inverter performance exceeded expectations. The mobile app monitoring is fantastic.",
    name: "Priya Sharma",
    designation: "Business Owner, Delhi",
    location: "Delhi, NCR",
    rating: 5,
    savings: "₹4,200/month saved",
    src: image5,
  },
  {
    quote:
      "The smart inverter technology has made our solar system incredibly efficient. The predictive maintenance alerts are a game-changer.",
    name: "Amit Patel",
    designation: "Engineer, Bangalore",
    location: "Bangalore, Karnataka",
    rating: 5,
    savings: "₹3,800/month saved",
    src: image6,
  },
  {
    quote:
      "Outstanding inverter performance and excellent customer support. The IoT monitoring features are exactly what we needed.",
    name: "Sunita Reddy",
    designation: "Factory Owner, Chennai",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    savings: "₹6,500/month saved",
    src: image7,
  },
  {
    quote:
      "The ZUICE inverter has been running flawlessly for 2 years. The efficiency and reliability are unmatched in the market.",
    name: "Vikram Singh",
    designation: "Residential Customer, Pune",
    location: "Pune, Maharashtra",
    rating: 5,
    savings: "₹2,800/month saved",
    src: image8,
  },
];

const StatsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Animate stats values on component mount
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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
      className="stats-testimonials-section"
    >
      {/* Animated Stats Section */}
      <motion.div variants={itemVariants} className="stats-container">
        <h2 className="stats-title text-gray-900 dark:text-gray-100">Trusted by Thousands</h2>
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <motion.div 
              className="stat-card" 
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="stat-img-container" style={{ color: stat.color }}>
                <div className="stat-icon">{stat.icon}</div>
              </div>
              <div className="stat-value" style={{ color: stat.color }}>
                <CountUp 
                  end={stat.value} 
                  duration={2} 
                  suffix={idx === 0 ? '+' : idx === 1 ? '/5' : '%'}
                  decimals={idx === 1 ? 1 : 0}
                />
              </div>
              <div className="stat-label text-gray-700 dark:text-gray-200">{stat.label}</div>
              <div className="stat-pulse" style={{ backgroundColor: stat.color }}></div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div variants={itemVariants} className="testimonials-container">
        <h2 className="testimonials-title">What Our Customers Say</h2>
        <div className="testimonial-carousel">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              className="carousel-btn prev"
              icon={<LeftOutlined />}
              onClick={prevTestimonial}
              shape="circle"
              size="large"
              aria-label="Previous testimonial"
            />
          </motion.div>
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="testimonial-card" aria-live="polite" aria-atomic="true">
              <div className="testimonial-content">
                <div className="quote-marks">"</div>
                <p className="testimonial-quote">{testimonials[currentTestimonial].quote}</p>
                <div className="customer-info">
                  <Avatar
                    size={60}
                    src={testimonials[currentTestimonial].src}
                    alt={testimonials[currentTestimonial].name}
                    className="customer-avatar"
                  />
                  <div className="customer-details">
                    <h4 className="customer-name">{testimonials[currentTestimonial].name}</h4>
                    <p className="customer-designation">{testimonials[currentTestimonial].designation}</p>
                    {testimonials[currentTestimonial].location && (
                      <p className="customer-location">📍 {testimonials[currentTestimonial].location}</p>
                    )}
                    <Rate
                      disabled
                      value={testimonials[currentTestimonial].rating || 5}
                      className="customer-rating"
                    />
                    {testimonials[currentTestimonial].savings && (
                      <div className="savings-badge">💰 {testimonials[currentTestimonial].savings}</div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              className="carousel-btn next"
              icon={<RightOutlined />}
              onClick={nextTestimonial}
              shape="circle"
              size="large"
              aria-label="Next testimonial"
            />
          </motion.div>
        </div>
        <div className="testimonial-indicators">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              className={`indicator ${index === currentTestimonial ? 'active' : ''}`}
              onClick={() => setCurrentTestimonial(index)}
              aria-label={`Show testimonial #${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default StatsSection;
