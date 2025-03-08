
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, MoreHorizontal, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDate } from '@/lib/formatters';

interface ProjectCardProps {
  id: string;
  title: string;
  status: 'planning' | 'in-progress' | 'reviewing' | 'completed';
  progress: number;
  deadline?: string;
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
}

export const ProjectCard = ({
  id,
  title,
  status,
  progress,
  deadline,
  onViewDetails,
  onEdit
}: ProjectCardProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'planning':
        return { bg: 'bg-blue-500', text: 'Planning' };
      case 'in-progress':
        return { bg: 'bg-amber-500', text: 'In Progress' };
      case 'reviewing':
        return { bg: 'bg-purple-500', text: 'Reviewing' };
      case 'completed':
        return { bg: 'bg-green-500', text: 'Completed' };
      default:
        return { bg: 'bg-gray-500', text: 'Unknown' };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Card className="h-full border border-siso-border hover:border-siso-orange/30 transition-all overflow-hidden">
        <CardContent className="p-4 pt-6 relative">
          <Badge className={`absolute top-0 right-4 -translate-y-1/2 ${statusConfig.bg}`}>
            {statusConfig.text}
          </Badge>
          
          <h3 className="text-lg font-semibold text-siso-text-bold mb-3 line-clamp-2">{title}</h3>
          
          <div className="mt-4">
            <div className="flex justify-between mb-1.5 text-xs">
              <span className="text-siso-text/80">Progress</span>
              <span className="text-siso-text-bold">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-siso-bg/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-siso-red to-siso-orange rounded-full" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          {deadline && (
            <div className="flex items-center mt-3 text-xs text-siso-text/70">
              <Clock size={14} className="mr-1 text-siso-orange" />
              <span>Deadline: {formatDate(new Date(deadline))}</span>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onViewDetails(id)}
            className="text-xs text-siso-orange hover:text-siso-red"
          >
            View Details
            <ExternalLink size={12} className="ml-1" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(id)}
            className="text-xs"
          >
            <MoreHorizontal size={16} />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
