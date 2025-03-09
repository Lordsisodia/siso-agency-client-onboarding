
-- Create necessary tables for plan chat functionality
-- This includes project_threads for persisting thread IDs
-- and plan_chat_history for storing conversation history

-- Create project_threads table if it doesn't exist
CREATE TABLE IF NOT EXISTS "public"."project_threads" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "project_id" text NOT NULL,
  "thread_id" text NOT NULL,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at" timestamp with time zone NOT NULL DEFAULT now(),
  "metadata" jsonb,
  PRIMARY KEY ("id"),
  UNIQUE ("project_id")
);

-- Create plan_chat_history table if it doesn't exist
CREATE TABLE IF NOT EXISTS "public"."plan_chat_history" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "plan_id" text NOT NULL,
  "user_message" text NOT NULL,
  "ai_response" text NOT NULL,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  "form_data" jsonb,
  "metadata" jsonb,
  PRIMARY KEY ("id")
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS "idx_project_threads_project_id" ON "public"."project_threads" ("project_id");
CREATE INDEX IF NOT EXISTS "idx_plan_chat_history_plan_id" ON "public"."plan_chat_history" ("plan_id");
