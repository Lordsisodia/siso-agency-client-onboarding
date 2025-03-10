
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, FileText, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface Resource {
  id: string;
  title: string;
  type: 'document' | 'video' | 'guide';
  description: string;
}

export const ResourcesOverview = () => {
  const navigate = useNavigate();
  
  // Sample resources data
  const resources = [
    {
      id: 'res-1',
      title: 'Getting Started Guide',
      type: 'guide',
      description: 'Learn the basics of the platform and how to set up your first project.'
    },
    {
      id: 'res-2',
      title: 'Project Planning Best Practices',
      type: 'document',
      description: 'Tips and strategies for effective project planning and execution.'
    },
    {
      id: 'res-3',
      title: 'Platform Tutorial',
      type: 'video',
      description: 'Step-by-step video tutorial on using all platform features.'
    }
  ];
  
  const getResourceIcon = (type: string) => {
    switch(type) {
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'guide':
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };
  
  return (
    <Card className="border border-siso-border/40 bg-siso-bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {resources.map((resource) => (
            <div 
              key={resource.id}
              className="p-3 rounded-lg border border-siso-border/20 hover:border-siso-border/40 transition-colors bg-siso-bg-card/50"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-siso-primary/10 rounded-md text-siso-primary">
                    {getResourceIcon(resource.type)}
                  </div>
                  <h4 className="font-medium text-sm">{resource.title}</h4>
                </div>
              </div>
              <p className="text-xs text-siso-text-muted mb-2">{resource.description}</p>
              <Button 
                variant="link" 
                className="text-xs text-siso-primary p-0 h-auto"
                onClick={() => navigate('/resource-hub')}
              >
                View Resource
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          ))}
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full mt-4 text-sm text-siso-text-muted hover:text-siso-text"
          onClick={() => navigate('/resource-hub')}
        >
          Browse All Resources
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
};
