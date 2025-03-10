
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

export const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNavigation, setShowNavigation] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  
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

  useEffect(() => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Handle mouse interactions for desktop sidebar
  const handleMouseEnter = useCallback(() => {
    if (!isMobile && !isProfileOpen) {
      setIsExpanded(true);
    }
  }, [isMobile, isProfileOpen]);

  const handleMouseLeave = useCallback(() => {
    // We've removed the auto-collapse functionality
    // The sidebar will only collapse when the toggle button is clicked
  }, []);

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
        isExpanded={isExpanded}
        isMobile={isMobile}
        isMobileMenuOpen={isMobileMenuOpen}
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
      </SidebarContainer>

      {/* Main Content Wrapper */}
      <MainContent isExpanded={isExpanded} isMobile={isMobile}>
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
