
import { useState, useEffect, useRef, useCallback } from 'react';
import { ChatMessage } from '@/types/chat';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  createProjectPlan, 
  chatWithPlanAssistant,
  streamChatWithPlanAssistant,
  getProjectChatHistory,
  getAllUserProjects,
  ProjectChatHistory,
  ProjectPlan,
  getProjectPlan
} from '@/services/project-plan.service';

export function useProjectPlanning() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ProjectChatHistory[]>([]);
  const [userProjects, setUserProjects] = useState<ProjectPlan[]>([]);
  const [useStreaming, setUseStreaming] = useState(true);
  const [currentProject, setCurrentProject] = useState<ProjectPlan | null>(null);
  const streamControllerRef = useRef<AbortController | null>(null);
  const { toast } = useToast();

  // Check if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  useEffect(() => {
    // Check auth status
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const newAuthState = !!session;
        setIsAuthenticated(newAuthState);
        
        // If user just logged in, load their projects
        if (newAuthState && !isAuthenticated) {
          loadUserProjects();
        }
      }
    );
    
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      if (session) {
        loadUserProjects();
      }
    });
    
    return () => {
      subscription.unsubscribe();
      
      // Cleanup stream controller if exists
      if (streamControllerRef.current) {
        streamControllerRef.current.abort();
      }
    };
  }, []);

  // Load user projects
  const loadUserProjects = async () => {
    const projects = await getAllUserProjects();
    setUserProjects(projects);
    
    // If we have projects but no current project selected, select the most recent one
    if (projects.length > 0 && !currentProjectId) {
      const mostRecentProject = projects[0]; // Already sorted by updated_at DESC
      setCurrentProjectId(mostRecentProject.id);
      setCurrentProject(mostRecentProject);
    }
  };

  // Load project chat history if project ID exists or changes
  useEffect(() => {
    if (currentProjectId) {
      loadChatHistory();
      loadProjectDetails();
    } else {
      // Clear messages if no project is selected
      setMessages([]);
      setChatHistory([]);
      setCurrentProject(null);
    }
  }, [currentProjectId]);

  const loadProjectDetails = async () => {
    if (!currentProjectId) return;
    
    const project = await getProjectPlan(currentProjectId);
    if (project) {
      setCurrentProject(project);
    }
  };

  const loadChatHistory = async () => {
    if (!currentProjectId) return;
    
    setIsLoadingHistory(true);
    
    try {
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
      } else {
        // Reset messages if no history found
        setMessages([]);
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
      toast({
        title: "Error",
        description: "Failed to load chat history",
        variant: "destructive"
      });
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const switchProject = async (projectId: string) => {
    // Abort any ongoing streaming
    if (streamControllerRef.current) {
      streamControllerRef.current.abort();
      streamControllerRef.current = null;
    }
    
    setCurrentProjectId(projectId);
    
    // Find project in cached list
    const project = userProjects.find(p => p.id === projectId);
    if (project) {
      setCurrentProject(project);
    }
    
    return true;
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
      
      // Refresh projects list
      loadUserProjects();
      
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

    // Abort any existing stream
    if (streamControllerRef.current) {
      streamControllerRef.current.abort();
      streamControllerRef.current = null;
    }

    setIsLoading(true);

    // Add user message
    const updatedMessages = [
      ...messages,
      { role: 'user', content: message }
    ];
    setMessages(updatedMessages);
    
    // Add placeholder for streaming response
    if (useStreaming) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: '', loading: true }
      ]);
    }
    
    try {
      if (useStreaming) {
        // Use streaming API
        let responseContent = '';
        
        streamControllerRef.current = streamChatWithPlanAssistant(
          updatedMessages,
          currentProjectId || undefined,
          formData,
          // Process each chunk as it arrives
          (chunk) => {
            setMessages(prev => {
              const newMessages = [...prev];
              const lastIndex = newMessages.length - 1;
              
              if (lastIndex >= 0 && newMessages[lastIndex].role === 'assistant') {
                // Update the last message with the accumulated response
                newMessages[lastIndex] = {
                  role: 'assistant',
                  content: responseContent + chunk,
                  loading: false
                };
              }
              
              return newMessages;
            });
            
            // Accumulate the response content
            responseContent += chunk;
          },
          // Complete handler
          (fullResponse) => {
            setIsLoading(false);
            
            // After completion, refresh the projects list to get updated metadata
            loadUserProjects();
          }
        );
      } else {
        // Use traditional non-streaming approach
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
          
          // After completion, refresh the projects list to get updated metadata
          loadUserProjects();
        } else {
          toast({
            title: "Error",
            description: "Failed to get a response. Please try again.",
            variant: "destructive"
          });
        }
        
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  // Toggle streaming mode
  const toggleStreaming = () => {
    setUseStreaming(prev => !prev);
    toast({
      title: useStreaming ? "Streaming disabled" : "Streaming enabled",
      description: useStreaming 
        ? "Responses will be shown after completion" 
        : "Responses will stream in real-time"
    });
  };

  return {
    messages,
    isLoading,
    isLoadingHistory,
    currentProjectId,
    chatHistory,
    isAuthenticated,
    useStreaming,
    userProjects,
    currentProject,
    sendMessage,
    startNewProject,
    loadChatHistory,
    toggleStreaming,
    switchProject
  };
}
