
import { toast } from '@/hooks/use-toast';
import { Star, Award } from 'lucide-react';

interface PointsEarnedProps {
  points: number;
  action: string;
}

export const showPointsEarnedToast = ({ points, action }: PointsEarnedProps) => {
  toast({
    title: `+${points} points earned!`,
    description: `You earned points for: ${action}`,
    className: "bg-yellow-50 border-yellow-200",
  });
};

export const showRankUpToast = (newRank: string) => {
  toast({
    title: `Congratulations!`,
    description: `You've reached rank: ${newRank}`,
    className: "bg-orange-50 border-orange-200",
    duration: 5000,
  });
};
