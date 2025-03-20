
import { GradientHeading } from '@/components/ui/gradient-heading';
import { LightbulbIcon, RocketIcon, MessageCircleIcon, Trophy, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';

export const GettingStartedSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      navigate('/auth');
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to navigate to signup. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/onboarding/social`
        }
      });
      if (error) throw error;
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error signing in",
        description: error.message || "An error occurred during sign in",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    {
      icon: LightbulbIcon,
      title: "Share Your Vision",
      description: "Tell us your app idea and goals—we'll map out a plan to make it a client-winning reality.",
      stats: {
        likes: 189,
        signupsToday: "2 min to start",
        setupTime: "40+ agency partners"
      }
    },
    {
      icon: RocketIcon,
      title: "See Your MVP in 48 Hours",
      description: "Watch your app come to life in 48-72 hours, powered by our AI and 10K+ developer network.",
      stats: {
        likes: 234,
        completionRate: "95% satisfaction rate",
        rating: "48-hour delivery"
      }
    },
    {
      icon: MessageCircleIcon,
      title: "Refine with Feedback",
      description: "Hop on a call, share feedback, and see tweaks in 2-3 days—we iterate until you're thrilled.",
      stats: {
        likes: 198,
        completionRate: "2-3 day tweaks",
        rating: "100% happy clients"
      }
    },
    {
      icon: Trophy,
      title: "Launch & Scale",
      description: "Approve your app, get the source code, and launch with zero hosting costs—ready to grow.",
      stats: {
        likes: 312,
        resources: "£0/month for 99%",
        dailyUsers: "10K+ developer support"
      }
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden" id="getting-started">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{
          backgroundImage: `linear-gradient(to right, rgb(255 255 255 / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(255 255 255 / 0.1) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <GradientHeading variant="secondary" className="text-4xl md:text-5xl font-bold mb-4">
            Kick Off Your App in Seconds
          </GradientHeading>
          <p className="text-lg text-siso-text-muted max-w-2xl mx-auto">
            Join 40+ agencies already scaling with custom apps built for success
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {steps.map((step, index) => (
            <motion.div 
              key={step.title}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Card Content */}
              <div className="relative glow-card group">
                <div className="flex items-start gap-6 p-6 rounded-xl bg-gradient-to-br from-siso-red/5 to-siso-orange/5 
                  border border-siso-orange/20 hover:border-siso-orange/40 transition-all duration-300">
                  
                  {/* Step Number */}
                  <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-gradient-to-r from-siso-red to-siso-orange 
                    flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-siso-red/10 to-siso-orange/10 
                      group-hover:from-siso-red/20 group-hover:to-siso-orange/20">
                      <step.icon className="w-6 h-6 text-siso-orange" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <h3 className="text-lg font-semibold text-siso-text-bold">{step.title}</h3>
                    <p className="text-sm text-siso-text-muted">{step.description}</p>

                    {/* Stats Bar */}
                    <div className="flex items-center gap-4 text-sm text-siso-text-muted flex-wrap">
                      {/* Like Counter */}
                      <motion.button 
                        className="flex items-center gap-1.5 hover:text-siso-orange transition-colors"
                        whileTap={{ scale: 0.95 }}
                      >
                        <Heart className="w-3.5 h-3.5" />
                        <span>{step.stats.likes}</span>
                      </motion.button>

                      {/* Step-specific Stats */}
                      {index === 0 && (
                        <>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span>{step.stats.signupsToday}</span>
                          </div>
                          <div>{step.stats.setupTime}</div>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <div>{step.stats.completionRate}</div>
                          <div>{step.stats.rating}</div>
                        </>
                      )}
                      {index === 2 && (
                        <>
                          <div>{step.stats.completionRate}</div>
                          <div>{step.stats.rating}</div>
                        </>
                      )}
                      {index === 3 && (
                        <>
                          <div>{step.stats.resources}</div>
                          <div>{step.stats.dailyUsers}</div>
                        </>
                      )}
                    </div>

                    {/* Action Buttons - Only show for first step */}
                    {index === 0 && (
                      <div className="flex flex-wrap items-center gap-3 mt-4">
                        <Button
                          onClick={handleSignUp}
                          disabled={isLoading}
                          className="bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90 
                            text-white font-semibold px-5 py-2 flex items-center gap-2"
                        >
                          Let's Get Started
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                        <GoogleSignInButton
                          onClick={handleGoogleSignIn}
                          disabled={isLoading}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Connector Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="absolute -bottom-6 left-10 w-px h-6 bg-gradient-to-b from-siso-red/20 to-siso-orange/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GettingStartedSection;
