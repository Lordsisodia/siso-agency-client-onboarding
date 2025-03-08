
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Constants for the OpenAI API
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const OPENAI_MODEL = 'gpt-4o-mini'; // Using the more affordable model as the default

// System prompts for different conversation stages
const SYSTEM_PROMPTS = {
  initial: `You are an AI assistant helping a user create a project specification for a custom app development project.
Your goal is to gather essential information with minimal user input.
Be friendly, efficient, and focused on getting the key details needed to pre-fill the project specification form.
When you identify a company name or website, suggest extracting information automatically.`,

  companyResearch: `Based on the company name or website provided, you need to help identify:
1. The industry and business category
2. Typical digital needs for this type of business
3. Common features needed for apps in this space
4. Potential target audience
5. Key business objectives that digital solutions typically address in this industry
Be concise and focus on practical insights that help build a better project specification.`,

  requirementGeneration: `Based on the project goals and industry identified, help generate:
1. Key business requirements (3-5 points)
2. Essential features for an MVP (3-7 features)
3. Technical considerations that might be important
4. Potential integration needs
Keep suggestions practical and aligned with the user's business type and goals.`,
};

// Extraction functions for the AI to use
const EXTRACTION_FUNCTIONS = [
  {
    name: "extractCompanyInfoFromMessage",
    description: "Extract company information from user message",
    parameters: {
      type: "object",
      properties: {
        companyName: {
          type: "string",
          description: "The name of the company if mentioned"
        },
        website: {
          type: "string",
          description: "The website URL if mentioned"
        },
        industry: {
          type: "string",
          description: "The industry of the company if mentioned"
        },
        hasWebsite: {
          type: "boolean",
          description: "Whether a valid website was provided"
        }
      },
      required: ["hasWebsite"]
    }
  },
  {
    name: "extractProjectGoals",
    description: "Extract project goals and requirements from user message",
    parameters: {
      type: "object",
      properties: {
        mainGoal: {
          type: "string",
          description: "The main goal of the project"
        },
        targetAudience: {
          type: "string",
          description: "The target audience if mentioned"
        },
        requirements: {
          type: "array",
          items: {
            type: "string"
          },
          description: "List of requirements extracted from the message"
        }
      },
      required: ["mainGoal"]
    }
  },
  {
    name: "suggestFeatures",
    description: "Suggest features based on industry and project goals",
    parameters: {
      type: "object",
      properties: {
        essentialFeatures: {
          type: "array",
          items: {
            type: "string"
          },
          description: "Essential features for this type of project"
        },
        recommendedFeatures: {
          type: "array",
          items: {
            type: "string"
          },
          description: "Recommended but optional features"
        },
        innovativeFeatures: {
          type: "array",
          items: {
            type: "string"
          },
          description: "Innovative features that could set the project apart"
        }
      },
      required: ["essentialFeatures"]
    }
  }
];

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
    const { messages, stage, previousData } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      throw new Error('Invalid request: messages array is required');
    }

    console.log(`Processing request in stage: ${stage}`);
    
    // Select appropriate system prompt based on conversation stage
    let systemPrompt = SYSTEM_PROMPTS.initial;
    if (stage === 'companyResearch') {
      systemPrompt = SYSTEM_PROMPTS.companyResearch;
    } else if (stage === 'requirementGeneration') {
      systemPrompt = SYSTEM_PROMPTS.requirementGeneration;
    }
    
    // Prepare messages array with system prompt
    const openaiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];
    
    // Include previous data as context if available
    if (previousData) {
      const contextMessage = {
        role: 'system',
        content: `Previous information gathered: ${JSON.stringify(previousData)}`
      };
      openaiMessages.splice(1, 0, contextMessage);
    }

    // Determine if we should use function calling based on stage
    let functionCall = 'auto';
    let functions = undefined;
    
    if (stage === 'initial' || stage === 'companyIdentification') {
      functions = [EXTRACTION_FUNCTIONS[0]]; // Company info extraction
    } else if (stage === 'projectGoals') {
      functions = [EXTRACTION_FUNCTIONS[1]]; // Project goals extraction
    } else if (stage === 'featureSuggestions') {
      functions = [EXTRACTION_FUNCTIONS[2]]; // Feature suggestions
    }

    // Call OpenAI API
    console.log(`Calling OpenAI API with ${openaiMessages.length} messages`);
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: openaiMessages,
        functions: functions,
        function_call: functionCall,
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
    
    // Process the response
    let result = {
      message: data.choices[0].message.content,
      extractedData: null,
      usage: data.usage,
    };
    
    // Handle function call results if present
    if (data.choices[0].message.function_call) {
      const functionCall = data.choices[0].message.function_call;
      console.log(`Function call detected: ${functionCall.name}`);
      
      try {
        result.extractedData = JSON.parse(functionCall.arguments);
      } catch (e) {
        console.error('Error parsing function arguments:', e);
      }
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
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
