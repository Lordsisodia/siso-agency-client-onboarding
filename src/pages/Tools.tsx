
import { useState, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tool } from '@/components/tools/types';
import { Sidebar } from '@/components/Sidebar';
import { toast } from 'react-hot-toast';
import { ToolsPageHeader } from '@/components/tools/ToolsPageHeader';
import { MainContent } from '@/components/tools/layout/MainContent';
import { ChatAssistant } from '@/components/tools/layout/ChatAssistant';
import { useQuery } from '@tanstack/react-query';

// Fallback mock data for when core_tools table doesn't exist
const mockTools: Tool[] = [
  {
    id: '1',
    name: 'Website Analyzer',
    description: 'Analyze websites to extract key information and insights.',
    category: 'automation',
    pricing_type: 'free',
    rating: 4.8,
    reviews_count: 152,
    downloads_count: 5240,
    likes_count: 423,
    website_url: null,
    profile_image_url: null,
    icon_url: '/lovable-uploads/c7ac43fd-bc3e-478d-8b4f-809beafb6838.png',
    created_at: '2023-09-15T10:30:00Z',
    updated_at: '2023-09-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'AI Plan Builder',
    description: 'Create comprehensive project plans with AI assistance.',
    category: 'development',
    pricing_type: 'free',
    rating: 4.9,
    reviews_count: 203,
    downloads_count: 7320,
    likes_count: 612,
    website_url: null,
    profile_image_url: null,
    icon_url: '/lovable-uploads/1f9eba1e-c2af-4ed8-84e7-a375872c9182.png',
    created_at: '2023-08-22T14:15:00Z',
    updated_at: '2023-08-22T14:15:00Z'
  },
  {
    id: '3',
    name: 'Database Helper',
    description: 'Simplify database operations and queries.',
    category: 'database',
    pricing_type: 'freemium',
    rating: 4.6,
    reviews_count: 118,
    downloads_count: 4150,
    likes_count: 380,
    website_url: null,
    profile_image_url: null,
    icon_url: '/lovable-uploads/8e5ff417-0826-4bc1-8afb-09cc8b6912c4.png',
    created_at: '2023-10-05T09:45:00Z',
    updated_at: '2023-10-05T09:45:00Z'
  },
];

export default function Tools() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('rating');

  const categories = useMemo(() => [
    { id: 'all', label: 'All Tools' },
    { id: 'featured', label: 'Featured' },
    { id: 'development', label: 'Development' },
    { id: 'database', label: 'Database' },
    { id: 'automation', label: 'Automation' },
    { id: 'GPT Builder', label: 'GPT Builder' },
  ], []);

  const { data: tools, isLoading, error } = useQuery({
    queryKey: ['tools'],
    queryFn: async () => {
      console.log('Fetching tools...');
      
      try {
        // First try to fetch from core_tools if it exists
        const { data, error } = await supabase
          .from('core_tools')
          .select('*');
          
        if (error) {
          console.warn('Error fetching from core_tools, using mock data:', error);
          return mockTools;
        }
        
        if (data.length === 0) {
          console.log('No tools found in database, using mock data');
          return mockTools;
        }
        
        return data as Tool[];
      } catch (err) {
        console.error('Error fetching tools:', err);
        toast.error('Failed to load tools. Using sample data.');
        return mockTools;
      }
    },
  });

  const sortTools = (tools: Tool[]) => {
    return [...tools].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'popular':
          return (b.downloads_count || 0) - (a.downloads_count || 0);
        default:
          return 0;
      }
    });
  };

  const filteredTools = useMemo(() => {
    if (!tools) return [];
    
    let filtered = tools.filter(tool => {
      const matchesSearch = !searchQuery || 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'all' || 
        (selectedCategory === 'featured' && tool.rating && tool.rating >= 4.5) ||
        tool.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });

    return sortTools(filtered);
  }, [tools, searchQuery, selectedCategory, sortBy]);

  const categoryStats = useMemo(() => {
    if (!tools) return {};
    return categories.reduce((acc, category) => {
      acc[category.label] = tools.filter(tool => 
        category.id === 'all' ? true : 
        category.id === 'featured' ? (tool.rating && tool.rating >= 4.5) :
        tool.category.toLowerCase() === category.id.toLowerCase()
      ).length;
      return acc;
    }, {} as { [key: string]: number });
  }, [tools, categories]);

  if (error) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="p-8">
          <div className="text-red-500">
            Failed to load tools. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <ToolsPageHeader 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalTools={tools?.length}
          categoryStats={categoryStats}
        />

        <MainContent 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          filteredTools={filteredTools}
          isLoading={isLoading}
          categoryStats={categoryStats}
        />

        <ChatAssistant />
      </div>
    </div>
  );
}
