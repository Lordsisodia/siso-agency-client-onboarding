
import React from 'react';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { Waves } from '@/components/ui/waves-background';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-siso-bg to-siso-bg/95 overflow-hidden">
      {/* Interactive background */}
      <Waves 
        lineColor="rgba(255, 87, 34, 0.1)"
        backgroundColor="transparent"
        waveSpeedX={0.01} 
        waveSpeedY={0.005}
        waveAmpX={20}
        waveAmpY={10}
        className="absolute inset-0 z-0"
      />
      
      {/* Content container */}
      <div className="container relative z-10 mx-auto max-w-4xl p-4 md:p-8 h-screen flex flex-col">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-siso-red to-siso-orange bg-clip-text text-transparent animate-gradient">
            SISO AI Assistant
          </h1>
          <p className="text-siso-text-muted max-w-2xl mx-auto">
            Ask me anything about AI tools, education, networking, or get help with your projects
          </p>
        </header>
        
        <ChatInterface 
          title="AI Assistant"
          systemPrompt="You are a helpful assistant for SISO. You provide information about AI tools, education resources, and help users with their projects. Be friendly, concise, and accurate. Respond in a conversational style, using markdown formatting where appropriate to improve readability."
          welcomeMessage="Hi there! I'm your SISO AI assistant. How can I help you today? You can ask me about AI tools, educational resources, or get guidance on your projects."
          inputPlaceholder="Ask me anything..."
          className="flex-1 backdrop-blur-sm"
        />
      </div>
    </div>
  );
}
