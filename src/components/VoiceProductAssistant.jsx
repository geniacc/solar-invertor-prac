import React, { useState, useEffect, useRef, useMemo } from 'react';
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
import { essProducts } from '../data/essProducts';
import { LoadingSpinner, InlineLoader } from './ui/Loading';
import { useResponsive } from './ui/Responsive';
import { useUIStore } from '../store/useStore';

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
  const [pendingConfirmation, setPendingConfirmation] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [lastUserInput, setLastUserInput] = useState('');
  
  const { isMobile, isTablet } = useResponsive();
  const reducedMotion = useMemo(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      try {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches || isMobile;
      } catch {
        return isMobile;
      }
    }
    return isMobile;
  }, [isMobile]);
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const navigate = useNavigate();
  const assistantsHidden = useUIStore((s) => s.assistantsHidden);

  useEffect(() => {
    // Hide assistant when footer is visible (all devices)
    if (assistantsHidden) {
      setIsOpen(false);
      // ensure no audio/listening continues when hidden
      try { stopListening(); } catch {}
      try { stopSpeaking(); } catch {}
    }
  }, [assistantsHidden])

  // Conversation flow steps
  const conversationSteps = [
    {
      id: 'segment',
      question: "Who is this battery for?",
      type: 'choice',
      key: 'segment',
      options: [
        { value: 'home', label: 'Home', icon: Home, description: 'Apartments, houses, small solar' },
        { value: 'commercial', label: 'Business', icon: Building, description: 'Shops, offices, factories' },
        { value: 'telecom', label: 'Telecom site', icon: Building, description: 'Tower, rack, network rooms' },
        { value: 'enterprise', label: 'Enterprise/Utility', icon: Building, description: 'Large industrial or utility-scale' },
        { value: 'not_sure', label: "I'm not sure", description: 'We’ll pick a sensible default' }
      ]
    },
    {
      id: 'voltage',
      question: "Do you know the battery voltage you need?",
      type: 'choice',
      key: 'voltage',
      options: [
        { value: '12.8', label: '12.8V', icon: Battery, description: 'Small backups and basic setups' },
        { value: '25.6', label: '25.6V', icon: Battery, description: 'Mid-size backups, more capacity' },
        { value: '48', label: '48V', icon: Battery, description: 'Standard for most home systems' },
        { value: '51.2', label: '51.2V', icon: Battery, description: 'Home system, slightly higher' },
        { value: '96', label: '96V', icon: Battery, description: 'Commercial/industrial systems' },
        { value: '120', label: '120V', icon: Battery, description: 'Commercial/industrial systems' },
        { value: 'not_sure', label: "I'm not sure", description: 'No problem — we’ll choose for you' }
      ]
    },
    {
      id: 'energy',
      question: "How much energy do you want to store?",
      type: 'choice',
      key: 'energyCapacity',
      options: [
        { value: '1-3', label: '1–3 kWh', icon: Zap, description: 'Lights, Wi‑Fi, small appliances' },
        { value: '3-5', label: '3–5 kWh', icon: Zap, description: 'Fridge + few fans, essential loads' },
        { value: '5-10', label: '5–10 kWh', icon: Zap, description: 'Most essentials for longer' },
        { value: '10-20', label: '10–20 kWh', icon: Zap, description: 'Larger homes and longer backup' },
        { value: '250+', label: '250+ kWh', icon: Zap, description: 'Industrial/utility-scale storage' },
        { value: 'not_sure', label: "I'm not sure", description: 'Help me choose the right size' }
      ]
    },
    {
      id: 'mounting',
      question: "How would you like it installed?",
      type: 'choice',
      key: 'mounting',
      options: [
        { value: 'wall', label: 'Wall-mounted', description: 'Saves floor space' },
        { value: 'floor', label: 'Floor cabinet', description: 'Traditional enclosure' },
        { value: 'stackable', label: 'Stackable modular', description: 'Grow later, flexible capacity' },
        { value: 'rack', label: '19" rack (telecom)', description: 'Fits standard telecom racks' },
        { value: 'not_sure', label: "I'm not sure", description: 'Suggest the most common option' }
      ]
    },
    {
      id: 'cycle_life',
      question: "Any preference for battery life (number of cycles)?",
      type: 'choice',
      key: 'cycleLife',
      options: [
        { value: '6000', label: '6000+ cycles', description: 'Good lifespan' },
        { value: '8000', label: '8000+ cycles', description: 'Better longevity' },
        { value: '10000', label: '10000+ cycles', description: 'Longest life' },
        { value: 'not_sure', label: "I'm not sure", description: 'Pick a balanced option' }
      ]
    },
    {
      id: 'connectivity',
      question: "Do you want app/remote monitoring?",
      type: 'choice',
      key: 'connectivity',
      options: [
        { value: 'wifi_4g', label: 'WiFi/4G/App', description: 'Phone app and cloud access' },
        { value: 'rs485_can', label: 'RS485/CAN', description: 'Integrate with inverters/EMS' },
        { value: 'bluetooth', label: 'Bluetooth', description: 'Local monitoring' },
        { value: 'none', label: 'No preference', description: 'Basic setup is fine' },
        { value: 'not_sure', label: "I'm not sure", description: 'Choose a helpful default' }
      ]
    },
    {
      id: 'scalability',
      question: "Do you plan to expand later?",
      type: 'choice',
      key: 'scalability',
      options: [
        { value: 'single', label: 'Single unit', description: 'Simple, one battery' },
        { value: 'parallel', label: 'Parallel support', description: 'Add more units side‑by‑side' },
        { value: 'modular', label: 'Modular/Stackable', description: 'Easy to expand capacity' },
        { value: 'not_sure', label: "I'm not sure", description: 'Suggest a flexible option' }
      ]
    },
    {
      id: 'environment',
      question: "Where will it be installed?",
      type: 'choice',
      key: 'environment',
      options: [
        { value: 'indoor', label: 'Indoors', description: 'Inside your home or office' },
        { value: 'outdoor', label: 'Outdoors', description: 'Weather-resistant enclosure' },
        { value: 'harsh', label: 'Harsh climates', description: 'Extreme heat/cold or dust' },
        { value: 'telecom_rack', label: 'Telecom rack', description: '19" rack environment' },
        { value: 'not_sure', label: "I'm not sure", description: 'We’ll adjust for your space' }
      ]
    },
    {
      id: 'budget',
      question: "What’s your budget range?",
      type: 'choice',
      key: 'budgetRange',
      options: [
        { value: '40-60', label: '₹40k–₹60k', icon: DollarSign, description: 'Entry-level' },
        { value: '60-90', label: '₹60k–₹90k', icon: DollarSign, description: 'Most popular' },
        { value: '90-120', label: '₹90k–₹120k', icon: DollarSign, description: 'Higher capacity' },
        { value: '120-200', label: '₹120k–₹200k', icon: DollarSign, description: 'Premium home/commercial' },
        { value: '2000+', label: '₹2M+', icon: DollarSign, description: 'Large industrial/utility' },
        { value: 'not_sure', label: "I'm not sure", description: 'Recommend best value' }
      ]
    }
  ];

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      // Enhanced recognition settings
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true; // Enable interim results for better UX
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.maxAlternatives = 3; // Get multiple alternatives
      
      // Enhanced result handling with confidence scoring
      recognitionRef.current.onresult = (event) => {
        const results = event.results;
        const lastResult = results[results.length - 1];
        
        if (lastResult.isFinal) {
          const transcript = lastResult[0].transcript;
          const confidence = lastResult[0].confidence;
          
          console.log('🎙️ Voice input:', transcript, 'Confidence:', confidence);
          
          // Only process if confidence is reasonable
          if (confidence > 0.3) {
            handleVoiceInput(transcript, confidence);
          } else {
            console.log('⚠️ Low confidence, asking for repeat');
            speakText("I didn't catch that clearly. Could you please repeat?");
            setTimeout(() => {
              startListening();
            }, 2000);
          }
        } else {
          // Show interim results for better UX
          const interimTranscript = lastResult[0].transcript;
          setInputText(interimTranscript);
        }
      };

      // Enhanced error handling
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        let errorMessage = '';
        switch (event.error) {
          case 'no-speech':
            errorMessage = "I didn't hear anything. Please try speaking again.";
            break;
          case 'audio-capture':
            errorMessage = "Microphone access is needed. Please check your microphone settings.";
            break;
          case 'not-allowed':
            errorMessage = "Microphone permission is required for voice input.";
            break;
          case 'network':
            errorMessage = "Network error occurred. Please check your connection.";
            break;
          case 'aborted':
            // Don't show error for intentional stops
            return;
          default:
            errorMessage = "Voice recognition error. Please try typing your response instead.";
        }
        
        if (errorMessage) {
          speakText(errorMessage);
          // Auto-retry for certain errors
          if (['no-speech', 'network'].includes(event.error)) {
            setTimeout(() => {
              if (!isListening) {
                startListening();
              }
            }, 3000);
          }
        }
      };

      // Enhanced end handling
      recognitionRef.current.onend = () => {
        setIsListening(false);
        setInputText(''); // Clear interim text
        console.log('🔇 Voice recognition ended');
      };

      // Start event
      recognitionRef.current.onstart = () => {
        console.log('🎙️ Voice recognition started');
        setInputText(''); // Clear any previous text
      };

      // Audio start/end events for better feedback
      recognitionRef.current.onaudiostart = () => {
        console.log('🔊 Audio capture started');
      };

      recognitionRef.current.onaudioend = () => {
        console.log('🔇 Audio capture ended');
      };
    }

    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      
      // Load voices when they become available
      const loadVoices = () => {
        const voices = synthRef.current.getVoices();
        if (voices.length > 0) {
          console.log('🎵 Available voices:', voices.length);
        }
      };
      
      // Voices might load asynchronously
      synthRef.current.onvoiceschanged = loadVoices;
      loadVoices(); // Try loading immediately
    }

    // Initial greeting when opened
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        askQuestion(0);
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speakText = (text) => {
    if (synthRef.current && !isSpeaking) {
      // Cancel any ongoing speech
      synthRef.current.cancel();
      
      // Clean and enhance text for better speech
      const enhancedText = enhanceTextForSpeech(text);
      
      const utterance = new SpeechSynthesisUtterance(enhancedText);
      
      // Get available voices and select the best one
      const voices = synthRef.current.getVoices();
      const preferredVoice = selectBestVoice(voices);
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      // Enhanced voice settings for more natural speech
      utterance.rate = 0.9; // Optimal speed for clarity and naturalness
      utterance.pitch = 1.0; // Natural pitch for professional tone
      utterance.volume = 0.95; // Clear volume for better understanding
      
      // Add natural pauses and emphasis
      utterance.onstart = () => {
        setIsSpeaking(true);
        console.log('🎤 Speaking:', enhancedText);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
        console.log('🔇 Speech ended');
      };
      
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setIsSpeaking(false);
      };
      
      synthRef.current.speak(utterance);
    }
  };

  // Enhanced text processing for more natural speech
  const enhanceTextForSpeech = (text) => {
    return text
      // Add natural pauses for better flow
      .replace(/\./g, '. ')
      .replace(/\?/g, '? ')
      .replace(/!/g, '! ')
      .replace(/,/g, ', ')
      .replace(/:/g, ': ')
      .replace(/;/g, '; ')
      // Improve pronunciation of technical terms
      .replace(/₹/g, 'rupees ')
      .replace(/kW/g, 'kilowatt ')
      .replace(/Ah/g, 'ampere hour ')
      .replace(/PCU/g, 'power control unit ')
      .replace(/3D/g, 'three D ')
      .replace(/AI/g, 'A I ')
      .replace(/inverter/gi, 'inverter')
      .replace(/invertor/gi, 'inverter')
      // Add natural emphasis and flow
      .replace(/Let's start/gi, 'Let\'s start')
      .replace(/What's/gi, 'What is')
      .replace(/you're/gi, 'you are')
      .replace(/I'm/gi, 'I am')
      .replace(/I'll/gi, 'I will')
      .replace(/you'll/gi, 'you will')
      // Improve number pronunciation
      .replace(/1-3/g, 'one to three')
      .replace(/3-5/g, 'three to five')
      .replace(/5\+/g, 'five or more')
      .replace(/6\+/g, 'six or more')
      .replace(/2-3/g, 'two to three')
      .replace(/4-6/g, 'four to six')
      // Clean up extra spaces and normalize
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Select the best available voice for speech synthesis
  const selectBestVoice = (voices) => {
    if (!voices || voices.length === 0) return null;
    
    // Preferred voice characteristics
    const preferences = [
      // English voices with good quality
      (voice) => voice.lang.startsWith('en') && voice.name.includes('Google'),
      (voice) => voice.lang.startsWith('en') && voice.name.includes('Microsoft'),
      (voice) => voice.lang.startsWith('en') && voice.name.includes('Natural'),
      (voice) => voice.lang.startsWith('en') && voice.name.includes('Premium'),
      (voice) => voice.lang.startsWith('en') && voice.gender === 'female',
      (voice) => voice.lang.startsWith('en') && voice.localService === false,
      (voice) => voice.lang.startsWith('en'),
      (voice) => voice.default
    ];
    
    // Try each preference in order
    for (const preference of preferences) {
      const voice = voices.find(preference);
      if (voice) {
        console.log('🎵 Selected voice:', voice.name, voice.lang);
        return voice;
      }
    }
    
    // Fallback to first available voice
    console.log('🎵 Using fallback voice:', voices[0].name);
    return voices[0];
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening && !isSpeaking) {
      // Don't start listening while speaking
      if (isSpeaking) {
        console.log('⏸️ Waiting for speech to finish before listening...');
        setTimeout(() => {
          if (!isSpeaking) {
            startListening();
          }
        }, 1000);
        return;
      }

      try {
        setIsListening(true);
        console.log('🎙️ Starting voice recognition...');
        
        // Provide audio feedback
        speakText("I'm listening...");
        
        // Start recognition after a brief delay to avoid capturing the feedback
        setTimeout(() => {
          if (recognitionRef.current && isListening) {
            recognitionRef.current.start();
          }
        }, 1500);
        
        // Auto-stop after 10 seconds to prevent hanging
        setTimeout(() => {
          if (isListening) {
            console.log('⏰ Auto-stopping voice recognition after timeout');
            stopListening();
            speakText("I didn't hear anything. Please try again or type your response.");
          }
        }, 10000);
        
      } catch (error) {
        console.error('Error starting voice recognition:', error);
        setIsListening(false);
        speakText("Voice recognition is not available. Please type your response.");
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
        setIsListening(false);
        console.log('🔇 Voice recognition stopped');
      } catch (error) {
        console.error('Error stopping voice recognition:', error);
        setIsListening(false);
      }
    }
  };

  // Enhanced listening with noise detection
  const startSmartListening = () => {
    if (!recognitionRef.current) {
      speakText("Voice recognition is not supported in your browser. Please type your response.");
      return;
    }

    // Check if microphone permission is available
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          console.log('🎤 Microphone access granted');
          startListening();
        })
        .catch((error) => {
          console.error('Microphone access denied:', error);
          speakText("Microphone access is required for voice input. Please enable it or type your response.");
        });
    } else {
      startListening(); // Fallback to basic listening
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

    // Add dynamic contextual variations
    const enhancedQuestion = addContextualVariations(question, step, userResponses, stepIndex);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(enhancedQuestion, 'assistant', step.type, step.options);
      speakText(enhancedQuestion);
    }, 1000);
  };

  // Add contextual variations to make responses more natural and personalized
  const addContextualVariations = (question, step, responses, stepIndex) => {
    const timeOfDay = new Date().getHours();
    const greeting = timeOfDay < 12 ? 'Good morning' : timeOfDay < 17 ? 'Good afternoon' : 'Good evening';
    
    // Add contextual prefixes based on conversation progress
    let contextualPrefix = '';
    
    if (stepIndex === 0) {
      const greetings = [
        `${greeting}! `,
        'Welcome! ',
        'Hello! ',
        'Great to have you here! ',
        'Let\'s get started! '
      ];
      contextualPrefix = greetings[Math.floor(Math.random() * greetings.length)];
    } else if (stepIndex > 0) {
      const continuations = [
        'Excellent choice! ',
        'Perfect! ',
        'Great! ',
        'Wonderful! ',
        'That helps a lot! ',
        'Good to know! '
      ];
      
      // Add contextual responses based on previous answers
      if (responses.propertyType === 'large_home') {
        continuations.push('A large home needs robust power backup! ');
      } else if (responses.propertyType === 'small_home') {
        continuations.push('Smart choice for efficient power management! ');
      }
      
      if (responses.powerUsage === 'high') {
        continuations.push('High power usage requires careful planning! ');
      }
      
      contextualPrefix = continuations[Math.floor(Math.random() * continuations.length)];
    }
    
    // Add contextual suffixes based on step type
    let contextualSuffix = '';
    
    if (step.type === 'choice') {
      const choicePrompts = [
        ' What would work best for you?',
        ' Which option suits your needs?',
        ' What do you think?',
        ' Which one feels right?',
        ' What\'s your preference?'
      ];
      contextualSuffix = choicePrompts[Math.floor(Math.random() * choicePrompts.length)];
    } else if (step.type === 'text') {
      const textPrompts = [
        ' Please let me know!',
        ' I\'d love to hear from you!',
        ' What would you like to share?',
        ' Please tell me!',
        ' I\'m here to help!'
      ];
      contextualSuffix = textPrompts[Math.floor(Math.random() * textPrompts.length)];
    }
    
    // Combine with smart spacing
    return (contextualPrefix + question + contextualSuffix).replace(/\s+/g, ' ').trim();
  };

  // Enhanced recommendation generation with personalized speech
  const generatePersonalizedRecommendation = (recommendation) => {
    const { propertyType, powerUsage, budget } = userResponses;
    
    let personalizedIntro = '';
    const intros = [
      'Based on our conversation, ',
      'Perfect! After analyzing your needs, ',
      'Great news! ',
      'I\'ve found the ideal solution for you! ',
      'Here\'s what I recommend based on your requirements: '
    ];
    personalizedIntro = intros[Math.floor(Math.random() * intros.length)];
    
    let contextualReason = '';
    if (propertyType && powerUsage) {
      if (propertyType === 'large_home' && powerUsage === 'high') {
        contextualReason = 'For your large home with high power needs, ';
      } else if (propertyType === 'small_home' && powerUsage === 'low') {
        contextualReason = 'For your compact home with efficient power usage, ';
      } else {
        contextualReason = `For your ${propertyType.replace('_', ' ')} with ${powerUsage} power usage, `;
      }
    }
    
    return personalizedIntro + contextualReason + 'this is my top recommendation for you.';
  };

  // Voice confirmation and retry mechanisms
  const requestConfirmation = (transcript, confidence, stepData) => {
    setLastUserInput(transcript);
    setPendingConfirmation({
      transcript,
      confidence,
      stepData,
      originalStep: currentStep
    });
    
    const confirmationMessages = [
      `I heard "${transcript}". Is that correct?`,
      `Did you say "${transcript}"?`,
      `Just to confirm, you said "${transcript}". Is that right?`,
      `I want to make sure I got that right. You said "${transcript}". Correct?`
    ];
    
    const confirmationMessage = confirmationMessages[Math.floor(Math.random() * confirmationMessages.length)];
    addMessage(confirmationMessage, 'assistant', 'confirmation');
    speakText(confirmationMessage);
  };

  const handleConfirmationResponse = (response) => {
    const lowerResponse = response.toLowerCase();
    const isPositive = lowerResponse.includes('yes') || lowerResponse.includes('correct') || 
                      lowerResponse.includes('right') || lowerResponse.includes('yeah') ||
                      lowerResponse.includes('yep') || lowerResponse.includes('sure');
    const isNegative = lowerResponse.includes('no') || lowerResponse.includes('wrong') || 
                      lowerResponse.includes('incorrect') || lowerResponse.includes('nope');
    
    if (isPositive && pendingConfirmation) {
      // User confirmed, proceed with the original input
      const { transcript, stepData } = pendingConfirmation;
      setPendingConfirmation(null);
      setRetryCount(0);
      
      const acknowledgments = [
        'Perfect! Thank you for confirming.',
        'Great! Got it.',
        'Excellent! Moving forward.',
        'Thank you for the confirmation!'
      ];
      
      const ack = acknowledgments[Math.floor(Math.random() * acknowledgments.length)];
      speakText(ack);
      
      setTimeout(() => {
        handleUserResponse(transcript, 1.0); // Treat confirmed input as high confidence
      }, 1500);
      
    } else if (isNegative) {
      // User said no, ask them to repeat
      setPendingConfirmation(null);
      setRetryCount(prev => prev + 1);
      
      if (retryCount < 2) {
        const retryMessages = [
          'No problem! Please try saying that again.',
          'I understand. Could you repeat that for me?',
          'Got it. Let me listen again. Please repeat your answer.',
          'Okay, let\'s try again. Please say your answer once more.'
        ];
        
        const retryMessage = retryMessages[Math.floor(Math.random() * retryMessages.length)];
        addMessage(retryMessage, 'assistant');
        speakText(retryMessage);
        
        setTimeout(() => {
          startSmartListening();
        }, 2000);
      } else {
        // Too many retries, offer alternative
        const fallbackMessage = 'I\'m having trouble understanding. Would you like to type your answer instead, or should we move to the next question?';
        addMessage(fallbackMessage, 'assistant');
        speakText(fallbackMessage);
        setRetryCount(0);
      }
    } else {
      // Unclear response to confirmation
      const clarificationMessage = 'I didn\'t catch that. Please say "yes" if I got it right, or "no" if I need to listen again.';
      addMessage(clarificationMessage, 'assistant');
      speakText(clarificationMessage);
    }
  };

  const handleRetryMechanism = (transcript, confidence, stepData) => {
    if (confidence < 0.5 && retryCount < 2) {
      setRetryCount(prev => prev + 1);
      
      const retryMessages = [
        'I didn\'t catch that clearly. Could you please repeat?',
        'Sorry, I missed that. Please say it again.',
        'I\'m having trouble hearing you. Could you try once more?',
        'Let me listen more carefully. Please repeat your answer.'
      ];
      
      const retryMessage = retryMessages[Math.floor(Math.random() * retryMessages.length)];
      addMessage(retryMessage, 'assistant');
      speakText(retryMessage);
      
      setTimeout(() => {
        startSmartListening();
      }, 2000);
      
      return true; // Indicates retry was triggered
    } else if (retryCount >= 2) {
      // Reset retry count and offer alternatives
      setRetryCount(0);
      const fallbackMessage = 'I\'m still having trouble understanding. You can type your answer, or I can move to the next question. What would you prefer?';
      addMessage(fallbackMessage, 'assistant');
      speakText(fallbackMessage);
      return true;
    }
    
    return false; // No retry needed
  };

  const handleVoiceInput = (transcript, confidence = 1.0) => {
    setInputText(transcript);
    
    // Handle pending confirmation first
    if (pendingConfirmation) {
      handleConfirmationResponse(transcript);
      return;
    }
    
    const currentStepData = conversationSteps[currentStep];
    
    // Check if retry mechanism should be triggered
    if (handleRetryMechanism(transcript, confidence, currentStepData)) {
      return; // Retry was triggered, don't proceed
    }
    
    // Request confirmation for medium confidence inputs
    if (confidence >= 0.5 && confidence < 0.8) {
      console.log('⚠️ Medium confidence input, requesting confirmation...');
      requestConfirmation(transcript, confidence, currentStepData);
      return;
    }
    
    // High confidence or confirmed input - proceed normally
    setRetryCount(0); // Reset retry count on successful input
    handleUserResponse(transcript, confidence);
  };

  const parseTextResponse = (response, stepData) => {
    if (stepData.type !== 'choice' || !stepData.options) {
      return response; // For text inputs, return as-is
    }

    const lower = response.toLowerCase().trim();

    const notSurePhrases = ['not sure', "don't know", 'dont know', 'unsure', 'no idea', 'anything', 'either', 'skip', 'whatever', 'any', 'no preference'];
    if (notSurePhrases.some(p => lower.includes(p))) {
      return 'not_sure';
    }

    // Try to match against option values, labels, or descriptions
    for (const option of stepData.options) {
      if (
        lower.includes(String(option.value).toLowerCase()) ||
        lower.includes(option.label.toLowerCase()) ||
        (option.description && lower.includes(option.description.toLowerCase()))
      ) {
        return option.value;
      }
    }

    // Specific mappings by key
    if (stepData.key === 'segment') {
      if (/(home|house|residential)/.test(lower)) return 'home';
      if (/(business|shop|office|commercial)/.test(lower)) return 'commercial';
      if (/(telecom|tower|rack|network)/.test(lower)) return 'telecom';
      if (/(enterprise|utility|industrial|large)/.test(lower)) return 'enterprise';
    }

    if (stepData.key === 'voltage') {
      const m = lower.match(/(\d+(\.\d+)?)\s*v/);
      if (m) return m[1];
      if (lower.includes('48')) return '48';
      if (lower.includes('51')) return '51.2';
      if (lower.includes('12')) return '12.8';
      if (lower.includes('25')) return '25.6';
      if (lower.includes('96')) return '96';
      if (lower.includes('120')) return '120';
    }

    if (stepData.key === 'energyCapacity') {
      const mk = lower.match(/(\d+(\.\d+)?)\s*kwh/);
      if (mk) {
        const val = parseFloat(mk[1]);
        if (val < 3) return '1-3';
        if (val < 5) return '3-5';
        if (val < 10) return '5-10';
        if (val < 20) return '10-20';
        return '250+';
      }
    }

    if (stepData.key === 'mounting') {
      if (lower.includes('wall')) return 'wall';
      if (lower.includes('floor') || lower.includes('cabinet')) return 'floor';
      if (lower.includes('stack')) return 'stackable';
      if (lower.includes('rack')) return 'rack';
    }

    if (stepData.key === 'cycleLife') {
      if (lower.includes('10000')) return '10000';
      if (lower.includes('8000')) return '8000';
      if (lower.includes('6000')) return '6000';
    }

    if (stepData.key === 'connectivity') {
      if (/(wifi|app|4g)/.test(lower)) return 'wifi_4g';
      if (/(rs485|can)/.test(lower)) return 'rs485_can';
      if (lower.includes('bluetooth')) return 'bluetooth';
      if (lower.includes('no preference') || lower.includes('basic')) return 'none';
    }

    if (stepData.key === 'scalability') {
      if (lower.includes('single')) return 'single';
      if (lower.includes('parallel')) return 'parallel';
      if (/(modular|stack)/.test(lower)) return 'modular';
    }

    if (stepData.key === 'environment') {
      if (lower.includes('indoor')) return 'indoor';
      if (lower.includes('outdoor')) return 'outdoor';
      if (/(harsh|extreme|dust|cold|heat)/.test(lower)) return 'harsh';
      if (/(telecom|rack)/.test(lower)) return 'telecom_rack';
    }

    if (stepData.key === 'budgetRange') {
      const mb = lower.match(/(\d+)\s*k/);
      if (mb) {
        const k = parseInt(mb[1], 10);
        if (k < 60) return '40-60';
        if (k < 90) return '60-90';
        if (k < 120) return '90-120';
        if (k < 200) return '120-200';
        return '2000+';
      }
    }

    return response; // Return original if no match found
  };

  const handleUserResponse = (response, confidence = 1.0) => {
    const currentStepData = conversationSteps[currentStep];
    
    addMessage(response, 'user');
    
    // Parse the response to get the correct value for logic processing
    const parsedValue = parseTextResponse(response, currentStepData);
    
    // Store the parsed response with confidence info
    const newResponses = {
      ...userResponses,
      [currentStepData.key]: parsedValue,
      [`${currentStepData.key}_confidence`]: confidence
    };
    setUserResponses(newResponses);
    
    // Provide acknowledgment for voice inputs
    if (confidence < 1.0) {
      const acknowledgments = [
        "Got it!",
        "Perfect!",
        "Understood!",
        "Great choice!",
        "Excellent!"
      ];
      const randomAck = acknowledgments[Math.floor(Math.random() * acknowledgments.length)];
      speakText(randomAck);
    }
    
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
    
    // Provide acknowledgment for option selection
    const acknowledgments = [
      "Got it!",
      "Perfect!",
      "Understood!",
      "Great choice!",
      "Excellent!"
    ];
    const randomAck = acknowledgments[Math.floor(Math.random() * acknowledgments.length)];
    speakText(randomAck);
    
    // Move to next step with a slight delay to allow acknowledgment to play
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
      askQuestion(currentStep + 1);
    }, 1500);
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
    const {
      segment = 'home',
      voltage = 'not_sure',
      energyCapacity = 'not_sure',
      mounting = 'not_sure',
      cycleLife = 'not_sure',
      connectivity = 'not_sure',
      scalability = 'not_sure',
      environment = 'not_sure',
      budgetRange = 'not_sure'
    } = responses;

    const segmentCategoryMap = {
      home: 'home-ess',
      commercial: 'commercial',
      telecom: 'telecom',
      enterprise: 'commercial'
    };

    const defaultVoltageBySegment = {
      home: 51.2,
      commercial: 96,
      telecom: 48,
      enterprise: 120
    };

    const parseVoltagePref = (v) => {
      if (!v || v === 'not_sure') return defaultVoltageBySegment[segment] || 51.2;
      const num = parseFloat(String(v));
      return isNaN(num) ? defaultVoltageBySegment[segment] || 51.2 : num;
    };

    const voltagePref = parseVoltagePref(voltage);

    const energyRangeMap = {
      '1-3': [1, 3],
      '3-5': [3, 5],
      '5-10': [5, 10],
      '10-20': [10, 20],
      '250+': [250, 10000]
    };

    const parseBudgetRange = (br) => {
      if (!br || br === 'not_sure') return null; // treat as no constraint
      const map = {
        '40-60': [40000, 60000],
        '60-90': [60000, 90000],
        '90-120': [90000, 120000],
        '120-200': [120000, 200000],
        '2000+': [2000000, Infinity]
      };
      return map[br] || null;
    };

    const preferredBudget = parseBudgetRange(budgetRange);

    const getEnergyKWh = (product) => {
      const specs = product.specifications || {};
      const energyStr = specs['Energy'] || specs['Energy Capacity'] || '';
      const match = String(energyStr).match(/(\d+(\.\d+)?)/);
      return match ? parseFloat(match[1]) : null;
    };

    const getNominalVoltage = (product) => {
      // Try from name first
      const nameMatch = String(product.name).match(/(\d+(\.\d+)?)\s*V/i);
      if (nameMatch) return parseFloat(nameMatch[1]);
      // Try voltage range
      const specs = product.specifications || {};
      const vr = String(specs['Voltage Range'] || '');
      const nums = [...vr.matchAll(/(\d+(\.\d+)?)\s*V?/g)].map(m => parseFloat(m[1]));
      if (nums.length >= 2) {
        // average the range to approximate nominal
        const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
        return Math.round(avg * 10) / 10;
      } else if (nums.length === 1) {
        return nums[0];
      }
      // Try energy mapping (e.g., 5.12 kWh -> 51.2V)
      const e = getEnergyKWh(product);
      if (e) {
        const mappings = { 1.28: 12.8, 2.56: 25.6, 4.8: 48, 5.12: 51.2, 9.6: 96, 12: 120 };
        const v = mappings[e];
        if (v) return v;
      }
      // Large systems: use Max Voltage if available
      const maxV = String(specs['Max Voltage'] || specs['Max Voltage DC'] || '').match(/(\d+(\.\d+)?)/);
      if (maxV) return parseFloat(maxV[1]);
      return null;
    };

    const categoryFilter = segmentCategoryMap[segment] || 'home-ess';
    const candidates = essProducts.filter(p => p.category === categoryFilter);

    const scoreProduct = (product) => {
      let score = 10; // base score
      const reasons = [];
      const specs = product.specifications || {};

      // Voltage matching
      const vNom = getNominalVoltage(product);
      if (vNom) {
        const diff = Math.abs(vNom - voltagePref);
        if (diff <= 2) {
          score += 30;
          reasons.push('Matches your voltage preference');
        } else if (diff <= 10) {
          score += 18;
          reasons.push('Close to your voltage choice');
        } else {
          score += 6;
          reasons.push('Standard voltage option for compatibility');
        }
      }

      // Energy capacity range
      const energy = getEnergyKWh(product);
      if (energy) {
        if (energyCapacity !== 'not_sure' && energyRangeMap[energyCapacity]) {
          const [minK, maxK] = energyRangeMap[energyCapacity];
          if (energy >= minK && energy <= maxK) {
            score += 22;
            reasons.push('Energy capacity fits your usage');
          } else if (Math.abs((energy - minK)) <= 1 || Math.abs((energy - maxK)) <= 1) {
            score += 12;
            reasons.push('Near your desired energy range');
          }
        } else {
          // sensible default: prefer mid capacities for home
          if (segment === 'home' && energy >= 4.5 && energy <= 5.2) {
            score += 16;
            reasons.push('Popular capacity for homes');
          }
        }
      }

      // Mounting preference
      const mountingText = String(specs['Mounting'] || specs['Design'] || product.badge || '').toLowerCase();
      if (mounting !== 'not_sure') {
        if (mounting === 'wall' && mountingText.includes('wall')) { score += 12; reasons.push('Wall-mount fits your space'); }
        if (mounting === 'floor' && (mountingText.includes('floor') || mountingText.includes('cabinet'))) { score += 12; reasons.push('Floor cabinet installation'); }
        if (mounting === 'stackable' && mountingText.includes('stack')) { score += 12; reasons.push('Stackable for easy expansion'); }
        if (mounting === 'rack' && mountingText.includes('rack')) { score += 14; reasons.push('Telecom rack compatible'); }
      }

      // Cycle life
      const cycleText = String(specs['Cycle Life'] || '').toLowerCase();
      if (cycleLife !== 'not_sure') {
        if (cycleLife === '10000' && cycleText.includes('10000')) { score += 10; reasons.push('10,000+ cycles long life'); }
        if (cycleLife === '8000' && cycleText.includes('8000')) { score += 8; reasons.push('8,000+ cycles longevity'); }
        if (cycleLife === '6000' && cycleText.includes('6000')) { score += 6; reasons.push('6,000+ cycles value'); }
      } else {
        if (cycleText.includes('8000')) { score += 6; reasons.push('Long-life battery chemistry'); }
      }

      // Connectivity
      const comm = String(specs['Communication'] || specs['Connectivity'] || '').toLowerCase();
      const allText = (product.features || []).join(' ').toLowerCase() + ' ' + comm;
      if (connectivity !== 'not_sure') {
        if (connectivity === 'wifi_4g' && /(wifi|4g|app)/.test(allText)) { score += 10; reasons.push('Remote monitoring via app/WiFi/4G'); }
        if (connectivity === 'rs485_can' && /(rs485|can)/.test(allText)) { score += 10; reasons.push('Industrial RS485/CAN communication'); }
        if (connectivity === 'bluetooth' && allText.includes('bluetooth')) { score += 8; reasons.push('Bluetooth monitoring support'); }
      } else {
        if (/(rs485|can)/.test(allText)) { score += 6; reasons.push('Easy inverter integration'); }
      }

      // Scalability
      const parallelText = String(specs['Parallel Support'] || '').toLowerCase();
      const designText = String(specs['Design'] || '').toLowerCase();
      const featureText = (product.features || []).join(' ').toLowerCase();
      if (scalability !== 'not_sure') {
        if (scalability === 'parallel' && (parallelText.includes('units') || featureText.includes('parallel'))) { score += 10; reasons.push('Supports parallel expansion'); }
        if (scalability === 'modular' && designText.includes('stackable')) { score += 12; reasons.push('Modular stackable design'); }
        if (scalability === 'single') { score += 4; reasons.push('Simple single-unit setup'); }
      } else {
        if (designText.includes('stackable')) { score += 6; reasons.push('Expandable design if needed'); }
      }

      // Environment
      const protection = String(specs['Protection Rating'] || '').toUpperCase();
      const envText = (product.description || '').toLowerCase();
      if (environment !== 'not_sure') {
        if (environment === 'indoor') { score += 4; reasons.push('Safe for indoor use'); }
        if (environment === 'outdoor' && /(IP54|IP65|IP66)/.test(protection)) { score += 8; reasons.push('Weather-resistant for outdoor'); }
        if (environment === 'harsh' && /(IP65|IP66)/.test(protection)) { score += 10; reasons.push('Built for harsh environments'); }
        if (environment === 'telecom_rack' && envText.includes('telecom')) { score += 12; reasons.push('Telecom-grade reliability'); }
      } else {
        if (/(IP54|IP65)/.test(protection)) { score += 6; reasons.push('Good protection rating'); }
      }

      // Budget alignment
      if (preferredBudget) {
        const [minB, maxB] = preferredBudget;
        if (product.price >= minB && product.price <= maxB) {
          score += 20;
          reasons.push('Fits your budget range');
        } else if (Math.abs(product.price - minB) <= 10000 || Math.abs(product.price - maxB) <= 10000) {
          score += 10;
          reasons.push('Close to your budget');
        }
      } else {
        // Friendly default: prefer mid-range for home
        if (segment === 'home' && product.price >= 80000 && product.price <= 100000) {
          score += 10;
          reasons.push('Great value for home systems');
        }
      }

      return {
        ...product,
        score,
        reasons: reasons.slice(0, 3)
      };
    };

    const scored = candidates.map(scoreProduct).sort((a, b) => b.score - a.score);

    return {
      primary: scored[0],
      alternatives: scored.slice(1, 3)
    };
  };

  const getAdditionalRecommendations = () => {
    // Accessory add-ons disabled for now to keep choices simple.
    return [];
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

  // Keep assistant visible on mobile; only hide on larger screens
  if (assistantsHidden) return null;

  return (
    <>
      {/* Always Visible Voice Assistant Bar */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`fixed ${isMobile ? 'right-2 stacked-mobile-ui' : 'bottom-4 right-4 sm:bottom-6 sm:right-6'} z-[100] ${isMobile ? 'max-w-[calc(100vw-1rem)]' : 'max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-3rem)]'}`}
      >
        <motion.div
          className={`relative bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-2xl shadow-2xl backdrop-blur-sm border border-white/20 transition-all duration-500 ${
            isOpen ? 'px-3 py-1.5' : 'px-5 py-3'
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
            animate={reducedMotion ? { background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.05), transparent)' } : {
              background: isListening 
                ? ['linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                   'linear-gradient(135deg, transparent, rgba(255,255,255,0.1), transparent)',
                   'linear-gradient(225deg, transparent, rgba(255,255,255,0.1), transparent)']
                : 'linear-gradient(45deg, transparent, rgba(255,255,255,0.05), transparent)'
            }}
            transition={{ duration: 2, repeat: reducedMotion ? 0 : Infinity }}
          />
          <div className="flex items-center space-x-2">
            {/* Voice Assistant Icon */}
            <motion.div
              className="relative flex items-center justify-center"
              animate={{
                scale: isListening ? [1, 1.1, 1] : 1,
                rotate: isListening ? [0, 5, -5, 0] : 0,
              }}
              transition={{
                duration: isListening ? 0.8 : 0.3,
                repeat: isListening && !reducedMotion ? Infinity : 0,
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
                  repeat: isListening && !reducedMotion ? Infinity : 0,
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
                    repeat: reducedMotion ? 0 : Infinity,
                    ease: "easeOut"
                  }}
                />
              )}
              
              {/* Icon container */}
              <motion.div
                className="relative z-10 p-1.5 rounded-full bg-white/10 backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mic className="h-4 w-4 drop-shadow-sm" />
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
                className="text-xs font-semibold truncate tracking-wide"
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
                  className="text-[10px] opacity-80 truncate font-medium"
                  animate={reducedMotion ? { opacity: 0.8 } : { opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: reducedMotion ? 0 : Infinity }}
                >
                  Get necessary advice!
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
                    className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group"
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
                      className={`p-2 rounded-xl backdrop-blur-sm border border-white/20 transition-all duration-300 group ${
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
                      className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group"
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
                      onClick={closeAssistant}
                      className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-red-500/30 transition-all duration-300 group"
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
            className={`fixed ${isMobile ? 'right-2 stacked-mobile-ui--modal' : 'bottom-16 right-4 sm:bottom-20 sm:right-6'} z-[99]`}
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 50 }}
          >
            <motion.div 
              className={`bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 rounded-3xl shadow-2xl ${isMobile ? 'w-[calc(100vw-1.5rem)] h-[62vh] max-h-[65vh]' : 'w-96 h-[500px]'} max-w-[calc(100vw-3rem)] max-h-[calc(100vh-8rem)] flex flex-col overflow-hidden border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm`}
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
                  animate={reducedMotion ? {
                    background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)'
                  } : {
                    background: [
                      'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                      'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                      'radial-gradient(circle at 50% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                      'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: reducedMotion ? 0 : Infinity }}
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
                        repeat: isListening && !reducedMotion ? Infinity : 0,
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
                          repeat: reducedMotion ? 0 : Infinity,
                          ease: "easeOut"
                        }}
                      />
                    )}
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.h3 
                      className="text-lg font-bold tracking-wide drop-shadow-sm"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      🤖 Zuice AI Assistant
                    </motion.h3>
                    <motion.p 
                      className="text-xs opacity-90 font-medium"
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
                        : '✨ Ready to find your perfect power solution'}
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
                    onClick={closeAssistant}
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
                          <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400">AI Assistant</span>
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
          className={`relative p-3 rounded-2xl shadow-sm backdrop-blur-sm border ${
            isAssistant
              ? message.type === 'choice' 
                ? 'bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 dark:from-emerald-900/30 dark:via-cyan-900/30 dark:to-blue-900/30 text-gray-800 dark:text-gray-200 border-emerald-200/70 dark:border-emerald-600/50 ring-2 ring-emerald-200/30 dark:ring-emerald-500/20'
                : 'bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-700 dark:via-gray-750 dark:to-gray-700 text-gray-800 dark:text-gray-200 border-gray-200/50 dark:border-gray-600/50'
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
          {/* Question indicator for choice questions */}
          {isAssistant && message.type === 'choice' && (
            <motion.div 
              className="flex items-center space-x-2 mb-3 pb-2 border-b border-emerald-200/50 dark:border-emerald-600/30"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-sm">
                <MessageCircle size={12} className="text-white" />
              </div>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">
                Question
              </span>
            </motion.div>
          )}

          {/* Message content */}
          <motion.p 
            className={`text-xs leading-relaxed ${
              isAssistant && message.type === 'choice' 
                ? 'font-medium text-gray-800 dark:text-gray-200' 
                : ''
            }`}
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
                  className="w-full p-2.5 text-left bg-white/80 dark:bg-gray-600/80 backdrop-blur-sm rounded-xl hover:bg-white dark:hover:bg-gray-500 transition-all duration-300 border border-gray-200/50 dark:border-gray-500/50 group/option"
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
                      <div className="font-medium text-xs text-gray-800 dark:text-gray-200 group-hover/option:text-emerald-600 dark:group-hover/option:text-emerald-400 transition-colors">
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
                  <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Alternative Options:
                  </h5>
                  {message.options.alternatives.map((product, index) => (
                    <div key={product.id} className="bg-white dark:bg-gray-600 rounded-lg p-3 border border-gray-200 dark:border-gray-500">
                      <div className="flex items-start space-x-3">
                        <Battery className="text-blue-500 mt-1" size={16} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h6 className="font-medium text-xs text-gray-800 dark:text-gray-200">
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
                  <h5 className="text-xs font-medium text-blue-800 dark:text-blue-200 mb-2">
                    Recommended Add-on:
                  </h5>
                  {message.options.additional.map((product) => (
                    <div key={product.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-blue-700 dark:text-blue-300">{product.name}</span>
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
