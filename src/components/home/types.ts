
export interface HomeMessage {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  assistantType?: string;
  isLoading?: boolean;
}
