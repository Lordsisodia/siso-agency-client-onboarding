
// Define enums for technical complexity and article impact
export enum TechnicalComplexity {
  Low = "Low",
  Medium = "Medium",
  High = "High"
}

export enum ArticleImpact {
  Low = "Low",
  Medium = "Medium",
  High = "High",
  Critical = "Critical"
}

// Define content category 
export enum ContentCategory {
  General = "General",
  Technology = "Technology",
  Business = "Business",
  Marketing = "Marketing",
  Design = "Design",
  Development = "Development",
  AITools = "AI Tools"
}

// Colors for different complexity and impact levels
export const complexityColors = {
  Low: {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-200"
  },
  Medium: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-200"
  },
  High: {
    bg: "bg-orange-100",
    text: "text-orange-800",
    border: "border-orange-200"
  },
  Critical: {
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-200"
  }
};

// Colors for different importance levels
export const importanceColors = {
  Low: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-200"
  },
  Medium: {
    bg: "bg-purple-100",
    text: "text-purple-800",
    border: "border-purple-200"
  },
  High: {
    bg: "bg-pink-100",
    text: "text-pink-800",
    border: "border-pink-200"
  },
  Critical: {
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-200"
  }
};
