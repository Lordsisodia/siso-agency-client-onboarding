
import { DocArticle } from '@/types/documentation';
import { v4 as uuidv4 } from 'uuid';

export const gettingStartedArticles: DocArticle[] = [
  {
    id: 'platform-overview',
    slug: 'platform-overview',
    title: 'Platform Overview',
    excerpt: 'Learn about our platform capabilities and how it can help you build applications faster',
    content: 'This article provides a comprehensive overview of our platform features and capabilities.',
    lastUpdated: '2023-09-15',
    difficulty: 'beginner',
    sections: [
      {
        id: 'general-overview',
        title: 'General Platform Overview',
        questions: [
          {
            id: 'what-is-platform',
            slug: 'what-is-platform',
            question: 'What is this platform and what can it do for me?',
            answer: 'Our platform is an AI-powered app development environment that helps you build web and mobile applications faster than traditional methods. It provides tools for planning, designing, and implementing your apps with intelligent assistance at every step.'
          },
          {
            id: 'build-quickly',
            slug: 'build-quickly',
            question: 'How does this platform help me build apps quickly and efficiently?',
            answer: 'The platform accelerates development through AI-assisted planning, pre-built components, automated code generation, and intelligent suggestions. Instead of starting from scratch, you can describe what you want to build and our AI will help create a structured plan and implementation path.'
          },
          {
            id: 'who-for',
            slug: 'who-for',
            question: 'Who is this platform designed for?',
            answer: 'Our platform is designed for developers, entrepreneurs, product managers, and businesses of all sizes. Whether you\'re a solo developer wanting to build faster, a startup with limited resources, or an enterprise looking to innovate quickly, our tools scale to your needs.'
          }
        ]
      },
      {
        id: 'account-setup',
        title: 'Account Creation & Onboarding',
        questions: [
          {
            id: 'signup-process',
            slug: 'signup-process',
            question: 'How do I sign up for an account?',
            answer: 'To sign up, click the "Get Started" button on our homepage. You can create an account using your email address or by signing in with Google, GitHub, or other supported authentication providers.'
          },
          {
            id: 'free-trial',
            slug: 'free-trial',
            question: 'Is there a free trial available, and if so, what does it include?',
            answer: 'Yes, we offer a 14-day free trial that includes access to all core features. During the trial, you can create up to 3 projects, use all AI planning tools, and export your work. Usage limits apply to certain advanced features.'
          }
        ]
      }
    ]
  },
  {
    id: 'first-steps',
    slug: 'first-steps',
    title: 'First Steps',
    excerpt: 'Learn how to create your first project and navigate the interface',
    content: 'This article guides you through your first steps on our platform.',
    lastUpdated: '2023-10-20',
    difficulty: 'beginner',
    sections: [
      {
        id: 'interface-basics',
        title: 'Understanding the Interface',
        questions: [
          {
            id: 'main-sections',
            slug: 'main-sections',
            question: 'What are the main sections of the dashboard?',
            answer: 'The dashboard consists of: 1) The Projects section showing your recent and pinned projects, 2) Quick Stats displaying your usage and activity metrics, 3) Resources section with learning materials and templates, 4) News & Updates about new features, and 5) The Activity Feed showing recent actions and collaborator activities.'
          },
          {
            id: 'navigation',
            slug: 'navigation',
            question: 'How do I navigate between features on the dashboard?',
            answer: 'Use the main navigation menu on the left sidebar to switch between major sections like Projects, Plan Builder, Resources, and Settings. The top bar provides quick access to search, notifications, and your profile. Each section has its own sub-navigation that appears when you select it.'
          }
        ]
      }
    ]
  }
];
