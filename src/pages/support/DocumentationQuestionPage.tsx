
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { ArrowLeft, Clock, HelpCircle, Frown, Meh, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { 
  fetchQuestion,
  saveQuestionFeedback
} from '@/services/static-documentation.service';
import { DocCategory, DocArticle, DocSection, DocQuestion } from '@/types/documentation';
import { useAuthSession } from '@/hooks/core';
import { Breadcrumb } from '@/components/support/documentation/CategoryPage';

const DocumentationQuestionPage = () => {
  const { categoryId, articleId, questionId } = useParams<{ 
    categoryId: string;
    articleId: string;
    questionId: string;
  }>();
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuthSession();
  const [feedbackGiven, setFeedbackGiven] = useState<'helpful' | 'neutral' | 'not-helpful' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState<DocCategory | null>(null);
  const [article, setArticle] = useState<DocArticle | null>(null);
  const [foundSection, setFoundSection] = useState<DocSection | null>(null);
  const [foundQuestion, setFoundQuestion] = useState<DocQuestion | null>(null);
  const [relatedQuestions, setRelatedQuestions] = useState<DocQuestion[]>([]);
  
  useEffect(() => {
    const loadData = async () => {
      if (!categoryId || !articleId || !questionId) return;
      
      setIsLoading(true);
      try {
        const data = await fetchQuestion(categoryId, articleId, questionId);
        
        setCategory(data.category);
        setArticle(data.article);
        setFoundSection(data.section);
        setFoundQuestion(data.question);
        
        if (data.section && data.question) {
          const related = data.section.questions
            .filter(q => q.id !== data.question?.id)
            .slice(0, 5);
          setRelatedQuestions(related);
        }
      } catch (error) {
        console.error('Error loading question:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [categoryId, articleId, questionId]);
  
  const handleFeedback = async (type: 'helpful' | 'neutral' | 'not-helpful') => {
    if (feedbackGiven || !foundQuestion) return;
    
    setFeedbackGiven(type);
    
    try {
      await saveQuestionFeedback(foundQuestion.id, type, user?.id);
      
      toast({
        title: "Thank you for your feedback!",
        description: "We'll use this to improve our documentation.",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error saving feedback:', error);
      toast({
        title: "Failed to submit feedback",
        description: "Please try again later.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
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
            <h2 className="text-2xl font-bold mb-4">Content Not Found</h2>
            <Button onClick={() => navigate('/support')}>
              Back to Help Center
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!foundQuestion || !foundSection) {
    return (
      <MainLayout>
        <div className="container mx-auto py-12 px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Question Not Found</h2>
            <Button onClick={() => navigate(`/support/${categoryId}`)}>
              Back to {category.title}
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 sm:px-6 max-w-6xl">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumb 
            categoryTitle={category.title}
            categorySlug={categoryId}
            questionTitle={foundQuestion.question}
          />
        </div>
        
        {/* Page Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content (3/4 width on desktop) */}
          <div className="lg:col-span-3">
            {/* Back Button */}
            <Button 
              variant="ghost" 
              className="text-siso-text/70 hover:text-siso-text hover:bg-siso-bg-alt/30 -ml-2 mb-4"
              onClick={() => navigate(`/support/${categoryId}`)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {category.title}
            </Button>
            
            {/* Question Header */}
            <div className="mb-6">
              {article.difficulty && (
                <Badge 
                  variant="outline" 
                  className={cn(
                    "mb-3",
                    article.difficulty === 'beginner' && "bg-green-500/10 text-green-500 border-green-500/20",
                    article.difficulty === 'intermediate' && "bg-blue-500/10 text-blue-500 border-blue-500/20",
                    article.difficulty === 'advanced' && "bg-purple-500/10 text-purple-500 border-purple-500/20"
                  )}
                >
                  {article.difficulty.charAt(0).toUpperCase() + article.difficulty.slice(1)}
                </Badge>
              )}
              <h1 className="text-2xl lg:text-3xl font-bold text-siso-text-bold mb-2">{foundQuestion.question}</h1>
              {article.lastUpdated && (
                <div className="flex items-center text-sm text-siso-text/60 mt-2">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>Updated: {new Date(article.lastUpdated).toLocaleDateString()}</span>
                </div>
              )}
            </div>
            
            {/* Answer Content */}
            <div className="bg-siso-bg-alt/20 border border-siso-border rounded-xl p-6 mb-8">
              <div className="prose prose-invert max-w-none">
                <p className="text-siso-text leading-relaxed text-lg">{foundQuestion.answer}</p>
              </div>
            </div>
            
            {/* Contact Support Card */}
            <div className="bg-gradient-to-br from-siso-red/10 to-siso-orange/10 border border-siso-orange/20 rounded-xl p-6 mb-6">
              <h3 className="flex items-center text-md font-medium text-siso-text-bold mb-2">
                Need more help?
              </h3>
              <p className="text-sm text-siso-text/80 mb-3">
                If you couldn't find what you're looking for, our support team is ready to assist.
              </p>
              <Button className="w-full bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90">
                Contact Support
              </Button>
            </div>
          </div>
          
          {/* Sidebar (1/4 width on desktop) */}
          <div className="lg:col-span-1">
            {/* Feedback Section */}
            <div className="bg-siso-bg-alt/10 border border-siso-border/50 rounded-xl p-5 mb-5">
              <h3 className="text-md font-medium text-center mb-4">Did this answer your question?</h3>
              <div className="flex justify-between items-center">
                <Button
                  onClick={() => handleFeedback('not-helpful')}
                  variant="ghost"
                  className={cn(
                    "flex flex-col items-center gap-2 transition-all duration-200 hover:bg-siso-bg-alt/30 px-3",
                    feedbackGiven === 'not-helpful' ? "bg-siso-bg-alt/30 ring-1 ring-red-500/30" : "",
                    feedbackGiven !== null && feedbackGiven !== 'not-helpful' ? "opacity-50" : ""
                  )}
                  disabled={feedbackGiven !== null}
                >
                  <Frown className={cn(
                    "h-8 w-8",
                    feedbackGiven === 'not-helpful' ? "text-red-400" : "text-siso-text"
                  )} />
                </Button>
                
                <Button
                  onClick={() => handleFeedback('neutral')}
                  variant="ghost"
                  className={cn(
                    "flex flex-col items-center gap-2 transition-all duration-200 hover:bg-siso-bg-alt/30 px-3",
                    feedbackGiven === 'neutral' ? "bg-siso-bg-alt/30 ring-1 ring-yellow-500/30" : "",
                    feedbackGiven !== null && feedbackGiven !== 'neutral' ? "opacity-50" : ""
                  )}
                  disabled={feedbackGiven !== null}
                >
                  <Meh className={cn(
                    "h-8 w-8",
                    feedbackGiven === 'neutral' ? "text-yellow-400" : "text-siso-text"
                  )} />
                </Button>
                
                <Button
                  onClick={() => handleFeedback('helpful')}
                  variant="ghost"
                  className={cn(
                    "flex flex-col items-center gap-2 transition-all duration-200 hover:bg-siso-bg-alt/30 px-3",
                    feedbackGiven === 'helpful' ? "bg-siso-bg-alt/30 ring-1 ring-green-500/30" : "",
                    feedbackGiven !== null && feedbackGiven !== 'helpful' ? "opacity-50" : ""
                  )}
                  disabled={feedbackGiven !== null}
                >
                  <Smile className={cn(
                    "h-8 w-8",
                    feedbackGiven === 'helpful' ? "text-green-400" : "text-siso-text"
                  )} />
                </Button>
              </div>
              
              {feedbackGiven && (
                <div className="mt-3 text-center text-siso-text/80 text-sm">
                  <p>Thank you for your feedback!</p>
                </div>
              )}
            </div>
            
            {/* Section Questions */}
            <div className="bg-siso-bg-alt/20 border border-siso-border rounded-xl p-5 mb-5">
              <h3 className="flex items-center text-md font-medium text-siso-text-bold mb-3">
                <HelpCircle className="h-4 w-4 mr-2 text-siso-orange" />
                {foundSection.title || "In this article"}
              </h3>
              <Separator className="bg-siso-border/30 mb-3" />
              <ul className="space-y-1.5">
                {foundSection.questions.map(q => (
                  <li key={q.id}>
                    <Link 
                      to={`/support/${categoryId}/${articleId}/${q.slug}`}
                      className={cn(
                        "block py-2 px-3 rounded-md transition-colors flex justify-between items-center",
                        q.id === foundQuestion.id 
                          ? "bg-siso-orange/10 text-siso-orange font-medium"
                          : "text-siso-text hover:bg-siso-bg-alt/40 hover:text-siso-text-bold"
                      )}
                    >
                      <span className="line-clamp-2 text-sm">{q.question}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Related Articles */}
            {relatedQuestions.length > 0 && (
              <div className="bg-siso-bg-alt/20 border border-siso-border rounded-xl p-5">
                <h3 className="flex items-center text-md font-medium text-siso-text-bold mb-3">
                  <HelpCircle className="h-4 w-4 mr-2 text-siso-orange" />
                  Related Articles
                </h3>
                <Separator className="bg-siso-border/30 mb-3" />
                <ul className="space-y-1.5">
                  {relatedQuestions.map(q => (
                    <li key={q.id}>
                      <Link 
                        to={`/support/${categoryId}/${articleId}/${q.slug}`}
                        className="group block py-2 px-3 text-siso-text rounded-md hover:bg-siso-bg-alt/40 hover:text-siso-text-bold transition-colors flex justify-between items-center"
                      >
                        <span className="line-clamp-2 text-sm">{q.question}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DocumentationQuestionPage;
