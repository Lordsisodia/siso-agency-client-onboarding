
/**
 * PlanBuilderAIOnboarding.plan.ts
 * 
 * This is a planning document that outlines the implementation strategy 
 * for creating an AI-assisted onboarding flow for the Plan Builder.
 * 
 * NOTE: This is not executable code - it's a reference document to guide implementation.
 */

/**
 * OVERVIEW
 * --------
 * Create an AI-powered chat interface that minimizes user input while maximizing data collection
 * through automated research and intelligent suggestions. The goal is to allow users to provide
 * minimal information (30 seconds of input) and have the system do the rest.
 */

export const PlanBuilderAIOnboardingPlan = {
  /**
   * COMPONENT ARCHITECTURE
   * ---------------------
   */
  components: {
    // Main chat component that will be added to the PlanBuilder page
    planBuilderChat: {
      description: "Floating chat interface that helps users complete the onboarding process",
      subcomponents: [
        "ChatBubble - Renders individual messages",
        "ChatInput - Handles user text input",
        "ChatTypingIndicator - Shows when AI is 'thinking'",
        "ChatSuggestions - Quick-reply buttons for common responses",
      ],
      states: [
        "messages[] - Array of chat messages",
        "loading - Whether AI is processing",
        "currentStage - Current stage in the conversation flow",
        "formData - Collected data that will populate the forms",
      ]
    },
    
    // Backend components
    edgeFunctions: {
      description: "Supabase Edge Functions to handle AI processing and web scraping",
      functions: [
        "chat-with-assistant - Processes messages with OpenAI",
        "analyze-website - Extracts information from company website",
        "enrich-company-data - Gathers additional company information",
      ]
    }
  },

  /**
   * DATA FLOW
   * ---------
   */
  dataFlow: {
    // How data moves through the system
    stages: [
      {
        name: "Initial Input Collection",
        description: "Collect minimal but essential information from the user",
        requiredData: [
          "Company name OR website URL",
          "Brief description of project (1-2 sentences)",
          "Main goal/objective",
        ]
      },
      {
        name: "Automated Research",
        description: "Use the minimal information to gather more details automatically",
        processes: [
          "Website analysis - Scrape company website for contact info, social links, etc.",
          "Company research - Look up additional info based on company name",
          "Industry analysis - Identify industry, competitors, and common requirements",
        ]
      },
      {
        name: "AI-Driven Form Population",
        description: "Use gathered information to pre-fill form fields",
        targets: [
          "BasicInfoForm - Company details, contact info",
          "RequirementsForm - Industry-specific requirements and goals",
          "FeaturesForm - Recommended features based on industry and goals",
          "SpecificationsForm - Technical specifications based on requirements",
        ]
      },
      {
        name: "Interactive Refinement",
        description: "Ask targeted questions to fill information gaps",
        approach: [
          "Identify missing critical information",
          "Ask direct questions with simple answers",
          "Offer suggestions based on industry knowledge",
          "Confirm assumptions with yes/no questions",
        ]
      }
    ]
  },

  /**
   * CONVERSATION FLOWS
   * -----------------
   */
  conversationFlows: {
    // Define the conversation paths
    initialGreeting: {
      aiMessage: "Hi! I'll help you set up your project quickly. To get started, what's your company name or website?",
      expectedResponses: ["Company name", "Website URL", "Both", "Neither (handle gracefully)"],
      nextSteps: {
        "hasWebsite": "websiteAnalysisFlow",
        "hasCompanyName": "companyResearchFlow",
        "hasNeither": "manualInputFlow",
      }
    },
    
    websiteAnalysisFlow: {
      description: "Flow when user provides a website",
      steps: [
        {
          aiMessage: "Great! I'll analyze {website} to gather some information about your company. This will just take a moment...",
          action: "analyzeWebsite(url)",
          nextMessage: "Thanks! I found {companyName} and some details about your business. Is this correct?"
        },
        {
          aiMessage: "What's the main goal for your app or project?",
          expectedResponse: "Brief project goal",
          action: "setProjectGoal(response)"
        },
        {
          aiMessage: "Based on your industry ({industry}), most similar businesses need features like {suggestedFeatures}. Would these be relevant for your project?",
          expectedResponse: "Confirmation/rejection of suggestions",
          action: "setInitialFeatures(response)"
        }
      ]
    },
    
    companyResearchFlow: {
      description: "Flow when user only provides company name",
      // Similar structure to websiteAnalysisFlow
    },
    
    manualInputFlow: {
      description: "Flow when user provides neither website nor recognizable company name",
      // Fallback flow for manual information collection
    },
    
    // Additional flows for gathering specific information
    gatherRequirementsFlow: { /* details */ },
    featureSuggestionFlow: { /* details */ },
    specificationRefinementFlow: { /* details */ }
  },

  /**
   * OPENAI INTEGRATION
   * -----------------
   */
  openAIIntegration: {
    // How to integrate with OpenAI API
    models: {
      primary: "gpt-4o",
      fallback: "gpt-4o-mini",
    },
    
    systemPrompts: {
      main: `You are an AI assistant helping users create a project specification. 
Your goal is to gather information efficiently with minimal user input.
You should be friendly, professional, and focused on getting the essential details.
When you identify a company name or website, suggest extracting information automatically.
Based on the information provided, anticipate needs and make intelligent suggestions.`,
      
      companyResearch: `Based on the company name or website provided, analyze:
1. The industry and business category
2. Typical digital requirements for this industry
3. Common features needed for apps in this space
4. Potential target audience
5. Competitive advantages to highlight`,
      
      requirementGeneration: `Based on the project goals and industry, generate:
1. Key business requirements
2. Essential features for MVP
3. Technical considerations
4. Suggested timeline priorities`
    },
    
    functionCalling: {
      analyzeWebsite: {
        description: "Analyzes a company website to extract relevant information",
        parameters: {
          url: "Website URL to analyze"
        },
        returns: {
          companyName: "Extracted company name",
          contactDetails: "Contact information found",
          socialLinks: "Social media profiles",
          industry: "Detected industry",
          description: "Company description/about information"
        }
      },
      
      suggestFeatures: {
        description: "Suggests features based on industry and goals",
        parameters: {
          industry: "Business industry",
          goals: "Project goals",
          audience: "Target audience"
        },
        returns: {
          essentialFeatures: "Must-have features",
          recommendedFeatures: "Nice-to-have features",
          innovativeFeatures: "Potential innovative features"
        }
      }
    }
  },

  /**
   * FORM INTEGRATION
   * ---------------
   */
  formIntegration: {
    // How to connect chat data with existing form components
    mappings: {
      basicInfoForm: {
        "companyName": "Company name extracted or provided",
        "contactName": "Contact name found on website or through API",
        "contactEmail": "Email found on website or provided",
        "website": "Website URL provided or discovered",
        "overview": "AI-generated project overview based on goals"
      },
      
      requirementsForm: {
        "goals": "Project goals from user input and industry analysis",
        "requirements": "AI-generated requirements based on goals and industry",
        "targetAudience": "Identified from website or conversation",
        "targetLaunchDate": "Estimated based on project scope"
      },
      
      featuresForm: {
        "selectedFeatures": "Features selected or agreed to during conversation"
      },
      
      specificationsForm: {
        "detailedSpecifications": "AI-generated specifications based on selected features",
        "designNotes": "Design preferences mentioned during conversation",
        "integrationNotes": "Integration requirements identified"
      }
    },
    
    dataTransformation: {
      "Chat format to form data structure conversion functions",
      "Partial data handling strategies",
      "Data validation before form population"
    }
  },

  /**
   * IMPLEMENTATION PHASES
   * --------------------
   */
  implementationPhases: {
    phase1: {
      name: "Basic Chat Integration",
      tasks: [
        "Create ChatAssistant component and UI elements",
        "Set up OpenAI Edge Function integration",
        "Implement basic conversation flow",
        "Add to PlanBuilder page as floating component"
      ]
    },
    
    phase2: {
      name: "Automated Research Features",
      tasks: [
        "Implement website analysis function",
        "Create company research capabilities",
        "Add feature suggestion logic based on industry",
        "Develop requirements generation system"
      ]
    },
    
    phase3: {
      name: "Form Integration",
      tasks: [
        "Create data mapping between chat and forms",
        "Implement form pre-filling functionality",
        "Add validation and confirmation steps",
        "Create seamless switching between chat and form interfaces"
      ]
    },
    
    phase4: {
      name: "Optimization and Enhancement",
      tasks: [
        "Improve conversation flows based on user testing",
        "Optimize performance of research functions",
        "Add memory/context for returning users",
        "Implement analytics to track efficiency"
      ]
    }
  },

  /**
   * TECHNICAL REQUIREMENTS
   * ---------------------
   */
  technicalRequirements: {
    edge_functions: [
      {
        name: "chat-with-assistant",
        description: "Handles communication with OpenAI API",
        requirements: [
          "OPENAI_API_KEY environment variable",
          "Message history management",
          "Error handling and retry logic"
        ]
      },
      {
        name: "analyze-website",
        description: "Extracts information from company websites",
        requirements: [
          "Web scraping capabilities",
          "Rate limiting to avoid IP blocks",
          "Error handling for various website structures"
        ]
      }
    ],
    
    frontend_components: [
      {
        name: "PlanBuilderChat",
        requirements: [
          "Real-time message display",
          "Typing indicators",
          "Loading states",
          "Form data synchronization"
        ]
      },
      {
        name: "ChatBubble",
        requirements: [
          "Support for text messages",
          "Support for suggestion buttons",
          "Support for rich content (links, etc.)"
        ]
      }
    ],
    
    state_management: {
      description: "Manage conversation state and collected data",
      approach: "React context or Redux for global state",
      requirements: [
        "Track conversation stage",
        "Store collected data",
        "Handle form pre-filling",
        "Manage loading states"
      ]
    }
  }
};

/**
 * Next Steps:
 * 1. Create the OpenAI Edge Function for chat processing
 * 2. Implement basic chat UI components
 * 3. Set up conversation flow management
 * 4. Add website analysis functionality
 * 5. Integrate with existing form components
 */
