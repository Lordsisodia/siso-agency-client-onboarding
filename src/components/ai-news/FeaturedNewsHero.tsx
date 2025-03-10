
import React from 'react';
import { ArrowRight, Eye, MessageSquare, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { categoryColors } from '@/types/complexity';

interface FeaturedNewsHeroProps {
  article: {
    id: string;
    title: string;
    description: string;
    image_url?: string;
    category: string;
    date: string;
    source: string;
    views: number;
    comments_count: number;
  };
  onReadMore: (id: string) => void;
}

export const FeaturedNewsHero: React.FC<FeaturedNewsHeroProps> = ({ article, onReadMore }) => {
  const defaultImage = '/placeholder.svg';
  
  const getColorForCategory = (category: string) => {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory in categoryColors) {
      return categoryColors[lowerCategory as keyof typeof categoryColors];
    }
    return categoryColors.other;
  };
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="w-full bg-card/30 backdrop-blur-sm rounded-xl overflow-hidden border border-border shadow-lg mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-3/5 p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Badge className={cn("px-3 py-1 font-medium", getColorForCategory(article.category))}>
                {article.category}
              </Badge>
              <span className="text-xs text-muted-foreground">{article.date}</span>
              <span className="text-xs text-muted-foreground">Source: {article.source}</span>
            </div>
            
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 line-clamp-3">{article.title}</h2>
            <p className="text-muted-foreground mb-6 line-clamp-3 lg:line-clamp-4">{article.description}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center text-muted-foreground">
                <Eye className="w-4 h-4 mr-1" />
                <span className="text-sm">{String(article.views)}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MessageSquare className="w-4 h-4 mr-1" />
                <span className="text-sm">{article.comments_count}</span>
              </div>
              <div className="flex items-center text-muted-foreground cursor-pointer hover:text-primary transition-colors">
                <Share2 className="w-4 h-4 mr-1" />
                <span className="text-sm">Share</span>
              </div>
            </div>
            <Button 
              onClick={() => onReadMore(article.id)} 
              variant="default" 
              className="w-full sm:w-auto"
            >
              Read Article <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="lg:w-2/5 h-64 lg:h-auto relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${article.image_url || defaultImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            variants={imageVariants}
            whileHover="hover"
          />
        </div>
      </div>
    </motion.div>
  );
};
