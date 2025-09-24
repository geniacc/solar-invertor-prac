import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Headphones,
  Shield,
  Zap,
  CheckCircle,
  User,
  MessageSquare
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    productModel: 'Zuice MU1000',
    inquiryType: 'general'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const contactMethods = [
    {
      icon: <Phone className="h-8 w-8" />,
      title: "Phone Support",
      description: "Speak directly with our Zuice MU1000 experts",
      contact: "+91-9876543210",
      availability: "Mon-Sat, 9 AM - 7 PM",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: "Email Support",
      description: "Get detailed technical assistance",
      contact: "support@zuicesolar.com",
      availability: "24/7 Response",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Live Chat",
      description: "Instant help with Zuice MU1000 queries",
      contact: "Chat Now",
      availability: "Online Now",
      color: "from-purple-500 to-purple-700"
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Technical Support",
      description: "Expert help for installation & maintenance",
      contact: "+91-9876543211",
      availability: "24/7 Emergency",
      color: "from-orange-500 to-red-500"
    }
  ]

  const officeLocations = [
    {
      city: "Mumbai",
      address: "123 Solar Street, Andheri East, Mumbai - 400069",
      phone: "+91-9876543210",
      email: "mumbai@zuicesolar.com"
    },
    {
      city: "Delhi",
      address: "456 Green Energy Plaza, Connaught Place, New Delhi - 110001",
      phone: "+91-9876543212",
      email: "delhi@zuicesolar.com"
    },
    {
      city: "Bangalore",
      address: "789 Tech Park, Electronic City, Bangalore - 560100",
      phone: "+91-9876543213",
      email: "bangalore@zuicesolar.com"
    }
  ]

  const faqItems = [
    {
      question: "How do I get technical support for my Zuice MU1000?",
      answer: "Call our 24/7 technical support line at +91-9876543211 or use the live chat feature for immediate assistance."
    },
    {
      question: "What's covered under Zuice MU1000 warranty?",
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
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-900/20 via-background to-purple-900/10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full mb-8"
            >
              <MessageSquare className="h-10 w-10 text-white" />
            </motion.div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Get in Touch
              <span className="block bg-gradient-to-r from-purple-400 via-purple-500 to-pink-600 bg-clip-text text-transparent">
                Zuice MU1000 Support
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Need help with your Zuice MU1000 Solar Hybrid PCU? Our expert team is here to assist you 
              with installation, maintenance, and technical support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How Can We Help?
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the best way to reach our Zuice MU1000 experts
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-purple-500/20">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${method.color} rounded-full mb-4`}>
                      <div className="text-white">
                        {method.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{method.description}</p>
                    <div className="space-y-2">
                      <div className="font-medium text-purple-500">{method.contact}</div>
                      <div className="text-xs text-muted-foreground">{method.availability}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gradient-to-br from-purple-900/10 via-background to-purple-900/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground">
                        Thank you for contacting us. We'll respond within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Name *</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="+91-9876543210"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Inquiry Type</label>
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
                            <option value="sales">Sales Inquiry</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Subject *</label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Brief description of your inquiry"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Message *</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={5}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Please provide details about your inquiry..."
                        />
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
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
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Our Locations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {officeLocations.map((location, index) => (
                    <div key={index} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                      <h4 className="font-semibold text-purple-500 mb-1">{location.city}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{location.address}</p>
                      <div className="flex flex-col gap-1 text-xs">
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
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {faqItems.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                      <h4 className="font-medium mb-2">{faq.question}</h4>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emergency Support */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Shield className="h-16 w-16 text-white mx-auto mb-4" />
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              24/7 Emergency Support
            </h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Experiencing issues with your Zuice MU1000? Our emergency support team is available round the clock
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Phone className="mr-2 h-4 w-4" />
                Emergency: +91-9876543211
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                <MessageCircle className="mr-2 h-4 w-4" />
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