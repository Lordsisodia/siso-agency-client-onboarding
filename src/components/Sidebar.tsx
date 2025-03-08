
import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SidebarLogo } from './sidebar/SidebarLogo';
import { SidebarNavigation } from './sidebar/SidebarNavigation';
import { SidebarFooter } from './sidebar/SidebarFooter';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNavigation, setShowNavigation] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const hoverTimeoutRef = useRef<number | null>(null);
  const navigationTimeoutRef = useRef<number | null>(null);
  
  // Handle navigation with intent tracking
  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    
    if (!href) return;

    // Mark as navigating to prevent sidebar collapse
    setIsNavigating(true);
    
    // Clear any pending timers
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    if (navigationTimeoutRef.current) {
      window.clearTimeout(navigationTimeoutRef.current);
    }
    
    // Set a longer timeout for navigation to finish
    navigationTimeoutRef.current = window.setTimeout(() => {
      setIsNavigating(false);
      navigationTimeoutRef.current = null;
    }, 1000); // Longer timeout to ensure navigation is complete

    if (href.startsWith('/')) {
      navigate(href);
      
      if (isMobile) {
        setIsMobileMenuOpen(false);
      }
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      if (isMobile) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  // Location change listener (doesn't reset navigation state)
  useEffect(() => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [location.pathname, isMobile]);

  useEffect(() => {
    return () => {
      // Clean up all timeouts on unmount
      if (hoverTimeoutRef.current) {
        window.clearTimeout(hoverTimeoutRef.current);
      }
      if (navigationTimeoutRef.current) {
        window.clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  // Handle outside clicks to close the sidebar on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isMobileMenuOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, isMobileMenuOpen]);

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

  const handleMouseEnter = useCallback(() => {
    // Clear any pending timeout
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    if (!isMobile && !isProfileOpen) {
      setIsExpanded(true);
    }
  }, [isMobile, isProfileOpen]);

  const handleMouseLeave = useCallback(() => {
    // Don't collapse if navigating or profile is open
    if (isMobile || isProfileOpen || isNavigating) return;
    
    // Add a delay before collapsing to make it feel smoother
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsExpanded(false);
      hoverTimeoutRef.current = null;
    }, 500); // Increased delay for better user experience
  }, [isMobile, isProfileOpen, isNavigating]);

  return (
    <>
      {/* Mobile Menu Button with smooth icon transition */}
      {isMobile && (
        <motion.div
          initial={false}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 right-4 z-50 bg-siso-bg/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isMobileMenuOpen ? 'close' : 'menu'}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-siso-text" />
                ) : (
                  <Menu className="h-6 w-6 text-siso-text" />
                )}
              </motion.div>
            </AnimatePresence>
          </Button>
        </motion.div>
      )}

      {/* Sidebar with improved animations */}
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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SidebarLogo 
          collapsed={!isExpanded} 
          setCollapsed={() => setIsExpanded(!isExpanded)}
          onLogoClick={() => setShowNavigation(!showNavigation)}
        />
        <AnimatePresence mode="wait">
          <SidebarNavigation 
            collapsed={!isExpanded} 
            onItemClick={handleItemClick}
            visible={showNavigation}
          />
        </AnimatePresence>
        <SidebarFooter 
          collapsed={!isExpanded} 
          onProfileOpen={(isOpen) => {
            setIsProfileOpen(isOpen);
            if (isOpen) setIsExpanded(true);
          }}
        />
      </motion.div>

      {/* Main Content Wrapper with smooth margin transition */}
      <motion.div 
        className="min-h-screen"
        animate={{
          marginLeft: !isMobile ? (isExpanded ? '16rem' : '4rem') : 0
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25
        }}
      >
        {/* Mobile Overlay with improved backdrop blur */}
        <AnimatePresence>
          {isMobile && isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
