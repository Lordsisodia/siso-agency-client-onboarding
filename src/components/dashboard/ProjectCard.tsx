
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { 
  ExternalLink, 
  MoreHorizontal, 
  Clock, 
  Building, 
  Calendar, 
  CheckSquare, 
  AlertTriangle,
  Users,
  ChevronDown,
  ChevronUp,
  Code,
  GitBranch,
  FileText,
  BarChart2,
  DollarSign,
  TrendingUp,
  GitPullRequest,
  Layers
} from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDate, formatCurrency, formatPercentage, formatNumber } from '@/lib/formatters';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Phase {
  name: string;
  status: 'completed' | 'in-progress' | 'pending';
  progress: number;
}

interface CodeMetrics {
  linesOfCode: number;
  commits: number;
  files: number;
  quality: number;
}

interface FinancialMetrics {
  marketValue: number;
  costSavings: number;
  developmentCost: number;
  roi: number;
}

interface ProjectCardProps {
  id: string;
  title: string;
  status: 'planning' | 'in-progress' | 'reviewing' | 'completed';
  progress: number;
  deadline?: string;
  client?: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  tasks?: { total: number; completed: number };
  lastUpdated?: string;
  team?: string[];
  phases?: Phase[];
  codeMetrics?: CodeMetrics;
  financialMetrics?: FinancialMetrics;
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
  delay?: number;
  isFullWidth?: boolean;
}

