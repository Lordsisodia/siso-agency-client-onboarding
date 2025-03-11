
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  fetchArticle, 
  fetchCategory
} from '@/services/static-documentation.service';
import { DocArticle, DocCategory, DocSection, DocQuestion } from '@/types/documentation';

const QuestionAccordion = ({ 
  question, 
  categorySlug, 
  articleSlug 
}: { 
  question: DocQuestion, 
  categorySlug: string, 
  articleSlug: string 
}) => {
  const navigate = useNavigate();
  
  const handleQuestionClick = () => {
    navigate(`/support/${categorySlug}/${articleSlug}/${question.slug}`);
  };
  
  return (
    <div className="border-b border-siso-border/50 last:border-b-0">
      <button 
        className="w-full text-left py-4 flex justify-between items-center focus:outline-none"
        onClick={handleQuestionClick}
      >
        <h4 className="font-medium text-siso-text">{question.question}</h4>
        <ChevronRight className="h-5 w-5 text-siso-text/60" />
      </button>
    </div>
  );
};

const SectionAccordion = ({ 
  section, 
  categorySlug, 
  articleSlug 
}: { 
  section: DocSection, 
  categorySlug: string, 
  articleSlug: string 
}) => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <Card className="mb-6 border border-siso-border overflow-hidden">
      <div 
        className="p-4 cursor-pointer flex justify-between items-center bg-siso-bg-card/20"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold">{section.title}</h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-siso-text/60" />
        ) : (
          <ChevronDown className="h-5 w-5 text-siso-text/60" />
        )}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <CardContent className="p-0">
              <div className="divide-y divide-siso-border/20">
                {section.questions.map((question) => (
                  <div key={question.id} className="px-6">
                    <QuestionAccordion 
                      question={question} 
                      categorySlug={categorySlug} 
                      articleSlug={articleSlug} 
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

const DocumentationArticlePage = () => {
  const { categoryId, articleId } = useParams<{ categoryId: string; articleId: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<DocCategory | null>(null);
  const [article, setArticle] = useState<DocArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [prevArticle, setPrevArticle] = useState<DocArticle | null>(null);
  const [nextArticle, setNextArticle] = useState<DocArticle | null>(null);
  
  useEffect(() => {
    const loadData = async () => {
      if (!categoryId || !articleId) return;
      
      setIsLoading(true);
      try {
        const categoryData = await fetchCategory(categoryId);
        setCategory(categoryData);
        
        if (categoryData) {
          const articleData = await fetchArticle(categoryId, articleId);
          setArticle(articleData);
          
          // Find next and previous articles
          if (categoryData.articles.length > 0) {
            const currentIndex = categoryData.articles.findIndex(a => a.slug === articleId);
            if (currentIndex > 0) {
              setPrevArticle(categoryData.articles[currentIndex - 1]);
            } else {
              setPrevArticle(null);
            }
            
            if (currentIndex < categoryData.articles.length - 1) {
              setNextArticle(categoryData.articles[currentIndex + 1]);
            } else {
              setNextArticle(null);
            }
          }
        }
      } catch (error) {
        console.error('Error loading article:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [categoryId, articleId]);
  
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

  if (!category || !article) {
    return (
      <MainLayout>
        <div className="container mx-auto py-12 px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
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
              <Link to={`/support/${categoryId}`} className="text-siso-text/70 hover:text-siso-text transition-colors">
                {category.title}
              </Link>
              <ChevronRight className="h-4 w-4 mx-2 text-siso-text/50" />
              <span className="text-siso-text-bold">{article.title}</span>
            </nav>
          </div>
          
          {/* Article header */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-siso-text-bold">{article.title}</h1>
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
            
            <p className="text-lg text-siso-text/80 mb-4">{article.excerpt}</p>
            
            <div className="text-xs text-siso-text/50">
              Last updated: {new Date(article.lastUpdated).toLocaleDateString()}
            </div>
          </div>
          
          {/* Article content with collapsible sections */}
          <div className="mb-8">
            {article.sections.map((section) => (
              <SectionAccordion 
                key={section.id} 
                section={section} 
                categorySlug={categoryId} 
                articleSlug={article.slug} 
              />
            ))}
          </div>
          
          {/* Next/Previous navigation */}
          <div className="mt-12 grid grid-cols-2 gap-4">
            {prevArticle && (
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => navigate(`/support/${categoryId}/${prevArticle.slug}`)}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                <div className="text-left">
                  <div className="text-xs text-siso-text/60">Previous</div>
                  <div className="text-sm truncate">{prevArticle.title}</div>
                </div>
              </Button>
            )}
            
            {nextArticle && (
              <Button 
                variant="outline" 
                className="justify-end ml-auto"
                onClick={() => navigate(`/support/${categoryId}/${nextArticle.slug}`)}
              >
                <div className="text-right">
                  <div className="text-xs text-siso-text/60">Next</div>
                  <div className="text-sm truncate">{nextArticle.title}</div>
                </div>
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
          
          <Separator className="my-8" />
          
          {/* Feedback section */}
          <div className="mt-8 text-center">
            <h3 className="text-lg font-medium mb-2">Was this article helpful?</h3>
            <div className="flex justify-center gap-4">
              <Button variant="outline">Yes, it helped</Button>
              <Button variant="outline">No, I need more help</Button>
            </div>
          </div>
          
          {/* Back to category */}
          <div className="mt-8 text-center">
            <Button variant="ghost" onClick={() => navigate(`/support/${categoryId}`)}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to {category.title}
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DocumentationArticlePage;
