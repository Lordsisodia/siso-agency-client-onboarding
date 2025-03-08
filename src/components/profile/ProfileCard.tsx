
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProfileCardProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  className?: string;
  isEditing?: boolean;
}

export const ProfileCard = ({ 
  icon: Icon, 
  title, 
  children, 
  className,
  isEditing 
}: ProfileCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.01 }}
      className="will-change-transform"
    >
      <Card 
        className={cn(
          "bg-black/20 border-siso-text/10 backdrop-blur-sm transition-all duration-300",
          "hover:border-siso-orange/20 hover:shadow-lg hover:shadow-siso-orange/5",
          isEditing && "border-siso-orange/30",
          className
        )}
      >
        {/* More compact card header */}
        <CardHeader className="pb-1 px-4 py-3">
          <CardTitle className="text-siso-text-bold flex items-center gap-1.5 text-sm tracking-tight">
            <Icon className="w-3.5 h-3.5 text-siso-orange" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-3 pt-0">
          <motion.div
            initial={false}
            animate={isEditing ? { scale: 1.01 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
            className="space-y-1"
          >
            {children}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
