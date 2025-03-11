
import { 
  Book, UserCircle, FileText, FolderKanban, 
  Sparkles, Code2, HelpCircle 
} from 'lucide-react';

export interface DocQuestion {
  id: string;
  question: string;
  answer: string;
}

export interface DocSection {
  id: string;
  title: string;
  questions: DocQuestion[];
}

export interface DocArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  sections: DocSection[];
  lastUpdated?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface DocCategory {
  id: string;
  title: string;
  description: string;
  icon: any; // Lucide icon component
  articleCount: number;
  articles: DocArticle[];
}

// This would ideally come from an API, but we'll use static data for now
export const documentationData: DocCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics and get up to speed quickly',
    icon: Book,
    articleCount: 6,
    articles: [
      {
        id: 'welcome',
        title: 'Welcome to the Platform',
        excerpt: 'Get an overview of what our platform offers',
        content: 'Welcome to the platform! This guide will help you get started with creating your first project.',
        lastUpdated: '2024-03-28',
        difficulty: 'beginner',
        sections: [
          {
            id: 'overview',
            title: 'Platform Overview',
            questions: [
              {
                id: 'what-is-platform',
                question: 'What is our platform?',
                answer: 'Our platform is a comprehensive project planning and management tool designed to help businesses streamline their workflows, collaborate effectively, and achieve their goals faster.'
              },
              {
                id: 'key-features',
                question: 'What are the key features?',
                answer: 'Our platform offers intuitive project planning, task management, AI-powered assistance, collaboration tools, and detailed analytics and reporting capabilities.'
              }
            ]
          },
          {
            id: 'benefits',
            title: 'Benefits',
            questions: [
              {
                id: 'why-use',
                question: 'Why should I use this platform?',
                answer: 'Our platform saves you time and effort by automating routine tasks, providing intelligent recommendations, and offering a centralized workspace for all your project needs.'
              },
              {
                id: 'who-for',
                question: 'Who is this platform for?',
                answer: 'This platform is designed for business owners, project managers, team leaders, and anyone involved in planning and executing projects, regardless of industry or company size.'
              }
            ]
          }
        ]
      },
      {
        id: 'quick-start',
        title: 'Quick Start Guide',
        excerpt: 'Get up and running in minutes',
        content: 'Welcome to the platform! This guide will help you get started with creating your first project.',
        lastUpdated: '2024-03-27',
        difficulty: 'beginner',
        sections: [
          {
            id: 'first-steps',
            title: 'First Steps',
            questions: [
              {
                id: 'create-account',
                question: 'How do I create an account?',
                answer: 'Navigate to the sign-up page, enter your email address, create a password, and complete the verification process. You can also sign up using Google or other social accounts for faster access.'
              },
              {
                id: 'create-project',
                question: 'How do I create my first project?',
                answer: 'After logging in, click on the "New Project" button on your dashboard. Give your project a name and description, then choose whether to start from scratch or use a template.'
              }
            ]
          },
          {
            id: 'navigation',
            title: 'Navigating the Platform',
            questions: [
              {
                id: 'dashboard',
                question: 'What does the dashboard show?',
                answer: 'Your dashboard displays an overview of all your projects, recent activities, upcoming deadlines, and quick access to frequently used features.'
              },
              {
                id: 'find-resources',
                question: 'Where can I find learning resources?',
                answer: 'Visit the Help Center (where you are now) for comprehensive guides, tutorials, and answers to frequently asked questions. You can also use the AI Assistant for personalized help.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'account-profile',
    title: 'Account & Profile',
    description: 'Manage your account settings and profile',
    icon: UserCircle,
    articleCount: 10,
    articles: [
      {
        id: 'account-setup',
        title: 'Account Setup',
        excerpt: 'Configure your account settings and preferences',
        content: 'Setting up your account properly helps you get the most out of the platform.',
        lastUpdated: '2024-03-25',
        difficulty: 'beginner',
        sections: [
          {
            id: 'profile-info',
            title: 'Profile Information',
            questions: [
              {
                id: 'edit-profile',
                question: 'How do I edit my profile?',
                answer: 'Navigate to the Profile page by clicking on your avatar in the top right corner and selecting "Profile". From there, you can edit your personal information, professional details, and preferences.'
              },
              {
                id: 'profile-picture',
                question: 'How do I change my profile picture?',
                answer: 'Go to your Profile page, hover over your current profile picture, and click on the "Edit" icon. You can upload a new image or select from preset avatars.'
              }
            ]
          },
          {
            id: 'security',
            title: 'Security Settings',
            questions: [
              {
                id: 'change-password',
                question: 'How do I change my password?',
                answer: 'Go to Profile > Security, click on "Change Password", enter your current password, then enter and confirm your new password.'
              },
              {
                id: 'enable-2fa',
                question: 'How do I enable two-factor authentication?',
                answer: 'Navigate to Profile > Security, find the "Two-Factor Authentication" section, and click "Enable". Follow the instructions to set up an authenticator app or receive codes via SMS.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'plan-builder',
    title: 'Plan Builder',
    description: 'Create and manage project plans effectively',
    icon: FileText,
    articleCount: 15,
    articles: [
      {
        id: 'plan-builder-intro',
        title: 'Introduction to Plan Builder',
        excerpt: 'Learn the basics of the Plan Builder tool',
        content: 'The Plan Builder is a powerful tool that helps you define your project\'s scope, features, and specifications.',
        lastUpdated: '2024-03-20',
        difficulty: 'intermediate',
        sections: [
          {
            id: 'builder-basics',
            title: 'Builder Basics',
            questions: [
              {
                id: 'what-is-plan-builder',
                question: 'What is the Plan Builder?',
                answer: 'The Plan Builder is our core tool that guides you through creating comprehensive project plans. It helps you define project requirements, features, specifications, and timelines in a structured way.'
              },
              {
                id: 'access-builder',
                question: 'How do I access the Plan Builder?',
                answer: 'You can access the Plan Builder from your dashboard by clicking on "Plan Builder" in the sidebar, or by clicking "New Project" and selecting "Start with Plan Builder".'
              }
            ]
          },
          {
            id: 'using-builder',
            title: 'Using the Builder',
            questions: [
              {
                id: 'builder-steps',
                question: 'What are the steps in the Plan Builder?',
                answer: 'The Plan Builder typically guides you through 5 key steps: Project Type selection, Business Context definition, Feature Selection, Timeline & Budget planning, and Summary review.'
              },
              {
                id: 'save-progress',
                question: 'Can I save my progress and come back later?',
                answer: 'Yes, your progress is automatically saved at each step. You can exit the Plan Builder and return later to continue from where you left off.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'projects-tasks',
    title: 'Projects & Tasks',
    description: 'Organize and track your work',
    icon: FolderKanban,
    articleCount: 20,
    articles: [
      {
        id: 'creating-projects',
        title: 'Creating New Projects',
        excerpt: 'How to create and configure new projects',
        content: 'Projects are the core of our platform. Here\'s how to create and configure them effectively.',
        lastUpdated: '2024-03-18',
        difficulty: 'beginner',
        sections: [
          {
            id: 'project-creation',
            title: 'Project Creation',
            questions: [
              {
                id: 'create-project',
                question: 'How do I create a new project?',
                answer: 'From your dashboard, click the "New Project" button. Enter a name and description for your project, then choose whether to use the Plan Builder or start with a blank project.'
              },
              {
                id: 'project-templates',
                question: 'Can I use templates for my projects?',
                answer: 'Yes, when creating a new project, you\'ll have the option to select from various templates tailored for different types of projects. Templates come with pre-configured settings and sections.'
              }
            ]
          },
          {
            id: 'project-settings',
            title: 'Project Settings',
            questions: [
              {
                id: 'edit-project',
                question: 'How do I edit project details?',
                answer: 'Open your project, click on the "Settings" tab or gear icon, and you\'ll be able to modify the project name, description, visibility, and other core settings.'
              },
              {
                id: 'archive-project',
                question: 'How do I archive or delete a project?',
                answer: 'In project settings, scroll to the bottom to find the Archive and Delete options. Archiving hides the project from view but preserves its data, while deletion permanently removes it.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'ai-features',
    title: 'AI Features',
    description: 'Leverage AI capabilities',
    icon: Sparkles,
    articleCount: 12,
    articles: [
      {
        id: 'assistant-basics',
        title: 'Assistant Basics',
        excerpt: 'Getting started with the AI assistant',
        content: 'Our AI assistant is designed to help you navigate the platform and answer questions about your projects.',
        lastUpdated: '2024-03-15',
        difficulty: 'beginner',
        sections: [
          {
            id: 'ai-introduction',
            title: 'Introduction to AI Features',
            questions: [
              {
                id: 'what-ai-does',
                question: 'What can the AI assistant help with?',
                answer: 'Our AI assistant can answer questions about the platform, help you navigate features, provide suggestions for your projects, assist with problem-solving, and automate certain tasks to save you time.'
              },
              {
                id: 'ai-access',
                question: 'How do I access the AI assistant?',
                answer: 'You can access the AI assistant from the Help Center by clicking on the "AI Assistant" tab, or via the assistant icon in the bottom right corner of any page throughout the platform.'
              }
            ]
          },
          {
            id: 'using-ai',
            title: 'Using the AI Assistant',
            questions: [
              {
                id: 'ask-questions',
                question: 'How do I ask the AI assistant questions?',
                answer: 'Simply type your question in the chat input and press Enter. Try to be specific about what you need help with for the most accurate responses.'
              },
              {
                id: 'ai-limitations',
                question: 'What are the limitations of the AI assistant?',
                answer: 'While the AI assistant is powerful, it may not have answers to highly specialized questions outside the scope of our platform. It cannot access your private files or perform actions that require administrative privileges.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'api-integration',
    title: 'API & Integration',
    description: 'Connect and extend the platform',
    icon: Code2,
    articleCount: 8,
    articles: [
      {
        id: 'api-overview',
        title: 'API Overview',
        excerpt: 'Introduction to our API capabilities',
        content: 'Our platform provides a comprehensive API that allows you to integrate with other tools and extend functionality.',
        lastUpdated: '2024-03-10',
        difficulty: 'advanced',
        sections: [
          {
            id: 'api-basics',
            title: 'API Basics',
            questions: [
              {
                id: 'what-api',
                question: 'What is the API used for?',
                answer: 'Our API allows you to programmatically interact with our platform, enabling custom integrations, automations, data extraction, and extending the platform\'s functionality to meet your specific needs.'
              },
              {
                id: 'api-access',
                question: 'How do I get API access?',
                answer: 'API access is available on Business and Enterprise plans. Navigate to your Profile > Developer Settings to generate API keys and access documentation.'
              }
            ]
          },
          {
            id: 'integrations',
            title: 'Integrations',
            questions: [
              {
                id: 'available-integrations',
                question: 'What integrations are available?',
                answer: 'We offer pre-built integrations with popular tools like Slack, Microsoft Teams, Google Workspace, GitHub, Jira, Trello, and many more. These can be set up without coding knowledge.'
              },
              {
                id: 'custom-integration',
                question: 'Can I build custom integrations?',
                answer: 'Yes, using our API, you can build custom integrations with any system that has an API. We provide SDKs for JavaScript, Python, and Ruby to simplify development.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Solve common issues and get help',
    icon: HelpCircle,
    articleCount: 15,
    articles: [
      {
        id: 'common-errors',
        title: 'Common Errors',
        excerpt: 'Solutions to frequently encountered problems',
        content: 'Here are solutions to some of the most frequently encountered issues on our platform.',
        lastUpdated: '2024-03-05',
        difficulty: 'beginner',
        sections: [
          {
            id: 'account-issues',
            title: 'Account Issues',
            questions: [
              {
                id: 'login-problems',
                question: 'I can\'t log in to my account',
                answer: 'Try resetting your password using the "Forgot Password" link. Make sure cookies are enabled in your browser and you\'re using the correct email address. If problems persist, check if your account has been deactivated or contact support.'
              },
              {
                id: 'verification-email',
                question: 'I didn\'t receive my verification email',
                answer: 'Check your spam or junk folder first. If you still don\'t see it, try requesting another verification email. Make sure to add our domain to your safe senders list to ensure future emails reach your inbox.'
              }
            ]
          },
          {
            id: 'performance-issues',
            title: 'Performance Issues',
            questions: [
              {
                id: 'slow-platform',
                question: 'The platform is running slowly',
                answer: 'Try clearing your browser cache and cookies. Using the latest version of Chrome, Firefox, or Edge can also help improve performance. If you\'re working with large projects, consider breaking them down into smaller sub-projects.'
              },
              {
                id: 'browser-compatibility',
                question: 'Which browsers are supported?',
                answer: 'We officially support the latest versions of Chrome, Firefox, Safari, and Edge. Internet Explorer is not supported. For the best experience, we recommend using Chrome or Firefox with automatic updates enabled.'
              }
            ]
          }
        ]
      }
    ]
  }
];

// Helper functions to retrieve documentation data
export const getCategories = () => {
  return documentationData;
};

export const getCategory = (categoryId: string) => {
  return documentationData.find(category => category.id === categoryId);
};

export const getArticle = (categoryId: string, articleId: string) => {
  const category = getCategory(categoryId);
  if (!category) return null;
  
  return category.articles.find(article => article.id === articleId);
};

export const searchDocumentation = (query: string) => {
  if (!query || query.trim() === '') return documentationData;
  
  const lowercaseQuery = query.toLowerCase();
  
  return documentationData.map(category => ({
    ...category,
    articles: category.articles.filter(article => 
      article.title.toLowerCase().includes(lowercaseQuery) ||
      article.excerpt.toLowerCase().includes(lowercaseQuery) ||
      article.content.toLowerCase().includes(lowercaseQuery) ||
      article.sections.some(section => 
        section.title.toLowerCase().includes(lowercaseQuery) ||
        section.questions.some(q => 
          q.question.toLowerCase().includes(lowercaseQuery) ||
          q.answer.toLowerCase().includes(lowercaseQuery)
        )
      )
    )
  })).filter(category => category.articles.length > 0);
};
