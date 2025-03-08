
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

// Function to get or create a thread for the user
async function getOrCreateThread(userId?: string, projectId?: string) {
  if (!userId) {
    // Create a temporary thread if no user ID
    return await openai.beta.threads.create();
  }

  // If a projectId is provided, check for that specific thread
  if (projectId) {
    const { data: threadData } = await supabase
      .from('project_threads')
      .select('thread_id')
      .eq('project_id', projectId)
      .single();
    
    if (threadData?.thread_id) {
      console.log("Using existing thread for project:", projectId);
      return { id: threadData.thread_id };
    }
  }
  
  // Check if user already has a general thread
  const { data: threadData } = await supabase
    .from('user_threads')
    .select('thread_id')
    .eq('user_id', userId)
    .single();
  
  if (threadData?.thread_id) {
    console.log("Using existing thread for user:", userId);
    return { id: threadData.thread_id };
  }
  
  // Create a new thread for this user
  const thread = await openai.beta.threads.create();
  
  // Store the thread ID for future use
  await supabase
    .from('user_threads')
    .insert({
      user_id: userId,
      thread_id: thread.id
    });
  
  return thread;
}

// Function to save chat history
async function saveChatHistory(userId: string | null, userMessage: string, aiResponse: string, metadata?: Record<string, any>) {
  try {
    await supabase
      .from('ai_chat_messages')
      .insert({
        user_id: userId,
        user_message: userMessage,
        ai_response: aiResponse,
        metadata: metadata || {},
        timestamp: new Date().toISOString()
      });
  } catch (err) {
    console.error("Error saving chat history:", err);
  }
}

// Helper to save structured onboarding data
async function saveOnboardingData(userId: string, stage: string, data: Record<string, any>) {
  try {
    // Check if this user already has an onboarding record
    const { data: existingData, error: fetchError } = await supabase
      .from('client_onboarding')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error("Error fetching onboarding data:", fetchError);
      return;
    }

    if (existingData) {
      // Update existing record with new data for this stage
      const updatedData = {
        ...existingData.data,
        [stage]: data,
        current_stage: stage,
        last_updated: new Date().toISOString()
      };

      await supabase
        .from('client_onboarding')
        .update({ 
          data: updatedData,
          current_stage: stage,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);
    } else {
      // Create new record
      await supabase
        .from('client_onboarding')
        .insert({
          user_id: userId,
          current_stage: stage,
          data: {
            [stage]: data,
            last_updated: new Date().toISOString()
          }
        });
    }
  } catch (err) {
    console.error("Error saving onboarding data:", err);
  }
}

