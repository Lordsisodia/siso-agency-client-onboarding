
import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Target, User, Sparkles } from 'lucide-react';
import { Project } from './types';

interface ProjectOverviewProps {
  project: Project;
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({ project }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5 text-siso-orange" />
              Project Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            {project.details?.goals ? (
              <p>{project.details.goals}</p>
            ) : (
              <p className="text-muted-foreground">No project goals defined yet.</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5 text-siso-orange" />
              Business Context
            </CardTitle>
          </CardHeader>
          <CardContent>
            {project.details?.business_context ? (
              <div className="space-y-2">
                <div className="flex">
                  <span className="w-32 font-medium">Industry:</span>
                  <span>{project.details.business_context.industry || "Not specified"}</span>
                </div>
                <div className="flex">
                  <span className="w-32 font-medium">Company:</span>
                  <span>{project.details.business_context.companyName || "Not specified"}</span>
                </div>
                <div className="flex">
                  <span className="w-32 font-medium">Scale:</span>
                  <span>{project.details.business_context.scale || "Not specified"}</span>
                </div>
                {project.details.business_context.target_audience && (
                  <div className="flex">
                    <span className="w-32 font-medium">Audience:</span>
                    <span>{project.details.business_context.target_audience.join(", ")}</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">No business context defined yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-siso-orange" />
            Project Summary
          </CardTitle>
          <CardDescription>
            Overall project information and progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none dark:prose-invert">
            <p>
              This project was created on {format(new Date(project.created_at), 'MMMM d, yyyy')} and 
              last updated on {format(new Date(project.updated_at), 'MMMM d, yyyy')}.
            </p>
            {project.details?.features && (
              <p>
                The project includes {project.details.features.core?.length || 0} core features
                {project.details.features.extras?.length ? ` and ${project.details.features.extras.length} additional features` : ''}.
              </p>
            )}
            {project.details?.timeline?.estimated_weeks && (
              <p>
                The estimated development time is {project.details.timeline.estimated_weeks} weeks.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
