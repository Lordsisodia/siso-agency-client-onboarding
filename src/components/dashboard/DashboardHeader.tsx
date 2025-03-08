
import { useNavigate } from 'react-router-dom';
import { BellIcon, UserIcon, SearchIcon, Menu } from 'lucide-react';
import { useBasicUserData } from '@/hooks/useBasicUserData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { GradientHeading } from '@/components/ui/gradient-heading';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { supabase } from '@/integrations/supabase/client';

export const DashboardHeader = () => {
  const { userData, loading } = useBasicUserData();
  const navigate = useNavigate();
  
  const handleProfileClick = () => {
    navigate('/profile');
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-5 pb-5 border-b border-siso-border/20"
    >
      <div className="space-y-2">
        <GradientHeading variant="rainbow" size="md" weight="bold" className="mb-1 !text-2xl !leading-tight tracking-tight">
          Welcome{loading ? '' : userData?.fullName ? `, ${userData.fullName.split(' ')[0]}` : ''}
        </GradientHeading>
        <p className="text-siso-text/70 text-sm font-medium tracking-wide">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden md:flex max-w-[320px]">
          <Input 
            type="text" 
            placeholder="Search across projects..." 
            className="pr-9 bg-gradient-to-r from-siso-bg/80 to-siso-bg/60 border-siso-border/40 focus:border-siso-orange/50 pl-10 text-sm font-medium"
          />
          <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-siso-text/50" />
        </div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <BellIcon className="h-5 w-5 text-siso-text" />
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-siso-red to-siso-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-md font-medium">
                    3
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-medium">View notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleProfileClick}
                className="will-change-transform cursor-pointer"
              >
                <Card className="flex items-center p-2.5 bg-gradient-to-r from-siso-bg/80 to-siso-bg/60 border border-siso-border/50 hover:border-siso-orange/40 transition-colors shadow-sm">
                  {userData?.avatarUrl ? (
                    <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-siso-orange/20 mr-3">
                      <img 
                        src={supabase.storage.from('avatars').getPublicUrl(userData.avatarUrl).data.publicUrl}
                        alt="Profile" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-siso-red/20 to-siso-orange/20 flex items-center justify-center mr-3 border border-siso-border/50">
                      <UserIcon className="h-4 w-4 text-siso-orange" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-siso-text max-w-[120px] truncate">
                    {loading ? 'Loading...' : (userData?.fullName || 'Your Profile')}
                  </span>
                </Card>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs font-medium">View your profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  );
};
