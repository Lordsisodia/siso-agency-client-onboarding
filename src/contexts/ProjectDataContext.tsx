
import React, { createContext, useContext, useState, useEffect } from 'react';
import { StructuredData } from '@/types/chat';

export interface ProjectData {
  title?: string;
  description?: string;
  businessContext?: {
    industry?: string;
    companyName?: string;
    scale?: string;
    target_audience?: string[];
  };
  goals?: string;
  features?: {
    core?: string[];
    extras?: string[];
  };
  timeline?: {
    estimated_weeks?: number;
    phases?: {
      name: string;
      duration: string;
      tasks: string[];
    }[];
  };
  lastUpdatedField?: string;
  completionPercentage?: number;
}

interface ProjectDataContextType {
  projectData: ProjectData;
  updateProjectData: (newData: Partial<ProjectData>, highlightField?: string) => void;
  extractDataFromAIResponse: (response: string) => void;
  isLoading: boolean;
}

const ProjectDataContext = createContext<ProjectDataContextType | undefined>(undefined);

export const useProjectData = () => {
  const context = useContext(ProjectDataContext);
  if (context === undefined) {
    throw new Error('useProjectData must be used within a ProjectDataProvider');
  }
  return context;
};

export const ProjectDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projectData, setProjectData] = useState<ProjectData>({
    completionPercentage: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  const updateProjectData = (newData: Partial<ProjectData>, highlightField?: string) => {
    setProjectData(prev => {
      const updated = { ...prev, ...newData };
      if (highlightField) {
        updated.lastUpdatedField = highlightField;
      }
      
      // Calculate completion percentage
      let fieldsCompleted = 0;
      let totalFields = 5; // Expected fields: title, description, businessContext, goals, features
      
      if (updated.title) fieldsCompleted++;
      if (updated.description) fieldsCompleted++;
      if (updated.businessContext?.industry || 
          updated.businessContext?.companyName || 
          updated.businessContext?.target_audience) fieldsCompleted++;
      if (updated.goals) fieldsCompleted++;
      if (updated.features?.core && updated.features.core.length > 0) fieldsCompleted++;
      
      updated.completionPercentage = Math.round((fieldsCompleted / totalFields) * 100);
      
      return updated;
    });
  };

  // Function to extract project data from AI responses
  const extractDataFromAIResponse = (response: string) => {
    setIsLoading(true);
    
    try {
      // Try to detect JSON in the response
      const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch && jsonMatch[1]) {
        try {
          const parsedData = JSON.parse(jsonMatch[1]);
          updateProjectData(parsedData, Object.keys(parsedData)[0]);
          setIsLoading(false);
          return;
        } catch (e) {
          console.error("Failed to parse JSON from AI response", e);
        }
      }
      
      // If no JSON found, use heuristics to extract information
      const newData: Partial<ProjectData> = {};
      
      // Extract title/project name
      const titleMatch = response.match(/Project(?:\s+name|title)?:\s*([^\n.,]+)/i);
      if (titleMatch && titleMatch[1] && titleMatch[1].trim().length > 3) {
        newData.title = titleMatch[1].trim();
      }
      
      // Extract industry
      const industryMatch = response.match(/Industry:\s*([^\n.,]+)/i);
      if (industryMatch && industryMatch[1]) {
        newData.businessContext = {
          ...newData.businessContext,
          industry: industryMatch[1].trim()
        };
      }
      
      // Extract company name
      const companyMatch = response.match(/Company(?:\s+name)?:\s*([^\n.,]+)/i);
      if (companyMatch && companyMatch[1]) {
        newData.businessContext = {
          ...newData.businessContext,
          companyName: companyMatch[1].trim()
        };
      }
      
      // Extract goals
      const goalsMatch = response.match(/(?:Project\s+)?Goals?(?:\s+and\s+objectives)?:\s*([^\n]+(?:\n(?!\n)[^\n]+)*)/i);
      if (goalsMatch && goalsMatch[1]) {
        newData.goals = goalsMatch[1].trim();
      }
      
      // Extract features (looking for bullet points after "Features:" or "Core Features:")
      const featuresMatch = response.match(/(?:Core\s+)?Features?:\s*\n((?:\s*[-*•]\s+[^\n]+\n)+)/i);
      if (featuresMatch && featuresMatch[1]) {
        const featureLines = featuresMatch[1].split('\n')
          .filter(line => line.trim().match(/^[-*•]/))
          .map(line => line.replace(/^[-*•]\s+/, '').trim())
          .filter(line => line.length > 0);
          
        if (featureLines.length > 0) {
          newData.features = {
            ...newData.features,
            core: featureLines
          };
        }
      }
      
      // Extract timeline
      const timelineMatch = response.match(/Timeline:\s*(\d+)\s*(?:weeks?|months?)/i);
      if (timelineMatch && timelineMatch[1]) {
        newData.timeline = {
          ...newData.timeline,
          estimated_weeks: parseInt(timelineMatch[1], 10)
        };
      }
      
      // Update project data if we found anything
      if (Object.keys(newData).length > 0) {
        let highlightField = Object.keys(newData)[0];
        updateProjectData(newData, highlightField);
      }
    } catch (error) {
      console.error("Error extracting data from AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProjectDataContext.Provider value={{ projectData, updateProjectData, extractDataFromAIResponse, isLoading }}>
      {children}
    </ProjectDataContext.Provider>
  );
};
