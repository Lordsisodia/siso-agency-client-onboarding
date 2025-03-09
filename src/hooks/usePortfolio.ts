
import { useState, useEffect, useCallback } from 'react';
import { Project, SortOption } from '@/components/portfolio/types';
import { fetchProjects, FetchProjectsOptions } from '@/services/portfolio.service';

export function usePortfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  
  // Load initial projects
  const loadProjects = useCallback(async (options: FetchProjectsOptions = {}) => {
    setLoading(true);
    try {
      const data = await fetchProjects(options);
      setProjects(data);
      setFilteredProjects(data);
      setError(null);
    } catch (err) {
      console.error('Error loading projects:', err);
      setError('Failed to load projects. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Load initial data
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);
  
  // Apply client-side filtering when filters change
  useEffect(() => {
    if (projects.length === 0) return;
    
    let result = [...projects];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(project => 
        project.title.toLowerCase().includes(query) || 
        project.description.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply category filters
    if (activeFilters.length > 0) {
      result = result.filter(project => 
        project.tags.some(tag => activeFilters.includes(tag))
      );
    }
    
    // Apply sorting
    switch(sortOption) {
      case 'newest':
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'alphabetical':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'reverseAlphabetical':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
    
    setFilteredProjects(result);
  }, [projects, searchQuery, activeFilters, sortOption]);
  
  // Update filters
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
  };
  
  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setActiveFilters([]);
  };
  
  return {
    projects,
    filteredProjects,
    featuredProjects: projects.filter(p => p.featured),
    loading,
    error,
    searchQuery,
    activeFilters,
    sortOption,
    handleSearchChange,
    handleFilterChange,
    handleSortChange,
    clearFilters,
    refreshProjects: loadProjects
  };
}
