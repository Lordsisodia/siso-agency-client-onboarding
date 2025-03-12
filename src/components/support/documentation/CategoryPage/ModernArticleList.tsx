
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DocArticle } from '@/types/documentation';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ModernArticleListProps {
  articles: DocArticle[];
  categoryId: string;
}

export const ModernArticleList = ({ articles, categoryId }: ModernArticleListProps) => {
  const navigate = useNavigate();

  const handleArticleClick = (articleSlug: string) => {
    navigate(`/support/${categoryId}/${articleSlug}`);
  };

  return (
    <div className="space-y-8">
      {articles.map((article) => (
        <div 
          key={article.id}
          className="group bg-siso-bg-alt/10 border border-siso-border rounded-xl overflow-hidden hover:border-siso-orange/30 transition-all duration-300"
        >
          <div className="p-6 cursor-pointer" onClick={() => handleArticleClick(article.slug)}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <h2 className="text-xl font-semibold text-siso-text-bold group-hover:text-siso-orange transition-colors">
                    {article.title}
                  </h2>
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
                <p className="text-sm text-siso-text/70 mb-5 max-w-3xl">{article.excerpt}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-siso-text/30 group-hover:text-siso-orange transition-colors" />
            </div>
            
            {/* Popular Questions Preview */}
            <div className="mt-5 space-y-2">
              <div className="text-xs uppercase tracking-wider text-siso-text/50 font-medium mt-6 mb-3">
                Popular Questions
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {article.sections.flatMap(section => 
                  section.questions.slice(0, 2).map(question => (
                    <li key={question.id} className="text-sm">
                      <a 
                        href={`/support/${categoryId}/${article.slug}/${question.slug}`}
                        className="flex items-center py-2 px-3 rounded-lg hover:bg-siso-bg-alt/20 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <span className="text-siso-text/80 hover:text-siso-orange transition-colors">
                          {question.question}
                        </span>
                      </a>
                    </li>
                  ))
                ).slice(0, 4)}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-siso-border/30 py-3 px-6 flex justify-end items-center bg-siso-bg-alt/5">
            <span className="text-xs text-siso-text/50">
              Updated: {new Date(article.lastUpdated).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
