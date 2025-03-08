
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuthSession } from '@/hooks/useAuthSession';
import { supabase } from '@/integrations/supabase/client';

export default function ThankYou() {
  const navigate = useNavigate();
  const { user } = useAuthSession();

  useEffect(() => {
    const markOnboardingComplete = async () => {
      if (user?.id) {
        try {
          // Update the profile to mark onboarding as completed
          const { error } = await supabase
            .from('profiles')
            .update({ onboarding_completed: true })
            .eq('id', user.id);
            
          if (error) {
            console.error('Error updating onboarding status:', error);
          }
        } catch (err) {
          console.error('Failed to mark onboarding as complete:', err);
        }
      }
    };

    markOnboardingComplete();
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-siso-dark p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full bg-gradient-to-br from-slate-900 to-black p-8 rounded-2xl border border-siso-border shadow-xl"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-20 h-20 bg-gradient-to-r from-siso-red to-siso-orange rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Thank You!</h1>
          <p className="text-gray-300 text-lg mb-6">
            Your profile has been created successfully. We're excited to have you join our community!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="default"
            size="lg"
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto bg-gradient-to-r from-siso-red to-siso-orange hover:opacity-90 transition-opacity"
          >
            Go to Dashboard
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/profile')}
            className="w-full sm:w-auto border-siso-border hover:bg-siso-dark/30"
          >
            Complete Your Profile
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
