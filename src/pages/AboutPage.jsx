import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Zap, 
  Battery, 
  Sun, 
  Shield, 
  Award, 
  Users, 
  Target, 
  Lightbulb,
  Leaf,
  TrendingUp,
  CheckCircle,
  Globe,
  Heart,
  Wrench,
  Star,
  ArrowRight,
  Phone,
  Mail,
  MapPin
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { LoadingSpinner } from '../components/ui/Loading'
import { useResponsive } from '../hooks/useResponsive'

const AboutPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isMobile, isTablet } = useResponsive();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        <motion.div 
          className="max-w-6xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            About Zuice
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Powering Tomorrow with 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"> Smart Energy</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Zuice is revolutionizing home and office energy solutions with our advanced energy storage technology, 
            making clean, reliable power accessible to everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() => navigate('/products')}
            >
              <Battery className="w-5 h-5 mr-2" />
              Our Products
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/contact')}
            >
              <Phone className="w-5 h-5 mr-2" />
              Contact Us
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Target className="w-4 h-4" />
                Our Mission
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Democratizing Clean Energy Access
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At Zuice, we believe that everyone deserves access to reliable, clean energy. Our mission is to make 
                energy storage solutions affordable, efficient, and easy to use for homes and businesses of all sizes.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Sustainable Innovation</h4>
                    <p className="text-gray-600">Developing cutting-edge energy storage technology for a greener future</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Affordable Solutions</h4>
                    <p className="text-gray-600">Making clean energy accessible without compromising on quality</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Customer First</h4>
                    <p className="text-gray-600">Putting our customers' energy needs at the heart of everything we do</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="relative">
              <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-8 text-white">
                <Sun className="w-16 h-16 mb-6 text-yellow-300" />
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-lg opacity-90 mb-6">
                  To become the leading provider of intelligent energy storage solutions, powering millions of homes 
                  and businesses with clean, reliable energy while contributing to a sustainable planet.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-yellow-300">1000+</div>
                    <div className="text-sm opacity-80">Happy Customers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-300">99.9%</div>
                    <div className="text-sm opacity-80">Uptime Reliability</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Our Values
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Drives Us Forward</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our core values shape every decision we make and every product we create
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Lightbulb,
                title: 'Innovation',
                description: 'Constantly pushing the boundaries of solar inverter technology to deliver smarter, more efficient solutions.',
                color: 'from-yellow-400 to-orange-500'
              },
              {
                icon: Shield,
                title: 'Reliability',
                description: 'Building products that our customers can depend on, with industry-leading quality and durability standards.',
                color: 'from-blue-400 to-blue-600'
              },
              {
                icon: Leaf,
                title: 'Sustainability',
                description: 'Committed to environmental responsibility and creating products that contribute to a cleaner planet.',
                color: 'from-green-400 to-green-600'
              },
              {
                icon: Users,
                title: 'Community',
                description: 'Building strong relationships with our customers, partners, and communities we serve.',
                color: 'from-purple-400 to-purple-600'
              }
            ].map((value, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-white">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${value.color} flex items-center justify-center`}>
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Product Focus */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Battery className="w-4 h-4" />
              Our Flagship Product
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">12.8V 100AH Home ESS</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our flagship lithium-ion energy storage system with advanced BMS technology for reliable home backup power
            </p>
          </motion.div>

          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">12.8V 100AH Home ESS</h3>
                    <p className="text-gray-600">Lithium-ion Energy Storage System</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Battery className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Advanced Lithium-ion Battery Technology</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sun className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-700">Smart BMS Protection System</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700">Built-in Safety Features</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Wrench className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-700">Easy Installation & Maintenance</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  onClick={() => navigate('/products')}
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Learn More About ESS
                </Button>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="w-6 h-6 text-yellow-500" />
                  <h4 className="text-lg font-semibold text-gray-900">Industry Leading Performance</h4>
                </div>
                <p className="text-gray-600">
                  Our Zuice solutions deliver exceptional efficiency and reliability, setting new standards 
                  in the energy storage industry with advanced lithium-ion technology.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="w-6 h-6 text-blue-500" />
                  <h4 className="text-lg font-semibold text-gray-900">Smart Monitoring</h4>
                </div>
                <p className="text-gray-600">
                  Real-time monitoring and intelligent power management ensure optimal performance 
                  and maximum energy savings for your home or office.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  <h4 className="text-lg font-semibold text-gray-900">Future Ready</h4>
                </div>
                <p className="text-gray-600">
                  Designed with scalability in mind, our Zuice solutions can grow with your energy needs 
                  and integrate seamlessly with future smart home technologies.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-600">
        <motion.div 
          className="max-w-4xl mx-auto text-center text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Power Your Future?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have made the switch to clean, reliable energy with Zuice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white text-purple-600 hover:bg-gray-100 border-white"
              onClick={() => navigate('/products')}
            >
              <Battery className="w-5 h-5 mr-2" />
              Explore Products
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-purple-600"
              onClick={() => navigate('/contact')}
            >
              <Phone className="w-5 h-5 mr-2" />
              Get Quote
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;