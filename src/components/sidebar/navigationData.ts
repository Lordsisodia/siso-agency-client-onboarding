
import { 
  Home,
  GraduationCap,
  Network,
  Trophy,
  BarChart,
  BookOpen,
  Bot,
  Wrench,
  Users,
  Newspaper,
  LayoutDashboard,
  FileText,
  FolderKanban,
  Building,
  Lightbulb,
  Briefcase,
  TrendingUp,
  Bell
} from 'lucide-react';
import { MenuSection } from './types';

export const menuSections: MenuSection[] = [
  {
    type: 'main',
    href: '/dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard',
  },
  {
    type: 'section',
    title: 'Projects',
    icon: FolderKanban,
    items: [
      {
        href: '/projects',
        icon: FolderKanban,
        label: 'My Projects',
      },
      {
        href: '/plan-builder',
        icon: FileText,
        label: 'Plan Builder',
      },
      {
        href: '/company-profile',
        icon: Building,
        label: 'Company Profile',
      }
    ]
  },
  {
    type: 'section',
    title: 'Resources',
    icon: BookOpen,
    items: [
      {
        href: '/resource-hub',
        icon: BookOpen,
        label: 'Resource Hub',
      },
      {
        href: '/portfolio',
        icon: Briefcase,
        label: 'Portfolio',
      },
      {
        href: '/competitive-analysis',
        icon: TrendingUp,
        label: 'Competitive Analysis',
      },
      {
        href: '/education',
        icon: GraduationCap,
        label: 'Education',
      },
      {
        href: '/assistants',
        icon: Bot,
        label: 'AI Assistants',
      },
      {
        href: '/tools',
        icon: Wrench,
        label: 'Tools',
      }
    ]
  },
  {
    type: 'section',
    title: 'Communication',
    icon: Bell,
    items: [
      {
        href: '/notifications',
        icon: Bell,
        label: 'Notifications',
      },
      {
        href: '/networking',
        icon: Network,
        label: 'Networking',
      }
    ]
  },
  {
    type: 'section',
    title: 'Economy',
    icon: Users,
    items: [
      {
        href: '/economy/crypto-exchange',
        icon: Network,
        label: 'Crypto Exchange',
      },
      {
        href: '/economy/earn',
        icon: Trophy,
        label: 'How to Earn',
      },
      {
        href: '/economy/leaderboards',
        icon: BarChart,
        label: 'Leaderboards',
      }
    ]
  },
  {
    type: 'main',
    href: '/ai-news',
    icon: Newspaper,
    label: 'AI News',
  }
];
