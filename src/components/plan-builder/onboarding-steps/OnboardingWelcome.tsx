
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
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
    }[] = [];
    
    const colors = ['#FF5722', '#FFA000', '#FFD54F'];
    
    for (let i = 0; i < 50; i++) {
      const radius = Math.random() * 2 + 0.5;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25
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
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = 0.6;
        ctx.fill();
      });
    };
    
    const animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  
  return (
    <div className="relative flex flex-col items-center justify-center py-16 text-center overflow-hidden">
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
        className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-r from-siso-red to-siso-orange flex items-center justify-center shadow-[0_0_25px_rgba(255,87,34,0.5)] mb-8"
      >
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
          <Sparkles className="w-12 h-12 text-white drop-shadow-lg" />
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative z-10 mb-6"
      >
        <GradientHeading 
          variant="rainbow" 
          size="lg" 
          className="mb-0"
        >
          Let's Plan Your Project
        </GradientHeading>
      </motion.div>
      
      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="relative z-10 text-lg text-muted-foreground mb-10 max-w-lg px-4"
      >
        Answer a few questions to help us create the perfect project plan tailored specifically for you. 
        It'll only take a few minutes and will make your experience much more personalized.
      </motion.p>
      
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="relative z-10 flex flex-col sm:flex-row gap-4"
      >
        <motion.div
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          whileTap={{ y: 0, transition: { duration: 0.2 } }}
        >
          <Button
            variant="outline"
            onClick={onSkip}
            className="border-siso-border text-siso-text hover:bg-siso-bg-alt hover:border-siso-orange/50 transition-all duration-300"
          >
            Skip to AI Chat
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
    </div>
  );
}
