import React, { lazy, Suspense } from 'react'
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
/* Reverting: remove temporary OurTechnologySection */
const ThreeDGridLazy = lazy(() => import('../components/ThreeDGrid'))
const CarouselLazy = lazy(() => import('../components/Carousel'))
const InteractivePricingCalculatorLazy = lazy(() => import('../components/InteractivePricingCalculator'))
const AnimatedStatsLazy = lazy(() => import('../components/AnimatedStats'))
const India3DMapLazy = lazy(() => import('../components/India3DMap'))
// Lazy-load testimonials for consistent code-splitting across pages
const TestimonialsSectionLazy = lazy(() => import('../components/TestimonialsSection'))
import { useResponsive } from '../hooks/useResponsive'

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
    content: 'Our ESS system has exceeded expectations. Energy efficiency improved by 80% with reliable backup power!',
    rating: 5,
    initials: 'SJ',
    bgColor: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Mike Chen',
    role: 'Business Owner',
    company: 'Green Energy Co.',
    content: 'The ESS technology is reliable, efficient, and comes with excellent customer support. Highly recommend!',
    rating: 5,
    initials: 'MC',
    bgColor: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Emma Davis',
    role: 'Operations Manager',
    company: 'Sustainable Systems',
    content: 'Finally, an ESS company that truly delivers on innovation and quality with real energy storage solutions.',
    rating: 5,
    initials: 'ED',
    bgColor: 'from-green-500 to-emerald-500'
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
  const { isMobile, isTablet, mobileLite } = useResponsive()
  return (
    <div className="min-h-screen">
      {/* Hero Section - Using enhanced version */}
      <HeroSection />

      <FeaturesSection />

      {/* Removed: Premium Technology Solutions section */}

      {/* Features Section (hidden on mobile) */}
      {!isMobile && (
        <section className="section-padding bg-muted/30">
          <div className="container-custom safe-area-x">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-center space-y-4 ${isMobile ? 'mb-8' : 'mb-16'}`}
            >
              <h2 className="text-3xl lg:text-5xl font-bold font-display">
                Why Choose Our Zuice Solutions?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience the perfect blend of innovation, reliability, and performance 
                with our industry-leading Energy Storage System solutions.
              </p>
            </motion.div>

            {/* Mobile-lite: hide heavy 3D grid on touch mobile */}
            {!mobileLite && (
              <Suspense fallback={<div style={{height: 280}} />}
              >
                <ThreeDGridLazy />
              </Suspense>
            )}
          </div>
        </section>
      )}

      {/* Interactive Pricing Calculator */}
      <section className="section-padding mobile-section-tight">
        <div className="container-custom safe-area-x">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-center space-y-4 ${isMobile ? 'mb-8' : 'mb-16'}`}
          >
            <h2 className="text-3xl lg:text-5xl font-bold font-display typo-h2-tight">
              Calculate Your Technology Investment
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto typo-lead-tight">
              Get an instant estimate for your enterprise system with our interactive pricing calculator.
            </p>
          </motion.div>
          <Suspense fallback={<div style={{height: 260}} />}
          >
            <InteractivePricingCalculatorLazy />
          </Suspense>
        </div>
      </section>

      {/* Mobile-lite: hide animated stats on touch mobile */}
      {!mobileLite && (
        <Suspense fallback={<div style={{height: 200}} />}
        >
          <AnimatedStatsLazy />
        </Suspense>
      )}

      {/* Our Technology Implementations - Carousel Section */}
      <section className="section-padding mobile-section-tight bg-muted/30">
        <div className="container-custom safe-area-x">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-center space-y-4 ${isMobile ? 'mb-8' : 'mb-16'}`}
          >
            <h2 className="text-3xl lg:text-5xl font-bold font-display typo-h2-tight">
              Our Technology Implementations
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto typo-lead-tight">
              See our premium technology solutions in action across different industries and environments.
            </p>
          </motion.div>
          {/* New Carousel replacing previous RollingGallery */}
          <Suspense fallback={<div style={{height: 320}} />}
          >
          <CarouselLazy
            slides={[
              {
                title: 'Premium Solar Solutions',
                button: 'Discover',
                src: '/images/hero section.jpg',
                to: '/products',
              },
              {
                title: 'Home ESS 12.8V 100AH',
                button: 'View Details',
                src: '/images/12.8v 100AH.png',
                to: '/products/home-ess-12v',
              },
              {
                title: 'Commercial ESS 25.6V 100AH',
                button: 'Explore Product',
                src: '/images/25.6v 100AH.png',
                to: '/products/home-ess-25v',
              },
              {
                title: 'Telecom ESS 48V 100AH',
                button: 'Learn More',
                src: '/images/48v 100AH background.jpg',
                to: '/products/telecom-48v-rack',
              },
            ]}
          />
          </Suspense>
        </div>
      </section>

      {/* India Map Section */}
      <section className="section-padding mobile-section-tight min-h-[70vh]">
        <div className="container-custom safe-area-x">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-center space-y-4 ${isMobile ? 'mb-8' : 'mb-12'}`}
          >
            <h2 className="text-3xl lg:text-5xl font-bold font-display">Our India Presence</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our service and manufacturing locations across the country.
            </p>
          </motion.div>
        </div>
        {/* Place globe outside container and center vertically/horizontally in the page space */}
        <div className="min-h-[70vh] flex items-center justify-center">
          <Suspense fallback={<div style={{width: '80vmin', height: '60vmin'}} />}
          >
            <India3DMapLazy />
          </Suspense>
        </div>
      </section>

      {/* Testimonials Section: visible on mobile */}
      (
      <section className="section-padding mobile-section-tight bg-gradient-to-br from-primary/5 to-purple-500/5">
        <div className="container-custom safe-area-x">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-center space-y-4 ${isMobile ? 'mb-8' : 'mb-16'}`}
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="h-4 w-4" />
              <span>Customer Success Stories</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold font-display typo-h2-tight">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto typo-lead-tight">
              Join thousands of satisfied customers who have transformed their energy future with our Zuice solutions.
            </p>
          </motion.div>

          <Suspense fallback={<div className="min-h-[200px]" />}>
            <TestimonialsSectionLazy
              testimonials={[
                {
                  rating: 5,
                  comment: 'Our ESS system has exceeded expectations. Energy efficiency improved by 80% with reliable backup power!',
                  name: 'Sarah Johnson',
                  location: 'TechCorp Solutions',
                  service: 'ESS Installation',
                  avatar: '/images/cutomer 1.jpg',
                },
                {
                  rating: 5,
                  comment: 'The ESS technology is reliable, efficient, and comes with excellent customer support. Highly recommend!',
                  name: 'Mike Chen',
                  location: 'Green Energy Co.',
                  service: 'Commercial ESS',
                  avatar: '/images/customer 2.jpg',
                },
                {
                  rating: 5,
                  comment: 'Finally, an ESS company that truly delivers on innovation and quality with real energy storage solutions.',
                  name: 'Emma Davis',
                  location: 'Sustainable Systems',
                  service: 'Home ESS',
                  avatar: '/images/customer 3.jpg',
                },
              ]}
            />
          </Suspense>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className={`${isMobile ? 'flex flex-wrap items-center justify-center gap-4 px-4 py-2 text-xs' : 'inline-flex items-center space-x-8 px-8 py-4'} bg-white/50 backdrop-blur-sm rounded-full border`}>
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
      )

      {/* Benefits Section */}
      <section className="section-padding mobile-section-tight">
        <div className="container-custom safe-area-x">
          <div className={`grid lg:grid-cols-2 items-center ${isMobile ? 'gap-6' : 'gap-12'}`}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold font-display typo-h2-tight">
                  Complete ESS Solution Package
                </h2>
                <p className="text-xl text-muted-foreground typo-lead-tight">
                  Everything you need for a seamless transition to clean energy storage, backed by our comprehensive support.
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
                  <Button size="lg" className="group tap-target">
                    Get Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="group tap-target">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now: (555) 123-4567
                </Button>
              </div>
            </motion.div>

            {/* Mobile-lite: hide decorative savings card on touch mobile */}
            {!mobileLite && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className={`aspect-square bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-3xl ${isMobile ? 'p-6' : 'p-8'} flex items-center justify-center`}>
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Sun className="h-12 w-12 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Start Saving Today</h3>
                    <p className="text-muted-foreground">
                      Join thousands of customers already saving with our Zuice solutions
                    </p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-3xl font-bold text-green-600">₹2,500+</div>
                    <div className="text-sm text-muted-foreground">Average Annual Savings</div>
                  </div>
                </div>
              </div>
            </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="section-padding mobile-section-tight bg-gradient-to-r from-primary to-primary-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container-custom safe-area-x text-center space-y-8 relative z-10">
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
            <h2 className="text-3xl lg:text-5xl font-bold font-display typo-h2-tight">
              Ready to Transform Your Energy Future?
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto typo-lead-tight">
              Start your journey to energy independence today. Get a free consultation 
              and discover how much you can save with our Zuice solutions.
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
              <Button size={isMobile ? 'lg' : 'xl'} variant="secondary" className="group tap-target">
                Browse Zuice Solutions
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size={isMobile ? 'lg' : 'xl'} variant="outline" className="tap-target border-white text-white hover:bg-white hover:text-primary">
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
      
      {/* Mobile-lite: hide voice assistant on touch mobile to keep UI clean */}
      {!mobileLite && (
        <Suspense fallback={<div style={{height: 160}} />}
        >
          <VoiceProductAssistantLazy />
        </Suspense>
      )}

    </div>
  )
}
