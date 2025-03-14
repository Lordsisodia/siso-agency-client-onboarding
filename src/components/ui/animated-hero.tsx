
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

  return (
    <div className="w-full relative z-10">
      <OnboardingStyles />
      <div className="container mx-auto px-4">
        <div className="flex gap-8 py-16 lg:py-28 items-center justify-center flex-col">
          <div className="flex gap-6 flex-col items-center hero-content">
            <h1 className="text-5xl md:text-7xl max-w-4xl tracking-tighter text-center font-regular">
              <span className="text-siso-text-bold whitespace-normal md:whitespace-nowrap">Build Your App With</span>
              <div className="hero-title-container">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className={`hero-title font-semibold bg-gradient-to-r from-siso-red to-siso-orange bg-clip-text text-transparent ${
                      titleNumber === index ? "opacity-100" : "opacity-0"
                    }`}
                    initial={{ opacity: 0, y: "-30px" }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -100 : 100,
                            opacity: 0,
                          }
                    }
                    transition={{ type: "spring", stiffness: 70, damping: 15 }}
                  >
                    {title}
                  </motion.span>
                ))}
              </div>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-siso-text max-w-2xl text-center mx-auto">
              Transform your app ideas into reality with our AI-powered development platform. 
              Get detailed project plans, resource estimates, and development roadmaps tailored 
              to your specific requirements - all powered by cutting-edge artificial intelligence.
            </p>
          </div>
          <div className="flex flex-row gap-4 hero-action-buttons">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
