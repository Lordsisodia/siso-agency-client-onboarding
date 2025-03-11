
export interface Assistant {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  assistant_type: string | null;
  prompt_template: string | null;
  use_cases: string[] | null;
  input_variables: string[] | null;
  model_type: string | null;
  response_format: string | null;
  rating: number | null;
  likes_count: number | null;
  downloads_count: number | null;
  website_url: string | null;
  gpt_url: string | null;
  review_average: number | null;
  review_count: number | null;
  num_conversations_str: string | null;
  
  // Added these properties from the database response
  assistant_id?: string;
  instructions?: string;
  metadata?: any;
  model?: string;
  tools?: any;
  created_at?: string;
  updated_at?: string;
}
