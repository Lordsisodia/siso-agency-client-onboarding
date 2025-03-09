
import { supabase } from '@/integrations/supabase/client';

export const seedNetworkingResources = async () => {
  // Check if we already have data
  const { count } = await supabase
    .from('networking_resources')
    .select('*', { count: 'exact' });
    
  if (count && count > 0) {
    console.log('Networking resources already seeded');
    return;
  }
  
  const resources = [
    {
      name: 'AI Professionals Group',
      description: 'A network of AI professionals sharing insights and job opportunities',
      category: 'Professional Networks',
      platform: 'LinkedIn',
      profile_image_url: 'https://randomuser.me/api/portraits/men/1.jpg',
      member_count: 5280,
      join_url: 'https://example.com/group1'
    },
    {
      name: 'Machine Learning Community',
      description: 'Open discussions about machine learning algorithms and implementations',
      category: 'Technical Communities',
      platform: 'Discord',
      profile_image_url: 'https://randomuser.me/api/portraits/women/2.jpg',
      member_count: 12500,
      join_url: 'https://example.com/group2'
    },
    {
      name: 'AI Ethics Forum',
      description: 'Discussing ethical considerations in AI development and deployment',
      category: 'Discussion Forums',
      platform: 'Reddit',
      profile_image_url: 'https://randomuser.me/api/portraits/men/3.jpg',
      member_count: 3450,
      join_url: 'https://example.com/group3'
    },
    {
      name: 'Data Science Meetup',
      description: 'Regular meetups for data scientists to network and share knowledge',
      category: 'In-Person Events',
      platform: 'Meetup',
      profile_image_url: 'https://randomuser.me/api/portraits/women/4.jpg',
      member_count: 8760,
      join_url: 'https://example.com/group4'
    }
  ];
  
  const { error } = await supabase
    .from('networking_resources')
    .insert(resources);
    
  if (error) {
    console.error('Error seeding networking resources:', error);
  } else {
    console.log('Successfully seeded networking resources');
  }
};

export const seedProjectDocumentation = async () => {
  // Check if we already have data
  const { count } = await supabase
    .from('project_documentation')
    .select('*', { count: 'exact' });
    
  if (count && count > 0) {
    console.log('Project documentation already seeded');
    return;
  }
  
  const docs = [
    {
      section: 'Authentication',
      content: 'Implementation details for user authentication including sign-up, login, and password reset flows.',
      related_components: ['LoginForm', 'SignupForm', 'PasswordReset'],
      implementation_status: 'completed',
      priority: 'high'
    },
    {
      section: 'Dashboard',
      content: 'Main dashboard interface showing user stats, activities, and navigation to other sections.',
      related_components: ['DashboardStats', 'ActivityFeed', 'QuickNav'],
      implementation_status: 'in-progress',
      priority: 'high'
    },
    {
      section: 'Profile Management',
      content: 'User profile data management including editing, privacy settings, and avatar uploads.',
      related_components: ['ProfileEditor', 'PrivacySettings', 'AvatarUpload'],
      implementation_status: 'in-progress',
      priority: 'medium'
    },
    {
      section: 'Networking',
      content: 'Features for connecting with other users, following profiles, and community engagement.',
      related_components: ['NetworkingGrid', 'UserSearch', 'CommunityList'],
      implementation_status: 'pending',
      priority: 'medium'
    }
  ];
  
  const { error } = await supabase
    .from('project_documentation')
    .insert(docs);
    
  if (error) {
    console.error('Error seeding project documentation:', error);
  } else {
    console.log('Successfully seeded project documentation');
  }
};

export const seedDemoData = async () => {
  await seedNetworkingResources();
  await seedProjectDocumentation();
};
