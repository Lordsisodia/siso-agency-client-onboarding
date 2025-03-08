
import { ChatMessage } from '@/types/chat';
import { Bot, Command, History, Send, Copy, Notebook } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      handleSubmit(input.trim());
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

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto h-full">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-6 p-4 scrollbar-thin scrollbar-thumb-siso-text/10 scrollbar-track-transparent">
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
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-siso-orange animate-bounce"></div>
                  <div className="h-2 w-2 rounded-full bg-siso-orange animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="h-2 w-2 rounded-full bg-siso-orange animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  <span className="text-sm text-siso-text/70 ml-2">AI is thinking...</span>
                </div>
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
                  <div className="text-sm text-siso-text leading-relaxed pt-8">
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
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-siso-orange animate-bounce"></div>
                <div className="h-2 w-2 rounded-full bg-siso-orange animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="h-2 w-2 rounded-full bg-siso-orange animate-bounce" style={{animationDelay: '0.4s'}}></div>
                <span className="text-sm text-siso-text/70 ml-2">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Input Section */}
      <div className="p-4 border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <form 
          onSubmit={handleFormSubmit}
          className="relative space-y-4"
        >
          {/* Quick Suggestions */}
          {showSuggestions && (
            <div
              className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-black/50 backdrop-blur-xl rounded-lg border border-white/10"
            >
              <div className="grid grid-cols-1 gap-2">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left text-sm text-siso-text hover:text-white hover:bg-white/5"
                    onClick={() => {
                      setInput(suggestion);
                      setShowSuggestions(false);
                    }}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Controls */}
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full bg-black/30 text-white placeholder-gray-400 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-siso-orange/50 border border-white/10"
                disabled={isLoading}
                onFocus={() => setShowSuggestions(true)}
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
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-siso-text/50 hover:text-siso-text"
              onClick={() => {}}
            >
              <History className="w-4 h-4" />
            </Button>

            <Button
              type="submit"
              disabled={isLoading}
              className={cn(
                "bg-gradient-to-r from-siso-orange to-siso-red text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-siso-orange",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
