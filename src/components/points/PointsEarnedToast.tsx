
import { toast } from 'sonner';

interface PointsEarnedProps {
  points: number;
  action: string;
}

export const showPointsEarnedToast = ({ points, action }: PointsEarnedProps) => {
  toast.success(
    <div className="flex flex-col">
      <span className="font-semibold">+{points} Points Earned!</span>
      <span className="text-sm text-gray-200">{action}</span>
    </div>,
    {
      className: "bg-gradient-to-r from-siso-red/90 to-siso-orange/90 border-siso-orange/30",
      position: "bottom-right",
      duration: 3000,
      icon: "🏆",
    }
  );
};
