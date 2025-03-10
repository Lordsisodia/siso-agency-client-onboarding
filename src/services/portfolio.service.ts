
import { supabase } from "@/integrations/supabase/client";
import { Project, SortOption } from "@/components/portfolio/types";
import { toast } from "sonner";

export interface FetchProjectsOptions {
  featured?: boolean;
  tags?: string[];
  searchQuery?: string;
  sortOption?: SortOption;
}

// Fetch all projects with options for filtering and sorting
export async function fetchProjects(options: FetchProjectsOptions = {}) {
  try {
    let query = supabase
      .from('portfolio_projects')
      .select('*');
    
    // Filter by featured status if specified
    if (options.featured !== undefined) {
      query = query.eq('featured', options.featured);
    }
    
    // Filter by tags if specified
    if (options.tags && options.tags.length > 0) {
      query = query.contains('tags', options.tags);
    }
    
    // Filter by search query if specified
    if (options.searchQuery) {
      const searchTerm = options.searchQuery.toLowerCase();
      query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
    }
    
    // Apply sorting
    if (options.sortOption) {
      switch(options.sortOption) {
        case 'newest':
          query = query.order('date', { ascending: false });
          break;
        case 'oldest':
          query = query.order('date', { ascending: true });
          break;
        case 'alphabetical':
          query = query.order('title', { ascending: true });
          break;
        case 'reverseAlphabetical':
          query = query.order('title', { ascending: false });
          break;
      }
    } else {
      // Default sorting (newest first)
      query = query.order('date', { ascending: false });
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
      return [];
    }
    
    return data as Project[];
  } catch (error) {
    console.error('Unexpected error fetching projects:', error);
    toast.error('An unexpected error occurred while loading projects');
    return [];
  }
}

// Fetch a single project by ID
export async function fetchProjectById(id: string) {
  try {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching project:', error);
      toast.error('Failed to load project details');
      return null;
    }
    
    return data as Project;
  } catch (error) {
    console.error('Unexpected error fetching project:', error);
    toast.error('An unexpected error occurred while loading project details');
    return null;
  }
}

// Fetch all categories
export async function fetchCategories() {
  try {
    const { data, error } = await supabase
      .from('portfolio_categories')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Unexpected error fetching categories:', error);
    toast.error('An unexpected error occurred while loading categories');
    return [];
  }
}

// Create or update a project (for admin use)
export async function saveProject(project: Partial<Project> & { id?: string }) {
  try {
    let result;
    
    if (project.id) {
      // Update existing project
      const updateData: any = {
        title: project.title,
        description: project.description,
        full_description: project.fullDescription || project.full_description,
        image: project.image,
        gallery: project.gallery,
        tags: project.tags,
        features: project.features,
        technologies: project.technologies,
        client: project.client,
        date: project.date,
        duration: project.duration,
        challenge: project.challenge,
        solution: project.solution,
        results: project.results,
        testimonial: project.testimonial,
        featured: project.featured
      };
      
      // Remove undefined values
      Object.keys(updateData).forEach(key => {
        if (updateData[key] === undefined) delete updateData[key];
      });
      
      result = await supabase
        .from('portfolio_projects')
        .update(updateData)
        .eq('id', project.id)
        .select()
        .single();
    } else {
      // Prepare insert data with defaults for required fields
      const insertData: any = {
        title: project.title || 'New Project',
        description: project.description || '',
        full_description: project.fullDescription || project.full_description || '',
        image: project.image || '',
        gallery: project.gallery || [],
        tags: project.tags || [],
        features: project.features || [],
        technologies: project.technologies || [],
        client: project.client || 'Client Name',
        date: project.date || new Date().toISOString().split('T')[0],
        duration: project.duration || '1 month',
        challenge: project.challenge || '',
        solution: project.solution || '',
        results: project.results || '',
        testimonial: project.testimonial || null,
        featured: project.featured || false
      };
      
      result = await supabase
        .from('portfolio_projects')
        .insert(insertData)
        .select()
        .single();
    }
    
    const { data, error } = result;
    
    if (error) {
      console.error('Error saving project:', error);
      toast.error(project.id ? 'Failed to update project' : 'Failed to create project');
      return null;
    }
    
    toast.success(project.id ? 'Project updated successfully' : 'Project created successfully');
    return data as Project;
  } catch (error) {
    console.error('Unexpected error saving project:', error);
    toast.error('An unexpected error occurred while saving project');
    return null;
  }
}

// Delete a project (for admin use)
export async function deleteProject(id: string) {
  try {
    const { error } = await supabase
      .from('portfolio_projects')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
      return false;
    }
    
    toast.success('Project deleted successfully');
    return true;
  } catch (error) {
    console.error('Unexpected error deleting project:', error);
    toast.error('An unexpected error occurred while deleting project');
    return false;
  }
}
