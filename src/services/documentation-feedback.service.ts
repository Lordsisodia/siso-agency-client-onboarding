
/**
 * Submit feedback for a documentation question
 */
export const saveQuestionFeedback = (
  questionId: string, 
  feedbackType: 'helpful' | 'not-helpful',
  userId?: string
): Promise<boolean> => {
  console.log(`Feedback saved: ${feedbackType} for question ${questionId} by user ${userId || 'anonymous'}`);
  return Promise.resolve(true);
};
