
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

export async function createProjectPlan(title: string, description?: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('project_plans')
    .insert({
      title,
      description,
    })
    .select('id')
    .single();

  if (error) {
    console.error('Error creating project plan:', error);
    return null;
  }

  return data.id;
}

export async function getProjectPlan(id: string): Promise<ProjectPlan | null> {
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
}

export async function updateProjectPlan(id: string, updates: Partial<ProjectPlan>): Promise<boolean> {
  const { error } = await supabase
    .from('project_plans')
    .update(updates)
    .eq('id', id);

  if (error) {
    console.error('Error updating project plan:', error);
    return false;
  }

  return true;
}

export async function getProjectChatHistory(planId: string, limit: number = 50, page: number = 0): Promise<ProjectChatHistory[]> {
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
}

export async function getAllUserProjects(): Promise<ProjectPlan[]> {
  const { data, error } = await supabase
    .from('project_plans')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error getting user projects:', error);
    return [];
  }

  return data;
}

export async function deleteProject(id: string): Promise<boolean> {
  // First delete all associated chat history
  const { error: chatError } = await supabase
    .from('plan_chat_history')
    .delete()
    .eq('plan_id', id);

  if (chatError) {
    console.error('Error deleting chat history:', chatError);
    return false;
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
}

// Streaming response handler for chat function
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
      const response = await fetch(`${supabase.functions.url}/chat-with-plan-assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'text/event-stream',
        },
        body: JSON.stringify({ 
          messages: apiMessages,
          projectId,
          formData
        }),
        signal: controller.signal
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const reader = response.body?.getReader();
      if (!reader) throw new Error('Response body is not readable');
      
      const decoder = new TextDecoder();
      let fullResponse = '';
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(line => line.trim() !== '');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.content || '';
              
              if (content) {
                fullResponse += content;
                onChunk?.(content);
              }
            } catch (e) {
              console.error('Error parsing SSE chunk:', e);
            }
          }
        }
      }
      
      // Call the completion handler when done
      onComplete?.(fullResponse);
      
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Error in streamChatWithPlanAssistant:', err);
      }
    }
  })();
  
  return controller;
}

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

    // Call the edge function
    const { data, error } = await supabase.functions.invoke('chat-with-plan-assistant', {
      body: { 
        messages: apiMessages,
        projectId,
        formData
      }
    });

    if (error) {
      console.error('Error calling chat function:', error);
      return null;
    }

    return data.message;
  } catch (err) {
    console.error('Error in chatWithPlanAssistant:', err);
    return null;
  }
}
