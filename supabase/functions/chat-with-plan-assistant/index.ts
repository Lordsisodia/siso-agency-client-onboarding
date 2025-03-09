
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { OpenAI } from "https://esm.sh/openai@4.26.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize OpenAI client with the v2 beta header
const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
  defaultHeaders: {
    'OpenAI-Beta': 'assistants=v2', // Add v2 beta header
  }
});

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Get the assistant ID from environment variables, with a fallback to the hardcoded value
const PLAN_BUILDER_ASSISTANT_ID = Deno.env.get('PLAN_BUILDER_ASSISTANT_ID') || "asst_VMa6tFDDh65o0R0VEhuzzdSA";

/**
 * Validates environment variables and configuration
 * @returns {string|null} Error message or null if valid
 */
function validateConfiguration() {
  const missingVars = [];
  
  if (!Deno.env.get('OPENAI_API_KEY')) {
    missingVars.push('OPENAI_API_KEY');
  }
  
  if (!Deno.env.get('SUPABASE_URL')) {
    missingVars.push('SUPABASE_URL');
  }
  
  if (!Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')) {
    missingVars.push('SUPABASE_SERVICE_ROLE_KEY');
  }
  
  if (!PLAN_BUILDER_ASSISTANT_ID) {
    missingVars.push('PLAN_BUILDER_ASSISTANT_ID');
  }
  
  if (missingVars.length > 0) {
    return `Missing required configuration: ${missingVars.join(', ')}`;
  }
  
  return null;
}

/**
 * Gets or creates a thread for a project with better error handling
 * @param projectId The project ID
 * @returns Promise<string> The thread ID
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
      
      try {
        // Verify thread still exists in OpenAI
        await openai.beta.threads.retrieve(existingThread.thread_id);
        return existingThread.thread_id;
      } catch (err) {
        console.log("Thread no longer exists in OpenAI, creating a new one:", err.message);
        // Continue to create a new thread
      }
    }
    
    // Create a new thread
    console.log("Creating new thread for project:", projectId);
    const thread = await openai.beta.threads.create({
      metadata: {
        project_id: projectId,
        created_at: new Date().toISOString()
      }
    });
    
    // Store thread information
    const { data: savedThread, error: saveError } = await supabase
      .from('project_threads')
      .insert({
        project_id: projectId,
        thread_id: thread.id,
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
    
    console.log("Created new thread:", thread.id);
    return thread.id;
  } catch (err) {
    console.error("Error in getOrCreateThread:", err);
    throw new Error(`Failed to create or retrieve thread: ${err.message}`);
  }
}

/**
 * Save chat history with improved error handling and metadata
 */
