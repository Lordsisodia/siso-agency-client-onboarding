
import React, { useEffect, useState } from 'react';
import { useAuthSession } from '@/hooks/useAuthSession';
import { supabase } from '@/integrations/supabase/client';
import { Check, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type NFTStatus = 'pending' | 'completed' | 'failed';

export function WelcomeNFTStatus() {
  const { user } = useAuthSession();
  const [status, setStatus] = useState<NFTStatus>('pending');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check NFT minting status
  useEffect(() => {
    const checkStatus = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // Use .from instead of querying a table that may not exist
        const { data, error } = await supabase
          .from('welcome_nft_mints')
          .select('status, error_message')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (error) throw error;
        
        if (data) {
          // Ensure we only set valid statuses
          const mintStatus = data.status as string; 
          setStatus(
            mintStatus === 'completed' ? 'completed' :
            mintStatus === 'failed' ? 'failed' :
            'pending'
          );
          
          if (data.error_message) {
            setError(data.error_message);
          }
        }
      } catch (err) {
        console.error('Error checking NFT status:', err);
        setError('Failed to check NFT status');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkStatus();
  }, [user]);
  
  // Request NFT minting
  const handleMintRequest = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // Call the appropriate function to mint NFT
      const { error } = await supabase.functions.invoke('mint-nft', {
        body: { userId: user.id }
      });
      
      if (error) throw error;
      
      // Update status to pending
      setStatus('pending');
      setError(null);
      
    } catch (err) {
      console.error('Error requesting NFT mint:', err);
      setError('Failed to request NFT minting');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <Clock className="h-4 w-4 animate-pulse" />
        <span>Checking NFT status...</span>
      </div>
    );
  }
  
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          {status === 'completed' ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : status === 'failed' ? (
            <AlertCircle className="h-5 w-5 text-red-500" />
          ) : (
            <Clock className="h-5 w-5 text-yellow-500" />
          )}
          
          <span className="font-medium">
            Welcome NFT: {' '}
            {status === 'completed' ? 'Minted' : 
             status === 'failed' ? 'Failed' : 'Pending'}
          </span>
        </div>
        
        {error && (
          <div className="text-sm text-red-500">
            {error}
          </div>
        )}
        
        {(status === 'failed' || !status) && (
          <Button 
            size="sm" 
            onClick={handleMintRequest}
            disabled={isLoading}
          >
            Retry Mint
          </Button>
        )}
      </div>
    </div>
  );
}
