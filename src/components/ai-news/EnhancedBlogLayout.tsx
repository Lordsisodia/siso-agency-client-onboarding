
import React from 'react';
import { motion } from 'framer-motion';
import { NewsItem, EnhancedNewsItem } from '@/types/blog';
import { NewsComment } from '@/types/comment';
import { NewsContent } from './NewsContent';

interface EnhancedBlogLayoutProps {
  article: EnhancedNewsItem & { comments?: NewsComment[] };
  handleExternalLink: () => void;
}

const EnhancedBlogLayout: React.FC<EnhancedBlogLayoutProps> = ({ article, handleExternalLink }) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Function to format the date
  const formatPublishedDate = (dateString: string | undefined) => {
    if (!dateString) return 'Unknown date';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.article 
      className="max-w-4xl mx-auto bg-card shadow-lg rounded-xl overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Article Header */}
      <div className="p-6 md:p-8 border-b">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{article.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
          <div>Published: {formatPublishedDate(article.published_at)}</div>
          <div>Source: {article.source}</div>
          {article.author && <div>By: {article.author}</div>}
        </div>
        {article.description && (
          <p className="text-lg italic border-l-4 border-primary pl-4 py-2">{article.description}</p>
        )}
      </div>
      
      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-6 md:p-8">
          <NewsContent content={article.content} article={article} />
        </div>
        
        <div className="p-6 bg-muted/30">
          {/* Sidebar content like related articles, tags etc */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags?.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Comments Section */}
          {article.comments && article.comments.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3">Comments</h3>
              <div className="space-y-4">
                {article.comments.map((comment) => (
                  <div key={comment.id} className="p-3 bg-background rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">{comment.author || 'Anonymous'}</div>
                      <div className="text-xs text-muted-foreground">{comment.timestamp}</div>
                    </div>
                    <p className="text-sm">{comment.content || comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <button
            onClick={handleExternalLink}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Read Original Article
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default EnhancedBlogLayout;
