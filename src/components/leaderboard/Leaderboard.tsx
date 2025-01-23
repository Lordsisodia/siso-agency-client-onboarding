import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Trophy, ChevronDown, ChevronUp, Clock, Users, UserPlus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDistanceToNow } from 'date-fns';

interface Achievement {
  name: string;
  icon: string;
}

interface LeaderboardEntry {
  id: string;
  user_id: string;
  points: number | null;
  rank: string | null;
  achievements: Achievement[] | null;
  siso_tokens: number | null;
  updated_at: string;
  contribution_count: number | null;
  referral_count: number | null;
  profile?: {
    full_name: string | null;
    email: string | null;
  };
}

export const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchLeaderboard();

    // Set up real-time subscription
    const channel = supabase
      .channel('leaderboard-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all changes (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'leaderboard'
        },
        (payload) => {
          console.log('Real-time leaderboard update received:', payload);
          // Refresh the leaderboard data when any change occurs
          fetchLeaderboard();
        }
      )
      .subscribe((status) => {
        console.log('Leaderboard subscription status:', status);
      });

    // Also listen for profile changes
    const profileChannel = supabase
      .channel('profile-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        (payload) => {
          console.log('Profile update received:', payload);
          // Refresh the leaderboard data when profiles change
          fetchLeaderboard();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(profileChannel);
    };
  }, []);

  const fetchLeaderboard = async () => {
    try {
      console.log('Fetching leaderboard data...');
      const { data, error } = await supabase
        .from('leaderboard')
        .select(`
          *,
          profile:profiles(full_name, email)
        `)
        .order('points', { ascending: false });

      if (error) {
        console.error('Error fetching leaderboard:', error);
        throw error;
      }

      if (data) {
        console.log('Fetched leaderboard data:', data);
        const transformedData: LeaderboardEntry[] = data.map(entry => ({
          ...entry,
          achievements: Array.isArray(entry.achievements) 
            ? entry.achievements 
            : typeof entry.achievements === 'string'
              ? JSON.parse(entry.achievements)
              : entry.achievements || [],
          contribution_count: entry.contribution_count || 0,
          referral_count: entry.referral_count || 0,
        }));
        setLeaderboardData(transformedData);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      toast({
        title: "Error",
        description: "Failed to load leaderboard data",
        variant: "destructive",
      });
    }
  };

  const getDisplayName = (entry: LeaderboardEntry) => {
    if (entry.profile?.full_name) return entry.profile.full_name;
    if (entry.profile?.email) {
      const emailParts = entry.profile.email.split('@');
      return emailParts[0];
    }
    return 'Anonymous User';
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Leaderboard Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px] text-center">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-center">Points</TableHead>
                <TableHead className="text-center">Contributions</TableHead>
                <TableHead className="text-center">Referrals</TableHead>
                <TableHead className="text-center">SISO Tokens</TableHead>
                <TableHead className="text-center">Last Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((entry, index) => (
                <TableRow key={entry.id}>
                  <TableCell className="text-center font-medium">{index + 1}</TableCell>
                  <TableCell>{getDisplayName(entry)}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      {entry.points || 0}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {entry.contribution_count || 0}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <UserPlus className="h-4 w-4 text-muted-foreground" />
                      {entry.referral_count || 0}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {entry.siso_tokens || 0}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {formatDistanceToNow(new Date(entry.updated_at), { addSuffix: true })}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};