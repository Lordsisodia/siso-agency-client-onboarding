
import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useOnClickOutside } from '@/hooks/use-click-outside';
import { useAuthSession } from '@/hooks/useAuthSession';

// Defined types for search results
interface VideoResult {
  id: string;
  title: string;
  thumbnailUrl: string;
  full_description?: string;
  type: 'video';
}

interface EducatorResult {
  id: string;
  name: string;
  channel_avatar_url?: string;
  description?: string;
  slug: string;
  type: 'educator';
}

interface SearchHistoryItem {
  id: string;
  query: string;
  created_at: string;
  result_type: string;
}

type SearchResult = VideoResult | EducatorResult;

export const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { session } = useAuthSession();
  
  useOnClickOutside(searchRef, () => setShowResults(false));

  // Fetch search history for logged-in users
  useEffect(() => {
    if (!session?.user) return;
    
    const fetchSearchHistory = async () => {
      try {
        const { data, error } = await supabase
          .from('user_search_history')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);
        
        if (error) {
          console.error('Error fetching search history:', error);
          return;
        }
        
        if (data) {
          setSearchHistory(data as SearchHistoryItem[]);
        }
      } catch (error) {
        console.error('Error in search history fetch:', error);
      }
    };

    fetchSearchHistory();
  }, [session]);

  // Handle search
  const handleSearch = async (value: string) => {
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // Search videos
      const { data: videoData, error: videoError } = await supabase
        .from('youtube_videos')
        .select('*')
        .ilike('title', `%${value}%`)
        .limit(3);
        
      if (videoError) {
        console.error('Error searching videos:', videoError);
      }

      // Search educators
      const { data: educatorData, error: educatorError } = await supabase
        .from('education_creators')
        .select('*')
        .ilike('name', `%${value}%`)
        .limit(3);
        
      if (educatorError) {
        console.error('Error searching educators:', educatorError);
      }

      // Format results
      const videos = videoData ? videoData.map(video => ({
        id: video.id,
        title: video.title,
        thumbnailUrl: video.thumbnail_url,
        type: 'video' as const
      })) : [];
      
      const educators = educatorData ? educatorData.map(educator => ({
        id: educator.id,
        name: educator.name,
        channel_avatar_url: educator.channel_avatar_url,
        description: educator.description,
        slug: educator.slug,
        type: 'educator' as const
      })) : [];

      setSearchResults([...videos, ...educators]);

      // Save search to history if user is logged in
      if (session?.user && value.trim().length > 2) {
        await supabase
          .from('user_search_history')
          .insert({
            user_id: session.user.id,
            query: value,
            result_type: 'search'
          });
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        handleSearch(searchQuery);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowResults(true);
  };

  const handleSearchHistoryClick = (query: string) => {
    setSearchQuery(query);
    handleSearch(query);
    setShowResults(true);
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'video') {
      navigate(`/video/${result.id}`);
    } else if (result.type === 'educator') {
      navigate(`/educator/${result.slug}`);
    }
    setShowResults(false);
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search videos and educators..."
          className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-siso-orange/50"
          value={searchQuery}
          onChange={handleSearchInputChange}
          onFocus={() => setShowResults(true)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
      </div>
      
      {showResults && (searchResults.length > 0 || searchHistory.length > 0 || isSearching) && (
        <div className="absolute w-full mt-2 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-gray-400 text-center">Searching...</div>
          ) : (
            <>
              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="p-2">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-2">Results</h3>
                  {searchResults.map(result => (
                    <div 
                      key={`${result.type}-${result.id}`}
                      className="p-2 hover:bg-gray-700 rounded cursor-pointer"
                      onClick={() => handleResultClick(result)}
                    >
                      <div className="flex items-center space-x-3">
                        {result.type === 'video' ? (
                          <img 
                            src={result.thumbnailUrl || '/placeholder.svg'} 
                            alt={result.title}
                            className="w-12 h-8 object-cover rounded"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
                            {result.channel_avatar_url ? (
                              <img 
                                src={result.channel_avatar_url} 
                                alt={result.name}
                                className="w-full h-full object-cover" 
                              />
                            ) : (
                              <span className="text-lg font-bold text-white">
                                {result.name?.charAt(0)}
                              </span>
                            )}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-white">
                            {result.type === 'video' ? result.title : result.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {result.type === 'video' ? 'Video' : 'Educator'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Search History */}
              {searchHistory.length > 0 && !searchQuery && (
                <div className="p-2">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-2">Recent Searches</h3>
                  {searchHistory.map(item => (
                    <div 
                      key={item.id}
                      className="p-2 hover:bg-gray-700 rounded cursor-pointer flex items-center"
                      onClick={() => handleSearchHistoryClick(item.query)}
                    >
                      <Search className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-300">{item.query}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {searchQuery && searchResults.length === 0 && (
                <div className="p-4 text-gray-400 text-center">No results found</div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
