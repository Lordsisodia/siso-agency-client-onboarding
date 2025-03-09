
import { Bot } from 'lucide-react';
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from '@/components/ui/expandable-chat';
import { ChatMessageList } from '@/components/ui/chat-message-list';
import { useChatAssistantState } from './hooks/useChatAssistantState';
import { ChatMessageBubble } from './components/ChatMessageBubble';
import { TypingIndicator } from './components/TypingIndicator';
import { ChatInputForm } from './components/ChatInputForm';

export function ChatAssistant() {
  const { messages, inputValue, setInputValue, isSubmitting, handleSubmit } = useChatAssistantState();

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
        <ChatMessageList>
          {messages.map((message) => (
            <ChatMessageBubble key={message.id} message={message} />
          ))}
          {isSubmitting && <TypingIndicator />}
        </ChatMessageList>
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
