
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

// Function to get or create a thread for the user
async function getOrCreateThread(userId?: string) {
  if (!userId) {
    // Create a temporary thread if no user ID
    return await openai.beta.threads.create();
  }

  // Check if user already has a thread
  const { data: threadData, error } = await supabase
    .from('user_threads')
    .select('thread_id')
    .eq('user_id', userId)
    .single();
  
  if (threadData?.thread_id) {
    console.log("Using existing thread for user:", userId);
    return { id: threadData.thread_id };
  }
  
  // Create a new thread for this user
  const thread = await openai.beta.threads.create();
  
  // Store the thread ID for future use
  await supabase
    .from('user_threads')
    .insert({
      user_id: userId,
      thread_id: thread.id
    });
  
  return thread;
}

// Function to save chat history
async function saveChatHistory(userId: string | null, userMessage: string, aiResponse: string) {
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
async function getOrCreateAssistant(systemPrompt: string) {
  // Generate a consistent name based on the system prompt
  const assistantName = systemPrompt ? 
    `Assistant for: ${systemPrompt.substring(0, 50)}...` : 
    "General Assistant";
  
  // Try to find an existing assistant with this name
  const { data: assistantData, error } = await supabase
    .from('assistant_metadata')
    .select('assistant_id')
    .eq('name', assistantName)
    .single();

  if (assistantData?.assistant_id) {
    console.log("Using existing assistant:", assistantName);
    return assistantData.assistant_id;
  }

  // Create a new assistant
  const assistant = await openai.beta.assistants.create({
    name: assistantName,
    instructions: systemPrompt || "You are a helpful assistant that provides accurate and concise information.",
    model: "gpt-4o-mini-2024-07-18", // Using the specified model
    tools: [{ type: "retrieval" }]
  });
  
  // Store the assistant ID
  await supabase
    .from('assistant_metadata')
    .insert({
      name: assistantName,
      assistant_id: assistant.id,
      model: assistant.model,
      metadata: {
        description: assistantName,
        created: new Date().toISOString()
      }
    });
  
  return assistant.id;
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
    const { message, systemPrompt, userId } = await req.json();
    
    if (!message) {
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
    
    // Get or create a thread for this user
    const thread = await getOrCreateThread(userId);
    
    // Get or create the appropriate assistant
    const assistantId = await getOrCreateAssistant(systemPrompt);
    
    // Add user message to thread
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: message
    });
    
    // Run the assistant on the thread with custom configuration
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId,
      instructions: systemPrompt || undefined,
      model: "gpt-4o-mini-2024-07-18", // Using the specified model
      temperature: 0.7,
      max_tokens: 1000, // Setting a reasonable limit for responses
      max_prompt_tokens: 4000 // Setting context window limit
    });
    
    // Poll for completion with progressive timeout
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
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
      
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      pollCount++;
      
      // Handle function calls if needed
      if (runStatus.status === 'requires_action') {
        // This will be implemented in a future update
        console.log("Function calling support will be implemented soon");
      }
    }
    
    if (runStatus.status !== 'completed') {
      console.error(`Run ended with status: ${runStatus.status}`);
      return new Response(
        JSON.stringify({ 
          error: `Assistant processing ended with status: ${runStatus.status}`,
          details: runStatus
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
    const messages = await openai.beta.threads.messages.list(thread.id);
    
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
    }
    
    // Save chat history if we have a user ID
    if (userId) {
      await saveChatHistory(userId, message, responseContent);
    }
    
    // Return the assistant's response
    return new Response(
      JSON.stringify({ response: responseContent }),
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
