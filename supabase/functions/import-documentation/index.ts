
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { documentationData } from "./staticDocumentation.ts";
import { expandedDocumentationData } from "./expanded-documentation.ts";

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Create a Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to generate a slug from a string
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  
  try {
    console.log("Starting data import...");
    
    // Check if we should use expanded data
    const url = new URL(req.url);
    const useExpanded = url.searchParams.get('expanded') === 'true';
    
    const dataToImport = useExpanded ? expandedDocumentationData : documentationData;
    console.log(`Using ${useExpanded ? 'expanded' : 'standard'} documentation data`);

    // Import all categories first
    for (const categoryData of dataToImport) {
      console.log(`Processing category: ${categoryData.title}`);
      
      // Check if category exists already (by slug)
      const categorySlug = slugify(categoryData.title);
      const { data: existingCategory } = await supabase
        .from('documentation_categories')
        .select('id')
        .eq('slug', categorySlug)
        .maybeSingle();
      
      // Skip if category already exists
      if (existingCategory) {
        console.log(`Category ${categoryData.title} already exists, skipping`);
        continue;
      }
      
      // Insert the category
      const { data: category, error: categoryError } = await supabase
        .from('documentation_categories')
        .insert({
          slug: categorySlug,
          title: categoryData.title,
          description: categoryData.description,
          icon: categoryData.icon.name,
          display_order: dataToImport.indexOf(categoryData) + 1
        })
        .select()
        .single();
      
      if (categoryError) {
        console.error(`Error inserting category ${categoryData.title}:`, categoryError);
        continue;
      }
      
      console.log(`Inserted category: ${category.title} with ID: ${category.id}`);
      
      // Process all articles for this category
      for (const articleData of categoryData.articles) {
        console.log(`Processing article: ${articleData.title}`);
        
        // Insert the article
        const articleSlug = slugify(articleData.title);
        const { data: article, error: articleError } = await supabase
          .from('documentation_articles')
          .insert({
            category_id: category.id,
            slug: articleSlug,
            title: articleData.title,
            excerpt: articleData.excerpt,
            content: articleData.content,
            difficulty: articleData.difficulty,
            display_order: categoryData.articles.indexOf(articleData) + 1,
            last_updated: articleData.lastUpdated || new Date().toISOString()
          })
          .select()
          .single();
        
        if (articleError) {
          console.error(`Error inserting article ${articleData.title}:`, articleError);
          continue;
        }
        
        console.log(`Inserted article: ${article.title} with ID: ${article.id}`);
        
        // Process all sections for this article
        for (const sectionData of articleData.sections) {
          console.log(`Processing section: ${sectionData.title || 'Untitled section'}`);
          
          // Insert the section
          const { data: section, error: sectionError } = await supabase
            .from('documentation_sections')
            .insert({
              article_id: article.id,
              title: sectionData.title,
              display_order: articleData.sections.indexOf(sectionData) + 1
            })
            .select()
            .single();
          
          if (sectionError) {
            console.error(`Error inserting section ${sectionData.title}:`, sectionError);
            continue;
          }
          
          console.log(`Inserted section: ${section.title || 'Untitled section'} with ID: ${section.id}`);
          
          // Process all questions for this section
          for (const questionData of sectionData.questions) {
            console.log(`Processing question: ${questionData.question}`);
            
            // Insert the question
            const questionSlug = slugify(questionData.question);
            const { data: question, error: questionError } = await supabase
              .from('documentation_questions')
              .insert({
                section_id: section.id,
                slug: questionSlug,
                question: questionData.question,
                answer: questionData.answer,
                display_order: sectionData.questions.indexOf(questionData) + 1
              })
              .select()
              .single();
            
            if (questionError) {
              console.error(`Error inserting question ${questionData.question}:`, questionError);
              continue;
            }
            
            console.log(`Inserted question: ${question.question} with ID: ${question.id}`);
          }
        }
      }
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Documentation data imported successfully",
        expanded: useExpanded
      }), 
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error("Error importing documentation data:", error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
