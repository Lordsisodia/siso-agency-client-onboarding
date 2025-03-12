
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Project } from './types';

interface ProjectTimelineProps {
  project: Project;
  isDemo: boolean;
}

export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ project, isDemo }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-siso-orange" />
          Development Timeline
        </CardTitle>
        <CardDescription>
          Estimated project phases and milestones
        </CardDescription>
      </CardHeader>
      <CardContent>
        {project.details?.timeline?.phases && project.details.timeline.phases.length > 0 ? (
          <div className="space-y-6">
            {project.details.timeline.phases.map((phase, index) => (
              <div key={index} className="border-l-2 border-siso-orange/50 pl-4 pb-2">
                <div className="flex items-center mb-2">
                  <h3 className="text-lg font-semibold">{phase.name}</h3>
                  <Badge variant="outline" className="ml-2">{phase.duration}</Badge>
                </div>
                <ul className="space-y-1">
                  {phase.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="text-sm text-muted-foreground">
                      • {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
            <p className="text-muted-foreground mb-4">No timeline has been created yet.</p>
            <Button onClick={() => {
              if (isDemo) {
                toast({
                  title: "Demo Mode",
                  description: "Sign in to continue planning.",
                  variant: "default"
                });
                return;
              }
              navigate(`/new-project?projectId=${project.id}`)
            }}>
              Plan Timeline
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
