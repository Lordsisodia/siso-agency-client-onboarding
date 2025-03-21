
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Rocket, MoveRight, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useNavigate } from "react-router-dom";
import { OnboardingStyles } from "@/components/plan-builder/components/OnboardingStyles";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { StaggerContainer, StaggerItem } from "@/components/ui/animations";

const FeatureCheck = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2 text-sm md:text-base">
    <CheckCircle2 className="w-4 h-4 text-siso-orange" />
    <span className="text-siso-text">{children}</span>
  </div>
);

export function EnhancedHero() {
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
    navigate('/auth');
  };

  const handleTryAI = () => {
    navigate('/plan-builder');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <div className="w-full relative z-10 flex items-center justify-center min-h-[calc(80vh-80px)]">
      <OnboardingStyles />
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex gap-8 py-16 lg:py-24 items-center justify-center flex-col max-w-4xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="flex gap-6 flex-col items-center hero-content">
            <motion.div variants={itemVariants} className="flex flex-col items-center">
              <GradientHeading variant="sunset" size="lg" className="text-center">
                <span className="text-siso-text-bold block mb-2">Grow your agency with</span>
                <div className="hero-title-container h-16 md:h-20 relative">
                  {titles.map((title, index) => (
                    <motion.span
                      key={index}
                      className={`hero-title absolute inset-0 flex justify-center font-semibold text-center ${
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
              </GradientHeading>
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl leading-relaxed text-siso-text max-w-2xl text-center mx-auto mb-2"
            >
              From vision to MVP in 48-72 hours—trusted by 49+ agencies with 1,000+ developers in our network.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 mt-2 mb-6"
            >
              <FeatureCheck>AI-Powered Development</FeatureCheck>
              <FeatureCheck>High-Quality Code</FeatureCheck>
              <FeatureCheck>Responsive Design</FeatureCheck>
              <FeatureCheck>On-Time Delivery</FeatureCheck>
              <FeatureCheck>Client-Ready Output</FeatureCheck>
              <FeatureCheck>Ongoing Support</FeatureCheck>
            </motion.div>
          </div>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 hero-action-buttons items-center justify-center"
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
          
          <motion.div
            variants={itemVariants}
            className="mt-6 p-2 px-4 rounded-full bg-siso-bg/80 border border-siso-text/10 backdrop-blur-sm"
          >
            <p className="text-sm text-siso-text/80">
              <span className="text-siso-orange">1,000+</span> apps delivered for agencies worldwide
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
