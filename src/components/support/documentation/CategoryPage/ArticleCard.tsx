
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DocArticle } from '@/types/documentation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SectionAccordion } from './SectionAccordion';

interface ArticleCardProps {
  article: DocArticle;
  categoryId: string;
}

export const ArticleCard = ({ article, categoryId }: ArticleCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      key={article.id} 
      className="border border-siso-border overflow-hidden hover:border-siso-border-hover transition-all duration-300"
    >
      <div className="px-6 py-5 border-b border-siso-border/50 bg-siso-bg-alt/10">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-semibold text-siso-text-bold">{article.title}</h2>
          {article.difficulty && (
            <Badge variant="outline" className={cn(
              "text-xs",
              article.difficulty === 'beginner' && "bg-green-500/10 text-green-500 border-green-500/20",
              article.difficulty === 'intermediate' && "bg-blue-500/10 text-blue-500 border-blue-500/20", 
              article.difficulty === 'advanced' && "bg-purple-500/10 text-purple-500 border-purple-500/20"
            )}>
              {article.difficulty.charAt(0).toUpperCase() + article.difficulty.slice(1)}
            </Badge>
          )}
        </div>
        <p className="text-sm text-siso-text/70">{article.excerpt}</p>
      </div>
      
      <CardContent className="p-0">
        <div className="divide-y divide-siso-border/30">
          {article.sections.map((section) => (
            <div key={section.id} className="px-6 py-4">
              <h3 className="font-medium text-siso-text mb-3">{section.title}</h3>
              <ul className="space-y-2 ml-1">
                {section.questions.map((question) => (
                  <li key={question.id}>
                    <a 
                      href={`/support/${categoryId}/${article.slug}/${question.slug}`}
                      className="block py-1.5 text-sm text-siso-text/80 hover:text-siso-text-bold transition-colors"
                    >
                      {question.question}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
      
      <div className="px-6 py-3 border-t border-siso-border/50 bg-siso-bg-alt/5 flex justify-between items-center">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate(`/support/${categoryId}/${article.slug}`)}
        >
          View full article
        </Button>
        <span className="text-xs text-siso-text/50">
          Updated: {new Date(article.lastUpdated).toLocaleDateString()}
        </span>
      </div>
    </Card>
  );
};
