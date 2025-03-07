
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { supabaseClient } from "../_shared/supabase-client.ts";

// [Analysis] Configure CORS headers for browser access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// [Analysis] Improved article analysis function with OpenAI integration
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // [Analysis] Parse request for article data
    const { articleId, title, content, source, category } = await req.json();
    
    if (!articleId || !title) {
      throw new Error("Missing required fields - articleId and title must be provided");
    }
    
    console.log(`Processing analysis for article: ${articleId}`);
    
    // [Framework] First check if analysis already exists to avoid reprocessing
    try {
      const { data: existingAnalysis, error: checkError } = await supabaseClient
        .from("ai_news")
        .select("id, ai_analysis, has_ai_analysis")
        .eq("id", articleId)
        .single();
        
      if (!checkError && existingAnalysis && existingAnalysis.ai_analysis) {
        console.log("Analysis already exists, returning cached result");
        return new Response(
          JSON.stringify({
            success: true,
            message: "Returning existing analysis",
            analysis: existingAnalysis.ai_analysis,
            articleId,
            cached: true
          }),
          { 
            headers: { 
              ...corsHeaders,
              "Content-Type": "application/json" 
            } 
          }
        );
      }
    } catch (checkError) {
      console.log("Error checking for existing analysis:", checkError);
      // Continue with analysis generation if check fails
    }
    
    // [Analysis] Get OpenAI API key from environment variables
    const openAIKey = Deno.env.get("OPENAI_API_KEY");
    
    if (!openAIKey) {
      throw new Error("OpenAI API key not configured");
    }
    
    console.log("Using OpenAI for analysis");
    
    // [Analysis] Prepare prompt for article analysis with meaningful structure
    const prompt = `
      Analyze this AI news article and provide insights for AI agency professionals:
      
      Title: ${title}
      
      Content: ${content || ""}
      
      Source: ${source || "Unknown"}
      
      Category: ${category || "AI Technology"}
      
      Please respond with JSON containing the following keys:
      - market_impact: A detailed paragraph analyzing market implications for AI agencies
      - technical_predictions: Array of 3-5 bullet points with technical predictions
      - related_technologies: Array of relevant technologies mentioned or implied in the article
      - business_implications: A paragraph explaining strategic business implications for AI agencies
    `;
    
    // [Analysis] Call OpenAI API for enhanced analysis with reduced temperature for faster responses
    const openAIResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openAIKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // [Analysis] Using faster model for quicker responses
        messages: [
          {
            role: "system",
            content: "You are an AI technology analyst specialized in extracting business insights from news articles for AI agencies. Provide concise, actionable analysis in JSON format."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.2, // [Analysis] Lower temperature for faster, more consistent responses
        max_tokens: 800, // [Analysis] Limit response length for faster generation
      }),
    });
    
    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.text();
      console.error("OpenAI API error:", errorData);
      throw new Error(`OpenAI API error: ${errorData}`);
    }
    
    // [Analysis] Process and parse the OpenAI response
    const openAIData = await openAIResponse.json();
    console.log("Received response from OpenAI");
    
    let analysis;
    try {
      // [Analysis] Extract JSON from OpenAI response
      const responseContent = openAIData.choices[0].message.content;
      
      // [Framework] Parse JSON, handling potential formatting issues
      if (responseContent.includes("{") && responseContent.includes("}")) {
        const jsonStart = responseContent.indexOf("{");
        const jsonEnd = responseContent.lastIndexOf("}") + 1;
        const jsonStr = responseContent.substring(jsonStart, jsonEnd);
        analysis = JSON.parse(jsonStr);
      } else {
        // [Analysis] Fallback to text parsing if JSON structure is missing
        analysis = {
          market_impact: "Analysis of market impact unavailable at this time.",
          technical_predictions: ["Prediction data could not be extracted"],
          related_technologies: ["AI"],
          business_implications: "Business implications analysis unavailable at this time."
        };
      }
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      
      // [Analysis] Provide fallback analysis when parsing fails
      analysis = {
        market_impact: "Unable to parse analysis results.",
        technical_predictions: ["Analysis results unavailable"],
        related_technologies: ["AI"],
        business_implications: "Unable to extract business implications at this time."
      };
    }
    
    // [Analysis] Update the article with the analysis results
    try {
      console.log("Updating article with analysis:", { articleId, hasAnalysis: true });
      
      // [Analysis] Update directly to the ai_news table with the analysis data
      const { data: updatedArticle, error: updateError } = await supabaseClient
        .from("ai_news")
        .update({
          has_ai_analysis: true,
          ai_analysis: analysis,
          analysis_date: new Date().toISOString()
        })
        .eq("id", articleId)
        .select();
      
      if (updateError) {
        console.error("Error updating article with analysis:", updateError);
        throw updateError;
      }
      
      console.log("Analysis successfully stored in database");
    } catch (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Database error: ${dbError.message || "Unknown database error"}`);
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Article analyzed successfully",
        analysis: analysis,
        articleId
      }),
      { 
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        } 
      }
    );
  } catch (error) {
    console.error("Error in analyze-article function:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        } 
      }
    );
  }
});
