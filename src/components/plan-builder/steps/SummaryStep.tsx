
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Building, Globe, Share2, BarChart, Users, Target } from 'lucide-react';

interface SummaryStepProps {
  projectData: {
    businessContext: {
      companyName: string;
      website: string;
      socialLinks: {
        twitter: string;
        instagram: string;
        linkedin: string;
        facebook: string;
      };
      industry: string;
      targetAudience: string;
    };
    goals: string;
  };
  onComplete: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export const SummaryStep: React.FC<SummaryStepProps> = ({ 
  projectData, 
  onComplete, 
  onBack, 
  isLoading 
}) => {
  const hasSocialLinks = Object.values(projectData.businessContext.socialLinks).some(link => link.trim() !== '');
  
  const SummaryItem = ({ icon, title, value, empty = false }: { 
    icon: React.ReactNode, 
    title: string, 
    value: string,
    empty?: boolean
  }) => {
    if (empty) return null;
    
    return (
      <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
        <div className="bg-gradient-to-br from-siso-red to-siso-orange rounded-full p-2 flex-shrink-0">
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-sm text-muted-foreground">{title}</h4>
          <p className="font-medium">{value || "Not specified"}</p>
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-1 flex items-center gap-2">
          <CheckCircle2 className="text-green-500 w-6 h-6" />
          <span>Project Information Summary</span>
        </h3>
        <p className="text-muted-foreground">Review your information before we create your project</p>
      </div>
      
      <div className="space-y-4 bg-muted/30 p-5 rounded-lg border border-border">
        <SummaryItem 
          icon={<Building className="w-4 h-4 text-white" />} 
          title="Company" 
          value={projectData.businessContext.companyName} 
        />
        
        <SummaryItem 
          icon={<Globe className="w-4 h-4 text-white" />} 
          title="Website" 
          value={projectData.businessContext.website}
          empty={!projectData.businessContext.website} 
        />
        
        {hasSocialLinks && (
          <SummaryItem 
            icon={<Share2 className="w-4 h-4 text-white" />} 
            title="Social Media" 
            value={Object.entries(projectData.businessContext.socialLinks)
              .filter(([_, value]) => value.trim() !== '')
              .map(([platform]) => platform.charAt(0).toUpperCase() + platform.slice(1))
              .join(', ')} 
          />
        )}
        
        <SummaryItem 
          icon={<BarChart className="w-4 h-4 text-white" />} 
          title="Industry" 
          value={projectData.businessContext.industry} 
        />
        
        <SummaryItem 
          icon={<Users className="w-4 h-4 text-white" />} 
          title="Target Audience" 
          value={projectData.businessContext.targetAudience}
          empty={!projectData.businessContext.targetAudience} 
        />
        
        <SummaryItem 
          icon={<Target className="w-4 h-4 text-white" />} 
          title="Main Goal" 
          value={projectData.goals} 
        />
      </div>
      
      <div className="pt-4 space-y-2">
        <Button 
          onClick={onComplete}
          className="w-full bg-gradient-to-r from-siso-red to-siso-orange hover:opacity-90 transition-opacity"
          disabled={isLoading}
        >
          {isLoading ? "Creating your project..." : "Complete & Create Project"}
        </Button>
        
        <Button 
          variant="outline" 
          onClick={onBack}
          className="w-full"
          disabled={isLoading}
        >
          Go Back & Edit
        </Button>
      </div>
    </div>
  );
};
