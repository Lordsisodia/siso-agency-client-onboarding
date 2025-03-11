
export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: Date;
  id?: string;
  loading?: boolean;
}

// Removing unused types that were causing errors
// AgentCategory and ProcessingStage were referenced but not defined
