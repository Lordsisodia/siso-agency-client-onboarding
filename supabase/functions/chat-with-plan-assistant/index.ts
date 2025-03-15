
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import "https://deno.land/x/xhr@0.1.0/mod.ts"; // Required for OpenAI in Deno

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize OpenAI API 
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const MODEL = 'gpt-4o-mini';  // Using a faster, cheaper model

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Simple system prompt for project planning
const PROJECT_PLANNER_SYSTEM_PROMPT = `
You are an expert AI project planning assistant specialized in helping users create comprehensive software project plans.
Provide helpful, structured advice on project requirements, timelines, budgets, and technical considerations.
Be conversational and ask clarifying questions when needed.
`;

// Main function to handle requests
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    });
  }
  
  try {
    // Parse request body
    const body = await req.json();
    const { messages, projectId, stream = false } = body;
    
    // Validate inputs
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.error('Invalid or missing messages in request');
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
    
    console.log('Processing message:', userMessage.content.substring(0, 100) + '...');
    
    // Initialize OpenAI client
    const OpenAI = (await import("https://esm.sh/openai@4.26.0")).default;
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });
    
    try {
      console.log(`Calling OpenAI API with ${messages.length} messages in context`);
      
      // Format messages for OpenAI API - just pass through as is
      const formattedMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // If streaming is requested, handle streaming response
      if (stream) {
        const response = await openai.chat.completions.create({
          model: MODEL,
          messages: [
            { role: 'system', content: PROJECT_PLANNER_SYSTEM_PROMPT },
            ...formattedMessages
          ],
          stream: true
        });
        
        let completeResponse = '';
        
        for await (const chunk of response) {
          if (chunk.choices[0]?.delta?.content) {
            completeResponse += chunk.choices[0].delta.content;
          }
        }
        
        // Save chat history if we have a project ID
        if (projectId) {
          try {
            await supabase
              .from('plan_chat_history')
              .insert({
                plan_id: projectId,
                user_message: userMessage.content,
                ai_response: completeResponse,
                metadata: { model: MODEL }
              });
            console.log("Successfully saved chat history");
          } catch (err) {
            console.error("Error saving chat history:", err);
            // Continue even if history saving fails
          }
        }
        
        // Return the complete collected response
        return new Response(
          JSON.stringify({ 
            response: completeResponse,
            model: MODEL
          }),
          {
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json'
            }
          }
        );
      } else {
        // Simple OpenAI chat completion request with system prompt (non-streaming)
        const response = await openai.chat.completions.create({
          model: MODEL,
          messages: [
            { role: 'system', content: PROJECT_PLANNER_SYSTEM_PROMPT },
            ...formattedMessages
          ]
        });
        
        console.log('Received response from OpenAI API');
        
        // Extract the assistant's response
        const assistantResponse = response.choices[0].message.content;
        
        // Save chat history if we have a project ID
        if (projectId) {
          try {
            await supabase
              .from('plan_chat_history')
              .insert({
                plan_id: projectId,
                user_message: userMessage.content,
                ai_response: assistantResponse,
                metadata: { model: MODEL }
              });
            console.log("Successfully saved chat history");
          } catch (err) {
            console.error("Error saving chat history:", err);
            // Continue even if history saving fails
          }
        }
        
        // Return the assistant's response
        return new Response(
          JSON.stringify({ 
            response: assistantResponse,
            model: MODEL
          }),
          {
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json'
            }
          }
        );
      }
      
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
    console.error('Unhandled error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        message: error.message,
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
