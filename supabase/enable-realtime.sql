
-- Enable realtime for profiles table
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
INSERT INTO supabase_realtime.subscription (publication, claims)
VALUES ('supabase_realtime', '{}'::JSONB);
INSERT INTO supabase_realtime.publication (name, tables)
VALUES ('supabase_realtime', '{public.profiles}'::TEXT[]);
