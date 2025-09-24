import React, { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import './ChatBot.css';

const faqData = [
  { question: "Is the inverter compatible with existing solar panels?", answer: "Yes, it's compatible with most panels on the Indian market." },
  { question: "Can I monitor performance on my phone?", answer: "Absolutely! Our mobile app provides real-time performance tracking." },
  { question: "What about weather resistance?", answer: "Our inverters are fully dustproof and weather-sealed to IP65 standard." },
  { question: "How long is the warranty period?", answer: "Our inverters come with a 5-year comprehensive warranty." },
  { question: "What is the typical lifespan of the inverter?", answer: "The typical lifespan is around 10-15 years with regular maintenance." },
  { question: "Does the inverter support battery storage?", answer: "Yes, compatible with popular battery storage systems for backup power." },
  { question: "Can the inverter be installed indoors and outdoors?", answer: "Our inverters support both indoor and outdoor installations with proper protection." },
  { question: "What is the installation process like?", answer: "Installation is quick and done by certified technicians, usually within a day." },
  { question: "Is there a mobile app for remote monitoring?", answer: "Yes, our mobile app allows remote monitoring and performance alerts." },
  { question: "How do I maintain or clean the inverter?", answer: "Simply wipe with a dry cloth and schedule a periodic check-up for optimal performance." }
];

const fuseOptions = {
  keys: ["question"],
  threshold: 0.3,
};

const ChatBot = () => {
  const [chat, setChat] = useState([{ from: "bot", message: "Hi! Ask me anything about solar inverters." }]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Start closed, show icon only
  const [isMinimized, setIsMinimized] = useState(false); // For minimize functionality
  const chatEndRef = useRef(null);

  const fuse = new Fuse(faqData, fuseOptions);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const findAnswer = (query) => {
    if (!query.trim()) return "Please type a question.";
    const results = fuse.search(query);
    if (results.length > 0) {
      return results[0].item.answer;
    }
    return "Sorry, I don’t have an answer to that question yet.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", message: input };
    const botMsg = { from: "bot", message: findAnswer(input) };
    setChat((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {/* Floating Icon Button */}
      {!isOpen && (
        <button
          aria-label="Open AI Chat"
          onClick={() => setIsOpen(true)}
          className="chatbot-floating-icon"
        >
          <div className="chatbot-icon-content">
            <div className="chatbot-icon">💬</div>
            <div className="chatbot-pulse"></div>
          </div>
        </button>
      )}

      {/* Full Chat Window */}
      {isOpen && (
        <div className={`chatbot-window ${isMinimized ? 'minimized' : ''}`} role="region" aria-live="polite">
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <div className="chatbot-avatar">🤖</div>
              <div className="chatbot-title">
                <h4>AI Assistant</h4>
                <span className="chatbot-status">Online</span>
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
                  aria-label="Type your question"
                  placeholder="Ask about solar inverters..."
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
