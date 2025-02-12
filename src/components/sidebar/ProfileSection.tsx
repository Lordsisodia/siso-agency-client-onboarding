
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Star, ChevronDown, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { usePoints } from '@/hooks/usePoints';
import { useBasicUserData } from '@/hooks/useBasicUserData';

interface ProfileSectionProps {
  collapsed: boolean;
}

export const ProfileSection = ({ collapsed }: ProfileSectionProps) => {
  // [Analysis] Fixed state management to prevent animation conflicts
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userData, loading } = useBasicUserData();
  const { points, rank } = usePoints(userData.id || '');

  if (loading) {
    return (
      <div className="w-full h-12 animate-pulse bg-siso-text/5 rounded-lg" />
    );
  }

  if (!userData.id) return null;

  const displayName = userData.fullName || userData.email?.split('@')[0] || 'User';

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
      toast({
        title: "Signed out successfully",
        description: "Come back soon!",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (collapsed) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="w-full p-2 hover:bg-siso-text/5 transition-colors duration-200"
        onClick={() => navigate('/profile')}
      >
        {userData.avatarUrl ? (
          <img
            src={supabase.storage.from('avatars').getPublicUrl(userData.avatarUrl).data.publicUrl}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-siso-red/20 to-siso-orange/20 flex items-center justify-center">
            <span className="text-sm font-medium text-siso-text">
              {displayName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full px-2 py-4 hover:bg-siso-text/5 transition-colors duration-200"
          disabled={isLoading}
        >
          <div className="flex items-center gap-3 w-full">
            {userData.avatarUrl ? (
              <img
                src={supabase.storage.from('avatars').getPublicUrl(userData.avatarUrl).data.publicUrl}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-siso-red/20 to-siso-orange/20 flex items-center justify-center">
                <span className="text-lg font-medium text-siso-text">
                  {displayName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="flex-1 text-left">
              <div className="font-medium text-siso-text-bold truncate">
                {displayName}
              </div>
              <div className="flex items-center gap-2 text-sm text-siso-text/90">
                <Trophy className="w-3 h-3 text-siso-orange" />
                <span>{points}</span>
                <Star className="w-3 h-3 text-siso-orange ml-1" />
                <span>{rank}</span>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-siso-text/70" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-56 bg-siso-bg-alt border-siso-border"
      >
        <DropdownMenuItem
          className="text-siso-text hover:text-siso-text-bold hover:bg-siso-text/5 cursor-pointer"
          onClick={() => navigate('/profile')}
        >
          View Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-siso-text hover:text-siso-text-bold hover:bg-siso-text/5 cursor-pointer"
          onClick={() => navigate('/leaderboards')}
        >
          Leaderboard
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-siso-text hover:text-siso-text-bold hover:bg-siso-text/5 cursor-pointer"
          onClick={() => navigate('/how-to-earn')}
        >
          How to Earn Points
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-siso-border" />
        <DropdownMenuItem
          className="text-red-500 hover:text-red-400 hover:bg-red-500/5 cursor-pointer"
          onClick={handleSignOut}
          disabled={isLoading}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
