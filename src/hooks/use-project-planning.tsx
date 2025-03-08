
import { useState, useEffect } from 'react';
import { ChatMessage } from '@/types/chat';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  createProjectPlan, 
  chatWithPlanAssistant, 
  getProjectChatHistory,
  ProjectChatHistory
} from '@/services/project-plan.service';

export function useProjectPlanning() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ProjectChatHistory[]>([]);
  const { toast } = useToast();

  // Check if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  useEffect(() => {
    // Check auth status
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session);
      }
    );
    
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Load project history if project ID exists
  useEffect(() => {
    if (currentProjectId) {
      loadChatHistory();
    }
  }, [currentProjectId]);

  const loadChatHistory = async () => {
    if (!currentProjectId) return;
    
    const history = await getProjectChatHistory(currentProjectId);
    setChatHistory(history);
    
    // Convert to chat message format
    const chatMessages: ChatMessage[] = [];
    history.forEach(item => {
      chatMessages.push({ role: 'user', content: item.user_message });
      chatMessages.push({ role: 'assistant', content: item.ai_response });
    });
    
    if (chatMessages.length > 0) {
      setMessages(chatMessages);
    }
  };

  const startNewProject = async (title: string = 'New Project') => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save project data",
        variant: "destructive"
      });
      return false;
    }
    
    const projectId = await createProjectPlan(title);
    if (projectId) {
      setCurrentProjectId(projectId);
      setMessages([]);
      return true;
    }
    
    toast({
      title: "Error",
      description: "Failed to create a new project",
      variant: "destructive"
    });
    return false;
  };

  const sendMessage = async (message: string, formData?: Record<string, any>) => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);

    // Add user message
    const updatedMessages = [
      ...messages,
      { role: 'user', content: message }
    ];
    setMessages(updatedMessages);
    
    try {
      // Call OpenAI via our edge function
      const response = await chatWithPlanAssistant(
        updatedMessages, 
        currentProjectId || undefined,
        formData
      );
      
      if (response) {
        // Add assistant response
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: response }
        ]);
      } else {
        toast({
          title: "Error",
          description: "Failed to get a response. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    currentProjectId,
    chatHistory,
    isAuthenticated,
    sendMessage,
    startNewProject,
    loadChatHistory
  };
}
