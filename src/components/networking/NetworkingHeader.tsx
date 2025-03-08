
import { Search, Users, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useHotkeys } from 'react-hotkeys-hook';

interface NetworkingHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const NetworkingHeader = ({ searchQuery, setSearchQuery }: NetworkingHeaderProps) => {
  // [Analysis] Using React Query for real-time stats with automatic background updates
  const { data: stats } = useQuery({
    queryKey: ['networking-stats'],
    queryFn: async () => {
      const { data: categoryStats, error: categoryError } = await supabase
        .from('category_stats')
        .select('*');
      
      if (categoryError) throw categoryError;
      
      const totalCommunities = categoryStats.reduce((sum, stat) => sum + stat.community_count, 0);
      const totalMembers = categoryStats.reduce((sum, stat) => sum + stat.total_members, 0);
      
      return { totalCommunities, totalMembers };
    }
  });

  // [Analysis] Add keyboard shortcut for search focus
  useHotkeys('mod+k', (event) => {
    event.preventDefault();
    const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
    }
  });

  return (
    <div className="space-y-8 px-8 py-10">
      {/* Title Section */}
      <motion.div 
        className="text-center space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-siso-red to-siso-orange text-transparent bg-clip-text tracking-tight leading-tight">
          SISO Networking Hub
        </h1>
        <p className="text-siso-text/80 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
          Connect with other professionals and join thriving communities
        </p>
      </motion.div>

      {/* Stats Display */}
      {stats && (
        <motion.div 
          className="flex justify-center gap-10 py-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 px-5 py-3 rounded-lg bg-siso-text/5 hover:bg-siso-text/10 transition-all duration-300">
            <Globe className="w-5 h-5 text-siso-orange" />
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold text-siso-text-bold tracking-tight">
                {stats.totalCommunities.toLocaleString()}
              </span>
              <span className="text-sm text-siso-text/70 font-medium">Communities</span>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-lg bg-siso-text/5 hover:bg-siso-text/10 transition-all duration-300">
            <Users className="w-5 h-5 text-siso-orange" />
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold text-siso-text-bold tracking-tight">
                {stats.totalMembers.toLocaleString()}
              </span>
              <span className="text-sm text-siso-text/70 font-medium">Members</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Search Section */}
      <motion.div 
        className="relative w-full max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="relative group">
          <Input
            type="text"
            placeholder="Search communities... (⌘K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 pl-12 pr-24 bg-gradient-to-r from-siso-text/5 to-siso-text/10 
              border border-siso-text/10 rounded-xl text-base font-medium
              focus:ring-2 focus:ring-siso-orange/30 focus:border-siso-orange/50
              hover:border-siso-text/20 hover:bg-siso-text/10
              transition-all duration-300 backdrop-blur-sm tracking-wide"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-siso-text/50 
            group-hover:text-siso-text/70 transition-colors" />
        </div>
      </motion.div>
    </div>
  );
};
