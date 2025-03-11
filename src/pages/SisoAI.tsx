
import React from 'react';
import { ChatInterface } from '@/components/chat/ChatInterface';

export default function SisoAI() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">SISO AI Assistant</h1>
      <ChatInterface 
        title="SISO AI" 
        welcomeMessage="Hello! I'm your SISO AI assistant. How can I help you today with your business planning needs?"
        inputPlaceholder="Ask me anything about SISO..."
      />
    </div>
  );
}
