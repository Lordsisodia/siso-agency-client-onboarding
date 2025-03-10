
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Edit } from 'lucide-react';

interface EnhancedOnboardingSummaryProps {
  projectData: {
    projectType: string;
    projectScale: string;
    businessContext: {
      companyName: string;
      industry: string;
      targetAudience: string;
      teamSize: string;
    };
    timelineBudget: {
      timeline: string;
      budget: string;
      goals: string;
    };
    features: Record<string, { selected: boolean; priority: string }>;
  };
  onEdit: (section: string) => void;
}

export const EnhancedOnboardingSummary: React.FC<EnhancedOnboardingSummaryProps> = ({
  projectData,
  onEdit
}) => {
  // Count selected features
  const selectedFeaturesCount = Object.values(projectData.features).filter(f => f.selected).length;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Project Summary</h2>
        <p className="text-muted-foreground">
          Here's a summary of your project details. Review and make any necessary changes before proceeding.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Project Type Section */}
        <Card className="relative">
          <button
            onClick={() => onEdit('projectType')}
            className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted"
            aria-label="Edit project type"
          >
            <Edit className="h-4 w-4" />
          </button>
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-2">Project Type</h3>
            <p>{projectData.projectType}</p>
            <Badge variant="outline" className="mt-2">{projectData.projectScale} scale</Badge>
          </CardContent>
        </Card>

        {/* Business Context Section */}
        <Card className="relative">
          <button
            onClick={() => onEdit('businessContext')}
            className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted"
            aria-label="Edit business context"
          >
            <Edit className="h-4 w-4" />
          </button>
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-2">Business Context</h3>
            <div className="space-y-2">
              <p><span className="text-muted-foreground">Company:</span> {projectData.businessContext.companyName}</p>
              <p><span className="text-muted-foreground">Industry:</span> {projectData.businessContext.industry}</p>
              <p><span className="text-muted-foreground">Target Audience:</span> {projectData.businessContext.targetAudience}</p>
              <p><span className="text-muted-foreground">Team Size:</span> {projectData.businessContext.teamSize}</p>
            </div>
          </CardContent>
        </Card>

        {/* Timeline & Budget Section */}
        <Card className="relative">
          <button
            onClick={() => onEdit('timelineBudget')}
            className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted"
            aria-label="Edit timeline and budget"
          >
            <Edit className="h-4 w-4" />
          </button>
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-2">Timeline & Budget</h3>
            <div className="space-y-2">
              <p><span className="text-muted-foreground">Timeline:</span> {projectData.timelineBudget.timeline}</p>
              <p><span className="text-muted-foreground">Budget:</span> {projectData.timelineBudget.budget}</p>
              <p><span className="text-muted-foreground">Goals:</span> {projectData.timelineBudget.goals}</p>
            </div>
          </CardContent>
        </Card>

        {/* Features Section */}
        <Card className="relative">
          <button
            onClick={() => onEdit('features')}
            className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted"
            aria-label="Edit features"
          >
            <Edit className="h-4 w-4" />
          </button>
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-2">Selected Features</h3>
            <p className="mb-2">{selectedFeaturesCount} features selected</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(projectData.features)
                .filter(([_, details]) => details.selected)
                .map(([name, details]) => (
                  <Badge key={name} variant="outline" className="flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    {name}
                    <span className="ml-1 text-xs opacity-70">({details.priority})</span>
                  </Badge>
                ))
                .slice(0, 5)}
              {selectedFeaturesCount > 5 && (
                <Badge variant="outline">+{selectedFeaturesCount - 5} more</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
