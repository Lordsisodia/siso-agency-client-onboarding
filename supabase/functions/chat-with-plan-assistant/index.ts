
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

// Assistant ID constants
const PLAN_BUILDER_ASSISTANT_ID = "plan-builder-assistant";

// Function to get or create assistant
async function getOrCreateAssistant() {
  // Check if assistant exists in our metadata table
  const { data: existingAssistant, error } = await supabase
    .from('assistant_metadata')
    .select('*')
    .eq('name', PLAN_BUILDER_ASSISTANT_ID)
    .single();

  if (existingAssistant?.assistant_id) {
    console.log("Found existing assistant:", existingAssistant.assistant_id);
    return existingAssistant.assistant_id;
  }

  console.log("Creating new assistant...");
  
  // Create a new assistant with OpenAI
  const assistant = await openai.beta.assistants.create({
    name: "Plan Builder Assistant",
    description: "This assistant helps users create project plans for software development",
    instructions: `
      You are a professional project planning assistant specialized in helping users create 
      comprehensive software project plans. Your goal is to help users define their requirements,
      select appropriate features, estimate timelines, and budget their projects effectively.
      
      When a user provides requirements or asks questions:
      1. Help them refine their project scope
      2. Suggest appropriate technologies and approaches
      3. Provide realistic timelines and budget estimates
      4. Break down complex tasks into manageable pieces
      5. Identify potential risks and mitigation strategies
      6. Document all important aspects of the plan
      
      Always be helpful, clear, and realistic in your assessments. If a user's expectations seem 
      unrealistic, gently provide education about more feasible alternatives.
    `,
    model: "gpt-4o",
    tools: [
      {
        type: "function",
        function: {
          name: "analyze_requirements",
          description: "Analyze project requirements and suggest improvements",
          parameters: {
            type: "object",
            properties: {
              analysis: {
                type: "object",
                properties: {
                  completeness: { 
                    type: "integer", 
                    description: "Score from 1-10 on how complete the requirements are" 
                  },
                  clarity: { 
                    type: "integer", 
                    description: "Score from 1-10 on how clear the requirements are" 
                  },
                  feasibility: { 
                    type: "integer", 
                    description: "Score from 1-10 on how feasible the requirements are" 
                  },
                  gaps: { 
                    type: "array", 
                    items: { type: "string" },
                    description: "List of identified gaps in the requirements"
                  },
                  suggestions: { 
                    type: "array", 
                    items: { type: "string" },
                    description: "List of suggestions to improve the requirements"
                  }
                },
                required: ["completeness", "clarity", "feasibility", "gaps", "suggestions"]
              }
            },
            required: ["analysis"]
          }
        }
      },
      {
        type: "function",
        function: {
          name: "recommend_features",
          description: "Recommend features based on project requirements",
          parameters: {
            type: "object",
            properties: {
              features: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    description: { type: "string" },
                    priority: { 
                      type: "string", 
                      enum: ["must-have", "should-have", "nice-to-have"]
                    },
                    complexity: { 
                      type: "string", 
                      enum: ["low", "medium", "high"]
                    },
                    estimated_hours: { type: "integer" }
                  },
                  required: ["name", "description", "priority", "complexity", "estimated_hours"]
                }
              }
            },
            required: ["features"]
          }
        }
      },
      {
        type: "function",
        function: {
          name: "estimate_timeline",
          description: "Estimate project timeline based on features and team size",
          parameters: {
            type: "object",
            properties: {
              timeline: {
                type: "object",
                properties: {
                  total_weeks: { type: "integer" },
                  phases: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        description: { type: "string" },
                        duration_weeks: { type: "integer" },
                        tasks: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              name: { type: "string" },
                              duration_days: { type: "integer" },
                              dependencies: {
                                type: "array",
                                items: { type: "string" }
                              }
                            },
                            required: ["name", "duration_days"]
                          }
                        }
                      },
                      required: ["name", "description", "duration_weeks", "tasks"]
                    }
                  }
                },
                required: ["total_weeks", "phases"]
              }
            },
            required: ["timeline"]
          }
        }
      },
      {
        type: "function",
        function: {
          name: "estimate_budget",
          description: "Estimate project budget based on features and timeline",
          parameters: {
            type: "object",
            properties: {
              budget: {
                type: "object",
                properties: {
                  total_estimate: { type: "number" },
                  currency: { type: "string", default: "USD" },
                  breakdown: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        category: { type: "string" },
                        amount: { type: "number" },
                        description: { type: "string" }
                      },
                      required: ["category", "amount", "description"]
                    }
                  },
                  contingency_percentage: { type: "number" }
                },
                required: ["total_estimate", "breakdown", "contingency_percentage"]
              }
            },
            required: ["budget"]
          }
        }
      }
    ]
  });
  
  // Store assistant information in our database
  const { data: savedAssistant, error: saveError } = await supabase
    .from('assistant_metadata')
    .insert({
      name: PLAN_BUILDER_ASSISTANT_ID,
      assistant_id: assistant.id,
      model: assistant.model,
      metadata: {
        description: assistant.description,
        created: new Date().toISOString()
      }
    })
    .select('*')
    .single();
  
  if (saveError) {
    console.error("Error saving assistant metadata:", saveError);
    throw saveError;
  }
  
  console.log("Created new assistant:", assistant.id);
  return assistant.id;
}

