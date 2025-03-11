import React, { useState } from 'react';
import { Search, Book, UserCircle, FileText, FolderKanban, Sparkles, Code2, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface DocArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  lastUpdated?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

interface DocCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  articleCount: number;
  articles: DocArticle[];
}

export const DocumentationSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('getting-started');
  const [currentArticle, setCurrentArticle] = useState<DocArticle | null>(null);

  // Documentation categories with article counts
  const categories: DocCategory[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Learn the basics and get up to speed quickly',
      icon: <Book className="h-5 w-5" />,
      articleCount: 6,
      articles: [
        {
          id: 'welcome',
          title: 'Welcome to the Platform',
          excerpt: 'Get an overview of what our platform offers',
          content: `
            <h2>Welcome to the Platform</h2>
            <p>Welcome to the platform! This guide will help you get started with creating your first project.</p>
            
            <h3>What Our Platform Offers</h3>
            <p>Our platform provides a comprehensive suite of tools to help you plan, execute, and track your projects efficiently.</p>
            
            <h3>Key Features</h3>
            <p>Some of the key features include:</p>
            <ul>
              <li>Intuitive Plan Builder for project planning</li>
              <li>Task management and tracking</li>
              <li>AI-powered assistance</li>
              <li>Collaboration tools</li>
              <li>Analytics and reporting</li>
            </ul>
            
            <h3>Getting Started</h3>
            <p>To get started, we recommend checking out the Quick Start Guide next, which will walk you through creating your first project.</p>
          `,
          difficulty: 'beginner',
          lastUpdated: '2024-03-28'
        },
        {
          id: 'quick-start',
          title: 'Quick Start Guide',
          excerpt: 'Get up and running in minutes',
          content: `
            <h2>Quick Start Guide</h2>
            <p>Welcome to the platform! This guide will help you get started with creating your first project.</p>
            
            <h3>Step 1: Create a New Project</h3>
            <p>Go to the Dashboard and click on the "New Project" button. Give your project a name and description.</p>
            
            <h3>Step 2: Use the Plan Builder</h3>
            <p>After creating your project, you'll be taken to the Plan Builder. Here, you can define your project requirements, features, and specifications.</p>
            
            <h3>Step 3: Track Progress</h3>
            <p>Once your plan is complete, you can track your project's progress on the Dashboard. You'll see metrics and key performance indicators that help you understand how your project is doing.</p>
            
            <h3>Need More Help?</h3>
            <p>If you need additional assistance, you can ask our AI assistant for help or browse through more detailed documentation.</p>
          `,
          difficulty: 'beginner',
          lastUpdated: '2024-03-27'
        }
      ]
    },
    {
      id: 'account-profile',
      title: 'Account & Profile',
      description: 'Manage your account settings and profile',
      icon: <UserCircle className="h-5 w-5" />,
      articleCount: 10,
      articles: [
        {
          id: 'account-setup',
          title: 'Account Setup',
          excerpt: 'Configure your account settings and preferences',
          content: `
            <h2>Account Setup</h2>
            <p>Setting up your account properly helps you get the most out of the platform.</p>
            
            <h3>Profile Information</h3>
            <p>Navigate to the Profile page to add your name, professional role, and business information. This helps personalize your experience and makes collaboration easier.</p>
            
            <h3>Notification Preferences</h3>
            <p>Configure your notification settings to stay updated about project changes, new features, and important alerts.</p>
            
            <h3>Security Settings</h3>
            <p>Review your security settings and enable two-factor authentication for added protection.</p>
          `,
          difficulty: 'beginner',
          lastUpdated: '2024-03-25'
        }
      ]
    },
    {
      id: 'plan-builder',
      title: 'Plan Builder',
      description: 'Create and manage project plans effectively',
      icon: <FileText className="h-5 w-5" />,
      articleCount: 15,
      articles: [
        {
          id: 'plan-builder-intro',
          title: 'Introduction to Plan Builder',
          excerpt: 'Learn the basics of the Plan Builder tool',
          content: `
            <h2>Introduction to Plan Builder</h2>
            <p>The Plan Builder is a powerful tool that helps you define your project's scope, features, and specifications.</p>
            
            <h3>Starting the Plan Builder</h3>
            <p>Access the Plan Builder from your project dashboard or when creating a new project. The builder will guide you through a step-by-step process.</p>
            
            <h3>Defining Requirements</h3>
            <p>Start by outlining your project requirements. Be as specific as possible to ensure your plan addresses all necessary aspects.</p>
            
            <h3>Adding Features</h3>
            <p>Next, define the features your project needs. The platform provides suggestions based on your requirements.</p>
            
            <h3>Technical Specifications</h3>
            <p>Finally, specify technical details and constraints. This helps ensure your project plan is comprehensive and realistic.</p>
          `,
          difficulty: 'intermediate',
          lastUpdated: '2024-03-20'
        }
      ]
    },
    {
      id: 'projects-tasks',
      title: 'Projects & Tasks',
      description: 'Organize and track your work',
      icon: <FolderKanban className="h-5 w-5" />,
      articleCount: 20,
      articles: [
        {
          id: 'creating-projects',
          title: 'Creating New Projects',
          excerpt: 'How to create and configure new projects',
          content: `
            <h2>Creating New Projects</h2>
            <p>Projects are the core of our platform. Here's how to create and configure them effectively.</p>
            
            <h3>Creating a Project</h3>
            <p>From the Dashboard or Projects page, click the "New Project" button. You'll need to provide a name and optional description.</p>
            
            <h3>Project Types</h3>
            <p>You can choose from various project types or templates to get started quickly. Each template comes with pre-configured settings designed for specific use cases.</p>
            
            <h3>Project Settings</h3>
            <p>After creating a project, visit the Project Settings to configure collaboration options, visibility, and other parameters.</p>
          `,
          difficulty: 'beginner',
          lastUpdated: '2024-03-18'
        }
      ]
    },
    {
      id: 'ai-features',
      title: 'AI Features',
      description: 'Leverage AI capabilities',
      icon: <Sparkles className="h-5 w-5" />,
      articleCount: 12,
      articles: [
        {
          id: 'assistant-basics',
          title: 'Assistant Basics',
          excerpt: 'Getting started with the AI assistant',
          content: `
            <h2>Assistant Basics</h2>
            <p>Our AI assistant is designed to help you navigate the platform and answer questions about your projects.</p>
            
            <h3>Accessing the Assistant</h3>
            <p>You can access the AI assistant from the Help Center or by clicking the assistant icon in the bottom right corner of any page.</p>
            
            <h3>Asking Questions</h3>
            <p>Simply type your question in the chat input and press Enter. The assistant will provide relevant answers and can even help you perform certain actions.</p>
            
            <h3>Context-Aware Help</h3>
            <p>The assistant understands your current context, so you can ask page-specific questions without providing additional details.</p>
          `,
          difficulty: 'beginner',
          lastUpdated: '2024-03-15'
        }
      ]
    },
    {
      id: 'api-integration',
      title: 'API & Integration',
      description: 'Connect and extend the platform',
      icon: <Code2 className="h-5 w-5" />,
      articleCount: 8,
      articles: [
        {
          id: 'api-overview',
          title: 'API Overview',
          excerpt: 'Introduction to our API capabilities',
          content: `
            <h2>API Overview</h2>
            <p>Our platform provides a comprehensive API that allows you to integrate with other tools and extend functionality.</p>
            
            <h3>Authentication</h3>
            <p>All API requests require authentication using API keys. You can generate and manage your API keys in the Account Settings.</p>
            
            <h3>Rate Limits</h3>
            <p>Be aware of rate limits to ensure your applications function properly. Standard accounts have limits of 100 requests per minute.</p>
            
            <h3>Endpoints</h3>
            <p>Our API provides endpoints for projects, tasks, users, and more. Each endpoint is documented with examples and parameter descriptions.</p>
          `,
          difficulty: 'advanced',
          lastUpdated: '2024-03-10'
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      description: 'Solve common issues and get help',
      icon: <HelpCircle className="h-5 w-5" />,
      articleCount: 15,
      articles: [
        {
          id: 'common-errors',
          title: 'Common Errors',
          excerpt: 'Solutions to frequently encountered problems',
          content: `
            <h2>Common Errors</h2>
            <p>Here are solutions to some of the most frequently encountered issues on our platform.</p>
            
            <h3>Login Problems</h3>
            <p>If you're having trouble logging in, try resetting your password. Make sure cookies are enabled in your browser and check that you're using the correct email address.</p>
            
            <h3>Missing Projects</h3>
            <p>If you can't see your projects, check your account permissions. You might need to request access from the project owner.</p>
            
            <h3>Performance Issues</h3>
            <p>If the platform seems slow, try clearing your browser cache and cookies. Using the latest version of Chrome, Firefox, or Edge can also help improve performance.</p>
          `,
          difficulty: 'beginner',
          lastUpdated: '2024-03-05'
        }
      ]
    }
  ];

  const filteredCategories = categories.map(category => ({
    ...category,
    articles: category.articles.filter(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.articles.length > 0);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentArticle(null);
  };

  const handleArticleSelect = (article: DocArticle) => {
    setCurrentArticle(article);
  };

  const handleBackToList = () => {
    setCurrentArticle(null);
  };

  const currentCategory = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="w-full space-y-6">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-siso-text/60" />
        <Input
          type="search"
          placeholder="Search documentation..."
          className="pl-10 bg-siso-bg-card/20 border-siso-border"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {!currentArticle ? (
        <div className="space-y-6">
          <Tabs value={selectedCategory} onValueChange={handleCategorySelect} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-6">
              {categories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex items-center gap-2 p-3"
                >
                  <div className="mr-2">{category.icon}</div>
                  <div className="flex items-center gap-2">
                    <span>{category.title}</span>
                    <Badge variant="secondary" className="ml-1">
                      {category.articleCount}
                    </Badge>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map(category => (
              <TabsContent key={category.id} value={category.id} className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
                  <p className="text-siso-text/70 mb-4">{category.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(searchQuery ? filteredCategories.find(c => c.id === category.id)?.articles : category.articles)?.map(article => (
                    <Card 
                      key={article.id} 
                      className="hover:bg-siso-bg-card/30 transition-colors cursor-pointer border-siso-border"
                      onClick={() => handleArticleSelect(article)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{article.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {article.difficulty}
                          </Badge>
                        </div>
                        <p className="text-siso-text/70 text-sm mb-2">{article.excerpt}</p>
                        <div className="text-xs text-siso-text/50">
                          Last updated: {article.lastUpdated}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      ) : (
        <div className="space-y-4">
          <Button variant="ghost" onClick={handleBackToList} className="mb-4">
            ← Back to {currentCategory?.title}
          </Button>
          
          <div className="prose prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: currentArticle.content }} />
          </div>
        </div>
      )}
    </div>
  );
};
