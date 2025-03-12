
import { supabase } from '@/integrations/supabase/client';
import { Project } from './types';
import { demoProjects } from '@/data/demoData';
import { safeJsonObject, safeJsonArray, safeJsonProperty } from '@/utils/json-helpers';

export const fetchProjectData = async (projectId: string, isDemo: boolean): Promise<Project | null> => {
  // Handle demo mode with mock data
  if (isDemo || (projectId && projectId.startsWith('demo-'))) {
    const demoProject = demoProjects.find(p => p.id === projectId);
    return demoProject || null;
  }

  // Fetch real project data from Supabase
  const { data: projectData, error: projectError } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single();

  if (projectError) throw projectError;

  const { data: detailsData, error: detailsError } = await supabase
    .from('project_details')
    .select('*')
    .eq('project_id', projectId)
    .single();

  if (detailsError && detailsError.code !== 'PGRST116') {
    console.error("Error fetching project details:", detailsError);
  }

  // Parse JSON data from Supabase
  let parsedDetails = undefined;
  
  if (detailsData) {
    // Parse business_context
    const businessContext = safeJsonObject(detailsData.business_context);
    
    // Parse features
    const featuresJson = safeJsonObject(detailsData.features);
    const features = {
      core: safeJsonArray<string>(featuresJson.core),
      extras: safeJsonArray<string>(featuresJson.extras)
    };
    
    // We need to check if the timeline property exists in the database response
    let timeline = undefined;
    
    // Using type assertion with 'as any' to handle the property access
    // We're already checking if the property exists at runtime
    const timelineData = (detailsData as any).timeline;
    if (timelineData) {
      const timelineJson = safeJsonObject(timelineData);
      timeline = {
        estimated_weeks: safeJsonProperty<number>(timelineJson, 'estimated_weeks', 0),
        phases: safeJsonArray<{name: string; duration: string; tasks: string[]}>(timelineJson.phases)
      };
    }

    parsedDetails = {
      business_context: {
        industry: safeJsonProperty<string>(businessContext, 'industry', ''),
        companyName: safeJsonProperty<string>(businessContext, 'companyName', ''),
        scale: safeJsonProperty<string>(businessContext, 'scale', ''),
        target_audience: safeJsonArray<string>(businessContext.target_audience)
      },
      goals: detailsData.goals,
      features,
      timeline
    };
  }

  return {
    ...projectData,
    user_id: projectData.user_id || '', // Ensure user_id is always present
    details: parsedDetails
  };
};
