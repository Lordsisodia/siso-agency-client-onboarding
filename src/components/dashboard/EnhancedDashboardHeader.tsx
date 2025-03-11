
import React, { useState } from 'react';
import { Bell, Settings, ChevronDown, UserCircle, LogOut, UserCog } from 'lucide-react';
import { DashboardStats } from '@/types/dashboard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuthSession } from '@/hooks/useAuthSession';

interface DashboardHeaderProps {
  userName: string;
  greeting: string;
  stats?: DashboardStats;
}

export const EnhancedDashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  greeting,
  stats
}) => {
  const navigate = useNavigate();
  const {
    handleSignOut
  } = useAuthSession();
  const [showDropdown, setShowDropdown] = useState(false);

  // Enhanced greeting with emoji based on time of day
  const getGreetingEmoji = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '🌅'; // Morning
    if (hour < 18) return '☀️'; // Afternoon
    return '🌙'; // Evening
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <motion.div className="flex flex-col" initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }}>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">
              {getGreetingEmoji()} {greeting}, {userName}!
            </h1>
          </div>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your projects today
          </p>
        </motion.div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/notifications')} className="relative">
            <Bell className="h-5 w-5" />
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 animate-pulse shadow-glow" glow>
              3
            </Badge>
          </Button>
          
          <DropdownMenu open={showDropdown} onOpenChange={setShowDropdown}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2 border-border/40 bg-background/50 hover:bg-background/80">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/avatar-placeholder.png" alt={userName} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500/30 to-indigo-500/30 text-xs">
                    {userName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm hidden md:inline">{userName}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-sm border-border/50">
              <div className="flex items-center justify-start p-2 gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar-placeholder.png" alt={userName} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500/30 to-indigo-500/30">
                    {userName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{userName}</span>
                  <span className="text-xs text-muted-foreground">Premium User</span>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile')}>
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/preferences')}>
                <UserCog className="mr-2 h-4 w-4" />
                <span>Preferences</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/organization')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Organization</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {stats && <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Active Projects" value={stats.activeProjects || 0} onClick={() => navigate('/projects')} color="indigo" />
          <StatCard label="Pending Tasks" value={stats.pendingTasks || 0} onClick={() => navigate('/tasks')} color="amber" />
          <StatCard label="Upcoming Events" value={stats.upcomingEvents || 0} onClick={() => navigate('/calendar')} color="emerald" />
          <StatCard label="Login Streak" value={stats.loginStreak || 0} badgeText={stats.loginStreak && stats.loginStreak > 5 ? "Impressive!" : undefined} color="purple" />
        </div>}
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: number;
  badgeText?: string;
  onClick?: () => void;
  color?: 'indigo' | 'amber' | 'emerald' | 'purple' | 'rose';
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  badgeText,
  onClick,
  color = 'indigo'
}) => {
  const colorClasses = {
    indigo: 'from-indigo-500/20 to-indigo-600/10 hover:from-indigo-500/30 hover:to-indigo-600/20 text-indigo-500',
    amber: 'from-amber-500/20 to-amber-600/10 hover:from-amber-500/30 hover:to-amber-600/20 text-amber-500',
    emerald: 'from-emerald-500/20 to-emerald-600/10 hover:from-emerald-500/30 hover:to-emerald-600/20 text-emerald-500',
    purple: 'from-purple-500/20 to-purple-600/10 hover:from-purple-500/30 hover:to-purple-600/20 text-purple-500',
    rose: 'from-rose-500/20 to-rose-600/10 hover:from-rose-500/30 hover:to-rose-600/20 text-rose-500'
  };
  
  return (
    <div
      className={`bg-gradient-to-br ${colorClasses[color]} p-4 rounded-lg border border-border/30 cursor-pointer transition-all duration-200 hover:shadow-md`}
      onClick={onClick}
    >
      <div className="font-semibold text-2xl">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
      {badgeText && (
        <Badge variant="outline" className="mt-2 bg-background/60 border-none text-xs">
          {badgeText}
        </Badge>
      )}
    </div>
  );
};
