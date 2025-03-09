
import React, { useState, useEffect } from 'react';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { ManualInputSheet } from '@/components/plan-builder/ManualInputSheet';
import { Button } from '@/components/ui/button';
import { FileEdit } from 'lucide-react';
import { usePlanChatAssistant } from '@/hooks/use-plan-chat-assistant';
import { useToast } from '@/hooks/use-toast';
import { MainLayout } from '@/components/assistants/layout/MainLayout';

export default function PlanBuilder() {
  const [isManualInputOpen, setIsManualInputOpen] = useState(false);
  const { toast } = useToast();
  const [projectId, setProjectId] = useState<string>(() => {
    // Generate a unique project ID for this session if one doesn't exist
    const existingId = sessionStorage.getItem('planProjectId');
    if (existingId) return existingId;
    
    const newId = `plan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('planProjectId', newId);
    return newId;
  });

  const { sendMessage } = usePlanChatAssistant(projectId);

  const handleSubmitToAI = async (prompt: string, formData?: Record<string, any>) => {
    try {
      // Send the form data to the AI assistant
      toast({
        title: "Submitting to AI",
        description: "Your project details are being processed by the AI assistant...",
        variant: "default"
      });
      
      try {
        // Send the form data to the AI assistant using the sendMessage function
        await sendMessage(prompt, undefined, formData);
        
        // Close the manual input sheet after submission
        setIsManualInputOpen(false);
      } catch (error) {
        console.error("Error communicating with AI assistant:", error);
        toast({
          title: "Communication Error",
          description: "There was an issue connecting to the AI assistant. Please try again later.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error submitting to AI:", error);
      toast({
        title: "Error",
        description: "Failed to send your request to the AI assistant. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-siso-text">AI Project Planner</h1>
            <p className="text-siso-text-muted mt-1">
              Get detailed project plans, budgets, and timelines based on your requirements
            </p>
          </div>
          
          <Button 
            onClick={() => setIsManualInputOpen(true)}
            className="bg-gradient-to-r from-siso-orange to-siso-red text-white"
          >
            <FileEdit className="mr-2 h-4 w-4" />
            Create Plan With Form
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <ChatInterface 
            title="AI Project Planner" 
            welcomeMessage="Hi! I'm your AI project planning assistant. Tell me about the app or software you want to build, and I'll help create a detailed plan including features, timeline, and budget estimates. You can describe your project in your own words or use the form button above for a more structured approach."
            inputPlaceholder="Describe your project requirements..."
            systemPrompt="You are a professional project planning assistant specialized in helping users create comprehensive software project plans. Help users define requirements, select features, estimate timelines, and budget effectively."
            usePlanAssistant={true}
            projectId={projectId}
          />
        </div>

        <ManualInputSheet 
          isOpen={isManualInputOpen} 
          onClose={() => setIsManualInputOpen(false)}
          onSubmitToAI={handleSubmitToAI}
        />
      </div>
    </MainLayout>
  );
}
