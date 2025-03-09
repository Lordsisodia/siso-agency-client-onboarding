import {
  BarChart3,
  Bell,
  Book,
  CheckSquare,
  LayoutDashboard,
  ListChecks,
  LucideIcon,
  Mail,
  MessagesSquare,
  Network,
  Settings,
  ShoppingCart,
  Users,
  Calendar,
  LayoutPanelTop,
} from 'lucide-react';

export interface NavigationItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  section: 'Main' | 'Platform' | 'Communicate' | 'Education' | 'Tools';
}

export const navigationItems: NavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    section: 'Main',
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    section: 'Main',
  },
  {
    title: 'Users',
    href: '/users',
    icon: Users,
    section: 'Platform',
  },
  {
    title: 'Agencies',
    href: '/agencies',
    icon: ShoppingCart,
    section: 'Platform',
  },
  {
    title: 'Notifications',
    href: '/notifications',
    icon: Bell,
    badge: '12',
    section: 'Communicate',
  },
  {
    title: 'Messages',
    href: '/messages',
    icon: MessagesSquare,
    section: 'Communicate',
  },
  {
    title: 'Email Marketing',
    href: '/email-marketing',
    icon: Mail,
    section: 'Communicate',
  },
  {
    title: 'Networking',
    href: '/networking',
    icon: Network,
    section: 'Education',
  },
  {
    title: 'Education',
    href: '/education',
    icon: Book,
    section: 'Education',
  },
  {
    title: 'Task Management',
    href: '/tasks',
    icon: ListChecks,
    section: 'Tools',
  },
  {
    title: 'AI Checklist',
    href: '/ai-checklist',
    icon: CheckSquare,
    section: 'Tools',
  },
  {
    title: 'Project Planning',
    href: '/project-planning',
    icon: LayoutPanelTop,
    section: "Tools",
  },
  {
    title: 'Calendar',
    href: '/calendar',
    icon: Calendar,
    section: 'Tools',
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    section: 'Platform',
  },
];

export const sidebarSections = [
  {
    title: 'Main',
    items: navigationItems.filter((item) => item.section === 'Main'),
  },
  {
    title: 'Platform',
    items: navigationItems.filter((item) => item.section === 'Platform'),
  },
  {
    title: 'Communicate',
    items: navigationItems.filter((item) => item.section === 'Communicate'),
  },
  {
    title: 'Education',
    items: navigationItems.filter((item) => item.section === 'Education'),
  },
    {
    title: 'Tools',
    items: navigationItems.filter((item) => item.section === 'Tools'),
  },
];
