
import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, Calendar, Clock, Award, ChevronUp, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/lib/formatters';
import { Project } from './types';

interface ProjectDetailViewProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDetailView({ project, onClose }: ProjectDetailViewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMoreTech, setShowMoreTech] = useState(false);
  
  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? project.gallery.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === project.gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-siso-orange/20 scrollbar-track-transparent">
      <div className="sticky top-0 z-10 flex justify-between items-center p-4 bg-black/80 backdrop-blur-sm border-b border-siso-orange/20">
        <h2 className="text-xl font-bold text-siso-text-bold">{project.title}</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-siso-orange/10">
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="p-6">
        {/* Image Gallery */}
        <div className="relative mb-8 rounded-lg overflow-hidden">
          <div className="aspect-video relative">
            <motion.img
              key={currentImageIndex}
              src={project.gallery[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover"
            />
          </div>
          
          {project.gallery.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white transition-all"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white transition-all"
              >
                <ArrowRight size={20} />
              </button>
              
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {project.gallery.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-2 h-2 rounded-full ${
                      currentImageIndex === idx ? 'bg-white' : 'bg-white/40'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    aria-label={`View image ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        
        {/* Project Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-siso-orange" />
            <div>
              <p className="text-sm text-siso-text/70">Date</p>
              <p className="font-medium text-siso-text-bold">{formatDate(new Date(project.date))}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-siso-orange" />
            <div>
              <p className="text-sm text-siso-text/70">Duration</p>
              <p className="font-medium text-siso-text-bold">{project.duration}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-siso-orange" />
            <div>
              <p className="text-sm text-siso-text/70">Client</p>
              <p className="font-medium text-siso-text-bold">{project.client}</p>
            </div>
          </div>
        </div>
        
        {/* Project Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-siso-text-bold mb-2">Overview</h3>
          <p className="text-siso-text/90 leading-relaxed">{project.fullDescription}</p>
        </div>
        
        {/* Project Challenge & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="border border-siso-orange/20 rounded-lg p-4 bg-black/30">
            <h3 className="text-lg font-semibold text-siso-text-bold mb-2">Challenge</h3>
            <p className="text-siso-text/90">{project.challenge}</p>
          </div>
          
          <div className="border border-siso-orange/20 rounded-lg p-4 bg-black/30">
            <h3 className="text-lg font-semibold text-siso-text-bold mb-2">Solution</h3>
            <p className="text-siso-text/90">{project.solution}</p>
          </div>
        </div>
        
        {/* Features & Technologies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-siso-text-bold mb-2">Key Features</h3>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 mt-1.5 mr-2 bg-siso-orange rounded-full"></span>
                  <span className="text-siso-text/90">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-siso-text-bold mb-2">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, showMoreTech ? undefined : 5).map((tech, index) => (
                <Badge 
                  key={index} 
                  className="bg-black/40 border-siso-orange/30 text-siso-text-bold"
                >
                  {tech}
                </Badge>
              ))}
              
              {project.technologies.length > 5 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-siso-orange"
                  onClick={() => setShowMoreTech(!showMoreTech)}
                >
                  {showMoreTech ? (
                    <><ChevronUp className="h-3 w-3 mr-1" /> Show Less</>
                  ) : (
                    <><ChevronDown className="h-3 w-3 mr-1" /> Show More</>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-siso-text-bold mb-2">Results</h3>
          <p className="text-siso-text/90 leading-relaxed">{project.results}</p>
        </div>
        
        {/* Testimonial */}
        {project.testimonial && (
          <div className="border-l-4 border-siso-orange/50 pl-4 py-2 mb-8">
            <p className="text-siso-text/90 italic mb-2">{project.testimonial.text}</p>
            <p className="text-siso-text-bold font-medium text-sm">
              {project.testimonial.author}, {project.testimonial.company}
            </p>
          </div>
        )}
        
        <Separator className="my-6 bg-siso-border/30" />
        
        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-lg font-semibold text-siso-text-bold">Interested in a similar project?</h3>
            <p className="text-siso-text/80">Let's discuss how we can help you achieve your goals.</p>
          </div>
          <Button className="bg-gradient-to-r from-siso-red to-siso-orange hover:opacity-90 text-white">
            Start a Conversation
          </Button>
        </div>
      </div>
    </div>
  );
}
