
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Basic fade in animation component
export const FadeIn = ({ 
  children, 
  delay = 0, 
  duration = 0.5,
  ...props 
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  [key: string]: any;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ delay, duration }}
    {...props}
  >
    {children}
  </motion.div>
);

// Slide up animation component
export const SlideUp = ({ 
  children, 
  delay = 0, 
  duration = 0.5,
  distance = 20,
  ...props 
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  [key: string]: any;
}) => (
  <motion.div
    initial={{ opacity: 0, y: distance }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: distance }}
    transition={{ delay, duration }}
    {...props}
  >
    {children}
  </motion.div>
);

// Staggered list animation
export const StaggeredList = ({ 
  children, 
  staggerDelay = 0.1,
  ...props 
}: {
  children: React.ReactNode[];
  staggerDelay?: number;
  [key: string]: any;
}) => (
  <>
    {React.Children.map(children, (child, i) => (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: i * staggerDelay,
        }}
        {...props}
      >
        {child}
      </motion.div>
    ))}
  </>
);

// Animated counter
export const AnimatedCounter = ({ 
  value = 0, 
  duration = 2,
  ...props 
}: { 
  value: number; 
  duration?: number;
  [key: string]: any;
}) => {
  const [displayValue, setDisplayValue] = React.useState(0);
  
  React.useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const startValue = displayValue;

    const updateValue = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      setDisplayValue(Math.floor(startValue + progress * (value - startValue)));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateValue);
      }
    };
    
    animationFrame = requestAnimationFrame(updateValue);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration, displayValue]);
  
  return <span {...props}>{displayValue}</span>;
};

export default {
  FadeIn,
  SlideUp,
  StaggeredList,
  AnimatedCounter
};
