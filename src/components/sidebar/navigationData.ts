
import { 
  Home, 
  User, 
  Calendar, 
  Settings, 
  Briefcase,
  Award,
  BookOpen,
  MessageSquare,
  Bell,
  HelpCircle,
  FileText,
  LayoutDashboard,
  ShieldCheck,
} from 'lucide-react';
import type { MenuSection } from './types';

export const getNavigationData = (isAdmin: boolean = false): MenuSection[] => {
  const standardNavigation: MenuSection[] = [
    {
      type: 'main',
      href: '/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
    },
    {
      type: 'section',
      icon: Briefcase,
      title: 'Projects',
      items: [
        {
          href: '/projects',
          icon: Briefcase,
          label: 'All Projects',
        },
        {
          href: '/new-project',
          icon: FileText,
          label: 'New Project',
        },
      ],
    },
    {
      type: 'section',
      icon: BookOpen,
      title: 'Resources',
      items: [
        {
          href: '/assistants',
          icon: MessageSquare,
          label: 'AI Assistants',
        },
        {
          href: '/company-profile',
          icon: User,
          label: 'Company Profile',
        },
      ],
    },
    {
      type: 'section',
      icon: Bell,
      title: 'Updates',
      items: [
        {
          href: '/notifications',
          icon: Bell,
          label: 'Notifications',
        },
        {
          href: '/leaderboard',
          icon: Award,
          label: 'Leaderboard',
        },
      ],
    },
    {
      type: 'section',
      icon: HelpCircle,
      title: 'Support',
      items: [
        {
          href: '/support',
          icon: HelpCircle,
          label: 'Help & Support',
        },
        {
          href: '/preferences',
          icon: Settings,
          label: 'Preferences',
        },
      ],
    },
  ];

  // If user is admin, add admin section
  if (isAdmin) {
    standardNavigation.splice(1, 0, {
      type: 'section',
      icon: ShieldCheck,
      title: 'Admin',
      items: [
        {
          href: '/admin',
          icon: ShieldCheck,
          label: 'Admin Dashboard',
        },
        {
          href: '/admin/clients',
          icon: Briefcase,
          label: 'Client Management',
        },
      ],
    });
  }

  return standardNavigation;
};
