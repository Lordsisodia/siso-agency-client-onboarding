
import { DocCategory, DocArticle, DocSection, DocQuestion } from '@/types/documentation';
import { Book, Globe, UserCircle, Settings, MessageSquare, ShieldAlert, BadgeHelp } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

// Generate unique IDs for all items
const generateId = () => uuidv4();

// Create static data for documentation
export const documentationData: DocCategory[] = [
  {
    id: 'getting-started',
    slug: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics of our platform and how to set up your account',
    icon: Book,
    articleCount: 2,
    articles: [
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
                answer: 'Our platform is designed for developers, entrepreneurs, product managers, and businesses of all sizes. Whether you're a solo developer wanting to build faster, a startup with limited resources, or an enterprise looking to innovate quickly, our tools scale to your needs.'
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
    ]
  },
  {
    id: 'account-profile',
    slug: 'account-profile',
    title: 'Account & Profile',
    description: 'Manage your account settings, profile, and security preferences',
    icon: UserCircle,
    articleCount: 2,
    articles: [
      {
        id: 'managing-account',
        slug: 'managing-account',
        title: 'Managing Your Account',
        excerpt: 'Learn how to manage your account settings, profile information, and security options',
        content: 'This article explains how to effectively manage all aspects of your account.',
        lastUpdated: '2023-11-05',
        difficulty: 'beginner',
        sections: [
          {
            id: 'account-settings',
            title: 'Account Settings',
            questions: [
              {
                id: 'change-password',
                slug: 'change-password',
                question: 'How do I change my password?',
                answer: 'To change your password, go to Settings → Security, click on "Change Password", enter your current password followed by your new password twice, and click Save Changes. For security, we recommend using a strong, unique password that you don\'t use elsewhere.'
              },
              {
                id: 'update-email',
                slug: 'update-email',
                question: 'How do I update my email address?',
                answer: 'To update your email address, navigate to Settings → Account, click "Edit" next to your email address, enter your new email, and click Save. You\'ll receive a verification email at your new address. Click the link in that email to confirm the change.'
              }
            ]
          },
          {
            id: 'security-options',
            title: 'Security Options',
            questions: [
              {
                id: 'enable-2fa',
                slug: 'enable-2fa',
                question: 'How do I enable two-factor authentication?',
                answer: 'To enable two-factor authentication, go to Settings → Security, find the "Two-Factor Authentication" section, and click "Enable". You can choose between SMS authentication or an authenticator app like Google Authenticator or Authy. Follow the on-screen instructions to complete the setup process.'
              },
              {
                id: 'security-log',
                slug: 'security-log',
                question: 'Where can I view my account activity and security logs?',
                answer: 'You can view your account activity and security logs by going to Settings → Security → Activity Log. This shows all recent logins, password changes, and other security-related events. If you notice any suspicious activity, you should immediately change your password and contact our support team.'
              }
            ]
          }
        ]
      },
      {
        id: 'profile-customization',
        slug: 'profile-customization',
        title: 'Profile Customization',
        excerpt: 'Personalize your profile with professional information and preferences',
        content: 'This article explains how to customize your profile for a better experience.',
        lastUpdated: '2023-12-10',
        difficulty: 'beginner',
        sections: [
          {
            id: 'basic-info',
            title: 'Basic Information',
            questions: [
              {
                id: 'change-name',
                slug: 'change-name',
                question: 'How do I change my name or profile picture?',
                answer: 'To update your name or profile picture, go to Settings → Profile, where you can edit your first name, last name, and upload a new profile picture. Click "Save Changes" when you\'re done. Your profile picture will be visible to collaborators and on your public profile if enabled.'
              },
              {
                id: 'add-bio',
                slug: 'add-bio',
                question: 'How do I add a professional bio to my profile?',
                answer: 'To add a professional bio, navigate to Settings → Profile, find the "Bio" section, and click "Edit". You can write a brief description of your professional background, skills, and interests. This info helps collaborators get to know you better and appears on your public profile if enabled.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'projects',
    slug: 'projects',
    title: 'Projects',
    description: 'Create, manage, and collaborate on projects',
    icon: Globe,
    articleCount: 1,
    articles: [
      {
        id: 'creating-projects',
        slug: 'creating-projects',
        title: 'Creating Projects',
        excerpt: 'Learn how to create new projects and set up your development environment',
        content: 'This article guides you through the process of creating and configuring projects.',
        lastUpdated: '2024-01-15',
        difficulty: 'intermediate',
        sections: [
          {
            id: 'project-setup',
            title: 'Project Setup',
            questions: [
              {
                id: 'create-new-project',
                slug: 'create-new-project',
                question: 'How do I create a new project?',
                answer: 'To create a new project, click the "+ New Project" button on your dashboard. You\'ll be prompted to enter a project name, description, and select a project type (web app, mobile app, etc.). You can also choose to start from a template or from scratch. After providing the basic information, click "Create Project" to proceed.'
              },
              {
                id: 'project-templates',
                slug: 'project-templates',
                question: 'What project templates are available and how do I use them?',
                answer: 'We offer various templates including e-commerce stores, blogs, dashboards, CRMs, and more. To use a template, select "Start from template" when creating a new project, browse the available options by category, and select the one that best matches your needs. Templates include pre-configured layouts, components, and functionality that you can customize.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'features',
    slug: 'features',
    title: 'Features & Functionality',
    description: 'Discover the powerful features and capabilities of our platform',
    icon: Settings,
    articleCount: 1,
    articles: [
      {
        id: 'ai-features',
        slug: 'ai-features',
        title: 'AI Capabilities',
        excerpt: 'Learn about the AI-powered features that help you build apps faster',
        content: 'This article explores the advanced AI capabilities available on our platform.',
        lastUpdated: '2024-02-20',
        difficulty: 'advanced',
        sections: [
          {
            id: 'code-generation',
            title: 'Code Generation',
            questions: [
              {
                id: 'generate-components',
                slug: 'generate-components',
                question: 'How can I use AI to generate new components?',
                answer: 'To generate components with AI, navigate to your project, click "Add Component", and select "Generate with AI". Describe what you want (e.g., "a responsive pricing table with 3 tiers") in natural language. The AI will suggest code which you can preview, modify, and then add to your project. You can specify framework preferences in your description for more tailored results.'
              },
              {
                id: 'refactor-code',
                slug: 'refactor-code',
                question: 'Can the AI help me refactor existing code?',
                answer: 'Yes, our AI can help refactor code for better performance, readability, or to adopt best practices. Select the code you want to refactor, right-click, and choose "Refactor with AI". You can specify goals like "optimize for performance" or "convert to TypeScript". The AI will suggest changes while preserving functionality, which you can review before applying.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'support',
    slug: 'support',
    title: 'Support & Troubleshooting',
    description: 'Find solutions to common issues and get help when you need it',
    icon: BadgeHelp,
    articleCount: 1,
    articles: [
      {
        id: 'common-issues',
        slug: 'common-issues',
        title: 'Common Issues',
        excerpt: 'Solutions to frequently encountered problems and troubleshooting steps',
        content: 'This article addresses the most common issues users face and how to resolve them.',
        lastUpdated: '2024-03-10',
        difficulty: 'intermediate',
        sections: [
          {
            id: 'login-problems',
            title: 'Login & Authentication Issues',
            questions: [
              {
                id: 'cant-login',
                slug: 'cant-login',
                question: 'I can\'t log in to my account. What should I do?',
                answer: 'If you\'re having trouble logging in, try these steps: 1) Verify you\'re using the correct email address and password, 2) Check if Caps Lock is on, 3) Clear your browser cache and cookies, 4) Try using a different browser, 5) Use the "Forgot Password" link to reset your password. If you still can\'t log in, contact our support team with the error message you\'re seeing.'
              },
              {
                id: 'account-locked',
                slug: 'account-locked',
                question: 'My account is locked. How do I regain access?',
                answer: 'Accounts are typically locked after multiple failed login attempts as a security measure. To unlock your account, click "Forgot Password" on the login page to reset your password, or wait 30 minutes for the automatic unlock. If your account was locked by an administrator, you\'ll need to contact our support team directly for assistance.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'billing',
    slug: 'billing',
    title: 'Billing & Subscription',
    description: 'Manage your billing information, subscription plans, and payments',
    icon: ShieldAlert,
    articleCount: 1,
    articles: [
      {
        id: 'subscription-management',
        slug: 'subscription-management',
        title: 'Subscription Management',
        excerpt: 'Learn how to manage your subscription, change plans, and handle billing information',
        content: 'This article explains the subscription options and billing processes.',
        lastUpdated: '2024-04-05',
        difficulty: 'beginner',
        sections: [
          {
            id: 'change-plans',
            title: 'Changing Plans',
            questions: [
              {
                id: 'upgrade-plan',
                slug: 'upgrade-plan',
                question: 'How do I upgrade my subscription plan?',
                answer: 'To upgrade your subscription, go to Settings → Billing, click "Change Plan", and select your desired plan from the available options. Review the features and pricing differences, then click "Upgrade". Your new plan will take effect immediately, and you\'ll be charged the prorated difference for the remainder of your current billing cycle.'
              },
              {
                id: 'downgrade-plan',
                slug: 'downgrade-plan',
                question: 'Can I downgrade to a lower-tier plan?',
                answer: 'Yes, you can downgrade your subscription by going to Settings → Billing → Change Plan, and selecting a lower-tier plan. The change will take effect at the end of your current billing cycle. Please note that downgrading may result in the loss of certain features or increased usage limits. You\'ll be shown any impacts before confirming the downgrade.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'collaboration',
    slug: 'collaboration',
    title: 'Collaboration & Teams',
    description: 'Work together with team members and manage collaborative projects',
    icon: MessageSquare,
    articleCount: 1,
    articles: [
      {
        id: 'team-management',
        slug: 'team-management',
        title: 'Team Management',
        excerpt: 'Learn how to create and manage teams, add members, and set permissions',
        content: 'This article covers all aspects of team collaboration on our platform.',
        lastUpdated: '2024-05-12',
        difficulty: 'intermediate',
        sections: [
          {
            id: 'team-creation',
            title: 'Creating & Organizing Teams',
            questions: [
              {
                id: 'create-team',
                slug: 'create-team',
                question: 'How do I create a new team?',
                answer: 'To create a new team, go to Teams in the main navigation, click "Create Team", and enter a team name and optional description. You can then set the team visibility (public or private) and add members by entering their email addresses. Assign appropriate roles to each member (Admin, Editor, or Viewer) based on their responsibilities.'
              },
              {
                id: 'add-members',
                slug: 'add-members',
                question: 'How do I add members to my team?',
                answer: 'To add members to an existing team, navigate to Teams, select the team you want to modify, and click "Members" in the team dashboard. Click "Add Members", enter the email addresses of the people you want to invite (separated by commas for multiple), assign their roles, and click "Send Invites". They\'ll receive an email invitation to join the team.'
              }
            ]
          }
        ]
      }
    ]
  }
];

// Client-side services to replace database queries
export const fetchCategories = (): Promise<DocCategory[]> => {
  return Promise.resolve(documentationData);
};

export const fetchCategory = (categorySlug: string): Promise<DocCategory | null> => {
  const category = documentationData.find(c => c.slug === categorySlug) || null;
  return Promise.resolve(category);
};

export const fetchArticle = (categorySlug: string, articleSlug: string): Promise<DocArticle | null> => {
  const category = documentationData.find(c => c.slug === categorySlug);
  const article = category?.articles.find(a => a.slug === articleSlug) || null;
  return Promise.resolve(article);
};

export const fetchQuestion = (
  categorySlug: string, 
  articleSlug: string, 
  questionSlug: string
): Promise<{
  category: DocCategory | null;
  article: DocArticle | null;
  section: DocSection | null;
  question: DocQuestion | null;
}> => {
  const category = documentationData.find(c => c.slug === categorySlug) || null;
  const article = category?.articles.find(a => a.slug === articleSlug) || null;
  
  let foundSection: DocSection | null = null;
  let foundQuestion: DocQuestion | null = null;
  
  if (article) {
    for (const section of article.sections) {
      const question = section.questions.find(q => q.slug === questionSlug);
      if (question) {
        foundSection = section;
        foundQuestion = question;
        break;
      }
    }
  }
  
  return Promise.resolve({
    category,
    article,
    section: foundSection,
    question: foundQuestion
  });
};

// Search functionality
export const searchDocumentation = (query: string): Promise<DocCategory[]> => {
  if (!query) {
    return fetchCategories();
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  
  const filteredCategories = documentationData.map(category => {
    // Filter articles in each category
    const matchedArticles = category.articles.filter(article => {
      // Check article title and content
      if (
        article.title.toLowerCase().includes(normalizedQuery) ||
        article.excerpt.toLowerCase().includes(normalizedQuery) ||
        article.content.toLowerCase().includes(normalizedQuery)
      ) {
        return true;
      }
      
      // Check sections and questions
      return article.sections.some(section => 
        section.title.toLowerCase().includes(normalizedQuery) ||
        section.questions.some(question => 
          question.question.toLowerCase().includes(normalizedQuery) ||
          question.answer.toLowerCase().includes(normalizedQuery)
        )
      );
    });
    
    // Return category with filtered articles if any match found
    if (matchedArticles.length > 0) {
      return {
        ...category,
        articles: matchedArticles,
        articleCount: matchedArticles.length
      };
    }
    
    // Return null if no matches in this category
    return null;
  }).filter(Boolean) as DocCategory[];
  
  return Promise.resolve(filteredCategories);
};

// Simulated feedback functionality
export const saveQuestionFeedback = (
  questionId: string, 
  feedbackType: 'helpful' | 'not-helpful',
  userId?: string
): Promise<boolean> => {
  console.log(`Feedback saved: ${feedbackType} for question ${questionId} by user ${userId || 'anonymous'}`);
  return Promise.resolve(true);
};
