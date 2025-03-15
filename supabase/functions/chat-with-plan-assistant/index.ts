
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import "https://deno.land/x/xhr@0.1.0/mod.ts"; // Required for OpenAI in Deno
import { v4 as uuidv4 } from 'https://esm.sh/uuid@11.1.0';

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
    const { 
      messages, 
      projectId, 
      conversationId: existingConversationId,
      stream = false,
      action,
      userId 
    } = body;
    
    // Handle conversation retrieval action
    if (action === 'get-conversation') {
      return await handleGetConversation(projectId, userId);
    }
    
    // Get or create conversation ID
    const conversationId = existingConversationId || uuidv4();
    
    // Validate inputs for chat message
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
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
        }
        
        // Handle streaming response with SSE format
        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('Stream reader is not available');
        }
        
        let completeResponse = '';
        const decoder = new TextDecoder();
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          // Process the SSE format (event: data: format)
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n').filter(line => line.trim() !== '');
          
          let currentData = '';
          
          for (const line of lines) {
            // SSE format: lines start with "event:" or "data:"
            if (line.startsWith('data:')) {
              currentData = line.substring(5).trim();
              
              // Skip [DONE] marker
              if (currentData === '[DONE]') continue;
              
              try {
                if (currentData) {
                  const parsedData = JSON.parse(currentData);
                  
                  // Extract text content from the response structure
                  if (parsedData.output && 
                      parsedData.output[0]?.type === 'message' && 
                      parsedData.output[0]?.content?.[0]?.type === 'output_text') {
                    const textContent = parsedData.output[0].content[0].text;
                    if (textContent) {
                      completeResponse += textContent;
                    }
                  }
                }
              } catch (e) {
                console.error('Error parsing data:', e, currentData);
              }
            }
          }
        }
        
        // Save chat history if we have a project ID
        if (projectId) {
          try {
            // Get the current highest message_order for this conversation
            const { data: latestMsg, error: orderError } = await supabase
              .from('plan_chat_history')
              .select('message_order')
              .eq('conversation_id', conversationId)
              .order('message_order', { ascending: false })
              .limit(1);
              
            const nextOrder = latestMsg && latestMsg.length > 0 
              ? (latestMsg[0].message_order + 1) 
              : 0;
              
            // Save user message
            await supabase
              .from('plan_chat_history')
              .insert({
                plan_id: projectId,
                user_message: userMessage.content,
                ai_response: '',
                message_order: nextOrder,
                conversation_id: conversationId,
                user_id: userId,
                metadata: { model: MODEL, message_type: 'user' }
              });
              
            // Save AI response
            await supabase
              .from('plan_chat_history')
              .insert({
                plan_id: projectId,
                user_message: '',
                ai_response: completeResponse,
                message_order: nextOrder + 1,
                conversation_id: conversationId,
                user_id: userId,
                metadata: { model: MODEL, message_type: 'assistant' }
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
            model: MODEL,
            conversationId
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
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
        }
        
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
            // Get the current highest message_order for this conversation
            const { data: latestMsg, error: orderError } = await supabase
              .from('plan_chat_history')
              .select('message_order')
              .eq('conversation_id', conversationId)
              .order('message_order', { ascending: false })
              .limit(1);
              
            const nextOrder = latestMsg && latestMsg.length > 0 
              ? (latestMsg[0].message_order + 1) 
              : 0;
              
            // Save user message
            await supabase
              .from('plan_chat_history')
              .insert({
                plan_id: projectId,
                user_message: userMessage.content,
                ai_response: '',
                message_order: nextOrder,
                conversation_id: conversationId,
                user_id: userId,
                metadata: { model: MODEL, message_type: 'user' }
              });
              
            // Save AI response
            await supabase
              .from('plan_chat_history')
              .insert({
                plan_id: projectId,
                user_message: '',
                ai_response: assistantResponse,
                message_order: nextOrder + 1,
                conversation_id: conversationId,
                user_id: userId,
                metadata: { model: MODEL, message_type: 'assistant' }
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
            model: MODEL,
            conversationId
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

// Helper function to get or create a conversation
async function handleGetConversation(projectId: string, userId?: string) {
  try {
    if (!projectId) {
      return new Response(
        JSON.stringify({ error: 'Project ID is required' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Check if there's already a conversation for this project
    const { data: existingConversation, error: fetchError } = await supabase
      .from('plan_chat_history')
      .select('conversation_id')
      .eq('plan_id', projectId)
      .order('created_at', { ascending: false })
      .limit(1);
      
    if (fetchError) {
      console.error('Error fetching conversation:', fetchError);
      return new Response(
        JSON.stringify({ error: 'Failed to retrieve conversation' }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Return existing conversation or generate a new ID
    const conversationId = existingConversation && existingConversation.length > 0
      ? existingConversation[0].conversation_id
      : uuidv4();
      
    return new Response(
      JSON.stringify({ conversationId }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error in handleGetConversation:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to retrieve conversation' }),
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
