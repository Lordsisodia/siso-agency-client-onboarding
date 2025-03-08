
import React from 'react';
import { ChatInterface } from '@/components/chat/ChatInterface';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-siso-bg to-siso-bg/95 p-4 md:p-8">
      <div className="container mx-auto max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-siso-red to-siso-orange bg-clip-text text-transparent">
            SISO AI Assistant
          </h1>
          <p className="text-siso-text-muted">
            Ask me anything about AI tools, education, networking, or get help with your projects
          </p>
        </header>
        
        <ChatInterface 
          title="AI Assistant"
          systemPrompt="You are a helpful assistant for SISO. You provide information about AI tools, education resources, and help users with their projects. Be friendly, concise, and accurate."
          welcomeMessage="Hi there! I'm your SISO AI assistant. How can I help you today? You can ask me about AI tools, educational resources, or get guidance on your projects."
          inputPlaceholder="Ask me anything..."
          className="h-[calc(100vh-12rem)]"
        />
      </div>
    </div>
  );
}
