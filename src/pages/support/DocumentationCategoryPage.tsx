
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { fetchCategory } from '@/services/static-documentation.service';
import { DocCategory, DocArticle } from '@/types/documentation';
import {
  BackButton,
  Breadcrumb,
  CategoryHeader,
  LoadingState,
  NotFoundState,
  ModernArticleList
} from '@/components/support/documentation/CategoryPage';

const DocumentationCategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
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
    return <LoadingState />;
  }

  if (!category) {
    return <NotFoundState />;
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <Breadcrumb categoryTitle={category.title} />
          <CategoryHeader category={category} />
          <ModernArticleList articles={category.articles} categoryId={categoryId || ''} />
          <BackButton />
        </div>
      </div>
    </MainLayout>
  );
};

export default DocumentationCategoryPage;
