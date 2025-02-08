export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_news: {
        Row: {
          article_type: string | null
          bookmarks: number | null
          category: string
          created_at: string
          date: string
          description: string
          id: string
          image_url: string | null
          impact: string
          priority: number | null
          reading_time: number | null
          source: string
          source_credibility: string | null
          technical_complexity: string | null
          title: string
          updated_at: string
          views: number | null
        }
        Insert: {
          article_type?: string | null
          bookmarks?: number | null
          category: string
          created_at?: string
          date: string
          description: string
          id?: string
          image_url?: string | null
          impact: string
          priority?: number | null
          reading_time?: number | null
          source: string
          source_credibility?: string | null
          technical_complexity?: string | null
          title: string
          updated_at?: string
          views?: number | null
        }
        Update: {
          article_type?: string | null
          bookmarks?: number | null
          category?: string
          created_at?: string
          date?: string
          description?: string
          id?: string
          image_url?: string | null
          impact?: string
          priority?: number | null
          reading_time?: number | null
          source?: string
          source_credibility?: string | null
          technical_complexity?: string | null
          title?: string
          updated_at?: string
          views?: number | null
        }
        Relationships: []
      }
      ai_news_bookmarks: {
        Row: {
          created_at: string | null
          id: string
          news_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          news_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          news_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_news_bookmarks_news_id_fkey"
            columns: ["news_id"]
            isOneToOne: false
            referencedRelation: "ai_news"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_news_reactions: {
        Row: {
          created_at: string | null
          id: string
          news_id: string | null
          reaction_type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          news_id?: string | null
          reaction_type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          news_id?: string | null
          reaction_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_news_reactions_news_id_fkey"
            columns: ["news_id"]
            isOneToOne: false
            referencedRelation: "ai_news"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_news_summaries: {
        Row: {
          created_at: string
          id: string
          news_id: string
          summary: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          news_id: string
          summary: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          news_id?: string
          summary?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_news_summaries_news_id_fkey"
            columns: ["news_id"]
            isOneToOne: true
            referencedRelation: "ai_news"
            referencedColumns: ["id"]
          },
        ]
      }
      assistant_analytics: {
        Row: {
          assistant_id: string
          average_rating: number | null
          created_at: string | null
          id: string
          interactions: number | null
          searches: number | null
          updated_at: string | null
          views: number | null
        }
        Insert: {
          assistant_id: string
          average_rating?: number | null
          created_at?: string | null
          id?: string
          interactions?: number | null
          searches?: number | null
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          assistant_id?: string
          average_rating?: number | null
          created_at?: string | null
          id?: string
          interactions?: number | null
          searches?: number | null
          updated_at?: string | null
          views?: number | null
        }
        Relationships: []
      }
      assistant_collection_items: {
        Row: {
          assistant_id: string
          collection_id: string | null
          created_at: string | null
          id: string
        }
        Insert: {
          assistant_id: string
          collection_id?: string | null
          created_at?: string | null
          id?: string
        }
        Update: {
          assistant_id?: string
          collection_id?: string | null
          created_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assistant_collection_items_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "assistant_collections"
            referencedColumns: ["id"]
          },
        ]
      }
      assistant_collections: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_featured: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_featured?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_featured?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      automations: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          integration_url: string | null
          name: string
          platform: string | null
          profile_image_url: string | null
          setup_guide: string | null
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          integration_url?: string | null
          name: string
          platform?: string | null
          profile_image_url?: string | null
          setup_guide?: string | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          integration_url?: string | null
          name?: string
          platform?: string | null
          profile_image_url?: string | null
          setup_guide?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      core_tools: {
        Row: {
          category: string
          created_at: string
          description: string | null
          downloads_count: number | null
          icon_url: string | null
          id: string
          likes_count: number | null
          name: string
          pricing_type: string | null
          profile_image_url: string | null
          rating: number | null
          reviews_count: number | null
          updated_at: string
          use_cases: string[] | null
          website_url: string | null
          youtube_url: string | null
          youtube_videos: Json | null
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          downloads_count?: number | null
          icon_url?: string | null
          id?: string
          likes_count?: number | null
          name: string
          pricing_type?: string | null
          profile_image_url?: string | null
          rating?: number | null
          reviews_count?: number | null
          updated_at?: string
          use_cases?: string[] | null
          website_url?: string | null
          youtube_url?: string | null
          youtube_videos?: Json | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          downloads_count?: number | null
          icon_url?: string | null
          id?: string
          likes_count?: number | null
          name?: string
          pricing_type?: string | null
          profile_image_url?: string | null
          rating?: number | null
          reviews_count?: number | null
          updated_at?: string
          use_cases?: string[] | null
          website_url?: string | null
          youtube_url?: string | null
          youtube_videos?: Json | null
        }
        Relationships: []
      }
      creator_tool_links: {
        Row: {
          created_at: string
          creator_id: string | null
          expertise_level: string | null
          id: string
          tool_id: string | null
          tutorial_count: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          creator_id?: string | null
          expertise_level?: string | null
          id?: string
          tool_id?: string | null
          tutorial_count?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          creator_id?: string | null
          expertise_level?: string | null
          id?: string
          tool_id?: string | null
          tutorial_count?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "creator_tool_links_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "education_creators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "creator_tool_links_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "core_tools"
            referencedColumns: ["id"]
          },
        ]
      }
      crypto_transactions: {
        Row: {
          created_at: string
          id: string
          points_exchanged: number
          status: string | null
          tokens_received: number
          transaction_hash: string | null
          transaction_type: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          points_exchanged: number
          status?: string | null
          tokens_received: number
          transaction_hash?: string | null
          transaction_type?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          points_exchanged?: number
          status?: string | null
          tokens_received?: number
          transaction_hash?: string | null
          transaction_type?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      education_creators: {
        Row: {
          categories: string[] | null
          channel_avatar_url: string | null
          channel_banner_url: string | null
          channel_description: string | null
          channel_description_links: Json | null
          channel_id: string | null
          channel_joined_date: string | null
          channel_location: string | null
          channel_name: string | null
          channel_total_videos: number | null
          channel_total_views: number | null
          channel_url: string | null
          content_themes: string[] | null
          created_at: string
          description: string | null
          expertise_level: string | null
          featured_videos: Json | null
          id: string
          implementation_guides: Json | null
          is_featured: boolean | null
          last_synced_at: string | null
          member_count: number | null
          member_type: string | null
          name: string
          niche: string | null
          number_of_subscribers: number | null
          profile_image_url: string | null
          relevant: string | null
          slug: string
          social_links: Json | null
          specialization: string[] | null
          success_cases: Json | null
          sync_completed_at: string | null
          sync_started_at: string | null
          sync_status: string | null
          tool_stack: Json | null
          tools_covered: string[] | null
          updated_at: string
          url: string | null
          video_count: number | null
          website_url: string | null
          youtube_url: string | null
          youtube_videos: Json | null
        }
        Insert: {
          categories?: string[] | null
          channel_avatar_url?: string | null
          channel_banner_url?: string | null
          channel_description?: string | null
          channel_description_links?: Json | null
          channel_id?: string | null
          channel_joined_date?: string | null
          channel_location?: string | null
          channel_name?: string | null
          channel_total_videos?: number | null
          channel_total_views?: number | null
          channel_url?: string | null
          content_themes?: string[] | null
          created_at?: string
          description?: string | null
          expertise_level?: string | null
          featured_videos?: Json | null
          id?: string
          implementation_guides?: Json | null
          is_featured?: boolean | null
          last_synced_at?: string | null
          member_count?: number | null
          member_type?: string | null
          name: string
          niche?: string | null
          number_of_subscribers?: number | null
          profile_image_url?: string | null
          relevant?: string | null
          slug: string
          social_links?: Json | null
          specialization?: string[] | null
          success_cases?: Json | null
          sync_completed_at?: string | null
          sync_started_at?: string | null
          sync_status?: string | null
          tool_stack?: Json | null
          tools_covered?: string[] | null
          updated_at?: string
          url?: string | null
          video_count?: number | null
          website_url?: string | null
          youtube_url?: string | null
          youtube_videos?: Json | null
        }
        Update: {
          categories?: string[] | null
          channel_avatar_url?: string | null
          channel_banner_url?: string | null
          channel_description?: string | null
          channel_description_links?: Json | null
          channel_id?: string | null
          channel_joined_date?: string | null
          channel_location?: string | null
          channel_name?: string | null
          channel_total_videos?: number | null
          channel_total_views?: number | null
          channel_url?: string | null
          content_themes?: string[] | null
          created_at?: string
          description?: string | null
          expertise_level?: string | null
          featured_videos?: Json | null
          id?: string
          implementation_guides?: Json | null
          is_featured?: boolean | null
          last_synced_at?: string | null
          member_count?: number | null
          member_type?: string | null
          name?: string
          niche?: string | null
          number_of_subscribers?: number | null
          profile_image_url?: string | null
          relevant?: string | null
          slug?: string
          social_links?: Json | null
          specialization?: string[] | null
          success_cases?: Json | null
          sync_completed_at?: string | null
          sync_started_at?: string | null
          sync_status?: string | null
          tool_stack?: Json | null
          tools_covered?: string[] | null
          updated_at?: string
          url?: string | null
          video_count?: number | null
          website_url?: string | null
          youtube_url?: string | null
          youtube_videos?: Json | null
        }
        Relationships: []
      }
      educator_chat_threads: {
        Row: {
          created_at: string
          educator_id: string | null
          id: string
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          educator_id?: string | null
          id?: string
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          educator_id?: string | null
          id?: string
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "educator_chat_threads_educator_id_fkey"
            columns: ["educator_id"]
            isOneToOne: false
            referencedRelation: "education_creators"
            referencedColumns: ["id"]
          },
        ]
      }
      gpt_resources: {
        Row: {
          assistant_type: string | null
          category: string
          created_at: string
          description: string | null
          downloads_count: number | null
          gpt_id: string | null
          gpt_url: string | null
          id: string
          input_variables: string[] | null
          likes_count: number | null
          model_type: string | null
          name: string
          num_conversations_str: string | null
          profile_image_url: string | null
          prompt_template: string | null
          rating: number | null
          response_format: string | null
          review_average: number | null
          review_count: number | null
          review_total: number | null
          reviews_count: number | null
          short_url: string | null
          updated_at: string
          use_cases: string[] | null
        }
        Insert: {
          assistant_type?: string | null
          category: string
          created_at?: string
          description?: string | null
          downloads_count?: number | null
          gpt_id?: string | null
          gpt_url?: string | null
          id?: string
          input_variables?: string[] | null
          likes_count?: number | null
          model_type?: string | null
          name: string
          num_conversations_str?: string | null
          profile_image_url?: string | null
          prompt_template?: string | null
          rating?: number | null
          response_format?: string | null
          review_average?: number | null
          review_count?: number | null
          review_total?: number | null
          reviews_count?: number | null
          short_url?: string | null
          updated_at?: string
          use_cases?: string[] | null
        }
        Update: {
          assistant_type?: string | null
          category?: string
          created_at?: string
          description?: string | null
          downloads_count?: number | null
          gpt_id?: string | null
          gpt_url?: string | null
          id?: string
          input_variables?: string[] | null
          likes_count?: number | null
          model_type?: string | null
          name?: string
          num_conversations_str?: string | null
          profile_image_url?: string | null
          prompt_template?: string | null
          rating?: number | null
          response_format?: string | null
          review_average?: number | null
          review_count?: number | null
          review_total?: number | null
          reviews_count?: number | null
          short_url?: string | null
          updated_at?: string
          use_cases?: string[] | null
        }
        Relationships: []
      }
      leaderboard: {
        Row: {
          achievement_score: number | null
          achievements: Json | null
          activity_score: number | null
          avatar_url: string | null
          contribution_count: number | null
          created_at: string
          id: string
          kda: number | null
          last_active: string | null
          losses: number | null
          points: number | null
          rank: string | null
          referral_count: number | null
          season_rank: string | null
          siso_tokens: number | null
          streak_count: number | null
          total_contributions: number | null
          updated_at: string
          user_id: string
          wins: number | null
        }
        Insert: {
          achievement_score?: number | null
          achievements?: Json | null
          activity_score?: number | null
          avatar_url?: string | null
          contribution_count?: number | null
          created_at?: string
          id?: string
          kda?: number | null
          last_active?: string | null
          losses?: number | null
          points?: number | null
          rank?: string | null
          referral_count?: number | null
          season_rank?: string | null
          siso_tokens?: number | null
          streak_count?: number | null
          total_contributions?: number | null
          updated_at?: string
          user_id: string
          wins?: number | null
        }
        Update: {
          achievement_score?: number | null
          achievements?: Json | null
          activity_score?: number | null
          avatar_url?: string | null
          contribution_count?: number | null
          created_at?: string
          id?: string
          kda?: number | null
          last_active?: string | null
          losses?: number | null
          points?: number | null
          rank?: string | null
          referral_count?: number | null
          season_rank?: string | null
          siso_tokens?: number | null
          streak_count?: number | null
          total_contributions?: number | null
          updated_at?: string
          user_id?: string
          wins?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "leaderboard_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      login_streaks: {
        Row: {
          created_at: string
          current_streak: number | null
          id: string
          last_login: string | null
          longest_streak: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_streak?: number | null
          id?: string
          last_login?: string | null
          longest_streak?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_streak?: number | null
          id?: string
          last_login?: string | null
          longest_streak?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      networking_resources: {
        Row: {
          category: string
          created_at: string
          description: string | null
          featured: boolean | null
          id: string
          join_count_last_week: number | null
          join_url: string | null
          last_activity_at: string | null
          member_count: number | null
          name: string
          platform: string | null
          profile_image_url: string | null
          total_weekly_activity: number | null
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          join_count_last_week?: number | null
          join_url?: string | null
          last_activity_at?: string | null
          member_count?: number | null
          name: string
          platform?: string | null
          profile_image_url?: string | null
          total_weekly_activity?: number | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          join_count_last_week?: number | null
          join_url?: string | null
          last_activity_at?: string | null
          member_count?: number | null
          name?: string
          platform?: string | null
          profile_image_url?: string | null
          total_weekly_activity?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      news_ai_analysis: {
        Row: {
          business_implications: string
          confidence_score: number
          created_at: string
          id: string
          key_insights: string[]
          market_impact: string
          news_id: string
          related_technologies: string[]
          tech_predictions: string[]
          updated_at: string
        }
        Insert: {
          business_implications: string
          confidence_score: number
          created_at?: string
          id?: string
          key_insights?: string[]
          market_impact: string
          news_id: string
          related_technologies?: string[]
          tech_predictions?: string[]
          updated_at?: string
        }
        Update: {
          business_implications?: string
          confidence_score?: number
          created_at?: string
          id?: string
          key_insights?: string[]
          market_impact?: string
          news_id?: string
          related_technologies?: string[]
          tech_predictions?: string[]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "news_ai_analysis_news_id_fkey"
            columns: ["news_id"]
            isOneToOne: false
            referencedRelation: "ai_news"
            referencedColumns: ["id"]
          },
        ]
      }
      news_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          news_id: string
          updated_at: string
          user_email: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          news_id: string
          updated_at?: string
          user_email: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          news_id?: string
          updated_at?: string
          user_email?: string
        }
        Relationships: [
          {
            foreignKeyName: "news_comments_news_id_fkey"
            columns: ["news_id"]
            isOneToOne: false
            referencedRelation: "ai_news"
            referencedColumns: ["id"]
          },
        ]
      }
      news_sources: {
        Row: {
          api_key: string | null
          created_at: string
          fetch_frequency_minutes: number | null
          id: string
          is_active: boolean | null
          last_fetched_at: string | null
          name: string
          source_type: Database["public"]["Enums"]["news_source_type"]
          updated_at: string
          url: string
        }
        Insert: {
          api_key?: string | null
          created_at?: string
          fetch_frequency_minutes?: number | null
          id?: string
          is_active?: boolean | null
          last_fetched_at?: string | null
          name: string
          source_type: Database["public"]["Enums"]["news_source_type"]
          updated_at?: string
          url: string
        }
        Update: {
          api_key?: string | null
          created_at?: string
          fetch_frequency_minutes?: number | null
          id?: string
          is_active?: boolean | null
          last_fetched_at?: string | null
          name?: string
          source_type?: Database["public"]["Enums"]["news_source_type"]
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      nft_collections: {
        Row: {
          benefits: Json
          chain_id: string
          contract_address: string
          created_at: string
          crypto_cost: number
          description: string | null
          id: string
          image_url: string | null
          name: string
          opensea_url: string
          points_cost: number
          points_multiplier: number
          quantity: number
          tier: Database["public"]["Enums"]["nft_tier"]
          updated_at: string
          weekly_bonus: number
        }
        Insert: {
          benefits: Json
          chain_id: string
          contract_address: string
          created_at?: string
          crypto_cost: number
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          opensea_url: string
          points_cost: number
          points_multiplier: number
          quantity: number
          tier: Database["public"]["Enums"]["nft_tier"]
          updated_at?: string
          weekly_bonus: number
        }
        Update: {
          benefits?: Json
          chain_id?: string
          contract_address?: string
          created_at?: string
          crypto_cost?: number
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          opensea_url?: string
          points_cost?: number
          points_multiplier?: number
          quantity?: number
          tier?: Database["public"]["Enums"]["nft_tier"]
          updated_at?: string
          weekly_bonus?: number
        }
        Relationships: []
      }
      nfts: {
        Row: {
          created_at: string
          id: string
          metadata: Json
          mint_address: string
          owner_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          metadata: Json
          mint_address: string
          owner_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json
          mint_address?: string
          owner_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      point_configurations: {
        Row: {
          action: string
          cooldown_minutes: number | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          points: number
          requirements: Json | null
          updated_at: string
        }
        Insert: {
          action: string
          cooldown_minutes?: number | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          points: number
          requirements?: Json | null
          updated_at?: string
        }
        Update: {
          action?: string
          cooldown_minutes?: number | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          points?: number
          requirements?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      points_history: {
        Row: {
          id: string
          points: number
          recorded_at: string
          user_id: string
        }
        Insert: {
          id?: string
          points: number
          recorded_at?: string
          user_id: string
        }
        Update: {
          id?: string
          points?: number
          recorded_at?: string
          user_id?: string
        }
        Relationships: []
      }
      points_log: {
        Row: {
          action: string
          created_at: string
          id: string
          points_earned: number
          updated_at: string
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          points_earned: number
          updated_at?: string
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          points_earned?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          ai_budget_range: string | null
          ai_expertise_level: string | null
          ai_implementation_priorities: string[] | null
          annual_revenue_range: string | null
          automation_priorities: string[] | null
          avatar_url: string | null
          bio: string | null
          business_challenges: string[] | null
          business_name: string | null
          business_size: string | null
          business_type: string | null
          created_at: string
          current_tools_used: string[] | null
          departments: string[] | null
          email: string | null
          full_name: string | null
          geographic_markets: string[] | null
          growth_targets: Json | null
          has_completed_social_info: boolean | null
          id: string
          industry: string | null
          instagram_url: string | null
          interests: string[] | null
          linkedin_url: string | null
          long_term_goals: string[] | null
          moralis_provider_id: string | null
          points: number | null
          professional_role: string | null
          rank: string | null
          short_term_goals: string[] | null
          siso_tokens: number | null
          social_info_completed_at: string | null
          solana_wallet_address: string | null
          target_market: string[] | null
          team_size: number | null
          twitter_url: string | null
          updated_at: string
          wallet_address: string | null
          web3_metadata: Json | null
          website_url: string | null
          youtube_url: string | null
        }
        Insert: {
          ai_budget_range?: string | null
          ai_expertise_level?: string | null
          ai_implementation_priorities?: string[] | null
          annual_revenue_range?: string | null
          automation_priorities?: string[] | null
          avatar_url?: string | null
          bio?: string | null
          business_challenges?: string[] | null
          business_name?: string | null
          business_size?: string | null
          business_type?: string | null
          created_at?: string
          current_tools_used?: string[] | null
          departments?: string[] | null
          email?: string | null
          full_name?: string | null
          geographic_markets?: string[] | null
          growth_targets?: Json | null
          has_completed_social_info?: boolean | null
          id: string
          industry?: string | null
          instagram_url?: string | null
          interests?: string[] | null
          linkedin_url?: string | null
          long_term_goals?: string[] | null
          moralis_provider_id?: string | null
          points?: number | null
          professional_role?: string | null
          rank?: string | null
          short_term_goals?: string[] | null
          siso_tokens?: number | null
          social_info_completed_at?: string | null
          solana_wallet_address?: string | null
          target_market?: string[] | null
          team_size?: number | null
          twitter_url?: string | null
          updated_at?: string
          wallet_address?: string | null
          web3_metadata?: Json | null
          website_url?: string | null
          youtube_url?: string | null
        }
        Update: {
          ai_budget_range?: string | null
          ai_expertise_level?: string | null
          ai_implementation_priorities?: string[] | null
          annual_revenue_range?: string | null
          automation_priorities?: string[] | null
          avatar_url?: string | null
          bio?: string | null
          business_challenges?: string[] | null
          business_name?: string | null
          business_size?: string | null
          business_type?: string | null
          created_at?: string
          current_tools_used?: string[] | null
          departments?: string[] | null
          email?: string | null
          full_name?: string | null
          geographic_markets?: string[] | null
          growth_targets?: Json | null
          has_completed_social_info?: boolean | null
          id?: string
          industry?: string | null
          instagram_url?: string | null
          interests?: string[] | null
          linkedin_url?: string | null
          long_term_goals?: string[] | null
          moralis_provider_id?: string | null
          points?: number | null
          professional_role?: string | null
          rank?: string | null
          short_term_goals?: string[] | null
          siso_tokens?: number | null
          social_info_completed_at?: string | null
          solana_wallet_address?: string | null
          target_market?: string[] | null
          team_size?: number | null
          twitter_url?: string | null
          updated_at?: string
          wallet_address?: string | null
          web3_metadata?: Json | null
          website_url?: string | null
          youtube_url?: string | null
        }
        Relationships: []
      }
      project_documentation: {
        Row: {
          content: Json
          created_at: string
          id: string
          implementation_status: string | null
          priority: number | null
          related_components: string[] | null
          section: Database["public"]["Enums"]["doc_section_type"]
          title: string
          updated_at: string
        }
        Insert: {
          content?: Json
          created_at?: string
          id?: string
          implementation_status?: string | null
          priority?: number | null
          related_components?: string[] | null
          section: Database["public"]["Enums"]["doc_section_type"]
          title: string
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          implementation_status?: string | null
          priority?: number | null
          related_components?: string[] | null
          section?: Database["public"]["Enums"]["doc_section_type"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string
          id: string
          milestone_reached: boolean | null
          referred_id: string
          referrer_id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          milestone_reached?: boolean | null
          referred_id: string
          referrer_id: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          milestone_reached?: boolean | null
          referred_id?: string
          referrer_id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      tools: {
        Row: {
          assistant_type: string | null
          category: string
          content_themes: string[] | null
          created_at: string
          description: string | null
          downloads_count: number | null
          gpt_id: string | null
          gpt_url: string | null
          icon_url: string | null
          id: string
          input_variables: string[] | null
          likes_count: number | null
          member_type: string | null
          model_type: string | null
          name: string
          num_conversations_str: string | null
          pricing_type: string | null
          profile_image_url: string | null
          prompt_template: string | null
          rating: number | null
          resource_type: string
          response_format: string | null
          review_average: number | null
          review_count: number | null
          review_total: number | null
          reviews_count: number | null
          short_url: string | null
          specialization: string[] | null
          updated_at: string
          use_cases: string[] | null
          website_url: string | null
          youtube_url: string | null
          youtube_videos: Json | null
        }
        Insert: {
          assistant_type?: string | null
          category: string
          content_themes?: string[] | null
          created_at?: string
          description?: string | null
          downloads_count?: number | null
          gpt_id?: string | null
          gpt_url?: string | null
          icon_url?: string | null
          id?: string
          input_variables?: string[] | null
          likes_count?: number | null
          member_type?: string | null
          model_type?: string | null
          name: string
          num_conversations_str?: string | null
          pricing_type?: string | null
          profile_image_url?: string | null
          prompt_template?: string | null
          rating?: number | null
          resource_type?: string
          response_format?: string | null
          review_average?: number | null
          review_count?: number | null
          review_total?: number | null
          reviews_count?: number | null
          short_url?: string | null
          specialization?: string[] | null
          updated_at?: string
          use_cases?: string[] | null
          website_url?: string | null
          youtube_url?: string | null
          youtube_videos?: Json | null
        }
        Update: {
          assistant_type?: string | null
          category?: string
          content_themes?: string[] | null
          created_at?: string
          description?: string | null
          downloads_count?: number | null
          gpt_id?: string | null
          gpt_url?: string | null
          icon_url?: string | null
          id?: string
          input_variables?: string[] | null
          likes_count?: number | null
          member_type?: string | null
          model_type?: string | null
          name?: string
          num_conversations_str?: string | null
          pricing_type?: string | null
          profile_image_url?: string | null
          prompt_template?: string | null
          rating?: number | null
          resource_type?: string
          response_format?: string | null
          review_average?: number | null
          review_count?: number | null
          review_total?: number | null
          reviews_count?: number | null
          short_url?: string | null
          specialization?: string[] | null
          updated_at?: string
          use_cases?: string[] | null
          website_url?: string | null
          youtube_url?: string | null
          youtube_videos?: Json | null
        }
        Relationships: []
      }
      user_assistant_interactions: {
        Row: {
          assistant_id: string
          created_at: string | null
          id: string
          interaction_type: string
          metadata: Json | null
          user_id: string | null
        }
        Insert: {
          assistant_id: string
          created_at?: string | null
          id?: string
          interaction_type: string
          metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          assistant_id?: string
          created_at?: string | null
          id?: string
          interaction_type?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_nfts: {
        Row: {
          collection_id: string | null
          created_at: string
          id: string
          points_multiplier: number | null
          rank: Database["public"]["Enums"]["user_rank"]
          tier: Database["public"]["Enums"]["nft_tier"] | null
          token_id: string
          updated_at: string
          user_id: string | null
          verified_at: string | null
          weekly_bonus: number | null
        }
        Insert: {
          collection_id?: string | null
          created_at?: string
          id?: string
          points_multiplier?: number | null
          rank?: Database["public"]["Enums"]["user_rank"]
          tier?: Database["public"]["Enums"]["nft_tier"] | null
          token_id: string
          updated_at?: string
          user_id?: string | null
          verified_at?: string | null
          weekly_bonus?: number | null
        }
        Update: {
          collection_id?: string | null
          created_at?: string
          id?: string
          points_multiplier?: number | null
          rank?: Database["public"]["Enums"]["user_rank"]
          tier?: Database["public"]["Enums"]["nft_tier"] | null
          token_id?: string
          updated_at?: string
          user_id?: string | null
          verified_at?: string | null
          weekly_bonus?: number | null
        }
        Relationships: []
      }
      user_search_history: {
        Row: {
          created_at: string
          id: string
          query: string
          result_id: string | null
          result_type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          query: string
          result_id?: string | null
          result_type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          query?: string
          result_id?: string | null
          result_type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      video_bookmarks: {
        Row: {
          created_at: string
          id: string
          user_id: string | null
          video_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          user_id?: string | null
          video_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          user_id?: string | null
          video_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "video_bookmarks_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "youtube_videos"
            referencedColumns: ["id"]
          },
        ]
      }
      video_discussions: {
        Row: {
          content: string
          created_at: string
          id: string
          sentiment_score: number | null
          updated_at: string
          user_id: string | null
          video_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          sentiment_score?: number | null
          updated_at?: string
          user_id?: string | null
          video_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          sentiment_score?: number | null
          updated_at?: string
          user_id?: string | null
          video_id?: string | null
        }
        Relationships: []
      }
      video_summaries: {
        Row: {
          created_at: string
          id: string
          key_points: string[] | null
          summary: string
          updated_at: string
          video_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          key_points?: string[] | null
          summary: string
          updated_at?: string
          video_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          key_points?: string[] | null
          summary?: string
          updated_at?: string
          video_id?: string | null
        }
        Relationships: []
      }
      wallet_nonces: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          nonce: string
          public_key: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          nonce: string
          public_key: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          nonce?: string
          public_key?: string
        }
        Relationships: []
      }
      web3_users: {
        Row: {
          created_at: string
          id: string
          metadata: Json
          moralis_provider_id: string
          updated_at: string
          wallet_address: string
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json
          moralis_provider_id: string
          updated_at?: string
          wallet_address: string
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json
          moralis_provider_id?: string
          updated_at?: string
          wallet_address?: string
        }
        Relationships: []
      }
      welcome_nft_mints: {
        Row: {
          attempted_at: string | null
          completed_at: string | null
          error_message: string | null
          id: string
          metadata: Json | null
          status: Database["public"]["Enums"]["nft_mint_status"] | null
          user_id: string
        }
        Insert: {
          attempted_at?: string | null
          completed_at?: string | null
          error_message?: string | null
          id?: string
          metadata?: Json | null
          status?: Database["public"]["Enums"]["nft_mint_status"] | null
          user_id: string
        }
        Update: {
          attempted_at?: string | null
          completed_at?: string | null
          error_message?: string | null
          id?: string
          metadata?: Json | null
          status?: Database["public"]["Enums"]["nft_mint_status"] | null
          user_id?: string
        }
        Relationships: []
      }
      youtube_videos: {
        Row: {
          channel_id: string | null
          created_at: string
          date: string | null
          duration: string | null
          id: string
          order: number | null
          preview_gif_url: string | null
          sync_id: string | null
          sync_timestamp: string | null
          thumbnailUrl: string | null
          title: string | null
          updated_at: string
          url: string | null
          usecase_category: string | null
          viewCount: number | null
        }
        Insert: {
          channel_id?: string | null
          created_at?: string
          date?: string | null
          duration?: string | null
          id: string
          order?: number | null
          preview_gif_url?: string | null
          sync_id?: string | null
          sync_timestamp?: string | null
          thumbnailUrl?: string | null
          title?: string | null
          updated_at?: string
          url?: string | null
          usecase_category?: string | null
          viewCount?: number | null
        }
        Update: {
          channel_id?: string | null
          created_at?: string
          date?: string | null
          duration?: string | null
          id?: string
          order?: number | null
          preview_gif_url?: string | null
          sync_id?: string | null
          sync_timestamp?: string | null
          thumbnailUrl?: string | null
          title?: string | null
          updated_at?: string
          url?: string | null
          usecase_category?: string | null
          viewCount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_channel_id"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "education_creators"
            referencedColumns: ["channel_id"]
          },
          {
            foreignKeyName: "youtube_videos_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "education_creators"
            referencedColumns: ["channel_id"]
          },
        ]
      }
    }
    Views: {
      category_stats: {
        Row: {
          category: string | null
          community_count: number | null
          featured_count: number | null
          total_activity: number | null
          total_members: number | null
        }
        Relationships: []
      }
      user_crypto_history: {
        Row: {
          created_at: string | null
          current_balance: number | null
          id: string | null
          points_exchanged: number | null
          status: string | null
          tokens_received: number | null
          transaction_type: string | null
          updated_at: string | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      create_news_images_bucket: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      generate_unique_slug: {
        Args: {
          base_name: string
        }
        Returns: string
      }
      handle_onboarding_completion: {
        Args: {
          user_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      doc_section_type:
        | "overview"
        | "features"
        | "backend_design"
        | "data_flow"
        | "ai_integration"
        | "implementation"
        | "technical_specs"
      news_source_type: "rss" | "api" | "manual"
      nft_mint_status: "pending" | "completed" | "failed"
      nft_tier:
        | "ai_artist"
        | "system_synthesizer"
        | "algo_architect"
        | "code_crafter"
      point_action_type:
        | "daily_login"
        | "login_streak"
        | "referral_signup"
        | "referral_milestone"
        | "read_article"
        | "share_article"
        | "comment_article"
        | "suggest_article"
        | "use_tool"
        | "submit_tool"
        | "receive_tool_like"
        | "receive_tool_star"
        | "write_tool_review"
        | "watch_tutorial"
        | "submit_education"
        | "receive_education_like"
        | "receive_education_star"
        | "create_tutorial"
        | "use_automation"
        | "submit_automation"
        | "receive_automation_like"
        | "receive_automation_star"
        | "share_workflow"
        | "network_reply"
        | "network_discussion"
        | "network_referral"
        | "host_event"
        | "use_assistant"
        | "suggest_assistant"
        | "assistant_feedback"
        | "train_assistant"
        | "complete_challenge"
        | "beta_testing"
        | "report_bug"
        | "promotional_share"
      user_rank: "bronze" | "silver" | "gold" | "diamond"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
