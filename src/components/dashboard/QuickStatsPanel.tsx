
import { BarChart3, Calendar, CheckSquare, FolderKanban, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatNumber } from '@/lib/formatters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
      gradient: 'from-blue-500/15 to-blue-600/10',
      iconColor: 'text-blue-500',
      borderColor: 'border-blue-500/20',
      progress: 65
    },
    {
      title: 'Pending Tasks',
      value: pendingTasks,
      prevValue: pendingTasks + 2,
      icon: CheckSquare,
      gradient: 'from-amber-500/15 to-amber-600/10',
      iconColor: 'text-amber-500',
      borderColor: 'border-amber-500/20',
      progress: 40
    },
    {
      title: 'Upcoming Events',
      value: upcomingEvents,
      prevValue: upcomingEvents - 1,
      icon: Calendar,
      gradient: 'from-green-500/15 to-green-600/10',
      iconColor: 'text-green-500',
      borderColor: 'border-green-500/20',
      progress: 80
    },
    {
      title: 'Analytics',
      value: null,
      prevValue: null,
      icon: BarChart3,
      gradient: 'from-purple-500/15 to-purple-600/10',
      iconColor: 'text-purple-500',
      borderColor: 'border-purple-500/20',
      link: true,
      progress: null
    }
  ];

  const getPercentChange = (current: number, previous: number) => {
    if (previous === 0) return 100;
    return Math.round(((current - previous) / previous) * 100);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
    >
      {stats.map((stat, index) => (
        <TooltipProvider key={stat.title}>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                variants={item}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.2 } 
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className={`bg-gradient-to-br ${stat.gradient} backdrop-blur-sm border border-siso-border/40 hover:border-${stat.borderColor} h-full cursor-pointer transition-all hover:shadow-lg hover:shadow-${stat.borderColor}`}>
                  <CardContent className="p-4 flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-siso-text/70 text-sm font-medium">{stat.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {stat.value !== null ? (
                            <p className="text-2xl font-bold text-siso-text-bold">{formatNumber(stat.value)}</p>
                          ) : (
                            <div className="flex items-center text-sm text-siso-orange mt-1 font-medium">
                              View Report
                              <ExternalLink size={14} className="ml-1" />
                            </div>
                          )}
                          
                          {stat.prevValue !== null && stat.value !== null && (
                            <Badge variant={getPercentChange(stat.value, stat.prevValue) >= 0 ? "success" : "destructive"} className="ml-1 flex items-center">
                              {getPercentChange(stat.value, stat.prevValue) >= 0 ? (
                                <TrendingUp className="inline h-3 w-3 mr-0.5" />
                              ) : (
                                <TrendingDown className="inline h-3 w-3 mr-0.5" />
                              )}
                              {Math.abs(getPercentChange(stat.value, stat.prevValue))}%
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className={`p-3 rounded-full bg-black/10 ${stat.iconColor} shadow-inner`}>
                        <stat.icon size={20} className="filter drop-shadow-sm" />
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
                          className="h-1.5 bg-black/10 rounded-full overflow-hidden" 
                          indicatorClassName={`bg-gradient-to-r ${
                            stat.progress < 30 ? 'from-red-500 to-red-400' :
                            stat.progress < 70 ? 'from-amber-500 to-amber-400' :
                            'from-green-500 to-green-400'
                          } rounded-full`}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{stat.value !== null ? `View details for ${stat.title.toLowerCase()}` : 'View analytics dashboard'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </motion.div>
  );
};
