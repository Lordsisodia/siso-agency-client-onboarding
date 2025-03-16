import React, { useState, useEffect, useCallback } from 'react';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { ManualInputSheet } from '@/components/plan-builder/ManualInputSheet';
import { WebsiteInputSheet } from '@/components/plan-builder/WebsiteInputSheet';
import { Button } from '@/components/ui/button';
import { FileEdit, AlertCircle, History, PlusCircle, ArrowLeft, LayoutGrid, Layout } from 'lucide-react';
import { usePlanChatAssistant } from '@/hooks/core';
import { useToast } from '@/hooks/use-toast';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PrePlanState } from '@/components/plan-builder/PrePlanState';
import { LiveProjectOverview } from '@/components/plan-builder/LiveProjectOverview';
import { ProjectDataProvider, useProjectData } from '@/contexts/ProjectDataContext';
import { motion } from 'framer-motion';
import { Waves } from '@/components/ui/waves-background';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';

type ProjectHistoryItem = {
  id: string;
  title: string;
  createdAt: Date;
  snippet: string;
  conversationId?: string;
};

type WebsiteInputData = {
  websiteUrl: string;
  companyName: string;
  projectGoals: string;
  targetAudience: string;
  socialLinks: Record<string, string>;
};

export default function PlanBuilder() {
  const [isManualInputOpen, setIsManualInputOpen] = useState(false);
  const [isWebsiteInputOpen, setIsWebsiteInputOpen] = useState(false);
  const [showConnectionAlert, setShowConnectionAlert] = useState(false);
  const [isPlanStarted, setIsPlanStarted] = useState(false);
  const [projectHistory, setProjectHistory] = useState<ProjectHistoryItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [showProjectHistory, setShowProjectHistory] = useState(false);
  const [splitView, setSplitView] = useState(true); // Default to split view
  const { toast } = useToast();
  const navigate = useNavigate();
  const { projectId: urlProjectId } = useParams();
  
  const [projectId, setProjectId] = useState<string>(() => {
    if (urlProjectId) return urlProjectId;
    
    const existingId = sessionStorage.getItem('planProjectId');
    if (existingId) return existingId;
    
    const newId = `plan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('planProjectId', newId);
    return newId;
  });

  const { sendMessage, messages, isLoading, error } = usePlanChatAssistant(projectId);

  useEffect(() => {
    if (urlProjectId) {
      setIsPlanStarted(true);
    }
  }, [urlProjectId]);

  useEffect(() => {
    const fetchProjectHistory = async () => {
      try {
        setIsLoadingHistory(true);
        
        const { data: chatData, error: chatError } = await supabase
          .from('plan_chat_history')
          .select('plan_id, conversation_id, created_at, user_message, ai_response')
          .order('created_at', { ascending: false });
          
        if (chatError) {
          console.error("Error fetching chat history:", chatError);
          setIsLoadingHistory(false);
          return;
        }
        
        const projectMap = new Map<string, ProjectHistoryItem>();
        
        chatData?.forEach(chat => {
          if (!projectMap.has(chat.plan_id)) {
            let title = "Project Plan";
            let snippet = "";
            
            if (chat.ai_response) {
              const aiResponse = chat.ai_response;
              
              const titleMatch = aiResponse.match(/# (.*?)(?:\n|$)/) || 
                             aiResponse.match(/\*\*(.*?)\*\*/) ||
                             aiResponse.match(/Title: (.*?)(?:\n|$)/);
                             
              if (titleMatch && titleMatch[1]) {
                title = titleMatch[1].trim();
              }
              
              const snippetMatch = aiResponse.match(/\n\n(.*?)(?:\n\n|$)/);
              if (snippetMatch && snippetMatch[1]) {
                snippet = snippetMatch[1].trim().substring(0, 120) + '...';
              } else {
                snippet = aiResponse.substring(0, 120) + '...';
              }
            }
            
            projectMap.set(chat.plan_id, {
              id: chat.plan_id,
              title,
              createdAt: new Date(chat.created_at),
              snippet,
              conversationId: chat.conversation_id
            });
          }
        });
        
        const projectHistoryArray = Array.from(projectMap.values());
        setProjectHistory(projectHistoryArray);
      } catch (error) {
        console.error("Error loading project history:", error);
      } finally {
        setIsLoadingHistory(false);
      }
    };
    
    fetchProjectHistory();
  }, []);

  useEffect(() => {
    if (error) {
      setShowConnectionAlert(true);
      const timer = setTimeout(() => setShowConnectionAlert(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [error]);

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

  const handleWebsiteSubmit = async (websiteData: WebsiteInputData) => {
    try {
      toast({
        title: "Processing Your Website",
        description: "Analyzing your website and preparing project context...",
        variant: "default"
      });
      
      let enhancedData = { ...websiteData };
      let analysisResults = null;
      
      if (websiteData.websiteUrl) {
        try {
          const { data, error } = await supabase.functions.invoke('analyze-website', {
            body: { url: websiteData.websiteUrl }
          });
          
          if (error) throw error;
          
          if (data.success) {
            analysisResults = data;
            
            if (!enhancedData.companyName && data.aiAnalysis.companyName) {
              enhancedData.companyName = data.aiAnalysis.companyName;
            }
            
            if (data.basicExtraction.socialLinks) {
              Object.keys(data.basicExtraction.socialLinks).forEach(platform => {
                if (!enhancedData.socialLinks[platform]) {
                  enhancedData.socialLinks[platform] = data.basicExtraction.socialLinks[platform];
                }
              });
            }
          }
        } catch (error) {
          console.error("Error analyzing website:", error);
        }
      }
      
      let initialMessage = `I'm creating a new ${enhancedData.companyName ? `project for ${enhancedData.companyName}` : 'project'}`;
      
      if (analysisResults) {
        initialMessage += `\n\nBased on website analysis, here's what I found:`;
        
        if (analysisResults.aiAnalysis.companyName) {
          initialMessage += `\n- Company: ${analysisResults.aiAnalysis.companyName}`;
        }
        
        if (analysisResults.aiAnalysis.industry) {
          initialMessage += `\n- Industry: ${analysisResults.aiAnalysis.industry}`;
        }
        
        if (analysisResults.aiAnalysis.companyDescription) {
          initialMessage += `\n- Description: ${analysisResults.aiAnalysis.companyDescription}`;
        }
        
        if (analysisResults.aiAnalysis.productsOrServices) {
          initialMessage += `\n- Products/Services: ${analysisResults.aiAnalysis.productsOrServices}`;
        }
        
        if (analysisResults.basicExtraction.socialLinks && Object.keys(analysisResults.basicExtraction.socialLinks).length > 0) {
          initialMessage += `\n- Social media presence: ${Object.keys(analysisResults.basicExtraction.socialLinks).join(', ')}`;
        }
      }
      
      if (enhancedData.projectGoals) {
        initialMessage += `\n\nProject goals: ${enhancedData.projectGoals}`;
      }
      
      if (enhancedData.targetAudience) {
        initialMessage += `\n\nTarget audience: ${enhancedData.targetAudience}`;
      }
      
      initialMessage += `\n\nCan you help me create a project plan based on this information?`;
      
      await sendMessage(initialMessage, undefined, {
        website_data: enhancedData,
        analysis_results: analysisResults
      });
      
      setIsManualInputOpen(false);
      setIsPlanStarted(true);
    } catch (error) {
      console.error("Error submitting to AI:", error);
      toast({
        title: "Error",
        description: "There was a problem processing your request. Please try again.",
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
    <ProjectDataProvider>
      <MainLayout>
        <TooltipProvider>
          <div className="container max-w-7xl mx-auto py-8 px-4 min-h-screen relative">
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
                <PrePlanState 
                  onShowProjectHistory={() => setShowProjectHistory(true)}
                  onStartPlanning={() => {
                    setIsPlanStarted(true);
                    // Don't navigate away, just set the state to show the planner UI
                  }}
                />
                
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
                            sessionStorage.setItem('planProjectId', project.id);
                            setProjectId(project.id);
                            setIsPlanStarted(true);
                            navigate(`/plan-builder/${project.id}`);
                          }}
                        >
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
                  
                  <div className="flex flex-wrap items-center gap-3">
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
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => setSplitView(!splitView)}
                          variant="outline"
                          className="border-siso-border text-siso-text hover:bg-siso-bg-card"
                        >
                          {splitView ? <LayoutGrid className="h-4 w-4" /> : <Layout className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {splitView ? 'Switch to chat only' : 'Show project overview'}
                      </TooltipContent>
                    </Tooltip>
                    
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        onClick={() => setIsWebsiteInputOpen(true)}
                        variant="outline"
                        className="border-siso-border text-siso-text hover:bg-siso-bg-card flex items-center gap-2"
                      >
                        <FileEdit className="w-4 h-4" />
                        Add Website
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

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={splitView ? "md:col-span-3" : "md:col-span-5"}
                  >
                    <div className="p-0.5 bg-gradient-to-r from-siso-red/40 to-siso-orange/40 rounded-xl h-[calc(100vh-12rem)]">
                      <EnhancedChatInterface 
                        title="AI Project Planner" 
                        welcomeMessage="I'll help create a detailed plan for your project. Feel free to ask questions or provide more details as we refine your plan."
                        inputPlaceholder="Add more details or ask questions about your plan..."
                        systemPrompt="You are a professional project planning assistant specialized in helping users create comprehensive software project plans. Help users define requirements, select features, estimate timelines, and budget effectively. When possible, return structured data about the project in JSON format to help build the project overview."
                        usePlanAssistant={true}
                        projectId={projectId}
                        className="border-0 bg-transparent h-full"
                      />
                    </div>
                  </motion.div>
                  
                  {splitView && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="md:col-span-2 h-[calc(100vh-12rem)] bg-siso-bg-card/20 backdrop-blur-sm border border-siso-border rounded-xl overflow-hidden"
                    >
                      <LiveProjectOverview />
                    </motion.div>
                  )}
                </div>
              </>
            )}

            <WebsiteInputSheet 
              isOpen={isWebsiteInputOpen} 
              onClose={() => setIsWebsiteInputOpen(false)}
              onSubmit={handleWebsiteSubmit}
            />
            
            <ManualInputSheet 
              isOpen={isManualInputOpen} 
              onClose={() => setIsManualInputOpen(false)}
              onSubmitToAI={handleSubmitToAI}
            />
          </div>
        </TooltipProvider>
      </MainLayout>
    </ProjectDataProvider>
  );
};

