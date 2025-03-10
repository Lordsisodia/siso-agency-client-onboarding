
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileSidebarButtonProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export const MobileSidebarButton = ({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}: MobileSidebarButtonProps) => {
  return (
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
  );
};
