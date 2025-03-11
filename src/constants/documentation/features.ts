
import { DocArticle } from '@/types/documentation';
import { v4 as uuidv4 } from 'uuid';

export const featuresArticles: DocArticle[] = [
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
];
