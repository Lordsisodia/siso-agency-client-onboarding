
import { useState, useEffect } from 'react';
import { useAssistants } from './useAssistants';
import { Assistant } from '../types';

export const useFilteredAssistants = (category?: string, searchQuery?: string) => {
  const { assistants, loading, error } = useAssistants();
  const [filteredAssistants, setFilteredAssistants] = useState<Assistant[]>([]);

  useEffect(() => {
    if (assistants.length) {
      let filtered = [...assistants];

      // Filter by category if provided
      if (category && category !== 'all') {
        filtered = filtered.filter(assistant => 
          assistant.category?.toLowerCase() === category.toLowerCase()
        );
      }

      // Filter by search query if provided
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(assistant =>
          assistant.name?.toLowerCase().includes(query) ||
          assistant.description?.toLowerCase().includes(query)
        );
      }

      setFilteredAssistants(filtered);
    } else {
      setFilteredAssistants([]);
    }
  }, [assistants, category, searchQuery]);

  return { 
    assistants: filteredAssistants, 
    loading, 
    error 
  };
};
