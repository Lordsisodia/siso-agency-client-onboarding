
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, ArrowUpRight } from 'lucide-react';
import { GradientHeading } from '@/components/ui/gradient-heading';

interface OnboardingWelcomeProps {
  onNext: () => void;
  onSkip: () => void;
}

export function OnboardingWelcome({ onNext, onSkip }: OnboardingWelcomeProps) {
  // Particle animation effect
  useEffect(() => {
    const canvas = document.getElementById('particles') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: {
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;
      glow: number;
    }[] = [];
    
    const colors = ['#FF5722', '#FFA000', '#FFD54F', '#FF9E80'];
    
    // Create more particles and with varying sizes
    for (let i = 0; i < 80; i++) {
      const radius = Math.random() * 3 + 0.5;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 0.6 - 0.3,
        speedY: Math.random() * 0.6 - 0.3,
        glow: Math.random() * 10 + 5
      });
    }
    
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY;
        }
        
        // Add glow effect
        ctx.shadowBlur = particle.glow;
        ctx.shadowColor = particle.color;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = 0.7;
        ctx.fill();
      });
    };
    
    const animationFrame = requestAnimationFrame(animate);
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50, damping: 10 } }
  };
  
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative flex flex-col items-center justify-center py-16 text-center overflow-hidden"
    >
      <canvas 
        id="particles" 
        className="absolute inset-0 w-full h-full pointer-events-none" 
      />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.7, 
          type: "spring",
          stiffness: 100 
        }}
        className="relative z-10 w-28 h-28 rounded-full bg-gradient-to-r from-siso-red to-siso-orange flex items-center justify-center shadow-[0_0_30px_rgba(255,87,34,0.5)] mb-8"
      >
        <motion.div
          animate={{ 
            boxShadow: ["0 0 20px rgba(255,87,34,0.5)", "0 0 40px rgba(255,87,34,0.7)", "0 0 20px rgba(255,87,34,0.5)"]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-full opacity-70 blur-[10px]"
        />
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-siso-orange to-siso-red opacity-70 blur-[10px]"
        />
        <motion.div
          animate={{ 
            rotate: -360,
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="relative z-20 w-full h-full flex items-center justify-center"
        >
          <Sparkles className="w-14 h-14 text-white drop-shadow-lg" />
        </motion.div>
      </motion.div>
      
      <motion.div variants={item} className="relative z-10 mb-6">
        <GradientHeading 
          variant="rainbow" 
          size="xl" 
          className="mb-0 text-4xl font-bold"
        >
          Let's Plan Your Project
        </GradientHeading>
      </motion.div>
      
      <motion.p
        variants={item}
        className="relative z-10 text-lg text-muted-foreground mb-10 max-w-lg px-4 leading-relaxed"
      >
        Answer a few questions to help us create the perfect project plan tailored specifically for you. 
        It'll only take a few minutes and will make your experience much more personalized.
      </motion.p>
      
      <motion.div variants={item} className="relative z-10 flex flex-col sm:flex-row gap-4">
        <motion.div
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          whileTap={{ y: 0, transition: { duration: 0.2 } }}
        >
          <Button
            variant="outline"
            onClick={onSkip}
            className="border-siso-border text-siso-text hover:bg-siso-bg-alt hover:border-siso-orange/50 transition-all duration-300 group"
          >
            Skip to AI Chat
            <motion.span
              initial={{ x: 0 }}
              animate={{ x: 0 }}
              className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.span>
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ y: -3, scale: 1.02, transition: { duration: 0.2 } }}
          whileTap={{ y: 0, scale: 0.98, transition: { duration: 0.1 } }}
        >
          <Button
            onClick={onNext}
            className="bg-gradient-to-r from-siso-red to-siso-orange hover:opacity-90 text-white shadow-lg relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  ease: "easeInOut" 
                }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </span>
            <motion.div 
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
          </Button>
        </motion.div>
      </motion.div>
      
      {/* Floating animated elements for decoration */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-gradient-to-r from-siso-red to-siso-orange opacity-40 z-0 blur-sm"
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 0.5
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-siso-orange opacity-30 z-0 blur-sm"
        animate={{ 
          y: [0, 30, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute top-1/2 right-1/3 w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-siso-red opacity-20 z-0 blur-sm"
        animate={{ 
          y: [0, -15, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ 
          duration: 3.5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 1
        }}
      />
    </motion.div>
  );
}
