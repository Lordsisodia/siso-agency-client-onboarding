
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { ToolDetail } from '@/components/tools/ToolDetail';
import { Loader2 } from 'lucide-react';
import { Tool } from '@/components/tools/types';
import { supabase } from '@/integrations/supabase/client';
import { mockTools } from '@/data/mockTools';

export default function ToolPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTool = async () => {
      setLoading(true);
      
      try {
        // First try to find tool in core_tools table
        const { data, error } = await supabase
          .from('core_tools')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          console.warn('Error fetching tool from database:', error);
          // Try to find tool in mock data
          const mockTool = mockTools.find(t => t.id === id);
          if (mockTool) {
            setTool(mockTool);
          } else {
            setError('Tool not found');
          }
        } else {
          setTool(data as Tool);
        }
      } catch (err) {
        console.error('Error fetching tool:', err);
        setError('Failed to load tool details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTool();
    } else {
      setError('Invalid tool ID');
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-siso-orange" />
        </div>
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="text-red-500 mb-4">{error || 'Tool not found'}</div>
          <button 
            onClick={() => navigate('/tools')}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Back to Tools
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <ToolDetail tool={tool} />
      </div>
    </div>
  );
}
