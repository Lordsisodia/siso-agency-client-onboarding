import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  Code, 
  FileText, 
  FolderKanban, 
  ListChecks, 
  Plus, 
  Settings 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Define valid priority types
export type PriorityLevel = 'low' | 'medium' | 'high';

interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  priority: PriorityLevel;
  dueDate: string;
  tasks: { total: number; completed: number };
}

export const ProjectsOverview = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<'list' | 'grid'>('list');
  
  // Sample projects data
  const projects: Project[] = [
    {
      id: 'proj-1',
      title: 'Website Redesign',
      description: 'Redesign and launch the company website with new branding.',
      progress: 75,
      priority: 'high',
      dueDate: '2023-12-15',
      tasks: { total: 24, completed: 18 }
    },
    {
      id: 'proj-2',
      title: 'Mobile App Development',
      description: 'Create a mobile application for customer engagement.',
      progress: 45,
      priority: 'medium',
      dueDate: '2024-01-30',
      tasks: { total: 36, completed: 16 }
    },
    {
      id: 'proj-3',
      title: 'Marketing Campaign',
      description: 'Launch Q1 marketing campaign for new products.',
      progress: 10,
      priority: 'high',
      dueDate: '2023-12-22',
      tasks: { total: 18, completed: 2 }
    }
  ];
  
  const getPriorityClass = (priority: PriorityLevel) => {
    switch(priority) {
      case 'high':
        return 'text-red-500 bg-red-500/10';
      case 'medium':
        return 'text-amber-500 bg-amber-500/10';
      case 'low':
        return 'text-green-500 bg-green-500/10';
      default:
        return 'text-blue-500 bg-blue-500/10';
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };
  
  const getProgressColor = (progress: number) => {
    if (progress < 25) return 'bg-blue-500';
    if (progress < 50) return 'bg-amber-500';
    if (progress < 75) return 'bg-emerald-500';
    return 'bg-green-500';
  };

  
  return (
    <Card className="border border-siso-border/40 bg-siso-bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Projects</CardTitle>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/new-project')}
            className="text-xs text-siso-text-muted hover:text-siso-text px-2 h-8"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            New Project
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setView('list')}
            className={`text-xs px-2 h-8 ${view === 'list' ? 'text-siso-primary bg-siso-primary/10' : 'text-siso-text-muted'}`}
          >
            <ListChecks className="h-3.5 w-3.5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setView('grid')}
            className={`text-xs px-2 h-8 ${view === 'grid' ? 'text-siso-primary bg-siso-primary/10' : 'text-siso-text-muted'}`}
          >
            <FolderKanban className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {view === 'list' ? (
          <div className="space-y-3">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="p-3 rounded-lg border border-siso-border/20 hover:border-siso-border/40 transition-colors bg-siso-bg-card/50"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-sm">{project.title}</h4>
                    <p className="text-xs text-siso-text-muted">{project.description}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityClass(project.priority)}`}>
                    {project.priority}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1 text-xs text-siso-text-muted">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(project.dueDate).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-siso-text-muted">
                    <ListChecks className="h-3 w-3" />
                    <span>{project.tasks.completed}/{project.tasks.total} tasks</span>
                  </div>
                  
                  <div className="flex-1 text-right">
                    <Button 
                      variant="link" 
                      className="text-xs text-siso-primary p-0 h-auto"
                      onClick={() => navigate(`/plan-builder/${project.id}`)}
                    >
                      View Project
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="w-full h-1.5 bg-siso-bg-card/60 rounded-full mt-3 overflow-hidden">
                  <div 
                    className={`h-full ${
                      project.progress < 25 ? 'bg-blue-500' :
                      project.progress < 50 ? 'bg-amber-500' :
                      project.progress < 75 ? 'bg-emerald-500' :
                      'bg-green-500'
                    } rounded-full`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="p-4 rounded-lg border border-siso-border/20 hover:border-siso-border/40 transition-colors bg-siso-bg-card/50"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium">{project.title}</h4>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityClass(project.priority)}`}>
                    {project.priority}
                  </div>
                </div>
                
                <p className="text-xs text-siso-text-muted mb-3">{project.description}</p>
                
                <div className="flex items-center justify-between text-xs text-siso-text-muted mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{new Date(project.dueDate).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <ListChecks className="h-3.5 w-3.5" />
                    <span>{project.tasks.completed}/{project.tasks.total}</span>
                  </div>
                </div>
                
                {/* Progress indicator */}
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium">Progress</span>
                  <span className="text-xs font-semibold">{project.progress}%</span>
                </div>
                
                <div className="w-full h-2 bg-siso-bg-card/60 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      project.progress < 25 ? 'bg-blue-500' :
                      project.progress < 50 ? 'bg-amber-500' :
                      project.progress < 75 ? 'bg-emerald-500' :
                      'bg-green-500'
                    } rounded-full`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={() => navigate(`/plan-builder/${project.id}`)}
                    className="text-xs"
                  >
                    View Project
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <Button 
          variant="ghost" 
          className="w-full mt-4 text-sm text-siso-text-muted hover:text-siso-text"
          onClick={() => navigate('/projects')}
        >
          View All Projects
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
};
