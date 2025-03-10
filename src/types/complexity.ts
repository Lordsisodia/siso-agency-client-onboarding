
// Complexity levels for AI content
export type ComplexityLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

// Article impact levels
export type ArticleImpact = 'low' | 'medium' | 'high' | 'transformative';

// Content categories
export enum ContentCategory {
  AITools = 'ai_tools',
  Development = 'development',
  Marketing = 'marketing',
  Business = 'business',
  Research = 'research',
  News = 'news',
  Education = 'education',
  Agency = 'agency',
  Policy = 'policy',
  Ethics = 'ethics',
  Other = 'other'
}

// Technical complexity rating from 1-5
export type TechnicalComplexity = 1 | 2 | 3 | 4 | 5;

// Source credibility rating from 1-5
export type CredibilityRating = 1 | 2 | 3 | 4 | 5;
