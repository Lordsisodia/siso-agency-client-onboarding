
import React from 'react';
import { motion } from 'framer-motion';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { SmartProjectOnboarding } from '@/components/plan-builder/SmartProjectOnboarding';
import { ChatMessage } from '@/types/chat';
import { ConnectionErrorAlert } from './ConnectionErrorAlert';

interface ProjectContentProps {
  showOnboarding: boolean;
  showChat: boolean;
  connectionError: string | null;
  projectId: string;
  messages: ChatMessage[];
  isLoading: boolean;
  onStartChat: (data?: any) => Promise<void>;
  onSkipOnboarding: () => Promise<void>;
}

export const ProjectContent: React.FC<ProjectContentProps> = ({
  showOnboarding,
  showChat,
  connectionError,
  projectId,
  messages,
  isLoading,
  onStartChat,
  onSkipOnboarding
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 relative z-10">
      <ConnectionErrorAlert errorMessage={connectionError} />
      
      {showOnboarding && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="z-10 relative"
        >
          <SmartProjectOnboarding 
            onComplete={onStartChat} 
            onSkip={onSkipOnboarding} 
          />
        </motion.div>
      )}
      
      {showChat && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="z-10 relative"
        >
          <div className="p-0.5 bg-gradient-to-r from-siso-red/40 to-siso-orange/40 rounded-xl shadow-lg">
            <ChatInterface 
              title="Project Planning Assistant" 
              welcomeMessage="I'll help you plan your project. Tell me about your goals, requirements, and any specific needs..."
              inputPlaceholder="Share details about your project, or ask me questions..."
              systemPrompt="You are a helpful project planning assistant. Guide the user through creating a new project by asking for information in a conversational way. Suggest they provide their website URL or social links for better analysis. Ask for: project/company name, website URL, social media profiles, project goals, target audience, and requirements. Be friendly and conversational."
              usePlanAssistant={true}
              projectId={projectId}
              className="border-0 bg-transparent"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};
