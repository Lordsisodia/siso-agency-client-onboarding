
import { motion } from 'framer-motion';

interface SidebarOverlayProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export const SidebarOverlay = ({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}: SidebarOverlayProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
      onClick={() => setIsMobileMenuOpen(false)}
    />
  );
};
