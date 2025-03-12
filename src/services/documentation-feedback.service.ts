
/**
 * Submit feedback for a documentation question
 */
export const saveQuestionFeedback = (
  questionId: string, 
  feedbackType: 'helpful' | 'neutral' | 'not-helpful',
  userId?: string
): Promise<boolean> => {
  console.log(`Feedback saved: ${feedbackType} for question ${questionId} by user ${userId || 'anonymous'}`);
  
  // In a real application, this would make an API call to store the feedback
  // For now, we'll just log it and return true
  return Promise.resolve(true);
};
