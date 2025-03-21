
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Rocket, MoveRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useNavigate } from "react-router-dom";
import { OnboardingStyles } from "@/components/plan-builder/components/OnboardingStyles";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const navigate = useNavigate();
  
  const titles = useMemo(
    () => ["Client-Winning AI Apps", "48-Hour MVP Magic", "Streamlined Agency Apps"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  const handleGetStarted = () => {
    console.log('Get Started clicked - navigating to /auth');
    try {
      navigate('/auth');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const handleTryAI = () => {
    console.log('Try AI clicked - navigating to /plan-builder');
    try {
      navigate('/plan-builder');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        delay: 0.8 
      }
    }
  };

  return (
    <div className="w-full relative z-10">
      <OnboardingStyles />
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex gap-8 py-16 lg:py-28 items-center justify-center flex-col"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="flex gap-6 flex-col items-center hero-content">
            <motion.h1 
              className="text-5xl md:text-7xl max-w-4xl tracking-tighter text-center font-regular"
              variants={itemVariants}
            >
              <span className="text-siso-text-bold whitespace-normal md:whitespace-nowrap">Grow your agency with</span>
              <div className="hero-title-container h-16 md:h-20 relative">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className={`hero-title absolute inset-0 flex justify-center font-semibold bg-gradient-to-r from-siso-red to-siso-orange bg-clip-text text-transparent ${
                      titleNumber === index ? "opacity-100" : "opacity-0"
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                      titleNumber === index
                        ? {
                            opacity: 1,
                            y: 0,
                          }
                        : {
                            opacity: 0,
                            y: titleNumber > index ? -30 : 30,
                          }
                    }
                    transition={{ 
                      type: "spring", 
                      stiffness: 100, 
                      damping: 15,
                      duration: 0.6
                    }}
                  >
                    {title}
                  </motion.span>
                ))}
              </div>
            </motion.h1>

            <motion.p 
              className="text-lg md:text-xl leading-relaxed tracking-tight text-siso-text max-w-2xl text-center mx-auto"
              variants={itemVariants}
            >
              From vision to MVP in 48-72 hours—trusted by 49+ agencies with 1,000+ developers in our network.
            </motion.p>
          </div>
          <motion.div 
            className="flex flex-row gap-4 hero-action-buttons"
            variants={buttonVariants}
          >
            <RainbowButton
              onClick={handleGetStarted}
              className="group flex items-center gap-2 text-base md:text-lg font-medium px-6 py-3"
            >
              <span>Build Your App Now</span>
              <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </RainbowButton>
            
            <Button 
              variant="outline"
              size="lg" 
              className="border-siso-text/20 hover:bg-siso-bg-alt hover:text-siso-text-bold transition-all text-base"
              onClick={handleTryAI}
            >
              Try AI Planner <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export { Hero };
