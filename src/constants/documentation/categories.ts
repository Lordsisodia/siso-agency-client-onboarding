
import { DocCategory } from '@/types/documentation';
import { Book, Globe, UserCircle, Settings, MessageSquare, ShieldAlert, BadgeHelp } from 'lucide-react';
import { gettingStartedArticles } from './getting-started';
import { accountProfileArticles } from './account-profile';
import { projectsArticles } from './projects';
import { featuresArticles } from './features';
import { supportArticles } from './support';
import { billingArticles } from './billing';
import { collaborationArticles } from './collaboration';

// Helper function to count total questions in a category
const countQuestions = (articles) => {
  return articles.reduce((total, article) => {
    return total + article.sections.reduce((sectionTotal, section) => {
      return sectionTotal + section.questions.length;
    }, 0);
  }, 0);
};

export const documentationCategories: DocCategory[] = [
  {
    id: 'getting-started',
    slug: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics of our platform and how to set up your account',
    icon: Book,
    articleCount: gettingStartedArticles.length,
    questionCount: countQuestions(gettingStartedArticles),
    articles: gettingStartedArticles
  },
  {
    id: 'account-profile',
    slug: 'account-profile',
    title: 'Account & Profile',
    description: 'Manage your account settings, profile, and security preferences',
    icon: UserCircle,
    articleCount: accountProfileArticles.length,
    questionCount: countQuestions(accountProfileArticles),
    articles: accountProfileArticles
  },
  {
    id: 'projects',
    slug: 'projects',
    title: 'Projects',
    description: 'Create, manage, and collaborate on projects',
    icon: Globe,
    articleCount: projectsArticles.length,
    questionCount: countQuestions(projectsArticles),
    articles: projectsArticles
  },
  {
    id: 'features',
    slug: 'features',
    title: 'Features & Functionality',
    description: 'Discover the powerful features and capabilities of our platform',
    icon: Settings,
    articleCount: featuresArticles.length,
    questionCount: countQuestions(featuresArticles),
    articles: featuresArticles
  },
  {
    id: 'support',
    slug: 'support',
    title: 'Support & Troubleshooting',
    description: 'Find solutions to common issues and get help when you need it',
    icon: BadgeHelp,
    articleCount: supportArticles.length,
    questionCount: countQuestions(supportArticles),
    articles: supportArticles
  },
  {
    id: 'billing',
    slug: 'billing',
    title: 'Billing & Subscription',
    description: 'Manage your billing information, subscription plans, and payments',
    icon: ShieldAlert,
    articleCount: billingArticles.length,
    questionCount: countQuestions(billingArticles),
    articles: billingArticles
  },
  {
    id: 'collaboration',
    slug: 'collaboration',
    title: 'Collaboration & Teams',
    description: 'Work together with team members and manage collaborative projects',
    icon: MessageSquare,
    articleCount: collaborationArticles.length,
    questionCount: countQuestions(collaborationArticles),
    articles: collaborationArticles
  }
];
