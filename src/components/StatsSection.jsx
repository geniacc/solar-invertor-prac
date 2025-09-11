import React, { useState, useEffect } from 'react';
import { Card, Avatar, Rate, Button } from 'antd';
import { StarFilled, UserOutlined, SafetyCertificateOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import './StatsSection.css';

const stats = [
  { icon: <UserOutlined />, value: 1500, label: "Happy Customers", color: "#3b82f6" },
  { icon: <StarFilled />, value: 4.8, label: "Avg. Rating", color: "#fbbf24" },
  { icon: <SafetyCertificateOutlined />, value: 100, label: "Uptime Guarantee", color: "#10b981" }
];

// Updated testimonials array as requested
const testimonials = [
  {
    quote:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Sarah Chen",
    designation: "Product Manager at TechFlow",
    location: "",
    rating: 5,
    savings: "",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: "Michael Rodriguez",
    designation: "CTO at InnovateSphere",
    location: "",
    rating: 5,
    savings: "",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: "Emily Watson",
    designation: "Operations Director at CloudScale",
    location: "",
    rating: 5,
    savings: "",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    name: "James Kim",
    designation: "Engineering Lead at DataPro",
    location: "",
    rating: 5,
    savings: "",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
    name: "Lisa Thompson",
    designation: "VP of Technology at FutureNet",
    location: "",
    rating: 5,
    savings: "",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const StatsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);

  // Animate stats values on component mount
  useEffect(() => {
    setIsVisible(true);
    const targets = stats.map(s => s.value);
    const stepCounts = 100;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      if (step > stepCounts) {
        clearInterval(timer);
        setAnimatedValues(targets);
      } else {
        const newVals = targets.map((target, i) => {
          let val = (target / stepCounts) * step;
          return i === 1 ? val.toFixed(1) : Math.floor(val);
        });
        setAnimatedValues(newVals);
      }
    }, 20);
    return () => clearInterval(timer);
  }, []);

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

  return (
    <section className="stats-testimonials-section">
      {/* Animated Stats Section */}
      <div className="stats-container">
        <h2 className="stats-title">Trusted by Thousands</h2>
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div className={`stat-card ${isVisible ? 'animate' : ''}`} key={idx}>
              <div className="stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-value" style={{ color: stat.color }}>
                {idx === 0 && animatedValues[0].toLocaleString() + '+'}
                {idx === 1 && animatedValues[1] + '/5'}
                {idx === 2 && animatedValues[2] + '%'}
              </div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-pulse" style={{ backgroundColor: stat.color }}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-container">
        <h2 className="testimonials-title">What Our Customers Say</h2>
        <div className="testimonial-carousel">
          <Button
            className="carousel-btn prev"
            icon={<LeftOutlined />}
            onClick={prevTestimonial}
            shape="circle"
            size="large"
            aria-label="Previous testimonial"
          />
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
          <Button
            className="carousel-btn next"
            icon={<RightOutlined />}
            onClick={nextTestimonial}
            shape="circle"
            size="large"
            aria-label="Next testimonial"
          />
        </div>
        <div className="testimonial-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentTestimonial ? 'active' : ''}`}
              onClick={() => setCurrentTestimonial(index)}
              aria-label={`Show testimonial #${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
