
import { BarChart3, Calendar, CheckSquare, FolderKanban, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatNumber } from '@/lib/formatters';

interface QuickStatsPanelProps {
  activeProjects: number;
  pendingTasks: number;
  upcomingEvents: number;
}

export const QuickStatsPanel = ({
  activeProjects = 0,
  pendingTasks = 0,
  upcomingEvents = 0
}: QuickStatsPanelProps) => {
  const stats = [
    {
      title: 'Active Projects',
      value: activeProjects,
      prevValue: activeProjects - 1,
      icon: FolderKanban,
      color: 'from-blue-500/20 to-blue-600/20',
      iconColor: 'text-blue-500',
      progress: 65
    },
    {
      title: 'Pending Tasks',
      value: pendingTasks,
      prevValue: pendingTasks + 2,
      icon: CheckSquare,
      color: 'from-amber-500/20 to-amber-600/20',
      iconColor: 'text-amber-500',
      progress: 40
    },
    {
      title: 'Upcoming Events',
      value: upcomingEvents,
      prevValue: upcomingEvents - 1,
      icon: Calendar,
      color: 'from-green-500/20 to-green-600/20',
      iconColor: 'text-green-500',
      progress: 80
    },
    {
      title: 'Analytics',
      value: null,
      prevValue: null,
      icon: BarChart3,
      color: 'from-purple-500/20 to-purple-600/20',
      iconColor: 'text-purple-500',
      link: true,
      progress: null
    }
  ];

  const getPercentChange = (current: number, previous: number) => {
    if (previous === 0) return 100;
    return Math.round(((current - previous) / previous) * 100);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 + index * 0.05 }}
          whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className={`bg-gradient-to-br ${stat.color} backdrop-blur-sm border border-siso-border/40 hover:border-siso-border/60 h-full cursor-pointer transition-all hover:shadow-lg hover:shadow-siso-border/10`}>
            <CardContent className="p-4 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-siso-text/70 text-sm font-medium">{stat.title}</p>
                  <div className="flex items-center gap-2">
                    {stat.value !== null ? (
                      <p className="text-2xl font-bold text-siso-text-bold">{formatNumber(stat.value)}</p>
                    ) : (
                      <p className="text-sm text-siso-orange mt-1 font-medium">View Report</p>
                    )}
                    
                    {stat.prevValue !== null && stat.value !== null && (
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${getPercentChange(stat.value, stat.prevValue) >= 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                        {getPercentChange(stat.value, stat.prevValue) >= 0 ? (
                          <TrendingUp className="inline h-3 w-3 mr-0.5" />
                        ) : (
                          <TrendingDown className="inline h-3 w-3 mr-0.5" />
                        )}
                        {Math.abs(getPercentChange(stat.value, stat.prevValue))}%
                      </span>
                    )}
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-black/10 ${stat.iconColor} shadow-inner`}>
                  <stat.icon size={20} />
                </div>
              </div>
              
              {stat.progress !== null && (
                <div className="mt-1">
                  <div className="flex justify-between items-center text-xs text-siso-text/70 mb-1">
                    <span>Progress</span>
                    <span>{stat.progress}%</span>
                  </div>
                  <Progress 
                    value={stat.progress} 
                    className="h-1 bg-black/10" 
                    indicatorClassName="bg-gradient-to-r from-siso-red to-siso-orange" 
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};
