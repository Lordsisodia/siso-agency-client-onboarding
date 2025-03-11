
import { 
  Home,
  FileText,
  FolderKanban,
  User,
  HelpCircle,
  ClipboardCheck,
  Briefcase
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
        href: '/pending-tasks',
        icon: ClipboardCheck,
        label: 'Pending Tasks',
      },
      {
        href: '/portfolio',
        icon: Briefcase,
        label: 'Portfolio',
      }
    ]
  },
  {
    type: 'main',
    href: '/profile',
    icon: User,
    label: 'Profile & Settings',
  },
  {
    type: 'main',
    href: '/support',
    icon: HelpCircle,
    label: 'Help Center',
  }
];
