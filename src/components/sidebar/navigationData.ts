
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
  MessageCircle
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
        href: '/education',
        icon: GraduationCap,
        label: 'Learning Hub',
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
  }
];
