
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Project } from './types';

interface ProjectResourcesProps {
  project: Project;
  isDemo: boolean;
}

export const ProjectResources: React.FC<ProjectResourcesProps> = ({ project, isDemo }) => {
  const { toast } = useToast();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Code className="mr-2 h-5 w-5 text-siso-orange" />
          Technical Resources
        </CardTitle>
        <CardDescription>
          Code, repositories, and documentation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-6">
          <Code className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
          <p className="text-muted-foreground mb-4">No technical resources have been added yet.</p>
          <Button onClick={() => {
            if (isDemo) {
              toast({
                title: "Demo Mode",
                description: "Sign in to add resources.",
                variant: "default"
              });
              return;
            }
            // Handle adding resources
          }}>
            Add Resources
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
