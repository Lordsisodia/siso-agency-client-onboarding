
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import "https://deno.land/x/xhr@0.1.0/mod.ts"; // Required for OpenAI in Deno

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize OpenAI API 
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const MODEL = 'gpt-4o-mini';  // Using the recommended model (faster, cheaper)

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const supabase = createClient(supabaseUrl, supabaseKey);

// System prompt for project planning
const PROJECT_PLANNER_SYSTEM_PROMPT = `
You are an expert AI project planning assistant specialized in helping users create comprehensive software project plans.

Your expertise includes:
- Requirements gathering and analysis
- Feature prioritization and selection
- Technology stack recommendations
- Resource allocation and team composition
- Budget estimation and financial planning
- Timeline creation with realistic milestones
- Risk assessment and mitigation strategies

COMMUNICATION STYLE:
- Be professional but conversational and encouraging
- Ask clarifying questions when information is incomplete
- Provide rationale for your recommendations
- Maintain a helpful and constructive tone
- Use concrete examples to illustrate points

INTERACTION APPROACH:
1. Begin by understanding the project scope and goals
2. Ask focused questions to fill knowledge gaps
3. Provide structured recommendations based on best practices
4. Break complex projects into manageable phases
5. Suggest alternative approaches when appropriate

RESPONSE FORMAT:
- Use clear sections with headers for organization
- Include bullet points for key information
- Highlight important decisions or recommendations
- Maintain conversation history context when responding

IMPORTANT: Focus exclusively on helping users plan their software projects efficiently. Avoid generic advice and instead provide specific, actionable guidance tailored to their unique project needs.
`;

/**
 * Validates environment variables and configuration
 * @returns {string|null} Error message or null if valid
 */
function validateConfiguration() {
  const missingVars = [];
  
  if (!OPENAI_API_KEY) {
    missingVars.push('OPENAI_API_KEY');
  }
  
  if (!Deno.env.get('SUPABASE_URL')) {
    missingVars.push('SUPABASE_URL');
  }
  
  if (!Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')) {
    missingVars.push('SUPABASE_SERVICE_ROLE_KEY');
  }
  
  if (missingVars.length > 0) {
    return `Missing required configuration: ${missingVars.join(', ')}`;
  }
  
  return null;
}

/**
 * Get or create a thread record in the database
 * @param projectId The project ID to associate with thread history
 * @returns Thread ID for persistence
 */
async function getOrCreateThread(projectId: string) {
  if (!projectId) {
    throw new Error("Project ID is required to create or retrieve a thread");
  }
  
  try {
    // Check if thread exists for this project
    const { data: existingThread, error } = await supabase
      .from('project_threads')
      .select('*')
      .eq('project_id', projectId)
      .maybeSingle();
    
    if (existingThread?.thread_id) {
      console.log("Found existing thread:", existingThread.thread_id);
      return existingThread.thread_id;
    }
    
    // Create a new thread record
    console.log("Creating new thread for project:", projectId);
    const threadId = crypto.randomUUID();
    
    // Store thread information
    const { data: savedThread, error: saveError } = await supabase
      .from('project_threads')
      .insert({
        project_id: projectId,
        thread_id: threadId,
        metadata: {
          created_at: new Date().toISOString(),
          message_count: 0
        }
      })
      .select('*')
      .single();
    
    if (saveError) {
      console.error("Error saving thread:", saveError);
      throw saveError;
    }
    
    console.log("Created new thread:", threadId);
    return threadId;
  } catch (err) {
    console.error("Error in getOrCreateThread:", err);
    throw new Error(`Failed to create or retrieve thread: ${err.message}`);
  }
}

/**
 * Save chat history to database
 */
