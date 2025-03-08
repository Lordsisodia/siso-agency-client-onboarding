
import { motion } from 'framer-motion';
import { Edit, Info, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface AnalysisGuideProps {
  isEditing: boolean;
  hasAnalysisData: boolean;
  onStartEditing: () => void;
  isAuthenticated: boolean;
}

export const AnalysisGuide = ({ isEditing, hasAnalysisData, onStartEditing, isAuthenticated }: AnalysisGuideProps) => {
  const navigate = useNavigate();
  
  if (isEditing) return null;
  
  return (
    <motion.div
      className="mb-8 p-6 rounded-xl border border-siso-border bg-black/30 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start">
        <div className="bg-siso-orange/10 p-3 rounded-full mr-4">
          <Info className="w-6 h-6 text-siso-orange" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-siso-text-bold mb-2">
            {isAuthenticated 
              ? (hasAnalysisData ? "Website information detected" : "Complete your company profile")
              : "Sign in to create your company profile"}
          </h3>
          <p className="text-siso-text/70 mb-4">
            {isAuthenticated 
              ? (hasAnalysisData 
                ? "We've analyzed your website and prepared information for your profile. Click 'Edit Profile' to review and save these details." 
                : "Click 'Edit Profile' to add your company information, upload logo and banner images, and customize your brand colors.")
              : "Create a free account to set up your company profile, analyze your website, and customize your brand colors."}
          </p>
          {isAuthenticated ? (
            <Button
              onClick={onStartEditing}
              className="bg-gradient-to-r from-siso-red to-siso-orange text-white hover:from-siso-red/90 hover:to-siso-orange/90"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <Button
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-siso-red to-siso-orange text-white hover:from-siso-red/90 hover:to-siso-orange/90"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Sign In to Continue
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
