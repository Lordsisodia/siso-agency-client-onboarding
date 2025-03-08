
/**
 * WebsiteAnalyzer.plan.ts
 *
 * This file outlines the plan for analyzing company websites to extract
 * relevant information for the project planning process.
 * 
 * NOTE: This is a planning document, not executable code.
 */

export const WebsiteAnalyzerPlan = {
  /**
   * DATA EXTRACTION TARGETS
   * ----------------------
   * Information we aim to extract from company websites
   */
  extractionTargets: {
    companyInfo: [
      "Company name",
      "Tagline/slogan",
      "Industry/sector",
      "Company size (if available)",
      "Year founded (if available)",
      "Location(s)",
      "Company description/about text"
    ],
    contactInfo: [
      "Contact email(s)",
      "Contact phone number(s)",
      "Contact form URL",
      "Physical address(es)"
    ],
    socialPresence: [
      "Social media profile URLs (LinkedIn, Twitter, Facebook, Instagram, etc.)",
      "Blog URL",
      "YouTube channel",
      "Other relevant platforms"
    ],
    businessModel: [
      "Products/services offered",
      "Target audience/customer segments",
      "Value proposition",
      "Pricing model (if public)"
    ],
    technicalInsights: [
      "Current tech stack indicators",
      "Existing integrations",
      "Mobile app presence",
      "Customer portal/login presence"
    ]
  },

  /**
   * ANALYSIS STEPS
   * -------------
   * Process for analyzing a website
   */
  analysisSteps: [
    {
      name: "Initial Crawl",
      description: "Fetch and parse the homepage and key pages",
      targets: [
        "/", // Homepage
        "/about", // About page
        "/contact", // Contact page
        "/company", // Company info (alternative)
        "/services", // Services offered
        "/products", // Products offered
      ]
    },
    {
      name: "Metadata Extraction",
      description: "Extract structured metadata",
      targets: [
        "Meta tags (description, keywords, etc.)",
        "JSON-LD structured data",
        "Open Graph tags",
        "Twitter card metadata"
      ]
    },
    {
      name: "Content Analysis",
      description: "Analyze page content for relevant information",
      methods: [
        "Text analysis of headers and paragraphs",
        "Extraction of contact information patterns",
        "Identification of social media links",
        "Recognition of product/service descriptions"
      ]
    },
    {
      name: "Data Synthesis",
      description: "Combine and validate extracted information",
      steps: [
        "Cross-reference information from different pages",
        "Validate extracted data for format and completeness",
        "Assign confidence scores to extracted information",
        "Generate structured output"
      ]
    }
  ],

  /**
   * IMPLEMENTATION APPROACH
   * ----------------------
   * Technical approach for the analyzer
   */
  implementationApproach: {
    backend: {
      technology: "Supabase Edge Function",
      libraries: [
        "Cheerio - for HTML parsing",
        "Node-fetch - for HTTP requests",
        "Metadata-parser - for extracting metadata"
      ],
      steps: [
        "1. Receive URL to analyze",
        "2. Fetch homepage with proper user-agent",
        "3. Parse HTML and extract initial data",
        "4. Follow and fetch critical secondary pages",
        "5. Extract and validate information",
        "6. Return structured data"
      ]
    },
    errorHandling: [
      "Timeouts for slow-loading sites",
      "Fallbacks for blocked requests",
      "Alternative parsing strategies for different site structures",
      "Graceful degradation when information is unavailable"
    ],
    rateLimit: "Implement proper delays between requests to avoid IP blocking"
  },

  /**
   * OUTPUT FORMAT
   * ------------
   * Structure of the analysis results
   */
  outputFormat: {
    companyInfo: {
      name: "Company name (string)",
      description: "Company description (string)",
      industry: "Identified industry (string)",
      yearFounded: "Year founded if available (number | null)",
      size: "Company size category if available (string | null)",
      locations: "Array of locations (string[])"
    },
    contact: {
      emails: "Array of email addresses (string[])",
      phones: "Array of phone numbers (string[])",
      addresses: "Array of physical addresses (string[])",
      contactFormUrl: "URL to contact form if present (string | null)"
    },
    socialProfiles: {
      linkedin: "LinkedIn URL (string | null)",
      twitter: "Twitter URL (string | null)",
      facebook: "Facebook URL (string | null)",
      instagram: "Instagram URL (string | null)",
      youtube: "YouTube URL (string | null)",
      other: "Array of other social profiles (string[])"
    },
    business: {
      products: "Array of identified products (string[])",
      services: "Array of identified services (string[])",
      targetAudience: "Identified target audience segments (string[])",
      valueProposition: "Extracted value proposition (string | null)"
    },
    technical: {
      hasCustomerPortal: "Boolean indicating customer portal presence (boolean)",
      hasMobileApp: "Boolean indicating mobile app existence (boolean)",
      hasEcommerce: "Boolean indicating e-commerce functionality (boolean)",
      identifiedTechnologies: "Array of technologies identified (string[])"
    },
    meta: {
      analysisDate: "Timestamp of analysis (Date)",
      confidence: "Overall confidence score (0-1)",
      pagesAnalyzed: "Number of pages analyzed (number)",
      dataQuality: "Assessment of data quality (high|medium|low)"
    }
  },

  /**
   * PRIVACY AND LIMITATIONS
   * ----------------------
   * Important considerations
   */
  limitations: [
    "Cannot analyze information behind login screens",
    "May be blocked by some websites with strict bot protection",
    "Cannot access dynamically loaded content (JavaScript rendered)",
    "Accuracy varies based on website structure and content clarity",
    "May not handle internationalized websites properly"
  ],
  privacyConsiderations: [
    "Only analyze publicly available information",
    "Do not store full website content, only extracted information",
    "Respect robots.txt directives",
    "Use appropriate rate limiting to avoid overloading servers",
    "Store only business contact information, not personal contacts"
  ],

  /**
   * IMPLEMENTATION PHASES
   * --------------------
   */
  implementationPhases: {
    phase1: {
      name: "Basic Analyzer",
      features: [
        "Homepage analysis only",
        "Extract company name, contact email, and basic description",
        "Identify obvious social links"
      ]
    },
    phase2: {
      name: "Enhanced Extraction",
      features: [
        "Multi-page analysis",
        "Structured data extraction",
        "Better contact information parsing",
        "Industry identification"
      ]
    },
    phase3: {
      name: "Full Analysis Suite",
      features: [
        "Business model analysis",
        "Technical stack identification",
        "Competitive positioning insights",
        "Content strategy analysis"
      ]
    }
  }
};
