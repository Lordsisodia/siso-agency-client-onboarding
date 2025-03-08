
import { useNavigate } from 'react-router-dom';
import { BellIcon, UserIcon, SearchIcon } from 'lucide-react';
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
      className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4"
    >
      <div>
        <GradientHeading variant="rainbow" size="md" weight="bold" className="mb-1">
          Welcome{loading ? '' : userData.fullName ? `, ${userData.fullName}` : ''}
        </GradientHeading>
        <p className="text-siso-text/70 text-sm">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="relative hidden md:flex max-w-[320px]">
          <Input 
            type="text" 
            placeholder="Search projects..." 
            className="pr-8 bg-gradient-to-r from-siso-bg to-siso-bg/95 border border-siso-border"
          />
          <SearchIcon className="absolute right-2.5 top-2.5 h-4 w-4 text-siso-text/50" />
        </div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="ghost" size="icon" className="relative">
            <BellIcon className="h-5 w-5 text-siso-text" />
            <span className="absolute -top-1 -right-1 bg-siso-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Button>
        </motion.div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleProfileClick}
                className="will-change-transform"
              >
                <Card className="flex items-center p-2 bg-gradient-to-r from-siso-bg to-siso-bg/95 border border-siso-border cursor-pointer hover:border-siso-orange/40 transition-colors">
                  {userData.avatarUrl ? (
                    <img 
                      src={supabase.storage.from('avatars').getPublicUrl(userData.avatarUrl).data.publicUrl}
                      alt="Profile" 
                      className="h-8 w-8 rounded-full mr-2"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-siso-orange/20 flex items-center justify-center mr-2">
                      <UserIcon className="h-4 w-4 text-siso-orange" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-siso-text max-w-[120px] truncate">
                    {loading ? 'Loading...' : (userData.fullName || 'Your Profile')}
                  </span>
                </Card>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>View your profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.div>
  );
};
