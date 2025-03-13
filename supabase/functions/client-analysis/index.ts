
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      return new Response(
        JSON.stringify({ success: false, error: "OpenAI API key not configured" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { input, responseId, websiteUrl } = await req.json();

    // Create a new response or continue from an existing one
    const apiEndpoint = "https://api.openai.com/v1/responses";
    const method = responseId ? "PATCH" : "POST";
    const url = responseId ? `${apiEndpoint}/${responseId}` : apiEndpoint;

    // Enhance the input with website-related context if provided
    let formattedInput = input;
    if (websiteUrl && !responseId) {
      formattedInput = `Analyze this client website: ${websiteUrl}\n\n${input}`;
    }

    // Construct the request body
    const requestBody: any = {
      model: "gpt-4o",
      temperature: 0.7
    };

    // For a new conversation
    if (!responseId) {
      requestBody.input = formattedInput;
      requestBody.tools = [{ type: "web_search" }];
    } 
    // For continuing a conversation
    else {
      requestBody.input = formattedInput;
      requestBody.previous_response_id = responseId;
    }

    console.log(`Making ${method} request to ${url}`);
    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'responses-2024-08-23' // Include the beta header
      },
      body: JSON.stringify(requestBody)
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenAI API error (${response.status}): ${errorText}`);
      return new Response(
        JSON.stringify({ success: false, error: `OpenAI API error: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    
    // Extract the assistant's messages and any web search results
    const processedResult = {
      responseId: data.id,
      messages: [],
      webSearchResults: []
    };

    // Process the output to extract messages and web search results
    if (data.output) {
      for (const item of data.output) {
        if (item.type === "message" && item.role === "assistant") {
          processedResult.messages.push({
            type: "text",
            content: item.content[0].text,
            annotations: item.content[0].annotations || []
          });
        } else if (item.type === "web_search_call") {
          processedResult.webSearchResults.push({
            id: item.id,
            status: item.status
          });
        }
      }
    }

    console.log("Processed response:", JSON.stringify(processedResult, null, 2));
    
    return new Response(
      JSON.stringify({ success: true, result: processedResult }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in client-analysis function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