// Function to get or create the appropriate assistant
async function getOrCreateAssistant() {
  // Generate a consistent name for our onboarding assistant
  const assistantName = "Client Onboarding Assistant";
  
  // Try to find an existing assistant with this name
  const { data: assistantData } = await supabase
    .from('assistant_metadata')
    .select('assistant_id')
    .eq('name', assistantName)
    .single();

  if (assistantData?.assistant_id) {
    console.log("Using existing assistant:", assistantName);
    return assistantData.assistant_id;
  }

  // Create system instructions for the onboarding assistant
  const systemInstructions = `
  You are a friendly and professional onboarding assistant designed to help new clients provide information about their app project requirements. Your goal is to collect structured information through a natural, conversational flow.

  Follow these guidelines:
  1. Be welcoming and professional, but conversational in tone.
  2. Guide users through a step-by-step information gathering process.
  3. Stay focused on collecting the required information for app development.
  4. Ask one question at a time to avoid overwhelming the user.
  5. Provide examples or suggestions when asking for input.
  6. Summarize collected information at the end of each major section.
  7. Offer to correct any information if needed.

  Information gathering phases:
  - COMPANY_INFO: Collect company name, website, industry, and contact details
  - PROJECT_OVERVIEW: Ask about app purpose, objectives, and type (web, mobile, both)
  - FEATURE_SELECTION: Inquire about desired features and specific functionality
  - BUDGET_TIMELINE: Determine budget range and project timeline
  - VALIDATION: Summarize all collected information for confirmation

  The conversation should flow naturally between these phases. Track which phase you are in based on what information has been collected, and use the phase names in your function calls to organize the data.

  For each phase, use the appropriate function to store the structured data.

  Remember to always be helpful, patient, and professional.
  `;

  // Define function schemas for the onboarding assistant
  const assistantFunctions = [
    {
      type: "function",
      function: {
        name: "save_company_information",
        description: "Save the company information provided by the user",
        parameters: {
          type: "object",
          properties: {
            company_name: { type: "string", description: "Name of the company" },
            website: { type: "string", description: "Company website URL (if available)" },
            industry: { type: "string", description: "Industry or business sector" },
            contact_name: { type: "string", description: "Primary contact person's name" },
            contact_email: { type: "string", description: "Contact email address" },
            contact_phone: { type: "string", description: "Contact phone number (if provided)" },
            company_size: { type: "string", description: "Approximate company size or number of employees" }
          },
          required: ["company_name"]
        }
      }
    },
    {
      type: "function",
      function: {
        name: "save_project_overview",
        description: "Save the project overview information",
        parameters: {
          type: "object",
          properties: {
            app_type: { 
              type: "string", 
              description: "Type of app (web, mobile, both, or other)",
              enum: ["web", "mobile", "both", "other"]
            },
            app_purpose: { type: "string", description: "Primary purpose of the application" },
            target_audience: { type: "string", description: "Description of the intended users" },
            main_objectives: { 
              type: "array", 
              items: { type: "string" },
              description: "List of main objectives for the application" 
            },
            competitors: { 
              type: "array", 
              items: { type: "string" },
              description: "List of competing applications or services, if mentioned" 
            }
          },
          required: ["app_type", "app_purpose"]
        }
      }
    },
    {
      type: "function",
      function: {
        name: "save_feature_requirements",
        description: "Save the desired features and functionality",
        parameters: {
          type: "object",
          properties: {
            core_features: { 
              type: "array", 
              items: { type: "string" },
              description: "List of essential features required for the app" 
            },
            nice_to_have_features: { 
              type: "array", 
              items: { type: "string" },
              description: "List of desired but non-essential features" 
            },
            user_authentication: { 
              type: "boolean", 
              description: "Whether user authentication is required" 
            },
            payment_processing: { 
              type: "boolean", 
              description: "Whether payment processing is required" 
            },
            admin_dashboard: { 
              type: "boolean", 
              description: "Whether an admin dashboard is required" 
            },
            integrations: { 
              type: "array", 
              items: { type: "string" },
              description: "List of third-party integrations required" 
            },
            specific_requirements: { 
              type: "string", 
              description: "Any specific or unique requirements mentioned" 
            }
          },
          required: ["core_features"]
        }
      }
    },
    {
      type: "function",
      function: {
        name: "save_budget_timeline",
        description: "Save budget and timeline information",
        parameters: {
          type: "object",
          properties: {
            budget_range: { 
              type: "string", 
              description: "Budget range for the project" 
            },
            timeline_expectation: { 
              type: "string", 
              description: "Expected timeline for completion" 
            },
            priority: { 
              type: "string", 
              enum: ["low", "medium", "high", "urgent"],
              description: "Priority level for the project" 
            },
            phased_approach: { 
              type: "boolean", 
              description: "Whether the client is open to a phased approach" 
            },
            flexibility: { 
              type: "string", 
              description: "Notes on flexibility regarding budget or timeline" 
            }
          },
          required: ["budget_range", "timeline_expectation"]
        }
      }
    },
    {
      type: "function",
      function: {
        name: "save_additional_information",
        description: "Save any additional information provided by the user",
        parameters: {
          type: "object",
          properties: {
            additional_notes: { 
              type: "string", 
              description: "Any additional information or special requirements" 
            },
            preferred_communication: { 
              type: "string", 
              description: "Preferred method of communication" 
            },
            availability: { 
              type: "string", 
              description: "Availability for meetings or further discussions" 
            },
            how_they_found_us: { 
              type: "string", 
              description: "How the client found out about the service" 
            }
          },
          required: []
        }
      }
    }
  ];

  // Create a new assistant
  const assistant = await openai.beta.assistants.create({
    name: assistantName,
    instructions: systemInstructions,
    model: "gpt-4o-mini-2024-07-18", 
    tools: [
      { type: "retrieval" },
      ...assistantFunctions
    ]
  });
  
  // Store the assistant ID
  await supabase
    .from('assistant_metadata')
    .insert({
      name: assistantName,
      assistant_id: assistant.id,
      model: assistant.model,
      metadata: {
        description: "Assistant for structured client onboarding conversations",
        created: new Date().toISOString()
      }
    });
  
  return assistant.id;
}

// Process function calls from the assistant
async function processFunctionCalls(userId: string, toolCalls: any[]) {
  const results = [];
  
  for (const toolCall of toolCalls) {
    try {
      const functionName = toolCall.function.name;
      const functionArgs = JSON.parse(toolCall.function.arguments);
      
      console.log(`Processing function call: ${functionName}`, functionArgs);
      
      // Determine which stage we're in based on the function name
      let stage = '';
      let data = functionArgs;
      
      switch (functionName) {
        case 'save_company_information':
          stage = 'COMPANY_INFO';
          break;
        case 'save_project_overview':
          stage = 'PROJECT_OVERVIEW';
          break;
        case 'save_feature_requirements':
          stage = 'FEATURE_SELECTION';
          break;
        case 'save_budget_timeline':
          stage = 'BUDGET_TIMELINE';
          break;
        case 'save_additional_information':
          stage = 'ADDITIONAL_INFO';
          break;
        default:
          console.log(`Unknown function: ${functionName}`);
          stage = 'UNKNOWN';
      }
      
      // Save the data to the onboarding record
      if (userId && stage !== 'UNKNOWN') {
        await saveOnboardingData(userId, stage, data);
      }
      
      // Return success message
      results.push({
        tool_call_id: toolCall.id,
        output: JSON.stringify({ 
          success: true, 
          message: `Successfully saved ${stage} information.` 
        })
      });
    } catch (error) {
      console.error(`Error processing function call:`, error);
      results.push({
        tool_call_id: toolCall.id,
        output: JSON.stringify({ 
          success: false, 
          error: error.message 
        })
      });
    }
  }
  
  return results;
}

