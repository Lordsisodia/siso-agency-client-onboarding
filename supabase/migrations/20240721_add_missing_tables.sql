
-- Create portfolio_projects table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT,
  client TEXT,
  date DATE,
  duration TEXT,
  features TEXT[],
  challenge TEXT,
  solution TEXT,
  results TEXT,
  image_url TEXT,
  gallery TEXT[],
  tags TEXT[],
  category_id UUID,
  featured BOOLEAN DEFAULT false,
  technologies TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create portfolio_categories table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.portfolio_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for portfolio_projects
ALTER TABLE IF EXISTS public.portfolio_projects ENABLE ROW LEVEL SECURITY;
-- Enable RLS for portfolio_categories
ALTER TABLE IF EXISTS public.portfolio_categories ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read portfolio_projects
CREATE POLICY "Anyone can read portfolio projects" 
ON public.portfolio_projects FOR SELECT 
USING (true);

-- Create policy to allow anyone to read portfolio_categories
CREATE POLICY "Anyone can read portfolio categories" 
ON public.portfolio_categories FOR SELECT 
USING (true);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_portfolio_projects_updated_at
BEFORE UPDATE ON public.portfolio_projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_categories_updated_at
BEFORE UPDATE ON public.portfolio_categories
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
