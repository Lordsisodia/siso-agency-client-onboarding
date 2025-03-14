
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

// In-memory cache to avoid creating new assistants repeatedly during development
const assistantCache = new Map();

// Function to get thread messages
async function getThreadMessages(threadId: string) {
  try {
    const messages = await openai.beta.threads.messages.list(threadId);
    return messages.data;
  } catch (err) {
    console.error("Error getting thread messages:", err);
    throw err;
  }
}

// Function to save chat history
async function saveChatHistory(userId: string | null, userMessage: string, aiResponse: string) {
  if (!userId) return; // Only save for authenticated users
  
  try {
    await supabase
      .from('ai_chat_messages')
      .insert({
        user_id: userId,
        user_message: userMessage,
        ai_response: aiResponse
      });
  } catch (err) {
    console.error("Error saving chat history:", err);
  }
}

// Function to get or create the appropriate assistant
async function getOrCreateAssistant(assistantId: string, systemPrompt: string) {
  // If assistantId is provided and not "onboarding", use that directly
  if (assistantId && assistantId !== 'onboarding') {
    try {
      return await openai.beta.assistants.retrieve(assistantId);
    } catch (err) {
      console.error(`Error retrieving assistant ${assistantId}:`, err);
      // Fall back to creating a new assistant
    }
  }
  
  // For onboarding or fallback
  const cacheKey = assistantId || `assistant_${systemPrompt?.substring(0, 50)}` || 'general_assistant';
  
  // Check in-memory cache first
  if (assistantCache.has(cacheKey)) {
    return assistantCache.get(cacheKey);
  }
  
  // Generate a consistent name based on purpose
  const assistantName = assistantId === 'onboarding' 
    ? "SISO Onboarding Assistant"
    : systemPrompt 
      ? `Assistant for: ${systemPrompt.substring(0, 50)}...` 
      : "General Assistant";
  
  // Try to find an existing assistant in the database
  const { data: assistantData, error } = await supabase
    .from('assistant_metadata')
    .select('assistant_id')
    .eq('name', assistantName)
    .single();

  let assistantObj;
  
  if (assistantData?.assistant_id) {
    console.log("Using existing assistant from DB:", assistantName);
    
    // Verify assistant still exists in OpenAI
    try {
      assistantObj = await openai.beta.assistants.retrieve(assistantData.assistant_id);
    } catch (err) {
      console.log("Assistant no longer exists in OpenAI, creating a new one");
      assistantObj = null; // Force creation of a new assistant
    }
  }
  
  // Create a new assistant if needed
  if (!assistantObj) {
    console.log("Creating new assistant:", assistantName);
    try {
      assistantObj = await openai.beta.assistants.create({
        name: assistantName,
        instructions: systemPrompt || "You are a helpful assistant that provides accurate and concise information.",
        model: "gpt-4o-mini", // Using a fast model for responsiveness
        tools: [{ type: "retrieval" }]
      });
      
      // Store the assistant info
      if (assistantData?.assistant_id) {
        // Update existing record
        await supabase
          .from('assistant_metadata')
          .update({
            assistant_id: assistantObj.id,
            model: assistantObj.model,
            instructions: systemPrompt,
            metadata: {
              description: assistantName,
              updated: new Date().toISOString()
            }
          })
          .eq('name', assistantName);
      } else {
        // Insert new record
        await supabase
          .from('assistant_metadata')
          .insert({
            name: assistantName,
            assistant_id: assistantObj.id,
            model: assistantObj.model,
            instructions: systemPrompt,
            metadata: {
              description: assistantName,
              created: new Date().toISOString()
            }
          });
      }
    } catch (createErr) {
      console.error("Error creating assistant:", createErr);
      throw createErr;
    }
  }
  
  // Add to in-memory cache
  assistantCache.set(cacheKey, assistantObj);
  
  return assistantObj;
}

