
import React from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';
import { ChatInput } from '@/components/ui/chat-input';

interface ChatInputFormProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export function ChatInputForm({ inputValue, setInputValue, handleSubmit, isSubmitting }: ChatInputFormProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
    >
      <ChatInput
        placeholder="Type your message..."
        className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={isSubmitting}
      />
      <div className="flex items-center p-3 pt-0 justify-between">
        <div className="flex">
          <button type="button" className="p-2 hover:bg-accent rounded-md" disabled={isSubmitting}>
            <Paperclip className="size-4" />
          </button>
          <button type="button" className="p-2 hover:bg-accent rounded-md" disabled={isSubmitting}>
            <Mic className="size-4" />
          </button>
        </div>
        <button 
          type="submit" 
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2 disabled:opacity-50"
          disabled={!inputValue.trim() || isSubmitting}
        >
          Send <Send className="size-4" />
        </button>
      </div>
    </form>
  );
}
