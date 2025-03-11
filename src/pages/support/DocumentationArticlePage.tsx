
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { getCategory, getArticle, DocSection, DocQuestion } from '@/services/documentation.service';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

const QuestionAccordion = ({ question }: { question: DocQuestion }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-siso-border/50 last:border-b-0">
      <button 
        className="w-full text-left py-4 flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="font-medium text-siso-text">{question.question}</h4>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-siso-text/60" />
        ) : (
          <ChevronDown className="h-5 w-5 text-siso-text/60" />
        )}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-4 prose prose-invert max-w-none text-siso-text/80 text-sm">
              {question.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SectionAccordion = ({ section }: { section: DocSection }) => {
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
                    <QuestionAccordion question={question} />
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
  
  const category = categoryId ? getCategory(categoryId) : null;
  const article = categoryId && articleId ? getArticle(categoryId, articleId) : null;
  
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

  // Find next and previous articles for navigation
  const categoryArticles = category.articles;
  const currentIndex = categoryArticles.findIndex(a => a.id === articleId);
  const prevArticle = currentIndex > 0 ? categoryArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < categoryArticles.length - 1 ? categoryArticles[currentIndex + 1] : null;

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
              <Badge variant="outline" className="text-xs">
                {article.difficulty}
              </Badge>
            </div>
            
            <p className="text-lg text-siso-text/80 mb-4">{article.excerpt}</p>
            
            <div className="text-xs text-siso-text/50">
              Last updated: {article.lastUpdated}
            </div>
          </div>
          
          {/* Article content with collapsible sections */}
          <div className="mb-8">
            {article.sections.map((section) => (
              <SectionAccordion key={section.id} section={section} />
            ))}
          </div>
          
          {/* Next/Previous navigation */}
          <div className="mt-12 grid grid-cols-2 gap-4">
            {prevArticle && (
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => navigate(`/support/${categoryId}/${prevArticle.id}`)}
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
                onClick={() => navigate(`/support/${categoryId}/${nextArticle.id}`)}
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
