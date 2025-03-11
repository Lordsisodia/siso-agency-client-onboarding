
import React from 'react';
import { Project } from './ProjectsOverview';
import { Button } from '@/components/ui/button';
import { ExternalLink, Edit, TrendingUp, TrendingDown, Check, Clock } from 'lucide-react';
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

  // Format currency
  const formatCurrency = (value?: number) => {
    if (value === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'pending': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="border border-border rounded-lg p-6 bg-card/50 hover:bg-card/80 transition-all">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Project Info Section */}
        <div className="md:col-span-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-lg line-clamp-1">{project.title}</h3>
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {formattedDeadline}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {project.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-muted">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Progress & Phases Section */}
        <div className="md:col-span-4">
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Overall Progress</span>
              <span>{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>

          <div className="space-y-2">
            {project.phases.map((phase, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(phase.status)}`} />
                      <div className="flex-1">
                        <div className="flex justify-between text-sm">
                          <span>{phase.name}</span>
                          <span>{phase.progress}%</span>
                        </div>
                        <Progress value={phase.progress} className="h-1" />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{phase.name}: {phase.progress}% Complete</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        {/* Financial Metrics Section */}
        <div className="md:col-span-4">
          {project.financials && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-500/10 p-3 rounded-lg">
                <div className="text-xs font-medium mb-1">Market Value</div>
                <div className="font-bold text-sm flex items-center gap-1">
                  {formatCurrency(project.financials.marketValue)}
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
              </div>
              
              <div className="bg-blue-500/10 p-3 rounded-lg">
                <div className="text-xs font-medium mb-1">Cost Savings</div>
                <div className="font-bold text-sm flex items-center gap-1">
                  {formatCurrency(project.financials.costSavings)}
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                </div>
              </div>
              
              <div className="bg-red-500/10 p-3 rounded-lg">
                <div className="text-xs font-medium mb-1">Dev Cost</div>
                <div className="font-bold text-sm flex items-center gap-1">
                  {formatCurrency(project.financials.developmentCost)}
                  <TrendingDown className="h-4 w-4 text-red-500" />
                </div>
              </div>
              
              <div className="bg-purple-500/10 p-3 rounded-lg">
                <div className="text-xs font-medium mb-1">ROI</div>
                <div className="font-bold text-sm flex items-center gap-1">
                  {project.financials.roi}%
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2 mt-4">
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
      </div>
    </div>
  );
};
