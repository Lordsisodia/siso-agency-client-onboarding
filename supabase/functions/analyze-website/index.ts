
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Constants for the OpenAI API
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const OPENAI_MODEL = 'gpt-4o-mini';

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
    const { url, additionalContext } = await req.json();
    
    if (!url) {
      throw new Error('URL is required');
    }

    // Prepare the prompt for website analysis
    const prompt = `
      Analyze the website at ${url}. 
      ${additionalContext ? `Additional context: ${additionalContext}` : ''}
      
      Extract the following information:
      1. Company name
      2. Industry/business type
      3. Target audience
      4. Key services or products
      5. Current digital features
      6. Potential areas for improvement
      
      Format your response as JSON with the following structure:
      {
        "companyName": "...",
        "industry": "...",
        "targetAudience": "...",
        "servicesProducts": ["...", "...", ...],
        "currentDigitalFeatures": ["...", "...", ...],
        "potentialImprovements": ["...", "...", ...]
      }
    `;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          { role: 'system', content: 'You are a web analyst that extracts business information from websites.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    let analysis;

    try {
      // Try to parse the JSON from the response
      const content = data.choices[0].message.content;
      analysis = JSON.parse(content);
    } catch (e) {
      // If parsing fails, return the raw text
      analysis = { 
        raw: data.choices[0].message.content,
        error: "Failed to parse structured data" 
      };
    }

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in analyze-website function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
