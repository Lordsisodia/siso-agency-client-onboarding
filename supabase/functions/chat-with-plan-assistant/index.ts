
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
const MODEL = 'gpt-4o-mini'; // Using the latest appropriate model for cost-efficiency

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Enhanced system prompt for project planning with structured data
const PROJECT_PLANNER_SYSTEM_PROMPT = `
You are an expert AI project planning assistant specialized in helping users create comprehensive software project plans.
Provide helpful, structured advice on project requirements, timelines, budgets, and technical considerations.
Be conversational and ask clarifying questions when needed.

IMPORTANT: Every response MUST include a structured JSON summary of the project details within 
triple backticks (e.g. \`\`\`json {...} \`\`\`). Always include the following fields when you have information:

{
  "title": "Project Title",
  "description": "Brief description of the project",
  "businessContext": {
    "industry": "Industry name",
    "companyName": "Company name",
    "scale": "Small/Medium/Enterprise",
    "target_audience": ["Audience 1", "Audience 2"]
  },
  "goals": "Key project goals and objectives",
  "features": {
    "core": ["Feature 1", "Feature 2"],
    "extras": ["Nice-to-have 1", "Nice-to-have 2"]
  },
  "timeline": {
    "estimated_weeks": 12,
    "phases": [
      {
        "name": "Phase name",
        "duration": "X weeks",
        "tasks": ["Task 1", "Task 2"]
      }
    ]
  },
  "budget": {
    "estimated_total": 10000,
    "currency": "USD",
    "breakdown": [
      {
        "category": "Development",
        "amount": 5000
      },
      {
        "category": "Design",
        "amount": 2000
      }
    ]
  }
}

In EVERY response, include this JSON with all the information you have gathered so far.
If you don't have information for a field, include the field with empty value or appropriate placeholder.
Maintain and update this JSON as the conversation progresses and more information is gathered.
Keep your responses concise and focused while still being helpful.
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
    // Check if OpenAI API key is available
    if (!OPENAI_API_KEY) {
      console.error('OpenAI API key is not set');
      return new Response(
        JSON.stringify({ 
          error: 'OpenAI API key is not configured on the server',
          details: 'Please ask the administrator to set up the OPENAI_API_KEY'
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

    // Parse request body
    const body = await req.json();
    const { 
      messages, 
      projectId, 
      conversationId: existingConversationId,
      stream = false,
      action,
      userId,
      useWebSearch = false,
      useReasoning = false,
      systemPrompt
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
    console.log('Options - Web Search:', useWebSearch, 'Reasoning:', useReasoning);
    
    try {
      console.log(`Calling OpenAI API with model ${MODEL}`);
      
      // Create the messages array for OpenAI
      const openaiMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Add system message if not present
      if (!openaiMessages.some(msg => msg.role === 'system')) {
        openaiMessages.unshift({
          role: 'system',
          content: systemPrompt || PROJECT_PLANNER_SYSTEM_PROMPT
        });
      } else if (systemPrompt) {
        // Replace the existing system message if a custom one is provided
        const systemIndex = openaiMessages.findIndex(msg => msg.role === 'system');
        if (systemIndex >= 0) {
          openaiMessages[systemIndex].content = systemPrompt;
        }
      }
      
      // API URL
      const apiUrl = 'https://api.openai.com/v1/chat/completions';
      
      // Prepare the request body
      const requestBody = {
        model: MODEL,
        messages: openaiMessages,
        stream: stream
      };
      
      console.log('API URL:', apiUrl);
      console.log('Request body:', JSON.stringify({
        ...requestBody,
        messages: requestBody.messages.map(m => ({ 
          role: m.role, 
          content: m.content.substring(0, 50) + '...' 
        }))
      }));
      
      // Make API call to OpenAI
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        let errorMessage = `OpenAI API error: Status ${response.status}`;
        try {
          const errorData = await response.json();
          console.error('OpenAI API error response:', errorData);
          errorMessage = `OpenAI API error: ${errorData.error?.message || errorData.error || 'Unknown error'}`;
        } catch (e) {
          console.error('Failed to parse error response:', e);
        }
        throw new Error(errorMessage);
      }
      
      // Handle streaming response
      if (stream) {
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
          const lines = chunk.split('\n').filter(line => line.trim() !== '');
          
          for (const line of lines) {
            if (line.startsWith('data:')) {
              const data = line.substring(5).trim();
              
              // Skip [DONE] marker
              if (data === '[DONE]') continue;
              
              try {
                if (data) {
                  const parsedData = JSON.parse(data);
                  
                  // Extract content from the streaming response
                  if (parsedData.choices && parsedData.choices[0]?.delta?.content) {
                    const content = parsedData.choices[0].delta.content;
                    completeResponse += content;
                  }
                }
              } catch (e) {
                console.error('Error parsing data:', e, data);
              }
            }
          }
        }
        
        // Return the complete collected response without saving to database
        return new Response(
          JSON.stringify({ 
            response: completeResponse,
            model: MODEL,
            conversationId,
            web_search: useWebSearch,
            reasoning: useReasoning
          }),
          {
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json'
            }
          }
        );
      } else {
        // Process non-streaming response
        const result = await response.json();
        
        // Extract the assistant's response
        let assistantResponse = '';
        
        // Process responses from different APIs
        if (result.choices && result.choices[0]?.message) {
          // For chat/completions API
          assistantResponse = result.choices[0].message.content || "Sorry, I couldn't generate a proper response.";
        } else {
          // Fallback response
          assistantResponse = "Sorry, I couldn't generate a proper response.";
        }
        
        // Return the assistant's response without saving to database
        return new Response(
          JSON.stringify({ 
            response: assistantResponse,
            model: MODEL,
            conversationId,
            web_search: useWebSearch,
            reasoning: useReasoning
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
    
    // Generate a new conversation ID
    const conversationId = uuidv4();
      
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
