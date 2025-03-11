
import { Database } from '@/integrations/supabase/types';
import { supabase } from '@/integrations/supabase/client';
import { AlertTriangle, Book, FileText, HelpCircle, Info, LifeBuoy, Settings, UserCog } from 'lucide-react';

// Type for the icon component
type IconComponent = typeof Book | typeof Settings | typeof HelpCircle | typeof Info | typeof FileText | typeof UserCog | typeof LifeBuoy | typeof AlertTriangle;

// Define the types for our documentation data
export interface DocCategory {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: IconComponent;
  articleCount: number;
  articles: DocArticle[];
}

export interface DocArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  sections?: DocSection[];
}

export interface DocSection {
  id: number;
  title: string;
  questions: DocQuestion[];
}

export interface DocQuestion {
  id: number;
  slug: string;
  question: string;
  answer: string;
}

// Map category slug to an icon component
const categoryIcons: Record<string, IconComponent> = {
  'getting-started': Book,
  'account-profile': UserCog,
  'plan-builder': Settings,
  'projects-tasks': FileText,
  'ai-features': Info,
  'api-integration': HelpCircle,
  'troubleshooting': LifeBuoy,
  'faq': AlertTriangle
};

// Fetch all documentation categories with their articles
export async function fetchCategories(): Promise<DocCategory[]> {
  const { data: categories, error } = await supabase
    .from('documentation_categories')
    .select('id, slug, title, description, icon, display_order')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  // Now fetch articles for each category
  const categoriesWithArticles: DocCategory[] = await Promise.all(
    categories.map(async (category) => {
      const { data: articles, error: articlesError } = await supabase
        .from('documentation_articles')
        .select('id, slug, title, excerpt, content')
        .eq('category_id', category.id)
        .order('display_order', { ascending: true })
        .limit(5);  // Limit to 5 articles per category for preview

      if (articlesError) {
        console.error(`Error fetching articles for category ${category.slug}:`, articlesError);
        return {
          ...category,
          icon: categoryIcons[category.slug] || Book,
          articleCount: 0,
          articles: []
        };
      }

      return {
        ...category,
        icon: categoryIcons[category.slug] || Book,
        articleCount: articles.length,
        articles: articles || []
      };
    })
  );

  return categoriesWithArticles;
}

// Fetch a specific category by slug with its articles
export async function fetchCategoryBySlug(slug: string): Promise<DocCategory | null> {
  const { data: category, error } = await supabase
    .from('documentation_categories')
    .select('id, slug, title, description, icon')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching category:', error);
    return null;
  }

  const { data: articles, error: articlesError } = await supabase
    .from('documentation_articles')
    .select('id, slug, title, excerpt, content')
    .eq('category_id', category.id)
    .order('display_order', { ascending: true });

  if (articlesError) {
    console.error('Error fetching articles:', articlesError);
    return null;
  }

  return {
    ...category,
    icon: categoryIcons[category.slug] || Book,
    articleCount: articles.length,
    articles: articles || []
  };
}

// Fetch an article by its slug with sections and questions
export async function fetchArticleBySlug(categorySlug: string, articleSlug: string): Promise<DocArticle | null> {
  // First get the category ID
  const { data: category, error: categoryError } = await supabase
    .from('documentation_categories')
    .select('id')
    .eq('slug', categorySlug)
    .single();

  if (categoryError) {
    console.error('Error fetching category:', categoryError);
    return null;
  }

  // Then get the article
  const { data: article, error: articleError } = await supabase
    .from('documentation_articles')
    .select('id, slug, title, excerpt, content')
    .eq('category_id', category.id)
    .eq('slug', articleSlug)
    .single();

  if (articleError) {
    console.error('Error fetching article:', articleError);
    return null;
  }

  // Get sections with questions
  const { data: sections, error: sectionsError } = await supabase
    .from('documentation_sections')
    .select('id, title, display_order')
    .eq('article_id', article.id)
    .order('display_order', { ascending: true });

  if (sectionsError) {
    console.error('Error fetching sections:', sectionsError);
    return { ...article, sections: [] };
  }

  // Get questions for each section
  const sectionsWithQuestions: DocSection[] = await Promise.all(
    sections.map(async (section) => {
      const { data: questions, error: questionsError } = await supabase
        .from('documentation_questions')
        .select('id, slug, question, answer')
        .eq('section_id', section.id)
        .order('display_order', { ascending: true });

      if (questionsError) {
        console.error(`Error fetching questions for section ${section.id}:`, questionsError);
        return { ...section, questions: [] };
      }

      return { ...section, questions: questions || [] };
    })
  );

  return { ...article, sections: sectionsWithQuestions };
}

// Search documentation
export async function searchDocumentation(query: string): Promise<DocCategory[]> {
  if (!query) return fetchCategories();

  // Search for articles that match the query
  const { data: articles, error } = await supabase
    .from('documentation_articles')
    .select('id, slug, title, excerpt, content, category_id')
    .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`);

  if (error) {
    console.error('Error searching documentation:', error);
    return [];
  }

  if (articles.length === 0) {
    return [];
  }

  // Group articles by category_id
  const articlesByCategory: Record<number, DocArticle[]> = {};
  articles.forEach(article => {
    if (!articlesByCategory[article.category_id]) {
      articlesByCategory[article.category_id] = [];
    }
    articlesByCategory[article.category_id].push(article);
  });

  // Fetch the categories for these articles
  const categoryIds = Object.keys(articlesByCategory).map(Number);
  const { data: categories, error: categoriesError } = await supabase
    .from('documentation_categories')
    .select('id, slug, title, description, icon')
    .in('id', categoryIds);

  if (categoriesError) {
    console.error('Error fetching categories for search results:', categoriesError);
    return [];
  }

  // Combine the categories with their matching articles
  return categories.map(category => ({
    ...category,
    icon: categoryIcons[category.slug] || Book,
    articleCount: articlesByCategory[category.id].length,
    articles: articlesByCategory[category.id] || []
  }));
}

// Fetch a specific question by its slug
export async function fetchQuestionBySlug(questionSlug: string): Promise<{
  question: DocQuestion | null;
  article: DocArticle | null;
  category: DocCategory | null;
}> {
  // Get the question
  const { data: question, error: questionError } = await supabase
    .from('documentation_questions')
    .select('id, slug, question, answer, section_id')
    .eq('slug', questionSlug)
    .single();

  if (questionError) {
    console.error('Error fetching question:', questionError);
    return { question: null, article: null, category: null };
  }

  // Get the section and article
  const { data: section, error: sectionError } = await supabase
    .from('documentation_sections')
    .select('id, title, article_id')
    .eq('id', question.section_id)
    .single();

  if (sectionError) {
    console.error('Error fetching section:', sectionError);
    return { question, article: null, category: null };
  }

  // Get the article and category
  const { data: article, error: articleError } = await supabase
    .from('documentation_articles')
    .select('id, slug, title, excerpt, content, category_id')
    .eq('id', section.article_id)
    .single();

  if (articleError) {
    console.error('Error fetching article:', articleError);
    return { question, article: null, category: null };
  }

  // Get the category
  const { data: category, error: categoryError } = await supabase
    .from('documentation_categories')
    .select('id, slug, title, description, icon')
    .eq('id', article.category_id)
    .single();

  if (categoryError) {
    console.error('Error fetching category:', categoryError);
    return { question, article, category: null };
  }

  return {
    question,
    article,
    category: {
      ...category,
      icon: categoryIcons[category.slug] || Book,
      articleCount: 0,
      articles: []
    }
  };
}
