
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
    
    // Add user message to thread
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: message
    });
    
    // Set the assistant ID based on the system prompt, defaulting to a general assistant
    let assistantId = "asst_general_assistant";
    
    // Create or retrieve the assistant based on the system prompt
    const { data: assistantData, error } = await supabase
      .from('assistant_metadata')
      .select('assistant_id')
      .eq('name', 'general_assistant')
      .single();
    
    if (assistantData?.assistant_id) {
      assistantId = assistantData.assistant_id;
    } else {
      // Create a new general assistant
      const assistant = await openai.beta.assistants.create({
        name: "General Assistant",
        instructions: systemPrompt || "You are a helpful assistant that provides accurate and concise information.",
        model: "gpt-4o-mini",
      });
      
      // Store the assistant ID
      await supabase
        .from('assistant_metadata')
        .insert({
          name: 'general_assistant',
          assistant_id: assistant.id,
          model: assistant.model,
          metadata: {
            description: "General purpose assistant",
            created: new Date().toISOString()
          }
        });
      
      assistantId = assistant.id;
    }
    
    // Run the assistant on the thread
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId,
      instructions: systemPrompt
    });
    
    // Poll for completion
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    
    // Wait for the run to complete
    while (runStatus.status !== 'completed' && runStatus.status !== 'failed') {
      // Wait a bit before polling again
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      
      // Handle function calls if needed
      if (runStatus.status === 'requires_action') {
        // This will be implemented in a future update
        console.log("Function calling support will be implemented soon");
      }
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
