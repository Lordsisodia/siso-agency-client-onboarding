
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SidebarSection } from './SidebarSection';
import { NavigationProps } from './types';
import { menuSections } from './navigationData';

export const SidebarNavigation = ({ collapsed, onItemClick, visible }: NavigationProps) => {
  const location = useLocation();

  if (!visible) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        duration: 0.2
      }
    }
  };

  // Simplified route matching logic
  const isItemActive = (href: string) => {
    // Remove trailing slashes for consistency
    const currentPath = location.pathname.replace(/\/$/, '');
    const targetPath = href.replace(/\/$/, '');

    // For exact matching
    if (currentPath === targetPath) {
      return true;
    }

    // Special case for dashboard as home
    if (targetPath === '/dashboard' && currentPath === '/') {
      return true;
    }

    // For nested routes like /projects/123
    if (targetPath !== '/' && currentPath.startsWith(targetPath)) {
      // Make sure it's a true parent path (e.g., /projects is parent of /projects/123)
      // but /project is not a parent of /projects
      const nextChar = currentPath.substring(targetPath.length, targetPath.length + 1);
      return nextChar === '' || nextChar === '/';
    }

    return false;
  };

  return (
    <motion.nav
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className={cn("px-2 py-4", collapsed && "px-1")}
    >
      <div className="space-y-2">
        <AnimatePresence mode="wait">
          {menuSections.map((section, index) => (
            <motion.div 
              key={index}
              className={cn(
                "space-y-1",
                section.type === 'section' && "border-b border-siso-border pb-2 mb-2"
              )}
            >
              <SidebarSection
                section={section}
                collapsed={collapsed}
                onItemClick={onItemClick}
                isItemActive={isItemActive}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