// Get the current onboarding progress for a user
async function getOnboardingProgress(userId: string) {
  try {
    const { data, error } = await supabase
      .from('client_onboarding')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No data found, return empty object
        return {
          current_stage: 'COMPANY_INFO', // Default to first stage
          progress: 0,
          data: {}
        };
      }
      throw error;
    }
    
    // Calculate progress percentage based on stages completed
    const stages = ['COMPANY_INFO', 'PROJECT_OVERVIEW', 'FEATURE_SELECTION', 'BUDGET_TIMELINE', 'ADDITIONAL_INFO'];
    const completedStages = Object.keys(data.data || {}).filter(key => stages.includes(key));
    const progress = Math.round((completedStages.length / stages.length) * 100);
    
    return {
      current_stage: data.current_stage || 'COMPANY_INFO',
      progress,
      data: data.data || {}
    };
  } catch (err) {
    console.error("Error getting onboarding progress:", err);
    return {
      current_stage: 'COMPANY_INFO',
      progress: 0,
      data: {}
    };
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
    const { message, systemPrompt, userId, projectId, isOnboarding } = await req.json();
    
    if (!message) {
      return new Response(
        JSON.stringify({ error: 'No message provided' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Get or create a thread for this user
    const thread = await getOrCreateThread(userId, projectId);
    
    // Get or create the appropriate assistant
    // Use onboarding assistant if isOnboarding is true, otherwise use regular assistant
    const assistantId = isOnboarding 
      ? await getOrCreateAssistant() 
      : await getOrCreateAssistant();
    
    // If this is an onboarding chat, get the current progress
    let onboardingProgress = null;
    if (isOnboarding && userId) {
      onboardingProgress = await getOnboardingProgress(userId);
      console.log("Current onboarding progress:", onboardingProgress);
    }
    
    // Add user message to thread
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: message
    });
    
    // Prepare instructions based on conversation context
    let instructions = systemPrompt || undefined;
    
    if (isOnboarding && onboardingProgress) {
      // Add context about the current onboarding stage and progress
      instructions = `
        ${instructions || ''}
        
        Current onboarding progress:
        - Current stage: ${onboardingProgress.current_stage}
        - Progress: ${onboardingProgress.progress}%
        
        ${onboardingProgress.progress > 0 ? `Information already collected: ${JSON.stringify(onboardingProgress.data)}` : 'This is the beginning of the onboarding process.'}
        
        Based on the current progress, continue the conversation to collect the remaining information in a natural way.
      `;
    }
    
    // Run the assistant on the thread with custom configuration
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId,
      instructions: instructions,
      model: "gpt-4o-mini-2024-07-18", // Using the specified model
      temperature: 0.7,
      max_tokens: 1000, // Setting a reasonable limit for responses
      max_prompt_tokens: 4000 // Setting context window limit
    });
    
    // Poll for completion with progressive timeout
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    let pollCount = 0;
    const maxPolls = 60; // Set a maximum number of polls (10 minutes)
    
    // Wait for the run to complete
    while (runStatus.status !== 'completed' && 
           runStatus.status !== 'failed' && 
           runStatus.status !== 'expired' &&
           runStatus.status !== 'cancelled' && 
           pollCount < maxPolls) {
      
      // Wait before polling again, with progressive backoff
      const delay = Math.min(1000 * (1 + Math.floor(pollCount / 5)), 5000);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      pollCount++;
      
      // Handle function calls if needed
      if (runStatus.status === 'requires_action') {
        console.log("Function calling detected");
        
        const requiredActions = runStatus.required_action?.submit_tool_outputs.tool_calls || [];
        
        if (requiredActions.length > 0 && userId) {
          // Process function calls and submit the results
          const toolOutputs = await processFunctionCalls(userId, requiredActions);
          
          await openai.beta.threads.runs.submitToolOutputs(
            thread.id,
            run.id,
            { tool_outputs: toolOutputs }
          );
        } else {
          console.log("No user ID provided for function calling or no actions required");
        }
      }
    }
    
    if (runStatus.status !== 'completed') {
      console.error(`Run ended with status: ${runStatus.status}`);
      return new Response(
        JSON.stringify({ 
          error: `Assistant processing ended with status: ${runStatus.status}`,
          details: runStatus
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
    
    // Get the assistant's response
    const messages = await openai.beta.threads.messages.list(thread.id);
    
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
    
    // Get updated onboarding progress if this is an onboarding chat
    let updatedProgress = null;
    if (isOnboarding && userId) {
      updatedProgress = await getOnboardingProgress(userId);
    }
    
    // Save chat history if we have a user ID
    if (userId) {
      await saveChatHistory(userId, message, responseContent, {
        isOnboarding: !!isOnboarding,
        onboardingProgress: updatedProgress
      });
    }
    
    // Return the assistant's response
    return new Response(
      JSON.stringify({ 
        response: responseContent,
        onboardingProgress: updatedProgress
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
