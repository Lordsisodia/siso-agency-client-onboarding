
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

// Caching mechanism for assistants
const assistantCache = new Map();

/**
 * Gets or creates an assistant with caching
 * @returns Promise<string> The assistant ID
 */
async function getOrCreateAssistant() {
  // Check if assistant exists in our cache first
  if (assistantCache.has(PLAN_BUILDER_ASSISTANT_ID)) {
    return assistantCache.get(PLAN_BUILDER_ASSISTANT_ID);
  }

  // Check if assistant exists in our metadata table
  const { data: existingAssistant, error } = await supabase
    .from('assistant_metadata')
    .select('*')
    .eq('name', PLAN_BUILDER_ASSISTANT_ID)
    .single();

  if (existingAssistant?.assistant_id) {
    console.log("Found existing assistant:", existingAssistant.assistant_id);
    
    try {
      // Verify assistant still exists in OpenAI
      await openai.beta.assistants.retrieve(existingAssistant.assistant_id);
      
      // Store in cache and return
      assistantCache.set(PLAN_BUILDER_ASSISTANT_ID, existingAssistant.assistant_id);
      return existingAssistant.assistant_id;
    } catch (err) {
      console.log("Assistant no longer exists in OpenAI, creating a new one");
      // Continue to create a new assistant
    }
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
        created: new Date().toISOString(),
        version: "1.0.0" // Adding version tracking
      }
    })
    .select('*')
    .single();
  
  if (saveError) {
    console.error("Error saving assistant metadata:", saveError);
    throw saveError;
  }
  
  console.log("Created new assistant:", assistant.id);
  
  // Store in cache and return
  assistantCache.set(PLAN_BUILDER_ASSISTANT_ID, assistant.id);
  return assistant.id;
}

/**
 * Gets or creates a thread for a project with better error handling
 * @param projectId The project ID
 * @returns Promise<string> The thread ID
 */
async function getOrCreateThread(projectId: string) {
  if (!projectId) {
    throw new Error("Project ID is required to create or retrieve a thread");
  }
  
  try {
    // Check if thread exists for this project
    const { data: existingThread, error } = await supabase
      .from('project_threads')
      .select('*')
      .eq('project_id', projectId)
      .single();
    
    if (existingThread?.thread_id) {
      console.log("Found existing thread:", existingThread.thread_id);
      
      try {
        // Verify thread still exists in OpenAI
        await openai.beta.threads.retrieve(existingThread.thread_id);
        return existingThread.thread_id;
      } catch (err) {
        console.log("Thread no longer exists in OpenAI, creating a new one");
        // Continue to create a new thread
      }
    }
    
    // Create a new thread
    console.log("Creating new thread for project:", projectId);
    const thread = await openai.beta.threads.create({
      metadata: {
        project_id: projectId,
        created_at: new Date().toISOString()
      }
    });
    
    // Store thread information
    const { data: savedThread, error: saveError } = await supabase
      .from('project_threads')
      .insert({
        project_id: projectId,
        thread_id: thread.id,
        metadata: {
          created_at: new Date().toISOString(),
          message_count: 0
        }
      })
      .select('*')
      .single();
    
    if (saveError) {
      console.error("Error saving thread:", saveError);
      throw saveError;
    }
    
    console.log("Created new thread:", thread.id);
    return thread.id;
  } catch (err) {
    console.error("Error in getOrCreateThread:", err);
    throw new Error(`Failed to create or retrieve thread: ${err.message}`);
  }
}

/**
 * Save chat history with improved error handling and metadata
 */
async function saveChatHistory(projectId: string | null, userMessage: string, aiResponse: string, formData?: Record<string, any>, metadata?: Record<string, any>) {
  if (!projectId) {
    console.log("No project ID provided, skipping chat history save");
    return;
  }
  
  try {
    const finalMetadata = {
      ...metadata || {},
      saved_at: new Date().toISOString(),
      client_info: 'edge-function'
    };
    
    const { data, error } = await supabase
      .from('plan_chat_history')
      .insert({
        plan_id: projectId,
        user_message: userMessage,
        ai_response: aiResponse,
        form_data: formData || null,
        metadata: finalMetadata
      });
    
    if (error) {
      console.error("Error saving chat history:", error);
      // Continue execution rather than throwing, as this is a non-critical operation
    } else {
      console.log("Successfully saved chat history");
      
      // Update message count in project thread metadata
      await supabase
        .from('project_threads')
        .update({
          updated_at: new Date().toISOString(),
          metadata: {
            last_message_at: new Date().toISOString(),
            has_new_messages: true
          }
        })
        .eq('project_id', projectId);
    }
  } catch (err) {
    console.error("Exception in saveChatHistory:", err);
  }
}

/**
 * Process tool calls and handle function outputs
 */
