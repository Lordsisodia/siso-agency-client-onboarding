
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
    icon: <Star className="h-5 w-5 text-yellow-400" />,
  });
};

export const showRankUpToast = (newRank: string) => {
  toast({
    title: `Congratulations!`,
    description: `You've reached rank: ${newRank}`,
    icon: <Award className="h-5 w-5 text-siso-orange" />,
    duration: 5000,
  });
};
