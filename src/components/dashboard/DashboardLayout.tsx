
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { DashboardHeader } from './DashboardHeader';
import { DashboardSidebar } from './DashboardSidebar';
import { ProjectsOverview } from './ProjectsOverview';
import { ResourcesOverview } from './ResourcesOverview';

interface DashboardLayoutProps {
  userName?: string;
  stats?: any;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  userName = 'User',
  stats
}) => {
  const navigate = useNavigate();
  
  // Content animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-siso-bg overflow-x-hidden">
      {/* Dashboard Header */}
      <DashboardHeader userName={userName} />
      
      <div className="flex flex-1 px-4 md:px-8 pt-6 pb-10 gap-6">
        {/* Main Content */}
        <motion.div 
          className="flex-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 gap-6">
            {/* Projects Section */}
            <motion.div variants={itemVariants}>
              <ProjectsOverview />
            </motion.div>
            
            {/* Resources Section */}
            <motion.div variants={itemVariants}>
              <ResourcesOverview />
            </motion.div>
            
            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <QuickLinkButton 
                      title="Create New Project"
                      description="Start building a new plan" 
                      onClick={() => navigate('/new-project')}
                    />
                    <QuickLinkButton 
                      title="Resource Hub"
                      description="Access useful resources" 
                      onClick={() => navigate('/resource-hub')}
                    />
                    <QuickLinkButton 
                      title="Support"
                      description="Get help and guidance" 
                      onClick={() => navigate('/support')}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Dashboard Sidebar */}
        <div className="hidden lg:flex flex-col w-80 space-y-6">
          <DashboardSidebar />
        </div>
      </div>
    </div>
  );
};

// Quick Link Button Component
const QuickLinkButton = ({ 
  title, 
  description, 
  onClick 
}: { 
  title: string;
  description: string;
  onClick: () => void;
}) => {
  return (
    <Button
      variant="outline"
      className="flex flex-col items-start w-full h-auto py-4 px-4 border border-siso-border/40 hover:border-siso-border hover:bg-siso-bg-hover transition-colors"
      onClick={onClick}
    >
      <div className="flex justify-between w-full mb-1">
        <h4 className="font-medium text-base">{title}</h4>
        <ArrowUpRight className="h-4 w-4 text-siso-text-muted" />
      </div>
      <p className="text-sm text-siso-text-muted text-left">{description}</p>
    </Button>
  );
};
