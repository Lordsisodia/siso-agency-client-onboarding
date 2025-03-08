
-- Add core_tools table for tools functionality
CREATE TABLE IF NOT EXISTS public.core_tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  pricing_type TEXT,
  rating NUMERIC,
  reviews_count INTEGER,
  downloads_count INTEGER,
  likes_count INTEGER,
  website_url TEXT,
  profile_image_url TEXT,
  icon_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add onboarding_completed column to profiles if it doesn't exist
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false;

-- Create notification_type enum if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'notification_type') THEN
    CREATE TYPE notification_type AS ENUM ('alert', 'success', 'warning', 'info');
  END IF;
END$$;

-- Create event_type enum if it doesn't exist 
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'event_type') THEN
    CREATE TYPE event_type AS ENUM ('deadline', 'meeting', 'reminder');
  END IF;
END$$;

-- Enable RLS on core_tools table
ALTER TABLE IF EXISTS public.core_tools ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read core_tools
CREATE POLICY "Anyone can read core_tools" 
ON public.core_tools
FOR SELECT
USING (true);

-- Add updated_at trigger to core_tools
CREATE TRIGGER update_core_tools_updated_at
BEFORE UPDATE ON public.core_tools
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
