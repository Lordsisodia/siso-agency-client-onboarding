
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SidebarLogo } from './sidebar/SidebarLogo';
import { SidebarNavigation } from './sidebar/SidebarNavigation';
import { SidebarFooter } from './sidebar/SidebarFooter';
import { SidebarContainer } from './sidebar/SidebarContainer';
import { MainContent } from './sidebar/MainContent';
import { MobileSidebarButton } from './sidebar/MobileSidebarButton';
import { SidebarOverlay } from './sidebar/SidebarOverlay';
import { useIsMobile } from '@/hooks/use-mobile';
import { AnimatePresence } from 'framer-motion';
import { awardNavigationPoints } from '@/utils/navigationPoints';

// Sidebar state persistence key
const SIDEBAR_STATE_KEY = 'siso-sidebar-state';

export const Sidebar = () => {
  // Initialize isExpanded from localStorage or default to false
  const [isExpanded, setIsExpanded] = useState(() => {
    const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
    return savedState ? JSON.parse(savedState) : false;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAlternateMenu, setShowAlternateMenu] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Save sidebar state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(isExpanded));
  }, [isExpanded]);
  
  // Award points for visiting certain pages
  useEffect(() => {
    awardNavigationPoints(location.pathname);
  }, [location.pathname]);
  
  // Handle navigation with improved external link support
  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    
    if (!href) return;
    
    // Check if the link is external (starts with http or https)
    if (href.startsWith('http://') || href.startsWith('https://')) {
      // Allow default browser behavior for external links
      return;
    }
    
    // For internal links, prevent default and handle with React Router
    e.preventDefault();
    
    // Set navigating state to true - this prevents sidebar collapse
    setIsNavigating(true);
    
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

  // Reset navigation state after route change is complete
  useEffect(() => {
    // Only reset navigation state if we were actually navigating
    if (isNavigating) {
      setIsNavigating(false);
    }
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Handle mouse interactions for desktop sidebar
  const handleMouseEnter = useCallback(() => {
    if (!isMobile && !isProfileOpen && !showAlternateMenu) {
      setIsExpanded(true);
    }
  }, [isMobile, isProfileOpen, showAlternateMenu]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile && !isProfileOpen && !showAlternateMenu && !isNavigating) {
      setIsExpanded(false);
    }
  }, [isMobile, isProfileOpen, showAlternateMenu, isNavigating]);

  // Toggle between main navigation and alternate menu
  const toggleNavigation = () => {
    setShowAlternateMenu(!showAlternateMenu);
    
    // If switching to alternate menu, ensure sidebar is expanded
    if (!showAlternateMenu) {
      setIsExpanded(true);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <MobileSidebarButton 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      )}

      {/* Sidebar Container */}
      <SidebarContainer
        isExpanded={showAlternateMenu ? true : isExpanded}
        isMobile={isMobile}
        isMobileMenuOpen={isMobileMenuOpen}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SidebarLogo 
          collapsed={!isExpanded} 
          setCollapsed={() => setIsExpanded(!isExpanded)}
          onLogoClick={toggleNavigation}
          showAlternateMenu={showAlternateMenu}
        />
        <AnimatePresence mode="wait">
          <SidebarNavigation 
            collapsed={showAlternateMenu ? false : !isExpanded} 
            onItemClick={handleItemClick}
            visible={!showAlternateMenu}
          />
        </AnimatePresence>
        {!showAlternateMenu && (
          <SidebarFooter 
            collapsed={!isExpanded} 
            onProfileOpen={(isOpen) => {
              setIsProfileOpen(isOpen);
              if (isOpen) setIsExpanded(true);
            }}
          />
        )}
      </SidebarContainer>

      {/* Main Content Wrapper */}
      <MainContent isExpanded={showAlternateMenu ? true : isExpanded} isMobile={isMobile}>
        {/* Mobile Overlay with improved backdrop blur */}
        <AnimatePresence>
          {isMobile && isMobileMenuOpen && (
            <SidebarOverlay 
              isMobileMenuOpen={isMobileMenuOpen} 
              setIsMobileMenuOpen={setIsMobileMenuOpen} 
            />
          )}
        </AnimatePresence>
      </MainContent>
    </>
  );
};
