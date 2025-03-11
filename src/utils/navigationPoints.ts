
import { showPointsEarnedToast } from '@/components/points/PointsEarnedToast';

export const awardNavigationPoints = (path: string) => {
  // Only award points for certain pages
  const pointsMap: Record<string, number> = {
    '/organization': 5,
    '/preferences': 5,
    '/tasks': 3
  };
  
  if (pointsMap[path]) {
    showPointsEarnedToast({ 
      points: pointsMap[path], 
      action: `Visiting ${path.replace('/', '')}` 
    });
    
    // Could also save this to a user's profile in a real implementation
    return true;
  }
  
  return false;
};
