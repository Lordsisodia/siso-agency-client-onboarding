
import { supabase } from "@/integrations/supabase/client";
import { 
  Book, UserCircle, FileText, FolderKanban, 
  Sparkles, Code2, HelpCircle, LucideIcon
} from 'lucide-react';

// Type definitions for our documentation data structure
export interface DocQuestion {
  id: string;
  slug: string;
  question: string;
  answer: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface DocSection {
  id: string;
  title: string;
  display_order: number;
  questions: DocQuestion[];
  created_at: string;
  updated_at: string;
}

export interface DocArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  display_order: number;
  last_updated: string;
  created_at: string;
  updated_at: string;
  sections: DocSection[];
}

export interface DocCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  display_order: number;
  articleCount: number;
  articles: DocArticle[];
  created_at: string;
  updated_at: string;
}

// Icon mapping helper
const getIconComponent = (iconName: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    'BookIcon': Book,
    'UserCircleIcon': UserCircle,
    'FileTextIcon': FileText,
    'FolderKanbanIcon': FolderKanban,
    'SparklesIcon': Sparkles,
    'Code2Icon': Code2,
    'HelpCircleIcon': HelpCircle
  };
  
  return iconMap[iconName] || HelpCircle;
};

// Fetch all categories with article counts
export const fetchCategories = async (): Promise<DocCategory[]> => {
  try {
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('documentation_categories')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError);
      return [];
    }
    
    if (!categoriesData || categoriesData.length === 0) {
      return [];
    }
    
    // Get article counts for each category
    const categoriesWithCounts = await Promise.all(
      categoriesData.map(async (category) => {
        const { count, error: countError } = await supabase
          .from('documentation_articles')
          .select('id', { count: 'exact', head: true })
          .eq('category_id', category.id);
        
        if (countError) {
          console.error(`Error fetching article count for category ${category.id}:`, countError);
        }
        
        return {
          ...category,
          id: category.id,
          slug: category.slug,
          icon: getIconComponent(category.icon),
          articleCount: count || 0,
          articles: [] // Will be populated when needed
        } as DocCategory;
      })
    );
    
    return categoriesWithCounts;
  } catch (error) {
    console.error('Error in fetchCategories:', error);
    return [];
  }
};

// Fetch a single category with its articles
export const fetchCategory = async (categorySlug: string): Promise<DocCategory | null> => {
  try {
    // First, get the category
    const { data: categoryData, error: categoryError } = await supabase
      .from('documentation_categories')
      .select('*')
      .eq('slug', categorySlug)
      .single();
    
    if (categoryError) {
      console.error('Error fetching category:', categoryError);
      return null;
    }
    
    if (!categoryData) {
      return null;
    }
    
    // Then, get all articles for this category
    const { data: articlesData, error: articlesError } = await supabase
      .from('documentation_articles')
      .select('*')
      .eq('category_id', categoryData.id)
      .order('display_order', { ascending: true });
    
    if (articlesError) {
      console.error('Error fetching articles:', articlesError);
      return null;
    }
    
    // We need to include empty sections array for each article to satisfy the type
    const articlesWithSections: DocArticle[] = (articlesData || []).map(article => ({
      ...article,
      difficulty: article.difficulty as 'beginner' | 'intermediate' | 'advanced' | undefined,
      sections: [] // Initialize with empty sections, will be populated in fetchArticle
    }));
    
    const category: DocCategory = {
      ...categoryData,
      id: categoryData.id,
      slug: categoryData.slug,
      icon: getIconComponent(categoryData.icon),
      articleCount: articlesWithSections.length || 0,
      articles: articlesWithSections
    };
    
    return category;
  } catch (error) {
    console.error('Error in fetchCategory:', error);
    return null;
  }
};

// Fetch a single article with its sections and questions
export const fetchArticle = async (categorySlug: string, articleSlug: string): Promise<DocArticle | null> => {
  try {
    // First, get the category ID
    const { data: categoryData, error: categoryError } = await supabase
      .from('documentation_categories')
      .select('id')
      .eq('slug', categorySlug)
      .single();
    
    if (categoryError) {
      console.error('Error fetching category:', categoryError);
      return null;
    }
    
    if (!categoryData) {
      return null;
    }
    
    // Then, get the article
    const { data: articleData, error: articleError } = await supabase
      .from('documentation_articles')
      .select('*')
      .eq('category_id', categoryData.id)
      .eq('slug', articleSlug)
      .single();
    
    if (articleError) {
      console.error('Error fetching article:', articleError);
      return null;
    }
    
    if (!articleData) {
      return null;
    }
    
    // Get sections for this article
    const { data: sectionsData, error: sectionsError } = await supabase
      .from('documentation_sections')
      .select('*')
      .eq('article_id', articleData.id)
      .order('display_order', { ascending: true });
    
    if (sectionsError) {
      console.error('Error fetching sections:', sectionsError);
      return null;
    }
    
    // For each section, get its questions
    const sectionsWithQuestions = await Promise.all(
      (sectionsData || []).map(async (section) => {
        const { data: questionsData, error: questionsError } = await supabase
          .from('documentation_questions')
          .select('*')
          .eq('section_id', section.id)
          .order('display_order', { ascending: true });
        
        if (questionsError) {
          console.error(`Error fetching questions for section ${section.id}:`, questionsError);
          return { ...section, questions: [] };
        }
        
        return {
          ...section,
          questions: questionsData || []
        } as DocSection;
      })
    );
    
    const article: DocArticle = {
      ...articleData,
      difficulty: articleData.difficulty as 'beginner' | 'intermediate' | 'advanced' | undefined,
      sections: sectionsWithQuestions
    };
    
    return article;
  } catch (error) {
    console.error('Error in fetchArticle:', error);
    return null;
  }
};

