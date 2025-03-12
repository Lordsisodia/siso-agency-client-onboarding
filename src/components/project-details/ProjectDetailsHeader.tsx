
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Edit, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Project } from './types';

interface ProjectDetailsHeaderProps {
  project: Project;
  isDemo: boolean;
}

export const ProjectDetailsHeader: React.FC<ProjectDetailsHeaderProps> = ({ project, isDemo }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => navigate('/projects')} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-siso-red to-siso-orange text-transparent bg-clip-text">
            {project.title}
          </h1>
          <div className="flex items-center mt-2 text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            <span>Created {format(new Date(project.created_at), 'MMMM d, yyyy')}</span>
            <span className="mx-2">•</span>
            <Badge variant={project.status === 'active' ? 'default' : 'outline'}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </Badge>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => {
            if (isDemo) {
              toast({
                title: "Demo Mode",
                description: "Sign in to edit projects.",
                variant: "default"
              });
              return;
            }
            // Handle edit functionality
          }}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Project
          </Button>
          <Button 
            className="bg-gradient-to-r from-siso-red to-siso-orange"
            onClick={() => {
              if (isDemo) {
                toast({
                  title: "Demo Mode",
                  description: "Sign in to continue planning.",
                  variant: "default"
                });
                return;
              }
              navigate(`/new-project?projectId=${project.id}`)
            }}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Continue Planning
          </Button>
        </div>
      </div>
      
      {project.description && (
        <p className="mt-4 text-muted-foreground max-w-prose">
          {project.description}
        </p>
      )}
    </div>
  );
};
