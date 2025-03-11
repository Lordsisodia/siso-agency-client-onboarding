
import { 
  Home,
  FileText,
  FolderKanban,
  HelpCircle,
  ClipboardCheck,
  Briefcase,
  UserCircle,
  Settings,
  BookOpen,
  LifeBuoy
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
        href: '/profile',
        icon: UserCircle,
        label: 'Profile',
      },
      {
        href: '/support',
        icon: LifeBuoy,
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
