
export interface ChatMessage {
  role: "user" | "assistant" | string; // Updated to accept string roles
  content: string;
  timestamp?: Date;
  id?: string;
  loading?: boolean;
}

export interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export interface ChatThreadProps {
  messages: ChatMessage[];
  isLoading?: boolean;
  error?: string | null;
}
