
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { corsHeaders } from "../_shared/cors.ts";

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const SERPER_API_KEY = Deno.env.get('SERPER_API_KEY');

interface AnalysisRequest {
  url: string;
  companyName?: string;
  socialLinks?: Record<string, string>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url, companyName, socialLinks } = await req.json() as AnalysisRequest;
    
    if (!url && !companyName && (!socialLinks || Object.keys(socialLinks).length === 0)) {
      return new Response(
        JSON.stringify({ error: 'Either a website URL, company name, or social links must be provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Analyzing data for: ${url || companyName}`);
    
    // Extract domain from URL
    let domain = '';
    let extractedCompanyName = companyName;
    
    if (url) {
      try {
        // Add protocol if missing
        const fullUrl = url.startsWith('http') ? url : `https://${url}`;
        const urlObj = new URL(fullUrl);
        domain = urlObj.hostname.replace(/^www\./, '');
        
        // If company name wasn't provided, try to extract it from domain
        if (!extractedCompanyName) {
          extractedCompanyName = domain.split('.')[0];
          // Convert to title case
          extractedCompanyName = extractedCompanyName
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        }
      } catch (error) {
        console.error('Error parsing URL:', error);
      }
    }

    // Step 1: Perform web search about the company or website
    let searchResults = [];
    if (domain || extractedCompanyName) {
      const searchQuery = domain || extractedCompanyName;
      console.log(`Performing web search for: ${searchQuery}`);
      
      try {
        const searchResponse = await fetch('https://google.serper.dev/search', {
          method: 'POST',
          headers: {
            'X-API-KEY': SERPER_API_KEY || '',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            q: `${searchQuery} company information`,
            num: 5
          })
        });
        
        if (searchResponse.ok) {
          const searchData = await searchResponse.json();
          searchResults = searchData.organic || [];
          console.log(`Found ${searchResults.length} search results`);
        } else {
          console.error('Search API error:', await searchResponse.text());
        }
      } catch (error) {
        console.error('Error during web search:', error);
      }
    }

    // Extract relevant information from search results
    const relevantInfo = searchResults.map((result: any) => ({
      title: result.title,
      snippet: result.snippet,
      link: result.link
    }));

    // Step 2: Analyze social media links if provided
    let socialMediaAnalysis = null;
    if (socialLinks && Object.keys(socialLinks).filter(k => socialLinks[k]).length > 0) {
      console.log('Analyzing social media links');
      
      // Format social links for analysis
      const socialLinksFormatted = Object.entries(socialLinks)
        .filter(([_, value]) => value)
        .map(([platform, link]) => `${platform}: ${link}`)
        .join('\n');
      
      socialMediaAnalysis = {
        platforms: Object.keys(socialLinks).filter(k => socialLinks[k]),
        links: socialLinks
      };
    }

    // Step 3: Use OpenAI to analyze all gathered information
    console.log('Calling OpenAI API to analyze data');
    
    const systemPrompt = `
    You are a business analyst specialized in extracting and organizing company information.
    Analyze the provided website, company name, search results, and social media links to extract structured information.
    Provide insights, but stick strictly to the facts you can verify from the provided data.
    `;

    const userPrompt = `
    I need a comprehensive analysis of a company with the following information:
    ${url ? `- Website URL: ${url}` : ''}
    ${extractedCompanyName ? `- Company Name: ${extractedCompanyName}` : ''}
    ${relevantInfo.length > 0 ? `- Search Results:\n${JSON.stringify(relevantInfo, null, 2)}` : ''}
    ${socialMediaAnalysis ? `- Social Media Profiles:\n${JSON.stringify(socialMediaAnalysis, null, 2)}` : ''}
    
    Extract as much structured information as possible.
    `;

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        input: userPrompt,
        context: {
          messages: [
            { role: "system", content: systemPrompt }
          ]
        },
        tools: [{ type: "web_search_preview" }],
        reasoning: {
          effort: "high"
        },
        format: {
          type: "json_schema",
          schema: {
            type: "object",
            properties: {
              company: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                  industry: { type: "string" },
                  founded: { type: "string" },
                  size: { type: "string" },
                  location: { type: "string" },
                  website: { type: "string" }
                },
                required: ["name", "description", "industry", "founded", "size", "location", "website"],
                additionalProperties: false
              },
              business: {
                type: "object",
                properties: {
                  products: { 
                    type: "array", 
                    items: { type: "string" } 
                  },
                  services: { 
                    type: "array", 
                    items: { type: "string" } 
                  },
                  target_audience: { type: "string" },
                  value_proposition: { type: "string" },
                  competitors: { 
                    type: "array", 
                    items: { type: "string" } 
                  }
                },
                required: ["products", "services", "target_audience", "value_proposition", "competitors"],
                additionalProperties: false
              },
              online_presence: {
                type: "object",
                properties: {
                  social_media: { 
                    type: "array", 
                    items: { 
                      type: "object",
                      properties: {
                        platform: { type: "string" },
                        url: { type: "string" },
                        activity_level: { type: "string" }
                      },
                      required: ["platform", "url", "activity_level"],
                      additionalProperties: false
                    } 
                  },
                  content_types: { 
                    type: "array", 
                    items: { type: "string" } 
                  }
                },
                required: ["social_media", "content_types"],
                additionalProperties: false
              },
              application_recommendations: {
                type: "object",
                properties: {
                  suggested_features: { 
                    type: "array", 
                    items: { 
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        description: { type: "string" },
                        priority: { type: "string" }
                      },
                      required: ["name", "description", "priority"],
                      additionalProperties: false
                    } 
                  },
                  design_recommendations: { 
                    type: "array", 
                    items: { type: "string" } 
                  },
                  integration_suggestions: { 
                    type: "array", 
                    items: { type: "string" } 
                  }
                },
                required: ["suggested_features", "design_recommendations", "integration_suggestions"],
                additionalProperties: false
              },
              confidence_score: { type: "number" },
              data_sources: { 
                type: "array", 
                items: { type: "string" } 
              }
            },
            required: ["company", "business", "online_presence", "application_recommendations", "confidence_score", "data_sources"],
            additionalProperties: false
          }
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${errorText}`);
    }

    const analysisResult = await response.json();
    console.log('Analysis completed successfully');
    
    // Return the structured analysis
    return new Response(JSON.stringify({
      success: true,
      analysis: analysisResult.content || analysisResult,
      searchResults: relevantInfo.slice(0, 3),
      inputData: {
        url,
        companyName: extractedCompanyName,
        socialLinks
      }
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error in analyze-website function:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Unknown error occurred'
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
