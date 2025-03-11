
import React, { useRef, useState, useEffect } from 'react';
import { useAutoScroll } from '@/hooks/use-auto-scroll';

interface ChatMessageListProps {
  children: React.ReactNode;
  className?: string;
}

export function ChatMessageList({ children, className = '' }: ChatMessageListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
  
  // Setup auto-scrolling
  useEffect(() => {
    if (listRef.current && isScrolledToBottom) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [children, isScrolledToBottom]);
  
  // Handle scroll events to detect if user has scrolled away from bottom
  const handleScroll = () => {
    if (!listRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    const isBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 10;
    setIsScrolledToBottom(isBottom);
  };
  
  return (
    <div 
      ref={listRef}
      className={`flex-1 overflow-y-auto ${className}`}
      onScroll={handleScroll}
    >
      {children}
      {!isScrolledToBottom && (
        <button 
          className="fixed bottom-20 right-5 bg-primary text-white rounded-full p-2 shadow-lg"
          onClick={() => {
            if (listRef.current) {
              listRef.current.scrollTop = listRef.current.scrollHeight;
              setIsScrolledToBottom(true);
            }
          }}
        >
          <span className="sr-only">Scroll to bottom</span>
          ↓
        </button>
      )}
    </div>
  );
}
