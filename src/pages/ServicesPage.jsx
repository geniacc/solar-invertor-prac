import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Wrench, 
  Shield, 
  Settings, 
  TrendingUp, 
  Star, 
  Clock, 
  DollarSign, 
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Users,
  Award,
  Zap,
  ArrowRight
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import LoadingSpinner from '../components/ui/Loading'
import { useResponsive } from '../hooks/useResponsive'

const ServicesPage = () => {
  const [activeService, setActiveService] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { isMobile, isTablet } = useResponsive();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        setActiveService((prev) => (prev + 1) % services.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const services = [
    {
      id: 1,
      icon: <Wrench className={isMobile ? "h-8 w-8" : "h-12 w-12"} />,
      title: "Zuice μ1000 Installation",
      description: "Professional installation of your Zuice μ1000 Hybrid PCU with complete setup and testing",
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
      icon: <Shield className={isMobile ? "h-8 w-8" : "h-12 w-12"} />,
      title: "Extended Warranty",
      description: "Comprehensive warranty extension for your Zuice μ1000 with priority support",
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
      icon: <Settings className={isMobile ? "h-8 w-8" : "h-12 w-12"} />,
      title: "Maintenance & Support",
      description: "Regular maintenance and technical support to keep your Zuice μ1000 running optimally",
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
      icon: <Zap className={isMobile ? "h-8 w-8" : "h-12 w-12"} />,
      title: "System Upgrades",
      description: "Upgrade your existing Zuice μ1000 system with additional capacity or features",
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
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Mumbai",
      rating: 5,
      comment: "Excellent installation service! The team was professional and the Zuice μ1000 has been working flawlessly for 6 months.",
      service: "Installation"
    },
    {
      name: "Priya Sharma",
      location: "Delhi",
      rating: 5,
      comment: "The maintenance service is top-notch. They keep my Zuice μ1000 running at peak efficiency.",
      service: "Maintenance"
    },
    {
      name: "Amit Patel",
      location: "Bangalore",
      rating: 5,
      comment: "Upgraded from 50Ah to 100Ah battery. The process was smooth and now I get extended backup time.",
      service: "Upgrade"
    }
  ];

  const stats = [
    { number: "500+", label: "Installations Completed" },
    { number: "98%", label: "Customer Satisfaction" },
    { number: "24/7", label: "Support Available" },
    { number: "2 Years", label: "Standard Warranty" }
  ];

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
              <Settings className={`text-white ${isMobile ? 'h-8 w-8' : 'h-10 w-10'}`} />
            </motion.div>
            
            <h1 className={`font-bold text-foreground mb-6 ${
              isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-4xl lg:text-6xl'
            }`}>
              Zuice μ1000 
              <span className="block bg-gradient-to-r from-purple-400 via-purple-500 to-pink-600 bg-clip-text text-transparent">
                Services & Support
              </span>
            </h1>
            
            <p className={`text-muted-foreground leading-relaxed mb-8 ${
              isMobile ? 'text-lg' : 'text-xl'
            }`}>
              Comprehensive services for your Zuice μ1000 Hybrid PCU - from professional installation 
              to ongoing maintenance and technical support.
            </p>

            <div className={`flex gap-4 justify-center ${
              isMobile ? 'flex-col items-center' : 'flex-col sm:flex-row'
            }`}>
              <Button size={isMobile ? "default" : "lg"} className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800">
                Book Service
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size={isMobile ? "default" : "lg"}>
                Call Support: +91-9876543210
                <Phone className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`bg-gradient-to-r from-purple-500/10 to-purple-700/10 ${
        isMobile ? 'py-12' : 'py-16'
      }`}>
        <div className="container mx-auto px-4">
          <div className={`grid gap-8 ${
            isMobile ? 'grid-cols-2' : isTablet ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'
          }`}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`font-bold text-purple-500 mb-2 ${
                  isMobile ? 'text-2xl' : 'text-3xl lg:text-4xl'
                }`}>
                  {stat.number}
                </div>
                <div className={`text-muted-foreground ${
                  isMobile ? 'text-sm' : 'text-base'
                }`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className={`${isMobile ? 'py-16' : 'py-20'}`}>
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
              Our Services
            </h2>
            <p className={`text-muted-foreground max-w-2xl mx-auto ${
              isMobile ? 'text-base' : 'text-xl'
            }`}>
              Professional services designed specifically for your Zuice μ1000 Hybrid PCU
            </p>
          </motion.div>

          <div className={`grid gap-8 ${
            isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-1' : 'lg:grid-cols-2'
          }`}>
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-purple-500/20">
                  <CardHeader className={isMobile ? 'p-4' : 'p-6'}>
                    <div className={`inline-flex items-center justify-center bg-gradient-to-r ${service.color} rounded-full mb-4 ${
                      isMobile ? 'w-12 h-12' : 'w-16 h-16'
                    }`}>
                      <div className="text-white">
                        {service.icon}
                      </div>
                    </div>
                    <CardTitle className={`mb-2 ${
                      isMobile ? 'text-lg' : 'text-xl'
                    }`}>{service.title}</CardTitle>
                    <CardDescription className={isMobile ? 'text-sm' : 'text-base'}>
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className={isMobile ? 'p-4 pt-0' : 'p-6 pt-0'}>
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className={`text-muted-foreground ${
                            isMobile ? 'text-xs' : 'text-sm'
                          }`}>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className={`flex items-center pt-4 border-t ${
                      isMobile ? 'flex-col gap-3' : 'justify-between'
                    }`}>
                      <div className={isMobile ? 'text-center' : ''}>
                        <div className={`font-bold text-purple-500 ${
                          isMobile ? 'text-xl' : 'text-2xl'
                        }`}>{service.price}</div>
                        <div className={`text-muted-foreground ${
                          isMobile ? 'text-xs' : 'text-sm'
                        }`}>{service.duration}</div>
                      </div>
                      <Button 
                        size={isMobile ? "sm" : "default"}
                        className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
                      >
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
      <section className={`bg-gradient-to-br from-purple-900/10 via-background to-purple-900/5 ${
        isMobile ? 'py-16' : 'py-20'
      }`}>
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
              What Our Customers Say
            </h2>
            <p className={`text-muted-foreground ${
              isMobile ? 'text-base' : 'text-xl'
            }`}>
              Real experiences from Zuice μ1000 users
            </p>
          </motion.div>

          <div className={`grid gap-8 ${
            isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'md:grid-cols-3'
          }`}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className={isMobile ? 'p-4' : 'p-6'}>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className={`text-muted-foreground mb-4 italic ${
                      isMobile ? 'text-sm' : 'text-base'
                    }`}>
                      "{testimonial.comment}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`font-semibold ${
                          isMobile ? 'text-sm' : 'text-base'
                        }`}>{testimonial.name}</div>
                        <div className={`text-muted-foreground ${
                          isMobile ? 'text-xs' : 'text-sm'
                        }`}>{testimonial.location}</div>
                      </div>
                      <div className={`bg-purple-500/10 text-purple-500 px-2 py-1 rounded ${
                        isMobile ? 'text-xs' : 'text-xs'
                      }`}>
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
      <section className={`bg-gradient-to-r from-purple-500 to-purple-700 ${
        isMobile ? 'py-16' : 'py-20'
      }`}>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className={`font-bold text-white mb-4 ${
              isMobile ? 'text-2xl' : 'text-3xl lg:text-4xl'
            }`}>
              Ready to Get Started?
            </h2>
            <p className={`text-purple-100 mb-8 max-w-2xl mx-auto ${
              isMobile ? 'text-base' : 'text-xl'
            }`}>
              Contact our expert team for professional Zuice μ1000 services and support
            </p>
            <div className={`flex gap-4 justify-center ${
              isMobile ? 'flex-col items-center' : 'flex-col sm:flex-row'
            }`}>
              <Button size={isMobile ? "default" : "lg"} variant="secondary">
                Schedule Service
                <Clock className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size={isMobile ? "default" : "lg"} 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-purple-700"
              >
                Call Now: +91-9876543210
                <Phone className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;