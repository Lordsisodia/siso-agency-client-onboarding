
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import { ThinkingDots } from './processing/ThinkingDots';
import { Globe, Brain, ChevronDown, ChevronUp, Code, CopyIcon, CheckIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export interface ChatMessageProps {
  message?: ChatMessageType;
  content?: string;
  assistantType?: string;
  isLoading?: boolean;
  role?: 'user' | 'assistant' | string;
  metadata?: {
    web_search?: boolean;
    reasoning?: boolean;
    structured_output?: boolean;
    [key: string]: any;
  };
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  content,
  assistantType,
  isLoading,
  role: explicitRole,
  metadata
}) => {
  // Use explicit role if provided, otherwise use message.role
  const isUser = explicitRole 
    ? explicitRole === 'user' 
    : (message && typeof message.role === 'string' && message.role === 'user');
  
  // Use content prop directly or from message object
  const displayContent = content || (message?.content || '');

  // Get metadata from props or message
  const messageMetadata = metadata || message?.metadata || {};
  const usedWebSearch = messageMetadata.web_search;
  const usedReasoning = messageMetadata.reasoning;
  const hasStructuredOutput = messageMetadata.structured_output;

  // State for typewriter effect
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();
  
  // Try parsing JSON
  const [parsedJson, setParsedJson] = useState<any>(null);
  
  useEffect(() => {
    if (!isUser && hasStructuredOutput && displayContent) {
      try {
        const jsonData = JSON.parse(displayContent);
        setParsedJson(jsonData);
      } catch (e) {
        console.error("Failed to parse JSON in message:", e);
        setParsedJson(null);
      }
    } else {
      setParsedJson(null);
    }
  }, [displayContent, isUser, hasStructuredOutput]);
  
  // Apply typewriter effect when message content changes and it's an assistant message
  useEffect(() => {
    if (!isUser && !isLoading && displayContent && displayContent.trim() !== '') {
      // Skip typewriter for structured data
      if (hasStructuredOutput) {
        setDisplayedText(displayContent);
        return;
      }
      
      setIsTyping(true);
      setDisplayedText('');
      
      let i = 0;
      const speed = 10; // ms per character - adjust for faster/slower typing
      
      const typeWriter = () => {
        if (i < displayContent.length) {
          setDisplayedText(displayContent.substring(0, i + 1));
          i++;
          setTimeout(typeWriter, speed);
        } else {
          setIsTyping(false);
        }
      };
      
      typeWriter();
    } else if (isUser) {
      // For user messages, display text immediately
      setDisplayedText(displayContent);
    }
  }, [displayContent, isUser, isLoading, hasStructuredOutput]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(displayContent);
    setIsCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Message content has been copied to your clipboard",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  // Function to render JSON in a nice format
  const renderJson = (data: any, level = 0): JSX.Element => {
    if (data === null) return <span className="text-blue-400">null</span>;
    if (typeof data === 'boolean') return <span className="text-blue-400">{data ? 'true' : 'false'}</span>;
    if (typeof data === 'number') return <span className="text-yellow-400">{data}</span>;
    if (typeof data === 'string') return <span className="text-green-400">"{data}"</span>;
    
    if (Array.isArray(data)) {
      return (
        <div className="pl-4 border-l border-white/10">
          [
          {data.map((item, index) => (
            <div key={index} className="pl-2">
              {renderJson(item, level + 1)}
              {index < data.length - 1 && ','}
            </div>
          ))}
          ]
        </div>
      );
    }
    
    if (typeof data === 'object') {
      return (
        <div className={`${level > 0 ? 'pl-4 border-l border-white/10' : ''}`}>
          {'{'}
          {Object.keys(data).map((key, index) => (
            <div key={key} className="pl-2">
              <span className="text-purple-400">"{key}"</span>: {renderJson(data[key], level + 1)}
              {index < Object.keys(data).length - 1 && ','}
            </div>
          ))}
          {'}'}
        </div>
      );
    }
    
    return <span>{String(data)}</span>;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`
          px-5 py-4 rounded-lg max-w-[80%] shadow-md border
          ${isUser 
            ? 'bg-gradient-to-r from-siso-orange/90 to-siso-red/90 text-white border-siso-orange/20' 
            : 'bg-gradient-to-r from-slate-800/90 to-slate-900/90 text-slate-50 border-white/10'
          }
          ${(message?.loading || isLoading) ? 'animate-pulse' : ''}
        `}
      >
        {(message?.loading || isLoading) ? (
          <ThinkingDots />
        ) : (
          <div className="relative">
            {!isUser && (
              <div className="absolute right-0 top-0 flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full hover:bg-white/10"
                  onClick={handleCopyToClipboard}
                >
                  {isCopied ? (
                    <CheckIcon className="h-3 w-3 text-green-400" />
                  ) : (
                    <CopyIcon className="h-3 w-3 text-white/70" />
                  )}
                </Button>
                {hasStructuredOutput && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full hover:bg-white/10"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? (
                      <ChevronUp className="h-3 w-3 text-white/70" />
                    ) : (
                      <ChevronDown className="h-3 w-3 text-white/70" />
                    )}
                  </Button>
                )}
              </div>
            )}
            
            {!isUser && (usedWebSearch || usedReasoning || hasStructuredOutput) && (
              <div className="flex gap-2 mb-2 text-xs text-slate-300 mt-6">
                {usedWebSearch && (
                  <div className="flex items-center gap-1">
                    <Globe className="w-3 h-3 text-blue-400" />
                    <span>Web search</span>
                  </div>
                )}
                {usedReasoning && (
                  <div className="flex items-center gap-1">
                    <Brain className="w-3 h-3 text-purple-400" />
                    <span>Advanced reasoning</span>
                  </div>
                )}
                {hasStructuredOutput && (
                  <div className="flex items-center gap-1">
                    <Code className="w-3 h-3 text-yellow-400" />
                    <span>Structured output</span>
                  </div>
                )}
              </div>
            )}
            
            <div className={cn(
              "whitespace-pre-wrap break-words leading-relaxed",
              !isUser && (usedWebSearch || usedReasoning || hasStructuredOutput) && "pt-2"
            )}>
              {isUser ? (
                displayedText
              ) : hasStructuredOutput && parsedJson && isExpanded ? (
                <div className="font-mono text-xs overflow-x-auto">
                  {renderJson(parsedJson)}
                </div>
              ) : isTyping ? (
                <>
                  {displayedText}
                  <span className="inline-block w-1.5 h-4 ml-0.5 bg-siso-orange/70 animate-pulse"></span>
                </>
              ) : (
                displayedText
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
