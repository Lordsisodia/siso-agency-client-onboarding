
import { supabase } from '@/integrations/supabase/client';

export interface ProjectPlan {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  status: string;
  budget: string | null;
  created_at: string;
  updated_at: string;
  requirements: Record<string, any>;
  features: Record<string, any>;
  technical_specs: Record<string, any>;
  timeline: Record<string, any>;
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

export interface CreatePlanParams {
  title: string;
  description?: string;
  status?: string;
}

export interface UpdatePlanParams {
  title?: string;
  description?: string;
  status?: string;
  budget?: string;
  requirements?: Record<string, any>;
  features?: Record<string, any>;
  technical_specs?: Record<string, any>;
  timeline?: Record<string, any>;
}

class ProjectPlanService {
  /**
   * Creates a new project plan
   */
  async createPlan(params: CreatePlanParams): Promise<ProjectPlan | null> {
    try {
      const { title, description, status = 'draft' } = params;
      
      const { data, error } = await supabase
        .from('project_plans')
        .insert({
          title,
          description,
          status,
          requirements: {},
          features: {},
          technical_specs: {},
          timeline: {}
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error creating project plan:', error);
        return null;
      }
      
      // Convert JSON strings to objects
      return {
        ...data,
        requirements: typeof data.requirements === 'string' 
          ? JSON.parse(data.requirements) 
          : data.requirements || {},
        features: typeof data.features === 'string' 
          ? JSON.parse(data.features) 
          : data.features || {},
        technical_specs: typeof data.technical_specs === 'string' 
          ? JSON.parse(data.technical_specs) 
          : data.technical_specs || {},
        timeline: typeof data.timeline === 'string' 
          ? JSON.parse(data.timeline) 
          : data.timeline || {}
      };
    } catch (error) {
      console.error('Error in createPlan:', error);
      return null;
    }
  }

  /**
   * Gets a project plan by ID
   */
  async getPlanById(planId: string): Promise<ProjectPlan | null> {
    try {
      const { data, error } = await supabase
        .from('project_plans')
        .select('*')
        .eq('id', planId)
        .single();
      
      if (error) {
        console.error('Error fetching project plan:', error);
        return null;
      }
      
      // Convert JSON strings to objects
      return {
        ...data,
        requirements: typeof data.requirements === 'string' 
          ? JSON.parse(data.requirements) 
          : data.requirements || {},
        features: typeof data.features === 'string' 
          ? JSON.parse(data.features) 
          : data.features || {},
        technical_specs: typeof data.technical_specs === 'string' 
          ? JSON.parse(data.technical_specs) 
          : data.technical_specs || {},
        timeline: typeof data.timeline === 'string' 
          ? JSON.parse(data.timeline) 
          : data.timeline || {}
      };
    } catch (error) {
      console.error('Error in getPlanById:', error);
      return null;
    }
  }

  /**
   * Gets chat history for a plan
   */
  async getPlanChatHistory(planId: string): Promise<ProjectChatHistory[]> {
    try {
      const { data, error } = await supabase
        .from('plan_chat_history')
        .select('*')
        .eq('plan_id', planId)
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Error fetching plan chat history:', error);
        return [];
      }
      
      // Convert JSON strings to objects
      return data.map(item => ({
        ...item,
        form_data: typeof item.form_data === 'string' 
          ? JSON.parse(item.form_data) 
          : item.form_data,
        metadata: typeof item.metadata === 'string' 
          ? JSON.parse(item.metadata) 
          : item.metadata
      }));
    } catch (error) {
      console.error('Error in getPlanChatHistory:', error);
      return [];
    }
  }

  /**
   * Gets all project plans for the current user
   */
  async getAllPlans(): Promise<ProjectPlan[]> {
    try {
      const { data, error } = await supabase
        .from('project_plans')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching all project plans:', error);
        return [];
      }
      
      // Convert JSON strings to objects
      return data.map(plan => ({
        ...plan,
        requirements: typeof plan.requirements === 'string' 
          ? JSON.parse(plan.requirements) 
          : plan.requirements || {},
        features: typeof plan.features === 'string' 
          ? JSON.parse(plan.features) 
          : plan.features || {},
        technical_specs: typeof plan.technical_specs === 'string' 
          ? JSON.parse(plan.technical_specs) 
          : plan.technical_specs || {},
        timeline: typeof plan.timeline === 'string' 
          ? JSON.parse(plan.timeline) 
          : plan.timeline || {}
      }));
    } catch (error) {
      console.error('Error in getAllPlans:', error);
      return [];
    }
  }

  /**
   * Updates a project plan
   */
  async updatePlan(planId: string, params: UpdatePlanParams): Promise<ProjectPlan | null> {
    try {
      const { data, error } = await supabase
        .from('project_plans')
        .update(params)
        .eq('id', planId)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating project plan:', error);
        return null;
      }
      
      // Convert JSON strings to objects
      return {
        ...data,
        requirements: typeof data.requirements === 'string' 
          ? JSON.parse(data.requirements) 
          : data.requirements || {},
        features: typeof data.features === 'string' 
          ? JSON.parse(data.features) 
          : data.features || {},
        technical_specs: typeof data.technical_specs === 'string' 
          ? JSON.parse(data.technical_specs) 
          : data.technical_specs || {},
        timeline: typeof data.timeline === 'string' 
          ? JSON.parse(data.timeline) 
          : data.timeline || {}
      };
    } catch (error) {
      console.error('Error in updatePlan:', error);
      return null;
    }
  }

  /**
   * Deletes a project plan
   */
  async deletePlan(planId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('project_plans')
        .delete()
        .eq('id', planId);
      
      if (error) {
        console.error('Error deleting project plan:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error in deletePlan:', error);
      return false;
    }
  }

  /**
   * Saves a chat message to plan history
   */
  async saveChatMessage(
    planId: string, 
    userMessage: string, 
    aiResponse: string,
    formData?: Record<string, any> | null,
    metadata?: Record<string, any> | null
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('plan_chat_history')
        .insert({
          plan_id: planId,
          user_message: userMessage,
          ai_response: aiResponse,
          form_data: formData || null,
          metadata: metadata || null
        });
      
      if (error) {
        console.error('Error saving chat message:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error in saveChatMessage:', error);
      return false;
    }
  }

  /**
   * Chats with the plan builder assistant
   */
  async chatWithPlanAssistant(
    message: string, 
    thread_id?: string | null,
    metadata?: Record<string, any>
  ): Promise<{
    thread_id: string;
    message: string;
  } | null> {
    try {
      const options: any = {
        body: { 
          message,
          thread_id: thread_id || null,
          metadata: metadata || {}
        }
      };

      const response = await supabase.functions.invoke('chat-with-plan-assistant', options);
      
      if (response.error) {
        console.error('Error calling plan assistant function:', response.error);
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error('Error in chatWithPlanAssistant:', error);
      return null;
    }
  }
}

export const projectPlanService = new ProjectPlanService();
