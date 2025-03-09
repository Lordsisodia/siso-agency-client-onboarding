
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { motion } from 'framer-motion';
import { ArrowLeft, FileEdit, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePlanChatAssistant } from '@/hooks/use-plan-chat-assistant';
import { useToast } from '@/hooks/use-toast';
import { WebsiteInputSheet, WebsiteInputData } from '@/components/plan-builder/WebsiteInputSheet';
import { supabase } from '@/integrations/supabase/client';

export default function NewProject() {
  const [projectId, setProjectId] = useState<string>(() => {
    // Create a new project ID for this session
    const newId = `plan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('planProjectId', newId);
    return newId;
  });
  
  const [isWebsiteInputOpen, setIsWebsiteInputOpen] = useState(true); // Open by default
  const { sendMessage, messages, isLoading, error } = usePlanChatAssistant(projectId);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Send an initial message to start the conversation
  useEffect(() => {
    const initialPrompt = "Hi! I'm here to help you plan your new project. You can provide your website URL, social media links, or basic information using the 'Submit Website or Info' button, or we can start the planning process through our chat. What would you like to do?";
    
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

  const handleWebsiteSubmit = async (data: WebsiteInputData) => {
    try {
      let analysisContent = "";
      
      // Attempt to analyze website if URL is provided
      if (data.websiteUrl) {
        try {
          toast({
            title: "Analyzing Website",
            description: "Please wait while we analyze your website...",
          });
          
          const { data: websiteData, error } = await supabase.functions.invoke('analyze-website', {
            body: { url: data.websiteUrl }
          });
          
          if (error) throw error;
          
          if (websiteData?.success) {
            // If analysis succeeded, add the data to our content
            analysisContent = `I've analyzed your website (${data.websiteUrl}) and here's what I found:
            - Company: ${websiteData.aiAnalysis.companyName || data.companyName || "Not detected"}
            - Industry: ${websiteData.aiAnalysis.industry || "Not detected"}
            - Description: ${websiteData.aiAnalysis.companyDescription || "Not detected"}
            
            Based on this analysis, I'll help you create an effective project plan.`;
          }
        } catch (err) {
          console.error("Error analyzing website:", err);
          analysisContent = `I tried to analyze your website (${data.websiteUrl}) but encountered an issue. Let's proceed with the information you've provided.`;
        }
      }
      
      // Construct a prompt based on the user's input
      const prompt = `
      The user has provided the following information:
      ${data.companyName ? `- Company Name: ${data.companyName}` : ''}
      ${data.websiteUrl ? `- Website: ${data.websiteUrl}` : ''}
      ${data.socialLinks.facebook ? `- Facebook: ${data.socialLinks.facebook}` : ''}
      ${data.socialLinks.twitter ? `- Twitter: ${data.socialLinks.twitter}` : ''}
      ${data.socialLinks.linkedin ? `- LinkedIn: ${data.socialLinks.linkedin}` : ''}
      ${data.socialLinks.instagram ? `- Instagram: ${data.socialLinks.instagram}` : ''}
      ${data.projectGoals ? `- Project Goals: ${data.projectGoals}` : ''}
      ${data.targetAudience ? `- Target Audience: ${data.targetAudience}` : ''}
      
      ${analysisContent ? analysisContent : ''}
      
      Based on this information, please start helping them plan their project by asking relevant questions to gather any missing details.`;
      
      // Send the constructed prompt to the AI
      await sendMessage(prompt);
      
    } catch (error) {
      console.error("Error processing website submission:", error);
      toast({
        title: "Error",
        description: "There was a problem processing your website information. Please try again.",
        variant: "destructive"
      });
    }
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
          
          <Button 
            onClick={() => setIsWebsiteInputOpen(true)}
            variant="outline"
            className="border-siso-border text-siso-text hover:bg-siso-bg-card flex items-center gap-2"
          >
            <FileEdit className="w-4 h-4" />
            <span>Submit Website or Info</span>
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
                welcomeMessage="I'll help you create a new project plan. You can submit your website or info using the button above, or we can start the conversation here..."
                inputPlaceholder="Share details about your project (website, goals, audience, etc.)"
                systemPrompt="You are a helpful project planning assistant. Guide the user through creating a new project by asking for information in a conversational way. Suggest they provide their website URL or social links for better analysis. Ask for: project/company name, website URL, social media profiles, project goals, target audience, and requirements. Be friendly and conversational."
                usePlanAssistant={true}
                projectId={projectId}
                className="border-0 bg-transparent"
              />
            </div>
          </motion.div>
        </div>
        
        {/* Website Input Sheet */}
        <WebsiteInputSheet 
          isOpen={isWebsiteInputOpen}
          onClose={() => setIsWebsiteInputOpen(false)}
          onSubmit={handleWebsiteSubmit}
        />
      </div>
    </MainLayout>
  );
}
