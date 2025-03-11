import React, { useState, useEffect } from 'react';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { ManualInputSheet } from '@/components/plan-builder/ManualInputSheet';
import { Button } from '@/components/ui/button';
import { FileEdit, AlertCircle, History, PlusCircle, ArrowLeft } from 'lucide-react';
import { usePlanChatAssistant } from '@/hooks/core';
import { useToast } from '@/hooks/use-toast';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PrePlanState } from '@/components/plan-builder/PrePlanState';
import { motion } from 'framer-motion';
import { Waves } from '@/components/ui/waves-background';
import { useParams, useNavigate } from 'react-router-dom';

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
  const [showProjectHistory, setShowProjectHistory] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { projectId: urlProjectId } = useParams();
  
  const [projectId, setProjectId] = useState<string>(() => {
    // If there's a project ID in the URL, use that
    if (urlProjectId) return urlProjectId;
    
    // Otherwise check session storage
    const existingId = sessionStorage.getItem('planProjectId');
    if (existingId) return existingId;
    
    // If no existing ID, create a new one
    const newId = `plan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('planProjectId', newId);
    return newId;
  });

  const { sendMessage, messages, isLoading, error } = usePlanChatAssistant(projectId);

  // Set plan started if we have a project ID from the URL
  useEffect(() => {
    if (urlProjectId) {
      setIsPlanStarted(true);
    }
  }, [urlProjectId]);

  // Load project history
  useEffect(() => {
    const fetchProjectHistory = async () => {
      try {
        setIsLoadingHistory(true);
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
      
      await sendMessage(prompt, undefined, {});
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
      toast({
        title: "Processing Your Plan",
        description: "Your project details are being analyzed by the AI. This may take a moment...",
        variant: "default"
      });
      
      try {
        await sendMessage(prompt, undefined, formData);
        
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
    const newId = `plan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('planProjectId', newId);
    setProjectId(newId);
    setIsPlanStarted(false);
    navigate('/plan-builder');
  };

  const handleGoBack = () => {
    setIsPlanStarted(false);
    navigate('/plan-builder');
  };

  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4 min-h-screen relative">
        {/* Waves background - now shown always and covering entire page */}
        <Waves 
          lineColor="rgba(255, 87, 34, 0.05)" 
          backgroundColor="transparent" 
          waveSpeedX={0.01} 
          waveSpeedY={0.004} 
          waveAmpX={24} 
          waveAmpY={12} 
          className="absolute inset-0 z-0 w-full h-full" 
        />
        
        {!isPlanStarted ? (
          <>
            <PrePlanState onShowProjectHistory={() => setShowProjectHistory(true)} />
            
            {/* Project History Section - Always visible now */}
            {(projectHistory.length > 0 || showProjectHistory) && (
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
                      <motion.div 
                        key={project.id}
                        className="group relative bg-siso-bg-alt/40 backdrop-blur-md border border-siso-border rounded-lg p-5 hover:border-siso-red/50 transition-all cursor-pointer overflow-hidden"
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        onClick={() => {
                          toast({
                            title: "Loading Project",
                            description: `Loading ${project.title}...`,
                          });
                          // Set the project ID and navigate to its page
                          sessionStorage.setItem('planProjectId', project.id);
                          setProjectId(project.id);
                          setIsPlanStarted(true);
                          navigate(`/plan-builder/${project.id}`);
                        }}
                      >
                        {/* Gradient hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-siso-red/10 to-siso-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <h3 className="text-lg font-medium text-siso-text relative z-10">{project.title}</h3>
                        <p className="text-sm text-siso-text-muted mt-1 relative z-10">{project.snippet}</p>
                        <div className="text-xs text-siso-text-muted mt-2 relative z-10">
                          Created {project.createdAt.toLocaleDateString()}
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <>
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between relative z-10">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-siso-red to-siso-orange bg-clip-text text-transparent">AI Project Planner</h1>
                <p className="text-siso-text-muted mt-1">
                  Get detailed project plans, budgets, and timelines based on your requirements
                </p>
              </div>
              
              <div className="flex space-x-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    onClick={handleGoBack}
                    variant="outline"
                    className="border-siso-border text-siso-text hover:bg-siso-bg-card flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    onClick={handleNewProject}
                    variant="outline"
                    className="border-siso-border text-siso-text hover:bg-siso-bg-card flex items-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>New Project</span>
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    onClick={() => setIsManualInputOpen(true)}
                    className="bg-gradient-to-r from-siso-orange to-siso-red text-white hover:opacity-90"
                  >
                    <FileEdit className="mr-2 h-4 w-4" />
                    Use Form
                  </Button>
                </motion.div>
              </div>
            </div>

            {showConnectionAlert && (
              <Alert variant="destructive" className="mb-6 relative z-10">
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

            <div className="grid grid-cols-1 gap-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-0.5 bg-gradient-to-r from-siso-red/40 to-siso-orange/40 rounded-xl">
                  <ChatInterface 
                    title="AI Project Planner" 
                    welcomeMessage="I'll help create a detailed plan for your project. Feel free to ask questions or provide more details as we refine your plan."
                    inputPlaceholder="Add more details or ask questions about your plan..."
                    systemPrompt="You are a professional project planning assistant specialized in helping users create comprehensive software project plans. Help users define requirements, select features, estimate timelines, and budget effectively."
                    usePlanAssistant={true}
                    projectId={projectId}
                    className="border-0 bg-transparent"
                  />
                </div>
              </motion.div>
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
