
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

export async function getProjectChatHistory(planId: string): Promise<ProjectChatHistory[]> {
  const { data, error } = await supabase
    .from('plan_chat_history')
    .select('*')
    .eq('plan_id', planId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error getting chat history:', error);
    return [];
  }

  return data;
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