const EnhancedChatInterface = React.memo(({ projectId, ...props }: React.ComponentProps<typeof ChatInterface>) => {
  const { updateProjectData, extractDataFromAIResponse } = useProjectData();
  
  const handleAssistantResponse = useCallback((content: string) => {
    if (content && content.trim() !== '') {
      extractDataFromAIResponse(content);
    }
  }, [extractDataFromAIResponse]);
  
  useEffect(() => {
    const fetchLatestMessage = async () => {
      if (!props.usePlanAssistant || !projectId) return;
      
      try {
        const { data: messages, error } = await supabase
          .from('plan_chat_history')
          .select('*')
          .eq('plan_id', projectId)
          .order('created_at', { ascending: false })
          .limit(1);
          
        if (error) throw error;
            
        const latestAssistantMessage = messages?.[0]?.ai_response;
        
        if (latestAssistantMessage) {
          extractDataFromAIResponse(latestAssistantMessage);
        }
      } catch (err) {
        console.error("Error fetching latest message:", err);
      }
    };
    
    fetchLatestMessage();
  }, [projectId, props.usePlanAssistant, extractDataFromAIResponse]);
  
  return <ChatInterface {...props} projectId={projectId} onAssistantResponse={handleAssistantResponse} />;
});

EnhancedChatInterface.displayName = 'EnhancedChatInterface';
