
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlanChatAssistant } from '@/hooks/use-plan-chat-assistant';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { WebsiteInputData } from '@/components/plan-builder/WebsiteInputSheet';
import { useAuth } from '@/hooks/useAuth';

export const useNewProject = () => {
  // Create a new project ID for this session
  const [projectId] = useState<string>(() => {
    const newId = `plan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('planProjectId', newId);
    return newId;
  });
  
  const [isWebsiteInputOpen, setIsWebsiteInputOpen] = useState(false);
  const [isManualInputOpen, setIsManualInputOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [savedProjectId, setSavedProjectId] = useState<string | null>(null);
  
  const { sendMessage, messages, isLoading, error: chatError } = usePlanChatAssistant(projectId);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleGoBack = () => {
    navigate('/plan-builder');
  };

  // Save project data to the database
  const saveProject = async (projectData: any) => {
    try {
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to save your project",
          variant: "destructive"
        });
        return null;
      }

      // First, create the project record
      const { data: insertedProject, error: projectError } = await supabase
        .from('projects')
        .insert({
          user_id: user.id,
          title: projectData.businessContext?.companyName || 'New Project',
          description: projectData.goals || 'Project created via onboarding wizard'
        })
        .select('id')
        .single();

      if (projectError) {
        console.error("Error saving project:", projectError);
        toast({
          title: "Error",
          description: "There was a problem saving your project. Please try again.",
          variant: "destructive"
        });
        return null;
      }

      // Then, save the project details
      const { error: detailsError } = await supabase
        .from('project_details')
        .insert({
          project_id: insertedProject.id,
          business_context: projectData.businessContext || {},
          goals: projectData.goals || '',
          features: projectData.features || {}
        });

      if (detailsError) {
        console.error("Error saving project details:", detailsError);
        toast({
          title: "Error",
          description: "There was a problem saving your project details. Please try again.",
          variant: "destructive"
        });
        return null;
      }

      setSavedProjectId(insertedProject.id);
      return insertedProject.id;
    } catch (error) {
      console.error("Error in saveProject:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while saving your project.",
        variant: "destructive"
      });
      return null;
    }
  };

  // If we choose to skip onboarding or complete it, this function will be called
  const startChatInterface = async (projectData?: any) => {
    try {
      setConnectionError(null);
      setShowOnboarding(false);
      setShowChat(true);
      
      if (projectData) {
        // Save the project data to Supabase
        await saveProject(projectData);
        
        // Prepare a message based on the collected data
        let prompt = `
        I've completed the onboarding process and provided the following information:
        
        Company Name: ${projectData.businessContext?.companyName || 'Not specified'}
        `;
        
        if (projectData.businessContext?.website) {
          prompt += `Website: ${projectData.businessContext.website}\n`;
        }
        
        // Add social links if any
        const socialLinks = Object.entries(projectData.businessContext?.socialLinks || {})
          .filter(([_, value]) => value && typeof value === 'string' && value.trim() !== '')
          .map(([platform, url]) => `${platform}: ${url}`)
          .join('\n');
          
        if (socialLinks) {
          prompt += `\nSocial Media:\n${socialLinks}\n`;
        }
        
        prompt += `
        Industry: ${projectData.businessContext?.industry || 'Not specified'}
        Target Audience: ${projectData.businessContext?.targetAudience || 'Not specified'}
        Main Goal: ${projectData.goals || 'Not specified'}
        `;
        
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
      
      // Prepare project data to save later
      const projectData = {
        businessContext: {
          companyName: data.companyName || '',
          website: data.websiteUrl || '',
          socialLinks: data.socialLinks || {},
          industry: '', // Will be updated later through chat
          targetAudience: data.targetAudience || ''
        },
        goals: data.projectGoals || '',
        features: {}
      };
      
      // Start chat with the constructed prompt
      setShowOnboarding(false);
      setShowChat(true);
      
      // Save to database
      if (user) {
        await saveProject(projectData);
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

  return {
    projectId,
    savedProjectId,
    isWebsiteInputOpen,
    setIsWebsiteInputOpen,
    isManualInputOpen,
    setIsManualInputOpen,
    showOnboarding,
    showChat,
    connectionError,
    messages,
    isLoading,
    chatError,
    handleGoBack,
    startChatInterface,
    handleWebsiteSubmit,
    sendMessage,
    saveProject
  };
};
