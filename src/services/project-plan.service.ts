import { supabase } from '@/integrations/supabase/client';

export interface ProjectPlan {
  id: string;
  user_id?: string;
  title: string;
  description?: string;
  requirements?: any;
  features?: any;
  technical_specs?: any;
  timeline?: any;
  budget?: string;
  status?: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectChatHistory {
  id: string;
  plan_id: string;
  user_message: string;
  ai_response: string;
  form_data?: any;
  metadata?: any;
  created_at: string;
}

export const createProjectPlan = async (projectData: Partial<ProjectPlan>) => {
  const { data, error } = await supabase
    .from('project_plans')
    .insert(projectData)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getProjectPlan = async (planId: string) => {
  const { data, error } = await supabase
    .from('project_plans')
    .select('*')
    .eq('id', planId)
    .single();

  if (error) throw error;
  return data;
};

export const updateProjectPlan = async (planId: string, updates: Partial<ProjectPlan>) => {
  const { data, error } = await supabase
    .from('project_plans')
    .update(updates)
    .eq('id', planId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteProject = async (planId: string) => {
  const { error } = await supabase
    .from('project_plans')
    .delete()
    .eq('id', planId);

  if (error) throw error;
  return true;
};

export const getAllUserProjects = async (userId: string) => {
  const { data, error } = await supabase
    .from('project_plans')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getProjectChatHistory = async (planId: string) => {
  const { data, error } = await supabase
    .from('plan_chat_history')
    .select('*')
    .eq('plan_id', planId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
};

export const chatWithPlanAssistant = async (
  planId: string,
  message: string,
  formData?: any,
  metadata?: any
) => {
  // This is just a placeholder - in a real app, you'd call an API endpoint
  try {
    const response = await fetch('/api/chat-with-plan-assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planId, message, formData, metadata }),
    });
    
    if (!response.ok) throw new Error('Failed to chat with assistant');
    return await response.json();
  } catch (error) {
    console.error('Error in chatWithPlanAssistant:', error);
    throw error;
  }
};

export const streamChatWithPlanAssistant = async (
  planId: string,
  message: string,
  onChunk: (chunk: string) => void,
  onComplete: (fullResponse: string) => void,
  formData?: any,
  metadata?: any
) => {
  // This is just a placeholder - in a real app, you'd set up streaming
  try {
    // Mock implementation for compilation purposes
    setTimeout(() => {
      onChunk("Planning");
      setTimeout(() => {
        onChunk(" your");
        setTimeout(() => {
          onChunk(" project...");
          onComplete("Planning your project...");
        }, 500);
      }, 500);
    }, 500);
  } catch (error) {
    console.error('Error in streamChatWithPlanAssistant:', error);
    throw error;
  }
};
