import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { motion } from 'framer-motion';
import { ArrowLeft, FileEdit, Link, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePlanChatAssistant } from '@/hooks/use-plan-chat-assistant';
import { useToast } from '@/hooks/use-toast';
import { WebsiteInputSheet, WebsiteInputData } from '@/components/plan-builder/WebsiteInputSheet';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ManualInputSheet } from '@/components/plan-builder/ManualInputSheet';
import { SmartProjectOnboarding } from '@/components/plan-builder/SmartProjectOnboarding';

export default function NewProject() {
  const [projectId, setProjectId] = useState<string>(() => {
    // Create a new project ID for this session
    const newId = `plan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('planProjectId', newId);
    return newId;
  });
  
  const [isWebsiteInputOpen, setIsWebsiteInputOpen] = useState(false);
  const [isManualInputOpen, setIsManualInputOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showChat, setShowChat] = useState(false);
  
  const { sendMessage, messages, isLoading, error: chatError } = usePlanChatAssistant(projectId);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // If we choose to skip onboarding or complete it, this function will be called
  const startChatInterface = async (projectData?: any) => {
    try {
      setConnectionError(null);
      setShowOnboarding(false);
      setShowChat(true);
      
      if (projectData) {
        // Prepare a message based on the collected data
        let prompt = `
        I've completed the onboarding process and provided the following information:
        
        Company Name: ${projectData.businessContext.companyName || 'Not specified'}
        `;
        
        if (projectData.businessContext.website) {
          prompt += `Website: ${projectData.businessContext.website}\n`;
        }
        
        // Add social links if any
        const socialLinks = Object.entries(projectData.businessContext.socialLinks || {})
          .filter(([_, value]) => value && typeof value === 'string' && value.trim() !== '')
          .map(([platform, url]) => `${platform}: ${url}`)
          .join('\n');
          
        if (socialLinks) {
          prompt += `\nSocial Media:\n${socialLinks}\n`;
        }
        
        prompt += `
        Industry: ${projectData.businessContext.industry || 'Not specified'}
        Target Audience: ${projectData.businessContext.targetAudience || 'Not specified'}
        Main Goal: ${projectData.timelineBudget.goals || 'Not specified'}
        `;
        
        if (projectData.projectType) {
          prompt += `Project Type: ${projectData.projectType}\n`;
        }
        
        if (projectData.projectScale) {
          prompt += `Project Scale: ${projectData.projectScale}\n`;
        }
        
        // Add selected features if any
        const selectedFeatures = Object.entries(projectData.features || {})
          .filter(([_, value]: [string, any]) => value.selected)
          .map(([id, value]: [string, any]) => {
            const feature = id;
            return `${feature} (${value.priority})`;
          }).join(', ');
          
        if (selectedFeatures) {
          prompt += `\nSelected Features: ${selectedFeatures}\n`;
        }
        
        prompt += `
        Based on this information, could you please create a project plan that includes:
        1. Project scope and objectives
        2. Technical requirements
        3. Timeline with key milestones
        4. Budget breakdown
        5. Suggested team structure
        6. Recommended approach
        
        Please help me refine this plan and provide any additional advice.`;
        
        await sendMessage(prompt);
      } else {
        // Just start with a welcome message if the user skipped onboarding
        const initialPrompt = "Hi! I'm here to help you plan your new project. You can provide your website URL, social media links, or basic information using the buttons above, or we can start the planning process through our chat. What would you like to do?";
        await sendMessage(initialPrompt);
      }
    } catch (error) {
      console.error("Error starting conversation:", error);
      setConnectionError(
        "There was a problem connecting to the AI assistant. Please check if the PLAN_BUILDER_ASSISTANT_ID is correctly configured."
      );
      toast({
        title: "Connection Error",
        description: "There was a problem starting the conversation. The assistant might be incorrectly configured.",
        variant: "destructive"
      });
    }
  };

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
    
    // Start chat with the constructed prompt
    setShowOnboarding(false);
    setShowChat(true);
    
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
    
    setIsWebsiteInputOpen(false);
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
      <div className="container max-w-6xl mx-auto py-6 px-4 min-h-screen relative">
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
        
        <div className="mb-4 flex items-center justify-between relative z-10">
          <Button 
            onClick={handleGoBack}
            variant="outline"
            className="h-8 text-sm border-siso-border text-siso-text hover:bg-siso-bg-card flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </Button>
          
          {showChat && (
            <div className="flex gap-2">
              <Button 
                onClick={() => setIsWebsiteInputOpen(true)}
                variant="outline"
                className="h-8 text-sm border-siso-border bg-card/50 backdrop-blur-sm text-siso-text hover:bg-siso-bg-alt hover:border-siso-border-hover flex items-center gap-2 transition-all duration-300"
              >
                <Link className="w-3.5 h-3.5" />
                <span>Website Analysis</span>
              </Button>
              
              <Button 
                onClick={() => setIsManualInputOpen(true)}
                variant="outline"
                className="h-8 text-sm border-siso-border bg-card/50 backdrop-blur-sm text-siso-text hover:bg-siso-bg-alt hover:border-siso-border-hover flex items-center gap-2 transition-all duration-300"
              >
                <FileEdit className="w-3.5 h-3.5" />
                <span>Manual Input</span>
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 relative z-10">
          {connectionError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Connection Error</AlertTitle>
              <AlertDescription>
                {connectionError}
              </AlertDescription>
            </Alert>
          )}
          
          {showOnboarding && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SmartProjectOnboarding 
                onComplete={startChatInterface} 
                onSkip={() => startChatInterface()} 
              />
            </motion.div>
          )}
          
          {showChat && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-0.5 bg-gradient-to-r from-siso-red/40 to-siso-orange/40 rounded-xl shadow-lg">
                <ChatInterface 
                  title="Project Planning Assistant" 
                  welcomeMessage="I'll help you plan your project. Tell me about your goals, requirements, and any specific needs..."
                  inputPlaceholder="Share details about your project, or ask me questions..."
                  systemPrompt="You are a helpful project planning assistant. Guide the user through creating a new project by asking for information in a conversational way. Suggest they provide their website URL or social links for better analysis. Ask for: project/company name, website URL, social media profiles, project goals, target audience, and requirements. Be friendly and conversational."
                  usePlanAssistant={true}
                  projectId={projectId}
                  className="border-0 bg-transparent"
                />
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Input Sheets */}
        <WebsiteInputSheet 
          isOpen={isWebsiteInputOpen}
          onClose={() => setIsWebsiteInputOpen(false)}
          onSubmit={handleWebsiteSubmit}
        />
        
        <ManualInputSheet
          isOpen={isManualInputOpen}
          onClose={() => setIsManualInputOpen(false)}
          onSubmitToAI={(prompt, formData) => {
            return sendMessage(prompt, undefined, formData);
          }}
        />
      </div>
    </MainLayout>
  );
}
