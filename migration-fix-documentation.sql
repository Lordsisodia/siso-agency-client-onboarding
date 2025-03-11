
-- This is an improved migration file to create the documentation tables
-- Run this if you're having issues with the previous migrations

-- Create documentation_categories table
CREATE TABLE IF NOT EXISTS public.documentation_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create documentation_articles table
CREATE TABLE IF NOT EXISTS public.documentation_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.documentation_categories(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  display_order INTEGER NOT NULL DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(category_id, slug)
);

-- Create documentation_sections table
CREATE TABLE IF NOT EXISTS public.documentation_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES public.documentation_articles(id) ON DELETE CASCADE,
  title TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create documentation_questions table
CREATE TABLE IF NOT EXISTS public.documentation_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES public.documentation_sections(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT DEFAULT '',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(section_id, slug)
);

-- Create documentation_feedback table
CREATE TABLE IF NOT EXISTS public.documentation_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES public.documentation_questions(id) ON DELETE CASCADE,
  user_id UUID, -- Optional user ID if logged in
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('helpful', 'not-helpful')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add triggers for updated_at columns
DO $$
BEGIN
  -- documentation_categories
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_documentation_categories_updated_at'
  ) THEN
    CREATE TRIGGER update_documentation_categories_updated_at
      BEFORE UPDATE ON public.documentation_categories
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;

  -- documentation_articles
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_documentation_articles_updated_at'
  ) THEN
    CREATE TRIGGER update_documentation_articles_updated_at
      BEFORE UPDATE ON public.documentation_articles
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;

  -- documentation_sections
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_documentation_sections_updated_at'
  ) THEN
    CREATE TRIGGER update_documentation_sections_updated_at
      BEFORE UPDATE ON public.documentation_sections
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;

  -- documentation_questions
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_documentation_questions_updated_at'
  ) THEN
    CREATE TRIGGER update_documentation_questions_updated_at
      BEFORE UPDATE ON public.documentation_questions
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- These instructions should help to manually create the documentation data:
/*
To complete the setup of your documentation system:

1. First create the tables using the SQL code above
2. Use the ImportDocumentationPage to import sample documentation content
3. Alternatively, you can manually add categories, articles, sections, and questions

Example of adding a category:
INSERT INTO documentation_categories (slug, title, description, icon, display_order)
VALUES ('getting-started', 'Getting Started', 'Learn the basics of our platform', 'SparklesIcon', 1);

Example of adding an article:
INSERT INTO documentation_articles (category_id, slug, title, excerpt, difficulty, display_order)
VALUES (
  '(category-id-here)', 
  'platform-overview', 
  'Platform Overview',
  'Learn about our platform capabilities', 
  'beginner',
  1
);

Example of adding a section:
INSERT INTO documentation_sections (article_id, title, display_order)
VALUES ('(article-id-here)', 'General Platform Overview', 1);

Example of adding a question:
INSERT INTO documentation_questions (section_id, slug, question, answer, display_order)
VALUES (
  '(section-id-here)', 
  'what-is-platform', 
  'What is this platform and what can it do for me?', 
  'This platform helps you build applications faster with AI assistance.',
  1
);
*/
