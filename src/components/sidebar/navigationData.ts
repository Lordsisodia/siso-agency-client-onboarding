
import { 
  Home,
  FileText,
  FolderKanban,
  User,
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
    type: 'section',
    title: 'Account',
    icon: User,
    items: [
      {
        href: '/profile',
        icon: User,
        label: 'Profile',
      },
      {
        href: '/company-profile',
        icon: Building2,
        label: 'Company Profile',
      },
      {
        href: '/settings',
        icon: Settings,
        label: 'Settings',
      }
    ]
  },
  {
    type: 'main',
    href: '/support',
    icon: HelpCircle,
    label: 'Help Center',
  }
];