// Update thread metadata for user threads
async function updateThreadMetadata(userId: string, threadId: string) {
  try {
    // Update last message timestamp and increment message count
    await supabase
      .from('user_threads')
      .update({
        updated_at: new Date().toISOString(),
        last_message_at: new Date().toISOString(),
        message_count: supabase.sql`message_count + 1`
      })
      .eq('user_id', userId)
      .eq('thread_id', threadId);
  } catch (err) {
    console.error("Error updating thread metadata:", err);
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
    const { 
      message, 
      systemPrompt, 
      userId, 
      threadId, 
      assistantId,
      getMessages
    } = await req.json();
    
    // If getting messages only, return them
    if (getMessages && threadId) {
      try {
        const messages = await getThreadMessages(threadId);
        return new Response(
          JSON.stringify({ success: true, data: { messages } }),
          {
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json'
            }
          }
        );
      } catch (msgErr) {
        return new Response(
          JSON.stringify({ error: 'Failed to retrieve messages', details: msgErr.message }),
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
    
    if (!message && !getMessages) {
      return new Response(
        JSON.stringify({ error: 'No message provided' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Get appropriate assistant
    let assistant;
    try {
      assistant = await getOrCreateAssistant(assistantId, systemPrompt);
    } catch (assistantErr) {
      console.error("Error getting assistant:", assistantErr);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to create or retrieve assistant',
          details: assistantErr.message 
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
    
    // Require thread ID
    if (!threadId) {
      return new Response(
        JSON.stringify({ error: 'Thread ID is required' }),
        {
          status: 400,
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
        content: message
      });
      
      // Update thread metadata if user ID provided
      if (userId) {
        await updateThreadMetadata(userId, threadId);
      }
    } catch (messageErr) {
      console.error("Error adding message to thread:", messageErr);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to add message to conversation',
          details: messageErr.message 
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
    
    // Run the assistant on the thread with custom configuration
    let run;
    try {
      run = await openai.beta.threads.runs.create(threadId, {
        assistant_id: assistant.id,
        instructions: systemPrompt || undefined,
        model: "gpt-4o-mini", // Using a fast model for responsiveness
        temperature: 0.7,
        max_tokens: 1000, // Setting a reasonable limit for responses
        max_prompt_tokens: 4000 // Setting context window limit
      });
    } catch (runErr) {
      console.error("Error creating run:", runErr);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to process your message',
          details: runErr.message 
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
    
    // Poll for completion with progressive timeout
    let runStatus;
    try {
      runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
    } catch (retrieveErr) {
      console.error("Error retrieving run status:", retrieveErr);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to check processing status',
          details: retrieveErr.message 
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
    
    let pollCount = 0;
    const maxPolls = 60; // Set a maximum number of polls (10 minutes)
    
    // Wait for the run to complete
    while (runStatus.status !== 'completed' && 
           runStatus.status !== 'failed' && 
           runStatus.status !== 'expired' &&
           runStatus.status !== 'cancelled' && 
           pollCount < maxPolls) {
      
      // Wait before polling again, with progressive backoff
      const delay = Math.min(1000 * (1 + Math.floor(pollCount / 5)), 5000);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      try {
        runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
      } catch (pollErr) {
        console.error("Error polling run status:", pollErr);
        return new Response(
          JSON.stringify({ 
            error: 'Failed to check processing status',
            details: pollErr.message 
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
      
      pollCount++;
    }
    
    if (runStatus.status !== 'completed') {
      console.error(`Run ended with status: ${runStatus.status}`, runStatus);
      return new Response(
        JSON.stringify({ 
          error: `Assistant processing ended with status: ${runStatus.status}`,
          details: JSON.stringify(runStatus)
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
    
    // Get the assistant's response
    let messages;
    try {
      messages = await openai.beta.threads.messages.list(threadId);
    } catch (listErr) {
      console.error("Error listing messages:", listErr);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to retrieve assistant response',
          details: listErr.message 
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
    
    // Find the assistant's messages after our user prompt
    const assistantMessages = messages.data
      .filter(msg => msg.role === 'assistant')
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
    // Extract the content from the most recent message
    let responseContent = '';
    if (assistantMessages.length > 0) {
      const message = assistantMessages[0];
      responseContent = message.content.map(content => {
        if (content.type === 'text') {
          return content.text.value;
        }
        return '';
      }).join('\n');
    } else {
      console.error("No assistant messages found");
      return new Response(
        JSON.stringify({ error: 'No response received from assistant' }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Save chat history if we have a user ID
    if (userId) {
      await saveChatHistory(userId, message, responseContent);
    }
    
    // Return the assistant's response
    return new Response(
      JSON.stringify({ success: true, response: responseContent }),
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
      JSON.stringify({ 
        error: error.message || 'An error occurred', 
        stack: error.stack // Include stack trace for debugging
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
