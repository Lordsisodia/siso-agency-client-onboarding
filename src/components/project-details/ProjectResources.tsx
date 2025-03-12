
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Project } from '@/components/project-details/types';
import { FileText, Link, FileCode, Database, Image } from 'lucide-react';

interface ProjectResourcesProps {
  project: Project;
  isDemo: boolean;
}

export const ProjectResources: React.FC<ProjectResourcesProps> = ({ project, isDemo }) => {
  // Sample resources for demo purposes or if resources are not defined
  const defaultResources = [
    { id: '1', name: 'Project Documentation', type: 'document', url: '#' },
    { id: '2', name: 'API Documentation', type: 'link', url: '#' },
    { id: '3', name: 'Source Code Repository', type: 'code', url: '#' },
    { id: '4', name: 'Database Schema', type: 'database', url: '#' },
    { id: '5', name: 'UI Design Assets', type: 'image', url: '#' }
  ];
  
  // Use project resources if they exist, otherwise use default resources
  const resources = project.details?.resources || defaultResources;

  // Get appropriate icon based on resource type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'link':
        return <Link className="w-5 h-5 text-purple-500" />;
      case 'code':
        return <FileCode className="w-5 h-5 text-amber-500" />;
      case 'database':
        return <Database className="w-5 h-5 text-green-500" />;
      case 'image':
        return <Image className="w-5 h-5 text-pink-500" />;
      default:
        return <FileText className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <Card className="bg-background/60 backdrop-blur border-slate-800/30">
      <CardHeader>
        <CardTitle className="text-xl">Project Resources</CardTitle>
      </CardHeader>
      <CardContent>
        {resources.length === 0 ? (
          <p className="text-slate-400">No resources available for this project.</p>
        ) : (
          <div className="space-y-3">
            {resources.map((resource) => (
              <div key={resource.id} className="flex items-center p-3 rounded-md bg-slate-800/40 hover:bg-slate-800/60 transition-all">
                <div className="mr-3">
                  {getResourceIcon(resource.type)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{resource.name}</h4>
                </div>
                <a 
                  href={resource.url} 
                  className="text-sm px-3 py-1 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
                  onClick={(e) => isDemo && e.preventDefault()}
                >
                  View
                </a>
              </div>
            ))}
          </div>
        )}
        
        {isDemo && (
          <p className="text-xs text-slate-400 mt-4">
            Note: Resource links are disabled in demo mode.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectResources;
