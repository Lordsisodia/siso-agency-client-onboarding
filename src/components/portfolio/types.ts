
export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
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
}

export type SortOption = 'newest' | 'oldest' | 'alphabetical' | 'reverseAlphabetical';
