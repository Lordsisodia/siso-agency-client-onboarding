
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const usePoints = (userId: string | undefined) => {
  const [points, setPoints] = useState(0);
  const [rank, setRank] = useState('Newbie');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock function for awarding points (no database interaction)
  const awardPoints = async (action: string) => {
    console.log('[usePoints] Action would award points for:', action);
    toast({
      title: "Feature disabled",
      description: "Points system is currently disabled.",
    });
    return;
  };

  return { points, rank, isLoading, awardPoints };
};
