
import { DailySummaryData } from '@/types/daily-summary';

// Function to generate a title for the daily summary
export const generateSummaryTitle = (date: Date): string => {
  return `AI News Daily Summary for ${date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}`;
};

// Function to generate a description for the daily summary
export const generateSummaryDescription = (summary: DailySummaryData): string => {
  return `A comprehensive summary of the day's AI news generated on ${new Date(summary.created_at || '').toLocaleDateString()}${summary.generated_with ? ` using ${summary.generated_with}` : ''}.`;
};

// Format the date for display
export const formatSummaryDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Function to get a system prompt for generating daily summaries
export const getDailySummarySystemPrompt = (summary: DailySummaryData): string => {
  return `You are an AI that helps analyze daily summaries of AI news. The current summary was generated on ${new Date(summary.created_at || '').toLocaleDateString()}${summary.generated_with ? ` using ${summary.generated_with}` : ''}.`;
};

// Function for analyzing summary sentiment
export const analyzeSummarySentiment = (summary: DailySummaryData): {
  sentiment: string;
  score: number;
  explanation: string;
} => {
  // This is a simplified example - in a real app, you'd use more sophisticated sentiment analysis
  const sentiment = summary.sentiment || 'neutral';
  const score = summary.confidence_score || 0.5;
  
  let explanation = 'The sentiment analysis is neutral.';
  
  if (sentiment === 'positive' && score > 0.7) {
    explanation = 'The news appears notably positive today, suggesting favorable developments in AI.';
  } else if (sentiment === 'negative' && score > 0.7) {
    explanation = 'Today\'s news carries a relatively negative tone, possibly indicating challenges or concerns in the AI space.';
  } else if (sentiment === 'mixed') {
    explanation = 'The day\'s news is mixed, with both positive and concerning developments.';
  }
  
  return {
    sentiment,
    score,
    explanation
  };
};

// Function to extract the most important points
export const extractKeyPoints = (summary: DailySummaryData): string[] => {
  return summary.key_points || [];
};

// Function to count the number of unique topics in the summary
export const countTopics = (summary: DailySummaryData): number => {
  const categorizedPoints = summary.categorized_key_points || {};
  return Object.keys(categorizedPoints).length;
};