async function processToolOutputs(runId: string, threadId: string, toolCalls: any[]) {
  const toolOutputs = [];
  
  for (const toolCall of toolCalls) {
    if (toolCall.type === 'function') {
      const functionName = toolCall.function.name;
      const functionArgs = JSON.parse(toolCall.function.arguments);
      
      console.log(`Processing function call: ${functionName}`, functionArgs);
      
      let output = JSON.stringify(functionArgs);
      
      // Add custom function processing here if needed
      // For now, we're just returning the arguments as the output
      
      toolOutputs.push({
        tool_call_id: toolCall.id,
        output
      });
    }
  }
  
  if (toolOutputs.length > 0) {
    return await openai.beta.threads.runs.submitToolOutputs(
      threadId,
      runId,
      { tool_outputs: toolOutputs }
    );
  }
  
  return null;
}

/**
 * Enhanced run poller with timeout and better error handling
 */
async function pollForCompletion(threadId: string, runId: string, maxPolls = 60, initialBackoff = 1000) {
  let pollCount = 0;
  let backoff = initialBackoff;
  
  while (pollCount < maxPolls) {
    try {
      const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
      
      console.log(`Run status: ${runStatus.status}, Poll: ${pollCount + 1}/${maxPolls}`);
      
      if (runStatus.status === 'completed') {
        return runStatus;
      }
      
      if (runStatus.status === 'failed' || runStatus.status === 'expired' || runStatus.status === 'cancelled') {
        throw new Error(`Run ended with status: ${runStatus.status}`);
      }
      
      if (runStatus.status === 'requires_action') {
        // Handle function calling
        const requiredActions = runStatus.required_action?.submit_tool_outputs.tool_calls || [];
        const updatedRun = await processToolOutputs(runId, threadId, requiredActions);
        
        if (updatedRun) {
          // Reset backoff after successful action
          backoff = initialBackoff;
          continue;
        }
      }
      
      pollCount++;
      
      // Wait with exponential backoff (capped at 5 seconds)
      await new Promise(resolve => setTimeout(resolve, Math.min(backoff, 5000)));
      backoff = Math.min(backoff * 1.5, 5000); // Gradually increase backoff time
      
    } catch (err) {
      console.error(`Error polling run status: ${err.message}`);
      throw err;
    }
  }
  
  throw new Error(`Run timed out after ${maxPolls} polls`);
}

// Main streaming response handler
async function streamResponseContent(req: Request) {
  try {
    // Extract request data
    const { messages, projectId, formData } = await req.json();
    
    if (!messages || !messages.length) {
      throw new Error("No messages provided");
    }
    
    // Get the user's message (last message in the array)
    const userMessage = messages[messages.length - 1];
    
    if (!userMessage || !userMessage.content) {
      throw new Error("Invalid user message format");
    }
    
    // Get or create assistant
    const assistantId = await getOrCreateAssistant();
    
    // Get or create thread
    const threadId = projectId ? await getOrCreateThread(projectId) : await openai.beta.threads.create().then(t => t.id);
    
    // Add user message to thread
    await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: userMessage.content
    });
    
    // Run the assistant on the thread
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    });
    
    // Create a new TransformStream for streaming the response
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    const encoder = new TextEncoder();
    
    // Start a background task to poll for completion and stream results
    (async () => {
      try {
        // Wait for the run to complete or require action
        const runResult = await pollForCompletion(threadId, run.id);
        
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
        
        // Write the response in chunks to simulate streaming
        const chunkSize = 12; // Number of characters per chunk
        for (let i = 0; i < responseContent.length; i += chunkSize) {
          const chunk = responseContent.substring(i, i + chunkSize);
          const data = JSON.stringify({ content: chunk });
          await writer.write(encoder.encode(`data: ${data}\n\n`));
          // Small delay to simulate streaming
          await new Promise(r => setTimeout(r, 10));
        }
        
        // Signal completion
        await writer.write(encoder.encode(`data: [DONE]\n\n`));
        
        // Save chat history if we have a project ID
        if (projectId) {
          await saveChatHistory(projectId, userMessage.content, responseContent, formData, {
            thread_id: threadId,
            run_id: run.id
          });
        }
        
        await writer.close();
      } catch (streamError) {
        console.error('Streaming error:', streamError);
        const errorJson = JSON.stringify({ error: streamError.message });
        await writer.write(encoder.encode(`data: ${errorJson}\n\n`));
        await writer.close();
      }
    })();
    
    // Return the readable stream as the response
    return new Response(stream.readable, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });
  } catch (error) {
    console.error('Error in stream response handler:', error);
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
}

// Non-streaming chat handler
async function handleRegularChat(req: Request) {
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
    
    // Wait for the run to complete or require action
    const runResult = await pollForCompletion(threadId, run.id);
    
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
      await saveChatHistory(projectId, prompt, responseContent, formData, {
        thread_id: threadId,
        run_id: run.id
      });
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
      JSON.stringify({ 
        error: error.message || 'An error occurred',
        details: error.stack // Include stack trace for debugging
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
}

// Main function to handle requests
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    });
  }
  
  // Check if the request wants streaming
  const url = new URL(req.url);
  const wantsStreaming = url.searchParams.get('stream') === 'true' || 
                         req.headers.get('Accept') === 'text/event-stream';
  
  try {
    if (wantsStreaming) {
      return await streamResponseContent(req);
    } else {
      return await handleRegularChat(req);
    }
  } catch (error) {
    console.error('Unhandled error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        message: error.message,
        stack: error.stack // Include stack trace for debugging
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
