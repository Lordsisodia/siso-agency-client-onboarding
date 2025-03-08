
import React from 'react';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-siso-bg to-siso-bg/95 p-4 md:p-8">
      <div className="container mx-auto max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-siso-red to-siso-orange bg-clip-text text-transparent">
            SISO AI Assistant
          </h1>
          <p className="text-siso-text-muted mb-6">
            Ask me anything about AI tools, education, networking, or get help with your projects
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <Link to="/onboarding">
              <Button className="bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90 text-white">
                Start Project Onboarding
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </header>
        
        <ChatInterface 
          title="AI Assistant"
          systemPrompt="You are a helpful assistant for SISO. You provide information about AI tools, education resources, and help users with their projects. Be friendly, concise, and accurate. Respond in a conversational style, using markdown formatting where appropriate to improve readability."
          welcomeMessage="Hi there! I'm your SISO AI assistant. How can I help you today? You can ask me about AI tools, educational resources, or get guidance on your projects."
          inputPlaceholder="Ask me anything..."
          className="h-[calc(100vh-12rem)]"
        />
      </div>
    </div>
  );
}
