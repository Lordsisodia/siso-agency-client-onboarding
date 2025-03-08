import React from 'react';
import { Brain, Sparkles, Cpu, Network } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface AIThinkingLoaderProps {
  className?: string;
  showStages?: boolean;
  variant?: 'default' | 'minimal' | 'detailed';
  currentStage?: number;
}

export function AIThinkingLoader({
  className,
  showStages = true,
  variant = 'default',
  currentStage = 0
}: AIThinkingLoaderProps) {
  // Thinking stages that the AI goes through
  const stages = [
    { icon: Brain, label: 'Understanding question', color: 'text-siso-orange' },
    { icon: Network, label: 'Analyzing context', color: 'text-siso-red' },
    { icon: Cpu, label: 'Processing information', color: 'text-blue-400' },
    { icon: Sparkles, label: 'Generating response', color: 'text-siso-orange' }
  ];

  // Automatically progress through stages
  const [activeStage, setActiveStage] = React.useState(currentStage);
  
  React.useEffect(() => {
    // If a controlled stage is provided, use that
    if (currentStage !== undefined) {
      setActiveStage(currentStage);
      return;
    }
    
    // Otherwise, automatically cycle through stages
    const timer = setTimeout(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [activeStage, currentStage]);

  if (variant === 'minimal') {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-siso-orange to-siso-red rounded-full blur-sm animate-pulse" />
          <Sparkles className="relative z-10 h-5 w-5 text-white" />
        </motion.div>
        <span className="text-sm text-siso-text/70">AI is thinking...</span>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {variant === 'detailed' && (
        <div className="relative h-1 w-full overflow-hidden rounded-full bg-gray-800">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-siso-orange to-siso-red"
            initial={{ width: "10%" }}
            animate={{ width: `${25 * (activeStage + 1)}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      )}
      
      <div className="flex items-center gap-3">
        <div className="relative">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut" 
            }}
            className="relative z-10"
          >
            {React.createElement(stages[activeStage].icon, {
              className: cn("h-6 w-6", stages[activeStage].color)
            })}
          </motion.div>
          
          <motion.div 
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className={cn(
              "absolute -inset-2 rounded-full blur-md -z-10",
              activeStage === 0 ? "bg-siso-orange/20" : 
              activeStage === 1 ? "bg-siso-red/20" : 
              activeStage === 2 ? "bg-blue-500/20" : 
              "bg-siso-orange/20"
            )}
          />
        </div>
        
        {showStages && (
          <div className="flex flex-col">
            <motion.span 
              key={stages[activeStage].label}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="text-sm font-medium text-siso-text"
            >
              {stages[activeStage].label}
            </motion.span>
            
            <div className="flex mt-1 space-x-1">
              {stages.map((_, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "h-1 rounded-full",
                    index === activeStage 
                      ? "bg-gradient-to-r from-siso-orange to-siso-red w-10" 
                      : "bg-gray-700 w-5"
                  )}
                  animate={index === activeStage ? {
                    width: ["24px", "40px", "24px"],
                  } : {}}
                  transition={index === activeStage ? {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  } : {}}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      
      {variant === 'detailed' && (
        <div className="grid grid-cols-4 gap-1 pt-1">
          {stages.map((stage, index) => (
            <div 
              key={index} 
              className={cn(
                "text-xs px-2 py-1 rounded-full text-center transition-colors",
                index === activeStage 
                  ? "bg-gray-800 text-white" 
                  : "text-gray-500"
              )}
            >
              {index + 1}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
