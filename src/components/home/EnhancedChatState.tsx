import { ChatMessage } from '@/types/chat';
import { Bot, Command, History, Send, Copy, Notebook, Search, Globe, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AIThinkingLoader } from '@/components/ui/ai-thinking-loader';

interface EnhancedChatStateProps {
  messages: ChatMessage[];
  handleSubmit: (message: string) => Promise<void>;
  isLoading: boolean;
}

// Suggestions provide quick access to common queries
const suggestions = [
  "How can I automate my marketing workflows?",
  "What are the best AI tools for agencies?",
  "Tell me about the latest AI news",
  "Find educational content about AI",
];

export const EnhancedChatState = ({ messages, handleSubmit, isLoading }: EnhancedChatStateProps) => {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isWebSearchActive, setIsWebSearchActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      let message = input.trim();
      
      // Add web search indicator if web search is active
      if (isWebSearchActive) {
        message = `${message} (Please search the web for the most current information)`;
      }
      
      handleSubmit(message);
      setInput('');
    }
  };

  // Added clipboard functionality with user feedback
  const handleCopyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: "Message content has been copied to your clipboard",
    });
  };

  // Added Notion export functionality
  const handleNotionExport = (content: string) => {
    // [Plan] Implement actual Notion integration in the future
    toast({
      title: "Coming soon",
      description: "Notion export functionality will be available soon!",
    });
  };

  // Toggle web search functionality
  const toggleWebSearch = () => {
    setIsWebSearchActive(prev => !prev);
    toast({
      title: isWebSearchActive ? "Web search disabled" : "Web search enabled",
      description: isWebSearchActive 
        ? "AI will use its training data only" 
        : "AI will search the web for current information when needed",
    });
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto h-full bg-gradient-to-b from-black/40 to-black/20 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden shadow-2xl">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-siso-red/20 to-siso-orange/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-gradient-to-r from-siso-red to-siso-orange">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-white">AI Plan Assistant</h2>
            <p className="text-xs text-white/70">Powered by GPT-4o-mini</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn(
                    "rounded-full bg-white/5 hover:bg-white/10 transition-colors",
                    isWebSearchActive && "bg-siso-orange/20 text-siso-orange"
                  )}
                  onClick={toggleWebSearch}
                >
                  <Globe className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {isWebSearchActive ? "Disable web search" : "Enable web search"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-siso-text/10 scrollbar-track-transparent">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex w-full items-start gap-4 rounded-lg p-6",
              message.role === 'assistant' 
                ? 'bg-black/30 backdrop-blur-sm border border-white/5' 
                : 'bg-gradient-to-r from-siso-orange/10 to-siso-red/10'
            )}
          >
            {message.role === 'assistant' && (
              <div className="flex-shrink-0 rounded-full bg-gradient-to-r from-siso-orange to-siso-red p-2">
                <Bot className="h-5 w-5 text-white" />
              </div>
            )}
            <div className="flex-1 space-y-4">
              {message.loading ? (
                <AIThinkingLoader variant="default" showStages={true} />
              ) : (
                <div className="relative">
                  {message.role === 'assistant' && (
                    <div className="absolute top-0 right-0 flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-siso-text hover:bg-white/5"
                        onClick={() => handleCopyToClipboard(message.content)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-siso-text hover:bg-white/5"
                        onClick={() => handleNotionExport(message.content)}
                      >
                        <Notebook className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <div className="text-sm text-siso-text leading-relaxed pt-8 whitespace-pre-wrap">
                    {message.content}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex w-full items-start gap-4 rounded-lg p-6 bg-black/30 backdrop-blur-sm border border-white/5">
            <div className="flex-shrink-0 rounded-full bg-gradient-to-r from-siso-orange to-siso-red p-2">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <AIThinkingLoader variant="detailed" showStages={true} />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input Section */}
      <div className="p-4 border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <form 
          onSubmit={handleFormSubmit}
          className="relative space-y-4"
        >
          {/* Quick Suggestions */}
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-black/70 backdrop-blur-xl rounded-lg border border-white/10"
              >
                <div className="grid grid-cols-1 gap-2">
                  {suggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      className="w-full justify-start text-left text-sm text-siso-text px-3 py-2 rounded-md hover:text-white hover:bg-white/5 flex items-center gap-2"
                      onClick={() => {
                        setInput(suggestion);
                        setShowSuggestions(false);
                      }}
                    >
                      <Lightbulb className="w-4 h-4 text-siso-orange" />
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Controls */}
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isWebSearchActive ? "Type your message (with web search enabled)..." : "Type your message..."}
                className={cn(
                  "w-full bg-black/30 text-white placeholder-gray-400 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-siso-orange/50 border border-white/10",
                  isWebSearchActive && "border-siso-orange/30 focus:ring-siso-orange/70"
                )}
                disabled={isLoading}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-siso-text/50 hover:text-siso-text"
                onClick={() => setShowSuggestions(!showSuggestions)}
              >
                <Command className="w-4 h-4" />
              </Button>
              
              {isWebSearchActive && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
                  <Search className="w-4 h-4 text-siso-orange mr-2" />
                </div>
              )}
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-siso-text/50 hover:text-siso-text"
              onClick={toggleWebSearch}
            >
              <Globe className={cn("w-4 h-4", isWebSearchActive && "text-siso-orange")} />
            </Button>

            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={cn(
                "bg-gradient-to-r from-siso-orange to-siso-red text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-siso-orange",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "relative overflow-hidden group"
              )}
            >
              <motion.span 
                className="absolute inset-0 bg-white/20 z-0" 
                initial={{ x: "-100%" }}
                animate={{ x: isLoading ? "0%" : "-100%" }}
                transition={{ duration: 0.8, ease: "linear", repeat: Infinity }}
              />
              <span className="relative z-10 flex items-center gap-1">
                {isLoading ? (
                  <>
                    <span className="animate-pulse">Processing</span>
                    <span className="inline-block">
                      <span className="animate-bounce delay-0">·</span>
                      <span className="animate-bounce delay-150">·</span>
                      <span className="animate-bounce delay-300">·</span>
                    </span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </Button>
          </div>
          
          {isWebSearchActive && (
            <div className="text-xs text-siso-orange/80 flex items-center gap-1.5 mt-1 ml-2">
              <Search className="w-3 h-3" />
              <span>Web search is enabled - AI will search for current information when needed</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
