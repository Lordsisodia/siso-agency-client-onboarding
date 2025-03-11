
import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

import {
  createProjectPlan,
  chatWithPlanAssistant,
  streamChatWithPlanAssistant,
  getProjectChatHistory,
  getAllUserProjects,
  ProjectPlan,
  getProjectPlan,
  deleteProject,
  updateProjectPlan
} from '@/services/project-plan.service';

// Define the state interface
interface ProjectPlanningState {
  projects: ProjectPlan[];
  currentProject: ProjectPlan | null;
  messages: any[];
  loading: boolean;
  error: any;
  streaming: boolean;
  useStreaming: boolean;
}

const initialState: ProjectPlanningState = {
  projects: [],
  currentProject: null,
  messages: [],
  loading: false,
  error: null,
  streaming: false,
  useStreaming: true
};

export const useProjectPlanning = (userId: string | null, projectId?: string) => {
  const [state, setState] = useState<ProjectPlanningState>(initialState);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Load projects for the user
  const loadProjects = useCallback(async () => {
    if (!userId) return;
    
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const projects = await getAllUserProjects(userId);
      setState(prev => ({ ...prev, projects, loading: false }));
    } catch (error: any) {
      console.error('Error loading projects:', error);
      setState(prev => ({ ...prev, loading: false, error: error.message }));
      toast({
        variant: "destructive",
        title: "Failed to load projects",
        description: error.message
      });
    }
  }, [userId, toast]);

  // Load a specific project
  const loadProject = useCallback(async (id: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const project = await getProjectPlan(id);
      const chatHistory = await getProjectChatHistory(id);
      
      // Convert chat history to messages format
      const messages = chatHistory.map(msg => ({
        id: msg.id,
        role: 'user',
        content: msg.user_message,
        timestamp: new Date(msg.created_at),
      })).concat(chatHistory.map(msg => ({
        id: `response-${msg.id}`,
        role: 'assistant',
        content: msg.ai_response,
        timestamp: new Date(msg.created_at),
      }))).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

      setState(prev => ({ 
        ...prev, 
        currentProject: project, 
        messages, 
        loading: false 
      }));
    } catch (error: any) {
      console.error('Error loading project:', error);
      setState(prev => ({ ...prev, loading: false, error: error.message }));
      toast({
        variant: "destructive",
        title: "Failed to load project",
        description: error.message
      });
    }
  }, [toast]);

  // Create a new project
  const createProject = useCallback(async (projectData: Partial<ProjectPlan>) => {
    if (!userId) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "You must be logged in to create a project"
      });
      return null;
    }
    
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const newProject = await createProjectPlan({
        ...projectData,
        user_id: userId
      });
      
      setState(prev => ({ 
        ...prev, 
        projects: [newProject, ...prev.projects], 
        currentProject: newProject,
        loading: false 
      }));
      
      toast({
        title: "Project created",
        description: "Your new project has been created successfully"
      });
      
      return newProject;
    } catch (error: any) {
      console.error('Error creating project:', error);
      setState(prev => ({ ...prev, loading: false, error: error.message }));
      toast({
        variant: "destructive",
        title: "Failed to create project",
        description: error.message
      });
      return null;
    }
  }, [userId, toast]);

  // Update a project
  const updateProject = useCallback(async (projectId: string, updates: Partial<ProjectPlan>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updatedProject = await updateProjectPlan(projectId, updates);
      
      setState(prev => ({
        ...prev,
        projects: prev.projects.map(p => p.id === projectId ? updatedProject : p),
        currentProject: prev.currentProject?.id === projectId ? updatedProject : prev.currentProject,
        loading: false
      }));
      
      toast({
        title: "Project updated",
        description: "Your project has been updated successfully"
      });
      
      return updatedProject;
    } catch (error: any) {
      console.error('Error updating project:', error);
      setState(prev => ({ ...prev, loading: false, error: error.message }));
      toast({
        variant: "destructive",
        title: "Failed to update project",
        description: error.message
      });
      return null;
    }
  }, [toast]);

  // Delete a project
  const removeProject = useCallback(async (projectId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      await deleteProject(projectId);
      
      setState(prev => ({
        ...prev,
        projects: prev.projects.filter(p => p.id !== projectId),
        currentProject: prev.currentProject?.id === projectId ? null : prev.currentProject,
        loading: false
      }));
      
      toast({
        title: "Project deleted",
        description: "Your project has been deleted successfully"
      });
      
      if (state.currentProject?.id === projectId) {
        navigate('/projects');
      }
      
      return true;
    } catch (error: any) {
      console.error('Error deleting project:', error);
      setState(prev => ({ ...prev, loading: false, error: error.message }));
      toast({
        variant: "destructive",
        title: "Failed to delete project",
        description: error.message
      });
      return false;
    }
  }, [state.currentProject, navigate, toast]);

  // Send a message to the AI assistant
  const sendMessage = useCallback(async (message: string, formData?: any) => {
    if (!state.currentProject?.id) {
      toast({
        variant: "default",
        title: "No project selected",
        description: "Please select or create a project first"
      });
      return;
    }
    
    // Add user message to the state immediately
    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setState(prev => ({ 
      ...prev, 
      messages: [...prev.messages, userMessage] 
    }));
    
    // Add loading message from assistant
    const loadingMessage = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: '',
      loading: true,
      timestamp: new Date()
    };
    
    setState(prev => ({ 
      ...prev, 
      messages: [...prev.messages, loadingMessage],
      streaming: state.useStreaming
    }));
    
    try {
      if (state.useStreaming) {
        // Use streaming API
        let fullResponse = '';
        let responseMessageId = loadingMessage.id;
        
        const onChunk = (chunk: string) => {
          fullResponse += chunk;
          
          setState(prev => {
            const updatedMessages = prev.messages.map(msg => 
              msg.id === responseMessageId 
                ? { ...msg, content: fullResponse, loading: true } 
                : msg
            );
            
            return { ...prev, messages: updatedMessages };
          });
        };
        
        const onComplete = (finalResponse: string) => {
          setState(prev => {
            const updatedMessages = prev.messages.map(msg => 
              msg.id === responseMessageId 
                ? { ...msg, content: finalResponse, loading: false } 
                : msg
            );
            
            return { 
              ...prev, 
              messages: updatedMessages,
              streaming: false 
            };
          });
        };
        
        await streamChatWithPlanAssistant(
          state.currentProject.id,
          message,
          onChunk,
          onComplete,
          formData
        );
      } else {
        // Use non-streaming API
        const response = await chatWithPlanAssistant(
          state.currentProject.id,
          message,
          formData
        );
        
        // Replace loading message with actual response
        setState(prev => {
          const updatedMessages = prev.messages.map(msg => 
            msg.id === loadingMessage.id 
              ? { 
                  ...msg, 
                  content: response.content || response.message || "No response from assistant",
                  loading: false 
                } 
              : msg
          );
          
          return { ...prev, messages: updatedMessages };
        });
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      
      // Update loading message to show error
      setState(prev => {
        const updatedMessages = prev.messages.map(msg => 
          msg.id === loadingMessage.id 
            ? { 
                ...msg, 
                content: "Error: Failed to get response from assistant",
                error: true,
                loading: false 
              } 
            : msg
        );
        
        return { 
          ...prev, 
          messages: updatedMessages,
          streaming: false,
          error: error.message 
        };
      });
      
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to get response from assistant"
      });
    }
  }, [state.currentProject, state.useStreaming, toast]);

  // Toggle streaming mode
  const toggleStreamingMode = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      useStreaming: !prev.useStreaming 
    }));
    
    toast({
      variant: "default",
      title: state.useStreaming ? "Streaming disabled" : "Streaming enabled",
      description: state.useStreaming 
        ? "Responses will now be shown when fully completed." 
        : "Responses will now be shown as they are generated."
    });
  }, [state.useStreaming, toast]);

  // Clear messages
  const clearMessages = useCallback(() => {
    setState(prev => ({ ...prev, messages: [] }));
    toast({
      variant: "default",
      title: "Messages cleared",
      description: "The conversation has been reset."
    });
  }, [toast]);

  // Load projects on initial render
  useEffect(() => {
    if (userId) {
      loadProjects();
    }
  }, [userId, loadProjects]);

  // Load specific project if projectId is provided
  useEffect(() => {
    if (projectId) {
      loadProject(projectId);
    }
  }, [projectId, loadProject]);

  return {
    ...state,
    loadProjects,
    loadProject,
    createProject,
    updateProject,
    removeProject,
    sendMessage,
    toggleStreamingMode,
    clearMessages
  };
};
