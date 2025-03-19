
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PhoneCall, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { OnboardingStyles } from "@/components/plan-builder/components/OnboardingStyles";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const navigate = useNavigate();
  
  const titles = useMemo(
    () => ["AI-Powered Development", "Smart Project Planning", "Rapid Prototyping"],
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

  // Animation variants for staggered animations
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
              <span className="text-siso-text-bold whitespace-normal md:whitespace-nowrap">Build Your App With</span>
              <div className="hero-title-container">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className={`hero-title font-semibold bg-gradient-to-r from-siso-red to-siso-orange bg-clip-text text-transparent ${
                      titleNumber === index ? "opacity-100" : "opacity-0"
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                      titleNumber === index
                        ? {
                            opacity: 1,
                            y: 0,
                            position: "relative"
                          }
                        : {
                            opacity: 0,
                            y: titleNumber > index ? -30 : 30,
                            position: "absolute"
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
              Transform your app ideas into reality with our AI-powered development platform. 
              Get detailed project plans, resource estimates, and development roadmaps tailored 
              to your specific requirements - all powered by cutting-edge artificial intelligence.
            </motion.p>
          </div>
          <motion.div 
            className="flex flex-row gap-4 hero-action-buttons"
            variants={buttonVariants}
          >
            <Button 
              size="lg" 
              className="gap-4" 
              variant="outline"
              onClick={handleTryAI}
            >
              Try AI Planner <PhoneCall className="w-4 h-4" />
            </Button>
            <Button 
              size="lg" 
              className="gap-4 bg-gradient-to-r from-siso-red to-siso-orange hover:opacity-90"
              onClick={handleGetStarted}
            >
              Get Started <MoveRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export { Hero };
