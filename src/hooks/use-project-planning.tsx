
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
  getProjectPlan,
  deleteProject,
  updateProjectPlan
} from '@/services/project-plan.service';

interface ProjectPlanningState {
  messages: ChatMessage[];
  isLoading: boolean;
  isLoadingHistory: boolean;
  currentProjectId: string | null;
  chatHistory: ProjectChatHistory[];
  userProjects: ProjectPlan[];
  currentProject: ProjectPlan | null;
  useStreaming: boolean;
  error: string | null;
}

interface ProjectPlanningActions {
  sendMessage: (message: string, formData?: Record<string, any>) => Promise<void>;
  startNewProject: (title?: string, description?: string) => Promise<boolean>;
  switchProject: (projectId: string) => Promise<boolean>;
  loadChatHistory: () => Promise<void>;
  toggleStreaming: () => void;
  updateProject: (updates: Partial<ProjectPlan>) => Promise<boolean>;
  deleteCurrentProject: () => Promise<boolean>;
  clearMessages: () => void;
  retryLastMessage: () => Promise<void>;
}

export function useProjectPlanning(): ProjectPlanningState & ProjectPlanningActions & { isAuthenticated: boolean } {
  const [state, setState] = useState<ProjectPlanningState>({
    messages: [],
    isLoading: false,
    isLoadingHistory: false,
    currentProjectId: null,
    chatHistory: [],
    userProjects: [],
    currentProject: null,
    useStreaming: true,
    error: null
  });
  
  const streamControllerRef = useRef<AbortController | null>(null);
  const lastMessageRef = useRef<{ message: string, formData?: Record<string, any> } | null>(null);
  const { toast } = useToast();

  // Check if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Helper to update state immutably
  const updateState = useCallback((updates: Partial<ProjectPlanningState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);
  
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
  const loadUserProjects = useCallback(async () => {
    try {
      const projects = await getAllUserProjects();
      updateState({ userProjects: projects });
      
      // If we have projects but no current project selected, select the most recent one
      if (projects.length > 0 && !state.currentProjectId) {
        const mostRecentProject = projects[0]; // Already sorted by updated_at DESC
        updateState({
          currentProjectId: mostRecentProject.id,
          currentProject: mostRecentProject
        });
      }
    } catch (error) {
      console.error("Error loading user projects:", error);
      toast({
        title: "Error",
        description: "Failed to load your projects",
        variant: "destructive"
      });
    }
  }, [state.currentProjectId, toast, updateState]);

  // Load project chat history if project ID exists or changes
  useEffect(() => {
    if (state.currentProjectId) {
      loadChatHistory();
      loadProjectDetails();
    } else {
      // Clear messages if no project is selected
      updateState({
        messages: [],
        chatHistory: [],
        currentProject: null
      });
    }
  }, [state.currentProjectId]);

  const loadProjectDetails = useCallback(async () => {
    if (!state.currentProjectId) return;
    
    try {
      const project = await getProjectPlan(state.currentProjectId);
      if (project) {
        updateState({ currentProject: project });
      }
    } catch (error) {
      console.error("Error loading project details:", error);
      toast({
        title: "Error",
        description: "Failed to load project details",
        variant: "destructive"
      });
    }
  }, [state.currentProjectId, toast, updateState]);

  const loadChatHistory = useCallback(async () => {
    if (!state.currentProjectId) return;
    
    updateState({ isLoadingHistory: true });
    
    try {
      const history = await getProjectChatHistory(state.currentProjectId);
      
      // Convert to chat message format
      const chatMessages: ChatMessage[] = [];
      history.forEach(item => {
        chatMessages.push({ role: 'user', content: item.user_message });
        chatMessages.push({ role: 'assistant', content: item.ai_response });
      });
      
      updateState({
        chatHistory: history,
        messages: chatMessages.length > 0 ? chatMessages : []
      });
    } catch (error) {
      console.error("Error loading chat history:", error);
      toast({
        title: "Error",
        description: "Failed to load chat history",
        variant: "destructive"
      });
    } finally {
      updateState({ isLoadingHistory: false });
    }
  }, [state.currentProjectId, toast, updateState]);

  const switchProject = useCallback(async (projectId: string) => {
    try {
      // Abort any ongoing streaming
      if (streamControllerRef.current) {
        streamControllerRef.current.abort();
        streamControllerRef.current = null;
      }
      
      updateState({
        currentProjectId: projectId,
        messages: [], // Clear messages until history loads
        error: null
      });
      
      // Find project in cached list
      const project = state.userProjects.find(p => p.id === projectId);
      if (project) {
        updateState({ currentProject: project });
      }
      
      return true;
    } catch (error) {
      console.error("Error switching projects:", error);
      toast({
        title: "Error",
        description: "Failed to switch projects",
        variant: "destructive"
      });
      return false;
    }
  }, [state.userProjects, toast, updateState]);

  const startNewProject = useCallback(async (title: string = 'New Project', description?: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save project data",
        variant: "destructive"
      });
      return false;
    }
    
    try {
      const projectId = await createProjectPlan(title, description);
      if (projectId) {
        updateState({
          currentProjectId: projectId,
          messages: []
        });
        
        // Refresh projects list
        await loadUserProjects();
        
        return true;
      }
      
      toast({
        title: "Error",
        description: "Failed to create a new project",
        variant: "destructive"
      });
      return false;
    } catch (error) {
      console.error("Error creating new project:", error);
      toast({
        title: "Error",
        description: `Failed to create a new project: ${error.message}`,
        variant: "destructive"
      });
      return false;
    }
  }, [isAuthenticated, loadUserProjects, toast, updateState]);

  const updateProject = useCallback(async (updates: Partial<ProjectPlan>): Promise<boolean> => {
    if (!state.currentProjectId) {
      toast({
        title: "No Project Selected",
        description: "Please select a project to update",
        variant: "warning"
      });
      return false;
    }
    
    try {
      const success = await updateProjectPlan(state.currentProjectId, updates);
      if (success) {
        // Update current project
        if (state.currentProject) {
          updateState({
            currentProject: {
              ...state.currentProject,
              ...updates
            }
          });
        }
        
        // Refresh projects list
        await loadUserProjects();
        
        toast({
          title: "Project Updated",
          description: "Project details have been updated successfully"
        });
        
        return true;
      }
      
      toast({
        title: "Update Failed",
        description: "Failed to update project details",
        variant: "destructive"
      });
      return false;
    } catch (error) {
      console.error("Error updating project:", error);
      toast({
        title: "Error",
        description: `Failed to update project: ${error.message}`,
        variant: "destructive"
      });
      return false;
    }
  }, [state.currentProject, state.currentProjectId, loadUserProjects, toast, updateState]);

  const deleteCurrentProject = useCallback(async (): Promise<boolean> => {
    if (!state.currentProjectId) {
      toast({
        title: "No Project Selected",
        description: "Please select a project to delete",
        variant: "warning"
      });
      return false;
    }
    
    try {
      const success = await deleteProject(state.currentProjectId);
      if (success) {
        // Find next project to select
        const remainingProjects = state.userProjects.filter(p => p.id !== state.currentProjectId);
        const nextProject = remainingProjects.length > 0 ? remainingProjects[0] : null;
        
        updateState({
          currentProjectId: nextProject?.id || null,
          currentProject: nextProject,
          messages: [],
          chatHistory: []
        });
        
        // Refresh projects list
        await loadUserProjects();
        
        toast({
          title: "Project Deleted",
          description: "Project has been deleted successfully"
        });
        
        return true;
      }
      
      toast({
        title: "Delete Failed",
        description: "Failed to delete project",
        variant: "destructive"
      });
      return false;
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error",
        description: `Failed to delete project: ${error.message}`,
        variant: "destructive"
      });
      return false;
    }
  }, [state.currentProjectId, state.userProjects, loadUserProjects, toast, updateState]);

  const sendMessage = useCallback(async (message: string, formData?: Record<string, any>) => {
    if (!message.trim() || state.isLoading) return;

    // Save the last message for retry functionality
    lastMessageRef.current = { message, formData };

    // Abort any existing stream
    if (streamControllerRef.current) {
      streamControllerRef.current.abort();
      streamControllerRef.current = null;
    }

    updateState({ 
      isLoading: true,
      error: null
    });

    // Add user message
    const updatedMessages = [
      ...state.messages,
      { role: 'user', content: message }
    ];
    
    updateState({ messages: updatedMessages });
    
    // Add placeholder for streaming response
    if (state.useStreaming) {
      updateState({
        messages: [
          ...updatedMessages,
          { role: 'assistant', content: '', loading: true }
        ]
      });
    }
    
    try {
      if (state.useStreaming) {
        // Use streaming API
        let responseContent = '';
        
        streamControllerRef.current = streamChatWithPlanAssistant(
          updatedMessages,
          state.currentProjectId || undefined,
          formData,
          // Process each chunk as it arrives
          (chunk) => {
            responseContent += chunk;
            
            updateState(prev => {
              const newMessages = [...prev.messages];
              const lastIndex = newMessages.length - 1;
              
              if (lastIndex >= 0 && newMessages[lastIndex].role === 'assistant') {
                // Update the last message with the accumulated response
                newMessages[lastIndex] = {
                  role: 'assistant',
                  content: responseContent,
                  loading: false
                };
              }
              
              return { messages: newMessages };
            });
          },
          // Complete handler
          (fullResponse) => {
            updateState({ isLoading: false });
            
            // After completion, refresh the projects list to get updated metadata
            loadUserProjects();
          }
        );
      } else {
        // Use traditional non-streaming approach
        const response = await chatWithPlanAssistant(
          updatedMessages, 
          state.currentProjectId || undefined,
          formData
        );
        
        if (response) {
          // Add assistant response
          updateState({
            messages: [
              ...updatedMessages,
              { role: 'assistant', content: response }
            ],
            isLoading: false
          });
          
          // After completion, refresh the projects list to get updated metadata
          loadUserProjects();
        } else {
          throw new Error("Failed to get response from assistant");
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      updateState({
        error: error.message || "An unexpected error occurred",
        isLoading: false
      });
      
      // Handle removing loading message if streaming was enabled
      if (state.useStreaming) {
        updateState(prev => {
          const newMessages = [...prev.messages];
          const lastMessage = newMessages[newMessages.length - 1];
          
          if (lastMessage?.role === 'assistant' && lastMessage.loading) {
            return { messages: newMessages.slice(0, -1) };
          }
          
          return { messages: newMessages };
        });
      }
      
      toast({
        title: "Error",
        description: error.message || "Failed to get a response. Please try again.",
        variant: "destructive"
      });
    }
  }, [state.isLoading, state.messages, state.useStreaming, state.currentProjectId, loadUserProjects, toast, updateState]);

  // Toggle streaming mode
  const toggleStreaming = useCallback(() => {
    updateState(prev => ({ useStreaming: !prev.useStreaming }));
    
    toast({
      title: state.useStreaming ? "Streaming disabled" : "Streaming enabled",
      description: state.useStreaming 
        ? "Responses will be shown after completion" 
        : "Responses will stream in real-time"
    });
  }, [state.useStreaming, toast, updateState]);

  // Clear messages
  const clearMessages = useCallback(() => {
    updateState({ 
      messages: [],
      error: null
    });
  }, [updateState]);

  // Retry last message
  const retryLastMessage = useCallback(async () => {
    if (!lastMessageRef.current) {
      toast({
        title: "No message to retry",
        description: "There is no previous message to retry",
        variant: "warning"
      });
      return;
    }
    
    const { message, formData } = lastMessageRef.current;
    
    // Remove the last user message and any assistant response
    updateState(prev => {
      const newMessages = [...prev.messages];
      
      // Remove the last assistant message if it exists
      if (newMessages.length > 0 && newMessages[newMessages.length - 1].role === 'assistant') {
        newMessages.pop();
      }
      
      // Remove the last user message if it exists
      if (newMessages.length > 0 && newMessages[newMessages.length - 1].role === 'user') {
        newMessages.pop();
      }
      
      return { messages: newMessages, error: null };
    });
    
    // Resend the message
    await sendMessage(message, formData);
  }, [sendMessage, toast, updateState]);

  return {
    ...state,
    isAuthenticated,
    sendMessage,
    startNewProject,
    switchProject,
    loadChatHistory,
    toggleStreaming,
    updateProject,
    deleteCurrentProject,
    clearMessages,
    retryLastMessage
  };
}