// Function to get or create a thread for a project
async function getOrCreateThread(projectId: string) {
  // Check if thread exists for this project
  const { data: existingThread, error } = await supabase
    .from('project_threads')
    .select('*')
    .eq('project_id', projectId)
    .single();
  
  if (existingThread?.thread_id) {
    console.log("Found existing thread:", existingThread.thread_id);
    return existingThread.thread_id;
  }
  
  // Create a new thread
  console.log("Creating new thread for project:", projectId);
  const thread = await openai.beta.threads.create();
  
  // Store thread information
  const { data: savedThread, error: saveError } = await supabase
    .from('project_threads')
    .insert({
      project_id: projectId,
      thread_id: thread.id
    })
    .select('*')
    .single();
  
  if (saveError) {
    console.error("Error saving thread:", saveError);
    throw saveError;
  }
  
  console.log("Created new thread:", thread.id);
  return thread.id;
}

// Function to save chat history
async function saveChatHistory(projectId: string | null, userMessage: string, aiResponse: string, formData?: Record<string, any>) {
  try {
    const { data, error } = await supabase
      .from('plan_chat_history')
      .insert({
        plan_id: projectId,
        user_message: userMessage,
        ai_response: aiResponse,
        form_data: formData || null
      });
    
    if (error) {
      console.error("Error saving chat history:", error);
    }
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
    const { prompt, projectId, formData } = await req.json();
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'No prompt provided' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Get or create assistant
    const assistantId = await getOrCreateAssistant();
    
    // Get or create thread
    const threadId = projectId ? await getOrCreateThread(projectId) : await openai.beta.threads.create().then(t => t.id);
    
    // Add user message to thread
    await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: prompt
    });
    
    // Run the assistant on the thread
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    });
    
    // Poll for completion
    let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
    
    // Wait for the run to complete
    while (runStatus.status !== 'completed' && runStatus.status !== 'failed' && runStatus.status !== 'requires_action') {
      // Wait a bit before polling again
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
      
      // If the run requires action (function calling)
      if (runStatus.status === 'requires_action') {
        const requiredActions = runStatus.required_action?.submit_tool_outputs.tool_calls || [];
        
        // Process function calls
        const toolOutputs = requiredActions.map(toolCall => {
          const functionName = toolCall.function.name;
          const functionArgs = JSON.parse(toolCall.function.arguments);
          
          console.log(`Processing function call: ${functionName}`, functionArgs);
          
          // For now, simply return the function args as the output
          // In a real implementation, you could perform actual processing here
          return {
            tool_call_id: toolCall.id,
            output: JSON.stringify(functionArgs),
          };
        });
        
        // Submit the tool outputs
        if (toolOutputs.length > 0) {
          await openai.beta.threads.runs.submitToolOutputs(
            threadId,
            runStatus.id,
            { tool_outputs: toolOutputs }
          );
          
          // Continue waiting for completion
          runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
        }
      }
    }
    
    // Get the assistant's response
    const messages = await openai.beta.threads.messages.list(threadId);
    
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
    
    // Save chat history if we have a project ID
    if (projectId) {
      await saveChatHistory(projectId, prompt, responseContent, formData);
    }
    
    // Return the assistant's response
    return new Response(
      JSON.stringify({ 
        response: responseContent,
        threadId: threadId
      }),
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
