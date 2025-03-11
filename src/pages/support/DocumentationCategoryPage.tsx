
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { getCategory } from '@/services/documentation.service';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronLeft, Search, Settings, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useViewportLoading } from '@/hooks/useViewportLoading';

const DocumentationCategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  
  const category = categoryId ? getCategory(categoryId) : null;
  
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
  
  const filteredArticles = searchQuery 
    ? category.articles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : category.articles;

  const toggleQuestion = (questionId: string) => {
    if (expandedQuestion === questionId) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(questionId);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb navigation */}
          <div className="mb-6">
            <nav className="flex items-center text-sm">
              <Link to="/support" className="text-siso-text/70 hover:text-siso-text transition-colors">
                All Collections
              </Link>
              <ChevronRight className="h-4 w-4 mx-2 text-siso-text/50" />
              <span className="font-medium text-siso-text-bold">{category.title}</span>
            </nav>
          </div>
          
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-siso-red/20 to-siso-orange/20 p-3 rounded-full mr-4">
                <Settings className="h-6 w-6 text-siso-orange" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-siso-text-bold mb-1">{category.title}</h1>
                <p className="text-siso-text/90">{category.description}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-siso-text/80 font-medium bg-siso-bg-alt/50 px-3 py-1 rounded-full">
                {category.articleCount} articles
              </div>
            </div>
            
            {/* Search */}
            <div className="relative mt-6">
              <div className="relative flex items-center">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-siso-text/60">
                  <Search className="h-4 w-4" />
                </div>
                <Input
                  type="search"
                  placeholder={`Search in ${category.title}...`}
                  className="pl-10 py-6 bg-siso-bg-alt/30 border-siso-border rounded-xl w-full focus:border-siso-orange focus:ring focus:ring-siso-orange/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Article list with collapsible questions */}
          <div>
            {filteredArticles.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-siso-text/80">No articles found for "{searchQuery}"</p>
              </div>
            ) : (
              <div className="bg-siso-bg-alt/20 border border-siso-border rounded-xl overflow-hidden">
                {filteredArticles.map((article) => (
                  <div key={article.id} className="border-b border-siso-border/40 last:border-b-0">
                    {article.sections.map((section) => (
                      <div key={section.id}>
                        {section.questions.map((question, index) => (
                          <div key={question.id} className={`border-b border-siso-border/20 last:border-b-0 ${
                            expandedQuestion === question.id ? "bg-siso-bg-alt/30" : ""
                          }`}>
                            <button
                              onClick={() => toggleQuestion(question.id)}
                              className="w-full text-left py-5 px-6 flex items-center justify-between hover:bg-siso-bg-alt/40 transition-colors"
                            >
                              <span className="font-medium text-siso-text-bold">{question.question}</span>
                              <ChevronDown
                                className={`h-5 w-5 text-siso-orange transition-transform duration-300 ease-in-out ${
                                  expandedQuestion === question.id ? "transform rotate-180" : ""
                                }`}
                              />
                            </button>
                            
                            {expandedQuestion === question.id && (
                              <div className="px-6 pb-5 pt-0 text-siso-text/90 leading-relaxed">
                                <p>{question.answer}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Back button */}
          <div className="mt-10 flex justify-center">
            <Button 
              variant="outline" 
              className="px-5 py-2 border-siso-border hover:border-siso-orange/50 hover:bg-siso-bg-alt/30 transition-colors"
              onClick={() => navigate('/support')}
            >
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
