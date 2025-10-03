import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  ShoppingCart,
  ArrowRight,
  Zap,
  Battery,
  Home,
  Building,
  DollarSign,
  Clock,
  RotateCcw,
  ChevronRight
} from 'lucide-react';
import { Button } from './ui/Button';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { LoadingSpinner, InlineLoader } from './ui/Loading';
import { useResponsive } from './ui/Responsive';

const VoiceProductAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userResponses, setUserResponses] = useState({});
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  
  const { isMobile, isTablet } = useResponsive();
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const navigate = useNavigate();

  // Conversation flow steps
  const conversationSteps = [
    {
      id: 'greeting',
      question: "Hi! I'm your solar assistant. I'll help you find the perfect solar solution for your needs. What's your name?",
      type: 'text',
      key: 'name'
    },
    {
      id: 'property_type',
      question: "Nice to meet you, {name}! What type of property are you looking to power?",
      type: 'choice',
      key: 'propertyType',
      options: [
        { value: 'small_home', label: 'Small Home/Apartment', icon: Home },
        { value: 'medium_home', label: 'Medium Home', icon: Home },
        { value: 'large_home', label: 'Large Home', icon: Building },
        { value: 'office', label: 'Small Office/Shop', icon: Building }
      ]
    },
    {
      id: 'power_usage',
      question: "What's your typical daily power consumption? Think about your essential appliances.",
      type: 'choice',
      key: 'powerUsage',
      options: [
        { value: 'low', label: 'Low (1-3 hours backup needed)', description: 'Lights, fans, phone charging', icon: Zap },
        { value: 'medium', label: 'Medium (3-5 hours backup)', description: 'Above + TV, laptop, small appliances', icon: Zap },
        { value: 'high', label: 'High (5+ hours backup)', description: 'Heavy usage, multiple appliances', icon: Zap }
      ]
    },
    {
      id: 'budget',
      question: "What's your budget range for this solar solution?",
      type: 'choice',
      key: 'budget',
      options: [
        { value: 'budget', label: '₹40,000 - ₹50,000', description: 'Basic solution', icon: DollarSign },
        { value: 'mid', label: '₹50,000 - ₹70,000', description: 'Balanced performance', icon: DollarSign },
        { value: 'premium', label: '₹70,000+', description: 'Maximum backup & features', icon: DollarSign }
      ]
    },
    {
      id: 'backup_priority',
      question: "How important is extended backup time during power outages?",
      type: 'choice',
      key: 'backupPriority',
      options: [
        { value: 'basic', label: 'Basic (2-3 hours is enough)', icon: Clock },
        { value: 'extended', label: 'Extended (4-6 hours preferred)', icon: Clock },
        { value: 'maximum', label: 'Maximum (6+ hours essential)', icon: Clock }
      ]
    },
    {
      id: 'monitoring',
      question: "Would you like real-time monitoring and mobile app control for your solar system?",
      type: 'choice',
      key: 'monitoring',
      options: [
        { value: 'yes', label: 'Yes, I want monitoring', description: 'Track performance & get alerts' },
        { value: 'no', label: 'No, basic system is fine', description: 'Just the solar unit' }
      ]
    }
  ];

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleVoiceInput(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    // Initial greeting when opened
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        askQuestion(0);
      }, 500);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speakText = (text) => {
    if (synthRef.current && !isSpeaking) {
      // Cancel any ongoing speech
      synthRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      synthRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const addMessage = (content, sender, type = 'text', options = null) => {
    const message = {
      id: Date.now(),
      content,
      sender,
      type,
      options,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const askQuestion = (stepIndex) => {
    if (stepIndex >= conversationSteps.length) {
      generateRecommendation();
      return;
    }

    const step = conversationSteps[stepIndex];
    let question = step.question;
    
    // Replace placeholders with user responses
    Object.keys(userResponses).forEach(key => {
      question = question.replace(`{${key}}`, userResponses[key]);
    });

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(question, 'assistant', step.type, step.options);
      speakText(question);
    }, 1000);
  };

  const handleVoiceInput = (transcript) => {
    setInputText(transcript);
    handleUserResponse(transcript);
  };

  const parseTextResponse = (response, stepData) => {
    if (stepData.type !== 'choice' || !stepData.options) {
      return response; // For text inputs, return as-is
    }

    const lowerResponse = response.toLowerCase();
    
    // Try to match against option values or labels
    for (const option of stepData.options) {
      if (lowerResponse.includes(option.value.toLowerCase()) ||
          lowerResponse.includes(option.label.toLowerCase()) ||
          (option.description && lowerResponse.includes(option.description.toLowerCase()))) {
        return option.value;
      }
    }

    // Fallback: try to match common keywords
    if (stepData.key === 'powerUsage') {
      if (lowerResponse.includes('low') || lowerResponse.includes('basic') || lowerResponse.includes('1') || lowerResponse.includes('2') || lowerResponse.includes('3')) return 'low';
      if (lowerResponse.includes('high') || lowerResponse.includes('heavy') || lowerResponse.includes('5') || lowerResponse.includes('6')) return 'high';
      if (lowerResponse.includes('medium') || lowerResponse.includes('moderate') || lowerResponse.includes('4')) return 'medium';
    }
    
    if (stepData.key === 'budget') {
      if (lowerResponse.includes('40') || lowerResponse.includes('50') || lowerResponse.includes('budget') || lowerResponse.includes('cheap')) return 'budget';
      if (lowerResponse.includes('70') || lowerResponse.includes('premium') || lowerResponse.includes('high') || lowerResponse.includes('expensive')) return 'premium';
      if (lowerResponse.includes('60') || lowerResponse.includes('mid') || lowerResponse.includes('medium')) return 'mid';
    }
    
    if (stepData.key === 'backupPriority') {
      if (lowerResponse.includes('basic') || lowerResponse.includes('2') || lowerResponse.includes('3') || lowerResponse.includes('short')) return 'basic';
      if (lowerResponse.includes('maximum') || lowerResponse.includes('6') || lowerResponse.includes('long') || lowerResponse.includes('essential')) return 'maximum';
      if (lowerResponse.includes('extended') || lowerResponse.includes('4') || lowerResponse.includes('5') || lowerResponse.includes('preferred')) return 'extended';
    }
    
    if (stepData.key === 'monitoring') {
      if (lowerResponse.includes('yes') || lowerResponse.includes('want') || lowerResponse.includes('monitoring') || lowerResponse.includes('app')) return 'yes';
      if (lowerResponse.includes('no') || lowerResponse.includes('basic') || lowerResponse.includes('fine') || lowerResponse.includes('don\'t')) return 'no';
    }

    return response; // Return original if no match found
  };

  const handleUserResponse = (response) => {
    const currentStepData = conversationSteps[currentStep];
    
    addMessage(response, 'user');
    
    // Parse the response to get the correct value for logic processing
    const parsedValue = parseTextResponse(response, currentStepData);
    
    // Store the parsed response
    const newResponses = {
      ...userResponses,
      [currentStepData.key]: parsedValue
    };
    setUserResponses(newResponses);
    
    // Move to next step
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
      askQuestion(currentStep + 1);
    }, 1000);
  };

  const handleOptionSelect = (option) => {
    // Store the option value for logic processing, but display the label to user
    const currentStepData = conversationSteps[currentStep];
    
    addMessage(option.label, 'user');
    
    // Store the option VALUE (not label) for proper recommendation logic
    const newResponses = {
      ...userResponses,
      [currentStepData.key]: option.value
    };
    setUserResponses(newResponses);
    
    // Move to next step
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
      askQuestion(currentStep + 1);
    }, 1000);
  };

  const generateRecommendation = () => {
    setIsTyping(true);
    
    setTimeout(() => {
      const recommendations = getProductRecommendation(userResponses);
      const additionalProducts = getAdditionalRecommendations(userResponses);
      
      setRecommendation({
        primary: recommendations.primary,
        alternatives: recommendations.alternatives,
        additional: additionalProducts
      });
      
      setIsTyping(false);
      
      const primaryProduct = recommendations.primary;
      const alternativeCount = recommendations.alternatives.length;
      
      let recommendationText = `Based on your requirements, I recommend the ${primaryProduct.name} as your best match. `;
      
      if (primaryProduct.reasons && primaryProduct.reasons.length > 0) {
        recommendationText += `Here's why: ${primaryProduct.reasons.join(', ')}. `;
      }
      
      if (alternativeCount > 0) {
        recommendationText += `I've also found ${alternativeCount} alternative option${alternativeCount > 1 ? 's' : ''} that might interest you. `;
      }
      
      if (additionalProducts.length > 0) {
        recommendationText += `Plus, I recommend adding our monitoring kit for complete system control.`;
      }
      
      addMessage(recommendationText, 'assistant', 'recommendation', {
        primary: primaryProduct,
        alternatives: recommendations.alternatives,
        additional: additionalProducts
      });
      
      speakText(recommendationText);
    }, 2000);
  };

  const getProductRecommendation = (responses) => {
    const { propertyType, powerUsage, budget, backupPriority, monitoring } = responses;
    
    // Debug logging to verify responses are being processed correctly
    console.log('🔍 Processing user responses:', responses);
    console.log('📊 Extracted values:', { propertyType, powerUsage, budget, backupPriority, monitoring });
    
    // Score each product based on user preferences
    const scoredProducts = products.filter(p => p.category === 'Solar Hybrid PCU').map(product => {
      let score = 0;
      let reasons = [];
      
      // Budget scoring
      if (budget === 'budget' && product.price <= 50000) {
        score += 30;
        reasons.push('Fits your budget perfectly');
      } else if (budget === 'mid' && product.price >= 50000 && product.price <= 70000) {
        score += 30;
        reasons.push('Great value for money');
      } else if (budget === 'premium' && product.price >= 70000) {
        score += 30;
        reasons.push('Premium features for maximum performance');
      } else if (budget === 'budget' && product.price <= 60000) {
        score += 15;
        reasons.push('Slightly above budget but excellent value');
      } else if (budget === 'mid' && product.price <= 75000) {
        score += 15;
        reasons.push('Within extended budget range');
      }
      
      // Power usage and backup scoring
      if (powerUsage === 'low' && product.name.includes('50Ah')) {
        score += 25;
        reasons.push('Perfect for low power consumption');
      } else if (powerUsage === 'medium' && product.name.includes('86Ah')) {
        score += 25;
        reasons.push('Ideal for medium power usage');
      } else if (powerUsage === 'high' && product.name.includes('100Ah')) {
        score += 25;
        reasons.push('Excellent for high power demands');
      } else if (powerUsage === 'low' && product.name.includes('86Ah')) {
        score += 15;
        reasons.push('Extra backup capacity for peace of mind');
      } else if (powerUsage === 'medium' && product.name.includes('100Ah')) {
        score += 15;
        reasons.push('Maximum backup for extended usage');
      }
      
      // Backup priority scoring
      if (backupPriority === 'basic' && product.name.includes('50Ah')) {
        score += 20;
        reasons.push('2 hours backup meets your basic needs');
      } else if (backupPriority === 'extended' && product.name.includes('86Ah')) {
        score += 20;
        reasons.push('2.75 hours backup for extended coverage');
      } else if (backupPriority === 'maximum' && product.name.includes('100Ah')) {
        score += 20;
        reasons.push('3.25 hours backup for maximum security');
      }
      
      // Property type scoring
      if (propertyType === 'small_home' && product.name.includes('50Ah')) {
        score += 15;
        reasons.push('Right-sized for small homes');
      } else if ((propertyType === 'medium_home' || propertyType === 'office') && product.name.includes('86Ah')) {
        score += 15;
        reasons.push('Perfect for medium-sized properties');
      } else if (propertyType === 'large_home' && product.name.includes('100Ah')) {
        score += 15;
        reasons.push('Designed for larger properties');
      }
      
      // Base score for all products
      score += 10;
      
      return {
        ...product,
        score,
        reasons: reasons.slice(0, 3) // Limit to top 3 reasons
      };
    });
    
    // Sort by score and return top recommendations
    const sortedProducts = scoredProducts.sort((a, b) => b.score - a.score);
    
    return {
      primary: sortedProducts[0],
      alternatives: sortedProducts.slice(1, 3) // Return top 2 alternatives
    };
  };

  const getAdditionalRecommendations = (responses) => {
    const additional = [];
    
    if (responses.monitoring === 'yes') {
      const monitoringKit = products.find(p => p.category === 'Accessories');
      if (monitoringKit) {
        additional.push({
          ...monitoringKit,
          reasons: ['Real-time monitoring and mobile app control', 'Performance analytics and alerts', 'Remote system management']
        });
      }
    }
    
    return additional;
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      handleUserResponse(inputText);
      setInputText('');
    }
  };

  const openAssistant = () => {
    setIsOpen(true);
    setCurrentStep(0);
    setMessages([]);
    setUserResponses({});
    setRecommendation(null);
  };

  const resetAssistant = () => {
    setCurrentStep(0);
    setMessages([]);
    setUserResponses({});
    setRecommendation(null);
    setIsTyping(false);
    stopSpeaking();
    stopListening();
    // Start fresh with the first question
    setTimeout(() => {
      askQuestion(0);
    }, 500);
  };

  const closeAssistant = () => {
    setIsOpen(false);
    stopSpeaking();
    stopListening();
  };

  const navigateToProduct = (productId) => {
    navigate(`/products/${productId}`);
    closeAssistant();
  };

  return (
    <>
      {/* Always Visible Voice Assistant Bar */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`fixed ${isMobile ? 'bottom-2 right-2' : 'bottom-4 right-4 sm:bottom-6 sm:right-6'} z-[100] ${isMobile ? 'max-w-[calc(100vw-1rem)]' : 'max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-3rem)]'}`}
      >
        <motion.div
          className={`relative bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-2xl shadow-2xl backdrop-blur-sm border border-white/20 transition-all duration-500 ${
            isOpen ? 'px-4 py-2' : 'px-6 py-4'
          }`}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
          style={{
            background: isListening 
              ? 'linear-gradient(135deg, #10b981, #06b6d4, #3b82f6)' 
              : 'linear-gradient(135deg, #10b981, #14b8a6, #06b6d4)',
          }}
        >
          {/* Animated background overlay */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-30"
            animate={{
              background: isListening 
                ? ['linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                   'linear-gradient(135deg, transparent, rgba(255,255,255,0.1), transparent)',
                   'linear-gradient(225deg, transparent, rgba(255,255,255,0.1), transparent)']
                : 'linear-gradient(45deg, transparent, rgba(255,255,255,0.05), transparent)'
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="flex items-center space-x-3">
            {/* Voice Assistant Icon */}
            <motion.div
              className="relative flex items-center justify-center"
              animate={{
                scale: isListening ? [1, 1.1, 1] : 1,
                rotate: isListening ? [0, 5, -5, 0] : 0,
              }}
              transition={{
                duration: isListening ? 0.8 : 0.3,
                repeat: isListening ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              {/* Outer glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full bg-white/20 blur-sm"
                animate={{
                  scale: isListening ? [1, 1.8, 1] : 1,
                  opacity: isListening ? [0.5, 0.8, 0.5] : 0.3,
                }}
                transition={{
                  duration: 1.5,
                  repeat: isListening ? Infinity : 0,
                }}
              />
              
              {/* Inner pulse ring */}
              {isListening && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white/60"
                  animate={{
                    scale: [0.8, 2, 0.8],
                    opacity: [0.8, 0, 0.8],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              )}
              
              {/* Icon container */}
              <motion.div
                className="relative z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mic className="h-5 w-5 drop-shadow-sm" />
              </motion.div>
            </motion.div>

            {/* Status Text */}
            <motion.div
              className="flex-1 min-w-0 relative z-10"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <motion.div 
                className="text-sm font-semibold truncate tracking-wide"
                animate={{
                  color: isListening 
                    ? '#ffffff' 
                    : isSpeaking 
                    ? '#f0f9ff' 
                    : '#ffffff'
                }}
              >
                {isListening
                  ? '🎤 Listening...'
                  : isSpeaking
                  ? '🗣️ Speaking...'
                  : isTyping
                  ? '🤔 Thinking...'
                  : '🤖 AI Assistant'}
              </motion.div>
              {!isOpen && (
                <motion.div 
                  className="text-xs opacity-80 truncate font-medium"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Get FREE solar advice!
                </motion.div>
              )}
            </motion.div>

            {/* Action Buttons */}
              <motion.div 
                className="flex items-center space-x-1 relative z-10"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                {!isOpen && (
                  <motion.button
                    onClick={() => setIsOpen(true)}
                    className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "rgba(255, 255, 255, 0.25)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    title="Start conversation"
                  >
                    <MessageCircle className="h-4 w-4 drop-shadow-sm group-hover:scale-110 transition-transform" />
                  </motion.button>
                )}
                
                {isOpen && (
                  <>
                    {/* Volume Control */}
                    <motion.button
                      onClick={isSpeaking ? stopSpeaking : () => {}}
                      className={`p-2.5 rounded-xl backdrop-blur-sm border border-white/20 transition-all duration-300 group ${
                        isSpeaking 
                          ? 'bg-red-500/80 hover:bg-red-500 border-red-400/30' 
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: isSpeaking ? "rgba(239, 68, 68, 1)" : "rgba(255, 255, 255, 0.25)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      title={isSpeaking ? 'Stop speaking' : 'Voice enabled'}
                    >
                      <motion.div
                        animate={{ rotate: isSpeaking ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {isSpeaking ? (
                          <VolumeX className="h-4 w-4 drop-shadow-sm group-hover:scale-110 transition-transform" />
                        ) : (
                          <Volume2 className="h-4 w-4 drop-shadow-sm group-hover:scale-110 transition-transform" />
                        )}
                      </motion.div>
                    </motion.button>
                    
                    {/* Clear/Reset Button */}
                    <motion.button
                      onClick={resetAssistant}
                      className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "rgba(255, 255, 255, 0.25)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      title="Clear conversation and start over"
                    >
                      <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.4 }}
                      >
                        <RotateCcw className="h-4 w-4 drop-shadow-sm group-hover:scale-110 transition-transform" />
                      </motion.div>
                    </motion.button>
                    
                    {/* Close Button */}
                    <motion.button
                      onClick={() => setIsOpen(false)}
                      className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-red-500/30 transition-all duration-300 group"
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "rgba(239, 68, 68, 0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      title="Close Voice Assistant"
                    >
                      <motion.div
                        whileHover={{ rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="h-4 w-4 drop-shadow-sm group-hover:scale-110 transition-transform" />
                      </motion.div>
                    </motion.button>
                  </>
                )}
              </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Assistant Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-16 right-4 sm:bottom-20 sm:right-6 z-[99]"
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 50 }}
          >
            <motion.div 
              className={`bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 rounded-3xl shadow-2xl ${isMobile ? 'w-[calc(100vw-1rem)] h-[calc(100vh-6rem)]' : 'w-96 h-[500px]'} max-w-[calc(100vw-3rem)] max-h-[calc(100vh-8rem)] flex flex-col overflow-hidden border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm`}
              style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)"
              }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <motion.div 
                className="relative bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white p-6 flex items-center justify-between overflow-hidden"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                {/* Animated background pattern */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{
                    background: [
                      'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                      'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                      'radial-gradient(circle at 50% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                      'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                
                <div className="flex items-center space-x-4 relative z-10">
                  <motion.div 
                    className="relative"
                    animate={{
                      scale: isListening ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: isListening ? Infinity : 0,
                    }}
                  >
                    {/* Icon glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-white/30 blur-md"
                      animate={{
                        scale: isListening ? [1, 1.5, 1] : 1,
                        opacity: isListening ? [0.5, 0.8, 0.5] : 0.3,
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: isListening ? Infinity : 0,
                      }}
                    />
                    
                    <div className="relative z-10 p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                      <Bot className="h-6 w-6 drop-shadow-sm" />
                    </div>
                    
                    {isListening && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-white/60"
                        animate={{
                          scale: [0.8, 2.2, 0.8],
                          opacity: [0.8, 0, 0.8],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                    )}
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.h3 
                      className="text-xl font-bold tracking-wide drop-shadow-sm"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      🤖 AI Solar Assistant
                    </motion.h3>
                    <motion.p 
                      className="text-sm opacity-90 font-medium"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      {isListening
                        ? '🎤 Listening for your response...'
                        : isSpeaking
                        ? '🗣️ Speaking your recommendation...'
                        : isTyping
                        ? '🤔 Processing your request...'
                        : '✨ Ready to find your perfect solar solution'}
                    </motion.p>
                  </div>
                </div>
                <motion.div 
                  className="flex items-center space-x-2 relative z-10"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  {/* Volume Control */}
                  <motion.button
                    onClick={isSpeaking ? stopSpeaking : () => {}}
                    className={`p-2.5 rounded-xl backdrop-blur-sm border border-white/20 transition-all duration-300 group ${
                      isSpeaking 
                        ? 'bg-red-500/80 hover:bg-red-500 border-red-400/30' 
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: isSpeaking ? "rgba(239, 68, 68, 1)" : "rgba(255, 255, 255, 0.25)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    title={isSpeaking ? 'Stop speaking' : 'Voice enabled'}
                  >
                    <motion.div
                      animate={{ rotate: isSpeaking ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isSpeaking ? (
                        <VolumeX className="h-4 w-4 drop-shadow-sm group-hover:scale-110 transition-transform" />
                      ) : (
                        <Volume2 className="h-4 w-4 drop-shadow-sm group-hover:scale-110 transition-transform" />
                      )}
                    </motion.div>
                  </motion.button>

                  {/* Clear/Reset Button */}
                  <motion.button
                    onClick={resetAssistant}
                    className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "rgba(255, 255, 255, 0.25)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    title="Clear conversation and start over"
                  >
                    <motion.div
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.4 }}
                    >
                      <RotateCcw className="h-4 w-4 drop-shadow-sm group-hover:scale-110 transition-transform" />
                    </motion.div>
                  </motion.button>

                  {/* Close Button */}
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-red-500/30 transition-all duration-300 group"
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "rgba(239, 68, 68, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    title="Close Voice Assistant"
                  >
                    <motion.div
                      whileHover={{ rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-4 w-4 drop-shadow-sm group-hover:scale-110 transition-transform" />
                    </motion.div>
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Messages Container */}
              <motion.div 
                className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/30 dark:from-gray-900/50 dark:via-gray-800 dark:to-gray-900/30 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(156, 163, 175, 0.5) transparent'
                }}
              >
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(156, 163, 175, 0.1) 1px, transparent 0)',
                    backgroundSize: '20px 20px'
                  }} />
                </div>
                
                <div className="relative z-10">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        delay: index * 0.1,
                        type: "spring",
                        damping: 20,
                        stiffness: 300
                      }}
                      className="mb-4"
                    >
                      <MessageBubble
                        message={message}
                        onOptionSelect={handleOptionSelect}
                        onProductSelect={navigateToProduct}
                      />
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      className="flex justify-start group"
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    >
                      <div className="max-w-[85%]">
                        <motion.div 
                          className="flex items-center space-x-2 mb-2 ml-1"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-sm">
                            <Bot size={14} className="text-white" />
                          </div>
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">AI Assistant</span>
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                        </motion.div>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-bl-md p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                          <InlineLoader text="Thinking..." />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </motion.div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your response or use voice..."
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <button
                    onClick={isListening ? stopListening : startListening}
                    className={`p-2 rounded-full transition-colors ${
                      isListening 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                    }`}
                  >
                    {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Message Bubble Component
const MessageBubble = ({ message, onOptionSelect, onProductSelect }) => {
  const isAssistant = message.sender === 'assistant';

  return (
    <motion.div
      className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} group`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        type: "spring",
        damping: 20,
        stiffness: 300,
        duration: 0.4 
      }}
    >
      <div className={`max-w-[85%] ${isAssistant ? 'order-2' : 'order-1'}`}>
        {isAssistant && (
          <motion.div 
            className="flex items-center space-x-2 mb-2 ml-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-sm">
              <Bot size={14} className="text-white" />
            </div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">AI Assistant</span>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          </motion.div>
        )}
        
        <motion.div
          className={`relative p-4 rounded-2xl shadow-sm backdrop-blur-sm border ${
            isAssistant
              ? 'bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-700 dark:via-gray-750 dark:to-gray-700 text-gray-800 dark:text-gray-200 border-gray-200/50 dark:border-gray-600/50'
              : 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white border-blue-400/30 shadow-blue-500/20'
          }`}
          whileHover={{ 
            scale: 1.01,
            boxShadow: isAssistant 
              ? "0 10px 25px -5px rgba(0, 0, 0, 0.1)" 
              : "0 10px 25px -5px rgba(59, 130, 246, 0.3)"
          }}
          style={{
            boxShadow: isAssistant 
              ? "0 4px 15px -3px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)"
              : "0 4px 15px -3px rgba(59, 130, 246, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)"
          }}
        >
          {/* Message content */}
          <motion.p 
            className="text-sm leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {message.content}
          </motion.p>
          
          {/* Choice Options */}
          {message.type === 'choice' && message.options && (
            <motion.div 
              className="mt-4 space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {message.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => onOptionSelect(option)}
                  className="w-full p-3 text-left bg-white/80 dark:bg-gray-600/80 backdrop-blur-sm rounded-xl hover:bg-white dark:hover:bg-gray-500 transition-all duration-300 border border-gray-200/50 dark:border-gray-500/50 group/option"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 8px 25px -8px rgba(0, 0, 0, 0.15)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-800 dark:text-gray-200 group-hover/option:text-emerald-600 dark:group-hover/option:text-emerald-400 transition-colors">
                        {option.label}
                      </div>
                      {option.description && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                          {option.description}
                        </div>
                      )}
                    </div>
                    <motion.div
                      className="ml-3 text-emerald-500 opacity-0 group-hover/option:opacity-100 transition-opacity"
                      whileHover={{ x: 5 }}
                    >
                      <ChevronRight size={16} />
                    </motion.div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
          
          {/* Product Recommendation */}
          {message.type === 'recommendation' && message.options && (
            <div className="mt-4 space-y-3">
              {/* Primary Recommendation */}
              {message.options.primary && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 rounded-lg p-4 border-2 border-green-200 dark:border-green-700">
                  <div className="flex items-start space-x-3">
                    <Battery className="text-green-500 mt-1" size={20} />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                          {message.options.primary.name}
                        </h4>
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Best Match
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        ₹{message.options.primary.price.toLocaleString()} • {message.options.primary.features[3]}
                      </p>
                      {message.options.primary.reasons && (
                        <div className="mt-2">
                          <p className="text-xs font-medium text-green-700 dark:text-green-300 mb-1">Why this is perfect for you:</p>
                          <ul className="text-xs text-green-600 dark:text-green-400 space-y-1">
                            {message.options.primary.reasons.map((reason, index) => (
                              <li key={index} className="flex items-start space-x-1">
                                <span className="text-green-500 mt-0.5">•</span>
                                <span>{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="flex space-x-2 mt-3">
                        <Button
                          onClick={() => onProductSelect(message.options.primary.id)}
                          size="sm"
                          className="text-xs bg-green-500 hover:bg-green-600"
                        >
                          View Details <ArrowRight size={14} className="ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Alternative Recommendations */}
              {message.options.alternatives && message.options.alternatives.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Alternative Options:
                  </h5>
                  {message.options.alternatives.map((product, index) => (
                    <div key={product.id} className="bg-white dark:bg-gray-600 rounded-lg p-3 border border-gray-200 dark:border-gray-500">
                      <div className="flex items-start space-x-3">
                        <Battery className="text-blue-500 mt-1" size={16} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h6 className="font-medium text-sm text-gray-800 dark:text-gray-200">
                              {product.name}
                            </h6>
                            <span className="text-xs text-gray-500">
                              ₹{product.price.toLocaleString()}
                            </span>
                          </div>
                          {product.reasons && product.reasons.length > 0 && (
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                              {product.reasons[0]}
                            </p>
                          )}
                          <Button
                            onClick={() => onProductSelect(product.id)}
                            size="sm"
                            variant="outline"
                            className="text-xs mt-2"
                          >
                            Compare <ArrowRight size={12} className="ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Additional Products */}
              {message.options.additional && message.options.additional.length > 0 && (
                <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-3 border border-blue-200 dark:border-blue-700">
                  <h5 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                    Recommended Add-on:
                  </h5>
                  {message.options.additional.map((product) => (
                    <div key={product.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{product.name}</span>
                        <Button
                          onClick={() => onProductSelect(product.id)}
                          size="sm"
                          variant="outline"
                          className="text-xs"
                        >
                          Add
                        </Button>
                      </div>
                      {product.reasons && (
                        <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                          {product.reasons.map((reason, index) => (
                            <li key={index} className="flex items-start space-x-1">
                              <span className="text-blue-500 mt-0.5">•</span>
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};



export default VoiceProductAssistant;