async function saveChatHistory(projectId: string | null, userMessage: string, aiResponse: string, formData?: Record<string, any>, metadata?: Record<string, any>) {
  if (!projectId) {
    console.log("No project ID provided, skipping chat history save");
    return;
  }
  
  try {
    const finalMetadata = {
      ...metadata || {},
      saved_at: new Date().toISOString(),
      client_info: 'edge-function'
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
      // Continue execution rather than throwing, as this is a non-critical operation
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
 * Process tool calls and handle function outputs
 */
async function processToolOutputs(runId: string, threadId: string, toolCalls: any[]) {
  const toolOutputs = [];
  
  for (const toolCall of toolCalls) {
    if (toolCall.type === 'function') {
      const functionName = toolCall.function.name;
      const functionArgs = JSON.parse(toolCall.function.arguments);
      
      console.log(`Processing function call: ${functionName}`, functionArgs);
      
      let output = JSON.stringify(functionArgs);
      
      // Add custom function processing here if needed
      // For now, we're just returning the arguments as the output
      
      toolOutputs.push({
        tool_call_id: toolCall.id,
        output
      });
    }
  }
  
  if (toolOutputs.length > 0) {
    return await openai.beta.threads.runs.submitToolOutputs(
      threadId,
      runId,
      { tool_outputs: toolOutputs }
    );
  }
  
  return null;
}

/**
 * Enhanced run poller with timeout and better error handling
 */
async function pollForCompletion(threadId: string, runId: string, maxPolls = 60, initialBackoff = 1000) {
  let pollCount = 0;
  let backoff = initialBackoff;
  
  while (pollCount < maxPolls) {
    try {
      const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
      
      console.log(`Run status: ${runStatus.status}, Poll: ${pollCount + 1}/${maxPolls}`);
      
      if (runStatus.status === 'completed') {
        return runStatus;
      }
      
      if (runStatus.status === 'failed' || runStatus.status === 'expired' || runStatus.status === 'cancelled') {
        throw new Error(`Run ended with status: ${runStatus.status}, reason: ${runStatus.last_error?.message || 'unknown'}`);
      }
      
      if (runStatus.status === 'requires_action') {
        // Handle function calling
        const requiredActions = runStatus.required_action?.submit_tool_outputs.tool_calls || [];
        const updatedRun = await processToolOutputs(runId, threadId, requiredActions);
        
        if (updatedRun) {
          // Reset backoff after successful action
          backoff = initialBackoff;
          continue;
        }
      }
      
      pollCount++;
      
      // Wait with exponential backoff (capped at 5 seconds)
      await new Promise(resolve => setTimeout(resolve, Math.min(backoff, 5000)));
      backoff = Math.min(backoff * 1.5, 5000); // Gradually increase backoff time
      
    } catch (err) {
      console.error(`Error polling run status: ${err.message}`);
      throw err;
    }
  }
  
  throw new Error(`Run timed out after ${maxPolls} polls`);
}

/**
 * Verify that the assistant exists and is configured correctly
 */
async function verifyAssistant() {
  try {
    const assistant = await openai.beta.assistants.retrieve(PLAN_BUILDER_ASSISTANT_ID);
    console.log(`Assistant verified: ${assistant.name}, model: ${assistant.model}`);
    return assistant;
  } catch (err) {
    console.error(`Error verifying assistant: ${err.message}`);
    throw new Error(`Invalid assistant ID or OpenAI API key: ${err.message}`);
  }
}

// Main chat handler
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
    
    // Verify assistant exists
    try {
      await verifyAssistant();
    } catch (err) {
      console.error('Assistant verification failed:', err);
      return new Response(
        JSON.stringify({ error: `Assistant verification failed: ${err.message}` }),
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
    
    const { messages, projectId, formData, threadId: existingThreadId } = body;
    
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
    
    console.log('Processing message:', userMessage.content);
    console.log('Using assistant ID:', PLAN_BUILDER_ASSISTANT_ID);
    
    // Get or create thread
    let threadId;
    try {
      if (existingThreadId) {
        // Use the provided thread ID if it exists
        console.log('Using provided thread ID:', existingThreadId);
        threadId = existingThreadId;
        
        try {
          // Verify thread still exists in OpenAI
          await openai.beta.threads.retrieve(threadId);
        } catch (err) {
          console.log('Thread no longer exists in OpenAI, creating a new one:', err.message);
          threadId = projectId 
            ? await getOrCreateThread(projectId) 
            : await openai.beta.threads.create().then(t => t.id);
        }
      } else {
        // Get or create a new thread
        threadId = projectId 
          ? await getOrCreateThread(projectId) 
          : await openai.beta.threads.create().then(t => t.id);
      }
      
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
    
    // Add user message to thread
    try {
      await openai.beta.threads.messages.create(threadId, {
        role: 'user',
        content: userMessage.content
      });
      console.log('Added user message to thread');
    } catch (err) {
      console.error('Error adding message to thread:', err);
      return new Response(
        JSON.stringify({ error: 'Failed to add message to thread: ' + err.message }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Run the assistant on the thread
    let run;
    try {
      run = await openai.beta.threads.runs.create(threadId, {
        assistant_id: PLAN_BUILDER_ASSISTANT_ID,
      });
      console.log('Created run:', run.id);
    } catch (err) {
      console.error('Error creating assistant run:', err);
      return new Response(
        JSON.stringify({ error: 'Failed to run assistant: ' + err.message }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Wait for the run to complete
    let runResult;
    try {
      runResult = await pollForCompletion(threadId, run.id);
      console.log('Run completed with status:', runResult.status);
    } catch (err) {
      console.error('Error during run polling:', err);
      return new Response(
        JSON.stringify({ error: 'Assistant processing failed: ' + err.message }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Get the assistant's response
    let responseContent = '';
    try {
      const messages = await openai.beta.threads.messages.list(threadId);
      
      // Find the assistant's messages after our user prompt
      const assistantMessages = messages.data
        .filter(msg => msg.role === 'assistant')
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      
      // Extract the content from the most recent message
      if (assistantMessages.length > 0) {
        const message = assistantMessages[0];
        responseContent = message.content.map(content => {
          if (content.type === 'text') {
            return content.text.value;
          }
          return '';
        }).join('\n');
      }
      
      console.log('Got assistant response of length:', responseContent.length);
    } catch (err) {
      console.error('Error retrieving assistant response:', err);
      return new Response(
        JSON.stringify({ error: 'Failed to retrieve assistant response: ' + err.message }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Save chat history if we have a project ID
    if (projectId) {
      try {
        await saveChatHistory(projectId, userMessage.content, responseContent, formData, {
          thread_id: threadId,
          run_id: run.id
        });
        console.log('Saved chat history for project:', projectId);
      } catch (err) {
        // Non-critical error, log but continue
        console.error('Failed to save chat history:', err);
      }
    }
    
    // Return the assistant's response
    return new Response(
      JSON.stringify({ 
        response: responseContent,
        threadId: threadId
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error in handleChat:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An error occurred',
        details: error.stack // Include stack trace for debugging
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
    console.log('Using OpenAI assistant ID:', PLAN_BUILDER_ASSISTANT_ID);
    
    return await handleChat(req);
  } catch (error) {
    console.error('Unhandled error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        message: error.message,
        stack: error.stack, // Include stack trace for debugging
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
