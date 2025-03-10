
import { 
  Home,
  FileText,
  FolderKanban,
  Briefcase,
  User,
  HelpCircle,
  Building,
  Link,
  ExternalLink,
  ShoppingBag
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
    title: 'Resources',
    icon: Link,
    items: [
      {
        href: '/resource-hub',
        icon: Link,
        label: 'Resource Hub',
      },
      {
        href: 'https://sisosaas.framer.website/',
        icon: ExternalLink,
        label: 'LinkedIn Sales Team',
        isExternal: true
      },
      {
        href: 'https://sisoapparel.framer.website/',
        icon: ShoppingBag,
        label: 'SISO Apparel',
        isExternal: true
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
  }
];
