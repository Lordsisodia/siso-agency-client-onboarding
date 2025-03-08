import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { supabaseClient } from "../_shared/supabase-client.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// OpenAI API key from environment variables
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const OPENAI_API_URL = "https://api.openai.com/v1";

// Define our function calling definitions
const functionDefinitions = [
  {
    name: "define_project_requirements",
    description: "Define or update project requirements based on user input",
    parameters: {
      type: "object",
      properties: {
        business_type: {
          type: "string",
          description: "The type of business or organization the app is for"
        },
        target_audience: {
          type: "string",
          description: "The target audience or users of the application"
        },
        key_problems: {
          type: "array",
          items: { type: "string" },
          description: "The key problems the app should solve"
        },
        must_have_features: {
          type: "array",
          items: { type: "string" },
          description: "Essential features the app must include"
        },
        nice_to_have_features: {
          type: "array",
          items: { type: "string" },
          description: "Optional features that would be nice to include"
        },
      },
      required: ["key_problems"]
    }
  },
  {
    name: "estimate_budget",
    description: "Estimate the budget range for a project based on requirements and features",
    parameters: {
      type: "object",
      properties: {
        min_budget: {
          type: "number",
          description: "The minimum estimated budget in USD"
        },
        max_budget: {
          type: "number",
          description: "The maximum estimated budget in USD"
        },
        breakdown: {
          type: "object",
          description: "Breakdown of costs by category",
          properties: {
            development: { type: "number" },
            design: { type: "number" },
            testing: { type: "number" },
            deployment: { type: "number" },
            maintenance: { type: "number" }
          }
        },
        notes: {
          type: "string",
          description: "Additional notes about the budget estimate"
        }
      },
      required: ["min_budget", "max_budget"]
    }
  },
  {
    name: "plan_timeline",
    description: "Plan the project timeline with phases and milestones",
    parameters: {
      type: "object",
      properties: {
        total_weeks: {
          type: "number",
          description: "Total estimated project duration in weeks"
        },
        phases: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              duration_weeks: { type: "number" },
              description: { type: "string" },
              deliverables: { 
                type: "array",
                items: { type: "string" }
              }
            }
          }
        }
      },
      required: ["total_weeks", "phases"]
    }
  },
  {
    name: "select_tech_stack",
    description: "Recommend a technology stack for the project",
    parameters: {
      type: "object",
      properties: {
        frontend: {
          type: "array",
          items: { type: "string" },
          description: "Frontend technologies and frameworks"
        },
        backend: {
          type: "array",
          items: { type: "string" },
          description: "Backend technologies and frameworks"
        },
        database: {
          type: "array",
          items: { type: "string" },
          description: "Database technologies"
        },
        devops: {
          type: "array",
          items: { type: "string" },
          description: "DevOps and deployment technologies"
        },
        third_party_services: {
          type: "array",
          items: { type: "string" },
          description: "Third-party services and APIs"
        },
        rationale: {
          type: "string",
          description: "Explanation for the technology choices"
        }
      },
      required: ["frontend", "backend", "database"]
    }
  }
];

// System prompt for the AI assistant
const SYSTEM_PROMPT = `You are an AI assistant specializing in app development project planning. 
Your goal is to help users define their project requirements, suggest features, and create a comprehensive plan.
You should:
1. Extract key project details like business type, goals, features, platforms, timeline, and budget
2. Provide tailored recommendations based on industry best practices
3. Help estimate reasonable timelines and costs based on project scope
4. Break complex features into manageable components
5. Suggest technology stacks appropriate for the project's needs
6. Be conversational but focused on gathering practical information for app development
Be concise but thorough, and prioritize understanding user requirements before suggesting solutions.`;

async function getOrCreateAssistant(): Promise<string> {
  // First, check if we have an existing assistant ID in the database
  try {
    const { data, error } = await supabaseClient
      .from('assistant_metadata')
      .select('assistant_id')
      .eq('name', 'plan_builder')
      .single();
    
    if (!error && data?.assistant_id) {
      console.log("Using existing assistant ID:", data.assistant_id);
      return data.assistant_id;
    }
  } catch (err) {
    console.error("Error checking for existing assistant:", err);
  }
  
  // If no assistant exists, create a new one
  try {
    const response = await fetch(`${OPENAI_API_URL}/assistants`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      },
      body: JSON.stringify({
        name: "App Development Planner",
        description: "An assistant that helps create detailed app development plans",
        instructions: SYSTEM_PROMPT,
        model: "gpt-4o-mini",
        tools: [
          { "type": "code_interpreter" },
          { 
            "type": "function",
            "function": functionDefinitions[0]
          },
          { 
            "type": "function",
            "function": functionDefinitions[1]
          },
          { 
            "type": "function",
            "function": functionDefinitions[2]
          },
          { 
            "type": "function",
            "function": functionDefinitions[3]
          }
        ]
      })
    });
    
    if (!response.ok) {
      throw new Error(`Error creating assistant: ${response.status} ${response.statusText}`);
    }
    
    const assistant = await response.json();
    console.log("Created new assistant:", assistant.id);
    
    // Store the assistant ID in the database
    const { error } = await supabaseClient
      .from('assistant_metadata')
      .insert({
        name: 'plan_builder',
        assistant_id: assistant.id,
        model: 'gpt-4o-mini',
        metadata: { created_at: new Date().toISOString() }
      });
    
    if (error) {
      console.error("Error storing assistant ID:", error);
    }
    
    return assistant.id;
  } catch (err) {
    console.error("Error creating assistant:", err);
    throw err;
  }
}

