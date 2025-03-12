
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-siso-bg-darker to-siso-bg flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-siso-red to-siso-orange text-transparent bg-clip-text">
        Welcome to our App Builder Platform
      </h1>
      <p className="text-xl text-siso-text text-center max-w-3xl mb-8">
        Build, design and launch your app ideas with AI assistance
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={() => navigate('/auth')}
          className="bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90 px-6 py-3 text-lg"
        >
          Get Started
        </Button>
        <Button 
          onClick={() => navigate('/dashboard')}
          variant="outline"
          className="px-6 py-3 text-lg"
        >
          Explore Dashboard
        </Button>
      </div>
    </div>
  );
}
