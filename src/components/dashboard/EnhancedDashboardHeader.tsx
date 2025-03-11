
import React from 'react';
import { DashboardStats } from '@/types/dashboard';
import { Bell, Search, Calendar, User, Menu, Settings, Sparkles } from 'lucide-react';
import { GradientHeading } from "@/components/ui/gradient-heading";
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';

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

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/5 mb-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col"
      >
        <h1 className="text-2xl font-bold tracking-tight">
          {greeting}, <GradientHeading variant="rainbow" size="sm">{userName}</GradientHeading>
        </h1>
        <p className="text-muted-foreground flex items-center gap-1 mt-1">
          <Sparkles className="h-3 w-3 text-siso-orange/70" />
          Here's what's happening with your projects today.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex items-center gap-3 self-end md:self-auto w-full md:w-auto"
      >
        <div className="relative hidden md:flex items-center w-60">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search..." 
            className="w-full pl-9 bg-black/20 border-white/10 text-sm focus:border-siso-primary/50 focus:ring-1 focus:ring-siso-primary/50" 
          />
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full relative bg-black/20 border-white/10 hover:bg-white/5">
                <Bell className="h-4 w-4" />
                {stats && stats.pendingTasks > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                    {stats.pendingTasks > 9 ? '9+' : stats.pendingTasks}
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-black/80 border-white/10 text-white">
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-black/20 border-white/10 hover:bg-white/5"
                onClick={() => handleNavigate('/calendar')}
              >
                <Calendar className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-black/80 border-white/10 text-white">
              <p>Calendar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-black/20 border-white/10 hover:bg-white/5"
                onClick={() => handleNavigate('/settings')}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-black/80 border-white/10 text-white">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="ml-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative rounded-full h-8 w-8 p-0 overflow-hidden bg-gradient-to-br from-siso-red/20 to-siso-orange/20 hover:from-siso-red/30 hover:to-siso-orange/30 border border-white/10">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-black/80 backdrop-blur-md border-white/10 text-white">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem onClick={() => handleNavigate('/profile')}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigate('/settings')}>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigate('/projects')}>My Projects</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>
    </div>
  );
};
