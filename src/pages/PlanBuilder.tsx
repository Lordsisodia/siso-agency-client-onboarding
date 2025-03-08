
import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';
import { AnimatePresence } from 'framer-motion';
import { PreChatState } from '@/components/home/PreChatState';
import { EnhancedChatState } from '@/components/home/EnhancedChatState';
import { ChatMessage } from '@/types/chat';
import { useProjectPlanning } from '@/hooks/use-project-planning';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

export default function PlanBuilder() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();
  
  const { 
    messages, 
    isLoading, 
    sendMessage, 
    startNewProject,
    isAuthenticated,
    currentProjectId
  } = useProjectPlanning();

  // Start a new project if none exists
  useEffect(() => {
    if (isAuthenticated && !currentProjectId) {
      startNewProject("New App Project");
    }
  }, [isAuthenticated, currentProjectId]);

  const handleSubmit = async (message: string) => {
    if (!message.trim() || isLoading) return;

    if (!isExpanded) {
      setIsExpanded(true);
    }
    
    // If not authenticated, show login prompt
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save your project details",
        variant: "default",
      });
    }
    
    await sendMessage(message);
  };

  const handleManualFormSubmit = async (prompt: string, formData: Record<string, any>) => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
    
    // If not authenticated, show login prompt
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save your project details",
        variant: "default",
      });
    }
    
    await sendMessage(prompt, formData);
  };

  return (
    <MainLayout>
      <div className="relative min-h-screen w-full bg-gradient-to-b from-siso-bg to-siso-bg/95 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Waves 
            lineColor="rgba(255, 87, 34, 0.2)"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.01}
            maxCursorMove={120}
            xGap={12}
            yGap={36}
          />
        </div>
        
        {!isAuthenticated && (
          <div className="absolute top-4 right-4 z-20">
            <Button 
              variant="outline" 
              className="bg-black/40 border-white/20 hover:bg-black/60 text-white"
              onClick={() => supabase.auth.signIn({ provider: 'google' })}
            >
              Sign in to save progress
            </Button>
          </div>
        )}
        
        <div className="relative z-10 flex-1 p-4 md:p-8">
          <div className="h-[calc(100vh-8rem)]">
            <AnimatePresence mode="wait">
              {!isExpanded ? (
                <PreChatState 
                  handleSubmit={handleSubmit} 
                  isLoading={isLoading} 
                  searchPlaceholders={[
                    "What type of app do you want to build?",
                    "What are the main features you need?",
                    "What's your budget range for this project?",
                    "When do you need this project completed?",
                    "Tell me about your business requirements...",
                  ]}
                  titleText="Plan Builder"
                  subtitleText="Create detailed specifications for your custom app. Our interactive builder helps you define requirements and generate accurate estimates."
                />
              ) : (
                <EnhancedChatState 
                  messages={messages} 
                  handleSubmit={handleSubmit} 
                  isLoading={isLoading} 
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
