
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export const NotFoundState = () => {
  const navigate = useNavigate();
  
  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Category Not Found</h2>
          <Button onClick={() => navigate('/support')}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Help Center
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};
