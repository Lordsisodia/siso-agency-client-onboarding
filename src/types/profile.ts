
import { Json } from '@/integrations/supabase/types';

export interface ProfileFormData {
  fullName: string;
  businessName: string;
  businessType: string;
  industry: string;
  interests: string;
  bio: string;
  linkedinUrl: string;
  websiteUrl: string;
  youtubeUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  professionalRole: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon?: string;
}

export interface ProfileData {
  id: string;
  full_name: string;
  avatar_url: string | null;
  banner_url: string | null;
  points: number;
  siso_tokens: number;
  rank: string;
  business_name: string | null;
  business_type: string | null;
  industry: string | null;
  interests: string[] | null;
  bio: string | null;
  linkedin_url: string | null;
  website_url: string | null;
  youtube_url: string | null;
  instagram_url: string | null;
  twitter_url: string | null;
  professional_role: string | null;
  achievements?: Achievement[];
  contribution_count?: number;
  referral_count?: number;
}
