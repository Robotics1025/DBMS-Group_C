"use client"

import React from "react"
import BikeScene from "@/components/Bike"
import { Button } from "@/components/ui/button"
import { BikeIcon, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import WhatsAppWidget from "@/components/what'sapp"
import { Footer } from "@/components/footer"

const our_product = [
  {
    image: '/bike.jpg',
    title: 'MOUNTAIN BIKE',
    description: 'Mountain biking terrain commonly has rocks, roots, loose dirt, and steep grades.'
  },
  {
    image: '/bike2.jpg',
    title: 'CITY BIKE',
    description: 'Ride clean, ride smart. This eco-friendly bike combines comfort and efficiency — perfect for daily commutes or weekend escapes around the city.'
  },
  {
    image: '/bike3.jpg',
    title: 'SPORTY BIKE',
    description: 'Designed for speed and precision. With advanced suspension, lightweight build, and responsive brakes, this bike delivers top performance on any terrain.'
  }
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Miller",
    role: "Tourist",
    rating: 5,
    text: "Amazing service! The bikes are well-maintained and the pickup process was super smooth. Highly recommend for anyone wanting to explore the city."
  },
  {
    id: 2,
    name: "John Davis",
    role: "Local Commuter",
    rating: 5,
    text: "Perfect for my daily commute! Much cheaper than other transportation options and I get my exercise in too. The app makes booking so easy."
  },
  {
    id: 3,
    name: "Emily Wilson",
    role: "Weekend Explorer",
    rating: 5,
    text: "Great variety of bikes to choose from. I rented an electric bike for a weekend trip and it was fantastic. Will definitely use again!"
  },
  {
    id: 4,
    name: "Mike Johnson",
    role: "Business Traveler",
    rating: 5,
    text: "Convenient locations and reliable service. I use this whenever I'm traveling for business. Clean bikes and professional staff."
  },
  {
    id: 5,
    name: "Lisa Chen",
    role: "Fitness Enthusiast",
    rating: 5,
    text: "Love the variety of bikes available! From mountain bikes to electric ones, there's something for every adventure. Excellent maintenance too."
  }
];

function HeroSection() {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Rental", "Smart"];

  // Auto-flip words every 3 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.8,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  const wordFlipVariants = {
    enter: {
      rotateX: 0,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      rotateX: 90,
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-secondary/20 rounded-full blur-2xl animate-bounce"></div>
      
      <div className="container mx-auto px-4 sm:px-7 mb-12 lg:px-8 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Left side: Text */}
          <motion.div 
            className="w-full lg:w-1/2 text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            {/* Animated Title */}
            <div className="mb-6">
              <motion.h1 
                className="text-4xl sm:text-5xl font-extrabold text-foreground"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Welcome to the{" "}
                <span className="relative inline-block">
                  <span className="text-primary">Bike </span>
                  <div className="relative inline-block perspective-1000">
                    <motion.span
                      key={currentWord}
                      className="text-primary inline-block"
                      variants={wordFlipVariants}
                      initial="exit"
                      animate="enter"
                      exit="exit"
                      style={{ 
                        transformOrigin: "center bottom",
                        transformStyle: "preserve-3d"
                      }}
                    >
                      {words[currentWord]}
                    </motion.span>
                  </div>
                  <span className="text-primary"> System</span>
                </span>
              </motion.h1>
            </div>

            {/* Subtitle with staggered animation */}
            <motion.p 
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Rent bikes easily and explore the city at your own pace. Affordable rates, convenient locations, and a
              variety of bikes to choose from.
            </motion.p>

            {/* Animated Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
            >
              <motion.div variants={buttonVariants} whileHover="hover">
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300">
                    Get Started
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      →
                    </motion.span>
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={buttonVariants} whileHover="hover">
                <Link href="#features">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 hover:bg-primary/5 transition-all duration-300">
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats Section */}
            <motion.div 
              className="flex justify-center lg:justify-start gap-8 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="text-center">
                <motion.div 
                  className="text-2xl font-bold text-primary"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4, type: "spring" }}
                >
                  500+
                </motion.div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <motion.div 
                  className="text-2xl font-bold text-primary"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.6, type: "spring" }}
                >
                  50+
                </motion.div>
                <div className="text-sm text-muted-foreground">Bikes Available</div>
              </div>
              <div className="text-center">
                <motion.div 
                  className="text-2xl font-bold text-primary"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.8, type: "spring" }}
                >
                  10+
                </motion.div>
                <div className="text-sm text-muted-foreground">City Locations</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side: 3D Model with animations */}
          <motion.div 
            className="w-full lg:w-1/2 mb-10 lg:mb-0"
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Floating background elements */}
              <motion.div 
                className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full"
                animate={{ 
                  y: [-10, 10, -10],
                  x: [-5, 5, -5],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4,
                  ease: "easeInOut" 
                }}
              />
              <motion.div 
                className="absolute -bottom-6 -left-6 w-6 h-6 bg-secondary/30 rounded-full"
                animate={{ 
                  y: [10, -10, 10],
                  x: [5, -5, 5],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              
              {/* Main 3D Model Container */}
              <motion.div 
                className="h-80 w-full lg:h-96 relative"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl blur-xl opacity-50"></div>
                <BikeScene />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section 
      id="testimonials" 
      className="relative py-20 bg-cover bg-center bg-no-repeat bg-[url('/assets/images/cover/cover-7.webp')]"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Join thousands of satisfied customers who love our bike rental service
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            title="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextTestimonial}
            title="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonial Card */}
          <motion.div
            key={currentIndex}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Rating Stars */}
            <div className="flex justify-center items-center mb-6">
              <div className="flex text-yellow-400">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <motion.svg 
                    key={i} 
                    className="h-6 w-6 fill-current" 
                    viewBox="0 0 20 20"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-center text-lg text-white/90 mb-8 italic leading-relaxed">
              "{testimonials[currentIndex].text}"
            </blockquote>

            {/* Customer Info */}
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full flex items-center justify-center border-2 border-white/20">
                <span className="text-lg font-semibold text-white">
                  {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="text-center">
                <div className="font-semibold text-white text-lg">{testimonials[currentIndex].name}</div>
                <div className="text-sm text-white/70">{testimonials[currentIndex].role}</div>
              </div>
            </div>
          </motion.div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                title={`Go to testimonial ${index + 1}`}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <BikeIcon className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">BIKE RENTAL</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </a>
              <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
                Testimonials
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <HeroSection />
       <div className="flex items-center justify-center mb-12">
            <h1 className="text-3xl sm:text-5xl font-bold  text-center">
              Check out our top rented bikes
            </h1>
          </div>

      {/* sections - check out our top rented bikes */}
      <section id="features" className="py-10 bg-primary w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}

          {/* Product Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full ">
            {our_product.map((product, index) => (
              <motion.div
                key={product.title}
                className="relative group p-6 w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 cursor-pointer"
                initial={{ rotateY: 0, rotateX: 0, y: 0 }}
                whileHover={{
                  rotateY: 10,
                  rotateX: -5,
                  y: -10,
                  transition: { type: "spring", stiffness: 200, damping: 10 },
                }}
                whileTap={{
                  rotateY: 0,
                  rotateX: 0,
                  y: 0,
                  scale: 0.98,
                }}
              >
                {/* Floating animation */}
                <motion.div
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 3 + index * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-80 object-cover rounded-xl shadow-md group-hover:shadow-xl transition-all duration-300"
                  />
                </motion.div>

                {/* Text Content */}
                <div className="mt-4">
                  <h2 className="text-xl font-semibold text-white">
                    {product.title}
                  </h2>
                  <p className="text-white/80 mt-2">{product.description}</p>
                </div>

                {/* 3D Light Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-br from-primary/20 to-transparent blur-2xl"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
<section id="benefits" className="py-20">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left Side - Text Content */}
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
          Explore the City Like Never Before
        </h2>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
              <img src="/assets/icons/workspaces/logo-1.webp" alt="Eco Friendly" className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Eco-Friendly Transportation</h3>
              <p className="text-muted-foreground">Reduce your carbon footprint while exploring the city</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
              <img src="/assets/icons/fitness.png" alt="Health & Fitness" className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Health & Fitness</h3>
              <p className="text-muted-foreground">Stay active and healthy while getting around town</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
              <img src="/assets/icons/traffic_light.png" alt="Beat Traffic" className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Beat Traffic</h3>
              <p className="text-muted-foreground">Navigate through the city faster than cars during rush hour</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image + Stats Overlay */}
      <div className="relative">
        <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
          <img
            src="/bike3.jpg"
            alt="Explore the city on bike"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-6 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-xl px-6 py-4 shadow-lg">
            <div className="text-4xl font-bold text-primary mb-1">50+</div>
            <div className="text-sm text-muted-foreground">Bikes Available</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


      <TestimonialsCarousel />

      {/* footer */}
    <Footer/>

      {/* WhatsApp Widget */}
      <WhatsAppWidget />
    </div>
  )
}
