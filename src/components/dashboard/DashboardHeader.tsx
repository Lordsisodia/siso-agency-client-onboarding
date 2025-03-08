
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
import { Badge } from '@/components/ui/badge';

export const DashboardHeader = () => {
  const { userData, loading } = useBasicUserData();
  const navigate = useNavigate();
  
  const handleProfileClick = () => {
    navigate('/profile');
  };
  
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4 pb-4 border-b border-siso-border/20"
    >
      <motion.div variants={itemVariants}>
        <GradientHeading variant="rainbow" size="md" weight="bold" className="mb-1 !text-2xl">
          Welcome{loading ? '' : userData?.fullName ? `, ${userData.fullName.split(' ')[0]}` : ''}
        </GradientHeading>
        <p className="text-siso-text/70 text-sm">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </motion.div>
      
      <motion.div variants={itemVariants} className="flex items-center gap-3">
        <div className="relative hidden md:flex max-w-[320px]">
          <Input 
            type="text" 
            placeholder="Search across projects..." 
            className="pr-9 bg-gradient-to-r from-siso-bg/80 to-siso-bg/60 border-siso-border/40 focus:border-siso-orange/50 pl-10 transition-all duration-300 hover:border-siso-border/70"
          />
          <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-siso-text/50" />
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="ghost" size="icon" className="relative bg-siso-bg/30 border border-transparent hover:border-siso-border/30 hover:bg-siso-bg/50 transition-all duration-300">
                  <BellIcon className="h-5 w-5 text-siso-text hover:text-siso-orange transition-colors duration-300" />
                  <Badge className="absolute -top-1 -right-1 bg-gradient-to-r from-siso-red to-siso-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                    3
                  </Badge>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>You have 3 unread notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleProfileClick}
                className="will-change-transform cursor-pointer"
              >
                <Card className="flex items-center p-2 bg-gradient-to-r from-siso-bg/80 to-siso-bg/60 border border-siso-border/50 hover:border-siso-orange/40 transition-colors shadow-sm hover:shadow-md hover:shadow-siso-orange/10 duration-300">
                  {userData?.avatarUrl ? (
                    <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-siso-orange/20 mr-2 hover:border-siso-orange/40 transition-colors duration-300">
                      <img 
                        src={supabase.storage.from('avatars').getPublicUrl(userData.avatarUrl).data.publicUrl}
                        alt="Profile" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-siso-red/20 to-siso-orange/20 flex items-center justify-center mr-2 border border-siso-border/50">
                      <UserIcon className="h-4 w-4 text-siso-orange" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-siso-text max-w-[120px] truncate group-hover:text-siso-text-bold transition-colors duration-300">
                    {loading ? 'Loading...' : (userData?.fullName || 'Your Profile')}
                  </span>
                </Card>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>View your profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Button variant="ghost" size="icon" className="md:hidden bg-siso-bg/30 border border-transparent hover:border-siso-border/30 hover:bg-siso-bg/50 transition-all duration-300">
          <Menu className="h-5 w-5 hover:text-siso-orange transition-colors duration-300" />
        </Button>
      </motion.div>
    </motion.div>
  );
};
