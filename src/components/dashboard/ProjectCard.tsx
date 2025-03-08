
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
        return { bg: 'bg-blue-500', text: 'Planning', icon: <Calendar size={12} className="mr-1" /> };
      case 'in-progress':
        return { bg: 'bg-amber-500', text: 'In Progress', icon: <Clock size={12} className="mr-1" /> };
      case 'reviewing':
        return { bg: 'bg-purple-500', text: 'Reviewing', icon: <CheckSquare size={12} className="mr-1" /> };
      case 'completed':
        return { bg: 'bg-green-500', text: 'Completed', icon: <CheckSquare size={12} className="mr-1" /> };
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
        {/* Optimized Card Header - reduced vertical padding */}
        <CardHeader className="px-5 py-4 pb-2">
          <div className="flex justify-between items-start mb-2">
            {/* Compact badges */}
            <Badge className={`${statusConfig.bg} flex items-center px-2 py-0.5 text-xs`}>
              {statusConfig.icon}
              {statusConfig.text}
            </Badge>
            
            <Badge className={`${priorityConfig.bg} ${priorityConfig.textColor} flex items-center px-2 py-0.5 text-xs`}>
              {priority === 'high' && <AlertTriangle size={12} className="mr-1" />}
              {priorityConfig.text}
            </Badge>
          </div>
          
          <CardTitle className="text-xl font-bold text-siso-text-bold mb-1">{title}</CardTitle>
          
          {client && (
            <div className="flex items-center mt-1 text-xs text-siso-text/80">
              <Building size={14} className="mr-1.5 text-siso-orange/70" />
              {client}
            </div>
          )}
        </CardHeader>
        
        <CardContent className={`px-5 py-3 pt-0 flex-1 ${isFullWidth ? 'grid grid-cols-1 lg:grid-cols-3 gap-4' : ''}`}>
          <div className={isFullWidth ? "lg:col-span-1" : ""}>
            <h4 className="text-xs font-semibold text-siso-text-bold mb-1.5">Overview</h4>
            
            {/* Reduced height textarea */}
            <div className="mb-3">
              <Textarea 
                value={description} 
                readOnly 
                className="resize-none h-20 bg-siso-bg/30 border-siso-border text-xs text-siso-text/80 py-2"
              />
            </div>
            
            {/* Optimized progress section */}
            <div className="mt-3 mb-3">
              <div className="flex justify-between mb-1 text-xs">
                <span className="text-siso-text/80">Progress</span>
                <span className="text-siso-text-bold">{progress}%</span>
              </div>
              <Progress 
                value={progress} 
                className="h-1.5 bg-siso-bg/50" 
                indicatorClassName="bg-gradient-to-r from-siso-red to-siso-orange rounded-full"
              />
            </div>
            
            {/* Optimized grid layout for project metadata */}
            <div className="grid grid-cols-2 gap-2">
              {deadline && (
                <div className="flex flex-col">
                  <span className="text-xs text-siso-text/70">Deadline</span>
                  <div className="flex items-center text-xs">
                    <Clock size={12} className="mr-1 text-siso-orange" />
                    <span>{formatDate(new Date(deadline))}</span>
                    {daysRemaining !== null && daysRemaining <= 7 && (
                      <Badge variant="warning" className="ml-1 text-xs py-0 px-1 h-4">
                        {daysRemaining}d
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              
              {tasks.total > 0 && (
                <div className="flex flex-col">
                  <span className="text-xs text-siso-text/70">Tasks</span>
                  <div className="flex items-center text-xs">
                    <CheckSquare size={12} className="mr-1 text-siso-orange" />
                    <span>
                      {tasks.completed}/{tasks.total}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col">
                <span className="text-xs text-siso-text/70">Updated</span>
                <div className="text-xs text-siso-text/90">
                  {formatDate(new Date(lastUpdated))}
                </div>
              </div>
              
              {team.length > 0 && (
                <div className="flex flex-col">
                  <span className="text-xs text-siso-text/70">Team</span>
                  <div className="flex items-center">
                    <Users size={12} className="mr-1 text-siso-orange" />
                    <span className="text-xs text-siso-text/90">
                      {team.length} members
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {isFullWidth && (
            <div className="lg:col-span-1">
              <h4 className="text-xs font-semibold text-siso-text-bold mb-1.5">Project Phases</h4>
              
              {/* Optimized project phases - horizontal layout */}
              <div className="grid grid-cols-2 gap-2">
                {phases.map((phase, index) => (
                  <div key={index} className="bg-siso-bg/30 border border-siso-border rounded-md p-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium">{phase.name}</span>
                      <Badge className={`${getPhaseStatusColor(phase.status)} text-[10px] py-0 px-1.5 h-4`}>
                        {phase.status === 'completed' ? 'Done' : 
                         phase.status === 'in-progress' ? 'Active' : 'Pending'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Progress 
                        value={phase.progress} 
                        className="h-1 flex-1 bg-siso-bg/50" 
                        indicatorClassName={`${
                          phase.status === 'completed' ? 'bg-green-500' : 
                          phase.status === 'in-progress' ? 'bg-amber-500' : 
                          'bg-gray-400/40'
                        } rounded-full`}
                      />
                      <span className="text-[10px] text-siso-text/80">{phase.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Optimized code metrics section */}
              {codeMetrics && (
                <div className="mt-3">
                  <h4 className="text-xs font-semibold text-siso-text-bold mb-1.5">Code Metrics</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-siso-bg/30 border border-siso-border rounded-md p-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Code size={12} className="mr-1 text-siso-orange" />
                          <span className="text-[10px] text-siso-text/70">Lines of Code</span>
                        </div>
                        <span className="text-xs font-medium">{formatNumber(codeMetrics.linesOfCode)}</span>
                      </div>
                    </div>
                    
                    <div className="bg-siso-bg/30 border border-siso-border rounded-md p-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <GitBranch size={12} className="mr-1 text-siso-orange" />
                          <span className="text-[10px] text-siso-text/70">Commits</span>
                        </div>
                        <span className="text-xs font-medium">{formatNumber(codeMetrics.commits)}</span>
                      </div>
                    </div>
                    
                    <div className="bg-siso-bg/30 border border-siso-border rounded-md p-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText size={12} className="mr-1 text-siso-orange" />
                          <span className="text-[10px] text-siso-text/70">Files</span>
                        </div>
                        <span className="text-xs font-medium">{formatNumber(codeMetrics.files)}</span>
                      </div>
                    </div>
                    
                    <div className="bg-siso-bg/30 border border-siso-border rounded-md p-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <BarChart2 size={12} className="mr-1 text-siso-orange" />
                          <span className="text-[10px] text-siso-text/70">Quality</span>
                        </div>
                        <span className="text-xs font-medium">{codeMetrics.quality}/100</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {isFullWidth && financialMetrics && (
            <div className="lg:col-span-1">
              <h4 className="text-xs font-semibold text-siso-text-bold mb-1.5">Financial Metrics</h4>
              
              {/* Optimized financial metrics layout */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gradient-to-r from-siso-bg/40 to-siso-bg/20 border border-siso-border rounded-md p-2 col-span-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <DollarSign size={12} className="mr-1 text-siso-orange" />
                      <span className="text-xs font-medium">Market Value</span>
                    </div>
                    <span className="text-sm font-bold text-siso-text-bold">
                      {formatCurrency(financialMetrics.marketValue)}
                    </span>
                  </div>
                  <p className="text-[10px] text-siso-text/60 mt-0.5">Estimated value in current market</p>
                </div>
                
                <div className="bg-gradient-to-r from-siso-bg/40 to-siso-bg/20 border border-siso-border rounded-md p-2 col-span-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <TrendingUp size={12} className="mr-1 text-green-500" />
                      <span className="text-xs font-medium">Cost Savings</span>
                    </div>
                    <span className="text-sm font-bold text-green-500">
                      {formatCurrency(financialMetrics.costSavings)}
                    </span>
                  </div>
                  <p className="text-[10px] text-siso-text/60 mt-0.5">vs. traditional development</p>
                </div>
                
                <div className="bg-siso-bg/30 border border-siso-border rounded-md p-2">
                  <div className="flex items-center mb-0.5">
                    <Layers size={12} className="mr-1 text-siso-orange" />
                    <span className="text-[10px] text-siso-text/70">Development</span>
                  </div>
                  <span className="text-xs font-medium">
                    {formatCurrency(financialMetrics.developmentCost)}
                  </span>
                </div>
                
                <div className="bg-siso-bg/30 border border-siso-border rounded-md p-2">
                  <div className="flex items-center mb-0.5">
                    <GitPullRequest size={12} className="mr-1 text-siso-orange" />
                    <span className="text-[10px] text-siso-text/70">ROI</span>
                  </div>
                  <span className="text-xs font-medium">
                    {formatPercentage(financialMetrics.roi)}
                  </span>
                </div>
                
                {/* Optimized team members section with horizontal display */}
                <div className="mt-2 col-span-2">
                  <h4 className="text-xs font-semibold text-siso-text-bold mb-1.5">Team</h4>
                  <ScrollArea className="h-[70px]">
                    <div className="flex flex-wrap gap-1">
                      {team.map((member, index) => (
                        <div key={index} className="flex items-center gap-1.5 py-1 px-2 rounded-md hover:bg-siso-bg/50 bg-siso-bg/30 border border-siso-border/50">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-siso-red/20 to-siso-orange/20 flex items-center justify-center text-[10px] font-medium text-siso-orange">
                            {member.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-xs">{member}</span>
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
              className="mt-2 pt-2 border-t border-siso-border/30"
            >
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <span className="text-xs text-siso-text/70">Updated</span>
                  <div className="text-xs text-siso-text/90">
                    {formatDate(new Date(lastUpdated))}
                  </div>
                </div>
                
                {team.length > 0 && (
                  <div className="flex flex-col">
                    <span className="text-xs text-siso-text/70">Team</span>
                    <div className="flex items-center">
                      <Users size={12} className="mr-1 text-siso-orange" />
                      <span className="text-xs text-siso-text/90">
                        {team.length} members
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </CardContent>
        
        {/* Optimized card footer */}
        <CardFooter className="px-5 py-2 flex justify-between items-center border-t border-siso-border/20 mt-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onViewDetails(id)}
            className="text-xs text-siso-orange hover:text-siso-red hover:bg-siso-orange/5 h-8 px-2"
          >
            View Details
            <ExternalLink size={10} className="ml-1" />
          </Button>
          
          <div className="flex items-center">
            {!isFullWidth && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleExpand}
                className="text-xs hover:bg-siso-orange/5 mr-1 h-7 w-7 p-0"
              >
                {expanded ? (
                  <ChevronUp size={14} />
                ) : (
                  <ChevronDown size={14} />
                )}
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(id)}
              className="text-xs hover:bg-siso-orange/5 h-7 w-7 p-0"
            >
              <MoreHorizontal size={14} />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