export const ProjectCard = ({
  id,
  title,
  status,
  progress,
  deadline,
  client,
  description = 'No description provided for this project.',
  priority = 'medium',
  tasks = { total: 0, completed: 0 },
  lastUpdated = new Date().toISOString(),
  team = [],
  phases = [],
  codeMetrics,
  financialMetrics,
  onViewDetails,
  onEdit,
  delay = 0,
  isFullWidth = false
}: ProjectCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'planning':
        return { bg: 'bg-blue-500', text: 'Planning', icon: <Calendar size={14} className="mr-1" /> };
      case 'in-progress':
        return { bg: 'bg-amber-500', text: 'In Progress', icon: <Clock size={14} className="mr-1" /> };
      case 'reviewing':
        return { bg: 'bg-purple-500', text: 'Reviewing', icon: <CheckSquare size={14} className="mr-1" /> };
      case 'completed':
        return { bg: 'bg-green-500', text: 'Completed', icon: <CheckSquare size={14} className="mr-1" /> };
      default:
        return { bg: 'bg-gray-500', text: 'Unknown', icon: null };
    }
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'high':
        return { bg: 'bg-red-500/20', text: 'High', textColor: 'text-red-500' };
      case 'medium':
        return { bg: 'bg-amber-500/20', text: 'Medium', textColor: 'text-amber-500' };
      case 'low':
        return { bg: 'bg-green-500/20', text: 'Low', textColor: 'text-green-500' };
      default:
        return { bg: 'bg-gray-500/20', text: 'Medium', textColor: 'text-gray-500' };
    }
  };

  const getPhaseStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-amber-500';
      case 'pending': return 'bg-gray-400/40';
      default: return 'bg-gray-500';
    }
  };

  const statusConfig = getStatusConfig(status);
  const priorityConfig = getPriorityConfig(priority);
  
  const daysRemaining = deadline ? 
    Math.max(0, Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))) : 
    null;
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className={`h-full border border-siso-border hover:border-siso-orange/30 hover:shadow-lg hover:shadow-siso-orange/5 transition-all overflow-hidden ${isFullWidth ? 'flex flex-col' : ''}`}>
        <CardHeader className="p-6 pb-4">
          <div className="flex justify-between items-start mb-4">
            <Badge className={`${statusConfig.bg} flex items-center px-3 py-1`}>
              {statusConfig.icon}
              {statusConfig.text}
            </Badge>
            
            <Badge className={`${priorityConfig.bg} ${priorityConfig.textColor} flex items-center px-3 py-1`}>
              {priority === 'high' && <AlertTriangle size={14} className="mr-1" />}
              {priorityConfig.text} Priority
            </Badge>
          </div>
          
          <CardTitle className="text-2xl font-bold text-siso-text-bold mb-3">{title}</CardTitle>
          
          {client && (
            <div className="flex items-center mt-2 mb-3 text-sm text-siso-text/80">
              <Building size={15} className="mr-2 text-siso-orange/70" />
              {client}
            </div>
          )}
        </CardHeader>
        
        <CardContent className={`p-6 pt-0 flex-1 ${isFullWidth ? 'grid grid-cols-1 lg:grid-cols-3 gap-6' : ''}`}>
          <div className={isFullWidth ? "lg:col-span-1" : ""}>
            <h4 className="text-sm font-semibold text-siso-text-bold mb-2">Overview</h4>
            
            <div className="mb-4">
              <Textarea 
                value={description} 
                readOnly 
                className="resize-none h-24 bg-siso-bg/30 border-siso-border text-sm text-siso-text/80"
              />
            </div>
            
            <div className="mt-4 mb-6">
              <div className="flex justify-between mb-1.5 text-xs">
                <span className="text-siso-text/80">Progress</span>
                <span className="text-siso-text-bold">{progress}%</span>
              </div>
              <Progress 
                value={progress} 
                className="h-2 bg-siso-bg/50" 
                indicatorClassName="bg-gradient-to-r from-siso-red to-siso-orange rounded-full"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {deadline && (
                <div className="flex flex-col">
                  <span className="text-xs text-siso-text/70 mb-1">Deadline</span>
                  <div className="flex items-center text-sm">
                    <Clock size={14} className="mr-1 text-siso-orange" />
                    <span>{formatDate(new Date(deadline))}</span>
                    {daysRemaining !== null && daysRemaining <= 7 && (
                      <Badge variant="warning" className="ml-2 text-xs">
                        {daysRemaining} days left
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              
              {tasks.total > 0 && (
                <div className="flex flex-col">
                  <span className="text-xs text-siso-text/70 mb-1">Tasks</span>
                  <div className="flex items-center text-sm">
                    <CheckSquare size={14} className="mr-1 text-siso-orange" />
                    <span>
                      {tasks.completed}/{tasks.total} complete
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-3">
              <div className="flex flex-col">
                <span className="text-xs text-siso-text/70 mb-1">Last Updated</span>
                <div className="text-sm text-siso-text/90">
                  {formatDate(new Date(lastUpdated))}
                </div>
              </div>
              
              {team.length > 0 && (
                <div className="flex flex-col mt-3">
                  <span className="text-xs text-siso-text/70 mb-1">Team</span>
                  <div className="flex items-center">
                    <Users size={14} className="mr-1 text-siso-orange" />
                    <span className="text-sm text-siso-text/90">
                      {team.length} members
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {isFullWidth && (
            <div className="lg:col-span-1">
              <h4 className="text-sm font-semibold text-siso-text-bold mb-2">Project Phases</h4>
              
              <div className="space-y-3">
                {phases.map((phase, index) => (
                  <div key={index} className="bg-siso-bg/30 border border-siso-border rounded-md p-3">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-medium">{phase.name}</span>
                      <Badge className={`${getPhaseStatusColor(phase.status)} text-xs py-0.5`}>
                        {phase.status === 'completed' ? 'Completed' : 
                         phase.status === 'in-progress' ? 'In Progress' : 'Pending'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={phase.progress} 
                        className="h-1.5 flex-1 bg-siso-bg/50" 
                        indicatorClassName={`${
                          phase.status === 'completed' ? 'bg-green-500' : 
                          phase.status === 'in-progress' ? 'bg-amber-500' : 
                          'bg-gray-400/40'
                        } rounded-full`}
                      />
                      <span className="text-xs text-siso-text/80">{phase.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {codeMetrics && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-siso-text-bold mb-2">Code Metrics</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-siso-bg/30 border border-siso-border rounded-md p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Code size={14} className="mr-1.5 text-siso-orange" />
                          <span className="text-xs text-siso-text/70">Lines of Code</span>
                        </div>
                        <span className="text-sm font-medium">{formatNumber(codeMetrics.linesOfCode)}</span>
                      </div>
                    </div>
                    
                    <div className="bg-siso-bg/30 border border-siso-border rounded-md p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <GitBranch size={14} className="mr-1.5 text-siso-orange" />
                          <span className="text-xs text-siso-text/70">Commits</span>
                        </div>
                        <span className="text-sm font-medium">{formatNumber(codeMetrics.commits)}</span>
                      </div>
                    </div>
                    
                    <div className="bg-siso-bg/30 border border-siso-border rounded-md p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText size={14} className="mr-1.5 text-siso-orange" />
                          <span className="text-xs text-siso-text/70">Files</span>
                        </div>
                        <span className="text-sm font-medium">{formatNumber(codeMetrics.files)}</span>
                      </div>
                    </div>
                    
                    <div className="bg-siso-bg/30 border border-siso-border rounded-md p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <BarChart2 size={14} className="mr-1.5 text-siso-orange" />
                          <span className="text-xs text-siso-text/70">Quality Score</span>
                        </div>
                        <span className="text-sm font-medium">{codeMetrics.quality}/100</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {isFullWidth && financialMetrics && (
            <div className="lg:col-span-1">
              <h4 className="text-sm font-semibold text-siso-text-bold mb-2">Financial Metrics</h4>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-siso-bg/40 to-siso-bg/20 border border-siso-border rounded-md p-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <DollarSign size={16} className="mr-1.5 text-siso-orange" />
                      <span className="text-sm font-medium">Market Value</span>
                    </div>
                    <span className="text-lg font-bold text-siso-text-bold">
                      {formatCurrency(financialMetrics.marketValue)}
                    </span>
                  </div>
                  <p className="text-xs text-siso-text/60">Estimated value of the project in the current market</p>
                </div>
                
                <div className="bg-gradient-to-r from-siso-bg/40 to-siso-bg/20 border border-siso-border rounded-md p-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <TrendingUp size={16} className="mr-1.5 text-green-500" />
                      <span className="text-sm font-medium">Cost Savings</span>
                    </div>
                    <span className="text-lg font-bold text-green-500">
                      {formatCurrency(financialMetrics.costSavings)}
                    </span>
                  </div>
                  <p className="text-xs text-siso-text/60">Savings compared to traditional development approaches</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-siso-bg/30 border border-siso-border rounded-md p-3">
                    <div className="flex items-center mb-1">
                      <Layers size={14} className="mr-1.5 text-siso-orange" />
                      <span className="text-xs text-siso-text/70">Development Cost</span>
                    </div>
                    <span className="text-sm font-medium">
                      {formatCurrency(financialMetrics.developmentCost)}
                    </span>
                  </div>
                  
                  <div className="bg-siso-bg/30 border border-siso-border rounded-md p-3">
                    <div className="flex items-center mb-1">
                      <GitPullRequest size={14} className="mr-1.5 text-siso-orange" />
                      <span className="text-xs text-siso-text/70">ROI</span>
                    </div>
                    <span className="text-sm font-medium">
                      {formatPercentage(financialMetrics.roi)}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-siso-text-bold mb-3">Team Members</h4>
                  <ScrollArea className="h-[100px]">
                    <div className="space-y-2">
                      {team.map((member, index) => (
                        <div key={index} className="flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-siso-bg/50">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-r from-siso-red/20 to-siso-orange/20 flex items-center justify-center text-xs font-medium text-siso-orange">
                            {member.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm">{member}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          )}
          
          {!isFullWidth && expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-siso-border/30"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <span className="text-xs text-siso-text/70 mb-1">Last Updated</span>
                  <div className="text-sm text-siso-text/90">
                    {formatDate(new Date(lastUpdated))}
                  </div>
                </div>
                
                {team.length > 0 && (
                  <div className="flex flex-col">
                    <span className="text-xs text-siso-text/70 mb-1">Team</span>
                    <div className="flex items-center">
                      <Users size={14} className="mr-1 text-siso-orange" />
                      <span className="text-sm text-siso-text/90">
                        {team.length} members
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-between items-center border-t border-siso-border/20 mt-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onViewDetails(id)}
            className="text-xs text-siso-orange hover:text-siso-red hover:bg-siso-orange/5"
          >
            View Details
            <ExternalLink size={12} className="ml-1" />
          </Button>
          
          <div className="flex items-center">
            {!isFullWidth && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleExpand}
                className="text-xs hover:bg-siso-orange/5 mr-1"
              >
                {expanded ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(id)}
              className="text-xs hover:bg-siso-orange/5"
            >
              <MoreHorizontal size={16} />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
