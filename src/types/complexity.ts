
export type TechnicalComplexity = 'simple' | 'moderate' | 'complex' | 'advanced';
export type ArticleImpact = 'low' | 'medium' | 'high' | 'transformative';
export type ContentCategory = 'news' | 'research' | 'product' | 'business' | 'opinion' | 'development' | 'other';

export const complexityColors = {
  simple: 'bg-green-100 text-green-800',
  moderate: 'bg-blue-100 text-blue-800',
  complex: 'bg-orange-100 text-orange-800',
  advanced: 'bg-purple-100 text-purple-800',
};

export const impactColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-blue-100 text-blue-800',
  high: 'bg-purple-100 text-purple-800',
  transformative: 'bg-pink-100 text-pink-800',
};

export const importanceColors = {
  low: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' },
  medium: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
  high: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
  critical: { bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-200' },
};

export const categoryColors = {
  news: 'bg-blue-100 text-blue-800',
  research: 'bg-purple-100 text-purple-800',
  product: 'bg-green-100 text-green-800',
  business: 'bg-amber-100 text-amber-800',
  opinion: 'bg-orange-100 text-orange-800',
  development: 'bg-indigo-100 text-indigo-800',
  other: 'bg-gray-100 text-gray-800',
};
