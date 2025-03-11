
import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { useDashboardStats } from '@/hooks/useDashboardStats';

interface LoginStreakTrackerProps {
  userId: string;
}

export const LoginStreakTracker = ({ userId }: LoginStreakTrackerProps) => {
  const [streakCount, setStreakCount] = useState(0);
  const { stats } = useDashboardStats();

  useEffect(() => {
    // In a real app, we would fetch the login streak data from the server
    // For now, just use a placeholder value from stats or default to 3
    setStreakCount(stats?.loginStreak || 3);
  }, [stats?.loginStreak]);

  return (
    <div className="bg-black/20 rounded-xl p-6 backdrop-blur-sm border border-siso-text/10 hover:border-siso-orange/50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="bg-siso-orange/20 p-2 rounded-full">
          <Calendar className="h-5 w-5 text-siso-orange" />
        </div>
        <h3 className="text-lg font-semibold text-siso-text-bold">Login Streak</h3>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold text-siso-text-bold">{streakCount} days</p>
          <p className="text-sm text-siso-text/70 mt-1">Keep it up! Log in daily for bonus points.</p>
        </div>
        
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 7 }).map((_, index) => (
            <div 
              key={index}
              className={`h-8 w-2 rounded-full ${
                index < streakCount ? 'bg-gradient-to-t from-siso-red to-siso-orange' : 'bg-siso-text/10'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
