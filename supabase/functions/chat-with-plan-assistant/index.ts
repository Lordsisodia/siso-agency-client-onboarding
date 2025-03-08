
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { supabaseClient } from "../_shared/supabase-client.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Constants for the OpenAI API
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const OPENAI_MODEL = 'gpt-4o-mini';

// System prompt for plan creation with web search capabilities
const SYSTEM_PROMPT = `You are an AI assistant specializing in app development project planning. 
Your goal is to help users define their project requirements, suggest features, and create a comprehensive plan.
You have access to web search to provide up-to-date information on technologies, frameworks, and industry standards.
You should:
1. Extract key project details like business type, goals, features, platforms, timeline, and budget
2. Provide tailored recommendations based on industry best practices
3. Help estimate reasonable timelines and costs based on project scope
4. Break complex features into manageable components
5. Suggest technology stacks appropriate for the project's needs
6. Use web search when you need current information about frameworks, libraries, or technologies
7. Be conversational but focused on gathering practical information for app development
Be concise but thorough, and prioritize understanding user requirements before suggesting solutions.`;

// Helper function to handle web search
async function performWebSearch(query: string): Promise<string> {
  try {
    console.log(`Performing web search for: ${query}`);
    
    // Implement basic web search functionality (placeholder)
    // In a production environment, you would integrate with a search API like Bing, Google, or Serper
    const searchResults = `Search results for "${query}" (placeholder): 
    - Found information about latest frameworks and libraries
    - Current best practices for app development
    - Recent case studies and examples`;
    
    return searchResults;
  } catch (error) {
    console.error('Error performing web search:', error);
    return `Unable to perform web search: ${error.message}`;
  }
}

// Main handler function for the edge function
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Validate API key
  if (!OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'OpenAI API key is not set in environment variables' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Parse the request
    const { messages, projectId, formData } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      throw new Error('Invalid request: messages array is required');
    }

    console.log(`Processing request with ${messages.length} messages`);
    
    // Extract the latest user message for potential search
    const latestUserMessage = messages[messages.length - 1].content;
    let webSearchResults = '';
    
    // Determine if we need to perform a web search based on message content
    if (latestUserMessage.includes('latest') || 
        latestUserMessage.includes('current trends') || 
        latestUserMessage.includes('best framework') ||
        latestUserMessage.includes('search for')) {
      const searchQuery = latestUserMessage;
      webSearchResults = await performWebSearch(searchQuery);
    }
    
    // Prepare messages array with system prompt and potential search results
    const openaiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages
    ];
    
    // Add web search results if available
    if (webSearchResults) {
      openaiMessages.push({
        role: 'system',
        content: `Web search results: ${webSearchResults}`
      });
    }
    
    // Check if request wants streaming
    const streamRequested = req.headers.get('accept') === 'text/event-stream';
    
    if (streamRequested) {
      // Stream response
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: OPENAI_MODEL,
          messages: openaiMessages,
          temperature: 0.7,
          stream: true,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error('OpenAI API error:', errorData);
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }
      
      let fullResponse = '';
      
      // Create a TransformStream to process the streaming response
      const stream = new TransformStream({
        async transform(chunk, controller) {
          const decoded = decoder.decode(chunk);
          
          // Process SSE format
          const lines = decoded.split('\n').filter(line => line.trim() !== '');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') {
                continue;
              }
              
              try {
                const json = JSON.parse(data);
                const content = json.choices[0]?.delta?.content || '';
                if (content) {
                  fullResponse += content;
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
                }
              } catch (e) {
                console.error('Error parsing SSE data:', e);
              }
            }
          }
        },
        async flush(controller) {
          // Store chat history in database if projectId provided
          if (projectId) {
            try {
              const userMessage = messages[messages.length - 1].content;
              
              // Store in plan_chat_history table
              const { error: chatError } = await supabaseClient
                .from('plan_chat_history')
                .insert({
                  plan_id: projectId,
                  user_message: userMessage,
                  ai_response: fullResponse,
                  form_data: formData || null,
                  metadata: { 
                    model: OPENAI_MODEL,
                    streaming: true,
                    web_search_used: !!webSearchResults 
                  }
                });
                
              if (chatError) {
                console.error('Error storing chat history:', chatError);
              }
              
            } catch (dbError) {
              console.error('Database error:', dbError);
            }
          }
          
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        }
      });
      
      // Stream the response to the client
      return new Response(response.body?.pipeThrough(stream), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    } else {
      // Non-streaming response (backward compatible)
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: OPENAI_MODEL,
          messages: openaiMessages,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('OpenAI API error:', errorData);
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("OpenAI response received");
      
      const aiResponse = data.choices[0].message.content;
      
      // Store chat history in database if projectId provided
      if (projectId) {
        try {
          const userMessage = messages[messages.length - 1].content;
          
          // Store in plan_chat_history table
          const { error: chatError } = await supabaseClient
            .from('plan_chat_history')
            .insert({
              plan_id: projectId,
              user_message: userMessage,
              ai_response: aiResponse,
              form_data: formData || null,
              metadata: { 
                model: OPENAI_MODEL,
                web_search_used: !!webSearchResults,
                tokens: data.usage 
              }
            });
            
          if (chatError) {
            console.error('Error storing chat history:', chatError);
          }
          
        } catch (dbError) {
          console.error('Database error:', dbError);
          // Don't fail the request if DB storage fails
        }
      }

      return new Response(JSON.stringify({ 
        message: aiResponse,
        usage: data.usage
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error in chat-with-plan-assistant function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
