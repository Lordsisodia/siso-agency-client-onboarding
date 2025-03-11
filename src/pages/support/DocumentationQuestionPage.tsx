
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { getCategory, getArticle } from '@/services/documentation.service';
import { ChevronRight, ChevronLeft, ArrowLeft, Clock, Sparkles, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const DocumentationQuestionPage = () => {
  const { categoryId, articleId, questionId } = useParams<{ 
    categoryId: string;
    articleId: string;
    questionId: string;
  }>();
  
  const navigate = useNavigate();
  const category = categoryId ? getCategory(categoryId) : null;
  const article = category && articleId ? getArticle(categoryId, articleId) : null;
  
  if (!category || !article) {
    return (
      <MainLayout>
        <div className="container mx-auto py-12 px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Content Not Found</h2>
            <Button onClick={() => navigate('/support')}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Help Center
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  // Find the specific question
  let foundQuestion = null;
  let foundSection = null;
  
  for (const section of article.sections) {
    const question = section.questions.find(q => q.id === questionId);
    if (question) {
      foundQuestion = question;
      foundSection = section;
      break;
    }
  }
  
  if (!foundQuestion || !foundSection) {
    return (
      <MainLayout>
        <div className="container mx-auto py-12 px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Question Not Found</h2>
            <Button onClick={() => navigate(`/support/${categoryId}`)}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to {category.title}
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Find related questions (other questions in the same section)
  const relatedQuestions = foundSection.questions
    .filter(q => q.id !== questionId)
    .slice(0, 5); // Show up to 5 related questions
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb navigation */}
          <div className="mb-6">
            <nav className="flex items-center flex-wrap text-sm">
              <Link to="/support" className="text-siso-text/70 hover:text-siso-text transition-colors">
                Help Center
              </Link>
              <ChevronRight className="h-4 w-4 mx-2 text-siso-text/50" />
              <Link 
                to={`/support/${categoryId}`} 
                className="text-siso-text/70 hover:text-siso-text transition-colors"
              >
                {category.title}
              </Link>
              <ChevronRight className="h-4 w-4 mx-2 text-siso-text/50" />
              <span className="font-medium text-siso-text-bold">{article.title}</span>
            </nav>
          </div>
          
          {/* Back to category button */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              className="text-siso-text/70 hover:text-siso-text hover:bg-siso-bg-alt/30 -ml-2"
              onClick={() => navigate(`/support/${categoryId}`)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {category.title}
            </Button>
          </div>
          
          {/* Main content area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Article info */}
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
                <h1 className="text-2xl font-bold text-siso-text-bold mb-1">{foundQuestion.question}</h1>
                {article.lastUpdated && (
                  <div className="flex items-center text-sm text-siso-text/60 mt-3">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>Updated: {article.lastUpdated}</span>
                  </div>
                )}
              </div>
              
              {/* Question answer - main content */}
              <div className="bg-siso-bg-alt/20 border border-siso-border rounded-xl p-6 mb-8">
                <div className="prose prose-invert max-w-none">
                  <p className="text-siso-text leading-relaxed text-lg">{foundQuestion.answer}</p>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Section information */}
              <div className="bg-siso-bg-alt/20 border border-siso-border rounded-xl p-5 mb-5">
                <h3 className="flex items-center text-md font-medium text-siso-text-bold mb-3">
                  <Sparkles className="h-4 w-4 mr-2 text-siso-orange" />
                  {foundSection.title || "In this article"}
                </h3>
                <Separator className="bg-siso-border/30 mb-3" />
                <ul className="space-y-2">
                  {foundSection.questions.map(q => (
                    <li key={q.id}>
                      <Link 
                        to={`/support/${categoryId}/${articleId}/${q.id}`}
                        className={cn(
                          "block py-1.5 px-2 rounded-md transition-colors",
                          q.id === questionId 
                            ? "bg-siso-orange/10 text-siso-orange font-medium"
                            : "text-siso-text hover:bg-siso-bg-alt/50 hover:text-siso-text-bold"
                        )}
                      >
                        {q.question}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Related content */}
              {relatedQuestions.length > 0 && (
                <div className="bg-siso-bg-alt/20 border border-siso-border rounded-xl p-5">
                  <h3 className="flex items-center text-md font-medium text-siso-text-bold mb-3">
                    <BookOpen className="h-4 w-4 mr-2 text-siso-orange" />
                    Related Questions
                  </h3>
                  <Separator className="bg-siso-border/30 mb-3" />
                  <ul className="space-y-2">
                    {relatedQuestions.map(q => (
                      <li key={q.id}>
                        <Link 
                          to={`/support/${categoryId}/${articleId}/${q.id}`}
                          className="block py-1.5 text-siso-text hover:text-siso-orange transition-colors"
                        >
                          {q.question}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DocumentationQuestionPage;