async function saveChatHistory(
  projectId: string | null, 
  userMessage: string, 
  aiResponse: string, 
  formData?: Record<string, any>, 
  metadata?: Record<string, any>,
  responseId?: string
) {
  if (!projectId) {
    console.log("No project ID provided, skipping chat history save");
    return;
  }
  
  try {
    const finalMetadata = {
      ...metadata || {},
      saved_at: new Date().toISOString(),
      client_info: 'edge-function',
      response_id: responseId || null
    };
    
    const { data, error } = await supabase
      .from('plan_chat_history')
      .insert({
        plan_id: projectId,
        user_message: userMessage,
        ai_response: aiResponse,
        form_data: formData || null,
        metadata: finalMetadata
      });
    
    if (error) {
      console.error("Error saving chat history:", error);
    } else {
      console.log("Successfully saved chat history");
      
      // Update message count in project thread metadata
      await supabase
        .from('project_threads')
        .update({
          updated_at: new Date().toISOString(),
          metadata: {
            last_message_at: new Date().toISOString(),
            has_new_messages: true
          }
        })
        .eq('project_id', projectId);
    }
  } catch (err) {
    console.error("Exception in saveChatHistory:", err);
  }
}

/**
 * Main chat handler function
 */
async function handleChat(req: Request) {
  try {
    // Validate configuration
    const configError = validateConfiguration();
    if (configError) {
      console.error('Configuration error:', configError);
      return new Response(
        JSON.stringify({ error: configError }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Parse request body
    let body;
    try {
      body = await req.json();
    } catch (err) {
      console.error('Error parsing request body:', err);
      return new Response(
        JSON.stringify({ error: 'Invalid request body' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    const { messages, projectId, formData, threadId: existingThreadId, responseId } = body;
    
    // Validate request data
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.error('Invalid or missing messages in request:', body);
      return new Response(
        JSON.stringify({ error: 'No messages provided or invalid message format' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Get the user's message (last message in the array)
    const userMessage = messages[messages.length - 1];
    
    if (!userMessage || !userMessage.content) {
      return new Response(
        JSON.stringify({ error: 'Invalid user message format' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    console.log('Processing message:', userMessage.content.substring(0, 100) + '...');
    
    // Get or create thread ID for persistence
    let threadId;
    try {
      // Use existing thread ID or create a new one
      threadId = existingThreadId || 
        (projectId ? await getOrCreateThread(projectId) : crypto.randomUUID());
      
      console.log('Using thread ID:', threadId);
    } catch (err) {
      console.error('Error getting or creating thread:', err);
      return new Response(
        JSON.stringify({ error: 'Failed to create or retrieve thread: ' + err.message }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Initialize OpenAI client
    const OpenAI = (await import("https://esm.sh/openai@4.26.0")).default;
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });
    
    try {
      console.log(`Calling OpenAI API with ${messages.length} messages in context`);
      
      // Format messages for OpenAI API
      const formattedMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Simple OpenAI chat completion request with instructions as system message
      const requestOptions = {
        model: MODEL,
        messages: [
          { role: 'system', content: PROJECT_PLANNER_SYSTEM_PROMPT },
          ...formattedMessages
        ]
      };
      
      // If continuity is needed, we can use previous_response_id in the future
      // For now, using simple chat completion
      
      // Call OpenAI API
      const response = await openai.chat.completions.create(requestOptions);
      
      console.log('Received response from OpenAI API');
      
      // Extract the assistant's response from the completion
      const assistantResponse = response.choices[0].message.content;
      
      // Save chat history
      await saveChatHistory(
        projectId, 
        userMessage.content, 
        assistantResponse, 
        formData, 
        { thread_id: threadId, model: MODEL },
        response.id
      );
      
      // Return the assistant's response
      return new Response(
        JSON.stringify({ 
          response: assistantResponse,
          threadId: threadId,
          responseId: response.id,
          model: MODEL
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
      
    } catch (err) {
      console.error('Error calling OpenAI:', err);
      return new Response(
        JSON.stringify({ 
          error: `AI service error: ${err.message}`,
          details: err
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }
  } catch (error) {
    console.error('Unhandled error in handleChat:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        message: error.message,
        stack: error.stack,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
}

// Main function to handle requests
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    });
  }
  
  try {
    console.log('Received request to chat-with-plan-assistant');
    return await handleChat(req);
  } catch (error) {
    console.error('Unhandled error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        message: error.message,
        stack: error.stack,
        details: 'This error occurred in the chat-with-plan-assistant edge function'
      }),
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
