
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePlanChatAssistant } from '@/hooks/use-plan-chat-assistant';
import { useToast } from '@/hooks/use-toast';

export default function NewProject() {
  const [projectId, setProjectId] = useState<string>(() => {
    // Create a new project ID for this session
    const newId = `plan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('planProjectId', newId);
    return newId;
  });
  
  const { sendMessage, messages, isLoading, error } = usePlanChatAssistant(projectId);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Send an initial message to start the conversation
  useEffect(() => {
    const initialPrompt = "Hi! I'm here to help you plan your new project. Let's start with some basic information. What's the name of your project or company? And if you have a website or social media links, feel free to share them too.";
    
    // We're using sendMessage with an empty message to trigger the welcome message
    const startConversation = async () => {
      try {
        await sendMessage(initialPrompt);
      } catch (error) {
        console.error("Error starting conversation:", error);
        toast({
          title: "Error",
          description: "There was a problem starting the conversation. Please try again.",
          variant: "destructive"
        });
      }
    };
    
    startConversation();
  }, []);

  const handleGoBack = () => {
    navigate('/plan-builder');
  };

  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4 min-h-screen relative">
        {/* Waves background */}
        <Waves 
          lineColor="rgba(255, 87, 34, 0.05)" 
          backgroundColor="transparent" 
          waveSpeedX={0.01} 
          waveSpeedY={0.004} 
          waveAmpX={24} 
          waveAmpY={12} 
          className="absolute inset-0 z-0 w-full h-full" 
        />
        
        <div className="mb-6 flex items-center justify-between relative z-10">
          <Button 
            onClick={handleGoBack}
            variant="outline"
            className="border-siso-border text-siso-text hover:bg-siso-bg-card flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Plan Builder</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-0.5 bg-gradient-to-r from-siso-red/40 to-siso-orange/40 rounded-xl">
              <ChatInterface 
                title="New Project Setup" 
                welcomeMessage="I'll help you create a new project plan. Let's start by collecting some basic information..."
                inputPlaceholder="Share details about your project (website, goals, audience, etc.)"
                systemPrompt="You are a helpful project planning assistant. Guide the user through creating a new project by asking for information in a conversational way. Ask for: project/company name, website URL, social media profiles, project goals, target audience, and requirements. Be friendly and conversational."
                usePlanAssistant={true}
                projectId={projectId}
                className="border-0 bg-transparent"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
