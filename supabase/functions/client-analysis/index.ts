
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize OpenAI API 
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
// Using a model that supports web search and the Responses API
const MODEL = 'gpt-4o-mini';

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    });
  }
  
  try {
    // Parse request body
    const { input, websiteUrl, responseId } = await req.json();
    
    if (!input) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'No input provided' 
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }

    console.log(`Processing request with input: "${input.substring(0, 100)}..."${websiteUrl ? ` and website: ${websiteUrl}` : ''}${responseId ? ` and responseId: ${responseId}` : ''}`);
    
    // Setup tools for web search
    const tools = [{ type: "web_search" }];
    
    // Setup OpenAI API client
    const OpenAI = (await import("https://esm.sh/openai@4.26.0")).default;
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });

    console.log("Initialized OpenAI client");
    
    try {
      // Prepare proper input format for OpenAI Responses API
      let messages = [];
      
      // Add system message
      messages.push({
        role: "system",
        content: "You are a helpful AI assistant that provides thorough and relevant information by searching the web when needed. Use the search tool when information might be outdated or when you need specific details. Respond with accurate, up-to-date information and cite your sources."
      });
      
      // Add user message
      let userMessage = input;
      if (websiteUrl) {
        userMessage = `Analyze this website: ${websiteUrl}\n\n${input}`;
      }
      
      messages.push({
        role: "user",
        content: userMessage
      });
      
      // Setup base options for OpenAI Responses API
      const openaiOptions = {
        model: MODEL,
        tools,
        temperature: 0.7,
      };
      
      let response;
      
      if (responseId) {
        // Continue conversation with previous response ID
        console.log(`Continuing conversation with responseId: ${responseId}`);
        response = await openai.responses.create({
          ...openaiOptions,
          messages,
          previous_response_id: responseId
        });
      } else {
        // Start a new conversation
        console.log("Starting new conversation");
        response = await openai.responses.create({
          ...openaiOptions,
          messages
        });
      }
      
      console.log(`Response received with ID: ${response.id}`);
      
      // Extract and process the response
      // Web search results
      const webSearchResults = response.output
        .filter(item => item.type === 'web_search_call')
        .map(item => ({
          id: item.id,
          status: item.status
        }));
      
      // Process message content
      const messages = [];
      for (const item of response.output) {
        if (item.type === 'message') {
          // Process content array items
          for (const contentItem of item.content) {
            if (contentItem.text) {
              // Process annotations
              const messageObj = {
                type: item.role === 'assistant' ? 'answer' : 'question',
                content: contentItem.text,
                annotations: contentItem.annotations || []
              };
              messages.push(messageObj);
            }
          }
        }
      }
      
      // Return the formatted result
      return new Response(
        JSON.stringify({
          success: true,
          result: {
            responseId: response.id,
            messages,
            webSearchResults
          }
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
          success: false, 
          error: `OpenAI API error: ${err.message || 'Unknown error'}` 
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
        success: false, 
        error: `Internal server error: ${error.message}` 
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
