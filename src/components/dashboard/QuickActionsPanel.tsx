
import { FileText, Briefcase, BookOpen, TrendingUp, BarChart3 } from 'lucide-react';
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
      color: 'text-blue-500'
    },
    {
      title: 'Portfolio',
      description: 'View portfolio projects',
      icon: Briefcase,
      path: '/portfolio',
      color: 'text-purple-500'
    },
    {
      title: 'Resource Hub',
      description: 'Browse resources',
      icon: BookOpen,
      path: '/resource-hub',
      color: 'text-green-500'
    },
    {
      title: 'Competitive Analysis',
      description: 'Analyze competitors',
      icon: TrendingUp,
      path: '/competitive-analysis',
      color: 'text-amber-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card className="border border-siso-border">
        <CardHeader className="py-4 px-6">
          <CardTitle className="text-md font-semibold flex items-center">
            <BarChart3 size={16} className="mr-2 text-siso-orange" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 pt-0">
          <div className="grid grid-cols-1 gap-2">
            {actions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(action.path)}
                className="flex items-center p-3 rounded-md hover:bg-siso-border/10 cursor-pointer transition-colors"
              >
                <div className={`p-2 rounded-md bg-black/5 ${action.color} mr-3`}>
                  <action.icon size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-siso-text-bold">{action.title}</h3>
                  <p className="text-xs text-siso-text/70">{action.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
