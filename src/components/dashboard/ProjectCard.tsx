
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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
  ChevronUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDate } from '@/lib/formatters';
import { useState } from 'react';

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
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
  delay?: number;
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
  onViewDetails,
  onEdit,
  delay = 0
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
      <Card className="h-full border border-siso-border hover:border-siso-orange/30 hover:shadow-lg hover:shadow-siso-orange/5 transition-all overflow-hidden">
        <CardContent className="p-5 pt-8 relative">
          <Badge className={`absolute top-0 right-4 -translate-y-1/2 ${statusConfig.bg} flex items-center px-3 py-1`}>
            {statusConfig.icon}
            {statusConfig.text}
          </Badge>
          
          <Badge className={`absolute top-0 left-4 -translate-y-1/2 ${priorityConfig.bg} ${priorityConfig.textColor} flex items-center px-3 py-1`}>
            {priority === 'high' && <AlertTriangle size={14} className="mr-1" />}
            {priorityConfig.text} Priority
          </Badge>
          
          <h3 className="text-lg font-semibold text-siso-text-bold mb-3 line-clamp-2">{title}</h3>
          
          {client && (
            <div className="flex items-center mt-2 mb-3 text-sm text-siso-text/80">
              <Building size={15} className="mr-2 text-siso-orange/70" />
              {client}
            </div>
          )}
          
          {description && (
            <div className="mt-3 mb-4">
              <Textarea 
                value={description} 
                readOnly 
                className="resize-none h-20 bg-siso-bg/30 border-siso-border text-sm text-siso-text/80"
              />
            </div>
          )}
          
          <div className="mt-4">
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
          
          <div className="grid grid-cols-2 gap-3 mt-4">
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
          
          {expanded && (
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
        
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
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
