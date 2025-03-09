
import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

interface AgentMessageProps {
  message: {
    role: string;
    content: string;
  };
}

export const AgentMessage: React.FC<AgentMessageProps> = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex gap-3 items-start"
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
        <Bot className="h-4 w-4 text-purple-600" />
      </div>
      
      <div className="flex-1 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <TypingEffect text={message.content} />
      </div>
    </motion.div>
  );
};

// Create a component that simulates typing animation
const TypingEffect: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 15 + Math.random() * 30); // Random typing speed for natural effect

      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex, text]);
  
  return (
    <div>
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
        >
          |
        </motion.span>
      )}
    </div>
  );
};
