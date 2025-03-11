
// Remove blog imports that no longer exist
export interface ContentTemplate {
  id: string;
  title: string;
  description: string;
  templateType: 'article' | 'newsletter' | 'social' | 'other';
  sections: string[];
  tags: string[];
  created_at: string;
}

export interface ContentTemplateWithAnalysis extends ContentTemplate {
  analysis: {
    readingTime: number;
    complexity: 'simple' | 'medium' | 'complex';
    targetAudience: string[];
    tone: string;
  };
}
