
import { FileText, Briefcase, BookOpen, TrendingUp, BarChart3, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const QuickActionsPanel = () => {
  const navigate = useNavigate();
  
  const actions = [
    {
      title: 'Plan Builder',
      description: 'Create new app plans',
      icon: FileText,
      path: '/plan-builder',
      tooltip: 'Start creating new application plans'
    },
    {
      title: 'Portfolio',
      description: 'View portfolio projects',
      icon: Briefcase,
      path: '/portfolio',
      tooltip: 'Access your portfolio of projects'
    },
    {
      title: 'Resource Hub',
      description: 'Browse resources',
      icon: BookOpen,
      path: '/resource-hub',
      tooltip: 'Find resources, tutorials and guides'
    },
    {
      title: 'Competitive Analysis',
      description: 'Analyze competitors',
      icon: TrendingUp,
      path: '/competitive-analysis',
      tooltip: 'Research and analyze your competitors'
    }
  ];

  const cardVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    hover: { 
      scale: 1.02,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <Card className="border border-siso-border/50 hover:border-siso-border hover:shadow-md hover:shadow-siso-border/10 transition-all duration-300 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between py-4 px-6 bg-gradient-to-r from-siso-bg/90 to-siso-bg/70">
          <CardTitle className="text-md font-semibold flex items-center">
            <BarChart3 size={16} className="mr-2 text-siso-orange" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[300px]">
            <div className="p-3 space-y-2">
              {actions.map((action, index) => (
                <TooltipProvider key={action.title}>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <motion.div
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        whileTap="tap"
                        variants={cardVariants}
                        transition={{ duration: 0.2, delay: 0.1 + index * 0.05 }}
                        onClick={() => navigate(action.path)}
                        className="flex items-center p-3 rounded-md cursor-pointer bg-gradient-to-r from-siso-bg/70 to-transparent border border-siso-border/20 hover:border-siso-orange/30"
                      >
                        <div className="p-2 rounded-md bg-siso-orange/10 text-siso-orange mr-3 shadow-sm">
                          <action.icon size={18} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-siso-text-bold">{action.title}</h3>
                          <p className="text-xs text-siso-text/70">{action.description}</p>
                        </div>
                        <ArrowRight size={16} className="text-siso-text/40 group-hover:text-siso-orange transition-colors" />
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="bg-siso-bg-alt border border-siso-border/60 text-xs px-3 py-1.5 rounded-md shadow-md">
                      <p>{action.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  );
};
