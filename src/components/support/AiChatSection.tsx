
import React from 'react';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AiChatSectionProps {
  className?: string;
}

export const AiChatSection = ({ className }: AiChatSectionProps) => {
  const [assistantMode, setAssistantMode] = React.useState('general');

  const assistantModes = {
    general: {
      title: "Support Assistant",
      welcomeMessage: "Hello! I'm your support assistant. How can I help with your project today?",
      inputPlaceholder: "Ask me anything about your project...",
      systemPrompt: "You are a helpful support assistant. Answer questions about the platform, provide guidance on using features, and help troubleshoot issues."
    },
    technical: {
      title: "Technical Assistant",
      welcomeMessage: "Hi there! I'm your technical assistant. I can help with code, APIs, integrations, and technical implementation questions.",
      inputPlaceholder: "Ask me a technical question...",
      systemPrompt: "You are a technical assistant with deep knowledge of programming and system architecture. Provide detailed technical explanations and code examples when relevant."
    },
    project: {
      title: "Project Planning Assistant",
      welcomeMessage: "Welcome! I'm your project planning assistant. I can help you outline your project, define requirements, and plan your implementation strategy.",
      inputPlaceholder: "Ask me about project planning...",
      systemPrompt: "You are a project planning assistant. Help users define project requirements, select appropriate features, and create effective implementation strategies."
    }
  };

  const handleModeChange = (value: string) => {
    setAssistantMode(value);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">AI Assistant</h2>
        <Select value={assistantMode} onValueChange={handleModeChange}>
          <SelectTrigger className="w-[200px] bg-siso-bg-card/20 border-siso-border">
            <SelectValue placeholder="Select mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General Support</SelectItem>
            <SelectItem value="technical">Technical Help</SelectItem>
            <SelectItem value="project">Project Planning</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mb-4">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="examples">Example Questions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="mt-0">
          <Card className="bg-siso-bg-card/20 backdrop-blur-sm border border-siso-border rounded-xl overflow-hidden">
            <CardContent className="p-0 h-[70vh]">
              <ChatInterface 
                title={assistantModes[assistantMode as keyof typeof assistantModes].title}
                welcomeMessage={assistantModes[assistantMode as keyof typeof assistantModes].welcomeMessage}
                inputPlaceholder={assistantModes[assistantMode as keyof typeof assistantModes].inputPlaceholder}
                systemPrompt={assistantModes[assistantMode as keyof typeof assistantModes].systemPrompt}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="examples" className="mt-0 space-y-4">
          <Card className="bg-siso-bg-card/20 backdrop-blur-sm border border-siso-border rounded-xl">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Try asking the assistant:</h3>
              <ul className="space-y-3">
                <li className="p-3 bg-siso-bg-card/30 rounded-md hover:bg-siso-bg-card/50 transition-colors cursor-pointer">
                  "How do I create a new project?"
                </li>
                <li className="p-3 bg-siso-bg-card/30 rounded-md hover:bg-siso-bg-card/50 transition-colors cursor-pointer">
                  "What's the difference between projects and tasks?"
                </li>
                <li className="p-3 bg-siso-bg-card/30 rounded-md hover:bg-siso-bg-card/50 transition-colors cursor-pointer">
                  "How can I invite team members to collaborate?"
                </li>
                <li className="p-3 bg-siso-bg-card/30 rounded-md hover:bg-siso-bg-card/50 transition-colors cursor-pointer">
                  "I'm getting an error when trying to save my profile"
                </li>
                <li className="p-3 bg-siso-bg-card/30 rounded-md hover:bg-siso-bg-card/50 transition-colors cursor-pointer">
                  "What's new in the latest platform update?"
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
