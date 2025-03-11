
export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: Date;
  id?: string;
  loading?: boolean;
}
