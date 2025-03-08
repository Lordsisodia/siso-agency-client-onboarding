
/**
 * AIOnboardingWorkflow.plan.ts
 * 
 * This file outlines the complete agentic workflow for AI-assisted onboarding
 * in the Plan Builder. It serves as a reference document for implementation.
 */

export const AIOnboardingWorkflow = {
  /**
   * CORE OBJECTIVES
   * --------------
   * Primary goals for the AI-assisted onboarding
   */
  coreObjectives: {
    userExperience: "Minimize user input required while maximizing data collection",
    dataQuality: "Ensure high-quality, accurate data for project specifications",
    efficiency: "Significantly reduce time from initial contact to completed plan"
  },

  /**
   * WORKFLOW STAGES
   * --------------
   * Sequential stages of the onboarding process
   */
  workflowStages: {
    initialEngagement: {
      objective: "Establish user intent and collect basic context",
      conversationStarters: [
        "Tell me about your project idea",
        "What kind of app or website are you looking to build?",
        "Do you have an existing website or company I could learn more about?"
      ],
      dataTargets: ["companyName", "website", "projectType", "initialGoal"],
      nextStage: {
        ifWebsiteProvided: "websiteAnalysis",
        otherwise: "manualDataCollection"
      }
    },

    websiteAnalysis: {
      objective: "Extract company and industry data automatically",
      process: [
        "1. Validate and normalize provided URL",
        "2. Fetch website content via Edge Function",
        "3. Extract basic data using regex patterns",
        "4. Use OpenAI to analyze content for deeper insights",
        "5. Process and structure extracted information"
      ],
      dataTargets: [
        "companyName", "industry", "products/services", 
        "targetAudience", "valueProposition", "contactInfo"
      ],
      errorHandling: [
        "Gracefully handle unreachable sites",
        "Provide clear feedback when extraction fails",
        "Fall back to manual collection when needed"
      ],
      nextStage: "dataConfirmation"
    },

    manualDataCollection: {
      objective: "Efficiently gather key information through conversation",
      approachStrategy: "Use targeted questions with contextual follow-ups",
      questionSequence: [
        "What's the name of your company or project?",
        "What industry or sector are you in?",
        "Who is your target audience or customer?",
        "What problem are you trying to solve with this project?",
        "What's your timeline for this project?"
      ],
      efficiencyTechniques: [
        "Ask compound questions when appropriate",
        "Make educated guesses based on partial information",
        "Extrapolate data points from conversational context",
        "Suggest likely values based on industry standards"
      ],
      nextStage: "dataConfirmation"
    },

    dataConfirmation: {
      objective: "Verify collected information before proceeding",
      process: [
        "1. Present structured summary of collected data",
        "2. Highlight areas of low confidence",
        "3. Request confirmation or corrections",
        "4. Update data model with confirmed information"
      ],
      conversationApproach: [
        "Use clear, concise summaries",
        "Prompt for specific corrections rather than open-ended feedback",
        "Acknowledge and incorporate user corrections seamlessly"
      ],
      nextStage: "projectGoalRefinement"
    },

    projectGoalRefinement: {
      objective: "Develop clear, actionable project goals",
      process: [
        "1. Extract implicit goals from conversation",
        "2. Suggest industry-standard goals based on project type",
        "3. Help articulate vague ideas into specific objectives",
        "4. Prioritize goals based on user feedback"
      ],
      goalFormattingGuidelines: [
        "Goals should be specific and measurable",
        "Goals should align with business objectives",
        "Goals should be achievable within project scope"
      ],
      nextStage: "requirementGeneration"
    },

    requirementGeneration: {
      objective: "Derive technical and functional requirements",
      generationApproach: [
        "Infer requirements from stated goals",
        "Suggest industry-standard requirements for project type",
        "Recommend requirements based on competitor analysis",
        "Consider technical constraints and best practices"
      ],
      requirementCategories: [
        "Functional requirements",
        "Technical requirements",
        "User experience requirements",
        "Security requirements",
        "Integration requirements"
      ],
      nextStage: "featureSuggestion"
    },

    featureSuggestion: {
      objective: "Propose relevant features based on requirements",
      suggestionsStrategy: [
        "Map requirements to concrete features",
        "Prioritize features by impact and implementation complexity",
        "Group features into MVP and future phases",
        "Provide industry-specific feature recommendations"
      ],
      featurePrioritization: {
        essential: "Must-have for MVP",
        recommended: "High-value, moderate effort",
        enhancement: "Nice-to-have, future consideration"
      },
      nextStage: "specificationPreparation"
    },

    specificationPreparation: {
      objective: "Compile complete project specification",
      componentElements: [
        "Project overview and business context",
        "Goals and success metrics", 
        "User personas and journey maps",
        "Functional requirements",
        "Technical architecture",
        "Feature breakdown",
        "Implementation timeline",
        "Resource requirements"
      ],
      automationApproach: "Pre-fill form fields in Plan Builder interface",
      nextStage: "presentationAndReview"
    }
  },

  /**
   * AI ASSISTANT CONFIGURATION
   * ------------------------
   * Implementation details for the OpenAI-powered assistant
   */
  assistantConfiguration: {
    conversationManagement: {
      contextRetention: "Maintain all critical information across conversation",
      stateTracking: "Track current stage and completed data points",
      progressReminder: "Summarize progress at key intervals",
      conversationRestart: "Handle session resumption gracefully"
    },

    responseCharacteristics: {
      tone: "Professional, helpful, and efficient",
      length: "Concise, focused on moving process forward",
      structure: "Clear sections with visual separation when appropriate",
      guidance: "Provide subtle directional prompts that guide user forward"
    },

    systemPromptFramework: {
      base: "You are an AI assistant helping a user create a project specification for a custom app development project. Your goal is to gather essential information with minimal user input.",
      stageSpecific: {
        initial: "Be friendly, efficient, and focused on getting the key details needed to pre-fill the project specification form.",
        companyResearch: "Based on the company name or website provided, identify industry, business category, digital needs, and common features.",
        requirementGeneration: "Based on the project goals and industry identified, help generate key business requirements, essential features, technical considerations, and integration needs."
      },
      contextManagement: "Review previous information carefully before responding. If you identify contradictions or gaps, address them tactfully."
    },

    extractionFunctions: [
      {
        name: "extractCompanyInfo",
        description: "Extract company information from user message",
        parameters: ["companyName", "website", "industry", "hasWebsite"]
      },
      {
        name: "extractProjectGoals",
        description: "Extract project goals and requirements from user message",
        parameters: ["mainGoal", "targetAudience", "requirements"]
      },
      {
        name: "suggestFeatures",
        description: "Suggest features based on industry and project goals",
        parameters: ["essentialFeatures", "recommendedFeatures", "innovativeFeatures"]
      }
    ],

    errorHandling: {
      userMisunderstanding: "Gently redirect conversation to required information",
      lowConfidenceData: "Flag uncertain information and seek clarification",
      technicalFailures: "Gracefully handle API or extraction failures without disrupting flow",
      conversationDerailment: "Use soft redirects to bring focus back to onboarding process"
    }
  },

  /**
   * TECHNICAL IMPLEMENTATION
   * ----------------------
   * Architecture and component details
   */
  technicalImplementation: {
    edgeFunctions: {
      chatAssistant: {
        location: "supabase/functions/chat-with-plan-assistant/index.ts",
        purpose: "Handle conversation, context management, and OpenAI integration",
        keyComponents: [
          "Stage management logic", 
          "Context accumulation",
          "Function calling for structured data extraction",
          "System prompt selection by stage"
        ]
      },
      websiteAnalyzer: {
        location: "supabase/functions/analyze-website/index.ts",
        purpose: "Extract company and project information from website",
        keyComponents: [
          "URL validation and normalization",
          "Website content fetching",
          "Pattern-based information extraction",
          "OpenAI-powered content analysis",
          "Data structuring and confidence scoring"
        ]
      }
    },

    frontendComponents: {
      chatInterface: {
        purpose: "User interaction with AI assistant",
        features: [
          "Persistent chat history",
          "Real-time typing indicators",
          "Structured message formatting",
          "Form field preview/pre-fill"
        ],
        implementation: "React component with state management"
      },
      formIntegration: {
        purpose: "Synchronize chat-collected data with form fields",
        approach: "Bidirectional sync between chat context and form state",
        implementation: "React context provider or custom hooks"
      }
    },

    dataFlow: {
      conversationState: {
        storage: "In-memory during session with periodic persistence",
        structure: "Sequential message array with metadata",
        context: "Accumulated data points with confidence scores"
      },
      extractedData: {
        temporary: "Session storage during collection phase",
        permanent: "Database storage after confirmation",
        validation: "Schema-based validation before persistence"
      }
    },

    security: {
      userDataProtection: "Only store essential information with user consent",
      apiKeyProtection: "All API interactions via Edge Functions, never client-side",
      rateLimit: "Implement appropriate rate limits for website analysis"
    }
  },

  /**
   * IMPLEMENTATION PHASES
   * -------------------
   * Staged approach to development
   */
  implementationPhases: {
    phase1: {
      name: "Basic Conversation Flow",
      features: [
        "Edge function setup with OpenAI integration",
        "Basic chat interface",
        "Simple state management",
        "Manual data collection conversation flow"
      ],
      deliverables: [
        "Working chat interface",
        "Basic conversation assistance",
        "Simple data extraction"
      ]
    },
    phase2: {
      name: "Smart Data Collection",
      features: [
        "Website analysis integration",
        "Improved data extraction",
        "Form field pre-filling",
        "Enhanced conversation flows"
      ],
      deliverables: [
        "Website-based company research",
        "Intelligent form pre-filling",
        "Improved conversation quality"
      ]
    },
    phase3: {
      name: "Advanced Features",
      features: [
        "Multi-session persistence",
        "Project templates based on industry",
        "Competitive analysis integration",
        "Advanced error recovery"
      ],
      deliverables: [
        "Complete onboarding automation",
        "Industry-specific recommendations",
        "Robust error handling"
      ]
    }
  },

  /**
   * SUCCESS METRICS
   * -------------
   * How to measure effectiveness
   */
  successMetrics: {
    userExperience: [
      "Time to complete onboarding (target: <5 minutes)",
      "Number of user inputs required (target: <10)",
      "User satisfaction rating (target: >4.5/5)"
    ],
    dataQuality: [
      "Percentage of fields auto-filled correctly (target: >80%)",
      "Number of user corrections needed (target: <3)",
      "Completeness of generated plan (target: >90%)"
    ],
    businessImpact: [
      "Conversion rate from visitor to completed plan (target: >40%)",
      "Time saved vs. manual process (target: >70%)",
      "Customer satisfaction increase (target: >25%)"
    ]
  }
};

export default AIOnboardingWorkflow;
