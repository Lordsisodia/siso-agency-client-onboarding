
// This file contains static documentation data for testing/development

// Define the structure of our documentation content
interface StaticDocQuestion {
  question: string;
  answer: string;
}

interface StaticDocSection {
  title: string;
  questions: StaticDocQuestion[];
}

interface StaticDocArticle {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  lastUpdated?: string;
  sections: StaticDocSection[];
}

interface StaticDocCategory {
  title: string;
  description: string;
  icon: { name: string };
  articles: StaticDocArticle[];
}

// Export the static documentation data
export const documentationData: StaticDocCategory[] = [
  {
    title: "Getting Started",
    description: "Learn the basics of our platform and how to set up your account",
    icon: { name: "SparklesIcon" },
    articles: [
      {
        title: "Platform Overview",
        slug: "platform-overview",
        excerpt: "Learn about our platform capabilities and how it can help you build applications faster",
        content: "This article provides a comprehensive overview of our platform features and capabilities.",
        difficulty: "beginner",
        sections: [
          {
            title: "General Platform Overview",
            questions: [
              {
                question: "What is this platform and what can it do for me?",
                answer: "Our platform is an AI-powered app development environment that helps you build web and mobile applications faster than traditional methods. It provides tools for planning, designing, and implementing your apps with intelligent assistance at every step."
              },
              {
                question: "How does this platform help me build apps quickly and efficiently?",
                answer: "The platform accelerates development through AI-assisted planning, pre-built components, automated code generation, and intelligent suggestions. Instead of starting from scratch, you can describe what you want to build and our AI will help create a structured plan and implementation path."
              },
              {
                question: "Who is this platform designed for?",
                answer: "Our platform is designed for developers, entrepreneurs, product managers, and businesses of all sizes. Whether you're a solo developer wanting to build faster, a startup with limited resources, or an enterprise looking to innovate quickly, our tools scale to your needs."
              },
              {
                question: "Can I build both web and mobile apps using this platform?",
                answer: "Yes, you can build responsive web applications that work on all devices, as well as native mobile apps for iOS and Android. Our platform supports multiple deployment targets from a single project."
              },
              {
                question: "What makes this platform different from traditional app development tools?",
                answer: "Unlike traditional development environments, our platform combines AI planning, component-based development, and intelligent assistance. This means you spend less time writing boilerplate code and more time creating unique features for your app. The AI learns from your preferences and improves over time."
              }
            ]
          },
          {
            title: "Account Creation & Onboarding",
            questions: [
              {
                question: "How do I sign up for an account?",
                answer: "To sign up, click the 'Get Started' button on our homepage. You can create an account using your email address or by signing in with Google, GitHub, or other supported authentication providers."
              },
              {
                question: "Is there a free trial available, and if so, what does it include?",
                answer: "Yes, we offer a 14-day free trial that includes access to all core features. During the trial, you can create up to 3 projects, use all AI planning tools, and export your work. Usage limits apply to certain advanced features."
              },
              {
                question: "What information do I need to provide during sign-up?",
                answer: "Basic sign-up requires only your name, email address, and a password. For a business account, you'll also need to provide company information. We recommend completing your profile with additional details to enhance the AI's personalization."
              },
              {
                question: "How long does the onboarding process take?",
                answer: "The initial onboarding takes about 5-10 minutes, where you'll answer questions about your experience level and project needs. This helps customize the platform experience for you. You can skip detailed onboarding and complete it later if you prefer."
              },
              {
                question: "Are there any prerequisites before creating an account?",
                answer: "There are no technical prerequisites to create an account. Basic familiarity with application concepts is helpful but not required. Our platform is designed to be accessible to users with varying levels of technical expertise."
              }
            ]
          },
          {
            title: "Quick Start Guide",
            questions: [
              {
                question: "What are the first steps I should take after logging in?",
                answer: "After logging in for the first time, we recommend: 1) Take the guided tour to understand the interface, 2) Create your first project using the 'New Project' button, 3) Explore the AI Plan Builder to define your app's structure, and 4) Check out sample projects for inspiration."
              },
              {
                question: "How do I set up my account quickly?",
                answer: "For the fastest setup, click 'Complete Profile' after logging in, fill in the basic information about yourself and your goals, then select a template project that's closest to what you want to build. This will pre-populate many settings and give you a head start."
              },
              {
                question: "Where can I find a tutorial or walkthrough to get started?",
                answer: "Tutorials are available under the 'Learn' section in the main navigation. We also provide interactive walkthroughs that appear when you use key features for the first time. For comprehensive learning, visit our Academy where step-by-step courses are available."
              },
              {
                question: "What should I do if I get stuck during the initial setup?",
                answer: "If you get stuck, click the help icon (question mark) in the top right corner for contextual help. You can also chat with our AI assistant by clicking 'Get Help' or visit the community forum through the Support menu. For urgent issues, use the live chat in the bottom right."
              },
              {
                question: "Can I preview a demo of the platform before I dive in?",
                answer: "Yes, we offer an interactive demo that doesn't require account creation. Visit the 'Try Demo' section on our homepage to explore a limited version of the platform with pre-loaded sample projects. This gives you a feel for the interface and key features."
              }
            ]
          },
          {
            title: "Understanding the Dashboard",
            questions: [
              {
                question: "What are the main sections of the dashboard?",
                answer: "The dashboard consists of: 1) The Projects section showing your recent and pinned projects, 2) Quick Stats displaying your usage and activity metrics, 3) Resources section with learning materials and templates, 4) News & Updates about new features, and 5) The Activity Feed showing recent actions and collaborator activities."
              },
              {
                question: "How do I navigate between features on the dashboard?",
                answer: "Use the main navigation menu on the left sidebar to switch between major sections like Projects, Plan Builder, Resources, and Settings. The top bar provides quick access to search, notifications, and your profile. Each section has its own sub-navigation that appears when you select it."
              },
              {
                question: "Can I customize the dashboard layout?",
                answer: "Yes, you can customize the dashboard by clicking the 'Customize' button in the top right corner. This allows you to rearrange widgets, hide sections you don't use frequently, and choose which metrics and projects to highlight. Your customizations are saved automatically."
              },
              {
                question: "How do I access quick actions like starting a new project or checking tasks?",
                answer: "Quick actions are available through the '+ New' button in the top navigation bar. This dropdown menu lets you create projects, add tasks, or access other creation tools. You can also use keyboard shortcuts (press '?' to see all shortcuts) for common actions."
              },
              {
                question: "Where do I find my latest notifications and project updates?",
                answer: "Notifications appear in the bell icon menu in the top navigation bar. This shows system notifications, project updates, and mentions. The Activity Feed on the dashboard also displays recent changes across all your projects, and each project has its own activity timeline."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Account & Profile",
    description: "Manage your account settings, profile, and security preferences",
    icon: { name: "UserCircleIcon" },
    articles: [
      {
        title: "Managing Your Account",
        slug: "managing-account",
        excerpt: "Learn how to manage your account settings, profile information, and security options",
        content: "This article explains how to effectively manage all aspects of your account.",
        difficulty: "beginner",
        sections: [
          {
            title: "Setting Up Your Account",
            questions: [
              {
                question: "How do I create my account and log in for the first time?",
                answer: "To create an account, visit our homepage and click 'Sign Up'. You can register with your email address or use social login options like Google or GitHub. After submitting the registration form, you'll receive a verification email. Click the link in that email to verify your account, and then you can log in."
              },
              {
                question: "What information do I need to provide during setup?",
                answer: "During initial account setup, you'll need to provide your name, email address, and create a password. Optionally, you can add your job title, company name, and profile picture. The more information you provide, the more personalized your experience will be."
              },
              {
                question: "Can I sign up using my social media accounts?",
                answer: "Yes, we support social login with Google, GitHub, and Microsoft accounts. This allows for faster registration and login without needing to create and remember another password. Your account will be linked to the social provider you choose."
              },
              {
                question: "How do I verify my email address or phone number?",
                answer: "After registration, we automatically send a verification email to your provided email address. Click the link in the email to verify your account. For phone verification (optional), go to Account Settings → Security, add your phone number, and we'll send a verification code via SMS."
              },
              {
                question: "What should I do if I encounter issues during sign-up?",
                answer: "If you encounter any issues during sign-up, first check that you're using a supported browser (Chrome, Firefox, Safari, or Edge). Clear your browser cache and try again. If problems persist, check our status page for any system issues, or contact support with details about the problem you're experiencing."
              }
            ]
          }
        ]
      }
    ]
  }
];
