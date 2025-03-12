
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Sparkles } from 'lucide-react';
import { Project } from './types';

interface ProjectFeaturesProps {
  project: Project;
}

export const ProjectFeatures: React.FC<ProjectFeaturesProps> = ({ project }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="mr-2 h-5 w-5 text-siso-orange" />
            Core Features
          </CardTitle>
          <CardDescription>
            Essential functionality for the minimum viable product
          </CardDescription>
        </CardHeader>
        <CardContent>
          {project.details?.features?.core && project.details.features.core.length > 0 ? (
            <ul className="space-y-2">
              {project.details.features.core.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500 mt-1" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No core features defined yet.</p>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-siso-orange" />
            Additional Features
          </CardTitle>
          <CardDescription>
            Nice-to-have features for enhanced functionality
          </CardDescription>
        </CardHeader>
        <CardContent>
          {project.details?.features?.extras && project.details.features.extras.length > 0 ? (
            <ul className="space-y-2">
              {project.details.features.extras.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Sparkles className="mr-2 h-4 w-4 text-blue-500 mt-1" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No additional features defined yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
