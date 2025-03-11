
import { 
  Home,
  FileText,
  FolderKanban,
  HelpCircle,
  ClipboardCheck,
  Briefcase,
  Building2,
  Settings,
  BookOpen
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
    icon: Briefcase,
    items: [
      {
        href: '/plan-builder',
        icon: FileText,
        label: 'Plan Builder',
      },
      {
        href: '/projects',
        icon: FolderKanban,
        label: 'My Projects',
      },
      {
        href: '/tasks',
        icon: ClipboardCheck,
        label: 'Tasks',
      }
    ]
  },
  {
    type: 'section',
    title: 'Settings',
    icon: Settings,
    items: [
      {
        href: '/organization',
        icon: Building2,
        label: 'Organization',
      },
      {
        href: '/support',
        icon: HelpCircle,
        label: 'Help Center',
      }
    ]
  },
  {
    type: 'main',
    href: '/portfolio',
    icon: BookOpen,
    label: 'Portfolio',
  }
];
