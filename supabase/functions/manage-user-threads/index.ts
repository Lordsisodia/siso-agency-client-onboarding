
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { OpenAI } from "https://esm.sh/openai@4.26.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY')
});

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * List all threads for a project
 */
async function listProjectThreads(projectId: string) {
  try {
    const { data, error } = await supabase
      .from('project_threads')
      .select('*')
      .eq('project_id', projectId);
      
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error("Error listing project threads:", err);
    throw new Error(`Failed to list threads: ${err.message}`);
  }
}

/**
 * Get or create a thread for a user or project
 */
async function getOrCreateThread(userId: string, projectId?: string, metadata?: any) {
  try {
    let threadQuery;
    let existingThread;
    
    // Check if there's an existing thread for this project or user
    if (projectId) {
      const { data, error } = await supabase
        .from('project_threads')
        .select('*')
        .eq('project_id', projectId)
        .eq('thread_status', 'active')
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (error) throw error;
      existingThread = data?.[0];
    } else {
      // For user onboarding threads
      const { data, error } = await supabase
        .from('user_threads')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'onboarding')
        .eq('assistant_id', 'onboarding')
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (error) throw error;
      existingThread = data?.[0];
    }
    
    // If thread exists, return it
    if (existingThread) {
      return { 
        id: existingThread.thread_id,
        isNew: false 
      };
    }
    
    // Create a new thread
    console.log(`Creating new thread for ${projectId ? 'project' : 'user'}: ${projectId || userId}`);
    const thread = await openai.beta.threads.create();
    
    // Save the thread reference
    if (projectId) {
      const { error } = await supabase
        .from('project_threads')
        .insert({
          project_id: projectId,
          thread_id: thread.id,
          metadata: metadata || {}
        });
      
      if (error) throw error;
    } else {
      // For user onboarding
      const { error } = await supabase
        .from('user_threads')
        .insert({
          user_id: userId,
          thread_id: thread.id,
          assistant_id: 'onboarding',
          title: 'User Onboarding',
          status: 'onboarding',
          metadata: metadata || {}
        });
      
      if (error) throw error;
    }
    
    return { 
      id: thread.id,
      isNew: true 
    };
  } catch (err) {
    console.error("Error in getOrCreateThread:", err);
    throw new Error(`Failed to get or create thread: ${err.message}`);
  }
}

/**
 * Delete a thread both from OpenAI and our database
 */
async function deleteThread(threadId: string, projectId?: string) {
  try {
    // Try to delete from OpenAI first
    try {
      await openai.beta.threads.del(threadId);
      console.log(`Deleted thread ${threadId} from OpenAI`);
    } catch (oaiErr) {
      console.error(`Could not delete thread ${threadId} from OpenAI:`, oaiErr);
      // Continue anyway to clean up our database
    }
    
    // Delete from our database
    let query = supabase.from('project_threads').delete();
    
    if (projectId) {
      query = query.eq('project_id', projectId).eq('thread_id', threadId);
    } else {
      query = query.eq('thread_id', threadId);
    }
    
    const { error } = await query;
    
    if (error) throw error;
    
    return true;
  } catch (err) {
    console.error(`Error deleting thread ${threadId}:`, err);
    throw new Error(`Failed to delete thread: ${err.message}`);
  }
}

/**
 * Update onboarding progress for a user
 */
async function updateOnboardingProgress(userId: string, threadId: string, progress: any) {
  try {
    const { error } = await supabase
      .from('user_threads')
      .update({
        metadata: { 
          ...progress,
          last_updated: new Date().toISOString()
        }
      })
      .eq('user_id', userId)
      .eq('thread_id', threadId)
      .eq('status', 'onboarding');
      
    if (error) throw error;
    return true;
  } catch (err) {
    console.error("Error updating onboarding progress:", err);
    throw new Error(`Failed to update onboarding progress: ${err.message}`);
  }
}

/**
 * Clean up old threads (older than the specified days)
 */
async function cleanupOldThreads(olderThanDays: number = 30) {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);
    
    // Get threads older than the cutoff date
    const { data: oldThreads, error } = await supabase
      .from('project_threads')
      .select('*')
      .lt('updated_at', cutoffDate.toISOString());
      
    if (error) throw error;
    
    if (!oldThreads || oldThreads.length === 0) {
      return { deleted: 0, message: "No old threads to clean up" };
    }
    
    // Delete each thread
    let deletedCount = 0;
    const errors = [];
    
    for (const thread of oldThreads) {
      try {
        await deleteThread(thread.thread_id);
        deletedCount++;
      } catch (err) {
        errors.push({
          thread_id: thread.thread_id,
          error: err.message
        });
      }
    }
    
    return {
      deleted: deletedCount,
      errors: errors.length > 0 ? errors : null,
      total: oldThreads.length
    };
  } catch (err) {
    console.error("Error cleaning up old threads:", err);
    throw new Error(`Thread cleanup failed: ${err.message}`);
  }
}

// Main serve function
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    });
  }
  
  try {
    const url = new URL(req.url);
    const action = url.searchParams.get('action');
    const requestData = await req.json();
    const { userId, projectId, threadId, progress, olderThanDays, metadata } = requestData;
    
    // Require authentication for all actions
    const authHeader = req.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        {
          status: 401,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Get the token
    const token = authHeader.split(' ')[1];
    
    // Verify the user's JWT
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authentication token' }),
        {
          status: 401,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Process the action
    let result;
    
    switch (action) {
      case 'list':
        if (!projectId) {
          return new Response(
            JSON.stringify({ error: 'Project ID is required for listing threads' }),
            {
              status: 400,
              headers: {
                ...corsHeaders,
                'Content-Type': 'application/json'
              }
            }
          );
        }
        result = await listProjectThreads(projectId);
        break;
        
      case 'get-or-create':
        if (!userId) {
          return new Response(
            JSON.stringify({ error: 'User ID is required' }),
            {
              status: 400,
              headers: {
                ...corsHeaders,
                'Content-Type': 'application/json'
              }
            }
          );
        }
        result = await getOrCreateThread(userId, projectId, metadata);
        break;
        
      case 'delete':
        if (!threadId) {
          return new Response(
            JSON.stringify({ error: 'Thread ID is required for deletion' }),
            {
              status: 400,
              headers: {
                ...corsHeaders,
                'Content-Type': 'application/json'
              }
            }
          );
        }
        result = await deleteThread(threadId, projectId);
        break;
        
      case 'update-onboarding':
        if (!userId || !threadId || !progress) {
          return new Response(
            JSON.stringify({ error: 'User ID, Thread ID, and progress are required for updating onboarding' }),
            {
              status: 400,
              headers: {
                ...corsHeaders,
                'Content-Type': 'application/json'
              }
            }
          );
        }
        result = await updateOnboardingProgress(userId, threadId, progress);
        break;
        
      case 'cleanup':
        // Only allow admins to do cleanup operations
        const { data: userProfile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
          
        if (profileError || userProfile?.role !== 'admin') {
          return new Response(
            JSON.stringify({ error: 'Admin access required for this operation' }),
            {
              status: 403,
              headers: {
                ...corsHeaders,
                'Content-Type': 'application/json'
              }
            }
          );
        }
        
        result = await cleanupOldThreads(olderThanDays || 30);
        break;
        
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action specified' }),
          {
            status: 400,
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json'
            }
          }
        );
    }
    
    // Return the result
    return new Response(
      JSON.stringify({ success: true, data: result }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'An error occurred' }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});
