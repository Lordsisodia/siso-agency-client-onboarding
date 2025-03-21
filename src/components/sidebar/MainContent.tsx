
import { motion } from 'framer-motion';

interface MainContentProps {
  isExpanded: boolean;
  isMobile: boolean;
  children?: React.ReactNode;
}

export const MainContent = ({ 
  isExpanded, 
  isMobile,
  children
}: MainContentProps) => {
  return (
    <motion.div 
      className="min-h-screen w-full max-w-full overflow-x-hidden"
      animate={{
        marginLeft: !isMobile ? (isExpanded ? '18rem' : '4rem') : 0
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 30,
        mass: 0.8
      }}
    >
      {children}
    </motion.div>
  );
};
