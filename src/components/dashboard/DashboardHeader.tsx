
import { BellIcon, UserIcon } from 'lucide-react';
import { useBasicUserData } from '@/hooks/useBasicUserData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

export const DashboardHeader = () => {
  const { userData, loading } = useBasicUserData();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-between items-center mb-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-siso-text-bold">
          Welcome{loading ? '' : userData.fullName ? `, ${userData.fullName}` : ''}
        </h1>
        <p className="text-siso-text/70 text-sm">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <BellIcon className="h-5 w-5 text-siso-text" />
          <span className="absolute -top-1 -right-1 bg-siso-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </Button>
        
        <Card className="flex items-center p-2 bg-gradient-to-r from-siso-bg to-siso-bg/95 border border-siso-border cursor-pointer hover:border-siso-orange/40 transition-colors">
          {userData.avatarUrl ? (
            <img 
              src={userData.avatarUrl} 
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
      </div>
    </motion.div>
  );
};
