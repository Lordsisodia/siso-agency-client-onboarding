
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Project } from './types';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-xl overflow-hidden border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm hover:border-siso-orange/40 transition-all cursor-pointer group h-full flex flex-col"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {project.tags.slice(0, 3).map(tag => (
              <Badge key={tag} className="bg-siso-orange/20 text-siso-orange border-siso-orange/30 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className="text-lg font-bold text-white">{project.title}</h3>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <p className="text-siso-text/80 mb-4 flex-1">{project.description}</p>
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-siso-text-bold mb-2">Key Features:</h4>
          <ul className="ml-5 list-disc text-sm text-siso-text/70">
            {project.features.slice(0, 3).map(feature => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
        <Button 
          className="flex items-center justify-center text-siso-orange hover:text-siso-red transition-colors mt-auto w-full"
          variant="ghost"
        >
          View Case Study <ExternalLink className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}
