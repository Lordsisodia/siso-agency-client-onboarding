
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { getCategory } from '@/services/documentation.service';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const DocumentationCategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
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
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-siso-orange/10 p-3 rounded-full">
                <category.icon className="h-6 w-6 text-siso-orange" />
              </div>
              <h1 className="text-3xl font-bold text-siso-text-bold">{category.title}</h1>
            </div>
            <p className="text-siso-text/70 text-lg mb-6">{category.description}</p>
            
            {/* Search */}
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-siso-text/60" />
              <Input
                type="search"
                placeholder={`Search in ${category.title}...`}
                className="pl-10 bg-siso-bg-card/20 border-siso-border w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Article list */}
          <div className="space-y-4">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-siso-text/70">No articles found for "{searchQuery}"</p>
              </div>
            ) : (
              filteredArticles.map((article) => (
                <Card 
                  key={article.id}
                  className="border border-siso-border hover:border-siso-border-hover cursor-pointer transition-all duration-300"
                  onClick={() => navigate(`/support/${categoryId}/${article.id}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                        <p className="text-siso-text/70">{article.excerpt}</p>
                        
                        <div className="mt-4 text-xs text-siso-text/50">
                          Last updated: {article.lastUpdated}
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-3">
                          {article.difficulty}
                        </Badge>
                        <ChevronRight className="h-5 w-5 text-siso-orange" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          
          {/* Back button */}
          <div className="mt-8">
            <Button variant="outline" onClick={() => navigate('/support')}>
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
