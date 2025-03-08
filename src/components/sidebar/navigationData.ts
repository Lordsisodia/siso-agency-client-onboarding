
import { 
  Home,
  GraduationCap,
  Network,
  BookOpen,
  Bot,
  Wrench,
  Bell,
  LayoutDashboard,
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
        href: '/portfolio',
        icon: Briefcase,
        label: 'Portfolio',
      },
      {
        href: 'https://www.sisoresourcehub.online/',
        icon: BookOpen,
        label: 'Resource Hub',
        isExternal: true,
      },
      {
        href: '/support',
        icon: HelpCircle,
        label: 'Support & Help Center',
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
      }
    ]
  }
];