async function getOrCreateThread(projectId?: string): Promise<string> {
  if (!projectId) {
    // Create a new thread if no project ID is provided
    const response = await fetch(`${OPENAI_API_URL}/threads`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      },
      body: JSON.stringify({})
    });
    
    if (!response.ok) {
      throw new Error(`Error creating thread: ${response.status} ${response.statusText}`);
    }
    
    const thread = await response.json();
    return thread.id;
  }
  
  // Check if we have an existing thread ID for this project
  try {
    const { data, error } = await supabaseClient
      .from('project_threads')
      .select('thread_id')
      .eq('project_id', projectId)
      .single();
    
    if (!error && data?.thread_id) {
      console.log("Using existing thread ID for project:", data.thread_id);
      return data.thread_id;
    }
    
    // Create a new thread if none exists
    const response = await fetch(`${OPENAI_API_URL}/threads`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      },
      body: JSON.stringify({})
    });
    
    if (!response.ok) {
      throw new Error(`Error creating thread: ${response.status} ${response.statusText}`);
    }
    
    const thread = await response.json();
    
    // Store the thread ID in the database
    const { error: insertError } = await supabaseClient
      .from('project_threads')
      .insert({
        project_id: projectId,
        thread_id: thread.id
      });
    
    if (insertError) {
      console.error("Error storing thread ID:", insertError);
    }
    
    return thread.id;
  } catch (err) {
    console.error("Error handling thread:", err);
    throw err;
  }
}

