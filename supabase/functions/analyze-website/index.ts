
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

interface AnalyzeWebsiteRequest {
  url: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { url } = await req.json() as AnalyzeWebsiteRequest;

    if (!url) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "URL is required" 
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log(`Analyzing website: ${url}`);

    try {
      // Fetch the website content
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SisoWebsiteAnalyzer/1.0)'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch website: ${response.status} ${response.statusText}`);
      }

      const html = await response.text();
      
      // Basic extraction
      const basicExtraction = {
        title: extractTitle(html),
        description: extractDescription(html),
        emails: extractEmails(html),
        phones: extractPhones(html),
        colors: extractColors(html),
        socialLinks: extractSocialLinks(html, url),
      };

      // AI analysis of the content would normally go here
      // For now, we'll do some basic heuristics to extract information
      const aiAnalysis = {
        companyName: extractCompanyName(html, url),
        industry: inferIndustry(html),
        companyDescription: extractDescription(html) || inferDescription(html),
        location: extractLocation(html),
        productsOrServices: inferProductsOrServices(html),
        yearFounded: inferYearFounded(html),
      };

      return new Response(
        JSON.stringify({
          success: true,
          url,
          basicExtraction,
          aiAnalysis,
        }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    } catch (error) {
      console.error(`Error analyzing website: ${error.message}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Failed to analyze website: ${error.message}` 
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
  } catch (error) {
    console.error(`Error processing request: ${error.message}`);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: `Internal server error: ${error.message}` 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});

// Helper functions for extracting information from HTML
function extractTitle(html: string): string | null {
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  return titleMatch ? titleMatch[1].trim() : null;
}

function extractDescription(html: string): string | null {
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["'][^>]*>/i) ||
                   html.match(/<meta[^>]*content=["'](.*?)["'][^>]*name=["']description["'][^>]*>/i);
  return descMatch ? descMatch[1].trim() : null;
}

function extractEmails(html: string): string[] {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  return [...new Set(html.match(emailRegex) || [])];
}

function extractPhones(html: string): string[] {
  // This is a simplified regex for phone numbers
  const phoneRegex = /(?:\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  return [...new Set(html.match(phoneRegex) || [])];
}

function extractColors(html: string): string[] {
  // Extract color codes from CSS in the HTML
  const hexColorRegex = /#([0-9a-f]{3}){1,2}\b/gi;
  const rgbColorRegex = /rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/gi;
  
  const hexColors = html.match(hexColorRegex) || [];
  const rgbColors = html.match(rgbColorRegex) || [];
  
  // Combine and deduplicate
  return [...new Set([...hexColors, ...rgbColors])].slice(0, 5);
}

function extractSocialLinks(html: string, baseUrl: string): Record<string, string> {
  const socialPatterns = {
    facebook: /(?:https?:)?\/\/(?:www\.)?facebook\.com\/[a-zA-Z0-9.]+/g,
    twitter: /(?:https?:)?\/\/(?:www\.)?twitter\.com\/[a-zA-Z0-9_]+/g,
    instagram: /(?:https?:)?\/\/(?:www\.)?instagram\.com\/[a-zA-Z0-9_.]+/g,
    linkedin: /(?:https?:)?\/\/(?:www\.)?linkedin\.com\/(?:company|in)\/[a-zA-Z0-9_-]+/g,
    youtube: /(?:https?:)?\/\/(?:www\.)?youtube\.com\/(?:user|channel)\/[a-zA-Z0-9_-]+/g,
  };

  const result: Record<string, string> = {};
  
  for (const [platform, pattern] of Object.entries(socialPatterns)) {
    const matches = html.match(pattern);
    if (matches && matches.length > 0) {
      result[platform] = matches[0];
    }
  }
  
  return result;
}

function extractCompanyName(html: string, url: string): string | null {
  // Try to extract from OpenGraph metadata first
  const ogSiteNameMatch = html.match(/<meta[^>]*property=["']og:site_name["'][^>]*content=["'](.*?)["'][^>]*>/i);
  if (ogSiteNameMatch) return ogSiteNameMatch[1].trim();
  
  // Try to extract from title
  const titleMatch = extractTitle(html);
  if (titleMatch) {
    // Remove common suffixes like "Home", "Welcome", etc.
    return titleMatch.replace(/\s*[-|]\s*.+$/, '').trim();
  }
  
  // Extract from URL domain
  try {
    const domain = new URL(url).hostname;
    return domain.replace(/^www\./, '').split('.')[0];
  } catch {
    return null;
  }
}

function inferIndustry(html: string): string | null {
  const lowerHtml = html.toLowerCase();
  
  const industries = [
    { name: "Technology", keywords: ["software", "tech", "technology", "digital", "app", "computer"] },
    { name: "Marketing", keywords: ["marketing", "advertising", "agency", "branding", "campaign"] },
    { name: "Finance", keywords: ["finance", "financial", "banking", "investment", "insurance"] },
    { name: "Healthcare", keywords: ["health", "healthcare", "medical", "doctor", "hospital", "clinic"] },
    { name: "Education", keywords: ["education", "school", "university", "college", "learning", "teaching"] },
    { name: "Real Estate", keywords: ["real estate", "property", "housing", "apartment", "home"] },
    { name: "Retail", keywords: ["retail", "shop", "store", "ecommerce", "product"] },
    { name: "Manufacturing", keywords: ["manufacturing", "factory", "production", "industrial"] },
    { name: "Hospitality", keywords: ["hospitality", "hotel", "restaurant", "travel", "tourism"] },
  ];
  
  // Count occurrences of keywords for each industry
  const counts = industries.map(industry => ({
    industry: industry.name,
    count: industry.keywords.reduce((sum, keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const matches = lowerHtml.match(regex);
      return sum + (matches ? matches.length : 0);
    }, 0)
  }));
  
  // Sort by count and return the top match if any
  counts.sort((a, b) => b.count - a.count);
  return counts[0]?.count > 0 ? counts[0].industry : null;
}

function inferDescription(html: string): string | null {
  // Extract the first paragraph that's likely to be a description
  const paragraphMatch = html.match(/<p[^>]*>(.*?)<\/p>/i);
  if (paragraphMatch) {
    const text = paragraphMatch[1].replace(/<[^>]+>/g, '').trim();
    if (text.length > 20) return text;
  }
  
  return null;
}

function extractLocation(html: string): string | null {
  // Try to find common location patterns
  const addressRegex = /(?:address|location)[\s\n]*:[\s\n]*([^<]+)/i;
  const addressMatch = html.match(addressRegex);
  
  if (addressMatch) {
    return addressMatch[1].trim();
  }
  
  return null;
}

function inferProductsOrServices(html: string): string | null {
  const lowerHtml = html.toLowerCase();
  
  // Check for service sections
  const serviceKeywords = ["service", "product", "solution", "offering"];
  
  for (const keyword of serviceKeywords) {
    const regex = new RegExp(`<h[2-4][^>]*>.*?${keyword}.*?</h[2-4]>`, 'i');
    const match = html.match(regex);
    
    if (match) {
      // Find the next paragraph or list
      const index = html.indexOf(match[0]) + match[0].length;
      const nextSection = html.substring(index, index + 500);
      
      // Extract text from lists
      const listMatch = nextSection.match(/<li[^>]*>(.*?)<\/li>/i);
      if (listMatch) {
        return listMatch[1].replace(/<[^>]+>/g, '').trim();
      }
      
      // Extract from paragraph
      const paragraphMatch = nextSection.match(/<p[^>]*>(.*?)<\/p>/i);
      if (paragraphMatch) {
        return paragraphMatch[1].replace(/<[^>]+>/g, '').trim();
      }
    }
  }
  
  return null;
}

function inferYearFounded(html: string): number | null {
  // Look for common founding year patterns
  const foundedRegex = /(?:founded|established|since|est\.?)(?:\s+in)?(?:\s+the)?(?:\s+year)?\s+(\d{4})/i;
  const foundedMatch = html.match(foundedRegex);
  
  if (foundedMatch) {
    const year = parseInt(foundedMatch[1]);
    const currentYear = new Date().getFullYear();
    
    // Validate the year is reasonable
    if (year >= 1800 && year <= currentYear) {
      return year;
    }
  }
  
  return null;
}
