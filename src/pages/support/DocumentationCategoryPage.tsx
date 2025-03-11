
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  fetchCategory, 
  DocCategory, 
  DocArticle
} from '@/services/supabase-documentation.service';

const DocumentationCategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<DocCategory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      if (!categoryId) return;
      
      setIsLoading(true);
      try {
        const categoryData = await fetchCategory(categoryId);
        setCategory(categoryData);
      } catch (error) {
        console.error('Error loading category:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [categoryId]);
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto py-12 px-4">
          <div className="flex justify-center">
            <div className="animate-pulse h-8 w-36 bg-siso-bg-alt/50 rounded"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!category) {
    return (
      <MainLayout>
        <div className="container mx-auto py-12 px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Category Not Found</h2>
            <Button onClick={() => navigate('/support')}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Help Center
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb navigation */}
          <div className="mb-6">
            <nav className="flex items-center text-sm">
              <Link to="/support" className="text-siso-text/70 hover:text-siso-text transition-colors">
                Help Center
              </Link>
              <ChevronRight className="h-4 w-4 mx-2 text-siso-text/50" />
              <span className="text-siso-text-bold">{category.title}</span>
            </nav>
          </div>
          
          {/* Category header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-siso-orange/10 p-3 rounded-lg">
                <category.icon className="h-6 w-6 text-siso-orange" />
              </div>
              <h1 className="text-3xl font-bold text-siso-text-bold">{category.title}</h1>
            </div>
            
            <p className="text-lg text-siso-text/80 mb-6">{category.description}</p>
          </div>
          
          {/* Articles list */}
          <div className="space-y-6">
            {category.articles.map((article) => (
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
                              <Link 
                                to={`/support/${categoryId}/${article.slug}/${question.slug}`}
                                className="block py-1.5 text-sm text-siso-text/80 hover:text-siso-text-bold transition-colors"
                              >
                                {question.question}
                              </Link>
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
                    Updated: {new Date(article.last_updated).toLocaleDateString()}
                  </span>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Back button */}
          <div className="mt-8">
            <Button variant="ghost" onClick={() => navigate('/support')}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Help Center
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DocumentationCategoryPage;