// Fetch a single question with its related data
export const fetchQuestion = async (categorySlug: string, articleSlug: string, questionSlug: string): Promise<{
  category: DocCategory | null,
  article: DocArticle | null,
  section: DocSection | null,
  question: DocQuestion | null
}> => {
  try {
    // First, get the article
    const article = await fetchArticle(categorySlug, articleSlug);
    
    if (!article) {
      return { category: null, article: null, section: null, question: null };
    }
    
    // Find the section and question
    let foundSection: DocSection | null = null;
    let foundQuestion: DocQuestion | null = null;
    
    for (const section of article.sections) {
      const question = section.questions.find(q => q.slug === questionSlug);
      if (question) {
        foundSection = section;
        foundQuestion = question;
        break;
      }
    }
    
    if (!foundSection || !foundQuestion) {
      return { category: null, article, section: null, question: null };
    }
    
    // Get the category
    const category = await fetchCategory(categorySlug);
    
    return {
      category,
      article,
      section: foundSection,
      question: foundQuestion
    };
  } catch (error) {
    console.error('Error in fetchQuestion:', error);
    return { category: null, article: null, section: null, question: null };
  }
};

// Search documentation
export const searchDocumentation = async (query: string): Promise<DocCategory[]> => {
  if (!query || query.trim() === '') return await fetchCategories();
  
  const lowercaseQuery = query.toLowerCase();
  
  try {
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('documentation_categories')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError);
      return [];
    }
    
    const categories = await Promise.all(
      (categoriesData || []).map(async (category) => {
        // Search for articles that match the query
        const { data: articlesData, error: articlesError } = await supabase
          .from('documentation_articles')
          .select('*')
          .eq('category_id', category.id)
          .or(`title.ilike.%${lowercaseQuery}%,excerpt.ilike.%${lowercaseQuery}%,content.ilike.%${lowercaseQuery}%`)
          .order('display_order', { ascending: true });
        
        if (articlesError) {
          console.error('Error searching articles:', articlesError);
          return null;
        }

        // Convert to DocArticle type with empty sections array
        const articlesWithSections: DocArticle[] = (articlesData || []).map(article => ({
          ...article,
          difficulty: article.difficulty as 'beginner' | 'intermediate' | 'advanced' | undefined,
          sections: [] // Initialize with empty sections
        }));
        
        if (!articlesWithSections || articlesWithSections.length === 0) {
          // No matches in articles, check if the category itself matches
          if (
            category.title.toLowerCase().includes(lowercaseQuery) ||
            (category.description && category.description.toLowerCase().includes(lowercaseQuery))
          ) {
            // Category matches, get all its articles
            const { data: allArticles, error: allArticlesError } = await supabase
              .from('documentation_articles')
              .select('*')
              .eq('category_id', category.id)
              .order('display_order', { ascending: true });
            
            if (allArticlesError) {
              console.error('Error fetching all articles:', allArticlesError);
              return null;
            }
            
            // Convert to DocArticle type with empty sections array
            const allArticlesWithSections: DocArticle[] = (allArticles || []).map(article => ({
              ...article,
              difficulty: article.difficulty as 'beginner' | 'intermediate' | 'advanced' | undefined,
              sections: [] // Initialize with empty sections
            }));
            
            return {
              ...category,
              id: category.id,
              slug: category.slug,
              icon: getIconComponent(category.icon),
              articleCount: allArticlesWithSections.length || 0,
              articles: allArticlesWithSections
            } as DocCategory;
          }
          
          return null;
        }
        
        return {
          ...category,
          id: category.id,
          slug: category.slug,
          icon: getIconComponent(category.icon),
          articleCount: articlesWithSections.length,
          articles: articlesWithSections
        } as DocCategory;
      })
    );
    
    // Filter out null results
    return categories.filter(Boolean) as DocCategory[];
  } catch (error) {
    console.error('Error in searchDocumentation:', error);
    return [];
  }
};

// Save feedback for a question
export const saveQuestionFeedback = async (
  questionId: string,
  feedbackType: 'helpful' | 'not-helpful',
  userId?: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('documentation_feedback')
      .insert({
        question_id: questionId,
        user_id: userId,
        feedback_type: feedbackType
      });
    
    if (error) {
      console.error('Error saving feedback:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in saveQuestionFeedback:', error);
    return false;
  }
};

// Import test documentation data
export const importTestDocumentation = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/import-documentation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to import documentation: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error importing documentation:', error);
    return false;
  }
};

