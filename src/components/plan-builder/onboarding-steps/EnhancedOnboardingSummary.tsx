
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Edit } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface EnhancedOnboardingSummaryProps {
  projectData: any;
  onEdit: (section: string) => void;
}

export const EnhancedOnboardingSummary: React.FC<EnhancedOnboardingSummaryProps> = ({
  projectData,
  onEdit
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Project Summary</h1>
        <p className="text-muted-foreground mt-2">
          Review your project details before finalizing
        </p>
      </div>

      <div className="grid gap-6">
        {/* Project Type Section */}
        <SummarySection
          title="Project Type"
          onEdit={() => onEdit('projectType')}
          items={[
            { label: 'Project Type', value: projectData.projectType || 'Not specified' },
            { label: 'Project Scale', value: projectData.projectScale || 'Medium' }
          ]}
        />

        {/* Business Context Section */}
        <SummarySection
          title="Business Context"
          onEdit={() => onEdit('businessContext')}
          items={[
            { 
              label: 'Company Name', 
              value: projectData.businessContext?.companyName || 'Not specified' 
            },
            { 
              label: 'Industry', 
              value: projectData.businessContext?.industry || 'Not specified' 
            },
            { 
              label: 'Target Audience', 
              value: projectData.businessContext?.targetAudience || 'Not specified' 
            },
            { 
              label: 'Team Size', 
              value: projectData.businessContext?.teamSize || 'Not specified' 
            }
          ]}
        />

        {/* Timeline & Budget Section */}
        <SummarySection
          title="Timeline & Budget"
          onEdit={() => onEdit('timelineBudget')}
          items={[
            { 
              label: 'Timeline', 
              value: projectData.timelineBudget?.timeline || 'Not specified' 
            },
            { 
              label: 'Budget', 
              value: projectData.timelineBudget?.budget || 'Not specified' 
            },
            { 
              label: 'Goals', 
              value: projectData.timelineBudget?.goals || 'Not specified' 
            }
          ]}
        />

        {/* Features Section */}
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Selected Features</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1 text-sm"
                onClick={() => onEdit('features')}
              >
                <Edit className="h-3.5 w-3.5" />
                Edit
              </Button>
            </div>
            
            <div className="space-y-2">
              {Object.entries(projectData.features || {}).length > 0 ? (
                <ul className="grid gap-2 sm:grid-cols-2">
                  {Object.entries(projectData.features || {}).map(([feature, details]: [string, any]) => (
                    details.selected && (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">{feature}</span>
                          {details.priority && (
                            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                              {details.priority}
                            </span>
                          )}
                        </div>
                      </li>
                    )
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No features selected</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface SummarySectionProps {
  title: string;
  onEdit: () => void;
  items: { label: string; value: string }[];
}

const SummarySection: React.FC<SummarySectionProps> = ({ title, onEdit, items }) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 text-sm"
            onClick={onEdit}
          >
            <Edit className="h-3.5 w-3.5" />
            Edit
          </Button>
        </div>
        
        <dl className="grid gap-2 sm:grid-cols-2">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col">
              <dt className="text-sm text-muted-foreground">{item.label}</dt>
              <dd className="font-medium">{item.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
};

export default EnhancedOnboardingSummary;
