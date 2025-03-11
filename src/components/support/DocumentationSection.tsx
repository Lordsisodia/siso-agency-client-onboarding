
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DocCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  articles: DocArticle[];
}

interface DocArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
}

export const DocumentationSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('getting-started');
  const [currentArticle, setCurrentArticle] = useState<DocArticle | null>(null);

  // Documentation categories
  const categories: DocCategory[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Learn the basics of using the platform',
      icon: <span className="text-2xl">👋</span>,
      articles: [
        {
          id: 'quick-start',
          title: 'Quick Start Guide',
          excerpt: 'Get up and running with your first project',
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
          `
        },
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
          `
        }
      ]
    },
    {
      id: 'projects',
      title: 'Projects',
      description: 'Learn how to create and manage projects',
      icon: <span className="text-2xl">📁</span>,
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
          `
        },
        {
          id: 'plan-builder',
          title: 'Using the Plan Builder',
          excerpt: 'Create detailed project plans and specifications',
          content: `
            <h2>Using the Plan Builder</h2>
            <p>The Plan Builder helps you define your project's scope, features, and specifications.</p>
            
            <h3>Starting the Plan Builder</h3>
            <p>Access the Plan Builder from your project dashboard or when creating a new project. The builder will guide you through a step-by-step process.</p>
            
            <h3>Defining Requirements</h3>
            <p>Start by outlining your project requirements. Be as specific as possible to ensure your plan addresses all necessary aspects.</p>
            
            <h3>Adding Features</h3>
            <p>Next, define the features your project needs. The platform provides suggestions based on your requirements.</p>
            
            <h3>Technical Specifications</h3>
            <p>Finally, specify technical details and constraints. This helps ensure your project plan is comprehensive and realistic.</p>
          `
        }
      ]
    },
    {
      id: 'ai-assistant',
      title: 'AI Assistant',
      description: 'Learn how to use the AI assistant effectively',
      icon: <span className="text-2xl">🤖</span>,
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
          `
        },
        {
          id: 'advanced-assistant-features',
          title: 'Advanced Assistant Features',
          excerpt: 'Using the AI assistant for complex tasks',
          content: `
            <h2>Advanced Assistant Features</h2>
            <p>Beyond answering simple questions, our AI assistant can help with complex tasks and project planning.</p>
            
            <h3>Project Recommendations</h3>
            <p>Ask the assistant for recommendations based on your project needs. It can suggest features, approaches, and best practices.</p>
            
            <h3>Code Explanations</h3>
            <p>If you're working with code, the assistant can explain snippets, suggest improvements, and help troubleshoot issues.</p>
            
            <h3>Process Assistance</h3>
            <p>The assistant can guide you through complex processes like setting up integrations, configuring advanced features, or optimizing your workflow.</p>
          `
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      description: 'Resolve common issues and errors',
      icon: <span className="text-2xl">🔧</span>,
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
          `
        },
        {
          id: 'contact-support',
          title: 'Contacting Support',
          excerpt: 'How to reach our support team for additional help',
          content: `
            <h2>Contacting Support</h2>
            <p>When you need personalized assistance, our support team is ready to help.</p>
            
            <h3>AI Assistant</h3>
            <p>Start by asking our AI assistant. It can solve many common problems instantly and save you time.</p>
            
            <h3>Email Support</h3>
            <p>For more complex issues, email support@example.com with details about your problem. Include screenshots if possible.</p>
            
            <h3>Live Chat</h3>
            <p>During business hours, you can access live chat support by clicking the "Chat with Support" button in the bottom right corner of the Help Center.</p>
          `
        }
      ]
    }
  ];

  // Filter articles based on search query
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

  // Get the current category
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

      {/* Display categories or article details */}
      {!currentArticle ? (
        <div className="space-y-6">
          {/* Category tabs */}
          <Tabs value={selectedCategory} onValueChange={handleCategorySelect} className="w-full">
            <TabsList className="grid grid-cols-4 w-full mb-6">
              {categories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex flex-col items-center gap-2 p-3 data-[state=active]:bg-siso-red/10"
                >
                  <div className="mb-1">{category.icon}</div>
                  {category.title}
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
                    <Card key={article.id} className="hover:bg-siso-bg-card/30 transition-colors cursor-pointer" onClick={() => handleArticleSelect(article)}>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{article.title}</h3>
                        <p className="text-siso-text/70 text-sm">{article.excerpt}</p>
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
