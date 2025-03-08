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
      agencies: {
        Row: {
          address: string | null
          contact_email: string | null
          created_at: string
          description: string | null
          id: string
          logo_url: string | null
          name: string
          phone_number: string | null
          primary_color: string | null
          secondary_color: string | null
          slug: string
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          address?: string | null
          contact_email?: string | null
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          phone_number?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          slug: string
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          address?: string | null
          contact_email?: string | null
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          phone_number?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          slug?: string
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agencies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_chat_messages: {
        Row: {
          ai_response: string
          created_at: string
          id: string
          user_message: string
        }
        Insert: {
          ai_response: string
          created_at?: string
          id?: string
          user_message: string
        }
        Update: {
          ai_response?: string
          created_at?: string
          id?: string
          user_message?: string
        }
        Relationships: []
      }
      app_plans: {
        Row: {
          agency_id: string
          created_at: string
          description: string | null
          features: Json
          id: string
          status: string
          title: string
          total_cost: number | null
          updated_at: string
        }
        Insert: {
          agency_id: string
          created_at?: string
          description?: string | null
          features?: Json
          id?: string
          status?: string
          title: string
          total_cost?: number | null
          updated_at?: string
        }
        Update: {
          agency_id?: string
          created_at?: string
          description?: string | null
          features?: Json
          id?: string
          status?: string
          title?: string
          total_cost?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "app_plans_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
        ]
      }
      assistant_metadata: {
        Row: {
          assistant_id: string
          created_at: string
          id: string
          metadata: Json | null
          model: string
          name: string
          updated_at: string
        }
        Insert: {
          assistant_id: string
          created_at?: string
          id?: string
          metadata?: Json | null
          model: string
          name: string
          updated_at?: string
        }
        Update: {
          assistant_id?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          model?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      chat_users: {
        Row: {
          airtable_id: string | null
          chat_history: string | null
          chat_url: string | null
          client_page_data: string | null
          created_at: string | null
          id: string
          last_message: string | null
          last_message_date: string | null
          name: string
          notes: string | null
          profile_url: string | null
          recent_message: string | null
          status: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          airtable_id?: string | null
          chat_history?: string | null
          chat_url?: string | null
          client_page_data?: string | null
          created_at?: string | null
          id?: string
          last_message?: string | null
          last_message_date?: string | null
          name: string
          notes?: string | null
          profile_url?: string | null
          recent_message?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          airtable_id?: string | null
          chat_history?: string | null
          chat_url?: string | null
          client_page_data?: string | null
          created_at?: string | null
          id?: string
          last_message?: string | null
          last_message_date?: string | null
          name?: string
          notes?: string | null
          profile_url?: string | null
          recent_message?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      connection_list: {
        Row: {
          airtable_id: string | null
          created_at: string | null
          id: string
          page_number: string
          page_url: string | null
          page_url_long: string | null
          record_id: string | null
          search_term: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          airtable_id?: string | null
          created_at?: string | null
          id?: string
          page_number: string
          page_url?: string | null
          page_url_long?: string | null
          record_id?: string | null
          search_term?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          airtable_id?: string | null
          created_at?: string | null
          id?: string
          page_number?: string
          page_url?: string | null
          page_url_long?: string | null
          record_id?: string | null
          search_term?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      connections: {
        Row: {
          airtable_id: string | null
          company: string | null
          connected: string | null
          created_at: string | null
          id: string
          location: string | null
          name: string
          notes: string | null
          status: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          airtable_id?: string | null
          company?: string | null
          connected?: string | null
          created_at?: string | null
          id?: string
          location?: string | null
          name: string
          notes?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          airtable_id?: string | null
          company?: string | null
          connected?: string | null
          created_at?: string | null
          id?: string
          location?: string | null
          name?: string
          notes?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      content_schedule: {
        Row: {
          airtable_id: string | null
          created_at: string | null
          date: string | null
          id: string
          post_content: string | null
          status: string | null
          time: string | null
          transcription: string | null
          updated_at: string | null
          url: string | null
          video_name: string
        }
        Insert: {
          airtable_id?: string | null
          created_at?: string | null
          date?: string | null
          id?: string
          post_content?: string | null
          status?: string | null
          time?: string | null
          transcription?: string | null
          updated_at?: string | null
          url?: string | null
          video_name: string
        }
        Update: {
          airtable_id?: string | null
          created_at?: string | null
          date?: string | null
          id?: string
          post_content?: string | null
          status?: string | null
          time?: string | null
          transcription?: string | null
          updated_at?: string | null
          url?: string | null
          video_name?: string
        }
        Relationships: []
      }
      daily_metrics: {
        Row: {
          airtable_id: string | null
          connection_requests: number | null
          created_at: string | null
          date: string
          follow_requests: number | null
          followers_count: number | null
          id: string
          post_comments: number | null
          post_likes: number | null
          profile_views: number | null
          updated_at: string | null
        }
        Insert: {
          airtable_id?: string | null
          connection_requests?: number | null
          created_at?: string | null
          date: string
          follow_requests?: number | null
          followers_count?: number | null
          id?: string
          post_comments?: number | null
          post_likes?: number | null
          profile_views?: number | null
          updated_at?: string | null
        }
        Update: {
          airtable_id?: string | null
          connection_requests?: number | null
          created_at?: string | null
          date?: string
          follow_requests?: number | null
          followers_count?: number | null
          id?: string
          post_comments?: number | null
          post_likes?: number | null
          profile_views?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      direct_connections: {
        Row: {
          airtable_id: string | null
          company: string | null
          connected_date: string | null
          created_at: string | null
          created_time: string | null
          id: string
          location: string | null
          name: string
          notes: string | null
          record_id: string | null
          status: string | null
          title: string | null
          updated_at: string | null
          username: string | null
          week: string | null
          week_identifier: string | null
          weekly_link: string | null
        }
        Insert: {
          airtable_id?: string | null
          company?: string | null
          connected_date?: string | null
          created_at?: string | null
          created_time?: string | null
          id?: string
          location?: string | null
          name: string
          notes?: string | null
          record_id?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          username?: string | null
          week?: string | null
          week_identifier?: string | null
          weekly_link?: string | null
        }
        Update: {
          airtable_id?: string | null
          company?: string | null
          connected_date?: string | null
          created_at?: string | null
          created_time?: string | null
          id?: string
          location?: string | null
          name?: string
          notes?: string | null
          record_id?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          username?: string | null
          week?: string | null
          week_identifier?: string | null
          weekly_link?: string | null
        }
        Relationships: []
      }
      features: {
        Row: {
          base_cost: number
          category: string
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          base_cost: number
          category: string
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          base_cost?: number
          category?: string
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      followed_connections: {
        Row: {
          airtable_id: string | null
          company: string | null
          created_at: string | null
          created_time: string | null
          followed_date: string | null
          id: string
          location: string | null
          name: string
          notes: string | null
          record_id: string | null
          status: string | null
          title: string | null
          updated_at: string | null
          username: string | null
          week: string | null
          week_identifier: string | null
          week_link: string | null
        }
        Insert: {
          airtable_id?: string | null
          company?: string | null
          created_at?: string | null
          created_time?: string | null
          followed_date?: string | null
          id?: string
          location?: string | null
          name: string
          notes?: string | null
          record_id?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          username?: string | null
          week?: string | null
          week_identifier?: string | null
          week_link?: string | null
        }
        Update: {
          airtable_id?: string | null
          company?: string | null
          created_at?: string | null
          created_time?: string | null
          followed_date?: string | null
          id?: string
          location?: string | null
          name?: string
          notes?: string | null
          record_id?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          username?: string | null
          week?: string | null
          week_identifier?: string | null
          week_link?: string | null
        }
        Relationships: []
      }
      plan_chat_history: {
        Row: {
          ai_response: string
          created_at: string
          form_data: Json | null
          id: string
          metadata: Json | null
          plan_id: string | null
          user_message: string
        }
        Insert: {
          ai_response: string
          created_at?: string
          form_data?: Json | null
          id?: string
          metadata?: Json | null
          plan_id?: string | null
          user_message: string
        }
        Update: {
          ai_response?: string
          created_at?: string
          form_data?: Json | null
          id?: string
          metadata?: Json | null
          plan_id?: string | null
          user_message?: string
        }
        Relationships: [
          {
            foreignKeyName: "plan_chat_history_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "project_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      post_interactions: {
        Row: {
          action: string | null
          airtable_id: string | null
          comment: string | null
          created_at: string | null
          id: string
          interaction_date: string | null
          interaction_type: string | null
          name: string
          notes: string | null
          post_comments: string | null
          post_content: string | null
          post_likes: string | null
          post_type: string | null
          post_url: string | null
          post_user: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          action?: string | null
          airtable_id?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          interaction_date?: string | null
          interaction_type?: string | null
          name: string
          notes?: string | null
          post_comments?: string | null
          post_content?: string | null
          post_likes?: string | null
          post_type?: string | null
          post_url?: string | null
          post_user?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          action?: string | null
          airtable_id?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          interaction_date?: string | null
          interaction_type?: string | null
          name?: string
          notes?: string | null
          post_comments?: string | null
          post_content?: string | null
          post_likes?: string | null
          post_type?: string | null
          post_url?: string | null
          post_user?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          categories: string[] | null
          created_at: string
          description: string | null
          id: string
          images: string[] | null
          marketing_strategy: string | null
          name: string
          offering_type: string | null
          pricing: string | null
          product_link: string | null
          updated_at: string
        }
        Insert: {
          categories?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          marketing_strategy?: string | null
          name: string
          offering_type?: string | null
          pricing?: string | null
          product_link?: string | null
          updated_at?: string
        }
        Update: {
          categories?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          marketing_strategy?: string | null
          name?: string
          offering_type?: string | null
          pricing?: string | null
          product_link?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          banner_url: string | null
          bio: string | null
          business_name: string | null
          business_type: string | null
          created_at: string
          full_name: string | null
          id: string
          industry: string | null
          instagram_url: string | null
          interests: string[] | null
          linkedin_url: string | null
          phone_number: string | null
          points: number | null
          professional_role: string | null
          rank: string | null
          solana_wallet_address: string | null
          twitter_url: string | null
          updated_at: string | null
          website_url: string | null
          youtube_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          business_name?: string | null
          business_type?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          industry?: string | null
          instagram_url?: string | null
          interests?: string[] | null
          linkedin_url?: string | null
          phone_number?: string | null
          points?: number | null
          professional_role?: string | null
          rank?: string | null
          solana_wallet_address?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          website_url?: string | null
          youtube_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          business_name?: string | null
          business_type?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          industry?: string | null
          instagram_url?: string | null
          interests?: string[] | null
          linkedin_url?: string | null
          phone_number?: string | null
          points?: number | null
          professional_role?: string | null
          rank?: string | null
          solana_wallet_address?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          website_url?: string | null
          youtube_url?: string | null
        }
        Relationships: []
      }
      project_plans: {
        Row: {
          budget: string | null
          created_at: string
          description: string | null
          features: Json | null
          id: string
          requirements: Json | null
          status: string | null
          technical_specs: Json | null
          timeline: Json | null
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          budget?: string | null
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          requirements?: Json | null
          status?: string | null
          technical_specs?: Json | null
          timeline?: Json | null
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          budget?: string | null
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          requirements?: Json | null
          status?: string | null
          technical_specs?: Json | null
          timeline?: Json | null
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      project_threads: {
        Row: {
          created_at: string
          id: string
          project_id: string
          thread_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          project_id: string
          thread_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          project_id?: string
          thread_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_threads_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "project_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      resource_categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      resources: {
        Row: {
          category_id: string | null
          content: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          title: string
          updated_at: string
          url: string | null
        }
        Insert: {
          category_id?: string | null
          content?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          title: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          category_id?: string | null
          content?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          title?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resources_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "resource_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      task_steps: {
        Row: {
          created_at: string
          description: string
          id: string
          output: string | null
          status: Database["public"]["Enums"]["task_status"] | null
          step_number: number
          task_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          output?: string | null
          status?: Database["public"]["Enums"]["task_status"] | null
          step_number: number
          task_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          output?: string | null
          status?: Database["public"]["Enums"]["task_status"] | null
          step_number?: number
          task_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_steps_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          created_at: string
          id: string
          status: Database["public"]["Enums"]["task_status"] | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          status?: Database["public"]["Enums"]["task_status"] | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          status?: Database["public"]["Enums"]["task_status"] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name: string
          id: string
          role?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      vector_storage: {
        Row: {
          content: string
          created_at: string
          embedding: string | null
          id: string
          metadata: Json | null
        }
        Insert: {
          content: string
          created_at?: string
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Update: {
          content?: string
          created_at?: string
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      halfvec_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      halfvec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      hnsw_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      l2_norm:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      l2_normalize:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      sparsevec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      sparsevec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      task_status: "pending" | "in_progress" | "completed" | "failed"
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
