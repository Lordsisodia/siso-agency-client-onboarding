
import { DocCategory, DocArticle } from '@/types/documentation';
import { 
  getAllCategories, 
  getCategory, 
  getArticle, 
  getQuestion,
  searchDocumentation as searchStaticDocs
} from '@/data/staticDocumentation';

// Exported functions with the same signatures as the original Supabase service
export const fetchCategories = async (): Promise<DocCategory[]> => {
  // Return all categories with their basic info (without sections and questions for better performance)
  return getAllCategories();
};

export const fetchCategory = async (categorySlug: string): Promise<DocCategory | null> => {
  const category = getCategory(categorySlug);
  return category || null;
};

export const fetchArticle = async (categorySlug: string, articleSlug: string): Promise<DocArticle | null> => {
  const article = getArticle(categorySlug, articleSlug);
  return article || null;
};

export const fetchQuestion = async (categorySlug: string, articleSlug: string, questionSlug: string) => {
  const result = getQuestion(categorySlug, articleSlug, questionSlug);
  return result || { category: null, article: null, section: null, question: null };
};

export const searchDocumentation = async (query: string): Promise<DocCategory[]> => {
  return searchStaticDocs(query);
};

// This is a stub for the function, but it doesn't actually save to DB since we're using static data
export const saveQuestionFeedback = async (
  questionId: string,
  feedbackType: 'helpful' | 'not-helpful',
  userId?: string
): Promise<boolean> => {
  console.log(`Feedback saved (simulation): ${questionId}, ${feedbackType}, ${userId || 'anonymous'}`);
  return true;
};

// This is now a no-op since we're using static data
export const importTestDocumentation = async (useExpandedData: boolean = false): Promise<boolean> => {
  console.log('Using static documentation - no import needed');
  return true;
};
