
import React, { useState, useEffect } from 'react';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { ManualInputSheet } from '@/components/plan-builder/ManualInputSheet';
import { Button } from '@/components/ui/button';
import { FileEdit, AlertCircle, History } from 'lucide-react';
import { usePlanChatAssistant } from '@/hooks/use-plan-chat-assistant';
import { useToast } from '@/hooks/use-toast';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PrePlanState } from '@/components/plan-builder/PrePlanState';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';

type ProjectHistoryItem = {
  id: string;
  title: string;
  createdAt: Date;
  snippet: string;
};

export default function PlanBuilder() {
  const [isManualInputOpen, setIsManualInputOpen] = useState(false);
  const [showConnectionAlert, setShowConnectionAlert] = useState(false);
  const [isPlanStarted, setIsPlanStarted] = useState(false);
  const [projectHistory, setProjectHistory] = useState<ProjectHistoryItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
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

  // Load project history
  useEffect(() => {
    const fetchProjectHistory = async () => {
      try {
        setIsLoadingHistory(true);
        // This would typically fetch from your database
        // For now we'll use a mock response
        
        // This would be the actual database query with Supabase
        // const { data, error } = await supabase
        //   .from('plan_chat_history')
        //   .select('*')
        //   .order('created_at', { ascending: false })
        //   .limit(5);
        
        // Mock data for now
        const mockData = [
          {
            id: '1',
            title: 'E-commerce Platform',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            snippet: 'An online marketplace with user accounts, product listings, and payment processing.'
          },
          {
            id: '2',
            title: 'Educational App',
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            snippet: 'Interactive learning platform for K-12 students with quizzes and progress tracking.'
          }
        ];
        
        setProjectHistory(mockData);
      } catch (error) {
        console.error("Error loading project history:", error);
      } finally {
        setIsLoadingHistory(false);
      }
    };
    
    fetchProjectHistory();
  }, []);

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

  const handleNewProject = () => {
    // Generate a new project ID
    const newId = `plan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('planProjectId', newId);
    setProjectId(newId);
    setIsPlanStarted(false);
  };

  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4 min-h-screen">
        {!isPlanStarted ? (
          <>
            <PrePlanState onSubmit={handleStartPlan} />
            
            {/* Project History Section */}
            {projectHistory.length > 0 && (
              <motion.div 
                className="mt-12 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center mb-6">
                  <History className="w-5 h-5 text-siso-orange mr-2" />
                  <h2 className="text-xl font-semibold text-siso-text">Recent Projects</h2>
                </div>
                
                <div className="space-y-4">
                  {isLoadingHistory ? (
                    <div className="animate-pulse space-y-4">
                      {[1, 2].map((i) => (
                        <div key={i} className="bg-siso-bg-alt/30 backdrop-blur-md border border-siso-border rounded-lg p-4">
                          <div className="h-5 w-1/3 bg-siso-bg-card rounded mb-2"></div>
                          <div className="h-4 w-2/3 bg-siso-bg-card rounded"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    projectHistory.map((project) => (
                      <div 
                        key={project.id}
                        className="bg-siso-bg-alt/30 backdrop-blur-md border border-siso-border rounded-lg p-4 hover:border-siso-red/50 transition-all cursor-pointer"
                        onClick={() => {
                          // Logic to load this project would go here
                          toast({
                            title: "Loading Project",
                            description: `Loading ${project.title}...`,
                          });
                        }}
                      >
                        <h3 className="text-lg font-medium text-siso-text">{project.title}</h3>
                        <p className="text-sm text-siso-text-muted mt-1">{project.snippet}</p>
                        <div className="text-xs text-siso-text-muted mt-2">
                          Created {project.createdAt.toLocaleDateString()}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <>
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-siso-text">AI Project Planner</h1>
                <p className="text-siso-text-muted mt-1">
                  Get detailed project plans, budgets, and timelines based on your requirements
                </p>
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  onClick={handleNewProject}
                  variant="outline"
                  className="border-siso-border text-siso-text hover:bg-siso-bg-card"
                >
                  New Project
                </Button>
                
                <Button 
                  onClick={() => setIsManualInputOpen(true)}
                  className="bg-gradient-to-r from-siso-orange to-siso-red text-white"
                >
                  <FileEdit className="mr-2 h-4 w-4" />
                  Use Form
                </Button>
              </div>
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
