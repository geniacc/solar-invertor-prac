import React from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Shield, 
  Leaf, 
  Award,
  Battery,
  Sun,
  TrendingUp,
  Users,
  Star,
  Target,
  Heart,
  Lightbulb,
  Rocket,
  Globe
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'

const AboutPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation First',
      description: 'We believe in pushing the boundaries of solar technology to create smarter, more efficient solutions.'
    },
    {
      icon: Heart,
      title: 'Customer Focused',
      description: 'Every product we design starts with understanding our customers\' real-world energy needs.'
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Our mission is to make clean energy accessible and affordable for everyone.'
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'We never compromise on quality - every Zuice MU1000 unit undergoes rigorous testing.'
    }
  ]

  const milestones = [
    {
      year: '2024',
      title: 'Startup Founded',
      description: 'Launched our startup with a bold vision to revolutionize indoor solar power solutions for modern homes and offices'
    },
    {
      year: '2024',
      title: 'Zuice MU1000 Innovation',
      description: 'As a startup, we developed our flagship Zuice MU1000 1KVA-12V PWM Solar Hybrid PCU with advanced LiFePo4 battery technology'
    },
    {
      year: '2024',
      title: 'Market Entry',
      description: 'Successfully launched the Zuice MU1000 as our first commercial product, establishing our startup presence in the solar industry'
    },
    {
      year: 'Future',
      title: 'Startup Growth',
      description: 'Scaling our startup operations to expand the Zuice MU1000 product line and reach customers nationwide'
    }
  ]

  const team = [
    {
      name: 'Engineering Team',
      role: 'Product Development',
      description: 'Passionate engineers working on next-generation solar technology'
    },
    {
      name: 'Quality Team',
      role: 'Testing & Assurance',
      description: 'Ensuring every product meets our high standards'
    },
    {
      name: 'Support Team',
      role: 'Customer Success',
      description: 'Dedicated to helping customers get the most from their solar investment'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-900/20 via-background to-purple-900/10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            {...fadeInUp}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full mb-8"
            >
              <Sun className="h-10 w-10 text-white" />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Powering Tomorrow, Today
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We're a passionate startup on a mission to make clean, reliable solar energy 
              accessible to every home and small office. Our journey began with a simple 
              belief: everyone deserves affordable, sustainable power.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800">
                <Rocket className="mr-2 h-5 w-5" />
                Our Story
              </Button>
              <Button variant="outline" size="lg">
                <Users className="mr-2 h-5 w-5" />
                Meet the Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground">
                From idea to innovation - how we're changing the solar landscape
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="prose prose-lg max-w-none text-muted-foreground">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">The Beginning</h3>
                  <p className="mb-6">
                    Founded in 2024, we started as a passionate startup team of engineers and renewable energy 
                    innovators who identified a critical gap in the market for reliable, indoor solar power solutions. 
                    As a young company, we noticed that while solar technology was advancing rapidly, most products were 
                    either too complex, expensive, or not suitable for indoor residential and small office applications.
                  </p>
                  
                  <h3 className="text-2xl font-semibold text-foreground mb-4">Our Startup Mission</h3>
                  <p>
                    As an emerging startup, we set out to revolutionize the solar industry with the Zuice MU1000 - 
                    a compact, efficient, and user-friendly 1KVA-12V PWM Solar Hybrid PCU with inbuilt LiFePo4 battery 
                    that could seamlessly integrate into homes and small offices. Our startup goal was ambitious yet simple: 
                    democratize solar power by making it accessible, reliable, and affordable for everyone.
                  </p>
                </div>
                
                <div className="relative">
                  <Card className="bg-gradient-to-br from-purple-500/10 to-purple-700/10 border-purple-500/20">
                    <CardContent className="p-8">
                      <div className="text-center">
                        <Battery className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                        <h4 className="text-xl font-semibold mb-2">Zuice MU1000 Solar Hybrid PCU</h4>
                        <p className="text-muted-foreground mb-4">
                          Our flagship product - designed for the modern world
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="font-semibold text-purple-500">1KVA</div>
                            <div className="text-muted-foreground">Power Rating</div>
                          </div>
                          <div>
                            <div className="font-semibold text-purple-500">LiFePo4</div>
                            <div className="text-muted-foreground">Battery Tech</div>
                          </div>
                          <div>
                            <div className="font-semibold text-purple-500">660Wp</div>
                            <div className="text-muted-foreground">Solar Array</div>
                          </div>
                          <div>
                            <div className="font-semibold text-purple-500">Indoor</div>
                            <div className="text-muted-foreground">Installation</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do as we build the future of solar energy
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardContent className="p-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full mb-6">
                        <value.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Journey</h2>
              <p className="text-lg text-muted-foreground">
                Key milestones in our mission to revolutionize solar energy
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-purple-700"></div>
                
                {milestones.map((milestone, index) => (
                  <motion.div 
                    key={index} 
                    variants={fadeInUp}
                    className="relative flex items-start mb-12 last:mb-0"
                  >
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                      {milestone.year}
                    </div>
                    <div className="ml-8 flex-1">
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                          <p className="text-muted-foreground">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Team</h2>
              <p className="text-lg text-muted-foreground">
                Meet the passionate people behind the Zuice MU1000
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="text-center hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <Users className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                      <p className="text-purple-500 font-medium mb-4">{member.role}</p>
                      <p className="text-muted-foreground text-sm">{member.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/20 to-purple-700/20">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            {...fadeInUp}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Us on This Journey
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're just getting started. Be part of the solar revolution and help us 
              create a more sustainable future, one home at a time.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800">
                <Globe className="mr-2 h-5 w-5" />
                Explore Zuice MU1000
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="mr-2 h-5 w-5" />
                Get in Touch
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage