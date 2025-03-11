
// This file exports stub implementations of education-related hooks
// These will be properly implemented when the education features are developed

// Export stub hooks for educator-related functionality
export const useEducatorsList = () => {
  return {
    educators: [],
    loading: false,
    error: null
  };
};

export const useEducatorVideos = (educatorId: string) => {
  return {
    videos: [],
    loading: false
  };
};

export const useEducatorProfile = (educatorId: string) => {
  return {
    educator: null,
    loading: false
  };
};

export const useFeaturedVideos = () => {
  return {
    videos: [],
    loading: false
  };
};

export const useVideoCategories = () => {
  return {
    categories: [],
    loading: false
  };
};

export const useVideoDetails = (videoId: string) => {
  return {
    video: null,
    loading: false,
    relatedVideos: []
  };
};

// Export stub for video analysis 
export const useVideoAnalysis = (videoId: string) => {
  return {
    topics: [],
    loading: false
  };
};

// Export stub for user video progress
export const useUserVideoProgress = (videoId: string, userId: string) => {
  return {
    progress: 0,
    completed: false,
    loading: false,
    updateProgress: () => Promise.resolve()
  };
};
