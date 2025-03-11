
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Briefcase, ClipboardCheck, Calendar, Award, Loader2 } from 'lucide-react';
import { DashboardStats } from '@/types/dashboard';

interface QuickStatsPanelProps {
  stats: DashboardStats;
  loading?: boolean;
  onClick?: (statType: string) => void;
}

export const EnhancedQuickStatsPanel: React.FC<QuickStatsPanelProps> = ({ 
  stats,
  loading = false,
  onClick
}) => {
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);

  const statItems = [
    {
      title: 'Active Projects',
      value: stats.activeProjects,
      icon: <Briefcase size={18} />,
      color: 'bg-gradient-to-br from-blue-500/10 to-blue-600/5',
      borderColor: 'border-blue-500/20',
      textColor: 'text-blue-400',
      iconColor: 'text-blue-400',
      hoverBorderColor: 'hover:border-blue-500/40',
      type: 'projects'
    },
    {
      title: 'Pending Tasks',
      value: stats.pendingTasks,
      icon: <ClipboardCheck size={18} />,
      color: 'bg-gradient-to-br from-amber-500/10 to-amber-600/5',
      borderColor: 'border-amber-500/20',
      textColor: 'text-amber-400',
      iconColor: 'text-amber-400',
      hoverBorderColor: 'hover:border-amber-500/40',
      type: 'tasks'
    },
    {
      title: 'Upcoming Events',
      value: stats.upcomingEvents,
      icon: <Calendar size={18} />,
      color: 'bg-gradient-to-br from-purple-500/10 to-purple-600/5',
      borderColor: 'border-purple-500/20',
      textColor: 'text-purple-400',
      iconColor: 'text-purple-400', 
      hoverBorderColor: 'hover:border-purple-500/40',
      type: 'events'
    },
    {
      title: 'Login Streak',
      value: stats.loginStreak,
      icon: <Award size={18} />,
      color: 'bg-gradient-to-br from-siso-red/10 to-siso-orange/5',
      borderColor: 'border-siso-orange/20',
      textColor: 'text-siso-orange',
      iconColor: 'text-siso-orange',
      hoverBorderColor: 'hover:border-siso-orange/40',
      type: 'streak'
    },
  ];

  const handleClick = (type: string) => {
    if (onClick) {
      onClick(type);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          whileHover={{ 
            y: -4, 
            transition: { duration: 0.2 } 
          }}
          className="h-full"
        >
          <Card 
            className={`relative border ${item.borderColor} ${item.hoverBorderColor} ${item.color} backdrop-blur-sm transition-all duration-300 overflow-hidden cursor-pointer h-full`}
            onClick={() => handleClick(item.type)}
            onMouseEnter={() => setHoveredStat(item.type)}
            onMouseLeave={() => setHoveredStat(null)}
          >
            {/* Background gradient that fades in on hover */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity"
              animate={{ opacity: hoveredStat === item.type ? 0.2 : 0 }}
              transition={{ duration: 0.3 }}
            />
            
            <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
              <div className={`rounded-full p-2 ${item.color} ${item.iconColor} mt-1`}>
                {item.icon}
              </div>
              
              <h3 className="text-sm font-medium text-gray-400">{item.title}</h3>
              
              {loading ? (
                <div className="flex justify-center my-1">
                  <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                </div>
              ) : (
                <div className={`text-2xl font-semibold ${item.textColor}`}>
                  {item.value}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
