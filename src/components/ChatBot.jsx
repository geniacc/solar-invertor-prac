import React, { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import { LoadingSpinner, InlineLoader } from './ui/Loading';
import { useResponsive } from './ui/Responsive';
import './ChatBot.css';

const faqData = [
  { question: "Is the UPS compatible with existing power sources?", answer: "Yes, it's compatible with most power sources including grid, battery, and renewable energy inputs." },
  { question: "Can I monitor performance on my phone?", answer: "Absolutely! Our mobile app provides real-time performance tracking." },
  { question: "What about weather resistance?", answer: "Our uninterrupted power supply units are fully dustproof and weather-sealed to IP65 standard." },
  { question: "How long is the warranty period?", answer: "Our UPS systems come with a 5-year comprehensive warranty." },
  { question: "What is the typical lifespan of the UPS?", answer: "The typical lifespan is around 10-15 years with regular maintenance." },
  { question: "Does the UPS support battery storage?", answer: "Yes, compatible with popular battery storage systems for backup power." },
  { question: "Can the UPS be installed indoors and outdoors?", answer: "Our uninterrupted power supply units support both indoor and outdoor installations with proper protection." },
  { question: "What is the installation process like?", answer: "Installation is quick and done by certified technicians, usually within a day." },
  { question: "Is there a mobile app for remote monitoring?", answer: "Yes, our mobile app allows remote monitoring and performance alerts." },
  { question: "How do I maintain or clean the UPS?", answer: "Simply wipe with a dry cloth and schedule a periodic check-up for optimal performance." }
];

const fuseOptions = {
  keys: ["question"],
  threshold: 0.3,
};

const ChatBot = () => {
  const [chat, setChat] = useState([{ from: "bot", message: "👨‍🔧 Technical Support Chat\n\nI'm here to help with technical questions, troubleshooting, and FAQ about your Zuice μ1000 system. For product recommendations, please use our Voice Assistant!" }]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Start closed, show icon only
  const [isMinimized, setIsMinimized] = useState(false); // For minimize functionality
  const [isTyping, setIsTyping] = useState(false); // Loading state for bot responses
  const chatEndRef = useRef(null);
  const { isMobile, isTablet } = useResponsive();

  const fuse = new Fuse(faqData, fuseOptions);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const findAnswer = (query) => {
    if (!query.trim()) return "Please type your technical question.";
    
    // Check for product recommendation queries and redirect to voice assistant
    const productKeywords = ['recommend', 'which', 'best', 'choose', 'buy', 'purchase', 'rent', 'rental', 'price', 'cost'];
    const hasProductQuery = productKeywords.some(keyword => query.toLowerCase().includes(keyword));
    
    if (hasProductQuery) {
      return "🎤 For product recommendations and rental advice, please use our Voice Assistant (the microphone button). I'm specialized in technical support and troubleshooting!";
    }
    
    const results = fuse.search(query);
    if (results.length > 0) {
      return `🔧 ${results[0].item.answer}`;
    }
    return "🤔 I don't have that technical information. Please contact our support team at support@zuice.com or try our Voice Assistant for general product questions.";
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = { from: "user", message: input };
    setChat((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
    
    const botMsg = { from: "bot", message: findAnswer(userMsg.message) };
    setChat((prev) => [...prev, botMsg]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Floating Icon Button */}
      {!isOpen && (
        <button
          aria-label="Open Technical Support Chat"
          onClick={() => setIsOpen(true)}
          className="chatbot-floating-icon"
          style={{
            right: isMobile ? '15px' : '30px',
            width: isMobile ? '50px' : '60px',
            height: isMobile ? '50px' : '60px',
            top: isMobile ? 'auto' : '50%',
            bottom: isMobile ? '80px' : 'auto'
          }}
        >
          <div className="chatbot-icon-content">
            <div className="chatbot-icon">🔧</div>
            <div className="chatbot-pulse"></div>
          </div>
        </button>
      )}

      {/* Full Chat Window */}
      {isOpen && (
        <div 
          className={`chatbot-window ${isMinimized ? 'minimized' : ''} ${isMobile ? 'mobile' : ''} ${isTablet ? 'tablet' : ''}`} 
          role="region" 
          aria-live="polite"
          style={{
            width: isMobile ? 'calc(100vw - 20px)' : isTablet ? '350px' : '380px',
            right: isMobile ? '10px' : '30px',
            top: isMobile ? '10px' : '50%',
            transform: isMobile ? 'none' : 'translateY(-50%)',
            maxHeight: isMobile ? 'calc(100vh - 20px)' : '600px'
          }}
        >
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <div className="chatbot-avatar">🔧</div>
              <div className="chatbot-title">
                <h4>Technical Support</h4>
                <span className="chatbot-status">Ready to help</span>
              </div>
            </div>
            <div className="chatbot-controls">
              <button
                aria-label="Minimize chat"
                onClick={() => setIsMinimized(!isMinimized)}
                className="chatbot-minimize-btn"
              >
                {isMinimized ? '□' : '−'}
              </button>
              <button
                aria-label="Close chat"
                onClick={() => setIsOpen(false)}
                className="chatbot-close-btn"
              >
                ×
              </button>
            </div>
          </div>
          
          {!isMinimized && (
            <>
              <div className="chatbot-body">
                {chat.map((m, i) => (
                  <div key={i} className={m.from === "bot" ? "chatbot-message bot" : "chatbot-message user"}>
                    <span>{m.message}</span>
                  </div>
                ))}
                {isTyping && (
                  <div className="chatbot-message bot typing">
                    <InlineLoader text="Analyzing your question..." />
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="chatbot-input-form"
              >
                <input
                  type="text"
                  aria-label="Type your technical question"
                  placeholder="Ask about UPS systems, troubleshooting..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="chatbot-input"
                  autoFocus
                />
                <button type="submit" className="chatbot-send-button">➤</button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;
