
import { 
  Home,
  FileText,
  FolderKanban,
  Briefcase,
  User,
  HelpCircle,
  ClipboardCheck,
  Sparkles,
  Trophy,
  Coins
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
      }
    ]
  },
  {
    type: 'main',
    href: '/portfolio',
    icon: Briefcase,
    label: 'My Portfolio',
  },
  {
    type: 'main',
    href: '/siso-ai',
    icon: Sparkles,
    label: 'SISO AI',
  },
  {
    type: 'main',
    href: '/leaderboards',
    icon: Trophy,
    label: 'Leaderboards',
  },
  {
    type: 'main',
    href: '/crypto',
    icon: Coins,
    label: 'Crypto Exchange',
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
