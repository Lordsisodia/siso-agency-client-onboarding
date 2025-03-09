
export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  full_description?: string; // Database field
  image: string;
  gallery: string[];
  tags: string[];
  features: string[];
  technologies: string[];
  client: string;
  date: string;
  duration: string;
  challenge: string;
  solution: string;
  results: string;
  testimonial?: {
    text: string;
    author: string;
    company: string;
  };
  featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export type SortOption = 'newest' | 'oldest' | 'alphabetical' | 'reverseAlphabetical';
