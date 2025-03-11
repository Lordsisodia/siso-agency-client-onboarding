
import { useState, useEffect, useMemo } from 'react';
import { useAssistants } from './useAssistants';
import { Assistant } from '../types';

export const useFilteredAssistants = (searchQuery: string, category?: string) => {
  const { assistants, loading, error } = useAssistants();
  const [filteredAssistants, setFilteredAssistants] = useState<Assistant[]>([]);

  const filterAssistants = useMemo(() => {
    return (assistants: Assistant[], search: string, category?: string) => {
      return assistants.filter(assistant => {
        // Filter by search query
        const matchesSearch = search === '' || 
          (assistant.name && assistant.name.toLowerCase().includes(search.toLowerCase())) ||
          (assistant.description && assistant.description.toString().toLowerCase().includes(search.toLowerCase()));
        
        // Filter by category
        const matchesCategory = !category || 
          (assistant.category && assistant.category.toString().toLowerCase() === category.toLowerCase());
        
        return matchesSearch && matchesCategory;
      });
    };
  }, []);

  useEffect(() => {
    setFilteredAssistants(filterAssistants(assistants, searchQuery, category));
  }, [assistants, searchQuery, category, filterAssistants]);

  return {
    assistants: filteredAssistants,
    isLoading: loading,
    error
  };
};
