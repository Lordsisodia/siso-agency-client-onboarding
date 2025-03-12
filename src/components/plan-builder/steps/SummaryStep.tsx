
import React from 'react';
import { Button } from '@/components/ui/button';

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
    projectType: string;
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
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-1">Looking good! Here's a summary</h3>
        <p className="text-muted-foreground">Review your information before we create your project</p>
      </div>
      
      <div className="space-y-4 bg-muted/50 p-4 rounded-lg">
        <div className="grid gap-2">
          <div>
            <span className="font-medium">Company:</span> {projectData.businessContext.companyName || "Not specified"}
          </div>
          
          {projectData.businessContext.website && (
            <div>
              <span className="font-medium">Website:</span> {projectData.businessContext.website}
            </div>
          )}
          
          {hasSocialLinks && (
            <div>
              <span className="font-medium">Social Media:</span> {Object.entries(projectData.businessContext.socialLinks)
                .filter(([_, value]) => value.trim() !== '')
                .map(([platform]) => platform)
                .join(', ')}
            </div>
          )}
          
          <div>
            <span className="font-medium">Industry:</span> {projectData.businessContext.industry || "Not specified"}
          </div>
          
          {projectData.businessContext.targetAudience && (
            <div>
              <span className="font-medium">Target Audience:</span> {projectData.businessContext.targetAudience}
            </div>
          )}
          
          <div>
            <span className="font-medium">Main Goal:</span> {projectData.goals || "Not specified"}
          </div>
        </div>
      </div>
      
      <div className="pt-4 space-y-2">
        <Button 
          onClick={onComplete}
          className="w-full"
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
