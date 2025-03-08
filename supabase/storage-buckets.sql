
-- Create avatars storage bucket if it doesn't exist
DO $$ 
BEGIN
  -- Check if the bucket already exists
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE name = 'avatars'
  ) THEN
    -- Create the bucket if it doesn't exist
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('avatars', 'avatars', true);
    
    -- Add a policy to allow authenticated users to upload avatars
    INSERT INTO storage.policies (name, definition, bucket_id)
    VALUES (
      'Avatar Upload Policy',
      '(bucket_id = ''avatars''::text AND auth.role() = ''authenticated''::text)',
      'avatars'
    );
    
    -- Add a policy to allow public access to avatars for viewing
    INSERT INTO storage.policies (name, definition, bucket_id)
    VALUES (
      'Avatar Public Access Policy',
      '(bucket_id = ''avatars''::text)',
      'avatars'
    );
  END IF;
END $$;
