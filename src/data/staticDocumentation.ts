
import { 
  Book, UserCircle, FileText, FolderKanban, 
  Sparkles, Code2, HelpCircle
} from 'lucide-react';
import { DocCategory } from '@/types/documentation';
import { v4 as uuidv4 } from 'uuid';

// Helper function to generate IDs
const generateId = () => uuidv4();

// Export the static documentation data
export const documentationData: DocCategory[] = [
  {
    id: generateId(),
    slug: 'getting-started',
    title: "Getting Started",
    description: "Learn the basics of our platform and how to set up your account",
    icon: Sparkles,
    articles: [
      {
        id: generateId(),
        slug: "platform-overview",
        title: "Platform Overview",
        excerpt: "Learn about our platform capabilities and how it can help you build applications faster",
        content: "This article provides a comprehensive overview of our platform features and capabilities.",
        difficulty: "beginner",
        last_updated: new Date().toISOString(),
        sections: [
          {
            id: generateId(),
            title: "General Platform Overview",
            questions: [
              {
                id: generateId(),
                slug: "what-is-platform",
                question: "What is this platform and what can it do for me?",
                answer: "Our platform is an AI-powered app development environment that helps you build web and mobile applications faster than traditional methods. It provides tools for planning, designing, and implementing your apps with intelligent assistance at every step."
              },
              {
                id: generateId(),
                slug: "how-build-quickly",
                question: "How does this platform help me build apps quickly and efficiently?",
                answer: "The platform accelerates development through AI-assisted planning, pre-built components, automated code generation, and intelligent suggestions. Instead of starting from scratch, you can describe what you want to build and our AI will help create a structured plan and implementation path."
              },
              {
                id: generateId(),
                slug: "who-is-for",
                question: "Who is this platform designed for?",
                answer: "Our platform is designed for developers, entrepreneurs, product managers, and businesses of all sizes. Whether you're a solo developer wanting to build faster, a startup with limited resources, or an enterprise looking to innovate quickly, our tools scale to your needs."
              },
              {
                id: generateId(),
                slug: "web-mobile-apps",
                question: "Can I build both web and mobile apps using this platform?",
                answer: "Yes, you can build responsive web applications that work on all devices, as well as native mobile apps for iOS and Android. Our platform supports multiple deployment targets from a single project."
              }
            ]
          },
          {
            id: generateId(),
            title: "Account Creation & Onboarding",
            questions: [
              {
                id: generateId(),
                slug: "sign-up-process",
                question: "How do I sign up for an account?",
                answer: "To sign up, click the 'Get Started' button on our homepage. You can create an account using your email address or by signing in with Google, GitHub, or other supported authentication providers."
              },
              {
                id: generateId(),
                slug: "free-trial",
                question: "Is there a free trial available, and if so, what does it include?",
                answer: "Yes, we offer a 14-day free trial that includes access to all core features. During the trial, you can create up to 3 projects, use all AI planning tools, and export your work. Usage limits apply to certain advanced features."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: generateId(),
    slug: 'account-profile',
    title: "Account & Profile",
    description: "Manage your account settings, profile, and security preferences",
    icon: UserCircle,
    articles: [
      {
        id: generateId(),
        slug: "managing-account",
        title: "Managing Your Account",
        excerpt: "Learn how to manage your account settings, profile information, and security options",
        content: "This article explains how to effectively manage all aspects of your account.",
        difficulty: "beginner",
        last_updated: new Date().toISOString(),
        sections: [
          {
            id: generateId(),
            title: "Setting Up Your Account",
            questions: [
              {
                id: generateId(),
                slug: "create-account",
                question: "How do I create my account and log in for the first time?",
                answer: "To create an account, visit our homepage and click 'Sign Up'. You can register with your email address or use social login options like Google or GitHub. After submitting the registration form, you'll receive a verification email. Click the link in that email to verify your account, and then you can log in."
              },
              {
                id: generateId(),
                slug: "required-info",
                question: "What information do I need to provide during setup?",
                answer: "During initial account setup, you'll need to provide your name, email address, and create a password. Optionally, you can add your job title, company name, and profile picture. The more information you provide, the more personalized your experience will be."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: generateId(),
    slug: 'features',
    title: "Features & Tools",
    description: "Discover all the features and tools available in our platform",
    icon: FolderKanban,
    articles: [
      {
        id: generateId(),
        slug: "ai-assistant",
        title: "AI Assistant Guide",
        excerpt: "Learn how to use our AI assistant to boost your productivity",
        content: "Our AI assistant is designed to help you with various tasks.",
        difficulty: "intermediate",
        last_updated: new Date().toISOString(),
        sections: [
          {
            id: generateId(),
            title: "Getting Started with AI Assistant",
            questions: [
              {
                id: generateId(),
                slug: "access-ai-assistant",
                question: "How do I access the AI assistant?",
                answer: "You can access the AI assistant from any page by clicking on the assistant icon in the bottom right corner of the screen. The assistant is always ready to help you with your tasks."
              },
              {
                id: generateId(),
                slug: "assistant-capabilities",
                question: "What can the AI assistant do for me?",
                answer: "Our AI assistant can help you with a wide range of tasks including answering questions about the platform, helping you plan your projects, generating code snippets, providing design suggestions, and much more."
              }
            ]
          }
        ]
      }
    ]
  }
];

// Helper functions to work with the data
export const getAllCategories = (): DocCategory[] => {
  return documentationData.map(category => ({
    ...category,
    articles: category.articles.map(article => ({
      ...article,
      sections: [] // Don't include sections in the category overview
    }))
  }));
};

export const getCategory = (slug: string): DocCategory | undefined => {
  return documentationData.find(category => category.slug === slug);
};

export const getArticle = (categorySlug: string, articleSlug: string): DocArticle | undefined => {
  const category = documentationData.find(category => category.slug === categorySlug);
  if (!category) return undefined;
  
  return category.articles.find(article => article.slug === articleSlug);
};

export const getQuestion = (categorySlug: string, articleSlug: string, questionSlug: string) => {
  const article = getArticle(categorySlug, articleSlug);
  if (!article) return undefined;
  
  let foundQuestion;
  let foundSection;
  
  article.sections.some(section => {
    const question = section.questions.find(q => q.slug === questionSlug);
    if (question) {
      foundQuestion = question;
      foundSection = section;
      return true;
    }
    return false;
  });
  
  return foundQuestion ? { 
    category: getCategory(categorySlug),
    article,
    section: foundSection,
    question: foundQuestion
  } : undefined;
};

export const searchDocumentation = (query: string): DocCategory[] => {
  if (!query) return getAllCategories();
  
  const lowercaseQuery = query.toLowerCase();
  
  // Search in categories, articles, sections, and questions
  return documentationData
    .map(category => {
      // Check if category matches
      const categoryMatches = category.title.toLowerCase().includes(lowercaseQuery) || 
                            category.description.toLowerCase().includes(lowercaseQuery);
      
      // Filter articles that match
      const matchingArticles = category.articles.filter(article => {
        // Check if article matches
        const articleMatches = article.title.toLowerCase().includes(lowercaseQuery) || 
                               article.excerpt.toLowerCase().includes(lowercaseQuery) ||
                               article.content.toLowerCase().includes(lowercaseQuery);
        
        // Check if any section or question matches
        const sectionOrQuestionMatches = article.sections.some(section => {
          const sectionMatches = section.title.toLowerCase().includes(lowercaseQuery);
          const questionMatches = section.questions.some(question => 
            question.question.toLowerCase().includes(lowercaseQuery) || 
            question.answer.toLowerCase().includes(lowercaseQuery)
          );
          return sectionMatches || questionMatches;
        });
        
        return articleMatches || sectionOrQuestionMatches;
      });
      
      if (categoryMatches || matchingArticles.length > 0) {
        return {
          ...category,
          articles: matchingArticles.map(article => ({
            ...article,
            sections: [] // Don't include sections in search results
          }))
        };
      }
      
      return null;
    })
    .filter(Boolean) as DocCategory[];
};
