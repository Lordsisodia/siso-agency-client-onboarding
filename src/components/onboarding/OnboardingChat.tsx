
import React, { useEffect, useRef } from 'react';
import { useOnboardingChat } from '@/hooks/useOnboardingChat';
import { ChatInput } from '@/components/chat/ChatInput';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function OnboardingChat() {
  const { 
    messages, 
    isLoading, 
    initOnboarding, 
    sendMessage, 
    progress 
  } = useOnboardingChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    initOnboarding();
  }, [initOnboarding]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // If onboarding is complete, redirect to dashboard
  useEffect(() => {
    if (progress.currentStep === 'complete') {
      const timer = setTimeout(() => {
        navigate('/plan-builder');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [progress.currentStep, navigate]);

  return (
    <div className="flex flex-col h-full bg-siso-bg-card/20 backdrop-blur-md border border-siso-border rounded-xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="p-4 border-b border-siso-border bg-gradient-to-r from-siso-red/10 to-siso-orange/10 backdrop-blur-md">
        <h2 className="text-lg font-semibold text-siso-text">Welcome to SISO</h2>
        <p className="text-sm text-siso-text-muted">Let's get you set up with a personalized experience</p>
      </div>
      
      {/* Chat Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6 max-w-3xl mx-auto">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {message.role === 'assistant' && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage src="/lovable-uploads/c482563a-42db-4f47-83f2-c2e7771400b7.png" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div 
                    className={`p-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-siso-orange/20 text-siso-text' 
                        : 'bg-siso-text/10 text-siso-text'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex gap-3 max-w-[80%]">
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage src="/lovable-uploads/c482563a-42db-4f47-83f2-c2e7771400b7.png" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div className="p-3 rounded-lg bg-siso-text/10 text-siso-text">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-siso-text/40 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-siso-text/40 animate-bounce delay-150"></div>
                    <div className="w-2 h-2 rounded-full bg-siso-text/40 animate-bounce delay-300"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Completion Message */}
          {progress.currentStep === 'complete' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-lg bg-gradient-to-r from-siso-red/20 to-siso-orange/20 border border-siso-orange/30 text-center"
            >
              <h3 className="text-xl font-semibold text-siso-text mb-2">Onboarding Complete!</h3>
              <p className="text-siso-text-muted mb-4">
                Thanks for sharing your information. You're all set to start using SISO!
              </p>
              <Button 
                onClick={() => navigate('/plan-builder')}
                className="bg-gradient-to-r from-siso-red to-siso-orange text-white"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Input Area */}
      {progress.currentStep !== 'complete' && (
        <div className="p-4 border-t border-siso-border">
          <ChatInput 
            onSubmit={sendMessage} 
            isLoading={isLoading} 
            placeholder="Type your message..." 
          />
        </div>
      )}
    </div>
  );
}
