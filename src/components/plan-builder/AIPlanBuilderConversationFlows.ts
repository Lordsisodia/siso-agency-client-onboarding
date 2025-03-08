
/**
 * AIPlanBuilderConversationFlows.ts
 *
 * This file defines the conversation flows for the AI-assisted onboarding process.
 * It outlines the different paths the conversation can take based on user inputs.
 */

// Conversation stages
export enum ConversationStage {
  INITIAL_GREETING = 'initial_greeting',
  COMPANY_IDENTIFICATION = 'company_identification',
  WEBSITE_ANALYSIS = 'website_analysis',
  PROJECT_GOALS = 'project_goals',
  FEATURE_SUGGESTIONS = 'feature_suggestions',
  REQUIREMENTS_GATHERING = 'requirements_gathering',
  SPECIFICATION_REFINEMENT = 'specification_refinement',
  SUMMARY_CONFIRMATION = 'summary_confirmation',
  FORM_TRANSITION = 'form_transition',
}

// Message types
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  suggestions?: string[];
  isLoading?: boolean;
}

// System prompts for different conversation stages
export const systemPrompts = {
  initial: `You are an AI assistant helping a user create a project specification for a custom app development project.
Your goal is to gather essential information with minimal user input.
Be friendly, efficient, and focused on getting the key details needed to pre-fill the project specification form.
When you identify a company name or website, suggest extracting information automatically.`,

  companyResearch: `Based on the company name or website provided, you need to help identify:
1. The industry and business category
2. Typical digital needs for this type of business
3. Common features needed for apps in this space
4. Potential target audience
5. Key business objectives that digital solutions typically address in this industry
Be concise and focus on practical insights that help build a better project specification.`,

  requirementGeneration: `Based on the project goals and industry identified, help generate:
1. Key business requirements (3-5 points)
2. Essential features for an MVP (3-7 features)
3. Technical considerations that might be important
4. Potential integration needs
Keep suggestions practical and aligned with the user's business type and goals.`,

  featureSuggestions: `For the identified business type and project goals, suggest specific features that would be valuable.
Group features into:
1. Essential (must-have for MVP)
2. Recommended (high-value additions)
3. Innovative (differentiators)
For each feature, briefly explain the business value. Ask the user to confirm which features they want to include.`,
};

// Conversation flows
export const conversationFlows = {
  initialGreeting: {
    message: "Hi! I'll help you set up your project quickly. To get started, what's your company name or website?",
    nextStage: ConversationStage.COMPANY_IDENTIFICATION,
    analysis: {
      // Logic for analyzing the initial response
      hasWebsite: (response: string) => response.includes('http') || response.includes('www.') || response.includes('.com'),
      hasCompanyName: (response: string) => response.length > 0 && !response.includes('http'),
    },
    nextSteps: {
      hasWebsite: ConversationStage.WEBSITE_ANALYSIS,
      hasCompanyName: ConversationStage.PROJECT_GOALS,
      hasNeither: ConversationStage.PROJECT_GOALS,
    }
  },
  
  websiteAnalysis: {
    messages: [
      "Great! I'll analyze {website} to gather some information about your company. This will just take a moment...",
      "I found {companyName} and some details about your business. Is this information correct?",
    ],
    suggestions: ["Yes, that's correct", "No, that's not right", "Partially correct"],
    nextStage: ConversationStage.PROJECT_GOALS,
  },
  
  projectGoals: {
    message: "What's the main goal for your app or project? (For example: increase sales, improve customer service, streamline operations, etc.)",
    nextStage: ConversationStage.FEATURE_SUGGESTIONS,
    analysis: {
      // Logic for categorizing project goals
      categorizeGoal: (goal: string) => {
        // Implementation would identify keywords and categorize the goal
        return {
          category: 'sales', // Example categories: sales, service, operations, etc.
          keywords: ['increase', 'sales'], // Extracted key terms
        };
      }
    }
  },
  
  featureSuggestions: {
    messageTemplate: "Based on your {industry} business and goal to {projectGoal}, here are some recommended features for your app:\n\n{suggestedFeatures}\n\nAre these features aligned with what you need?",
    suggestions: ["Yes, these look good", "I need different features", "Tell me more about these"],
    nextStage: ConversationStage.REQUIREMENTS_GATHERING,
  },
  
  requirementsGathering: {
    message: "Let's refine your project requirements a bit more. What's your target audience for this app?",
    followUpQuestions: [
      "When are you hoping to launch this project?",
      "Are there any specific design preferences or existing brand guidelines to follow?",
      "Are there any third-party systems you need to integrate with?"
    ],
    nextStage: ConversationStage.SPECIFICATION_REFINEMENT,
  },
  
  specificationRefinement: {
    message: "Based on everything we've discussed, I've drafted some initial specifications for your project. Would you like to see them?",
    nextStage: ConversationStage.SUMMARY_CONFIRMATION,
  },
  
  summaryConfirmation: {
    messageTemplate: "Here's a summary of your project:\n\n{projectSummary}\n\nIs there anything you'd like to change or add?",
    suggestions: ["This looks good", "I need to make changes", "Let me continue with the form"],
    nextStage: ConversationStage.FORM_TRANSITION,
  },
  
  formTransition: {
    message: "Great! I've pre-filled the project specification form with the information we've gathered. You can now continue with the form process to add more details or make adjustments.",
    nextStage: null, // End of conversation flow
  }
};

// Response templates for the AI - these would be used to format AI responses
export const responseTemplates = {
  websiteAnalysisResult: `Based on the website {website}, I found the following information:

Company: {companyName}
Industry: {industry}
Description: {description}
Contact: {contactDetails}
Social links: {socialLinks}

Is this information correct?`,

  featureSuggestions: `Based on your {industry} business and your goal to {projectGoal}, here are some recommended features:

Essential Features:
{essentialFeatures}

Recommended Additions:
{recommendedFeatures}

Innovative Options:
{innovativeFeatures}

Which of these features would you like to include in your project?`,

  projectSummary: `Project Summary for {companyName}:

Business Information:
- Company: {companyName}
- Industry: {industry}
- Website: {website}

Project Overview:
- Main Goal: {projectGoal}
- Target Audience: {targetAudience}
- Target Launch: {targetLaunchDate}

Key Requirements:
{keyRequirements}

Selected Features:
{selectedFeatures}

Technical Notes:
{technicalNotes}

Is there anything you'd like to change or add to this summary?`,
};

// Function to map chat data to form data structure
export const mapChatDataToFormData = (chatData: any) => {
  return {
    basicInfo: {
      projectName: chatData.projectName || `${chatData.companyName} App`,
      companyName: chatData.companyName || '',
      contactName: chatData.contactName || '',
      contactEmail: chatData.contactEmail || '',
      website: chatData.website || '',
      overview: chatData.projectOverview || '',
    },
    requirements: {
      goals: chatData.goals || [''],
      requirements: chatData.requirements || [''],
      targetAudience: chatData.targetAudience || '',
      targetLaunchDate: chatData.targetLaunchDate || '',
    },
    features: {
      selectedFeatures: chatData.selectedFeatures || [],
      totalCost: calculateCost(chatData.selectedFeatures),
    },
    specifications: {
      detailedSpecifications: chatData.detailedSpecifications || '',
      designNotes: chatData.designNotes || '',
      integrationNotes: chatData.integrationNotes || '',
    }
  };
};

// Helper function to calculate cost based on selected features
function calculateCost(features: string[]) {
  // This would be replaced with actual cost calculation logic
  return features ? features.length * 1000 : 0;
}
