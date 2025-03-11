
import { DocArticle } from '@/types/documentation';
import { v4 as uuidv4 } from 'uuid';

export const supportArticles: DocArticle[] = [
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
];
