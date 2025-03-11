
import React from 'react';
import { Project } from './ProjectsOverview';
import { Button } from '@/components/ui/button';
import { ExternalLink, Edit, TrendingUp, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();
  
  // Calculate overall progress
  const overallProgress = Math.round(
    project.phases.reduce((acc, phase) => acc + phase.progress, 0) / project.phases.length
  );
  
  // Format deadline
  const formattedDeadline = new Date(project.deadline).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  // Determine status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'pending': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };
  
  // Format currency
  const formatCurrency = (value?: number) => {
    if (value === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="border border-border rounded-lg p-4 bg-card/50 hover:bg-card/80 transition-colors h-full flex flex-col">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg line-clamp-1">{project.title}</h3>
        <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
          {formattedDeadline}
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
      
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{overallProgress}%</span>
        </div>
        <Progress 
          value={overallProgress} 
          className="h-1.5 bg-background/50" 
          indicatorClassName="bg-primary"
        />
      </div>
      
      {project.financials && (
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          <div className="bg-green-500/10 p-2 rounded">
            <div className="font-medium">Market Value</div>
            <div className="font-bold">{formatCurrency(project.financials.marketValue)}</div>
          </div>
          <div className="bg-blue-500/10 p-2 rounded">
            <div className="font-medium">Cost Savings</div>
            <div className="font-bold">{formatCurrency(project.financials.costSavings)}</div>
          </div>
          <div className="bg-yellow-500/10 p-2 rounded">
            <div className="font-medium">Dev Cost</div>
            <div className="font-bold">{formatCurrency(project.financials.developmentCost)}</div>
          </div>
          <div className="bg-purple-500/10 p-2 rounded">
            <div className="font-medium">ROI</div>
            <div className="font-bold">{project.financials.roi}%</div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-5 gap-1 mb-3">
        {project.phases.map((phase, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-4 h-4 rounded-full ${getStatusColor(phase.status)} mb-1`} 
                  />
                  <span className="text-xs text-center leading-tight">{phase.name}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{phase.name}: {phase.progress}% Complete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {project.tags.map((tag, index) => (
          <span 
            key={index}
            className="bg-muted px-2 py-0.5 rounded-md text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="mt-auto flex justify-between gap-2 pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 flex items-center justify-center gap-1"
          onClick={() => navigate(`/projects/${project.id}`)}
        >
          <ExternalLink size={14} /> View
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 flex items-center justify-center gap-1"
          onClick={() => navigate(`/plan-builder/${project.id}`)}
        >
          <Edit size={14} /> Edit
        </Button>
      </div>
    </div>
  );
};
