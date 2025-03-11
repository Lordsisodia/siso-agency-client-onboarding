
import { DocCategory } from '@/types/documentation';
import { documentationCategories } from '@/constants/documentation/categories';

/**
 * Search across all documentation categories and articles
 */
export const searchDocumentation = (query: string): Promise<DocCategory[]> => {
  if (!query) {
    return Promise.resolve(documentationCategories);
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  
  const filteredCategories = documentationCategories.map(category => {
    // Filter articles in each category
    const matchedArticles = category.articles.filter(article => {
      // Check article title and content
      if (
        article.title.toLowerCase().includes(normalizedQuery) ||
        article.excerpt.toLowerCase().includes(normalizedQuery) ||
        article.content.toLowerCase().includes(normalizedQuery)
      ) {
        return true;
      }
      
      // Check sections and questions
      return article.sections.some(section => 
        section.title.toLowerCase().includes(normalizedQuery) ||
        section.questions.some(question => 
          question.question.toLowerCase().includes(normalizedQuery) ||
          question.answer.toLowerCase().includes(normalizedQuery)
        )
      );
    });
    
    // Return category with filtered articles if any match found
    if (matchedArticles.length > 0) {
      return {
        ...category,
        articles: matchedArticles,
        articleCount: matchedArticles.length
      };
    }
    
    // Return null if no matches in this category
    return null;
  }).filter(Boolean) as DocCategory[];
  
  return Promise.resolve(filteredCategories);
};
