
// Define technical complexity levels for news and articles
export type TechnicalComplexity = 'beginner' | 'intermediate' | 'advanced' | 'expert';

// Define impact assessment levels for news and articles
export type ArticleImpact = 'low' | 'medium' | 'high' | 'transformative';

// Color schemes for complexity and impact levels
export const complexityColors = {
  beginner: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
  intermediate: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
  advanced: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
  expert: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' }
};

// Color schemes for impact levels
export const impactColors = {
  low: { bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-200' },
  medium: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
  high: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' },
  transformative: { bg: 'bg-fuchsia-100', text: 'text-fuchsia-800', border: 'border-fuchsia-200' }
};

// Colors for importance rating
export const importanceColors = {
  1: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' },
  2: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
  3: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
  4: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
  5: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' }
};
