
import React, { createContext, useContext, useState, useEffect } from 'react';
import { StructuredData } from '@/types/chat';
import { toast } from '@/hooks/use-toast';

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
  budget?: {
    estimated_total?: number;
    currency?: string;
    breakdown?: {
      category: string;
      amount: number;
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
      let totalFields = 6; // Expected fields: title, description, businessContext, goals, features, budget
      
      if (updated.title) fieldsCompleted++;
      if (updated.description) fieldsCompleted++;
      if (updated.businessContext?.industry || 
          updated.businessContext?.companyName || 
          updated.businessContext?.target_audience) fieldsCompleted++;
      if (updated.goals) fieldsCompleted++;
      if (updated.features?.core && updated.features.core.length > 0) fieldsCompleted++;
      if (updated.budget?.estimated_total) fieldsCompleted++;
      
      updated.completionPercentage = Math.round((fieldsCompleted / totalFields) * 100);
      
      return updated;
    });
  };

  // Function to extract project data from AI responses
  const extractDataFromAIResponse = (response: string) => {
    setIsLoading(true);
    
    try {
      // Improved JSON detection using multiple patterns
      const jsonPatterns = [
        /```json\n([\s\S]*?)\n```/, // Standard markdown JSON code block
        /```\n([\s\S]*?)\n```/,     // Code block without language specification
        /{[\s\S]*"title"[\s\S]*}/   // Direct JSON object with title field
      ];
      
      let extractedJson = null;
      
      // Try each pattern until we find a match
      for (const pattern of jsonPatterns) {
        const match = response.match(pattern);
        if (match && match[1]) {
          try {
            // For the first two patterns that capture content between backticks
            extractedJson = JSON.parse(match[1].trim());
            console.log("Successfully extracted JSON data:", extractedJson);
            break;
          } catch (e) {
            console.warn("Failed to parse JSON from pattern match:", e);
            // Continue to the next pattern
          }
        } else if (pattern === jsonPatterns[2] && response.match(pattern)) {
          // For the direct JSON object pattern
          try {
            const directMatch = response.match(pattern);
            if (directMatch) {
              extractedJson = JSON.parse(directMatch[0]);
              console.log("Successfully extracted direct JSON data:", extractedJson);
              break;
            }
          } catch (e) {
            console.warn("Failed to parse direct JSON:", e);
          }
        }
      }
      
      if (extractedJson) {
        updateProjectData(extractedJson, Object.keys(extractedJson)[0]);
        setIsLoading(false);
        return;
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
      
      // Enhanced budget extraction - try multiple patterns
      // First attempt: Look for clear budget format
      const budgetMatch = response.match(/Budget:\s*(?:[\$€£])?\s*([0-9,]+(?:\.[0-9]+)?)(?:\s*(?:USD|EUR|GBP|dollars?|euros?|pounds?))?/i);
      
      // Second attempt: Look for budget in a sentence
      const budgetSentenceMatch = !budgetMatch && response.match(/(?:budget|cost|price)(?:\s+is|\s+of|\s+estimated at)?\s+(?:around|approximately|about)?\s*(?:[\$€£])?\s*([0-9,]+(?:\.[0-9]+)?)(?:\s*(?:USD|EUR|GBP|dollars?|euros?|pounds?))?/i);
      
      // Third attempt: Look for numbers with currency symbols
      const currencyMatch = !budgetMatch && !budgetSentenceMatch && response.match(/[\$€£]\s*([0-9,]+(?:\.[0-9]+)?)/);
      
      const matchToUse = budgetMatch || budgetSentenceMatch || currencyMatch;
      
      if (matchToUse && matchToUse[1]) {
        const budgetValue = parseFloat(matchToUse[1].replace(/,/g, ''));
        if (!isNaN(budgetValue)) {
          // Look for currency
          let currency = 'USD'; // Default currency
          
          // Check for currency in the context
          const fullMatch = matchToUse[0];
          if (fullMatch.includes('$') || fullMatch.includes('USD') || fullMatch.includes('dollar')) {
            currency = 'USD';
          } else if (fullMatch.includes('€') || fullMatch.includes('EUR') || fullMatch.includes('euro')) {
            currency = 'EUR';
          } else if (fullMatch.includes('£') || fullMatch.includes('GBP') || fullMatch.includes('pound')) {
            currency = 'GBP';
          }
          
          newData.budget = {
            estimated_total: budgetValue,
            currency: currency
          };
        }
      }
      
      // Update project data if we found anything
      if (Object.keys(newData).length > 0) {
        let highlightField = Object.keys(newData)[0];
        updateProjectData(newData, highlightField);
      } else {
        console.warn("Could not extract any structured data from AI response");
        toast({
          title: "Data Extraction",
          description: "Could not extract structured project data from the AI's response.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error extracting data from AI response:", error);
      toast({
        title: "Data Extraction Error",
        description: "Failed to process the AI's response data.",
        variant: "destructive"
      });
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
