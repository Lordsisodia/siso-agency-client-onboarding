
import { BarChart3, Calendar, CheckSquare, FolderKanban, TrendingUp, TrendingDown, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatNumber } from '@/lib/formatters';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
      tooltip: 'Total number of currently active projects',
      progress: 65
    },
    {
      title: 'Pending Tasks',
      value: pendingTasks,
      prevValue: pendingTasks + 2,
      icon: CheckSquare,
      tooltip: 'Tasks awaiting completion',
      progress: 40
    },
    {
      title: 'Upcoming Events',
      value: upcomingEvents,
      prevValue: upcomingEvents - 1,
      icon: Calendar,
      tooltip: 'Events scheduled for the next 7 days',
      progress: 80
    },
    {
      title: 'Analytics',
      value: null,
      prevValue: null,
      icon: BarChart3,
      tooltip: 'View detailed analytics and reports',
      link: true,
      progress: null
    }
  ];

  const getPercentChange = (current: number, previous: number) => {
    if (previous === 0) return 100;
    return Math.round(((current - previous) / previous) * 100);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <TooltipProvider key={stat.title}>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.25 }}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="bg-gradient-to-br from-siso-bg/80 to-siso-bg/60 backdrop-blur-sm border border-siso-border/40 hover:border-siso-orange/30 h-full cursor-pointer transition-all hover:shadow-lg hover:shadow-siso-orange/5">
                  <CardContent className="p-5 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-siso-text/70 text-sm font-medium tracking-wide mb-1">{stat.title}</p>
                        <div className="flex items-center gap-2">
                          {stat.value !== null ? (
                            <p className="text-2xl font-bold text-siso-text-bold tracking-tight">{formatNumber(stat.value)}</p>
                          ) : (
                            <p className="text-sm text-siso-orange mt-1 font-medium">View Report</p>
                          )}
                          
                          {stat.prevValue !== null && stat.value !== null && (
                            <Badge variant={getPercentChange(stat.value, stat.prevValue) >= 0 ? "success" : "warning"} className="flex items-center gap-0.5 text-xs">
                              {getPercentChange(stat.value, stat.prevValue) >= 0 ? (
                                <TrendingUp className="inline h-3 w-3" />
                              ) : (
                                <TrendingDown className="inline h-3 w-3" />
                              )}
                              {Math.abs(getPercentChange(stat.value, stat.prevValue))}%
                            </Badge>
                          )}
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className="p-3 rounded-full bg-gradient-to-br from-siso-orange/10 to-siso-red/5 text-siso-orange shadow-inner"
                      >
                        <stat.icon size={20} />
                      </motion.div>
                    </div>
                    
                    {stat.progress !== null && (
                      <div className="mt-2">
                        <div className="flex justify-between items-center text-xs text-siso-text/70 mb-1.5 font-medium">
                          <span>Progress</span>
                          <span className="font-semibold">{stat.progress}%</span>
                        </div>
                        <Progress 
                          value={stat.progress} 
                          className="h-1.5 bg-black/10" 
                          indicatorClassName="bg-gradient-to-r from-siso-red/80 to-siso-orange/80" 
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-siso-bg-alt border border-siso-border/60 text-xs px-3 py-1.5 rounded-md shadow-md">
              <div className="flex items-center gap-1.5">
                <Info size={12} className="text-siso-orange" />
                <p className="font-medium">{stat.tooltip}</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};
