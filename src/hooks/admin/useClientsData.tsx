
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Client, ClientSort, SortDirection, ClientFilter } from '@/types/admin';

export const useClientsData = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<ClientSort>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [filters, setFilters] = useState<ClientFilter>({});
  const { toast } = useToast();

  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('clients')
        .select('*');

      // Apply filters
      if (filters.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }
      
      if (filters.status && filters.status.length > 0) {
        query = query.in('status', filters.status);
      }
      
      if (filters.industry && filters.industry.length > 0) {
        query = query.in('industry', filters.industry);
      }

      // Apply sorting
      query = query.order(sortBy, { ascending: sortDirection === 'asc' });

      const { data, error } = await query;

      if (error) throw error;
      
      setClients(data || []);
    } catch (err: any) {
      console.error('Error fetching clients:', err);
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to load clients: ${err.message}`,
      });
    } finally {
      setLoading(false);
    }
  }, [sortBy, sortDirection, filters, toast]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const addClient = async (clientData: Omit<Client, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('clients')
        .insert([{ ...clientData, created_by: userData.user.id }])
        .select();

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Client has been added successfully",
      });
      
      await fetchClients();
      return data[0];
    } catch (err: any) {
      console.error('Error adding client:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to add client: ${err.message}`,
      });
      throw err;
    }
  };

  const updateClient = async (id: string, updates: Partial<Client>) => {
    try {
      const { error } = await supabase
        .from('clients')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Client has been updated successfully",
      });
      
      await fetchClients();
    } catch (err: any) {
      console.error('Error updating client:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to update client: ${err.message}`,
      });
      throw err;
    }
  };

  const deleteClient = async (id: string) => {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Client has been deleted successfully",
      });
      
      await fetchClients();
    } catch (err: any) {
      console.error('Error deleting client:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to delete client: ${err.message}`,
      });
      throw err;
    }
  };

  return {
    clients,
    loading,
    error,
    sortBy,
    sortDirection,
    filters,
    setSortBy,
    setSortDirection,
    setFilters,
    fetchClients,
    addClient,
    updateClient,
    deleteClient
  };
};
