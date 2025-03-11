
-- Make slug column optional (nullable) in video_categories table
ALTER TABLE IF EXISTS "public"."video_categories" 
ALTER COLUMN "slug" DROP NOT NULL;

-- Add comment explaining the change
COMMENT ON COLUMN "public"."video_categories"."slug" IS 'Optional URL-friendly identifier for the category';
