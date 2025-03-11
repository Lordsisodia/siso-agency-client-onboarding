
import { LoginStreakTracker } from '@/components/points/LoginStreakTracker';
import { PointsDisplay } from '@/components/points/PointsDisplay';
import { PointsHistory } from '@/components/profile/PointsHistory';

interface ProfileMetricsProps {
  userId: string;
}

export const ProfileMetrics = ({ userId }: ProfileMetricsProps) => {
  return (
    <>
      <div className="md:col-span-3">
        <LoginStreakTracker userId={userId} />
      </div>
      
      <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="bg-black/20 rounded-xl p-6 backdrop-blur-sm border border-siso-text/10 hover:border-siso-orange/50 transition-colors">
          <PointsDisplay userId={userId} />
        </div>
      </div>
      
      <div className="md:col-span-6">
        <PointsHistory userId={userId} />
      </div>
    </>
  );
};
