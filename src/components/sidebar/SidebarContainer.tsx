
import { motion } from 'framer-motion';
import { useRef } from 'react';

interface SidebarContainerProps {
  isExpanded: boolean;
  isMobile: boolean;
  isMobileMenuOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  children: React.ReactNode;
}

export const SidebarContainer = ({
  isExpanded,
  isMobile,
  isMobileMenuOpen,
  onMouseEnter,
  onMouseLeave,
  children
}: SidebarContainerProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const sidebarVariants = {
    expanded: {
      width: isMobile ? "16rem" : "16rem",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
        mass: 0.8
      }
    },
    collapsed: {
      width: isMobile ? "0" : "4rem",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 35,
        mass: 0.8
      }
    }
  };

  return (
    <motion.div 
      ref={sidebarRef}
      initial={false}
      animate={
        isMobile 
          ? isMobileMenuOpen ? "expanded" : "collapsed"
          : isExpanded ? "expanded" : "collapsed"
      }
      variants={sidebarVariants}
      className={`
        fixed top-0 h-screen overflow-y-auto
        bg-gradient-to-b from-siso-bg to-siso-bg/95 
        border-r border-siso-text/10 shadow-lg
        ${isMobile ? 'left-0 z-40' : ''}
      `}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
};
