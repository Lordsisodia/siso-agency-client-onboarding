
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
        return { bg: 'bg-blue-500', text: 'Planning', icon: <Calendar size={10} className="mr-1" /> };
      case 'in-progress':
        return { bg: 'bg-amber-500', text: 'In Progress', icon: <Clock size={10} className="mr-1" /> };
      case 'reviewing':
        return { bg: 'bg-purple-500', text: 'Reviewing', icon: <CheckSquare size={10} className="mr-1" /> };
      case 'completed':
        return { bg: 'bg-green-500', text: 'Completed', icon: <CheckSquare size={10} className="mr-1" /> };
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

  // Generate initials for team members
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
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
        {/* More compact Card Header with reduced padding */}
        <CardHeader className="px-4 py-3 pb-1">
          <div className="flex justify-between items-start">
            {/* Smaller badges with less internal padding */}
            <Badge className={`${statusConfig.bg} flex items-center px-1.5 py-0.5 text-[10px] leading-none h-4`}>
              {statusConfig.icon}
              {statusConfig.text}
            </Badge>
            
            <Badge className={`${priorityConfig.bg} ${priorityConfig.textColor} flex items-center px-1.5 py-0.5 text-[10px] leading-none h-4`}>
              {priority === 'high' && <AlertTriangle size={10} className="mr-1" />}
              {priorityConfig.text}
            </Badge>
          </div>
          
          <CardTitle className="text-base font-bold text-siso-text-bold mt-1.5 mb-0.5">{title}</CardTitle>
          
          {client && (
            <div className="flex items-center text-[10px] text-siso-text/80">
              <Building size={10} className="mr-1 text-siso-orange/70" />
              {client}
            </div>
          )}
        </CardHeader>
        
        <CardContent className={`px-4 py-2 flex-1 ${isFullWidth ? 'grid grid-cols-1 lg:grid-cols-3 gap-3' : ''}`}>
          <div className={isFullWidth ? "lg:col-span-1" : ""}>
            {/* Reduced label size */}
            <h4 className="text-[10px] font-semibold text-siso-text-bold mb-1">Overview</h4>
            
            {/* Reduced height textarea */}
            <div className="mb-2">
              <Textarea 
                value={description} 
                readOnly 
                className="resize-none h-16 bg-siso-bg/30 border-siso-border text-xs text-siso-text/80 py-1.5 px-2"
              />
            </div>
            
            {/* More compact progress section */}
            <div className="mb-2">
              <div className="flex justify-between mb-0.5 text-[10px]">
                <span className="text-siso-text/80">Progress</span>
                <span className="text-siso-text-bold">{progress}%</span>
              </div>
              <Progress 
                value={progress} 
                className="h-1 bg-siso-bg/50" 
                indicatorClassName="bg-gradient-to-r from-siso-red to-siso-orange rounded-full"
              />
            </div>
            
            {/* More compact grid for metadata */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[10px]">
              {deadline && (
                <div className="flex flex-col">
                  <span className="text-siso-text/70 text-[9px]">Deadline</span>
                  <div className="flex items-center">
                    <Clock size={10} className="mr-1 text-siso-orange" />
                    <span>{formatDate(new Date(deadline))}</span>
                    {daysRemaining !== null && daysRemaining <= 7 && (
                      <Badge variant="warning" className="ml-1 text-[8px] py-0 px-1 h-3">
                        {daysRemaining}d
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              
              {tasks.total > 0 && (
                <div className="flex flex-col">
                  <span className="text-siso-text/70 text-[9px]">Tasks</span>
                  <div className="flex items-center">
                    <CheckSquare size={10} className="mr-1 text-siso-orange" />
                    <span>
                      {tasks.completed}/{tasks.total}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col">
                <span className="text-siso-text/70 text-[9px]">Updated</span>
                <div className="text-siso-text/90">
                  {formatDate(new Date(lastUpdated))}
                </div>
              </div>
              
              {team.length > 0 && (
                <div className="flex flex-col">
                  <span className="text-siso-text/70 text-[9px]">Team</span>
                  <div className="flex items-center">
                    <Users size={10} className="mr-1 text-siso-orange" />
                    <span className="text-siso-text/90">
                      {team.length} member{team.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Team members avatars */}
            {team.length > 0 && (
              <div className="mt-2">
                <div className="flex -space-x-1.5 overflow-hidden">
                  <TooltipProvider>
                    {team.slice(0, 5).map((member, index) => (
                      <Tooltip key={index}>
                        <TooltipTrigger asChild>
                          <Avatar className="w-5 h-5 border border-siso-border text-[8px]">
                            <AvatarFallback className="bg-gradient-to-r from-siso-red/20 to-siso-orange/20 text-siso-orange">
                              {getInitials(member)}
                            </AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="text-xs py-1 px-2">
                          {member}
                        </TooltipContent>
                      </Tooltip>
                    ))}
                    {team.length > 5 && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Avatar className="w-5 h-5 border border-siso-border bg-siso-bg/50 text-[8px]">
                            <AvatarFallback>+{team.length - 5}</AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="text-xs py-1 px-2">
                          {team.slice(5).join(', ')}
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </TooltipProvider>
                </div>
              </div>
            )}
          </div>

          {isFullWidth && (
            <div className="lg:col-span-1">
              <h4 className="text-[10px] font-semibold text-siso-text-bold mb-1">Project Phases</h4>
              
              {/* Optimized phases layout - smaller, more compact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {phases.map((phase, index) => (
                  <div key={index} className="bg-siso-bg/30 border border-siso-border rounded p-1.5">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-[10px] font-medium">{phase.name}</span>
                      <Badge className={`${getPhaseStatusColor(phase.status)} text-[8px] py-0 px-1 h-3 leading-none`}>
                        {phase.status === 'completed' ? 'Done' : 
                         phase.status === 'in-progress' ? 'Active' : 'Pending'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Progress 
                        value={phase.progress} 
                        className="h-1 flex-1 bg-siso-bg/50" 
                        indicatorClassName={`${
                          phase.status === 'completed' ? 'bg-green-500' : 
                          phase.status === 'in-progress' ? 'bg-amber-500' : 
                          'bg-gray-400/40'
                        } rounded-full`}
                      />
                      <span className="text-[8px] text-siso-text/80">{phase.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Optimized code metrics - compact grid */}
              {codeMetrics && (
                <div className="mt-2">
                  <h4 className="text-[10px] font-semibold text-siso-text-bold mb-1">Code Metrics</h4>
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="bg-siso-bg/30 border border-siso-border rounded p-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Code size={10} className="mr-1 text-siso-orange" />
                          <span className="text-[8px] text-siso-text/70">Lines of Code</span>
                        </div>
                        <span className="text-[10px] font-medium">{formatNumber(codeMetrics.linesOfCode)}</span>
                      </div>
                    </div>
                    
                    <div className="bg-siso-bg/30 border border-siso-border rounded p-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <GitBranch size={10} className="mr-1 text-siso-orange" />
                          <span className="text-[8px] text-siso-text/70">Commits</span>
                        </div>
                        <span className="text-[10px] font-medium">{formatNumber(codeMetrics.commits)}</span>
                      </div>
                    </div>
                    
                    <div className="bg-siso-bg/30 border border-siso-border rounded p-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText size={10} className="mr-1 text-siso-orange" />
                          <span className="text-[8px] text-siso-text/70">Files</span>
                        </div>
                        <span className="text-[10px] font-medium">{formatNumber(codeMetrics.files)}</span>
                      </div>
                    </div>
                    
                    <div className="bg-siso-bg/30 border border-siso-border rounded p-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <BarChart2 size={10} className="mr-1 text-siso-orange" />
                          <span className="text-[8px] text-siso-text/70">Quality</span>
                        </div>
                        <span className="text-[10px] font-medium">{codeMetrics.quality}/100</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {isFullWidth && financialMetrics && (
            <div className="lg:col-span-1">
              <h4 className="text-[10px] font-semibold text-siso-text-bold mb-1">Financial Metrics</h4>
              
              {/* Optimized financial metrics - more compact grid */}
              <div className="grid grid-cols-2 gap-1.5">
                <div className="bg-gradient-to-r from-siso-bg/40 to-siso-bg/20 border border-siso-border rounded-md p-1.5 col-span-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <DollarSign size={10} className="mr-1 text-siso-orange" />
                      <span className="text-[10px] font-medium">Market Value</span>
                    </div>
                    <span className="text-xs font-bold text-siso-text-bold">
                      {formatCurrency(financialMetrics.marketValue)}
                    </span>
                  </div>
                  <p className="text-[8px] text-siso-text/60 mt-0.5">Estimated value in current market</p>
                </div>
                
                <div className="bg-gradient-to-r from-siso-bg/40 to-siso-bg/20 border border-siso-border rounded-md p-1.5 col-span-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <TrendingUp size={10} className="mr-1 text-green-500" />
                      <span className="text-[10px] font-medium">Cost Savings</span>
                    </div>
                    <span className="text-xs font-bold text-green-500">
                      {formatCurrency(financialMetrics.costSavings)}
                    </span>
                  </div>
                  <p className="text-[8px] text-siso-text/60 mt-0.5">vs. traditional development</p>
                </div>
                
                <div className="bg-siso-bg/30 border border-siso-border rounded-md p-1.5">
                  <div className="flex items-center mb-0.5">
                    <Layers size={10} className="mr-1 text-siso-orange" />
                    <span className="text-[8px] text-siso-text/70">Development</span>
                  </div>
                  <span className="text-[10px] font-medium">
                    {formatCurrency(financialMetrics.developmentCost)}
                  </span>
                </div>
                
                <div className="bg-siso-bg/30 border border-siso-border rounded-md p-1.5">
                  <div className="flex items-center mb-0.5">
                    <GitPullRequest size={10} className="mr-1 text-siso-orange" />
                    <span className="text-[8px] text-siso-text/70">ROI</span>
                  </div>
                  <span className="text-[10px] font-medium">
                    {formatPercentage(financialMetrics.roi)}
                  </span>
                </div>
                
                {/* Team members with horizontal scroll */}
                {team.length > 0 && (
                  <div className="mt-1 col-span-2">
                    <h4 className="text-[10px] font-semibold text-siso-text-bold mb-1">Team</h4>
                    <ScrollArea className="h-[42px]">
                      <div className="flex flex-wrap gap-1">
                        {team.map((member, index) => (
                          <div key={index} className="flex items-center gap-1 py-0.5 px-1.5 rounded-md hover:bg-siso-bg/50 bg-siso-bg/30 border border-siso-border/50">
                            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-siso-red/20 to-siso-orange/20 flex items-center justify-center text-[8px] font-medium text-siso-orange">
                              {getInitials(member)}
                            </div>
                            <span className="text-[9px]">{member}</span>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {!isFullWidth && expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 pt-2 border-t border-siso-border/30"
            >
              {/* Team members with horizontal scroll for collapsed view */}
              {team.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-semibold text-siso-text-bold mb-1">Team</h4>
                  <ScrollArea className="h-[42px]">
                    <div className="flex flex-wrap gap-1">
                      {team.map((member, index) => (
                        <div key={index} className="flex items-center gap-1 py-0.5 px-1.5 rounded-md hover:bg-siso-bg/50 bg-siso-bg/30 border border-siso-border/50">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-siso-red/20 to-siso-orange/20 flex items-center justify-center text-[8px] font-medium text-siso-orange">
                            {getInitials(member)}
                          </div>
                          <span className="text-[9px]">{member}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
              
              {/* Add phases in collapsed view if available */}
              {phases.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-[10px] font-semibold text-siso-text-bold mb-1">Phases</h4>
                  <div className="grid grid-cols-1 gap-1">
                    {phases.map((phase, index) => (
                      <div key={index} className="flex items-center gap-1.5">
                        <Badge className={`${getPhaseStatusColor(phase.status)} w-1.5 h-1.5 p-0 rounded-full`} />
                        <span className="text-[9px] font-medium flex-1">{phase.name}</span>
                        <Progress 
                          value={phase.progress} 
                          className="h-1 w-16 bg-siso-bg/50" 
                          indicatorClassName={`${
                            phase.status === 'completed' ? 'bg-green-500' : 
                            phase.status === 'in-progress' ? 'bg-amber-500' : 
                            'bg-gray-400/40'
                          } rounded-full`}
                        />
                        <span className="text-[8px] text-siso-text/80 w-6 text-right">{phase.progress}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </CardContent>
        
        {/* Optimized card footer */}
        <CardFooter className="px-4 py-1.5 flex justify-between items-center border-t border-siso-border/20 mt-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onViewDetails(id)}
            className="text-[10px] text-siso-orange hover:text-siso-red hover:bg-siso-orange/5 h-6 px-1.5"
          >
            Details
            <ExternalLink size={10} className="ml-1" />
          </Button>
          
          <div className="flex items-center">
            {!isFullWidth && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleExpand}
                className="text-[10px] hover:bg-siso-orange/5 mr-1 h-6 w-6 p-0"
              >
                {expanded ? (
                  <ChevronUp size={12} />
                ) : (
                  <ChevronDown size={12} />
                )}
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(id)}
              className="text-[10px] hover:bg-siso-orange/5 h-6 w-6 p-0"
            >
              <MoreHorizontal size={12} />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
