
import { 
  Home,
  GraduationCap,
  Network,
  BookOpen,
  Bot,
  Wrench,
  FileText,
  FolderKanban,
  Building,
  Briefcase,
  TrendingUp,
  HelpCircle,
  MessageCircle,
  User,
  Bell,
  Trophy,
  Medal
} from 'lucide-react';
import { MenuSection } from './types';

export const menuSections: MenuSection[] = [
  {
    type: 'main',
    href: '/dashboard',
    icon: Home,
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
    title: 'Learning',
    icon: GraduationCap,
    items: [
      {
        href: 'https://www.sisoresourcehub.online/home',
        icon: GraduationCap,
        label: 'SISO Resources',
        isExternal: true
      },
      {
        href: '/portfolio',
        icon: Briefcase,
        label: 'Portfolio',
      }
    ]
  },
  {
    type: 'section',
    title: 'Help',
    icon: MessageCircle,
    items: [
      {
        href: '/support',
        icon: HelpCircle,
        label: 'Help Center',
      }
    ]
  },
  {
    type: 'section',
    title: 'Account',
    icon: User,
    items: [
      {
        href: '/profile',
        icon: User,
        label: 'My Profile',
      },
      {
        href: '/notifications',
        icon: Bell,
        label: 'Notifications',
      },
      {
        href: '/leaderboards',
        icon: Trophy,
        label: 'Leaderboards',
      },
      {
        href: '/how-to-earn',
        icon: Medal,
        label: 'How to Earn',
      }
    ]
  }
];
