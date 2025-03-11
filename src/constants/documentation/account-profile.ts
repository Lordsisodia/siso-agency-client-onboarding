
import { DocArticle } from '@/types/documentation';
import { v4 as uuidv4 } from 'uuid';

export const accountProfileArticles: DocArticle[] = [
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
];
