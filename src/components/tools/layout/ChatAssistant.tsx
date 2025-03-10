
import { Bot } from 'lucide-react';
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from '@/components/ui/expandable-chat';
import { useChatAssistantState } from './hooks/useChatAssistantState';
import { ChatInputForm } from './components/ChatInputForm';
import { MessageList } from './components/MessageList';

export function ChatAssistant() {
  const { messages, inputValue, setInputValue, isSubmitting, handleSubmit } = useChatAssistantState();

  // Transform messages to the format expected by MessageList
  const formattedMessages = messages.map(msg => ({
    ...msg,
    sender: msg.sender
  }));

  return (
    <ExpandableChat
      size="lg"
      position="bottom-right"
      icon={<Bot className="h-6 w-6" />}
    >
      <ExpandableChatHeader className="flex-col text-center justify-center">
        <h1 className="text-xl font-semibold">Tools Assistant ✨</h1>
        <p className="text-sm text-muted-foreground">
          Ask me anything about our AI tools
        </p>
      </ExpandableChatHeader>

      <ExpandableChatBody>
        <MessageList 
          messages={formattedMessages}
          isSubmitting={isSubmitting}
        />
      </ExpandableChatBody>

      <ExpandableChatFooter>
        <ChatInputForm
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </ExpandableChatFooter>
    </ExpandableChat>
  );
}
