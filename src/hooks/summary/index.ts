
// This file needs to be kept for imports in other files,
// but we're removing education-related functionality

// Export a simple placeholder function to avoid breaking imports
export const useAiDailySummary = () => {
  return {
    summary: null,
    loading: false,
    error: null
  };
};
