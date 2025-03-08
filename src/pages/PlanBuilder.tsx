
import React, { useState } from 'react';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { ManualInputSheet } from '@/components/plan-builder/ManualInputSheet';
import { Button } from '@/components/ui/button';
import { FileEdit } from 'lucide-react';
import { usePlanChatAssistant } from '@/hooks/use-plan-chat-assistant';

export default function PlanBuilder() {
  const [isManualInputOpen, setIsManualInputOpen] = useState(false);
  const { sendMessage } = usePlanChatAssistant();

  const handleSubmitToAI = async (prompt: string, formData?: Record<string, any>) => {
    await sendMessage(prompt, undefined, formData);
  };

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-siso-text">AI Project Planner</h1>
          <p className="text-siso-text-muted mt-1">
            Get detailed project plans, budgets, and timelines based on your requirements
          </p>
        </div>
        
        <Button 
          onClick={() => setIsManualInputOpen(true)}
          className="bg-gradient-to-r from-siso-orange to-siso-red text-white"
        >
          <FileEdit className="mr-2 h-4 w-4" />
          Create Plan With Form
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <ChatInterface 
          title="AI Project Planner" 
          welcomeMessage="Hi! I'm your AI project planning assistant. Tell me about the app or software you want to build, and I'll help create a detailed plan including features, timeline, and budget estimates. You can describe your project in your own words or use the form button above for a more structured approach."
          inputPlaceholder="Describe your project requirements..."
          systemPrompt="You are a professional project planning assistant specialized in helping users create comprehensive software project plans. Help users define requirements, select features, estimate timelines, and budget effectively."
          usePlanAssistant={true}
        />
      </div>

      <ManualInputSheet 
        isOpen={isManualInputOpen} 
        onClose={() => setIsManualInputOpen(false)}
        onSubmitToAI={handleSubmitToAI}
      />
    </div>
  );
}
