
// Define the technical complexity levels
export enum TechnicalComplexity {
  Low = "low",
  Medium = "medium",
  High = "high"
}

// Define the article impact levels
export enum ArticleImpact {
  Low = "low",
  Medium = "medium",
  High = "high"
}

// Define content categories
export enum ContentCategory {
  Research = "research",
  Product = "product",
  Tutorial = "tutorial",
  News = "news",
  Analysis = "analysis",
  Opinion = "opinion"
}

// Define color mappings for technical complexity
export const complexityColors: Record<TechnicalComplexity, {bg: string, text: string, border: string}> = {
  [TechnicalComplexity.Low]: {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-300"
  },
  [TechnicalComplexity.Medium]: {
    bg: "bg-yellow-100", 
    text: "text-yellow-800",
    border: "border-yellow-300"
  },
  [TechnicalComplexity.High]: {
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-300"
  }
};

// Define color mappings for article impact
export const impactColors: Record<ArticleImpact, {bg: string, text: string, border: string}> = {
  [ArticleImpact.Low]: {
    bg: "bg-gray-100",
    text: "text-gray-800",
    border: "border-gray-300"
  },
  [ArticleImpact.Medium]: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-300"
  },
  [ArticleImpact.High]: {
    bg: "bg-purple-100",
    text: "text-purple-800",
    border: "border-purple-300"
  }
};

// Define color mappings for importance
export const importanceColors: Record<string, {bg: string, text: string, border: string}> = {
  "high": {
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-300"
  },
  "medium": {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-300"
  },
  "low": {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-300"
  },
  "default": {
    bg: "bg-gray-100",
    text: "text-gray-800",
    border: "border-gray-300"
  }
};
