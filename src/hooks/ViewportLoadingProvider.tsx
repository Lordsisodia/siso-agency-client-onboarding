
import React, { createContext, useContext } from 'react';
import { useViewportLoading } from './useViewportLoading';

type ViewportLoadingContextType = {
  elementRef: React.RefObject<HTMLDivElement>;
  isVisible: boolean;
  isLoaded: boolean;
};

const ViewportLoadingContext = createContext<ViewportLoadingContextType | undefined>(undefined);

export const ViewportLoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const viewportLoading = useViewportLoading();

  return (
    <ViewportLoadingContext.Provider value={viewportLoading}>
      {children}
    </ViewportLoadingContext.Provider>
  );
};

export const useViewportLoadingContext = () => {
  const context = useContext(ViewportLoadingContext);
  if (context === undefined) {
    throw new Error('useViewportLoadingContext must be used within a ViewportLoadingProvider');
  }
  return context;
};
