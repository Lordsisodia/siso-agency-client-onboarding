
// Complexity levels for content
export type ComplexityLevel = 'basic' | 'intermediate' | 'advanced' | 'expert';

// Type for technical complexity
export type TechnicalComplexity = 'basic' | 'intermediate' | 'advanced';

// Type for article impact
export type ArticleImpact = 'low' | 'medium' | 'high' | 'transformative';

// Categories for content
export type ContentCategory = 
  | 'AI Tools' 
  | 'AI Research' 
  | 'Industry News' 
  | 'Tutorials' 
  | 'Case Studies' 
  | 'Updates';

// Impact levels for articles
export type ImpactLevel = 'low' | 'medium' | 'high' | 'transformative';

// Source credibility levels
export type CredibilityLevel = 'low' | 'medium' | 'high' | 'authoritative';

// Colors for complexity levels
export const complexityColors = {
  basic: 'text-green-500 bg-green-500/10',
  intermediate: 'text-blue-500 bg-blue-500/10',
  advanced: 'text-purple-500 bg-purple-500/10',
  expert: 'text-orange-500 bg-orange-500/10'
};
