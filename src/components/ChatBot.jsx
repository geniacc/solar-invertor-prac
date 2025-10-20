import React, { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import { LoadingSpinner, InlineLoader } from './ui/Loading';
import { useResponsive } from './ui/Responsive';
import './ChatBot.css';

const faqData = [
  { question: "Is the ESS compatible with existing power sources?", answer: "Yes, our ESS systems are compatible with grid power, solar panels, and other renewable energy sources." },
  { question: "Can I monitor performance on my phone?", answer: "Absolutely! Our mobile app provides real-time monitoring of battery status, energy flow, and system performance." },
  { question: "What about weather resistance?", answer: "Our ESS systems are designed with IP65 protection rating for outdoor installations and weather resistance." },
  { question: "How long is the warranty period?", answer: "Our ESS systems come with a comprehensive 5-year warranty, with battery warranty up to 10 years." },
  { question: "What is the typical lifespan of the ESS?", answer: "Our lithium-ion ESS systems typically last 10-15 years with 6000+ charge cycles." },
  { question: "What battery capacity options are available?", answer: "We offer various capacity options from 12.8V 100Ah to 576V 100Ah for different energy storage needs." },
  { question: "Can the ESS be installed indoors and outdoors?", answer: "Yes, our ESS systems support both indoor and outdoor installations with proper ventilation and protection." },
  { question: "What is the installation process like?", answer: "Installation is performed by certified technicians and typically completed within a day, including system commissioning." },
  { question: "Is there a mobile app for remote monitoring?", answer: "Yes, our mobile app provides remote monitoring, performance alerts, and energy management features." },
  { question: "How do I maintain the ESS system?", answer: "ESS systems require minimal maintenance - regular visual inspections and periodic professional check-ups for optimal performance." }
];

const fuseOptions = {
  keys: ["question"],
  threshold: 0.3,
};

const ChatBot = () => {
  const [chat, setChat] = useState([{ from: "bot", message: "👨‍🔧 Technical Support Chat\n\nI'm here to help with technical questions, troubleshooting, and FAQ about your ESS system. For product recommendations, please use our Voice Assistant!" }]);
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
    return "🤔 I don't have that technical information. Please contact our Zuice support team or try our Voice Assistant for general product questions.";
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
                  placeholder="Ask about ESS systems, troubleshooting..."
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
