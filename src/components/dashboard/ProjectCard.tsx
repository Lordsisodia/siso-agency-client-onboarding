
import React from 'react';
import { Project } from '@/types/dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Edit, TrendingUp, TrendingDown, Check, Clock, DollarSign, Users, AlertTriangle, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from '@/components/ui/separator';

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

  // Calculate days remaining
  const daysRemaining = Math.ceil((new Date(project.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const isOverdue = daysRemaining < 0;

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

  // Calculate efficiency score (mock data for demo)
  const efficiencyScore = Math.min(100, Math.max(0, overallProgress + (project.financials?.costSavings || 0) / 1000 - (isOverdue ? 20 : 0)));
  
  // Risk level (mock data for demo)
  const riskLevel = isOverdue ? 'High' : overallProgress < 30 ? 'Medium' : 'Low';
  const getRiskColor = () => {
    switch (riskLevel) {
      case 'Low': return 'text-green-500';
      case 'Medium': return 'text-amber-500';
      case 'High': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <Card className="border-border/40 bg-card/50 hover:bg-card/80 shadow-md">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Header Section */}
          <div className="md:col-span-12 flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold">{project.title}</h2>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
            
            <div className="flex flex-col items-end mt-2 md:mt-0">
              <div className="flex gap-2 mb-2">
                {project.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-muted">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={isOverdue ? "destructive" : "outline"} className={isOverdue ? "" : "bg-primary/10 text-primary"}>
                  {isOverdue ? 'Overdue' : `Due: ${formattedDeadline}`}
                </Badge>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                  <Clock className="mr-1 h-3 w-3" /> {Math.abs(daysRemaining)} days {isOverdue ? 'overdue' : 'remaining'}
                </Badge>
              </div>
            </div>
          </div>
          
          <Separator className="md:col-span-12" />
          
          {/* Progress & Phases Section */}
          <div className="md:col-span-4 space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Progress Overview</h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall Completion</span>
                  <span className="font-semibold">{overallProgress}%</span>
                </div>
                <Progress value={overallProgress} className="h-2" 
                  indicatorClassName={`${overallProgress > 75 ? 'bg-green-500' : overallProgress > 30 ? 'bg-blue-500' : 'bg-amber-500'}`} 
                />
              </div>

              <div className="space-y-2 mt-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Phase Breakdown:</h4>
                {project.phases.map((phase, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(phase.status)}`} />
                          <div className="flex-1">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">{phase.name}</span>
                              <span>{phase.progress}%</span>
                            </div>
                            <Progress value={phase.progress} className="h-1.5" 
                              indicatorClassName={`${phase.status === 'completed' ? 'bg-green-500' : phase.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'}`} 
                            />
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Status: {phase.status.charAt(0).toUpperCase() + phase.status.slice(1)}</p>
                        <p>{phase.progress}% Complete</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
            
            <div className="pt-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Key Project Metrics:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-muted-foreground mr-2" />
                  <span>Team: 5 members</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                  <span>Est. completion: {formattedDeadline}</span>
                </div>
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" style={{ color: getRiskColor() }} />
                  <span>Risk: <span style={{ color: getRiskColor() }}>{riskLevel}</span></span>
                </div>
                <div className="flex items-center">
                  <Target className="h-4 w-4 text-purple-500 mr-2" />
                  <span>Efficiency: {efficiencyScore}%</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Financial Metrics Section - Expanded */}
          <div className="md:col-span-5">
            <h3 className="text-lg font-semibold mb-3">Financial Overview</h3>
            
            {project.financials ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-500/10 p-3 rounded-lg">
                    <div className="text-xs font-medium mb-1">Market Value</div>
                    <div className="font-bold text-lg flex items-center gap-1">
                      {formatCurrency(project.financials.marketValue)}
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  
                  <div className="bg-blue-500/10 p-3 rounded-lg">
                    <div className="text-xs font-medium mb-1">Cost Savings</div>
                    <div className="font-bold text-lg flex items-center gap-1">
                      {formatCurrency(project.financials.costSavings)}
                      <TrendingUp className="h-4 w-4 text-blue-500" />
                    </div>
                  </div>
                  
                  <div className="bg-red-500/10 p-3 rounded-lg">
                    <div className="text-xs font-medium mb-1">Development Cost</div>
                    <div className="font-bold text-lg flex items-center gap-1">
                      {formatCurrency(project.financials.developmentCost)}
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    </div>
                  </div>
                  
                  <div className="bg-purple-500/10 p-3 rounded-lg">
                    <div className="text-xs font-medium mb-1">ROI</div>
                    <div className="font-bold text-lg flex items-center gap-1">
                      {project.financials.roi}%
                      <TrendingUp className="h-4 w-4 text-purple-500" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Budget Analysis</h4>
                  <div className="p-3 bg-background/70 rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Budget Utilization</span>
                      <span className="text-sm font-medium">
                        {formatCurrency(project.financials.developmentCost)} / {formatCurrency(project.financials.marketValue * 0.4)}
                      </span>
                    </div>
                    <Progress 
                      value={(project.financials.developmentCost / (project.financials.marketValue * 0.4)) * 100} 
                      className="h-2"
                      indicatorClassName={project.financials.developmentCost > project.financials.marketValue * 0.4 ? 'bg-red-500' : 'bg-emerald-500'}
                    />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>Projected savings: {formatCurrency(project.financials.costSavings)}</span>
                      <span>Net value: {formatCurrency(project.financials.marketValue - project.financials.developmentCost)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-muted/30 p-4 rounded-lg flex items-center justify-center h-40">
                <p className="text-muted-foreground">No financial data available</p>
              </div>
            )}
          </div>
          
          {/* Recent Updates & Actions */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
            
            <div className="space-y-3">
              <div className="bg-muted/30 p-3 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Recent Updates</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Phase 2 completed</span>
                    <span className="text-xs">2 days ago</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Budget review</span>
                    <span className="text-xs">5 days ago</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-2 pt-2">
                <Button 
                  className="w-full mb-2 flex items-center justify-center gap-1"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  <ExternalLink size={16} /> View Full Details
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-center gap-1"
                    onClick={() => navigate(`/plan-builder/${project.id}`)}
                  >
                    <Edit size={14} /> Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-center gap-1"
                  >
                    <DollarSign size={14} /> Budget
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
