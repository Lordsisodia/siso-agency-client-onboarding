
import { DocArticle } from '@/types/documentation';
import { v4 as uuidv4 } from 'uuid';

export const billingArticles: DocArticle[] = [
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
];
