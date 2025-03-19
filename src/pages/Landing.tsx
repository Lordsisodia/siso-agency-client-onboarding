
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import LandingPage from '@/components/landing/LandingPage';

export default function Landing() {
  return (
    <div className="relative">
      <LandingPage />
    </div>
  );
}
