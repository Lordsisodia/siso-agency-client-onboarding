
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Bot, Lightbulb, Link, Mic, Phone } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VoiceInput } from './VoiceInput';
import { TextToSpeech } from './TextToSpeech';
import { ScheduleCall } from './ScheduleCall';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function EnhancedPlanChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversationStage, setConversationStage] = useState('initial');
  const [previousData, setPreviousData] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Add initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Hi! I\'m here to help you create a project specification for your custom app. Would you like to tell me about your company or website to get started?',
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isProcessing) return;

    setIsProcessing(true);
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    try {
      // Prepare current message history for the API
      const messageHistory = messages
        .concat(userMessage)
        .map(msg => ({ role: msg.role, content: msg.content }));
      
      // Call the chat assistant API
      const { data, error } = await supabase.functions.invoke('chat-with-plan-assistant', {
        body: { 
          messages: messageHistory,
          stage: conversationStage,
          previousData
        }
      });

      if (error) throw error;

      // Process extracted data if available
      if (data.extractedData) {
        console.log('Extracted data:', data.extractedData);
        
        // Update the previous data with extracted information
        setPreviousData(prev => ({ ...prev, ...data.extractedData }));
        
        // Determine if we should advance the conversation stage
        if (conversationStage === 'initial' && data.extractedData.website) {
          setConversationStage('companyResearch');
          
          // If a website was detected, try to analyze it
          if (data.extractedData.hasWebsite) {
            analyzeWebsite(data.extractedData.website);
          }
        } else if (
          (conversationStage === 'companyResearch' || conversationStage === 'initial') && 
          data.extractedData.mainGoal
        ) {
          setConversationStage('requirementGeneration');
        }
      }

      // Add assistant response
      setMessages(prev => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: data.message,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to get a response. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const analyzeWebsite = async (website: string) => {
    try {
      // Check if the website has a protocol, add https if not
      const websiteUrl = website.startsWith('http') ? website : `https://${website}`;
      
      const { data, error } = await supabase.functions.invoke('analyze-website', {
        body: { url: websiteUrl }
      });

      if (error) throw error;

      if (data.analysis) {
        console.log('Website analysis:', data.analysis);
        
        // Update the previous data with the analysis
        setPreviousData(prev => ({ ...prev, websiteAnalysis: data.analysis }));
        
        // Add a message about the analysis results
        setMessages(prev => [
          ...prev,
          {
            id: `assistant-analysis-${Date.now()}`,
            role: 'assistant',
            content: `I've analyzed your website and found some information that might help us create your project specification. I see you're in the ${data.analysis.industry || 'business'} industry. Would you like to confirm if this is correct and tell me more about your specific project goals?`,
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      console.error('Error analyzing website:', error);
      // Silently fail, don't show error to user
    }
  };

  const handleVoiceTranscription = (transcription: string) => {
    setInputValue(transcription);
    // Auto-send if it's a meaningful message
    if (transcription.length > 5) {
      handleSendMessage(transcription);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="text-primary h-6 w-6" />
            Project Specification Assistant
          </CardTitle>
          <CardDescription>
            I'll help you define your app development project with minimal input required.
          </CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="chat">Text Chat</TabsTrigger>
            <TabsTrigger value="voice">Voice</TabsTrigger>
            <TabsTrigger value="call">Schedule Call</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="flex flex-col">
            <CardContent className="p-6">
              <ScrollArea className="h-[400px] pr-4">
                <AnimatePresence initial={false}>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`mb-4 flex ${
                        message.role === 'assistant' ? 'justify-start' : 'justify-end'
                      }`}
                    >
                      <div
                        className={`rounded-lg p-3 max-w-[80%] ${
                          message.role === 'assistant'
                            ? 'bg-secondary text-secondary-foreground'
                            : 'bg-primary text-primary-foreground'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div className="prose prose-sm dark:prose-invert">
                            {message.content.split('\n').map((line, i) => (
                              <p key={i} className="m-0">
                                {line}
                              </p>
                            ))}
                          </div>
                          {message.role === 'assistant' && (
                            <TextToSpeech text={message.content} />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </ScrollArea>
            </CardContent>
            
            <CardFooter className="p-4 border-t">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="flex w-full gap-2"
              >
                <Input
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isProcessing}
                  className="flex-1"
                />
                <Button type="submit" disabled={!inputValue.trim() || isProcessing}>
                  {isProcessing ? (
                    <span className="animate-spin">⏳</span>
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </CardFooter>
          </TabsContent>
          
          <TabsContent value="voice">
            <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
              <div className="text-center mb-4">
                <h3 className="text-lg font-medium">Voice Input</h3>
                <p className="text-sm text-muted-foreground">
                  Speak to our assistant directly and get immediate feedback
                </p>
              </div>
              
              <VoiceInput 
                onTranscription={handleVoiceTranscription}
                isDisabled={isProcessing}
              />
              
              {isProcessing && (
                <p className="text-sm text-muted-foreground animate-pulse">
                  Processing your input...
                </p>
              )}
            </CardContent>
          </TabsContent>
          
          <TabsContent value="call">
            <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
              <div className="text-center mb-4">
                <h3 className="text-lg font-medium">Prefer to Talk to a Human?</h3>
                <p className="text-sm text-muted-foreground">
                  Schedule a call with our team to discuss your project in detail
                </p>
              </div>
              
              <ScheduleCall />
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Our team is available Monday to Friday, 9am to 5pm EST
                </p>
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-500" />
              Quick Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              <li>• Share your website for faster analysis</li>
              <li>• Be specific about your business goals</li>
              <li>• Mention your target audience</li>
              <li>• Describe any existing systems</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Mic className="h-4 w-4 text-blue-500" />
              Voice Commands
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              <li>• "Analyze our website at example.com"</li>
              <li>• "Our main goal is to increase sales"</li>
              <li>• "We need an app for inventory tracking"</li>
              <li>• "Our target users are small businesses"</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Phone className="h-4 w-4 text-green-500" />
              Talk to Sales
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ScheduleCall />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
