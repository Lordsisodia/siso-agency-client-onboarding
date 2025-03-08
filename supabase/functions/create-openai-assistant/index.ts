
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { OpenAI } from "https://esm.sh/openai@4.26.0";
import { supabaseClient } from "../_shared/supabase-client.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize OpenAI client with the v2 beta header
const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
  defaultHeaders: {
    'OpenAI-Beta': 'assistants=v2',
  }
});

async function createProjectAssistant() {
  try {
    console.log("Creating a new OpenAI assistant...");
    
    // Create the assistant
    const assistant = await openai.beta.assistants.create({
      name: "Project Planning Assistant",
      instructions: `You are a professional project planning assistant specialized in helping users create comprehensive software project plans. 
      
Help users define requirements, select features, estimate timelines, and budget effectively. 

When users describe their project ideas, guide them through:
1. Requirements gathering
2. Feature prioritization
3. Technical specifications
4. Timeline estimation
5. Budget planning

Be specific and detailed in your responses. Provide realistic cost estimates and timelines for software development projects.
When appropriate, suggest features they might not have considered that would enhance their project.`,
      model: "gpt-4o",
      tools: [
        {
          type: "function",
          function: {
            name: "generate_project_summary",
            description: "Generate a structured summary of the project based on user inputs",
            parameters: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  description: "Project title"
                },
                requirements: {
                  type: "array",
                  items: { type: "string" },
                  description: "Key project requirements"
                },
                features: {
                  type: "array",
                  items: { type: "string" },
                  description: "Main features to be implemented"
                },
                timeline: {
                  type: "string",
                  description: "Estimated project timeline"
                },
                budget: {
                  type: "string",
                  description: "Estimated project budget range"
                }
              },
              required: ["title"]
            }
          }
        }
      ]
    });

    console.log("Assistant created successfully:", assistant.id);

    // Save assistant info to database
    const { data, error } = await supabaseClient
      .from('assistant_metadata')
      .insert({
        assistant_id: assistant.id,
        name: assistant.name,
        model: assistant.model,
        instructions: assistant.instructions,
        tools: assistant.tools,
        metadata: {
          created_at: new Date().toISOString(),
          creator: "system",
          purpose: "project_planning"
        }
      })
      .select()
      .single();

    if (error) {
      console.error("Error saving assistant to database:", error);
      throw error;
    }

    return {
      success: true,
      assistant_id: assistant.id,
      message: "Project planning assistant created successfully",
      assistant: assistant
    };
  } catch (err) {
    console.error("Error creating assistant:", err);
    return {
      success: false,
      message: `Failed to create assistant: ${err.message}`,
      error: err
    };
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify that we have the required environment variables
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      return new Response(
        JSON.stringify({ error: "OPENAI_API_KEY environment variable is not set" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create the assistant
    const result = await createProjectAssistant();

    if (result.success) {
      return new Response(
        JSON.stringify(result),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify(result),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error("Unhandled error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Internal server error", 
        message: error.message,
        details: "This error occurred in the create-openai-assistant edge function"
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
