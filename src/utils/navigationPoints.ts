
import { showPointsEarnedToast } from '@/components/points/PointsEarnedToast';

export const awardNavigationPoints = (path: string) => {
  // Only award points for certain pages
  const pointsMap: Record<string, number> = {
    '/': 2, // Dashboard
    '/organization': 5,
    '/preferences': 5,
    '/tasks': 3,
    '/portfolio': 5,
    '/support': 4 // Added points for visiting Support/Help Center
  };
  
  if (pointsMap[path]) {
    showPointsEarnedToast({ 
      points: pointsMap[path], 
      action: path === '/' ? 'Visiting Dashboard' : `Visiting ${path.replace('/', '')}` 
    });
    
    // Could also save this to a user's profile in a real implementation
    return true;
  }
  
  return false;
};
