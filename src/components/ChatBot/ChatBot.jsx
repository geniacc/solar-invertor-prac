import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Zap,
  Sun,
  Battery,
  Settings,
  HelpCircle,
  Minimize2,
  Maximize2,
  RotateCcw
} from 'lucide-react'
import { Button } from '../ui/Button'
import { Card, CardContent } from '../ui/Card'
import { cn } from '../../lib/utils'
import { useUIStore } from '../../store/useStore'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm your Zuice Assistant. I'm here to help you with everything about our revolutionary Zuice solutions - from technical specifications to installation guidance. How can I assist you today?",
      timestamp: new Date(),
      quickReplies: [
        "Tell me about Zuice μ1000 models",
        "What are the prices?",
        "Installation process",
        "Technical specifications"
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const assistantsHidden = useUIStore((s) => s.assistantsHidden)

  useEffect(() => {
    if (assistantsHidden) {
      setIsOpen(false)
    }
  }, [assistantsHidden])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  const quickReplies = [
    { icon: Zap, text: "μ1000 Models", query: "Tell me about Zuice μ1000 models" },
    { icon: Sun, text: "Specifications", query: "What are the technical specifications?" },
    { icon: Battery, text: "Hybrid Features", query: "Tell me about hybrid functionality" },
    { icon: Settings, text: "Installation", query: "What are the installation requirements?" }
  ]

  const solarKnowledgeBase = {
    mu1000Models: {
      keywords: ['mu1000', 'models', 'variants', 'types', 'difference', 'compare', 'zuice'],
      response: "Our Zuice μ1000 Hybrid PCU series offers comprehensive power solutions:\n\n⚡ **Zuice μ1000 - 50Ah**: Perfect for small homes (₹45,000) - 2 hours backup\n⚡ **Zuice μ1000 Pro - 86Ah**: Ideal for medium homes (₹65,000) - 2.75 hours backup\n⚡ **Zuice μ1000 Max - 100Ah**: Great for large homes (₹75,000) - 3.25 hours backup\n⚡ **Zuice μ1000 Monitoring Kit**: Real-time monitoring system (₹8,000)\n\nAll models feature LiFePo4 battery technology, 1KVA power, 90% efficiency, and hybrid functionality. Which model suits your needs?"
    },
    specifications: {
      keywords: ['specifications', 'specs', 'technical', 'features', 'capacity', 'efficiency'],
      response: "Zuice μ1000 Technical Specifications:\n\n🔋 **LiFePo4 Battery**: 50Ah/86Ah/100Ah options with 3-year warranty\n⚡ **Power Output**: 1KVA-12V PWM Solar Hybrid PCU\n🔄 **Solar Input**: Max 660Wp solar array capacity\n📊 **Efficiency**: >90% SCC, >85% UPS efficiency\n🛡️ **Protection**: 8+ protection features including over-voltage, under-voltage\n🌡️ **Changeover**: <40ms switching time\n📱 **Monitoring**: LCD display + optional mobile app kit\n📏 **Dimensions**: 445 x 385 x 170 mm\n\nNeed detailed specs for a specific model?"
    },
    installation: {
      keywords: ['installation', 'install', 'setup', 'requirements', 'wiring'],
      response: "Zuice μ1000 Installation Requirements:\n\n🏠 **Location**: Well-ventilated, dry area with IP20 protection\n⚡ **Electrical**: 230V AC ±15% input, proper grounding required\n🔧 **Solar**: Max 660Wp solar array connection\n📏 **Space**: Compact 445x385x170mm size, minimal clearance needed\n👷 **Professional**: Certified technician installation recommended\n📋 **Warranty**: 2-year PCU + 3-year battery warranty\n\nInstallation typically takes 2-4 hours including commissioning. Planning an installation?"
    },
    hybrid: {
      keywords: ['hybrid', 'battery', 'grid', 'solar', 'backup', 'switching'],
      response: "Zuice μ1000 Hybrid Functionality:\n\n🔋 **LiFePo4 Battery**: Integrated 50Ah/86Ah/100Ah battery storage\n🔋 **Fast Switching**: <40ms changeover time during outages\n⚡ **Solar Integration**: PWM solar charge controller for 660Wp arrays\n🔄 **Smart Management**: Automatic priority switching (Solar → Battery → Grid)\n📊 **High Efficiency**: >90% solar charging, >85% UPS efficiency\n⏰ **Extended Backup**: 2-3.25 hours backup depending on model\n\nThe system automatically manages energy flow for optimal efficiency. Want to know more about a specific feature?"
    },
    maintenance: {
      keywords: ['maintenance', 'service', 'cleaning', 'care', 'upkeep', 'warranty'],
      response: "Zuice μ1000 Maintenance Guidelines:\n\n✅ **LCD Display**: Monitor system status via built-in display\n🧹 **Cleaning**: Keep IP20 enclosure clean and dust-free\n🔧 **Connections**: Inspect solar and battery terminals quarterly\n📱 **Optional Monitoring**: Add monitoring kit for remote tracking\n🛡️ **Warranty**: 2-year PCU + 3-year LiFePo4 battery warranty\n👨‍🔧 **Service**: Annual professional inspection recommended\n\nMinimal maintenance required thanks to robust LiFePo4 design. Need specific maintenance tips?"
    },
    pricing: {
      keywords: ['price', 'cost', 'buy', 'purchase', 'rent', 'rental', 'quote', 'budget'],
      response: "Zuice μ1000 Pricing Information:\n\n💰 **Zuice μ1000 - 50Ah**: ₹45,000 (was ₹55,000) - 18% discount\n💰 **Zuice μ1000 Pro - 86Ah**: ₹65,000 (was ₹75,000) - 13% discount\n💰 **Zuice μ1000 Max - 100Ah**: ₹75,000 (was ₹85,000) - 12% discount\n💰 **Zuice μ1000 Monitoring Kit**: ₹8,000 (was ₹10,000) - 20% discount\n\nAll prices include GST. Professional installation available. Ready to get a detailed quote?"
    }
  }

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase()
    
    // Find matching knowledge base entry
    for (const [category, data] of Object.entries(solarKnowledgeBase)) {
      if (data.keywords.some(keyword => message.includes(keyword))) {
        return {
          content: data.response,
          suggestions: getRelatedSuggestions(category)
        }
      }
    }

    // Default responses for common queries
    if (message.includes('hello') || message.includes('hi')) {
      return {
        content: "Hello! I'm your Zuice Assistant. I'm here to help with everything about our Zuice solutions. What would you like to know?",
        timestamp: new Date(),
        quickReplies: [
          "Tell me about Zuice μ1000 models",
          "What are the prices?",
          "Installation requirements",
          "Technical specifications"
        ]
      }
    }

    if (message.includes('price') || message.includes('cost')) {
      return {
        content: "Zuice μ1000 Pricing Information:\n\n💰 **Zuice μ1000 - 50Ah**: ₹45,000 (was ₹55,000) - 18% discount\n💰 **Zuice μ1000 Pro - 86Ah**: ₹65,000 (was ₹75,000) - 13% discount\n💰 **Zuice μ1000 Max - 100Ah**: ₹75,000 (was ₹85,000) - 12% discount\n💰 **Zuice μ1000 Monitoring Kit**: ₹8,000 (was ₹10,000) - 20% discount\n\nAll prices include GST. Professional installation available. Ready to get a detailed quote?",
        suggestions: [
          "Compare model features",
          "Installation costs",
          "Financing options",
          "Get a quote"
        ]
      }
    }

    if (message.includes('warranty') || message.includes('guarantee')) {
      return {
        content: "Zuice μ1000 Warranty Coverage:\n\n🛡️ **PCU Warranty**: 2 years comprehensive coverage\n🛡️ **Battery Warranty**: 3 years LiFePo4 battery warranty\n🛡️ **Performance Guarantee**: 95% efficiency rating\n🛡️ **Service Support**: Nationwide service network\n🛡️ **Quality Assurance**: Rigorous testing standards\n\nOur Zuice μ1000 series comes with industry-leading warranty. Need specific warranty details?",
        suggestions: [
          "Warranty terms",
          "Service locations",
          "Claim process",
          "Extended coverage"
        ]
      }
    }

    // Generic helpful response
    return {
      content: "I'd be happy to help with that! I specialize in Zuice solutions - from technical specifications to installation guidance. Could you be more specific about what you'd like to know?",
      quickReplies: [
        "Zuice μ1000 model comparison",
        "Installation process",
        "Pricing details",
        "Technical support"
      ]
    }
  }

  const getRelatedSuggestions = (category) => {
    const suggestions = {
      mu1000Models: [
        "Which Zuice μ1000 model is best for my home?",
        "Compare 50Ah vs 86Ah vs 100Ah models",
        "Energy storage capacity recommendations",
        "Model selection guide"
      ],
      specifications: [
        "MPPT efficiency details",
        "Pure sine wave benefits",
        "LCD display features",
        "Protection mechanisms"
      ],
      installation: [
        "Find certified installer",
        "Wiring requirements",
        "Space and ventilation needs",
        "Installation timeline"
      ],
      hybrid: [
        "Solar priority mode",
        "Battery backup switching",
        "Grid tie functionality",
        "Load management features"
      ],
      maintenance: [
        "Monthly check procedures",
        "Cleaning guidelines",
        "Performance monitoring",
        "Service schedule"
      ],
      pricing: [
        "Model comparison",
        "Installation costs",
        "Financing options",
        "ROI calculator"
      ]
    }
    return suggestions[category] || []
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue)
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse.content,
        timestamp: new Date(),
        suggestions: botResponse.suggestions
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion)
    handleSendMessage()
  }

  const handleQuickReply = (query) => {
    setInputValue(query)
    setTimeout(() => handleSendMessage(), 100)
  }

  const resetChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: "Chat reset! I'm your Zuice Assistant, ready to help with your Zuice μ1000 Hybrid PCU questions. We're making reliable power accessible to everyone. What would you like to know?",
        timestamp: new Date(),
        suggestions: [
          "What Zuice μ1000 do I need for my home?",
          "Compare different μ1000 models",
          "Installation requirements",
          "Maintenance tips"
        ]
      }
    ])
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (assistantsHidden) return null

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 left-6 z-50"
          >
            <motion.button
              onClick={() => setIsOpen(true)}
              className="relative w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Pulsing ring effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-purple-500/30"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 0, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Icon */}
              <MessageCircle className="h-7 w-7 group-hover:scale-110 transition-transform relative z-10" />
              
              {/* Notification dot */}
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                <span className="text-xs font-bold text-white">!</span>
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '600px'
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className={cn(
              "fixed bottom-6 left-6 z-50 w-96 bg-background border rounded-2xl shadow-2xl overflow-hidden",
              isMinimized && "h-auto"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary to-solar text-white">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Zuice Assistant</h3>
                  <p className="text-xs opacity-90">μ1000 Expert</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  {isMinimized ? (
                    <Maximize2 className="h-4 w-4" />
                  ) : (
                    <Minimize2 className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={resetChat}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Quick Replies */}
                <div className="p-4 border-b bg-muted/30">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Quick Help:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply.query)}
                        className="flex items-center space-x-2 p-2 text-xs bg-background hover:bg-muted rounded-lg transition-colors text-left"
                      >
                        <reply.icon className="h-3 w-3 text-primary flex-shrink-0" />
                        <span className="truncate">{reply.text}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex",
                        message.type === 'user' ? "justify-end" : "justify-start"
                      )}
                    >
                      <div className={cn(
                        "flex items-start space-x-2 max-w-[80%]",
                        message.type === 'user' && "flex-row-reverse space-x-reverse"
                      )}>
                        <div className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                          message.type === 'user' 
                            ? "bg-primary text-white" 
                            : "bg-gradient-to-br from-primary to-solar text-white"
                        )}>
                          {message.type === 'user' ? (
                            <User className="h-3 w-3" />
                          ) : (
                            <Bot className="h-3 w-3" />
                          )}
                        </div>
                        <div className={cn(
                          "rounded-2xl px-3 py-2 text-sm",
                          message.type === 'user'
                            ? "bg-primary text-white"
                            : "bg-muted"
                        )}>
                          <div className="whitespace-pre-wrap">{message.content}</div>
                          <div className={cn(
                            "text-xs mt-1 opacity-70",
                            message.type === 'user' ? "text-white/70" : "text-muted-foreground"
                          )}>
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-primary to-solar rounded-full flex items-center justify-center">
                          <Bot className="h-3 w-3 text-white" />
                        </div>
                        <div className="bg-muted rounded-2xl px-3 py-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Suggestions */}
                  {messages.length > 0 && messages[messages.length - 1].suggestions && !isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2"
                    >
                      <p className="text-xs text-muted-foreground">Suggested questions:</p>
                      <div className="space-y-1">
                        {messages[messages.length - 1].suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="block w-full text-left text-xs p-2 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors text-primary"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask about Zuice μ1000 systems..."
                      className="flex-1 px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      size="sm"
                      className="px-3"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Powered by AI • Zuice μ1000 expertise
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot