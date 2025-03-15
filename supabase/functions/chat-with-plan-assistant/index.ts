
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
    
    try {
      console.log(`Calling OpenAI Responses API with user message`);
      
      // Prepare input for the Responses API 
      // Combine system prompt and relevant context into a single input string
      let inputContext = PROJECT_PLANNER_SYSTEM_PROMPT + "\n\n";
      
      // Add previous messages as context (excluding the current user message)
      if (messages.length > 1) {
        const previousMessages = messages.slice(0, -1);
        previousMessages.forEach(msg => {
          const role = msg.role === 'user' ? 'User' : 'Assistant';
          inputContext += `${role}: ${msg.content}\n`;
        });
        inputContext += "\n";
      }
      
      // Add the current user message
      inputContext += `User: ${userMessage.content}\n\nAssistant: `;
      
      // If streaming is requested, handle streaming response
      if (stream) {
        // Direct OpenAI API call for streaming with Responses API
        const response = await fetch('https://api.openai.com/v1/responses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: MODEL,
            instructions: PROJECT_PLANNER_SYSTEM_PROMPT,
            input: userMessage.content,
            stream: true
          })
        });
        
        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('Stream reader is not available');
        }
        
        let completeResponse = '';
        const decoder = new TextDecoder();
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          // Parse the chunk (may contain multiple JSON objects)
          const lines = chunk
            .split('\n')
            .filter(line => line.trim() !== '' && line.trim() !== 'data: [DONE]')
            .map(line => line.replace(/^data: /, ''));
          
          for (const line of lines) {
            try {
              if (line) {
                const parsedChunk = JSON.parse(line);
                if (parsedChunk.output && 
                    parsedChunk.output[0]?.type === 'message' && 
                    parsedChunk.output[0]?.content?.[0]?.type === 'output_text') {
                  const textContent = parsedChunk.output[0].content[0].text;
                  if (textContent) {
                    completeResponse += textContent;
                  }
                }
              }
            } catch (e) {
              console.error('Error parsing chunk:', e, line);
            }
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
        // Non-streaming request handling
        const response = await fetch('https://api.openai.com/v1/responses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: MODEL,
            instructions: PROJECT_PLANNER_SYSTEM_PROMPT,
            input: userMessage.content
          })
        });
        
        const result = await response.json();
        
        // Extract the text content from the response
        let assistantResponse = '';
        if (result.output && 
            result.output[0]?.type === 'message' && 
            result.output[0]?.content?.[0]?.type === 'output_text') {
          assistantResponse = result.output[0].content[0].text;
        } else {
          console.error('Unexpected response format:', result);
          assistantResponse = "Sorry, I couldn't generate a proper response.";
        }
        
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
