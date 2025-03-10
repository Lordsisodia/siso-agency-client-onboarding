
// Types for content complexity and impact ratings

export type TechnicalComplexity = 'low' | 'medium' | 'high' | 'expert';
export type ArticleImpact = 'minimal' | 'moderate' | 'significant' | 'transformative';
export type ContentCategory = 'technology' | 'business' | 'strategy' | 'research' | 'news' | 'tutorial' | 'opinion';

// Colors for different complexity levels
export const complexityColors = {
  low: {
    bg: '#E6F7EC',
    text: '#18794E',
    border: '#D3F0E1'
  },
  medium: {
    bg: '#FEF7E6',
    text: '#946300',
    border: '#FEECBC'
  },
  high: {
    bg: '#FEE6E6',
    text: '#BF0D36',
    border: '#FCCFCF'
  },
  expert: {
    bg: '#E6E6FE',
    text: '#383899',
    border: '#CFCFFC'
  }
};

// Colors for different impact levels
export const impactColors = {
  minimal: {
    bg: '#F0F0F0',
    text: '#6E6E6E',
    border: '#E0E0E0'
  },
  moderate: {
    bg: '#E6F0FE',
    text: '#0053D9',
    border: '#C7E0FF'
  },
  significant: {
    bg: '#FEE6FE',
    text: '#9C00AD',
    border: '#F8C4F8'
  },
  transformative: {
    bg: '#F7E6F7',
    text: '#6E0091',
    border: '#EEC4EE'
  }
};

// Map for importance levels colors
export const importanceColors = {
  low: {
    bg: '#F5F5F5',
    text: '#717171',
    border: '#E5E5E5'
  },
  medium: {
    bg: '#FBF8EF',
    text: '#93762C',
    border: '#F1EBDB'
  },
  high: {
    bg: '#F2F8EF',
    text: '#3F7A22',
    border: '#E3EDDE'
  },
  critical: {
    bg: '#FFF0EE',
    text: '#C53010',
    border: '#FCDDD8'
  }
};
