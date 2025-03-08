
import { BarChart3, Calendar, CheckSquare, FolderKanban } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
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
      icon: FolderKanban,
      color: 'from-blue-500/20 to-blue-600/20',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Pending Tasks',
      value: pendingTasks,
      icon: CheckSquare,
      color: 'from-amber-500/20 to-amber-600/20',
      iconColor: 'text-amber-500'
    },
    {
      title: 'Upcoming Events',
      value: upcomingEvents,
      icon: Calendar,
      color: 'from-green-500/20 to-green-600/20',
      iconColor: 'text-green-500'
    },
    {
      title: 'Analytics',
      value: null,
      icon: BarChart3,
      color: 'from-purple-500/20 to-purple-600/20',
      iconColor: 'text-purple-500',
      link: true
    }
  ];

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
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className={`bg-gradient-to-br ${stat.color} backdrop-blur-sm border border-siso-border/40 hover:border-siso-border/60 h-full cursor-pointer transition-all`}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-siso-text/70 text-sm font-medium">{stat.title}</p>
                {stat.value !== null ? (
                  <p className="text-2xl font-bold text-siso-text-bold">{formatNumber(stat.value)}</p>
                ) : (
                  <p className="text-sm text-siso-orange mt-1 font-medium">View Report</p>
                )}
              </div>
              <div className={`p-3 rounded-full bg-black/10 ${stat.iconColor}`}>
                <stat.icon size={20} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};
