import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Leaf, 
  Award,
  Battery,
  Sun,
  TrendingUp,
  Users,
  Star,
  Quote,
  CheckCircle,
  Phone,
  Mail
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import Footer from '../components/Footer'
import ThreeDGrid from '../components/ThreeDGrid'
import RollingGallery from '../components/RollingGallery'
import InteractivePricingCalculator from '../components/InteractivePricingCalculator'
import SolarPanelShowcase from '../components/SolarPanelShowcase'
import AnimatedStats from '../components/AnimatedStats'
import VoiceProductAssistant from '../components/VoiceProductAssistant'

const features = [
  {
    icon: Zap,
    title: 'High Performance',
    description: 'Up to 98% efficiency with advanced optimization technology'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Built-in protection and advanced monitoring systems'
  },
  {
    icon: Leaf,
    title: 'Sustainable Solutions',
    description: 'Reduce operational costs with intelligent automation'
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: '25-year warranty with industry-leading performance'
  }
]

const stats = [
  { label: 'Happy Customers', value: '50,000+', icon: Users },
  { label: 'Systems Deployed', value: '100K+', icon: Battery },
  { label: 'Cost Savings', value: '75M+', icon: Leaf },
  { label: 'Efficiency Rate', value: '98%', icon: TrendingUp }
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'IT Director',
    company: 'TechCorp Solutions',
    content: 'The enterprise solution has exceeded my expectations. Our operational efficiency improved by 80%!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Mike Chen',
    role: 'Business Owner',
    company: 'Green Energy Co.',
    content: 'Reliable, efficient, and great customer support. Highly recommend Zuice.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Emma Davis',
    role: 'Operations Manager',
    company: 'Sustainable Systems',
    content: 'Finally, a company that truly delivers on innovation and quality.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  }
]

const benefits = [
  'Free consultation and site assessment',
  '25-year comprehensive warranty',
  '24/7 monitoring and support',
  'Government incentive assistance',
  'Professional installation team',
  'Flexible financing options'
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Using enhanced version */}
      <HeroSection />

      <FeaturesSection />

      {/* Solar Panel Showcase Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold font-display">
              Premium Technology Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our cutting-edge enterprise systems with interactive 3D visualization and detailed specifications.
            </p>
          </motion.div>
          <SolarPanelShowcase />
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold font-display">
              Why Choose Zuice?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the perfect blend of innovation, reliability, and performance 
              with our industry-leading Zuice μ1000 Hybrid PCU solutions.
            </p>
          </motion.div>

          <ThreeDGrid />
        </div>
      </section>

      {/* Interactive Pricing Calculator */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold font-display">
              Calculate Your Technology Investment
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get an instant estimate for your enterprise system with our interactive pricing calculator.
            </p>
          </motion.div>
          <InteractivePricingCalculator />
        </div>
      </section>

      {/* Animated Stats Section */}
      <AnimatedStats />

      {/* Rolling Gallery Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold font-display">
              Our Technology Implementations
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See our premium technology solutions in action across different industries and environments.
            </p>
          </motion.div>
          <RollingGallery />
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="section-padding bg-gradient-to-br from-primary/5 to-purple-500/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="h-4 w-4" />
              <span>Customer Success Stories</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold font-display">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of satisfied customers who have transformed their energy future with Zuice.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="card-hover h-full relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-primary/20">
                    <Quote className="h-8 w-8" />
                  </div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        <div className="text-xs text-primary font-medium">{testimonial.company}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base italic leading-relaxed">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-8 bg-white/50 backdrop-blur-sm rounded-full px-8 py-4 border">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">5000+ Happy Customers</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">98% Satisfaction Rate</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">25 Year Warranty</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold font-display">
                  Complete Solar Solution Package
                </h2>
                <p className="text-xl text-muted-foreground">
                  Everything you need for a seamless transition to clean energy, backed by our comprehensive support.
                </p>
              </div>

              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/contact">
                  <Button size="lg" className="group">
                    Get Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="group">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now: (555) 123-4567
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-3xl p-8 flex items-center justify-center">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Sun className="h-12 w-12 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Start Saving Today</h3>
                    <p className="text-muted-foreground">
                      Join thousands of customers already saving with Zuice solar solutions
                    </p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-3xl font-bold text-green-600">$2,500+</div>
                    <div className="text-sm text-muted-foreground">Average Annual Savings</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary to-primary-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container-custom text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-4">
              <Zap className="h-4 w-4" />
              <span>Limited Time Offer</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold font-display">
              Ready to Transform Your Energy Future?
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Start your journey to energy independence today. Get a free consultation 
              and discover how much you can save with Zuice solar solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/products">
              <Button size="xl" variant="secondary" className="group">
                Browse Solar Solutions
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <Mail className="mr-2 h-5 w-5" />
                Get Free Quote
              </Button>
            </Link>
          </motion.div>

          {/* Urgency Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center space-x-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-4 py-2 text-sm"
          >
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <span>Free consultation ends soon - Book now!</span>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      
      {/* Voice Product Assistant */}
      <VoiceProductAssistant />

    </div>
  )
}