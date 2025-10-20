import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  Shield,
  Headphones,
  Wrench,
  CreditCard
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import LoadingSpinner from '../components/ui/Loading'
import { useResponsive } from '../hooks/useResponsive'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    productModel: '12.8V 100AH Home ESS',
    inquiryType: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isMobile, isTablet } = useResponsive();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const contactMethods = [
    {
      icon: <Phone className={isMobile ? "h-6 w-6" : "h-8 w-8"} />,
      title: "Phone Support",
      description: "Speak directly with our ESS system experts",
      contact: "+91-9876543210",
      availability: "Mon-Sat, 9 AM - 7 PM",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Mail className={isMobile ? "h-6 w-6" : "h-8 w-8"} />,
      title: "Email Support",
      description: "Get detailed technical assistance",
      contact: "support@ess-solutions.com",
      availability: "24/7 Response",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: <MessageSquare className={isMobile ? "h-6 w-6" : "h-8 w-8"} />,
      title: "Live Chat",
      description: "Instant help with ESS system queries",
      contact: "Chat Now",
      availability: "Online Now",
      color: "from-purple-500 to-purple-700"
    },
    {
      icon: <Headphones className={isMobile ? "h-6 w-6" : "h-8 w-8"} />,
      title: "Technical Support",
      description: "Expert help for installation & maintenance",
      contact: "+91-9876543211",
      availability: "24/7 Emergency",
      color: "from-orange-500 to-red-500"
    }
  ];

  const officeLocations = [
    {
      city: "Mumbai",
      address: "123 Energy Storage Street, Andheri East, Mumbai - 400069",
      phone: "+91-9876543210",
      email: "mumbai@ess-solutions.com"
    },
    {
      city: "Delhi",
      address: "456 Green Energy Plaza, Connaught Place, New Delhi - 110001",
      phone: "+91-9876543212",
      email: "delhi@ess-solutions.com"
    },
    {
      city: "Bangalore",
      address: "789 Tech Park, Electronic City, Bangalore - 560100",
      phone: "+91-9876543213",
      email: "bangalore@ess-solutions.com"
    }
  ]

  const faqItems = [
    {
      question: "How do I get technical support for my ESS system?",
      answer: "Call our 24/7 technical support line at +91-9876543211 or use the live chat feature for immediate assistance."
    },
    {
      question: "What's covered under ESS system warranty?",
      answer: "Our 2-year warranty covers all manufacturing defects, battery performance, and electronic components. Extended warranty options are available."
    },
    {
      question: "How can I schedule installation service?",
      answer: "You can schedule installation through our website, call our support team, or visit any of our service centers."
    },
    {
      question: "Do you provide on-site maintenance?",
      answer: "Yes, we offer comprehensive on-site maintenance services including quarterly health checks and annual servicing."
    }
  ]

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className={`relative bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white overflow-hidden ${
        isMobile ? 'py-16' : 'py-20'
      }`}>
        <div className="container mx-auto px-4">
          <motion.div 
            className={`text-center mx-auto ${isMobile ? 'max-w-2xl' : 'max-w-4xl'}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`inline-flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-700 rounded-full mb-8 ${
                isMobile ? 'w-16 h-16' : 'w-20 h-20'
              }`}
            >
              <MessageSquare className={`text-white ${isMobile ? 'h-8 w-8' : 'h-10 w-10'}`} />
            </motion.div>
            
            <h1 className={`font-bold text-white mb-6 ${
              isMobile ? 'text-3xl' : 'text-4xl lg:text-6xl'
            }`}>
              Get in Touch
              <span className="block bg-gradient-to-r from-purple-200 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                Zuice Support
              </span>
            </h1>
            
            <p className={`text-purple-100 leading-relaxed mb-8 ${
              isMobile ? 'text-base' : 'text-xl'
            }`}>
              Need help with your ESS system? Our expert team is here to assist you 
              with installation, maintenance, and technical support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className={isMobile ? 'py-16' : 'py-20'}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className={`font-bold text-foreground mb-4 ${
              isMobile ? 'text-2xl' : 'text-3xl lg:text-4xl'
            }`}>
              How Can We Help?
            </h2>
            <p className={`text-muted-foreground ${
              isMobile ? 'text-base' : 'text-xl'
            }`}>
              Choose the best way to reach our ESS system experts
            </p>
          </motion.div>

          <div className={`grid gap-6 ${
            isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-4'
          }`}>
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-purple-500/20">
                  <CardContent className={isMobile ? 'p-4 text-center' : 'p-6 text-center'}>
                    <div className={`inline-flex items-center justify-center bg-gradient-to-r ${method.color} rounded-full mb-4 ${
                      isMobile ? 'w-12 h-12' : 'w-16 h-16'
                    }`}>
                      <div className="text-white">
                        {method.icon}
                      </div>
                    </div>
                    <h3 className={`font-semibold mb-2 ${
                      isMobile ? 'text-base' : 'text-lg'
                    }`}>{method.title}</h3>
                    <p className={`text-muted-foreground mb-4 ${
                      isMobile ? 'text-xs' : 'text-sm'
                    }`}>{method.description}</p>
                    <div className="space-y-2">
                      <div className={`font-medium text-purple-500 ${
                        isMobile ? 'text-sm' : 'text-base'
                      }`}>{method.contact}</div>
                      <div className={`text-muted-foreground ${
                        isMobile ? 'text-xs' : 'text-xs'
                      }`}>{method.availability}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className={`bg-gradient-to-br from-purple-900/10 via-background to-purple-900/5 ${
        isMobile ? 'py-16' : 'py-20'
      }`}>
        <div className="container mx-auto px-4">
          <div className={`grid gap-12 ${
            isMobile ? 'grid-cols-1' : 'lg:grid-cols-2'
          }`}>
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader className={isMobile ? 'p-4' : 'p-6'}>
                  <CardTitle className={isMobile ? 'text-xl' : 'text-2xl'}>Send us a Message</CardTitle>
                  <CardDescription className={isMobile ? 'text-sm' : 'text-base'}>
                    Fill out the form below and we'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent className={isMobile ? 'p-4 pt-0' : 'p-6 pt-0'}>
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle className={`text-green-500 mx-auto mb-4 ${
                        isMobile ? 'h-12 w-12' : 'h-16 w-16'
                      }`} />
                      <h3 className={`font-semibold mb-2 ${
                        isMobile ? 'text-lg' : 'text-xl'
                      }`}>Message Sent!</h3>
                      <p className={`text-muted-foreground ${
                        isMobile ? 'text-sm' : 'text-base'
                      }`}>
                        Thank you for contacting us. We'll respond within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className={`grid gap-4 ${
                        isMobile ? 'grid-cols-1' : 'md:grid-cols-2'
                      }`}>
                        <div>
                          <label className={`block font-medium mb-2 ${
                            isMobile ? 'text-xs' : 'text-sm'
                          }`}>Name *</label>
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Your full name"
                            className="focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className={`block font-medium mb-2 ${
                            isMobile ? 'text-xs' : 'text-sm'
                          }`}>Email *</label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="your@email.com"
                            className="focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      </div>

                      <div className={`grid gap-4 ${
                        isMobile ? 'grid-cols-1' : 'md:grid-cols-2'
                      }`}>
                        <div>
                          <label className={`block font-medium mb-2 ${
                            isMobile ? 'text-xs' : 'text-sm'
                          }`}>Phone</label>
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91-9876543210"
                            className="focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className={`block font-medium mb-2 ${
                            isMobile ? 'text-xs' : 'text-sm'
                          }`}>Inquiry Type</label>
                          <select
                            name="inquiryType"
                            value={formData.inquiryType}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="general">General Inquiry</option>
                            <option value="technical">Technical Support</option>
                            <option value="installation">Installation Service</option>
                            <option value="warranty">Warranty Claim</option>
                            <option value="rental">Rental Inquiry</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className={`block font-medium mb-2 ${
                          isMobile ? 'text-xs' : 'text-sm'
                        }`}>Subject *</label>
                        <Input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          placeholder="Brief description of your inquiry"
                          className="focus:ring-2 focus:ring-purple-500"
                        />
                      </div>

                      <div>
                        <label className={`block font-medium mb-2 ${
                          isMobile ? 'text-xs' : 'text-sm'
                        }`}>Message *</label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={isMobile ? 4 : 5}
                          placeholder="Please provide details about your inquiry..."
                          className="focus:ring-2 focus:ring-purple-500"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        size={isMobile ? "default" : "lg"}
                        className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Office Locations & FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Office Locations */}
              <Card>
                <CardHeader className={isMobile ? 'p-4' : 'p-6'}>
                  <CardTitle className={`flex items-center gap-2 ${
                    isMobile ? 'text-lg' : 'text-xl'
                  }`}>
                    <MapPin className="h-5 w-5" />
                    Our Locations
                  </CardTitle>
                </CardHeader>
                <CardContent className={`space-y-4 ${isMobile ? 'p-4 pt-0' : 'p-6 pt-0'}`}>
                  {officeLocations.map((location, index) => (
                    <div key={index} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                      <h4 className={`font-semibold text-purple-500 mb-1 ${
                        isMobile ? 'text-sm' : 'text-base'
                      }`}>{location.city}</h4>
                      <p className={`text-muted-foreground mb-2 ${
                        isMobile ? 'text-xs' : 'text-sm'
                      }`}>{location.address}</p>
                      <div className={`flex flex-col gap-1 ${
                        isMobile ? 'text-xs' : 'text-xs'
                      }`}>
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3" />
                          <span>{location.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3" />
                          <span>{location.email}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card>
                <CardHeader className={isMobile ? 'p-4' : 'p-6'}>
                  <CardTitle className={isMobile ? 'text-lg' : 'text-xl'}>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className={`space-y-4 ${isMobile ? 'p-4 pt-0' : 'p-6 pt-0'}`}>
                  {faqItems.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                      <h4 className={`font-medium mb-2 ${
                        isMobile ? 'text-sm' : 'text-base'
                      }`}>{faq.question}</h4>
                      <p className={`text-muted-foreground ${
                        isMobile ? 'text-xs' : 'text-sm'
                      }`}>{faq.answer}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emergency Support */}
      <section className={`bg-gradient-to-r from-red-500 to-orange-500 ${
        isMobile ? 'py-16' : 'py-20'
      }`}>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Shield className={`text-white mx-auto mb-4 ${
              isMobile ? 'h-12 w-12' : 'h-16 w-16'
            }`} />
            <h2 className={`font-bold text-white mb-4 ${
              isMobile ? 'text-2xl' : 'text-3xl lg:text-4xl'
            }`}>
              24/7 Emergency Support
            </h2>
            <p className={`text-red-100 mb-8 max-w-2xl mx-auto ${
              isMobile ? 'text-base' : 'text-xl'
            }`}>
              Experiencing issues with your ESS system? Our emergency support team is available round the clock
            </p>
            <div className={`flex gap-4 justify-center ${
              isMobile ? 'flex-col items-center' : 'flex-col sm:flex-row'
            }`}>
              <Button size={isMobile ? "default" : "lg"} variant="secondary">
                <Phone className="mr-2 h-4 w-4" />
                Emergency: +91-9876543211
              </Button>
              <Button 
                size={isMobile ? "default" : "lg"} 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-red-600"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Live Chat Support
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage