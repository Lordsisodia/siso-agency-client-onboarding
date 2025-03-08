
import React from 'react';
import { ChatInterface } from '@/components/chat/ChatInterface';

export default function Onboarding() {
  const onboardingSystemPrompt = `
    You are a professional and friendly project consultant helping to gather information about the client's app project requirements.
    
    Guide the conversation through these stages in a natural way:
    1. Company Information: Ask about company name, website, industry, etc.
    2. Project Overview: Ask about app purpose, objectives, and target audience.
    3. Feature Selection: Inquire about desired features and specific functionality.
    4. Budget & Timeline: Discuss budget expectations and project timeline.
    5. Additional Details: Collect any other relevant information.
    
    Be conversational but focused on collecting the necessary information. Ask one question at a time.
    Provide examples or options when relevant to help guide the user.
    Periodically summarize what you've learned to confirm understanding.
  `;

  return (
    <div className="min-h-screen bg-gradient-to-b from-siso-bg to-siso-bg/95 p-4 md:p-8">
      <div className="container mx-auto max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-siso-red to-siso-orange bg-clip-text text-transparent">
            Project Onboarding
          </h1>
          <p className="text-siso-text-muted">
            Let's gather some information about your app project to help us understand your requirements
          </p>
        </header>
        
        <ChatInterface 
          title="Project Consultant"
          systemPrompt={onboardingSystemPrompt}
          welcomeMessage="Hi there! I'm your project consultant and I'll help gather information about your app project. Let's start with some basics - what's your company name?"
          inputPlaceholder="Type your answer..."
          className="h-[calc(100vh-12rem)]"
          isOnboarding={true}
        />
      </div>
    </div>
  );
}
