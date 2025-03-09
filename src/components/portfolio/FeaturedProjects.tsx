
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from './types';

interface FeaturedProjectsProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export function FeaturedProjects({ projects, onProjectClick }: FeaturedProjectsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isAutoPlaying && projects.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
      }, 6000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, projects.length]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const handleIndicatorClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  if (projects.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative rounded-xl overflow-hidden border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm"
    >
      <div className="relative h-[500px] overflow-hidden">
        <motion.img
          key={currentIndex}
          src={projects[currentIndex].gallery[0]}
          alt={projects[currentIndex].title}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute left-0 right-0 bottom-0 p-6 md:p-10">
          <div className="flex flex-wrap gap-2 mb-3">
            {projects[currentIndex].tags.map(tag => (
              <Badge key={tag} className="bg-siso-orange/30 text-white border-siso-orange/40">
                {tag}
              </Badge>
            ))}
          </div>
          
          <motion.h2
            key={`title-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-3"
          >
            {projects[currentIndex].title}
          </motion.h2>
          
          <motion.p
            key={`desc-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/80 mb-6 max-w-2xl"
          >
            {projects[currentIndex].description}
          </motion.p>
          
          <motion.div
            key={`btn-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button 
              onClick={() => onProjectClick(projects[currentIndex])}
              className="bg-gradient-to-r from-siso-red to-siso-orange hover:opacity-90 text-white"
            >
              View Case Study
            </Button>
          </motion.div>
        </div>
        
        {/* Navigation Controls */}
        {projects.length > 1 && (
          <>
            <button 
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-2 text-white/80 hover:text-white transition-all"
              aria-label="Previous project"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-2 text-white/80 hover:text-white transition-all"
              aria-label="Next project"
            >
              <ChevronRight size={24} />
            </button>
            
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleIndicatorClick(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentIndex === index 
                      ? 'bg-siso-orange scale-110' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
