
import { Trophy, Users, Coins, TrendingUp } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import CountUp from 'react-countup';

interface LeaderboardStatsProps {
  totalUsers: number;
  totalPoints: number;
  totalSisoTokens: number;
}

export const LeaderboardStats = ({ totalUsers, totalPoints, totalSisoTokens }: LeaderboardStatsProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
      <Card className="bg-gradient-to-br from-siso-bg-alt to-siso-bg-alt/50 hover:border-siso-border-hover transition-all duration-300">
        <CardContent className="pt-6 px-5 pb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-siso-text/70 font-medium tracking-wide mb-1.5">Total Users</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-siso-text-bold tracking-tight">
                  <CountUp end={totalUsers} duration={2} separator="," />
                </p>
                <span className="text-xs text-green-500 flex items-center font-medium">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +5%
                </span>
              </div>
            </div>
            <Users className="h-8 w-8 text-siso-orange opacity-80" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-siso-bg-alt to-siso-bg-alt/50 hover:border-siso-border-hover transition-all duration-300">
        <CardContent className="pt-6 px-5 pb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-siso-text/70 font-medium tracking-wide mb-1.5">Total Points</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-siso-text-bold tracking-tight">
                  <CountUp end={totalPoints} duration={2} separator="," />
                </p>
                <span className="text-xs text-green-500 flex items-center font-medium">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12%
                </span>
              </div>
            </div>
            <Trophy className="h-8 w-8 text-siso-orange opacity-80" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-siso-bg-alt to-siso-bg-alt/50 hover:border-siso-border-hover transition-all duration-300">
        <CardContent className="pt-6 px-5 pb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-siso-text/70 font-medium tracking-wide mb-1.5">Total SISO Tokens</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-siso-text-bold tracking-tight">
                  <CountUp end={totalSisoTokens} duration={2} separator="," />
                </p>
                <span className="text-xs text-green-500 flex items-center font-medium">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8%
                </span>
              </div>
            </div>
            <Coins className="h-8 w-8 text-siso-orange opacity-80" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-siso-bg-alt to-siso-bg-alt/50 hover:border-siso-border-hover transition-all duration-300">
        <CardContent className="pt-6 px-5 pb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-siso-text/70 font-medium tracking-wide mb-1.5">Daily Active Users</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-siso-text-bold tracking-tight">
                  <CountUp end={Math.floor(totalUsers * 0.4)} duration={2} separator="," />
                </p>
                <span className="text-xs text-green-500 flex items-center font-medium">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +15%
                </span>
              </div>
            </div>
            <Users className="h-8 w-8 text-siso-orange opacity-80" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