async function retrieveAssistantMessages(threadId: string): Promise<any[]> {
  try {
    const response = await fetch(`${OPENAI_API_URL}/threads/${threadId}/messages`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error retrieving messages: ${response.status} ${response.statusText}`);
    }
    
    const messages = await response.json();
    return messages.data || [];
  } catch (err) {
    console.error("Error retrieving messages:", err);
    throw err;
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

    console.log(`Processing request with ${messages.length} messages for project ${projectId || 'new'}`);
    
    // Get or create an assistant
    const assistantId = await getOrCreateAssistant();
    
    // Get or create a thread for this project
    const threadId = await getOrCreateThread(projectId);
    
    // Get the latest user message
    const latestUserMessage = messages[messages.length - 1].content;
    
    // Check if request wants streaming
    const streamRequested = req.headers.get('accept') === 'text/event-stream';
    
    // Add the message to the thread
    const messageResponse = await fetch(`${OPENAI_API_URL}/threads/${threadId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      },
      body: JSON.stringify({
        role: 'user',
        content: latestUserMessage,
        metadata: {
          form_data: formData ? JSON.stringify(formData) : null
        }
      })
    });
    
    if (!messageResponse.ok) {
      throw new Error(`Error adding message: ${messageResponse.status} ${messageResponse.statusText}`);
    }
    
    // Run the assistant on the thread
    const runResponse = await fetch(`${OPENAI_API_URL}/threads/${threadId}/runs`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      },
      body: JSON.stringify({
        assistant_id: assistantId,
        instructions: formData ? 
          `The user has provided structured form data: ${JSON.stringify(formData)}. Use this to provide more specific guidance.` : 
          undefined
      })
    });
    
    if (!runResponse.ok) {
      throw new Error(`Error creating run: ${runResponse.status} ${runResponse.statusText}`);
    }
    
    const run = await runResponse.json();
    const runId = run.id;
    
    if (streamRequested) {
      // Set up streaming
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
      
      // Create a TransformStream for the response
      const stream = new TransformStream({
        async start(controller) {
          let runStatus = run.status;
          let pollInterval = 500; // Start with 500ms polling
          
          // Poll until the run is completed
          while (runStatus !== 'completed' && 
                 runStatus !== 'failed' && 
                 runStatus !== 'cancelled' && 
                 runStatus !== 'expired') {
            
            // Wait before polling again
            await new Promise(resolve => setTimeout(resolve, pollInterval));
            
            // Increase poll interval gradually, max 3s
            pollInterval = Math.min(pollInterval * 1.5, 3000);
            
            // Check run status
            const statusResponse = await fetch(`${OPENAI_API_URL}/threads/${threadId}/runs/${runId}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
                'OpenAI-Beta': 'assistants=v2'
              }
            });
            
            if (!statusResponse.ok) {
              throw new Error(`Error checking run status: ${statusResponse.status} ${statusResponse.statusText}`);
            }
            
            const runData = await statusResponse.json();
            runStatus = runData.status;
            
            // If the run requires action (function calling)
            if (runStatus === 'requires_action') {
              const toolCalls = runData.required_action.submit_tool_outputs.tool_calls;
              const toolOutputs = [];
              
              for (const toolCall of toolCalls) {
                const functionName = toolCall.function.name;
                const functionArgs = JSON.parse(toolCall.function.arguments);
                
                console.log(`Function call: ${functionName}`, functionArgs);
                
                // Process functions - in a real implementation, these might perform
                // actual operations, but here we're just echoing back the inputs
                let result;
                if (functionName === 'define_project_requirements') {
                  result = {
                    success: true,
                    requirements: functionArgs
                  };
                  
                  // Update the project requirements in the database if project ID exists
                  if (projectId) {
                    await supabaseClient
                      .from('project_plans')
                      .update({
                        requirements: functionArgs
                      })
                      .eq('id', projectId);
                  }
                } 
                else if (functionName === 'estimate_budget') {
                  result = {
                    success: true,
                    budget_details: functionArgs
                  };
                  
                  // Update the project budget in the database if project ID exists
                  if (projectId) {
                    await supabaseClient
                      .from('project_plans')
                      .update({
                        budget: `$${functionArgs.min_budget} - $${functionArgs.max_budget}`
                      })
                      .eq('id', projectId);
                  }
                }
                else if (functionName === 'plan_timeline') {
                  result = {
                    success: true,
                    timeline: functionArgs
                  };
                  
                  // Update the project timeline in the database if project ID exists
                  if (projectId) {
                    await supabaseClient
                      .from('project_plans')
                      .update({
                        timeline: functionArgs
                      })
                      .eq('id', projectId);
                  }
                }
                else if (functionName === 'select_tech_stack') {
                  result = {
                    success: true,
                    selected_stack: functionArgs
                  };
                  
                  // Update the project technical specs in the database if project ID exists
                  if (projectId) {
                    await supabaseClient
                      .from('project_plans')
                      .update({
                        technical_specs: {
                          ...functionArgs,
                          last_updated: new Date().toISOString()
                        }
                      })
                      .eq('id', projectId);
                  }
                }
                
                toolOutputs.push({
                  tool_call_id: toolCall.id,
                  output: JSON.stringify(result)
                });
              }
              
              // Submit the tool outputs back to the run
              const submitResponse = await fetch(`${OPENAI_API_URL}/threads/${threadId}/runs/${runId}/submit_tool_outputs`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${OPENAI_API_KEY}`,
                  'Content-Type': 'application/json',
                  'OpenAI-Beta': 'assistants=v2'
                },
                body: JSON.stringify({
                  tool_outputs: toolOutputs
                })
              });
              
              if (!submitResponse.ok) {
                throw new Error(`Error submitting tool outputs: ${submitResponse.status} ${submitResponse.statusText}`);
              }
            }
            
            // Stream a heartbeat to keep the connection alive
            controller.enqueue(encoder.encode('data: {"type":"heartbeat"}\n\n'));
          }
          
          if (runStatus === 'completed') {
            // Retrieve the messages from the thread
            const messages = await retrieveAssistantMessages(threadId);
            
            // Get the latest assistant message
            const assistantMessages = messages.filter(msg => msg.role === 'assistant');
            if (assistantMessages.length > 0) {
              const latestMessage = assistantMessages[0]; // Messages are sorted by recency
              
              // Extract the content
              let messageContent = '';
              for (const contentItem of latestMessage.content) {
                if (contentItem.type === 'text') {
                  messageContent = contentItem.text.value;
                  break;
                }
              }
              
              // Store the conversation in the database if projectId is provided
              if (projectId) {
                await supabaseClient
                  .from('plan_chat_history')
                  .insert({
                    plan_id: projectId,
                    user_message: latestUserMessage,
                    ai_response: messageContent,
                    form_data: formData || null,
                    metadata: { 
                      assistant_id: assistantId,
                      thread_id: threadId,
                      run_id: runId,
                      streaming: true
                    }
                  });
              }
              
              // Stream the full message at once since we're simulating streaming
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: messageContent })}\n\n`));
            }
          } else if (runStatus === 'failed' || runStatus === 'expired') {
            // Handle failure
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
              error: `Run ${runStatus}: ${run.last_error?.message || 'Unknown error'}` 
            })}\n\n`));
          }
          
          // End the stream
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        }
      });
      
      // Return the streaming response
      return new Response(stream.readable, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        }
      });
    } else {
      // Non-streaming approach
      let runStatus = run.status;
      let runId = run.id;
      
      // Poll until the run is completed
      while (runStatus !== 'completed' && 
             runStatus !== 'failed' && 
             runStatus !== 'cancelled' && 
             runStatus !== 'expired') {
        
        // Wait before polling again
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check run status
        const statusResponse = await fetch(`${OPENAI_API_URL}/threads/${threadId}/runs/${runId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
            'OpenAI-Beta': 'assistants=v2'
          }
        });
        
        if (!statusResponse.ok) {
          throw new Error(`Error checking run status: ${statusResponse.status} ${statusResponse.statusText}`);
        }
        
        const runData = await statusResponse.json();
        runStatus = runData.status;
        
        // If the run requires action (function calling)
        if (runStatus === 'requires_action') {
          const toolCalls = runData.required_action.submit_tool_outputs.tool_calls;
          const toolOutputs = [];
          
          for (const toolCall of toolCalls) {
            const functionName = toolCall.function.name;
            const functionArgs = JSON.parse(toolCall.function.arguments);
            
            console.log(`Function call: ${functionName}`, functionArgs);
            
            // Process functions
            let result;
            if (functionName === 'define_project_requirements') {
              result = {
                success: true,
                requirements: functionArgs
              };
              
              // Update the project requirements in the database if project ID exists
              if (projectId) {
                await supabaseClient
                  .from('project_plans')
                  .update({
                    requirements: functionArgs
                  })
                  .eq('id', projectId);
              }
            } 
            else if (functionName === 'estimate_budget') {
              result = {
                success: true,
                budget_details: functionArgs
              };
              
              // Update the project budget in the database if project ID exists
              if (projectId) {
                await supabaseClient
                  .from('project_plans')
                  .update({
                    budget: `$${functionArgs.min_budget} - $${functionArgs.max_budget}`
                  })
                  .eq('id', projectId);
              }
            }
            else if (functionName === 'plan_timeline') {
              result = {
                success: true,
                timeline: functionArgs
              };
              
              // Update the project timeline in the database if project ID exists
              if (projectId) {
                await supabaseClient
                  .from('project_plans')
                  .update({
                    timeline: functionArgs
                  })
                  .eq('id', projectId);
              }
            }
            else if (functionName === 'select_tech_stack') {
              result = {
                success: true,
                selected_stack: functionArgs
              };
              
              // Update the project technical specs in the database if project ID exists
              if (projectId) {
                await supabaseClient
                  .from('project_plans')
                  .update({
                    technical_specs: {
                      ...functionArgs,
                      last_updated: new Date().toISOString()
                    }
                  })
                  .eq('id', projectId);
              }
            }
            
            toolOutputs.push({
              tool_call_id: toolCall.id,
              output: JSON.stringify(result)
            });
          }
          
          // Submit the tool outputs back to the run
          const submitResponse = await fetch(`${OPENAI_API_URL}/threads/${threadId}/runs/${runId}/submit_tool_outputs`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${OPENAI_API_KEY}`,
              'Content-Type': 'application/json',
              'OpenAI-Beta': 'assistants=v2'
            },
            body: JSON.stringify({
              tool_outputs: toolOutputs
            })
          });
          
          if (!submitResponse.ok) {
            throw new Error(`Error submitting tool outputs: ${submitResponse.status} ${submitResponse.statusText}`);
          }
        }
      }
      
      if (runStatus === 'completed') {
        // Retrieve the messages from the thread
        const messages = await retrieveAssistantMessages(threadId);
        
        // Get the latest assistant message
        const assistantMessages = messages.filter(msg => msg.role === 'assistant');
        if (assistantMessages.length > 0) {
          const latestMessage = assistantMessages[0]; // Messages are sorted by recency
          
          // Extract the content
          let messageContent = '';
          for (const contentItem of latestMessage.content) {
            if (contentItem.type === 'text') {
              messageContent = contentItem.text.value;
              break;
            }
          }
          
          // Store the conversation in the database if projectId is provided
          if (projectId) {
            await supabaseClient
              .from('plan_chat_history')
              .insert({
                plan_id: projectId,
                user_message: latestUserMessage,
                ai_response: messageContent,
                form_data: formData || null,
                metadata: { 
                  assistant_id: assistantId,
                  thread_id: threadId,
                  run_id: runId
                }
              });
          }
          
          return new Response(JSON.stringify({ 
            message: messageContent,
            metadata: {
              assistant_id: assistantId,
              thread_id: threadId,
              run_id: runId
            }
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      } else {
        throw new Error(`Run failed with status: ${runStatus}`);
      }
    }
    
    throw new Error('Failed to process the request');
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
