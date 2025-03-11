
import { supabase } from '@/integrations/supabase/client';
import { ChatMessage } from '@/types/chat';

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
  async createProjectPlan(title: string, description?: string, status: string = 'draft'): Promise<string | null> {
    try {
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
      
      return data.id;
    } catch (error) {
      console.error('Error in createProjectPlan:', error);
      return null;
    }
  }

  /**
   * Gets a project plan by ID
   */
  async getProjectPlan(planId: string): Promise<ProjectPlan | null> {
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
      console.error('Error in getProjectPlan:', error);
      return null;
    }
  }

  /**
   * Gets all project plans for the current user
   */
  async getAllUserProjects(): Promise<ProjectPlan[]> {
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
      console.error('Error in getAllUserProjects:', error);
      return [];
    }
  }

  /**
   * Gets chat history for a plan
   */
  async getProjectChatHistory(planId: string): Promise<ProjectChatHistory[]> {
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
      console.error('Error in getProjectChatHistory:', error);
      return [];
    }
  }

  /**
   * Updates a project plan
   */
  async updateProjectPlan(planId: string, params: UpdatePlanParams): Promise<ProjectPlan | null> {
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
      console.error('Error in updateProjectPlan:', error);
      return null;
    }
  }

  /**
   * Deletes a project plan
   */
  async deleteProject(planId: string): Promise<boolean> {
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
      console.error('Error in deleteProject:', error);
      return false;
    }
  }

  /**
   * Chats with the plan builder assistant
   */
  async chatWithPlanAssistant(
    messages: ChatMessage[],
    projectId?: string,
    formData?: Record<string, any>
  ): Promise<string | null> {
    try {
      // Get the user's message (last message in the array)
      const userMessage = messages[messages.length - 1];
      
      const options: any = {
        body: { 
          messages,
          projectId,
          formData
        }
      };

      const response = await supabase.functions.invoke('chat-with-plan-assistant', options);
      
      if (response.error) {
        console.error('Error calling plan assistant function:', response.error);
        return null;
      }
      
      return response.data.response;
    } catch (error) {
      console.error('Error in chatWithPlanAssistant:', error);
      return null;
    }
  }

  /**
   * Stream responses from the plan builder assistant
   */
  streamChatWithPlanAssistant(
    messages: ChatMessage[],
    projectId?: string,
    formData?: Record<string, any>,
    onChunk: (chunk: string) => void = () => {},
    onComplete: (fullResponse: string) => void = () => {}
  ): AbortController {
    const controller = new AbortController();
    
    (async () => {
      try {
        // This is a simplified implementation that just calls the non-streaming version
        // and simulates streaming by breaking up the response
        const fullResponse = await this.chatWithPlanAssistant(messages, projectId, formData);
        
        if (fullResponse) {
          // Simulate streaming by breaking the response into chunks
          const chunks = fullResponse.match(/.{1,20}/g) || [];
          
          for (const chunk of chunks) {
            if (controller.signal.aborted) break;
            onChunk(chunk);
            await new Promise(resolve => setTimeout(resolve, 50));
          }
          
          onComplete(fullResponse);
        }
      } catch (error) {
        console.error('Error in streamChatWithPlanAssistant:', error);
      }
    })();
    
    return controller;
  }
}

export const projectPlanService = new ProjectPlanService();
