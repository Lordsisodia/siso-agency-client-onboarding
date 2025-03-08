
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// Set up CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// OpenAI API for advanced analysis
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

// Main function to serve requests
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get URL from request
    const { url } = await req.json();
    
    if (!url) {
      throw new Error('URL is required');
    }

    console.log(`Starting analysis of website: ${url}`);
    
    // Validate URL format
    let validatedUrl: string;
    try {
      const urlObj = new URL(url);
      // Ensure protocol is http or https
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        validatedUrl = 'https://' + url;
      } else {
        validatedUrl = url;
      }
    } catch (e) {
      // If URL is invalid, try adding https://
      validatedUrl = 'https://' + url;
    }

    // Fetch website
    console.log(`Fetching website: ${validatedUrl}`);
    let text = '';
    try {
      const response = await fetch(validatedUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; CompanyInfoBot/1.0; +https://aisoapps.io)',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch website: ${response.status} ${response.statusText}`);
      }
      
      text = await response.text();
      console.log(`Successfully fetched website (${text.length} characters)`);
    } catch (error) {
      console.error(`Error fetching website: ${error.message}`);
      throw new Error(`Failed to fetch website: ${error.message}`);
    }

    // Extract initial information using regex patterns
    const extractionResults = {
      title: extractTitle(text),
      metaDescription: extractMetaDescription(text),
      emails: extractEmails(text),
      phones: extractPhones(text),
      socialLinks: extractSocialLinks(text, validatedUrl),
    };

    console.log('Initial extraction results:', extractionResults);

    // Use OpenAI for more detailed analysis if API key is available
    if (OPENAI_API_KEY) {
      console.log('Using OpenAI to analyze website content');
      const openAIAnalysis = await analyzeWithOpenAI(text, validatedUrl);
      
      // Return combined results
      return new Response(JSON.stringify({
        success: true,
        url: validatedUrl,
        basicExtraction: extractionResults,
        aiAnalysis: openAIAnalysis,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      console.log('OpenAI API key not available, returning basic extraction only');
      // Return basic extraction results if OpenAI key is not available
      return new Response(JSON.stringify({
        success: true,
        url: validatedUrl,
        basicExtraction: extractionResults,
        aiAnalysis: null,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error analyzing website:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Helper function to extract title
function extractTitle(html: string): string {
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  return titleMatch ? titleMatch[1].trim() : '';
}

// Helper function to extract meta description
function extractMetaDescription(html: string): string {
  const metaMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  return metaMatch ? metaMatch[1].trim() : '';
}

// Helper function to extract emails
function extractEmails(html: string): string[] {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const emails = html.match(emailRegex) || [];
  // Filter out common false positives and duplicates
  return [...new Set(emails.filter(email => 
    !email.includes('example.com') && 
    !email.includes('yourdomain') &&
    !email.includes('domain.com')
  ))];
}

// Helper function to extract phone numbers
function extractPhones(html: string): string[] {
  // This regex is simplified and may need improvement for global phone formats
  const phoneRegex = /(?:\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  const phones = html.match(phoneRegex) || [];
  return [...new Set(phones)];
}

// Helper function to extract social media links
function extractSocialLinks(html: string, baseUrl: string): Record<string, string> {
  const socialPlatforms = {
    facebook: /facebook\.com\/[a-zA-Z0-9._%+-]+/g,
    twitter: /twitter\.com\/[a-zA-Z0-9_]+/g,
    linkedin: /linkedin\.com\/(?:company\/[a-zA-Z0-9_-]+|in\/[a-zA-Z0-9_-]+)/g,
    instagram: /instagram\.com\/[a-zA-Z0-9_]+/g,
    youtube: /youtube\.com\/(?:user\/|channel\/)?[a-zA-Z0-9_-]+/g,
  };
  
  const results: Record<string, string> = {};
  
  for (const [platform, regex] of Object.entries(socialPlatforms)) {
    const matches = html.match(regex);
    if (matches && matches.length > 0) {
      // Use the first match and ensure it's a full URL
      let url = matches[0];
      if (!url.startsWith('http')) {
        url = 'https://' + url;
      }
      results[platform] = url;
    }
  }
  
  return results;
}

// Function to analyze website content using OpenAI
async function analyzeWithOpenAI(html: string, url: string) {
  try {
    // Clean HTML to extract main text content
    const textContent = extractTextFromHtml(html);
    
    // Prepare a subset of the content if it's too large
    // OpenAI has token limits, so we need to truncate long content
    const truncatedContent = textContent.slice(0, 5000);
    
    const prompt = `
    I need you to analyze website content for a business. The content is from ${url}.
    Extract the following information:
    
    1. Company name
    2. Industry/sector
    3. Products or services offered
    4. Target audience
    5. Value proposition
    6. Company description
    
    If you can't determine any of these items with confidence, indicate that with "Unknown".
    Format your response as a JSON object with these fields.
    
    Here's the website content:
    ${truncatedContent}
    `;
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',  // Using the more affordable model
        messages: [
          { role: 'system', content: 'You are a website analyzer tasked with extracting business information.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,  // Lower temperature for more deterministic results
      }),
    });
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }
    
    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    // Try to parse JSON from the response
    try {
      // First try direct parsing
      return JSON.parse(aiResponse);
    } catch (e) {
      // If direct parsing fails, try to extract JSON from the text
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        // If all parsing fails, return the text response
        return { raw: aiResponse };
      }
    }
  } catch (error) {
    console.error('Error in OpenAI analysis:', error);
    return { error: error.message };
  }
}

// Helper function to extract text from HTML
function extractTextFromHtml(html: string): string {
  // Basic text extraction - in a production environment, use a proper HTML parser
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')  // Remove scripts
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')     // Remove styles
    .replace(/<[^>]+>/g, ' ')                                             // Remove HTML tags
    .replace(/\s+/g, ' ')                                                 // Normalize whitespace
    .trim();
}
