
import { Variants } from 'framer-motion';

// Fade in animation
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 }
  },
};

// Fade in animation with Y-axis movement
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

// Fade in animation with scale
export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  },
};

// Staggered container animation
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Slide in from right animation
export const slideInRight: Variants = {
  hidden: { x: 50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Slide in from left animation
export const slideInLeft: Variants = {
  hidden: { x: -50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Pop animation
export const popAnimation: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

// Pulse animation
export const pulse: Variants = {
  hidden: { scale: 1 },
  visible: { 
    scale: [1, 1.05, 1],
    transition: { 
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse" 
    }
  }
};

// Rotate animation
export const rotate: Variants = {
  hidden: { rotate: 0 },
  visible: { 
    rotate: 360,
    transition: { 
      duration: 1.5,
      repeat: Infinity,
      ease: "linear" 
    }
  }
};

// List item hover animation
export const listItemHover = {
  whileHover: { 
    scale: 1.03,
    transition: { duration: 0.2 }
  },
  whileTap: { 
    scale: 0.98 
  }
};

// Card hover animation
export const cardHover = {
  whileHover: { 
    y: -5,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    transition: { duration: 0.2 }
  },
  whileTap: { 
    y: 0,
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
  }
};
