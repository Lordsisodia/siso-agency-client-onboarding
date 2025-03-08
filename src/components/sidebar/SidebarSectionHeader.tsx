
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarSectionHeaderProps {
  icon: LucideIcon;
  title: string;
}

export const SidebarSectionHeader = ({ icon: Icon, title }: SidebarSectionHeaderProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-siso-text-bold"
    >
      <Icon className="w-4 h-4 text-siso-text-muted" />
      {title}
    </motion.div>
  );
};
