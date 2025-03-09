
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Seed demo data for development purposes
export const seedDemoData = async () => {
  try {
    console.log('Checking for existing networking resources...');
    // Check if we already have data to avoid duplicates
    const { data: existingNetworkingResources } = await supabase
      .from('networking_resources')
      .select('id')
      .limit(1);

    if (existingNetworkingResources && existingNetworkingResources.length === 0) {
      console.log('Seeding networking resources...');
      // Seed networking resources
      const networkingResources = [
        {
          name: 'Agency Owners Community',
          description: 'A community of agency owners sharing strategies and insights.',
          category: 'Community',
          platform: 'Discord',
          profile_image_url: '/lovable-uploads/dee36671-c662-422f-a9a0-deb2eeb03973.png',
          member_count: 850,
          join_url: 'https://example.com/join-community'
        },
        {
          name: 'Marketing Masterminds',
          description: 'Expert marketers discussing latest trends and strategies.',
          category: 'Professional',
          platform: 'Slack',
          profile_image_url: '/lovable-uploads/d99f6770-7516-4213-9844-127aee18be83.png',
          member_count: 1200,
          join_url: 'https://example.com/marketing-masterminds'
        },
        {
          name: 'Creative Directors Network',
          description: 'Network of creative professionals sharing portfolio work and opportunities.',
          category: 'Professional',
          platform: 'LinkedIn',
          profile_image_url: '/lovable-uploads/c482563a-42db-4f47-83f2-c2e7771400b7.png',
          member_count: 3400,
          join_url: 'https://example.com/creative-directors'
        },
        {
          name: 'Tech Founders Club',
          description: 'Tech entrepreneurs discussing startup challenges and solutions.',
          category: 'Startup',
          platform: 'Discord',
          profile_image_url: '/lovable-uploads/c5921a2f-8856-42f4-bec5-2d08b81c5691.png',
          member_count: 920,
          join_url: 'https://example.com/tech-founders'
        }
      ];
      
      await supabase.from('networking_resources').insert(networkingResources);
    }

    console.log('Checking for existing project documentation...');
    // Check if we already have documentation
    const { data: existingDocs } = await supabase
      .from('project_documentation')
      .select('id')
      .limit(1);

    if (existingDocs && existingDocs.length === 0) {
      console.log('Seeding project documentation...');
      // Seed project documentation
      const projectDocs = [
        {
          section: 'Authentication',
          content: 'Our authentication system uses Supabase Auth with email/password and social login options. JWT tokens are used for session management with automatic token refresh.',
          related_components: ['AuthProvider', 'LoginForm', 'SignUpForm'],
          implementation_status: 'completed',
          priority: 'high'
        },
        {
          section: 'Dashboard',
          content: 'The dashboard displays key metrics and project information. It includes a responsive layout with sidebar navigation and content area.',
          related_components: ['DashboardLayout', 'ProjectsOverview', 'StatsPanel'],
          implementation_status: 'completed',
          priority: 'high'
        },
        {
          section: 'Chat Interface',
          content: 'The AI chat interface provides conversational assistance. It supports message history, typing indicators, and markdown rendering in responses.',
          related_components: ['ChatInterface', 'MessageList', 'InputArea'],
          implementation_status: 'in-progress',
          priority: 'medium'
        },
        {
          section: 'Network Resources',
          content: 'The networking section displays communities and resources. It includes filtering by category and search functionality.',
          related_components: ['NetworkingGrid', 'CategoryFilter', 'ResourceCard'],
          implementation_status: 'pending',
          priority: 'medium'
        },
        {
          section: 'Education Center',
          content: 'The education section provides video tutorials and documentation. Features include search, filtering, and progress tracking.',
          related_components: ['VideoLibrary', 'ProjectDocumentation', 'SearchInput'],
          implementation_status: 'in-progress',
          priority: 'medium'
        },
      ];
      
      await supabase.from('project_documentation').insert(projectDocs);
    }

    console.log('Seed data check completed');
  } catch (error) {
    console.error('Error seeding demo data:', error);
    toast('Error seeding demo data');
  }
};
