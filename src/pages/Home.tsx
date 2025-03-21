
import React, { useEffect, useState } from 'react';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { Waves } from '@/components/ui/waves-background';
import { motion } from 'framer-motion';

export default function Home() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Mark component as ready after a short delay to ensure smooth animations
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-siso-bg to-siso-bg/95 overflow-hidden">
      {/* Interactive background with waves - hardware accelerated */}
      <Waves 
        lineColor="rgba(255, 87, 34, 0.07)"
        backgroundColor="transparent"
        waveSpeedX={0.012} 
        waveSpeedY={0.006}
        waveAmpX={20}
        waveAmpY={12}
        friction={0.96}
        tension={0.01}
        maxCursorMove={100}
        xGap={65}
        yGap={90}
        className="absolute inset-0 z-0 transform-gpu"
      />
      
      {/* Content container - hardware accelerated */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container relative z-10 mx-auto max-w-4xl p-4 md:p-8 h-screen flex flex-col transform-gpu"
      >
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-8 text-center transform-gpu"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-siso-red to-siso-orange bg-clip-text text-transparent animate-gradient">
            SISO AI Assistant
          </h1>
          <p className="text-siso-text-muted max-w-2xl mx-auto">
            Ask me anything about AI tools, education, networking, or get help with your projects
          </p>
        </motion.header>
        
        <ChatInterface 
          title="AI Assistant"
          systemPrompt="You are a helpful assistant for SISO. You provide information about AI tools, education resources, and help users with their projects. Be friendly, concise, and accurate. Respond in a conversational style, using markdown formatting where appropriate to improve readability."
          welcomeMessage="Hi there! I'm your SISO AI assistant. How can I help you today? You can ask me about AI tools, educational resources, or get guidance on your projects."
          inputPlaceholder="Ask me anything..."
          className="flex-1 backdrop-blur-sm"
        />
      </motion.div>
    </div>
  );
}
