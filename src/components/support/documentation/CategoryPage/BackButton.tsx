
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export const BackButton = () => {
  const navigate = useNavigate();
  
  return (
    <div className="mt-12 text-center">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/support')}
        className="text-siso-text/70 hover:text-siso-orange"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Back to Help Center
      </Button>
    </div>
  );
};
