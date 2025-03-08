
import { supabase } from '@/integrations/supabase/client';
import { ChatMessage } from '@/types/chat';

export interface ProjectPlan {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  requirements: Record<string, any>;
  features: Record<string, any>;
  technical_specs: Record<string, any>;
  timeline: Record<string, any>;
  budget: string | null;
  status: string;
  user_id?: string | null;
}

export interface ProjectChatHistory {
  id: string;
  plan_id: string;
  user_message: string;
  ai_response: string;
  created_at: string;
  form_data: Record<string, any> | null;
  metadata: Record<string, any> | null;
}

/**
 * Creates a new project plan
 * @param title Project title
 * @param description Optional project description
 * @returns Project ID or null on error
 */
export async function createProjectPlan(title: string, description?: string): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from('project_plans')
      .insert({
        title,
        description,
        requirements: {},
        features: {},
        technical_specs: {},
        timeline: {}
      })
      .select('id')
      .single();

    if (error) {
      console.error('Error creating project plan:', error);
      return null;
    }

    return data.id;
  } catch (err) {
    console.error('Exception in createProjectPlan:', err);
    return null;
  }
}

/**
 * Gets a project plan by ID
 * @param id Project ID
 * @returns ProjectPlan or null on error
 */
export async function getProjectPlan(id: string): Promise<ProjectPlan | null> {
  try {
    const { data, error } = await supabase
      .from('project_plans')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error getting project plan:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Exception in getProjectPlan:', err);
    return null;
  }
}

/**
 * Updates a project plan
 * @param id Project ID
 * @param updates Partial project plan updates
 * @returns Success status
 */
