
import { FileText, Briefcase, BookOpen, TrendingUp, BarChart3, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const QuickActionsPanel = () => {
  const navigate = useNavigate();
  
  const actions = [
    {
      title: 'Plan Builder',
      description: 'Create new app plans',
      icon: FileText,
      path: '/plan-builder',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Portfolio',
      description: 'View portfolio projects',
      icon: Briefcase,
      path: '/portfolio',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      title: 'Resource Hub',
      description: 'Browse resources',
      icon: BookOpen,
      path: '/resource-hub',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Competitive Analysis',
      description: 'Analyze competitors',
      icon: TrendingUp,
      path: '/competitive-analysis',
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10'
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
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card className="border border-siso-border hover:shadow-md hover:shadow-siso-border/10 transition-all duration-300">
        <CardHeader className="py-4 px-6 bg-gradient-to-r from-siso-bg to-siso-bg/95">
          <CardTitle className="text-md font-semibold flex items-center">
            <BarChart3 size={16} className="mr-2 text-siso-orange" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 pt-2">
          <div className="grid grid-cols-1 gap-3">
            {actions.map((action, index) => (
              <motion.div
                key={action.title}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                variants={cardVariants}
                transition={{ duration: 0.2, delay: 0.1 + index * 0.05 }}
                onClick={() => navigate(action.path)}
                className="flex items-center p-3 rounded-md cursor-pointer bg-gradient-to-r from-siso-bg to-transparent border border-transparent hover:border-siso-border/30"
              >
                <div className={`p-2 rounded-md ${action.bgColor} ${action.color} mr-3`}>
                  <action.icon size={18} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-siso-text-bold">{action.title}</h3>
                  <p className="text-xs text-siso-text/70">{action.description}</p>
                </div>
                <ArrowRight size={16} className="text-siso-text/40 group-hover:text-siso-orange transition-colors" />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
