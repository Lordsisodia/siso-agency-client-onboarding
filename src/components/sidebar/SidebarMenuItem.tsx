
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarMenuItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  collapsed: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  isMain?: boolean;
  isActive?: boolean;
  isExternal?: boolean;
}

export const SidebarMenuItem = ({
  href,
  icon: Icon,
  label,
  collapsed,
  onClick,
  className,
  isMain,
  isActive,
  isExternal
}: SidebarMenuItemProps) => {
  // Simplified menu item animation variant
  const menuItemVariants = {
    initial: { 
      opacity: 0, 
      x: -5 
    },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      }
    },
    exit: { 
      opacity: 0, 
      x: -5,
      transition: {
        duration: 0.15,
      }
    }
  };

  // Simplified highlight animation
  const highlightVariants = {
    initial: {
      opacity: 0,
      scale: 0.98,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      }
    }
  };

  const linkClasses = cn(
    'relative flex items-center gap-4 rounded-lg px-4 py-2.5 text-siso-text transition-all duration-200',
    isActive && 'bg-gradient-to-r from-siso-red/10 to-siso-orange/10 text-siso-text-bold shadow-sm',
    !isActive && 'hover:bg-gradient-to-r hover:from-siso-red/5 hover:to-siso-orange/5 hover:text-siso-text-bold',
    isMain ? 'text-lg font-semibold' : 'text-sm',
    collapsed ? 'justify-center' : '',
    className
  );

  // Create the inner content that will be used in both Link and a tags
  const linkContent = (
    <>
      <div className="relative">
        <Icon 
          className={cn(
            isMain ? "w-5 h-5" : "w-4 h-4",
            isActive ? "text-siso-orange" : "text-siso-text group-hover:text-siso-orange",
            "transition-colors duration-200"
          )} 
        />
        {isActive && (
          <motion.div 
            className="absolute inset-0 blur-lg bg-siso-orange/30 -z-10"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>

      <AnimatePresence mode="wait">
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            transition={{ duration: 0.2 }}
            className="truncate font-medium"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      {isActive && (
        <motion.div
          layoutId="sidebar-highlight"
          className="absolute left-0 top-0 h-full w-full rounded-lg bg-gradient-to-r from-siso-red/5 to-siso-orange/5 -z-10"
          initial="initial"
          animate="animate"
          variants={highlightVariants}
        >
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-gradient-to-b from-siso-red to-siso-orange rounded-r-full" />
        </motion.div>
      )}
    </>
  );

  const menuItem = (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={menuItemVariants}
      className="relative"
    >
      {isExternal ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClasses}
          onClick={onClick}
        >
          {linkContent}
        </a>
      ) : (
        <Link
          to={href}
          onClick={onClick}
          className={linkClasses}
        >
          {linkContent}
        </Link>
      )}
    </motion.div>
  );

  if (collapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {menuItem}
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={20}>
            <p className="font-medium">{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return menuItem;
};