export async function updateProjectPlan(id: string, updates: Partial<ProjectPlan>): Promise<boolean> {
  try {
    // Sanitize updates to avoid database constraint errors
    const sanitizedUpdates = { ...updates };
    delete sanitizedUpdates.id;
    delete sanitizedUpdates.created_at;
    delete sanitizedUpdates.user_id;
    
    // Add updated_at timestamp
    sanitizedUpdates.updated_at = new Date().toISOString();
    
    const { error } = await supabase
      .from('project_plans')
      .update(sanitizedUpdates)
      .eq('id', id);

    if (error) {
      console.error('Error updating project plan:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Exception in updateProjectPlan:', err);
    return false;
  }
}

/**
 * Gets project chat history with pagination
 * @param planId Project ID
 * @param limit Number of items per page
 * @param page Page number (0-based)
 * @returns Array of chat history entries
 */
export async function getProjectChatHistory(
  planId: string, 
  limit: number = 50, 
  page: number = 0
): Promise<ProjectChatHistory[]> {
  try {
    // Calculate offset for pagination
    const offset = page * limit;
    
    const { data, error } = await supabase
      .from('plan_chat_history')
      .select('*')
      .eq('plan_id', planId)
      .order('created_at', { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error getting chat history:', error);
      return [];
    }

    return data;
  } catch (err) {
    console.error('Exception in getProjectChatHistory:', err);
    return [];
  }
}

/**
 * Gets all user projects
 * @returns Array of project plans
 */
export async function getAllUserProjects(): Promise<ProjectPlan[]> {
  try {
    const { data, error } = await supabase
      .from('project_plans')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error getting user projects:', error);
      return [];
    }

    return data;
  } catch (err) {
    console.error('Exception in getAllUserProjects:', err);
    return [];
  }
}

/**
 * Deletes a project and all associated data
 * @param id Project ID
 * @returns Success status
 */
export async function deleteProject(id: string): Promise<boolean> {
  try {
    // First delete all associated chat history
    const { error: chatError } = await supabase
      .from('plan_chat_history')
      .delete()
      .eq('plan_id', id);

    if (chatError) {
      console.error('Error deleting chat history:', chatError);
      return false;
    }

    // Delete associated threads if any
    const { error: threadError } = await supabase
      .from('project_threads')
      .delete()
      .eq('project_id', id);
    
    if (threadError) {
      console.error('Error deleting project threads:', threadError);
      // Continue anyway as this is not critical
    }

    // Then delete the project
    const { error } = await supabase
      .from('project_plans')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project plan:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Exception in deleteProject:', err);
    return false;
  }
}

/**
 * Streaming response handler for chat function with improved error handling
 * @param messages Chat messages
 * @param projectId Optional project ID
 * @param formData Optional form data
 * @param onChunk Chunk handler callback
 * @param onComplete Completion handler callback
 * @returns AbortController for stream control
 */
export function streamChatWithPlanAssistant(
  messages: ChatMessage[],
  projectId?: string,
  formData?: Record<string, any>,
  onChunk?: (chunk: string) => void,
  onComplete?: (fullResponse: string) => void
): AbortController {
  const controller = new AbortController();
  
  (async () => {
    try {
      // Format messages for the API
      const apiMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Get the session token if available
      const { data: { session } } = await supabase.auth.getSession();
      const accessToken = session?.access_token || '';
      
      // Call the edge function with streaming enabled
      const response = await fetch(`${supabase.functions.url}/chat-with-plan-assistant?stream=true`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'text/event-stream',
        },
        body: JSON.stringify({ 
          messages: apiMessages,
          projectId,
          formData,
          clientInfo: {
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
          }
        }),
        signal: controller.signal
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} ${response.statusText}. ${errorText}`);
      }
      
      const reader = response.body?.getReader();
      if (!reader) throw new Error('Response body is not readable');
      
      const decoder = new TextDecoder();
      let fullResponse = '';
      let buffer = '';
      
      // Set up timeout for stalled connections
      let timeoutId: number | null = null;
      const resetTimeout = () => {
        if (timeoutId) window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
          reader.cancel('Connection timeout');
          throw new Error('Connection timed out waiting for response');
        }, 30000); // 30 second timeout
      };
      
      resetTimeout();
      
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          resetTimeout();
          
          // Decode the chunk and add it to the buffer
          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;
          
          // Process complete SSE messages
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; // Keep the incomplete line in buffer
          
          for (const line of lines) {
            if (line.trim() === '') continue;
            
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              
              if (data === '[DONE]') continue;
              
              try {
                const parsed = JSON.parse(data);
                
                if (parsed.error) {
                  throw new Error(parsed.error);
                }
                
                const content = parsed.content || '';
                
                if (content) {
                  fullResponse += content;
                  onChunk?.(content);
                }
              } catch (e) {
                console.error('Error parsing SSE chunk:', e, line);
              }
            }
          }
        }
      } finally {
        if (timeoutId) window.clearTimeout(timeoutId);
      }
      
      // Call the completion handler when done
      onComplete?.(fullResponse);
      
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Error in streamChatWithPlanAssistant:', err);
        
        // Provide error information to the caller
        onChunk?.(`[ERROR] ${err.message}`);
        onComplete?.(`[ERROR] ${err.message}`);
      }
    }
  })();
  
  return controller;
}

/**
 * Non-streaming chat function with improved error handling
 * @param messages Chat messages
 * @param projectId Optional project ID
 * @param formData Optional form data
 * @returns Response text or null on error
 */
export async function chatWithPlanAssistant(
  messages: ChatMessage[], 
  projectId?: string, 
  formData?: Record<string, any>
): Promise<string | null> {
  try {
    // Format messages for the API
    const apiMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Set up timeout controller
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout
    
    try {
      // Call the edge function
      const { data, error } = await supabase.functions.invoke('chat-with-plan-assistant', {
        body: { 
          messages: apiMessages,
          projectId,
          formData,
          clientInfo: {
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
          }
        },
        signal: controller.signal
      });

      if (error) {
        console.error('Error calling chat function:', error);
        return null;
      }

      return data.response;
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('Request timed out in chatWithPlanAssistant');
      return null;
    }
    
    console.error('Error in chatWithPlanAssistant:', err);
    return null;
  }
}
