import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Wrench, 
  Shield, 
  Phone, 
  Clock, 
  CheckCircle, 
  Star,
  Users,
  Zap,
  Battery,
  Sun,
  Settings,
  Award,
  ArrowRight
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'

const ServicesPage = () => {
  const [activeService, setActiveService] = useState(0)

  const services = [
    {
      id: 1,
      icon: <Wrench className="h-12 w-12" />,
      title: "Zuice MU1000 Installation",
      description: "Professional installation of your Zuice MU1000 Solar Hybrid PCU with complete setup and testing",
      features: [
        "Site assessment and planning",
        "Professional mounting and wiring",
        "Solar panel array configuration (up to 660Wp)",
        "Battery system integration",
        "LCD display setup and calibration",
        "System testing and commissioning"
      ],
      price: "₹5,000",
      duration: "4-6 hours",
      color: "from-purple-500 to-purple-700"
    },
    {
      id: 2,
      icon: <Shield className="h-12 w-12" />,
      title: "Extended Warranty",
      description: "Comprehensive warranty extension for your Zuice MU1000 with priority support",
      features: [
        "Extended 5-year warranty coverage",
        "Free annual maintenance visits",
        "Priority technical support",
        "Replacement parts guarantee",
        "Performance monitoring",
        "24/7 emergency support"
      ],
      price: "₹8,000",
      duration: "5 years",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      icon: <Settings className="h-12 w-12" />,
      title: "Maintenance & Support",
      description: "Regular maintenance and technical support to keep your Zuice MU1000 running optimally",
      features: [
        "Quarterly system health checks",
        "Battery performance optimization",
        "Solar panel cleaning and inspection",
        "Firmware updates and upgrades",
        "Performance report generation",
        "Remote monitoring setup"
      ],
      price: "₹3,000/year",
      duration: "Ongoing",
      color: "from-blue-500 to-indigo-500"
    },
    {
      id: 4,
      icon: <Zap className="h-12 w-12" />,
      title: "System Upgrades",
      description: "Upgrade your existing Zuice MU1000 system with additional capacity or features",
      features: [
        "Battery capacity upgrades (50Ah to 100Ah)",
        "Additional solar panel integration",
        "Smart monitoring system installation",
        "Load management optimization",
        "Parallel system configuration",
        "IoT connectivity setup"
      ],
      price: "From ₹15,000",
      duration: "2-4 hours",
      color: "from-orange-500 to-red-500"
    }
  ]

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Mumbai",
      rating: 5,
      comment: "Excellent installation service! The team was professional and the Zuice MU1000 has been working flawlessly for 6 months.",
      service: "Installation"
    },
    {
      name: "Priya Sharma",
      location: "Delhi",
      rating: 5,
      comment: "The maintenance service is top-notch. They keep my Zuice MU1000 running at peak efficiency.",
      service: "Maintenance"
    },
    {
      name: "Amit Patel",
      location: "Bangalore",
      rating: 5,
      comment: "Upgraded from 50Ah to 100Ah battery. The process was smooth and now I get extended backup time.",
      service: "Upgrade"
    }
  ]

  const stats = [
    { number: "500+", label: "Installations Completed" },
    { number: "98%", label: "Customer Satisfaction" },
    { number: "24/7", label: "Support Available" },
    { number: "2 Years", label: "Standard Warranty" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

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
              <Settings className="h-10 w-10 text-white" />
            </motion.div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Zuice MU1000 
              <span className="block bg-gradient-to-r from-purple-400 via-purple-500 to-pink-600 bg-clip-text text-transparent">
                Services & Support
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Comprehensive services for your Zuice MU1000 Solar Hybrid PCU - from professional installation 
              to ongoing maintenance and technical support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800">
                Book Service
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Call Support: +91-9876543210
                <Phone className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-500/10 to-purple-700/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl lg:text-4xl font-bold text-purple-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
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
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional services designed specifically for your Zuice MU1000 Solar Hybrid PCU
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-purple-500/20">
                  <CardHeader>
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.color} rounded-full mb-4`}>
                      <div className="text-white">
                        {service.icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <div className="text-2xl font-bold text-purple-500">{service.price}</div>
                        <div className="text-sm text-muted-foreground">{service.duration}</div>
                      </div>
                      <Button className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800">
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-purple-900/10 via-background to-purple-900/5">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Real experiences from Zuice MU1000 users
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.comment}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                      </div>
                      <div className="text-xs bg-purple-500/10 text-purple-500 px-2 py-1 rounded">
                        {testimonial.service}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500 to-purple-700">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Contact our expert team for professional Zuice MU1000 services and support
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Schedule Service
                <Clock className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-700">
                Call Now: +91-9876543210
                <Phone className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage