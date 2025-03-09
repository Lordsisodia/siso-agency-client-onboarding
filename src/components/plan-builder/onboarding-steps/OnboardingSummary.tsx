
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit2, Check } from 'lucide-react';
import { featureOptions } from '../types';

interface OnboardingSummaryProps {
  projectData: any;
  onEdit: (stepIndex: number) => void;
}

export function OnboardingSummary({ projectData, onEdit }: OnboardingSummaryProps) {
  const selectedFeatures = Object.entries(projectData.features || {})
    .filter(([_, value]: [string, any]) => value.selected)
    .map(([id, value]: [string, any]) => {
      const feature = featureOptions.find(f => f.id === id);
      return {
        name: feature?.name || id,
        priority: value.priority
      };
    });

  const priorityFeatures = selectedFeatures.filter(f => f.priority === 'must-have');
  const niceToHaveFeatures = selectedFeatures.filter(f => f.priority === 'nice-to-have');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <motion.h3
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-2 bg-gradient-to-r from-siso-red to-siso-orange bg-clip-text text-transparent"
        >
          Project Summary
        </motion.h3>
        <p className="text-muted-foreground">Here's a summary of the information you've provided</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <SummaryCard 
          title="Project Details" 
          onEdit={() => onEdit(1)}
          items={[
            { label: 'Type', value: projectData.projectType },
            { label: 'Scale', value: projectData.projectScale },
          ]}
        />
        
        <SummaryCard 
          title="Business Information" 
          onEdit={() => onEdit(3)}
          items={[
            { label: 'Company', value: projectData.businessContext.companyName || 'Not specified' },
            { label: 'Industry', value: projectData.businessContext.industry || 'Not specified' },
            { label: 'Target Audience', value: projectData.businessContext.targetAudience || 'Not specified' },
            { label: 'Team Size', value: projectData.businessContext.teamSize || 'Not specified' },
          ]}
        />
        
        <SummaryCard 
          title="Timeline & Budget" 
          onEdit={() => onEdit(4)}
          items={[
            { label: 'Timeline', value: projectData.timelineBudget.timeline },
            { label: 'Budget', value: projectData.timelineBudget.budget },
            { label: 'Goals', value: projectData.timelineBudget.goals || 'Not specified' },
          ]}
        />
        
        <SummaryCard 
          title="Selected Features" 
          onEdit={() => onEdit(2)}
          items={[
            { 
              label: 'Must-have', 
              value: priorityFeatures.length > 0 
                ? priorityFeatures.map(f => f.name).join(', ') 
                : 'None selected',
              type: 'list'
            },
            { 
              label: 'Nice-to-have', 
              value: niceToHaveFeatures.length > 0 
                ? niceToHaveFeatures.map(f => f.name).join(', ') 
                : 'None selected',
              type: 'list'
            },
          ]}
        />
      </div>
    </div>
  );
}

function SummaryCard({ 
  title, 
  items, 
  onEdit 
}: { 
  title: string;
  items: Array<{ label: string; value: string; type?: 'text' | 'list' }>;
  onEdit: () => void;
}) {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onEdit} className="h-8 px-2">
            <Edit2 className="w-3.5 h-3.5 mr-1" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="text-sm">
          <dl className="space-y-2">
            {items.map((item) => (
              <div key={item.label} className="grid grid-cols-3 gap-1">
                <dt className="col-span-1 font-medium text-muted-foreground">{item.label}:</dt>
                <dd className="col-span-2">
                  {item.type === 'list' ? (
                    <ul className="list-disc list-inside text-xs">
                      {item.value.split(', ').map(v => (
                        <li key={v} className="mb-1">{v}</li>
                      ))}
                    </ul>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
    </motion.div>
  );
}
