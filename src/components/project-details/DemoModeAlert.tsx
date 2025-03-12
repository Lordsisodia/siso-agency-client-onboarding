
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export const DemoModeAlert: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <Alert variant="warning" className="bg-amber-500/10 border-amber-500/50">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Demo Mode</AlertTitle>
        <AlertDescription>
          You're viewing a sample project in demo mode. 
          <Button 
            variant="link" 
            className="p-0 h-auto font-semibold text-amber-500 hover:text-amber-600"
            onClick={() => navigate('/auth')}
          >
            Sign in
          </Button> to create and manage your own projects.
        </AlertDescription>
      </Alert>
    </motion.div>
  );
};
