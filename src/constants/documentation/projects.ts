
import { DocArticle } from '@/types/documentation';
import { v4 as uuidv4 } from 'uuid';

export const projectsArticles: DocArticle[] = [
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
];
