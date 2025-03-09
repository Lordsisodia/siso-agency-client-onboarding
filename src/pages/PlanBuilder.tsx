
import React, { useState, useEffect } from 'react';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { ManualInputSheet } from '@/components/plan-builder/ManualInputSheet';
import { Button } from '@/components/ui/button';
import { FileEdit, AlertCircle } from 'lucide-react';
import { usePlanChatAssistant } from '@/hooks/use-plan-chat-assistant';
import { useToast } from '@/hooks/use-toast';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PrePlanState } from '@/components/plan-builder/PrePlanState';

export default function PlanBuilder() {
  const [isManualInputOpen, setIsManualInputOpen] = useState(false);
  const [showConnectionAlert, setShowConnectionAlert] = useState(false);
  const [isPlanStarted, setIsPlanStarted] = useState(false);
  const { toast } = useToast();
  const [projectId, setProjectId] = useState<string>(() => {
    // Generate a unique project ID for this session if one doesn't exist
    const existingId = sessionStorage.getItem('planProjectId');
    if (existingId) return existingId;
    
    const newId = `plan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('planProjectId', newId);
    return newId;
  });

  const { sendMessage, messages, isLoading, error } = usePlanChatAssistant(projectId);

  // Show a connection alert if we experience an error
  useEffect(() => {
    if (error) {
      setShowConnectionAlert(true);
      // Auto-hide after 10 seconds
      const timer = setTimeout(() => setShowConnectionAlert(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Start plan with initial prompt
  const handleStartPlan = async (prompt: string) => {
    try {
      toast({
        title: "Processing Your Idea",
        description: "We're creating your project plan based on your description...",
        variant: "default"
      });
      
      await sendMessage(prompt);
      setIsPlanStarted(true);
    } catch (error) {
      console.error("Error starting plan:", error);
      toast({
        title: "Error",
        description: "There was a problem processing your request. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSubmitToAI = async (prompt: string, formData?: Record<string, any>) => {
    try {
      // Send the form data to the AI assistant
      toast({
        title: "Processing Your Plan",
        description: "Your project details are being analyzed by the AI. This may take a moment...",
        variant: "default"
      });
      
      try {
        // Send the form data to the AI assistant using the sendMessage function
        await sendMessage(prompt, undefined, formData);
        
        // Close the manual input sheet after submission
        setIsManualInputOpen(false);
        setIsPlanStarted(true);
      } catch (error) {
        console.error("Error communicating with AI assistant:", error);
        toast({
          title: "Error",
          description: "There was a problem processing your request. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error submitting to AI:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4 min-h-screen">
        {!isPlanStarted ? (
          <PrePlanState onSubmit={handleStartPlan} />
        ) : (
          <>
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

            {showConnectionAlert && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  There was a problem connecting to the AI service. Please check your connection and try again.
                  <Button 
                    variant="link" 
                    className="text-white p-0 h-auto font-normal ml-2"
                    onClick={() => setShowConnectionAlert(false)}
                  >
                    Dismiss
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 gap-6">
              <ChatInterface 
                title="AI Project Planner" 
                welcomeMessage="I'll help create a detailed plan for your project. Feel free to ask questions or provide more details as we refine your plan."
                inputPlaceholder="Add more details or ask questions about your plan..."
                systemPrompt="You are a professional project planning assistant specialized in helping users create comprehensive software project plans. Help users define requirements, select features, estimate timelines, and budget effectively."
                usePlanAssistant={true}
                projectId={projectId}
              />
            </div>
          </>
        )}

        <ManualInputSheet 
          isOpen={isManualInputOpen} 
          onClose={() => setIsManualInputOpen(false)}
          onSubmitToAI={handleSubmitToAI}
        />
      </div>
    </MainLayout>
  );
}
