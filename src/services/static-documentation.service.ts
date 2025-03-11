
import { DocCategory, DocArticle, DocSection, DocQuestion } from '@/types/documentation';
import { documentationCategories } from '@/constants/documentation/categories';
import { searchDocumentation } from './documentation-search.service';
import { saveQuestionFeedback } from './documentation-feedback.service';

/**
 * Get all documentation categories
 */
export const fetchCategories = (): Promise<DocCategory[]> => {
  return Promise.resolve(documentationCategories);
};

/**
 * Find a category by slug
 */
export const fetchCategory = (categorySlug: string): Promise<DocCategory | null> => {
  const category = documentationCategories.find(c => c.slug === categorySlug) || null;
  return Promise.resolve(category);
};

/**
 * Find an article by category slug and article slug
 */
export const fetchArticle = (categorySlug: string, articleSlug: string): Promise<DocArticle | null> => {
  const category = documentationCategories.find(c => c.slug === categorySlug);
  const article = category?.articles.find(a => a.slug === articleSlug) || null;
  return Promise.resolve(article);
};

/**
 * Find a specific question by category, article and question slugs
 */
export const fetchQuestion = (
  categorySlug: string, 
  articleSlug: string, 
  questionSlug: string
): Promise<{
  category: DocCategory | null;
  article: DocArticle | null;
  section: DocSection | null;
  question: DocQuestion | null;
}> => {
  const category = documentationCategories.find(c => c.slug === categorySlug) || null;
  const article = category?.articles.find(a => a.slug === articleSlug) || null;
  
  let foundSection: DocSection | null = null;
  let foundQuestion: DocQuestion | null = null;
  
  if (article) {
    for (const section of article.sections) {
      const question = section.questions.find(q => q.slug === questionSlug);
      if (question) {
        foundSection = section;
        foundQuestion = question;
        break;
      }
    }
  }
  
  return Promise.resolve({
    category,
    article,
    section: foundSection,
    question: foundQuestion
  });
};

// Re-export the search and feedback functions
export { searchDocumentation, saveQuestionFeedback };
