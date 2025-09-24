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
  Star
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
    content: 'The enterprise solution has exceeded my expectations. Our operational efficiency improved by 80%!',
    rating: 5
  },
  {
    name: 'Mike Chen',
    role: 'Business Owner',
    content: 'Reliable, efficient, and great customer support. Highly recommend Zuice Solar.',
    rating: 5
  },
  {
    name: 'Emma Davis',
    role: 'Operations Manager',
    content: 'Finally, a company that truly delivers on innovation and quality.',
    rating: 5
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Using older version */}
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
              Why Choose Zuice Solar?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the perfect blend of innovation, reliability, and performance 
              with our industry-leading Zuice MU1000 Solar Hybrid PCU solutions.
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

      {/* Testimonials Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold font-display">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of satisfied customers who have transformed their energy future.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card-hover h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardDescription className="text-base italic">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary to-primary-600 text-white">
        <div className="container-custom text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl lg:text-5xl font-bold font-display">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Start your journey to digital transformation today. Get a free consultation 
              and discover how much you can optimize your operations.
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
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Get Quote
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}