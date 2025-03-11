
// Define processing stages for different AI chat operations
export const PROCESSING_STAGES = {
  SEARCH: [
    "Searching knowledge base",
    "Analyzing relevant documents",
    "Formulating response"
  ],
  PLAN: [
    "Analyzing requirements",
    "Identifying core features",
    "Estimating complexity",
    "Creating timeline"
  ],
  CODE: [
    "Analyzing code requirements",
    "Planning implementation",
    "Generating solution"
  ],
  SUMMARIZE: [
    "Reading content",
    "Identifying key points",
    "Creating concise summary"
  ],
  REVIEW: [
    "Analyzing document",
    "Checking for issues",
    "Generating feedback"
  ]
};

// Colors for different processing categories
export const CATEGORY_COLORS = {
  SEARCH: "blue",
  PLAN: "emerald",
  CODE: "amber",
  SUMMARIZE: "indigo",
  REVIEW: "purple"
};
