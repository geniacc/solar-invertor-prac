import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Sun, 
  Rocket, 
  Users, 
  Battery, 
  Globe, 
  Heart,
  Shield,
  Zap,
  Award,
  Target,
  Lightbulb,
  Leaf,
  TrendingUp
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { LoadingSpinner } from '../components/ui/Loading'
import { useResponsive } from '../hooks/useResponsive'

const AboutPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isMobile, isTablet } = useResponsive();

  useEffect(() => {
    // Simulate loading time for animations and content
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

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
        staggerChildren: 0.1
      }
    }
  };

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
      description: 'We never compromise on quality - every Zuice μ1000 unit undergoes rigorous testing.'
    }
  ];

  const milestones = [
    {
      icon: Rocket,
      title: 'Startup Founded',
      date: 'Q1 2024',
      description: 'Launched our startup with a bold vision to revolutionize indoor solar power solutions for modern homes and offices'
    },
    {
      icon: Lightbulb,
      title: 'Zuice μ1000 Innovation',
      date: 'Q2 2024',
      description: 'As a startup, we developed our flagship Zuice μ1000 1KVA-12V PWM Hybrid PCU with advanced LiFePo4 battery technology'
    },
    {
      icon: TrendingUp,
      title: 'Market Entry',
      date: 'Q3 2024',
      description: 'Successfully launched the Zuice μ1000 as our first commercial product, establishing our startup presence in the power industry'
    },
    {
      icon: Target,
      title: 'Startup Growth',
      date: '2025',
      description: 'Scaling our startup operations to expand the Zuice μ1000 product line and reach customers nationwide'
    }
  ];

  const team = [
    {
      name: 'Engineering Team',
      role: 'Product Development',
      bio: 'Passionate engineers working on next-generation solar technology'
    },
    {
      name: 'Quality Team',
      role: 'Testing & Assurance',
      bio: 'Ensuring every product meets our high standards'
    },
    {
      name: 'Support Team',
      role: 'Customer Success',
      bio: 'Dedicated to helping customers get the most from their solar investment'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-900/20 via-background to-purple-900/10">
        <div className="container mx-auto px-4">
          <motion.div 
            className={`text-center mx-auto ${isMobile ? 'max-w-2xl' : 'max-w-4xl'}`}
            {...fadeInUp}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`inline-flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-700 rounded-full mb-8 ${
                isMobile ? 'w-16 h-16' : 'w-20 h-20'
              }`}
            >
              <Sun className={`text-white ${isMobile ? 'h-8 w-8' : 'h-10 w-10'}`} />
            </motion.div>
            
            <h1 className={`font-bold mb-6 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent ${
              isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-4xl md:text-6xl'
            }`}>
              Powering Tomorrow, Today
            </h1>
            
            <p className={`text-muted-foreground mb-8 leading-relaxed ${
              isMobile ? 'text-lg' : 'text-xl'
            }`}>
              We're a passionate startup on a mission to make clean, reliable solar energy 
              accessible to every home and small office. Our journey began with a simple 
              belief: everyone deserves affordable, sustainable power.
            </p>
            
            <div className={`flex justify-center gap-4 ${
              isMobile ? 'flex-col items-center' : 'flex-wrap'
            }`}>
              <Button size={isMobile ? "default" : "lg"} className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800">
                <Rocket className="mr-2 h-5 w-5" />
                Our Story
              </Button>
              <Button variant="outline" size={isMobile ? "default" : "lg"}>
                <Users className="mr-2 h-5 w-5" />
                Meet the Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className={`${isMobile ? 'py-16' : 'py-20'}`}>
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className={`font-bold mb-6 ${
                isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'
              }`}>Our Story</h2>
              <p className={`text-muted-foreground ${
                isMobile ? 'text-base' : 'text-lg'
              }`}>
                From idea to innovation - how we're changing the solar landscape
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="prose prose-lg max-w-none text-muted-foreground">
              <div className={`grid gap-12 items-center ${
                isMobile ? 'grid-cols-1' : 'md:grid-cols-2'
              }`}>
                <div>
                  <h3 className={`font-semibold text-foreground mb-4 ${
                    isMobile ? 'text-xl' : 'text-2xl'
                  }`}>The Beginning</h3>
                  <p className="mb-6">
                    Founded in 2024, we started as a passionate startup team of engineers and renewable energy 
                    innovators who identified a critical gap in the market for reliable, indoor solar power solutions. 
                    As a young company, we noticed that while solar technology was advancing rapidly, most products were 
                    either too complex, expensive, or not suitable for indoor residential and small office applications.
                  </p>
                  
                  <h3 className={`font-semibold text-foreground mb-4 ${
                    isMobile ? 'text-xl' : 'text-2xl'
                  }`}>Our Startup Mission</h3>
                  <p>
                    As an emerging startup, we set out to revolutionize the power industry with the Zuice μ1000 - 
                    a compact, efficient, and user-friendly 1KVA-12V PWM Solar Hybrid PCU with inbuilt LiFePo4 battery 
                    that could seamlessly integrate into homes and small offices. Our startup goal was ambitious yet simple: 
                    democratize solar power by making it accessible, reliable, and affordable for everyone.
                  </p>
                </div>
                
                <div className="relative">
                  <Card className="bg-gradient-to-br from-purple-500/10 to-purple-700/10 border-purple-500/20">
                    <CardContent className={`${isMobile ? 'p-6' : 'p-8'}`}>
                      <div className="text-center">
                        <Battery className={`text-purple-500 mx-auto mb-4 ${
                          isMobile ? 'h-12 w-12' : 'h-16 w-16'
                        }`} />
                        <h4 className={`font-semibold mb-2 ${
                          isMobile ? 'text-lg' : 'text-xl'
                        }`}>Zuice μ1000 Hybrid PCU</h4>
                        <p className="text-muted-foreground mb-4">
                          Our flagship product - designed for the modern world
                        </p>
                        <div className={`grid gap-4 text-sm ${
                          isMobile ? 'grid-cols-1' : 'grid-cols-2'
                        }`}>
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
      <section className={`bg-muted/30 ${isMobile ? 'py-16' : 'py-20'}`}>
        <div className="container mx-auto px-4">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className={`font-bold mb-6 ${
                isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'
              }`}>Our Values</h2>
              <p className={`text-muted-foreground max-w-2xl mx-auto ${
                isMobile ? 'text-base' : 'text-lg'
              }`}>
                The principles that guide everything we do as we build the future of solar energy
              </p>
            </motion.div>

            <div className={`grid gap-8 ${
              isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-4'
            }`}>
              {values.map((value, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardContent className={`${isMobile ? 'p-6' : 'p-8'}`}>
                      <div className={`inline-flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-700 rounded-full mb-6 ${
                        isMobile ? 'w-12 h-12' : 'w-16 h-16'
                      }`}>
                        <value.icon className={`text-white ${
                          isMobile ? 'h-6 w-6' : 'h-8 w-8'
                        }`} />
                      </div>
                      <h3 className={`font-semibold mb-4 ${
                        isMobile ? 'text-lg' : 'text-xl'
                      }`}>{value.title}</h3>
                      <p className={`text-muted-foreground ${
                        isMobile ? 'text-sm' : 'text-base'
                      }`}>{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className={`${isMobile ? 'py-16' : 'py-20'}`}>
        <div className="container mx-auto px-4">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className={`font-bold mb-6 ${
                isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'
              }`}>Our Journey</h2>
              <p className={`text-muted-foreground max-w-2xl mx-auto ${
                isMobile ? 'text-base' : 'text-lg'
              }`}>
                Key milestones in our startup journey towards sustainable energy solutions
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className={`absolute bg-gradient-to-b from-purple-500 to-purple-700 ${
                isMobile ? 'left-4 w-0.5' : 'left-1/2 transform -translate-x-1/2 w-1'
              } h-full`}></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div 
                    key={index} 
                    variants={fadeInUp}
                    className={`relative flex items-center ${
                      isMobile ? 'ml-12' : index % 2 === 0 ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className={`absolute bg-gradient-to-br from-purple-500 to-purple-700 rounded-full border-4 border-background shadow-lg ${
                      isMobile ? '-left-14 w-8 h-8' : 'left-1/2 transform -translate-x-1/2 w-6 h-6'
                    }`}></div>
                    
                    <Card className={`hover:shadow-lg transition-all duration-300 ${
                      isMobile ? 'w-full' : index % 2 === 0 ? 'mr-8 w-5/12' : 'ml-8 w-5/12'
                    }`}>
                      <CardContent className={`${isMobile ? 'p-6' : 'p-8'}`}>
                        <div className={`flex items-center gap-4 mb-4 ${
                          isMobile ? 'flex-col text-center' : ''
                        }`}>
                          <div className={`bg-gradient-to-br from-purple-500 to-purple-700 rounded-full p-3 ${
                            isMobile ? 'w-12 h-12' : 'w-16 h-16'
                          } flex items-center justify-center`}>
                            <milestone.icon className={`text-white ${
                              isMobile ? 'h-6 w-6' : 'h-8 w-8'
                            }`} />
                          </div>
                          <div>
                            <h3 className={`font-semibold ${
                              isMobile ? 'text-lg' : 'text-xl'
                            }`}>{milestone.title}</h3>
                            <p className="text-purple-500 font-medium">{milestone.date}</p>
                          </div>
                        </div>
                        <p className={`text-muted-foreground ${
                          isMobile ? 'text-sm' : 'text-base'
                        }`}>{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`bg-muted/30 ${isMobile ? 'py-16' : 'py-20'}`}>
        <div className="container mx-auto px-4">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className={`font-bold mb-6 ${
                isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'
              }`}>Meet Our Team</h2>
              <p className={`text-muted-foreground max-w-2xl mx-auto ${
                isMobile ? 'text-base' : 'text-lg'
              }`}>
                The passionate innovators behind our solar revolution
              </p>
            </motion.div>

            <div className={`grid gap-8 ${
              isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {team.map((member, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                    <CardContent className={`${isMobile ? 'p-6' : 'p-8'}`}>
                      <div className={`relative mx-auto mb-6 ${
                        isMobile ? 'w-24 h-24' : 'w-32 h-32'
                      }`}>
                        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <User className={`text-white ${
                            isMobile ? 'h-12 w-12' : 'h-16 w-16'
                          }`} />
                        </div>
                      </div>
                      <h3 className={`font-semibold mb-2 ${
                        isMobile ? 'text-lg' : 'text-xl'
                      }`}>{member.name}</h3>
                      <p className="text-purple-500 font-medium mb-4">{member.role}</p>
                      <p className={`text-muted-foreground ${
                        isMobile ? 'text-sm' : 'text-base'
                      }`}>{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`${isMobile ? 'py-16' : 'py-20'}`}>
        <div className="container mx-auto px-4">
          <motion.div 
            className={`text-center mx-auto ${isMobile ? 'max-w-2xl' : 'max-w-4xl'}`}
            {...fadeInUp}
          >
            <h2 className={`font-bold mb-6 ${
              isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'
            }`}>Ready to Join Our Mission?</h2>
            <p className={`text-muted-foreground mb-8 ${
              isMobile ? 'text-base' : 'text-lg'
            }`}>
              Be part of the solar revolution. Whether you're looking for clean energy solutions 
              or want to join our growing team, we'd love to hear from you.
            </p>
            <div className={`flex justify-center gap-4 ${
              isMobile ? 'flex-col items-center' : 'flex-wrap'
            }`}>
              <Button size={isMobile ? "default" : "lg"} className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800">
                <Zap className="mr-2 h-5 w-5" />
                Get Started
              </Button>
              <Button variant="outline" size={isMobile ? "default" : "lg"}>
                <Mail className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage