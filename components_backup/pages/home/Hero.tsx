import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ArrowRight, Palette, Users, ShoppingBag } from 'lucide-react';
import anime from 'animejs';

interface HeroProps {
  onNavigateToRegister: (role: string) => void;
  onNavigateToGallery: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateToRegister, onNavigateToGallery }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      
      // Anime.js animations
      if (heroRef.current) {
        // Animate floating dots
        anime({
          targets: '.floating-dot',
          translateY: [0, -20, 0],
          duration: 3000,
          easing: 'easeInOutSine',
          loop: true,
          delay: anime.stagger(500)
        });

        // Animate brush strokes
        anime({
          targets: '.brush-stroke',
          scaleX: [0, 1],
          duration: 2000,
          easing: 'easeOutExpo',
          delay: anime.stagger(200)
        });

        // Animate hero content with stagger
        anime({
          targets: '.hero-content > *',
          translateY: [50, 0],
          opacity: [0, 1],
          duration: 1000,
          easing: 'easeOutExpo',
          delay: anime.stagger(200, {start: 500})
        });

        // Animate feature cards
        anime({
          targets: '.feature-card',
          translateY: [30, 0],
          opacity: [0, 1],
          scale: [0.9, 1],
          duration: 800,
          easing: 'easeOutBack',
          delay: anime.stagger(150, {start: 1500})
        });
      }
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Hero-specific static background */}
      <div className="absolute inset-0 -z-10" ref={heroRef}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/80 via-pink-50/70 to-blue-100/80"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-cyan-100/60 via-transparent to-yellow-100/50"></div>
        
        {/* Animated brush strokes */}
        <div className="absolute inset-0">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="brush1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="currentColor" className="text-pink-400/40" />
                <stop offset="100%" stopColor="currentColor" className="text-purple-400/30" />
              </linearGradient>
              <linearGradient id="brush2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="currentColor" className="text-cyan-400/35" />
                <stop offset="100%" stopColor="currentColor" className="text-indigo-400/30" />
              </linearGradient>
            </defs>
            
            <path 
              className="brush-stroke"
              d="M0,100 Q300,50 600,120 T1200,80 L1200,0 L0,0 Z" 
              fill="url(#brush1)" 
              opacity="0.5"
              style={{ transformOrigin: 'left center' }}
            />
            
            <path 
              className="brush-stroke"
              d="M0,300 Q400,250 800,320 T1200,280 L1200,400 Q800,350 400,420 T0,380 Z" 
              fill="url(#brush2)" 
              opacity="0.4"
              style={{ transformOrigin: 'left center' }}
            />
          </svg>
        </div>
        
        {/* Animated floating dots */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`dot-${i}`}
            className={`floating-dot absolute w-${[2, 1.5, 2.5, 1.5][i % 4]} h-${[2, 1.5, 2.5, 1.5][i % 4]} rounded-full`}
            style={{
              background: ['rgb(251 191 36 / 0.8)', 'rgb(244 114 182 / 0.9)', 'rgb(56 189 248 / 0.7)', 'rgb(139 92 246 / 0.8)', 'rgb(34 197 94 / 0.6)', 'rgb(239 68 68 / 0.7)'][i],
              top: `${25 + i * 8}%`,
              left: `${20 + i * 15}%`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="hero-content max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            variants={itemVariants}
          >
            Discover <span className="text-amber-500">Unique Art</span> from <br className="hidden lg:block" />
            <span className="relative inline-block">
              <span className="relative z-10">Talented Artists</span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-amber-200/40 -z-0"></span>
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-stone-600 mb-10 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Explore a curated collection of original artwork from independent artists worldwide. 
            Find the perfect piece that speaks to you and support creative talent directly.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
            variants={itemVariants}
          >
            <button 
              onClick={() => onNavigateToRegister('')}
              className="animated-button px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-full hover:opacity-90 transition-opacity duration-200 flex items-center justify-center space-x-2 group"
              onMouseEnter={(e) => {
                anime({
                  targets: e.currentTarget,
                  scale: 1.05,
                  duration: 200,
                  easing: 'easeOutQuad'
                });
              }}
              onMouseLeave={(e) => {
                anime({
                  targets: e.currentTarget,
                  scale: 1,
                  duration: 200,
                  easing: 'easeOutQuad'
                });
              }}
            >
              <span>Start Exploring</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onNavigateToGallery}
              className="animated-button px-8 py-4 bg-white text-stone-800 border-2 border-stone-200 font-medium rounded-full hover:bg-stone-50 transition-colors duration-200 flex items-center justify-center space-x-2 group"
              onMouseEnter={(e) => {
                anime({
                  targets: e.currentTarget,
                  scale: 1.05,
                  duration: 200,
                  easing: 'easeOutQuad'
                });
              }}
              onMouseLeave={(e) => {
                anime({
                  targets: e.currentTarget,
                  scale: 1,
                  duration: 200,
                  easing: 'easeOutQuad'
                });
              }}
            >
              <span>View Gallery</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-3 gap-6 max-w-4xl mx-auto mt-16"
            variants={itemVariants}
          >
            {[
              { icon: <Palette className="w-8 h-8 text-amber-500" />, label: '10,000+ Artworks' },
              { icon: <Users className="w-8 h-8 text-amber-500" />, label: '2,000+ Artists' },
              { icon: <ShoppingBag className="w-8 h-8 text-amber-500" />, label: 'Secure Checkout' },
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="feature-card bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
                whileHover={{ y: -5 }}
                onMouseEnter={(e) => {
                  anime({
                    targets: e.currentTarget,
                    scale: 1.05,
                    rotateY: 5,
                    duration: 300,
                    easing: 'easeOutQuad'
                  });
                }}
                onMouseLeave={(e) => {
                  anime({
                    targets: e.currentTarget,
                    scale: 1,
                    rotateY: 0,
                    duration: 300,
                    easing: 'easeOutQuad'
                  });
                }}
              >
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  {item.icon}
                </div>
                <p className="text-stone-700 font-medium">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent -z-0"></div>
    </section>
  );
};

export default Hero;
