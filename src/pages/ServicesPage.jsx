import React, { useState, useEffect, lazy, Suspense } from 'react'
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

const TestimonialsSection = lazy(() => import('../components/TestimonialsSection'))

const ServicesPage = () => {
  const [activeService, setActiveService] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { isMobile, isTablet, mobileLite } = useResponsive();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const SERVICE_COUNT = services.length;
      const interval = setInterval(() => {
        setActiveService((prev) => (prev + 1) % SERVICE_COUNT);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const services = [
    {
      id: 1,
      icon: <Wrench className={isMobile ? "h-8 w-8" : "h-12 w-12"} />,
      title: "ESS Installation",
      description: "Professional installation of your 12.8V 100AH Home ESS with complete setup and testing",
      features: [
        "Site assessment and planning",
        "Professional mounting and wiring",
        "Battery management system configuration",
        "Power system integration",
        "Display setup and calibration",
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
      description: "Comprehensive warranty extension for your ESS system with priority support",
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
      description: "Regular maintenance and technical support to keep your ESS system running optimally",
      features: [
        "Quarterly system health checks",
        "Battery performance optimization",
        "BMS system inspection and calibration",
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
      description: "Upgrade your existing ESS system with additional capacity or features",
      features: [
        "Battery capacity upgrades (100Ah to 200Ah)",
        "Additional battery module integration",
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
      comment: "Excellent installation service! The team was professional and the ESS system has been working flawlessly for 6 months.",
      service: "Installation"
    },
    {
      name: "Priya Sharma",
      location: "Delhi",
      rating: 5,
      comment: "The maintenance service is top-notch. They keep my ESS system running at peak efficiency.",
      service: "Maintenance"
    },
    {
      name: "Amit Patel",
      location: "Bangalore",
      rating: 5,
      comment: "Upgraded from 100Ah to 200Ah battery. The process was smooth and now I get extended backup time.",
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
      <section className={`section-padding mobile-section-ultra-tight relative ${mobileLite ? 'bg-background' : 'bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900'} text-white overflow-hidden`}>
        <div className="container mx-auto px-4 safe-area-x">
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
              className={`inline-flex items-center justify-center ${mobileLite ? 'bg-white/10' : 'bg-gradient-to-br from-purple-500 to-purple-700'} rounded-full mb-8 ${
                isMobile ? 'w-16 h-16' : 'w-20 h-20'
              }`}
            >
              <Settings className={`text-white ${isMobile ? 'h-7 w-7' : 'h-10 w-10'}`} />
            </motion.div>
            
            <h1 className={`font-bold text-foreground mb-6 ${
              isMobile ? (mobileLite ? 'text-3xl leading-tight' : 'text-4xl leading-tight') : isTablet ? 'text-4xl' : 'text-4xl lg:text-6xl'
            }`}>
              Zuice 
              {mobileLite ? (
                <span className="block text-white/90">Services & Support</span>
              ) : (
                <span className="block bg-gradient-to-r from-purple-400 via-purple-500 to-pink-600 bg-clip-text text-transparent">
                  Services & Support
                </span>
              )}
            </h1>
            
            <p className={`text-muted-foreground ${
              isMobile ? 'text-lg leading-snug' : 'text-xl leading-relaxed'
            } mb-8`}>
              Comprehensive services for your ESS system - from professional installation 
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

      {/* Mobile-lite: hide stats on touch mobile */}
      {!mobileLite && (
      <section className={`section-padding mobile-section-tight bg-gradient-to-r from-purple-500/10 to-purple-700/10`}>
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
      )}

      {/* Services Grid */}
      <section className={`section-padding`}>
        <div className="container mx-auto px-4 safe-area-x">
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
              Professional services designed specifically for your ESS system
            </p>
          </motion.div>

          <div className={`grid gap-4 sm:gap-8 ${
            isMobile ? 'grid-cols-2' : isTablet ? 'grid-cols-2' : 'lg:grid-cols-2'
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
                        className="tap-target bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
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

      {/* Mobile-lite: hide testimonials on touch mobile */}
      {!mobileLite && (
        <Suspense fallback={<div className="section-padding text-center text-muted-foreground">Loading testimonials...</div>}>
          <TestimonialsSection isMobile={isMobile} isTablet={isTablet} testimonials={testimonials} />
        </Suspense>
      )}

      {/* CTA Section */}
      <section className={`section-padding bg-gradient-to-r from-purple-500 to-purple-700`}>
        <div className="container mx-auto px-4 safe-area-x text-center">
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
              Contact our expert team for professional ESS system services and support
            </p>
            <div className={`flex gap-4 justify-center ${
              isMobile ? 'flex-col items-center' : 'flex-col sm:flex-row'
            }`}>
              <Button size={isMobile ? "default" : "lg"} variant="secondary" className="tap-target">
                Schedule Service
                <Clock className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size={isMobile ? "default" : "lg"} 
                variant="outline" 
                className="tap-target border-white text-white hover:bg-white hover:text-purple-700"
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