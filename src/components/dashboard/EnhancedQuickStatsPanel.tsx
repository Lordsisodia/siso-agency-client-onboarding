
import React from 'react';
import { DashboardStats } from '@/types/dashboard';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface QuickStatsPanelProps {
  stats: DashboardStats;
  onClick?: (statType: string) => void;
}

export const EnhancedQuickStatsPanel: React.FC<QuickStatsPanelProps> = ({ 
  stats, 
  onClick 
}) => {
  // Define status thresholds for color coding
  const getProjectStatus = (count: number) => {
    if (count <= 2) return "low";
    if (count <= 5) return "medium";
    return "high";
  };

  const getTaskStatus = (count: number) => {
    if (count <= 5) return "low";
    if (count <= 10) return "medium";
    return "high";
  };

  const getEventStatus = (count: number) => {
    if (count <= 1) return "low";
    if (count <= 3) return "medium";
    return "high";
  };

  const getStreakStatus = (count: number) => {
    if (count <= 3) return "low";
    if (count <= 7) return "medium";
    return "high";
  };

  // Define progress values
  const getProjectProgress = () => Math.min(stats.activeProjects * 12, 100);
  const getTaskProgress = () => Math.min(stats.pendingTasks * 5, 100);
  const getEventProgress = () => Math.min(stats.upcomingEvents * 20, 100);
  const getStreakProgress = () => Math.min((stats.loginStreak || 0) * 10, 100);

  // Get status icon based on level
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "low":
        return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case "medium":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "high":
        return <Clock className="h-4 w-4 text-rose-500" />;
      default:
        return null;
    }
  };

  // Define the stats data
  const statsData = [
    {
      id: "projects",
      label: "Active Projects",
      value: stats.activeProjects,
      status: getProjectStatus(stats.activeProjects),
      progress: getProjectProgress(),
      trend: 1, // positive trend
      trendText: "Up 1 from last week",
      bgGradient: "from-indigo-500/10 to-indigo-700/5",
      progressColor: "bg-indigo-500",
      hoverGradient: "hover:from-indigo-500/20 hover:to-indigo-700/10"
    },
    {
      id: "tasks",
      label: "Pending Tasks",
      value: stats.pendingTasks,
      status: getTaskStatus(stats.pendingTasks),
      progress: getTaskProgress(),
      trend: -2, // negative trend
      trendText: "Down 2 from yesterday",
      bgGradient: "from-amber-500/10 to-amber-700/5",
      progressColor: "bg-amber-500",
      hoverGradient: "hover:from-amber-500/20 hover:to-amber-700/10"
    },
    {
      id: "events",
      label: "Upcoming Events",
      value: stats.upcomingEvents,
      status: getEventStatus(stats.upcomingEvents),
      progress: getEventProgress(),
      trend: 1, // positive trend
      trendText: "1 new event this week",
      bgGradient: "from-emerald-500/10 to-emerald-700/5",
      progressColor: "bg-emerald-500",
      hoverGradient: "hover:from-emerald-500/20 hover:to-emerald-700/10"
    },
    {
      id: "streak",
      label: "Login Streak",
      value: stats.loginStreak || 0,
      status: getStreakStatus(stats.loginStreak || 0),
      progress: getStreakProgress(),
      trend: 0, // neutral trend
      trendText: "Keep it up!",
      bgGradient: "from-purple-500/10 to-purple-700/5",
      progressColor: "bg-purple-500",
      hoverGradient: "hover:from-purple-500/20 hover:to-purple-700/10",
      badgeText: stats.loginStreak && stats.loginStreak > 5 ? "Impressive!" : undefined
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat, index) => (
        <TooltipProvider key={stat.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div 
                className={`relative rounded-xl bg-gradient-to-br ${stat.bgGradient} ${stat.hoverGradient} 
                  border border-white/10 p-4 shadow-lg backdrop-blur-sm 
                  transition-all duration-300 hover:shadow-xl cursor-pointer`}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => onClick && onClick(stat.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">{stat.value}</span>
                      {stat.badgeText && (
                        <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border border-purple-500/20">
                          {stat.badgeText}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(stat.status)}
                    {stat.trend !== 0 && (
                      stat.trend > 0 ? (
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-rose-500" />
                      )
                    )}
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{stat.trendText}</span>
                    <span>{stat.progress}%</span>
                  </div>
                  <Progress 
                    value={stat.progress} 
                    className="h-1.5 bg-background/50" 
                    indicatorClassName={stat.progressColor}
                  />
                </div>
                
                {/* Glow effect overlay */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${stat.bgGradient} opacity-0 
                  hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Click to view details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};
