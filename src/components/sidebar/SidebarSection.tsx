
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SidebarMenuItem } from './SidebarMenuItem';
import { SidebarSectionHeader } from './SidebarSectionHeader';
import { MenuSection } from './types';

interface SidebarSectionProps {
  section: MenuSection;
  collapsed: boolean;
  onItemClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  isItemActive: (href: string) => boolean;
}

export const SidebarSection = ({ 
  section, 
  collapsed, 
  onItemClick, 
  isItemActive 
}: SidebarSectionProps) => {
  // Simplified container animation variant
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

  if (section.type === 'main') {
    return (
      <SidebarMenuItem
        href={section.href!}
        icon={section.icon}
        label={section.label!}
        collapsed={collapsed}
        onClick={onItemClick}
        isMain={true}
        isActive={isItemActive(section.href!)}
      />
    );
  }

  return (
    <div className="space-y-1">
      {!collapsed && section.title && (
        <SidebarSectionHeader icon={section.icon} title={section.title} />
      )}
      <motion.div 
        className={cn(
          "space-y-1",
          !collapsed && "pl-3 border-l-2 border-siso-border ml-4"
        )}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {section.items?.map((item, index) => (
          <SidebarMenuItem
            key={index}
            href={item.href}
            icon={item.icon}
            label={item.label}
            collapsed={collapsed}
            onClick={onItemClick}
            isActive={isItemActive(item.href)}
            isExternal={item.isExternal}
          />
        ))}
      </motion.div>
    </div>
  );
};
