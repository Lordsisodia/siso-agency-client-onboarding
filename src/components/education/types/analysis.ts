
export interface VideoChapter {
  timestamp: string;
  title: string;
  summary: string;
}

export interface CodeSegment {
  language: string;
  timestamp: string;
  snippet_preview: string;
  quality_score?: number;
  best_practices?: string[];
  potential_issues?: string[];
}

export interface ExternalResource {
  type: 'Documentation' | 'GitHub' | 'Article';
  url: string;
  description: string;
  difficulty_level?: 'Beginner' | 'Intermediate' | 'Advanced';
  community_rating?: number;
}

export interface VisualAid {
  timestamp: string;
  type: 'Demo' | 'Diagram' | 'Code' | 'Slides';
  description: string;
  preview_url?: string;
}

export interface TimelineItem {
  timestamp: string;
  type: 'chapter' | 'code' | 'visual' | 'concept';
  title: string;
  description: string;
  content_ref: string;
}

export interface CodeQualityMetrics {
  overall_score: number;
  maintainability: number;
  reusability: number;
  best_practices: string[];
  improvement_suggestions: string[];
}

export interface LearningPath {
  prerequisites: string[];
  next_steps: string[];
  skill_tree: {
    concept: string;
    mastery_level: number;
    dependencies: string[];
  }[];
}

export interface PracticeExercise {
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  type: 'Quiz' | 'Code' | 'Project';
  content: unknown;
}

export interface CommunityInsight {
  type: 'Note' | 'Tip' | 'Warning';
  content: string;
  timestamp?: string;
  votes: number;
}

export interface SupplementaryMaterial {
  type: 'Documentation' | 'Tutorial' | 'Blog' | 'Video';
  title: string;
  url: string;
  description: string;
  difficulty_level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface SentimentAnalysis {
  overall_score: number;
  key_sentiments: string[];
  engagement_prediction: number;
}

export interface VideoAnalysis {
  id: string;
  video_id: string;
  chapters: VideoChapter[];
  complexity_score: number;
  prerequisites: string[];
  technologies_mentioned: string[];
  code_segments: CodeSegment[];
  key_concepts: string[];
  learning_outcomes: string[];
  estimated_completion_time: number;
  difficulty_level: 'Beginner' | 'Intermediate' | 'Advanced';
  external_resources: ExternalResource[];
  sentiment_analysis: SentimentAnalysis;
  visual_aids: VisualAid[];
  content_timeline: TimelineItem[];
  code_quality_metrics: CodeQualityMetrics;
  learning_path: LearningPath;
  practice_exercises: PracticeExercise[];
  community_insights: CommunityInsight[];
  supplementary_materials: SupplementaryMaterial[];
}
