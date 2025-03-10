
import { 
  Home,
  FileText,
  FolderKanban,
  Briefcase,
  User,
  HelpCircle,
  Building,
  BookOpen,
  Globe,
  ExternalLink,
  Book
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
        href: '/tasks',
        icon: FileText,
        label: 'Pending Tasks',
      }
    ]
  },
  {
    type: 'section',
    title: 'Portfolio',
    icon: Briefcase,
    items: [
      {
        href: '/portfolio',
        icon: Briefcase,
        label: 'My Portfolio',
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
        label: 'Profile & Settings',
      },
      {
        href: '/company-profile',
        icon: Building,
        label: 'Company Details',
      }
    ]
  },
  {
    type: 'section',
    title: 'Help',
    icon: HelpCircle,
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
    title: 'Resources',
    icon: BookOpen,
    items: [
      {
        href: 'https://sisosaas.framer.website/',
        icon: Globe,
        label: 'SISO LinkedIn Sales Team',
        isExternal: true
      },
      {
        href: 'https://sisoapparel.framer.website/',
        icon: ExternalLink,
        label: 'SISO Apparel',
        isExternal: true
      },
      {
        href: 'https://www.sisoresourcehub.online/home',
        icon: Book,
        label: 'Resource Hub',
        isExternal: true
      }
    ]
  }
];
