
import { useState, useEffect } from 'react';
import { usePoints } from '@/hooks/usePoints';
import { ArrowUpCircle } from 'lucide-react';

interface PointsDisplayProps {
  userId: string;
}

export const PointsDisplay = ({ userId }: PointsDisplayProps) => {
  const { points, rank, loading } = usePoints(userId);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Animate the points counter when it changes
  useEffect(() => {
    if (!loading) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [points, loading]);
  
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-siso-orange/20 p-2 rounded-full">
          <ArrowUpCircle className="h-5 w-5 text-siso-orange" />
        </div>
        <h3 className="text-lg font-semibold text-siso-text-bold">Your Points</h3>
      </div>
      
      <div className={`transition-all duration-500 ${isAnimating ? 'scale-110 text-siso-orange' : ''}`}>
        <p className="text-4xl font-bold">{points}</p>
        <p className="text-sm text-siso-text/70 mt-1">Current rank: {rank}</p>
      </div>
      
      <div className="mt-4 bg-black/30 rounded-lg p-3">
        <p className="text-sm text-siso-text/80">
          Earn points by creating projects, completing tasks, and engaging with our platform daily.
        </p>
      </div>
    </div>
  );
};
