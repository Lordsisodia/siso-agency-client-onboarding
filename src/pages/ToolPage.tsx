
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { ToolDetail } from '@/components/tools/ToolDetail';
import { Tool } from '@/components/tools/types';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ToolPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTool = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('core_tools')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Cast to Tool type
          setTool(data as unknown as Tool);
        } else {
          toast({
            title: "Tool not found",
            description: "The requested tool could not be found.",
            variant: "destructive"
          });
          navigate('/tools');
        }
      } catch (error) {
        console.error('Error fetching tool:', error);
        toast({
          title: "Error",
          description: "Failed to load tool details. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchTool();
  }, [id, navigate, toast]);

  const handleClose = () => {
    navigate('/tools');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#121212]">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        {loading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-siso-red" />
          </div>
        ) : tool ? (
          <ToolDetail tool={tool} onClose={handleClose} />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-xl text-muted-foreground">Tool not found</p>
          </div>
        )}
      </main>
    </div>
  );
}
