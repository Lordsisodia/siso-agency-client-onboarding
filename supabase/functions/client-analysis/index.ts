
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize OpenAI API 
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const MODEL = 'gpt-4o'; // Using a capable model that supports web search

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
    
    // Call OpenAI Responses API
    try {
      // Prepare input for OpenAI
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
          input: input,
          previous_response_id: responseId
        });
      } else {
        // Start a new conversation
        console.log("Starting new conversation");
        
        // Construct our input with website URL if provided
        let openaiInput = input;
        if (websiteUrl) {
          openaiInput = `Analyze this website: ${websiteUrl}\n\n${input}`;
        }
        
        response = await openai.responses.create({
          ...openaiOptions,
          input: openaiInput
        });
      }
      
      console.log(`Response received with ID: ${response.id}`);
      
      // Process the response
      const webSearchResults = response.output
        .filter(item => item.type === 'web_search_call')
        .map(item => ({
          id: item.id,
          status: item.status
        }));
      
      const messages = response.output
        .filter(item => item.type === 'message')
        .flatMap(item => 
          item.content.map(content => ({
            type: item.role === 'assistant' ? 'answer' : 'question',
            content: content.text || '',
            annotations: content.annotations || []
          }))
        );
      
      // Return the result
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
